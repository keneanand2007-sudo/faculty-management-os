export const facultyList = [
  { id: "FAC001", name: "Dr. Ramesh Kulkarni", email: "ramesh.kulkarni@college.edu", phone: "9876543210", department: "Computer Science", designation: "HOD", qualification: "Ph.D. Computer Science", joiningDate: "2015-06-12", subjects: 3, classes: 4, workload: 18, attendance: 96, photo: "RK" },
  { id: "FAC002", name: "Prof. Anjali Deshmukh", email: "anjali.deshmukh@college.edu", phone: "9876501234", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Tech Computer Science", joiningDate: "2019-07-01", subjects: 4, classes: 5, workload: 22, attendance: 91, photo: "AD" },
  { id: "FAC003", name: "Prof. Suresh Patil", email: "suresh.patil@college.edu", phone: "9822233344", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Sc. Computer Science", joiningDate: "2021-01-15", subjects: 2, classes: 3, workload: 14, attendance: 88, photo: "SP" },
  { id: "FAC004", name: "Prof. Neha Joshi", email: "neha.joshi@college.edu", phone: "9765432109", department: "Computer Science", designation: "Lecturer", qualification: "MCA", joiningDate: "2022-08-10", subjects: 3, classes: 4, workload: 19, attendance: 94, photo: "NJ" },
  { id: "FAC005", name: "Prof. Pravin", email: "pravin@maherbanucollege.edu", phone: "9800000001", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Sc. Computer Science", joiningDate: "2020-06-15", subjects: 1, classes: 1, workload: 10, attendance: 95, photo: "PR" },
  { id: "FAC006", name: "Prof. Rasika", email: "rasika@maherbanucollege.edu", phone: "9800000002", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Tech Software Engineering", joiningDate: "2019-06-15", subjects: 1, classes: 1, workload: 6, attendance: 97, photo: "RS" },
  { id: "FAC007", name: "Prof. Kesar", email: "kesar@maherbanucollege.edu", phone: "9800000003", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Sc. Computer Science", joiningDate: "2021-06-15", subjects: 1, classes: 1, workload: 8, attendance: 93, photo: "KS" },
  { id: "FAC008", name: "Prof. Anima", email: "anima@maherbanucollege.edu", phone: "9800000004", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Sc. Data Science", joiningDate: "2022-06-15", subjects: 1, classes: 1, workload: 9, attendance: 92, photo: "AN" },
  { id: "FAC009", name: "Prof. Avani", email: "avani@maherbanucollege.edu", phone: "9800000005", department: "Computer Science", designation: "Assistant Professor", qualification: "M.Tech Computer Science", joiningDate: "2020-01-10", subjects: 1, classes: 1, workload: 12, attendance: 96, photo: "AV" },
  { id: "FAC010", name: "Prof. Harsh", email: "harsh@maherbanucollege.edu", phone: "9800000006", department: "Management", designation: "Assistant Professor", qualification: "MBA", joiningDate: "2021-01-10", subjects: 1, classes: 1, workload: 4, attendance: 94, photo: "HR" },
  { id: "FAC011", name: "Prof. Farooqui", email: "farooqui@maherbanucollege.edu", phone: "9800000007", department: "Mathematics", designation: "Assistant Professor", qualification: "M.Sc. Statistics", joiningDate: "2018-06-15", subjects: 1, classes: 1, workload: 6, attendance: 95, photo: "FQ" },
];

export const subjectsList = [
  { id: "SUB001", name: "Database Management System", code: "CS301", semester: "V", className: "BCA III", facultyId: "FAC001", totalHours: 60, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "ER Model & Normalization", status: "Completed", date: "2026-08-05" },
      { id: "T2", name: "SQL Joins & Subqueries", status: "Completed", date: "2026-08-12" },
      { id: "T3", name: "Transactions & Concurrency", status: "In Progress", date: "" },
      { id: "T4", name: "Indexing & Query Optimization", status: "Not Started", date: "" },
    ], notes: [] },
  { id: "SUB002", name: "Web Technology", code: "CS302", semester: "V", className: "BCA III", facultyId: "FAC002", totalHours: 50, syllabusStatus: "Completed",
    topics: [
      { id: "T1", name: "HTML5 & CSS3 Fundamentals", status: "Completed", date: "2026-07-20" },
      { id: "T2", name: "Flexbox & Grid Layouts", status: "Completed", date: "2026-07-28" },
      { id: "T3", name: "JavaScript DOM Manipulation", status: "Completed", date: "2026-08-10" },
    ], notes: [] },
  { id: "SUB003", name: "Data Structures", code: "CS201", semester: "III", className: "BCA II", facultyId: "FAC003", totalHours: 55, syllabusStatus: "Not Started", topics: [],
    notes: [
      { id: "N1", title: "Unit I — Arrays & Searching/Sorting", content: "Definition & classification of Data Structures. Arrays: linear array operations (traverse, insert, delete, search, sort, merge). Linear Search, Binary Search. Bubble, Selection, Insertion Sort. 2D arrays, sparse matrices.", date: "2026-08-01" },
      { id: "N2", title: "Unit II — Linked Lists & Hashing", content: "Singly, Doubly, Circular Linked Lists — traverse, insert, delete, search. Application: polynomial addition. Hashing: hash tables, hash functions, collision resolution (open addressing, chaining).", date: "2026-08-05" },
      { id: "N3", title: "Unit III — Stacks, Recursion, Queues", content: "Stack representation (array/linked list), infix-to-postfix conversion, postfix evaluation. Recursion basics: factorial, GCD, Fibonacci, Towers of Hanoi. Queue types: simple, circular, priority, deque.", date: "2026-08-09" },
      { id: "N4", title: "Unit IV — Graphs & Trees", content: "Graph representation and traversal. Binary Trees, Binary Search Tree operations (insert/delete/search), tree traversals, height-balanced trees.", date: "2026-08-14" },
    ] },
  { id: "SUB004", name: "Operating Systems", code: "CS303", semester: "V", className: "BCA III", facultyId: "FAC004", totalHours: 45, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "Process Scheduling", status: "Completed", date: "2026-08-08" },
      { id: "T2", name: "Deadlocks", status: "In Progress", date: "" },
    ], notes: [] },
  { id: "SUB005", name: "Python Programming", code: "BCA203", semester: "III", className: "BCA II", facultyId: "FAC005", totalHours: 50, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "Basics, Loops & Functions", status: "Completed", date: "2026-07-25" },
      { id: "T2", name: "File Handling", status: "Completed", date: "2026-08-05" },
      { id: "T3", name: "OOP in Python", status: "In Progress", date: "" },
      { id: "T4", name: "Exception Handling", status: "Not Started", date: "" },
    ],
    notes: [
      { id: "N1", title: "Unit I — Basics, Strings & Control Flow", content: "History & application areas of Python. Identifiers, keywords, operators, data types & type conversion. String creation, built-in string functions, slicing, formatting. Conditional statements, loops, break/continue/pass.", date: "2026-07-22" },
      { id: "N2", title: "Unit II — Functions & Collections", content: "Built-in functions, function definition/call, default parameters, lambda functions. Mutable vs immutable objects: Lists, Tuples, Dictionaries and common operations. Passing collections as function arguments.", date: "2026-07-30" },
      { id: "N3", title: "Unit III — Files, Exceptions & Visualization", content: "Text/binary file read-write, pickle module, CSV/JSON handling. Exception handling: try-except-else-finally, raise statement. Data visualization: 2D/3D plots, histograms, pie charts.", date: "2026-08-06" },
      { id: "N4", title: "Unit IV — OOP in Python", content: "Classes and objects, constructor method, class attributes vs data attributes, encapsulation, inheritance, polymorphism.", date: "2026-08-12" },
    ] },
  { id: "SUB006", name: "Software Engineering", code: "BCA204", semester: "III", className: "BCA II", facultyId: "FAC006", totalHours: 40, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "SDLC Models", status: "Completed", date: "2026-07-22" },
      { id: "T2", name: "Requirement Analysis", status: "In Progress", date: "" },
    ],
    notes: [
      { id: "N1", title: "Unit I — Process Models & Agile", content: "Evolving role of software, process framework. Process models: Waterfall, Incremental, Evolutionary, Unified Process. Agile: principles, methods, Extreme Programming, Scrum.", date: "2026-07-18" },
      { id: "N2", title: "Unit II — Requirements & Risk", content: "Functional/non-functional requirements, SRS document, requirements elicitation & validation. Risk management: reactive vs proactive, risk identification & refinement, RMMM plan. Project planning & estimation.", date: "2026-07-25" },
      { id: "N3", title: "Unit III — Design & Testing", content: "Design process & quality, architectural design, class/sequence/use-case/component diagrams. Testing strategies: black-box, white-box, validation, system testing. Product metrics.", date: "2026-08-02" },
      { id: "N4", title: "Unit IV — Quality & Release Management", content: "Quality concepts, SQA, formal technical reviews, software reliability. Release planning, build/release strategies, post-deployment monitoring, maintenance & migration strategies.", date: "2026-08-09" },
    ] },
  { id: "SUB007", name: "Feature Engineering", code: "BCA205", semester: "III", className: "BCA II", facultyId: "FAC007", totalHours: 45, syllabusStatus: "Not Started", topics: [],
    notes: [
      { id: "N1", title: "Unit I — Intro to Features & Preprocessing", content: "Importance of features in ML. Data types: numerical, categorical, ordinal, discrete, continuous, interval, ratio. Basic preprocessing: handling missing data, cleaning, scaling, normalization, transformation.", date: "2026-08-01" },
      { id: "N2", title: "Unit II — Feature Engineering Techniques", content: "Numerical: binning, discretization, polynomial/interaction features. Categorical: one-hot encoding, label encoding. Feature selection: filter, wrapper, hybrid methods. Feature reduction via PCA.", date: "2026-08-08" },
    ] },
  { id: "SUB008", name: "Data Analytics", code: "BCA206", semester: "III", className: "BCA II", facultyId: "FAC008", totalHours: 45, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "Data Cleaning & Preprocessing", status: "Completed", date: "2026-08-01" },
      { id: "T2", name: "Exploratory Data Analysis", status: "In Progress", date: "" },
    ],
    notes: [
      { id: "N1", title: "Unit I — Intro to Data Analytics", content: "Data types: structured, unstructured, semi-structured. What is Data Analytics, types & importance, applications across industries.", date: "2026-07-28" },
      { id: "N2", title: "Unit II — Data, Ethics & Case Studies", content: "Data collection methods, sources & formats. Data cleaning & transformation, handling missing data/outliers. Ethical considerations. Industry applications: finance, marketing, operations.", date: "2026-08-04" },
    ] },
  { id: "SUB009", name: "Database Management System", code: "BCA207", semester: "III", className: "BCA II", facultyId: "FAC009", totalHours: 50, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "Introduction to DBMS", status: "Completed", date: "2026-07-24" },
      { id: "T2", name: "ER Diagrams", status: "Completed", date: "2026-08-02" },
      { id: "T3", name: "Normalization", status: "In Progress", date: "" },
    ],
    notes: [
      { id: "N1", title: "Unit I — Intro to Databases & ER Model", content: "Data, Database, DBMS definitions. Data models: hierarchical, network, relational, object-oriented. ER Model: entities, attributes, relationships, ER diagrams, weak entity sets. Keys: primary, candidate, super, foreign, composite.", date: "2026-07-20" },
      { id: "N2", title: "Unit II — Normalization & Indexing", content: "Functional dependencies, Armstrong's axioms. Normal forms: 1NF, 2NF, 3NF, BCNF, denormalization. File organizations, indexing structures, index selection guidelines.", date: "2026-07-29" },
      { id: "N3", title: "Unit III — SQL", content: "DDL/DML basics. Aggregate functions (MIN, MAX, SUM, AVG, COUNT). Logical operators, predicates (LIKE, BETWEEN). GROUP BY, HAVING, ORDER BY. Joins: inner, natural, full outer, left/right outer, equi join.", date: "2026-08-06" },
      { id: "N4", title: "Unit IV — Transaction Management", content: "ACID properties, transactions & schedules, serializability, recoverability. Lock-based concurrency control, deadlock handling. Crash recovery, Strict 2PL, ARIES algorithm.", date: "2026-08-13" },
    ] },
  { id: "SUB010", name: "Entrepreneurship Development", code: "BCA208", semester: "III", className: "BCA II", facultyId: "FAC010", totalHours: 30, syllabusStatus: "Not Started", topics: [], notes: [] },
  { id: "SUB011", name: "Probability and Statistics", code: "BCA209", semester: "III", className: "BCA II", facultyId: "FAC011", totalHours: 40, syllabusStatus: "In Progress",
    topics: [
      { id: "T1", name: "Probability Basics", status: "Completed", date: "2026-07-26" },
      { id: "T2", name: "Random Variables", status: "In Progress", date: "" },
    ],
    notes: [
      { id: "N1", title: "Unit I — Probability & Random Variables", content: "Experiment, sample space, events, conditional probability. Discrete/continuous random variables, PMF, PDF, expectation & variance. Standard distributions: Binomial, Poisson, Normal.", date: "2026-07-21" },
      { id: "N2", title: "Unit II — Sampling & Hypothesis Testing", content: "Population vs sample, parameter vs statistic. Sampling distribution of mean/proportion. Estimation, hypothesis testing (z-test, t-test).", date: "2026-07-28" },
      { id: "N3", title: "Unit III — Descriptive Statistics", content: "Frequency distributions, diagrammatic representation. Measures of central tendency: mean, median, mode. Measures of dispersion: range, mean deviation, variance, standard deviation.", date: "2026-08-04" },
      { id: "N4", title: "Unit IV — Correlation & Regression", content: "Scatter diagrams, types of correlation, Karl Pearson's coefficient, Spearman's rank correlation. Linear regression, least squares fitting, P-value, R-squared.", date: "2026-08-11" },
    ] },
];

