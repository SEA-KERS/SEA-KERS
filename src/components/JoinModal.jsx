import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2 } from 'lucide-react';

export default function JoinModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    handle: '',
    email: '',
    role: 'Systems & Distributed Engineer',
    proofOfWork: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[var(--bg-surface)] border-2 border-black max-w-lg w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-lg font-bold"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase mb-2">
              <Terminal className="w-4 h-4 text-[#da261c]" />
              <span>COLLECTIVE INTAKE // SPRINT RECRUITMENT</span>
            </div>

            <h3 className="font-headline font-black text-2xl text-[var(--text-main)] mb-2 uppercase">
              Join The Collective
            </h3>

            <p className="font-headline text-sm text-[var(--text-muted)] font-normal mb-6">
              We operate as a flat, meritocratic collective. Access private repos, join 48-hour sprints, and build hard protocol infrastructure.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono">
              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase block mb-1 font-bold">
                  NAME / HANDLE:
                </label>
                <input
                  type="text"
                  required
                  placeholder="@your_handle"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="w-full bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] focus:border-[#da261c] p-3 text-sm text-[var(--text-main)] outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase block mb-1 font-bold">
                  EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  required
                  placeholder="USER@COLLECTIVE.IO"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] focus:border-[#da261c] p-3 text-sm text-[var(--text-main)] outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase block mb-1 font-bold">
                  PRIMARY DISCIPLINE:
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] focus:border-[#da261c] p-3 text-sm text-[var(--text-main)] outline-none font-bold"
                >
                  <option>Systems & Distributed Engineer (Rust / Go / C++)</option>
                  <option>Zero-Knowledge Cryptographer (Circom / Halo2)</option>
                  <option>AI & Neural Security Researcher (PyTorch / LLMs)</option>
                  <option>Smart Contract Auditor (Solidity / Cairo)</option>
                  <option>Frontend & UI/UX Architect (React / Tailwind)</option>
                  <option>Embedded & Robotics Hacker (ROS2 / CUDA)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] uppercase block mb-1 font-bold">
                  GITHUB / REPO OR PROOF OF WORK LINK:
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/yourusername"
                  value={formData.proofOfWork}
                  onChange={(e) => setFormData({ ...formData, proofOfWork: e.target.value })}
                  className="w-full bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] focus:border-[#da261c] p-3 text-sm text-[var(--text-main)] outline-none font-bold"
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-[#da261c] hover:bg-[#b50004] text-white py-3.5 font-mono text-xs font-bold uppercase border-2 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.9)] active:translate-y-0.5 transition-transform"
              >
                <Send className="w-4 h-4" />
                <span>INITIALIZE HANDSHAKE</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#da261c] mx-auto mb-4 animate-bounce" />
            <h3 className="font-headline font-black text-2xl text-[var(--text-main)] uppercase mb-2">
              TRANSMISSION RECEIVED
            </h3>
            <p className="font-mono text-xs text-[var(--text-muted)] font-bold">
              Your proof of work has been logged. Core engineers will initiate contact.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
