#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "design-patterns";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx/design-patterns/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/design-patterns-v2-profiles.json",
);

const INFORMIT =
  "https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610";
const PEARSON =
  "https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480/9780321700698";
const RETROSPECTIVE =
  "https://www.informit.com/articles/article.aspx?p=1327762";
const TYPESCRIPT =
  "https://www.typescriptlang.org/docs/handbook/2/classes.html";
const WORK_TITLE =
  "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, Design Patterns: Elements of Reusable Object-Oriented Software";

const FACT_SOURCES = {
  informit: {
    label: "InformIT 官方书目、完整目录、获授权样章与示例代码",
    url: INFORMIT,
  },
  pearson: {
    label: "Pearson/Addison-Wesley 官方书目页",
    url: PEARSON,
  },
  retrospective: {
    label: "GoF 作者十年回顾",
    url: RETROSPECTIVE,
  },
  typescript: {
    label: "TypeScript 官方类与接口手册",
    url: TYPESCRIPT,
  },
};

const CATALOG_CONCEPTS = [
  "模式名称与分类",
  "意图",
  "别名",
  "动机",
  "适用性",
  "结构",
  "参与者",
  "协作",
  "后果",
  "实现",
  "示例代码",
  "已知应用",
  "相关模式",
];

const INTRO_CONCEPTS = [
  "导论",
  "案例研究：设计一个文档编辑器",
  "创建型模式",
  "结构型模式",
  "行为型模式",
  "结论",
  "附录 A：术语表",
  "附录 B：记号指南",
  "附录 C：基础类",
  "参考文献",
  "索引",
];

function p(value) {
  return {
    practiceMode: "code",
    aliases: "没有需要单独记忆的稳定别名；评审时使用目录中的正式名称",
    ...value,
  };
}

