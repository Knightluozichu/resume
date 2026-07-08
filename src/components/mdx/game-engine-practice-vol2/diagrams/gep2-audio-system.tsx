/**
 * <Gep2AudioSystemDiagram>：音频系统——3D音频与混音图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2AudioSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="音频系统3D音频与混音图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            音频系统：声源 → 空间化 → 混音 → 输出
          </text>

          {/* 声源行 */}
          <text
            x="50"
            y="68"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            声源 Emitters
          </text>
          {[
            { x: 50, label: "脚步声", c: "var(--success)" },
            { x: 200, label: "枪声", c: "var(--danger)" },
            { x: 350, label: "背景音乐", c: "var(--accent)" },
            { x: 500, label: "语音", c: "var(--warning)" },
          ].map((s, i) => (
            <g key={i}>
              <rect
                x={s.x}
                y="78"
                width="130"
                height="42"
                rx="8"
                fill={s.c}
                fillOpacity="0.14"
                stroke={s.c}
                strokeWidth="1.2"
              />
              <text
                x={s.x + 65}
                y="104"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              {i < 3 && (
                <text
                  x={s.x + 138}
                  y="104"
                  textAnchor="middle"
                  fontSize="14"
                  fill="var(--text-tertiary)"
                >
                  &rarr;
                </text>
              )}
            </g>
          ))}

          {/* 空间化层 */}
          <text
            x="50"
            y="148"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            3D 空间化 Spatialization
          </text>
          <rect
            x="30"
            y="158"
            width="680"
            height="96"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <rect
            x="50"
            y="174"
            width="200"
            height="64"
            rx="8"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="150"
            y="194"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            距离衰减 Attenuation
          </text>
          <text x="60" y="212" fontSize="10" fill="var(--text-secondary)">
            音量 ∝ 1 / distance
          </text>
          <text x="60" y="228" fontSize="10" fill="var(--text-tertiary)">
            近场不放大、远场渐隐至 0
          </text>

          <rect
            x="270"
            y="174"
            width="200"
            height="64"
            rx="8"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="194"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            声像 Panning
          </text>
          <text x="280" y="212" fontSize="10" fill="var(--text-secondary)">
            按声源相对听众方位
          </text>
          <text x="280" y="228" fontSize="10" fill="var(--text-tertiary)">
            分配到左右声道（HRTF 立体）
          </text>

          <rect
            x="490"
            y="174"
            width="200"
            height="64"
            rx="8"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="590"
            y="194"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            多普勒 / 遮挡
          </text>
          <text x="500" y="212" fontSize="10" fill="var(--text-secondary)">
            相对速度变调
          </text>
          <text x="500" y="228" fontSize="10" fill="var(--text-tertiary)">
            几何遮挡低通滤波
          </text>

          {/* 混音总线 */}
          <text
            x="50"
            y="280"
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            混音总线 Mix Bus
          </text>
          <rect
            x="30"
            y="290"
            width="680"
            height="76"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.05"
            stroke="var(--warning)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {[
            { x: 50, label: "SFX 总线", sub: "音效" },
            { x: 200, label: "Music 总线", sub: "音乐" },
            { x: 350, label: "Voice 总线", sub: "语音" },
          ].map((s, i) => (
            <g key={i}>
              <rect
                x={s.x}
                y="302"
                width="130"
                height="50"
                rx="8"
                fill="var(--warning)"
                fillOpacity="0.14"
                stroke="var(--warning)"
                strokeWidth="1.2"
              />
              <text
                x={s.x + 65}
                y="322"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={s.x + 65}
                y="340"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.sub}
              </text>
              {i < 2 && (
                <text
                  x={s.x + 138}
                  y="328"
                  textAnchor="middle"
                  fontSize="14"
                  fill="var(--text-tertiary)"
                >
                  &rarr;
                </text>
              )}
            </g>
          ))}

          <rect
            x="500"
            y="302"
            width="190"
            height="50"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.14"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="595"
            y="322"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Master 主总线
          </text>
          <text
            x="595"
            y="340"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            压限 + 响度归一
          </text>

          {/* 输出 */}
          <text
            x={VIEW_W / 2}
            y="392"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            输出：DAC → 扬声器（总线分层便于独立调音量、闪避 Ducking）
          </text>
          <text
            x={VIEW_W / 2}
            y="410"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            关键：3D 化只对 SFX 做，音乐/语音走非空间化总线，避免「歌手绕头跑」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        音频系统——声源经 3D 空间化后按总线混音，主总线统一压限输出
      </figcaption>
    </figure>
  );
}
