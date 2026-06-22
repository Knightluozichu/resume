export type GameEngineChapter =
  | "intro"
  | "tools"
  | "software"
  | "parallel"
  | "math"
  | "support"
  | "resources"
  | "loop"
  | "hid"
  | "debug"
  | "rendering"
  | "animation"
  | "physics"
  | "audio"
  | "gameplay"
  | "runtime"
  | "more";

export type AnatomyTone = "data" | "risk" | "wait" | "output" | "neutral";

export type AnatomyLane = {
  id: string;
  label: string;
  y: number;
};

export type AnatomyNode = {
  id: string;
  label: string;
  note: string;
  lane: string;
  x: number;
  tone?: AnatomyTone;
  step?: 1 | 2 | 3;
};

export type AnatomyEdge = {
  from: string;
  to: string;
  label?: string;
  tone?: AnatomyTone;
  step?: 1 | 2 | 3;
};

export type AnatomyRisk = {
  label: string;
  x: number;
  y: number;
  tone: "risk" | "wait";
  step?: 1 | 2 | 3;
};

export type AnatomyStep = {
  title: string;
  focus: string;
};

export type GameEngineAnatomySpec = {
  title: string;
  subtitle: string;
  lanes: AnatomyLane[];
  nodes: AnatomyNode[];
  edges: AnatomyEdge[];
  risks: AnatomyRisk[];
  steps: [AnatomyStep, AnatomyStep, AnatomyStep];
};
