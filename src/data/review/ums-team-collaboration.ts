import type { ReviewQuestion } from "./types";

export const umsTeamCollaborationQuestions: ReviewQuestion[] = [
  {
    id: "ums-team-collaboration-1",
    chapter: "ums-team-collaboration",
    level: 1,
    question: `Unity 项目版本控制的四层分层是什么？`,
    answer: `代码（.cs）→ Git 文本合并 + Code Review；场景/预制体（.unity/.prefab）→ UnityYAMLMerge 语义合并；美术资源（.png/.fbx/.wav）→ Git LFS，冲突时选一方；配置（.asmdef/.asset）→ Git 文本合并 + 预制体序列化配置。每层用不同的合并策略，解决 Unity 二进制/序列化文件的特殊性。`,
    tags: ["版本控制", "Git LFS", "UnityYAMLMerge"],
  },
  {
    id: "ums-team-collaboration-2",
    chapter: "ums-team-collaboration",
    level: 2,
    question: `.meta 文件为什么必须提交到 Git？不提交会怎样？`,
    answer: `.meta 文件包含资源的 GUID（全局唯一标识），Unity 所有跨资源引用（预制体引用贴图、场景引用预制体）都靠 GUID。不提交 .meta 时，每个人本地 Unity 重新生成 .meta，GUID 不同→引用断裂→场景里贴图丢失、预制体变空物体。规则：.gitignore 排除 Library/Temp/Build 但绝不排除 *.meta。新增资源后立即提交 .meta。`,
    tags: [".meta", "GUID", "引用断裂"],
  },
  {
    id: "ums-team-collaboration-3",
    chapter: "ums-team-collaboration",
    level: 3,
    question: `Unity 场景文件冲突为什么难合并？UnityYAMLMerge 怎么解决？`,
    answer: `场景文件是 Unity 序列化的 YAML，包含数千行对象定义和引用关系。Git 默认按文本行合并，不理解 YAML 语义——两行改动可能破坏引用链导致场景损坏。UnityYAMLMerge 理解 Unity YAML 结构，按对象 GUID 和 fileID 语义合并：同一物体两边的不同属性可自动合并，只有同一属性两边都改才报冲突。还能用 fallback 策略在语义合并失败时回退到文本合并。`,
    tags: ["场景冲突", "UnityYAMLMerge", "语义合并"],
  },
  {
    id: "ums-team-collaboration-4",
    chapter: "ums-team-collaboration",
    level: 4,
    question: `50 人团队的 Unity 项目不用 Git LFS 半年后仓库多大？用了 LFS 后怎么改善？`,
    answer: `不用 LFS：50 人每周提交 10 个资源，平均 5MB/个，半年约 650GB，Git clone 耗时数小时，push/pull 极慢。用了 LFS：仓库只存 LFS 指针（几十字节/文件），实际大文件存独立 LFS 存储，clone 时按需拉取。仓库本体保持在 MB 级，clone 快，大文件历史不膨胀。代价：需要 LFS 服务器（GitHub/GitLab 内置或自建），LFS 配额有上限。但对比 650GB 的不可用仓库，LFS 是必选项。`,
    tags: ["Git LFS", "仓库膨胀", "团队协作"],
  },
];
