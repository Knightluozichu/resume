/**
 * <ClassDesignDiagram>：辅图——「类设计原则图」。
 *
 * 左侧「God Class」（danger 红）：一个大类做 5 件事（读配置、验证输入、
 * 计算价格、发送邮件、记录日志）。
 * 右侧拆成 5 个小类各做一件事（success 绿）。
 * 底部标注「高内聚低耦合 · 封装变化 · 依赖抽象」。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const LEFT_X = 40;
const LEFT_W = 240;
const LEFT_Y = 100;
const LEFT_H = 260;

const RIGHT_X = 340;
const RIGHT_W = 340;
const RIGHT_START_Y = 100;
const RIGHT_ITEM_H = 44;
const RIGHT_ITEM_GAP = 8;

const responsibilities = [
  { cls: "ConfigLoader", desc: "读取配置" },
  { cls: "InputValidator", desc: "验证输入" },
  { cls: "PriceCalculator", desc: "计算价格" },
  { cls: "EmailSender", desc: "发送邮件" },
  { cls: "Logger", desc: "记录日志" },
];

function rightItemY(index: number): number {
  return RIGHT_START_Y + index * (RIGHT_ITEM_H + RIGHT_ITEM_GAP);
}

export function ClassDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类设计原则图。左侧 God Class 用红色标注，一个大类做了五件事：读取配置、验证输入、计算价格、发送邮件、记录日志。右侧拆成五个小类各做一件事，用绿色标注：ConfigLoader、InputValidator、PriceCalculator、EmailSender、Logger。底部标注高内聚低耦合、封装变化、依赖抽象。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类设计：SRP 单一职责原则
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            一个类应该只有一个引起它变化的原因
          </text>

          {/* 列标题 */}
          <text x={LEFT_X + LEFT_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
            God Class（反面）
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
            职责拆分（正面）
          </text>

          {/* ===== 左侧 God Class ===== */}
          <rect
            x={LEFT_X}
            y={LEFT_Y}
            width={LEFT_W}
            height={LEFT_H}
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <text x={LEFT_X + LEFT_W / 2} y={LEFT_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">
            GodClass
          </text>
          <line x1={LEFT_X + 16} y1={LEFT_Y + 40} x2={LEFT_X + LEFT_W - 16} y2={LEFT_Y + 40} stroke="var(--danger)" strokeWidth="1" opacity="0.4" />
          {responsibilities.map((r, i) => (
            <text key={`god-${i}`} x={LEFT_X + 20} y={LEFT_Y + 64 + i * 36} fontSize="12" fill="var(--text-primary)">
              · {r.desc}
            </text>
          ))}
          <text x={LEFT_X + LEFT_W / 2} y={LEFT_Y + LEFT_H - 16} textAnchor="middle" fontSize="11" fill="var(--danger)">
            5 个职责 → 牵一发动全身
          </text>

          {/* 中间箭头 */}
          <line
            x1={LEFT_X + LEFT_W + 8}
            y1={LEFT_Y + LEFT_H / 2}
            x2={RIGHT_X - 8}
            y2={LEFT_Y + LEFT_H / 2}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#cd-arrow)"
          />
          <text x={(LEFT_X + LEFT_W + RIGHT_X) / 2} y={LEFT_Y + LEFT_H / 2 - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">
            拆分
          </text>

          {/* ===== 右侧 5 个小类 ===== */}
          {responsibilities.map((r, i) => (
            <g key={`cls-${i}`}>
              <rect
                x={RIGHT_X}
                y={rightItemY(i)}
                width={RIGHT_W}
                height={RIGHT_ITEM_H}
                rx="8"
                fill="var(--success)"
                fillOpacity="0.08"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text x={RIGHT_X + 16} y={rightItemY(i) + 28} fontSize="13" fontWeight="700" fill="var(--success)" fontFamily="monospace">
                {r.cls}
              </text>
              <text x={RIGHT_X + RIGHT_W - 16} y={rightItemY(i) + 28} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
                {r.desc}
              </text>
            </g>
          ))}

          {/* 底部原则 */}
          <line x1={40} y1={384} x2={VIEW_W - 40} y2={384} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            高内聚低耦合 · 封装变化 · 依赖抽象
          </text>
          <text x={VIEW_W / 2} y={428} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            每个类只做一件事，修改一个职责不影响其他职责
          </text>

          <defs>
            <marker id="cd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        God Class 把五件事塞进一个类，任何改动都可能影响其他职责，测试和维护困难。
        拆分成五个各司其职的小类后，每个类高内聚，类之间低耦合，修改和测试都更加安全。
      </figcaption>
    </figure>
  );
}
