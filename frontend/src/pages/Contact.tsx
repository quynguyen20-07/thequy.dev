import SEO from "@app/components/SEO";
// src/pages/Contact.jsx
import { useState } from "react";

const contactMethods = [
  {
    id: "email",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "Email",
    value: "quynguyena52000@gmail.com",
    href: "mailto:quynguyena52000@gmail.com",
    color: "from-primary-500/20 to-primary-600/10 border-primary-500/30",
    iconColor: "text-primary-400",
    description: "Best for project inquiries & job opportunities",
  },
  {
    id: "github",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/quynguyen20-07",
    href: "https://github.com/quynguyen20-07",
    color: "from-slate-500/20 to-slate-600/10 border-slate-500/30",
    iconColor: "text-slate-300",
    description: "View my code and open-source contributions",
  },
  {
    id: "linkedin",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/nguyen-the-quy",
    href: "https://www.linkedin.com/in/nguyen-the-quy",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconColor: "text-blue-400",
    description: "Connect professionally & see my work history",
  },
  {
    id: "phone",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: "Phone / WhatsApp",
    value: "+84 944 804 676",
    href: "tel:+84944804676",
    color: "from-green-500/20 to-green-600/10 border-green-500/30",
    iconColor: "text-green-400",
    description: "Available Mon–Fri, 8:00 AM – 6:00 PM (GMT+7)",
  },
];

export default function Contact() {
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
        title="Contact · The Quy Nguyen – Node.js Fullstack Developer"
        description="Get in touch with The Quy Nguyen, a Fullstack Developer specializing in Node.js, NestJS, and React. Available for freelance projects, job opportunities, and technical collaborations in Vietnam."
        keywords="contact The Quy Nguyen, hire Node.js developer Vietnam, freelance NestJS developer, fullstack developer for hire Da Nang, contact fullstack developer Vietnam"
        path="/contact"
      />

      <div className="pt-16">
        {/* Header */}
        <header className="relative py-20 px-4 sm:px-6 overflow-hidden mb-6">
          <div
            className="absolute inset-0 hero-glow pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto text-center">
            <span className="tag-accent mb-4 inline-block">
              Let's Work Together
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Have a project in mind or want to discuss opportunities? I'm
              always open to new conversations.
            </p>
          </div>
        </header>

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
                      {method.icon}
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
