import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "声明联邦对象模型",
  "加入并发现成员",
  "交换属性与交互",
  "推进逻辑时间",
  "驱动游戏AI",
  "失联与推理失败签发",
] as const;

export function Ucn21HlaAiMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第21章 一些仿真框架和人工智能的介绍"
      label="第4篇 C++网络开发实战（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn21HlaAiExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第21章 一些仿真框架和人工智能的介绍"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn21HlaAiEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第21章 一些仿真框架和人工智能的介绍"
      nodes={nodes}
      mode="evidence"
    />
  );
}
