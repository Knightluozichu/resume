import type { ReviewQuestion } from "./types";

export const sqtFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "sqt-fn-1",
    chapter: "sqt-functions",
    level: 3,
    question: "为什么对日期列使用函数（如 `YEAR(order_date) = 2024`）会导致索引失效？应该怎么写？",
    answer: "对列使用函数后，数据库需要对每一行的该列值先执行函数计算，再与常量比较，无法直接利用索引中已排序的值进行快速查找，因此退化为全表扫描。正确写法是使用范围查询：`WHERE order_date >= '2024-01-01' AND order_date < '2024-02-01'`，这样数据库可以直接利用索引上已排序的日期值进行范围定位，效率大幅提高。这是SQL性能优化中最常见的原则之一——不要在WHERE条件中对列使用函数。",
    tags: ["日期函数", "索引失效", "范围查询", "性能优化"],
  },
  {
    id: "sqt-fn-2",
    chapter: "sqt-functions",
    level: 2,
    question: "COALESCE函数的作用是什么？给出一个实际使用场景。",
    answer: "COALESCE返回参数列表中第一个非NULL值。语法：`COALESCE(val1, val2, val3, ...)`，从左到右找第一个非NULL值返回，如果全是NULL则返回NULL。实际场景：①显示NULL的默认值——`SELECT COALESCE(cust_email, '未填写') FROM customers`，将NULL邮箱显示为\"未填写\"；②多列优先取值——`SELECT COALESCE(mobile_phone, home_phone, work_phone) AS contact_phone`，优先返回手机号，没有则返回座机；③避免NULL参与运算——`price * COALESCE(discount, 1)` 避免折扣为NULL时整个计算结果为NULL。",
    tags: ["COALESCE", "NULL处理", "函数"],
  },
  {
    id: "sqt-fn-3",
    chapter: "sqt-functions",
    level: 2,
    question: "CASE WHEN表达式的语法是什么？它在SQL中扮演什么角色？",
    answer: "语法：`CASE WHEN 条件1 THEN 值1 [WHEN 条件2 THEN 值2 ...] [ELSE 默认值] END`。它是SQL中实现条件逻辑的标准方式，类似编程语言的if-else/if-elif-else。角色：①数据分类标注——如将价格分为\"便宜/适中/较贵\"；②条件计算——根据不同条件返回不同计算结果；③条件排序——在ORDER BY中实现自定义排序顺序。CASE WHEN是SQL标准，所有数据库都支持，比MySQL专有的IF函数更具可移植性。可用于SELECT、ORDER BY等位置，但不能直接用在WHERE中（应直接写条件）。",
    tags: ["CASE WHEN", "条件逻辑", "SQL标准"],
  },
  {
    id: "sqt-fn-4",
    chapter: "sqt-functions",
    level: 3,
    question: "SQL函数在不同数据库中的可移植性如何？举例说明。",
    answer: "SQL函数的可移植性较差，不同数据库的函数名和语法经常不同。典型例子：①字符串拼接——MySQL用CONCAT()，SQL Server用+运算符，Oracle用||运算符；②日期提取——MySQL用YEAR(date)，SQL Server用DATEPART(year, date)；③空值处理——MySQL有IFNULL()，SQL Server/Oracle用ISNULL()，标准SQL用COALESCE()；④LIMIT——MySQL/PostgreSQL用LIMIT，SQL Server用TOP，Oracle用ROWNUM。编写可移植SQL应优先使用SQL标准函数（如COALESCE），或使用ORM框架抽象差异。",
    tags: ["函数可移植性", "数据库差异", "CONCAT", "COALESCE"],
  },
];