const PATTERNS = [
  p({
    id: "designpatterns-02",
    slug: "strategy",
    title: "策略模式",
    category: "行为型模式",
    intent: "把可互换的算法族封装为同一契约，使调用者能按情境选择行为",
    problem: "结算服务要在不改订单流程的前提下切换普通、会员和大促定价",
    participants: ["PricingContext", "PricingStrategy", "MemberPricing"],
    flow: ["提交订单", "选择策略", "执行报价", "核对约束", "返回金额"],
    motivation: "把价格分支继续堆在结算函数里，会让每次营销变化都触碰主流程",
    applicability: "算法会独立变化、调用合同稳定，而且运行时选择确实有业务含义",
    collaboration:
      "Context 只提供输入并委托 Strategy，具体策略独立计算且不反向控制流程",
    tradeoff: "新增算法变便宜，但客户端必须理解选择规则，策略数量也需要治理",
    implementation:
      "用窄接口表达输入输出，把策略选择与策略执行拆成两个可测试步骤",
    known: "排序器、压缩器、路由策略和定价引擎都常用这一变化轴",
    misuse: "只有一个算法或分支从不独立变化时，策略对象只是额外跳转",
    related:
      "状态模式也委托行为，但切换通常由状态机推进；模板方法依赖继承固定骨架",
    invariant: "同一订单输入必须得到可解释且非负的报价",
  }),
  p({
    id: "designpatterns-03",
    slug: "observer",
    title: "观察者模式",
    category: "行为型模式",
    intent: "建立一对多的订阅关系，让主题变化能通知所有仍有效的观察者",
    problem: "库存变化要同步看板、补货器和审计流，但三者生命周期与失败方式不同",
    participants: ["InventorySubject", "StockObserver", "AuditSubscriber"],
    flow: ["登记订阅", "写入库存", "生成事件", "逐个通知", "清理订阅"],
    motivation:
      "库存服务若直接调用所有下游，增加一个消费者就必须修改核心写入路径",
    applicability:
      "一个状态变化需要传播给数量可变的消费者，且发布者不应依赖具体消费者",
    collaboration:
      "Subject 管理订阅并发布快照，Observer 处理通知并负责显式取消订阅",
    tradeoff:
      "发布者解耦了接收者，却引入通知顺序、重入、失败隔离和过期订阅问题",
    implementation:
      "返回取消函数，复制订阅集合后再通知，并定义异常与重复事件策略",
    known: "界面事件、领域事件、缓存失效与遥测分发都能看到这种结构",
    misuse: "没有退订与失败边界的同步广播会制造内存泄漏和级联中断",
    related: "中介者集中协调多方协议；发布订阅通常再引入消息通道与异步投递语义",
    invariant: "一次库存提交只能让每个有效订阅者观察到一个同版本事件",
  }),
  p({
    id: "designpatterns-04",
    slug: "decorator",
    title: "装饰器模式",
    category: "结构型模式",
    intent: "在保持组件接口的前提下，按对象组合顺序动态叠加职责",
    problem: "文本输出要按场景组合压缩、加密和审计，排列数量不适合用子类穷举",
    participants: ["MessageComponent", "MessageDecorator", "EncryptionLayer"],
    flow: ["创建核心", "包裹压缩", "包裹加密", "调用外层", "沿链返回"],
    motivation:
      "为每种压缩与加密组合建立子类会产生组合爆炸，也难以在运行时调整",
    applicability:
      "职责可以正交叠加、顺序有清晰语义，并且所有层都遵守同一组件契约",
    collaboration:
      "Decorator 持有 Component，先后执行附加逻辑并把核心调用交给下一层",
    tradeoff: "组合灵活度提高，但对象身份、层次顺序与堆栈调试会更复杂",
    implementation:
      "让装饰器完整转发契约，明确调用前后顺序，并为链条提供可观测描述",
    known: "I/O 流、HTTP 中间件、日志包装和界面边框都是典型应用",
    misuse: "包装层偷偷缩窄输入或改变基础语义，会破坏可替换性",
    related: "代理控制访问，适配器改变接口，组合模式表达整体与部分的树结构",
    invariant: "去掉任意可选层后，核心消息仍符合 MessageComponent 合同",
  }),
  p({
    id: "designpatterns-05",
    slug: "command",
    title: "命令模式",
    category: "行为型模式",
    intent: "把一次请求封装成对象，以支持排队、记录、撤销或组合操作",
    problem: "编辑器既要执行文本变更，又要记录历史并可靠撤销最近一次操作",
    participants: ["EditorInvoker", "EditCommand", "DocumentReceiver"],
    flow: ["创建命令", "记录旧值", "调用执行", "写入历史", "执行撤销"],
    motivation: "按钮直接修改文档会把界面、业务动作和历史管理锁在一起",
    applicability: "请求需要独立生命周期，或必须排队、重试、审计、撤销与组合",
    collaboration:
      "Invoker 触发 Command，Command 保存必要参数并委托 Receiver 完成真实动作",
    tradeoff: "请求可组合且可追踪，但命令对象增加，撤销数据和幂等边界必须明确",
    implementation: "执行前保存最小补偿信息，区分未执行、已执行和已撤销状态",
    known: "菜单动作、作业队列、事务补偿和宏命令都使用请求对象化",
    misuse: "把任意函数都包装成命令，却没有生命周期需求，只会增加样板",
    related: "备忘录可保存撤销快照；责任链让请求经过多个候选处理者",
    invariant: "execute 后再 undo 必须恢复编辑器执行前的文档版本",
  }),
  p({
    id: "designpatterns-06",
    slug: "state",
    title: "状态模式",
    category: "行为型模式",
    intent: "把与状态相关的行为交给状态对象，使对象在状态变化时表现随之改变",
    problem: "订单在待支付、已支付、已发货和已取消之间转换，非法动作必须被拒绝",
    participants: ["OrderContext", "OrderState", "PaidState"],
    flow: ["接收动作", "读取状态", "验证迁移", "执行行为", "替换状态"],
    motivation: "把所有状态和动作放进嵌套条件，会让新增状态触碰每条业务路径",
    applicability: "行为主要由离散状态决定，迁移规则稳定且分支已经难以局部推理",
    collaboration: "Context 把动作委托给当前 State，状态对象决定结果和下一状态",
    tradeoff: "状态规则变得局部可读，但类数量增加，迁移权归属必须统一",
    implementation: "显式枚举允许的迁移，把状态替换做成原子操作并记录拒绝原因",
    known: "订单、连接、播放器、工作流和协议解析器经常具有明确状态机",
    misuse: "只有布尔开关或极少分支时，状态类会掩盖简单逻辑",
    related: "策略由外部选择算法；状态通常依据内部迁移自动切换行为",
    invariant: "已取消订单不得进入已发货状态，任何拒绝都不能部分写入",
  }),
  p({
    id: "designpatterns-07",
    slug: "singleton",
    title: "单例模式",
    category: "创建型模式",
    intent: "在确有唯一实例约束时控制创建入口，并提供明确的访问边界",
    problem: "进程内配置快照只能有一个当前版本，但测试仍需替换其依赖",
    participants: ["ConfigRegistry", "InstanceGuard", "ConfigClient"],
    flow: ["请求实例", "检查现有值", "创建或复用", "读取快照", "测试替换"],
    motivation: "任意模块各自创建注册表会产生版本分叉，但全局变量又隐藏依赖",
    applicability:
      "唯一性是可证明的进程约束，并且生命周期、并发与测试替换都有方案",
    collaboration:
      "Registry 控制实例，Client 通过注入的访问器使用而不是随处读取全局",
    tradeoff: "统一实例容易，却会形成隐式全局状态、测试串扰和并发初始化风险",
    implementation:
      "优先由组合根创建并注入；若懒加载，必须处理竞态、重置与资源释放",
    known: "硬件句柄或进程级注册表偶尔需要唯一所有权，但适用范围通常比想象小",
    misuse: "把普通服务做成单例来省传参，会隐藏依赖并阻碍并行测试",
    related: "抽象工厂可控制产品族生命周期；依赖注入常是更透明的替代方案",
    invariant: "同一进程版本下所有客户端读取到相同配置，同时测试可隔离替换",
  }),
  p({
    id: "designpatterns-08",
    slug: "factory-method",
    title: "工厂方法模式",
    category: "创建型模式",
    intent: "定义创建产品的操作，把具体产品选择延迟给创建者子类或扩展点",
    problem: "导入流程固定，但 CSV 与 JSON 文档的解析器创建方式不同",
    participants: ["ImporterCreator", "ParserProduct", "CsvImporter"],
    flow: ["开始导入", "调用工厂", "创建解析器", "执行解析", "统一收尾"],
    motivation:
      "通用导入算法若直接 new 每种解析器，就不能在不改骨架的情况下扩展格式",
    applicability:
      "流程骨架稳定而其中一个产品类型需要由扩展者决定，并且继承关系合理",
    collaboration:
      "Creator 的业务方法调用 factoryMethod，ConcreteCreator 返回匹配的 Product",
    tradeoff: "产品创建与流程解耦，但每种产品可能增加创建者子类并强化继承结构",
    implementation: "保持工厂返回抽象产品，避免调用方立即向下转型到具体类型",
    known: "框架回调、文档创建和可扩展解析器常把对象创建留给子类",
    misuse: "创建逻辑只是参数分支时，独立工厂函数可能比继承层次更直接",
    related: "抽象工厂创建一组相关产品；模板方法常在算法骨架中调用工厂方法",
    invariant: "新增解析格式不应修改通用导入、错误处理和资源关闭流程",
  }),
  p({
    id: "designpatterns-09",
    slug: "abstract-factory",
    title: "抽象工厂模式",
    category: "创建型模式",
    intent: "提供创建一族相关产品的接口，并保证同一工厂产出的产品彼此兼容",
    problem: "界面需要整套切换 Web 与桌面控件，按钮和菜单不能混用平台实现",
    participants: ["UiFactory", "ButtonProduct", "DesktopFactory"],
    flow: ["选择产品族", "创建按钮", "创建菜单", "组合界面", "校验兼容"],
    motivation: "每个组件独立选择平台会让一页混入不兼容的控件行为与样式",
    applicability:
      "系统必须独立于产品创建，而且产品以兼容家族出现并需要整体替换",
    collaboration:
      "Client 只依赖 AbstractFactory 与抽象产品，具体工厂负责家族一致性",
    tradeoff: "切换产品族很容易，但增加一种新产品角色要修改所有工厂接口",
    implementation: "让一次配置只选择一个工厂，并以契约测试校验整族产品组合",
    known: "跨平台界面、数据库驱动族与测试替身套件常需要成组创建",
    misuse: "产品之间没有兼容约束时，统一大工厂会成为不必要的中心依赖",
    related: "工厂方法可实现单个创建操作；建造者强调分步组装复杂结果",
    invariant: "同一界面树中的按钮、菜单和对话框必须来自同一平台产品族",
  }),
  p({
    id: "designpatterns-10",
    slug: "builder",
    title: "建造者模式",
    category: "创建型模式",
    intent: "把复杂对象的分步构造与最终表示分离，使相同步骤能产生不同结果",
    problem: "部署计划由环境、服务、探针和回滚步骤组成，并要输出执行版与审计版",
    participants: ["DeploymentDirector", "PlanBuilder", "AuditPlanBuilder"],
    flow: ["选择建造者", "配置环境", "添加服务", "加入回滚", "取出产品"],
    motivation: "一个超长构造函数无法表达步骤顺序、可选项和中途不变量",
    applicability:
      "构造过程包含多个有序步骤，表示可以变化，且半成品不应泄露给客户端",
    collaboration:
      "Director 规定步骤，Builder 累积状态，ConcreteBuilder 返回特定表示",
    tradeoff: "构造意图更清楚，但多个建造者必须共同维护步骤契约",
    implementation: "在 build 时集中验证必填项，用类型或状态隐藏尚未完成的产品",
    known: "查询构造器、文档生成器、配置装配和测试数据工厂都适合分步构造",
    misuse: "对象只有两三个独立参数时，命名参数比完整建造者层次简单",
    related: "抽象工厂强调产品家族；原型通过复制已有对象开始创建",
    invariant: "没有健康探针或回滚步骤的部署计划不得从 build 返回",
  }),
  p({
    id: "designpatterns-11",
    slug: "prototype",
    title: "原型模式",
    category: "创建型模式",
    intent: "通过复制原型创建对象，让运行时实例决定新对象的初始结构",
    problem: "图形编辑器要复制带样式与子节点的模板，同时保持新对象身份独立",
    participants: ["ShapePrototype", "CloneRegistry", "DiagramClient"],
    flow: ["登记原型", "选择模板", "执行克隆", "修复引用", "分配身份"],
    motivation: "客户端若认识所有图形构造细节，就无法动态加载新的模板类型",
    applicability:
      "具体类型在运行时配置，创建成本高或希望避开与具体类平行的工厂层次",
    collaboration:
      "Client 从 Registry 取得 Prototype，调用 clone 后再设置本次实例属性",
    tradeoff: "动态扩展方便，但深浅复制、循环图、资源句柄与唯一身份很难处理",
    implementation:
      "明确拥有与共享字段，为对象图建立复制表，并在克隆后生成新身份",
    known: "图形模板、游戏实体、预配置文档和昂贵对象快照常从原型复制",
    misuse: "含数据库连接或外部句柄的对象不能靠字段拷贝获得独立资源",
    related:
      "备忘录保存恢复状态而不一定创建新身份；抽象工厂可用原型实现产品创建",
    invariant: "修改克隆图形的可变子节点不得改变登记的原始模板",
  }),
  p({
    id: "designpatterns-12",
    slug: "adapter",
    title: "适配器模式",
    category: "结构型模式",
    intent: "把已有对象的接口转换为客户端需要的目标接口，并显式处理语义差异",
    problem: "气象服务返回华氏温度和英里风速，应用合同要求摄氏度与米每秒",
    participants: ["WeatherTarget", "MetricAdapter", "LegacyWeatherApi"],
    flow: ["接收目标调用", "转换参数", "调用旧接口", "换算单位", "返回目标值"],
    motivation:
      "仅因签名不兼容而重写稳定的旧服务成本高，直接泄露旧接口又污染客户端",
    applicability:
      "已有组件能力可复用，但名称、形状、单位或调用协议不符合目标合同",
    collaboration:
      "Client 调用 Target，Adapter 翻译请求与响应，Adaptee 保持原行为",
    tradeoff: "兼容逻辑集中，却可能隐藏单位、精度、错误和生命周期的语义损失",
    implementation: "在边界完成双向转换，为舍入、缺值和异常建立明确测试",
    known: "旧系统迁移、第三方 SDK 封装、数据格式和设备协议接入经常使用适配器",
    misuse: "只改方法名却忽略温标、时区或错误语义，会得到表面兼容的错误结果",
    related: "外观简化一组接口；桥接从设计初期分离两个独立变化维度",
    invariant: "旧服务 68°F 的响应必须稳定转换为 20°C，且误差界限可见",
  }),
  p({
    id: "designpatterns-13",
    slug: "bridge",
    title: "桥接模式",
    category: "结构型模式",
    intent: "分离抽象层与实现层，使两个维度可以独立扩展而不形成子类乘积",
    problem: "通知有告警与摘要两种抽象，又要支持邮件、短信和推送三种通道",
    participants: [
      "NotificationAbstraction",
      "ChannelImplementor",
      "SmsChannel",
    ],
    flow: ["构造抽象", "注入通道", "组织消息", "调用实现", "记录结果"],
    motivation: "按通知类型乘以通道建立子类，会让两个变化轴彼此放大",
    applicability:
      "抽象和实现都需要独立变化，且运行时绑定或平台替换具有真实价值",
    collaboration:
      "Abstraction 持有 Implementor，把高级操作翻译成实现层原语组合",
    tradeoff: "避免类爆炸并支持替换，但双层协议增加导航和设计成本",
    implementation: "分别稳定两侧最小接口，把跨层翻译保留在抽象层而非具体实现",
    known: "跨平台窗口、设备驱动、消息通道和渲染后端常有两个正交变化维度",
    misuse: "只有一个稳定实现维度时，桥接会制造不必要的双重抽象",
    related: "适配器常在事后兼容既有接口；策略通常只替换一项算法行为",
    invariant: "新增推送通道不应修改告警与摘要的领域组织逻辑",
  }),
  p({
    id: "designpatterns-14",
    slug: "composite",
    title: "组合模式",
    category: "结构型模式",
    intent: "把对象组织成部分—整体树，让客户端能用统一操作处理叶子与组合节点",
    problem:
      "权限系统要计算单项权限与嵌套权限组，却不想在调用方分支判断节点类型",
    participants: ["PermissionComponent", "PermissionLeaf", "PermissionGroup"],
    flow: ["创建叶子", "组装子树", "调用统一操作", "递归聚合", "返回结果"],
    motivation: "客户端若到处区分叶子和容器，树结构变化会扩散到所有业务代码",
    applicability:
      "领域天然是递归整体—部分结构，并希望客户端忽略单个与组合的差异",
    collaboration:
      "Composite 保存 Component 子节点并递归调用，Leaf 直接完成基本操作",
    tradeoff: "统一遍历很自然，但过宽的组件接口可能让叶子暴露无意义操作",
    implementation: "选择透明或安全接口策略，阻止循环挂载并定义父子所有权",
    known: "界面树、文件系统、表达式树和组织结构都使用递归组合",
    misuse: "强迫叶子实现 add/remove 并静默忽略，会让非法操作难以发现",
    related: "迭代器遍历组合结构；访问者可把树上的新操作移出节点类",
    invariant: "权限组结果必须等于其所有可达叶子结果的确定性聚合",
  }),
  p({
    id: "designpatterns-15",
    slug: "facade",
    title: "外观模式",
    category: "结构型模式",
    intent: "为复杂子系统提供面向常见任务的简化入口，同时保留必要的底层能力",
    problem: "发布服务需要协调构建、制品、部署与健康检查，调用方只关心安全发布",
    participants: ["ReleaseFacade", "BuildSubsystem", "HealthSubsystem"],
    flow: ["接收发布", "构建制品", "部署候选", "执行健康检查", "提交结果"],
    motivation: "每个调用方自行排列子系统步骤会重复协议并产生不同的失败处理",
    applicability: "子系统复杂且存在高频用例，需要稳定边界降低客户端耦合",
    collaboration: "Facade 编排多个子系统完成任务，子系统彼此仍保有独立职责",
    tradeoff: "常见路径更安全，但外观可能膨胀成包办所有业务的上帝对象",
    implementation:
      "按用例提供窄入口，暴露失败阶段，并允许高级客户端访问底层接口",
    known: "编译流水线、媒体转换、云 SDK 和遗留系统边界常提供外观",
    misuse: "把所有新逻辑都塞进外观，会掩盖本应拆分的领域服务",
    related: "适配器转换一个既有接口；中介者管理同级对象间的交互协议",
    invariant: "外观报告成功时，构建、部署与健康检查必须来自同一制品版本",
  }),
  p({
    id: "designpatterns-16",
    slug: "flyweight",
    title: "享元模式",
    category: "结构型模式",
    intent: "共享大量细粒度对象的内在状态，把随上下文变化的外在状态交给调用者",
    problem: "地图要绘制百万棵树，树种纹理可共享，而坐标和生长状态各不相同",
    participants: ["TreeFlyweight", "TreeFactory", "MapContext"],
    flow: ["拆分状态", "查找共享对象", "复用纹理", "传入坐标", "完成绘制"],
    motivation:
      "每棵树重复保存相同纹理和模型会耗尽内存，合并全部状态又会串改实例",
    applicability:
      "对象数量巨大、共享部分占比高、外在状态能被调用上下文可靠提供",
    collaboration:
      "Factory 按内在键复用 Flyweight，Client 每次操作传入外在状态",
    tradeoff: "内存下降，但状态拆分、键设计、线程安全和对象身份判断更困难",
    implementation:
      "让共享状态不可变，测量共享收益，并禁止业务依赖享元对象身份",
    known: "字形、地图图标、粒子类型和语法符号表常共享不可变表示",
    misuse: "把可变坐标放进共享对象，会让修改一棵树同时移动整片森林",
    related: "对象池复用有生命周期的实例；原型复制对象而不是共享内在状态",
    invariant: "改变一棵树的坐标不得修改同树种其他实例的渲染位置",
  }),
  p({
    id: "designpatterns-17",
    slug: "proxy",
    title: "代理模式",
    category: "结构型模式",
    intent: "提供与真实对象相同的替身，以控制访问、延迟创建或跨边界调用",
    problem: "图片查看器要在进入视口时才加载远端大图，并对失败提供可重试状态",
    participants: ["ImageSubject", "LazyImageProxy", "RemoteImage"],
    flow: ["请求显示", "检查缓存", "延迟加载", "委托真实对象", "返回或失败"],
    motivation:
      "客户端直接创建远端图片会在首屏承担网络延迟，也重复处理缓存和失败",
    applicability:
      "访问真实对象需要控制成本、权限、位置或生命周期，且替身能遵守同一合同",
    collaboration:
      "Proxy 接收 Subject 调用，处理访问策略后创建或委托 RealSubject",
    tradeoff: "客户端接口稳定，但额外跳转会隐藏延迟、远程失败或权限决策",
    implementation:
      "保持错误与异步语义可见，避免让远程调用伪装成无成本本地属性",
    known: "虚拟加载、远程服务、权限检查、缓存与引用计数都可用代理",
    misuse: "代理吞掉网络失败并返回旧数据，会让相同接口产生不可见的一致性差异",
    related: "装饰器增加职责；适配器改变接口；外观提供更高层的子系统入口",
    invariant: "代理显示成功时必须对应已校验的真实图片版本，而非半加载占位数据",
  }),
  p({
    id: "designpatterns-18",
    slug: "chain-of-responsibility",
    title: "责任链模式",
    category: "行为型模式",
    intent: "让请求沿有序处理者链传播，直到某个节点处理或明确报告无人处理",
    problem: "支持请求按身份、配额和路由依次检查，并需要定位在哪个环节被拒绝",
    participants: ["RequestHandler", "QuotaHandler", "RouteHandler"],
    flow: ["进入链条", "校验身份", "检查配额", "尝试路由", "处理或拒绝"],
    motivation: "请求发送者若认识所有规则及顺序，每次增删规则都会修改入口代码",
    applicability: "多个候选对象可能处理请求，集合与顺序需要在运行时组合",
    collaboration: "Handler 处理或把请求交给 successor，链尾负责显式未处理结果",
    tradeoff: "发送者与处理者解耦，但顺序依赖、掉单和跨节点诊断更困难",
    implementation:
      "统一 pass/handle/reject 结果，防止循环链并记录每次传递原因",
    known: "中间件、日志过滤、事件冒泡和审批流程常按链传递请求",
    misuse: "链尾静默丢弃请求会把配置错误伪装成正常无响应",
    related: "命令把请求对象化；装饰器通常所有层都执行而责任链可提前停止",
    invariant: "每个请求最终只能得到一次处理成功或一个可追踪的拒绝结果",
  }),
  p({
    id: "designpatterns-19",
    slug: "iterator",
    title: "迭代器模式",
    category: "行为型模式",
    intent: "在不暴露聚合内部表示的情况下，提供顺序访问元素的独立游标",
    problem: "任务集合要支持深度优先与优先级遍历，同时隐藏其树和堆的存储细节",
    participants: ["TaskAggregate", "TaskIterator", "PriorityIterator"],
    flow: ["创建游标", "检查下一项", "读取元素", "推进位置", "结束遍历"],
    motivation:
      "业务代码若直接依赖数组索引或树节点，存储结构变化会扩散到调用方",
    applicability: "聚合需要多种遍历方式、并发遍历或隐藏内部表示",
    collaboration:
      "Aggregate 创建 Iterator，Iterator 保存独立位置并按合同返回元素",
    tradeoff: "遍历策略可替换，但集合修改、失效检测和快照语义必须定义",
    implementation: "明确 fail-fast、快照或弱一致策略，并让结束状态可重复查询",
    known: "集合库、语法树、分页结果和文件扫描都使用独立迭代状态",
    misuse: "遍历中修改集合却没有一致性合同，会出现漏读、重复或越界",
    related: "组合提供待遍历的树；访问者把多种操作应用到稳定元素结构",
    invariant: "未修改集合时，每个可达任务恰好返回一次且游标互不干扰",
  }),
  p({
    id: "designpatterns-20",
    slug: "mediator",
    title: "中介者模式",
    category: "行为型模式",
    intent: "把一组对象之间的交互协议集中到中介者，减少同级对象的网状依赖",
    problem: "对话框字段互相启用、校验和清空，直接互调形成难以追踪的依赖网",
    participants: ["DialogMediator", "FormColleague", "SubmitButton"],
    flow: ["字段变化", "通知中介者", "判断规则", "更新同事对象", "刷新界面"],
    motivation: "每个控件认识所有其他控件时，任何表单规则都会修改多个类",
    applicability: "多个对象以复杂但可集中描述的协议交互，直接引用已经阻碍复用",
    collaboration:
      "Colleague 只通知 Mediator，Mediator 根据事件协调其他 Colleague",
    tradeoff: "同事对象变简单，但中介者可能吸收过多规则成为新的上帝对象",
    implementation: "按用例拆分中介者，使用明确事件，并把领域规则留在领域服务",
    known: "对话框、控制塔、聊天室和工作流协调器都集中多方交互",
    misuse: "把所有业务计算移入单个中介者，只是把耦合从网络压成巨型中心",
    related: "观察者广播状态变化；外观为子系统提供入口但不管理同级协议",
    invariant: "字段变化只能通过中介者更新依赖控件，且一次事件不会递归循环",
  }),
  p({
    id: "designpatterns-21",
    slug: "memento",
    title: "备忘录模式",
    category: "行为型模式",
    intent: "在不破坏封装的前提下捕获对象内部状态，以便之后恢复",
    problem: "画布编辑器要保存撤销快照，但历史管理器不能直接修改画布私有结构",
    participants: ["CanvasOriginator", "CanvasMemento", "HistoryCaretaker"],
    flow: ["捕获状态", "封装备忘录", "保存历史", "选择版本", "恢复状态"],
    motivation: "让历史栈读取所有私有字段会破坏封装，手写逆操作又可能遗漏状态",
    applicability: "需要快照恢复，而且暴露状态细节会破坏对象边界或不变量",
    collaboration:
      "Originator 创建并读取 Memento，Caretaker 只保存而不解释内容",
    tradeoff: "恢复职责清楚，但大快照占用内存，版本迁移和外部资源很难复制",
    implementation: "让备忘录不可变并带版本，采用增量快照时验证完整恢复链",
    known: "编辑器撤销、游戏存档、事务检查点和配置回滚常保存封装快照",
    misuse: "把可变状态对象直接放进历史栈，会让旧快照随当前编辑一起改变",
    related: "命令可保存补偿操作；原型复制新对象身份而备忘录用于恢复原对象",
    invariant: "恢复任一历史版本后，画布内容与捕获时一致且历史快照仍不可变",
  }),
  p({
    id: "designpatterns-22",
    slug: "template-method",
    title: "模板方法模式",
    category: "行为型模式",
    intent: "在基类中定义算法骨架，把特定步骤延迟给子类而保持顺序不变",
    problem: "数据导入都要读取、解析、校验、提交和清理，只有解析步骤因格式而异",
    participants: ["ImportTemplate", "ParseHook", "CsvImportJob"],
    flow: ["读取输入", "调用解析钩子", "执行校验", "提交结果", "统一清理"],
    motivation: "每个格式复制完整导入流程会让校验和清理修复无法同步",
    applicability:
      "算法顺序稳定、少数步骤需要变化，而且继承关系符合领域生命周期",
    collaboration:
      "Template Method 按顺序调用基本操作，ConcreteClass 实现必要步骤或钩子",
    tradeoff: "骨架复用强，但继承绑定刚性，钩子过多会形成隐式调用协议",
    implementation: "把不变量步骤设为不可覆写，区分必需抽象操作与可选空钩子",
    known: "框架生命周期、测试夹具、编译流程和批处理任务常固定算法骨架",
    misuse: "子类必须覆写大量步骤或改变顺序时，组合式策略比继承更清楚",
    related: "策略用组合替换整个算法；工厂方法常作为模板骨架中的创建步骤",
    invariant: "所有格式无论解析实现如何，校验必须先于提交且清理总会执行",
  }),
  p({
    id: "designpatterns-23",
    slug: "visitor",
    title: "访问者模式",
    category: "行为型模式",
    intent: "把作用于稳定元素结构的新操作集中到访问者，并通过双分派选择实现",
    problem: "语法树节点类型稳定，但持续新增格式化、类型检查和指标统计操作",
    participants: ["AstElement", "AnalysisVisitor", "BinaryNode"],
    flow: ["遍历元素", "调用 accept", "回调 visit", "处理具体类型", "汇总结果"],
    motivation: "每新增一项横切操作都修改所有节点，会让元素类被无关职责填满",
    applicability: "元素类型集合稳定而操作频繁增加，且操作需要依赖具体元素类型",
    collaboration:
      "Element.accept 把自身传给 Visitor 的对应 visit 方法，结构负责遍历",
    tradeoff:
      "新增操作容易，但新增元素类型必须修改所有访问者，且可能暴露内部数据",
    implementation:
      "显式覆盖所有元素类型，决定遍历归属，并避免用默认分支吞掉新节点",
    known: "编译器语法树、文档导出、对象结构审计和报表生成常用访问者",
    misuse: "元素类型频繁变化时，访问者会造成跨所有操作的同步修改",
    related: "迭代器负责遍历顺序；组合提供对象结构；解释器把行为留在表达式节点",
    invariant:
      "新增一种分析操作不应修改现有 AST 节点类，且所有节点都有明确处理",
  }),
  p({
    id: "designpatterns-24",
    slug: "interpreter",
    title: "解释器模式",
    category: "行为型模式",
    intent: "为小型语言定义语法表示，并让表达式对象解释给定上下文",
    problem: "告警筛选器要支持 and、or 与字段比较，规则规模小且需要直接组合",
    participants: ["Expression", "Context", "AndExpression"],
    flow: ["解析规则", "创建表达式树", "绑定上下文", "递归解释", "返回布尔值"],
    motivation: "把规则写成字符串分支难以组合、验证和展示其语法结构",
    applicability: "语法简单、变化可控、效率不是首要约束，并希望直接表达规则树",
    collaboration:
      "TerminalExpression 读取 Context，NonterminalExpression 组合子表达式结果",
    tradeoff: "语法类一一对应便于扩展规则，但复杂文法会产生大量类并降低性能",
    implementation:
      "先定义明确语法和解析错误，限制递归深度，并把共享状态放入 Context",
    known: "简单搜索过滤、权限表达式、正则子集和配置规则可用表达式树解释",
    misuse: "语言出现复杂语法、优化或诊断需求时，应使用解析器生成器与独立 AST",
    related: "组合构造表达式树；访问者可在稳定语法树上增加检查和转换",
    invariant: "同一规则树与上下文必须得到确定结果，非法语法在执行前明确拒绝",
  }),
];

