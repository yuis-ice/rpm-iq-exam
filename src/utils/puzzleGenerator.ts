import { Level, Puzzle, Pattern, Shape } from '../types/game';

const shapeTypes: Shape['type'][] = ['circle', 'square', 'triangle', 'diamond', 'cross', 'star'];
const sizes: Shape['size'][] = ['small', 'medium', 'large'];
const colors: Shape['color'][] = ['black', 'gray', 'white'];

// Helper function to create a random shape
const createRandomShape = (overrides: Partial<Shape> = {}): Shape => {
  return {
    type: overrides.type || shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    size: overrides.size || sizes[Math.floor(Math.random() * sizes.length)],
    color: overrides.color || colors[Math.floor(Math.random() * colors.length)],
    rotation: overrides.rotation || 0,
    position: overrides.position || { x: 0.5, y: 0.5 },
    ...overrides
  };
};

// Helper function to clone a pattern
const clonePattern = (pattern: Pattern): Pattern => {
  return {
    shapes: pattern.shapes.map(shape => ({ ...shape }))
  };
};

// Generate Level 1 puzzles - Simple transformations
const generateLevel1Puzzle = (puzzleIndex: number): Puzzle => {
  const puzzles = [
    // Puzzle 1: Size progression
    () => {
      const baseShape = createRandomShape({ position: { x: 0.5, y: 0.5 } });
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...baseShape, size: 'small' }] },
          { shapes: [{ ...baseShape, size: 'medium' }] },
          { shapes: [{ ...baseShape, size: 'large' }] }
        ],
        [
          { shapes: [{ ...baseShape, size: 'medium' }] },
          { shapes: [{ ...baseShape, size: 'large' }] },
          { shapes: [{ ...baseShape, size: 'small' }] }
        ],
        [
          { shapes: [{ ...baseShape, size: 'large' }] },
          { shapes: [{ ...baseShape, size: 'small' }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...baseShape, size: 'medium' }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...baseShape, size: 'small' }] },
        { shapes: [{ ...baseShape, size: 'large' }] },
        { shapes: [{ ...baseShape, type: 'circle' }] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 2: Shape rotation
    () => {
      const baseShape = createRandomShape({ type: 'triangle', position: { x: 0.5, y: 0.5 } });
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...baseShape, rotation: 0 }] },
          { shapes: [{ ...baseShape, rotation: 90 }] },
          { shapes: [{ ...baseShape, rotation: 180 }] }
        ],
        [
          { shapes: [{ ...baseShape, rotation: 90 }] },
          { shapes: [{ ...baseShape, rotation: 180 }] },
          { shapes: [{ ...baseShape, rotation: 270 }] }
        ],
        [
          { shapes: [{ ...baseShape, rotation: 180 }] },
          { shapes: [{ ...baseShape, rotation: 270 }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...baseShape, rotation: 0 }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...baseShape, rotation: 90 }] },
        { shapes: [{ ...baseShape, rotation: 180 }] },
        { shapes: [{ ...baseShape, rotation: 270 }] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 3: Color progression
    () => {
      const baseShape = createRandomShape({ position: { x: 0.5, y: 0.5 } });
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...baseShape, color: 'black' }] },
          { shapes: [{ ...baseShape, color: 'gray' }] },
          { shapes: [{ ...baseShape, color: 'white' }] }
        ],
        [
          { shapes: [{ ...baseShape, color: 'gray' }] },
          { shapes: [{ ...baseShape, color: 'white' }] },
          { shapes: [{ ...baseShape, color: 'black' }] }
        ],
        [
          { shapes: [{ ...baseShape, color: 'white' }] },
          { shapes: [{ ...baseShape, color: 'black' }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...baseShape, color: 'gray' }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...baseShape, color: 'black' }] },
        { shapes: [{ ...baseShape, color: 'white' }] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 4: Shape sequence
    () => {
      const shapes = [
        createRandomShape({ type: 'circle', position: { x: 0.5, y: 0.5 } }),
        createRandomShape({ type: 'square', position: { x: 0.5, y: 0.5 } }),
        createRandomShape({ type: 'triangle', position: { x: 0.5, y: 0.5 } })
      ];
      
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [shapes[0]] },
          { shapes: [shapes[1]] },
          { shapes: [shapes[2]] }
        ],
        [
          { shapes: [shapes[1]] },
          { shapes: [shapes[2]] },
          { shapes: [shapes[0]] }
        ],
        [
          { shapes: [shapes[2]] },
          { shapes: [shapes[0]] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [shapes[1]] };
      const options = [
        correctAnswer,
        { shapes: [shapes[0]] },
        { shapes: [shapes[2]] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 5: Addition pattern
    () => {
      const shape1 = createRandomShape({ position: { x: 0.3, y: 0.5 } });
      const shape2 = createRandomShape({ position: { x: 0.7, y: 0.5 } });
      
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [shape1] },
          { shapes: [shape2] },
          { shapes: [shape1, shape2] }
        ],
        [
          { shapes: [shape2] },
          { shapes: [shape1] },
          { shapes: [shape1, shape2] }
        ],
        [
          { shapes: [shape1] },
          { shapes: [shape2] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [shape1, shape2] };
      const options = [
        correctAnswer,
        { shapes: [shape1] },
        { shapes: [shape2] },
        { shapes: [createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    }
  ];

  return puzzles[puzzleIndex % puzzles.length]();
};

// Generate Level 2 puzzles - Medium complexity
const generateLevel2Puzzle = (puzzleIndex: number): Puzzle => {
  const puzzles = [
    // Puzzle 1: Two-rule progression (size + rotation)
    () => {
      const baseShape = createRandomShape({ type: 'diamond', position: { x: 0.5, y: 0.5 } });
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...baseShape, size: 'small', rotation: 0 }] },
          { shapes: [{ ...baseShape, size: 'medium', rotation: 45 }] },
          { shapes: [{ ...baseShape, size: 'large', rotation: 90 }] }
        ],
        [
          { shapes: [{ ...baseShape, size: 'medium', rotation: 45 }] },
          { shapes: [{ ...baseShape, size: 'large', rotation: 90 }] },
          { shapes: [{ ...baseShape, size: 'small', rotation: 135 }] }
        ],
        [
          { shapes: [{ ...baseShape, size: 'large', rotation: 90 }] },
          { shapes: [{ ...baseShape, size: 'small', rotation: 135 }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...baseShape, size: 'medium', rotation: 180 }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...baseShape, size: 'medium', rotation: 45 }] },
        { shapes: [{ ...baseShape, size: 'large', rotation: 180 }] },
        { shapes: [{ ...baseShape, size: 'small', rotation: 180 }] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 2: Multiple shapes with different rules
    () => {
      const shape1 = createRandomShape({ type: 'circle', position: { x: 0.3, y: 0.3 } });
      const shape2 = createRandomShape({ type: 'square', position: { x: 0.7, y: 0.7 } });
      
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...shape1, size: 'small' }, { ...shape2, size: 'large' }] },
          { shapes: [{ ...shape1, size: 'medium' }, { ...shape2, size: 'medium' }] },
          { shapes: [{ ...shape1, size: 'large' }, { ...shape2, size: 'small' }] }
        ],
        [
          { shapes: [{ ...shape1, size: 'medium' }, { ...shape2, size: 'medium' }] },
          { shapes: [{ ...shape1, size: 'large' }, { ...shape2, size: 'small' }] },
          { shapes: [{ ...shape1, size: 'small' }, { ...shape2, size: 'large' }] }
        ],
        [
          { shapes: [{ ...shape1, size: 'large' }, { ...shape2, size: 'small' }] },
          { shapes: [{ ...shape1, size: 'small' }, { ...shape2, size: 'large' }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...shape1, size: 'medium' }, { ...shape2, size: 'medium' }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...shape1, size: 'large' }, { ...shape2, size: 'small' }] },
        { shapes: [{ ...shape1, size: 'small' }, { ...shape2, size: 'large' }] },
        { shapes: [{ ...shape1, size: 'medium' }, { ...shape2, size: 'large' }] },
        { shapes: [createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 3: Color and shape progression
    () => {
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [createRandomShape({ type: 'circle', color: 'black', position: { x: 0.5, y: 0.5 } })] },
          { shapes: [createRandomShape({ type: 'square', color: 'gray', position: { x: 0.5, y: 0.5 } })] },
          { shapes: [createRandomShape({ type: 'triangle', color: 'white', position: { x: 0.5, y: 0.5 } })] }
        ],
        [
          { shapes: [createRandomShape({ type: 'square', color: 'gray', position: { x: 0.5, y: 0.5 } })] },
          { shapes: [createRandomShape({ type: 'triangle', color: 'white', position: { x: 0.5, y: 0.5 } })] },
          { shapes: [createRandomShape({ type: 'circle', color: 'black', position: { x: 0.5, y: 0.5 } })] }
        ],
        [
          { shapes: [createRandomShape({ type: 'triangle', color: 'white', position: { x: 0.5, y: 0.5 } })] },
          { shapes: [createRandomShape({ type: 'circle', color: 'black', position: { x: 0.5, y: 0.5 } })] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [createRandomShape({ type: 'square', color: 'gray', position: { x: 0.5, y: 0.5 } })] };
      const options = [
        correctAnswer,
        { shapes: [createRandomShape({ type: 'circle', color: 'gray', position: { x: 0.5, y: 0.5 } })] },
        { shapes: [createRandomShape({ type: 'square', color: 'black', position: { x: 0.5, y: 0.5 } })] },
        { shapes: [createRandomShape({ type: 'triangle', color: 'gray', position: { x: 0.5, y: 0.5 } })] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 4: Position and rotation
    () => {
      const baseShape = createRandomShape({ type: 'star' });
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...baseShape, position: { x: 0.3, y: 0.3 }, rotation: 0 }] },
          { shapes: [{ ...baseShape, position: { x: 0.7, y: 0.3 }, rotation: 60 }] },
          { shapes: [{ ...baseShape, position: { x: 0.5, y: 0.7 }, rotation: 120 }] }
        ],
        [
          { shapes: [{ ...baseShape, position: { x: 0.7, y: 0.3 }, rotation: 60 }] },
          { shapes: [{ ...baseShape, position: { x: 0.5, y: 0.7 }, rotation: 120 }] },
          { shapes: [{ ...baseShape, position: { x: 0.3, y: 0.3 }, rotation: 180 }] }
        ],
        [
          { shapes: [{ ...baseShape, position: { x: 0.5, y: 0.7 }, rotation: 120 }] },
          { shapes: [{ ...baseShape, position: { x: 0.3, y: 0.3 }, rotation: 180 }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...baseShape, position: { x: 0.7, y: 0.3 }, rotation: 240 }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...baseShape, position: { x: 0.7, y: 0.3 }, rotation: 60 }] },
        { shapes: [{ ...baseShape, position: { x: 0.5, y: 0.5 }, rotation: 240 }] },
        { shapes: [{ ...baseShape, position: { x: 0.7, y: 0.7 }, rotation: 240 }] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 5: Complex addition/subtraction
    () => {
      const shape1 = createRandomShape({ type: 'circle', position: { x: 0.25, y: 0.5 } });
      const shape2 = createRandomShape({ type: 'square', position: { x: 0.75, y: 0.5 } });
      const shape3 = createRandomShape({ type: 'triangle', position: { x: 0.5, y: 0.25 } });
      
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [shape1, shape3] },
          { shapes: [shape2] },
          { shapes: [shape1, shape2, shape3] }
        ],
        [
          { shapes: [shape2, shape3] },
          { shapes: [shape1] },
          { shapes: [shape1, shape2, shape3] }
        ],
        [
          { shapes: [shape1] },
          { shapes: [shape2, shape3] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [shape1, shape2, shape3] };
      const options = [
        correctAnswer,
        { shapes: [shape1, shape2] },
        { shapes: [shape2, shape3] },
        { shapes: [shape1, shape3] },
        { shapes: [shape1] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    }
  ];

  return puzzles[puzzleIndex % puzzles.length]();
};

