import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "定义负载",
  "选代表场景",
  "测尾延迟",
  "注入故障",
  "核对生态",
  "记录决策",
] as const;

export function GsaAppendixLanguageComparisonMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="附录A 不同语言之间的区别"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function GsaAppendixLanguageComparisonExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="附录A 不同语言之间的区别"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function GsaAppendixLanguageComparisonEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="附录A 不同语言之间的区别"
      nodes={nodes}
      mode="evidence"
    />
  );
}
