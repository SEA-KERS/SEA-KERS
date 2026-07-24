import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { Send, Terminal, X } from "lucide-react";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";

interface JoinFormData {
  handle: string;
  email: string;
  role: string;
  proofOfWork: string;
}

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [notice, setNotice] = useState("");
  const [formData, setFormData] = useState<JoinFormData>({
    handle: "",
    email: "",
    role: "Systems & Distributed Engineer",
    proofOfWork: "",
  });
  const { dialogRef } = useAccessibleDialog(isOpen, onClose);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(
      "Online submissions are not connected yet. Your details have not been sent or stored.",
    );
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="dialog-backdrop" onMouseDown={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-dialog-title"
        aria-describedby="join-dialog-description"
        tabIndex={-1}
        className="dialog-panel max-w-lg"
      >
        <button type="button" onClick={onClose} aria-label="Close join form" className="icon-button absolute right-4 top-4">
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <p className="section-kicker pr-12">
          <Terminal aria-hidden="true" className="h-4 w-4" />
          Collective intake
        </p>
        <h2 id="join-dialog-title" className="mt-3 font-headline text-3xl font-bold">Join the collective</h2>
        <p id="join-dialog-description" className="mt-3 text-sm leading-6 text-(--muted-foreground)">
          Tell us what you build and share proof of work. This preview does not yet send or store submissions.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="join-handle" className="mb-1.5 block text-sm font-semibold">Name or handle</label>
            <input
              id="join-handle"
              name="handle"
              type="text"
              autoComplete="name"
              required
              value={formData.handle}
              onChange={(event) => setFormData({ ...formData, handle: event.target.value })}
              className="input-control"
            />
          </div>
          <div>
            <label htmlFor="join-email" className="mb-1.5 block text-sm font-semibold">Email address</label>
            <input
              id="join-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="input-control"
            />
          </div>
          <div>
            <label htmlFor="join-role" className="mb-1.5 block text-sm font-semibold">Primary discipline</label>
            <select
              id="join-role"
              name="role"
              value={formData.role}
              onChange={(event) => setFormData({ ...formData, role: event.target.value })}
              className="input-control"
            >
              <option>Systems & Distributed Engineer</option>
              <option>Zero-Knowledge Cryptographer</option>
              <option>AI & Neural Security Researcher</option>
              <option>Smart Contract Auditor</option>
              <option>Frontend & UI/UX Architect</option>
              <option>Embedded & Robotics Hacker</option>
            </select>
          </div>
          <div>
            <label htmlFor="join-proof-of-work" className="mb-1.5 block text-sm font-semibold">Proof of work URL</label>
            <input
              id="join-proof-of-work"
              name="proofOfWork"
              type="url"
              inputMode="url"
              required
              placeholder="https://github.com/yourusername"
              value={formData.proofOfWork}
              onChange={(event) => setFormData({ ...formData, proofOfWork: event.target.value })}
              className="input-control"
            />
          </div>

          {notice ? (
            <p role="status" className="rounded-lg bg-(--accent-soft) p-3 text-sm text-(--accent-text)">{notice}</p>
          ) : null}

          <button type="submit" className="button-primary w-full">
            <Send aria-hidden="true" className="h-4 w-4" />
            Check submission availability
          </button>
        </form>
      </div>
    </div>
  );
}