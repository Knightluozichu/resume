import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "game-server-programming";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/game-server-programming/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/game-server-programming-v2-profiles.json",
);

const SOURCES = {
  book: "https://book.douban.com/subject/2240257/",
  toc: "https://www.jb51.net/books/334673.html",
  google: "https://books.google.com/books?vid=ISBN9787121043185",
  tcp: "https://www.rfc-editor.org/rfc/rfc9293.html",
  udp: "https://www.rfc-editor.org/rfc/rfc768.html",
  winsock:
    "https://learn.microsoft.com/en-us/windows/win32/winsock/socket-i-o-2",
  threads:
    "https://learn.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights",
  iocp: "https://learn.microsoft.com/en-us/windows/win32/fileio/i-o-completion-ports",
  epoll: "https://man7.org/linux/man-pages/man7/epoll.7.html",
  tls: "https://www.rfc-editor.org/rfc/rfc8446.html",
  postgres: "https://www.postgresql.org/docs/current/transaction-iso.html",
  openMatch: "https://open-match.dev/site/docs/overview/",
  auth: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
  logging:
    "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
  tuf: "https://theupdateframework.io/docs/metadata/",
};

const PATHS = {
  learningMap: "00-guide/gsp-official-learning-map",
  "gsp-unit-01": "01-foundations/gsp-01-network-programming-foundations",
  "gsp-unit-02": "01-foundations/gsp-02-multithreading",
  "gsp-unit-03":
    "02-communication-security/gsp-03-efficient-communication-models",
  "gsp-unit-04": "02-communication-security/gsp-04-game-data-encryption",
  "gsp-unit-05": "03-systems/gsp-05-game-database",
  "gsp-unit-06": "03-systems/gsp-06-game-lobby",
  "gsp-unit-07": "03-systems/gsp-07-gm-tool",
  "gsp-unit-08": "03-systems/gsp-08-auto-update",
  finalReview: "04-review/gsp-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《网络游戏服务器端编程》57个公开目录坐标学习地图",
    duty: "按网络、线程、I/O模型、加密、数据库、大厅、GM工具与更新系统组织57个公开目录坐标",
    question:
      "怎样保留2007年Windows服务器开发语境，同时用现行协议和官方文档核对稳定机制、过时接口与安全边界？",
    invariant:
      "公开到小节的前四章逐项覆盖，后四章只登记章名；连接、并发、状态、安全与运维路径可重放",
    fault:
      "为公开目录未披露的第5至第8章虚构权威小节，或把现代云服务倒填成2007年原书内容",
    scenario:
      "团队接手一套2007年Windows游戏服务器，先复原Socket、线程、IOCP和数据边界，再登记现代安全与运维迁移。",
    stages: [
      "锁定目录披露和系统时代",
      "贯通连接并发与状态",
      "补齐安全运维迁移证据",
    ],
    nodeNames: [
      "客户端会话",
      "网络接入",
      "工作队列",
      "状态服务",
      "持久化与运维",
    ],
    sources: [SOURCES.book, SOURCES.toc, SOURCES.tcp, SOURCES.iocp],
    artifact:
      "57坐标映射、披露级别、2007与现行标签、连接状态、线程所有权、I/O完成、加密边界、事务、权限、更新信任和回退。",
    opening:
      "学习地图把原书的Windows Socket和IOCP放回2007年，不用现代微服务术语覆盖历史机制；现代资料只作协议、安全和迁移核验。",
  },
  "gsp-unit-01": {
    duty: "覆盖游戏类型、客户端服务器职责、协议模型、TCP/UDP、Socket流程、地址与字节序转换",
    question:
      "怎样从字节流或数据报建立消息边界、连接状态与错误处理，并证明客户端和服务器职责没有混写？",
    invariant:
      "协议版本、端点、字节序、帧边界、连接状态、超时与关闭路径固定，同一字节序列可重放",
    fault:
      "把一次recv当成一条完整消息，TCP发生拆包或粘包后解析越界并污染后续会话",
    scenario:
      "实现登录握手和位置更新：登录走TCP长度前缀帧，位置广播走UDP序号数据报，并注入拆包和乱序。",
    stages: [
      "声明协议帧和端点",
      "执行Socket收发与解析",
      "验证超时关闭乱序和重放",
    ],
    nodeNames: ["DNS与端点", "Socket连接", "接收缓冲", "协议解析", "会话状态"],
    sources: [SOURCES.tcp, SOURCES.udp, SOURCES.winsock],
    artifact:
      "协议字段、网络字节序、长度边界、Socket调用、TCP状态、UDP序号、收发日志、超时、半关闭和错误码。",
    opening:
      "网络基础页先把传输层提供的字节流或数据报与应用消息分开；Socket调用成功不等于业务帧完整。",
  },
  "gsp-unit-02": {
    duty: "覆盖进程线程、Windows多线程、事件、临界区、互斥、信号量、互锁、定时器与死锁",
    question:
      "怎样给共享状态指定唯一所有者和同步原语，并用等待图证明没有数据竞争、丢唤醒或死锁？",
    invariant:
      "共享对象、读写者、锁顺序、等待条件、唤醒语义和停止协议显式，线程退出后资源可回收",
    fault:
      "网络线程持有会话锁等待数据库事件，而数据库线程持有队列锁回调会话，形成锁顺序环",
    scenario:
      "为会话表、发送队列和定时任务分配线程职责，分别用事件、临界区、信号量与互锁操作验证。",
    stages: [
      "声明线程和共享对象所有权",
      "选择同步原语与锁顺序",
      "注入竞争死锁和停止",
    ],
    nodeNames: ["网络线程", "会话表", "任务队列", "工作线程", "停止与回收"],
    sources: [SOURCES.threads, SOURCES.iocp, SOURCES.logging],
    artifact:
      "线程清单、共享对象、临界区、事件、互斥、信号量、互锁变量、定时器、等待图、停止信号和回收日志。",
    opening:
      "多线程页不以线程数量衡量性能；先明确状态所有权，再选择能表达等待和容量的同步原语。",
  },
  "gsp-unit-03": {
    duty: "比较阻塞、非阻塞、select、异步、IOCP和epoll，并覆盖Socket错误与资源释放",
    question:
      "怎样把就绪通知和完成通知映射到缓冲区生命周期、工作线程与背压，而不是只比较API名称？",
    invariant:
      "每个未完成I/O、缓冲区、连接键和完成包有唯一生命周期；队列有容量，错误和取消必达回收",
    fault:
      "WSARecv尚未完成就复用OVERLAPPED和缓冲区，完成包返回后写入已分配给另一连接的内存",
    scenario:
      "用同一回显协议对照阻塞、select、epoll和IOCP，记录就绪/完成语义、线程唤醒、队列深度与关闭。",
    stages: [
      "区分阻塞就绪与完成语义",
      "绑定连接缓冲和完成键",
      "验证背压取消错误与释放",
    ],
    nodeNames: ["监听Socket", "异步操作", "内核队列", "工作线程", "连接回收"],
    sources: [SOURCES.winsock, SOURCES.iocp, SOURCES.epoll],
    artifact:
      "I/O模式对照、注册集合、OVERLAPPED、完成键、epoll事件、缓冲所有权、并发值、队列水位、错误和释放轨迹。",
    opening:
      "高效通信页用通知语义而非平台标签比较模型：epoll提示就绪，IOCP交付完成包，两者的缓冲和重试合同不同。",
  },
  "gsp-unit-04": {
    duty: "覆盖密码学角色、消息、算法、密钥、安全性与常用算法，并建立现代传输保护边界",
    question:
      "怎样区分加密、认证、完整性与重放防护，并避免把自制算法或静态密钥当作游戏协议安全？",
    invariant:
      "威胁模型、算法套件、密钥来源、随机数、nonce、认证标签、证书验证和轮换路径显式",
    fault:
      "使用固定对称密钥和可预测IV加密所有客户端，密钥泄露后无法隔离会话或轮换",
    scenario:
      "为登录和游戏消息划定TLS通道、会话令牌、消息序号与服务端权威校验，并执行密钥轮换。",
    stages: [
      "写明资产威胁和信任边界",
      "选择标准协议与密钥生命周期",
      "验证篡改重放轮换和失败关闭",
    ],
    nodeNames: ["客户端身份", "TLS握手", "会话密钥", "消息认证", "轮换与吊销"],
    sources: [SOURCES.tls, SOURCES.auth, SOURCES.logging],
    artifact:
      "威胁模型、TLS版本、证书验证、密钥托管、nonce与序号、认证标签、令牌、轮换、吊销和失败日志。",
    opening:
      "加密页不把“密文看不懂”当安全；必须分别说明机密性、完整性、身份和重放防护由谁提供。",
  },
  "gsp-unit-05": {
    duty: "在仅有章名的公开边界内建立玩家状态、事务、并发更新、幂等与恢复的数据库验收",
    question:
      "怎样让一次游戏状态变更在重试、并发和故障下只提交一次，并能从日志或备份恢复？",
    invariant:
      "业务键、事务边界、隔离假设、幂等键、提交结果和恢复点明确，缓存不冒充持久化事实",
    fault: "客户端重试购买请求时没有幂等键，两个事务分别扣款和发货导致重复物品",
    scenario:
      "实现角色存档和道具购买，记录事务、版本号、幂等键、缓存失效、提交确认与恢复演练。",
    stages: [
      "声明状态模型与事务边界",
      "执行并发更新和幂等重试",
      "验证备份恢复与一致性",
    ],
    nodeNames: ["业务命令", "幂等登记", "数据库事务", "缓存投影", "提交与恢复"],
    sources: [SOURCES.postgres, SOURCES.logging],
    artifact:
      "模式、主键、版本列、事务、隔离级别、幂等键、重试、缓存失效、提交日志、备份和恢复时间点。",
    opening:
      "数据库页明确只依据公开章名展开现代验收任务，不把事务、缓存或特定数据库伪装成原书未公开小节。",
  },
  "gsp-unit-06": {
    duty: "在仅有章名的公开边界内建立大厅会话、匹配、房间分配、断线重连与容量治理",
    question:
      "怎样把玩家意图从大厅排队推进到权威房间，并在取消、超时、重复请求和容量不足时保持一致？",
    invariant:
      "玩家身份、票据、队列状态、匹配结果、房间租约和会话令牌具有唯一版本与超时",
    fault: "匹配结果已分配房间但大厅重试仍保留旧票据，玩家同时进入两个权威会话",
    scenario:
      "实现登录大厅、组队票据、匹配、房间分配和断线重连，注入超时、取消与重复回调。",
    stages: [
      "声明票据房间和会话状态机",
      "执行匹配分配与确认",
      "验证取消超时重连和容量",
    ],
    nodeNames: ["大厅会话", "匹配票据", "匹配函数", "房间分配", "会话确认"],
    sources: [SOURCES.openMatch, SOURCES.auth, SOURCES.logging],
    artifact:
      "玩家身份、票据ID、队列状态、匹配条件、房间租约、会话令牌、超时取消、重连和容量告警。",
    opening:
      "大厅页不为原书补造小节；它以章名限定系统边界，再用可重放状态机验证现代大厅与匹配职责。",
  },
  "gsp-unit-07": {
    duty: "在仅有章名的公开边界内建立GM工具的身份、最小权限、审批、审计与回滚",
    question:
      "怎样让高权限操作可授权、可归因、可复核和可撤销，并防止客户端或普通后台绕过？",
    invariant:
      "每项GM动作在服务端鉴权，操作者、理由、目标、前后值、审批、结果和关联ID写入防篡改审计",
    fault:
      "共享管理员账号直接修改玩家资产，没有工单理由、二次确认或前后值，事后无法归因",
    scenario:
      "实现封禁、补发和配置变更流程，分别验证最小权限、双人审批、速率限制、审计查询与回滚。",
    stages: [
      "建立身份权限和动作矩阵",
      "执行审批命令与服务端校验",
      "验证审计告警和回滚",
    ],
    nodeNames: ["GM身份", "授权策略", "审批命令", "业务服务", "审计与回滚"],
    sources: [SOURCES.auth, SOURCES.logging],
    artifact:
      "角色属性矩阵、服务端策略、工单、审批者、命令ID、目标前后值、结果、审计签名、告警和回滚记录。",
    opening:
      "GM工具页把运维便利视作高风险能力；界面隐藏按钮不是授权，所有检查和可归因日志必须在服务端。",
  },
  "gsp-unit-08": {
    duty: "在仅有章名的公开边界内建立更新清单、签名元数据、分阶段发布、回滚与客户端恢复",
    question:
      "怎样证明客户端安装的是授权且最新的目标文件，并抵抗旧版本、混合元数据、镜像和密钥风险？",
    invariant:
      "根、目标、快照和时间戳信任角色分离，版本、哈希、长度、过期、阈值签名和回滚策略显式",
    fault:
      "更新器只校验下载文件哈希却不验证签名和版本，攻击者可重放旧的合法文件与旧哈希",
    scenario:
      "发布客户端补丁，生成签名元数据，经灰度、暂停、回滚和离线恢复验证，再轮换在线密钥。",
    stages: [
      "建立信任根和目标元数据",
      "执行下载验证与原子安装",
      "验证回滚冻结混合与密钥轮换",
    ],
    nodeNames: ["信任根", "时间戳", "快照与目标", "下载验证", "原子安装与恢复"],
    sources: [SOURCES.tuf, SOURCES.logging],
    artifact:
      "root/targets/snapshot/timestamp元数据、版本、哈希、长度、过期、签名阈值、灰度、回滚、密钥轮换和恢复日志。",
    opening:
      "自动更新页不为原书补造实现细节；现代对照采用TUF信任角色说明更新安全，不把它反写成2007年原书方案。",
  },
  finalReview: {
    title: "《网络游戏服务器端编程》综合复核：连接、状态与运维",
    duty: "用一次玩家会话串联网络、线程、I/O、加密、数据库、大厅、GM与更新系统",
    question:
      "怎样证明同一玩家命令从字节进入到状态提交和运维审计都可追踪，并在过载或故障时安全拒绝？",
    invariant:
      "协议帧、会话、缓冲、任务、事务、授权、审计和版本元数据共享关联ID与明确所有者",
    fault:
      "只演示功能成功，没有拆包、队列饱和、事务重试、权限拒绝、密钥或更新回滚证据",
    scenario:
      "综合演练让玩家登录、进入大厅、匹配房间、提交状态，再由GM审计并执行客户端灰度更新。",
    stages: [
      "锁定协议身份和容量合同",
      "运行并发状态与安全路径",
      "执行故障恢复审计和更新回滚",
    ],
    nodeNames: [
      "玩家命令",
      "接入与会话",
      "任务与状态",
      "事务与房间",
      "审计与发布",
    ],
    sources: [
      SOURCES.tcp,
      SOURCES.iocp,
      SOURCES.tls,
      SOURCES.postgres,
      SOURCES.auth,
      SOURCES.tuf,
    ],
    artifact:
      "57坐标检查、协议日志、连接缓冲、队列水位、线程轨迹、事务、匹配租约、GM审计、更新元数据和恢复演练。",
    opening:
      "综合复核要求关联ID贯穿网络、状态和运维证据；吞吐截图或一次成功登录不能代替背压、拒绝与恢复路径。",
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
    [
      /游戏服务器端|网络游戏类型|功能划分|通信协议|网络协议|OSI|TCP\/IP/,
      [
        "划分客户端、服务器与协议层职责",
        "角色、端点、层次、状态和协议版本",
        "层模型代替应用消息合同",
      ],
    ],
    [
      /Socket|套接字|IP地址|字节转换|TCP\/IP通信|UDP\/IP通信/,
      [
        "把端点字节流或数据报转成应用帧",
        "地址、字节序、缓冲、帧边界、状态与错误码",
        "一次接收等同一条消息",
      ],
    ],
    [
      /线程|进程|随机矩形|多工模拟|全局变量|事件|临界区|互斥|信号量|互锁|定时器|死锁/,
      [
        "以线程所有权和同步原语保护共享状态",
        "读写者、锁顺序、等待图、容量与停止日志",
        "锁顺序环或丢唤醒",
      ],
    ],
    [
      /I\/O模式|Socket事件|阻塞|非阻塞|选择I\/O|异步|IOCP|epoll/,
      [
        "区分阻塞、就绪通知与完成通知",
        "注册、操作、缓冲、完成键、队列、错误与释放",
        "异步缓冲过早复用",
      ],
    ],
    [
      /密码|发送者|接收者|消息和加密|算法|密钥|安全性/,
      [
        "以标准协议组合机密性、完整性、身份与重放防护",
        "威胁、算法套件、密钥、nonce、标签与轮换",
        "自制算法或静态共享密钥",
      ],
    ],
    [
      /数据库/,
      [
        "以事务、幂等和恢复维护玩家持久状态",
        "业务键、事务、隔离、版本、重试与恢复点",
        "重试重复提交业务结果",
      ],
    ],
    [
      /游戏大厅/,
      [
        "用票据、匹配和房间租约推进会话状态",
        "玩家、票据、队列、匹配、房间、超时与确认",
        "重复票据进入多个会话",
      ],
    ],
    [
      /GM工具/,
      [
        "以服务端授权、审批、审计与回滚治理高权限动作",
        "主体、策略、理由、前后值、结果与关联ID",
        "共享账号和不可归因修改",
      ],
    ],
    [
      /自动更新/,
      [
        "以签名元数据和版本验证交付授权目标",
        "信任角色、版本、哈希、长度、过期和阈值签名",
        "只验哈希而允许旧版本重放",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录条目转成连接到状态的可重放路径",
      "输入、所有者、队列、状态、输出和回收日志",
      "成功响应代替故障验证",
    ]
  );
}

