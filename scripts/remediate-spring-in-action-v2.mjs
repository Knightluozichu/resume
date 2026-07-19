#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "spring-in-action";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "diagrams");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/spring-in-action-v2-profiles.json");

const SOURCES = {
  publisher: "https://www.manning.com/books/spring-in-action-sixth-edition",
  catalog: "https://livebook.manning.com/book/spring-in-action-sixth-edition/contents",
  framework: "https://docs.spring.io/spring-framework/reference/index.html",
  boot: "https://docs.spring.io/spring-boot/system-requirements.html",
  security: "https://docs.spring.io/spring-security/reference/index.html",
  data: "https://docs.spring.io/spring-data/commons/reference/index.html",
  integration: "https://docs.spring.io/spring-integration/reference/index.html",
  reactor: "https://projectreactor.io/docs/core/release/reference/index.html",
};

function m(studio, boundary, axisA, levelsA, axisB, levelsB, fault, invariant, signal, practiceMode = "code") {
  return {
    studio,
    boundary,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    fault,
    invariant,
    signal,
    practiceMode,
  };
}

const MODELS = {
  "sia-6e-official-learning-map": m("23单元迁移路线台", "第6版目录 → 可执行切片 → 当前版本迁移", "学习阶段", ["建模", "实现", "运维"], "证据强度", ["术语", "测试", "故障恢复"], "只按技术名词跳读，无法说明跨章节状态和版本差异", "每个正式单元都绑定输入、状态、副作用、失败与回滚证据", "路径完成率与迁移账本", "design"),
  "sia-6e-part-1-foundational-spring": m("同步应用垂直切片台", "HTTP → MVC/Security → Domain → Data", "上下文范围", ["纯对象", "MVC切片", "完整应用"], "依赖状态", ["正常", "慢响应", "不可用"], "扩大测试上下文却没有增加任何可观察合同", "同步请求在一次受控提交内产生唯一、可授权且可回滚的领域结果", "请求关联ID与事务结果", "design"),
  "sia-6e-01-getting-started": m("自动配置与首个请求台", "classpath → condition → bean → handler → view", "启动条件", ["缺starter", "完整", "冲突Bean"], "测试边界", ["纯单元", "MockMvc", "随机端口"], "控制器可编译但条件装配未创建所需Bean", "条件报告能够解释Bean来源，MockMvc能证明请求到视图的最小合同", "ConditionEvaluationReport与HTTP断言"),
  "sia-6e-02-developing-web-applications": m("MVC表单绑定与校验台", "request → binding → validation → controller → template", "输入样本", ["合法", "字段缺失", "恶意负载"], "渲染路径", ["GET", "POST失败", "POST成功"], "校验失败仍进入领域写入，或错误消息没有回到对应字段", "非法输入不产生领域副作用，合法输入只提交一次且视图状态一致", "BindingResult、响应状态与写入计数"),
  "sia-6e-03-working-with-data": m("关系聚合与事务台", "service → transaction → repository → relational constraints", "持久化策略", ["JdbcTemplate", "Data JDBC", "JPA"], "事务结局", ["提交", "约束失败", "回滚"], "聚合部分写入后异常，测试却只检查主表记录", "聚合写入要么整体提交要么整体回滚，查询数量和约束可观察", "SQL日志、行数与事务断言"),
  "sia-6e-04-nonrelational-data": m("Cassandra与Mongo建模台", "aggregate access pattern → partition/document → repository", "存储模型", ["关系迁移", "Cassandra分区", "Mongo文档"], "查询模式", ["主键", "范围", "跨聚合"], "把关系模型原样搬入Cassandra或Mongo，导致跨分区扫描和无界文档", "数据模型由访问模式与一致性边界驱动，Repository不掩盖存储差异", "查询计划、分区键与文档尺寸"),
  "sia-6e-05-securing-spring": m("过滤链与授权决策台", "credentials → authentication → authorization → controller", "调用身份", ["匿名", "合法用户", "越权用户"], "保护位置", ["请求", "方法", "数据对象"], "只隐藏页面按钮，却允许越权请求直接命中服务方法", "默认拒绝，身份来源可追溯，请求与方法授权对同一资源保持一致", "SecurityContext、决策事件与403断言"),
  "sia-6e-06-configuration-properties": m("配置优先级与绑定台", "property sources → Environment → typed binding → bean", "属性来源", ["默认文件", "profile", "环境变量"], "绑定结果", ["合法", "缺失", "格式错误"], "生产环境变量覆盖配置却没有记录来源，或非法值静默落到默认值", "同一属性的胜出来源、类型转换、校验失败和敏感值遮蔽均可解释", "Environment来源、绑定错误与脱敏快照"),
  "sia-6e-part-2-integrated-spring": m("同步与异步边界选择台", "HTTP/API → message/channel → downstream effect", "耦合方式", ["同步", "队列", "集成流"], "交付风险", ["重复", "乱序", "毒消息"], "为了异步而异步，新增代理却没有定义确认、幂等和补偿", "每条跨系统边界都有明确所有者、交付语义、超时预算和恢复路径", "关联ID、确认位置与死信记录", "design"),
  "sia-6e-07-creating-rest-services": m("REST状态转换与客户端台", "HTTP representation → controller → aggregate → response", "HTTP动作", ["读取", "更新", "删除"], "并发条件", ["最新版本", "过期版本", "资源不存在"], "把所有结果返回200，客户端无法区分不存在、冲突和验证失败", "资源状态、HTTP语义和副作用一致，重复请求不会制造额外业务结果", "状态码、ETag与仓储写入次数"),
  "sia-6e-08-securing-rest": m("OAuth2授权码与资源服务器台", "client → authorization server → token → resource server", "令牌状态", ["合法", "过期", "伪造"], "授权范围", ["不足", "恰好", "过宽"], "只验证JWT签名，却忽略issuer、audience、过期时间与scope", "资源服务器只接受预期签发者、受众和最小权限的有效令牌", "令牌声明、授权决策与401/403差异"),
  "sia-6e-09-asynchronous-messaging": m("JMS、AMQP与Kafka交付台", "producer → broker → consumer → business commit → ack", "消息样本", ["首次", "重复", "乱序"], "确认时点", ["处理前", "事务后", "超时后"], "消费者在业务提交前确认，崩溃后消息丢失且无补偿记录", "同一业务键重复交付只产生一次有效结果，失败消息可定位并可重放", "offset/ack、幂等键与死信队列"),
  "sia-6e-10-integrating-spring": m("Integration通道拓扑台", "gateway → channel → filter/router/transformer → adapter", "通道类型", ["Direct", "Queue", "PublishSubscribe"], "端点行为", ["过滤", "路由", "转换"], "路由无默认分支，无法处理的消息被静默丢弃", "每个通道和端点都声明容量、错误通道、超时与无法路由时的结果", "message headers、errorChannel与端点计数"),
  "sia-6e-part-3-reactive-spring": m("背压与取消路径台", "publisher → operators → subscriber → resource", "需求信号", ["零", "有限", "持续"], "终止方式", ["完成", "错误", "取消"], "把异步包装误当非阻塞，阻塞调用占满事件循环", "需求量受控传播，错误与取消都会释放连接和订阅资源", "request(n)、线程名与取消清理", "design"),
  "sia-6e-11-introducing-reactor": m("Flux/Mono运算符台", "source → transform → demand → terminal signal", "序列类型", ["Mono", "Flux", "空序列"], "需求窗口", ["逐个", "小批", "无界"], "在map中阻塞或忽略订阅需求，造成事件循环饥饿和内存积压", "0..1与0..N基数语义正确，需求、错误和取消沿链路传播", "StepVerifier事件序列与线程"),
  "sia-6e-12-reactive-apis": m("WebFlux合同与客户端台", "request → WebFlux handler → Publisher → WebTestClient", "端点风格", ["注解式", "函数式", "代理客户端"], "响应场景", ["正常", "4xx", "上游超时"], "控制器返回Flux却在内部block，压力下事件循环停止推进", "WebFlux端点不在事件循环阻塞，错误映射与取消能够被客户端断言", "WebTestClient、线程与取消日志"),
  "sia-6e-13-reactive-persistence": m("R2DBC响应式事务台", "Publisher → reactive transaction → driver → database", "数据驱动", ["R2DBC", "Mongo reactive", "Cassandra reactive"], "事务场景", ["提交", "错误", "取消"], "使用JDBC阻塞驱动或在订阅之外开启事务，导致上下文丢失", "订阅上下文携带事务，错误或取消不会留下半写入数据和悬挂连接", "事务事件、连接池与数据行断言"),
  "sia-6e-14-working-with-rsocket": m("RSocket交互模型台", "route + metadata → requester/responder → frame stream", "交互模型", ["request-response", "request-stream", "channel"], "传输状态", ["TCP", "WebSocket", "断线恢复"], "把request-stream当普通响应，忽略需求和断线后的重复订阅", "路由、metadata、基数、需求和终止信号与所选交互模型一致", "frame方向、request(n)与终止原因"),
  "sia-6e-part-4-deployed-spring": m("可运维交付门禁台", "artifact → runtime → health/readiness → traffic → rollback", "发布阶段", ["构建", "候选", "生产"], "运行信号", ["健康", "降级", "不可用"], "把进程存活当业务就绪，依赖未连接就接收流量", "构建物可追溯，启动与就绪分离，失败能停止流量并回滚", "构建摘要、探针与回滚事件", "design"),
  "sia-6e-15-spring-boot-actuator": m("Actuator端点与指标台", "application state → endpoint/metric → secured exposure", "端点暴露", ["health", "metrics", "custom"], "调用身份", ["匿名", "运维", "管理员"], "暴露env或heapdump等敏感端点，或用高基数用户ID作为指标标签", "只暴露必要端点，健康分组与指标标签稳定且不泄露敏感数据", "端点清单、tag基数与授权结果"),
  "sia-6e-16-administering-spring": m("Boot Admin注册与诊断台", "client registration → admin server → actuator proxy", "注册状态", ["首次", "过期", "重复实例"], "凭据策略", ["明文", "受保护", "轮换"], "Admin UI显示绿色，但代理凭据过期或实例身份发生碰撞", "实例ID唯一，注册租约可过期，管理访问经认证且不暴露客户端秘密", "注册事件、实例ID与代理授权"),
  "sia-6e-17-monitoring-with-jmx": m("MBean属性与通知台", "managed resource → MBeanServer → client/notification", "管理操作", ["读取", "写入", "调用"], "监听状态", ["连接", "断开", "重连"], "把危险业务操作暴露为无权限MBean，或通知重连后重复注册", "管理接口最小化且受保护，属性、操作和通知能够审计与去重", "ObjectName、通知序号与权限结果"),
  "sia-6e-18-deploying-spring": m("JAR、镜像与K8s探针台", "build → image → startup/liveness/readiness → traffic", "制品形态", ["JAR", "OCI镜像", "WAR"], "关闭阶段", ["接流量", "排空", "终止"], "liveness依赖外部数据库导致级联重启，或终止前没有排空连接", "不可变制品可追溯，探针语义分离，优雅关闭在预算内完成", "镜像摘要、探针事件与排空时长"),
  "sia-6e-appendix-bootstrapping": m("Initializr启动矩阵台", "metadata → generated build → test → executable artifact", "生成入口", ["IDE", "start.spring.io", "CLI"], "构建工具", ["Maven", "Gradle", "包装器"], "不同入口生成不同Java与Boot版本，却被误当同一基线比较", "相同元数据通过不同入口生成等价依赖、工具链与可运行测试", "metadata、依赖树与wrapper版本"),
  "sia-6e-official-final-review": m("全书故障答辩台", "request/message → Spring boundary → state → operations → release", "故障域", ["身份/配置", "数据/消息", "响应式/部署"], "证据层", ["合同", "故障", "恢复"], "只展示最终演示，不保存第一处边界偏离和回滚证据", "23个正式单元能沿同一业务旅程重放，任何失败都可定位并恢复", "全书证据包与发布判定", "diagnosis"),
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name.endsWith(".mdx") ? [path.join(dir, entry.name)] : []).sort();
}

