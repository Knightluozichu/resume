/**
 * <FlpProtocolsAbcDiagram>：结构性子类型 vs 名义性子类型。
 *
 * 对比 Protocol（鸭子类型的静态化）与 ABC（显式继承的名义子类型）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const PANELS = [
  {
    x: 36,
    w: 312,
    color: accent,
    title: "Protocol 协议（结构性子类型）",
    lines: ["class Drawable(Protocol):", "    def draw(self) -> None: ...", "", "class Circle:", "    def draw(self) -> None: ...  # 自动算 Drawable"],
    note: "看形状不看血缘 · 鸭子类型静态化",
  },
  {
    x: 372,
    w: 312,
    color: success,
    title: "ABC 抽象基类（名义性子类型）",
    lines: ["class Drawable(ABC):", "    @abstractmethod", "    def draw(self): ...", "", "class Circle(Drawable):       # 必须显式继承", "    def draw(self): ..."],
    note: "看血缘 · 未实现抽象方法不可实例化",
  },
];

const PANEL_Y = 84;
const PANEL_H = 248;

export function FlpProtocolsAbcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对比 Protocol 结构性子类型（看形状、鸭子类型静态化）与 ABC 名义性子类型（看血缘、必须显式继承）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            协议 vs 抽象基类：两种子类型方式
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            结构性看「有没有方法」· 名义性看「是不是继承了」
          </text>

          {/* 双面板 */}
          {PANELS.map((p) => (
            <g key={p.title}>
              <rect x={p.x} y={PANEL_Y} width={p.w} height={PANEL_H} rx="10" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={p.x + p.w / 2} y={PANEL_Y + 28} textAnchor="middle" fontSize="13" fontWeight="700" fill={p.color}>
                {p.title}
              </text>
              <line x1={p.x + 16} y1={PANEL_Y + 42} x2={p.x + p.w - 16} y2={PANEL_Y + 42} stroke={border} strokeWidth="1" />
              {p.lines.map((ln, i) => (
                <text key={i} x={p.x + 20} y={PANEL_Y + 70 + i * 22} fontSize="11" fontWeight={ln.includes("#") ? "600" : "400"} fill={ln.includes("#") ? p.color : primary}>
                  {ln || " "}
                </text>
              ))}
              <text x={p.x + p.w / 2} y={PANEL_Y + PANEL_H - 16} textAnchor="middle" fontSize="11" fill={secondary}>
                {p.note}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={354} x2={VIEW_W - 32} y2={354} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={376} textAnchor="middle" fontSize="11" fill={secondary}>
            选型：想松耦合、第三方类型也适配用 Protocol；想强制契约、阻止半成品实例化用 ABC
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            Protocol 让 mypy 能静态检查鸭子类型，ABC 提供运行时 isinstance 与抽象方法保护
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        结构性子类型与名义性子类型的对比。
      </figcaption>
    </figure>
  );
}
