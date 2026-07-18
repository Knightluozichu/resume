import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "定义消息职责",
  "分配稳定字段号",
  "生成C++与C#代码",
  "封装长度和消息号",
  "跨版本互通",
  "畸形输入后签发",
] as const;

export function Ucn15ProtobufMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第15章 网络协议Protobuf的使用"
      label="第3篇 C++网络开发基础（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn15ProtobufExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第15章 网络协议Protobuf的使用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn15ProtobufEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第15章 网络协议Protobuf的使用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
