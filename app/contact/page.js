'use client'
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const BudgetDropdown = ({handleSelect,setIsOpen,handleClear,budgetOptions,selectedBudget,isOpen}) => {
  

  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
        Approx. Budget (Optional)
      </label>

      <div className="relative">
        {/* Dropdown Trigger */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-left transition-all duration-200 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          whileTap={{ scale: 0.995 }}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${selectedBudget ? 'text-slate-900' : 'text-slate-500'}`}>
              {selectedBudget || 'Select budget range'}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-400"
            >
              <ChevronDownIcon />
            </motion.div>
          </div>
        </motion.button>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-20 mt-2"
            >
              <div className="rounded-xl border border-slate-200 bg-white/95 backdrop-blur-sm shadow-lg ring-1 ring-black/5 overflow-hidden">
                <div className="p-1.5">
                  {budgetOptions.map((option, index) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors duration-150 flex items-center justify-between ${
                        selectedBudget === option
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                      whileHover={{ 
                        scale: 1.01,
                        backgroundColor: selectedBudget === option ? '#dbeafe' : '#f8fafc'
                      }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="text-sm font-medium">{option}</span>
                      {selectedBudget === option && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-blue-600"
                        >
                          <CheckIcon />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                
                {/* Clear Selection */}
                {selectedBudget && (
                  <div className="border-t border-slate-100 p-1.5">
                    <motion.button
                      type="button"
                      onClick={handleClear}
                      className="w-full rounded-lg px-3 py-2.5 text-center text-sm text-slate-500 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-700"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Clear selection
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden input for form submission */}
      <input type="hidden" name="budget" value={selectedBudget} />

      <p className="text-xs text-slate-500 leading-relaxed">
        Helps us recommend the most suitable solution & timeline.
      </p>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 bg-black/10 backdrop-blur-[1px]"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Icon Components
const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);


export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null

  const budgetOptions = [
    "₹10,000 – ₹25,000 (Basic website)",
    "₹25,000 – ₹50,000 (Standard corporate website)",
    "₹50,000 – ₹1,00,000 (Premium / branding & website)",
    "₹1,00,000+ (Full brand + marketing / global launch)",
  ];

  const handleSelect = (option) => {
    setSelectedBudget(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedBudget("");
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.target;
    const formData = new FormData(form);

    // Ensure budget from state also goes in payload (in case your BudgetDropdown doesn't add a hidden input)
    if (selectedBudget) {
      formData.set("budget", selectedBudget);
    }

    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitStatus("success");
      form.reset();
      setSelectedBudget("");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-xs sm:text-sm uppercase tracking-[0.18em] text-slate-500">
            Contact • Vyoma Global
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Let&apos;s discuss your next digital move.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Share a few details about your business and requirements. Our team
            will respond with a clear plan, timelines, and next steps.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] gap-10 lg:gap-12 items-start">
          {/* Form */}
          <div>
            <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Tell us about your project
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  We usually respond within{" "}
                  <span className="font-medium text-emerald-600">
                    24–48 business hours
                  </span>
                  .
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="E.g., Rajiv Sharma"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="E.g., rajiv@sharmagroup.co.in"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                </div>

                {/* Phone + Country */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="E.g., +91 98765 43210"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      Country / City
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="E.g., Dubai, UAE / Ahmedabad, India"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    What do you need help with?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {[
                      "Website Design",
                      "Branding & Identity",
                      "Digital Marketing",
                      "Automation & Integrations",
                    ].map((item) => (
                      <label
                        key={item}
                        className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 cursor-pointer hover:border-emerald-500/70 hover:bg-white transition"
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={item}
                          className="h-3.5 w-3.5 border-slate-300 text-emerald-600 focus:ring-emerald-200"
                        />
                        <span className="group-hover:text-slate-900">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Dropdown (your animated component) */}
                <BudgetDropdown
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleClear={handleClear}
                  budgetOptions={budgetOptions}
                  selectedBudget={selectedBudget}
                  handleSelect={handleSelect}
                />

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    name="projectDetails"
                    placeholder='E.g., “We run a real estate company and want a premium website showcasing our projects, booking form & CRM integration. Looking for modern UI & SEO support as well.”'
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 resize-none"
                  />
                </div>

                {/* Consent + CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <label className="inline-flex items-start gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      name="consent"
                      value="yes"
                      className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                    />
                    <span>
                      I agree to be contacted by Vyoma Global regarding my
                      inquiry.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 sm:px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:shadow-md hover:from-emerald-500 hover:to-emerald-500"
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>

              {/* Status message */}
              {submitStatus === "success" && (
                <p className="mt-3 text-xs sm:text-sm text-emerald-600">
                  Thank you! Your inquiry has been received. We&apos;ll get back
                  to you shortly.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-3 text-xs sm:text-sm text-red-500">
                  Something went wrong while sending your message. Please try
                  again or contact us directly via WhatsApp / Email.
                </p>
              )}
              </form>
            </div>
          </div>

          {/* Info */}
          <aside className="space-y-6 lg:space-y-7">
            <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-600 mb-2">
                Direct Contact
              </p>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Prefer WhatsApp or a quick call?
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[0.18em]">
                    Phone / WhatsApp
                  </p>
                  <p className="mt-1.5 font-medium text-slate-900">
                    +91 84602 07883
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[0.18em]">
                    Email
                  </p>
                  <p className="mt-1.5 font-medium text-slate-900">
                    vyomaglobal01@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[0.18em]">
                    Location
                  </p>
                  <p className="mt-1.5 font-medium text-slate-900">
                    Ahmedabad, India
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
                    Websites
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    120+
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
                    Satisfaction
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    95%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
                    Industries
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    10+
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/90 px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                “We don&apos;t just build websites — we build opportunities,
                trust, and long-term partnerships.”
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-900">
                  Harshil Patel
                </p>
                <p className="text-xs text-slate-500">Founder, Vyoma Global</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}