import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "信息层级",
  "Canvas布局",
  "输入事件",
  "界面状态",
  "音频总线",
  "多分辨率验收",
] as const;

export function Ums06GuiAndAudioMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第六章 GUI与Audio"
      label="第六章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums06GuiAndAudioExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第六章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums06GuiAndAudioEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第六章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
