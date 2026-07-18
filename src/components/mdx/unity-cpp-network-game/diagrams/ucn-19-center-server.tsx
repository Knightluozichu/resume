import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "定义中心职责",
  "生成协议与数据",
  "维护大厅会话",
  "验证任务配置",
  "分配战场实例",
  "客户端启动后签发",
] as const;

export function Ucn19CenterServerMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第19章 开发中心服务器CenterServer"
      label="第4篇 C++网络开发实战（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn19CenterServerExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第19章 开发中心服务器CenterServer"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn19CenterServerEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第19章 开发中心服务器CenterServer"
      nodes={nodes}
      mode="evidence"
    />
  );
}
