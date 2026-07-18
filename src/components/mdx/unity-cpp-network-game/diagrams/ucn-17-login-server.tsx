import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "定义授权协议",
  "建立会话层",
  "校验身份凭据",
  "签发短期票据",
  "写入Redis状态",
  "首次登录与重放签发",
] as const;

export function Ucn17LoginServerMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第17章 开发登录服务器LoginServer"
      label="第4篇 C++网络开发实战（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn17LoginServerExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第17章 开发登录服务器LoginServer"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn17LoginServerEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第17章 开发登录服务器LoginServer"
      nodes={nodes}
      mode="evidence"
    />
  );
}
