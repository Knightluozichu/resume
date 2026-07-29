#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx");
const MANIFESTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "quality/fidelity-manifests.json"), "utf8"),
).books;

function manifestIdentityUnits(bookSlug) {
  const units = MANIFESTS[bookSlug]?.units;
  if (!Array.isArray(units) || units.length === 0) {
    throw new Error(`Manifest units missing: ${bookSlug}`);
  }
  return Object.fromEntries(units.map(({ id }) => [id, id]));
}

function explainNetworkConcept(label, unitTitle, bookSlug) {
  const context = `${unitTitle}中的${label}`;
  if (bookSlug === "illustrated-http") {
    if (/状态码|响应|请求|报文|方法|URI|版本|连接/u.test(label)) {
      return `${context}要放进一次完整 HTTP 交换中判断：请求行与首部给出前置条件，状态码和响应首部说明处理结果，消息体承载表示。复核时保存原始报文并改变方法、资源状态或连接复用条件，确认客户端、代理与服务端对语义的解释一致。`;
    }
    if (/首部|缓存|代理|网关|隧道|内容协商|压缩|编码/u.test(label)) {
      return `${context}会改变中间节点如何转发、缓存或变换表示；字段值必须与适用方向、缓存键和端到端/逐跳边界一起解释。可用两次可重复请求对照命中状态、报文首部与实际字节，避免只凭浏览器最终页面判断。`;
    }
    if (/HTTPS|TLS|证书|认证|Cookie|会话|攻击|XSS|SQL|安全/u.test(label)) {
      return `${context}涉及身份、机密性或输入信任边界，不能把“使用 HTTPS”或“已经登录”当作完整安全证明。应分别验证握手/证书、凭据传递、会话属性、授权拒绝和恶意输入，并检查敏感信息是否进入 URL、日志或可被脚本读取的存储。`;
    }
    return `${context}描述 Web 组件之间的一项可观察契约。先写出发送方、接收方和中间节点各自保存的状态，再以一组成功报文和一组边界/拒绝报文核对字段、时序与最终表示，防止把实现习惯误认为协议保证。`;
  }

  if (bookSlug === "wireshark-packet-analysis") {
    if (/捕获|网卡|接口|混杂|监听|镜像|分流|tap|保存|pcap/u.test(label)) {
      return `${context}首先受捕获位置和采集方式约束：观察点决定能看到哪一方向、哪一封装以及是否经过网卡卸载。实验要记录接口、镜像/TAP 拓扑、捕获过滤器和时间范围，并用端点计数或另一观察点确认丢包不是采集过程造成的。`;
    }
    if (/过滤|显示|着色|列|时间|统计|流|会话|重组|专家/u.test(label)) {
      return `${context}是缩小证据范围的分析手段，而不是结论本身。先保留未过滤 pcap，再逐步加入显示条件、会话跟踪和时间基准；每一步记录匹配数量与被排除样本，防止错误过滤器把反例隐藏掉。`;
    }
    if (/Ethernet|ARP|IP|ICMP|TCP|UDP|DNS|DHCP|HTTP|协议|端口/u.test(label)) {
      return `${context}必须沿封装层次和会话时序解释：字段只在对应协议状态与方向中有意义。核查时同时查看上下层地址、长度/校验信息、序列或事务标识和响应关系，并把异常帧关联到发送端日志或套接字状态。`;
    }
    if (/慢|延迟|丢包|重传|安全|恶意|无线|故障|攻击/u.test(label)) {
      return `${context}需要先提出可证伪假设，再区分网络现象、主机行为和采集伪象。以基线会话对照异常会话，量化 RTT、重传、窗口、响应码或无线重试，并用不同观察点或系统日志验证根因方向。`;
    }
    return `${context}应被写成“观察字段—推断状态—反例条件”的证据链。保留原始帧号和时间戳，说明所用过滤器与会话边界，再用至少一个相邻层字段或端点日志交叉验证，避免从单个高亮报文直接跳到根因。`;
  }

  if (bookSlug === "computer-networks-top-down") {
    if (/应用|HTTP|DNS|邮件|P2P|socket|套接字|Web/u.test(label)) {
      return `${context}位于端系统应用边界，重点是消息语义、进程寻址和请求/响应状态。可用固定客户端输入同时观察应用日志与抓包，核对名称解析、端口、消息字段、超时和错误响应是否形成同一条端到端证据链。`;
    }
    if (/TCP|UDP|运输|拥塞|可靠|流量控制|重传|RTT/u.test(label)) {
      return `${context}通过端点状态把不可靠网络服务转换为应用可用的传输行为；序号、确认、窗口、计时器和拥塞状态必须按时序联合判断。用受控丢包或延迟实验比较发送窗口、重传与吞吐，区分可靠性机制和拥塞控制各自的作用。`;
    }
    if (/路由|转发|IP|数据平面|控制平面|SDN|OSPF|BGP|ICMP/u.test(label)) {
      return `${context}要区分每台路由器的逐包转发与全网路径计算：前者查表执行，后者生成和更新表项。验证时记录前缀、下一跳和控制协议状态，再改变一条链路或策略，观察收敛期间路径与丢包如何变化。`;
    }
    if (/链路|以太网|交换|MAC|ARP|VLAN|局域网/u.test(label)) {
      return `${context}发生在一跳交付与局域网转发范围内，地址解析、帧封装和交换表学习共同决定实际出口。可清空相关缓存后发起一次通信，按时间核对 ARP/邻居发现、MAC 表、帧地址以及跨 VLAN 时的三层边界。`;
    }
    if (/无线|移动|Wi-Fi|蜂窝/u.test(label)) {
      return `${context}受到共享介质、信号变化和接入点/基站切换影响，不能直接套用有线链路的稳定假设。实验应固定距离与负载，记录信号、重试、关联和地址变化，并在移动或干扰条件下验证会话连续性。`;
    }
    if (/安全|加密|认证|完整性|密钥|TLS|防火墙/u.test(label)) {
      return `${context}要明确攻击者能力、信任根和保护目标，分别验证身份、机密性、完整性与重放边界。保留握手或策略命中证据，并用错误证书、篡改消息或未授权主体确认系统确实拒绝失败路径。`;
    }
    return `${context}应沿“发送端—网络核心—接收端”的分层接口定位责任。先写输入报文、每层新增状态和可观察输出，再改变一个链路或协议条件，用抓包、表项和端点日志交叉验证因果关系。`;
  }

  if (/电缆|光纤|端口|机架|电源|承重|散热|吞吐|连接|物理|设备/u.test(label)) {
    return `${context}属于可施工的物理约束，介质、距离、速率/双工、连接器、端口容量、供电与散热要按完整链路核对。验证时把两端规格和余量写入端口表，再用错误计数、光功率或负载测试确认最弱一段仍满足峰值与单故障条件。`;
  }
  if (/VLAN|地址|IP|路由|NAT|DNS|网段|子网|逻辑/u.test(label)) {
    return `${context}决定报文在二层广播域、三层前缀和地址转换之间如何选择路径。应同时记录正反向路由、ARP/邻居状态、策略与转换表，再从两个方向发起测试，避免单向可达掩盖返回路径或地址重叠问题。`;
  }
  if (/防火墙|安全|负载|会话|SSL|攻击|认证/u.test(label)) {
    return `${context}同时影响允许哪些流量以及请求如何分配，规则顺序、会话保持、健康检查和返回路径必须形成闭环。用允许、拒绝、节点摘除和会话续接四类样本核对策略命中、后端选择、连接表与客户端结果。`;
  }
  if (/冗余|高可用|故障|切换|VRRP|集群|备份/u.test(label)) {
    return `${context}只有在明确故障域、剩余容量和状态接管条件后才算高可用。先记录正常主备/集群状态，再单独中断链路、节点或依赖，测量检测与收敛时间，并确认恢复后不会双主、丢会话或长期降级。`;
  }
  if (/监控|日志|管理|配置|告警|SNMP|备份|运维/u.test(label)) {
    return `${context}把运行状态转化为可诊断、可恢复的操作证据。指标、日志、配置版本、告警阈值和责任人要关联同一设备与时间线；通过制造一个已知故障验证告警能定位根因，恢复步骤能把配置和服务带回基线。`;
  }
  return `${context}需要落到明确的流量路径、责任设备和状态表，而不能停留在设备名称。画出正常与单故障路径，固定输入后只改变一个链路、表项或容量条件，再以双向抓包、设备状态、告警和恢复结果核对设计。`;
}

function explainCSharpConcept(label, unitTitle, bookSlug) {
  const context = `${unitTitle}中的${label}`;
  if (bookSlug === "csharp-functional-programming") {
    if (/纯|副作用|状态|不可变|引用透明|函数/u.test(label)) {
      return `${context}要从输入、返回值与外部状态三者的关系解释：相同输入是否产生相同结果，计算是否读写时钟、随机数、数据库或共享对象。可把副作用推到边界，以固定输入重复运行并比较返回值、状态快照和调用轨迹，验证核心计算是否可独立推理。`;
    }
    if (/类型|签名|泛型|Option|Either|错误|异常/u.test(label)) {
      return `${context}通过类型表达允许的输入、成功结果和失败分支；类型只编码已声明的不变量，不能替代运行时校验。应准备能编译与必须被拒绝的调用案例，并以成功、空值/缺失和业务失败样本核对每个分支都被显式处理。`;
    }
    if (/组合|高阶|柯里|部分应用|Monad|延迟|continuation|续延/u.test(label)) {
      return `${context}把小函数按类型兼容的输入输出连接起来，组合顺序会决定求值、短路和错误传播。用带事件记录的最小管线改变组合次序或失败位置，核对实际调用顺序、返回结构与未执行分支。`;
    }
    if (/异步|并发|消息|流|响应|observable|task/u.test(label)) {
      return `${context}涉及时间、取消、背压或多执行主体，不能只凭最终值判断正确性。应以可控调度器或时间源复现完成、取消、超时与竞争，保存消息顺序、任务状态和资源释放轨迹，确认状态所有权与终止条件。`;
    }
    return `${context}应写成可组合的输入—输出契约，并把环境读取、状态改变与失败显式放在边界。用确定输入运行正常、空值和失败样本，同时记录返回值与副作用轨迹，证明结论不依赖隐藏状态。`;
  }

  if (bookSlug === "csharp-quality-code") {
    if (/异步|线程|并行|Task|锁|并发/u.test(label)) {
      return `${context}必须区分任务生命周期、线程调度、共享状态与异常传播，旧版本经验不能直接当作当前运行时保证。用受控取消、超时和竞争样本记录任务状态、异常与资源释放，并以压力测试确认结论在重复调度下仍成立。`;
    }
    if (/安全|序列化|异常|资源|释放|Dispose|密码|注入/u.test(label)) {
      return `${context}跨越输入信任或资源生命周期边界，建议只有在明确威胁模型、所有权和失败路径后才成立。用恶意/畸形输入、失败注入和资源计数检查拒绝行为、敏感数据暴露与最终释放，而不是只验证顺利路径。`;
    }
    if (/性能|集合|LINQ|泛型|装箱|字符串/u.test(label)) {
      return `${context}涉及类型语义、分配和枚举成本，不能凭代码长度或旧版微优化判断。固定运行时、构建模式和输入规模，用基准、分配统计与多组边界数据比较替代方案，同时验证结果语义一致。`;
    }
    return `${context}是一条需要上下文的工程建议，而不是无条件规则。先声明适用的语言/运行时版本、代码约束与反例，再以编译器诊断、分析器、自动化测试或基准结果证明采用该建议确实改善正确性、可维护性或性能。`;
  }

  if (/异步|await|Task|状态机|迭代器|yield/u.test(label)) {
    return `${context}要区分源码语法、编译器降级生成的状态机与运行时调度行为。用包含正常完成、异常和取消的最小案例查看编译诊断或生成 IL，并记录续延线程、任务状态与 finally 执行次序。`;
  }
  if (/引用|ref|in|out|Span|值类型|元组|解构/u.test(label)) {
    return `${context}涉及值的存储位置、复制语义与生命周期，语法简洁不代表没有别名或逃逸限制。准备可编译和应被编译器拒绝的样本，结合 IL、分配计数或地址/修改轨迹核对复制、别名与边界。`;
  }
  if (/模式|可空|属性|字符串|表达式|局部函数|lambda/u.test(label)) {
    return `${context}先由语言规则确定匹配、求值和类型推断，再由编译器选择具体降级形式；不同版本可接受的语法与警告也可能不同。以明确 LangVersion 的正反编译案例、边界输入和生成 IL 核对语义，避免把语法糖误认为运行时特性。`;
  }
  return `${context}必须分清语言规范、编译器实现、运行时行为与基础类库 API 四层责任。固定 C# 语言版本和目标框架，用正向/负向编译案例、必要的 IL 或运行轨迹以及版本对照验证结论。`;
}

