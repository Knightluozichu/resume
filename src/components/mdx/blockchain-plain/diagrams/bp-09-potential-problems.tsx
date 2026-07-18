import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "潜在的问题",
  "两个哭泣的婴儿：软分叉与硬分叉",
  "达摩克利斯剑：51%攻击",
  "简单的代价：轻钱包的易攻击性",
  "忘了保险箱密码：私钥丢失",
  "重放攻击：交易延展性",
] as const;

export function Bp09PotentialProblemsFlowLab() {
  return (
    <OfficialBpBookLab
      title="第9章 潜在的问题"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp09PotentialProblemsExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第9章 潜在的问题"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp09PotentialProblemsEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第9章 潜在的问题"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
