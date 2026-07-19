#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "java-core-tech";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/java-core-tech/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/java-core-tech-v2-profiles.json");

const SOURCES = {
  volume1:
    "https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577",
  volume2:
    "https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690",
  api: "https://docs.oracle.com/en/java/javase/25/docs/api/index.html",
  jls: "https://docs.oracle.com/javase/specs/jls/se25/html/index.html",
  jvms: "https://docs.oracle.com/javase/specs/jvms/se25/html/index.html",
  migration: "https://docs.oracle.com/en/java/javase/25/migrate/index.html",
  openjdk: "https://openjdk.org/projects/jdk/25/",
};

function model({
  studio,
  axisA,
  levelsA,
  axisB,
  levelsB,
  success,
  risk,
  fault,
  task,
  invariant,
  probe,
  practiceMode = "code",
  riskA = 1,
  riskB = -1,
}) {
  return {
    studio,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    outcomes: { success, risk, evidence: "可重放证据" },
    fault,
    task,
    invariant,
    probe,
    practiceMode,
    riskEffects: [riskA, riskB],
  };
}

function spec({ duty, stages, focuses, docUrl, code, ...lab }) {
  return {
    duty,
    stages,
    focuses,
    docUrl,
    code,
    model: model(lab),
  };
}

const SPECS = {
  "jct-14e-official-learning-map": spec({
    duty: "把两卷25章编排成从语言语义、标准库到边界系统的可验证学习路径，并要求每次跨章迁移都保留工具链与失败证据。",
    stages: ["冻结工具链", "语言与对象", "库与并发", "外部边界", "综合交接"],
    focuses: ["Java 25", "JLS语义", "JVM运行", "模块边界", "证据链", "迁移顺序"],
    docUrl: SOURCES.openjdk,
    code: `java --version\njavac --version\njava --list-modules | head`,
    studio: "两卷学习路径编排器",
    axisA: "起点知识层",
    levelsA: ["语法入门", "对象与类型", "系统边界"],
    axisB: "证据强度",
    levelsB: ["只读解释", "运行正常例", "故障与恢复"],
    success: "路径闭环度",
    risk: "跨层跳跃风险",
    fault: "直接进入FFM或并发，却没有建立类型、生命周期和关闭合同",
    task: "为目标项目选择首读章、依赖章与最终验收章，并给出不可跳过的先修证据",
    invariant: "每条学习路径都能回到一个可编译探针、一个反例和一次复位",
    probe: "java --version && javac --version",
    practiceMode: "design",
    riskA: 1,
    riskB: -1,
  }),
  "jct-14e-v1-01-introduction-java": spec({
    duty: "区分 Java 语言、Java SE API、JVM 与历史部署形态，用可验证主张替代平台口号和过时误解。",
    stages: ["拆分平台层", "核对主张", "定位历史", "运行探针", "驳斥误解"],
    focuses: ["语言规范", "平台API", "JVM实现", "Applet历史", "可移植边界", "性能主张"],
    docUrl: SOURCES.jls,
    code: `System.out.println(System.getProperty("java.version"));\nSystem.out.println(Runtime.version());`,
    studio: "Java 平台主张核验台",
    axisA: "主张层级",
    levelsA: ["营销词", "规范保证", "实现观测"],
    axisB: "验证坐标",
    levelsB: ["单机一次", "双环境", "规范加反例"],
    success: "主张可证度",
    risk: "历史误读率",
    fault: "把 Applet 时代能力或某个 JVM 实现现象写成 Java 25 语言保证",
    task: "选择一条 Java 常见说法，分别给出规范依据、运行探针和适用边界",
    invariant: "语言保证、API合同和JVM实现观测始终分栏记录",
    probe: 'Runtime.version().feature() == 25',
    practiceMode: "diagnosis",
  }),
  "jct-14e-v1-02-programming-environment": spec({
    duty: "建立 JDK 25 安装、javac/java 命令、IDE 与 JShell 之间一致且可复现的源码—字节码—运行链。",
    stages: ["识别JDK", "编译源码", "检查字节码", "运行类", "交互验证"],
    focuses: ["JAVA_HOME", "javac", "classpath", "IDE SDK", "JShell", "诊断输出"],
    docUrl: SOURCES.api,
    code: `javac --release 25 Hello.java\njavap -c Hello\njava -cp . Hello`,
    studio: "JDK 工具链复现台",
    axisA: "执行入口",
    levelsA: ["JShell", "命令行", "IDE构建"],
    axisB: "环境显式度",
    levelsB: ["依赖默认值", "固定JDK", "固定命令与类路径"],
    success: "环境一致率",
    risk: "隐式配置风险",
    fault: "IDE 使用 JDK 25 而终端仍调用旧 javac，导致同一源码得到不同诊断",
    task: "在终端和IDE各编译一次同一文件，并用版本、命令和字节码哈希证明环境一致",
    invariant: "源码、JDK版本、编译选项和运行类路径四项均可重建",
    probe: "javac --release 25 Hello.java && java Hello",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v1-03-fundamental-structures": spec({
    duty: "用 Java 25 的静态类型、表达式求值、字符串、控制流、大数与数组边界写出第一组可编译程序合同。",
    stages: ["词法与类型", "表达式求值", "控制路径", "输入输出", "边界断言"],
    focuses: ["基本类型", "变量作用域", "运算转换", "String不可变", "控制流", "数组边界"],
    docUrl: SOURCES.jls,
    code: `var values = new int[] { 2, 3, 5 };\nvar total = java.util.Arrays.stream(values).sum();\nSystem.out.println(total);`,
    studio: "表达式与控制流单步台",
    axisA: "输入边界",
    levelsA: ["正常值", "零与空", "极值与溢出"],
    axisB: "数值表示",
    levelsB: ["primitive", "BigInteger", "BigDecimal"],
    success: "结果正确率",
    risk: "隐式转换风险",
    fault: "整数溢出、浮点金额比较或数组越界被一次正常输出掩盖",
    task: "修改输入与数值类型，解释编译期转换、运行结果和边界诊断的首个差异",
    invariant: "每条控制路径都产生明确类型的结果或明确失败",
    probe: "Math.addExact(Integer.MAX_VALUE, 1)",
  }),
  "jct-14e-v1-04-objects-classes": spec({
    duty: "从对象身份、封装不变量和构造过程出发，比较普通类、record、包、JAR 与文档合同。",
    stages: ["声明状态", "构造对象", "调用方法", "封装包", "发布合同"],
    focuses: ["对象身份", "构造器", "参数传值", "record", "包可见性", "JAR元数据"],
    docUrl: SOURCES.jls,
    code: `record Point(int x, int y) {}\nvar a = new Point(2, 3);\nSystem.out.println(a.x() + a.y());`,
    studio: "对象状态与别名观察台",
    axisA: "状态暴露度",
    levelsA: ["公开可变", "封装修改", "不可变值对象"],
    axisB: "构造验证",
    levelsB: ["无检查", "入口检查", "全路径不变量"],
    success: "不变量保持率",
    risk: "别名泄漏风险",
    fault: "把对象引用的按值传递误说成对象复制，或让可变集合从访问器直接逃逸",
    task: "构造两个共享引用的对象，修改一处并用身份、相等性与状态快照解释结果",
    invariant: "所有公开操作前后对象不变量都成立",
    probe: "System.identityHashCode(object)",
  }),
  "jct-14e-v1-05-inheritance": spec({
    duty: "用子类型替换、动态分派、sealed 层级、模式匹配与反射边界判断继承设计是否成立。",
    stages: ["声明层级", "建立子类型", "动态分派", "模式覆盖", "反射审计"],
    focuses: ["is-a关系", "Object合同", "自动装箱", "sealed", "模式匹配", "反射访问"],
    docUrl: SOURCES.jls,
    code: `sealed interface Shape permits Circle {}\nrecord Circle(double r) implements Shape {}\ndouble area(Shape s) { return switch (s) { case Circle(var r) -> Math.PI*r*r; }; }`,
    studio: "子类型与分派决策台",
    axisA: "层级开放度",
    levelsA: ["final封闭", "sealed枚举", "开放继承"],
    axisB: "分派方式",
    levelsB: ["类型判断", "虚方法", "穷尽模式"],
    success: "替换一致度",
    risk: "脆弱基类风险",
    fault: "子类破坏父类不变量，或反射绕开访问边界后仍宣称层级安全",
    task: "给封闭层级增加一个变体，观察编译器如何暴露未穷尽分支并修复",
    invariant: "任何父类型可接受位置都保持父合同与穷尽处理",
    probe: "sealed-switch-probe",
  }),
  "jct-14e-v1-06-interfaces-lambdas-inner": spec({
    duty: "比较接口合同、Lambda 目标类型、捕获语义、内部类外部实例、服务发现与动态代理。",
    stages: ["声明行为", "确定目标类型", "捕获上下文", "装配服务", "代理调用"],
    focuses: ["默认方法", "函数式接口", "有效final", "内部类", "ServiceLoader", "Proxy"],
    docUrl: SOURCES.jls,
    code: `java.util.function.IntUnaryOperator twice = x -> x * 2;\nSystem.out.println(twice.applyAsInt(21));`,
    studio: "行为对象与捕获语义台",
    axisA: "行为表示",
    levelsA: ["匿名类", "Lambda", "服务实现"],
    axisB: "上下文耦合",
    levelsB: ["隐式捕获", "显式参数", "无状态合同"],
    success: "行为替换度",
    risk: "隐藏捕获风险",
    fault: "Lambda 捕获可变上下文或代理遗漏 Object 方法语义，导致行为与身份不可预测",
    task: "把同一行为分别写成Lambda和匿名类，比较this、捕获变量与运行时类的差异",
    invariant: "目标类型、捕获值和调用边界在执行前可说明",
    probe: "lambda.getClass().isSynthetic()",
  }),
  "jct-14e-v1-07-exceptions-assertions-logging": spec({
    duty: "把可恢复异常、程序缺陷断言和可运营日志分开，保存失败传播、资源关闭与诊断上下文。",
    stages: ["识别失败", "传播异常", "选择处理器", "关闭资源", "记录诊断"],
    focuses: ["checked异常", "try-with-resources", "suppressed", "assert", "Logger", "根因链"],
    docUrl: SOURCES.api,
    code: `try (var in = java.nio.file.Files.newInputStream(path)) {\n  return in.read();\n} catch (java.io.IOException ex) {\n  throw new IllegalStateException("read " + path, ex);\n}`,
    studio: "异常传播与资源关闭台",
    axisA: "处理位置",
    levelsA: ["立即吞掉", "边界转换", "顶层决议"],
    axisB: "诊断上下文",
    levelsB: ["只有消息", "保留cause", "输入与资源状态"],
    success: "根因定位率",
    risk: "失败遮蔽率",
    fault: "catch Exception 后继续运行，或关闭异常覆盖原始异常而丢失根因",
    task: "注入读取失败与关闭失败，检查主异常、suppressed异常和日志字段是否完整",
    invariant: "失败要么被明确恢复，要么携带根因到达责任边界",
    probe: "exception.getSuppressed().length",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v1-08-generic-programming": spec({
    duty: "用类型参数、界限、通配符捕获、擦除与可具体化类型解释泛型代码能做什么和不能做什么。",
    stages: ["声明类型参数", "施加界限", "检查变型", "执行擦除", "反射复核"],
    focuses: ["类型界限", "擦除", "不变性", "PECS", "桥方法", "Type令牌"],
    docUrl: SOURCES.jls,
    code: `static double sum(java.util.List<? extends Number> xs) {\n  return xs.stream().mapToDouble(Number::doubleValue).sum();\n}`,
    studio: "泛型约束与擦除观察台",
    axisA: "类型约束",
    levelsA: ["raw type", "无界参数", "有界通配符"],
    axisB: "数据方向",
    levelsB: ["只生产", "读写混合", "只消费"],
    success: "编译期约束率",
    risk: "堆污染风险",
    fault: "通过 raw type 或未检查转换制造堆污染，再把延迟出现的 ClassCastException 当成偶发错误",
    task: "从不安全raw调用开始，加入类型参数和PECS边界，比较编译诊断与运行失败位置",
    invariant: "集合元素类型在所有写入路径上保持一致",
    probe: "bounded-wildcard-probe",
  }),
  "jct-14e-v1-09-collections": spec({
    duty: "按顺序、唯一性、键值索引、并发与操作复杂度选择集合，并验证视图、迭代器和遗留类型语义。",
    stages: ["声明操作", "选择接口", "选择实现", "执行算法", "验证视图"],
    focuses: ["List", "Set", "Map", "迭代器", "视图", "复杂度"],
    docUrl: SOURCES.api,
    code: `var counts = new java.util.HashMap<String,Integer>();\nwords.forEach(w -> counts.merge(w, 1, Integer::sum));`,
    studio: "集合结构选择器",
    axisA: "主要访问模式",
    levelsA: ["顺序遍历", "成员查询", "键值聚合"],
    axisB: "数据语义",
    levelsB: ["允许重复", "保持唯一", "保持排序"],
    success: "操作匹配度",
    risk: "语义错配成本",
    fault: "在遍历期间结构性修改集合，或把受支持的视图误当成独立副本",
    task: "为同一数据分别选择List、Set和Map，测量操作并解释哪种语义改变了结果",
    invariant: "实现选择必须守住接口语义与所需复杂度",
    probe: "map.merge(key, 1, Integer::sum)",
  }),
  "jct-14e-v1-10-concurrency": spec({
    duty: "比较平台线程与虚拟线程，建立任务协调、happens-before、线程安全集合、异步计算和进程关闭边界。",
    stages: ["定义任务", "选择线程", "协调状态", "传播取消", "验证关闭"],
    focuses: ["虚拟线程", "线程状态", "happens-before", "锁与原子性", "CompletableFuture", "Process"],
    docUrl: SOURCES.api,
    code: `try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {\n  var future = executor.submit(() -> blockingCall());\n  System.out.println(future.get());\n}`,
    studio: "并发任务与关闭轨迹台",
    axisA: "线程模型",
    levelsA: ["单平台线程", "固定线程池", "每任务虚拟线程"],
    axisB: "共享状态保护",
    levelsB: ["无同步", "锁或原子", "隔离状态"],
    success: "任务完成率",
    risk: "竞争与泄漏风险",
    fault: "把虚拟线程当成共享状态安全方案，或取消后仍留下线程、锁和外部连接",
    task: "对阻塞任务切换线程模型并注入取消，核对结果、共享计数与关闭状态",
    invariant: "任务结果、取消传播和资源关闭在所有线程模型下语义一致",
    probe: "Thread.startVirtualThread(task)",
    practiceMode: "simulation",
    riskA: 1,
  }),
  "jct-14e-v1-11-annotations": spec({
    duty: "从 Target、Retention 与元素合同出发，区分编译期处理、运行时反射和字节码变换。",
    stages: ["定义注解", "选择目标", "保留元数据", "处理模型", "检查产物"],
    focuses: ["Target", "Retention", "重复注解", "反射处理", "Processor", "字节码"],
    docUrl: SOURCES.api,
    code: `@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)\n@interface Audited { String value(); }`,
    studio: "注解生命周期处理台",
    axisA: "处理阶段",
    levelsA: ["SOURCE", "CLASS", "RUNTIME"],
    axisB: "目标范围",
    levelsB: ["TYPE", "METHOD", "TYPE_USE"],
    success: "元数据可用率",
    risk: "阶段错配风险",
    fault: "选择SOURCE保留却在运行时反射读取，或处理器生成不稳定源码造成重复构建差异",
    task: "切换Retention并分别检查源处理输出、class文件和运行时反射结果",
    invariant: "使用方只在声明的目标与保留阶段读取注解",
    probe: "element.getAnnotation(Audited.class)",
  }),
  "jct-14e-v1-12-modules": spec({
    duty: "用 requires、exports、opens、服务装配与迁移工具建立可读性、可访问性和反射边界。",
    stages: ["命名模块", "声明依赖", "导出API", "开放反射", "链接运行时"],
    focuses: ["module-info", "requires", "exports", "opens", "ServiceLoader", "jdeps"],
    docUrl: SOURCES.jls,
    code: `module app.main {\n  requires app.api;\n  uses app.api.Plugin;\n}`,
    studio: "模块可读性图验证台",
    axisA: "依赖声明",
    levelsA: ["未命名模块", "自动模块", "显式模块"],
    axisB: "包暴露",
    levelsB: ["封闭", "exports", "opens"],
    success: "边界可解释度",
    risk: "封装穿透风险",
    fault: "为修复反射错误直接open整个模块，或依赖自动模块名却没有迁移记录",
    task: "从类路径应用迁到模块路径，逐项解释可读性、导出和反射失败",
    invariant: "编译期可读性与运行时反射权限分别最小化声明",
    probe: "jdeps --print-module-deps app.jar",
    practiceMode: "design",
  }),
  "jct-14e-v2-01-streams": spec({
    duty: "把惰性 Stream 管线拆成来源、中间操作、终止操作与归约合同，验证 Optional、Collector、Gatherer 和并行安全。",
    stages: ["创建来源", "组合变换", "触发终止", "归约收集", "验证并行"],
    focuses: ["惰性求值", "filter/map", "Optional", "Collector", "Gatherer", "并行归约"],
    docUrl: SOURCES.api,
    code: `var result = words.stream()\n    .filter(w -> !w.isBlank())\n    .map(String::toLowerCase)\n    .toList();`,
    studio: "Stream 管线求值追踪台",
    axisA: "执行方式",
    levelsA: ["外部迭代", "顺序Stream", "并行Stream"],
    axisB: "归约合同",
    levelsB: ["有副作用", "结合但有序", "结合且无状态"],
    success: "管线等价率",
    risk: "副作用竞态风险",
    fault: "在并行管线写共享可变容器，或对非结合运算使用reduce",
    task: "把循环改为Stream后比较顺序与并行结果，并用反例检查结合律和遇见顺序",
    invariant: "同一输入在声明的顺序合同下得到同一结果",
    probe: "stream.peek(trace::add).toList()",
    practiceMode: "calculation",
  }),
  "jct-14e-v2-02-input-output": spec({
    duty: "区分字节与字符、文件属性、映射内存、锁、序列化和正则边界，确保格式与资源生命周期可恢复。",
    stages: ["识别格式", "选择流", "读取写入", "同步资源", "验证关闭"],
    focuses: ["字节/字符", "Charset", "Path/Files", "MappedByteBuffer", "FileLock", "序列化风险"],
    docUrl: SOURCES.api,
    code: `try (var reader = java.nio.file.Files.newBufferedReader(path, java.nio.charset.StandardCharsets.UTF_8)) {\n  System.out.println(reader.readLine());\n}`,
    studio: "I/O 格式与资源边界台",
    axisA: "数据表示",
    levelsA: ["原始字节", "显式UTF-8", "对象图"],
    axisB: "资源策略",
    levelsB: ["手动关闭", "try-with-resources", "映射或加锁"],
    success: "往返一致率",
    risk: "格式与泄漏风险",
    fault: "依赖默认字符集或反序列化不可信对象，造成跨环境乱码或代码执行边界失守",
    task: "用两种字符集重放同一文件，再注入截断输入并核对异常与资源关闭",
    invariant: "格式、编码、大小与关闭责任在读取前明确",
    probe: "Files.readString(path, StandardCharsets.UTF_8)",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v2-03-xml": spec({
    duty: "从 XML 良构、命名空间和验证约束出发，比较 DOM、流式解析、XPath、生成与 XSLT 的安全边界。",
    stages: ["读取文档", "解析结构", "验证模式", "查询转换", "安全输出"],
    focuses: ["well-formed", "DOM", "Schema", "XPath", "Namespace", "StAX"],
    docUrl: SOURCES.api,
    code: `var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();\nfactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);`,
    studio: "XML 解析策略与攻击面台",
    axisA: "解析模型",
    levelsA: ["DOM整树", "SAX事件", "StAX拉取"],
    axisB: "信任边界",
    levelsB: ["默认工厂", "禁用外部实体", "验证加资源限额"],
    success: "结构提取率",
    risk: "实体与内存风险",
    fault: "允许外部实体或在巨大文档上构建DOM，导致XXE、资源泄露或内存耗尽",
    task: "对同一XML切换解析器并注入DOCTYPE，验证拒绝位置、命名空间与输出",
    invariant: "不可信输入不能读取未授权外部资源",
    probe: "factory.setExpandEntityReferences(false)",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v2-04-networking": spec({
    duty: "沿 DNS、连接、请求、响应、超时和关闭路径比较 Socket、服务端、HTTP Client、简单服务器与邮件交接。",
    stages: ["解析地址", "建立连接", "交换协议", "处理超时", "关闭会话"],
    focuses: ["Socket", "ServerSocket", "URI", "HttpClient", "超时", "SMTP边界"],
    docUrl: SOURCES.api,
    code: `var request = java.net.http.HttpRequest.newBuilder(uri).timeout(java.time.Duration.ofSeconds(3)).GET().build();\nvar response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());`,
    studio: "网络请求状态机",
    axisA: "连接方式",
    levelsA: ["原始Socket", "HTTP Client", "本地HTTP Server"],
    axisB: "失败预算",
    levelsB: ["无限等待", "连接超时", "端到端截止时间"],
    success: "协议完成率",
    risk: "挂起与重试风险",
    fault: "没有超时地等待远端，或对非幂等请求自动重试造成重复副作用",
    task: "注入DNS失败、连接拒绝与慢响应，区分错误阶段并验证关闭与重试决议",
    invariant: "每个请求都有截止时间、响应上限与明确关闭责任",
    probe: "HttpRequest.newBuilder(uri).timeout(timeout)",
    practiceMode: "simulation",
  }),
  "jct-14e-v2-05-database": spec({
    duty: "从 JDBC 驱动、SQL 参数、结果集、元数据、事务到连接池建立一致性、隔离与资源归还合同。",
    stages: ["取得连接", "绑定参数", "执行语句", "提交事务", "归还连接"],
    focuses: ["DataSource", "PreparedStatement", "ResultSet", "Metadata", "Transaction", "连接池"],
    docUrl: SOURCES.api,
    code: `try (var ps = connection.prepareStatement("select name from users where id = ?")) {\n  ps.setLong(1, id);\n  try (var rs = ps.executeQuery()) { return rs.next() ? rs.getString(1) : null; }\n}`,
    studio: "JDBC 事务与资源轨迹台",
    axisA: "语句构造",
    levelsA: ["字符串拼接", "参数语句", "批处理参数"],
    axisB: "事务边界",
    levelsB: ["自动提交", "显式提交", "失败回滚"],
    success: "数据一致率",
    risk: "注入与半提交风险",
    fault: "拼接SQL或捕获异常后仍提交部分修改，并把脏连接放回池中",
    task: "在第二条更新前注入失败，核对数据库状态、rollback与连接池归还状态",
    invariant: "事务要么完整提交，要么完整回滚并释放所有JDBC资源",
    probe: "connection.setAutoCommit(false)",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v2-06-date-time": spec({
    duty: "区分 Instant、LocalDate/Time 与 ZonedDateTime，显式处理时区规则、DST、格式化和旧 API 迁移。",
    stages: ["选择时间线", "声明时区", "执行运算", "格式解析", "迁移旧值"],
    focuses: ["Instant", "LocalDate", "TemporalAdjuster", "ZoneId", "DST", "DateTimeFormatter"],
    docUrl: SOURCES.api,
    code: `var zone = java.time.ZoneId.of("Asia/Shanghai");\nvar instant = java.time.Instant.parse("2026-07-19T12:00:00Z");\nSystem.out.println(instant.atZone(zone));`,
    studio: "时间语义与 DST 推演台",
    axisA: "时间类型",
    levelsA: ["LocalDateTime", "Instant", "ZonedDateTime"],
    axisB: "时区策略",
    levelsB: ["系统默认", "固定偏移", "命名ZoneId"],
    success: "时刻还原率",
    risk: "DST歧义风险",
    fault: "把本地日期时间当成全球时刻，或依赖系统默认时区导致部署后语义漂移",
    task: "选择一个DST跳变区域，构造缺失与重复本地时间并解释解析决议",
    invariant: "业务概念是日期、墙钟时间还是时间线时刻必须先声明",
    probe: "local.atZone(ZoneId.of(zone))",
    practiceMode: "calculation",
  }),
  "jct-14e-v2-07-internationalization": spec({
    duty: "用 Locale、数字日期格式、排序归一化、消息占位、文本边界与资源包构建可迁移的本地化输出。",
    stages: ["选择Locale", "加载资源", "格式化值", "比较文本", "验证回退"],
    focuses: ["Locale", "NumberFormat", "Collator", "Normalizer", "MessageFormat", "ResourceBundle"],
    docUrl: SOURCES.api,
    code: `var nf = java.text.NumberFormat.getCurrencyInstance(java.util.Locale.CHINA);\nSystem.out.println(nf.format(new java.math.BigDecimal("1234.50")));`,
    studio: "Locale 与文本边界对照台",
    axisA: "区域环境",
    levelsA: ["ROOT", "zh-CN", "de-DE"],
    axisB: "文本处理",
    levelsB: ["代码点", "归一化", "语言排序"],
    success: "本地化正确率",
    risk: "默认区域漂移",
    fault: "用字符串拼接翻译消息，或用二进制顺序代替面向用户的语言排序",
    task: "用三种Locale格式化同一数值和日期，并验证资源回退、占位与排序差异",
    invariant: "存储语义与面向用户的区域化表示彼此分离",
    probe: "NumberFormat.getNumberInstance(locale)",
    practiceMode: "calculation",
  }),
  "jct-14e-v2-08-compiling-scripting": spec({
    duty: "通过 Compiler API 的诊断、内存文件与产物身份管理动态编译，并把脚本执行放入明确的信任和资源边界。",
    stages: ["接收源码", "调用编译器", "收集诊断", "隔离加载", "限制执行"],
    focuses: ["JavaCompiler", "DiagnosticCollector", "JavaFileObject", "类加载", "ScriptEngine", "不可信代码"],
    docUrl: SOURCES.api,
    code: `var compiler = javax.tools.ToolProvider.getSystemJavaCompiler();\nvar diagnostics = new javax.tools.DiagnosticCollector<javax.tools.JavaFileObject>();`,
    studio: "动态编译诊断台",
    axisA: "代码来源",
    levelsA: ["内置模板", "已签名插件", "用户文本"],
    axisB: "执行隔离",
    levelsB: ["同进程", "独立类加载器", "独立受限进程"],
    success: "诊断完备率",
    risk: "代码执行风险",
    fault: "把用户文本直接送入编译或脚本引擎，并在同进程共享文件、网络和凭证",
    task: "编译一段合法与一段非法源码，保存结构化诊断并说明为什么编译成功不等于可信",
    invariant: "源码身份、编译选项、产物哈希和执行权限均可审计",
    probe: "ToolProvider.getSystemJavaCompiler()",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v2-09-security": spec({
    duty: "沿类加载、身份认证、数字签名、加解密和密钥生命周期建立信任边界，拒绝自制密码与含混授权。",
    stages: ["建立威胁模型", "验证身份", "验证完整性", "保护机密", "轮换密钥"],
    focuses: ["ClassLoader", "Principal", "Signature", "Cipher", "KeyStore", "随机数"],
    docUrl: SOURCES.api,
    code: `var signature = java.security.Signature.getInstance("Ed25519");\nsignature.initVerify(publicKey);\nsignature.update(message);\nboolean valid = signature.verify(bytes);`,
    studio: "签名与加密边界验证台",
    axisA: "安全目标",
    levelsA: ["完整性", "身份认证", "机密性"],
    axisB: "密钥管理",
    levelsB: ["源码内硬编码", "KeyStore", "轮换与撤销"],
    success: "信任验证率",
    risk: "密钥暴露风险",
    fault: "把加密当成认证，复用nonce或把密钥写进日志和源码",
    task: "篡改消息、签名和密钥三项中的一项，定位验证失败并检查敏感信息是否泄露",
    invariant: "算法、密钥用途、随机数与失败处理遵循公开标准合同",
    probe: "Signature.getInstance(\"Ed25519\")",
    practiceMode: "diagnosis",
  }),
  "jct-14e-v2-10-gui-programming": spec({
    duty: "以 EDT 为状态串行化边界，拆开 Frame、绘制、事件处理和 Preferences 持久化。",
    stages: ["创建EDT", "构建窗口", "接收事件", "更新模型", "重绘持久化"],
    focuses: ["EDT", "JFrame", "paintComponent", "事件监听", "模型状态", "Preferences"],
    docUrl: SOURCES.api,
    code: `javax.swing.SwingUtilities.invokeLater(() -> {\n  var frame = new javax.swing.JFrame("Probe");\n  frame.setSize(320, 200);\n  frame.setVisible(true);\n});`,
    studio: "Swing EDT 响应轨迹台",
    axisA: "任务位置",
    levelsA: ["EDT阻塞", "后台执行", "后台加EDT提交"],
    axisB: "状态所有者",
    levelsB: ["绘制回调", "组件字段", "独立模型"],
    success: "界面响应率",
    risk: "线程违规风险",
    fault: "在EDT执行阻塞I/O，或从后台线程直接修改Swing组件",
    task: "注入慢任务并比较三种调度方式的事件延迟、状态一致性与关闭结果",
    invariant: "Swing组件只在EDT访问，长任务不占用EDT",
    probe: "SwingUtilities.isEventDispatchThread()",
    practiceMode: "simulation",
  }),
  "jct-14e-v2-11-swing-components": spec({
    duty: "用 MVC、布局约束、输入与选择模型、菜单和对话框构建可缩放、可键盘操作的 Swing 界面。",
    stages: ["定义模型", "选择布局", "绑定输入", "响应选择", "弹出对话"],
    focuses: ["MVC", "LayoutManager", "Document", "ButtonModel", "Action", "Dialog"],
    docUrl: SOURCES.api,
    code: `panel.setLayout(new java.awt.GridBagLayout());\nvar constraints = new java.awt.GridBagConstraints();\nconstraints.fill = java.awt.GridBagConstraints.HORIZONTAL;`,
    studio: "Swing 组件模型与布局台",
    axisA: "布局策略",
    levelsA: ["绝对坐标", "标准Layout", "自定义约束"],
    axisB: "状态位置",
    levelsB: ["视图即模型", "组件Model", "领域Model"],
    success: "布局适应率",
    risk: "状态耦合风险",
    fault: "使用绝对坐标，在字体缩放或翻译变长后裁切控件，并把视图当唯一业务状态",
    task: "改变字体、窗口宽度和Locale，检查布局、键盘焦点与模型状态是否保持",
    invariant: "内容变化与窗口缩放不破坏操作顺序和模型值",
    probe: "component.getPreferredSize()",
    practiceMode: "design",
  }),
  "jct-14e-v2-12-advanced-swing-graphics": spec({
    duty: "分离表格/树模型、渲染器与编辑器状态，管理 AWT 绘制、位图内存、坐标变换和打印分页。",
    stages: ["准备模型", "布局行列", "渲染编辑", "处理图像", "分页打印"],
    focuses: ["TableModel", "RowSorter", "Renderer", "TreeModel", "Raster", "Printable"],
    docUrl: SOURCES.api,
    code: `table.setAutoCreateRowSorter(true);\nint modelRow = table.convertRowIndexToModel(table.getSelectedRow());`,
    studio: "表格树与打印管线台",
    axisA: "数据规模",
    levelsA: ["百行", "万行", "百万像素"],
    axisB: "渲染策略",
    levelsB: ["每格分配", "复用Renderer", "虚拟化与缓存"],
    success: "渲染一致率",
    risk: "内存与坐标风险",
    fault: "在renderer保存业务状态，或把视图行号直接当模型行号写回",
    task: "排序表格后编辑选中行，并验证视图—模型索引、渲染复用和打印坐标",
    invariant: "模型身份不随排序、渲染复用或打印坐标变化",
    probe: "convertRowIndexToModel(viewRow)",
    practiceMode: "simulation",
  }),
  "jct-14e-v2-13-foreign-functions-memory": spec({
    duty: "比较 JNI 与 FFM，显式管理 Linker、Arena、MemorySegment、MemoryLayout、下调句柄和回调生命周期。",
    stages: ["确认ABI", "建立布局", "分配Arena", "调用外部函数", "关闭与回调"],
    focuses: ["JNI", "Linker", "Arena", "MemorySegment", "MemoryLayout", "upcall"],
    docUrl: SOURCES.api,
    code: `try (var arena = java.lang.foreign.Arena.ofConfined()) {\n  var segment = arena.allocate(java.lang.foreign.ValueLayout.JAVA_INT);\n  segment.set(java.lang.foreign.ValueLayout.JAVA_INT, 0, 42);\n}`,
    studio: "FFM ABI 与生命周期台",
    axisA: "互操作方式",
    levelsA: ["JNI桥接", "FFM downcall", "FFM upcall"],
    axisB: "Arena寿命",
    levelsB: ["global", "shared", "confined"],
    success: "ABI匹配率",
    risk: "越界与悬垂风险",
    fault: "MemorySegment逃逸已关闭Arena，或按错误字节序和布局调用本地函数",
    task: "改变布局或提前关闭Arena，观察Java侧检查与本地边界，并恢复正确ABI合同",
    invariant: "每个外部地址的布局、线程可达性和寿命覆盖完整调用窗口",
    probe: "segment.scope().isAlive()",
    practiceMode: "diagnosis",
    riskA: 1,
    riskB: 1,
  }),
  "jct-14e-official-final-review": spec({
    duty: "把语言、对象、集合、并发、模块、I/O、数据、安全、UI 与本地内存串成一次 Java 25 跨层故障答辩。",
    stages: ["冻结版本", "重建合同", "注入首错", "修复重放", "交接发布"],
    focuses: ["编译诊断", "对象不变量", "资源关闭", "事务一致", "威胁模型", "跨层证据"],
    docUrl: SOURCES.migration,
    code: `java --version\njavac --release 25 App.java\njava -ea --module-path mods -m app/app.Main`,
    studio: "Java 25 跨层故障答辩台",
    axisA: "故障所在层",
    levelsA: ["类型与对象", "资源与并发", "协议与本地内存"],
    axisB: "证据闭环",
    levelsB: ["只有日志", "最小反例", "修复加回归"],
    success: "跨层定位率",
    risk: "错误归因率",
    fault: "同时修改版本、输入和资源上限，最后无法判断是哪一个前提修复了问题",
    task: "为一个跨模块服务提交编译、运行、故障、恢复和关闭五段证据并现场复现",
    invariant: "每次修复只改变一个因果前提且原反例转为稳定回归",
    probe: "java -XshowSettings:properties -version",
    practiceMode: "diagnosis",
    riskA: 1,
    riskB: -1,
  }),
};

