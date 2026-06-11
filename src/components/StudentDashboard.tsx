import React from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { 
  Sparkles, Play, Award, Calendar, AlertCircle, 
  ArrowRight, Brain, Zap, Clock, ChevronRight, BookOpen 
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    setView, profile, boards, assignments, setActiveCourseContext 
  } = useLmsStore();

  const activeBoard = boards.find(b => b.id === profile.selectedBoardId) || boards[0];
  const activeClass = activeBoard.classes.find(c => c.id === profile.selectedClassId) || activeBoard.classes[0];
  
  const subjects = activeClass?.subjects || [];
  const pendingAssignments = assignments.filter(a => a.status === 'Pending');

  // Simple handler to launch a course
  const handleStartLearning = (subId: string) => {
    const subject = subjects.find(s => s.id === subId);
    const firstChapter = subject?.chapters[0];
    const firstTopic = firstChapter?.topics[0];
    
    setActiveCourseContext(
      subId, 
      firstChapter?.id || null, 
      firstTopic?.id || null
    );
    setView('course-view');
  };

  // Mock study metrics data for our visual dashboard charts
  const mockStudyHours = [
    { day: 'Mon', hours: 4.2 },
    { day: 'Tue', hours: 5.5 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 6.2 },
    { day: 'Fri', hours: 4.8 },
    { day: 'Sat', hours: 8.0 },
    { day: 'Sun', hours: 2.5 }
  ];

  const maxHours = Math.max(...mockStudyHours.map(d => d.hours));

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome & Streak Banner */}
      <div className="relative overflow-hidden glass-card p-6 border-white/5 bg-gradient-to-r from-slate-950/80 via-brand-navy-light/40 to-slate-950/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-brand-royal/10 blur-[80px] rounded-full" />
        
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight flex items-center gap-2">
            Welcome back, {profile.name} <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Curriculum synced with <span className="text-slate-300 font-semibold">{activeBoard.title}</span> • {activeClass?.title || 'Class 12'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Study Streak</span>
            <span className="text-sm font-extrabold text-orange-400 flex items-center justify-center gap-1 mt-0.5">
              🔥 {profile.streak} Days
            </span>
          </div>

          <button 
            onClick={() => setView('webrtc-live')}
            className="premium-btn-primary py-2.5 px-4 text-xs font-semibold"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Join Live Class</span>
          </button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Course Progress & Active Subjects (2 Cols on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Core Subjects</h3>
            <button 
              onClick={() => setView('course-view')}
              className="text-xs text-brand-violet-light font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore Lectures</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((sub) => {
              // Calculate completion percentage based on mock topics
              const totalTopics = sub.chapters.reduce((acc, chap) => acc + chap.topics.length, 0);
              const completedTopics = sub.chapters.reduce((acc, chap) => 
                acc + chap.topics.filter(t => t.isCompleted).length, 0
              );
              const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

              return (
                <div 
                  key={sub.id} 
                  className="glass-card p-5 border-white/5 flex flex-col justify-between hover:border-brand-royal/30 transition-all group relative overflow-hidden"
                >
                  {/* Subtle Background Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sub.color || 'from-blue-600 to-indigo-600'} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-1 rounded-lg bg-gradient-to-r ${sub.color || 'from-blue-600 to-indigo-600'} text-white text-[10px] font-bold uppercase tracking-wider`}>
                        {sub.title}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{percent}% Completed</span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-brand-violet-light transition-colors">
                      {sub.chapters.length > 0 ? sub.chapters[0].title : 'Introductory Lectures'}
                    </h4>
                    <p className="text-xs text-slate-400 mb-6 line-clamp-2">
                      Syllabus aligned with current Indian National Boards containing physical worksheets and solutions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Visual Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${sub.color || 'from-blue-600 to-indigo-600'}`} 
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <button
                      onClick={() => handleStartLearning(sub.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-brand-royal text-slate-100 group-hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Continue Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Analytics Custom Visual Chart */}
          <div className="glass-card p-6 border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-base font-bold text-white">Daily Focus Minutes</h4>
                <p className="text-xs text-slate-500">Weekly breakdown of video lectures and active solving time.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-white/5 rounded-lg p-1.5 text-[10px] text-slate-400 font-bold select-none">
                <span>Avg: 300 mins/week</span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/5 px-2">
              {mockStudyHours.map((data, index) => {
                const heightPercent = (data.hours / maxHours) * 85; // cap height
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-slate-900 border border-white/10 text-white text-[9px] font-bold py-1 px-1.5 rounded shadow-lg transition-opacity pointer-events-none whitespace-nowrap">
                      {data.hours} hrs focus
                    </div>
                    {/* Bar */}
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[24px] rounded-t bg-gradient-to-t from-brand-royal/60 to-brand-violet/80 group-hover:to-brand-violet transition-all group-hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                    />
                    <span className="text-[10px] text-slate-500 font-semibold mt-2">{data.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: AI Assistant, Upcoming Classes & Assignments */}
        <div className="space-y-6">
          
          {/* AI Advisor Card */}
          <div className="glass-card p-6 border-brand-violet/20 bg-gradient-to-b from-brand-violet/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-violet/10 blur-xl rounded-full" />
            <div className="flex items-center gap-2 text-brand-violet-light font-extrabold text-xs uppercase tracking-wider mb-4">
              <Brain className="w-4.5 h-4.5" />
              <span>AI Study Coach</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              "You did exceptionally well in Gauss's theorem numericals last night. However, your response speed on capacitance calculations is sluggish. Try this 5-question test."
            </p>

            <button 
              onClick={() => setView('ai-tutor')}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-violet/40 hover:bg-slate-950 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Consult Tutor Bot</span>
              <ChevronRight className="w-3.5 h-3.5 text-brand-violet-light" />
            </button>
          </div>

          {/* Upcoming Live Classes Card */}
          <div className="glass-card p-5 border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upcoming Live Classes</h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex flex-col items-center justify-center flex-shrink-0 border border-blue-500/10 font-mono">
                  <span className="text-[10px] font-bold">11</span>
                  <span className="text-[8px] uppercase">Jun</span>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">IIT-JEE Physics: Wave Optics</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">04:30 PM • Dr. Ramesh Sen</p>
                  <button 
                    onClick={() => setView('webrtc-live')}
                    className="text-[9px] text-brand-royal font-semibold hover:underline mt-2 flex items-center gap-1"
                  >
                    <span>View Stream Details</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex gap-3 items-start opacity-70">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-400 flex flex-col items-center justify-center flex-shrink-0 font-mono">
                  <span className="text-[10px] font-bold">12</span>
                  <span className="text-[8px] uppercase">Jun</span>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-300">Chemistry: Nernst Practice</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">02:00 PM • Prof. Vineet Aggarwal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments Tracker Card */}
          <div className="glass-card p-5 border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Deadlines</h3>
              {pendingAssignments.length > 0 && (
                <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold px-2 py-0.5 rounded-full">
                  {pendingAssignments.length} Pending
                </span>
              )}
            </div>

            {assignments.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No assignments assigned.</p>
            ) : (
              <div className="space-y-2.5">
                {assignments.slice(0, 3).map((assign) => (
                  <div 
                    key={assign.id}
                    onClick={() => setView('assignment-view')}
                    className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-white/5 hover:border-white/10 transition-all text-left cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white truncate max-w-[150px]">{assign.title}</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">{assign.subjectTitle} • Due {assign.deadline}</p>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      assign.status === 'Graded'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : assign.status === 'Submitted'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {assign.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
