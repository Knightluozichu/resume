import type { ReviewQuestion } from "./types";

export const mmmLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mmm-learning-map-01",
    chapter: "mmm-learning-map",
    level: 1,
    question: "《人月神话》全书分为哪五个学习阶段？",
    answer: "五个学习阶段为：基础认知（知识全景图、焦油坑、人月神话）、团队组织（外科手术队伍、沟通与文档）、架构设计（第二系统效应、概念完整性与架构）、反思展望（没有银弹、经验总结与未来展望）、全书复习（知识整合与系统闭环）。",
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "mmm-learning-map-02",
    chapter: "mmm-learning-map",
    level: 1,
    question: "Brooks 定律的核心内容是什么？",
    answer: "Brooks 定律：为延迟的项目增加人力，只会使它更延迟。其背后的机制包括：新人加入需要培训（生产率为负）、培训消耗老成员时间、人数增加导致通信开销急剧增长、概念一致性更难维持。",
    tags: ["Brooks定律", "人月", "团队规模"],
  },
  {
    id: "mmm-learning-map-03",
    chapter: "mmm-learning-map",
    level: 2,
    question: "全书学习路径的核心脉络是什么？各阶段之间如何递进？",
    answer: "核心脉络为：知识全景图 → 焦油坑 → 人月神话 → 外科手术队伍 → 沟通与文档 → 第二系统效应 → 概念完整性 → 没有银弹 → 经验总结 → 全书复习。递进逻辑：先建立困境认知（ch0-2），再学习团队组织方式（ch3-4），然后掌握架构设计原则（ch5-6），最后通过反思形成知识闭环（ch7-9）。",
    tags: ["核心脉络", "系统闭环", "递进关系"],
  },
  {
    id: "mmm-learning-map-04",
    chapter: "mmm-learning-map",
    level: 2,
    question: "用四层系统视角概括《人月神话》的知识体系。",
    answer: "四层系统视角：① 项目困境层——焦油坑五困境、人月不可互换、Brooks 定律、系统层次演进，认知项目本质；② 团队组织层——外科手术队伍、专业化分工、通信开销公式、文档驱动沟通，优化人力组织；③ 架构设计层——概念完整性、第二系统效应、架构师职责、设计实现分离，保障设计质量；④ 反思展望层——没有银弹、本质vs意外复杂性、进攻策略、经验修正，持续改进认知。",
    tags: ["四层视角", "项目困境层", "团队组织层", "架构设计层", "反思展望层"],
  },
];
