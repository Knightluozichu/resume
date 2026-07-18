import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Ethereum Networks",
  "Should I Run a Full Node?",
  "Full Node Advantages and Disadvantages",
  "Public Testnet Advantages and Disadvantages",
  "Local Blockchain Simulation Advantages and Disadvantages",
  "Running an Ethereum Node",
] as const;

export function Met203EthereumNodesFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第3章：以太坊节点"
      concepts={concepts}
      accent="#0369a1"
      view="state"
    />
  );
}

export function Met203EthereumNodesExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第3章：以太坊节点"
      concepts={concepts}
      accent="#0369a1"
      view="execution"
    />
  );
}

export function Met203EthereumNodesEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第3章：以太坊节点"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
