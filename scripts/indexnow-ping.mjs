import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Ping IndexNow for https://bpagentics.com only.
 *
 * Manual, after a production deploy is live and this key file is on the domain:
 *   INDEXNOW_ALLOW_PRODUCTION=1 npm run indexnow
 *
 * Preview what would be submitted, without calling IndexNow:
 *   INDEXNOW_ALLOW_PRODUCTION=1 npm run indexnow -- --dry-run
 *
 * Production post-deploy hook: run this script only when VERCEL_ENV=production.
 * If VERCEL_ENV is preview or development, the script exits 0 and does not ping.
 * Do not add it to `build` or `vercel-build`. Those run for preview deployments
 * and they run before the production alias is live.
 */

const HOST = "bpagentics.com";
const KEY = "22a71b2d28da2f6e6ce2b42f3948bf0c";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const URL_LIMIT = 10000;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseSitemapUrls(xml) {
  const urls = [];
  const pattern = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  for (const match of xml.matchAll(pattern)) {
    urls.push(match[1].trim());
  }
  return urls;
}

function assertProductionUrls(urls) {
  if (urls.length === 0) {
    throw new Error("Sitemap contained no URLs.");
  }
  for (const url of urls) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      throw new Error(`Sitemap URL is not absolute: ${url}`);
    }
    if (parsed.protocol !== "https:" || parsed.hostname !== HOST) {
      throw new Error(`Refusing non-production URL: ${url}`);
    }
  }
  return urls;
}

function decide(env) {
  const vercelEnv = env.VERCEL_ENV;
  if (vercelEnv === "production") return { action: "ping" };
  if (vercelEnv) return { action: "skip", reason: `VERCEL_ENV=${vercelEnv}` };
  if (env.INDEXNOW_ALLOW_PRODUCTION === "1") return { action: "ping" };
  return { action: "refuse" };
}

function assertLocalKeyFile() {
  const keyPath = join(root, "public", `${KEY}.txt`);
  const local = readFileSync(keyPath, "utf8");
  if (local.trim() !== KEY) {
    throw new Error(`${keyPath} does not contain the IndexNow key.`);
  }
}

function selfTest() {
  const sample = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<urlset>",
    "<url><loc>https://bpagentics.com/</loc></url>",
    "<url><loc>https://bpagentics.com/kontakt</loc></url>",
    "</urlset>",
  ].join("");
  const urls = assertProductionUrls(parseSitemapUrls(sample));
  if (urls.join("|") !== "https://bpagentics.com/|https://bpagentics.com/kontakt") {
    throw new Error("Sitemap parser mismatch.");
  }
  let rejected = false;
  try {
    assertProductionUrls(["https://bp-agentics-site-git-preview.vercel.app/"]);
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error("Preview host was accepted.");
  if (decide({ VERCEL_ENV: "preview" }).action !== "skip") {
    throw new Error("Preview env should skip.");
  }
  if (decide({ VERCEL_ENV: "development" }).action !== "skip") {
    throw new Error("Development env should skip.");
  }
  if (decide({}).action !== "refuse") {
    throw new Error("Manual run without confirmation should refuse.");
  }
  if (decide({ INDEXNOW_ALLOW_PRODUCTION: "1" }).action !== "ping") {
    throw new Error("Manual confirmation should ping.");
  }
  if (decide({ VERCEL_ENV: "production" }).action !== "ping") {
    throw new Error("Production env should ping.");
  }
  assertLocalKeyFile();
  console.log("IndexNow self-test ok.");
}

async function loadSitemapUrls() {
  const response = await fetch(SITEMAP_URL, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Sitemap request failed: ${response.status} ${SITEMAP_URL}`);
  }
  const finalHost = new URL(response.url).hostname;
  if (finalHost !== HOST) {
    throw new Error(`Sitemap redirected away from ${HOST}: ${response.url}`);
  }
  return assertProductionUrls(parseSitemapUrls(await response.text()));
}

async function assertRemoteKey() {
  const response = await fetch(KEY_LOCATION, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(
      `IndexNow key file is not live yet (${response.status} ${KEY_LOCATION}). Ping after the production deploy that contains public/${KEY}.txt.`,
    );
  }
  const finalHost = new URL(response.url).hostname;
  if (finalHost !== HOST) {
    throw new Error(`Key file redirected away from ${HOST}: ${response.url}`);
  }
  const body = (await response.text()).trim();
  if (body !== KEY) {
    throw new Error(`Live key file at ${KEY_LOCATION} does not match.`);
  }
}

async function ping(urls) {
  for (let offset = 0; offset < urls.length; offset += URL_LIMIT) {
    const urlList = urls.slice(offset, offset + URL_LIMIT);
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });
    if (response.status !== 200 && response.status !== 202) {
      const detail = await response.text();
      throw new Error(
        `IndexNow rejected ${urlList.length} URLs (${response.status}): ${detail.slice(0, 500)}`,
      );
    }
    console.log(`IndexNow accepted ${urlList.length} URLs (${response.status}).`);
  }
}

async function main() {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }

  const decision = decide(process.env);
  if (decision.action === "skip") {
    console.log(`IndexNow skipped (${decision.reason}). Previews do not ping.`);
    return;
  }
  if (decision.action === "refuse") {
    console.error(
      "Refusing to ping IndexNow. After production is live, run: INDEXNOW_ALLOW_PRODUCTION=1 npm run indexnow",
    );
    process.exitCode = 1;
    return;
  }

  assertLocalKeyFile();
  const urls = await loadSitemapUrls();
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) {
    console.log(
      JSON.stringify(
        { host: HOST, keyLocation: KEY_LOCATION, urlList: urls, dryRun: true },
        null,
        2,
      ),
    );
    return;
  }

  await assertRemoteKey();
  await ping(urls);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
