import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "9. Standard Functions";
const focus =
  "按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "9. Standard Functions",
    stage: "声明合同",
    mechanism:
      "9. Standard Functions服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "9. Standard Functions使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "apply",
    stage: "建立输入",
    mechanism:
      "apply服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "apply使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "let",
    stage: "执行转换",
    mechanism:
      "let服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "let使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "run",
    stage: "观察产物",
    mechanism:
      "run服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "run使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "with",
    stage: "断言回归",
    mechanism:
      "with服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "with使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "also",
    stage: "声明合同",
    mechanism:
      "also服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "also使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "takeIf",
    stage: "建立输入",
    mechanism:
      "takeIf服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成独立复核。",
    probe:
      "takeIf使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "takeUnless",
    stage: "执行转换",
    mechanism:
      "takeUnless服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成独立复核。",
    probe:
      "takeUnless使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Using Standard Library Functions",
    stage: "观察产物",
    mechanism:
      "Using Standard Library Functions服务于按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；标准函数决策表、等价展开、链路断点、空值实验和副作用审计必须能区分语法缩短与合同改变。",
    probe:
      "Using Standard Library Functions使用标准函数决策表、等价展开、链路断点、空值实验和副作用审计完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "为追求链式写法嵌套作用域函数，令接收者与返回值失去可读性",
  evidence: "标准函数决策表、等价展开、链路断点、空值实验和副作用审计",
  boundary:
    "按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf的最小合法输入与第一个非法输入",
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
