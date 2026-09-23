/* NEXORA UNIVERSAL CURATED CATALOGUE */
const NEXORA_UNIVERSAL_CURATED_CATALOGUE = {
  exams: [
    "UPSC","SSC","Banking","Railway","Defence","Teaching","JEE","NEET",
    "CUET","UGC-NET","State PSC","State Exams","Police","Law","Management",
    "Agriculture","School Exam","College / University","Other"
  ],
  languages: ["English","Hindi"],
  classes: [
    "Class 6","Class 7","Class 8","Class 9","Class 10",
    "Class 11","Class 12","Graduation / College","Other"
  ],
  subjects: [
    "Geography","History","Polity","Economy","Environment","Science",
    "Biology","Physics","Chemistry","Mathematics","English","Hindi","Other"
  ],
  books: {
    "Class 6": {
      "Mathematics": [{
        id:"class6-maths-ganita-prakash", title:"Ganita Prakash", author:"NCERT",
        chapters:[
          "Patterns in Mathematics","Lines and Angles","Number Play",
          "Data Handling and Presentation","Prime Time","Perimeter and Area",
          "Fractions","Playing with Constructions","Symmetry","The Other Side of Zero"
        ]
      }]
    },
    "Class 7": {
      "Mathematics": [{
        id:"class7-maths-ganita-prakash", title:"Ganita Prakash", author:"NCERT",
        chapters:[
          "Large Numbers Around Us","Arithmetic Expressions","A Peek Beyond the Point",
          "Expressions Using Letter-Numbers","Parallel and Intersecting Lines",
          "Number Play","A Tale of Three Intersecting Lines","Working with Fractions",
          "Geometric Constructions","Three-Dimensional Shapes","Finding the Unknown",
          "Ratio and Proportion","Two New Operators"
        ]
      }]
    },
    "Class 8": {
      "Mathematics": [{
        id:"class8-maths-ganita-prakash", title:"Ganita Prakash", author:"NCERT",
        chapters:[
          "A Square and a Cube","Power Play","A Story of Numbers","Quadrilaterals",
          "Number Play","We Distribute, Yet Things Multiply","Proportional Reasoning",
          "Fractions in Disguise","The Baudhayana-Pythagoras Theorem",
          "From Data to Decisions","Exploring Some Geometric Shapes",
          "Area of Trapezium and a Polygon","Three-Dimensional Geometry"
        ]
      }]
    },
    "Class 9": {
      "Mathematics": [{
        id:"class9-maths-ncert", title:"Mathematics", author:"NCERT",
        chapters:[
          "Number Systems","Polynomials","Coordinate Geometry",
          "Linear Equations in Two Variables","Introduction to Euclid's Geometry",
          "Lines and Angles","Triangles","Quadrilaterals","Circles","Heron's Formula",
          "Surface Areas and Volumes","Statistics","Probability"
        ]
      }]
    },
    "Class 10": {
      "Mathematics": [{
        id:"class10-maths-ncert", title:"Mathematics", author:"NCERT",
        chapters:[
          "Real Numbers","Polynomials","Pair of Linear Equations in Two Variables",
          "Quadratic Equations","Arithmetic Progressions","Triangles",
          "Coordinate Geometry","Introduction to Trigonometry",
          "Some Applications of Trigonometry","Circles","Areas Related to Circles",
          "Surface Areas and Volumes","Statistics","Probability"
        ]
      }]
    },
    "Class 11": {
      "Mathematics": [{
        id:"class11-maths-ncert", title:"Mathematics", author:"NCERT",
        chapters:[
          "Sets","Relations and Functions","Trigonometric Functions",
          "Principle of Mathematical Induction","Complex Numbers and Quadratic Equations",
          "Linear Inequalities","Permutations and Combinations","Binomial Theorem",
          "Sequences and Series","Straight Lines","Conic Sections",
          "Introduction to Three Dimensional Geometry","Limits and Derivatives",
          "Statistics","Probability"
        ]
      }],
      "Physics": [{
        id:"class11-physics-ncert", title:"Physics Part-I & Part-II", author:"NCERT",
        chapters:[
          "Units and Measurements","Motion in a Straight Line","Motion in a Plane",
          "Laws of Motion","Work, Energy and Power",
          "System of Particles and Rotational Motion","Gravitation",
          "Mechanical Properties of Solids","Mechanical Properties of Fluids",
          "Thermal Properties of Matter","Thermodynamics","Kinetic Theory",
          "Oscillations","Waves"
        ]
      }],
      "Chemistry": [{
        id:"class11-chemistry-ncert", title:"Chemistry Part-I & Part-II", author:"NCERT",
        chapters:[
          "Some Basic Concepts of Chemistry","Structure of Atom",
          "Classification of Elements and Periodicity in Properties",
          "Chemical Bonding and Molecular Structure","Thermodynamics",
          "Equilibrium","Redox Reactions",
          "Organic Chemistry – Some Basic Principles and Techniques",
          "Hydrocarbons","States of Matter","Hydrogen","The s-Block Elements",
          "Environmental Chemistry"
        ]
      }]
    },
    "Class 12": {
      "Mathematics": [{
        id:"class12-maths-ncert", title:"Mathematics Part-I & Part-II", author:"NCERT",
        chapters:[
          "Relations and Functions","Inverse Trigonometric Functions","Matrices",
          "Determinants","Continuity and Differentiability",
          "Application of Derivatives","Integrals","Application of Integrals",
          "Differential Equations","Vector Algebra","Three Dimensional Geometry",
          "Linear Programming","Probability"
        ]
      }],
      "Physics": [{
        id:"class12-physics-ncert", title:"Physics Part-I & Part-II", author:"NCERT",
        chapters:[
          "Electric Charges and Fields","Electrostatic Potential and Capacitance",
          "Current Electricity","Moving Charges and Magnetism","Magnetism and Matter",
          "Electromagnetic Induction","Alternating Current","Electromagnetic Waves",
          "Ray Optics and Optical Instruments","Wave Optics",
          "Dual Nature of Radiation and Matter","Atoms","Nuclei","Semiconductor Electronics"
        ]
      }],
      "Chemistry": [{
        id:"class12-chemistry-ncert", title:"Chemistry Part-I & Part-II", author:"NCERT",
        chapters:[
          "Solutions","Electrochemistry","Chemical Kinetics",
          "The d- and f-Block Elements","Coordination Compounds",
          "Haloalkanes and Haloarenes","Alcohols, Phenols and Ethers",
          "Aldehydes, Ketones and Carboxylic Acids","Amines",
          "Biomolecules","Polymers","Chemistry in Everyday Life"
        ]
      }]
    }
  }
};

module.exports.NEXORA_UNIVERSAL_CURATED_CATALOGUE =
  NEXORA_UNIVERSAL_CURATED_CATALOGUE;
