/**
 * <Poeaa24Pattern49PluginDiagram>：插件结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720;
const VIEW_H = 300;
export function Poeaa24Pattern49PluginDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Plugin 结构图。通过配置文件或注册机制在运行时选择实现，核心代码只依赖接口，新增实现无需修改核心。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Plugin：运行时装配，核心不感知具体实现"
          />
          {/* 核心代码 */}
          <rect
            x={48}
            y={64}
            width={180}
            height={80}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.06"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={138}
            y={86}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#3FB97F"
          >
            核心代码
          </text>
          <text
            x={64}
            y={110}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            taxCalc.compute()
          </text>
          <text x={64} y={128} fontSize="11" fill={T.secondary}>
            只依赖接口
          </text>
          {/* 接口 */}
          <rect
            x={290}
            y={64}
            width={160}
            height={80}
            rx="8"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.accent}
            strokeWidth="1.5"
          />
          <rect
            x={290}
            y={64}
            width={160}
            height={28}
            rx="8"
            fill={T.accent}
            fillOpacity="0.12"
          />
          <rect
            x={290}
            y={84}
            width={160}
            height={8}
            fill={T.accent}
            fillOpacity="0.12"
          />
          <text
            x={370}
            y={83}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={T.accent}
          >
            TaxCalculator
          </text>
          <text
            x={306}
            y={112}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            interface
          </text>
          <text
            x={306}
            y={130}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            {" "}
            compute(order)
          </text>
          {/* 插件实现 */}
          <line
            x1={450}
            y1={90}
            x2={520}
            y2={72}
            stroke="#E5B567"
            strokeWidth="1"
          />
          <line
            x1={450}
            y1={104}
            x2={520}
            y2={104}
            stroke="#E5B567"
            strokeWidth="1"
          />
          <line
            x1={450}
            y1={118}
            x2={520}
            y2={136}
            stroke="#E5B567"
            strokeWidth="1"
          />
          <rect
            x={520}
            y={56}
            width={160}
            height={32}
            rx="6"
            fill="#E5B567"
            fillOpacity="0.06"
            stroke="#E5B567"
            strokeWidth="1"
          />
          <text x={600} y={76} textAnchor="middle" fontSize="11" fill="#E5B567">
            ChinaTax（配置选择）
          </text>
          <rect
            x={520}
            y={96}
            width={160}
            height={32}
            rx="6"
            fill={T.primary}
            fillOpacity="0.05"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={600}
            y={116}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            USTax
          </text>
          <rect
            x={520}
            y={136}
            width={160}
            height={32}
            rx="6"
            fill={T.primary}
            fillOpacity="0.05"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={600}
            y={156}
            textAnchor="middle"
            fontSize="11"
            fill={T.primary}
          >
            EUTax（新增无需改核心）
          </text>
          {/* 配置 */}
          <text
            x={600}
            y={186}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            plugin.properties 决定装配
          </text>
          {/* 底部说明 */}
          <rect
            x={48}
            y={204}
            width={624}
            height={56}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={64} y={226} fontSize="11" fontWeight="600" fill={T.primary}>
            核心价值：
          </text>
          <text x={64} y={246} fontSize="11" fill={T.secondary}>
            • 运行时通过配置选择实现 • 新增插件不改核心代码 • 开闭原则的落地手段
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="核心只依赖接口，具体实现通过配置在运行时装配"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Plugin 通过配置文件或注册机制在运行时选择实现，
        核心代码只依赖接口，新增实现无需修改核心。
      </figcaption>
    </figure>
  );
}
