import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "测量访问",
  "缩短锁域",
  "部署缓存",
  "分片二进制",
  "批量计算",
  "一致性签发",
] as const;

export function Gsa05StorageSolutionsMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第5章 存储方案"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa05StorageSolutionsExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第5章 存储方案"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa05StorageSolutionsEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第5章 存储方案"
      nodes={nodes}
      mode="evidence"
    />
  );
}
