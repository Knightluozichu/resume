/**
 * <MicrofacetSurfaceDiagram>：「PBR·理论」§3.1「微表面理论」小节配图（HEL-162，B 数学型）。
 *
 * 左右两栏对照同一块表面在「光滑」vs「粗糙」两种情况下微表面朝向对反射的影响：
 *  左栏「光滑」：微表面朝向一致（排列整齐），入射光被统一反射到同一方向，高光清晰锐利。
 *  右栏「粗糙」：微表面朝向随机（杂乱），入射光被散射到各个方向，高光弥散模糊。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function MicrofacetSurfaceDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 700 320"
          role="img"
          aria-label="微表面理论对照图。左栏光滑表面：微表面朝向一致排列整齐，入射光被统一反射到同一方向，形成清晰锐利的高光。右栏粗糙表面：微表面朝向随机杂乱，入射光被散射到各个方向，高光弥散模糊。粗糙度越高微表面越随机，反射越分散。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <defs>
            <marker
              id="msd-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="msd-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            <marker
              id="msd-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* ============ 左栏：光滑表面 ============ */}
          <text
            x="175"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            光滑（roughness 低）
          </text>

          {/* 宏观表面 */}
          <rect
            x="40"
            y="200"
            width="270"
            height="8"
            rx="2"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 微表面：排列整齐的小斜面 */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x = 55 + i * 28;
            return (
              <line
                key={`smooth-${i}`}
                x1={x}
                y1={200}
                x2={x + 22}
                y2={200}
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* 入射光（单束） */}
          <line
            x1="100"
            y1="60"
            x2="160"
            y2="190"
            stroke="var(--warning)"
            strokeWidth="2"
            markerEnd="url(#msd-arrow-warning)"
          />
          <text x="84" y="56" fontSize="11" fill="var(--warning)">
            入射光
          </text>

          {/* 反射光：集中到同一方向 */}
          {[-6, 0, 6].map((offset, i) => (
            <line
              key={`refl-smooth-${i}`}
              x1="160"
              y1="190"
              x2={220 + offset}
              y2={60 + Math.abs(offset) * 0.5}
              stroke="var(--accent)"
              strokeWidth="1.8"
              markerEnd="url(#msd-arrow-accent)"
            />
          ))}
          <text x="222" y="50" fontSize="11" fill="var(--accent)">
            反射集中
          </text>

          {/* 法线箭头：统一朝上 */}
          {[0, 1, 2, 3].map((i) => {
            const x = 80 + i * 60;
            return (
              <line
                key={`n-smooth-${i}`}
                x1={x}
                y1={200}
                x2={x}
                y2={168}
                stroke="var(--text-secondary)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}
          <text
            x="175"
            y="162"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            微面法线对齐
          </text>

          {/* 结论标签 */}
          <text
            x="175"
            y="240"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            高光锐利清晰
          </text>
          <text
            x="175"
            y="260"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            微面朝向一致 → 反射方向集中
          </text>

          {/* 分隔线 */}
          <line
            x1="350"
            y1="40"
            x2="350"
            y2="280"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：粗糙表面 ============ */}
          <text
            x="525"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            粗糙（roughness 高）
          </text>

          {/* 宏观表面 */}
          <rect
            x="390"
            y="200"
            width="270"
            height="8"
            rx="2"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 微表面：朝向随机的小斜面 */}
          {[
            { x: 405, a: -18 },
            { x: 433, a: 12 },
            { x: 458, a: -28 },
            { x: 483, a: 22 },
            { x: 510, a: -8 },
            { x: 535, a: 30 },
            { x: 558, a: -22 },
            { x: 583, a: 15 },
            { x: 610, a: -30 },
          ].map(({ x, a }, i) => {
            const rad = (a * Math.PI) / 180;
            const halfLen = 11;
            return (
              <line
                key={`rough-${i}`}
                x1={x - halfLen * Math.cos(rad)}
                y1={200 + halfLen * Math.sin(rad)}
                x2={x + halfLen * Math.cos(rad)}
                y2={200 - halfLen * Math.sin(rad)}
                stroke="var(--danger)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* 入射光 */}
          <line
            x1="450"
            y1="60"
            x2="510"
            y2="190"
            stroke="var(--warning)"
            strokeWidth="2"
            markerEnd="url(#msd-arrow-warning)"
          />
          <text x="434" y="56" fontSize="11" fill="var(--warning)">
            入射光
          </text>

          {/* 反射光：散射到各个方向 */}
          {[
            { dx: -60, dy: -110 },
            { dx: -20, dy: -125 },
            { dx: 20, dy: -120 },
            { dx: 55, dy: -100 },
            { dx: 80, dy: -70 },
            { dx: -45, dy: -80 },
            { dx: 65, dy: -115 },
          ].map(({ dx, dy }, i) => (
            <line
              key={`refl-rough-${i}`}
              x1="510"
              y1="190"
              x2={510 + dx}
              y2={190 + dy}
              stroke="var(--danger)"
              strokeWidth="1.2"
              opacity="0.7"
              markerEnd="url(#msd-arrow-danger)"
            />
          ))}
          <text x="575" y="66" fontSize="11" fill="var(--danger)">
            反射分散
          </text>

          {/* 法线箭头：朝向各异 */}
          {[
            { x: 430, a: 12 },
            { x: 490, a: -20 },
            { x: 550, a: 25 },
            { x: 610, a: -15 },
          ].map(({ x, a }, i) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={`n-rough-${i}`}
                x1={x}
                y1={200}
                x2={x - 28 * Math.sin(rad)}
                y2={200 - 28 * Math.cos(rad)}
                stroke="var(--text-secondary)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}
          <text
            x="525"
            y="162"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            微面法线随机
          </text>

          {/* 结论标签 */}
          <text
            x="525"
            y="240"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            高光弥散模糊
          </text>
          <text
            x="525"
            y="260"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            微面朝向随机 → 反射方向分散
          </text>

          {/* 底部总结 */}
          <text
            x="350"
            y="298"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            粗糙度 = 微表面朝向的「混乱程度」，越高反射越分散
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        微表面理论：表面由无数微小镜面组成。光滑表面微面朝向一致、反射集中（左）；粗糙表面微面随机、反射分散（右）。
      </figcaption>
    </figure>
  );
}
