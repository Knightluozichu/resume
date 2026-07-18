import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Vulnerabilities and Vyper",
  "Comparison to Solidity",
  "Modifiers",
  "Class Inheritance",
  "Inline Assembly",
  "Function Overloading",
] as const;

export function Met208SmartContractsVyperFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第8章：智能合约与Vyper"
      concepts={concepts}
      accent="#4338ca"
      view="state"
    />
  );
}

export function Met208SmartContractsVyperExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第8章：智能合约与Vyper"
      concepts={concepts}
      accent="#4338ca"
      view="execution"
    />
  );
}

export function Met208SmartContractsVyperEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第8章：智能合约与Vyper"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
