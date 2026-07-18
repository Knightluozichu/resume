import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "DeFi Versus Traditional Finance",
  "DeFi Primitives",
  "Acceptability of Tokens in DeFi",
  "Decentralized Exchanges",
  "The Evolution of DEXs",
  "Impermanent Loss",
] as const;

export function Met213DecentralizedFinanceFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第13章：去中心化金融"
      concepts={concepts}
      accent="#15803d"
      view="state"
    />
  );
}

export function Met213DecentralizedFinanceExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第13章：去中心化金融"
      concepts={concepts}
      accent="#15803d"
      view="execution"
    />
  );
}

export function Met213DecentralizedFinanceEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第13章：去中心化金融"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
