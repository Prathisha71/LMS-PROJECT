import React from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { 
  ArrowRight, ShieldCheck, Video, Sparkles, Trophy, 
  Users, Activity, Heart, Star, Layout, CheckCircle 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setView } = useLmsStore();

  const features = [
    {
      icon: Sparkles,
      title: "Contextual AI Tutor",
      desc: "Instant 24/7 explanations in physics, math, and chemistry tailored to your textbook version, board standard, and learning speed."
    },
    {
      icon: Video,
      title: "UHD WebRTC Classrooms",
      desc: "Ultra-low latency streaming with active participant grids, digital whiteboards, and real-time screen shares."
    },
    {
      icon: ShieldCheck,
      title: "DRM Protection",
      desc: "Enterprise-grade media player incorporating watermarking, key rotations, and device constraints for copyrighted lecture safety."
    },
    {
      icon: Trophy,
      title: "Competency Leaderboards",
      desc: "Rankings based on chapter completion rate, quiz accuracy, and consistency streaks rather than plain grades."
    }
  ];

  const statistics = [
    { value: "99.4%", label: "IIT-JEE / CBSE Success Rate" },
    { value: "₹30,000", label: "Average Value per Month" },
    { value: "24/7", label: "Dedicated Subject Matter Experts" },
    { value: "15,000+", label: "High-Income Indian Students Enrolled" }
  ];

  const testimonials = [
    {
      quote: "EduVerse completely revolutionized my daughter's Class 12 prep. The physical kit, combined with the real-time AI tutor, justified every rupee of the premium subscription. She cleared JEE with a top rank.",
      author: "Aditi Rao",
      role: "Parent of Shreya Rao (Class 12 CBSE)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    },
    {
      quote: "The interface is gorgeous. Unlike local coaching portal apps which are cluttered and cartoonish, EduVerse looks like Apple and Stripe. The WebRTC streams are high definition and lag-free.",
      author: "Kabir Mehta",
      role: "Class 12 Student (ISC board)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100"
    }
  ];

  return (
    <div className="relative min-h-screen bg-brand-navy-dark text-slate-100 overflow-x-hidden font-sans selection:bg-brand-royal/35 selection:text-white">
      {/* Background Radial Blobs */}
      <div className="glow-blob w-[500px] h-[500px] bg-brand-royal/20 top-[-100px] left-[-100px]" />
      <div className="glow-blob w-[600px] h-[600px] bg-brand-violet/20 bottom-[-200px] right-[-100px]" />
      <div className="glow-blob w-[400px] h-[400px] bg-cyan-500/10 top-[40%] right-[10%]" />

      {/* Modern Luxury Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-royal to-brand-violet flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-royal/25 group-hover:scale-105 transition-all">
            E
          </div>
          <span className="font-extrabold font-display text-xl tracking-tight text-white group-hover:text-violet-400 transition-colors">
            EduVerse
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Curriculum</a>
          <a href="#statistics" className="hover:text-white transition-colors">Outcomes</a>
          <a href="#pricing" className="hover:text-white transition-colors">Membership</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('login')}
            className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 hover:bg-white/5 rounded-xl transition-all"
          >
            Sign In
          </button>
          <button 
            onClick={() => setView('signup')}
            className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-brand-royal to-brand-violet hover:from-brand-royal-600 hover:to-brand-violet-dark text-white font-semibold shadow-lg shadow-brand-royal/20 transition-all hover:scale-102 active:scale-98"
          >
            Enroll Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-violet-light mb-8 hover:bg-white/10 transition-all cursor-pointer">
          <Sparkles className="w-4.5 h-4.5 animate-spin" />
          <span>India\'s First High-Fidelity K12 LMS Portal</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15] mb-6">
          The Ultimate Academic Platform for <br className="hidden sm:inline" />
          <span className="text-gradient-violet">Class 9–12 Scholars</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10">
          Experience an elite educational workspace blending IIT-JEE caliber pedagogy with Vercel-tier design. Custom dynamic curricula, WebRTC live labs, parent audit metrics, and context-aware AI guidance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={() => setView('student-dash')}
            className="w-full sm:w-auto premium-btn-primary flex items-center justify-center gap-2 group"
          >
            <span>Enter Student Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView('login')}
            className="w-full sm:w-auto premium-btn-secondary"
          >
            Sign In as Educator
          </button>
        </div>

        {/* Hero Interactive App Mockup Frame */}
        <div className="relative glass-card border-white/10 rounded-2xl p-2 sm:p-4 shadow-2xl max-w-4xl mx-auto overflow-hidden group">
          <div className="flex items-center justify-between pb-3 px-3 border-b border-white/5 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] text-slate-500 font-mono">https://dashboard.eduverse.in</div>
            <div className="w-10" />
          </div>
          
          <div className="aspect-[16/9] w-full rounded-xl bg-slate-950 border border-white/5 overflow-hidden flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-[2px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600')` }} />
            <div className="relative z-10 p-6 text-center max-w-md">
              <span className="text-[10px] text-brand-violet-light font-bold uppercase tracking-wider block mb-2">Live Demonstration</span>
              <h3 className="text-xl font-bold mb-3 text-white">Interactive Sandbox Environment</h3>
              <p className="text-xs text-slate-400 mb-6">
                Our prototype models the full dashboard capability of a Student, Teacher, and Administrator, complete with custom curriculum editors and exam sheets.
              </p>
              <button 
                onClick={() => setView('student-dash')}
                className="px-5 py-2.5 rounded-lg bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-colors shadow-lg active:scale-95"
              >
                Launch App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-royal uppercase tracking-widest block mb-2">Elite Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Designed for Academic Supremacy
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4">
            We reject cartoonish student designs in favor of functional, premium SaaS aesthetics that motivate focused study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className="glass-card p-6 flex gap-4 border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-royal/20 to-brand-violet/20 flex items-center justify-center text-brand-royal flex-shrink-0 border border-brand-royal/10">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="relative z-10 max-w-6xl mx-auto px-6 py-16 bg-slate-950/40 border-y border-white/5 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-gradient-violet font-display tracking-tight">{stat.value}</h2>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Subscription Details */}
      <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-violet uppercase tracking-widest block mb-2">Pricing Plans</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            An Investment in Future Outcomes
          </h2>
          <p className="text-sm text-slate-400 mt-4">
            Designed for parents seeking elite results, including physical learning kits and IIT-JEE alumni mentorship.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Plan 1 */}
          <div className="glass-card p-8 border-white/5 relative flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Base Tier</span>
              <h3 className="text-2xl font-bold mt-2 mb-4 text-white">Classic Study</h3>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">₹12,000</span>
                <span className="text-slate-500 text-sm"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-400 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Full board coverage CBSE/ICSE</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Standard video lectures</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Topicwise adaptive MCQs</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Standard email support</li>
              </ul>
            </div>
            <button 
              onClick={() => setView('signup')}
              className="w-full py-3 rounded-xl border border-white/10 hover:border-white/25 text-slate-100 text-xs font-semibold hover:bg-white/5 transition-all"
            >
              Select Plan
            </button>
          </div>

          {/* Premium Plan 2 */}
          <div className="glass-card p-8 border-violet-500/30 bg-gradient-to-b from-brand-navy-light/40 to-slate-950/80 relative flex flex-col justify-between shadow-brand-royal/10">
            {/* Pop badge */}
            <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-royal to-brand-violet text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wide">Elite Tier</span>
              <h3 className="text-2xl font-bold mt-2 mb-4 text-white flex items-center gap-2">
                EduVerse Premium
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">₹30,000</span>
                <span className="text-slate-500 text-sm"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> Dynamic Boards + Class custom syllabus</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> Contextual AI Tutor (unlimited query input)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> Full HD WebRTC live classrooms</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> DRM-encrypted key rotation security</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> Monthly printed notes & workbook shipping</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> Parent audit login with metrics dashboard</li>
              </ul>
            </div>
            <button 
              onClick={() => setView('signup')}
              className="w-full premium-btn-primary text-xs"
            >
              Acquire Membership
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-royal uppercase tracking-widest block mb-2">Testimonials</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Approved by Elite Parents and Educators</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="glass-card p-6 border-white/5 flex flex-col justify-between">
              <p className="text-sm text-slate-300 italic leading-relaxed mb-6">"{test.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={test.avatar} alt={test.author} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{test.author}</h4>
                  <p className="text-[10px] text-slate-500">{test.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/60 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-royal to-brand-violet flex items-center justify-center text-white font-black text-xs shadow-md">
              E
            </div>
            <span className="font-extrabold font-display text-sm tracking-tight text-white">
              EduVerse
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500">
            © 2026 EduVerse Technologies Pvt. Ltd. All rights reserved. Designed for elite scholars.
          </p>
          <div className="flex items-center gap-6 text-[10px] sm:text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
