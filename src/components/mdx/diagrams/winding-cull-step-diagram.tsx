/**
 * <WindingCullStepDiagram step={1|2|3}>：「面剔除」§5「环绕顺序如何定正背面」<Stepper> 三步配图
 * （HEL-70，A 概念型）。用一个立方体上「朝你的正面三角形」与「背对你的背面三角形」演示判定全过程：
 *  ①模型里：三角形顶点按 v0→v1→v2 定义成逆时针 CCW（建模时约定的环绕顺序）。
 *  ②投影到屏幕后：朝向你的那个面，看到的环绕仍是逆时针 → 判为正面；背对你的那个面，
 *    因为是从背后看同样的顶点，环绕反转成顺时针 CW → 判为背面。
 *  ③剔除：背面（CW）被丢弃、根本不进光栅化/片段着色器，只有正面（CCW）留下来画。
 *
 * 每步左侧画「立方体的两个三角形面（朝你的 + 背对你的）」、右侧画「这一步对这两个面分别判定/处理的结论」，
 * 盯着右侧从『都还在 → 判出正背 → 背面被划掉』的变化，就懂了整套判定。
 *
 * view prop：
 *  - "full"（默认）：左「立方体两面」+ 右「本步结论」双栏，<Stepper> 三步用。
 *
 * Server Component（纯展示，静态 SVG，按 step prop 切状态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--success)/--danger/--accent/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type CullStep = 1 | 2 | 3;

const ARIA: Record<CullStep, string> = {
  1: "面剔除环绕顺序判定第一步，模型里的定义。左边画一个立方体，标出朝向观察者的正面三角形和背对观察者的背面三角形。这一步说明建模时所有三角形的顶点都按 v0 到 v1 到 v2 定义成逆时针 CCW 环绕。右边结论：两个面此刻只是按统一的逆时针顺序定义好顶点，还没有判定谁正谁背。",
  2: "面剔除环绕顺序判定第二步，投影到屏幕后看环绕方向。朝向观察者的那个面，投影到屏幕后看到的顶点环绕仍然是逆时针，判定为正面，用绿色标出。背对观察者的那个面，因为是从背后看同样的顶点，环绕方向反转成了顺时针，判定为背面，用红色标出。右边结论：靠投影后看到的环绕方向，正面是逆时针、背面是顺时针，两者区分开了。",
  3: "面剔除环绕顺序判定第三步，剔除背面。背面那个顺时针的三角形被剔除，直接划掉、根本不进光栅化和片段着色器，用红色划线标出丢弃。只有正面那个逆时针的三角形留下来被画出来。右边结论：背面不画、省掉它的片段开销，封闭立方体的背面反正被正面挡住，看不见也不画。",
};

/** 画一个简化立方体：用一个正面四边形 + 顶/右两个侧面，示意「朝你的面」和「背对你的面」。 */
function CubeFaces({ step }: { step: CullStep }) {
  // 立方体中心区域（左栏内）。
  // 朝你的正面（front）：正对屏幕的方形。背对你的背面（back）：藏在后面，用虚线示意其位置。
  const frontFill = step >= 2 ? "var(--success)" : "var(--accent)";
  const frontStroke = step >= 2 ? "var(--success)" : "var(--accent)";
  // 背面在 step3 被剔除（划掉、淡出）。
  const backOpacity = step === 3 ? 0.25 : 0.55;
  return (
    <g>
      {/* 背面方块（画在后上方，示意「立方体背对你的那一面」） */}
      <rect
        x="104"
        y="48"
        width="92"
        height="92"
        rx="3"
        fill="var(--danger)"
        fillOpacity={step >= 2 ? 0.12 : 0.1}
        stroke="var(--danger)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity={backOpacity}
      />
      {/* 背面环绕箭头（顺时针，step>=2 显现）+ 背面标签 */}
      {step >= 2 && (
        <text
          x="150"
          y="70"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          className="font-mono"
          fill="var(--danger)"
          opacity={backOpacity}
        >
          背面 CW
        </text>
      )}
      {/* step3：把背面划掉，示意被剔除 */}
      {step === 3 && (
        <line
          x1="108"
          y1="52"
          x2="192"
          y2="136"
          stroke="var(--danger)"
          strokeWidth="2.5"
        />
      )}

      {/* 连接线：把前后两面连成立方体的样子 */}
      <line
        x1="60"
        y1="92"
        x2="104"
        y2="48"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <line
        x1="152"
        y1="92"
        x2="196"
        y2="48"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <line
        x1="60"
        y1="184"
        x2="104"
        y2="140"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <line
        x1="152"
        y1="184"
        x2="196"
        y2="140"
        stroke="var(--border)"
        strokeWidth="1.5"
      />

      {/* 朝你的正面方块（正对屏幕） */}
      <rect
        x="60"
        y="92"
        width="92"
        height="92"
        rx="3"
        fill={frontFill}
        fillOpacity="0.18"
        stroke={frontStroke}
        strokeWidth="2"
      />
      {/* 正面环绕箭头（逆时针），始终显示 */}
      <defs>
        <marker
          id="cull-front-arc"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={frontStroke} />
        </marker>
      </defs>
      <path
        d="M124 138 A 18 18 0 1 0 100 121"
        fill="none"
        stroke={frontStroke}
        strokeWidth="2"
        markerEnd="url(#cull-front-arc)"
      />
      <text
        x="106"
        y="180"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        className="font-mono"
        fill={frontStroke}
      >
        {step >= 2 ? "正面 CCW" : "CCW"}
      </text>
    </g>
  );
}

