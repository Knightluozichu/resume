import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "What Is the EVM?",
  "Comparison with Existing Technology",
  "What Are Other Blockchains Doing?",
  "The EVM Instruction Set (Bytecode Operations)",
  "Arithmetic operations",
  "Stack operations",
] as const;

export function Met214EthereumVirtualMachineFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第14章：以太坊虚拟机"
      concepts={concepts}
      accent="#7e22ce"
      view="state"
    />
  );
}

export function Met214EthereumVirtualMachineExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第14章：以太坊虚拟机"
      concepts={concepts}
      accent="#7e22ce"
      view="execution"
    />
  );
}

export function Met214EthereumVirtualMachineEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第14章：以太坊虚拟机"
      concepts={concepts}
      accent="#7e22ce"
      view="evidence"
    />
  );
}
