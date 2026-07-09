import type { ReviewQuestion } from "./types";

export const mseIndexOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "mse-idx-1",
    chapter: "mse-index-optimization",
    level: 2,
    question: "InnoDB的B+Tree索引结构有什么特点？为什么B+Tree适合做数据库索引？",
    answer: "InnoDB B+Tree特点：①非叶子节点只存索引键不存数据，单个节点能存更多键，树更矮（3层可存千万级数据），减少磁盘IO；②所有数据都存在叶子节点，且叶子节点按序排列并通过双向链表连接；③范围查询高效——找到起点后沿链表遍历即可，无需回溯父节点。为什么适合数据库索引：①磁盘IO是瓶颈，B+Tree矮胖结构每次查询IO次数少（等于树高）；②叶子链表使范围查询（BETWEEN/>/</ORDER BY）高效；③有序结构支持排序和分组（GROUP BY/ORDER BY可利用索引有序性免排序）；④InnoDB聚簇索引叶子节点直接存完整行数据，主键查询一次IO即可获取整行。对比B-Tree：B-Tree每个节点都存数据，同样页大小下键更少、树更高、IO更多。",
    tags: ["B+Tree", "索引结构", "叶子节点", "范围查询", "磁盘IO"],
  },
  {
    id: "mse-idx-2",
    chapter: "mse-index-optimization",
    level: 2,
    question: "聚簇索引和非聚簇索引（二级索引）的区别是什么？什么是回表？如何避免回表？",
    answer: "聚簇索引：叶子节点存储完整行数据，数据和主键索引"聚簇"在一起。InnoDB的主键索引就是聚簇索引，一张表只有一个。按主键查询直接从叶子节点取整行，无需额外IO。非聚簇索引（二级索引）：叶子节点只存储索引列值 + 主键值，不存完整行。一张表可以有多个二级索引。回表：通过二级索引查到主键值后，需要再回到聚簇索引中按主键查完整行数据，这个二次查找叫回表。回表增加一次IO开销。避免回表的方法——覆盖索引：如果查询所需的所有列（SELECT列 + WHERE列 + ORDER BY列）都包含在某个索引中，就不需要回表，直接从索引叶子节点取数据。EXPLAIN中Extra显示"Using index"表示用了覆盖索引。实践：高频查询的列建联合索引，把SELECT的列也纳入，实现覆盖索引。",
    tags: ["聚簇索引", "二级索引", "回表", "覆盖索引"],
  },
  {
    id: "mse-idx-3",
    chapter: "mse-index-optimization",
    level: 3,
    question: "联合索引(a,b,c)的最左前缀原则是什么？以下查询哪些能用到该索引？\n1) WHERE a=1 AND b=2 AND c=3\n2) WHERE a=1 AND c=3\n3) WHERE b=2 AND c=3\n4) WHERE a=1 AND b>2 AND c=3",
    answer: "最左前缀原则：联合索引按列顺序从左到右构建B+Tree，查询必须从最左列开始匹配，且遇到范围查询（>/</BETWEEN/LIKE）后右侧列的索引失效。逐个分析：①WHERE a=1 AND b=2 AND c=3——完美匹配三列索引，全部有效（最优）；②WHERE a=1 AND c=3——只能用到a列索引（跳过b，c无法利用索引，需回表过滤）；③WHERE b=2 AND c=3——不满足最左前缀（缺a），完全用不到该索引，全表扫描；④WHERE a=1 AND b>2 AND c=3——a和b能用索引，但b是范围查询，之后的c无法利用索引（范围查询右侧列失效）。结论：联合索引列顺序至关重要——把等值查询列放前面、范围查询列放后面、高选择性列放前面。如需同时优化②，可建(a,c)索引。",
    tags: ["最左前缀", "联合索引", "范围查询", "索引失效", "实践"],
  },
  {
    id: "mse-idx-4",
    chapter: "mse-index-optimization",
    level: 3,
    question: "EXPLAIN输出中type字段的值从好到差如何排列？Extra字段中Using index、Using filesort、Using temporary分别代表什么？",
    answer: "type字段从好到差（性能从高到低）：system（表只有一行）> const（主键/唯一索引等值查询，最多1行）> eq_ref（JOIN中主键/唯一索引等值匹配，最多1行）> ref（非唯一索引等值查询，多行）> range（索引范围扫描，如BETWEEN/>/</IN）> index（全索引扫描，扫整棵索引树）> ALL（全表扫描，最差）。生产要求至少达到range级，避免ALL。Extra关键字段：①Using index——覆盖索引，查询列都在索引中，无需回表（好）；②Using where——Server层过滤（一般）；③Using filesort——需要额外排序（无法利用索引有序性），通常出现在ORDER BY未命中索引时（差，需优化）；④Using temporary——需要创建临时表（如GROUP BY/DISTINCT未命中索引时）（差，需优化）；⑤Using index condition——索引下推ICP，在引擎层过滤（好）。优化目标：消除Using filesort和Using temporary。",
    tags: ["EXPLAIN", "type", "Extra", "Using index", "filesort", "temporary"],
  },
];
