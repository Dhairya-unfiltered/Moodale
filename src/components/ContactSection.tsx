
import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const whatsappNumber = "+917983738443"; 
    const message = `New Inquiry from Website:\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nMessage: ${formData.message}`;
  
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  
    
    window.open(whatsappURL, '_blank');
  
    // Reset form state
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
    }, 1500);
  };
  

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: 'Email Us',
      info: 'moodale2020@gmail.com',
      link: 'mailto:moodale2020@gmail.com'
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: 'Call Us',
      info: '+91 9045655504',
      link: 'tel:+919045655504'
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: 'Office',
      info: 'Bangalore, Karnataka',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-primary/10 to-blue-400/10 blur-3xl" />
      </div>

      <div className="section-container">
        <h2 className="section-title text-center">Get in Touch</h2>
        <p className="section-subtitle text-center">
          Ready to boost your digital presence? Reach out to us today to discuss your marketing needs.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="contact-form-input"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    How Can We Help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="contact-form-input resize-none"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="glass-panel p-6 rounded-xl transition-transform hover:translate-y-[-5px]"
              >
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary/10 mr-4">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{info.title}</h3>
                    <p className="text-muted-foreground">{info.info}</p>
                  </div>
                </div>
              </a>
            ))}

            <div className="glass-panel p-6 rounded-xl">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <a  href="https://wa.me/7983738443" target="_blank">
                <div>
                  <h3 className="text-lg font-medium mb-1">Chat with us</h3>
                  <p className="text-muted-foreground mb-3">Message us on WhatsApp — we’ll reply within 12 hours.</p>
                </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