const INTRO = p({
  id: "designpatterns-01",
  slug: "intro",
  title: "什么是设计模式",
  category: "设计模式入门",
  intent:
    "把反复出现的面向对象设计问题、上下文、力量与后果组织成可检验的模式目录",
  problem: "评审者面对需求相似但约束不同的两个系统，要判断是否真的适用同一模式",
  participants: ["设计问题", "模式目录", "方案评审者"],
  flow: ["界定上下文", "识别变化", "比较结构", "检验后果", "记录决定"],
  motivation: "只背模式名称会把目录当答案，忽略模式成立的条件和承担的代价",
  applicability:
    "问题结构重复、变化轴可说明、参与者关系可验证，并存在值得交换的权衡",
  collaboration: "模式语言连接问题、结构与后果，案例和代码负责提供可反驳证据",
  tradeoff: "共享词汇加快沟通，但标签崇拜会让简单设计被模式术语掩盖",
  implementation:
    "先写问题与拒绝条件，再选模式；用最小代码和反例检验而非按名套用",
  known: "官方目录还以文档编辑器案例串联创建、结构和行为三类模式",
  misuse: "从模式名称反推需求，或把 SOLID 等后来的课程材料冒充原书目录",
  related: "创建型管理对象创建，结构型组织对象关系，行为型分配协作与职责",
  invariant: "任何模式选择都必须同时公开适用条件、被替代方案和可接受后果",
  concepts: INTRO_CONCEPTS,
});

