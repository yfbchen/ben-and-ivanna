import { useEffect, useState } from "react";
import "./EnvelopeModal.css";

interface EnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function EnvelopeModal({ isOpen, onClose, children }: EnvelopeModalProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [envelopeExiting, setEnvelopeExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsEnvelopeOpen(false);
      setShowModal(false);
      setEnvelopeExiting(false);
      return;
    }
    setIsEnvelopeOpen(false);
    setShowModal(false);
    setEnvelopeExiting(false);
    const t1 = setTimeout(() => setIsEnvelopeOpen(true), 500);
    const t2 = setTimeout(() => setEnvelopeExiting(true), 1200);
    const t3 = setTimeout(() => setShowModal(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="envelope-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Envelope - stays visible until transition completes, then hidden */}
      {!showModal && (
        <div
          className={`envelope-wrapper ${envelopeExiting ? "exiting" : ""}`}
          style={{ pointerEvents: envelopeExiting ? "none" : "auto" }}
        >
          <div
            className={`envelope-container ${isEnvelopeOpen ? "open" : "closed"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="envelope-front">
              <div className="envelope-flap" />
              <div className="envelope-pocket" />
            </div>
            <div className="envelope-letter" />
          </div>
        </div>
      )}
      {/* Modal - fades in as envelope exits */}
      {showModal && (
        <div
          className="envelope-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
}
