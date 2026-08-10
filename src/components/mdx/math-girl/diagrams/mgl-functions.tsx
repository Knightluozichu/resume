"use client";

/**
 * <MglFunctionsDiagram>：函数复合与逆函数图解（mgl-functions 章）。
 *
 * 左侧：函数复合 f(g(x)) 的流程示意。
 * 右侧：逆函数示意 + 常见函数族对比。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function MglFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数复合与逆函数图解。左侧展示函数复合 f(g(x))：x→g(x)=2x→f(2x)=(2x)²+1=4x²+1，三个圆圈用箭头串联。右侧上方展示逆函数：f(x)=x²+1 和 f⁻¹(y)=√(y-1) 互为逆。右侧下方展示四种函数族的增长曲线对比：对数、线性、多项式、指数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            函数：复合、逆与函数族
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            函数是编程与数学的共通语言
          </text>

          <line
            x1="340"
            y1="74"
            x2="340"
            y2="400"
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 左侧：函数复合 ===== */}
          <text
            x="180"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            函数复合 (f ∘ g)(x)
          </text>

          {/* x → g → f → 结果 */}
          <ellipse
            cx="80"
            cy="140"
            rx="28"
            ry="20"
            fill={accent}
            fillOpacity="0.1"
            stroke={accent}
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="145"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={accent}
          >
            x
          </text>

          <line
            x1="112"
            y1="140"
            x2="138"
            y2="140"
            stroke={secondary}
            strokeWidth="1.4"
          />
          <polygon points="138,136 138,144 144,140" fill={secondary} />
          <text
            x="125"
            y="132"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            g
          </text>

          <ellipse
            cx="180"
            cy="140"
            rx="36"
            ry="20"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1.5"
          />
          <text
            x="180"
            y="144"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={success}
          >
            2x
          </text>

          <line
            x1="218"
            y1="140"
            x2="244"
            y2="140"
            stroke={secondary}
            strokeWidth="1.4"
          />
          <polygon points="244,136 244,144 250,140" fill={secondary} />
          <text
            x="231"
            y="132"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            f
          </text>

          <ellipse
            cx="290"
            cy="140"
            rx="40"
            ry="20"
            fill={warning}
            fillOpacity="0.1"
            stroke={warning}
            strokeWidth="1.5"
          />
          <text
            x="290"
            y="144"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={warning}
          >
            4x²+1
          </text>

          <text
            x="180"
            y="182"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            g(x)=2x → f(g(x))=(2x)²+1
          </text>

          {/* 逆函数 */}
          <rect
            x="48"
            y="208"
            width="280"
            height="76"
            rx="8"
            fill={danger}
            fillOpacity="0.06"
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="64" y="228" fontSize="12" fontWeight="700" fill={danger}>
            逆函数 f⁻¹
          </text>
          <text
            x="64"
            y="248"
            fontSize="11"
            fontFamily="monospace"
            fill={primary}
          >
            f:[0,∞)→[1,∞), f(x)=x²+1
          </text>
          <text
            x="64"
            y="266"
            fontSize="11"
            fontFamily="monospace"
            fill={primary}
          >
            f⁻¹(y) = √(y - 1)
          </text>
          <text x="64" y="280" fontSize="11" fill={secondary}>
            限制定义域与陪域后才有双边逆
          </text>

          {/* ===== 右侧：函数族 ===== */}
          <text
            x="530"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            函数族增长对比
          </text>

          {/* 坐标轴 */}
          <line
            x1="380"
            y1="280"
            x2="660"
            y2="280"
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1="380"
            y1="110"
            x2="380"
            y2="280"
            stroke={border}
            strokeWidth="1"
          />

          {/* 曲线 */}
          <path
            d="M 380 270 Q 500 264 660 250"
            fill="none"
            stroke={success}
            strokeWidth="2"
          />
          <text x="580" y="245" fontSize="11" fill={success}>
            log n（慢）
          </text>

          <path
            d="M 380 270 L 660 170"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          <text x="600" y="175" fontSize="11" fill={accent}>
            n（线性）
          </text>

          <path
            d="M 380 270 Q 500 260 660 160"
            fill="none"
            stroke={warning}
            strokeWidth="2"
          />
          <text x="610" y="160" fontSize="11" fill={warning}>
            n²（快）
          </text>

          <path
            d="M 380 270 Q 550 268 640 130"
            fill="none"
            stroke={danger}
            strokeWidth="2"
          />
          <text x="610" y="130" fontSize="11" fill={danger}>
            2ⁿ（爆炸）
          </text>

          <text
            x="520"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            x
          </text>
          <text
            x="368"
            y="120"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            y
          </text>

          {/* 底部总结 */}
          <rect
            x="48"
            y="304"
            width="624"
            height="72"
            rx="8"
            fill={accent}
            fillOpacity="0.04"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x="64" y="324" fontSize="12" fontWeight="700" fill={accent}>
            函数 ↔ 编程
          </text>
          <text x="64" y="344" fontSize="11" fill={primary}>
            数学函数 f:X→Y ↔ 显式输入决定唯一输出的纯函数
          </text>
          <text x="64" y="360" fontSize="11" fill={primary}>
            复合 f∘g = 可类型检查的函数组合 逆函数 = 双射的反向映射
          </text>
          <text x="64" y="372" fontSize="11" fill={secondary}>
            普通程序过程还可能依赖状态、I/O、时间与随机源
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数复合是「先执行一个变换再执行另一个」，逆函数是「撤销变换」。对数增长最慢（O(log
        n) 算法高效），指数增长最快（O(2ⁿ)
        算法不可行）。函数是数学与编程的共通语言。
      </figcaption>
    </figure>
  );
}

