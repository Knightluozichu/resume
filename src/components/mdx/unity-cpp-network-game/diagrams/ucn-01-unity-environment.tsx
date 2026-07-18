import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "识别引擎与编辑器",
  "锁定版本和模块",
  "搭建Windows环境",
  "搭建Android工具链",
  "核对授权与服务",
  "双平台构建签发",
] as const;

export function Ucn01UnityEnvironmentMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第1章 Unity介绍与相关环境的搭建和调试"
      label="第1篇 Unity基础（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn01UnityEnvironmentExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第1章 Unity介绍与相关环境的搭建和调试"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn01UnityEnvironmentEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第1章 Unity介绍与相关环境的搭建和调试"
      nodes={nodes}
      mode="evidence"
    />
  );
}
