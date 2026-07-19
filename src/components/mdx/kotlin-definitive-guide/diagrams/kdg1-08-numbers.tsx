import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "8. Numbers";
const focus = "区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算";
const stages = ["界定数域", "选择表示", "执行换算", "检查精度", "验证边界"];
const nodes = [
  {
    label: "8. Numbers",
    stage: "界定数域",
    mechanism:
      "8. Numbers服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由数值范围表、解析结果、精度实验、格式化基线和余额边界测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "8. Numbers使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Numeric Types",
    stage: "选择表示",
    mechanism:
      "Numeric Types服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查数值范围表、解析结果、精度实验、格式化基线和余额边界测试是否支持对象不变量。",
    probe:
      "Numeric Types使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Integers",
    stage: "执行换算",
    mechanism:
      "Integers服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成独立复核。",
    probe:
      "Integers使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Decimal Numbers",
    stage: "检查精度",
    mechanism:
      "Decimal Numbers服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由数值范围表、解析结果、精度实验、格式化基线和余额边界测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Decimal Numbers使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Converting a String to a Numeric Type",
    stage: "验证边界",
    mechanism:
      "Converting a String to a Numeric Type服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查数值范围表、解析结果、精度实验、格式化基线和余额边界测试是否支持对象不变量。",
    probe:
      "Converting a String to a Numeric Type使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Converting an Int to a Double",
    stage: "界定数域",
    mechanism:
      "Converting an Int to a Double服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由数值范围表、解析结果、精度实验、格式化基线和余额边界测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Converting an Int to a Double使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Formatting a Double",
    stage: "选择表示",
    mechanism:
      "Formatting a Double服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由数值范围表、解析结果、精度实验、格式化基线和余额边界测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Formatting a Double使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Converting a Double to an Int",
    stage: "执行换算",
    mechanism:
      "Converting a Double to an Int服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由数值范围表、解析结果、精度实验、格式化基线和余额边界测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Converting a Double to an Int使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Bit Manipulation",
    stage: "检查精度",
    mechanism:
      "For the More Curious: Bit Manipulation服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成独立复核。",
    probe:
      "For the More Curious: Bit Manipulation使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Remaining Pints",
    stage: "验证边界",
    mechanism:
      "Challenge: Remaining Pints服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是数值范围表、解析结果、精度实验、格式化基线和余额边界测试，不是一次示例输出。",
    probe:
      "Challenge: Remaining Pints使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Handling a Negative Balance",
    stage: "界定数域",
    mechanism:
      "Challenge: Handling a Negative Balance服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是数值范围表、解析结果、精度实验、格式化基线和余额边界测试，不是一次示例输出。",
    probe:
      "Challenge: Handling a Negative Balance使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Dragoncoin",
    stage: "选择表示",
    mechanism:
      "Challenge: Dragoncoin服务于区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是数值范围表、解析结果、精度实验、格式化基线和余额边界测试，不是一次示例输出。",
    probe:
      "Challenge: Dragoncoin使用数值范围表、解析结果、精度实验、格式化基线和余额边界测试完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "假设数值会隐式扩宽，或把Double格式化结果当精确金额",
  evidence: "数值范围表、解析结果、精度实验、格式化基线和余额边界测试",
  boundary:
    "区分整数与小数类型、显式转换、解析失败、格式化、截断和位运算的最小合法输入与第一个非法输入",
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
