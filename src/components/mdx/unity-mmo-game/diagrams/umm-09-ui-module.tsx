import { UnityNetworkEvidenceLab } from "./official-unity-network-lab";

const nodes = [
  "设计面板生命周期",
  "建立层级与实例表",
  "绑定登录注册组件",
  "配对协议监听",
  "编排 GameMain 入口",
  "重复操作后签发",
] as const;

export function Umm09UiModuleMapLab() {
  return (
    <UnityNetworkEvidenceLab
      title="第9章 UI界面模块"
      label="第9章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Umm09UiModuleExperimentLab() {
  return (
    <UnityNetworkEvidenceLab
      title="正常、边界与失败样本"
      label="第9章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Umm09UiModuleEvidenceLab() {
  return (
    <UnityNetworkEvidenceLab
      title="双端证据与阶段门"
      label="第9章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
