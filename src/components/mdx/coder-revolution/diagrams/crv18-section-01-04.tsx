import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-04",
  title: "1.4 CPU阿甘",
  family: "hardware",
  nodes: ["取指", "译码", "执行", "访存缓存", "提交结果"],
  concepts: ["1.4 CPU阿甘", "启动", "运行", "新装备：缓存", "自我提升：流水线"],
  mechanism:
    "CPU 以取指、译码、执行和提交推进指令；缓存缩短常见访存，流水线重叠不同指令阶段但会被依赖和分支打断",
  success: "1.4 CPU阿甘 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.4 CPU阿甘 在“只用主频判断性能，忽略指令数、CPI、缓存未命中和分支停顿”处拒绝",
} as const;

export function Crv18Section0104Lab() {
  return <CoderMechanismLab {...profile} />;
}
