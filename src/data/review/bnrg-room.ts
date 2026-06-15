/** 复习题库 · 数据库与Room库（bnrg-room）。Big Nerd Ranch Guide 第 11 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgRoomQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-rm-1",
    chapter: "bnrg-room",
    level: 1,
    question: "Room 三件套是什么？",
    answer:
      "Entity：用 @Entity 标注的数据类，映射数据库表。@Dao：数据访问对象，定义增删改查 SQL 或方法。@Database：抽象类，注册 Entity 和 Dao，提供数据库实例。",
    tags: ["Room", "Entity"],
  },
  {
    id: "bnrg-rm-2",
    chapter: "bnrg-room",
    level: 1,
    question: "Room 的 `@Insert`、`@Update`、`@Delete`、`@Query` 各做什么？",
    answer:
      "@Insert 插入行，可设 OnConflictStrategy。@Update 按主键更新。@Delete 按主键删除。@Query 执行自定义 SQL（SELECT 返回 List 或 Flow，写操作返回 Int 影响行数）。",
    tags: ["Dao", "注解"],
  },
  {
    id: "bnrg-rm-3",
    chapter: "bnrg-room",
    level: 2,
    question: "为什么 Room 数据库操作不能放在主线程？",
    answer:
      "磁盘 IO 是阻塞操作——主线程执行会导致 ANR。Room 默认禁止主线程访问（allowMainThreadQueries 仅用于调试）。应在协程、LiveData/Flow 或后台线程执行。",
    tags: ["主线程", "ANR"],
  },
  {
    id: "bnrg-rm-4",
    chapter: "bnrg-room",
    level: 2,
    question: "数据库 Schema 变更时 Migration 是干什么的？",
    answer:
      "Migration 定义从旧版本到新版本的 SQL 迁移脚本（如 ALTER TABLE ADD COLUMN），避免用户升级 App 时因表结构不匹配而丢数据或崩溃。Room 的 fallbackToDestructiveMigration 会删库重建（仅开发用）。",
    tags: ["Migration", "Schema"],
  },
  {
    id: "bnrg-rm-5",
    chapter: "bnrg-room",
    level: 3,
    question: "Dao 返回 `Flow<List<Entity>>` 和返回 `List<Entity>` 的使用场景区别？",
    answer:
      "Flow 会在数据库表变化时自动推送新数据——适合 UI 观察式更新（配合 collect/LiveData）。一次性 List 适合后台任务读一次数据。UI 层推荐 Flow + 协程 collect。",
    tags: ["Flow", "观察"],
  },
];

export default bnrgRoomQuestions;
