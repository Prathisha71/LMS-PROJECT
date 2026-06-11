import React, { useState } from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { Lock, Mail, ArrowRight, User, GraduationCap, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setView, profile } = useLmsStore();
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide correct credentials.');
      return;
    }

    // Set the user profile role in our mock store
    useLmsStore.setState((state) => ({
      profile: {
        ...state.profile,
        role: role,
        name: role === 'student' ? 'Prathamesh Sharma' : role === 'teacher' ? 'Dr. Ramesh Sen' : 'Platform Administrator',
        email: email
      }
    }));

    // Redirect to correct dashboard
    if (role === 'student') {
      setView('student-dash');
    } else if (role === 'teacher') {
      setView('teacher-dash');
    } else {
      setView('admin-structure');
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-navy-dark text-slate-100 flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Blobs */}
      <div className="glow-blob w-[400px] h-[400px] bg-brand-royal/10 -top-20 -left-20" />
      <div className="glow-blob w-[450px] h-[450px] bg-brand-violet/10 -bottom-20 -right-20" />

      {/* Floating brand header */}
      <div 
        onClick={() => setView('landing')}
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer group z-10"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-royal to-brand-violet flex items-center justify-center text-white font-black text-xs shadow-md">
          E
        </div>
        <span className="font-extrabold font-display text-sm tracking-tight text-white group-hover:text-violet-400 transition-all">
          EduVerse
        </span>
      </div>

      {/* Login Form Card */}
      <div className="w-full max-w-md glass-card p-8 border-white/5 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold font-display text-white tracking-tight">Access Scholar Workspace</h2>
          <p className="text-xs text-slate-400 mt-2">Sign in using your parents' billing credential or institutional key.</p>
        </div>

        {/* Role Select Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/60 border border-white/5 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              role === 'student' 
                ? 'bg-gradient-to-r from-brand-royal to-brand-violet text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              role === 'teacher' 
                ? 'bg-gradient-to-r from-brand-royal to-brand-violet text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              role === 'admin' 
                ? 'bg-gradient-to-r from-brand-royal to-brand-violet text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Academic Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="you@eduverse.in"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="premium-input pl-10 text-xs sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Secured Password</label>
              <a href="#" className="text-[10px] text-brand-violet-light hover:underline font-semibold">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="premium-input pl-10 pr-10 text-xs sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input 
              id="remember" 
              type="checkbox" 
              className="w-4 h-4 bg-slate-900 border-white/10 rounded focus:ring-brand-royal text-brand-royal" 
            />
            <label htmlFor="remember" className="ml-2 text-xs text-slate-400 select-none">
              Remember this device for 30 days
            </label>
          </div>

          <button
            type="submit"
            className="w-full premium-btn-primary py-3.5 text-xs font-bold"
          >
            <span>Authenticate Securely</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-white/5 text-xs text-slate-400">
          Not yet registered?{' '}
          <button 
            onClick={() => setView('signup')}
            className="text-brand-violet-light font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
