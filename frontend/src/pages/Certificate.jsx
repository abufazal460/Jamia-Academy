import { useEffect } from "react";
import SpaceBackground from "../components/contactBackground/SpaceBackground";
import { PageHeading, CertificateCard } from "../components/certificate";
import { PAGE_CONTENT } from "../data/certificateData";

/**
 * Certificate page
 * Background pehle se maujood SpaceBackground component se aata hai — yaha
 * koi naya background generate nahi kiya gaya. Yeh page sirf verification
 * card ko background ke upar center karta hai.
 */
export default function Certificate() {
  useEffect(() => {
    document.title = `${PAGE_CONTENT.title} · Jamia Academy`;
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SpaceBackground />

      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6">
        <PageHeading />
        <CertificateCard />
      </main>
    </div>
  );
}
