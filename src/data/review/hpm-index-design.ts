import type { ReviewQuestion } from "./types";

export const hpmIndexDesignQuestions: ReviewQuestion[] = [
  {
    id: "hpm-idx-1",
    chapter: "hpm-index-design",
    level: 2,
    question: "InnoDB的聚簇索引和二级索引有什么区别？什么是回表和覆盖索引？",
    answer: "聚簇索引：InnoDB主键索引，叶子节点直接存整行数据，数据按主键物理排序，一表只有一个。二级索引：非主键索引，叶子节点存主键值而非行数据。回表：用二级索引查到主键后，若查询还需非索引列，必须再到聚簇索引查整行，即两次B+树查找。覆盖索引：索引包含查询所需所有列，无需回表，直接从索引返回，Extra显示\"Using index\"。设计技巧：把SELECT的列加入联合索引使其成为覆盖索引，是高频查询优化常用手段。",
    tags: ["聚簇索引", "二级索引", "回表", "覆盖索引"],
  },
  {
    id: "hpm-idx-2",
    chapter: "hpm-index-design",
    level: 2,
    question: "什么是最左前缀原则？联合索引 `(a, b, c)` 对哪些WHERE条件有效？",
    answer: "最左前缀原则：联合索引(a,b,c)只有从最左列开始的连续前缀才能被使用。有效：WHERE a=1（用a）；WHERE a=1 AND b=2（用a,b）；WHERE a=1 AND b=2 AND c=3（用a,b,c）。无效：WHERE b=2（不满足最左前缀）。部分有效：WHERE a=1 AND c=3（只用a，中间缺b则c无法用）；WHERE a=1 AND b>2 AND c=3（用a,b，但b是范围查询后c失效）。设计原则：选择性高、等值查询的列放前面，范围查询列放后面。",
    tags: ["最左前缀", "联合索引", "索引设计"],
  },
  {
    id: "hpm-idx-3",
    chapter: "hpm-index-design",
    level: 3,
    question: "为什么二级索引存主键值而不是行的物理地址？这对主键设计有什么要求？",
    answer: "InnoDB二级索引叶子存主键值而非物理行地址，是因为聚簇索引的页分裂会导致行的物理位置变化，若存行地址则每次页分裂都要更新所有二级索引，维护成本极高。存主键值虽需回表多一次查找，但主键不变、维护成本低。对主键的要求：①尽量短——主键越短，所有二级索引叶子节点越小，索引越紧凑、IO越少，故推荐整数自增主键而非UUID；②单调递增——自增主键使新行追加到B+树末尾，避免页分裂和碎片。",
    tags: ["二级索引", "主键设计", "页分裂", "自增主键"],
  },
  {
    id: "hpm-idx-4",
    chapter: "hpm-index-design",
    level: 3,
    question: "列举三种让索引失效的常见写法，并给出正确写法。",
    answer: "①对索引列使用函数：WHERE DATE(create_time)='2024-01-01'会使索引失效，应改为范围查询WHERE create_time >= '2024-01-01' AND create_time < '2024-01-02'。②隐式类型转换：WHERE phone=13800000000（phone是varchar）会使索引失效，因为MySQL把字符串转数字比较，应改为WHERE phone='13800000000'。③左模糊：WHERE name LIKE '%张'无法用索引（B+树有序只支持前缀匹配），应改为右模糊WHERE name LIKE '张%'。此外OR中部分列无索引、不满足最左前缀也会使索引失效。",
    tags: ["索引失效", "函数包裹", "隐式转换", "左模糊", "陷阱"],
  },
];
