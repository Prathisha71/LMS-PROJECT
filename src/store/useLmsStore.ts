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
  imageUrl?: string;
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
  username?: string;
  password?: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  selectedBoardId: string;
  selectedClassId: string;
  age?: string;
  location?: string;
  optedSubjectId?: string;
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

// --- LOCAL STORAGE HELPERS FOR STUDENTS ---
const STORAGE_KEY = 'eduverse_registered_students';

export const getRegisteredStudents = (): UserProfile[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data && (
      data.includes('"selectedBoardId":"cbse"') || 
      data.includes('"selectedBoardId":"icse"') || 
      data.includes('"optedSubjectId":"science-10"') || 
      data.includes('"optedSubjectId":"physics-11"') || 
      data.includes('"optedSubjectId":"physics-12"')
    )) {
      localStorage.removeItem(STORAGE_KEY);
    } else if (data) {
      return JSON.parse(data);
    }

    const defaultStudent: UserProfile = {
      name: 'Prathamesh Sharma',
      username: 'prathamesh',
      password: 'password123',
      email: 'prathamesh@eduverse.in',
      role: 'student',
      selectedBoardId: 'tnsb',
      selectedClassId: 'class-12',
      age: '17',
      location: 'Chennai, Tamil Nadu',
      optedSubjectId: 'maths-12',
      xp: 4250,
      level: 4,
      coins: 350,
      streak: 5,
      achievements: [
        { id: 'ach-1', title: 'Daily Devotee', description: 'Maintained a 5-day study streak', icon: '🔥', unlockedAt: '2026-06-10' },
        { id: 'ach-2', title: 'Quiz Whiz', description: 'Scored 100% on a Chemistry Quiz', icon: '💡', unlockedAt: '2026-06-08' },
        { id: 'ach-3', title: 'Early Bird', description: 'Completed a lecture before 7 AM', icon: '🌅', unlockedAt: '2026-06-05' }
      ],
      certificates: [
        { id: 'cert-1', title: 'Matrices & Determinants Foundations Mastery', issuer: 'EduVerse Academy', date: '2026-06-02', grade: 'Outstanding (A+)' }
      ]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultStudent]));
    return [defaultStudent];
  } catch (e) {
    return [];
  }
};

