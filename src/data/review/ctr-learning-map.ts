import type { ReviewQuestion } from "./types";

/** 现代 C++ 测试驱动开发 · 全书学习路线图复习题 */
export const ctrLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ctr-learning-map-1",
    chapter: "ctr-learning-map",
    level: 1,
    question: "原书 11 章如何组成建立反馈、构造测试、演化复杂系统和团队持续四阶段？",
    answer: "Ch1-3 固定环境、完成 Soundex 首例并建立 TDD 三条规则；Ch4-7 处理测试组织、替身、增量设计和 FIRST 质量；Ch8-10 把护栏与小步带入遗留、线程、性能及单元/集成/验收证据；Ch11 用结对、kata/dojo、覆盖率、CI、标准与社区让团队持续。",
    tags: ["学习地图", "11章", "四阶段"],
  },
  {
    id: "ctr-learning-map-2",
    chapter: "ctr-learning-map",
    level: 2,
    question: "为什么章节可以按目标跳读，但正确红灯、快测试、可控依赖和行为护栏不能跳过？",
    answer: "这些能力是后续证据基础：无正确红灯就不知道测试是否有效，无快层就无法短循环，无可控依赖会产生随机慢测试，无护栏则遗留重构无法区分无意变化。跳到线程、遗留或团队章时必须回补相应前置章节和可执行产物。",
    tags: ["章节依赖", "前置能力", "证据"],
  },
  {
    id: "ctr-learning-map-3",
    chapter: "ctr-learning-map",
    level: 3,
    question: "每章的先预测、复现、解释、迁移、复查闭环分别产出什么？",
    answer: "先预测写下失败与责任层；复现保存命令、测试数、差值和退出码；解释排除环境、旧产物和偶然调度；迁移在真实模块做一个窄改造；复查列出边界、替身、慢层和团队门禁缺口。闭环把阅读认识转为可重复工程证据。",
    tags: ["学习闭环", "先预测", "实践证据"],
  },
  {
    id: "ctr-learning-map-4",
    chapter: "ctr-learning-map",
    level: 4,
    question: "完成全书的综合项目应提供哪些证据，为什么总测试数不是验收标准？",
    answer: "项目应有固定工具链与 CI 故意失败、由验收下沉的快领域测试和真实适配器契约、理由明确的替身、遗留特征提取或受控并发交错、性能基线预算，以及红主干/随机测试/快层团队标准。测试数不说明行为范围、诊断质量或证据层是否正确。",
    tags: ["综合验收", "证据链", "团队门禁"],
  },
];
