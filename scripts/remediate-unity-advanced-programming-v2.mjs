#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "unity-advanced-programming";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/unity-advanced-programming-v2-profiles.json",
);
const INDEX = "https://www.cnblogs.com/ZhYQ-Note/articles/15493562.html";

const SOURCES = {
  index: INDEX,
  authorTag: "http://www.luzexi.com/tag/%E4%B9%A6%E7%B1%8D%E8%91%97%E4%BD%9C/",
  unity63: "https://unity.com/blog/unity-6-3-lts-is-now-available",
  unityExecution:
    "https://docs.unity3d.com/6000.3/Documentation/Manual/ExecutionOrder.html",
  unityUi:
    "https://docs.unity3d.com/6000.3/Documentation/Manual/UI-system-compare.html",
  unityProfiler:
    "https://docs.unity3d.com/6000.3/Documentation/Manual/profiling-target-device.html",
  unityManagedMemory:
    "https://docs.unity3d.com/6000.3/Documentation/Manual/performance-optimizing-code-managed-memory.html",
  unityRenderPipelines:
    "https://docs.unity3d.com/6000.3/Documentation/Manual/srp-setting-render-pipeline-asset.html",
  addressables:
    "https://docs.unity3d.com/Packages/com.unity.addressables@3.1/manual/MemoryManagement.html",
  aiNavigation:
    "https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/manual/index.html",
  dotnetList:
    "https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.capacity",
  dotnetDictionary:
    "https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2",
  csharpFloat:
    "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types",
  csharpEvents:
    "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/event",
  csharpConversions:
    "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/conversions",
  tcp: "https://www.rfc-editor.org/rfc/rfc9293.html",
  udp: "https://www.rfc-editor.org/rfc/rfc768.html",
  http: "https://www.rfc-editor.org/rfc/rfc9110.html",
};

const SOURCE_META = {
  index: [
    "第三方保存的原连载索引",
    "preserved-third-party-series-index-not-author-authorization",
    "核对第1至第8章与第10章的48个不重复主题、缺失第9章、错号与重复链接",
  ],
  authorTag: [
    "陆泽西旧站书籍著作标签入口",
    "author-site-historical-entry-point-currently-unstable",
    "标记作者站历史身份；不可访问状态不被当作正文证据",
  ],
  unity63: [
    "Unity 6.3 LTS官方发布说明",
    "vendor-current-lts-release-page",
    "冻结当前教学轨的编辑器主版本与LTS支持语境",
  ],
  unityExecution: [
    "Unity 6.3脚本生命周期手册",
    "vendor-versioned-manual",
    "核对PlayerLoop、事件函数和对象生命周期的当前边界",
  ],
  unityUi: [
    "Unity 6.3 UI系统比较",
    "vendor-versioned-ui-comparison",
    "核对uGUI、UI Toolkit与IMGUI在运行时和编辑器中的当前取舍",
  ],
  unityProfiler: [
    "Unity 6.3目标平台性能采集",
    "vendor-versioned-profiling-procedure",
    "限定性能结论必须来自目标Player与设备捕获，Editor只用于近似定位",
  ],
  unityManagedMemory: [
    "Unity 6.3托管内存优化",
    "vendor-versioned-memory-guidance",
    "核对托管分配、复用与垃圾回收的当前工作流",
  ],
  unityRenderPipelines: [
    "Unity 6.3活动渲染管线设置",
    "vendor-versioned-render-pipeline-manual",
    "核对Built-in、URP、HDRP、Render Pipeline Asset与兼容边界",
  ],
  addressables: [
    "Addressables 3.1内存管理",
    "vendor-versioned-package-manual",
    "核对加载/释放配对、引用计数、bundle卸载与资源抖动",
  ],
  aiNavigation: [
    "AI Navigation 2.0包手册",
    "vendor-versioned-package-manual",
    "核对NavMesh在编辑器与运行时的构建、动态障碍和链接能力",
  ],
  dotnetList: [
    ".NET `List<T>.Capacity`文档",
    "platform-api-reference",
    "核对Count、Capacity、扩容复制和显式容量设置的语义",
  ],
  dotnetDictionary: [
    ".NET `Dictionary<TKey,TValue>`文档",
    "platform-api-reference",
    "核对键值映射、比较器、容量与重新分配边界",
  ],
  csharpFloat: [
    "C#浮点数类型参考",
    "language-reference",
    "核对float、double、decimal的表示精度与用途边界",
  ],
  csharpEvents: [
    "C# event关键字参考",
    "language-reference",
    "核对事件的委托类型、订阅与发布者调用边界",
  ],
  csharpConversions: [
    "C#转换与装箱参考",
    "language-reference",
    "核对值类型装箱、堆分配与拆箱类型检查",
  ],
  tcp: [
    "RFC 9293 TCP",
    "internet-standard",
    "核对可靠字节流、连接状态与有序交付语义",
  ],
  udp: [
    "RFC 768 UDP",
    "internet-standard",
    "核对数据报、长度、校验和与不保证交付的边界",
  ],
  http: [
    "RFC 9110 HTTP Semantics",
    "internet-standard",
    "核对方法、状态码、字段、表示与缓存相关语义",
  ],
};

