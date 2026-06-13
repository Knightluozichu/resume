/**
 * <DepthPrecisionDiagram>：「深度测试」§4 非线性深度精度的配图（HEL-67，A 概念型）。
 *
 * 把「深度值非线性分布——精度堆在近处」掰碎成一眼能看懂的图：
 *  画一条从 near 到 far 的视图空间距离轴（横轴，等距均匀的真实距离），
 *  在轴上方标出深度值 0~1（纵向刻度），把「同样跨 0.1 的深度区间」对应回横轴的
 *  真实距离段——near 附近一小段距离就吃掉一大片深度精度（刻度密），
 *  far 附近一大段距离才挪动一点点深度（刻度稀）。
 *
 * 用 1/z 风格的反比例映射采样若干等距的深度刻度（0,0.1,…,1），算出各刻度对应的
 * 视图空间 z，落到横轴上——near 端刻度挤、far 端刻度疏，直观看出「近密远疏」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影（硬规则 5）。
 */

export function DepthPrecisionDiagram() {
  // 距离轴（视图空间真实距离）映射到 x∈[70,650]，near=1, far=50。
  const x0 = 70;
  const x1 = 650;
  const axisY = 200;
  const near = 1;
  const far = 50;

  // 真实距离 z（near..far）→ 横轴像素：等距均匀（横轴 = 真实世界等距）。
  const zToX = (z: number) => x0 + ((z - near) / (far - near)) * (x1 - x0);

  // 非线性深度（1/z 风格，与透视投影后的 z 缓冲一致）：
  // depth(z) = (far+near)/(far-near) /2 + 1/2 - (far*near/(far-near))/z  → 归一到 0..1。
  // 这里取教学常用的反算逆函数：给定等距的 depth 刻度，反求其对应的真实 z。
  // depth = far*(z-near) / (z*(far-near))  的逆：z = far*near / (far - depth*(far-near))
  const depthToZ = (d: number) => (far * near) / (far - d * (far - near));

  // 在 depth = 0,0.1,...,1.0 等距取 11 个刻度，画到距离轴上（near 端密、far 端疏）
  const depthTicks = Array.from({ length: 11 }, (_, i) => i / 10);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 280"
          role="img"
          aria-label="深度值非线性分布示意。一条横轴表示从近平面到远平面的真实世界距离，按真实距离等间隔铺开。把深度值从 0 到 1 等间隔取出十一个刻度，标到这条距离轴上：靠近近平面那一端的刻度挤成密密麻麻一簇，靠近远平面那一端的刻度则稀疏地拉得很开。这说明深度缓冲把绝大部分精度都堆在了离镜头很近的地方，越往远精度越粗——这就是非线性深度分布。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            非线性深度：精度都堆在近处
          </text>

          {/* 距离轴 */}
          <line
            x1={x0}
            y1={axisY}
            x2={x1 + 12}
            y2={axisY}
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 近 / 远平面端点标注 */}
          <line
            x1={x0}
            y1={axisY - 10}
            x2={x0}
            y2={axisY + 10}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={x0}
            y={axisY + 30}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            近平面 near
          </text>
          <line
            x1={x1}
            y1={axisY - 10}
            x2={x1}
            y2={axisY + 10}
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x={x1}
            y={axisY + 30}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            远平面 far
          </text>
          <text
            x={(x0 + x1) / 2}
            y={axisY + 52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            横轴 = 真实世界距离（等间隔）
          </text>

          {/* 深度刻度：等距 depth 0..1 落到距离轴上 → near 密、far 疏 */}
          {depthTicks.map((d) => {
            const x = zToX(depthToZ(d));
            return (
              <g key={d}>
                <line
                  x1={x}
                  y1={axisY - 6}
                  x2={x}
                  y2={axisY - 70}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
                <circle
                  cx={x}
                  cy={axisY - 70}
                  r="3"
                  fill="var(--text-primary)"
                />
              </g>
            );
          })}
          <text
            x={x0 + 4}
            y={axisY - 84}
            textAnchor="start"
            fontSize="11"
            fill="var(--text-primary)"
          >
            深度 0 → 1 等间隔取的刻度
          </text>
          <text
            x={x0 + 60}
            y={axisY - 22}
            textAnchor="start"
            fontSize="10"
            fill="var(--accent)"
          >
            ↑ 近处：一小段距离吃掉一大片精度（刻度密）
          </text>
          <text
            x={x1 - 4}
            y={axisY - 22}
            textAnchor="end"
            fontSize="10"
            fill="var(--warning)"
          >
            远处：一大段距离才挪一点（刻度稀）↑
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        把深度值 <code>0→1</code> 等间隔取刻度、标回真实距离轴：
        <strong>近平面附近刻度密、远平面附近刻度稀</strong>。深度缓冲与{" "}
        <code>1/z</code> 成正比，把绝大部分精度都<strong>堆在近处</strong>
        ，越远越粗——这就是「非线性深度」，也是后面 Z-fighting 易发于远处的根源。
      </figcaption>
    </figure>
  );
}