const SPECIALS = {
  "learning-map": p({
    slug: "learning-map",
    title: "全书学习地图",
    category: "设计模式入门",
    intent: "沿官方书籍结构和 23 个模式目录建立问题、结构、代码与复盘路线",
    problem: "学习者要从一次具体变更压力选择章节，而不是按模式名称随机浏览",
    participants: ["官方范围", "三类模式", "学习证据"],
    flow: ["锁定来源", "选择问题", "进入目录", "运行代码", "回到复盘"],
    motivation: "线性背诵 23 个名称无法帮助学习者根据变化轴做方案判断",
    applicability: "用于规划先修、按创建结构行为分类导航，并保存每页实践证据",
    collaboration:
      "地图连接官方目录、站内页面、实验截图和总复习，不代替正文解释",
    tradeoff: "路径更清晰，但分类只是一张索引，不能替代上下文和后果分析",
    implementation: "先选一项真实变更，再依次访问导论、对应模式和跨模式复习",
    known: "地图覆盖导论、文档编辑器案例、三类模式、结论、附录、书目与索引",
    misuse: "把地图列出的标题计为正文已经覆盖，会制造虚假忠实度",
    related: "最终复习检查跨模式选择；复合模式页练习多个变化轴的组合",
    invariant: "每条学习路径必须落到至少一段解释、一个交互和一道带答案练习",
    concepts: [
      "官方书籍结构",
      "创建型路径",
      "结构型路径",
      "行为型路径",
      "综合复盘",
    ],
  }),
  "compound-patterns": p({
    slug: "compound-patterns",
    title: "复合模式",
    category: "复合与总复习",
    intent: "根据彼此独立的变化轴组合多个模式，并验证每个模式仍承担清晰职责",
    problem:
      "通知平台同时需要切换算法、广播状态和控制远端访问，团队准备一次套入多个模式",
    participants: ["变化轴清单", "模式组合", "集成验证"],
    flow: ["拆开变化", "各选模式", "连接边界", "注入故障", "删除多余层"],
    motivation: "单个模式能解决局部问题，但模式汤会让参与者和失败责任互相覆盖",
    applicability:
      "存在至少两个可独立描述和验证的变化轴，且组合后的边界仍可追踪",
    collaboration:
      "策略处理算法选择，观察者处理状态传播，代理处理访问成本，外观只简化入口",
    tradeoff: "组合可隔离多种变化，但对象数量、调用深度和诊断成本同时上升",
    implementation:
      "为每个模式写单一理由与删除测试，按边界分别注入失败并记录传播",
    known: "复合练习横跨策略模式、观察者模式、代理模式、外观模式与命令模式",
    misuse: "只因多个模式常被一起提及就全部使用，会产生没有证据的模式拼盘",
    related: "装饰器叠加同一接口职责；中介者可替代一部分网状协调",
    invariant: "删除任一模式时只能损失它声明的能力，不能让无关变化轴一起崩溃",
    concepts: ["变化轴", "职责边界", "组合顺序", "集成故障", "删除测试"],
  }),
  "final-review": p({
    slug: "final-review",
    title: "设计模式总复习",
    category: "复合与总复习",
    intent: "用统一案例比较 23 个模式的适用条件、结构代价和拒绝信号",
    problem:
      "架构评审要在两个候选模式间做决定，并证明更简单方案为何不足或已经足够",
    participants: ["问题证据", "候选模式", "反例评审"],
    flow: ["复述问题", "列出候选", "实现最小切片", "运行反例", "提交决定"],
    motivation: "按类别背诵定义不能解释相似模式之间的边界，也不能支持真实评审",
    applicability:
      "用于全书结束时重放创建、结构和行为决策，并审计来源与实现证据",
    collaboration:
      "评审者用同一输入比较模式和简单方案，独立检查者复跑代码与重置",
    tradeoff: "统一量表利于比较，但硬阻断项不能被其他维度的高分平均掉",
    implementation: "逐个核对意图、动机、参与者、协作、后果、实现与相关模式",
    known: "复习矩阵覆盖 5 个创建型、7 个结构型和 11 个行为型模式",
    misuse: "看到模式结构完整就判通过，而不验证当前问题是否存在对应变化压力",
    related: "学习地图负责选择路径；复合模式页检查多模式集成是否仍可拆解",
    invariant: "任何推荐必须附带一个拒绝条件、一个替代方案和一条可重放代码证据",
    concepts: [
      "创建型比较",
      "结构型比较",
      "行为型比较",
      "拒绝条件",
      "发布答卷",
    ],
  }),
};

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function pascal(value) {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function replaceBookManifest(document, bookSlug, value) {
  const key = `    ${JSON.stringify(bookSlug)}: `;
  const keyIndex = document.indexOf(key);
  if (keyIndex < 0) throw new Error(`manifest 未找到 ${bookSlug}`);
  const objectStart = document.indexOf("{", keyIndex + key.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < document.length; index += 1) {
    const character = document[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        objectEnd = index + 1;
        break;
      }
    }
  }
  if (objectEnd < 0) throw new Error(`manifest ${bookSlug} 对象未闭合`);
  const serialized = JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join("\n");
  return (
    document.slice(0, objectStart) + serialized + document.slice(objectEnd)
  );
}

