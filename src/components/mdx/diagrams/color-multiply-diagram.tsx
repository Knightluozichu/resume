/**
 * <ColorMultiplyDiagram>：颜色逐分量相乘图（LearnOpenGL · Colors）。
 *
 * 核心规则：反射所见 = 光源颜色 × 物体颜色，红配红、绿配绿、蓝配蓝逐分量相乘。
 * 上排白光示例（白光不改变物色），下排有色光示例（有色光给物色「染色」）。
 * 纯静态 SVG，viewBox 720×340，DESIGN token 配色（数据色块除外，颜色即数据）。
 */

const VIEW_W = 720;
const VIEW_H = 340;

type RGB = readonly [number, number, number];

const CHANNELS = [
  { name: "R", color: "#E5534B" },
  { name: "G", color: "#3FB97F" },
  { name: "B", color: "#5AA9E6" },
] as const;

function swatchFill(rgb: RGB): string {
  return `rgb(${rgb.map((v) => Math.round(v * 255)).join(",")})`;
}

function ColorColumn({
  x,
  y,
  rgb,
  label,
}: {
  x: number;
  y: number;
  rgb: RGB;
  label: string;
}) {
  const boxW = 120;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={boxW}
        height={54}
        rx={8}
        fill={swatchFill(rgb)}
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text
        x={x + boxW / 2}
        y={y + 72}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--text-primary)"
      >
        {label}
      </text>
      {CHANNELS.map((c, i) => {
        const barY = y + 84 + i * 20;
        const trackW = boxW - 22;
        return (
          <g key={c.name}>
            <text x={x} y={barY + 10} fontSize="10" fontWeight="700" fill={c.color}>
              {c.name}
            </text>
            <rect x={x + 18} y={barY} width={trackW} height={12} rx={3} fill="var(--border)" fillOpacity="0.35" />
            <rect x={x + 18} y={barY} width={trackW * rgb[i]} height={12} rx={3} fill={c.color} />
            <text x={x + boxW + 4} y={barY + 10} fontSize="9" fill="var(--text-secondary)">
              {rgb[i].toFixed(2)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function MultiplyRow({
  y,
  light,
  object,
  note,
}: {
  y: number;
  light: RGB;
  object: RGB;
  note: string;
}) {
  const result: RGB = [light[0] * object[0], light[1] * object[1], light[2] * object[2]];
  return (
    <g>
      <ColorColumn x={40} y={y} rgb={light} label="光源颜色" />
      <text x={215} y={y + 34} textAnchor="middle" fontSize="26" fontWeight="700" fill="var(--text-secondary)">
        ×
      </text>
      <ColorColumn x={270} y={y} rgb={object} label="物体颜色" />
      <text x={445} y={y + 34} textAnchor="middle" fontSize="26" fontWeight="700" fill="var(--text-secondary)">
        =
      </text>
      <ColorColumn x={500} y={y} rgb={result} label="反射所见" />
      <text x={VIEW_W / 2} y={y + 158} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
        {note}
      </text>
    </g>
  );
}

export function ColorMultiplyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="颜色逐分量相乘图。白光（1,1,1）乘橙色物体（1,0.5,0.31）仍是橙色，说明白光不改变物色；有色光（0.9,0.9,0.4）乘同一物体得到（0.9,0.45,0.12），说明有色光会给物色染色。每个通道红乘红、绿乘绿、蓝乘蓝。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <MultiplyRow
            y={20}
            light={[1.0, 1.0, 1.0]}
            object={[1.0, 0.5, 0.31]}
            note="白光（1,1,1）不改变物色——反射所见就是物体本来的颜色"
          />
          <MultiplyRow
            y={180}
            light={[0.9, 0.9, 0.4]}
            object={[1.0, 0.5, 0.31]}
            note="有色光（偏黄）给物色「染色」——每个通道各自相乘，结果偏向光的颜色"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        你看到的颜色 = 光源颜色 × 物体颜色，逐分量相乘（红×红、绿×绿、蓝×蓝）。
        白光下物体显本色，有色光下结果被光的颜色调制。
      </figcaption>
    </figure>
  );
}
