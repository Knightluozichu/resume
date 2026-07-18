import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Ethereum Compared to Bitcoin",
  "Components of a Blockchain",
  "The Birth of Ethereum",
  "Ethereum’s Stages of Development",
  "Ethereum: A General-Purpose Blockchain",
  "Ethereum’s Components",
] as const;

export function Met201WhatIsEthereumFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第1章：什么是以太坊"
      concepts={concepts}
      accent="#2563eb"
      view="state"
    />
  );
}

export function Met201WhatIsEthereumExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第1章：什么是以太坊"
      concepts={concepts}
      accent="#2563eb"
      view="execution"
    />
  );
}

export function Met201WhatIsEthereumEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第1章：什么是以太坊"
      concepts={concepts}
      accent="#2563eb"
      view="evidence"
    />
  );
}
