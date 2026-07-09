import type { ReviewQuestion } from "./types";

export const hpmSchemaDesignQuestions: ReviewQuestion[] = [
  {
    id: "hpm-sch-1",
    chapter: "hpm-schema-design",
    level: 2,
    question: "MySQL数据类型选择的\"最小够用\"原则是什么？为什么主键推荐整数自增？",
    answer: "最小够用原则：选择能装下数据的占空间最小的类型——整数按范围选TINYINT/SMALLINT/INT/BIGINT；金额用DECIMAL不用FLOAT；字符串用VARCHAR变长；时间用DATETIME或TIMESTAMP。类型越小，单页存的数据越多，IO越少，索引越紧凑。主键推荐整数自增的原因：①存储小——INT 4字节，UUID 16字节+，而所有二级索引都存主键，主键越小所有索引越紧凑；②单调递增——自增主键使新行追加到B+树末尾，避免页分裂和碎片，写入高效；③整数比较比字符串快。",
    tags: ["数据类型", "最小够用", "主键", "自增"],
  },
  {
    id: "hpm-sch-2",
    chapter: "hpm-schema-design",
    level: 2,
    question: "范式和反范式各有什么优缺点？实际中如何取舍？",
    answer: "范式：每个事实只存一处，优点是冗余少、更新快、一致性好，缺点是查询需多表JOIN、读复杂。反范式：冗余存多份，优点是查询快免JOIN，缺点是更新慢、易不一致。实际用混合策略：联机事务（OLTP）用范式保证一致性，因为事务要求准确；高频读/统计/报表场景适度反范式冗余（如订单里冗余存商品名），用缓存表/汇总表隔离读写压力。取舍依据是读写比例（读多写少适合反范式）和数据一致性要求（强一致用范式）。",
    tags: ["范式", "反范式", "混合策略", "读写比例"],
  },
  {
    id: "hpm-sch-3",
    chapter: "hpm-schema-design",
    level: 3,
    question: "什么是汇总表？它解决什么问题？举例说明。",
    answer: "汇总表是预聚合统计数据的表，把GROUP BY的结果预先计算并落表。解决的问题：避免每次查询都全表扫描做聚合。举例——电商订单按日统计：原查询SELECT date, COUNT(*), SUM(amount) FROM orders GROUP BY date每次都要扫描全表orders（可能上亿行）；建汇总表order_daily(date, order_cnt, total_amount)，定时任务每小时/每天增量更新，查询直接读汇总表（几百行），性能提升几个数量级。汇总表是报表/OLAP场景的标配，本质是用空间换时间、用预计算换查询性能。",
    tags: ["汇总表", "预聚合", "OLAP", "空间换时间"],
  },
  {
    id: "hpm-sch-4",
    chapter: "hpm-schema-design",
    level: 3,
    question: "为什么应尽量避免NULL？计数表在高并发下有什么问题，如何解决？",
    answer: "避免NULL的原因：①NULL难优化——索引、统计、比较都需要特殊处理，索引对NULL的统计不准确；②NULL语义混乱——NULL不等于任何值（包括自己），WHERE col != 1不会匹配NULL行；③占用空间且影响索引效率。应用NOT NULL+默认值（如0/空串）。计数表高并发问题：单行计数器（如一行存某文章评论数）所有更新都锁同一行，成为热点，并发更新被严重阻塞。解决方法——多槽计数器：建多行（如10行），更新时随机选一行加1（把锁竞争分散到多行），查询时SUM所有行得到总数。这样并发更新分散，吞吐提升。",
    tags: ["NULL", "计数表", "多槽计数器", "高并发", "热点"],
  },
];
