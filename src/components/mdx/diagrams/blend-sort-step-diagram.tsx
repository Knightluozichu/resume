/**
 * <BlendSortStepDiagram step={1|2|3}>：「混合」§5「半透明排序」<Stepper> 三步配图（HEL-69，C 实战型）。
 *
 * 同一套「侧视镜头 + 三块半透明玻璃 + 一面不透明墙」的 SVG 骨架，按 step 演示
 * 从「乱序穿帮」到「正确透叠」的修法：
 *  ①乱序画（穿帮）：不分先后随便画三块半透明玻璃。先画的近玻璃占了深度缓冲，后画的远玻璃
 *    落在它后面被深度测试整片丢弃 → 远玻璃透不出来，标红「被丢弃」。结果穿帮。
 *  ②第一招：先画所有不透明物体（那面墙），用正常深度测试。墙画好、深度缓冲记下它。
 *    这一步还没画半透明物，只是把「底」铺好。
 *  ③第二招：把半透明玻璃从远到近排序，关掉深度写入（glDepthMask(false)）后逐块画。
 *    每块都叠在已画好的更远色之上，over 混合层层透出 → 透视正确。三块玻璃绿色高亮「正确透叠」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type BlendSortStep = 1 | 2 | 3;

const ARIA: Record<BlendSortStep, string> = {
  1: "半透明排序第一步，乱序画导致穿帮。不分先后随便画三块半透明玻璃，先画的近玻璃占了深度缓冲，后画的更远玻璃落在它后面，被深度测试当成更远整片丢弃，导致远玻璃透不出来，那块标红显示被丢弃，画面穿帮。",
  2: "半透明排序第二步，第一招先画所有不透明物体。先把那面不透明的墙用正常深度测试画好，深度缓冲记下墙的深度。这一步只铺好不透明的底，还没开始画半透明玻璃。",
  3: "半透明排序第三步，第二招把半透明玻璃从远到近排序、关掉深度写入后逐块画。先画最远的玻璃、再画中间、最后画最近，每块都叠加在已经画好的更远色之上，over 混合层层透出，三块玻璃绿色高亮，透视正确不再穿帮。",
};

export function BlendSortStepDiagram({ step }: { step: BlendSortStep }) {
  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 260"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* ===== 镜头（左侧）===== */}
          <path
            d="M30 120 l28 -18 l0 36 z"
            fill="var(--text-secondary)"
            opacity="0.8"
          />
          <text
            x="44"
            y="172"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            镜头
          </text>
          <line
            x1="62"
            y1="120"
            x2="470"
            y2="120"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text
            x="466"
            y="112"
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            越往右越远 →
          </text>

          {/* ===== 不透明墙（最远，步②③出现）===== */}
          {step >= 2 && (
            <>
              <rect
                x="430"
                y="58"
                width="22"
                height="124"
                rx="3"
                fill="var(--border)"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              />
              <text
                x="441"
                y="200"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                不透明墙
              </text>
            </>
          )}

          {/* ===== 三块半透明玻璃（侧视：竖条，x 越大越远）===== */}
          {step === 1 && (
            <>
              {/* 近玻璃：先画，正常显示 */}
              <rect
                x="150"
                y="62"
                width="16"
                height="116"
                rx="3"
                fill="var(--accent)"
                opacity="0.5"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x="158"
                y="196"
                textAnchor="middle"
                fontSize="9"
                fill="var(--accent)"
              >
                ①近(先画)
              </text>
              {/* 中玻璃：被丢弃 */}
              <rect
                x="250"
                y="62"
                width="16"
                height="116"
                rx="3"
                fill="none"
                stroke="var(--danger)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x="258"
                y="196"
                textAnchor="middle"
                fontSize="9"
                fill="var(--danger)"
              >
                被丢弃
              </text>
              {/* 远玻璃：被丢弃 */}
              <rect
                x="350"
                y="62"
                width="16"
                height="116"
                rx="3"
                fill="none"
                stroke="var(--danger)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x="358"
                y="196"
                textAnchor="middle"
                fontSize="9"
                fill="var(--danger)"
              >
                被丢弃
              </text>
            </>
          )}

          {step === 3 && (
            <>
              {/* 三块从远到近都正确透叠（绿色高亮） */}
              <rect
                x="150"
                y="62"
                width="16"
                height="116"
                rx="3"
                fill="var(--accent)"
                opacity="0.5"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="158"
                y="196"
                textAnchor="middle"
                fontSize="9"
                fill="var(--success)"
              >
                ③近(后画)
              </text>
              <rect
                x="250"
                y="62"
                width="16"
                height="116"
                rx="3"
                fill="var(--warning)"
                opacity="0.4"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="258"
                y="196"
                textAnchor="middle"
                fontSize="9"
                fill="var(--success)"
              >
                ②中
              </text>
              <rect
                x="350"
                y="62"
                width="16"
                height="116"
                rx="3"
                fill="var(--success)"
                opacity="0.4"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="358"
                y="196"
                textAnchor="middle"
                fontSize="9"
                fill="var(--success)"
              >
                ①远(先画)
              </text>
            </>
          )}

          {/* ===== 底部本步状态 ===== */}
          {step === 1 && (
            <>
              <rect
                x="120"
                y="216"
                width="280"
                height="32"
                rx="16"
                fill="var(--danger)"
                opacity="0.14"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="260"
                y="236"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--danger)"
              >
                穿帮：后画的远玻璃被深度测试丢掉
              </text>
            </>
          )}

          {step === 2 && (
            <>
              <text
                x="260"
                y="232"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                第一招：先画不透明物（墙），正常深度测试
              </text>
              <text
                x="260"
                y="252"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                把「底」铺好，半透明物随后再画
              </text>
            </>
          )}

          {step === 3 && (
            <>
              <rect
                x="96"
                y="216"
                width="328"
                height="32"
                rx="16"
                fill="var(--success)"
                opacity="0.14"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="260"
                y="236"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--success)"
              >
                第二招：半透明从远到近 + 关深度写入 → 正确透叠
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            <strong>乱序画</strong>：先画的近玻璃占了深度缓冲，后画的更远玻璃被
            <strong>深度测试</strong>当成「更远」整片丢弃 →{" "}
            <strong>穿帮</strong>。
          </>
        )}
        {step === 2 && (
          <>
            <strong>第一招</strong>：先画好所有<strong>不透明物体</strong>
            （那面墙），用正常深度测试把「底」铺好，再处理半透明物。
          </>
        )}
        {step === 3 && (
          <>
            <strong>第二招</strong>：半透明玻璃<strong>从远到近</strong>排序、
            <strong>关掉深度写入</strong>后逐块叠画，over 混合层层透出 →
            透视正确。
          </>
        )}
      </figcaption>
    </figure>
  );
}
