import type { ReviewQuestion } from "./types";

export const gspDataPersistenceQuestions: ReviewQuestion[] = [
  {
    id: "gsp-data-persistence-1",
    chapter: "gsp-data-persistence",
    level: 2,
    question: `为什么游戏服务器用 Redis + MySQL 两层而不是只用 MySQL？`,
    answer:
      `MySQL 的磁盘 IO 延迟（毫秒到十毫秒级）远高于 Redis 的内存访问（亚毫秒级）。游戏服务器每秒可能有数万次读写，每次查 MySQL 会拖垮逻辑线程导致卡顿。Redis 把热数据放在内存里，读写几乎零等待；MySQL 作为持久层保证数据不丢。两层架构兼顾了性能（Redis）和可靠性（MySQL）。`,
    tags: ["Redis", "MySQL", "持久化", "性能"],
  },
  {
    id: "gsp-data-persistence-2",
    chapter: "gsp-data-persistence",
    level: 2,
    question: `定时落库的数据丢失窗口是什么？如何处理关键操作？`,
    answer:
      `数据丢失窗口是两次落库之间的时间间隔——服务器在这期间崩溃，未落库的脏数据会丢。关键操作（充值、交易、抽卡）用即时落库（同步写 MySQL），因为涉及真实价值不可丢失。非关键操作（移动、普通战斗）用定时落库减少 MySQL 压力，丢几秒数据可接受。区分关键和非关键是设计核心判断。`,
    tags: ["定时落库", "即时落库", "数据安全"],
  },
  {
    id: "gsp-data-persistence-3",
    chapter: "gsp-data-persistence",
    level: 3,
    question: `Cache-Aside 读写策略的具体流程是什么？`,
    answer:
      `读流程：先查 Redis 缓存，命中则直接返回；未命中（Cache Miss）则查 MySQL，将结果回填 Redis 后返回。写流程：先更新 Redis 中的数据，然后标记该数据为「脏」，由定时任务扫描脏标记集合，批量 UPDATE 到 MySQL 后清除脏标记。这种策略保证读性能（Redis 命中）同时减少写压力（批量落库）。`,
    tags: ["Cache-Aside", "读写策略", "缓存"],
  },
  {
    id: "gsp-data-persistence-4",
    chapter: "gsp-data-persistence",
    level: 1,
    question: `游戏数据表设计时，inventory 表为什么要建 (player_id, slot) 联合唯一索引？`,
    answer:
      `inventory 表存储玩家背包物品，查询模式是「按玩家ID查所有物品」和「按玩家ID+槽位查特定物品」。联合唯一索引 (player_id, slot) 有两个作用：1）保证同一玩家的同一槽位不会出现两条记录（数据完整性约束）；2）加速按 player_id 查询（最左前缀匹配），同时避免同槽位冲突写入。这是「查询模式决定索引设计」的典型应用。`,
    tags: ["MySQL", "索引", "表设计"],
  },
];