export const activitiesList = [
  { id: "ACT001", title: "SQL Joins Practical", subjectId: "SUB001", facultyId: "FAC001", className: "BCA III", date: "2026-08-18", description: "Hands-on practical covering inner, outer and cross joins.", status: "Completed" },
  { id: "ACT002", title: "Responsive Layout Assignment", subjectId: "SUB002", facultyId: "FAC002", className: "BCA III", date: "2026-08-19", description: "Build a responsive landing page using Flexbox and Grid.", status: "In Progress" },
  { id: "ACT003", title: "Linked List Implementation", subjectId: "SUB003", facultyId: "FAC003", className: "BCA II", date: "2026-08-21", description: "Implement singly and doubly linked list operations.", status: "Pending" },
];

export const scheduleList = [
  { id: "SCH-MON-1", day: "Monday", period: "1", time: "11:00 - 11:50", type: "class", sessions: [{ subject: "Python Programming", subjectType: "Theory", facultyId: "FAC005" }] },
  { id: "SCH-MON-2", day: "Monday", period: "2", time: "11:50 - 12:40", type: "class", sessions: [{ subject: "Software Engineering", subjectType: "Theory", facultyId: "FAC006" }] },
  { id: "SCH-MON-3", day: "Monday", period: "3", time: "12:40 - 1:30", type: "class", sessions: [
      { subject: "Feature Engineering", subjectType: "Practical", facultyId: "FAC007" },
      { subject: "Data Analytics", subjectType: "Practical", facultyId: "FAC008" },
    ] },
  { id: "SCH-MON-4", day: "Monday", period: "4", time: "2:00 - 2:50", type: "class", sessions: [{ subject: "Entrepreneurship Development", subjectType: "Theory", facultyId: "FAC010" }] },
  { id: "SCH-MON-5", day: "Monday", period: "5", time: "2:50 - 3:40", type: "class", sessions: [{ subject: "Data Analytics", subjectType: "Practical", facultyId: "FAC008" }] },
  { id: "SCH-MON-6", day: "Monday", period: "6", time: "3:40 - 4:30", type: "special", label: "Library" },

  { id: "SCH-TUE-1", day: "Tuesday", period: "1", time: "11:00 - 11:50", type: "class", sessions: [{ subject: "Python Programming", subjectType: "Theory", facultyId: "FAC005" }] },
  { id: "SCH-TUE-2", day: "Tuesday", period: "2", time: "11:50 - 12:40", type: "class", sessions: [{ subject: "Software Engineering", subjectType: "Theory", facultyId: "FAC006" }] },
  { id: "SCH-TUE-3", day: "Tuesday", period: "3", time: "12:40 - 1:30", type: "class", sessions: [
      { subject: "Feature Engineering", subjectType: "Practical", facultyId: "FAC007" },
      { subject: "Data Analytics", subjectType: "Practical", facultyId: "FAC008" },
    ] },
  { id: "SCH-TUE-4", day: "Tuesday", period: "4", time: "2:00 - 2:50", type: "class", sessions: [{ subject: "Database Management System", subjectType: "Theory", facultyId: "FAC009" }] },
  { id: "SCH-TUE-5", day: "Tuesday", period: "5", time: "2:50 - 3:40", type: "class", sessions: [{ subject: "Data Analytics", subjectType: "Practical", facultyId: "FAC008" }] },
  { id: "SCH-TUE-6", day: "Tuesday", period: "6", time: "3:40 - 4:30", type: "special", label: "Library" },

  { id: "SCH-WED-1", day: "Wednesday", period: "1", time: "11:00 - 11:50", type: "class", sessions: [{ subject: "Software Engineering", subjectType: "Theory", facultyId: "FAC006" }] },
  { id: "SCH-WED-23", day: "Wednesday", period: "2-3", time: "11:50 - 1:30", type: "class", sessions: [{ subject: "Database Management System", subjectType: "Practical", facultyId: "FAC009" }] },
  { id: "SCH-WED-4", day: "Wednesday", period: "4", time: "2:00 - 2:50", type: "class", sessions: [{ subject: "Probability and Statistics", subjectType: "Theory", facultyId: "FAC011" }] },
  { id: "SCH-WED-5", day: "Wednesday", period: "5", time: "2:50 - 3:40", type: "class", sessions: [{ subject: "Feature Engineering", subjectType: "Practical", facultyId: "FAC007" }] },
  { id: "SCH-WED-6", day: "Wednesday", period: "6", time: "3:40 - 4:30", type: "special", label: "Library" },

  { id: "SCH-THU-1", day: "Thursday", period: "1", time: "11:00 - 11:50", type: "class", sessions: [{ subject: "Database Management System", subjectType: "Theory", facultyId: "FAC009" }] },
  { id: "SCH-THU-23", day: "Thursday", period: "2-3", time: "11:50 - 1:30", type: "class", sessions: [{ subject: "Python Programming", subjectType: "Practical", facultyId: "FAC005" }] },
  { id: "SCH-THU-4", day: "Thursday", period: "4", time: "2:00 - 2:50", type: "class", sessions: [{ subject: "Probability and Statistics", subjectType: "Theory", facultyId: "FAC011" }] },
  { id: "SCH-THU-5", day: "Thursday", period: "5", time: "2:50 - 3:40", type: "class", sessions: [{ subject: "Feature Engineering", subjectType: "Practical", facultyId: "FAC007" }] },
  { id: "SCH-THU-6", day: "Thursday", period: "6", time: "3:40 - 4:30", type: "special", label: "Library" },

  { id: "SCH-FRI-1", day: "Friday", period: "1", time: "11:00 - 11:50", type: "class", sessions: [
      { subject: "Feature Engineering", subjectType: "Theory", facultyId: "FAC007" },
      { subject: "Data Analytics", subjectType: "Theory", facultyId: "FAC008" },
    ] },
  { id: "SCH-FRI-23", day: "Friday", period: "2-3", time: "11:50 - 1:30", type: "class", sessions: [{ subject: "Python Programming", subjectType: "Practical", facultyId: "FAC005" }] },
  { id: "SCH-FRI-4", day: "Friday", period: "4", time: "2:00 - 2:50", type: "class", sessions: [{ subject: "Entrepreneurship Development", subjectType: "Theory", facultyId: "FAC010" }] },
  { id: "SCH-FRI-5", day: "Friday", period: "5", time: "2:50 - 3:40", type: "special", label: "NSS" },

  { id: "SCH-SAT-1", day: "Saturday", period: "1", time: "11:00 - 11:50", type: "class", sessions: [{ subject: "Database Management System", subjectType: "Theory", facultyId: "FAC009" }] },
  { id: "SCH-SAT-2", day: "Saturday", period: "2", time: "11:50 - 12:40", type: "class", sessions: [{ subject: "Database Management System", subjectType: "Theory", facultyId: "FAC009" }] },
  { id: "SCH-SAT-3", day: "Saturday", period: "3", time: "12:40 - 1:30", type: "class", sessions: [{ subject: "Python Programming", subjectType: "Theory", facultyId: "FAC005" }] },
  { id: "SCH-SAT-4", day: "Saturday", period: "4", time: "2:00 - 2:50", type: "class", sessions: [{ subject: "Probability and Statistics", subjectType: "Theory", facultyId: "FAC011" }] },
  { id: "SCH-SAT-5", day: "Saturday", period: "5", time: "2:50 - 3:40", type: "class", sessions: [{ subject: "Database Management System", subjectType: "Theory", facultyId: "FAC009" }] },
  { id: "SCH-SAT-6", day: "Saturday", period: "6", time: "3:40 - 4:30", type: "special", label: "Library" },
];

