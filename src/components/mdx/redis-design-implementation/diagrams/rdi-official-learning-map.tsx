import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第2版权威学习地图",
  focus:
    "沿数据结构与对象、单机数据库、多机数据库和独立功能四部分完成24章Redis 3.0实现",
  invariant:
    "24章都有正式页面、完整小节、源码结构图、运行实验、失败反例和独立交付物",
  artifact: "26页路线、源码依赖图、Redis 3.0实验仓、版本边界与全书清单",
  nodes: [
    "版本、388页与24章正式分母",
    "第一部分：数据结构与对象（第2至8章）",
    "第二部分：单机数据库的实现（第9至14章）",
    "第三部分：多机数据库的实现（第15至17章）",
    "第四部分：独立功能的实现（第18至24章）",
    "结构、函数、命令与事件四层追踪",
    "逐章故障实验和最终源码口试",
  ],
};

export function RdiOfficialLearningMapStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function RdiOfficialLearningMapTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function RdiOfficialLearningMapEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
