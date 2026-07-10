import type { ReviewQuestion } from "./types";

export const umsWorkflowOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "ums-workflow-optimization-1",
    chapter: "ums-workflow-optimization",
    level: 1,
    question: `工作流优化的三条路径是什么？`,
    answer: `快捷键定制（减少点击次数）、项目模板（统一团队起点，避免每次从零开始）、导入自动化（AssetPostprocessor 在资源导入时自动设置参数，消除手动配置）。三者分别解决「点太多次」「每次从零开始」「手动改参数」三个效率痛点。`,
    tags: ["快捷键", "项目模板", "导入自动化"],
  },
  {
    id: "ums-workflow-optimization-2",
    chapter: "ums-workflow-optimization",
    level: 2,
    question: `哪些重复操作值得自动化？给出判断标准。`,
    answer: `判断标准是频率 x 耗时。高频操作（每次新建脚本、导入贴图，每天多次）必须自动化；中频操作（每周构建打包）值得自动化；低频操作（项目初始化）写成文档即可。具体阈值：一周内重复三次以上且每次超过 30 秒的操作，就值得写脚本。投入产出比是核心——不要为一个每月做一次的操作写半天脚本。`,
    tags: ["自动化判断", "投入产出"],
  },
  {
    id: "ums-workflow-optimization-3",
    chapter: "ums-workflow-optimization",
    level: 3,
    question: `AssetPostprocessor 的 OnPreprocessTexture 和 OnPostprocessTexture 有什么区别？`,
    answer: `OnPreprocessTexture 在导入开始前调用，此时可修改导入设置（Texture Type、Compression、Max Size），修改后按新设置导入，只导入一次。OnPostprocessTexture 在导入完成后调用，此时贴图已生成，可拿到 Texture2D 做像素级处理（如生成缩略图、修改像素）。导入参数配置用 Pre（省一次重新导入），像素处理用 Post。`,
    tags: ["AssetPostprocessor", "贴图导入", "Pre vs Post"],
  },
  {
    id: "ums-workflow-optimization-4",
    chapter: "ums-workflow-optimization",
    level: 4,
    question: `AssetPostprocessor 自动化规则写太粗暴导致角色贴图糊了，怎么设计正确的导入规则？`,
    answer: `用 assetPath 做条件分支，按文件名或路径区分处理：UI 贴图（含 _ui）→ Sprite + 2048 + Compressed；角色贴图（含 _char）→ Texture + 1024 + Compressed；道具（含 _prop）→ 512；法线图（含 _nml）→ NormalMap + 1024。文件名约定和导入参数一一对应，写成团队文档。同时用 \`importer.crunchedCompression = true\` 启用 Crunch 压缩减小包体。规则要可配置（ScriptableObject 存规则表），不要硬编码。`,
    tags: ["导入规则", "文件名约定", "压缩策略"],
  },
];