export const classesList = [
  { id: "CLS001", name: "BCA II", division: "A", semester: "III", coordinatorFacultyId: "FAC009" },
  { id: "CLS002", name: "BCA III", division: "A", semester: "V", coordinatorFacultyId: "FAC001" },
];

export const functionsList = [
  { id: "EVT001", category: "Function", name: "Annual Tech Fest", description: "College-wide technical festival featuring coding contests, workshops and project exhibitions.", venue: "Main Auditorium", startDate: "2026-08-28", endDate: "2026-08-29", inChargeFacultyId: "FAC001", allocatedBudget: 50000, usedBudget: 31500, status: "Upcoming",
    checklist: [
      { id: "CHK1", name: "Stage Setup", status: "Completed" },
      { id: "CHK2", name: "Sound System", status: "Completed" },
      { id: "CHK3", name: "Projector", status: "Completed" },
      { id: "CHK4", name: "Decoration", status: "Pending" },
      { id: "CHK5", name: "Certificates", status: "Pending" },
      { id: "CHK6", name: "Seating Arrangement", status: "Pending" },
    ],
    scheduleItems: [
      { id: "SCH1", time: "10:00 AM", title: "Opening Ceremony" },
      { id: "SCH2", time: "11:00 AM", title: "Main Event" },
      { id: "SCH3", time: "01:00 PM", title: "Break Session" },
      { id: "SCH4", time: "02:00 PM", title: "Fun Activity" },
      { id: "SCH5", time: "04:00 PM", title: "Closing Ceremony" },
    ] },
  { id: "EVT002", category: "Meeting", name: "Faculty Meeting", description: "Monthly academic review meeting for all department faculty.", venue: "Conference Room", startDate: "2026-08-21", endDate: "2026-08-21", inChargeFacultyId: "FAC001", allocatedBudget: 0, usedBudget: 0, status: "Scheduled", checklist: [], scheduleItems: [] },
  { id: "EVT003", category: "Holiday", name: "Independence Day", description: "National holiday — college closed.", venue: "", startDate: "2026-08-15", endDate: "2026-08-15", inChargeFacultyId: "", allocatedBudget: 0, usedBudget: 0, status: "Scheduled", checklist: [], scheduleItems: [] },
  { id: "EVT004", category: "Holiday", name: "Ganesh Chaturthi", description: "Regional festival holiday — college closed.", venue: "", startDate: "2026-08-26", endDate: "2026-08-26", inChargeFacultyId: "", allocatedBudget: 0, usedBudget: 0, status: "Scheduled", checklist: [], scheduleItems: [] },
  { id: "EVT005", category: "Exam", name: "Mid-Semester Exams — BCA II & III", description: "Mid-semester theory examinations for both classes.", venue: "Examination Hall", startDate: "2026-09-01", endDate: "2026-09-05", inChargeFacultyId: "FAC001", allocatedBudget: 0, usedBudget: 0, status: "Upcoming", checklist: [], scheduleItems: [] },
];