// Generate Level 3 puzzles - High complexity
const generateLevel3Puzzle = (puzzleIndex: number): Puzzle => {
  const puzzles = [
    // Puzzle 1: Complex three-variable progression
    () => {
      const baseShape = createRandomShape({ type: 'cross' });
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...baseShape, size: 'small', color: 'black', rotation: 0, position: { x: 0.5, y: 0.5 } }] },
          { shapes: [{ ...baseShape, size: 'medium', color: 'gray', rotation: 45, position: { x: 0.5, y: 0.5 } }] },
          { shapes: [{ ...baseShape, size: 'large', color: 'white', rotation: 90, position: { x: 0.5, y: 0.5 } }] }
        ],
        [
          { shapes: [{ ...baseShape, size: 'medium', color: 'gray', rotation: 45, position: { x: 0.5, y: 0.5 } }] },
          { shapes: [{ ...baseShape, size: 'large', color: 'white', rotation: 90, position: { x: 0.5, y: 0.5 } }] },
          { shapes: [{ ...baseShape, size: 'small', color: 'black', rotation: 135, position: { x: 0.5, y: 0.5 } }] }
        ],
        [
          { shapes: [{ ...baseShape, size: 'large', color: 'white', rotation: 90, position: { x: 0.5, y: 0.5 } }] },
          { shapes: [{ ...baseShape, size: 'small', color: 'black', rotation: 135, position: { x: 0.5, y: 0.5 } }] },
          null
        ]
      ];
      
      const correctAnswer = { shapes: [{ ...baseShape, size: 'medium', color: 'gray', rotation: 180, position: { x: 0.5, y: 0.5 } }] };
      const options = [
        correctAnswer,
        { shapes: [{ ...baseShape, size: 'medium', color: 'black', rotation: 180, position: { x: 0.5, y: 0.5 } }] },
        { shapes: [{ ...baseShape, size: 'large', color: 'gray', rotation: 180, position: { x: 0.5, y: 0.5 } }] },
        { shapes: [{ ...baseShape, size: 'medium', color: 'gray', rotation: 135, position: { x: 0.5, y: 0.5 } }] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Puzzle 2: Complex multi-shape interaction
    () => {
      const shape1 = createRandomShape({ type: 'circle' });
      const shape2 = createRandomShape({ type: 'square' });
      const shape3 = createRandomShape({ type: 'triangle' });
      
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...shape1, position: { x: 0.3, y: 0.3 }, size: 'small' }] },
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'small' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'medium' }
          ]},
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'small' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'medium' },
            { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'large' }
          ]}
        ],
        [
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'medium' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'small' }
          ]},
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'medium' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'small' },
            { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'large' }
          ]},
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'medium' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'small' },
            { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'large' },
            { ...shape1, position: { x: 0.7, y: 0.7 }, size: 'small' }
          ]}
        ],
        [
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'large' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'medium' },
            { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'small' }
          ]},
          { shapes: [
            { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'large' },
            { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'medium' },
            { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'small' },
            { ...shape2, position: { x: 0.3, y: 0.7 }, size: 'large' }
          ]},
          null
        ]
      ];
      
      const correctAnswer = { shapes: [
        { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'large' },
        { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'medium' },
        { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'small' },
        { ...shape2, position: { x: 0.3, y: 0.7 }, size: 'large' },
        { ...shape3, position: { x: 0.7, y: 0.7 }, size: 'medium' }
      ]};
      
      const options = [
        correctAnswer,
        { shapes: [
          { ...shape1, position: { x: 0.3, y: 0.3 }, size: 'large' },
          { ...shape2, position: { x: 0.7, y: 0.3 }, size: 'medium' },
          { ...shape3, position: { x: 0.5, y: 0.7 }, size: 'small' }
        ]},
        { shapes: [createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Add 3 more complex puzzles...
    () => generateLevel2Puzzle(0), // Fallback to level 2 type
    () => generateLevel2Puzzle(1), // Fallback to level 2 type  
    () => generateLevel2Puzzle(2)  // Fallback to level 2 type
  ];

  return puzzles[puzzleIndex % puzzles.length]();
};

// Generate Level 4 puzzles - Hell difficulty (IQ 145+)
const generateLevel4Puzzle = (puzzleIndex: number): Puzzle => {
  const puzzles = [
    // Puzzle 1: Recursive transformation with multiple rules
    () => {
      const baseShape1 = createRandomShape({ type: 'circle', position: { x: 0.25, y: 0.25 } });
      const baseShape2 = createRandomShape({ type: 'square', position: { x: 0.75, y: 0.25 } });
      const baseShape3 = createRandomShape({ type: 'triangle', position: { x: 0.25, y: 0.75 } });
      const baseShape4 = createRandomShape({ type: 'diamond', position: { x: 0.75, y: 0.75 } });
      
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [
            { ...baseShape1, size: 'small', color: 'black', rotation: 0 },
            { ...baseShape2, size: 'large', color: 'white', rotation: 45 }
          ]},
          { shapes: [
            { ...baseShape1, size: 'medium', color: 'gray', rotation: 90 },
            { ...baseShape2, size: 'medium', color: 'black', rotation: 90 },
            { ...baseShape3, size: 'small', color: 'white', rotation: 0 }
          ]},
          { shapes: [
            { ...baseShape1, size: 'large', color: 'white', rotation: 180 },
            { ...baseShape2, size: 'small', color: 'gray', rotation: 135 },
            { ...baseShape3, size: 'medium', color: 'black', rotation: 120 },
            { ...baseShape4, size: 'small', color: 'white', rotation: 0 }
          ]}
        ],
        [
          { shapes: [
            { ...baseShape2, size: 'medium', color: 'gray', rotation: 45 },
            { ...baseShape3, size: 'large', color: 'black', rotation: 60 }
          ]},
          { shapes: [
            { ...baseShape2, size: 'large', color: 'white', rotation: 90 },
            { ...baseShape3, size: 'medium', color: 'gray', rotation: 120 },
            { ...baseShape4, size: 'small', color: 'black', rotation: 45 }
          ]},
          { shapes: [
            { ...baseShape2, size: 'small', color: 'black', rotation: 135 },
            { ...baseShape3, size: 'small', color: 'white', rotation: 180 },
            { ...baseShape4, size: 'medium', color: 'gray', rotation: 90 },
            { ...baseShape1, size: 'large', color: 'black', rotation: 270 }
          ]}
        ],
        [
          { shapes: [
            { ...baseShape3, size: 'large', color: 'white', rotation: 60 },
            { ...baseShape4, size: 'medium', color: 'black', rotation: 90 }
          ]},
          { shapes: [
            { ...baseShape3, size: 'small', color: 'black', rotation: 120 },
            { ...baseShape4, size: 'large', color: 'gray', rotation: 135 },
            { ...baseShape1, size: 'medium', color: 'white', rotation: 180 }
          ]},
          null
        ]
      ];
      
      const correctAnswer = { shapes: [
        { ...baseShape3, size: 'medium', color: 'gray', rotation: 180 },
        { ...baseShape4, size: 'small', color: 'white', rotation: 180 },
        { ...baseShape1, size: 'large', color: 'black', rotation: 270 },
        { ...baseShape2, size: 'medium', color: 'gray', rotation: 225 }
      ]};
      
      const options = [
        correctAnswer,
        { shapes: [
          { ...baseShape3, size: 'large', color: 'gray', rotation: 180 },
          { ...baseShape4, size: 'small', color: 'white', rotation: 180 }
        ]},
        { shapes: [
          { ...baseShape3, size: 'medium', color: 'black', rotation: 180 },
          { ...baseShape4, size: 'medium', color: 'white', rotation: 180 }
        ]},
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Add 4 more hell-level puzzles with similar complexity
    () => generateLevel3Puzzle(0),
    () => generateLevel3Puzzle(1),
    () => generateLevel3Puzzle(0),
    () => generateLevel3Puzzle(1)
  ];

  return puzzles[puzzleIndex % puzzles.length]();
};

