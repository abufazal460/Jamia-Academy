// src/data/galleryData.js
//
// YEH FILE SIRF DATA HOLD KARTI HAI — koi JSX nahi, koi logic nahi.
// Naya image add karna ho to bas ek naya object push karo.
// Component (InfiniteGallery) automatically re-render ho jayega,
// kyunki wo hamesha `images.length` se kaam karta hai, kabhi
// hardcoded number (6, 10, 20...) se nahi.

// NOTE: Vite mein images ko import karke bundle karna best practice hai
// (hashing + optimization milta hai). Agar tumhare paas 50-100 images
// hain, to import.meta.glob use karo (neeche example diya hai).

// -------- Option A: Manual imports (chhoti gallery ke liye, e.g. 6-10 items) --------
import img1 from "../assets/course/img-1.jpeg";
import img2 from "../assets/course/img-2.jpeg";
import img3 from "../assets/course/img-3.jpeg";
import img4 from "../assets/course/img-4.jpeg";
import img5 from "../assets/course/img-5.png";
import img6 from "../assets/course/img-6.png";
import img7 from "../assets/course/img-7.png";
import img8 from "../assets/course/img-8.png";
import img9 from "../assets/course/img-9.png";
import img10 from "../assets/course/img-10.png";
import img11 from "../assets/course/img-11.png";
import img12 from "../assets/course/img-12.png";
import img13 from "../assets/course/img-13.png";
import img14 from "../assets/course/img-14.png";
import img15 from "../assets/course/img-15.png";
import img16 from "../assets/course/img-16.png";
import img17 from "../assets/course/img-17.png";
import img18 from "../assets/course/img-18.png";
import img19 from "../assets/course/img-19.png";
import img20 from "../assets/course/img-20.png";


export const galleryData = [
  { id: 1, image: img1, title: "", alt: "Image not found" },
  { id: 2, image: img2, title: "", alt: "Image not found" },
  { id: 3, image: img3, title: "", alt: "Image not found" },
  { id: 4, image: img4, title: "", alt: "Image not found" },
  { id: 5, image: img5, title: "", alt: "Image not found" },
  { id: 6, image: img6, title: "", alt: "Image not found" },
  { id: 7, image: img7, title: "", alt: "Image not found" },
  { id: 8, image: img8, title: "", alt: "Image not found" },
  { id: 9, image: img9, title: "", alt: "Image not found" },
  { id: 10, image: img10, title: "", alt: "Image not found" },
  { id: 11, image: img11, title: "", alt: "Image not found" },
  { id: 12, image: img12, title: "", alt: "Image not found" },
  { id: 13, image: img13, title: "", alt: "Image not found" },
  { id: 14, image: img14, title: "", alt: "Image not found" },
  { id: 15, image: img15, title: "", alt: "Image not found" },
  { id: 16, image: img16, title: "", alt: "Image not found" },
  { id: 17, image: img17, title: "", alt: "Image not found" },
  { id: 18, image: img18, title: "", alt: "Image not found" },
  { id: 19, image: img19, title: "", alt: "Image not found" },
  { id: 20, image: img20, title: "", alt: "Image not found" },
];


// -------- Option B: Scale to 100+ images automatically (recommended for large sets) --------
//
// Agar `src/assets/gallery/` folder mein tumhare paas 100 images hain
// (1.jpg, 2.jpg ... 100.jpg), to yeh helper unhe automatically
// galleryData array mein convert kar dega — koi manual object nahi likhna.
//
// export function buildGalleryData() {
//   const modules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
//     eager: true,
//     import: "default",
//   });
//
//   return Object.entries(modules).map(([path, image], index) => ({
//     id: index + 1,
//     image,
//     title: "",
//     alt: `Gallery image ${index + 1}`,
//   }));
// }
//
// export const galleryData = buildGalleryData();
