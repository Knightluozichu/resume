import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "区块链骨骼：密码算法",
  "哈希算法",
  "什么是哈希计算",
  "哈希算法的种类",
  "区块链中的哈希算法",
  "公开密钥算法",
] as const;

export function Bp03CryptographyFlowLab() {
  return (
    <OfficialBpBookLab
      title="第3章 区块链骨骼：密码算法"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp03CryptographyExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第3章 区块链骨骼：密码算法"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp03CryptographyEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第3章 区块链骨骼：密码算法"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
