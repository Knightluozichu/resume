import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "6. Null Safety and Exceptions";
const focus =
  "用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化";
const stages = ["建立基线", "注入反例", "定位边界", "修复合同", "同输入复验"];
const nodes = [
  {
    label: "6. Null Safety and Exceptions",
    stage: "建立基线",
    mechanism:
      "6. Null Safety and Exceptions服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "6. Null Safety and Exceptions使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Nullability",
    stage: "注入反例",
    mechanism:
      "Nullability服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Nullability使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Kotlin’s Explicit Null Type",
    stage: "定位边界",
    mechanism:
      "Kotlin’s Explicit Null Type服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Kotlin’s Explicit Null Type使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Compile Time vs Runtime",
    stage: "修复合同",
    mechanism:
      "Compile Time vs Runtime服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界必须能区分语法缩短与合同改变。",
    probe:
      "Compile Time vs Runtime使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Null Safety",
    stage: "同输入复验",
    mechanism:
      "Null Safety服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Null Safety使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Option one: the safe call operator",
    stage: "建立基线",
    mechanism:
      "Option one: the safe call operator服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成独立复核。",
    probe:
      "Option one: the safe call operator使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Using safe calls with let",
    stage: "注入反例",
    mechanism:
      "Using safe calls with let服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界必须能区分语法缩短与合同改变。",
    probe:
      "Using safe calls with let使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Option two: the double-bang operator",
    stage: "定位边界",
    mechanism:
      "Option two: the double-bang operator服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成独立复核。",
    probe:
      "Option two: the double-bang operator使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Option three: checking whether a value is null with if",
    stage: "修复合同",
    mechanism:
      "Option three: checking whether a value is null with if服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Option three: checking whether a value is null with if使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The null coalescing operator",
    stage: "同输入复验",
    mechanism:
      "The null coalescing operator服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "The null coalescing operator使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Exceptions",
    stage: "建立基线",
    mechanism:
      "Exceptions服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Exceptions使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Throwing an exception",
    stage: "注入反例",
    mechanism:
      "Throwing an exception服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Throwing an exception使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Custom exceptions",
    stage: "定位边界",
    mechanism:
      "Custom exceptions服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Custom exceptions使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Handling exceptions",
    stage: "修复合同",
    mechanism:
      "Handling exceptions服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Handling exceptions使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Preconditions",
    stage: "同输入复验",
    mechanism:
      "Preconditions服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Preconditions使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Null: What Is It Good For?",
    stage: "建立基线",
    mechanism:
      "Null: What Is It Good For?服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "Null: What Is It Good For?使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Checked vs Unchecked Exceptions",
    stage: "注入反例",
    mechanism:
      "For the More Curious: Checked vs Unchecked Exceptions服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "For the More Curious: Checked vs Unchecked Exceptions使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: How Is Nullability Enforced?",
    stage: "定位边界",
    mechanism:
      "For the More Curious: How Is Nullability Enforced?服务于用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界定位最早失效处。",
    probe:
      "For the More Curious: How Is Nullability Enforced?使用可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "用双感叹号绕过类型系统，或吞掉异常后伪装成功",
  evidence: "可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界",
  boundary:
    "用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化的最小合法输入与第一个非法输入",
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
