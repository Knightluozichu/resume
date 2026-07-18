import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "初始化Winsock",
  "解析地址端口",
  "创建绑定套接字",
  "完成TCP连接收发",
  "完成UDP数据报收发",
  "错误关闭后签发",
] as const;

export function Ucn12CppNetworkBasicsMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第12章 C++网络编程基础"
      label="第3篇 C++网络开发基础（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn12CppNetworkBasicsExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第12章 C++网络编程基础"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn12CppNetworkBasicsEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第12章 C++网络编程基础"
      nodes={nodes}
      mode="evidence"
    />
  );
}
