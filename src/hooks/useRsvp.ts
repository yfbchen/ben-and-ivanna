import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { Guest, PartyResponse } from "@/data/wedding";

export function useRsvp() {
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundPartyMembers, setFoundPartyMembers] = useState<Guest[]>([]);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partyResponses, setPartyResponses] = useState<
    Record<string, PartyResponse>
  >({});

  const handleGuestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const first = searchFirstName.trim();
    const last = searchLastName.trim();
    if (!first || !last) {
      toast.error("Please enter both first and last name.");
      return;
    }
    setIsSearching(true);
    setFoundPartyMembers([]);
    try {
      const { data: matchedGuest, error: searchError } = await supabase
        .from("guests")
        .select("party_id")
        .ilike("firstname", first)
        .ilike("lastname", last)
        .limit(1)
        .maybeSingle();

      if (searchError) throw searchError;
      if (!matchedGuest) {
        toast.error(
          "We couldn't find your invitation. Please check the spelling or contact us."
        );
        return;
      }

      const { data: partyGuests, error: partyError } = await supabase
        .from("guests")
        .select(
          "id, party_id, firstname, lastname, email, phone, attending, dietary_restrictions, message, updated_at"
        )
        .eq("party_id", matchedGuest.party_id)
        .order("firstname");

      if (partyError) throw partyError;
      const guests = partyGuests ?? [];
      setFoundPartyMembers(guests);
      setPartyResponses(
        Object.fromEntries(
          guests.map((g) => [
            g.id,
            {
              attending:
                g.attending === "yes" || g.attending === "no" ? g.attending : "",
              email: "",
              phone: "",
              dietaryRestrictions: "",
              message: "",
            },
          ])
        )
      );
      setRsvpModalOpen(true);
    } catch (error) {
      console.error("Guest search error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const updatePartyResponse = (guestId: string, field: string, value: string) => {
    setPartyResponses((prev) => ({
      ...prev,
      [guestId]: {
        ...(prev[guestId] ?? {
          attending: "",
          email: "",
          phone: "",
          dietaryRestrictions: "",
          message: "",
        }),
        [field]: value,
      },
    }));
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      for (const guest of foundPartyMembers) {
        const r = partyResponses[guest.id];
        if (!r) continue;
        const { error } = await supabase
          .from("guests")
          .update({
            attending: r.attending || null,
            email: r.email.trim() || null,
            phone: r.phone.trim() || null,
            dietary_restrictions: r.dietaryRestrictions.trim() || null,
            message: r.message.trim() || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", guest.id);

        if (error) throw error;
      }
      toast.success("Thank you! Your response has been saved.");
      setRsvpModalOpen(false);
    } catch (error) {
      console.error("RSVP update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeRsvpModal = () => setRsvpModalOpen(false);

  return {
    searchFirstName,
    setSearchFirstName,
    searchLastName,
    setSearchLastName,
    isSearching,
    foundPartyMembers,
    rsvpModalOpen,
    setRsvpModalOpen,
    isSubmitting,
    partyResponses,
    updatePartyResponse,
    handleGuestSearch,
    handleRsvpSubmit,
    closeRsvpModal,
  };
}
