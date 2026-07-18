import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "导入模型和动作",
  "建立人物数据",
  "映射控制输入",
  "驱动行为状态机",
  "同步特效物理瞄准",
  "场景回归签发",
] as const;

export function Ucn07CharacterDevelopmentMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第7章 人物资源编辑与程序开发"
      label="第2篇 Unity实战（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn07CharacterDevelopmentExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第7章 人物资源编辑与程序开发"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn07CharacterDevelopmentEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第7章 人物资源编辑与程序开发"
      nodes={nodes}
      mode="evidence"
    />
  );
}
