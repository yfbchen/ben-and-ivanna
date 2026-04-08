import { useRsvp } from "@/hooks/useRsvp";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { EnvelopeModal } from "@/components/EnvelopeModal";
import { useEffect, useState } from "react";
import type { WeddingTheme } from "@/components/wedding/HeroSection";
import {
  HeroSection,
  OurWeddingSection,
  OurStorySection,
  HisProposalSection,
  GallerySection,
  RegistrySection,
  FaqSection,
  RsvpSection,
  RsvpModalContent,
} from "@/components/wedding";

const WeddingHome = () => {
  useScrollToSection();
  const [selectedTheme, setSelectedTheme] = useState<WeddingTheme>("red");

  useEffect(() => {
    document.documentElement.setAttribute("data-wedding-theme", selectedTheme);
    return () => {
      document.documentElement.removeAttribute("data-wedding-theme");
    };
  }, [selectedTheme]);

  const {
    searchFirstName,
    setSearchFirstName,
    searchLastName,
    setSearchLastName,
    isSearching,
    foundPartyMembers,
    rsvpModalOpen,
    partyResponses,
    updatePartyResponse,
    handleGuestSearch,
    handleRsvpSubmit,
    closeRsvpModal,
    isSubmitting,
  } = useRsvp();

  return (
    <div className="bg-wedding-page text-charcoal">
      <HeroSection selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
      <main className="bg-wedding-main-surface">
        <OurWeddingSection />
        <OurStorySection />
        <HisProposalSection />
        <GallerySection />
        <RegistrySection />
        <FaqSection />
      </main>

      <div className="bg-wedding-rsvp-band border-y border-gold/25">
        <RsvpSection
          searchFirstName={searchFirstName}
          setSearchFirstName={setSearchFirstName}
          searchLastName={searchLastName}
          setSearchLastName={setSearchLastName}
          isSearching={isSearching}
          onSearch={handleGuestSearch}
        />
      </div>

      <EnvelopeModal isOpen={rsvpModalOpen} onClose={closeRsvpModal}>
        <RsvpModalContent
          foundPartyMembers={foundPartyMembers}
          partyResponses={partyResponses}
          updatePartyResponse={updatePartyResponse}
          onClose={closeRsvpModal}
          onSubmit={handleRsvpSubmit}
          isSubmitting={isSubmitting}
        />
      </EnvelopeModal>
    </div>
  );
};

export default WeddingHome;
