/**
 * <AddLayeredArchitectureDiagram>：分层架构演进图（architecture-domain 架构原则章）。
 *
 * 三列对比三种分层方式：
 *   - 左：传统三层（UI → BLL → DAL），DAL 依赖具体数据库，箭头朝下
 *   - 中：加入接口（BLL 定义接口，DAL 实现），箭头朝下但有接口隔离
 *   - 右：依赖倒置（所有箭头朝内指向 Domain），Domain 在中心不依赖外部
 * 用箭头和颜色标注依赖方向的变化。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const COL_W = 200;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const LAYER_H = 52;
const LAYER_GAP = 10;
const LAYER_START_Y = 120;
const layerY = (i: number) => LAYER_START_Y + i * (LAYER_H + LAYER_GAP);

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function AddLayeredArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="分层架构演进图。三列对比：左列传统三层（UI→BLL→DAL，DAL 依赖具体数据库，箭头朝下）；中列加入接口（BLL 定义接口，DAL 实现，箭头朝下但有接口隔离）；右列依赖倒置（所有箭头朝内指向 Domain，Domain 在中心不依赖外部）。用箭头方向和颜色标注依赖方向的变化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="la-arrow-down" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="la-arrow-up" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
            <marker id="la-arrow-prog" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            分层架构演进
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            从传统三层到依赖倒置——依赖方向的反转是关键
          </text>

          {/* 列标题 */}
          <text x={colX(0) + COL_W / 2} y={86} textAnchor="middle" fontSize="13" fontWeight="700" fill={secondary}>
            传统三层
          </text>
          <text x={colX(0) + COL_W / 2} y={104} textAnchor="middle" fontSize="11" fill={secondary}>
            DAL 依赖具体 DB
          </text>

          <text x={colX(1) + COL_W / 2} y={86} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            加入接口
          </text>
          <text x={colX(1) + COL_W / 2} y={104} textAnchor="middle" fontSize="11" fill={secondary}>
            BLL 定义接口
          </text>

          <text x={colX(2) + COL_W / 2} y={86} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            依赖倒置
          </text>
          <text x={colX(2) + COL_W / 2} y={104} textAnchor="middle" fontSize="11" fill={secondary}>
            箭头朝内指向 Domain
          </text>

          {/* ===== 左列：传统三层 ===== */}
          <g>
            {/* UI */}
            <rect x={colX(0)} y={layerY(0)} width={COL_W} height={LAYER_H} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(0) + COL_W / 2} y={layerY(0) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>UI Layer</text>
            <text x={colX(0) + COL_W / 2} y={layerY(0) + 40} textAnchor="middle" fontSize="11" fill={secondary}>Controller / View</text>
            {/* BLL */}
            <rect x={colX(0)} y={layerY(1)} width={COL_W} height={LAYER_H} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(0) + COL_W / 2} y={layerY(1) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>BLL</text>
            <text x={colX(0) + COL_W / 2} y={layerY(1) + 40} textAnchor="middle" fontSize="11" fill={secondary}>Business Logic</text>
            {/* DAL */}
            <rect x={colX(0)} y={layerY(2)} width={COL_W} height={LAYER_H} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(0) + COL_W / 2} y={layerY(2) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>DAL</text>
            <text x={colX(0) + COL_W / 2} y={layerY(2) + 40} textAnchor="middle" fontSize="11" fill={secondary}>→ 具体 DB（紧耦合）</text>
            {/* 箭头朝下 */}
            <line x1={colX(0) + COL_W / 2} y1={layerY(0) + LAYER_H} x2={colX(0) + COL_W / 2} y2={layerY(1) - 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#la-arrow-down)" />
            <line x1={colX(0) + COL_W / 2} y1={layerY(1) + LAYER_H} x2={colX(0) + COL_W / 2} y2={layerY(2) - 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#la-arrow-down)" />
          </g>

          {/* ===== 中列：加入接口 ===== */}
          <g>
            {/* UI */}
            <rect x={colX(1)} y={layerY(0)} width={COL_W} height={LAYER_H} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(1) + COL_W / 2} y={layerY(0) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>UI Layer</text>
            <text x={colX(1) + COL_W / 2} y={layerY(0) + 40} textAnchor="middle" fontSize="11" fill={secondary}>Controller / View</text>
            {/* BLL + 接口 */}
            <rect x={colX(1)} y={layerY(1)} width={COL_W} height={LAYER_H} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(1) + COL_W / 2} y={layerY(1) + 20} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>BLL</text>
            <text x={colX(1) + COL_W / 2} y={layerY(1) + 38} textAnchor="middle" fontSize="11" fill={warning} fontStyle="italic">«IRepo» 接口定义</text>
            {/* DAL 实现 */}
            <rect x={colX(1)} y={layerY(2)} width={COL_W} height={LAYER_H} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(1) + COL_W / 2} y={layerY(2) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>DAL</text>
            <text x={colX(1) + COL_W / 2} y={layerY(2) + 40} textAnchor="middle" fontSize="11" fill={secondary}>implements IRepo</text>
            {/* 箭头朝下 */}
            <line x1={colX(1) + COL_W / 2} y1={layerY(0) + LAYER_H} x2={colX(1) + COL_W / 2} y2={layerY(1) - 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#la-arrow-down)" />
            <line x1={colX(1) + COL_W / 2} y1={layerY(1) + LAYER_H} x2={colX(1) + COL_W / 2} y2={layerY(2) - 2} stroke={warning} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#la-arrow-down)" />
          </g>

          {/* ===== 右列：依赖倒置 ===== */}
          <g>
            {/* UI */}
            <rect x={colX(2)} y={layerY(0)} width={COL_W} height={LAYER_H} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(2) + COL_W / 2} y={layerY(0) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>UI Layer</text>
            <text x={colX(2) + COL_W / 2} y={layerY(0) + 40} textAnchor="middle" fontSize="11" fill={secondary}>Controller / View</text>
            {/* Application */}
            <rect x={colX(2)} y={layerY(1)} width={COL_W} height={LAYER_H} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={colX(2) + COL_W / 2} y={layerY(1) + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>Application</text>
            <text x={colX(2) + COL_W / 2} y={layerY(1) + 40} textAnchor="middle" fontSize="11" fill={secondary}>Use Case</text>
            {/* Domain（核心） */}
            <rect x={colX(2)} y={layerY(2)} width={COL_W} height={LAYER_H} rx="8" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="2" />
            <text x={colX(2) + COL_W / 2} y={layerY(2) + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Domain</text>
            <text x={colX(2) + COL_W / 2} y={layerY(2) + 40} textAnchor="middle" fontSize="11" fill={secondary}>Entity（不依赖外部）</text>
            {/* 箭头朝内（朝下指向 Domain） */}
            <line x1={colX(2) + COL_W / 2} y1={layerY(0) + LAYER_H} x2={colX(2) + COL_W / 2} y2={layerY(1) - 2} stroke={success} strokeWidth="1.6" markerEnd="url(#la-arrow-up)" />
            <line x1={colX(2) + COL_W / 2} y1={layerY(1) + LAYER_H} x2={colX(2) + COL_W / 2} y2={layerY(2) - 2} stroke={success} strokeWidth="1.6" markerEnd="url(#la-arrow-up)" />
            {/* 依赖方向标注 */}
            <text x={colX(2) + COL_W / 2 + 14} y={layerY(1) + LAYER_H / 2 + 16} fontSize="11" fill={success}>向内</text>
          </g>

          {/* 进阶箭头：左→中→右 */}
          <line x1={colX(0) + COL_W + 4} y1={layerY(1) + LAYER_H / 2} x2={colX(1) - 4} y2={layerY(1) + LAYER_H / 2} stroke={accent} strokeWidth="1.6" markerEnd="url(#la-arrow-prog)" />
          <line x1={colX(1) + COL_W + 4} y1={layerY(1) + LAYER_H / 2} x2={colX(2) - 4} y2={layerY(1) + LAYER_H / 2} stroke={accent} strokeWidth="1.6" markerEnd="url(#la-arrow-prog)" />

          {/* 底部总结 */}
          <line x1={36} y1={428} x2={VIEW_W - 36} y2={428} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={452} textAnchor="middle" fontSize="12" fill={secondary}>
            传统三层箭头朝下耦合 DB → 加接口隔离 → 依赖倒置箭头朝内解放 Domain
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分层架构的三步演进：传统三层中 DAL 直接依赖数据库；加入接口后 BLL 定义接口、DAL 实现；依赖倒置后所有箭头朝内指向 Domain，核心业务逻辑不再依赖外部。
      </figcaption>
    </figure>
  );
}
