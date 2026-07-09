"use client";

export function PhaConsensusConsistencyDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="共识算法与一致性模型">
      <defs>
        <marker id="pha-cc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">共识算法 · Raft 与一致性模型</text>

      {/* Raft 三个角色 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1d4ed8">Raft 共识：Leader-Follower 模型</text>

      {/* Leader */}
      <rect x="300" y="70" width="200" height="45" rx="8" fill="#2563eb" opacity="0.9" />
      <text x="400" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Leader 领导者</text>

      {/* Followers */}
      <rect x="100" y="140" width="160" height="45" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="180" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1d4ed8">Follower 跟随者</text>

      <rect x="540" y="140" width="160" height="45" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="620" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1d4ed8">Follower 跟随者</text>

      {/* Candidate */}
      <rect x="300" y="140" width="200" height="45" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="400" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">Candidate 候选者（选举时）</text>

      {/* 箭头 */}
      <path d="M400 115 L200 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-cc-arrow)" />
      <path d="M400 115 L620 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-cc-arrow)" />

      {/* Raft 关键机制 */}
      <rect x="20" y="210" width="380" height="150" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="210" y="233" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Raft 核心机制</text>
      <text x="35" y="255" fontSize="10" fill="#475569">1. 领导者选举：心跳超时 → Candidate 发起投票</text>
      <text x="35" y="275" fontSize="10" fill="#475569">   多数派赞成 → 当选 Leader（Term 递增）</text>
      <text x="35" y="298" fontSize="10" fill="#475569">2. 日志复制：Leader 写日志 → 并行复制到 Follower</text>
      <text x="35" y="318" fontSize="10" fill="#475569">   多数派确认 → Commit → 响应客户端</text>
      <text x="35" y="341" fontSize="10" fill="#475569">3. 安全性：已 Commit 日志不丢失 / Leader 完整性</text>

      {/* Paxos 对比 */}
      <rect x="420" y="210" width="360" height="150" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="600" y="233" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Paxos vs Raft</text>
      <text x="435" y="255" fontSize="10" fill="#475569">Paxos：Proposer/Acceptor/Learner</text>
      <text x="435" y="275" fontSize="10" fill="#475569">  理论完备但难理解 / 难实现</text>
      <text x="435" y="298" fontSize="10" fill="#475569">Raft：Leader/Follower（Paxos 简化版）</text>
      <text x="435" y="318" fontSize="10" fill="#475569">  易理解 / 易实现 / 工业主流（etcd/Consul）</text>
      <text x="435" y="341" fontSize="10" fill="#475569">  Gossip：最终一致 / 去中心化（Cassandra）</text>

      {/* 一致性模型谱系 */}
      <text x="400" y="395" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">一致性模型谱系（由强到弱）</text>

      <rect x="20" y="410" width="150" height="55" rx="8" fill="#2563eb" opacity="0.9" />
      <text x="95" y="432" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">线性一致性</text>
      <text x="95" y="450" textAnchor="middle" fontSize="9" fill="#bfdbfe">最强 / 实时序 / CP</text>

      <rect x="180" y="410" width="150" height="55" rx="8" fill="#0891b2" opacity="0.85" />
      <text x="255" y="432" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">顺序一致性</text>
      <text x="255" y="450" textAnchor="middle" fontSize="9" fill="#cffafe">保序 / 不保实时</text>

      <rect x="340" y="410" width="150" height="55" rx="8" fill="#f59e0b" opacity="0.85" />
      <text x="415" y="432" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">因果一致性</text>
      <text x="415" y="450" textAnchor="middle" fontSize="9" fill="#fef3c7">保因果序 / 并发无序</text>

      <rect x="500" y="410" width="150" height="55" rx="8" fill="#8b5cf6" opacity="0.85" />
      <text x="575" y="432" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">读己写一致</text>
      <text x="575" y="450" textAnchor="middle" fontSize="9" fill="#ede9fe">自己能看到自己写</text>

      <rect x="660" y="410" width="120" height="55" rx="8" fill="#ef4444" opacity="0.8" />
      <text x="720" y="432" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">最终一致</text>
      <text x="720" y="450" textAnchor="middle" fontSize="9" fill="#fee2e2">最弱 / AP / 收敛</text>

      {/* 箭头从强到弱 */}
      <path d="M170 437 L180 437" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-cc-arrow)" />
      <path d="M330 437 L340 437" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-cc-arrow)" />
      <path d="M490 437 L500 437" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-cc-arrow)" />
      <path d="M650 437 L660 437" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-cc-arrow)" />

      <text x="400" y="495" textAnchor="middle" fontSize="11" fill="#475569">Quorum = majority（多数派）：N 个节点中需 &gt;= floor(N/2)+1 确认</text>
      <text x="400" y="515" textAnchor="middle" fontSize="11" fill="#475569">共识保证：已达成共识的值不可撤销；多数派可用即可继续工作（容忍少数派故障）</text>
    </svg>
  );
}
