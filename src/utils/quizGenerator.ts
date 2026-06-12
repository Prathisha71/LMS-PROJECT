import { Quiz, QuizQuestion } from '../store/useLmsStore';

const questionPool: Record<string, QuizQuestion[]> = {
  // ==========================================
  // CLASS 9 MATHEMATICS
  // ==========================================
  'sets-9': [
    {
      id: 'q-set9-1',
      question: 'Which of the following is a well-defined collection of objects?',
      options: ['A collection of good students in a class', 'A collection of active leaders in a country', 'A collection of all vowels in the English alphabet', 'A collection of beautiful flowers in a garden'],
      correctAnswerIndex: 2,
      explanation: 'A set must be well-defined. "Good", "active", and "beautiful" are subjective and vary from person to person. "Vowels in the English alphabet" is objective and well-defined.'
    },
    {
      id: 'q-set9-2',
      question: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is the union of sets A and B (A ∪ B)?',
      options: ['{3}', '{1, 2, 4, 5}', '{1, 2, 3, 4, 5}', '{}'],
      correctAnswerIndex: 2,
      explanation: 'The union of two sets A and B consists of all elements that belong to A, B, or both. Thus, A ∪ B = {1, 2, 3, 4, 5}.'
    },
    {
      id: 'q-set9-3',
      question: 'What is the cardinality of the empty set ∅?',
      options: ['0', '1', 'undefined', 'infinite'],
      correctAnswerIndex: 0,
      explanation: 'An empty set contains no elements, so its cardinality (the number of elements in the set) is 0.'
    },
    {
      id: 'q-set9-4',
      question: 'If n(A) = 10, n(B) = 15, and n(A ∩ B) = 3, find n(A ∪ B):',
      options: ['22', '28', '25', '12'],
      correctAnswerIndex: 0,
      explanation: 'Using the formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B), we get 10 + 15 - 3 = 22.'
    },
    {
      id: 'q-set9-5',
      question: 'Which of the following represents the complement of a set A relative to universal set U?',
      options: ['A\' = U - A', 'A\' = A - U', 'A\' = U ∩ A', 'A\' = U ∪ A'],
      correctAnswerIndex: 0,
      explanation: 'The complement of A (A\') consists of all elements in the universal set U that do not belong to A, which is U - A.'
    }
  ],
  'real-numbers-9': [
    {
      id: 'q-real9-1',
      question: 'Which of the following is an irrational number?',
      options: ['22/7', '3.14', '√2', '0.5'],
      correctAnswerIndex: 2,
      explanation: '√2 cannot be expressed as a simple fraction p/q where p and q are integers, so it is an irrational number.'
    },
    {
      id: 'q-real9-2',
      question: 'What is the rationalizing factor of the surd 5 - √3?',
      options: ['5 + √3', '5 - √3', '√3', '25'],
      correctAnswerIndex: 0,
      explanation: 'The rationalizing factor of a - √b is a + √b because (a - √b)(a + √b) = a^2 - b, which is a rational number.'
    },
    {
      id: 'q-real9-3',
      question: 'Express 0.333... in p/q form:',
      options: ['3/10', '1/3', '33/100', '3/100'],
      correctAnswerIndex: 1,
      explanation: 'Let x = 0.333... -> 10x = 3.333... -> 9x = 3 -> x = 3/9 = 1/3.'
    },
    {
      id: 'q-real9-4',
      question: 'What is the value of 64^(1/3)?',
      options: ['4', '8', '2', '16'],
      correctAnswerIndex: 0,
      explanation: '64 is 4^3 (4 * 4 * 4). Thus, (4^3)^(1/3) = 4.'
    },
    {
      id: 'q-real9-5',
      question: 'Representing a number in scientific notation takes the form a × 10^n. What are the bounds for a?',
      options: ['0 < a < 10', '1 ≤ a < 10', '1 < a ≤ 10', '0 ≤ a ≤ 1'],
      correctAnswerIndex: 1,
      explanation: 'In scientific notation, the coefficient a must satisfy the inequality 1 ≤ a < 10.'
    }
  ],
  'algebra-9': [
    {
      id: 'q-alg9-1',
      question: 'What is the degree of the polynomial p(x) = 2x^3 - 4x^5 + 7x - 1?',
      options: ['3', '5', '7', '1'],
      correctAnswerIndex: 1,
      explanation: 'The degree of a polynomial is the highest power of x. In this polynomial, the highest power of x is 5.'
    },
    {
      id: 'q-alg9-2',
      question: 'If x - 1 is a factor of p(x) = x^2 + x + k, what is the value of k?',
      options: ['-2', '2', '1', '-1'],
      correctAnswerIndex: 0,
      explanation: 'By the Factor Theorem, if x - 1 is a factor, then p(1) = 0. So 1^2 + 1 + k = 0 -> 2 + k = 0 -> k = -2.'
    },
    {
      id: 'q-alg9-3',
      question: 'Which of the following is the correct expansion of (x + y)^3?',
      options: ['x^3 + y^3 + 3xy(x + y)', 'x^3 + y^3', 'x^3 + y^3 + 3xy', 'x^3 - y^3 - 3xy(x - y)'],
      correctAnswerIndex: 0,
      explanation: 'The algebraic identity is (x + y)^3 = x^3 + y^3 + 3x^2y + 3xy^2 = x^3 + y^3 + 3xy(x + y).'
    },
    {
      id: 'q-alg9-4',
      question: 'By the remainder theorem, when p(x) is divided by (x - a), the remainder is:',
      options: ['p(-a)', 'p(a)', 'p(0)', 'p(x)'],
      correctAnswerIndex: 1,
      explanation: 'The Remainder Theorem states that if a polynomial p(x) is divided by x - a, the remainder is p(a).'
    },
    {
      id: 'q-alg9-5',
      question: 'Factorize x^2 - 5x + 6:',
      options: ['(x - 2)(x - 3)', '(x + 2)(x + 3)', '(x - 1)(x - 6)', '(x + 1)(x - 6)'],
      correctAnswerIndex: 0,
      explanation: 'x^2 - 5x + 6 = x^2 - 2x - 3x + 6 = x(x - 2) - 3(x - 2) = (x - 2)(x - 3).'
    }
  ],
  'geometry-9': [
    {
      id: 'q-geom9-1',
      question: 'A line segment joining any two points on a circle is called a:',
      options: ['Radius', 'Tangent', 'Chord', 'Secant'],
      correctAnswerIndex: 2,
      explanation: 'A chord is a straight line segment whose endpoints both lie on the circle.'
    },
    {
      id: 'q-geom9-2',
      question: 'The sum of all interior angles of a pentagon is:',
      options: ['180°', '360°', '540°', '720°'],
      correctAnswerIndex: 2,
      explanation: 'Using the formula (n - 2) * 180° for n = 5, we get (5 - 2) * 180° = 3 * 180° = 540°.'
    },
    {
      id: 'q-geom9-3',
      question: 'The point where all three altitudes of a triangle meet is called the:',
      options: ['Orthocentre', 'Centroid', 'Circumcentre', 'Incentre'],
      correctAnswerIndex: 0,
      explanation: 'The orthocentre is the point of intersection of the three altitudes of a triangle.'
    },
    {
      id: 'q-geom9-4',
      question: 'If a quadrilateral has opposite sides parallel and equal, it is called a:',
      options: ['Trapezium', 'Kite', 'Parallelogram', 'None of these'],
      correctAnswerIndex: 2,
      explanation: 'A parallelogram is a simple quadrilateral with two pairs of parallel and equal opposite sides.'
    },
    {
      id: 'q-geom9-5',
      question: 'The centroid of a triangle divides each median in the ratio:',
      options: ['1:1', '2:1', '3:1', '1:2'],
      correctAnswerIndex: 1,
      explanation: 'The centroid of a triangle divides each median internally in the ratio 2:1 from the vertex.'
    }
  ],
  'coordinate-geometry-9': [
    {
      id: 'q-coord9-1',
      question: 'Find the distance between the points A(2, 3) and B(5, 7):',
      options: ['5 units', '7 units', '3 units', '25 units'],
      correctAnswerIndex: 0,
      explanation: 'Distance = √((5-2)^2 + (7-3)^2) = √(3^2 + 4^2) = √(9+16) = √25 = 5.'
    },
    {
      id: 'q-coord9-2',
      question: 'A point whose abscissa is negative and ordinate is positive lies in which quadrant?',
      options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      correctAnswerIndex: 1,
      explanation: 'In Quadrant II, the x-coordinate (abscissa) is negative and the y-coordinate (ordinate) is positive.'
    },
    {
      id: 'q-coord9-3',
      question: 'The coordinates of the origin are:',
      options: ['(1, 1)', '(0, 0)', '(x, y)', '(0, 1)'],
      correctAnswerIndex: 1,
      explanation: 'The origin is the intersection of the x-axis and y-axis, where coordinates are (0, 0).'
    },
    {
      id: 'q-coord9-4',
      question: 'Find the midpoint of the line segment joining (1, -3) and (5, 7):',
      options: ['(3, 2)', '(6, 4)', '(2, 3)', '(3, 5)'],
      correctAnswerIndex: 0,
      explanation: 'Midpoint = ((1+5)/2, (-3+7)/2) = (6/2, 4/2) = (3, 2).'
    },
    {
      id: 'q-coord9-5',
      question: 'What is the y-coordinate of any point lying on the x-axis?',
      options: ['0', '1', 'undefined', 'varies'],
      correctAnswerIndex: 0,
      explanation: 'Every point on the x-axis has a y-coordinate (ordinate) equal to 0.'
    }
  ],
  'trigonometry-9': [
    {
      id: 'q-trig9-1',
      question: 'In a right-angled triangle, the ratio of the opposite side to the hypotenuse is called:',
      options: ['Cosine', 'Sine', 'Tangent', 'Secant'],
      correctAnswerIndex: 1,
      explanation: 'The sine ratio (sin θ) is defined as opposite side / hypotenuse.'
    },
    {
      id: 'q-trig9-2',
      question: 'What is the value of cos(60°)?',
      options: ['1/2', '√3/2', '1', '1/√2'],
      correctAnswerIndex: 0,
      explanation: 'The exact value of cos(60°) is 1/2.'
    },
    {
      id: 'q-trig9-3',
      question: 'If tan(θ) = 1, what is the value of θ (where 0° ≤ θ ≤ 90°)?',
      options: ['30°', '45°', '60°', '90°'],
      correctAnswerIndex: 1,
      explanation: 'Since tan(45°) = 1, the angle θ is 45°.'
    },
    {
      id: 'q-trig9-4',
      question: 'What is the value of cosec(θ) when sin(θ) = 4/5?',
      options: ['5/4', '3/5', '3/4', '1/5'],
      correctAnswerIndex: 0,
      explanation: 'cosec(θ) is the reciprocal of sin(θ). So if sin(θ) = 4/5, cosec(θ) = 5/4.'
    },
    {
      id: 'q-trig9-5',
      question: 'The value of sin(90° - θ) is equal to:',
      options: ['cos(θ)', 'sin(θ)', 'tan(θ)', '-cos(θ)'],
      correctAnswerIndex: 0,
      explanation: 'By the complementary angle formula, sin(90° - θ) = cos(θ).'
    }
  ],
  'mensuration-9': [
    {
      id: 'q-mens9-1',
      question: 'Heron\'s Formula for the area of a triangle is given by Area = √[s(s-a)(s-b)(s-c)]. What is s?',
      options: ['Semi-perimeter = (a+b+c)/2', 'Perimeter = a+b+c', 'Area / 2', 'Height / 2'],
      correctAnswerIndex: 0,
      explanation: 'In Heron\'s formula, s stands for the semi-perimeter of the triangle, calculated as (a + b + c)/2.'
    },
    {
      id: 'q-mens9-2',
      question: 'Calculate the volume of a cube of edge length 3 cm:',
      options: ['9 cubic cm', '27 cubic cm', '18 cubic cm', '36 cubic cm'],
      correctAnswerIndex: 1,
      explanation: 'Volume of a cube = a^3. For a = 3, Volume = 3^3 = 27 cm³.'
    },
    {
      id: 'q-mens9-3',
      question: 'The total surface area of a cuboid of dimensions 2 cm × 3 cm × 4 cm is:',
      options: ['24 sq.cm', '52 sq.cm', '48 sq.cm', '12 sq.cm'],
      correctAnswerIndex: 1,
      explanation: 'TSA = 2(lw + wh + hl) = 2(2*3 + 3*4 + 4*2) = 2(6 + 12 + 8) = 2(6 + 12 + 8) = 52 cm².'
    },
    {
      id: 'q-mens9-4',
      question: 'Find the area of a triangle with sides 9 cm, 12 cm, and 15 cm:',
      options: ['54 sq.cm', '108 sq.cm', '27 sq.cm', '60 sq.cm'],
      correctAnswerIndex: 0,
      explanation: 'This is a right-angled triangle since 9^2 + 12^2 = 15^2 (81 + 144 = 225). Area = 1/2 * base * height = 1/2 * 9 * 12 = 54 cm².'
    },
    {
      id: 'q-mens9-5',
      question: 'What is the lateral surface area of a cube of edge length 5 cm?',
      options: ['100 sq.cm', '150 sq.cm', '125 sq.cm', '50 sq.cm'],
      correctAnswerIndex: 0,
      explanation: 'LSA of a cube = 4a^2. For a = 5, LSA = 4 * 25 = 100 cm².'
    }
  ],
  'statistics-9': [
    {
      id: 'q-stat9-1',
      question: 'The arithmetic mean of 5, 8, 10, 12, 15 is:',
      options: ['10', '11', '12', '9'],
      correctAnswerIndex: 1,
      explanation: 'Mean = (5 + 8 + 10 + 12 + 15) / 5 = 50 / 5 = 11.'
    },
    {
      id: 'q-stat9-2',
      question: 'What is the median of the data: 24, 21, 30, 27, 22?',
      options: ['22', '24', '27', '21'],
      correctAnswerIndex: 1,
      explanation: 'Arrange in ascending order: 21, 22, 24, 27, 30. The middle value is 24.'
    },
    {
      id: 'q-stat9-3',
      question: 'The mode of the following data: 2, 3, 2, 5, 2, 6, 5, 2, 3 is:',
      options: ['2', '3', '5', '6'],
      correctAnswerIndex: 0,
      explanation: 'The mode is the value that occurs most frequently. Here, 2 occurs 4 times, which is the highest.'
    },
    {
      id: 'q-stat9-4',
      question: 'Which of the following is a measure of central tendency?',
      options: ['Mean', 'Median', 'Mode', 'All of the above'],
      correctAnswerIndex: 3,
      explanation: 'Mean, Median, and Mode are all standard measures of central tendency.'
    },
    {
      id: 'q-stat9-5',
      question: 'If the range of a data is 15 and the minimum value is 8, find the maximum value:',
      options: ['23', '7', '15', '18'],
      correctAnswerIndex: 0,
      explanation: 'Range = Maximum - Minimum -> 15 = Maximum - 8 -> Maximum = 15 + 8 = 23.'
    }
  ],
  'probability-9': [
    {
      id: 'q-prob9-1',
      question: 'The probability of a sure event is:',
      options: ['0', '1', '0.5', 'any positive number'],
      correctAnswerIndex: 1,
      explanation: 'A sure event is certain to happen, so its probability is exactly 1.'
    },
    {
      id: 'q-prob9-2',
      question: 'If P(E) = 0.82, find P(not E):',
      options: ['0.18', '0.82', '0.00', '1.00'],
      correctAnswerIndex: 0,
      explanation: 'P(not E) = 1 - P(E) = 1 - 0.82 = 0.18.'
    },
    {
      id: 'q-prob9-3',
      question: 'A card is drawn from a well-shuffled pack of 52 cards. What is the probability of getting a king?',
      options: ['1/13', '1/52', '4/13', '1/4'],
      correctAnswerIndex: 0,
      explanation: 'There are 4 kings in a deck of 52. Probability = 4/52 = 1/13.'
    },
    {
      id: 'q-prob9-4',
      question: 'Two coins are tossed simultaneously. What is the probability of getting at least one tail?',
      options: ['1/4', '1/2', '3/4', '1'],
      correctAnswerIndex: 2,
      explanation: 'Sample space: {HH, HT, TH, TT}. Outcomes with at least one tail: {HT, TH, TT} (3 outcomes). P = 3/4.'
    },
    {
      id: 'q-prob9-5',
      question: 'Which of the following value cannot be a probability of an event?',
      options: ['0.001', '1.05', '0.99', '0.5'],
      correctAnswerIndex: 1,
      explanation: 'Probability of any event must lie between 0 and 1. 1.05 is greater than 1, so it cannot be a probability.'
    }
  ],

  // ==========================================
  // CLASS 9 CHEMISTRY
  // ==========================================
  'matter-around-us-9': [
    {
      id: 'q-ch9c1-1',
      question: 'Which of the following is a pure substance?',
      options: ['Air', 'Salt water', 'Copper', 'Milk'],
      correctAnswerIndex: 2,
      explanation: 'Copper is an element, representing a pure chemical substance. Air, salt water, and milk are mixtures.'
    },
    {
      id: 'q-ch9c1-2',
      question: 'The process used to separate sand and water is:',
      options: ['Filtration', 'Sublimation', 'Distillation', 'Centrifugation'],
      correctAnswerIndex: 0,
      explanation: 'Sand is insoluble and denser than water, making filtration the most direct method to separate it.'
    },
    {
      id: 'q-ch9c1-3',
      question: 'Which separation technique separates components based on differential migration through a stationary phase?',
      options: ['Chromatography', 'Centrifugation', 'Crystallization', 'Fractional distillation'],
      correctAnswerIndex: 0,
      explanation: 'Chromatography separates mixtures based on differences in their solubility and adsorption on a stationary phase.'
    },
    {
      id: 'q-ch9c1-4',
      question: 'A mixture of ammonium chloride and salt can be separated by:',
      options: ['Sublimation', 'Evaporation', 'Filtration', 'Magnetic separation'],
      correctAnswerIndex: 0,
      explanation: 'Ammonium chloride sublimes (converts directly from solid to gas) upon heating, leaving salt behind.'
    },
    {
      id: 'q-ch9c1-5',
      question: 'Which of the following is a heterogeneous mixture?',
      options: ['Chalk in water', 'Sugar solution', 'Brass', 'Alcohol and water'],
      correctAnswerIndex: 0,
      explanation: 'Chalk does not dissolve in water, forming a suspension with distinct visible boundaries, which is heterogeneous.'
    }
  ],
  'atomic-structure-9': [
    {
      id: 'q-ch9c2-1',
      question: 'The subatomic particle with positive charge is:',
      options: ['Proton', 'Electron', 'Neutron', 'Positron'],
      correctAnswerIndex: 0,
      explanation: 'Protons carry a positive electrical charge, electrons carry negative, and neutrons carry no charge.'
    },
    {
      id: 'q-ch9c2-2',
      question: 'Who discovered the neutron?',
      options: ['James Chadwick', 'J.J. Thomson', 'E. Rutherford', 'Niels Bohr'],
      correctAnswerIndex: 0,
      explanation: 'James Chadwick discovered the neutral subatomic particle, the neutron, in 1932.'
    },
    {
      id: 'q-ch9c2-3',
      question: 'What are isotopes?',
      options: ['Atoms with same atomic number but different mass numbers', 'Atoms with same mass number but different atomic numbers', 'Atoms with same number of neutrons', 'Atoms with same chemical reactivity'],
      correctAnswerIndex: 0,
      explanation: 'Isotopes have the same number of protons (same atomic number) but different numbers of neutrons (different mass numbers).'
    },
    {
      id: 'q-ch9c2-4',
      question: 'The valency of an element with atomic number 8 (Oxygen) is:',
      options: ['2', '6', '8', '4'],
      correctAnswerIndex: 0,
      explanation: 'Oxygen has configuration (2, 6). It needs 2 electrons to complete its octet, so its valency is 2.'
    },
    {
      id: 'q-ch9c2-5',
      question: 'The maximum electron capacity of the L shell is:',
      options: ['8', '2', '18', '32'],
      correctAnswerIndex: 0,
      explanation: 'Max capacity is 2n^2. For L shell (n=2), capacity = 2 * (2)^2 = 8.'
    }
  ],
  'periodic-classification-9': [
    {
      id: 'q-ch9c3-1',
      question: 'The modern periodic law states that properties of elements are periodic functions of their:',
      options: ['Atomic number', 'Atomic mass', 'Mass number', 'Valence electrons'],
      correctAnswerIndex: 0,
      explanation: 'Henry Moseley proposed modern periodic law based on atomic number.'
    },
    {
      id: 'q-ch9c3-2',
      question: 'How many periods and groups are there in the Modern Periodic Table?',
      options: ['7 periods, 18 groups', '18 periods, 7 groups', '8 periods, 18 groups', '7 periods, 8 groups'],
      correctAnswerIndex: 0,
      explanation: 'The Modern Periodic Table consists of 7 horizontal rows (periods) and 18 vertical columns (groups).'
    },
    {
      id: 'q-ch9c3-3',
      question: 'Which of the following groups represents Halogens?',
      options: ['Group 17', 'Group 18', 'Group 1', 'Group 2'],
      correctAnswerIndex: 0,
      explanation: 'Group 17 elements (F, Cl, Br, I, At) are highly reactive non-metals known as halogens.'
    },
    {
      id: 'q-ch9c3-4',
      question: 'As we move down a group, the atomic size of elements generally:',
      options: ['Increases', 'Decreases', 'Remains the same', 'Varies randomly'],
      correctAnswerIndex: 0,
      explanation: 'Moving down a group adds new electron shells, increasing the distance between the nucleus and valence shell, so size increases.'
    },
    {
      id: 'q-ch9c3-5',
      question: 'Which element has the highest electronegativity?',
      options: ['Fluorine (F)', 'Oxygen (O)', 'Chlorine (Cl)', 'Carbon (C)'],
      correctAnswerIndex: 0,
      explanation: 'Fluorine is the most electronegative element on the Pauling scale, with a value of 4.0.'
    }
  ],
  'chemical-bonding-9': [
    {
      id: 'q-ch9c4-1',
      question: 'An ionic bond is formed by:',
      options: ['Transfer of electrons', 'Sharing of electrons', 'Donation of a lone pair', 'Metallic pool of electrons'],
      correctAnswerIndex: 0,
      explanation: 'Ionic bonding involves the complete transfer of one or more electrons from a metal atom to a non-metal atom.'
    },
    {
      id: 'q-ch9c4-2',
      question: 'What type of bond is present in a water molecule (H2O)?',
      options: ['Covalent bond', 'Ionic bond', 'Coordinate bond', 'Metallic bond'],
      correctAnswerIndex: 0,
      explanation: 'Water is formed by the sharing of electron pairs between hydrogen and oxygen atoms, which is covalent bonding.'
    },
    {
      id: 'q-ch9c4-3',
      question: 'In a coordinate covalent bond, the shared pair of electrons is:',
      options: ['Contributed by only one of the bonded atoms', 'Contributed equally by both atoms', 'Transferred completely', 'Delocalized'],
      correctAnswerIndex: 0,
      explanation: 'In coordinate bonding, one atom (donor) provides both electrons of the shared pair to the acceptor atom.'
    },
    {
      id: 'q-ch9c4-4',
      question: 'Which of the following compounds has ionic bonding?',
      options: ['NaCl', 'CO2', 'CH4', 'H2O'],
      correctAnswerIndex: 0,
      explanation: 'Sodium chloride (NaCl) is formed by the transfer of an electron from sodium to chlorine, resulting in an ionic crystal.'
    },
    {
      id: 'q-ch9c4-5',
      question: 'The octet rule states that atoms tend to form bonds to achieve how many valence electrons?',
      options: ['8', '2', '6', '10'],
      correctAnswerIndex: 0,
      explanation: 'The octet rule states that atoms are most stable when their outer shell contains 8 electrons, resembling a noble gas configuration.'
    }
  ],
  'acids-bases-salts-9': [
    {
      id: 'q-ch9c5-1',
      question: 'According to Arrhenius theory, an acid is a substance that releases which ions in water?',
      options: ['H+ ions', 'OH- ions', 'Na+ ions', 'Cl- ions'],
      correctAnswerIndex: 0,
      explanation: 'Arrhenius defined acids as substances that dissociate in water to produce hydrogen ions (H+).'
    },
    {
      id: 'q-ch9c5-2',
      question: 'What is the pH of a neutral solution?',
      options: ['7', '0', '14', '1'],
      correctAnswerIndex: 0,
      explanation: 'Neutral solutions (like pure water) have a pH of exactly 7 at 25°C.'
    },
    {
      id: 'q-ch9c5-3',
      question: 'Which indicator turns pink in basic solutions?',
      options: ['Phenolphthalein', 'Methyl orange', 'Litmus paper', 'Turmeric'],
      correctAnswerIndex: 0,
      explanation: 'Phenolphthalein is colorless in acidic and neutral solutions but turns pink/magenta in bases.'
    },
    {
      id: 'q-ch9c5-4',
      question: 'What salt is formed when hydrochloric acid reacts with sodium hydroxide?',
      options: ['Sodium chloride (NaCl)', 'Sodium sulphate', 'Calcium chloride', 'Ammonium chloride'],
      correctAnswerIndex: 0,
      explanation: 'Neutralization of HCl and NaOH produces water and sodium chloride (common table salt).'
    },
    {
      id: 'q-ch9c5-5',
      question: 'Which of the following is a weak acid?',
      options: ['Acetic acid (CH3COOH)', 'Hydrochloric acid (HCl)', 'Sulphuric acid (H2SO4)', 'Nitric acid (HNO3)'],
      correctAnswerIndex: 0,
      explanation: 'Acetic acid only partially dissociates in water, making it a weak acid. HCl, H2SO4, and HNO3 are strong acids.'
    }
  ],
  'carbon-compounds-9': [
    {
      id: 'q-ch9c6-1',
      question: 'Which of the following is a crystalline allotrope of carbon?',
      options: ['Diamond', 'Coal', 'Charcoal', 'Coke'],
      correctAnswerIndex: 0,
      explanation: 'Diamond, graphite, and fullerenes are crystalline allotropic forms of carbon. Coal and charcoal are amorphous.'
    },
    {
      id: 'q-ch9c6-2',
      question: 'Saturated hydrocarbons containing only single bonds are called:',
      options: ['Alkanes', 'Alkenes', 'Alkynes', 'Aromatics'],
      correctAnswerIndex: 0,
      explanation: 'Alkanes are saturated open-chain hydrocarbons with carbon-carbon single bonds (general formula CnH2n+2).'
    },
    {
      id: 'q-ch9c6-3',
      question: 'The property of self-linking of carbon atoms to form long chains is called:',
      options: ['Catenation', 'Isomerism', 'Allotropy', 'Tetravalency'],
      correctAnswerIndex: 0,
      explanation: 'Catenation is the unique ability of carbon atoms to form stable covalent bonds with other carbon atoms to form long chains or rings.'
    },
    {
      id: 'q-ch9c6-4',
      question: 'Which of the following is a natural polymer?',
      options: ['Starch', 'Nylon', 'Polythene', 'PVC'],
      correctAnswerIndex: 0,
      explanation: 'Starch and cellulose are natural polymers found in plants. Nylon, polythene, and PVC are synthetic.'
    },
    {
      id: 'q-ch9c6-5',
      question: 'What is the main component of natural gas?',
      options: ['Methane', 'Ethane', 'Propane', 'Butane'],
      correctAnswerIndex: 0,
      explanation: 'Natural gas is primarily composed of methane (CH4), usually about 70-90%.'
    }
  ],
  'applied-chemistry-9': [
    {
      id: 'q-ch9c7-1',
      question: 'Which chemical is commonly used as a food preservative?',
      options: ['Sodium benzoate', 'Sodium bicarbonate', 'Calcium carbonate', 'Copper sulphate'],
      correctAnswerIndex: 0,
      explanation: 'Sodium benzoate is widely used as an antimicrobial preservative in acidic foods and beverages.'
    },
    {
      id: 'q-ch9c7-2',
      question: 'Nanoparticles are materials with at least one dimension in the range of:',
      options: ['1 to 100 nm', '100 to 1000 nm', '1 to 100 pm', '1 to 100 μm'],
      correctAnswerIndex: 0,
      explanation: 'Nanotechnology deals with structures sized between 1 and 100 nanometers.'
    },
    {
      id: 'q-ch9c7-3',
      question: 'Which of the following is a nitrogenous fertilizer?',
      options: ['Urea', 'Superphosphate of lime', 'Potassium chloride', 'Gypsum'],
      correctAnswerIndex: 0,
      explanation: 'Urea [CO(NH2)2] is the most common organic nitrogen-rich fertilizer used in agriculture.'
    },
    {
      id: 'q-ch9c7-4',
      question: 'Anesthetics are medicines that cause:',
      options: ['Temporary loss of sensation', 'Reduction in body temperature', 'Destruction of bacteria', 'Cure for malaria'],
      correctAnswerIndex: 0,
      explanation: 'Anesthetics block nerve signals, causing a temporary loss of sensation or awareness during medical operations.'
    },
    {
      id: 'q-ch9c7-5',
      question: 'Dyes are colored substances that are applied to substrates to impart color. They must be:',
      options: ['Resistant to washing and light', 'Soluble in application medium', 'Chemically stable', 'All of the above'],
      correctAnswerIndex: 3,
      explanation: 'A commercial dye must be soluble, chemically stable, and have good fastness properties (wash and light resistance).'
    }
  ],

  // ==========================================
  // CLASS 10 MATHEMATICS
  // ==========================================
  'relations-functions-10': [
    {
      id: 'q-rel10-1',
      question: 'If A = {1, 2} and B = {a, b}, what is the Cartesian product A × B?',
      options: ['{(1,a), (1,b), (2,a), (2,b)}', '{(1,a), (2,b)}', '{(a,1), (b,1), (a,2), (b,2)}', '{1, 2, a, b}'],
      correctAnswerIndex: 0,
      explanation: 'A × B consists of all ordered pairs (x, y) where x ∈ A and y ∈ B. This gives {(1,a), (1,b), (2,a), (2,b)}.'
    },
    {
      id: 'q-rel10-2',
      question: 'A relation f is a function if every element in the domain has:',
      options: ['Unique image in the co-domain', 'At least two images', 'No image in the co-domain', 'Multiple pre-images'],
      correctAnswerIndex: 0,
      explanation: 'By definition, a function maps each element in its domain to a unique element in the co-domain.'
    },
    {
      id: 'q-rel10-3',
      question: 'If f(x) = x^2 and g(x) = x + 1, find the composition f(g(x)):',
      options: ['(x + 1)^2', 'x^2 + 1', 'x^2 + x + 1', 'x^2(x + 1)'],
      correctAnswerIndex: 0,
      explanation: 'f(g(x)) = f(x + 1) = (x + 1)^2.'
    },
    {
      id: 'q-rel10-4',
      question: 'A function f: A -> B is called one-to-one (injective) if:',
      options: ['Distinct elements of A have distinct images in B', 'Multiple elements map to the same image', 'Co-domain equals range', 'None of these'],
      correctAnswerIndex: 0,
      explanation: 'A function is one-to-one if no two different elements in the domain map to the same element in the range.'
    },
    {
      id: 'q-rel10-5',
      question: 'For a function to be bijective, it must be:',
      options: ['Both one-to-one and onto', 'One-to-one but not onto', 'Onto but not one-to-one', 'Neither one-to-one nor onto'],
      correctAnswerIndex: 0,
      explanation: 'A bijective function is a matching that is both injective (one-to-one) and surjective (onto).'
    }
  ],
  'numbers-sequences-10': [
    {
      id: 'q-num10-1',
      question: 'According to Euclid\'s Division Lemma, for integers a and b, there exist unique integers q and r such that a = bq + r. What is the constraint on r?',
      options: ['0 ≤ r < |b|', '0 < r < b', '0 ≤ r ≤ b', '-b < r < b'],
      correctAnswerIndex: 0,
      explanation: 'The remainder r must be non-negative and strictly less than the divisor, so 0 ≤ r < |b|.'
    },
    {
      id: 'q-num10-2',
      question: 'What is the general term (nth term) of an Arithmetic Progression (AP) with first term a and common difference d?',
      options: ['t_n = a + (n - 1)d', 't_n = a + nd', 't_n = ar^(n-1)', 't_n = n/2 * (2a + d)'],
      correctAnswerIndex: 0,
      explanation: 'The nth term of an AP is given by the formula t_n = a + (n - 1)d.'
    },
    {
      id: 'q-num10-3',
      question: 'Find the 10th term of the AP: 2, 7, 12, 17, ...',
      options: ['47', '52', '42', '37'],
      correctAnswerIndex: 0,
      explanation: 'Here a = 2, d = 5. t_10 = a + 9d = 2 + 9(5) = 2 + 45 = 47.'
    },
    {
      id: 'q-num10-4',
      question: 'What is the common ratio (r) of the Geometric Progression (GP): 3, 6, 12, 24, ...?',
      options: ['2', '3', '6', '1.5'],
      correctAnswerIndex: 0,
      explanation: 'The common ratio is found by dividing any term by its preceding term: 6 / 3 = 2.'
    },
    {
      id: 'q-num10-5',
      question: 'Find the sum of the first n natural numbers (1 + 2 + 3 + ... + n):',
      options: ['n(n + 1) / 2', 'n(n - 1) / 2', '[n(n + 1) / 2]^2', 'n^2'],
      correctAnswerIndex: 0,
      explanation: 'The sum of first n natural numbers is given by the formula n(n+1)/2.'
    }
  ],
  'algebra-10': [
    {
      id: 'q-alg10-1',
      question: 'The nature of roots of a quadratic equation ax^2 + bx + c = 0 is determined by the discriminant Δ = b^2 - 4ac. If Δ > 0, the roots are:',
      options: ['Real and unequal', 'Real and equal', 'No real roots (imaginary)', 'Rational and equal'],
      correctAnswerIndex: 0,
      explanation: 'When the discriminant is strictly positive, the quadratic equation has two distinct (unequal) real roots.'
    },
    {
      id: 'q-alg10-2',
      question: 'Find the values of x and y if x + y = 5 and x - y = 1:',
      options: ['x=3, y=2', 'x=4, y=1', 'x=2, y=3', 'x=5, y=0'],
      correctAnswerIndex: 0,
      explanation: 'Adding the equations: 2x = 6 -> x = 3. Substituting x: 3 + y = 5 -> y = 2.'
    },
    {
      id: 'q-alg10-3',
      question: 'If A is a matrix of order 2×3 and B is a matrix of order 3×4, what is the order of the product matrix AB?',
      options: ['2×4', '3×3', '2×3', 'Matrix multiplication is not possible'],
      correctAnswerIndex: 0,
      explanation: 'For matrices A (m×n) and B (n×p), the product AB exists and has dimensions m×p. Thus, 2×4.'
    },
    {
      id: 'q-alg10-4',
      question: 'The product of roots of the quadratic equation x^2 - 5x + 6 = 0 is:',
      options: ['6', '5', '-5', '-6'],
      correctAnswerIndex: 0,
      explanation: 'For x^2 + bx + c = 0, the product of roots is c/a = 6/1 = 6. (Vieta\'s Formulas)'
    },
    {
      id: 'q-alg10-5',
      question: 'What is the sum of roots of the quadratic equation 2x^2 - 8x + 5 = 0?',
      options: ['4', '-4', '2.5', '-2.5'],
      correctAnswerIndex: 0,
      explanation: 'The sum of roots is -b/a = -(-8)/2 = 8/2 = 4.'
    }
  ],
  'geometry-10': [
    {
      id: 'q-geom10-1',
      question: 'Thales Theorem is also known as:',
      options: ['Basic Proportionality Theorem (BPT)', 'Angle Bisector Theorem', 'Pythagoras Theorem', 'Alternate Segment Theorem'],
      correctAnswerIndex: 0,
      explanation: 'Thales Theorem states that a line parallel to one side of a triangle intersects the other two sides proportionally; it is also called BPT.'
    },
    {
      id: 'q-geom10-2',
      question: 'The tangent at any point of a circle is perpendicular to the:',
      options: ['Radius through the point of contact', 'Chord of the circle', 'Secant line', 'Segment line'],
      correctAnswerIndex: 0,
      explanation: 'A fundamental property of circle tangents is that they are perpendicular to the radius drawn to the point of contact.'
    },
    {
      id: 'q-geom10-3',
      question: 'In a right-angled triangle ABC with right angle at B, AC^2 is equal to:',
      options: ['AB^2 + BC^2', 'AB^2 - BC^2', 'AB * BC', 'AB + BC'],
      correctAnswerIndex: 0,
      explanation: 'By Pythagoras Theorem, the square of the hypotenuse AC is equal to the sum of the squares of the perpendicular sides: AB^2 + BC^2.'
    },
    {
      id: 'q-geom10-4',
      question: 'How many tangents can be drawn to a circle from an external point?',
      options: ['2', '1', 'infinite', '0'],
      correctAnswerIndex: 0,
      explanation: 'From any point outside a circle, exactly two distinct tangent lines can be constructed to the circle.'
    },
    {
      id: 'q-geom10-5',
      question: 'According to the Angle Bisector Theorem, the internal bisector of an angle of a triangle divides the opposite side in the ratio of:',
      options: ['The corresponding containing sides', '1:1 always', 'Height to base', 'None of these'],
      correctAnswerIndex: 0,
      explanation: 'The angle bisector divides the opposite side into segments proportional to the adjacent sides.'
    }
  ],
  'coordinate-geometry-10': [
    {
      id: 'q-coord10-1',
      question: 'Find the area of a triangle whose vertices are (0,0), (3,0), and (0,4):',
      options: ['6 sq.units', '12 sq.units', '5 sq.units', '10 sq.units'],
      correctAnswerIndex: 0,
      explanation: 'Using Area = 1/2 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|, we get 1/2 |0 + 3(4-0) + 0| = 12/2 = 6.'
    },
    {
      id: 'q-coord10-2',
      question: 'If two lines are parallel, their slopes m1 and m2 are related as:',
      options: ['m1 = m2', 'm1 * m2 = -1', 'm1 * m2 = 1', 'm1 + m2 = 0'],
      correctAnswerIndex: 0,
      explanation: 'Parallel lines have the same angle of inclination, so their slopes are equal (m1 = m2).'
    },
    {
      id: 'q-coord10-3',
      question: 'If two lines are perpendicular, the product of their slopes m1 and m2 is:',
      options: ['-1', '1', '0', 'undefined'],
      correctAnswerIndex: 0,
      explanation: 'For perpendicular lines, the product of their slopes is always -1 (m1 * m2 = -1).'
    },
    {
      id: 'q-coord10-4',
      question: 'The slope of a line with inclination θ is defined as:',
      options: ['tan θ', 'sin θ', 'cos θ', 'cosec θ'],
      correctAnswerIndex: 0,
      explanation: 'The slope m of a line is the tangent of its angle of inclination θ, m = tan θ.'
    },
    {
      id: 'q-coord10-5',
      question: 'Find the equation of a line passing through the origin with slope 3:',
      options: ['y = 3x', 'y = -3x', '3y = x', 'y = x + 3'],
      correctAnswerIndex: 0,
      explanation: 'Using slope-intercept form y = mx + c. Since it passes through the origin, c = 0, so y = 3x.'
    }
  ],
  'trigonometry-10': [
    {
      id: 'q-trig10-1',
      question: 'Which of the following is correct for 1 + tan^2 θ?',
      options: ['sec^2 θ', 'cosec^2 θ', 'cot^2 θ', 'cos^2 θ'],
      correctAnswerIndex: 0,
      explanation: '1 + tan^2 θ = sec^2 θ is a fundamental Pythagorean trigonometric identity.'
    },
    {
      id: 'q-trig10-2',
      question: 'An observer looks up at an object. The angle formed by the line of sight with the horizontal is called the:',
      options: ['Angle of elevation', 'Angle of depression', 'Reflex angle', 'Obtuse angle'],
      correctAnswerIndex: 0,
      explanation: 'The angle of elevation is the angle between the horizontal line of sight and the line of sight up to an object.'
    },
    {
      id: 'q-trig10-3',
      question: 'An observer on a cliff looks down at a boat. The angle between their horizontal line of sight and the boat is the:',
      options: ['Angle of depression', 'Angle of elevation', 'Acute angle', 'Straight angle'],
      correctAnswerIndex: 0,
      explanation: 'The angle of depression is the angle between the horizontal line of sight and the line of sight down to an object.'
    },
    {
      id: 'q-trig10-4',
      question: 'If the height of a tower and the length of its shadow are equal, the angle of elevation of the sun is:',
      options: ['45°', '30°', '60°', '90°'],
      correctAnswerIndex: 0,
      explanation: 'tan θ = height / shadow. Since height = shadow, tan θ = 1, which means θ = 45°.'
    },
    {
      id: 'q-trig10-5',
      question: 'Simplify (sec θ)(cos θ):',
      options: ['1', 'tan θ', 'sin θ', 'sec^2 θ'],
      correctAnswerIndex: 0,
      explanation: 'Since sec θ = 1/cos θ, their product (sec θ)(cos θ) is 1.'
    }
  ],
  'mensuration-10': [
    {
      id: 'q-mens10-1',
      question: 'What is the curved surface area (CSA) of a cylinder of radius r and height h?',
      options: ['2πrh', 'πr^2h', '2πr(r + h)', 'πrl'],
      correctAnswerIndex: 0,
      explanation: 'The curved surface area of a cylinder is given by the formula 2πrh.'
    },
    {
      id: 'q-mens10-2',
      question: 'The volume of a cone of radius r and height h is what fraction of the volume of a cylinder of same radius and height?',
      options: ['1/3', '1/2', '1/4', '2/3'],
      correctAnswerIndex: 0,
      explanation: 'Volume of cone is 1/3 * πr^2h, which is exactly one-third of the volume of the cylinder (πr^2h).'
    },
    {
      id: 'q-mens10-3',
      question: 'What is the curved surface area of a sphere of radius r?',
      options: ['4πr^2', '2πr^2', '4/3 * πr^3', 'πr^2'],
      correctAnswerIndex: 0,
      explanation: 'The total/curved surface area of a sphere is 4πr^2.'
    },
    {
      id: 'q-mens10-4',
      question: 'A solid cone of radius r and height h is melted and recast into a cylinder of same radius. What is the height of the cylinder?',
      options: ['h / 3', '3h', 'h', 'h / 2'],
      correctAnswerIndex: 0,
      explanation: 'Volume of cone = 1/3 * πr^2 * h. Volume of cylinder = πr^2 * H. Since volumes are equal, H = h / 3.'
    },
    {
      id: 'q-mens10-5',
      question: 'What is the volume of a hemisphere of radius r?',
      options: ['2/3 * π * r^3', '4/3 * π * r^3', '3 * π * r^2', '2 * π * r^2'],
      correctAnswerIndex: 0,
      explanation: 'The volume of a hemisphere is half of a sphere\'s volume: 2/3 * π * r^3.'
    }
  ],
  'statistics-probability-10': [
    {
      id: 'q-statprob10-1',
      question: 'The standard deviation of a set of data is 5. What is the variance?',
      options: ['25', '2.23', '5', '10'],
      correctAnswerIndex: 0,
      explanation: 'Variance is the square of standard deviation, so 5^2 = 25.'
    },
    {
      id: 'q-statprob10-2',
      question: 'If the probability of occurrence of an event A is P(A), then which of the following is correct?',
      options: ['0 ≤ P(A) ≤ 1', 'P(A) > 1', 'P(A) < 0', '-1 ≤ P(A) ≤ 1'],
      correctAnswerIndex: 0,
      explanation: 'The probability of any event must lie between 0 and 1 inclusive.'
    },
    {
      id: 'q-statprob10-3',
      question: 'For two events A and B, the Addition Theorem of Probability states that P(A ∪ B) is equal to:',
      options: ['P(A) + P(B) - P(A ∩ B)', 'P(A) + P(B)', 'P(A) * P(B)', 'P(A) - P(B)'],
      correctAnswerIndex: 0,
      explanation: 'The addition theorem states P(A ∪ B) = P(A) + P(B) - P(A ∩ B).'
    },
    {
      id: 'q-statprob10-4',
      question: 'If the coefficient of variation of a distribution is 60% and standard deviation is 12, find the mean:',
      options: ['20', '5', '7.2', '72'],
      correctAnswerIndex: 0,
      explanation: 'CV = (SD / Mean) * 100 -> 60 = (12 / Mean) * 100 -> Mean = 1200 / 60 = 20.'
    },
    {
      id: 'q-statprob10-5',
      question: 'What is the probability of drawing a red card from a pack of 52 playing cards?',
      options: ['1/2', '1/4', '1/13', '2/13'],
      correctAnswerIndex: 0,
      explanation: 'There are 26 red cards in a deck of 52. Probability = 26/52 = 1/2.'
    }
  ],

  // ==========================================
  // CLASS 10 CHEMISTRY
  // ==========================================
  'atoms-molecules-10': [
    {
      id: 'q-ch10c1-1',
      question: 'The relative molecular mass of water (H2O) is: (Atomic mass: H = 1, O = 16)',
      options: ['18 g/mol', '17 g/mol', '16 g/mol', '10 g/mol'],
      correctAnswerIndex: 0,
      explanation: 'Molecular mass = 2 * (Mass of H) + 1 * (Mass of O) = 2(1) + 16 = 18.'
    },
    {
      id: 'q-ch10c1-2',
      question: 'According to Avogadro\'s law, equal volumes of all gases under same temperature and pressure contain equal number of:',
      options: ['Molecules', 'Atoms', 'Protons', 'Electrons'],
      correctAnswerIndex: 0,
      explanation: 'Avogadro\'s law states that equal volumes of gases contain an equal number of molecules under identical conditions.'
    },
    {
      id: 'q-ch10c1-3',
      question: 'What is the value of Avogadro\'s number?',
      options: ['6.023 × 10^23', '6.023 × 10^-23', '9.11 × 10^-31', '1.6 × 10^-19'],
      correctAnswerIndex: 0,
      explanation: 'Avogadro\'s constant is exactly 6.023 × 10^23 mol⁻¹.'
    },
    {
      id: 'q-ch10c1-4',
      question: 'The atomicity of a helium molecule (He) is:',
      options: ['1', '2', '3', '4'],
      correctAnswerIndex: 0,
      explanation: 'Helium is a noble gas and exists as monoatomic atoms, so its atomicity is 1.'
    },
    {
      id: 'q-ch10c1-5',
      question: 'The relationship between Vapor Density (VD) and Relative Molecular Mass is:',
      options: ['Relative Molecular Mass = 2 × Vapor Density', 'Vapor Density = 2 × Relative Molecular Mass', 'Relative Molecular Mass = Vapor Density', 'None of these'],
      correctAnswerIndex: 0,
      explanation: 'The molecular mass of a gas is twice its vapor density: Mass = 2 * VD.'
    }
  ],
  'periodic-class-10': [
    {
      id: 'q-ch10c2-1',
      question: 'Which of the following is the main ore of Aluminium?',
      options: ['Bauxite (Al2O3 · 2H2O)', 'Hematite', 'Copper pyrites', 'Magnetite'],
      correctAnswerIndex: 0,
      explanation: 'Bauxite is the primary commercial ore used for extracting aluminium.'
    },
    {
      id: 'q-ch10c2-2',
      question: 'The process of coating zinc on iron sheets to prevent rusting is called:',
      options: ['Galvanization', 'Anodizing', 'Alloying', 'Electroplating'],
      correctAnswerIndex: 0,
      explanation: 'Galvanization is the application of a protective zinc coating to steel or iron to prevent rusting.'
    },
    {
      id: 'q-ch10c2-3',
      question: 'Brass is an alloy of:',
      options: ['Copper and Zinc', 'Copper and Tin', 'Iron and Carbon', 'Aluminium and Copper'],
      correctAnswerIndex: 0,
      explanation: 'Brass is a metallic alloy made of copper and zinc.'
    },
    {
      id: 'q-ch10c2-4',
      question: 'Bronze is an alloy of:',
      options: ['Copper and Tin', 'Copper and Zinc', 'Lead and Tin', 'Aluminium and Magnesium'],
      correctAnswerIndex: 0,
      explanation: 'Bronze is primarily an alloy of copper and tin.'
    },
    {
      id: 'q-ch10c2-5',
      question: 'During metallurgy, the rocky impurities associated with ores are called:',
      options: ['Gangue', 'Flux', 'Slag', 'Matrix'],
      correctAnswerIndex: 0,
      explanation: 'The commercially worthless rocky, clayey, or sandy impurities present in an ore are called gangue.'
    }
  ],
  'solutions-10': [
    {
      id: 'q-ch10c3-1',
      question: 'A solution in which no more solute can be dissolved at a given temperature is called:',
      options: ['Saturated solution', 'Unsaturated solution', 'Supersaturated solution', 'Dilute solution'],
      correctAnswerIndex: 0,
      explanation: 'A saturated solution is a solution containing the maximum concentration of a solute dissolved in the solvent.'
    },
    {
      id: 'q-ch10c3-2',
      question: 'What is the solvent in tincture of iodine?',
      options: ['Alcohol', 'Water', 'Iodine', 'Ether'],
      correctAnswerIndex: 0,
      explanation: 'Tincture of iodine is a solution of iodine (solute) in alcohol (solvent).'
    },
    {
      id: 'q-ch10c3-3',
      question: 'Which of the following crystals contains 5 molecules of water of crystallization?',
      options: ['Blue Vitriol (Copper sulphate)', 'Green Vitriol (Iron sulphate)', 'White Vitriol (Zinc sulphate)', 'Epsom salt'],
      correctAnswerIndex: 0,
      explanation: 'Blue vitriol is CuSO4 · 5H2O, which contains 5 molecules of water of crystallization.'
    },
    {
      id: 'q-ch10c3-4',
      question: 'Substances that absorb moisture from the air without dissolving in it are called:',
      options: ['Hygroscopic substances', 'Deliquescent substances', 'Efflorescent substances', 'Anhydrous substances'],
      correctAnswerIndex: 0,
      explanation: 'Hygroscopic substances absorb moisture without undergoing a phase change, unlike deliquescent substances which absorb so much moisture that they dissolve.'
    },
    {
      id: 'q-ch10c3-5',
      question: 'The solubility of a solid solute in liquid solvent generally:',
      options: ['Increases with temperature', 'Decreases with temperature', 'Remains unaffected by temperature', 'Decreases then increases'],
      correctAnswerIndex: 0,
      explanation: 'For most solid substances, solubility increases as the temperature of the liquid solvent increases.'
    }
  ],
  'reaction-types-10': [
    {
      id: 'q-ch10c4-1',
      question: 'A reaction in which two or more reactants combine to form a single product is:',
      options: ['Combination reaction', 'Decomposition reaction', 'Displacement reaction', 'Double displacement'],
      correctAnswerIndex: 0,
      explanation: 'A combination (synthesis) reaction combines multiple substances into a single product: A + B -> AB.'
    },
    {
      id: 'q-ch10c4-2',
      question: 'The reaction between an acid and a base to form salt and water is called:',
      options: ['Neutralization reaction', 'Combustion reaction', 'Redox reaction', 'Precipitation reaction'],
      correctAnswerIndex: 0,
      explanation: 'Neutralization is the chemical reaction between an acid and a base, producing a salt and water.'
    },
    {
      id: 'q-ch10c4-3',
      question: 'Which of the following factors affects the rate of a chemical reaction?',
      options: ['Temperature', 'Concentration of reactants', 'Presence of a catalyst', 'All of the above'],
      correctAnswerIndex: 3,
      explanation: 'Reaction rates are influenced by temperature, concentration, surface area, and catalysts.'
    },
    {
      id: 'q-ch10c4-4',
      question: 'A reversible chemical reaction achieves a state of equilibrium when:',
      options: ['Rate of forward reaction equals rate of backward reaction', 'Reactants are completely converted to products', 'Reaction stops entirely', 'None of the above'],
      correctAnswerIndex: 0,
      explanation: 'Chemical equilibrium is a dynamic state where the rates of forward and backward reactions are equal.'
    },
    {
      id: 'q-ch10c4-5',
      question: 'What is the pH value of a solution with hydrogen ion concentration [H+] = 10^-5 M?',
      options: ['5', '-5', '9', '7'],
      correctAnswerIndex: 0,
      explanation: 'pH = -log10[H+] = -log10[10^-5] = 5.'
    }
  ],
  'carbon-compounds-10': [
    {
      id: 'q-ch10c5-1',
      question: 'Which functional group is present in alcohols?',
      options: ['-OH', '-CHO', '-COOH', '-CO-'],
      correctAnswerIndex: 0,
      explanation: 'Alcohols contain the hydroxyl (-OH) functional group.'
    },
    {
      id: 'q-ch10c5-2',
      question: 'What is the functional group of carboxylic acids?',
      options: ['-COOH', '-CHO', '-OH', '-COOR'],
      correctAnswerIndex: 0,
      explanation: 'Carboxylic acids contain the carboxyl (-COOH) functional group.'
    },
    {
      id: 'q-ch10c5-3',
      question: 'Ethanol (ethyl alcohol) can be manufactured from molasses by the process of:',
      options: ['Fermentation', 'Fractional distillation', 'Esterification', 'Hydrogenation'],
      correctAnswerIndex: 0,
      explanation: 'Fermentation of molasses sugar using yeast enzymes (invertase, zymase) produces ethanol and carbon dioxide.'
    },
    {
      id: 'q-ch10c5-4',
      question: 'A series of organic compounds with same functional group and recurring CH2 difference is called:',
      options: ['Homologous series', 'Isomeric series', 'Allotropic series', 'None of these'],
      correctAnswerIndex: 0,
      explanation: 'A homologous series is a group of organic molecules with the same functional group where each successive member differs by a -CH2- unit.'
    },
    {
      id: 'q-ch10c5-5',
      question: 'The reaction between an alcohol and a carboxylic acid in the presence of acid catalyst to form a sweet-smelling compound is:',
      options: ['Esterification', 'Saponification', 'Dehydration', 'Fermentation'],
      correctAnswerIndex: 0,
      explanation: 'Esterification produces sweet-smelling esters from the reaction of carboxylic acids and alcohols.'
    }
  ]
};

