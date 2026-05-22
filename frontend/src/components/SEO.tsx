// src/components/SEO.tsx
// Reusable SEO component wrapping React Helmet Async
// Usage: <SEO title="..." description="..." keywords="..." path="/" />
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.nguyen-the-quy.website";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = "Nguyen The Quy – Fullstack Developer";

// Core name variants to inject into every page for consistent name-based ranking
const NAME_KEYWORDS =
  "Nguyen The Quy, The Quy Nguyen, Quy Nguyen, nguyen the quy, the quy, quy dev, quy developer, quy develop, quy nguyen developer";

export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  path?: string;
  ogType?: string;
  ogImage?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  path = "/",
  ogType = "website",
  ogImage = OG_IMAGE,
}: SEOProps) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Nguyen The Quy`;
  const fullKeywords = `${keywords}, ${NAME_KEYWORDS}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nguyen The Quy",
    alternateName: [
      "The Quy Nguyen",
      "Quy Nguyen",
      "The Quy",
      "Quy Dev",
      "Quy Developer",
    ],
    jobTitle: "Fullstack Developer",
    url: SITE_URL,
    image: OG_IMAGE,
    sameAs: ["https://www.nguyen-the-quy.website"],
  };

  const breadcrumbSchema =
    path !== "/"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: title,
              item: canonicalUrl,
            },
          ],
        }
      : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Nguyen The Quy" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@thequynguyen" />

      {/* Extra structured data hints */}
      <meta name="geo.region" content="VN-DN" />
      <meta name="geo.placename" content="Da Nang, Vietnam" />

      {/* JSON-LD: Person */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>

      {/* JSON-LD: Breadcrumb (sub-pages only) */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}
