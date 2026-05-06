export type JsonLdRecord = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  pathname: string;
}

interface BreadcrumbListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

const DEFAULT_SITE_NAME = "BREAD";

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function toAbsoluteUrl(
  site: URL | undefined,
  pathname: string,
): string | undefined {
  if (!site) return undefined;

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, site).toString();
}

export function createWebsiteSchema(params: {
  site?: URL;
  name?: string;
  description?: string;
}): JsonLdRecord | undefined {
  const { site, name = DEFAULT_SITE_NAME, description } = params;
  if (!site) return undefined;

  const url = trimTrailingSlash(site.toString());

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    ...(description ? { description } : {}),
  };
}

export function createCollectionPageSchema(params: {
  site?: URL;
  pathname: string;
  name: string;
  description?: string;
  isPartOf?: string;
}): JsonLdRecord | undefined {
  const { site, pathname, name, description, isPartOf } = params;
  const url = toAbsoluteUrl(site, pathname);
  if (!url) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    ...(description ? { description } : {}),
    ...(isPartOf ? { isPartOf: { "@type": "WebSite", name: isPartOf } } : {}),
  };
}

export function createArticleSchema(params: {
  site?: URL;
  pathname: string;
  headline: string;
  description?: string;
  datePublished: Date;
  dateModified?: Date;
  authorName?: string;
  section?: string;
  siteName?: string;
}): JsonLdRecord | undefined {
  const {
    site,
    pathname,
    headline,
    description,
    datePublished,
    dateModified,
    authorName = DEFAULT_SITE_NAME,
    section,
    siteName = DEFAULT_SITE_NAME,
  } = params;

  const url = toAbsoluteUrl(site, pathname);
  if (!url) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    url,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
    ...(description ? { description } : {}),
    ...(section ? { articleSection: section } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function createEventSchema(params: {
  site?: URL;
  pagePathname: string;
  position: number;
  name: string;
  startDate: string;
  venueName: string;
  description?: string;
  status?: string;
  organizerName?: string;
}): JsonLdRecord | undefined {
  const {
    site,
    pagePathname,
    position,
    name,
    startDate,
    venueName,
    description,
    status,
    organizerName = DEFAULT_SITE_NAME,
  } = params;

  const pageUrl = toAbsoluteUrl(site, pagePathname);
  if (!pageUrl) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    eventStatus: status,
    description,
    location: {
      "@type": "Place",
      name: venueName,
    },
    organizer: {
      "@type": "Organization",
      name: organizerName,
    },
    url: `${pageUrl}#event-${position}`,
  };
}

export function createItemListSchema(params: {
  name: string;
  itemListElement: JsonLdRecord[];
  description?: string;
}): JsonLdRecord {
  const { name, itemListElement, description } = params;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    ...(description ? { description } : {}),
    itemListElement: itemListElement.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
  };
}

export function createBreadcrumbListSchema(params: {
  site?: URL;
  items: BreadcrumbItem[];
}): JsonLdRecord | undefined {
  const { site, items } = params;
  if (!site || items.length < 2) return undefined;

  const itemListElement = items
    .map((item, index): BreadcrumbListItem | undefined => {
      const itemUrl = toAbsoluteUrl(site, item.pathname);
      if (!itemUrl) return undefined;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    })
    .filter((item): item is BreadcrumbListItem => Boolean(item));

  if (itemListElement.length < 2) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function createPersonSchema(params: {
  site?: URL;
  name: string;
  role?: string;
  links?: Record<string, string>;
}): JsonLdRecord | undefined {
  const { site, name, role, links } = params;
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(role ? { jobTitle: role } : {}),
    ...(links?.sc ? { sameAs: Object.values(links).filter(Boolean) } : {}),
  };
}
