import { site, napShort } from "@/lib/site";

export const orgId = `${site.url}/#org`;
export const personId = `${site.url}/#sidia`;
export const websiteId = `${site.url}/#website`;

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        email: site.email,
        telephone: site.phoneDisplay,
        image: `${site.url}/icon.svg`,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/icon.svg`,
        },
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.streetAddress,
          postalCode: site.postalCode,
          addressLocality: site.addressLocality,
          addressRegion: site.addressRegion,
          addressCountry: site.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        areaServed: site.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        knowsAbout: [...site.knowsAbout],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phoneDisplay,
            contactType: "customer service",
            areaServed: "DE",
            availableLanguage: ["German"],
            url: site.whatsappUrl,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen von BP Agentics",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website für Betriebe",
                url: `${site.url}/leistungen/auftritt`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "KI-Setter",
                url: `${site.url}/leistungen/annahme`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Interne Abläufe",
                url: `${site.url}/leistungen/ablaeufe`,
              },
            },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.founder.name,
        jobTitle: site.founder.jobTitle,
        worksFor: { "@id": orgId },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.streetAddress,
          postalCode: site.postalCode,
          addressLocality: site.addressLocality,
          addressRegion: site.addressRegion,
          addressCountry: site.addressCountry,
        },
        email: site.email,
        telephone: site.phoneDisplay,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: "de-DE",
        publisher: { "@id": orgId },
        description: site.defaultDescription,
      },
    ],
  };
}

export function breadcrumbList(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}

export function webPageNode({
  path,
  name,
  description,
  extraTypes = [],
}: {
  path: string;
  name: string;
  description: string;
  extraTypes?: string[];
}) {
  return {
    "@type": extraTypes.length ? ["WebPage", ...extraTypes] : "WebPage",
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name,
    description,
    inLanguage: "de-DE",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    publisher: { "@id": orgId },
  };
}

export function serviceOffer({
  name,
  description,
  path,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  offers: { name: string; price: string; unit?: string }[];
}) {
  return {
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": orgId },
    areaServed: site.areaServed.map((n) => ({ "@type": "AdministrativeArea", name: n })),
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "EUR",
      ...(offer.unit ? { unitText: offer.unit } : {}),
      url: `${site.url}${path}`,
      seller: { "@id": orgId },
    })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function videoObject({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  duration,
  uploadDate,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  duration: string;
  uploadDate: string;
}) {
  return {
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `${site.url}${thumbnailUrl}`,
    contentUrl: `${site.url}${contentUrl}`,
    uploadDate,
    duration,
    inLanguage: "de",
  };
}

export function howTo({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export { napShort };