function FunctionFrame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 400"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

export function MglFunctionsContractDiagram() {
  return (
    <FunctionFrame
      ariaLabel="函数合同图：定义域通过映射箭头到陪域，实际命中的结果形成像集；单射看是否碰撞，满射看是否覆盖陪域，双射同时满足并允许逆映射。"
      caption="先分清定义域、陪域和像集，再判断单射、满射与逆函数。"
    >
      <defs>
        <marker
          id="mgl-functions-contract-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
        </marker>
      </defs>
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        f : X → Y 是一份集合合同
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        规则要求每个输入恰有一个输出，但允许多个输入命中同一个结果
      </text>

      <ellipse
        cx="150"
        cy="175"
        rx="98"
        ry="112"
        fill={accent}
        fillOpacity="0.06"
        stroke={accent}
        strokeWidth="1.5"
      />
      <text
        x="150"
        y="103"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        定义域 X
      </text>
      <circle
        cx="111"
        cy="150"
        r="13"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
      />
      <circle
        cx="150"
        cy="187"
        r="13"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
      />
      <circle
        cx="189"
        cy="150"
        r="13"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
      />
      <text x="111" y="155" textAnchor="middle" fontSize="11" fill={primary}>
        a
      </text>
      <text x="150" y="192" textAnchor="middle" fontSize="11" fill={primary}>
        b
      </text>
      <text x="189" y="155" textAnchor="middle" fontSize="11" fill={primary}>
        c
      </text>

      <ellipse
        cx="570"
        cy="175"
        rx="106"
        ry="112"
        fill={success}
        fillOpacity="0.06"
        stroke={success}
        strokeWidth="1.5"
      />
      <text
        x="570"
        y="103"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        陪域 Y
      </text>
      <circle
        cx="531"
        cy="137"
        r="13"
        fill={success}
        fillOpacity="0.16"
        stroke={success}
      />
      <circle
        cx="570"
        cy="175"
        r="13"
        fill={success}
        fillOpacity="0.16"
        stroke={success}
      />
      <circle
        cx="609"
        cy="213"
        r="13"
        fill={success}
        fillOpacity="0.16"
        stroke={success}
      />
      <circle
        cx="531"
        cy="213"
        r="13"
        fill={warning}
        fillOpacity="0.14"
        stroke={warning}
        strokeDasharray="3 2"
      />
      <text x="531" y="142" textAnchor="middle" fontSize="11" fill={primary}>
        1
      </text>
      <text x="570" y="180" textAnchor="middle" fontSize="11" fill={primary}>
        2
      </text>
      <text x="609" y="218" textAnchor="middle" fontSize="11" fill={primary}>
        3
      </text>
      <text x="531" y="218" textAnchor="middle" fontSize="11" fill={warning}>
        4
      </text>

      <path
        d="M164 150 C 270 102, 390 110, 516 137"
        fill="none"
        stroke={secondary}
        strokeWidth="1.4"
        markerEnd="url(#mgl-functions-contract-arrow)"
      />
      <path
        d="M164 187 C 286 169, 390 168, 555 175"
        fill="none"
        stroke={secondary}
        strokeWidth="1.4"
        markerEnd="url(#mgl-functions-contract-arrow)"
      />
      <path
        d="M203 150 C 315 120, 430 195, 595 213"
        fill="none"
        stroke={secondary}
        strokeWidth="1.4"
        markerEnd="url(#mgl-functions-contract-arrow)"
      />

      <rect
        x="82"
        y="312"
        width="556"
        height="44"
        rx="8"
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="331"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill={primary}
      >
        a、b、c 映到 1、2、3；4 在陪域中但未被命中，因此像集不等于陪域。
      </text>
      <text x="360" y="348" textAnchor="middle" fontSize="11" fill={secondary}>
        若两个输入命中同一结果，不单射；若所有陪域元素都被命中，才满射。
      </text>
    </FunctionFrame>
  );
}

