/**
 * <Poeaa24Ch12StructureDecisionTree>：对象-关系结构模式决策树（POEAA 第12章概览）。
 *
 * 展示继承/关联映射策略的决策树：
 *   Identity Field / Foreign Key / Association Table / Dependent Mapping / Embedded Value / Serialized LOB
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 460;

export function Poeaa24Ch12StructureDecisionTree() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象-关系结构模式决策树。首先判断映射什么：身份用 Identity Field；一对多关联用 Foreign Key 或 Association Table；从属对象用 Dependent Mapping；值对象用 Embedded Value；复杂对象图用 Serialized LOB。每个叶节点标注适用场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="对象-关系结构模式：决策树" />

          {/* 根节点 */}
          <rect x={280} y={56} width={160} height={36} rx="8" fill={T.accent} fillOpacity="0.1" stroke={T.accent} strokeWidth="1.5" />
          <text x={360} y={79} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>要映射什么？</text>

          {/* 分支线 */}
          <line x1={310} y1={92} x2={120} y2={130} stroke={T.border} strokeWidth="1" />
          <line x1={340} y1={92} x2={280} y2={130} stroke={T.border} strokeWidth="1" />
          <line x1={380} y1={92} x2={440} y2={130} stroke={T.border} strokeWidth="1" />
          <line x1={410} y1={92} x2={600} y2={130} stroke={T.border} strokeWidth="1" />

          {/* 分支标签 */}
          <text x={200} y={116} textAnchor="middle" fontSize="11" fill={T.secondary}>身份</text>
          <text x={300} y={116} textAnchor="middle" fontSize="11" fill={T.secondary}>关联</text>
          <text x={420} y={116} textAnchor="middle" fontSize="11" fill={T.secondary}>从属/值</text>
          <text x={520} y={116} textAnchor="middle" fontSize="11" fill={T.secondary}>复杂图</text>

          {/* Identity Field */}
          <rect x={48} y={130} width={152} height={72} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <text x={124} y={152} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Identity Field</text>
          <text x={124} y={170} textAnchor="middle" fontSize="11" fill={T.secondary}>对象 ↔ 行 的 ID 桥梁</text>
          <text x={124} y={186} textAnchor="middle" fontSize="11" fill={T.secondary}>几乎所有映射都需要</text>

          {/* 关联子决策 */}
          <rect x={216} y={130} width={136} height={36} rx="6" fill={T.primary} fillOpacity="0.04" stroke={T.border} strokeWidth="1" />
          <text x={284} y={153} textAnchor="middle" fontSize="11" fill={T.primary}>多对多？</text>

          <line x1={260} y1={166} x2={232} y2={196} stroke={T.border} strokeWidth="1" />
          <line x1={308} y1={166} x2={336} y2={196} stroke={T.border} strokeWidth="1" />
          <text x={236} y={184} fontSize="11" fill={T.secondary}>否</text>
          <text x={320} y={184} fontSize="11" fill={T.secondary}>是</text>

          {/* Foreign Key */}
          <rect x={168} y={196} width={136} height={64} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <text x={236} y={218} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">Foreign Key</text>
          <text x={236} y={236} textAnchor="middle" fontSize="11" fill={T.secondary}>一对多：FK 在子表</text>
          <text x={236} y={250} textAnchor="middle" fontSize="11" fill={T.secondary}>最自然的关联方式</text>

          {/* Association Table */}
          <rect x={316} y={196} width={148} height={64} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <text x={390} y={218} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">Association Table</text>
          <text x={390} y={236} textAnchor="middle" fontSize="11" fill={T.secondary}>多对多：中间表存对</text>
          <text x={390} y={250} textAnchor="middle" fontSize="11" fill={T.secondary}>两个 FK 组成一行</text>

          {/* Dependent Mapping */}
          <rect x={380} y={130} width={148} height={72} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={454} y={152} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>Dependent Mapping</text>
          <text x={454} y={170} textAnchor="middle" fontSize="11" fill={T.secondary}>从属对象无独立 ID</text>
          <text x={454} y={186} textAnchor="middle" fontSize="11" fill={T.secondary}>生命周期跟随父对象</text>

          {/* Embedded Value + Serialized LOB */}
          <rect x={544} y={130} width={148} height={72} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <text x={618} y={152} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Embedded Value</text>
          <text x={618} y={170} textAnchor="middle" fontSize="11" fill={T.secondary}>值对象 → 父表的列</text>
          <text x={618} y={186} textAnchor="middle" fontSize="11" fill={T.secondary}>如 Address → 3 列</text>

          <rect x={544} y={216} width={148} height={64} rx="8" fill={T.danger} fillOpacity="0.06" stroke={T.danger} strokeWidth="1.5" />
          <text x={618} y={238} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.danger}>Serialized LOB</text>
          <text x={618} y={256} textAnchor="middle" fontSize="11" fill={T.secondary}>整个对象图 → 一列</text>
          <text x={618} y={270} textAnchor="middle" fontSize="11" fill={T.secondary}>牺牲查询换取简单</text>

          {/* 底部总结 */}
          <line x1={48} y1={310} x2={672} y2={310} stroke={T.border} strokeWidth="0.8" />
          <text x={48} y={336} fontSize="11" fontWeight="600" fill={T.primary}>选择顺序：</text>
          <text x={48} y={358} fontSize="11" fill={T.secondary}>1. Identity Field（必选）→ 2. 关联类型决定 FK/AT → 3. 从属用 DM → 4. 值对象用 EV → 5. 最后才考虑 LOB</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="结构映射的核心问题：对象的哪些部分需要独立的表行？" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象-关系结构模式解决"对象的哪些部分映射为独立的表行"。Identity Field 是基础，
        关联用 Foreign Key 或 Association Table，从属对象用 Dependent Mapping，
        值对象用 Embedded Value，复杂对象图最后才考虑 Serialized LOB。
      </figcaption>
    </figure>
  );
}
