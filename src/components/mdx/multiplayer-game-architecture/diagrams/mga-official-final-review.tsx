import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "建立Socket与Epoll链",
  "进入Actor和ECS",
  "通过登录与MySQL",
  "注册多进程和Redis会话",
  "完成World跳转",
  "断线升级恢复签发",
] as const;

export function MgaOfficialFinalReviewMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function MgaOfficialFinalReviewExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function MgaOfficialFinalReviewEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