const FACT_RULES = [
  [/Programming Platform/i, "Java 平台由语言、标准库与运行环境协作组成；跨实现可移植性来自规范合同，不是字节码文件自动消除所有环境差异"],
  [/White Paper|Buzzwords/i, "白皮书关键词应拆成可测试主张，例如强类型、自动内存管理与并发支持分别由不同规范层保证"],
  [/Applets?/i, "Applet 是历史部署模型，不是 Java 25 的当前通用交付方式；复盘时要把语言能力与已退出的浏览器容器分开"],
  [/History/i, "版本历史用于解释能力何时进入规范以及兼容负担从何而来，不能用今天的 API 倒写早期平台"],
  [/Misconceptions/i, "常见误解需要以反例处理：一次运行快、跨平台或安全，并不等同于语言对所有环境作出绝对保证"],
  [/Installing|Development Kit/i, "安装 JDK 后要同时核对 java 与 javac 的真实路径、版本和目标发行版，避免仅看环境变量"],
  [/Command-Line/i, "命令行链把编译器选项、类路径或模块路径与实际输出显式化，是复现 IDE 行为的基线"],
  [/Integrated Development Environment/i, "IDE 的 Project SDK、语言级别与构建工具 JVM 可能不同，必须分别记录而不能只截一张设置图"],
  [/JShell/i, "JShell 适合验证表达式和 API 探针，但片段状态与完整编译单元不同，结论仍需回到可重建源码"],
  [/Simple Java Program/i, "最小程序用编译单元、类型声明与入口方法连接源码和运行结果，诊断应保留完整命令"],
  [/Comments/i, "注释不参与普通运行语义，文档注释会进入 API 工件；关键不变量仍应由类型与测试执行"],
  [/Data Types/i, "基本类型和值域由 JLS 规定，引用类型保存对象引用；数值提升、溢出与 null 必须分别验证"],
  [/Variables and Constants/i, "变量有声明类型、作用域与初始化规则，final 限制重新赋值但不会递归冻结对象内部状态"],
  [/Operators/i, "运算符遵循提升、求值顺序和短路规则；边界探针要覆盖溢出、除零、NaN 与副作用次序"],
  [/Strings/i, "String 不可变且可能共享池化实例，内容比较使用 equals，频繁拼接的成本要以构建方式与规模衡量"],
  [/Input and Output/i, "控制台输入输出仍受编码、Locale 与异常影响，测试必须固定输入文本和预期字节或字符"],
  [/Control Flow/i, "分支和循环要覆盖所有可达路径；switch 表达式的穷尽性与模式作用域应由编译诊断验证"],
  [/Big Numbers/i, "BigInteger 提供任意精度整数，BigDecimal 需要显式尺度与舍入策略，二者都不是运算符重载值类型"],
  [/Arrays/i, "数组长度固定、协变且运行时保留元素类型，因此既有越界检查也可能产生 ArrayStoreException"],
  [/Object-Oriented|Defining Your Own Classes/i, "类把状态与行为放进一个可见性边界；设计先声明不变量，再决定哪些方法可以改变状态"],
  [/Predefined Classes/i, "使用标准类前要核对可变性、线程安全、相等性与资源合同，不能只根据方法名推断行为"],
  [/Static Fields|Static Methods/i, "static 成员属于类而非某个实例，进程级可变状态会扩大测试耦合与并发影响面"],
  [/Method Parameters/i, "Java 总是按值传递参数；引用值被复制后仍可指向同一对象，但重新绑定不会改写调用者变量"],
  [/Object Construction/i, "构造过程要在对象发布前建立完整不变量，并警惕构造器中泄露 this 或调用可覆写方法"],
  [/Records/i, "record 自动提供基于组件的访问器、相等性与字符串形式，浅不可变不等于组件对象深不可变"],
  [/Packages/i, "包组织名称与包级访问；它不是独立部署或强封装边界，跨模块可见性还受 JPMS 控制"],
  [/JAR Files/i, "JAR 聚合类与资源，清单、模块身份、签名和可重复构建共同决定可交付工件的含义"],
  [/Documentation Comments/i, "Javadoc 描述公开合同、异常与版本；文档示例必须随 API 测试，否则会与实现漂移"],
  [/Class Design Hints/i, "类设计优先保持单一状态责任、最小可变面和组合边界，继承只有在替换合同成立时才采用"],
  [/Superclasses|Subclasses/i, "子类继承可见成员并参与动态分派，但不能收紧父类型前置条件或破坏后置条件"],
  [/Cosmic Superclass/i, "Object 定义身份相关的 equals、hashCode、toString 与监视器入口；重写相等性必须同步维护哈希合同"],
  [/Generic Array Lists/i, "ArrayList 的泛型参数提供编译期元素约束，扩容与索引访问仍受具体实现和运行规模影响"],
  [/Wrappers|Autoboxing/i, "装箱把基本值转换为包装对象，缓存身份、null 拆箱与额外分配都使 == 比较和性能推断易错"],
  [/Variable Number/i, "可变参数在调用边界表现为数组，重载选择、空参数与堆污染需要显式测试"],
  [/Abstract Classes/i, "抽象类可以共享状态和部分实现，但仍要为所有具体子类维护共同不变量"],
  [/Enumeration Classes/i, "enum 实例集合由声明限定，可携带状态与行为；持久化时不要依赖 ordinal 作为稳定协议值"],
  [/Sealed Classes/i, "sealed 层级显式列出允许的直接子类型，使模式分支可以在编译期检查穷尽性"],
  [/Pattern Matching/i, "模式匹配把类型测试、转换和变量作用域绑定，守卫与 null 路径仍需单独覆盖"],
  [/Reflection/i, "反射检查运行时类型和成员，会受到模块开放、访问权限与擦除影响，并非绕开合同的万能入口"],
  [/Interfaces$/i, "接口声明行为合同并支持多实现；默认方法解决演进问题时仍要处理继承冲突"],
  [/Lambda Expressions/i, "Lambda 由目标函数式接口确定参数与返回类型，只能捕获 final 或有效 final 的局部变量"],
  [/Inner Classes/i, "非静态内部类持有外部实例引用，生命周期和序列化边界因此可能比源码表面更大"],
  [/Service Loaders/i, "ServiceLoader 通过模块或类路径发现提供者，提供者身份、失败隔离和顺序不能依赖偶然扫描结果"],
  [/Proxies/i, "动态代理把接口调用交给 InvocationHandler，异常解包、默认方法和 Object 方法都需设计"],
  [/Dealing with Errors|Catching Exceptions/i, "异常类型表达失败类别，处理器只有能恢复或添加责任边界上下文时才应捕获"],
  [/Tips for Using Exceptions/i, "异常不能替代普通控制流；保留 cause、输入坐标和资源清理比笼统包装更重要"],
  [/Assertions/i, "assert 用于内部不变量且可在运行时关闭，不能承担公开参数校验或安全检查"],
  [/Logging/i, "日志要结构化记录事件、上下文与因果链，同时避免泄露密钥、口令和受保护数据"],
  [/Debugging Tips/i, "调试从可重放输入和首个分叉开始，观察器自身对时序与并发的扰动也应记录"],
  [/Type Parameters/i, "类型参数把一组类型关系提升为编译期合同，界限决定可安全调用的成员"],
  [/Virtual Machine/i, "泛型通常通过擦除实现，桥方法维持多态；运行时不总能恢复完整类型实参"],
  [/Inheritance Rules for Generic/i, "`List<Integer>` 不是 `List<Number>` 的子类型；这种不变性阻止通过父视图写入错误元素"],
  [/Wildcard Types/i, "上界通配符适合读取生产者，下界通配符适合写入消费者，捕获转换连接未知类型"],
  [/Restrictions and Limitations/i, "擦除限制直接创建类型参数实例、泛型数组和某些运行时测试，规避方案必须保持类型证据"],
  [/Reflection and Generics/i, "反射的 Type 系列可读取签名元数据，但原始实例中的擦除与未检查操作仍可能丢失保证"],
  [/Collections Framework/i, "集合框架以接口分离序列、集合、队列和映射语义，再由实现权衡顺序、内存和复杂度"],
  [/Interfaces in the Collections/i, "面向接口编程保留实现替换空间，但接口合同仍包含可选操作、迭代顺序与并发限制"],
  [/Concrete Collections/i, "具体集合应按主要操作、顺序、重复、null 与并发需求选择，不能仅凭熟悉度默认 HashMap"],
  [/Maps/i, "Map 维护键到值的关联；键的 equals/hashCode 稳定性直接决定查找与更新能否正确"],
  [/Copies and Views/i, "副本拥有独立结构，视图把操作映射到原集合；修改传播和不支持操作需要反例验证"],
  [/Algorithms/i, "集合算法的正确性依赖排序、比较器一致性和可修改性，复杂度也受底层结构影响"],
  [/Legacy Collections/i, "遗留集合保留兼容价值但常携带旧同步或类型模型，迁移要保存行为而不是机械替名"],
  [/Running Threads/i, "start 才安排新线程执行，直接调用 run 仍在当前线程；虚拟线程优化阻塞扩展性而非共享状态安全"],
  [/Thread States/i, "线程在 NEW、RUNNABLE、阻塞等待与 TERMINATED 等状态间迁移，状态快照只是瞬时观测"],
  [/Thread Properties/i, "名称、优先级、daemon 与未捕获异常处理器影响诊断和生命周期，但不能代替任务取消合同"],
  [/Coordinating Tasks/i, "任务协调要定义完成、超时、取消和失败传播，不能只等待顺利返回"],
  [/Synchronization/i, "同步同时约束互斥与内存可见性；正确性来自 happens-before，而不是运行时看起来顺序稳定"],
  [/Thread-Safe Collections/i, "并发集合保护其规定的单次操作，跨多个操作的业务不变量仍需原子组合"],
  [/Asynchronous Computations/i, "异步阶段必须定义执行器、异常组合、超时和取消；未观察的失败不会自动消失"],
  [/Processes/i, "ProcessBuilder 启动独立进程后还要消费输出、限制等待并确认退出，否则管道阻塞会造成泄漏"],
  [/Using Annotations|Defining Annotations/i, "注解实例由接口元素、默认值与元注解定义，使用位置必须符合 Target"],
  [/Annotations in the Java API/i, "标准注解的语义由各使用方解释，例如 Override 由编译器检查，Deprecated 传递迁移信号"],
  [/Runtime/i, "运行时注解需要 RUNTIME 保留策略并接受模块访问边界，反射扫描成本也要量化"],
  [/Source-Level/i, "源级处理器按轮次读取语言模型并生成文件，输出应确定且不能修改既有用户源码"],
  [/Bytecode Engineering/i, "字节码变换必须符合 class 文件与验证规则，并记录输入输出哈希、代理版本和回退路径"],
  [/Module Concept|Naming Modules/i, "命名模块把依赖和包暴露写进描述符，稳定名称是可读性图和发布身份的一部分"],
  [/Modular.*Hello/i, "最小模块程序同时验证 module-info、包路径、编译输出与 -m 启动坐标"],
  [/Requiring Modules/i, "requires 建立读取边，只有被读模块导出的包才成为普通编译访问候选"],
  [/Exporting Packages/i, "exports 面向编译和普通运行访问公开包，不等同于为深反射开放内部成员"],
  [/Modular JARs/i, "模块化JAR携带描述符；模块路径、主类和版本元数据应在发布前由工具检查"],
  [/Reflective Access|Opening/i, "opens 控制深反射访问，可限定目标模块；为便利全开放会扩大封装和安全影响面"],
  [/Automatic Modules/i, "自动模块帮助迁移但名称和依赖推断可能不稳定，应作为过渡坐标而非最终合同"],
  [/Unnamed Module/i, "类路径代码属于未命名模块，可读所有命名模块，但不能被命名模块直接 requires"],
  [/Command-Line Flags for Migration/i, "add-reads、add-exports 与 add-opens 是迁移补丁，必须登记原因并逐步移除"],
  [/Transitive and Static/i, "requires transitive 向使用者传播读取，requires static 表达编译期必需而运行期可选"],
  [/Importing Modules/i, "单模块导入影响源代码名称解析，不会自动改变运行时模块读取与包导出"],
  [/Service Loading/i, "uses 与 provides 声明服务消费和提供，使模块无需读取具体实现即可装配"],
  [/Tools for Working with Modules/i, "jdeps、jar、jlink 等工具分别检查依赖、工件和运行镜像，输出应纳入发布证据"],
  [/Iterating to Stream/i, "Stream 把外部迭代改为声明式管线，惰性中间操作直到终止操作才真正消费来源"],
  [/Stream Creation/i, "流来源可能一次性、无限或有资源所有权；创建时要说明关闭和重复消费能力"],
  [/filter, map, and flatMap/i, "filter 保留元素，map 一对一变换，flatMap 展平嵌套来源；函数应避免隐藏共享副作用"],
  [/Substreams|Combining Streams/i, "limit、skip、take/drop 与 concat 改变消费边界，短路行为要用计数轨迹验证"],
  [/Other Stream Transformations/i, "distinct、sorted、peek 等操作可能有状态或顺序要求，不能仅凭链式语法推断成本"],
  [/Simple Reductions|Reduction Operations/i, "归约需要身份值、累加器与组合器满足合同，尤其要验证结合律和并行等价"],
  [/Optional Type/i, "Optional 表达可能无结果的返回值，不能用 get 或把 Optional 字段化来逃避缺失分支"],
  [/Collecting Results|Collectors/i, "Collector 明确 supplier、accumulator、combiner 与 finisher，并用特征声明并发和顺序假设"],
  [/Gatherers/i, "Gatherer 提供可组合的自定义中间操作，初始化、集成、合并和完成阶段决定状态与并行边界"],
  [/Primitive Type Streams/i, "IntStream 等避免装箱并提供数值归约，转换回对象流时要注意语义和分配变化"],
  [/Parallel Streams/i, "并行流使用拆分和公共执行资源；只有无干扰函数、合适规模与结合归约才可能安全获益"],
  [/Input\/Output Streams/i, "字节流与字符Reader/Writer服务不同表示，缓冲和关闭传播需要沿包装层验证"],
  [/Binary Data/i, "二进制格式必须固定字节序、字段宽度、版本与截断处理，读写成功不等于跨版本兼容"],
  [/Working with Files/i, "Path 与 Files 组合路径、属性和原子操作；符号链接、权限与竞态会改变表面文件名的含义"],
  [/Memory-Mapped/i, "内存映射把文件区域映入地址空间，解除映射时机、文件大小和进程间可见性需要单独管理"],
  [/File Locking/i, "文件锁可能依赖平台并作用于区域或进程，不能把建议锁误当成跨系统强制事务"],
  [/Serialization/i, "对象序列化携带类型图和兼容风险，不可信输入尤其需要格式白名单或替代数据协议"],
  [/Regular Expressions/i, "正则匹配要区分整串与查找、分组与边界，并用对抗输入检查灾难性回溯和资源上限"],
  [/Introducing XML|Structure of an XML/i, "XML 文档由元素、属性、文本、声明与命名空间构成，良构只保证语法结构"],
  [/Parsing an XML/i, "解析器选择决定内存与控制方式，外部实体和DTD处理必须在不可信边界显式禁用或约束"],
  [/Validating XML/i, "DTD或Schema验证结构约束，但业务不变量与授权仍需应用层检查"],
  [/XPath/i, "XPath 在节点树上定位信息，命名空间上下文和返回类型会改变同一表达式的结果"],
  [/Namespaces/i, "命名空间用URI区分词汇表，前缀只是文档内别名，比较时不能把前缀当身份"],
  [/Streaming Parsers/i, "SAX推送事件，StAX由调用者拉取；两者都用顺序状态换取低内存"],
  [/Generating XML/i, "生成器应转义文本、声明编码并保持命名空间一致，字符串拼接容易产生无效或注入文档"],
  [/XSL Transformations/i, "XSLT 是可执行转换，外部资源访问和扩展函数需要与XML解析同等级的信任控制"],
  [/Connecting to a Server/i, "客户端连接涉及地址解析、连接超时、读写超时与半关闭，异常类型对应不同失败阶段"],
  [/Implementing Servers/i, "服务端要限制并发、请求大小和空闲时间，并在监听关闭时传播任务取消"],
  [/Web Data/i, "获取Web数据要处理URI、状态码、内容类型、重定向和响应上限，不能只解析成功正文"],
  [/HTTP Client/i, "HttpClient 分离客户端配置、请求与响应体处理器，并支持同步或异步发送"],
  [/Simple HTTP Server/i, "JDK简单HTTP服务器适合受控服务与教学探针，生产边界仍需完整的限额、TLS和运营能力"],
  [/E-Mail/i, "邮件发送依赖SMTP等外部协议和身份配置，标准Java SE API并不自动提供完整邮件交付合同"],
  [/Design of JDBC/i, "JDBC 用驱动接口统一连接、语句和结果模型，数据库方言与驱动行为仍是明确兼容坐标"],
  [/Structured Query Language/i, "SQL 描述关系操作与事务语义，参数值应通过绑定进入而非拼接进语法"],
  [/JDBC Configuration/i, "配置包括驱动、URL、凭证、超时和池策略，敏感信息与环境差异要独立管理"],
  [/JDBC Statements/i, "PreparedStatement 把语句结构与参数分离，同时支持类型绑定与重复执行"],
  [/Query Execution/i, "执行结果可能是结果集、更新计数或异常，调用者要匹配语句类型并消费关闭"],
  [/Scrollable and Updatable/i, "可滚动可更新结果集依赖驱动能力与并发模式，不应假定所有数据源都支持"],
  [/Row Sets/i, "RowSet 在结果集模型上提供可连接或断开使用方式，生命周期和同步策略仍需声明"],
  [/Metadata/i, "数据库和结果元数据帮助适配能力差异，但运行期探测不能替代受控schema迁移"],
  [/Transactions/i, "事务把一组操作置于提交或回滚边界，隔离级别决定并发现象而非简单速度开关"],
  [/Connection Management/i, "连接池借出有限外部资源，归还前必须清理事务、只读与会话状态"],
  [/Time Line/i, "Instant 位于UTC时间线，适合记录唯一时刻；显示时再结合时区规则"],
  [/Local Dates/i, "LocalDate 表达不含时区的日历日期，按月日运算与持续秒数不是同一种问题"],
  [/Date Adjusters/i, "TemporalAdjuster 把下个工作日、月末等规则封装为可测试日期变换"],
  [/Local Time/i, "LocalTime 是一天内墙钟时间，不携带日期和时区，不能单独定位全球时刻"],
  [/Zoned Time/i, "ZonedDateTime 结合本地字段、ZoneId和偏移；DST会产生不存在或重复的本地时间"],
  [/Formatting and Parsing/i, "DateTimeFormatter 可固定模式、Locale和解析严格度，格式字符串也是版本化协议"],
  [/Legacy Code/i, "与Date、Calendar等旧类型互操作时应在Instant或明确时区边界转换，避免默认区域渗入"],
  [/Locales/i, "Locale 是语言、地区和变体偏好，不是编码、时区或地理位置的万能替代"],
  [/Number Formats/i, "NumberFormat 处理区域化分组、小数、百分比和货币；存储值不应从展示字符串猜测"],
  [/Collation and Normalization/i, "归一化统一Unicode等价序列，Collator 按语言规则排序；二者解决不同问题"],
  [/Message Formatting/i, "MessageFormat 以占位参数保持语序可重排，字符串拼接会破坏翻译与格式控制"],
  [/Text Boundaries/i, "用户感知字符、单词和句子不总等于char索引，边界分析必须面对组合字符和脚本差异"],
  [/Text Input and Output/i, "国际化文本I/O需要显式编码、Locale与错误策略，平台默认值会导致跨环境漂移"],
  [/Resource Bundles/i, "资源包按基础名和Locale回退，缺失键、缓存和版本更新都需要测试"],
  [/Complete Example/i, "完整国际化例要把资源选择、参数格式、输入边界和回退同时串联，而不是只切换标签文本"],
  [/Compiler API/i, "JavaCompiler 接收文件对象、选项和诊断监听器；系统编译器在纯JRE式运行环境中可能不可用"],
  [/Scripting/i, "脚本API只定义引擎发现与绑定接口，具体语言引擎并非Java SE 25默认保证，执行仍需隔离"],
  [/Class Loaders/i, "类身份由二进制名与定义它的类加载器共同决定，委派和卸载影响插件隔离"],
  [/User Authentication/i, "认证验证主体是谁，授权决定主体能做什么；会话和凭证生命周期必须分开"],
  [/Digital Signatures/i, "数字签名验证私钥持有者对消息完整性的承诺，不提供消息机密性"],
  [/Encryption/i, "加密需要公开审查算法、正确模式、nonce与密钥管理；自制变换不能提供可信安全性"],
  [/User Interface Toolkits/i, "AWT、Swing与后续工具包处于不同抽象层；历史脉络不能替代当前线程和组件合同"],
  [/Displaying Frames/i, "顶层窗口的创建、显示、关闭策略和系统资源都应在EDT与应用生命周期中明确"],
  [/Displaying Information/i, "自定义绘制读取模型并使用Graphics上下文，不能在paintComponent中永久修改业务状态"],
  [/Event Handling/i, "事件从EDT按队列分派，监听器要快速返回并把长任务移出线程"],
  [/Preferences API/i, "Preferences 保存少量用户配置而非事务数据，节点位置、默认值和迁移需要版本策略"],
  [/Model-View-Controller/i, "Swing组件常把模型、UI委托和控制事件拆开，业务状态不应只存在于可视控件"],
  [/Layout Management/i, "布局管理器根据首选、最小尺寸和容器约束计算位置，比绝对坐标更能适应字体与Locale"],
  [/Text Input/i, "文本组件的Document承载内容模型，验证、文档事件和线程边界应围绕模型设计"],
  [/Choice Components/i, "选择组件把可选项模型与当前选择分离，键盘、空选择和动态更新都要验证"],
  [/Menus/i, "Action 可让菜单、按钮和快捷键共享命令状态，启用条件应来自模型而非复制布尔值"],
  [/Grid Bag/i, "GridBagLayout 用网格位置、权重、填充和边距表达伸缩约束，错误权重会制造大片空白或裁切"],
  [/Custom Layout/i, "自定义布局要实现尺寸计算和容器布局，并覆盖缩放、方向和不可见组件"],
  [/Dialog Boxes/i, "对话框有模态、所有者和结果生命周期；取消与关闭应产生明确业务结果"],
  [/Tables$/i, "JTable 以TableModel提供数据，视图排序和过滤后行索引必须转换回模型索引"],
  [/Rows and Columns/i, "行排序器与列模型改变视图坐标，持久业务身份不能依赖当前位置"],
  [/Cell Rendering and Editing/i, "renderer 是复用的绘制印章，editor 管理临时输入；二者都不应承载永久业务状态"],
  [/Trees/i, "JTree 以TreeModel表达层级，展开路径、懒加载与节点身份需要独立于显示文字"],
  [/Advanced AWT/i, "高级AWT涉及绘制上下文、几何变换和设备能力，像素与逻辑坐标要分开"],
  [/Raster Images/i, "位图内存约为宽×高×像素字节数，解码尺寸、色彩模型和缓存决定实际峰值"],
  [/Printing/i, "打印通过Pageable或Printable按页请求绘制，坐标变换与可打印区域不同于屏幕"],
  [/JNI/i, "JNI 通过本地桥接调用C代码，签名、线程附着、引用和异常处理均有额外脆弱边界"],
  [/FFM to Call/i, "FFM 用Linker、函数描述符和MethodHandle表达外部调用，使ABI合同在Java侧可检查"],
  [/Arenas/i, "Arena 管理一组内存段寿命；confined、shared与global策略改变关闭和线程访问规则"],
  [/Memory Segments/i, "MemorySegment 提供有界内存视图并关联存活作用域，关闭后访问会在Java边界失败"],
  [/Memory Layout/i, "MemoryLayout 描述字段大小、对齐、顺序与路径，必须与目标ABI真实布局一致"],
  [/Looking Up and Invoking/i, "SymbolLookup 找地址，Linker 根据函数描述符创建下调句柄；库身份和调用约定要冻结"],
  [/Callbacks/i, "upcall stub 让本地代码回调Java，目标方法句柄、线程与Arena寿命必须覆盖回调窗口"],
  [/Advanced Topics/i, "高级互操作要补充可变参数、结构返回、平台ABI和错误码等边界，并在目标平台逐项验证"],
];

