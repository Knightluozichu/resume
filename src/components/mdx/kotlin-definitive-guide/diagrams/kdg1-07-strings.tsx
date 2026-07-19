import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "7. Strings";
const focus = "掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "7. Strings",
    stage: "声明合同",
    mechanism:
      "7. Strings服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "7. Strings使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extracting Substrings",
    stage: "建立输入",
    mechanism:
      "Extracting Substrings服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Extracting Substrings使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "substring",
    stage: "执行转换",
    mechanism:
      "substring服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "substring使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "split",
    stage: "观察产物",
    mechanism:
      "split服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成独立复核。",
    probe:
      "split使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "String Manipulation",
    stage: "断言回归",
    mechanism:
      "String Manipulation服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "String Manipulation使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Strings are immutable",
    stage: "声明合同",
    mechanism:
      "Strings are immutable服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Strings are immutable使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "String Comparison",
    stage: "建立输入",
    mechanism:
      "String Comparison服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "String Comparison使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Unicode",
    stage: "执行转换",
    mechanism:
      "For the More Curious: Unicode服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "For the More Curious: Unicode使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Traversing a String’s Characters",
    stage: "观察产物",
    mechanism:
      "For the More Curious: Traversing a String’s Characters服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "For the More Curious: Traversing a String’s Characters使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Improving DragonSpeak",
    stage: "断言回归",
    mechanism:
      "Challenge: Improving DragonSpeak服务于掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战，不是一次示例输出。",
    probe:
      "Challenge: Improving DragonSpeak使用输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "按UTF-16索引误判用户可见字符，或忽略区域与大小写规则",
  evidence: "输入样本、Unicode码点说明、转换管线、比较断言和DragonSpeak挑战",
  boundary:
    "掌握子串、split、不可变转换、比较、Unicode与字符遍历的边界的最小合法输入与第一个非法输入",
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
