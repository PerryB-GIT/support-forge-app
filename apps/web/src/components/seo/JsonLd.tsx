interface OrganizationJsonLdProps {
  url: string;
  logo: string;
  name: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  slogan?: string;
}

export function OrganizationJsonLd({
  url,
  logo,
  name,
  description,
  email,
  telephone,
  address,
  sameAs = [],
  foundingDate,
  slogan,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    legalName: `${name} LLC`,
    description,
    url,
    logo,
    email,
    telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.country,
      ...(address.postalCode && { postalCode: address.postalCode }),
    },
    areaServed: [
      { "@type": "State", name: "Massachusetts" },
      { "@type": "Country", name: "United States" },
    ],
    ...(foundingDate && { foundingDate }),
    ...(slogan && { slogan }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface LocalBusinessJsonLdProps {
  url: string;
  logo: string;
  name: string;
  description: string;
  email: string;
  telephone: string;
  address: {
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
}

export function LocalBusinessJsonLd({
  url,
  logo,
  name,
  description,
  email,
  telephone,
  address,
  geo = { latitude: 42.7762, longitude: -71.0773 },
  priceRange = "$$",
}: LocalBusinessJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url,
    image: logo,
    email,
    telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.country,
      ...(address.postalCode && { postalCode: address.postalCode }),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    priceRange,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: [
      { "@type": "State", name: "Massachusetts" },
      { "@type": "Country", name: "United States" },
    ],
    serviceType: [
      "AI Consulting",
      "IT Consulting",
      "Software Development",
      "Cloud Solutions",
      "Cybersecurity",
      "Managed IT Services",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  areaServed?: string;
}

export function ServiceJsonLd({
  name,
  description,
  provider,
  url,
  areaServed = "United States",
}: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    url,
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ServicesListJsonLdProps {
  services: Array<{
    name: string;
    description: string;
    serviceType: string;
  }>;
  provider: string;
  url: string;
}

export function ServicesListJsonLd({
  services,
  provider,
  url,
}: ServicesListJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${provider} Services`,
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.description,
      provider: { "@type": "Organization", name: provider },
      url: `${url}/services`,
      serviceType: service.serviceType,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteJsonLdProps {
  url: string;
  name: string;
  description: string;
}

export function WebSiteJsonLd({ url, name, description }: WebSiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    publisher: { "@type": "Organization", name },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQJsonLdProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
