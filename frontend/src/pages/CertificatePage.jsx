import SEO from "../shared/seo/SEO";
import SpaceBackground from "../shared/components/background/SpaceBackground";
import { PageHeading, CertificateCard } from "../features/certificate/components";
import { PAGE_CONTENT } from "../features/certificate/data/certificate.data";

const PAGE_TITLE = `${PAGE_CONTENT.title} · Jamia Academy`;
const PAGE_DESCRIPTION = PAGE_CONTENT.subtitle;

export default function Certificate() {
  const canonicalUrl = "https://www.jamiaacademy.in/certificate";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    isPartOf: { "@type": "Organization", name: "Jamia Academy" },
  };
  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/certificate"
        imageAlt="Jamia Academy certificate verification"
        structuredData={structuredData}
      />
      <div className="relative min-h-screen w-full overflow-hidden">
        <SpaceBackground />
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-18 sm:px-6">
          <PageHeading />
          <CertificateCard />
        </main>
      </div>
    </>
  );
}
