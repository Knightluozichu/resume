/**
 * Poeaa24ReferencesEvidenceDiagram：参考文献来源证据与项目验证边界。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24ReferencesEvidenceDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="参考文献证据分工。作者图书页支持主题和结构，作者模式目录支持模式名称和模式族，出版社支持出版元数据，项目测试支持当前代码的性能与故障结论；四类证据不能互相冒充。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="参考文献：不同来源支持不同主张"
          />

          <rect
            x={34}
            y={64}
            width={150}
            height={106}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={109}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            作者图书页
          </text>
          <text
            x={109}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            主题 / 结构
          </text>
          <text
            x={109}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不证明项目性能
          </text>
          <text
            x={109}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            author-book
          </text>

          <rect
            x={202}
            y={64}
            width={150}
            height={106}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={277}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            作者模式目录
          </text>
          <text
            x={277}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            名称 / 模式族
          </text>
          <text
            x={277}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            公开摘要范围
          </text>
          <text
            x={277}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            author-catalog
          </text>

          <rect
            x={370}
            y={64}
            width={150}
            height={106}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={445}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            出版社页面
          </text>
          <text
            x={445}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            出版 / 书目
          </text>
          <text
            x={445}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不证明实现细节
          </text>
          <text
            x={445}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            publisher
          </text>

          <rect
            x={538}
            y={64}
            width={148}
            height={106}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={612}
            y={90}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            项目测试
          </text>
          <text
            x={612}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            当前行为
          </text>
          <text
            x={612}
            y={138}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            版本 / 样本 / 环境
          </text>
          <text
            x={612}
            y={160}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            project-test
          </text>

          <line
            x1={184}
            y1={188}
            x2={538}
            y2={188}
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x={360}
            y={208}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            共同输入架构评审，但支持范围各不相同
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="来源可信不等于来源支持所有结论"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文献和项目实验各自承担不同证据责任，冲突时应缩小主张或补充验证。
      </figcaption>
    </figure>
  );
}
