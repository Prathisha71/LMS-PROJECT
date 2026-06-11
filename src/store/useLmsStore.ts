import { create } from 'zustand';

// --- TYPES ---
export interface Topic {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  pdfUrl?: string;
  content?: string;
  isCompleted?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  title: string;
  chapters: Chapter[];
  imageUrl?: string;
  color?: string;
}

export interface ClassLevel {
  id: string;
  title: string;
  subjects: Subject[];
}

export interface Board {
  id: string;
  title: string;
  classes: ClassLevel[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  title: string;
  score: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  date: string;
  incorrectAnswersDetails: {
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    recommendedTopicId: string;
  }[];
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  subjectTitle: string;
  deadline: string;
  points: number;
  description: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  submissionFile?: string;
  grade?: string;
  feedback?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'alert';
  read: boolean;
}

export interface Bookmark {
  id: string;
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  subjectTitle: string;
  timestamp: string; // e.g. "02:45"
  note?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  selectedBoardId: string;
  selectedClassId: string;
  xp: number;
  level: number;
  coins: number;
  streak: number;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
  certificates: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    grade: string;
  }[];
}

// --- INITIAL MOCK DATA ---
const initialBoards: Board[] = [
  {
    id: 'cbse',
    title: 'CBSE (National Board)',
    classes: [
      {
        id: 'class-12',
        title: 'Class 12',
        subjects: [
          {
            id: 'physics-12',
            title: 'Physics',
            color: 'from-blue-600 to-indigo-700',
            imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'electrostatics',
                title: 'Chapter 1: Electrostatic Potential',
                topics: [
                  {
                    id: 'coulomb-law',
                    title: '1.1 Coulomb\'s Law and Field Strength',
                    duration: '12m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                    content: 'Coulomb\'s inverse-square law is an experimental law of physics that quantifies the amount of force between two stationary, electrically charged particles. The electric force between charged bodies at rest is conventionally called electrostatic force.',
                    isCompleted: true
                  },
                  {
                    id: 'gauss-theorem',
                    title: '1.2 Gauss\'s Law & Flux Computations',
                    duration: '22m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                    content: 'Gauss\'s law, also known as Gauss\'s flux theorem, is a law relating the distribution of electric charge to the resulting electric field. In its integral form, it states that the flux of the electric field out of any closed surface is proportional to the total enclosed charge.'
                  },
                  {
                    id: 'capacitance-dielectrics',
                    title: '1.3 Capacitance and Dielectric Polarization',
                    duration: '18m 05s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Capacitance is the capability of a material object or device to store electric charge. It is measured by the charge response to a difference in electrostatic potential. Dielectrics are electrical insulators that can be polarized by an applied electric field.'
                  }
                ]
              },
              {
                id: 'optics-12',
                title: 'Chapter 2: Wave Optics',
                topics: [
                  {
                    id: 'huygens-principle',
                    title: '2.1 Huygens\' Wavefront Construction',
                    duration: '15m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Huygens\' principle states that every point on a wavefront is itself the source of spherical wavelets, and the secondary wavelets spreading out from these points at the speed of the wave form the new wavefront.'
                  },
                  {
                    id: 'interference-ydse',
                    title: '2.2 Interference & Young\'s Double Slit Experiment',
                    duration: '28m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Young\'s double-slit experiment demonstrates the wave-like nature of light. Coherent light sources illuminate two slits, producing an interference pattern of bright and dark fringes on a screen.'
                  }
                ]
              }
            ]
          },
          {
            id: 'chemistry-12',
            title: 'Chemistry',
            color: 'from-violet-600 to-fuchsia-700',
            imageUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'electrochemistry',
                title: 'Chapter 1: Electrochemistry',
                topics: [
                  {
                    id: 'nernst-equation',
                    title: '1.1 Nernst Equation & Cell Potentials',
                    duration: '20m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'The Nernst equation provides a relation between the cell potential of an electrochemical cell, the standard cell potential, temperature, and the reaction quotient. It allows the calculation of cell potential under non-standard conditions.'
                  },
                  {
                    id: 'galvanic-cells',
                    title: '1.2 Galvanic Cells & Standard Hydrogen Electrode',
                    duration: '16m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'A galvanic cell, or voltaic cell, is an electrochemical cell that derives electrical energy from spontaneous redox reactions taking place within the cell. The SHE is the universal reference for cell potentials.'
                  }
                ]
              }
            ]
          },
          {
            id: 'maths-12',
            title: 'Mathematics',
            color: 'from-sky-600 to-blue-700',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'calculus',
                title: 'Chapter 1: Integral Calculus',
                topics: [
                  {
                    id: 'definite-integrals',
                    title: '1.1 Definite Integrals and Area Under Curves',
                    duration: '25m 12s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Integration is the mathematical process of finding the area under a curve. Definite integrals have specific upper and lower bounds, representing the accumulated net value between those limits.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'class-10',
        title: 'Class 10',
        subjects: [
          {
            id: 'science-10',
            title: 'Science',
            color: 'from-emerald-600 to-teal-700',
            imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'chemical-reactions',
                title: 'Chapter 1: Chemical Reactions & Equations',
                topics: [
                  {
                    id: 'balancing-equations',
                    title: '1.1 Balancing Chemical Equations',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Chemical equations must be balanced to satisfy the Law of Conservation of Mass, which states that matter cannot be created or destroyed. The number of atoms of each element must be equal on both sides.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'icse',
    title: 'ICSE / ISC (Premium Board)',
    classes: [
      {
        id: 'class-12-isc',
        title: 'Class 12 ISC',
        subjects: [
          {
            id: 'physics-isc',
            title: 'ISC Physics',
            color: 'from-indigo-600 to-purple-700',
            chapters: []
          }
        ]
      }
    ]
  }
];

const initialQuizzes: Quiz[] = [
  {
    id: 'electrostatics-q1',
    title: 'Coulomb\'s Law & Field Strength Quiz',
    subjectId: 'physics-12',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        question: 'Two point charges placed at a distance r in air exert a force F on each other. If they are placed in a medium of dielectric constant K at the same distance, what is the new force?',
        options: ['F', 'F / K', 'K * F', 'F / K^2'],
        correctAnswerIndex: 1,
        explanation: 'According to Coulomb\'s Law in a medium, the force is given by F\' = 1/(4πε₀K) * (q₁q₂)/r² = F/K. Therefore, the force decreases by a factor of the dielectric constant K.'
      },
      {
        id: 'q2',
        question: 'What is the SI unit of electric permittivity (ε₀)?',
        options: ['N m² C⁻²', 'C² N⁻¹ m⁻²', 'C N m⁻¹', 'N m C⁻¹'],
        correctAnswerIndex: 1,
        explanation: 'From Coulomb\'s Law, F = 1/(4πε₀) * q₁q₂/r², we get ε₀ = q₁q₂ / (4π F r²). Thus, unit is C² / (N * m²) = C² N⁻¹ m⁻².'
      },
      {
        id: 'q3',
        question: 'A soap bubble is given a negative charge. Its radius will:',
        options: ['Increase', 'Decrease', 'Remain unchanged', 'Expand and collapse dynamically'],
        correctAnswerIndex: 0,
        explanation: 'When a soap bubble is charged (either positive or negative), the charges distribute themselves over the surface. Due to mutual electrostatic repulsion between like charges, the bubble tends to expand, increasing its radius.'
      }
    ]
  }
];

const initialAssignments: Assignment[] = [
  {
    id: 'assign-physics-1',
    title: 'Derivation of Gauss\'s Law from Coulomb\'s Law',
    subjectId: 'physics-12',
    subjectTitle: 'Physics',
    deadline: '2026-06-18',
    points: 100,
    description: 'Provide a clean mathematical derivation showing how Gauss\'s Law is derived from Coulomb\'s law for a spherical Gaussian surface. Highlight assumptions, draw a diagram of the electric flux lines, and submit a PDF file.',
    status: 'Graded',
    submissionFile: 'gauss_derivation_v1.pdf',
    grade: 'A+ (96/100)',
    feedback: 'Excellent work! Your proof is mathematically rigorous, and the flux diagram is highly detailed. Keep up the high standard.'
  },
  {
    id: 'assign-chem-1',
    title: 'Nernst Equation Practice Problems',
    subjectId: 'chemistry-12',
    subjectTitle: 'Chemistry',
    deadline: '2026-06-25',
    points: 50,
    description: 'Solve the attached 5 numerical problems calculating the electrode potential of Daniel Cell under non-standard conditions at 298K.',
    status: 'Pending'
  }
];

const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Assignment Graded',
    message: 'Your Physics assignment "Derivation of Gauss\'s Law" has been graded by Dr. Ramesh Sen: A+ (96/100).',
    time: '2 hours ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Live Class Starting Soon',
    message: 'Live session on "Definite Integrals" starts in 15 minutes. Join now!',
    time: '15 mins ago',
    type: 'info',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Streak Warning',
    message: 'Your 5-day learning streak is about to break! Complete 1 topic today to keep it active.',
    time: '4 hours ago',
    type: 'alert',
    read: false
  }
];

const initialProfile: UserProfile = {
  name: 'Prathamesh Sharma',
  email: 'prathamesh@eduverse.in',
  role: 'student',
  selectedBoardId: 'cbse',
  selectedClassId: 'class-12',
  xp: 4250,
  level: 4,
  coins: 350,
  streak: 5,
  achievements: [
    { id: 'ach-1', title: 'Daily Devotee', description: 'Maintained a 5-day study streak', icon: '🔥', unlockedAt: '2026-06-10' },
    { id: 'ach-2', title: 'Quiz Whiz', description: 'Scored 100% on a Science Quiz', icon: '💡', unlockedAt: '2026-06-08' },
    { id: 'ach-3', title: 'Early Bird', description: 'Completed a lecture before 7 AM', icon: '🌅', unlockedAt: '2026-06-05' }
  ],
  certificates: [
    { id: 'cert-1', title: 'Electrostatics Foundations Mastery', issuer: 'EduVerse Academy', date: '2026-06-02', grade: 'Outstanding (A+)' }
  ]
};

// --- GLOBAL STORE INTERFACE ---
export interface LmsStore {
  // Database States
  boards: Board[];
  quizzes: Quiz[];
  assignments: Assignment[];
  notifications: Notification[];
  bookmarks: Bookmark[];
  profile: UserProfile;
  activeView: string; // Used for SPA routing e.g. 'landing', 'student-dash', 'course-view', 'quiz-view', 'assignment-view', 'profile-view', 'teacher-dash', 'content-upload', 'quiz-builder', 'admin-structure', 'admin-analytics', 'webrtc-live', 'ai-tutor', 'drm-security', 'parent-portal'
  
  // Custom states for active learning context
  activeSubjectId: string | null;
  activeChapterId: string | null;
  activeTopicId: string | null;
  activeQuizId: string | null;
  
  // Dark/Light Theme
  isDarkMode: boolean;

  // Setters & Actions
  setTheme: (isDark: boolean) => void;
  setView: (view: string) => void;
  setActiveCourseContext: (subjectId: string | null, chapterId: string | null, topicId: string | null) => void;
  setActiveQuiz: (quizId: string | null) => void;
  
  // Student Actions
  completeTopic: (boardId: string, classId: string, subjectId: string, chapterId: string, topicId: string) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>, videoTime: string) => void;
  deleteBookmark: (id: string) => void;
  submitAssignment: (assignmentId: string, fileName: string) => void;
  submitQuizResult: (result: QuizResult) => void;
  readAllNotifications: () => void;
  addNotification: (title: string, message: string, type: 'info' | 'success' | 'alert') => void;
  
  // Teacher Actions
  createTopic: (boardId: string, classId: string, subjectId: string, chapterId: string, title: string, duration: string, videoUrl: string, content: string) => void;
  createChapter: (boardId: string, classId: string, subjectId: string, title: string) => void;
  createQuiz: (quiz: Quiz) => void;
  gradeAssignment: (id: string, grade: string, feedback: string) => void;

  // Admin Actions
  addBoard: (title: string) => void;
  addClass: (boardId: string, title: string) => void;
  addSubject: (boardId: string, classId: string, title: string, color?: string, imageUrl?: string) => void;
}

// --- STORE CREATION ---
export const useLmsStore = create<LmsStore>((set) => ({
  boards: initialBoards,
  quizzes: initialQuizzes,
  assignments: initialAssignments,
  notifications: initialNotifications,
  bookmarks: [
    {
      id: 'bm-1',
      topicId: 'coulomb-law',
      topicTitle: '1.1 Coulomb\'s Law and Field Strength',
      chapterTitle: 'Chapter 1: Electrostatic Potential',
      subjectTitle: 'Physics',
      timestamp: '03:45',
      note: 'Critical equation for electrostatic force derivation'
    }
  ],
  profile: initialProfile,
  activeView: 'landing',
  activeSubjectId: 'physics-12',
  activeChapterId: 'electrostatics',
  activeTopicId: 'coulomb-law',
  activeQuizId: null,
  isDarkMode: true,

  setTheme: (isDark) => set({ isDarkMode: isDark }),
  
  setView: (view) => set({ activeView: view }),
  
  setActiveCourseContext: (subjectId, chapterId, topicId) => set({
    activeSubjectId: subjectId,
    activeChapterId: chapterId,
    activeTopicId: topicId
  }),

  setActiveQuiz: (quizId) => set({ activeQuizId: quizId }),

  completeTopic: (boardId, classId, subjectId, chapterId, topicId) => set((state) => {
    // Clone Boards structure
    const updatedBoards = state.boards.map((board) => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        classes: board.classes.map((cls) => {
          if (cls.id !== classId) return cls;
          return {
            ...cls,
            subjects: cls.subjects.map((sub) => {
              if (sub.id !== subjectId) return sub;
              return {
                ...sub,
                chapters: sub.chapters.map((chap) => {
                  if (chap.id !== chapterId) return chap;
                  return {
                    ...chap,
                    topics: chap.topics.map((top) => {
                      if (top.id !== topicId) return top;
                      // Only award XP/Coins if topic is completed for the first time
                      if (!top.isCompleted) {
                        setTimeout(() => {
                          // Side effect inside state update - standard for mock actions
                        }, 0);
                      }
                      return { ...top, isCompleted: true };
                    })
                  };
                })
              };
            })
          };
        })
      };
    });

    // Award XP
    const isFirstTime = !state.boards
      .find(b => b.id === boardId)
      ?.classes.find(c => c.id === classId)
      ?.subjects.find(s => s.id === subjectId)
      ?.chapters.find(ch => ch.id === chapterId)
      ?.topics.find(t => t.id === topicId)
      ?.isCompleted;

    const newXp = isFirstTime ? state.profile.xp + 200 : state.profile.xp;
    const newCoins = isFirstTime ? state.profile.coins + 20 : state.profile.coins;
    const currentLvl = Math.floor(newXp / 1000) + 1;
    const newLvl = currentLvl !== state.profile.level;

    return {
      boards: updatedBoards,
      profile: {
        ...state.profile,
        xp: newXp,
        coins: newCoins,
        level: currentLvl
      }
    };
  }),

  addBookmark: (bookmark, videoTime) => set((state) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bm-${Date.now()}`,
      timestamp: videoTime
    };
    return {
      bookmarks: [newBookmark, ...state.bookmarks]
    };
  }),

  deleteBookmark: (id) => set((state) => ({
    bookmarks: state.bookmarks.filter(bm => bm.id !== id)
  })),

  submitAssignment: (assignmentId, fileName) => set((state) => {
    const updated = state.assignments.map((assign) => {
      if (assign.id !== assignmentId) return assign;
      return {
        ...assign,
        status: 'Submitted' as const,
        submissionFile: fileName
      };
    });

    // Add XP for submitting assignment
    return {
      assignments: updated,
      profile: {
        ...state.profile,
        xp: state.profile.xp + 100
      }
    };
  }),

  submitQuizResult: (result) => set((state) => {
    // Award XP based on score (e.g. 100 XP per correct answer)
    const gainedXp = result.score * 150;
    const gainedCoins = result.score * 10;
    const newXp = state.profile.xp + gainedXp;
    
    // Add success certificate if perfect score
    const newCertificates = [...state.profile.certificates];
    if (result.score === result.totalQuestions) {
      newCertificates.push({
        id: `cert-${Date.now()}`,
        title: `${result.title} Perfect Score Badge`,
        issuer: 'EduVerse Academy',
        date: new Date().toLocaleDateString('en-IN'),
        grade: 'Perfect (100%)'
      });
    }

    return {
      profile: {
        ...state.profile,
        xp: newXp,
        coins: state.profile.coins + gainedCoins,
        level: Math.floor(newXp / 1000) + 1,
        certificates: newCertificates
      }
    };
  }),

  readAllNotifications: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  addNotification: (title, message, type) => set((state) => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    return {
      notifications: [newNotif, ...state.notifications]
    };
  }),

  createTopic: (boardId, classId, subjectId, chapterId, title, duration, videoUrl, content) => set((state) => {
    const topicId = `topic-${Date.now()}`;
    const newTopic: Topic = {
      id: topicId,
      title,
      duration,
      videoUrl,
      content,
      isCompleted: false
    };

    const updatedBoards = state.boards.map((board) => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        classes: board.classes.map((cls) => {
          if (cls.id !== classId) return cls;
          return {
            ...cls,
            subjects: cls.subjects.map((sub) => {
              if (sub.id !== subjectId) return sub;
              return {
                ...sub,
                chapters: sub.chapters.map((chap) => {
                  if (chap.id !== chapterId) return chap;
                  return {
                    ...chap,
                    topics: [...chap.topics, newTopic]
                  };
                })
              };
            })
          };
        })
      };
    });

    return { boards: updatedBoards };
  }),

  createChapter: (boardId, classId, subjectId, title) => set((state) => {
    const chapterId = `chapter-${Date.now()}`;
    const newChapter: Chapter = {
      id: chapterId,
      title,
      topics: []
    };

    const updatedBoards = state.boards.map((board) => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        classes: board.classes.map((cls) => {
          if (cls.id !== classId) return cls;
          return {
            ...cls,
            subjects: cls.subjects.map((sub) => {
              if (sub.id !== subjectId) return sub;
              return {
                ...sub,
                chapters: [...sub.chapters, newChapter]
              };
            })
          };
        })
      };
    });

    return { boards: updatedBoards };
  }),

  createQuiz: (quiz) => set((state) => ({
    quizzes: [quiz, ...state.quizzes]
  })),

  gradeAssignment: (id, grade, feedback) => set((state) => {
    const updated = state.assignments.map((assign) => {
      if (assign.id !== id) return assign;
      return {
        ...assign,
        status: 'Graded' as const,
        grade,
        feedback
      };
    });
    return { assignments: updated };
  }),

  addBoard: (title) => set((state) => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      title,
      classes: []
    };
    return { boards: [...state.boards, newBoard] };
  }),

  addClass: (boardId, title) => set((state) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.id !== boardId) return board;
      const newClass: ClassLevel = {
        id: `class-${Date.now()}`,
        title,
        subjects: []
      };
      return {
        ...board,
        classes: [...board.classes, newClass]
      };
    });
    return { boards: updatedBoards };
  }),

  addSubject: (boardId, classId, title, color = 'from-blue-600 to-cyan-600', imageUrl) => set((state) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        classes: board.classes.map((cls) => {
          if (cls.id !== classId) return cls;
          const newSubject: Subject = {
            id: `subject-${Date.now()}`,
            title,
            color,
            imageUrl: imageUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300',
            chapters: []
          };
          return {
            ...cls,
            subjects: [...cls.subjects, newSubject]
          };
        })
      };
    });
    return { boards: updatedBoards };
  })
}));
