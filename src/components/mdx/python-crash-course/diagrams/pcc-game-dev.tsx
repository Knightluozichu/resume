/**
 * <PccGameDevDiagram>：Python 游戏开发——Pygame 游戏循环与架构。
 *
 * 游戏循环（事件处理→更新状态→绘制）、Pygame 核心模块、外星人入侵项目结构。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function PccGameDevDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 游戏开发：游戏循环包含事件处理、状态更新和屏幕绘制三步，Pygame 提供显示、事件、绘制、声音等模块。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Pygame 游戏开发：游戏循环与架构
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            事件处理 → 状态更新 → 屏幕绘制 · 每帧重复
          </text>

          {/* 游戏循环（环形） */}
          <text x={360} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            游戏循环（每帧执行）
          </text>

          {/* 事件处理 */}
          <rect x={80} y={100} width={160} height={56} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={160} y={122} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>1. 事件处理</text>
          <text x={160} y={140} textAnchor="middle" fontSize="11" fill={secondary}>for event in events:</text>
          <text x={160} y={152} textAnchor="middle" fontSize="11" fill={secondary}>检测按键/鼠标</text>

          {/* 箭头 1→2 */}
          <line x1={240} y1={128} x2={280} y2={128} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-gd-arrow)" />

          {/* 状态更新 */}
          <rect x={280} y={100} width={160} height={56} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y={122} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>2. 状态更新</text>
          <text x={360} y={140} textAnchor="middle" fontSize="11" fill={secondary}>更新飞船位置</text>
          <text x={360} y={152} textAnchor="middle" fontSize="11" fill={secondary}>移动外星人/子弹</text>

          {/* 箭头 2→3 */}
          <line x1={440} y1={128} x2={480} y2={128} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-gd-arrow)" />

          {/* 屏幕绘制 */}
          <rect x={480} y={100} width={160} height={56} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={560} y={122} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>3. 屏幕绘制</text>
          <text x={560} y={140} textAnchor="middle" fontSize="11" fill={secondary}>screen.fill(bg)</text>
          <text x={560} y={152} textAnchor="middle" fontSize="11" fill={secondary}>blit 精灵 → flip</text>

          {/* 循环箭头 3→1 */}
          <path d="M 560 156 Q 560 180 360 180 Q 160 180 160 156" fill="none" stroke={danger} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#pcc-gd-arrow)" />
          <text x={360} y={196} textAnchor="middle" fontSize="11" fill={danger}>循环重复 · clock.tick(60) 控制帧率</text>

          {/* 分隔线 */}
          <line x1={32} y1={216} x2={VIEW_W - 32} y2={216} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* Pygame 核心模块 */}
          <text x={VIEW_W / 2} y={240} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Pygame 核心模块
          </text>

          <rect x={40} y={254} width={140} height={40} rx="6" fill={elevated} stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={110} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>display</text>
          <text x={110} y={288} textAnchor="middle" fontSize="10" fill={secondary}>窗口/屏幕</text>

          <rect x={194} y={254} width={140} height={40} rx="6" fill={elevated} stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={264} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>event</text>
          <text x={264} y={288} textAnchor="middle" fontSize="10" fill={secondary}>键盘/鼠标事件</text>

          <rect x={348} y={254} width={140} height={40} rx="6" fill={elevated} stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          <text x={418} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>sprite</text>
          <text x={418} y={288} textAnchor="middle" fontSize="10" fill={secondary}>精灵/碰撞</text>

          <rect x={502} y={254} width={140} height={40} rx="6" fill={elevated} stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={572} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>time</text>
          <text x={572} y={288} textAnchor="middle" fontSize="10" fill={secondary}>帧率控制</text>

          {/* 项目结构 */}
          <line x1={32} y1={310} x2={VIEW_W - 32} y2={310} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={332} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            外星人入侵项目结构
          </text>

          <rect x={60} y={346} width={120} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={120} y={364} textAnchor="middle" fontSize="11" fill={primary}>settings.py</text>

          <rect x={190} y={346} width={120} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={250} y={364} textAnchor="middle" fontSize="11" fill={primary}>ship.py</text>

          <rect x={320} y={346} width={120} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={380} y={364} textAnchor="middle" fontSize="11" fill={primary}>alien.py</text>

          <rect x={450} y={346} width={120} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={510} y={364} textAnchor="middle" fontSize="11" fill={primary}>bullet.py</text>

          <rect x={580} y={346} width={120} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={640} y={364} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>game.py</text>

          <text x={360} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            每个类管理自己的行为和绘制，game.py 协调游戏循环
          </text>

          <defs>
            <marker id="pcc-gd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Pygame 游戏循环每帧执行事件处理、状态更新和屏幕绘制，各模块分离职责。
      </figcaption>
    </figure>
  );
}
