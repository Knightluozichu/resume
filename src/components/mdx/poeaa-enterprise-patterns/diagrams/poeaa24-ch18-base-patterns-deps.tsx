/**
 * Poeaa24Ch18BasePatternsDepsDiagram：第18章基本模式依赖关系图。
 *
 * 展示 5 个基础模式的依赖关系：
 *   Gateway / Mapper / Layer Supertype / Separated Interface / Registry
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

export function Poeaa24Ch18BasePatternsDepsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第18章基本模式依赖关系图。Gateway 封装外部系统访问，Mapper 在对象间翻译，Layer Supertype 提供层内公共基类，Separated Interface 让接口和实现分离到不同包，Registry 提供全局查找点。箭头表示依赖方向：Mapper 依赖 Gateway 获取数据，Registry 被所有层引用，Separated Interface 被 Gateway 和 Mapper 使用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="基础模式：依赖关系图" />

          {/* Registry - 中心 */}
          <rect
            x={280}
            y={160}
            width={160}
            height={64}
            rx="8"
            fill={T.accent}
            fillOpacity="0.08"
            stroke={T.accent}
            strokeWidth="1.5"
          />
          <text
            x={360}
            y={186}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={T.accent}
          >
            Registry
          </text>
          <text
            x={360}
            y={206}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            全局查找点（Service Locator）
          </text>

          {/* Gateway - 左上 */}
          <rect
            x={48}
            y={72}
            width={180}
            height={64}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1.5"
          />
          <text
            x={138}
            y={98}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#3FB97F"
          >
            Gateway
          </text>
          <text
            x={138}
            y={118}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            封装外部系统访问
          </text>

          {/* Mapper - 右上 */}
          <rect
            x={492}
            y={72}
            width={180}
            height={64}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.5"
          />
          <text
            x={582}
            y={98}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#E5B567"
          >
            Mapper
          </text>
          <text
            x={582}
            y={118}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            对象间翻译（不改变双方）
          </text>

          {/* Layer Supertype - 左下 */}
          <rect
            x={48}
            y={280}
            width={180}
            height={64}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1.5"
          />
          <text
            x={138}
            y={306}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#3FB97F"
          >
            Layer Supertype
          </text>
          <text
            x={138}
            y={326}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            层内公共基类（如 BaseEntity）
          </text>

          {/* Separated Interface - 右下 */}
          <rect
            x={492}
            y={280}
            width={180}
            height={64}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.5"
          />
          <text
            x={582}
            y={306}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#E5B567"
          >
            Separated Interface
          </text>
          <text
            x={582}
            y={326}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            接口与实现分包
          </text>

          {/* 依赖箭头 */}
          <defs>
            <marker
              id="ch18-dep"
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L6 3.5 L0 7 z" fill={T.secondary} />
            </marker>
          </defs>

          {/* Gateway → Registry */}
          <line
            x1={228}
            y1={120}
            x2={280}
            y2={172}
            stroke={T.secondary}
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#ch18-dep)"
          />
          {/* Mapper → Registry */}
          <line
            x1={492}
            y1={120}
            x2={440}
            y2={172}
            stroke={T.secondary}
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#ch18-dep)"
          />
          {/* Gateway → Separated Interface */}
          <line
            x1={138}
            y1={136}
            x2={138}
            y2={280}
            stroke={T.secondary}
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#ch18-dep)"
          />
          <text x={148} y={210} fontSize="11" fill={T.secondary}>
            实现接口
          </text>
          {/* Mapper → Layer Supertype */}
          <line
            x1={582}
            y1={136}
            x2={582}
            y2={280}
            stroke={T.secondary}
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#ch18-dep)"
          />
          <text x={592} y={210} fontSize="11" fill={T.secondary}>
            继承基类
          </text>

          {/* 底部说明 */}
          <text
            x={VIEW_W / 2}
            y={376}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            这 5 个模式是其他所有 POEAA 模式的构建块
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="Gateway 封装访问、Mapper 翻译、Registry 查找、其余两个管理依赖方向"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        基础模式族是其他所有 POEAA 模式的构建块。Gateway 封装外部系统访问，
        Mapper 在对象间翻译，Registry 提供全局查找，Layer Supertype 和 Separated
        Interface 管理依赖方向。
      </figcaption>
    </figure>
  );
}
