import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../MagneticButton';
import { submitContact, type ContactPayload } from '../../lib/api';
import { soundFX } from '../../lib/audio';
import { Send, Loader2, Check } from 'lucide-react';
import { socialRegistry } from '../../data/socials';
import { SocialTile } from '../social/SocialTile';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactPayload>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [puneTime, setPuneTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setPuneTime(timeStr);
      } catch {
        setPuneTime('15:30');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const validate = (): boolean => {
    const errs: Partial<ContactPayload> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide a valid name (at least 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    setStatusMessage(null);

    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await submitContact(formData);
      if (response.success) {
        setStatusMessage({ type: 'success', text: response.message });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setStatusMessage({ type: 'error', text: response.message });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Network transmission failure. Please email akashsatao2303@gmail.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToast = (text: string) => {
    setToastMessage(`Copied ${text} to clipboard`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <section id="contact" className="relative scroll-mt-28 py-16" aria-label="Exit: Contact">
      {/* Toast Notification for Clipboard Copy */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#0a1020]/95 border border-[#5b8def] text-cream text-xs font-mono shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Room Header Plaque with real Pune Local Time */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-14 border-b border-[#efe6dd]/15 font-mono text-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            06 / Exit
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Departure & Transmission
          </span>
        </div>
        <span className="text-cream-dim uppercase tracking-wider">
          Pune, India • {puneTime} IST • Available for SDE Roles
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Calm Final Statement & Now Line (Cols 1-6) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-cream tracking-tight leading-[1.08] mb-4">
              Let's build something <span className="text-gradient-plaid">enduring</span>.
            </h2>
            <p className="font-sans text-lg text-cream-dim leading-relaxed max-w-[50ch]">
              I am open to Software Development Engineer opportunities across modern Android systems and distributed event-driven backends. Reach out directly or transmit a dispatch.
            </p>
          </div>

          {/* L2.5 "Now" Mono Line (Verified Facts Only) */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-wider text-plaid space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-plaid animate-pulse" />
              <span className="text-cream font-semibold">Now Focus:</span>
            </div>
            <div className="text-cream-dim leading-relaxed normal-case font-sans text-sm">
              Building event-driven backends with Java, Spring Boot, and Apache Kafka; engineering offline-first Android apps with Jetpack Compose.
            </div>
          </div>

          {/* Exit Plaque */}
          <div className="p-5 rounded-2xl bg-[#050813]/60 border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-1">
            <div className="text-cream font-semibold">Exit Plaque • Transmission Station</div>
            <div className="text-cream-dim">Coordinates: Pune, Maharashtra, India (UTC+05:30) • {puneTime} IST</div>
            <div>Response Time: Within 24 Hours via Direct Dispatch</div>
          </div>
        </div>

        {/* Right Column: Quiet Glass Transmission Form (Cols 7-12) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 p-8 sm:p-10 rounded-3xl spatial-glass border border-[#efe6dd]/15 shadow-xl space-y-6"
        >
          <div className="border-b border-[#efe6dd]/10 pb-4">
            <h3 className="font-display font-semibold text-2xl text-cream tracking-tight">
              Send Dispatch
            </h3>
            <p className="font-sans text-sm text-cream-dim mt-1">
              Encrypted transmission directly to personal terminal.
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-xs font-mono border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Your name"
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-white/[0.03] border border-[#efe6dd]/15 text-cream placeholder-cream-dim/40 text-base focus:border-plaid focus:outline-none transition-all"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="name@organization.com"
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-white/[0.03] border border-[#efe6dd]/15 text-cream placeholder-cream-dim/40 text-base focus:border-plaid focus:outline-none transition-all"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                placeholder="Your message or collaboration vision..."
                className="w-full min-h-[120px] px-4 py-3 rounded-xl bg-white/[0.03] border border-[#efe6dd]/15 text-cream placeholder-cream-dim/40 text-base focus:border-plaid focus:outline-none transition-all resize-none"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
            </div>

            {/* Exactly ONE Cherry Action Button per Screen */}
            <div className="pt-2">
              <MagneticButton strength={0.3} className="w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Placement 2: "Find me" Row with 72px Rounded-Square Glass Tiles */}
      <div className="mt-16 pt-12 border-t border-[#efe6dd]/15 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="font-mono text-xs uppercase tracking-widest text-plaid font-semibold">
            Find Me • Public Ledger & Profiles
          </div>
          <div className="font-mono text-xs text-cream-dim">
            300+ problems solved across LeetCode and Codolio
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {socialRegistry.map((social) => (
            <SocialTile key={social.id} item={social} onCopySuccess={handleCopyToast} />
          ))}
        </div>
      </div>

      {/* Legal & Trademark Attribution */}
      <div className="mt-12 pt-6 border-t border-[#efe6dd]/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-cream-dim/60">
        <div>
          Logos are trademarks of their respective owners, used for identification only. Icons via Simple Icons and Devicon.
        </div>
        <div>
          Response SLA: &lt; 24h via Direct Dispatch
        </div>
      </div>
    </section>
  );
};
