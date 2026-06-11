import React, { useState } from 'react';
import { useLmsStore, Assignment } from '../store/useLmsStore';
import { 
  FileText, Calendar, Upload, Check, AlertCircle, 
  ArrowRight, ShieldCheck, HelpCircle, CornerDownRight 
} from 'lucide-react';

export const AssignmentPage: React.FC = () => {
  const { assignments, submitAssignment, setView } = useLmsStore();
  const [selectedAssignId, setSelectedAssignId] = useState(assignments[1]?.id || assignments[0]?.id);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const activeAssign = assignments.find(a => a.id === selectedAssignId) || assignments[0];

  const handleSimulatedUpload = () => {
    if (activeAssign.status !== 'Pending') return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedFileName(`${activeAssign.id}_submission_proof.pdf`);
      setUploadSuccess(true);
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFileName) return;
    
    submitAssignment(activeAssign.id, uploadedFileName);
    setUploadSuccess(false);
    setUploadedFileName('');

    // Trigger toast notification
    useLmsStore.getState().addNotification(
      'Assignment Submitted',
      `"${activeAssign.title}" has been uploaded successfully for educator review.`,
      'success'
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Left Column: Assignment Selector & Detailed Panel */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Active Homework Details */}
        <div className="glass-card p-6 border-white/5 text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
            <div>
              <span className="text-[10px] text-brand-violet-light font-bold uppercase tracking-wider">
                {activeAssign.subjectTitle} Homework Sheet
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{activeAssign.title}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                activeAssign.status === 'Graded'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : activeAssign.status === 'Submitted'
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                Status: {activeAssign.status}
              </span>
            </div>
          </div>

          {/* Points & Deadline */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-brand-violet-light" />
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase">Due Date</span>
                <p className="text-slate-200 font-semibold mt-0.5">{activeAssign.deadline}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-brand-violet-light" />
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase">Total Points</span>
                <p className="text-slate-200 font-semibold mt-0.5">{activeAssign.points} Points Max</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Instructions</h4>
            <p>{activeAssign.description}</p>
          </div>

          {/* Submit Action or Submission Status */}
          <div className="pt-4 border-t border-white/5">
            {activeAssign.status === 'Pending' ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">File Submission</h4>
                
                {/* Upload Box */}
                <div 
                  onClick={handleSimulatedUpload}
                  className="border-2 border-dashed border-white/10 hover:border-brand-royal/40 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-950/40 hover:bg-slate-950 flex flex-col items-center justify-center min-h-[160px]"
                >
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-full border-2 border-brand-royal border-t-transparent animate-spin mx-auto" />
                      <span className="text-xs text-slate-400 block font-semibold">Uploading document to Cloudflare R2...</span>
                    </div>
                  ) : uploadSuccess ? (
                    <div className="space-y-2 text-emerald-400">
                      <Check className="w-8 h-8 mx-auto" />
                      <span className="text-xs font-bold block">{uploadedFileName} ready</span>
                      <span className="text-[10px] text-slate-500 block">Click Submit Assignment below to finalize.</span>
                    </div>
                  ) : (
                    <div className="space-y-2 text-slate-500">
                      <Upload className="w-8 h-8 mx-auto text-brand-violet-light" />
                      <span className="text-xs text-slate-300 font-bold block">Select or Drop files here</span>
                      <span className="text-[10px] block">PDF, DOCX formats supported (Max 15MB)</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!uploadedFileName}
                  className="w-full premium-btn-primary py-3.5 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Submit Assignment for Grading</span>
                  <Check className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-2 text-xs">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">File Submitted:</span>
                <div className="flex items-center gap-2 text-brand-royal-300">
                  <FileText className="w-4 h-4" />
                  <span className="font-mono font-medium">{activeAssign.submissionFile}</span>
                </div>
                <p className="text-[10px] text-slate-500">Submitted on {new Date().toLocaleDateString('en-IN')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Educator Feedback Panel (Visible when graded) */}
        {activeAssign.status === 'Graded' && (
          <div className="glass-card p-6 border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent text-left space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Check className="w-4.5 h-4.5" />
              <span>Educator Grade & Feedback</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs text-slate-400">Score Awarded:</span>
                <span className="text-sm font-black text-emerald-400">{activeAssign.grade}</span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">Teacher Comments:</span>
                <p className="italic">"{activeAssign.feedback}"</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Right Column: Homework List */}
      <div className="space-y-6">
        
        {/* List Selector Card */}
        <div className="glass-card p-5 border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <FileText className="w-4 h-4 text-brand-royal" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Homework Log</h3>
          </div>

          <div className="space-y-2.5">
            {assignments.map((a) => {
              const isSelected = selectedAssignId === a.id;
              return (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => {
                    setSelectedAssignId(a.id);
                    setUploadSuccess(false);
                    setUploadedFileName('');
                  }}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-brand-royal bg-brand-royal/10'
                      : 'border-transparent bg-slate-900/60 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-bold text-white truncate max-w-[150px]">{a.title}</span>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                      a.status === 'Graded'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : a.status === 'Submitted'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {a.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>{a.subjectTitle}</span>
                    <span>Due: {a.deadline}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
