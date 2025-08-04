import { SyllabusData } from '../types/syllabus';

export const syllabusData: SyllabusData = {
  awareness: {
    id: 'awareness',
    title: 'General Awareness',
    icon: '🌍',
    description: 'A broad range of topics concerning general knowledge and current events.',
    topics: [
      'Current Affairs', 'Indian Geography', 'Culture of India', 'History of India (including the freedom struggle)',
      'Indian Polity and Constitution', 'Indian Economy', 'Environmental Issues (concerning India and the World)',
      'Sports', 'General Scientific and Technological Developments'
    ]
  },
  reasoning: {
    id: 'reasoning',
    title: 'General Intelligence & Reasoning',
    icon: '🧠',
    description: 'This section tests logical and analytical thinking abilities.',
    topics: [
      'Analogies', 'Alphabetical and Number Series', 'Coding and Decoding', 'Mathematical Operations',
      'Relationships (Blood Relations)', 'Syllogism', 'Jumbling', 'Venn Diagrams', 'Data Interpretation and Sufficiency',
      'Conclusions and Decision Making', 'Similarities and Differences', 'Analytical Reasoning', 'Classification',
      'Directions', 'Statement - Arguments and Assumptions'
    ]
  },
  computers: {
    id: 'computers',
    title: 'Basics of Computers & Applications',
    icon: '💻',
    description: 'Fundamental knowledge of computers and their applications.',
    topics: [
      { name: 'Computer Architecture', sub: ['Core components and structure'] },
      { name: 'Input and Output Devices', sub: ['Keyboard, mouse, monitor, printer, etc.'] },
      { name: 'Storage Devices', sub: ['HDD, SSD, USB drives, etc.'] },
      { name: 'Networking', sub: ['Basics of LAN, WAN, and network topologies'] },
      { name: 'Operating Systems', sub: ['Familiarity with Windows, Unix, and Linux'] },
      { name: 'MS Office', sub: ['Proficiency in Word, Excel, PowerPoint, etc.'] },
      { name: 'Data Representation', sub: ['Binary, hexadecimal, etc.'] },
      { name: 'Internet and Email', sub: ['Browsing, searching, and email protocols'] },
      { name: 'Websites & Web Browsers', sub: ['How they work'] },
      { name: 'Computer Viruses', sub: ['Types and prevention'] }
    ]
  },
  maths: {
    id: 'maths',
    title: 'Mathematics',
    icon: '🧮',
    description: 'Core mathematical concepts from arithmetic, algebra, geometry, and statistics.',
    topics: [
      'Number System', 'Rational and Irrational Numbers', 'BODMAS Rule', 'Quadratic Equations',
      'Arithmetic Progression', 'Similar Triangles', 'Pythagoras Theorem', 'Coordinate Geometry',
      'Trigonometrical Ratios', 'Heights and Distances', 'Surface Area and Volume',
      {
        name: 'Sets',
        sub: [
          'Sets and their representations', 'Empty set, Finite and Infinite sets, Equal sets',
          'Subsets, Subsets of a set of real numbers', 'Universal set', 'Venn diagrams',
          'Union and Intersection of sets', 'Difference of sets', 'Complement of a set, Properties of Complement'
        ]
      },
      {
        name: 'Statistics',
        sub: [
          'Measures of Dispersion: Range, Mean deviation, Variance, and Standard deviation (for ungrouped/grouped data)',
          'Probability: Occurrence of events, exhaustive events, mutually exclusive events'
        ]
      }
    ]
  },
  science: {
    id: 'science',
    title: 'Basic Science & Engineering',
    icon: '🔬',
    description: 'Fundamental principles of physics, electricity, and electronics.',
    topics: [
      {
        name: 'Physics Fundamentals',
        sub: ['Units and Measurements', 'Mass, Weight, and Density', 'Work, Power, and Energy', 'Speed and Velocity', 'Heat and Temperature']
      },
      {
        name: 'Electricity and Magnetism',
        sub: [
          'Electric Charge, Field, and Intensity', 'Electric Potential and Potential Difference', 'Simple Electric Circuits',
          'Conductors, Non-conductors/Insulators', 'Ohm\'s Law and its Limitations', 'Resistances in Series and Parallel, Specific Resistance',
          'Relation between Electric Potential, Energy, and Power (Wattage)', 'Ampere\'s Law',
          'Magnetic Force on Moving Charged Particle and Long Straight Conductors', 'Electromagnetic Induction and Faraday\'s Law',
          'Electromagnetic Flux', 'Magnetic Field and Magnetic Induction'
        ]
      },
      {
        name: 'Electronics and Measurements',
        sub: [
          'Basic Electronics', 'Digital Electronics', 'Electronic Devices and Circuits', 'Microcontroller and Microprocessor',
          'Electronic Measurements', 'Measuring Systems and Principles', 'Range Extension Methods',
          'Cathode Ray Oscilloscope (CRO)', 'LCD and LED Panels', 'Transducers'
        ]
      }
    ]
  }
};
