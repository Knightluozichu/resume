/**
 * <LupCoroutinesDiagram>：Lua 协程——协作式多任务。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function LupCoroutinesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 协程：create 创建、resume 恢复、yield 挂起。协程是协作式多任务，单线程内切换执行权。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            协程：协作式多任务
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            create → resume → yield → resume · 单线程内切换执行权
          </text>

          {/* 协程生命周期 */}
          <text x={360} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            协程状态流转
          </text>

          {/* 状态节点 */}
          <rect x={40} y={92} width={120} height={44} rx="8" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={100} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>suspended</text>
          <text x={100} y={128} textAnchor="middle" fontSize="11" fill={secondary}>（初始）</text>

          <line x1={160} y1={114} x2={200} y2={114} stroke={success} strokeWidth="1.4" markerEnd="url(#lup-co-arrow)" />
          <text x={180} y={108} textAnchor="middle" fontSize="11" fill={success}>resume</text>

          <rect x={200} y={92} width={120} height={44} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={260} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>running</text>
          <text x={260} y={128} textAnchor="middle" fontSize="11" fill={secondary}>（执行中）</text>

          <line x1={320} y1={114} x2={360} y2={114} stroke={warning} strokeWidth="1.4" markerEnd="url(#lup-co-arrow)" />
          <text x={340} y={108} textAnchor="middle" fontSize="11" fill={warning}>yield</text>

          <rect x={360} y={92} width={120} height={44} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={420} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>suspended</text>
          <text x={420} y={128} textAnchor="middle" fontSize="11" fill={secondary}>（挂起）</text>

          <line x1={480} y1={114} x2={520} y2={114} stroke={success} strokeWidth="1.4" markerEnd="url(#lup-co-arrow)" />
          <text x={500} y={108} textAnchor="middle" fontSize="11" fill={success}>resume</text>

          <rect x={520} y={92} width={120} height={44} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={580} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>dead</text>
          <text x={580} y={128} textAnchor="middle" fontSize="11" fill={secondary}>（完成/出错）</text>

          {/* 代码示例 */}
          <line x1={32} y1={156} x2={VIEW_W - 32} y2={156} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y={178} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            协程代码示例
          </text>

          <rect x={40} y={192} width={640} height={120} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={56} y={212} fontSize="11" fill={primary}>local co = coroutine.create(function(a)</text>
          <text x={56} y={230} fontSize="11" fill={primary}>  local b = coroutine.yield(a + 1)  -- 挂起，返回 a+1 给 resume</text>
          <text x={56} y={248} fontSize="11" fill={primary}>  return a + b                      -- 第二次 resume 恢复，b 来自 resume 参数</text>
          <text x={56} y={266} fontSize="11" fill={primary}>end)</text>
          <text x={56} y={288} fontSize="11" fill={success}>print(coroutine.resume(co, 10))  -- true  11   （a=10, yield 返回 11）</text>
          <text x={56} y={306} fontSize="11" fill={success}>print(coroutine.resume(co, 20))  -- true  30   （b=20, return 10+20=30）</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={340} textAnchor="middle" fontSize="11" fill={secondary}>
            resume 返回 (true, 返回值) 或 (false, 错误信息)
          </text>
          <text x={VIEW_W / 2} y={360} textAnchor="middle" fontSize="11" fill={secondary}>
            yield 的返回值 = 下一次 resume 传入的参数 · 协程是单线程的，不存在竞态
          </text>
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="11" fill={secondary}>
            应用：迭代器（pairs 基于协程）、生成器、异步回调模拟、游戏分帧逻辑
          </text>

          <defs>
            <marker id="lup-co-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 协程通过 resume/yield 在单线程内协作切换执行权，状态在 suspended/running/dead 间流转。
      </figcaption>
    </figure>
  );
}
