import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "12. Defining Classes";
const focus =
  "通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "12. Defining Classes",
    stage: "声明合同",
    mechanism:
      "12. Defining Classes服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "12. Defining Classes使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining a Class",
    stage: "建立输入",
    mechanism:
      "Defining a Class服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "Defining a Class使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Constructing Instances",
    stage: "执行转换",
    mechanism:
      "Constructing Instances服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成独立复核。",
    probe:
      "Constructing Instances使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Class Functions",
    stage: "观察产物",
    mechanism:
      "Class Functions服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；对象职责表、属性不变量、可见性测试、包结构和竞态条件说明必须能区分语法缩短与合同改变。",
    probe:
      "Class Functions使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Visibility and Encapsulation",
    stage: "断言回归",
    mechanism:
      "Visibility and Encapsulation服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成独立复核。",
    probe:
      "Visibility and Encapsulation使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Class Properties",
    stage: "声明合同",
    mechanism:
      "Class Properties服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "Class Properties使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Property getters and setters",
    stage: "建立输入",
    mechanism:
      "Property getters and setters服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "Property getters and setters使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Property visibility",
    stage: "执行转换",
    mechanism:
      "Property visibility服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "Property visibility使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Computed properties",
    stage: "观察产物",
    mechanism:
      "Computed properties服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "Computed properties使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Refactoring NyetHack",
    stage: "断言回归",
    mechanism:
      "Refactoring NyetHack服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成独立复核。",
    probe:
      "Refactoring NyetHack使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Using Packages",
    stage: "声明合同",
    mechanism:
      "Using Packages服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成独立复核。",
    probe:
      "Using Packages使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: A Closer Look at var and val Properties",
    stage: "建立输入",
    mechanism:
      "For the More Curious: A Closer Look at var and val Properties服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查对象职责表、属性不变量、可见性测试、包结构和竞态条件说明是否支持对象不变量。",
    probe:
      "For the More Curious: A Closer Look at var and val Properties使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Guarding Against Race Conditions",
    stage: "执行转换",
    mechanism:
      "For the More Curious: Guarding Against Race Conditions服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成独立复核。",
    probe:
      "For the More Curious: Guarding Against Race Conditions使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Package Private",
    stage: "观察产物",
    mechanism:
      "For the More Curious: Package Private服务于通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成独立复核。",
    probe:
      "For the More Curious: Package Private使用对象职责表、属性不变量、可见性测试、包结构和竞态条件说明完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把数据暴露为可变公共属性，再期待调用者自行维护不变量",
  evidence: "对象职责表、属性不变量、可见性测试、包结构和竞态条件说明",
  boundary:
    "通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界的最小合法输入与第一个非法输入",
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