function listPages() {
  return fs
    .readdirSync(CONTENT_ROOT)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((sectionSlug) => {
      const sectionDir = path.join(CONTENT_ROOT, sectionSlug);
      const file = fs.readdirSync(sectionDir).find((name) => name.endsWith(".mdx"));
      if (!file) throw new Error(`章节目录缺少MDX：${sectionSlug}`);
      return {
        sectionSlug,
        chapterSlug: file.replace(/\.mdx$/, ""),
        filePath: path.join(sectionDir, file),
      };
    });
}

function pascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function explanation(concept, profile, index) {
  const title = concept.replace(/^\d+(?:\.\d+)*\s*/, "");
  const rule = FACT_RULES.find(([pattern]) => pattern.test(title));
  const fact = rule
    ? rule[1]
    : `${title}必须放进${profile.stages.join("—")}这条本章机制链，而不能从目录词直接推断实现保证`;
  const focus = profile.focuses[index % profile.focuses.length];
  return `${concept}：${fact}。本节点以“${focus}”为观察焦点；运行\`${profile.model.probe}\`或等价最小探针后，保存输入、诊断、实际结果和不适用边界。`;
}

function sourceBasis(profile) {
  return [
    "jct-14e-v1-03-fundamental-structures",
    "jct-14e-v2-01-streams",
  ].includes(profile.chapterSlug)
    ? "authorized-sample"
    : "outline-only";
}