// Generate Level 5 puzzles - Celestial difficulty (IQ 150+)
const generateLevel5Puzzle = (puzzleIndex: number): Puzzle => {
  const puzzles = [
    // Puzzle 1: Mathematical sequence with geometric progression
    () => {
      const shapes = [
        createRandomShape({ type: 'circle' }),
        createRandomShape({ type: 'square' }),
        createRandomShape({ type: 'triangle' }),
        createRandomShape({ type: 'diamond' }),
        createRandomShape({ type: 'star' })
      ];
      
      // Fibonacci-like pattern with transformations
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [{ ...shapes[0], position: { x: 0.5, y: 0.5 }, size: 'small', color: 'black' }] },
          { shapes: [{ ...shapes[1], position: { x: 0.5, y: 0.5 }, size: 'small', color: 'black' }] },
          { shapes: [
            { ...shapes[0], position: { x: 0.3, y: 0.5 }, size: 'small', color: 'black' },
            { ...shapes[1], position: { x: 0.7, y: 0.5 }, size: 'small', color: 'gray' }
          ]}
        ],
        [
          { shapes: [{ ...shapes[1], position: { x: 0.5, y: 0.5 }, size: 'medium', color: 'gray' }] },
          { shapes: [
            { ...shapes[0], position: { x: 0.3, y: 0.5 }, size: 'small', color: 'gray' },
            { ...shapes[1], position: { x: 0.7, y: 0.5 }, size: 'medium', color: 'white' }
          ]},
          { shapes: [
            { ...shapes[1], position: { x: 0.2, y: 0.3 }, size: 'medium', color: 'gray' },
            { ...shapes[0], position: { x: 0.5, y: 0.5 }, size: 'small', color: 'white' },
            { ...shapes[1], position: { x: 0.8, y: 0.7 }, size: 'large', color: 'black' }
          ]}
        ],
        [
          { shapes: [
            { ...shapes[0], position: { x: 0.3, y: 0.5 }, size: 'medium', color: 'white' },
            { ...shapes[1], position: { x: 0.7, y: 0.5 }, size: 'large', color: 'black' }
          ]},
          { shapes: [
            { ...shapes[1], position: { x: 0.2, y: 0.3 }, size: 'large', color: 'white' },
            { ...shapes[0], position: { x: 0.5, y: 0.5 }, size: 'medium', color: 'black' },
            { ...shapes[1], position: { x: 0.8, y: 0.7 }, size: 'small', color: 'gray' }
          ]},
          null
        ]
      ];
      
      const correctAnswer = { shapes: [
        { ...shapes[0], position: { x: 0.15, y: 0.2 }, size: 'large', color: 'black' },
        { ...shapes[1], position: { x: 0.4, y: 0.4 }, size: 'medium', color: 'gray' },
        { ...shapes[0], position: { x: 0.6, y: 0.6 }, size: 'small', color: 'white' },
        { ...shapes[1], position: { x: 0.85, y: 0.8 }, size: 'medium', color: 'black' },
        { ...shapes[2], position: { x: 0.5, y: 0.1 }, size: 'small', color: 'gray' }
      ]};
      
      const options = [
        correctAnswer,
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Add 4 more celestial-level puzzles
    () => generateLevel4Puzzle(0),
    () => generateLevel4Puzzle(1),
    () => generateLevel4Puzzle(0),
    () => generateLevel4Puzzle(1)
  ];

  return puzzles[puzzleIndex % puzzles.length]();
};