export const competitionsList = [
  { id: "COMP001", name: "Coding Contest", category: "Technical", date: "2026-08-22", time: "10:00", venue: "Computer Lab 1", coordinatorId: "FAC001", status: "Upcoming",
    participants: [
      { id: "P1", name: "Aarav Sharma", className: "BCA II" },
      { id: "P2", name: "Isha Verma", className: "BCA III" },
      { id: "P3", name: "Rohan Mehta", className: "BCA II" },
    ], results: [] },
  { id: "COMP002", name: "Inter-College Dance Competition", category: "Cultural", date: "2026-08-15", time: "15:00", venue: "Main Auditorium", coordinatorId: "FAC002", status: "Completed",
    participants: [
      { id: "P4", name: "Team Rhythm", className: "BCA III" },
      { id: "P5", name: "Team Groove", className: "BCA II" },
    ],
    results: [
      { participantId: "P4", position: 1, score: 95 },
      { participantId: "P5", position: 2, score: 88 },
    ] },
];

export const studentsList = [
  { id: "STU001", name: "Aarav Sharma", rollNo: "01", className: "BCA II" },
  { id: "STU002", name: "Rohan Mehta", rollNo: "02", className: "BCA II" },
  { id: "STU003", name: "Priya Nair", rollNo: "03", className: "BCA II" },
  { id: "STU004", name: "Sanjana Rao", rollNo: "04", className: "BCA II" },
  { id: "STU005", name: "Isha Verma", rollNo: "01", className: "BCA III" },
  { id: "STU006", name: "Karan Malhotra", rollNo: "02", className: "BCA III" },
  { id: "STU007", name: "Divya Iyer", rollNo: "03", className: "BCA III" },
  { id: "STU008", name: "Aditya Kulkarni", rollNo: "04", className: "BCA III" },
];

