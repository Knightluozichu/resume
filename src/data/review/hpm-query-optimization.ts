import type { ReviewQuestion } from "./types";

export const hpmQueryOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "hpm-qo-1",
    chapter: "hpm-query-optimization",
    level: 1,
    question: `EXPLAIN的type列有哪些常见取值？从好到差如何排序？优化目标是什么？`,
    answer: `type列反映访问数据的效率，从好到差：const（主键或唯一索引等值查询，最快）、eq_ref（连接中使用主键或唯一索引等值）、ref（非唯一索引等值，匹配多行）、range（索引范围扫描，如BETWEEN/IN/大于小于）、index（扫描整个索引树）、ALL（全表扫描，最差）。优化目标：至少到range，最好达到ref或eq_ref。ALL必须优化（为WHERE条件加索引）；index在覆盖索引场景（Extra为Using index）时可接受，否则也需优化。`,
    tags: ["EXPLAIN", "访问类型", "type", "优化目标"],
  },
  {
    id: "hpm-qo-2",
    chapter: "hpm-query-optimization",
    level: 2,
    question: `EXPLAIN的Extra列出现\"Using filesort\"和\"Using temporary\"意味着什么？如何消除？`,
    answer: `Using filesort：MySQL无法用索引完成排序，需额外执行排序步骤（可能用磁盘临时文件），代价大。消除方法：为ORDER BY的列建索引，使索引顺序与排序顺序一致（联合索引满足最左前缀且顺序匹配）。Using temporary：MySQL使用了临时表（常见于GROUP BY、DISTINCT、UNION），代价更大。消除方法：为GROUP BY/JOIN的列建索引，避免临时表。两者都是性能红灯，生产慢查询常见根因，应通过索引设计消除。绿灯是Using index（覆盖索引免回表）。`,
    tags: ["EXPLAIN", "Extra", "filesort", "temporary", "红灯"],
  },
  {
    id: "hpm-qo-3",
    chapter: "hpm-query-optimization",
    level: 3,
    question: `深度分页 \`LIMIT 1000000, 20\` 为什么慢？如何优化？`,
    answer: `慢的原因：LIMIT N, M会扫描前N行然后丢弃，再返回M行。LIMIT 1000000, 20要扫描前100万行（即使走索引也要回表100万次取整行再丢弃），IO和CPU浪费巨大。优化方法——延迟关联：第一步用覆盖索引子查询只取主键（SELECT id FROM ... ORDER BY id LIMIT 1000000, 20），只走索引不回表，轻量；第二步用这20个主键JOIN原表取整行，只需20次回表。大幅减少回表次数。也可考虑用游标分页（WHERE id > 上次最大id LIMIT 20）替代OFFSET。`,
    tags: ["深度分页", "延迟关联", "LIMIT", "覆盖索引", "优化"],
  },
  {
    id: "hpm-qo-4",
    chapter: "hpm-query-optimization",
    level: 4,
    question: `给出一个完整的慢查询优化流程。`,
    answer: `①用慢查询日志定位慢查询（long_query_time阈值）；②对慢查询执行EXPLAIN看执行计划；③诊断——type是否为ALL（全表扫描，需为WHERE条件加索引）？Extra是否有Using filesort/Using temporary（需为ORDER BY/GROUP BY加索引）？rows是否过大（需收窄条件或用覆盖索引）？key是否走了预期索引（未走则可能索引失效，检查函数包裹/隐式转换/最左前缀）？④改写查询（避免SELECT *、避免函数包裹索引列、大IN用JOIN）或加索引或改Schema；⑤再EXPLAIN验证rows下降、红灯消除；⑥单变量迭代，一次只改一处并测量对比。`,
    tags: ["慢查询", "优化流程", "EXPLAIN", "单变量迭代"],
  },
];
