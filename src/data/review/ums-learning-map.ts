import type { ReviewQuestion } from "./types";

export const umsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ums-learning-map-1",
    chapter: "ums-learning-map",
    level: 1,
    question: `Unity 神技达人炼成记全书的五个阶段是什么？`,
    answer: `编辑器（自定义窗口与 Inspector）、脚本（泛型委托与编辑器扩展）、渲染（SRP 管线与性能剖析）、生产（资源管理与团队协作）、收尾（综合实战）。五阶段递进：先造工具，再写好代码，后调渲染查性能，最后工程化上线。`,
    tags: ["全书脉络", "学习路径"],
  },
  {
    id: "ums-learning-map-2",
    chapter: "ums-learning-map",
    level: 2,
    question: `为什么说编辑器定制是 Unity 达人的第一标志？`,
    answer: `会定制编辑器意味着理解了 Unity 的扩展架构（EditorWindow、PropertyDrawer、MenuItem），能把团队工作流固化成工具。普通开发者用 Unity 给的工具，达人为团队造工具。效率差异在日常体现为十倍以上的差距——重复操作自动化、数据可视化编辑、一键批量处理。`,
    tags: ["编辑器精通", "达人标志"],
  },
  {
    id: "ums-learning-map-3",
    chapter: "ums-learning-map",
    level: 3,
    question: `全书五个阶段之间有什么依赖关系？项目能跑但效率低该从哪切入？`,
    answer: `依赖链：编辑器→脚本（定制编辑器后才知道需要哪些脚本工具）→渲染（高级脚本是编写自定义渲染代码的基础）→生产（渲染配置完成后才需要批量资源管理）→收尾（工程化就绪后综合实战）。项目能跑但效率低，优先切入编辑器阶段——自定义工具把重复操作自动化，投入产出比最高。`,
    tags: ["阶段依赖", "效率优化"],
  },
  {
    id: "ums-learning-map-4",
    chapter: "ums-learning-map",
    level: 4,
    question: `一个 Unity 开发者从「会用」到「精通」，完整的能力跃迁路径是什么？`,
    answer: `1）编辑器精通：EditorWindow/PropertyDrawer/Gizmo 定制工具链；2）脚本进阶：泛型单例/对象池/事件总线/扩展方法写高复用代码；3）渲染深入：URP RendererFeature/RenderPass 自定义管线 + SRP Batcher；4）性能分析：Profiler 定位 CPU/GPU/内存瓶颈 + Frame Debugger 查渲染；5）生产工程：Addressables 分包热更 + Git LFS/UnityYAMLMerge 团队协作。五步走完即达人。`,
    tags: ["能力跃迁", "综合", "全书"],
  },
];