const PATHS = {
  "u3ap-unit-01": "01-language-architecture/u3ap-01-csharp-key-techniques",
  "u3ap-unit-02": "01-language-architecture/u3ap-02-architecture",
  "u3ap-unit-03": "02-data-ui/u3ap-03-data-tables",
  "u3ap-unit-04": "02-data-ui/u3ap-04-ui",
  "u3ap-unit-05": "03-assets-network/u3ap-05-models-animation",
  "u3ap-unit-06": "03-assets-network/u3ap-06-network-layer",
  "u3ap-unit-07": "04-rendering-ai/u3ap-07-rendering-graphics",
  "u3ap-unit-08": "04-rendering-ai/u3ap-08-ai",
  "u3ap-unit-09": "05-navigation/u3ap-10-map-pathfinding",
};

const EXPECTED_TOPIC_COUNTS = {
  "u3ap-unit-01": 6,
  "u3ap-unit-02": 3,
  "u3ap-unit-03": 3,
  "u3ap-unit-04": 8,
  "u3ap-unit-05": 7,
  "u3ap-unit-06": 6,
  "u3ap-unit-07": 8,
  "u3ap-unit-08": 3,
  "u3ap-unit-09": 4,
};

const COMMON_GATES = [
  [
    "来源与版本身份",
    "保存索引只限定结构；当前结论记录Unity、包、脚本后端、渲染管线和API文档版本。",
  ],
  [
    "目标Player与设备",
    "记录构建类型、平台、设备、系统、图形API、质量级别、分辨率和热/电源状态。",
  ],
  [
    "基线与单变量",
    "同一输入先建立稳定基线，每次只改变一个参数或注入一种故障并保存首个分岔。",
  ],
  [
    "撤销与同输入恢复",
    "清理资源、订阅、缓存和网络状态后，用同一输入恢复基线；无法恢复则拒绝发布。",
  ],
];

