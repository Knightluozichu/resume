/**
 * <OpcPerfMindsetDiagram>：性能优化思维（optimized-cpp 性能思维章）。
 *
 * 左右对比：左侧「凭直觉优化」（红）——随机猜测、改非热点、白费功夫；
 * 右侧「测量驱动优化」（绿）——测量→分析→优化→验证闭环。
 * 中间一条分隔线，顶部标题。底部一条 90/10 法则说明栏。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function OpcPerfMindsetDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能优化思维对比图。左侧红色：凭直觉优化——随机猜测热点、改了非热点代码、白费功夫且引入回归。右侧绿色：测量驱动优化——先用 benchmark 建立基线、用剖析器定位真实热点、针对性优化、回到测量验证提速比。底部说明 90/10 法则：90% 的时间花在 10% 的代码上。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            性能优化思维 · 凭直觉 vs 测量驱动
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            不测量就优化 = 瞎猜；正确的姿势是测量→分析→优化→验证的闭环
          </text>

          {/* ===== 中间分隔线 ===== */}
          <line x1={VIEW_W / 2} y1="80" x2={VIEW_W / 2} y2="340" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="4 4" />

          {/* ===== 左侧：凭直觉优化（红）===== */}
          <rect x="40" y="84" width="300" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="190" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">凭直觉优化</text>

          {[
            { t: "1. 靠猜：觉得这里慢", y: 136 },
            { t: "2. 改了一段自认为热的代码", y: 168 },
            { t: "3. 其实不在热点上", y: 200 },
            { t: "4. 没提速，还引入了回归", y: 232 },
            { t: "5. 代码更难维护", y: 264 },
          ].map((item) => (
            <g key={item.y}>
              <rect x="56" y={item.y - 14} width="268" height="26" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <circle cx="70" cy={item.y - 1} r="3" fill="var(--danger)" />
              <text x="86" y={item.y + 3} fontSize="12" fill="var(--text-primary)">{item.t}</text>
            </g>
          ))}

          {/* ===== 右侧：测量驱动优化（绿）===== */}
          <rect x="380" y="84" width="300" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="530" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">测量驱动优化</text>

          {[
            { t: "1. 测量：建立性能基线", y: 136, c: "var(--accent)" },
            { t: "2. 分析：剖析器定位热点", y: 168, c: "var(--success)" },
            { t: "3. 优化：针对热点改代码", y: 200, c: "var(--warning)" },
            { t: "4. 验证：再跑 benchmark 对比", y: 232, c: "var(--danger)" },
            { t: "5. 确认提速且无回归", y: 264, c: "var(--accent)" },
          ].map((item) => (
            <g key={item.y}>
              <rect x="396" y={item.y - 14} width="268" height="26" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <circle cx="410" cy={item.y - 1} r="3" fill={item.c} />
              <text x="426" y={item.y + 3} fontSize="12" fill="var(--text-primary)">{item.t}</text>
            </g>
          ))}

          {/* ===== 右侧闭环箭头 ===== */}
          <path d="M530 280 C 530 300, 530 300, 530 300" fill="none" stroke="var(--success)" strokeWidth="1.4" strokeDasharray="4 3" />
          <path d="M534 296 L530 304 L526 296" fill="none" stroke="var(--success)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
          <text x="560" y="306" fontSize="11" fill="var(--text-secondary)">未达标则迭代</text>

          {/* ===== 底部 90/10 法则 ===== */}
          <rect x="60" y="360" width={VIEW_W - 120} height="56" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            90/10 法则：90% 的执行时间花在 10% 的代码上
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            性能优化的第一纪律：先找到那 10% 的热点，再把精力全部投入其中
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能优化的核心思维是测量驱动而非直觉驱动。先用剖析器定位真实热点（90/10 法则），再针对热点闭环优化，每一步都拿数据说话。
      </figcaption>
    </figure>
  );
}