function termFor(concept, index) {
  const short = concept.split(/[；;：:——,]/, 1)[0].trim();
  return short.length > 0 && short.length <= 18
    ? short
    : `服务器条目${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const nodeDetails = [
    ["版本化请求或事件", "验证身份、版本和边界", "可追踪输入", "接入层"],
    ["上游已验证状态", "执行本层唯一转换", "有界任务或状态", "协议/协调层"],
    ["任务与容量令牌", "按所有权排队和调度", "工作结果或背压", "并发层"],
    [
      "业务命令与版本",
      "校验规则并原子改变状态",
      "提交结果或拒绝",
      "权威状态层",
    ],
    ["已提交结果", "持久化、审计、发布或恢复", "可重放工件", "运维层"],
  ];
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
    nodes: specification.nodeNames.map((name, index) => ({
      name,
      input: nodeDetails[index][0],
      action: `${title}：${nodeDetails[index][1]}`,
      output: nodeDetails[index][2],
      owner: nodeDetails[index][3],
    })),
    normalTrace: [
      `为“${title}”锁定版本、输入、关联ID、容量、初始状态和所有者`,
      `执行${specification.stages[0]}，保存接入、身份或协议边界`,
      `推进${specification.stages[1]}，记录队列、线程、状态和提交结果`,
      `完成${specification.stages[2]}，交付${specification.artifact}`,
    ],
    failureTrace: [
      `“${title}”复用同一版本、输入、关联ID、容量和初始状态`,
      `只注入单一故障：${specification.fault}`,
      "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
      `依据“${specification.invariant}”拒绝结果并从已知快照重放`,
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];
if (profiles.length !== 10) throw new Error("课程必须恰好为10页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并明确2007原书、公开目录披露级别与现行技术资料的时间边界
- 能先预测“${profile.question}”的连接或状态轨迹，再沿接入、队列、所有者、事务、输出与回收逐阶段核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、降级或拒绝服务器发布

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个服务器任务开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作前先预测哪个连接、队列、状态或信任节点会变化，运行后再补理由不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”保持“${profile.invariant}”并交付${profile.artifact}，功能成功才构成服务器证据。

## 书目、57个公开坐标与披露边界

“${profile.title}”以[书目信息](${SOURCES.book})核对编著单位、电子工业出版社、2007年8月、ISBN 9787121043185和299页；[公开详细目录](${SOURCES.toc})核对第1至第3章、第4章至4.1.6以及第5至第8章章名，[Google Books](${SOURCES.google})交叉核对ISBN与约300页记录。完整公开分母为57个目录坐标。

“${profile.title}”只依据公开目录限定范围，不逐段改写原文；解释、状态模型、交互、练习与答案均为独立教学重写。第5至第8章公开资料只披露章名，因此本页的现代工程任务是独立教学展开，不登记成原书权威小节。

“${profile.title}”另以${links}核对现行技术事实。2007年的Windows线程、Winsock和IOCP保留为历史技术轨；现行RFC、Microsoft、PostgreSQL、OWASP、Open Match与TUF资料只验证稳定机制、安全和迁移边界，不能反向证明原书包含现代实现。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，${concept}用于${mechanism}；先锁定输入和所有者，再用${evidence}复核，出现${caution}时不得发布。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张状态卡：它怎样${mechanism}、改变哪个对象、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，条目${index + 1}把${concept}解释为${mechanism}；复核者先读取${evidence}再判断服务，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到上游。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个公开坐标${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”中讨论${concept}前预测${mechanism}会改变哪项连接或状态，再读取${evidence}；观察到${caution}时保留失败轨迹。`,
];

