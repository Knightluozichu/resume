import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "3. Conditionals";
const focus = "把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表";
const stages = ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"];
const nodes = [
  {
    label: "3. Conditionals",
    stage: "固定初态",
    mechanism:
      "3. Conditionals服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "3. Conditionals使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "if/else Statements",
    stage: "施加动作",
    mechanism:
      "if/else Statements服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "if/else Statements使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Adding more conditions",
    stage: "推进状态",
    mechanism:
      "Adding more conditions服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "Adding more conditions使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Nested if/else statements",
    stage: "观察差异",
    mechanism:
      "Nested if/else statements服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "Nested if/else statements使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "More elegant conditionals",
    stage: "复位重放",
    mechanism:
      "More elegant conditionals服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "More elegant conditionals使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Logical operators",
    stage: "固定初态",
    mechanism:
      "Logical operators服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "Logical operators使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Conditional expressions",
    stage: "施加动作",
    mechanism:
      "Conditional expressions服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "Conditional expressions使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Removing braces from if/else expressions",
    stage: "推进状态",
    mechanism:
      "Removing braces from if/else expressions服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "Removing braces from if/else expressions使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Ranges",
    stage: "观察差异",
    mechanism:
      "Ranges服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入分区、分支表、边界测试、穷尽性检查和格式化输出判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Ranges使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "when Expressions",
    stage: "复位重放",
    mechanism:
      "when Expressions服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入分区、分支表、边界测试、穷尽性检查和格式化输出完成独立复核。",
    probe:
      "when Expressions使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "String Templates",
    stage: "固定初态",
    mechanism:
      "String Templates服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入分区、分支表、边界测试、穷尽性检查和格式化输出判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "String Templates使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Trying Out Some Ranges",
    stage: "施加动作",
    mechanism:
      "Challenge: Trying Out Some Ranges服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入分区、分支表、边界测试、穷尽性检查和格式化输出，不是一次示例输出。",
    probe:
      "Challenge: Trying Out Some Ranges使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Enhancing the Aura",
    stage: "推进状态",
    mechanism:
      "Challenge: Enhancing the Aura服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入分区、分支表、边界测试、穷尽性检查和格式化输出，不是一次示例输出。",
    probe:
      "Challenge: Enhancing the Aura使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Configurable Status Format",
    stage: "观察差异",
    mechanism:
      "Challenge: Configurable Status Format服务于把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入分区、分支表、边界测试、穷尽性检查和格式化输出，不是一次示例输出。",
    probe:
      "Challenge: Configurable Status Format使用输入分区、分支表、边界测试、穷尽性检查和格式化输出完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "分支重叠、边界遗漏或依赖不可见副作用",
  evidence: "输入分区、分支表、边界测试、穷尽性检查和格式化输出",
  boundary:
    "把if、范围、when与字符串模板组织成穷尽、可读且可测试的决策表的最小合法输入与第一个非法输入",
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