const SPECS = {
  "u3ap-unit-01": {
    question:
      "集合、浮点、委托事件、装箱与算法成本怎样从运行时状态而不是源码印象得到证据？",
    scenario:
      "在目标Player中对固定数据重放List扩容、Dictionary查找、float32舍入、事件订阅和算法计数",
    fault:
      "把Capacity当Count、改变键的相等语义、用精确相等比较浮点或在热路径隐式装箱",
    invariant:
      "结果语义不变，容量、比较、调用列表与分配都能由固定输入和运行时身份复算",
    artifact:
      "集合容量轨迹、键比较器、浮点误差样本、订阅表、分配捕获与算法操作计数",
    focus: "List、Dictionary、浮点表示、委托事件、装箱拆箱、排序与搜索前置条件",
    experiment: "language",
    sourceIds: [
      "index",
      "unity63",
      "unityProfiler",
      "unityManagedMemory",
      "dotnetList",
      "dotnetDictionary",
      "csharpFloat",
      "csharpEvents",
      "csharpConversions",
    ],
    stages: [
      [
        "冻结运行时",
        "Unity与脚本后端",
        "记录版本和构建",
        "运行时身份",
        "身份完整",
      ],
      [
        "建立语义基线",
        "固定集合和数值",
        "执行参考实现",
        "输出与操作轨迹",
        "结果正确",
      ],
      [
        "采集成本",
        "同一输入规模",
        "记录容量、分配和比较",
        "Profiler与计数",
        "成本可复算",
      ],
      [
        "注入边界",
        "容量阈值与舍入值",
        "只改变一个前提",
        "首个错误状态",
        "故障被拒绝",
      ],
    ],
  },
  "u3ap-unit-02": {
    question:
      "Unity项目架构怎样把依赖方向、生命周期、异步资源和团队所有权变成可检查合同？",
    scenario:
      "为配置、UI、资源、网络和玩法模块画真实依赖图并替换一个基础设施适配器",
    fault: "让领域模块直接持有场景对象、静态单例或未取消的异步句柄",
    invariant:
      "高层策略不依赖具体场景与传输实现，创建、取消、释放和销毁由同一边界负责",
    artifact: "模块所有权表、依赖图、生命周期时序、端口适配器与替换回归记录",
    focus: "架构价值、系统化思维、常见误区、前端边界与Unity项目依赖",
    experiment: "architecture",
    sourceIds: ["index", "unity63", "unityExecution", "unityProfiler"],
    stages: [
      ["枚举责任", "运行用例", "标注状态与所有者", "责任表", "无孤儿状态"],
      ["抽取依赖", "代码和场景引用", "画有向边", "依赖图", "方向可解释"],
      [
        "冻结生命周期",
        "加载至销毁",
        "标记创建取消释放",
        "时序图",
        "所有权闭合",
      ],
      ["替换适配器", "测试实现", "只换基础设施", "回归差分", "高层策略不变"],
    ],
  },
  "u3ap-unit-03": {
    question:
      "数据表与多语言怎样从编辑输入经过schema、生成、校验和版本迁移成为运行时合同？",
    scenario: "把同一批配置和本地化键生成确定性产物，注入重复主键与缺失占位符",
    fault: "允许重复主键、字段漂移、占位符不一致或缺失语言静默覆盖",
    invariant:
      "相同输入产生相同产物，主键唯一、引用可达、schema兼容且回退链显式",
    artifact: "schema、生成摘要、主外键报告、本地化覆盖矩阵、迁移与回退记录",
    focus: "数据表类型、制作流水线、schema演进、主外键与多语言回退",
    experiment: "data",
    sourceIds: ["index", "unity63", "unityProfiler"],
    stages: [
      ["冻结schema", "字段与类型", "生成版本化定义", "schema摘要", "版本唯一"],
      [
        "规范化输入",
        "策划表与语言表",
        "排序并标准化",
        "输入摘要",
        "同输入同摘要",
      ],
      [
        "执行校验",
        "主外键与占位符",
        "遍历全部记录",
        "错误清单",
        "错误阻断构建",
      ],
      [
        "加载Player",
        "确定性产物",
        "解析并查询",
        "运行时引用",
        "结果与构建报告一致",
      ],
    ],
  },
  "u3ap-unit-04": {
    question:
      "NGUI和早期uGUI的历史问题怎样迁移到Unity 6.3的uGUI、UI Toolkit与可测生命周期？",
    scenario:
      "在同一Player、分辨率和交互脚本下比较页面创建、事件路由、重建与关闭清理",
    fault: "重复订阅事件、把所有元素放在同一重建边界或用Editor帧率签发优化",
    invariant:
      "输入只路由一次，页面状态可恢复，关闭后无回调和资源残留，目标Player预算满足",
    artifact: "UI系统选择记录、事件路径、页面状态机、重建捕获、订阅与释放清单",
    focus: "NGUI/uGUI历史比较、uGUI组件与事件、源码边界、UI架构及三组优化主题",
    experiment: "ui",
    sourceIds: ["index", "unity63", "unityUi", "unityProfiler"],
    stages: [
      [
        "选择UI系统",
        "功能与团队约束",
        "按官方矩阵比较",
        "选择记录",
        "适用边界完整",
      ],
      [
        "重放输入",
        "固定点击与导航",
        "记录事件路由",
        "回调序列",
        "每次输入一次提交",
      ],
      [
        "捕获重建",
        "固定元素树",
        "改变一项脏状态",
        "CPU/GPU/批次捕获",
        "首个成本可定位",
      ],
      ["关闭页面", "已打开页面", "注销并释放", "订阅和资源计数", "回到基线"],
    ],
  },
  "u3ap-unit-05": {
    question:
      "资源、模型、动画与空间变换怎样用句柄、导入身份、矩阵和目标Player内存形成闭环？",
    scenario:
      "通过Addressables加载一组模型与纹理，验证骨骼层级和变换，再按句柄反向释放",
    fault: "丢失加载句柄、重复驻留依赖、改变骨骼根或混用局部与世界变换",
    invariant:
      "加载与释放配对，资产身份稳定，矩阵结果可复算，卸载后引用与内存回到允许区间",
    artifact: "资源依赖图、句柄账本、导入设置、骨骼与矩阵快照、Player内存捕获",
    focus: "资源加载释放、美术规范、模型合并以及四组模型空间变换主题",
    experiment: "assets",
    sourceIds: [
      "index",
      "unity63",
      "addressables",
      "unityProfiler",
      "unityRenderPipelines",
    ],
    stages: [
      [
        "冻结资产身份",
        "GUID与导入设置",
        "记录依赖和平台覆盖",
        "资产清单",
        "输入可重建",
      ],
      [
        "加载资源",
        "Addressables键",
        "保存操作句柄",
        "引用和依赖计数",
        "加载成功可追踪",
      ],
      [
        "验证模型",
        "骨骼与变换样本",
        "计算局部到世界",
        "矩阵和边界盒",
        "数值在容差内",
      ],
      [
        "反向释放",
        "句柄和实例",
        "销毁实例并Release",
        "内存与引用捕获",
        "无未知驻留",
      ],
    ],
  },
  "u3ap-unit-06": {
    question:
      "TCP、UDP、HTTP、数据协议与同步方案怎样从消息语义和故障模型推导，而不是按速度标签选择？",
    scenario: "用固定消息流分别注入分段、合并、丢包、乱序、重复、延迟与重连",
    fault: "把TCP读取当完整消息、把UDP当可靠通道、对非幂等HTTP操作盲目重试",
    invariant:
      "帧边界明确，序号和权威状态单调，重复可处理，超时重试不破坏业务语义",
    artifact:
      "消息schema、传输选择表、字节帧轨迹、故障矩阵、重连与权威同步回放",
    focus: "TCP/UDP选择与实现、HTTP封装、数据协议、权威状态和网络同步",
    experiment: "network",
    sourceIds: ["index", "unity63", "unityProfiler", "tcp", "udp", "http"],
    stages: [
      [
        "定义消息",
        "业务事件与状态",
        "写schema和幂等性",
        "消息目录",
        "语义唯一",
      ],
      [
        "选择传输",
        "可靠性与时效要求",
        "映射到字节流或数据报",
        "选择记录",
        "故障模型匹配",
      ],
      [
        "注入网络故障",
        "确定性消息流",
        "改变一种链路条件",
        "收发轨迹",
        "首偏离可定位",
      ],
      [
        "恢复权威状态",
        "重连客户端",
        "应用快照和增量",
        "状态摘要",
        "与服务器一致",
      ],
    ],
  },
  "u3ap-unit-07": {
    question:
      "图形学、渲染管线、采样、Shader变体与Projector迁移怎样由CPU/GPU捕获共同裁决？",
    scenario:
      "在冻结的Built-in、URP或HDRP Player上逐项改变批次、像素、采样和变体",
    fault: "只看Draw Call、用Editor帧率、混用管线Shader或让变体与采样无界增长",
    invariant:
      "画面基准一致，管线和Shader兼容，CPU与GPU瓶颈可定位，目标设备帧预算满足",
    artifact:
      "管线资产、画质基准、CPU/GPU捕获、批次与变体清单、Projector迁移差分",
    focus: "图形学基础、两组管线、三组渲染原理、MSAA、Shader编译和Projector",
    experiment: "rendering",
    sourceIds: ["index", "unity63", "unityRenderPipelines", "unityProfiler"],
    stages: [
      [
        "冻结渲染身份",
        "管线和质量资产",
        "记录API与Shader变体",
        "配置摘要",
        "可重建",
      ],
      [
        "建立画面基准",
        "固定相机和场景",
        "保存参考帧",
        "图像与容差",
        "画质一致",
      ],
      [
        "捕获CPU/GPU",
        "目标Player",
        "记录主线程渲染线程GPU",
        "帧捕获",
        "瓶颈明确",
      ],
      [
        "改变单变量",
        "批次像素采样或变体",
        "只改一项并重放",
        "差分捕获",
        "预算与画质均通过",
      ],
    ],
  },
  "u3ap-unit-08": {
    question:
      "FSM、行为树与非典型AI怎样让感知、决策、中断和动作可回放而不生成智能分数？",
    scenario: "对固定感知序列和随机种子重放状态机、行为树与一个并行决策方案",
    fault: "条件永真、状态无法退出、并行分支争用动作或随机种子未记录",
    invariant: "同输入和种子产生同决策轨迹，每次转换有原因，中断释放动作所有权",
    artifact: "黑板快照、状态/节点轨迹、动作所有权、随机种子、故障与恢复回放",
    focus: "有限状态机、行为树和非典型AI的组合、中断、并发与调试边界",
    experiment: "ai",
    sourceIds: ["index", "unity63", "unityProfiler"],
    stages: [
      ["冻结感知", "事件序列与种子", "记录输入时钟", "输入日志", "可重复"],
      ["执行决策", "旧状态和黑板", "求值状态或节点", "选择轨迹", "原因完整"],
      ["提交动作", "动作所有权", "执行或中断", "动作事件", "无双重所有者"],
      [
        "回放故障",
        "同一输入",
        "注入一个错误条件",
        "首个错误分支",
        "撤销后恢复",
      ],
    ],
  },
  "u3ap-unit-09": {
    question:
      "A*、NavMesh、地图编辑器与制作优化怎样把算法、生成数据、动态障碍和运行预算分开验收？",
    scenario:
      "从版本化地图生成网格与NavMesh，重放可达、不可达和动态障碍三类路径",
    fault:
      "启发式高估、地图版本不一致、路径提交后障碍变化或不可达结果被当空路径",
    invariant:
      "路径只经过可通行区域，起终点与地图版本一致，不可达显式返回，重规划有确定条件",
    artifact:
      "地图schema、A*开闭集轨迹、NavMesh构建记录、编辑器校验、设备预算捕获",
    focus:
      "A*与优化、寻路网格、地图编辑器、地图制作优化以及缺失第9章的结构边界",
    experiment: "navigation",
    sourceIds: ["index", "unity63", "aiNavigation", "unityProfiler"],
    stages: [
      [
        "冻结地图版本",
        "格点多边形与障碍",
        "生成摘要",
        "地图身份",
        "客户端一致",
      ],
      [
        "执行A*",
        "起点终点与启发式",
        "记录开闭集",
        "扩展轨迹",
        "路径成本可复算",
      ],
      [
        "构建NavMesh",
        "目标Agent参数",
        "编辑器或运行时构建",
        "构建报告",
        "区域和链接正确",
      ],
      [
        "注入动态障碍",
        "已提交路径",
        "改变一个阻挡",
        "重规划事件",
        "不可达显式",
      ],
    ],
  },
};

