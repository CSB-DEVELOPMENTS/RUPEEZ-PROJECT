export type Participant = {
  name: string;
  email: string;
  initials: string;
  accentClassName: string;
};

export type Goal = {
  name: string;
  category: string;
  categoryTag?: string;
  type: "Personal" | "Shared";
  saved: number;
  target: number;
  progress: number;
  deadline: string;
  daysLeft: string;
  insight: string;
  badgeTone: "purple" | "blue" | "neutral";
};
