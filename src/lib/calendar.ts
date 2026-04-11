/**
 * Wedding event details for calendar integration
 */
const WEDDING_EVENT = {
  title: "Ivanna & Ben's Wedding",
  start: "2026-09-12T17:30:00", // Ceremony — Eastern (Cambridge, MA)
  end: "2026-09-12T23:00:00",
  location: "Gufo, 660 Cambridge St., Cambridge, MA",
  description:
    "Dress code: Formal attire with a tropical garden flair. See FAQ for full details.",
} as const;

/**
 * Generate Google Calendar add-event URL
 */
export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: WEDDING_EVENT.title,
    dates: "20260912T213000Z/20260913T030000Z", // UTC: 5:30pm–11pm EDT (Cambridge, MA)
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
    `DTSTART;TZID=America/New_York:${WEDDING_EVENT.start.replace(/[-:]/g, "").slice(0, 15)}`,
    `DTEND;TZID=America/New_York:${WEDDING_EVENT.end.replace(/[-:]/g, "").slice(0, 15)}`,
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
