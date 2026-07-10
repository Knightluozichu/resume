import type { ReviewQuestion } from "./types";

export const dscRelationalModelQuestions: ReviewQuestion[] = [
  {
    id: "dsc-rm-1",
    chapter: "dsc-relational-model",
    level: 1,
    question: `解释关系、元组、属性、域四个概念及其对应关系。`,
    answer: `关系（Relation）是元组的集合，通俗说就是一张表。元组（Tuple）是关系中的一行，即一条记录。属性（Attribute）是关系中的一列，描述数据的一个特征。域（Domain）是某属性所有合法取值的集合，即该列的取值范围。对应关系：关系=表，元组=行，属性=列，域=列的取值范围。例如关系 \`student(ID, name, age)\`，\`{001, 张三, 20}\` 是一个元组，ID/name/age 是属性，age 的域可以是正整数集合。`,
    tags: ["关系模型", "基本概念", "元组", "属性"],
  },
  {
    id: "dsc-rm-2",
    chapter: "dsc-relational-model",
    level: 2,
    question: `超码、候选码、主码、外码有什么区别和联系？`,
    answer: `超码（Superkey）是能唯一标识元组的属性集合，可包含多余列，如 \`{ID, name}\`。候选码（Candidate Key）是最小的超码，去掉任何一列就不再唯一，如 \`{ID}\`。主码（Primary Key）是从多个候选码中选定一个作为主标识。外码（Foreign Key）是一个关系中的属性，引用另一关系的主码，建立表间联系。联系：所有主码都是候选码，所有候选码都是超码；主码用于表内标识，外码用于表间关联。例如 student.dept_id 是外码，引用 department.id（主码）。`,
    tags: ["键", "超码", "候选码", "主码", "外码"],
  },
  {
    id: "dsc-rm-3",
    chapter: "dsc-relational-model",
    level: 2,
    question: `三类完整性约束分别是什么？各举一个 SQL 实现的例子。`,
    answer: `①实体完整性：主码不能取空值且唯一，保证每个元组可唯一标识。SQL：\`ID VARCHAR(10) PRIMARY KEY\`。②参照完整性：外码值必须匹配被引用关系的主码或为 NULL，保证表间引用不悬空。SQL：\`FOREIGN KEY (dept_id) REFERENCES department(id)\`。③用户定义完整性（域完整性）：属性值满足业务规则。SQL：\`age INT CHECK (age > 0)\` 或 \`name VARCHAR(50) NOT NULL\`。三者共同保证数据的正确性和一致性。`,
    tags: ["完整性约束", "实体完整性", "参照完整性", "用户定义完整性"],
  },
  {
    id: "dsc-rm-4",
    chapter: "dsc-relational-model",
    level: 2,
    question: `为什么主码不能为空，而外码可以为空？这体现了什么完整性约束？`,
    answer: `主码不能为空是实体完整性的要求——主码用于唯一标识每个元组，若为空就无法区分和标识元组，违反\"每个元组可被唯一标识\"的原则。外码可以为空是参照完整性的允许——外码为 NULL 表示\"尚未关联\"，例如新员工还没分配部门时 \`dept_id\` 为 NULL，这不违反参照完整性（参照完整性只要求外码非空时必须匹配被引用主码）。这体现了：实体完整性针对表内主标识的严格性，参照完整性针对表间引用的灵活性。`,
    tags: ["主码", "外码", "实体完整性", "参照完整性", "NULL语义"],
  },
];
