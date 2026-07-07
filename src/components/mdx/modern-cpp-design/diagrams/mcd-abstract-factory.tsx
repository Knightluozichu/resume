/**
 * <McdAbstractFactoryDiagram>：基于 typelist 的抽象工厂。
 *
 * 左侧输入 typelist（Wall, Door, Roof），中间 AbstractFactory 据此自动生成
 * MakeWall/MakeDoor/MakeRoof 接口，右侧 ConcreteFactory 提供具体实现。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const TYPES = ["Wall", "Door", "Roof"];

const TL_X = 40;
const TL_Y = 90;
const TL_W = 180;
const TL_H = 240;

const IF_X = 250;
const IF_Y = 90;
const IF_W = 230;
const IF_H = 240;

const CF_X = 510;
const CF_Y = 90;
const CF_W = 170;
const CF_H = 240;

const rowY = (i: number) => 150 + i * 56;

export function McdAbstractFactoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="抽象工厂示意。左侧 typelist 输入含 Wall、Door、Roof 三个类型；中间 AbstractFactory 据此自动生成 MakeWall、MakeDoor、MakeRoof 三个接口；右侧 ConcreteFactory 提供具体实现。三者用箭头连接。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mcd-af-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            抽象工厂：typelist 自动生成接口
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            一份类型列表 → 一组 Make 接口 → 一个具体工厂，免手写样板
          </text>

          {/* 左：typelist */}
          <rect x={TL_X} y={TL_Y} width={TL_W} height={TL_H} rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.6" />
          <text x={TL_X + TL_W / 2} y={TL_Y + 26} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            typelist 输入
          </text>
          <line x1={TL_X + 14} y1={TL_Y + 38} x2={TL_X + TL_W - 14} y2={TL_Y + 38} stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          {TYPES.map((t, i) => (
            <g key={t}>
              <rect x={TL_X + 20} y={rowY(i)} width={TL_W - 40} height={42} rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
              <text x={TL_X + TL_W / 2} y={rowY(i) + 27} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                {t}
              </text>
            </g>
          ))}

          {/* 左 → 中 箭头 */}
          <line x1={TL_X + TL_W} y1={TL_Y + TL_H / 2} x2={IF_X - 6} y2={IF_Y + IF_H / 2} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-af-arrow)" />
          <text x={(TL_X + TL_W + IF_X) / 2} y={TL_Y + TL_H / 2 - 8} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            自动生成
          </text>

          {/* 中：自动接口 */}
          <rect x={IF_X} y={IF_Y} width={IF_W} height={IF_H} rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.6" />
          <text x={IF_X + IF_W / 2} y={IF_Y + 26} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--success)" fontFamily="monospace">
            AbstractFactory 接口
          </text>
          <line x1={IF_X + 14} y1={IF_Y + 38} x2={IF_X + IF_W - 14} y2={IF_Y + 38} stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          {TYPES.map((t, i) => (
            <g key={t}>
              <rect x={IF_X + 20} y={rowY(i)} width={IF_W - 40} height={42} rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
              <text x={IF_X + IF_W / 2} y={rowY(i) + 27} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)" fontFamily="monospace">
                {`Make${t}()`}
              </text>
            </g>
          ))}

          {/* 中 → 右 箭头 */}
          <line x1={IF_X + IF_W} y1={IF_Y + IF_H / 2} x2={CF_X - 6} y2={CF_Y + CF_H / 2} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-af-arrow)" />
          <text x={(IF_X + IF_W + CF_X) / 2} y={IF_Y + IF_H / 2 - 8} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            实现
          </text>

          {/* 右：具体工厂 */}
          <rect x={CF_X} y={CF_Y} width={CF_W} height={CF_H} rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.6" />
          <text x={CF_X + CF_W / 2} y={CF_Y + 26} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--warning)" fontFamily="monospace">
            ConcreteFactory
          </text>
          <line x1={CF_X + 14} y1={CF_Y + 38} x2={CF_X + CF_W - 14} y2={CF_Y + 38} stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          {TYPES.map((t, i) => (
            <g key={t}>
              <rect x={CF_X + 16} y={rowY(i)} width={CF_W - 32} height={42} rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
              <text x={CF_X + CF_W / 2} y={rowY(i) + 27} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                {`new ${t}`}
              </text>
            </g>
          ))}

          {/* 底部说明 */}
          <line x1={32} y1={436} x2={VIEW_W - 32} y2={436} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={458} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            一份 typelist 即一组产品族接口，编译时展开，手写零样板
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        抽象工厂基于 typelist 自动生成一组 Make 接口，ConcreteFactory 提供具体实现，免手写样板。
      </figcaption>
    </figure>
  );
}