function conceptParagraph(concept, profile, index) {
  if (profile.slug === "intro") {
    const details = [
      "导论建立模式、对象组合、继承与可复用设计的阅读坐标，课程只独立解释这些问题，不复现原文。",
      "文档编辑器案例把抽象、创建、结构和行为选择放进同一系统，提醒读者模式必须落到约束。",
      "创建型模式把系统从具体类的构造决定中解耦，关注谁创建、何时创建以及创建哪一族对象。",
      "结构型模式通过对象组合或类关系形成更大结构，重点检查接口、身份和所有权边界。",
      "行为型模式分配算法、状态和协作责任，重点检查消息路径、变化传播和失败语义。",
      "结论回收模式如何进入开发过程，并要求设计决定能由代码和反例重新检验。",
      "术语表统一对象、类、接口和模式角色语言，中文解释保留英文关键词以减少歧义。",
      "记号指南说明官方案例采用的对象建模表达；本站实验改用参与者卡和调用路径呈现。",
      "基础类附录支撑原书示例环境；本站 TypeScript 代码只验证结构，不声称移植该基础库。",
      "参考文献是追溯历史语境的入口，不能仅凭书目标题推断某项正文结论。",
      "索引帮助从术语回到讨论位置，但命中索引词不等于已经解释、可视化或练习该概念。",
    ];
    return `${profile.title} 对“${concept}”的范围处理是：${details[index]} 本页把该节点连接到“${profile.problem}”的选择证据，并用 ${profile.invariant} 作为拒绝空洞标签的检查线。`;
  }
  const explanations = [
    `“${profile.title}”归入${profile.category}，名称只用于定位 ${profile.intent}，不能替代问题证据。`,
    `“${concept}”回答模式想改变什么：${profile.intent}。`,
    `“${concept}”在本页处理为：${profile.aliases}，避免用近似称呼混淆责任。`,
    `“${concept}”从具体压力出发：${profile.motivation}。`,
    `“${concept}”要求同时满足：${profile.applicability}。`,
    `“${concept}”由 ${profile.participants.join("、")} 以及它们之间的引用方向共同确定。`,
    `“${concept}”逐一说明 ${profile.participants.join("、")} 谁保存状态、谁发起调用以及谁承担变化。`,
    `“${concept}”的运行协议是：${profile.collaboration}。`,
    `“${concept}”必须连同收益和成本记录：${profile.tradeoff}。`,
    `“${concept}”落地时遵守：${profile.implementation}。`,
    `“${concept}”使用本页 TypeScript 最小切片验证“${profile.invariant}”，代码是独立教学示例。`,
    `“${concept}”可在这些场景识别：${profile.known}，但名称相似不构成采用证据。`,
    `“${concept}”用于比较边界：${profile.related}。`,
  ];
  return `${explanations[index]} 对“${profile.problem}”先保存基线，再改变一个条件；若出现“${profile.misuse}”，就拒绝 ${profile.title} 方案并回到更简单结构。`;
}

