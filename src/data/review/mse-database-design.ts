import type { ReviewQuestion } from "./types";

export const mseDatabaseDesignQuestions: ReviewQuestion[] = [
  {
    id: "mse-dd-1",
    chapter: "mse-database-design",
    level: 2,
    question: `数据库三大范式分别是什么？各自要消除什么问题？请举例说明。`,
    answer: `第一范式1NF——原子性，每列不可再分。消除：重复列组。例：联系方式列不能同时存手机和邮箱，必须拆为phone和email两列。第二范式2NF——在1NF基础上，非主属性必须完全依赖主键（消除部分依赖）。消除：复合主键中部分列决定非主属性。例：选课表(学号,课程号)为复合主键，姓名只依赖学号不依赖课程号，应拆为学生表(学号→姓名)和选课表(学号,课程号→成绩)。第三范式3NF——在2NF基础上，非主属性必须直接依赖主键（消除传递依赖）。消除：非主属性通过其他非主属性间接依赖主键。例：学生表中学号→院系号→院系名，院系名传递依赖学号，应拆为学生表(学号→院系号)和院系表(院系号→院系名)。`,
    tags: ["三大范式", "1NF", "2NF", "3NF", "部分依赖", "传递依赖"],
  },
  {
    id: "mse-dd-2",
    chapter: "mse-database-design",
    level: 3,
    question: `什么是反范式设计？既然有三大范式为什么还需要反范式？举一个实际例子。`,
    answer: `反范式设计是在满足范式的基础上，为了提升查询性能而有意引入数据冗余的设计。原因：完全范式化会导致表拆分过细，查询需要大量JOIN，在 读多写少 + 高并发 场景下性能瓶颈明显。反范式用空间换时间，减少JOIN次数。实际例子：电商订单系统——范式化设计需要 orders JOIN customers 取客户名、JOIN products 取商品名。反范式做法：在orders表中冗余 customer_name 列、在order_items表中冗余 product_name 列。查询时直接从单表取数据，无需JOIN。代价：①客户改名需同步更新orders表（数据冗余维护成本）；②占用更多存储空间。适用场景：读远多于写、对查询延迟敏感、数据变更频率低（如商品名、分类名）。原则：先满足范式，再按需反范式，不可滥用。`,
    tags: ["反范式", "冗余", "JOIN优化", "空间换时间"],
  },
  {
    id: "mse-dd-3",
    chapter: "mse-database-design",
    level: 2,
    question: `主键选择有哪些策略？自增INT、UUID、复合主键各有什么优缺点？`,
    answer: `自增INT（AUTO_INCREMENT）：优点——占用空间小（4/8字节）、插入有序（B+Tree顺序写性能好）、简单易懂；缺点——单点生成（分布式需额外方案）、可预测（安全风险）。适合绝大多数单机/主从场景。UUID：优点——全局唯一（天然分布式）、不可预测（安全）；缺点——36字符占空间大、无序插入导致B+Tree页分裂（写入性能差）、索引膨胀。适合分布式多写节点场景，或用UUID变体（如雪花算法Snowflake）兼顾有序和唯一。复合主键（多列组合）：优点——业务语义明确（如订单+商品编号）；缺点——列数多占空间、外键引用复杂、索引性能不如单列。原则：优先自增INT做代理主键（与业务无关），业务唯一约束用UNIQUE KEY保证。复合主键仅用于纯粹的关联表（如order_items的order_id+product_id）。`,
    tags: ["主键", "自增INT", "UUID", "复合主键", "选型"],
  },
  {
    id: "mse-dd-4",
    chapter: "mse-database-design",
    level: 3,
    question: `如何为一对多和多对多关系设计表结构？请以"客户-订单"和"学生-课程"为例说明。`,
    answer: `一对多（客户-订单）：一个客户可以有多个订单，一个订单只属于一个客户。设计：在"多"的一方（orders表）加"一"的一方的主键作为外键——orders表加 customer_id 列引用 customers.id。不需要中间表。\nCREATE TABLE orders (id PK, customer_id FK REFERENCES customers(id), ...);\n\n多对多（学生-课程）：一个学生选多门课，一门课有多个学生。设计：必须建中间关联表，包含两方主键作为外键，组合成复合主键。\nCREATE TABLE student_course (\n  student_id INT FK REFERENCES students(id),\n  course_id INT FK REFERENCES courses(id),\n  score DECIMAL(5,2),\n  PRIMARY KEY (student_id, course_id)\n);\n中间表的额外列（如score成绩）正是多对多关系自身的属性。查询示例：SELECT s.name, c.name, sc.score FROM student_course sc JOIN students s ON sc.student_id=s.id JOIN courses c ON sc.course_id=c.id;`,
    tags: ["一对多", "多对多", "外键", "中间表", "ER建模", "实践"],
  },
];
