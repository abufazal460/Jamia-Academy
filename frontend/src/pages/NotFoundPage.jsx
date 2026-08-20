// Ye sirf page-level composition hai — actual UI NotFoundContent mein hai,
// taaki feature-based folder structure maintain rahe (jaisa project mein baaki jagah hai)
import NotFoundContent from "../features/not-found/components/NotFoundContent";

export default function NotFoundPage() {
  return <NotFoundContent />;
}