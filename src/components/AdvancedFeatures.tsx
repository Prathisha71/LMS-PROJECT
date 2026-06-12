import React, { useState, useEffect, useRef } from 'react';
import { useLmsStore } from '../store/useLmsStore';
import { 
  Tv, Brain, Lock, ShieldAlert, Send, User, Sparkles, 
  Settings, CheckCircle, Video, Key, Eye, Play, Shield 
} from 'lucide-react';

export const AdvancedFeatures: React.FC = () => {
  const { activeView, setView, profile, notifications, boards } = useLmsStore();
  const [activeTab, setActiveTab] = useState<'webrtc' | 'ai' | 'drm' | 'parent'>('webrtc');

  // --- AI TUTOR CHAT STATES ---
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const classNum = profile.selectedClassId.replace('class-', '');
    let topicsStr = "Metallurgy, Solid State or chemical kinetics";
    if (classNum === '11') {
      topicsStr = "Mole Concept, Thermodynamics or gaseous state";
    } else if (classNum === '10') {
      topicsStr = "Atoms and Molecules, Solutions or pH metrics";
    } else if (classNum === '9') {
      topicsStr = "Matter Around Us, Atomic Structure or chemical bonding";
    }

    setChatMessages([
      { role: 'system', content: `EduVerse AI Tutor synced with Class ${classNum} TNSB Chemistry curriculum.` },
      { role: 'assistant', content: `Greetings, Scholar. I am your personal tutor. Ask me any numerical or theoretical questions about ${topicsStr}.` }
    ]);
  }, [profile.selectedClassId]);

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
      const lowerInput = userMsg.toLowerCase().trim();
      let reply = "";

      if (lowerInput.includes('cramer') || lowerInput.includes('linear system') || lowerInput.includes('equations')) {
        reply = `To solve a system of linear equations using Cramer's rule:
1. **Determinant of Coefficients (Δ)**: Compute the determinant of the coefficient matrix.
2. **Variable Determinants (Δx, Δy, Δz)**: Form determinants by replacing the corresponding column of coefficients with the constant column vectors.
3. **Compute Solutions**:
   - $x = \\frac{\\Delta_x}{\\Delta}$
   - $y = \\frac{\\Delta_y}{\\Delta}$
   - $z = \\frac{\\Delta_z}{\\Delta}$
*Note: If $\\Delta = 0$, the system is either inconsistent (no solution) or dependent (infinitely many solutions).*`;
      } else if (lowerInput.includes('adjoint') || lowerInput.includes('inverse')) {
        reply = `To find the inverse of a square matrix $A$ (denoted as $A^{-1}$):
1. **Find Determinant $|A|$**: If $|A| = 0$, the matrix is singular and has no inverse.
2. **Find Cofactor Matrix**: Calculate the cofactor of each element $C_{ij} = (-1)^{i+j} \\cdot M_{ij}$.
3. **Find Adjoint**: The adjoint, $adj(A)$, is the transpose of the cofactor matrix: $adj(A) = (C_{ij})^T$.
4. **Apply Inverse Formula**: $A^{-1} = \\frac{1}{|A|} \\cdot adj(A)$.`;
      } else if (lowerInput.includes('rank') || lowerInput.includes('echelon')) {
        reply = `The rank of a matrix $A$ (denoted as $\\rho(A)$) is the maximum number of linearly independent row or column vectors. To calculate it:
1. **Row Echelon Reduction**: Use elementary row operations to reduce the matrix to row-echelon form.
2. **Count Non-Zero Rows**: The number of remaining non-zero rows determines the rank.
3. **Interpretation**: If a $3 \\times 3$ matrix has $\\rho(A) = 3$, it is non-singular and invertible.`;
      } else if (lowerInput.includes('nernst') || lowerInput.includes('electrode') || lowerInput.includes('cell potential')) {
        reply = `The Nernst Equation is used to calculate the cell potential ($E_{cell}$) under non-standard conditions:
$$E_{cell} = E^\\circ_{cell} - \\frac{RT}{nF} \\ln Q$$
At $298 \\text{ K}$ ($25^\\circ\\text{C}$), this simplifies to:
$$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} Q$$
Where:
- $E^\\circ_{cell}$ is the standard cell potential.
- $n$ is the number of moles of electrons transferred.
- $Q$ is the reaction quotient ($Q = \\frac{[\\text{Products}]^y}{[\\text{Reactants}]^x}$).`;
      } else if (lowerInput.includes('kinetics') || lowerInput.includes('rate law') || lowerInput.includes('reaction rate')) {
        reply = `Chemical Kinetics studies the rate of reactions. For a general reaction $aA + bB \\rightarrow cC$:
1. **Rate Expression**: $\\text{Rate} = k[A]^x[B]^y$, where $k$ is the rate constant, and $x, y$ are the experimental orders of reaction.
2. **Order**: The overall order of reaction is the sum $x + y$.
3. **Factors affecting Rate**: Reactant concentrations, temperature, catalysts, and surface area.`;
      } else if (lowerInput.includes('activation energy') || lowerInput.includes('arrhenius')) {
        reply = `The Arrhenius equation describes the dependence of the rate constant $k$ on temperature:
$$k = A e^{-\\frac{E_a}{RT}}$$
Taking the natural logarithm on both sides:
$$\\ln k = \\ln A - \\frac{E_a}{RT}$$
Where:
- $A$ is the pre-exponential factor.
- $E_a$ is the activation energy.
- $R$ is the gas constant ($8.314 \\text{ J K}^{-1} \\text{ mol}^{-1}$).
- $T$ is the absolute temperature in Kelvin.`;
      } else if (lowerInput.includes('flotation') || lowerInput.includes('metallurgy') || lowerInput.includes('leaching') || lowerInput.includes('ore')) {
        reply = `Ore concentration is the first stage in metallurgy to remove gangue (impurities):
1. **Froth Flotation**: Used specifically for sulphide ores (like copper pyrites or galena). Finely crushed ore is mixed with pine oil and water, and air is blown through. Sulphide particles stick to the hydrophobic oil froth and float, while gangue sinks.
2. **Leaching**: Ore is treated with a chemical reagent (like sodium cyanide for gold/silver) to form a soluble complex, leaving insoluble gangue behind.`;
      } else if (lowerInput.includes('coulomb') || lowerInput.includes('electrostatic')) {
        reply = `Coulomb's Law quantifies the electrostatic force of attraction or repulsion between two point charges:
$$F = k \\cdot \\frac{|q_1 q_2|}{r^2}$$
Where:
- $F$ is the magnitude of the force.
- $q_1, q_2$ are the charge magnitudes in Coulombs (C).
- $r$ is the distance between charges in meters (m).
- $k = \\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9 \\text{ N m}^2 \\text{ C}^{-2}$ is Coulomb's constant.`;
      } else if (lowerInput.includes('polarization') || lowerInput.includes('dielectric')) {
        reply = `Dielectric Polarization ($P$) occurs when a dielectric material is exposed to an external electric field:
1. **Charge Shift**: Positive charges inside the material displace in the direction of the field, while negative charges displace in the opposite direction.
2. **Induced Dipole Moment**: This displacement creates tiny electric dipoles, resulting in an induced field that opposes the external field.
3. **Mathematical Definition**: $P = \\chi_e \\varepsilon_0 E$, where $\\chi_e$ is the electric susceptibility of the medium.`;
      } else if (lowerInput.includes('ostwald') || lowerInput.includes('dilution')) {
        reply = `Ostwald's Dilution Law applies the law of mass action to weak electrolytes. For a weak acid $HA \\rightleftharpoons H^+ + A^-$:
$$K_a = \\frac{\\alpha^2 C}{1 - \\alpha}$$
Since weak electrolytes dissociate very weakly, the degree of dissociation $\\alpha \\ll 1$. Thus, $1 - \\alpha \\approx 1$:
$$K_a \\approx \\alpha^2 C \\implies \\alpha = \\sqrt{\\frac{K_a}{C}}$$
Therefore, the degree of dissociation is inversely proportional to the square root of the concentration.`;
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
        reply = `Hello, Scholar! I am your personal EduVerse AI Tutor, synced with your Class 9–12 curriculum. Ask me any numerical or theoretical questions about Mathematics, Chemistry, or Physics!`;
      } else if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
        reply = `You're welcome, Scholar! Keep pushing your academic boundaries. Let me know if you have any other questions.`;
      } else {
        // Dynamic context-aware responder fallback
        const topicQuery = userMsg.trim().replace(/[?.]/g, "");
        reply = `You asked about "${topicQuery}". Here is a step-by-step breakdown to solve or explain this concept:

1. **Identify the Core Principle**: Check the relevant board standards (e.g., TNSB or CBSE Class 9-12) to see where this topic fits in the syllabus.
2. **Write Down Key Formulas**: Always specify the mathematical expressions or chemical balance equations first to secure step-marks.
3. **Verify Constants**: List all known values, coefficients, and physical constants (like temperature, pressure, or dimensions).
4. **Step-by-Step Calculation**: Show clear logical steps, algebraic operations, or mechanisms.

*Tip: For further hand-outs and worksheets on "${topicQuery}", check out the **Notes & Worksheets** tab inside your Course page.*`;
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
      <div className="flex border-b border-slate-200 dark:border-white/5 gap-4">
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
                  ? 'border-brand-royal text-brand-royal dark:text-white'
                  : 'border-transparent text-slate-550 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
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
        <div className="max-w-4xl mx-auto space-y-4 animate-fade-in-up">
          <div className="relative aspect-[16/9] bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            
            {/* Main stream Feed */}
            <div className="absolute inset-0 flex items-center justify-center">

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
        </div>
      )}

      {/* Tab: AI Contextual Tutor */}
      {activeTab === 'ai' && (
        <div className="max-w-2xl mx-auto glass-card p-6 border-brand-violet/20 bg-gradient-to-b from-brand-violet/5 to-transparent flex flex-col justify-between min-h-[450px] animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/5 pb-4 mb-4">
              <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-md border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900">
                <img 
                  src="/feat_ai_tutor_icon.png" 
                  alt="AI Tutor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">EduVerse AI Tutor</h3>
                <span className="text-[9px] text-brand-violet dark:text-brand-violet-light font-semibold uppercase tracking-wider block mt-0.5">Kinetics & Chemistry model active</span>
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
                      <span className="text-[9px] bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-white/5 text-slate-650 dark:text-slate-500 font-bold px-2 py-0.5 rounded-full">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={index} className={`flex gap-3 max-w-[85%] ${isAssistant ? 'text-left' : 'ml-auto text-right flex-row-reverse'}`}>
                    {isAssistant ? (
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 flex-shrink-0">
                        <img 
                          src="/feat_ai_tutor_icon.png" 
                          alt="AI" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                        P
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed border ${
                      isAssistant 
                        ? 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-white/5 text-slate-800 dark:text-slate-300' 
                        : 'bg-brand-royal/10 border-brand-royal/20 text-brand-royal dark:text-white'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex gap-3 max-w-[80%] text-left">
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 flex-shrink-0">
                    <img 
                      src="/feat_ai_tutor_icon.png" 
                      alt="AI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-white/5 text-xs text-slate-650 dark:text-slate-500 font-semibold animate-pulse">
                    AI tutor is processing formulas...
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>
          </div>

          <form onSubmit={handleSendChatMessage} className="flex gap-2 border-t border-slate-200 dark:border-white/5 pt-4 mt-6">
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
        <div className="max-w-md mx-auto animate-fade-in-up">
          {/* DRM settings configuration */}
          <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-3">
              <Lock className="w-4.5 h-4.5 text-brand-royal" />
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">DRM Constraints</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Dynamic Key Rotation</span>
                  <p className="text-[10px] text-slate-600 dark:text-slate-500">Rotate AES-128 sub-keys periodically.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={isDrmActive}
                  onChange={(e) => setIsDrmActive(e.target.checked)}
                  className="w-8 h-4 rounded-full bg-slate-100 dark:bg-slate-900 text-brand-royal focus:ring-transparent cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Rotation Interval</span>
                  <span className="font-mono text-slate-700 dark:text-slate-400 font-semibold">{rotationInterval}s</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="60" 
                  value={rotationInterval}
                  onChange={(e) => setRotationInterval(Number(e.target.value))}
                  className="w-full bg-slate-200 dark:bg-slate-950 accent-brand-royal cursor-pointer h-1.5 rounded-full" 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">HDCP 2.2 Enforcement</span>
                  <p className="text-[10px] text-slate-600 dark:text-slate-500">Block streams if external capture device detected.</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Watermarking Overlay</span>
                  <p className="text-[10px] text-slate-650 dark:text-slate-550">Overlay scholar email opacity on player HUD.</p>
                </div>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase">10% Opacity</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Parent Portal Compliance */}
      {activeTab === 'parent' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Parent compliance metric cards (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 border-slate-200 dark:border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Scholar Activity Tracker</h4>
                  <p className="text-xs text-slate-655 dark:text-slate-550">Real-time daily activity timeline audit trail for parents.</p>
                </div>
                <span className="text-xs text-slate-700 dark:text-slate-400 font-bold">Student: Prathamesh Sharma</span>
              </div>

              {/* Timeline list */}
              {(() => {
                const classNum = profile.selectedClassId.replace('class-', '');
                let timelineData = {
                  lessonTitle: "Completed Lesson 1.1 Ores Concentration & Extraction of Metals",
                  lessonArea: "Syllabus Area: Chemistry Metallurgy",
                  quizTitle: "Attempted Metallurgy Quiz",
                  liveClassTitle: "Attended WebRTC Live class on Matrices & Determinants"
                };

                if (classNum === '11') {
                  timelineData = {
                    lessonTitle: "Completed Lesson 1.1 Mole Concept and Chemical Calculations",
                    lessonArea: "Syllabus Area: Chemistry Basic Concepts",
                    quizTitle: "Attempted Stoichiometry Quiz",
                    liveClassTitle: "Attended WebRTC Live class on Sets, Relations and Functions"
                  };
                } else if (classNum === '10') {
                  timelineData = {
                    lessonTitle: "Completed Lesson 1.1 Relative Atomic/Molecular Mass & Avogadro's Law",
                    lessonArea: "Syllabus Area: Chemistry Atoms and Molecules",
                    quizTitle: "Attempted Mole Concept Quiz",
                    liveClassTitle: "Attended WebRTC Live class on Relations and Functions"
                  };
                } else if (classNum === '9') {
                  timelineData = {
                    lessonTitle: "Completed Lesson 1.1 Elements, Compounds and Mixtures",
                    lessonArea: "Syllabus Area: Chemistry Matter Around Us",
                    quizTitle: "Attempted Matter Around Us Quiz",
                    liveClassTitle: "Attended WebRTC Live class on Set Language"
                  };
                }

                return (
                  <div className="space-y-4 relative pl-6 border-l border-slate-200 dark:border-white/5 text-xs text-left">
                    <div className="relative">
                      <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-slate-650 dark:text-slate-550 font-bold block">Today, 09:30 AM</span>
                      <p className="text-slate-800 dark:text-white font-semibold mt-0.5">{timelineData.lessonTitle}</p>
                      <p className="text-[10px] text-slate-655 dark:text-slate-550 mt-1">{timelineData.lessonArea}</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[9px] text-slate-655 dark:text-slate-550 font-bold block">Today, 10:15 AM</span>
                      <p className="text-slate-800 dark:text-white font-semibold mt-0.5">{timelineData.quizTitle}</p>
                      <p className="text-[10px] text-slate-655 dark:text-slate-550 mt-1">Score: 2/3 (66% Accuracy) • Spent 4 mins 12s</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-violet-500" />
                      <span className="text-[9px] text-slate-655 dark:text-slate-550 font-bold block">Yesterday, 04:00 PM</span>
                      <p className="text-slate-800 dark:text-white font-semibold mt-0.5">{timelineData.liveClassTitle}</p>
                      <p className="text-[10px] text-slate-655 dark:text-slate-550 mt-1">Active screen attendance: 98% (44 minutes focus time)</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Parents dashboard side modules */}
          <div className="space-y-6">
            {/* Monthly subscription bill */}
            <div className="glass-card p-5 border-slate-200 dark:border-white/5 space-y-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest block border-b border-slate-200 dark:border-white/5 pb-2">
                Parent Audit Compliance
              </span>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-left text-xs space-y-1">
                <span className="text-[9px] text-slate-655 dark:text-slate-550 font-bold block uppercase">Monthly debit mandate</span>
                <span className="text-sm font-black text-slate-900 dark:text-white block">₹30,000 / month</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">Authorized Auto-pay active</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-left text-xs space-y-1">
                <span className="text-[9px] text-slate-655 dark:text-slate-550 font-bold block uppercase">Physical Worksheets package</span>
                <span className="text-sm font-semibold text-slate-750 dark:text-slate-300 block">Class 12 Term-1 Chemistry kit</span>
                <span className="text-[9px] text-slate-655 dark:text-slate-550 block">Status: Dispatched via BlueDart</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
