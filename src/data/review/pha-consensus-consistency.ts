import type { ReviewQuestion } from "./types";

export const phaConsensusConsistencyQuestions: ReviewQuestion[] = [
  {
    id: "pha-cc-1",
    chapter: "pha-consensus-consistency",
    level: 1,
    question: "Raft共识算法的三个角色和核心机制是什么？",
    answer: "三个角色：①Leader领导者——集群中唯一负责处理客户端写入请求的节点，负责日志复制和心跳维持。②Follower跟随者——被动接收Leader的日志复制请求和心跳，只读不写。③Candidate候选者——Follower在选举超时后转为Candidate，发起选举争抢Leader。核心机制：①领导者选举——Follower在选举超时（随机150-300ms）内未收到Leader心跳，转为Candidate，Term+1，向其他节点发起RequestVote。获得多数派选票则成为Leader，开始发送心跳。随机超时避免多个节点同时发起选举。②日志复制——Leader收到写入请求，先追加到本地日志（Uncommitted），并行复制到所有Follower。当多数派Follower确认后，Leader标记该日志为Committed，响应客户端，并在后续心跳中通知Follower提交。③安全性——Leader完整性（已Commit的日志在选出新Leader后必然存在）、状态机安全性（同一索引位置的日志值相同）。Raft将Paxos的复杂共识简化为「Leader管写、Follower管复制、多数派确认即Commit」的直观模型，是etcd/Consul等工业级系统的核心。",
    tags: ["Raft", "领导者选举", "日志复制", "共识"],
  },
  {
    id: "pha-cc-2",
    chapter: "pha-consensus-consistency",
    level: 2,
    question: "Paxos和Raft有什么区别？Gossip协议适用于什么场景？",
    answer: "Paxos vs Raft：①角色模型——Paxos定义Proposer（提议者）/Acceptor（接受者）/Learner（学习者）三个角色，Raft简化为Leader/Follower/Candidate。②理解难度——Paxos理论完备但极难理解和实现（论文描述抽象，涉及多轮prepare/accept），Raft专为可理解性设计（将共识分解为领导选举/日志复制/安全性三个子问题）。③实现复杂度——Paxos需要处理Proposer竞争和活锁（多个Proposer互相打断），Raft通过Leader单点写入避免了竞争。④工业应用——Paxos理论是基础但直接实现的少（Google Chubby是Multi-Paxos），Raft是工业主流（etcd/Consul/TiKV/RocketMQ Controller）。Gossip协议：与Paxos/Raft的强共识不同，Gossip是最终一致性协议，采用流行病传播模型——每个节点周期性随机选择几个节点交换状态信息，信息像病毒一样在集群中扩散。特点：去中心化（无Leader）、可扩展（O(logN)收敛）、容错好（节点失败不影响传播）、最终一致（不保证强一致）。适用场景：Cassandra/DynamoDB的副本同步、Consul的服务发现、Redis Cluster的集群状态传播。不适用：需要强一致的场景（分布式锁/配置管理应用Raft）。",
    tags: ["Paxos", "Raft", "Gossip", "强共识", "最终一致"],
  },
  {
    id: "pha-cc-3",
    chapter: "pha-consensus-consistency",
    level: 2,
    question: "请描述一致性模型从强到弱的谱系，并解释Quorum机制。",
    answer: "一致性模型谱系（由强到弱）：①线性一致性（Linearizability）——最强，所有操作看起来是在某时刻原子完成，保持真实时间顺序。读总能返回最新写入值。代价高（需全局协调），CP系统如etcd。②顺序一致性（Sequential Consistency）——所有节点看到操作顺序一致，但顺序不一定符合真实时间。比线性一致弱在不保实时序。③因果一致性（Causal Consistency）——有因果关系的事件保序，并发事件（无因果关系）顺序不限。比顺序一致弱在不保证全局有序。④读己写一致（Read-Your-Writes）——客户端能看到自己刚写入的值，但可能看不到其他客户端的最新写。⑤单调读一致（Monotonic Reads）——客户端不会读到比上次更旧的值。⑥最终一致性（Eventual Consistency）——最弱，无新写入时最终所有副本收敛，收敛期间可读旧值。AP系统如Cassandra。Quorum机制：N个副本中，写操作需W个副本确认，读操作需R个副本确认。当W+R大于N时（即W和R有交集），保证读到最新写入。常见配置：N=3, W=2, R=2（多数派读写，强一致）；N=3, W=1, R=1（最终一致，高性能）。Raft的Commit本质是Quorum：多数派（floor(N/2)+1）确认即Commit，保证已Commit的数据不会丢失（新Leader必然包含已Commit日志）。",
    tags: ["一致性模型", "线性一致", "最终一致", "Quorum", "多数派"],
  },
  {
    id: "pha-cc-4",
    chapter: "pha-consensus-consistency",
    level: 3,
    question: "在一个5节点Raft集群中，如果Leader和2个Follower同时宕机，集群还能工作吗？如何恢复？",
    answer: "5节点Raft集群，Quorum=3（floor(5/2)+1）。Leader+2个Follower宕机，剩余2个Follower存活。存活节点数（2）小于Quorum（3），因此：①无法选举新Leader——Candidate需获得多数派（3票）才能当选，只有2个存活节点最多获得2票，无法满足。②无法提交新日志——日志Commit需多数派确认，2个节点不满足。③集群不可用——无法处理写入请求（客户端请求会超时或拒绝）。但读请求可能仍可服务（取决于实现，有些系统允许Follower提供Stale Read）。恢复过程：①修复宕机节点——重启宕机的3个节点。②当至少1个宕机节点恢复（存活达3个）时，存活节点中选举超时的Follower转为Candidate发起选举。③Candidate获得3票（多数派）成为新Leader。④新Leader的日志可能不包含旧Leader宕机前未完全复制的日志——但Raft安全性保证：已Commit的日志必然在多数派节点上存在，因此新Leader必然包含所有已Commit日志。未Commit的日志可能丢失（这是Raft的设计——未Commit的数据不保证持久化）。⑤新Leader开始正常服务，Follower追上日志差异。关键洞察：Raft牺牲可用性保证一致性（CP系统），2/5存活时宁可不可用也不接受可能导致不一致的写入。如果要更高可用性，需增加节点数（如7节点容忍3个宕机）或改用AP协议。",
    tags: ["Raft", "Quorum", "故障恢复", "CP", "可用性"],
  },
];
