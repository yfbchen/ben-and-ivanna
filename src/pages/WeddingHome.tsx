import { useRsvp } from "@/hooks/useRsvp";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { EnvelopeModal } from "@/components/EnvelopeModal";
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
    <>
      <HeroSection />
      <OurWeddingSection />
      <OurStorySection />
      <HisProposalSection />
      <GallerySection />
      <RegistrySection />
      <FaqSection />
      <RsvpSection
        searchFirstName={searchFirstName}
        setSearchFirstName={setSearchFirstName}
        searchLastName={searchLastName}
        setSearchLastName={setSearchLastName}
        isSearching={isSearching}
        onSearch={handleGuestSearch}
      />

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
    </>
  );
};

export default WeddingHome;
