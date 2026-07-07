/**
 * <RefactorStranglerDiagram>：辅图——「绞杀榕模式迁移路径」。
 *
 * 顶部一条 accent 虚线横幅「回归测试覆盖 —— 安全网」，虚线下探覆盖下方所有组件，
 * 表示迁移全程有测试兜底。
 *
 * 主区四框：
 *  - 左：旧 Activity（danger，大框，「遗留代码」）；
 *  - 中：Facade 适配层（warning，「过渡层」）；
 *  - 右上：新 Repository（success，「新架构」）；
 *  - 右下：新 ViewModel（success，「新架构」）。
 * 迁移箭头：旧代码 → Facade（标「逐步迁移」）→ 新 Repository / 新 ViewModel（标「替换」）。
 *
 * 底部四阶段时间线：①加适配层（warning）②补测试（accent）③逐步迁移（success）
 * ④旧代码退役（danger）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// —— 顶部回归测试横幅。 ——
const BANNER_X = 40;
const BANNER_Y = 68;
const BANNER_W = 640;
const BANNER_H = 40;

// —— 主区组件框。 ——
const OLD_X = 40;
const OLD_Y = 140;
const OLD_W = 156;
const OLD_H = 140;
const OLD_CX = OLD_X + OLD_W / 2; // 118

const FACADE_X = 240;
const FACADE_Y = 156;
const FACADE_W = 132;
const FACADE_H = 108;
const FACADE_CX = FACADE_X + FACADE_W / 2; // 306

const NEW_X = 432;
const NEW_REPO_Y = 132;
const NEW_VM_Y = 212;
const NEW_W = 188;
const NEW_H = 60;
const NEW_CX = NEW_X + NEW_W / 2; // 526

// —— 底部时间线节点。 ——
const TL_Y = 350;
const TL_NODES = [112, 288, 464, 640];

export function RefactorStranglerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="绞杀榕模式迁移图。顶部一条紫色虚线横幅「回归测试覆盖——安全网」，三条紫色虚线从横幅下探覆盖下方所有组件，表示迁移全程有回归测试兜底。主区四个框：左侧红色大框「旧 Activity（遗留代码）」；中间黄色框「Facade 适配层（过渡层）」；右上绿色框「新 Repository（新架构）」、右下绿色框「新 ViewModel（新架构）」。迁移箭头：旧代码→Facade 标「逐步迁移」，Facade→新 Repository 与 Facade→新 ViewModel 标「替换」。底部四阶段时间线：①加适配层（黄）、②补测试（紫）、③逐步迁移（绿）、④旧代码退役（红）。底部总结：用 Facade 隔离新旧代码，逐步替换直到旧代码自然消亡。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            绞杀榕模式：Facade 隔离，逐步替换
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            旧代码 → Facade 过渡 → 新架构，回归测试全程兜底
          </text>

          {/* ===== 回归测试横幅（accent 虚线，安全网） ===== */}
          <rect x={BANNER_X} y={BANNER_Y} width={BANNER_W} height={BANNER_H} rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="6 4" />
          <text x={VIEW_W / 2} y={BANNER_Y + 25} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">
            回归测试覆盖 —— 安全网
          </text>

          {/* 测试网下探虚线（覆盖各组件） */}
          <line x1={OLD_CX} y1={BANNER_Y + BANNER_H} x2={OLD_CX} y2={OLD_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1={FACADE_CX} y1={BANNER_Y + BANNER_H} x2={FACADE_CX} y2={FACADE_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1={NEW_CX} y1={BANNER_Y + BANNER_H} x2={NEW_CX} y2={NEW_REPO_Y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

          {/* ===== 迁移箭头：旧 Activity → Facade「逐步迁移」 ===== */}
          <line x1={OLD_X + OLD_W} y1={OLD_Y + OLD_H / 2} x2={FACADE_X} y2={OLD_Y + OLD_H / 2} stroke="var(--warning)" strokeWidth="1.6" markerEnd="url(#strangler-arrow-warning)" />
          <text x={(OLD_X + OLD_W + FACADE_X) / 2} y={OLD_Y + OLD_H / 2 - 8} textAnchor="middle" fontSize="11" fill="var(--warning)">
            逐步迁移
          </text>

          {/* ===== 迁移箭头：Facade → 新 Repository「替换」 ===== */}
          <line x1={FACADE_X + FACADE_W} y1={NEW_REPO_Y + NEW_H / 2} x2={NEW_X} y2={NEW_REPO_Y + NEW_H / 2} stroke="var(--success)" strokeWidth="1.6" markerEnd="url(#strangler-arrow-success)" />
          <text x={(FACADE_X + FACADE_W + NEW_X) / 2} y={NEW_REPO_Y + NEW_H / 2 - 8} textAnchor="middle" fontSize="11" fill="var(--success)">
            替换
          </text>

          {/* ===== 迁移箭头：Facade → 新 ViewModel「替换」 ===== */}
          <line x1={FACADE_X + FACADE_W} y1={NEW_VM_Y + NEW_H / 2} x2={NEW_X} y2={NEW_VM_Y + NEW_H / 2} stroke="var(--success)" strokeWidth="1.6" markerEnd="url(#strangler-arrow-success)" />
          <text x={(FACADE_X + FACADE_W + NEW_X) / 2} y={NEW_VM_Y + NEW_H / 2 - 8} textAnchor="middle" fontSize="11" fill="var(--success)">
            替换
          </text>

          {/* ===== 旧 Activity（danger / 遗留代码） ===== */}
          <rect x={OLD_X} y={OLD_Y} width={OLD_W} height={OLD_H} rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="2" />
          <text x={OLD_CX} y={OLD_Y + 32} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            旧 Activity
          </text>
          <text x={OLD_CX} y={OLD_Y + 56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            God Object
          </text>
          <text x={OLD_CX} y={OLD_Y + 76} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            UI + 业务 + 数据
          </text>
          <text x={OLD_CX} y={OLD_Y + 96} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            全揉在一起
          </text>
          <text x={OLD_CX} y={OLD_Y + 124} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">
            遗留代码
          </text>

          {/* ===== Facade 适配层（warning / 过渡层） ===== */}
          <rect x={FACADE_X} y={FACADE_Y} width={FACADE_W} height={FACADE_H} rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="2" />
          <text x={FACADE_CX} y={FACADE_Y + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            Facade
          </text>
          <text x={FACADE_CX} y={FACADE_Y + 50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            适配层
          </text>
          <text x={FACADE_CX} y={FACADE_Y + 70} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            对外接口不变
          </text>
          <text x={FACADE_CX} y={FACADE_Y + 94} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">
            过渡层
          </text>

          {/* ===== 新 Repository（success / 新架构） ===== */}
          <rect x={NEW_X} y={NEW_REPO_Y} width={NEW_W} height={NEW_H} rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="2" />
          <text x={NEW_CX} y={NEW_REPO_Y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            新 Repository
          </text>
          <text x={NEW_CX} y={NEW_REPO_Y + 46} textAnchor="middle" fontSize="11" fill="var(--success)">
            新架构 · 数据层
          </text>

          {/* ===== 新 ViewModel（success / 新架构） ===== */}
          <rect x={NEW_X} y={NEW_VM_Y} width={NEW_W} height={NEW_H} rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="2" />
          <text x={NEW_CX} y={NEW_VM_Y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            新 ViewModel
          </text>
          <text x={NEW_CX} y={NEW_VM_Y + 46} textAnchor="middle" fontSize="11" fill="var(--success)">
            新架构 · UI 状态
          </text>

          {/* ===== 底部四阶段时间线 ===== */}
          <line x1={96} y1={TL_Y} x2={656} y2={TL_Y} stroke="var(--text-secondary)" strokeWidth="1.2" opacity="0.6" markerEnd="url(#strangler-arrow-neutral)" />

          {/* 节点 ① 加适配层（warning） */}
          <circle cx={TL_NODES[0]} cy={TL_Y} r="11" fill="var(--warning)" stroke="var(--bg-elevated)" strokeWidth="2" />
          <text x={TL_NODES[0]} y={TL_Y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg-elevated)">1</text>
          <text x={TL_NODES[0]} y={TL_Y + 28} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">① 加适配层</text>

          {/* 节点 ② 补测试（accent） */}
          <circle cx={TL_NODES[1]} cy={TL_Y} r="11" fill="var(--accent)" stroke="var(--bg-elevated)" strokeWidth="2" />
          <text x={TL_NODES[1]} y={TL_Y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg-elevated)">2</text>
          <text x={TL_NODES[1]} y={TL_Y + 28} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">② 补测试</text>

          {/* 节点 ③ 逐步迁移（success） */}
          <circle cx={TL_NODES[2]} cy={TL_Y} r="11" fill="var(--success)" stroke="var(--bg-elevated)" strokeWidth="2" />
          <text x={TL_NODES[2]} y={TL_Y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg-elevated)">3</text>
          <text x={TL_NODES[2]} y={TL_Y + 28} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">③ 逐步迁移</text>

          {/* 节点 ④ 旧代码退役（danger） */}
          <circle cx={TL_NODES[3]} cy={TL_Y} r="11" fill="var(--danger)" stroke="var(--bg-elevated)" strokeWidth="2" />
          <text x={TL_NODES[3]} y={TL_Y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg-elevated)">4</text>
          <text x={TL_NODES[3]} y={TL_Y + 28} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">④ 旧代码退役</text>

          {/* ===== 底部总结 ===== */}
          <text x={VIEW_W / 2} y={416} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            绞杀榕：用 Facade 隔离新旧代码，逐步替换直到旧代码自然消亡
          </text>

          <defs>
            <marker id="strangler-arrow-warning" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker id="strangler-arrow-success" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker id="strangler-arrow-neutral" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先在旧 Activity 外面套一层 Facade，保持对外接口不变；同时补齐回归测试作为安全网。
        然后把内部实现一块块迁到新 Repository / 新 ViewModel，每迁一块都由测试把关。
        等旧代码被替换殆尽，它就自然消亡——这就是「绞杀榕」式的渐进重构。
      </figcaption>
    </figure>
  );
}
