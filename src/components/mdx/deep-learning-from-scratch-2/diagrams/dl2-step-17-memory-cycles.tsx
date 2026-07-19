import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-17-memory-cycles",
  title: "步骤17 内存管理和循环引用",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤17 内存管理和循环引用",
    "17.1 内存管理",
    "17.2 引用计数方式的内存管理",
    "17.3 循环引用",
    "17.4 weakref模块",
    "17.5 代码验证",
  ],
  mechanism:
    "Function 对 outputs 使用 weakref，打破 Variable→creator→outputs→Variable 的强引用环",
  success: "步骤17 内存管理和循环引用 的前向、反向与重放证据一致",
  failure:
    "步骤17 内存管理和循环引用 在“强引用输出会让临时计算图即使离开作用域也无法及时释放”处拒绝",
} as const;

export function Dl2Step17MemoryCyclesLab() {
  return <DezeroStepLab {...profile} />;
}
