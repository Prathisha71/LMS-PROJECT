import React, { useState, useEffect } from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { 
  Settings, Zap, User, GraduationCap, Shield, Bell, Sun, Moon, 
  ChevronDown, ChevronUp, Terminal, Activity
} from 'lucide-react';

export const DemoConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    activeView, setView, profile, isDarkMode, setTheme, addNotification 
  } = useLmsStore();

  useEffect(() => {
    // Sync class list with tailwind dark mode
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const views = [
    { id: 'landing', label: '1. Premium Landing Page', category: 'Public' },
    { id: 'login', label: '2. Login Page', category: 'Public' },
    { id: 'signup', label: '3. Signup Page', category: 'Public' },
    { id: 'student-dash', label: '4. Student Dashboard', category: 'Student Portal' },
    { id: 'course-view', label: '5. Course Learning Page', category: 'Student Portal' },
    { id: 'quiz-view', label: '6. Quiz/Test Interface', category: 'Student Portal' },
    { id: 'assignment-view', label: '7. Assignment Submit', category: 'Student Portal' },
    { id: 'profile-view', label: '8. Student Profile & Streak', category: 'Student Portal' },
    { id: 'teacher-dash', label: '9. Teacher Dashboard', category: 'Teacher Portal' },
    { id: 'content-upload', label: '10. Upload System', category: 'Teacher Portal' },
    { id: 'quiz-builder', label: '11. Quiz Builder', category: 'Teacher Portal' },
    { id: 'admin-structure', label: '12. Academic Structure', category: 'Admin Features' },
    { id: 'admin-analytics', label: '13. Platform Analytics', category: 'Admin Features' },
    { id: 'webrtc-live', label: '14. WebRTC Live Class', category: 'Advanced concepts' },
    { id: 'ai-tutor', label: '15. AI Tutor Chat', category: 'Advanced concepts' },
    { id: 'drm-security', label: '16. DRM Security Settings', category: 'Advanced concepts' },
    { id: 'parent-portal', label: '17. Parent Monitoring', category: 'Advanced concepts' },
  ];

  const handleRoleChange = (role: 'student' | 'teacher' | 'admin') => {
    useLmsStore.setState((state) => ({
      profile: {
        ...state.profile,
        role
      }
    }));
    
    // Jump to the primary dashboard of that role
    if (role === 'student') setView('student-dash');
    else if (role === 'teacher') setView('teacher-dash');
    else if (role === 'admin') setView('admin-structure');
  };

  const triggerMockNotification = (type: 'class' | 'grade' | 'assignment') => {
    if (type === 'class') {
      addNotification(
        'Live Class is Active',
        'Dr. Ramesh Sen has started the Live stream for Electromagnetism. Tap to Join WebRTC.',
        'info'
      );
    } else if (type === 'grade') {
      addNotification(
        'New Grade Released',
        'Your Electrochemistry Quiz submission has been graded: Perfect (10/10)!',
        'success'
      );
    } else {
      addNotification(
        'Exam Schedule Update',
        'Class 12 Chemistry: Chapter test on "Metallurgy" is scheduled for Monday morning.',
        'alert'
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all active:scale-95"
      >
        <Zap className="w-5 h-5 animate-pulse" />
        <span>Demo Controls</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Console Drawer */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[360px] max-h-[500px] overflow-y-auto rounded-2xl bg-slate-950/95 border border-slate-800 text-slate-100 p-4 shadow-2xl backdrop-blur-xl animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm tracking-wide">
              <Terminal className="w-4 h-4" />
              <span>EDUVERSE DEMO PANEL</span>
            </div>
            

          </div>

          {/* Quick Role Select */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Simulate User Role</span>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleRoleChange('student')}
                className={`py-2 px-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  profile.role === 'student' 
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-xs font-semibold">Student</span>
              </button>

              <button 
                onClick={() => handleRoleChange('teacher')}
                className={`py-2 px-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  profile.role === 'teacher' 
                    ? 'border-violet-500 bg-violet-500/10 text-violet-400' 
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-semibold">Teacher</span>
              </button>

              <button 
                onClick={() => handleRoleChange('admin')}
                className={`py-2 px-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  profile.role === 'admin' 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span className="text-xs font-semibold">Admin</span>
              </button>
            </div>
          </div>

          {/* Quick Live Trigger Actions */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Simulate Real-time Events</span>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <button 
                onClick={() => triggerMockNotification('class')}
                className="py-1 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/50 text-[10px] font-medium text-blue-400 flex items-center justify-center gap-1"
              >
                <Activity className="w-3 h-3" />
                <span>Live Class</span>
              </button>
              <button 
                onClick={() => triggerMockNotification('grade')}
                className="py-1 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/50 text-[10px] font-medium text-emerald-400 flex items-center justify-center gap-1"
              >
                <Bell className="w-3 h-3" />
                <span>Quiz Grade</span>
              </button>
              <button 
                onClick={() => triggerMockNotification('assignment')}
                className="py-1 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/50 text-[10px] font-medium text-amber-400 flex items-center justify-center gap-1"
              >
                <Zap className="w-3 h-3" />
                <span>Exam Schedule</span>
              </button>
            </div>
          </div>

          {/* View Jumper Links */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Jump directly to Screen</span>
            <div className="space-y-1">
              {['Public', 'Student Portal', 'Teacher Portal', 'Admin Features', 'Advanced concepts'].map((cat) => (
                <div key={cat} className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-600 block mt-2 mb-1 px-1 uppercase">{cat}</span>
                  {views
                    .filter((v) => v.category === cat)
                    .map((view) => (
                      <button
                        key={view.id}
                        onClick={() => setView(view.id)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                          activeView === view.id
                            ? 'bg-gradient-to-r from-violet-950 to-indigo-950 text-violet-300 font-semibold border-l-2 border-violet-500'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                        }`}
                      >
                        <span>{view.label}</span>
                        {activeView === view.id && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />}
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
