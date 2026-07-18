import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "History",
  "Definition and Properties",
  "How Ethereum Uses Zero-Knowledge Proofs",
  "L2s Also Benefit from ZK",
  "A Small Example",
  "Let's Prove It",
] as const;

export function Met217ZeroKnowledgeProofsFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第17章：零知识证明"
      concepts={concepts}
      accent="#6d28d9"
      view="state"
    />
  );
}

export function Met217ZeroKnowledgeProofsExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第17章：零知识证明"
      concepts={concepts}
      accent="#6d28d9"
      view="execution"
    />
  );
}

export function Met217ZeroKnowledgeProofsEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第17章：零知识证明"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