export function MglFunctionsCompositionDiagram() {
  return (
    <FunctionFrame
      ariaLabel="函数复合与逆映射图：先执行 g 再执行 f，复合要求中间集合兼容；只有双射才有双边逆，单射或满射分别只提供一侧逆。"
      caption="复合的箭头方向和中间类型决定可组合性；双边逆需要双射。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        复合与逆：箭头方向就是证明线索
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        (f ∘ g)(x) 先走 g，再走 f；撤销需要两边都能回到原点
      </text>

      <rect
        x="42"
        y="104"
        width="150"
        height="78"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="117"
        y="132"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        X
      </text>
      <text x="117" y="157" textAnchor="middle" fontSize="12" fill={primary}>
        输入对象
      </text>
      <line
        x1="196"
        y1="143"
        x2="239"
        y2="143"
        stroke={secondary}
        strokeWidth="1.5"
      />
      <text x="218" y="133" textAnchor="middle" fontSize="11" fill={secondary}>
        g
      </text>

      <rect
        x="244"
        y="104"
        width="150"
        height="78"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="319"
        y="132"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        Y
      </text>
      <text x="319" y="157" textAnchor="middle" fontSize="12" fill={primary}>
        中间类型
      </text>
      <line
        x1="398"
        y1="143"
        x2="441"
        y2="143"
        stroke={secondary}
        strokeWidth="1.5"
      />
      <text x="420" y="133" textAnchor="middle" fontSize="11" fill={secondary}>
        f
      </text>

      <rect
        x="446"
        y="104"
        width="150"
        height="78"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="521"
        y="132"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        Z
      </text>
      <text x="521" y="157" textAnchor="middle" fontSize="12" fill={primary}>
        输出对象
      </text>

      <path
        d="M521 198 C 521 260, 319 260, 319 198"
        fill="none"
        stroke={danger}
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />
      <text x="420" y="249" textAnchor="middle" fontSize="11.5" fill={danger}>
        逆映射只能在条件满足时回走
      </text>

      <rect
        x="70"
        y="292"
        width="582"
        height="54"
        rx="8"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
      />
      <text x="361" y="315" textAnchor="middle" fontSize="12" fill={primary}>
        双射：既不碰撞又覆盖目标，f⁻¹ ∘ f = id 且 f ∘ f⁻¹ = id。
      </text>
      <text x="361" y="334" textAnchor="middle" fontSize="11" fill={secondary}>
        只有单射时可能有左逆，只有满射时可能有右逆；程序组合还要检查错误通道。
      </text>
    </FunctionFrame>
  );
}

export function MglFunctionsGrowthDiagram() {
  return (
    <FunctionFrame
      ariaLabel="函数增长与跨卷映射图：数列递推、线性变换和随机变量都是函数实例，增长曲线比较对数、线性、多项式和指数。"
      caption="函数形态跨越数列、矩阵和随机变量；渐近增长只描述长期尺度。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        函数形态：从递推到增长阶
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        同一个“输入—输出”框架可以承载离散、线性和随机对象
      </text>

      <rect
        x="46"
        y="96"
        width="182"
        height="76"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="137"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        数列函数
      </text>
      <text x="137" y="149" textAnchor="middle" fontSize="11.5" fill={primary}>
        a : N → R
      </text>

      <rect
        x="269"
        y="96"
        width="182"
        height="76"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        线性变换
      </text>
      <text x="360" y="149" textAnchor="middle" fontSize="11.5" fill={primary}>
        T : V → W
      </text>

      <rect
        x="492"
        y="96"
        width="182"
        height="76"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="583"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        随机变量
      </text>
      <text x="583" y="149" textAnchor="middle" fontSize="11.5" fill={primary}>
        X : Ω → R
      </text>

      <line x1="82" y1="282" x2="664" y2="282" stroke={border} />
      <line x1="82" y1="200" x2="82" y2="282" stroke={border} />
      <path
        d="M88 270 Q 270 264 664 250"
        fill="none"
        stroke={success}
        strokeWidth="2"
      />
      <path d="M88 270 L 664 218" fill="none" stroke={accent} strokeWidth="2" />
      <path
        d="M88 270 Q 360 260 664 170"
        fill="none"
        stroke={warning}
        strokeWidth="2"
      />
      <path
        d="M88 270 Q 500 270 664 116"
        fill="none"
        stroke={danger}
        strokeWidth="2"
      />
      <text x="585" y="246" fontSize="11" fill={success}>
        log n
      </text>
      <text x="594" y="214" fontSize="11" fill={accent}>
        n
      </text>
      <text x="583" y="168" fontSize="11" fill={warning}>
        n²
      </text>
      <text x="575" y="112" fontSize="11" fill={danger}>
        cⁿ
      </text>
      <text
        x="372"
        y="310"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        对数 → 线性 → 多项式 → 指数：长期增长越来越快
      </text>
      <text x="360" y="350" textAnchor="middle" fontSize="11.5" fill={primary}>
        实际性能仍需结合常数、输入分布、缓存和基准测试判断。
      </text>
    </FunctionFrame>
  );
}
