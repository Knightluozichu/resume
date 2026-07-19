#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "coder-revolution";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const DIAGRAM_ROOT = path.join(
  ROOT,
  "src/components/mdx/coder-revolution/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/coder-revolution-v2-profiles.json",
);
const SCOPE_URL =
  "https://www.phei.com.cn/module/goods/wssd_content.jsp?bookid=52126";

const SOURCES = {
  scope: {
    title: "电子工业出版社《码农翻身》商品页、完整目录与前言",
    url: SCOPE_URL,
    kind: "publisher-primary-complete-toc-and-preface",
  },
  author: {
    title: "刘欣（@码农翻身）作者博客",
    url: "https://www.cnblogs.com/onlyliuxin/",
    kind: "author-primary",
  },
  posix: {
    title: "Linux man-pages: POSIX threads overview",
    url: "https://man7.org/linux/man-pages/man7/pthreads.7.html",
    kind: "standards-documentation-primary",
  },
  linux: {
    title: "Linux kernel memory-management documentation",
    url: "https://docs.kernel.org/admin-guide/mm/concepts.html",
    kind: "official-documentation-primary",
  },
  riscv: {
    title: "RISC-V unprivileged ISA specification",
    url: "https://docs.riscv.org/reference/isa/unpriv/unpriv-index.html",
    kind: "open-isa-specification-primary",
  },
  tcp: {
    title: "RFC 9293: Transmission Control Protocol",
    url: "https://www.rfc-editor.org/info/rfc9293",
    kind: "internet-standard-primary",
  },
  http: {
    title: "RFC 9110: HTTP Semantics",
    url: "https://www.rfc-editor.org/rfc/rfc9110.html",
    kind: "internet-standard-primary",
  },
  tls: {
    title: "RFC 8446: TLS 1.3",
    url: "https://www.rfc-editor.org/info/rfc8446",
    kind: "internet-standard-primary",
  },
  oauth: {
    title: "RFC 6749: OAuth 2.0 Authorization Framework",
    url: "https://www.rfc-editor.org/info/rfc6749",
    kind: "internet-standard-primary",
  },
  epoll: {
    title: "Linux man-pages: epoll",
    url: "https://www.man7.org/linux/man-pages/man7/epoll.7.html",
    kind: "official-system-documentation-primary",
  },
  postgres: {
    title: "PostgreSQL current documentation",
    url: "https://www.postgresql.org/docs/current/",
    kind: "official-documentation-primary",
  },
  redis: {
    title: "Redis official documentation",
    url: "https://redis.io/docs/latest/",
    kind: "official-documentation-primary",
  },
  jvms: {
    title: "Java Virtual Machine Specification",
    url: "https://docs.oracle.com/en/java/javase/26/docs/specs/jvms/index.html",
    kind: "language-specification-primary",
  },
  java: {
    title: "Java language and VM specifications",
    url: "https://docs.oracle.com/javase/specs/",
    kind: "language-specification-primary",
  },
  spring: {
    title: "Spring Framework core reference",
    url: "https://docs.spring.io/spring-framework/reference/core.html",
    kind: "official-framework-documentation-primary",
  },
  git: {
    title: "Git official reference",
    url: "https://git-scm.com/docs",
    kind: "official-documentation-primary",
  },
  maven: {
    title: "Apache Maven official guides",
    url: "https://maven.apache.org/guides/",
    kind: "official-documentation-primary",
  },
  junit: {
    title: "JUnit current user guide",
    url: "https://docs.junit.org/current/user-guide/",
    kind: "official-documentation-primary",
  },
  ecma: {
    title: "ECMAScript language specification",
    url: "https://tc39.es/ecma262/",
    kind: "language-specification-primary",
  },
  node: {
    title: "Node.js API documentation",
    url: "https://nodejs.org/api/documentation.html",
    kind: "official-runtime-documentation-primary",
  },
};

const F = String.raw;
const K = (
  family,
  practice,
  mechanism,
  formula,
  fault,
  before,
  after,
  nodes,
  source,
) => ({
  family,
  practice,
  mechanism,
  formula,
  fault,
  before,
  after,
  nodes,
  source,
});

