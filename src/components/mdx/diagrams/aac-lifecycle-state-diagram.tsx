/**
 * <AacLifecycleStateDiagram>：辅图——「AAC ViewModel 生命周期状态机」。
 *
 * 上方三个组件框横向排列：Fragment（左，warning，UI 控制器，会被销毁重建）、
 * ViewModel（中，accent 高亮，持有状态）、Observer/UI（右，success，观察渲染）。
 * 两条箭头：Fragment → ViewModel 标「订阅」、ViewModel → Observer 标「数据更新」。
 *
 * 下方三阶段状态转换流程（左→右）：
 *  ① 正常运行：Fragment 订阅 ViewModel，Observer 渲染；
 *  ② 旋转 / 配置变更：Fragment 销毁→重建，ViewModel 保留状态（success 高亮
 *     「保留状态（旋转不死）」）；
 *  ③ 恢复：ViewModel 恢复数据，Observer 重绘。
 * 阶段间用箭头连「旋转触发」「重建完成」。
 *
 * 关键标注：ViewModel 的生命周期 > Fragment，用 success 色高亮「配置变更不丢失」。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// —— 顶部三个组件框。 ——
const TOP_BOX_W = 176;
const TOP_BOX_H = 72;
const TOP_BOX_Y = 78;
const TOP_BOX_CY = TOP_BOX_Y + TOP_BOX_H / 2; // 114

const FRAGMENT_X = 44;
const VIEWMODEL_X = 272;
const OBSERVER_X = 500;
const FRAGMENT_CX = FRAGMENT_X + TOP_BOX_W / 2; // 132
const VIEWMODEL_CX = VIEWMODEL_X + TOP_BOX_W / 2; // 360
const OBSERVER_CX = OBSERVER_X + TOP_BOX_W / 2; // 588

// —— 下方三阶段面板。 ——
const PANEL_W = 200;
const PANEL_H = 120;
const PANEL_Y = 190;

const P1_X = 40;
const P2_X = 260;
const P3_X = 480;
const P1_CX = P1_X + PANEL_W / 2; // 140
const P2_CX = P2_X + PANEL_W / 2; // 360
const P3_CX = P3_X + PANEL_W / 2; // 580

export function AacLifecycleStateDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AAC ViewModel 生命周期状态机图。上方从左到右三个组件框：Fragment（黄色，UI 控制器，会被销毁重建）、ViewModel（紫色高亮，持有状态）、Observer/UI（绿色，观察渲染）。两条箭头：Fragment→ViewModel 标「订阅」，ViewModel→Observer 标「数据更新」。下方三阶段状态转换流程从左到右：①正常运行，Fragment 订阅 ViewModel、Observer 渲染；②旋转/配置变更，Fragment 销毁→重建，ViewModel 保留状态（绿色高亮「保留状态（旋转不死）」）；③恢复，ViewModel 恢复数据、Observer 重绘。阶段间箭头标「旋转触发」「重建完成」。底部绿色高亮结论：ViewModel 的生命周期大于 Fragment，配置变更不丢失。底部总结：AAC ViewModel 配置变更时保留状态，UI 自动观察数据变化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            AAC ViewModel：配置变更时保留状态
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Fragment 可销毁重建 · ViewModel 跨重建存活 · Observer 自动重绘
          </text>

          {/* ===== 顶部组件框：Fragment（warning） ===== */}
          <rect x={FRAGMENT_X} y={TOP_BOX_Y} width={TOP_BOX_W} height={TOP_BOX_H} rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="2" />
          <text x={FRAGMENT_CX} y={TOP_BOX_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            Fragment
          </text>
          <text x={FRAGMENT_CX} y={TOP_BOX_Y + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            UI 控制器
          </text>
          <text x={FRAGMENT_CX} y={TOP_BOX_Y + 64} textAnchor="middle" fontSize="11" fill="var(--warning)">
            可销毁 / 重建
          </text>

          {/* ===== 顶部组件框：ViewModel（accent 高亮） ===== */}
          <rect x={VIEWMODEL_X} y={TOP_BOX_Y} width={TOP_BOX_W} height={TOP_BOX_H} rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="2.4" />
          <text x={VIEWMODEL_CX} y={TOP_BOX_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            ViewModel
          </text>
          <text x={VIEWMODEL_CX} y={TOP_BOX_Y + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            持有 UI 状态
          </text>
          <text x={VIEWMODEL_CX} y={TOP_BOX_Y + 64} textAnchor="middle" fontSize="11" fill="var(--accent)">
            生命周期更长
          </text>

          {/* ===== 顶部组件框：Observer / UI（success） ===== */}
          <rect x={OBSERVER_X} y={TOP_BOX_Y} width={TOP_BOX_W} height={TOP_BOX_H} rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="2" />
          <text x={OBSERVER_CX} y={TOP_BOX_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            Observer / UI
          </text>
          <text x={OBSERVER_CX} y={TOP_BOX_Y + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            观察数据
          </text>
          <text x={OBSERVER_CX} y={TOP_BOX_Y + 64} textAnchor="middle" fontSize="11" fill="var(--success)">
            自动渲染
          </text>

          {/* ===== 顶部箭头：Fragment → ViewModel「订阅」 ===== */}
          <line x1={FRAGMENT_X + TOP_BOX_W} y1={TOP_BOX_CY} x2={VIEWMODEL_X} y2={TOP_BOX_CY} stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#aac-arrow-accent)" />
          <text x={(FRAGMENT_X + TOP_BOX_W + VIEWMODEL_X) / 2} y={TOP_BOX_CY - 8} textAnchor="middle" fontSize="11" fill="var(--accent)">
            订阅
          </text>

          {/* ===== 顶部箭头：ViewModel → Observer「数据更新」 ===== */}
          <line x1={VIEWMODEL_X + TOP_BOX_W} y1={TOP_BOX_CY} x2={OBSERVER_X} y2={TOP_BOX_CY} stroke="var(--success)" strokeWidth="1.6" markerEnd="url(#aac-arrow-success)" />
          <text x={(VIEWMODEL_X + TOP_BOX_W + OBSERVER_X) / 2} y={TOP_BOX_CY - 8} textAnchor="middle" fontSize="11" fill="var(--success)">
            数据更新
          </text>

          {/* ===== 阶段间箭头：① → ②「旋转触发」 ===== */}
          <line x1={P1_X + PANEL_W} y1={PANEL_Y + PANEL_H / 2} x2={P2_X} y2={PANEL_Y + PANEL_H / 2} stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#aac-arrow-neutral)" />
          <text x={(P1_X + PANEL_W + P2_X) / 2} y={PANEL_Y + PANEL_H / 2 - 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            旋转触发
          </text>

          {/* ===== 阶段间箭头：② → ③「重建完成」 ===== */}
          <line x1={P2_X + PANEL_W} y1={PANEL_Y + PANEL_H / 2} x2={P3_X} y2={PANEL_Y + PANEL_H / 2} stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#aac-arrow-neutral)" />
          <text x={(P2_X + PANEL_W + P3_X) / 2} y={PANEL_Y + PANEL_H / 2 - 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            重建完成
          </text>

          {/* ===== 面板 ① 正常运行（中性） ===== */}
          <rect x={P1_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.4" />
          <text x={P1_CX} y={PANEL_Y + 24} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            ① 正常运行
          </text>
          <text x={P1_CX} y={PANEL_Y + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Fragment 订阅 ViewModel
          </text>
          <text x={P1_CX} y={PANEL_Y + 66} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Observer 渲染 UI
          </text>
          {/* 标签胶囊：订阅 */}
          <rect x={P1_CX - 36} y={PANEL_Y + 82} width="72" height="24" rx="12" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={P1_CX} y={PANEL_Y + 98} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">
            订阅
          </text>

          {/* ===== 面板 ② 旋转/配置变更（success 高亮 ViewModel 存活） ===== */}
          <rect x={P2_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.6" />
          <text x={P2_CX} y={PANEL_Y + 24} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">
            ② 旋转 / 配置变更
          </text>
          <text x={P2_CX} y={PANEL_Y + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Fragment 销毁 → 重建
          </text>
          <text x={P2_CX} y={PANEL_Y + 66} textAnchor="middle" fontSize="11" fill="var(--success)">
            ViewModel 保留状态
          </text>
          {/* 标签胶囊：保留状态（旋转不死） */}
          <rect x={P2_CX - 88} y={PANEL_Y + 82} width="176" height="24" rx="12" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x={P2_CX} y={PANEL_Y + 98} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">
            保留状态（旋转不死）
          </text>

          {/* ===== 面板 ③ 恢复 ===== */}
          <rect x={P3_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.4" />
          <text x={P3_CX} y={PANEL_Y + 24} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            ③ 恢复
          </text>
          <text x={P3_CX} y={PANEL_Y + 48} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            ViewModel 恢复数据
          </text>
          <text x={P3_CX} y={PANEL_Y + 66} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Observer 重绘
          </text>
          {/* 标签胶囊：恢复 + 重绘 */}
          <rect x={P3_CX - 84} y={PANEL_Y + 82} width="80" height="24" rx="12" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={P3_CX - 44} y={PANEL_Y + 98} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">
            恢复
          </text>
          <rect x={P3_CX + 4} y={PANEL_Y + 82} width="80" height="24" rx="12" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x={P3_CX + 44} y={PANEL_Y + 98} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">
            重绘
          </text>

          {/* ===== 底部 success 高亮结论 ===== */}
          <rect x={80} y={332} width="560" height="44" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.4" />
          <text x={VIEW_W / 2} y={358} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">
            ViewModel 的生命周期 &gt; Fragment：配置变更不丢失
          </text>

          {/* ===== 底部总结 ===== */}
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            AAC ViewModel：配置变更时保留状态，UI 自动观察数据变化
          </text>

          <defs>
            <marker id="aac-arrow-accent" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="aac-arrow-success" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker id="aac-arrow-neutral" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fragment 的生命周期随配置变更（如旋转）销毁重建，而 ViewModel 的生命线贯穿重建
        不中断——所以它持有的状态不丢失。重建后 Fragment 重新订阅同一个 ViewModel，
        Observer 自动拿到最新数据重绘，这就是 AAC 解决「旋转丢数据」的核心机制。
      </figcaption>
    </figure>
  );
}
