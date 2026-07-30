#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "game-network-core-tech";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/game-network-core-tech-v2-profiles.json",
);
const CHINESE_OUTLINE =
  "https://www.dedao.cn/ebook/detail?id=ORa2P4NNLqmQPG2178z5gvkDndlOxWyGjLwajK6BEVXYRrJpA9M4oybeZpqAKQgj";
const ORIGINAL_PUBLISHER = "https://gihyo.jp/book/2011/978-4-7741-4580-8";
const AUTHOR_REPO = "https://github.com/kengonakajima/book";
const AUTHOR_SNAPSHOT =
  "https://github.com/kengonakajima/book/tree/bccbd43b6a149e08ec336f62c7c8b49701c65211";

const SOURCES = {
  chineseOutline: CHINESE_OUTLINE,
  originalPublisher: ORIGINAL_PUBLISHER,
  originalSupport: "https://gihyo.jp/book/2011/978-4-7741-4580-8/support",
  authorRepo: AUTHOR_REPO,
  authorSnapshot: AUTHOR_SNAPSHOT,
  chineseEdition:
    "https://books.google.com/books/about/%E7%BD%91%E7%BB%9C%E6%B8%B8%E6%88%8F%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF%E4%B8%8E%E5%AE%9E%E6%88%98.html?id=SzEZswEACAAJ",
  tcp: "https://www.rfc-editor.org/rfc/rfc9293",
  udp: "https://www.rfc-editor.org/rfc/rfc768",
  quic: "https://www.rfc-editor.org/rfc/rfc9000",
  tls: "https://www.rfc-editor.org/rfc/rfc8446",
  ice: "https://www.rfc-editor.org/rfc/rfc8445",
  stun: "https://www.rfc-editor.org/rfc/rfc8489",
  turn: "https://www.rfc-editor.org/rfc/rfc8656",
  oauthSecurity: "https://www.rfc-editor.org/rfc/rfc9700",
  opentelemetry: "https://opentelemetry.io/docs/specs/otel/",
  kubernetesHpa:
    "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
  postgresIsolation:
    "https://www.postgresql.org/docs/current/transaction-iso.html",
  scrumGuide: "https://scrumguides.org/scrum-guide.html",
};

const SOURCE_META = {
  chineseOutline: [
    "中文译本公开目录",
    "public-complete-translation-outline",
    "核对第0章至第8章、358个公开分节及中文标题，不把目录当正文",
  ],
  originalPublisher: [
    "技术评论社2011日文原版页",
    "official-original-publisher-edition-and-outline",
    "核对中嶋谦互、2011年3月24日、ISBN 9784774145808、原版章结构和历史样例环境",
  ],
  originalSupport: [
    "原版出版社支持与勘误页",
    "official-original-publisher-support",
    "核对作者样例入口、勘误记录和下载边界",
  ],
  authorRepo: [
    "作者样例仓库",
    "publisher-linked-author-sample",
    "核对第4章MMO、第5章MO样例以及逐资产许可证声明",
  ],
  authorSnapshot: [
    "作者样例固定提交bccbd43",
    "publisher-linked-fixed-snapshot",
    "把历史样例身份固定到提交bccbd43，不依赖可变分支",
  ],
  chineseEdition: [
    "Google Books中文译本书志",
    "bibliographic-record",
    "核对人民邮电出版社2014年、444页和ISBN 9787115349354",
  ],
  tcp: [
    "RFC 9293 TCP",
    "ietf-internet-standard",
    "核对当前TCP连接、字节流、状态和可靠传输规范",
  ],
  udp: [
    "RFC 768 UDP",
    "ietf-internet-standard",
    "核对UDP数据报、端口、长度与校验和的最小传输合同",
  ],
  quic: [
    "RFC 9000 QUIC",
    "ietf-internet-standard",
    "核对当前基于UDP的安全多路复用传输、连接与包号空间",
  ],
  tls: [
    "RFC 8446 TLS 1·3",
    "ietf-internet-standard",
    "核对当前传输加密、握手、密钥与对端认证边界",
  ],
  ice: [
    "RFC 8445 ICE",
    "ietf-proposed-standard",
    "核对NAT环境中候选地址收集、连通性检查和候选对选择",
  ],
  stun: [
    "RFC 8489 STUN",
    "ietf-proposed-standard",
    "核对NAT绑定发现与连通性检查协议边界",
  ],
  turn: [
    "RFC 8656 TURN",
    "ietf-proposed-standard",
    "核对无法直连时的中继分配、权限、通道和生命周期",
  ],
  oauthSecurity: [
    "RFC 9700 OAuth 2·0安全最佳实践",
    "ietf-best-current-practice",
    "核对授权流程、重定向、令牌与攻击防护边界",
  ],
  opentelemetry: [
    "OpenTelemetry规范",
    "project-primary-specification",
    "核对trace、metric、log、resource和上下文传播的数据模型",
  ],
  kubernetesHpa: [
    "Kubernetes HPA文档",
    "project-primary-documentation",
    "核对基于资源或自定义指标的副本伸缩控制环与限制",
  ],
  postgresIsolation: [
    "PostgreSQL事务隔离文档",
    "database-primary-documentation",
    "核对并发事务异常、隔离级别、序列化失败与重试责任",
  ],
  scrumGuide: [
    "Scrum Guide 2020",
    "framework-primary-guide",
    "核对当前Scrum角色、事件、工件和承诺边界",
  ],
};

