import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-03-linked-list",
  "unitTitle": "第3章 链表",
  "concepts": [
    "链表和链表节点的实现",
    "链表和链表节点的API",
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
    "链表和链表节点的实现",
    "链表和链表节点的API",
    "运行反例",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "双向链表所有权台",
    "axisA": {
      "label": "变更动作",
      "levels": [
        "头插",
        "尾插",
        "删除中点"
      ]
    },
    "axisB": {
      "label": "边界位置",
      "levels": [
        "空表",
        "单节点",
        "多节点"
      ]
    },
    "fault": "删除节点后只修一侧指针或漏调释放回调，使len与拓扑分叉",
    "command": "rg 'listAddNode|listDelNode' src/adlist.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "双向链表所有权台一致率",
      "risk": "边界位置分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "头尾、前后指针和长度在插入删除后相互一致，节点所有权与释放回调明确",
    "task": "交付链表拓扑图、插删指针轨迹、复杂度表与结构断言，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi03LinkedListStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi03LinkedListTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi03LinkedListEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
