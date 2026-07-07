/**
 * <CleanCodeValueDiagram>：辅图——「整洁代码的价值对比图」。
 *
 * 左侧「烂代码」（danger 红）：命名模糊、函数过长、重复代码、深嵌套。
 * 右侧「整洁代码」（success 绿）：清晰命名、短小函数、DRY 原则、扁平结构。
 * 中间箭头标注「重构」，表示从烂代码到整洁代码的转化路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const BOX_W = 240;
const BOX_H = 60;
const BOX_GAP = 12;
const BOX_START_Y = 104;

const LEFT_X = 40;
const RIGHT_X = 440;

interface Symptom {
  title: string;
  desc: string;
}

const badCode: Symptom[] = [
  { title: "命名模糊", desc: "d、data、tmp 让人猜不透" },
  { title: "函数过长", desc: "上百行做七八件事" },
  { title: "重复代码", desc: "复制粘贴四处蔓延" },
  { title: "深嵌套", desc: "if-for-if-for 难以阅读" },
];

const cleanCode: Symptom[] = [
  { title: "清晰命名", desc: "daysSinceCreation 一目了然" },
  { title: "短小函数", desc: "20 行内只做一件事" },
  { title: "DRY 原则", desc: "抽取公共逻辑，单一来源" },
  { title: "扁平结构", desc: "卫语句提前返回，层级清晰" },
];

function boxY(index: number): number {
  return BOX_START_Y + index * (BOX_H + BOX_GAP);
}

export function CleanCodeValueDiagram() {
  const arrowY = boxY(1) + BOX_H + BOX_GAP / 2 + BOX_H / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="整洁代码价值对比图。左侧用红色标注烂代码的四个症状：命名模糊、函数过长、重复代码、深嵌套。右侧用绿色标注整洁代码的四个对应方案：清晰命名、短小函数、DRY 原则、扁平结构。中间一个大箭头标注重构，表示从烂代码到整洁代码的转化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            烂代码 vs 整洁代码
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            重构是桥梁——让代码从难以维护走向易于演进
          </text>

          {/* 列标题 */}
          <text x={LEFT_X + BOX_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
            烂代码
          </text>
          <text x={RIGHT_X + BOX_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
            整洁代码
          </text>

          {/* 左侧症状框 */}
          {badCode.map((s, i) => (
            <g key={`bad-${i}`}>
              <rect
                x={LEFT_X}
                y={boxY(i)}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                fill="var(--danger)"
                fillOpacity="0.08"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text x={LEFT_X + 16} y={boxY(i) + 26} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {s.title}
              </text>
              <text x={LEFT_X + 16} y={boxY(i) + 46} fontSize="11" fill="var(--text-secondary)">
                {s.desc}
              </text>
            </g>
          ))}

          {/* 右侧方案框 */}
          {cleanCode.map((s, i) => (
            <g key={`clean-${i}`}>
              <rect
                x={RIGHT_X}
                y={boxY(i)}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                fill="var(--success)"
                fillOpacity="0.08"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text x={RIGHT_X + 16} y={boxY(i) + 26} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {s.title}
              </text>
              <text x={RIGHT_X + 16} y={boxY(i) + 46} fontSize="11" fill="var(--text-secondary)">
                {s.desc}
              </text>
            </g>
          ))}

          {/* 中间箭头 + 标注 */}
          <line
            x1={LEFT_X + BOX_W + 8}
            y1={arrowY}
            x2={RIGHT_X - 8}
            y2={arrowY}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#ccv-arrow)"
          />
          <text x={VIEW_W / 2} y={arrowY - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">
            重构
          </text>
          <text x={VIEW_W / 2} y={arrowY + 16} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            小步 · 安全 · 有测试保护
          </text>

          {/* 底部总结 */}
          <line x1={40} y1={388} x2={VIEW_W - 40} y2={388} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            整洁代码不是写得快，而是改得快——可维护性才是核心价值
          </text>

          <defs>
            <marker id="ccv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        烂代码的每个症状都有对应的整洁方案。命名模糊变清晰命名，函数过长拆短小函数，
        重复代码用 DRY 消除，深嵌套用卫语句拍平。重构就是在这两端之间搭桥。
      </figcaption>
    </figure>
  );
}
