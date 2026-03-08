// Project configuration type definitions
export type ProjectVariant =
  | 'project2-type1'
  | 'project2-type2'
  | 'project2-type3'
  | 'project2-random';


// Add server address; use the local URL for development
// export const BASE_API_URL = '';
export const BASE_API_URL = 'http://127.0.0.1:4001/api';


// Current project variant — change this variable to switch configurations
export let CURRENT_PROJECT_VARIANT: ProjectVariant = 'project2-random';

// Whether to collect user data
export const IS_COLLECT_DATA = false;


export interface ProjectConfig {
  // Page 6 configuration
  page6: {
    // Whether to show AI's Answer panel
    showAiAnswers: boolean;
    // Number of AI answers to display
    aiAnswerCount: number;
  };
  page5:{
    // Whether answering questions is required
    isRequired: boolean;
  };
  // API configuration
  api: {
    // File name saved to the backend
    fileName: string;
  };
}

type ConcreteProjectVariant = Exclude<ProjectVariant, 'project2-random'>;

// Three project configurations
export const PROJECT_CONFIGS: Record<ConcreteProjectVariant, ProjectConfig> = {
  'project2-type1': {
    page6: {
      showAiAnswers: true,
      aiAnswerCount: 1,
    },
    page5: {
      isRequired: true,
    },
    api: {
      fileName: 'project2-type1',
    },
  },
  'project2-type2': {
    page6: {
      showAiAnswers: false,
      aiAnswerCount: 0,
    },
    page5: {
      isRequired: true,
    },
    api: {
      fileName: 'project2-type2',
    },
  },
  'project2-type3': {
    page6: {
      showAiAnswers: true,
      aiAnswerCount: 3,
    },
    page5: {
      isRequired: true,
    },
    api: {
      fileName: 'project2-type3',
    },
  },
};


// Get the current project configuration
export const getCurrentConfig = (): ProjectConfig => {
  if (CURRENT_PROJECT_VARIANT === 'project2-random') {
    const SESSION_KEY = 'project2_random_variant';
    let resolved = sessionStorage.getItem(SESSION_KEY) as ConcreteProjectVariant | null;
    if (!resolved) {
      const variants: ConcreteProjectVariant[] = ['project2-type1', 'project2-type2', 'project2-type3'];
      resolved = variants[Math.floor(Math.random() * variants.length)];
      sessionStorage.setItem(SESSION_KEY, resolved);
    }
    return PROJECT_CONFIGS[resolved];
  }
  return PROJECT_CONFIGS[CURRENT_PROJECT_VARIANT];
};
