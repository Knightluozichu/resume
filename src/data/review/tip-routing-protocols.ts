import { ReviewQuestion } from "./types";

export const tipRoutingProtocolsQuestions: ReviewQuestion[] = [
  {
    id: "tip-routing-protocols-1",
    chapter: "tip-routing-protocols",
    level: 2,
    question: `距离矢量路由协议（如 RIP）和链路状态路由协议（如 OSPF）的核心区别是什么？`,
    answer:
      `距离矢量（RIP）：每个路由器只知道自己到各目的网络的距离（跳数）和下一跳方向，周期性将整个路由表发给邻居，用 Bellman-Ford 算法。问题：计数到无穷、收敛慢。链路状态（OSPF）：每个路由器了解整个网络的拓扑（通过 LSA 泛洪），各自用 Dijkstra 算法独立计算最短路径树。区别：距离矢量「听说」路由，链路状态「看见」全图。OSPF 收敛快、可扩展到大型网络，但开销更大。`,
    tags: ["路由协议", "RIP", "OSPF", "距离矢量", "链路状态"],
  },
  {
    id: "tip-routing-protocols-2",
    chapter: "tip-routing-protocols",
    level: 2,
    question: `RIP 协议的跳数限制是多少？为什么有这个限制？如何缓解计数到无穷问题？`,
    answer:
      `RIP 跳数最大 15，16 跳视为不可达。限制原因：RIP 用跳数作为度量，跳数过大会导致收敛极慢且容易产生路由环路。计数到无穷问题：当某网络不可达时，路由器间互相学习过时路由，距离不断累加直到 16 才收敛。缓解方法：①水平分割——不将从某邻居学到的路由再发回给该邻居 ②毒化逆转——将从某邻居学到的路由发回时设为不可达（16跳）③触发更新——拓扑变化时立即发送更新，不等周期 ④保持计时器——收到不可达信息后暂时不接收该路由的更新。`,
    tags: ["RIP", "跳数限制", "计数到无穷", "水平分割"],
  },
  {
    id: "tip-routing-protocols-3",
    chapter: "tip-routing-protocols",
    level: 2,
    question: `OSPF 的工作原理是什么？为什么需要区域划分？`,
    answer:
      `OSPF 工作原理：①路由器发现邻居，建立邻接关系 ②泛洪 LSA（链路状态通告）到整个区域 ③所有路由器收到全部 LSA 后构建相同的 LSDB（链路状态数据库）④各自用 Dijkstra 算法计算最短路径树，生成路由表。区域划分原因：①减少 LSA 泛洪范围，降低带宽和 CPU 开销 ②缩小 LSDB 规模，降低 Dijkstra 计算复杂度 ③区域内部拓扑变化不影响其他区域。所有区域必须连接到骨干区域（Area 0），区域间路由通过骨干区域转发。`,
    tags: ["OSPF", "Dijkstra", "LSA", "区域划分"],
  },
  {
    id: "tip-routing-protocols-4",
    chapter: "tip-routing-protocols",
    level: 1,
    question: `BGP 协议的作用是什么？它与 IGP 有什么区别？`,
    answer:
      `BGP（边界网关协议）是 AS（自治系统）间的路由协议，负责在不同 AS 之间交换可达性信息，是互联网骨干的核心路由协议。与 IGP 的区别：①范围——IGP 在 AS 内部运行（RIP/OSPF），BGP 在 AS 之间运行 ②度量——IGP 用跳数/带宽等单一度量，BGP 用路径属性（AS_PATH、LOCAL_PREF、MED 等）做策略路由 ③传输——IGP 直接用 IP 封装，BGP 用 TCP（端口 179）可靠传输 ④规模——IGP 适合中小型网络，BGP 支撑全球互联网路由表。BGP-4 支持 CIDR，是当前使用的版本。`,
    tags: ["BGP", "EGP", "AS", "路径矢量"],
  },
];
