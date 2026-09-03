export const site = {
  name: "BP Agentics",
  shortName: "BP AGENTICS",
  city: "Hagen",
  tagline: "Systems & Automation",
  email: "sidiabarry@bpagentics.com",
  url: "https://bpagentics.com",
  owner: "Sidia Jerome Barry",
  kleinunternehmer: true,
} as const;

export const mailToTermin = (params: {
  name: string;
  phone: string;
  company: string;
  date: string;
  time: string;
  note?: string;
}) => {
  const subject = encodeURIComponent(
    `Erstgespräch: ${params.company || params.name}`,
  );
  const body = encodeURIComponent(
    [
      "Anfrage für das 90-Minuten-Erstgespräch vor Ort.",
      "",
      `Name: ${params.name}`,
      `Telefon: ${params.phone}`,
      `Betrieb: ${params.company}`,
      `Wunschtermin: ${params.date} um ${params.time} Uhr`,
      params.note ? `Notiz: ${params.note}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
};
