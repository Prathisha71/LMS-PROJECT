import React, { useState, useEffect, useRef } from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { 
  Tv, Brain, Lock, ShieldAlert, Send, User, Sparkles, 
  Settings, CheckCircle, Video, Key, Eye, Play, Shield 
} from 'lucide-react';

export const AdvancedFeatures: React.FC = () => {
  const { activeView, setView, profile, notifications } = useLmsStore();
  const [activeTab, setActiveTab] = useState<'webrtc' | 'ai' | 'drm' | 'parent'>('webrtc');

  // --- AI TUTOR CHAT STATES ---
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'EduVerse AI Tutor synced with Class 12 CBSE Physics curriculum.' },
    { role: 'assistant', content: 'Greetings, Scholar. I am your personal tutor. Ask me any numerical or theoretical questions about Electrostatics or optics.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsAiTyping(true);

    // Simulated AI response delay
    setTimeout(() => {
      let reply = "That is an excellent conceptual query. According to the board guidelines, you should first write down the given charge constants, apply Coulomb\'s inverse-square formula (F = k * q1 * q2 / r^2), and verify permittivity ε₀ parameters.";
      
      if (userMsg.toLowerCase().includes('coulomb')) {
        reply = "Coulomb\'s Law quantifies the electric force between charges. Remember, force is vector-based. If you place a third charge at the midpoint, the net force depends on charge signs. Repulsive forces push away, while attractive forces pull close.";
      } else if (userMsg.toLowerCase().includes('flux') || userMsg.toLowerCase().includes('gauss')) {
        reply = "Gauss\'s Law states that total electric flux passing out of a closed surface is equal to the net charge enclosed divided by ε₀. It simplifies E-field calculations for highly symmetrical objects like infinite wires or spheres.";
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setIsAiTyping(false);
    }, 1200);
  };

  // --- DRM CONSOLE LOG SIMULATOR ---
  const [drmLogs, setDrmLogs] = useState<string[]>([
    "[09:40:12 AM] Secure session initialization requested",
    "[09:40:13 AM] HDCP 2.2 constraint matched successfully",
    "[09:40:13 AM] Key Server: Requesting rotated decryption sub-key"
  ]);
  const [isDrmActive, setIsDrmActive] = useState(true);
  const [rotationInterval, setRotationInterval] = useState(30);

  useEffect(() => {
    let interval: number;
    if (isDrmActive && activeTab === 'drm') {
      interval = window.setInterval(() => {
        const time = new Date().toLocaleTimeString();
        const randKey = Math.random().toString(16).substring(2, 10).toUpperCase();
        setDrmLogs(prev => [
          `[${time}] Rotation handshake: Key updated to DH-${randKey}`,
          `[${time}] Watermark verified: Scholar token ${profile.email}`,
          ...prev.slice(0, 15)
        ]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isDrmActive, activeTab, profile.email]);

  // --- WEBRTC LIVE CLASSROOM STATES ---
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [liveChat, setLiveChat] = useState([
    { sender: 'Dr. Ramesh Sen', msg: 'Good evening cohort, make sure you have your worksheets ready.' },
    { sender: 'Shreya Rao', msg: 'Sir, will we cover dielectric polarization numeric equations today?' }
  ]);
  const [liveChatInput, setLiveChatInput] = useState('');

  const handleSendLiveChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveChatInput.trim()) return;

    setLiveChat(prev => [...prev, { sender: profile.name, msg: liveChatInput }]);
    setLiveChatInput('');
  };

  // Sync state tab view
  useEffect(() => {
    if (activeView === 'webrtc-live') setActiveTab('webrtc');
    else if (activeView === 'ai-tutor') setActiveTab('ai');
    else if (activeView === 'drm-security') setActiveTab('drm');
    else if (activeView === 'parent-portal') setActiveTab('parent');
  }, [activeView]);

  return (
    <div className="space-y-6 font-sans text-left">
      
      {/* Sub tabs header */}
      <div className="flex border-b border-white/5 gap-4">
        {[
          { id: 'webrtc', label: 'WebRTC Live Classroom', icon: Tv },
          { id: 'ai', label: 'AI Contextual Tutor', icon: Brain },
          { id: 'drm', label: 'DRM Security Shield', icon: Lock },
          { id: 'parent', label: 'Parent Portal Compliance', icon: ShieldAlert },
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

      {/* Tab: WebRTC Live Classroom */}
      {activeTab === 'webrtc' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* WebRTC Video Grid (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-[16/9] bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Main stream Feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-[1px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600')` }} />
                
                {/* Simulated Lecturer camera */}
                <div className="text-center relative z-10 text-white p-6">
                  <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse inline-block mb-3">
                    Live Stream Ingress (RTMP/WebRTC)
                  </span>
                  <h3 className="text-lg font-bold">Dr. Ramesh Sen (IIT alumni)</h3>
                  <p className="text-xs text-slate-400 mt-1">Syllabus Topic: Chapter 2 Wave Optics - Interference Equations</p>
                </div>

                {/* Sub watermark */}
                <div className="absolute top-4 left-4 text-[9px] text-white/20 select-none font-mono">
                  WEBRTC ENCRYPTED CHANNEL // LATENCY: 22ms
                </div>
              </div>

              {/* Bottom WebRTC control bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isMuted ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-slate-900 border-white/10 text-slate-300'
                    }`}
                  >
                    {isMuted ? 'Unmute' : 'Mute Mic'}
                  </button>
                  
                  <button 
                    onClick={() => setIsCamOff(!isCamOff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isCamOff ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-slate-900 border-white/10 text-slate-300'
                    }`}
                  >
                    {isCamOff ? 'Start Camera' : 'Stop Camera'}
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setHandRaised(!handRaised);
                    if(!handRaised) {
                      useLmsStore.getState().addNotification(
                        'Raise Hand Triggered',
                        'You raised your hand in Dr. Ramesh Sen\'s lecture queue.',
                        'info'
                      );
                    }
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    handRaised 
                      ? 'bg-amber-500 text-white border border-amber-400' 
                      : 'bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-950'
                  }`}
                >
                  {handRaised ? '✋ Hand Raised' : '✋ Raise Hand'}
                </button>
              </div>
            </div>

            {/* Simulated attendee grids */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Shreya Rao", avatar: "S" },
                { name: "Mehta Kabir", avatar: "M" },
                { name: "Prathamesh (You)", avatar: "P" },
              ].map((attendee, index) => (
                <div key={index} className="p-3 bg-slate-950/60 border border-white/5 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-royal to-brand-violet flex items-center justify-center text-white font-bold text-xs">
                    {attendee.avatar}
                  </div>
                  <div className="text-left leading-none">
                    <span className="text-xs font-semibold text-white block">{attendee.name}</span>
                    <span className="text-[9px] text-slate-500">Connected</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WebRTC Live Chat / Hand raised list */}
          <div className="glass-card p-5 border-white/5 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <Video className="w-4 h-4 text-brand-royal" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Lesson Chat</h3>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {liveChat.map((chat, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-bold text-brand-violet-light block">{chat.sender}</span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed bg-slate-900/40 p-2 rounded-lg border border-white/5 inline-block">{chat.msg}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendLiveChat} className="flex gap-2 border-t border-white/5 pt-3 mt-4">
              <input
                type="text"
                placeholder="Ask teacher a question..."
                value={liveChatInput}
                onChange={(e) => setLiveChatInput(e.target.value)}
                className="premium-input text-xs"
                required
              />
              <button 
                type="submit" 
                className="premium-btn-primary p-2.5 rounded-xl flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab: AI Contextual Tutor */}
      {activeTab === 'ai' && (
        <div className="max-w-2xl mx-auto glass-card p-6 border-brand-violet/20 bg-gradient-to-b from-brand-violet/5 to-transparent flex flex-col justify-between min-h-[450px] animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-violet to-fuchsia-600 flex items-center justify-center text-white shadow-md">
                <Brain className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">EduVerse AI Tutor</h3>
                <span className="text-[9px] text-brand-violet-light font-semibold uppercase tracking-wider block mt-0.5">Permittivity & Physics model active</span>
              </div>
            </div>

            {/* Chat message panel */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1 py-2">
              {chatMessages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                const isSystem = msg.role === 'system';
                
                if (isSystem) {
                  return (
                    <div key={index} className="text-center">
                      <span className="text-[9px] bg-slate-900 border border-white/5 text-slate-500 font-bold px-2 py-0.5 rounded-full">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={index} className={`flex gap-3 max-w-[85%] ${isAssistant ? 'text-left' : 'ml-auto text-right flex-row-reverse'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isAssistant ? 'bg-gradient-to-tr from-brand-violet to-fuchsia-600 text-white' : 'bg-slate-900 text-slate-300'
                    }`}>
                      {isAssistant ? 'AI' : 'P'}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed border ${
                      isAssistant 
                        ? 'bg-slate-950 border-white/5 text-slate-300' 
                        : 'bg-brand-royal/10 border-brand-royal/20 text-white'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex gap-3 max-w-[80%] text-left">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-violet to-fuchsia-600 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                    AI
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 text-xs text-slate-500 font-semibold animate-pulse">
                    AI tutor is processing formulas...
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>
          </div>

          <form onSubmit={handleSendChatMessage} className="flex gap-2 border-t border-white/5 pt-4 mt-6">
            <input
              type="text"
              placeholder="e.g. Prove Coulomb's law or explain dielectric polarization..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="premium-input text-xs"
              required
            />
            <button
              type="submit"
              disabled={isAiTyping}
              className="premium-btn-primary px-4 py-2 flex items-center gap-1 flex-shrink-0 text-xs font-bold disabled:opacity-50"
            >
              <span>Ask AI</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Tab: DRM Security Shield */}
      {activeTab === 'drm' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* DRM settings configuration */}
          <div className="glass-card p-5 border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Lock className="w-4.5 h-4.5 text-brand-royal" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">DRM Constraints</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 block">Dynamic Key Rotation</span>
                  <p className="text-[10px] text-slate-500">Rotate AES-128 sub-keys periodically.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={isDrmActive}
                  onChange={(e) => setIsDrmActive(e.target.checked)}
                  className="w-8 h-4 rounded-full bg-slate-900 text-brand-royal focus:ring-transparent cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-200">Rotation Interval</span>
                  <span className="font-mono text-slate-400 font-semibold">{rotationInterval}s</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="60" 
                  value={rotationInterval}
                  onChange={(e) => setRotationInterval(Number(e.target.value))}
                  className="w-full bg-slate-950 accent-brand-royal cursor-pointer h-1.5 rounded-full" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 block">HDCP 2.2 Enforcement</span>
                  <p className="text-[10px] text-slate-500">Block streams if external capture device detected.</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-200 block">Watermarking Overlay</span>
                  <p className="text-[10px] text-slate-500">Overlay scholar email opacity on player HUD.</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">10% Opacity</span>
              </div>
            </div>
          </div>

          {/* DRM Handshake live logs (2 Cols) */}
          <div className="lg:col-span-2 glass-card p-5 border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4.5 h-4.5 text-brand-violet-light" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secure Handshake Logs</h3>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                Active
              </span>
            </div>

            {/* Logs box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-xs text-left space-y-2.5 font-mono max-h-60 overflow-y-auto">
              {drmLogs.map((log, idx) => (
                <div key={idx} className="text-[11px] text-slate-400">
                  <span className="text-brand-violet-light mr-2">&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Parent Portal Compliance */}
      {activeTab === 'parent' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Parent compliance metric cards (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white">Scholar Activity Tracker</h4>
                  <p className="text-xs text-slate-500">Real-time daily activity timeline audit trail for parents.</p>
                </div>
                <span className="text-xs text-slate-400 font-bold">Student: Prathamesh Sharma</span>
              </div>

              {/* Timeline list */}
              <div className="space-y-4 relative pl-6 border-l border-white/5 text-xs text-left">
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] text-slate-500 font-bold block">Today, 09:30 AM</span>
                  <p className="text-white font-semibold mt-0.5">Completed Lesson 1.1 Coulomb\'s Law and Field Strength</p>
                  <p className="text-[10px] text-slate-500 mt-1">Syllabus Area: Physics Electrostatics Potentials</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[9px] text-slate-500 font-bold block">Today, 10:15 AM</span>
                  <p className="text-white font-semibold mt-0.5">Attempted Coulomb\'s Law & Field Strength Quiz</p>
                  <p className="text-[10px] text-slate-500 mt-1">Score: 2/3 (66% Accuracy) • Spent 4 mins 12s</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-[9px] text-slate-500 font-bold block">Yesterday, 04:00 PM</span>
                  <p className="text-white font-semibold mt-0.5">Attended WebRTC Live class on Wave Optics</p>
                  <p className="text-[10px] text-slate-500 mt-1">Active screen attendance: 98% (44 minutes focus time)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parents dashboard side modules */}
          <div className="space-y-6">
            {/* Monthly subscription bill */}
            <div className="glass-card p-5 border-violet-500/20 bg-gradient-to-b from-brand-violet/5 to-transparent space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-2">
                Parent Audit Compliance
              </span>

              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl text-left text-xs space-y-1">
                <span className="text-[9px] text-slate-500 font-bold block uppercase">Monthly debit mandate</span>
                <span className="text-sm font-black text-white block">₹30,000 / month</span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-1">Authorized Auto-pay active</span>
              </div>

              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl text-left text-xs space-y-1">
                <span className="text-[9px] text-slate-500 font-bold block uppercase">Physical Worksheets package</span>
                <span className="text-sm font-semibold text-slate-300 block">Class 12 Term-1 Physics kit</span>
                <span className="text-[9px] text-slate-500 block">Status: Dispatched via BlueDart</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
