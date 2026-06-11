import React, { useState } from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { Upload, BookOpen, Plus, Check, Eye, EyeOff, FileText } from 'lucide-react';

export const ContentUpload: React.FC = () => {
  const { boards, createTopic, createChapter, setView } = useLmsStore();
  
  // Selection binds
  const [boardId, setBoardId] = useState('cbse');
  const [classId, setClassId] = useState('class-12');
  const [subjectId, setSubjectId] = useState('physics-12');
  const [chapterId, setChapterId] = useState('electrostatics');

  // Chapter Creator states
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [showChapterForm, setShowChapterForm] = useState(false);

  // Lecture states
  const [topicTitle, setTopicTitle] = useState('');
  const [duration, setDuration] = useState('18m 45s');
  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [notesContent, setNotesContent] = useState('**Syllabus Focus: Coulomb\'s Inverse-Square Law**\n\nThe electric force between two point charges is:\n1. Directly proportional to the product of charges.\n2. Inversely proportional to the square of the distance between them.\n\n`F = k * (|q1 * q2|) / r^2` where k = 1 / (4πε₀)');
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const activeBoard = boards.find(b => b.id === boardId) || boards[0];
  const activeClass = activeBoard.classes.find(c => c.id === classId) || activeBoard.classes[0];
  const activeSubject = activeClass?.subjects.find(s => s.id === subjectId) || activeClass?.subjects[0];

  const handleCreateChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle) return;

    createChapter(boardId, classId, subjectId, newChapterTitle);
    
    // Notify
    useLmsStore.getState().addNotification(
      'Chapter Configured',
      `New chapter "${newChapterTitle}" has been added to the syllabus map.`,
      'success'
    );

    setNewChapterTitle('');
    setShowChapterForm(false);
  };

  const handleCreateTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle || !chapterId) return;

    createTopic(
      boardId,
      classId,
      subjectId,
      chapterId,
      topicTitle,
      duration,
      videoUrl,
      notesContent
    );

    // Notify
    useLmsStore.getState().addNotification(
      'Lecture Published',
      `Lecture "${topicTitle}" has been encoded and published to student feeds.`,
      'success'
    );

    setTopicTitle('');
    setNotesContent('');
    setView('teacher-dash');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-left">
      
      {/* Left Column: Category selectors & Dynamic Chapter creation */}
      <div className="space-y-6">
        <div className="glass-card p-5 border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <BookOpen className="w-4.5 h-4.5 text-brand-royal" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Core Syllabus</h3>
          </div>

          <div className="space-y-3">
            {/* Board Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Board Standard</label>
              <select 
                value={boardId} 
                onChange={(e) => setBoardId(e.target.value)}
                className="premium-input text-xs"
              >
                {boards.map(b => (
                  <option key={b.id} value={b.id} className="bg-slate-950">{b.title}</option>
                ))}
              </select>
            </div>

            {/* Class Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Class Grade</label>
              <select 
                value={classId} 
                onChange={(e) => setClassId(e.target.value)}
                className="premium-input text-xs"
              >
                {activeBoard.classes.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-950">{c.title}</option>
                ))}
              </select>
            </div>

            {/* Subject Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Subject Module</label>
              <select 
                value={subjectId} 
                onChange={(e) => setSubjectId(e.target.value)}
                className="premium-input text-xs"
              >
                {activeClass?.subjects.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-950">{s.title}</option>
                ))}
              </select>
            </div>

            {/* Chapter Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Active Chapter</label>
              <select 
                value={chapterId} 
                onChange={(e) => setChapterId(e.target.value)}
                className="premium-input text-xs"
              >
                {activeSubject?.chapters.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-950">{c.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Chapter creation form */}
        <div className="glass-card p-5 border-white/5 space-y-4">
          <button
            onClick={() => setShowChapterForm(!showChapterForm)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-950 border border-white/5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1 transition-all"
          >
            <Plus className="w-4 h-4 text-brand-royal" />
            <span>Configure New Chapter</span>
          </button>

          {showChapterForm && (
            <form onSubmit={handleCreateChapterSubmit} className="space-y-3 pt-3 border-t border-white/5 animate-fade-in-up">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Chapter Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Chapter 3: Electromagnetic Waves" 
                  value={newChapterTitle} 
                  onChange={(e) => setNewChapterTitle(e.target.value)} 
                  className="premium-input text-xs" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full premium-btn-primary py-2 text-xs font-bold"
              >
                Create Chapter
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Lecture Publisher Form with Markdown Editor (2 Cols) */}
      <div className="lg:col-span-2 space-y-6">
        
        <form onSubmit={handleCreateTopicSubmit} className="glass-card p-6 border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-2">
            <h3 className="text-sm font-display font-extrabold text-white">Publish New Video Topic</h3>
            <button
              type="button"
              onClick={() => setIsPreviewActive(!isPreviewActive)}
              className="text-xs text-brand-violet-light font-semibold hover:underline flex items-center gap-1"
            >
              {isPreviewActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isPreviewActive ? 'Edit Source' : 'Preview Layout'}</span>
            </button>
          </div>

          {!isPreviewActive ? (
            // SOURCE EDIT VIEW
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Topic Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Coulomb\'s Law Applications" 
                    value={topicTitle} 
                    onChange={(e) => setTopicTitle(e.target.value)} 
                    className="premium-input text-xs" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Video Duration</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 18m 45s" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                    className="premium-input text-xs" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mock Video URL (HD MP4)</label>
                <input 
                  type="url" 
                  value={videoUrl} 
                  onChange={(e) => setVideoUrl(e.target.value)} 
                  className="premium-input text-xs" 
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Lecture Summary Notes (Markdown Editor)</label>
                <textarea 
                  value={notesContent} 
                  onChange={(e) => setNotesContent(e.target.value)} 
                  className="premium-input text-xs h-40 resize-y font-mono leading-relaxed" 
                  required 
                />
              </div>
            </div>
          ) : (
            // PREVIEW LAYOUT VIEW
            <div className="space-y-6 animate-fade-in-up">
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Video Stream Details</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold">{topicTitle || 'No Title Entered'}</span>
                  <span className="text-slate-400 font-mono">{duration} duration</span>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Markdown Compiled Output</span>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans whitespace-pre-wrap">
                  {notesContent || 'No notes written.'}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setView('teacher-dash')}
              className="premium-btn-secondary py-2.5 px-4 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="premium-btn-primary py-2.5 px-6 text-xs font-semibold"
            >
              <Check className="w-4 h-4" />
              <span>Publish Lecture Topic</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
