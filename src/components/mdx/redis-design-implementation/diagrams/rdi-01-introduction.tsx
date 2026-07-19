import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-01-introduction",
  "unitTitle": "第1章 简介",
  "concepts": [
    "版本说明",
    "章节编排",
    "推荐的阅读方法",
    "行文规则",
    "配套网站"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "版本说明",
    "章节编排",
    "推荐的阅读方法",
    "行文规则",
    "配套网站",
    "控制流"
  ],
  "model": {
    "studio": "版本边界与阅读索引台",
    "axisA": {
      "label": "结论范围",
      "levels": [
        "命令表象",
        "函数路径",
        "Redis 3.0边界"
      ]
    },
    "axisB": {
      "label": "阅读入口",
      "levels": [
        "目录",
        "注释源码",
        "运行验证"
      ]
    },
    "fault": "用新版Redis的listpack、Streams或线程模型解释书中的3.0实现",
    "command": "git checkout 3.0 && git rev-parse HEAD",
    "practiceMode": "design",
    "outcomes": {
      "signal": "版本边界与阅读索引台一致率",
      "risk": "阅读入口分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "任何结论都标明Redis 3.0语境、目录归属、源码入口和后续版本差异",
    "task": "交付版本边界表、24章路线、源码阅读索引与术语约定，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi01IntroductionStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi01IntroductionTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi01IntroductionEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
