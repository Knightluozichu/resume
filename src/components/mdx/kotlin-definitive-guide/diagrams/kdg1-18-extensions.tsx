import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "18. Extensions";
const focus =
  "掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "18. Extensions",
    stage: "声明合同",
    mechanism:
      "18. Extensions服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成独立复核。",
    probe:
      "18. Extensions使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining Extension Functions",
    stage: "建立输入",
    mechanism:
      "Defining Extension Functions服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现必须能区分语法缩短与合同改变。",
    probe:
      "Defining Extension Functions使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining an extension on a superclass",
    stage: "执行转换",
    mechanism:
      "Defining an extension on a superclass服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现是否支持对象不变量。",
    probe:
      "Defining an extension on a superclass使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Generic Extension Functions",
    stage: "观察产物",
    mechanism:
      "Generic Extension Functions服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现必须能区分语法缩短与合同改变。",
    probe:
      "Generic Extension Functions使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extension Properties",
    stage: "断言回归",
    mechanism:
      "Extension Properties服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现是否支持对象不变量。",
    probe:
      "Extension Properties使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extensions on Nullable Types",
    stage: "声明合同",
    mechanism:
      "Extensions on Nullable Types服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。这里要把缺失值、异常来源和调用者责任分别放进类型或失败合同，禁止用强制解包、空捕获或虚假默认值擦除风险；用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现定位最早失效处。",
    probe:
      "Extensions on Nullable Types使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extensions, Under the Hood",
    stage: "建立输入",
    mechanism:
      "Extensions, Under the Hood服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成独立复核。",
    probe:
      "Extensions, Under the Hood使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extracting to Extensions",
    stage: "执行转换",
    mechanism:
      "Extracting to Extensions服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成独立复核。",
    probe:
      "Extracting to Extensions使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining an Extensions File",
    stage: "观察产物",
    mechanism:
      "Defining an Extensions File服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现承担复现责任。",
    probe:
      "Defining an Extensions File使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Renaming an Extension",
    stage: "断言回归",
    mechanism:
      "Renaming an Extension服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成独立复核。",
    probe:
      "Renaming an Extension使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extensions in the Kotlin Standard Library",
    stage: "声明合同",
    mechanism:
      "Extensions in the Kotlin Standard Library服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成独立复核。",
    probe:
      "Extensions in the Kotlin Standard Library使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Function Literals with Receivers",
    stage: "建立输入",
    mechanism:
      "For the More Curious: Function Literals with Receivers服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现必须能区分语法缩短与合同改变。",
    probe:
      "For the More Curious: Function Literals with Receivers使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: toDragonSpeak Extension",
    stage: "执行转换",
    mechanism:
      "Challenge: toDragonSpeak Extension服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现，不是一次示例输出。",
    probe:
      "Challenge: toDragonSpeak Extension使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Frame Extension",
    stage: "观察产物",
    mechanism:
      "Challenge: Frame Extension服务于掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现，不是一次示例输出。",
    probe:
      "Challenge: Frame Extension使用静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "认为扩展真正修改了类或可以覆盖成员的动态分派",
  evidence: "静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现",
  boundary:
    "掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量的最小合法输入与第一个非法输入",
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
