import type { ReviewQuestion } from "./types";

export const dscOfficialQuestions: ReviewQuestion[] = [
  {
    id: "dsc-official-learning-map-q1",
    chapter: "dsc-official-learning-map",
    level: 1,
    question: "为什么“第7版权威学习地图”必须覆盖12个目录节点？",
    answer:
      "这些节点共同组成“用一条大学数据库证据链贯通关系语义、物理执行、事务恢复和分布式协调”的语义、结构、执行、故障和证据链，缺项会使35页阅读路线、章节依赖图、版本卡和全书实验仓无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第7版权威学习地图"],
  },
  {
    id: "dsc-official-learning-map-q2",
    chapter: "dsc-official-learning-map",
    level: 1,
    question: "“第7版权威学习地图”的最小正确性合同是什么？",
    answer:
      "32章与附录A全部有明确媒介标记、先修关系、实验交付物和验收证据；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第7版权威学习地图"],
  },
  {
    id: "dsc-official-learning-map-q3",
    chapter: "dsc-official-learning-map",
    level: 2,
    question: "怎样为“第7版权威学习地图”构造最小失败反例？",
    answer:
      "把“只读SQL与设计章节就声称掌握数据库系统，遗漏存储、优化、并发、恢复和分布式实现”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第7版权威学习地图"],
  },
  {
    id: "dsc-official-learning-map-q4",
    chapter: "dsc-official-learning-map",
    level: 2,
    question: "“第7版权威学习地图”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第7版权威学习地图"],
  },
  {
    id: "dsc-official-learning-map-q5",
    chapter: "dsc-official-learning-map",
    level: 3,
    question: "如何验证“第7版权威学习地图”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第7版权威学习地图"],
  },
  {
    id: "dsc-official-learning-map-q6",
    chapter: "dsc-official-learning-map",
    level: 3,
    question: "“第7版权威学习地图”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、35页阅读路线、章节依赖图、版本卡和全书实验仓、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第7版权威学习地图"],
  },
  {
    id: "dsc-ch01-introduction-q1",
    chapter: "dsc-ch01-introduction",
    level: 1,
    question: "为什么“第1章 引言”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“从用户目标追踪到查询处理器、存储管理器与持久化数据的完整责任链”的语义、结构、执行、故障和证据链，缺项会使大学数据库系统上下文图、角色权限表和一次查询端到端轨迹无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第1章 引言"],
  },
  {
    id: "dsc-ch01-introduction-q2",
    chapter: "dsc-ch01-introduction",
    level: 1,
    question: "“第1章 引言”的最小正确性合同是什么？",
    answer:
      "外部模式、概念模式和物理模式边界清楚，数据独立性不被实现细节破坏；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第1章 引言"],
  },
  {
    id: "dsc-ch01-introduction-q3",
    chapter: "dsc-ch01-introduction",
    level: 2,
    question: "怎样为“第1章 引言”构造最小失败反例？",
    answer:
      "把“把数据库当成文件集合，忽略声明式语言、并发访问、故障恢复与权限控制的共同约束”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第1章 引言"],
  },
  {
    id: "dsc-ch01-introduction-q4",
    chapter: "dsc-ch01-introduction",
    level: 2,
    question: "“第1章 引言”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第1章 引言"],
  },
  {
    id: "dsc-ch01-introduction-q5",
    chapter: "dsc-ch01-introduction",
    level: 3,
    question: "如何验证“第1章 引言”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第1章 引言"],
  },
  {
    id: "dsc-ch01-introduction-q6",
    chapter: "dsc-ch01-introduction",
    level: 3,
    question: "“第1章 引言”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、大学数据库系统上下文图、角色权限表和一次查询端到端轨迹、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第1章 引言"],
  },
  {
    id: "dsc-ch02-relational-model-q1",
    chapter: "dsc-ch02-relational-model",
    level: 1,
    question: "为什么“第2章 关系模型概述”必须覆盖7个目录节点？",
    answer:
      "这些节点共同组成“用关系、属性、元组、码和代数运算建立逻辑数据模型”的语义、结构、执行、故障和证据链，缺项会使大学模式图、候选码证明表和关系代数结果对账单无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第2章 关系模型概述"],
  },
  {
    id: "dsc-ch02-relational-model-q2",
    chapter: "dsc-ch02-relational-model",
    level: 1,
    question: "“第2章 关系模型概述”的最小正确性合同是什么？",
    answer:
      "每个关系实例满足域、码与引用约束，查询结果仍是关系；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第2章 关系模型概述"],
  },
  {
    id: "dsc-ch02-relational-model-q3",
    chapter: "dsc-ch02-relational-model",
    level: 2,
    question: "怎样为“第2章 关系模型概述”构造最小失败反例？",
    answer:
      "把“把表格的显示顺序当作关系语义，或只凭样例数据猜测主码与外码”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第2章 关系模型概述"],
  },
  {
    id: "dsc-ch02-relational-model-q4",
    chapter: "dsc-ch02-relational-model",
    level: 2,
    question: "“第2章 关系模型概述”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第2章 关系模型概述"],
  },
  {
    id: "dsc-ch02-relational-model-q5",
    chapter: "dsc-ch02-relational-model",
    level: 3,
    question: "如何验证“第2章 关系模型概述”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第2章 关系模型概述"],
  },
  {
    id: "dsc-ch02-relational-model-q6",
    chapter: "dsc-ch02-relational-model",
    level: 3,
    question: "“第2章 关系模型概述”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、大学模式图、候选码证明表和关系代数结果对账单、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第2章 关系模型概述"],
  },
  {
    id: "dsc-ch03-introduction-to-sql-q1",
    chapter: "dsc-ch03-introduction-to-sql",
    level: 1,
    question: "为什么“第3章 SQL入门”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“把关系问题翻译为可验证的DDL、查询、聚集、子查询与修改语句”的语义、结构、执行、故障和证据链，缺项会使大学数据库建表脚本、十类查询基线和写入前后差异报告无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第3章 SQL入门"],
  },
  {
    id: "dsc-ch03-introduction-to-sql-q2",
    chapter: "dsc-ch03-introduction-to-sql",
    level: 1,
    question: "“第3章 SQL入门”的最小正确性合同是什么？",
    answer:
      "SQL结果合同明确列、行、重复、NULL与顺序，修改语句的影响范围可预览；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第3章 SQL入门"],
  },
  {
    id: "dsc-ch03-introduction-to-sql-q3",
    chapter: "dsc-ch03-introduction-to-sql",
    level: 2,
    question: "怎样为“第3章 SQL入门”构造最小失败反例？",
    answer:
      "把“只要SQL能运行就认为正确，忽略包语义、三值逻辑和意外的多行修改”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第3章 SQL入门"],
  },
  {
    id: "dsc-ch03-introduction-to-sql-q4",
    chapter: "dsc-ch03-introduction-to-sql",
    level: 2,
    question: "“第3章 SQL入门”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第3章 SQL入门"],
  },
  {
    id: "dsc-ch03-introduction-to-sql-q5",
    chapter: "dsc-ch03-introduction-to-sql",
    level: 3,
    question: "如何验证“第3章 SQL入门”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第3章 SQL入门"],
  },
  {
    id: "dsc-ch03-introduction-to-sql-q6",
    chapter: "dsc-ch03-introduction-to-sql",
    level: 3,
    question: "“第3章 SQL入门”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、大学数据库建表脚本、十类查询基线和写入前后差异报告、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第3章 SQL入门"],
  },
  {
    id: "dsc-ch04-intermediate-sql-q1",
    chapter: "dsc-ch04-intermediate-sql",
    level: 1,
    question: "为什么“第4章 中级SQL”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“把连接、视图、事务、约束、索引与授权组合成可维护的数据接口”的语义、结构、执行、故障和证据链，缺项会使受控视图、约束反例集、事务脚本和最小权限矩阵无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第4章 中级SQL"],
  },
  {
    id: "dsc-ch04-intermediate-sql-q2",
    chapter: "dsc-ch04-intermediate-sql",
    level: 1,
    question: "“第4章 中级SQL”的最小正确性合同是什么？",
    answer:
      "视图不泄漏不该暴露的数据，约束在所有写路径生效，事务边界与授权边界一致；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第4章 中级SQL"],
  },
  {
    id: "dsc-ch04-intermediate-sql-q3",
    chapter: "dsc-ch04-intermediate-sql",
    level: 2,
    question: "怎样为“第4章 中级SQL”构造最小失败反例？",
    answer:
      "把“用应用层检查替代数据库约束，或给视图用户授予底表的过宽权限”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第4章 中级SQL"],
  },
  {
    id: "dsc-ch04-intermediate-sql-q4",
    chapter: "dsc-ch04-intermediate-sql",
    level: 2,
    question: "“第4章 中级SQL”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第4章 中级SQL"],
  },
  {
    id: "dsc-ch04-intermediate-sql-q5",
    chapter: "dsc-ch04-intermediate-sql",
    level: 3,
    question: "如何验证“第4章 中级SQL”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第4章 中级SQL"],
  },
  {
    id: "dsc-ch04-intermediate-sql-q6",
    chapter: "dsc-ch04-intermediate-sql",
    level: 3,
    question: "“第4章 中级SQL”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、受控视图、约束反例集、事务脚本和最小权限矩阵、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第4章 中级SQL"],
  },
  {
    id: "dsc-ch05-advanced-sql-q1",
    chapter: "dsc-ch05-advanced-sql",
    level: 1,
    question: "为什么“第5章 高级SQL”必须覆盖6个目录节点？",
    answer:
      "这些节点共同组成“处理宿主语言边界、服务器端程序、递归关系与多维聚集”的语义、结构、执行、故障和证据链，缺项会使参数化访问样例、递归闭包测试、触发器因果图和ROLLUP报表无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第5章 高级SQL"],
  },
  {
    id: "dsc-ch05-advanced-sql-q2",
    chapter: "dsc-ch05-advanced-sql",
    level: 1,
    question: "“第5章 高级SQL”的最小正确性合同是什么？",
    answer:
      "参数绑定阻断注入，递归有终止条件，触发器副作用和聚集粒度可追踪；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第5章 高级SQL"],
  },
  {
    id: "dsc-ch05-advanced-sql-q3",
    chapter: "dsc-ch05-advanced-sql",
    level: 2,
    question: "怎样为“第5章 高级SQL”构造最小失败反例？",
    answer:
      "把“把字符串拼接当参数绑定，或让触发器形成隐蔽递归和重复副作用”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第5章 高级SQL"],
  },
  {
    id: "dsc-ch05-advanced-sql-q4",
    chapter: "dsc-ch05-advanced-sql",
    level: 2,
    question: "“第5章 高级SQL”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第5章 高级SQL"],
  },
  {
    id: "dsc-ch05-advanced-sql-q5",
    chapter: "dsc-ch05-advanced-sql",
    level: 3,
    question: "如何验证“第5章 高级SQL”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第5章 高级SQL"],
  },
  {
    id: "dsc-ch05-advanced-sql-q6",
    chapter: "dsc-ch05-advanced-sql",
    level: 3,
    question: "“第5章 高级SQL”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、参数化访问样例、递归闭包测试、触发器因果图和ROLLUP报表、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第5章 高级SQL"],
  },
  {
    id: "dsc-ch06-er-design-q1",
    chapter: "dsc-ch06-er-design",
    level: 1,
    question: "为什么“第6章 使用E-R模型的数据库设计”必须覆盖12个目录节点？",
    answer:
      "这些节点共同组成“从业务语义提炼实体、联系、约束并无损映射为关系模式”的语义、结构、执行、故障和证据链，缺项会使需求词典、E-R图、基数反例和关系模式映射表无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第6章 使用E-R模型的数据库设计"],
  },
  {
    id: "dsc-ch06-er-design-q2",
    chapter: "dsc-ch06-er-design",
    level: 1,
    question: "“第6章 使用E-R模型的数据库设计”的最小正确性合同是什么？",
    answer:
      "每个实体可识别，每个联系基数有业务证据，映射后不丢失参与和弱实体约束；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第6章 使用E-R模型的数据库设计"],
  },
  {
    id: "dsc-ch06-er-design-q3",
    chapter: "dsc-ch06-er-design",
    level: 2,
    question: "怎样为“第6章 使用E-R模型的数据库设计”构造最小失败反例？",
    answer:
      "把“先画表再补业务含义，导致实体与属性混淆、联系被外键偶然表达”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第6章 使用E-R模型的数据库设计"],
  },
  {
    id: "dsc-ch06-er-design-q4",
    chapter: "dsc-ch06-er-design",
    level: 2,
    question: "“第6章 使用E-R模型的数据库设计”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第6章 使用E-R模型的数据库设计"],
  },
  {
    id: "dsc-ch06-er-design-q5",
    chapter: "dsc-ch06-er-design",
    level: 3,
    question: "如何验证“第6章 使用E-R模型的数据库设计”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第6章 使用E-R模型的数据库设计"],
  },
  {
    id: "dsc-ch06-er-design-q6",
    chapter: "dsc-ch06-er-design",
    level: 3,
    question: "“第6章 使用E-R模型的数据库设计”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、需求词典、E-R图、基数反例和关系模式映射表、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第6章 使用E-R模型的数据库设计"],
  },
  {
    id: "dsc-ch07-relational-design-q1",
    chapter: "dsc-ch07-relational-design",
    level: 1,
    question: "为什么“第7章 关系数据库设计”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“用函数依赖、无损连接与依赖保持把更新异常转化为可证明的设计决策”的语义、结构、执行、故障和证据链，缺项会使依赖最小覆盖、闭包推导、BCNF或3NF分解证明和异常样本无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第7章 关系数据库设计"],
  },
  {
    id: "dsc-ch07-relational-design-q2",
    chapter: "dsc-ch07-relational-design",
    level: 1,
    question: "“第7章 关系数据库设计”的最小正确性合同是什么？",
    answer:
      "每次分解都无损，关键依赖可执行检查，时态事实的有效时间与记录时间不混淆；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第7章 关系数据库设计"],
  },
  {
    id: "dsc-ch07-relational-design-q3",
    chapter: "dsc-ch07-relational-design",
    level: 2,
    question: "怎样为“第7章 关系数据库设计”构造最小失败反例？",
    answer:
      "把“只根据当前数据观察依赖，或追求更高范式却不证明无损连接与依赖保持”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第7章 关系数据库设计"],
  },
  {
    id: "dsc-ch07-relational-design-q4",
    chapter: "dsc-ch07-relational-design",
    level: 2,
    question: "“第7章 关系数据库设计”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第7章 关系数据库设计"],
  },
  {
    id: "dsc-ch07-relational-design-q5",
    chapter: "dsc-ch07-relational-design",
    level: 3,
    question: "如何验证“第7章 关系数据库设计”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第7章 关系数据库设计"],
  },
  {
    id: "dsc-ch07-relational-design-q6",
    chapter: "dsc-ch07-relational-design",
    level: 3,
    question: "“第7章 关系数据库设计”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、依赖最小覆盖、闭包推导、BCNF或3NF分解证明和异常样本、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第7章 关系数据库设计"],
  },
  {
    id: "dsc-ch08-complex-data-types-q1",
    chapter: "dsc-ch08-complex-data-types",
    level: 1,
    question: "为什么“第8章 复杂数据类型”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“比较JSON、RDF、对象、文本和空间数据的结构、查询与索引需求”的语义、结构、执行、故障和证据链，缺项会使多模型样例、类型选择矩阵、JSON和空间查询基线无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第8章 复杂数据类型"],
  },
  {
    id: "dsc-ch08-complex-data-types-q2",
    chapter: "dsc-ch08-complex-data-types",
    level: 1,
    question: "“第8章 复杂数据类型”的最小正确性合同是什么？",
    answer:
      "复杂类型保留领域结构，同时为缺失字段、引用、坐标系与全文匹配定义明确语义；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第8章 复杂数据类型"],
  },
  {
    id: "dsc-ch08-complex-data-types-q3",
    chapter: "dsc-ch08-complex-data-types",
    level: 2,
    question: "怎样为“第8章 复杂数据类型”构造最小失败反例？",
    answer:
      "把“因为数据形状复杂就放弃模式与约束，或忽略坐标系和文本分词配置”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第8章 复杂数据类型"],
  },
  {
    id: "dsc-ch08-complex-data-types-q4",
    chapter: "dsc-ch08-complex-data-types",
    level: 2,
    question: "“第8章 复杂数据类型”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第8章 复杂数据类型"],
  },
  {
    id: "dsc-ch08-complex-data-types-q5",
    chapter: "dsc-ch08-complex-data-types",
    level: 3,
    question: "如何验证“第8章 复杂数据类型”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第8章 复杂数据类型"],
  },
  {
    id: "dsc-ch08-complex-data-types-q6",
    chapter: "dsc-ch08-complex-data-types",
    level: 3,
    question: "“第8章 复杂数据类型”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、多模型样例、类型选择矩阵、JSON和空间查询基线、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第8章 复杂数据类型"],
  },
  {
    id: "dsc-ch09-application-development-q1",
    chapter: "dsc-ch09-application-development",
    level: 1,
    question: "为什么“第9章 应用开发”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“把数据库访问嵌入分层应用，并同时控制性能、安全和事务生命周期”的语义、结构、执行、故障和证据链，缺项会使三层架构时序图、参数化接口、连接池压测和威胁模型无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第9章 应用开发"],
  },
  {
    id: "dsc-ch09-application-development-q2",
    chapter: "dsc-ch09-application-development",
    level: 1,
    question: "“第9章 应用开发”的最小正确性合同是什么？",
    answer:
      "请求身份、参数、事务、连接与响应一一关联，失败不泄漏连接或部分提交；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第9章 应用开发"],
  },
  {
    id: "dsc-ch09-application-development-q3",
    chapter: "dsc-ch09-application-development",
    level: 2,
    question: "怎样为“第9章 应用开发”构造最小失败反例？",
    answer:
      "把“把连接池当作无限资源，或在客户端信任输入并跨请求共享事务状态”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第9章 应用开发"],
  },
  {
    id: "dsc-ch09-application-development-q4",
    chapter: "dsc-ch09-application-development",
    level: 2,
    question: "“第9章 应用开发”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第9章 应用开发"],
  },
  {
    id: "dsc-ch09-application-development-q5",
    chapter: "dsc-ch09-application-development",
    level: 3,
    question: "如何验证“第9章 应用开发”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第9章 应用开发"],
  },
  {
    id: "dsc-ch09-application-development-q6",
    chapter: "dsc-ch09-application-development",
    level: 3,
    question: "“第9章 应用开发”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、三层架构时序图、参数化接口、连接池压测和威胁模型、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第9章 应用开发"],
  },
  {
    id: "dsc-ch10-big-data-q1",
    chapter: "dsc-ch10-big-data",
    level: 1,
    question: "为什么“第10章 大数据”必须覆盖7个目录节点？",
    answer:
      "这些节点共同组成“用数据规模、速度与结构选择分布式文件、键值、批处理、流和图模型”的语义、结构、执行、故障和证据链，缺项会使工作负载分类表、MapReduce数据流、窗口实验和图遍历基线无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第10章 大数据"],
  },
  {
    id: "dsc-ch10-big-data-q2",
    chapter: "dsc-ch10-big-data",
    level: 1,
    question: "“第10章 大数据”的最小正确性合同是什么？",
    answer:
      "分区与复制策略匹配访问模式，批与流结果有明确时间边界和容错语义；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第10章 大数据"],
  },
  {
    id: "dsc-ch10-big-data-q3",
    chapter: "dsc-ch10-big-data",
    level: 2,
    question: "怎样为“第10章 大数据”构造最小失败反例？",
    answer:
      "把“仅因数据量大就选分布式系统，忽略倾斜、网络洗牌、一致性与运维成本”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第10章 大数据"],
  },
  {
    id: "dsc-ch10-big-data-q4",
    chapter: "dsc-ch10-big-data",
    level: 2,
    question: "“第10章 大数据”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第10章 大数据"],
  },
  {
    id: "dsc-ch10-big-data-q5",
    chapter: "dsc-ch10-big-data",
    level: 3,
    question: "如何验证“第10章 大数据”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第10章 大数据"],
  },
  {
    id: "dsc-ch10-big-data-q6",
    chapter: "dsc-ch10-big-data",
    level: 3,
    question: "“第10章 大数据”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、工作负载分类表、MapReduce数据流、窗口实验和图遍历基线、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第10章 大数据"],
  },
  {
    id: "dsc-ch11-data-analytics-q1",
    chapter: "dsc-ch11-data-analytics",
    level: 1,
    question: "为什么“第11章 数据分析”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“从操作数据构建可追溯仓库、OLAP立方体与数据挖掘评估”的语义、结构、执行、故障和证据链，缺项会使星型模式、ETL血缘图、OLAP切片和分类评估卡无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第11章 数据分析"],
  },
  {
    id: "dsc-ch11-data-analytics-q2",
    chapter: "dsc-ch11-data-analytics",
    level: 1,
    question: "“第11章 数据分析”的最小正确性合同是什么？",
    answer:
      "指标口径、粒度、维度历史和训练测试边界可追溯，分析结果不反向污染事实；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第11章 数据分析"],
  },
  {
    id: "dsc-ch11-data-analytics-q3",
    chapter: "dsc-ch11-data-analytics",
    level: 2,
    question: "怎样为“第11章 数据分析”构造最小失败反例？",
    answer:
      "把“把相关性当因果，或在ETL中改变指标口径却不回填历史与版本”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第11章 数据分析"],
  },
  {
    id: "dsc-ch11-data-analytics-q4",
    chapter: "dsc-ch11-data-analytics",
    level: 2,
    question: "“第11章 数据分析”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第11章 数据分析"],
  },
  {
    id: "dsc-ch11-data-analytics-q5",
    chapter: "dsc-ch11-data-analytics",
    level: 3,
    question: "如何验证“第11章 数据分析”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第11章 数据分析"],
  },
  {
    id: "dsc-ch11-data-analytics-q6",
    chapter: "dsc-ch11-data-analytics",
    level: 3,
    question: "“第11章 数据分析”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、星型模式、ETL血缘图、OLAP切片和分类评估卡、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第11章 数据分析"],
  },
  {
    id: "dsc-ch12-physical-storage-q1",
    chapter: "dsc-ch12-physical-storage",
    level: 1,
    question: "为什么“第12章 物理存储系统”必须覆盖7个目录节点？",
    answer:
      "这些节点共同组成“把延迟、带宽、耐久性和故障模式转化为页布局与I/O策略”的语义、结构、执行、故障和证据链，缺项会使介质层次图、I/O成本模型、RAID故障矩阵和页读取实验无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第12章 物理存储系统"],
  },
  {
    id: "dsc-ch12-physical-storage-q2",
    chapter: "dsc-ch12-physical-storage",
    level: 1,
    question: "“第12章 物理存储系统”的最小正确性合同是什么？",
    answer:
      "性能估算区分随机与顺序访问，耐久性设计覆盖相关故障而非只算容量；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第12章 物理存储系统"],
  },
  {
    id: "dsc-ch12-physical-storage-q3",
    chapter: "dsc-ch12-physical-storage",
    level: 2,
    question: "怎样为“第12章 物理存储系统”构造最小失败反例？",
    answer:
      "把“用峰值带宽估算随机负载，或把RAID误当备份并忽略控制器与机架共同故障”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第12章 物理存储系统"],
  },
  {
    id: "dsc-ch12-physical-storage-q4",
    chapter: "dsc-ch12-physical-storage",
    level: 2,
    question: "“第12章 物理存储系统”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第12章 物理存储系统"],
  },
  {
    id: "dsc-ch12-physical-storage-q5",
    chapter: "dsc-ch12-physical-storage",
    level: 3,
    question: "如何验证“第12章 物理存储系统”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第12章 物理存储系统"],
  },
  {
    id: "dsc-ch12-physical-storage-q6",
    chapter: "dsc-ch12-physical-storage",
    level: 3,
    question: "“第12章 物理存储系统”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、介质层次图、I/O成本模型、RAID故障矩阵和页读取实验、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第12章 物理存储系统"],
  },
  {
    id: "dsc-ch13-storage-structures-q1",
    chapter: "dsc-ch13-storage-structures",
    level: 1,
    question: "为什么“第13章 数据存储结构”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“从记录布局、文件组织、目录和缓冲替换解释一行数据如何落页与被重新访问”的语义、结构、执行、故障和证据链，缺项会使页剖面图、槽目录实验、缓冲命中轨迹和行列存储对照无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第13章 数据存储结构"],
  },
  {
    id: "dsc-ch13-storage-structures-q2",
    chapter: "dsc-ch13-storage-structures",
    level: 1,
    question: "“第13章 数据存储结构”的最小正确性合同是什么？",
    answer:
      "记录边界与页指针在更新后有效，缓冲脏页遵守日志先行，列式与行式选择匹配工作负载；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第13章 数据存储结构"],
  },
  {
    id: "dsc-ch13-storage-structures-q3",
    chapter: "dsc-ch13-storage-structures",
    level: 2,
    question: "怎样为“第13章 数据存储结构”构造最小失败反例？",
    answer:
      "把“把逻辑行号当物理地址，或在淘汰脏页时忽略日志持久化顺序”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第13章 数据存储结构"],
  },
  {
    id: "dsc-ch13-storage-structures-q4",
    chapter: "dsc-ch13-storage-structures",
    level: 2,
    question: "“第13章 数据存储结构”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第13章 数据存储结构"],
  },
  {
    id: "dsc-ch13-storage-structures-q5",
    chapter: "dsc-ch13-storage-structures",
    level: 3,
    question: "如何验证“第13章 数据存储结构”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第13章 数据存储结构"],
  },
  {
    id: "dsc-ch13-storage-structures-q6",
    chapter: "dsc-ch13-storage-structures",
    level: 3,
    question: "“第13章 数据存储结构”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、页剖面图、槽目录实验、缓冲命中轨迹和行列存储对照、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第13章 数据存储结构"],
  },
  {
    id: "dsc-ch14-indexing-q1",
    chapter: "dsc-ch14-indexing",
    level: 1,
    question: "为什么“第14章 索引”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“比较B+树、哈希、LSM、位图与空间索引的查找、写入和维护成本”的语义、结构、执行、故障和证据链，缺项会使B+树动画、索引选择矩阵、写放大测量和执行计划证据无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第14章 索引"],
  },
  {
    id: "dsc-ch14-indexing-q2",
    chapter: "dsc-ch14-indexing",
    level: 1,
    question: "“第14章 索引”的最小正确性合同是什么？",
    answer:
      "索引顺序、选择性与覆盖属性匹配谓词，结构在分裂、合并和并发更新后保持不变量；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第14章 索引"],
  },
  {
    id: "dsc-ch14-indexing-q3",
    chapter: "dsc-ch14-indexing",
    level: 2,
    question: "怎样为“第14章 索引”构造最小失败反例？",
    answer:
      "把“为每列盲目建索引，或只看单次查询加速而忽略写放大、空间和维护成本”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第14章 索引"],
  },
  {
    id: "dsc-ch14-indexing-q4",
    chapter: "dsc-ch14-indexing",
    level: 2,
    question: "“第14章 索引”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第14章 索引"],
  },
  {
    id: "dsc-ch14-indexing-q5",
    chapter: "dsc-ch14-indexing",
    level: 3,
    question: "如何验证“第14章 索引”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第14章 索引"],
  },
  {
    id: "dsc-ch14-indexing-q6",
    chapter: "dsc-ch14-indexing",
    level: 3,
    question: "“第14章 索引”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、B+树动画、索引选择矩阵、写放大测量和执行计划证据、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第14章 索引"],
  },
  {
    id: "dsc-ch15-query-processing-q1",
    chapter: "dsc-ch15-query-processing",
    level: 1,
    question: "为什么“第15章 查询处理”必须覆盖9个目录节点？",
    answer:
      "这些节点共同组成“把关系运算映射为扫描、排序、哈希和连接算法并核算I/O与内存”的语义、结构、执行、故障和证据链，缺项会使算子流水线图、三种连接算法实验和I/O成本对账无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第15章 查询处理"],
  },
  {
    id: "dsc-ch15-query-processing-q2",
    chapter: "dsc-ch15-query-processing",
    level: 1,
    question: "“第15章 查询处理”的最小正确性合同是什么？",
    answer:
      "每个物理算子保持逻辑语义，代价估算注明页数、内存页和输入有序性；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第15章 查询处理"],
  },
  {
    id: "dsc-ch15-query-processing-q3",
    chapter: "dsc-ch15-query-processing",
    level: 2,
    question: "怎样为“第15章 查询处理”构造最小失败反例？",
    answer:
      "把“只比较渐进复杂度不计页面I/O，或在内存不足时仍假设一次哈希表装载完成”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第15章 查询处理"],
  },
  {
    id: "dsc-ch15-query-processing-q4",
    chapter: "dsc-ch15-query-processing",
    level: 2,
    question: "“第15章 查询处理”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第15章 查询处理"],
  },
  {
    id: "dsc-ch15-query-processing-q5",
    chapter: "dsc-ch15-query-processing",
    level: 3,
    question: "如何验证“第15章 查询处理”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第15章 查询处理"],
  },
  {
    id: "dsc-ch15-query-processing-q6",
    chapter: "dsc-ch15-query-processing",
    level: 3,
    question: "“第15章 查询处理”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、算子流水线图、三种连接算法实验和I/O成本对账、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第15章 查询处理"],
  },
  {
    id: "dsc-ch16-query-optimization-q1",
    chapter: "dsc-ch16-query-optimization",
    level: 1,
    question: "为什么“第16章 查询优化”必须覆盖7个目录节点？",
    answer:
      "这些节点共同组成“用等价变换、基数估计与搜索策略选择低代价执行计划”的语义、结构、执行、故障和证据链，缺项会使等价规则证明、统计信息卡、计划搜索树和估计偏差报告无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第16章 查询优化"],
  },
  {
    id: "dsc-ch16-query-optimization-q2",
    chapter: "dsc-ch16-query-optimization",
    level: 1,
    question: "“第16章 查询优化”的最小正确性合同是什么？",
    answer:
      "所有重写保持包与NULL语义，估计误差可观测，计划优劣用实际行数和资源验证；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第16章 查询优化"],
  },
  {
    id: "dsc-ch16-query-optimization-q3",
    chapter: "dsc-ch16-query-optimization",
    level: 2,
    question: "怎样为“第16章 查询优化”构造最小失败反例？",
    answer:
      "把“把谓词下推当作无条件安全，或相信过期统计产生的单一成本数字”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第16章 查询优化"],
  },
  {
    id: "dsc-ch16-query-optimization-q4",
    chapter: "dsc-ch16-query-optimization",
    level: 2,
    question: "“第16章 查询优化”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第16章 查询优化"],
  },
  {
    id: "dsc-ch16-query-optimization-q5",
    chapter: "dsc-ch16-query-optimization",
    level: 3,
    question: "如何验证“第16章 查询优化”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第16章 查询优化"],
  },
  {
    id: "dsc-ch16-query-optimization-q6",
    chapter: "dsc-ch16-query-optimization",
    level: 3,
    question: "“第16章 查询优化”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、等价规则证明、统计信息卡、计划搜索树和估计偏差报告、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第16章 查询优化"],
  },
  {
    id: "dsc-ch17-transactions-q1",
    chapter: "dsc-ch17-transactions",
    level: 1,
    question: "为什么“第17章 事务”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“用状态转换、调度图和隔离现象解释ACID如何被实现与验证”的语义、结构、执行、故障和证据链，缺项会使转账状态机、冲突图、隔离现象矩阵和提交故障实验无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第17章 事务"],
  },
  {
    id: "dsc-ch17-transactions-q2",
    chapter: "dsc-ch17-transactions",
    level: 1,
    question: "“第17章 事务”的最小正确性合同是什么？",
    answer:
      "提交事务的效果持久，回滚事务无残留，并发调度等价于允许的串行或隔离级别语义；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第17章 事务"],
  },
  {
    id: "dsc-ch17-transactions-q3",
    chapter: "dsc-ch17-transactions",
    level: 2,
    question: "怎样为“第17章 事务”构造最小失败反例？",
    answer:
      "把“把每条语句成功当作事务成功，或把可重复读与可串行化混为一谈”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第17章 事务"],
  },
  {
    id: "dsc-ch17-transactions-q4",
    chapter: "dsc-ch17-transactions",
    level: 2,
    question: "“第17章 事务”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第17章 事务"],
  },
  {
    id: "dsc-ch17-transactions-q5",
    chapter: "dsc-ch17-transactions",
    level: 3,
    question: "如何验证“第17章 事务”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第17章 事务"],
  },
  {
    id: "dsc-ch17-transactions-q6",
    chapter: "dsc-ch17-transactions",
    level: 3,
    question: "“第17章 事务”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、转账状态机、冲突图、隔离现象矩阵和提交故障实验、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第17章 事务"],
  },
  {
    id: "dsc-ch18-concurrency-control-q1",
    chapter: "dsc-ch18-concurrency-control",
    level: 1,
    question: "为什么“第18章 并发控制”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“比较锁、时间戳、验证和多版本协议如何排序冲突并处理幻读”的语义、结构、执行、故障和证据链，缺项会使锁表轨迹、死锁等待图、MVCC可见性时间线和写偏差反例无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第18章 并发控制"],
  },
  {
    id: "dsc-ch18-concurrency-control-q2",
    chapter: "dsc-ch18-concurrency-control",
    level: 1,
    question: "“第18章 并发控制”的最小正确性合同是什么？",
    answer:
      "并发历史不破坏声明的不变量，等待图、版本可见性和冲突检测均可审计；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第18章 并发控制"],
  },
  {
    id: "dsc-ch18-concurrency-control-q3",
    chapter: "dsc-ch18-concurrency-control",
    level: 2,
    question: "怎样为“第18章 并发控制”构造最小失败反例？",
    answer:
      "把“只测试丢失更新，忽略谓词冲突、幻读和快照隔离下的写偏差”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第18章 并发控制"],
  },
  {
    id: "dsc-ch18-concurrency-control-q4",
    chapter: "dsc-ch18-concurrency-control",
    level: 2,
    question: "“第18章 并发控制”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第18章 并发控制"],
  },
  {
    id: "dsc-ch18-concurrency-control-q5",
    chapter: "dsc-ch18-concurrency-control",
    level: 3,
    question: "如何验证“第18章 并发控制”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第18章 并发控制"],
  },
  {
    id: "dsc-ch18-concurrency-control-q6",
    chapter: "dsc-ch18-concurrency-control",
    level: 3,
    question: "“第18章 并发控制”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、锁表轨迹、死锁等待图、MVCC可见性时间线和写偏差反例、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第18章 并发控制"],
  },
  {
    id: "dsc-ch19-recovery-q1",
    chapter: "dsc-ch19-recovery",
    level: 1,
    question: "为什么“第19章 恢复系统”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“用日志先行、检查点、重做与撤销把不同故障恢复到一致状态”的语义、结构、执行、故障和证据链，缺项会使WAL时间线、崩溃注入脚本、ARIES三阶段轨迹和恢复点报告无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第19章 恢复系统"],
  },
  {
    id: "dsc-ch19-recovery-q2",
    chapter: "dsc-ch19-recovery",
    level: 1,
    question: "“第19章 恢复系统”的最小正确性合同是什么？",
    answer:
      "数据页落盘前对应日志已持久，恢复重复执行安全，已提交与未提交事务被正确区分；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第19章 恢复系统"],
  },
  {
    id: "dsc-ch19-recovery-q3",
    chapter: "dsc-ch19-recovery",
    level: 2,
    question: "怎样为“第19章 恢复系统”构造最小失败反例？",
    answer:
      "把“把备份当作即时恢复，或只验证正常关机而不在日志与数据页不同落盘点崩溃”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第19章 恢复系统"],
  },
  {
    id: "dsc-ch19-recovery-q4",
    chapter: "dsc-ch19-recovery",
    level: 2,
    question: "“第19章 恢复系统”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第19章 恢复系统"],
  },
  {
    id: "dsc-ch19-recovery-q5",
    chapter: "dsc-ch19-recovery",
    level: 3,
    question: "如何验证“第19章 恢复系统”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第19章 恢复系统"],
  },
  {
    id: "dsc-ch19-recovery-q6",
    chapter: "dsc-ch19-recovery",
    level: 3,
    question: "“第19章 恢复系统”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、WAL时间线、崩溃注入脚本、ARIES三阶段轨迹和恢复点报告、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第19章 恢复系统"],
  },
  {
    id: "dsc-ch20-architectures-q1",
    chapter: "dsc-ch20-architectures",
    level: 1,
    question: "为什么“第20章 数据库系统体系结构”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“比较集中式、共享内存、共享磁盘、无共享、分布式与云数据库边界”的语义、结构、执行、故障和证据链，缺项会使体系结构决策表、故障域图、扩展曲线和云责任矩阵无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第20章 数据库系统体系结构"],
  },
  {
    id: "dsc-ch20-architectures-q2",
    chapter: "dsc-ch20-architectures",
    level: 1,
    question: "“第20章 数据库系统体系结构”的最小正确性合同是什么？",
    answer:
      "计算、内存、存储与故障域的共享关系明确，扩展收益不以隐藏协调成本为代价；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第20章 数据库系统体系结构"],
  },
  {
    id: "dsc-ch20-architectures-q3",
    chapter: "dsc-ch20-architectures",
    level: 2,
    question: "怎样为“第20章 数据库系统体系结构”构造最小失败反例？",
    answer:
      "把“把增加节点等同线性加速，忽略共享资源、网络、倾斜与跨域故障”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第20章 数据库系统体系结构"],
  },
  {
    id: "dsc-ch20-architectures-q4",
    chapter: "dsc-ch20-architectures",
    level: 2,
    question: "“第20章 数据库系统体系结构”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第20章 数据库系统体系结构"],
  },
  {
    id: "dsc-ch20-architectures-q5",
    chapter: "dsc-ch20-architectures",
    level: 3,
    question: "如何验证“第20章 数据库系统体系结构”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第20章 数据库系统体系结构"],
  },
  {
    id: "dsc-ch20-architectures-q6",
    chapter: "dsc-ch20-architectures",
    level: 3,
    question: "“第20章 数据库系统体系结构”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、体系结构决策表、故障域图、扩展曲线和云责任矩阵、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第20章 数据库系统体系结构"],
  },
  {
    id: "dsc-ch21-parallel-distributed-storage-q1",
    chapter: "dsc-ch21-parallel-distributed-storage",
    level: 1,
    question: "为什么“第21章 并行与分布式存储”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“用分区、复制、并行索引和分布式文件组织大规模数据”的语义、结构、执行、故障和证据链，缺项会使分片函数、倾斜直方图、复制故障实验和再平衡计划无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第21章 并行与分布式存储"],
  },
  {
    id: "dsc-ch21-parallel-distributed-storage-q2",
    chapter: "dsc-ch21-parallel-distributed-storage",
    level: 1,
    question: "“第21章 并行与分布式存储”的最小正确性合同是什么？",
    answer:
      "每条记录的放置规则确定，复制版本收敛，节点故障与热点下仍满足目标可用性；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第21章 并行与分布式存储"],
  },
  {
    id: "dsc-ch21-parallel-distributed-storage-q3",
    chapter: "dsc-ch21-parallel-distributed-storage",
    level: 2,
    question: "怎样为“第21章 并行与分布式存储”构造最小失败反例？",
    answer:
      "把“只按平均数据量分区，忽略热键、访问局部性和再平衡期间的双写一致性”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第21章 并行与分布式存储"],
  },
  {
    id: "dsc-ch21-parallel-distributed-storage-q4",
    chapter: "dsc-ch21-parallel-distributed-storage",
    level: 2,
    question: "“第21章 并行与分布式存储”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第21章 并行与分布式存储"],
  },
  {
    id: "dsc-ch21-parallel-distributed-storage-q5",
    chapter: "dsc-ch21-parallel-distributed-storage",
    level: 3,
    question: "如何验证“第21章 并行与分布式存储”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第21章 并行与分布式存储"],
  },
  {
    id: "dsc-ch21-parallel-distributed-storage-q6",
    chapter: "dsc-ch21-parallel-distributed-storage",
    level: 3,
    question: "“第21章 并行与分布式存储”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、分片函数、倾斜直方图、复制故障实验和再平衡计划、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第21章 并行与分布式存储"],
  },
  {
    id: "dsc-ch22-parallel-distributed-query-q1",
    chapter: "dsc-ch22-parallel-distributed-query",
    level: 1,
    question: "为什么“第22章 并行与分布式查询处理”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“把排序、连接和算子流水线拆到多节点并控制重分区、倾斜与网络成本”的语义、结构、执行、故障和证据链，缺项会使并行计划图、交换算子轨迹、倾斜注入和加速比报告无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第22章 并行与分布式查询处理"],
  },
  {
    id: "dsc-ch22-parallel-distributed-query-q2",
    chapter: "dsc-ch22-parallel-distributed-query",
    level: 1,
    question: "“第22章 并行与分布式查询处理”的最小正确性合同是什么？",
    answer:
      "并行结果与串行语义一致，分区边界不漏不重，最慢任务与网络字节可观测；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第22章 并行与分布式查询处理"],
  },
  {
    id: "dsc-ch22-parallel-distributed-query-q3",
    chapter: "dsc-ch22-parallel-distributed-query",
    level: 2,
    question: "怎样为“第22章 并行与分布式查询处理”构造最小失败反例？",
    answer:
      "把“只看总CPU不看关键路径，或让大表重分区造成网络爆炸与长尾任务”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第22章 并行与分布式查询处理"],
  },
  {
    id: "dsc-ch22-parallel-distributed-query-q4",
    chapter: "dsc-ch22-parallel-distributed-query",
    level: 2,
    question: "“第22章 并行与分布式查询处理”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第22章 并行与分布式查询处理"],
  },
  {
    id: "dsc-ch22-parallel-distributed-query-q5",
    chapter: "dsc-ch22-parallel-distributed-query",
    level: 3,
    question: "如何验证“第22章 并行与分布式查询处理”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第22章 并行与分布式查询处理"],
  },
  {
    id: "dsc-ch22-parallel-distributed-query-q6",
    chapter: "dsc-ch22-parallel-distributed-query",
    level: 3,
    question: "“第22章 并行与分布式查询处理”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、并行计划图、交换算子轨迹、倾斜注入和加速比报告、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第22章 并行与分布式查询处理"],
  },
  {
    id: "dsc-ch23-distributed-transactions-q1",
    chapter: "dsc-ch23-distributed-transactions",
    level: 1,
    question: "为什么“第23章 并行与分布式事务处理”必须覆盖9个目录节点？",
    answer:
      "这些节点共同组成“在网络分区和节点故障下协调提交、复制、选主与共识”的语义、结构、执行、故障和证据链，缺项会使两阶段提交时序、故障矩阵、复制一致性测试和共识日志无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第23章 并行与分布式事务处理"],
  },
  {
    id: "dsc-ch23-distributed-transactions-q2",
    chapter: "dsc-ch23-distributed-transactions",
    level: 1,
    question: "“第23章 并行与分布式事务处理”的最小正确性合同是什么？",
    answer:
      "事务决议唯一且可恢复，复制读写满足声明的一致性，任期和日志次序不倒退；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第23章 并行与分布式事务处理"],
  },
  {
    id: "dsc-ch23-distributed-transactions-q3",
    chapter: "dsc-ch23-distributed-transactions",
    level: 2,
    question: "怎样为“第23章 并行与分布式事务处理”构造最小失败反例？",
    answer:
      "把“把两阶段提交当作共识，或在超时后自行提交造成参与者决议分叉”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第23章 并行与分布式事务处理"],
  },
  {
    id: "dsc-ch23-distributed-transactions-q4",
    chapter: "dsc-ch23-distributed-transactions",
    level: 2,
    question: "“第23章 并行与分布式事务处理”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第23章 并行与分布式事务处理"],
  },
  {
    id: "dsc-ch23-distributed-transactions-q5",
    chapter: "dsc-ch23-distributed-transactions",
    level: 3,
    question: "如何验证“第23章 并行与分布式事务处理”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第23章 并行与分布式事务处理"],
  },
  {
    id: "dsc-ch23-distributed-transactions-q6",
    chapter: "dsc-ch23-distributed-transactions",
    level: 3,
    question: "“第23章 并行与分布式事务处理”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、两阶段提交时序、故障矩阵、复制一致性测试和共识日志、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第23章 并行与分布式事务处理"],
  },
  {
    id: "dsc-ch24-advanced-indexing-q1",
    chapter: "dsc-ch24-advanced-indexing",
    level: 1,
    question: "为什么“第24章 高级索引技术”必须覆盖6个目录节点？",
    answer:
      "这些节点共同组成“深入比较概率过滤、写优化层次、压缩位图、空间划分与动态哈希”的语义、结构、执行、故障和证据链，缺项会使布隆过滤误判曲线、LSM压实轨迹、位图运算和空间查询对照无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第24章 高级索引技术"],
  },
  {
    id: "dsc-ch24-advanced-indexing-q2",
    chapter: "dsc-ch24-advanced-indexing",
    level: 1,
    question: "“第24章 高级索引技术”的最小正确性合同是什么？",
    answer:
      "概率结构只产生可量化的假阳性，合并与分裂不丢数据，查询能跨所有有效层得到完整结果；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第24章 高级索引技术"],
  },
  {
    id: "dsc-ch24-advanced-indexing-q3",
    chapter: "dsc-ch24-advanced-indexing",
    level: 2,
    question: "怎样为“第24章 高级索引技术”构造最小失败反例？",
    answer:
      "把“把布隆过滤器当精确集合，或压实时忽略墓碑与旧版本导致数据复活”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第24章 高级索引技术"],
  },
  {
    id: "dsc-ch24-advanced-indexing-q4",
    chapter: "dsc-ch24-advanced-indexing",
    level: 2,
    question: "“第24章 高级索引技术”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第24章 高级索引技术"],
  },
  {
    id: "dsc-ch24-advanced-indexing-q5",
    chapter: "dsc-ch24-advanced-indexing",
    level: 3,
    question: "如何验证“第24章 高级索引技术”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第24章 高级索引技术"],
  },
  {
    id: "dsc-ch24-advanced-indexing-q6",
    chapter: "dsc-ch24-advanced-indexing",
    level: 3,
    question: "“第24章 高级索引技术”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、布隆过滤误判曲线、LSM压实轨迹、位图运算和空间查询对照、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第24章 高级索引技术"],
  },
  {
    id: "dsc-ch25-advanced-app-development-q1",
    chapter: "dsc-ch25-advanced-app-development",
    level: 1,
    question: "为什么“第25章 高级应用开发”必须覆盖6个目录节点？",
    answer:
      "这些节点共同组成“把性能问题转成可重复基准、端到端剖析与标准接口选择”的语义、结构、执行、故障和证据链，缺项会使性能假设表、基准方案、火焰路径和调优前后证据无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第25章 高级应用开发"],
  },
  {
    id: "dsc-ch25-advanced-app-development-q2",
    chapter: "dsc-ch25-advanced-app-development",
    level: 1,
    question: "“第25章 高级应用开发”的最小正确性合同是什么？",
    answer:
      "基准工作负载、数据规模、预热与统计方法固定，调优不牺牲正确性或可移植合同；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第25章 高级应用开发"],
  },
  {
    id: "dsc-ch25-advanced-app-development-q3",
    chapter: "dsc-ch25-advanced-app-development",
    level: 2,
    question: "怎样为“第25章 高级应用开发”构造最小失败反例？",
    answer:
      "把“用单次延迟或空缓存结果宣布优化成功，忽略吞吐、尾延迟和正确性回归”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第25章 高级应用开发"],
  },
  {
    id: "dsc-ch25-advanced-app-development-q4",
    chapter: "dsc-ch25-advanced-app-development",
    level: 2,
    question: "“第25章 高级应用开发”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第25章 高级应用开发"],
  },
  {
    id: "dsc-ch25-advanced-app-development-q5",
    chapter: "dsc-ch25-advanced-app-development",
    level: 3,
    question: "如何验证“第25章 高级应用开发”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第25章 高级应用开发"],
  },
  {
    id: "dsc-ch25-advanced-app-development-q6",
    chapter: "dsc-ch25-advanced-app-development",
    level: 3,
    question: "“第25章 高级应用开发”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、性能假设表、基准方案、火焰路径和调优前后证据、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第25章 高级应用开发"],
  },
  {
    id: "dsc-ch26-blockchain-databases-q1",
    chapter: "dsc-ch26-blockchain-databases",
    level: 1,
    question: "为什么“第26章 区块链数据库”必须覆盖9个目录节点？",
    answer:
      "这些节点共同组成“区分哈希链、签名、共识、状态机复制和智能合约各自提供的保证”的语义、结构、执行、故障和证据链，缺项会使区块验证器、分叉实验、智能合约状态机和数据库对照表无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第26章 区块链数据库"],
  },
  {
    id: "dsc-ch26-blockchain-databases-q2",
    chapter: "dsc-ch26-blockchain-databases",
    level: 1,
    question: "“第26章 区块链数据库”的最小正确性合同是什么？",
    answer:
      "账本历史可验证，状态转换确定，参与者威胁模型与最终性假设明确；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第26章 区块链数据库"],
  },
  {
    id: "dsc-ch26-blockchain-databases-q3",
    chapter: "dsc-ch26-blockchain-databases",
    level: 2,
    question: "怎样为“第26章 区块链数据库”构造最小失败反例？",
    answer:
      "把“因为记录带哈希就宣称不可篡改，或忽略密钥治理、共识多数与链下数据”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第26章 区块链数据库"],
  },
  {
    id: "dsc-ch26-blockchain-databases-q4",
    chapter: "dsc-ch26-blockchain-databases",
    level: 2,
    question: "“第26章 区块链数据库”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第26章 区块链数据库"],
  },
  {
    id: "dsc-ch26-blockchain-databases-q5",
    chapter: "dsc-ch26-blockchain-databases",
    level: 3,
    question: "如何验证“第26章 区块链数据库”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第26章 区块链数据库"],
  },
  {
    id: "dsc-ch26-blockchain-databases-q6",
    chapter: "dsc-ch26-blockchain-databases",
    level: 3,
    question: "“第26章 区块链数据库”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、区块验证器、分叉实验、智能合约状态机和数据库对照表、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第26章 区块链数据库"],
  },
  {
    id: "dsc-ch27-formal-query-languages-q1",
    chapter: "dsc-ch27-formal-query-languages",
    level: 1,
    question: "为什么“第27章 形式化关系查询语言”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“用逻辑变量、量词、安全性与递归规则表达关系查询”的语义、结构、执行、故障和证据链，缺项会使演算到代数翻译、非安全表达式反例和Datalog递归轨迹无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第27章 形式化关系查询语言"],
  },
  {
    id: "dsc-ch27-formal-query-languages-q2",
    chapter: "dsc-ch27-formal-query-languages",
    level: 1,
    question: "“第27章 形式化关系查询语言”的最小正确性合同是什么？",
    answer:
      "查询表达式安全且结果有限，自由变量决定结果模式，递归规则单调并到达不动点；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第27章 形式化关系查询语言"],
  },
  {
    id: "dsc-ch27-formal-query-languages-q3",
    chapter: "dsc-ch27-formal-query-languages",
    level: 2,
    question: "怎样为“第27章 形式化关系查询语言”构造最小失败反例？",
    answer:
      "把“忽略自由变量与安全范围，写出依赖无限域或通过否定产生非单调递归的规则”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第27章 形式化关系查询语言"],
  },
  {
    id: "dsc-ch27-formal-query-languages-q4",
    chapter: "dsc-ch27-formal-query-languages",
    level: 2,
    question: "“第27章 形式化关系查询语言”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第27章 形式化关系查询语言"],
  },
  {
    id: "dsc-ch27-formal-query-languages-q5",
    chapter: "dsc-ch27-formal-query-languages",
    level: 3,
    question: "如何验证“第27章 形式化关系查询语言”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第27章 形式化关系查询语言"],
  },
  {
    id: "dsc-ch27-formal-query-languages-q6",
    chapter: "dsc-ch27-formal-query-languages",
    level: 3,
    question: "“第27章 形式化关系查询语言”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、演算到代数翻译、非安全表达式反例和Datalog递归轨迹、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第27章 形式化关系查询语言"],
  },
  {
    id: "dsc-ch28-advanced-relational-design-q1",
    chapter: "dsc-ch28-advanced-relational-design",
    level: 1,
    question: "为什么“第28章 高级关系数据库设计”必须覆盖4个目录节点？",
    answer:
      "这些节点共同组成“用多值依赖、连接依赖、4NF、PJNF与DKNF处理独立多值事实”的语义、结构、执行、故障和证据链，缺项会使多值依赖推导、4NF分解、连接依赖反例和约束归类表无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第28章 高级关系数据库设计"],
  },
  {
    id: "dsc-ch28-advanced-relational-design-q2",
    chapter: "dsc-ch28-advanced-relational-design",
    level: 1,
    question: "“第28章 高级关系数据库设计”的最小正确性合同是什么？",
    answer:
      "分解消除独立多值组合造成的冗余，同时保持无损连接和可执行约束；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第28章 高级关系数据库设计"],
  },
  {
    id: "dsc-ch28-advanced-relational-design-q3",
    chapter: "dsc-ch28-advanced-relational-design",
    level: 2,
    question: "怎样为“第28章 高级关系数据库设计”构造最小失败反例？",
    answer:
      "把“把两个一对多事实留在同一关系造成笛卡尔冗余，或将函数依赖规则直接套到多值依赖”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第28章 高级关系数据库设计"],
  },
  {
    id: "dsc-ch28-advanced-relational-design-q4",
    chapter: "dsc-ch28-advanced-relational-design",
    level: 2,
    question: "“第28章 高级关系数据库设计”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第28章 高级关系数据库设计"],
  },
  {
    id: "dsc-ch28-advanced-relational-design-q5",
    chapter: "dsc-ch28-advanced-relational-design",
    level: 3,
    question: "如何验证“第28章 高级关系数据库设计”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第28章 高级关系数据库设计"],
  },
  {
    id: "dsc-ch28-advanced-relational-design-q6",
    chapter: "dsc-ch28-advanced-relational-design",
    level: 3,
    question: "“第28章 高级关系数据库设计”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、多值依赖推导、4NF分解、连接依赖反例和约束归类表、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第28章 高级关系数据库设计"],
  },
  {
    id: "dsc-ch29-object-based-databases-q1",
    chapter: "dsc-ch29-object-based-databases",
    level: 1,
    question: "为什么“第29章 基于对象的数据库”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“把结构化类型、引用、继承、数组与多集映射到对象关系数据库”的语义、结构、执行、故障和证据链，缺项会使对象关系模式、继承查询、UNNEST往返实验和1NF对照无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第29章 基于对象的数据库"],
  },
  {
    id: "dsc-ch29-object-based-databases-q2",
    chapter: "dsc-ch29-object-based-databases",
    level: 1,
    question: "“第29章 基于对象的数据库”的最小正确性合同是什么？",
    answer:
      "类型替换保持约束，引用目标有效，嵌套集合的展开与重组不丢失身份和基数；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第29章 基于对象的数据库"],
  },
  {
    id: "dsc-ch29-object-based-databases-q3",
    chapter: "dsc-ch29-object-based-databases",
    level: 2,
    question: "怎样为“第29章 基于对象的数据库”构造最小失败反例？",
    answer:
      "把“把面向对象语言继承原样搬进表继承，忽略查询范围、对象身份和更新传播差异”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第29章 基于对象的数据库"],
  },
  {
    id: "dsc-ch29-object-based-databases-q4",
    chapter: "dsc-ch29-object-based-databases",
    level: 2,
    question: "“第29章 基于对象的数据库”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第29章 基于对象的数据库"],
  },
  {
    id: "dsc-ch29-object-based-databases-q5",
    chapter: "dsc-ch29-object-based-databases",
    level: 3,
    question: "如何验证“第29章 基于对象的数据库”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第29章 基于对象的数据库"],
  },
  {
    id: "dsc-ch29-object-based-databases-q6",
    chapter: "dsc-ch29-object-based-databases",
    level: 3,
    question: "“第29章 基于对象的数据库”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、对象关系模式、继承查询、UNNEST往返实验和1NF对照、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第29章 基于对象的数据库"],
  },
  {
    id: "dsc-ch30-xml-q1",
    chapter: "dsc-ch30-xml",
    level: 1,
    question: "为什么“第30章 XML”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“从树结构、模式、XPath、XQuery到关系存储与数据交换完整处理XML”的语义、结构、执行、故障和证据链，缺项会使XML树、XSD验证、XPath和XQuery测试、关系映射往返报告无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第30章 XML"],
  },
  {
    id: "dsc-ch30-xml-q2",
    chapter: "dsc-ch30-xml",
    level: 1,
    question: "“第30章 XML”的最小正确性合同是什么？",
    answer:
      "文档良构且模式有效，节点顺序与身份在查询、转换和往返存储后满足合同；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第30章 XML"],
  },
  {
    id: "dsc-ch30-xml-q3",
    chapter: "dsc-ch30-xml",
    level: 2,
    question: "怎样为“第30章 XML”构造最小失败反例？",
    answer:
      "把“把XML当作字符串处理，或映射到关系表时丢失兄弟顺序、混合内容和命名空间”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第30章 XML"],
  },
  {
    id: "dsc-ch30-xml-q4",
    chapter: "dsc-ch30-xml",
    level: 2,
    question: "“第30章 XML”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第30章 XML"],
  },
  {
    id: "dsc-ch30-xml-q5",
    chapter: "dsc-ch30-xml",
    level: 3,
    question: "如何验证“第30章 XML”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第30章 XML"],
  },
  {
    id: "dsc-ch30-xml-q6",
    chapter: "dsc-ch30-xml",
    level: 3,
    question: "“第30章 XML”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、XML树、XSD验证、XPath和XQuery测试、关系映射往返报告、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第30章 XML"],
  },
  {
    id: "dsc-ch31-information-retrieval-q1",
    chapter: "dsc-ch31-information-retrieval",
    level: 1,
    question: "为什么“第31章 信息检索”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“用倒排索引、TF-IDF、PageRank、抓取与精确率召回率构建检索证据链”的语义、结构、执行、故障和证据链，缺项会使倒排表、TF-IDF计算、PageRank迭代和检索评估面板无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第31章 信息检索"],
  },
  {
    id: "dsc-ch31-information-retrieval-q2",
    chapter: "dsc-ch31-information-retrieval",
    level: 1,
    question: "“第31章 信息检索”的最小正确性合同是什么？",
    answer:
      "索引与文档版本一致，排序信号可解释，离线评估集合与在线目标不混用；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第31章 信息检索"],
  },
  {
    id: "dsc-ch31-information-retrieval-q3",
    chapter: "dsc-ch31-information-retrieval",
    level: 2,
    question: "怎样为“第31章 信息检索”构造最小失败反例？",
    answer:
      "把“用点击率直接证明相关性，或在同一测试集反复调参造成评估泄漏”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第31章 信息检索"],
  },
  {
    id: "dsc-ch31-information-retrieval-q4",
    chapter: "dsc-ch31-information-retrieval",
    level: 2,
    question: "“第31章 信息检索”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第31章 信息检索"],
  },
  {
    id: "dsc-ch31-information-retrieval-q5",
    chapter: "dsc-ch31-information-retrieval",
    level: 3,
    question: "如何验证“第31章 信息检索”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第31章 信息检索"],
  },
  {
    id: "dsc-ch31-information-retrieval-q6",
    chapter: "dsc-ch31-information-retrieval",
    level: 3,
    question: "“第31章 信息检索”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、倒排表、TF-IDF计算、PageRank迭代和检索评估面板、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第31章 信息检索"],
  },
  {
    id: "dsc-ch32-postgresql-q1",
    chapter: "dsc-ch32-postgresql",
    level: 1,
    question: "为什么“第32章 PostgreSQL”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“把全书抽象映射到PostgreSQL进程、页、索引、优化器、MVCC、WAL与扩展点”的语义、结构、执行、故障和证据链，缺项会使PostgreSQL组件图、页与索引观察、EXPLAIN证据和故障恢复实验无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第32章 PostgreSQL"],
  },
  {
    id: "dsc-ch32-postgresql-q2",
    chapter: "dsc-ch32-postgresql",
    level: 1,
    question: "“第32章 PostgreSQL”的最小正确性合同是什么？",
    answer:
      "实验注明PostgreSQL版本，系统目录与执行统计支持结论，MVCC和WAL行为不凭其他DBMS类推；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第32章 PostgreSQL"],
  },
  {
    id: "dsc-ch32-postgresql-q3",
    chapter: "dsc-ch32-postgresql",
    level: 2,
    question: "怎样为“第32章 PostgreSQL”构造最小失败反例？",
    answer:
      "把“把某一版本实现当SQL标准，或直接修改内部结构却不理解内存上下文与错误处理”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第32章 PostgreSQL"],
  },
  {
    id: "dsc-ch32-postgresql-q4",
    chapter: "dsc-ch32-postgresql",
    level: 2,
    question: "“第32章 PostgreSQL”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第32章 PostgreSQL"],
  },
  {
    id: "dsc-ch32-postgresql-q5",
    chapter: "dsc-ch32-postgresql",
    level: 3,
    question: "如何验证“第32章 PostgreSQL”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第32章 PostgreSQL"],
  },
  {
    id: "dsc-ch32-postgresql-q6",
    chapter: "dsc-ch32-postgresql",
    level: 3,
    question: "“第32章 PostgreSQL”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、PostgreSQL组件图、页与索引观察、EXPLAIN证据和故障恢复实验、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第32章 PostgreSQL"],
  },
  {
    id: "dsc-appendix-a-university-schema-q1",
    chapter: "dsc-appendix-a-university-schema",
    level: 1,
    question: "为什么“附录A 详细大学模式”必须覆盖6个目录节点？",
    answer:
      "这些节点共同组成“把贯穿全书的大学数据库实例固化为可重复加载、约束明确的实验基线”的语义、结构、执行、故障和证据链，缺项会使完整DDL、样例数据、关系图、基线计数与重置脚本无法复现。",
    tags: ["数据库系统概念", "原书第7版", "附录A 详细大学模式"],
  },
  {
    id: "dsc-appendix-a-university-schema-q2",
    chapter: "dsc-appendix-a-university-schema",
    level: 1,
    question: "“附录A 详细大学模式”的最小正确性合同是什么？",
    answer:
      "所有样例关系的码与引用完整，跨章实验共享同一版本和统计口径；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "附录A 详细大学模式"],
  },
  {
    id: "dsc-appendix-a-university-schema-q3",
    chapter: "dsc-appendix-a-university-schema",
    level: 2,
    question: "怎样为“附录A 详细大学模式”构造最小失败反例？",
    answer:
      "把“各章临时修改样例数据却不重置版本，导致查询、索引和事务实验无法比较”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "附录A 详细大学模式"],
  },
  {
    id: "dsc-appendix-a-university-schema-q4",
    chapter: "dsc-appendix-a-university-schema",
    level: 2,
    question: "“附录A 详细大学模式”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "附录A 详细大学模式"],
  },
  {
    id: "dsc-appendix-a-university-schema-q5",
    chapter: "dsc-appendix-a-university-schema",
    level: 3,
    question: "如何验证“附录A 详细大学模式”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "附录A 详细大学模式"],
  },
  {
    id: "dsc-appendix-a-university-schema-q6",
    chapter: "dsc-appendix-a-university-schema",
    level: 3,
    question: "“附录A 详细大学模式”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、完整DDL、样例数据、关系图、基线计数与重置脚本、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "附录A 详细大学模式"],
  },
  {
    id: "dsc-official-final-review-q1",
    chapter: "dsc-official-final-review",
    level: 1,
    question: "为什么“第7版全书复习与系统验收”必须覆盖33个目录节点？",
    answer:
      "这些节点共同组成“从需求、模式、SQL、计划、页面、日志到分布式提交复原一条完整数据库因果链”的语义、结构、执行、故障和证据链，缺项会使全书系统设计答辩、故障演练、性能报告和210题复习记录无法复现。",
    tags: ["数据库系统概念", "原书第7版", "第7版全书复习与系统验收"],
  },
  {
    id: "dsc-official-final-review-q2",
    chapter: "dsc-official-final-review",
    level: 1,
    question: "“第7版全书复习与系统验收”的最小正确性合同是什么？",
    answer:
      "任何正确性与性能结论都能回到输入版本、正式语义、执行轨迹、故障反例和恢复证据；必须由固定输入、正常轨迹、失败反例和独立对账共同证明。",
    tags: ["数据库系统概念", "原书第7版", "第7版全书复习与系统验收"],
  },
  {
    id: "dsc-official-final-review-q3",
    chapter: "dsc-official-final-review",
    level: 2,
    question: "怎样为“第7版全书复习与系统验收”构造最小失败反例？",
    answer:
      "把“孤立背术语与算法，却无法解释一次请求在并发、崩溃和节点故障下为何仍正确”写成待证假设，只改变一个数据、并发或故障变量，再比较状态与独立对账。",
    tags: ["数据库系统概念", "原书第7版", "第7版全书复习与系统验收"],
  },
  {
    id: "dsc-official-final-review-q4",
    chapter: "dsc-official-final-review",
    level: 2,
    question: "“第7版全书复习与系统验收”为什么要求先预测再实验？",
    answer:
      "预测会固定结果、状态变化和恢复终点，防止观察结果后反向修改解释，也能暴露模型遗漏。",
    tags: ["数据库系统概念", "原书第7版", "第7版全书复习与系统验收"],
  },
  {
    id: "dsc-official-final-review-q5",
    chapter: "dsc-official-final-review",
    level: 3,
    question: "如何验证“第7版全书复习与系统验收”中的性能结论？",
    answer:
      "固定数据、工作负载和配置，重复测量延迟分布、吞吐、I/O或等待与计划，同时用独立查询确认结果语义未变。",
    tags: ["数据库系统概念", "原书第7版", "第7版全书复习与系统验收"],
  },
  {
    id: "dsc-official-final-review-q6",
    chapter: "dsc-official-final-review",
    level: 3,
    question: "“第7版全书复习与系统验收”独立交接需要哪些材料？",
    answer:
      "需要版本卡、大学模式基线、预测表、全书系统设计答辩、故障演练、性能报告和210题复习记录、正常与失败轨迹、独立对账、限制与回退条件。",
    tags: ["数据库系统概念", "原书第7版", "第7版全书复习与系统验收"],
  },
];
