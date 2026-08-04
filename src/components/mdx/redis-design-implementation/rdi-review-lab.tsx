"use client";

import { useState, useCallback } from "react";
const C = { bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)", primary: "var(--text-primary)", secondary: "var(--text-secondary)", accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)" } as const;

type Node = { id: string; label: string; title: string; content: string; color: string };

const CHAPTERS: Record<string, { title: string; subtitle: string; nodes: Node[] }> = {
  map: {
    title: "Redis 学习路径（四部分）",
    subtitle: "数据结构 → 单机机制 → 集群架构 → 功能应用",
    nodes: [
      { id: "s1", label: "数据结构", title: "第一部分 · 内部数据结构", content: "SDS、链表、字典、跳表、整数集合、压缩列表 + 对象系统。六种底层结构支撑五种对象类型，编码随数据规模自动切换。", color: C.accent },
      { id: "s2", label: "单机机制", title: "第二部分 · 单机数据库", content: "数据库、RDB/AOF 持久化、事件循环、客户端与服务器。理解单线程事件循环是理解 Redis 性能的钥匙。慢命令阻塞全部请求。", color: C.success },
      { id: "s3", label: "集群架构", title: "第三部分 · 多机协作", content: "复制、哨兵、集群层层递进：从数据冗余到自动故障转移，再到 16384 槽的水平分片与 gossip 协议。", color: C.warning },
      { id: "s4", label: "功能应用", title: "第四部分 · 高级功能", content: "发布订阅、事务、Lua、排序、位数组、慢日志与监视器，覆盖日常使用的全部工具面。", color: C.danger },
    ],
  },
  intro: {
    title: "Redis 总体架构",
    subtitle: "内存数据结构服务器的能力边界",
    nodes: [
      { id: "m", label: "内存存储", title: "内存中的数据商店", content: "Redis 把数据放在内存获得微秒级读写，持久化（RDB/AOF）负责把内存状态安全地搬到磁盘。内存是性能来源，也是容量边界。", color: C.accent },
      { id: "d", label: "数据结构", title: "五种对象类型", content: "字符串、列表、哈希、集合、有序集合覆盖缓存、计数、排行等主流场景。每种类型背后有多种编码实现，自动切换。", color: C.success },
      { id: "t", label: "单线程", title: "单线程事件循环", content: "单线程免除锁与上下文切换，命令原子执行。代价是任何慢命令都会阻塞全部请求——KEYS、大 SMEMBERS 是事故源头。", color: C.warning },
      { id: "p", label: "持久化", title: "持久化与复制", content: "RDB 快照 + AOF 日志双保险，混合持久化兼容恢复速度与丢失窗口。主从复制与哨兵集群保障可用性。", color: C.danger },
    ],
  },
  review: {
    title: "Redis 全书知识体系",
    subtitle: "结构、单机、集群、功能四环闭环",
    nodes: [
      { id: "s", label: "结构", title: "底层结构决定性能", content: "SDS 二进制安全、字典渐进 rehash、跳表 O(logN) 范围查询、ziplist 紧凑内存——每种编码为特定场景优化。", color: C.accent },
      { id: "p", label: "持久化", title: "持久化保证数据安全", content: "RDB 时间点快照 + AOF 命令追加 + 混合持久化。BGSAVE fork 子进程，写时复制保一致。everysec fsync 是安全折中。", color: C.success },
      { id: "c", label: "集群", title: "集群保障可用扩展", content: "复制打底、哨兵切换、集群分片。PSYNC 断线续传、16384 槽分区、gossip 拓扑收敛——可用性与容量逐层递进。", color: C.warning },
      { id: "f", label: "功能", title: "功能面覆盖日常需求", content: "事务、Lua 脚本、pub/sub、位图、SORT 排序、慢日志与 MONITOR——从原子性到可观测性，工具面完整。", color: C.danger },
    ],
  },
};

export function RdiReviewLab({ chapter }: { chapter: string }) {
  const spec = CHAPTERS[chapter] ?? CHAPTERS.map;
  const [selected, setSelected] = useState(spec.nodes[0].id);
  const reset = useCallback(() => setSelected(spec.nodes[0].id), [spec]);
  const stage = spec.nodes.find((n) => n.id === selected)!;
  const viewW = 780; const viewH = 330;
  const nodeW = (viewW - 80 - (spec.nodes.length - 1) * 16) / spec.nodes.length;
  const nodeX = (i: number) => 20 + i * (nodeW + 16);

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ {spec.title}</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label={spec.title}>
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>{spec.title}</text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>{spec.subtitle}</text>
          {spec.nodes.map((n, i) => {
            const x = nodeX(i);
            const cx = x + nodeW / 2;
            const isSel = selected === n.id;
            return (
              <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
                <rect x={x} y={100} width={nodeW} height={120} rx={10} fill={isSel ? n.color : C.bg} stroke={n.color} strokeWidth={isSel ? 2 : 1.5} opacity={isSel ? 0.9 : 0.08} />
                <text x={cx} y={132} textAnchor="middle" fontSize={13} fontWeight={600} fill={isSel ? C.bg : C.primary}>{n.label}</text>
                <text x={cx} y={155} textAnchor="middle" fontSize={11} fill={isSel ? "rgba(255,255,255,0.85)" : C.secondary}>{n.title}</text>
                {isSel && <text x={cx} y={202} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.9)">{n.content.slice(0, 16)}…</text>}
              </g>
            );
          })}
        </svg>
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs font-semibold" style={{ color: C.primary }}>{stage.title}</div>
          <div className="mt-1 text-xs leading-relaxed" style={{ color: C.secondary }}>{stage.content}</div>
        </div>
      </div>
    </div>
  );
}