function pascal(value) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("").replace(/^Sia6e/, "Sia6");
}

function extractOriginal(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const focus = source.match(/核心任务是：([^。\n]+)[。]/)?.[1];
  const artifact = source.match(/预期交付是[“"]([^”"]+)[”"]/)?.[1];
  const trap = source.match(/最危险的误区是[“"]([^”"]+)[”"]/)?.[1];
  const codeMatch = [...source.matchAll(/```([\w-]*)\n([\s\S]*?)```/g)][0];
  if (!focus || !artifact || !trap || !codeMatch) throw new Error(`无法提取章专属内容：${filePath}`);
  return { focus, artifact, trap, codeLanguage: codeMatch[1] || "text", code: codeMatch[2].trim() };
}

function sourceUnitFor(chapterSlug) {
  if (chapterSlug.includes("official-learning-map") || chapterSlug.includes("official-final-review")) return null;
  return chapterSlug;
}

function nodeAction(concept) {
  if (/Security|OAuth|authentication|CSRF|Securing/i.test(concept)) return "列出身份来源、信任边界、默认拒绝规则和401/403反例，再核对方法与对象级授权";
  if (/JDBC|JPA|repository|persist|Cassandra|Mongo|data/i.test(concept)) return "声明聚合、访问模式、事务与一致性，执行一次真实查询并用失败约束证明回滚";
  if (/message|JMS|Rabbit|Kafka|channel|router|gateway|integration/i.test(concept)) return "标出生产、代理、消费、业务提交和确认时点，用重复、乱序或毒消息验证交付语义";
  if (/react|Flux|Mono|WebFlux|R2DBC|RSocket/i.test(concept)) return "写出0..1或0..N基数、需求、线程、错误、取消和资源释放，不用异步外观掩盖阻塞调用";
  if (/Actuator|Admin|JMX|metric|health|monitor/i.test(concept)) return "限定管理暴露面和调用身份，保存低基数指标、健康分组、审计事件与敏感信息遮蔽证据";
  if (/deploy|JAR|WAR|container|Kubernetes|shutdown|liveness|readiness/i.test(concept)) return "固定制品摘要，区分启动、存活和就绪，注入终止与依赖故障并核对流量排空和回滚";
  if (/configuration|propert|profile|environment/i.test(concept)) return "枚举属性来源与优先级，触发缺失、格式错误和覆盖冲突，记录胜出来源和绑定失败";
  if (/test/i.test(concept)) return "选择能覆盖该Spring边界的最窄测试，加入一个能推翻成功路径的负例并说明测试未覆盖什么";
  if (/REST|controller|request|view|web|form/i.test(concept)) return "冻结HTTP输入，跟踪绑定、校验、领域状态和表示，区分成功、客户端错误、冲突和依赖失败";
  return "把入口、容器决策、领域状态、外部副作用和验收信号连成可重放的最小切片";
}

function nodeNote(concept, profile) {
  return `${profile.title}中的${concept}：${nodeAction(concept)}。在${profile.title}中固定${profile.model.axisB.label}为“${profile.model.axisB.levels[1]}”，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[0]}”切到“${profile.model.axisA.levels[2]}”，用${profile.model.signal}找到第一项因果变化；该节点的练习断言是“${profile.model.invariant}”。`;
}

function profilesFor(manifest, saved) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const bookPath = manifest.units.map((unit) => unit.title);
  return walk(CONTENT_ROOT).map((filePath, order) => {
    const chapterSlug = path.basename(filePath, ".mdx");
    const sectionSlug = path.basename(path.dirname(filePath));
    const data = matter(fs.readFileSync(filePath, "utf8")).data;
    const sourceUnitId = sourceUnitFor(chapterSlug);
    const unit = sourceUnitId ? units.get(sourceUnitId) : null;
    const concepts = unit ? unit.concepts.map((item) => item[0]) : bookPath;
    const prior = saved?.find((item) => item.chapterSlug === chapterSlug) ?? extractOriginal(filePath);
    const core = MODELS[chapterSlug];
    if (!core) throw new Error(`缺少章专属模型：${chapterSlug}`);
    const chain = ["冻结输入与版本", "解释容器决策", "执行边界合同", "注入失败与恢复", "保存发布证据"];
    const model = {
      ...core,
      metric: `${core.studio}合同命中率`,
      risk: `${core.axisB.label}暴露风险`,
      task: `${prior.focus}；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。`,
      artifact: prior.artifact,
    };
    const profile = { filePath, sectionSlug, chapterSlug, order, title: String(data.title), type: String(data.type ?? "C"), concepts, sourceUnitId, chain, model, ...prior };
    return { ...profile, notes: Object.fromEntries(concepts.map((concept) => [concept, nodeNote(concept, profile)])) };
  });
}

function wrapper(profile) {
  const labConcepts = profile.concepts.length > 1 ? profile.concepts : [profile.concepts[0], `${profile.title}：受控失败边界`, `${profile.title}：恢复与发布证据`];
  const props = { unitId: profile.chapterSlug, title: profile.title, concepts: labConcepts, chain: profile.chain, model: profile.model };
  return `import { OfficialSiaLab } from "./official-sia6-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}MapLab() { return <OfficialSiaLab {...props} view="map" />; }\nexport function ${profile.componentBase}ExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }\nexport function ${profile.componentBase}EvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }\n`;
}

function render(profile) {
  const deep = profile.concepts.map((concept, index) => `### ${concept}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${profile.notes[concept]}`).join("\n\n");
  const practices = profile.concepts.map((concept, index) => `${index + 1}. ${concept}：解释Spring决策，运行章专属切片，注入一项失败，并用${index % 2 === 0 ? profile.model.signal : profile.model.artifact}断言恢复。`).join("\n");
  const terms = [profile.model.boundary, profile.model.axisA.label, profile.model.axisB.label, profile.model.signal, profile.model.artifact].map((term, index) => ({ term, definition: `${term}是${profile.title}中连接${profile.chain[index]}与可反证结果的章专属坐标，必须同时记录输入、版本、状态与失败。` }));
  return `import { ${profile.componentBase}MapLab, ${profile.componentBase}ExperimentLab, ${profile.componentBase}EvidenceLab } from "@/components/mdx/spring-in-action/diagrams/${profile.chapterSlug}";\nimport { Objectives, Callout, Glossary, GlossaryItem, Term, Exercises, Answer, Stepper, Step, Attribution } from "@/components/mdx/mdx-components";\n\n<Objectives>\n\n- 能解释${profile.title}全部${profile.concepts.length}个正式目录节点的输入、Spring边界、状态和失败语义\n- 能运行“${profile.model.studio}”，一次只改变${profile.model.axisA.label}或${profile.model.axisB.label}\n- 能阅读并修改本页章专属代码，以测试、日志、指标或代理记录证明结果\n- 能注入“${profile.model.fault}”，清空派生状态后重放并恢复“${profile.model.invariant}”\n\n</Objectives>\n\n{/* SIA_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}不是starter、注解或API清单，而是一条从“${profile.model.boundary}”到业务结果的可执行合同。${profile.model.studio}把框架决策和领域结果放在同一时间线，先预测第一处变化，再运行、反证、恢复和复位。\n\n${profile.title}的单变量实验固定提交、JDK、依赖、输入和外部服务，只改变${profile.model.axisA.label}或${profile.model.axisB.label}；面板中的方向性数字用于比较条件，不冒充真实压测、生产SLA或安全证明。\n\n## 来源、版次与独立重写边界\n\n${profile.title}依据Manning[第6版产品页](${SOURCES.publisher})核定作者、2022年、520页和ISBN 9781617297571，并用[官方liveBook完整目录](${SOURCES.catalog})定位4个Part、18章、附录及255个正式节点。${profile.title}未取得出版正文授权，目录只限定范围，中文解释、代码、图示、实验、故障与答案均为独立教学重写。\n\n${profile.title}保留原书Spring Framework 5·3 / Boot 2·4历史语境；迁移复核以[Spring Framework 7·0·8参考](${SOURCES.framework})、[Spring Boot 4·1·0系统要求](${SOURCES.boot})、[Spring Security](${SOURCES.security})、[Spring Data](${SOURCES.data})、[Spring Integration](${SOURCES.integration})与[Reactor](${SOURCES.reactor})官方资料为事实依据。当前注记不冒充原书内容，也不允许把新API机械回填到旧基线。\n\n## 本章合同、版本与代码\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${term}</Term>`).join("、")}。\n\n${profile.title}的通过不变量是“${profile.model.invariant}”。${profile.title}的实验档案至少保存commit、Java/Framework/Boot版本、配置来源、输入、关联ID、领域结果、外部副作用、终止原因和回滚触发器；版本迁移一次只改Java、Framework、Boot或第三方依赖中的一项。\n\n本页从旧实现中保留并重新验收的章专属最小边界如下；${profile.title}要求读者修改它、触发失败并用${profile.model.signal}证明结果，而不是只阅读代码：\n\n\`\`\`${profile.codeLanguage}\n${profile.code}\n\`\`\`\n\n<Callout type="info" title="版本迁移不是搜索替换">${profile.title}从5·3/2·4迁往7·0·8/4·1·0时要单独核对Java 17+、javax到jakarta、Security DSL、AOT/原生镜像、驱动与第三方项目兼容性；原基线和迁移基线必须能分别重放。</Callout>\n\n## 先预测，再操作三层章专属实验\n\n<Stepper>\n  <Step title="1. 目录—边界地图">选择正式节点，标出入口、容器决策、状态、副作用与信号。<${profile.componentBase}MapLab /></Step>\n  <Step title="2. 单变量代码实验">固定版本和输入，只切换${profile.model.axisA.label}或${profile.model.axisB.label}。<${profile.componentBase}ExperimentLab /></Step>\n  <Step title="3. 故障、恢复与复位">注入“${profile.model.fault}”，从第一处错误边界修复并同条件重放。<${profile.componentBase}EvidenceLab /></Step>\n</Stepper>\n\n## 官方目录逐项深读\n\n${deep}\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="框架外观不等于业务证明">${profile.title}即使能够启动、返回200或创建Repository，也可能存在错误状态、重复副作用、越权、阻塞或不可恢复失败；必须沿“${profile.model.boundary}”逐段保存证据。</Callout>\n\n<Callout type="trap" title="章专属失败样本">${profile.title}主动触发“${profile.trap}”，并进一步注入“${profile.model.fault}”；若${profile.model.signal}没有变化，先修复观测和边界，不得用最终页面或平均分掩盖。</Callout>\n\n<Callout type="trap" title="迁移编译通过不等于迁移完成">${profile.title}升级后仍需重放身份、配置、数据、消息、响应式终止、管理暴露和关闭流程中的适用合同；只有原反例继续被拒绝，迁移结论才成立。</Callout>\n\n## 练习、答案与255节点验证\n\n<Exercises>\n\n**问题1：代码改变。** 如何隔离${profile.model.axisA.label}对${profile.model.signal}的因果影响？\n\n<Answer>${profile.title}固定提交、版本、输入、${profile.model.axisB.label}和外部依赖，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；保存合同前后状态、失败分类和${profile.model.signal}，然后重置并确认基线可重复。</Answer>\n\n**问题2：四级证据。** 怎样证明本页${profile.concepts.length}个目录节点不是只出现标题？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题3：故障恢复。** 如何证明“${profile.model.fault}”已经被真正修复？\n\n<Answer>${profile.title}沿${profile.chain.join("、")}找到第一处偏离，只修改最小因果条件；丢弃缓存、上下文、连接、事务、offset或订阅等适用派生状态，以同输入重放，直到“${profile.model.invariant}”恢复且${profile.model.artifact}能够由他人复核。</Answer>\n\n</Exercises>\n\n<Glossary>\n${terms.map(({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`).join("\n")}\n</Glossary>\n\n<Attribution mode="independent-rewrite" sourceBasis="outline-only" workTitle="Craig Walls《Spring in Action》第6版" adaptedUrl="${SOURCES.publisher}" />\n`;
}

function updateManifest(manifest, profiles) {
  manifest.sourceKind = "publisher-official-complete-outline-plus-independent-spring-rewrite-and-official-project-docs";
  manifest.status = "verified-outline-independent-rewrite";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "outline-only";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 23, outlineNodes: 255, pages: 25 };
  manifest.disclosureNote = "Manning官方产品页与liveBook目录核定第6版4个Part、18章、附录和255个正式节点；未取得出版正文授权，目录仅限定范围。课程代码、边界图、实验、故障与练习均独立重写，保留Spring 5.3/Boot 2.4历史基线，并以2026-07-20官方文档中的Framework 7.0.8、Boot 4.1.0及相关Spring项目资料做迁移复核。";
  manifest.factSourcePolicy = "每个目录节点必须具备出现、Spring边界解释、章专属代码/交互和练习断言四级证据；启动、HTTP成功、编译通过与生产合同不得互相替代。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    publisher: { kind: "publisher-official-product-page", label: "Manning第6版产品页", url: SOURCES.publisher },
    catalog: { kind: "publisher-official-complete-outline", label: "Manning liveBook完整目录", url: SOURCES.catalog },
    framework: { kind: "upstream-official-reference", label: "Spring Framework官方参考", url: SOURCES.framework },
    boot: { kind: "upstream-official-reference", label: "Spring Boot官方系统要求", url: SOURCES.boot },
    security: { kind: "upstream-official-reference", label: "Spring Security官方参考", url: SOURCES.security },
    data: { kind: "upstream-official-reference", label: "Spring Data官方参考", url: SOURCES.data },
    integration: { kind: "upstream-official-reference", label: "Spring Integration官方参考", url: SOURCES.integration },
    reactor: { kind: "upstream-official-reference", label: "Project Reactor官方参考", url: SOURCES.reactor },
  };
  const byUnit = new Map(profiles.filter((profile) => profile.sourceUnitId).map((profile) => [profile.sourceUnitId, profile]));
  for (const unit of manifest.units) {
    const profile = byUnit.get(unit.id);
    if (!profile) throw new Error(`manifest单元缺页：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = "outline-only";
    unit.factSourceIds = ["publisher", "catalog", "framework", "boot", "security", "data", "integration", "reactor"];
  }
}

const root = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = root.books[BOOK];
const saved = fs.existsSync(PROFILE_PATH) ? JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8")).profiles : null;
const profiles = profilesFor(manifest, saved).map((profile) => ({ ...profile, componentBase: pascal(profile.chapterSlug) }));
if (profiles.length !== 25) throw new Error(`应有25页，实际${profiles.length}`);
fs.writeFileSync(PROFILE_PATH, `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: profiles.map((profile) => ({ ...profile, filePath: path.relative(ROOT, profile.filePath) })) }, null, 2)}\n`);
for (const profile of profiles) {
  const parsed = matter(fs.readFileSync(profile.filePath, "utf8"));
  const data = { ...parsed.data, description: `${profile.title}覆盖${profile.concepts.length}个正式目录节点，以章专属代码、边界交互、故障恢复和版本迁移证据验收。`, qualityVersion: 2, practiceMode: profile.model.practiceMode, sourceMode: "independent-rewrite", sourceUrl: SOURCES.publisher };
  fs.writeFileSync(profile.filePath, matter.stringify(render(profile), data));
  fs.writeFileSync(path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`), wrapper(profile));
}
updateManifest(manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(root, null, 2)}\n`);
console.log("已重构25页、23个正式单元、255个目录节点。");