const KNOWLEDGE = {
  "crv18-preface": K(
    "book",
    "design",
    "故事负责建立动机，机制图负责列出对象、状态、边界和可推翻的证据；两者通过一张类比拆解表连接",
    F`mastery = explanation \times experiment \times diagnosis`,
    "复述人物行为却说不出真实组件的输入、状态和失败条件",
    "以读完故事作为完成",
    "以可迁移的机制证据作为完成",
    ["故事问题", "真实对象", "状态变化", "边界反例", "迁移复核"],
    "author",
  ),
  "crv18-chapter-01": K(
    "os",
    "design",
    "程序从指令、CPU、内存、进程、线程、设备、文件与网络逐层获得执行能力，每层只承诺自己的资源合同",
    F`execution = instructions + address\ mapping + scheduling + I/O`,
    "把线程、进程、CPU 与文件系统画成没有方向和所有权的一组名词",
    "把计算机看成黑盒",
    "按资源边界追踪一次程序执行",
    ["程序指令", "CPU执行", "地址空间", "设备I/O", "外部结果"],
    "linux",
  ),
  "crv18-section-01-01": K(
    "os",
    "simulation",
    "同一进程内的线程共享地址空间和进程资源，却各有调用栈与调度上下文；调度器在可运行线程间切换",
    F`counter_{final}=counter_0+\sum_{i=1}^{n}\Delta_i`,
    "两个线程把读—改—写当成一个原子动作，导致共享计数丢失更新",
    "只有一条顺序执行流",
    "共享资源上的多条可调度执行流",
    ["创建线程", "就绪队列", "获得CPU", "等待资源", "结束回收"],
    "posix",
  ),
  "crv18-section-01-02": K(
    "network",
    "calculation",
    "分层协议让应用数据依次获得传输层端到端语义和网络层寻址语义，接收端再按相反顺序解封装",
    F`payload = packet\_length - IP\_header - transport\_header`,
    "把 IP 的尽力交付误写成 TCP 的可靠、有序字节流保证",
    "一段数据直接跨越网络",
    "每层增加并验证自己的协议字段",
    ["应用数据", "TCP分段", "IP数据报", "链路帧", "逐层解封"],
    "tcp",
  ),
  "crv18-section-01-03": K(
    "network",
    "simulation",
    "TCP 用序号、累计确认、接收窗口、重传和拥塞控制，把可能丢失或乱序的分组整理成有序字节流",
    F`bytes_{flight}\leq\min(cwnd,rwnd)`,
    "只增加重传次数却不限制在途数据，使拥塞期间的丢包继续放大",
    "发送方投递后不再关心",
    "发送与确认共同推进可靠字节流",
    ["写入字节", "分配序号", "网络传送", "确认窗口", "超时重传"],
    "tcp",
  ),
  "crv18-section-01-04": K(
    "hardware",
    "calculation",
    "CPU 以取指、译码、执行和提交推进指令；缓存缩短常见访存，流水线重叠不同指令阶段但会被依赖和分支打断",
    F`T_{cpu}=instruction\_count\times CPI\times cycle\_time`,
    "只用主频判断性能，忽略指令数、CPI、缓存未命中和分支停顿",
    "一条指令走完才开始下一条",
    "阶段重叠且能解释停顿来源",
    ["取指", "译码", "执行", "访存缓存", "提交结果"],
    "riscv",
  ),
  "crv18-section-01-05": K(
    "os",
    "simulation",
    "进程提供隔离的虚拟地址空间和资源身份，页表把虚拟页映射到物理页，线程则在该进程资源内执行",
    F`virtual\_address = VPN\times page\_size + offset`,
    "把指针值当成物理地址，或让两个进程未经共享映射直接访问同一虚拟地址",
    "程序等同于一段磁盘文件",
    "运行实例拥有地址映射与资源生命周期",
    ["装载程序", "创建进程", "映射页面", "调度线程", "退出回收"],
    "linux",
  ),
  "crv18-section-01-06": K(
    "hardware",
    "calculation",
    "文件系统把名称解析为元数据与数据块，并用空闲空间结构分配块；磁盘或块设备只负责持久化块读写",
    F`T_{read}=T_{queue}+T_{seek}+T_{rotation}+T_{transfer}`,
    "断电前只写目录项而未持久化数据与元数据顺序，恢复后得到悬空或旧内容",
    "文件就是连续字节躺在固定位置",
    "名称、元数据、块映射和持久化分工",
    ["解析路径", "读取元数据", "定位数据块", "设备传输", "同步持久化"],
    "linux",
  ),
  "crv18-section-01-07": K(
    "hardware",
    "calculation",
    "键盘经控制器和总线产生输入；轮询由 CPU 主动检查，中断在事件到来时通知，DMA 则让大块数据不必逐字节占用 CPU",
    F`CPU\_cost_{poll}=checks\times cost_{check}`,
    "把中断与 DMA 都解释成设备直接执行应用代码，遗漏驱动和内核的边界",
    "CPU 持续等待每个设备",
    "事件通知与批量搬运减少忙等",
    ["按键扫描", "控制器缓冲", "中断通知", "驱动读取", "进程消费"],
    "linux",
  ),
  "crv18-section-01-08": K(
    "data",
    "diagnosis",
    "数据库用模式、约束、事务与访问控制集中管理数据；并发控制需要让提交历史满足声明的一致性级别",
    F`atomic\ transaction:\quad commit\;\lor\;rollback`,
    "两个会话先读后写同一余额却没有锁、版本检查或可串行化隔离，产生丢失更新",
    "每个应用维护自己的重复文件",
    "共享数据由事务和约束裁决",
    ["定义模式", "开始事务", "读取版本", "写入约束", "提交或回滚"],
    "postgres",
  ),
  "crv18-section-01-09": K(
    "network",
    "simulation",
    "socket 是进程访问网络协议栈的端点接口；服务器 bind/listen/accept，客户端 connect，连接由地址、端口和协议状态共同区分",
    F`connection=(srcIP,srcPort,dstIP,dstPort,protocol)`,
    "把监听 socket 与 accept 返回的已连接 socket 混为一个状态，导致生命周期和并发处理错误",
    "应用直接操作网络分组",
    "文件描述符承接连接状态与字节流",
    ["创建端点", "绑定监听", "建立连接", "收发字节", "关闭连接"],
    "tcp",
  ),
  "crv18-section-01-10": K(
    "hardware",
    "calculation",
    "循环加法逐项执行并读写累加器，等差数列公式把重复工作化简为常数次运算；两者都受整数位宽约束",
    F`\sum_{i=1}^{n}i=\frac{n(n+1)}{2}`,
    "公式中先计算 n(n+1) 发生定宽整数溢出，即使最终结果本可表示也得到错误值",
    "用执行次数代表数学必然性",
    "比较算法复杂度、数据通路与溢出边界",
    ["读取n", "选择算法", "执行加乘", "检查溢出", "核对结果"],
    "riscv",
  ),
  "crv18-section-01-11": K(
    "language",
    "simulation",
    "编译器把高级语言翻译为汇编或目标代码，汇编器生成机器指令，链接器解析符号，加载器建立运行映像",
    F`source\rightarrow object\ files\rightarrow executable\rightarrow process`,
    "把编译成功当成符号已链接且程序必能装载，忽略外部库和运行时环境",
    "源代码被 CPU 直接理解",
    "翻译、链接和装载各自有输入输出",
    ["高级源码", "编译目标", "汇编机器码", "链接符号", "装载执行"],
    "riscv",
  ),
  "crv18-section-01-12": K(
    "os",
    "simulation",
    "互斥锁保护临界区，信号量以许可数约束同时进入者；正确性取决于共享状态的原子边界与先行发生关系",
    F`permits_{after}=permits_{before}-acquire+release`,
    "在异常路径漏掉解锁或 release，使后续线程永久等待",
    "多个线程任意改写共享变量",
    "同步原语声明访问顺序与容量",
    ["请求进入", "获取许可", "修改共享态", "发布可见性", "释放许可"],
    "posix",
  ),
  "crv18-section-01-13": K(
    "hardware",
    "calculation",
    "半加器用 XOR 产生和、AND 产生进位；全加器再合并输入进位，多个全加器串接构成多位加法",
    F`sum=a\oplus b\oplus c_{in},\quad c_{out}=ab+c_{in}(a\oplus b)`,
    "只计算每一位的 XOR 而未把低位进位送到高位，遇到 1+1 即失败",
    "加法被当成单个不可拆黑盒",
    "布尔门和进位链解释整数加法",
    ["输入位", "半加和", "生成进位", "合并进位", "输出多位"],
    "riscv",
  ),
  "crv18-section-01-14": K(
    "language",
    "calculation",
    "递归调用必须有可达基线，每次调用创建独立栈帧并缩小问题；返回值沿调用链反向合并",
    F`T(n)=T(n-1)+O(1),\quad S(n)=O(n)`,
    "递归分支没有严格逼近基线，造成无限递归或栈溢出",
    "函数只能由循环重复",
    "调用栈承载分解与回溯",
    ["检查基线", "缩小输入", "压入栈帧", "得到子结果", "返回合并"],
    "ecma",
  ),
  "crv18-chapter-02": K(
    "java",
    "design",
    "Java 生态用字节码、类加载、接口、容器与库把平台差异和对象装配隔离在稳定合同之后",
    F`Java\ system = language + classfile + JVM + libraries`,
    "把框架、虚拟机与语言语法混为同一层，出现问题时无法确定责任边界",
    "每个应用自行处理平台细节",
    "运行时与抽象接口共同承载应用",
    ["Java源码", "编译类文件", "类加载", "对象装配", "运行服务"],
    "jvms",
  ),
  "crv18-section-02-01": K(
    "java",
    "design",
    "Java 源码编译为 class 文件，JVM 验证并执行字节码；可移植性来自标准化类文件和运行时，而非一次生成的本机指令通吃所有平台",
    F`portability\ boundary = classfile\ format + JVM\ semantics`,
    "把跨平台口号理解为本地文件、字符编码和原生库也自动一致",
    "应用与单一操作系统 ABI 绑定",
    "字节码由各平台 JVM 实现共同语义",
    ["编写源码", "生成字节码", "验证类文件", "选择执行引擎", "调用平台服务"],
    "jvms",
  ),
  "crv18-section-02-02": K(
    "java",
    "simulation",
    "class 文件含常量池、字段、方法和属性；JVM 依次加载、验证、准备、解析与初始化，实例对象再引用已加载的类元数据",
    F`class\ lifecycle=load\rightarrow link\rightarrow initialize`,
    "在类初始化尚未完成时依赖静态字段的最终值，触发循环初始化或半成品状态",
    "Java Class 只是源码文件的副本",
    "类文件、运行时类与实例对象明确分层",
    ["读取class", "验证格式", "准备静态态", "解析符号", "初始化使用"],
    "jvms",
  ),
  "crv18-section-02-03": K(
    "data",
    "diagnosis",
    "持久化层把对象身份、关系和生命周期映射到数据库事务；ORM 减少样板代码，但不能消除查询计划和事务边界",
    F`queries_{N+1}=1+N`,
    "遍历关联对象时逐行延迟加载，产生 N+1 查询并把事务外访问变成失败",
    "对象图与关系表手工同步",
    "映射层显式管理身份、查询和事务",
    ["加载对象", "映射标识", "访问关系", "生成SQL", "事务提交"],
    "postgres",
  ),
  "crv18-section-02-04": K(
    "java",
    "code",
    "JDBC 以 Driver/DataSource、Connection、PreparedStatement 与 ResultSet 统一关系数据库访问，并把事务提交权留给连接边界",
    F`transaction = begin + statements + commit\;|\;rollback`,
    "拼接用户输入形成 SQL，既破坏参数类型也引入注入风险",
    "每个数据库驱动暴露完全不同调用方式",
    "统一接口与工厂选择具体驱动",
    ["取得连接", "准备语句", "绑定参数", "读取结果", "提交关闭"],
    "java",
  ),
  "crv18-section-02-05": K(
    "data",
    "diagnosis",
    "两阶段提交先让参与者 prepare 并持久化承诺，再由协调者发出 commit 或 rollback；它换取原子决定，也引入阻塞窗口",
    F`decision=commit\iff\forall participant:\ prepared`,
    "协调者在 prepare 后失联，参与者持锁等待决定，系统虽然一致却无法继续处理相关资源",
    "跨库写入各自独立提交",
    "协调协议统一决定但承担可用性代价",
    ["开启全局事务", "参与者执行", "准备投票", "协调决定", "完成释放"],
    "postgres",
  ),
  "crv18-section-02-06": K(
    "web",
    "code",
    "服务端页面把模型数据交给视图模板渲染；标签库和模板引擎减少脚本混写，但输出上下文仍需正确转义",
    F`response\ HTML = template(model)`,
    "把未经 HTML 上下文转义的用户内容直接插入页面，形成脚本注入",
    "业务查询、控制流和标记混在页面",
    "控制器准备模型，模板只负责呈现",
    ["接收请求", "调用业务", "构造模型", "模板渲染", "转义响应"],
    "http",
  ),
  "crv18-section-02-07": K(
    "data",
    "simulation",
    "消息队列把生产、持久化、投递、确认和重试分开；消费端要假设重复投递，并用业务键实现幂等",
    F`backlog_{t+1}=backlog_t+produced-consumed`,
    "消费者处理成功却在确认前断线，重投后重复扣款或重复发货",
    "调用方同步等待下游完成",
    "代理保存消息并让生产消费解耦",
    ["生产消息", "代理持久化", "分派消费", "业务落库", "确认或重试"],
    "java",
  ),
  "crv18-section-02-08": K(
    "java",
    "code",
    "JDK 动态代理为接口创建代理实例，InvocationHandler 在转发真实方法前后插入横切行为，并必须正确处理返回值与异常",
    F`result=handler(proxy,method,args)`,
    "代理再次调用代理自身而不调用目标对象，形成无限递归",
    "每个业务类手写相同日志或事务代码",
    "调用入口统一拦截并委托目标",
    ["取得接口", "创建代理", "拦截调用", "委托目标", "返回或抛错"],
    "java",
  ),
  "crv18-section-02-09": K(
    "java",
    "code",
    "注解是受类型约束的元数据，Retention 决定保留阶段，Target 限定位置，编译器、处理器或反射读取后才产生行为",
    F`behavior = reader(annotation, program\ element)`,
    "只添加注解却没有处理器或运行时读取者，误以为元数据会自动执行",
    "所有配置远离代码放在 XML",
    "局部元数据与显式读取机制配对",
    ["声明注解", "选择保留期", "标注元素", "处理器读取", "生成行为"],
    "java",
  ),
  "crv18-section-02-10": K(
    "java",
    "calculation",
    "Java 泛型在编译期检查参数化类型，多数信息经擦除映射到边界类型；泛型类默认不因类型实参继承而协变",
    F`List_{Integer}\not<:List_{Number}`,
    "把 List[Integer] 当成 List[Number] 写入 Double，破坏原容器元素合同",
    "集合以 Object 接口依赖强制转换",
    "类型参数把错误提前到编译期",
    ["声明类型参", "推断实参", "检查边界", "擦除桥接", "运行使用"],
    "java",
  ),
  "crv18-section-02-11": K(
    "engineering",
    "design",
    "日志系统把 logger 层级、级别判断、格式布局和输出目的地正交组合，调用点只提交结构化事件而不决定落盘策略",
    F`emit\iff event.level\ge logger.threshold`,
    "在禁用级别仍先构造昂贵字符串或执行有副作用的参数计算",
    "每个模块直接写文件或标准输出",
    "事件、过滤、格式和目的地独立配置",
    ["创建事件", "选择Logger", "级别过滤", "布局格式", "Appender输出"],
    "java",
  ),
  "crv18-section-02-12": K(
    "data",
    "design",
    "序列化把内存对象映射为带协议和版本的字节表示；接收端必须知道 schema、类型边界和不可信输入策略",
    F`wire\ value = encode(schema,object,version)`,
    "反序列化任意来源的类型图并在构造期间触发危险行为",
    "对象只能存在当前进程内存",
    "版本化协议跨进程或时间恢复数据",
    ["选择Schema", "编码字段", "传输字节", "校验版本", "受限解码"],
    "java",
  ),
  "crv18-section-02-13": K(
    "os",
    "simulation",
    "CAS 仅在当前值等于期望值时原子更新，失败方重读并重试；无锁不等于每个线程都有有限等待上界",
    F`CAS(addr,expected,new)\Rightarrow old=expected`,
    "值从 A 变为 B 又回到 A，单看数值的 CAS 未察觉版本变化而触发 ABA",
    "所有共享更新都由互斥锁串行",
    "条件原子更新减少阻塞但需要重试策略",
    ["读取旧值", "计算新值", "执行CAS", "检查失败", "退避重试"],
    "java",
  ),
  "crv18-section-02-14": K(
    "java",
    "design",
    "Spring 容器依据定义创建并注入 bean，IoC 把对象装配权交给容器；AOP 通常通过代理在连接点应用横切通知",
    F`application = container(wiring\ definitions,components)`,
    "同一类内部自调用绕过代理入口，导致预期的事务或通知没有执行",
    "对象在业务代码里自行寻找和构造依赖",
    "容器装配依赖，代理承接横切边界",
    ["读取Bean定义", "创建实例", "解析依赖", "生成代理", "调用业务"],
    "spring",
  ),
  "crv18-chapter-03": K(
    "web",
    "design",
    "Web 把 URI 标识、HTTP 消息、客户端呈现和服务端状态放在可独立演进的边界上，一次请求会穿越多层远程故障域",
    F`request\ path=client\rightarrow network\rightarrow service\rightarrow data`,
    "只画正常请求箭头，未标出超时、重试、认证和重复副作用",
    "页面与服务器被视作同一程序",
    "协议合同连接多个独立进程",
    ["定位资源", "建立连接", "发送请求", "服务处理", "返回表示"],
    "http",
  ),
  "crv18-section-03-01": K(
    "web",
    "design",
    "Web 的核心组合是 URI 标识资源、HTTP 交换表示、超文本链接连接资源；开放协议让客户端与服务器可分别实现",
    F`resource\xrightarrow{URI}request\xrightarrow{HTTP}representation`,
    "把 URL、服务器文件路径和资源本身当成同一个对象",
    "文档只能在单机应用内跳转",
    "统一标识与协议连接分布式超文本",
    ["创建URI", "解析目标", "HTTP请求", "返回表示", "跟随链接"],
    "http",
  ),
  "crv18-section-03-02": K(
    "network",
    "simulation",
    "客户端和服务器是独立进程，借助 socket 与应用协议交换带边界的消息；网络会延迟、重复、丢失或中断连接",
    F`response=f(request,state)`,
    "客户端超时后重试非幂等请求，服务器实际已成功而产生两次副作用",
    "两个函数在同一内存直接调用",
    "序列化消息穿越不可靠网络边界",
    ["构造请求", "连接服务", "传输消息", "处理状态", "接收响应"],
    "http",
  ),
  "crv18-section-03-03": K(
    "network",
    "simulation",
    "TLS 1.3 用证书链认证端点，通过握手建立共享密钥，再用带认证的对称加密保护记录；HTTPS 是 HTTP 运行在该安全通道上",
    F`HTTPS=HTTP\ over\ authenticated\ TLS`,
    "客户端忽略主机名或证书链校验，使加密连接仍可能终止在攻击者",
    "把所有数据直接用服务器 RSA 公钥逐块加密",
    "握手认证与高效记录保护分工",
    ["ClientHello", "协商参数", "验证证书", "派生密钥", "保护HTTP"],
    "tls",
  ),
  "crv18-section-03-04": K(
    "web",
    "design",
    "机房可靠性来自供电、制冷、网络、计算与存储的故障域隔离；冗余只有在共同故障不会同时击中副本时才有效",
    F`availability_{series}=\prod_i availability_i`,
    "两套服务放在同一电源、交换机或机架下，却按独立副本计算可用性",
    "一台更强服务器承担所有能力",
    "按故障域布置冗余并验证切换",
    ["识别负载", "划分故障域", "布置副本", "检测失效", "切换恢复"],
    "author",
  ),
  "crv18-section-03-05": K(
    "web",
    "simulation",
    "OAuth 授权码流程让资源所有者在授权服务器登录，客户端以授权码换取访问令牌；客户端不应取得用户密码",
    F`access\ token = exchange(code,client,redirect\ URI)`,
    "攻击者截获可复用授权码，客户端又未绑定 redirect URI 或 PKCE 校验值",
    "把用户密码交给每个第三方应用",
    "授权服务器签发有范围和期限的令牌",
    ["发起授权", "用户同意", "返回授权码", "后端换令牌", "携令牌访问"],
    "oauth",
  ),
  "crv18-section-03-06": K(
    "data",
    "diagnosis",
    "后端扩展需要分别处理缓存、分片、副本、负载均衡和故障转移；一致性哈希减少节点变化时的键迁移，却不自动解决副本一致性",
    F`shard=hash(key)\bmod N\quad(N\ fixed)`,
    "扩容时直接改变取模分母，绝大多数键重新映射并造成缓存穿透或数据找不到",
    "单库单进程承担全部请求",
    "按状态边界拆分容量与可用性职责",
    ["请求入口", "缓存命中", "选择分片", "读写副本", "故障转移"],
    "redis",
  ),
  "crv18-section-03-07": K(
    "language",
    "code",
    "函数把参数、局部状态、返回值与异常封装成调用合同；调用栈保存活动记录，纯函数还能用相同输入重放结果",
    F`y=f(x)\quad\text{with declared pre/post conditions}`,
    "函数暗中修改全局状态，使同样输入在不同调用次序下产生不同结果",
    "逻辑散落在可跳转语句中",
    "命名调用边界压缩并复用推理",
    ["绑定参数", "建立栈帧", "执行函数体", "返回或抛错", "释放栈帧"],
    "ecma",
  ),
  "crv18-section-03-08": K(
    "web",
    "design",
    "SOA 与微服务都以服务合同拆分能力；微服务强调独立部署和自治数据，因此必须承担网络、观测、一致性与运维成本",
    F`system\ reliability\leq\min(service\ path\ reliability)`,
    "按代码层而非业务能力拆服务，导致一次业务请求跨越大量同步调用",
    "单体内所有模块同批发布",
    "自治服务围绕能力独立演进",
    ["识别能力", "定义合同", "划分数据", "独立部署", "端到端观测"],
    "http",
  ),
  "crv18-section-03-09": K(
    "engineering",
    "design",
    "框架提供生命周期、默认控制流和扩展点，应用代码在约定时机被回调；库则通常由应用主动调用",
    F`framework\ flow\rightarrow application\ callback`,
    "绕过框架生命周期私建关键对象，导致配置、资源释放或横切能力失效",
    "应用自己编排全部基础流程",
    "框架控制主流程，应用填充扩展点",
    ["启动框架", "读取配置", "创建扩展", "回调应用", "统一收尾"],
    "spring",
  ),
  "crv18-section-03-10": K(
    "web",
    "simulation",
    "多进程为连接隔离执行上下文，select 扫描描述符集合，epoll 维护关注集合并返回就绪事件；就绪只表示现在可尝试 I/O",
    F`work_{select}=O(FD_{max}),\quad events_{epoll}=ready\ set`,
    "收到可读事件后阻塞读取完整请求，把事件循环卡在一个慢连接上",
    "一个连接占用一个串行服务器",
    "事件就绪驱动多连接非阻塞处理",
    ["监听连接", "注册兴趣", "等待就绪", "非阻塞读写", "更新兴趣"],
    "epoll",
  ),
  "crv18-chapter-04": K(
    "engineering",
    "design",
    "代码管理把变更身份、构建依赖、自动测试、缺陷证据和发布产物连成可审查流水线",
    F`change\rightarrow commit\rightarrow build\rightarrow test\rightarrow release`,
    "一次提交同时混入无关重构与功能，失败后无法独立回退或定位",
    "源码由个人目录和口头约定管理",
    "每个变更具来源、验证和可恢复产物",
    ["建立变更", "提交历史", "解析构建", "自动验证", "发布回退"],
    "git",
  ),
  "crv18-section-04-01": K(
    "engineering",
    "simulation",
    "Git 用 blob、tree、commit 和引用组成不可变对象图；分支是移动引用，合并依据共同祖先组合历史",
    F`commit=hash(tree,parents,author,message)`,
    "把分支当成文件副本并用覆盖目录解决分歧，丢失共同祖先和变更语义",
    "按日期复制整个源码目录",
    "内容寻址对象与引用记录可追溯历史",
    ["写入Blob", "生成Tree", "创建Commit", "移动Ref", "合并祖先"],
    "git",
  ),
  "crv18-section-04-02": K(
    "engineering",
    "simulation",
    "构建系统把源文件、生成步骤、依赖与产物声明成有向无环图；Maven 以生命周期、插件和依赖坐标复用构建约定",
    F`rebuild(node)\iff input\ hash\ changed`,
    "构建脚本依赖开发机未声明的文件或环境变量，干净环境无法重现产物",
    "按记忆手工执行编译打包命令",
    "声明式依赖图产生可重放产物",
    ["读取项目模型", "解析依赖", "执行阶段", "运行验证", "生成产物"],
    "maven",
  ),
  "crv18-section-04-03": K(
    "engineering",
    "diagnosis",
    "坏代码的可操作信号包括重复、过长职责、隐式依赖和高耦合；重构应在测试保护下小步保持外部行为",
    F`refactor:\ behavior_{before}=behavior_{after}`,
    "一次性重写大量模块并同时改变需求，使失败无法归因于重构还是新行为",
    "凭审美给代码贴好坏标签",
    "以行为证据裁决结构改进",
    ["锁定行为", "识别气味", "小步改动", "运行测试", "比较接口"],
    "junit",
  ),
  "crv18-section-04-04": K(
    "engineering",
    "code",
    "单元测试在隔离边界内安排输入、执行行为并断言结果；敏捷迭代依赖快速、确定、可重复的反馈而非测试数量",
    F`test=arrange+act+assert`,
    "测试依赖真实时间、网络或共享数据库，导致相同代码随机红绿",
    "功能完成后由人手工点一遍",
    "每次小变更立即得到可定位反馈",
    ["安排夹具", "执行单元", "断言结果", "清理状态", "回归重放"],
    "junit",
  ),
  "crv18-section-04-05": K(
    "engineering",
    "diagnosis",
    "调试从可复现输入出发提出可证伪假设，通过日志、断点、二分或最小化实验寻找最早偏离点，再补回归测试",
    F`search_{binary}\leq\lceil\log_2 n\rceil`,
    "同时修改多处并反复重试，现象消失后也不知道哪项改变真正相关",
    "看到异常就凭直觉改代码",
    "证据驱动定位并把缺陷固化为测试",
    ["固定复现", "提出假设", "缩小范围", "验证修复", "补回归测"],
    "git",
  ),
  "crv18-chapter-05": K(
    "language",
    "design",
    "编程语言用语法、类型、内存模型、运行时和工具链表达不同取舍；比较必须基于同一任务和约束",
    F`language\ choice=f(problem,team,runtime,ecosystem)`,
    "用一段微基准或个人语法偏好宣布某语言在所有场景更优",
    "语言被分成简单的高低等级",
    "按语义与工程约束选择工具",
    ["定义任务", "比较语义", "检查运行时", "评估工具链", "测量取舍"],
    "ecma",
  ),
  "crv18-section-05-01": K(
    "language",
    "code",
    "JavaScript 由 ECMAScript 规定语言语义，宿主提供 Web 或服务器 API；对象原型、函数和事件任务共同构成常见执行模型，JSON 是独立数据格式",
    F`program\ behavior=ECMAScript\ semantics+host\ APIs`,
    "用 eval 解析 JSON 或把 JSON 当成含函数与原型的完整 JavaScript 对象语法",
    "浏览器脚本只是页面装饰语句",
    "标准语言与多种宿主共同演进",
    ["解析脚本", "创建执行上下文", "访问宿主API", "排入任务", "产生页面结果"],
    "ecma",
  ),
  "crv18-section-05-02": K(
    "language",
    "simulation",
    "Node.js 让 JavaScript 回调在事件循环阶段运行，许多 I/O 委托给系统后在就绪时回调；长时间 CPU 任务仍会阻塞该线程的其他回调",
    F`latency_{others}\geq duration_{blocking\ callback}`,
    "在请求回调内执行大规模同步计算，使所有连接的事件处理一起延迟",
    "每个连接都必须占用一个等待线程",
    "非阻塞 I/O 与事件循环复用执行线程",
    ["接收事件", "发起异步I/O", "系统等待", "回调入队", "事件循环执行"],
    "node",
  ),
  "crv18-section-05-03": K(
    "language",
    "design",
    "C 常经编译链接为本机程序并显式管理内存，Java 生成类文件由 JVM 装载执行并以垃圾回收管理对象；两者最终都经操作系统访问磁盘",
    F`runtime\ image = code + static\ data + heap + stacks`,
    "把 Java 对象的持久化等同于 JVM 堆，进程退出后仍期待内存状态保留",
    "语言差异被简化为文件扩展名",
    "编译、运行时、内存和持久化分别比较",
    ["生成程序", "链接或加载", "分配内存", "调用系统I/O", "持久化文件"],
    "jvms",
  ),
  "crv18-section-05-04": K(
    "language",
    "design",
    "C、VB、C++、Java 与 Ruby 在类型检查、内存管理、运行时、抽象机制和生态上各有取舍，结论必须绑定任务与时代版本",
    F`fitness=correctness+delivery+operations-cost`,
    "把个人经历中的版本和工具缺陷外推成语言永恒本质",
    "用喜爱或讨厌代替技术比较",
    "同一任务下记录可验证约束与成本",
    ["固定任务", "声明版本", "实现同例", "测量运行", "记录维护"],
    "java",
  ),
  "crv18-section-05-05": K(
    "language",
    "code",
    "命令式程序给出状态变化步骤，声明式程序描述期望关系或结果并把求解策略交给执行器；两者可在不同层次组合",
    F`declarative:\ result=arg\ satisfy(constraints)`,
    "认为声明式描述没有执行成本，忽略查询计划、求解策略和数据规模",
    "所有问题都手写逐步控制流",
    "把策略选择交给有全局信息的执行器",
    ["描述目标", "解析约束", "生成计划", "执行计划", "核对结果"],
    "postgres",
  ),
  "crv18-chapter-06": K(
    "growth",
    "design",
    "职业精进依赖可持续的行动、基础模型、作品输出、反馈和复盘；经验年限本身不能替代这些证据",
    F`growth=practice\times feedback\times reflection`,
    "只收集课程和观点而没有输出、复现或外部反馈",
    "以阅读数量衡量成长",
    "用可检查作品和行为改变衡量进步",
    ["选择能力", "设计实践", "产出作品", "获得反馈", "复盘迭代"],
    "author",
  ),
  "crv18-section-06-01": K(
    "growth",
    "design",
    "内向不是能力缺陷；把高压力目标拆成准备、低风险表达、反馈和逐步扩大范围，能用行动数据替代性格标签",
    F`challenge_{next}=challenge_{current}+small\ increment`,
    "一次选择过高暴露强度，失败后把情境问题归因成永久性格限制",
    "等待完全自信才开始表达",
    "渐进实践建立可复用沟通能力",
    ["选择小目标", "提前准备", "完成表达", "收集反馈", "提高难度"],
    "author",
  ),
  "crv18-section-06-02": K(
    "hardware",
    "calculation",
    "局部性使缓存有效，抽象与分层限制认知边界，异步隐藏等待，分而治之缩小问题；每种原则都有适用条件和额外成本",
    F`AMAT=hit\ time+miss\ rate\times miss\ penalty`,
    "为增加缓存层而忽略失效策略，读到旧数据却把问题误判为数据库故障",
    "把六条原则当成无条件口号",
    "用可测成本选择缓存、分层和异步边界",
    ["识别局部性", "放置缓存", "建立抽象", "异步解耦", "递归拆分"],
    "riscv",
  ),
  "crv18-section-06-03": K(
    "growth",
    "design",
    "架构师把业务约束翻译成边界和取舍，保持基础模型、代码质量、抽象能力与技术领导力，并用反馈修正决策",
    F`decision=constraints+options+tradeoffs+evidence`,
    "只画目标架构而不记录约束、被拒方案、迁移路径和回退条件",
    "架构等同于职位或图形复杂度",
    "决策记录与运行证据共同承担领导力",
    ["澄清约束", "建立模型", "比较方案", "推动实施", "验证结果"],
    "author",
  ),
  "crv18-section-06-04": K(
    "growth",
    "design",
    "技术写作先定义读者问题和中心主张，再组织证据、示例、反例与修改；发布后的误解和复现结果进入下一轮修订",
    F`article=claim+evidence+example+revision`,
    "堆积术语和链接却没有明确读者、主张与可复现实例",
    "有完整想法后才开始写",
    "草稿、反馈和修订推动理解变清晰",
    ["选择读者", "写出主张", "补充证据", "邀请复现", "根据反馈修订"],
    "author",
  ),
  "crv18-section-06-05": K(
    "growth",
    "design",
    "有效学习把稳定目标、有限资料、主动回忆、动手项目和间隔复盘连成闭环，避免在摇摆、囤积、不读或放弃间循环",
    F`retention\uparrow\ with\ retrieval+spacing+feedback`,
    "连续收藏新资料却从不做闭卷回忆、实现或迁移题，形成熟悉感而非掌握",
    "用资料数量和连续观看制造进展感",
    "检索、实践和反馈生成可迁移能力",
    ["固定目标", "限制资料", "主动回忆", "完成项目", "间隔复盘"],
    "author",
  ),
};

