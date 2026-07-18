import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "划分线程职责",
  "选择同步原语",
  "建立进程间通道",
  "提交异步操作",
  "消费完成通知",
  "取消排空后签发",
] as const;

export function Ucn13ThreadingAsyncSocketMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第13章 多线程和异步套接字"
      label="第3篇 C++网络开发基础（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn13ThreadingAsyncSocketExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第13章 多线程和异步套接字"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn13ThreadingAsyncSocketEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第13章 多线程和异步套接字"
      nodes={nodes}
      mode="evidence"
    />
  );
}