const MAP_SPEC = {
  question:
    "怎样在不复制原文的前提下，用57个正式坐标、双时间轨和目标Player证据重建整套主程能力？",
  scenario:
    "从保存索引逐项映射九个章根和48个主题，再为当前Unity 6.3轨分配版本、实验与捕获责任",
  fault:
    "把重复链接算成新主题、补造第9章、把旧API当当前推荐或用Editor结果签发性能",
  invariant:
    "57个坐标恰好覆盖一次，历史和当前陈述分轨，所有性能结论绑定目标Player与设备",
  artifact: "57坐标矩阵、索引异常表、版本包清单、章节实验路由与全书证据门",
  focus: "九个可验证章根、48个不重复主题、缺失第9章和Unity 6.3当前验证轨",
  experiment: "cross",
  sourceIds: [
    "index",
    "authorTag",
    "unity63",
    "unityUi",
    "unityProfiler",
    "addressables",
    "aiNavigation",
    "unityRenderPipelines",
  ],
  stages: [
    ["核对索引", "保存页面与链接", "去重并标异常", "48主题清单", "不补造第9章"],
    [
      "建立双轨",
      "历史标题和当前需求",
      "分开来源身份",
      "迁移差分",
      "不时代错置",
    ],
    ["路由证据", "九章责任", "分配实验与捕获", "证据矩阵", "57坐标全命中"],
    ["执行总门", "各章工件", "核对版本故障恢复", "全书报告", "未知项显式"],
  ],
};

