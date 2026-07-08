/**
 * <FengPerformanceMonitorDiagram>：性能监控（Web Vitals / Lighthouse / APM）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengPerformanceMonitorDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能监控 Web Vitals 与 APM 图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            性能监控：Web Vitals 核心指标与监控闭环
          </text>

          {/* Web Vitals 三大核心指标 */}
          <rect x="30" y="50" width="210" height="150" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="135" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">LCP</text>
          <text x="135" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最大内容绘制</text>
          <text x="135" y="110" textAnchor="middle" fontSize="10" fill="var(--text-primary)">衡量加载体验</text>
          <rect x="50" y="122" width="170" height="24" rx="5" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="139" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">目标 &lt; 2.5s</text>
          <text x="135" y="162" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">首屏最大元素渲染完成时间</text>
          <text x="135" y="178" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">图片 / 文本块 / 视频</text>
          <text x="135" y="194" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">优化：预加载、CDN、SSR</text>

          <rect x="265" y="50" width="210" height="150" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">INP</text>
          <text x="370" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">交互到下一帧</text>
          <text x="370" y="110" textAnchor="middle" fontSize="10" fill="var(--text-primary)">衡量交互响应</text>
          <rect x="285" y="122" width="170" height="24" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="139" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">目标 &lt; 200ms</text>
          <text x="370" y="162" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">所有交互延迟的最坏值</text>
          <text x="370" y="178" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">替代 FID，覆盖全生命周期</text>
          <text x="370" y="194" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">优化：长任务拆分、Web Worker</text>

          <rect x="500" y="50" width="210" height="150" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="605" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">CLS</text>
          <text x="605" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">累积布局偏移</text>
          <text x="605" y="110" textAnchor="middle" fontSize="10" fill="var(--text-primary)">衡量视觉稳定</text>
          <rect x="520" y="122" width="170" height="24" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="605" y="139" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">目标 &lt; 0.1</text>
          <text x="605" y="162" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">页面意外位移累积分数</text>
          <text x="605" y="178" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">图片无尺寸 / 字体闪跳</text>
          <text x="605" y="194" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">优化：预留占位、aspect-ratio</text>

          {/* 监控闭环 */}
          <rect x="30" y="218" width="680" height="44" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">采集 → 上报 → 分析 → 告警 → 优化</text>
          <text x="370" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">web-vitals 库采集 → beacon 上报 → 看板聚合 → 阈值告警 → 回到代码优化</text>

          {/* 三种监控手段 */}
          <rect x="30" y="278" width="220" height="100" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="140" y="298" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Lighthouse</text>
          <text x="140" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">实验室环境合成检测</text>
          <text x="140" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">固定网络 / 设备模拟</text>
          <text x="140" y="344" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CI 集成守阈值</text>
          <text x="140" y="364" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合发版前回归</text>

          <rect x="260" y="278" width="220" height="100" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="370" y="298" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">RUM 真实用户</text>
          <text x="370" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">线上真实设备 / 网络</text>
          <text x="370" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">web-vitals PerformanceObserver</text>
          <text x="370" y="344" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按地域 / 设备分桶</text>
          <text x="370" y="364" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">反映真实体验分布</text>

          <rect x="490" y="278" width="220" height="100" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="600" y="298" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">APM 全链路</text>
          <text x="600" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">前后端 + 资源加载串联</text>
          <text x="600" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">trace 追踪请求链路</text>
          <text x="600" y="344" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">定位瓶颈在哪一层</text>
          <text x="600" y="364" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合复杂分布式系统</text>

          {/* 底部总结 */}
          <rect x="30" y="394" width="680" height="44" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">性能监控三原则</text>
          <text x="370" y="428" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实验室测基线 + 真实用户看分布 + 全链路定位根因——缺一则盲</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能监控体系——LCP/INP/CLS 三大 Web Vitals 指标与 Lighthouse/RUM/APM 三层监控闭环
      </figcaption>
    </figure>
  );
}
