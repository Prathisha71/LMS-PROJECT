import React, { useState, useEffect, useRef } from 'react';
import { useLmsStore, QuizQuestion, QuizResult } from '../store/useLmsStore';
import { 
  Trophy, Clock, ChevronLeft, ChevronRight, HelpCircle, 
  CheckCircle, AlertCircle, ArrowRight, ShieldCheck, RefreshCw 
} from 'lucide-react';

export const QuizInterface: React.FC = () => {
  const { 
    quizzes, activeQuizId, setActiveQuiz, submitQuizResult, setView, setActiveCourseContext 
  } = useLmsStore();

  const activeQuiz = quizzes.find(q => q.id === activeQuizId) || quizzes[0];

  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(activeQuiz ? activeQuiz.durationMinutes * 60 : 600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const timerRef = useRef<number | null>(null);

  // Timer Countdown
  useEffect(() => {
    if (!isSubmitted) {
      timerRef.current = window.setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleAutoSubmit = () => {
    handleQuizSubmit();
  };

  const handleQuizSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    let score = 0;
    const incorrectDetails: QuizResult['incorrectAnswersDetails'] = [];

    activeQuiz.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correctAnswerIndex) {
        score += 1;
      } else {
        incorrectDetails.push({
          question: q.question,
          yourAnswer: selected !== undefined ? q.options[selected] : 'Not Attempted',
          correctAnswer: q.options[q.correctAnswerIndex],
          explanation: q.explanation,
          recommendedTopicId: 'coulomb-law' // Link to mock remedial topic
        });
      }
    });

    const timeSpent = (activeQuiz.durationMinutes * 60) - timeLeftSeconds;
    
    const finalResult: QuizResult = {
      quizId: activeQuiz.id,
      title: activeQuiz.title,
      score,
      totalQuestions: activeQuiz.questions.length,
      timeTakenSeconds: timeSpent,
      date: new Date().toLocaleDateString('en-IN'),
      incorrectAnswersDetails: incorrectDetails
    };

    setResult(finalResult);
    submitQuizResult(finalResult);

    // Add notification
    useLmsStore.getState().addNotification(
      'Quiz Evaluated',
      `You scored ${score}/${activeQuiz.questions.length} on "${activeQuiz.title}".`,
      score === activeQuiz.questions.length ? 'success' : 'info'
    );
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(activeQuiz.durationMinutes * 60);
    setIsSubmitted(false);
    setResult(null);
  };

  const handleRemedialJump = (topicId: string) => {
    setActiveCourseContext('physics-12', 'electrostatics', topicId);
    setView('course-view');
  };

  if (!activeQuiz) {
    return (
      <div className="py-12 text-center glass-card border-white/5 font-sans">
        <h3 className="text-lg font-bold text-white mb-2">No active quizzes</h3>
        <p className="text-xs text-slate-400">Educator dashboard lets you configure new MCQ sheets.</p>
      </div>
    );
  }

  const currentQuestion: QuizQuestion = activeQuiz.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz.questions.length;

  return (
    <div className="max-w-3xl mx-auto font-sans">
      {!isSubmitted ? (
        // ACTIVE TEST INTERFACE
        <div className="space-y-6 animate-fade-in-up">
          {/* Header Bar */}
          <div className="glass-card p-5 border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] text-brand-violet-light font-bold uppercase tracking-wider">Assessment Sheet</span>
              <h3 className="text-base font-bold text-white mt-0.5">{activeQuiz.title}</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300 font-mono">
                <Clock className="w-4.5 h-4.5 text-brand-violet-light" />
                <span>Timer: {formatTime(timeLeftSeconds)}</span>
              </div>
              
              <button
                onClick={handleQuizSubmit}
                className="premium-btn-primary py-2 px-4 text-xs font-semibold"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
            <div className="flex gap-2">
              {activeQuiz.questions.map((q, idx) => {
                const isSelected = selectedAnswers[q.id] !== undefined;
                const isActive = currentQuestionIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border transition-all ${
                      isActive
                        ? 'border-brand-royal bg-brand-royal text-white shadow-lg'
                        : isSelected
                        ? 'border-brand-violet-light/30 bg-brand-violet/10 text-brand-violet-light'
                        : 'border-white/5 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="text-xs font-semibold text-slate-500">
              {Object.keys(selectedAnswers).length} of {totalQuestions} Answered
            </div>
          </div>

          {/* Question Sheet */}
          <div className="glass-card p-6 border-white/5 text-left space-y-6">
            <div className="flex gap-3 items-start">
              <span className="text-sm font-bold text-brand-violet-light uppercase tracking-wider mt-0.5">Q{currentQuestionIndex + 1}.</span>
              <h4 className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3 pl-0 sm:pl-7">
              {currentQuestion.options.map((opt, idx) => {
                const isChosen = selectedAnswers[currentQuestion.id] === idx;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(currentQuestion.id, idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 ${
                      isChosen
                        ? 'border-brand-royal bg-brand-royal/10 text-white shadow-lg'
                        : 'border-white/5 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isChosen ? 'bg-brand-royal text-white' : 'bg-slate-950 text-slate-500'
                    }`}>
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="premium-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                className="premium-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleQuizSubmit}
                className="premium-btn-primary px-6 py-2.5 text-xs font-bold"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      ) : (
        // RESULTS SHEET SUMMARY
        <div className="space-y-6 animate-fade-in-up">
          {/* Main Results Card */}
          <div className="glass-card p-8 border-violet-500/20 bg-gradient-to-b from-brand-violet/5 to-transparent text-center space-y-6 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-1/4 w-32 h-32 bg-brand-violet/10 blur-[80px] rounded-full" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-royal to-brand-violet flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-royal/20">
              <Trophy className="w-8 h-8 fill-current" />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Evaluation Complete</span>
              <h3 className="text-xl font-extrabold text-white mt-1">{activeQuiz.title} Results</h3>
            </div>

            {/* Score Ring */}
            <div className="flex justify-center items-center gap-8 py-4">
              <div className="text-center">
                <span className="text-4xl font-black text-white">{result?.score}</span>
                <span className="text-slate-500 text-lg"> / {result?.totalQuestions}</span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Correct Answers</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="text-center">
                <span className="text-xl font-extrabold text-white">{result ? Math.round((result.score / result.totalQuestions) * 100) : 0}%</span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-3">Final Grade</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="text-center font-mono">
                <span className="text-xl font-extrabold text-slate-200">{result ? formatTime(result.timeTakenSeconds) : '00:00'}</span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-3">Time taken</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={handleResetQuiz}
                className="premium-btn-secondary px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-Attempt Test</span>
              </button>
              
              <button
                onClick={() => setView('student-dash')}
                className="premium-btn-primary px-5 py-2.5 text-xs font-semibold"
              >
                <span>Back to Hub</span>
              </button>
            </div>
          </div>

          {/* Remedial AI Suggestions / Incorrect Answers Review */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Weak Area Review & AI Recommendations</h4>
            
            {result?.incorrectAnswersDetails.length === 0 ? (
              <div className="glass-card p-6 border-white/5 flex gap-4 text-left items-start">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Flawless Conceptual Mastery!</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    You answered all questions correctly. No remedial reading is recommended. You received a perfect score certificate in your profile panel!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {result?.incorrectAnswersDetails.map((detail, idx) => (
                  <div key={idx} className="glass-card p-5 border-white/5 text-left space-y-4">
                    <div>
                      <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                        Review Question {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-3 leading-relaxed">
                        {detail.question}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900 border border-white/5">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Your Choice:</span>
                        <p className="text-slate-300 font-medium mt-1">{detail.yourAnswer}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <span className="text-[9px] text-emerald-400 font-bold uppercase">Correct Answer:</span>
                        <p className="text-emerald-300 font-medium mt-1">{detail.correctAnswer}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 text-xs text-slate-400">
                      <span className="text-[9px] text-brand-violet-light font-bold uppercase block mb-1">Explanation:</span>
                      <p className="leading-relaxed">{detail.explanation}</p>
                    </div>

                    {/* AI Remedial Recommendation Action */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-brand-violet/10 to-transparent border-l-2 border-brand-violet flex items-center justify-between">
                      <div className="text-xs text-left">
                        <span className="text-[9px] text-brand-violet-light font-extrabold uppercase">AI Recommendation</span>
                        <p className="text-slate-300 font-semibold mt-0.5">Read: 1.1 Coulomb\'s Law and Field Strength</p>
                      </div>
                      <button
                        onClick={() => handleRemedialJump(detail.recommendedTopicId)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-violet hover:text-white text-[10px] font-bold text-brand-violet-light transition-all flex items-center gap-1"
                      >
                        <span>Study Topic</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
