/**
 * <RtcdBvTypesDiagram>：四种包围体类型对比图解（球/AABB/OBB/k-DOP）。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 430;

export function RtcdBvTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="四种包围体类型对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            包围体类型：球的紧密性 vs 计算成本权衡
          </text>

          {/* 1. 包围球 */}
          <rect x="20" y="50" width="165" height="200" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="102" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">包围球 Sphere</text>
          <circle cx="102" cy="145" r="62" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.5" />
          {/* 内部不规则物体 */}
          <polygon points="78,120 130,110 140,150 110,175 75,160" fill="var(--text-tertiary)" fillOpacity="0.25" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="102" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相交检测：距离比较</text>
          <text x="102" y="246" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">最简单 · 旋转不变</text>

          {/* 2. AABB */}
          <rect x="195" y="50" width="165" height="200" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="277" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">AABB 轴对齐</text>
          <rect x="222" y="95" width="110" height="100" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="248,118 312,108 322,158 285,182 240,165" fill="var(--text-tertiary)" fillOpacity="0.25" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="277" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相交检测：3 轴区间重叠</text>
          <text x="277" y="246" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">最常用 · 旋转需重建</text>

          {/* 3. OBB */}
          <rect x="370" y="50" width="165" height="200" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="452" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">OBB 有向包围盒</text>
          <g transform="rotate(20 452 145)">
            <rect x="397" y="95" width="110" height="100" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          </g>
          <polygon points="425,120 478,108 488,158 458,182 412,162" fill="var(--text-tertiary)" fillOpacity="0.25" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="452" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相交检测：SAT 15 轴</text>
          <text x="452" y="246" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">紧密性好 · 旋转跟随</text>

          {/* 4. k-DOP */}
          <rect x="545" y="50" width="175" height="200" rx="10" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="632" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">k-DOP 多面体</text>
          {/* 8-DOP 六边形 */}
          <polygon points="632,85 690,120 690,170 632,205 575,170 575,120" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-primary)" strokeWidth="1.5" strokeOpacity="0.7" />
          <polygon points="610,118 665,108 675,158 645,182 600,165" fill="var(--text-tertiary)" fillOpacity="0.25" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="632" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">k 个固定法向半空间</text>
          <text x="632" y="246" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">最紧密 · k 越大越贴</text>

          {/* 权衡矩阵 */}
          <rect x="20" y="266" width="700" height="150" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="290" fontSize="12" fontWeight="600" fill="var(--accent)">权衡矩阵：紧密性 vs 检测成本</text>

          {/* 表头 */}
          <text x="50" y="314" fontSize="11" fontWeight="600" fill="var(--text-secondary)">类型</text>
          <text x="180" y="314" fontSize="11" fontWeight="600" fill="var(--text-secondary)">紧密性</text>
          <text x="320" y="314" fontSize="11" fontWeight="600" fill="var(--text-secondary)">相交检测成本</text>
          <text x="490" y="314" fontSize="11" fontWeight="600" fill="var(--text-secondary)">旋转更新</text>
          <text x="620" y="314" fontSize="11" fontWeight="600" fill="var(--text-secondary)">内存</text>

          <line x1="40" y1="322" x2="700" y2="322" stroke="var(--border)" strokeWidth="1" />

          <text x="50" y="342" fontSize="11" fill="var(--success)">球</text>
          <text x="180" y="342" fontSize="11" fill="var(--text-primary)">最低</text>
          <text x="320" y="342" fontSize="11" fill="var(--text-primary)">极低（1 次距离）</text>
          <text x="490" y="342" fontSize="11" fill="var(--text-primary)">最优（仅缩放半径）</text>
          <text x="620" y="342" fontSize="11" fill="var(--text-primary)">4 float</text>

          <text x="50" y="362" fontSize="11" fill="var(--accent)">AABB</text>
          <text x="180" y="362" fontSize="11" fill="var(--text-primary)">中等</text>
          <text x="320" y="362" fontSize="11" fill="var(--text-primary)">低（3 轴比较）</text>
          <text x="490" y="362" fontSize="11" fill="var(--text-primary)">需重建（重算 min/max）</text>
          <text x="620" y="362" fontSize="11" fill="var(--text-primary)">6 float</text>

          <text x="50" y="382" fontSize="11" fill="var(--warning)">OBB</text>
          <text x="180" y="382" fontSize="11" fill="var(--text-primary)">高</text>
          <text x="320" y="382" fontSize="11" fill="var(--text-primary)">高（SAT 15 轴）</text>
          <text x="490" y="382" fontSize="11" fill="var(--text-primary)">优（乘旋转矩阵）</text>
          <text x="620" y="382" fontSize="11" fill="var(--text-primary)">15 float</text>

          <text x="50" y="402" fontSize="11" fill="var(--text-primary)">k-DOP</text>
          <text x="180" y="402" fontSize="11" fill="var(--text-primary)">最高</text>
          <text x="320" y="402" fontSize="11" fill="var(--text-primary)">中（k/2 区间）</text>
          <text x="490" y="402" fontSize="11" fill="var(--text-primary)">中（投影顶点）</text>
          <text x="620" y="402" fontSize="11" fill="var(--text-primary)">2k float</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种包围体——球最简单、AABB 最常用、OBB 最贴合旋转体、k-DOP 最紧密
      </figcaption>
    </figure>
  );
}