export const saveRegisteredStudent = (student: UserProfile) => {
  try {
    const students = getRegisteredStudents();
    const index = students.findIndex(s => s.username === student.username);
    if (index >= 0) {
      students[index] = student;
    } else {
      students.push(student);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Failed to save student', e);
  }
};

// --- INITIAL MOCK DATA ---
const initialBoards: Board[] = [
  {
    id: 'tnsb',
    title: 'Tamil Nadu State Board',
    classes: [
      {
        id: 'class-12',
        title: 'Class 12',
        subjects: [
          {
            id: 'maths-12',
            title: 'Mathematics',
            color: 'from-sky-600 to-blue-700',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'matrices-determinants-12',
                title: 'Chapter 1: Applications of Matrices and Determinants',
                topics: [
                  {
                    id: 'matrices-determinants-12-t1',
                    title: '1.1 Adjoint, Inverse and Rank of a Matrix',
                    duration: '15m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    pdfUrl: '/adjoint_inverse_rank_notes.pdf',
                    content: 'Understand the adjoint of a matrix, calculating the inverse of square matrices, and finding the rank of a matrix. The adjoint of a square matrix A is the transpose of its cofactor matrix. To calculate the inverse, we use the formula A⁻¹ = (1/|A|) * adj(A), provided the determinant |A| is non-zero. The rank of a matrix represents the maximum number of linearly independent row or column vectors in the matrix, which can be found by reducing the matrix to row-echelon form.'
                  },
                  {
                    id: 'matrices-determinants-12-t2',
                    title: '1.2 Solving Linear Systems: Cramer\'s Rule, Matrix Inversion & Gauss Elimination',
                    duration: '22m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Solving systems of linear equations using Cramer\'s rule, the matrix inversion method, and the Gaussian elimination method. Cramer\'s rule utilizes determinants to find solutions for variables, while the matrix inversion method applies the inverse of the coefficient matrix. Gaussian elimination reduces the augmented matrix to row-echelon form to find solutions via back-substitution.'
                  }
                ]
              },
              {
                id: 'complex-numbers-12',
                title: 'Chapter 2: Complex Numbers',
                topics: [
                  {
                    id: 'complex-numbers-12-t1',
                    title: '2.1 Rectangular and Polar Forms of Complex Numbers',
                    duration: '18m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand complex numbers in rectangular and polar forms, their algebraic properties, and Argand diagrams.'
                  },
                  {
                    id: 'complex-numbers-12-t2',
                    title: '2.2 Conjugate, Modulus and de Moivre’s Theorem',
                    duration: '20m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understand conjugate properties, modulus of a complex number, and applying de Moivre’s theorem to find roots.'
                  }
                ]
              },
              {
                id: 'theory-equations-12',
                title: 'Chapter 3: Theory of Equations',
                topics: [
                  {
                    id: 'theory-equations-12-t1',
                    title: '3.1 Polynomial Equations and Vieta’s Formulas',
                    duration: '16m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand Vieta’s formulas for quadratic, cubic, and higher-degree polynomial equations, and the nature of roots.'
                  },
                  {
                    id: 'theory-equations-12-t2',
                    title: '3.2 Higher-Degree Equations & Descartes’ Rule of Signs',
                    duration: '18m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Solving polynomial equations with real/complex coefficients and applying Descartes’ Rule of Signs to find maximum positive/negative real roots.'
                  }
                ]
              },
              {
                id: 'inverse-trig-12',
                title: 'Chapter 4: Inverse Trigonometric Functions',
                topics: [
                  {
                    id: 'inverse-trig-12-t1',
                    title: '4.1 Principal Values, Domains and Graphs',
                    duration: '19m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Learn domains, ranges, graphs, and principal values of inverse trigonometric functions.'
                  },
                  {
                    id: 'inverse-trig-12-t2',
                    title: '4.2 Properties of Inverse Trigonometric Functions',
                    duration: '21m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Applying properties and identities of inverse trigonometric functions to simplify expressions and solve equations.'
                  }
                ]
              },
              {
                id: 'geometry-2d-ii-12',
                title: 'Chapter 5: Two-Dimensional Analytical Geometry-II',
                topics: [
                  {
                    id: 'geometry-2d-ii-12-t1',
                    title: '5.1 Conic Sections: Equations & Properties',
                    duration: '22m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Identify equations and key properties (focus, directrix, eccentricity, asymptotes) of parabolas, ellipses, and hyperbolas.'
                  },
                  {
                    id: 'geometry-2d-ii-12-t2',
                    title: '5.2 Tangents, Normals and Conic Applications',
                    duration: '20m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Equations of tangents and normals to conics, and practical applications of conics in reflective properties.'
                  }
                ]
              },
              {
                id: 'vector-algebra-12',
                title: 'Chapter 6: Applications of Vector Algebra',
                topics: [
                  {
                    id: 'vector-algebra-12-t1',
                    title: '6.1 Scalar/Vector Triple Products & Skew Lines',
                    duration: '18m 55s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Compute scalar and vector triple products, and find the shortest distance between skew lines.'
                  },
                  {
                    id: 'vector-algebra-12-t2',
                    title: '6.2 Vector and Cartesian Equations of Planes',
                    duration: '21m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Deriving vector and Cartesian equations of planes, angles between planes, and projections.'
                  }
                ]
              },
              {
                id: 'differential-calc-12',
                title: 'Chapter 7: Applications of Differential Calculus',
                topics: [
                  {
                    id: 'differential-calc-12-t1',
                    title: '7.1 Mean Value Theorem & Taylor/Maclaurin Series',
                    duration: '22m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Learn Rolle\'s theorem, Lagrange Mean Value Theorem, and Taylor/Maclaurin series expansions of basic functions.'
                  },
                  {
                    id: 'differential-calc-12-t2',
                    title: '7.2 Extreme Values, Concavity & Rate Measures',
                    duration: '24m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Find local and absolute extrema, concavity, points of inflection, and model rate measures using derivatives.'
                  }
                ]
              },
              {
                id: 'partial-derivatives-12',
                title: 'Chapter 8: Differentials and Partial Derivatives',
                topics: [
                  {
                    id: 'partial-derivatives-12-t1',
                    title: '8.1 Linear Approximations & Homogeneous Functions',
                    duration: '17m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand linear approximations, total differentials, homogeneous functions, and Euler\'s theorem.'
                  },
                  {
                    id: 'partial-derivatives-12-t2',
                    title: '8.2 Partial Differentiation & Chain Rule',
                    duration: '19m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Partial differentiation, chain rule for partial derivatives, and Jacobian determinant calculations.'
                  }
                ]
              },
              {
                id: 'integration-apps-12',
                title: 'Chapter 9: Applications of Integration',
                topics: [
                  {
                    id: 'integration-apps-12-t1',
                    title: '9.1 Definite Integrals, Reduction Formulae & Gamma Integrals',
                    duration: '23m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Evaluate definite integrals using properties, reduction formulae, and Gamma integrals.'
                  },
                  {
                    id: 'integration-apps-12-t2',
                    title: '9.2 Area of Bounded Plane Regions',
                    duration: '26m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Calculate the area of regions bounded by curves (parabolas, ellipses, circles) using integration.'
                  }
                ]
              },
              {
                id: 'differential-equations-12',
                title: 'Chapter 10: Ordinary Differential Equations',
                topics: [
                  {
                    id: 'differential-equations-12-t1',
                    title: '10.1 Order, Degree and Variable Separable Method',
                    duration: '19m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Define order and degree, form differential equations, and solve equations using the variable separable method.'
                  },
                  {
                    id: 'differential-equations-12-t2',
                    title: '10.2 Homogeneous & First-Order Linear Equations',
                    duration: '22m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Solve homogeneous first-order differential equations and linear differential equations using integrating factors.'
                  }
                ]
              },
              {
                id: 'prob-distributions-12',
                title: 'Chapter 11: Probability Distributions',
                topics: [
                  {
                    id: 'prob-distributions-12-t1',
                    title: '11.1 Random Variables, PMF/PDF & Expectations',
                    duration: '20m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Discrete and continuous random variables, probability mass/density functions, mathematical expectation, and variance.'
                  },
                  {
                    id: 'prob-distributions-12-t2',
                    title: '11.2 Binomial and Poisson Distributions',
                    duration: '22m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Define and apply discrete probability distributions: Binomial and Poisson distributions.'
                  }
                ]
              },
              {
                id: 'discrete-math-12',
                title: 'Chapter 12: Discrete Mathematics',
                topics: [
                  {
                    id: 'discrete-math-12-t1',
                    title: '12.1 Binary Operations & Algebraic Structures',
                    duration: '16m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Define binary operations, properties (closure, commutative, associative, identity, inverse), and algebraic structures.'
                  },
                  {
                    id: 'discrete-math-12-t2',
                    title: '12.2 Mathematical Logic, Connectives & Truth Tables',
                    duration: '18m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Logical statements, truth tables, logical connectives, tautologies, contradictions, and logical equivalence.'
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
                id: 'metallurgy-12',
                title: 'Chapter 1: Metallurgy',
                topics: [
                  {
                    id: 'chemistry-12-c1-t1',
                    title: '1.1 Ores Concentration & Extraction of Metals',
                    duration: '16m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Froth flotation, magnetic separation, chemical leaching, and thermodynamic principles of metallurgy (Ellingham diagram).'
                  },
                  {
                    id: 'chemistry-12-c1-t2',
                    title: '1.2 Refining of Crude Metals',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Distillation, liquation, electrolytic refining, zone refining, vapor phase methods (Mond and Van-Arkel processes).'
                  }
                ]
              },
              {
                id: 'pblock1-12',
                title: 'Chapter 2: p-Block Elements I',
                topics: [
                  {
                    id: 'chemistry-12-c2-t1',
                    title: '2.1 Boron and Carbon Families (Groups 13 & 14)',
                    duration: '18m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'General properties, preparation and properties of borax, boric acid, diborane, and allotropes of carbon/silicates.'
                  },
                  {
                    id: 'chemistry-12-c2-t2',
                    title: '2.2 Nitrogen Family (Group 15 Elements)',
                    duration: '17m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Preparation and properties of nitrogen, ammonia, nitric acid, allotropic forms of phosphorus, and phosphine.'
                  }
                ]
              },
              {
                id: 'pblock2-12',
                title: 'Chapter 3: p-Block Elements II',
                topics: [
                  {
                    id: 'chemistry-12-c3-t1',
                    title: '3.1 Oxygen and Halogen Families (Groups 16 & 17)',
                    duration: '19m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Allotropes of oxygen, preparation/properties of sulphur dioxide, sulphuric acid manufacture, halogens, and interhalogen compounds.'
                  },
                  {
                    id: 'chemistry-12-c3-t2',
                    title: '3.2 Noble Gases (Group 18 Elements)',
                    duration: '14m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Physical/chemical properties of noble gases, compounds of xenon, and commercial/industrial applications.'
                  }
                ]
              },
              {
                id: 'dfblock-12',
                title: 'Chapter 4: d and f-Block Elements',
                topics: [
                  {
                    id: 'chemistry-12-c4-t1',
                    title: '4.1 Transition Elements: d-Block Properties',
                    duration: '20m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'General characteristics, variable oxidation states, catalytic properties, alloy formation, preparation of K2Cr2O7 and KMnO4.'
                  },
                  {
                    id: 'chemistry-12-c4-t2',
                    title: '4.2 Inner Transition Elements: Lanthanides & Actinides',
                    duration: '18m 35s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Electronic configuration, lanthanide contraction and its consequences, comparison of lanthanides and actinides.'
                  }
                ]
              },
              {
                id: 'coordination-12',
                title: 'Chapter 5: Coordination Chemistry',
                topics: [
                  {
                    id: 'chemistry-12-c5-t1',
                    title: '5.1 Werner\'s Theory & IUPAC Nomenclature',
                    duration: '21m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Valency concepts, Werner\'s coordination theory, ligands, coordination number, and IUPAC nomenclature rules for complexes.'
                  },
                  {
                    id: 'chemistry-12-c5-t2',
                    title: '5.2 Bonding in Complexes: Valence Bond & Crystal Field Theories',
                    duration: '22m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Valence bond theory, crystal field splitting in octahedral/tetrahedral geometries, magnetic properties, and stability of complexes.'
                  }
                ]
              },
              {
                id: 'solid-state-12',
                title: 'Chapter 6: Solid State',
                topics: [
                  {
                    id: 'chemistry-12-c6-t1',
                    title: '6.1 Crystalline Solids and Unit Cell Packing',
                    duration: '17m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Classification of solids, unit cell parameters, crystal lattices, Bragg\'s equation, and packing efficiency calculations.'
                  },
                  {
                    id: 'chemistry-12-c6-t2',
                    title: '6.2 Point Defects in Crystalline Solids',
                    duration: '15m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Stoichiometric defects (Schottky, Frenkel) and non-stoichiometric defects (metal excess, metal deficiency), impurity defects.'
                  }
                ]
              },
              {
                id: 'kinetics-12',
                title: 'Chapter 7: Chemical Kinetics',
                topics: [
                  {
                    id: 'chemistry-12-c7-t1',
                    title: '7.1 Reaction Rates, Order and Molecularity',
                    duration: '19m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Rate of reaction, rate expression, order, molecularity, differential/integrated rate equations for zero and first order reactions.'
                  },
                  {
                    id: 'chemistry-12-c7-t2',
                    title: '7.2 Collision Theory & Arrhenius Equation',
                    duration: '17m 55s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Temperature dependence of reaction rate, activation energy, Arrhenius equation, and collision theory.'
                  }
                ]
              },
              {
                id: 'ionic-equiv-12',
                title: 'Chapter 8: Ionic Equilibrium',
                topics: [
                  {
                    id: 'chemistry-12-c8-t1',
                    title: '8.1 Ostwald’s Dilution Law & pH Calculations',
                    duration: '19m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Arrhenius, Bronsted-Lowry, and Lewis concepts of acids/bases, Ostwald’s dilution law, pH/pOH computations.'
                  },
                  {
                    id: 'chemistry-12-c8-t2',
                    title: '8.2 Buffer Solutions & Solubility Product',
                    duration: '18m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Buffer action, Henderson-Hasselbalch equation, salt hydrolysis, solubility product constant (Ksp), and common ion effect.'
                  }
                ]
              },
              {
                id: 'electrochemistry-12',
                title: 'Chapter 9: Electrochemistry',
                topics: [
                  {
                    id: 'chemistry-12-c9-t1',
                    title: '9.1 Standard Electrode Potentials & Nernst Equation',
                    duration: '20m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Galvanic cells, standard hydrogen electrode, electrochemical series, and Nernst equation for EMF of a cell.'
                  },
                  {
                    id: 'chemistry-12-c9-t2',
                    title: '9.2 Electrolytic Conductance, Kohrausch Law & Batteries',
                    duration: '22m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Specific, equivalent, and molar conductance, Kohlrausch\'s law, fuel cells, primary/secondary batteries, and corrosion.'
                  }
                ]
              },
              {
                id: 'surface-chem-12',
                title: 'Chapter 10: Surface Chemistry',
                topics: [
                  {
                    id: 'chemistry-12-c10-t1',
                    title: '10.1 Physisorption, Chemisorption and Catalysis',
                    duration: '18m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Characteristics of adsorption, physical/chemical adsorption, adsorption isotherms, homogeneous/heterogeneous catalysis.'
                  },
                  {
                    id: 'chemistry-12-c10-t2',
                    title: '10.2 Colloids, Emulsions and Nanocatalysis',
                    duration: '19m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Classification of colloids, preparation, purification, Tyndall effect, Brownian movement, electrophoresis, emulsions, and uses of colloids.'
                  }
                ]
              },
              {
                id: 'hydroxy-ethers-12',
                title: 'Chapter 11: Hydroxy Compounds and Ethers',
                topics: [
                  {
                    id: 'chemistry-12-c11-t1',
                    title: '11.1 Alcohols & Phenols: Synthesis & Reactions',
                    duration: '23m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Preparations, naming, acidic character of phenols, Lucas test, Victor Meyer\'s test, oxidation, and esterification.'
                  },
                  {
                    id: 'chemistry-12-c11-t2',
                    title: '11.2 Ethers: Preparations & Chemical Properties',
                    duration: '18m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Preparation of ethers (Williamson synthesis), physical properties, chemical reactions, and industrial applications.'
                  }
                ]
              },
              {
                id: 'carbonyl-carboxylic-12',
                title: 'Chapter 12: Carbonyl Compounds and Carboxylic Acids',
                topics: [
                  {
                    id: 'chemistry-12-c12-t1',
                    title: '12.1 Aldehydes and Ketones: Nucleophilic Additions',
                    duration: '25m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Nomenclature, structure of carbonyl group, nucleophilic addition mechanisms, Aldol condensation, and Cannizzaro reaction.'
                  },
                  {
                    id: 'chemistry-12-c12-t2',
                    title: '12.2 Carboxylic Acids and Derivative Compounds',
                    duration: '22m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Methods of preparation of carboxylic acids, acidic strength, chemical properties, and derivatives (esters, acid chlorides, anhydrides).'
                  }
                ]
              },
              {
                id: 'organic-nitrogen-12',
                title: 'Chapter 13: Organic Nitrogen Compounds',
                topics: [
                  {
                    id: 'chemistry-12-c13-t1',
                    title: '13.1 Nitro Compounds & Amines',
                    duration: '21m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Preparation, properties of nitroalkanes and nitrobenzene. Classification, preparation, and basic strength of amines.'
                  },
                  {
                    id: 'chemistry-12-c13-t2',
                    title: '13.2 Diazonium Salts: Synthesis & Coupling Reactions',
                    duration: '17m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Preparation, physical/chemical properties, and coupling reactions of benzene diazonium chloride in organic synthesis.'
                  }
                ]
              },
              {
                id: 'biomolecules-12',
                title: 'Chapter 14: Biomolecules',
                topics: [
                  {
                    id: 'chemistry-12-c14-t1',
                    title: '14.1 Carbohydrates (Glucose/Fructose) & Amino Acids',
                    duration: '22m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Classification of carbohydrates, structure of glucose and fructose, peptide bonds, classification of amino acids, and protein structures.'
                  },
                  {
                    id: 'chemistry-12-c14-t2',
                    title: '14.2 Nucleic Acids (DNA/RNA) and Vitamins',
                    duration: '19m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Chemical composition of nucleic acids, double helical structure of DNA, classification of vitamins, and deficiency diseases.'
                  }
                ]
              },
              {
                id: 'everyday-chem-12',
                title: 'Chapter 15: Chemistry in Everyday Life',
                topics: [
                  {
                    id: 'chemistry-12-c15-t1',
                    title: '15.1 Polymers, Classification and Polymerization',
                    duration: '18m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Classification of polymers, addition and condensation polymerization (Buna-S, Nylon, Bakelite), and vulcanization of rubber.'
                  },
                  {
                    id: 'chemistry-12-c15-t2',
                    title: '15.2 Medicines, Dyes and Cleansing Agents',
                    duration: '19m 55s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Chemical structures and actions of medicines (analgesics, antibiotics, antiseptics), chemical composition of soaps and synthetic detergents.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'class-11',
        title: 'Class 11',
        subjects: [
          {
            id: 'maths-11',
            title: 'Mathematics',
            color: 'from-emerald-600 to-teal-700',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'sets-relations-functions-11',
                title: 'Chapter 1: Sets, Relations and Functions',
                topics: [
                  {
                    id: 'relations-functions-11-t1',
                    title: '1.1 Cartesian Products, Intervals & Neighborhoods',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Learn about cartesian products, constants, variables, intervals, and neighborhoods in set theory.'
                  },
                  {
                    id: 'relations-functions-11-t2',
                    title: '1.2 Functions and Graphing Transformations',
                    duration: '16m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understand graphing transformations and basic function concepts.'
                  }
                ]
              },
              {
                id: 'basic-algebra-11',
                title: 'Chapter 2: Basic Algebra',
                topics: [
                  {
                    id: 'algebra-11-t1',
                    title: '2.1 Real Numbers, Absolute Values & Inequalities',
                    duration: '15m 12s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Real number systems, absolute values, linear inequalities, and polynomial functions.'
                  },
                  {
                    id: 'algebra-11-t2',
                    title: '2.2 Logarithms and Radicals',
                    duration: '17m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understand logs, exponents, radical expressions, and solving algebraic equations.'
                  }
                ]
              },
              {
                id: 'trigonometry-11',
                title: 'Chapter 3: Trigonometry',
                topics: [
                  {
                    id: 'trig-11-t1',
                    title: '3.1 Radians, Identities & Trigonometric Equations',
                    duration: '18m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand radian measures, fundamental trigonometric identities, and equations.'
                  },
                  {
                    id: 'trig-11-t2',
                    title: '3.2 Properties of Triangles & Inverse Functions',
                    duration: '20m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Learn properties of triangles, half-angle formulas, sine/cosine formulas, and inverse functions.'
                  }
                ]
              },
              {
                id: 'combinatorics-induction-11',
                title: 'Chapter 4: Combinatorics and Mathematical Induction',
                topics: [
                  {
                    id: 'combinatorics-11-t1',
                    title: '4.1 Counting Principles, Permutations & Combinations',
                    duration: '22m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Principles of counting, factorials, permutations, combinations, and algebraic methods.'
                  },
                  {
                    id: 'combinatorics-11-t2',
                    title: '4.2 Principles of Mathematical Induction Proofs',
                    duration: '16m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Proof by mathematical induction for various sums and divisibility rules.'
                  }
                ]
              },
              {
                id: 'binomial-sequences-11',
                title: 'Chapter 5: Binomial Theorem, Sequences and Series',
                topics: [
                  {
                    id: 'sequences-11-t1',
                    title: '5.1 Binomial Theorem and Finite Sequences',
                    duration: '19m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Binomial theorem expansions, finite sequences, and series concepts.'
                  },
                  {
                    id: 'sequences-11-t2',
                    title: '5.2 Series and AP/GP/HP Progressions',
                    duration: '21m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Arithmetic, geometric, and harmonic progressions, and sums of special series.'
                  }
                ]
              },
              {
                id: 'analytical-geometry-2d-11',
                title: 'Chapter 6: Two Dimensional Analytical Geometry',
                topics: [
                  {
                    id: 'geometry-2d-11-t1',
                    title: '6.1 Locus of Points and Straight Lines',
                    duration: '17m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Locus of points, straight lines, slopes, and straight line equations.'
                  },
                  {
                    id: 'geometry-2d-11-t2',
                    title: '6.2 Angles Between Lines & Pairs of Straight Lines',
                    duration: '20m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Angles between lines, distance from a point to a line, and properties of pairs of straight lines.'
                  }
                ]
              },
              {
                id: 'matrices-determinants-11',
                title: 'Chapter 7: Matrices and Determinants',
                topics: [
                  {
                    id: 'matrices-11-t1',
                    title: '7.1 Types of Matrices & Determinant Evaluation',
                    duration: '18m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Matrix definitions, types of matrices, determinant concepts, and properties.'
                  },
                  {
                    id: 'matrices-11-t2',
                    title: '7.2 Matrices: System of Linear Equations',
                    duration: '20m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Using matrices and determinants to solve systems of linear equations.'
                  }
                ]
              },
              {
                id: 'vector-algebra-11',
                title: 'Chapter 8: Vector Algebra-I',
                topics: [
                  {
                    id: 'vector-11-t1',
                    title: '8.1 Scalars, Vectors & Position Vectors',
                    duration: '15m 55s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Scalars, vectors, position vectors, and resolution of vectors in 2D and 3D space.'
                  },
                  {
                    id: 'vector-11-t2',
                    title: '8.2 Direction Cosines & Product of Vectors',
                    duration: '18m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Direction cosines, dot products, cross products, and vector projections.'
                  }
                ]
              },
              {
                id: 'limits-continuity-11',
                title: 'Chapter 9: Differential Calculus - Limits and Continuity',
                topics: [
                  {
                    id: 'limits-11-t1',
                    title: '9.1 Concepts and Evaluation of Limits',
                    duration: '21m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Limits concept, left-hand and right-hand limits, and computing limit values.'
                  },
                  {
                    id: 'limits-11-t2',
                    title: '9.2 Continuity Evaluation of Functions',
                    duration: '19m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Defining continuity at a point, interval continuity, and continuity of basic functions.'
                  }
                ]
              },
              {
                id: 'differentiation-methods-11',
                title: 'Chapter 10: Differential Calculus - Differentiability & Methods of Differentiation',
                topics: [
                  {
                    id: 'diff-11-t1',
                    title: '10.1 Concept of Derivatives and Differentiability',
                    duration: '23m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Derivative concepts, differentiability, first principles of derivatives, and differentiability rules.'
                  },
                  {
                    id: 'diff-11-t2',
                    title: '10.2 Methods of Differentiation: Product, Quotient & Chain',
                    duration: '25m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Applying product, quotient, and chain rules of differentiation.'
                  }
                ]
              },
              {
                id: 'integral-calculus-11',
                title: 'Chapter 11: Integral Calculus',
                topics: [
                  {
                    id: 'integration-11-t1',
                    title: '11.1 Newton-Leibnitz Integral & Basic Rules',
                    duration: '22m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Antiderivatives, basic properties, rules of integration, and standard integrals.'
                  },
                  {
                    id: 'integration-11-t2',
                    title: '11.2 Integration Methods: Integration by Substitution',
                    duration: '24m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Using substitution, integration by parts, and rational functions to integrate.'
                  }
                ]
              },
              {
                id: 'probability-theory-11',
                title: 'Chapter 12: Introduction to Probability Theory',
                topics: [
                  {
                    id: 'prob-11-t1',
                    title: '12.1 Sample Spaces & Classical Probability Theorems',
                    duration: '16m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Finite sample spaces, events, classical probability definitions, and addition theorems.'
                  },
                  {
                    id: 'prob-11-t2',
                    title: '12.2 Conditional Probability & Independent Events',
                    duration: '19m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Conditional probability, independent events, multiplication theorem, and Bayes\' Theorem.'
                  }
                ]
              }
            ]
          },
          {
            id: 'chemistry-11',
            title: 'Chemistry',
            color: 'from-rose-600 to-pink-700',
            imageUrl: 'https://images.unsplash.com/photo-1614963326505-843867e2a738?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'basic-concepts-11',
                title: 'Chapter 1: Basic Concepts of Chemistry and Chemical Calculations',
                topics: [
                  {
                    id: 'chemistry-11-c1-t1',
                    title: '1.1 Mole Concept and Chemical Calculations',
                    duration: '16m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Mole concept, Avogadro\'s number, molar mass, stoichiometry, and calculating empirical/molecular formulae.'
                  },
                  {
                    id: 'chemistry-11-c1-t2',
                    title: '1.2 Stoichiometry & Redox Reactions',
                    duration: '14m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Oxidation numbers, balancing redox reactions using ion-electron and oxidation number methods.'
                  }
                ]
              },
              {
                id: 'quantum-model-11',
                title: 'Chapter 2: Quantum Mechanical Model of Atom',
                topics: [
                  {
                    id: 'chemistry-11-c2-t1',
                    title: '2.1 Wave-Particle Duality & Heisenberg Principle',
                    duration: '18m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'De Broglie relationship, Heisenberg uncertainty principle, and Schrödinger wave equation introduction.'
                  },
                  {
                    id: 'chemistry-11-c2-t2',
                    title: '2.2 Quantum Numbers and Orbital Configurations',
                    duration: '17m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Principal, azimuthal, magnetic, and spin quantum numbers. Rules for filling orbitals: Aufbau, Pauli exclusion, and Hund\'s rule.'
                  }
                ]
              },
              {
                id: 'periodic-class-11',
                title: 'Chapter 3: Periodic Classification of Elements',
                topics: [
                  {
                    id: 'chemistry-11-c3-t1',
                    title: '3.1 Ionization Energy & Electron Affinity Trends',
                    duration: '15m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand ionization potential, electron gain enthalpy, trends, and factors affecting periodic properties.'
                  },
                  {
                    id: 'chemistry-11-c3-t2',
                    title: '3.2 Electronegativity & Valence Trends',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Electronegativity scales (Pauling, Mulliken), diagonal relationships, and trends in chemical reactivity.'
                  }
                ]
              },
              {
                id: 'hydrogen-11',
                title: 'Chapter 4: Hydrogen',
                topics: [
                  {
                    id: 'chemistry-11-c4-t1',
                    title: '4.1 Hydrogen Isotopes, Preparation & Heavy Water',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Protium, deuterium, tritium. Preparation and properties of ortho/para hydrogen, and preparation/uses of heavy water (D2O).'
                  },
                  {
                    id: 'chemistry-11-c4-t2',
                    title: '4.2 Hydrides & Hydrogen Fuel Economy',
                    duration: '13m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Classification of hydrides: ionic, covalent, metallic. Concept of hydrogen as a clean future fuel.'
                  }
                ]
              },
              {
                id: 'sblock-elements-11',
                title: 'Chapter 5: Alkali and Alkaline Earth Metals',
                topics: [
                  {
                    id: 'chemistry-11-c5-t1',
                    title: '5.1 Alkali Metals: s-Block Group 1 Elements',
                    duration: '17m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Electronic configuration, periodic trends, anomalous properties of lithium, and compounds of sodium.'
                  },
                  {
                    id: 'chemistry-11-c5-t2',
                    title: '5.2 Alkaline Earth Metals: s-Block Group 2 Elements',
                    duration: '16m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'General characteristics, periodic properties, diagonal relationship of Be and Al, plaster of Paris, and quicklime.'
                  }
                ]
              },
              {
                id: 'gaseous-state-11',
                title: 'Chapter 6: Gaseous State',
                topics: [
                  {
                    id: 'chemistry-11-c6-t1',
                    title: '6.1 Gas Laws & Ideal Gas Equation',
                    duration: '16m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Boyle\'s law, Charles\'s law, Avogadro\'s law, Dalton\'s law of partial pressures, and ideal gas equation calculations.'
                  },
                  {
                    id: 'chemistry-11-c6-t2',
                    title: '6.2 Deviation from Ideal Behavior',
                    duration: '18m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Deviation behavior of real gases, compressibility factor, and derivation of Vander Waals equation.'
                  }
                ]
              },
              {
                id: 'thermo-11',
                title: 'Chapter 7: Thermodynamics',
                topics: [
                  {
                    id: 'chemistry-11-c7-t1',
                    title: '7.1 Systems, State Functions, Internal Energy & Enthalpy',
                    duration: '19m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Thermodynamic terms: system, boundary, surroundings, state functions, first law, internal energy, and enthalpy.'
                  },
                  {
                    id: 'chemistry-11-c7-t2',
                    title: '7.2 Second & Third Laws, Entropy & Gibbs Free Energy',
                    duration: '21m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Entropy concept, second and third laws of thermodynamics, Gibbs free energy, and reaction spontaneity criterion.'
                  }
                ]
              },
              {
                id: 'equilibrium-11',
                title: 'Chapter 8: Physical and Chemical Equilibrium',
                topics: [
                  {
                    id: 'chemistry-11-c8-t1',
                    title: '8.1 Equilibrium Constants and Le Chateliers Principle',
                    duration: '18m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Dynamic equilibrium, Kc and Kp constants, and factors affecting equilibrium states via Le Chatelier\'s principle.'
                  },
                  {
                    id: 'chemistry-11-c8-t2',
                    title: '8.2 Heterogeneous Equilibrium Applications',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Equilibrium equations for gas-solid systems, thermal dissociation of calcium carbonate, and ammonia synthesis.'
                  }
                ]
              },
              {
                id: 'solutions-11',
                title: 'Chapter 9: Solutions',
                topics: [
                  {
                    id: 'chemistry-11-c9-t1',
                    title: '9.1 Raoult\'s Law and Vapor Pressures',
                    duration: '16m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Liquid-liquid solutions, Raoult\'s law, ideal and non-ideal solutions, deviations from Raoult\'s law.'
                  },
                  {
                    id: 'chemistry-11-c9-t2',
                    title: '9.2 Colligative Properties & Vant Hoff Factor',
                    duration: '19m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Relative lowering of vapor pressure, elevation of boiling point, depression of freezing point, osmotic pressure, and Vant Hoff factor.'
                  }
                ]
              },
              {
                id: 'bonding-11',
                title: 'Chapter 10: Chemical Bonding',
                topics: [
                  {
                    id: 'chemistry-11-c10-t1',
                    title: '10.1 VSEPR Theory and Molecular Hybridization',
                    duration: '20m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Valence shell electron pair repulsion theory, molecular geometry, hybridization (sp, sp2, sp3, sp3d), and overlapping.'
                  },
                  {
                    id: 'chemistry-11-c10-t2',
                    title: '10.2 Molecular Orbital Theory (MOT)',
                    duration: '18m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'LCAO method, bonding and antibonding molecular orbitals, energy level diagrams, bond order, and magnetic properties of diatomic molecules.'
                  }
                ]
              },
              {
                id: 'org-fundamentals-11',
                title: 'Chapter 11: Fundamentals of Organic Chemistry',
                topics: [
                  {
                    id: 'chemistry-11-c11-t1',
                    title: '11.1 Organic Chemistry: Classification & IUPAC Nomenclature',
                    duration: '22m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Classification of organic compounds, IUPAC nomenclature rules for naming simple and polyfunctional compounds.'
                  },
                  {
                    id: 'chemistry-11-c11-t2',
                    title: '11.2 Structural and Stereo Isomerism',
                    duration: '19m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Types of isomerism: structural (chain, position, functional, metamerism, tautomerism) and stereoisomerism (geometrical, optical) introduction.'
                  }
                ]
              },
              {
                id: 'org-concepts-11',
                title: 'Chapter 12: Basic Concepts of Organic Reactions',
                topics: [
                  {
                    id: 'chemistry-11-c12-t1',
                    title: '12.1 Electronic Effects: Inductive, Electromeric & Resonance',
                    duration: '18m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand electron displacement effects in organic molecules: inductive, electromeric, resonance (mesomeric), and hyperconjugation.'
                  },
                  {
                    id: 'chemistry-11-c12-t2',
                    title: '12.2 Cleavage of Bonds & Reaction Intermediates',
                    duration: '17m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Homolytic and heterolytic fission, stability of carbocations, carbanions, free radicals, and electrophile/nucleophile classifications.'
                  }
                ]
              },
              {
                id: 'hydrocarbons-11',
                title: 'Chapter 13: Hydrocarbons',
                topics: [
                  {
                    id: 'chemistry-11-c13-t1',
                    title: '13.1 Aliphatic Hydrocarbons: Preparation & Reactions',
                    duration: '21m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Preparations, physical properties, and chemical reactions of alkanes, alkenes (addition of HX, Markovnikov rule), and alkynes.'
                  },
                  {
                    id: 'chemistry-11-c13-t2',
                    title: '13.2 Aromaticity, Benzene & Hückels Rule',
                    duration: '18m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Concept of aromaticity, Hückel\'s rule (4n+2 rule), structure of benzene, and electrophilic aromatic substitution mechanisms.'
                  }
                ]
              },
              {
                id: 'haloalkanes-11',
                title: 'Chapter 14: Haloalkanes and Haloarenes',
                topics: [
                  {
                    id: 'chemistry-11-c14-t1',
                    title: '14.1 SN1 and SN2 Reaction Mechanisms',
                    duration: '23m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Kinetics, stereochemical details, factors affecting, and comparative study of SN1 and SN2 nucleophilic substitution reactions.'
                  },
                  {
                    id: 'chemistry-11-c14-t2',
                    title: '14.2 Haloarenes: Preparation & Substitution',
                    duration: '19m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Methods of preparation, physical properties, chemical reactivity of haloarenes, and organometallic compounds.'
                  }
                ]
              },
              {
                id: 'environmental-11',
                title: 'Chapter 15: Environmental Chemistry',
                topics: [
                  {
                    id: 'chemistry-11-c15-t1',
                    title: '15.1 Air, Water & Soil Pollution Mechanics',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Gaseous and particulate air pollutants, acid rain, greenhouse effect, global warming, and classical/photochemical smog.'
                  },
                  {
                    id: 'chemistry-11-c15-t2',
                    title: '15.2 Green Chemistry: Principles & Strategies',
                    duration: '13m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Principles of green chemistry, waste minimization, eco-friendly solvents, and pollution control strategies.'
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
            id: 'maths-10',
            title: 'Mathematics',
            color: 'from-cyan-600 to-blue-700',
            imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'relations-functions-10',
                title: 'Chapter 1: Relations and Functions',
                topics: [
                  {
                    id: 'relations-functions-10-t1',
                    title: '1.1 Ordered Pairs and Cartesian Products',
                    duration: '14m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand the concept of Cartesian products between sets and mapping ordered pairs.'
                  },
                  {
                    id: 'relations-functions-10-t2',
                    title: '1.2 Types of Functions and Composition of Functions',
                    duration: '16m 25s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Learn about different types of functions (one-to-one, onto, constant, identity, quadratic) and the composition of functions.'
                  }
                ]
              },
              {
                id: 'numbers-sequences-10',
                title: 'Chapter 2: Numbers and Sequences',
                topics: [
                  {
                    id: 'numbers-sequences-10-t1',
                    title: '2.1 Euclid’s Division Lemma and Modular Arithmetic',
                    duration: '15m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand Euclid’s Division Lemma, Euclid’s Division Algorithm, and modular arithmetic concept and applications.'
                  },
                  {
                    id: 'numbers-sequences-10-t2',
                    title: '2.2 Arithmetic Progression (AP) and Geometric Progression (GP)',
                    duration: '18m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Learn how to find the general term (nth term) and sum of first n terms of Arithmetic Progression (AP) and Geometric Progression (GP).'
                  }
                ]
              },
              {
                id: 'algebra-10',
                title: 'Chapter 3: Algebra',
                topics: [
                  {
                    id: 'algebra-10-t1',
                    title: '3.1 Simultaneous Linear Equations & Polynomial GCD/LCM',
                    duration: '22m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Solving simultaneous linear equations in three variables and finding the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of polynomials.'
                  },
                  {
                    id: 'algebra-10-t2',
                    title: '3.2 Quadratic Equations, Graphs, and Matrices',
                    duration: '25m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Solving quadratic equations (factorization, formula, completing square methods), drawing quadratic graphs, and learning matrix operations (addition, subtraction, multiplication).'
                  }
                ]
              },
              {
                id: 'geometry-10',
                title: 'Chapter 4: Geometry',
                topics: [
                  {
                    id: 'geometry-10-t1',
                    title: '4.1 Basic Theorems: Thales, Angle Bisector & Pythagoras',
                    duration: '20m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Study and verify fundamental geometric theorems including Thales theorem (Basic Proportionality Theorem), Angle Bisector theorem, and Pythagoras theorem.'
                  },
                  {
                    id: 'geometry-10-t2',
                    title: '4.2 Circles, Tangents, and Practical Geometry Constructions',
                    duration: '24m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understand properties of chords, tangents to a circle, alternate segment theorem, and construct tangents to a circle and triangles.'
                  }
                ]
              },
              {
                id: 'coordinate-geometry-10',
                title: 'Chapter 5: Coordinate Geometry',
                topics: [
                  {
                    id: 'coordinate-geometry-10-t1',
                    title: '5.1 Area of Triangles and Quadrilaterals',
                    duration: '15m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Find the area of a triangle and quadrilateral using coordinate points on the Cartesian plane.'
                  },
                  {
                    id: 'coordinate-geometry-10-t2',
                    title: '5.2 Inclination of a Line, Slopes, and Straight Lines',
                    duration: '17m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Calculate the inclination and slope of a straight line, parallel/perpendicular lines, and find equations of straight lines in various forms.'
                  }
                ]
              },
              {
                id: 'trigonometry-10',
                title: 'Chapter 6: Trigonometry',
                topics: [
                  {
                    id: 'trigonometry-10-t1',
                    title: '6.1 Trigonometric Identities',
                    duration: '18m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Prove and apply basic trigonometric identities derived from Pythagoras theorem.'
                  },
                  {
                    id: 'trigonometry-10-t2',
                    title: '6.2 Heights and Distances (Angles of Elevation & Depression)',
                    duration: '21m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Solve real-world height and distance problems using angles of elevation and angles of depression with trigonometric ratios.'
                  }
                ]
              },
              {
                id: 'mensuration-10',
                title: 'Chapter 7: Mensuration',
                topics: [
                  {
                    id: 'mensuration-10-t1',
                    title: '7.1 Surface Area of Cylinders, Cones, Spheres & Frustums',
                    duration: '19m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Calculate the curved surface area (CSA) and total surface area (TSA) of combined solids like cylinders, cones, spheres, frustums, and hemispheres.'
                  },
                  {
                    id: 'mensuration-10-t2',
                    title: '7.2 Volume of Combined Solids',
                    duration: '22m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Calculate the volume of combined solids and solve problems on conversion of solids from one shape to another.'
                  }
                ]
              },
              {
                id: 'statistics-probability-10',
                title: 'Chapter 8: Statistics and Probability',
                topics: [
                  {
                    id: 'stats-prob-10-t1',
                    title: '8.1 Measures of Dispersion: Range, Variance & SD',
                    duration: '16m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand standard deviation, range, variance, and coefficient of variation of grouped and ungrouped datasets.'
                  },
                  {
                    id: 'stats-prob-10-t2',
                    title: '8.2 Classical Probability & Addition Theorem of Probability',
                    duration: '18m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Learn classical probability, algebra of events, and application of the addition theorem of probability: P(A U B) = P(A) + P(B) - P(A ∩ B).'
                  }
                ]
              }
            ]
          },
          {
            id: 'chemistry-10',
            title: 'Chemistry',
            color: 'from-teal-600 to-emerald-700',
            imageUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'atoms-molecules-10',
                title: 'Chapter 1: Atoms and Molecules',
                topics: [
                  {
                    id: 'chemistry-10-c1-t1',
                    title: '1.1 Relative Atomic/Molecular Mass & Avogadros Law',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Relative atomic mass, relative molecular mass, mole calculations, and Avogadro\'s law.'
                  },
                  {
                    id: 'chemistry-10-c1-t2',
                    title: '1.2 Atomicity and Vapor Density',
                    duration: '13m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Determining the atomicity of elements, relationship between vapor density and relative molecular mass.'
                  }
                ]
              },
              {
                id: 'periodic-class-10',
                title: 'Chapter 2: Periodic Classification of Elements',
                topics: [
                  {
                    id: 'chemistry-10-c2-t1',
                    title: '2.1 Metallurgy: Aluminium, Copper, and Iron',
                    duration: '18m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Ores and extraction metallurgy of Aluminium, Copper, and Iron. Physical periodic properties.'
                  },
                  {
                    id: 'chemistry-10-c2-t2',
                    title: '2.2 Alloys, Properties, and Metal Corrosion',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Composition and uses of common alloys, processes of metal corrosion, and prevention methods.'
                  }
                ]
              },
              {
                id: 'solutions-10',
                title: 'Chapter 3: Solutions',
                topics: [
                  {
                    id: 'chemistry-10-c3-t1',
                    title: '3.1 Solutes, Solvents & Saturation States',
                    duration: '14m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Types of solutions, saturated, unsaturated, and supersaturated states, solubility factors.'
                  },
                  {
                    id: 'chemistry-10-c3-t2',
                    title: '3.2 Hydrated Crystals and Water of Crystallization',
                    duration: '12m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understand hydrated crystals (e.g. copper sulphate pentahydrate), deliquescence, and efflorescence.'
                  }
                ]
              },
              {
                id: 'reaction-types-10',
                title: 'Chapter 4: Types of Chemical Reactions',
                topics: [
                  {
                    id: 'chemistry-10-c4-t1',
                    title: '4.1 Chemical Reactions, Rates & Ionic Equilibrium',
                    duration: '16m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Types of chemical reactions (reversible/irreversible, displacement, double displacement), reaction rate factors, and equilibrium.'
                  },
                  {
                    id: 'chemistry-10-c4-t2',
                    title: '4.2 pH Metrics and pH in Everyday Life',
                    duration: '13m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Mathematical definition of pH = -log10[H+], pH metrics, and importance in digestive, agricultural, and biochemical systems.'
                  }
                ]
              },
              {
                id: 'carbon-compounds-10',
                title: 'Chapter 5: Carbon and its Compounds',
                topics: [
                  {
                    id: 'chemistry-10-c5-t1',
                    title: '5.1 Homologous Series & Functional Groups',
                    duration: '17m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Understand carbon tetrahedral structures, homologous series, and naming organic compounds with functional groups.'
                  },
                  {
                    id: 'chemistry-10-c5-t2',
                    title: '5.2 Manufacture & Properties of Ethanol & Ethanoic Acid',
                    duration: '16m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Industrial preparation, physical/chemical properties, reactions, and commercial uses of Ethanol and Ethanoic Acid.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'class-9',
        title: 'Class 9',
        subjects: [
          {
            id: 'maths-9',
            title: 'Mathematics',
            color: 'from-orange-600 to-amber-700',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'sets-9',
                title: 'Chapter 1: Set Language',
                imageUrl: '/set-language-cover.png',
                topics: [
                  {
                    id: 'set-intro',
                    title: '1.1 Introduction and Representation of Sets',
                    duration: '12m 30s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'A set is a well-defined collection of objects. This topic explains the concept of sets, description methods (Roster, Set-builder, Descriptive form), and types of sets.'
                  },
                  {
                    id: 'set-ops',
                    title: '1.2 Types of Sets and Set Operations',
                    duration: '18m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Learn about finite/infinite sets, empty set, subsets, power sets, and key set operations (union, intersection, difference, complement) with Venn Diagrams.'
                  }
                ]
              },
              {
                id: 'real-numbers-9',
                title: 'Chapter 2: Real Numbers',
                topics: [
                  {
                    id: 'rational-irrational',
                    title: '2.1 Rational and Irrational Numbers',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Representation of rational numbers on a number line, terminal and non-terminal decimal representations, and the existence of irrational numbers.'
                  },
                  {
                    id: 'surds-notation',
                    title: '2.2 Surds and Scientific Notation',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Definition, classification, and operations on surds. Rationalizing denominators of surds. Expressing large and small numbers in scientific notation.'
                  }
                ]
              },
              {
                id: 'algebra-9',
                title: 'Chapter 3: Algebra',
                topics: [
                  {
                    id: 'polynomials-identities',
                    title: '3.1 Polynomials and Algebraic Identities',
                    duration: '20m 05s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understanding polynomials, degree of polynomials, operations on polynomials, and essential algebraic identities.'
                  },
                  {
                    id: 'remainder-factor-theorems',
                    title: '3.2 Remainder and Factor Theorems',
                    duration: '18m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Dividing polynomials. Remainder Theorem states that dividing P(x) by (x-a) leaves remainder P(a). Factor Theorem states that (x-a) is a factor if P(a)=0.'
                  }
                ]
              },
              {
                id: 'geometry-9',
                title: 'Chapter 4: Geometry',
                topics: [
                  {
                    id: 'basics-quadrilaterals',
                    title: '4.1 Basics of Geometry and Quadrilaterals',
                    duration: '16m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Basic geometric terms, lines, angles, properties of triangles, and different types of quadrilaterals (parallelogram, rhombus, rectangle, square).'
                  },
                  {
                    id: 'circle-parts-constructions',
                    title: '4.2 Parts of a Circle and Geometric Constructions',
                    duration: '22m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Chord, segment, sector, and properties of chord/angles in a circle. Step-by-step constructions of circumcentre, orthocentre, and centroid of triangles.'
                  }
                ]
              },
              {
                id: 'coordinate-geometry-9',
                title: 'Chapter 5: Coordinate Geometry',
                topics: [
                  {
                    id: 'cartesian-system',
                    title: '5.1 Cartesian Coordinate System',
                    duration: '12m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Introduction to Cartesian plane, quadrants, plotting points, and identifying coordinates of points in different quadrants.'
                  },
                  {
                    id: 'distance-formula',
                    title: '5.2 Distance Between Two Points',
                    duration: '15m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Deriving and applying the Distance Formula: d = sqrt((x2 - x1)^2 + (y2 - y1)^2) to find the distance between any two points in the Cartesian plane.'
                  }
                ]
              },
              {
                id: 'trigonometry-9',
                title: 'Chapter 6: Trigonometry',
                topics: [
                  {
                    id: 'trig-ratios',
                    title: '6.1 Trigonometric Ratios',
                    duration: '18m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Trigonometric ratios of an acute angle in a right-angled triangle: Sine, Cosine, Tangent, Cosecant, Secant, and Cotangent.'
                  },
                  {
                    id: 'comp-angles-tables',
                    title: '6.2 Complementary Angles and Trigonometric Tables',
                    duration: '14m 45s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Trigonometric ratios of complementary angles (90 - theta) and reading values from natural trigonometric tables.'
                  }
                ]
              },
              {
                id: 'mensuration-9',
                title: 'Chapter 7: Mensuration',
                topics: [
                  {
                    id: 'herons-formula',
                    title: '7.1 Heron\'s Formula',
                    duration: '16m 12s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Calculating the area of a triangle using Heron\'s Formula: Area = sqrt(s * (s-a) * (s-b) * (s-c)) where s is the semi-perimeter: (a+b+c)/2.'
                  },
                  {
                    id: 'cubes-cuboids',
                    title: '7.2 Surface Area and Volume of Cubes & Cuboids',
                    duration: '19m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Formulas and calculations for Total Surface Area (TSA), Lateral Surface Area (LSA), and Volume of standard cubes and cuboids.'
                  }
                ]
              },
              {
                id: 'statistics-9',
                title: 'Chapter 8: Statistics',
                topics: [
                  {
                    id: 'data-collection-mean',
                    title: '8.1 Collection of Data and Arithmetic Mean',
                    duration: '14m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Methods of data collection, preparing frequency distribution tables, and calculating the arithmetic mean for grouped and ungrouped data.'
                  },
                  {
                    id: 'median-mode-9',
                    title: '8.2 Arithmetic Median and Mode',
                    duration: '15m 25s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Finding the middle value (Median) and the most frequent value (Mode) for given statistical datasets.'
                  }
                ]
              },
              {
                id: 'probability-9',
                title: 'Chapter 9: Probability',
                topics: [
                  {
                    id: 'classical-empirical',
                    title: '9.1 Classical and Empirical Probability',
                    duration: '13m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understanding randomness, trials, sample spaces, events, and the difference between classical and empirical approaches to probability.'
                  },
                  {
                    id: 'events-types',
                    title: '9.2 Types of Events',
                    duration: '12m 15s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Exploring different types of events: sure event, impossible event, mutually exclusive events, complementary events, and elementary events.'
                  }
                ]
              }
            ]
          },
          {
            id: 'chemistry-9',
            title: 'Chemistry',
            color: 'from-violet-600 to-fuchsia-700',
            imageUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=300',
            chapters: [
              {
                id: 'matter-around-us-9',
                title: 'Chapter 1: Matter Around Us',
                topics: [
                  {
                    id: 'chemistry-9-c1-t1',
                    title: '1.1 Elements, Compounds and Mixtures',
                    duration: '12m 40s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: `In this introductory lesson on Matter, we explore the classification of pure substances and mixtures based on their chemical composition:

1. Elements (Pure Substances)
• Definition: An element is a pure chemical substance consisting of only one type of atom. They cannot be broken down into simpler chemical substances by ordinary physical or chemical methods.
• Classification:
  - Metals: Conductors of heat and electricity, malleable, ductile, lustrous (e.g., Gold, Copper, Iron).
  - Non-Metals: Poor conductors, brittle, non-lustrous (e.g., Carbon, Oxygen, Hydrogen).
  - Metalloids: Exhibit properties of both metals and non-metals (e.g., Silicon, Boron, Arsenic).
• Examples: Helium (He), Sodium (Na), Copper (Cu).

2. Compounds (Pure Substances)
• Definition: A compound is a chemical substance formed when two or more different elements chemically combine together in a fixed, definite proportion by mass.
• Properties: The properties of a compound are entirely different from those of its constituent elements. Constituent elements can only be separated using chemical or electrochemical reactions.
• Examples: Water (H₂O), Carbon Dioxide (CO₂), Sodium Chloride (NaCl).

3. Mixtures (Imperfect/Physical Combinations)
• Definition: A mixture is formed when two or more substances (elements or compounds) are physically mixed together in any ratio without chemical bonding.
• Properties: The components of a mixture retain their individual chemical properties and can be separated using physical separation methods (e.g., filtration, distillation, evaporation).
• Classification:
  - Homogeneous Mixtures: Mixtures with a uniform composition and single phase throughout (e.g., air, salt dissolved in water, alloy metals).
  - Heterogeneous Mixtures: Mixtures with a non-uniform composition and visible boundaries of separation between phases (e.g., sand and water, oil and vinegar, concrete).`
                  },
                  {
                    id: 'chemistry-9-c1-t2',
                    title: '1.2 Methods of Separating Mixtures',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Learn physical methods of separation: sublimation, filtration, centrifugation, chromatography, and distillation.'
                  }
                ]
              },
              {
                id: 'atomic-structure-9',
                title: 'Chapter 2: Atomic Structure',
                topics: [
                  {
                    id: 'chemistry-9-c2-t1',
                    title: '2.1 Subatomic Particles and Valency',
                    duration: '14m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Discovery of electrons, protons, and neutrons. Learn how valence electrons determine chemical valency.'
                  },
                  {
                    id: 'chemistry-9-c2-t2',
                    title: '2.2 Isotopes, Isobars, and Isotones',
                    duration: '13m 50s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Definitions, differences, and practical applications of isotopes (e.g., carbon dating, medicine) and isobars.'
                  }
                ]
              },
              {
                id: 'periodic-classification-9',
                title: 'Chapter 3: Periodic Classification of Elements',
                topics: [
                  {
                    id: 'chemistry-9-c3-t1',
                    title: '3.1 Modern Periodic Law, Groups and Periods',
                    duration: '15m 20s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Henry Moseley\'s work, modern periodic law, configuration of groups and periods in the periodic table.'
                  },
                  {
                    id: 'chemistry-9-c3-t2',
                    title: '3.2 Recurring Trends in Periodic Properties',
                    duration: '16m 45s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Trends in atomic radius, ionic radius, ionization energy, electron affinity, and electronegativity.'
                  }
                ]
              },
              {
                id: 'chemical-bonding-9',
                title: 'Chapter 4: Chemical Bonding',
                topics: [
                  {
                    id: 'chemistry-9-c4-t1',
                    title: '4.1 Ionic and Covalent Chemical Bonds',
                    duration: '16m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Octet rule, transfer of electrons in ionic bonds, sharing of electrons in covalent bonds with Lewis dot structures.'
                  },
                  {
                    id: 'chemistry-9-c4-t2',
                    title: '4.2 Coordinate Covalent Bonding',
                    duration: '13m 40s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Understand coordinate covalent bonds, where one atom contributes both sharing electrons, with examples like ammonium ion.'
                  }
                ]
              },
              {
                id: 'acids-bases-salts-9',
                title: 'Chapter 5: Acids, Bases and Salts',
                topics: [
                  {
                    id: 'chemistry-9-c5-t1',
                    title: '5.1 Properties of Acids/Bases and pH Scale',
                    duration: '18m 10s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Physical/chemical properties of acids and bases, indicators, pH scale definition, and its importance.'
                  },
                  {
                    id: 'chemistry-9-c5-t2',
                    title: '5.2 Preparation and Types of Salts',
                    duration: '14m 20s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Neutralization reactions, preparation of common salts, and their properties and household/industrial uses.'
                  }
                ]
              },
              {
                id: 'carbon-compounds-9',
                title: 'Chapter 6: Carbon and its Compounds',
                topics: [
                  {
                    id: 'chemistry-9-c6-t1',
                    title: '6.1 Allotropic Forms of Carbon & Hydrocarbons',
                    duration: '17m 30s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Allotropic forms of carbon (crystalline/amorphous), saturated and unsaturated hydrocarbons.'
                  },
                  {
                    id: 'chemistry-9-c6-t2',
                    title: '6.2 Commercial Plastics and Polymers',
                    duration: '13m 15s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Commercial plastics, resin codes, environmental impact of plastic pollution, and biodegradable alternatives.'
                  }
                ]
              },
              {
                id: 'applied-chemistry-9',
                title: 'Chapter 7: Applied Chemistry',
                topics: [
                  {
                    id: 'chemistry-9-c7-t1',
                    title: '7.1 Applied Chemistry: Dyes and Fertilisers',
                    duration: '14m 50s',
                    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                    content: 'Applied chemistry in agricultural fertilizers, chemical composition of dyes, and cosmetics.'
                  },
                  {
                    id: 'chemistry-9-c7-t2',
                    title: '7.2 Nanotechnology and Advanced Materials',
                    duration: '15m 10s',
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    content: 'Introduction to nanotechnology, synthesis, and applications in medicine and engineering.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const initialQuizzes: Quiz[] = [
  {
    id: 'matrices-12-q1',
    title: 'Matrices and Determinants Quiz',
    subjectId: 'maths-12',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        question: 'If A is a square matrix of order 3 and |A| = 5, what is the value of |adj A|?',
        options: ['5', '25', '125', '1'],
        correctAnswerIndex: 1,
        explanation: 'For any square matrix A of order n, |adj A| = |A|^(n-1). Since n = 3 and |A| = 5, |adj A| = 5^(3-1) = 25.'
      },
      {
        id: 'q2',
        question: 'Which method is used for solving a system of linear equations using determinants?',
        options: ['Gaussian Elimination', 'Cramer\'s Rule', 'Matrix Inversion', 'Euler\'s Method'],
        correctAnswerIndex: 1,
        explanation: 'Cramer\'s rule is a method for solving systems of linear equations using determinants.'
      }
    ]
  }
];

const initialAssignments: Assignment[] = [
  {
    id: 'assign-maths-12-1',
    title: 'Solving Systems of Linear Equations by Cramer\'s Rule',
    subjectId: 'maths-12',
    subjectTitle: 'Mathematics',
    deadline: '2026-06-18',
    points: 100,
    description: 'Solve the systems of equations using Cramer\'s rule, Matrix inversion method, and Gaussian elimination. Show step-by-step calculations and submit a PDF file.',
    status: 'Graded',
    submissionFile: 'cramer_proof.pdf',
    grade: 'A+ (98/100)',
    feedback: 'Fantastic step-by-step application of Gaussian elimination and Cramer\'s rule. Well structured.'
  },
  {
    id: 'assign-chem-12-1',
    title: 'Ellingham Diagram & Ores Leaching Exercises',
    subjectId: 'chemistry-12',
    subjectTitle: 'Chemistry',
    deadline: '2026-06-20',
    points: 100,
    description: 'Explain the thermodynamic principles of metallurgical reduction using the Ellingham diagram. Solve the chemical equations representing gold leaching and copper roasting.',
    status: 'Pending',
  },
  {
    id: 'assign-maths-11-1',
    title: 'Cartesian Products & Relations Proof Sheet',
    subjectId: 'maths-11',
    subjectTitle: 'Mathematics',
    deadline: '2026-06-19',
    points: 100,
    description: 'Prove the distributive properties of Cartesian products over union and intersection. Solve the relations equivalence exercises.',
    status: 'Pending'
  },
  {
    id: 'assign-chem-11-1',
    title: 'Stoichiometry & Redox Reaction Balancing',
    subjectId: 'chemistry-11',
    subjectTitle: 'Chemistry',
    deadline: '2026-06-22',
    points: 100,
    description: 'Balance the given redox reactions in both acidic and basic media using the ion-electron method. Compute empirical and molecular formulas from percentage compositions.',
    status: 'Pending'
  },
  {
    id: 'assign-maths-10-1',
    title: 'Composition of Functions & Mapping Problems',
    subjectId: 'maths-10',
    subjectTitle: 'Mathematics',
    deadline: '2026-06-19',
    points: 100,
    description: 'Find the composition of given functions f(g(x)) and g(f(x)) and determine if they are one-to-one or onto mappings.',
    status: 'Pending'
  },
  {
    id: 'assign-chem-10-1',
    title: 'Mole Concept & Relative Molecular Mass Exercises',
    subjectId: 'chemistry-10',
    subjectTitle: 'Chemistry',
    deadline: '2026-06-22',
    points: 100,
    description: 'Calculate the number of moles, molecules, and atoms present in the given mass of elements and compounds. Evaluate the relative molecular mass of compounds.',
    status: 'Pending'
  },
  {
    id: 'assign-maths-9-1',
    title: 'Set Language & Venn Diagram Operations',
    subjectId: 'maths-9',
    subjectTitle: 'Mathematics',
    deadline: '2026-06-19',
    points: 100,
    description: 'Represent set operations (Union, Intersection, Complement) using Venn diagrams. Verify De Morgan\'s laws using numerical sets.',
    status: 'Pending'
  },
  {
    id: 'assign-chem-9-1',
    title: 'States of Matter & Latent Heat Calculations',
    subjectId: 'chemistry-9',
    subjectTitle: 'Chemistry',
    deadline: '2026-06-22',
    points: 100,
    description: 'Differentiate between solid, liquid, and gas states based on kinetic theory. Calculate latent heat required for phase transitions of water.',
    status: 'Pending'
  }
];

const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Assignment Graded',
    message: 'Your Chemistry assignment "Ostwald\'s Dilution Law" has been graded by Prof. Vineet Aggarwal: A+ (96/100).',
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
    title: 'Assignment Due',
    message: 'Your Mathematics assignment on "Cramer\'s Rule" is due tomorrow at 11:59 PM.',
    time: '4 hours ago',
    type: 'alert',
    read: false
  }
];

const initialProfile: UserProfile = {
  name: 'Prathamesh Sharma',
  username: 'prathamesh',
  password: 'password123',
  email: 'prathamesh@eduverse.in',
  role: 'student',
  selectedBoardId: 'tnsb',
  selectedClassId: 'class-12',
  age: '17',
  location: 'Chennai, Tamil Nadu',
  optedSubjectId: 'maths-12',
  xp: 4250,
  level: 4,
  coins: 350,
  streak: 5,
  achievements: [
    { id: 'ach-1', title: 'Daily Devotee', description: 'Maintained a 5-day study streak', icon: '🔥', unlockedAt: '2026-06-10' },
    { id: 'ach-2', title: 'Quiz Whiz', description: 'Scored 100% on a Chemistry Quiz', icon: '💡', unlockedAt: '2026-06-08' },
    { id: 'ach-3', title: 'Early Bird', description: 'Completed a lecture before 7 AM', icon: '🌅', unlockedAt: '2026-06-05' }
  ],
  certificates: [
    { id: 'cert-1', title: 'Matrices & Determinants Foundations Mastery', issuer: 'EduVerse Academy', date: '2026-06-02', grade: 'Outstanding (A+)' }
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
      topicId: 'matrices-determinants-12-t1',
      topicTitle: '1.1 Adjoint, Inverse and Rank of a Matrix',
      chapterTitle: 'Chapter 1: Applications of Matrices and Determinants',
      subjectTitle: 'Mathematics',
      timestamp: '03:45',
      note: 'Critical concept for solving linear systems'
    }
  ],
  profile: initialProfile,
  activeView: 'landing',
  activeSubjectId: 'maths-12',
  activeChapterId: 'matrices-determinants-12',
  activeTopicId: 'matrices-determinants-12-t1',
  activeQuizId: null,
  isDarkMode: false,

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