const PATHS = {
  "gnc-unit-00": "01-foundations/gnc-00-quickstart-network-game-programming",
  "gnc-unit-01": "01-foundations/gnc-01-history-evolution",
  "gnc-unit-02": "01-foundations/gnc-02-what-is-online-game",
  "gnc-unit-03": "02-architecture/gnc-03-online-game-architecture",
  "gnc-unit-04": "03-practice/gnc-04-cs-mmo-practice",
  "gnc-unit-05": "03-practice/gnc-05-p2p-mo-practice",
  "gnc-unit-06": "04-operations/gnc-06-auxiliary-systems",
  "gnc-unit-07": "04-operations/gnc-07-operations-infrastructure",
  "gnc-unit-08": "05-team/gnc-08-development-organization",
};

const EXPECTED_TOPIC_COUNTS = {
  "gnc-unit-00": 35,
  "gnc-unit-01": 18,
  "gnc-unit-02": 36,
  "gnc-unit-03": 41,
  "gnc-unit-04": 105,
  "gnc-unit-05": 42,
  "gnc-unit-06": 30,
  "gnc-unit-07": 35,
  "gnc-unit-08": 16,
};

const SPECS = {
  "gnc-unit-00": {
    question: "套接字、事件循环、RPC与游戏循环怎样形成可重放的消息状态机？",
    scenario:
      "固定一个ECHO与移动指令协议，记录TCP或UDP端点、帧边界、序列号、事件循环、RPC解码和游戏tick",
    fault: "在字节流上假定一次read等于一条消息，或在丢包路径重复执行非幂等指令",
    invariant:
      "每条消息都有明确传输语义、帧边界、验证、顺序、幂等性、状态迁移和退出路径",
    artifact:
      "端点表、包schema、消息时间线、事件循环轨迹、重复与截断反例及恢复记录",
    focus: "网络层次、套接字、阻塞与事件驱动、多核、RPC、UDP和游戏任务循环",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "originalSupport",
      "authorRepo",
      "authorSnapshot",
      "tcp",
      "udp",
      "quic",
    ],
  },
  "gnc-unit-01": {
    question: "技术史、文化圈与商业化叙述怎样分开史料、作者时代和当前观察？",
    scenario:
      "为每个年代条目记录原版目录措辞、可核对时间来源、当时平台与网络约束，再单列2011年后的独立更新",
    fault: "把2011年对未来的提问改写成作者已经预言当前云、移动或电竞结果",
    invariant:
      "每个历史结论都绑定时间、来源与观察范围，译本措辞、原版观点和当前补充不得混写",
    artifact: "双版本年表、史料索引、作者时代边界、译名差分和当前补充清单",
    focus: "1950年前至2010年后技术史、文化与经济圈、商业化和开发者能力",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "chineseEdition",
      "originalSupport",
      "authorRepo",
    ],
  },
  "gnc-unit-02": {
    question: "物理、概念、商业与组织四个层面怎样落到可运营服务合同？",
    scenario:
      "用一个小型在线游戏列出玩家输入、共享状态、部署拓扑、更新、成本、攻击、停机、匹配与职责边界",
    fault:
      "只画服务器拓扑，却遗漏权威状态、付费授权、滥用响应、更新回滚和运营责任",
    invariant:
      "产品主张必须同时说明物理路径、共享状态、商业约束、人员责任和失败时的玩家影响",
    artifact: "四层合同、角色责任矩阵、威胁与停机清单、匹配输入输出和成本假设",
    focus: "四个层面、共享进展、商业运营、攻击、停机、匹配、人员组织与技术分类",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "tls",
      "oauthSecurity",
      "opentelemetry",
      "kubernetesHpa",
    ],
  },
  "gnc-unit-03": {
    question: "延迟、带宽、拓扑、权威状态和一致性怎样共同约束可玩性？",
    scenario:
      "固定tick、RTT、抖动、丢包与兴趣实体，比较权威服务器、反射中继和P2P输入交换的状态轨迹",
    fault: "用平均RTT代表尾时延，或让客户端直接提交不可验证的最终结果",
    invariant:
      "每个可玩性结论都绑定输入权威、状态所有者、tick、网络分布、带宽、分歧规则和安全边界",
    artifact: "拓扑图、权威矩阵、流量预算、分位时延、状态分歧与调停轨迹",
    focus:
      "响应、内存状态、延迟、带宽、安全、C/S、P2P、MO、MMO、同步与异步一致性",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "tcp",
      "udp",
      "quic",
      "tls",
      "ice",
      "turn",
    ],
  },
  "gnc-unit-04": {
    question: "C/S MMO从设计文档、容量估算、协议、数据库到长期运行怎样闭合？",
    scenario:
      "为一个最小角色移动服务固定并发、tick、兴趣范围、包格式、事务、分片和部署，再重放登录、移动、保存与故障",
    fault:
      "同时更改分片、协议、保存频率和数据库索引，再把吞吐变化归因于服务器数量",
    invariant:
      "容量、协议、状态、持久化、部署和恢复结论必须共享同一负载模型与版本身份",
    artifact:
      "五类设计工件、容量公式、协议向量、事务轨迹、负载原始样本和恢复演练",
    focus:
      "K Online、文档交付、分片与平行世界、资源估算、协议、数据库、样例实现和持续测量",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "originalSupport",
      "authorRepo",
      "authorSnapshot",
      "tcp",
      "tls",
      "postgresIsolation",
      "opentelemetry",
      "kubernetesHpa",
    ],
  },
  "gnc-unit-05": {
    question: "P2P MO的输入交换、竞争状态、NAT穿越与中继降级怎样验证？",
    scenario:
      "固定两名玩家的输入序列、主机选择和tick，依次重放直连、对称丢包、同时写、ICE失败与TURN中继",
    fault: "把STUN发现到公网映射等同于端到端可达，或让两个peer同时拥有同一资源",
    invariant:
      "候选地址、连通性、状态所有权、序列号、冲突裁决、主机迁移和中继生命周期必须显式",
    artifact:
      "候选对清单、ICE检查、输入日志、竞争反例、TURN降级、主机迁移与恢复轨迹",
    focus:
      "J Multiplayer、共享状态、竞争、SyncValue、NAT、ICE、STUN、TURN和中继折衷",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "originalSupport",
      "authorRepo",
      "authorSnapshot",
      "udp",
      "ice",
      "stun",
      "turn",
      "tls",
    ],
  },
  "gnc-unit-06": {
    question:
      "匹配、聊天、好友、排行榜、支付和运营工具怎样共享身份与授权边界？",
    scenario:
      "固定一个账户、两名玩家和一笔虚拟货币事务，贯穿大厅、聊天、好友、排行榜、更新与查询审计",
    fault: "只在客户端隐藏按钮，却允许旧令牌或重复请求再次扣款、加币或写入排名",
    invariant:
      "每个辅助系统都验证主体、权限、幂等键、状态版本、审计事件、隐私与撤销路径",
    artifact:
      "身份与权限矩阵、幂等事务、审计事件、滥用样本、更新回滚和查询工具边界",
    focus:
      "匹配、大厅、中继、聊天、邮件、好友、黑名单、更新、排行榜、付费、虚拟货币与过滤",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "oauthSecurity",
      "tls",
      "postgresIsolation",
      "opentelemetry",
    ],
  },
  "gnc-unit-07": {
    question: "容量、负荷测试、部署、监控和故障响应怎样成为持续运营证据？",
    scenario:
      "冻结客户端构建、区域、负载模型和SLO，按预热、阶梯负载、稳态、故障、恢复运行并保存原始遥测",
    fault: "把生成请求数当活跃玩家数，或压测时同时启用自动扩容却不记录副本变化",
    invariant:
      "容量结论绑定玩家行为、负载阶段、部署、资源、分位指标、扩容事件、故障和同负载恢复",
    artifact:
      "成本与容量表、负载模型、原始trace与metric、扩容轨迹、告警、故障时间线和复盘",
    focus:
      "成本、环境、负荷曲线、部署、监控、日志、负荷测试、上线、组群化与故障应对",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "opentelemetry",
      "kubernetesHpa",
      "tls",
      "postgresIsolation",
    ],
  },
  "gnc-unit-08": {
    question: "策划、持久化、共享范围、维护计划与团队交付怎样避免隐含责任？",
    scenario:
      "把一个跨版本技能拆成产品规则、协议、持久化迁移、运维变更和客户端发布，逐项指定所有者与验收证据",
    fault:
      "只按客户端、服务器分工，却没有人为跨端schema、数据迁移、回滚和玩家沟通负责",
    invariant:
      "每个共享规则和交付物都有单一责任、接口、完成定义、迁移、回滚、运维接收和知识移交",
    artifact:
      "责任矩阵、产品与协议决策记录、迁移计划、完成定义、发布清单、复盘和移交包",
    focus:
      "策划、持久化、玩家关系、共享范围、聊天、维护、代码规模、分工、技能、Scrum、环境与移交",
    sourceIds: [
      "chineseOutline",
      "originalPublisher",
      "scrumGuide",
      "opentelemetry",
      "postgresIsolation",
    ],
  },
};

