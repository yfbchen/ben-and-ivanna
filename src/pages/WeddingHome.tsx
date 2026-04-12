import { useRsvp } from "@/hooks/useRsvp";
import { scrollToSectionWithRetry, useScrollToSection } from "@/hooks/useScrollToSection";
import { useHeroImagesReady } from "@/hooks/useHeroImagesReady";
import { EnvelopeModal } from "@/components/EnvelopeModal";
import { useEffect } from "react";
import { WEDDING_HERO_IMAGE_URLS } from "@/components/wedding/HeroSection";
import { useWeddingThemeController } from "@/hooks/useWeddingThemeController";
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
  const heroImagesReady = useHeroImagesReady(WEDDING_HERO_IMAGE_URLS);
  useScrollToSection(heroImagesReady);
  const { selectedTheme, handleThemeChange } = useWeddingThemeController();

  useEffect(() => {
    if (!heroImagesReady) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [heroImagesReady]);

  useEffect(() => {
    if (!heroImagesReady) return;
    const id = window.location.hash.slice(1);
    if (id) {
      scrollToSectionWithRetry(id, { maxAttempts: 80, intervalMs: 40 });
    }
  }, [heroImagesReady]);

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

  if (!heroImagesReady) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-wedding-page"
        aria-busy="true"
        aria-label="Loading wedding page"
      />
    );
  }

  return (
    <div className="bg-wedding-page text-wedding-body">
      <HeroSection selectedTheme={selectedTheme} onThemeChange={handleThemeChange} />
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

      <footer
        role="contentinfo"
        className="bg-wedding-rsvp-band border-b border-gold/25 px-6 py-4 md:px-10 lg:px-14"
      >
        <p className="font-wedding-content text-center text-xs tracking-brand text-white/95 md:text-sm">
          © Ivanna &amp; Ben
        </p>
      </footer>

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
