import type { ReviewQuestion } from "./types";

export const sqtSubqueriesQuestions: ReviewQuestion[] = [
  {
    id: "sqt-sub-1",
    chapter: "sqt-subqueries",
    level: 2,
    question: `子查询有哪四种返回类型？分别适合在SQL的什么位置使用？`,
    answer: `四种返回类型：①标量子查询（单行单列）——用在比较运算符右边（WHERE/HAVING），如 \`WHERE price > (SELECT AVG(price) FROM t)\`；②列子查询（单列多行）——配合IN/NOT IN使用，如 \`WHERE id IN (SELECT id FROM t)\`；③行子查询（单行多列）——多列同时比较，如 \`WHERE (a, b) = (SELECT x, y FROM t)\`；④表子查询（多行多列）——用在FROM子句中作为派生表，如 \`FROM (SELECT ... GROUP BY ...) AS t\`，必须给派生表起别名。`,
    tags: ["子查询", "返回类型", "标量", "列", "行", "表"],
  },
  {
    id: "sqt-sub-2",
    chapter: "sqt-subqueries",
    level: 3,
    question: `EXISTS和IN在什么场景下可以互换？各自有什么优势？`,
    answer: `EXISTS和IN在\"判断某值是否在子查询结果中\"的场景下可以互换，如 \`WHERE id IN (SELECT id FROM t)\` 等价于 \`WHERE EXISTS (SELECT 1 FROM t WHERE t.id = outer.id)\`。EXISTS优势：①找到第一个匹配就返回（短路），大表通常更快；②NOT EXISTS不受NULL影响，比NOT IN更安全；③适合相关子查询。IN优势：①语义更直观；②非相关子查询只执行一次，小结果集更快；③语法更简洁。选择原则：外表小子查询表大用EXISTS，外表大子查询表小用IN，NOT场景统一用NOT EXISTS。`,
    tags: ["EXISTS", "IN", "相关子查询", "性能"],
  },
  {
    id: "sqt-sub-3",
    chapter: "sqt-subqueries",
    level: 2,
    question: `UNION和UNION ALL有什么区别？什么时候应该用哪个？`,
    answer: `UNION自动去重（对结果做DISTINCT），UNION ALL不去重。区别：①性能——UNION ALL更快，因为不需要去重排序；②结果——如果两个SELECT有重复行，UNION只保留一行，UNION ALL全部保留。使用场景：①确定无重复或不需要去重时用UNION ALL（性能优先）；②需要去重时用UNION。最佳实践：默认用UNION ALL，只有明确需要去重时才用UNION。因为去重操作需要排序和比较，代价较大，如果数据本身无重复就白白浪费性能。`,
    tags: ["UNION", "UNION ALL", "去重", "性能"],
  },
  {
    id: "sqt-sub-4",
    chapter: "sqt-subqueries",
    level: 3,
    question: `UNION组合查询有哪些规则？ORDER BY应该放在哪里？`,
    answer: `UNION规则：①每个SELECT必须返回相同数量的列——列数不匹配会报错；②对应列的类型需要兼容——不必完全相同但需要可隐式转换；③结果列名取自第一个SELECT——后续SELECT的列名被忽略；④不允许对单个SELECT使用ORDER BY——只能在整个UNION结果最后使用一次ORDER BY，对合并后的全部结果排序。ORDER BY应放在最后一条SELECT之后，它作用于整个UNION结果。例如 \`SELECT ... UNION SELECT ... ORDER BY name\` 中的ORDER BY对两段查询的合并结果排序。`,
    tags: ["UNION", "规则", "ORDER BY", "组合查询"],
  },
];
