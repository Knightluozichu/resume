/**
 * <MglGraphTheoryDiagram>：图论核心概念图解（mgl-graph-theory 章）。
 *
 * 左侧：欧拉路径判定条件 + 哥尼斯堡七桥。
 * 右侧：哈密顿回路 + 树/生成树。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function MglGraphTheoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="图论核心概念图解。左侧欧拉路径：哥尼斯堡七桥的 4 个顶点度数 3,3,3,5 全是奇数，4 个奇度顶点不满足条件（需 0 或 2 个），故不存在欧拉路径。右侧上方哈密顿回路：经过每个顶点一次（NP 完全问题）。右侧下方树：n 个顶点 n-1 条边的连通无环图。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>图论：欧拉、哈密顿与树</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>欧拉过边　哈密顿过点　树是无环连通图</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：欧拉路径 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>欧拉路径（过每条边一次）</text>

          {/* 哥尼斯堡简化图 */}
          <circle cx="120" cy="130" r="16" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="120" y="134" textAnchor="middle" fontSize="11" fill={accent}>A</text>
          <circle cx="240" cy="130" r="16" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="240" y="134" textAnchor="middle" fontSize="11" fill={accent}>B</text>
          <circle cx="120" cy="200" r="16" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="120" y="204" textAnchor="middle" fontSize="11" fill={accent}>C</text>
          <circle cx="240" cy="200" r="16" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.5" />
          <text x="240" y="204" textAnchor="middle" fontSize="11" fill={danger}>D</text>

          {/* 边 */}
          <line x1="136" y1="130" x2="224" y2="130" stroke={border} strokeWidth="1.2" />
          <line x1="136" y1="125" x2="224" y2="125" stroke={border} strokeWidth="1.2" />
          <line x1="120" y1="146" x2="120" y2="184" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="240" y2="184" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="136" y2="184" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="136" y2="190" stroke={border} strokeWidth="1.2" />
          <line x1="240" y1="146" x2="136" y2="196" stroke={border} strokeWidth="1.2" />

          <text x="60" y="250" fontSize="11" fontWeight="700" fill={danger}>哥尼斯堡七桥</text>
          <text x="60" y="268" fontSize="11" fill={primary}>度数: A=3, B=3, C=3, D=5</text>
          <text x="60" y="286" fontSize="11" fill={danger}>4 个奇度顶点 → 不存在！</text>

          <rect x="48" y="302" width="256" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="322" fontSize="11" fontWeight="700" fill={success}>欧拉路径判定条件</text>
          <text x="64" y="340" fontSize="11" fill={primary}>0 个奇度 → 欧拉回路</text>
          <text x="64" y="356" fontSize="11" fill={primary}>2 个奇度 → 欧拉路径</text>

          {/* ===== 右侧：哈密顿 + 树 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>哈密顿回路（过每点一次）</text>

          {/* 五边形 */}
          <polygon points="500,130 560,130 580,170 530,200 480,170" fill="none" stroke={warning} strokeWidth="1.5" />
          {[{x:500,y:130},{x:560,y:130},{x:580,y:170},{x:530,y:200},{x:480,y:170}].map((v, i) => (
            <g key={i}>
              <circle cx={v.x} cy={v.y} r="10" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
              <text x={v.x} y={v.y + 4} textAnchor="middle" fontSize="10" fill={warning}>{i+1}</text>
            </g>
          ))}
          <text x="530" y="226" textAnchor="middle" fontSize="11" fill={secondary}>判定 NP 完全 · TSP 是优化版</text>

          {/* 树 */}
          <text x="530" y="252" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>树（无环连通图）</text>

          <line x1="530" y1="268" x2="500" y2="292" stroke={border} strokeWidth="1.2" />
          <line x1="530" y1="268" x2="560" y2="292" stroke={border} strokeWidth="1.2" />
          <line x1="500" y1="292" x2="480" y2="320" stroke={border} strokeWidth="1.2" />
          <line x1="500" y1="292" x2="520" y2="320" stroke={border} strokeWidth="1.2" />

          <circle cx="530" cy="268" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="500" cy="292" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="560" cy="292" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="480" cy="320" r="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <circle cx="520" cy="320" r="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />

          <text x="530" y="348" textAnchor="middle" fontSize="11" fill={primary}>n 个顶点 → n-1 条边</text>
          <text x="530" y="366" textAnchor="middle" fontSize="11" fill={secondary}>任意两点路径唯一</text>

          <rect x="360" y="380" width="312" height="22" rx="6" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="516" y="395" textAnchor="middle" fontSize="10" fill={secondary}>MST: Kruskal/Prim 求最小生成树</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        欧拉路径过每条边一次（判定简单：奇度顶点 0 或 2 个），哈密顿回路过每点一次（NP 完全）。树是 n 顶点 n-1 边的无环连通图，是数据结构中树结构的数学基础。
      </figcaption>
    </figure>
  );
}
