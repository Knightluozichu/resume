import type { ReviewQuestion } from "./types";

export const sqtFilteringDataQuestions: ReviewQuestion[] = [
  {
    id: "sqt-fd-1",
    chapter: "sqt-filtering-data",
    level: 2,
    question: `WHERE子句在SELECT执行流程中的位置是什么？为什么WHERE中不能使用SELECT定义的列别名？`,
    answer: `WHERE在执行流程中的位置：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。WHERE在FROM之后、SELECT之前执行。不能使用SELECT别名的原因：别名是在SELECT阶段（即WHERE之后）才定义的，WHERE执行时别名还不存在。例如 \`SELECT price * 1.1 AS new_price FROM products WHERE new_price > 10\` 是错误的，应改为 \`WHERE price * 1.1 > 10\`。但ORDER BY可以使用别名，因为ORDER BY在SELECT之后执行。`,
    tags: ["WHERE", "执行顺序", "别名", "核心概念"],
  },
  {
    id: "sqt-fd-2",
    chapter: "sqt-filtering-data",
    level: 2,
    question: `\`NOT IN\` 列表中包含NULL会导致什么问题？如何避免？`,
    answer: `\`NOT IN\` 列表中包含NULL会导致整个查询返回空结果。原因：\`x NOT IN (a, NULL)\` 等价于 \`x != a AND x != NULL\`，而 \`x != NULL\` 的结果是UNKNOWN（三值逻辑中UNKNOWN不为TRUE），所以整个AND条件永远不为TRUE，所有行都被排除。避免方法：①使用前确保列表中无NULL值；②改用 \`NOT EXISTS\` 子查询；③使用 \`COALESCE\` 将NULL替换为不可能的值。例如 \`WHERE col NOT IN (SELECT val FROM t WHERE val IS NOT NULL)\`。`,
    tags: ["NOT IN", "NULL", "陷阱", "三值逻辑"],
  },
  {
    id: "sqt-fd-3",
    chapter: "sqt-filtering-data",
    level: 2,
    question: `AND和OR的优先级关系是什么？混合使用时应该怎么处理？`,
    answer: `AND的优先级高于OR。例如 \`WHERE a OR b AND c\` 等价于 \`WHERE a OR (b AND c)\`，而不是 \`(a OR b) AND c\`。混合使用时的最佳实践是始终用括号明确优先级，即使你记得优先级规则，加括号也能：①让SQL更可读，他人无需回忆优先级规则就能理解查询意图；②避免因优先级理解错误导致的逻辑bug；③让查询意图一目了然。`,
    tags: ["AND", "OR", "优先级", "最佳实践"],
  },
  {
    id: "sqt-fd-4",
    chapter: "sqt-filtering-data",
    level: 1,
    question: `LIKE通配符 \`%\` 和 \`_\` 分别是什么含义？使用时有什么注意事项？`,
    answer: `\`%\` 匹配任意数量字符（包括零个字符），\`_\` 匹配恰好一个字符。注意事项：①左通配（\`LIKE '%abc'\`）会导致全表扫描，无法使用索引，应尽量避免；②通配符搜索比普通搜索慢，能用 \`=\` 或 \`IN\` 就不要用LIKE；③某些数据库LIKE区分大小写（MySQL默认不区分，但受排序规则影响）；④需要匹配字面量的 \`%\` 或 \`_\` 时，需使用ESCAPE子句转义；⑤MySQL支持 \`REGEXP\` 做更强大的正则匹配。`,
    tags: ["LIKE", "通配符", "模式匹配", "性能"],
  },
];
