import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-07-ziplist",
  "unitTitle": "第7章 压缩列表",
  "concepts": [
    "压缩列表的构成",
    "压缩列表节点的构成",
    "连锁更新",
    "压缩列表API",
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
    "压缩列表的构成",
    "压缩列表节点的构成",
    "连锁更新",
    "压缩列表API",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "压缩列表字节解析台",
    "axisA": {
      "label": "前节点长度",
      "levels": [
        "小于254",
        "跨254边界",
        "连续跨界"
      ]
    },
    "axisB": {
      "label": "变更",
      "levels": [
        "头插",
        "中间替换",
        "删除"
      ]
    },
    "fault": "忽略previous_entry_length扩展引发的连锁更新，导致尾偏移或反向遍历失真",
    "command": "rg '__ziplistCascadeUpdate|ziplistInsert|ziplistDelete' src/ziplist.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "压缩列表字节解析台一致率",
      "risk": "变更分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "总字节、尾偏移、节点数和每个前驱长度一致，插删后能双向遍历到终止字节",
    "task": "交付字节布局图、节点解析器、连锁更新最坏轨迹与边界测试，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi07ZiplistStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi07ZiplistTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi07ZiplistEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