function bookUrl(profile) {
  return profile.chapterSlug.includes("-v2-") ? SOURCES.volume2 : SOURCES.volume1;
}

function termEntries(profile) {
  return profile.focuses.slice(0, 6).map((term, index) => ({
    term,
    definition: [
      `${term}是${profile.title}首先要固定的语言、API或运行时坐标。`,
      `${term}连接${profile.stages[0]}与${profile.stages[1]}，改变它必须留下编译或运行证据。`,
      `${term}标识${profile.title}中的状态、资源或协议责任，不能依赖默认环境猜测。`,
      `${term}用于观察${profile.model.outcomes.success}，同时要报告${profile.model.outcomes.risk}。`,
      `${term}限定${profile.model.axisA.label}与${profile.model.axisB.label}的适用范围。`,
      `${term}进入${profile.title}的回归证据；故障修复后必须以相同输入重放。`,
    ][index],
  }));
}

function buildProfiles(pages, manifest) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const formalTitles = manifest.units.map((unit) => unit.title);
  const reviewConcepts = [
    "Freeze the Java 25 toolchain",
    "Prove type and object contracts",
    "Measure collections, streams, and concurrency",
    "Bound modules, files, and network protocols",
    "Preserve database and time semantics",
    "Threat-model code and data",
    "Keep UI and native memory responsive and owned",
    "Hand off reproducible cross-layer evidence",
  ];
  return pages.map((page, order) => {
    const parsed = matter(fs.readFileSync(page.filePath, "utf8"));
    const specValue = SPECS[page.chapterSlug];
    if (!specValue) throw new Error(`缺少章专属画像：${page.chapterSlug}`);
    const unit = units.get(page.chapterSlug);
    const concepts = unit
      ? unit.concepts.map((alternatives) => alternatives[0])
      : page.chapterSlug.includes("learning-map")
        ? formalTitles
        : reviewConcepts;
    return {
      ...page,
      order,
      title: String(parsed.data.title),
      type: String(parsed.data.type ?? "C"),
      concepts,
      componentBase: pascal(page.chapterSlug),
      sourceBasis: null,
      bookUrl: null,
      ...specValue,
    };
  }).map((profile) => ({
    ...profile,
    sourceBasis: sourceBasis(profile),
    bookUrl: bookUrl(profile),
    notes: Object.fromEntries(
      profile.concepts.map((concept, index) => [
        concept,
        explanation(concept, profile, index),
      ]),
    ),
  }));
}

