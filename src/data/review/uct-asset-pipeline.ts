import type { ReviewQuestion } from "./types";

export const uctAssetPipelineQuestions: ReviewQuestion[] = [
  {
    id: "uct-asset-pipeline-1",
    chapter: "uct-asset-pipeline",
    level: 1,
    question: "Resources、AssetBundle 和 Addressables 三种资源加载方式有什么区别？",
    answer: "Resources 把所有资源打进包，简单但无法按需加载，增加包体。AssetBundle 手动打包分组，可按需加载但管理复杂。Addressables 自动分组管理，用地址加载，支持按需加载和远程更新。推荐用 Addressables。",
    tags: ["资源加载", "Addressables"],
  },
  {
    id: "uct-asset-pipeline-2",
    chapter: "uct-asset-pipeline",
    level: 2,
    question: "为什么移动端纹理要用 ASTC 压缩？不压缩会怎样？",
    answer: "未压缩的 2048x2048 RGBA 纹理占 16MB 内存，几十张纹理就 OOM 闪退。ASTC 6x6 压缩后仅约 1.4MB，压缩比超 10 倍且画质损失小。ASTC 是移动 GPU 硬件支持的格式，解压不耗 CPU。不压缩不仅内存爆炸，包体也巨大。",
    tags: ["ASTC", "纹理压缩", "移动端"],
  },
  {
    id: "uct-asset-pipeline-3",
    chapter: "uct-asset-pipeline",
    level: 3,
    question: "Addressables 的引用计数机制是什么？为什么重要？",
    answer: "每次 LoadAssetAsync 引用计数+1，Release 时-1，归零时自动释放资源。重要性：1）防止内存泄漏——忘了 Release 则计数不归零，资源不释放；2）避免重复加载——同一资源多处 Load 只加载一次，共享内存；3）安全释放——Release 三次才真正释放。用 IsValid() 检查 handle 是否有效。",
    tags: ["引用计数", "内存管理"],
  },
  {
    id: "uct-asset-pipeline-4",
    chapter: "uct-asset-pipeline",
    level: 4,
    question: "项目从 Resources 迁移到 Addressables 的完整方案是什么？",
    answer: "1）在 Package Manager 安装 Addressables；2）把 Resources 文件夹的资源移出（否则仍全打包）；3）在 Inspector 勾选 Addressable 并分配地址；4）把 Resources.Load 替换为 Addressables.LoadAssetAsync+await；5）在 OnDestroy 中调用 Addressables.Release 释放；6）配置 Group 分组策略；7）用 Build Report 验证包体减小；8）测试按需加载是否正常。核心：确保 Release 与 Load 配对。",
    tags: ["Addressables迁移", "综合"],
  },
];
