import React, { useState } from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { 
  User, GraduationCap, ChevronRight, ChevronLeft, 
  Mail, Lock, BookOpen, Check, Wallet, HelpCircle 
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { setView, boards } = useLmsStore();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Academic States
  const [boardId, setBoardId] = useState('cbse');
  const [classId, setClassId] = useState('class-12');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['physics-12', 'chemistry-12']);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('');

  const activeBoard = boards.find(b => b.id === boardId) || boards[0];
  const activeClass = activeBoard.classes.find(c => c.id === classId) || activeBoard.classes[0];

  const handleSubjectToggle = (subId: string) => {
    if (selectedSubjects.includes(subId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subId));
    } else {
      setSelectedSubjects([...selectedSubjects, subId]);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Populate active store state with new signup details
    useLmsStore.setState((state) => ({
      profile: {
        ...state.profile,
        name: name || 'Scholar Student',
        email: email || 'student@eduverse.in',
        role: role,
        selectedBoardId: boardId,
        selectedClassId: classId
      }
    }));

    // Add greeting notification
    const { addNotification } = useLmsStore.getState();
    addNotification(
      'Welcome to EduVerse!',
      `Academic profile successfully synced with ${activeBoard.title} - ${activeClass?.title || 'Class 12'}. Get started with your lectures!`,
      'success'
    );

    // Redirect
    if (role === 'student') {
      setView('student-dash');
    } else {
      setView('teacher-dash');
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-navy-dark text-slate-100 flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Blobs */}
      <div className="glow-blob w-[450px] h-[450px] bg-brand-royal/10 -top-20 -right-20" />
      <div className="glow-blob w-[400px] h-[400px] bg-brand-violet/10 -bottom-20 -left-20" />

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

      {/* Form Wizard Card */}
      <div className="w-full max-w-lg glass-card p-8 border-white/5 relative z-10 animate-fade-in-up">
        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8 select-none">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= num 
                  ? 'bg-gradient-to-r from-brand-royal to-brand-violet text-white shadow-md' 
                  : 'bg-slate-900 border border-slate-800 text-slate-500'
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`w-8 h-[2px] rounded ${
                  step > num ? 'bg-gradient-to-r from-brand-royal to-brand-violet' : 'bg-slate-800'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Wizard step 1: Role & Credentials */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-white">Create Academic Identity</h2>
              <p className="text-xs text-slate-400 mt-1.5">Select your system access mode to get started.</p>
            </div>

            {/* Role Select Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  role === 'student'
                    ? 'border-brand-royal bg-brand-royal/10 shadow-lg shadow-brand-royal/5'
                    : 'border-white/5 bg-slate-900/40 hover:bg-slate-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <User className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Student Scholar</h4>
                <p className="text-[10px] text-slate-500 mt-1">Acquire personalized study feeds and interactive MCQ sheets.</p>
              </button>

              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  role === 'teacher'
                    ? 'border-brand-violet bg-brand-violet/10 shadow-lg shadow-brand-violet/5'
                    : 'border-white/5 bg-slate-900/40 hover:bg-slate-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Subject Educator</h4>
                <p className="text-[10px] text-slate-500 mt-1">Upload dynamic curriculum material, video sessions, and MCQ grids.</p>
              </button>
            </div>

            {/* Credential Inputs */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prathamesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="premium-input text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Academic Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="student@eduverse.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="premium-input pl-9 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="premium-input pl-9 text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!name || !email || !password}
              className="w-full premium-btn-primary py-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue setup</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Wizard step 2: Academic Setup */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-white">Select Academic Stream</h2>
              <p className="text-xs text-slate-400 mt-1.5">Tailor the system structure to match your exact classes and syllabus.</p>
            </div>

            <div className="space-y-4">
              {/* Board Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Academic Board</label>
                <select
                  value={boardId}
                  onChange={(e) => setBoardId(e.target.value)}
                  className="premium-input text-xs"
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                      {b.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class Level Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Class Level</label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="premium-input text-xs"
                >
                  {activeBoard.classes.map((cls) => (
                    <option key={cls.id} value={cls.id} className="bg-slate-900 text-white">
                      {cls.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subjects Toggle Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Preferred Core Subjects</label>
                {activeClass?.subjects.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center text-xs text-slate-500">
                    No subjects uploaded for this class. Select another class.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {activeClass?.subjects.map((sub) => {
                      const isSelected = selectedSubjects.includes(sub.id);
                      return (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() => handleSubjectToggle(sub.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-brand-royal bg-brand-royal/10 text-white'
                              : 'border-white/5 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-xs font-semibold">{sub.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-royal" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 premium-btn-secondary py-3 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 premium-btn-primary py-3 text-xs"
              >
                <span>Billing Authorization</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Wizard step 3: Premium Billing Authorization */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-white">Elite Billing Membership</h2>
              <p className="text-xs text-slate-400 mt-1.5">You are authorizing the EduVerse Premium subscription plan.</p>
            </div>

            {/* Price Badge Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-royal/10 to-brand-violet/10 border border-brand-royal/20 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">EduVerse Elite Membership</h4>
                <p className="text-[10px] text-slate-400 mt-1">Physical workbook shipping + 24/7 AI tutor access.</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-white">₹30,000</span>
                <span className="text-[10px] text-slate-500 block">/ Month recurring</span>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/60 border border-white/5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card' ? 'bg-slate-800 text-white border border-white/10' : 'text-slate-400'
                  }`}
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi' ? 'bg-slate-800 text-white border border-white/10' : 'text-slate-400'
                  }`}
                >
                  <span>UPI Payment</span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="premium-input text-xs"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="premium-input text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">CVV Code</label>
                      <input type="text" placeholder="•••" className="premium-input text-xs" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs space-y-2">
                  <p className="text-slate-400">Scan this QR inside GPay / PhonePe / Paytm to set up Auto-Debit mandate.</p>
                  <div className="w-24 h-24 bg-white mx-auto rounded-lg flex items-center justify-center p-1">
                    {/* Dummy QR representation */}
                    <div className="w-full h-full bg-slate-200 border-2 border-slate-900 border-dashed" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">UPI ID: eduverse@axisbank</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 premium-btn-secondary py-3 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleSignup}
                className="w-2/3 premium-btn-primary py-3 text-xs"
              >
                <span>Authorize & Register</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-6 pt-6 border-t border-white/5 text-xs text-slate-400">
          Already registered?{' '}
          <button 
            onClick={() => setView('login')}
            className="text-brand-violet-light font-semibold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
