type Answer = {
  id: number;
  name: string;
  score: string;
  answer_type: string;
  answer: string;
  identifier: string;
};

export type ppiSnapshots = {
  id: number;
  name: string;
  account_id: string;
  device_id: string;
  created: string;
  updated: string;
  scores: {
    privacy: number;
    openness: number;
    neuroticism: number;
    investment_style: number;
    conscientiousness: number;
    extrovert: number;
    objective: number;
    current_question_id: string;
    max_risk_score: number;
    suitability: number;
    answers: Answer[];
  };
};

export type ppiQuestions = {
  question_id: string;
  question_type: string;
  question: string;
  section: string;
  hints: any;
  answers: Answer[];
};
