/**
 * Wedding event details for calendar integration
 */
const WEDDING_EVENT = {
  title: "Ivanna & Ben's Wedding",
  start: "2024-12-21T12:00:00", // Noon Pacific (Hotel San Francisco)
  end: "2024-12-21T18:00:00",
  location: "Hotel San Francisco, San Francisco",
  description:
    "Dress code: Semi-formal attire. No white, please! See FAQ for more info.",
} as const;

/**
 * Generate Google Calendar add-event URL
 */
export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: WEDDING_EVENT.title,
    dates: "20241221T200000Z/20241222T020000Z", // UTC: noon–6pm PST (San Francisco)
    location: WEDDING_EVENT.location,
    details: WEDDING_EVENT.description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate ICS file content and trigger download
 */
export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ivanna & Ben//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART;TZID=America/Los_Angeles:${WEDDING_EVENT.start.replace(/[-:]/g, "").slice(0, 15)}`,
    `DTEND;TZID=America/Los_Angeles:${WEDDING_EVENT.end.replace(/[-:]/g, "").slice(0, 15)}`,
    `SUMMARY:${WEDDING_EVENT.title}`,
    `LOCATION:${WEDDING_EVENT.location}`,
    `DESCRIPTION:${WEDDING_EVENT.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ivanna-and-ben-wedding.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