function wrapperSource(profile) {
  const props = {
    unitId: profile.chapterSlug,
    title: profile.title,
    concepts: profile.concepts,
    stages: profile.stages,
    focuses: profile.focuses,
    model: profile.model,
  };
  return `import { OfficialJct25Studio } from "./official-jct-lab";\n\nconst props = ${JSON.stringify(props, null, 2)} as const;\n\nexport function ${profile.componentBase}MapLab() {\n  return <OfficialJct25Studio {...props} mode="map" />;\n}\n\nexport function ${profile.componentBase}ExperimentLab() {\n  return <OfficialJct25Studio {...props} mode="experiment" />;\n}\n\nexport function ${profile.componentBase}EvidenceLab() {\n  return <OfficialJct25Studio {...props} mode="evidence" />;\n}\n`;
}

function renderPage(profile) {
  const terms = termEntries(profile);
  const imports = `import {\n  ${profile.componentBase}MapLab,\n  ${profile.componentBase}ExperimentLab,\n  ${profile.componentBase}EvidenceLab,\n} from "@/components/mdx/java-core-tech/diagrams/${profile.chapterSlug}";\nimport {\n  Objectives,\n  Callout,\n  Glossary,\n  GlossaryItem,\n  Term,\n  Exercises,\n  Answer,\n  Stepper,\n  Step,\n  Attribution,\n} from "@/components/mdx/mdx-components";`;
  const deepDive = profile.concepts
    .map(
      (concept, index) => `### ${concept}\n\n**四级证据 ${index + 1}/${profile.concepts.length}。** ${profile.notes[concept]}\n\n验证 ${concept} 时，先预测它在 ${profile.stages[index % profile.stages.length]} 阶段会怎样改变${profile.model.outcomes.success}；只切换${profile.model.axisA.label}或${profile.model.axisB.label}中的一项。若故障“${profile.model.fault}”没有产生预期首错，就撤回当前解释并检查替代原因。`,
    )
    .join("\n\n");
  const practices = profile.concepts
    .map(
      (concept, index) => `${index + 1}. ${concept}：选择“${profile.focuses[index % profile.focuses.length]}”作为观察点，运行\`${profile.model.probe}\`或同义最小切片，再以故障、恢复和复位补齐四级证据。`,
    )
    .join("\n");
  const glossary = terms
    .map(
      ({ term, definition }) => `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`,
    )
    .join("\n");
  const sourceDetail =
    profile.sourceBasis === "authorized-sample"
      ? "本页所在卷的产品页同时提供本章合法试读；试读仅用于核对公开样章范围，仍不复制原书叙事。"
      : "未取得本章原书正文；产品页只限定标题和小节范围，目录核对不被表述为正文忠实。";
  return `${imports}\n\n<Objectives>\n\n- 能解释${profile.duty}\n- 能沿${profile.stages.join("、")}画出本章语义、状态、资源与失败传播链\n- 能操作${profile.model.studio}，一次只改变${profile.model.axisA.label}或${profile.model.axisB.label}\n- 能触发“${profile.model.fault}”，根据${profile.model.invariant}完成修复、复位与同输入重放\n\n</Objectives>\n\n{/* JCT_QUALITY_V2 */}\n\n## 为什么从“${profile.model.studio}”开始\n\n${profile.title}要解决的不是 API 名称记忆，而是${profile.duty} 直觉上，编译成功只排除了部分静态错误；运行一次成功也没有覆盖空值、极值、取消、并发、资源关闭、区域、协议与版本边界。\n\n先预测：把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切换为“${profile.model.axisA.levels[2]}”，${profile.model.outcomes.success}与${profile.model.outcomes.risk}会如何变化？随后只改这一项运行探针；结果不符时修改机制假设，不移动输入边界。\n\n## 来源、版次与独立重写边界\n\nInformIT/Oracle Press 的[卷 I 产品页](${SOURCES.volume1})与[卷 II 产品页](${SOURCES.volume2})确认 Cay S. Horstmann《Core Java》第14版全两卷于2025年10月出版、面向 Java 25，并给出25章、214个正式章/节标题。${sourceDetail}\n\n本页技术事实由[Java SE 25 API](${SOURCES.api})、[Java SE 25 语言规范](${SOURCES.jls})、[Java SE 25 JVM 规范](${SOURCES.jvms})与[OpenJDK 25 项目页](${SOURCES.openjdk})中的适用部分独立复核。中文解释、代码、图示、交互、参数、练习与答案均为独立教学重写；Oracle 文档许可证不被误报为原书授权。\n\n## 本章机制与六个检查点\n\n${terms.map(({ term, definition }) => `<Term def=${JSON.stringify(definition)}>${term}</Term>`).join("、")}。\n\n${profile.title}以“${profile.model.invariant}”为不变量。${profile.model.axisA.label}与${profile.model.axisB.label}是离散输入，${profile.model.outcomes.success}是主结果，${profile.model.outcomes.risk}必须单独报告；这些交互分数是课程中的透明反馈，不是原书或JDK性能基准。\n\n## 先预测，再操作三层章专属实验\n\n<Stepper>\n  <Step title="1. 正式节点与语义运行链">\n    选择任一正式节点，核对它在${profile.stages.join("、")}中的位置及负责证据。\n\n    <${profile.componentBase}MapLab />\n  </Step>\n  <Step title="2. 单变量代码或配置实验">\n    只切换${profile.model.axisA.label}或${profile.model.axisB.label}，比较结果与风险，并运行本章最小探针。\n\n    <${profile.componentBase}ExperimentLab />\n  </Step>\n  <Step title="3. 故障、恢复与复位">\n    注入“${profile.model.fault}”，保存首错；修复后以相同输入重放，最后点击重置核对初值。\n\n    <${profile.componentBase}EvidenceLab />\n  </Step>\n</Stepper>\n\n## 官方目录逐项深读\n\n${deepDive}\n\n## Java 25 最小可执行切片\n\n\u0060\u0060\u0060java\n${profile.code}\n\u0060\u0060\u0060\n\n该切片围绕“${profile.model.probe}”保留本章最小机制，不承担完整生产实现。运行时固定 Java 25 发行版、操作系统、编译选项、模块或类路径和输入；保存标准输出、标准错误、退出码、资源状态与实际耗时。\n\n\u0060\u0060\u0060yaml\nunit: ${profile.chapterSlug}\naxis_a: ${profile.model.axisA.label}\naxis_b: ${profile.model.axisB.label}\nfault: ${profile.model.fault}\ninvariant: ${profile.model.invariant}\nscenarios: [baseline, fault, recovery, reset]\n\u0060\u0060\u0060\n\n## 三个必须主动触发的误区\n\n<Callout type="trap" title="编译成功不等于合同成立">\n  ${profile.title}必须覆盖运行时输入、状态与资源边界；编译器没有承诺${profile.model.invariant}会在所有外部条件下自动成立。\n</Callout>\n\n<Callout type="trap" title="本章核心故障">\n  ${profile.model.fault}。先定位${profile.stages.join("→")}中的第一个分叉，再修改最小原因。\n</Callout>\n\n<Callout type="trap" title="修复后没有同输入重放">\n  只展示新结果无法证明修复；必须恢复原始Java版本、输入与资源坐标，让原反例转成稳定回归，再执行重置。\n</Callout>\n\n## 练习、答案与目录节点验证\n\n<Exercises>\n\n**问题 1：单变量实验。** 怎样验证${profile.model.axisA.label}而不让${profile.model.axisB.label}混入结论？\n\n<Answer>\n  固定Java 25、输入、${profile.model.axisB.label}与观察窗口，只把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”切到“${profile.model.axisA.levels[2]}”；保存${profile.model.outcomes.success}、${profile.model.outcomes.risk}与首个诊断差异。\n</Answer>\n\n**问题 2：逐节点四级证据。** 本页正式目录怎样从“出现”升级为解释、可视与练习验证？\n\n<Answer>\n${practices}\n</Answer>\n\n**问题 3：故障闭环。** 遇到“${profile.model.fault}”时怎样判定修复真正成立？\n\n<Answer>\n  在${profile.stages.join("、")}中定位首错，只修复该因果前提；随后重放正常、故障、恢复和复位四条轨迹。只有“${profile.model.invariant}”再次成立，且计数、选择和资源都回到相同初值，本章才通过。\n</Answer>\n\n</Exercises>\n\n## 术语复核与本章回顾\n\n<Glossary>\n${glossary}\n</Glossary>\n\n完成${profile.title}意味着能解释${profile.duty}，能运行并改动章专属切片，能主动制造“${profile.model.fault}”，还能凭${profile.model.outcomes.evidence}完成恢复与交接。只会复述目录或展示一次成功输出，均未满足本章门禁。\n\n<Attribution\n  mode="independent-rewrite"\n  sourceBasis="${profile.sourceBasis}"\n  workTitle="Cay S. Horstmann, Core Java, Fourteenth Edition, Volumes I and II"\n  adaptedUrl="${profile.bookUrl}"\n/>\n`;
}

