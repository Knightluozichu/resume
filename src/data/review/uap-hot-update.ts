import type { ReviewQuestion } from "./types";

export const uapHotUpdateQuestions: ReviewQuestion[] = [
  {
    id: "uap-hot-update-1",
    chapter: "uap-hot-update",
    level: 1,
    question: `为什么 iOS 上不能直接用 JIT 热更新 C# 代码？`,
    answer: `iOS 禁止进程动态生成可执行机器码（W^X 保护）。C# 的 JIT 需要把 IL 编译为机器码后执行，被 iOS 沙箱拦截。所以纯 C# 热更新必须用解释器（ILRuntime/HybridCLR 解释模式），或用 Lua（Lua 本身是解释执行的虚拟机）。资源热更新不受此限制，只有代码热更新受 iOS JIT 禁令约束。`,
    tags: ["iOS", "JIT", "热更新限制"],
  },
  {
    id: "uap-hot-update-2",
    chapter: "uap-hot-update",
    level: 2,
    question: `xLua、ILRuntime、HybridCLR 三种热更方案各有什么优缺点？`,
    answer: `xLua：Lua 生态成熟、稳定，但需学两门语言、跨语言调用有开销。ILRuntime：纯 C# 热更、无需学新语言，但解释执行性能只有原生 1/5-1/10、GC 压力大，适合轻量热更。HybridCLR：Unity 2022+ 原生方案，AOT+解释混合，热更代码几乎原生性能、无需学新语言，是当前推荐方案，但要求 Unity 版本较新。选型：新项目+Unity2022+→HybridCLR；老项目+已有 Lua→xLua；轻量热更→ILRuntime。`,
    tags: ["xLua", "ILRuntime", "HybridCLR", "方案对比"],
  },
  {
    id: "uap-hot-update-3",
    chapter: "uap-hot-update",
    level: 3,
    question: `HybridCLR 相比 ILRuntime 的核心优势是什么？原理是什么？`,
    answer: `核心优势是性能接近原生（ILRuntime 只有原生 1/5-1/10）。原理：HybridCLR 把 C# 分两类——AOT 部分（主包，提前编译为原生机器码）和热更部分（DLL，运行时加载）。热更部分的 IL 不走 JIT（iOS 不允许），而是由 HybridCLR 解释器解释执行，但通过补充 AOT 元数据，让热更代码能调用 AOT 代码的泛型和方法，减少跨域开销。本质是「AOT+解释器混合」，兼顾原生性能和热更能力。`,
    tags: ["HybridCLR", "原理", "性能"],
  },
  {
    id: "uap-hot-update-4",
    chapter: "uap-hot-update",
    level: 4,
    question: `设计一套完整的热更新流程，从版本比对到加载执行。`,
    answer: `1）版本比对：客户端请求服务器版本号（version.json），比对本地版本；2）下载差异：只下载变化的文件，增量更新用 BSDiff/HDiffPatch 生成补丁包，减少下载量；3）校验完整性：每个文件 MD5 校验，防止下载损坏或被篡改；4）加载执行：Lua 走 LuaEnv 加载脚本，ILRuntime 走 AppDomain 加载 DLL，HybridCLR 走 Assembly.Load + 补充元数据；5）资源热更新并行：用 Addressables/AssetBundle 下载新资源，与代码热更配合；6）失败回滚：下载或校验失败回退到旧版本，不破坏可玩性。代码热更修逻辑 Bug，资源热更推新内容。`,
    tags: ["热更新流程", "增量更新", "综合"],
  },
];