const MAP_SPEC = {
  question: "怎样把9章367个正式坐标组织成传输、权威状态、容量与运营证据地图？",
  scenario:
    "选择一个正式坐标，沿时代身份、参与者、消息、权威状态、网络条件、可观察结果和恢复门定位依赖",
  fault:
    "把目录当正文、把作者历史样例当当前安全基线，或把2011原版与2014译本混成同一版本",
  invariant:
    "367个正式坐标都必须绑定来源边界、时代轨、拓扑、权威状态、单变量故障、原始工件和恢复条件",
  artifact: "367坐标覆盖表、九章依赖图、双版本边界、当前标准索引和证据键目录",
  focus: "9个章根与358个中文公开分节的全书传输、架构、实践、运营和团队路线",
  sourceIds: Object.keys(SOURCES),
};

const REVIEW_SPEC = {
  question:
    "能否从一次延迟、状态分歧、容量或运营事故反查正式坐标与最小证据链？",
  scenario:
    "用同一角色移动与虚拟货币流程贯穿传输、权威状态、P2P、持久化、辅助系统、压测和团队发布",
  fault:
    "同时改变协议、tick、负载、部署、数据schema和客户端构建，使首个分岔不可归因",
  invariant:
    "全书裁决必须由固定版本与负载、单变量故障、消息轨迹、原始遥测和同输入恢复共同支持",
  artifact: "全书证据索引、跨章消息图、367坐标答辩记录和发布复核表",
  focus: "九章跨章权威状态、流量预算、证伪实验、历史样例迁移与运营发布判断",
  sourceIds: Object.keys(SOURCES),
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function alphabeticIndex(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "learning-map"
      ? "MAP"
      : profile.role === "final-review"
        ? "REVIEW"
        : profile.id.replace("gnc-unit-", "UNIT");
  return `GNC-${scope}-${alphabeticIndex(index)}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const label = concept.replaceAll(".", "·");
  const lead = `${profile.title}把${label}`;
  if (/^第\d章/.test(concept))
    return `${lead}设为章级交付边界：公开目录限定主题，作者样例固定历史工件，当前RFC和项目规范限定新结论；章名本身不证明协议、容量或运营结果。`;
  if (/历史|年代|技术发展图|文化|经济圈|计算机诞生|市场扩大|商业化/.test(value))
    return `${lead}放入带来源的时间线，分开原版叙述、译本措辞和当前补充；2011年之后的问题必须以独立来源回答，不能改写成作者预言。`;
  if (/osi|层次结构|套接字api|通信链路|tcp|udp|echo/.test(value))
    return `${lead}映射为端点、传输协议、连接或数据报、字节边界、序列、错误和关闭状态；TCP字节流不能假设一次读取就是一条完整游戏消息。`;
  if (/阻塞|线程|非阻塞|事件驱动|select|多核|libevent|吞吐量/.test(value))
    return `${lead}绑定并发模型、就绪事件、每连接状态、队列上限、CPU亲和与背压；线程数或事件数不能替代同负载下的分位时延和资源测量。`;
  if (/rpc|通信库|二进制协议|数据包|协议|api|常量|时序图/.test(value))
    return `${lead}写成版本化schema、帧边界、序列号、幂等键、错误码、兼容规则和黄金向量；函数名存在不等于跨版本双方解释一致。`;
  if (/游戏编程|任务系统|游戏逻辑|每16毫秒|cpu|内存/.test(value))
    return `${lead}绑定tick、输入队列、确定性状态迁移、渲染分离和时间预算；16毫秒只是特定帧率的参考，不是所有服务器或客户端合同。`;
  if (/物理层面|物理构成|物理模式|拓扑|c\/s|p2p|星型|全网状|ad-hoc/.test(value))
    return `${lead}画出实际端点、NAT、区域、链路和故障域，并指定权威状态所有者；物理连通不自动保证身份、顺序、一致性或可玩性。`;
  if (/概念层面|游戏进行空间|游戏的进展|共享相同|同步方式|异步方式/.test(value))
    return `${lead}转换成输入、tick、权威快照、预测、确认、回滚和冲突裁决；“共享”允许短暂分歧时，必须声明最终收敛和玩家可见边界。`;
  if (/延迟|带宽|响应速度|服务器数量|成本估算|资源估算|负荷|吞吐/.test(value))
    return `${lead}绑定玩家行为模型、tick、兴趣实体、编码字节、协议附加、分位RTT和目标区域；公式只给量级，抓包与压测原始样本才裁决容量。`;
  if (/安全|攻击|非法|黑名单|敏感词|加密|认证|账户/.test(value))
    return `${lead}建立主体、凭据、服务器验证、授权、速率限制、审计、撤销和滥用响应链；加密保护链路，不会自动让客户端提交的游戏结果可信。`;
  if (/商业|收费|付费|虚拟货币|结算|收入/.test(value))
    return `${lead}绑定订单或事务ID、幂等键、授权、账本、补偿、审计和玩家申诉；重复请求、超时重试和部分成功必须有可重放反例。`;
  if (/测试玩家|不断更新|维护|停止|上线|故障|监控|日志|可视化/.test(value))
    return `${lead}写成发布身份、灰度、SLO、trace与metric、告警、停止条件、回滚和事件时间线；平均值和“进程存活”都不能独立证明玩家体验。`;
  if (/匹配|大厅|聊天|邮件|好友|玩家状态|语音|排行榜|新闻/.test(value))
    return `${lead}定义主体、隐私、可见范围、排序或匹配输入、滥用控制、状态版本和撤销；辅助系统与游戏权威状态之间只能通过版本化事件连接。`;
  if (/数据库|持久化|保存频率|表|kvs|隔离|排他|互斥|竞争|dupe|复制/.test(value))
    return `${lead}绑定主键、版本、事务隔离、唯一约束、重试与补偿，并用并发时间线验证；内存状态和持久化状态之间必须有明确提交与恢复点。`;
  if (/空间分割|实例法|平行世界|分片|可扩展|瓶颈|组群|扩大|缩小/.test(value))
    return `${lead}定义分片键、路由、容量单元、迁移、热点、故障域和重平衡；副本数变化不能掩盖会话粘性、权威迁移和数据库瓶颈。`;
  if (/nat|遍历|中继|stun|turn|ice/.test(value))
    return `${lead}拆成候选收集、连通性检查、候选对选择、权限、保活和中继降级；发现映射不等于对端可达，必须保存双端检查轨迹。`;
  if (/mmo|mo|k online|j multiplayer|syncvalue|共享内存/.test(value))
    return `${lead}回到玩家规模、权威所有者、输入或状态复制、加入退出、主机失效和恢复合同；作者样例只按固定提交与许可边界核对历史机制。`;
  if (
    /文档|交付物|结构图|关系图|设计图|资料|项目管理|scrum|移交|分工|团队|职责|技能/.test(
      value,
    )
  )
    return `${lead}映射为有所有者、版本、决策、接口、验收和接收方的工程工件；会议或文档数量不代表协议、迁移和运维责任已经闭合。`;
  if (/中间件|基础软件|vce|开发环境|实现语言|平台|插件/.test(value))
    return `${lead}记录产品、版本、平台、许可证、构建身份和替代方案；公有领域只覆盖作者声明的样例游戏本体，VCE与第三方依赖仍按各自条款处理。`;
  if (/小结|总结|知识|大类|核心|特点|基本原则/.test(value))
    return `${lead}压缩为参与者、输入、权威状态、消息、网络条件、观察、故障和恢复八列检查表；概括必须能反查原始坐标与工件。`;
  return `${lead}转换成时代身份、参与者、消息schema、权威状态、网络条件、预期观察、单变量故障和同输入恢复，并明确目录、作者样例和当前标准各自承担什么。`;
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  const chapterSlug = target.split("/").at(-1);
  const topologies = [
    {
      name: "权威服务器",
      owner: `${title}的服务端分片拥有可提交游戏状态，客户端只提交带序列号的输入意图`,
      input: "认证主体、客户端构建、会话、输入序号、客户端tick与动作参数",
      validation: `服务端验证身份、权限、速率、时序和游戏规则后执行：${spec.scenario}`,
      fanout:
        "按兴趣集合发送版本化快照或差分，记录确认、队列、编码字节和目标玩家",
      reconciliation:
        "客户端预测只改善呈现；服务端确认覆盖预测，回滚或平滑必须保留输入历史",
    },
    {
      name: "反射或中继拓扑",
      owner: `${title}明确区分只转发字节的中继与真正裁决状态的主机或服务`,
      input: "经过认证的消息、来源peer、房间、序列号、过期时间和路由目标",
      validation:
        "中继验证会话与速率但不伪造游戏裁决，权威节点验证规则并推进状态",
      fanout: "向房间或订阅集合转发，记录扇出、丢弃、背压、中继区域和费用",
      reconciliation:
        "中继故障切换不改变状态所有权；重连后按最后确认版本补快照或拒绝过期消息",
    },
    {
      name: "Peer输入交换",
      owner: `${title}为房主、确定性模拟或每类资源指定唯一调停者，不能让所有peer都默认权威`,
      input: "每peer输入、tick、序列号、确认位图、随机种子和候选地址对",
      validation: "先完成ICE连通与主体认证，再验证输入窗口、所有权和重复消息",
      fanout: "按拓扑交换输入或摘要，记录最慢peer、丢包、重发、主机和TURN中继",
      reconciliation:
        "缺失输入、迟到、主机退出和状态哈希分歧分别触发等待、预测、回滚、迁移或终止",
    },
  ];
  const traceBase = [
    `${title}基线1：冻结客户端与服务端构建、协议schema、区域、tick、玩家行为和成功条件。`,
    `${title}基线2：以已认证主体发送唯一序列输入，权威节点验证后只迁移一次状态。`,
    `${title}基线3：保存原始消息、确认、状态版本、抓包、trace、metric和玩家可见结果。`,
    `${title}基线4：停止会话并检查连接、队列、房间、对象、事务和指标标签均已回收。`,
  ];
  const traces = [
    {
      name: `${title}参考消息轨迹`,
      steps: traceBase,
      verdict: `${title}只有同时满足“${spec.invariant}”并交付${spec.artifact}，参考路径才成立。`,
    },
    {
      name: `${title}单一故障轨迹`,
      steps: traceBase.map(
        (step, index) =>
          `${title}故障${index + 1}：保持其余身份不变，只注入“${spec.fault}”；对照${step.replace(`${title}基线${index + 1}：`, "")}`,
      ),
      verdict: `${title}的首个分岔必须能由“${spec.fault}”解释，否则保留竞争性解释。`,
    },
    {
      name: `${title}同输入恢复轨迹`,
      steps: traceBase.map(
        (step, index) =>
          `${title}恢复${index + 1}：撤销唯一变量并从干净状态重放；重新核对${step.replace(`${title}基线${index + 1}：`, "")}`,
      ),
      verdict: `${title}必须恢复同一状态版本、消息轨迹和玩家观察，且没有连接、事务或资源残留。`,
    },
  ];
  const gates = [
    {
      label: "原版、译本与样例许可门",
      detail: `${title}分开2011原版、2014译本和作者样例固定提交；只有README明确声明的样例游戏本体源码属于公有领域。`,
    },
    {
      label: "参与者、拓扑与权威门",
      detail: `${title}列出客户端、服务器、peer、中继、数据库和运营者，并为每类可变状态指定唯一裁决责任。`,
    },
    {
      label: "消息schema与幂等门",
      detail: `${title}固定传输、TLS、帧边界、schema版本、序列号、确认、幂等键、错误和兼容向量。`,
    },
    {
      label: "tick、时延与故障分布门",
      detail: `${title}记录tick、区域、分位RTT、抖动、丢包、乱序、重连与“${spec.fault}”的唯一注入位置。`,
    },
    {
      label: "安全、滥用与持久化门",
      detail: `${title}验证主体、权限、速率、服务器规则、事务隔离、唯一约束、审计、撤销和隐私。`,
    },
    {
      label: "遥测、恢复与发布门",
      detail: `${title}保存原始抓包、trace、metric、日志、玩家结果和同输入恢复，交付${spec.artifact}并报告未知项。`,
    },
  ];
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    ...spec,
    topologies,
    traces,
    gates,
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为版本化参与者、消息、权威状态、网络条件和玩家观察
- 只注入“${profile.fault}”，定位${profile.title}相对参考消息轨迹的首个分岔
- 交付${profile.artifact}，分开2011原版、2014译本、作者样例与当前标准轨

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 原版、译本、样例许可与时代边界

${profile.title}以[技术评论社原版页](${ORIGINAL_PUBLISHER})核对中嶋谦互、2011年3月24日、ISBN 9784774145808及第0章至第8章结构；出版社页同时声明历史样例面向 Mac OS X Snow Leopard。${profile.title}以[中文译本公开目录](${CHINESE_OUTLINE})限定358个中文分节，以[Google Books书志](${SOURCES.chineseEdition})核对人民邮电出版社2014年、444页和ISBN 9787115349354。原书正文访问仍是outline-only，目录不能支持虚构段落、图表、参数或作者判断。

${profile.title}还使用出版社支持页链接的[作者样例仓库](${AUTHOR_REPO})，并把身份固定到[提交bccbd43](${AUTHOR_SNAPSHOT})。${profile.title}依据仓库README只把“样例游戏程序本体源码”视为公有领域；VCE知识产权属于其权利方且有专门使用条件，Boost、SDL、MySQL、Django等依赖也各有许可证。${profile.title}因此把总体访问级别记为authorized-sample，但不复制原书正文、图片或受限中间件，也不把整仓库误称为统一公有领域。

${profile.title}是中文独立教学重构，不是翻译、节译或原书替代品。${profile.title}的历史轨保留作者样例的Snow Leopard、gcc 4·2·1、Python 2·6·1、Boost 1·41·0、SDL 1·2·14、MySQL 5和Django 1·1·1身份；当前轨依据RFC与项目官方规范核对TCP、UDP、QUIC、TLS 1·3、ICE、STUN、TURN、事务隔离、可观察性和伸缩。${profile.title}不会把当前标准倒写成作者观点，也不会用2011样例充当当前安全或生产基线。

${profile.title}的网络实验可能开放端口、接收不可信包、触发大量连接、产生费用或写入持久化状态。${profile.title}必须使用隔离网络、非生产凭据、明确速率与费用上限、可丢弃数据、超时和清理脚本；不得对未授权公网目标压测，不得记录真实令牌或玩家隐私，容量公式也不能冒充抓包与负荷测试。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项深读

${profile.concepts
  .map((concept, index) => {
    const key = evidenceKey(index, profile);
    const label = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile)} ${profile.title}在这个坐标必须保存版本与参与者、消息schema、权威状态、网络条件、参考轨迹、唯一变量、首个分岔、原始工件和同输入恢复；一次连通、单个平均值、单轮压测或“没有报错”都不能独立证明主张。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作网络状态实验

${profile.title}先写预测：若只注入“${profile.fault}”，端点、消息、权威状态、确认、持久化、玩家画面或遥测哪一项最先变化？先选择坐标与拓扑，调整可复算流量和延迟参数，再逐消息重放参考、故障与恢复并闭合发布门。

<Stepper>
  <Step title="权威合同：选择坐标、时代与拓扑">
    <${profile.componentBase}AuthorityContractLab />
  </Step>
  <Step title="流量预算：估算状态复制与呈现等待">
    <${profile.componentBase}TrafficBudgetLab />
  </Step>
  <Step title="消息门：重放基线、故障、恢复与发布检查">
    <${profile.componentBase}TraceGateLab />
  </Step>
</Stepper>

${profile.title}的流量视图使用透明近似：单客户端下行为“tick × 兴趣实体 × 每实体编码 × 协议附加比例”，分片总下行为“单客户端下行 × 玩家数”。${profile.title}的呈现等待近似为“RTT/2 + 抖动缓冲 + 最坏一个tick等待”。${profile.title}不会把这些公式当实测，因为重传、突发、拥塞、加密实现、输入队列、服务器计算、兴趣共享和渲染都可能改变结果；原始抓包、服务端计数器和分位时延才是裁决依据。`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结客户端与服务端提交、协议schema、传输与TLS版本、区域、tick、玩家行为、随机种子、数据库、部署副本、观测配置和成功条件。
2. ${profile.title}用授权测试端点建立参考轨迹，保存${profile.artifact}；消息、状态或玩家观察不稳定就停止，不用故障结果解释网络机制。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个分岔、传播、竞争性解释、抓包、trace、metric、事务和费用停止条件。
4. ${profile.title}撤销受控变量，从干净连接与数据重放同一输入；消息、权威状态、玩家结果、遥测或资源残留没有一起恢复时，结论标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：目录和样例等于完整授权原书">
${profile.title}的中文目录只能限定358个分节；作者仓库也只有README点名的样例游戏程序本体源码属于公有领域。原书正文、图片、VCE和第三方依赖仍受各自权利与许可约束。
</Callout>

<Callout type="trap" title="${profile.title}误区二：2011样例就是当前生产基线">
${profile.title}保留Snow Leopard、旧编译器、Python、SDL和Django身份用于历史核对，但当前TCP、TLS、NAT、部署和安全结论必须依据当前标准与实测；迁移结论属于本站。
</Callout>

<Callout type="trap" title="${profile.title}误区三：连通、平均延迟或公式通过就代表可玩">
${profile.title}不以一次ping、平均RTT、估算带宽或进程存活裁决。必须固定玩家行为和版本，只改变一个条件，保存分位时延、丢包、状态分歧、事务、玩家观察与同输入恢复。
</Callout>`;
}

function exerciseEntries(profile) {
  if (profile.role === "chapter")
    return profile.concepts.map((concept, index) => ({ concept, index }));
  return profile.concepts
    .map((concept, index) => ({ concept, index }))
    .filter(({ concept }) => /^第\d章/.test(concept));
}

function exercises(profile) {
  const entries = exerciseEntries(profile);
  const coordinateQuestions = entries
    .map(({ concept, index }, exerciseIndex) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${exerciseIndex + 1}：${concept}**

为${profile.title}的稳定证据键 ${key} 设计参考消息轨迹、单变量故障、首个可观察分歧和恢复断言，并说明${label}在原版、译本、样例与当前标准轨的边界。

<Answer>
先为${profile.title}冻结${profile.scenario}所需的参与者、构建、schema、传输、tick、区域、玩家行为、持久化和停止条件；把 ${key} 映射到消息、权威状态和预期玩家观察，只注入“${profile.fault}”。首个分岔必须能由该变量解释，撤销后从干净连接和数据以同一输入重新满足“${profile.invariant}”；不可访问正文、非公有领域资产、未测平台和未覆盖网络分布保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = entries.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么要保留四层来源身份**

${profile.title}为什么不能把2011原版、2014译本目录、作者公有领域样例和当前RFC合并成一句“原书方案”？

<Answer>
${profile.title}的原版页回答作者时代与章结构，译本目录限定358个中文分节，作者样例只在README声明范围内提供历史可运行工件，当前RFC与项目规范回答今天的协议和运营要求。四者只能通过显式迁移连接；样例可读不扩大正文授权，当前更安全也不能改写作者观点。
</Answer>

**问题 ${start + 1}：什么时候必须缩小正确性或容量结论**

${profile.title}在哪些情况下只能报告局部观察或未知，不能发布“状态一致”“安全”“可扩展”或“恢复成功”？

<Answer>
${profile.title}缺少固定构建、schema、传输、TLS、区域、tick、玩家行为、网络分布、原始消息、分位指标、事务、部署事件或同输入恢复中的任一项，就只能报告局部观察。公式不是抓包，平均值隐藏尾部，动态检测只覆盖实际路径；这些限制必须随结果发布。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "权威状态",
      `${profile.title}中拥有验证输入并提交可被其他参与者接受之游戏状态的唯一责任`,
    ],
    [
      "tick",
      `${profile.title}读取输入、推进状态并产生复制结果的一次离散时间步及其版本`,
    ],
    [
      "兴趣集合",
      `${profile.title}对某客户端当前需要复制的实体、事件或字段的显式范围`,
    ],
    [
      "幂等键",
      `${profile.title}让同一逻辑请求在重试或重复投递时最多提交一次副作用的身份`,
    ],
    [
      "首个分岔",
      `${profile.title}的故障消息轨迹最早偏离参考消息、状态、事务或玩家观察的位置`,
    ],
    [
      "同输入恢复",
      `${profile.title}撤销唯一变量并从干净连接与数据恢复参考状态和原始工件的断言`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；它们指向真实消息、状态或工件，不生成成熟度、风险分、置信度或综合可玩性分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核状态链：目录给正式坐标，固定样例给历史工件，当前标准限定新事实，权威合同解释谁能改变状态，流量公式只暴露量级，消息轨迹定位首错，原始遥测与同输入恢复决定结论能否发布。${profile.title}最终交付${profile.artifact}，同时报告许可、版本、网络分布、未测平台、玩家影响和所有资源残留。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="中嶋谦互《网络游戏核心技术与实战》公开目录与作者样例"
  adaptedUrl="${CHINESE_OUTLINE}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    topologies: profile.topologies,
    traces: profile.traces,
    gates: profile.gates,
  };
  return `"use client";

import {
  GameNetworkEvidenceLab,
  type GameNetworkEvidenceModel,
} from "@/components/mdx/game-network-core-tech/v2/game-network-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies GameNetworkEvidenceModel;

export function ${profile.componentBase}AuthorityContractLab() {
  return <GameNetworkEvidenceLab model={model} view="authority-contract" />;
}

export function ${profile.componentBase}TrafficBudgetLab() {
  return <GameNetworkEvidenceLab model={model} view="traffic-budget" />;
}

export function ${profile.componentBase}TraceGateLab() {
  return <GameNetworkEvidenceLab model={model} view="trace-gate" />;
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
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
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
import {
  ${profile.componentBase}AuthorityContractLab,
  ${profile.componentBase}TrafficBudgetLab,
  ${profile.componentBase}TraceGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。${profile.title}先写权威合同和容量预测，再重放参考、单故障与恢复；只有守住“${profile.invariant}”并交付${profile.artifact}，目录标题、一次连通或性能数字才可能升级为可复核证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用权威合同、流量预算与消息门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: CHINESE_OUTLINE,
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
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);
if (manifest.units.length !== 9)
  throw new Error(`正式章数应为9，实际${manifest.units.length}`);

for (const unit of manifest.units) {
  const expected = EXPECTED_TOPIC_COUNTS[unit.id];
  if (!expected || !SPECS[unit.id] || !PATHS[unit.id])
    throw new Error(`缺少单元配置：${unit.id}`);
  if (conceptStrings(unit).length !== expected)
    throw new Error(
      `${unit.id}公开分节应为${expected}，实际${conceptStrings(unit).length}`,
    );
}

const allCoordinates = manifest.units.flatMap((unit) => [
  unit.title,
  ...conceptStrings(unit),
]);
const publicTopics = manifest.units.reduce(
  (count, unit) => count + conceptStrings(unit).length,
  0,
);
if (publicTopics !== 358)
  throw new Error(`公开分节应为358，实际${publicTopics}`);
if (allCoordinates.length !== 367)
  throw new Error(`正式坐标应为367，实际${allCoordinates.length}`);

const profiles = [
  enrich(
    "learningMap",
    "《网络游戏核心技术与实战》367坐标证据学习地图",
    "00-guide/gnc-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      unit.title,
      PATHS[unit.id],
      [unit.title, ...conceptStrings(unit)],
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《网络游戏核心技术与实战》367坐标全书证据总复习",
    "06-review/gnc-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 11)
  throw new Error(`页面数量应为11，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = SPECS[unit.id].sourceIds;
}
manifest.edition =
  "《网络游戏核心技术与实战》，中嶋谦互著，毛姝雯、田剑译，人民邮电出版社，2014年4月，444页，ISBN 9787115349354；日文原版2011年，ISBN 9784774145808";
manifest.sourceKind =
  "official-original-publisher-full-outline-plus-public-complete-translation-outline-plus-publisher-linked-public-domain-sample-fixed-snapshot-plus-current-primary-standards";
manifest.sourceUrl = CHINESE_OUTLINE;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== CHINESE_OUTLINE,
);
manifest.status =
  "verified-original-and-translation-outline-authorized-sample-independent-rewrite-current-standards-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为第0章至第8章的9个章根和中文译本公开目录358个分节，共367个正式坐标。技术评论社原版页核对2011原版、ISBN与章结构；得到目录限定中文分节，Google Books核对2014译本444页与ISBN。出版社支持页链接作者仓库，固定提交bccbd43；README只将样例游戏程序本体源码声明为公有领域，VCE及Boost、SDL等第三方资产仍按各自许可。历史样例环境为Snow Leopard、gcc 4.2.1、Python 2.6.1等，不作为当前生产基线；当前协议、安全、NAT、事务、可观察性和伸缩事实由RFC及项目官方规范独立核对。";
manifest.unitMappingEvidence =
  "quality/game-network-core-tech-v2-profiles.json";
manifest.factSourcePolicy =
  "原版出版社页和中文译本目录限定作者时代与正式范围；作者固定样例只在README明确许可范围内用于历史工件核对。当前TCP、UDP、QUIC、TLS、ICE、STUN、TURN、OAuth安全、事务隔离、可观察性、伸缩与Scrum事实由各自标准或项目官方资料核对，不能倒灌成原作者观点。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 367,
  coveredFormalNodes: 367,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 9,
  officialPublicSections: 358,
  formalNodes: 367,
  officialUnits: 9,
  learningMapPages: 1,
  chapterPages: 9,
  finalReviewPages: 1,
  totalPages: 11,
  interactiveViews: 33,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "authorized-sample",
      originalEdition: "2011, ISBN 9784774145808",
      chineseEdition: "2014, 444 pages, ISBN 9787115349354",
      authorSampleSnapshot: "bccbd43b6a149e08ec336f62c7c8b49701c65211",
      formalNodes: 367,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构11页、9章、358个公开分节、367个正式坐标与33个交互视图。");