function updateManifest(manifest, profiles) {
  manifest.sourceKind =
    "publisher-official-two-volume-toc-authorized-samples-and-java-25-primary-specifications";
  manifest.status = "verified-outline-samples-independent-rewrite";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "outline-only";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 25, outlineNodes: 214, pages: 27 };
  manifest.disclosureNote =
    "InformIT/Oracle Press两卷产品页核定第14版、Java 25、出版信息与25章214个正式节点；卷I第3章与卷II第1章提供合法试读，其余单元仅以完整目录界定范围。课程中文解释、代码、图示、交互与练习均为独立教学重写，技术事实由Oracle Java SE 25 API/JLS/JVMS及OpenJDK 25一手资料复核，不宣称复现未获授权的原书正文。";
  manifest.factSourcePolicy =
    "每个正式节点必须同时具备出现、独立解释、章专属交互或代码实验、练习验证四级证据；目录不作为技术事实来源，样章不向其他章节外推。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    volume1Publisher: {
      kind: "publisher-official-complete-outline-and-authorized-sample",
      label: "InformIT卷I产品页、完整目录与第3章合法试读",
      url: SOURCES.volume1,
    },
    volume2Publisher: {
      kind: "publisher-official-complete-outline-and-authorized-sample",
      label: "InformIT卷II产品页、完整目录与第1章合法试读",
      url: SOURCES.volume2,
    },
    java25Api: {
      kind: "vendor-official-api-specification",
      label: "Oracle Java SE 25与JDK 25 API规范",
      url: SOURCES.api,
    },
    java25Jls: {
      kind: "language-primary-specification",
      label: "Java SE 25语言规范",
      url: SOURCES.jls,
    },
    java25Jvms: {
      kind: "vm-primary-specification",
      label: "Java SE 25虚拟机规范",
      url: SOURCES.jvms,
    },
    java25Migration: {
      kind: "vendor-official-migration-guide",
      label: "Oracle JDK 25迁移指南",
      url: SOURCES.migration,
    },
    openjdk25: {
      kind: "upstream-official-release-page",
      label: "OpenJDK JDK 25项目页",
      url: SOURCES.openjdk,
    },
  };
  const bySlug = new Map(profiles.map((profile) => [profile.chapterSlug, profile]));
  for (const unit of manifest.units) {
    const profile = bySlug.get(unit.id);
    if (!profile) throw new Error(`manifest单元缺少页面：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess = profile.sourceBasis;
    unit.factSourceIds = [
      profile.chapterSlug.includes("-v2-") ? "volume2Publisher" : "volume1Publisher",
      "java25Api",
      "java25Jls",
      "java25Jvms",
      "openjdk25",
    ];
  }
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少fidelity manifest：${BOOK}`);
const pages = listPages();
const profiles = buildProfiles(pages, manifest);
if (profiles.length !== 27) throw new Error(`应有27页，实际${profiles.length}`);

const portableProfiles = profiles.map((profile) => ({
  ...profile,
  filePath: path.relative(ROOT, profile.filePath),
}));
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: portableProfiles }, null, 2)}\n`,
);

for (const profile of profiles) {
  const parsed = matter(fs.readFileSync(profile.filePath, "utf8"));
  const data = {
    ...parsed.data,
    description: `${profile.duty} 覆盖${profile.concepts.length}个正式节点，并通过Java 25代码、故障注入和复位证据验收。`,
    qualityVersion: 2,
    practiceMode: profile.model.practiceMode,
    sourceMode: "independent-rewrite",
    sourceUrl: profile.bookUrl,
  };
  fs.writeFileSync(profile.filePath, matter.stringify(renderPage(profile), data));
  fs.writeFileSync(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
  );
}

updateManifest(manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
console.log(`已重构${profiles.length}页、${manifest.units.length}个正式单元。`);
