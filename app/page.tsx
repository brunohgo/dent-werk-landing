'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, MapPin, Instagram, Award, Gem, Cpu, Users, Shield, Heart, 
  ArrowRight, X, Menu 
} from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';
import ThreeDExperience from '@/components/ThreeDExperience';

// Floating WhatsApp Button
function FloatingWhatsApp() {
  const { t } = useI18n();
  const phone = t('contact.whatsappNumber').replace(/\s/g, '');
  
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de agendar uma consulta no Dent Werk.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="whatsapp-btn fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-2xl shadow-2xl shadow-[#25D366]/30 transition-all active:scale-[0.985]"
      aria-label={t('nav.whatsapp')}
    >
      <Phone className="w-5 h-5" />
      <span className="font-semibold text-sm tracking-wide hidden sm:block">{t('nav.whatsapp')}</span>
    </button>
  );
}

// Navbar
function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#about', label: t('nav.menu.about') },
    { href: '#specialty', label: t('nav.menu.specialty') },
    { href: '#experience', label: t('nav.menu.experience') },
    { href: '#cases', label: t('nav.menu.cases') },
    { href: '#process', label: t('nav.menu.process') },
    { href: '#why', label: t('nav.menu.why') },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    const phone = t('contact.whatsappNumber').replace(/\s/g, '');
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre as próteses no Dent Werk.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
            <span className="text-white font-bold text-xl tracking-[-1.5px]">DW</span>
          </div>
          <div>
            <div className="font-semibold text-xl tracking-[-0.5px] text-[#0F172A]">{t('nav.logo')}</div>
            <div className="text-[10px] text-[#0D9488] -mt-1 font-medium tracking-[1px]">{t('nav.tagline')}</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-9 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href.slice(1))}
              className="nav-link text-[#334155] hover:text-[#0F172A] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side: Language + WhatsApp */}
        <div className="flex items-center gap-4">
          {/* Language Switcher - Elegant */}
          <div className="language-switcher hidden md:flex">
            {(['pt', 'en', 'es'] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={locale === lang ? 'active' : ''}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* WhatsApp Button */}
          <button 
            onClick={openWhatsApp}
            className="hidden md:flex items-center gap-2.5 bg-[#0F172A] hover:bg-black text-white text-sm font-semibold px-6 h-11 rounded-2xl transition-all active:scale-[0.985]"
          >
            <Phone className="w-4 h-4" />
            {t('nav.whatsapp')}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-2 text-[#0F172A]"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white px-6 py-8 flex flex-col gap-6 text-lg"
          >
            {navItems.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href.slice(1))} className="text-left text-[#334155]">
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t flex flex-col gap-4">
              <div className="flex gap-2">
                {(['pt', 'en', 'es'] as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`flex-1 py-2.5 rounded-2xl text-sm font-medium border ${locale === lang ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'border-slate-200'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <button onClick={openWhatsApp} className="w-full flex items-center justify-center gap-2 bg-[#0F172A] text-white py-3.5 rounded-2xl font-semibold">
                <Phone className="w-4 h-4" /> {t('nav.whatsapp')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Hero Section
function Hero() {
  const { t } = useI18n();

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openWhatsApp = () => {
    const phone = t('contact.whatsappNumber').replace(/\s/g, '');
    const message = encodeURIComponent("Olá! Gostaria de agendar uma avaliação no Dent Werk.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 bg-[#0F172A] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs tracking-[2px] font-medium mb-6 border border-white/20">
          LISBOA • PORTUGAL
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-2.5px] leading-[0.95] mb-6">
          {t('hero.headline')}
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/70 mb-10 tracking-[-0.2px]">
          {t('hero.subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToExperience}
            className="group flex items-center justify-center gap-3 bg-white text-[#0F172A] font-semibold px-9 h-14 rounded-2xl text-base active:scale-[0.985] transition-all"
          >
            {t('hero.cta3d')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
          <button 
            onClick={openWhatsApp}
            className="flex items-center justify-center gap-3 border border-white/40 hover:bg-white/5 font-semibold px-9 h-14 rounded-2xl text-base transition-all active:scale-[0.985]"
          >
            <Phone className="w-4 h-4" />
            {t('hero.ctaWhatsapp')}
          </button>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}

// About Section
function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-12">
        <div className="text-[#0D9488] text-xs tracking-[3px] font-semibold mb-3">EST. 2012 • LISBOA</div>
        <h2 className="section-title text-balance">{t('about.title')}</h2>
        <p className="mt-4 text-xl text-[#475569] max-w-md mx-auto">{t('about.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 text-[15px] leading-relaxed text-[#334155]">
        <div className="space-y-6">
          <p>{t('about.description1')}</p>
          <p>{t('about.description2')}</p>
        </div>
        <div className="space-y-6">
          <div className="p-8 bg-[#F8FAFC] rounded-3xl border border-slate-100">
            <p className="italic text-lg text-[#0F172A] leading-tight">“{t('about.philosophy')}”</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <MapPin className="w-5 h-5 text-[#0D9488]" />
            <span className="font-medium">{t('about.location')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Specialty Section
function Specialty() {
  const { t } = useI18n();
  const services = t('specialty.services') as any[];

  const icons = [Award, Gem, Cpu, Users, Shield, Heart];

  return (
    <section id="specialty" className="bg-[#F8FAFC] py-20 md:py-24 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="section-title">{t('specialty.title')}</h2>
          <p className="mt-4 text-xl text-[#475569]">{t('specialty.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className="card bg-white p-8 rounded-3xl border border-slate-100 group">
                <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center mb-6 group-hover:bg-[#0D9488]/15 transition-colors">
                  <Icon className="w-6 h-6 text-[#0D9488]" />
                </div>
                <h3 className="font-semibold text-xl tracking-tight mb-3">{service.title}</h3>
                <p className="text-[#475569] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Gallery Section with Modal
function Gallery() {
  const { t } = useI18n();
  const cases = t('gallery.cases') as any[];
  const [selected, setSelected] = useState<any>(null);

  return (
    <section id="cases" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="section-title">{t('gallery.title')}</h2>
          <p className="mt-3 text-xl text-[#475569]">{t('gallery.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem: any, index: number) => (
          <div 
            key={index} 
            onClick={() => setSelected(caseItem)}
            className="gallery-card group cursor-pointer overflow-hidden rounded-3xl border border-slate-100 bg-white"
          >
            <div className="relative aspect-[16/10] bg-[#F1F5F9] overflow-hidden">
              <img 
                src={`https://picsum.photos/id/${(index + 29) % 40 + 10}/800/600`} 
                alt={caseItem.title}
                className="gallery-img absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="font-semibold text-lg tracking-tight">{caseItem.title}</div>
                <div className="text-white/70 text-sm mt-0.5">{caseItem.patient}</div>
              </div>
            </div>
            <div className="p-6 text-sm text-[#475569] line-clamp-3">
              {caseItem.description}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setSelected(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ ease: [0.32, 0.72, 0, 1] }}
              className="modal bg-white rounded-3xl max-w-4xl w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={`https://picsum.photos/id/${(selected.id + 28) % 40 + 10}/1200/700`} 
                  alt={selected.title}
                  className="w-full aspect-video object-cover"
                />
                <button 
                  onClick={() => setSelected(null)} 
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 md:p-10">
                <div className="uppercase text-xs tracking-[2px] text-[#0D9488] font-semibold mb-1">{selected.patient}</div>
                <h3 className="text-3xl font-semibold tracking-tight mb-4">{selected.title}</h3>
                <p className="text-lg text-[#334155] leading-relaxed max-w-3xl">{selected.description}</p>
                
                <div className="mt-8 pt-6 border-t flex flex-wrap gap-4 text-sm">
                  <div className="px-5 py-2 bg-[#F8FAFC] rounded-2xl text-[#0D9488] font-medium">Zircónia Multilayer</div>
                  <div className="px-5 py-2 bg-[#F8FAFC] rounded-2xl text-[#0D9488] font-medium">Tecnologia CAD/CAM 5 Eixos</div>
                  <div className="px-5 py-2 bg-[#F8FAFC] rounded-2xl text-[#0D9488] font-medium">Garantia 10+ anos</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Process Section
function Process() {
  const { t } = useI18n();
  const steps = t('process.steps') as any[];

  return (
    <section id="process" className="bg-[#0F172A] text-white py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[#0D9488] text-xs tracking-[3px] font-semibold mb-3">METODOLOGIA</div>
          <h2 className="section-title text-white">{t('process.title')}</h2>
          <p className="mt-4 text-xl text-white/70 max-w-lg mx-auto">{t('process.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {steps.map((step: any, index: number) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start border-l-2 border-white/10 pl-8 md:pl-0 md:border-l-0 md:border-t-2 md:pt-8 group">
              <div className="md:w-24 flex-shrink-0">
                <div className="step-number text-[#0D9488]">{step.number}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-2xl tracking-tight mb-3 group-hover:text-[#0D9488] transition-colors">{step.title}</h3>
                <p className="text-white/70 text-[15px] leading-relaxed max-w-3xl">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us
function WhyChoose() {
  const { t } = useI18n();
  const reasons = t('why.reasons') as any[];

  const iconMap: any = { Award, Gem, Cpu, Users, Shield, Heart };

  return (
    <section id="why" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-14">
        <h2 className="section-title">{t('why.title')}</h2>
        <p className="mt-4 text-xl text-[#475569]">{t('why.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason: any, index: number) => {
          const Icon = iconMap[reason.icon] || Award;
          return (
            <div key={index} className="card p-8 rounded-3xl border border-slate-100 bg-white">
              <div className="w-11 h-11 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center mb-6">
                <Icon className="w-5.5 h-5.5 text-[#0D9488]" />
              </div>
              <h3 className="font-semibold text-[21px] tracking-[-0.3px] mb-3">{reason.title}</h3>
              <p className="text-[#475569] leading-relaxed">{reason.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Contact / Final CTA
function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phone = t('contact.whatsappNumber').replace(/\s/g, '');
    const text = encodeURIComponent(
      `Ólá! Meu nome é ${formData.name}. \nEmail: ${formData.email}\nTelefone: ${formData.phone}\n\n${formData.message || 'Gostaria de agendar uma consulta de avaliação.'}`
    );
    
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2200);
  };

  const openWhatsAppDirect = () => {
    const phone = t('contact.whatsappNumber').replace(/\s/g, '');
    const message = encodeURIComponent("Ólá! Gostaria de agendar uma consulta de avaliação no Dent Werk.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="bg-[#F8FAFC] border-t border-slate-100 py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="mt-4 text-xl text-[#475569] max-w-md mx-auto">{t('contact.subtitle')}</p>

        <div className="mt-10">
          <button 
            onClick={openWhatsAppDirect}
            className="whatsapp-btn inline-flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-black active:bg-black text-white text-lg font-semibold px-14 h-16 rounded-2xl shadow-xl shadow-[#0F172A]/20 transition-all"
          >
            <Phone className="w-5 h-5" />
            {t('contact.whatsapp')}
          </button>
          <p className="mt-3 text-xs text-[#64748B]">{t('contact.whatsappNumber')}</p>
        </div>

        {/* Simple Form */}
        <div className="mt-16 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder={t('contact.form.name')} 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input w-full border border-slate-200 bg-white h-12 px-5 rounded-2xl text-sm focus:border-[#0D9488]" 
                required 
              />
              <input 
                type="tel" 
                placeholder={t('contact.form.phone')} 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input w-full border border-slate-200 bg-white h-12 px-5 rounded-2xl text-sm focus:border-[#0D9488]" 
                required 
              />
            </div>
            <input 
              type="email" 
              placeholder={t('contact.form.email')} 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="input w-full border border-slate-200 bg-white h-12 px-5 rounded-2xl text-sm focus:border-[#0D9488]" 
              required 
            />
            <textarea 
              placeholder={t('contact.form.message')} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={4}
              className="input w-full border border-slate-200 bg-white p-5 rounded-3xl text-sm resize-y min-h-[120px] focus:border-[#0D9488]" 
            />
            
            <button 
              type="submit"
              disabled={submitted}
              className="w-full h-14 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-[#0F766E] transition-all text-white font-semibold rounded-2xl text-base active:scale-[0.985]"
            >
              {submitted ? t('contact.form.success') : t('contact.form.submit')}
            </button>
          </form>
        </div>

        {/* Location */}
        <div className="mt-16 pt-10 border-t border-slate-200 text-sm">
          <div className="font-semibold text-[#0F172A] mb-1">{t('contact.location.title')}</div>
          <div className="text-[#475569]">{t('contact.location.address')}<br />{t('contact.location.city')}</div>
          <div className="text-xs text-[#64748B] mt-1.5">{t('contact.location.note')}</div>
          
          <div className="mt-6 flex justify-center">
            <a href="https://instagram.com/dentwerk.lisboa" target="_blank" className="flex items-center gap-2 text-[#0D9488] hover:underline text-sm font-medium">
              <Instagram className="w-4 h-4" /> {t('contact.instagram')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white/60 text-sm py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-y-4">
        <div>{t('footer.rights').replace('{year}', year.toString())}</div>
        <div className="flex gap-x-8">
          <span className="hover:text-white/80 cursor-pointer">{t('footer.privacy')}</span>
          <span className="hover:text-white/80 cursor-pointer">{t('footer.terms')}</span>
        </div>
        <div className="text-xs tracking-widest">{t('footer.madeWith')}</div>
      </div>
    </footer>
  );
}

// Main Page
export default function DentWerkLanding() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Specialty />
      
      {/* 3D Experience - The Star Section */}
      <section id="experience" className="max-w-7xl mx-auto px-6 py-20 md:py-24 border-y border-slate-100 bg-white">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 text-xs tracking-[2.5px] font-semibold text-[#0D9488] bg-[#0D9488]/10 rounded-full mb-4">TECNOLOGIA DE ELITE</div>
          <h2 className="section-title">{t('experience3d.title')}</h2>
          <p className="mt-4 text-xl text-[#475569] max-w-2xl mx-auto">{t('experience3d.subtitle')}</p>
        </div>
        
        <ThreeDExperience />
      </section>

      <Gallery />
      <Process />
      <WhyChoose />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
