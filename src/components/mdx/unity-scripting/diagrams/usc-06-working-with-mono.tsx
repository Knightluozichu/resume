import {
  UnityScriptingLab,
  type UnityScriptingSnapshot,
} from "./official-scripting-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 6 权威边界",
    action:
      "官方目录为 Lists and collections、IEnumerable and IEnumerator、Strings and regular expressions、Infinite arguments、Language Integrated Query、Linq and regular expressions、Working with Text Data Assets、Text Assets - loading from the local files。原章强调 Mono 类库的实际组合，而非 Unity 组件 API。",
    metric: "5 groups",
    evidence:
      "https://www.packtpub.com/en-us/product/mastering-unity-scripting-9781784390655 + https://subscription.packtpub.com/book/game-development/9781784390655/pref/preflvl1sec02/what-this-book-covers",
    boundary: "目录覆盖必须继续落到实验和失败重放。",
  },
  {
    label: "模型",
    stage: "数据形状、访问模式与物化成本",
    action:
      "List 提供顺序和索引，Dictionary 用键换取快速查找，Stack 表达后进先出；IEnumerable 暴露延迟序列，IEnumerator 保存遍历状态。正则把文本模式变成匹配器，params 接受可变数量参数，LINQ 组合过滤、映射、排序与聚合，但 ToList/ToArray 会物化结果，闭包和迭代器可能分配。TextAsset 随资源导入，本地文件则受路径、编码和平台权限约束。",
    metric: "producer -> consumer",
    evidence:
      "Lists and collections；IEnumerable and IEnumerator；Strings and regular expressions",
    boundary:
      "延迟查询捕获的是数据源和规则，不是创建查询时的结果快照；源集合变化会改变后续枚举。",
  },
  {
    label: "实验",
    stage: "选择集合结构",
    action:
      "为顺序遍历、按 ID 查找和撤销历史分别实现 List、Dictionary、Stack，记录操作复杂度和错误边界。",
    metric: "single variable",
    evidence: "IEnumerable<Enemy> Alive(IEnumerable<Enemy> source) {",
    boundary: "同时改变多个输入会失去因果归属。",
  },
  {
    label: "失败",
    stage: "构建文本管线",
    action:
      "从 TextAsset 读取配置，用正则提取字段，验证重复键、空值、编码和错误行，再与本地文件路径加载比较。",
    metric: "normal / edge / failure",
    evidence:
      "延迟查询捕获的是数据源和规则，不是创建查询时的结果快照；源集合变化会改变后续枚举。；Application.dataPath 在构建平台不等同可写目录，本地文件访问还受沙箱、打包和编码限制。",
    boundary:
      "现代 Unity 的 .NET Profile、IL2CPP、Span 支持与平台文件系统已变化，但集合选择、延迟执行、物化和文本验证仍是核心。StreamingAssets、persistentDataPath、Addressables 或网络资源应按只读/可写、同步/异步和平台路径重新设计；TextAsset 仍适合随项目导入的小型静态文本。",
  },
  {
    label: "验收",
    stage: "Chapter 6 证据包",
    action:
      "验收包含三种集合用例、循环与 LINQ 的结果和分配对照、延迟查询源变化、正则成功与错误行、TextAsset 与目标平台路径。热路径结论必须来自 Profiler，而不是笼统宣称 LINQ 快或慢。",
    metric: "replayable proof",
    evidence:
      "集合类型应由访问模式和数据规模决定；IEnumerable 与 LINQ 可能延迟执行，物化决定快照和分配；正则和文本资产要建立编码、格式与错误位置证据；现代平台路径和运行时后端改变载体，不改变数据管线责任",
    boundary: "没有固定输入和失败样本的成功截图不能签发。",
  },
] as const satisfies ReadonlyArray<UnityScriptingSnapshot>;

export function Usc06WorkingWithMonoMapLab() {
  return (
    <UnityScriptingLab
      title="第 6 章 Working with Mono：集合、迭代、文本与 LINQ"
      chapter="Chapter 6 · Mastering Unity Scripting"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Usc06WorkingWithMonoExperimentLab() {
  return (
    <UnityScriptingLab
      title="第 6 章 Working with Mono：集合、迭代、文本与 LINQ"
      chapter="Chapter 6 · Mastering Unity Scripting"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Usc06WorkingWithMonoEvidenceLab() {
  return (
    <UnityScriptingLab
      title="第 6 章 Working with Mono：集合、迭代、文本与 LINQ"
      chapter="Chapter 6 · Mastering Unity Scripting"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
