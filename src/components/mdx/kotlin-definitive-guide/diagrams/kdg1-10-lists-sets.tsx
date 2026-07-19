import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "10. Lists and Sets";
const focus =
  "区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break";
const stages = ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"];
const nodes = [
  {
    label: "10. Lists and Sets",
    stage: "固定初态",
    mechanism:
      "10. Lists and Sets服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "10. Lists and Sets使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Lists",
    stage: "施加动作",
    mechanism:
      "Lists服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Lists使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Accessing a list’s elements",
    stage: "推进状态",
    mechanism:
      "Accessing a list’s elements服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Accessing a list’s elements使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Index boundaries and safe index access",
    stage: "观察差异",
    mechanism:
      "Index boundaries and safe index access服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "Index boundaries and safe index access使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Checking the contents of a list",
    stage: "复位重放",
    mechanism:
      "Checking the contents of a list服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Checking the contents of a list使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Changing a list’s contents",
    stage: "固定初态",
    mechanism:
      "Changing a list’s contents服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Changing a list’s contents使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Iteration",
    stage: "施加动作",
    mechanism:
      "Iteration服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "Iteration使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Reading a File into a List",
    stage: "推进状态",
    mechanism:
      "Reading a File into a List服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Reading a File into a List使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Destructuring",
    stage: "观察差异",
    mechanism:
      "Destructuring服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "Destructuring使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Sets",
    stage: "复位重放",
    mechanism:
      "Sets服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Sets使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Creating a set",
    stage: "固定初态",
    mechanism:
      "Creating a set服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Creating a set使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Adding elements to a set",
    stage: "施加动作",
    mechanism:
      "Adding elements to a set服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由集合所有权图、越界实验、去重结果、文件样本和菜单格式断言判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Adding elements to a set使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "while Loops",
    stage: "推进状态",
    mechanism:
      "while Loops服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "while Loops使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The break Expression",
    stage: "观察差异",
    mechanism:
      "The break Expression服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "The break Expression使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Collection Conversion",
    stage: "复位重放",
    mechanism:
      "Collection Conversion服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "Collection Conversion使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Array Types",
    stage: "固定初态",
    mechanism:
      "For the More Curious: Array Types服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查集合所有权图、越界实验、去重结果、文件样本和菜单格式断言是否支持对象不变量。",
    probe:
      "For the More Curious: Array Types使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Read-Only vs Immutable",
    stage: "施加动作",
    mechanism:
      "For the More Curious: Read-Only vs Immutable服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成独立复核。",
    probe:
      "For the More Curious: Read-Only vs Immutable使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Formatted Tavern Menu",
    stage: "推进状态",
    mechanism:
      "Challenge: Formatted Tavern Menu服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是集合所有权图、越界实验、去重结果、文件样本和菜单格式断言，不是一次示例输出。",
    probe:
      "Challenge: Formatted Tavern Menu使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Advanced Formatted Tavern Menu",
    stage: "观察差异",
    mechanism:
      "Challenge: Advanced Formatted Tavern Menu服务于区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是集合所有权图、越界实验、去重结果、文件样本和菜单格式断言，不是一次示例输出。",
    probe:
      "Challenge: Advanced Formatted Tavern Menu使用集合所有权图、越界实验、去重结果、文件样本和菜单格式断言完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把只读引用当作深度不可变，或在遍历期间修改共享集合",
  evidence: "集合所有权图、越界实验、去重结果、文件样本和菜单格式断言",
  boundary:
    "区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break的最小合法输入与第一个非法输入",
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
