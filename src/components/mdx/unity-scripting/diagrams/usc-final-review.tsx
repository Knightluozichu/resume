/**
 * <UscFinalReviewDiagram>: Unity 脚本设计全书复习
 *
 * 四大板块知识点总结图
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

export function UscFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity脚本设计全书复习。四大板块核心知识点总结。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 脚本设计全书复习
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四大板块核心知识点串联
          </text>
          <g>
            <rect x={36} y={76} width={316} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>脚本基础</text>
            <text x={52} y={118} fontSize="11" fill={primary}>MonoBehaviour + 生命周期 + SerializeField</text>
            <text x={52} y={136} fontSize="11" fill={secondary}>Awake/Start/Update/FixedUpdate；构造函数禁用UnityAPI</text>
          </g>
          <g>
            <rect x={368} y={76} width={316} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={384} y={98} fontSize="13" fontWeight="700" fill={success}>组件系统</text>
            <text x={384} y={118} fontSize="11" fill={primary}>GameObject+Component + GetComponent + 事件</text>
            <text x={384} y={136} fontSize="11" fill={secondary}>组合优于继承；OnEnable订阅/OnDisable取消</text>
          </g>
          <g>
            <rect x={36} y={168} width={316} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={190} fontSize="13" fontWeight="700" fill={warning}>核心机制</text>
            <text x={52} y={210} fontSize="11" fill={primary}>物理 + 协程 + ScriptableObject</text>
            <text x={52} y={228} fontSize="11" fill={secondary}>FixedUpdate物理；yield跨帧；SO数据资产化</text>
          </g>
          <g>
            <rect x={368} y={168} width={316} height={80} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={384} y={190} fontSize="13" fontWeight="700" fill={danger}>进阶编程</text>
            <text x={384} y={210} fontSize="11" fill={primary}>单例 + 对象池 + 状态机 + 观察者</text>
            <text x={384} y={228} fontSize="11" fill={secondary}>SOLID原则；模式是工具不是目标</text>
          </g>
          <g>
            <rect x={36} y={262} width={648} height={110} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={284} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>核心原则回顾</text>
            <text x={52} y={306} fontSize="11" fill={accent}>1. 组件协作：组合优于继承，职责单一，GetComponent缓存引用</text>
            <text x={52} y={324} fontSize="11" fill={success}>2. 生命周期：Awake初始化/Start引用/Update逻辑/FixedUpdate物理/OnEnable订阅</text>
            <text x={52} y={342} fontSize="11" fill={warning}>3. 异步用协程：yield跨帧，事件驱动，不在Update轮询</text>
            <text x={52} y={360} fontSize="11" fill={danger}>4. 架构解耦：数据用SO，通信用事件，复用用对象池，行为用状态机</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书复习：四大板块知识点串联，四条核心原则贯穿全书。
      </figcaption>
    </figure>
  );
}
