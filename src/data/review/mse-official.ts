import type { ReviewQuestion } from "./types";

export const mseOfficialQuestions: ReviewQuestion[] = [
  {
    id: "mse-official-learning-map-q1",
    chapter: "mse-official-learning-map",
    level: 1,
    question: "为什么“第3版权威学习地图”必须覆盖25个学习节点？",
    answer:
      "这些节点共同组成“按四篇20章贯通数据库基础、对象与查询、管理运维和两个实战系统”的概念、操作、状态、失败和证据链，缺项会使20章依赖图、五附录入口、证据清单和阶段验收表无法独立复现。",
    tags: ["MySQL数据库应用", "全书导读", "第3版权威学习地图"],
  },
  {
    id: "mse-official-learning-map-q2",
    chapter: "mse-official-learning-map",
    level: 1,
    question: "“第3版权威学习地图”的最小正确性合同是什么？",
    answer:
      "每章都有目录节点、可执行实验、失败反例、证据产物和前后导航；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: ["MySQL数据库应用", "全书导读", "第3版权威学习地图"],
  },
  {
    id: "mse-official-learning-map-q3",
    chapter: "mse-official-learning-map",
    level: 2,
    question: "怎样为“第3版权威学习地图”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: ["MySQL数据库应用", "全书导读", "第3版权威学习地图"],
  },
  {
    id: "mse-official-learning-map-q4",
    chapter: "mse-official-learning-map",
    level: 2,
    question: "“第3版权威学习地图”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: ["MySQL数据库应用", "全书导读", "第3版权威学习地图"],
  },
  {
    id: "mse-official-learning-map-q5",
    chapter: "mse-official-learning-map",
    level: 3,
    question: "如何把“第3版权威学习地图”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: ["MySQL数据库应用", "全书导读", "第3版权威学习地图"],
  },
  {
    id: "mse-official-learning-map-q6",
    chapter: "mse-official-learning-map",
    level: 3,
    question: "“第3版权威学习地图”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、20章依赖图、五附录入口、证据清单和阶段验收表、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: ["MySQL数据库应用", "全书导读", "第3版权威学习地图"],
  },
  {
    id: "mse-ch01-database-overview-q1",
    chapter: "mse-ch01-database-overview",
    level: 1,
    question: "为什么“第1章 数据库概述”必须覆盖10个学习节点？",
    answer:
      "这些节点共同组成“从业务事实、关系模型和DBMS职责建立可验证的数据边界”的概念、操作、状态、失败和证据链，缺项会使概念模型、关系模式、主外键表和数据字典无法独立复现。",
    tags: ["MySQL数据库应用", "第1篇 MySQL数据库基础篇", "第1章 数据库概述"],
  },
  {
    id: "mse-ch01-database-overview-q2",
    chapter: "mse-ch01-database-overview",
    level: 1,
    question: "“第1章 数据库概述”的最小正确性合同是什么？",
    answer:
      "每个业务事实只在一个权威位置表达，标识、联系和约束均可追溯；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: ["MySQL数据库应用", "第1篇 MySQL数据库基础篇", "第1章 数据库概述"],
  },
  {
    id: "mse-ch01-database-overview-q3",
    chapter: "mse-ch01-database-overview",
    level: 2,
    question: "怎样为“第1章 数据库概述”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: ["MySQL数据库应用", "第1篇 MySQL数据库基础篇", "第1章 数据库概述"],
  },
  {
    id: "mse-ch01-database-overview-q4",
    chapter: "mse-ch01-database-overview",
    level: 2,
    question: "“第1章 数据库概述”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: ["MySQL数据库应用", "第1篇 MySQL数据库基础篇", "第1章 数据库概述"],
  },
  {
    id: "mse-ch01-database-overview-q5",
    chapter: "mse-ch01-database-overview",
    level: 3,
    question: "如何把“第1章 数据库概述”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: ["MySQL数据库应用", "第1篇 MySQL数据库基础篇", "第1章 数据库概述"],
  },
  {
    id: "mse-ch01-database-overview-q6",
    chapter: "mse-ch01-database-overview",
    level: 3,
    question: "“第1章 数据库概述”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、概念模型、关系模式、主外键表和数据字典、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: ["MySQL数据库应用", "第1篇 MySQL数据库基础篇", "第1章 数据库概述"],
  },
  {
    id: "mse-ch02-install-configuration-q1",
    chapter: "mse-ch02-install-configuration",
    level: 1,
    question: "为什么“第2章 MySQL的安装与配置”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“完成服务安装、实例初始化、连接验证和配置文件定位”的概念、操作、状态、失败和证据链，缺项会使安装清单、实例参数快照、服务日志和连接测试记录无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第1篇 MySQL数据库基础篇",
      "第2章 MySQL的安装与配置",
    ],
  },
  {
    id: "mse-ch02-install-configuration-q2",
    chapter: "mse-ch02-install-configuration",
    level: 1,
    question: "“第2章 MySQL的安装与配置”的最小正确性合同是什么？",
    answer:
      "客户端连接到预期实例，字符集、端口、数据目录和身份与记录一致；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第1篇 MySQL数据库基础篇",
      "第2章 MySQL的安装与配置",
    ],
  },
  {
    id: "mse-ch02-install-configuration-q3",
    chapter: "mse-ch02-install-configuration",
    level: 2,
    question: "怎样为“第2章 MySQL的安装与配置”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第1篇 MySQL数据库基础篇",
      "第2章 MySQL的安装与配置",
    ],
  },
  {
    id: "mse-ch02-install-configuration-q4",
    chapter: "mse-ch02-install-configuration",
    level: 2,
    question: "“第2章 MySQL的安装与配置”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第1篇 MySQL数据库基础篇",
      "第2章 MySQL的安装与配置",
    ],
  },
  {
    id: "mse-ch02-install-configuration-q5",
    chapter: "mse-ch02-install-configuration",
    level: 3,
    question: "如何把“第2章 MySQL的安装与配置”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第1篇 MySQL数据库基础篇",
      "第2章 MySQL的安装与配置",
    ],
  },
  {
    id: "mse-ch02-install-configuration-q6",
    chapter: "mse-ch02-install-configuration",
    level: 3,
    question: "“第2章 MySQL的安装与配置”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、安装清单、实例参数快照、服务日志和连接测试记录、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第1篇 MySQL数据库基础篇",
      "第2章 MySQL的安装与配置",
    ],
  },
  {
    id: "mse-ch03-database-operations-q1",
    chapter: "mse-ch03-database-operations",
    level: 1,
    question: "为什么“第3章 数据库基本操作”必须覆盖10个学习节点？",
    answer:
      "这些节点共同组成“用DDL建立、选择、修改和删除数据库，并验证字符集契约”的概念、操作、状态、失败和证据链，缺项会使可重放DDL、数据库清单和字符集验收查询无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第3章 数据库基本操作",
    ],
  },
  {
    id: "mse-ch03-database-operations-q2",
    chapter: "mse-ch03-database-operations",
    level: 1,
    question: "“第3章 数据库基本操作”的最小正确性合同是什么？",
    answer:
      "DDL可重复执行或明确失败，目标库名称、字符集与排序规则符合设计；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第3章 数据库基本操作",
    ],
  },
  {
    id: "mse-ch03-database-operations-q3",
    chapter: "mse-ch03-database-operations",
    level: 2,
    question: "怎样为“第3章 数据库基本操作”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第3章 数据库基本操作",
    ],
  },
  {
    id: "mse-ch03-database-operations-q4",
    chapter: "mse-ch03-database-operations",
    level: 2,
    question: "“第3章 数据库基本操作”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第3章 数据库基本操作",
    ],
  },
  {
    id: "mse-ch03-database-operations-q5",
    chapter: "mse-ch03-database-operations",
    level: 3,
    question: "如何把“第3章 数据库基本操作”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第3章 数据库基本操作",
    ],
  },
  {
    id: "mse-ch03-database-operations-q6",
    chapter: "mse-ch03-database-operations",
    level: 3,
    question: "“第3章 数据库基本操作”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、可重放DDL、数据库清单和字符集验收查询、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第3章 数据库基本操作",
    ],
  },
  {
    id: "mse-ch04-engines-data-types-q1",
    chapter: "mse-ch04-engines-data-types",
    level: 1,
    question: "为什么“第4章 存储引擎和数据类型”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“按事务、并发、容量和语义选择存储引擎与字段类型”的概念、操作、状态、失败和证据链，缺项会使引擎决策表、字段类型字典和边界值测试集无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第4章 存储引擎和数据类型",
    ],
  },
  {
    id: "mse-ch04-engines-data-types-q2",
    chapter: "mse-ch04-engines-data-types",
    level: 1,
    question: "“第4章 存储引擎和数据类型”的最小正确性合同是什么？",
    answer:
      "类型能够表达业务域且不丢精度，引擎能力覆盖事务、外键和并发要求；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第4章 存储引擎和数据类型",
    ],
  },
  {
    id: "mse-ch04-engines-data-types-q3",
    chapter: "mse-ch04-engines-data-types",
    level: 2,
    question: "怎样为“第4章 存储引擎和数据类型”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第4章 存储引擎和数据类型",
    ],
  },
  {
    id: "mse-ch04-engines-data-types-q4",
    chapter: "mse-ch04-engines-data-types",
    level: 2,
    question: "“第4章 存储引擎和数据类型”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第4章 存储引擎和数据类型",
    ],
  },
  {
    id: "mse-ch04-engines-data-types-q5",
    chapter: "mse-ch04-engines-data-types",
    level: 3,
    question: "如何把“第4章 存储引擎和数据类型”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第4章 存储引擎和数据类型",
    ],
  },
  {
    id: "mse-ch04-engines-data-types-q6",
    chapter: "mse-ch04-engines-data-types",
    level: 3,
    question: "“第4章 存储引擎和数据类型”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、引擎决策表、字段类型字典和边界值测试集、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第4章 存储引擎和数据类型",
    ],
  },
  {
    id: "mse-ch05-table-operations-q1",
    chapter: "mse-ch05-table-operations",
    level: 1,
    question: "为什么“第5章 操作数据表”必须覆盖13个学习节点？",
    answer:
      "这些节点共同组成“把实体、键、默认值和约束落实为可演进的表结构”的概念、操作、状态、失败和证据链，缺项会使建表脚本、变更脚本、约束检查和回滚方案无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第5章 操作数据表",
    ],
  },
  {
    id: "mse-ch05-table-operations-q2",
    chapter: "mse-ch05-table-operations",
    level: 1,
    question: "“第5章 操作数据表”的最小正确性合同是什么？",
    answer:
      "表结构保持主键唯一、外键可达、非空和检查约束与业务规则一致；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第5章 操作数据表",
    ],
  },
  {
    id: "mse-ch05-table-operations-q3",
    chapter: "mse-ch05-table-operations",
    level: 2,
    question: "怎样为“第5章 操作数据表”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第5章 操作数据表",
    ],
  },
  {
    id: "mse-ch05-table-operations-q4",
    chapter: "mse-ch05-table-operations",
    level: 2,
    question: "“第5章 操作数据表”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第5章 操作数据表",
    ],
  },
  {
    id: "mse-ch05-table-operations-q5",
    chapter: "mse-ch05-table-operations",
    level: 3,
    question: "如何把“第5章 操作数据表”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第5章 操作数据表",
    ],
  },
  {
    id: "mse-ch05-table-operations-q6",
    chapter: "mse-ch05-table-operations",
    level: 3,
    question: "“第5章 操作数据表”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、建表脚本、变更脚本、约束检查和回滚方案、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第5章 操作数据表",
    ],
  },
  {
    id: "mse-ch06-indexes-q1",
    chapter: "mse-ch06-indexes",
    level: 1,
    question: "为什么“第6章 操作索引”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“以查询谓词、排序和选择性设计索引并用执行计划验证”的概念、操作、状态、失败和证据链，缺项会使索引清单、EXPLAIN前后对照、写放大和容量记录无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第6章 操作索引",
    ],
  },
  {
    id: "mse-ch06-indexes-q2",
    chapter: "mse-ch06-indexes",
    level: 1,
    question: "“第6章 操作索引”的最小正确性合同是什么？",
    answer:
      "索引服务于真实查询，最左前缀、覆盖性和选择性与执行计划一致；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第6章 操作索引",
    ],
  },
  {
    id: "mse-ch06-indexes-q3",
    chapter: "mse-ch06-indexes",
    level: 2,
    question: "怎样为“第6章 操作索引”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第6章 操作索引",
    ],
  },
  {
    id: "mse-ch06-indexes-q4",
    chapter: "mse-ch06-indexes",
    level: 2,
    question: "“第6章 操作索引”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第6章 操作索引",
    ],
  },
  {
    id: "mse-ch06-indexes-q5",
    chapter: "mse-ch06-indexes",
    level: 3,
    question: "如何把“第6章 操作索引”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第6章 操作索引",
    ],
  },
  {
    id: "mse-ch06-indexes-q6",
    chapter: "mse-ch06-indexes",
    level: 3,
    question: "“第6章 操作索引”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、索引清单、EXPLAIN前后对照、写放大和容量记录、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第6章 操作索引",
    ],
  },
  {
    id: "mse-ch07-views-q1",
    chapter: "mse-ch07-views",
    level: 1,
    question: "为什么“第7章 操作视图”必须覆盖11个学习节点？",
    answer:
      "这些节点共同组成“用视图封装稳定查询边界，同时明确可更新性与安全限制”的概念、操作、状态、失败和证据链，缺项会使视图定义、依赖关系、权限矩阵和一致性检查无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第7章 操作视图",
    ],
  },
  {
    id: "mse-ch07-views-q2",
    chapter: "mse-ch07-views",
    level: 1,
    question: "“第7章 操作视图”的最小正确性合同是什么？",
    answer:
      "视图列语义稳定、底层依赖可追踪，更新行为和权限不超出设计；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第7章 操作视图",
    ],
  },
  {
    id: "mse-ch07-views-q3",
    chapter: "mse-ch07-views",
    level: 2,
    question: "怎样为“第7章 操作视图”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第7章 操作视图",
    ],
  },
  {
    id: "mse-ch07-views-q4",
    chapter: "mse-ch07-views",
    level: 2,
    question: "“第7章 操作视图”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第7章 操作视图",
    ],
  },
  {
    id: "mse-ch07-views-q5",
    chapter: "mse-ch07-views",
    level: 3,
    question: "如何把“第7章 操作视图”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第7章 操作视图",
    ],
  },
  {
    id: "mse-ch07-views-q6",
    chapter: "mse-ch07-views",
    level: 3,
    question: "“第7章 操作视图”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、视图定义、依赖关系、权限矩阵和一致性检查、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第7章 操作视图",
    ],
  },
  {
    id: "mse-ch08-triggers-q1",
    chapter: "mse-ch08-triggers",
    level: 1,
    question: "为什么“第8章 操作触发器”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“在明确时机、行上下文和失败语义的前提下实现数据库侧自动规则”的概念、操作、状态、失败和证据链，缺项会使触发器清单、OLD/NEW状态表、失败测试和审计记录无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第8章 操作触发器",
    ],
  },
  {
    id: "mse-ch08-triggers-q2",
    chapter: "mse-ch08-triggers",
    level: 1,
    question: "“第8章 操作触发器”的最小正确性合同是什么？",
    answer:
      "触发器的副作用可追踪、可回滚，不形成递归或隐藏的跨表耦合；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第8章 操作触发器",
    ],
  },
  {
    id: "mse-ch08-triggers-q3",
    chapter: "mse-ch08-triggers",
    level: 2,
    question: "怎样为“第8章 操作触发器”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第8章 操作触发器",
    ],
  },
  {
    id: "mse-ch08-triggers-q4",
    chapter: "mse-ch08-triggers",
    level: 2,
    question: "“第8章 操作触发器”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第8章 操作触发器",
    ],
  },
  {
    id: "mse-ch08-triggers-q5",
    chapter: "mse-ch08-triggers",
    level: 3,
    question: "如何把“第8章 操作触发器”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第8章 操作触发器",
    ],
  },
  {
    id: "mse-ch08-triggers-q6",
    chapter: "mse-ch08-triggers",
    level: 3,
    question: "“第8章 操作触发器”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、触发器清单、OLD/NEW状态表、失败测试和审计记录、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第8章 操作触发器",
    ],
  },
  {
    id: "mse-ch09-data-manipulation-q1",
    chapter: "mse-ch09-data-manipulation",
    level: 1,
    question: "为什么“第9章 数据的操作”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“安全完成插入、更新、删除和批量导入，并验证影响行数”的概念、操作、状态、失败和证据链，缺项会使DML脚本、前后快照、影响行数和补偿方案无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第9章 数据的操作",
    ],
  },
  {
    id: "mse-ch09-data-manipulation-q2",
    chapter: "mse-ch09-data-manipulation",
    level: 1,
    question: "“第9章 数据的操作”的最小正确性合同是什么？",
    answer:
      "每次写操作命中预期行集，约束持续成立，失败时能够回滚或补偿；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第9章 数据的操作",
    ],
  },
  {
    id: "mse-ch09-data-manipulation-q3",
    chapter: "mse-ch09-data-manipulation",
    level: 2,
    question: "怎样为“第9章 数据的操作”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第9章 数据的操作",
    ],
  },
  {
    id: "mse-ch09-data-manipulation-q4",
    chapter: "mse-ch09-data-manipulation",
    level: 2,
    question: "“第9章 数据的操作”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第9章 数据的操作",
    ],
  },
  {
    id: "mse-ch09-data-manipulation-q5",
    chapter: "mse-ch09-data-manipulation",
    level: 3,
    question: "如何把“第9章 数据的操作”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第9章 数据的操作",
    ],
  },
  {
    id: "mse-ch09-data-manipulation-q6",
    chapter: "mse-ch09-data-manipulation",
    level: 3,
    question: "“第9章 数据的操作”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、DML脚本、前后快照、影响行数和补偿方案、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第9章 数据的操作",
    ],
  },
  {
    id: "mse-ch10-single-table-query-q1",
    chapter: "mse-ch10-single-table-query",
    level: 1,
    question: "为什么“第10章 单表查询”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“从投影、筛选、分组、排序到分页构造结果确定的单表查询”的概念、操作、状态、失败和证据链，缺项会使查询用例、结果基线、执行计划和边界数据集无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第10章 单表查询",
    ],
  },
  {
    id: "mse-ch10-single-table-query-q2",
    chapter: "mse-ch10-single-table-query",
    level: 1,
    question: "“第10章 单表查询”的最小正确性合同是什么？",
    answer:
      "结果列、行集、分组口径和顺序都由SQL显式定义，NULL语义被单独验证；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第10章 单表查询",
    ],
  },
  {
    id: "mse-ch10-single-table-query-q3",
    chapter: "mse-ch10-single-table-query",
    level: 2,
    question: "怎样为“第10章 单表查询”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第10章 单表查询",
    ],
  },
  {
    id: "mse-ch10-single-table-query-q4",
    chapter: "mse-ch10-single-table-query",
    level: 2,
    question: "“第10章 单表查询”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第10章 单表查询",
    ],
  },
  {
    id: "mse-ch10-single-table-query-q5",
    chapter: "mse-ch10-single-table-query",
    level: 3,
    question: "如何把“第10章 单表查询”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第10章 单表查询",
    ],
  },
  {
    id: "mse-ch10-single-table-query-q6",
    chapter: "mse-ch10-single-table-query",
    level: 3,
    question: "“第10章 单表查询”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、查询用例、结果基线、执行计划和边界数据集、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第10章 单表查询",
    ],
  },
  {
    id: "mse-ch11-multi-table-query-q1",
    chapter: "mse-ch11-multi-table-query",
    level: 1,
    question: "为什么“第11章 多表查询”必须覆盖13个学习节点？",
    answer:
      "这些节点共同组成“依据关系基数选择连接或子查询，并防止行数意外膨胀”的概念、操作、状态、失败和证据链，缺项会使连接图、基数估算、结果对照和执行计划无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第11章 多表查询",
    ],
  },
  {
    id: "mse-ch11-multi-table-query-q2",
    chapter: "mse-ch11-multi-table-query",
    level: 1,
    question: "“第11章 多表查询”的最小正确性合同是什么？",
    answer:
      "连接条件完整，结果行数与一对一、一对多或多对多基数预测一致；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第11章 多表查询",
    ],
  },
  {
    id: "mse-ch11-multi-table-query-q3",
    chapter: "mse-ch11-multi-table-query",
    level: 2,
    question: "怎样为“第11章 多表查询”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第11章 多表查询",
    ],
  },
  {
    id: "mse-ch11-multi-table-query-q4",
    chapter: "mse-ch11-multi-table-query",
    level: 2,
    question: "“第11章 多表查询”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第11章 多表查询",
    ],
  },
  {
    id: "mse-ch11-multi-table-query-q5",
    chapter: "mse-ch11-multi-table-query",
    level: 3,
    question: "如何把“第11章 多表查询”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第11章 多表查询",
    ],
  },
  {
    id: "mse-ch11-multi-table-query-q6",
    chapter: "mse-ch11-multi-table-query",
    level: 3,
    question: "“第11章 多表查询”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、连接图、基数估算、结果对照和执行计划、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第11章 多表查询",
    ],
  },
  {
    id: "mse-ch12-operators-q1",
    chapter: "mse-ch12-operators",
    level: 1,
    question: "为什么“第12章 运算符”必须覆盖11个学习节点？",
    answer:
      "这些节点共同组成“掌握算术、比较、逻辑、位和模式运算中的类型与三值逻辑”的概念、操作、状态、失败和证据链，缺项会使真值表、类型转换样例和边界表达式测试无法独立复现。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第12章 运算符"],
  },
  {
    id: "mse-ch12-operators-q2",
    chapter: "mse-ch12-operators",
    level: 1,
    question: "“第12章 运算符”的最小正确性合同是什么？",
    answer:
      "表达式结果在NULL、零值、字符串数字和边界值下均符合预期；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第12章 运算符"],
  },
  {
    id: "mse-ch12-operators-q3",
    chapter: "mse-ch12-operators",
    level: 2,
    question: "怎样为“第12章 运算符”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第12章 运算符"],
  },
  {
    id: "mse-ch12-operators-q4",
    chapter: "mse-ch12-operators",
    level: 2,
    question: "“第12章 运算符”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第12章 运算符"],
  },
  {
    id: "mse-ch12-operators-q5",
    chapter: "mse-ch12-operators",
    level: 3,
    question: "如何把“第12章 运算符”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第12章 运算符"],
  },
  {
    id: "mse-ch12-operators-q6",
    chapter: "mse-ch12-operators",
    level: 3,
    question: "“第12章 运算符”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、真值表、类型转换样例和边界表达式测试、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第12章 运算符"],
  },
  {
    id: "mse-ch13-functions-q1",
    chapter: "mse-ch13-functions",
    level: 1,
    question: "为什么“第13章 常用函数”必须覆盖11个学习节点？",
    answer:
      "这些节点共同组成“用内置函数完成字符串、数值、日期和条件转换并控制可索引性”的概念、操作、状态、失败和证据链，缺项会使函数样例表、时区与字符集测试、等价改写对照无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第13章 常用函数",
    ],
  },
  {
    id: "mse-ch13-functions-q2",
    chapter: "mse-ch13-functions",
    level: 1,
    question: "“第13章 常用函数”的最小正确性合同是什么？",
    answer:
      "函数输入域、NULL行为、时区、精度和字符集均显式，过滤条件不无谓破坏索引；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第13章 常用函数",
    ],
  },
  {
    id: "mse-ch13-functions-q3",
    chapter: "mse-ch13-functions",
    level: 2,
    question: "怎样为“第13章 常用函数”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第13章 常用函数",
    ],
  },
  {
    id: "mse-ch13-functions-q4",
    chapter: "mse-ch13-functions",
    level: 2,
    question: "“第13章 常用函数”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第13章 常用函数",
    ],
  },
  {
    id: "mse-ch13-functions-q5",
    chapter: "mse-ch13-functions",
    level: 3,
    question: "如何把“第13章 常用函数”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第13章 常用函数",
    ],
  },
  {
    id: "mse-ch13-functions-q6",
    chapter: "mse-ch13-functions",
    level: 3,
    question: "“第13章 常用函数”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、函数样例表、时区与字符集测试、等价改写对照、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第13章 常用函数",
    ],
  },
  {
    id: "mse-ch14-routines-q1",
    chapter: "mse-ch14-routines",
    level: 1,
    question: "为什么“第14章 存储过程和函数的操作”必须覆盖13个学习节点？",
    answer:
      "这些节点共同组成“建立参数、局部状态、流程控制、游标和异常处理明确的存储程序”的概念、操作、状态、失败和证据链，缺项会使例程定义、参数合同、异常路径和调用测试无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第14章 存储过程和函数的操作",
    ],
  },
  {
    id: "mse-ch14-routines-q2",
    chapter: "mse-ch14-routines",
    level: 1,
    question: "“第14章 存储过程和函数的操作”的最小正确性合同是什么？",
    answer:
      "例程输入输出明确、事务边界可见、异常不会留下半完成状态；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第14章 存储过程和函数的操作",
    ],
  },
  {
    id: "mse-ch14-routines-q3",
    chapter: "mse-ch14-routines",
    level: 2,
    question: "怎样为“第14章 存储过程和函数的操作”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第14章 存储过程和函数的操作",
    ],
  },
  {
    id: "mse-ch14-routines-q4",
    chapter: "mse-ch14-routines",
    level: 2,
    question: "“第14章 存储过程和函数的操作”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第14章 存储过程和函数的操作",
    ],
  },
  {
    id: "mse-ch14-routines-q5",
    chapter: "mse-ch14-routines",
    level: 3,
    question: "如何把“第14章 存储过程和函数的操作”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第14章 存储过程和函数的操作",
    ],
  },
  {
    id: "mse-ch14-routines-q6",
    chapter: "mse-ch14-routines",
    level: 3,
    question: "“第14章 存储过程和函数的操作”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、例程定义、参数合同、异常路径和调用测试、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第2篇 MySQL数据库操作和应用篇",
      "第14章 存储过程和函数的操作",
    ],
  },
  {
    id: "mse-ch15-transactions-q1",
    chapter: "mse-ch15-transactions",
    level: 1,
    question: "为什么“第15章 事务”必须覆盖13个学习节点？",
    answer:
      "这些节点共同组成“以ACID、不变量、隔离级别和锁等待保护跨行业务操作”的概念、操作、状态、失败和证据链，缺项会使事务时序图、并发会话脚本、锁等待记录和回滚验证无法独立复现。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第15章 事务"],
  },
  {
    id: "mse-ch15-transactions-q2",
    chapter: "mse-ch15-transactions",
    level: 1,
    question: "“第15章 事务”的最小正确性合同是什么？",
    answer:
      "订单、库存和支付等跨表状态要么整体提交，要么整体回滚，隔离异常可复现；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第15章 事务"],
  },
  {
    id: "mse-ch15-transactions-q3",
    chapter: "mse-ch15-transactions",
    level: 2,
    question: "怎样为“第15章 事务”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第15章 事务"],
  },
  {
    id: "mse-ch15-transactions-q4",
    chapter: "mse-ch15-transactions",
    level: 2,
    question: "“第15章 事务”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第15章 事务"],
  },
  {
    id: "mse-ch15-transactions-q5",
    chapter: "mse-ch15-transactions",
    level: 3,
    question: "如何把“第15章 事务”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第15章 事务"],
  },
  {
    id: "mse-ch15-transactions-q6",
    chapter: "mse-ch15-transactions",
    level: 3,
    question: "“第15章 事务”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、事务时序图、并发会话脚本、锁等待记录和回滚验证、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: ["MySQL数据库应用", "第2篇 MySQL数据库操作和应用篇", "第15章 事务"],
  },
  {
    id: "mse-ch16-security-q1",
    chapter: "mse-ch16-security",
    level: 1,
    question: "为什么“第16章 MySQL安全机制”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“按身份、来源、对象和动作建立最小权限并验证拒绝路径”的概念、操作、状态、失败和证据链，缺项会使账户清单、授权矩阵、拒绝测试和凭据轮换记录无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第16章 MySQL安全机制",
    ],
  },
  {
    id: "mse-ch16-security-q2",
    chapter: "mse-ch16-security",
    level: 1,
    question: "“第16章 MySQL安全机制”的最小正确性合同是什么？",
    answer:
      "每个账户只拥有完成职责所需的最小权限，匿名、共享和过期凭据不可用；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第16章 MySQL安全机制",
    ],
  },
  {
    id: "mse-ch16-security-q3",
    chapter: "mse-ch16-security",
    level: 2,
    question: "怎样为“第16章 MySQL安全机制”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第16章 MySQL安全机制",
    ],
  },
  {
    id: "mse-ch16-security-q4",
    chapter: "mse-ch16-security",
    level: 2,
    question: "“第16章 MySQL安全机制”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第16章 MySQL安全机制",
    ],
  },
  {
    id: "mse-ch16-security-q5",
    chapter: "mse-ch16-security",
    level: 3,
    question: "如何把“第16章 MySQL安全机制”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第16章 MySQL安全机制",
    ],
  },
  {
    id: "mse-ch16-security-q6",
    chapter: "mse-ch16-security",
    level: 3,
    question: "“第16章 MySQL安全机制”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、账户清单、授权矩阵、拒绝测试和凭据轮换记录、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第16章 MySQL安全机制",
    ],
  },
  {
    id: "mse-ch17-logs-q1",
    chapter: "mse-ch17-logs",
    level: 1,
    question: "为什么“第17章 MySQL日志管理”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“理解错误、通用、慢查询和二进制日志各自记录什么并完成轮换恢复”的概念、操作、状态、失败和证据链，缺项会使日志配置快照、事件样本、轮换策略和恢复坐标无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第17章 MySQL日志管理",
    ],
  },
  {
    id: "mse-ch17-logs-q2",
    chapter: "mse-ch17-logs",
    level: 1,
    question: "“第17章 MySQL日志管理”的最小正确性合同是什么？",
    answer:
      "故障、慢查询和数据变更能定位到正确日志，日志增长、保留和敏感信息受控；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第17章 MySQL日志管理",
    ],
  },
  {
    id: "mse-ch17-logs-q3",
    chapter: "mse-ch17-logs",
    level: 2,
    question: "怎样为“第17章 MySQL日志管理”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第17章 MySQL日志管理",
    ],
  },
  {
    id: "mse-ch17-logs-q4",
    chapter: "mse-ch17-logs",
    level: 2,
    question: "“第17章 MySQL日志管理”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第17章 MySQL日志管理",
    ],
  },
  {
    id: "mse-ch17-logs-q5",
    chapter: "mse-ch17-logs",
    level: 3,
    question: "如何把“第17章 MySQL日志管理”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第17章 MySQL日志管理",
    ],
  },
  {
    id: "mse-ch17-logs-q6",
    chapter: "mse-ch17-logs",
    level: 3,
    question: "“第17章 MySQL日志管理”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、日志配置快照、事件样本、轮换策略和恢复坐标、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第17章 MySQL日志管理",
    ],
  },
  {
    id: "mse-ch18-maintenance-performance-q1",
    chapter: "mse-ch18-maintenance-performance",
    level: 1,
    question: "为什么“第18章 数据库维护和性能提高”必须覆盖15个学习节点？",
    answer:
      "这些节点共同组成“把备份恢复、统计信息、执行计划、索引和参数调优组成可回退闭环”的概念、操作、状态、失败和证据链，缺项会使恢复演练记录、性能基线、执行计划差异和变更回退单无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第18章 数据库维护和性能提高",
    ],
  },
  {
    id: "mse-ch18-maintenance-performance-q2",
    chapter: "mse-ch18-maintenance-performance",
    level: 1,
    question: "“第18章 数据库维护和性能提高”的最小正确性合同是什么？",
    answer:
      "恢复目标可达，优化前后使用同一负载和数据，收益与副作用均被量化；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第18章 数据库维护和性能提高",
    ],
  },
  {
    id: "mse-ch18-maintenance-performance-q3",
    chapter: "mse-ch18-maintenance-performance",
    level: 2,
    question: "怎样为“第18章 数据库维护和性能提高”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第18章 数据库维护和性能提高",
    ],
  },
  {
    id: "mse-ch18-maintenance-performance-q4",
    chapter: "mse-ch18-maintenance-performance",
    level: 2,
    question: "“第18章 数据库维护和性能提高”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第18章 数据库维护和性能提高",
    ],
  },
  {
    id: "mse-ch18-maintenance-performance-q5",
    chapter: "mse-ch18-maintenance-performance",
    level: 3,
    question: "如何把“第18章 数据库维护和性能提高”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第18章 数据库维护和性能提高",
    ],
  },
  {
    id: "mse-ch18-maintenance-performance-q6",
    chapter: "mse-ch18-maintenance-performance",
    level: 3,
    question: "“第18章 数据库维护和性能提高”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、恢复演练记录、性能基线、执行计划差异和变更回退单、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第3篇 MySQL数据库管理篇",
      "第18章 数据库维护和性能提高",
    ],
  },
  {
    id: "mse-ch19-java-bookstore-q1",
    chapter: "mse-ch19-java-bookstore",
    level: 1,
    question: "为什么“第19章 Java+MySQL案例：在线书城”必须覆盖15个学习节点？",
    answer:
      "这些节点共同组成“贯通需求、数据模型、JDBC事务、订单不变量、安全和上线验收”的概念、操作、状态、失败和证据链，缺项会使在线书城模式、DAO接口、订单事务、并发测试和部署清单无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第19章 Java+MySQL案例：在线书城",
    ],
  },
  {
    id: "mse-ch19-java-bookstore-q2",
    chapter: "mse-ch19-java-bookstore",
    level: 1,
    question: "“第19章 Java+MySQL案例：在线书城”的最小正确性合同是什么？",
    answer:
      "库存不超卖、订单金额可重算、重复请求不重复扣库存，连接与事务总能关闭；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第19章 Java+MySQL案例：在线书城",
    ],
  },
  {
    id: "mse-ch19-java-bookstore-q3",
    chapter: "mse-ch19-java-bookstore",
    level: 2,
    question: "怎样为“第19章 Java+MySQL案例：在线书城”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第19章 Java+MySQL案例：在线书城",
    ],
  },
  {
    id: "mse-ch19-java-bookstore-q4",
    chapter: "mse-ch19-java-bookstore",
    level: 2,
    question:
      "“第19章 Java+MySQL案例：在线书城”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第19章 Java+MySQL案例：在线书城",
    ],
  },
  {
    id: "mse-ch19-java-bookstore-q5",
    chapter: "mse-ch19-java-bookstore",
    level: 3,
    question:
      "如何把“第19章 Java+MySQL案例：在线书城”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第19章 Java+MySQL案例：在线书城",
    ],
  },
  {
    id: "mse-ch19-java-bookstore-q6",
    chapter: "mse-ch19-java-bookstore",
    level: 3,
    question: "“第19章 Java+MySQL案例：在线书城”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、在线书城模式、DAO接口、订单事务、并发测试和部署清单、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第19章 Java+MySQL案例：在线书城",
    ],
  },
  {
    id: "mse-ch20-php-exam-system-q1",
    chapter: "mse-ch20-php-exam-system",
    level: 1,
    question:
      "为什么“第20章 PHP+MySQL案例：智能考试系统”必须覆盖15个学习节点？",
    answer:
      "这些节点共同组成“贯通题库、组卷、考试快照、提交评分、权限和报表的完整数据生命周期”的概念、操作、状态、失败和证据链，缺项会使考试系统模式、PDO访问层、组卷算法、评分事务和安全测试无法独立复现。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第20章 PHP+MySQL案例：智能考试系统",
    ],
  },
  {
    id: "mse-ch20-php-exam-system-q2",
    chapter: "mse-ch20-php-exam-system",
    level: 1,
    question: "“第20章 PHP+MySQL案例：智能考试系统”的最小正确性合同是什么？",
    answer:
      "试卷发布后题目快照稳定，每次作答只归属一个考生和考试，重复提交不重复计分；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第20章 PHP+MySQL案例：智能考试系统",
    ],
  },
  {
    id: "mse-ch20-php-exam-system-q3",
    chapter: "mse-ch20-php-exam-system",
    level: 2,
    question: "怎样为“第20章 PHP+MySQL案例：智能考试系统”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第20章 PHP+MySQL案例：智能考试系统",
    ],
  },
  {
    id: "mse-ch20-php-exam-system-q4",
    chapter: "mse-ch20-php-exam-system",
    level: 2,
    question:
      "“第20章 PHP+MySQL案例：智能考试系统”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第20章 PHP+MySQL案例：智能考试系统",
    ],
  },
  {
    id: "mse-ch20-php-exam-system-q5",
    chapter: "mse-ch20-php-exam-system",
    level: 3,
    question:
      "如何把“第20章 PHP+MySQL案例：智能考试系统”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第20章 PHP+MySQL案例：智能考试系统",
    ],
  },
  {
    id: "mse-ch20-php-exam-system-q6",
    chapter: "mse-ch20-php-exam-system",
    level: 3,
    question: "“第20章 PHP+MySQL案例：智能考试系统”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、考试系统模式、PDO访问层、组卷算法、评分事务和安全测试、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: [
      "MySQL数据库应用",
      "第4篇 MySQL数据库实战案例篇",
      "第20章 PHP+MySQL案例：智能考试系统",
    ],
  },
  {
    id: "mse-official-final-review-q1",
    chapter: "mse-official-final-review",
    level: 1,
    question: "为什么“第3版全书复习与项目验收”必须覆盖12个学习节点？",
    answer:
      "这些节点共同组成“以书城和考试系统复核20章知识、五附录工具以及安全恢复能力”的概念、操作、状态、失败和证据链，缺项会使全书能力矩阵、双项目验收包、恢复演练和迁移清单无法独立复现。",
    tags: ["MySQL数据库应用", "全书收束", "第3版全书复习与项目验收"],
  },
  {
    id: "mse-official-final-review-q2",
    chapter: "mse-official-final-review",
    level: 1,
    question: "“第3版全书复习与项目验收”的最小正确性合同是什么？",
    answer:
      "任一核心写路径可证明约束、事务、权限、日志、恢复和性能边界；并由定义、行为、失败、恢复和版本证据共同证明。",
    tags: ["MySQL数据库应用", "全书收束", "第3版全书复习与项目验收"],
  },
  {
    id: "mse-official-final-review-q3",
    chapter: "mse-official-final-review",
    level: 2,
    question: "怎样为“第3版全书复习与项目验收”设计一个有效反例？",
    answer:
      "保持版本和正常数据不变，只注入NULL、重复键、越权、并发或重启中的一个条件，观察不变量、错误码和恢复结果。",
    tags: ["MySQL数据库应用", "全书收束", "第3版全书复习与项目验收"],
  },
  {
    id: "mse-official-final-review-q4",
    chapter: "mse-official-final-review",
    level: 2,
    question: "“第3版全书复习与项目验收”为什么必须记录影响行数和元数据？",
    answer:
      "结果截图不能证明命中对象、约束和实例身份；影响行数与元数据能把SQL行为绑定到可核对状态。",
    tags: ["MySQL数据库应用", "全书收束", "第3版全书复习与项目验收"],
  },
  {
    id: "mse-official-final-review-q5",
    chapter: "mse-official-final-review",
    level: 3,
    question: "如何把“第3版全书复习与项目验收”从第3版环境迁移到现代MySQL？",
    answer:
      "使用同一数据、SQL和失败样本逐项比较默认值、语法、权限、执行计划和错误，一次只替换一个变量并保留回退。",
    tags: ["MySQL数据库应用", "全书收束", "第3版全书复习与项目验收"],
  },
  {
    id: "mse-official-final-review-q6",
    chapter: "mse-official-final-review",
    level: 3,
    question: "“第3版全书复习与项目验收”独立交接需要哪些材料？",
    answer:
      "需要版本卡、可重放SQL、全书能力矩阵、双项目验收包、恢复演练和迁移清单、预期和实际结果、失败实验、恢复对账、迁移差异与验收条件。",
    tags: ["MySQL数据库应用", "全书收束", "第3版全书复习与项目验收"],
  },
];
