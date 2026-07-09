"use client";

export function RdiTransactionsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis事务与Lua脚本">
      <defs>
        <linearGradient id="rdi-tx-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rdi-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 事务与 Lua 脚本</text>

      {/* 事务流程 */}
      <rect x="20" y="50" width="760" height="170" rx="12" fill="url(#rdi-tx-grad)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">事务执行流程（MULTI / EXEC / DISCARD）</text>
      <line x1="40" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />

      <rect x="50" y="100" width="120" height="50" rx="8" fill="#fef3c7" stroke="#fff" strokeWidth="1" />
      <text x="110" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">MULTI</text>
      <path d="M170 125 L205 125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-tx-arrow)" />

      <rect x="210" y="100" width="150" height="50" rx="8" fill="#fef3c7" stroke="#fff" strokeWidth="1" />
      <text x="285" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">命令入队</text>
      <path d="M360 125 L395 125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-tx-arrow)" />

      <rect x="400" y="100" width="150" height="50" rx="8" fill="#fef3c7" stroke="#fff" strokeWidth="1" />
      <text x="475" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">更多命令入队</text>
      <path d="M550 125 L585 125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-tx-arrow)" />

      <rect x="590" y="100" width="150" height="50" rx="8" fill="#fde68a" stroke="#fff" strokeWidth="2" />
      <text x="665" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">EXEC / DISCARD</text>

      <text x="110" y="170" textAnchor="middle" fontSize="9" fill="#fef3c7">开启事务</text>
      <text x="285" y="170" textAnchor="middle" fontSize="9" fill="#fef3c7">QUEUED 返回</text>
      <text x="475" y="170" textAnchor="middle" fontSize="9" fill="#fef3c7">FIFO 顺序入队</text>
      <text x="665" y="170" textAnchor="middle" fontSize="9" fill="#fef3c7">顺序执行 / 取消</text>
      <text x="400" y="200" textAnchor="middle" fontSize="10" fill="#fcd34d">事务中的命令在 EXEC 时才顺序执行，执行期间不会被中断</text>

      {/* WATCH 乐观锁 */}
      <rect x="20" y="235" width="370" height="130" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="205" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">WATCH 乐观锁</text>
      <text x="205" y="280" textAnchor="middle" fontSize="10" fill="#155e75">WATCH key [key...] 监视键</text>
      <text x="205" y="300" textAnchor="middle" fontSize="10" fill="#155e75">如果被监视的键被修改</text>
      <text x="205" y="320" textAnchor="middle" fontSize="10" fill="#155e75">→ 事务拒绝执行（返回 nil）</text>
      <text x="205" y="345" textAnchor="middle" fontSize="9" fill="#0e7490">UNWATCH 取消所有监视</text>
      <text x="205" y="358" textAnchor="middle" fontSize="9" fill="#0e7490">EXEC/DISCARD 后自动 UNWATCH</text>

      {/* ACID 分析 */}
      <rect x="410" y="235" width="370" height="130" rx="10" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="595" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">ACID 特性分析</text>
      <text x="530" y="282" fontSize="10" fill="#991b1b">A 原子性：</text>
      <text x="680" y="282" fontSize="10" fill="#dc382d">部分（非入队错误不回滚）</text>
      <text x="530" y="302" fontSize="10" fill="#991b1b">C 一致性：</text>
      <text x="680" y="302" fontSize="10" fill="#dc382d">是（不违反约束）</text>
      <text x="530" y="322" fontSize="10" fill="#991b1b">I 隔离性：</text>
      <text x="680" y="322" fontSize="10" fill="#dc382d">是（单线程串行）</text>
      <text x="530" y="342" fontSize="10" fill="#991b1b">D 持久性：</text>
      <text x="680" y="342" fontSize="10" fill="#dc382d">取决于持久化策略</text>
      <text x="595" y="360" textAnchor="middle" fontSize="9" fill="#b91c1c">注意：命令执行错误（如类型错误）不会回滚已执行的命令</text>

      {/* Lua 脚本 */}
      <rect x="20" y="380" width="760" height="185" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="405" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Lua 脚本</text>

      <rect x="50" y="420" width="220" height="65" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="160" y="443" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">原子性执行</text>
      <text x="160" y="463" textAnchor="middle" fontSize="9" fill="#5b21b6">整个脚本作为一个事务执行</text>
      <text x="160" y="478" textAnchor="middle" fontSize="9" fill="#5b21b6">不会被其他命令打断</text>

      <rect x="290" y="420" width="220" height="65" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="443" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">EVAL / EVALSHA</text>
      <text x="400" y="463" textAnchor="middle" fontSize="9" fill="#155e75">EVAL script keys args</text>
      <text x="400" y="478" textAnchor="middle" fontSize="9" fill="#155e75">EVALSHA sha1（缓存复用）</text>

      <rect x="530" y="420" width="220" height="65" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="443" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">减少网络往返</text>
      <text x="640" y="463" textAnchor="middle" fontSize="9" fill="#78350f">多条命令打包一次发送</text>
      <text x="640" y="478" textAnchor="middle" fontSize="9" fill="#78350f">适合 CAS / 原子计数场景</text>

      <text x="400" y="515" textAnchor="middle" fontSize="11" fill="#475569">脚本中：redis.call() 出错继续 · redis.pcall() 出错返回错误</text>
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#475569">KEYS[1..n] 传入键名 · ARGV[1..n] 传入参数</text>
      <text x="400" y="555" textAnchor="middle" fontSize="10" fill="#64748b">Cluster 模式：脚本操作的键必须在同一槽位（hash tag）</text>
    </svg>
  );
}
