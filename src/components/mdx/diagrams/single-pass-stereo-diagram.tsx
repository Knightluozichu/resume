/**
 * <SinglePassStereoDiagram mode="multi|single">：
 * Multi-Pass 双眼 vs Single Pass Instanced 渲染路径对比。
 */

type StereoMode = "multi" | "single";

interface Props {
  mode?: StereoMode;
}

export function SinglePassStereoDiagram({ mode = "single" }: Props) {
  const isSingle = mode === "single";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 260"
          role="img"
          aria-label={
            isSingle
              ? "Single Pass Instanced 一次 Draw 双眼"
              : "Multi-Pass 双眼各渲染一次"
          }
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x="20" y="26" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            {isSingle ? "Single Pass Instanced（推荐）" : "Multi-Pass Stereo（Legacy）"}
          </text>
          <text x="20" y="44" fontSize="10" fill="var(--text-secondary)">
            {isSingle
              ? "一次 Draw Call · GPU Instancing 数组 index 区分左右眼"
              : "场景遍历 ×2 · SetPass/State 切换翻倍"}
          </text>

          {/* 场景源 */}
          <rect x="20" y="60" width="100" height="48" rx="6" fill="var(--bg)" stroke="var(--border)" />
          <text x="70" y="88" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            场景网格
          </text>

          {isSingle ? (
            <>
              <line x1="120" y1="84" x2="180" y2="84" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#sps-arrow)" />
              <rect x="180" y="58" width="160" height="52" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
              <text x="260" y="80" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">
                1× Draw + SV_InstanceID
              </text>
              <text x="260" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
                unity_StereoEyeIndex
              </text>
              <line x1="340" y1="72" x2="400" y2="56" stroke="var(--accent)" strokeWidth="1.5" />
              <line x1="340" y1="96" x2="400" y2="112" stroke="var(--accent)" strokeWidth="1.5" />
              <rect x="400" y="40" width="90" height="36" rx="4" fill="var(--bg)" stroke="var(--border)" />
              <text x="445" y="62" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
                左眼 RT
              </text>
              <rect x="400" y="88" width="90" height="36" rx="4" fill="var(--bg)" stroke="var(--border)" />
              <text x="445" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
                右眼 RT
              </text>
            </>
          ) : (
            <>
              <line x1="120" y1="76" x2="170" y2="76" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="120" y1="92" x2="170" y2="108" stroke="var(--border)" strokeWidth="1.5" />
              <rect x="170" y="52" width="120" height="40" rx="6" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.5" />
              <text x="230" y="76" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
                Pass 1 · 左眼
              </text>
              <rect x="170" y="100" width="120" height="40" rx="6" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.5" />
              <text x="230" y="124" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
                Pass 2 · 右眼
              </text>
              <rect x="320" y="52" width="80" height="36" rx="4" fill="var(--bg)" stroke="var(--border)" />
              <rect x="320" y="100" width="80" height="36" rx="4" fill="var(--bg)" stroke="var(--border)" />
              <text x="420" y="76" fontSize="9" fill="var(--danger)">
                CPU 提交 ×2
              </text>
              <text x="420" y="124" fontSize="9" fill="var(--danger)">
                SetPass ×2
              </text>
            </>
          )}

          {/* Shader 分支示意 */}
          <rect x="20" y="140" width="480" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" />
          <text x="36" y="162" fontSize="10" fontWeight="600" fill="var(--text-primary)">
            URP / Shader 要求
          </text>
          {isSingle ? (
            <>
              <text x="36" y="182" fontSize="9" fill="var(--text-secondary)">
                • 启用 XR Plug-in Management + URP Renderer「Single Pass Instanced」
              </text>
              <text x="36" y="198" fontSize="9" fill="var(--text-secondary)">
                • Shader 用 unity_StereoEyeIndex 选 MVP · 避免硬编码单眼矩阵
              </text>
              <text x="36" y="214" fontSize="9" fill="var(--text-secondary)">
                • Post 需 XR 兼容或按眼拆分 · 自定义全屏 Pass 要测双眼
              </text>
            </>
          ) : (
            <>
              <text x="36" y="182" fontSize="9" fill="var(--text-secondary)">
                • 每物体两次 cull + draw · Batches 统计接近翻倍
              </text>
              <text x="36" y="198" fontSize="9" fill="var(--text-secondary)">
                • 透明排序/后处理需分别处理两眼 · 移动端极少使用
              </text>
              <text x="36" y="214" fontSize="9" fill="var(--danger)">
                • 迁移到 Single Pass 可显著降 CPU 与驱动开销
              </text>
            </>
          )}

          <defs>
            <marker id="sps-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {isSingle
          ? "Single Pass Instanced 用 GPU 实例化在一次提交里画双眼，是 URP XR 的默认高效路径。"
          : "Multi-Pass 对同一场景渲染两遍，CPU/GPU 状态切换成本接近翻倍，仅作兼容 fallback。"}
      </figcaption>
    </figure>
  );
}