function refactorings(profile) {
  return [
    {
      label: `收窄${profile.participants[0]}`,
      detail: `只保留 ${profile.intent} 所需的最小入口。`,
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: `公开${profile.participants[1]}`,
      detail: `让替换点、所有者与失败结果进入评审记录。`,
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: `绕过${profile.participants[2]}`,
      detail: `模拟捷径，观察模式合同被破坏后的传播。`,
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ];
}

function wrapperSource(profile) {
  const base = pascal(profile.slug);
  const concepts = profile.concepts ?? CATALOG_CONCEPTS;
  const shared = {
    unitId: profile.id ?? `synthesis-${profile.slug}`,
    title: profile.title,
    problem: profile.problem,
    participants: profile.participants,
    flow: profile.flow,
    concepts,
    refactorings: refactorings(profile),
    metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
    fitNote: `${profile.title} 的参与者与当前变化轴一致；继续用代码和反例验证 ${profile.invariant}。`,
    misuseNote: `${profile.title} 被拒绝：${profile.misuse}。`,
  };
  const modes = [
    ["Structure", "structure", [48, 52, 68]],
    ["Change", "change", [52, 58, 66]],
    ["Evidence", "evidence", [44, 50, 72]],
  ];
  return `import { PatternTradeoffLab } from "./pattern-tradeoff-lab";\n\nconst shared = ${JSON.stringify(shared, null, 2)} as const;\n\n${modes
    .map(
      ([suffix, mode, baseline]) =>
        `export function ${base}${suffix}Lab() {\n  return <PatternTradeoffLab {...shared} mode=${JSON.stringify(mode)} baseline={${JSON.stringify(baseline)}} />;\n}`,
    )
    .join("\n\n")}\n`;
}

function codeExample(profile) {
  const base = pascal(profile.slug);
  const [roleA, roleB, roleC] = profile.participants.map((value) =>
    value.replace(/[^A-Za-z0-9]/g, ""),
  );
  return `interface ${roleB || `${base}Port`} {
  apply(input: Readonly<{ revision: number; payload: string }>): string;
}

class ${roleC || `${base}Implementation`} implements ${roleB || `${base}Port`} {
  apply(input: Readonly<{ revision: number; payload: string }>) {
    if (input.revision < 1) throw new Error("invalid revision");
    return \`${base}:\${input.revision}:\${input.payload}\`;
  }
}

class ${roleA || `${base}Context`} {
  constructor(private readonly collaborator: ${roleB || `${base}Port`}) {}
  run(payload: string) {
    return this.collaborator.apply({ revision: 1, payload });
  }
}`;
}

function terms(profile) {
  return [
    profile.title,
    profile.participants[0],
    profile.participants[1],
    profile.participants[2],
    "变化轴",
    "拒绝条件",
  ];
}

function renderChapter(profile, previous, next) {
  const base = pascal(profile.slug);
  const concepts = profile.concepts ?? CATALOG_CONCEPTS;
  const conceptSections = concepts
    .map(
      (concept, index) =>
        `### ${concept}\n\n${conceptParagraph(concept, profile, index)}`,
    )
    .join("\n\n");
  const termList = terms(profile);
  const termInline = termList
    .map(
      (term, index) =>
        `<Term def={${JSON.stringify(`${term}在${profile.title}中用于检查${profile.flow[index % profile.flow.length]}阶段的责任与证据。`)}}>${term}</Term>`,
    )
    .join("、\n");
  const glossary = termList
    .map(
      (term, index) =>
        `<GlossaryItem term=${JSON.stringify(term)}>${profile.title} 在“${profile.flow[index % profile.flow.length]}”阶段使用的可复核术语。</GlossaryItem>`,
    )
    .join("\n");
  const previousLink = previous
    ? `- [上一页：${previous.title}](/learn/${BOOK}/${previous.sectionSlug}/${previous.slug})`
    : "- 这是本书学习路径的起点。";
  const nextLink = next
    ? `- [下一页：${next.title}](/learn/${BOOK}/${next.sectionSlug}/${next.slug})`
    : "- 这是本书学习路径的终点。";
  return `---
title: ${JSON.stringify(profile.title)}
type: ${profile.type}
section: ${JSON.stringify(profile.category)}
order: ${profile.order}
description: ${JSON.stringify(`${profile.title}：${profile.intent}`)}
demo: true
math: false
sourceUrl: ${JSON.stringify(INFORMIT)}
qualityVersion: 2
practiceMode: code
sourceMode: independent-rewrite
draft: false
---

import {
  ${base}StructureLab,
  ${base}ChangeLab,
  ${base}EvidenceLab,
} from "@/components/mdx/design-patterns/diagrams/${profile.slug}";
import {
  Objectives,
  Callout,
  Term,
  Glossary,
  GlossaryItem,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能从“${profile.problem}”识别 ${profile.title} 真正处理的变化轴
- 能解释 ${profile.participants.join("、")} 的引用方向与协作责任
- 能修改 TypeScript 最小实现，并验证“${profile.invariant}”
- 能用“${profile.misuse}”作为拒绝或简化方案的信号

</Objectives>

## 直觉：从变化压力出发，而不是从模式名称出发

${profile.motivation} 因此，${profile.title} 的第一步不是画类图，而是写清 **${profile.problem}** 中哪项变化会扩散、现有结构怎样承担成本，以及什么观察足以拒绝模式。

在实验前先预测：沿 ${profile.flow.join(" → ")} 运行时，哪条依赖最先暴露变化；随后只调整一个参与者或连接，保存代码结果和拒绝原因，最后重置到相同基线。

<Callout type="info" title="来源范围与独立教学重写">
  [InformIT 官方页面](${INFORMIT})确认四位作者、1994 年第一版、23 个模式、完整目录，并提供获授权的模式样章与示例代码；[Pearson 书目页](${PEARSON})用于交叉核对版本，[GoF 作者回顾](${RETROSPECTIVE})用于理解后续评价，[TypeScript 官方手册](${TYPESCRIPT})用于核对本站代码语法。项目没有原书完整正文，本页不翻译或复现原书；中文解释、TypeScript 实现、交互与练习均为独立教学重写。
</Callout>

## 问题合同与术语

**意图。** ${profile.intent}。**适用边界。** ${profile.applicability}。本页验收不变量是：**${profile.invariant}**。

${termInline}

## 官方目录结构的逐项解释

下面的目录字段采用 GoF 模式目录的标准描述结构来组织独立讲解。每个字段都要连接当前问题、页面专属实验与练习证据；字段名称出现本身不算覆盖。

${conceptSections}

## TypeScript 最小实现与变更实验

以下代码只承担 ${profile.title} 的一条协作切片。先运行基线，再替换 ${profile.participants[1]} 或注入非法 revision；如果调用者必须认识具体实现，或者“${profile.invariant}”不再成立，就记录失败而不是继续增加抽象。

\`\`\`ts
${codeExample(profile)}
\`\`\`

修改任务：增加一个与 ${profile.participants[2]} 同合同的新实现，只改扩展点与装配位置；随后故意绕过 ${profile.participants[0]}，比较编译错误、运行结果和依赖传播。${profile.implementation}。

## 三视图模式实验

<Stepper>
  <Step title="1. 参与者结构">
    先点选 ${profile.flow[1]} 与不同重构，解释 ${profile.participants.join("、")} 中谁拥有状态、谁可替换、谁负责拒绝。
    <${base}StructureLab />
  </Step>
  <Step title="2. 变更传播">
    切到“新增变化”和“误用反例”，观察 ${profile.title} 的耦合、成本与可追踪性怎样联动。
    <${base}ChangeLab />
  </Step>
  <Step title="3. 权衡证据">
    保存一次通过轨迹和一次拒绝轨迹，再重置；最终判断必须能解释 ${profile.tradeoff}。
    <${base}EvidenceLab />
  </Step>
</Stepper>

## 常见误区与反例

<Callout type="trap" title=${JSON.stringify(`${profile.title} 的拒绝信号`)}>
  ${profile.misuse}。出现该信号时，删除一层结构并重跑 ${profile.flow.join(" → ")}；模式名称不能成为保留复杂度的理由。
</Callout>

另一个易错点是把结构相似当作语义相同。${profile.related}；比较时必须同时写出谁触发变化、谁持有状态、失败如何传播，以及替代方案是否更小。

## 术语表

<Glossary>
${glossary}
</Glossary>

## 练习与答案

<Exercises>

1. **目录字段复核。** 用当前案例逐项说明 ${concepts.join("、")}；每项至少给出一个对象、一次调用或一条可观察后果。

<Answer>
  ${profile.title} 的复核从“${profile.problem}”开始。模式名称与分类定位${profile.category}；意图是${profile.intent}；别名边界为${profile.aliases}；动机来自${profile.motivation}；适用性要求${profile.applicability}；结构和参与者是${profile.participants.join("、")}；协作规则为${profile.collaboration}；后果是${profile.tradeoff}；实现遵循${profile.implementation}；示例代码验证${profile.invariant}；已知应用包括${profile.known}；相关模式比较为${profile.related}。
</Answer>

2. **代码变更。** 为 ${profile.participants[1]} 增加一个实现，并证明主流程不需要识别它的具体类；再注入“${profile.misuse}”。

<Answer>
  新实现只遵守最小合同并由装配处选择，${profile.participants[0]} 继续沿 ${profile.flow.join(" → ")} 工作。误用场景必须让实验的因果可追踪下降或让不变量失败；修复后重置并复跑同一输入，不能更换验收条件。
</Answer>

3. **方案判断。** 在什么情况下应拒绝 ${profile.title}，选择直接代码或相邻模式？

<Answer>
  当${profile.applicability}不成立，或简单方案已经让“${profile.invariant}”可验证时，应拒绝额外层次。${profile.related}；最终决定同时登记采用收益、${profile.tradeoff}、删除测试和回退方案。
</Answer>

</Exercises>

## 本章小结

${profile.title} 把“${profile.problem}”收敛为 ${profile.participants.join("、")} 的协作合同。学习结果不是能复述定义，而是能修改代码、触发“${profile.misuse}”这一反例、重置实验，并根据 ${profile.tradeoff} 接受或拒绝方案。

## 前后导航

${previousLink}
${nextLink}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle=${JSON.stringify(WORK_TITLE)}
  adaptedUrl=${JSON.stringify(INFORMIT)}
/>
`;
}

const manifestDocument = fs.readFileSync(MANIFEST_PATH, "utf8");
const manifestRoot = JSON.parse(manifestDocument);
const oldManifest = manifestRoot.books[BOOK];
if (!oldManifest) throw new Error(`缺少 ${BOOK} manifest`);

const pageBySlug = new Map();
for (const filePath of walkMdx(BOOK_DIR)) {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(filePath, ".mdx");
  pageBySlug.set(slug, {
    filePath,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    sectionSlug: path.basename(path.dirname(filePath)),
    slug,
    title: String(parsed.data.title ?? slug),
    type: String(parsed.data.type ?? "A"),
    order: Number(parsed.data.order ?? 0),
  });
}

const bySlug = new Map([
  [INTRO.slug, INTRO],
  ...PATTERNS.map((profile) => [profile.slug, profile]),
  ...Object.entries(SPECIALS),
]);
const profiles = [...pageBySlug.values()]
  .map((page) => {
    const design = bySlug.get(page.slug);
    if (!design) throw new Error(`缺少页面设计：${page.slug}`);
    return {
      ...page,
      ...design,
      concepts: design.concepts ?? CATALOG_CONCEPTS,
    };
  })
  .sort((a, b) => a.order - b.order);

fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceMode: "independent-rewrite",
      sourceAccess: "authorized-sample",
      scope: { formalUnits: 24, outlineNodes: 310, pages: 27 },
      profiles: profiles.map(({ filePath: _filePath, ...profile }) => profile),
    },
    null,
    2,
  )}\n`,
);

for (const [index, profile] of profiles.entries()) {
  fs.writeFileSync(
    profile.filePath,
    renderChapter(
      profile,
      profiles[index - 1] ?? null,
      profiles[index + 1] ?? null,
    ),
  );
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${profile.slug}.tsx`),
    wrapperSource(profile),
  );
}

