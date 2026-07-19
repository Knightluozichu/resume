import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-04-05",
  title: "4.5 再见！Bug",
  family: "engineering",
  nodes: ["固定复现", "提出假设", "缩小范围", "验证修复", "补回归测"],
  concepts: ["4.5 再见！Bug"],
  mechanism:
    "调试从可复现输入出发提出可证伪假设，通过日志、断点、二分或最小化实验寻找最早偏离点，再补回归测试",
  success: "4.5 再见！Bug 的输入、机制、输出与复位轨迹一致",
  failure:
    "4.5 再见！Bug 在“同时修改多处并反复重试，现象消失后也不知道哪项改变真正相关”处拒绝",
} as const;

export function Crv18Section0405Lab() {
  return <CoderMechanismLab {...profile} />;
}