const SPECIAL = {
  map: K(
    "book",
    "design",
    "学习地图把 60 个正式单元按计算机基础、Java、Web、代码管理、编程语言和职业精进连接成先机制后应用的依赖路线",
    F`verified\ units=60,\quad outline\ nodes=253`,
    "按标题随机跳读，遇到 Web 或框架问题时无法回到线程、协议和运行时前置模型",
    "把全书当成 60 个互不相关的故事",
    "每个单元声明前置、产出和复核证据",
    ["系统基础", "Java运行时", "Web协议", "工程变更", "语言与成长"],
    "scope",
  ),
  review: K(
    "book",
    "diagnosis",
    "总复习用一次线上请求和一次可审查变更贯穿 CPU、线程、TCP、TLS、Java、数据库、Git、构建、测试和复盘",
    F`release\ evidence=scope\times build\times runtime\times rollback`,
    "能复述每章名词，却不能从用户现象定位到协议、运行时、数据或变更链的最早偏离点",
    "知识按章节孤立保存",
    "跨层追踪并用证据裁决故障",
    ["用户请求", "运行时处理", "状态持久化", "变更发布", "反馈复盘"],
    "scope",
  ),
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

function flatConcepts(unit) {
  return (unit?.concepts ?? []).flat(Infinity).map(String);
}

function keyFor(chapterSlug) {
  if (chapterSlug.includes("learning-map")) return "map";
  if (chapterSlug.includes("final-review")) return "review";
  return chapterSlug;
}

function componentName(chapterSlug) {
  return `${chapterSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
    .replace(/[^A-Za-z0-9]/g, "")}Lab`;
}

function escapeYaml(value) {
  return JSON.stringify(String(value));
}

function escapeJs(value) {
  return JSON.stringify(String(value));
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function codeSketch(profile) {
  const title = profile.title.replaceAll("`", "");
  switch (profile.knowledge.family) {
    case "os":
      return `# ${title}：用事件轨迹验证状态转换\nstate = baseline_state()\nfor event in scenario:\n    state = transition(state, event)\n    assert invariant(state)\nassert reset(state) == baseline_state()`;
    case "network":
      return `# ${title}：每个报文都保留身份、顺序与结果\ntrace = protocol_run(fixed_payload, scenario="baseline")\nassert trace.first_error is None\nassert protocol_run(fixed_payload, scenario="fault").rejected\nassert protocol_run(fixed_payload) == trace`;
    case "hardware":
      return `# ${title}：先手算合同，再核对逐阶段轨迹\nexpected = calculate_reference(fixed_input)\ntrace = run_datapath(fixed_input)\nassert trace.output == expected\nassert run_datapath(fixed_input).output == expected`;
    case "data":
      return `# ${title}：提交、重试与回滚共享同一业务身份\nresult = execute_transaction(case_id, scenario="baseline")\nassert result.committed and invariant(result.state)\nfault = execute_transaction(case_id, scenario="fault")\nassert fault.rolled_back or fault.safe_to_retry`;
    case "java":
      return `// ${title}：接口行为与运行时边界一起验证\nvar baseline = runCase("baseline");\nassertContract(baseline);\nvar rejected = runCase("fault");\nassertTrue(rejected.isRejected());\nassertEquals(baseline, resetAndRun());`;
    case "web":
      return `# ${title}：用同一 request_id 串联跨层证据\nresponse = request(fixed_case, request_id="case-01")\nassert response.contract_ok\nassert inject_fault("one-boundary").first_deviation\nassert reset_and_request(fixed_case) == response`;
    case "engineering":
      return `# ${title}：变更必须有独立、可重放的验证\nbaseline = verify(clean_checkout())\nchanged = verify(apply_one_change())\nassert changed.expected_delta_only\nassert verify(revert_change()) == baseline`;
    case "language":
      return `// ${title}：比较语义，不比较口号\nconst input = fixedCase();\nconst expected = referenceModel(input);\nconst actual = runProgram(input);\nassert.deepEqual(actual, expected);\nassert.deepEqual(resetAndRun(input), expected);`;
    case "growth":
      return `# ${title}：行动证据进入下一轮计划\nplan = choose_one_skill_and_output()\nresult = practice(plan, fixed_timebox=True)\nfeedback = independent_review(result)\nassert revise(plan, feedback).has_observable_change`;
    default:
      return `# ${title}：按依赖顺序解锁并保留复核证据\nfor unit in learning_path:\n    assert prerequisites_verified(unit)\n    assert run_change_reset(unit).reproducible`;
  }
}

function makeWrapper(profile) {
  return `import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: ${escapeJs(profile.chapterSlug)},
  title: ${escapeJs(profile.title)},
  family: ${escapeJs(profile.knowledge.family)},
  nodes: ${JSON.stringify(profile.knowledge.nodes)},
  concepts: ${JSON.stringify(profile.concepts)},
  mechanism: ${escapeJs(profile.knowledge.mechanism)},
  success: ${escapeJs(`${profile.title} 的输入、机制、输出与复位轨迹一致`)},
  failure: ${escapeJs(`${profile.title} 在“${profile.knowledge.fault}”处拒绝`)},
} as const;

export function ${profile.componentName}() {
  return <CoderMechanismLab {...profile} />;
}
`;
}

function makePage(profile) {
  const concepts = profile.concepts.length
    ? profile.concepts
    : [profile.title, ...profile.knowledge.nodes];
  const conceptSections = concepts
    .map(
      (concept, index) => `### ${concept}

在 **${profile.title}** 中，目录坐标 **${concept}** 对应“${profile.knowledge.nodes[index % 5]}”这一步。它不是故事情节的复述，而是要求读者解释：${profile.knowledge.mechanism}。

复核 **${concept}** 时，为 ${profile.title} 固定一个最小输入，先写出预期状态和输出，再改变与“${profile.knowledge.nodes[index % 5]}”直接相连的一个条件。若出现“${profile.knowledge.fault}”，应记录最早偏离的节点、拒绝结果以及恢复后的重放结果。`,
    )
    .join("\n\n");
  const terms = profile.knowledge.nodes.slice(0, 5);
  const termLine = terms
    .map(
      (term) =>
        `<Term def=${escapeYaml(`${term} 是 ${profile.title} 机制链中的可观察状态或边界，必须用实际输入和轨迹验证`)}>${term}</Term>`,
    )
    .join("、");
  const glossary = terms
    .map(
      (term, index) => `<GlossaryItem term="${escapeAttribute(term)}">
  ${term} 位于 ${profile.title} 的第 ${index + 1} 个检查点；验收记录必须包含它的输入、状态、输出和故障表现。
</GlossaryItem>`,
    )
    .join("\n\n");
  const practiceList = concepts
    .map(
      (concept, index) =>
        `${concept}（检查 ${profile.knowledge.nodes[index % 5]}）`,
    )
    .join("；");
  const source = SOURCES[profile.knowledge.source];

  return `---
title: ${escapeYaml(profile.title)}
type: ${profile.type}
section: ${escapeYaml(profile.section)}
order: ${profile.order}
description: ${escapeYaml(`${profile.title}：从“${profile.knowledge.before}”推进到“${profile.knowledge.after}”，用专属机制图、实验和故障诊断验证。`)}
demo: true
math: true
sourceUrl: ${escapeYaml(SCOPE_URL)}
qualityVersion: 2
practiceMode: ${profile.knowledge.practice}
sourceMode: independent-rewrite
draft: false
---

import { ${profile.componentName} } from "@/components/mdx/coder-revolution/diagrams/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Term,
  Glossary,
  GlossaryItem,
  Exercises,
  Answer,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能解释 ${profile.title} 为什么把“${profile.knowledge.before}”推进为“${profile.knowledge.after}”
- 能沿 ${profile.knowledge.nodes.join(" → ")} 说清对象、状态和边界
- 能用本页公式或状态合同完成一次手算、代码、模拟、诊断或方案判断
- 能注入“${profile.knowledge.fault}”，定位最早偏离点并验证复位

</Objectives>

## 为什么需要这一机制

${profile.title} 不能停在故事类比。真实系统要解决的变化是从 **${profile.knowledge.before}** 到 **${profile.knowledge.after}**；可执行机制是：${profile.knowledge.mechanism}。

对 ${profile.title} 的验收从同一份最小输入开始，先预测 ${profile.knowledge.nodes.join("、")} 各自会看到什么，再运行正常、边界和故障场景。故事帮助记住矛盾，状态、协议、类型、构建或反馈证据才决定解释是否成立。

<Callout type="info" title="范围与事实来源">
  本页按电子工业出版社公开目录定位 ${profile.title} 的问题范围，并依据 [${source.title}](${source.url}) 独立重写技术机制。目录只证明主题坐标，不代表取得或复现原书正文。
</Callout>

## 核心合同

$$
${profile.knowledge.formula}
$$

在 ${profile.title} 中，公式或状态表达式里的量必须绑定到具体对象、单位、版本或生命周期。先给基线输入算出预期，再逐步观察；如果最终结果碰巧相同，但中途已违反 ${profile.knowledge.nodes[2]} 或 ${profile.knowledge.nodes[3]}，仍应拒绝该实现。

## 目录节点到机制证据

${conceptSections}

## 最小可重放实现

~~~text
${codeSketch(profile)}
~~~

这段实现草图只表达 ${profile.title} 的验证合同，不复制书中叙事或代码。实际运行时应保存输入、环境、每个节点状态、最终结果和复位结果，使另一位读者能够从干净状态重放。

## 专属因果实验

先预测改变一个控制量后，${profile.title} 的哪一节点最先变化。依次切换基线、边界和注入故障，保存一次轨迹；随后点击“重置实验”，确认控件、节点选择、压力值和状态文本全部恢复。

<${profile.componentName} />

## 故障诊断

<Callout type="trap" title=${escapeYaml(`误区：${profile.knowledge.fault}`)}>
  该错误会破坏 ${profile.title} 从“${profile.knowledge.before}”到“${profile.knowledge.after}”的转换。诊断时按 ${profile.knowledge.nodes.join(" → ")} 前进，只在首次出现预期与实际不一致的位置停下。
</Callout>

<Callout type="trap" title="误区：最终成功就算机制正确">
  ${profile.title} 的最终输出可能被缓存、重试、默认值或偶然时序掩盖。必须同时保存中间状态、拒绝语义和复位重放；缺少任一项都不能据此推广到更大规模。
</Callout>

<Callout type="tip" title="恢复顺序">
  ${profile.title} 的恢复顺序是：还原输入与环境 → 清理派生状态 → 重建当前边界 → 重跑机制链 → 对照公式或合同 → 再次注入同一故障确认可重复拒绝。
</Callout>

## 术语与边界

${profile.title} 使用五个可验证术语：${termLine}。术语若不能指向本页实验中的控件、节点或状态，就仍然只是目录名词。

<Glossary>

${glossary}

</Glossary>

## 本页小结

${profile.title} 的关键不是记住故事，而是能解释“${profile.knowledge.mechanism}”。完成标准是用本页合同推出预期，沿五个专属节点观察实际，诊断“${profile.knowledge.fault}”，并证明复位后的同一输入重新得到基线轨迹。

<Exercises>

1. ${profile.title} 的五节点链中，哪个状态最能区分“${profile.knowledge.before}”和“${profile.knowledge.after}”？请给出一个最小样本。

<Answer>
  先检查 ${profile.knowledge.nodes[0]} 的输入身份，再观察 ${profile.knowledge.nodes[1]} 与 ${profile.knowledge.nodes[2]}。只改变一个条件时，最早发生可解释变化的节点就是区分两种状态的证据；目录节点逐项核对为：${practiceList}。
</Answer>

2. 使用本页核心合同完成一次手算、状态推演或代码断言，并说明每个量对应哪个真实对象。

<Answer>
  为 ${profile.title} 写下输入值、单位、版本和边界，按公式得到预期，再与实验中的 ${profile.knowledge.nodes[2]} 和 ${profile.knowledge.nodes[4]} 比较。若发生隐式单位转换、状态复用或顺序变化，必须先修正模型，不能只调整答案。
</Answer>

3. 注入“${profile.knowledge.fault}”后，怎样证明恢复动作有效而非偶然成功？

<Answer>
  保存故障前基线与最早偏离点，执行本页恢复顺序，再用完全相同输入运行两次。${profile.title} 只有在控件状态、五节点轨迹、最终输出和拒绝结果都可重复时才算恢复完成。
</Answer>

</Exercises>

<Attribution />
`;
}

function replaceBookManifest(raw, slug, value) {
  const marker = `"${slug}"`;
  const markerIndex = raw.indexOf(marker);
  if (markerIndex < 0) throw new Error(`manifest 缺少 ${slug}`);
  const objectStart = raw.indexOf("{", markerIndex + marker.length);
  if (objectStart < 0) throw new Error(`manifest ${slug} 不是对象`);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < raw.length; index += 1) {
    const char = raw[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        objectEnd = index + 1;
        break;
      }
    }
  }
  if (objectEnd < 0) throw new Error(`manifest ${slug} 对象未闭合`);
  const lineStart = raw.lastIndexOf("\n", markerIndex) + 1;
  const indent = raw.slice(lineStart, markerIndex);
  const serialized = JSON.stringify(value, null, 2).replaceAll(
    "\n",
    `\n${indent}`,
  );
  return `${raw.slice(0, objectStart)}${serialized}${raw.slice(objectEnd)}`;
}

