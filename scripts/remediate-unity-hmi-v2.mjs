#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "unity-hmi";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/unity-hmi-v2-profiles.json");
const SOURCES = {
  deck: "https://learn-private.cdn.u3d.cn/attachment/3428ceb8-cee1-4f76-91c9-8780105be137______________Unity__3D_________.pdf",
  hmi: "https://unity.com/solutions/human-machine-interface-hmi",
  sample: "https://marketplace.unity.com/packages/templates/packs/automotive-hmi-sample-201095",
  profiler: "https://docs.unity3d.com/Manual/Profiler.html",
  targetProfiling: "https://docs.unity3d.com/2022.2/Documentation/Manual/profiler-profiling-applications.html",
  embedded: "https://docs.unity3d.com/Manual/embedded-systems.html",
  graphics: "https://docs.unity3d.com/cn/2022.3/Manual/OptimizingGraphicsPerformance.html",
  drawCalls: "https://docs.unity3d.com/cn/current/Manual/optimizing-draw-calls.html",
};

function m(studio, boundary, axisA, levelsA, axisB, levelsB, fault, invariant, probe, signal, artifact, trap, practiceMode = "diagnosis") {
  return {
    studio,
    boundary,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    fault,
    invariant,
    probe,
    signal,
    artifact,
    trap,
    practiceMode,
  };
}

