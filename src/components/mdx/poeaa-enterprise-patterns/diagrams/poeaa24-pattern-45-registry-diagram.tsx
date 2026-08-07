/**
 * <Poeaa24Pattern45Registry>：注册表结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720;
const VIEW_H = 300;
export function Poeaa24Pattern45RegistryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Registry 结构图。Registry 是全局可访问的查找点，通过键获取共享对象（如数据库连接、配置），替代全局变量。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Registry：全局查找点，按键取对象"
          />
          {/* 调用者 */}
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
            任意调用者
          </text>
          <text
            x={64}
            y={110}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            Registry.get("db")
          </text>
          <text x={64} y={128} fontSize="11" fill={T.secondary}>
            无需传递引用
          </text>
          {/* 箭头 */}
          <line
            x1={228}
            y1={104}
            x2={290}
            y2={104}
            stroke={T.accent}
            strokeWidth="1.5"
          />
          {/* Registry */}
          <rect
            x={290}
            y={64}
            width={180}
            height={100}
            rx="8"
            fill={T.accent}
            fillOpacity="0.06"
            stroke={T.accent}
            strokeWidth="1.5"
          />
          <rect
            x={290}
            y={64}
            width={180}
            height={28}
            rx="8"
            fill={T.accent}
            fillOpacity="0.12"
          />
          <rect
            x={290}
            y={84}
            width={180}
            height={8}
            fill={T.accent}
            fillOpacity="0.12"
          />
          <text
            x={380}
            y={83}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={T.accent}
          >
            Registry
          </text>
          <text
            x={306}
            y={110}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            "db" → Connection
          </text>
          <text
            x={306}
            y={128}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            "cfg" → Config
          </text>
          <text
            x={306}
            y={146}
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            "log" → Logger
          </text>
          {/* 右侧说明 */}
          <rect
            x={520}
            y={64}
            width={160}
            height={100}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={536} y={88} fontSize="11" fontWeight="600" fill={T.primary}>
            注意：
          </text>
          <text x={536} y={108} fontSize="11" fill={T.secondary}>
            本质是受控的
          </text>
          <text x={536} y={124} fontSize="11" fill={T.secondary}>
            全局变量
          </text>
          <text x={536} y={144} fontSize="11" fill={T.secondary}>
            测试时需可替换
          </text>
          <text x={536} y={160} fontSize="11" fill={T.secondary}>
            避免滥用
          </text>
          {/* 底部说明 */}
          <rect
            x={48}
            y={192}
            width={624}
            height={52}
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={64} y={214} fontSize="11" fill={T.secondary}>
            • 适用：确实需要全局共享且生命周期与应用一致的对象
          </text>
          <text x={64} y={232} fontSize="11" fill={T.secondary}>
            • 常见实例：Identity Map、数据库连接池、配置中心
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="Registry 提供全局查找点，按键获取共享对象"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Registry 是全局可访问的查找点，通过键获取共享对象，
        替代裸全局变量。本质是受控的全局状态，测试时需可替换。
      </figcaption>
    </figure>
  );
}
