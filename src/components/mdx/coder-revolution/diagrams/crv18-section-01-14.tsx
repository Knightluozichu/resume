import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-14",
  title: "1.14 递归那点事儿",
  family: "language",
  nodes: ["检查基线", "缩小输入", "压入栈帧", "得到子结果", "返回合并"],
  concepts: ["1.14 递归那点事儿"],
  mechanism:
    "递归调用必须有可达基线，每次调用创建独立栈帧并缩小问题；返回值沿调用链反向合并",
  success: "1.14 递归那点事儿 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.14 递归那点事儿 在“递归分支没有严格逼近基线，造成无限递归或栈溢出”处拒绝",
} as const;

export function Crv18Section0114Lab() {
  return <CoderMechanismLab {...profile} />;
}