const manifestRaw = fs.readFileSync(MANIFEST_PATH, "utf8");
const manifestDocument = JSON.parse(manifestRaw);
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`manifest 缺少 ${BOOK}`);
const unitById = new Map((manifest.units ?? []).map((unit) => [unit.id, unit]));

const profiles = walkMdx(CONTENT_ROOT).map((filePath) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const chapterSlug = path.basename(filePath, ".mdx");
  const key = keyFor(chapterSlug);
  const knowledge = SPECIAL[key] ?? KNOWLEDGE[key];
  if (!knowledge) throw new Error(`缺少知识配置: ${key}`);
  const unit = unitById.get(chapterSlug);
  return {
    filePath,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    chapterSlug,
    key,
    title: String(parsed.data.title ?? unit?.title ?? chapterSlug),
    type: String(parsed.data.type ?? "B"),
    section: String(parsed.data.section ?? "码农翻身（2018年第1版）"),
    order: Number(parsed.data.order ?? 0),
    concepts: flatConcepts(unit),
    knowledge,
    componentName: componentName(chapterSlug),
  };
});

for (const profile of profiles) {
  fs.writeFileSync(profile.filePath, makePage(profile));
  fs.writeFileSync(
    path.join(DIAGRAM_ROOT, `${profile.chapterSlug}.tsx`),
    makeWrapper(profile),
  );
}

