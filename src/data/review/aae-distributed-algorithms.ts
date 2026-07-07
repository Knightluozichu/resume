import type { ReviewQuestion } from "./types";

/** 分布式算法复习题 */
export const aaeDistributedAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "aae-distributed-algorithms-1",
    chapter: "aae-distributed-algorithms",
    level: 1,
    question:
      "CAP 定理的内容是什么？三个性质分别指什么？为什么在异步网络中三者不能同时满足？",
    answer:
      "CAP 定理：\n\n在一个异步网络中的分布式系统里，一致性（Consistency）、可用性（Availability）、分区容错性（Partition Tolerance）三者不可同时满足，最多选两个。\n\n三个性质：\n\n1. 一致性（Consistency）：\n所有节点在同一时刻看到相同的数据。读取操作返回最新写入的值或报错。相当于线性一致性（linearizability）。\n\n2. 可用性（Availability）：\n每个非故障节点的请求都能在有限时间内收到非错误响应（不保证是最新数据）。\n\n3. 分区容错性（Partition Tolerance）：\n当网络分区发生（节点间消息丢失或延迟）时，系统仍能继续运作。\n\n为什么三者不能同时满足（直觉证明）：\n\n假设系统有节点 A 和 B，网络分区导致 A 和 B 无法通信。\n\n- 如果要保持可用性（A 和 C）：客户端向 A 写入数据 v1，A 必须返回成功（可用性）。但 A 无法把 v1 同步给 B（分区）。此时客户端向 B 读取，B 返回旧值 v0（不一致）。矛盾。\n\n- 如果要保持一致性（C 和 P）：A 写入 v1 后，必须等 B 确认才能返回成功。但 A 和 B 无法通信（分区），A 只能一直等待或返回错误。违反可用性。矛盾。\n\n所以在网络分区发生时，必须在 C 和 A 之间选择。\n\n实际工程选择（P 是必选）：\n\n在真实分布式系统中，网络分区不可避免（交换机故障、网线断开），所以 P 必须保证。实际选择是在 C 和 A 之间权衡：\n\n- CP（选一致性 + 分区容错）：分区时拒绝服务（不可用），保证数据一致。如 ZooKeeper、etcd、HBase。适合金融交易、配置管理。\n- AP（选可用性 + 分区容错）：分区时各节点继续服务（可能返回旧数据），分区恢复后同步修复。如 Cassandra、DynamoDB、Eureka。适合社交网络、电商购物车。\n\n注意事项：\n- CAP 的 C 是强一致性（线性一致性），不是最终一致性。很多 AP 系统提供最终一致性——分区恢复后数据最终趋同。\n- CAP 是「分区发生时」的取舍。没有分区时，C 和 A 可以同时满足。\n- PACELC 定理是 CAP 的扩展：无分区（P）时，也要在延迟（L）和一致性（C）之间选择。",
    tags: ["CAP定理", "一致性", "可用性", "分区容错", "CP", "AP"],
  },
  {
    id: "aae-distributed-algorithms-2",
    chapter: "aae-distributed-algorithms",
    level: 2,
    question:
      "Paxos 和 Raft 各自解决什么问题？Raft 相比 Paxos 的设计改进是什么？为什么 Raft 更容易理解和实现？",
    answer:
      "Paxos 和 Raft 解决的共同问题：\n\n分布式共识（Consensus）——在可能故障（崩溃恢复、消息丢失、乱序）的异步网络中，多个节点对单个值达成一致。\n\n共识是分布式系统的基石：领导者选举、日志复制、分布式锁、状态机复制都依赖共识。\n\nPaxos（Lamport, 1998）：\n\n核心角色：\n- Proposer：提出提案（value）。\n- Acceptor：对提案投票。\n- Learner：学习已决定的值。\n\n两阶段协议：\n1. Prepare 阶段：Proposer 发送 Prepare(n) 给多数 Acceptor，Acceptor 承诺不再接受编号 < n 的提案。\n2. Accept 阶段：Proposer 发送 Accept(n, value)，多数 Acceptor 接受后值被选定。\n\n保证：多数派交集保证至多一个值被选定。\n\nPaxos 的问题：\n- 难以理解：角色分离、两阶段交互、编号管理复杂。\n- 难以工程化：Multi-Paxos（多值共识）的细节（日志管理、领导者优化、成员变更）论文未充分说明，实现者需大量补充设计。\n- 缺少标准实现：每个 Paxos 实现都不同（Chubby、Spanner、ZooKeeper 的 ZAB 都各有变体）。\n\nRaft（Ongaro & Ousterhout, 2014）：\n\n设计目标：可理解性（Understandability）——在正确性不亚于 Paxos 的前提下，让算法更易理解和实现。\n\n核心改进：\n\n1. 问题分解：\nRaft 把共识拆为三个子问题，各自独立：\n- 领导者选举（Leader Election）：选出一个 Leader。\n- 日志复制（Log Replication）：Leader 接收请求，复制到 Follower。\n- 安全性（Safety）：保证日志一致性和状态机安全性。\nPaxos 把这些混在一起，Raft 显式分离。\n\n2. 强领导者模型：\nRaft 所有数据流通过 Leader → Follower（单向）。Leader 处理所有客户端请求、管理日志复制。\nPaxos 允许多 Proposer 并发提案（竞争激烈时效率低）。\n\n3. 日志结构简化：\nRaft 用「日志索引 + 任期号（term）」定位日志条目。Leader 的日志是权威的，Follower 复制 Leader 的日志。\nPaxos 的日志管理更复杂，需要处理日志空洞。\n\n4. 随机化选举超时：\nRaft 用随机化的选举超时避免多个 Follower 同时竞选 Leader（减少冲突）。\nPaxos 的领导者选举是额外的、非协议核心部分。\n\n5. 成员变更：\nRaft 提供了明确的联合共识（Joint Consensus）方法处理集群成员变更。\nMulti-Paxos 的成员变更需要实现者自行设计。\n\n为什么 Raft 更容易理解和实现：\n- 结构清晰：三个子问题各自有明确的算法和不变量，可以分别理解和测试。\n- 状态机简单：节点状态只有三个（Follower、Candidate、Leader），转换条件明确。\n- 日志一致性直观：Leader 的日志就是真相，Follower 只需同步。\n- 论文提供了完整的工程细节（快照、日志压缩、成员变更），实现者无需自行补充。\n- 有大量开源参考实现（etcd、Consul、TiKV），形成生态。\n\n工程现状：\n- Paxos 系列：Google Chubby、Spanner、ZooKeeper ZAB（Paxos 变体）。\n- Raft 系列：etcd、Consul、TiKV、CockroachDB。Raft 已成为新系统的主流选择。",
    tags: ["Paxos", "Raft", "共识算法", "领导者选举", "日志复制", "可理解性"],
  },
  {
    id: "aae-distributed-algorithms-3",
    chapter: "aae-distributed-algorithms",
    level: 3,
    question:
      "Gossip 协议（八卦协议）的工作原理是什么？它的收敛速度如何？在什么场景下适合用 Gossip 而非中心化广播？",
    answer:
      "Gossip 协议工作原理：\n\nGossip（也叫 Epidemic Protocol，流行病协议）模拟谣言传播：每个节点周期性随机选几个邻居，把信息传给它们；收到信息的节点再传给它们的邻居。信息像流行病一样指数级扩散。\n\n基本过程（Push 模型）：\n1. 每个节点维护一份本地状态（如集群成员列表、配置信息）。\n2. 每个周期（如 1 秒），节点随机选 k 个邻居（fanout = k，通常 3~5）。\n3. 把自己知道的状态（或更新）发送给选中的邻居。\n4. 邻居收到后更新本地状态，下一周期继续传播。\n5. 经过 O(log n) 轮后，几乎所有节点都收到信息。\n\n变体：\n- Push：有信息的节点主动推送。\n- Pull：无信息的节点主动向邻居拉取。\n- Push-Pull：双向交换，收敛最快。\n\n收敛速度分析：\n\n每轮每个有信息的节点感染 k 个新节点。传播模型类似分支过程：\n- 第 t 轮感染节点数 ≈ k^t（初期指数增长）。\n- 当大部分节点已感染后，随机选到已感染节点的概率增大，增长放缓。\n- 用流行病模型分析：经过 O(log_k n) 轮后，感染比例趋近 1。\n- 典型：n = 10000, k = 3 → 约 8~10 轮（8~10 秒，若每轮 1 秒）即可传播到 99% 节点。\n\n收敛保证：\n- 最终一致性：Gossip 保证最终所有节点收敛到相同状态，但不保证何时收敛。\n- 残余未感染概率：约 n^(-k+1)（k=3 时约 1/n²），极低但非零。\n\nGossip vs 中心化广播：\n\n| 维度         | Gossip              | 中心化广播           |\n|-------------|---------------------|---------------------|\n| 通信复杂度   | O(轮数 × n × k)     | O(n)（Leader 发给所有）|\n| Leader 依赖  | 无                  | 有（Leader 是瓶颈）   |\n| 容错性       | 极高（节点随机选邻居）| 低（Leader 故障则停） |\n| 收敛延迟     | O(log n) 轮         | O(1)（一轮直达）     |\n| 负载均衡     | 均匀（每个节点发 k 条）| Leader 负载高         |\n| 一致性       | 最终一致             | 强一致（Leader 顺序推送）|\n\n适合 Gossip 的场景：\n\n1. 大规模集群成员管理（如 Cassandra、Consul）：\n节点数百上千，Leader 广播开销大且 Leader 是单点。Gossip 让每个节点只需与少量邻居通信即可维护全局视图。\n\n2. 失败检测（Failure Detection）：\n节点通过 Gossip 传播心跳和怀疑标记。比中心化心跳更健壮——不存在 Leader 故障导致全局检测停滞。\n\n3. 反熵（Anti-Entropy）修复：\n定期 Gossip 对比节点状态差异并修复，保证最终一致性。Cassandra 用 Merkle Tree + Gossip 做数据修复。\n\n4. 拓扑发现（如 P2P 网络）：\n新节点加入后通过 Gossip 发现邻居，构建覆盖网络。无需中心化的目录服务。\n\n不适合 Gossip 的场景：\n- 强一致性要求：Gossip 是最终一致，不能用于需要线性一致性的操作（如分布式锁、事务提交）。这些需要 Paxos/Raft。\n- 低延迟通知：Gossip 的 O(log n) 轮延迟可能不满足毫秒级通知需求。\n- 小集群：节点数 < 10 时，Gossip 的开销不比中心化广播少多少，不如直接用 Leader 广播。\n\n典型系统：\n- Cassandra：Gossip 做集群成员管理和失败检测。\n- Consul：Gossip（SWIM 协议）做成员管理 + Raft 做强一致性。\n- Redis Cluster：Gossip 做节点发现和槽位传播。",
    tags: ["Gossip", "流行病协议", "收敛速度", "最终一致性", "失败检测", "应用"],
  },
  {
    id: "aae-distributed-algorithms-4",
    chapter: "aae-distributed-algorithms",
    level: 4,
    question:
      "Lamport 时钟和向量时钟分别解决什么问题？为什么有了 Lamport 时钟还需要向量时钟？向量时钟如何检测事件的因果关系？",
    answer:
      "Lamport 时钟：\n\n解决「没有全局时钟时如何给事件排序」的问题。分布式系统中节点没有同步的全局时钟，无法直接用物理时间比较事件先后。Lamport 时钟提供逻辑时间戳。\n\n规则：\n- 每个节点维护一个计数器 C_i。\n- 本地事件：C_i = C_i + 1。\n- 发送消息：C_i = C_i + 1，消息附带时间戳 C_i。\n- 接收消息：C_i = max(C_i, C_msg) + 1。\n\n性质：\n- 若事件 a 因果先于 b（a → b），则 C(a) < C(b)。\n- 但逆不成立：C(a) < C(b) 不一定意味着 a → b（可能是并发事件）。\n- Lamport 时钟保证全序（total order）：结合节点 ID 可对任意两个事件排序，但这个排序对并发事件是人为的、无因果依据的。\n\n为什么需要向量时钟：\n\nLamport 时钟的缺陷：无法区分「因果先后」和「并发」。\n- C(a) < C(b) 时，a 可能因果先于 b，也可能与 b 并发。\n- 在分布式系统中，区分因果和并发非常重要——例如检测写冲突（两个并发写不能简单按时间戳覆盖）。\n\n向量时钟（Mattern / Fidge）：\n\n每个节点维护一个向量 V_i = [v_1, v_2, ..., v_n]，v_j 表示节点 i 知道的节点 j 的最新事件数。\n\n规则：\n- 本地事件：V_i[i] = V_i[i] + 1。\n- 发送消息：V_i[i] = V_i[i] + 1，消息附带向量 V_i 的副本。\n- 接收消息：V_i[j] = max(V_i[j], V_msg[j]) 对所有 j；V_i[i] = V_i[i] + 1。\n\n因果关系判定：\n- V(a) < V(b)（逐分量比较，所有分量 ≤ 且至少一个 <）：a 因果先于 b（a → b）。\n- V(a) 与 V(b) 不可比较（某些分量 a 大、某些 b 大）：a 和 b 并发（a ‖ b）。\n- V(a) = V(b)：a 和 b 是同一事件。\n\n向量时钟如何检测因果关系——例子：\n\n3 个节点 A、B、C，初始 V = [0, 0, 0]。\n\n1. A 本地事件 e1：V_A = [1, 0, 0]\n2. A 发消息给 B（事件 e2）：V_A = [2, 0, 0]，消息携带 [2, 0, 0]\n3. B 收到 A 的消息（事件 e3）：V_B = [max(0,2), 0+1, 0] = [2, 1, 0]\n4. C 本地事件 e4：V_C = [0, 0, 1]\n5. B 本地事件 e5：V_B = [2, 2, 0]\n\n分析：\n- e1 → e2 → e3 → e5（因果链，向量递增）\n- e4 与 e1/e2/e3/e5 并发（V_C = [0,0,1] 与 V_A/V_B 不可比较——A 的分量 C 更大，但 B 的分量 A 更大）\n- e4 与 e5 并发（V(e4) = [0,0,1], V(e5) = [2,2,0]，不可比较）→ 检测到写冲突\n\n应用场景：\n\n1. 分布式数据库冲突检测：\nDynamoDB、Riak 用向量时钟检测同一 key 的并发写冲突。如果两个写操作的向量时钟不可比较，说明是并发写，需要冲突解决（最后写入者胜、应用层合并、或返回客户端让用户选择）。\n\n2. 协同编辑（CRDT 的基础）：\n向量时钟识别操作之间的因果关系，确保因果有序的应用，并发操作用 CRDT 自动合并。\n\n3. 调试分布式系统：\n用向量时钟重建事件的因果链，定位「哪个事件导致了另一个事件」。\n\n向量时钟的代价：\n- 空间：O(n) 每个事件（n 为节点数），大集群中开销显著。优化：用版本向量、Dotted Version Vectors 减小体积。\n- 通信：每条消息携带 O(n) 向量，增加消息体积。\n\nLamport 时钟 vs 向量时钟总结：\n\n| 维度       | Lamport 时钟       | 向量时钟             |\n|-----------|--------------------|-----------------------|\n| 时间戳大小 | O(1)（标量）       | O(n)（向量）           |\n| 因果检测   | 单向（a→b 则 C_a<C_b）| 双向（可判定并发）     |\n| 全序       | 是（人为全序）      | 否（偏序）             |\n| 适用场景   | 互斥、全序日志      | 冲突检测、因果关系分析   |\n\n一句话：Lamport 时钟用 O(1) 空间给出「因果关系的必要条件」（a→b 则 C_a<C_b），但无法判定并发；向量时钟用 O(n) 空间给出「因果关系的充分必要条件」，能精确区分因果先后与并发，代价是更大的空间和通信开销。",
    tags: ["综合", "Lamport时钟", "向量时钟", "因果关系", "并发检测", "冲突解决"],
  },
];
