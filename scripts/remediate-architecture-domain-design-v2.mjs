#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "architecture-domain-design";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/architecture-domain-design-v2-profiles.json",
);

const SOURCES = {
  dddBook:
    "https://www.pearson.com/en-gb/subject-catalog/p/domain-driven-design-tackling-complexity-in-the-heart-of-software/P200000009375",
  cleanBook:
    "https://www.pearson.com/en-us/subject-catalog/p/clean-architecture-a-craftsmans-guide-to-software-structure-and-design/P200000009528/9780134494166",
  dddReference: "https://www.domainlanguage.com/ddd/reference/",
  dddReferencePdf:
    "https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf",
  cleanArticle:
    "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
  cqrs: "https://martinfowler.com/bliki/CQRS.html",
  eventSourcing: "https://martinfowler.com/eaaDev/EventSourcing.html",
  hexagonal: "https://alistair.cockburn.us/hexagonal-architecture",
};

function page(config) {
  const concepts = config.notes.map(([concept]) => concept);
  return { ...config, concepts };
}

const PAGES = [
  page({
    role: "learning-map",
    path: "00-intro/learning-map",
    title: "架构与领域设计学习地图",
    focus:
      "把 Clean Architecture 的依赖边界、DDD 的模型边界与三类扩展模式排成一条不混淆出处的学习路径",
    invariant:
      "每个概念都标明来源家族；平台学习顺序不能被写成任一本原著的章节顺序",
    fault: "把 CQRS、事件溯源或六边形架构说成两本原书共同给出的统一方案",
    evidence: "来源标签、正式单元映射、边界图、决策轨迹与跨章节复习清单",
    sourceIds: [
      "ddd-book",
      "clean-book",
      "ddd-reference",
      "clean-article",
      "cqrs",
      "event-sourcing",
      "hexagonal",
    ],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "本页是平台原创学习地图，不对应任何一本书的原始章节。两本书限定主干范围，作者参考摘要和三篇原始文章负责核对可公开阅读的定义与扩展。",
    decision:
      "先学依赖方向，再学语言与模型边界，最后把 CQRS、事件溯源和六边形架构当作可选扩展逐一验收",
    notes: [
      [
        "架构边界",
        "用依赖方向保护业务政策，使界面、数据库和框架成为可以替换的细节；学习时先问谁知道谁，而不是先选技术栈。",
      ],
      [
        "模型边界",
        "用限界上下文声明一个模型和一套语言在哪个范围内有效；跨越范围时必须翻译，不能假设同名词天然同义。",
      ],
      [
        "战术建模",
        "实体、值对象、聚合、工厂和仓储服务于一个上下文内部的模型表达，不是全系统统一套用的类模板。",
      ],
      [
        "战略协作",
        "上下文映射描述团队与模型之间真实存在的关系，并据此选择共享、翻译、遵奉或分离，而非先画理想组织图。",
      ],
      [
        "读写分离扩展",
        "CQRS 与事件溯源解决不同问题，可以一起使用，也可以分别采用；它们不属于本专题两本书共有的原始目录。",
      ],
      [
        "端口与适配器扩展",
        "六边形架构把应用内部与外部技术隔开，以端口表达交互意图，以适配器完成协议转换，并强化可独立测试性。",
      ],
    ],
    zones: [
      { label: "依赖边界", detail: "政策在内，技术细节在外" },
      { label: "模型边界", detail: "语言与规则在上下文内保持一致" },
      { label: "扩展选择", detail: "按读写、历史与外部接口压力选模式" },
    ],
    trace: ["识别政策", "划定模型", "建立协作", "选择扩展", "用证据复核"],
    scenarios: [
      {
        label: "新建订单系统",
        input: "团队同时面对界面、数据库、计价语言和报表读模型选择",
        expected: "先稳定业务政策与上下文，再为外部技术和扩展模式设边界",
      },
      {
        label: "遗留系统拆分",
        input: "旧库、共享术语与跨团队调用已经互相缠绕",
        expected: "先画真实依赖和上下文映射，再选择防腐层或端口适配器",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-01",
    path: "00-intro/what-is-architecture",
    title: "什么是架构",
    focus:
      "从系统行为与结构、政策与细节、边界与依赖三组坐标判断一项决策是否具有架构影响",
    invariant:
      "业务政策不因界面、数据库或框架替换而失效，关键行为可以在外部细节缺席时验证",
    fault: "把当前框架、部署拓扑或数据库品牌直接等同于系统架构",
    evidence:
      "依赖清单、组件职责、关键用例测试、替换实验与被推迟的不可逆决策记录",
    sourceIds: ["clean-book", "clean-article"],
    sourceBasis: "full-text",
    sourceUrl: SOURCES.cleanArticle,
    sourceNote:
      "Pearson 页面仅用于核定书名、作者、版次与目录范围；本页可公开核对的架构边界结论主要来自 Martin 的原始 Clean Architecture 文章，并作独立中文重写。",
    decision:
      "把架构视为保护高层政策、控制依赖和延迟细节决策的结构，而不是一张技术产品清单",
    notes: [
      [
        "策略与细节",
        "策略表达系统为什么存在以及必须遵守的业务规则；细节是实现策略的设备和机制，例如 Web、数据库或消息系统。",
      ],
      [
        "行为与结构",
        "软件必须完成当前行为，也必须保留可持续修改的结构；只看功能通过会掩盖依赖扩散带来的长期改变成本。",
      ],
      [
        "边界与组件",
        "组件边界把变化原因不同的职责分开，并通过明确接口协作；边界价值体现在一侧变化时另一侧无需被迫修改。",
      ],
      [
        "保持选择余地",
        "架构要推迟尚无证据支持的数据库、框架和通信细节，让重要决策在获得更多信息后仍可改变。",
      ],
      [
        "可测试性与可替换性",
        "若业务规则只有启动真实界面和数据库才能验证，说明细节已经穿透边界；可独立测试是依赖方向正确的可观察结果。",
      ],
    ],
    zones: [
      { label: "业务政策", detail: "定义系统目的与稳定规则" },
      { label: "应用边界", detail: "编排用例并隔离变化" },
      { label: "外部细节", detail: "界面、数据库、框架与设备" },
    ],
    trace: [
      "列出关键行为",
      "识别变化原因",
      "划出组件边界",
      "反转细节依赖",
      "执行替换测试",
    ],
    scenarios: [
      {
        label: "替换数据库",
        input: "订单规则不变，只把关系数据库改为文档存储",
        expected: "业务政策与用例测试不变，改动集中在外部适配器",
      },
      {
        label: "新增界面",
        input: "在既有 Web 入口之外增加批处理入口",
        expected: "新入口调用同一应用边界，不复制业务规则",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-02",
    path: "01-principles/solid-principles",
    title: "SOLID 原则回顾",
    focus:
      "把五条原则还原成管理变化来源、扩展方向、替换合同、接口负担和源码依赖的设计判断",
    invariant:
      "调用方依赖的合同在扩展与替换后仍成立，变化被限制在真正承担该责任的模块内",
    fault: "按首字母套模板，制造大量单方法接口和无业务含义的抽象层",
    evidence:
      "变化原因清单、替换合同测试、客户端依赖面、扩展差异与源码 import 图",
    sourceIds: ["clean-book", "clean-article"],
    sourceBasis: "outline-only",
    sourceUrl: SOURCES.cleanBook,
    sourceNote:
      "SOLID 的章节范围依据 Pearson 的 Clean Architecture 目录核定；本页不复现未公开书文，例子和推演为平台独立创作，依赖方向再以作者公开文章交叉核对。",
    decision:
      "把原则当作诊断耦合和设计边界的约束，而不是要求每个类都同时展示五种结构",
    notes: [
      [
        "单一职责原则（SRP）",
        "一个模块应对同一类参与者或变化原因负责；“只做一件事”过于含糊，关键是不同利益相关方的变化不要互相牵连。",
      ],
      [
        "开闭原则（OCP）",
        "当预期变化出现时，应通过新增实现扩展行为并保护稳定调用方；它要求先识别真实变化轴，而不是预先抽象一切。",
      ],
      [
        "里氏替换原则（LSP）",
        "实现必须保持调用方依赖的前置条件、后置条件和行为语义；类型能通过编译不代表运行合同可以安全替换。",
      ],
      [
        "接口隔离原则（ISP）",
        "客户端不应被迫依赖自己不用的方法；接口按客户端需要塑形，能减少无关变化和部署单元之间的连带影响。",
      ],
      [
        "依赖倒置原则（DIP）",
        "高层政策与低层细节都依赖稳定抽象，且抽象由政策侧需要定义；它关注源码依赖方向，不等于到处使用依赖注入容器。",
      ],
    ],
    zones: [
      { label: "变化来源", detail: "SRP 区分不同参与者的修改" },
      { label: "行为合同", detail: "OCP、LSP 与 ISP 保护调用方" },
      { label: "依赖方向", detail: "DIP 让细节指向政策抽象" },
    ],
    trace: [
      "找变化参与者",
      "写调用合同",
      "构造替换样本",
      "缩小依赖面",
      "核对源码方向",
    ],
    scenarios: [
      {
        label: "折扣策略扩展",
        input: "新增会员折扣但结算调用方不应修改",
        expected: "新增策略实现并用同一合同测试替换，不让结算层识别具体类型",
      },
      {
        label: "胖接口拆分",
        input: "报表客户端被迫依赖写入和删除方法",
        expected: "按客户端需要分离查询接口，避免写模型变化触发报表重编译",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-03",
    path: "01-principles/dependency-inversion",
    title: "依赖倒置与架构边界",
    focus:
      "区分运行时控制流与编译时源码依赖，并用边界接口让控制流跨越边界而源码仍指向内层政策",
    invariant:
      "跨边界接口由内层需要定义，外层实现依赖该接口，内层源码不引用外层框架类型",
    fault: "控制器直接返回 ORM 实体并让业务用例 import Web 与数据库包",
    evidence:
      "构建依赖图、端口所有权、请求响应数据结构、插件替换测试与控制流时序",
    sourceIds: ["clean-book", "clean-article"],
    sourceBasis: "full-text",
    sourceUrl: SOURCES.cleanArticle,
    sourceNote:
      "本页以 Martin 原始文章中的 Dependency Rule 与跨边界控制流示例为公开全文依据；Pearson 页面只核定对应原书身份，不声称取得书稿全文。",
    decision:
      "先画源码箭头再画运行时箭头，通过内层接口和外层实现让两种箭头可以朝相反方向",
    notes: [
      [
        "源码依赖与控制流",
        "运行时可以由内层用例调用外层展示器，但编译时应由外层展示器实现内层接口；两种方向不同正是边界反转的关键。",
      ],
      [
        "稳定抽象",
        "抽象应表达高层政策所需能力，并随政策演进；若接口只是复制数据库 SDK，所谓抽象仍由易变细节支配。",
      ],
      [
        "边界接口",
        "输入端口和输出端口明确用例接受什么、产出什么，接口归属在政策侧，从而避免业务层向外查询具体框架。",
      ],
      [
        "插件架构",
        "数据库、界面和设备像插件一样接入核心政策；替换插件不要求核心反向理解每一种外部实现。",
      ],
      [
        "跨边界数据",
        "边界上传递简单、专用的数据结构，不能把 ORM 行、框架请求对象或数据库游标直接泄漏给内层。",
      ],
    ],
    zones: [
      { label: "内层政策", detail: "拥有用例接口和边界数据" },
      { label: "接口边界", detail: "控制流穿越，源码依赖向内" },
      { label: "外层插件", detail: "实现接口并适配具体技术" },
    ],
    trace: [
      "标出控制流",
      "画出源码依赖",
      "把接口移到内层",
      "定义边界数据",
      "替换外层插件",
    ],
    scenarios: [
      {
        label: "展示订单结果",
        input: "用例完成后需要把结果交给 Web Presenter",
        expected: "用例调用内层定义的输出端口，外层 Presenter 实现该端口",
      },
      {
        label: "替换持久化",
        input: "Repository 从 SQL 改为远程 API",
        expected: "外层实现变化，核心用例与其输入输出合同保持不变",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-04",
    path: "01-principles/layered-architecture",
    title: "分层架构",
    focus:
      "按用户交互、用例编排、领域规则和技术实现分配职责，并让领域模型免受外层机制污染",
    invariant:
      "领域对象可以脱离用户界面和持久化技术表达业务规则，应用层只编排而不吞并领域知识",
    fault: "把四个目录名当成文件夹后仍允许领域层直接调用 SQL、HTTP 与界面控件",
    evidence:
      "层职责表、跨层调用记录、领域单元测试、持久化替换实验与业务规则归属清单",
    sourceIds: ["ddd-book", "ddd-reference", "ddd-reference-pdf"],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "分层架构的模式边界以 Evans 官方 DDD Reference 及其 CC 授权 PDF 摘要核对；Pearson 原书页只负责版次身份，本文示例不是原书译文。",
    decision:
      "让每层只承担一种推理尺度，并以领域层能否独立运行作为分层是否真实的检验",
    notes: [
      [
        "用户界面层",
        "解释用户请求并呈现结果，不决定核心业务规则；同一个应用用例可以由 Web、命令行或批处理入口触发。",
      ],
      [
        "应用层",
        "协调任务、事务与领域对象，保持很薄，不包含决定业务含义的规则；它描述一次用例如何完成。",
      ],
      [
        "领域层",
        "承载业务概念、状态和规则，是模型驱动设计的核心；它不应为了某种数据库表示而改变自身语义。",
      ],
      [
        "基础设施层",
        "提供消息、持久化、文件和框架等通用技术能力，通过接口服务上层，而非把技术 API 推入领域模型。",
      ],
      [
        "分层依赖方向",
        "上层调用下层不等于任意源码耦合；重要的是领域政策不依赖用户界面或基础设施的具体实现。",
      ],
    ],
    zones: [
      { label: "交互与编排", detail: "界面解释请求，应用层组织用例" },
      { label: "领域模型", detail: "表达业务含义、状态与规则" },
      { label: "技术服务", detail: "持久化、消息与框架实现" },
    ],
    trace: [
      "接收用户意图",
      "编排应用任务",
      "执行领域规则",
      "调用技术端口",
      "呈现用例结果",
    ],
    scenarios: [
      {
        label: "修改计价规则",
        input: "阶梯折扣规则改变但数据库表结构不变",
        expected: "规则修改集中在领域层，应用层只继续编排计价用例",
      },
      {
        label: "更换入口",
        input: "把客服 Web 操作增加为夜间批处理任务",
        expected: "新增界面入口，共用应用用例与领域模型",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-05",
    path: "01-principles/clean-architecture",
    title: "整洁架构",
    focus:
      "把实体、用例、接口适配器和框架驱动器按政策层级组织，并让所有源码依赖只指向更内层",
    invariant:
      "跨圆环依赖向内，内层不知道外层名称；边界数据只包含内层可以理解的简单结构",
    fault:
      "用圆环数量做形式检查，却让实体注解 ORM、用例接收 HTTP Request 并返回数据库 Row",
    evidence:
      "源码依赖图、用例端口、边界 DTO、无框架测试、数据库和界面替换结果",
    sourceIds: ["clean-book", "clean-article"],
    sourceBasis: "full-text",
    sourceUrl: SOURCES.cleanArticle,
    sourceNote:
      "四层名称、独立性目标、Dependency Rule 与跨边界通信均可在作者原始文章中核对；本页不把图形圆环数量当成原书强制模板。",
    decision:
      "按政策的抽象层级决定边界，而不是按技术目录分组；所有外部机制通过适配器服务内层用例",
    notes: [
      [
        "实体",
        "封装企业范围内最通用、最关键的业务规则；外部应用改变时，实体规则应尽量保持稳定。",
      ],
      [
        "用例",
        "实现应用特定业务规则，编排实体完成用户目标；界面和数据库变化不应改变用例的业务意图。",
      ],
      [
        "接口适配器",
        "在内外层方便使用的数据形状之间转换，例如 Controller、Presenter 与 Gateway，不把外层格式泄漏到内层。",
      ],
      [
        "框架与驱动器",
        "Web 框架、数据库、设备和外部服务位于最外层，是可替换工具；系统核心不应围绕它们塑形。",
      ],
      [
        "依赖规则",
        "源码依赖只能指向内层，内层不能提及外层声明的名称；这条规则比图中画几圈更重要。",
      ],
      [
        "跨边界通信",
        "控制流越过边界时可借助依赖倒置，参数使用简单数据结构，避免把外层框架对象带入用例与实体。",
      ],
    ],
    zones: [
      { label: "实体与用例", detail: "企业政策和应用政策位于内层" },
      { label: "接口适配器", detail: "转换控制流与数据形状" },
      { label: "框架与驱动器", detail: "可替换的界面、数据库和设备" },
    ],
    trace: [
      "接收外部请求",
      "转换输入数据",
      "执行应用用例",
      "调用输出端口",
      "适配外部呈现",
    ],
    scenarios: [
      {
        label: "无 Web 测试",
        input: "不启动 HTTP Server，直接执行创建订单用例",
        expected: "输入端口接收简单请求模型，实体和用例独立完成规则",
      },
      {
        label: "数据库迁移",
        input: "从 SQL Gateway 切换到内存 Gateway",
        expected: "实体和用例不变，接口适配器替换且合同测试继续通过",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-06",
    path: "02-ddd/ddd-fundamentals",
    title: "DDD 基础",
    focus:
      "通过领域专家与开发者持续协作，把知识消化为通用语言和可执行模型，并让代码表达同一套业务含义",
    invariant:
      "对话、文档、模型和代码中的关键术语保持同义；新知识出现时四者一起演化",
    fault: "先设计通用技术框架，再把业务名词贴到贫血数据对象和 CRUD 服务上",
    evidence:
      "领域对话记录、术语变更、模型草图、规则示例、代码命名与领域专家验收",
    sourceIds: ["ddd-book", "ddd-reference", "ddd-reference-pdf"],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "术语与模式摘要采用 Eric Evans 官方 DDD Reference 的公开网页和 CC 授权 PDF；Pearson 原书页仅核对第一版身份，正文为独立教学重写。",
    decision:
      "从最难、最有区分度的领域问题开始共同建模，让语言、模型与实现形成可被反例修正的同一系统",
    notes: [
      [
        "领域",
        "领域是软件要服务的活动和知识范围；DDD 优先投入复杂而有业务差异的核心领域，而非把所有模块同等复杂化。",
      ],
      [
        "模型",
        "模型是为解决特定问题而选择性简化的知识表达，不是现实世界的完整复制；有用性取决于它支持哪些判断和行为。",
      ],
      [
        "通用语言",
        "团队在一个模型边界内共同使用精确语言，并把它用于讨论、图示、测试和代码；含糊与冲突会直接暴露模型缺陷。",
      ],
      [
        "知识消化",
        "开发者与领域专家通过例子、矛盾和重构反复提炼知识，不是一次需求访谈后由分析文档向下传递。",
      ],
      [
        "模型驱动设计",
        "软件设计的关键结构应忠实表达模型，让代码运行结果反过来检验模型；模型与实现分离会使两者同时失去可信度。",
      ],
    ],
    zones: [
      { label: "领域知识", detail: "专家经验、规则、例外与业务目标" },
      { label: "共同模型", detail: "选择性表达并形成通用语言" },
      { label: "可执行设计", detail: "代码和测试直接体现模型" },
    ],
    trace: [
      "收集关键案例",
      "暴露语言冲突",
      "提炼模型",
      "写入代码与测试",
      "由专家复核结果",
    ],
    scenarios: [
      {
        label: "退款资格",
        input: "客服说“已完成订单”仍可能在特殊窗口内退款",
        expected: "修正状态语言与规则模型，而不是在控制器里追加孤立 if",
      },
      {
        label: "同名客户",
        input: "销售与风控对“客户”的识别范围和生命周期不同",
        expected: "先确认模型边界，不强迫两个含义合并成一个万能 Customer",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-07",
    path: "02-ddd/bounded-context",
    title: "限界上下文",
    focus:
      "为一个模型和一套通用语言划定明确适用范围，并在边界外通过翻译维护各自模型完整性",
    invariant:
      "上下文内部术语含义一致且持续集成，跨上下文数据必须经过显式映射或协议",
    fault: "以微服务数量、代码仓库或数据库 schema 自动代替模型边界",
    evidence:
      "上下文名称、语言词典、所有者、边界接口、翻译映射、集成测试与模型冲突记录",
    sourceIds: ["ddd-book", "ddd-reference", "ddd-reference-pdf"],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "限界上下文、持续集成与上下文间翻译以 Evans 官方参考摘要为事实坐标；部署形态与团队案例由本站独立构造，不冒充原书案例。",
    decision:
      "先以模型含义是否能够保持一致来划界，再决定团队、部署和数据所有权如何配合这个边界",
    notes: [
      [
        "限界上下文",
        "限界上下文明确一个模型在哪些条件和范围内适用，范围外即使使用同一个词，也不能自动继承相同含义。",
      ],
      [
        "显式边界",
        "边界要能在团队责任、代码入口、数据交换和运行接口上被看到；模糊边界会让模型在不知不觉中混合。",
      ],
      [
        "持续集成",
        "同一上下文内的成员频繁合并并验证模型一致性，尽早发现两套含义正在分叉，而不是等到发布时才整合。",
      ],
      [
        "翻译",
        "跨上下文协作时，把外部消息映射为本地模型可理解的含义；翻译既保护本地语言，也明确不可无损转换的部分。",
      ],
      [
        "局部通用语言",
        "通用语言只在上下文内通用，同名术语可以在其他上下文拥有不同属性和生命周期，这不是重复，而是明确语境。",
      ],
    ],
    zones: [
      { label: "订单上下文", detail: "客户是下单与履约参与者" },
      { label: "翻译边界", detail: "映射身份、状态和允许的语义损失" },
      { label: "风控上下文", detail: "客户是被评估的风险主体" },
    ],
    trace: [
      "发现术语冲突",
      "声明上下文",
      "指定模型所有者",
      "设计翻译",
      "持续集成验证",
    ],
    scenarios: [
      {
        label: "客户含义冲突",
        input: "订单关心收货资料，风控关心主体与风险关系",
        expected: "分别建模并在边界映射标识，不共享一个不断膨胀的 Customer",
      },
      {
        label: "仓库共用",
        input: "两个团队共用代码仓库但业务语言完全不同",
        expected: "仓库不是模型边界证据，仍需显式上下文和翻译合同",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-08",
    path: "02-ddd/tactical-patterns",
    title: "战术模式",
    focus:
      "在单一限界上下文内，用身份、属性值、无状态操作、一致性边界与重建机制表达模型",
    invariant:
      "聚合边界内的不变量在一次业务操作后成立，外部只通过聚合根引用内部对象",
    fault: "把实体、值对象、服务、仓储逐一对应到数据库表、DTO 和通用 CRUD 类",
    evidence:
      "对象身份合同、值相等测试、聚合命令、事务边界、工厂后置条件、仓储接口与领域事件",
    sourceIds: ["ddd-book", "ddd-reference", "ddd-reference-pdf"],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "战术模式定义以 Evans 官方 DDD Reference 公开摘要为准；示例只用于展示模式协作，不主张存在一个适合所有领域的固定代码骨架。",
    decision:
      "先写出业务身份与不变量，再选择最少的战术模式支撑它们；数据存储形状不能反向决定领域对象职责",
    notes: [
      [
        "实体",
        "实体由连续身份而不是当前属性定义；属性会变，系统仍须知道前后是同一个领域对象并维护其生命周期。",
      ],
      [
        "值对象",
        "值对象由描述性属性整体定义，没有业务身份，通常保持不可变；相等判断比较值，替换整个对象比修改局部更清晰。",
      ],
      [
        "领域服务",
        "当重要领域操作不自然属于某个实体或值对象时，用无状态服务表达；它的名称和参数仍必须来自通用语言。",
      ],
      [
        "聚合",
        "聚合划定一致性边界并指定根，外部通过根发出命令；边界应由必须同步成立的不变量决定，而非对象图大小。",
      ],
      [
        "工厂",
        "工厂封装复杂创建过程，交付满足不变量的完整对象；调用者表达创建意图，无需知道内部装配细节。",
      ],
      [
        "仓储",
        "仓储提供面向领域的聚合获取与保存抽象，使持久化看起来像集合操作；接口不应泄漏查询引擎细节。",
      ],
      [
        "领域事件",
        "领域事件记录模型内已经发生且对业务有意义的事实，可驱动同一上下文或边界外的后续反应。",
      ],
    ],
    zones: [
      { label: "身份与值", detail: "实体保持连续身份，值对象表达属性组合" },
      { label: "一致性边界", detail: "聚合根执行命令并保护不变量" },
      { label: "创建与存取", detail: "工厂、仓储和事件连接生命周期" },
    ],
    trace: [
      "识别身份",
      "写出不变量",
      "确定聚合根",
      "完成合法创建",
      "保存并发布事实",
    ],
    scenarios: [
      {
        label: "订单加商品",
        input: "新增一项后总额和促销资格必须同步更新",
        expected: "通过订单聚合根执行命令，一次操作后所有聚合内不变量成立",
      },
      {
        label: "修改地址",
        input: "收货地址由街道、城市和邮编共同描述",
        expected: "以新的地址值对象整体替换，值相等不依赖数据库主键",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-09",
    path: "02-ddd/strategic-patterns",
    title: "战略模式：上下文映射",
    focus:
      "先记录上下文之间真实的模型与团队关系，再按控制力、协作成本和翻译需求选择集成模式",
    invariant:
      "每条上下文关系都有方向、所有者和语义合同，任何共享或遵奉选择都明确其变化传播代价",
    fault: "把 Context Map 画成无方向的系统调用拓扑，忽略上下游权力和模型翻译",
    evidence:
      "上下文地图、上下游方向、团队承诺、共享代码所有者、翻译测试、发布语言版本与退出条件",
    sourceIds: ["ddd-book", "ddd-reference", "ddd-reference-pdf"],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "上下文映射关系名称与意图来自 Evans 官方参考摘要；组织案例、退出条件和测试方法为独立教学设计，不复制原书叙事。",
    decision:
      "承认现有关系而不是粉饰它，根据双方控制力选择共享、协作、翻译、遵奉或彻底分离",
    notes: [
      [
        "上下文映射",
        "上下文映射给出模型边界及其关系的全局视图，重点是语义与团队协作，不只是网络连接或数据流拓扑。",
      ],
      [
        "共享内核",
        "两个上下文共同拥有一小部分模型与代码，任何修改都需协商和同步测试；共享范围必须刻意保持很小。",
      ],
      [
        "客户—供应商",
        "上游供应商根据下游客户的明确需求规划接口，下游可以协商优先级；关系是否有效取决于真实合作承诺。",
      ],
      [
        "遵奉者",
        "下游无力影响上游且翻译收益不足时，主动遵从上游模型；这是成本选择，不应伪装成共享语言。",
      ],
      [
        "防腐层",
        "下游用翻译层隔离外部模型，使内部通用语言不被上游概念侵入；它承担适配与语义转换而非简单转发。",
      ],
      [
        "开放主机服务与发布语言",
        "上游用稳定协议服务多个消费者，并发布可共同理解的交换语言，减少每个下游都建立专用集成的成本。",
      ],
      [
        "各行其道",
        "当集成价值低于协作和翻译成本时，两个上下文保持分离并各自解决问题，避免为了统一而制造更大耦合。",
      ],
      [
        "大泥球",
        "边界混乱的系统应被明确标记和隔离，外部上下文不要假设其内部模型稳定；新增开发应避免继续扩大污染范围。",
      ],
    ],
    zones: [
      { label: "上游模型", detail: "决定能力、发布节奏与交换合同" },
      { label: "关系策略", detail: "共享、协商、遵奉、翻译或分离" },
      { label: "下游模型", detail: "决定接受、保护或拒绝外部语义" },
    ],
    trace: [
      "盘点上下文",
      "标出上下游",
      "评估控制力",
      "选择关系模式",
      "定义版本与退出条件",
    ],
    scenarios: [
      {
        label: "支付平台接入",
        input: "支付上游无法按订单团队的术语修改接口",
        expected: "订单侧建立防腐层，把支付状态翻译为本地履约语言",
      },
      {
        label: "共享税则模型",
        input: "两个团队共同维护很小且高价值的税率计算内核",
        expected: "明确共享内核所有者、联合测试和变更协商，不扩大共享范围",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-10",
    path: "03-practice/cqrs-event-sourcing",
    title: "CQRS 与事件溯源",
    focus:
      "分别判断读写模型分离与事件日志作为事实源的必要性，并设计同步、重放和一致性边界",
    invariant:
      "命令只表达改变意图，查询不产生领域副作用；采用事件溯源时事件日志不可被事后改写",
    fault:
      "把 CQRS 等同于双数据库，把事件溯源等同于普通审计日志，并默认两者必须同时采用",
    evidence:
      "命令合同、查询投影、事件顺序、处理幂等键、重放结果、快照版本与一致性窗口",
    sourceIds: ["cqrs", "event-sourcing"],
    sourceBasis: "full-text",
    sourceUrl: SOURCES.cqrs,
    sourceNote:
      "本单元是明确标注的专题扩展，不属于两本主干书的共同原始目录。CQRS 与 Event Sourcing 分别依据 Fowler 的两篇原始文章独立核对。",
    decision:
      "先证明单模型确有读写张力或历史重建需求，再分别引入 CQRS、事件溯源及其必要基础设施",
    notes: [
      [
        "命令模型",
        "命令模型验证改变状态的业务意图并保护写侧不变量，不为查询方便而暴露可随意修改的数据结构。",
      ],
      [
        "查询模型",
        "查询模型针对读取场景塑形，可以预计算和反规范化；它不承担改变领域状态的职责。",
      ],
      [
        "读模型同步",
        "写侧结果通过事件或消息更新读投影，必须定义延迟、失败重试、幂等和重建方式，不能把同步过程当成自动可靠。",
      ],
      [
        "事件日志作为事实源",
        "事件溯源把对象发生的全部领域变化保存为事实序列，当前状态由事件重建；普通审计副本不具备这一权威地位。",
      ],
      [
        "重放与快照",
        "重放验证事件序列能恢复状态，快照只缩短恢复时间且必须能被丢弃重建；快照不能取代事件事实。",
      ],
      [
        "最终一致性",
        "读投影可能暂时落后于写侧，产品和接口必须声明可接受窗口、用户反馈和读己之写策略。",
      ],
      [
        "CQRS 与事件溯源可独立采用",
        "CQRS 关注命令和查询模型分离，事件溯源关注状态事实的存储方式；任一问题都不自动证明另一模式必要。",
      ],
    ],
    zones: [
      { label: "命令与事件", detail: "验证意图并形成不可改写的领域事实" },
      { label: "同步与重放", detail: "按顺序、幂等地构建可恢复状态" },
      { label: "查询投影", detail: "面向读取场景并声明一致性窗口" },
    ],
    trace: [
      "接收命令",
      "验证不变量",
      "追加领域事件",
      "更新查询投影",
      "重放核对状态",
    ],
    scenarios: [
      {
        label: "订单状态历史",
        input: "需要解释订单为什么从已支付转为退款完成",
        expected: "事件序列保留每次领域变化，重放得到同一当前状态和解释路径",
      },
      {
        label: "高频报表读取",
        input: "复杂报表读取远多于订单写入且形状完全不同",
        expected: "先评估独立查询投影；无需因此自动采用事件溯源",
      },
    ],
  }),
  page({
    unitId: "architecturedomaindesign-11",
    path: "03-practice/hexagonal-architecture",
    title: "六边形架构",
    focus:
      "把应用核心与用户、测试、批处理、数据库和设备隔开，通过端口声明意图、适配器翻译技术协议",
    invariant:
      "应用可以在没有真实用户界面和数据库时运行，外部技术通过端口接入而不改写内部业务语义",
    fault:
      "把六边形理解为必须存在六条边，或只把 Controller 改名 Adapter 而保留核心对框架的依赖",
    evidence:
      "端口清单、驱动与被驱动方向、适配器合同测试、无 UI 运行、内存存储替换与协议翻译样本",
    sourceIds: ["hexagonal"],
    sourceBasis: "full-text",
    sourceUrl: SOURCES.hexagonal,
    sourceNote:
      "本单元是专题扩展，依据 Alistair Cockburn 2005 年原始 Hexagonal Architecture 文章；六边形只是避免上下分层偏见的视觉约定，不是边数要求。",
    decision:
      "从应用与外部世界的交互意图识别端口，再为每种技术环境实现适配器，并让测试成为一等驱动者",
    notes: [
      [
        "系统内外",
        "六边形架构首先区分应用内部与外部世界，不以传统上下层暗示数据库天然位于业务逻辑之下。",
      ],
      [
        "端口",
        "端口是应用与外部交互的目的性接口，表达一类对话的协议；它属于应用边界，而不是具体技术连接器。",
      ],
      [
        "适配器",
        "适配器把 Web、命令行、测试、数据库或设备协议转换为端口语言，同一端口可以拥有多个技术实现。",
      ],
      [
        "驱动侧",
        "用户、自动化测试、批处理或其他程序从驱动侧发起应用行为；它们通过输入端口表达意图。",
      ],
      [
        "被驱动侧",
        "应用通过输出端口请求持久化、通知或外部服务，被驱动适配器完成具体技术操作。",
      ],
      [
        "用户界面与数据库隔离",
        "核心既不从界面控件读取业务输入，也不把数据库结构当领域模型；二者都可以独立更换和自动测试。",
      ],
      [
        "测试隔离",
        "测试适配器直接驱动端口并用内存适配器接管外部依赖，使应用逻辑在稳定、快速环境中完整运行。",
      ],
    ],
    zones: [
      { label: "驱动适配器", detail: "Web、CLI、批处理与自动化测试" },
      { label: "应用与端口", detail: "业务用例及输入输出交互意图" },
      { label: "被驱动适配器", detail: "数据库、消息、设备与外部服务" },
    ],
    trace: [
      "识别外部参与者",
      "定义输入端口",
      "执行应用行为",
      "调用输出端口",
      "替换适配器测试",
    ],
    scenarios: [
      {
        label: "无界面验收",
        input: "用测试脚本直接提交借书请求并检查结果",
        expected: "测试适配器驱动同一输入端口，不复制应用规则",
      },
      {
        label: "存储替换",
        input: "验收时用内存仓储，生产使用 SQL 仓储",
        expected: "两个适配器满足同一输出端口合同，应用核心无需分支判断",
      },
    ],
  }),
  page({
    role: "final-review",
    path: "03-practice/final-review",
    title: "架构与领域设计总复习",
    focus:
      "用一个订单履约切片串联依赖规则、限界上下文、战术模型、上下文映射与可选扩展",
    invariant:
      "每个设计选择都能追溯到一种具体变化压力，并能用边界测试或模型示例证伪",
    fault: "把所有模式堆进最终架构图，用术语数量代替边界清晰度和运行证据",
    evidence:
      "依赖图、上下文地图、聚合测试、端口合同、读模型延迟、事件重放与模式删除清单",
    sourceIds: [
      "ddd-reference",
      "clean-article",
      "cqrs",
      "event-sourcing",
      "hexagonal",
    ],
    sourceBasis: "authorized-sample",
    sourceUrl: SOURCES.dddReference,
    sourceNote:
      "总复习是平台原创综合案例，不对应原书结章。它只组合前述已标明来源的概念，并要求读者证明每种模式的必要性和可撤销边界。",
    decision:
      "从一个关键业务规则向外展开模型与技术边界，先构造最小可行结构，再让真实压力决定是否增加扩展模式",
    notes: [
      [
        "政策保护",
        "先让订单资格、价格和履约规则独立于界面与数据库运行，以依赖规则验证核心是否被外部细节控制。",
      ],
      [
        "语言划界",
        "订单、支付与仓储对状态和参与者有不同含义，应在各自限界上下文内保持语言一致并显式翻译。",
      ],
      [
        "一致性设计",
        "只把必须同步成立的规则放进同一聚合；跨上下文流程通过已发生事实协作，不制造全局大事务。",
      ],
      [
        "关系治理",
        "用上下文映射记录团队控制力和语义传播，选择防腐层、客户—供应商或分离时同时写出退出条件。",
      ],
      [
        "扩展取舍",
        "读写压力、历史重建和外部协议隔离分别支持 CQRS、事件溯源与六边形架构，三者没有默认绑定关系。",
      ],
      [
        "反例验收",
        "替换数据库、制造投影延迟、重放事件并注入错误翻译，观察第一个边界违例，而不是只验证快乐路径。",
      ],
    ],
    zones: [
      { label: "业务模型", detail: "语言、实体、值对象与聚合不变量" },
      { label: "协作边界", detail: "上下文关系、端口和翻译合同" },
      { label: "技术与扩展", detail: "适配器、投影、事件存储与运行证据" },
    ],
    trace: [
      "选核心规则",
      "划模型边界",
      "保护依赖方向",
      "设计上下文关系",
      "用反例删除过度设计",
    ],
    scenarios: [
      {
        label: "最小订单切片",
        input: "创建订单、计算价格并保存，不要求历史重建和专用报表",
        expected: "先使用用例、领域模型与存储端口，不引入 CQRS 或事件溯源",
      },
      {
        label: "演进后的履约",
        input: "读模型压力、审计重建和外部仓储协议都已被数据证明",
        expected:
          "分别引入投影、事件事实源和仓储适配器，并为每项保存独立验收证据",
      },
    ],
  }),
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function objectives(profile) {
  return `<Objectives>

- 能解释“${profile.title}”如何${profile.focus}
- 能逐项定位 ${profile.concepts.join("、")}，并说明每个概念在当前来源边界内承担什么责任
- 能按 ${profile.trace.join(" → ")} 推演“${profile.scenarios[0].label}”，检查“${profile.invariant}”
- 能注入“${profile.fault}”，依据${profile.evidence}定位越界、撤销并用同一情境重放

</Objectives>`;
}

function sourceSection(profile) {
  const sourceItems = profile.sourceIds
    .map((id) => {
      const source = FACT_SOURCES.find((item) => item.id === id);
      if (!source) throw new Error(`未知事实来源：${id}`);
      return `- [${source.title}](${source.url})：${source.use}`;
    })
    .join("\n");
  return `## 来源、版次与课程边界

${profile.sourceNote}

本专题不是某一本既有书的中文版，也不是把多位作者的文章拼成“原著章节”。课程主干分别取自 Eric Evans 的领域驱动设计体系与 Robert C. Martin 的整洁架构体系；CQRS、事件溯源和六边形架构始终标为扩展。以下链接承担不同事实责任：

${sourceItems}

本页采用独立中文重写。能从公开全文或授权摘要核对的定义才作为来源事实；项目情境、交互实验、取舍表和练习答案均为本站教学设计。`;
}

function conceptSection(profile) {
  return profile.notes
    .map(
      ([concept, note], index) => `### ${concept}

${note} 在“${profile.scenarios[index % 2].label}”中，观察重点是${index % 2 === 0 ? profile.invariant : profile.evidence}。`,
    )
    .join("\n\n");
}

function experimentSection(profile, componentBase) {
  const checklist = profile.concepts
    .map(
      (concept, index) =>
        `${index + 1}. ${concept}：写出它所在的边界、允许的依赖方向、一个最小反例和一份可观察证据。`,
    )
    .join("\n");
  return `## 先预测，再操作三个本页实验

<Stepper>
  <Step title="实验一：边界与模型地图">

    操作前先预测“${profile.scenarios[0].label}”里哪一侧拥有规则、哪一侧只是技术或协作细节。切换概念和情境后，检查“${profile.decision}”是否仍能解释三块区域的责任。

    <${componentBase}BoundaryLab />

  </Step>

  <Step title="实验二：逐步决策轨迹">

    依次执行 ${profile.trace.join(" → ")}。每次只推进一步，并记录${profile.evidence}；若“${profile.invariant}”提前失效，就停在当前决策，不要用后续适配补救。

    <${componentBase}TraceLab />

  </Step>

  <Step title="实验三：违规注入与恢复">

    注入“${profile.fault}”，观察边界状态怎样从通过变为越界。撤销后用完全相同的“${profile.scenarios[1].label}”重放；只有依赖、语言与结果一起恢复才算修复。

    <${componentBase}ViolationLab />

  </Step>
</Stepper>

## 易错边界与取舍

<Callout type="trap" title="不要把图形当成架构">
  “${profile.title}”的价值不来自画了几层、几个圆或几个六边形，而来自可执行约束。必须用${profile.evidence}证明“${profile.invariant}”真实成立。
</Callout>

<Callout type="trap" title="不要让技术名词替代模型">
  ${profile.fault}。若概念只出现在目录名、类名或云产品配置中，却无法预测业务状态和越界位置，就还没有形成可用设计。
</Callout>

<Callout type="trap" title="模式必须能被删除">
  当前选择只对“${profile.scenarios[0].input}”这样的压力成立。如果更简单实现同样保持不变量，应该删除多余边界、消息或抽象，而不是为模式完整性保留它们。
</Callout>

## 练习与答案

<Exercises>

**问题 1：概念—边界—证据对照。** 完成以下逐项核对：

${checklist}

<Answer>
  对每个概念先确定它属于业务政策、模型协作还是外部技术，再画允许的依赖方向。用“${profile.scenarios[0].input}”建立正常基线，用“${profile.fault}”作为单一反例，最后从${profile.evidence}中找第一处不一致。
</Answer>

**问题 2：最小情境推演。** 怎样验证“${profile.scenarios[0].label}”没有靠最终功能碰巧通过？

<Answer>
  按 ${profile.trace.join(" → ")} 保存每步状态，预期结果是“${profile.scenarios[0].expected}”。最终输出之外，还要逐步确认“${profile.invariant}”；任一中间状态越界都应拒绝当前设计。
</Answer>

**问题 3：替代方案与恢复。** 注入“${profile.fault}”后，怎样比较修复与更简单方案？

<Answer>
  先保留故障前的${profile.evidence}，再记录首个越界位置。分别实施最小修复和删除多余模式的方案，用同一个“${profile.scenarios[1].input}”重放；选择仍满足“${profile.scenarios[1].expected}”且依赖更少的方案。
</Answer>

</Exercises>`;
}

function render(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  return `import {
  ${componentBase}BoundaryLab,
  ${componentBase}TraceLab,
  ${componentBase}ViolationLab,
} from "@/components/mdx/${BOOK}/v2/${slug}";
import {
  Objectives,
  Callout,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

${objectives(profile)}

{/* ARCHITECTURE_DOMAIN_DESIGN_QUALITY_V2 */}

## 为什么从“${profile.decision}”开始

${profile.focus}。本页先画责任和依赖，再沿具体情境执行决策，最后主动制造一个边界违规；这种顺序把术语变成可以验证、推翻和恢复的设计合同。

“${profile.title}”不是技术采购建议。它处理的是规则放在哪里、模型在哪个语境内成立、哪些变化可以被隔离，以及团队如何判断一条边界已经被穿透。最终功能可运行，只能证明快乐路径存在，不能证明结构允许安全演进。

${sourceSection(profile)}

## 核心概念与可观察责任

${conceptSection(profile)}

## 一条可执行的设计判断

本页采用以下判断链：**${profile.decision}**。正常情况下必须持续保持“${profile.invariant}”；反例“${profile.fault}”只改变一个关键条件，便于定位因果。

| 观察项 | 本页合同 |
| --- | --- |
| 最小正常情境 | ${profile.scenarios[0].input} |
| 边界或迁移情境 | ${profile.scenarios[1].input} |
| 必须保持 | ${profile.invariant} |
| 首要违规 | ${profile.fault} |
| 验收证据 | ${profile.evidence} |

${experimentSection(profile, componentBase)}

## 本页小结

- ${profile.title}的核心判断是：${profile.decision}。
- 正常路径以“${profile.scenarios[0].expected}”验收，不能只检查接口返回成功。
- 边界路径以“${profile.scenarios[1].expected}”验收，并保存${profile.evidence}。
- 如果“${profile.fault}”仍可静默通过，说明边界只是图示，没有成为可执行约束。

<Attribution
  mode="independent-rewrite"
  sourceBasis="${profile.sourceBasis}"
  workTitle="架构与领域设计：DDD、Clean Architecture 与明确标注的扩展资料"
  adaptedUrl="${profile.sourceUrl}"
/>`;
}

function wrapperSource(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const model = {
    unitId: profile.unitId ?? profile.role,
    title: profile.title,
    focus: profile.focus,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    concepts: profile.concepts,
    zones: profile.zones,
    trace: profile.trace,
    scenarios: profile.scenarios,
  };
  return `"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies ArchitectureCourseModel;

export function ${componentBase}BoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function ${componentBase}TraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function ${componentBase}ViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
`;
}

const FACT_SOURCES = [
  {
    id: "ddd-book",
    title: "Pearson: Domain-Driven Design",
    url: SOURCES.dddBook,
    use: "核对 Eric Evans、第一版、出版信息与原书身份，不据此声称拥有全文",
  },
  {
    id: "clean-book",
    title: "Pearson: Clean Architecture",
    url: SOURCES.cleanBook,
    use: "核对 Robert C. Martin、第一版、2017 年与正式目录范围",
  },
  {
    id: "ddd-reference",
    title: "Eric Evans: Domain-Driven Design Reference",
    url: SOURCES.dddReference,
    use: "核对 DDD 定义、模式摘要、增补范围与 CC 授权说明",
  },
  {
    id: "ddd-reference-pdf",
    title: "Domain-Driven Design Reference PDF",
    url: SOURCES.dddReferencePdf,
    use: "核对分层、限界上下文、战术模式和上下文映射的公开摘要正文",
  },
  {
    id: "clean-article",
    title: "Robert C. Martin: The Clean Architecture",
    url: SOURCES.cleanArticle,
    use: "核对独立性目标、四层、依赖规则、跨边界控制流与简单边界数据",
  },
  {
    id: "cqrs",
    title: "Martin Fowler: CQRS",
    url: SOURCES.cqrs,
    use: "核对命令与查询模型分离、适用压力、复杂度和同步代价",
  },
  {
    id: "event-sourcing",
    title: "Martin Fowler: Event Sourcing",
    url: SOURCES.eventSourcing,
    use: "核对事件序列作为事实源、状态重建、重放和外部更新问题",
  },
  {
    id: "hexagonal",
    title: "Alistair Cockburn: Hexagonal Architecture",
    url: SOURCES.hexagonal,
    use: "核对内外边界、端口、适配器、无 UI/数据库运行与自动化测试动机",
  },
];

function updateManifest(document) {
  const manifest = document.books?.[BOOK];
  if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
  const formalPages = PAGES.filter((profile) => profile.unitId);
  if (formalPages.length !== 11) {
    throw new Error(`正式单元应为 11，实际 ${formalPages.length}`);
  }

  manifest.edition =
    "平台组合课程《架构与领域设计》：Eric Evans《Domain-Driven Design》（2003）与 Robert C. Martin《Clean Architecture》（2017）为主干，CQRS、Event Sourcing、Hexagonal Architecture 为明确标注的扩展";
  manifest.sourceKind =
    "curated-multi-source-curriculum-with-publisher-metadata-author-reference-and-primary-articles";
  manifest.sourceUrl = SOURCES.dddBook;
  manifest.secondarySourceUrls = [
    SOURCES.cleanBook,
    SOURCES.dddReference,
    SOURCES.dddReferencePdf,
    SOURCES.cleanArticle,
    SOURCES.cqrs,
    SOURCES.eventSourcing,
    SOURCES.hexagonal,
  ];
  manifest.status = "verified-outline";
  manifest.verifiedAt = "2026-07-30";
  manifest.disclosureNote =
    "本条目明确是平台组合课程，不是单一本原著或合译本。DDD 与 Clean Architecture 构成主干；CQRS、事件溯源、六边形架构按其各自原始文章标为扩展。";
  manifest.sourceAccess = "authorized-sample";
  manifest.sourceMode = "independent-rewrite";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.unitMappingEvidence =
    "quality/architecture-domain-design-v2-profiles.json";
  manifest.factSourcePolicy =
    "出版社页面只核对书名、作者、版次与目录；DDD 定义以 Evans 授权参考摘要核对，整洁架构与三个扩展以作者原始文章核对。课程案例和练习必须标为独立教学设计。";
  manifest.factSources = FACT_SOURCES.map(({ id, title, url }) => ({
    id,
    title,
    url,
  }));
  manifest.units = formalPages.map((profile) => ({
    id: profile.unitId,
    title: profile.title,
    concepts: [
      [profile.title],
      ...profile.concepts.map((concept) => [concept]),
    ],
    sourceUnitId: profile.unitId,
    chapterPath: profile.path,
    sourceMode: "independent-rewrite",
    sourceAccess: profile.sourceBasis,
    factSourceIds: profile.sourceIds,
  }));
  manifest.coverage = {
    formalUnits: formalPages.length,
    mappedUnits: formalPages.length,
    ratio: 1,
    platformPages: PAGES.length,
  };
  manifest.metrics = {
    formalUnits: formalPages.length,
    formalNodes: manifest.units.reduce(
      (total, unit) => total + unit.concepts.length,
      0,
    ),
    coursePages: PAGES.length,
    interactiveViews: PAGES.length * 3,
    reviewQuestions: PAGES.length * 3,
  };
  manifest.visualImplementation = {
    viewsPerPage: 3,
    modes: ["boundary", "trace", "violation"],
    sharedComponent:
      "src/components/mdx/architecture-domain-design/v2/architecture-boundary-lab.tsx",
  };
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
updateManifest(document);
fs.mkdirSync(COMPONENT_DIR, { recursive: true });

for (const profile of PAGES) {
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.title}围绕 ${profile.concepts.length} 个章专属概念，以边界模型、决策轨迹、违规恢复和来源分层完成验收。`,
    demo: true,
    draft: false,
    sourceUrl: profile.sourceUrl,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  delete data.officialUnitId;
  if (profile.unitId) data.officialUnitId = profile.unitId;
  fs.writeFileSync(filePath, matter.stringify(render(profile), data));
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${path.basename(profile.path)}.tsx`),
    wrapperSource(profile),
  );
}

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(document, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      curriculumKind: "curated-multi-source",
      sourceMode: "independent-rewrite",
      sourceAccess: "authorized-sample",
      primaryBooks: ["Domain-Driven Design", "Clean Architecture"],
      explicitExtensions: ["CQRS", "Event Sourcing", "Hexagonal Architecture"],
      pages: PAGES,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: PAGES.length,
      formalUnits: PAGES.filter((profile) => profile.unitId).length,
      formalConceptGroups: document.books[BOOK].metrics.formalNodes,
      visualViews: PAGES.length * 3,
    },
    null,
    2,
  ),
);