const REVIEW_SPEC = {
  question:
    "整套主程链怎样证明配置、UI、资源、网络、渲染、AI与寻路在同一版本身份下可恢复？",
  scenario:
    "在固定Unity 6.3 Player场景中串联配置、UI、Addressables、同步、渲染、AI与寻路并逐章注错",
  fault: "跨章同时改变资源、网络和渲染配置，使首个分岔无法归因",
  invariant:
    "每次只注入一个故障，跨章相关ID一致，撤销后同一场景恢复状态、资源与设备预算",
  artifact: "全链运行清单、跨章ID、逐故障捕获、资源网络状态摘要与发布回归报告",
  focus: "语言成本、架构所有权、数据UI、资源网络、渲染AI与地图寻路的全链交接",
  experiment: "cross",
  sourceIds: [
    "index",
    "unity63",
    "unityUi",
    "unityProfiler",
    "addressables",
    "aiNavigation",
    "unityRenderPipelines",
    "tcp",
    "udp",
    "http",
  ],
  stages: [
    ["冻结构建", "Unity包平台配置", "生成身份摘要", "构建清单", "全链同版本"],
    [
      "运行基线",
      "确定性场景输入",
      "执行完整玩法链",
      "跨章轨迹",
      "状态与预算稳定",
    ],
    ["逐章注错", "九类故障计划", "每次只启用一个", "首个分岔", "归因唯一"],
    ["清理并回归", "基线输入", "释放重连重建", "回归摘要", "恢复且无残留"],
  ],
};

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/u)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join("");
}

