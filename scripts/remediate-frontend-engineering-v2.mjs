import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "frontend-engineering";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/frontend-engineering/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/frontend-engineering-v2-profiles.json",
);

const SOURCES = {
  catalog: "https://book.douban.com/subject/27605366/",
  bookseller:
    "https://www.tenlong.com.tw/products/9787121330902?list_name=rd",
  node: "https://nodejs.org/learn",
  webpack: "https://webpack.js.org/concepts/why-webpack/",
  manifest: "https://webpack.js.org/concepts/manifest/",
  hmr: "https://webpack.js.org/concepts/hot-module-replacement/",
  cache: "https://datatracker.ietf.org/doc/html/rfc9111",
  babel: "https://babeljs.io/docs/",
  postcss: "https://postcss.org/",
  yeoman: "https://yeoman.io/authoring/",
  git: "https://git-scm.com/docs/gitworkflows",
  webhooks: "https://docs.github.com/en/webhooks",
};

const PATHS = {
  learningMap: "00-guide/feng-official-learning-map",
  "feng-unit-01": "01-foundations/feng-01-history",
  "feng-unit-02": "01-foundations/feng-02-scaffolding",
  "feng-unit-03": "02-build/feng-03-build",
  "feng-unit-04":
    "03-development-delivery/feng-04-local-dev-server",
  "feng-unit-05": "03-development-delivery/feng-05-deployment",
  "feng-unit-06": "04-workflow-future/feng-06-workflow",
  "feng-unit-07": "04-workflow-future/feng-07-future",
  finalReview: "05-review/feng-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《前端工程化》98条目学习地图",
    duty: "按历史、脚手架、构建、开发服务、部署、工作流与未来蓝图组织98个公开目录条目",
    question:
      "怎样让项目从创建到交付使用同一套版本、依赖、产物和责任记录？",
    invariant: "七章目录各有唯一归属，源代码只构建一次，产物可验证、可晋级、可回滚",
    fault: "把工程化缩成某个打包器的配置清单，忽略脚手架、部署和工作流",
    scenario:
      "团队接手一个2018年前后形成的多页面项目，要先复原原书体系，再用现代官方资料标注哪些实践发生了演进。",
    stages: ["核对2018目录边界", "建立开发构建主链", "贯通部署工作流"],
    nodes: ["项目创建", "依赖图构建", "本地验证", "产物部署", "反馈与演进"],
    sources: [SOURCES.node, SOURCES.webpack, SOURCES.cache],
    artifact:
      "98条目映射、七章依赖关系、工具版本、唯一构建产物、部署清单、回滚路径和时代差异说明。",
    opening:
      "学习地图以公开目录为历史分母，不用今天流行的框架重排2018年的论述；现代资料只负责说明概念哪些仍成立、接口哪些已经变化。",
  },
  "feng-unit-01": {
    duty: "从Node.js、前后端分离和工程化三阶段建立体系边界与衡量准则",
    question:
      "怎样区分运行时、职责边界、工程服务与具体工具，避免把Node.js或webpack等同工程化本身？",
    invariant: "每项工程能力都能连接用户、输入、产物、度量和维护责任",
    fault: "列出工具名称就宣称完成工程化，却没有缩短反馈、减少差异或保护交付",
    scenario:
      "一个浏览器脚本仓库开始引入Node.js工具链和独立接口服务，团队要决定哪些职责属于运行时、构建系统与应用。",
    stages: ["复原角色与技术演进", "划分前后端职责", "设计工程化服务架构"],
    nodes: ["技能与历史", "Node.js运行时", "前后端接口", "工程化阶段", "方案架构"],
    sources: [SOURCES.node, SOURCES.webpack],
    artifact:
      "角色边界、Node.js用途、接口契约、工程能力目录、衡量指标、方案组件和设计原则。",
    opening:
      "前端工程简史页不把技术更替写成直线进步，而要说明Node.js为何让浏览器外的JavaScript工具成为可能，以及前后端分离怎样扩大交付责任。",
  },
  "feng-unit-02": {
    duty: "把脚手架设计为可丢弃的项目发起器，同时保留模板版本和生成证据",
    question:
      "怎样让脚手架减少重复劳动，却不把持续运行职责和隐藏配置永久塞进生成项目？",
    invariant: "相同模板版本与输入产生可解释结构，生成后项目不依赖脚手架常驻",
    fault: "脚手架从远端读取浮动模板，生成结果无法重现且升级时覆盖用户修改",
    scenario:
      "平台团队用Yeoman封装三类项目模板，需要区分一次性初始化、可重复迁移和持续开发服务。",
    stages: ["声明生成输入与模板", "运行本地生成事务", "验证结果并移交项目"],
    nodes: ["命令入口", "问题与默认值", "模板版本", "文件事务", "验证与移交"],
    sources: [SOURCES.yeoman],
    artifact:
      "生成命令、模板版本、问题答案、文件差异、依赖锁、失败回滚、验收测试和升级策略。",
    opening:
      "脚手架页把“用完即弃”作为职责边界：生成器负责可靠发起项目，随后由构建、开发服务器和工作流接管，不让模板工具成为隐形运行依赖。",
  },
  "feng-unit-03": {
    duty: "把源码、依赖图、语言与样式转换、模块、缓存和资源定位编成确定性产物",
    question:
      "怎样证明同一提交和锁定环境得到同一逻辑产物，并让缓存只失效真正变化的资源？",
    invariant: "依赖图完整、转换顺序明确、产物可追溯，内容变化与资源标识变化一致",
    fault: "构建读取未固定的网络输入或时间戳，使相同提交产生不同内容哈希",
    scenario:
      "大型前端仓库同时处理ECMAScript、Babel、CSS预处理、PostCSS、图片和按需模块，要定位一次无源代码变化的缓存失效。",
    stages: ["解析入口与依赖图", "执行可审计转换", "命名产物并注入资源位置"],
    nodes: ["源文件", "解析与模块图", "Babel/PostCSS转换", "分块与资源", "清单与内容哈希"],
    sources: [
      SOURCES.webpack,
      SOURCES.manifest,
      SOURCES.babel,
      SOURCES.postcss,
      SOURCES.cache,
    ],
    artifact:
      "提交、锁文件、运行环境、配置、依赖图、转换链、产物清单、内容哈希、缓存头和资源引用。",
    opening:
      "构建页的核心不是配置行数，而是可解释的函数关系：源码和固定环境进入，经过有序转换得到浏览器可消费产物，清单连接逻辑模块与部署URL。",
  },
  "feng-unit-04": {
    duty: "用动态构建、HMR、Mock与SSR缩短本地反馈，同时守住生产契约",
    question:
      "怎样在不完整重载的情况下更新模块，又证明状态、接口和服务端渲染没有被本地便利掩盖？",
    invariant: "本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新",
    fault: "Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现",
    scenario:
      "开发服务器在内存中构建前端，代理异步接口并支持SSR；一次字段变更在热更新中看似正常，整页刷新却失败。",
    stages: ["触发增量编译", "应用HMR或完整刷新", "核对Mock、接口与SSR"],
    nodes: ["文件监听", "内存编译", "更新清单", "浏览器状态", "接口与SSR"],
    sources: [SOURCES.hmr, SOURCES.webpack],
    artifact:
      "文件变更、编译哈希、更新模块、接受边界、保留状态、刷新回退、接口契约和SSR结果。",
    opening:
      "本地开发服务器页把速度和真实性并列：webpack的HMR会生成更新清单与更新块，但模块没有可接受边界时必须向上冒泡并最终回退。",
  },
  "feng-unit-05": {
    duty: "用审查、队列、权限、不可变静态资源和HTTP缓存完成安全部署",
    question:
      "怎样让HTML引用新资源、旧资源继续可用，并在出错时只切换入口而不是覆盖文件？",
    invariant: "内容地址化资源不可变，发布动作有授权、审查、原子入口与回滚记录",
    fault: "在同一URL覆盖静态文件并设置长期强缓存，导致用户拿到版本混合页面",
    scenario:
      "团队把带内容哈希的JS/CSS上传对象存储，再更新HTML入口；一次越权发布需要在数分钟内审计和回滚。",
    stages: ["审查并排队发布", "上传验证不可变资源", "原子切换入口与回滚"],
    nodes: ["变更审查", "部署队列", "权限门", "静态资源", "缓存与入口"],
    sources: [SOURCES.cache, SOURCES.manifest],
    artifact:
      "审批者、构建产物ID、资源哈希、缓存策略、上传校验、入口版本、发布时间和回滚目标。",
    opening:
      "部署页把速度、协作和安全落实为可审计状态变化；长期缓存只适合内容地址化的不可变资源，HTML入口需要能够及时发现新版本。",
  },
  "feng-unit-06": {
    duty: "让本地分支、云端触发、持续集成与持续交付晋级同一构建产物",
    question:
      "怎样消除二次构建，让测试、预发和生产验证的是同一个产物身份？",
    invariant: "每个环境只改变外部配置，不重新解释源代码或重新生成应用产物",
    fault: "测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象",
    scenario:
      "Git分支事件通过WebHook触发CI，产物先进入测试沙箱再晋级生产；团队要证明三个环境共享一个哈希。",
    stages: ["提交与分支触发", "一次构建和测试", "产物晋级与持续交付"],
    nodes: ["Git事件", "WebHook", "CI运行", "产物仓库", "环境晋级"],
    sources: [SOURCES.git, SOURCES.webhooks],
    artifact:
      "提交SHA、触发事件、依赖锁、测试结果、产物哈希、签名或校验、环境配置、审批与晋级记录。",
    opening:
      "工作流页把二次构建视为证据断点：测试对象和生产对象若不是同一不可变产物，即使两次都来自同一提交，也可能因依赖或环境变化而不同。",
  },
  "feng-unit-07": {
    duty: "把未来定位写成可演进蓝图，而不是锁定某个框架、终端或当下工具",
    question:
      "怎样保留创建、构建、验证、部署和反馈能力，同时允许运行终端与工具替换？",
    invariant: "蓝图描述稳定职责和接口，具体工具有版本、替换条件与迁移证据",
    fault: "把2026年的工具栈倒填为2018年原书结论，或把未来蓝图写成唯一产品名单",
    scenario:
      "团队从浏览器页面扩展到服务端渲染、桌面与多终端，需要判断哪些工程能力可复用，哪些必须重设安全和发布边界。",
    stages: ["识别稳定工程职责", "抽象终端与工具接口", "预注册替换与迁移条件"],
    nodes: ["开发者职责", "运行终端", "工程服务", "能力蓝图", "迁移反馈"],
    sources: [SOURCES.node, SOURCES.webpack],
    artifact:
      "稳定职责、终端差异、工具版本、接口契约、替换指标、迁移实验、失败回退和维护责任。",
    opening:
      "未来页把工程化看作蓝图：浏览器不是唯一运行目标，Web也不是唯一交付形态，但源码到可信产物的职责不能因工具更名而消失。",
  },
  finalReview: {
    title: "《前端工程化》综合复核：一次构建、多环境晋级",
    duty: "用一个项目串联脚手架、构建、开发服务器、部署与工作流",
    question:
      "怎样从项目创建到生产回滚证明每一阶段使用相容契约和同一产物身份？",
    invariant: "提交、依赖、配置、测试、产物、环境和发布决策形成可追溯链",
    fault: "各章分别演示工具，却没有一次端到端交付证明它们共享版本与产物",
    scenario:
      "综合任务从脚手架创建应用，经本地HMR和Mock验证、CI一次构建、测试预发晋级，最后以不可变资源上线。",
    stages: ["创建并锁定工程输入", "构建验证唯一产物", "晋级部署并演练回滚"],
    nodes: ["模板与源码", "依赖图", "本地反馈", "CI产物", "发布与回滚"],
    sources: [SOURCES.webpack, SOURCES.hmr, SOURCES.cache, SOURCES.git],
    artifact:
      "98条目检查、模板版本、提交与锁文件、构建清单、HMR回退、测试结果、产物哈希、缓存策略和回滚演练。",
    opening:
      "综合复核只接受端到端证据：工具能单独运行不等于体系成立，必须证明项目创建后的每次状态变化都能追到同一提交与产物。",
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
    [/基本素养|技能栈|定位/, ["把职责连接能力与反馈", "责任、输入和度量", "工具数量代替能力"]],
    [/发展历史|简史|进化历程|未来/, ["解释约束变化与能力迁移", "时间、条件和替代方案", "线性进步叙事"]],
    [/Node\.js|两次新生/, ["把JavaScript运行扩展到浏览器外", "运行时、I/O和工具任务", "Node等同工程体系"]],
    [/前后端分离|开发模式/, ["以接口契约划分交付职责", "请求响应、版本和责任人", "按人员名单分层"]],
    [/工程化的衡量|3个阶段|工程化$/, ["用反馈、差异与风险衡量体系", "周期、失败率和可追溯性", "配置数量当成熟度"]],
    [/webpack|整体架构|功能规划|设计原则/, ["由依赖图编排工程能力", "入口、模块、产物和边界", "打包器包办所有职责"]],
    [/脚手架的功能|发起者/, ["一次性生成可维护项目", "模板版本、输入和文件差异", "生成器永久常驻"]],
    [/本地的执行环境/, ["限制生成权限和副作用", "工作目录、网络和回滚", "修改全局环境"]],
    [/多样性|开源脚手架|Yeoman|封装脚手架|集成到工程化/, ["分离生成协议与模板实现", "问题、事务和组合点", "浮动模板不可复现"]],
    [/构建功能|配置API|编程范式/, ["把构建声明成确定性转换", "配置模式、输入和产物", "隐藏可变输入"]],
    [/ECMAScript|ES6|Babel|JavaScript构建/, ["把语法目标转换为兼容产物", "目标环境、插件和源码映射", "编译等同运行兼容"]],
    [/CSS|PostCSS|Sprites/, ["按有序插件处理样式与资源", "插件版本、顺序和输出", "转换顺序随意"]],
    [/模块化|组件化|模块/, ["建立显式依赖与封装边界", "导入导出和副作用", "文件夹等同模块"]],
    [/HTTP缓存|增量更新|按需加载|缓存/, ["让内容变化驱动标识和失效", "内容哈希、缓存头和清单", "同URL覆盖长期缓存"]],
    [/资源定位|逆向注入/, ["由产物清单生成最终引用", "逻辑名、URL和完整性", "源码硬编码部署路径"]],
    [/本地开发服务器|动态构建|middleware/, ["把文件变化连接内存编译", "编译哈希、错误和响应", "开发语义偏离生产"]],
    [/Livereload|HMR/, ["用更新清单替换可接受模块", "模块边界、状态和刷新回退", "热更新掩盖冷启动"]],
    [/Mock|异步数据接口/, ["用契约生成可控接口情境", "模式、状态码和延迟", "Mock形状超出生产"]],
    [/SSR/, ["在服务端生成首屏输出", "请求上下文、数据和水合", "服务端浏览器环境混同"]],
    [/部署流程|速度|协作|代码审查|部署队列|安全|权限/, ["把发布设计成有门的状态机", "审批、队列和权限日志", "速度绕过审查"]],
    [/静态资源|协商缓存|强制缓存|Apache/, ["协调不可变资源与可更新入口", "缓存键、指令和回滚", "覆盖同名长期缓存"]],
    [/本地工作流|二次构建|代码分离|测试沙箱/, ["让验证对象直接晋级", "提交、产物哈希和环境", "环境内重新构建"]],
    [/云平台|GitFlow|版本管理|WebHook|自动构建/, ["用版本事件触发可审计运行", "SHA、事件和运行ID", "未验证事件直接部署"]],
    [/持续集成|持续交付/, ["自动验证并晋级不可变产物", "测试、制品和批准", "通过等同自动上线"]],
    [/不只是浏览器|不只是Web|蓝图/, ["抽象稳定职责和可替换接口", "终端、能力和迁移条件", "未来等同工具清单"]],
    [/总结|第\d章/, ["封闭该章职责与证据", "正式条目和相邻章节", "跨章任意混排"]],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录条目转成工程状态变化",
      "输入、动作、产物和责任",
      "名称代替机制",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^\d+(?:\.\d+)*\s*/, "")
    .replace(/^第\s*\d+\s*章\s*/, "")
    .split(/[——：:]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 16 ? short : `工程条目${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((alternatives) => alternatives[0])
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const normalTrace = [
    `为“${title}”记录源码提交、依赖锁、配置版本和责任边界`,
    `执行${specification.stages[0]}，保存输入与产生的工程状态`,
    `推进${specification.stages[1]}，核对日志、清单和产物身份`,
    `完成${specification.stages[2]}，交付${specification.artifact}`,
  ];
  const failureTrace = [
    `复用“${title}”相同的提交、依赖、配置和外部服务`,
    `只注入工程故障：${specification.fault}`,
    "沿项目创建到交付方向记录最早发生身份或契约偏离的阶段",
    `依据“${specification.invariant}”拒绝运行并恢复已验证状态`,
  ];
  const nodeCards = specification.nodes.map((name, index) => ({
    name,
    input: `“${title}”的${name}读取${index === 0 ? "已版本化需求、模板或源码" : "上游已验证的状态与产物"}。`,
    action: `按${specification.stages[index % specification.stages.length]}处理${name}，不得读取未声明的可变输入。`,
    output: `${name}输出带版本、哈希或运行ID的工程证据，供下一节点验证。`,
    gate: `若发生“${specification.fault}”，${name}必须停止而非越过“${specification.invariant}”。`,
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
  throw new Error("《前端工程化》课程必须恰好为9页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并保持2018原书目录与现代技术对照的边界
- 能先预测“${profile.question}”的正常路径，再沿输入、动作、产物和责任逐阶段核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、缩小或拒绝交付

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个交付任务开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作前先预测哪个阶段最先产生差异，运行后再补解释不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”保持“${profile.invariant}”并交付${profile.artifact}，工具运行结果才构成工程证据。

## 书目、98条目与时代边界

“${profile.title}”以[豆瓣书目与完整目录](${SOURCES.catalog})核对周俊鹏著、电子工业出版社、2018年1月、224页、ISBN 9787121330902和七章结构；[天瓏书店目录](${SOURCES.bookseller})为“${profile.title}”提供第二份逐节顺序核对。公开材料合计列出98个章、节和小节层级条目，课程不把现代对照增列为原书章节。

“${profile.title}”当前只能取得书目简介与详细目录，没有可授权逐段改写的完整正文。本页的解释、架构、交互、练习和答案均为独立教学重写；webpack、Yeoman、Node.js等名称按2018目录定位，现代文档不反向证明原书当年的具体版本行为。

“${profile.title}”另以${links}核对技术事实。对本页而言，Node、webpack、Babel、PostCSS、Git或WebHook文档说明当前机制；2022年的RFC 9111是HTTP缓存的现代标准，不能冒充2018年原书引用的历史规范。现代Vite、Module Federation、TypeScript测试体系或RUM若出现，只能标为迁移讨论，不能改写98条目分母。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的条目${index + 1}中，${concept}用于${mechanism}；先声明工程输入与责任人，再用${evidence}复核产物，出现${caution}时不能继续交付。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张证据卡：它怎样${mechanism}、向下一阶段交付什么、由哪些${evidence}证明，并怎样排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，坐标${index + 1}把${concept}解释为${mechanism}；独立复核者先读取${evidence}再判断工程状态，不能接受${caution}这种捷径。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到上游版本和契约重新验证。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个公开条目${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”，因此属于拒绝条件。`,
  (profile, concept, mechanism, evidence, caution, _index) =>
    `学习者在“${profile.title}”中讨论${concept}前预测${mechanism}会改变哪项工程状态，再读取${evidence}；观察到${caution}时必须恢复已知产物，不能移动验收标准。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在条目${index + 1}处理${concept}时，要把${mechanism}写进流水线，把${evidence}写进运行记录，并把${caution}写进失败样本。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”限定了${concept}的适用域：条目${index + 1}只能通过${mechanism}推进交付，由${evidence}复核，而${caution}构成反事实检查。`,
];

