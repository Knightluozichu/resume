"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "主菜单",
  "选车",
  "车辆",
  "停车关卡",
  "多视角",
  "停车判定",
] as const;

export function Ugc093dVirtualParkingMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第9章 3D虚拟停车场：选车、关卡、车辆与多视角 · 案例谱系"
      label="第9章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc093dVirtualParkingExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第9章 3D虚拟停车场：选车、关卡、车辆与多视角 · 单变量回放"
      label="第9章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc093dVirtualParkingEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第9章 3D虚拟停车场：选车、关卡、车辆与多视角 · 发布证据"
      label="第9章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
