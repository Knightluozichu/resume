/**
 * <CswTransformPerspectiveDiagram>：变换与透视图解。
 * 展示 transform 二维变换矩阵与 perspective 3D 透视。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswTransformPerspectiveDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="变换与透视图解：transform 与 perspective"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            变换与透视：transform 二维与 perspective 三维
          </text>

          {/* 左上：translate / scale / rotate */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">2D 变换函数</text>

          <rect x="50" y="70" width="130" height="60" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="92" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">translate</text>
          <text x="115" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">tx, ty 平移</text>
          <text x="115" y="122" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">不影响文档流</text>

          <rect x="195" y="70" width="130" height="60" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="260" y="92" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">scale</text>
          <text x="260" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">sx, sy 缩放</text>
          <text x="260" y="122" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">以中心为原点</text>

          <rect x="340" y="70" width="130" height="60" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="405" y="92" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">rotate</text>
          <text x="405" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">angle 旋转</text>
          <text x="405" y="122" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">默认绕 Z 轴</text>

          {/* transform-origin */}
          <rect x="50" y="140" width="420" height="44" rx="6" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="260" y="160" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">transform-origin（变换原点）</text>
          <text x="260" y="176" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">默认 50% 50%（中心），可改 top left / 0 0 等</text>

          {/* 右上：perspective 透视 */}
          <rect x="500" y="60" width="200" height="124" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="600" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">perspective 透视</text>

          {/* 视点 */}
          <circle cx="540" cy="110" r="4" fill="var(--accent)" />
          <text x="540" y="102" textAnchor="middle" fontSize="8" fill="var(--accent)">视点</text>

          {/* 透视锥 */}
          <line x1="540" y1="110" x2="640" y2="150" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="540" y1="110" x2="640" y2="92" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />

          {/* 原始平面 */}
          <rect x="620" y="100" width="50" height="42" rx="2" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="645" y="92" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">原平面</text>

          {/* 旋转后平面（梯形透视） */}
          <polygon points="625,150 665,150 655,92 635,92" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="645" y="166" textAnchor="middle" fontSize="7" fill="var(--danger)">rotateY 后</text>

          <text x="600" y="178" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">perspective: 800px（值小=透视强）</text>

          {/* 下半：变换矩阵与合成顺序 */}
          <rect x="40" y="200" width="660" height="80" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="222" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">transform 合成顺序：从右往左执行，不可交换</text>
          <text x="370" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">transform: translate(100px) rotate(45deg)</text>
          <text x="370" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">先 rotate 再 translate（绕原点旋转后再平移）</text>
          <text x="370" y="276" textAnchor="middle" fontSize="9" fill="var(--danger)">rotate(45deg) translate(100px) ≠ translate(100px) rotate(45deg)</text>

          {/* 3D 变换 */}
          <text x="370" y="306" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">3D 变换关键属性</text>

          <rect x="50" y="318" width="200" height="60" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">rotateX / rotateY</text>
          <text x="150" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">绕 X / Y 轴旋转</text>
          <text x="150" y="372" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">需父级 perspective</text>

          <rect x="270" y="318" width="200" height="60" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">translateZ</text>
          <text x="370" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Z 轴平移（近大远小）</text>
          <text x="370" y="372" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">正值靠近视点变大</text>

          <rect x="490" y="318" width="200" height="60" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">transform-style</text>
          <text x="590" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">preserve-3d</text>
          <text x="590" y="372" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">子元素保留 3D 空间</text>

          {/* 提示 */}
          <rect x="40" y="392" width="660" height="48" rx="8" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="414" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">transform 不触发重排（只合成），是最高性能的动画属性</text>
          <text x="370" y="430" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">配合 will-change / translateZ(0) 可强制提升合成层，避免重绘</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变换与透视——2D 变换函数、合成顺序、perspective 透视与 3D 空间属性
      </figcaption>
    </figure>
  );
}
