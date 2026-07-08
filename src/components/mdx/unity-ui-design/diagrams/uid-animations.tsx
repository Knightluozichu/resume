/**
 * <UidAnimationsDiagram>: UI 动画方案对比
 *
 * Animator/DOTween/LeanTween/Lerp 四种方案的对比
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

export function UidAnimationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UI动画方案对比。Animator、DOTween、LeanTween、Lerp四种方案的优缺点。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            UI 动画方案对比
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四种方案：Animator / DOTween / LeanTween / 手动Lerp
          </text>
          {/* Animator */}
          <g>
            <rect x={36} y={76} width={160} height={130} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={116} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Animator</text>
            <text x={52} y={120} fontSize="11" fill={success}>+ 可视化编辑</text>
            <text x={52} y={136} fontSize="11" fill={success}>+ 状态机管理</text>
            <text x={52} y={152} fontSize="11" fill={success}>+ 复杂动画链</text>
            <text x={52} y={170} fontSize="11" fill={danger}>- 性能开销大</text>
            <text x={52} y={186} fontSize="11" fill={danger}>- 需 Animator 组件</text>
          </g>
          {/* DOTween */}
          <g>
            <rect x={212} y={76} width={160} height={130} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={292} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>DOTween</text>
            <text x={228} y={120} fontSize="11" fill={success}>+ 链式API简洁</text>
            <text x={228} y={136} fontSize="11" fill={success}>+ 性能优秀</text>
            <text x={228} y={152} fontSize="11" fill={success}>+ 缓动函数丰富</text>
            <text x={228} y={170} fontSize="11" fill={danger}>- 需第三方库</text>
            <text x={228} y={186} fontSize="11" fill={danger}>- 需管理生命周期</text>
          </g>
          {/* LeanTween */}
          <g>
            <rect x={388} y={76} width={160} height={130} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={468} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>LeanTween</text>
            <text x={404} y={120} fontSize="11" fill={success}>+ 轻量级</text>
            <text x={404} y={136} fontSize="11" fill={success}>+ 链式调用</text>
            <text x={404} y={152} fontSize="11" fill={success}>+ 开源免费</text>
            <text x={404} y={170} fontSize="11" fill={danger}>- 已停止维护</text>
            <text x={404} y={186} fontSize="11" fill={danger}>- API不如DOTween</text>
          </g>
          {/* Lerp */}
          <g>
            <rect x={564} y={76} width={120} height={130} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={624} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>手动Lerp</text>
            <text x={580} y={120} fontSize="11" fill={success}>+ 零依赖</text>
            <text x={580} y={136} fontSize="11" fill={success}>+ 完全可控</text>
            <text x={580} y={152} fontSize="11" fill={success}>+ 最小开销</text>
            <text x={580} y={170} fontSize="11" fill={danger}>- 代码量大</text>
            <text x={580} y={186} fontSize="11" fill={danger}>- 缓动需手写</text>
          </g>
          {/* 适用场景 */}
          <g>
            <rect x={36} y={218} width={648} height={72} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={240} fontSize="12" fontWeight="700" fill={primary}>适用场景推荐</text>
            <text x={52} y={258} fontSize="11" fill={secondary}>Animator：复杂状态机动画（如角色面板切换）</text>
            <text x={52} y={274} fontSize="11" fill={secondary}>DOTween：日常UI动画首选（淡入淡出/位移/缩放/弹跳）</text>
            <text x={340} y={258} fontSize="11" fill={secondary}>LeanTween：轻量项目替代方案</text>
            <text x={340} y={274} fontSize="11" fill={secondary}>Lerp：极简动画或性能极致场景</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={302} width={648} height={68} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={324} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心原则：UI动画用 DOTween，复杂状态用 Animator，极简用 Lerp</text>
            <text x={360} y={344} textAnchor="middle" fontSize="11" fill={secondary}>动画完成后务必 Kill tween 释放资源，避免内存泄漏</text>
            <text x={360} y={360} textAnchor="middle" fontSize="11" fill={secondary}>UI 动画时长 0.2~0.3s 体验最佳，超过 0.5s 会感觉迟钝</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UI 动画四种方案对比：DOTween 是日常首选，Animator 适合复杂状态机。
      </figcaption>
    </figure>
  );
}
