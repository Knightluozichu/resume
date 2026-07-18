import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "启动网关框架",
  "生成双端协议",
  "验证登录票据",
  "绑定连接身份",
  "路由并限流",
  "进入大厅后签发",
] as const;

export function Ucn18GateServerMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第18章 开发网关服务器GateServer"
      label="第4篇 C++网络开发实战（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn18GateServerExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第18章 开发网关服务器GateServer"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn18GateServerEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第18章 开发网关服务器GateServer"
      nodes={nodes}
      mode="evidence"
    />
  );
}
