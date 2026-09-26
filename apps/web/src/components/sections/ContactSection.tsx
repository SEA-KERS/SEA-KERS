import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

export default function ContactSection() {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      className={`relative w-full bg-[#0a0d17] text-white px-4 py-20 md:px-8 md:py-32 border-t border-neutral-800/80 reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#da261c]/30 bg-[#da261c]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#da261c]">
            <span className="h-2 w-2 rounded-full bg-[#da261c] animate-pulse" />
            Let's Connect
          </div>

          <h2
            id="contact-title"
            className="mt-4 font-headline text-4xl sm:text-5xl font-black leading-[0.95] tracking-tight text-white"
          >
            Engineering The <span className="text-[#da261c]">Frontier</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-300">
            For collaborators, investors, and innovators building the future together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Connect Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <a
              href="mailto:ogmanoja@gmail.com"
              className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-[#12141d] hover:bg-[#161924] p-5 transition-all hover:border-[#da261c]/50 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-[#da261c] shadow-xs">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  Email
                </p>
                <p className="text-sm font-bold text-white font-mono group-hover:text-[#da261c] transition-colors">
                  ogmanoja@gmail.com
                </p>
              </div>
            </a>

            <div className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-[#12141d] hover:bg-[#161924] p-5 transition-all hover:border-[#da261c]/50 hover:shadow-lg">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-[#da261c] shadow-xs">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  Phone
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white font-mono">
                  <a
                    href="tel:+918660814164"
                    className="hover:text-[#da261c] transition-colors"
                  >
                    +91 86608 14164
                  </a>
                  <span className="text-neutral-500 font-normal">/</span>
                  <a
                    href="tel:+917019884773"
                    className="hover:text-[#da261c] transition-colors"
                  >
                    +91 70198 84773
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-[#18181c] via-[#111114] to-[#09090b] p-6 sm:p-10 shadow-xl text-white">
              {/* Corner accent bracket */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-16 w-16 border-t-2 border-r-2 border-[#da261c] pointer-events-none"
              />

              {submitted ? (
                <div className="py-12 text-center animate-in fade-in duration-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-headline text-2xl font-bold">Transmission Received</h3>
                  <p className="mt-2 text-sm text-neutral-300 max-w-sm mx-auto">
                    Thanks for reaching out, {name}. Our core team will review your message and connect within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="mt-6 text-xs font-mono font-bold text-[#da261c] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-neutral-800 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#da261c] focus:outline-none focus:ring-1 focus:ring-[#da261c]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-neutral-800 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#da261c] focus:outline-none focus:ring-1 focus:ring-[#da261c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-neutral-800 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#da261c] focus:outline-none focus:ring-1 focus:ring-[#da261c] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-lg bg-[#da261c] px-6 py-3 font-mono text-sm font-bold tracking-wider text-white shadow-lg transition-all hover:bg-[#b91c1c] active:scale-[0.99] cursor-pointer"
                  >
                    <span>Initiate Collaboration</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
