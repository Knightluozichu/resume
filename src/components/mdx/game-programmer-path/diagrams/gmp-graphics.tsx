/**
 * <GmpGraphicsDiagram>：图形学与渲染管线图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpGraphicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="图形学与渲染管线图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            渲染管线：从 3D 顶点到 2D 像素
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            顶点着色 → 裁剪 → 光栅化 → 片段着色 → 输出合并
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="110" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">顶点着色</text>
          <text x="115" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">坐标变换</text>
          <text x="115" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">模型→投影</text>

          <text x="180" y="128" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="195" y="100" width="110" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="250" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">裁剪</text>
          <text x="250" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">视锥体剔除</text>
          <text x="250" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">去掉视野外</text>

          <text x="315" y="128" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="330" y="100" width="110" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="385" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">光栅化</text>
          <text x="385" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">三角形→像素</text>
          <text x="385" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">生成片段</text>

          <text x="450" y="128" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="465" y="100" width="110" height="56" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="520" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">片段着色</text>
          <text x="520" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">纹理+光照</text>
          <text x="520" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">计算颜色</text>

          <text x="585" y="128" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="600" y="100" width="90" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="645" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">输出合并</text>
          <text x="645" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">深度+混合</text>
          <text x="645" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可见性</text>

          <text x={VIEW_W / 2} y="188" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            DrawCall 优化
          </text>

          <rect x="70" y="200" width="180" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="160" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">逐个绘制</text>
          <text x="160" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">1000 DrawCall</text>
          <text x="160" y="250" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">CPU 瓶颈</text>

          <text x="275" y="228" textAnchor="middle" fontSize="12" fill="var(--accent)">&rarr; 合并 &rarr;</text>

          <rect x="420" y="200" width="240" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="540" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">合批/实例化</text>
          <text x="540" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">~50 DrawCall</text>
          <text x="540" y="250" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">静态合批/实例化/图集</text>

          <text x={VIEW_W / 2} y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            CPU 端剔除：视锥体剔除 + 遮挡剔除 + 距离剔除
          </text>
          <text x={VIEW_W / 2} y="306" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            每个DrawCall有固定CPU开销，即使画一个三角形也要付
          </text>
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            着色器：顶点（坐标变换）+ 片段（像素颜色）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染管线——从顶点到像素的完整流程与 DrawCall 优化
      </figcaption>
    </figure>
  );
}