const MODELS = {
  "uhm-2024-official-learning-map": m("23页量产证据路线台", "演讲页 → 可验证主张 → 目标机试验 → 发布判断", "证据层次", ["原页", "官方交叉资料", "目标机记录"], "审查跨度", ["单页", "跨页依赖", "整车配置"], "把产品能力演讲直接视为本项目量产通过", "23页主张都保留页码、2024时点、适用配置和可推翻的目标机证据", "deck_pages: 1-23\nplatform_lock: soc+bsp+os+driver+runtime\nrelease_gate: correctness+latency+resources+recovery", "页码覆盖、配置指纹与发布门", "页码—主张—试验—结论账本", "把支持清单误读为无条件兼容矩阵", "design"),
  "uhm-2024-slide-01-cover": m("课程对象边界板", "Unity HMI主题 → 车载显示对象 → 非目标范围 → 交付责任", "显示对象", ["仪表", "中控", "附加屏"], "项目阶段", ["概念", "原型", "量产"], "把普通游戏UI教程包装成车载HMI课程", "受众、目标显示、信号边界和量产责任在进入后续页前明确", "audience: product+design+engineering\ndisplays: cluster+ivi+other\nnon_goals: generic-game-ui", "范围声明与非目标清单", "课程范围卡与责任矩阵", "封面标题本身不提供任何平台、性能或安全保证", "design"),
  "uhm-2024-slide-02-new-chapter": m("演讲坐标冻结台", "题名 → 讲者 → UNITE 2024 → 生成日期 → 版本注记", "时间坐标", ["演讲当日", "项目立项", "当前复核"], "主张类型", ["事实", "产品宣称", "工程假设"], "用2026年的产品页面无标记改写2024演讲", "每个后来更新都与演讲原始主张并列，时间和责任主体不混用", "event: UNITE-2024\nspeaker: 肖蓓蓓\npdf_created: 2024-08-01", "日期、讲者与主张版本", "材料身份卡与变更记录", "标题页只界定主题和主体，不能替代技术证据", "design"),
  "uhm-2024-slide-03-made-with-unity": m("证据类型分流台", "分隔页 → 采用案例 → 性能预算 → 平台与架构证据", "证据种类", ["展示", "统计", "可复现实验"], "结论强度", ["存在", "适用", "量产通过"], "用车型图片证明指定版本组合稳定", "展示材料只支持存在性，适用性和量产性必须补充配置与实验", "claim: Made-with-Unity\nevidence_class: showcase\nrequired_next: configuration+measurement", "展示证据等级与缺口", "主张分级表", "Made with Unity不等于本项目使用相同架构或达到相同性能", "design"),
  "uhm-2024-slide-04-production-evidence": m("采用数字核验台", "口径 → 分母 → 时间点 → 样本 → 可复核结论", "统计口径", ["车企", "合作厂商", "量产车型"], "核验状态", ["演讲原值", "外部交叉核对", "项目禁用外推"], "忽略分母和截止日期，把85%、35、68当成当前市场事实", "三组数字只在演讲的2024时点和原口径内陈述，不外推产品适用性", "claims: [85_percent, 35_oems, 68_models]\nas_of: UNITE-2024\nengineering_conclusion: none", "口径、时间戳与外推警告", "采用声明证据卡", "采用规模不能证明性能、安全或某一目标平台可部署", "diagnosis"),
  "uhm-2024-slide-05-beijing-auto-show": m("量产车型样本矩阵", "车展展示 → 车型身份 → SoC/OS → 显示拓扑 → 可验证样本", "样本粒度", ["车型名", "配置版本", "屏幕场景"], "证据环境", ["展车", "工程样车", "量产车"], "把同名车型或展台画面当成目标配置证据", "每个案例都标明车型、配置、数据来源和不能从展示推导的边界", "sample_id: vehicle+trim+build\nplatform: soc+bsp+os\ndisplays: resolution+role", "车型配置差异与证据来源", "车展样本矩阵", "现场可见效果无法证明冷启动、休眠恢复和长时稳定性", "design"),
  "uhm-2024-slide-06-model-performance-budget": m("8155场景预算台", "屏幕与场景 → 模型/材质 → CPU/GPU/带宽 → P95/P99帧时", "场景复杂度", ["图标", "车控模型", "高精展示"], "验证设备", ["编辑器", "开发板", "目标车"], "只改三角面数量，用平均FPS宣布优化完成", "固定8155示例配置与视觉验收后，CPU、GPU、内存、带宽和长尾同时不过界", "target_fps: 30\nframe_budget_ms: 33.3\ncapture: target-player-profiler+frame-debugger\npercentiles: [p50,p95,p99]", "主/渲染线程、GPU、峰值内存与画质差异", "目标机预算与捕获包", "演讲的三角面建议是起点，不是脱离分辨率与材质的通用阈值", "simulation"),
  "uhm-2024-slide-07-soc-os-compatibility": m("SoC—OS组合验收台", "SoC步进 → BSP/驱动 → OS镜像 → 图形API → Unity运行时", "平台组合", ["单SoC", "同SoC多OS", "跨SoC迁移"], "测试阶段", ["启动", "压力", "恢复"], "只看到芯片名和OS名都在列表中就宣称组合受支持", "每个组合使用供应商确认的版本坐标，并完成启动、显示、输入、压力和恢复", "platform_id: soc-revision+bsp+driver+os-image\ngraphics_api: GLES-or-Vulkan\nvalidation: boot+render+input+suspend", "组合通过率与首个失败层", "平台兼容矩阵", "两个分别受支持的名词不自动组成受支持配置", "diagnosis"),
  "uhm-2024-slide-08-architecture-combinations": m("座舱部署拓扑台", "SoC/VM → OS域 → 进程 → Surface → 合成显示", "部署拓扑", ["单域", "多域", "双SoC"], "跨域通道", ["信号", "图像", "输入"], "只画方框，不登记进程死亡和跨域超时语义", "每条显示与输入路径都有所有者、时限、降级和重连规则", "nodes: soc+os+process+surface\nedges: signal+frame+input\nfaults: process-exit+link-timeout", "端到端延迟与故障传播边界", "可执行部署拓扑", "架构组合数量不是隔离能力或资源效率的证明", "design"),
  "uhm-2024-slide-09-ecosystem": m("地图与伙伴依赖台", "SDK/数据许可 → 适配层 → 缓存 → HMI视图 → 安全降级", "伙伴状态", ["在线", "延迟", "不可用"], "数据模式", ["在线", "离线缓存", "受控兜底"], "地图或音画SDK退出后让关键驾驶信息一并消失", "第三方版本、许可、数据新鲜度、超时与安全兜底可独立验证", "dependency_lock: sdk+license+schema\nfaults: timeout+bad-data+offline\nfallback: safety-owned-channel", "数据时效、SDK错误与降级时刻", "伙伴依赖合同", "合作伙伴名单不等于已集成、已授权或已通过量产验收", "diagnosis"),
  "uhm-2024-slide-10-head-unit-edition": m("车机版进入条件板", "产品名 → 目标团队 → 支持平台 → 车辆信号 → 发布约束", "需求主体", ["产品", "设计", "研发"], "入口状态", ["概念说明", "平台确认", "项目基线"], "只因存在车机版名称就跳过目标平台商务与技术确认", "进入实现前冻结授权、运行时版本、目标平台、信号和显示合同", "owners: product+design+engineering\nplatform_confirmation: required\nsignal_contract: required", "进入条件完成度与责任缺口", "车机版立项门", "产品名称不等于特定项目已获得运行时、平台或支持承诺", "design"),
  "uhm-2024-slide-11-tuanjie-head-unit": m("团结引擎车机基线台", "2022 LTS基线 → 平台模块 → 项目定制 → 签名构建 → 目标机", "运行平台", ["Android", "QNX/Linux", "OpenHarmony"], "版本约束", ["引擎", "平台包", "BSP/驱动"], "把一次开发多平台部署理解为无需平台差异处理", "共享内容基线之外，每个平台的构建、图层、输入、诊断与回滚均单独验收", "engine_baseline: Unity-2022-LTS\nplatform_modules: locked\nartifacts: signed-build+symbols+rollback", "跨平台差异与构建可追溯性", "车机运行时基线包", "跨平台复用降低重复工作，但不会消除OS和驱动差异", "design"),
  "uhm-2024-slide-12-qnx-support": m("QNX目标机诊断台", "启动参数 → Screen图层 → 线程调度 → 触控 → slogger2/Profiler", "QNX能力", ["日志", "图层输入", "线程与分析"], "故障注入", ["错误参数", "Surface重建", "高负载"], "只在编辑器验证透明图层和多点触控", "目标QNX镜像上图层几何、输入坐标、线程策略、日志和恢复可复现", "capture: slogger2+target-profiler\nchecks: layer-rect+alpha+multitouch\nfaults: bad-args+surface-recreate", "QNX日志、线程、图层与触控记录", "QNX平台验收包", "功能清单不能替代目标镜像、图形栈和硬件组合测试", "diagnosis"),
  "uhm-2024-slide-13-embedded-linux-support": m("Embedded Linux集成台", "服务启动 → Wayland/显示层 → CPU亲和 → 看门狗 → 恢复", "Linux集成层", ["进程服务", "显示合成", "调度诊断"], "系统状态", ["冷启动", "压力", "重启恢复"], "用开发PC的Linux结果外推ARM目标板", "目标镜像上服务顺序、图层、线程、资源限制、日志和看门狗共同闭环", "image_id: os+bsp+graphics-stack\nservice: hmi-player\nchecks: boot+layer+affinity+watchdog", "启动时序、合成状态与系统日志", "Embedded Linux系统证据包", "同为Linux不代表ABI、窗口系统、驱动和实时行为一致", "diagnosis"),
  "uhm-2024-slide-14-tuanjie-engine": m("专有能力边界板", "团结引擎产品 → 公开材料 → 项目可见接口 → 未公开实现", "信息层次", ["演讲主张", "可用接口", "目标机行为"], "推理范围", ["名称", "合同", "实测"], "根据分隔页臆造团结引擎内部实现", "只描述公开可核对能力；内部机制未知时转为接口与行为测试", "public_claims: deck\ninternal_design: not-assumed\nverification: interface+behavior", "可知边界与未证实假设", "产品能力边界卡", "分隔页建立叙事章节，不提供内部架构细节", "design"),
  "uhm-2024-slide-15-uras-architecture": m("URAS服务边界台", "客户端 → View合同 → 后台渲染服务 → Surface → 系统合成器", "服务职责", ["注册", "调度", "资源回收"], "隔离对象", ["应用", "View", "显示设备"], "把URAS当作普通进程内UI组件", "跨进程/跨View的所有权、配额、错误和生命周期在服务合同中明确", "interfaces: register+resize+remove\nownership: client+view+surface\nquotas: gpu+memory+frame", "注册、调度、资源与生命周期事件", "URAS服务合同", "专有架构名称不能证明具体IPC、调度算法或安全等级", "design"),
  "uhm-2024-slide-16-uras-unified-rendering": m("统一渲染调度台", "多应用请求 → 单引擎调度 → 渲染目标 → 多屏合成", "并发View数", ["1", "3", "6"], "资源策略", ["平均共享", "优先级", "超限降级"], "一个客户端突发加载拖垮所有共享View", "共享服务在资源压力下维持关键View时限并隔离故障客户端", "clients: vehicle+adas+apa+music+map\npolicy: priority+quota\nfault: client-memory-spike", "各View帧时、配额、丢帧与恢复", "统一渲染调度记录", "减少引擎实例可能节省资源，但收益和耦合风险都需测量", "simulation"),
  "uhm-2024-slide-17-uras-view-isolation": m("View生命周期隔离台", "应用View → 注册 → Surface变化 → 多View → 退出/重连", "生命周期事件", ["创建", "尺寸变化", "销毁重建"], "客户端状态", ["健康", "卡顿", "退出"], "销毁Activity后遗留Surface和GPU资源", "任一View退出或重建不破坏其他View，资源在规定时限内回收", "events: attach+resize+detach\nassertions: owner+surface+input-route\nfault: kill-one-client", "存活View、资源回收与重连时间", "View隔离故障记录", "脱离Activity与同页多View是能力主张，隔离程度仍要用故障验证", "diagnosis"),
  "uhm-2024-slide-18-unity-china": m("组织主张责任台", "组织节点 → 产品责任 → 项目责任 → 支持升级路径", "责任主体", ["供应商", "集成方", "车企"], "证据类型", ["组织事实", "服务承诺", "项目交付"], "把组织介绍当作产品SLA或项目验收承诺", "每项能力陈述都映射到合同责任人、交付物和升级路径", "owners: vendor+integrator+oem\nartifacts: contract+support-plan+acceptance\nescalation: named", "责任空洞与升级闭环", "责任分配矩阵", "组织存在不能自动推出支持范围、响应时限或交付质量", "design"),
  "uhm-2024-slide-19-timeline": m("组织时间线核对台", "成立 → 进入中国 → 上市 → Unity中国成立 → 当前复核", "时间节点", ["2004", "2012/2020", "2022"], "事实类别", ["组织", "资本", "产品"], "把公司事件日期当成引擎功能发布日期", "四个组织节点保留原页语境，并与产品版本和技术发布分账", "timeline: [2004,2012,2020,2022]\ncategory: organization-or-capital\nproduct_dates: separate", "时间来源与类别冲突", "双轨时间线", "组织史只能解释主体变化，不能证明某时点已有具体HMI能力", "design"),
  "uhm-2024-slide-20-capability-foundation": m("HMI能力分层台", "应用创新 → 引擎创新 → 制作工具 → 平台适配 → 项目验收", "能力层", ["应用", "引擎/工具", "平台"], "成熟度", ["概念", "可集成", "目标机通过"], "把43个能力标签全部标成已量产", "每项能力都有层级、依赖、成熟度、负责人和目标机验收证据", "capability_record: name+layer+owner\nmaturity: concept+integrated+validated\ndependencies: explicit", "能力成熟度与依赖缺口", "43项能力分层矩阵", "能力地图表达范围，不表达每项能力的版本、许可和成熟度", "design"),
  "uhm-2024-slide-21-service-model": m("创新到ISS阶段门", "创新咨询 → PoC → 量产实施 → ISS迭代 → 团队接管", "合作阶段", ["创新", "实施", "迭代"], "退出门", ["可行性", "量产证据", "接管能力"], "PoC画面通过就直接进入量产交付", "每个阶段有输入、RACI、交付物、退出条件、遗留风险和下一责任人", "gates: innovation+implementation+iteration\nrequired: owner+artifact+exit-criteria\nhandover: runbook+training", "阶段门失败与遗留风险", "服务阶段验收包", "服务项目数量不能替代范围、工期、验收和知识转移合同", "design"),
  "uhm-2024-slide-22-innovation-scenarios": m("六类场景风险分级台", "用户意图/车辆信号 → 场景逻辑 → 视觉音频 → 显示设备 → 安全兜底", "场景族", ["车模/座舱", "地图/智驾", "OS/跨域"], "驾驶风险", ["驻车", "行驶非关键", "行驶关键"], "用炫酷动效遮挡或延迟关键驾驶信息", "60个场景逐项标注数据源、交互条件、显示设备、风险等级和失效表现", "scenario: intent+signals+display\nrisk: parked+noncritical+critical\nfaults: stale+missing+late", "信号时效、视觉优先级与降级效果", "60场景安全验收矩阵", "创新清单表达可能性，不等于驾驶中可用或符合安全要求", "design"),
  "uhm-2024-slide-23-evidence-closure": m("演讲证据出口台", "Thank you → 页码索引 → 未决问题 → 目标机证据 → 决策签署", "关闭状态", ["已核对", "待验证", "不适用"], "签署角色", ["产品", "平台", "质量"], "结束页之后仍保留无责任人的待验证主张", "全部主张有状态、证据、责任人和截止条件，不能验证者明确阻塞", "claims_total: 260\nstatus: verified+pending+not-applicable\nsignoff: product+platform+quality", "未决主张、阻塞责任与签署", "演讲证据关闭清单", "Thank you只结束材料，不会自动关闭工程证据", "diagnosis"),
  "uhm-2024-official-final-review": m("全材料量产答辩台", "23页主张 → 平台锁 → 场景预算 → 故障恢复 → 发布/回滚", "答辩域", ["来源", "架构性能", "韧性交付"], "决定", ["通过", "有条件通过", "退回"], "拼接不同构建的最好截图形成通过报告", "同一构建ID和配置下，260节点、性能长尾、故障恢复和责任签署完整", "bundle: source-map+platform-lock+captures\nfaults: signal+client+surface+memory\ndecision: pass+conditional+rollback", "构建一致性、证据完整度与回滚条件", "全材料发布证据包", "平均帧率、演示录像和无错误日志都不能单独构成量产通过", "diagnosis"),
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(path.join(dir, entry.name))
      : entry.name.endsWith(".mdx")
        ? [path.join(dir, entry.name)]
        : [],
  ).sort();
}

