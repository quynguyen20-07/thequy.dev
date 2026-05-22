import { useContactMethods } from "@app/api/hooks/useContactMethods";
import ContactIcon from "@app/components/ContactIcon";
import PageHeader from "@app/components/PageHeader";
import { usePageSeo } from "@app/api/hooks/useSeo";
import SEO from "@app/components/SEO";
import { useState } from "react";

export default function Contact() {
  const { data: contactMethods = [] } = useContactMethods();
  const { data: seo } = usePageSeo("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Build mailto link
    const subject = encodeURIComponent(formData.subject || "Portfolio Inquiry");
    const body = encodeURIComponent(
      `Hi The Quy,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`,
    );
    window.location.href = `mailto:quynguyena52000@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title={
          seo?.title ?? "Contact · The Quy Nguyen – Node.js Fullstack Developer"
        }
        description={
          seo?.description ??
          "Get in touch with The Quy Nguyen, a Fullstack Developer specializing in Node.js, NestJS, and React. Available for freelance projects, job opportunities, and technical collaborations in Vietnam."
        }
        keywords={
          seo?.keywords ??
          "contact Nguyen The Quy, contact Quy Nguyen, contact quy dev, hire Node.js developer Vietnam, freelance NestJS developer, fullstack developer for hire Da Nang, contact fullstack developer Vietnam"
        }
        path={seo?.path ?? "/contact"}
      />

      <div className="pt-16">
        <PageHeader
          tag="Let's Work Together"
          title={
            <>
              Get In <span className="gradient-text">Touch</span>
            </>
          }
          subtitle="Have a project in mind or want to discuss opportunities? I'm always open to new conversations."
          centered={true}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <section aria-label="Contact information">
              <h2 className="text-xl font-bold text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.id}
                    id={`contact-${method.id}`}
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${method.color} border backdrop-blur-sm hover:scale-[1.02] transition-all duration-200 group`}
                    aria-label={`${method.label}: ${method.value}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl glass flex items-center justify-center ${method.iconColor} group-hover:scale-110 transition-transform shrink-0`}
                    >
                      <ContactIcon iconType={method.iconType} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-slate-400 text-xs mb-0.5">
                        {method.label}
                      </div>
                      <div className="text-white font-semibold text-sm truncate">
                        {method.value}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {method.description}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Location */}
              <div className="mt-8 card">
                <h3 className="text-white font-bold mb-3 text-sm">
                  📍 Location
                </h3>
                <p className="text-slate-400 text-sm">
                  21 Bui Ky, Cam Le District
                </p>
                <p className="text-slate-400 text-sm">Da Nang, Vietnam 🇻🇳</p>
                <p className="text-slate-500 text-xs mt-2">
                  Timezone: GMT+7 (Indochina Time)
                </p>
              </div>

              {/* Availability */}
              <div className="mt-4 glass rounded-2xl p-5 border border-accent-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full bg-accent-400 animate-pulse"
                    aria-hidden="true"
                  />
                  <h3 className="text-accent-400 font-bold text-sm">
                    Currently Available
                  </h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Open to freelance projects, full-time opportunities, and
                  technical collaborations. I typically respond within 24 hours.
                </p>
              </div>
            </section>

            {/* Contact Form */}
            <section aria-label="Contact form">
              <h2 className="text-xl font-bold text-white mb-6">
                Send Me a Message
              </h2>

              {submitted ? (
                <div className="glass rounded-2xl p-10 text-center border border-accent-500/30">
                  <div
                    className="text-4xl mb-4"
                    role="img"
                    aria-label="Success"
                  >
                    ✅
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Your email client has opened. Thank you for reaching out —
                    I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 btn-secondary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                  aria-label="Contact form"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-slate-400 text-xs mb-1.5 font-medium"
                      >
                        Your Name{" "}
                        <span className="text-red-400" aria-label="required">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-slate-400 text-xs mb-1.5 font-medium"
                      >
                        Email Address{" "}
                        <span className="text-red-400" aria-label="required">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-slate-400 text-xs mb-1.5 font-medium"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-slate-400 text-xs mb-1.5 font-medium"
                    >
                      Message{" "}
                      <span className="text-red-400" aria-label="required">
                        *
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    className="w-full btn-primary justify-center py-4 text-base"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Message
                  </button>

                  <p className="text-slate-600 text-xs text-center">
                    This will open your email client. I respond within 24 hours.
                  </p>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
