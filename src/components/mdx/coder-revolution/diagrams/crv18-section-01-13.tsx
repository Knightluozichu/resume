import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-13",
  title: "1.13 绕不开的加法器",
  family: "hardware",
  nodes: ["输入位", "半加和", "生成进位", "合并进位", "输出多位"],
  concepts: ["1.13 绕不开的加法器"],
  mechanism:
    "半加器用 XOR 产生和、AND 产生进位；全加器再合并输入进位，多个全加器串接构成多位加法",
  success: "1.13 绕不开的加法器 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.13 绕不开的加法器 在“只计算每一位的 XOR 而未把低位进位送到高位，遇到 1+1 即失败”处拒绝",
} as const;

export function Crv18Section0113Lab() {
  return <CoderMechanismLab {...profile} />;
}
