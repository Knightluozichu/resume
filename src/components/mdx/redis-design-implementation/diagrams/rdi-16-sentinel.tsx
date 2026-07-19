import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-16-sentinel",
  "unitTitle": "第16章 Sentinel",
  "concepts": [
    "启动并初始化Sentinel",
    "获取主服务器信息",
    "获取从服务器信息",
    "向主服务器和从服务器发送信息",
    "接收来自主服务器和从服务器的频道信息",
    "检测主观下线状态",
    "检查客观下线状态",
    "选举领头Sentinel",
    "故障转移",
    "重点回顾",
    "参考资料"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "启动并初始化Sentinel",
    "获取主服务器信息",
    "获取从服务器信息",
    "向主服务器和从服务器发送信息",
    "接收来自主服务器和从服务器的频道信息",
    "检测主观下线状态"
  ],
  "model": {
    "studio": "Sentinel投票与故障转移台",
    "axisA": {
      "label": "故障认定",
      "levels": [
        "可达",
        "主观下线",
        "客观下线"
      ]
    },
    "axisB": {
      "label": "选举状态",
      "levels": [
        "无领头",
        "请求投票",
        "获得法定票数"
      ]
    },
    "fault": "把单个Sentinel的主观下线当成客观下线，或未获多数就执行切换",
    "command": "rg 'sentinelCheckSubjectivelyDown|sentinelAskMasterStateToOtherSentinels|sentinelFailoverStateMachine' src/sentinel.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "Sentinel投票与故障转移台一致率",
      "risk": "选举状态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "故障判断满足法定票数，单轮只有合法领头者，晋升后旧主被重配置且客户端拓扑最终一致",
    "task": "交付Sentinel状态机、投票记录、故障转移时间线、旧主恢复与客户端验证，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi16SentinelStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi16SentinelTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi16SentinelEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
