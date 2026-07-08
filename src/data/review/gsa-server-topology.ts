import type { ReviewQuestion } from "./types";

export const gsaServerTopologyQuestions: ReviewQuestion[] = [
  {
    id: "gsa-server-topology-1",
    chapter: "gsa-server-topology",
    level: 2,
    question: "网关层、逻辑层、数据层各自的核心职责是什么？为什么不能合并？",
    answer:
      "网关层负责连接管理、鉴权、负载均衡（无状态、可水平扩容、专注网络 I/O）；逻辑层负责业务计算（有状态、按场景分服、可按需扩容）；数据层负责持久化与缓存（强一致与高吞吐的权衡）。不能合并的原因是「关注点冲突」：网关追求低延迟转发，逻辑追求正确计算，数据追求可靠存储。合并后一处慢全盘崩——DB 慢查询会卡住逻辑线程，逻辑卡住会撑爆连接队列。分层让每层独立优化、独立扩容、独立故障隔离。",
    tags: ["三层架构", "职责划分"],
  },
  {
    id: "gsa-server-topology-2",
    chapter: "gsa-server-topology",
    level: 2,
    question: "网关层为什么必须无状态？有状态会带来什么后果？",
    answer:
      "网关层无状态才能随时加机器分担连接——任何一台网关挂了，客户端重连到另一台即可，session 从 Redis 取回。有状态的网关会导致「连接粘性」：某玩家只能由特定网关处理，该网关挂了玩家必掉线，无法平滑迁移。且扩容时新机器拿不到旧 session，旧连接无法迁移。无状态让网关成为「可替换的转发管道」，这是横向扩容的前提。session 状态交给 Redis 集群统一存储，网关只做转发。",
    tags: ["网关层", "无状态", "横向扩容"],
  },
  {
    id: "gsa-server-topology-3",
    chapter: "gsa-server-topology",
    level: 3,
    question: "逻辑层「按场景分服」与「按功能微服务」两种拆法的取舍？",
    answer:
      "按场景分服：把战斗、聊天、匹配分成独立进程，进程隔离故障不扩散，运维简单。缺点是单个场景服内功能耦合，改一处要整体发版。按功能微服务：把背包、任务、社交细粒度拆分，灵活可独立部署扩容。缺点是服务间调用链长、运维复杂、分布式事务难。中小项目用前者足够；大型 MMORPG 混用——核心战斗按场景分服保证低延迟，辅助功能（背包、社交）按微服务拆分便于迭代。选型看团队规模与迭代速度。",
    tags: ["逻辑层", "微服务", "分服"],
  },
  {
    id: "gsa-server-topology-4",
    chapter: "gsa-server-topology",
    level: 3,
    question: "为什么网关层不能直接查数据库做鉴权？正确做法是什么？",
    answer:
      "网关层的本职是转发，不是存储。每次请求都查库会让网关层被 DB 拖死——DB 慢查询会阻塞网关的转发线程，整个集群连接吞吐崩塌。网关层铁律是「绝不做任何阻塞 I/O，绝不持有状态」。正确做法：session/token 放 Redis，网关层只查缓存（毫秒级）；或用 JWT 风格的无状态 token——签发时带过期时间与签名，网关本地验签无需任何外部查询。鉴权状态交给 Redis 集群，网关专注转发。",
    tags: ["网关层", "鉴权", "阻塞 I/O"],
  },
];
