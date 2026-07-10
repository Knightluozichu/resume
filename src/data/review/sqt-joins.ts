import type { ReviewQuestion } from "./types";

export const sqtJoinsQuestions: ReviewQuestion[] = [
  {
    id: "sqt-join-1",
    chapter: "sqt-joins",
    level: 2,
    question: `INNER JOIN和LEFT JOIN的区别是什么？分别适合什么场景？`,
    answer: `INNER JOIN只返回两表在关联列上匹配的行，不匹配的行被排除。LEFT JOIN返回左表的全部行，右表无匹配时右表列填NULL。场景：①INNER JOIN适合\"只关心有关联的数据\"——如查询有订单的客户的产品信息；②LEFT JOIN适合\"需要保留左表全部数据\"——如查询所有客户及其订单（包括没下过单的客户）。LEFT JOIN配合 \`WHERE 右表.列 IS NULL\` 还可实现\"反连接\"——查询没有关联记录的行，如\"没有下过单的客户\"。`,
    tags: ["INNER JOIN", "LEFT JOIN", "JOIN类型", "核心概念"],
  },
  {
    id: "sqt-join-2",
    chapter: "sqt-joins",
    level: 3,
    question: `什么是自联结（Self-Join）？举一个实际使用场景，并说明它与子查询相比的优势。`,
    answer: `自联结是同一张表通过不同别名当作两份来JOIN。实际场景：查询与产品DTNTR同一供应商的其他产品。SQL：\`SELECT p1.prod_id FROM products AS p1 JOIN products AS p2 ON p1.vend_id = p2.vend_id WHERE p2.prod_id = 'DTNTR' AND p1.prod_id != 'DTNTR'\`。与子查询（\`WHERE vend_id = (SELECT vend_id FROM products WHERE prod_id = 'DTNTR')\`）相比的优势：①性能通常更好——数据库优化器更擅长优化JOIN而非子查询；②语法更灵活——可以在SELECT中同时引用p1和p2的列；③可以处理更复杂的多列关联条件。`,
    tags: ["自联结", "Self-Join", "子查询", "性能"],
  },
  {
    id: "sqt-join-3",
    chapter: "sqt-joins",
    level: 2,
    question: `为什么在JOIN中推荐使用ON子句而不是WHERE来指定关联条件？`,
    answer: `推荐用ON指定关联条件的原因：①符合SQL标准——ON是JOIN的标准语法，WHERE是旧式逗号连接语法的遗留写法；②语义清晰——ON表示\"两表如何关联\"，WHERE表示\"如何过滤结果\"，职责分离让SQL更易读；③对外联结有意义——在LEFT JOIN中，ON条件决定如何匹配（不影响左表全部行返回），WHERE条件决定最终过滤（会过滤掉NULL行），两者行为不同；④可维护性——修改过滤条件时只需改WHERE，不影响关联逻辑。`,
    tags: ["ON", "WHERE", "JOIN", "SQL标准"],
  },
  {
    id: "sqt-join-4",
    chapter: "sqt-joins",
    level: 3,
    question: `如何用LEFT JOIN实现\"查询没有下过订单的客户\"？`,
    answer: `使用LEFT JOIN配合IS NULL过滤：\`SELECT c.cust_name FROM customers AS c LEFT JOIN orders AS o ON c.cust_id = o.cust_id WHERE o.order_num IS NULL\`。原理：LEFT JOIN返回所有客户，没有订单的客户其orders表列为NULL。通过 \`WHERE o.order_num IS NULL\` 过滤出这些NULL行，就是没有订单的客户。这被称为\"反连接\"（Anti-Join），比用NOT IN子查询更安全（不会受NULL影响）也更高效。注意必须用LEFT JOIN不能是INNER JOIN，否则没有订单的客户一开始就被排除了。`,
    tags: ["LEFT JOIN", "反连接", "IS NULL", "NULL处理"],
  },
];
