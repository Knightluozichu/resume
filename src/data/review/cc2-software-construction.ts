import type { ReviewQuestion } from "./types";

export const cc2SoftwareConstructionQuestions: ReviewQuestion[] = [
  {
    id: "cc2-software-construction-01",
    chapter: "cc2-software-construction",
    level: 1,
    question: `软件构建在软件生命周期中的位置是什么？包含哪些活动？`,
    answer: `软件构建位于架构设计之后、系统测试之前，是软件开发的核心环节。构建包含详细设计、编码、调试和单元测试等活动。完整生命周期为：问题定义 → 需求开发 → 架构设计 → 软件构建 → 系统测试 → 部署。构建是最主要的开发活动，占总开发时间的 30% 到 80%。`,
    tags: ["软件构建", "生命周期", "构建活动"],
  },
  {
    id: "cc2-software-construction-02",
    chapter: "cc2-software-construction",
    level: 1,
    question: `为什么说源代码是软件最精确的描述？`,
    answer: `源代码是唯一能完全精确描述软件行为的产物。需求文档和设计文档可能过时或不完整，但源代码始终与软件实际行为一致。因此构建质量直接决定软件质量——如果源代码有缺陷，软件就有缺陷；如果源代码清晰可维护，软件就易于维护。源代码 = 软件真相的唯一来源。`,
    tags: ["源代码", "构建质量", "精确描述"],
  },
  {
    id: "cc2-software-construction-03",
    chapter: "cc2-software-construction",
    level: 2,
    question: `McConnell 推荐的软件构建隐喻是什么？为什么？`,
    answer: `McConnell 推荐组合隐喻：以建造隐喻为骨架（先设计图纸再分层次施工，强调规划与结构），以增量隐喻为血肉（逐步迭代完善，强调有机成长）。原因：纯粹的写作隐喻过于松散缺乏结构规划；纯粹的农耕隐喻过于被动缺乏设计控制；纯粹的建造隐喻过于刚性缺乏迭代灵活性。组合隐喻兼顾了规划性和灵活性，既保证结构质量又支持逐步演进，最符合软件开发的实际特性。`,
    tags: ["构建隐喻", "组合隐喻", "建造隐喻", "增量开发"],
  },
  {
    id: "cc2-software-construction-04",
    chapter: "cc2-software-construction",
    level: 2,
    question: `软件构建的质量目标有哪些？它们如何影响软件的长期可维护性？`,
    answer: `构建质量目标包括：① 最小复杂度——降低认知负担，使代码易于理解和修改；② 易于维护——方便后续开发者快速上手；③ 松散耦合——模块独立，修改一处不影响他处；④ 可扩展性——支持功能增长而不需大规模重构；⑤ 可重用性——代码可复用，减少重复开发。这些目标直接影响长期可维护性：复杂度低则修改成本低，耦合松则修改风险小，可扩展则适应变化能力强，可重用则开发效率高。质量目标越好，软件的全生命周期成本越低。`,
    tags: ["质量目标", "可维护性", "最小复杂度", "松散耦合", "可扩展性"],
  },
];