// Helper to normalize strings for comparison
const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

// Procedural question generators (15 Math and 15 Chemistry templates)
const generateMathQuestions = (chapterTitle: string, classNum: string, chapterId: string): QuizQuestion[] => {
  const templates = [
    {
      question: `Which of the following describes the primary objective of studying the chapter "${chapterTitle}"?`,
      options: [`To model and solve problems using the specific principles of ${chapterTitle}`, 'To perform unrelated statistical operations', 'To memorize definitions without mathematical context', 'To study historical literature'],
      correctAnswerIndex: 0,
      explanation: `Studying the chapter "${chapterTitle}" in Class ${classNum} provides structured mathematical models and steps for solving related problems.`
    },
    {
      question: `In the context of "${chapterTitle}", which of the following is considered a core mathematical concept or operation?`,
      options: [`Applying the specific definitions and algebraic/geometric constraints of ${chapterTitle}`, 'Calculating unrelated standard averages', 'Ignoring defined variables and parameters', 'Using non-mathematical notation only'],
      correctAnswerIndex: 0,
      explanation: `Mastering "${chapterTitle}" requires applying standard theorems, formulas, and constraints defined in this chapter.`
    },
    {
      question: `Let x and y be variables in a mathematical problem concerning "${chapterTitle}". Which representation is valid?`,
      options: [`Setting up an equation f(x, y) based on the principles of ${chapterTitle}`, 'Writing a random string of symbols', 'Formulating an equation that divides by zero', 'An expression containing no mathematical parameters'],
      correctAnswerIndex: 0,
      explanation: `Solving problems in "${chapterTitle}" involves translating given constraints into balanced equations with variables.`
    },
    {
      question: `In TNSB Class ${classNum} board exams, a common question type on "${chapterTitle}" involves:`,
      options: [`Deriving formulas, proving theorems, or calculating exact numerical solutions`, 'Writing an essay on historical mathematicians', 'Finding the average rainfall of Chennai', 'Listing elements of a biology diagram'],
      correctAnswerIndex: 0,
      explanation: `Board assessments on "${chapterTitle}" test conceptual derivations, geometric constructions (where applicable), and algebraic calculations.`
    },
    {
      question: `When applying formulas from "${chapterTitle}" to solve a numerical problem, what is the critical first step?`,
      options: ['Identifying given parameters, their units, and boundary constraints', 'Making a random guess without writing calculation steps', 'Assuming all values in the question are incorrect', 'Skipping standard formulas and writing direct answers'],
      correctAnswerIndex: 0,
      explanation: 'Standard problem solving requires identifying the inputs, selecting the correct formula, and verifying the parameters.'
    },
    {
      question: `Which of the following represents a common error to avoid when working on "${chapterTitle}"?`,
      options: ['Failing to respect sign conventions or ignoring defined domains', 'Double-checking arithmetic operations', 'Using clear steps to write down derivations', 'Stating the final answer with correct units'],
      correctAnswerIndex: 0,
      explanation: 'Common mathematical pitfalls include sign errors, utilizing incorrect formulas, or evaluating values outside the function domain.'
    },
    {
      question: `If a problem in "${chapterTitle}" leads to an inconsistent system of equations, it implies that:`,
      options: ['There is no real solution that satisfies all constraints simultaneously', 'The mathematical axioms are incorrect', 'The answer is always zero', 'The variables must be imaginary numbers only'],
      correctAnswerIndex: 0,
      explanation: 'An inconsistent system arises when constraints represent contradictory geometric or algebraic conditions, yielding no solution.'
    },
    {
      question: `How does the study of "${chapterTitle}" support higher secondary (Class 11/12) mathematics?`,
      options: [`It serves as a critical prerequisite for advanced algebra, geometry, or calculus`, 'It is completely omitted in higher secondary classes', 'It replaces the need to study advanced algebra', 'It is only useful in non-science subjects'],
      correctAnswerIndex: 0,
      explanation: `Foundational concepts in "${chapterTitle}" are directly expanded in secondary board curriculums to prepare students for college engineering cut-offs.`
    },
    {
      question: `Representing relationships from "${chapterTitle}" on a coordinate grid helps students to:`,
      options: ['Visually locate roots, intersections, or boundaries of the system', 'Create artistic graphic patterns', 'Perform qualitative chemical analysis', 'Calculate text reading speed'],
      correctAnswerIndex: 0,
      explanation: 'Graphs translate algebraic equations into geometric lines or curves, highlighting key values like roots and intersections.'
    },
    {
      question: `What does a mathematical "identity" established in the chapter "${chapterTitle}" signify?`,
      options: ['An equation that is true for all possible values of the variables', 'An equation that only holds true for x = 0', 'A temporary relation subject to opinion', 'A profile descriptor of the student'],
      correctAnswerIndex: 0,
      explanation: 'Identities are mathematical equalities that remain true for any input value in the domain, allowing expression simplification.'
    },
    {
      question: `A logical proof of a theorem in the chapter "${chapterTitle}" is built upon:`,
      options: ['A sequence of logical deductions using accepted axioms and definitions', 'A collection of subjective opinions', 'A trial and error experiment', 'A guess by the text editors'],
      correctAnswerIndex: 0,
      explanation: 'Geometric and algebraic proofs deduce properties logically, starting from known axioms and definitions.'
    },
    {
      question: `In a numerical problem on "${chapterTitle}", the "domain" refers to:`,
      options: ['The set of all permissible input values for the variables', 'The range of final output coordinates', 'The physical boundaries of the paper', 'The name of the subject website'],
      correctAnswerIndex: 0,
      explanation: 'The domain defines the set of all input values for which a mathematical expression or function is defined and valid.'
    },
    {
      question: `Mastering the chapter "${chapterTitle}" requires which combination of study habits?`,
      options: ['Understanding core derivations, memorizing formulas, and practicing diverse problems', 'Memorizing exactly one solved example', 'Avoiding calculations and focusing on essays', 'Studying only on the morning of the exam'],
      correctAnswerIndex: 0,
      explanation: 'Strong mathematical aptitude is developed through conceptual clarity, memorization of identities, and varied problem-solving practice.'
    },
    {
      question: `The variables used in equations in "${chapterTitle}" represent:`,
      options: ['Unknown quantities that can be determined using the given constraints', 'Constants that are always equal to 1', 'Labels that cannot be calculated numerically', 'Random letters with no numerical meaning'],
      correctAnswerIndex: 0,
      explanation: 'Variables represent placeholder elements for values that satisfy the constraints and mathematical systems.'
    },
    {
      question: `Which of the following describes a real-world application of "${chapterTitle}"?`,
      options: [`Modeling structural shapes, data patterns, or rates of change`, 'Writing literature essays', 'Predicting the outcome of historical battles', 'Cataloging geological rock samples'],
      correctAnswerIndex: 0,
      explanation: `The calculations and representations in "${chapterTitle}" are used in civil engineering, data analysis, physics modeling, and finance.`
    }
  ];

  return templates.map((t, idx) => ({
    id: `gen-math-${chapterId}-q-${idx + 1}`,
    question: t.question,
    options: t.options,
    correctAnswerIndex: t.correctAnswerIndex,
    explanation: t.explanation
  }));
};

