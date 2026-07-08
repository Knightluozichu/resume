/**
 * <UscPhysicsDiagram>: Unity 物理系统
 *
 * Rigidbody + Collider + 物理事件(碰撞/触发) + 射线检测
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

export function UscPhysicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity物理系统。Rigidbody+Collider+物理事件+射线检测。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 物理系统
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Rigidbody(动力学) + Collider(碰撞体) + 事件 + 射线检测
          </text>
          {/* Rigidbody */}
          <g>
            <rect x={36} y={76} width={310} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>Rigidbody（动力学）</text>
            <text x={52} y={118} fontSize="11" fill={primary}>mass(质量) / drag(阻力)</text>
            <text x={52} y={134} fontSize="11" fill={primary}>useGravity / isKinematic</text>
            <text x={52} y={150} fontSize="11" fill={secondary}>AddForce / MovePosition</text>
          </g>
          {/* Collider */}
          <g>
            <rect x={374} y={76} width={310} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={98} fontSize="13" fontWeight="700" fill={success}>Collider（碰撞体）</text>
            <text x={390} y={118} fontSize="11" fill={primary}>Box/Sphere/Capsule/Mesh</text>
            <text x={390} y={134} fontSize="11" fill={primary}>isTrigger(触发器)</text>
            <text x={390} y={150} fontSize="11" fill={secondary}>物理碰撞 vs 触发检测</text>
          </g>
          {/* 碰撞事件 */}
          <g>
            <rect x={36} y={168} width={310} height={90} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={190} fontSize="13" fontWeight="700" fill={warning}>碰撞事件（物理阻挡）</text>
            <text x={52} y={210} fontSize="11" fill={primary}>OnCollisionEnter(进入)</text>
            <text x={52} y={226} fontSize="11" fill={primary}>OnCollisionStay(停留)</text>
            <text x={52} y={242} fontSize="11" fill={primary}>OnCollisionExit(离开)</text>
            <text x={52} y={256} fontSize="11" fill={secondary}>双方需有Collider，至少一方有Rigidbody</text>
          </g>
          {/* 触发事件 */}
          <g>
            <rect x={374} y={168} width={310} height={90} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={190} fontSize="13" fontWeight="700" fill={danger}>触发事件（穿透检测）</text>
            <text x={390} y={210} fontSize="11" fill={primary}>OnTriggerEnter(进入)</text>
            <text x={390} y={226} fontSize="11" fill={primary}>OnTriggerStay(停留)</text>
            <text x={390} y={242} fontSize="11" fill={primary}>OnTriggerExit(离开)</text>
            <text x={390} y={256} fontSize="11" fill={secondary}>Collider.isTrigger = true，无物理阻挡</text>
          </g>
          {/* 射线检测 */}
          <g>
            <rect x={36} y={270} width={648} height={60} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={292} fontSize="13" fontWeight="700" fill={primary}>射线检测（Raycast）</text>
            <text x={52} y={310} fontSize="11" fill={secondary}>Physics.Raycast(origin, direction, out hit, maxDistance, layerMask)</text>
            <text x={52} y={326} fontSize="11" fill={secondary}>Physics.OverlapSphere(范围检测) / Physics.SphereCast(球形射线)</text>
          </g>
          <text x={360} y={358} textAnchor="middle" fontSize="11" fill={secondary}>物理操作放 FixedUpdate，用 Time.fixedDeltaTime；Layer 控制碰撞过滤</text>
          <text x={360} y={374} textAnchor="middle" fontSize="11" fill={secondary}>isKinematic=true 的 Rigidbody 不受物理力影响但可移动并触发碰撞</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        物理系统：Rigidbody 提供动力学，Collider 提供碰撞体，事件回调通知碰撞/触发。
      </figcaption>
    </figure>
  );
}
