/**
 * <PccFinalReviewDiagram>：Python 全书知识串联图。
 *
 * 从基础语法到项目实战的完整知识链条，展示各板块如何串联。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function PccFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 全书知识串联：变量列表→控制流函数→类文件异常→项目实战。从数据存储到逻辑控制再到工程实践，层层递进。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            全书知识串联：从语法到项目
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            数据存储 → 逻辑控制 → 抽象封装 → 工程实践
          </text>

          {/* 四层知识链 */}
          {/* Layer 1: 数据存储 */}
          <rect x={32} y={76} width={656} height={72} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={98} fontSize="12" fontWeight="700" fill={accent}>Layer 1 · 数据存储</text>
          <text x={56} y={116} fontSize="11" fill={secondary}>变量（标签→对象）· 列表/字典/集合 · 字符串操作</text>
          <text x={56} y={134} fontSize="11" fill={secondary}>→ 一切编程的起点：如何在内存中组织和操作数据</text>

          {/* 箭头 */}
          <line x1={360} y1={148} x2={360} y2={160} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-fr-arrow)" />

          {/* Layer 2: 逻辑控制 */}
          <rect x={32} y={160} width={656} height={72} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={182} fontSize="12" fontWeight="700" fill={success}>Layer 2 · 逻辑控制</text>
          <text x={56} y={200} fontSize="11" fill={secondary}>if-elif-else 分支 · while/for 循环 · 函数定义与参数</text>
          <text x={56} y={218} fontSize="11" fill={secondary}>→ 让数据动起来：根据条件做判断，重复执行，封装复用</text>

          {/* 箭头 */}
          <line x1={360} y1={232} x2={360} y2={244} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-fr-arrow)" />

          {/* Layer 3: 抽象封装 */}
          <rect x={32} y={244} width={656} height={72} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={266} fontSize="12" fontWeight="700" fill={warning}>Layer 3 · 抽象封装</text>
          <text x={56} y={284} fontSize="11" fill={secondary}>类与继承 · 文件 I/O · 异常处理 · 单元测试</text>
          <text x={56} y={302} fontSize="11" fill={secondary}>→ 从脚本到工程：用类组织数据+行为，用异常处理错误，用测试保证质量</text>

          {/* 箭头 */}
          <line x1={360} y1={316} x2={360} y2={328} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-fr-arrow)" />

          {/* Layer 4: 工程实践 */}
          <rect x={32} y={328} width={656} height={72} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={350} fontSize="12" fontWeight="700" fill={danger}>Layer 4 · 工程实践</text>
          <text x={56} y={368} fontSize="11" fill={secondary}>游戏开发（Pygame）· 数据可视化（Matplotlib/Plotly）· API 调用</text>
          <text x={56} y={386} fontSize="11" fill={secondary}>→ 综合应用：用前三层知识构建完整项目，从"会写代码"到"能做产品"</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>
            数据是原料 · 逻辑是加工 · 封装是结构 · 项目是成品
          </text>

          <defs>
            <marker id="pcc-fr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 全书四层知识链：数据存储→逻辑控制→抽象封装→工程实践，层层递进。
      </figcaption>
    </figure>
  );
}
