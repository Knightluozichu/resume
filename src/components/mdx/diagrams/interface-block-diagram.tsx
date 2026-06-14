/**
 * <InterfaceBlockDiagram>：「高级GLSL」§3「接口块」概念图（HEL-74，C 实战型）。
 *
 * 把「零散 in/out 一根根连」对照「打包成一个 interface block 整组传」画清楚：
 *  - 左：散装——顶点端 out TexCoords / out Normal / out FragPos 三根独立连线，
 *    片段端要逐个写同名 in，多了乱、易写错；
 *  - 右：打包——顶点端 out VS_OUT { ... } vs_out，片段端 in VS_OUT { ... } fs_in，
 *    一整组一次接好，块名对上即可、实例名（vs_out/fs_in）可不同。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色，无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function InterfaceBlockDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 600 320"
          role="img"
          aria-label="对比两种把数据从顶点着色器传到片段着色器的写法。左边是散装写法：顶点着色器分别 out TexCoords、out Normal、out FragPos 三个变量，三根独立连线分别接到片段着色器三个同名 in 变量，变量一多就乱、容易名字对不上。右边是接口块写法：顶点着色器把这三个变量打包成一个名叫 VS_OUT 的块、实例名 vs_out，片段着色器用同名块 VS_OUT、实例名 fs_in 一整组一次接住，块名对上即可，实例名可以不同，整洁不易错。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* ============ 左：散装 in/out ============ */}
          <text
            x="150"
            y="28"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            散装：一根根连
          </text>

          {/* 顶点端三个 out */}
          <rect
            x="40"
            y="48"
            width="120"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {["out TexCoords", "out Normal", "out FragPos"].map((t, i) => (
            <text
              key={t}
              x="100"
              y={72 + i * 24}
              textAnchor="middle"
              fontSize="10"
              className="font-mono"
              fill="var(--text-primary)"
            >
              {t}
            </text>
          ))}

          {/* 三根独立连线 */}
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1="160"
              y1={66 + i * 24}
              x2="200"
              y2={66 + i * 24}
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
            />
          ))}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M200 ${66 + i * 24} l-9 -4 l0 8 z`}
              fill="var(--text-secondary)"
            />
          ))}

          {/* 片段端三个 in */}
          <rect
            x="200"
            y="48"
            width="100"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {["in TexCoords", "in Normal", "in FragPos"].map((t, i) => (
            <text
              key={t}
              x="250"
              y={72 + i * 24}
              textAnchor="middle"
              fontSize="10"
              className="font-mono"
              fill="var(--text-primary)"
            >
              {t}
            </text>
          ))}

          <text
            x="170"
            y="170"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            变量一多就乱、易写错名
          </text>

          {/* —— 中分隔线 —— */}
          <line
            x1="320"
            y1="40"
            x2="320"
            y2="180"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ============ 右：接口块打包 ============ */}
          <text
            x="460"
            y="28"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            接口块：整组打包传
          </text>

          {/* 顶点端 out 块 */}
          <rect
            x="346"
            y="48"
            width="116"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="404"
            y="70"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            className="font-mono"
            fill="var(--accent)"
          >
            out VS_OUT {"{"}
          </text>
          <text
            x="404"
            y="90"
            textAnchor="middle"
            fontSize="9"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            TexCoords;
          </text>
          <text
            x="404"
            y="104"
            textAnchor="middle"
            fontSize="9"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            Normal; FragPos;
          </text>
          <text
            x="404"
            y="124"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            className="font-mono"
            fill="var(--accent)"
          >
            {"}"} vs_out;
          </text>

          {/* 一根整组连线 */}
          <line
            x1="462"
            y1="94"
            x2="498"
            y2="94"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M498 94 l-10 -5 l0 10 z" fill="var(--accent)" />

          {/* 片段端 in 块 */}
          <rect
            x="500"
            y="48"
            width="92"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="546"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            className="font-mono"
            fill="var(--accent)"
          >
            in VS_OUT
          </text>
          <text
            x="546"
            y="94"
            textAnchor="middle"
            fontSize="9"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            {"{ ... }"}
          </text>
          <text
            x="546"
            y="114"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            className="font-mono"
            fill="var(--accent)"
          >
            fs_in;
          </text>

          <text
            x="468"
            y="170"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            块名对上即可，实例名可不同
          </text>

          {/* ============ 底部要点 ============ */}
          <rect
            x="40"
            y="210"
            width="520"
            height="86"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="60"
            y="234"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            接口块就是把一组要往下传的 in / out 装进一个有名字的「盒子」整组传
          </text>
          <text x="60" y="256" fontSize="10.5" fill="var(--text-secondary)">
            · 顶点端 out VS_OUT 块、片段端 in VS_OUT
            块：块名（VS_OUT）两端必须一致
          </text>
          <text x="60" y="276" fontSize="10.5" fill="var(--text-secondary)">
            · 实例名（vs_out / fs_in）只是本段内的代号，两端可以不同
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        散装时每个 <span className="font-mono">in/out</span>{" "}
        各连一根、变量一多就乱；<strong>接口块</strong>
        把一组变量装进一个有名字的盒子（
        <span className="font-mono">VS_OUT</span>）<strong>整组传</strong>
        ，块名两端对上即可、 实例名（<span className="font-mono">
          vs_out
        </span> / <span className="font-mono">fs_in</span>）可不同。
      </figcaption>
    </figure>
  );
}