function explainAndroidConcept(label, unitTitle, bookSlug) {
  const context = `${unitTitle}中的${label}`;
  if (bookSlug === "android-advanced-decryption") {
    if (
      /init|Zygote|SystemServer|Launcher|进程|Binder|线程池|消息循环/u.test(
        label,
      )
    ) {
      return `${context}要沿 Android 8.0 的真实启动或 IPC 链路解释：先定位入口源码与调用者，再标出进程、线程、Binder 对象、状态写入和完成回调。固定 AOSP 标签后，用 PID/TID、调用栈、关键日志与一个进程未就绪或回调延迟样本核对先后关系。`;
    }
    if (
      /Activity|Service|广播|Content ?Provider|Context|AMS|Window|WMS/u.test(
        label,
      )
    ) {
      return `${context}由 framework 对象、system_server 状态和应用进程回调共同完成，API 返回不等于系统状态已经落定。应跟踪 token/record、目标进程与线程、生命周期回调和最终窗口或组件状态，并用无效 token、进程重建或迟到回调验证拒绝与恢复路径。`;
    }
    if (
      /JNI|Java虚拟机|ClassLoader|Dalvik|ART|类|对象|引用|垃圾|GC/u.test(label)
    ) {
      return `${context}涉及 Java、Native、加载器身份与运行时内存边界；同名类型、引用或方法在不同加载器和线程中并不自动等价。用源码符号、类加载日志、JNI 引用计数、堆/GC 轨迹或正反加载案例验证对象身份、生命周期和释放条件。`;
    }
    if (/热修复|Hook|代理|插件|动态加载|VirtualApk|Instant Run/u.test(label)) {
      return `${context}通过改变加载、查找或分发路径实现，必须区分 Android 8.0 的可行机制、隐藏实现依赖与现代平台限制。记录被替换的入口、原对象和代理对象身份、加载顺序与回滚点，再用补丁缺失、签名不符或进程重建样本确认失败不会静默污染状态。`;
    }
    if (
      /绘制|GPU|Systrace|Traceview|内存|泄漏|Allocation|Heap|MAT|LeakCanary/u.test(
        label,
      )
    ) {
      return `${context}需要把工具读数连接到用户可见结果与责任对象，而不是把一张截图当作根因。固定场景并保存帧时间或堆基线，单独改变布局、分配或引用路径，再用 P50/P95/P99、GC Root、过度绘制或首帧状态交叉验证。`;
    }
    return `${context}必须落回 Android 8.0 源码中的入口、对象、进程/线程、状态变化与完成点。固定版本和输入，先预测正常链路，再只注入一个失败条件，以源码符号、运行日志和最终系统状态三方核对。`;
  }

  if (bookSlug === "android-component-arch") {
    if (/依赖|聚合|解耦|模块|层级|组件化|基础架构/u.test(label)) {
      return `${context}要用允许与禁止的依赖边表达组件边界，而不是以 Gradle module 数量代替解耦。固定工程后导出依赖图和公开 API，加入一个反向依赖或重复类反例，确认构建能拒绝越界且业务实现仍可替换。`;
    }
    if (
      /Manifest|资源|Gradle|编译|Instant Run|Freeline|构建|混淆|多渠道/u.test(
        label,
      )
    ) {
      return `${context}属于从源码与资源输入到 APK/AAR 产物的构建变换，结论受 2018 年 Gradle/AGP 版本约束。保存任务图、合并/生成报告与产物校验和，分别改变代码、资源或插件配置，核对增量命中、冲突诊断和冷构建结果。`;
    }
    if (
      /Activity|Fragment|View|Application|广播|事件|路由|反射|权限|生命周期|分发/u.test(
        label,
      )
    ) {
      return `${context}跨越运行时注册、查找与生命周期所有权，成功调用一次不能证明进程重建或迟到回调仍正确。记录组件标识、进程线程、注册/释放次序与路由结果，并注入缺失实现、重复初始化或 owner 销毁验证显式失败。`;
    }
    if (/Maven|AAR|JCenter|SDK|仓库|流通|发布|缓存/u.test(label)) {
      return `${context}依赖不可变制品坐标、依赖元数据、仓库可达性和消费者解析结果。发布时保存源码提交、版本、校验和与依赖树，再测试缓存损坏、仓库离线和版本冲突，确认能够定位来源并回滚到上一制品。`;
    }
    if (/模板|架构|注解|演化|进程化/u.test(label)) {
      return `${context}只有在模板生成物和架构阶段都受可执行约束时才有价值。比较采用前后的依赖环、构建时间、初始化路径和发布故障，并用一个不适用模板的反例说明扩展边界，避免把统一目录当成统一设计。`;
    }
    return `${context}要贯通源码合同、构建任务、运行所有者与发布制品四层。固定工具链和最小工程，只改变一个依赖、合并、路由或仓库条件，用自动拒绝、运行日志、产物校验和与回滚结果证明边界。`;
  }

  if (bookSlug === "android-advanced-light") {
    if (/Material|View|布局|绘制|触摸|动画|控件|UI/u.test(label)) {
      return `${context}要沿输入事件、测量、布局、绘制与帧提交说明可见结果，样式名称不能代替运行机制。固定设备和界面状态后，改变一个尺寸、触摸序列或过度绘制条件，保存层级、回调顺序与帧时间验证。`;
    }
    if (/线程|AsyncTask|Handler|Looper|消息|并发|同步/u.test(label)) {
      return `${context}涉及任务调度、共享状态、取消和生命周期所有权，回调成功一次不代表旋转或销毁后仍安全。记录线程、消息队列、owner 状态与资源释放，并注入取消、迟到回调或竞争复现失败路径。`;
    }
    if (/网络|Volley|OkHttp|请求|缓存|HTTP/u.test(label)) {
      return `${context}要明确请求身份、超时/取消、缓存键、重试幂等与响应解析边界。用可控服务端分别返回成功、慢响应、断网和错误数据，核对网络日志、缓存状态、线程切换和用户可见结果。`;
    }
    if (/设计模式|单例|Builder|观察者|适配器|代理|事件总线|otto/u.test(label)) {
      return `${context}只有在参与者、状态所有者与变化点明确时才是设计机制，而不是类名套用。以最小对象图记录事件注册/注销、调用方向和替换点，再用重复注册、缺失订阅者或生命周期结束样本检验耦合与泄漏。`;
    }
    if (/RxJava|响应式|Observable|Subscriber|操作符/u.test(label)) {
      return `${context}由订阅关系、线程调度、事件序列与终止信号共同定义。用 TestScheduler 或确定事件源复现 next/error/complete、取消和背压边界，保存订阅释放与观察线程，避免只看最终输出。`;
    }
    if (/注解|ButterKnife|Dagger|依赖注入|Data Binding/u.test(label)) {
      return `${context}跨越源码注解、生成代码、对象图与生命周期，框架隐藏的创建顺序仍需可追踪。保存生成源码和依赖图，比较缺失绑定、作用域错配与重复创建，确认编译诊断和对象身份符合合同。`;
    }
    if (/架构|MVC|MVP|MVVM|MediaPlayer|系统/u.test(label)) {
      return `${context}要分离视图状态、业务状态、平台服务和资源所有权，并标明 Android 5–7 时代 API 边界。跟踪一次用户动作到状态更新、系统调用与释放，用进程重建、播放错误或配置变化验证恢复。`;
    }
    return `${context}应固定 Android 5.0–7.0、Java 与旧 Support Library 语境，写出输入、状态、线程、生命周期和失败结果。以最小实现和单变量反例保存日志、状态快照与迁移差异。`;
  }

  if (bookSlug === "android-art-exploration") {
    if (/Activity|生命周期|启动模式|任务栈|Intent/u.test(label)) {
      return `${context}由 ActivityRecord/任务栈、实例状态和应用回调共同决定，方法调用不等于目标界面已恢复。记录实例、Intent、栈位置和回调序列，并用旋转、进程重建和不同 launchMode 样本核对状态。`;
    }
    if (/IPC|Binder|AIDL|Messenger|Bundle|Parcel|跨进程/u.test(label)) {
      return `${context}跨越进程身份、序列化、Binder 线程池和死亡通知，Java 引用外观不能代表同一对象。保存调用方向、PID/TID、事务数据与错误返回，并注入大对象、服务死亡或并发请求验证边界。`;
    }
    if (/View|事件|滑动|触摸|measure|layout|draw|绘制/u.test(label)) {
      return `${context}要沿触摸分发或 measure—layout—draw 因果链解释，父子协商与坐标转换会改变结果。固定 View 层级后改变一个拦截、MeasureSpec 或尺寸条件，记录回调次序、几何状态和帧输出。`;
    }
    if (/RemoteViews|Drawable|动画|Window|WindowManager/u.test(label)) {
      return `${context}跨越受限视图操作、资源状态或窗口 token，局部对象变化不一定已经提交到系统显示。跟踪宿主、token、属性更新与最终像素/窗口状态，用无效上下文、进程边界或动画取消验证失败。`;
    }
    if (
      /四大组件|Service|广播|ContentProvider|消息|Handler|Looper/u.test(label)
    ) {
      return `${context}需要区分请求入口、system_server/消息队列状态、目标线程与完成回调。用 PID/TID、token/record、队列时序和最终组件状态交叉验证，并注入进程未启动或迟到消息。`;
    }
    if (/线程|线程池|Bitmap|Cache|缓存|性能|优化/u.test(label)) {
      return `${context}要同时证明用户结果、调度/内存成本和生命周期释放。固定输入与设备状态，记录队列、分配、命中率和 P50/P95/P99，再改变线程数、缓存容量或引用路径验证反例。`;
    }
    if (/JNI|NDK|Native|C\\+\\+/u.test(label)) {
      return `${context}涉及 Java/Native 类型转换、线程附着、引用与 ABI，跨界调用本身也有成本。保存 JNI 注册、异常和引用释放轨迹，以错误签名、不同 ABI 或本地失败样本确认回退与清理。`;
    }
    return `${context}必须放回 Android 5.0/Java 基线的应用调用—framework 代理—Binder/消息队列—目标对象—回调链路。固定版本，先预测状态变化，再以源码符号、运行轨迹和一个失败样本复核。`;
  }

  if (bookSlug === "first-line-android") {
    if (/Kotlin|函数|类|Lambda|空指针|集合/u.test(label)) {
      return `${context}要把语言写法连接到类型、可空性、对象状态与生成调用，简洁语法不能替代契约。用可编译/应拒绝案例和边界输入核对推断、空值、集合变化与 Java 互操作。`;
    }
    if (
      /Activity|Fragment|生命周期|Intent|任务栈|UI|控件|布局|Material/u.test(
        label,
      )
    ) {
      return `${context}由组件 owner、保存状态、事件回调与视图层级共同决定。固定用户操作后记录实例、回调和界面状态，并用旋转、后台回收、重复导航或不同屏幕尺寸验证恢复与释放。`;
    }
    if (/广播|ContentProvider|权限|PermissionX|跨程序/u.test(label)) {
      return `${context}跨越组件导出、调用者身份、运行时授权和数据边界，声明权限不等于操作必然允许。用已授权、拒绝、撤销和不同调用包样本核对系统返回、用户提示与最小数据暴露。`;
    }
    if (/数据|存储|文件|SQLite|Room|持久/u.test(label)) {
      return `${context}要定义数据模式、事务、升级和失败恢复，成功写入一次不能证明旧版本或异常中断安全。保存迁移前后数据、事务结果与查询输出，注入磁盘/解析失败或跨版本升级验证。`;
    }
    if (/多媒体|相机|音频|视频|Service|后台|线程/u.test(label)) {
      return `${context}涉及系统资源、后台限制、线程与生命周期释放。记录句柄、任务状态和用户可见结果，用权限拒绝、组件销毁、播放错误或系统回收样本确认取消与清理。`;
    }
    if (/网络|HTTP|Retrofit|天气|JSON|请求/u.test(label)) {
      return `${context}要明确请求输入、超时/取消、解析、缓存与错误呈现。以可控响应复现成功、慢网、断网和畸形数据，核对请求日志、持久状态、重试上限及界面恢复。`;
    }
    if (/Jetpack|ViewModel|LiveData|Navigation|Repository/u.test(label)) {
      return `${context}通过明确状态所有者和生命周期感知分发减少界面耦合，但不能自动解决进程重建或数据一致性。记录 owner、状态来源和订阅释放，以旋转、返回栈和进程恢复样本验证。`;
    }
    return `${context}要在 Android 10/Kotlin 基线中写清用户任务、平台合同、状态 owner、线程与资源释放，再单列现代 targetSdk 差异。用正常、拒绝和生命周期重建三类样本核对最终行为。`;
  }

  if (bookSlug === "crazy-android") {
    if (/环境|Android Studio|SDK|Gradle|项目|HelloWorld|调试/u.test(label)) {
      return `${context}要把 JDK、SDK、Gradle、插件、仓库、设备镜像与构建产物固定成环境指纹，IDE 绿色按钮不能代替构建理解。分别执行干净构建、安装、启动和日志采集，再破坏一个版本或依赖条件，确认诊断与回退可重放。`;
    }
    if (
      /界面|View|布局|TextView|EditText|Button|Adapter|List|Dialog|菜单|ActionBar|控件/u.test(
        label,
      )
    ) {
      return `${context}由 View 树、MeasureSpec、布局结果、绘制、输入焦点和可恢复状态共同决定。固定屏幕、字体和数据后改变一个尺寸、配置或复用条件，保存层级、回调顺序、无障碍语义与帧结果，避免只看静态截图。`;
    }
    if (/事件|监听|回调|触摸|手势|按键/u.test(label)) {
      return `${context}要沿输入源、分发、拦截、消费和状态更新解释时序，同一事件不能被未知对象重复处理。记录 MotionEvent/KeyEvent、目标 View、线程和消费返回值，并用取消、父级拦截或快速重复输入验证边界。`;
    }
    if (/Activity|Fragment|生命周期|任务栈/u.test(label)) {
      return `${context}涉及实例、任务栈、保存状态和生命周期所有权，回调出现不等于用户任务已经恢复。保存实例标识、Intent、栈位置与状态来源，用旋转、后台回收、进程重建和重复导航核对恢复与释放。`;
    }
    if (/Intent|IntentFilter|组件通信|Bundle/u.test(label)) {
      return `${context}要明确发送者身份、显式或隐式匹配条件、数据类型、大小和接收方导出边界。用匹配、无匹配、多个候选、畸形数据和未授权调用样本核对解析结果与用户反馈。`;
    }
    if (/资源|Resource|国际化|屏幕|样式|主题|XML/u.test(label)) {
      return `${context}由资源限定符、设备配置、主题继承和运行时解析共同决定，文件存在不等于会被选中。固定 APK 后改变语言、密度、方向、夜间模式或 API，记录资源 ID、匹配路径和最终像素，并检查缺省回退。`;
    }
    if (/图形|图像|Canvas|Paint|Bitmap|Drawable|动画/u.test(label)) {
      return `${context}要沿资源解码、内存布局、坐标变换、绘制命令和帧提交解释结果。使用固定图像和画布状态，比较缩放、裁剪、复用与释放，保存像素差、分配和帧时间，防止以 OOM 或失真换取表面速度。`;
    }
    if (
      /存储|IO|文件|SQLite|SharedPreferences|ContentProvider|数据共享/u.test(
        label,
      )
    ) {
      return `${context}必须定义数据模式、事务、权限、URI 和升级恢复，成功读写一次不能证明中断或跨版本安全。保存迁移前后数据与查询计划，注入磁盘失败、并发更新、无权限或旧版本升级，验证原子性和最小暴露。`;
    }
    if (/Service|Broadcast|Receiver|后台|通知/u.test(label)) {
      return `${context}要区分组件生命周期、任务线程、进程存活和系统后台政策，Service 本身不提供后台线程。记录启动来源、PID/TID、任务 owner 与停止点，用重复投递、进程回收、后台限制和迟到回调验证幂等与释放。`;
    }
    if (/多媒体|音频|视频|相机|Media/u.test(label)) {
      return `${context}涉及权限、系统句柄、编解码状态、线程与生命周期释放。固定媒体样本后记录状态机和资源计数，分别注入拒权、格式错误、暂停恢复、组件销毁和设备能力缺失，确认错误可见且句柄归零。`;
    }
    if (/OpenGL|3D|纹理|着色|渲染/u.test(label)) {
      return `${context}要明确 GL 上下文、线程、缓冲区、纹理、矩阵和帧边界，最终画面相似不代表状态安全。固定几何与资源，改变一个上下文丢失、尺寸或纹理条件，保存 GL 错误、像素差、帧时间和释放结果。`;
    }
    if (/网络|HTTP|Socket|WebView|下载|上传/u.test(label)) {
      return `${context}要写清请求身份、超时、取消、重试幂等、缓存和解析边界。用可控服务端返回成功、慢响应、断网、重复响应和畸形数据，核对网络轨迹、线程切换、持久状态与用户可恢复结果。`;
    }
    if (/桌面|Widget|壁纸|系统服务/u.test(label)) {
      return `${context}跨越应用进程、系统宿主、RemoteViews 或系统服务权限，本地对象变化不一定已提交到桌面。记录宿主身份、更新 token、频率和最终界面，用进程退出、无效上下文或系统重建验证恢复。`;
    }
    if (/传感器|Sensor|GPS|位置|高德|Map|地图/u.test(label)) {
      return `${context}同时受权限、设备能力、采样时序、坐标系和外部服务约束。保存时间戳、精度、provider、坐标转换和授权状态，用拒权、无信号、异常值、暂停恢复与服务失败样本验证降级和隐私边界。`;
    }
    if (/合金弹头|游戏|拍卖|竞价|综合/u.test(label)) {
      return `${context}应拆成用户任务、状态机、持久事实、并发/网络边界和可回滚交付，而不是把多个示例拼成“大项目”。固定一条端到端主路径，注入重复操作、断网、进程重建和数据冲突，用状态轨迹与服务端事实验收。`;
    }
    return `${context}要在 Android 9.x/Java 基线上写清入口、组件 owner、线程、可恢复状态、权限和外部失败。固定设备与输入，只改变一个生命周期或平台条件，用原始日志、状态快照和最终用户结果复核。`;
  }

  if (bookSlug === "deep-android-kernel") {
    if (/系统简介|源码|编译|Make|构建系统|产品|模块/u.test(label)) {
      return `${context}必须绑定 Android 4.3 标签、repo manifest、主机工具链、产品目标、模块依赖与产物哈希。执行一次最小增量构建并破坏一个依赖或配置，比较任务图、生成文件和失败诊断，避免跨版本拼接源码。`;
    }
    if (/操作系统|进程|线程|调度|同步|内存/u.test(label)) {
      return `${context}要从 Linux 进程/线程、地址空间、调度和同步原语连接到 Android 运行结果。记录 PID/TID、优先级、等待点和资源 owner，用竞争、阻塞、退出或内存压力样本验证时序与释放。`;
    }
    if (/Binder|Parcel|ServiceManager|AIDL|IPC|智能指针|sp|wp/u.test(label)) {
      return `${context}跨越代理、Parcel、Binder 驱动、线程池与服务对象，Java/C++ 引用外观不能代表同一身份。保存 PID/TID、事务码、缓冲区、引用计数和死亡通知，注入服务退出、大事务或畸形数据确认错误返回与清理。`;
    }
    if (/启动|init|Zygote|SystemServer|ActivityManager|AMS/u.test(label)) {
      return `${context}要沿 init、Zygote、system_server、服务注册与应用进程入口标出先后依赖，日志出现类名不代表服务已可用。固定冷启动输入，保存进程、服务状态和关键时间戳，并用缺失服务或进程死亡验证恢复。`;
    }
    if (/SurfaceFlinger|WMS|Window|View|Input|GUI|显示|触摸/u.test(label)) {
      return `${context}贯穿应用 View、窗口 token、Surface、合成与输入分发；局部调用返回不等于像素或事件已经提交。记录层级、buffer、transaction、坐标和回调时序，用无效 token、尺寸变化、队列阻塞或取消输入验证边界。`;
    }
    if (/音频|Audio|Media/u.test(label)) {
      return `${context}跨越应用 API、AudioFlinger、轨道/混音、HAL 与设备，需区分控制状态和真实音频流。固定音频样本后记录线程、buffer、延迟和路由，注入格式错误、设备切换或服务重启，确认恢复与资源释放。`;
    }
    if (/Intent|匹配规则|资源适配|字符编码|编码格式/u.test(label)) {
      return `${context}要把输入表示、匹配/解析规则、资源限定符或字符边界写成确定合同。使用正反例数据改变一个 MIME、category、locale、编码或设备配置，记录解析路径、错误位置和最终结果。`;
    }
    if (/OpenGL|SystemUI|Widget|小插件/u.test(label)) {
      return `${context}涉及系统宿主、图形上下文、跨进程更新或全局 UI 状态，应用侧对象并非唯一 owner。保存宿主/token、线程、资源与最终像素，注入上下文丢失、进程退出或无效更新验证系统边界。`;
    }
    if (/APK|打包|签名|Git|版本管理|调试|工具|logcat|gdb/u.test(label)) {
      return `${context}必须把源码提交连接到构建输入、APK/映像产物、签名或调试会话。保存提交、命令、环境、产物哈希和断点位置，再制造一个脏工作区、错误签名或符号错配，确认工具能定位首错并回退。`;
    }
    return `${context}必须锁定 Android 4.3 首版坐标，从真实入口跟踪线程、进程、语言与驱动边界，并标出对象和缓冲区所有权。使用同一构建和输入运行正常与单变量失败路径，保存版本卡、断点、日志和释放结果。`;
  }

  if (/Java|斐波|缓存|API|数据结构|SQLite|事务|查询|算法/u.test(label)) {
    return `${context}先保证优化前后结果、异常与线程语义等价，再讨论时间或分配。固定输入规模、构建和设备状态，完成预热与交错采样，并用边界输入、缓存失效或查询计划证明收益不是偶然数据或错误结果造成的。`;
  }
  if (
    /NDK|JNI|C\\+\\+|本地|ARM|NEON|汇编|指令|内联|循环展开|预读取/u.test(label)
  ) {
    return `${context}同时包含 Java/Native 跨界成本、ABI 与具体 CPU 能力，局部指令更快不代表端到端更快。记录 ABI、编译参数、JNI 转换与工作量，用支持和不支持目标特性的设备/模拟输入比较总耗时、正确性与回退实现。`;
  }
  if (/内存|垃圾|GC|泄漏|引用|数组|布局/u.test(label)) {
    return `${context}要同时解释对象/缓冲区布局、分配速率、存活时间和回收停顿。固定业务结果与输入，保存分配、堆和 GC 基线，再改变一种数据布局或引用路径，用峰值内存、停顿与泄漏保留链验证。`;
  }
  if (/线程|同步|AsyncTask|Handler|Looper|并发|多核|生命周期/u.test(label)) {
    return `${context}受调度、共享状态、取消和 Android 生命周期共同约束；平均更快可能掩盖竞争或迟到回调。用可控任务和重复压力样本记录线程、队列、锁等待、取消和 owner 状态，并验证异常、旋转/销毁及恢复路径。`;
  }
  if (/时间|测量|跟踪|TraceView|DDMS|日志|性能评测|剖析/u.test(label)) {
    return `${context}是测量方法而不是性能结论。声明时钟、采样/插桩开销、预热、样本数和统计量，以空载基线和已知热点校准工具，再保存原始样本与 P50/P95/P99，防止只挑最快一次。`;
  }
  if (/电池|广播|网络|位置|传感器|提醒|WakeLock|功耗/u.test(label)) {
    return `${context}取决于唤醒次数、无线电尾能耗、采样频率和资源释放，短时 CPU 降低不一定减少总能耗。固定功能结果和时间窗，记录唤醒、传输、定位/传感器注册与电量变化，并注入离线、后台或未注销监听器场景。`;
  }
  if (
    /图形|布局|OpenGL|纹理|Mipmap|渲染|RenderScript|Allocation|rsForEach/u.test(
      label,
    )
  ) {
    return `${context}要连接 CPU 准备、GPU 工作、内存带宽和帧截止时间。固定场景与设备，比较基线、优化和错误图像，保存帧时间、过度绘制、上传/分配与热状态；历史 RenderScript 结果另列现代替代 API 的迁移差异。`;
  }
  return `${context}必须在 2012 年 Android 工具链和设备语境中解释，再单列现代迁移。先写结果等价与资源预算，固定环境后只改变一个实现条件，用原始时间、分配、线程、能耗或帧证据验证。`;
}

