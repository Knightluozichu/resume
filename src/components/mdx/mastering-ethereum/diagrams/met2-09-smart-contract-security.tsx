import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Security Best Practices",
  "Security Risks and Antipatterns",
  "Reentrancy",
  "The vulnerability",
  "Beyond the Classic Reentrancy Pattern",
  "Preventative techniques",
] as const;

export function Met209SmartContractSecurityFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第9章：智能合约安全"
      concepts={concepts}
      accent="#be123c"
      view="state"
    />
  );
}

export function Met209SmartContractSecurityExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第9章：智能合约安全"
      concepts={concepts}
      accent="#be123c"
      view="execution"
    />
  );
}

export function Met209SmartContractSecurityEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第9章：智能合约安全"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
