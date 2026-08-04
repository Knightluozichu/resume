# 内容质量修复台账（§6–§9 规范）

> 生成时间：2026-08-03 · 数据源：全库 225 本 / 4496 章逐章扫描
> 规范依据：docs/rewrite-prompt-spec.md（§6 代码对照 / §7 常见误区 / §8 小结与练习 / §9 出处声明）
> 扫描口径：C 型章节 = 含 ≥2 个编程语言代码块；§6/§7/§8 练习项仅对 C 型章节强制；§8 小结与 §9 Attribution 全章节强制

## 工作流程（严格执行）

1. 从本文件获取**第一个"待修复"章节**
2. 完成该章节的修复或重写
3. 更新本文件，将该章节标记为"✅ 已完成"并注明日期
4. 获取下一个待修复章节，重复 2–3
5. 整本书全部章节修复完成后：重跑视觉巡检 → audit --update-ledger → 发布门禁 → git push → ./deploy.sh --book <slug> 部署 → 验线上
6. 在本文件记录该书完成情况和部署状态
7. 一个完整系列修复完成后**暂停**，等待审查确认后再进入下一个系列

## 进度总览

- 待修复章节总数：**4456**（不合规项 11667 个）
- 系列进度：0 / 20
- 书籍进度：0 / 225
- 当前进行中：（待开始）

---

## 系列 01：数据库系列（6 本 · 139 章待修 · 165 项）

**系列状态**：✅ 规范修复完成（2026-08-03，6 本书 139 章全部补齐 §8 小结；部署均受阻于既有门禁失败，待全面重写后上架）

### 1.1 ddia（15 章 · 待修 15 章 · 15 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03，15 章补小结 + 修复 15 处 Answer 嵌套 hydration 错误）；⛔ 部署受阻：ledger 状态 failed（缺真图解、章内模板复制 within-chapter-template-copy、quality-v2-unreviewed），需全面重写后方可上架

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | ddia/00-learning-map/ddi-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | ddia/01-reliable-scalable-maintainable/ddi-01-reliable-scalable-maintainable-applications.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | ddia/02-data-models-query-languages/ddi-02-data-models-query-languages.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | ddia/03-storage-retrieval/ddi-03-storage-retrieval.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | ddia/04-encoding-evolution/ddi-04-encoding-evolution.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | ddia/05-replication/ddi-05-replication.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | ddia/06-partitioning/ddi-06-partitioning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | ddia/07-transactions/ddi-07-transactions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | ddia/08-trouble-distributed-systems/ddi-08-trouble-distributed-systems.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | ddia/09-consistency-consensus/ddi-09-consistency-consensus.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | ddia/10-batch-processing/ddi-10-batch-processing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | ddia/11-stream-processing/ddi-11-stream-processing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | ddia/12-future-data-systems/ddi-12-future-data-systems.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | ddia/13-glossary/ddi-glossary.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | ddia/99-final-review/ddi-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：未部署（门禁硬阻断，详见书籍状态）

### 1.2 high-performance-mysql（17 章 · 待修 17 章 · 17 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03，17 章补小结 + 修复 Answer 嵌套）；⛔ 部署受阻：ledger failed（模板复制、未评审），需全面重写

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | high-performance-mysql/00-learning-map/hpm4-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | high-performance-mysql/01-mysql-architecture/hpm4-ch01-mysql-architecture.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | high-performance-mysql/02-reliability-monitoring/hpm4-ch02-reliability-monitoring.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | high-performance-mysql/03-performance-schema/hpm4-ch03-performance-schema.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | high-performance-mysql/04-os-hardware/hpm4-ch04-os-hardware.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | high-performance-mysql/05-server-settings/hpm4-ch05-server-settings.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | high-performance-mysql/06-schema-design/hpm4-ch06-schema-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | high-performance-mysql/07-indexing/hpm4-ch07-indexing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | high-performance-mysql/08-query-optimization/hpm4-ch08-query-optimization.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | high-performance-mysql/09-replication/hpm4-ch09-replication.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | high-performance-mysql/10-backup-recovery/hpm4-ch10-backup-recovery.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | high-performance-mysql/11-scaling/hpm4-ch11-scaling.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | high-performance-mysql/12-mysql-cloud/hpm4-ch12-mysql-cloud.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | high-performance-mysql/13-compliance/hpm4-ch13-compliance.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | high-performance-mysql/14-appendix-a/hpm4-appendix-a-upgrading.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | high-performance-mysql/15-appendix-b/hpm4-appendix-b-kubernetes.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | high-performance-mysql/99-final-review/hpm4-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 1.3 mysql-essentials（22 章 · 待修 22 章 · 22 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03，22 章补小结 + Answer 嵌套修复）；⛔ 部署受阻：ledger failed（模板复制、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mysql-essentials/00-learning-map/mse-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | mysql-essentials/01-database-overview/mse-ch01-database-overview.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | mysql-essentials/02-install-configuration/mse-ch02-install-configuration.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | mysql-essentials/03-database-operations/mse-ch03-database-operations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | mysql-essentials/04-engines-data-types/mse-ch04-engines-data-types.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | mysql-essentials/05-table-operations/mse-ch05-table-operations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | mysql-essentials/06-indexes/mse-ch06-indexes.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | mysql-essentials/07-views/mse-ch07-views.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | mysql-essentials/08-triggers/mse-ch08-triggers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | mysql-essentials/09-data-manipulation/mse-ch09-data-manipulation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | mysql-essentials/10-single-table-query/mse-ch10-single-table-query.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | mysql-essentials/11-multi-table-query/mse-ch11-multi-table-query.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | mysql-essentials/12-operators/mse-ch12-operators.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | mysql-essentials/13-functions/mse-ch13-functions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | mysql-essentials/14-routines/mse-ch14-routines.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | mysql-essentials/15-transactions/mse-ch15-transactions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | mysql-essentials/16-security/mse-ch16-security.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | mysql-essentials/17-logs/mse-ch17-logs.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | mysql-essentials/18-maintenance-performance/mse-ch18-maintenance-performance.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | mysql-essentials/19-java-bookstore/mse-ch19-java-bookstore.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | mysql-essentials/20-php-exam-system/mse-ch20-php-exam-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | mysql-essentials/99-final-review/mse-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 1.4 sql-ten-minutes（24 章 · 待修 24 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | sql-ten-minutes/00-learning-map/sqt-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | sql-ten-minutes/01-understanding-sql/sqt-lesson01-understanding-sql.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | sql-ten-minutes/02-retrieving-data/sqt-lesson02-retrieving-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | sql-ten-minutes/03-sorting-data/sqt-lesson03-sorting-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | sql-ten-minutes/04-filtering-data/sqt-lesson04-filtering-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | sql-ten-minutes/05-advanced-filtering/sqt-lesson05-advanced-filtering.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | sql-ten-minutes/06-wildcards/sqt-lesson06-wildcards.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | sql-ten-minutes/07-calculated-fields/sqt-lesson07-calculated-fields.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | sql-ten-minutes/08-functions/sqt-lesson08-functions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | sql-ten-minutes/09-summarizing-data/sqt-lesson09-summarizing-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | sql-ten-minutes/10-grouping-data/sqt-lesson10-grouping-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | sql-ten-minutes/11-subqueries/sqt-lesson11-subqueries.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | sql-ten-minutes/12-joining-tables/sqt-lesson12-joining-tables.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | sql-ten-minutes/13-advanced-joins/sqt-lesson13-advanced-joins.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | sql-ten-minutes/14-combining-queries/sqt-lesson14-combining-queries.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | sql-ten-minutes/15-inserting-data/sqt-lesson15-inserting-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | sql-ten-minutes/16-updating-deleting/sqt-lesson16-updating-deleting.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | sql-ten-minutes/17-tables/sqt-lesson17-tables.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | sql-ten-minutes/18-views/sqt-lesson18-views.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | sql-ten-minutes/19-stored-procedures/sqt-lesson19-stored-procedures.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | sql-ten-minutes/20-transactions/sqt-lesson20-transactions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | sql-ten-minutes/21-cursors/sqt-lesson21-cursors.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 23 | sql-ten-minutes/22-advanced-features/sqt-lesson22-advanced-features.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 24 | sql-ten-minutes/99-final-review/sqt-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 1.5 database-system-concepts（35 章 · 待修 35 章 · 35 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03，35 章补小结 + Answer 嵌套修复）；⛔ 部署受阻：ledger failed（visual-evidence-missing）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | database-system-concepts/00-learning-map/dsc-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | database-system-concepts/01-introduction/dsc-ch01-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | database-system-concepts/02-relational-model/dsc-ch02-relational-model.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | database-system-concepts/03-introduction-to-sql/dsc-ch03-introduction-to-sql.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | database-system-concepts/04-intermediate-sql/dsc-ch04-intermediate-sql.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | database-system-concepts/05-advanced-sql/dsc-ch05-advanced-sql.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | database-system-concepts/06-er-design/dsc-ch06-er-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | database-system-concepts/07-relational-design/dsc-ch07-relational-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | database-system-concepts/08-complex-data-types/dsc-ch08-complex-data-types.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | database-system-concepts/09-application-development/dsc-ch09-application-development.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | database-system-concepts/10-big-data/dsc-ch10-big-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | database-system-concepts/11-data-analytics/dsc-ch11-data-analytics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | database-system-concepts/12-physical-storage/dsc-ch12-physical-storage.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | database-system-concepts/13-storage-structures/dsc-ch13-storage-structures.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | database-system-concepts/14-indexing/dsc-ch14-indexing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | database-system-concepts/15-query-processing/dsc-ch15-query-processing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | database-system-concepts/16-query-optimization/dsc-ch16-query-optimization.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | database-system-concepts/17-transactions/dsc-ch17-transactions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | database-system-concepts/18-concurrency-control/dsc-ch18-concurrency-control.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | database-system-concepts/19-recovery/dsc-ch19-recovery.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | database-system-concepts/20-architectures/dsc-ch20-architectures.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | database-system-concepts/21-parallel-distributed-storage/dsc-ch21-parallel-distributed-storage.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 23 | database-system-concepts/22-parallel-distributed-query/dsc-ch22-parallel-distributed-query.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 24 | database-system-concepts/23-distributed-transactions/dsc-ch23-distributed-transactions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 25 | database-system-concepts/24-advanced-indexing/dsc-ch24-advanced-indexing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 26 | database-system-concepts/25-advanced-app-development/dsc-ch25-advanced-app-development.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 27 | database-system-concepts/26-blockchain-databases/dsc-ch26-blockchain-databases.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 28 | database-system-concepts/27-formal-query-languages/dsc-ch27-formal-query-languages.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 29 | database-system-concepts/28-advanced-relational-design/dsc-ch28-advanced-relational-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 30 | database-system-concepts/29-object-based-databases/dsc-ch29-object-based-databases.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 31 | database-system-concepts/30-xml/dsc-ch30-xml.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 32 | database-system-concepts/31-information-retrieval/dsc-ch31-information-retrieval.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 33 | database-system-concepts/32-postgresql/dsc-ch32-postgresql.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 34 | database-system-concepts/33-appendix-a/dsc-appendix-a-university-schema.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 35 | database-system-concepts/99-final-review/dsc-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 1.6 redis-design-implementation（26 章 · 待修 26 章 · 52 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | redis-design-implementation/00-learning-map/rdi-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | redis-design-implementation/01-introduction/rdi-01-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | redis-design-implementation/02-simple-dynamic-string/rdi-02-simple-dynamic-string.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | redis-design-implementation/03-linked-list/rdi-03-linked-list.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | redis-design-implementation/04-dictionary/rdi-04-dictionary.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | redis-design-implementation/05-skiplist/rdi-05-skiplist.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | redis-design-implementation/06-integer-set/rdi-06-integer-set.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | redis-design-implementation/07-ziplist/rdi-07-ziplist.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | redis-design-implementation/08-object/rdi-08-object.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | redis-design-implementation/09-database/rdi-09-database.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | redis-design-implementation/10-rdb-persistence/rdi-10-rdb-persistence.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | redis-design-implementation/11-aof-persistence/rdi-11-aof-persistence.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | redis-design-implementation/12-event/rdi-12-event.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | redis-design-implementation/13-client/rdi-13-client.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | redis-design-implementation/14-server/rdi-14-server.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | redis-design-implementation/15-replication/rdi-15-replication.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | redis-design-implementation/16-sentinel/rdi-16-sentinel.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | redis-design-implementation/17-cluster/rdi-17-cluster.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | redis-design-implementation/18-pubsub/rdi-18-pubsub.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | redis-design-implementation/19-transaction/rdi-19-transaction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | redis-design-implementation/20-lua/rdi-20-lua.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | redis-design-implementation/21-sort/rdi-21-sort.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | redis-design-implementation/22-bit-array/rdi-22-bit-array.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | redis-design-implementation/23-slow-log/rdi-23-slow-log.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | redis-design-implementation/24-monitor/rdi-24-monitor.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | redis-design-implementation/99-final-review/rdi-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 02：网络与中间件系列（9 本 · 170 章待修 · 195 项）

**系列状态**：✅ 规范修复完成（2026-08-03，9 本 170 章；5 本已上架书修复后重新部署上线，4 本未上架书仅修复）

### 2.1 illustrated-server-network（8 章 · 待修 8 章 · 8 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03，8 章补小结）；🚀 已部署上线（2026-08-03 release-20260803T080827Z，8 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | illustrated-server-network/00-official-learning-map/isn-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | illustrated-server-network/01-00-book-usage/isn-00-book-usage.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | illustrated-server-network/02-01-physical-design/isn-01-physical-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | illustrated-server-network/03-02-logical-design/isn-02-logical-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | illustrated-server-network/04-03-security-load-balancing/isn-03-security-load-balancing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | illustrated-server-network/05-04-high-availability/isn-04-high-availability.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | illustrated-server-network/06-05-management-design/isn-05-management-design.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | illustrated-server-network/07-official-final-review/isn-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：https://blog.luozichu.ink 已上线（2026-08-03）

### 2.2 computer-networks-top-down（10 章 · 待修 10 章 · 10 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T081638Z，10 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | computer-networks-top-down/00-cnt8-official-learning-map/cnt8-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | computer-networks-top-down/01-cnt8-01-internet/cnt8-01-internet.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | computer-networks-top-down/02-cnt8-02-application/cnt8-02-application.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | computer-networks-top-down/03-cnt8-03-transport/cnt8-03-transport.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | computer-networks-top-down/04-cnt8-04-data-plane/cnt8-04-data-plane.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | computer-networks-top-down/05-cnt8-05-control-plane/cnt8-05-control-plane.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | computer-networks-top-down/06-cnt8-06-link-lans/cnt8-06-link-lans.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | computer-networks-top-down/07-cnt8-07-wireless-mobile/cnt8-07-wireless-mobile.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | computer-networks-top-down/08-cnt8-08-security/cnt8-08-security.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | computer-networks-top-down/09-cnt8-official-final-review/cnt8-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.3 illustrated-http（13 章 · 待修 13 章 · 13 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T082559Z，13 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | illustrated-http/00-official-learning-map/ilh-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | illustrated-http/01-chapter-01/ilh-01-web-network-foundations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | illustrated-http/02-chapter-02/ilh-02-simple-http-protocol.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | illustrated-http/03-chapter-03/ilh-03-http-message-information.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | illustrated-http/04-chapter-04/ilh-04-http-status-codes.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | illustrated-http/05-chapter-05/ilh-05-web-servers-cooperation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | illustrated-http/06-chapter-06/ilh-06-http-headers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | illustrated-http/07-chapter-07/ilh-07-https-security.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | illustrated-http/08-chapter-08/ilh-08-user-authentication.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | illustrated-http/09-chapter-09/ilh-09-http-extensions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | illustrated-http/10-chapter-10/ilh-10-web-content-technologies.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | illustrated-http/11-chapter-11/ilh-11-web-attack-techniques.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | illustrated-http/12-official-final-review/ilh-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.4 rabbitmq-practice（17 章 · 待修 17 章 · 17 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03）；⛔ 部署受阻：ledger failed（模板复制、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | rabbitmq-practice/00-learning-map/rmq-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | rabbitmq-practice/01-pulling-rabbit-out-of-hat/rmq-01-pulling-rabbit-out-of-hat.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | rabbitmq-practice/02-understanding-messaging/rmq-02-understanding-messaging.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | rabbitmq-practice/03-running-administering-rabbit/rmq-03-running-administering-rabbit.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | rabbitmq-practice/04-coding-patterns/rmq-04-coding-patterns.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | rabbitmq-practice/05-clustering-failure/rmq-05-clustering-failure.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | rabbitmq-practice/06-surviving-failure/rmq-06-surviving-failure.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | rabbitmq-practice/07-warrens-shovels/rmq-07-warrens-shovels.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | rabbitmq-practice/08-web-administration/rmq-08-web-administration.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | rabbitmq-practice/09-rest-api/rmq-09-rest-api.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | rabbitmq-practice/10-monitoring/rmq-10-monitoring.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | rabbitmq-practice/11-performance-security/rmq-11-performance-security.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | rabbitmq-practice/12-extending-rabbitmq/rmq-12-extending-rabbitmq.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | rabbitmq-practice/13-appendix-a-java-dotnet/rmq-appendix-a-java-dotnet.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | rabbitmq-practice/14-appendix-b-online-resources/rmq-appendix-b-online-resources.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | rabbitmq-practice/15-appendix-c-windows-installation/rmq-appendix-c-windows-installation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | rabbitmq-practice/16-final-review/rmq-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.5 kafka-definitive-guide（18 章 · 待修 18 章 · 18 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03）；⛔ 部署受阻：ledger failed（模板复制、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | kafka-definitive-guide/00-learning-map/kfk-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | kafka-definitive-guide/01-meet-kafka/kfk-01-meet-kafka.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | kafka-definitive-guide/02-installing-kafka/kfk-02-installing-kafka.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | kafka-definitive-guide/03-kafka-producers/kfk-03-kafka-producers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | kafka-definitive-guide/04-kafka-consumers/kfk-04-kafka-consumers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | kafka-definitive-guide/05-programmatic-administration/kfk-05-programmatic-administration.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | kafka-definitive-guide/06-kafka-internals/kfk-06-kafka-internals.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | kafka-definitive-guide/07-reliable-data-delivery/kfk-07-reliable-data-delivery.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | kafka-definitive-guide/08-exactly-once-semantics/kfk-08-exactly-once-semantics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | kafka-definitive-guide/09-building-data-pipelines/kfk-09-building-data-pipelines.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | kafka-definitive-guide/10-cross-cluster-mirroring/kfk-10-cross-cluster-mirroring.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | kafka-definitive-guide/11-securing-kafka/kfk-11-securing-kafka.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | kafka-definitive-guide/12-administering-kafka/kfk-12-administering-kafka.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | kafka-definitive-guide/13-monitoring-kafka/kfk-13-monitoring-kafka.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | kafka-definitive-guide/14-stream-processing/kfk-14-stream-processing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | kafka-definitive-guide/15-appendix-a-installation/kfk-appendix-a-installation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | kafka-definitive-guide/16-appendix-b-tools/kfk-appendix-b-tools.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | kafka-definitive-guide/17-final-review/kfk-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.6 wireshark-packet-analysis（19 章 · 待修 19 章 · 19 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T084313Z，19 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | wireshark-packet-analysis/00-ppa3-official-learning-map/ppa3-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | wireshark-packet-analysis/01-ppa3-introduction/ppa3-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | wireshark-packet-analysis/02-ppa3-01-packet-analysis-network-basics/ppa3-01-packet-analysis-network-basics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | wireshark-packet-analysis/03-ppa3-02-tapping-into-wire/ppa3-02-tapping-into-wire.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | wireshark-packet-analysis/04-ppa3-03-introduction-wireshark/ppa3-03-introduction-wireshark.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | wireshark-packet-analysis/05-ppa3-04-working-captured-packets/ppa3-04-working-captured-packets.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | wireshark-packet-analysis/06-ppa3-05-advanced-wireshark-features/ppa3-05-advanced-wireshark-features.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | wireshark-packet-analysis/07-ppa3-06-command-line-analysis/ppa3-06-command-line-analysis.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | wireshark-packet-analysis/08-ppa3-07-network-layer-protocols/ppa3-07-network-layer-protocols.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | wireshark-packet-analysis/09-ppa3-08-transport-layer-protocols/ppa3-08-transport-layer-protocols.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | wireshark-packet-analysis/10-ppa3-09-upper-layer-protocols/ppa3-09-upper-layer-protocols.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | wireshark-packet-analysis/11-ppa3-10-real-world-scenarios/ppa3-10-real-world-scenarios.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | wireshark-packet-analysis/12-ppa3-11-fighting-slow-network/ppa3-11-fighting-slow-network.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | wireshark-packet-analysis/13-ppa3-12-security-analysis/ppa3-12-security-analysis.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | wireshark-packet-analysis/14-ppa3-13-wireless-analysis/ppa3-13-wireless-analysis.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | wireshark-packet-analysis/15-ppa3-appendix-a/ppa3-appendix-a.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | wireshark-packet-analysis/16-ppa3-appendix-b/ppa3-appendix-b.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | wireshark-packet-analysis/17-ppa3-index/ppa3-index.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | wireshark-packet-analysis/18-ppa3-official-final-review/ppa3-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.7 kong-gateway（22 章 · 待修 22 章 · 22 项）

**书籍状态**：✅ §6–§9 规范修复完成（2026-08-03）；⛔ 部署受阻：ledger failed（模板复制、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | kong-gateway/00-learning-map/kga-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | kong-gateway/01-01-overview/kga-01-overview.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | kong-gateway/02-02-nginx/kga-02-nginx.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | kong-gateway/03-03-lua/kga-03-lua.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | kong-gateway/04-04-openresty/kga-04-openresty.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | kong-gateway/05-05-config-deployment/kga-05-config-deployment.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | kong-gateway/06-06-cli/kga-06-cli.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | kong-gateway/07-07-proxy-auth/kga-07-proxy-auth.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | kong-gateway/08-08-load-balancing-health/kga-08-load-balancing-health.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | kong-gateway/09-09-plugins/kga-09-plugins.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | kong-gateway/10-10-logging/kga-10-logging.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | kong-gateway/11-11-operations/kga-11-operations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | kong-gateway/12-12-security-ha/kga-12-security-ha.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | kong-gateway/13-13-microservices-devops/kga-13-microservices-devops.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | kong-gateway/14-14-kubernetes/kga-14-kubernetes.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | kong-gateway/15-15-kuma/kga-15-kuma.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | kong-gateway/16-16-serverless/kga-16-serverless.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | kong-gateway/17-appendix-a-docker/kga-appendix-a-docker.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | kong-gateway/18-appendix-b-konga/kga-appendix-b-konga.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | kong-gateway/19-appendix-c-database/kga-appendix-c-database.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | kong-gateway/20-appendix-d-admin-api/kga-appendix-d-admin-api.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | kong-gateway/21-final-review/kga-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.8 http-definitive-guide（38 章 · 待修 38 章 · 38 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T085936Z，38 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | http-definitive-guide/00-hdg1-official-learning-map/hdg1-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | http-definitive-guide/01-hdg1-part-1/hdg1-part-1.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | http-definitive-guide/02-hdg1-01/hdg1-01.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | http-definitive-guide/03-hdg1-02/hdg1-02.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | http-definitive-guide/04-hdg1-03/hdg1-03.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | http-definitive-guide/05-hdg1-04/hdg1-04.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | http-definitive-guide/06-hdg1-part-2/hdg1-part-2.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | http-definitive-guide/07-hdg1-05/hdg1-05.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | http-definitive-guide/08-hdg1-06/hdg1-06.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | http-definitive-guide/09-hdg1-07/hdg1-07.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | http-definitive-guide/10-hdg1-08/hdg1-08.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | http-definitive-guide/11-hdg1-09/hdg1-09.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | http-definitive-guide/12-hdg1-10/hdg1-10.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | http-definitive-guide/13-hdg1-part-3/hdg1-part-3.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | http-definitive-guide/14-hdg1-11/hdg1-11.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | http-definitive-guide/15-hdg1-12/hdg1-12.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | http-definitive-guide/16-hdg1-13/hdg1-13.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | http-definitive-guide/17-hdg1-14/hdg1-14.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | http-definitive-guide/18-hdg1-part-4/hdg1-part-4.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | http-definitive-guide/19-hdg1-15/hdg1-15.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | http-definitive-guide/20-hdg1-16/hdg1-16.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | http-definitive-guide/21-hdg1-17/hdg1-17.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 23 | http-definitive-guide/22-hdg1-part-5/hdg1-part-5.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 24 | http-definitive-guide/23-hdg1-18/hdg1-18.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 25 | http-definitive-guide/24-hdg1-19/hdg1-19.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 26 | http-definitive-guide/25-hdg1-20/hdg1-20.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 27 | http-definitive-guide/26-hdg1-21/hdg1-21.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 28 | http-definitive-guide/27-hdg1-part-6/hdg1-part-6.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 29 | http-definitive-guide/28-hdg1-appendix-a/hdg1-appendix-a.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 30 | http-definitive-guide/29-hdg1-appendix-b/hdg1-appendix-b.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 31 | http-definitive-guide/30-hdg1-appendix-c/hdg1-appendix-c.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 32 | http-definitive-guide/31-hdg1-appendix-d/hdg1-appendix-d.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 33 | http-definitive-guide/32-hdg1-appendix-e/hdg1-appendix-e.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 34 | http-definitive-guide/33-hdg1-appendix-f/hdg1-appendix-f.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 35 | http-definitive-guide/34-hdg1-appendix-g/hdg1-appendix-g.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 36 | http-definitive-guide/35-hdg1-appendix-h/hdg1-appendix-h.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 37 | http-definitive-guide/36-hdg1-index/hdg1-index.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 38 | http-definitive-guide/37-hdg1-official-final-review/hdg1-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 2.9 tcp-ip-illustrated-vol1（25 章 · 待修 25 章 · 50 项）

**书籍状态**：✅ §8 小结 + §9 Attribution 修复完成（2026-08-03）；⛔ 部署受阻：ledger failed（模板复制、块计数、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | tcp-ip-illustrated-vol1/00-tip2-official-learning-map/tip2-official-learning-map.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 2 | tcp-ip-illustrated-vol1/01-tip2-foreword/tip2-foreword.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 3 | tcp-ip-illustrated-vol1/02-tip2-preface-second-edition/tip2-preface-second-edition.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 4 | tcp-ip-illustrated-vol1/03-tip2-adapted-preface-first-edition/tip2-adapted-preface-first-edition.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 5 | tcp-ip-illustrated-vol1/04-tip2-01-introduction/tip2-01-introduction.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 6 | tcp-ip-illustrated-vol1/05-tip2-02-address-architecture/tip2-02-address-architecture.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 7 | tcp-ip-illustrated-vol1/06-tip2-03-link-layer/tip2-03-link-layer.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 8 | tcp-ip-illustrated-vol1/07-tip2-04-arp/tip2-04-arp.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 9 | tcp-ip-illustrated-vol1/08-tip2-05-internet-protocol/tip2-05-internet-protocol.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 10 | tcp-ip-illustrated-vol1/09-tip2-06-dhcp-autoconfiguration/tip2-06-dhcp-autoconfiguration.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 11 | tcp-ip-illustrated-vol1/10-tip2-07-firewalls-nat/tip2-07-firewalls-nat.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 12 | tcp-ip-illustrated-vol1/11-tip2-08-icmp/tip2-08-icmp.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 13 | tcp-ip-illustrated-vol1/12-tip2-09-broadcast-multicast/tip2-09-broadcast-multicast.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 14 | tcp-ip-illustrated-vol1/13-tip2-10-udp-fragmentation/tip2-10-udp-fragmentation.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 15 | tcp-ip-illustrated-vol1/14-tip2-11-dns/tip2-11-dns.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 16 | tcp-ip-illustrated-vol1/15-tip2-12-tcp-preliminaries/tip2-12-tcp-preliminaries.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 17 | tcp-ip-illustrated-vol1/16-tip2-13-tcp-connection-management/tip2-13-tcp-connection-management.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 18 | tcp-ip-illustrated-vol1/17-tip2-14-tcp-timeout-retransmission/tip2-14-tcp-timeout-retransmission.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 19 | tcp-ip-illustrated-vol1/18-tip2-15-tcp-data-flow-window/tip2-15-tcp-data-flow-window.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 20 | tcp-ip-illustrated-vol1/19-tip2-16-tcp-congestion-control/tip2-16-tcp-congestion-control.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 21 | tcp-ip-illustrated-vol1/20-tip2-17-tcp-keepalive/tip2-17-tcp-keepalive.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 22 | tcp-ip-illustrated-vol1/21-tip2-18-security/tip2-18-security.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 23 | tcp-ip-illustrated-vol1/22-tip2-glossary-acronyms/tip2-glossary-acronyms.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 24 | tcp-ip-illustrated-vol1/23-tip2-index/tip2-index.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 25 | tcp-ip-illustrated-vol1/24-tip2-official-final-review/tip2-official-final-review.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-03 |

**部署记录**：—


## 系列 03：汽车软件系列（7 本 · 86 章待修 · 206 项）

**系列状态**：✅ 修复完成（2026-08-03，7 本 86 章；4 本已上架书重新部署上线，3 本未上架书规范修复完成）

### 3.1 car-structure-illustrated（9 章 · 待修 9 章 · 9 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T093901Z，9 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | car-structure-illustrated/00-map/csi23-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | car-structure-illustrated/01-book-guide/csi23-book-guide.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | car-structure-illustrated/02-prologue/csi23-prologue.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | car-structure-illustrated/03-01-vehicle-structure/csi23-01-vehicle-structure.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | car-structure-illustrated/04-02-production/csi23-02-production.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | car-structure-illustrated/05-03-eco-cars/csi23-03-eco-cars.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | car-structure-illustrated/06-final-future/csi23-final-future.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | car-structure-illustrated/07-index/csi23-index.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | car-structure-illustrated/08-review/csi23-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 3.2 automotive-systems-specialization（13 章 · 待修 13 章 · 13 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T094915Z，13 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | automotive-systems-specialization/00-intro/learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | automotive-systems-specialization/01-engine-power/drivetrain-components.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | automotive-systems-specialization/01-engine-power/engine-performance.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | automotive-systems-specialization/01-engine-power/engine-thermodynamics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | automotive-systems-specialization/01-engine-power/transmission-types.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | automotive-systems-specialization/02-chassis-control/steering-brake-systems.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | automotive-systems-specialization/02-chassis-control/suspension-systems.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | automotive-systems-specialization/03-electronics/body-electronics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | automotive-systems-specialization/03-electronics/ecu-can-bus.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | automotive-systems-specialization/03-electronics/sensors-actuators.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | automotive-systems-specialization/04-ev/battery-management.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | automotive-systems-specialization/04-ev/ev-motor-controller.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | automotive-systems-specialization/04-ev/final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 3.3 autosar-vehicle-controller（13 章 · 待修 13 章 · 13 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T102657Z，13 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | autosar-vehicle-controller/00-map/avc2-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | autosar-vehicle-controller/01-01-automotive-electronics/avc2-01-automotive-electronics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | autosar-vehicle-controller/02-02-autosar-foundations/avc2-02-autosar-foundations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | autosar-vehicle-controller/03-03-example-solutions/avc2-03-example-solutions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | autosar-vehicle-controller/04-04-swc-development/avc2-04-swc-development.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | autosar-vehicle-controller/05-05-system-design-configuration/avc2-05-system-design-configuration.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | autosar-vehicle-controller/06-06-rte-bsw/avc2-06-rte-bsw.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | autosar-vehicle-controller/07-07-mcal/avc2-07-mcal.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | autosar-vehicle-controller/08-08-integration-debugging/avc2-08-integration-debugging.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | autosar-vehicle-controller/09-09-functional-safety/avc2-09-functional-safety.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | autosar-vehicle-controller/10-10-outlook/avc2-10-outlook.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | autosar-vehicle-controller/11-references/avc2-references.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | autosar-vehicle-controller/12-review/avc2-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 3.4 vehicle-software-intelligence（13 章 · 待修 13 章 · 13 项）

**书籍状态**：✅ §9 Attribution 修复完成（2026-08-03）；⛔ 部署受阻：ledger failed（official-course-template、块计数、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | vehicle-software-intelligence/00-intro/learning-map.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 2 | vehicle-software-intelligence/01-cockpit/ivi-platform.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 3 | vehicle-software-intelligence/01-cockpit/smart-cockpit.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 4 | vehicle-software-intelligence/02-middleware/middleware.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 5 | vehicle-software-intelligence/02-middleware/ota-updates.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 6 | vehicle-software-intelligence/03-perception/perception-algorithms.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 7 | vehicle-software-intelligence/03-perception/perception-sensors.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 8 | vehicle-software-intelligence/03-perception/sensor-fusion.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 9 | vehicle-software-intelligence/04-planning-control/cybersecurity.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 10 | vehicle-software-intelligence/04-planning-control/final-review.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 11 | vehicle-software-intelligence/04-planning-control/functional-safety.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 12 | vehicle-software-intelligence/04-planning-control/path-planning.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 13 | vehicle-software-intelligence/04-planning-control/vehicle-control.mdx | §9缺Attribution | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 3.5 auto-why-car-runs（14 章 · 待修 14 章 · 14 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T112959Z，14 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | auto-why-car-runs/00-learning-map/learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | auto-why-car-runs/01-whole-car/whole-car-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | auto-why-car-runs/02-body/body-structure.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | auto-why-car-runs/03-engine/engine-principles.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | auto-why-car-runs/04-transmission/transmission-principles.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | auto-why-car-runs/05-drivetrain/drivetrain-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | auto-why-car-runs/06-suspension/suspension-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | auto-why-car-runs/07-steering/steering-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | auto-why-car-runs/08-brake/brake-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | auto-why-car-runs/09-electronics/electronics-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | auto-why-car-runs/10-tires/tire-wheel-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | auto-why-car-runs/11-electric-drive/electric-drive-system.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | auto-why-car-runs/12-design-manufacturing/design-manufacturing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | auto-why-car-runs/13-final-review/final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 3.6 soa-vehicle-architecture（11 章 · 待修 11 章 · 66 项）

**书籍状态**：✅ 深度修复完成（2026-08-03，11 章全补 CodeTabs/误区/小结/练习/独立题/Attribution，页面渲染验证 200）；⛔ 部署受阻：ledger failed（正文模板复制、块计数、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | soa-vehicle-architecture/00-map/aes23-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 2 | soa-vehicle-architecture/01-foreword/aes23-foreword.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 3 | soa-vehicle-architecture/02-preface/aes23-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 4 | soa-vehicle-architecture/03-01-architecture/aes23-01-architecture.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 5 | soa-vehicle-architecture/04-02-networks/aes23-02-networks.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 6 | soa-vehicle-architecture/05-03-software/aes23-03-software.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 7 | soa-vehicle-architecture/06-04-soa/aes23-04-soa.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 8 | soa-vehicle-architecture/07-05-development-ota/aes23-05-development-ota.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 9 | soa-vehicle-architecture/08-afterword/aes23-afterword.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 10 | soa-vehicle-architecture/09-references/aes23-references.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 11 | soa-vehicle-architecture/10-review/aes23-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 3.7 illustrated-nev（13 章 · 待修 13 章 · 78 项）

**书籍状态**：✅ 深度修复完成（2026-08-03，13 章全补 CodeTabs/误区/小结/练习/独立题/Attribution）；⛔ 部署受阻：ledger failed（generic-quality-prose、模板复制、块计数、未评审）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | illustrated-nev/00-map/ine23-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 2 | illustrated-nev/01-content-summary/ine23-content-summary.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 3 | illustrated-nev/02-preface/ine23-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 4 | illustrated-nev/03-01-classification/ine23-01-classification.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 5 | illustrated-nev/04-02-motors/ine23-02-motors.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 6 | illustrated-nev/05-03-batteries/ine23-03-batteries.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 7 | illustrated-nev/06-04-battery-electric-vehicles/ine23-04-battery-electric-vehicles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 8 | illustrated-nev/07-05-hybrid-vehicles/ine23-05-hybrid-vehicles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 9 | illustrated-nev/08-06-fuel-cell-vehicles/ine23-06-fuel-cell-vehicles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 10 | illustrated-nev/09-07-natural-gas-vehicles/ine23-07-natural-gas-vehicles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 11 | illustrated-nev/10-08-lpg-vehicles/ine23-08-lpg-vehicles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 12 | illustrated-nev/11-references/ine23-references.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |
| 13 | illustrated-nev/12-review/ine23-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-03 |

**部署记录**：—


## 系列 04：机器学习与深度学习系列（13 本 · 260 章待修 · 260 项）

**系列状态**：✅ 修复完成（2026-08-03，13 本 260 章全部部署上线）

### 4.1 rl-deep-learning-c（6 章 · 待修 6 章 · 6 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T121434Z，6 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | rl-deep-learning-c/00-learning-map/rlc-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | rl-deep-learning-c/01-rl-deep-learning/rlc-01-rl-deep-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | rl-deep-learning-c/02-reinforcement-implementation/rlc-02-reinforcement-implementation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | rl-deep-learning-c/03-deep-learning-techniques/rlc-03-deep-learning-techniques.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | rl-deep-learning-c/04-deep-reinforcement-learning/rlc-04-deep-reinforcement-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | rl-deep-learning-c/05-final-review/rlc-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.2 illustrated-dl（10 章 · 待修 10 章 · 10 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T122135Z，10 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | illustrated-dl/00-guide/idl-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | illustrated-dl/01-introduction/idl-01-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | illustrated-dl/02-neural-networks/idl-02-neural-networks.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | illustrated-dl/03-convolutional-networks/idl-03-convolutional-neural-networks.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | illustrated-dl/04-boltzmann-machines/idl-04-restricted-boltzmann-machines.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | illustrated-dl/05-autoencoders/idl-05-autoencoders.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | illustrated-dl/06-generalization/idl-06-improving-generalization.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | illustrated-dl/07-tools/idl-07-deep-learning-tools.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | illustrated-dl/08-present-future/idl-08-present-and-future.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | illustrated-dl/09-review/idl-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.3 deep-learning-from-scratch（11 章 · 待修 11 章 · 11 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T122905Z，11 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-learning-from-scratch/00-guide/dls-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-learning-from-scratch/01-foundations/dls-01-python-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-learning-from-scratch/01-foundations/dls-02-perceptron.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-learning-from-scratch/02-forward-learning/dls-03-neural-network.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-learning-from-scratch/02-forward-learning/dls-04-neural-network-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-learning-from-scratch/03-backpropagation/dls-05-backpropagation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-learning-from-scratch/04-training/dls-06-learning-techniques.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-learning-from-scratch/05-cnn/dls-07-cnn.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-learning-from-scratch/06-deep-learning/dls-08-deep-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-learning-from-scratch/07-appendix/dls-appendix-softmax-loss.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-learning-from-scratch/08-review/dls-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.4 deep-learning-nlp-advanced（13 章 · 待修 13 章 · 13 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T123650Z，13 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-learning-nlp-advanced/00-guide/dna-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-learning-nlp-advanced/01-neural-network-review/dna-01-neural-network-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-learning-nlp-advanced/02-distributed-word-representations/dna-02-distributed-word-representations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-learning-nlp-advanced/03-word2vec/dna-03-word2vec.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-learning-nlp-advanced/04-word2vec-acceleration/dna-04-word2vec-acceleration.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-learning-nlp-advanced/05-rnn/dna-05-rnn.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-learning-nlp-advanced/06-gated-rnn/dna-06-gated-rnn.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-learning-nlp-advanced/07-rnn-text-generation/dna-07-rnn-text-generation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-learning-nlp-advanced/08-attention/dna-08-attention.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-learning-nlp-advanced/09-appendices/dna-appendix-a-activation-derivatives.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-learning-nlp-advanced/09-appendices/dna-appendix-b-wordnet.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | deep-learning-nlp-advanced/09-appendices/dna-appendix-c-gru.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | deep-learning-nlp-advanced/10-review/dna-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.5 deep-learning-gen-models（16 章 · 待修 16 章 · 16 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T124505Z，16 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-learning-gen-models/00-learning-map/dlg-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-learning-gen-models/01-normal-distribution/dlg-01-normal-distribution.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-learning-gen-models/02-maximum-likelihood/dlg-02-maximum-likelihood.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-learning-gen-models/03-multivariate-normal/dlg-03-multivariate-normal.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-learning-gen-models/04-gaussian-mixture/dlg-04-gaussian-mixture.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-learning-gen-models/05-em-algorithm/dlg-05-em-algorithm.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-learning-gen-models/06-neural-network/dlg-06-neural-network.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-learning-gen-models/07-vae/dlg-07-vae.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-learning-gen-models/08-diffusion-theory/dlg-08-diffusion-theory.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-learning-gen-models/09-diffusion-implementation/dlg-09-diffusion-implementation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-learning-gen-models/10-diffusion-applications/dlg-10-diffusion-applications.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | deep-learning-gen-models/11-appendices/dlg-appendix-a-multivariate-mle.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | deep-learning-gen-models/11-appendices/dlg-appendix-b-jensen.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | deep-learning-gen-models/11-appendices/dlg-appendix-c-hierarchical-vae.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | deep-learning-gen-models/11-appendices/dlg-appendix-d-notation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | deep-learning-gen-models/12-final-review/dlg-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.6 deep-learning-rl-from-scratch（16 章 · 待修 16 章 · 16 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T125325Z，16 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-learning-rl-from-scratch/00-guide/dlr-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-learning-rl-from-scratch/01-bandit/dlr-01-bandit.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-learning-rl-from-scratch/02-mdp/dlr-02-mdp.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-learning-rl-from-scratch/03-bellman/dlr-03-bellman.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-learning-rl-from-scratch/04-dynamic-programming/dlr-04-dynamic-programming.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-learning-rl-from-scratch/05-monte-carlo/dlr-05-monte-carlo.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-learning-rl-from-scratch/06-td/dlr-06-td.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-learning-rl-from-scratch/07-neural-q-learning/dlr-07-neural-q-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-learning-rl-from-scratch/08-dqn/dlr-08-dqn.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-learning-rl-from-scratch/09-policy-gradient/dlr-09-policy-gradient.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-learning-rl-from-scratch/10-further/dlr-10-further.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | deep-learning-rl-from-scratch/11-appendices/dlr-appendix-a-off-policy-mc.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | deep-learning-rl-from-scratch/11-appendices/dlr-appendix-b-n-step-td.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | deep-learning-rl-from-scratch/11-appendices/dlr-appendix-c-double-dqn.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | deep-learning-rl-from-scratch/11-appendices/dlr-appendix-d-policy-gradient-proof.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | deep-learning-rl-from-scratch/12-review/dlr-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.7 illustrated-ai（16 章 · 待修 16 章 · 16 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T130146Z，16 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | illustrated-ai/00-guide/iai-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | illustrated-ai/01-foundations/iai-01-ai-past-present-future.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | illustrated-ai/01-foundations/iai-02-rule-systems-variants.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | illustrated-ai/01-foundations/iai-03-automata-artificial-life.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | illustrated-ai/02-weight-optimization/iai-04-weighting-optimal-solutions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | illustrated-ai/02-weight-optimization/iai-05-weighting-optimization-programs.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | illustrated-ai/03-statistical-learning/iai-06-statistical-ml-probability-modeling.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | illustrated-ai/03-statistical-learning/iai-07-statistical-ml-supervised-unsupervised.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | illustrated-ai/04-modern-learning/iai-08-reinforcement-distributed-ai.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | illustrated-ai/04-modern-learning/iai-09-deep-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | illustrated-ai/05-perception-language/iai-10-image-speech-pattern-recognition.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | illustrated-ai/05-perception-language/iai-11-nlp-machine-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | illustrated-ai/06-knowledge-computing/iai-12-knowledge-representation-data-structures.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | illustrated-ai/06-knowledge-computing/iai-13-distributed-computing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | illustrated-ai/07-systems-future/iai-14-big-data-iot.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | illustrated-ai/08-review/iai-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.8 machine-learning-watermelon（19 章 · 待修 19 章 · 19 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T131036Z，19 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | machine-learning-watermelon/00-guide/mlw-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | machine-learning-watermelon/01-foundations/mlw-01-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | machine-learning-watermelon/01-foundations/mlw-02-model-assessment-selection.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | machine-learning-watermelon/01-foundations/mlw-03-linear-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | machine-learning-watermelon/02-core-models-a/mlw-04-decision-trees.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | machine-learning-watermelon/02-core-models-a/mlw-05-neural-networks.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | machine-learning-watermelon/02-core-models-a/mlw-06-support-vector-machines.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | machine-learning-watermelon/02-core-models-a/mlw-07-bayesian-classifiers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | machine-learning-watermelon/03-core-models-b/mlw-08-ensemble-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | machine-learning-watermelon/03-core-models-b/mlw-09-clustering.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | machine-learning-watermelon/03-core-models-b/mlw-10-dimensionality-reduction-metric-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | machine-learning-watermelon/04-advanced-a/mlw-11-feature-selection-sparse-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | machine-learning-watermelon/04-advanced-a/mlw-12-computational-learning-theory.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | machine-learning-watermelon/04-advanced-a/mlw-13-semi-supervised-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | machine-learning-watermelon/05-advanced-b/mlw-14-probabilistic-graphical-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | machine-learning-watermelon/05-advanced-b/mlw-15-rule-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | machine-learning-watermelon/05-advanced-b/mlw-16-reinforcement-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | machine-learning-watermelon/06-appendices/mlw-appendices.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | machine-learning-watermelon/07-review/mlw-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.9 pattern-recognition-ml（21 章 · 待修 21 章 · 21 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T132001Z，21 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | pattern-recognition-ml/00-learning-map/prl-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | pattern-recognition-ml/01-introduction/prl-01-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | pattern-recognition-ml/02-probability-distributions/prl-02-probability-distributions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | pattern-recognition-ml/03-linear-regression/prl-03-linear-regression.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | pattern-recognition-ml/04-linear-classification/prl-04-linear-classification.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | pattern-recognition-ml/05-neural-networks/prl-05-neural-networks.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | pattern-recognition-ml/06-kernel-methods/prl-06-kernel-methods.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | pattern-recognition-ml/07-sparse-kernel-machines/prl-07-sparse-kernel-machines.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | pattern-recognition-ml/08-graphical-models/prl-08-graphical-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | pattern-recognition-ml/09-mixture-models-em/prl-09-mixture-models-em.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | pattern-recognition-ml/10-approximate-inference/prl-10-approximate-inference.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | pattern-recognition-ml/11-sampling-methods/prl-11-sampling-methods.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | pattern-recognition-ml/12-continuous-latent-variables/prl-12-continuous-latent-variables.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | pattern-recognition-ml/13-sequential-data/prl-13-sequential-data.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | pattern-recognition-ml/14-combining-models/prl-14-combining-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | pattern-recognition-ml/15-appendix-a-data-sets/prl-appendix-a-data-sets.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | pattern-recognition-ml/16-appendix-b-probability-distributions/prl-appendix-b-probability-distributions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | pattern-recognition-ml/17-appendix-c-properties-matrices/prl-appendix-c-properties-matrices.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | pattern-recognition-ml/18-appendix-d-calculus-variations/prl-appendix-d-calculus-variations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | pattern-recognition-ml/19-appendix-e-lagrange-multipliers/prl-appendix-e-lagrange-multipliers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | pattern-recognition-ml/20-final-review/prl-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.10 deep-learning-textbook（22 章 · 待修 22 章 · 22 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T132912Z，22 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-learning-textbook/00-learning-map/dlt-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-learning-textbook/01-introduction/dlt-01-introduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-learning-textbook/02-linear-algebra/dlt-02-linear-algebra.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-learning-textbook/03-probability-information/dlt-03-probability-information.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-learning-textbook/04-numerical-computation/dlt-04-numerical-computation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-learning-textbook/05-machine-learning-basics/dlt-05-machine-learning-basics.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-learning-textbook/06-feedforward-networks/dlt-06-feedforward-networks.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-learning-textbook/07-regularization/dlt-07-regularization.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-learning-textbook/08-optimization/dlt-08-optimization.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-learning-textbook/09-convolutional-networks/dlt-09-convolutional-networks.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-learning-textbook/10-sequence-modeling/dlt-10-sequence-modeling.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | deep-learning-textbook/11-practical-methodology/dlt-11-practical-methodology.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | deep-learning-textbook/12-applications/dlt-12-applications.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | deep-learning-textbook/13-linear-factor-models/dlt-13-linear-factor-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | deep-learning-textbook/14-autoencoders/dlt-14-autoencoders.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | deep-learning-textbook/15-representation-learning/dlt-15-representation-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | deep-learning-textbook/16-structured-probabilistic-models/dlt-16-structured-probabilistic-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | deep-learning-textbook/17-monte-carlo/dlt-17-monte-carlo.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | deep-learning-textbook/18-partition-function/dlt-18-partition-function.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | deep-learning-textbook/19-approximate-inference/dlt-19-approximate-inference.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | deep-learning-textbook/20-deep-generative-models/dlt-20-deep-generative-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | deep-learning-textbook/21-final-review/dlt-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.11 illustrated-ml（22 章 · 待修 22 章 · 22 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T133817Z，22 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | illustrated-ml/00-guide/iml-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | illustrated-ml/01-introduction/iml-01-what-is-machine-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | illustrated-ml/01-introduction/iml-02-learning-models.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | illustrated-ml/02-supervised-regression/iml-03-least-squares-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | illustrated-ml/02-supervised-regression/iml-04-constrained-least-squares.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | illustrated-ml/02-supervised-regression/iml-05-sparse-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | illustrated-ml/02-supervised-regression/iml-06-robust-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | illustrated-ml/03-supervised-classification/iml-07-least-squares-classification.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | illustrated-ml/03-supervised-classification/iml-08-support-vector-classification.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | illustrated-ml/03-supervised-classification/iml-09-ensemble-classification.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | illustrated-ml/03-supervised-classification/iml-10-probabilistic-classification.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | illustrated-ml/03-supervised-classification/iml-11-sequence-classification.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | illustrated-ml/04-unsupervised-learning/iml-12-anomaly-detection.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | illustrated-ml/04-unsupervised-learning/iml-13-unsupervised-dimensionality-reduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | illustrated-ml/04-unsupervised-learning/iml-14-clustering.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | illustrated-ml/05-emerging-algorithms/iml-15-online-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | illustrated-ml/05-emerging-algorithms/iml-16-semi-supervised-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | illustrated-ml/05-emerging-algorithms/iml-17-supervised-dimensionality-reduction.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | illustrated-ml/05-emerging-algorithms/iml-18-transfer-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | illustrated-ml/05-emerging-algorithms/iml-19-multi-task-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | illustrated-ml/06-conclusion/iml-20-summary-outlook.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | illustrated-ml/07-review/iml-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.12 deep-reinforcement-learning（23 章 · 待修 23 章 · 23 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T134740Z，23 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-reinforcement-learning/00-learning-map/drl-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-reinforcement-learning/01-foundations/drl-01-machine-learning-foundations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-reinforcement-learning/01-foundations/drl-02-monte-carlo-method.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-reinforcement-learning/01-foundations/drl-03-reinforcement-learning-concepts.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-reinforcement-learning/02-value-learning/drl-04-dqn-q-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-reinforcement-learning/02-value-learning/drl-05-sarsa.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-reinforcement-learning/02-value-learning/drl-06-advanced-value-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-reinforcement-learning/03-policy-learning/drl-07-policy-gradient.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-reinforcement-learning/03-policy-learning/drl-08-policy-gradient-baseline.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-reinforcement-learning/03-policy-learning/drl-09-advanced-policy-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-reinforcement-learning/03-policy-learning/drl-10-continuous-control.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | deep-reinforcement-learning/03-policy-learning/drl-11-partial-observability.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | deep-reinforcement-learning/03-policy-learning/drl-12-imitation-learning.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | deep-reinforcement-learning/04-multi-agent/drl-13-parallel-computing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | deep-reinforcement-learning/04-multi-agent/drl-14-multi-agent-systems.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | deep-reinforcement-learning/04-multi-agent/drl-15-cooperative-marl.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | deep-reinforcement-learning/04-multi-agent/drl-16-noncooperative-marl.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | deep-reinforcement-learning/04-multi-agent/drl-17-attention-marl.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | deep-reinforcement-learning/05-applications/drl-18-alphago-mcts.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | deep-reinforcement-learning/05-applications/drl-19-real-world-applications.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | deep-reinforcement-learning/06-appendices/drl-appendix-a-bellman-equations.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | deep-reinforcement-learning/06-appendices/drl-appendix-b-exercise-answers.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 23 | deep-reinforcement-learning/07-final-review/drl-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—

### 4.13 deep-learning-from-scratch-2（65 章 · 待修 65 章 · 65 项）

**书籍状态**：🚀 已部署上线（2026-08-03 release-20260803T140613Z，65 章 published）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-learning-from-scratch-2/00-guide/dl2-official-learning-map.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 2 | deep-learning-from-scratch-2/01-stage-1/dl2-step-01-variable-box.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 3 | deep-learning-from-scratch-2/01-stage-1/dl2-step-02-function-creator.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 4 | deep-learning-from-scratch-2/01-stage-1/dl2-step-03-function-chain.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 5 | deep-learning-from-scratch-2/01-stage-1/dl2-step-04-numerical-differentiation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 6 | deep-learning-from-scratch-2/01-stage-1/dl2-step-05-backprop-theory.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 7 | deep-learning-from-scratch-2/01-stage-1/dl2-step-06-manual-backprop.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 8 | deep-learning-from-scratch-2/01-stage-1/dl2-step-07-automatic-backprop.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 9 | deep-learning-from-scratch-2/01-stage-1/dl2-step-08-recursion-to-loop.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 10 | deep-learning-from-scratch-2/01-stage-1/dl2-step-09-usable-functions.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 11 | deep-learning-from-scratch-2/01-stage-1/dl2-step-10-testing.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 12 | deep-learning-from-scratch-2/02-stage-2/dl2-step-11-variadic-forward.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 13 | deep-learning-from-scratch-2/02-stage-2/dl2-step-12-variadic-improvements.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 14 | deep-learning-from-scratch-2/02-stage-2/dl2-step-13-variadic-backward.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 15 | deep-learning-from-scratch-2/02-stage-2/dl2-step-14-reused-variable.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 16 | deep-learning-from-scratch-2/02-stage-2/dl2-step-15-complex-graph-theory.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 17 | deep-learning-from-scratch-2/02-stage-2/dl2-step-16-complex-graph-implementation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 18 | deep-learning-from-scratch-2/02-stage-2/dl2-step-17-memory-cycles.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 19 | deep-learning-from-scratch-2/02-stage-2/dl2-step-18-memory-mode.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 20 | deep-learning-from-scratch-2/02-stage-2/dl2-step-19-usable-variable.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 21 | deep-learning-from-scratch-2/02-stage-2/dl2-step-20-operator-overload-one.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 22 | deep-learning-from-scratch-2/02-stage-2/dl2-step-21-operator-overload-two.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 23 | deep-learning-from-scratch-2/02-stage-2/dl2-step-22-operator-overload-three.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 24 | deep-learning-from-scratch-2/02-stage-2/dl2-step-23-package.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 25 | deep-learning-from-scratch-2/02-stage-2/dl2-step-24-complex-derivatives.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 26 | deep-learning-from-scratch-2/03-stage-3/dl2-step-25-graphviz-one.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 27 | deep-learning-from-scratch-2/03-stage-3/dl2-step-26-graphviz-two.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 28 | deep-learning-from-scratch-2/03-stage-3/dl2-step-27-taylor-derivative.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 29 | deep-learning-from-scratch-2/03-stage-3/dl2-step-28-function-optimization.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 30 | deep-learning-from-scratch-2/03-stage-3/dl2-step-29-manual-newton.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 31 | deep-learning-from-scratch-2/03-stage-3/dl2-step-30-higher-order-preparation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 32 | deep-learning-from-scratch-2/03-stage-3/dl2-step-31-higher-order-theory.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 33 | deep-learning-from-scratch-2/03-stage-3/dl2-step-32-higher-order-implementation.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 34 | deep-learning-from-scratch-2/03-stage-3/dl2-step-33-automatic-newton.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 35 | deep-learning-from-scratch-2/03-stage-3/dl2-step-34-sin-higher-order.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 36 | deep-learning-from-scratch-2/03-stage-3/dl2-step-35-higher-order-graph.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 37 | deep-learning-from-scratch-2/03-stage-3/dl2-step-36-double-backprop.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 38 | deep-learning-from-scratch-2/04-stage-4/dl2-step-37-tensor.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 39 | deep-learning-from-scratch-2/04-stage-4/dl2-step-38-reshape-transpose.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 40 | deep-learning-from-scratch-2/04-stage-4/dl2-step-39-sum.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 41 | deep-learning-from-scratch-2/04-stage-4/dl2-step-40-broadcast.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 42 | deep-learning-from-scratch-2/04-stage-4/dl2-step-41-matrix-product.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 43 | deep-learning-from-scratch-2/04-stage-4/dl2-step-42-linear-regression.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 44 | deep-learning-from-scratch-2/04-stage-4/dl2-step-43-neural-network.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 45 | deep-learning-from-scratch-2/04-stage-4/dl2-step-44-parameter-layer.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 46 | deep-learning-from-scratch-2/04-stage-4/dl2-step-45-model-layer.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 47 | deep-learning-from-scratch-2/04-stage-4/dl2-step-46-optimizer.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 48 | deep-learning-from-scratch-2/04-stage-4/dl2-step-47-softmax-cross-entropy.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 49 | deep-learning-from-scratch-2/04-stage-4/dl2-step-48-multiclass.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 50 | deep-learning-from-scratch-2/04-stage-4/dl2-step-49-dataset-preprocess.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 51 | deep-learning-from-scratch-2/04-stage-4/dl2-step-50-dataloader.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 52 | deep-learning-from-scratch-2/04-stage-4/dl2-step-51-mnist.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 53 | deep-learning-from-scratch-2/05-stage-5/dl2-step-52-gpu.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 54 | deep-learning-from-scratch-2/05-stage-5/dl2-step-53-save-load.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 55 | deep-learning-from-scratch-2/05-stage-5/dl2-step-54-dropout-test-mode.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 56 | deep-learning-from-scratch-2/05-stage-5/dl2-step-55-cnn-mechanism-one.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 57 | deep-learning-from-scratch-2/05-stage-5/dl2-step-56-cnn-mechanism-two.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 58 | deep-learning-from-scratch-2/05-stage-5/dl2-step-57-conv2d-pooling.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 59 | deep-learning-from-scratch-2/05-stage-5/dl2-step-58-vgg16.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 60 | deep-learning-from-scratch-2/05-stage-5/dl2-step-59-rnn.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 61 | deep-learning-from-scratch-2/05-stage-5/dl2-step-60-lstm-dataloader.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 62 | deep-learning-from-scratch-2/06-appendices/dl2-appendix-a-in-place.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 63 | deep-learning-from-scratch-2/06-appendices/dl2-appendix-b-get-item.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 64 | deep-learning-from-scratch-2/06-appendices/dl2-appendix-c-colab.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |
| 65 | deep-learning-from-scratch-2/07-review/dl2-official-final-review.mdx | §8缺小结 | ✅ 已完成 | 2026-08-03 |

**部署记录**：—


## 系列 05：区块链系列（4 本 · 71 章待修 · 286 项）

**系列状态**：进行中（5.1 完成，5.2-5.4 待修）

### 5.1 mastering-ethereum（20 章 · 待修 0 章 · 40 项）✅

**书籍状态**：✅ 规范修复完成；⛔ 部署受阻：ledger failed（generic-quality-prose, within-chapter-template-copy, quality-v2-unreviewed）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mastering-ethereum/00-map/met2-official-learning-map.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 2 | mastering-ethereum/01-preface/met2-preface.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 3 | mastering-ethereum/02-01-what-is-ethereum/met2-01-what-is-ethereum.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 4 | mastering-ethereum/03-02-ethereum-basics/met2-02-ethereum-basics.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 5 | mastering-ethereum/04-03-ethereum-nodes/met2-03-ethereum-nodes.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 6 | mastering-ethereum/05-04-cryptography/met2-04-cryptography.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 7 | mastering-ethereum/06-05-wallets/met2-05-wallets.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 8 | mastering-ethereum/07-06-transactions/met2-06-transactions.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 9 | mastering-ethereum/08-07-smart-contracts-solidity/met2-07-smart-contracts-solidity.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 10 | mastering-ethereum/09-08-smart-contracts-vyper/met2-08-smart-contracts-vyper.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 11 | mastering-ethereum/10-09-smart-contract-security/met2-09-smart-contract-security.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 12 | mastering-ethereum/11-10-tokens/met2-10-tokens.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 13 | mastering-ethereum/12-11-oracles/met2-11-oracles.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 14 | mastering-ethereum/13-12-decentralized-applications/met2-12-decentralized-applications.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 15 | mastering-ethereum/14-13-decentralized-finance/met2-13-decentralized-finance.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 16 | mastering-ethereum/15-14-ethereum-virtual-machine/met2-14-ethereum-virtual-machine.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 17 | mastering-ethereum/16-15-consensus/met2-15-consensus.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 18 | mastering-ethereum/17-16-scaling-ethereum/met2-16-scaling-ethereum.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 19 | mastering-ethereum/18-17-zero-knowledge-proofs/met2-17-zero-knowledge-proofs.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 20 | mastering-ethereum/19-review/met2-official-final-review.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |

**部署记录**：仅规范修复并推送，未部署（ledger failed）

### 5.2 blockchain-dev-practice（17 章 · 待修 0 章 · 42 项）✅

**书籍状态**：✅ 规范修复完成；⛔ 部署受阻：ledger failed（generic-quality-prose, within-chapter-template-copy, quality-v2-unreviewed）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | blockchain-dev-practice/00-map/bdp-official-learning-map.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 2 | blockchain-dev-practice/01-preface/bdp-preface.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 3 | blockchain-dev-practice/02-01-understand-blockchain/bdp-01-understand-blockchain.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 4 | blockchain-dev-practice/03-02-practice-preparation/bdp-02-practice-preparation.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 5 | blockchain-dev-practice/04-03-ethereum-introduction/bdp-03-ethereum-introduction.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 6 | blockchain-dev-practice/05-04-compile-install-run/bdp-04-compile-install-run.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 7 | blockchain-dev-practice/06-05-private-chain/bdp-05-private-chain.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 8 | blockchain-dev-practice/07-06-programming-interfaces/bdp-06-programming-interfaces.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 9 | blockchain-dev-practice/08-07-solidity-ide-quickstart/bdp-07-solidity-ide-quickstart.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 10 | blockchain-dev-practice/09-08-solidity-syntax/bdp-08-solidity-syntax.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 11 | blockchain-dev-practice/10-09-contract-compile-deploy/bdp-09-contract-compile-deploy.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 12 | blockchain-dev-practice/11-10-truffle/bdp-10-truffle.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 13 | blockchain-dev-practice/12-11-dapps-practice/bdp-11-dapps-practice.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 14 | blockchain-dev-practice/13-appendix-a-bitcoin-principles/bdp-appendix-a-bitcoin-principles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 15 | blockchain-dev-practice/14-appendix-b-bitcoin-cli/bdp-appendix-b-bitcoin-cli.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 16 | blockchain-dev-practice/15-appendix-c-bitcoin-apis/bdp-appendix-c-bitcoin-apis.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |
| 17 | blockchain-dev-practice/16-review/bdp-official-final-review.mdx | §8缺小结 §9缺Attribution | ✅ 已完成 | 2026-08-04 |

**部署记录**：仅规范修复并推送，未部署（ledger failed）

### 5.3 blockchain-plain（14 章 · 待修 14 章 · 84 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | blockchain-plain/00-map/bp-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | blockchain-plain/01-technical-review/bp-technical-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | blockchain-plain/02-preface/bp-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | blockchain-plain/03-01-first-blockchain/bp-01-first-blockchain.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | blockchain-plain/04-02-application-development/bp-02-application-development.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | blockchain-plain/05-03-cryptography/bp-03-cryptography.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | blockchain-plain/06-04-consensus/bp-04-consensus.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | blockchain-plain/07-05-scaling-sidechains-lightning/bp-05-scaling-sidechains-lightning.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | blockchain-plain/08-06-ethereum/bp-06-ethereum.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | blockchain-plain/09-07-hyperledger/bp-07-hyperledger.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | blockchain-plain/10-08-build-mini-chain/bp-08-build-mini-chain.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | blockchain-plain/11-09-potential-problems/bp-09-potential-problems.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | blockchain-plain/12-afterword-programmable-society/bp-afterword-programmable-society.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | blockchain-plain/13-review/bp-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 5.4 mastering-bitcoin（20 章 · 待修 20 章 · 120 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mastering-bitcoin/00-map/mbt3-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | mastering-bitcoin/01-preface/mbt3-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | mastering-bitcoin/02-01-introduction/mbt3-01-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | mastering-bitcoin/03-02-how-bitcoin-works/mbt3-02-how-bitcoin-works.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | mastering-bitcoin/04-03-bitcoin-core/mbt3-03-bitcoin-core.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | mastering-bitcoin/05-04-keys-addresses/mbt3-04-keys-addresses.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | mastering-bitcoin/06-05-wallet-recovery/mbt3-05-wallet-recovery.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | mastering-bitcoin/07-06-transactions/mbt3-06-transactions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | mastering-bitcoin/08-07-authorization-authentication/mbt3-07-authorization-authentication.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | mastering-bitcoin/09-08-digital-signatures/mbt3-08-digital-signatures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | mastering-bitcoin/10-09-transaction-fees/mbt3-09-transaction-fees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | mastering-bitcoin/11-10-bitcoin-network/mbt3-10-bitcoin-network.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | mastering-bitcoin/12-11-blockchain/mbt3-11-blockchain.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | mastering-bitcoin/13-12-mining-consensus/mbt3-12-mining-consensus.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | mastering-bitcoin/14-13-security/mbt3-13-security.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | mastering-bitcoin/15-14-second-layer-applications/mbt3-14-second-layer-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | mastering-bitcoin/16-appendix-a-whitepaper/mbt3-appendix-a-whitepaper.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | mastering-bitcoin/17-appendix-b-whitepaper-errata/mbt3-appendix-b-whitepaper-errata.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | mastering-bitcoin/18-appendix-c-bips/mbt3-appendix-c-bips.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | mastering-bitcoin/19-review/mbt3-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 06：AI/LLM 应用系列（11 本 · 176 章待修 · 293 项）

**系列状态**：待开始

### 6.1 ai-agent（9 章 · 待修 9 章 · 9 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | ai-agent/foundations/agent-anatomy.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | ai-agent/foundations/chatbot-to-agent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | ai-agent/foundations/llm-as-brain.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | ai-agent/llm/prompt-engineering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | ai-agent/llm/sampling-decoding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | ai-agent/llm/structured-output.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | ai-agent/tools/function-calling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | ai-agent/tools/react-loop.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | ai-agent/tools/tool-design.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 6.2 llm-app-dev-essentials（9 章 · 待修 9 章 · 9 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | llm-app-dev-essentials/00-map/lae-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | llm-app-dev-essentials/01-preface/lae-preface.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | llm-app-dev-essentials/02-essentials/lae-01-gpt4-chatgpt-essentials.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | llm-app-dev-essentials/03-api/lae-02-api-deep-dive.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | llm-app-dev-essentials/04-apps/lae-03-building-apps.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | llm-app-dev-essentials/05-advanced/lae-04-advanced-techniques.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | llm-app-dev-essentials/06-frameworks/lae-05-langchain-plugins.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | llm-app-dev-essentials/07-glossary/lae-glossary.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | llm-app-dev-essentials/08-review/lae-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 6.3 langchain-programming（13 章 · 待修 13 章 · 13 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | langchain-programming/00-map/lcp-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | langchain-programming/01-preface/lcp-preface.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | langchain-programming/02-introduction/lcp-01-introduction.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | langchain-programming/03-quickstart/lcp-02-first-experience.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | langchain-programming/04-model-io/lcp-03-model-io.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | langchain-programming/05-chains/lcp-04-building-chains.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | langchain-programming/06-rag/lcp-05-rag.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | langchain-programming/07-agents/lcp-06-agents.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | langchain-programming/08-memory/lcp-07-memory.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | langchain-programming/09-callbacks/lcp-08-callbacks.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | langchain-programming/10-project/lcp-09-multimodal-bot.mdx | §8无要点 | ⬜ 待修复 | — |
| 12 | langchain-programming/11-community/lcp-10-community-resources.mdx | §8无要点 | ⬜ 待修复 | — |
| 13 | langchain-programming/12-review/lcp-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 6.4 chatgpt-principles-practice（13 章 · 待修 13 章 · 13 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | chatgpt-principles-practice/00-map/cgpt-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | chatgpt-principles-practice/01-preface/cgpt-preface.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | chatgpt-principles-practice/02-understanding/cgpt-01-understanding-chatgpt.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | chatgpt-principles-practice/03-principles/cgpt-02-principles.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | chatgpt-principles-practice/04-pretrained-models/cgpt-03-pretrained-language-models.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | chatgpt-principles-practice/05-reinforcement-learning/cgpt-04-reinforcement-learning.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | chatgpt-principles-practice/06-prompt-emergence/cgpt-05-prompt-emergence.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | chatgpt-principles-practice/07-llm-pretraining/cgpt-06-llm-pretraining.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | chatgpt-principles-practice/08-gpt-series/cgpt-07-gpt-series.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | chatgpt-principles-practice/09-ppo-rlhf/cgpt-08-ppo-rlhf.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | chatgpt-principles-practice/10-private-practice/cgpt-09-chatgpt-practice.mdx | §8无要点 | ⬜ 待修复 | — |
| 12 | chatgpt-principles-practice/11-trends/cgpt-10-trends.mdx | §8无要点 | ⬜ 待修复 | — |
| 13 | chatgpt-principles-practice/12-review/cgpt-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 6.5 ai-agent-dev（14 章 · 待修 14 章 · 14 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | ai-agent-dev/core-mechanisms/memory.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | ai-agent-dev/core-mechanisms/planning.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | ai-agent-dev/core-mechanisms/react-loop.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | ai-agent-dev/core-mechanisms/tool-calling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | ai-agent-dev/enterprise/evaluation-observability.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | ai-agent-dev/enterprise/production-deployment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | ai-agent-dev/enterprise/safety-guardrails.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | ai-agent-dev/foundations/llm-brain.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | ai-agent-dev/foundations/prompting-roles.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | ai-agent-dev/foundations/what-is-agent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | ai-agent-dev/knowledge-rag/context-engineering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | ai-agent-dev/knowledge-rag/rag.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | ai-agent-dev/multi-agent/multi-agent-patterns.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | ai-agent-dev/multi-agent/orchestration.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 6.6 large-scale-llm-practice（14 章 · 待修 14 章 · 14 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | large-scale-llm-practice/00-map/lsl-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | large-scale-llm-practice/01-preface/lsl-preface.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | large-scale-llm-practice/02-notation/lsl-mathematical-notation.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | large-scale-llm-practice/03-introduction/lsl-01-introduction.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | large-scale-llm-practice/04-foundations/lsl-02-llm-foundations.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | large-scale-llm-practice/05-data/lsl-03-pretraining-data.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | large-scale-llm-practice/06-distributed-training/lsl-04-distributed-training.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | large-scale-llm-practice/07-supervised-finetuning/lsl-05-supervised-finetuning.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | large-scale-llm-practice/08-reinforcement-learning/lsl-06-reinforcement-learning.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | large-scale-llm-practice/09-applications/lsl-07-llm-applications.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | large-scale-llm-practice/10-evaluation/lsl-08-llm-evaluation.mdx | §8无要点 | ⬜ 待修复 | — |
| 12 | large-scale-llm-practice/11-references/lsl-references.mdx | §8无要点 | ⬜ 待修复 | — |
| 13 | large-scale-llm-practice/12-index/lsl-index.mdx | §8无要点 | ⬜ 待修复 | — |
| 14 | large-scale-llm-practice/13-review/lsl-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 6.7 large-language-models（16 章 · 待修 16 章 · 16 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | large-language-models/00-map/llm-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | large-language-models/01-preface/llm-preface.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | large-language-models/02-debates-future/llm-01-debates-future.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | large-language-models/03-language-tokenization/llm-02-language-modeling-tokenization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | large-language-models/04-transformer/llm-03-transformer.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | large-language-models/05-pretraining-decoding/llm-04-pretraining-decoding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | large-language-models/06-icl-finetuning/llm-05-icl-lightweight-finetuning.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | large-language-models/07-training-scale/llm-06-training-larger-models.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | large-language-models/08-sparse-moe/llm-07-sparse-moe.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | large-language-models/09-retrieval-augmented/llm-08-retrieval-augmented-lm.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | large-language-models/10-preference-alignment/llm-09-human-preference-alignment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | large-language-models/11-bias-toxicity/llm-10-bias-toxicity.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | large-language-models/12-vision-language/llm-11-vision-language-models.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | large-language-models/13-environment/llm-12-environmental-impact.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | large-language-models/14-references/llm-references.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | large-language-models/15-review/llm-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 6.8 ai-agent-apps（19 章 · 待修 19 章 · 19 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | ai-agent-apps/agentic-patterns/autonomous-agents.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | ai-agent-apps/agentic-patterns/chaining-and-routing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | ai-agent-apps/agentic-patterns/combining-patterns.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | ai-agent-apps/agentic-patterns/evaluator-optimizer.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | ai-agent-apps/agentic-patterns/parallelization-and-orchestrator-workers.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | ai-agent-apps/agentic-patterns/workflow-vs-agent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | ai-agent-apps/context-engineering/context-window.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | ai-agent-apps/context-engineering/prompt-engineering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | ai-agent-apps/context-engineering/structured-output.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | ai-agent-apps/foundations/agentic-loop.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | ai-agent-apps/foundations/augmented-llm.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | ai-agent-apps/foundations/first-agent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | ai-agent-apps/foundations/what-is-an-agent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | ai-agent-apps/production/agents-in-practice.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | ai-agent-apps/production/production-readiness-checklist.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | ai-agent-apps/production/tool-prompt-engineering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | ai-agent-apps/tool-use/function-calling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | ai-agent-apps/tool-use/mcp.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | ai-agent-apps/tool-use/tool-design.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 6.9 this-is-chatgpt（24 章 · 待修 24 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | this-is-chatgpt/00-learning-map/tcg-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | this-is-chatgpt/01-main-essay/tcg-main-01-one-word-at-a-time.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | this-is-chatgpt/01-main-essay/tcg-main-02-probabilities.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | this-is-chatgpt/01-main-essay/tcg-main-03-model.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | this-is-chatgpt/01-main-essay/tcg-main-04-human-like-tasks.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | this-is-chatgpt/01-main-essay/tcg-preface.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | this-is-chatgpt/02-neural-models/tcg-main-05-neural-nets.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | this-is-chatgpt/02-neural-models/tcg-main-06-training-neural-nets.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | this-is-chatgpt/02-neural-models/tcg-main-07-training-practice.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | this-is-chatgpt/02-neural-models/tcg-main-08-universal-network.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | this-is-chatgpt/03-chatgpt-inside/tcg-main-09-embeddings.mdx | §8无要点 | ⬜ 待修复 | — |
| 12 | this-is-chatgpt/03-chatgpt-inside/tcg-main-10-inside-chatgpt.mdx | §8无要点 | ⬜ 待修复 | — |
| 13 | this-is-chatgpt/03-chatgpt-inside/tcg-main-11-training-chatgpt.mdx | §8无要点 | ⬜ 待修复 | — |
| 14 | this-is-chatgpt/03-chatgpt-inside/tcg-main-12-beyond-basic-training.mdx | §8无要点 | ⬜ 待修复 | — |
| 15 | this-is-chatgpt/04-meaning-language/tcg-main-13-what-lets-it-work.mdx | §8无要点 | ⬜ 待修复 | — |
| 16 | this-is-chatgpt/04-meaning-language/tcg-main-14-meaning-space.mdx | §8无要点 | ⬜ 待修复 | — |
| 17 | this-is-chatgpt/04-meaning-language/tcg-main-15-semantic-grammar.mdx | §8无要点 | ⬜ 待修复 | — |
| 18 | this-is-chatgpt/04-meaning-language/tcg-main-16-conclusion.mdx | §8无要点 | ⬜ 待修复 | — |
| 19 | this-is-chatgpt/05-resources/tcg-thanks-additional-resources.mdx | §8无要点 | ⬜ 待修复 | — |
| 20 | this-is-chatgpt/06-wolfram-alpha/tcg-wa-01-chatgpt-wolfram-alpha.mdx | §8无要点 | ⬜ 待修复 | — |
| 21 | this-is-chatgpt/06-wolfram-alpha/tcg-wa-02-basic-example.mdx | §8无要点 | ⬜ 待修复 | — |
| 22 | this-is-chatgpt/06-wolfram-alpha/tcg-wa-03-more-examples.mdx | §8无要点 | ⬜ 待修复 | — |
| 23 | this-is-chatgpt/06-wolfram-alpha/tcg-wa-04-path-forward.mdx | §8无要点 | ⬜ 待修复 | — |
| 24 | this-is-chatgpt/07-final-review/tcg-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 6.10 multiagent-systems（27 章 · 待修 27 章 · 54 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | multiagent-systems/00-map/mas-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | multiagent-systems/01-preface/mas-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | multiagent-systems/02-part-01-setting-scene/mas-part-01-setting-scene.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | multiagent-systems/03-01-introduction/mas-01-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | multiagent-systems/04-part-02-intelligent-autonomous-agents/mas-part-02-intelligent-autonomous-agents.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | multiagent-systems/05-02-intelligent-agents/mas-02-intelligent-agents.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | multiagent-systems/06-03-deductive-reasoning-agents/mas-03-deductive-reasoning-agents.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | multiagent-systems/07-04-practical-reasoning-agents/mas-04-practical-reasoning-agents.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | multiagent-systems/08-05-reactive-hybrid-agents/mas-05-reactive-hybrid-agents.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | multiagent-systems/09-part-03-communication-cooperation/mas-part-03-communication-cooperation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | multiagent-systems/10-06-understanding-each-other/mas-06-understanding-each-other.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | multiagent-systems/11-07-communicating/mas-07-communicating.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | multiagent-systems/12-08-working-together/mas-08-working-together.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | multiagent-systems/13-09-methodologies/mas-09-methodologies.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | multiagent-systems/14-10-applications/mas-10-applications.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | multiagent-systems/15-part-04-multiagent-decision-making/mas-part-04-multiagent-decision-making.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | multiagent-systems/16-11-multiagent-interactions/mas-11-multiagent-interactions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | multiagent-systems/17-12-making-group-decisions/mas-12-making-group-decisions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | multiagent-systems/18-13-forming-coalitions/mas-13-forming-coalitions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | multiagent-systems/19-14-allocating-scarce-resources/mas-14-allocating-scarce-resources.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | multiagent-systems/20-15-bargaining/mas-15-bargaining.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | multiagent-systems/21-16-arguing/mas-16-arguing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | multiagent-systems/22-17-logical-foundations/mas-17-logical-foundations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | multiagent-systems/23-coda/mas-coda.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | multiagent-systems/24-appendix-a-history-lesson/mas-appendix-a-history-lesson.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | multiagent-systems/25-appendix-b-afterword/mas-appendix-b-afterword.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | multiagent-systems/26-review/mas-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 6.11 building-llm-applications（18 章 · 待修 18 章 · 108 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | building-llm-applications/00-map/bla-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | building-llm-applications/01-preface/bla-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | building-llm-applications/02-chapter-01/bla-01-introduction-to-large-language-models.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | building-llm-applications/03-chapter-02/bla-02-llms-for-ai-powered-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | building-llm-applications/04-chapter-03/bla-03-choosing-an-llm.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | building-llm-applications/05-chapter-04/bla-04-prompt-engineering.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | building-llm-applications/06-chapter-05/bla-05-embedding-llms-in-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | building-llm-applications/07-chapter-06/bla-06-conversational-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | building-llm-applications/08-chapter-07/bla-07-search-recommendation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | building-llm-applications/09-chapter-08/bla-08-structured-data.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | building-llm-applications/10-chapter-09/bla-09-working-with-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | building-llm-applications/11-chapter-10/bla-10-multimodal-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | building-llm-applications/12-chapter-11/bla-11-fine-tuning.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | building-llm-applications/13-chapter-12/bla-12-responsible-ai.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | building-llm-applications/14-chapter-13/bla-13-emerging-trends.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | building-llm-applications/15-other-books/bla-other-books.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | building-llm-applications/16-index/bla-index.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | building-llm-applications/17-review/bla-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 07：Android 系列（12 本 · 217 章待修 · 381 项）

**系列状态**：待开始

### 7.1 android-component-arch（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | android-component-arch/00-official-learning-map/aca18-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | android-component-arch/01-component-foundations/aca18-01-component-foundations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | android-component-arch/02-component-programming/aca18-02-component-programming.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | android-component-arch/03-component-optimization/aca18-03-component-optimization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | android-component-arch/04-component-compilation/aca18-04-component-compilation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | android-component-arch/05-component-distribution/aca18-05-component-distribution.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | android-component-arch/06-component-circulation/aca18-06-component-circulation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | android-component-arch/07-architecture-templates/aca18-07-architecture-templates.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | android-component-arch/08-architecture-evolution/aca18-08-architecture-evolution.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | android-component-arch/09-appendix-a/aca18-appendix-a-thinking-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | android-component-arch/10-official-final-review/aca18-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.2 android-perf-optimization（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | android-perf-optimization/00-official-learning-map/apo12-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | android-perf-optimization/01-optimizing-java/apo12-01-optimizing-java-code.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | android-perf-optimization/02-ndk-start/apo12-02-getting-started-ndk.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | android-perf-optimization/03-advanced-ndk/apo12-03-advanced-ndk.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | android-perf-optimization/04-memory/apo12-04-using-memory-efficiently.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | android-perf-optimization/05-multithreading/apo12-05-multithreading-synchronization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | android-perf-optimization/06-benchmarking/apo12-06-benchmarking-profiling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | android-perf-optimization/07-battery/apo12-07-maximizing-battery-life.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | android-perf-optimization/08-graphics/apo12-08-graphics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | android-perf-optimization/09-renderscript/apo12-09-renderscript.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | android-perf-optimization/10-official-final-review/apo12-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.3 android-design-patterns（14 章 · 待修 14 章 · 14 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | android-design-patterns/00-official-learning-map/adp-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | android-design-patterns/01-preface/adp-preface.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | android-design-patterns/02-chapter-01/adp-01-android-app-basic-structure.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | android-design-patterns/03-chapter-02/adp-02-mvvm-application-structure.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | android-design-patterns/04-chapter-03/adp-03-mvp-application-structure.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | android-design-patterns/05-chapter-04/adp-04-incremental-development-design.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | android-design-patterns/06-chapter-05/adp-05-designer-role-in-oss.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | android-design-patterns/07-chapter-06/adp-06-flux-architecture.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | android-design-patterns/08-chapter-07/adp-07-team-and-architecture.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | android-design-patterns/09-chapter-08/adp-08-android-architecture-components.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | android-design-patterns/10-afterword/adp-afterword.mdx | §8无要点 | ⬜ 待修复 | — |
| 12 | android-design-patterns/11-index/adp-index.mdx | §8无要点 | ⬜ 待修复 | — |
| 13 | android-design-patterns/12-author-profiles/adp-author-profiles.mdx | §8无要点 | ⬜ 待修复 | — |
| 14 | android-design-patterns/13-official-final-review/adp-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 7.4 android-art-exploration（17 章 · 待修 17 章 · 17 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | android-art-exploration/00-official-learning-map/adae15-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | android-art-exploration/01-activity/adae15-01-activity-lifecycle-launch-mode.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | android-art-exploration/02-ipc/adae15-02-ipc.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | android-art-exploration/03-view-system/adae15-03-view-event-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | android-art-exploration/03-view-system/adae15-04-view-working-principles.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | android-art-exploration/04-cross-process-ui/adae15-05-remoteviews.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | android-art-exploration/04-cross-process-ui/adae15-06-drawable.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | android-art-exploration/04-cross-process-ui/adae15-07-animation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | android-art-exploration/05-framework-internals/adae15-08-window-windowmanager.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | android-art-exploration/05-framework-internals/adae15-09-four-components.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | android-art-exploration/05-framework-internals/adae15-10-message-mechanism.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | android-art-exploration/06-resources-performance/adae15-11-threads-pools.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | android-art-exploration/06-resources-performance/adae15-12-bitmap-cache.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | android-art-exploration/06-resources-performance/adae15-13-integrated-techniques.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | android-art-exploration/07-native-boundary/adae15-14-jni-ndk.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | android-art-exploration/08-performance/adae15-15-performance-optimization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | android-art-exploration/16-official-final-review/adae15-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.5 first-line-android（18 章 · 待修 18 章 · 18 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | first-line-android/00-official-learning-map/fla3-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | first-line-android/01-first-code/fla3-01-first-code.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | first-line-android/02-kotlin/fla3-02-kotlin.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | first-line-android/03-activity/fla3-03-activity.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | first-line-android/04-ui/fla3-04-ui.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | first-line-android/05-fragment/fla3-05-fragment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | first-line-android/06-broadcast/fla3-06-broadcast.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | first-line-android/07-persistence/fla3-07-persistence.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | first-line-android/08-content-provider/fla3-08-content-provider.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | first-line-android/09-multimedia/fla3-09-multimedia.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | first-line-android/10-service/fla3-10-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | first-line-android/11-network/fla3-11-network.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | first-line-android/12-material/fla3-12-material.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | first-line-android/13-jetpack/fla3-13-jetpack.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | first-line-android/14-advanced/fla3-14-advanced.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | first-line-android/15-weather-app/fla3-15-weather-app.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | first-line-android/16-permissionx/fla3-16-permissionx.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | first-line-android/17-official-final-review/fla3-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.6 crazy-android（21 章 · 待修 21 章 · 21 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | crazy-android/00-official-learning-map/cra4-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | crazy-android/01-environment/cra4-01-environment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | crazy-android/02-ui-programming/cra4-02-ui-programming.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | crazy-android/03-event-mechanism/cra4-03-event-mechanism.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | crazy-android/04-activity-fragment/cra4-04-activity-fragment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | crazy-android/05-intent-filter/cra4-05-intent-filter.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | crazy-android/06-application-resources/cra4-06-application-resources.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | crazy-android/07-graphics-images/cra4-07-graphics-images.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | crazy-android/08-storage-io/cra4-08-storage-io.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | crazy-android/09-content-provider/cra4-09-content-provider.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | crazy-android/10-service-broadcast/cra4-10-service-broadcast.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | crazy-android/11-multimedia/cra4-11-multimedia.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | crazy-android/12-opengl-3d/cra4-12-opengl-3d.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | crazy-android/13-network/cra4-13-network.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | crazy-android/14-system-desktop/cra4-14-system-desktop.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | crazy-android/15-sensors/cra4-15-sensors.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | crazy-android/16-gps/cra4-16-gps.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | crazy-android/17-amap/cra4-17-amap.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | crazy-android/18-metal-slug/cra4-18-metal-slug.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | crazy-android/19-auction-system/cra4-19-auction-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | crazy-android/20-official-final-review/cra4-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.7 android-advanced-decryption（19 章 · 待修 19 章 · 22 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | android-advanced-decryption/00-official-learning-map/aad8-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | android-advanced-decryption/01-chapter-01/aad8-01-android-system-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | android-advanced-decryption/02-chapter-02/aad8-02-android-system-startup.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | android-advanced-decryption/03-chapter-03/aad8-03-app-process-startup.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | android-advanced-decryption/04-chapter-04/aad8-04-four-components-workflow.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | android-advanced-decryption/05-chapter-05/aad8-05-context.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | android-advanced-decryption/06-chapter-06/aad8-06-activity-manager-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | android-advanced-decryption/07-chapter-07/aad8-07-window-manager.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | android-advanced-decryption/08-chapter-08/aad8-08-window-manager-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | android-advanced-decryption/09-chapter-09/aad8-09-jni.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | android-advanced-decryption/10-chapter-10/aad8-10-java-virtual-machine.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | android-advanced-decryption/11-chapter-11/aad8-11-dalvik-art.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | android-advanced-decryption/12-chapter-12/aad8-12-class-loader.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | android-advanced-decryption/13-chapter-13/aad8-13-hotfix.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | android-advanced-decryption/14-chapter-14/aad8-14-hook.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | android-advanced-decryption/15-chapter-15/aad8-15-pluginization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | android-advanced-decryption/16-chapter-16/aad8-16-rendering-optimization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | android-advanced-decryption/17-chapter-17/aad8-17-memory-optimization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | android-advanced-decryption/18-official-final-review/aad8-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.8 deep-android-kernel（24 章 · 待修 24 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-android-kernel/00-official-learning-map/dak-14-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | deep-android-kernel/01-system-introduction/dak-14-01-system-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | deep-android-kernel/02-source-build/dak-14-02-source-build.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | deep-android-kernel/03-build-system/dak-14-03-build-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | deep-android-kernel/04-os-foundations/dak-14-04-os-foundations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | deep-android-kernel/05-process-thread/dak-14-05-process-thread.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | deep-android-kernel/06-binder/dak-14-06-binder.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | deep-android-kernel/07-boot/dak-14-07-boot.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | deep-android-kernel/08-ams/dak-14-08-ams.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | deep-android-kernel/09-surfaceflinger/dak-14-09-surfaceflinger.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | deep-android-kernel/10-wms/dak-14-10-wms.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | deep-android-kernel/11-view/dak-14-11-view.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | deep-android-kernel/12-input/dak-14-12-input.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | deep-android-kernel/13-audio/dak-14-13-audio.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | deep-android-kernel/14-intent/dak-14-14-intent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | deep-android-kernel/15-resources/dak-14-15-resources.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | deep-android-kernel/16-encoding/dak-14-16-encoding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | deep-android-kernel/17-opengl/dak-14-17-opengl.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | deep-android-kernel/18-systemui/dak-14-18-systemui.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | deep-android-kernel/19-widget/dak-14-19-widget.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | deep-android-kernel/20-apk-build/dak-14-20-apk-build.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | deep-android-kernel/21-git/dak-14-21-git.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | deep-android-kernel/22-debug-tools/dak-14-22-debug-tools.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | deep-android-kernel/23-official-final-review/dak-14-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.9 deep-android-volumes（28 章 · 待修 28 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-android-volumes/00-official-learning-map/dav-series-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | deep-android-volumes/01-v1-01/dav-v1-01-preparation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | deep-android-volumes/02-v1-02/dav-v1-02-jni.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | deep-android-volumes/03-v1-03/dav-v1-03-init.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | deep-android-volumes/04-v1-04/dav-v1-04-zygote.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | deep-android-volumes/05-v1-05/dav-v1-05-common-classes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | deep-android-volumes/06-v1-06/dav-v1-06-binder-native.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | deep-android-volumes/07-v1-07/dav-v1-07-audio-native.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | deep-android-volumes/08-v1-08/dav-v1-08-surface.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | deep-android-volumes/09-v1-09/dav-v1-09-vold-rild.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | deep-android-volumes/10-v1-10/dav-v1-10-media-scanner.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | deep-android-volumes/11-v2-01/dav-v2-01-source-environment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | deep-android-volumes/12-v2-02/dav-v2-02-java-binder-messagequeue.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | deep-android-volumes/13-v2-03/dav-v2-03-system-server.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | deep-android-volumes/14-v2-04/dav-v2-04-package-manager-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | deep-android-volumes/15-v2-05/dav-v2-05-power-manager-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | deep-android-volumes/16-v2-06/dav-v2-06-activity-manager-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | deep-android-volumes/17-v2-07/dav-v2-07-content-provider.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | deep-android-volumes/18-v2-08/dav-v2-08-content-account-sync.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | deep-android-volumes/19-v3-01/dav-v3-01-development-environment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | deep-android-volumes/20-v3-02/dav-v3-02-java-binder-messagequeue.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | deep-android-volumes/21-v3-03/dav-v3-03-audio-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | deep-android-volumes/22-v3-04/dav-v3-04-window-manager-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | deep-android-volumes/23-v3-05/dav-v3-05-input-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 25 | deep-android-volumes/24-v3-06/dav-v3-06-view-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 26 | deep-android-volumes/25-v3-07/dav-v3-07-system-ui.mdx | §8缺小结 | ⬜ 待修复 | — |
| 27 | deep-android-volumes/26-v3-08/dav-v3-08-wallpaper.mdx | §8缺小结 | ⬜ 待修复 | — |
| 28 | deep-android-volumes/27-official-final-review/dav-series-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 7.10 android-advanced-light（13 章 · 待修 13 章 · 65 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | android-advanced-light/00-official-learning-map/aal-17-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 2 | android-advanced-light/01-android-features/aal-17-01-android-features.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 3 | android-advanced-light/02-material-design/aal-17-02-material-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 4 | android-advanced-light/03-view-custom-view/aal-17-03-view-custom-view.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 5 | android-advanced-light/04-multithreading/aal-17-04-multithreading.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 6 | android-advanced-light/05-network-frameworks/aal-17-05-network-frameworks.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 7 | android-advanced-light/06-design-patterns/aal-17-06-design-patterns.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 8 | android-advanced-light/07-event-bus/aal-17-07-event-bus.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 9 | android-advanced-light/08-rxjava/aal-17-08-rxjava.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 10 | android-advanced-light/09-annotations-di/aal-17-09-annotations-di.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 11 | android-advanced-light/10-app-architecture/aal-17-10-app-architecture.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 12 | android-advanced-light/11-system-mediaplayer/aal-17-11-system-mediaplayer.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 13 | android-advanced-light/12-official-final-review/aal-17-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 7.11 jetpack-compose（13 章 · 待修 13 章 · 65 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | jetpack-compose/00-official-learning-map/jpc-22-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 2 | jetpack-compose/01-new-android-ui/jpc-22-01-new-android-ui.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 3 | jetpack-compose/02-common-ui-components/jpc-22-02-common-ui-components.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 4 | jetpack-compose/03-custom-ui/jpc-22-03-custom-ui.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 5 | jetpack-compose/04-state-recomposition/jpc-22-04-state-recomposition.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 6 | jetpack-compose/05-rendering-pipeline/jpc-22-05-rendering-pipeline.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 7 | jetpack-compose/06-animation/jpc-22-06-animation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 8 | jetpack-compose/07-gestures/jpc-22-07-gestures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 9 | jetpack-compose/08-navigation-hilt/jpc-22-08-navigation-hilt.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 10 | jetpack-compose/09-third-party/jpc-22-09-third-party.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 11 | jetpack-compose/10-tetris/jpc-22-10-tetris.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 12 | jetpack-compose/11-chatty/jpc-22-11-chatty.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 13 | jetpack-compose/12-official-final-review/jpc-22-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 7.12 big-nerd-ranch-guide（34 章 · 待修 28 章 · 85 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | big-nerd-ranch-guide/00-official-learning-map/bnr4-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | big-nerd-ranch-guide/33-official-final-review/bnr4-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | big-nerd-ranch-guide/advanced-ui-animation/afterword.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | big-nerd-ranch-guide/advanced-ui-animation/custom-views-touch.mdx | §6超长块×2 §6缺CodeTabs §8小结>5条 §8练习数不符 | ⬜ 待修复 | — |
| 5 | big-nerd-ranch-guide/advanced-ui-animation/property-animation.mdx | §6缺CodeTabs §8小结>5条 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 6 | big-nerd-ranch-guide/advanced-ui-animation/webview.mdx | §6超长块×1 §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 7 | big-nerd-ranch-guide/background-network/broadcast-intents.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 8 | big-nerd-ranch-guide/background-network/http-background.mdx | §6超长块×1 §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 9 | big-nerd-ranch-guide/background-network/looper-handler.mdx | §6超长块×1 §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 10 | big-nerd-ranch-guide/background-network/more-intents-tasks.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 11 | big-nerd-ranch-guide/background-network/search.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 12 | big-nerd-ranch-guide/background-network/workmanager.mdx | §6超长块×1 §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 13 | big-nerd-ranch-guide/basics/activity-lifecycle.mdx | — | ✅ 合规 | — |
| 14 | big-nerd-ranch-guide/basics/android-mvc.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 15 | big-nerd-ranch-guide/basics/debugging.mdx | — | ✅ 合规 | — |
| 16 | big-nerd-ranch-guide/basics/first-app.mdx | §6缺CodeTabs §7缺误区 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 17 | big-nerd-ranch-guide/basics/sdk-compatibility.mdx | §6缺CodeTabs §7缺误区 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 18 | big-nerd-ranch-guide/basics/second-activity.mdx | §6缺CodeTabs §7缺误区 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 19 | big-nerd-ranch-guide/basics/ui-state-persistence.mdx | §6缺CodeTabs §7缺误区 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 20 | big-nerd-ranch-guide/intent-data/accessibility.mdx | — | ✅ 合规 | — |
| 21 | big-nerd-ranch-guide/intent-data/audio-unit-testing.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 22 | big-nerd-ranch-guide/intent-data/data-binding-mvvm.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 23 | big-nerd-ranch-guide/intent-data/implicit-intents.mdx | §8练习数不符 | ⬜ 待修复 | — |
| 24 | big-nerd-ranch-guide/intent-data/localization.mdx | §7误区<3 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 25 | big-nerd-ranch-guide/intent-data/styles-themes.mdx | — | ✅ 合规 | — |
| 26 | big-nerd-ranch-guide/intent-data/taking-pictures.mdx | §6超长块×1 | ⬜ 待修复 | — |
| 27 | big-nerd-ranch-guide/intent-data/xml-drawables.mdx | — | ✅ 合规 | — |
| 28 | big-nerd-ranch-guide/ui-fragment/app-bar.mdx | §6缺CodeTabs §7缺误区 §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 29 | big-nerd-ranch-guide/ui-fragment/dialogs.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 30 | big-nerd-ranch-guide/ui-fragment/fragment-navigation.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 31 | big-nerd-ranch-guide/ui-fragment/layouts-widgets.mdx | — | ✅ 合规 | — |
| 32 | big-nerd-ranch-guide/ui-fragment/recyclerview.mdx | §6缺CodeTabs §8练习数不符 | ⬜ 待修复 | — |
| 33 | big-nerd-ranch-guide/ui-fragment/room-database.mdx | §6缺CodeTabs §8练习数不符 §8缺独立题 | ⬜ 待修复 | — |
| 34 | big-nerd-ranch-guide/ui-fragment/ui-fragments.mdx | §6缺CodeTabs §8练习数不符 | ⬜ 待修复 | — |

**部署记录**：—


## 系列 08：Python 系列（4 本 · 82 章待修 · 416 项）

**系列状态**：待开始

### 8.1 python-advanced（16 章 · 待修 16 章 · 64 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | python-advanced/00-guide/pya-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | python-advanced/01-language-api/pya-choosing-good-names.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | python-advanced/01-language-api/pya-getting-started.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | python-advanced/01-language-api/pya-syntax-above-class.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | python-advanced/01-language-api/pya-syntax-below-class.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | python-advanced/02-packages-apps/pya-writing-application.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | python-advanced/02-packages-apps/pya-writing-package.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | python-advanced/02-packages-apps/pya-zc-buildout.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | python-advanced/03-lifecycle/pya-documenting-project.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | python-advanced/03-lifecycle/pya-managing-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | python-advanced/03-lifecycle/pya-managing-life-cycle.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | python-advanced/03-lifecycle/pya-test-driven-development.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | python-advanced/04-performance-design/pya-optimization-profiling.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | python-advanced/04-performance-design/pya-optimization-solutions.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | python-advanced/04-performance-design/pya-useful-design-patterns.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | python-advanced/05-review/pya-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 8.2 python-crash-course（22 章 · 待修 22 章 · 88 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | python-crash-course/00-basics/pcc-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | python-crash-course/01-official/getting-started.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | python-crash-course/02-official/variables-and-simple-data-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | python-crash-course/03-official/introducing-lists.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | python-crash-course/03-projects/pcc-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | python-crash-course/04-official/working-with-lists.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | python-crash-course/05-official/if-statements.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | python-crash-course/06-official/dictionaries.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | python-crash-course/07-official/user-input-and-while-loops.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | python-crash-course/08-official/functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | python-crash-course/09-official/classes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | python-crash-course/10-official/files-and-exceptions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | python-crash-course/11-official/testing-your-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | python-crash-course/12-official/a-ship-that-fires-bullets.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | python-crash-course/13-official/aliens.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | python-crash-course/14-official/scoring.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | python-crash-course/15-official/generating-data.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 18 | python-crash-course/16-official/downloading-data.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 19 | python-crash-course/17-official/working-with-apis.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 20 | python-crash-course/18-official/getting-started-with-django.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 21 | python-crash-course/19-official/user-accounts.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 22 | python-crash-course/20-official/styling-and-deploying-an-app.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 8.3 python-ops（18 章 · 待修 18 章 · 108 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | python-ops/00-overview/pop-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | python-ops/01-system-basics/pop-quality-reports.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | python-ops/01-system-basics/pop-service-monitoring.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | python-ops/01-system-basics/pop-system-information.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | python-ops/01-system-basics/pop-system-security.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | python-ops/02-batch-management/pop-ansible.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | python-ops/02-batch-management/pop-big-data.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | python-ops/02-batch-management/pop-fabric.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | python-ops/02-batch-management/pop-func.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | python-ops/02-batch-management/pop-pexpect.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | python-ops/02-batch-management/pop-saltstack.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | python-ops/02-batch-management/pop-ssh-paramiko.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | python-ops/02-batch-management/pop-webserver.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | python-ops/03-platform-cases/pop-bs-ops-platform.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | python-ops/03-platform-cases/pop-cs-ops-platform.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | python-ops/03-platform-cases/pop-distributed-quality-monitoring.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | python-ops/03-platform-cases/pop-linux-security-audit.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | python-ops/04-summary/pop-final-review.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 8.4 fluent-python（26 章 · 待修 26 章 · 156 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | fluent-python/00-guide/flp-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | fluent-python/01-data-structures/flp-data-class-builders.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | fluent-python/01-data-structures/flp-data-model.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | fluent-python/01-data-structures/flp-dict-sets.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | fluent-python/01-data-structures/flp-object-references.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | fluent-python/01-data-structures/flp-sequences.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | fluent-python/01-data-structures/flp-unicode-text-bytes.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | fluent-python/02-functions/flp-closures-decorators.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | fluent-python/02-functions/flp-design-patterns.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | fluent-python/02-functions/flp-functions-first-class.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | fluent-python/02-functions/flp-type-hints.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | fluent-python/03-classes-protocols/flp-inheritance-mixins.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | fluent-python/03-classes-protocols/flp-more-type-hints.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | fluent-python/03-classes-protocols/flp-operator-overloading.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | fluent-python/03-classes-protocols/flp-protocols-abc.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | fluent-python/03-classes-protocols/flp-pythonic-object.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | fluent-python/03-classes-protocols/flp-special-methods-sequences.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | fluent-python/04-control-flow/flp-async-programming.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | fluent-python/04-control-flow/flp-concurrency-models.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | fluent-python/04-control-flow/flp-concurrent-executors.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 21 | fluent-python/04-control-flow/flp-generators.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 22 | fluent-python/04-control-flow/flp-with-match-else.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 23 | fluent-python/05-metaprogramming/flp-class-metaprogramming.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 24 | fluent-python/05-metaprogramming/flp-descriptors.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 25 | fluent-python/05-metaprogramming/flp-dynamic-attributes.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 26 | fluent-python/06-review/flp-final-review.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 09：JS/前端系列（12 本 · 227 章待修 · 424 项）

**系列状态**：待开始

### 9.1 frontend-engineering（9 章 · 待修 9 章 · 9 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | frontend-engineering/00-guide/feng-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | frontend-engineering/01-foundations/feng-01-history.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | frontend-engineering/01-foundations/feng-02-scaffolding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | frontend-engineering/02-build/feng-03-build.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | frontend-engineering/03-development-delivery/feng-04-local-dev-server.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | frontend-engineering/03-development-delivery/feng-05-deployment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | frontend-engineering/04-workflow-future/feng-06-workflow.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | frontend-engineering/04-workflow-future/feng-07-future.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | frontend-engineering/05-review/feng-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 9.2 css-secrets（10 章 · 待修 10 章 · 10 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | css-secrets/00-guide/csec-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | css-secrets/01-method/csec-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | css-secrets/02-backgrounds-borders/csec-02-backgrounds-borders.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | css-secrets/03-shapes-effects/csec-03-shapes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | css-secrets/03-shapes-effects/csec-04-visual-effects.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | css-secrets/04-typography-ux/csec-05-typography.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | css-secrets/04-typography-ux/csec-06-user-experience.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | css-secrets/05-layout-motion/csec-07-structure-layout.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | css-secrets/05-layout-motion/csec-08-transitions-animations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | css-secrets/06-review/csec-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 9.3 nodejs-debugging-guide（10 章 · 待修 10 章 · 10 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | nodejs-debugging-guide/00-guide/ndbg-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | nodejs-debugging-guide/01-performance/ndbg-01-cpu.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | nodejs-debugging-guide/01-performance/ndbg-02-memory.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | nodejs-debugging-guide/02-code-tools/ndbg-03-code.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | nodejs-debugging-guide/02-code-tools/ndbg-04-tools.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | nodejs-debugging-guide/03-observability/ndbg-05-apm.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | nodejs-debugging-guide/03-observability/ndbg-06-logging.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | nodejs-debugging-guide/04-operations/ndbg-07-monitoring.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | nodejs-debugging-guide/04-operations/ndbg-08-applications.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | nodejs-debugging-guide/05-review/ndbg-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 9.4 css-world（14 章 · 待修 14 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | css-world/00-guide/csw-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | css-world/01-world/csw-01-worldview-flow.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | css-world/01-world/csw-02-terms-undefined-behavior.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | css-world/02-flow-size/csw-03-flow-elements-sizing.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | css-world/02-flow-size/csw-04-box-dimensions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | css-world/02-flow-size/csw-05-inline-flow.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | css-world/03-layout-stack/csw-06-flow-breaking-protection.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | css-world/03-layout-stack/csw-07-stacking-rules.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | css-world/04-text-visual/csw-08-text-processing.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | css-world/04-text-visual/csw-09-decoration.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | css-world/05-interface-direction/csw-10-display-visibility.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | css-world/05-interface-direction/csw-11-user-interface.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | css-world/05-interface-direction/csw-12-writing-directions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | css-world/06-review/csw-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.5 javascript-fullstack（16 章 · 待修 16 章 · 32 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | javascript-fullstack/00-guide/jfs-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | javascript-fullstack/01-language-core/jfs-01-javascript-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | javascript-fullstack/01-language-core/jfs-02-variables-expressions-statements.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | javascript-fullstack/01-language-core/jfs-03-functions-objects.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | javascript-fullstack/01-language-core/jfs-04-object-oriented-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | javascript-fullstack/01-language-core/jfs-05-asynchronous-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | javascript-fullstack/02-browser/jfs-06-frontend-overview.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | javascript-fullstack/02-browser/jfs-07-dom-standard.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | javascript-fullstack/02-browser/jfs-08-dom-extensions-bom.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | javascript-fullstack/02-browser/jfs-09-frontend-events.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | javascript-fullstack/02-browser/jfs-10-ajax-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | javascript-fullstack/03-node/jfs-11-nodejs-overview.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | javascript-fullstack/03-node/jfs-12-build-web-services.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | javascript-fullstack/03-node/jfs-13-handle-client-requests.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | javascript-fullstack/03-node/jfs-14-data-persistence.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | javascript-fullstack/04-review/jfs-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.6 deep-nodejs（17 章 · 待修 17 章 · 34 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-nodejs/00-guide/dnj-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | deep-nodejs/01-foundations/dnj-01-node-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | deep-nodejs/01-foundations/dnj-02-module-mechanism.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | deep-nodejs/02-async-memory/dnj-03-async-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | deep-nodejs/02-async-memory/dnj-04-async-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | deep-nodejs/02-async-memory/dnj-05-memory-control.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | deep-nodejs/03-data-network/dnj-06-buffer.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | deep-nodejs/03-data-network/dnj-07-network-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | deep-nodejs/04-web-process/dnj-08-web-application.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | deep-nodejs/04-web-process/dnj-09-processes.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | deep-nodejs/05-quality-production/dnj-10-testing.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | deep-nodejs/05-quality-production/dnj-11-productization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | deep-nodejs/06-appendices/dnj-appendix-a-installation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | deep-nodejs/06-appendices/dnj-appendix-b-debugging.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | deep-nodejs/06-appendices/dnj-appendix-c-coding-style.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | deep-nodejs/06-appendices/dnj-appendix-d-local-npm.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | deep-nodejs/07-review/dnj-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.7 vuejs-practice（18 章 · 待修 18 章 · 36 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | vuejs-practice/00-guide/vjp-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | vuejs-practice/01-concepts/vjp-01-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | vuejs-practice/01-concepts/vjp-02-basic-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | vuejs-practice/01-concepts/vjp-03-vue-syntax.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | vuejs-practice/02-options-project/vjp-04-vue-options.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | vuejs-practice/02-options-project/vjp-05-built-in-components.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | vuejs-practice/02-options-project/vjp-06-projectization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | vuejs-practice/03-mall/vjp-07-online-mall-one.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | vuejs-practice/03-mall/vjp-08-online-mall-two.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | vuejs-practice/04-projects/vjp-09-corporate-website.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | vuejs-practice/04-projects/vjp-10-mobile-news.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | vuejs-practice/04-projects/vjp-11-svg-drawing-board.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | vuejs-practice/05-appendices/vjp-appendix-a-git.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | vuejs-practice/05-appendices/vjp-appendix-b-npm.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | vuejs-practice/05-appendices/vjp-appendix-c-webpack.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | vuejs-practice/05-appendices/vjp-appendix-d-closures-object-references.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | vuejs-practice/05-appendices/vjp-appendix-e-ecmascript-6.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | vuejs-practice/06-review/vjp-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.8 nodejs-definitive-guide（18 章 · 待修 18 章 · 36 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | nodejs-definitive-guide/00-guide/ndg-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | nodejs-definitive-guide/01-foundations/ndg-01-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | nodejs-definitive-guide/01-foundations/ndg-02-repl.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | nodejs-definitive-guide/01-foundations/ndg-03-foundations.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | nodejs-definitive-guide/01-foundations/ndg-04-modules-npm.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | nodejs-definitive-guide/02-data-files/ndg-05-buffer-binary.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | nodejs-definitive-guide/02-data-files/ndg-06-filesystem.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | nodejs-definitive-guide/03-network-process/ndg-07-tcp-udp.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | nodejs-definitive-guide/03-network-process/ndg-08-http-https.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | nodejs-definitive-guide/03-network-process/ndg-09-process-child-process.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | nodejs-definitive-guide/04-reliability-modules/ndg-10-errors-assertions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | nodejs-definitive-guide/04-reliability-modules/ndg-11-crypto-compression.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | nodejs-definitive-guide/04-reliability-modules/ndg-12-other-modules.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | nodejs-definitive-guide/05-web-apps/ndg-13-database-access.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | nodejs-definitive-guide/05-web-apps/ndg-14-express-web-apps.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | nodejs-definitive-guide/05-web-apps/ndg-15-socketio-websocket.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | nodejs-definitive-guide/06-cases-review/ndg-16-integrated-cases.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | nodejs-definitive-guide/06-cases-review/ndg-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.9 javascript-definitive-guide（19 章 · 待修 19 章 · 38 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | javascript-definitive-guide/00-guide/jdg-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | javascript-definitive-guide/01-language-control/jdg-01-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | javascript-definitive-guide/01-language-control/jdg-02-lexical-structure.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | javascript-definitive-guide/01-language-control/jdg-03-types-values-variables.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | javascript-definitive-guide/01-language-control/jdg-04-expressions-operators.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | javascript-definitive-guide/01-language-control/jdg-05-statements.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | javascript-definitive-guide/02-data-organization/jdg-06-objects.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | javascript-definitive-guide/02-data-organization/jdg-07-arrays.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | javascript-definitive-guide/02-data-organization/jdg-08-functions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | javascript-definitive-guide/02-data-organization/jdg-09-classes.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | javascript-definitive-guide/02-data-organization/jdg-10-modules.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | javascript-definitive-guide/03-library-advanced/jdg-11-standard-library.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | javascript-definitive-guide/03-library-advanced/jdg-12-iterators-generators.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | javascript-definitive-guide/03-library-advanced/jdg-13-asynchronous-javascript.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | javascript-definitive-guide/03-library-advanced/jdg-14-metaprogramming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | javascript-definitive-guide/04-browser-platform/jdg-15-web-browsers.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | javascript-definitive-guide/05-node-tools/jdg-16-node.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | javascript-definitive-guide/05-node-tools/jdg-17-tools-extensions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | javascript-definitive-guide/06-review/jdg-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.10 vuejs-design-implementation（20 章 · 待修 20 章 · 40 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | vuejs-design-implementation/00-guide/vdi-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | vuejs-design-implementation/01-framework/vdi-01-art-of-tradeoffs.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | vuejs-design-implementation/01-framework/vdi-02-core-elements-framework-design.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | vuejs-design-implementation/01-framework/vdi-03-vue3-design-thinking.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | vuejs-design-implementation/02-reactivity/vdi-04-reactivity-role-implementation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | vuejs-design-implementation/02-reactivity/vdi-05-non-primitive-reactivity.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | vuejs-design-implementation/02-reactivity/vdi-06-primitive-reactivity.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | vuejs-design-implementation/03-renderer/vdi-07-renderer-design.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | vuejs-design-implementation/03-renderer/vdi-08-mount-update.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | vuejs-design-implementation/03-renderer/vdi-09-simple-diff.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | vuejs-design-implementation/03-renderer/vdi-10-double-ended-diff.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | vuejs-design-implementation/03-renderer/vdi-11-fast-diff.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | vuejs-design-implementation/04-components/vdi-12-component-implementation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | vuejs-design-implementation/04-components/vdi-13-async-functional-components.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | vuejs-design-implementation/04-components/vdi-14-built-in-components-modules.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | vuejs-design-implementation/05-compiler/vdi-15-compiler-core-overview.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | vuejs-design-implementation/05-compiler/vdi-16-parser.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | vuejs-design-implementation/05-compiler/vdi-17-compiler-optimization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | vuejs-design-implementation/06-ssr/vdi-18-isomorphic-rendering.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | vuejs-design-implementation/07-review/vdi-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.11 javascript-pro-guide（34 章 · 待修 34 章 · 67 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | javascript-pro-guide/00-guide/jpg-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | javascript-pro-guide/01-foundations/jpg-01-what-is-javascript.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | javascript-pro-guide/01-foundations/jpg-02-javascript-in-html.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | javascript-pro-guide/01-foundations/jpg-03-language-basics.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | javascript-pro-guide/01-foundations/jpg-04-variables-scope-memory.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | javascript-pro-guide/02-types-objects/jpg-05-basic-reference-types.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | javascript-pro-guide/02-types-objects/jpg-06-collection-reference-types.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 8 | javascript-pro-guide/02-types-objects/jpg-07-iterators-generators.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | javascript-pro-guide/02-types-objects/jpg-08-objects-classes-oop.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | javascript-pro-guide/02-types-objects/jpg-09-proxies-reflect.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | javascript-pro-guide/02-types-objects/jpg-10-functions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | javascript-pro-guide/03-async-browser/jpg-11-promises-async-functions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | javascript-pro-guide/03-async-browser/jpg-12-browser-object-model.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | javascript-pro-guide/03-async-browser/jpg-13-client-detection.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | javascript-pro-guide/04-dom-events/jpg-14-dom.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | javascript-pro-guide/04-dom-events/jpg-15-dom-extensions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | javascript-pro-guide/04-dom-events/jpg-16-dom-levels-2-3.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | javascript-pro-guide/04-dom-events/jpg-17-events.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | javascript-pro-guide/05-graphics-forms-api/jpg-18-animation-canvas.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | javascript-pro-guide/05-graphics-forms-api/jpg-19-form-scripting.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | javascript-pro-guide/05-graphics-forms-api/jpg-20-javascript-apis.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | javascript-pro-guide/06-data-network/jpg-21-error-handling-debugging.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 23 | javascript-pro-guide/06-data-network/jpg-22-working-with-xml.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 24 | javascript-pro-guide/06-data-network/jpg-23-json.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 25 | javascript-pro-guide/06-data-network/jpg-24-network-requests.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 26 | javascript-pro-guide/06-data-network/jpg-25-client-storage.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 27 | javascript-pro-guide/07-modules-workers-practice/jpg-26-modules.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 28 | javascript-pro-guide/07-modules-workers-practice/jpg-27-workers.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 29 | javascript-pro-guide/07-modules-workers-practice/jpg-28-best-practices.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 30 | javascript-pro-guide/08-appendices/jpg-appendix-a-es2018-es2019.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 31 | javascript-pro-guide/08-appendices/jpg-appendix-b-strict-mode.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 32 | javascript-pro-guide/08-appendices/jpg-appendix-c-libraries-frameworks.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 33 | javascript-pro-guide/08-appendices/jpg-appendix-d-javascript-tools.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 34 | javascript-pro-guide/09-review/jpg-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 9.12 you-dont-know-js（42 章 · 待修 42 章 · 84 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | you-dont-know-js/00-guide/ydk-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | you-dont-know-js/01-volume-one-scope/ydk-scope-01-what-is-scope.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | you-dont-know-js/01-volume-one-scope/ydk-scope-02-lexical-scope.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | you-dont-know-js/01-volume-one-scope/ydk-scope-03-function-vs-block-scope.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | you-dont-know-js/01-volume-one-scope/ydk-scope-04-hoisting.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | you-dont-know-js/01-volume-one-scope/ydk-scope-05-scope-closures.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | you-dont-know-js/01-volume-one-scope/ydk-scope-appendix-a-dynamic-scope.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | you-dont-know-js/01-volume-one-scope/ydk-scope-appendix-b-block-scope-polyfill.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | you-dont-know-js/01-volume-one-scope/ydk-scope-appendix-c-lexical-this.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | you-dont-know-js/02-volume-one-this/ydk-this-01-this-or-that.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | you-dont-know-js/02-volume-one-this/ydk-this-02-this-all-makes-sense.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | you-dont-know-js/02-volume-one-this/ydk-this-03-objects.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | you-dont-know-js/02-volume-one-this/ydk-this-04-mixing-class-objects.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | you-dont-know-js/02-volume-one-this/ydk-this-05-prototypes.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | you-dont-know-js/02-volume-one-this/ydk-this-06-behavior-delegation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | you-dont-know-js/02-volume-one-this/ydk-this-appendix-a-es6-class.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | you-dont-know-js/03-volume-two-types/ydk-types-01-types.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | you-dont-know-js/03-volume-two-types/ydk-types-02-values.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | you-dont-know-js/03-volume-two-types/ydk-types-03-natives.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | you-dont-know-js/03-volume-two-types/ydk-types-04-coercion.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | you-dont-know-js/03-volume-two-types/ydk-types-05-grammar.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | you-dont-know-js/03-volume-two-types/ydk-types-appendix-a-mixed-environment.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 23 | you-dont-know-js/04-volume-two-async/ydk-async-01-now-and-later.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 24 | you-dont-know-js/04-volume-two-async/ydk-async-02-callbacks.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 25 | you-dont-know-js/04-volume-two-async/ydk-async-03-promises.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 26 | you-dont-know-js/04-volume-two-async/ydk-async-04-generators.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 27 | you-dont-know-js/04-volume-two-async/ydk-async-05-program-performance.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 28 | you-dont-know-js/04-volume-two-async/ydk-async-06-benchmarking-tuning.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 29 | you-dont-know-js/04-volume-two-async/ydk-async-appendix-a-asynquence.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 30 | you-dont-know-js/04-volume-two-async/ydk-async-appendix-b-advanced-patterns.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 31 | you-dont-know-js/05-volume-three-up-going/ydk-up-01-into-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 32 | you-dont-know-js/05-volume-three-up-going/ydk-up-02-into-javascript.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 33 | you-dont-know-js/05-volume-three-up-going/ydk-up-03-into-ydkjs.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 34 | you-dont-know-js/06-volume-three-es6/ydk-es6-01-now-future.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 35 | you-dont-know-js/06-volume-three-es6/ydk-es6-02-syntax.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 36 | you-dont-know-js/06-volume-three-es6/ydk-es6-03-organization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 37 | you-dont-know-js/06-volume-three-es6/ydk-es6-04-async-flow-control.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 38 | you-dont-know-js/06-volume-three-es6/ydk-es6-05-collections.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 39 | you-dont-know-js/06-volume-three-es6/ydk-es6-06-api-additions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 40 | you-dont-know-js/06-volume-three-es6/ydk-es6-07-meta-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 41 | you-dont-know-js/06-volume-three-es6/ydk-es6-08-beyond-es6.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 42 | you-dont-know-js/07-review/ydk-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 10：系统与内核系列（14 本 · 277 章待修 · 463 项）

**系列状态**：部分完成（windows-kernel-programming 已上线）

### 10.1 windows-kernel-programming（13 章 · 待修 2 章 · 2 项）

**书籍状态**：✅ 已完成并部署（release-20260803T064225Z）

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | windows-kernel-programming/00-guide/wkp-official-learning-map.mdx | §8小结>5条 | ✅ 已完成 | 2026-08-03 |
| 2 | windows-kernel-programming/01-foundations/wkp-01-windows-internals-overview.mdx | — | ✅ 合规 | — |
| 3 | windows-kernel-programming/01-foundations/wkp-02-getting-started-kernel-development.mdx | — | ✅ 合规 | — |
| 4 | windows-kernel-programming/01-foundations/wkp-03-kernel-programming-basics.mdx | — | ✅ 合规 | — |
| 5 | windows-kernel-programming/02-driver-debugging/wkp-04-driver-start-to-finish.mdx | — | ✅ 合规 | — |
| 6 | windows-kernel-programming/02-driver-debugging/wkp-05-debugging.mdx | — | ✅ 合规 | — |
| 7 | windows-kernel-programming/03-mechanisms/wkp-06-kernel-mechanisms.mdx | — | ✅ 合规 | — |
| 8 | windows-kernel-programming/03-mechanisms/wkp-07-io-request-packet.mdx | — | ✅ 合规 | — |
| 9 | windows-kernel-programming/04-notifications/wkp-08-process-thread-notifications.mdx | — | ✅ 合规 | — |
| 10 | windows-kernel-programming/04-notifications/wkp-09-object-registry-notifications.mdx | — | ✅ 合规 | — |
| 11 | windows-kernel-programming/05-filters/wkp-10-file-system-minifilters.mdx | — | ✅ 合规 | — |
| 12 | windows-kernel-programming/05-filters/wkp-11-miscellaneous-topics.mdx | — | ✅ 合规 | — |
| 13 | windows-kernel-programming/06-review/wkp-official-final-review.mdx | §8小结>5条 | ✅ 已完成 | 2026-08-03 |

**部署记录**：https://blog.luozichu.ink 已上线（2026-08-03）

### 10.2 linux-kernel-essence（10 章 · 待修 10 章 · 10 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | linux-kernel-essence/00-guide/lke-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | linux-kernel-essence/01-foundations/lke-01-kernel-intro.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | linux-kernel-essence/02-resources/lke-02-resource-management.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | linux-kernel-essence/03-storage-network/lke-03-filesystems.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | linux-kernel-essence/03-storage-network/lke-04-networking.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | linux-kernel-essence/04-virtual-power/lke-05-virtualization.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | linux-kernel-essence/04-virtual-power/lke-06-power-saving.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | linux-kernel-essence/05-diagnostics/lke-07-debugging.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | linux-kernel-essence/05-diagnostics/lke-08-profiling-tracing.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | linux-kernel-essence/06-review/lke-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 10.3 linux-kernel-design（22 章 · 待修 22 章 · 22 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | linux-kernel-design/00-guide/lkd-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | linux-kernel-design/01-foundations/lkd-01-linux-kernel-intro.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | linux-kernel-design/01-foundations/lkd-02-getting-started.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | linux-kernel-design/02-process-interface/lkd-03-process-management.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | linux-kernel-design/02-process-interface/lkd-04-process-scheduling.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | linux-kernel-design/02-process-interface/lkd-05-system-calls.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | linux-kernel-design/03-structures-events/lkd-06-kernel-data-structures.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | linux-kernel-design/03-structures-events/lkd-07-interrupts.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | linux-kernel-design/03-structures-events/lkd-08-bottom-halves.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | linux-kernel-design/04-concurrency-time/lkd-09-sync-intro.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | linux-kernel-design/04-concurrency-time/lkd-10-sync-methods.mdx | §8无要点 | ⬜ 待修复 | — |
| 12 | linux-kernel-design/04-concurrency-time/lkd-11-timers-time.mdx | §8无要点 | ⬜ 待修复 | — |
| 13 | linux-kernel-design/05-memory-address-space/lkd-12-memory-management.mdx | §8无要点 | ⬜ 待修复 | — |
| 14 | linux-kernel-design/05-memory-address-space/lkd-15-process-address-space.mdx | §8无要点 | ⬜ 待修复 | — |
| 15 | linux-kernel-design/05-memory-address-space/lkd-16-page-cache-writeback.mdx | §8无要点 | ⬜ 待修复 | — |
| 16 | linux-kernel-design/06-filesystems-io/lkd-13-vfs.mdx | §8无要点 | ⬜ 待修复 | — |
| 17 | linux-kernel-design/06-filesystems-io/lkd-14-block-io.mdx | §8无要点 | ⬜ 待修复 | — |
| 18 | linux-kernel-design/07-devices-debug/lkd-17-devices-modules.mdx | §8无要点 | ⬜ 待修复 | — |
| 19 | linux-kernel-design/07-devices-debug/lkd-18-debugging.mdx | §8无要点 | ⬜ 待修复 | — |
| 20 | linux-kernel-design/08-portability-community/lkd-19-portability.mdx | §8无要点 | ⬜ 待修复 | — |
| 21 | linux-kernel-design/08-portability-community/lkd-20-patches-community.mdx | §8无要点 | ⬜ 待修复 | — |
| 22 | linux-kernel-design/09-review/lkd-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 10.4 linux-os-practice（11 章 · 待修 11 章 · 22 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | linux-os-practice/00-guide/lop-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | linux-os-practice/01-foundation/lop-01-recognizing-linux.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | linux-os-practice/01-foundation/lop-02-using-linux.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | linux-os-practice/02-administration/lop-03-user-management.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | linux-os-practice/02-administration/lop-04-software-management.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | linux-os-practice/03-development/lop-05-programming-environment.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | linux-os-practice/04-network/lop-06-network-configuration.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | linux-os-practice/05-automation/lop-07-shell-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | linux-os-practice/05-automation/lop-08-regular-expressions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | linux-os-practice/06-project/lop-09-tetris-project.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | linux-os-practice/07-review/lop-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.5 gc-handbook（24 章 · 待修 24 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | gc-handbook/00-official-learning-map/gch1-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | gc-handbook/01-introduction/gch1-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | gc-handbook/02-mark-sweep/gch1-02-mark-sweep.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | gc-handbook/03-mark-compact/gch1-03-mark-compact.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | gc-handbook/04-copying/gch1-04-copying.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | gc-handbook/05-reference-counting/gch1-05-reference-counting.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | gc-handbook/06-comparing-collectors/gch1-06-comparing-collectors.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | gc-handbook/07-allocation/gch1-07-allocation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | gc-handbook/08-partitioning/gch1-08-partitioning.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | gc-handbook/09-generational/gch1-09-generational.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | gc-handbook/10-other-partitioned/gch1-10-other-partitioned.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | gc-handbook/11-runtime-interface/gch1-11-runtime-interface.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | gc-handbook/12-language-concerns/gch1-12-language-concerns.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | gc-handbook/13-concurrency-preliminaries/gch1-13-concurrency-preliminaries.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | gc-handbook/14-parallel/gch1-14-parallel.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | gc-handbook/15-concurrent/gch1-15-concurrent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | gc-handbook/16-concurrent-mark-sweep/gch1-16-concurrent-mark-sweep.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | gc-handbook/17-concurrent-copy-compact/gch1-17-concurrent-copy-compact.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | gc-handbook/18-concurrent-reference-counting/gch1-18-concurrent-reference-counting.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | gc-handbook/19-realtime/gch1-19-realtime.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | gc-handbook/20-glossary/gch1-glossary.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | gc-handbook/21-bibliography/gch1-bibliography.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | gc-handbook/22-index/gch1-index.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | gc-handbook/23-official-final-review/gch1-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 10.6 how-computers-work（14 章 · 待修 14 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | how-computers-work/00-guide/hcw-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | how-computers-work/01-hardware/hcw-01-three-principles.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | how-computers-work/01-hardware/hcw-02-build-computer.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | how-computers-work/02-programming/hcw-03-manual-assembly.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | how-computers-work/02-programming/hcw-04-program-flow.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | how-computers-work/02-programming/hcw-05-algorithms.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | how-computers-work/03-data-oop/hcw-06-data-structures.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | how-computers-work/03-data-oop/hcw-07-oop.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | how-computers-work/03-data-oop/hcw-08-database.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | how-computers-work/04-network-data/hcw-09-tcp-ip.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | how-computers-work/04-network-data/hcw-10-encryption.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | how-computers-work/04-network-data/hcw-11-xml.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | how-computers-work/05-system/hcw-12-system-engineering.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | how-computers-work/06-review/hcw-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.7 csapp（15 章 · 待修 15 章 · 30 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | csapp/00-guide/cap-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | csapp/01-program-execution/cap-01-system-tour.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | csapp/01-program-execution/cap-02-information.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | csapp/01-program-execution/cap-03-machine-level.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | csapp/02-architecture-performance/cap-04-processor-architecture.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | csapp/02-architecture-performance/cap-05-optimization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | csapp/02-architecture-performance/cap-06-memory-hierarchy.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | csapp/03-system-runtime/cap-07-linking.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | csapp/03-system-runtime/cap-08-exceptional-control.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | csapp/03-system-runtime/cap-09-virtual-memory.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | csapp/04-communication/cap-10-system-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | csapp/04-communication/cap-11-network-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | csapp/04-communication/cap-12-concurrent-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | csapp/05-appendix/cap-appendix-a-error-handling.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | csapp/06-review/cap-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.8 modern-os（15 章 · 待修 15 章 · 30 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | modern-os/00-guide/mos-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | modern-os/01-foundations/mos-01-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | modern-os/01-foundations/mos-02-processes-threads.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | modern-os/01-foundations/mos-03-memory-management.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | modern-os/02-storage-io/mos-04-file-systems.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | modern-os/02-storage-io/mos-05-input-output.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | modern-os/02-storage-io/mos-06-deadlocks.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | modern-os/03-scale-security/mos-07-virtualization-cloud.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | modern-os/03-scale-security/mos-08-multiple-processor-systems.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | modern-os/03-scale-security/mos-09-security.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | modern-os/04-case-studies/mos-10-unix-linux-android.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | modern-os/04-case-studies/mos-11-windows-8.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | modern-os/05-design-references/mos-12-os-design.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | modern-os/05-design-references/mos-13-bibliography.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | modern-os/06-review/mos-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.9 how-programs-work（15 章 · 待修 15 章 · 30 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | how-programs-work/00-guide/hpw-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | how-programs-work/01-cpu-data/hpw-01-cpu.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | how-programs-work/01-cpu-data/hpw-02-binary.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | how-programs-work/01-cpu-data/hpw-03-floating-point.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | how-programs-work/02-memory-storage/hpw-04-memory.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | how-programs-work/02-memory-storage/hpw-05-memory-disk.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | how-programs-work/02-memory-storage/hpw-06-compression.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | how-programs-work/03-runtime-build/hpw-07-runtime-environment.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | how-programs-work/03-runtime-build/hpw-08-source-executable.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | how-programs-work/03-runtime-build/hpw-09-os-applications.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | how-programs-work/04-assembly-hardware/hpw-10-assembly.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | how-programs-work/04-assembly-hardware/hpw-11-hardware-control.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | how-programs-work/05-thinking-language/hpw-12-thinking.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | how-programs-work/05-thinking-language/hpw-appendix-c.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | how-programs-work/06-review/hpw-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.10 art-of-unix-programming（33 章 · 待修 33 章 · 33 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | art-of-unix-programming/00-map/taoup-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | art-of-unix-programming/01-preface/taoup-preface.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | art-of-unix-programming/02-part-01/taoup-part-01.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | art-of-unix-programming/03-chapter-01-philosophy/taoup-chapter-01-philosophy.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | art-of-unix-programming/04-chapter-02-history/taoup-chapter-02-history.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | art-of-unix-programming/05-chapter-03-contrasts/taoup-chapter-03-contrasts.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | art-of-unix-programming/06-part-02/taoup-part-02.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | art-of-unix-programming/07-chapter-04-modularity/taoup-chapter-04-modularity.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | art-of-unix-programming/08-chapter-05-textuality/taoup-chapter-05-textuality.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | art-of-unix-programming/09-chapter-06-transparency/taoup-chapter-06-transparency.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | art-of-unix-programming/10-chapter-07-multiprogramming/taoup-chapter-07-multiprogramming.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | art-of-unix-programming/11-chapter-08-minilanguages/taoup-chapter-08-minilanguages.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | art-of-unix-programming/12-chapter-09-generation/taoup-chapter-09-generation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | art-of-unix-programming/13-chapter-10-configuration/taoup-chapter-10-configuration.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | art-of-unix-programming/14-chapter-11-interfaces/taoup-chapter-11-interfaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | art-of-unix-programming/15-chapter-12-optimization/taoup-chapter-12-optimization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | art-of-unix-programming/16-chapter-13-complexity/taoup-chapter-13-complexity.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | art-of-unix-programming/17-part-03/taoup-part-03.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | art-of-unix-programming/18-chapter-14-languages/taoup-chapter-14-languages.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | art-of-unix-programming/19-chapter-15-tools/taoup-chapter-15-tools.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | art-of-unix-programming/20-chapter-16-reuse/taoup-chapter-16-reuse.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | art-of-unix-programming/21-part-04/taoup-part-04.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | art-of-unix-programming/22-chapter-17-portability/taoup-chapter-17-portability.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | art-of-unix-programming/23-chapter-18-documentation/taoup-chapter-18-documentation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 25 | art-of-unix-programming/24-chapter-19-open-source/taoup-chapter-19-open-source.mdx | §8缺小结 | ⬜ 待修复 | — |
| 26 | art-of-unix-programming/25-chapter-20-futures/taoup-chapter-20-futures.mdx | §8缺小结 | ⬜ 待修复 | — |
| 27 | art-of-unix-programming/26-appendix-a-glossary-of-abbreviations/taoup-appendix-a-glossary-of-abbreviations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 28 | art-of-unix-programming/27-appendix-b-references/taoup-appendix-b-references.mdx | §8缺小结 | ⬜ 待修复 | — |
| 29 | art-of-unix-programming/28-appendix-c-contributors/taoup-appendix-c-contributors.mdx | §8缺小结 | ⬜ 待修复 | — |
| 30 | art-of-unix-programming/29-appendix-d-rootless-root/taoup-appendix-d-rootless-root.mdx | §8缺小结 | ⬜ 待修复 | — |
| 31 | art-of-unix-programming/30-colophon/taoup-colophon.mdx | §8缺小结 | ⬜ 待修复 | — |
| 32 | art-of-unix-programming/31-index/taoup-index.mdx | §8缺小结 | ⬜ 待修复 | — |
| 33 | art-of-unix-programming/32-review/taoup-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 10.11 os-concepts（23 章 · 待修 23 章 · 46 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | os-concepts/00-guide/osc-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | os-concepts/01-overview/osc-01-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | os-concepts/01-overview/osc-02-os-structures.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | os-concepts/02-process-management/osc-03-processes.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | os-concepts/02-process-management/osc-04-threads-concurrency.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | os-concepts/02-process-management/osc-05-cpu-scheduling.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | os-concepts/03-synchronization/osc-06-synchronization-tools.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | os-concepts/03-synchronization/osc-07-synchronization-examples.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | os-concepts/03-synchronization/osc-08-deadlocks.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | os-concepts/04-memory/osc-09-main-memory.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | os-concepts/04-memory/osc-10-virtual-memory.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | os-concepts/05-storage/osc-11-mass-storage.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | os-concepts/05-storage/osc-12-io-systems.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | os-concepts/06-file-system/osc-13-file-system-interface.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | os-concepts/06-file-system/osc-14-file-system-implementation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | os-concepts/06-file-system/osc-15-file-system-internals.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | os-concepts/07-security/osc-16-security.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | os-concepts/07-security/osc-17-protection.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | os-concepts/08-advanced/osc-18-virtual-machines.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | os-concepts/08-advanced/osc-19-network-distributed.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | os-concepts/09-case-studies/osc-20-linux.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | os-concepts/09-case-studies/osc-21-windows-10.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 23 | os-concepts/10-review/osc-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.12 unix-advanced-programming（26 章 · 待修 26 章 · 52 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unix-advanced-programming/00-guide/uap-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unix-advanced-programming/01-foundations/uap-standards-implementations.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unix-advanced-programming/01-foundations/uap-unix-basics.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unix-advanced-programming/02-files-io/uap-file-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unix-advanced-programming/02-files-io/uap-files-directories.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unix-advanced-programming/02-files-io/uap-standard-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unix-advanced-programming/02-files-io/uap-system-data-information.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unix-advanced-programming/03-process/uap-process-control.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unix-advanced-programming/03-process/uap-process-environment.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unix-advanced-programming/03-process/uap-process-relationships.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unix-advanced-programming/04-signals-threads/uap-signals.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unix-advanced-programming/04-signals-threads/uap-thread-control.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unix-advanced-programming/04-signals-threads/uap-threads.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unix-advanced-programming/05-daemons-advanced-io/uap-advanced-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unix-advanced-programming/05-daemons-advanced-io/uap-daemon-processes.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unix-advanced-programming/06-ipc/uap-advanced-ipc.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unix-advanced-programming/06-ipc/uap-interprocess-communication.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unix-advanced-programming/06-ipc/uap-network-ipc-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unix-advanced-programming/07-terminals/uap-pseudo-terminals.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unix-advanced-programming/07-terminals/uap-terminal-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unix-advanced-programming/08-applications/uap-database-library.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unix-advanced-programming/08-applications/uap-network-printer.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 23 | unix-advanced-programming/09-appendices/uap-appendix-a-function-prototypes.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 24 | unix-advanced-programming/09-appendices/uap-appendix-b-source-code.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 25 | unix-advanced-programming/09-appendices/uap-appendix-c-exercise-solutions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 26 | unix-advanced-programming/10-review/uap-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.13 windows-journey（29 章 · 待修 29 章 · 58 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | windows-journey/00-guide/wj-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | windows-journey/01-dream-orientation/wj-01-game-development-landscape.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | windows-journey/02-windows-foundation/wj-02-visual-studio.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | windows-journey/02-windows-foundation/wj-03-windows-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | windows-journey/03-gdi-2d/wj-04-gdi-foundations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | windows-journey/03-gdi-2d/wj-05-gdi-drawing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | windows-journey/03-gdi-2d/wj-06-windows-animation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | windows-journey/03-gdi-2d/wj-07-input-messages.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | windows-journey/03-gdi-2d/wj-08-physics-particles.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | windows-journey/03-gdi-2d/wj-09-turn-based-game.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | windows-journey/04-directx-foundation/wj-10-directx-overview.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | windows-journey/04-directx-foundation/wj-11-direct3d-foundations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | windows-journey/04-directx-foundation/wj-12-direct3d-drawing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | windows-journey/04-directx-foundation/wj-13-four-transforms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | windows-journey/04-directx-foundation/wj-14-lighting-materials.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | windows-journey/04-directx-foundation/wj-15-directinput.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | windows-journey/04-directx-foundation/wj-16-texture-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | windows-journey/04-directx-foundation/wj-17-mesh-loading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | windows-journey/04-directx-foundation/wj-18-alpha-blending.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | windows-journey/04-directx-foundation/wj-19-depth-z-buffer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | windows-journey/04-directx-foundation/wj-20-stencil-techniques.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | windows-journey/05-directx-application/wj-21-game-camera.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | windows-journey/05-directx-application/wj-22-terrain.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | windows-journey/05-directx-application/wj-23-skybox.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | windows-journey/05-directx-application/wj-24-particle-system.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | windows-journey/05-directx-application/wj-25-multi-model-loading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | windows-journey/06-engine-and-reading/wj-26-game-engines.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | windows-journey/06-engine-and-reading/wj-appendix-a-reading-guide.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | windows-journey/07-review/wj-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 10.14 unix-network-programming-vol1（38 章 · 待修 38 章 · 76 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unix-network-programming-vol1/00-guide/unp-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unix-network-programming-vol1/01-intro-tcpip/unp-01-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unix-network-programming-vol1/01-intro-tcpip/unp-02-transport-layer.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unix-network-programming-vol1/02-elementary-sockets/unp-03-sockets-introduction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unix-network-programming-vol1/02-elementary-sockets/unp-04-elementary-tcp-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unix-network-programming-vol1/02-elementary-sockets/unp-05-tcp-client-server-example.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unix-network-programming-vol1/02-elementary-sockets/unp-06-io-multiplexing.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unix-network-programming-vol1/02-elementary-sockets/unp-07-socket-options.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unix-network-programming-vol1/02-elementary-sockets/unp-08-elementary-udp-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unix-network-programming-vol1/02-elementary-sockets/unp-09-elementary-sctp-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unix-network-programming-vol1/02-elementary-sockets/unp-10-sctp-client-server-example.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unix-network-programming-vol1/02-elementary-sockets/unp-11-name-address-conversions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unix-network-programming-vol1/03-advanced-core/unp-12-ipv4-ipv6-interoperability.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unix-network-programming-vol1/03-advanced-core/unp-13-daemon-inetd.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unix-network-programming-vol1/03-advanced-core/unp-14-advanced-io-functions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unix-network-programming-vol1/03-advanced-core/unp-15-unix-domain-protocols.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unix-network-programming-vol1/03-advanced-core/unp-16-nonblocking-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unix-network-programming-vol1/03-advanced-core/unp-17-ioctl-operations.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unix-network-programming-vol1/03-advanced-core/unp-18-routing-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unix-network-programming-vol1/03-advanced-core/unp-19-key-management-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unix-network-programming-vol1/04-advanced-transport/unp-20-broadcasting.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unix-network-programming-vol1/04-advanced-transport/unp-21-multicasting.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 23 | unix-network-programming-vol1/04-advanced-transport/unp-22-advanced-udp.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 24 | unix-network-programming-vol1/04-advanced-transport/unp-23-advanced-sctp.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 25 | unix-network-programming-vol1/04-advanced-transport/unp-24-out-of-band-data.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 26 | unix-network-programming-vol1/04-advanced-transport/unp-25-signal-driven-io.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 27 | unix-network-programming-vol1/05-concurrency-system/unp-26-threads.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 28 | unix-network-programming-vol1/05-concurrency-system/unp-27-ip-options.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 29 | unix-network-programming-vol1/05-concurrency-system/unp-28-raw-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 30 | unix-network-programming-vol1/05-concurrency-system/unp-29-datalink-access.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 31 | unix-network-programming-vol1/05-concurrency-system/unp-30-client-server-design.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 32 | unix-network-programming-vol1/05-concurrency-system/unp-31-streams.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 33 | unix-network-programming-vol1/06-appendices/unp-appendix-a-internet-protocols.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 34 | unix-network-programming-vol1/06-appendices/unp-appendix-b-virtual-networks.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 35 | unix-network-programming-vol1/06-appendices/unp-appendix-c-debugging-techniques.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 36 | unix-network-programming-vol1/06-appendices/unp-appendix-d-misc-source-code.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 37 | unix-network-programming-vol1/06-appendices/unp-appendix-e-selected-solutions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 38 | unix-network-programming-vol1/07-review/unp-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 11：职业素养与通识系列（7 本 · 121 章待修 · 470 项）

**系列状态**：待开始

### 11.1 org-problem-tools（8 章 · 待修 8 章 · 8 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | org-problem-tools/00-official-learning-map/opt-23-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | org-problem-tools/01-introduction/opt-23-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | org-problem-tools/02-chapter-01/opt-23-chapter-01.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | org-problem-tools/03-chapter-02/opt-23-chapter-02.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | org-problem-tools/04-chapter-03/opt-23-chapter-03.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | org-problem-tools/05-chapter-04/opt-23-chapter-04.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | org-problem-tools/06-afterword/opt-23-afterword.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | org-problem-tools/07-official-final-review/opt-23-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 11.2 mythical-man-month（26 章 · 待修 26 章 · 52 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mythical-man-month/00-map/tmm40-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | mythical-man-month/01-translator-preface/tmm40-translator-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | mythical-man-month/02-20th-preface/tmm40-20th-anniversary-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | mythical-man-month/03-first-preface/tmm40-first-edition-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | mythical-man-month/04-01-tar-pit/tmm40-01-tar-pit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | mythical-man-month/05-02-man-month/tmm40-02-man-month.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | mythical-man-month/06-03-surgical-team/tmm40-03-surgical-team.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | mythical-man-month/07-04-conceptual-integrity/tmm40-04-conceptual-integrity.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | mythical-man-month/08-05-second-system-effect/tmm40-05-second-system-effect.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | mythical-man-month/09-06-passing-the-word/tmm40-06-passing-the-word.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | mythical-man-month/10-07-babel/tmm40-07-babel.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | mythical-man-month/11-08-calling-the-shot/tmm40-08-calling-the-shot.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | mythical-man-month/12-09-ten-pounds/tmm40-09-ten-pounds.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | mythical-man-month/13-10-documentary-hypothesis/tmm40-10-documentary-hypothesis.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | mythical-man-month/14-11-plan-to-throw-one-away/tmm40-11-plan-to-throw-one-away.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | mythical-man-month/15-12-sharp-tools/tmm40-12-sharp-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | mythical-man-month/16-13-whole-and-parts/tmm40-13-whole-and-parts.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | mythical-man-month/17-14-hatching-catastrophe/tmm40-14-hatching-catastrophe.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | mythical-man-month/18-15-other-face/tmm40-15-other-face.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | mythical-man-month/19-16-no-silver-bullet/tmm40-16-no-silver-bullet.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | mythical-man-month/20-17-no-silver-bullet-refired/tmm40-17-no-silver-bullet-refired.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | mythical-man-month/21-18-propositions/tmm40-18-propositions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | mythical-man-month/22-19-twenty-years-later/tmm40-19-twenty-years-later.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | mythical-man-month/23-notes-references/tmm40-notes-references.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | mythical-man-month/24-appendix-practice/tmm40-appendix-practice.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | mythical-man-month/25-review/tmm40-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 11.3 out-of-control（28 章 · 待修 28 章 · 56 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | out-of-control/00-official-learning-map/ooc16-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | out-of-control/01-chinese-preface/ooc16-chinese-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | out-of-control/02-chapter-01/ooc16-chapter-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | out-of-control/03-chapter-02/ooc16-chapter-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | out-of-control/04-chapter-03/ooc16-chapter-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | out-of-control/05-chapter-04/ooc16-chapter-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | out-of-control/06-chapter-05/ooc16-chapter-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | out-of-control/07-chapter-06/ooc16-chapter-06.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | out-of-control/08-chapter-07/ooc16-chapter-07.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | out-of-control/09-chapter-08/ooc16-chapter-08.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | out-of-control/10-chapter-09/ooc16-chapter-09.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | out-of-control/11-chapter-10/ooc16-chapter-10.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | out-of-control/12-chapter-11/ooc16-chapter-11.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | out-of-control/13-chapter-12/ooc16-chapter-12.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | out-of-control/14-chapter-13/ooc16-chapter-13.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | out-of-control/15-chapter-14/ooc16-chapter-14.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | out-of-control/16-chapter-15/ooc16-chapter-15.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | out-of-control/17-chapter-16/ooc16-chapter-16.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | out-of-control/18-chapter-17/ooc16-chapter-17.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | out-of-control/19-chapter-18/ooc16-chapter-18.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | out-of-control/20-chapter-19/ooc16-chapter-19.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | out-of-control/21-chapter-20/ooc16-chapter-20.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | out-of-control/22-chapter-21/ooc16-chapter-21.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | out-of-control/23-chapter-22/ooc16-chapter-22.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | out-of-control/24-chapter-23/ooc16-chapter-23.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | out-of-control/25-chapter-24/ooc16-chapter-24.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | out-of-control/26-translator-postscript/ooc16-translator-postscript.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | out-of-control/27-official-final-review/ooc16-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 11.4 mindset-growth（12 章 · 待修 12 章 · 72 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mindset-growth/00-map/msg17-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | mindset-growth/01-introduction/msg17-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | mindset-growth/02-chapter-01/msg17-chapter-01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | mindset-growth/03-chapter-02/msg17-chapter-02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | mindset-growth/04-chapter-03/msg17-chapter-03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | mindset-growth/05-chapter-04/msg17-chapter-04.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | mindset-growth/06-chapter-05/msg17-chapter-05.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | mindset-growth/07-chapter-06/msg17-chapter-06.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | mindset-growth/08-chapter-07/msg17-chapter-07.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | mindset-growth/09-chapter-08/msg17-chapter-08.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | mindset-growth/10-postscript/msg17-publishing-postscript.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | mindset-growth/11-review/msg17-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 11.5 effective-executive（14 章 · 待修 14 章 · 84 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | effective-executive/00-official-learning-map/eex19-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | effective-executive/01-recommendation-01/eex19-recommendation-01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | effective-executive/02-recommendation-02/eex19-recommendation-02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | effective-executive/03-recommendation-03/eex19-recommendation-03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | effective-executive/04-preface/eex19-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | effective-executive/05-chapter-01/eex19-chapter-01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | effective-executive/06-chapter-02/eex19-chapter-02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | effective-executive/07-chapter-03/eex19-chapter-03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | effective-executive/08-chapter-04/eex19-chapter-04.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | effective-executive/09-chapter-05/eex19-chapter-05.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | effective-executive/10-chapter-06/eex19-chapter-06.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | effective-executive/11-chapter-07/eex19-chapter-07.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | effective-executive/12-chapter-08/eex19-chapter-08.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | effective-executive/13-official-final-review/eex19-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 11.6 make-it-stick（15 章 · 待修 15 章 · 90 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | make-it-stick/00-map/mis18-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | make-it-stick/01-recommendation-01/mis18-recommendation-01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | make-it-stick/02-recommendation-02/mis18-recommendation-02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | make-it-stick/03-preface/mis18-preface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | make-it-stick/04-chapter-01/mis18-chapter-01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | make-it-stick/05-chapter-02/mis18-chapter-02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | make-it-stick/06-chapter-03/mis18-chapter-03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | make-it-stick/07-chapter-04/mis18-chapter-04.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | make-it-stick/08-chapter-05/mis18-chapter-05.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | make-it-stick/09-chapter-06/mis18-chapter-06.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | make-it-stick/10-chapter-07/mis18-chapter-07.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | make-it-stick/11-chapter-08/mis18-chapter-08.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | make-it-stick/12-suggested-reading/mis18-suggested-reading.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | make-it-stick/13-acknowledgments/mis18-acknowledgments.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | make-it-stick/14-review/mis18-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 11.7 peak-deliberate-practice（18 章 · 待修 18 章 · 108 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | peak-deliberate-practice/00-map/pdp16-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | peak-deliberate-practice/01-copyright/pdp16-copyright.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | peak-deliberate-practice/02-to-readers/pdp16-to-readers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | peak-deliberate-practice/03-praise/pdp16-praise.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | peak-deliberate-practice/04-recommendation/pdp16-recommendation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | peak-deliberate-practice/05-author-statement/pdp16-author-statement.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | peak-deliberate-practice/06-introduction/pdp16-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | peak-deliberate-practice/07-chapter-01/pdp16-chapter-01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | peak-deliberate-practice/08-chapter-02/pdp16-chapter-02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | peak-deliberate-practice/09-chapter-03/pdp16-chapter-03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | peak-deliberate-practice/10-chapter-04/pdp16-chapter-04.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | peak-deliberate-practice/11-chapter-05/pdp16-chapter-05.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | peak-deliberate-practice/12-chapter-06/pdp16-chapter-06.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | peak-deliberate-practice/13-chapter-07/pdp16-chapter-07.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | peak-deliberate-practice/14-chapter-08/pdp16-chapter-08.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | peak-deliberate-practice/15-chapter-09/pdp16-chapter-09.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | peak-deliberate-practice/16-references/pdp16-references-notes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | peak-deliberate-practice/17-review/pdp16-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 12：游戏开发系列（13 本 · 221 章待修 · 472 项）

**系列状态**：待开始

### 12.1 game-server-programming（10 章 · 待修 10 章 · 10 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-server-programming/00-guide/gsp-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | game-server-programming/01-foundations/gsp-01-network-programming-foundations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | game-server-programming/01-foundations/gsp-02-multithreading.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | game-server-programming/02-communication-security/gsp-03-efficient-communication-models.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | game-server-programming/02-communication-security/gsp-04-game-data-encryption.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | game-server-programming/03-systems/gsp-05-game-database.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | game-server-programming/03-systems/gsp-06-game-lobby.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | game-server-programming/03-systems/gsp-07-gm-tool.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | game-server-programming/03-systems/gsp-08-auto-update.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | game-server-programming/04-review/gsp-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 12.2 game-network-core-tech（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-network-core-tech/00-guide/gnc-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | game-network-core-tech/01-foundations/gnc-00-quickstart-network-game-programming.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | game-network-core-tech/01-foundations/gnc-01-history-evolution.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | game-network-core-tech/01-foundations/gnc-02-what-is-online-game.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | game-network-core-tech/02-architecture/gnc-03-online-game-architecture.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | game-network-core-tech/03-practice/gnc-04-cs-mmo-practice.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | game-network-core-tech/03-practice/gnc-05-p2p-mo-practice.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | game-network-core-tech/04-operations/gnc-06-auxiliary-systems.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | game-network-core-tech/04-operations/gnc-07-operations-infrastructure.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | game-network-core-tech/05-team/gnc-08-development-organization.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | game-network-core-tech/06-review/gnc-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 12.3 game-mechanics-advanced（17 章 · 待修 17 章 · 17 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-mechanics-advanced/00-guide/gma-official-learning-map.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-mechanics-advanced/01-foundations/gma-01-designing-game-mechanics.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-mechanics-advanced/01-foundations/gma-02-emergence-progression.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-mechanics-advanced/01-foundations/gma-03-complex-systems-emergence.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-mechanics-advanced/02-economy-machinations/gma-04-internal-economy.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-mechanics-advanced/02-economy-machinations/gma-05-machinations.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-mechanics-advanced/02-economy-machinations/gma-06-common-mechanisms.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-mechanics-advanced/03-patterns-balancing/gma-07-design-patterns.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-mechanics-advanced/03-patterns-balancing/gma-08-simulating-balancing-games.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-mechanics-advanced/03-patterns-balancing/gma-09-building-economies.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-mechanics-advanced/04-progression-meaning/gma-10-level-design-mechanics.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-mechanics-advanced/04-progression-meaning/gma-11-progression-mechanisms.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-mechanics-advanced/04-progression-meaning/gma-12-meaningful-mechanics.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-mechanics-advanced/05-appendices/gma-appendix-a-machinations-reference.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-mechanics-advanced/05-appendices/gma-appendix-b-pattern-library.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-mechanics-advanced/05-appendices/gma-appendix-c-machinations-start.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 17 | game-mechanics-advanced/06-review/gma-official-final-review.mdx | §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.4 game-programmer-path（14 章 · 待修 14 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-programmer-path/00-gmp17-official-learning-map/gmp17-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-programmer-path/01-gmp17-00-programming-preschool/gmp17-00-programming-preschool.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-programmer-path/02-gmp17-01-computer-science/gmp17-01-computer-science.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-programmer-path/03-gmp17-02-programming-languages/gmp17-02-programming-languages.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-programmer-path/04-gmp17-03-software-development/gmp17-03-software-development.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-programmer-path/05-gmp17-04-game-mathematics/gmp17-04-game-mathematics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-programmer-path/06-gmp17-05-game-programming/gmp17-05-game-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-programmer-path/07-gmp17-06-game-engine-development/gmp17-06-game-engine-development.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-programmer-path/08-gmp17-07-computer-graphics/gmp17-07-computer-graphics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-programmer-path/09-gmp17-08-game-audio/gmp17-08-game-audio.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-programmer-path/10-gmp17-09-game-physics-animation/gmp17-09-game-physics-animation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-programmer-path/11-gmp17-10-game-ai/gmp17-10-game-ai.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-programmer-path/12-gmp17-11-multiplayer-programming/gmp17-11-multiplayer-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-programmer-path/13-gmp17-official-final-review/gmp17-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.5 multiplayer-game-architecture（14 章 · 待修 14 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | multiplayer-game-architecture/00-guide/mga-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | multiplayer-game-architecture/01-network-foundations/mga-01-network-basics.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | multiplayer-game-architecture/01-network-foundations/mga-02-io-multiplexing.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | multiplayer-game-architecture/02-framework-core/mga-03-threads-actor.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | multiplayer-game-architecture/02-framework-core/mga-04-account-login.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | multiplayer-game-architecture/02-framework-core/mga-05-performance-object-pool.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | multiplayer-game-architecture/02-framework-core/mga-06-ecs-framework.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | multiplayer-game-architecture/03-data-components/mga-07-mysql.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | multiplayer-game-architecture/03-data-components/mga-08-component-programming.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | multiplayer-game-architecture/04-distributed-runtime/mga-09-app-manager-http.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | multiplayer-game-architecture/04-distributed-runtime/mga-10-distributed-login-redis.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | multiplayer-game-architecture/04-distributed-runtime/mga-11-distributed-world-transfer.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | multiplayer-game-architecture/04-distributed-runtime/mga-12-disconnect-dynamic-system.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | multiplayer-game-architecture/05-review/mga-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.6 game-server-architecture（15 章 · 待修 15 章 · 30 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-server-architecture/00-guide/gsa-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-server-architecture/01-network-server/gsa-01-python-networking.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-server-architecture/01-network-server/gsa-02-communication-encryption.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-server-architecture/01-network-server/gsa-03-server-practice.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-server-architecture/02-storage-database/gsa-04-basic-storage.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-server-architecture/02-storage-database/gsa-05-storage-solutions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-server-architecture/03-architecture/gsa-06-game-server-foundations.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-server-architecture/03-architecture/gsa-07-server-interactions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-server-architecture/04-lobby-realtime/gsa-08-game-lobby.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-server-architecture/04-lobby-realtime/gsa-09-realtime-interaction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-server-architecture/04-lobby-realtime/gsa-10-ladder-economy.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-server-architecture/05-distributed-selection/gsa-11-capacity-client-optimization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-server-architecture/05-distributed-selection/gsa-12-distributed-servers.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-server-architecture/05-distributed-selection/gsa-appendix-language-comparison.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-server-architecture/06-review/gsa-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.7 game-engine-practice-vol1（16 章 · 待修 16 章 · 32 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-engine-practice-vol1/00-official-learning-map/gep1-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-engine-practice-vol1/01-front-matter/gep1-front-matter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-engine-practice-vol1/02-chapter-01-engine-conflict/gep1-chapter-01-engine-conflict.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-engine-practice-vol1/03-chapter-02-setting-sail/gep1-chapter-02-setting-sail.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-engine-practice-vol1/04-chapter-03-basic-system/gep1-chapter-03-basic-system.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-engine-practice-vol1/05-chapter-04-data-structures/gep1-chapter-04-data-structures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-engine-practice-vol1/06-chapter-05-math-library/gep1-chapter-05-math-library.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-engine-practice-vol1/07-chapter-06-initialization-destruction/gep1-chapter-06-initialization-destruction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-engine-practice-vol1/08-chapter-07-application-framework/gep1-chapter-07-application-framework.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-engine-practice-vol1/09-chapter-08-object-system/gep1-chapter-08-object-system.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-engine-practice-vol1/10-chapter-09-resource-management/gep1-chapter-09-resource-management.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-engine-practice-vol1/11-chapter-10-design-philosophy/gep1-chapter-10-design-philosophy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-engine-practice-vol1/12-chapter-11-scene-management/gep1-chapter-11-scene-management.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-engine-practice-vol1/13-chapter-12-models-textures/gep1-chapter-12-models-textures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-engine-practice-vol1/14-chapter-13-lod/gep1-chapter-13-lod.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-engine-practice-vol1/15-official-final-review/gep1-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.8 multiplayer-game-programming（16 章 · 待修 16 章 · 32 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | multiplayer-game-programming/00-guide/mgp-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | multiplayer-game-programming/01-foundations/mgp-01-overview-networked-games.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | multiplayer-game-programming/01-foundations/mgp-02-internet.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | multiplayer-game-programming/01-foundations/mgp-03-berkeley-sockets.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | multiplayer-game-programming/02-replication/mgp-04-object-serialization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | multiplayer-game-programming/02-replication/mgp-05-object-replication.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | multiplayer-game-programming/02-replication/mgp-06-network-topologies.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | multiplayer-game-programming/03-quality/mgp-07-latency-jitter-reliability.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | multiplayer-game-programming/03-quality/mgp-08-improved-latency-handling.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | multiplayer-game-programming/03-quality/mgp-09-scalability.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | multiplayer-game-programming/03-quality/mgp-10-security.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | multiplayer-game-programming/04-platform/mgp-11-real-world-engines.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | multiplayer-game-programming/04-platform/mgp-12-gamer-services.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | multiplayer-game-programming/04-platform/mgp-13-cloud-dedicated-servers.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | multiplayer-game-programming/05-appendix/mgp-appendix-modern-cpp.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | multiplayer-game-programming/06-review/mgp-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.9 game-engine-practice-vol2（17 章 · 待修 17 章 · 34 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-engine-practice-vol2/00-official-learning-map/gep2-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-engine-practice-vol2/01-front-matter/gep2-front-matter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-engine-practice-vol2/02-chapter-01-skeletal-skinning-basics/gep2-chapter-01-skeletal-skinning-basics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-engine-practice-vol2/03-chapter-02-animation-playback-slots/gep2-chapter-02-animation-playback-slots.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-engine-practice-vol2/04-chapter-03-animation-blending/gep2-chapter-03-animation-blending.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-engine-practice-vol2/05-chapter-04-morph-animation-blending/gep2-chapter-04-morph-animation-blending.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-engine-practice-vol2/06-chapter-05-ik-characters/gep2-chapter-05-ik-characters.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-engine-practice-vol2/07-chapter-06-lighting-rendering-history/gep2-chapter-06-lighting-rendering-history.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-engine-practice-vol2/08-chapter-07-renderer-interface/gep2-chapter-07-renderer-interface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-engine-practice-vol2/09-chapter-08-materials/gep2-chapter-08-materials.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-engine-practice-vol2/10-chapter-09-render-pipeline-architecture/gep2-chapter-09-render-pipeline-architecture.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-engine-practice-vol2/11-chapter-10-lighting-materials/gep2-chapter-10-lighting-materials.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-engine-practice-vol2/12-chapter-11-post-effects/gep2-chapter-11-post-effects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-engine-practice-vol2/13-chapter-12-shadows/gep2-chapter-12-shadows.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-engine-practice-vol2/14-chapter-13-multithreading/gep2-chapter-13-multithreading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-engine-practice-vol2/15-chapter-14-dynamic-buffers-profiler/gep2-chapter-14-dynamic-buffers-profiler.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | game-engine-practice-vol2/16-official-final-review/gep2-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.10 game-engine-architecture-3e（22 章 · 待修 22 章 · 44 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-engine-architecture-3e/00-official-learning-map/gea3-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-engine-architecture-3e/01-preface/gea3-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-engine-architecture-3e/02-chapter-01-introduction/gea3-chapter-01-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-engine-architecture-3e/03-chapter-02-tools-of-the-trade/gea3-chapter-02-tools-of-the-trade.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-engine-architecture-3e/04-chapter-03-software-engineering/gea3-chapter-03-software-engineering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-engine-architecture-3e/05-chapter-04-parallelism-concurrency/gea3-chapter-04-parallelism-concurrency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-engine-architecture-3e/06-chapter-05-3d-math/gea3-chapter-05-3d-math.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-engine-architecture-3e/07-chapter-06-engine-support/gea3-chapter-06-engine-support.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-engine-architecture-3e/08-chapter-07-resources-file-system/gea3-chapter-07-resources-file-system.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-engine-architecture-3e/09-chapter-08-game-loop/gea3-chapter-08-game-loop.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-engine-architecture-3e/10-chapter-09-human-interface/gea3-chapter-09-human-interface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-engine-architecture-3e/11-chapter-10-debugging-development/gea3-chapter-10-debugging-development.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-engine-architecture-3e/12-chapter-11-rendering-engine/gea3-chapter-11-rendering-engine.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-engine-architecture-3e/13-chapter-12-animation-systems/gea3-chapter-12-animation-systems.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-engine-architecture-3e/14-chapter-13-collision-rigid-body/gea3-chapter-13-collision-rigid-body.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-engine-architecture-3e/15-chapter-14-audio/gea3-chapter-14-audio.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | game-engine-architecture-3e/16-chapter-15-gameplay-introduction/gea3-chapter-15-gameplay-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | game-engine-architecture-3e/17-chapter-16-runtime-gameplay/gea3-chapter-16-runtime-gameplay.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | game-engine-architecture-3e/18-chapter-17-more/gea3-chapter-17-more.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | game-engine-architecture-3e/19-bibliography/gea3-bibliography.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | game-engine-architecture-3e/20-index/gea3-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | game-engine-architecture-3e/21-official-final-review/gea3-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.11 game-design-fundamentals（23 章 · 待修 23 章 · 46 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-design-fundamentals/00-gdf-3e-official-learning-map/gdf-3e-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-design-fundamentals/01-gdf-3e-introduction/gdf-3e-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-design-fundamentals/02-gdf-3e-01-games-video-games/gdf-3e-01-games-video-games.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-design-fundamentals/03-gdf-3e-02-designing-developing-games/gdf-3e-02-designing-developing-games.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-design-fundamentals/04-gdf-3e-03-major-genres/gdf-3e-03-major-genres.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-design-fundamentals/05-gdf-3e-04-understanding-player/gdf-3e-04-understanding-player.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-design-fundamentals/06-gdf-3e-05-understanding-machine/gdf-3e-05-understanding-machine.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-design-fundamentals/07-gdf-3e-06-making-money/gdf-3e-06-making-money.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-design-fundamentals/08-gdf-3e-07-game-concepts/gdf-3e-07-game-concepts.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-design-fundamentals/09-gdf-3e-08-game-worlds/gdf-3e-08-game-worlds.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-design-fundamentals/10-gdf-3e-09-creative-expressive-play/gdf-3e-09-creative-expressive-play.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-design-fundamentals/11-gdf-3e-10-character-development/gdf-3e-10-character-development.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-design-fundamentals/12-gdf-3e-11-storytelling/gdf-3e-11-storytelling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-design-fundamentals/13-gdf-3e-12-creating-user-experience/gdf-3e-12-creating-user-experience.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-design-fundamentals/14-gdf-3e-13-gameplay/gdf-3e-13-gameplay.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-design-fundamentals/15-gdf-3e-14-core-mechanics/gdf-3e-14-core-mechanics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | game-design-fundamentals/16-gdf-3e-15-game-balancing/gdf-3e-15-game-balancing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | game-design-fundamentals/17-gdf-3e-16-level-design/gdf-3e-16-level-design.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | game-design-fundamentals/18-gdf-3e-17-online-gaming/gdf-3e-17-online-gaming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | game-design-fundamentals/19-gdf-3e-glossary/gdf-3e-glossary.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | game-design-fundamentals/20-gdf-3e-references/gdf-3e-references.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | game-design-fundamentals/21-gdf-3e-index/gdf-3e-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | game-design-fundamentals/22-gdf-3e-official-final-review/gdf-3e-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.12 game-programming-patterns（29 章 · 待修 29 章 · 58 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-programming-patterns/00-official-learning-map/gpp-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-programming-patterns/01-acknowledgements/gpp-acknowledgements.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-programming-patterns/02-introduction/gpp-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-programming-patterns/03-chapter-01-architecture-performance-games/gpp-chapter-01-architecture-performance-games.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-programming-patterns/04-design-patterns-revisited/gpp-design-patterns-revisited.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-programming-patterns/05-chapter-02-command/gpp-chapter-02-command.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-programming-patterns/06-chapter-03-flyweight/gpp-chapter-03-flyweight.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-programming-patterns/07-chapter-04-observer/gpp-chapter-04-observer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-programming-patterns/08-chapter-05-prototype/gpp-chapter-05-prototype.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-programming-patterns/09-chapter-06-singleton/gpp-chapter-06-singleton.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-programming-patterns/10-chapter-07-state/gpp-chapter-07-state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-programming-patterns/11-sequencing-patterns/gpp-sequencing-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-programming-patterns/12-chapter-08-double-buffer/gpp-chapter-08-double-buffer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-programming-patterns/13-chapter-09-game-loop/gpp-chapter-09-game-loop.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-programming-patterns/14-chapter-10-update-method/gpp-chapter-10-update-method.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-programming-patterns/15-behavioral-patterns/gpp-behavioral-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | game-programming-patterns/16-chapter-11-bytecode/gpp-chapter-11-bytecode.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | game-programming-patterns/17-chapter-12-subclass-sandbox/gpp-chapter-12-subclass-sandbox.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | game-programming-patterns/18-chapter-13-type-object/gpp-chapter-13-type-object.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | game-programming-patterns/19-decoupling-patterns/gpp-decoupling-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | game-programming-patterns/20-chapter-14-component/gpp-chapter-14-component.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | game-programming-patterns/21-chapter-15-event-queue/gpp-chapter-15-event-queue.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | game-programming-patterns/22-chapter-16-service-locator/gpp-chapter-16-service-locator.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | game-programming-patterns/23-optimization-patterns/gpp-optimization-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | game-programming-patterns/24-chapter-17-data-locality/gpp-chapter-17-data-locality.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | game-programming-patterns/25-chapter-18-dirty-flag/gpp-chapter-18-dirty-flag.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | game-programming-patterns/26-chapter-19-object-pool/gpp-chapter-19-object-pool.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | game-programming-patterns/27-chapter-20-spatial-partition/gpp-chapter-20-spatial-partition.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | game-programming-patterns/28-official-final-review/gpp-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 12.13 game-math-3d（17 章 · 待修 17 章 · 102 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | game-math-3d/00-guide/gm3d-official-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | game-math-3d/01-coordinate-vector/gm3d-cartesian-coordinate-systems.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | game-math-3d/01-coordinate-vector/gm3d-multiple-coordinate-spaces.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | game-math-3d/01-coordinate-vector/gm3d-vectors.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | game-math-3d/02-matrices-transforms/gm3d-introduction-to-matrices.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | game-math-3d/02-matrices-transforms/gm3d-matrices-linear-transformations.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | game-math-3d/02-matrices-transforms/gm3d-more-on-matrices.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | game-math-3d/03-orientation-geometry/gm3d-geometric-primitives.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | game-math-3d/03-orientation-geometry/gm3d-polar-coordinate-systems.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | game-math-3d/03-orientation-geometry/gm3d-rotation-three-dimensions.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | game-math-3d/04-graphics-mechanics/gm3d-linear-kinematics-calculus.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | game-math-3d/04-graphics-mechanics/gm3d-linear-rotational-dynamics.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | game-math-3d/04-graphics-mechanics/gm3d-mathematical-topics-graphics.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | game-math-3d/05-curves-next/gm3d-afterword.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | game-math-3d/05-curves-next/gm3d-curves-in-3d.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | game-math-3d/06-appendix/gm3d-geometric-tests.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | game-math-3d/07-review/gm3d-official-final-review.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 13：Java/JVM 系列（7 本 · 160 章待修 · 514 项）

**系列状态**：待开始

### 13.1 deep-understanding-jvm（25 章 · 待修 25 章 · 50 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-understanding-jvm/00-duj3-official-learning-map/duj3-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | deep-understanding-jvm/01-duj3-part-1-approaching-java/duj3-part-1-approaching-java.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | deep-understanding-jvm/02-duj3-01-approaching-java/duj3-01-approaching-java.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | deep-understanding-jvm/03-duj3-part-2-memory-management/duj3-part-2-memory-management.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | deep-understanding-jvm/04-duj3-02-memory-areas/duj3-02-memory-areas.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | deep-understanding-jvm/05-duj3-03-gc-allocation/duj3-03-gc-allocation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | deep-understanding-jvm/06-duj3-04-monitoring-tools/duj3-04-monitoring-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | deep-understanding-jvm/07-duj3-05-tuning-cases/duj3-05-tuning-cases.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | deep-understanding-jvm/08-duj3-part-3-execution-subsystem/duj3-part-3-execution-subsystem.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | deep-understanding-jvm/09-duj3-06-class-file/duj3-06-class-file.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | deep-understanding-jvm/10-duj3-07-class-loading/duj3-07-class-loading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | deep-understanding-jvm/11-duj3-08-bytecode-engine/duj3-08-bytecode-engine.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | deep-understanding-jvm/12-duj3-09-loading-execution-cases/duj3-09-loading-execution-cases.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | deep-understanding-jvm/13-duj3-part-4-compilation/duj3-part-4-compilation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | deep-understanding-jvm/14-duj3-10-frontend-compiler/duj3-10-frontend-compiler.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | deep-understanding-jvm/15-duj3-11-backend-compiler/duj3-11-backend-compiler.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | deep-understanding-jvm/16-duj3-part-5-concurrency/duj3-part-5-concurrency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | deep-understanding-jvm/17-duj3-12-memory-model-threads/duj3-12-memory-model-threads.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | deep-understanding-jvm/18-duj3-13-thread-safety-locks/duj3-13-thread-safety-locks.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | deep-understanding-jvm/19-duj3-appendix-a-build-openjdk6/duj3-appendix-a-build-openjdk6.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | deep-understanding-jvm/20-duj3-appendix-b-java-future-2013/duj3-appendix-b-java-future-2013.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | deep-understanding-jvm/21-duj3-appendix-c-bytecode-table/duj3-appendix-c-bytecode-table.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | deep-understanding-jvm/22-duj3-appendix-d-oql/duj3-appendix-d-oql.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | deep-understanding-jvm/23-duj3-appendix-e-jdk-history/duj3-appendix-e-jdk-history.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | deep-understanding-jvm/24-duj3-official-final-review/duj3-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 13.2 spring-in-action（25 章 · 待修 25 章 · 50 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | spring-in-action/00-sia-6e-official-learning-map/sia-6e-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | spring-in-action/01-sia-6e-part-1-foundational-spring/sia-6e-part-1-foundational-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | spring-in-action/02-sia-6e-01-getting-started/sia-6e-01-getting-started.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | spring-in-action/03-sia-6e-02-developing-web-applications/sia-6e-02-developing-web-applications.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | spring-in-action/04-sia-6e-03-working-with-data/sia-6e-03-working-with-data.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | spring-in-action/05-sia-6e-04-nonrelational-data/sia-6e-04-nonrelational-data.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | spring-in-action/06-sia-6e-05-securing-spring/sia-6e-05-securing-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | spring-in-action/07-sia-6e-06-configuration-properties/sia-6e-06-configuration-properties.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | spring-in-action/08-sia-6e-part-2-integrated-spring/sia-6e-part-2-integrated-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | spring-in-action/09-sia-6e-07-creating-rest-services/sia-6e-07-creating-rest-services.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | spring-in-action/10-sia-6e-08-securing-rest/sia-6e-08-securing-rest.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | spring-in-action/11-sia-6e-09-asynchronous-messaging/sia-6e-09-asynchronous-messaging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | spring-in-action/12-sia-6e-10-integrating-spring/sia-6e-10-integrating-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | spring-in-action/13-sia-6e-part-3-reactive-spring/sia-6e-part-3-reactive-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | spring-in-action/14-sia-6e-11-introducing-reactor/sia-6e-11-introducing-reactor.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | spring-in-action/15-sia-6e-12-reactive-apis/sia-6e-12-reactive-apis.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | spring-in-action/16-sia-6e-13-reactive-persistence/sia-6e-13-reactive-persistence.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | spring-in-action/17-sia-6e-14-working-with-rsocket/sia-6e-14-working-with-rsocket.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | spring-in-action/18-sia-6e-part-4-deployed-spring/sia-6e-part-4-deployed-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | spring-in-action/19-sia-6e-15-spring-boot-actuator/sia-6e-15-spring-boot-actuator.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | spring-in-action/20-sia-6e-16-administering-spring/sia-6e-16-administering-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | spring-in-action/21-sia-6e-17-monitoring-with-jmx/sia-6e-17-monitoring-with-jmx.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | spring-in-action/22-sia-6e-18-deploying-spring/sia-6e-18-deploying-spring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | spring-in-action/23-sia-6e-appendix-bootstrapping/sia-6e-appendix-bootstrapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | spring-in-action/24-sia-6e-official-final-review/sia-6e-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 13.3 jvm-troubleshooting（26 章 · 待修 26 章 · 52 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | jvm-troubleshooting/00-jvt-2e-official-learning-map/jvt-2e-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | jvm-troubleshooting/01-jvt-2e-part-1-foundation/jvt-2e-part-1-foundation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | jvm-troubleshooting/02-jvt-2e-01-starting-to-know-apps/jvt-2e-01-starting-to-know-apps.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | jvm-troubleshooting/03-jvt-2e-02-debugging-techniques/jvt-2e-02-debugging-techniques.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | jvm-troubleshooting/04-jvt-2e-03-advanced-debugging/jvt-2e-03-advanced-debugging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | jvm-troubleshooting/05-jvt-2e-04-logs-auditing/jvt-2e-04-logs-auditing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | jvm-troubleshooting/06-jvt-2e-part-2-deep-diagnosing/jvt-2e-part-2-deep-diagnosing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | jvm-troubleshooting/07-jvt-2e-05-resource-profiling/jvt-2e-05-resource-profiling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | jvm-troubleshooting/08-jvt-2e-06-hidden-profiling/jvt-2e-06-hidden-profiling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | jvm-troubleshooting/09-jvt-2e-07-thread-locks/jvt-2e-07-thread-locks.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | jvm-troubleshooting/10-jvt-2e-08-deadlocks-thread-dumps/jvt-2e-08-deadlocks-thread-dumps.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | jvm-troubleshooting/11-jvt-2e-part-3-memory/jvt-2e-part-3-memory.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | jvm-troubleshooting/12-jvt-2e-09-memory-profiling/jvt-2e-09-memory-profiling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | jvm-troubleshooting/13-jvt-2e-10-heap-dumps/jvt-2e-10-heap-dumps.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | jvm-troubleshooting/14-jvt-2e-11-gc-logs/jvt-2e-11-gc-logs.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | jvm-troubleshooting/15-jvt-2e-part-4-large-systems/jvt-2e-part-4-large-systems.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | jvm-troubleshooting/16-jvt-2e-12-system-failures/jvt-2e-12-system-failures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | jvm-troubleshooting/17-jvt-2e-13-consistency-transactions/jvt-2e-13-consistency-transactions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | jvm-troubleshooting/18-jvt-2e-appendices/jvt-2e-appendices.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | jvm-troubleshooting/19-jvt-2e-appendix-a-tools/jvt-2e-appendix-a-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | jvm-troubleshooting/20-jvt-2e-appendix-b-opening-project/jvt-2e-appendix-b-opening-project.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | jvm-troubleshooting/21-jvt-2e-appendix-c-reading/jvt-2e-appendix-c-reading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | jvm-troubleshooting/22-jvt-2e-appendix-d-threads/jvt-2e-appendix-d-threads.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | jvm-troubleshooting/23-jvt-2e-appendix-e-memory/jvt-2e-appendix-e-memory.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | jvm-troubleshooting/24-jvt-2e-appendix-f-references/jvt-2e-appendix-f-references.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | jvm-troubleshooting/25-jvt-2e-official-final-review/jvt-2e-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 13.4 java-core-tech（27 章 · 待修 27 章 · 54 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | java-core-tech/00-jct-14e-official-learning-map/jct-14e-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | java-core-tech/01-jct-14e-v1-01-introduction-java/jct-14e-v1-01-introduction-java.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | java-core-tech/02-jct-14e-v1-02-programming-environment/jct-14e-v1-02-programming-environment.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | java-core-tech/03-jct-14e-v1-03-fundamental-structures/jct-14e-v1-03-fundamental-structures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | java-core-tech/04-jct-14e-v1-04-objects-classes/jct-14e-v1-04-objects-classes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | java-core-tech/05-jct-14e-v1-05-inheritance/jct-14e-v1-05-inheritance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | java-core-tech/06-jct-14e-v1-06-interfaces-lambdas-inner/jct-14e-v1-06-interfaces-lambdas-inner.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | java-core-tech/07-jct-14e-v1-07-exceptions-assertions-logging/jct-14e-v1-07-exceptions-assertions-logging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | java-core-tech/08-jct-14e-v1-08-generic-programming/jct-14e-v1-08-generic-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | java-core-tech/09-jct-14e-v1-09-collections/jct-14e-v1-09-collections.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | java-core-tech/10-jct-14e-v1-10-concurrency/jct-14e-v1-10-concurrency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | java-core-tech/11-jct-14e-v1-11-annotations/jct-14e-v1-11-annotations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | java-core-tech/12-jct-14e-v1-12-modules/jct-14e-v1-12-modules.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | java-core-tech/13-jct-14e-v2-01-streams/jct-14e-v2-01-streams.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | java-core-tech/14-jct-14e-v2-02-input-output/jct-14e-v2-02-input-output.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | java-core-tech/15-jct-14e-v2-03-xml/jct-14e-v2-03-xml.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | java-core-tech/16-jct-14e-v2-04-networking/jct-14e-v2-04-networking.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | java-core-tech/17-jct-14e-v2-05-database/jct-14e-v2-05-database.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | java-core-tech/18-jct-14e-v2-06-date-time/jct-14e-v2-06-date-time.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | java-core-tech/19-jct-14e-v2-07-internationalization/jct-14e-v2-07-internationalization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | java-core-tech/20-jct-14e-v2-08-compiling-scripting/jct-14e-v2-08-compiling-scripting.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | java-core-tech/21-jct-14e-v2-09-security/jct-14e-v2-09-security.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | java-core-tech/22-jct-14e-v2-10-gui-programming/jct-14e-v2-10-gui-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | java-core-tech/23-jct-14e-v2-11-swing-components/jct-14e-v2-11-swing-components.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | java-core-tech/24-jct-14e-v2-12-advanced-swing-graphics/jct-14e-v2-12-advanced-swing-graphics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | java-core-tech/25-jct-14e-v2-13-foreign-functions-memory/jct-14e-v2-13-foreign-functions-memory.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | java-core-tech/26-jct-14e-official-final-review/jct-14e-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 13.5 jvm-g1-tuning（17 章 · 待修 17 章 · 68 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | jvm-g1-tuning/00-jg1b-official-learning-map/jg1b-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | jvm-g1-tuning/01-jg1b-01-gc-overview/jg1b-01-gc-overview.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | jvm-g1-tuning/02-jg1b-02-g1-basics/jg1b-02-g1-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | jvm-g1-tuning/03-jg1b-03-object-allocation/jg1b-03-object-allocation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | jvm-g1-tuning/04-jg1b-04-refine-thread/jg1b-04-refine-thread.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | jvm-g1-tuning/05-jg1b-05-young-gc/jg1b-05-young-gc.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | jvm-g1-tuning/06-jg1b-06-mixed-gc/jg1b-06-mixed-gc.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | jvm-g1-tuning/07-jg1b-07-full-gc/jg1b-07-full-gc.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | jvm-g1-tuning/08-jg1b-08-reference-processing/jg1b-08-reference-processing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | jvm-g1-tuning/09-jg1b-09-string-dedup/jg1b-09-string-dedup.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | jvm-g1-tuning/10-jg1b-10-safepoints/jg1b-10-safepoints.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | jvm-g1-tuning/11-jg1b-11-collector-choice/jg1b-11-collector-choice.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | jvm-g1-tuning/12-jg1b-12-next-collectors/jg1b-12-next-collectors.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | jvm-g1-tuning/13-jg1b-appendix-a-debug-jvm/jg1b-appendix-a-debug-jvm.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | jvm-g1-tuning/14-jg1b-appendix-b-nmt/jg1b-appendix-b-nmt.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | jvm-g1-tuning/15-jg1b-appendix-c-cpp/jg1b-appendix-c-cpp.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | jvm-g1-tuning/16-jg1b-official-final-review/jg1b-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 13.6 effective-java（17 章 · 待修 17 章 · 102 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | effective-java/00-ejv-3e-official-learning-map/ejv-3e-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | effective-java/01-ejv-3e-01-introduction/ejv-3e-01-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | effective-java/02-ejv-3e-02-creating-destroying-objects/ejv-3e-02-creating-destroying-objects.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | effective-java/03-ejv-3e-03-common-object-methods/ejv-3e-03-common-object-methods.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | effective-java/04-ejv-3e-04-classes-interfaces/ejv-3e-04-classes-interfaces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | effective-java/05-ejv-3e-05-generics/ejv-3e-05-generics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | effective-java/06-ejv-3e-06-enums-annotations/ejv-3e-06-enums-annotations.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | effective-java/07-ejv-3e-07-lambdas-streams/ejv-3e-07-lambdas-streams.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | effective-java/08-ejv-3e-08-methods/ejv-3e-08-methods.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | effective-java/09-ejv-3e-09-general-programming/ejv-3e-09-general-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | effective-java/10-ejv-3e-10-exceptions/ejv-3e-10-exceptions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | effective-java/11-ejv-3e-11-concurrency/ejv-3e-11-concurrency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | effective-java/12-ejv-3e-12-serialization/ejv-3e-12-serialization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | effective-java/13-ejv-3e-second-edition-crosswalk/ejv-3e-second-edition-crosswalk.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | effective-java/14-ejv-3e-references/ejv-3e-references.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | effective-java/15-ejv-3e-index/ejv-3e-index.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | effective-java/16-ejv-3e-official-final-review/ejv-3e-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 13.7 head-first-java（23 章 · 待修 23 章 · 138 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | head-first-java/00-hfj-3e-official-learning-map/hfj-3e-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | head-first-java/01-hfj-3e-intro/hfj-3e-intro.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | head-first-java/02-hfj-3e-01-breaking-surface/hfj-3e-01-breaking-surface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | head-first-java/03-hfj-3e-02-classes-objects/hfj-3e-02-classes-objects.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | head-first-java/04-hfj-3e-03-primitives-references/hfj-3e-03-primitives-references.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | head-first-java/05-hfj-3e-04-methods-instance-variables/hfj-3e-04-methods-instance-variables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | head-first-java/06-hfj-3e-05-writing-program/hfj-3e-05-writing-program.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | head-first-java/07-hfj-3e-06-java-api/hfj-3e-06-java-api.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | head-first-java/08-hfj-3e-07-inheritance-polymorphism/hfj-3e-07-inheritance-polymorphism.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | head-first-java/09-hfj-3e-08-interfaces-abstract-classes/hfj-3e-08-interfaces-abstract-classes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | head-first-java/10-hfj-3e-09-constructors-gc/hfj-3e-09-constructors-gc.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | head-first-java/11-hfj-3e-10-numbers-statics/hfj-3e-10-numbers-statics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | head-first-java/12-hfj-3e-11-collections-generics/hfj-3e-11-collections-generics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | head-first-java/13-hfj-3e-12-lambdas-streams/hfj-3e-12-lambdas-streams.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | head-first-java/14-hfj-3e-13-exceptions/hfj-3e-13-exceptions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | head-first-java/15-hfj-3e-14-gui/hfj-3e-14-gui.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | head-first-java/16-hfj-3e-15-swing/hfj-3e-15-swing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | head-first-java/17-hfj-3e-16-serialization-io/hfj-3e-16-serialization-io.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | head-first-java/18-hfj-3e-17-networking-threads/hfj-3e-17-networking-threads.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | head-first-java/19-hfj-3e-18-concurrency-issues/hfj-3e-18-concurrency-issues.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 21 | head-first-java/20-hfj-3e-appendix-a-final-code-kitchen/hfj-3e-appendix-a-final-code-kitchen.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 22 | head-first-java/21-hfj-3e-appendix-b-top-ten-topics/hfj-3e-appendix-b-top-ten-topics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 23 | head-first-java/22-hfj-3e-official-final-review/hfj-3e-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 14：Unity 系列（19 本 · 311 章待修 · 639 项）

**系列状态**：待开始

### 14.1 unity-animation（9 章 · 待修 9 章 · 9 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-animation/00-guide/uan-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | unity-animation/01-foundations-2d/uan-01-animation-fundamentals.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | unity-animation/01-foundations-2d/uan-02-sprite-animation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | unity-animation/02-native-mecanim/uan-03-native-animation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | unity-animation/02-native-mecanim/uan-04-noncharacter-animation-mecanim.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | unity-animation/03-character/uan-05-character-animation-fundamentals.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | unity-animation/03-character/uan-06-advanced-character-animation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | unity-animation/04-advanced-media/uan-07-blend-shapes-ik-movie-textures.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | unity-animation/05-review/uan-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 14.2 unity-ui-design（9 章 · 待修 9 章 · 9 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-ui-design/00-guide/uid-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | unity-ui-design/01-foundations/uid-01-looking-back-looking-forward.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | unity-ui-design/01-foundations/uid-02-building-layouts.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | unity-ui-design/02-controls/uid-03-control-control.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | unity-ui-design/02-controls/uid-04-anchors-away.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | unity-ui-design/03-space-source/uid-05-screen-world-camera.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | unity-ui-design/03-space-source/uid-06-working-with-ui-source.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | unity-ui-design/03-space-source/uid-appendix-3d-scene-sample.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | unity-ui-design/04-review/uid-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 14.3 unity-advanced-programming（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-advanced-programming/00-guide/u3ap-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | unity-advanced-programming/01-language-architecture/u3ap-01-csharp-key-techniques.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | unity-advanced-programming/01-language-architecture/u3ap-02-architecture.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | unity-advanced-programming/02-data-ui/u3ap-03-data-tables.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | unity-advanced-programming/02-data-ui/u3ap-04-ui.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | unity-advanced-programming/03-assets-network/u3ap-05-models-animation.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | unity-advanced-programming/03-assets-network/u3ap-06-network-layer.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | unity-advanced-programming/04-rendering-ai/u3ap-07-rendering-graphics.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | unity-advanced-programming/04-rendering-ai/u3ap-08-ai.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | unity-advanced-programming/05-navigation/u3ap-10-map-pathfinding.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | unity-advanced-programming/06-review/u3ap-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 14.4 unity-vfx（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-vfx/00-guide/uvf-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | unity-vfx/01-foundations/uvf-01-unity3d-engine-overview.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | unity-vfx/01-foundations/uvf-02-vfx-foundations.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | unity-vfx/02-workflow/uvf-03-unity3d-foundations.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | unity-vfx/03-scene-max/uvf-04-scene-fire-snow.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | unity-vfx/03-scene-max/uvf-05-unity-max-weapon-buff-slash.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | unity-vfx/04-particle-cases/uvf-06-particle-hit-projectile-ui.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | unity-vfx/05-attack-cases/uvf-07-physical-attacks.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | unity-vfx/05-attack-cases/uvf-08-magic-attacks.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | unity-vfx/06-common-skills/uvf-09-common-skills.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | unity-vfx/07-review/uvf-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 14.5 unity-scripting-game-dev（15 章 · 待修 15 章 · 15 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-scripting-game-dev/00-guide/usg-official-learning-map.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-scripting-game-dev/01-script-physics/usg-01-script-overview.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-scripting-game-dev/01-script-physics/usg-02-concepts-scripting-shooter.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-scripting-game-dev/01-script-physics/usg-03-physics-system.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-scripting-game-dev/02-math-ui/usg-04-game-math.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-scripting-game-dev/02-math-ui/usg-05-ui-system.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-scripting-game-dev/03-presentation/usg-06-animation-system.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-scripting-game-dev/03-presentation/usg-07-effects.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-scripting-game-dev/03-presentation/usg-08-audio.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-scripting-game-dev/04-resource-data/usg-09-resource-management.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-scripting-game-dev/04-resource-data/usg-10-save-load.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-scripting-game-dev/05-ai-project/usg-11-game-ai.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-scripting-game-dev/05-ai-project/usg-12-secret-commandos.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-scripting-game-dev/06-advanced/usg-13-advanced-programming.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-scripting-game-dev/07-review/usg-official-final-review.mdx | §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.6 unity5（18 章 · 待修 18 章 · 18 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity5/00-guide/u5-official-learning-map.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity5/01-foundations/u5-01-unity5-introduction.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity5/01-foundations/u5-02-project-preparation.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity5/01-foundations/u5-03-game-scene.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity5/02-character-combat/u5-04-player-character.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity5/02-character-combat/u5-05-projectile-effects.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity5/02-character-combat/u5-06-enemy-character.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity5/03-ui-architecture/u5-07-unity-ui.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity5/03-ui-architecture/u5-08-game-manager.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity5/04-world-systems/u5-09-raycasting.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity5/04-world-systems/u5-10-navigation-advanced.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity5/04-world-systems/u5-11-lightmaps-light-probes.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity5/04-world-systems/u5-12-scene-split-merge.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity5/05-built-in-network/u5-13-built-in-networking.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity5/06-photon/u5-14-photon-cloud.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity5/07-realism-data/u5-15-game-realism.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 17 | unity5/07-realism-data/u5-appendix-database.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 18 | unity5/08-review/u5-official-final-review.mdx | §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.7 profiling-unity-games（15 章 · 待修 15 章 · 19 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | profiling-unity-games/00-guide/prof-official-learning-map.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 2 | profiling-unity-games/01-foundations/prof-01-profiling-101.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 3 | profiling-unity-games/01-foundations/prof-02-profiling-workflow.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 4 | profiling-unity-games/02-bottlenecks/prof-03-cpu-render-worker-bounds.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 5 | profiling-unity-games/02-bottlenecks/prof-04-gpu-mobile-power.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 6 | profiling-unity-games/03-memory/prof-05-memory-budget-profiling.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 7 | profiling-unity-games/04-unity-tools/prof-06-unity-profiler.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 8 | profiling-unity-games/04-unity-tools/prof-07-profile-analyzer.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 9 | profiling-unity-games/04-unity-tools/prof-08-memory-profiler.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 10 | profiling-unity-games/05-render-audit/prof-09-frame-rendering-debuggers.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 11 | profiling-unity-games/06-deep-automation/prof-10-project-auditor-deep-profiling.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | profiling-unity-games/06-deep-automation/prof-11-tool-selection-automation.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 13 | profiling-unity-games/07-platform/prof-12-native-tool-index.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 14 | profiling-unity-games/07-platform/prof-13-gpu-tools-resources.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 15 | profiling-unity-games/08-review/prof-official-final-review.mdx | §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.8 unity-scripting（12 章 · 待修 12 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-scripting/00-guide/usc-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-scripting/01-language-debug/usc-01-unity-csharp-refresher.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-scripting/01-language-debug/usc-02-debugging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-scripting/02-world-events/usc-03-singletons-statics-gameobjects-world.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-scripting/02-world-events/usc-04-event-driven-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-scripting/03-render-data/usc-05-cameras-rendering-scenes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-scripting/03-render-data/usc-06-working-with-mono.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-scripting/04-ai-editor/usc-07-artificial-intelligence.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-scripting/04-ai-editor/usc-08-customizing-unity-editor.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-scripting/05-assets-delivery/usc-09-textures-models-2d.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-scripting/05-assets-delivery/usc-10-source-control-other-tips.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-scripting/06-review/usc-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.9 unity-game-cases（13 章 · 待修 13 章 · 26 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-game-cases/00-guide/ugc-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-game-cases/01-foundation/ugc-01-unity3d-foundation-environment.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-game-cases/02-physics-cases/ugc-02-3d-billiards.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-game-cases/02-physics-cases/ugc-03-3d-maze-box.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-game-cases/03-touch-action/ugc-04-crossing-meridian.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-game-cases/03-touch-action/ugc-05-tomb-coin-pusher.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-game-cases/03-touch-action/ugc-06-coke-cans.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-game-cases/03-touch-action/ugc-07-tank-battle.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-game-cases/04-runner-vehicles/ugc-08-dog-runner.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-game-cases/04-runner-vehicles/ugc-09-3d-virtual-parking.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-game-cases/05-flight-racing/ugc-10-save-mushroom-village.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-game-cases/05-flight-racing/ugc-11-baina-racing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-game-cases/06-review/ugc-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.10 unity-screen-effects（13 章 · 待修 13 章 · 26 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-screen-effects/00-guide/usf-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-screen-effects/01-surface/usf-01-diffuse-shading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-screen-effects/01-surface/usf-02-texture-effects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-screen-effects/01-surface/usf-03-specular-reflection.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-screen-effects/01-surface/usf-04-shader-reflections.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-screen-effects/02-models/usf-05-custom-lighting-models.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-screen-effects/02-models/usf-06-transparency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-screen-effects/02-models/usf-07-vertex-magic.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-screen-effects/03-engineering/usf-08-mobile-shader-optimization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-screen-effects/03-engineering/usf-09-cginclude-modularity.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-screen-effects/04-screen/usf-10-rendertexture-screen-effects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-screen-effects/04-screen/usf-11-gameplay-screen-effects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-screen-effects/05-review/usf-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.11 unity-game-optimization（12 章 · 待修 12 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-game-optimization/00-guide/ugo-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-game-optimization/05-review/ugo-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-game-optimization/advanced-optimizations/data-oriented-technology-stack.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | unity-game-optimization/advanced-optimizations/memory-management.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | unity-game-optimization/advanced-optimizations/tactical-tips-and-tricks.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | unity-game-optimization/advanced-optimizations/xr-optimizations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | unity-game-optimization/base-scripting/evaluating-performance-problems.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | unity-game-optimization/base-scripting/scripting-strategies.mdx | §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | unity-game-optimization/graphical-optimizations/benefits-of-batching.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | unity-game-optimization/graphical-optimizations/dynamic-graphics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | unity-game-optimization/graphical-optimizations/faster-physics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | unity-game-optimization/graphical-optimizations/optimizing-art-assets.mdx | §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 14.12 unity-core-tech（16 章 · 待修 16 章 · 32 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-core-tech/00-guide/uct-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-core-tech/01-math/uct-01-3d-math-unity.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-core-tech/02-runtime-data/uct-02-avatar-outfit-system.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-core-tech/02-runtime-data/uct-03-message-event-encapsulation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-core-tech/02-runtime-data/uct-04-protobuf-in-games.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-core-tech/02-runtime-data/uct-05-text-file-encryption.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-core-tech/03-ai-effects/uct-06-behavior-trees.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-core-tech/03-ai-effects/uct-07-afterimage.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-core-tech/03-ai-effects/uct-08-mobile-realtime-shadows.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-core-tech/03-ai-effects/uct-09-mobile-ocean-simulation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-core-tech/04-architecture/uct-10-mvc-architecture.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-core-tech/04-architecture/uct-11-fsm-in-games.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-core-tech/05-delivery/uct-12-mobile-hot-update.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-core-tech/05-delivery/uct-13-mobile-shader-techniques.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-core-tech/05-delivery/uct-14-game-development-experience.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity-core-tech/06-review/uct-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.13 unity-shader-essentials（22 章 · 待修 22 章 · 44 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-shader-essentials/00-guide/useb-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-shader-essentials/01-foundations/useb-01-welcome-shader-world.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-shader-essentials/01-foundations/useb-02-rendering-pipeline.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-shader-essentials/01-foundations/useb-03-unity-shader-basics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-shader-essentials/01-foundations/useb-04-shader-mathematics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-shader-essentials/02-beginner/useb-05-first-unity-shader.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-shader-essentials/02-beginner/useb-06-basic-lighting.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-shader-essentials/02-beginner/useb-07-basic-textures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-shader-essentials/02-beginner/useb-08-transparency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-shader-essentials/03-intermediate/useb-09-complex-lighting.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-shader-essentials/03-intermediate/useb-10-advanced-textures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-shader-essentials/03-intermediate/useb-11-animated-image.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-shader-essentials/04-advanced/useb-12-screen-post-effects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-shader-essentials/04-advanced/useb-13-depth-normal-textures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-shader-essentials/04-advanced/useb-14-non-photorealistic-rendering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity-shader-essentials/04-advanced/useb-15-noise.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unity-shader-essentials/04-advanced/useb-16-rendering-optimization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unity-shader-essentials/05-extension/useb-17-surface-shader.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unity-shader-essentials/05-extension/useb-18-physically-based-rendering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unity-shader-essentials/05-extension/useb-19-unity5-changes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unity-shader-essentials/05-extension/useb-20-more-to-learn.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unity-shader-essentials/06-review/useb-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.14 unity-urp-shaders（23 章 · 待修 23 章 · 46 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-urp-shaders/00-guide/uus-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-urp-shaders/01-foundation/uus-01-package-topology.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-urp-shaders/01-foundation/uus-02-shaderlab-pass-contract.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-urp-shaders/02-lit/uus-03-lit-input-material.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-urp-shaders/02-lit/uus-04-brdf-surface-data.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-urp-shaders/02-lit/uus-05-lit-forward-pass.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-urp-shaders/02-lit/uus-06-lit-gbuffer-pass.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-urp-shaders/02-lit/uus-07-shared-utility-passes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-urp-shaders/03-models/uus-08-simple-lit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-urp-shaders/03-models/uus-09-complex-lit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-urp-shaders/03-models/uus-10-baked-lit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-urp-shaders/03-models/uus-11-unlit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-urp-shaders/03-models/uus-12-particle-family.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-urp-shaders/04-special/uus-13-terrain-family.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-urp-shaders/04-special/uus-14-nature-speedtree.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity-urp-shaders/04-special/uus-15-renderer-2d.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unity-urp-shaders/04-special/uus-16-decal-dbuffer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unity-urp-shaders/04-special/uus-17-postprocess-fullscreen.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unity-urp-shaders/05-library/uus-18-core-input-transforms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unity-urp-shaders/05-library/uus-19-lighting-realtime-gi.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unity-urp-shaders/05-library/uus-20-shadows-ao-screen-inputs.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unity-urp-shaders/06-engineering/uus-21-variants-batching-xr-debug.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | unity-urp-shaders/07-review/uus-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.15 unity-cpp-network-game（24 章 · 待修 24 章 · 47 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-cpp-network-game/00-guide/ucn-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-cpp-network-game/01-unity-basics/ucn-01-unity-environment.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-cpp-network-game/01-unity-basics/ucn-02-hello-simulation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-cpp-network-game/01-unity-basics/ucn-03-csharp-language.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-cpp-network-game/01-unity-basics/ucn-04-graphics-in-unity.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-cpp-network-game/01-unity-basics/ucn-05-unity-editor.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-cpp-network-game/02-unity-practice/ucn-06-simulation-architecture.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-cpp-network-game/02-unity-practice/ucn-07-character-development.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-cpp-network-game/02-unity-practice/ucn-08-scene-development.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-cpp-network-game/02-unity-practice/ucn-09-assets-interactions.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-cpp-network-game/02-unity-practice/ucn-10-ngui-interaction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-cpp-network-game/03-cpp-network-basics/ucn-11-cpp-language.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-cpp-network-game/03-cpp-network-basics/ucn-12-cpp-network-basics.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-cpp-network-game/03-cpp-network-basics/ucn-13-threading-async-socket.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-cpp-network-game/03-cpp-network-basics/ucn-14-mysql.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity-cpp-network-game/03-cpp-network-basics/ucn-15-protobuf.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unity-cpp-network-game/04-cpp-network-practice/ucn-16-server-topology.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unity-cpp-network-game/04-cpp-network-practice/ucn-17-login-server.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unity-cpp-network-game/04-cpp-network-practice/ucn-18-gate-server.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unity-cpp-network-game/04-cpp-network-practice/ucn-19-center-server.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unity-cpp-network-game/04-cpp-network-practice/ucn-20-battle-server.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unity-cpp-network-game/04-cpp-network-practice/ucn-21-hla-ai.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 23 | unity-cpp-network-game/05-review/ucn-afterword-career-development.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 24 | unity-cpp-network-game/05-review/ucn-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.16 unity-hmi（25 章 · 待修 25 章 · 50 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-hmi/00-uhm-2024-official-learning-map/uhm-2024-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-hmi/01-uhm-2024-slide-01-cover/uhm-2024-slide-01-cover.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-hmi/02-uhm-2024-slide-02-new-chapter/uhm-2024-slide-02-new-chapter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-hmi/03-uhm-2024-slide-03-made-with-unity/uhm-2024-slide-03-made-with-unity.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-hmi/04-uhm-2024-slide-04-production-evidence/uhm-2024-slide-04-production-evidence.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-hmi/05-uhm-2024-slide-05-beijing-auto-show/uhm-2024-slide-05-beijing-auto-show.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-hmi/06-uhm-2024-slide-06-model-performance-budget/uhm-2024-slide-06-model-performance-budget.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-hmi/07-uhm-2024-slide-07-soc-os-compatibility/uhm-2024-slide-07-soc-os-compatibility.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-hmi/08-uhm-2024-slide-08-architecture-combinations/uhm-2024-slide-08-architecture-combinations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-hmi/09-uhm-2024-slide-09-ecosystem/uhm-2024-slide-09-ecosystem.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-hmi/10-uhm-2024-slide-10-head-unit-edition/uhm-2024-slide-10-head-unit-edition.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-hmi/11-uhm-2024-slide-11-tuanjie-head-unit/uhm-2024-slide-11-tuanjie-head-unit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-hmi/12-uhm-2024-slide-12-qnx-support/uhm-2024-slide-12-qnx-support.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-hmi/13-uhm-2024-slide-13-embedded-linux-support/uhm-2024-slide-13-embedded-linux-support.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-hmi/14-uhm-2024-slide-14-tuanjie-engine/uhm-2024-slide-14-tuanjie-engine.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity-hmi/15-uhm-2024-slide-15-uras-architecture/uhm-2024-slide-15-uras-architecture.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unity-hmi/16-uhm-2024-slide-16-uras-unified-rendering/uhm-2024-slide-16-uras-unified-rendering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unity-hmi/17-uhm-2024-slide-17-uras-view-isolation/uhm-2024-slide-17-uras-view-isolation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unity-hmi/18-uhm-2024-slide-18-unity-china/uhm-2024-slide-18-unity-china.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unity-hmi/19-uhm-2024-slide-19-timeline/uhm-2024-slide-19-timeline.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unity-hmi/20-uhm-2024-slide-20-capability-foundation/uhm-2024-slide-20-capability-foundation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unity-hmi/21-uhm-2024-slide-21-service-model/uhm-2024-slide-21-service-model.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | unity-hmi/22-uhm-2024-slide-22-innovation-scenarios/uhm-2024-slide-22-innovation-scenarios.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | unity-hmi/23-uhm-2024-slide-23-evidence-closure/uhm-2024-slide-23-evidence-closure.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | unity-hmi/24-uhm-2024-official-final-review/uhm-2024-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.17 unity-master（14 章 · 待修 14 章 · 70 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-master/00-guide/ums-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-master/01-orientation/ums-00-prologue-creative-space.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-master/02-world/ums-01-creating-the-world.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-master/02-world/ums-02-thinking-and-structure.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-master/03-assets/ums-03-world-composition.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-master/04-scripting/ums-04-scripting-foundations.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-master/05-animation-ui/ums-05-animation-and-characters.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-master/05-animation-ui/ums-06-gui-and-audio.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-master/06-output-expansion/ums-07-build-and-output.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-master/06-output-expansion/ums-08-unity-possibilities.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-master/07-visual-scripting/ums-09-playmaker-visual-scripting.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-master/08-optimization/ums-10-optimization-and-pro.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-master/09-appendix/ums-appendix-tools-assets.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-master/10-review/ums-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.18 unity-shaderlab（35 章 · 待修 35 章 · 70 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-shaderlab/00-guide/usl-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-shaderlab/01-foundations/usl-01-shader-concept.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-shaderlab/01-foundations/usl-02-unity-shader-forms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-shaderlab/01-foundations/usl-03-coordinate-spaces.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-shaderlab/01-foundations/usl-04-basic-lighting-models.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-shaderlab/02-lighting/usl-05-first-executed-pass.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-shaderlab/02-lighting/usl-06-vertexlit-path.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-shaderlab/02-lighting/usl-07-forward-path.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-shaderlab/02-lighting/usl-08-baked-lightmaps.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-shaderlab/02-lighting/usl-09-light-probes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-shaderlab/03-shadows/usl-10-planar-shadows.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-shaderlab/03-shadows/usl-11-spherical-shadows.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-shaderlab/03-shadows/usl-12-volume-shadows.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-shaderlab/03-shadows/usl-13-shadow-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | unity-shaderlab/03-shadows/usl-14-built-in-shadows.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | unity-shaderlab/04-shaders/usl-15-pass-state-commands.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | unity-shaderlab/04-shaders/usl-16-fixed-function-pipeline.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | unity-shaderlab/04-shaders/usl-17-surface-shader.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | unity-shaderlab/05-effects/usl-18-bump-material.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | unity-shaderlab/05-effects/usl-19-toon-material.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | unity-shaderlab/05-effects/usl-20-mirror-material.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | unity-shaderlab/05-effects/usl-21-translucent-material.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | unity-shaderlab/05-effects/usl-22-volumetric-fog.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | unity-shaderlab/05-effects/usl-23-wrap-model.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | unity-shaderlab/05-effects/usl-24-area-light.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | unity-shaderlab/05-effects/usl-25-volumetric-light.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | unity-shaderlab/06-scenes/usl-26-replacement-rendering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | unity-shaderlab/06-scenes/usl-27-post-effects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | unity-shaderlab/06-scenes/usl-28-terrain.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | unity-shaderlab/06-scenes/usl-29-projection.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | unity-shaderlab/07-optimization/usl-30-organization-reuse.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | unity-shaderlab/07-optimization/usl-31-rendering-concepts.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | unity-shaderlab/07-optimization/usl-32-render-path-optimization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | unity-shaderlab/07-optimization/usl-33-mobile-optimization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | unity-shaderlab/08-review/usl-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 14.19 unity-mmo-game（14 章 · 待修 14 章 · 84 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | unity-mmo-game/00-guide/umm-official-learning-map.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | unity-mmo-game/01-foundations/umm-01-echo.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | unity-mmo-game/01-foundations/umm-02-async-multiplexing.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | unity-mmo-game/01-foundations/umm-03-battle-royale.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | unity-mmo-game/01-foundations/umm-04-tcp-data-stream.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | unity-mmo-game/01-foundations/umm-05-deep-tcp.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | unity-mmo-game/02-framework/umm-06-client-network-module.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | unity-mmo-game/02-framework/umm-07-server-framework.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | unity-mmo-game/03-project/umm-08-tank-battle-project.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | unity-mmo-game/03-project/umm-09-ui-module.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | unity-mmo-game/03-project/umm-10-lobby-rooms.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | unity-mmo-game/03-project/umm-11-battle-result.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | unity-mmo-game/03-project/umm-12-battle-sync.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | unity-mmo-game/04-review/umm-official-final-review.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 15：C#/.NET 系列（9 本 · 176 章待修 · 692 项）

**系列状态**：待开始

### 15.1 effective-csharp（7 章 · 待修 7 章 · 22 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | effective-csharp/00-habits/ecs-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | effective-csharp/01-official/language-idioms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | effective-csharp/02-official/resource-management.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | effective-csharp/03-concurrent/ecs-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | effective-csharp/03-official/working-with-generics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | effective-csharp/04-official/working-with-linq.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | effective-csharp/05-official/exception-practices.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.2 csharp-quality-code（14 章 · 待修 14 章 · 50 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | csharp-quality-code/00-syntax/cqc-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | csharp-quality-code/01-official/basic-language-elements.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | csharp-quality-code/02-official/collections-and-linq.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | csharp-quality-code/03-eng/cqc-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | csharp-quality-code/03-official/generics-delegates-and-events.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | csharp-quality-code/04-official/resource-management-and-serialization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | csharp-quality-code/05-official/exceptions-and-custom-exceptions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | csharp-quality-code/06-official/asynchrony-multithreading-tasks-and-parallelism.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | csharp-quality-code/07-official/member-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | csharp-quality-code/08-official/type-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | csharp-quality-code/09-official/security-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | csharp-quality-code/10-official/naming-conventions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | csharp-quality-code/11-official/clean-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | csharp-quality-code/12-official/development-practices.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.3 deep-understanding-csharp（17 章 · 待修 17 章 · 59 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-understanding-csharp/00-evolution/dcs-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | deep-understanding-csharp/01-official/survival-of-the-sharpest.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | deep-understanding-csharp/02-official/csharp-2.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | deep-understanding-csharp/03-modern/dcs-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | deep-understanding-csharp/03-official/csharp-3-linq.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | deep-understanding-csharp/04-official/csharp-4-interoperability.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | deep-understanding-csharp/05-official/writing-asynchronous-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | deep-understanding-csharp/06-official/async-implementation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | deep-understanding-csharp/07-official/csharp-5-bonus-features.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | deep-understanding-csharp/08-official/super-sleek-properties.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | deep-understanding-csharp/09-official/stringy-features.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | deep-understanding-csharp/10-official/concise-code-smorgasbord.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | deep-understanding-csharp/11-official/composition-using-tuples.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | deep-understanding-csharp/12-official/deconstruction-and-pattern-matching.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | deep-understanding-csharp/13-official/pass-by-reference-efficiency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | deep-understanding-csharp/14-official/concise-code-csharp-7.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | deep-understanding-csharp/15-official/csharp-8-and-beyond.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.4 dotnet-memory（17 章 · 待修 15 章 · 60 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | dotnet-memory/00-fundamentals/dnm-memory-model.mdx | — | ✅ 合规 | — |
| 2 | dotnet-memory/01-official/basic-concepts.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | dotnet-memory/02-official/low-level-memory-management.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | dotnet-memory/03-advanced/dnm-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | dotnet-memory/03-official/memory-measurements.mdx | — | ✅ 合规 | — |
| 6 | dotnet-memory/04-official/dotnet-fundamentals.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | dotnet-memory/05-official/memory-partitioning.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | dotnet-memory/06-official/memory-allocation.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | dotnet-memory/07-official/garbage-collection-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | dotnet-memory/08-official/garbage-collection-mark-phase.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | dotnet-memory/09-official/garbage-collection-plan-phase.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | dotnet-memory/10-official/garbage-collection-sweep-and-compact.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | dotnet-memory/11-official/gc-flavors-and-settings.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | dotnet-memory/12-official/object-lifetime.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | dotnet-memory/13-official/miscellaneous-topics.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | dotnet-memory/14-official/advanced-techniques.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | dotnet-memory/15-official/programmatical-apis.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.5 csharp-functional-programming（17 章 · 待修 17 章 · 65 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | csharp-functional-programming/00-basics/cfp-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | csharp-functional-programming/01-official/introducing-functional-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | csharp-functional-programming/02-official/why-function-purity-matters.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | csharp-functional-programming/03-official/designing-function-signatures-and-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | csharp-functional-programming/03-practice/cfp-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | csharp-functional-programming/04-official/patterns-in-functional-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | csharp-functional-programming/05-official/designing-programs-with-function-composition.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | csharp-functional-programming/06-official/functional-error-handling.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | csharp-functional-programming/07-official/structuring-an-application-with-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | csharp-functional-programming/08-official/multi-argument-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | csharp-functional-programming/09-official/thinking-about-data-functionally.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | csharp-functional-programming/10-official/event-sourcing-functional-persistence.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | csharp-functional-programming/11-official/lazy-computations-continuations-monadic-composition.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | csharp-functional-programming/12-official/stateful-programs-and-computations.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | csharp-functional-programming/13-official/asynchronous-computations.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | csharp-functional-programming/14-official/reactive-data-streams.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | csharp-functional-programming/15-official/message-passing-concurrency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.6 essential-csharp-7（24 章 · 待修 24 章 · 96 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | essential-csharp-7/00-basics/ec7-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | essential-csharp-7/01-official/introducing-csharp.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | essential-csharp-7/02-official/data-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | essential-csharp-7/03-advanced/ec7-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | essential-csharp-7/03-official/more-with-data-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | essential-csharp-7/04-official/operators-and-control-flow.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | essential-csharp-7/05-official/methods-and-parameters.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | essential-csharp-7/06-official/classes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | essential-csharp-7/07-official/inheritance.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | essential-csharp-7/08-official/interfaces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | essential-csharp-7/09-official/value-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | essential-csharp-7/10-official/well-formed-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | essential-csharp-7/11-official/exception-handling.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | essential-csharp-7/12-official/generics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | essential-csharp-7/13-official/delegates-and-lambda-expressions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | essential-csharp-7/14-official/events.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | essential-csharp-7/15-official/collection-interfaces-with-standard-query-operators.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 18 | essential-csharp-7/16-official/linq-with-query-expressions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 19 | essential-csharp-7/17-official/building-custom-collections.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 20 | essential-csharp-7/18-official/reflection-attributes-and-dynamic-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 21 | essential-csharp-7/19-official/multithreading.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 22 | essential-csharp-7/20-official/thread-synchronization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 23 | essential-csharp-7/21-official/platform-interoperability-and-unsafe-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 24 | essential-csharp-7/22-official/the-common-language-infrastructure.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.7 csharp-10-core（27 章 · 待修 27 章 · 105 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | csharp-10-core/00-lang/ctc-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | csharp-10-core/01-official/introducing-csharp-and-dotnet.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | csharp-10-core/02-official/csharp-language-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | csharp-10-core/03-modern/ctc-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | csharp-10-core/03-official/creating-types-in-csharp.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | csharp-10-core/04-official/advanced-csharp.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | csharp-10-core/05-official/dotnet-overview.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | csharp-10-core/06-official/dotnet-fundamentals.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | csharp-10-core/07-official/collections.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | csharp-10-core/08-official/linq-queries.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | csharp-10-core/09-official/linq-operators.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | csharp-10-core/10-official/linq-to-xml.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | csharp-10-core/11-official/xml-json-technologies.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | csharp-10-core/12-official/disposal-and-garbage-collection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | csharp-10-core/13-official/diagnostics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | csharp-10-core/14-official/concurrency-and-asynchrony.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | csharp-10-core/15-official/streams-and-io.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 18 | csharp-10-core/16-official/networking.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 19 | csharp-10-core/17-official/assemblies.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 20 | csharp-10-core/18-official/reflection-and-metadata.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 21 | csharp-10-core/19-official/dynamic-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 22 | csharp-10-core/20-official/cryptography.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 23 | csharp-10-core/21-official/advanced-threading.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 24 | csharp-10-core/22-official/parallel-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 25 | csharp-10-core/23-official/span-and-memory.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 26 | csharp-10-core/24-official/native-com-interoperability.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 27 | csharp-10-core/25-official/regular-expressions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 15.8 mfc-deep-dive（23 章 · 待修 23 章 · 106 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mfc-deep-dive/00-guide/mfc-00-reading-guide.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | mfc-deep-dive/00-guide/mfc-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | mfc-deep-dive/01-foundations/mfc-01-win32-program-concepts.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | mfc-deep-dive/01-foundations/mfc-02-cpp-essential-properties.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | mfc-deep-dive/01-foundations/mfc-03-six-key-techniques-simulation.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | mfc-deep-dive/02-tools/mfc-04-visual-cpp-ide.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | mfc-deep-dive/03-framework/mfc-05-application-framework-overview.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | mfc-deep-dive/03-framework/mfc-06-program-lifecycle.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | mfc-deep-dive/03-framework/mfc-07-framework-skeleton.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | mfc-deep-dive/04-deep-mfc/mfc-08-document-view.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | mfc-deep-dive/04-deep-mfc/mfc-09-message-map-command-routing.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | mfc-deep-dive/04-deep-mfc/mfc-10-dialogs.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | mfc-deep-dive/04-deep-mfc/mfc-11-view-and-redraw.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | mfc-deep-dive/04-deep-mfc/mfc-12-print-preview.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | mfc-deep-dive/04-deep-mfc/mfc-13-multiple-documents-views.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | mfc-deep-dive/04-deep-mfc/mfc-14-multithreading.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | mfc-deep-dive/04-deep-mfc/mfc-15-custom-appwizard.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | mfc-deep-dive/04-deep-mfc/mfc-16-components-activex.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | mfc-deep-dive/05-appendices/mfc-appendix-a-learning-roadmap.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | mfc-deep-dive/05-appendices/mfc-appendix-b-scribble-step5-source.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | mfc-deep-dive/05-appendices/mfc-appendix-c-sample-catalog.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 22 | mfc-deep-dive/05-appendices/mfc-appendix-d-dbwin.mdx | §6缺CodeTabs §7误区<3 §8小结>5条 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 23 | mfc-deep-dive/06-review/mfc-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 15.9 clr-via-csharp（32 章 · 待修 32 章 · 129 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | clr-via-csharp/00-clr/cvc-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | clr-via-csharp/01-clr-basics/building-packaging-deploying-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | clr-via-csharp/01-clr-basics/clr-execution-model.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | clr-via-csharp/01-clr-basics/shared-strongly-named-assemblies.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | clr-via-csharp/02-designing-types/constants-and-fields.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | clr-via-csharp/02-designing-types/events.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | clr-via-csharp/02-designing-types/generics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | clr-via-csharp/02-designing-types/interfaces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | clr-via-csharp/02-designing-types/methods.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | clr-via-csharp/02-designing-types/parameters.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | clr-via-csharp/02-designing-types/primitive-reference-value-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | clr-via-csharp/02-designing-types/properties.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | clr-via-csharp/02-designing-types/type-fundamentals.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | clr-via-csharp/02-designing-types/type-member-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | clr-via-csharp/03-advanced/cvc-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | clr-via-csharp/03-essential-types/arrays.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | clr-via-csharp/03-essential-types/chars-strings-working-with-text.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 18 | clr-via-csharp/03-essential-types/custom-attributes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 19 | clr-via-csharp/03-essential-types/delegates.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 20 | clr-via-csharp/03-essential-types/enumerated-types-bit-flags.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 21 | clr-via-csharp/03-essential-types/nullable-value-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 22 | clr-via-csharp/04-core-facilities/assembly-loading-reflection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 23 | clr-via-csharp/04-core-facilities/clr-hosting-appdomains.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 24 | clr-via-csharp/04-core-facilities/exceptions-state-management.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 25 | clr-via-csharp/04-core-facilities/interoperating-winrt-components.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 26 | clr-via-csharp/04-core-facilities/managed-heap-garbage-collection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 27 | clr-via-csharp/04-core-facilities/runtime-serialization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 28 | clr-via-csharp/05-threading/compute-bound-asynchronous-operations.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 29 | clr-via-csharp/05-threading/hybrid-thread-synchronization-constructs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 30 | clr-via-csharp/05-threading/io-bound-asynchronous-operations.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 31 | clr-via-csharp/05-threading/primitive-thread-synchronization-constructs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 32 | clr-via-csharp/05-threading/thread-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—


## 系列 16：Go/Rust/Ruby/Lua/Kotlin 系列（10 本 · 203 章待修 · 823 项）

**系列状态**：待开始

### 16.1 go-in-action（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | go-in-action/00-guide/gia-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | go-in-action/01-language/gia-go-philosophy.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | go-in-action/01-language/gia-packaging-tooling.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | go-in-action/01-language/gia-quick-start.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | go-in-action/02-data/gia-arrays-slices.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | go-in-action/02-data/gia-map-struct.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | go-in-action/03-concurrency/gia-concurrency-patterns.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | go-in-action/03-concurrency/gia-goroutines.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | go-in-action/04-engineering/gia-standard-lib.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | go-in-action/04-engineering/gia-testing-packaging.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | go-in-action/05-review/gia-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 16.2 kotlin-in-action（19 章 · 待修 19 章 · 19 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | kotlin-in-action/00-official-learning-map/kia1-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | kotlin-in-action/01-part-one/kia1-part1-kotlin-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | kotlin-in-action/02-chapter-01/kia1-01-kotlin-what-and-why.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | kotlin-in-action/03-chapter-02/kia1-02-kotlin-basics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | kotlin-in-action/04-chapter-03/kia1-03-defining-calling-functions.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | kotlin-in-action/05-chapter-04/kia1-04-classes-objects-interfaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | kotlin-in-action/06-chapter-05/kia1-05-programming-with-lambdas.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | kotlin-in-action/07-chapter-06/kia1-06-kotlin-type-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | kotlin-in-action/08-part-two/kia1-part2-embracing-kotlin.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | kotlin-in-action/09-chapter-07/kia1-07-operator-overloading-conventions.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | kotlin-in-action/10-chapter-08/kia1-08-higher-order-functions.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | kotlin-in-action/11-chapter-09/kia1-09-generics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | kotlin-in-action/12-chapter-10/kia1-10-annotations-reflection.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | kotlin-in-action/13-chapter-11/kia1-11-dsl-construction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | kotlin-in-action/14-appendix-a/kia1-appendix-a-building-projects.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | kotlin-in-action/15-appendix-b/kia1-appendix-b-documenting-code.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | kotlin-in-action/16-appendix-c/kia1-appendix-c-kotlin-ecosystem.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | kotlin-in-action/17-reference/kia1-index-figures-tables-listings.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | kotlin-in-action/18-official-final-review/kia1-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 16.3 go-web-programming（12 章 · 待修 12 章 · 56 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | go-web-programming/00-guide/gwp-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | go-web-programming/01-foundations/gwp-chitchat.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | go-web-programming/01-foundations/gwp-http-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | go-web-programming/02-request-response/gwp-processing-requests.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | go-web-programming/02-request-response/gwp-routing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | go-web-programming/03-display-data/gwp-database.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | go-web-programming/03-display-data/gwp-templates.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | go-web-programming/04-service-testing/gwp-json-api.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | go-web-programming/04-service-testing/gwp-testing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | go-web-programming/05-runtime-release/gwp-concurrency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | go-web-programming/05-runtime-release/gwp-deployment.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | go-web-programming/06-review/gwp-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 16.4 kotlin-definitive-guide（29 章 · 待修 29 章 · 58 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | kotlin-definitive-guide/00-official-learning-map/kdg1-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | kotlin-definitive-guide/01-introduction/kdg1-introducing-kotlin.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | kotlin-definitive-guide/02-language-foundations/kdg1-01-first-application.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | kotlin-definitive-guide/02-language-foundations/kdg1-02-variables-types.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | kotlin-definitive-guide/02-language-foundations/kdg1-03-conditionals.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | kotlin-definitive-guide/03-functions-null-values/kdg1-04-functions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | kotlin-definitive-guide/03-functions-null-values/kdg1-05-anonymous-functions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | kotlin-definitive-guide/03-functions-null-values/kdg1-06-null-safety-exceptions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | kotlin-definitive-guide/04-values-collections/kdg1-07-strings.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | kotlin-definitive-guide/04-values-collections/kdg1-08-numbers.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | kotlin-definitive-guide/04-values-collections/kdg1-09-standard-functions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | kotlin-definitive-guide/04-values-collections/kdg1-10-lists-sets.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | kotlin-definitive-guide/04-values-collections/kdg1-11-maps.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | kotlin-definitive-guide/05-object-model/kdg1-12-defining-classes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | kotlin-definitive-guide/05-object-model/kdg1-13-initialization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | kotlin-definitive-guide/05-object-model/kdg1-14-inheritance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | kotlin-definitive-guide/05-object-model/kdg1-15-objects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | kotlin-definitive-guide/05-object-model/kdg1-16-interfaces-abstract-classes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | kotlin-definitive-guide/05-object-model/kdg1-17-generics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | kotlin-definitive-guide/05-object-model/kdg1-18-extensions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | kotlin-definitive-guide/06-integration/kdg1-19-functional-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | kotlin-definitive-guide/06-integration/kdg1-20-java-interoperability.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | kotlin-definitive-guide/06-integration/kdg1-21-first-android-application.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | kotlin-definitive-guide/06-integration/kdg1-22-coroutines-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | kotlin-definitive-guide/07-reference/kdg1-23-afterword.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | kotlin-definitive-guide/07-reference/kdg1-appendix-a-more-challenges.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | kotlin-definitive-guide/07-reference/kdg1-glossary.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | kotlin-definitive-guide/07-reference/kdg1-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | kotlin-definitive-guide/08-official-final-review/kdg1-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 16.5 go-programming-language（15 章 · 待修 15 章 · 60 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | go-programming-language/00-basics/gpl-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | go-programming-language/01-official/tutorial.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | go-programming-language/02-official/program-structure.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | go-programming-language/03-advanced/gpl-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | go-programming-language/03-official/basic-data-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | go-programming-language/04-official/composite-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | go-programming-language/05-official/functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | go-programming-language/06-official/methods.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | go-programming-language/07-official/interfaces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | go-programming-language/08-official/goroutines-and-channels.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | go-programming-language/09-official/concurrency-with-shared-variables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | go-programming-language/10-official/packages-and-the-go-tool.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | go-programming-language/11-official/testing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | go-programming-language/12-official/reflection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | go-programming-language/13-official/low-level-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 16.6 rust-way（15 章 · 待修 15 章 · 86 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | rust-way/00-guide/rsw-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | rust-way/01-foundations/rsw-language-essentials.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | rust-way/01-foundations/rsw-lifetimes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | rust-way/01-foundations/rsw-new-era-language.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | rust-way/01-foundations/rsw-traits-generics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | rust-way/02-ownership/rsw-functions-closures-iterators.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | rust-way/02-ownership/rsw-ownership-borrow.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | rust-way/02-ownership/rsw-strings-collections.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | rust-way/02-ownership/rsw-structured-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | rust-way/03-engineering/rsw-concurrency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | rust-way/03-engineering/rsw-error-handling.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | rust-way/03-engineering/rsw-modular-development.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | rust-way/04-boundary/rsw-macros.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | rust-way/04-boundary/rsw-unsafe-rust.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | rust-way/05-review/rsw-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 16.7 mastering-rust-2e（19 章 · 待修 19 章 · 98 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mastering-rust-2e/00-guide/mrs-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | mastering-rust-2e/01-engineering/mrs-getting-started.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | mastering-rust-2e/01-engineering/mrs-managing-projects-cargo.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | mastering-rust-2e/01-engineering/mrs-tests-docs-benchmarks.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | mastering-rust-2e/02-types-safety/mrs-advanced-concepts.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | mastering-rust-2e/02-types-safety/mrs-error-handling.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | mastering-rust-2e/02-types-safety/mrs-memory-management-safety.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | mastering-rust-2e/02-types-safety/mrs-types-generics-traits.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | mastering-rust-2e/03-concurrency-low-level/mrs-concurrency.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | mastering-rust-2e/03-concurrency-low-level/mrs-metaprogramming-macros.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | mastering-rust-2e/03-concurrency-low-level/mrs-unsafe-ffi.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | mastering-rust-2e/04-services/mrs-databases.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | mastering-rust-2e/04-services/mrs-logging.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | mastering-rust-2e/04-services/mrs-network-programming.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | mastering-rust-2e/04-services/mrs-web-applications.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | mastering-rust-2e/05-platform-debug/mrs-debugging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | mastering-rust-2e/05-platform-debug/mrs-desktop-applications.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | mastering-rust-2e/05-platform-debug/mrs-webassembly.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | mastering-rust-2e/06-review/mrs-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 16.8 rust-programming-language（23 章 · 待修 23 章 · 100 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | rust-programming-language/00-basics/rpl-learning-map.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 2 | rust-programming-language/01-official/getting-started.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | rust-programming-language/02-official/programming-a-guessing-game.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | rust-programming-language/03-concurrency/rpl-final-review.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | rust-programming-language/03-official/common-programming-concepts.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | rust-programming-language/04-official/understanding-ownership.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | rust-programming-language/05-official/using-structs-to-structure-related-data.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | rust-programming-language/06-official/enums-and-pattern-matching.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | rust-programming-language/07-official/packages-crates-and-modules.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | rust-programming-language/08-official/common-collections.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | rust-programming-language/09-official/error-handling.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | rust-programming-language/10-official/generic-types-traits-and-lifetimes.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | rust-programming-language/11-official/writing-automated-tests.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | rust-programming-language/12-official/an-io-project.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | rust-programming-language/13-official/functional-language-features.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | rust-programming-language/14-official/more-about-cargo-and-crates-io.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | rust-programming-language/15-official/smart-pointers.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | rust-programming-language/16-official/fearless-concurrency.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | rust-programming-language/17-official/fundamentals-of-asynchronous-programming.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | rust-programming-language/18-official/object-oriented-programming-features.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | rust-programming-language/19-official/patterns-and-matching.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | rust-programming-language/20-official/advanced-features.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | rust-programming-language/21-official/final-project-building-a-multithreaded-web-server.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 16.9 ruby-programming（25 章 · 待修 25 章 · 125 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | ruby-programming/00-basics/rub-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | ruby-programming/01-first-experience/building-command.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | ruby-programming/01-first-experience/first-ruby.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | ruby-programming/01-first-experience/useful-objects.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | ruby-programming/02-foundations/blocks.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | ruby-programming/02-foundations/classes-modules.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | ruby-programming/02-foundations/conditional-judgment.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | ruby-programming/02-foundations/errors-exceptions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | ruby-programming/02-foundations/loops.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | ruby-programming/02-foundations/methods.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | ruby-programming/02-foundations/objects-variables-constants.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | ruby-programming/02-foundations/operators.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | ruby-programming/03-classes/arrays.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | ruby-programming/03-classes/encoding.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | ruby-programming/03-classes/file-dir.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | ruby-programming/03-classes/hashes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | ruby-programming/03-classes/io.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | ruby-programming/03-classes/numeric.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | ruby-programming/03-classes/proc.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | ruby-programming/03-classes/regular-expressions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | ruby-programming/03-classes/strings.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | ruby-programming/03-classes/time-date.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | ruby-programming/03-meta/rub-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | ruby-programming/04-tools/postal-code-search.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 25 | ruby-programming/04-tools/text-processing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 16.10 lua-programming（35 章 · 待修 35 章 · 210 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | lua-programming/00-basics/lup-learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | lua-programming/01-basics/eight-queen-puzzle.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | lua-programming/01-basics/external-world.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | lua-programming/01-basics/filling-some-gaps.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | lua-programming/01-basics/functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | lua-programming/01-basics/getting-started.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | lua-programming/01-basics/numbers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | lua-programming/01-basics/strings.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | lua-programming/01-basics/tables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | lua-programming/02-real-programming/bits-bytes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | lua-programming/02-real-programming/closures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | lua-programming/02-real-programming/compilation-errors.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | lua-programming/02-real-programming/data-files-serialization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | lua-programming/02-real-programming/data-structures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | lua-programming/02-real-programming/date-time.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | lua-programming/02-real-programming/iterators-generic-for.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | lua-programming/02-real-programming/markov-chain.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | lua-programming/02-real-programming/modules-packages.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | lua-programming/02-real-programming/most-frequent-words.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | lua-programming/02-real-programming/pattern-matching.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 21 | lua-programming/03-lua-isms/coroutines.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 22 | lua-programming/03-lua-isms/environment.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 23 | lua-programming/03-lua-isms/garbage.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 24 | lua-programming/03-lua-isms/metatables-metamethods.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 25 | lua-programming/03-lua-isms/multithreading-coroutines.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 26 | lua-programming/03-lua-isms/object-oriented-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 27 | lua-programming/03-lua-isms/reflection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 28 | lua-programming/03-metaprogramming/lup-final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 29 | lua-programming/04-c-api/c-api-overview.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 30 | lua-programming/04-c-api/c-function-techniques.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 31 | lua-programming/04-c-api/calling-c-from-lua.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 32 | lua-programming/04-c-api/extending-application.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 33 | lua-programming/04-c-api/managing-resources.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 34 | lua-programming/04-c-api/threads-states.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 35 | lua-programming/04-c-api/user-defined-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 17：架构与工程实践系列（16 本 · 491 章待修 · 884 项）

**系列状态**：待开始

### 17.1 architecture-domain-design（13 章 · 待修 13 章 · 13 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | architecture-domain-design/00-intro/learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | architecture-domain-design/00-intro/what-is-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | architecture-domain-design/01-principles/clean-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | architecture-domain-design/01-principles/dependency-inversion.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | architecture-domain-design/01-principles/layered-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | architecture-domain-design/01-principles/solid-principles.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | architecture-domain-design/02-ddd/bounded-context.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | architecture-domain-design/02-ddd/ddd-fundamentals.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | architecture-domain-design/02-ddd/strategic-patterns.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | architecture-domain-design/02-ddd/tactical-patterns.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | architecture-domain-design/03-practice/cqrs-event-sourcing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | architecture-domain-design/03-practice/final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | architecture-domain-design/03-practice/hexagonal-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 17.2 microservices-patterns（15 章 · 待修 15 章 · 15 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | microservices-patterns/00-official-learning-map/msp-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | microservices-patterns/01-01-escaping-monolithic-hell/msp-01-escaping-monolithic-hell.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | microservices-patterns/02-02-decomposition-strategies/msp-02-decomposition-strategies.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | microservices-patterns/03-03-interprocess-communication/msp-03-interprocess-communication.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | microservices-patterns/04-04-managing-transactions-with-sagas/msp-04-managing-transactions-with-sagas.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | microservices-patterns/05-05-designing-business-logic/msp-05-designing-business-logic.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | microservices-patterns/06-06-event-sourcing/msp-06-event-sourcing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | microservices-patterns/07-07-implementing-queries/msp-07-implementing-queries.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | microservices-patterns/08-08-external-api-patterns/msp-08-external-api-patterns.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | microservices-patterns/09-09-testing-part-1/msp-09-testing-part-1.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | microservices-patterns/10-10-testing-part-2/msp-10-testing-part-2.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | microservices-patterns/11-11-production-ready-services/msp-11-production-ready-services.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | microservices-patterns/12-12-deploying-microservices/msp-12-deploying-microservices.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | microservices-patterns/13-13-refactoring-to-microservices/msp-13-refactoring-to-microservices.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | microservices-patterns/14-official-final-review/msp-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 17.3 dragon-book-compilers（16 章 · 待修 16 章 · 16 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | dragon-book-compilers/00-guide/dbc-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | dragon-book-compilers/01-foundations/dbc-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | dragon-book-compilers/01-foundations/dbc-02-simple-syntax-directed-translator.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | dragon-book-compilers/01-foundations/dbc-03-lexical-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | dragon-book-compilers/02-syntax-semantics/dbc-04-syntax-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | dragon-book-compilers/02-syntax-semantics/dbc-05-syntax-directed-translation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | dragon-book-compilers/02-syntax-semantics/dbc-06-intermediate-code-generation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | dragon-book-compilers/03-runtime-backend/dbc-07-runtime-environments.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | dragon-book-compilers/03-runtime-backend/dbc-08-code-generation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | dragon-book-compilers/04-optimization/dbc-09-machine-independent-optimizations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | dragon-book-compilers/04-optimization/dbc-10-instruction-level-parallelism.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | dragon-book-compilers/05-parallelism/dbc-11-parallelism-locality.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | dragon-book-compilers/05-parallelism/dbc-12-interprocedural-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | dragon-book-compilers/06-appendices/dbc-appendix-a-complete-front-end.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | dragon-book-compilers/06-appendices/dbc-appendix-b-linear-independent-solutions.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | dragon-book-compilers/07-review/dbc-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 17.4 phoenix-architecture（20 章 · 待修 20 章 · 20 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | phoenix-architecture/00-official-learning-map/pha-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | phoenix-architecture/01-01-architecture-evolution/pha-01-architecture-evolution.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | phoenix-architecture/02-02-remote-services/pha-02-remote-services.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | phoenix-architecture/03-03-transactions/pha-03-transactions.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | phoenix-architecture/04-04-diversion-system/pha-04-diversion-system.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | phoenix-architecture/05-05-security/pha-05-security.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | phoenix-architecture/06-06-consensus/pha-06-consensus.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | phoenix-architecture/07-07-library-to-service/pha-07-library-to-service.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | phoenix-architecture/08-08-traffic-governance/pha-08-traffic-governance.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | phoenix-architecture/09-09-reliable-communication/pha-09-reliable-communication.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | phoenix-architecture/10-10-observability/pha-10-observability.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | phoenix-architecture/11-11-containers/pha-11-containers.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | phoenix-architecture/12-12-container-network/pha-12-container-network.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | phoenix-architecture/13-13-persistent-storage/pha-13-persistent-storage.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | phoenix-architecture/14-14-resource-scheduling/pha-14-resource-scheduling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | phoenix-architecture/15-15-service-mesh/pha-15-service-mesh.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | phoenix-architecture/16-16-forward-microservices/pha-16-forward-microservices.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | phoenix-architecture/17-appendix-a-projects/pha-appendix-a-projects.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | phoenix-architecture/18-appendix-b-kubernetes/pha-appendix-b-kubernetes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | phoenix-architecture/19-official-final-review/pha-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 17.5 code-quality-refactoring（11 章 · 待修 11 章 · 22 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | code-quality-refactoring/00-intro/intro.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | code-quality-refactoring/00-intro/learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | code-quality-refactoring/01-clean-code/classes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | code-quality-refactoring/01-clean-code/comments-format.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | code-quality-refactoring/01-clean-code/error-handling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | code-quality-refactoring/01-clean-code/functions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | code-quality-refactoring/01-clean-code/naming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | code-quality-refactoring/01-clean-code/testing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | code-quality-refactoring/02-refactoring/code-smells.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | code-quality-refactoring/02-refactoring/final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | code-quality-refactoring/02-refactoring/refactoring-techniques.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.6 tiger-book-compiler（24 章 · 待修 24 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | tiger-book-compiler/00-guide/tbc-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | tiger-book-compiler/01-front-end/tbc-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | tiger-book-compiler/01-front-end/tbc-02-lexical-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | tiger-book-compiler/01-front-end/tbc-03-parsing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | tiger-book-compiler/01-front-end/tbc-04-abstract-syntax.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | tiger-book-compiler/01-front-end/tbc-05-semantic-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | tiger-book-compiler/02-runtime-ir/tbc-06-activation-records.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | tiger-book-compiler/02-runtime-ir/tbc-07-translation-intermediate-code.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | tiger-book-compiler/02-runtime-ir/tbc-08-basic-blocks-traces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | tiger-book-compiler/03-back-end/tbc-09-instruction-selection.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | tiger-book-compiler/03-back-end/tbc-10-liveness-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | tiger-book-compiler/03-back-end/tbc-11-register-allocation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | tiger-book-compiler/03-back-end/tbc-12-putting-it-all-together.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | tiger-book-compiler/04-runtime-languages/tbc-13-garbage-collection.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | tiger-book-compiler/04-runtime-languages/tbc-14-object-oriented-languages.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | tiger-book-compiler/04-runtime-languages/tbc-15-functional-languages.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | tiger-book-compiler/04-runtime-languages/tbc-16-polymorphic-types.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | tiger-book-compiler/05-optimization/tbc-17-dataflow-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | tiger-book-compiler/05-optimization/tbc-18-loop-optimizations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | tiger-book-compiler/05-optimization/tbc-19-static-single-assignment.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | tiger-book-compiler/06-machine-performance/tbc-20-scheduling-pipelining.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | tiger-book-compiler/06-machine-performance/tbc-21-memory-hierarchies.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | tiger-book-compiler/07-appendix/tbc-appendix-tiger-language-reference.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | tiger-book-compiler/08-review/tbc-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 17.7 kubernetes-in-action（24 章 · 待修 24 章 · 24 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | kubernetes-in-action/00-learning-map/k8s-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | kubernetes-in-action/01-01-introduction/k8s-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | kubernetes-in-action/02-02-docker-first-app/k8s-02-docker-first-app.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | kubernetes-in-action/03-03-pods/k8s-03-pods.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | kubernetes-in-action/04-04-replication-controllers/k8s-04-replication-controllers.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | kubernetes-in-action/05-05-services/k8s-05-services.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | kubernetes-in-action/06-06-volumes/k8s-06-volumes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | kubernetes-in-action/07-07-configmaps-secrets/k8s-07-configmaps-secrets.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | kubernetes-in-action/08-08-downward-api/k8s-08-downward-api.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | kubernetes-in-action/09-09-deployments/k8s-09-deployments.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | kubernetes-in-action/10-10-statefulsets/k8s-10-statefulsets.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | kubernetes-in-action/11-11-internals/k8s-11-internals.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | kubernetes-in-action/12-12-api-security/k8s-12-api-security.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | kubernetes-in-action/13-13-node-network-security/k8s-13-node-network-security.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | kubernetes-in-action/14-14-resources/k8s-14-resources.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | kubernetes-in-action/15-15-autoscaling/k8s-15-autoscaling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | kubernetes-in-action/16-16-scheduling/k8s-16-scheduling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | kubernetes-in-action/17-17-best-practices/k8s-17-best-practices.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | kubernetes-in-action/18-18-extension/k8s-18-extension.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | kubernetes-in-action/19-appendix-a-kubectl-multicluster/k8s-appendix-a-kubectl-multicluster.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | kubernetes-in-action/20-appendix-b-kubeadm/k8s-appendix-b-kubeadm.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | kubernetes-in-action/21-appendix-c-runtimes/k8s-appendix-c-runtimes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | kubernetes-in-action/22-appendix-d-federation/k8s-appendix-d-federation.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | kubernetes-in-action/23-final-review/k8s-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 17.8 engineering-a-compiler（17 章 · 待修 17 章 · 34 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | engineering-a-compiler/00-guide/eac-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | engineering-a-compiler/01-front-end/eac-01-overview-compilation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | engineering-a-compiler/01-front-end/eac-02-scanners.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | engineering-a-compiler/01-front-end/eac-03-parsers.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | engineering-a-compiler/01-front-end/eac-04-context-sensitive-analysis.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | engineering-a-compiler/02-ir-runtime/eac-05-intermediate-representations.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | engineering-a-compiler/02-ir-runtime/eac-06-procedure-abstraction.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | engineering-a-compiler/02-ir-runtime/eac-07-code-shape.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | engineering-a-compiler/03-optimization/eac-08-introduction-optimization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | engineering-a-compiler/03-optimization/eac-09-data-flow-analysis.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | engineering-a-compiler/03-optimization/eac-10-scalar-optimizations.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | engineering-a-compiler/04-back-end/eac-11-instruction-selection.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | engineering-a-compiler/04-back-end/eac-12-instruction-scheduling.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | engineering-a-compiler/04-back-end/eac-13-register-allocation.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | engineering-a-compiler/05-iloc/eac-appendix-a-iloc.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | engineering-a-compiler/06-data-structures/eac-appendix-b-data-structures.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | engineering-a-compiler/07-review/eac-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.9 two-week-scripting-language（21 章 · 待修 21 章 · 42 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | two-week-scripting-language/00-guide/tws-official-learning-map.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 2 | two-week-scripting-language/01-foundations/tws-01-what-to-build.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 3 | two-week-scripting-language/01-foundations/tws-02-language-design.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 4 | two-week-scripting-language/01-foundations/tws-03-tokenization.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 5 | two-week-scripting-language/01-foundations/tws-04-program-objects.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 6 | two-week-scripting-language/01-foundations/tws-05-parser-design.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 7 | two-week-scripting-language/02-interpreter/tws-06-interpreter-execution.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 8 | two-week-scripting-language/02-interpreter/tws-07-functions-closures.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 9 | two-week-scripting-language/02-interpreter/tws-08-java-interop.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 10 | two-week-scripting-language/02-interpreter/tws-09-object-oriented-language.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 11 | two-week-scripting-language/02-interpreter/tws-10-arrays.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 12 | two-week-scripting-language/03-optimization/tws-11-fast-variable-access.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 13 | two-week-scripting-language/03-optimization/tws-12-fast-object-access.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 14 | two-week-scripting-language/04-vm-types/tws-13-bytecode-interpreter.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 15 | two-week-scripting-language/04-vm-types/tws-14-static-types.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 16 | two-week-scripting-language/05-self-study/tws-15-handwritten-lexer.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 17 | two-week-scripting-language/05-self-study/tws-16-parsing-methods.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 18 | two-week-scripting-language/05-self-study/tws-17-parser-library-internals.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 19 | two-week-scripting-language/05-self-study/tws-18-gluonj.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 20 | two-week-scripting-language/05-self-study/tws-19-ast-design-patterns.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |
| 21 | two-week-scripting-language/06-review/tws-official-final-review.mdx | §8小结>5条 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.10 head-first-design-patterns（16 章 · 待修 16 章 · 46 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | head-first-design-patterns/00-intro/hfd-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | head-first-design-patterns/00-intro/hfd-strategy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | head-first-design-patterns/01-variation/hfd-decorator.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | head-first-design-patterns/01-variation/hfd-observer.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | head-first-design-patterns/02-composition/hfd-factory.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | head-first-design-patterns/02-composition/hfd-singleton.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | head-first-design-patterns/03-state/hfd-adapter-facade.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | head-first-design-patterns/03-state/hfd-command.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | head-first-design-patterns/04-advanced/hfd-compound-patterns.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | head-first-design-patterns/04-advanced/hfd-iterator-composite.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | head-first-design-patterns/04-advanced/hfd-leftover-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | head-first-design-patterns/04-advanced/hfd-proxy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | head-first-design-patterns/04-advanced/hfd-real-world.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | head-first-design-patterns/04-advanced/hfd-state.mdx | §6超长块×1 §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | head-first-design-patterns/04-summary/hfd-final-review.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | head-first-design-patterns/04-summary/hfd-template-method.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.11 crafting-compiler（25 章 · 待修 25 章 · 50 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | crafting-compiler/00-guide/crc-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | crafting-compiler/01-overview/crc-01-start-compiler.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | crafting-compiler/01-overview/crc-02-cflat-cbc.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | crafting-compiler/02-source-analysis/crc-03-parsing-overview.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | crafting-compiler/02-source-analysis/crc-04-lexical-analysis.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | crafting-compiler/02-source-analysis/crc-05-javacc-parser.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | crafting-compiler/02-source-analysis/crc-06-syntax-analysis.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | crafting-compiler/03-ast-ir/crc-07-javacc-actions-ast.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | crafting-compiler/03-ast-ir/crc-08-build-ast.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | crafting-compiler/03-ast-ir/crc-09-reference-resolution.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | crafting-compiler/03-ast-ir/crc-10-static-type-checking.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | crafting-compiler/03-ast-ir/crc-11-ir-conversion.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | crafting-compiler/04-assembly/crc-12-x86-overview.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | crafting-compiler/04-assembly/crc-13-x86-assembly.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | crafting-compiler/04-assembly/crc-14-functions-variables.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | crafting-compiler/05-codegen/crc-15-compile-expressions-statements.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | crafting-compiler/05-codegen/crc-16-stack-frame.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | crafting-compiler/05-codegen/crc-17-optimization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | crafting-compiler/06-link-load/crc-18-object-files.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | crafting-compiler/06-link-load/crc-19-linking-libraries.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | crafting-compiler/06-link-load/crc-20-program-loading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | crafting-compiler/06-link-load/crc-21-position-independent-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | crafting-compiler/06-link-load/crc-22-further-reading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | crafting-compiler/07-appendix/crc-appendix-resources.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | crafting-compiler/08-review/crc-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.12 design-patterns（27 章 · 待修 27 章 · 54 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | design-patterns/00-intro/intro.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | design-patterns/00-intro/learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | design-patterns/01-creational/abstract-factory.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | design-patterns/01-creational/builder.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | design-patterns/01-creational/factory-method.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | design-patterns/01-creational/prototype.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | design-patterns/01-creational/singleton.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | design-patterns/02-structural/adapter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | design-patterns/02-structural/bridge.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | design-patterns/02-structural/composite.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | design-patterns/02-structural/facade.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | design-patterns/02-structural/flyweight.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | design-patterns/02-structural/proxy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | design-patterns/03-behavioral/chain-of-responsibility.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | design-patterns/03-behavioral/command.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | design-patterns/03-behavioral/decorator.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | design-patterns/03-behavioral/interpreter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | design-patterns/03-behavioral/iterator.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | design-patterns/03-behavioral/mediator.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | design-patterns/03-behavioral/memento.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | design-patterns/03-behavioral/observer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | design-patterns/03-behavioral/state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | design-patterns/03-behavioral/strategy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | design-patterns/03-behavioral/template-method.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | design-patterns/03-behavioral/visitor.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | design-patterns/04-compound/compound-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | design-patterns/04-compound/final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.13 code-complete-2e（51 章 · 待修 51 章 · 102 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | code-complete-2e/00-map/cc2e-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | code-complete-2e/01-preface/cc2e-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | code-complete-2e/02-acknowledgments/cc2e-acknowledgments.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | code-complete-2e/03-checklist-index/cc2e-checklist-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | code-complete-2e/04-table-index/cc2e-table-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | code-complete-2e/05-figure-index/cc2e-figure-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | code-complete-2e/06-foundations/cc2e-part-01-foundations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | code-complete-2e/07-construction-world/cc2e-01-construction-world.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | code-complete-2e/08-software-metaphors/cc2e-02-software-metaphors.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | code-complete-2e/09-prerequisites/cc2e-03-prerequisites.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | code-complete-2e/10-construction-decisions/cc2e-04-construction-decisions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | code-complete-2e/11-high-quality-code/cc2e-part-02-high-quality-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | code-complete-2e/12-design-in-construction/cc2e-05-design-in-construction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | code-complete-2e/13-working-classes/cc2e-06-working-classes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | code-complete-2e/14-high-quality-routines/cc2e-07-high-quality-routines.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | code-complete-2e/15-defensive-programming/cc2e-08-defensive-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | code-complete-2e/16-pseudocode-programming-process/cc2e-09-pseudocode-programming-process.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | code-complete-2e/17-variables/cc2e-part-03-variables.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | code-complete-2e/18-general-variable-use/cc2e-10-general-variable-use.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | code-complete-2e/19-power-of-variable-names/cc2e-11-power-of-variable-names.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | code-complete-2e/20-fundamental-data-types/cc2e-12-fundamental-data-types.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | code-complete-2e/21-unusual-data-types/cc2e-13-unusual-data-types.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | code-complete-2e/22-statements/cc2e-part-04-statements.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | code-complete-2e/23-straight-line-code/cc2e-14-straight-line-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | code-complete-2e/24-conditionals/cc2e-15-conditionals.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | code-complete-2e/25-loops/cc2e-16-loops.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | code-complete-2e/26-unusual-control-structures/cc2e-17-unusual-control-structures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | code-complete-2e/27-table-driven-methods/cc2e-18-table-driven-methods.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | code-complete-2e/28-general-control-issues/cc2e-19-general-control-issues.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | code-complete-2e/29-code-improvement/cc2e-part-05-code-improvement.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | code-complete-2e/30-software-quality-landscape/cc2e-20-software-quality-landscape.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | code-complete-2e/31-collaborative-construction/cc2e-21-collaborative-construction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | code-complete-2e/32-developer-testing/cc2e-22-developer-testing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | code-complete-2e/33-debugging/cc2e-23-debugging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | code-complete-2e/34-refactoring/cc2e-24-refactoring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 36 | code-complete-2e/35-code-tuning-strategies/cc2e-25-code-tuning-strategies.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 37 | code-complete-2e/36-code-tuning-techniques/cc2e-26-code-tuning-techniques.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 38 | code-complete-2e/37-system-considerations/cc2e-part-06-system-considerations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 39 | code-complete-2e/38-program-size/cc2e-27-program-size.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 40 | code-complete-2e/39-managing-construction/cc2e-28-managing-construction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 41 | code-complete-2e/40-integration/cc2e-29-integration.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 42 | code-complete-2e/41-programming-tools/cc2e-30-programming-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 43 | code-complete-2e/42-software-craftsmanship/cc2e-part-07-software-craftsmanship.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 44 | code-complete-2e/43-layout-and-style/cc2e-31-layout-and-style.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 45 | code-complete-2e/44-self-documenting-code/cc2e-32-self-documenting-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 46 | code-complete-2e/45-personal-character/cc2e-33-personal-character.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 47 | code-complete-2e/46-software-craftsmanship/cc2e-34-software-craftsmanship.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 48 | code-complete-2e/47-more-information/cc2e-35-more-information.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 49 | code-complete-2e/48-references/cc2e-references.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 50 | code-complete-2e/49-index/cc2e-index.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 51 | code-complete-2e/50-review/cc2e-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.14 coder-revolution（62 章 · 待修 62 章 · 124 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | coder-revolution/00-map/crv18-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | coder-revolution/01-preface/crv18-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | coder-revolution/02-chapter-01/crv18-chapter-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | coder-revolution/03-section-01-01/crv18-section-01-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | coder-revolution/04-section-01-02/crv18-section-01-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | coder-revolution/05-section-01-03/crv18-section-01-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | coder-revolution/06-section-01-04/crv18-section-01-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | coder-revolution/07-section-01-05/crv18-section-01-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | coder-revolution/08-section-01-06/crv18-section-01-06.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | coder-revolution/09-section-01-07/crv18-section-01-07.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | coder-revolution/10-section-01-08/crv18-section-01-08.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | coder-revolution/11-section-01-09/crv18-section-01-09.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | coder-revolution/12-section-01-10/crv18-section-01-10.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | coder-revolution/13-section-01-11/crv18-section-01-11.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | coder-revolution/14-section-01-12/crv18-section-01-12.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | coder-revolution/15-section-01-13/crv18-section-01-13.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | coder-revolution/16-section-01-14/crv18-section-01-14.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | coder-revolution/17-chapter-02/crv18-chapter-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | coder-revolution/18-section-02-01/crv18-section-02-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | coder-revolution/19-section-02-02/crv18-section-02-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | coder-revolution/20-section-02-03/crv18-section-02-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | coder-revolution/21-section-02-04/crv18-section-02-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | coder-revolution/22-section-02-05/crv18-section-02-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | coder-revolution/23-section-02-06/crv18-section-02-06.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | coder-revolution/24-section-02-07/crv18-section-02-07.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | coder-revolution/25-section-02-08/crv18-section-02-08.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | coder-revolution/26-section-02-09/crv18-section-02-09.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | coder-revolution/27-section-02-10/crv18-section-02-10.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | coder-revolution/28-section-02-11/crv18-section-02-11.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | coder-revolution/29-section-02-12/crv18-section-02-12.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | coder-revolution/30-section-02-13/crv18-section-02-13.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | coder-revolution/31-section-02-14/crv18-section-02-14.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | coder-revolution/32-chapter-03/crv18-chapter-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | coder-revolution/33-section-03-01/crv18-section-03-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | coder-revolution/34-section-03-02/crv18-section-03-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 36 | coder-revolution/35-section-03-03/crv18-section-03-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 37 | coder-revolution/36-section-03-04/crv18-section-03-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 38 | coder-revolution/37-section-03-05/crv18-section-03-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 39 | coder-revolution/38-section-03-06/crv18-section-03-06.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 40 | coder-revolution/39-section-03-07/crv18-section-03-07.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 41 | coder-revolution/40-section-03-08/crv18-section-03-08.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 42 | coder-revolution/41-section-03-09/crv18-section-03-09.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 43 | coder-revolution/42-section-03-10/crv18-section-03-10.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 44 | coder-revolution/43-chapter-04/crv18-chapter-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 45 | coder-revolution/44-section-04-01/crv18-section-04-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 46 | coder-revolution/45-section-04-02/crv18-section-04-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 47 | coder-revolution/46-section-04-03/crv18-section-04-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 48 | coder-revolution/47-section-04-04/crv18-section-04-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 49 | coder-revolution/48-section-04-05/crv18-section-04-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 50 | coder-revolution/49-chapter-05/crv18-chapter-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 51 | coder-revolution/50-section-05-01/crv18-section-05-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 52 | coder-revolution/51-section-05-02/crv18-section-05-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 53 | coder-revolution/52-section-05-03/crv18-section-05-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 54 | coder-revolution/53-section-05-04/crv18-section-05-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 55 | coder-revolution/54-section-05-05/crv18-section-05-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 56 | coder-revolution/55-chapter-06/crv18-chapter-06.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 57 | coder-revolution/56-section-06-01/crv18-section-06-01.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 58 | coder-revolution/57-section-06-02/crv18-section-06-02.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 59 | coder-revolution/58-section-06-03/crv18-section-06-03.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 60 | coder-revolution/59-section-06-04/crv18-section-06-04.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 61 | coder-revolution/60-section-06-05/crv18-section-06-05.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 62 | coder-revolution/61-review/crv18-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.15 pragmatic-programmer（71 章 · 待修 71 章 · 142 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | pragmatic-programmer/00-map/tpp20-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | pragmatic-programmer/01-foreword/tpp20-foreword.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | pragmatic-programmer/02-second-edition-preface/tpp20-second-edition-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | pragmatic-programmer/03-first-edition-preface/tpp20-first-edition-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | pragmatic-programmer/04-chapter-01-pragmatic-philosophy/tpp20-chapter-01-pragmatic-philosophy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | pragmatic-programmer/05-topic-01-your-life/tpp20-topic-01-your-life.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | pragmatic-programmer/06-topic-02-cat-ate-source-code/tpp20-topic-02-cat-ate-source-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | pragmatic-programmer/07-topic-03-software-entropy/tpp20-topic-03-software-entropy.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | pragmatic-programmer/08-topic-04-stone-soup-boiled-frogs/tpp20-topic-04-stone-soup-boiled-frogs.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | pragmatic-programmer/09-topic-05-good-enough-software/tpp20-topic-05-good-enough-software.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | pragmatic-programmer/10-topic-06-knowledge-portfolio/tpp20-topic-06-knowledge-portfolio.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | pragmatic-programmer/11-topic-07-communicate/tpp20-topic-07-communicate.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | pragmatic-programmer/12-chapter-02-pragmatic-approach/tpp20-chapter-02-pragmatic-approach.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | pragmatic-programmer/13-topic-08-essence-good-design/tpp20-topic-08-essence-good-design.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | pragmatic-programmer/14-topic-09-dry-duplication/tpp20-topic-09-dry-duplication.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | pragmatic-programmer/15-topic-10-orthogonality/tpp20-topic-10-orthogonality.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | pragmatic-programmer/16-topic-11-reversibility/tpp20-topic-11-reversibility.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | pragmatic-programmer/17-topic-12-tracer-bullets/tpp20-topic-12-tracer-bullets.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | pragmatic-programmer/18-topic-13-prototypes-post-it-notes/tpp20-topic-13-prototypes-post-it-notes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | pragmatic-programmer/19-topic-14-domain-languages/tpp20-topic-14-domain-languages.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | pragmatic-programmer/20-topic-15-estimating/tpp20-topic-15-estimating.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | pragmatic-programmer/21-chapter-03-basic-tools/tpp20-chapter-03-basic-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | pragmatic-programmer/22-topic-16-power-plain-text/tpp20-topic-16-power-plain-text.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | pragmatic-programmer/23-topic-17-shell-games/tpp20-topic-17-shell-games.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | pragmatic-programmer/24-topic-18-power-editing/tpp20-topic-18-power-editing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | pragmatic-programmer/25-topic-19-version-control/tpp20-topic-19-version-control.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | pragmatic-programmer/26-topic-20-debugging/tpp20-topic-20-debugging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | pragmatic-programmer/27-topic-21-text-manipulation/tpp20-topic-21-text-manipulation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | pragmatic-programmer/28-topic-22-engineering-daybooks/tpp20-topic-22-engineering-daybooks.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | pragmatic-programmer/29-chapter-04-pragmatic-paranoia/tpp20-chapter-04-pragmatic-paranoia.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | pragmatic-programmer/30-topic-23-design-by-contract/tpp20-topic-23-design-by-contract.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | pragmatic-programmer/31-topic-24-dead-programs-tell-no-lies/tpp20-topic-24-dead-programs-tell-no-lies.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | pragmatic-programmer/32-topic-25-assertive-programming/tpp20-topic-25-assertive-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | pragmatic-programmer/33-topic-26-balance-resources/tpp20-topic-26-balance-resources.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | pragmatic-programmer/34-topic-27-headlights/tpp20-topic-27-headlights.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 36 | pragmatic-programmer/35-chapter-05-bend-or-break/tpp20-chapter-05-bend-or-break.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 37 | pragmatic-programmer/36-topic-28-decoupling/tpp20-topic-28-decoupling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 38 | pragmatic-programmer/37-topic-29-juggling-real-world/tpp20-topic-29-juggling-real-world.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 39 | pragmatic-programmer/38-topic-30-transforming-programming/tpp20-topic-30-transforming-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 40 | pragmatic-programmer/39-topic-31-inheritance-tax/tpp20-topic-31-inheritance-tax.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 41 | pragmatic-programmer/40-topic-32-configuration/tpp20-topic-32-configuration.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 42 | pragmatic-programmer/41-chapter-06-concurrency/tpp20-chapter-06-concurrency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 43 | pragmatic-programmer/42-topic-33-breaking-temporal-coupling/tpp20-topic-33-breaking-temporal-coupling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 44 | pragmatic-programmer/43-topic-34-shared-state/tpp20-topic-34-shared-state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 45 | pragmatic-programmer/44-topic-35-actors-processes/tpp20-topic-35-actors-processes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 46 | pragmatic-programmer/45-topic-36-blackboards/tpp20-topic-36-blackboards.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 47 | pragmatic-programmer/46-chapter-07-while-coding/tpp20-chapter-07-while-coding.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 48 | pragmatic-programmer/47-topic-37-lizard-brain/tpp20-topic-37-lizard-brain.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 49 | pragmatic-programmer/48-topic-38-programming-by-coincidence/tpp20-topic-38-programming-by-coincidence.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 50 | pragmatic-programmer/49-topic-39-algorithm-speed/tpp20-topic-39-algorithm-speed.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 51 | pragmatic-programmer/50-topic-40-refactoring/tpp20-topic-40-refactoring.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 52 | pragmatic-programmer/51-topic-41-test-to-code/tpp20-topic-41-test-to-code.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 53 | pragmatic-programmer/52-topic-42-property-based-testing/tpp20-topic-42-property-based-testing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 54 | pragmatic-programmer/53-topic-43-stay-safe/tpp20-topic-43-stay-safe.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 55 | pragmatic-programmer/54-topic-44-naming-things/tpp20-topic-44-naming-things.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 56 | pragmatic-programmer/55-chapter-08-before-project/tpp20-chapter-08-before-project.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 57 | pragmatic-programmer/56-topic-45-requirements-pit/tpp20-topic-45-requirements-pit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 58 | pragmatic-programmer/57-topic-46-impossible-puzzles/tpp20-topic-46-impossible-puzzles.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 59 | pragmatic-programmer/58-topic-47-working-together/tpp20-topic-47-working-together.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 60 | pragmatic-programmer/59-topic-48-essence-agility/tpp20-topic-48-essence-agility.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 61 | pragmatic-programmer/60-chapter-09-pragmatic-projects/tpp20-chapter-09-pragmatic-projects.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 62 | pragmatic-programmer/61-topic-49-pragmatic-teams/tpp20-topic-49-pragmatic-teams.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 63 | pragmatic-programmer/62-topic-50-coconuts-dont-cut-it/tpp20-topic-50-coconuts-dont-cut-it.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 64 | pragmatic-programmer/63-topic-51-starter-kit/tpp20-topic-51-starter-kit.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 65 | pragmatic-programmer/64-topic-52-delight-users/tpp20-topic-52-delight-users.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 66 | pragmatic-programmer/65-topic-53-pride-prejudice/tpp20-topic-53-pride-prejudice.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 67 | pragmatic-programmer/66-postface/tpp20-postface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 68 | pragmatic-programmer/67-bibliography/tpp20-bibliography.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 69 | pragmatic-programmer/68-exercise-answers/tpp20-exercise-answers.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 70 | pragmatic-programmer/69-translator-postface/tpp20-translator-postface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 71 | pragmatic-programmer/70-review/tpp20-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 17.16 poeaa-enterprise-patterns（78 章 · 待修 78 章 · 156 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | poeaa-enterprise-patterns/00-map/poeaa24-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | poeaa-enterprise-patterns/01-translator-preface/poeaa24-translator-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | poeaa-enterprise-patterns/02-preface/poeaa24-preface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | poeaa-enterprise-patterns/03-pattern-list/poeaa24-pattern-list.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | poeaa-enterprise-patterns/04-introduction/poeaa24-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | poeaa-enterprise-patterns/05-part-01-narratives/poeaa24-part-01-narratives.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | poeaa-enterprise-patterns/06-chapter-01-layering/poeaa24-chapter-01-layering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | poeaa-enterprise-patterns/07-chapter-02-organizing-domain-logic/poeaa24-chapter-02-organizing-domain-logic.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | poeaa-enterprise-patterns/08-chapter-03-relational-mapping/poeaa24-chapter-03-relational-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | poeaa-enterprise-patterns/09-chapter-04-web-presentation/poeaa24-chapter-04-web-presentation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | poeaa-enterprise-patterns/10-chapter-05-concurrency/poeaa24-chapter-05-concurrency.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | poeaa-enterprise-patterns/11-chapter-06-session-state/poeaa24-chapter-06-session-state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | poeaa-enterprise-patterns/12-chapter-07-distribution-strategies/poeaa24-chapter-07-distribution-strategies.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | poeaa-enterprise-patterns/13-chapter-08-putting-together/poeaa24-chapter-08-putting-together.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | poeaa-enterprise-patterns/14-part-02-patterns/poeaa24-part-02-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | poeaa-enterprise-patterns/15-chapter-09-domain-logic-patterns/poeaa24-chapter-09-domain-logic-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | poeaa-enterprise-patterns/16-pattern-01-transaction-script/poeaa24-pattern-01-transaction-script.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | poeaa-enterprise-patterns/17-pattern-02-domain-model/poeaa24-pattern-02-domain-model.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | poeaa-enterprise-patterns/18-pattern-03-table-module/poeaa24-pattern-03-table-module.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | poeaa-enterprise-patterns/19-pattern-04-service-layer/poeaa24-pattern-04-service-layer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | poeaa-enterprise-patterns/20-chapter-10-data-source-patterns/poeaa24-chapter-10-data-source-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | poeaa-enterprise-patterns/21-pattern-05-table-data-gateway/poeaa24-pattern-05-table-data-gateway.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | poeaa-enterprise-patterns/22-pattern-06-row-data-gateway/poeaa24-pattern-06-row-data-gateway.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | poeaa-enterprise-patterns/23-pattern-07-active-record/poeaa24-pattern-07-active-record.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | poeaa-enterprise-patterns/24-pattern-08-data-mapper/poeaa24-pattern-08-data-mapper.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | poeaa-enterprise-patterns/25-chapter-11-object-relational-behavior/poeaa24-chapter-11-object-relational-behavior.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | poeaa-enterprise-patterns/26-pattern-09-unit-of-work/poeaa24-pattern-09-unit-of-work.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | poeaa-enterprise-patterns/27-pattern-10-identity-map/poeaa24-pattern-10-identity-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | poeaa-enterprise-patterns/28-pattern-11-lazy-load/poeaa24-pattern-11-lazy-load.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | poeaa-enterprise-patterns/29-chapter-12-object-relational-structure/poeaa24-chapter-12-object-relational-structure.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | poeaa-enterprise-patterns/30-pattern-12-identity-field/poeaa24-pattern-12-identity-field.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | poeaa-enterprise-patterns/31-pattern-13-foreign-key-mapping/poeaa24-pattern-13-foreign-key-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | poeaa-enterprise-patterns/32-pattern-14-association-table-mapping/poeaa24-pattern-14-association-table-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | poeaa-enterprise-patterns/33-pattern-15-dependent-mapping/poeaa24-pattern-15-dependent-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | poeaa-enterprise-patterns/34-pattern-16-embedded-value/poeaa24-pattern-16-embedded-value.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 36 | poeaa-enterprise-patterns/35-pattern-17-serialized-lob/poeaa24-pattern-17-serialized-lob.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 37 | poeaa-enterprise-patterns/36-pattern-18-single-table-inheritance/poeaa24-pattern-18-single-table-inheritance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 38 | poeaa-enterprise-patterns/37-pattern-19-class-table-inheritance/poeaa24-pattern-19-class-table-inheritance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 39 | poeaa-enterprise-patterns/38-pattern-20-concrete-table-inheritance/poeaa24-pattern-20-concrete-table-inheritance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 40 | poeaa-enterprise-patterns/39-pattern-21-inheritance-mappers/poeaa24-pattern-21-inheritance-mappers.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 41 | poeaa-enterprise-patterns/40-chapter-13-object-relational-metadata/poeaa24-chapter-13-object-relational-metadata.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 42 | poeaa-enterprise-patterns/41-pattern-22-metadata-mapping/poeaa24-pattern-22-metadata-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 43 | poeaa-enterprise-patterns/42-pattern-23-query-object/poeaa24-pattern-23-query-object.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 44 | poeaa-enterprise-patterns/43-pattern-24-repository/poeaa24-pattern-24-repository.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 45 | poeaa-enterprise-patterns/44-chapter-14-web-presentation-patterns/poeaa24-chapter-14-web-presentation-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 46 | poeaa-enterprise-patterns/45-pattern-25-model-view-controller/poeaa24-pattern-25-model-view-controller.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 47 | poeaa-enterprise-patterns/46-pattern-26-page-controller/poeaa24-pattern-26-page-controller.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 48 | poeaa-enterprise-patterns/47-pattern-27-front-controller/poeaa24-pattern-27-front-controller.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 49 | poeaa-enterprise-patterns/48-pattern-28-template-view/poeaa24-pattern-28-template-view.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 50 | poeaa-enterprise-patterns/49-pattern-29-transform-view/poeaa24-pattern-29-transform-view.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 51 | poeaa-enterprise-patterns/50-pattern-30-two-step-view/poeaa24-pattern-30-two-step-view.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 52 | poeaa-enterprise-patterns/51-pattern-31-application-controller/poeaa24-pattern-31-application-controller.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 53 | poeaa-enterprise-patterns/52-chapter-15-distribution-patterns/poeaa24-chapter-15-distribution-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 54 | poeaa-enterprise-patterns/53-pattern-32-remote-facade/poeaa24-pattern-32-remote-facade.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 55 | poeaa-enterprise-patterns/54-pattern-33-data-transfer-object/poeaa24-pattern-33-data-transfer-object.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 56 | poeaa-enterprise-patterns/55-chapter-16-offline-concurrency-patterns/poeaa24-chapter-16-offline-concurrency-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 57 | poeaa-enterprise-patterns/56-pattern-34-optimistic-offline-lock/poeaa24-pattern-34-optimistic-offline-lock.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 58 | poeaa-enterprise-patterns/57-pattern-35-pessimistic-offline-lock/poeaa24-pattern-35-pessimistic-offline-lock.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 59 | poeaa-enterprise-patterns/58-pattern-36-coarse-grained-lock/poeaa24-pattern-36-coarse-grained-lock.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 60 | poeaa-enterprise-patterns/59-pattern-37-implicit-lock/poeaa24-pattern-37-implicit-lock.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 61 | poeaa-enterprise-patterns/60-chapter-17-session-state-patterns/poeaa24-chapter-17-session-state-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 62 | poeaa-enterprise-patterns/61-pattern-38-client-session-state/poeaa24-pattern-38-client-session-state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 63 | poeaa-enterprise-patterns/62-pattern-39-server-session-state/poeaa24-pattern-39-server-session-state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 64 | poeaa-enterprise-patterns/63-pattern-40-database-session-state/poeaa24-pattern-40-database-session-state.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 65 | poeaa-enterprise-patterns/64-chapter-18-base-patterns/poeaa24-chapter-18-base-patterns.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 66 | poeaa-enterprise-patterns/65-pattern-41-gateway/poeaa24-pattern-41-gateway.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 67 | poeaa-enterprise-patterns/66-pattern-42-mapper/poeaa24-pattern-42-mapper.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 68 | poeaa-enterprise-patterns/67-pattern-43-layer-supertype/poeaa24-pattern-43-layer-supertype.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 69 | poeaa-enterprise-patterns/68-pattern-44-separated-interface/poeaa24-pattern-44-separated-interface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 70 | poeaa-enterprise-patterns/69-pattern-45-registry/poeaa24-pattern-45-registry.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 71 | poeaa-enterprise-patterns/70-pattern-46-value-object/poeaa24-pattern-46-value-object.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 72 | poeaa-enterprise-patterns/71-pattern-47-money/poeaa24-pattern-47-money.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 73 | poeaa-enterprise-patterns/72-pattern-48-special-case/poeaa24-pattern-48-special-case.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 74 | poeaa-enterprise-patterns/73-pattern-49-plugin/poeaa24-pattern-49-plugin.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 75 | poeaa-enterprise-patterns/74-pattern-50-service-stub/poeaa24-pattern-50-service-stub.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 76 | poeaa-enterprise-patterns/75-pattern-51-record-set/poeaa24-pattern-51-record-set.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 77 | poeaa-enterprise-patterns/76-references/poeaa24-references.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 78 | poeaa-enterprise-patterns/77-review/poeaa24-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—


## 系列 18：图形学系列（18 本 · 348 章待修 · 977 项）

**系列状态**：待开始

### 18.1 deep-opengl（10 章 · 待修 10 章 · 10 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | deep-opengl/00-fundamentals/dog-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | deep-opengl/01-core/dog-opengl-architecture.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | deep-opengl/01-core/dog-opengl-es.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | deep-opengl/01-core/dog-shader-language.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | deep-opengl/01-core/dog-webgl-basics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | deep-opengl/02-advanced/dog-cross-platform.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | deep-opengl/02-advanced/dog-debugging-tools.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | deep-opengl/02-advanced/dog-fbo-techniques.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | deep-opengl/02-advanced/dog-rendering-optimization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | deep-opengl/03-review/dog-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 18.2 ray-tracing-weekend（12 章 · 待修 12 章 · 12 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | ray-tracing-weekend/01-output/rtw-01-output-image.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | ray-tracing-weekend/01-output/rtw-02-vec3.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | ray-tracing-weekend/02-rays/rtw-03-rays-camera-background.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | ray-tracing-weekend/02-rays/rtw-04-adding-sphere.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | ray-tracing-weekend/02-rays/rtw-05-normals-objects.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | ray-tracing-weekend/03-materials/rtw-07-diffuse.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | ray-tracing-weekend/03-materials/rtw-08-metal.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | ray-tracing-weekend/03-materials/rtw-09-dielectrics.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | ray-tracing-weekend/03-sampling/rtw-06-antialiasing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | ray-tracing-weekend/04-camera/rtw-10-positionable-camera.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | ray-tracing-weekend/04-camera/rtw-11-defocus-blur.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | ray-tracing-weekend/05-final/rtw-12-final-render.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 18.3 global-illumination（12 章 · 待修 12 章 · 12 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | global-illumination/01-foundations/agi-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | global-illumination/01-foundations/agi-02-physics-light-transport.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | global-illumination/02-methods/agi-03-monte-carlo.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | global-illumination/02-methods/agi-04-computing-light-transport.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | global-illumination/03-algorithms/agi-05-stochastic-path-tracing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | global-illumination/03-algorithms/agi-06-stochastic-radiosity.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | global-illumination/03-algorithms/agi-07-hybrid-algorithms.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | global-illumination/04-frontiers/agi-08-realism-speed.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | global-illumination/04-frontiers/agi-09-conclusion.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | global-illumination/05-appendices/agi-a-class-library.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | global-illumination/05-appendices/agi-b-hemispherical-coordinates.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | global-illumination/05-appendices/agi-c-stochastic-relaxation-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 18.4 computer-graphics-4e（14 章 · 待修 14 章 · 14 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | computer-graphics-4e/01-foundations/cg4-01-hardware.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | computer-graphics-4e/01-foundations/cg4-02-systems-applications.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | computer-graphics-4e/02-primitives/cg4-03-output-primitives.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | computer-graphics-4e/02-primitives/cg4-04-attributes-algorithms.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | computer-graphics-4e/03-2d/cg4-05-2d-transformations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | computer-graphics-4e/03-2d/cg4-06-2d-viewing.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | computer-graphics-4e/04-3d/cg4-07-3d-transformations.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | computer-graphics-4e/04-3d/cg4-08-viewing-hierarchy.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | computer-graphics-4e/05-rendering/cg4-09-visible-surfaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | computer-graphics-4e/05-rendering/cg4-10-illumination-global.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | computer-graphics-4e/05-rendering/cg4-11-texture-color.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | computer-graphics-4e/06-applications/cg4-12-animation-modeling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | computer-graphics-4e/06-applications/cg4-13-input-shaders.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | computer-graphics-4e/06-applications/cg4-14-objects-splines-visualization.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 18.5 vulkan-guide（16 章 · 待修 16 章 · 16 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | vulkan-guide/01-introduction/vkg-ch01-vulkan-intro.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | vulkan-guide/01-introduction/vkg-ch02-first-program.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | vulkan-guide/02-device-setup/vkg-ch03-hardware-device.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | vulkan-guide/02-device-setup/vkg-ch04-debugging.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | vulkan-guide/03-memory-resources/vkg-ch05-command-memory.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | vulkan-guide/03-memory-resources/vkg-ch06-image-swapchain.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | vulkan-guide/04-pipeline-rendering/vkg-ch07-buffer-renderpass.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | vulkan-guide/04-pipeline-rendering/vkg-ch08-spirv-pipeline.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | vulkan-guide/04-pipeline-rendering/vkg-ch09-draw-geometry.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | vulkan-guide/05-textures-binding/vkg-ch10-textures-samplers.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | vulkan-guide/05-textures-binding/vkg-ch11-descriptor-binding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | vulkan-guide/06-sync-compute/vkg-ch12-synchronization.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | vulkan-guide/06-sync-compute/vkg-ch13-compute-pipeline.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | vulkan-guide/07-advanced-topics/vkg-ch14-multithreading.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | vulkan-guide/07-advanced-topics/vkg-ch15-advanced-rendering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | vulkan-guide/07-advanced-topics/vkg-ch16-mobile-vulkan.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 18.6 pbrt-book（16 章 · 待修 16 章 · 16 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | pbrt-book/01-foundations/pbt-ch01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | pbrt-book/01-foundations/pbt-ch02-monte-carlo.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | pbrt-book/01-foundations/pbt-ch03-geometry.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | pbrt-book/01-foundations/pbt-ch04-radiometry.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | pbrt-book/02-sampling/pbt-ch05-cameras.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | pbrt-book/02-sampling/pbt-ch06-shapes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | pbrt-book/02-sampling/pbt-ch07-acceleration.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | pbrt-book/02-sampling/pbt-ch08-sampling.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | pbrt-book/03-reflection/pbt-ch09-reflection.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | pbrt-book/03-reflection/pbt-ch10-textures-materials.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | pbrt-book/04-transport/pbt-ch11-volume-scattering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | pbrt-book/04-transport/pbt-ch12-light-sources.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | pbrt-book/05-integration/pbt-ch13-surface-transport.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | pbrt-book/05-integration/pbt-ch14-volume-transport.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | pbrt-book/05-integration/pbt-ch15-wavefront-gpu.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | pbrt-book/05-integration/pbt-ch16-retrospective.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 18.7 mobile-xr-web-optimization（19 章 · 待修 19 章 · 19 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | mobile-xr-web-optimization/00-guide/mxrw-01-introduction.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 2 | mobile-xr-web-optimization/00-guide/mxrw-official-learning-map.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 3 | mobile-xr-web-optimization/01-foundations/mxrw-02-choose-urp.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 4 | mobile-xr-web-optimization/01-foundations/mxrw-03-profiling-tips.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 5 | mobile-xr-web-optimization/01-foundations/mxrw-04-memory-management.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 6 | mobile-xr-web-optimization/01-foundations/mxrw-05-adaptive-performance.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 7 | mobile-xr-web-optimization/02-assets-code/mxrw-06-assets.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 8 | mobile-xr-web-optimization/02-assets-code/mxrw-07-programming-architecture.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 9 | mobile-xr-web-optimization/02-assets-code/mxrw-08-project-configuration.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 10 | mobile-xr-web-optimization/03-rendering/mxrw-09-graphics-gpu.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 11 | mobile-xr-web-optimization/03-rendering/mxrw-10-shaders.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 12 | mobile-xr-web-optimization/04-presentation/mxrw-11-user-interface.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 13 | mobile-xr-web-optimization/04-presentation/mxrw-12-audio.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 14 | mobile-xr-web-optimization/04-presentation/mxrw-13-animation.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 15 | mobile-xr-web-optimization/05-simulation/mxrw-14-physics.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 16 | mobile-xr-web-optimization/05-simulation/mxrw-15-workflow-collaboration.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 17 | mobile-xr-web-optimization/06-web/mxrw-16-unity-web.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 18 | mobile-xr-web-optimization/07-xr/mxrw-17-xr.mdx | §9缺Attribution | ⬜ 待修复 | — |
| 19 | mobile-xr-web-optimization/08-review/mxrw-official-final-review.mdx | §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 18.8 gpu-pro（14 章 · 待修 14 章 · 28 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | gpu-pro/00-guide/gpo-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | gpu-pro/01-foundation/gpo-data-compression.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | gpu-pro/01-foundation/gpo-geometry-terrain.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | gpu-pro/01-foundation/gpo-pipeline-visibility.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | gpu-pro/02-light/gpo-lighting-gi.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | gpu-pro/02-light/gpo-material-shading.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | gpu-pro/02-light/gpo-shadow-systems.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | gpu-pro/02-light/gpo-volume-environment.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | gpu-pro/03-screen/gpo-image-reconstruction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | gpu-pro/03-screen/gpo-transparency-raytracing.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | gpu-pro/04-engineering/gpo-compute-simulation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | gpu-pro/04-engineering/gpo-engine-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | gpu-pro/04-engineering/gpo-mobile-bandwidth.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | gpu-pro/05-review/gpo-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 18.9 real-time-collision-detection（17 章 · 待修 17 章 · 34 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | real-time-collision-detection/00-official-learning-map/rtcd-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | real-time-collision-detection/01-front-matter/rtcd-front-matter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | real-time-collision-detection/02-chapter-01-introduction/rtcd-chapter-01-introduction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | real-time-collision-detection/03-chapter-02-design-issues/rtcd-chapter-02-design-issues.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | real-time-collision-detection/04-chapter-03-math-geometry-primer/rtcd-chapter-03-math-geometry-primer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | real-time-collision-detection/05-chapter-04-bounding-volumes/rtcd-chapter-04-bounding-volumes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | real-time-collision-detection/06-chapter-05-basic-primitive-tests/rtcd-chapter-05-basic-primitive-tests.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | real-time-collision-detection/07-chapter-06-bounding-volume-hierarchies/rtcd-chapter-06-bounding-volume-hierarchies.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | real-time-collision-detection/08-chapter-07-spatial-partitioning/rtcd-chapter-07-spatial-partitioning.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | real-time-collision-detection/09-chapter-08-bsp-tree-hierarchies/rtcd-chapter-08-bsp-tree-hierarchies.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | real-time-collision-detection/10-chapter-09-convexity-methods/rtcd-chapter-09-convexity-methods.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | real-time-collision-detection/11-chapter-10-gpu-assisted/rtcd-chapter-10-gpu-assisted.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | real-time-collision-detection/12-chapter-11-numerical-robustness/rtcd-chapter-11-numerical-robustness.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | real-time-collision-detection/13-chapter-12-geometrical-robustness/rtcd-chapter-12-geometrical-robustness.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | real-time-collision-detection/14-chapter-13-optimization/rtcd-chapter-13-optimization.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | real-time-collision-detection/15-back-matter/rtcd-back-matter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | real-time-collision-detection/16-official-final-review/rtcd-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 18.10 blender-3d（17 章 · 待修 17 章 · 34 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | blender-3d/00-guide/bl3-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | blender-3d/01-basics/bl3-01-what-you-need-know-about-blender.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | blender-3d/01-basics/bl3-02-user-interface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | blender-3d/01-basics/bl3-03-first-scene.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | blender-3d/02-project-design/bl3-04-project-overview.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | blender-3d/02-project-design/bl3-05-character-design.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | blender-3d/03-modeling/bl3-06-modeling-tools.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | blender-3d/03-modeling/bl3-07-character-modeling.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | blender-3d/04-lookdev/bl3-08-unwrapping-uvs.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | blender-3d/04-lookdev/bl3-09-painting-textures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | blender-3d/04-lookdev/bl3-10-materials-shaders.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | blender-3d/05-rig-animation/bl3-11-character-rigging.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | blender-3d/05-rig-animation/bl3-12-animating-character.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | blender-3d/06-final/bl3-13-camera-tracking.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | blender-3d/06-final/bl3-14-lighting-compositing-rendering.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | blender-3d/07-extend-review/bl3-15-other-features.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | blender-3d/07-extend-review/bl3-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 18.11 shaderx（18 章 · 待修 18 章 · 36 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | shaderx/00-guide/sxx-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | shaderx/01-foundation/sxx-animation-deformation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | shaderx/01-foundation/sxx-geometry-data.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | shaderx/01-foundation/sxx-language-models.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | shaderx/02-rendering/sxx-lighting-gi.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | shaderx/02-rendering/sxx-material-surface.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | shaderx/02-rendering/sxx-terrain-displacement.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | shaderx/02-rendering/sxx-texture-representation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | shaderx/03-effects/sxx-environment-weather.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | shaderx/03-effects/sxx-image-post.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | shaderx/03-effects/sxx-particles-volume.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | shaderx/03-effects/sxx-shadow-systems.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | shaderx/03-effects/sxx-transparency-aa.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | shaderx/04-engineering/sxx-engine-architecture.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | shaderx/04-engineering/sxx-gpgpu-simulation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | shaderx/04-engineering/sxx-mobile-portability.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | shaderx/04-engineering/sxx-tools-performance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | shaderx/05-review/sxx-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 18.12 learnopengl（41 章 · 待修 29 章 · 39 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | learnopengl/advanced-lighting/blinn-phong.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 2 | learnopengl/advanced-lighting/bloom.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 3 | learnopengl/advanced-lighting/deferred-shading.mdx | §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 4 | learnopengl/advanced-lighting/gamma-correction.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 5 | learnopengl/advanced-lighting/hdr.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 6 | learnopengl/advanced-lighting/normal-mapping.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 7 | learnopengl/advanced-lighting/parallax-mapping.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 8 | learnopengl/advanced-lighting/point-shadows.mdx | §6超长块×1 | ⬜ 待修复 | — |
| 9 | learnopengl/advanced-lighting/shadow-mapping.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 10 | learnopengl/advanced-lighting/ssao.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 11 | learnopengl/advanced-opengl/advanced-data.mdx | §8缺独立题 | ⬜ 待修复 | — |
| 12 | learnopengl/advanced-opengl/advanced-glsl.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 13 | learnopengl/advanced-opengl/anti-aliasing.mdx | §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 14 | learnopengl/advanced-opengl/blending.mdx | — | ✅ 合规 | — |
| 15 | learnopengl/advanced-opengl/cubemaps.mdx | — | ✅ 合规 | — |
| 16 | learnopengl/advanced-opengl/depth-testing.mdx | §7误区<3 §8缺独立题 | ⬜ 待修复 | — |
| 17 | learnopengl/advanced-opengl/face-culling.mdx | §8缺独立题 | ⬜ 待修复 | — |
| 18 | learnopengl/advanced-opengl/framebuffers.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 19 | learnopengl/advanced-opengl/geometry-shader.mdx | — | ✅ 合规 | — |
| 20 | learnopengl/advanced-opengl/instancing.mdx | — | ✅ 合规 | — |
| 21 | learnopengl/advanced-opengl/stencil-testing.mdx | §8缺独立题 | ⬜ 待修复 | — |
| 22 | learnopengl/getting-started/camera.mdx | §6超长块×1 | ⬜ 待修复 | — |
| 23 | learnopengl/getting-started/coordinate-systems.mdx | §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 24 | learnopengl/getting-started/hello-triangle.mdx | — | ✅ 合规 | — |
| 25 | learnopengl/getting-started/hello-window.mdx | §8缺独立题 | ⬜ 待修复 | — |
| 26 | learnopengl/getting-started/shaders.mdx | — | ✅ 合规 | — |
| 27 | learnopengl/getting-started/textures.mdx | — | ✅ 合规 | — |
| 28 | learnopengl/getting-started/transformations.mdx | §8缺独立题 | ⬜ 待修复 | — |
| 29 | learnopengl/lighting/basic-lighting.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 30 | learnopengl/lighting/colors.mdx | §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 31 | learnopengl/lighting/light-casters.mdx | — | ✅ 合规 | — |
| 32 | learnopengl/lighting/lighting-maps.mdx | §8小结>5条 §8练习数不符 | ⬜ 待修复 | — |
| 33 | learnopengl/lighting/materials.mdx | — | ✅ 合规 | — |
| 34 | learnopengl/lighting/multiple-lights.mdx | — | ✅ 合规 | — |
| 35 | learnopengl/model-loading/assimp.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 36 | learnopengl/model-loading/mesh.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 37 | learnopengl/model-loading/model.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 38 | learnopengl/pbr/ibl-diffuse-irradiance.mdx | — | ✅ 合规 | — |
| 39 | learnopengl/pbr/ibl-specular.mdx | — | ✅ 合规 | — |
| 40 | learnopengl/pbr/lighting.mdx | §8无要点 | ⬜ 待修复 | — |
| 41 | learnopengl/pbr/theory.mdx | §6超长块×1 §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 18.13 shader-practice（21 章 · 待修 21 章 · 42 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | shader-practice/00-guide/psd-official-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | shader-practice/01-foundations/psd-01-hello-game-graphics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 3 | shader-practice/01-foundations/psd-02-first-shaders.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | shader-practice/01-foundations/psd-03-using-textures.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | shader-practice/01-foundations/psd-04-translucency-depth.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | shader-practice/01-foundations/psd-05-making-things-move.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | shader-practice/01-foundations/psd-06-cameras-coordinates.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | shader-practice/02-lighting/psd-07-first-3d-project.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | shader-practice/02-lighting/psd-08-diffuse-lighting.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | shader-practice/02-lighting/psd-09-first-lighting-model.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | shader-practice/02-lighting/psd-10-normal-mapping.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | shader-practice/02-lighting/psd-11-cubemaps-skyboxes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | shader-practice/02-lighting/psd-12-lighting-in-depth.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | shader-practice/03-performance/psd-13-profiling-shaders.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | shader-practice/03-performance/psd-14-optimizing-shaders.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | shader-practice/03-performance/psd-15-precision.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 17 | shader-practice/04-engines/psd-16-writing-shaders-unity.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | shader-practice/04-engines/psd-17-writing-shaders-ue4.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | shader-practice/04-engines/psd-18-writing-shaders-godot.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | shader-practice/04-engines/psd-appendix-a-code-snippets.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | shader-practice/05-review/psd-official-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 18.14 opengl-redbook（18 章 · 待修 18 章 · 90 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | opengl-redbook/01-fundamentals/oglrb-ch01-intro.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | opengl-redbook/01-fundamentals/oglrb-ch02-shaders.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | opengl-redbook/01-fundamentals/oglrb-ch03-drawing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | opengl-redbook/01-fundamentals/oglrb-ch04-viewing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | opengl-redbook/02-lighting-texture/oglrb-ch05-lighting.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | opengl-redbook/02-lighting-texture/oglrb-ch06-texturing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | opengl-redbook/02-lighting-texture/oglrb-ch07-advanced-render.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | opengl-redbook/02-lighting-texture/oglrb-ch08-framebuffers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | opengl-redbook/03-compute-geometry/oglrb-ch09-compute.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | opengl-redbook/03-compute-geometry/oglrb-ch10-geometry-tess.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | opengl-redbook/03-compute-geometry/oglrb-ch11-buffers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | opengl-redbook/03-compute-geometry/oglrb-ch12-techniques.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | opengl-redbook/04-systems/oglrb-ch13-debug-perf.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | opengl-redbook/04-systems/oglrb-ch14-sync.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | opengl-redbook/04-systems/oglrb-ch15-platform.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | opengl-redbook/04-systems/oglrb-ch16-es.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | opengl-redbook/04-systems/oglrb-ch17-webgl.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | opengl-redbook/04-systems/oglrb-ch18-future.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 18.15 opengl-superbible（18 章 · 待修 18 章 · 90 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | opengl-superbible/01-basics/oglsb-ch01-intro.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | opengl-superbible/01-basics/oglsb-ch02-first-program.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | opengl-superbible/01-basics/oglsb-ch03-data-flow.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | opengl-superbible/01-basics/oglsb-ch04-math.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | opengl-superbible/02-rendering/oglsb-ch05-3d-data.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | opengl-superbible/02-rendering/oglsb-ch06-shaders.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | opengl-superbible/02-rendering/oglsb-ch07-vertex.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | opengl-superbible/02-rendering/oglsb-ch08-fragment.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | opengl-superbible/03-textures/oglsb-ch09-texturing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | opengl-superbible/03-textures/oglsb-ch10-framebuffers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | opengl-superbible/04-advanced/oglsb-ch11-debugging.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | opengl-superbible/04-advanced/oglsb-ch12-performance.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | opengl-superbible/04-advanced/oglsb-ch13-geometry.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | opengl-superbible/04-advanced/oglsb-ch14-shading.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | opengl-superbible/05-specialized/oglsb-ch15-compute.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | opengl-superbible/05-specialized/oglsb-ch16-techniques.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | opengl-superbible/05-specialized/oglsb-ch17-mobile.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | opengl-superbible/05-specialized/oglsb-ch18-future.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 18.16 real-time-rendering-4e（24 章 · 待修 24 章 · 120 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | real-time-rendering-4e/01-pipeline/rtr-ch01-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | real-time-rendering-4e/01-pipeline/rtr-ch02-pipeline.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | real-time-rendering-4e/01-pipeline/rtr-ch03-gpu.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | real-time-rendering-4e/01-pipeline/rtr-ch04-transforms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | real-time-rendering-4e/02-shading/rtr-ch05-shading-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | real-time-rendering-4e/02-shading/rtr-ch06-texturing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | real-time-rendering-4e/02-shading/rtr-ch07-shadows.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | real-time-rendering-4e/02-shading/rtr-ch08-light-color.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | real-time-rendering-4e/02-shading/rtr-ch09-pbs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | real-time-rendering-4e/03-illumination/rtr-ch10-local.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | real-time-rendering-4e/03-illumination/rtr-ch11-global.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | real-time-rendering-4e/03-illumination/rtr-ch12-image-space.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | real-time-rendering-4e/04-geometry/rtr-ch13-beyond-polygons.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | real-time-rendering-4e/04-geometry/rtr-ch14-volumetric.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | real-time-rendering-4e/04-geometry/rtr-ch15-npr.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | real-time-rendering-4e/05-optimization/rtr-ch16-polygon.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | real-time-rendering-4e/05-optimization/rtr-ch17-curves.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | real-time-rendering-4e/05-optimization/rtr-ch18-pipeline-opt.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | real-time-rendering-4e/05-optimization/rtr-ch19-acceleration.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | real-time-rendering-4e/05-optimization/rtr-ch20-efficient-shading.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | real-time-rendering-4e/06-emerging/rtr-ch21-vr-ar.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | real-time-rendering-4e/06-emerging/rtr-ch22-intersection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | real-time-rendering-4e/06-emerging/rtr-ch23-hardware.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | real-time-rendering-4e/06-emerging/rtr-ch24-future.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 18.17 cg-principles-practice（25 章 · 待修 25 章 · 125 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cg-principles-practice/01-intro/cgpp-ch01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | cg-principles-practice/02-programming/cgpp-ch02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | cg-principles-practice/03-pipeline/cgpp-ch03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | cg-principles-practice/04-math/cgpp-ch04.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | cg-principles-practice/05-camera/cgpp-ch05.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | cg-principles-practice/06-viewing/cgpp-ch06.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cg-principles-practice/07-object/cgpp-ch07.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | cg-principles-practice/08-raster/cgpp-ch08.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | cg-principles-practice/09-fragment/cgpp-ch09.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | cg-principles-practice/10-framebuffer/cgpp-ch10.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | cg-principles-practice/11-display/cgpp-ch11.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | cg-principles-practice/12-image/cgpp-ch12.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | cg-principles-practice/13-geometry/cgpp-ch13.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | cg-principles-practice/14-texture/cgpp-ch14.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | cg-principles-practice/15-lighting/cgpp-ch15.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | cg-principles-practice/16-shading/cgpp-ch16.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | cg-principles-practice/17-color/cgpp-ch17.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | cg-principles-practice/18-compositing/cgpp-ch18.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | cg-principles-practice/19-animation/cgpp-ch19.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | cg-principles-practice/20-modeling/cgpp-ch20.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | cg-principles-practice/21-rendering/cgpp-ch21.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | cg-principles-practice/22-raytracing/cgpp-ch22.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | cg-principles-practice/23-radiosity/cgpp-ch23.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | cg-principles-practice/24-gi/cgpp-ch24.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 25 | cg-principles-practice/25-future/cgpp-ch25.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 18.18 gpu-gems（48 章 · 待修 48 章 · 240 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | gpu-gems/01-natural-effects/gpugems-ch01.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | gpu-gems/01-natural-effects/gpugems-ch02.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | gpu-gems/01-natural-effects/gpugems-ch03.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | gpu-gems/01-natural-effects/gpugems-ch04.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | gpu-gems/01-natural-effects/gpugems-ch05.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | gpu-gems/02-lighting-shadows/gpugems-ch06.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | gpu-gems/02-lighting-shadows/gpugems-ch07.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | gpu-gems/02-lighting-shadows/gpugems-ch08.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | gpu-gems/02-lighting-shadows/gpugems-ch09.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | gpu-gems/02-lighting-shadows/gpugems-ch10.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | gpu-gems/02-lighting-shadows/gpugems-ch11.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | gpu-gems/02-lighting-shadows/gpugems-ch12.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | gpu-gems/03-materials/gpugems-ch13.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | gpu-gems/03-materials/gpugems-ch14.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | gpu-gems/03-materials/gpugems-ch15.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | gpu-gems/03-materials/gpugems-ch16.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | gpu-gems/04-image-processing/gpugems-ch17.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | gpu-gems/04-image-processing/gpugems-ch18.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | gpu-gems/04-image-processing/gpugems-ch19.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | gpu-gems/04-image-processing/gpugems-ch20.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | gpu-gems/04-image-processing/gpugems-ch21.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | gpu-gems/05-performance/gpugems-ch22.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | gpu-gems/05-performance/gpugems-ch23.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | gpu-gems/05-performance/gpugems-ch24.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 25 | gpu-gems/05-performance/gpugems-ch25.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 26 | gpu-gems/05-performance/gpugems-ch26.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 27 | gpu-gems/06-beyond-triangles/gpugems-ch27.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 28 | gpu-gems/06-beyond-triangles/gpugems-ch28.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 29 | gpu-gems/06-beyond-triangles/gpugems-ch29.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 30 | gpu-gems/06-beyond-triangles/gpugems-ch30.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 31 | gpu-gems/06-beyond-triangles/gpugems-ch31.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 32 | gpu-gems/07-simulation/gpugems-ch32.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 33 | gpu-gems/07-simulation/gpugems-ch33.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 34 | gpu-gems/07-simulation/gpugems-ch34.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 35 | gpu-gems/07-simulation/gpugems-ch35.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 36 | gpu-gems/07-simulation/gpugems-ch36.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 37 | gpu-gems/07-simulation/gpugems-ch37.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 38 | gpu-gems/07-simulation/gpugems-ch38.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 39 | gpu-gems/08-rendering-techniques/gpugems-ch39.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 40 | gpu-gems/08-rendering-techniques/gpugems-ch40.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 41 | gpu-gems/08-rendering-techniques/gpugems-ch41.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 42 | gpu-gems/08-rendering-techniques/gpugems-ch42.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 43 | gpu-gems/08-rendering-techniques/gpugems-ch43.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 44 | gpu-gems/08-rendering-techniques/gpugems-ch44.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 45 | gpu-gems/08-rendering-techniques/gpugems-ch45.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 46 | gpu-gems/08-rendering-techniques/gpugems-ch46.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 47 | gpu-gems/08-rendering-techniques/gpugems-ch47.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 48 | gpu-gems/08-rendering-techniques/gpugems-ch48.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—


## 系列 19：C/C++ 系列（18 本 · 328 章待修 · 1461 项）

**系列状态**：待开始

### 19.1 cpp-server-essence（11 章 · 待修 11 章 · 30 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpp-server-essence/00-intro/cse-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | cpp-server-essence/01-official/cpp-must-know.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | cpp-server-essence/02-official/backend-tools-debugging.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 4 | cpp-server-essence/03-engineering/cse-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | cpp-server-essence/03-official/multithreading-resource-sync.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | cpp-server-essence/04-official/network-programming-hard-points.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cpp-server-essence/05-official/network-troubleshooting-commands.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | cpp-server-essence/06-official/network-protocol-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | cpp-server-essence/07-official/single-service-structure.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | cpp-server-essence/08-official/redis-network-module-source-analysis.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | cpp-server-essence/09-official/common-server-module-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.2 cpp-concurrency（12 章 · 待修 12 章 · 34 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpp-concurrency/advanced/designing-concurrent-code.mdx | §6超长块×1 §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | cpp-concurrency/advanced/parallel-algorithms.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | cpp-concurrency/advanced/testing-debugging.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | cpp-concurrency/advanced/thread-pools.mdx | §6超长块×4 §6缺CodeTabs §8缺小结 | ⬜ 待修复 | — |
| 5 | cpp-concurrency/data-structures/lock-based.mdx | §6超长块×2 §6缺CodeTabs §8缺小结 | ⬜ 待修复 | — |
| 6 | cpp-concurrency/data-structures/lock-free.mdx | §6超长块×1 §6缺CodeTabs | ⬜ 待修复 | — |
| 7 | cpp-concurrency/fundamentals/hello-concurrency.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | cpp-concurrency/fundamentals/managing-threads.mdx | §6缺CodeTabs §8缺小结 | ⬜ 待修复 | — |
| 9 | cpp-concurrency/memory-model/atomic-types.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | cpp-concurrency/memory-model/memory-ordering.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | cpp-concurrency/shared-data/protecting-shared-data.mdx | §6缺CodeTabs §8缺小结 | ⬜ 待修复 | — |
| 12 | cpp-concurrency/shared-data/synchronizing-operations.mdx | §6超长块×1 §6缺CodeTabs §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 19.3 cpu-eye-cpp（8 章 · 待修 8 章 · 36 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpu-eye-cpp/00-intro/learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | cpu-eye-cpp/01-prerequisites/prerequisites.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | cpu-eye-cpp/02-basic-syntax/basic-syntax.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | cpu-eye-cpp/03-function-principles/function-principles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | cpu-eye-cpp/04-cpp-features/cpp-features.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | cpu-eye-cpp/05-advanced-programming/advanced-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cpu-eye-cpp/06-interview-challenges/interview-challenges.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | cpu-eye-cpp/07-review/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.4 the-c-programming-language（10 章 · 待修 10 章 · 41 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | the-c-programming-language/00-overview/learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | the-c-programming-language/01-types/types-operators.mdx | §6缺CodeTabs §7缺误区 §8缺独立题 | ⬜ 待修复 | — |
| 3 | the-c-programming-language/02-control/control-flow.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | the-c-programming-language/02-control/functions-program.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | the-c-programming-language/03-pointers/pointer-arithmetic.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | the-c-programming-language/03-pointers/pointers-arrays.mdx | §6缺CodeTabs §7缺误区 §8缺独立题 | ⬜ 待修复 | — |
| 7 | the-c-programming-language/04-struct-io/final-review.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | the-c-programming-language/04-struct-io/input-output.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | the-c-programming-language/04-struct-io/structures.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | the-c-programming-language/04-struct-io/unix-interface.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.5 inside-cpp-object-model（9 章 · 待修 9 章 · 45 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | inside-cpp-object-model/00-foundations/learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | inside-cpp-object-model/01-official/object-lessons.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | inside-cpp-object-model/02-official/semantics-of-constructors.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | inside-cpp-object-model/02-runtime/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | inside-cpp-object-model/03-official/semantics-of-data.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | inside-cpp-object-model/04-official/semantics-of-function.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | inside-cpp-object-model/05-official/construction-destruction-copy.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | inside-cpp-object-model/06-official/runtime-semantics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | inside-cpp-object-model/07-official/cusp-of-object-model.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.6 c-primer-plus（17 章 · 待修 17 章 · 48 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | c-primer-plus/c-advanced/advanced-data.mdx | §6超长块×2 §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 2 | c-primer-plus/c-advanced/bit-fiddling.mdx | §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 3 | c-primer-plus/c-advanced/file-io.mdx | §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 4 | c-primer-plus/c-advanced/preprocessor.mdx | §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 5 | c-primer-plus/c-advanced/storage-linkage-memory.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 6 | c-primer-plus/c-advanced/structures.mdx | §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 7 | c-primer-plus/c-basics/data-and-c.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 8 | c-primer-plus/c-basics/getting-ready.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 9 | c-primer-plus/c-basics/introducing-c.mdx | §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 10 | c-primer-plus/c-basics/operators-expressions.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 11 | c-primer-plus/c-basics/strings-io.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 12 | c-primer-plus/c-control-io/char-io-validation.mdx | §6超长块×4 §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 13 | c-primer-plus/c-control-io/control-branching.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 14 | c-primer-plus/c-control-io/control-loops.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 15 | c-primer-plus/c-func-array-ptr/arrays-pointers.mdx | §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 16 | c-primer-plus/c-func-array-ptr/functions.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 17 | c-primer-plus/c-func-array-ptr/strings-functions.mdx | §6缺CodeTabs §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.7 cpp-primer-5e（20 章 · 待修 20 章 · 48 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpp-primer-5e/cpp-advanced/large-programs.mdx | §6超长块×1 §6缺CodeTabs | ⬜ 待修复 | — |
| 2 | cpp-primer-5e/cpp-advanced/library-appendix.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 3 | cpp-primer-5e/cpp-advanced/specialized-library.mdx | §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 4 | cpp-primer-5e/cpp-advanced/specialized-tools.mdx | §6超长块×1 §6缺CodeTabs | ⬜ 待修复 | — |
| 5 | cpp-primer-5e/cpp-basics/classes.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 6 | cpp-primer-5e/cpp-basics/expressions.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cpp-primer-5e/cpp-basics/functions.mdx | §6缺CodeTabs | ⬜ 待修复 | — |
| 8 | cpp-primer-5e/cpp-basics/getting-started.mdx | §6缺CodeTabs §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | cpp-primer-5e/cpp-basics/statements.mdx | §6缺CodeTabs | ⬜ 待修复 | — |
| 10 | cpp-primer-5e/cpp-basics/strings-vectors-and-arrays.mdx | §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 11 | cpp-primer-5e/cpp-basics/variables-and-types.mdx | §6缺CodeTabs §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | cpp-primer-5e/cpp-class-design/copy-control.mdx | §6超长块×2 §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 13 | cpp-primer-5e/cpp-class-design/oop.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 14 | cpp-primer-5e/cpp-class-design/overloaded-operations.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 15 | cpp-primer-5e/cpp-class-design/templates.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 16 | cpp-primer-5e/cpp-library/associative-containers.mdx | §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 17 | cpp-primer-5e/cpp-library/dynamic-memory.mdx | §6缺CodeTabs §8缺独立题 | ⬜ 待修复 | — |
| 18 | cpp-primer-5e/cpp-library/generic-algorithms.mdx | §6超长块×1 §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |
| 19 | cpp-primer-5e/cpp-library/io-library.mdx | §6超长块×1 §6缺CodeTabs | ⬜ 待修复 | — |
| 20 | cpp-primer-5e/cpp-library/sequential-containers.mdx | §6缺CodeTabs §8小结>5条 | ⬜ 待修复 | — |

**部署记录**：—

### 19.8 cpp-testing-recipes（13 章 · 待修 11 章 · 51 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpp-testing-recipes/00-intro/learning-map.mdx | — | ✅ 合规 | — |
| 2 | cpp-testing-recipes/01-official/global-setup.mdx | — | ✅ 合规 | — |
| 3 | cpp-testing-recipes/02-official/tdd-first-example.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | cpp-testing-recipes/03-official/tdd-foundations.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | cpp-testing-recipes/04-official/test-construction.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | cpp-testing-recipes/05-official/test-doubles.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cpp-testing-recipes/06-official/incremental-design.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | cpp-testing-recipes/07-official/quality-tests.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | cpp-testing-recipes/08-official/legacy-challenges.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | cpp-testing-recipes/09-official/tdd-and-threading.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | cpp-testing-recipes/10-official/additional-tdd-concepts.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | cpp-testing-recipes/11-official/growing-and-sustaining-tdd.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 13 | cpp-testing-recipes/99-review/final-review.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.9 cpp-high-performance（13 章 · 待修 13 章 · 57 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpp-high-performance/00-fundamentals/learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | cpp-high-performance/01-official/brief-introduction-to-cpp.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | cpp-high-performance/02-official/modern-cpp-concepts.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | cpp-high-performance/03-advanced/final-review.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | cpp-high-performance/03-official/measuring-performance.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | cpp-high-performance/04-official/data-structures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cpp-high-performance/05-official/deeper-look-at-iterators.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | cpp-high-performance/06-official/stl-algorithms-and-beyond.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | cpp-high-performance/07-official/memory-management.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | cpp-high-performance/08-official/metaprogramming-compile-time.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | cpp-high-performance/09-official/proxy-objects-lazy-evaluation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | cpp-high-performance/10-official/concurrency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | cpp-high-performance/11-official/parallel-stl.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.10 easy-cpp-5e（18 章 · 待修 15 章 · 60 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | easy-cpp-5e/00-intro/learning-map.mdx | — | ✅ 合规 | — |
| 2 | easy-cpp-5e/01-official/first-steps.mdx | — | ✅ 合规 | — |
| 3 | easy-cpp-5e/02-official/cpp-basics.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | easy-cpp-5e/03-advanced/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | easy-cpp-5e/03-official/variables.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | easy-cpp-5e/04-official/expressions-and-operators.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | easy-cpp-5e/05-official/conditional-processing.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | easy-cpp-5e/06-official/repetition.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | easy-cpp-5e/07-official/functions.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | easy-cpp-5e/08-official/pointers.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | easy-cpp-5e/09-official/arrays.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | easy-cpp-5e/10-official/building-large-programs.mdx | — | ✅ 合规 | — |
| 13 | easy-cpp-5e/11-official/various-types.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | easy-cpp-5e/12-official/class-basics.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | easy-cpp-5e/13-official/class-features.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | easy-cpp-5e/14-official/new-classes.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | easy-cpp-5e/15-official/advanced-class-topics.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | easy-cpp-5e/16-official/file-input-output.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.11 modern-cpp-design（13 章 · 待修 13 章 · 65 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | modern-cpp-design/00-intro/learning-map.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | modern-cpp-design/01-official/policy-based-class-design.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | modern-cpp-design/02-official/techniques.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | modern-cpp-design/03-official/typelists.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | modern-cpp-design/03-patterns/final-review.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | modern-cpp-design/04-official/small-object-allocation.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | modern-cpp-design/05-official/generalized-functors.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | modern-cpp-design/06-official/implementing-singletons.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | modern-cpp-design/07-official/smart-pointers.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | modern-cpp-design/08-official/object-factories.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | modern-cpp-design/09-official/abstract-factory.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | modern-cpp-design/10-official/visitor.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | modern-cpp-design/11-official/multimethods.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.12 cpp-primer-plus（20 章 · 待修 18 章 · 73 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | cpp-primer-plus/00-intro/learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | cpp-primer-plus/01-official/getting-started-with-cpp.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | cpp-primer-plus/02-official/setting-out-to-cpp.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | cpp-primer-plus/03-advanced/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | cpp-primer-plus/03-official/dealing-with-data.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | cpp-primer-plus/04-official/compound-types.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | cpp-primer-plus/05-official/loops-and-relational-expressions.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | cpp-primer-plus/06-official/branching-statements-and-logical-operators.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | cpp-primer-plus/07-official/functions-programming-modules.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | cpp-primer-plus/08-official/adventures-in-functions.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | cpp-primer-plus/09-official/memory-models-and-namespaces.mdx | — | ✅ 合规 | — |
| 12 | cpp-primer-plus/10-official/objects-and-classes.mdx | §8小结>5条 | ⬜ 待修复 | — |
| 13 | cpp-primer-plus/11-official/working-with-classes.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | cpp-primer-plus/12-official/classes-and-dynamic-memory-allocation.mdx | — | ✅ 合规 | — |
| 15 | cpp-primer-plus/13-official/class-inheritance.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | cpp-primer-plus/14-official/reusing-code-in-cpp.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | cpp-primer-plus/15-official/friends-exceptions-and-more.mdx | §6缺CodeTabs §7缺误区 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | cpp-primer-plus/16-official/string-class-and-stl.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | cpp-primer-plus/17-official/input-output-and-files.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | cpp-primer-plus/18-official/visiting-new-cpp-standard.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.13 optimized-cpp（15 章 · 待修 15 章 · 75 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | optimized-cpp/00-intro/learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | optimized-cpp/01-official/overview-of-optimization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | optimized-cpp/02-official/computer-behavior.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | optimized-cpp/03-official/measure-performance.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | optimized-cpp/04-official/optimize-string-use.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | optimized-cpp/05-official/optimize-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | optimized-cpp/05-practice/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | optimized-cpp/06-official/dynamically-allocated-variables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | optimized-cpp/07-official/optimize-hot-statements.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | optimized-cpp/08-official/use-better-libraries.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | optimized-cpp/09-official/searching-and-sorting.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | optimized-cpp/10-official/optimize-data-structures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | optimized-cpp/11-official/optimize-io.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | optimized-cpp/12-official/optimize-concurrency.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | optimized-cpp/13-official/optimize-memory-management.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.14 dsa-cpp（13 章 · 待修 13 章 · 78 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | dsa-cpp/00-introduction/algorithm-analysis.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | dsa-cpp/00-introduction/introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | dsa-cpp/01-linear-structures/lists-stacks-queues.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | dsa-cpp/01-linear-structures/trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | dsa-cpp/02-hashing-heaps/hashing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | dsa-cpp/02-hashing-heaps/priority-queues-heaps.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | dsa-cpp/03-algorithms/disjoint-set-class.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | dsa-cpp/03-algorithms/graph-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | dsa-cpp/03-algorithms/sorting.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | dsa-cpp/04-design-analysis/algorithm-design-techniques.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | dsa-cpp/04-design-analysis/amortized-analysis.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | dsa-cpp/05-advanced/advanced-data-structures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | dsa-cpp/05-advanced/separate-compilation-class-templates.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 19.15 beginning-cpp-game-programming（23 章 · 待修 21 章 · 89 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | beginning-cpp-game-programming/00-fundamentals/classes-oop.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | beginning-cpp-game-programming/00-fundamentals/flow-control.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | beginning-cpp-game-programming/00-fundamentals/functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | beginning-cpp-game-programming/00-fundamentals/learning-map.mdx | — | ✅ 合规 | — |
| 5 | beginning-cpp-game-programming/00-fundamentals/types-variables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | beginning-cpp-game-programming/01-game-basics/collision-detection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | beginning-cpp-game-programming/01-game-basics/game-loop.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | beginning-cpp-game-programming/01-game-basics/graphics-sfml.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | beginning-cpp-game-programming/01-game-basics/timber-finale.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | beginning-cpp-game-programming/01-game-basics/zombie-views.mdx | §6缺CodeTabs §7缺误区 §8缺独立题 | ⬜ 待修复 | — |
| 11 | beginning-cpp-game-programming/02-project/final-review.mdx | — | ✅ 合规 | — |
| 12 | beginning-cpp-game-programming/02-project/fireballs-spatialization.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | beginning-cpp-game-programming/02-project/game-project.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | beginning-cpp-game-programming/02-project/graphics-cameras-action.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | beginning-cpp-game-programming/02-project/layered-hud.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 16 | beginning-cpp-game-programming/02-project/menu-rain.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | beginning-cpp-game-programming/02-project/parallax-shaders.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | beginning-cpp-game-programming/02-project/pickups-bullets.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 19 | beginning-cpp-game-programming/02-project/platforms-player-animation-controls.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | beginning-cpp-game-programming/02-project/pointers-stl.mdx | §6缺CodeTabs §7缺误区 §8缺独立题 | ⬜ 待修复 | — |
| 21 | beginning-cpp-game-programming/02-project/sound-file-io.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 22 | beginning-cpp-game-programming/02-project/sound-game-logic.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | beginning-cpp-game-programming/02-project/texture-holder.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.16 hackers-delight（21 章 · 待修 21 章 · 126 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | hackers-delight/01-foundations/01-introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | hackers-delight/02-bit-foundations/02-basics.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | hackers-delight/03-boundaries/03-power-of-2-boundaries.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | hackers-delight/04-arithmetic-bounds/04-arithmetic-bounds.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | hackers-delight/05-bit-counting/05-counting-bits.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | hackers-delight/06-word-search/06-searching-words.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | hackers-delight/07-rearrangement/07-rearranging-bits-and-bytes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | hackers-delight/08-multiplication/08-multiplication.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | hackers-delight/09-integer-division/09-integer-division.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | hackers-delight/10-constant-division/10-integer-division-by-constants.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | hackers-delight/11-elementary-functions/11-some-elementary-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | hackers-delight/12-unusual-bases/12-unusual-bases-for-number-systems.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | hackers-delight/13-gray-code/13-gray-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | hackers-delight/14-cyclic-redundancy-check/14-cyclic-redundancy-check.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | hackers-delight/15-error-correcting-codes/15-error-correcting-codes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | hackers-delight/16-hilberts-curve/16-hilberts-curve.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | hackers-delight/17-floating-point/17-floating-point.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | hackers-delight/18-formulas-for-primes/18-formulas-for-primes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | hackers-delight/19-appendix-a/appendix-a-arithmetic-tables-for-a-4-bit-machine.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | hackers-delight/20-appendix-b/appendix-b-newtons-method.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 21 | hackers-delight/21-appendix-c/appendix-c-a-gallery-of-graphs-of-discrete-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 19.17 effective-modern-cpp（44 章 · 待修 44 章 · 220 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | effective-modern-cpp/00-deducing-types/item-01-template-type-deduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | effective-modern-cpp/00-deducing-types/item-02-auto-type-deduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | effective-modern-cpp/00-deducing-types/item-03-understand-decltype.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | effective-modern-cpp/00-deducing-types/item-04-view-deduced-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | effective-modern-cpp/00-intro/learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | effective-modern-cpp/01-auto/item-05-prefer-auto.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | effective-modern-cpp/01-auto/item-06-explicitly-typed-initializer.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | effective-modern-cpp/02-moving-to-modern-cpp/item-07-parentheses-vs-braces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | effective-modern-cpp/02-moving-to-modern-cpp/item-08-prefer-nullptr.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | effective-modern-cpp/02-moving-to-modern-cpp/item-09-alias-declarations.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | effective-modern-cpp/02-moving-to-modern-cpp/item-10-scoped-enums.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | effective-modern-cpp/02-moving-to-modern-cpp/item-11-deleted-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | effective-modern-cpp/02-moving-to-modern-cpp/item-12-override.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | effective-modern-cpp/02-moving-to-modern-cpp/item-13-const-iterators.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | effective-modern-cpp/02-moving-to-modern-cpp/item-14-noexcept.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | effective-modern-cpp/02-moving-to-modern-cpp/item-15-constexpr.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | effective-modern-cpp/02-moving-to-modern-cpp/item-16-const-thread-safe.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | effective-modern-cpp/02-moving-to-modern-cpp/item-17-special-member-generation.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | effective-modern-cpp/03-smart-pointers/item-18-unique-ptr.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | effective-modern-cpp/03-smart-pointers/item-19-shared-ptr.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | effective-modern-cpp/03-smart-pointers/item-20-weak-ptr.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | effective-modern-cpp/03-smart-pointers/item-21-make-smart-pointers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | effective-modern-cpp/03-smart-pointers/item-22-pimpl-special-members.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | effective-modern-cpp/04-concurrency/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 25 | effective-modern-cpp/04-rvalue-references/item-23-move-forward.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 26 | effective-modern-cpp/04-rvalue-references/item-24-forwarding-vs-rvalue-references.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 27 | effective-modern-cpp/04-rvalue-references/item-25-move-rvalue-forward-universal.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 28 | effective-modern-cpp/04-rvalue-references/item-26-avoid-forwarding-overloads.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 29 | effective-modern-cpp/04-rvalue-references/item-27-forwarding-overload-alternatives.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 30 | effective-modern-cpp/04-rvalue-references/item-28-reference-collapsing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 31 | effective-modern-cpp/04-rvalue-references/item-29-assume-move-absent-costly-unused.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 32 | effective-modern-cpp/04-rvalue-references/item-30-perfect-forwarding-failure-cases.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 33 | effective-modern-cpp/05-lambda-expressions/item-31-avoid-default-capture-modes.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 34 | effective-modern-cpp/05-lambda-expressions/item-32-init-capture-move-into-closures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 35 | effective-modern-cpp/05-lambda-expressions/item-33-decltype-auto-forward-generic-lambda.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 36 | effective-modern-cpp/05-lambda-expressions/item-34-prefer-lambdas-to-std-bind.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 37 | effective-modern-cpp/06-concurrency/item-35-prefer-task-based-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 38 | effective-modern-cpp/06-concurrency/item-36-specify-launch-async.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 39 | effective-modern-cpp/06-concurrency/item-37-make-threads-unjoinable.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 40 | effective-modern-cpp/06-concurrency/item-38-thread-handle-destructor-behavior.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 41 | effective-modern-cpp/06-concurrency/item-39-void-futures-one-shot-events.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 42 | effective-modern-cpp/06-concurrency/item-40-atomic-vs-volatile.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 43 | effective-modern-cpp/07-tweaks/item-41-pass-by-value-cheap-move.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 44 | effective-modern-cpp/07-tweaks/item-42-consider-emplacement.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 19.18 effective-cpp（57 章 · 待修 57 章 · 285 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | effective-cpp/00-accustoming/item-01-language-federation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | effective-cpp/00-accustoming/item-02-const-enum-inline.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | effective-cpp/00-accustoming/item-03-use-const.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | effective-cpp/00-accustoming/item-04-initialize-objects.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | effective-cpp/00-intro/learning-map.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | effective-cpp/01-special-members/item-05-compiler-generated-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | effective-cpp/01-special-members/item-06-disallow-generated-functions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | effective-cpp/01-special-members/item-07-virtual-destructor.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | effective-cpp/01-special-members/item-08-destructor-exceptions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | effective-cpp/01-special-members/item-09-no-virtual-in-ctor-dtor.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | effective-cpp/01-special-members/item-10-assignment-return-this.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | effective-cpp/01-special-members/item-11-self-assignment.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | effective-cpp/01-special-members/item-12-copy-all-parts.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | effective-cpp/02-resource-management/item-13-resource-managing-objects.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | effective-cpp/02-resource-management/item-14-resource-copying.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | effective-cpp/02-resource-management/item-15-raw-resource-access.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | effective-cpp/02-resource-management/item-16-match-new-delete.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | effective-cpp/02-resource-management/item-17-smart-pointer-statement.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | effective-cpp/03-designs-declarations/item-18-easy-correct-interfaces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | effective-cpp/03-designs-declarations/item-19-class-design-type-design.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | effective-cpp/03-designs-declarations/item-20-pass-by-reference-to-const.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | effective-cpp/03-designs-declarations/item-21-return-object-not-reference.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | effective-cpp/03-designs-declarations/item-22-private-data-members.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | effective-cpp/03-designs-declarations/item-23-non-member-non-friend.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 25 | effective-cpp/03-designs-declarations/item-24-non-member-conversions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 26 | effective-cpp/03-designs-declarations/item-25-non-throwing-swap.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 27 | effective-cpp/04-implementations/item-26-postpone-variable-definitions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 28 | effective-cpp/04-implementations/item-27-minimize-casting.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 29 | effective-cpp/04-implementations/item-28-avoid-internal-handles.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 30 | effective-cpp/04-implementations/item-29-exception-safe-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 31 | effective-cpp/04-implementations/item-30-inline-ins-and-outs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 32 | effective-cpp/04-implementations/item-31-minimize-compilation-dependencies.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 33 | effective-cpp/04-misc/final-review.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 34 | effective-cpp/05-inheritance-object-oriented-design/item-32-public-inheritance-is-a.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 35 | effective-cpp/05-inheritance-object-oriented-design/item-33-avoid-hiding-inherited-names.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 36 | effective-cpp/05-inheritance-object-oriented-design/item-34-interface-vs-implementation-inheritance.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 37 | effective-cpp/05-inheritance-object-oriented-design/item-35-virtual-function-alternatives.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 38 | effective-cpp/05-inheritance-object-oriented-design/item-36-never-redefine-inherited-nonvirtual.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 39 | effective-cpp/05-inheritance-object-oriented-design/item-37-never-redefine-default-parameters.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 40 | effective-cpp/05-inheritance-object-oriented-design/item-38-composition-has-a.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 41 | effective-cpp/05-inheritance-object-oriented-design/item-39-private-inheritance-judiciously.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 42 | effective-cpp/05-inheritance-object-oriented-design/item-40-multiple-inheritance-judiciously.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 43 | effective-cpp/06-templates-generic-programming/item-41-template-implicit-interfaces.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 44 | effective-cpp/06-templates-generic-programming/item-42-typename-two-meanings.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 45 | effective-cpp/06-templates-generic-programming/item-43-access-templatized-base-names.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 46 | effective-cpp/06-templates-generic-programming/item-44-factor-template-parameter-independent-code.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 47 | effective-cpp/06-templates-generic-programming/item-45-member-function-templates-compatible-types.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 48 | effective-cpp/06-templates-generic-programming/item-46-nonmember-functions-inside-templates.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 49 | effective-cpp/06-templates-generic-programming/item-47-traits-classes-type-information.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 50 | effective-cpp/06-templates-generic-programming/item-48-template-metaprogramming-awareness.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 51 | effective-cpp/07-customizing-new-delete/item-49-understand-new-handler.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 52 | effective-cpp/07-customizing-new-delete/item-50-when-replace-new-delete.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 53 | effective-cpp/07-customizing-new-delete/item-51-conventions-writing-new-delete.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 54 | effective-cpp/07-customizing-new-delete/item-52-placement-delete-with-placement-new.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 55 | effective-cpp/08-miscellaneous/item-53-compiler-warnings.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 56 | effective-cpp/08-miscellaneous/item-54-standard-library-tr1.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 57 | effective-cpp/08-miscellaneous/item-55-familiarize-boost.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—


## 系列 20：算法与数学系列（16 本 · 392 章待修 · 1646 项）

**系列状态**：待开始

### 20.1 data-structures-visual（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | data-structures-visual/00-intro/dsv-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | data-structures-visual/01-foundations/algorithms.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | data-structures-visual/01-foundations/data-structure-introduction.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | data-structures-visual/02-linear/linear-list.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | data-structures-visual/02-linear/stacks-and-queues.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | data-structures-visual/02-linear/strings.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | data-structures-visual/03-algorithms/dsv-final-review.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | data-structures-visual/03-trees/graphs.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | data-structures-visual/03-trees/trees.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | data-structures-visual/04-algorithms/searching.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | data-structures-visual/04-algorithms/sorting.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 20.2 concrete-mathematics（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | concrete-mathematics/00-guide/cm2-official-learning-map.mdx | §8无要点 | ⬜ 待修复 | — |
| 2 | concrete-mathematics/01-recurrences-sums/cm2-recurrent-problems.mdx | §8无要点 | ⬜ 待修复 | — |
| 3 | concrete-mathematics/01-recurrences-sums/cm2-sums.mdx | §8无要点 | ⬜ 待修复 | — |
| 4 | concrete-mathematics/02-integers-number-theory/cm2-integer-functions.mdx | §8无要点 | ⬜ 待修复 | — |
| 5 | concrete-mathematics/02-integers-number-theory/cm2-number-theory.mdx | §8无要点 | ⬜ 待修复 | — |
| 6 | concrete-mathematics/03-combinatorial-numbers/cm2-binomial-coefficients.mdx | §8无要点 | ⬜ 待修复 | — |
| 7 | concrete-mathematics/03-combinatorial-numbers/cm2-special-numbers.mdx | §8无要点 | ⬜ 待修复 | — |
| 8 | concrete-mathematics/04-generating-probability/cm2-discrete-probability.mdx | §8无要点 | ⬜ 待修复 | — |
| 9 | concrete-mathematics/04-generating-probability/cm2-generating-functions.mdx | §8无要点 | ⬜ 待修复 | — |
| 10 | concrete-mathematics/05-asymptotics/cm2-asymptotics.mdx | §8无要点 | ⬜ 待修复 | — |
| 11 | concrete-mathematics/06-review/cm2-official-final-review.mdx | §8无要点 | ⬜ 待修复 | — |

**部署记录**：—

### 20.3 linear-algebra-done-right（11 章 · 待修 11 章 · 11 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | linear-algebra-done-right/00-guide/lad4-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | linear-algebra-done-right/01-vector-spaces/lad4-finite-dimensional-vector-spaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | linear-algebra-done-right/01-vector-spaces/lad4-vector-spaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | linear-algebra-done-right/02-maps-polynomials/lad4-linear-maps.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | linear-algebra-done-right/02-maps-polynomials/lad4-polynomials.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | linear-algebra-done-right/03-spectral-inner/lad4-eigenvalues-eigenvectors.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | linear-algebra-done-right/03-spectral-inner/lad4-inner-product-spaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | linear-algebra-done-right/04-operators/lad4-operators-complex-vector-spaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | linear-algebra-done-right/04-operators/lad4-operators-inner-product-spaces.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | linear-algebra-done-right/05-multilinear/lad4-multilinear-algebra-determinants.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | linear-algebra-done-right/06-review/lad4-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 20.4 statistical-learning-methods（25 章 · 待修 25 章 · 25 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | statistical-learning-methods/00-guide/slm-official-learning-map.mdx | §8缺小结 | ⬜ 待修复 | — |
| 2 | statistical-learning-methods/01-supervised-foundations/slm-01-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 3 | statistical-learning-methods/01-supervised-foundations/slm-02-perceptron.mdx | §8缺小结 | ⬜ 待修复 | — |
| 4 | statistical-learning-methods/01-supervised-foundations/slm-03-knn.mdx | §8缺小结 | ⬜ 待修复 | — |
| 5 | statistical-learning-methods/01-supervised-foundations/slm-04-naive-bayes.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | statistical-learning-methods/02-supervised-models/slm-05-decision-tree.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | statistical-learning-methods/02-supervised-models/slm-06-logistic-maxent.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | statistical-learning-methods/02-supervised-models/slm-07-svm.mdx | §8缺小结 | ⬜ 待修复 | — |
| 9 | statistical-learning-methods/02-supervised-models/slm-08-boosting.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | statistical-learning-methods/03-supervised-latent-sequence/slm-09-em.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | statistical-learning-methods/03-supervised-latent-sequence/slm-10-hmm.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | statistical-learning-methods/03-supervised-latent-sequence/slm-11-crf.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | statistical-learning-methods/03-supervised-latent-sequence/slm-12-supervised-summary.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | statistical-learning-methods/04-unsupervised-foundations/slm-13-unsupervised-introduction.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | statistical-learning-methods/04-unsupervised-foundations/slm-14-clustering.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | statistical-learning-methods/04-unsupervised-foundations/slm-15-svd.mdx | §8缺小结 | ⬜ 待修复 | — |
| 17 | statistical-learning-methods/04-unsupervised-foundations/slm-16-pca.mdx | §8缺小结 | ⬜ 待修复 | — |
| 18 | statistical-learning-methods/05-latent-semantics/slm-17-lsa.mdx | §8缺小结 | ⬜ 待修复 | — |
| 19 | statistical-learning-methods/05-latent-semantics/slm-18-plsa.mdx | §8缺小结 | ⬜ 待修复 | — |
| 20 | statistical-learning-methods/06-sampling-topics/slm-19-mcmc.mdx | §8缺小结 | ⬜ 待修复 | — |
| 21 | statistical-learning-methods/06-sampling-topics/slm-20-lda.mdx | §8缺小结 | ⬜ 待修复 | — |
| 22 | statistical-learning-methods/07-graph-summary/slm-21-pagerank.mdx | §8缺小结 | ⬜ 待修复 | — |
| 23 | statistical-learning-methods/07-graph-summary/slm-22-unsupervised-summary.mdx | §8缺小结 | ⬜ 待修复 | — |
| 24 | statistical-learning-methods/08-appendices/slm-appendices.mdx | §8缺小结 | ⬜ 待修复 | — |
| 25 | statistical-learning-methods/09-review/slm-official-final-review.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 20.5 competitive-algorithms（6 章 · 待修 6 章 · 30 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | competitive-algorithms/00-foundations/01-welcome-to-algorithms.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | competitive-algorithms/01-strategies/02-exhaustive-and-greedy.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | competitive-algorithms/01-strategies/03-randomness.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | competitive-algorithms/02-search-dp/04-search-and-ai.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | competitive-algorithms/02-search-dp/05-dynamic-programming.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | competitive-algorithms/03-divide-conquer/06-divide-and-conquer.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 20.6 advanced-algorithm-engineering（16 章 · 待修 16 章 · 31 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | advanced-algorithm-engineering/00-foundations/introduction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | advanced-algorithm-engineering/00-foundations/warm-up.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | advanced-algorithm-engineering/01-randomization-parallel/list-ranking.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | advanced-algorithm-engineering/01-randomization-parallel/random-sampling.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | advanced-algorithm-engineering/02-sorting-search/dictionary-problem.mdx | §8缺小结 | ⬜ 待修复 | — |
| 6 | advanced-algorithm-engineering/02-sorting-search/searching-strings-by-prefix.mdx | §8缺小结 | ⬜ 待修复 | — |
| 7 | advanced-algorithm-engineering/02-sorting-search/searching-strings-by-substring.mdx | §8缺小结 | ⬜ 待修复 | — |
| 8 | advanced-algorithm-engineering/02-sorting-search/set-intersection.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | advanced-algorithm-engineering/02-sorting-search/sorting-atomic-items.mdx | §8缺小结 | ⬜ 待修复 | — |
| 10 | advanced-algorithm-engineering/02-sorting-search/sorting-strings.mdx | §8缺小结 | ⬜ 待修复 | — |
| 11 | advanced-algorithm-engineering/03-compression/block-sorting-compression.mdx | §8缺小结 | ⬜ 待修复 | — |
| 12 | advanced-algorithm-engineering/03-compression/dictionary-based-compressors.mdx | §8缺小结 | ⬜ 待修复 | — |
| 13 | advanced-algorithm-engineering/03-compression/integer-coding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 14 | advanced-algorithm-engineering/03-compression/statistical-coding.mdx | §8缺小结 | ⬜ 待修复 | — |
| 15 | advanced-algorithm-engineering/04-succinct/compressed-data-structures.mdx | §8缺小结 | ⬜ 待修复 | — |
| 16 | advanced-algorithm-engineering/05-conclusion/conclusion.mdx | §8缺小结 | ⬜ 待修复 | — |

**部署记录**：—

### 20.7 geometric-data-structures（12 章 · 待修 12 章 · 72 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | geometric-data-structures/00-guide/gdscg-official-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | geometric-data-structures/01-spatial-hierarchies/gdscg-bsp-trees.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | geometric-data-structures/01-spatial-hierarchies/gdscg-orthogonal-queries.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | geometric-data-structures/01-spatial-hierarchies/gdscg-quadtrees-octrees.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | geometric-data-structures/02-bounds-and-fields/gdscg-bounding-volume-hierarchies.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | geometric-data-structures/02-bounds-and-fields/gdscg-distance-fields.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | geometric-data-structures/03-proximity-structures/gdscg-geometric-proximity-graphs.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | geometric-data-structures/03-proximity-structures/gdscg-voronoi-diagrams.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | geometric-data-structures/04-dynamic-and-robust/gdscg-degeneracy-robustness.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | geometric-data-structures/04-dynamic-and-robust/gdscg-dynamization.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | geometric-data-structures/04-dynamic-and-robust/gdscg-kinetic-data-structures.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | geometric-data-structures/05-review/gdscg-official-final-review.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.8 programming-pearls（15 章 · 待修 15 章 · 81 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | programming-pearls/01-preliminaries/01-cracking-the-oyster.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | programming-pearls/01-preliminaries/02-aha-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | programming-pearls/01-preliminaries/03-data-structures-programs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 4 | programming-pearls/01-preliminaries/04-writing-correct-programs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | programming-pearls/01-preliminaries/05-a-small-matter-of-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | programming-pearls/02-performance/06-perspective-on-performance.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | programming-pearls/02-performance/07-the-back-of-the-envelope.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | programming-pearls/02-performance/08-algorithm-design-techniques.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | programming-pearls/02-performance/09-code-tuning.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | programming-pearls/02-performance/10-squeezing-space.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | programming-pearls/03-product/11-sorting.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | programming-pearls/03-product/12-a-sample-problem.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | programming-pearls/03-product/13-searching.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | programming-pearls/03-product/14-heaps.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | programming-pearls/03-product/15-strings-of-pearls.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.9 grokking-algorithms-2e（13 章 · 待修 13 章 · 83 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | grokking-algorithms-2e/core-intuitions/hash-tables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | grokking-algorithms-2e/core-intuitions/introduction-to-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | grokking-algorithms-2e/core-intuitions/quicksort.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | grokking-algorithms-2e/core-intuitions/recursion.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | grokking-algorithms-2e/core-intuitions/selection-sort.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | grokking-algorithms-2e/next-steps/where-to-go-next.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | grokking-algorithms-2e/strategy-and-planning/dynamic-programming.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | grokking-algorithms-2e/strategy-and-planning/greedy-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | grokking-algorithms-2e/strategy-and-planning/k-nearest-neighbors.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | grokking-algorithms-2e/trees-and-graphs/balanced-trees.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | grokking-algorithms-2e/trees-and-graphs/breadth-first-search.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | grokking-algorithms-2e/trees-and-graphs/dijkstras-algorithm.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | grokking-algorithms-2e/trees-and-graphs/trees.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.10 head-first-statistics（17 章 · 待修 17 章 · 85 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | head-first-statistics/00-guide/hfs-official-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 2 | head-first-statistics/01-descriptive/hfs-central-tendency.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 3 | head-first-statistics/01-descriptive/hfs-variability-spread.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 4 | head-first-statistics/01-descriptive/hfs-visualizing-information.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 5 | head-first-statistics/02-probability-distributions/hfs-calculating-probabilities.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 6 | head-first-statistics/02-probability-distributions/hfs-discrete-probability-distributions.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 7 | head-first-statistics/02-probability-distributions/hfs-geometric-binomial-poisson.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 8 | head-first-statistics/02-probability-distributions/hfs-normal-beyond.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 9 | head-first-statistics/02-probability-distributions/hfs-normal-distribution.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 10 | head-first-statistics/02-probability-distributions/hfs-permutations-combinations.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 11 | head-first-statistics/03-sampling-inference/hfs-chi-square.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 12 | head-first-statistics/03-sampling-inference/hfs-confidence-intervals.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 13 | head-first-statistics/03-sampling-inference/hfs-estimating-populations.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 14 | head-first-statistics/03-sampling-inference/hfs-hypothesis-tests.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 15 | head-first-statistics/03-sampling-inference/hfs-statistical-sampling.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 16 | head-first-statistics/04-correlation-regression/hfs-correlation-regression.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |
| 17 | head-first-statistics/05-review/hfs-official-final-review.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.11 math-girl（50 章 · 待修 50 章 · 110 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | math-girl/00-intro/mgl-learning-map.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | math-girl/00-intro/mgl-number-theory.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | math-girl/01-algebra/mgl-equations.mdx | §6超长块×1 §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | math-girl/01-algebra/mgl-functions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | math-girl/01-volume-1/mg1-arithmetic-geometric-mean.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | math-girl/01-volume-1/mg1-convolution-catalan.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 7 | math-girl/01-volume-1/mg1-differentiation-and-difference.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 8 | math-girl/01-volume-1/mg1-fibonacci-generating-functions.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | math-girl/01-volume-1/mg1-formula-love-letter.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 10 | math-girl/01-volume-1/mg1-harmonic-numbers.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 11 | math-girl/01-volume-1/mg1-omega-waltz.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | math-girl/01-volume-1/mg1-partition-numbers.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 13 | math-girl/01-volume-1/mg1-sequences-models.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | math-girl/01-volume-1/mg1-taylor-basel.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 15 | math-girl/02-discrete/mgl-combinatorics.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 16 | math-girl/02-discrete/mgl-graph-theory.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | math-girl/02-discrete/mgl-probability.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 18 | math-girl/02-volume-2/mg2-abelian-groups.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | math-girl/02-volume-2/mg2-coprime.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 20 | math-girl/02-volume-2/mg2-euler-formula.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | math-girl/02-volume-2/mg2-fermat-last-theorem.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | math-girl/02-volume-2/mg2-infinite-descent.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | math-girl/02-volume-2/mg2-infinite-universe.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 24 | math-girl/02-volume-2/mg2-modular-arithmetic.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 25 | math-girl/02-volume-2/mg2-proof-by-contradiction.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | math-girl/02-volume-2/mg2-pythagorean-theorem.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | math-girl/02-volume-2/mg2-splitting-primes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | math-girl/03-advanced/mg3-bewildering-spiral.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | math-girl/03-advanced/mg3-diagonal-argument.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | math-girl/03-advanced/mg3-epsilon-delta-language.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | math-girl/03-advanced/mg3-galileos-hesitation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | math-girl/03-advanced/mg3-goedel-incompleteness.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | math-girl/03-advanced/mg3-leibniz-dream.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | math-girl/03-advanced/mg3-limit-destination.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | math-girl/03-advanced/mg3-mirror-monologue.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 36 | math-girl/03-advanced/mg3-peano-arithmetic.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 37 | math-girl/03-advanced/mg3-two-solitudes.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 38 | math-girl/03-advanced/mgl-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 39 | math-girl/03-advanced/mgl-final-review.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 40 | math-girl/03-advanced/mgl-machine-learning.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 41 | math-girl/04-randomized/mg4-elusive-future.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 42 | math-girl/04-randomized/mg4-expectation.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 43 | math-girl/04-randomized/mg4-exponential-solitude.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 44 | math-girl/04-randomized/mg4-linear-search.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 45 | math-girl/04-randomized/mg4-lonely-random-walk.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 46 | math-girl/04-randomized/mg4-matrices.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 47 | math-girl/04-randomized/mg4-never-lose-gamble.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 48 | math-girl/04-randomized/mg4-probability-axioms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 49 | math-girl/04-randomized/mg4-randomized-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 50 | math-girl/04-randomized/mg4-strong-correct-beautiful.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.12 algorithms-4e（30 章 · 待修 30 章 · 120 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | algorithms-4e/01-fundamentals/analysis-of-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 2 | algorithms-4e/01-fundamentals/bags-queues-stacks.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 3 | algorithms-4e/01-fundamentals/basic-programming-model.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 4 | algorithms-4e/01-fundamentals/data-abstraction.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 5 | algorithms-4e/01-fundamentals/union-find.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 6 | algorithms-4e/02-sorting/elementary-sorts.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 7 | algorithms-4e/02-sorting/mergesort.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 8 | algorithms-4e/02-sorting/priority-queues.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 9 | algorithms-4e/02-sorting/quicksort.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 10 | algorithms-4e/02-sorting/sorting-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 11 | algorithms-4e/03-searching/balanced-search-trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 12 | algorithms-4e/03-searching/binary-search-trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 13 | algorithms-4e/03-searching/hash-tables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 14 | algorithms-4e/03-searching/searching-applications.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 15 | algorithms-4e/03-searching/symbol-tables.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 16 | algorithms-4e/04-graphs/directed-graphs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 17 | algorithms-4e/04-graphs/minimum-spanning-trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 18 | algorithms-4e/04-graphs/shortest-paths.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 19 | algorithms-4e/04-graphs/undirected-graphs.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 20 | algorithms-4e/05-strings/data-compression.mdx | §6缺CodeTabs §7缺误区 §8小结>5条 §8缺独立题 | ⬜ 待修复 | — |
| 21 | algorithms-4e/05-strings/regular-expressions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 22 | algorithms-4e/05-strings/string-sorts.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 23 | algorithms-4e/05-strings/substring-search.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 24 | algorithms-4e/05-strings/tries.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 25 | algorithms-4e/06-context/b-trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 26 | algorithms-4e/06-context/event-driven-simulation.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 27 | algorithms-4e/06-context/intractability.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 28 | algorithms-4e/06-context/maxflow.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 29 | algorithms-4e/06-context/reductions.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |
| 30 | algorithms-4e/06-context/suffix-arrays.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 20.13 introduction-to-algorithms（39 章 · 待修 39 章 · 130 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | introduction-to-algorithms/01-foundations/01-role-of-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | introduction-to-algorithms/01-foundations/02-getting-started.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | introduction-to-algorithms/01-foundations/03-characterizing-running-times.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 4 | introduction-to-algorithms/01-foundations/04-divide-and-conquer.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 5 | introduction-to-algorithms/01-foundations/05-probabilistic-analysis-randomized-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 6 | introduction-to-algorithms/02-sorting-order-statistics/06-heapsort.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | introduction-to-algorithms/02-sorting-order-statistics/07-quicksort.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | introduction-to-algorithms/02-sorting-order-statistics/08-sorting-in-linear-time.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 9 | introduction-to-algorithms/02-sorting-order-statistics/09-medians-order-statistics.mdx | §6缺CodeTabs §7缺误区 §8无要点 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | introduction-to-algorithms/03-data-structures/10-elementary-data-structures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | introduction-to-algorithms/03-data-structures/11-hash-tables.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 12 | introduction-to-algorithms/03-data-structures/12-binary-search-trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | introduction-to-algorithms/03-data-structures/13-red-black-trees.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 14 | introduction-to-algorithms/04-advanced-design-analysis/14-dynamic-programming.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | introduction-to-algorithms/04-advanced-design-analysis/15-greedy-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | introduction-to-algorithms/04-advanced-design-analysis/16-amortized-analysis.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | introduction-to-algorithms/05-advanced-data-structures/17-augmenting-data-structures.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | introduction-to-algorithms/05-advanced-data-structures/18-b-trees.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 19 | introduction-to-algorithms/05-advanced-data-structures/19-data-structures-for-disjoint-sets.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | introduction-to-algorithms/06-graph-algorithms/20-elementary-graph-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 21 | introduction-to-algorithms/06-graph-algorithms/21-minimum-spanning-trees.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 22 | introduction-to-algorithms/06-graph-algorithms/22-single-source-shortest-paths.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 23 | introduction-to-algorithms/06-graph-algorithms/23-all-pairs-shortest-paths.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 24 | introduction-to-algorithms/06-graph-algorithms/24-maximum-flow.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 25 | introduction-to-algorithms/06-graph-algorithms/25-matchings-in-bipartite-graphs.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 26 | introduction-to-algorithms/07-selected-topics/26-parallel-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 27 | introduction-to-algorithms/07-selected-topics/27-online-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 28 | introduction-to-algorithms/07-selected-topics/28-matrix-operations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 29 | introduction-to-algorithms/07-selected-topics/29-linear-programming.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 30 | introduction-to-algorithms/07-selected-topics/30-polynomials-and-the-fft.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 31 | introduction-to-algorithms/07-selected-topics/31-number-theoretic-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 32 | introduction-to-algorithms/07-selected-topics/32-string-matching.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 33 | introduction-to-algorithms/07-selected-topics/33-machine-learning-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 34 | introduction-to-algorithms/07-selected-topics/34-np-completeness.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 35 | introduction-to-algorithms/07-selected-topics/35-approximation-algorithms.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 36 | introduction-to-algorithms/08-mathematical-background/appendix-a-summations.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 37 | introduction-to-algorithms/08-mathematical-background/appendix-b-sets-etc.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 38 | introduction-to-algorithms/08-mathematical-background/appendix-c-counting-probability.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 39 | introduction-to-algorithms/08-mathematical-background/appendix-d-matrices.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.14 taocp（30 章 · 待修 30 章 · 150 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | taocp/vol1-basic-concepts/taocp-1-1-algorithms.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 2 | taocp/vol1-basic-concepts/taocp-1-1-math.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 3 | taocp/vol1-basic-concepts/taocp-1-1-mix.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 4 | taocp/vol1-info-structures/taocp-1-2-dynamic.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 5 | taocp/vol1-info-structures/taocp-1-2-linear.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 6 | taocp/vol1-info-structures/taocp-1-2-multilinked.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 7 | taocp/vol1-info-structures/taocp-1-2-trees.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 8 | taocp/vol2-arithmetic/taocp-2-4-multiple.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 9 | taocp/vol2-arithmetic/taocp-2-4-polynomial.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 10 | taocp/vol2-arithmetic/taocp-2-4-position.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 11 | taocp/vol2-arithmetic/taocp-2-4-radix.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 12 | taocp/vol2-random/taocp-2-3-random.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 13 | taocp/vol3-searching/taocp-3-6-digital.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 14 | taocp/vol3-searching/taocp-3-6-hashing.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 15 | taocp/vol3-searching/taocp-3-6-sequential.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 16 | taocp/vol3-searching/taocp-3-6-tree.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 17 | taocp/vol3-sorting/taocp-3-5-external.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 18 | taocp/vol3-sorting/taocp-3-5-internal.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 19 | taocp/vol3-sorting/taocp-3-5-optimum.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 20 | taocp/vol4a-combinatorial/taocp-4-7-dancing-links.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 21 | taocp/vol4a-combinatorial/taocp-4-7-generating.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 22 | taocp/vol4a-combinatorial/taocp-4-7-graph.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 23 | taocp/vol4a-combinatorial/taocp-4-7-satisfiability.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 24 | taocp/vol4a-combinatorial/taocp-4-7-zeros-ones.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 25 | taocp/vol4b-combinatorial/taocp-4-7-backtracking.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 26 | taocp/vol4b-combinatorial/taocp-4-7-branch-bound.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 27 | taocp/vol4b-combinatorial/taocp-4-7-heuristic.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 28 | taocp/vol4b-combinatorial/taocp-4-7-matching.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 29 | taocp/vol4b-combinatorial/taocp-4-7-network.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |
| 30 | taocp/vol4b-combinatorial/taocp-4-7-np.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 | ⬜ 待修复 | — |

**部署记录**：—

### 20.15 programmers-math（25 章 · 待修 25 章 · 150 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | programmers-math/00-guide/pm-series-learning-map.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 2 | programmers-math/01-mathematical-thinking/pm1-counting.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | programmers-math/01-mathematical-thinking/pm1-exponential-explosion.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | programmers-math/01-mathematical-thinking/pm1-induction.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | programmers-math/01-mathematical-thinking/pm1-logic.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | programmers-math/01-mathematical-thinking/pm1-programmers-mathematics.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | programmers-math/01-mathematical-thinking/pm1-recursion.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | programmers-math/01-mathematical-thinking/pm1-remainder.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | programmers-math/01-mathematical-thinking/pm1-undecidable-problems.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | programmers-math/01-mathematical-thinking/pm1-zero.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | programmers-math/02-probability-statistics/pm2-applications.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | programmers-math/02-probability-statistics/pm2-continuous-distributions.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | programmers-math/02-probability-statistics/pm2-covariance-normal.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | programmers-math/02-probability-statistics/pm2-discrete-distributions.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | programmers-math/02-probability-statistics/pm2-estimation-testing.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | programmers-math/02-probability-statistics/pm2-multiple-random-variables.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | programmers-math/02-probability-statistics/pm2-probability-definition.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | programmers-math/02-probability-statistics/pm2-pseudorandom.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | programmers-math/03-linear-algebra/pm3-eigenvalues-jordan.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | programmers-math/03-linear-algebra/pm3-lu-decomposition.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 21 | programmers-math/03-linear-algebra/pm3-motivation.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 22 | programmers-math/03-linear-algebra/pm3-numerical-eigenvalues.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 23 | programmers-math/03-linear-algebra/pm3-rank-inverse-equations.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 24 | programmers-math/03-linear-algebra/pm3-vectors-matrices-determinants.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 25 | programmers-math/04-review/pm-series-final-review.mdx | §6缺CodeTabs §7误区<3 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

### 20.16 coding-interviews（81 章 · 待修 81 章 · 546 项）

**书籍状态**：待修复

| # | 章节文件 | 不合格项 | 状态 | 完成日期 |
|---|---------|---------|------|---------|
| 1 | coding-interviews/00-interview-process/interview-process.mdx | §8缺小结 §9缺Attribution | ⬜ 待修复 | — |
| 2 | coding-interviews/01-basics/assignment-operator.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 3 | coding-interviews/01-basics/duplicate-in-array-no-edit.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 4 | coding-interviews/01-basics/duplicate-in-array.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 5 | coding-interviews/01-basics/singleton.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 6 | coding-interviews/arrays/accumulate.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 7 | coding-interviews/arrays/constuct-array.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 8 | coding-interviews/arrays/continous-cards.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 9 | coding-interviews/arrays/continuous-sequence-with-sum.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 10 | coding-interviews/arrays/find-in-matrix.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 11 | coding-interviews/arrays/greatest-sum-of-subarrays.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 12 | coding-interviews/arrays/integer-identical-to-index.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 13 | coding-interviews/arrays/inverse-pairs.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 14 | coding-interviews/arrays/k-least-numbers.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 15 | coding-interviews/arrays/matrix-path.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 16 | coding-interviews/arrays/max-value-of-gifts.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 17 | coding-interviews/arrays/maximal-profit.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 18 | coding-interviews/arrays/min-rotated-array.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 19 | coding-interviews/arrays/missing-number.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 20 | coding-interviews/arrays/more-than-half-number.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 21 | coding-interviews/arrays/number-appearing-once.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 22 | coding-interviews/arrays/number-of-k.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 23 | coding-interviews/arrays/numbers-appear-once.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 24 | coding-interviews/arrays/reorder-array.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 25 | coding-interviews/arrays/spiral-matrix.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 26 | coding-interviews/arrays/two-numbers-with-sum.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 27 | coding-interviews/linked-lists/add-two-numbers.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 28 | coding-interviews/linked-lists/copy-complex-list.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 29 | coding-interviews/linked-lists/delete-duplicated-node.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 30 | coding-interviews/linked-lists/delete-node.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 31 | coding-interviews/linked-lists/entry-node-of-loop.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 32 | coding-interviews/linked-lists/first-common-nodes-in-lists.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 33 | coding-interviews/linked-lists/kth-node-from-end.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 34 | coding-interviews/linked-lists/merge-sorted-lists.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 35 | coding-interviews/linked-lists/print-list-reverse.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 36 | coding-interviews/linked-lists/reverse-list.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 37 | coding-interviews/math/cutting-rope.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 38 | coding-interviews/math/dices-probability.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 39 | coding-interviews/math/digits-in-sequence.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 40 | coding-interviews/math/last-number-in-circle.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 41 | coding-interviews/math/number-of-1-bits.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 42 | coding-interviews/math/number-of-1.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 43 | coding-interviews/math/power.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 44 | coding-interviews/math/ugly-number.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 45 | coding-interviews/recursion/fibonacci.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 46 | coding-interviews/recursion/print-numbers.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 47 | coding-interviews/recursion/robot-moving-count.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 48 | coding-interviews/stacks-queues/max-in-sliding-window.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 49 | coding-interviews/stacks-queues/min-stack.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 50 | coding-interviews/stacks-queues/queue-with-max.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 51 | coding-interviews/stacks-queues/queue-with-two-stacks.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 52 | coding-interviews/stacks-queues/stack-push-pop-order.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 53 | coding-interviews/stacks-queues/stream-median.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 54 | coding-interviews/strings/first-character-in-stream.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 55 | coding-interviews/strings/first-not-repeating-char.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 56 | coding-interviews/strings/left-rotate-string.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 57 | coding-interviews/strings/longest-substring-without-dup.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 58 | coding-interviews/strings/numeric-strings.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 59 | coding-interviews/strings/regular-expressions-matching.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 60 | coding-interviews/strings/replace-spaces.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 61 | coding-interviews/strings/reverse-words-in-sentence.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 62 | coding-interviews/strings/sort-array-for-min-number.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 63 | coding-interviews/strings/string-permutation.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 64 | coding-interviews/strings/string-to-int.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 65 | coding-interviews/strings/translate-numbers-to-strings.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 66 | coding-interviews/trees/balanced-binary-tree.mdx | §6超长块×3 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 67 | coding-interviews/trees/common-parent-in-tree.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 68 | coding-interviews/trees/convert-binary-search-tree.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 69 | coding-interviews/trees/kth-node-in-bst.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 70 | coding-interviews/trees/mirror-binary-tree.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 71 | coding-interviews/trees/next-node-in-binary-tree.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 72 | coding-interviews/trees/path-in-tree.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 73 | coding-interviews/trees/print-tree-from-top-to-bottom.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 74 | coding-interviews/trees/print-trees-in-lines.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 75 | coding-interviews/trees/print-trees-in-zigzag.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 76 | coding-interviews/trees/rebuild-binary-tree.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 77 | coding-interviews/trees/serialize-binary-trees.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 78 | coding-interviews/trees/squence-of-bst.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 79 | coding-interviews/trees/subtree-structure.mdx | §6超长块×1 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 80 | coding-interviews/trees/symmetric-binary-tree.mdx | §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |
| 81 | coding-interviews/trees/tree-depth.mdx | §6超长块×2 §6缺CodeTabs §7缺误区 §8缺小结 §8缺练习 §8缺独立题 §9缺Attribution | ⬜ 待修复 | — |

**部署记录**：—

