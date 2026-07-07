/**
 * <TeamArchitectureBoardDiagram>：辅图——「VIPER 五层与团队角色的映射看板」。
 *
 * 顶部一行四个层框（从左到右）：Route（导航）、Interactor（业务）、
 * Presenter（展示映射）、View（UI），用前向箭头连成「产出一张屏幕」的简化数据流。
 *
 * 下方团队所有权：Route→架构组（warning 黄）、Interactor→业务组（accent 紫）、
 * Presenter→对接人（中性，跨团队桥梁）、View→UI组（success 绿）。每个层框用所属团队的
 * 语义色着色，并用细线把层框连到下方的所有权胶囊。
 *
 * 底部一个 Contract 接口框（accent 虚线），标注「跨团队契约——接口稳定，实现可变」，
 * 四条虚线把四个所有权胶囊连到 Contract，表示各团队的实现都受契约约束。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// —— 顶部四个层框（宽度统一、间隙均等，均为 4 的倍数）。 ——
const BOX_W = 132;
const BOX_H = 76;
const BOX_Y = 88;
const BOX_CY = BOX_Y + BOX_H / 2; // 126

const ROUTE_X = 36;
const INTERACTOR_X = 208;
const PRESENTER_X = 380;
const VIEW_X = 552;

const ROUTE_CX = ROUTE_X + BOX_W / 2; // 102
const INTERACTOR_CX = INTERACTOR_X + BOX_W / 2; // 274
const PRESENTER_CX = PRESENTER_X + BOX_W / 2; // 446
const VIEW_CX = VIEW_X + BOX_W / 2; // 618

// —— 所有权胶囊。 ——
const PILL_W = 108;
const PILL_H = 26;
const PILL_Y = 192;

// —— Contract 接口框。 ——
const CONTRACT_X = 48;
const CONTRACT_Y = 248;
const CONTRACT_W = 624;
const CONTRACT_H = 72;

export function TeamArchitectureBoardDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="VIPER 团队架构看板。顶部从左到右四个层框：Route（导航，黄色，归属架构组）、Interactor（业务，紫色，归属业务组）、Presenter（展示映射，中性色，归属对接人，是跨团队桥梁）、View（UI，绿色，归属 UI 组），三个前向箭头依次标注「导航触发」「业务数据」「渲染状态」表示产出一张屏幕的简化数据流。每个层框下方用细线连到一个团队所有权胶囊。底部一个紫色虚线的 Contract 接口框，标注「跨团队契约——接口稳定，实现可变」，四条虚线把四个所有权胶囊连到 Contract 框，表示各团队的实现都受同一份接口契约约束。底部总结：VIPER 每个字母对应一个团队角色，Contract 是跨团队协作的契约。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            VIPER 团队架构看板：每个字母归一个角色
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Route · Interactor · Presenter · View —— 四层各有所主，Contract 是协作契约
          </text>

          {/* ===== 前向数据流箭头（顶部，层框中心高度） ===== */}
          {/* Route → Interactor：导航触发 */}
          <line
            x1={ROUTE_X + BOX_W}
            y1={BOX_CY}
            x2={INTERACTOR_X}
            y2={BOX_CY}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#team-arrow-accent)"
          />
          <text
            x={(ROUTE_X + BOX_W + INTERACTOR_X) / 2}
            y={BOX_CY - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            导航触发
          </text>

          {/* Interactor → Presenter：业务数据 */}
          <line
            x1={INTERACTOR_X + BOX_W}
            y1={BOX_CY}
            x2={PRESENTER_X}
            y2={BOX_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#team-arrow-neutral)"
          />
          <text
            x={(INTERACTOR_X + BOX_W + PRESENTER_X) / 2}
            y={BOX_CY - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            业务数据
          </text>

          {/* Presenter → View：渲染状态 */}
          <line
            x1={PRESENTER_X + BOX_W}
            y1={BOX_CY}
            x2={VIEW_X}
            y2={BOX_CY}
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#team-arrow-success)"
          />
          <text
            x={(PRESENTER_X + BOX_W + VIEW_X) / 2}
            y={BOX_CY - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            渲染状态
          </text>

          {/* ===== Route 层框（架构组 / warning） ===== */}
          <rect
            x={ROUTE_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x={ROUTE_CX}
            y={BOX_Y + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Route
          </text>
          <text
            x={ROUTE_CX}
            y={BOX_Y + 50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            导航
          </text>
          <text
            x={ROUTE_CX}
            y={BOX_Y + 66}
            textAnchor="middle"
            fontSize="11"
            fill="var(--warning)"
          >
            决定显示哪个界面
          </text>

          {/* ===== Interactor 层框（业务组 / accent） ===== */}
          <rect
            x={INTERACTOR_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={INTERACTOR_CX}
            y={BOX_Y + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Interactor
          </text>
          <text
            x={INTERACTOR_CX}
            y={BOX_Y + 50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            业务
          </text>
          <text
            x={INTERACTOR_CX}
            y={BOX_Y + 66}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            用例 / 数据请求
          </text>

          {/* ===== Presenter 层框（对接人 / 中性桥梁） ===== */}
          <rect
            x={PRESENTER_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <text
            x={PRESENTER_CX}
            y={BOX_Y + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Presenter
          </text>
          <text
            x={PRESENTER_CX}
            y={BOX_Y + 50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            展示映射
          </text>
          <text
            x={PRESENTER_CX}
            y={BOX_Y + 66}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            业务 → UI 的桥
          </text>

          {/* ===== View 层框（UI组 / success） ===== */}
          <rect
            x={VIEW_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x={VIEW_CX}
            y={BOX_Y + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            View
          </text>
          <text
            x={VIEW_CX}
            y={BOX_Y + 50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            UI
          </text>
          <text
            x={VIEW_CX}
            y={BOX_Y + 66}
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            渲染 / 接收事件
          </text>

          {/* ===== 层框 → 所有权胶囊 的连接细线（按团队色） ===== */}
          <line x1={ROUTE_CX} y1={BOX_Y + BOX_H} x2={ROUTE_CX} y2={PILL_Y} stroke="var(--warning)" strokeWidth="1.2" opacity="0.7" />
          <line x1={INTERACTOR_CX} y1={BOX_Y + BOX_H} x2={INTERACTOR_CX} y2={PILL_Y} stroke="var(--accent)" strokeWidth="1.2" opacity="0.7" />
          <line x1={PRESENTER_CX} y1={BOX_Y + BOX_H} x2={PRESENTER_CX} y2={PILL_Y} stroke="var(--text-secondary)" strokeWidth="1.2" opacity="0.7" />
          <line x1={VIEW_CX} y1={BOX_Y + BOX_H} x2={VIEW_CX} y2={PILL_Y} stroke="var(--success)" strokeWidth="1.2" opacity="0.7" />

          {/* ===== 所有权胶囊 ===== */}
          {/* Route → 架构组 */}
          <rect x={ROUTE_CX - PILL_W / 2} y={PILL_Y} width={PILL_W} height={PILL_H} rx="13" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.4" />
          <text x={ROUTE_CX} y={PILL_Y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">
            架构组
          </text>

          {/* Interactor → 业务组 */}
          <rect x={INTERACTOR_CX - PILL_W / 2} y={PILL_Y} width={PILL_W} height={PILL_H} rx="13" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={INTERACTOR_CX} y={PILL_Y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">
            业务组
          </text>

          {/* Presenter → 对接人 */}
          <rect x={PRESENTER_CX - PILL_W / 2} y={PILL_Y} width={PILL_W} height={PILL_H} rx="13" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <text x={PRESENTER_CX} y={PILL_Y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">
            对接人
          </text>

          {/* View → UI组 */}
          <rect x={VIEW_CX - PILL_W / 2} y={PILL_Y} width={PILL_W} height={PILL_H} rx="13" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.4" />
          <text x={VIEW_CX} y={PILL_Y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">
            UI 组
          </text>

          {/* ===== 所有权胶囊 → Contract 的虚线（契约约束四团队） ===== */}
          <line x1={ROUTE_CX} y1={PILL_Y + PILL_H} x2={ROUTE_CX} y2={CONTRACT_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
          <line x1={INTERACTOR_CX} y1={PILL_Y + PILL_H} x2={INTERACTOR_CX} y2={CONTRACT_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
          <line x1={PRESENTER_CX} y1={PILL_Y + PILL_H} x2={PRESENTER_CX} y2={CONTRACT_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
          <line x1={VIEW_CX} y1={PILL_Y + PILL_H} x2={VIEW_CX} y2={CONTRACT_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />

          {/* ===== Contract 接口框（accent 虚线） ===== */}
          <rect
            x={CONTRACT_X}
            y={CONTRACT_Y}
            width={CONTRACT_W}
            height={CONTRACT_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <text
            x={VIEW_W / 2}
            y={CONTRACT_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            Contract 接口
          </text>
          <text
            x={VIEW_W / 2}
            y={CONTRACT_Y + 52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            跨团队契约——接口稳定，实现可变
          </text>

          {/* ===== 底部总结 ===== */}
          <line x1={40} y1={344} x2={VIEW_W - 40} y2={344} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            VIPER：每个字母对应一个团队角色
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Contract 是跨团队协作的契约——接口不变，各团队实现可独立演进
          </text>

          <defs>
            <marker id="team-arrow-accent" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="team-arrow-neutral" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="team-arrow-success" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        VIPER 把一层职责交给一个团队角色：Route 归架构组、Interactor 归业务组、
        View 归 UI 组，Presenter 由对接人 bridging。团队之间不直接耦合，而是通过
        Contract 接口协作——接口稳定、实现可变，所以各团队能独立演进而不互相阻塞。
      </figcaption>
    </figure>
  );
}
