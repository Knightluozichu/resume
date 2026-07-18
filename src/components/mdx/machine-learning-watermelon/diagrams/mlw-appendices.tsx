import { OfficialWatermelonLab } from "./official-watermelon-lab";

export function MlwAppendicesMapLab() {
  return (
    <OfficialWatermelonLab
      title="附录 数学基础"
      label="MLW-17"
      color="#047857"
      soft="#d1fae5"
      chain={[
        "冻结数据合同",
        "计算模型状态",
        "核对目标与约束",
        "执行学习或推断",
        "独立评估泛化",
        "定位首个分叉",
      ]}
      concepts={["附录", "A 矩阵", "B 优化", "C 概率分布"]}
      view="map"
    />
  );
}

export function MlwAppendicesExperimentLab() {
  return (
    <OfficialWatermelonLab
      title="附录 数学基础"
      label="MLW-17"
      color="#047857"
      soft="#d1fae5"
      chain={[
        "冻结数据合同",
        "计算模型状态",
        "核对目标与约束",
        "执行学习或推断",
        "独立评估泛化",
        "定位首个分叉",
      ]}
      concepts={["附录", "A 矩阵", "B 优化", "C 概率分布"]}
      view="experiment"
    />
  );
}

export function MlwAppendicesEvidenceLab() {
  return (
    <OfficialWatermelonLab
      title="附录 数学基础"
      label="MLW-17"
      color="#047857"
      soft="#d1fae5"
      chain={[
        "冻结数据合同",
        "计算模型状态",
        "核对目标与约束",
        "执行学习或推断",
        "独立评估泛化",
        "定位首个分叉",
      ]}
      concepts={["附录", "A 矩阵", "B 优化", "C 概率分布"]}
      view="evidence"
    />
  );
}
