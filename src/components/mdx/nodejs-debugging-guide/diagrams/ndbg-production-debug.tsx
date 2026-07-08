/**
 * <NdbgProductionDebugDiagram>：生产环境调试三层证据采集图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function NdbgProductionDebugDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="生产环境调试三层证据采集图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            生产环境调试：三层证据采集
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            不可重启 | 不可断点 | 需事后分析 → 日志 + APM + postmortem 交叉验证
          </text>

          {/* 第一层：结构化日志 */}
          <rect x="40" y="62" width="660" height="86" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="82" fontSize="12" fontWeight="600" fill="var(--success)">第一层：结构化日志（黑匣子）</text>
          <rect x="60" y="92" width="200" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="160" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">pino / winston</text>
          <text x="160" y="122" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">JSON 格式输出</text>
          <text x="160" y="134" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ELK / Loki 采集</text>

          <rect x="280" y="92" width="200" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="380" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">request ID 关联</text>
          <text x="380" y="122" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">logger.child(&lbrace;requestId&rbrace;)</text>
          <text x="380" y="134" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">串联请求全部日志</text>

          <rect x="500" y="92" width="180" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="590" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">日志检索</text>
          <text x="590" y="122" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">requestId:abc-123</text>
          <text x="590" y="134" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">→ 完整操作链</text>

          {/* 第二层：APM 监控 */}
          <rect x="40" y="160" width="660" height="86" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="180" fontSize="12" fontWeight="600" fill="var(--accent)">第二层：APM 监控（塔台雷达）</text>
          <rect x="60" y="190" width="150" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="135" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PM2 / New Relic</text>
          <text x="135" y="220" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Datadog</text>
          <text x="135" y="232" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">外部采集</text>

          <rect x="230" y="190" width="150" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="305" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU / 内存趋势</text>
          <text x="305" y="220" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">heapUsed 曲线</text>
          <text x="305" y="232" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">事件循环延迟</text>

          <rect x="400" y="190" width="140" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="470" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">--report</text>
          <text x="470" y="220" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">JS/C++ 栈</text>
          <text x="470" y="232" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">堆/libuv 句柄</text>

          <rect x="560" y="190" width="120" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="620" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">告警</text>
          <text x="620" y="220" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">内存 &gt; 阈值</text>
          <text x="620" y="232" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">延迟 p99 飙升</text>

          {/* 第三层：postmortem */}
          <rect x="40" y="258" width="660" height="86" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="60" y="278" fontSize="12" fontWeight="600" fill="var(--danger)">第三层：postmortem 分析（残骸分析）</text>
          <rect x="60" y="288" width="200" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="160" y="304" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">--abort-on-uncaught-exception</text>
          <text x="160" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">崩溃时生成 core dump</text>
          <text x="160" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ulimit -c unlimited</text>

          <rect x="280" y="288" width="200" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="380" y="304" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">llnode（LLDB 插件）</text>
          <text x="380" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">v8 bt / v8 inspect</text>
          <text x="380" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">v8 findjsobjs</text>

          <rect x="500" y="288" width="180" height="46" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="590" y="304" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">--heapsnapshot-signal</text>
          <text x="590" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">SIGUSR2 触发快照</text>
          <text x="590" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">OOM 前手动拍</text>

          {/* 底部安全警告 */}
          <rect x="40" y="358" width="660" height="56" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">安全警告：生产环境禁止直接暴露 --inspect 端口</text>
          <text x={VIEW_W / 2} y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Inspector Protocol 可执行任意代码 | 断点阻塞事件循环 | 用 SSH 隧道隔离</text>
          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">正确做法：日志 + APM + --report 事后分析 | 确需调试时用 SSH 隧道</text>

          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：三层证据交叉验证还原事故根因 | 生产调试 = 事后分析非实时干预
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生产环境调试三层证据——结构化日志、APM 监控、postmortem 分析的交叉验证
      </figcaption>
    </figure>
  );
}
