/**
 * <UapHotUpdateDiagram>：Unity 热更新方案图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapHotUpdateDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 热更新方案图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">热更新三代方案演进</text>
          <rect x="40" y="60" width="200" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="140" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-tertiary)">第一代 xLua</text>
          <text x="140" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Lua 写热更逻辑</text>
          <text x="140" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">桥接调用 C#</text>
          <text x="140" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">成熟稳定</text>
          <text x="140" y="168" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">需学两门语言</text>
          <rect x="260" y="60" width="200" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">第二代 ILRuntime</text>
          <text x="360" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">C# 编译为 IL</text>
          <text x="360" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">解释器解释执行</text>
          <text x="360" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">纯 C# 无需学 Lua</text>
          <text x="360" y="168" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">性能仅原生 1/5</text>
          <rect x="480" y="60" width="200" height="120" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="580" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">第三代 HybridCLR</text>
          <text x="580" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AOT + 解释混合</text>
          <text x="580" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">补充元数据</text>
          <text x="580" y="152" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">几乎原生性能</text>
          <text x="580" y="168" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">需 Unity 2022+</text>
          <text x="360" y="208" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">iOS 禁 JIT</text>
          <text x="360" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">iOS 沙箱禁止动态生成机器码</text>
          <text x="360" y="245" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">C# JIT 被拦截，必须用解释器</text>
          <text x="360" y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">热更新流程</text>
          <text x="360" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">版本比对 → 下载差异（增量）→ MD5 校验 → 加载执行</text>
          <rect x="80" y="320" width="140" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="150" y="343" textAnchor="middle" fontSize="10" fill="var(--success)">资源热更（全平台）</text>
          <rect x="290" y="320" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="360" y="343" textAnchor="middle" fontSize="10" fill="var(--accent)">代码热更（受限）</text>
          <rect x="500" y="320" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="570" y="343" textAnchor="middle" fontSize="10" fill="var(--warning)">两者配合使用</text>
          <text x="360" y="382" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">选型：Unity2022+ → HybridCLR；老项目 → xLua</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        热更新方案——三代演进，HybridCLR 是当前推荐
      </figcaption>
    </figure>
  );
}
