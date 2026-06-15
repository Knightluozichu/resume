/** 复习题库 · 美术资源优化（ugo-optimizing-art-assets）。Unity Game Optimization Ch4 改编。 */

import type { ReviewQuestion } from "./types";

export const ugoOptimizingArtAssetsQuestions: ReviewQuestion[] = [
  {
    id: "ugo-oaa-1",
    chapter: "ugo-optimizing-art-assets",
    level: 1,
    question: "Mesh Compression 与 Read/Write Enabled 分别影响什么？",
    answer:
      "Mesh Compression 降低顶点数据精度，节省 GPU 显存，运行时由 GPU 解压，略增 CPU。Read/Write Enabled 在内存保留一份 CPU 可写网格副本，约翻倍内存，仅当代码要改 mesh.vertices 或类似操作时才应开启；纯渲染应关闭。",
    tags: ["Mesh", "Read/Write", "压缩"],
  },
  {
    id: "ugo-oaa-2",
    chapter: "ugo-optimizing-art-assets",
    level: 1,
    question: "为什么大多数静态模型应关闭 Read/Write Enabled？",
    answer:
      "关闭后只保留 GPU 侧只读网格，省去 CPU 可写副本，内存约减半。只有运行时修改顶点、法线或某些 MeshCollider 烘焙流程才需要可读网格；烘焙完成后应关掉并 Reimport。",
    tags: ["Read/Write", "Mesh"],
  },
  {
    id: "ugo-oaa-3",
    chapter: "ugo-optimizing-art-assets",
    level: 1,
    question: "Animation Compression 设为 Optimal 并设 Rotation/Position Error 约 0.5 有什么效果？",
    answer:
      "去掉冗余关键帧并降低浮点精度，.anim 体积与运行时曲线内存可降 50–80%，肉眼难辨。适合大量 NPC 与过场动画；主角特写可酌情放宽误差或局部 Off。",
    tags: ["Animation", "压缩"],
  },
  {
    id: "ugo-oaa-4",
    chapter: "ugo-optimizing-art-assets",
    level: 2,
    question: "纹理 Max Size 与 Texture Format 如何影响内存？",
    answer:
      "内存约 ∝ 宽×高×每像素字节×（mipmap 约 1.33）。Max Size 限制导入最大边长，超过则下采样。Format 决定每像素字节：RGBA32 约 4 B/px，ASTC 6×6 约 0.36 B/px。应按用途设尺寸，按平台选 ASTC/ETC2/BC7。",
    tags: ["Texture", "Max Size", "Format"],
  },
  {
    id: "ugo-oaa-5",
    chapter: "ugo-optimizing-art-assets",
    level: 2,
    question: "3D 场景纹理与 UI 图标在 mipmap 设置上应如何区分？",
    answer:
      "3D 场景漫反射、天空盒等应开启 Generate Mip Maps，远处采样低级减少闪烁与带宽，约增 33% 内存。UI、Sprite Atlas、屏幕空间固定大小的图常关闭 mipmap，避免多余内存与模糊。",
    tags: ["mipmap", "Texture", "UI"],
  },
  {
    id: "ugo-oaa-6",
    chapter: "ugo-optimizing-art-assets",
    level: 2,
    question: "长背景音乐与短音效应如何设置 Load Type 与 Compression Format？",
    answer:
      "长 BGM/环境音：Load Type = Streaming，Compression = Vorbis（或平台等价），内存低、略有解码 CPU。短音效（<1s）：Decompress On Load 或 Compressed In Memory，移动常用 ADPCM。忌把长音频 Decompress On Load 一次性解压进内存。",
    tags: ["Audio", "Streaming"],
  },
  {
    id: "ugo-oaa-7",
    chapter: "ugo-optimizing-art-assets",
    level: 2,
    question: "Resources 文件夹的三大陷阱是什么？",
    answer:
      "① 构建期 Resources 下资源全部打进 Player，无法按需剔除 ② 启动时建立全量索引，文件夹越大启动越慢 ③ Resources.Load 的资源无法用常规方式卸载，内存只涨不降；字符串路径无编译期检查。",
    tags: ["Resources", "内存"],
  },
  {
    id: "ugo-oaa-8",
    chapter: "ugo-optimizing-art-assets",
    level: 3,
    question: "AssetBundle 相比 Resources 在加载与内存上有哪些优势？",
    answer:
      "按包拆分输出，可远程下载与热更；LoadFromFileAsync 异步加载；Unload(false/true) 可释放；配合依赖管理可控制内存预算。Addressables 在 AssetBundle 上提供引用计数、分组与 Release API，是现代项目推荐路径。",
    tags: ["AssetBundle", "Addressables"],
  },
  {
    id: "ugo-oaa-9",
    chapter: "ugo-optimizing-art-assets",
    level: 3,
    question: "LoadSceneAsync 中 allowSceneActivation = false 时进度为何停在约 0.9？应如何处理？",
    answer:
      "false 时 Unity 加载到约 90% 后等待手动激活，避免加载完成瞬间同步激活造成卡顿。进度条满 90% 后应在适当时机设 allowSceneActivation = true；UI 应区分「加载中」与「激活中」，激活阶段仍可能实例化大量对象。",
    tags: ["异步加载", "LoadSceneAsync"],
  },
  {
    id: "ugo-oaa-10",
    chapter: "ugo-optimizing-art-assets",
    level: 3,
    question: "1024×1024 RGBA32 含 mipmap 约多少 MB？改为 ASTC 6×6 同尺寸含 mipmap 大约多少？",
    answer:
      "RGBA32：1024×1024×4×1.33 ≈ 5.3 MB。ASTC 6×6：1024×1024×0.36×1.33 ≈ 0.5 MB。说明格式与 Max Size 双重收紧对内存影响巨大；UI 若只需 256 显示，应设 Max Size 256 而非保留 4K 源尺寸。",
    tags: ["Texture", "内存计算"],
  },
  {
    id: "ugo-oaa-11",
    chapter: "ugo-optimizing-art-assets",
    level: 2,
    question: "AssetBundle.Unload(true) 后材质变粉的原因与正确做法？",
    answer:
      "Unload(true) 会卸载包内所有资源包括仍被场景引用的，导致 Missing 材质变粉。应确认无引用后使用 Unload(false) 只卸 bundle 容器，或 Addressables.Release；需要时用 Resources.UnloadUnusedAssets 清理未引用资源。",
    tags: ["AssetBundle", "Unload"],
  },
];
