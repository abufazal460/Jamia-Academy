// ====================================================================
// navLinksData.js
// Ye file Navbar ke center wale navigation links ka data store karti hai.
// WHY: Array based data se NavItem.jsx ko map() karke render kar sakte hai,
// koi bhi hardcoded repeated <Link> tags nahi likhne padenge.
// ====================================================================

export const navLinks = [
  { id: "home", label: "Home", route: "/" },
  { id: "about", label: "About", route: "/about" },
  { id: "course", label: "Course", route: "/course" },
  { id: "gallery", label: "Gallery", route: "/gallery" },
  { id: "contact", label: "Contact", route: "/contact" },
];