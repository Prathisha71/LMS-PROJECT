import React, { useState, useRef, useEffect } from 'react';
import { useLmsStore, Topic, Chapter, Subject } from '../store/useLmsStore';
import { 
  Play, Pause, BookOpen, FileText, Bookmark, 
  CheckCircle, Plus, Trash2, ArrowRight, Star, Clock 
} from 'lucide-react';

export const CourseLearningPage: React.FC = () => {
  const { 
    boards, profile, activeSubjectId, activeChapterId, activeTopicId, 
    completeTopic, bookmarks, addBookmark, deleteBookmark, setActiveCourseContext 
  } = useLmsStore();

  const [activeTab, setActiveTab] = useState<'content' | 'pdf' | 'bookmarks'>('content');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration] = useState(1200); // 20 mins mock duration in seconds
  const [bookmarkText, setBookmarkText] = useState('');

  const activeBoard = boards.find(b => b.id === profile.selectedBoardId) || boards[0];
  const activeClass = activeBoard.classes.find(c => c.id === profile.selectedClassId) || activeBoard.classes[0];
  
  const activeSubject = activeClass?.subjects.find(s => s.id === activeSubjectId) || activeClass?.subjects[0];
  const activeChapter = activeSubject?.chapters.find(c => c.id === activeChapterId) || activeSubject?.chapters[0];
  const activeTopic = activeChapter?.topics.find(t => t.id === activeTopicId) || activeChapter?.topics[0];

  const timerRef = useRef<number | null>(null);

  // Playback Simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= videoDuration) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return videoDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, videoDuration]);

  // Formatter for time display
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleMarkAsCompleted = () => {
    if (activeSubject && activeChapter && activeTopic) {
      completeTopic(
        activeBoard.id,
        activeClass.id,
        activeSubject.id,
        activeChapter.id,
        activeTopic.id
      );
      // Trigger notification
      useLmsStore.getState().addNotification(
        'Topic Completed!',
        `You have successfully mastered "${activeTopic.title}" and gained 200 XP!`,
        'success'
      );
    }
  };

  const handleAddBookmarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookmarkText || !activeTopic || !activeChapter || !activeSubject) return;

    addBookmark({
      topicId: activeTopic.id,
      topicTitle: activeTopic.title,
      chapterTitle: activeChapter.title,
      subjectTitle: activeSubject.title,
      note: bookmarkText
    }, formatTime(currentTime));

    setBookmarkText('');
  };

  const jumpToBookmarkTime = (timestamp: string) => {
    const [mins, secs] = timestamp.split(':').map(Number);
    setCurrentTime(mins * 60 + secs);
    setIsPlaying(true);
  };

  if (!activeSubject) {
    return (
      <div className="p-8 text-center glass-card border-white/5 font-sans">
        <h3 className="text-lg font-bold text-white mb-2">No Courses Enrolled</h3>
        <p className="text-xs text-slate-400">Please choose boards/subjects in your profile wizard.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      
      {/* Left Column: Player & Tabs */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Custom Mock Video Player */}
        <div className="relative aspect-[16/9] w-full rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden group video-glow-container">
          {/* Simulated Video Stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-[1px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800')` }} />
            
            {/* Pulsing visual to mimic action video */}
            <div className="w-20 h-20 rounded-full border-2 border-brand-royal/30 flex items-center justify-center relative z-10 animate-pulse-slow">
              <span className="w-16 h-16 rounded-full bg-brand-royal/20 flex items-center justify-center text-brand-royal-300 font-bold text-xs">
                {isPlaying ? 'ACTIVE' : 'READY'}
              </span>
            </div>

            {/* Context Watermark */}
            <div className="absolute top-4 left-4 text-[9px] text-white/20 select-none font-mono tracking-widest z-10">
              EDUVERSE SECURE STREAM // IP: 192.168.1.1
            </div>
          </div>

          {/* Custom Player Controls HUD */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-20">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-royal to-brand-violet"
                style={{ width: `${(currentTime / videoDuration) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <span className="text-xs font-semibold text-slate-300 font-mono">
                  {formatTime(currentTime)} / {formatTime(videoDuration)}
                </span>
              </div>

              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                {activeTopic?.title || 'Chapter Topic'}
              </span>
            </div>
          </div>
        </div>

        {/* Video Description & Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs text-brand-violet-light font-bold tracking-wider uppercase">
              {activeSubject.title} • {activeChapter?.title || 'Chapter'}
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1">
              {activeTopic?.title || 'Introductory Topic'}
            </h2>
          </div>

          <button
            onClick={handleMarkAsCompleted}
            disabled={activeTopic?.isCompleted}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTopic?.isCompleted
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-not-allowed'
                : 'premium-btn-primary'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{activeTopic?.isCompleted ? 'Completed Topic' : 'Mark Topic Complete'}</span>
          </button>
        </div>

        {/* Lower Workspace Tabs (Content explanation, Bookmarks, PDFs) */}
        <div className="space-y-4">
          <div className="flex border-b border-white/5 gap-4">
            {[
              { id: 'content', label: 'Chapter Summary', icon: BookOpen },
              { id: 'pdf', label: 'Notes & Worksheets', icon: FileText },
              { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-brand-royal text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-1">
            {/* Tab: Summary */}
            {activeTab === 'content' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                <p>
                  {activeTopic?.content || 'Subject curriculum summary information not provided yet. Click complete topic to earn bonus coins.'}
                </p>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3 items-start mt-6">
                  <Clock className="w-5 h-5 text-brand-violet-light mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-1">Study Advice</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Make sure to watch this video lesson sequentially. Taking notes while the tutor explains equations helps in long-term retention of CBSE syllabus.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: PDF notes */}
            {activeTab === 'pdf' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Attached references, printable hand-outs, and sample numericals.</p>
                {activeTopic?.pdfUrl ? (
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/10">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-white">{activeTopic.id}_reference_handout.pdf</h4>
                        <p className="text-[10px] text-slate-500">1.2 MB • A4 Printable Document</p>
                      </div>
                    </div>
                    <a 
                      href={activeTopic.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 text-xs font-semibold text-white transition-all active:scale-95"
                    >
                      Download PDF
                    </a>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No workbook attached for this specific lesson.
                  </div>
                )}
              </div>
            )}

            {/* Tab: Bookmarks */}
            {activeTab === 'bookmarks' && (
              <div className="space-y-4">
                <form onSubmit={handleAddBookmarkSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter short bookmark note..."
                    value={bookmarkText}
                    onChange={(e) => setBookmarkText(e.target.value)}
                    className="premium-input text-xs"
                    required
                  />
                  <button
                    type="submit"
                    className="premium-btn-primary px-4 py-2 text-xs flex items-center gap-1 flex-shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save {formatTime(currentTime)}</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {bookmarks.filter(b => b.topicId === activeTopic?.id).length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500">
                      No bookmarks saved in this lecture.
                    </div>
                  ) : (
                    bookmarks
                      .filter(b => b.topicId === activeTopic?.id)
                      .map((bm) => (
                        <div 
                          key={bm.id} 
                          className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors"
                        >
                          <div className="text-left">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-brand-royal/10 text-brand-royal text-[9px] font-mono font-bold">
                              {bm.timestamp}
                            </span>
                            <p className="text-xs font-medium text-slate-300 mt-1">{bm.note}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => jumpToBookmarkTime(bm.timestamp)}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 hover:border-brand-royal/30 text-[10px] font-semibold text-slate-300"
                            >
                              Jump
                            </button>
                            <button
                              onClick={() => deleteBookmark(bm.id)}
                              className="p-1 text-slate-500 hover:text-red-400"
                              title="Delete bookmark"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Right Column: Dynamic Course Navigation Sidebar */}
      <div className="space-y-6">
        
        {/* Curriculums Navigation Card */}
        <div className="glass-card p-5 border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <BookOpen className="w-4 h-4 text-brand-royal" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Course Curriculum</h3>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
            {activeSubject.chapters.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No content exists. Create chapters inside teacher dashboard.</p>
            ) : (
              activeSubject.chapters.map((chapter) => (
                <div key={chapter.id} className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 text-left px-1.5">{chapter.title}</h4>
                  <div className="space-y-1">
                    {chapter.topics.map((topic) => {
                      const isActive = activeTopic?.id === topic.id;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setActiveCourseContext(activeSubject.id, chapter.id, topic.id)}
                          className={`w-full py-2.5 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between gap-2 ${
                            isActive
                              ? 'border-brand-royal bg-brand-royal/10 text-white font-semibold'
                              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {topic.isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                            )}
                            <span className="truncate">{topic.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono font-medium flex-shrink-0">{topic.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Board Selector in Study Portal */}
        <div className="glass-card p-5 border-white/5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-2">Platform Board Selection</span>
          <select 
            value={activeSubject.id} 
            onChange={(e) => {
              const subId = e.target.value;
              const sub = activeClass?.subjects.find(s => s.id === subId);
              const firstChapter = sub?.chapters[0];
              const firstTopic = firstChapter?.topics[0];
              setActiveCourseContext(subId, firstChapter?.id || null, firstTopic?.id || null);
            }}
            className="premium-input text-xs font-bold"
          >
            {(activeClass?.subjects || []).map(s => (
              <option key={s.id} value={s.id} className="bg-slate-950">{s.title} Syllabus</option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};