const generateChemQuestions = (chapterTitle: string, classNum: string, chapterId: string): QuizQuestion[] => {
  const templates = [
    {
      question: `Which of the following best describes the main focus of the chapter "${chapterTitle}"?`,
      options: [`The composition, properties, structure, and chemical reactions of the materials involved`, 'Unrelated geometric proofs and coordinate equations', 'The historical progression of world literature', 'Mechanical motion of planetary orbits'],
      correctAnswerIndex: 0,
      explanation: `The study of "${chapterTitle}" in Class ${classNum} explores elements, compounds, molecular reactions, and periodic behaviors.`
    },
    {
      question: `Which chemical law or principle is fundamental to the reactions discussed in "${chapterTitle}"?`,
      options: [`The law of conservation of mass, energy, or standard periodic trends`, 'Newton\'s third law of motion', 'The cell theory of biology', 'The law of demand and supply'],
      correctAnswerIndex: 0,
      explanation: `Chemical transformations in "${chapterTitle}" obey conservation laws of mass and charge, balancing reactants and products.`
    },
    {
      question: `When writing chemical formulas or balanced equations for "${chapterTitle}", we must ensure:`,
      options: ['The total number of atoms of each element is equal on both sides', 'The elements are listed in alphabetical order', 'No stoichiometric coefficients are used', 'Only the names of reactants are written'],
      correctAnswerIndex: 0,
      explanation: 'Balancing chemical equations satisfies the Law of Conservation of Mass, ensuring no atoms are created or destroyed.'
    },
    {
      question: `What is a common laboratory method used to analyze or isolate compounds in "${chapterTitle}"?`,
      options: ['Using qualitative indicators, precipitation, or specific separation techniques', 'Measuring the gravitational constant', 'Graphing quadratic coordinates', 'Writing a code simulation'],
      correctAnswerIndex: 0,
      explanation: `Chemistry experiments for "${chapterTitle}" utilize indicators, titration, solubility tables, and separation columns.`
    },
    {
      question: `Which atomic property primarily dictates the chemical behavior and bonding in "${chapterTitle}"?`,
      options: ['Valence electron configurations and shell energy levels', 'The velocity of neutrons in the nucleus', 'The color of the compound under daylight only', 'The manufacturer of the lab chemicals'],
      correctAnswerIndex: 0,
      explanation: 'Valence electrons in the outermost shell determine chemical reactivity, electronegativity, and bond formation.'
    },
    {
      question: `Which of the following is an essential safety precaution when conducting experiments for "${chapterTitle}"?`,
      options: ['Wearing safety goggles and lab coats, and handling reagents under a fume hood if necessary', 'Tasting chemicals to identify acids and bases', 'Mixing random chemicals without a protocol', 'Heating closed containers over a direct flame'],
      correctAnswerIndex: 0,
      explanation: 'Laboratory protocols mandate protective gear, proper handling of acids/bases, and avoiding direct inhalation or skin contact.'
    },
    {
      question: `In topics related to "${chapterTitle}", a chemical "compound" is defined as:`,
      options: ['A substance formed by the chemical combination of two or more elements in a fixed ratio', 'A physical mixture of liquids that can be separated by simple shaking', 'A pure substance made of only a single type of atom', 'An arbitrary collection of gases'],
      correctAnswerIndex: 0,
      explanation: 'Compounds consist of atoms of different elements chemically bonded together in definite, fixed proportions.'
    },
    {
      question: `Which parameter is key to controlling reaction rates or physical states in "${chapterTitle}"?`,
      options: ['Temperature, pressure, concentration, and catalyst availability', 'The font face used in the syllabus textbook', 'The age of the laboratory equipment', 'The student\'s test score'],
      correctAnswerIndex: 0,
      explanation: 'Reaction rates depend on temperature, reactant concentration, catalyst action, and the physical surface area.'
    },
    {
      question: `How do we identify acidic or basic properties of substances in "${chapterTitle}"?`,
      options: ['Using pH indicators, litmus papers, or electrical conductivity checks', 'By checking its density at room temperature', 'By looking at its physical color under a microscope', 'By smelling the solution directly'],
      correctAnswerIndex: 0,
      explanation: 'Acids and bases are classified using pH metrics, turning indicators (like phenolphthalein or methyl orange) specific colors.'
    },
    {
      question: `What represents an industrial or commercial application of the processes in "${chapterTitle}"?`,
      options: ['Manufacturing metals, fertilizers, polymers, or pharmaceutical products', 'Writing software frameworks', 'Solving trigonometric equations', 'Auditing parent compliance timeline metrics'],
      correctAnswerIndex: 0,
      explanation: `The chemical concepts in "${chapterTitle}" translate to industrial metallurgy, petrochemical refining, agricultural fertilizers, and drug synthesis.`
    },
    {
      question: `In chemical reactions associated with "${chapterTitle}", a "catalyst" is defined as:`,
      options: ['A substance that increases the rate of reaction without undergoing permanent chemical change', 'A reactant that is fully consumed in the first step of the reaction', 'A solid precipitate that settles at the bottom of the beaker', 'An indicator that turns pink in basic solutions'],
      correctAnswerIndex: 0,
      explanation: 'Catalysts speed up reaction rates by providing an alternative pathway with a lower activation energy, remaining unconsumed.'
    },
    {
      question: `Which of the following is a physical property of the compounds studied in "${chapterTitle}"?`,
      options: ['Melting point, boiling point, density, and solubility behavior', 'Flammability and oxidation potential', 'Reactivity with strong bases and acids', 'Electronegativity values of the constituent atoms'],
      correctAnswerIndex: 0,
      explanation: 'Physical properties can be observed or measured without changing the chemical identity of the substance, such as melting/boiling points.'
    },
    {
      question: `How does "hybridization" explain compound structures in "${chapterTitle}"?`,
      options: ['It explains the mixing of atomic orbitals to form new hybrid orbitals with specific geometric orientations', 'It describes the decay of radioactive isotopes in the nucleus', 'It explains physical separation by filtration', 'It describes the change of state from solid to liquid'],
      correctAnswerIndex: 0,
      explanation: 'Hybridization explains molecular geometries (like tetrahedral or planar) by combining s, p, and d orbitals.'
    },
    {
      question: `To verify the identity of a synthesized chemical sample in the context of "${chapterTitle}", chemists analyze its:`,
      options: ['Spectroscopic data, chemical reactivity, and physical constants', 'Unrelated mathematical coordinate plots', 'Discovery date in historical records', 'Price per gram on the commodity market'],
      correctAnswerIndex: 0,
      explanation: 'Qualitative and quantitative analysis checks melting points, solubility, chemical tests, and spectroscopic signals to verify compounds.'
    },
    {
      question: `Why is the study of "${chapterTitle}" essential for secondary school science students?`,
      options: [`It provides the foundational atomic, stoichiometry, and periodic rules needed for advanced secondary chemistry`, 'It is completely unrelated to higher level science classes', 'It replaces the necessity of doing practical lab experiments', 'It is studied only for historical chemistry milestones'],
      correctAnswerIndex: 0,
      explanation: `Class 9 & 10 chemistry establishes the core molecular concepts, bonding models, and stoichiometry required for Class 11 & 12 board aggregates.`
    }
  ];

  return templates.map((t, idx) => ({
    id: `gen-chem-${chapterId}-q-${idx + 1}`,
    question: t.question,
    options: t.options,
    correctAnswerIndex: t.correctAnswerIndex,
    explanation: t.explanation
  }));
};

