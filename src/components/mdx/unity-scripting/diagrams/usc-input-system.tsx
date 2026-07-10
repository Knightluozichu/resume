/**
 * <UscInputSystemDiagram>: Unity 输入系统
 *
 * 旧输入系统(Input Manager) vs 新输入系统(Input System Package)
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

export function UscInputSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity输入系统。旧输入系统与新输入系统的对比。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Unity 输入系统
          `}</text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>{`
            旧输入系统(Input Manager) vs 新输入系统(Input System Package)
          `}</text>
          {/* 旧输入系统 */}
          <g>
            <rect x={36} y={76} width={310} height={160} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={191} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>{`旧输入系统 Input Manager`}</text>
            <text x={52} y={122} fontSize="11" fill={success}>{`+ 简单易用，一行代码`}</text>
            <text x={52} y={138} fontSize="11" fill={success}>{`+ 内置，无需安装`}</text>
            <text x={52} y={154} fontSize="11" fill={success}>{`+ 适合原型开发`}</text>
            <text x={52} y={176} fontSize="11" fill={danger}>{`- 不支持热重载`}</text>
            <text x={52} y={192} fontSize="11" fill={danger}>{`- 多设备支持差`}</text>
            <text x={52} y={208} fontSize="11" fill={danger}>{`- 配置在ProjectSettings`}</text>
            <text x={52} y={224} fontSize="11" fill={danger}>{`- 已停止更新`}</text>
          </g>
          {/* 新输入系统 */}
          <g>
            <rect x={374} y={76} width={310} height={160} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={529} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`新输入系统 Input System`}</text>
            <text x={390} y={122} fontSize="11" fill={success}>{`+ 多设备统一(键鼠/手柄/触摸)`}</text>
            <text x={390} y={138} fontSize="11" fill={success}>{`+ 运行时重绑定`}</text>
            <text x={390} y={154} fontSize="11" fill={success}>{`+ 事件驱动(不用轮询)`}</text>
            <text x={390} y={176} fontSize="11" fill={success}>{`+ InputActionAsset可视化`}</text>
            <text x={390} y={192} fontSize="11" fill={success}>{`+ 支持VR/AR设备`}</text>
            <text x={390} y={208} fontSize="11" fill={danger}>{`- 需安装Package`}</text>
            <text x={390} y={224} fontSize="11" fill={danger}>{`- 学习曲线稍陡`}</text>
          </g>
          {/* API 对比 */}
          <g>
            <rect x={36} y={248} width={310} height={60} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={268} fontSize="11" fontWeight="600" fill={primary}>{`Input.GetAxis("Horizontal")`}</text>
            <text x={52} y={284} fontSize="11" fill={secondary}>{`Input.GetKeyDown(KeyCode.Space)`}</text>
            <text x={52} y={300} fontSize="11" fill={secondary}>{`Input.GetMouseButton(0)`}</text>
          </g>
          <g>
            <rect x={374} y={248} width={310} height={60} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={390} y={268} fontSize="11" fontWeight="600" fill={primary}>{`action.performed += ctx => { }`}</text>
            <text x={390} y={284} fontSize="11" fill={secondary}>{`action.ReadValue&lt;Vector2&gt;()`}</text>
            <text x={390} y={300} fontSize="11" fill={secondary}>{`PlayerInput组件自动绑定`}</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={322} width={648} height={52} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={344} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>{`选型建议：新项目用新输入系统，快速原型可用旧系统`}</text>
            <text x={360} y={362} textAnchor="middle" fontSize="11" fill={secondary}>{`新输入系统支持事件驱动、多设备统一、运行时重绑定，是未来方向`}</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        输入系统对比：旧系统简单但功能有限，新系统强大且面向未来。
      </figcaption>
    </figure>
  );
}
