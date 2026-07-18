import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "导入NGUI并建图集",
  "解释合批与DrawCall",
  "组合基础控件",
  "完成分辨率自适应",
  "绑定登录大厅战场状态",
  "VR可读性签发",
] as const;

export function Ucn10NguiInteractionMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第10章 NGUI组件开发和操作交互开发"
      label="第2篇 Unity实战（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn10NguiInteractionExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第10章 NGUI组件开发和操作交互开发"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn10NguiInteractionEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第10章 NGUI组件开发和操作交互开发"
      nodes={nodes}
      mode="evidence"
    />
  );
}