// Generate Level 6 puzzles - AI difficulty (IQ 160+)
const generateLevel6Puzzle = (puzzleIndex: number): Puzzle => {
  const puzzles = [
    // Puzzle 1: Hyper-complex multi-dimensional transformation
    () => {
      const allShapes = shapeTypes.map(type => createRandomShape({ type }));
      
      // Create an extremely complex pattern with multiple recursive rules
      const matrix: (Pattern | null)[][] = [
        [
          { shapes: [
            { ...allShapes[0], position: { x: 0.2, y: 0.2 }, size: 'small', color: 'black', rotation: 0 },
            { ...allShapes[1], position: { x: 0.8, y: 0.2 }, size: 'medium', color: 'gray', rotation: 60 }
          ]},
          { shapes: [
            { ...allShapes[1], position: { x: 0.2, y: 0.2 }, size: 'medium', color: 'gray', rotation: 60 },
            { ...allShapes[2], position: { x: 0.5, y: 0.5 }, size: 'large', color: 'white', rotation: 120 },
            { ...allShapes[0], position: { x: 0.8, y: 0.8 }, size: 'small', color: 'black', rotation: 180 }
          ]},
          { shapes: [
            { ...allShapes[2], position: { x: 0.2, y: 0.2 }, size: 'large', color: 'white', rotation: 120 },
            { ...allShapes[3], position: { x: 0.4, y: 0.4 }, size: 'small', color: 'black', rotation: 180 },
            { ...allShapes[1], position: { x: 0.6, y: 0.6 }, size: 'medium', color: 'gray', rotation: 240 },
            { ...allShapes[0], position: { x: 0.8, y: 0.8 }, size: 'large', color: 'white', rotation: 300 }
          ]}
        ],
        [
          { shapes: [
            { ...allShapes[3], position: { x: 0.2, y: 0.2 }, size: 'medium', color: 'white', rotation: 90 },
            { ...allShapes[4], position: { x: 0.8, y: 0.2 }, size: 'large', color: 'black', rotation: 150 }
          ]},
          { shapes: [
            { ...allShapes[4], position: { x: 0.2, y: 0.2 }, size: 'large', color: 'black', rotation: 150 },
            { ...allShapes[5], position: { x: 0.5, y: 0.5 }, size: 'small', color: 'gray', rotation: 210 },
            { ...allShapes[3], position: { x: 0.8, y: 0.8 }, size: 'medium', color: 'white', rotation: 270 }
          ]},
          { shapes: [
            { ...allShapes[5], position: { x: 0.2, y: 0.2 }, size: 'small', color: 'gray', rotation: 210 },
            { ...allShapes[0], position: { x: 0.35, y: 0.35 }, size: 'medium', color: 'white', rotation: 270 },
            { ...allShapes[4], position: { x: 0.5, y: 0.5 }, size: 'large', color: 'black', rotation: 330 },
            { ...allShapes[3], position: { x: 0.65, y: 0.65 }, size: 'small', color: 'gray', rotation: 30 },
            { ...allShapes[2], position: { x: 0.8, y: 0.8 }, size: 'medium', color: 'white', rotation: 90 }
          ]}
        ],
        [
          { shapes: [
            { ...allShapes[1], position: { x: 0.2, y: 0.2 }, size: 'large', color: 'gray', rotation: 180 },
            { ...allShapes[2], position: { x: 0.8, y: 0.2 }, size: 'small', color: 'white', rotation: 240 }
          ]},
          { shapes: [
            { ...allShapes[2], position: { x: 0.2, y: 0.2 }, size: 'small', color: 'white', rotation: 240 },
            { ...allShapes[3], position: { x: 0.4, y: 0.4 }, size: 'medium', color: 'black', rotation: 300 },
            { ...allShapes[1], position: { x: 0.6, y: 0.6 }, size: 'large', color: 'gray', rotation: 0 },
            { ...allShapes[4], position: { x: 0.8, y: 0.8 }, size: 'small', color: 'white', rotation: 60 }
          ]},
          null
        ]
      ];
      
      const correctAnswer = { shapes: [
        { ...allShapes[3], position: { x: 0.2, y: 0.2 }, size: 'medium', color: 'black', rotation: 300 },
        { ...allShapes[4], position: { x: 0.3, y: 0.3 }, size: 'large', color: 'white', rotation: 0 },
        { ...allShapes[5], position: { x: 0.4, y: 0.4 }, size: 'small', color: 'gray', rotation: 60 },
        { ...allShapes[2], position: { x: 0.5, y: 0.5 }, size: 'medium', color: 'black', rotation: 120 },
        { ...allShapes[1], position: { x: 0.6, y: 0.6 }, size: 'large', color: 'white', rotation: 180 },
        { ...allShapes[0], position: { x: 0.7, y: 0.7 }, size: 'small', color: 'gray', rotation: 240 },
        { ...allShapes[4], position: { x: 0.8, y: 0.8 }, size: 'medium', color: 'black', rotation: 300 }
      ]};
      
      const options = [
        correctAnswer,
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape()] },
        { shapes: [createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape(), createRandomShape()] }
      ];
      
      const shuffledOptions = shuffleArray(options);
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        JSON.stringify(option) === JSON.stringify(correctAnswer)
      );
      return { matrix, options: shuffledOptions, correctAnswer: correctAnswerIndex };
    },

    // Add 4 more AI-level puzzles
    () => generateLevel5Puzzle(0),
    () => generateLevel5Puzzle(1),
    () => generateLevel5Puzzle(0),
    () => generateLevel5Puzzle(1)
  ];

  return puzzles[puzzleIndex % puzzles.length]();
};

// Shuffle array utility
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generatePuzzle = (level: Level, puzzleIndex: number): Puzzle => {
  switch (level) {
    case 1:
      return generateLevel1Puzzle(puzzleIndex);
    case 2:
      return generateLevel2Puzzle(puzzleIndex);
    case 3:
      return generateLevel3Puzzle(puzzleIndex);
    case 4:
      return generateLevel4Puzzle(puzzleIndex);
    case 5:
      return generateLevel5Puzzle(puzzleIndex);
    case 6:
      return generateLevel6Puzzle(puzzleIndex);
    default:
      return generateLevel1Puzzle(puzzleIndex);
  }
};