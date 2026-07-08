/**
 * <UsgCoroutineEventDiagram>: 协程与事件系统
 *
 * 协程执行流 + 事件订阅/发布
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UsgCoroutineEventDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="协程与事件系统。左侧为协程跨帧执行流程，右侧为事件订阅发布模型。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            协程与事件系统
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            协程 = 跨帧异步；事件 = 发布订阅解耦
          </text>
          {/* 协程执行流 */}
          <g>
            <rect x={36} y={74} width={336} height={300} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={204} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>协程执行流</text>
            <rect x={60} y={108} width={288} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={204} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>StartCoroutine(Routine())</text>
            <line x1={204} y1={138} x2={204} y2={150} stroke={accent} strokeWidth="1.2" />
            <rect x={60} y={150} width={288} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={204} y={170} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>yield return null（等一帧）</text>
            <line x1={204} y1={180} x2={204} y2={192} stroke={accent} strokeWidth="1.2" />
            <rect x={60} y={192} width={288} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={204} y={212} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>yield return WaitForSeconds(2f)</text>
            <line x1={204} y1={222} x2={204} y2={234} stroke={accent} strokeWidth="1.2" />
            <rect x={60} y={234} width={288} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={204} y={254} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>yield return WaitForFixedUpdate</text>
            <line x1={204} y1={264} x2={204} y2={276} stroke={accent} strokeWidth="1.2" />
            <rect x={60} y={276} width={288} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={204} y={296} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>继续执行...</text>
            <text x={204} y={324} textAnchor="middle" fontSize="10" fill={secondary}>StopCoroutine / StopAllCoroutines</text>
            <text x={204} y={342} textAnchor="middle" fontSize="10" fill={secondary}>yield return WWW/UnityWebRequest 异步加载</text>
            <text x={204} y={360} textAnchor="middle" fontSize="10" fill={secondary}>协程不是多线程，仍在主线程执行</text>
          </g>
          {/* 事件系统 */}
          <g>
            <rect x={392} y={74} width={292} height={300} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={538} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>事件系统（C# event）</text>
            {/* 发布者 */}
            <rect x={412} y={112} width={252} height={70} rx="6" fill={elevated} stroke={warning} strokeWidth="1.2" />
            <text x={538} y={132} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>发布者 EnemySpawner</text>
            <text x={538} y={150} textAnchor="middle" fontSize="10" fill={secondary}>public event Action OnEnemyDead;</text>
            <text x={538} y={166} textAnchor="middle" fontSize="10" fill={secondary}>OnEnemyDead?.Invoke();</text>
            {/* 订阅者 */}
            <rect x={412} y={196} width={120} height={56} rx="6" fill={elevated} stroke={accent} strokeWidth="1.2" />
            <text x={472} y={216} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>ScoreUI</text>
            <text x={472} y={234} textAnchor="middle" fontSize="10" fill={secondary}>+= 加分</text>
            <rect x={544} y={196} width={120} height={56} rx="6" fill={elevated} stroke={accent} strokeWidth="1.2" />
            <text x={604} y={216} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>QuestSystem</text>
            <text x={604} y={234} textAnchor="middle" fontSize="10" fill={secondary}>+= 计数</text>
            <line x1={538} y1={182} x2={472} y2={196} stroke={success} strokeWidth="1" strokeDasharray="3 2" />
            <line x1={538} y1={182} x2={604} y2={196} stroke={success} strokeWidth="1" strokeDasharray="3 2" />
            {/* 规则 */}
            <rect x={412} y={266} width={252} height={96} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={538} y={284} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>订阅生命周期规则</text>
            <text x={538} y={302} textAnchor="middle" fontSize="10" fill={secondary}>OnEnable: += 订阅</text>
            <text x={538} y={318} textAnchor="middle" fontSize="10" fill={secondary}>OnDisable: -= 取消订阅</text>
            <text x={538} y={334} textAnchor="middle" fontSize="10" fill={secondary}>防止内存泄漏与空引用</text>
            <text x={538} y={350} textAnchor="middle" fontSize="10" fill={secondary}>UnityAction / Action / Func 委托</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        协程用 yield return 跨帧延迟执行；事件用 += / -= 订阅发布实现组件解耦。
      </figcaption>
    </figure>
  );
}
