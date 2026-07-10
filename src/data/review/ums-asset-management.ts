import type { ReviewQuestion } from "./types";

export const umsAssetManagementQuestions: ReviewQuestion[] = [
  {
    id: "ums-asset-management-1",
    chapter: "ums-asset-management",
    level: 1,
    question: `Unity 三种资源加载方式是什么？各自的适用场景？`,
    answer: `Resources（同步加载，启动时全量索引，适合极小量启动资源）、AssetBundle（异步加载，可热更可按需下载，适合打包后的资源管理）、Addressables（基于 AB 的上层封装，用地址定位，自动管理引用计数和卸载，是现代方案）。Resources 尽量少用，Addressables 是推荐方案。`,
    tags: ["Resources", "AssetBundle", "Addressables"],
  },
  {
    id: "ums-asset-management-2",
    chapter: "ums-asset-management",
    level: 2,
    question: `为什么 Resources 文件夹应该尽量少用？有什么具体危害？`,
    answer: `Resources 文件夹在构建时把所有资源打包进一个序列化索引（resources.assets），无论是否使用。危害：1）包体膨胀（不用的资源也打进去）；2）启动慢（启动时加载整个索引到内存）；3）内存占用高（索引常驻）；4）无法热更新（不支持增量更新）；5）无法按需下载。只适合放启动必需的极小量资源（如 Boot 场景），其余用 Addressables。`,
    tags: ["Resources", "包体", "启动慢"],
  },
  {
    id: "ums-asset-management-3",
    chapter: "ums-asset-management",
    level: 3,
    question: `AB 分组时，什么资源该打包在一起，什么该分开？`,
    answer: `同时加载的打一起（如一个场景的贴图+模型+音频打一个 AB，加载时一次 IO），减少 AB 加载次数。跨场景共享的分开打（如通用 UI 材质单独一个 AB，多场景复用不重复打包）。更新频率不同的分开（配置表单独 AB，方便热更时只下小包）。原则：同时用的合，不同时用的分，常更新的与不更新的分。`,
    tags: ["AB 分组", "打包策略", "热更新"],
  },
  {
    id: "ums-asset-management-4",
    chapter: "ums-asset-management",
    level: 4,
    question: `Addressables.Release(handle) 后内存没降，可能的原因和排查方法？`,
    answer: `原因：1）Release 只减少引用计数，同一 AB 被多个 handle 引用时计数没归零不卸载；2）Instantiate 出的实例没 Destroy（实例持有引用）；3）其他代码持有 handle 没释放。排查：用 Addressables Event Viewer 查看引用计数变化，确认计数归零。确保所有 Instantiate 出的实例都 Destroy，所有 LoadAsset 的 handle 都 Release。多人引用同一资源时用引用计数管理器统一追踪 handle 生命周期。`,
    tags: ["Addressables", "内存泄漏", "引用计数", "排查"],
  },
];
