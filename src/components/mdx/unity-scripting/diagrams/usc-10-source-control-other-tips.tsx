import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 10 权威边界",
    action:
      "官方目录为 Git - source control、Resources folder and external files、AssetBundles and external files、Persistent data and saved games。原章产品页还概括为 revision control、resource folders/external files、loading and saving games。现代 Addressables 可作迁移对照，但不计作第五个原始小节。",
    metric: "4 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "身份、版本、寻址、加载与恢复",
    action:
      "Git 保存源资产和 .meta 身份，提交形成可回滚历史；Resources 把已知路径资源打进构建，外部文件通过平台路径加载，AssetBundle 把资源及依赖打成可分发包。存档把运行状态序列化到 persistentDataPath，并需要 schema version、校验、临时文件和替换策略。每个外部输入都要验证版本、完整性、依赖与失败恢复。",
    metric: "producer -> consumer",
    evidence: "Git - source control；Resources folder and external files",
    boundary:
      "忽略 .meta 会让 GUID 重建，场景和 Prefab 引用可能在另一台机器静默断裂。",
  },
  {
    label: "实验",
    stage: "验证仓库可复原",
    action:
      "提交 Assets、Packages、ProjectSettings 与 .meta，在干净目录检出，打开场景并检查 GUID 引用；确认 Library 等生成目录被忽略。",
    metric: "single variable",
    evidence: "Assets/",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "破坏并恢复存档",
    action:
      "实现版本与临时文件，分别模拟半写、校验失败、旧 schema 和磁盘不可写，验证备份、迁移与用户提示。",
    metric: "normal / edge / failure",
    evidence:
      "忽略 .meta 会让 GUID 重建，场景和 Prefab 引用可能在另一台机器静默断裂。；直接覆盖正式存档遇到崩溃或磁盘满会留下半个文件，应使用临时文件、替换与备份。",
    boundary:
      "Git 与 .meta 仍是现代 Unity 协作基础；Plastic/Unity Version Control 是可选替代。Resources 和手工 AssetBundle 常映射到 Addressables，但原章的寻址、依赖、版本、加载与卸载问题不变。现代云存档还要处理并发冲突和账户身份，不能因此省略本地 schema、校验与恢复。",
  },
  {
    label: "验收",
    stage: "Chapter 10 证据包",
    action:
      "验收包含干净检出、引用完整、提交历史、三种资源入口对照、Bundle 依赖与卸载、正常/损坏/旧版/不可写存档。交付结论必须在第二个目录或 CI 环境重放，不能以开发机缓存为证据。",
    metric: "replayable proof",
    evidence:
      "Unity 仓库必须保存源资产、项目设置、包配置和 .meta 身份；资源加载方案由寻址、更新、依赖、内存和平台边界决定；存档需要版本、校验、原子写入、备份和迁移；Addressables 等现代载体不改变可复原交付的核心问题",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc10SourceControlOtherTipsMapLab() {
  return (
    <UnityScriptingLab
      title="第 10 章 Source Control and Other Tips：资源与存档交付"
      chapter="Chapter 10 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc10SourceControlOtherTipsExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 10 章 Source Control and Other Tips：资源与存档交付"
      chapter="Chapter 10 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc10SourceControlOtherTipsEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 10 章 Source Control and Other Tips：资源与存档交付"
      chapter="Chapter 10 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
