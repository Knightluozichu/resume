import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "11. Maps";
const focus = "用键值合同创建、读取、添加和修改Map，并区分缺键与可空值";
const stages = ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"];
const nodes = [
  {
    label: "11. Maps",
    stage: "固定初态",
    mechanism:
      "11. Maps服务于用键值合同创建、读取、添加和修改Map，并区分缺键与可空值。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由键空间说明、缺键样例、更新前后快照、守卫规则与断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "11. Maps使用键空间说明、缺键样例、更新前后快照、守卫规则与断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Creating a Map",
    stage: "施加动作",
    mechanism:
      "Creating a Map服务于用键值合同创建、读取、添加和修改Map，并区分缺键与可空值。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由键空间说明、缺键样例、更新前后快照、守卫规则与断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Creating a Map使用键空间说明、缺键样例、更新前后快照、守卫规则与断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Accessing Map Values",
    stage: "推进状态",
    mechanism:
      "Accessing Map Values服务于用键值合同创建、读取、添加和修改Map，并区分缺键与可空值。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由键空间说明、缺键样例、更新前后快照、守卫规则与断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Accessing Map Values使用键空间说明、缺键样例、更新前后快照、守卫规则与断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Adding Entries to a Map",
    stage: "观察差异",
    mechanism:
      "Adding Entries to a Map服务于用键值合同创建、读取、添加和修改Map，并区分缺键与可空值。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由键空间说明、缺键样例、更新前后快照、守卫规则与断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Adding Entries to a Map使用键空间说明、缺键样例、更新前后快照、守卫规则与断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Modifying Map Values",
    stage: "复位重放",
    mechanism:
      "Modifying Map Values服务于用键值合同创建、读取、添加和修改Map，并区分缺键与可空值。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由键空间说明、缺键样例、更新前后快照、守卫规则与断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Modifying Map Values使用键空间说明、缺键样例、更新前后快照、守卫规则与断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Tavern Bouncer",
    stage: "固定初态",
    mechanism:
      "Challenge: Tavern Bouncer服务于用键值合同创建、读取、添加和修改Map，并区分缺键与可空值。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是键空间说明、缺键样例、更新前后快照、守卫规则与断言，不是一次示例输出。",
    probe:
      "Challenge: Tavern Bouncer使用键空间说明、缺键样例、更新前后快照、守卫规则与断言完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "用键值合同创建、读取、添加和修改Map，并区分缺键与可空值的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "用get返回null同时表示缺键和实际空值，掩盖数据状态",
  evidence: "键空间说明、缺键样例、更新前后快照、守卫规则与断言",
  boundary:
    "用键值合同创建、读取、添加和修改Map，并区分缺键与可空值的最小合法输入与第一个非法输入",
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
