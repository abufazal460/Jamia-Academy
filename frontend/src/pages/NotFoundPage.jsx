import NotFoundContent from "../features/not-found/components/NotFoundContent";

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found | Jamia Academy" description="The page you're looking for doesn't exist." robots="noindex, follow" />
      <NotFoundContent />
    </>
  );
}