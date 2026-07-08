/**
 * <PopFileOpsDiagram>：pathlib 文件操作三场景。
 *
 * 查找遍历 · 批量改名 · 读写处理，统一用 Path 面向对象操作文件。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const SCENES = [
  { x: 36, w: 208, color: accent, title: "查找遍历", lines: ["Path('logs').rglob('*.log')", "", "递归找所有日志", "返回 Path 生成器"] },
  { x: 256, w: 208, color: success, title: "批量改名", lines: ["for f in dir.glob('*.txt'):", "    f.rename(", "      f.with_suffix('.md'))", "整体改后缀"] },
  { x: 476, w: 208, color: warning, title: "读写处理", lines: ["data = p.read_text()", "p.write_text(new)", "", "一行读写，自动关句柄"] },
];

const CARD_Y = 84;
const CARD_H = 224;

export function PopFileOpsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="pathlib文件操作三场景：查找遍历（rglob）、批量改名（rename+with_suffix）、读写处理（read_text/write_text）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            pathlib：面向对象的文件操作
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            用 / 拼路径、用方法做操作，跨平台不再手拼分隔符
          </text>

          {/* 三场景卡片 */}
          {SCENES.map((s) => (
            <g key={s.title}>
              <rect x={s.x} y={CARD_Y} width={s.w} height={CARD_H} rx="10" fill={s.color} fillOpacity="0.06" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.55" />
              <text x={s.x + s.w / 2} y={CARD_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill={s.color}>
                {s.title}
              </text>
              <line x1={s.x + 16} y1={CARD_Y + 42} x2={s.x + s.w - 16} y2={CARD_Y + 42} stroke={border} strokeWidth="1" />
              {s.lines.map((ln, i) => (
                <text key={i} x={s.x + s.w / 2} y={CARD_Y + 70 + i * 24} textAnchor="middle" fontSize="11" fontWeight={ln.startsWith("Path") || ln.startsWith("for") || ln.startsWith("    ") || ln.startsWith("data") || ln.startsWith("p.") ? "600" : "400"} fill={ln.startsWith("Path") || ln.startsWith("for") || ln.startsWith("    ") || ln.startsWith("data") || ln.startsWith("p.") ? primary : secondary}>
                  {ln || " "}
                </text>
              ))}
              <text x={s.x + s.w / 2} y={CARD_Y + CARD_H - 16} textAnchor="middle" fontSize="11" fill={s.color}>
                {s.title === "查找遍历" ? "惰性生成器，省内存" : s.title === "批量改名" ? "Path 运算改名" : "替代 open/close 样板"}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={334} x2={VIEW_W - 32} y2={334} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={356} textAnchor="middle" fontSize="11" fill={secondary}>
            Path 用 / 拼接（跨平台）、用 .glob/.rglob 查找、用 .read_text/.write_text 读写
          </text>
          <text x={VIEW_W / 2} y={376} textAnchor="middle" fontSize="11" fill={secondary}>
            比手拼 os.path.join 和字符串分隔符更安全、更可读
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            删除目录树用 shutil.rmtree，单文件用 Path.unlink
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        pathlib 文件操作的三种典型场景。
      </figcaption>
    </figure>
  );
}