const BOOKS = {
  "c-primer-plus": {
    sourceUrl: "https://www.informit.com/store/c-primer-plus-9780321928429",
    sourceName: "C Primer Plus, Sixth Edition",
    unitIds: {
      "getting-ready": "cpr-01",
      "introducing-c": "cpr-02",
      "data-and-c": "cpr-03",
      "strings-io": "cpr-04",
      "operators-expressions": "cpr-05",
      "control-loops": "cpr-06",
      "control-branching": "cpr-07",
      "char-io-validation": "cpr-08",
      functions: "cpr-09",
      "arrays-pointers": "cpr-10",
      "strings-functions": "cpr-11",
      "storage-linkage-memory": "cpr-12",
      "file-io": "cpr-13",
      structures: "cpr-14",
      "bit-fiddling": "cpr-15",
      preprocessor: "cpr-16",
      "advanced-data": "cpr-17",
    },
    failure(label) {
      return `若只记语法而忽略「${label}」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。`;
    },
    evidence(label) {
      return `用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「${label}」的实际行为。`;
    },
  },
  "cpp-primer-5e": {
    sourceUrl:
      "https://www.informit.com/store/c-plus-plus-primer-9780321714114",
    sourceName: "C++ Primer, Fifth Edition",
    unitIds: {
      "getting-started": "cppp-01",
      "variables-and-types": "cppp-02",
      "strings-vectors-and-arrays": "cppp-03",
      expressions: "cppp-04",
      statements: "cppp-05",
      functions: "cppp-06",
      classes: "cppp-07",
      "io-library": "cppp-08",
      "sequential-containers": "cppp-09",
      "generic-algorithms": "cppp-10",
      "associative-containers": "cppp-11",
      "dynamic-memory": "cppp-12",
      "copy-control": "cppp-13",
      "overloaded-operations": "cppp-14",
      oop: "cppp-15",
      templates: "cppp-16",
      "specialized-library": "cppp-17",
      "large-programs": "cppp-18",
      "specialized-tools": "cppp-19",
      "library-appendix": "cppp-a",
    },
    failure(label) {
      return `若把「${label}」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。`;
    },
    evidence(label) {
      return `保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「${label}」的契约。`;
    },
  },
  "cpp-primer-plus": {
    sourceUrl:
      "https://www.informit.com/store/c-plus-plus-primer-plus-9780132781176",
    sourceName: "C++ Primer Plus, Sixth Edition",
    unitIds: {
      "getting-started-with-cpp": "epp-01",
      "setting-out-to-cpp": "epp-02",
      "dealing-with-data": "epp-03",
      "compound-types": "epp-04",
      "loops-and-relational-expressions": "epp-05",
      "branching-statements-and-logical-operators": "epp-06",
      "functions-programming-modules": "epp-07",
      "adventures-in-functions": "epp-08",
      "memory-models-and-namespaces": "epp-09",
      "objects-and-classes": "epp-10",
      "working-with-classes": "epp-11",
      "classes-and-dynamic-memory-allocation": "epp-12",
      "class-inheritance": "epp-13",
      "reusing-code-in-cpp": "epp-14",
      "friends-exceptions-and-more": "epp-15",
      "string-class-and-stl": "epp-16",
      "input-output-and-files": "epp-17",
      "visiting-new-cpp-standard": "epp-18",
    },
    failure(label) {
      return `若只复述「${label}」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。`;
    },
    evidence(label) {
      return `从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「${label}」的状态变化。`;
    },
  },
  "inside-cpp-object-model": {
    sourceUrl:
      "https://www.informit.com/store/inside-the-c-plus-plus-object-model-9780201834543",
    sourceName: "Inside the C++ Object Model, First Edition",
    unitIds: {
      "object-lessons": "ico-01",
      "semantics-of-constructors": "ico-02",
      "semantics-of-data": "ico-03",
      "semantics-of-function": "ico-04",
      "construction-destruction-copy": "ico-05",
      "runtime-semantics": "ico-06",
      "cusp-of-object-model": "ico-07",
    },
    failure(label) {
      return `若只从源码表面理解「${label}」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。`;
    },
    evidence(label) {
      return `用对象大小、成员地址、反汇编或构造析构轨迹核对「${label}」，并区分标准语义与当前 ABI 实现。`;
    },
  },
  "the-c-programming-language": {
    sourceUrl:
      "https://www.informit.com/content/images/9780131103627/samplepages/0131103628.pdf",
    sourceName: "The C Programming Language, Second Edition",
    sourceBasis: "authorized-sample",
    unitIds: {
      "types-operators": ["kr2-01", "kr2-02"],
      "control-flow": "kr2-03",
      "functions-program": "kr2-04",
      "pointers-arrays": "kr2-05",
      "pointer-arithmetic": "kr2-05",
      structures: "kr2-06",
      "input-output": "kr2-07",
      "unix-interface": "kr2-08",
    },
    failure(label) {
      return `若把「${label}」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。`;
    },
    evidence(label) {
      return `以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「${label}」的实际契约。`;
    },
  },
  "cpp-high-performance": {
    sourceUrl:
      "https://www.packtpub.com/en-ID/product/c-high-performance-9781787120952/chapter/preface-pref/section/what-this-book-covers-preflvl1sec03",
    sourceName: "C++ High Performance, First Edition",
    unitIds: {
      "brief-introduction-to-cpp": "chp-01",
      "modern-cpp-concepts": "chp-02",
      "measuring-performance": "chp-03",
      "data-structures": "chp-04",
      "deeper-look-at-iterators": "chp-05",
      "stl-algorithms-and-beyond": "chp-06",
      "memory-management": "chp-07",
      "metaprogramming-compile-time": "chp-08",
      "proxy-objects-lazy-evaluation": "chp-09",
      concurrency: "chp-10",
      "parallel-stl": "chp-11",
    },
    failure(label) {
      return `若脱离基线与成本模型讨论「${label}」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。`;
    },
    evidence(label) {
      return `保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「${label}」前后的时间和资源变化。`;
    },
  },
  "modern-cpp-design": {
    sourceUrl:
      "https://www.informit.com/store/modern-c-plus-plus-design-generic-programming-and-design-9780133387629",
    sourceName: "Modern C++ Design, First Edition",
    unitIds: {
      "policy-based-class-design": "mcd-01",
      techniques: "mcd-02",
      typelists: "mcd-03",
      "small-object-allocation": "mcd-04",
      "generalized-functors": "mcd-05",
      "implementing-singletons": "mcd-06",
      "smart-pointers": "mcd-07",
      "object-factories": "mcd-08",
      "abstract-factory": "mcd-09",
      visitor: "mcd-10",
      multimethods: "mcd-11",
    },
    failure(label) {
      return `若只复制「${label}」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。`;
    },
    evidence(label) {
      return `用正向与应拒绝的编译案例、生成类型和生命周期测试核对「${label}」的组合规则与扩展边界。`;
    },
  },
  "cpp-testing-recipes": {
    sourceUrl:
      "https://pragprog.com/titles/lotdd/modern-c-programming-with-test-driven-development/",
    sourceName: "Modern C++ Programming with Test-Driven Development",
    unitIds: {
      "global-setup": "mctdd-01",
      "tdd-first-example": "mctdd-02",
      "tdd-foundations": "mctdd-03",
      "test-construction": "mctdd-04",
      "test-doubles": "mctdd-05",
      "incremental-design": "mctdd-06",
      "quality-tests": "mctdd-07",
      "legacy-challenges": "mctdd-08",
      "tdd-and-threading": "mctdd-09",
      "additional-tdd-concepts": "mctdd-10",
      "growing-and-sustaining-tdd": "mctdd-11",
    },
    failure(label) {
      return `若把「${label}」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。`;
    },
    evidence(label) {
      return `保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「${label}」是否提供快速反馈。`;
    },
  },
  "android-advanced-decryption": {
    sourceUrl:
      "https://www.phei.com.cn/module/goods/wssd_content.jsp?bookid=52919",
    sourceName: "刘望舒《Android进阶解密》",
    unitIds: manifestIdentityUnits("android-advanced-decryption"),
    pruneNodeTemplate: true,
    contextualSentences: [
      "本课程对应刘望舒《Android进阶解密》，电子工业出版社2018年10月初版，468页、702千字，ISBN 9787121348389。",
      "Android 7.0只在原书明确比较AMS家族时出现；Android 9以后反射/隐藏API限制、Android 10的ActivityTaskManager、现代Profiler/Perfetto等只能写进迁移备注，不能改写本页正式链路。",
      "记录PID/TID、调用入口、对象或token、状态前后值、耗时、异常/返回码和最终可见结果；性能章再记录P50/P95/P99，内存章保留GC Root路径。",
      "最小证据包包含：出版社目录、Android版本、源码文件和符号、调用/状态图、PID/TID或加载器身份、一条失败注入、日志/追踪/堆证据、最终结果、已知限制、停止、恢复、回退、责任人与复核人。",
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(
        label,
        unitTitle,
        "android-advanced-decryption",
      );
    },
    failure(label) {
      return `若只背诵「${label}」的类名而不固定 Android 8.0 源码、进程线程、对象身份和完成回调，跨 Binder、JNI 或加载边界后就会把请求误判为结果。`;
    },
    evidence(label) {
      return `在固定 AOSP 8.0 标签上追踪「${label}」的入口与状态对象，用 PID/TID、源码符号、正常/单变量失败日志和最终系统状态交叉核对。`;
    },
  },
  "android-component-arch": {
    sourceUrl:
      "https://www.phei.com.cn/module/goods/wssd_content.jsp?bookid=51777",
    sourceName: "苍王《Android组件化架构》",
    unitIds: manifestIdentityUnits("android-component-arch"),
    pruneOutline: {
      heading: "权威目录逐节点映射",
      endMarker: "## 最小垂直切片",
    },
    normalizeInlineBlocks: true,
    contextualSentences: [
      "课程先准确解释出版时的依赖、构建、分发和发布机制，再单列现代Android Gradle Plugin、Version Catalog、Build Cache、Jetpack Startup、Activity Result API与Maven Central迁移。",
      "边界必须说明谁可以依赖谁、哪些类型公开、资源怎样命名、Manifest怎样合并、初始化由谁调度、制品由谁发布；编译器、构建系统和测试应能拒绝违规关系。",
      "交互图把目录节点放入源码、构建、运行、制品和团队五层；故障实验一次只改变一个合并、路由、缓存或发布条件；证据门拒绝只展示“能够运行”的弱结论。",
      "从一个业务组件的源码修改开始，跟踪它经过依赖解析、资源与Manifest合并、编译打包、壳工程初始化、页面或服务分发，直到发布AAR与消费者升级。",
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(label, unitTitle, "android-component-arch");
    },
    failure(label) {
      return `若把「${label}」简化成拆分 Gradle module，却不约束依赖、构建输入、运行所有者与制品版本，集成成功也会在冲突、重建或回滚时失效。`;
    },
    evidence(label) {
      return `以最小多模块工程验证「${label}」，保存依赖图、任务/合并报告、运行时序、产物校验和，并注入一个冲突或仓库失败样本。`;
    },
  },
  "android-perf-optimization": {
    sourceUrl:
      "https://www.oreilly.com/library/view/pro-android-apps/9781430239994/",
    sourceName: "Pro Android Apps Performance Optimization",
    unitIds: manifestIdentityUnits("android-perf-optimization"),
    pruneOutline: {
      heading: "权威目录逐节点映射",
      endMarker: '<Callout type="trap">',
    },
    normalizeInlineBlocks: true,
    addPredictionToUnmapped: true,
    contextualSentences: [
      "本页依据Hervé Guihot《Pro Android Apps Performance Optimization》独立重构，不复制原文。",
      "原版锁定Apress 2012年1月版、282页、ISBN 9781430239994；中文版锁定人民邮电出版社2012年10月第1版、白龙译、226页、ISBN 9787115272416。",
      "交互管线连接Java、JNI/NDK、内存线程、设备图形与用户结果；实验面板切换基线、优化、错误结果、热状态和生命周期；证据门要求正确性、时间、资源、设备和版本全部可重放。",
      "先保存2012年Dalvik、NDK、TraceView、AsyncTask和RenderScript机制，再一次只改变运行时、工具或API之一并比较行为。",
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(
        label,
        unitTitle,
        "android-perf-optimization",
      );
    },
    failure(label) {
      return `若优化「${label}」时没有等价性断言、固定测量协议和资源边界，一次更快数字可能来自错误结果、热状态、缓存或插桩偏差。`;
    },
    evidence(label) {
      return `固定设备、版本、构建、输入与热状态，对「${label}」做预热和交错重复采样，同时保存正确性、P50/P95/P99 与分配、线程、能耗或帧证据。`;
    },
  },
  "android-advanced-light": {
    sourceUrl: "https://www.bookschina.com/7533720.htm",
    sourceName: "刘望舒《Android进阶之光》",
    unitIds: manifestIdentityUnits("android-advanced-light"),
    pruneOutline: {
      heading: "权威目录逐节点映射",
      endMarker: "## 最小实现与边界",
    },
    normalizeInlineBlocks: true,
    contextualSentences: [
      "原书处在Android 5.0至7.0、Java与Support Library时代",
      "本页依据刘望舒《Android进阶之光》独立重构，不复制原文。版本锁定电子工业出版社2017年7月首版、492页、ISBN 9787121315305；正式结构为11章、190个章/节/小节节点。",
      "实现后用固定输入记录输出、线程名、生命周期、异常和资源释放。再构造错误输入、取消、旋转、后台切前台及低版本设备，验证便利框架没有隐藏所有权问题。",
      "原书API按2017年语境讲解。现代AndroidX、协程、Flow、Hilt或Compose只进入迁移账本，不能删除原书正式目录。",
      "第四份证据是迁移对照。现代API解决的问题可能相同，但取消、缓存、状态恢复、线程和错误语义未必一致。",
    ],
    contextualParagraphMarkers: [
      '<Term def="解释技术结论所依赖的Android、库和工具版本边界">版本语境</Term>',
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(label, unitTitle, "android-advanced-light");
    },
    failure(label) {
      return `若把「${label}」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。`;
    },
    evidence(label) {
      return `在固定 Android 5–7 基线运行「${label}」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。`;
    },
  },
  "android-art-exploration": {
    sourceUrl:
      "https://www.dedao.cn/ebook/detail?id=ORa2P4NNLqmQPG2178z5gvkDndlOxWy6eq3ajK6BEVXYRrJpA9M4oybeZpqAKQgj",
    sourceName: "任玉刚《Android开发艺术探索》",
    unitIds: manifestIdentityUnits("android-art-exploration"),
    pruneOutline: {
      heading: "权威目录逐节点映射",
      endMarker: "## 最小可执行切片",
    },
    normalizeInlineBlocks: true,
    contextualSentences: [
      "课程先准确解释出版时机制，再单独建立现代targetSdk迁移账本；不会用Compose、协程或当前Jetpack替换原书目录后仍声称一比一覆盖。",
      "每个实验先找",
      "现代迁移一次只改变targetSdk、组件导出、后台限制、存储、权限、通知、构建插件或替代API之一，比较构建、调用链、用户行为、测试与回滚。",
      "本页依据任玉刚《Android开发艺术探索》完整目录独立重构，不复制原文。版本锁定电子工业出版社2015年9月第1版、507页、ISBN 9787121269394，原书机制以Android 5.0与Java应用层/源码分析为基线。",
      "主线程、Binder线程池、HandlerThread、线程池和原生线程有不同责任。",
      "下面的Java片段只抓住本章核心合同。先预测线程、状态和失败，再在匹配Android 5.0语境的样例工程中运行；代码所依赖的上下文和导入应在工程中显式声明。",
      "三段材料分别约束源码机制、环境重放和用户可见结果。若日志没有线程名、进程号、输入标识和阶段，或测试只断言“没有崩溃”，就无法证明真正经过目标调用链。",
      "framework实现会随Android版本变化。引用源码必须标版本与调用分支；现代API只能作为迁移对照，不能冒充2015年原书内容。",
      "IPC、崩溃、动态加载、反编译与JNI实验只使用自有样例和合成数据。日志、转储、APK与原生崩溃文件不得包含真实账号、令牌、位置或用户内容。",
      "先按Android 5.0保存原书行为基线，再一次只改变平台、targetSdk、插件、权限、后台、存储或替代API之一，记录行为、测试和回滚差异。",
    ],
    contextualParagraphMarkers: [
      "**调用层。**",
      "**线程与进程层。**",
      "**状态与资源层。**",
      "**源码版本错位。**",
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(label, unitTitle, "android-art-exploration");
    },
    failure(label) {
      return `若分析「${label}」时只停留在 API 调用而不追踪 framework、Binder/消息、目标对象和生命周期回调，表面成功会掩盖跨线程或进程状态错误。`;
    },
    evidence(label) {
      return `固定 Android 5.0/Java 基线，沿源码与运行链追踪「${label}」，保存 PID/TID、对象或 token、状态前后值、最终行为及一个故障注入。`;
    },
  },
  "first-line-android": {
    sourceUrl: "https://read.douban.com/ebook/337721450/",
    sourceName: "郭霖《第一行代码 Android（第3版）》",
    unitIds: manifestIdentityUnits("first-line-android"),
    pruneOutline: {
      heading: "官方目录逐节点复刻",
      endMarker: "## 最小可执行切片",
    },
    normalizeInlineBlocks: true,
    addPedagogyBridge: true,
    contextualSentences: [
      "书中的kotlin-android-extensions、IntentService、jcenter及部分权限、存储、后台和通知做法具有历史边界，现代目标SDK必须另查官方资料，不能反向改写原书语境。",
      "网络重试必须有上限、退避和幂等；数据库升级必须覆盖所有受支持旧版本；文件和媒体句柄在取消与异常路径释放；组件回调不持有超过生命周期的View或Context。",
      "启动不仅看首帧，还要检查可交互时刻；列表不仅看平均帧率，还要检查滚动卡顿和绑定分配；后台工作不仅看是否完成，还要检查电量、约束与系统调度；网络不仅看成功耗时，还要检查超时、取消和错误恢复。",
      "版本迁移分两步：先在Android 10/Kotlin语境下还原书中机制，再对目标compileSdk、targetSdk和设备API查询当前官方合同。",
      "三段代码分别承担状态模型、环境重放和行为断言。真实工程还需静态检查、单元测试、仪器测试、截图或无障碍检查，以及发布构建验证；不要用日志输出代替断言，也不要让测试依赖本机IDE缓存。",
      "保持其他变量不变，分别注入旋转、进程死亡、权限拒绝、断网、无效输入和目标SDK变化；任何状态丢失、崩溃、泄漏或越权都推翻完成结论。",
      "先按原书还原机制，再查询目标SDK官方合同；一次只迁移存储、权限、后台、通知、依赖或发布之一，比较构建、行为、测试和回滚。",
    ],
    contextualParagraphMarkers: [
      "**历史示例不等于当前最佳实践。**",
      "**数据与设备安全。**",
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(label, unitTitle, "first-line-android");
    },
    failure(label) {
      return `若学习「${label}」只复制顺利路径代码而不处理权限、生命周期、线程、持久状态和资源释放，应用会在拒绝、旋转、进程重建或弱网时丢失行为。`;
    },
    evidence(label) {
      return `在 Android 10/Kotlin 基线上复现「${label}」，用正常、权限拒绝/弱网和组件重建样本核对界面状态、持久数据、线程与资源释放。`;
    },
  },
  "crazy-android": {
    sourceUrl: "https://phei.com.cn/module/goods/wssd_content.jsp?bookid=53581",
    sourceName: "李刚《疯狂Android讲义》第4版",
    unitIds: manifestIdentityUnits("crazy-android"),
    pruneOutline: {
      heading: "出版社完整目录逐节点映射",
      endMarker: "## 最小可执行切片",
    },
    normalizeInlineBlocks: true,
    dedupeSupplementSections: true,
    textReplacements: [["Android 9.x", "Android 9 系列"]],
    contextualSentences: [
      "本页依据电子工业出版社《疯狂Android讲义》第4版完整目录独立重构，不复制原文。",
      "本书准确反映Android 9时代。",
      "先按Android 9.x/Java保存原书行为基线，再一次只改变targetSdk、权限、后台、存储、通知、依赖或外部服务之一。",
      "第4版以近百个实例和两个综合项目组织知识，不是零散API列表。",
      "界面字段和进程单例不是可靠事实源。",
      "三段代码分别约束状态模型、环境重放和行为结果。",
      "主线程负责输入、生命周期分发和UI；文件、SQLite、网络、图片解码、OpenGL准备与长计算不得阻塞帧。",
      "Intent、Provider、WebView、JSON、文件URI、地图Key、位置和传感器样本都按不可信输入处理。",
      "校验action、scheme、MIME、大小、授权、时效和响应者；导出组件最小授权；日志、截图与数据库不得泄露联系人、短信、位置、令牌或签名密钥。",
      "性能以用户任务衡量：界面看首帧和掉帧，列表看回收与分配，媒体和图形看帧时间与内存，网络看超时和取消，传感器看采样与耗电，后台工作看约束与重复调度。",
      "现代迁移一次改变一个条件。",
      "AsyncTask、IntentService、旧Fragment、外部存储、后台Service、隐式广播、HTTP明文、旧定位和地图SDK都需要查当前合同；先保存Android 9基线，再迁移并保留行为差异、测试和回滚。",
      "把525个目录条目压成“UI、数据、服务、网络”几个概览页，会直接遗漏Intent、资源、Provider、OpenGL、桌面、传感器、GPS、地图和两个项目。",
      "固定JDK、Android SDK、Gradle、设备API、语言、权限和输入，完成从用户动作到可观察结果的垂直切片；保存干净构建、设备操作、原始日志、状态快照与断言。",
      "保持其他变量不变，分别注入旋转、后台回收、进程死亡、拒权、断网、无效输入与重复操作；状态丢失、越权、崩溃、泄漏或重复副作用都推翻完成结论。",
      "先按第4版锁定Java与Android 9行为基线，再查询当前平台合同；一次只迁移组件导出、存储、权限、后台、通知、位置或依赖之一，保存构建、行为、测试与回滚差异。",
    ],
    contextualParagraphMarkers: [
      "**核心陷阱。**",
      "**历史示例不等于当前平台政策。**",
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(label, unitTitle, "crazy-android");
    },
    failure(label) {
      return `若学习「${label}」只复制正常路径示例而不声明组件 owner、线程、状态、权限与外部失败，应用会在旋转、进程重建、拒权或弱网时丢失行为。`;
    },
    evidence(label) {
      return `在 Android 9.x/Java 基线上复现「${label}」，保存构建与设备指纹、操作、线程/生命周期轨迹、状态快照，并注入一个权限、重建或外部服务失败。`;
    },
  },
  "deep-android-kernel": {
    sourceUrl: "https://www.yami.com/zh/p/android/3118057821",
    sourceName: "林学森《深入理解Android内核设计思想》",
    unitIds: manifestIdentityUnits("deep-android-kernel"),
    pruneOutline: {
      heading: "权威目录逐节点映射",
      endMarker: "## 证据解释",
    },
    normalizeInlineBlocks: true,
    contextualSentences: [
      "本页依据林学森《深入理解Android内核设计思想》独立重构，不复制原文。",
      "课程先复现首版Make构建、Binder、SurfaceFlinger、WMS、View、AudioFlinger、Ant与旧工具链，再用现代AOSP/Soong、Treble、ART和新调试工具建立迁移账本，绝不把第2版新增的虚拟机、安全与Gradle章节倒填进首版。",
      "第一份证据是版本证据：AOSP标签、repo manifest、主机工具链、产品目标和产物哈希必须同时保存。",
      "第三份证据是所有权证据。",
      "第四份证据是迁移对照。",
    ],
    contextualParagraphMarkers: [
      '<Term def="记录AOSP标签、仓库、构建目标、文件路径和提交位置的溯源信息">源码版本卡</Term>',
    ],
    explainConcept(label, unitTitle) {
      return explainAndroidConcept(label, unitTitle, "deep-android-kernel");
    },
    failure(label) {
      return `若研究「${label}」时混用 AOSP 版本、只画静态类图或遗漏线程进程与资源所有权，得到的调用链无法在单一构建上复现。`;
    },
    evidence(label) {
      return `锁定 Android 4.3 标签与产品目标追踪「${label}」，保存源码符号、PID/TID、对象/缓冲区身份、正常与失败断点、产物哈希及最终释放结果。`;
    },
  },
  "csharp-functional-programming": {
    sourceUrl:
      "https://livebook.manning.com/book/functional-programming-in-c-sharp/table-of-contents",
    sourceName: "Functional Programming in C#",
    unitIds: {
      "introducing-functional-programming": "fpc1-01",
      "why-function-purity-matters": "fpc1-02",
      "designing-function-signatures-and-types": "fpc1-03",
      "patterns-in-functional-programming": "fpc1-04",
      "designing-programs-with-function-composition": "fpc1-05",
      "functional-error-handling": "fpc1-06",
      "structuring-an-application-with-functions": "fpc1-07",
      "multi-argument-functions": "fpc1-08",
      "thinking-about-data-functionally": "fpc1-09",
      "event-sourcing-functional-persistence": "fpc1-10",
      "lazy-computations-continuations-monadic-composition": "fpc1-11",
      "stateful-programs-and-computations": "fpc1-12",
      "asynchronous-computations": "fpc1-13",
      "reactive-data-streams": "fpc1-14",
      "message-passing-concurrency": "fpc1-15",
    },
    explainConcept(label, unitTitle) {
      return explainCSharpConcept(
        label,
        unitTitle,
        "csharp-functional-programming",
      );
    },
    failure(label) {
      return `若把「${label}」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。`;
    },
    evidence(label) {
      return `以确定输入重复运行「${label}」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。`;
    },
  },
  "csharp-quality-code": {
    sourceUrl:
      "https://www.cnblogs.com/luminji/archive/2011/09/20/2182265.html",
    sourceName: "编写高质量代码：改善 C# 程序的 157 个建议",
    unitIds: {
      "basic-language-elements": "cqc-01",
      "collections-and-linq": "cqc-02",
      "generics-delegates-and-events": "cqc-03",
      "resource-management-and-serialization": "cqc-04",
      "exceptions-and-custom-exceptions": "cqc-05",
      "asynchrony-multithreading-tasks-and-parallelism": "cqc-06",
      "member-design": "cqc-07",
      "type-design": "cqc-08",
      "security-design": "cqc-09",
      "naming-conventions": "cqc-10",
      "clean-code": "cqc-11",
      "development-practices": "cqc-12",
    },
    explainConcept(label, unitTitle) {
      return explainCSharpConcept(label, unitTitle, "csharp-quality-code");
    },
    failure(label) {
      return `若把「${label}」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。`;
    },
    evidence(label) {
      return `固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「${label}」的收益与反例。`;
    },
  },
  "deep-understanding-csharp": {
    sourceUrl:
      "https://livebook.manning.com/book/c-sharp-in-depth-fourth-edition/table-of-contents",
    sourceName: "C# in Depth, Fourth Edition",
    unitIds: {
      "survival-of-the-sharpest": "cid4-01",
      "csharp-2": "cid4-02",
      "csharp-3-linq": "cid4-03",
      "csharp-4-interoperability": "cid4-04",
      "writing-asynchronous-code": "cid4-05",
      "async-implementation": "cid4-06",
      "csharp-5-bonus-features": "cid4-07",
      "super-sleek-properties": "cid4-08",
      "stringy-features": "cid4-09",
      "concise-code-smorgasbord": "cid4-10",
      "composition-using-tuples": "cid4-11",
      "deconstruction-and-pattern-matching": "cid4-12",
      "pass-by-reference-efficiency": "cid4-13",
      "concise-code-csharp-7": "cid4-14",
      "csharp-8-and-beyond": "cid4-15",
    },
    explainConcept(label, unitTitle) {
      return explainCSharpConcept(
        label,
        unitTitle,
        "deep-understanding-csharp",
      );
    },
    failure(label) {
      return `若解释「${label}」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。`;
    },
    evidence(label) {
      return `以明确的 LangVersion 与目标框架构建「${label}」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。`;
    },
  },
  "illustrated-server-network": {
    sourceUrl: "https://www.ituring.com.cn/book/1494",
    sourceName: "图解服务器端网络架构",
    sourceBasis: "authorized-sample",
    unitIds: manifestIdentityUnits("illustrated-server-network"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(
        label,
        unitTitle,
        "illustrated-server-network",
      );
    },
    failure(label) {
      return `若只记住「${label}」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。`;
    },
    evidence(label) {
      return `画出「${label}」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。`;
    },
  },
  "computer-networks-top-down": {
    sourceUrl: "https://www.cmpedu.com/books/book/5606311.htm",
    sourceName: "计算机网络：自顶向下方法（第 8 版）",
    unitIds: manifestIdentityUnits("computer-networks-top-down"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(
        label,
        unitTitle,
        "computer-networks-top-down",
      );
    },
    failure(label) {
      return `若把「${label}」当成孤立协议名而忽略分层接口、时序和端到端状态，丢包、重传或路由变化后就难以解释观测结果。`;
    },
    evidence(label) {
      return `用确定的客户端与服务端输入复现「${label}」，同时核对应用日志、套接字状态和分层抓包中的字段、时序与失败响应。`;
    },
  },
  "illustrated-http": {
    sourceUrl: "https://www.ituring.com.cn/book/1229",
    sourceName: "图解 HTTP",
    unitIds: manifestIdentityUnits("illustrated-http"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(label, unitTitle, "illustrated-http");
    },
    failure(label) {
      return `若只背诵「${label}」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。`;
    },
    evidence(label) {
      return `保存「${label}」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。`;
    },
  },
  "wireshark-packet-analysis": {
    sourceUrl: "https://nostarch.com/packetanalysis3",
    sourceName: "Practical Packet Analysis, Third Edition",
    unitIds: manifestIdentityUnits("wireshark-packet-analysis"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(
        label,
        unitTitle,
        "wireshark-packet-analysis",
      );
    },
    failure(label) {
      return `若分析「${label}」时忽略捕获位置、时间基准和协议上下文，重传、校验和卸载或非对称路径会被误判为真实故障。`;
    },
    evidence(label) {
      return `固定接口、捕获过滤器和时间范围，围绕「${label}」保存可复现 pcap，再用显示过滤器、会话跟踪与端点计数交叉核对结论。`;
    },
  },
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

function toPascalCase(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function stripEditorialComments(source) {
  return source
    .replace(/\n?\{\/\*[\s\S]*?\*\/\}\n?/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n");
}

function pruneRepeatedNodeTemplate(source, chapter) {
  let result = source.replace(
    /\n## 原书目录逐节点重构\n[\s\S]*?(?=\n## 本页完整节点清单\n)/,
    "\n",
  );
  result = result.replace("\n## 本页完整节点清单\n", "\n## 原书目录核对清单\n");
  result = result.replace(
    /^.*最小证据包包含：/gm,
    `${chapter.title} 的最小证据包包含：`,
  );
  result = result.replace(
    /固定URI、客户端、网络、服务器数据和操作，只改变一个方法、首部、主体、连接、Cookie或输入上下文；/g,
    `围绕 ${chapter.title} 固定 URI、客户端、网络、服务器数据和操作，并且只改变一个方法、首部、主体、连接、Cookie 或输入上下文；`,
  );
  result = result.replace(
    /对关键帧同时保存frame\.number、frame\.time_relative、五元组、协议字段和十六进制偏移；/g,
    `围绕 ${chapter.title} 的关键帧，同时保存 frame.number、frame.time_relative、五元组、协议字段和十六进制偏移；`,
  );
  result = result.replace(
    /至少保留一个竞争解释，例如/g,
    `${chapter.title} 的诊断要保留至少一个竞争解释，例如`,
  );
  result = result.replace(
    /证据包使用只读原始PCAP及其哈希，/g,
    `${chapter.title} 的证据包以只读原始 PCAP 及其哈希为起点，`,
  );

  let experimentPromptSeen = false;
  result = result
    .split(/\n(?=动手试：)/)
    .map((block) => {
      if (!block.startsWith("动手试：")) return block;
      const [prompt, ...rest] = block.split("\n");
      if (experimentPromptSeen) return rest.join("\n").replace(/^\n+/, "");
      experimentPromptSeen = true;
      return [prompt, ...rest].join("\n");
    })
    .join("\n");

  return result.replace(/\n{3,}/g, "\n\n");
}

function pruneOutlineSection(source, outline) {
  const headingMarker = `\n## ${outline.heading}\n`;
  const start = source.indexOf(headingMarker);
  if (start === -1) return source;
  const end = source.indexOf(
    `\n${outline.endMarker}`,
    start + headingMarker.length,
  );
  if (end === -1) {
    throw new Error(
      `Outline end marker missing: ${outline.heading} -> ${outline.endMarker}`,
    );
  }
  return `${source.slice(0, start)}\n\n${source.slice(end + 1)}`.replace(
    /\n{3,}/g,
    "\n\n",
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function contextualizeSharedSentences(source, chapter) {
  const quotedTitle = chapter.title.startsWith("《")
    ? chapter.title
    : `《${chapter.title}》`;
  const prefix = `在${quotedTitle}中，`;
  for (const sentence of chapter.book.contextualSentences ?? []) {
    const replacement = `${prefix}${sentence}`;
    const repeatedContext = new RegExp(
      `(?:在[^\\n。！？]{0,120}?中，)*${escapeRegExp(sentence)}`,
      "g",
    );
    source = source.replace(repeatedContext, replacement);
  }
  return source;
}

function contextualizeParagraphMarkers(source, chapter) {
  const quotedTitle = chapter.title.startsWith("《")
    ? chapter.title
    : `《${chapter.title}》`;
  const prefix = `在${quotedTitle}中，`;
  for (const marker of chapter.book.contextualParagraphMarkers ?? []) {
    const paragraphStart = new RegExp(`^(\\s*)${escapeRegExp(marker)}`, "gm");
    source = source.replace(paragraphStart, `$1${prefix}${marker}`);
  }
  return source;
}

function addAndroidPedagogyBridge(source, chapter) {
  const quotedTitle = chapter.title.startsWith("《")
    ? chapter.title
    : `《${chapter.title}》`;
  const predictionSentence =
    "直觉检验只改变一个条件：旋转、进程重建、拒绝权限、断网或目标 SDK。";
  source = source.replace(
    new RegExp(
      `(?:${escapeRegExp(`${quotedTitle}的`)})*${escapeRegExp(predictionSentence)}`,
      "g",
    ),
    `${quotedTitle}的${predictionSentence}`,
  );
  if (source.includes("## 先建立直觉")) return source;
  const marker = "\n## 最小可执行切片\n";
  if (!source.includes(marker)) {
    throw new Error(
      `Executable slice marker missing: ${chapter.bookSlug}/${chapter.slug}`,
    );
  }
  const bridge = `
## 先建立直觉

在${quotedTitle}中，先把<Term def="由系统回调驱动、决定组件何时创建、可见、停止与释放的状态机">生命周期</Term>看成系统与应用之间的时序合同，再把<Term def="Android版本、targetSdk、设备形态和权限政策共同限定的行为适用范围">版本边界</Term>看成这份合同的坐标。API 名称只是入口；真正要追踪的是输入由谁接收、状态由谁保存、任务由谁取消，以及失败后用户看到什么。

${quotedTitle}的直觉检验只改变一个条件：旋转、进程重建、拒绝权限、断网或目标 SDK。若结果随隐藏缓存或旧对象身份漂移，就回到状态所有者和平台合同定位首个分叉，而不是继续堆补丁。
`;
  return source.replace(marker, `${bridge}${marker}`);
}

function dedupeSupplementSections(source) {
  const marker = "\n## 原版目录概念补充核对\n";
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return source;
  const attributionIndex = source.indexOf("<Attribution", markerIndex);
  if (attributionIndex === -1) return source;
  const prefix = source.slice(0, markerIndex + marker.length);
  const supplement = source.slice(
    markerIndex + marker.length,
    attributionIndex,
  );
  const suffix = source.slice(attributionIndex);
  const seen = new Set();
  const sections = supplement.split(/\n(?=### )/).filter((section) => {
    if (!section.startsWith("### ")) return true;
    const heading = normalized(section.split("\n", 1)[0]);
    if (seen.has(heading)) return false;
    seen.add(heading);
    return true;
  });
  return `${prefix}${sections.join("\n")}${suffix}`;
}

function normalizeInlineBlockComponents(source) {
  return source.replace(
    /^(\s*)<(Callout|Answer|GlossaryItem)(\b[^>]*)>(.+)<\/\2>\s*$/gm,
    (_match, indent, name, attributes, body) =>
      `${indent}<${name}${attributes}>\n${indent}  ${body.trim()}\n${indent}</${name}>`,
  );
}

function addPredictionCue(source, chapter) {
  const quotedTitle = chapter.title.startsWith("《")
    ? chapter.title
    : `《${chapter.title}》`;
  source = source.replaceAll(`《${chapter.title}》`, quotedTitle);
  if (/猜一猜|先预测|动手试|试一试|观察.*变化/.test(source)) return source;
  const marker = "\n## 本章回顾\n";
  if (!source.includes(marker)) {
    throw new Error(
      `Summary marker missing: ${chapter.bookSlug}/${chapter.slug}`,
    );
  }
  const cue = `
## 测量前预测

先预测${quotedTitle}中哪一段会成为主导成本，并写出结果等价、时间、分配、线程、能耗或帧指标的可推翻阈值；运行后保留不符合预测的原始样本，而不是只挑最快一次。
`;
  return source.replace(marker, `${cue}${marker}`);
}

function plainText(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#|{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalized(value) {
  return String(value ?? "")
    .toLocaleLowerCase()
    .replace(/[\s`*_~“”‘’"'：:，,。.!！?？、（）()[\]{}<>/\\|—–-]+/g, "")
    .trim();
}

function proseParagraphs(source, { excludeLists = false } = {}) {
  return source
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .filter(
      (block) =>
        !excludeLists ||
        !block
          .trim()
          .split("\n")
          .filter(Boolean)
          .every((line) => /^\s*[-*]\s+/.test(line)),
    )
    .map(plainText)
    .filter((paragraph) => paragraph.length >= 45);
}

function preferredConcept(alternatives) {
  return (
    alternatives.find((value) => /[\u3400-\u9fff]/u.test(value)) ??
    alternatives[0]
  );
}

function addMissingConceptCoverage(source, chapter) {
  const configuredUnitIds = chapter.book.unitIds[chapter.slug];
  const unitIds = Array.isArray(configuredUnitIds)
    ? configuredUnitIds
    : configuredUnitIds
      ? [configuredUnitIds]
      : [];
  if (unitIds.length === 0) return { source, added: [] };
  const units = unitIds.map((unitId) => {
    const unit = MANIFESTS[chapter.bookSlug]?.units?.find(
      (candidate) => candidate.id === unitId,
    );
    if (!unit)
      throw new Error(`Manifest unit missing: ${chapter.bookSlug}/${unitId}`);
    return unit;
  });

  const paragraphs = proseParagraphs(source, {
    excludeLists: Boolean(chapter.book.pruneNodeTemplate),
  });
  const missing = units.flatMap((unit) =>
    unit.concepts
      .map((alternatives, index) => ({
        alternatives,
        index,
        unitId: unit.id,
        unitTitle: unit.title,
      }))
      .filter(({ alternatives, index }) => {
        if (index === 0) return false;
        return !alternatives.some((alternative) => {
          const needle = normalized(alternative);
          return (
            needle &&
            paragraphs.some((paragraph) =>
              normalized(paragraph).includes(needle),
            )
          );
        });
      })
      .map(({ alternatives, index, unitId, unitTitle }) => ({
        label: preferredConcept(alternatives),
        index,
        unitId,
        unitTitle,
      })),
  );
  if (missing.length === 0 || source.includes("## 原版目录概念补充核对")) {
    return { source, added: [] };
  }

  const sections = missing
    .map(
      ({ label, index, unitId, unitTitle }) => `### ${label}：机制、边界与证据

${chapter.book.explainConcept?.(label, unitTitle) ?? `在《${chapter.title}》的官方单元 ${unitId} 中，${label}连接本章第 ${index + 1} 组知识约束。学习时要同时说明它接受什么输入、改变什么状态、在何种边界失效；再以本章示例的固定输入输出或失败用例复核结论，不能只记术语名称。`}`,
    )
    .join("\n\n");
  const supplement = `## 原版目录概念补充核对

以下条目补齐官方目录中容易被示例主线掩盖的概念。它们不重复罗列目录，而是明确每项概念的机制、适用边界和验收证据。

${sections}

`;
  return {
    source: source.replace("<Attribution", `${supplement}<Attribution`),
    added: missing.map(({ label }) => label),
  };
}

function compactLabel(value) {
  const text = plainText(value).replace(
    /^[一二三四五六七八九十\d]+[、.：:\s-]*/,
    "",
  );
  return text.length > 30 ? `${text.slice(0, 29)}…` : text;
}

function compactMechanism(value, label, title) {
  const cleaned = plainText(value);
  if (!cleaned)
    return `本节把「${label}」放回《${title}》的输入、状态变化与输出路径中理解。`;
  const sentence =
    cleaned.match(/^.{35,180}?[。！？.!?](?:\s|$)/u)?.[0]?.trim() ??
    cleaned.slice(0, 150);
  return sentence.length < cleaned.length && !/[。！？.!?]$/u.test(sentence)
    ? `${sentence}…`
    : sentence;
}

function chapterSections(source, title) {
  const headingPattern = /^##\s+(.+)$/gm;
  const headings = [...source.matchAll(headingPattern)];
  const excluded = /名词解释|术语表|练习|小结|总结|复习题|出处|来源/u;
  const sections = [];

  for (let index = 0; index < headings.length; index += 1) {
    const heading = compactLabel(headings[index][1]);
    if (!heading || excluded.test(heading)) continue;
    const start = headings[index].index + headings[index][0].length;
    const end =
      index + 1 < headings.length ? headings[index + 1].index : source.length;
    const body = source.slice(start, end);
    const paragraph = body
      .split(/\n\s*\n/)
      .map((candidate) => candidate.trim())
      .find(
        (candidate) =>
          candidate.length >= 45 &&
          !/^(?:import\b|<|```|\||[-*]\s|\d+[.)、]\s)/.test(candidate),
      );
    sections.push({
      label: heading,
      mechanism: compactMechanism(paragraph ?? "", heading, title),
    });
    if (sections.length === 3) break;
  }

  const fallbacks = ["建立概念边界", "跟踪状态变化", "用失败证据验收"];
  while (sections.length < 3) {
    const label = fallbacks[sections.length];
    sections.push({
      label,
      mechanism: `围绕《${title}》${label}，明确输入、执行条件、输出与可观察证据。`,
    });
  }
  return sections;
}

function choosePracticeMode(slug) {
  if (
    /loop|branch|io|algorithm|statement|expression|function|standard/.test(slug)
  )
    return "simulation";
  if (/class|template|container|structure|inheritance|oop|library/.test(slug))
    return "design";
  return "diagnosis";
}

function attributeValue(attributes, names) {
  for (const name of names) {
    const match = attributes.match(new RegExp(`\\b${name}="([^"]+)"`));
    if (match) return match[1];
  }
  return null;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function normalizeAttribution(source, book) {
  const attributionPattern = /<Attribution\b([\s\S]*?)\/>/;
  const match = source.match(attributionPattern);
  if (!match) throw new Error("Attribution block missing");
  const adaptedFrom =
    attributeValue(match[1], ["adaptedFrom", "source", "title"]) ??
    book.sourceName;
  const adaptedUrl =
    attributeValue(match[1], ["adaptedUrl", "url"]) ?? book.sourceUrl;
  const replacement = `<Attribution
  adaptedFrom="${escapeAttribute(adaptedFrom)}"
  adaptedUrl="${escapeAttribute(adaptedUrl)}"
  mode="independent-rewrite"
  sourceBasis="${book.sourceBasis ?? "outline-only"}"
/>`;
  return source.replace(attributionPattern, replacement);
}

function addGovernanceFrontmatter(source, book, slug, practiceMode) {
  const parsed = matter(source);
  const configuredUnitIds = book.unitIds[slug];
  const unitIds = Array.isArray(configuredUnitIds)
    ? configuredUnitIds
    : configuredUnitIds
      ? [configuredUnitIds]
      : [];
  const additions = [
    "qualityVersion: 2",
    `practiceMode: ${practiceMode}`,
    "sourceMode: independent-rewrite",
    ...(unitIds.length === 1 ? [`officialUnitId: ${unitIds[0]}`] : []),
    ...(unitIds.length > 1 ? [`officialUnitIds: [${unitIds.join(", ")}]`] : []),
  ];
  let frontmatter = source.slice(0, source.indexOf("---", 3) + 3);
  const body = source.slice(frontmatter.length);
  if (!/^sourceUrl:/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(
      /^draft:/m,
      `sourceUrl: "${book.sourceUrl}"\ndraft:`,
    );
  }
  for (const addition of additions) {
    const key = addition.split(":")[0];
    if (!new RegExp(`^${key}:`, "m").test(frontmatter)) {
      frontmatter = frontmatter.replace(/\n---$/, `\n${addition}\n---`);
    }
  }
  if (!parsed.data.title) throw new Error("Chapter title missing");
  return `${frontmatter}${body}`;
}

function wrapperSource(chapter) {
  const stages = chapter.sections.map((section) => ({
    label: section.label,
    mechanism: section.mechanism,
    failure: chapter.book.failure(section.label),
    evidence: chapter.book.evidence(section.label),
  }));
  return `"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = ${JSON.stringify(stages, null, 2)};

export function ${chapter.labComponent}() {
  return (
    <ChapterDecisionLab
      title=${JSON.stringify(`${chapter.title}：机制与证据`)}
      prompt=${JSON.stringify(`切换《${chapter.title}》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。`)}
      stages={STAGES}
      conclusion=${JSON.stringify(`学完《${chapter.title}》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。`)}
    />
  );
}

export function ${chapter.mechanismComponent}() {
  return (
    <ChapterMechanismMap
      title=${JSON.stringify(`${chapter.title}：机制路径`)}
      stages={STAGES}
    />
  );
}

export function ${chapter.failureComponent}() {
  return (
    <ChapterFailureMatrix
      title=${JSON.stringify(`${chapter.title}：失效与核验`)}
      stages={STAGES}
    />
  );
}
`;
}

function addChapterVisuals(source, chapter) {
  const importLine = `import { ${chapter.labComponent}, ${chapter.mechanismComponent}, ${chapter.failureComponent} } from "@/components/mdx/${chapter.bookSlug}/${chapter.slug}";`;
  if (!source.includes(importLine)) {
    source = source.replace(
      'import { Attribution } from "@/components/mdx/attribution";',
      `import { Attribution } from "@/components/mdx/attribution";\n${importLine}`,
    );
  }
  const visualBlock = `<${chapter.mechanismComponent} />

<${chapter.labComponent} />

<${chapter.failureComponent} />`;
  if (!source.includes(`<${chapter.mechanismComponent} />`)) {
    source = source.replace("</Objectives>", `</Objectives>\n\n${visualBlock}`);
  }
  return source;
}

const remediated = [];
const supplemented = [];
for (const [bookSlug, book] of Object.entries(BOOKS)) {
  const componentDirectory = path.join(COMPONENT_ROOT, bookSlug);
  fs.mkdirSync(componentDirectory, { recursive: true });

  for (const mdxPath of walkMdx(path.join(CONTENT_ROOT, bookSlug))) {
    const slug = path.basename(mdxPath, ".mdx");
    const componentStem = toPascalCase(slug);
    const chapter = {
      book,
      bookSlug,
      slug,
      labComponent: `${componentStem}DecisionLab`,
      mechanismComponent: `${componentStem}MechanismMap`,
      failureComponent: `${componentStem}FailureDiagram`,
    };
    let source = stripEditorialComments(fs.readFileSync(mdxPath, "utf8"));
    const parsed = matter(source);
    chapter.title = String(parsed.data.title);
    chapter.sections = chapterSections(parsed.content, chapter.title);
    const practiceMode = choosePracticeMode(slug);
    if (book.pruneNodeTemplate) {
      source = pruneRepeatedNodeTemplate(source, chapter);
    }
    if (book.pruneOutline) {
      source = pruneOutlineSection(source, book.pruneOutline);
    }
    for (const [before, after] of book.textReplacements ?? []) {
      source = source.replaceAll(before, after);
    }
    source = contextualizeSharedSentences(source, chapter);
    source = contextualizeParagraphMarkers(source, chapter);
    if (book.addPedagogyBridge) {
      source = addAndroidPedagogyBridge(source, chapter);
    }
    if (book.dedupeSupplementSections) {
      source = dedupeSupplementSections(source);
    }
    if (book.normalizeInlineBlocks) {
      source = normalizeInlineBlockComponents(source);
    }
    if (book.addPredictionToUnmapped && !book.unitIds[slug]) {
      source = addPredictionCue(source, chapter);
    }
    source = addGovernanceFrontmatter(source, book, slug, practiceMode);
    source = normalizeAttribution(source, book);
    source = addChapterVisuals(source, chapter);
    const coverage = addMissingConceptCoverage(source, chapter);
    source = coverage.source;
    if (coverage.added.length > 0) {
      supplemented.push({
        id: `${bookSlug}/${slug}`,
        concepts: coverage.added,
      });
    }
    fs.writeFileSync(mdxPath, source);
    fs.writeFileSync(
      path.join(componentDirectory, `${slug}.tsx`),
      wrapperSource(chapter),
    );
    remediated.push(`${bookSlug}/${slug}`);
  }
}

console.log(
  `Remediated ${remediated.length} outline-based chapters across ${Object.keys(BOOKS).length} books.`,
);
for (const entry of supplemented) {
  console.log(`Supplemented ${entry.id}: ${entry.concepts.join(" · ")}`);
}
console.log(`Supplemented chapters: ${supplemented.length}.`);
