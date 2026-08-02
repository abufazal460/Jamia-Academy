// testimonialsData.js
// Yahan par saare testimonials ka data centralize kiya gaya hai (single source of truth)
// Koi bhi text ya image path component ke andar hardcode nahi hai

// Sabhi images sirf isi file ke andar import hongi
import user1 from "../assets/userPic/user1.jpg";
import user2 from "../assets/userPic/user2.jpg";
import user3 from "../assets/userPic/user3.jpg";
import user4 from "../assets/userPic/user4.jpg";
import user5 from "../assets/userPic/user5.jpg";
import user6 from "../assets/userPic/user6.jpg";
import user7 from "../assets/userPic/user7.jpg";
import user8 from "../assets/userPic/user8.jpg";

// Top row (left direction) ke liye data
export const testimonialsRowOne = [
  {
    id: 1,
    name: "Ayesha Khan",
    course: "Full Stack Web Development",
    rating: 5,
    review:
      "Jamia Academy ne mera coding ka fear khatam kar diya. Mentors bahut supportive hai aur har doubt clear hone tak samjhate hai.",
    image: user1,
  },
  {
    id: 2,
    name: "Rohan Verma",
    course: "Data Science & AI",
    rating: 4.5,
    review:
      "Course structure bahut practical hai. Real world projects ke through concepts clear hue, sirf theory nahi padhai gayi.",
    image: user2,
  },
  {
    id: 3,
    name: "Fatima Sheikh",
    course: "UI/UX Design",
    rating: 4.8,
    review:
      "Placement support kamaal ka hai. Mujhe graduation ke 2 mahine baad hi ek achhi company me job mil gayi.",
    image: user3,
  },
  {
    id: 4,
    name: "Karan Mehta",
    course: "Cloud Computing",
    rating: 4,
    review:
      "Faculty ka experience industry level ka hai, jo bhi sikhaya wo directly job me use ho raha hai.",
    image: user4,
  },
];

// Bottom row (right direction) ke liye data
export const testimonialsRowTwo = [
  {
    id: 5,
    name: "Sana Ansari",
    course: "Digital Marketing",
    rating: 4.7,
    review:
      "Live sessions aur doubt clearing classes ne mujhe confidence diya apna khud ka business start karne ka.",
    image: user5,
  },
  {
    id: 6,
    name: "Imran Qureshi",
    course: "Mobile App Development",
    rating: 5,
    review:
      "Best decision tha Jamia Academy join karna. App banake dikhaya interview me aur seedha selection ho gaya.",
    image: user6,
  },
  {
    id: 7,
    name: "Neha Joshi",
    course: "Cyber Security",
    rating: 4.3,
    review:
      "Practical labs aur hands-on training ne mujhe industry ready bana diya, bahut hi affordable price me.",
    image: user7,
  },
  {
    id: 8,
    name: "Zeeshan Ali",
    course: "Full Stack Web Development",
    rating: 4.9,
    review:
      "Yahan ka environment learning ke liye best hai. Seniors aur teachers dono hi support karte rehte hai.",
    image: user8,
  },
];