function pascal(value) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

function sourceUnitFor(slug) {
  return slug.includes("official-learning-map") || slug.includes("official-final-review")
    ? null
    : slug.replace(/^uhm-2024-slide-\d+-/, "uhm-2024-slide-") === slug
      ? slug
      : slug;
}

function evidenceAction(concept, index) {
  const slot = index + 1;
  if (/85%|35|68|统计|比例|数量|量产车型/i.test(concept)) return `证据槽${slot}先保存原页口径、分母和截止时间，再把“${concept}”限制为2024演讲陈述，禁止外推到项目性能与适用性`;
  if (/8155|三角|模型|贴图|CPU|GPU|性能|优化|渲染管线|URP|帧|减面/i.test(concept)) return `预算槽${slot}将“${concept}”绑定到目标SoC、分辨率、材质与捕获窗口，用Profiler和Frame Debugger比较P50/P95/P99、峰值和画质差异`;
  if (/QNX|Linux|Android|OpenHarmony|AliOS|MBOS|Flyme|SoC|高通|芯驰|英伟达|恩智浦|芯擎|联发科|瑞萨/i.test(concept)) return `平台槽${slot}把“${concept}”拆成芯片步进、BSP、驱动、OS镜像、图形API与运行时版本，并完成启动、压力、休眠恢复和回滚`;
  if (/URAS|后台渲染|View|应用|隔离|资源/i.test(concept)) return `服务槽${slot}为“${concept}”定义注册、Surface所有权、调度配额、输入路由和退出重连语义，再杀死单一客户端验证隔离`;
  if (/地图|Apple|腾讯|高德|Google|HERE|Mapbox|ICONA|TCL|WANOS|Dolby|伙伴|生态/i.test(concept)) return `依赖槽${slot}记录“${concept}”的SDK、许可、数据版本、超时与离线策略，并证明第三方失效时关键显示仍由受控通道提供`;
  if (/创新|PoC|项目|服务|培训|咨询|支持|实施|迭代|Workshop/i.test(concept)) return `交付槽${slot}把“${concept}”写成输入、RACI、产物、退出条件与遗留风险，未通过阶段门不得用演示效果代替量产交接`;
  if (/车模|座舱|地图导航|驾驶|泊车|HUD|交互|车控|车辆|充电|预警|灯光|空调|音频|音乐|天气|场景/i.test(concept)) return `场景槽${slot}为“${concept}”登记信号源、单位、时效、驾驶条件、显示设备与风险等级，并注入迟到、无效和断连验证降级`;
  if (/2004|2012|2020|2022|Unity中国|上市|成立/i.test(concept)) return `时间槽${slot}把“${concept}”归入组织、资本或产品事实，保留原页年份与主体，不与功能版本日期合并`;
  return `核对槽${slot}将“${concept}”拆为原页出现、工程解释、可操作验证和练习断言四级证据，并标明不能由该节点推出的结论`;
}

