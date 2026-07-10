import type { ReviewQuestion } from "./types";

export const sqtSortingFilteringQuestions: ReviewQuestion[] = [
  {
    id: "sqt-sf-1",
    chapter: "sqt-sorting-filtering",
    level: 2,
    question: `\`ORDER BY price DESC, name\` 中 name 是升序还是降序？如何让两列都降序？`,
    answer: `name 是升序（ASC）。因为DESC关键字只修饰紧邻其前的列名，\`ORDER BY price DESC, name\` 等价于 \`ORDER BY price DESC, name ASC\`。如果需要两列都降序，必须写成 \`ORDER BY price DESC, name DESC\`，每个需要降序的列后面都要单独跟DESC关键字。这是多列排序中最常见的陷阱。`,
    tags: ["ORDER BY", "DESC", "多列排序", "陷阱"],
  },
  {
    id: "sqt-sf-2",
    chapter: "sqt-sorting-filtering",
    level: 2,
    question: `为什么WHERE中不能使用SELECT定义的列别名，而ORDER BY中可以？`,
    answer: `因为执行顺序：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY。WHERE在SELECT之前执行，此时别名还未定义，所以不能用。ORDER BY在SELECT之后执行，别名已经定义好了，所以可以用。例如 \`SELECT price*1.1 AS np FROM t WHERE np > 10\` 是错误的，应改为 \`WHERE price*1.1 > 10\`；但 \`ORDER BY np\` 是正确的。理解执行顺序是写对SQL的关键。`,
    tags: ["WHERE", "ORDER BY", "别名", "执行顺序"],
  },
  {
    id: "sqt-sf-3",
    chapter: "sqt-sorting-filtering",
    level: 2,
    question: `计算字段是什么？为什么计算字段需要用AS指定别名？`,
    answer: `计算字段是在SELECT阶段实时生成的派生数据，不实际存储在表中，包括拼接字段（如CONCAT）、算术运算（如price*quantity）和类型转换（如CAST）。需要用AS指定别名的原因：①不指定别名时，列名可能是整个表达式字符串（如\"price*quantity\"），前端无法稳定引用；②别名让结果集有语义化的列名，更易理解和使用；③在应用代码中通过别名引用列名更安全，不受表达式变化影响。`,
    tags: ["计算字段", "别名", "AS", "SELECT"],
  },
  {
    id: "sqt-sf-4",
    chapter: "sqt-sorting-filtering",
    level: 3,
    question: `整数除法在SQL中可能产生什么问题？如何避免？`,
    answer: `两个整数相除时，某些数据库会执行整数除法，截断小数部分。例如 \`7/2\` 结果可能是3而非3.5，导致计算精度丢失。避免方法：①将至少一个操作数转为浮点数或DECIMAL，如 \`7.0/2\`；②使用CAST显式转换类型，如 \`CAST(7 AS DECIMAL(10,2))/2\`；③在聚合计算中用AVG时注意数据类型，确保不会截断。最佳实践是涉及金额、比例等需要精度的计算时，始终确保使用浮点或DECIMAL类型。`,
    tags: ["整数除法", "CAST", "精度", "陷阱"],
  },
];
