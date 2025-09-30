import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', title: '', email: '', phone: '', message: ''
  });

  const handleChange = (k: string, v: string) =>
    setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 hook up API / webhook here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center bg-white/5 border border-green-600/30 rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
        </div>
        <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-light mb-2">Message Sent!</h3>
        <p className="text-white/70 text-sm sm:text-base">We'll get back with a tailored plan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-white/80 text-xs sm:text-sm font-light mb-1.5 sm:mb-2">Name *</label>
          <input
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-white/80 text-xs sm:text-sm font-light mb-1.5 sm:mb-2">Company *</label>
          <input
            required
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/80 text-xs sm:text-sm font-light mb-1.5 sm:mb-2">Title *</label>
        <input
          required
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-red-600 outline-none"
          placeholder="Your job title"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-white/80 text-xs sm:text-sm font-light mb-1.5 sm:mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-white/80 text-xs sm:text-sm font-light mb-1.5 sm:mb-2">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/80 text-xs sm:text-sm font-light mb-1.5 sm:mb-2">Message *</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-red-600 outline-none resize-none"
          placeholder="Tell us about goals, timeline, success definition."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-light text-base sm:text-lg hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2 group"
      >
        <span>Send Message</span>
        <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

// Unfortunately, contact forms are also often used to spread spam on a massive scale. To protect yourself from spam messages and fake email signups, you can enable reCAPTCHA verification in your settings. You can also require people who sign up for emails to confirm their email address.

// Other important components of a contact form include legal notices, which you can include anywhere in your form. This, of course, also includes a submit button at the bottom of the form. A contact form can be embedded on any of your websites. Mailchimp can help you create and embed a contact form on your website .
// we can add way more inputs for company details, help with the warm outreach and filter non company clients, but make it more coplicated to send a message
// we can add in the pop up a button to go to the most frequently asked questions
//we will have a contact form and an AI chat bot? the Ai is fast and dos not save info(we can make it do it for the warm outreach),
//the contact form is more serious and the results will be better but it takes longer for us to answer