import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { weddingNavLinkButtonTypographyClassName } from "@/config/weddingSectionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Guest } from "@/data/wedding";

/** RSVP modal uses wine red for typography on every page theme (hero). */
const RSVP_MODAL_TEXT = "text-[var(--wedding-palette-wine-red)]";
const RSVP_MODAL_PLACEHOLDER =
  "placeholder:text-[color-mix(in_srgb,var(--wedding-palette-wine-red)_45%,transparent)]";
const RSVP_MODAL_RADIO_ITEM =
  "border-[var(--wedding-palette-wine-red)] text-[var(--wedding-palette-wine-red)]";

/** Pixels from bottom to count as “reached end” (subpixel / browser rounding). */
const SCROLL_END_THRESHOLD_PX = 8;

interface RsvpModalContentProps {
  foundPartyMembers: Guest[];
  partyResponses: Record<
    string,
    { attending: string; email: string; phone: string; dietaryRestrictions: string; message: string }
  >;
  updatePartyResponse: (guestId: string, field: string, value: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function RsvpModalContent({
  foundPartyMembers,
  partyResponses,
  updatePartyResponse,
  onClose,
  onSubmit,
  isSubmitting,
}: RsvpModalContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const fitsWithoutScrolling =
      scrollHeight <= clientHeight + SCROLL_END_THRESHOLD_PX;
    const atBottom =
      fitsWithoutScrolling ||
      scrollTop + clientHeight >= scrollHeight - SCROLL_END_THRESHOLD_PX;
    setHasScrolledToBottom(atBottom);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);
    return () => ro.disconnect();
  }, [foundPartyMembers, updateScrollState]);

  const submitDisabled = isSubmitting || !hasScrolledToBottom;

  return (
    <div className="flex flex-col min-h-0 flex-1 overflow-hidden rounded-lg border border-stone-200 bg-[#FAF9F6] p-6 shadow-xl">
      <div className="flex items-center justify-between shrink-0 mb-4">
        <h2 className={`font-wedding-section-heading text-lg ${RSVP_MODAL_TEXT}`}>
          {foundPartyMembers.length > 0
            ? `RSVP for ${foundPartyMembers
                .map((g) => `${g.firstname} ${g.lastname}`)
                .join(" & ")}`
            : "RSVP"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className={`rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${RSVP_MODAL_TEXT}`}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col min-h-0 flex-1 overflow-hidden"
      >
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="py-4 space-y-6 overflow-y-auto min-h-0 flex-1 pr-2"
        >
          {foundPartyMembers.map((guest) => {
            const r =
              partyResponses[guest.id] ?? {
                attending: "",
                email: "",
                phone: "",
                dietaryRestrictions: "",
                message: "",
              };
            return (
              <div
                key={guest.id}
                className="rounded-lg border border-border bg-muted/30 p-4 space-y-4"
              >
                <h4 className={`font-wedding-section-heading text-lg ${RSVP_MODAL_TEXT}`}>
                  {guest.firstname} {guest.lastname}
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className={`${RSVP_MODAL_TEXT} font-wedding-content text-sm tracking-brand`}>
                      Attending
                    </Label>
                    <RadioGroup
                      value={r.attending}
                      onValueChange={(v) =>
                        updatePartyResponse(guest.id, "attending", v)
                      }
                      className="flex gap-6 pt-2"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem
                          value="yes"
                          id={`${guest.id}-yes`}
                          className={RSVP_MODAL_RADIO_ITEM}
                        />
                        <span className={`font-wedding-content text-sm ${RSVP_MODAL_TEXT}`}>
                          Yes
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem
                          value="no"
                          id={`${guest.id}-no`}
                          className={RSVP_MODAL_RADIO_ITEM}
                        />
                        <span className={`font-wedding-content text-sm ${RSVP_MODAL_TEXT}`}>
                          No
                        </span>
                      </label>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${guest.id}-email`}
                      className={`${RSVP_MODAL_TEXT} font-wedding-content text-sm`}
                    >
                      Email
                    </Label>
                    <Input
                      id={`${guest.id}-email`}
                      type="email"
                      placeholder="your@email.com"
                      value={r.email}
                      onChange={(e) =>
                        updatePartyResponse(guest.id, "email", e.target.value)
                      }
                      className={`font-wedding-content ${RSVP_MODAL_TEXT} ${RSVP_MODAL_PLACEHOLDER}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${guest.id}-phone`}
                      className={`${RSVP_MODAL_TEXT} font-wedding-content text-sm`}
                    >
                      Phone
                    </Label>
                    <Input
                      id={`${guest.id}-phone`}
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={r.phone}
                      onChange={(e) =>
                        updatePartyResponse(guest.id, "phone", e.target.value)
                      }
                      className={`font-wedding-content ${RSVP_MODAL_TEXT} ${RSVP_MODAL_PLACEHOLDER}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${guest.id}-dietary`}
                      className={`${RSVP_MODAL_TEXT} font-wedding-content text-sm`}
                    >
                      Dietary restrictions
                    </Label>
                    <Input
                      id={`${guest.id}-dietary`}
                      placeholder="Vegetarian, allergies, etc."
                      value={r.dietaryRestrictions}
                      onChange={(e) =>
                        updatePartyResponse(
                          guest.id,
                          "dietaryRestrictions",
                          e.target.value
                        )
                      }
                      className={`font-wedding-content ${RSVP_MODAL_TEXT} ${RSVP_MODAL_PLACEHOLDER}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`${guest.id}-message`}
                      className={`${RSVP_MODAL_TEXT} font-wedding-content text-sm`}
                    >
                      Message (optional)
                    </Label>
                    <textarea
                      id={`${guest.id}-message`}
                      placeholder="Leave a note for the couple..."
                      value={r.message}
                      onChange={(e) =>
                        updatePartyResponse(guest.id, "message", e.target.value)
                      }
                      rows={3}
                      className={`flex w-full rounded-md border border-input bg-background px-4 py-3 text-sm font-wedding-content ${RSVP_MODAL_TEXT} ${RSVP_MODAL_PLACEHOLDER} transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="shrink-0 pt-4 border-t border-border mt-4">
          <Button
            type="submit"
            size="lg"
            className={`w-full border-0 bg-[var(--wedding-palette-wine-red)] text-[var(--wedding-palette-white-background)] hover:brightness-110 ${weddingNavLinkButtonTypographyClassName}`}
            disabled={submitDisabled}
            title={
              submitDisabled && !isSubmitting
                ? "Scroll to the bottom of the form to submit"
                : undefined
            }
          >
            {isSubmitting ? "Saving..." : "Update response"}
          </Button>
        </div>
      </form>
    </div>
  );
}
