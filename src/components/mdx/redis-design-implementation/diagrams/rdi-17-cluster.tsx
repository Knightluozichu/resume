import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-17-cluster",
  "unitTitle": "第17章 集群",
  "concepts": [
    "节点",
    "槽指派",
    "在集群中执行命令",
    "重新分片",
    "ASK错误",
    "复制与故障转移",
    "消息",
    "重点回顾"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "节点",
    "槽指派",
    "在集群中执行命令",
    "重新分片",
    "ASK错误",
    "复制与故障转移"
  ],
  "model": {
    "studio": "16384槽迁移路由台",
    "axisA": {
      "label": "槽状态",
      "levels": [
        "稳定",
        "migrating/importing",
        "已转移"
      ]
    },
    "axisB": {
      "label": "请求位置",
      "levels": [
        "源节点",
        "目标节点",
        "其他节点"
      ]
    },
    "fault": "迁槽时混淆ASK与MOVED，或让同一槽同时拥有两个可写主",
    "command": "rg 'getNodeByQuery|clusterRedirectClient|clusterCron' src/cluster.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "16384槽迁移路由台一致率",
      "risk": "请求位置分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "每个槽恰有有效所有者，迁移状态可路由请求，故障转移不产生两个合法写主",
    "task": "交付槽位图、MOVED/ASK轨迹、在线迁槽演练、Gossip与故障转移记录，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi17ClusterStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi17ClusterTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi17ClusterEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
