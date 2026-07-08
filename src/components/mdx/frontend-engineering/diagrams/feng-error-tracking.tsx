/**
 * <FengErrorTrackingDiagram>：错误追踪（Sentry / SourceMap / 告警）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengErrorTrackingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="错误追踪 Sentry SourceMap 告警流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            错误追踪：从用户报错到定位修复
          </text>

          {/* ① 用户端报错 */}
          <rect x="40" y="56" width="160" height="100" rx="10" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="120" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">① 用户端报错</text>
          <text x="120" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">JS 异常</text>
          <text x="120" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未捕获 Promise</text>
          <text x="120" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">资源加载失败</text>
          <text x="120" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">白屏 / 卡死</text>
          <text x="120" y="154" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">window.onerror 捕获</text>

          <line x1="200" y1="106" x2="224" y2="106" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="212" y="102" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* ② Sentry SDK 上报 */}
          <rect x="228" y="56" width="160" height="100" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="308" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">② SDK 采集上报</text>
          <text x="308" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">错误堆栈（压缩后）</text>
          <text x="308" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用户轨迹 / breadcrumb</text>
          <text x="308" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">设备 / 浏览器 / 版本</text>
          <text x="308" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">release 标签</text>
          <text x="308" y="154" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">beacon / fetch 上报</text>

          <line x1="388" y1="106" x2="412" y2="106" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="400" y="102" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* ③ SourceMap 还原 */}
          <rect x="416" y="56" width="160" height="100" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="496" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">③ SourceMap 还原</text>
          <text x="496" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">压缩栈 → 源码位置</text>
          <text x="496" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">文件名 / 行号 / 列号</text>
          <text x="496" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原始变量名</text>
          <text x="496" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">sourcemap 私有存储</text>
          <text x="496" y="154" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不暴露给客户端</text>

          <line x1="576" y1="106" x2="600" y2="106" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="588" y="102" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* ④ 告警通知 */}
          <rect x="604" y="56" width="120" height="100" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="664" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">④ 告警</text>
          <text x="664" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">阈值触发</text>
          <text x="664" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">首次出现</text>
          <text x="664" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">激增告警</text>
          <text x="664" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">飞书 / 钉钉</text>
          <text x="664" y="154" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">值班 oncall</text>

          {/* 聚合去重 */}
          <rect x="120" y="180" width="500" height="44" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">⑤ 聚合去重 + 优先级排序</text>
          <text x="370" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相同堆栈归并为一个 issue → 按影响用户数 / 频率排序 → 聚焦最高价值修复</text>

          <line x1="370" y1="224" x2="370" y2="244" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="384" y="240" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          {/* 修复闭环 */}
          <rect x="120" y="248" width="500" height="44" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="266" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">⑥ 修复 → 发版 → 验证下降</text>
          <text x="370" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">定位源码 → 修复 → 发版 → Sentry 标记 resolved → 监控曲线是否归零</text>

          {/* SourceMap 关键实践 */}
          <rect x="30" y="312" width="340" height="126" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="200" y="334" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">SourceMap 关键实践</text>
          <text x="45" y="354" fontSize="10" fill="var(--text-secondary)">- 构建产出 .map 文件</text>
          <text x="45" y="370" fontSize="10" fill="var(--text-secondary)">- 上传到 Sentry，不入 CDN</text>
          <text x="45" y="386" fontSize="10" fill="var(--text-secondary)">- release 标签与代码版本绑定</text>
          <text x="45" y="402" fontSize="10" fill="var(--text-secondary)">- 每次部署上传新 map</text>
          <text x="45" y="424" fontSize="10" fill="var(--text-tertiary)">确保压缩栈能精确还原源码行</text>

          {/* 告警治理 */}
          <rect x="390" y="312" width="320" height="126" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="334" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">告警治理</text>
          <text x="405" y="354" fontSize="10" fill="var(--text-secondary)">- 按错误率设阈值，非每条告警</text>
          <text x="405" y="370" fontSize="10" fill="var(--text-secondary)">- 噪音 issue 标记 ignored</text>
          <text x="405" y="386" fontSize="10" fill="var(--text-secondary)">- 分级：P0 电话 / P1 IM / P2 看板</text>
          <text x="405" y="402" fontSize="10" fill="var(--text-secondary)">- 同源合并，避免告警风暴</text>
          <text x="405" y="424" fontSize="10" fill="var(--text-tertiary)">目标：高信噪比、可行动</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        错误追踪闭环——Sentry 采集上报、SourceMap 还原源码、聚合去重与告警治理的端到端流程
      </figcaption>
    </figure>
  );
}
