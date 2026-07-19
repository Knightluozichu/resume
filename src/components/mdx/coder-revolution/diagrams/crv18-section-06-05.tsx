import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-06-05",
  title: "6.5 学习编程的四兄弟",
  family: "growth",
  nodes: ["固定目标", "限制资料", "主动回忆", "完成项目", "间隔复盘"],
  concepts: [
    "6.5 学习编程的四兄弟",
    "摇摆不定的老大",
    "“小仓鼠”老二",
    "不看书的老三",
    "半途而废的老四",
  ],
  mechanism:
    "有效学习把稳定目标、有限资料、主动回忆、动手项目和间隔复盘连成闭环，避免在摇摆、囤积、不读或放弃间循环",
  success: "6.5 学习编程的四兄弟 的输入、机制、输出与复位轨迹一致",
  failure:
    "6.5 学习编程的四兄弟 在“连续收藏新资料却从不做闭卷回忆、实现或迁移题，形成熟悉感而非掌握”处拒绝",
} as const;

export function Crv18Section0605Lab() {
  return <CoderMechanismLab {...profile} />;
}