// Main generator function
export function generateQuizForChapter(
  classId: string,
  subjectId: string,
  chapterId: string,
  chapterTitle: string
): Quiz {
  const normalizedKey = normalize(chapterId);
  
  // Get base handcrafted questions (up to 5)
  let baseQuestions = questionPool[normalizedKey] || [];
  
  if (baseQuestions.length === 0) {
    const matchedKey = Object.keys(questionPool).find(k => normalizedKey.includes(k) || k.includes(normalizedKey));
    if (matchedKey) {
      baseQuestions = questionPool[matchedKey];
    }
  }

  const isMath = subjectId.toLowerCase().includes('math');
  const classNum = classId.replace('class-', '');

  // Generate a full set of 15 questions
  let generatedQuestions: QuizQuestion[] = [];
  if (isMath) {
    generatedQuestions = generateMathQuestions(chapterTitle, classNum, chapterId);
  } else {
    generatedQuestions = generateChemQuestions(chapterTitle, classNum, chapterId);
  }

  // Merge: Use base handcrafted questions for the first slots, and fill the rest from the generated questions
  const finalQuestions: QuizQuestion[] = [];
  
  // Add base questions first
  for (let i = 0; i < baseQuestions.length; i++) {
    finalQuestions.push(baseQuestions[i]);
  }

  // Add generated questions to fill up to exactly 15 questions, avoiding duplicates
  for (let i = 0; i < generatedQuestions.length; i++) {
    if (finalQuestions.length >= 15) break;
    // Simple check: make sure the question string isn't already present in finalQuestions
    const exists = finalQuestions.some(q => q.question.toLowerCase() === generatedQuestions[i].question.toLowerCase());
    if (!exists) {
      finalQuestions.push(generatedQuestions[i]);
    }
  }

  // Fallback: If we still don't have 15, duplicate/slice to force exactly 15 questions
  while (finalQuestions.length < 15 && generatedQuestions.length > 0) {
    const nextQ = generatedQuestions[finalQuestions.length % generatedQuestions.length];
    finalQuestions.push({
      ...nextQ,
      id: `${nextQ.id}-dup-${finalQuestions.length}`
    });
  }

  return {
    id: `quiz-gen-${chapterId}`,
    title: `${chapterTitle} Chapter Assessment`,
    subjectId: subjectId,
    durationMinutes: 15, // Adjusted to 15 minutes for 15 questions
    questions: finalQuestions.slice(0, 15) // Ensure exactly 15
  };
}
