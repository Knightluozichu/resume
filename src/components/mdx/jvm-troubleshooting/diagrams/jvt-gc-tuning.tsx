/**
 * <JvtGcTuningDiagram>：GC 调优实践图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JvtGcTuningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GC调优实践图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GC 调优：目标矛盾 + G1 参数 + 排查流程
          </text>

          {/* 停顿 vs 吞吐矛盾 */}
          <text x="40" y="54" fontSize="13" fontWeight="600" fill="var(--warning)">调优两大目标的矛盾</text>

          <rect x="40" y="62" width="300" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="190" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">低停顿 Low Latency</text>
          <text x="190" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少 STW 时间</text>
          <text x="190" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">CMS/G1 并发+增量</text>
          <text x="190" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">在线服务优先</text>

          <text x="370" y="104" textAnchor="middle" fontSize="16" fill="var(--danger)">vs</text>

          <rect x="400" y="62" width="300" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="550" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">高吞吐 High Throughput</text>
          <text x="550" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少 GC 时间占比</text>
          <text x="550" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Parallel 一次性回收</text>
          <text x="550" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">批处理优先</text>

          <text x="370" y="168" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">业务定优先级：在线交易 &rarr; 停顿，离线计算 &rarr; 吞吐</text>

          {/* G1 关键参数 */}
          <text x="40" y="194" fontSize="13" fontWeight="600" fill="var(--success)">G1 关键参数</text>

          <rect x="40" y="202" width="340" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="210" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">MaxGCPauseMillis=200</text>
          <text x="210" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">期望最大停顿(ms)，目标非保证</text>

          <rect x="390" y="202" width="310" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">IHOP=45</text>
          <text x="545" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">堆使用率触发并发标记</text>

          <rect x="40" y="254" width="340" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="210" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">G1HeapRegionSize=2m-32m</text>
          <text x="210" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Region 大小，大对象调大</text>

          <rect x="390" y="254" width="310" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">G1ReservePercent=10</text>
          <text x="545" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">预留内存防疏散失败</text>

          {/* 排查流程 */}
          <text x="40" y="324" fontSize="13" fontWeight="600" fill="var(--danger)">频繁 Full GC 排查流程（证据驱动）</text>

          <rect x="40" y="334" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="105" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">1. jstat 确认</text>
          <text x="105" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Full GC 频率</text>

          <text x="180" y="360" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="195" y="334" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="260" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">2. 开 GC 日志</text>
          <text x="260" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">-Xlog:gc*</text>

          <text x="335" y="360" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="334" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="415" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">3. 分析原因</text>
          <text x="415" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">看 GC 原因</text>

          <text x="490" y="360" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="505" y="334" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="570" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">4. dump+MAT</text>
          <text x="570" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">找泄漏对象</text>

          <text x="645" y="360" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="660" y="334" width="60" height="50" rx="6" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1.2" />
          <text x="690" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">5. 调参</text>
          <text x="690" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">验证</text>

          {/* 健康标准 */}
          <rect x="40" y="400" width="660" height="44" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">健康标准</text>
          <text x="370" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Full GC 趋近 0 / Young GC 停顿在目标内 / 吞吐 &gt; 95%</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GC 调优——停顿与吞吐矛盾、G1 关键参数（MaxGCPauseMillis/IHOP/Region）、频繁 Full GC 证据驱动排查流程
      </figcaption>
    </figure>
  );
}