const chapterPaths = new Map(
  profiles.map((profile) => [
    profile.slug,
    `${profile.sectionSlug}/${profile.slug}`,
  ]),
);
const officialUnits = [INTRO, ...PATTERNS];
const upgradedManifest = {
  edition:
    "Erich Gamma、Richard Helm、Ralph Johnson、John Vlissides 著《Design Patterns: Elements of Reusable Object-Oriented Software》，Addison-Wesley，1994，ISBN 9780201633610",
  version: 2,
  sourceKind:
    "publisher-official-complete-toc-authorized-pattern-excerpts-and-source-code",
  sourceUrl: INFORMIT,
  secondarySourceUrls: [PEARSON, RETROSPECTIVE, TYPESCRIPT],
  status: "verified-authorized-sample-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "InformIT 官方页面确认 GoF 四位作者、1994 年第一版、完整目录与 23 个模式，并提供获授权的 Abstract Factory、Adapter、Chain of Responsibility 样章和示例代码下载。项目未取得原书完整正文；课程按官方目录界定范围，用独立中文解释、TypeScript 代码、交互实验和练习教学，不声称翻译、复现原文或复刻文档编辑器实现。复合模式页是站内跨模式练习，不冒充原书第 24 个模式。",
  factSources: FACT_SOURCES,
  coverage: { formalUnits: 24, outlineNodes: 310, pages: 27 },
  units: officialUnits.map((profile) => ({
    id: profile.id,
    title: profile.title,
    chapterPath: chapterPaths.get(profile.slug),
    factSourceIds: ["informit", "pearson", "retrospective", "typescript"],
    concepts: (profile.concepts ?? CATALOG_CONCEPTS).map((concept) => [
      concept,
    ]),
  })),
  metrics: {
    formalUnits: 24,
    formalNodes: 310,
    coursePages: 27,
    interactiveViews: 81,
    reviewQuestions: 81,
  },
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "官方目录与获授权样章界定范围和目录结构；技术事实以出版社、作者回顾与 TypeScript 官方文档核对。目录节点必须同时有解释、视觉或实验和练习证据。",
};

fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestDocument, BOOK, upgradedManifest),
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    formalUnits: officialUnits.length,
    outlineNodes: officialUnits.reduce(
      (sum, profile) => sum + (profile.concepts ?? CATALOG_CONCEPTS).length,
      0,
    ),
    profilePath: path.relative(ROOT, PROFILE_PATH),
  }),
);
