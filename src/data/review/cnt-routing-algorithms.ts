import type { ReviewQuestion } from "./types";

export const cntRoutingAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "cnt-ra-1",
    chapter: "cnt-routing-algorithms",
    level: 1,
    question: `链路状态算法和距离向量算法的核心区别是什么？`,
    answer: `核心区别：链路状态（LS）是全局算法——每个节点通过洪泛LSA获得完整网络拓扑，独立运行Dijkstra算法计算最短路径，复杂度O(n^2)。距离向量（DV）是分布式算法——每个节点仅维护到各目的的距离向量，通过Bellman-Ford方程 D_x(y)=min{c(x,v)+D_v(y)} 与邻居交换信息迭代更新。LS优点：收敛快、无计数到无穷；缺点：LSA洪泛开销大、需存储全拓扑。DV优点：消息开销小、存储低；缺点：收敛慢、计数到无穷问题。`,
    tags: ["链路状态", "距离向量", "Dijkstra", "Bellman-Ford"],
  },
  {
    id: "cnt-ra-2",
    chapter: "cnt-routing-algorithms",
    level: 2,
    question: `距离向量算法的计数到无穷问题是什么？毒性逆转如何解决？`,
    answer: `计数到无穷问题：当链路开销增加时，节点通过邻居的距离向量更新自己的距离，但邻居的距离可能依赖该节点本身（路由环路），导致距离值需要很多轮迭代才能收敛到正确值。例如A←1→B←1→C，C到A开销从2变为50，B告诉C「我到A开销为1」（但B到A经过C），C更新为1+1=2而非50，反复迭代才能收敛到B=50, C=51。毒性逆转解决：B告诉C「我到A的距离=∞」（因为B到A经过C），这样C不会通过B到达A，避免了环路。但毒性逆转只能解决两节点环路，多节点环路仍需水平分割等机制。`,
    tags: ["距离向量", "计数到无穷", "毒性逆转", "路由环路"],
  },
  {
    id: "cnt-ra-3",
    chapter: "cnt-routing-algorithms",
    level: 2,
    question: `BGP为什么使用策略路由而非最短路径？AS-PATH有什么作用？`,
    answer: `BGP连接不同自治系统（不同ISP/企业），路由选择必须考虑商业策略：优先走客户链路（有收入）而非提供商链路（有成本）、不经过竞争对手网络、遵守合同协议。最短路径无法表达这些策略需求。AS-PATH记录路由经过的AS序列，有两个关键作用：①环路检测——如果AS-PATH中包含自己的AS号，说明路由环路，拒绝该路由 ②策略控制——可根据AS-PATH中的AS关系（客户/提供商/对等）决定是否接受路由和设置LOCAL-PREF。BGP是路径向量协议，使互联网能扩展到全球规模。`,
    tags: ["BGP", "策略路由", "AS-PATH", "自治系统"],
  },
  {
    id: "cnt-ra-4",
    chapter: "cnt-routing-algorithms",
    level: 3,
    question: `OSPF的分层区域设计有什么好处？SDN如何改变传统网络控制平面？`,
    answer: `OSPF分层区域设计的好处：①可扩展性——区域内的链路状态变化只在区域内洪泛，不会扩散到全网，减少LSA开销 ②层次化路由——区域间路由先到骨干区域（区域0）再到目的区域，简化路由计算 ③管理灵活——不同区域可由不同管理员管理。SDN改变传统控制平面的方式：将数据平面（转发）和控制平面（路由计算）物理分离——SDN交换机仅根据流表转发，集中式控制器通过OpenFlow下发流表。优势：全局视角优化路由、灵活编程网络行为、快速部署新功能（无需升级交换机）。SDN将网络从「分布式硬件设备」转变为「集中式软件控制」。`,
    tags: ["OSPF", "分层路由", "SDN", "OpenFlow"],
  },
];