export function WindingCullStepDiagram({ step }: { step: CullStep }) {
  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 250"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* ============ 左：立方体的「朝你 / 背对你」两个面 ============ */}
          <text
            x="130"
            y="32"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            立方体（朝你 + 背对你两个面）
          </text>
          <CubeFaces step={step} />

          {/* 观察者（眼睛）示意，点出「朝向谁」 */}
          <text
            x="130"
            y="218"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            你在屏幕这一侧看
          </text>

          {/* 分隔竖线 */}
          <line
            x1="270"
            y1="40"
            x2="270"
            y2="218"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右：本步结论 ============ */}
          <text
            x="395"
            y="32"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            这一步发生了什么
          </text>

          {step === 1 && (
            <>
              <text
                x="395"
                y="92"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                建模时统一约定
              </text>
              <text
                x="395"
                y="122"
                textAnchor="middle"
                fontSize="12"
                className="font-mono"
                fill="var(--accent)"
              >
                v0 → v1 → v2 逆时针
              </text>
              <text
                x="395"
                y="152"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                两个面都按同一顺序定义顶点
              </text>
              <text
                x="395"
                y="172"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                此刻还没判谁正谁背
              </text>
            </>
          )}

          {step === 2 && (
            <>
              <text
                x="395"
                y="86"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                投影到屏幕，看环绕方向
              </text>
              <text
                x="395"
                y="116"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--success)"
              >
                朝你的：仍逆时针 → 正面
              </text>
              <text
                x="395"
                y="142"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--danger)"
              >
                背对你的：反转成顺时针 → 背面
              </text>
              <text
                x="395"
                y="172"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                从背后看，环绕方向自动反过来
              </text>
            </>
          )}

          {step === 3 && (
            <>
              <text
                x="395"
                y="86"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                剔除背面（默认剔 GL_BACK）
              </text>
              <rect
                x="312"
                y="100"
                width="166"
                height="32"
                rx="16"
                fill="var(--danger)"
                opacity="0.16"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="395"
                y="120"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--danger)"
              >
                背面 CW → 丢弃、不画
              </text>
              <text
                x="395"
                y="158"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                背面反正被正面挡住、看不见
              </text>
              <text
                x="395"
                y="178"
                textAnchor="middle"
                fontSize="11"
                fill="var(--success)"
                fontWeight="600"
              >
                省掉它的片段开销
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        盯着这两个面：第 ① 步它们顶点都按 <code>v0→v1→v2</code>{" "}
        <strong>逆时针</strong>定义；第 ② 步投影到屏幕后，朝你的看着仍是
        <strong>逆时针（正面）</strong>、背对你的反转成
        <strong>顺时针（背面）</strong>；第 ③ 步把背面那个
        <strong>剔掉不画</strong>，省下它的片段开销。
      </figcaption>
    </figure>
  );
}
