import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Ether Currency Units",
  "Choosing an Ethereum Wallet",
  "Control and Responsibility",
  "Getting Started with MetaMask",
  "Creating a Wallet",
  "Switching Networks",
] as const;

export function Met202EthereumBasicsFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第2章：以太坊基础操作"
      concepts={concepts}
      accent="#0284c7"
      view="state"
    />
  );
}

export function Met202EthereumBasicsExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第2章：以太坊基础操作"
      concepts={concepts}
      accent="#0284c7"
      view="execution"
    />
  );
}

export function Met202EthereumBasicsEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第2章：以太坊基础操作"
      concepts={concepts}
      accent="#0284c7"
      view="evidence"
    />
  );
}
