// ====================================================================
// navLinksData.js
// Ye file Navbar ke center wale navigation links ka data store karti hai.
// WHY: Array based data se NavItem.jsx ko map() karke render kar sakte hai,
// koi bhi hardcoded repeated <Link> tags nahi likhne padenge.
// ====================================================================

export const navLinks = [
  { id: "home", label: "Home", route: "/" },
  { id: "about", label: "About", route: "/about" },
  // "courses" special hai kyunki isme dropdown (mega menu) bhi hai isiliye
  // hasDropdown flag use kiya hai taki NavItem component pata laga sake.
  { id: "course", label: "Course", route: "/course", hasDropdown: true },
  { id: "gallery", label: "Gallery", route: "/gallery" },
  { id: "contact", label: "Contact", route: "/contact" },
];