import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "选择类型与集合",
  "用接口隔离能力",
  "用委托传递事件",
  "区分线程与协程",
  "穿越序列化和Native边界",
  "热更新回归签发",
] as const;

export function Ucn03CsharpLanguageMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第3章 Unity游戏开发语言"
      label="第1篇 Unity基础（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn03CsharpLanguageExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第3章 Unity游戏开发语言"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn03CsharpLanguageEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第3章 Unity游戏开发语言"
      nodes={nodes}
      mode="evidence"
    />
  );
}
