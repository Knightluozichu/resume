import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第20章 流水和调度",
  label: "第20章 流水和调度",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "建立依赖图",
    "计算RecMII",
    "计算ResMII",
    "尝试模调度",
    "生成序言稳态尾声",
    "测量误预测成本",
  ],
  concepts: [
    "第20章 流水和调度",
    "20.1 没有资源约束时的循环调度",
    "20.2 有资源约束的循环流水",
    "20.2.1 模调度",
    "20.2.2 寻找最小的启动间距",
    "20.2.3 其他控制流",
    "20.2.4 编译器应该调度指令吗",
    "20.3 分支预测",
    "20.3.1 静态分支预测",
    "20.3.2 编译器应该预测分支吗",
  ],
} as const;

export function Tbc20SchedulingPipeliningMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc20SchedulingPipeliningExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc20SchedulingPipeliningEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