function nodeNote(concept, index, profile) {
  const closers = [
    `用${profile.model.signal}保存阳性与反例`,
    `把首个偏离定位到${profile.model.axisA.label}`,
    `复位后以同一配置重放${profile.model.invariant}`,
    `由另一位工程师按${profile.model.artifact}复核`,
    `对未能验证的部分登记阻塞而不补写推断`,
  ];
  return `${evidenceAction(concept, index)}；${closers[index % closers.length]}。`;
}

function profilesFor(manifest) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const fullPath = manifest.units.map((unit) => unit.title);
  return walk(CONTENT_ROOT).map((filePath, order) => {
    const source = fs.readFileSync(filePath, "utf8");
    const parsed = matter(source);
    const chapterSlug = path.basename(filePath, ".mdx");
    const sectionSlug = path.basename(path.dirname(filePath));
    const sourceUnitId = sourceUnitFor(chapterSlug);
    const unit = sourceUnitId ? units.get(sourceUnitId) : null;
    const concepts = unit ? unit.concepts.map((item) => item[0]) : fullPath;
    const model = MODELS[chapterSlug];
    if (!model) throw new Error(`缺少章专属模型：${chapterSlug}`);
    if (sourceUnitId && !unit) throw new Error(`manifest缺少单元：${sourceUnitId}`);
    const chain = chapterSlug.includes("official-final-review")
      ? ["核对来源", "冻结平台", "复现实验", "注入故障", "签署发布"]
      : ["锁定原页", "拆分主张", "配置目标", "执行反例", "归档决定"];
    const labConcepts = concepts.length > 1
      ? concepts
      : [concepts[0], `${parsed.data.title}的不能推出项`, `${parsed.data.title}的恢复证据`];
    return {
      filePath,
      sectionSlug,
      chapterSlug,
      order,
      title: String(parsed.data.title),
      description: String(parsed.data.description),
      type: String(parsed.data.type ?? "C"),
      sourceUnitId,
      concepts,
      labConcepts,
      chain,
      model,
      componentBase: pascal(chapterSlug),
    };
  });
}

