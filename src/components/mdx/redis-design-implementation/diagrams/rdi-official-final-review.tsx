import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第2版全书总复习",
  focus:
    "从一条命令反向串联客户端、事件、对象、结构、持久化、复制、集群与独立功能",
  invariant:
    "任何实现结论可追溯到Redis 3.0目录、结构字段、函数路径、运行指标和故障对账",
  artifact: "24章追踪矩阵、综合时序图、崩溃与切换演练、源码口试记录",
  nodes: [
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
    "第24章 监视器",
  ],
};

export function RdiOfficialFinalReviewStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function RdiOfficialFinalReviewTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function RdiOfficialFinalReviewEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
