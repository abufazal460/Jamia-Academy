import { Helmet } from "react-helmet-async";

const SITE_NAME = "Jamia Academy";
const SITE_URL = "https://www.jamiaacademy.in";
const DEFAULT_IMAGE = `${SITE_URL}/og/jamia-academy.jpg`;

function toAbsoluteUrl(value = "/") {
  return new URL(value, SITE_URL).toString();
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt = `${SITE_NAME} — Quality education and practical skills`,
  type = "website",
  robots = "index, follow",
  structuredData,
}) {
  const canonicalUrl = toAbsoluteUrl(path);
  const socialImage = toAbsoluteUrl(image);
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:secure_url" content={socialImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {serializeJsonLd(schema)}
        </script>
      ))}
    </Helmet>
  );
}