function wrapper(profile) {
  const legacyBase = profile.componentBase.replace(/^Uhm2024/, "Uhm24");
  const props = {
    unitId: profile.chapterSlug,
    title: profile.title,
    concepts: profile.labConcepts,
    chain: profile.chain,
    model: profile.model,
  };
  return `import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}ScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }\nexport function ${profile.componentBase}DecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }\nexport function ${profile.componentBase}RecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }\n\n// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。\nexport const ${legacyBase}MapLab = ${profile.componentBase}ScopeLab;\nexport const ${legacyBase}ExperimentLab = ${profile.componentBase}DecisionLab;\nexport const ${legacyBase}EvidenceLab = ${profile.componentBase}RecoveryLab;\n`;
}

function render(profile) {
  const deep = profile.concepts.map((concept, index) => `### ${concept}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${nodeNote(concept, index, profile)}`).join("\n\n");
  const practices = profile.concepts.map((concept, index) => `${index + 1}. ${concept}：执行${evidenceAction(concept, index)}；以${index % 2 === 0 ? profile.model.signal : profile.model.artifact}断言结果。`).join("\n");
  const terms = [profile.model.boundary, profile.model.axisA.label, profile.model.axisB.label, profile.model.signal, profile.model.artifact].map((term, index) => ({
    term,
    definition: `${term}是${profile.title}连接${profile.chain[index]}与可推翻结论的页级坐标，记录页码、版本、输入、单位和责任主体。`,
  }));
  return `import { ${profile.componentBase}ScopeLab, ${profile.componentBase}DecisionLab, ${profile.componentBase}RecoveryLab } from "@/components/mdx/unity-hmi/diagrams/${profile.chapterSlug}";\nimport { Objectives, Callout, Glossary, GlossaryItem, Term, Exercises, Answer, Stepper, Step, Attribution } from "@/components/mdx/mdx-components";\n\n<Objectives>\n\n- 能说明${profile.title}全部${profile.concepts.length}个正式节点在原演讲中的范围、2024时点和不能推出项\n- 能运行“${profile.model.studio}”，一次只改变${profile.model.axisA.label}或${profile.model.axisB.label}\n- 能把演讲主张转换为目标SoC、OS、驱动、运行时、显示拓扑和场景条件下的可复核任务\n- 能注入“${profile.model.fault}”，复位后证明“${profile.model.invariant}”\n\n</Objectives>\n\n{/* UNITY_HMI_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}位于“${profile.model.boundary}”这条证据链上。演讲页可以界定主张与2024年的叙事坐标，却不能替目标项目证明平台兼容、性能、安全、稳定性或支持承诺；${profile.model.studio}把这些不同责任拆开。\n\n${profile.title}固定演讲页码、目标SoC与步进、BSP/驱动、OS镜像、Unity运行时、显示拓扑、场景输入和构建ID，只改变${profile.model.axisA.label}或${profile.model.axisB.label}。图中只呈现本页真实对象、连接与状态变化；高亮表示当前分析路径，不冒充真实帧时、资源用量或安全认证。\n\n## 来源、授权与时间边界\n\n${profile.title}以Unity中国肖蓓蓓在UNITE 2024的[23页公开演讲稿](${SOURCES.deck})为完整范围来源；PDF元数据为2024年8月1日。材料可公开读取，但未发现允许复制其插图与版式的授权，因此本站只保留必要的页级主题和短标签，解释、实验、图示与答案均为独立教学重写。\n\n${profile.title}用Unity当前[HMI与嵌入式系统说明](${SOURCES.hmi})、[Automotive HMI Sample](${SOURCES.sample})、[Profiler手册](${SOURCES.profiler})、[目标平台采集指南](${SOURCES.targetProfiling})、[Embedded Systems手册](${SOURCES.embedded})、[图形性能基础](${SOURCES.graphics})与[Draw Call说明](${SOURCES.drawCalls})交叉核验工程方法。当前资料只能说明今天的产品与工具边界，不能追溯改写2024演讲，也不能替代特定许可和平台组合确认。\n\n## 本页独有合同与操作记录\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${term}</Term>`).join("、")}。\n\n${profile.title}的通过不变量是“${profile.model.invariant}”。记录包必须包含页码、主张类别、配置指纹、构建ID、目标机、输入数据、操作步骤、P50/P95/P99或适用离散结果、原始日志/截图、失败注入、恢复时刻、责任人和回滚条件。\n\n以下页级实验清单是起点；把示例值换成项目真实配置，先写预期，再执行和复位：\n\n\`\`\`yaml\n${profile.model.probe}\n\`\`\`\n\n<Callout type="warning" title="驾驶显示与目标机边界">${profile.title}涉及车辆信号、驾驶中显示、系统线程、进程终止、内存压力或目标机调试时，只能在台架、仿真环境或获准车辆上执行；先定义安全兜底、资源上限、停止条件和数据脱敏。</Callout>\n\n## 先预测，再操作三层页级实验\n\n<Stepper>\n  <Step title="1. 原页—工程范围">选择正式节点，标出原页主张、不能推出项与补证责任。<${profile.componentBase}ScopeLab /></Step>\n  <Step title="2. 单变量决策">固定构建和平台，只切换${profile.model.axisA.label}或${profile.model.axisB.label}。<${profile.componentBase}DecisionLab /></Step>\n  <Step title="3. 故障—恢复—复位">注入“${profile.model.fault}”，恢复后清空派生证据并同条件重放。<${profile.componentBase}RecoveryLab /></Step>\n</Stepper>\n\n## 原演讲节点逐项深读\n\n${deep}\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="演讲主张不等于项目证明">${profile.title}只在原页语境和2024时点内引用能力、数字与名单；支持、可部署、量产、性能和安全是不同命题，必须分别给出配置、合同或实验。</Callout>\n\n<Callout type="trap" title="本页专属失败样本">${profile.title}主动触发“${profile.model.trap}”，再注入“${profile.model.fault}”。若${profile.model.signal}没有预期变化，先验证采集链路和阳性对照，不得挑选最好的一次运行。</Callout>\n\n<Callout type="trap" title="目标机优先于编辑器">Unity Editor可用于缩小问题，但${profile.title}的帧时、内存、图层、输入和恢复结论必须来自目标构建；不同硬件、分辨率、驱动或采集方式的结果不能拼接。</Callout>\n\n## 练习、答案与节点验证\n\n<Exercises>\n\n**问题1：单变量。** 如何隔离${profile.model.axisA.label}对${profile.model.signal}的影响？\n\n<Answer>${profile.title}固定页码解释、构建ID、目标平台、场景输入、${profile.model.axisB.label}和采集窗口，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；保存原始证据和资源代价，再按重置键确认初始状态可复现。</Answer>\n\n**问题2：四级覆盖。** 怎样证明本页${profile.concepts.length}个正式节点不是标题搬运？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题3：恢复闭环。** 怎样证明“${profile.model.fault}”已经被修复？\n\n<Answer>${profile.title}沿${profile.chain.join("、")}找到第一处偏离，只改最小因果条件；删除旧截图、缓存指标和派生日志后，以相同输入和构建重跑，直到“${profile.model.invariant}”恢复且${profile.model.artifact}可由产品、平台与质量三方复核。</Answer>\n\n</Exercises>\n\n<Glossary>\n${terms.map(({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`).join("\n")}\n</Glossary>\n\n<Attribution mode="independent-rewrite" sourceBasis="full-text" workTitle="肖蓓蓓《Unity for HMI：未来已来，Unity开启3D座舱新篇章》（UNITE 2024演讲稿）" adaptedUrl="${SOURCES.deck}" />\n`;
}

function updateManifest(manifest, profiles) {
  const outlineNodes = manifest.units.reduce((sum, unit) => sum + unit.concepts.length, 0);
  manifest.sourceKind = "public-full-official-unite-2024-presentation-plus-current-official-unity-engineering-references";
  manifest.status = "verified-public-full-presentation-independent-rewrite";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "public-full-presentation";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 23, outlineNodes, pages: 25 };
  manifest.disclosureNote = "Unity中国官方CDN公开的23页UNITE 2024演讲稿作为完整范围来源，PDF元数据为2024-08-01；未发现允许复制插图与版式的授权。课程只保留必要页级主题与短标签，教学解释、交互、图示、实验和答案独立重写。演讲时点数字、支持列表和专有架构主张不外推为当前产品或目标项目保证；以Unity当前HMI、Embedded Systems、Profiler、目标平台采集、图形性能和Draw Call官方资料复核工程方法。";
  manifest.factSourcePolicy = "每个演讲节点必须有原页出现、主张边界解释、页级实验或设计判断、练习断言四级证据；公开演讲、当前产品说明、许可支持与目标机验证不得互相替代。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    deck: { kind: "official-public-full-presentation", label: "Unity中国UNITE 2024《Unity for HMI》23页演讲稿", url: SOURCES.deck },
    hmi: { kind: "official-current-product-boundary", label: "Unity HMI与嵌入式系统说明", url: SOURCES.hmi },
    sample: { kind: "official-current-sample", label: "Automotive HMI Sample", url: SOURCES.sample },
    profiler: { kind: "official-tool-documentation", label: "Unity Profiler手册", url: SOURCES.profiler },
    targetProfiling: { kind: "official-target-profiling-guidance", label: "目标平台性能采集指南", url: SOURCES.targetProfiling },
    embedded: { kind: "official-embedded-platform-documentation", label: "Embedded Systems手册", url: SOURCES.embedded },
    graphics: { kind: "official-graphics-performance-guidance", label: "图形性能基础", url: SOURCES.graphics },
    drawCalls: { kind: "official-rendering-guidance", label: "Draw Call说明", url: SOURCES.drawCalls },
  };
  const byUnit = new Map(profiles.filter((profile) => profile.sourceUnitId).map((profile) => [profile.sourceUnitId, profile]));
  for (const unit of manifest.units) {
    const profile = byUnit.get(unit.id);
    if (!profile) throw new Error(`manifest单元缺页：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = "public-full-presentation";
    unit.factSourceIds = ["deck", "hmi", "sample", "profiler", "targetProfiling", "embedded", "graphics", "drawCalls"];
  }
}

