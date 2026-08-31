/**
 * Grouped by where the work sits in a system, lowest layer first — the order
 * an engineer reads, and the order that matches what I want to be hired for.
 */
export const STACK: { label: string; items: string[]; dots?: boolean }[] = [
  {
    label: 'Languages',
    items: ['C', 'Python', 'Java', 'Kotlin', 'TypeScript', 'SQL'],
    dots: true,
  },
  {
    label: 'Backend & data',
    items: ['FastAPI', 'PostgreSQL', 'NumPy', 'SciPy', 'SQLite', 'AWS'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Jetpack Compose'],
  },
];

/**
 * The title block's fields, in drawing order. Labelled rather than positional:
 * the home page reads them as a title block and /about reads the values as a
 * facts row, and indexing into a bare array to find "the institution one"
 * would break the first time the order changed.
 */
export const IDENTITY = [
  { label: 'Degree', value: 'BS Computer Science & Mathematical Sciences' },
  { label: 'Institution', value: 'University of Scranton' },
  { label: 'Location', value: 'Pennsylvania, USA' },
] as const;

/** Availability is the one field that changes; it lives beside the rest. */
export const STATUS = 'Available for hire';

/** Values only — the facts row in the /about header. Derived so it can't drift. */
export const CREDENTIALS: string[] = IDENTITY.map(f => f.value);

/** One constant — hero, contact section, and footer all point at the same inbox. */
export const EMAIL = 'sergeykuzmin495@gmail.com';

/** Kept for the About page, where the maths background is the point. */
export const MATH_TOPICS = [
  'Numerical Analysis',
  'Linear Algebra',
  'Probability Theory',
  'Statistics',
  'Cryptography',
  'Coding Theory',
  'Calculus',
];

export const FOCUS_AREAS = [
  'Quantum computing',
  'Robotics',
  'Artificial intelligence',
  'Systems engineering',
];

/**
 * Coverage of one story — arriving from Ukraine to study at Scranton, Aug 2022.
 * The Citizen's Voice and Times-Tribune run the same syndicated piece.
 */
export const PRESS = [
  {
    outlet: "The Citizen's Voice",
    headline:
      'From fear to future: Student from Ukraine enrolls in University of Scranton',
    date: '2022-08-24',
    href: 'https://www.citizensvoice.com/2022/08/24/from-fear-to-future-student-from-ukraine-enrolls-in-university-of-scranton/',
  },
  {
    outlet: 'The Times-Tribune',
    headline:
      'From fear to future: Student from Ukraine enrolls in University of Scranton',
    date: '2022-08-24',
    href: 'https://www.thetimes-tribune.com/2022/08/24/from-fear-to-future-student-from-ukraine-enrolls-in-university-of-scranton/',
  },
  {
    outlet: 'FOX56 WOLF',
    headline: 'University of Scranton Welcomes First-Year Student from Ukraine',
    date: '2022-08-24',
    href: 'https://fox56.com/news/local/university-of-scranton-welcomes-student-from-ukraine',
  },
  {
    outlet: 'WVIA News',
    headline:
      'Area college student escapes war in Ukraine on path to study in Scranton',
    date: '2022-08-26',
    href: 'https://www.wvia.org/local/2022-08-26/area-college-student-escapes-war-in-ukraine-on-path-to-study-in-scranton',
  },
];