function conceptsSection(profile) {
  return `## 公开目录条目与工程机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应目录条目“${concept}”，在“${profile.title}”中用于${mechanism}，并受版本、产物与责任边界约束。`;
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

**公开坐标 ${index + 1}/${profile.concepts.length}。** ${paragraph}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个工程实验

<Callout type="info" title="先写出哪一阶段会先变化">
  对“${profile.title}”先选择一个版本化输入和预期产物，再操作体系节点、执行轨迹与发布门；结果与预测不一致时应修改工程假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 体系节点与交付契约">
    逐个选择“${profile.nodes.join("、")}”，核对输入、动作、输出和门禁怎样连接“${profile.title}”。

    <${profile.componentBase}ArchitectureLab />
  </Step>
  <Step title="2. 正常与故障执行轨迹">
    保持“${profile.scenario}”不变，切换正常和故障模式，定位“${profile.fault}”最先破坏版本或产物身份的位置。

    <${profile.componentBase}ExecutionTraceLab />
  </Step>
  <Step title="3. 发布门与证据包">
    分别切换输入锁定、确定性构建、产物完整性与回滚准备，展开${profile.artifact}后决定是否晋级。

    <${profile.componentBase}ReleaseGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页工程故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持提交和环境不变，沿创建到交付方向寻找最早偏离；直接用最终页面正常掩盖中间身份变化，不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="工具成功不等于体系成功">
  ${profile.scenario} 某条命令退出码为零，只证明局部执行完成；“${profile.title}”仍需核对上游版本、下游产物、权限和回滚。
</Callout>

<Callout type="trap" title="现代对照不能改写2018目录">
  “${profile.title}”引用现行官方文档是为了核对机制与迁移边界，不能把后来的工具、默认值或平台能力宣称成原书原有内容。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放交付协议

| 阶段 | 工程动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | ${profile.nodeCards[index % profile.nodeCards.length].action} | ${index === 0 ? "提交、依赖、模板与配置版本" : index === 1 ? "运行ID、测试、清单与产物哈希" : "审批、环境、入口与回滚目标"} | ${index === 0 ? "输入版本不完整" : index === 1 ? profile.fault : "无法返回已验证产物"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
nodes: ${JSON.stringify(profile.nodes)}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_node_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同提交、依赖锁、配置和外部服务下重放。重置后若节点、执行位置或发布门没有回到基线，交互状态已经污染比较，不能作为工程证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接输入、产物、版本与责任。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. ${concept}：以“${mechanism}”解释工程作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住工具命令，而是能围绕“${profile.question}”重建工程状态，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：工程合同。** “${profile.title}”为什么必须先声明提交、依赖、配置与责任边界？

<Answer>
  ${profile.scenario} 若输入版本不固定，相同命令可能得到不同产物；“${profile.title}”先声明这些条件，才能把执行结果连接到可验证对象，并防止局部成功或最终页面掩盖中间差异。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明公开条目已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一提交、依赖锁、配置和外部服务，重放正常路径后只注入“${profile.fault}”；记录最早偏离阶段，撤销故障并再次运行。只有日志、清单、产物和${profile.artifact}重新满足“${profile.invariant}”，修正才可晋级。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="周俊鹏《前端工程化：体系设计与实践》"
  adaptedUrl="${SOURCES.catalog}"
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
    gates: [
      {
        label: "输入锁定",
        detail: `“${profile.title}”的提交、模板、依赖和配置都有版本。`,
      },
      {
        label: "确定性构建",
        detail: `“${profile.title}”不读取时间戳、浮动网络内容或未声明环境。`,
      },
      {
        label: "产物完整性",
        detail: `“${profile.title}”的清单、哈希、测试和部署对象保持一致。`,
      },
      {
        label: "回滚准备",
        detail: `“${profile.title}”可以切回先前已验证的入口和不可变产物。`,
      },
    ],
  };
  return `"use client";

import {
  FrontendPipelineEvidenceLab,
  type FrontendPipelineEvidenceModel,
} from "./frontend-pipeline-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies FrontendPipelineEvidenceModel;

export function ${profile.componentBase}ArchitectureLab() {
  return <FrontendPipelineEvidenceLab model={model} view="architecture" />;
}

export function ${profile.componentBase}ExecutionTraceLab() {
  return <FrontendPipelineEvidenceLab model={model} view="execution-trace" />;
}

export function ${profile.componentBase}ReleaseGateLab() {
  return <FrontendPipelineEvidenceLab model={model} view="release-gate" />;
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
import { ${profile.componentBase}ArchitectureLab, ${profile.componentBase}ExecutionTraceLab, ${profile.componentBase}ReleaseGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用体系节点、故障轨迹和发布门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.catalog,
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
    "周俊鹏著《前端工程化：体系设计与实践》，电子工业出版社，2018年1月，224页，ISBN 9787121330902",
  sourceKind:
    "two-complete-public-detailed-catalogs-with-primary-runtime-bundler-protocol-and-workflow-sources",
  sourceUrl: SOURCES.catalog,
  secondarySourceUrls: [
    SOURCES.bookseller,
    SOURCES.node,
    SOURCES.webpack,
    SOURCES.manifest,
    SOURCES.hmr,
    SOURCES.cache,
    SOURCES.babel,
    SOURCES.postcss,
    SOURCES.yeoman,
    SOURCES.git,
    SOURCES.webhooks,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "豆瓣和天瓏书店共同确认周俊鹏著、电子工业出版社、2018年1月、224页、ISBN 9787121330902及七章详细目录，共98个公开章、节和小节层级条目。课程按7章完整覆盖，另设学习地图与综合复核，共9页。Node、webpack、Yeoman、Babel、PostCSS、HTTP缓存、Git和WebHook以现行官方资料核对机制；2022年RFC 9111及2018年后工具只作现代迁移对照，不冒充原书章节或当年版本行为。解释、交互、练习和答案均为独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/frontend-engineering-v2-profiles.json",
  factSourcePolicy:
    "公开书目和详细目录只限定2018版98条目；运行时、构建图、HMR、缓存、脚手架和工作流分别以Node、webpack、IETF、Yeoman、Git及GitHub官方资料核对。现代资料标注迁移边界，不倒填原书，课程内容独立编写。",
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
      outlineSources: [SOURCES.catalog, SOURCES.bookseller],
      technicalSources: [
        SOURCES.node,
        SOURCES.webpack,
        SOURCES.manifest,
        SOURCES.hmr,
        SOURCES.cache,
        SOURCES.babel,
        SOURCES.postcss,
        SOURCES.yeoman,
        SOURCES.git,
        SOURCES.webhooks,
      ],
      officialUnits: previousManifest.units.length,
      officialCatalogEntries: previousManifest.units.reduce(
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
        technicalSources: profile.sources,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖 ${previousManifest.units.reduce((sum, unit) => sum + unit.concepts.length, 0)} 个公开目录条目，生成 ${profiles.length * 3} 个交互视图。`,
);
