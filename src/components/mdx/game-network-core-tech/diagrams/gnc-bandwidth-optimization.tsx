/**
 * <GncBandwidthOptimizationDiagram>：带宽优化——全量 vs Delta、位打包与量化图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncBandwidthOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="带宽优化 Delta 压缩位打包量化图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            带宽优化：Delta 压缩 + 位打包 + 量化
          </text>

          {/* 上方：全量 vs Delta */}
          <rect x="20" y="48" width="340" height="140" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">全量快照（不压缩）</text>

          <rect x="40" y="80" width="60" height="26" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="70" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">位置</text>
          <rect x="106" y="80" width="60" height="26" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="136" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">朝向</text>
          <rect x="172" y="80" width="60" height="26" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="202" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">速度</text>
          <rect x="238" y="80" width="60" height="26" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="268" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">血量</text>

          <text x="190" y="126" textAnchor="middle" fontSize="10" fill="var(--danger)">每帧传全部字段 = 大量带宽浪费</text>
          <text x="190" y="144" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">4 × 32bit float = 128 bit/字段</text>
          <text x="190" y="162" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">100 对象 × 20Hz = 灾难</text>

          <rect x="380" y="48" width="340" height="140" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Delta 压缩（只传变化）</text>

          {/* 变更位掩码 */}
          <rect x="400" y="80" width="300" height="26" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="97" textAnchor="start" fontSize="9" fill="var(--success)">掩码</text>
          <text x="450" y="97" textAnchor="start" fontSize="9" fill="var(--text-secondary)">1</text>
          <text x="470" y="97" textAnchor="start" fontSize="9" fill="var(--danger)">0</text>
          <text x="490" y="97" textAnchor="start" fontSize="9" fill="var(--danger)">0</text>
          <text x="510" y="97" textAnchor="start" fontSize="9" fill="var(--success)">1</text>
          <text x="530" y="97" textAnchor="start" fontSize="9" fill="var(--danger)">0</text>
          <text x="550" y="97" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">→ 只传位置 + 血量</text>

          <rect x="400" y="114" width="130" height="24" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="465" y="130" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">位置（变化）</text>
          <rect x="540" y="114" width="130" height="24" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="605" y="130" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">血量（变化）</text>

          <text x="550" y="158" textAnchor="middle" fontSize="10" fill="var(--success)">只传 2/5 字段 = 节省 60%</text>
          <text x="550" y="176" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">基准丢了 → 周期穿插全量快照修复</text>

          {/* 下方：位打包 */}
          <rect x="20" y="204" width="340" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="224" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">位打包：打破字节边界</text>

          <text x="40" y="246" fontSize="9" fill="var(--text-secondary)">默认 int：血量(32bit) + ID(32bit) = 64bit = 8 字节</text>
          <rect x="40" y="252" width="140" height="20" rx="3" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="110" y="266" textAnchor="middle" fontSize="8" fill="var(--danger)">血量 32bit（浪费）</text>
          <rect x="184" y="252" width="140" height="20" rx="3" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="254" y="266" textAnchor="middle" fontSize="8" fill="var(--danger)">ID 32bit（浪费）</text>

          <text x="40" y="292" fontSize="9" fill="var(--text-secondary)">位打包：血量(7bit) + ID(6bit) = 13bit ≈ 1.6 字节</text>
          <rect x="40" y="298" width="50" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="65" y="312" textAnchor="middle" fontSize="8" fill="var(--success)">血 7bit</text>
          <rect x="94" y="298" width="42" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="115" y="312" textAnchor="middle" fontSize="8" fill="var(--success)">ID 6bit</text>
          <text x="150" y="312" fontSize="9" fill="var(--success)">省 80%</text>

          <text x="190" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">按实际取值范围分配最少 bit</text>

          {/* 量化 */}
          <rect x="380" y="204" width="340" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="224" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">量化：精度够用就行</text>

          <text x="400" y="246" fontSize="9" fill="var(--text-secondary)">浮点坐标 x=123.456789 → 32bit</text>
          <rect x="400" y="252" width="300" height="20" rx="3" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="550" y="266" textAnchor="middle" fontSize="8" fill="var(--danger)">float 32bit（毫米级精度，游戏不需要）</text>

          <text x="400" y="292" fontSize="9" fill="var(--text-secondary)">量化到厘米：(int)(x×100) → 16bit</text>
          <rect x="400" y="298" width="150" height="20" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="475" y="312" textAnchor="middle" fontSize="8" fill="var(--success)">int16 厘米级</text>
          <text x="560" y="312" fontSize="9" fill="var(--success)">省 50%</text>

          <text x="550" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">四元数：3×9bit + 2bit = 29bit（省 75%）</text>

          {/* 三件套总结 */}
          <rect x="20" y="340" width="700" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">三件套组合效果</text>
          <text x="370" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全量 128bit/字段 → Delta 掩码 5bit + 位打包 13bit + 量化 16bit</text>
          <text x="370" y="400" textAnchor="middle" fontSize="10" fill="var(--success)">综合压缩率可达 90%+，KB 级状态压到字节级</text>
          <text x="370" y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：不是所有字段都需要可靠传输，全量快照周期穿插修复基准丢失</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        带宽优化——Delta 压缩只传变化、位打包打破字节边界、量化精度截断三件套
      </figcaption>
    </figure>
  );
}
