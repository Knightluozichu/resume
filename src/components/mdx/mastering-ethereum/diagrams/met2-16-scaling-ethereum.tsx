import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "The Problems of Ethereum's Layer 1",
  "The Scalability Trilemma",
  "Gas Costs and Network Congestion",
  "State Growth and Storage Issues",
  "Block Propagation and MEV",
  "Solutions",
] as const;

export function Met216ScalingEthereumFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第16章：扩展以太坊"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Met216ScalingEthereumExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第16章：扩展以太坊"
      concepts={concepts}
      accent="#047857"
      view="execution"
    />
  );
}

export function Met216ScalingEthereumEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第16章：扩展以太坊"
      concepts={concepts}
      accent="#047857"
      view="evidence"
    />
  );
}
