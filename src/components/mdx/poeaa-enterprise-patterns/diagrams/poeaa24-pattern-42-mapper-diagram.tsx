/**
 * <Poeaa24Pattern42Mapper>：映射器结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720;
const VIEW_H = 300;
export function Poeaa24Pattern42MapperDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Mapper 结构图。Mapper 在两个独立模型之间双向转换数据，映射规则与任一模型的业务逻辑分离，两个模型互不知晓对方。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Mapper：两个模型之间的双向桥梁"
          />
          {/* 模型 A */}
          <rect
            x={48}
            y={64}
            width={190}
            height={90}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.06"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={143}
            y={86}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            领域模型
          </text>
          <text
            x={64}
            y={110}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            Customer
          </text>
          <text
            x={64}
            y={128}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            {" "}
            name: FullName
          </text>
          <text x={64} y={146} fontSize="11" fill={T.secondary}>
            富行为 · 不知 DB 存在
          </text>
          {/* Mapper 双向箭头 */}
          <line
            x1={238}
            y1={94}
            x2={480}
            y2={94}
            stroke={T.accent}
            strokeWidth="1.5"
          />
          <text
            x={359}
            y={86}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            toPersistence()
          </text>
          <line
            x1={480}
            y1={124}
            x2={238}
            y2={124}
            stroke={T.accent}
            strokeWidth="1.5"
          />
          <text
            x={359}
            y={140}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            fromRow()
          </text>
          {/* Mapper 标签 */}
          <rect
            x={310}
            y={98}
            width={98}
            height={22}
            rx="4"
            fill={T.accent}
            fillOpacity="0.12"
          />
          <text
            x={359}
            y={113}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={T.accent}
          >
            Mapper
          </text>
          {/* 模型 B */}
          <rect
            x={480}
            y={64}
            width={200}
            height={90}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.06"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={580}
            y={86}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#E5B567"
          >
            持久化模型
          </text>
          <text
            x={496}
            y={110}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            customers 表
          </text>
          <text
            x={496}
            y={128}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            {" "}
            first_name, last_name
          </text>
          <text x={496} y={146} fontSize="11" fill={T.secondary}>
            纯数据 · 不知领域存在
          </text>
          {/* 底部说明 */}
          <rect
            x={48}
            y={180}
            width={624}
            height={64}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={64} y={204} fontSize="11" fontWeight="600" fill={T.primary}>
            关键约束：
          </text>
          <text x={64} y={226} fontSize="11" fill={T.secondary}>
            • 两个模型互不知晓对方 • 映射规则集中在 Mapper 中 •
            信息丢失需显式检测
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="Mapper 双向转换两个独立模型，映射规则与业务逻辑分离"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Mapper
        在两个独立模型之间双向转换数据，映射规则与任一模型的业务逻辑分离，
        两个模型互不知晓对方。
      </figcaption>
    </figure>
  );
}