function alphaIndex(index) {
  let value = index + 1;
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

function evidenceKey(index, profile) {
  return `UAP-${profile.role === "chapter" ? profile.officialUnitId?.toUpperCase() : profile.role.toUpperCase()}-${alphaIndex(index)}`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  const chapterSlug = path.basename(target);
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    ...spec,
    stages: spec.stages.map(([label, input, action, signal, check]) => ({
      label,
      input,
      action,
      signal,
      check,
    })),
    gates: COMMON_GATES.map(([label, detail]) => ({ label, detail })),
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为版本身份、真实状态、目标Player信号与恢复条件
- 只注入“${profile.fault}”，定位${profile.title}相对基线的首个分岔
- 交付${profile.artifact}，明确区分保存索引、历史机制与Unity 6.3当前轨

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 来源合同、索引异常与时代边界

${profile.title}以[第三方保存的连载索引](${INDEX})核对陆泽西（Jesse Lu）《Unity3D高级编程之进阶主程》的公开结构。保存页自述链接转载自作者博客并接受侵权删除，因此它是目录保存证据，不是作者授权、完整原文或正式出版物；作品无可核实ISBN，本站访问级别为outline-only。

${profile.title}的正式分母是9个章根加48个不重复文章主题，共57个坐标。保存索引的第4章小序号错乱，第5章区域误收一条第4章UI优化链接，并且没有第9章；本站去重错误链接、保留第10章原编号，不补造第9章，也不从文章标题臆造作者代码、图表或结论。

${profile.title}是中文独立教学重构。历史轨只解释连载标题所处的NGUI、早期uGUI、Projector和旧资源工作流问题；当前轨冻结Unity 6.3 LTS及页面注明的包版本，由Unity、Microsoft和IETF资料核对新陈述。当前结论不能倒灌成连载年代事实。

${profile.title}区分代数预算、Editor近似与发布证据：网页工作台只展示透明假设下的可复算计数；Editor用于快速定位；帧时、内存、批次、GPU、网络和热状态结论只能由记录完整身份的目标Player与设备捕获签发。

### 本页独立事实来源

${links}`;
}

function mechanismFor(concept, profile, index) {
  const label = concept.replaceAll(".", "·");
  const variants = [
    `${profile.title}先把${label}映射到“${profile.focus}”中的一个真实对象、所有者和输入，再记录状态转移及可观察信号。`,
    `${profile.title}对${label}分别写历史身份、Unity 6.3当前身份与迁移差分；接口同名不代表语义或成本未变。`,
    `${profile.title}用${label}建立基线和单变量反例，保存首个分岔、竞争性解释、撤销动作及同输入恢复。`,
    `${profile.title}把${label}连接到${profile.artifact}；缺少版本、Player、设备或原始捕获时只报告未知。`,
  ];
  return variants[index % variants.length];
}

function conceptsSection(profile) {
  return `## 57坐标体系中的逐项解释

${profile.concepts
  .map((concept, index) => {
    const label = concept.replaceAll(".", "·");
    const key = evidenceKey(index, profile);
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile, index)} ${profile.title}必须守住“${profile.invariant}”；保存索引只证明坐标存在，网页公式只证明计算透明，二者都不能替代目标版本中的运行证据。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作证据视图

${profile.title}先选择正式坐标、来源轨和Player平台，再调整可复算输入，最后逐阶段重放基线、单故障与恢复。三个视图分别回答“讨论的是哪个版本”“预算怎样算”“什么证据允许发布”。

<Stepper>
  <Step title="版本合同：选择坐标、时代轨与Player平台">
    <${profile.componentBase}VersionContractLab />
  </Step>
  <Step title="预算工作台：调整输入并复算状态">
    <${profile.componentBase}BudgetWorkbenchLab />
  </Step>
  <Step title="捕获门：重放基线、单故障与恢复">
    <${profile.componentBase}CaptureGateLab />
  </Step>
</Stepper>

${profile.title}的工作台对集合复制、依赖边、数据字节、UI脏元素、资源驻留、网络载荷、帧预算、AI节点或网格候选执行真实公式。它明确展示假设与单位，不生成综合性能分，也不把估算冒充Unity Profiler、Memory Profiler或GPU捕获。`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结Unity编辑器、包版本、脚本后端、渲染管线、平台、Player构建、设备、系统、图形API、分辨率、质量级别、输入数据和预期结果。
2. ${profile.title}在目标Player上运行参考路径，保存${profile.artifact}；基线状态或帧捕获不稳定时先停止，不用平均值和综合分掩盖波动。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个状态、资源、协议、渲染或路径分岔以及停止条件。
4. ${profile.title}撤销唯一故障，清理句柄、订阅、缓存、连接和场景状态，以同一输入重放；不能恢复“${profile.invariant}”就拒绝发布。

<Callout type="trap" title="${profile.title}误区一：保存索引等于作者授权正文">
${profile.title}的第三方索引只能限定9章48题；它明确是转载保存，不支持复制原文、源码、图片或把独立讲解冒充作者观点。
</Callout>

<Callout type="trap" title="${profile.title}误区二：旧Unity接口可直接作为当前建议">
${profile.title}保留NGUI、早期uGUI和Projector等历史问题，但当前实现必须按Unity 6.3、具体包版本、目标渲染管线与平台重新核对；第9章缺失也不能被新主题填空。
</Callout>

<Callout type="trap" title="${profile.title}误区三：Editor或代数模型能签发性能">
${profile.title}的Editor数据和网页公式只用于定位与预估；只有目标Player、设备身份、原始Profiler/GPU/网络捕获、单故障差分及同输入恢复完整时，才可发布性能结论。
</Callout>`;
}

function exerciseEntries(profile) {
  if (profile.role === "chapter") {
    return profile.concepts
      .map((concept, index) => ({ concept, index }))
      .slice(1);
  }
  return profile.concepts
    .map((concept, index) => ({ concept, index }))
    .filter(({ concept }) => /^第(?:[1-8]|10)章/u.test(concept));
}

function exercises(profile) {
  const entries = exerciseEntries(profile);
  const coordinateQuestions = entries
    .map(({ concept, index }, exerciseIndex) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${exerciseIndex + 1}：${concept}**

为${profile.title}的 ${key} 设计一个版本合同、目标Player基线、单变量故障、首个可观察信号和同输入恢复，并说明${label}的历史/当前边界。

<Answer>
${profile.title}先冻结Unity 6.3、包、脚本后端、渲染管线、平台、Player、设备和输入，把 ${key} 映射到真实对象、所有者与预期信号；只注入“${profile.fault}”。${profile.title}保存首个分岔并排除Editor噪声，撤销后重新满足“${profile.invariant}”。保存索引之外的原文、未测试平台和未捕获成本保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = entries.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么正式分母是57而不是补齐十章**

${profile.title}应怎样处理保存索引中的错号、重复链接和缺失第9章？

<Answer>
${profile.title}只计9个实际章根与48个不重复主题，共57个坐标。第4章错号只作为索引异常，第5章误收的UI链接去重；第10章保留原编号，第9章明确缺失。没有作者来源就不能用热更新、构建管线或其他合理主题填空。
</Answer>

**问题 ${start + 1}：什么时候只能报告估算或未知**

${profile.title}缺少哪些条件时不能声称“更快”“更省内存”或“更稳定”？

<Answer>
${profile.title}缺少版本、包、脚本后端、渲染管线、Player构建、目标设备、输入、原始捕获、稳定基线、单变量故障、首个分岔或同输入恢复中的关键一项时，只能报告明确假设下的估算或未知；Editor帧率、静态截图和综合分不能填补证据缺口。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "版本合同",
      `${profile.title}冻结Unity、包、脚本后端、渲染管线、平台与Player构建的身份记录`,
    ],
    [
      "历史轨",
      `${profile.title}保留连载标题与旧接口问题且不把当前结论倒写成作者观点的解释轨`,
    ],
    [
      "目标Player",
      `${profile.title}部署到目标平台并可连接Profiler的实际构建，而不是Editor Play Mode`,
    ],
    [
      "透明预算",
      `${profile.title}公开输入、公式、单位和遗漏项的可复算估算，不是设备测量`,
    ],
    [
      "首个分岔",
      `${profile.title}单故障轨迹相对目标Player基线最早出现状态或信号差异的位置`,
    ],
    [
      "同输入恢复",
      `${profile.title}撤销故障并清理残留后，以原版本、设备和输入重新满足基线的断言`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；这些术语指向来源、版本、运行对象和捕获，不生成成熟度、难度或性能综合分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核链：保存索引限定坐标，历史轨保留时代身份，Unity 6.3资料核对当前陈述，透明预算展示假设，目标Player捕获定位真实状态，单故障与同输入恢复决定能否发布。${profile.title}最终交付${profile.artifact}，并同时报告缺失第9章、授权边界、未测平台和未知项。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="陆泽西（Jesse Lu）在线连载《Unity3D高级编程之进阶主程》的第三方保存索引"
  adaptedUrl="${INDEX}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    experiment: profile.experiment,
    stages: profile.stages,
    gates: profile.gates,
  };
  return `"use client";

import {
  UnityAdvancedEvidenceLab,
  type UnityAdvancedEvidenceModel,
} from "@/components/mdx/unity-advanced-programming/v2/unity-advanced-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies UnityAdvancedEvidenceModel;

export function ${profile.componentBase}VersionContractLab() {
  return <UnityAdvancedEvidenceLab model={model} view="version-contract" />;
}

export function ${profile.componentBase}BudgetWorkbenchLab() {
  return <UnityAdvancedEvidenceLab model={model} view="budget-workbench" />;
}

export function ${profile.componentBase}CaptureGateLab() {
  return <UnityAdvancedEvidenceLab model={model} view="capture-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}VersionContractLab,
  ${profile.componentBase}BudgetWorkbenchLab,
  ${profile.componentBase}CaptureGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。${profile.title}先冻结来源、版本和Player环境，再记录真实对象与透明预算，最后用单故障和同输入恢复验收；只有守住“${profile.invariant}”并交付${profile.artifact}，旧文章标题或一次顺利运行才可能升级为可复核证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式坐标，用版本合同、透明预算和目标Player捕获交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: INDEX,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);

for (const unit of manifest.units) {
  const expected = EXPECTED_TOPIC_COUNTS[unit.id];
  if (!expected || !SPECS[unit.id] || !PATHS[unit.id]) {
    throw new Error(`缺少单元配置：${unit.id}`);
  }
  if (unit.concepts.length !== expected) {
    throw new Error(
      `${unit.id}主题组应为${expected}，实际${unit.concepts.length}`,
    );
  }
}

const articleTopics = manifest.units.reduce(
  (count, unit) => count + unit.concepts.length,
  0,
);
const allCoordinates = manifest.units.flatMap((unit) => [
  unit.title,
  ...unit.concepts.map((conceptGroup) => conceptGroup[0]),
]);
if (manifest.units.length !== 9) {
  throw new Error(`正式章根应为9，实际${manifest.units.length}`);
}
if (articleTopics !== 48) {
  throw new Error(`不重复文章主题应为48，实际${articleTopics}`);
}
if (allCoordinates.length !== 57) {
  throw new Error(`正式坐标应为57，实际${allCoordinates.length}`);
}
if (manifest.units.some((unit) => /^第9章/u.test(unit.title))) {
  throw new Error("保存索引没有第9章，禁止补造");
}
if (manifest.units.at(-1)?.title !== "第10章 地图与寻路") {
  throw new Error("最后一个可验证章必须保留为第10章");
}

const profiles = [
  enrich(
    "learningMap",
    "《Unity3D高级编程之进阶主程》57坐标证据学习地图",
    "00-guide/u3ap-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      unit.title,
      PATHS[unit.id],
      [unit.title, ...unit.concepts.map((conceptGroup) => conceptGroup[0])],
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《Unity3D高级编程之进阶主程》57坐标全书证据总复习",
    "06-review/u3ap-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 11) {
  throw new Error(`页面数量应为11，实际${profiles.length}`);
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  const spec = SPECS[unit.id];
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "outline-only";
  unit.factSourceIds = spec.sourceIds;
}
manifest.edition =
  "陆泽西（Jesse Lu）在线连载《Unity3D高级编程之进阶主程》，非正式出版物、无可核实ISBN；第三方保存索引仅含第1至第8章与第10章";
manifest.sourceKind =
  "preserved-third-party-series-index-not-author-authorization-plus-current-versioned-unity-microsoft-and-ietf-primary-sources";
manifest.sourceUrl = INDEX;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== INDEX,
);
manifest.status =
  "verified-57-coordinate-outline-only-independent-rewrite-unity-6-3-current-track";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为保存索引中的9个实际章根与48个不重复主题，共57个坐标。保存页是第三方转载索引，不是作者授权或原文；第4章小序号错乱，第5章区域误收一条第4章UI优化链接，且第9章完全缺失。本站去重错误链接、保留第10章，不补造第9章。历史NGUI、早期uGUI、Projector与旧资源工作流只在历史轨解释；当前轨冻结Unity 6.3 LTS、Addressables 3.1、AI Navigation 2.0及页面列出的版本化官方资料。网页预算只展示透明公式，性能结论必须由目标Player和设备捕获签发。";
manifest.unitMappingEvidence =
  "quality/unity-advanced-programming-v2-profiles.json";
manifest.factSourcePolicy =
  "第三方保存索引只限定9章48题，不能支持原文、源码、图片或作者结论。本站中文内容、反例、预算、实验和练习为独立重构；当前Unity、C#和网络事实分别由版本化Unity文档、Microsoft语言/API参考与IETF RFC核对。历史与当前轨分开，Editor近似和代数估算不能替代目标Player、设备与原始捕获。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 57,
  coveredFormalNodes: 57,
  coveragePercent: 100,
};
manifest.metrics = {
  preservedChapterRoots: 9,
  uniqueArticleTopics: 48,
  formalNodes: 57,
  preservedPublishedUnits: 9,
  missingChapter9: true,
  indexDuplicateLinksExcluded: 1,
  learningMapPages: 1,
  chapterPages: 9,
  finalReviewPages: 1,
  totalPages: 11,
  interactiveViews: 33,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "outline-only",
      originalEdition: "online-series-without-isbn",
      formalNodes: 57,
      preservedChapterRoots: 9,
      uniqueArticleTopics: 48,
      missingChapter9: true,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构11页、9个章根、48个主题、57个正式坐标与33个交互视图。");