function conceptsSection(profile) {
  return `## 公开目录坐标与服务器机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应公开目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受原书年份、披露级别、平台、状态、安全和运维边界约束。`;
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
  return `## 先预测，再操作三个服务器实验

<Callout type="info" title="先写出哪个节点会先变化">
  对“${profile.title}”先选择版本化输入、关联ID、容量、初始状态和预期输出，再操作请求路径、故障轨迹和运行发布门；结果与预测不一致时应修改系统假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 请求与状态路径">
    沿“${profile.nodeNames.join("、")}”逐节点查看输入、动作、输出与所有者，证明“${profile.title}”没有跨层偷写状态。

    <${profile.componentBase}RequestPath />
  </Step>
  <Step title="2. 正常与单故障轨迹">
    保持“${profile.scenario}”不变，切换正常和故障模式，定位“${profile.fault}”最先破坏边界、容量、状态或信任的位置。

    <${profile.componentBase}FailureTraceLab />
  </Step>
  <Step title="3. 运行与安全发布门">
    分别切换边界所有权、容量背压、安全权限、恢复观测，展开${profile.artifact}后决定是否发布。

    <${profile.componentBase}OperationalGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持版本、输入、关联ID、容量和初始状态不变，沿接入到运维方向寻找最早偏离；最终响应偶尔成功不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="功能演示不等于容量与恢复">
  ${profile.scenario} 在单客户端和空队列下成功，只证明理想路径；“${profile.title}”仍需边界输入、队列饱和、超时取消、重复请求、冷启动与恢复证据。
</Callout>

<Callout type="trap" title="现代架构不能倒填2007原书">
  “${profile.title}”引用现行资料是为了核对稳定机制与迁移；后四章只公开章名，现代事务、匹配、权限和TUF任务不能宣称为原书小节。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放服务协议

| 阶段 | 服务动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只允许声明所有者改变状态 | ${index === 0 ? "版本、输入、关联ID、容量和初始状态" : index === 1 ? "连接、队列、线程、状态与提交轨迹" : "权限、审计、恢复、迁移与回退记录"} | ${index === 0 ? "身份或边界不可追溯" : index === 1 ? profile.fault : "无法重放或恢复基线"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
nodes: ${JSON.stringify(profile.nodeNames)}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_node_trace_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同版本、输入、关联ID、容量和初始状态下重放。重置后若节点、轨迹模式、步骤、发布门或证据显示没有回到基线，交互状态已经污染比较，不能作为服务器证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接原书年份、披露边界、输入、所有者、状态与恢复。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的${concept}：以“${mechanism}”解释系统作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住API调用顺序，而是能围绕“${profile.question}”重建服务器状态，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：服务合同。** “${profile.title}”为什么必须先声明版本、输入、关联ID、容量、初始状态和所有者？

<Answer>
  ${profile.scenario} 若这些条件不固定，相同请求可能进入不同协议、队列、事务、权限或更新版本；“${profile.title}”先声明合同，才能把结果连接到可验证状态。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明公开目录坐标已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一版本、输入、关联ID、容量和初始状态，重放正常路径后只注入“${profile.fault}”；记录最早偏离点，撤销故障并再次运行。只有请求路径、故障轨迹、发布门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="信息产业部软件与集成电路促进中心、北京汇众益智科技有限公司《网络游戏服务器端编程》"
  adaptedUrl="${SOURCES.book}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    nodes: profile.nodes,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "边界与所有权",
        detail: `“${profile.title}”的输入、对象、线程和状态写入者可追溯。`,
      },
      {
        label: "容量与背压",
        detail: `“${profile.title}”的缓冲、队列、超时、取消和拒绝策略有边界。`,
      },
      {
        label: "安全与权限",
        detail: `“${profile.title}”的身份、密钥、授权和敏感操作在服务端验证。`,
      },
      {
        label: "恢复与观测",
        detail: `“${profile.title}”可用关联日志、快照、回滚和冷启动演练恢复。`,
      },
    ],
  };
  return `"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies GameServerEvidenceModel;

export function ${profile.componentBase}RequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function ${profile.componentBase}FailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function ${profile.componentBase}OperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
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
import { ${profile.componentBase}RequestPath, ${profile.componentBase}FailureTraceLab, ${profile.componentBase}OperationalGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用请求路径、单故障轨迹和运行发布门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.book,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
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

const catalogEntries = previousManifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (catalogEntries !== 57)
  throw new Error(`公开目录坐标应为57，实际${catalogEntries}`);

manifestDocument.books[BOOK] = {
  ...previousManifest,
  sourceKind:
    "verified-bibliographic-record-public-detailed-toc-and-current-primary-protocol-platform-security-database-matchmaking-update-documentation",
  sourceUrl: SOURCES.book,
  secondarySourceUrls: [
    SOURCES.toc,
    SOURCES.google,
    SOURCES.tcp,
    SOURCES.udp,
    SOURCES.winsock,
    SOURCES.threads,
    SOURCES.iocp,
    SOURCES.epoll,
    SOURCES.tls,
    SOURCES.postgres,
    SOURCES.openMatch,
    SOURCES.auth,
    SOURCES.logging,
    SOURCES.tuf,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "书目信息核对编著单位、电子工业出版社、2007年8月、ISBN 9787121043185和299页；公开详细目录完整披露第1至第3章，披露第4章至4.1.6，第5至第8章只披露章名，共57个公开目录坐标。课程按八章逐一覆盖，另设学习地图与综合复核，共10页。后四章的事务、匹配、GM权限与TUF更新任务均为独立现代教学展开，不登记成原书权威小节；现行资料只核对稳定机制、安全和迁移边界。内容均为独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/game-server-programming-v2-profiles.json",
  factSourcePolicy:
    "公开目录限定57个坐标和各章披露级别；TCP、UDP、Winsock、Windows同步、IOCP、epoll、TLS、PostgreSQL事务、Open Match、OWASP授权与日志、TUF更新元数据分别以协议标准和官方资料核对。现代资料不反写2007内容。",
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
      outlineSources: [SOURCES.book, SOURCES.toc, SOURCES.google],
      technicalSources: Object.values(SOURCES).slice(3),
      officialUnits: previousManifest.units.length,
      officialCatalogEntries: catalogEntries,
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
  `已重建 ${profiles.length} 页，覆盖${catalogEntries}个公开目录坐标，生成 ${profiles.length * 3} 个交互视图。`,
);
