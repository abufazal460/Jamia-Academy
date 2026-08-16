import { Helmet } from "react-helmet-async";
import SpaceBackground from "../components/contactBackground/SpaceBackground";
import { PageHeading, CertificateCard } from "../components/certificate";
import { PAGE_CONTENT } from "../data/certificateData";


const PAGE_TITLE = `${PAGE_CONTENT.title} · Jamia Academy`;
const PAGE_DESCRIPTION = PAGE_CONTENT.subtitle;

export default function Certificate() {
  const canonicalUrl = "https://www.jamiaacademy.in/course";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    isPartOf: { "@type": "Organization", name: "Jamia Academy" },
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <SpaceBackground />
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6">
        <PageHeading />
        <CertificateCard />
      </main>
    </div>
  );
}
