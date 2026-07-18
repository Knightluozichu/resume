import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "绘制登录时序",
  "调用PHP验证接口",
  "验证凭据与Nonce",
  "签发并绑定会话",
  "过滤未授权消息",
  "机器人批量压测签发",
] as const;

export function Mga04AccountLoginMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第4章 账号登录与验证"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga04AccountLoginExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第4章 账号登录与验证"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga04AccountLoginEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第4章 账号登录与验证"
      nodes={nodes}
      mode="evidence"
    />
  );
}
