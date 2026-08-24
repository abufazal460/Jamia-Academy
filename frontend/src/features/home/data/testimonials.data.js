// testimonialsData.js
// Yahan par saare testimonials ka data centralize kiya gaya hai (single source of truth)
// Koi bhi text ya image path component ke andar hardcode nahi hai

// Sabhi images sirf isi file ke andar import hongi
// import user1 from "../assets/userPic/user1.jpg";
// import user2 from "../assets/userPic/user2.jpg";
// import user3 from "../assets/userPic/user3.jpg";
// import user4 from "../assets/userPic/user4.jpg";
// import user5 from "../assets/userPic/user5.jpg";
// import user6 from "../assets/userPic/user6.jpg";
// import user7 from "../assets/userPic/user7.jpg";
// import user8 from "../assets/userPic/user8.jpg";

// Top row (left direction) ke liye data
export const testimonialsRowOne = [
  {
    id: 1,
    name: "Raiehah Noor",
    course: "Data Analytics",
    rating: 5,
    review:
      "I learned Excel and Power BI at Jamia Academy, and the teachers explained everything in a very simple way. I could understand even the hard topics easily. The teachers are always ready to answer questions, no matter how basic.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQ3V29WLjT5GB2D7afLWVSshBhLM_FjlHMoLyTmIAHQ&s=10",
  },
  {
    id: 2,
    name: "Asif Khan",
    course: "Python",
    rating: 4.5,
    review:
      "Python classes at Jamia Academy were fun and easy to follow. Teachers gave real examples instead of just theory. It felt more like learning with friends than sitting in a boring class.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ01GPnlPxgeBdk7cU_gfuD2mrxfaLtHgcy5WwfQg13g&s=10",
  },
  {
    id: 3,
    name: "Shahena",
    course: "Data Analytics",
    rating: 4.8,
    review:
      "Placement support kamaal ka hai. Mujhe graduation ke 2 mahine baad hi ek achhi company me job mil gayi.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaFeioPLnEOiRJqeXk9mWZsfINuCow3ipsvFW3GBggpA&s=10",
  },
  {
    id: 4,
    name: "Aman Khan, Sumbul",
    course: "Interior Design",
    rating: 4,
    review:
      "I learned how to plan spaces and choose colours properly. The teacher has real work experience and shares many useful tips. The classroom setup is nice and gives you space to be creative",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8TFJ7iUwyhF0_LOmPpst5aFLBQUYvRcuREn63JTVvg&s=10",
  },
  {
    id: 5,
    name: "Samra Ansari",
    course: "Graphic Design",
    rating: 5,
    review:
      "I always liked design but didn't know the technical part. Teachers taught me Photoshop and Illustrator step by step. The environment is friendly, so I never felt scared to try new things.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ01GPnlPxgeBdk7cU_gfuD2mrxfaLtHgcy5WwfQg13g&s=10",
  },
  {
    id: 6,
    name: "Alfisa",
    course: "Digital Marketing",
    rating: 4.8,
    review:
      "This course taught me real things like SEO and running ads, not just theory. Teachers shared their own work experience, which helped a lot. I feel more confident about digital marketing now.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_D-HUxY_L9H6fQfsdKAfn8yriVgzPMx36HQXz9-Bng&s=10",
  },
  {
    id: 7,
    name: "Muztar",
    course: "CAD",
    rating: 4.5,
    review:
      "I joined AutoCAD to learn technical drawing for my career in design. The teachers explained every tool step by step, and I got a lot of practice time on the computer. Now I can create drawings & Designing confidently on my own.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8TFJ7iUwyhF0_LOmPpst5aFLBQUYvRcuREn63JTVvg&s=10",
  },
  {
    id: 8,
    name: "Nasreen Masood",
    course: "Revit CAD",
    rating: 3.9,
    review:
      "Revit felt tough in the beginning, but the teachers broke it down into easy steps. They showed real building models, which helped me understand 3D design better. The academy's computer lab is well set up for practice.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BkUjFsxfyWWDLXMSl9tD5p0nItjsRAVeww79SBYWNA&s=10",
  },
];

// Bottom row (right direction) ke liye data
export const testimonialsRowTwo = [
  {
    id: 9,
    name: "Musad Khan",
    course: "ACC (Advanced Computer Course)",
    rating: 4.7,
    review:
      "I learned computer basics properly here. Teachers are patient and explain things clearly, even for students who are complete beginners. Now I use these skills every day.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzgIvj_tKuzbc5yaALqcWzplgTmsGHD2t4CW7WwYDVw&s=10",
  },
  {
    id: 10,
    name: "Hasan",
    course: "BCC (Basic Computer Course)",
    rating: 5,
    review:
      "I didn't know much about computers before joining BCC. The teachers started from the basics and made sure everyone understood before moving ahead. Now I feel comfortable using a computer for daily work.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BkUjFsxfyWWDLXMSl9tD5p0nItjsRAVeww79SBYWNA&s=10",
  },
  {
    id: 11,
    name: "Noor Ahmad",
    course: "DFA (Tally)",
    rating: 4.3,
    review:
      "Accounting used to feel difficult, but the teachers explained it with easy examples. Now I understand the basics well. The overall environment at the academy is calm and helps you focus.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqE3e9RIK09-ejpr7BwnvNb4TpTjmXHGgrTTNc00vdtA&s=10",
  },
  {
    id: 12,
    name: "Shifa Rasool",
    course: "Tally Prime",
    rating: 4.9,
    review:
      "Learning Tally here was simple and practical. Teachers showed real business examples, not just software. Now I can handle basic accounts confidently.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BkUjFsxfyWWDLXMSl9tD5p0nItjsRAVeww79SBYWNA&s=10",
  },
  {
    id: 13,
    name: "Abu Fazal",
    course: "Full Stack Development",
    rating: 5,
    review:
      "Learning Tally here was simple and practical. Teachers showed real business examples, not just software. Now I can handle basic accounts confidently.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqE3e9RIK09-ejpr7BwnvNb4TpTjmXHGgrTTNc00vdtA&s=10",
  },
  {
    id: 14,
    name: "sana pendig",
    course: "BCC (Basic Computer Course)",
    rating: 4.8,
    review:
      "Learning Tally here was simple and practical. Teachers showed real business examples, not just software. Now I can handle basic accounts confidently.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ01GPnlPxgeBdk7cU_gfuD2mrxfaLtHgcy5WwfQg13g&s=10",
  },
  {
    id: 15,
    name: "dummy1",
    course: "BCC (Basic Computer Course)",
    rating: 4.5,
    review:
      "Learning Tally here was simple and practical. Teachers showed real business examples, not just software. Now I can handle basic accounts confidently.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_D-HUxY_L9H6fQfsdKAfn8yriVgzPMx36HQXz9-Bng&s=10",
  },
  {
    id: 16,
    name: "dummy2",
    course: "Tally Prime",
    rating: 5,
    review:
      "Learning Tally here was simple and practical. Teachers showed real business examples, not just software. Now I can handle basic accounts confidently.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzgIvj_tKuzbc5yaALqcWzplgTmsGHD2t4CW7WwYDVw&s=10",
  },
 
];
