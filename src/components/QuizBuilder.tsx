import React, { useState } from 'react';
import { useLmsStore, QuizQuestion, Quiz } from '../store/useLmsStore';
import { BookOpen, Plus, Trash2, Check, PenTool } from 'lucide-react';

export const QuizBuilder: React.FC = () => {
  const { boards, createQuiz, setView } = useLmsStore();

  // Categories
  const [boardId] = useState('cbse');
  const [classId] = useState('class-12');
  const [subjectId, setSubjectId] = useState('physics-12');

  // Quiz info
  const [quizTitle, setQuizTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(15);

  // Question Creator states
  const [questionsList, setQuestionsList] = useState<QuizQuestion[]>([]);
  
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

  const handleAddQuestion = () => {
    if (!questionText || options.some(o => !o)) return;

    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}-${questionsList.length}`,
      question: questionText,
      options: [...options],
      correctAnswerIndex: correctIndex,
      explanation
    };

    setQuestionsList([...questionsList, newQuestion]);

    // Reset fields
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectIndex(0);
    setExplanation('');
  };

  const handleOptionChange = (idx: number, value: string) => {
    const updated = [...options];
    updated[idx] = value;
    setOptions(updated);
  };

  const handlePublishQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle || questionsList.length === 0) return;

    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: quizTitle,
      subjectId,
      durationMinutes,
      questions: questionsList
    };

    createQuiz(newQuiz);

    // Notify
    useLmsStore.getState().addNotification(
      'New Quiz Released!',
      `Assessment "${quizTitle}" containing ${questionsList.length} questions is now active.`,
      'success'
    );

    // Reset
    setQuizTitle('');
    setQuestionsList([]);
    setView('teacher-dash');
  };

  const handleDeleteAddedQuestion = (idx: number) => {
    setQuestionsList(questionsList.filter((_, i) => i !== idx));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-left">
      
      {/* Left Column: Category selector & Added Questions summary */}
      <div className="space-y-6">
        <div className="glass-card p-5 border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <BookOpen className="w-4.5 h-4.5 text-brand-royal" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syllabus Link</h3>
          </div>

          <div className="space-y-3">
            {/* Subject Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Target Subject</label>
              <select 
                value={subjectId} 
                onChange={(e) => setSubjectId(e.target.value)}
                className="premium-input text-xs"
              >
                <option value="physics-12" className="bg-slate-950">Class 12 Physics</option>
                <option value="chemistry-12" className="bg-slate-950">Class 12 Chemistry</option>
                <option value="maths-12" className="bg-slate-950">Class 12 Mathematics</option>
              </select>
            </div>

            {/* Quiz Title */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Quiz Title</label>
              <input
                type="text"
                placeholder="e.g. Chapter 1: Potential Numerical Test"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="premium-input text-xs"
                required
              />
            </div>

            {/* Duration Minutes */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Timer (Minutes)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="premium-input text-xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Questions list summary */}
        <div className="glass-card p-5 border-white/5 space-y-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Questions Added ({questionsList.length})</span>
          {questionsList.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">Use the constructor on the right to add MCQs.</p>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {questionsList.map((q, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors"
                >
                  <div className="text-xs font-semibold text-slate-200 truncate pr-4">
                    <span>Q{idx + 1}. {q.question}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteAddedQuestion(idx)}
                    className="p-1 text-slate-500 hover:text-red-400"
                    title="Remove question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {questionsList.length > 0 && (
            <button
              onClick={handlePublishQuiz}
              className="w-full premium-btn-primary py-2.5 text-xs font-bold"
            >
              <Check className="w-4 h-4" />
              <span>Save & Publish Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Question Constructor form (2 Cols) */}
      <div className="lg:col-span-2 space-y-6">
        
        <div className="glass-card p-6 border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <PenTool className="w-4.5 h-4.5 text-brand-violet-light" />
            <h3 className="text-sm font-display font-extrabold text-white">Construct MCQ</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Question Text */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Question Prompt</label>
              <textarea 
                value={questionText} 
                onChange={(e) => setQuestionText(e.target.value)} 
                placeholder="e.g. A hollow metal sphere is charged with Q. The potential inside the sphere is..."
                className="premium-input text-xs h-20 resize-none" 
              />
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {options.map((opt, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Option {String.fromCharCode(65 + idx)}</label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option text ${idx + 1}`}
                    className="premium-input text-xs"
                  />
                </div>
              ))}
            </div>

            {/* Correct Choice Index */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mark Correct Answer Option</label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isActive = correctIndex === idx;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setCorrectIndex(idx)}
                      className={`py-2 rounded-xl border font-bold text-xs transition-all ${
                        isActive
                          ? 'border-brand-royal bg-brand-royal text-white shadow-md'
                          : 'border-white/5 bg-slate-900 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Option {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Concept Explanation */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">AI Explanatory Solution (Provided to students upon review)</label>
              <textarea 
                value={explanation} 
                onChange={(e) => setExplanation(e.target.value)} 
                placeholder="Explain why the marked option is correct. Highlight core formulas."
                className="premium-input text-xs h-20 resize-none" 
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setView('teacher-dash')}
              className="premium-btn-secondary py-2.5 px-4 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleAddQuestion}
              disabled={!questionText || options.some(o => !o)}
              className="premium-btn-primary py-2.5 px-5 text-xs font-semibold disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add MCQ to Test</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
