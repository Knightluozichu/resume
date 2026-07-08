import type { ReviewQuestion } from "./types";

export const mgpNatPunchThroughQuestions: ReviewQuestion[] = [
  {
    id: "mgp-nat-punch-through-1",
    chapter: "mgp-nat-punch-through",
    level: 2,
    question: "解释 NAT 的四种类型，哪种最难穿透？为什么？",
    answer:
      "四种类型：①Full Cone——同一内网端口映射到固定公网端口，任何外部主机都可达，最易穿透；②Restricted Cone——固定公网端口，但仅限联系过的外部 IP 可达，需先打洞；③Port Restricted Cone——同上且限制到 IP:端口，需双向打洞；④Symmetric NAT——为每个不同目标分配不同公网端口。Symmetric 最难穿透，因为通过 STUN 获取的映射地址只在到 STUN 的方向上有效，其他对端发到该端口的数据会被 NAT 当作陌生来源丢弃，打洞几乎不可能成功，通常需要 TURN 中继。",
    tags: ["NAT", "NAT类型", "Symmetric"],
  },
  {
    id: "mgp-nat-punch-through-2",
    chapter: "mgp-nat-punch-through",
    level: 3,
    question: "描述完整的 UDP 打洞流程，为什么需要 STUN 服务器？",
    answer:
      "流程：①A 和 B 各自向 STUN 服务器发包，STUN 观察到它们的公网映射地址（IP:端口）并返回；②A 和 B 通过 STUN 服务器交换彼此的公网地址；③A 向 B 的公网地址发包，在 A 的 NAT 上为 B 开洞（B 的 NAT 可能丢弃此包）；④B 向 A 的公网地址发包，在 B 的 NAT 上为 A 开洞（此时 A 的 NAT 已认识 B，包能通过）；⑤双方 NAT 都有了对方映射，P2P 通道建立。需要 STUN 因为：NAT 后的设备不知道自己的公网地址（NAT 做的映射对内网设备透明），必须通过一个公网第三方（STUN）来观察和告知。STUN 同时充当「介绍人」帮双方交换地址。",
    tags: ["UDP打洞", "STUN", "P2P"],
  },
  {
    id: "mgp-nat-punch-through-3",
    chapter: "mgp-nat-punch-through",
    level: 3,
    question: "STUN 和 TURN 各自的作用是什么？为什么生产环境需要两者组合？",
    answer:
      "STUN 帮助 NAT 后的客户端发现自己的公网映射地址，并充当介绍人帮对端交换地址。打洞成功后 STUN 不再参与数据转发，零带宽消耗。TURN 在打洞失败时（如对称型 NAT）充当中继，所有数据通过 TURN 服务器转发，保证连通性但延迟翻倍且消耗服务器带宽。生产环境需要两者组合因为：约 80-85% 的 NAT 可以打洞成功（用 STUN 即可直连），剩下 15-20%（主要是对称型 NAT）打洞失败必须回退到 TURN 中继。只用 STUN 会有 15-20% 的用户无法连接，只用 TURN 则所有流量都走中继，带宽成本不可接受。STUN 优先 + TURN 兜底是最优组合。",
    tags: ["STUN", "TURN", "生产环境"],
  },
  {
    id: "mgp-nat-punch-through-4",
    chapter: "mgp-nat-punch-through",
    level: 4,
    question: "两个对称型 NAT 后的客户端能否通过 UDP 打洞直连？如果不能，有什么替代方案？",
    answer:
      "两个对称型 NAT 后的客户端几乎无法通过标准 UDP 打洞直连。原因：对称型 NAT 为每个不同目标分配不同公网端口。A 通过 STUN 获得的地址只在 A→STUN 方向有效，B 发到该地址时 A 的 NAT 会分配一个新端口（因为目标是 B 不是 STUN），B 根本不知道这个新端口。同理 B 的 STUN 地址对 A 也不可用。双方都无法预测对方会为这个新连接分配哪个端口。替代方案：①TURN 中继——所有数据通过 TURN 服务器转发，保证连通性但增加延迟和带宽成本；②端口预测——某些对称型 NAT 的端口分配有规律（如递增），可以猜测下一个端口并提前打洞，但成功率不稳定；③对称型 NAT 检测——如果检测到对方是对称型 NAT，直接跳过打洞回退到 TURN。",
    tags: ["Symmetric NAT", "TURN", "端口预测"],
  },
];
