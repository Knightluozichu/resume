import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-official-learning-map",
  "unitTitle": "第2版权威学习地图",
  "concepts": [
    "第1章 简介",
    "第2章 简单动态字符串",
    "第3章 链表",
    "第4章 字典",
    "第5章 跳跃表",
    "第6章 整数集合",
    "第7章 压缩列表",
    "第8章 对象",
    "第9章 数据库",
    "第10章 RDB持久化",
    "第11章 AOF持久化",
    "第12章 事件",
    "第13章 客户端",
    "第14章 服务器",
    "第15章 复制",
    "第16章 Sentinel",
    "第17章 集群",
    "第18章 发布与订阅",
    "第19章 事务",
    "第20章 Lua脚本",
    "第21章 排序",
    "第22章 二进制位数组",
    "第23章 慢查询日志",
    "第24章 监视器"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "第1章 简介",
    "第2章 简单动态字符串",
    "第3章 链表",
    "第4章 字典",
    "第5章 跳跃表",
    "第6章 整数集合"
  ],
  "model": {
    "studio": "24章源码依赖导航台",
    "axisA": {
      "label": "追踪跨度",
      "levels": [
        "单结构",
        "单章闭环",
        "跨四部分"
      ]
    },
    "axisB": {
      "label": "证据层级",
      "levels": [
        "目录",
        "源码",
        "运行与反例"
      ]
    },
    "fault": "把24章当成互不相关的命令清单，无法从一次请求追到持久化与复制",
    "command": "git -C redis-3.0-annotated rev-parse HEAD",
    "practiceMode": "design",
    "outcomes": {
      "signal": "24章源码依赖导航台一致率",
      "risk": "证据层级分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "24章都有正式页面、完整小节、源码结构图、运行实验、失败反例和独立交付物",
    "task": "交付26页路线、源码依赖图、Redis 3.0实验仓、版本边界与全书清单，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function RdiOfficialLearningMapStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function RdiOfficialLearningMapTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function RdiOfficialLearningMapEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
