// ====================================================================
// coursesData.js
// Ye file Mega Menu ke andar dikhne wale saare courses ka data store karti hai.
// WHY: Hardcoded JSX baar baar likhne se code duplicate aur unmanageable ho jata hai.
// HOW: Har category ek alag array hai, jisme objects hai (label + route).
// Navbar ke MegaMenu component me hum sirf .map() karke render karenge.
// ====================================================================

// Ye 3D Animation category ke courses hai.
export const animationCourses = [
  { id: "ad3d", label: "AD3D Edge Plus", route: "/course/ad3d" },
  { id: "3d-realtime", label: "3D & Real-Time Design", route: "/course/3d-realtime" },
  { id: "d3", label: "D3", route: "/course/d3" },
  { id: "dafm", label: "DAFM", route: "/course/dafm" },
];

// Ye Visual Effects (VFX) category ke courses hai.
export const vfxCourses = [
  { id: "advfx", label: "ADVFX Plus", route: "/course/advfx" },
  { id: "compositing", label: "Compositing and Editing Program", route: "/course/compositing-editing" },
  { id: "vfx-plus", label: "VFX Plus", route: "/course/vfx-plus" },
];

// Ye Game Design category ke courses hai.
export const gameDesignCourses = [
  { id: "adidg", label: "ADIDG Plus", route: "/course/adidg" },
  { id: "pmgdi", label: "PMGDI", route: "/course/pmgdi" },
  { id: "apgdi", label: "APGDI", route: "/course/apgdi" },
];

// Ye Digital Design category ke courses hai.
export const digitalDesignCourses = [
  { id: "apdmd", label: "APDMD", route: "/course/apdmd" },
  { id: "apdmc-plus", label: "APDMC Plus", route: "/course/apdmc-plus" },
  { id: "dgwa", label: "DGWA", route: "/course/dgwa" },
  { id: "uiux-pro", label: "UI/UX Design Pro", route: "/course/uiux-pro" },
];

// Ye Motion Graphic and Broadcast category ke courses hai.
export const motionGraphicCourses = [
  { id: "apmg", label: "APMG", route: "/course/apmg" },
];

// Ye Film Making category ke courses hai.
export const filmMakingCourses = [
  { id: "ppvp", label: "PPVP", route: "/course/ppvp" },
];

// Ye master array hai jo Mega Menu ke grid columns banane ke liye use hoga.
// Har column ek category hai: title + icon hint + courses array.
// WHY array of objects: Isse MegaMenu.jsx me sirf ek .map() chalega,
// aur naya category add karna ho to bas yaha ek object add karna hoga.
export const courseCategories = [
  { id: "animation", title: "3D Animation", courses: animationCourses },
  { id: "vfx", title: "Visual Effects (VFX)", courses: vfxCourses },
  { id: "gamedesign", title: "Game Design", courses: gameDesignCourses },
  { id: "digitaldesign", title: "Digital Design", courses: digitalDesignCourses },
  { id: "motiongraphic", title: "Motion Graphic and Broadcast", courses: motionGraphicCourses },
  { id: "filmmaking", title: "Film Making", courses: filmMakingCourses },
];