import type { ReviewQuestion } from "./types";

export const rdiReplicationClusterQuestions: ReviewQuestion[] = [
  {
    id: "rdi-rc-1",
    chapter: "rdi-replication-cluster",
    level: 2,
    question: "PSYNC的完整重同步和部分重同步分别在什么情况下触发？核心组件是什么？",
    answer: "完整重同步触发：①首次连接（无runid记录）；②runid不匹配（主重启或切换）；③offset不在backlog范围内（断线过久）。部分重同步触发：runid匹配且offset在backlog范围内。三个核心组件：①服务器运行ID(runid)——40字节唯一标识从服务器保存主服务器runid PSYNC时验证身份；②复制偏移量(offset)——主从各自维护累积偏移量相同则数据一致；③复制积压缓冲区(backlog)——固定大小环形队列(默认1MB)存储最近写命令。backlog大小建议：断线预计秒数×每秒写入字节数×2。",
    tags: ["PSYNC", "部分重同步", "复制偏移量", "backlog"],
  },
  {
    id: "rdi-rc-2",
    chapter: "rdi-replication-cluster",
    level: 2,
    question: "Sentinel的故障判定和故障转移流程是什么？",
    answer: "故障判定两步：①主观下线SDOWN——单个Sentinel发现主PING超时(down-after-milliseconds)标记主观下线；②客观下线ODOWN——超过quorum个Sentinel同意标记客观下线确认故障。故障转移流程：①选举Leader Sentinel——Raft变种先到先得半数以上成为Leader；②Leader选新主——过滤不健康从按优先级→偏移量→runid排序选新主；③提升新主SLAVEOF NO ONE；④其他从SLAVEOF newmaster复制新主；⑤旧主恢复后变从；⑥PUBLISH +switch-master通知客户端连接新主。",
    tags: ["Sentinel", "故障判定", "故障转移", "SDOWN", "ODOWN"],
  },
  {
    id: "rdi-rc-3",
    chapter: "rdi-replication-cluster",
    level: 2,
    question: "Redis Cluster为什么使用16384个槽位？MOVED和ASK重定向有什么区别？",
    answer: "16384槽位原因：①心跳包大小——节点间Gossip通信含槽位位图16384/8=2KB，65536/8=8KB网络开销大；②集群规模——Redis建议<=1000节点16384槽足够分配；③位图压缩——多数节点槽数少时压缩率高。MOVED vs ASK：MOVED <slot> <ip:port>是永久重定向——槽位已迁移完成归属变更客户端应更新本地映射表后续直连目标节点。ASK <slot> <ip:port>是临时重定向——槽位正在迁移中客户端本次连目标节点但不更新映射表下次仍先连原节点。MOVED是稳定状态变更ASK是迁移过程的临时状态。",
    tags: ["Cluster", "16384", "MOVED", "ASK", "重定向"],
  },
  {
    id: "rdi-rc-4",
    chapter: "rdi-replication-cluster",
    level: 3,
    question: "主从复制、Sentinel、Cluster三种方案各自解决什么问题？如何选择？",
    answer: "①主从复制——解决数据冗余和读写分离。一主多从主写从读异步复制简单但无自动故障转移主挂需手动切换。适合读多写少且可接受手动恢复。②Sentinel——在主从基础上增加高可用。部署Sentinel进程监控主从主挂自动选新主通知客户端。解决手动切换问题但不解决单机容量限制。适合数据量不大（单机放得下）但需高可用。③Cluster——解决水平扩展和高可用。16384槽分片突破单机内存限制每节点配主从实现高可用。适合数据量大需水平扩展。选择：数据小可手动恢复→主从复制；数据小需高可用→Sentinel；数据大需水平扩展→Cluster。",
    tags: ["主从复制", "Sentinel", "Cluster", "方案选择"],
  },
];
