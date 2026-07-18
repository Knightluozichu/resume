import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Why Oracles Are Needed",
  "Oracle Use Cases and Examples",
  "Oracle Design Patterns",
  "Immediate-Read",
  "Publish-Subscribe",
  "Request-Response",
] as const;

export function Met211OraclesFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第11章：预言机"
      concepts={concepts}
      accent="#c2410c"
      view="state"
    />
  );
}

export function Met211OraclesExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第11章：预言机"
      concepts={concepts}
      accent="#c2410c"
      view="execution"
    />
  );
}

export function Met211OraclesEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第11章：预言机"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
