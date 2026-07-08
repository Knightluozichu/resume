/**
 * <UanIkSystemDiagram>: IK 逆向运动学系统
 *
 * 正向运动学 vs 逆向运动学 + IK应用场景
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UanIkSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="IK逆向运动学系统。正向运动学vs逆向运动学及IK应用场景。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            IK 逆向运动学系统
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            正向(FK) vs 逆向(IK) + IK 应用场景
          </text>
          {/* FK vs IK */}
          <g>
            <rect x={36} y={76} width={310} height={90} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>正向运动学 (FK)</text>
            <text x={52} y={118} fontSize="11" fill={primary}>旋转父骨骼 → 子骨骼跟随</text>
            <text x={52} y={134} fontSize="11" fill={secondary}>肩→肘→腕→手指 逐级旋转</text>
            <text x={52} y={154} fontSize="11" fill={success}>+ 简单直观，关键帧动画默认方式</text>
            <text x={52} y={170} fontSize="11" fill={danger}>- 无法直接控制末端位置</text>
          </g>
          <g>
            <rect x={374} y={76} width={310} height={90} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={98} fontSize="13" fontWeight="700" fill={success}>逆向运动学 (IK)</text>
            <text x={390} y={118} fontSize="11" fill={primary}>设定末端目标 → 自动算关节</text>
            <text x={390} y={134} fontSize="11" fill={secondary}>目标位置 → 反推肘/肩角度</text>
            <text x={390} y={154} fontSize="11" fill={success}>+ 脚贴地面/手抓物体</text>
            <text x={390} y={170} fontSize="11" fill={danger}>- 计算量大，可能多解</text>
          </g>
          {/* IK 应用 */}
          <g>
            <rect x={36} y={178} width={648} height={56} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={200} fontSize="13" fontWeight="700" fill={warning}>IK 应用场景</text>
            <text x={52} y={218} fontSize="11" fill={primary}>脚部贴合地面(斜坡/台阶) | 手部抓取物体 | 头部注视目标 | 武器握持</text>
          </g>
          {/* 代码流程 */}
          <g>
            <rect x={36} y={246} width={648} height={80} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={268} fontSize="13" fontWeight="700" fill={primary}>OnAnimatorIK 回调流程</text>
            <text x={52} y={286} fontSize="11" fill={secondary}>1. 设置 IK 权重：SetIKPositionWeight(goal, 1f)</text>
            <text x={52} y={302} fontSize="11" fill={secondary}>2. 设置 IK 目标：SetIKPosition(goal, targetPos)</text>
            <text x={52} y={318} fontSize="11" fill={secondary}>3. 可选：SetIKRotation(goal, targetRot)</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={338} width={648} height={40} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={360} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心价值：FK 做主体动画，IK 补细节（脚贴地/手抓物/头注视）</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        IK 系统：设定末端目标自动反推关节角度，实现脚贴地面/手抓物体。
      </figcaption>
    </figure>
  );
}
