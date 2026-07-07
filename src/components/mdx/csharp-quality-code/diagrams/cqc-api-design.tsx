/**
 * <CqcApiDesignDiagram>：API 设计 · 契约清晰与演进友好。
 *
 * 上半部分展示 API 设计的三层原则：
 *   命名清晰 → 参数精简 → 错误明确
 * 下半部分对比「坏 API」与「好 API」的代码差异。
 * 右侧标注 API 演进的安全操作与危险操作。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcApiDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="API 设计原则与对比。上半部分三层原则：命名清晰、参数精简、错误明确。下半部分对比坏 API 与好 API。右侧标注 API 演进的安全与危险操作。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            API 设计 · 契约清晰与演进友好
          </text>

          {/* ===== 上半：三层原则 ===== */}
          <text x="360" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">API 设计三层原则</text>

          {/* 原则1 */}
          <rect x="40" y="70" width="200" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="140" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">1. 命名清晰</text>
          <text x="140" y="108" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">方法名说明「做什么」</text>
          <text x="140" y="122" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">参数名说明「用什么」</text>

          {/* 原则2 */}
          <rect x="260" y="70" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="360" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">2. 参数精简</text>
          <text x="360" y="108" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">参数 ≤3 个，多了用对象</text>
          <text x="360" y="122" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">布尔参数考虑拆分方法</text>

          {/* 原则3 */}
          <rect x="480" y="70" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="580" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">3. 错误明确</text>
          <text x="580" y="108" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">用异常或 Result 表达失败</text>
          <text x="580" y="122" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">不靠返回码 + 注释</text>

          {/* ===== 下半：坏 API vs 好 API ===== */}
          <text x="180" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">坏 API</text>
          <text x="540" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">好 API</text>

          {/* 坏 API */}
          <rect x="40" y="156" width="280" height="130" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="180" y="176" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">Process(true, false, null)</text>
          <text x="180" y="196" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">参数含义不明</text>

          <text x="180" y="218" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">int Delete(int id)</text>
          <text x="180" y="238" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">返回 -1 表示失败？0 表示不存在？</text>

          <text x="180" y="260" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">GetData(string t)</text>
          <text x="180" y="280" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">t 是类型？表名？超时？</text>

          {/* 好 API */}
          <rect x="400" y="156" width="280" height="130" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="540" y="176" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">Process(opts)</text>
          <text x="540" y="196" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">选项对象，属性自描述</text>

          <text x="540" y="218" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void Delete(int id)</text>
          <text x="540" y="238" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">失败抛异常，不存在抛 NotFound</text>

          <text x="540" y="260" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">GetByType(DataType type)</text>
          <text x="540" y="280" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">枚举类型，编译期约束</text>

          {/* ===== 底部：API 演进 ===== */}
          <rect x="36" y="300" width={VIEW_W - 72} height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="322" fontSize="12" fontWeight="700" fill="var(--accent)">API 演进：安全 vs 危险</text>

          <text x="52" y="344" fontSize="11" fontWeight="600" fill="var(--success)">安全（不破坏调用方）</text>
          <text x="52" y="360" fontSize="11" fill="var(--text-secondary)">新增可选参数 / 新增方法 / 新增接口成员（带默认实现）</text>
          <text x="52" y="378" fontSize="11" fill="var(--text-secondary)">放宽参数类型 / 增加重载</text>

          <text x="400" y="344" fontSize="11" fontWeight="600" fill="var(--danger)">危险（破坏调用方）</text>
          <text x="400" y="360" fontSize="11" fill="var(--text-secondary)">删除/重命名公开成员 / 修改参数顺序</text>
          <text x="400" y="378" fontSize="11" fill="var(--text-secondary)">收紧参数类型 / 修改返回类型 / 改变异常行为</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        好的 API 命名自描述、参数精简、错误明确。演进时只做不破坏调用方的修改：新增可选参数与方法是安全的，删除或修改已有成员是危险的。
      </figcaption>
    </figure>
  );
}
