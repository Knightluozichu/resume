import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "What Is a Smart Contract?",
  "Life Cycle of a Smart Contract",
  "Introduction to Ethereum High-Level Languages",
  "Building a Smart Contract with Solidity",
  "Selecting a Version of Solidity",
  "Downloading and Installing Solidity",
] as const;

export function Met207SmartContractsSolidityFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第7章：智能合约与Solidity"
      concepts={concepts}
      accent="#4f46e5"
      view="state"
    />
  );
}

export function Met207SmartContractsSolidityExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第7章：智能合约与Solidity"
      concepts={concepts}
      accent="#4f46e5"
      view="execution"
    />
  );
}

export function Met207SmartContractsSolidityEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第7章：智能合约与Solidity"
      concepts={concepts}
      accent="#4f46e5"
      view="evidence"
    />
  );
}
