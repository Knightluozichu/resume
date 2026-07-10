import type { ReviewQuestion } from "./types";

export const umsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ums-final-review-1",
    chapter: "ums-final-review",
    level: 1,
    question: `全书五大维度形成的「达人工作链」是什么？`,
    answer: `需求→工具（EditorWindow 做编辑器）→脚本（泛型+事件系统实现逻辑）→渲染（URP 定制效果）→性能（Profiler 验证零GC）→工程（Addressables 分包 + Git 协作）。六步串联全书五大维度，从需求到上线形成完整技术流程。每个需求都按这条链推进。`,
    tags: ["达人工作链", "全书串联", "综合"],
  },
  {
    id: "ums-final-review-2",
    chapter: "ums-final-review",
    level: 2,
    question: `全书五大维度之间有什么依赖关系？`,
    answer: `编辑器→脚本（定制编辑器后才知道需要哪些脚本工具）→渲染（高级脚本是编写自定义渲染代码的基础）→生产（渲染配置完成后才需要批量资源管理）→收尾（工程化就绪后综合实战）。依赖链是单向递进的：前期技能是后期技能的基础，不能跳过。但实际项目中会回溯——做渲染时发现需要补脚本工具，做工程时发现需要优化渲染。`,
    tags: ["维度依赖", "递进关系", "回溯"],
  },
  {
    id: "ums-final-review-3",
    chapter: "ums-final-review",
    level: 3,
    question: `为什么持续 Profiling 是达人的习惯？从项目第一天开始做有什么好处？`,
    answer: `性能问题是项目后期最大杀手，且其他章的知识最终都要通过性能验证确认效果。从第一天起每完成一个功能就 Profiler 录制，设性能预算（移动端 30FPS、CPU 16ms/帧、零 GC.Alloc），超标立即修。好处：1）问题在萌芽阶段解决，不积累到架构层面；2）建立性能基线，回归测试有参照；3）养成性能意识，写代码时自觉避免 GC 和 DrawCall 浪费。`,
    tags: ["持续 Profiling", "性能预算", "质量保证"],
  },
  {
    id: "ums-final-review-4",
    chapter: "ums-final-review",
    level: 4,
    question: `一个塔防游戏从需求到上线，按全书工作链每步用到哪章知识？`,
    answer: `工具层（第2-3章）：EditorWindow 做关卡编辑器（波次配置、路径编辑），PropertyDrawer 美化技能参数，AssetPostprocessor 自动导入贴图。脚本层（第4章）：泛型对象池管子弹/敌人，事件总线做击杀通知（UI/音效/特效订阅），扩展方法简化 Transform 操作。渲染层（第6章）：URP RendererFeature 做塔攻击范围描边。性能层（第7章）：Profiler 验证热路径零 GC，Frame Debugger 查批处理。工程层（第8-9章）：Addressables 分包热更关卡，Git LFS 管美术资源，UnityYAMLMerge 合并场景，Code Review 保障质量。`,
    tags: ["综合实战", "塔防游戏", "工作链", "全书"],
  },
];
