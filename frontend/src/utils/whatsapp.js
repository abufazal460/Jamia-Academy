// src/utils/whatsapp.js
//
// Ye utility React se bilkul independent hai — sirf plain JS functions hain
// jo course object leke WhatsApp message/URL banate hain. Isse alag file me
// rakhne ka fayda: koi bhi component (EnrollButton, CourseModal, future
// pricing page) isi logic ko reuse kar sakta hai, aur isko test karna bhi
// aasan hai kyunki isme koi DOM/React dependency nahi hai (openWhatsApp ko
// chhodkar, jo hi actually window kholta hai).

/**
 * generateEnrollmentMessage
 *
 * Course object se ek human-readable enrollment message banata hai.
 * Poora message course props se aata hai — kahin bhi course ka naam,
 * batch, ya fees hardcode nahi hai. Isliye backend API se data aane par
 * bhi ye function bina badle kaam karega, jab tak course object ka shape
 * (title, batch, duration, level, fees, eligibility) same rahe.
 *
 * @param {Object} course - courses.data.js jaisa course object
 * @returns {string} plain text message
 */
export function generateEnrollmentMessage(course) {
  if (!course) return "";

  const { title, batch, duration, level, fees, eligibility } = course;

  const durationText = duration ? `${duration.value} ${duration.unit}` : "N/A";
  const feesText = fees?.amount ? `${fees.amount} ${fees.currency ?? ""}`.trim() : "N/A";
  // eligibility array ho sakta hai (jaisa data file me hai) — comma-separated
  // string me convert karte hain taaki message readable rahe.
  const eligibilityText = Array.isArray(eligibility)
    ? eligibility.join(", ")
    : eligibility ?? "N/A";

  return [
    "Hello Jamia Academy,",
    "",
    "I want to know more about this course:",
    "",
    `Course Name: ${title ?? "N/A"}`,
    `Batch: ${batch?.name ?? "N/A"}`,
    `Duration: ${durationText}`,
    `Level: ${level?.name ?? "N/A"}`,
    `Fees: ${feesText}`,
    `Eligibility: ${eligibilityText}`,
    "",
    "Please share more details.",
  ].join("\n");
}

/**
 * buildWhatsAppUrl
 *
 * Message ko encode karke ek valid wa.me URL banata hai.
 *
 * encodeURIComponent() zaroori hai kyunki message me spaces, newlines (\n),
 * aur colons (:) hain — inhe encode kiye bina URL invalid ban jaata hai ya
 * message truncate/corrupt ho sakta hai.
 *
 * @param {Object} course
 * @param {string} [phoneNumber] - optional; diya na jaaye to WhatsApp khud
 *                                  user ko contact choose karne dega
 * @returns {string} full WhatsApp URL
 */
export function buildWhatsAppUrl(course, phoneNumber = "") {
  const message = generateEnrollmentMessage(course);
  const encodedMessage = encodeURIComponent(message);

  // Number diya ho to https://wa.me/<number>?text=... , warna sirf
  // https://wa.me/?text=... — dono valid WhatsApp deep-link formats hain.
  const base = phoneNumber ? `https://wa.me/${phoneNumber}` : "https://wa.me/";

  return `${base}?text=${encodedMessage}`;
}

/**
 * openWhatsApp
 *
 * Is file ka ek-mात्र function jo actual side-effect karta hai (naya
 * tab kholta hai) — baaki dono functions pure hain (same input = same
 * output, koi DOM touch nahi). Isse rakhne ka fayda: agar future me
 * "open in new tab" ki jagah kuch aur karna ho (jaise ek modal me QR
 * dikhana), to sirf yahi function badalna padega.
 *
 * @param {Object} course
 * @param {string} [phoneNumber]
 */
export function openWhatsApp(course, phoneNumber = "") {
  if (!course) return;

  const url = buildWhatsAppUrl(course, phoneNumber);

  // noopener/noreferrer — security best practice jab window.open() se
  // naya tab external site (WhatsApp) ke liye khola jaa raha ho.
  window.open(url, "_blank", "noopener,noreferrer");
}
