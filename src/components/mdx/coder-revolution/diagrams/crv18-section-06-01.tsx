import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-06-01",
  title: "6.1 凡事必先骑上虎背，和性格内向的程序员聊几句",
  family: "growth",
  nodes: ["选择小目标", "提前准备", "完成表达", "收集反馈", "提高难度"],
  concepts: ["6.1 凡事必先骑上虎背，和性格内向的程序员聊几句"],
  mechanism:
    "内向不是能力缺陷；把高压力目标拆成准备、低风险表达、反馈和逐步扩大范围，能用行动数据替代性格标签",
  success:
    "6.1 凡事必先骑上虎背，和性格内向的程序员聊几句 的输入、机制、输出与复位轨迹一致",
  failure:
    "6.1 凡事必先骑上虎背，和性格内向的程序员聊几句 在“一次选择过高暴露强度，失败后把情境问题归因成永久性格限制”处拒绝",
} as const;

export function Crv18Section0601Lab() {
  return <CoderMechanismLab {...profile} />;
}
