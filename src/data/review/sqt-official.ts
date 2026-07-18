import type { ReviewQuestion } from "./types";

export const sqtOfficialQuestions: ReviewQuestion[] = [
  {
    id: "sqt-official-learning-map-q1",
    chapter: "sqt-official-learning-map",
    level: 1,
    question: "为什么“第5版权威学习地图”必须覆盖28个正式节点？",
    answer:
      "这些节点共同组成“按22课从SELECT、过滤与汇总推进到写入、对象、事务和高级特性”的语义、语法、结果、失败和方言链，缺项会使22课依赖图、4附录速查入口、样例表模型和跨DBMS方言账本无法复现。",
    tags: ["SQL必知必会", "第5版", "第5版权威学习地图"],
  },
  {
    id: "sqt-official-learning-map-q2",
    chapter: "sqt-official-learning-map",
    level: 1,
    question: "“第5版权威学习地图”的最小正确性合同是什么？",
    answer:
      "每课保留正式目录节点、SQL实验、挑战题、失败反例和可移植性验证；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第5版权威学习地图"],
  },
  {
    id: "sqt-official-learning-map-q3",
    chapter: "sqt-official-learning-map",
    level: 2,
    question: "怎样为“第5版权威学习地图”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第5版权威学习地图"],
  },
  {
    id: "sqt-official-learning-map-q4",
    chapter: "sqt-official-learning-map",
    level: 2,
    question: "“第5版权威学习地图”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第5版权威学习地图"],
  },
  {
    id: "sqt-official-learning-map-q5",
    chapter: "sqt-official-learning-map",
    level: 3,
    question: "如何验证“第5版权威学习地图”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第5版权威学习地图"],
  },
  {
    id: "sqt-official-learning-map-q6",
    chapter: "sqt-official-learning-map",
    level: 3,
    question: "“第5版权威学习地图”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、22课依赖图、4附录速查入口、样例表模型和跨DBMS方言账本、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第5版权威学习地图"],
  },
  {
    id: "sqt-lesson01-understanding-sql-q1",
    chapter: "sqt-lesson01-understanding-sql",
    level: 1,
    question: "为什么“第1课 了解SQL”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“以数据库、表、列、数据类型、行和主键建立关系数据的最小词汇”的语义、语法、结果、失败和方言链，缺项会使样例库对象字典、主键检查和跨DBMS环境卡无法复现。",
    tags: ["SQL必知必会", "第5版", "第1课 了解SQL"],
  },
  {
    id: "sqt-lesson01-understanding-sql-q2",
    chapter: "sqt-lesson01-understanding-sql",
    level: 1,
    question: "“第1课 了解SQL”的最小正确性合同是什么？",
    answer:
      "每行可由稳定主键识别，列值服从数据类型，所有SQL都指向已确认的数据库对象；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第1课 了解SQL"],
  },
  {
    id: "sqt-lesson01-understanding-sql-q3",
    chapter: "sqt-lesson01-understanding-sql",
    level: 2,
    question: "怎样为“第1课 了解SQL”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第1课 了解SQL"],
  },
  {
    id: "sqt-lesson01-understanding-sql-q4",
    chapter: "sqt-lesson01-understanding-sql",
    level: 2,
    question: "“第1课 了解SQL”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第1课 了解SQL"],
  },
  {
    id: "sqt-lesson01-understanding-sql-q5",
    chapter: "sqt-lesson01-understanding-sql",
    level: 3,
    question: "如何验证“第1课 了解SQL”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第1课 了解SQL"],
  },
  {
    id: "sqt-lesson01-understanding-sql-q6",
    chapter: "sqt-lesson01-understanding-sql",
    level: 3,
    question: "“第1课 了解SQL”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、样例库对象字典、主键检查和跨DBMS环境卡、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第1课 了解SQL"],
  },
  {
    id: "sqt-lesson02-retrieving-data-q1",
    chapter: "sqt-lesson02-retrieving-data",
    level: 1,
    question: "为什么“第2课 检索数据”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“用SELECT精确声明目标列、去重、限制结果和注释”的语义、语法、结果、失败和方言链，缺项会使SELECT结果合同、列投影对照和限制语法方言表无法复现。",
    tags: ["SQL必知必会", "第5版", "第2课 检索数据"],
  },
  {
    id: "sqt-lesson02-retrieving-data-q2",
    chapter: "sqt-lesson02-retrieving-data",
    level: 1,
    question: "“第2课 检索数据”的最小正确性合同是什么？",
    answer:
      "结果列由投影显式确定，DISTINCT作用于完整行，限制语法不改变查询含义；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第2课 检索数据"],
  },
  {
    id: "sqt-lesson02-retrieving-data-q3",
    chapter: "sqt-lesson02-retrieving-data",
    level: 2,
    question: "怎样为“第2课 检索数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第2课 检索数据"],
  },
  {
    id: "sqt-lesson02-retrieving-data-q4",
    chapter: "sqt-lesson02-retrieving-data",
    level: 2,
    question: "“第2课 检索数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第2课 检索数据"],
  },
  {
    id: "sqt-lesson02-retrieving-data-q5",
    chapter: "sqt-lesson02-retrieving-data",
    level: 3,
    question: "如何验证“第2课 检索数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第2课 检索数据"],
  },
  {
    id: "sqt-lesson02-retrieving-data-q6",
    chapter: "sqt-lesson02-retrieving-data",
    level: 3,
    question: "“第2课 检索数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、SELECT结果合同、列投影对照和限制语法方言表、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第2课 检索数据"],
  },
  {
    id: "sqt-lesson03-sorting-data-q1",
    chapter: "sqt-lesson03-sorting-data",
    level: 1,
    question: "为什么“第3课 排序检索数据”必须覆盖6个正式节点？",
    answer:
      "这些节点共同组成“用ORDER BY建立单列、多列、位置和方向明确的确定性顺序”的语义、语法、结果、失败和方言链，缺项会使排序键表、并列值样本和稳定分页验证无法复现。",
    tags: ["SQL必知必会", "第5版", "第3课 排序检索数据"],
  },
  {
    id: "sqt-lesson03-sorting-data-q2",
    chapter: "sqt-lesson03-sorting-data",
    level: 1,
    question: "“第3课 排序检索数据”的最小正确性合同是什么？",
    answer:
      "顺序仅由ORDER BY保证；并列行必须用额外唯一键打破平局；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第3课 排序检索数据"],
  },
  {
    id: "sqt-lesson03-sorting-data-q3",
    chapter: "sqt-lesson03-sorting-data",
    level: 2,
    question: "怎样为“第3课 排序检索数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第3课 排序检索数据"],
  },
  {
    id: "sqt-lesson03-sorting-data-q4",
    chapter: "sqt-lesson03-sorting-data",
    level: 2,
    question: "“第3课 排序检索数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第3课 排序检索数据"],
  },
  {
    id: "sqt-lesson03-sorting-data-q5",
    chapter: "sqt-lesson03-sorting-data",
    level: 3,
    question: "如何验证“第3课 排序检索数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第3课 排序检索数据"],
  },
  {
    id: "sqt-lesson03-sorting-data-q6",
    chapter: "sqt-lesson03-sorting-data",
    level: 3,
    question: "“第3课 排序检索数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、排序键表、并列值样本和稳定分页验证、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第3课 排序检索数据"],
  },
  {
    id: "sqt-lesson04-filtering-data-q1",
    chapter: "sqt-lesson04-filtering-data",
    level: 1,
    question: "为什么“第4课 过滤数据”必须覆盖8个正式节点？",
    answer:
      "这些节点共同组成“用WHERE、比较、范围和空值判断定义目标行集”的语义、语法、结果、失败和方言链，缺项会使谓词真值表、边界数据集和NULL反例无法复现。",
    tags: ["SQL必知必会", "第5版", "第4课 过滤数据"],
  },
  {
    id: "sqt-lesson04-filtering-data-q2",
    chapter: "sqt-lesson04-filtering-data",
    level: 1,
    question: "“第4课 过滤数据”的最小正确性合同是什么？",
    answer:
      "过滤谓词对等值、不等值、范围端点和NULL分别给出可预测结果；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第4课 过滤数据"],
  },
  {
    id: "sqt-lesson04-filtering-data-q3",
    chapter: "sqt-lesson04-filtering-data",
    level: 2,
    question: "怎样为“第4课 过滤数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第4课 过滤数据"],
  },
  {
    id: "sqt-lesson04-filtering-data-q4",
    chapter: "sqt-lesson04-filtering-data",
    level: 2,
    question: "“第4课 过滤数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第4课 过滤数据"],
  },
  {
    id: "sqt-lesson04-filtering-data-q5",
    chapter: "sqt-lesson04-filtering-data",
    level: 3,
    question: "如何验证“第4课 过滤数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第4课 过滤数据"],
  },
  {
    id: "sqt-lesson04-filtering-data-q6",
    chapter: "sqt-lesson04-filtering-data",
    level: 3,
    question: "“第4课 过滤数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、谓词真值表、边界数据集和NULL反例、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第4课 过滤数据"],
  },
  {
    id: "sqt-lesson05-advanced-filtering-q1",
    chapter: "sqt-lesson05-advanced-filtering",
    level: 1,
    question: "为什么“第5课 高级数据过滤”必须覆盖8个正式节点？",
    answer:
      "这些节点共同组成“用AND、OR、IN、NOT和括号组合复杂筛选条件”的语义、语法、结果、失败和方言链，缺项会使组合谓词树、优先级反例和等价改写对照无法复现。",
    tags: ["SQL必知必会", "第5版", "第5课 高级数据过滤"],
  },
  {
    id: "sqt-lesson05-advanced-filtering-q2",
    chapter: "sqt-lesson05-advanced-filtering",
    level: 1,
    question: "“第5课 高级数据过滤”的最小正确性合同是什么？",
    answer:
      "组合条件的分组由括号显式表达，IN与OR等价性和NULL行为经过验证；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第5课 高级数据过滤"],
  },
  {
    id: "sqt-lesson05-advanced-filtering-q3",
    chapter: "sqt-lesson05-advanced-filtering",
    level: 2,
    question: "怎样为“第5课 高级数据过滤”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第5课 高级数据过滤"],
  },
  {
    id: "sqt-lesson05-advanced-filtering-q4",
    chapter: "sqt-lesson05-advanced-filtering",
    level: 2,
    question: "“第5课 高级数据过滤”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第5课 高级数据过滤"],
  },
  {
    id: "sqt-lesson05-advanced-filtering-q5",
    chapter: "sqt-lesson05-advanced-filtering",
    level: 3,
    question: "如何验证“第5课 高级数据过滤”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第5课 高级数据过滤"],
  },
  {
    id: "sqt-lesson05-advanced-filtering-q6",
    chapter: "sqt-lesson05-advanced-filtering",
    level: 3,
    question: "“第5课 高级数据过滤”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、组合谓词树、优先级反例和等价改写对照、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第5课 高级数据过滤"],
  },
  {
    id: "sqt-lesson06-wildcards-q1",
    chapter: "sqt-lesson06-wildcards",
    level: 1,
    question: "为什么“第6课 用通配符进行过滤”必须覆盖7个正式节点？",
    answer:
      "这些节点共同组成“用LIKE和百分号、下划线、方括号通配符表达模式边界”的语义、语法、结果、失败和方言链，缺项会使模式样本矩阵、转义测试和方言支持表无法复现。",
    tags: ["SQL必知必会", "第5版", "第6课 用通配符进行过滤"],
  },
  {
    id: "sqt-lesson06-wildcards-q2",
    chapter: "sqt-lesson06-wildcards",
    level: 1,
    question: "“第6课 用通配符进行过滤”的最小正确性合同是什么？",
    answer:
      "通配符位置、大小写、尾随空格和转义规则在目标DBMS上有明确结果；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第6课 用通配符进行过滤"],
  },
  {
    id: "sqt-lesson06-wildcards-q3",
    chapter: "sqt-lesson06-wildcards",
    level: 2,
    question: "怎样为“第6课 用通配符进行过滤”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第6课 用通配符进行过滤"],
  },
  {
    id: "sqt-lesson06-wildcards-q4",
    chapter: "sqt-lesson06-wildcards",
    level: 2,
    question: "“第6课 用通配符进行过滤”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第6课 用通配符进行过滤"],
  },
  {
    id: "sqt-lesson06-wildcards-q5",
    chapter: "sqt-lesson06-wildcards",
    level: 3,
    question: "如何验证“第6课 用通配符进行过滤”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第6课 用通配符进行过滤"],
  },
  {
    id: "sqt-lesson06-wildcards-q6",
    chapter: "sqt-lesson06-wildcards",
    level: 3,
    question: "“第6课 用通配符进行过滤”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、模式样本矩阵、转义测试和方言支持表、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第6课 用通配符进行过滤"],
  },
  {
    id: "sqt-lesson07-calculated-fields-q1",
    chapter: "sqt-lesson07-calculated-fields",
    level: 1,
    question: "为什么“第7课 创建计算字段”必须覆盖6个正式节点？",
    answer:
      "这些节点共同组成“用拼接、别名和算术表达式构造可消费的派生列”的语义、语法、结果、失败和方言链，缺项会使计算字段合同、拼接方言表和金额对账查询无法复现。",
    tags: ["SQL必知必会", "第5版", "第7课 创建计算字段"],
  },
  {
    id: "sqt-lesson07-calculated-fields-q2",
    chapter: "sqt-lesson07-calculated-fields",
    level: 1,
    question: "“第7课 创建计算字段”的最小正确性合同是什么？",
    answer:
      "别名稳定，拼接与NULL规则明确，金额计算的类型和精度符合业务口径；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第7课 创建计算字段"],
  },
  {
    id: "sqt-lesson07-calculated-fields-q3",
    chapter: "sqt-lesson07-calculated-fields",
    level: 2,
    question: "怎样为“第7课 创建计算字段”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第7课 创建计算字段"],
  },
  {
    id: "sqt-lesson07-calculated-fields-q4",
    chapter: "sqt-lesson07-calculated-fields",
    level: 2,
    question: "“第7课 创建计算字段”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第7课 创建计算字段"],
  },
  {
    id: "sqt-lesson07-calculated-fields-q5",
    chapter: "sqt-lesson07-calculated-fields",
    level: 3,
    question: "如何验证“第7课 创建计算字段”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第7课 创建计算字段"],
  },
  {
    id: "sqt-lesson07-calculated-fields-q6",
    chapter: "sqt-lesson07-calculated-fields",
    level: 3,
    question: "“第7课 创建计算字段”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、计算字段合同、拼接方言表和金额对账查询、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第7课 创建计算字段"],
  },
  {
    id: "sqt-lesson08-functions-q1",
    chapter: "sqt-lesson08-functions",
    level: 1,
    question: "为什么“第8课 使用函数处理数据”必须覆盖8个正式节点？",
    answer:
      "这些节点共同组成“使用文本、日期时间和数值函数，同时管理不可移植性”的语义、语法、结果、失败和方言链，缺项会使函数能力表、输入输出样本和跨DBMS等价改写无法复现。",
    tags: ["SQL必知必会", "第5版", "第8课 使用函数处理数据"],
  },
  {
    id: "sqt-lesson08-functions-q2",
    chapter: "sqt-lesson08-functions",
    level: 1,
    question: "“第8课 使用函数处理数据”的最小正确性合同是什么？",
    answer:
      "函数的参数、返回类型、NULL、时区和精度行为在目标DBMS上可重放；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第8课 使用函数处理数据"],
  },
  {
    id: "sqt-lesson08-functions-q3",
    chapter: "sqt-lesson08-functions",
    level: 2,
    question: "怎样为“第8课 使用函数处理数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第8课 使用函数处理数据"],
  },
  {
    id: "sqt-lesson08-functions-q4",
    chapter: "sqt-lesson08-functions",
    level: 2,
    question: "“第8课 使用函数处理数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第8课 使用函数处理数据"],
  },
  {
    id: "sqt-lesson08-functions-q5",
    chapter: "sqt-lesson08-functions",
    level: 3,
    question: "如何验证“第8课 使用函数处理数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第8课 使用函数处理数据"],
  },
  {
    id: "sqt-lesson08-functions-q6",
    chapter: "sqt-lesson08-functions",
    level: 3,
    question: "“第8课 使用函数处理数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、函数能力表、输入输出样本和跨DBMS等价改写、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第8课 使用函数处理数据"],
  },
  {
    id: "sqt-lesson09-summarizing-data-q1",
    chapter: "sqt-lesson09-summarizing-data",
    level: 1,
    question: "为什么“第9课 汇总数据”必须覆盖10个正式节点？",
    answer:
      "这些节点共同组成“用AVG、COUNT、MAX、MIN、SUM和DISTINCT建立汇总口径”的语义、语法、结果、失败和方言链，缺项会使聚集口径表、NULL样本和多指标对账无法复现。",
    tags: ["SQL必知必会", "第5版", "第9课 汇总数据"],
  },
  {
    id: "sqt-lesson09-summarizing-data-q2",
    chapter: "sqt-lesson09-summarizing-data",
    level: 1,
    question: "“第9课 汇总数据”的最小正确性合同是什么？",
    answer:
      "每个聚集函数的分母、NULL处理和DISTINCT范围均被明确；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第9课 汇总数据"],
  },
  {
    id: "sqt-lesson09-summarizing-data-q3",
    chapter: "sqt-lesson09-summarizing-data",
    level: 2,
    question: "怎样为“第9课 汇总数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第9课 汇总数据"],
  },
  {
    id: "sqt-lesson09-summarizing-data-q4",
    chapter: "sqt-lesson09-summarizing-data",
    level: 2,
    question: "“第9课 汇总数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第9课 汇总数据"],
  },
  {
    id: "sqt-lesson09-summarizing-data-q5",
    chapter: "sqt-lesson09-summarizing-data",
    level: 3,
    question: "如何验证“第9课 汇总数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第9课 汇总数据"],
  },
  {
    id: "sqt-lesson09-summarizing-data-q6",
    chapter: "sqt-lesson09-summarizing-data",
    level: 3,
    question: "“第9课 汇总数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、聚集口径表、NULL样本和多指标对账、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第9课 汇总数据"],
  },
  {
    id: "sqt-lesson10-grouping-data-q1",
    chapter: "sqt-lesson10-grouping-data",
    level: 1,
    question: "为什么“第10课 分组数据”必须覆盖7个正式节点？",
    answer:
      "这些节点共同组成“用GROUP BY和HAVING建立分组粒度并理解SELECT子句顺序”的语义、语法、结果、失败和方言链，缺项会使分组粒度说明、HAVING对照和子句执行流程无法复现。",
    tags: ["SQL必知必会", "第5版", "第10课 分组数据"],
  },
  {
    id: "sqt-lesson10-grouping-data-q2",
    chapter: "sqt-lesson10-grouping-data",
    level: 1,
    question: "“第10课 分组数据”的最小正确性合同是什么？",
    answer:
      "结果每行对应一个明确定义的组，非聚集列属于分组键，组过滤口径正确；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第10课 分组数据"],
  },
  {
    id: "sqt-lesson10-grouping-data-q3",
    chapter: "sqt-lesson10-grouping-data",
    level: 2,
    question: "怎样为“第10课 分组数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第10课 分组数据"],
  },
  {
    id: "sqt-lesson10-grouping-data-q4",
    chapter: "sqt-lesson10-grouping-data",
    level: 2,
    question: "“第10课 分组数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第10课 分组数据"],
  },
  {
    id: "sqt-lesson10-grouping-data-q5",
    chapter: "sqt-lesson10-grouping-data",
    level: 3,
    question: "如何验证“第10课 分组数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第10课 分组数据"],
  },
  {
    id: "sqt-lesson10-grouping-data-q6",
    chapter: "sqt-lesson10-grouping-data",
    level: 3,
    question: "“第10课 分组数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、分组粒度说明、HAVING对照和子句执行流程、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第10课 分组数据"],
  },
  {
    id: "sqt-lesson11-subqueries-q1",
    chapter: "sqt-lesson11-subqueries",
    level: 1,
    question: "为什么“第11课 使用子查询”必须覆盖5个正式节点？",
    answer:
      "这些节点共同组成“用子查询完成行集过滤和标量计算，并验证返回基数”的语义、语法、结果、失败和方言链，缺项会使内外查询数据流、基数断言和联结等价改写无法复现。",
    tags: ["SQL必知必会", "第5版", "第11课 使用子查询"],
  },
  {
    id: "sqt-lesson11-subqueries-q2",
    chapter: "sqt-lesson11-subqueries",
    level: 1,
    question: "“第11课 使用子查询”的最小正确性合同是什么？",
    answer:
      "子查询返回列数与行数符合所在上下文，相关引用和NULL语义明确；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第11课 使用子查询"],
  },
  {
    id: "sqt-lesson11-subqueries-q3",
    chapter: "sqt-lesson11-subqueries",
    level: 2,
    question: "怎样为“第11课 使用子查询”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第11课 使用子查询"],
  },
  {
    id: "sqt-lesson11-subqueries-q4",
    chapter: "sqt-lesson11-subqueries",
    level: 2,
    question: "“第11课 使用子查询”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第11课 使用子查询"],
  },
  {
    id: "sqt-lesson11-subqueries-q5",
    chapter: "sqt-lesson11-subqueries",
    level: 3,
    question: "如何验证“第11课 使用子查询”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第11课 使用子查询"],
  },
  {
    id: "sqt-lesson11-subqueries-q6",
    chapter: "sqt-lesson11-subqueries",
    level: 3,
    question: "“第11课 使用子查询”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、内外查询数据流、基数断言和联结等价改写、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第11课 使用子查询"],
  },
  {
    id: "sqt-lesson12-joining-tables-q1",
    chapter: "sqt-lesson12-joining-tables",
    level: 1,
    question: "为什么“第12课 联结表”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“从关系表和键出发建立正确的内联结与多表联结”的语义、语法、结果、失败和方言链，缺项会使联结图、基数预测、笛卡尔积反例和结果对账无法复现。",
    tags: ["SQL必知必会", "第5版", "第12课 联结表"],
  },
  {
    id: "sqt-lesson12-joining-tables-q2",
    chapter: "sqt-lesson12-joining-tables",
    level: 1,
    question: "“第12课 联结表”的最小正确性合同是什么？",
    answer:
      "每条联结谓词对应真实关系，结果行数与一对一或一对多基数预测一致；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第12课 联结表"],
  },
  {
    id: "sqt-lesson12-joining-tables-q3",
    chapter: "sqt-lesson12-joining-tables",
    level: 2,
    question: "怎样为“第12课 联结表”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第12课 联结表"],
  },
  {
    id: "sqt-lesson12-joining-tables-q4",
    chapter: "sqt-lesson12-joining-tables",
    level: 2,
    question: "“第12课 联结表”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第12课 联结表"],
  },
  {
    id: "sqt-lesson12-joining-tables-q5",
    chapter: "sqt-lesson12-joining-tables",
    level: 3,
    question: "如何验证“第12课 联结表”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第12课 联结表"],
  },
  {
    id: "sqt-lesson12-joining-tables-q6",
    chapter: "sqt-lesson12-joining-tables",
    level: 3,
    question: "“第12课 联结表”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、联结图、基数预测、笛卡尔积反例和结果对账、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第12课 联结表"],
  },
  {
    id: "sqt-lesson13-advanced-joins-q1",
    chapter: "sqt-lesson13-advanced-joins",
    level: 1,
    question: "为什么“第13课 创建高级联结”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“使用表别名、自联结、自然联结、外联结和聚集联结”的语义、语法、结果、失败和方言链，缺项会使联结类型矩阵、保留侧样本和重复计数检查无法复现。",
    tags: ["SQL必知必会", "第5版", "第13课 创建高级联结"],
  },
  {
    id: "sqt-lesson13-advanced-joins-q2",
    chapter: "sqt-lesson13-advanced-joins",
    level: 1,
    question: "“第13课 创建高级联结”的最小正确性合同是什么？",
    answer:
      "外联结保留侧明确，自联结角色别名清楚，聚集前后的行数变化可解释；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第13课 创建高级联结"],
  },
  {
    id: "sqt-lesson13-advanced-joins-q3",
    chapter: "sqt-lesson13-advanced-joins",
    level: 2,
    question: "怎样为“第13课 创建高级联结”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第13课 创建高级联结"],
  },
  {
    id: "sqt-lesson13-advanced-joins-q4",
    chapter: "sqt-lesson13-advanced-joins",
    level: 2,
    question: "“第13课 创建高级联结”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第13课 创建高级联结"],
  },
  {
    id: "sqt-lesson13-advanced-joins-q5",
    chapter: "sqt-lesson13-advanced-joins",
    level: 3,
    question: "如何验证“第13课 创建高级联结”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第13课 创建高级联结"],
  },
  {
    id: "sqt-lesson13-advanced-joins-q6",
    chapter: "sqt-lesson13-advanced-joins",
    level: 3,
    question: "“第13课 创建高级联结”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、联结类型矩阵、保留侧样本和重复计数检查、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第13课 创建高级联结"],
  },
  {
    id: "sqt-lesson14-combining-queries-q1",
    chapter: "sqt-lesson14-combining-queries",
    level: 1,
    question: "为什么“第14课 组合查询”必须覆盖8个正式节点？",
    answer:
      "这些节点共同组成“用UNION与UNION ALL组合列兼容的查询并统一排序”的语义、语法、结果、失败和方言链，缺项会使分支结果表、去重成本对照和组合结果合同无法复现。",
    tags: ["SQL必知必会", "第5版", "第14课 组合查询"],
  },
  {
    id: "sqt-lesson14-combining-queries-q2",
    chapter: "sqt-lesson14-combining-queries",
    level: 1,
    question: "“第14课 组合查询”的最小正确性合同是什么？",
    answer:
      "每个分支列数和类型兼容，去重选择明确，ORDER BY作用于完整组合结果；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第14课 组合查询"],
  },
  {
    id: "sqt-lesson14-combining-queries-q3",
    chapter: "sqt-lesson14-combining-queries",
    level: 2,
    question: "怎样为“第14课 组合查询”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第14课 组合查询"],
  },
  {
    id: "sqt-lesson14-combining-queries-q4",
    chapter: "sqt-lesson14-combining-queries",
    level: 2,
    question: "“第14课 组合查询”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第14课 组合查询"],
  },
  {
    id: "sqt-lesson14-combining-queries-q5",
    chapter: "sqt-lesson14-combining-queries",
    level: 3,
    question: "如何验证“第14课 组合查询”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第14课 组合查询"],
  },
  {
    id: "sqt-lesson14-combining-queries-q6",
    chapter: "sqt-lesson14-combining-queries",
    level: 3,
    question: "“第14课 组合查询”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、分支结果表、去重成本对照和组合结果合同、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第14课 组合查询"],
  },
  {
    id: "sqt-lesson15-inserting-data-q1",
    chapter: "sqt-lesson15-inserting-data",
    level: 1,
    question: "为什么“第15课 插入数据”必须覆盖7个正式节点？",
    answer:
      "这些节点共同组成“用INSERT完成完整行、部分行、查询结果插入和表复制”的语义、语法、结果、失败和方言链，缺项会使插入列映射、默认值检查、影响行数和复制对账无法复现。",
    tags: ["SQL必知必会", "第5版", "第15课 插入数据"],
  },
  {
    id: "sqt-lesson15-inserting-data-q2",
    chapter: "sqt-lesson15-inserting-data",
    level: 1,
    question: "“第15课 插入数据”的最小正确性合同是什么？",
    answer:
      "列清单与值一一对应，缺省列规则明确，INSERT SELECT的源目标基数可核对；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第15课 插入数据"],
  },
  {
    id: "sqt-lesson15-inserting-data-q3",
    chapter: "sqt-lesson15-inserting-data",
    level: 2,
    question: "怎样为“第15课 插入数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第15课 插入数据"],
  },
  {
    id: "sqt-lesson15-inserting-data-q4",
    chapter: "sqt-lesson15-inserting-data",
    level: 2,
    question: "“第15课 插入数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第15课 插入数据"],
  },
  {
    id: "sqt-lesson15-inserting-data-q5",
    chapter: "sqt-lesson15-inserting-data",
    level: 3,
    question: "如何验证“第15课 插入数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第15课 插入数据"],
  },
  {
    id: "sqt-lesson15-inserting-data-q6",
    chapter: "sqt-lesson15-inserting-data",
    level: 3,
    question: "“第15课 插入数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、插入列映射、默认值检查、影响行数和复制对账、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第15课 插入数据"],
  },
  {
    id: "sqt-lesson16-updating-deleting-q1",
    chapter: "sqt-lesson16-updating-deleting",
    level: 1,
    question: "为什么“第16课 更新和删除数据”必须覆盖5个正式节点？",
    answer:
      "这些节点共同组成“安全执行UPDATE和DELETE，并以预览、事务和影响行数控制范围”的语义、语法、结果、失败和方言链，缺项会使写操作预览、前后快照、回滚脚本和影响行数门禁无法复现。",
    tags: ["SQL必知必会", "第5版", "第16课 更新和删除数据"],
  },
  {
    id: "sqt-lesson16-updating-deleting-q2",
    chapter: "sqt-lesson16-updating-deleting",
    level: 1,
    question: "“第16课 更新和删除数据”的最小正确性合同是什么？",
    answer:
      "写操作只命中预期行集，约束持续成立，错误范围可回滚或恢复；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第16课 更新和删除数据"],
  },
  {
    id: "sqt-lesson16-updating-deleting-q3",
    chapter: "sqt-lesson16-updating-deleting",
    level: 2,
    question: "怎样为“第16课 更新和删除数据”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第16课 更新和删除数据"],
  },
  {
    id: "sqt-lesson16-updating-deleting-q4",
    chapter: "sqt-lesson16-updating-deleting",
    level: 2,
    question: "“第16课 更新和删除数据”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第16课 更新和删除数据"],
  },
  {
    id: "sqt-lesson16-updating-deleting-q5",
    chapter: "sqt-lesson16-updating-deleting",
    level: 3,
    question: "如何验证“第16课 更新和删除数据”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第16课 更新和删除数据"],
  },
  {
    id: "sqt-lesson16-updating-deleting-q6",
    chapter: "sqt-lesson16-updating-deleting",
    level: 3,
    question: "“第16课 更新和删除数据”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、写操作预览、前后快照、回滚脚本和影响行数门禁、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第16课 更新和删除数据"],
  },
  {
    id: "sqt-lesson17-tables-q1",
    chapter: "sqt-lesson17-tables",
    level: 1,
    question: "为什么“第17课 创建和操纵表”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“用CREATE、ALTER、DROP和重命名语句管理表结构”的语义、语法、结果、失败和方言链，缺项会使可重放DDL、NULL与默认值测试、迁移和回退脚本无法复现。",
    tags: ["SQL必知必会", "第5版", "第17课 创建和操纵表"],
  },
  {
    id: "sqt-lesson17-tables-q2",
    chapter: "sqt-lesson17-tables",
    level: 1,
    question: "“第17课 创建和操纵表”的最小正确性合同是什么？",
    answer:
      "表定义、列类型、NULL和默认值与数据合同一致，结构变更可验证且可恢复；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第17课 创建和操纵表"],
  },
  {
    id: "sqt-lesson17-tables-q3",
    chapter: "sqt-lesson17-tables",
    level: 2,
    question: "怎样为“第17课 创建和操纵表”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第17课 创建和操纵表"],
  },
  {
    id: "sqt-lesson17-tables-q4",
    chapter: "sqt-lesson17-tables",
    level: 2,
    question: "“第17课 创建和操纵表”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第17课 创建和操纵表"],
  },
  {
    id: "sqt-lesson17-tables-q5",
    chapter: "sqt-lesson17-tables",
    level: 3,
    question: "如何验证“第17课 创建和操纵表”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第17课 创建和操纵表"],
  },
  {
    id: "sqt-lesson17-tables-q6",
    chapter: "sqt-lesson17-tables",
    level: 3,
    question: "“第17课 创建和操纵表”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、可重放DDL、NULL与默认值测试、迁移和回退脚本、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第17课 创建和操纵表"],
  },
  {
    id: "sqt-lesson18-views-q1",
    chapter: "sqt-lesson18-views",
    level: 1,
    question: "为什么“第18课 使用视图”必须覆盖10个正式节点？",
    answer:
      "这些节点共同组成“用视图封装联结、格式化、过滤和计算字段”的语义、语法、结果、失败和方言链，缺项会使视图定义、依赖表、权限边界和结果一致性检查无法复现。",
    tags: ["SQL必知必会", "第5版", "第18课 使用视图"],
  },
  {
    id: "sqt-lesson18-views-q2",
    chapter: "sqt-lesson18-views",
    level: 1,
    question: "“第18课 使用视图”的最小正确性合同是什么？",
    answer:
      "视图列语义稳定、底层依赖可追踪、过滤和更新限制在目标DBMS上明确；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第18课 使用视图"],
  },
  {
    id: "sqt-lesson18-views-q3",
    chapter: "sqt-lesson18-views",
    level: 2,
    question: "怎样为“第18课 使用视图”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第18课 使用视图"],
  },
  {
    id: "sqt-lesson18-views-q4",
    chapter: "sqt-lesson18-views",
    level: 2,
    question: "“第18课 使用视图”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第18课 使用视图"],
  },
  {
    id: "sqt-lesson18-views-q5",
    chapter: "sqt-lesson18-views",
    level: 3,
    question: "如何验证“第18课 使用视图”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第18课 使用视图"],
  },
  {
    id: "sqt-lesson18-views-q6",
    chapter: "sqt-lesson18-views",
    level: 3,
    question: "“第18课 使用视图”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、视图定义、依赖表、权限边界和结果一致性检查、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第18课 使用视图"],
  },
  {
    id: "sqt-lesson19-stored-procedures-q1",
    chapter: "sqt-lesson19-stored-procedures",
    level: 1,
    question: "为什么“第19课 使用存储过程”必须覆盖5个正式节点？",
    answer:
      "这些节点共同组成“理解存储过程的价值、调用和创建方式及其方言差异”的语义、语法、结果、失败和方言链，缺项会使过程参数合同、调用样例、异常路径和方言实现对照无法复现。",
    tags: ["SQL必知必会", "第5版", "第19课 使用存储过程"],
  },
  {
    id: "sqt-lesson19-stored-procedures-q2",
    chapter: "sqt-lesson19-stored-procedures",
    level: 1,
    question: "“第19课 使用存储过程”的最小正确性合同是什么？",
    answer:
      "输入输出、事务和错误语义明确，同名过程在目标DBMS上有可验证定义；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第19课 使用存储过程"],
  },
  {
    id: "sqt-lesson19-stored-procedures-q3",
    chapter: "sqt-lesson19-stored-procedures",
    level: 2,
    question: "怎样为“第19课 使用存储过程”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第19课 使用存储过程"],
  },
  {
    id: "sqt-lesson19-stored-procedures-q4",
    chapter: "sqt-lesson19-stored-procedures",
    level: 2,
    question: "“第19课 使用存储过程”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第19课 使用存储过程"],
  },
  {
    id: "sqt-lesson19-stored-procedures-q5",
    chapter: "sqt-lesson19-stored-procedures",
    level: 3,
    question: "如何验证“第19课 使用存储过程”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第19课 使用存储过程"],
  },
  {
    id: "sqt-lesson19-stored-procedures-q6",
    chapter: "sqt-lesson19-stored-procedures",
    level: 3,
    question: "“第19课 使用存储过程”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、过程参数合同、调用样例、异常路径和方言实现对照、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第19课 使用存储过程"],
  },
  {
    id: "sqt-lesson20-transactions-q1",
    chapter: "sqt-lesson20-transactions",
    level: 1,
    question: "为什么“第20课 管理事务处理”必须覆盖6个正式节点？",
    answer:
      "这些节点共同组成“用事务、ROLLBACK、COMMIT和保留点保护多步写入”的语义、语法、结果、失败和方言链，缺项会使事务时序、保存点实验、失败回滚和并发对账无法复现。",
    tags: ["SQL必知必会", "第5版", "第20课 管理事务处理"],
  },
  {
    id: "sqt-lesson20-transactions-q2",
    chapter: "sqt-lesson20-transactions",
    level: 1,
    question: "“第20课 管理事务处理”的最小正确性合同是什么？",
    answer:
      "多步业务写入要么整体提交，要么回到已知保存点或事务开始状态；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第20课 管理事务处理"],
  },
  {
    id: "sqt-lesson20-transactions-q3",
    chapter: "sqt-lesson20-transactions",
    level: 2,
    question: "怎样为“第20课 管理事务处理”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第20课 管理事务处理"],
  },
  {
    id: "sqt-lesson20-transactions-q4",
    chapter: "sqt-lesson20-transactions",
    level: 2,
    question: "“第20课 管理事务处理”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第20课 管理事务处理"],
  },
  {
    id: "sqt-lesson20-transactions-q5",
    chapter: "sqt-lesson20-transactions",
    level: 3,
    question: "如何验证“第20课 管理事务处理”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第20课 管理事务处理"],
  },
  {
    id: "sqt-lesson20-transactions-q6",
    chapter: "sqt-lesson20-transactions",
    level: 3,
    question: "“第20课 管理事务处理”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、事务时序、保存点实验、失败回滚和并发对账、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第20课 管理事务处理"],
  },
  {
    id: "sqt-lesson21-cursors-q1",
    chapter: "sqt-lesson21-cursors",
    level: 1,
    question: "为什么“第21课 使用游标”必须覆盖6个正式节点？",
    answer:
      "这些节点共同组成“理解游标的创建、逐行使用和关闭生命周期”的语义、语法、结果、失败和方言链，缺项会使游标状态机、逐行处理样例、集合改写和资源释放证据无法复现。",
    tags: ["SQL必知必会", "第5版", "第21课 使用游标"],
  },
  {
    id: "sqt-lesson21-cursors-q2",
    chapter: "sqt-lesson21-cursors",
    level: 1,
    question: "“第21课 使用游标”的最小正确性合同是什么？",
    answer:
      "游标声明、打开、提取、结束和关闭状态明确，异常路径也释放资源；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第21课 使用游标"],
  },
  {
    id: "sqt-lesson21-cursors-q3",
    chapter: "sqt-lesson21-cursors",
    level: 2,
    question: "怎样为“第21课 使用游标”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第21课 使用游标"],
  },
  {
    id: "sqt-lesson21-cursors-q4",
    chapter: "sqt-lesson21-cursors",
    level: 2,
    question: "“第21课 使用游标”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第21课 使用游标"],
  },
  {
    id: "sqt-lesson21-cursors-q5",
    chapter: "sqt-lesson21-cursors",
    level: 3,
    question: "如何验证“第21课 使用游标”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第21课 使用游标"],
  },
  {
    id: "sqt-lesson21-cursors-q6",
    chapter: "sqt-lesson21-cursors",
    level: 3,
    question: "“第21课 使用游标”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、游标状态机、逐行处理样例、集合改写和资源释放证据、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第21课 使用游标"],
  },
  {
    id: "sqt-lesson22-advanced-features-q1",
    chapter: "sqt-lesson22-advanced-features",
    level: 1,
    question: "为什么“第22课 高级SQL特性”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“用约束、索引、触发器和数据库安全收束数据完整性与访问边界”的语义、语法、结果、失败和方言链，缺项会使约束矩阵、索引验证、触发器副作用表和最小权限清单无法复现。",
    tags: ["SQL必知必会", "第5版", "第22课 高级SQL特性"],
  },
  {
    id: "sqt-lesson22-advanced-features-q2",
    chapter: "sqt-lesson22-advanced-features",
    level: 1,
    question: "“第22课 高级SQL特性”的最小正确性合同是什么？",
    answer:
      "非法数据被约束拒绝，索引服务于已知查询，触发器副作用可追踪，权限遵循最小化；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第22课 高级SQL特性"],
  },
  {
    id: "sqt-lesson22-advanced-features-q3",
    chapter: "sqt-lesson22-advanced-features",
    level: 2,
    question: "怎样为“第22课 高级SQL特性”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第22课 高级SQL特性"],
  },
  {
    id: "sqt-lesson22-advanced-features-q4",
    chapter: "sqt-lesson22-advanced-features",
    level: 2,
    question: "“第22课 高级SQL特性”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第22课 高级SQL特性"],
  },
  {
    id: "sqt-lesson22-advanced-features-q5",
    chapter: "sqt-lesson22-advanced-features",
    level: 3,
    question: "如何验证“第22课 高级SQL特性”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第22课 高级SQL特性"],
  },
  {
    id: "sqt-lesson22-advanced-features-q6",
    chapter: "sqt-lesson22-advanced-features",
    level: 3,
    question: "“第22课 高级SQL特性”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、约束矩阵、索引验证、触发器副作用表和最小权限清单、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第22课 高级SQL特性"],
  },
  {
    id: "sqt-official-final-review-q1",
    chapter: "sqt-official-final-review",
    level: 1,
    question: "为什么“第5版全书复习与跨DBMS验收”必须覆盖12个正式节点？",
    answer:
      "这些节点共同组成“以同一业务问题贯通检索、组合、写入、对象、事务和安全，并比较方言”的语义、语法、结果、失败和方言链，缺项会使全书SQL作品集、结果合同、四DBMS重放记录和迁移清单无法复现。",
    tags: ["SQL必知必会", "第5版", "第5版全书复习与跨DBMS验收"],
  },
  {
    id: "sqt-official-final-review-q2",
    chapter: "sqt-official-final-review",
    level: 1,
    question: "“第5版全书复习与跨DBMS验收”的最小正确性合同是什么？",
    answer:
      "同一业务问题在目标DBMS上结果语义一致，方言差异、错误和回退均有记录；并由相同样例数据、完整结果、边界样本和方言记录共同证明。",
    tags: ["SQL必知必会", "第5版", "第5版全书复习与跨DBMS验收"],
  },
  {
    id: "sqt-official-final-review-q3",
    chapter: "sqt-official-final-review",
    level: 2,
    question: "怎样为“第5版全书复习与跨DBMS验收”构造一个反例？",
    answer:
      "保持DBMS版本和基础数据不变，只加入NULL、重复、一对多、空集或权限不足中的一个样本，再比较行数、键数与结果。",
    tags: ["SQL必知必会", "第5版", "第5版全书复习与跨DBMS验收"],
  },
  {
    id: "sqt-official-final-review-q4",
    chapter: "sqt-official-final-review",
    level: 2,
    question: "“第5版全书复习与跨DBMS验收”为什么必须先写结果合同？",
    answer:
      "结果合同提前固定列、行、NULL、重复、顺序和基数，防止通过反复修改SQL迎合偶然输出。",
    tags: ["SQL必知必会", "第5版", "第5版全书复习与跨DBMS验收"],
  },
  {
    id: "sqt-official-final-review-q5",
    chapter: "sqt-official-final-review",
    level: 3,
    question: "如何验证“第5版全书复习与跨DBMS验收”的跨DBMS可移植性？",
    answer:
      "保持输入和预期结果不变，在两种以上DBMS分别实现，记录语法、类型、NULL、错误和不支持能力。",
    tags: ["SQL必知必会", "第5版", "第5版全书复习与跨DBMS验收"],
  },
  {
    id: "sqt-official-final-review-q6",
    chapter: "sqt-official-final-review",
    level: 3,
    question: "“第5版全书复习与跨DBMS验收”独立交接需要哪些材料？",
    answer:
      "需要DBMS版本卡、样例脚本、目标SQL、全书SQL作品集、结果合同、四DBMS重放记录和迁移清单、完整结果、失败反例、方言账本和回退条件。",
    tags: ["SQL必知必会", "第5版", "第5版全书复习与跨DBMS验收"],
  },
];
