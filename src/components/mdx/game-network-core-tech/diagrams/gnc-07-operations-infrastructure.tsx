import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "估算总成本",
  "建立多套环境",
  "自动部署配置",
  "采集指标日志",
  "执行阶梯压测",
  "上线故障签发",
] as const;

export function Gnc07OperationsInfrastructureMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第7章 支持网络游戏运营的基础设施：架构、负荷测试和运营"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc07OperationsInfrastructureExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第7章 支持网络游戏运营的基础设施：架构、负荷测试和运营"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc07OperationsInfrastructureEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第7章 支持网络游戏运营的基础设施：架构、负荷测试和运营"
      nodes={nodes}
      mode="evidence"
    />
  );
}