export const attendanceRecords = [
  { id: "ATT001", date: "2026-08-20", subjectId: "SUB001", className: "BCA III",
    entries: [
      { studentId: "STU005", status: "Present" },
      { studentId: "STU006", status: "Present" },
      { studentId: "STU007", status: "Absent" },
      { studentId: "STU008", status: "Present" },
    ] },
];

export const leavesList = [
  { id: "LV001", facultyId: "FAC002", leaveType: "Personal", fromDate: "2026-08-24", toDate: "2026-08-25", reason: "Family function out of town.", status: "Pending", hodRemarks: "" },
  { id: "LV002", facultyId: "FAC003", leaveType: "Sick Leave", fromDate: "2026-08-19", toDate: "2026-08-19", reason: "Fever and viral infection.", status: "Approved", hodRemarks: "Get well soon." },
  { id: "LV003", facultyId: "FAC004", leaveType: "Casual Leave", fromDate: "2026-08-30", toDate: "2026-08-30", reason: "Personal work.", status: "Rejected", hodRemarks: "Clashes with department review meeting." },
];

export const workloadData = facultyList.map((f) => ({ name: f.name.split(" ").slice(-1)[0], hours: f.workload }));

export const attendanceData = [
  { day: "Mon", present: 92 },
  { day: "Tue", present: 95 },
  { day: "Wed", present: 89 },
  { day: "Thu", present: 97 },
  { day: "Fri", present: 91 },
];