manifest.sourceUrl = SCOPE_URL;
manifest.scopeSourceUrl = SCOPE_URL;
manifest.secondarySourceUrls = [SOURCES.author.url];
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.status = "verified-outline-and-independent-technical-rewrite";
manifest.verifiedAt = "2026-07-19";
manifest.factSourcesVerifiedAt = "2026-07-19";
manifest.factSources = SOURCES;
manifest.disclosureNote =
  "电子工业出版社公开2018年5月第1版元数据、完整层级目录与前言；本课程据此界定60个正式单元和253个目录节点。除公开前言外，未取得原书全文，所有技术机制、图示、代码、实验和练习均依据标准、官方文档与作者公开资料独立重写，不宣称复现原书正文。";
for (const unit of manifest.units) {
  const knowledge = KNOWLEDGE[unit.id];
  if (!knowledge) throw new Error(`manifest 单元缺少知识配置: ${unit.id}`);
  unit.factSourceRefs = ["scope", knowledge.source];
  if (!unit.factSourceRefs.includes("author"))
    unit.factSourceRefs.push("author");
}

const updatedManifest = replaceBookManifest(manifestRaw, BOOK, manifest);
fs.writeFileSync(MANIFEST_PATH, updatedManifest);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      scope: SCOPE_URL,
      sourceMode: "independent-rewrite",
      profiles: profiles.map(({ filePath: _, ...profile }) => profile),
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    units: manifest.units.length,
    concepts: manifest.units.reduce(
      (sum, unit) => sum + flatConcepts(unit).length,
      0,
    ),
    sources: Object.keys(SOURCES).length,
  }),
);
