export function generateEnrollmentMessage(course) {
  if (!course) return "";

  const { title, duration, level, } = course;
  const durationText = duration ? `${duration.value} ${duration.unit}` : "N/A";

  return [
    "Hello Jamia Academy,",
    "",
    "I want to know more about this course:",
    "",
    `Course Name: ${title ?? "N/A"}`,
    `Duration: ${durationText}`,
    `Level: ${level?.name ?? "N/A"}`,
    "",
    "Please share more details.",
  ].join("\n");
}

export function buildWhatsAppUrl(course, phoneNumber = "919621555551") {
  const message = generateEnrollmentMessage(course);
  const encodedMessage = encodeURIComponent(message);
  const base = phoneNumber ? `https://wa.me/${phoneNumber}` : "https://wa.me/";

  return `${base}?text=${encodedMessage}`;
}

export function openWhatsApp(course) {
  if (!course) return;

  const url = buildWhatsAppUrl(course);
  window.open(url, "_blank", "noopener,noreferrer");
}
