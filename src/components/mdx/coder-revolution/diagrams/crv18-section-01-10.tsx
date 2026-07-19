import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-10",
  title: "1.10 从1加到100：一道简单的数学题挑战一下你的大脑",
  family: "hardware",
  nodes: ["读取n", "选择算法", "执行加乘", "检查溢出", "核对结果"],
  concepts: [
    "1.10 从1加到100：一道简单的数学题挑战一下你的大脑",
    "CPU和内存",
    "从1加到100",
    "热身",
    "正式出发",
  ],
  mechanism:
    "循环加法逐项执行并读写累加器，等差数列公式把重复工作化简为常数次运算；两者都受整数位宽约束",
  success:
    "1.10 从1加到100：一道简单的数学题挑战一下你的大脑 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.10 从1加到100：一道简单的数学题挑战一下你的大脑 在“公式中先计算 n(n+1) 发生定宽整数溢出，即使最终结果本可表示也得到错误值”处拒绝",
} as const;

export function Crv18Section0110Lab() {
  return <CoderMechanismLab {...profile} />;
}
