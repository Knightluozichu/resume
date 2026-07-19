import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-05-skiplist",
  "unitTitle": "第5章 跳跃表",
  "concepts": [
    "跳跃表的实现",
    "跳跃表API",
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
    "跳跃表的实现",
    "跳跃表API",
    "运行反例",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "跳跃表路径与跨度台",
    "axisA": {
      "label": "目标位置",
      "levels": [
        "表头附近",
        "中位区间",
        "表尾附近"
      ]
    },
    "axisB": {
      "label": "操作",
      "levels": [
        "插入",
        "范围查询",
        "按排名删除"
      ]
    },
    "fault": "只维护forward指针而漏改span或backward，范围结果正确但排名错误",
    "command": "rg 'zslInsert|zslDelete|zslGetRank' src/t_zset.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "跳跃表路径与跨度台一致率",
      "risk": "操作分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "分值顺序与成员字典序稳定，跨度可恢复排名，层级和前后链在更新后保持一致",
    "task": "交付多层路径图、插删轨迹、排名验证与复杂度实验，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi05SkiplistStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi05SkiplistTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi05SkiplistEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
