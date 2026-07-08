/**
 * <UscCoroutinesDiagram>: Unity 协程系统
 *
 * IEnumerator + yield + StartCoroutine 的跨帧执行机制
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UscCoroutinesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity协程系统。IEnumerator+yield+StartCoroutine的跨帧执行机制。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 协程系统
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            IEnumerator + yield 指令 + 跨帧执行
          </text>
          {/* 执行流程 */}
          <g>
            <rect x={36} y={76} width={648} height={120} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>协程执行流程</text>
            <rect x={60} y={110} width={120} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={120} y={132} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>StartCoroutine</text>
            <line x1={180} y1={128} x2={200} y2={128} stroke={border} strokeWidth="1.5" markerEnd="url(#uscCoroutines-arrow)" />
            <rect x={200} y={110} width={100} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={250} y={132} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>执行到yield</text>
            <line x1={300} y1={128} x2={320} y2={128} stroke={border} strokeWidth="1.5" markerEnd="url(#uscCoroutines-arrow)" />
            <rect x={320} y={110} width={100} height={36} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
            <text x={370} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>暂停</text>
            <text x={370} y={142} textAnchor="middle" fontSize="11" fill={secondary}>等待条件</text>
            <line x1={420} y1={128} x2={440} y2={128} stroke={border} strokeWidth="1.5" markerEnd="url(#uscCoroutines-arrow)" />
            <rect x={440} y={110} width={100} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={490} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>条件满足</text>
            <text x={490} y={142} textAnchor="middle" fontSize="11" fill={secondary}>下一帧恢复</text>
            <line x1={540} y1={128} x2={560} y2={128} stroke={border} strokeWidth="1.5" markerEnd="url(#uscCoroutines-arrow)" />
            <rect x={560} y={110} width={100} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={610} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>继续执行</text>
            <text x={610} y={142} textAnchor="middle" fontSize="11" fill={secondary}>到下一个yield</text>
            <text x={360} y={178} textAnchor="middle" fontSize="11" fill={secondary}>协程在主线程执行，不是多线程，只是将逻辑分摊到多帧</text>
          </g>
          {/* yield 指令 */}
          <g>
            <rect x={36} y={208} width={310} height={90} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={230} fontSize="13" fontWeight="700" fill={success}>yield 指令</text>
            <text x={52} y={250} fontSize="11" fill={primary}>WaitForSeconds(delay)</text>
            <text x={52} y={264} fontSize="11" fill={secondary}>等待秒数（受TimeScale影响）</text>
            <text x={52} y={282} fontSize="11" fill={primary}>WaitForEndOfFrame / WaitForFixedUpdate</text>
            <text x={52} y={296} fontSize="11" fill={primary}>yield return null（等一帧）</text>
          </g>
          {/* 生命周期 */}
          <g>
            <rect x={374} y={208} width={310} height={90} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={230} fontSize="13" fontWeight="700" fill={warning}>生命周期管理</text>
            <text x={390} y={250} fontSize="11" fill={primary}>StartCoroutine(fn())</text>
            <text x={390} y={264} fontSize="11" fill={secondary}>返回 Coroutine 对象</text>
            <text x={390} y={282} fontSize="11" fill={primary}>StopCoroutine(coroutine)</text>
            <text x={390} y={296} fontSize="11" fill={secondary}>StopAllCoroutines() / 对象禁用自动停</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={312} width={648} height={64} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={334} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>协程适合：延迟操作、动画序列、异步加载、分帧计算</text>
            <text x={360} y={354} textAnchor="middle" fontSize="11" fill={secondary}>不适合CPU密集计算（仍阻塞主线程），真正并行用 Job System / Task</text>
            <text x={360} y={370} textAnchor="middle" fontSize="11" fill={secondary}>对象禁用(OnDisable)时协程自动停止，重新启用不会自动恢复</text>
          </g>
          <defs>
            <marker id="uscCoroutines-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        协程系统：yield 指令暂停跨帧执行，适合延迟操作和异步流程。
      </figcaption>
    </figure>
  );
}
