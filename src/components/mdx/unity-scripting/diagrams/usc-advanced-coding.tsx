/**
 * <UscAdvancedCodingDiagram>: Unity 高级编程模式
 *
 * 单例/对象池/状态机/观察者 四大设计模式
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

export function UscAdvancedCodingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity高级编程模式。单例、对象池、状态机、观察者四大设计模式。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 高级编程模式
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四大设计模式：单例 / 对象池 / 状态机 / 观察者
          </text>
          {/* 单例 */}
          <g>
            <rect x={36} y={76} width={310} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>单例模式 (Singleton)</text>
            <text x={52} y={118} fontSize="11" fill={primary}>全局唯一访问点</text>
            <text x={52} y={134} fontSize="11" fill={success}>+ GameManager.Instance</text>
            <text x={52} y={150} fontSize="11" fill={danger}>- 滥用导致紧耦合</text>
          </g>
          {/* 对象池 */}
          <g>
            <rect x={374} y={76} width={310} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={98} fontSize="13" fontWeight="700" fill={success}>对象池 (Object Pool)</text>
            <text x={390} y={118} fontSize="11" fill={primary}>复用对象避免GC</text>
            <text x={390} y={134} fontSize="11" fill={success}>+ 子弹/粒子/敌人</text>
            <text x={390} y={150} fontSize="11" fill={danger}>- 需管理生命周期</text>
          </g>
          {/* 状态机 */}
          <g>
            <rect x={36} y={168} width={310} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={190} fontSize="13" fontWeight="700" fill={warning}>状态机 (FSM)</text>
            <text x={52} y={210} fontSize="11" fill={primary}>状态+转换+行为</text>
            <text x={52} y={226} fontSize="11" fill={success}>+ AI/角色行为管理</text>
            <text x={52} y={242} fontSize="11" fill={danger}>- 复杂状态用HSM</text>
          </g>
          {/* 观察者 */}
          <g>
            <rect x={374} y={168} width={310} height={80} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={190} fontSize="13" fontWeight="700" fill={danger}>观察者 (Observer)</text>
            <text x={390} y={210} fontSize="11" fill={primary}>事件驱动解耦</text>
            <text x={390} y={226} fontSize="11" fill={success}>+ UnityEvent / C# event</text>
            <text x={390} y={242} fontSize="11" fill={danger}>- 调试困难(谁订阅?)</text>
          </g>
          {/* SOLID 原则 */}
          <g>
            <rect x={36} y={260} width={648} height={56} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={282} fontSize="13" fontWeight="700" fill={primary}>SOLID 原则</text>
            <text x={52} y={300} fontSize="11" fill={secondary}>S(单一职责) O(开闭原则) L(里氏替换) I(接口隔离) D(依赖倒置)</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={328} width={648} height={48} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={350} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心原则：模式是工具不是目标——先有问题再选模式，不为了用模式而用</text>
            <text x={360} y={368} textAnchor="middle" fontSize="11" fill={secondary}>组合优于继承，接口优于具体类型，事件优于直接调用</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大设计模式：单例管理全局、对象池复用资源、状态机管理行为、观察者解耦通信。
      </figcaption>
    </figure>
  );
}