const root = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = root.books[BOOK];
const profiles = profilesFor(manifest);
if (profiles.length !== 25) throw new Error(`应有25页，实际${profiles.length}`);
fs.writeFileSync(PROFILE_PATH, `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: profiles.map((profile) => ({ ...profile, filePath: path.relative(ROOT, profile.filePath) })) }, null, 2)}\n`);
for (const profile of profiles) {
  const parsed = matter(fs.readFileSync(profile.filePath, "utf8"));
  const data = {
    ...parsed.data,
    description: `${profile.description.replace(/\s*(?:覆盖\d+个正式节点，并用平台矩阵、预算实验和目标机证据复核。|本页覆盖\d+个正式节点，以页级决策实验、故障恢复和目标机证据验收。)\s*$/, "")} 本页覆盖${profile.concepts.length}个正式节点，以页级决策实验、故障恢复和目标机证据验收。`,
    qualityVersion: 2,
    practiceMode: profile.model.practiceMode,
    sourceMode: "independent-rewrite",
    sourceUrl: SOURCES.deck,
  };
  fs.writeFileSync(profile.filePath, matter.stringify(render(profile), data));
  fs.writeFileSync(path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`), wrapper(profile));
}
updateManifest(manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(root, null, 2)}\n`);
console.log(`已重构25页、23个正式单元、${manifest.coverage.outlineNodes}个演讲节点。`);
