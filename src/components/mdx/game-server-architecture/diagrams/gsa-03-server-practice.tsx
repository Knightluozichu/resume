import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "校验升级",
  "签发连接代际",
  "增量解帧",
  "分类任务",
  "有界调度",
  "关闭回收",
] as const;

export function Gsa03ServerPracticeMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第3章 服务器实作"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa03ServerPracticeExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第3章 服务器实作"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa03ServerPracticeEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第3章 服务器实作"
      nodes={nodes}
      mode="evidence"
    />
  );
}
