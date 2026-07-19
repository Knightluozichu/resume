import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-06-03",
  title: "6.3 15年编程生涯，一名架构师的总结",
  family: "growth",
  nodes: ["澄清约束", "建立模型", "比较方案", "推动实施", "验证结果"],
  concepts: [
    "6.3 15年编程生涯，一名架构师的总结",
    "好奇心",
    "养成计算机的思维方式",
    "扎实基础，融会贯通",
    "要透彻地理解一门技术的本质",
    "能写漂亮的代码",
    "抽象的能力",
    "技术领导力",
  ],
  mechanism:
    "架构师把业务约束翻译成边界和取舍，保持基础模型、代码质量、抽象能力与技术领导力，并用反馈修正决策",
  success:
    "6.3 15年编程生涯，一名架构师的总结 的输入、机制、输出与复位轨迹一致",
  failure:
    "6.3 15年编程生涯，一名架构师的总结 在“只画目标架构而不记录约束、被拒方案、迁移路径和回退条件”处拒绝",
} as const;

export function Crv18Section0603Lab() {
  return <CoderMechanismLab {...profile} />;
}
