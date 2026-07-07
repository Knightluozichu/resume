/**
 * <CqcExceptionPracticeDiagram>：异常处理的层次结构与决策流。
 *
 * 左侧展示异常处理的四层金字塔：预防 → 捕获 → 恢复 → 记录。
 * 右侧展示异常选择决策树：业务异常 vs 系统异常、何时抛出、何时捕获。
 * 中间用箭头连接，底部点出核心原则：抛具体异常、捕获有意义异常、不吞异常。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcExceptionPracticeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异常处理层次结构与决策流。左侧四层金字塔：预防、捕获、恢复、记录。右侧决策树：区分业务异常与系统异常，何时抛出何时捕获。底部原则：抛具体异常、捕获有意义异常、不吞异常。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异常实践 · 处理层次与决策流
          </text>

          {/* ===== 左侧：四层金字塔 ===== */}
          <text x="120" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">异常处理四层</text>

          {/* 第一层：预防 */}
          <polygon points="50,80 190,80 175,115 65,115" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="120" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">1. 预防（参数校验）</text>

          {/* 第二层：捕获 */}
          <polygon points="65,120 175,120 160,155 80,155" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="120" y="143" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">2. 捕获（try-catch）</text>

          {/* 第三层：恢复 */}
          <polygon points="80,160 160,160 145,195 95,195" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="120" y="183" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">3. 恢复（降级重试）</text>

          {/* 第四层：记录 */}
          <polygon points="95,200 145,200 120,235" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="120" y="223" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">4. 记录日志</text>

          {/* ===== 右侧：决策树 ===== */}
          <text x="480" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">异常决策流</text>

          {/* 根节点 */}
          <rect x="400" y="75" width="160" height="32" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="480" y="96" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">发生错误</text>

          {/* 分支线 */}
          <line x1="480" y1="107" x2="480" y2="122" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="380" y1="122" x2="580" y2="122" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="380" y1="122" x2="380" y2="135" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="580" y1="122" x2="580" y2="135" stroke="var(--border)" strokeWidth="1.2" />

          {/* 左分支：业务异常 */}
          <rect x="310" y="135" width="140" height="36" rx="7" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.3" />
          <text x="380" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">业务异常</text>
          <text x="380" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自定义异常类型</text>

          {/* 右分支：系统异常 */}
          <rect x="510" y="135" width="140" height="36" rx="7" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.3" />
          <text x="580" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">系统异常</text>
          <text x="580" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">框架已定义类型</text>

          {/* 业务异常后续 */}
          <line x1="380" y1="171" x2="380" y2="185" stroke="var(--border)" strokeWidth="1.2" />
          <rect x="310" y="185" width="140" height="36" rx="7" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.6" />
          <text x="380" y="202" textAnchor="middle" fontSize="11" fill="var(--text-primary)">throw new OrderException</text>
          <text x="380" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">含错误码与上下文</text>

          {/* 系统异常后续 */}
          <line x1="580" y1="171" x2="580" y2="185" stroke="var(--border)" strokeWidth="1.2" />
          <rect x="510" y="185" width="140" height="36" rx="7" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.6" />
          <text x="580" y="202" textAnchor="middle" fontSize="11" fill="var(--text-primary)">catch 特定类型</text>
          <text x="580" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">勿 catch Exception 全吞</text>

          {/* 三条原则 */}
          <rect x="36" y="268" width={VIEW_W - 72} height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x={VIEW_W / 2} y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">三条核心原则</text>

          <text x="60" y="312" fontSize="11.5" fontWeight="600" fill="var(--success)">抛具体异常</text>
          <text x="60" y="328" fontSize="11" fill="var(--text-secondary)">用 InvalidOperationException 等具体类型，不用 Exception</text>

          <text x="60" y="352" fontSize="11.5" fontWeight="600" fill="var(--warning)">捕获有意义异常</text>
          <text x="60" y="368" fontSize="11" fill="var(--text-secondary)">只在能处理的地方 catch，勿在底层吞异常</text>

          <text x="400" y="312" fontSize="11.5" fontWeight="600" fill="var(--danger)">不吞异常</text>
          <text x="400" y="328" fontSize="11" fill="var(--text-secondary)">空 catch 块会掩盖问题，至少记录日志</text>

          <text x="400" y="352" fontSize="11.5" fontWeight="600" fill="var(--accent)">finally 释放资源</text>
          <text x="400" y="368" fontSize="11" fill="var(--text-secondary)">用 using 或 finally 确保资源释放</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异常处理分四层：先用参数校验预防，再在合适层级捕获，能恢复则降级重试，最后记录日志。抛具体类型、捕获能处理的、绝不吞异常。
      </figcaption>
    </figure>
  );
}
