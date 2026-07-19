import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "附录A 补充挑战练习";
const focus =
  "把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "A. More Challenges",
    stage: "声明合同",
    mechanism:
      "A. More Challenges服务于把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是挑战清单、约束表、失败测试、复杂度说明和复盘记录，不是一次示例输出。",
    probe:
      "A. More Challenges使用挑战清单、约束表、失败测试、复杂度说明和复盘记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Leveling Up with Exercism",
    stage: "建立输入",
    mechanism:
      "Leveling Up with Exercism服务于把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是挑战清单、约束表、失败测试、复杂度说明和复盘记录，不是一次示例输出。",
    probe:
      "Leveling Up with Exercism使用挑战清单、约束表、失败测试、复杂度说明和复盘记录完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "只提交能通过一个样例的代码，没有边界和反例",
  evidence: "挑战清单、约束表、失败测试、复杂度说明和复盘记录",
  boundary:
    "把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习的最小合法输入与第一个非法输入",
} satisfies KdgCausalModel;
const props = { title, focus, stages, nodes, model };

export function KdgModelLab() {
  return <KdgCoverageLab {...props} />;
}

export function KdgFailureLab() {
  return <KdgContractLab {...props} />;
}

export function KdgEvidenceLab() {
  return <KdgRecoveryLab {...props} />;
}
