import type { ReviewQuestion } from "./types";

/** 车载中间件复习题 */
export const vsiMiddlewareQuestions: ReviewQuestion[] = [
  {
    id: "vsi-middleware-1",
    chapter: "vsi-middleware",
    level: 1,
    question:
      `AUTOSAR Adaptive 是什么？它和 Classic AUTOSAR 有什么区别？分别适用于什么场景？`,
    answer:
      `AUTOSAR Adaptive（AP）：\n- AUTOSAR 联盟为高算力、需要动态部署和联网的 ECU（如域控制器、中央计算平台、ADAS 控制器）定义的开放式软件平台标准。\n- 基于 POSIX（Linux/QNX），支持多进程、动态应用部署、面向服务通信（SOME/IP 等）、OTA 动态更新应用。\n- 核心组件：ARA（AUTOSAR Runtime for Adaptive），包括 Execution Management（执行管理）、Communication Management（通信管理，CM）、Diagnostic Management（DM）、Persistency（持久化）、Time Synchronization（TSync）、Update & Configuration Management（UCM，OTA）、State Management（SM）、Log & Trace、Cryptography（ara::crypto）等。\n- 应用用 C++ 开发，运行在用户空间，可动态启停。\n\nClassic AUTOSAR（CP）：\n- AUTOSAR 早期标准，面向传统分布式 ECU（发动机、变速箱、车身、底盘等 MCU 级控制器）。\n- 基于 OSEK OS（静态配置的实时 OS），静态配置、静态生成代码，应用编译时固定，运行时不可动态部署。\n- 通信以信号导向（signal-based，基于 CAN/LIN/FlexRay 的 PDU/RTE）为主。\n- 应用用 C 开发，高度静态、确定性、低资源占用。\n\n主要区别：\n\n1. 运行环境：CP 跑在 MCU（资源受限，KB 级 RAM、单核 Cortex-M），静态 RTOS；AP 跑在 SoC（MPU，MB/GB 级 RAM、多核 Cortex-A），POSIX OS（Linux/QNX）。\n\n2. 应用模型：CP 静态——软件组件（SWC）在编译时通过 RTE 生成固定连接，运行时不改变；AP 动态——应用（Machine 上运行的进程）可在运行时通过 UCM 安装/启停。\n\n3. 通信：CP 信号导向（Signal-based，CAN PDU 经 RTE 分发），面向小型确定信号；AP 服务导向（SOA，SOME/IP/DDS），面向服务调用（方法/事件/字段）。\n\n4. 实时性：CP 硬实时（微秒级，静态调度）；AP 软实时/非实时（毫秒级，POSIX 调度），不适合极严格硬实时控制。\n\n5. 资源与算力：CP 适合简单确定控制；AP 适合复杂算法（ADAS 感知、规控）和高算力需求。\n\n6. 安全等级：CP 普遍做 ASIL D（如动力/制动）；AP 目前多用于 ASIL B/D 分解后的高算力部分，复杂软件做 ASIL D 成本高。\n\n适用场景：\n- CP：发动机、变速箱、车身控制器、底盘 ECU、网关、传统 MCU 级传感器/执行器控制——确定、硬实时、低资源。\n- AP：智能驾驶域控、座舱域控、中央计算平台、网关（高性能以太网网关）——高算力、动态部署、SOA、OTA、联网。\n- 两者常共存：CP 做底层确定控制（MCU），AP 做高层算法与协调（SoC），通过以太网/SOME/IP 交互。\n\n一句话：CP 是「静态确定、信号导向、MCU 级」，AP 是「动态服务、面向算力、SoC 级」；前者管传统控制，后者管智能与软件定义。`,
    tags: ["AUTOSAR Adaptive", "Classic AUTOSAR", "POSIX", "SOA", "ARA", "UCM"],
  },
  {
    id: "vsi-middleware-2",
    chapter: "vsi-middleware",
    level: 2,
    question:
      `SOME/IP 和 DDS 的通信模型有什么区别？在序列化、服务发现、QoS 三个维度上各有什么特点？`,
    answer:
      `SOME/IP（Scalable service-Oriented MiddlewarE over IP）：\n- 由博世提出，AUTOSAR 标准化的车载以太网中间件协议，面向服务。AP 默认通信方式。\n- 通信模型：客户端-服务端。服务端提供 Service（含 Method 方法调用、Event 事件通知、Field 字段读写）。客户端订阅事件、调用方法。\n- 四种通信模式：Request/Response（方法调用，有返回）、Fire and Forget（方法调用，无返回）、Notification（事件推送）、Field（Getter/Setter/Notifier）。\n- 传输：基于 UDP（单播/多播）或 TCP。常见 SOME/IP-TP 做大报文分段。\n\nDDS（Data Distribution Service，OMG 标准）：\n- 以数据为中心的发布-订阅（DCPS）模型。发布者写 Data Topic，订阅者按 Topic 订阅，中间件做匹配和分发。\n- 去中心化，无 broker，节点对等，靠 RTPS（Real-Time Publish-Subscribe）协议在域内自动发现对端。\n- 原生支持丰富 QoS 策略（可靠性、持久性、期限、历史深度等）。\n\n三个维度对比：\n\n1. 序列化：\n- SOME/IP：自定义二进制序列化（结构体→字节流，类型对齐紧凑），高效、报文小，适合车载带宽和确定性。序列化由 AUTOSAR 工具或 SOME/IP 库按接口描述生成。\n- DDS：默认用 CDR（Common Data Representation）序列化，也是二进制。部分实现支持 Zero-copy（共享内存传数据，避免拷贝），对大点云/图像传输有利。\n\n2. 服务发现（Service Discovery）：\n- SOME/IP SD：专门的 SOME/IP-SD 协议。服务端周期性多播 OfferService，客户端 Subscribe。支持服务实例、事件组（EventGroup）订阅。是显式、可配置的发现机制，发现报文开销可控。\n- DDS：RTPS 自动发现（Simple Discovery Protocol 等）。节点加入域后自动通过多播发现所有 Participant，匹配 Writer/Reader。零配置、即插即用，但大规模域中发现报文可能较多，需要调优（如 Domain ID 隔离、发现间隔）。\n\n3. QoS：\n- SOME/IP：QoS 较弱，主要靠传输层（TCP 可靠、UDP 不可靠）和订阅/确认机制。可靠性、持久性需应用自己实现。强调轻量、确定。\n- DDS：QoS 极其丰富——RELIABILITY（可靠/尽力）、DURABILITY（瞬态/持久）、DEADLINE、LIFESPAN、HISTORY（深度）、CONTENT_FILTER（内容过滤）、OWNERSHIP（强所有权冗余）等几十种。可声明式表达「这条数据要可靠、保留最后 N 个样本、过期丢弃」等策略，中间件自动执行。DDS 在需要灵活数据分发和冗余的场景（如多传感器发布、多消费者订阅同一数据）优势明显。\n\n选型倾向：\n- AUTOSAR Adaptive 体系、与 CP/整车电子深度集成、强调确定性和工具链一致 → SOME/IP。\n- 机器人/智驾数据总线、需要丰富 QoS 和多对多数据分发（点云/图像多消费者）、零配置发现 → DDS（或 ROS 2 的 DDS 中间件）。\n- 实际项目中两者也可见共存或网关桥接。\n\n一句话：SOME/IP 是「面向服务、轻量确定、发现可控」的车规中间件；DDS 是「以数据为中心、QoS 丰富、零配置发现」的发布订阅总线。`,
    tags: ["SOME/IP", "DDS", "RTPS", "序列化", "服务发现", "QoS", "发布订阅", "SOA"],
  },
  {
    id: "vsi-middleware-3",
    chapter: "vsi-middleware",
    level: 3,
    question:
      `请详细描述 SOME/IP 的服务发现（SOME/IP-SD）机制是如何工作的。为什么车载以太网环境特别需要服务发现，而传统 CAN 总线却不需要？`,
    answer:
      `SOME/IP-SD 工作机制：\n\nSOME/IP-SD（Service Discovery）是 SOME/IP 的子协议，负责在以太网上动态发现服务实例并建立订阅关系。它用固定 Service ID（0xFFFF 8100）和 Method ID 0x8100 的 SOME/IP 报文承载，传输层用 UDP（多播 + 单播）。\n\n核心概念：\n- Service：服务，有 Service ID 和 Instance ID（一个 Service 可有多个实例）。\n- EventGroup：事件组，把若干 Event 打包，订阅以 EventGroup 为单位。\n- Endpoint：通信端点（IP+Port）。\n\n主要报文类型与状态机：\n\n1. OfferService（服务提供）：\n- 服务端启动后进入 Initial Wait（随机等待，避免多节点同时发包造成突发），然后周期性多播 OfferService，宣告「我在 IP:Port 提供 Service X 的 Instance Y，含若干 EventGroup」。\n- 周期性 Offer 维持服务的「在线」状态。若客户端一段时间收不到 Offer（TTL 过期），认为服务下线。\n\n2. FindService（服务查找）：\n- 客户端若需要某服务但还没收到 Offer，可多播 FindService 主动询问「谁提供 Service X？」。\n- 收到询问的服务端回复 OfferService（单播或多播）。\n- 这解决「客户端先于服务端启动」的时序问题。\n\n3. Subscribe / SubscribeEventgroupAck（订阅）：\n- 客户端发现服务后，向服务端发 SubscribeEventgroup（单播），订阅某个 EventGroup。\n- 服务端校验后回 SubscribeEventgroupAck（确认）或 Nack（拒绝）。\n- 订阅成功后，服务端开始向客户端推送该 EventGroup 内的事件（Notification，单播或组播）。\n- 订阅有 TTL，需周期性续订；超时未续订则服务端停止推送。\n\n4. StopOffer / StopSubscribe（停止）：\n- 服务下线前发 StopOffer；客户端不再需要发 StopSubscribe，让订阅自然过期。\n\n状态机的确定性保障：\n- Initial Wait、Repeat 阶段、Offer 间隔、TTL 等都通过配置参数控制，保证可预测的发现行为，满足车规对确定性的要求。\n- 这种「配置驱动 + 状态机」的设计让 SOME/IP-SD 比通用 IT 发现协议（如 mDNS）更适合车载。\n\n为什么车载以太网需要服务发现，而 CAN 不需要：\n\n1. 通信范式不同：\n- CAN 是信号导向（signal-oriented）广播总线：发送方把信号放进固定 ID 的 PDU 广播，谁需要谁监听。发送方不需要知道谁在收，接收方按 ID 过滤。这是一种「无连接、无发现」的广播——所有节点预先约定报文 ID 和周期，编译时静态配置（DBC/ARXML），运行时无需动态发现。\n- 车载以太网是面向服务（SOA）的点对点/组播网络：服务调用需要知道对方的 IP:Port，订阅需要知道事件源。IP 网络是「连接型」的，必须先发现对端地址才能通信。\n\n2. 地址与拓扑不同：\n- CAN 总线上每个 ECU 的报文 ID 是静态分配的，节点地址隐含在 ID 里，不需要动态寻址。\n- 以太网上每个 ECU 有动态或静态 IP，服务可能在不同端口、可能有多个实例，必须动态发现「哪个 IP 哪个端口提供哪个服务的哪个实例」。\n\n3. 动态性不同：\n- CAN 网络在量产时完全确定，节点和报文固定，运行时不变。\n- SOA/SDV 强调动态部署：服务实例可能因 OTA、应用启停而变化，需要动态发现当前可用的服务实例。\n\n4. 报文规模与消费模式不同：\n- CAN 报文小（8/64 字节），广播开销可接受，所有节点都收（过滤即可）。\n- 以太网大报文（图像/点云/服务响应）若全广播会浪费带宽，需要点对点/组播按需分发，发现机制决定「发给谁」。\n\n5. 跨域/跨网段：\n- CAN 通常单总线单域，无需跨网段寻址。\n- 以太网是路由网络，服务可能跨网段，需要发现 + 路由。\n\n一句话：CAN 靠「静态 ID 广播 + 预先约定」免发现；以太网 SOA 靠「动态 IP:Port + 服务实例」必须发现。SOME/IP-SD 用 Offer/Find/Subscribe 状态机把动态发现做成可控、可预测的车规机制。`,
    tags: ["SOME/IP-SD", "服务发现", "OfferService", "Subscribe", "CAN", "信号导向", "SOA", "动态发现"],
  },
  {
    id: "vsi-middleware-4",
    chapter: "vsi-middleware",
    level: 4,
    question:
      `为什么车载电子电气架构要从「信号导向（CAN/Classic AUTOSAR）」转向「面向服务的架构（SOA，SOME/IP/DDS/Adaptive AUTOSAR）」？这个转变如何支撑「软件定义汽车」？在迁移过程中会面临哪些工程挑战？`,
    answer:
      `从信号导向转向 SOA 的根本原因：\n\n信号导向（CAN + Classic AUTOSAR）的局限：\n\n1. 耦合与僵化：信号在 DBC/ARXML 中静态定义，发送方和接收方在编译时绑死。增加一个信号要改发送方、所有接收方、总线配置，重新刷写所有相关 ECU——迭代成本极高。\n\n2. 难以扩展：传统车有 50~100 个 ECU，信号成千上万，但都是 1:1 或 1:N 的静态广播。新功能要新增信号和 ECU，线束和算力已达极限。无法支撑「软件定义、动态部署」。\n\n3. 不支持服务化能力：信号只能传「值」，无法表达「方法调用、事件订阅、属性读写」等服务语义。无法把车辆能力封装成可调用的服务。\n\n4. 带宽与数据类型：CAN（1 Mbps）/CAN-FD（5~8 Mbps）无法承载图像、点云、大模型数据。高算力 SoC 间需要以太网级带宽和结构化消息。\n\n5. 难以 OTA 动态更新：CP 静态生成，应用与 ECU 绑定，OTA 整车升级兼容性风险大。\n\nSOA 的解法：\n\n1. 服务抽象与解耦：把车辆能力（空调、座椅、导航、感知、规控）封装成服务，应用通过标准接口调用，不关心服务在哪个 ECU。服务提供者和消费者通过服务发现动态绑定，发送方/接收方解耦。增加功能 = 部署新服务/新版本，不改动其他服务。\n\n2. 动态部署：AP 上应用可在运行时通过 UCM 安装/启停，OTA 只更新目标服务而不刷整车。这是 SDV「软件可演进」的基础。\n\n3. 服务复用与组合：一个感知服务可被规控、座舱、远程诊断等多个消费者订阅；服务可组合成更高级功能（如「自动泊车」=感知+规划+控制服务的编排）。\n\n4. 高带宽与丰富数据：基于以太网，可传图像/点云/大消息；SOME/IP/DDS 提供方法/事件/字段等丰富交互语义。\n\n5. 标准化 API：ARA、DDS IDL、Car API 等提供标准化服务接口，跨车型/跨供应商复用，降低集成成本。\n\nSOA 如何支撑软件定义汽车：\n\n1. 硬件与软件解耦：服务接口标准化，软件不绑定特定 ECU，可部署在任意有算力的节点（中央计算平台）。硬件升级不影响应用。\n\n2. 功能可演进：通过 OTA 部署新服务/新版本，车辆功能持续进化，无需换代。\n\n3. 生态可扩展：第三方应用通过标准服务 API 接入车辆能力（类似手机 App 调用系统服务），生态繁荣。\n\n4. 算力可调度：服务可动态分配到不同域控/中央节点，按需调度算力。\n\n迁移过程中的工程挑战：\n\n1. 信号到服务的建模：传统信号是「数据流」，服务是「能力封装」。如何把成千上万的 CAN 信号重新建模成合理的服务边界（哪些信号聚成一个服务、服务粒度多大、接口如何设计）是巨大的架构工作。服务粒度太细→调用开销大、复杂；太粗→复用性差。需要领域驱动设计思维。\n\n2. 新旧并存：CP（信号导向）和 AP（SOA）会长期共存。网关要做信号↔服务转换（如把 CAN 信号桥接成 SOME/IP 服务属性），转换逻辑复杂、性能和延迟要可控。整车通信矩阵要兼顾两种范式。\n\n3. 服务发现与确定性：SOA 的动态发现带来灵活性，但也带来时序不确定（发现延迟、订阅建立时间）。功能安全关键路径需要确定性，必须通过配置、冗余、超时降级保证。这比静态 CAN 难。\n\n4. 安全隔离：SOA 服务跨域调用增加攻击面。服务调用必须鉴权、签名、加密（SecOC/TLS），防止越权车控。ASIL 服务与 QM 服务要隔离。\n\n5. 实时性：AP/POSIX 非硬实时，关键控制环（规控）仍需 MCU（CP）做确定执行。SOA 适合高层协调，底层硬实时仍走 CP/信号。要划清边界：哪些走 SOA、哪些仍走信号。\n\n6. 测试与集成：服务化后系统集成点变多、版本组合爆炸。需要服务契约测试、虚拟 ECU（vECU）仿真、HiL 全流程验证。传统基于信号的测试方法不够。\n\n7. 工具链与标准落地：SOME/IP/DDS/AP 工具链（IDL 编辑、代码生成、诊断、标定、OTA）成熟度和一致性问题；多供应商服务接口对齐成本高。\n\n8. 组织与流程：SOA 要求跨域、跨供应商协同设计服务接口，传统「各 ECU 厂商各做各」的模式要变为「整车服务架构先行」。这影响研发组织与流程。\n\n一句话：信号导向是「静态绑死的数据流」，SOA 是「动态解耦的能力服务」；转向 SOA 用服务抽象+动态部署+标准接口支撑软件定义汽车，但要在服务建模、新旧桥接、确定性、安全隔离和测试集成上付出系统工程代价。`,
    tags: ["综合", "SOA", "信号导向", "软件定义汽车", "服务抽象", "迁移挑战", "Classic AUTOSAR", "Adaptive AUTOSAR"],
  },
];
