import { DezeroStepLab } from "./dezero-step-lab";

const profile = {
  unitId: "dl2-step-23-package",
  title: "步骤23 打包",
  family: "graph",
  nodes: ["输入对象", "Function调用", "输出连接", "反向调度", "梯度核对"],
  concepts: [
    "步骤23 打包",
    "23.1 文件结构",
    "23.2 将代码移到核心类",
    "23.3 运算符重载",
    "23.4 实际的__init__.py文件",
    "23.5 导入dezero",
  ],
  mechanism:
    "core、functions 与 __init__ 明确公共 API 边界，导入包时再安装运算符重载",
  success: "步骤23 打包 的前向、反向与重放证据一致",
  failure:
    "步骤23 打包 在“循环导入或在多个模块重复定义 Variable 会造成类型身份不一致”处拒绝",
} as const;

export function Dl2Step23PackageLab() {
  return <DezeroStepLab {...profile} />;
}
