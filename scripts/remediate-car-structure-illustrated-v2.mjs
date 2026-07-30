import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "car-structure-illustrated";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/car-structure-illustrated/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/car-structure-illustrated-v2-profiles.json",
);

const SOURCES = {
  chinesePublisher: "https://www.tohan.com.tw/product.php?act=view&id=7469",
  retailer: "https://www.books.com.tw/products/0010965781",
  originalPublisher: "https://gihyo.jp/book/2015/978-4-7741-7314-6",
  library:
    "https://ndlsearch.ndl.go.jp/books/R100000002-I026370119",
  manufacturing: "https://global.toyota/en/company/plant-tours/",
  electric: "https://afdc.energy.gov/fuels/electricity-basics",
  safety:
    "https://www.nhtsa.gov/vehicle-safety/driver-assistance-technologies",
  automation: "https://www.nhtsa.gov/vehicle-safety/automated-vehicles-safety",
};

const PATHS = {
  learningMap: "00-map/csi23-official-learning-map",
  "csi23-book-guide": "01-book-guide/csi23-book-guide",
  "csi23-prologue": "02-prologue/csi23-prologue",
  "csi23-01-vehicle-structure":
    "03-01-vehicle-structure/csi23-01-vehicle-structure",
  "csi23-02-production": "04-02-production/csi23-02-production",
  "csi23-03-eco-cars": "05-03-eco-cars/csi23-03-eco-cars",
  "csi23-final-future": "06-final-future/csi23-final-future",
  "csi23-index": "07-index/csi23-index",
  finalReview: "08-review/csi23-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《汽车构造&知识全图解》65节点学习地图",
    duty: "以65个正式目录节点组织读图、整车构造、生产、环保车型与未来社会",
    question:
      "怎样从使用方法走到未来汽车，而不把零件、制造工序和能源路线混成一张清单？",
    invariant: "七个正式单元各有唯一课程归属，65个节点都进入解释、视觉和练习",
    fault: "把原书七单元改造成自创五阶段，遗漏生产方式和终章社会边界",
    scenario:
      "学习者要为一辆城市通勤车建立从目录定位、结构拆解、制造来源到能源与主动安全的完整证据册。",
    stages: ["核对65节点分母", "追踪结构与制造", "比较能源与未来边界"],
    topology: ["阅读入口", "整车结构", "制造过程", "环保车型", "未来社会"],
    technicalSources: [
      SOURCES.manufacturing,
      SOURCES.electric,
      SOURCES.safety,
    ],
    artifact:
      "65节点映射、七单元学习顺序、系统路径图、制造质量门、能源比较和未来技术边界。",
    opening:
      "学习地图先把原书的使用方法、序章、三章、终章与索引恢复成七个正式单元，再为每个节点指定结构、过程或社会系统的观察任务。",
    teachingConcepts: null,
  },
  "csi23-book-guide": {
    duty: "把跨页图解读成对象、连接、能量或信息方向以及安全边界",
    question: "怎样用四遍读图法复原一个汽车主题，而不是只看零件标签？",
    invariant: "每条连线都说明传递对象、方向、状态变化和适用工况",
    fault: "看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号",
    scenario:
      "读者面对发动机剖面、传动布局与电装示意三类图，需要用同一张结构卡记录图中可见信息和不能从图中直接推出的主张。",
    stages: ["识别对象与视角", "追踪连接和状态", "补充边界与复核"],
    topology: ["对象", "上游输入", "内部转换", "下游输出", "保护边界"],
    technicalSources: [SOURCES.originalPublisher],
    artifact:
      "图解坐标、对象清单、方向箭头、状态变化、图外假设、安全边界与复述检查。",
    opening:
      "使用方法页不替原书插画制作文字拷贝，而是训练可迁移的读图协议：先辨认视角和对象，再追一条路径，最后声明图中没有提供的条件。",
    teachingConcepts: [
      "图解坐标",
      "观察视角",
      "连接方向",
      "状态变化",
      "图外假设",
      "安全边界",
    ],
  },
  "csi23-prologue": {
    duty: "用历史、零件、驱动布置、动力源和车体风格建立整车分类坐标",
    question:
      "怎样区分发动机位置、驱动轮、动力源和车体用途，避免用一个标签推断全部性能？",
    invariant: "分类轴分别记录，任何性能判断都附带车型、工况和时代范围",
    fault: "只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性",
    scenario:
      "四辆外形相近的城市车采用不同动力源和驱动布置，学习者要解释哪些差异来自拓扑，哪些必须查实车参数。",
    stages: ["建立历史与用途背景", "分离四条分类轴", "验证标签的推断边界"],
    topology: ["时代需求", "部件集合", "动力源", "驱动布置", "车体用途"],
    technicalSources: [SOURCES.originalPublisher],
    artifact:
      "车型时代、用途、动力源、发动机或电机位置、驱动轮、关键部件和不可由分类直接推出的属性。",
    opening:
      "序章的价值是建立整车坐标，而非背诵年代；历史需求改变材料、能源、布置和安全约束，但同一时期也可能并存多种方案。",
  },
  "csi23-01-vehicle-structure": {
    duty: "沿动力产生、转矩传递、路面作用、车身承载、电装控制和主动安全拆解整车",
    question:
      "怎样从燃料或电源追到车轮、转向和制动执行器，并标出损失、反馈与保护支路？",
    invariant: "每个部件都能说明输入、转换、输出、接口和故障影响",
    fault: "只按零件所在位置分组，导致能量路径、控制回路和车身载荷路径彼此断开",
    scenario:
      "一辆前置动力城市车出现加速无力与制动警告，学习者只做离线模型，不进行实车拆装，要从系统路径区分两个现象。",
    stages: ["建立动力与能量主链", "连接底盘车身和电装", "注入边界故障并定位"],
    topology: ["动力源", "变速与传动", "轮胎悬架转向", "车身舾装", "电装与安全"],
    technicalSources: [SOURCES.safety],
    artifact:
      "能量路径、转矩与转速、机械接口、电源与信号回路、载荷路径、保护动作和第一异常节点。",
    opening:
      "汽车构造页按路径而非空间位置组织31个目录节点：发动机与变速器产生并变换动力，底盘把作用传给路面，车身承担载荷，电装和安全系统闭合控制。",
  },
  "csi23-02-production": {
    duty: "把冲压、焊接、涂装、组装、副线和成车检验串成可追溯制造流程",
    question:
      "怎样为每道工序声明输入、状态变化、质量门和不合格回退？",
    invariant: "终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序",
    fault: "把终检当作创造质量的步骤，忽略缺陷已在前序工序形成",
    scenario:
      "一批车出现车门间隙超差和漆面问题，学习者要从主线与副线汇合点回溯，而不是在终检末端重复挑选。",
    stages: ["车体成形与连接", "表面处理与总装", "副线汇合及终检"],
    topology: ["冲压", "焊接", "涂装", "组装", "检验与出厂"],
    technicalSources: [SOURCES.manufacturing],
    artifact:
      "工序流程、输入批次、关键特性、测量位置、质量门、返修或隔离路径和成车检验记录。",
    opening:
      "生产方式页把质量看作过程累积：冲压决定几何基础，焊接建立车体连接，涂装形成保护表面，总装汇合主线副线，终检验证而非补造质量。",
  },
  "csi23-03-eco-cars": {
    duty: "比较EV、HV、PHV与FCV的能源容器、转换器、驱动链和系统课题",
    question:
      "怎样用同一系统边界比较四类环保车，而不是只看是否有尾气管？",
    invariant: "比较同时报告车载能量路径、补能方式、上游能源和适用工况",
    fault: "用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类",
    scenario:
      "城市车队要在短途、长途和固定路线中比较四种动力方案，电网结构、充电或加氢可得性和载荷都不同。",
    stages: ["画出车载能源路径", "比较补能与工况", "扩展上游及基础设施边界"],
    topology: ["EV", "HV", "PHV", "FCV", "系统与基础设施"],
    technicalSources: [SOURCES.electric],
    artifact:
      "一次能源来源、车载储能、转换器、驱动电机或发动机、再生制动、补能条件、上游排放与适用任务。",
    opening:
      "环保车型页使用同一能源边界比较方案：DOE资料明确区分外接电力、车载电池、再生制动和车载氢制电，尾气只是完整链条的一段。",
  },
  "csi23-final-future": {
    duty: "把氢能、自动驾驶、车载信息系统与驾驶乐趣放回基础设施和人机责任",
    question:
      "怎样区分技术演示、受限辅助、完整自动化和可被社会接受的交通系统？",
    invariant: "未来主张同时说明运行设计域、驾驶责任、基础设施、数据与失败处置",
    fault: "把车道保持或自适应巡航称为全自动驾驶，模糊驾驶员持续监督责任",
    scenario:
      "一项未来城市出行提案同时承诺氢能、自动驾驶和车路信息服务，评审者要拆开验证每项依赖与失败模式。",
    stages: ["列出能源与信息依赖", "划分自动化责任", "评估社会价值和失败处置"],
    topology: ["氢能基础设施", "驾驶辅助", "自动驾驶系统", "车载信息", "驾驶价值"],
    technicalSources: [SOURCES.automation, SOURCES.safety, SOURCES.electric],
    artifact:
      "运行设计域、驾驶员和系统责任、感知决策执行链、补能与通信依赖、隐私安全、降级路径和社会价值。",
    opening:
      "终章不把未来愿景写成必然时间表；NHTSA区分当前驾驶辅助与更高自动化，并强调在售车辆仍要求驾驶者理解并承担相应责任。",
  },
  "csi23-index": {
    duty: "把索引变成从术语反向定位系统、工序、能源路线和相邻节点的检索接口",
    question:
      "怎样从一个术语找到正式目录坐标、上游输入、下游输出与同义或近义词？",
    invariant: "每次检索返回唯一语境、来源节点和至少一个跨章连接",
    fault: "看到相同中文词就合并对象，忽略发动机、电机、马达或主动安全词汇的语境差异",
    scenario:
      "学习者从“电机、动力、主动安全、检验”四个词出发，要分别定位零件、能量、控制和生产语境。",
    stages: ["规范检索词与同义词", "定位正式节点和语境", "建立跨章上下游连接"],
    topology: ["检索词", "正式节点", "系统语境", "上下游关系", "跨章连接"],
    technicalSources: [SOURCES.originalPublisher],
    artifact:
      "检索词、同义词、目录坐标、语境定义、上游输入、下游输出、相邻主题和误合并反例。",
    opening:
      "索引页不是附录占位，而是整书反向导航：同一词在机械、电气、制造或社会系统中可能指向不同对象，检索结果必须携带语境。",
    teachingConcepts: [
      "规范检索词",
      "同义词",
      "目录坐标",
      "系统语境",
      "上下游关系",
      "跨章连接",
    ],
  },
  finalReview: {
    title: "《汽车构造&知识全图解》综合复核：城市通勤车证据册",
    duty: "以一辆城市通勤车串联读图、构造、生产、环保路线和未来辅助功能",
    question:
      "怎样证明对汽车的理解已经从零件名称推进到结构、制造、能源与安全边界？",
    invariant: "同一车辆案例保留65节点出处、系统路径、工序来源、能源边界和责任说明",
    fault: "分别展示零件、工厂与新能源知识，却没有共同对象和可交接证据",
    scenario:
      "综合任务比较一辆燃油版和一辆电驱版城市车，并追溯车身制造、主动安全、补能和驾驶责任。",
    stages: ["建立同车系统拓扑", "追溯制造与能源", "验证安全边界并交接"],
    topology: ["目录与读图", "整车结构", "制造来源", "能源比较", "未来功能"],
    technicalSources: [
      SOURCES.manufacturing,
      SOURCES.electric,
      SOURCES.safety,
    ],
    artifact:
      "65节点检查、两车系统图、制造追溯、能源边界、主动安全责任、故障轨迹和独立复核结论。",
    opening:
      "综合复核要求所有知识回到同一车辆对象：零件解释动力与控制，制造说明质量来源，能源路线保持共同分母，未来功能声明驾驶责任。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
const unitTitles = previousManifest.units.map((unit) => unit.title);

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function mechanismFor(concept) {
  const rules = [
    [/使用方法/, ["建立读图次序", "对象、箭头、状态和边界", "只背标签"]],
    [/进化|前世今生|环保史/, ["连接时代需求与技术选择", "时间、用途和约束", "线性进步叙事"]],
    [/零件/, ["按系统接口组织部件", "输入、输出和连接", "孤立清单"]],
    [/驱动方式/, ["区分动力源位置与驱动轮", "转矩路径和布置", "标签推断全部性能"]],
    [/动力源/, ["比较能源容器和转换器", "能量形式与损失", "混淆能源和动力机"]],
    [/车体风格/, ["把外形连接用途和空间", "用途、尺寸与工况", "外观决定安全"]],
    [/发动机的构造|发动机的原理/, ["组织进气压缩做功排气", "相位、压力和转矩", "结构等同工况"]],
    [/气门/, ["控制气体交换时序", "开闭相位和流量", "忽略转速条件"]],
    [/喷射/, ["计量并雾化燃料", "压力、脉宽和混合", "只看喷油量"]],
    [/点火/, ["在目标时刻提供点火能", "提前角、能量和燃烧", "火花等同燃烧正常"]],
    [/进排气/, ["管理新鲜气体与废气路径", "压差、流量和背压", "忽略泄漏阻塞"]],
    [/启动·充电/, ["连接蓄电池、启动机和发电机", "电压降、电流和状态", "空载电压代替负载"]],
    [/冷却|增压器|涡轮/, ["平衡热量与进气密度", "温度、压力和保护", "峰值功率代替热稳态"]],
    [/变速器/, ["变换转速与转矩", "速比、效率和滑差", "混淆机构与控制"]],
    [/传动系统/, ["把输出转矩送到驱动轮", "方向、效率和接口", "遗漏终传半轴"]],
    [/轮胎|轮圈/, ["把车辆作用传给路面", "载荷、附着和尺寸", "尺寸外观代替能力"]],
    [/悬架/, ["管理车轮运动与车身载荷", "行程、刚度和阻尼", "舒适等同操稳"]],
    [/转向/, ["把驾驶输入变成车轮转角", "传动比、助力和反馈", "方向盘角等同轮角"]],
    [/脚制动|驻车制动/, ["把动能耗散或保持静止", "制动力、热和冗余", "制动距离脱离工况"]],
    [/车身|车门|保险杠|车窗|安全车身/, ["建立承载与碰撞载荷路径", "材料、连接和变形区", "刚度等同安全"]],
    [/舾装|座椅|后视镜/, ["连接乘员、视野与人机界面", "固定、调节和可视范围", "舒适件无安全影响"]],
    [/电装|车灯|仪表|雨刷|导航|安全气囊/, ["闭合电源、传感、控制与执行", "电压、信号和诊断状态", "故障灯等同根因"]],
    [/安全辅助|主动式安全/, ["区分警告、介入和驾驶责任", "传感范围与系统状态", "辅助等同自动驾驶"]],
    [/汽车的制造|生产方式/, ["建立主线副线和质量门", "批次、工序和特性", "终检创造质量"]],
    [/冲压/, ["把板材成形为几何件", "模具、尺寸和回弹", "外观合格代替尺寸"]],
    [/焊接/, ["形成车体连接与载荷路径", "焊点位置和连接强度", "焊点数量代替质量"]],
    [/涂装/, ["形成防腐与外观涂层", "前处理、膜厚和固化", "颜色一致代替防护"]],
    [/组装|副线/, ["按接口汇合部件和子总成", "扭矩、间隙和配置", "装上即合格"]],
    [/成车检验|防撞安全/, ["验证整车特性与法规边界", "测项、阈值和追溯", "末端筛选替代过程能力"]],
    [/电动车（EV）|电动汽车/, ["由电池经电力电子驱动电机", "电量、功率和热", "零尾气等同零排放"]],
    [/电机的特性/, ["区分恒转矩和恒功率区域", "转速、转矩与效率", "单点峰值代替曲线"]],
    [/混合动力车（HV）/, ["协调发动机、电机与储能", "功率分配和工况", "所有混动拓扑相同"]],
    [/插电式混合动力/, ["加入外接充电和电量策略", "纯电里程与补能", "与不可插电HV混同"]],
    [/燃料电池车/, ["由车载氢产生电能驱动", "氢、燃料电池和电机", "氢直接机械驱动"]],
    [/燃料电池和蓄电池/, ["区分能量转换与缓冲储能", "功率、容量和响应", "两者角色互换"]],
    [/环保车的课题/, ["扩展到上游能源和基础设施", "系统边界与任务工况", "只比较尾气"]],
    [/氢能社会/, ["连接制氢储运和加注", "来源、效率和设施", "车载可行等同社会可用"]],
    [/自动驾驶/, ["划分感知决策执行与责任", "运行设计域和降级", "辅助功能冒充全自动"]],
    [/车载信息/, ["连接车辆、用户和外部服务", "数据流、时延和权限", "联网等同可信"]],
    [/驾驶的乐趣/, ["把人的控制感与社会价值纳入", "任务、反馈和偏好", "单一效率决定价值"]],
    [/索引/, ["从术语反向定位语境", "同义词、节点和上下游", "同词自动合并"]],
    [/第\d章|序章|终章/, ["界定正式单元范围", "节点分母与相邻单元", "跨章任意重排"]],
    [/专栏/, ["补充正式主题的边界案例", "所属章节和迁移条件", "脱离主线"]],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录主题转成系统关系",
      "对象、状态、接口与边界",
      "名称代替机制",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^[^：:]+[：:]\s*/, "")
    .split(/[（(]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 15 ? short : `系统节点${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? [
        ...unit.concepts.map((alternatives) => alternatives[0]),
        ...(specification.teachingConcepts ?? []),
      ]
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const normalTrace = [
    `为“${title}”声明对象、系统边界和当前工况`,
    `沿${specification.stages[0]}记录输入、状态变化与测量量`,
    `进入${specification.stages[1]}并核对接口、损失和质量或安全门`,
    `完成${specification.stages[2]}，交付${specification.artifact}`,
  ];
  const failureTrace = [
    `复用“${title}”的相同对象、工况、单位和初始状态`,
    `只注入系统故障：${specification.fault}`,
    "沿输入到输出的方向标记最早出现异常的节点",
    `依据“${specification.invariant}”拒绝或修正解释，再恢复基线`,
  ];
  const nodeCards = specification.topology.map((name, index) => ({
    name,
    input: `“${title}”在${name}读取${index === 0 ? "任务、能源或材料" : "上游节点已经验证的状态"}。`,
    transform: `按${specification.stages[index % specification.stages.length]}解释${name}的转换与控制。`,
    output: `${name}向下游交付带单位的状态、接口或判断证据。`,
    boundary: `出现“${specification.fault}”时，${name}不能越过“${specification.invariant}”。`,
  }));
  return {
    key,
    id: unit?.id ?? key,
    officialUnitId: unit?.id ?? null,
    role,
    chapterPath,
    componentBase: toPascal(path.basename(chapterPath)),
    concepts,
    title,
    ...specification,
    normalTrace,
    failureTrace,
    nodeCards,
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];
if (profiles.length !== 9)
  throw new Error("《汽车构造&知识全图解》课程必须恰好为9页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分公开目录事实与独立教学解释
- 能先预测“${profile.question}”的路径，再沿输入、转换、输出和边界逐节点核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、缩小或拒绝结论

</Objectives>`;
}

function sourceSection(profile) {
  const technicalLinks = profile.technicalSources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个整车任务开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作交互前先预测哪个节点最先变化，操作后再补写猜测不构成可检验学习。

本页围绕“${profile.question}”组织正常、边界、故障与恢复路径。只有路径保持“${profile.invariant}”，并交付${profile.artifact}，才能把图解知识迁移到另一车辆或工况。

## 中日版次、公开材料与技术边界

“${profile.title}”的译本身份由[台湾东贩2023译本书页](${SOURCES.chinesePublisher})核对：繁浩太郎著、陈识中译、ISBN 9786263299894、2023年8月28日、128页，并含使用方法、序章、三章、终章、索引及各专栏。对“${profile.title}”的原版边界，[技术评论社原版书页](${SOURCES.originalPublisher})确认作者、2015年5月21日、128页、ISBN 978-4-7741-7314-6和章节顺序。“${profile.title}”再以[博客来完整目录](${SOURCES.retailer})逐项核对台版65个正式节点。

“${profile.title}”引用的公开来源没有授权本站复制跨页插画、照片或正文。本页的结构卡、系统解释、交互、练习和答案均为独立教学重写；在“${profile.title}”中，简体术语只做站内一致化，不用现代车型功能倒填2015年原版或2023年译本。

“${profile.title}”的技术边界另以${technicalLinks}核对。“${profile.title}”若涉及制造，按官方工厂资料检查冲压、焊接、涂装、组装与检验顺序；若涉及新能源，按DOE资料区分电池电动车、插混与车载氢制电；若涉及安全，按NHTSA资料区分警告、介入、驾驶辅助和自动化责任。对“${profile.title}”而言，后续资料只检查系统事实，不声称是原书原文。

“${profile.title}”涉及燃油、高温、旋转机械、车辆举升、高压电、氢气、气囊或道路试验时，本页只提供离线模型。真实检修必须遵循与“${profile.title}”对象匹配的车型维修资料、隔离程序与人员资质；本页交互结果不是维修指令或道路安全保证。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的正式节点${index + 1}中，${concept}用于${mechanism}；先标出上游输入和工况，再用${evidence}核对下游结果，出现${caution}时不得把最终现象倒推成唯一原因。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张结构卡：它怎样${mechanism}、通过什么接口连接相邻节点、由哪些${evidence}证明，并怎样排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，坐标${index + 1}把${concept}解释为${mechanism}；独立复核者读取${evidence}后再判断路径是否闭合，不能接受${caution}这种捷径。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的可观察合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到上游接口重新限定对象和工况。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个正式主题${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”，所以应列入停止条件。`,
  (profile, concept, mechanism, evidence, caution, _index) =>
    `学习者在“${profile.title}”中使用${concept}前预测${mechanism}会改变哪项状态，再读取${evidence}；观察到${caution}时必须恢复基线，不能调整解释来迎合结果。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在节点${index + 1}讨论${concept}时，要把${mechanism}写进路径图，把${evidence}写进证据卡，并把${caution}写进反例栏。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”限定了${concept}的适用域：节点${index + 1}只能通过${mechanism}推进系统解释，由${evidence}复核，而${caution}构成失败对照。`,
];

function conceptsSection(profile) {
  return `## 正式目录节点与系统机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应正式坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并接受工况与安全边界约束。`;
    const paragraph = paragraphPatterns[index % paragraphPatterns.length](
      profile,
      concept,
      mechanism,
      evidence,
      caution,
      index,
    );
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** ${paragraph}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个系统实验

<Callout type="info" title="先写出哪一节点会先变化">
  对“${profile.title}”先选择一个上游输入和预期输出，再操作拓扑卡、路径轨迹和边界探针；若观察与预测不符，应修改机制假设，不能删除异常运行。
</Callout>

<Stepper>
  <Step title="1. 系统拓扑与接口">
    逐个选择“${profile.topology.join("、")}”，检查输入、转换、输出和边界是否共同构成“${profile.title}”的完整对象。

    <${profile.componentBase}TopologyLab />
  </Step>
  <Step title="2. 正常与故障路径">
    保持“${profile.scenario}”不变，切换正常和故障模式，逐步定位“${profile.fault}”首次改变系统状态的位置。

    <${profile.componentBase}PathTraceLab />
  </Step>
  <Step title="3. 边界与证据包">
    分别切换工况、安全、来源与追溯边界，展开${profile.artifact}后判断证据能否交接。

    <${profile.componentBase}BoundaryProbeLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页系统故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持对象和工况不变，沿输入到输出寻找最早异常节点；若直接从最终现象指定根因，就不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="图解不提供维修授权">
  ${profile.scenario} 本页交互只处理离线结构和证据关系，不能替代车型维修手册、绝缘隔离、举升支撑、燃油与气囊安全程序。
</Callout>

<Callout type="trap" title="现代资料不能改写历史版次">
  对“${profile.title}”引用DOE、NHTSA或丰田资料是为了核对现行技术边界，不可据此宣称2015年原版已经描述今天的功能、法规或基础设施状态。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放证据协议

| 阶段 | 系统动作 | 记录字段 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | ${profile.nodeCards[index % profile.nodeCards.length].transform} | ${index === 0 ? "对象、工况、输入与单位" : index === 1 ? "接口、状态、损失与质量门" : "输出、边界、故障与恢复"} | ${index === 0 ? "对象或单位未定义" : index === 1 ? profile.fault : "无法恢复同一基线"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
topology: ${JSON.stringify(profile.topology)}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_node_mode_step_boundaries_and_artifact
\`\`\`

该协议要求“${profile.title}”在同一对象、工况、单位和初始状态下重放。重置后若节点选择、路径位置或边界开关没有回到基线，比较已混入界面状态，不能作为系统证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接对象、工况、证据和边界。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. ${concept}：以“${mechanism}”解释系统作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住零件或车型名称，而是能围绕“${profile.question}”重建拓扑、状态与边界，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：系统合同。** “${profile.title}”为什么必须先声明对象、工况、单位与边界？

<Answer>
  ${profile.scenario} 若对象或工况变化，相同名称可能对应不同结构、控制和风险。“${profile.title}”先声明这些条件，才能比较输入、转换与输出，并防止把最终现象、标签或单一数字冒充普遍机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明正式坐标不仅出现在清单里？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用相同对象、工况、单位和初态，重放正常路径后只注入“${profile.fault}”；记录最早异常节点，撤销故障并再次运行。只有接口、状态、输出和${profile.artifact}重新满足“${profile.invariant}”，修正才可交接。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="《汽车构造&知识全图解》及原版公开目录"
  adaptedUrl="${SOURCES.chinesePublisher}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    nodeCards: profile.nodeCards,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    boundaries: [
      {
        label: "工况边界",
        detail: `核对“${profile.title}”的速度、载荷、温度、能源或制造批次。`,
      },
      {
        label: "安全边界",
        detail: `核对“${profile.title}”是否涉及高压、旋转、燃油、氢气或道路责任。`,
      },
      {
        label: "来源边界",
        detail: `区分“${profile.title}”的2015原版、2023译本与后续技术资料。`,
      },
      {
        label: "追溯边界",
        detail: `确保“${profile.title}”的结论能回到对象、接口和原始记录。`,
      },
    ],
  };
  return `"use client";

import {
  VehicleSystemEvidenceLab,
  type VehicleSystemEvidenceModel,
} from "./vehicle-system-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies VehicleSystemEvidenceModel;

export function ${profile.componentBase}TopologyLab() {
  return <VehicleSystemEvidenceLab model={model} view="topology" />;
}

export function ${profile.componentBase}PathTraceLab() {
  return <VehicleSystemEvidenceLab model={model} view="path-trace" />;
}

export function ${profile.componentBase}BoundaryProbeLab() {
  return <VehicleSystemEvidenceLab model={model} view="boundary-probe" />;
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
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.chapterPath);
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
import { ${profile.componentBase}TopologyLab, ${profile.componentBase}PathTraceLab, ${profile.componentBase}BoundaryProbeLab } from "@/components/mdx/${BOOK}/v2/${slug}";

${objectivesBlock(profile)}

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.duty}；用系统拓扑、故障轨迹和边界证据完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.chinesePublisher,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId)
    data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${slug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "繁浩太郎著、陈识中译《汽车构造&知识全图解：从引擎、车体到驱动系统全方位解析》，台湾东贩，2023年8月28日，128页，ISBN 9786263299894；原版由技术评论社2015年5月21日出版，128页，ISBN 9784774173146",
  sourceKind:
    "original-and-translation-publisher-complete-catalog-with-primary-automotive-technical-sources",
  sourceUrl: SOURCES.chinesePublisher,
  secondarySourceUrls: [
    SOURCES.retailer,
    SOURCES.originalPublisher,
    SOURCES.library,
    SOURCES.manufacturing,
    SOURCES.electric,
    SOURCES.safety,
    SOURCES.automation,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "台湾东贩确认繁浩太郎著、陈识中译、ISBN 9786263299894、2023-08-28和128页；技术评论社确认2015原版作者、日期、页数、ISBN与章节顺序；博客来完整目录列出使用方法、序章、第1至3章、终章、索引及专栏，共65个正式节点。课程按7个正式单元完整覆盖，另设学习地图与综合复核，共9页；简体术语只做站内一致化，结构解释、交互、练习与答案均为独立教学重写，不复制跨页插图、照片或正文。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence:
    "quality/car-structure-illustrated-v2-profiles.json",
  factSourcePolicy:
    "中日出版社和台版完整目录只核定书目与65节点；制造过程、EV/PHV/FCEV能源路径、驾驶辅助与自动化责任分别以丰田、美国能源部AFDC与NHTSA官方资料核对。后续资料不倒填原版，课程机制、交互、练习和答案独立编写。",
};
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      translationSource: SOURCES.chinesePublisher,
      originalSource: SOURCES.originalPublisher,
      technicalSources: [
        SOURCES.manufacturing,
        SOURCES.electric,
        SOURCES.safety,
        SOURCES.automation,
      ],
      officialUnits: previousManifest.units.length,
      officialCatalogNodes: previousManifest.units.reduce(
        (sum, unit) => sum + unit.concepts.length,
        0,
      ),
      coursePages: profiles.length,
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.officialUnitId,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
        technicalSources: profile.technicalSources,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖 ${previousManifest.units.reduce((sum, unit) => sum + unit.concepts.length, 0)} 个正式目录节点，生成 ${profiles.length * 3} 个交互视图。`,
);
