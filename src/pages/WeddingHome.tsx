import { useRsvp } from "@/hooks/useRsvp";
import { scrollToSection, useScrollToSection } from "@/hooks/useScrollToSection";
import { useHeroImagesReady } from "@/hooks/useHeroImagesReady";
import { EnvelopeModal } from "@/components/EnvelopeModal";
import { useEffect, useState } from "react";
import {
  applyWeddingThemeCssVars,
  clearWeddingThemeCssVars,
  type WeddingTheme,
} from "@/config/weddingThemeTokens";
import { WEDDING_HERO_IMAGE_URLS } from "@/components/wedding/HeroSection";
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
  const heroImagesReady = useHeroImagesReady(WEDDING_HERO_IMAGE_URLS);
  const [selectedTheme, setSelectedTheme] = useState<WeddingTheme>("red");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-wedding-theme", selectedTheme);
    applyWeddingThemeCssVars(root, selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.removeAttribute("data-wedding-theme");
      clearWeddingThemeCssVars(root);
    };
  }, []);

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
      requestAnimationFrame(() => scrollToSection(id));
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

      <footer
        role="contentinfo"
        className="bg-wedding-rsvp-band border-b border-gold/25 px-6 py-4 md:px-10 lg:px-14"
      >
        <p className="font-wedding-content text-center text-sm tracking-brand text-white/95 md:text-left md:text-[15px]">
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
