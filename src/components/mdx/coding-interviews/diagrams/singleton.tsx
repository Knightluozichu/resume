"use client";

import { CodingInterviewLab } from "./official-lab";

const timingCases = [
  {
    label: "无锁延迟",
    fields: [
      ["创建时机", "第一次读取Instance"],
      ["并发", "两个线程可能各自创建实例"],
      ["成本", "无锁但不正确"],
      ["结论", "只适用于明确单线程环境"],
    ],
  },
  {
    label: "每次加锁",
    fields: [
      ["创建时机", "第一次在锁内读取"],
      ["并发", "同一把锁串行创建"],
      ["成本", "实例建成后每次读取仍加锁"],
      ["结论", "正确直观，热路径有同步成本"],
    ],
  },
  {
    label: "静态字段",
    fields: [
      ["创建时机", "类型初始化触发时"],
      ["并发", "运行时保证类型初始化一次"],
      ["成本", "实现简单"],
      ["边界", "调用其他静态成员也可能提前触发"],
    ],
  },
  {
    label: "嵌套类型",
    fields: [
      ["创建时机", "首次读取Nested.instance"],
      ["并发", "依赖运行时类型初始化保证"],
      ["成本", "读取路径短"],
      ["收益", "延迟创建且不因外层普通静态方法触发"],
    ],
  },
] as const;

const tradeoffCases = [
  {
    label: "全局配置快照",
    fields: [
      ["唯一性", "进程内只读配置可共享"],
      ["生命周期", "启动加载，运行期不可变"],
      ["并发", "读取无可变竞争"],
      ["替代", "依赖注入的单例生命周期"],
    ],
  },
  {
    label: "数据库连接",
    fields: [
      ["误区", "全进程只保留一个连接"],
      ["风险", "并发串行、断线影响全局"],
      ["正确抽象", "连接池管理多个受限资源"],
      ["结论", "唯一管理器不等于唯一连接"],
    ],
    alert: "Singleton约束实例数量，不能替代连接池、并发控制或故障恢复。",
  },
  {
    label: "可变业务服务",
    fields: [
      ["风险", "隐藏全局状态与测试污染"],
      ["并发", "每个字段都要定义同步策略"],
      ["测试", "难替换、难重置、依赖顺序"],
      ["替代", "显式接口、构造注入与受控生命周期"],
    ],
  },
  {
    label: "多进程部署",
    fields: [
      ["实例范围", "每个进程各有一个实例"],
      ["不保证", "集群全局唯一"],
      ["需要", "外部锁、数据库约束或协调服务"],
      ["结论", "先说清唯一性的作用域"],
    ],
  },
] as const;

export function SingletonBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 370" role="img" aria-label="Singleton由私有构造、唯一静态实例和公共访问点组成，约束只在当前运行时作用域内有效。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Singleton回答三个问题：谁能创建、存在哪里、作用域多大</text>
          <rect x="258" y="58" width="264" height="228" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="390" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">sealed Singleton</text>
          {[
            ["私有构造函数", "阻止外部new", 102],
            ["静态instance", "保存唯一引用", 162],
            ["公共Instance", "提供受控入口", 222],
          ].map(([title, detail, y]) => (
            <g key={title}>
              <rect x="286" y={Number(y)} width="208" height="46" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--border)" />
              <text x="390" y={Number(y) + 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">{title}</text>
              <text x="390" y={Number(y) + 36} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{detail}</text>
            </g>
          ))}
          <rect x="32" y="124" width="176" height="94" rx="5" fill="var(--success)" fillOpacity="0.07" stroke="var(--success)" />
          <text x="120" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">调用者 A / B / C</text>
          <text x="120" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">都经由同一个访问点</text>
          <path d="M208 171 H252" stroke="var(--success)" strokeWidth="2" />
          <rect x="572" y="104" width="176" height="134" rx="5" fill="var(--warning)" fillOpacity="0.07" stroke="var(--warning)" />
          <text x="660" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">作用域边界</text>
          <text x="660" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">通常是当前进程 / 加载域</text>
          <text x="660" y="184" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不是机器或集群全局唯一</text>
          <text x="660" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">也不自动保证字段线程安全</text>
          <path d="M528 171 H566" stroke="var(--warning)" strokeWidth="2" />
          <rect x="104" y="314" width="572" height="34" rx="5" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" />
          <text x="390" y="335" textAnchor="middle" fontSize="11" fill="var(--text-primary)">创建一次 ≠ 状态并发安全 ≠ 分布式唯一 ≠ 适合所有全局服务</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先定义唯一性的作用域和生命周期，再选择初始化机制。</figcaption>
    </figure>
  );
}

export function ConcurrencyRaceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 370" role="img" aria-label="两个线程同时观察instance为空，各自创建Singleton，导致出现两个实例；锁或类型初始化需要把检查和创建变成一次操作。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">无锁的“先检查再创建”不是原子操作</text>
          <line x1="184" y1="62" x2="184" y2="292" stroke="var(--accent)" strokeWidth="2" />
          <line x1="596" y1="62" x2="596" y2="292" stroke="var(--success)" strokeWidth="2" />
          <text x="184" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">线程 A</text>
          <text x="596" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">线程 B</text>
          {[
            [92, "读取 instance == null", "读取 instance == null"],
            [154, "暂停 / 被调度", "new Singleton() → B"],
            [216, "new Singleton() → A", "写入 instance = B"],
            [278, "写入 instance = A", "返回 B"],
          ].map(([y, left, right]) => (
            <g key={String(y)}>
              <rect x="48" y={Number(y) - 18} width="272" height="36" rx="4" fill="var(--accent)" fillOpacity="0.07" stroke="var(--border)" />
              <text x="184" y={Number(y) + 5} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{left}</text>
              <rect x="460" y={Number(y) - 18} width="272" height="36" rx="4" fill="var(--success)" fillOpacity="0.07" stroke="var(--border)" />
              <text x="596" y={Number(y) + 5} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{right}</text>
            </g>
          ))}
          <rect x="132" y="318" width="516" height="32" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" />
          <text x="390" y="338" textAnchor="middle" fontSize="11" fill="var(--text-primary)">A与B都曾被创建并可能逸出：唯一实例约束已经失败。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">检查与创建必须由锁、类型初始化或经过验证的延迟容器统一保护。</figcaption>
    </figure>
  );
}

export function InitializationTimingLab() {
  return <CodingInterviewLab cases={timingCases} caption="对比作者源码中的初始化时机、并发正确性与访问成本。" />;
}

export function SingletonTradeoffLab() {
  return <CodingInterviewLab cases={tradeoffCases} caption="切换场景，判断Singleton是否真是正确的生命周期与作用域。" />;
}
