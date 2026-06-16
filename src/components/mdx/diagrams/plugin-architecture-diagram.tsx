/**
 * <PluginArchitectureDiagram />：《Android 进阶解密》advanced-tech/plugin-principle 章
 * 「插件化架构 + 三大难点解决」配图（HEL-212）。
 *
 * 画面内容：上方两个主体 + 中间「动态加载」箭头，下方三大难点各一块（问题 + 解法），
 * 底部一条点睛带（插件化定义 + 与热修复的区别）。
 *  上方两主体（横向并排）：
 *   左——宿主 App（accent 色，已安装）：装在设备上、有正常的 PathClassLoader / Resources /
 *     在 Manifest 注册的四大组件，是「容器」。
 *   右——插件 APK（success 色，未安装、动态下载）：一个躺在磁盘上的 .apk 文件，
 *     它的代码 / 资源 / 四大组件系统都「不认」。
 *   中间箭头：宿主在运行时把插件 APK 动态加载进来（下载 → 加载，无需安装）。
 *  三大难点 + 解法（三块，用 warning 色标「难点」）：
 *   ① 类加载：插件类不在宿主 ClassLoader 路径里 → 用 DexClassLoader 加载插件 dex，
 *      或把插件的 Element 合并进宿主 PathClassLoader 的 dexElements → 宿主能 new 出插件类。
 *   ② 资源加载：插件资源不在宿主里 → 反射 AssetManager.addAssetPath(插件APK路径)
 *      生成插件专属 Resources → 能访问插件的 layout / drawable。
 *   ③ 组件生命周期：插件 Activity 没在宿主 Manifest 注册，AMS 不认 →
 *      「占坑 StubActivity + Hook AMS」：预注册占位 Activity 骗过 AMS 校验，
 *      启动时再把目标换回真插件 Activity（或用 ContainerActivity 代理分发生命周期）。
 *  底部点睛带：插件化 = 动态加载「未安装」APK 的代码 / 资源 / 四大组件；
 *   与热修复区别——插件化加「新功能」，热修复修「旧 bug」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent = 宿主 / success = 插件 / warning = 难点与 Hook /
 * text-primary / text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 三大难点块：no = 序号；title = 难点名；problem = 问题一句话；solution = 解法行。 ——
type Hurdle = {
  /** 序号（①②③）。 */
  no: string;
  /** 难点名。 */
  title: string;
  /** 问题：为什么系统不认。 */
  problem: string;
  /** 解法说明（多行）。 */
  solution: readonly string[];
};

const HURDLES: readonly Hurdle[] = [
  {
    no: "①",
    title: "类加载",
    problem: "插件类不在宿主 ClassLoader 的查找路径里",
    solution: [
      "用 DexClassLoader 加载插件 dex；",
      "或把插件 Element 并入宿主",
      "PathClassLoader 的 dexElements",
      "→ 宿主能 new 出插件类",
    ],
  },
  {
    no: "②",
    title: "资源加载",
    problem: "插件的 layout / drawable 不在宿主资源表里",
    solution: [
      "反射调 AssetManager",
      ".addAssetPath(插件APK路径)",
      "生成插件专属 Resources",
      "→ 能访问插件资源",
    ],
  },
  {
    no: "③",
    title: "组件生命周期",
    problem: "插件 Activity 没在宿主 Manifest 注册，AMS 不认",
    solution: [
      "占坑 StubActivity + Hook AMS：",
      "预注册占位 Activity 骗过校验，",
      "启动时换回真插件 Activity",
      "（或 ContainerActivity 代理分发）",
    ],
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const VIEW_W = 760;

const PAD_X = 24; // 左右内边距
const TOP = 76; // 第一排两主体顶部 y（标题留白）

// 上方两主体框（宿主 App / 插件 APK）。
const ACTOR_W = 280; // 主体框宽
const ACTOR_H = 104; // 主体框高
const ACTOR_GAP = VIEW_W - PAD_X * 2 - ACTOR_W * 2; // 两主体间距（容纳中间「动态加载」箭头）

const ARROW = 5; // 箭头三角半高

// 三大难点块（横向三等分）。
const HURDLE_TOP = TOP + ACTOR_H + 64; // 难点区顶部 y（主体排下方留出箭头空间）
const HURDLE_H = 168; // 难点块高
const HURDLE_GAP = 16; // 难点块横向间距
const HURDLE_W = (VIEW_W - PAD_X * 2 - HURDLE_GAP * 2) / 3; // 难点块宽

// 底部点睛带。
const NOTE_TOP = HURDLE_TOP + HURDLE_H + 40; // 点睛带顶部 y
const NOTE_H = 72; // 点睛带高

const VIEW_H = NOTE_TOP + NOTE_H + 28;

/** 第 i 个难点块的左边 x。 */
function hurdleX(i: number): number {
  return PAD_X + i * (HURDLE_W + HURDLE_GAP);
}

export function PluginArchitectureDiagram() {
  // 两主体框的左边 x 与中心。
  const hostX = PAD_X;
  const pluginX = PAD_X + ACTOR_W + ACTOR_GAP;
  const actorCy = TOP + ACTOR_H / 2;

  // 宿主框底部中心（向下连到难点区的总起点）。
  const hostBottomCx = hostX + ACTOR_W / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="插件化架构与三大难点解决图。画面上方并排两个主体。左框是宿主 App，它已经安装在设备上，拥有正常的 PathClassLoader、Resources，以及在 AndroidManifest 里注册过的四大组件，是承载插件的容器。右框是插件 APK，它没有安装，是运行时动态下载到磁盘上的一个 apk 文件，它的代码、资源和四大组件系统默认都不认识。两框之间有一条从宿主指向插件、再加载回来的箭头，表示宿主在运行时把插件 APK 动态加载进来，全程不需要安装。画面中部是三大难点，每块上方用警告色标出难点编号和名称，下方给出问题与解法。第一块是类加载：问题是插件里的类不在宿主 ClassLoader 的查找路径里；解法是用 DexClassLoader 加载插件的 dex，或者把插件的 Element 合并进宿主 PathClassLoader 的 dexElements 数组，这样宿主就能 new 出插件类。第二块是资源加载：问题是插件的 layout 和 drawable 不在宿主的资源表里；解法是通过反射调用 AssetManager 的 addAssetPath 方法，传入插件 APK 的路径，生成一个插件专属的 Resources 对象，从而能访问插件自己的资源。第三块是组件生命周期：问题是插件的 Activity 没有在宿主的 Manifest 里注册，AMS 不认它，会拒绝启动；解法是占坑 StubActivity 加上 Hook AMS，预先注册一个占位 Activity 骗过 AMS 的清单校验，等真正创建时再把目标换回真正的插件 Activity，或者用一个 ContainerActivity 来代理分发插件 Activity 的生命周期。图底部是一条点睛带，说明插件化的本质是动态加载未安装 APK 的代码、资源和四大组件；并指出它和热修复的区别：插件化是为了加载新功能，热修复是为了修复旧 bug。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            插件化架构：宿主动态加载「未安装」插件 APK，闯过三道关
          </text>
          <text
            x={PAD_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            插件的代码 / 资源 / 四大组件系统默认都不认——逐一用类加载、资源、占坑 + Hook 解决
          </text>

          {/* —— 中间「动态加载」双段箭头：宿主 → 插件（拉取） + 插件 → 宿主（加载进来）—— */}
          {/* 宿主 → 插件：运行时拉取/下载 */}
          <line
            x1={hostX + ACTOR_W}
            y1={actorCy - 14}
            x2={pluginX - ARROW}
            y2={actorCy - 14}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${pluginX} ${actorCy - 14}
                l -${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--text-secondary)"
          />
          {/* 插件 → 宿主：把代码/资源/组件加载进宿主 */}
          <line
            x1={pluginX}
            y1={actorCy + 14}
            x2={hostX + ACTOR_W + ARROW}
            y2={actorCy + 14}
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <path
            d={`M ${hostX + ACTOR_W} ${actorCy + 14}
                l ${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--success)"
          />
          <text
            x={(hostX + ACTOR_W + pluginX) / 2}
            y={actorCy - 20}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ① 运行时下载
          </text>
          <text
            x={(hostX + ACTOR_W + pluginX) / 2}
            y={actorCy + 30}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            ② 加载进宿主
          </text>

          {/* —— 左：宿主 App（accent，已安装）—— */}
          <rect
            x={hostX}
            y={TOP}
            width={ACTOR_W}
            height={ACTOR_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <rect
            x={hostX}
            y={TOP}
            width="4"
            height={ACTOR_H}
            rx="2"
            fill="var(--accent)"
          />
          <text
            x={hostX + 16}
            y={TOP + 26}
            fontSize="13.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            宿主 App
          </text>
          <text
            x={hostX + ACTOR_W - 16}
            y={TOP + 24}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--accent)"
          >
            已安装
          </text>
          {[
            "正常的 PathClassLoader / Resources",
            "四大组件已在 Manifest 注册",
            "承载插件的「容器」",
          ].map((n, j) => (
            <text
              key={n}
              x={hostX + 16}
              y={TOP + 48 + j * 16}
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              {n}
            </text>
          ))}

          {/* —— 右：插件 APK（success，未安装）—— */}
          <rect
            x={pluginX}
            y={TOP}
            width={ACTOR_W}
            height={ACTOR_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <rect
            x={pluginX}
            y={TOP}
            width="4"
            height={ACTOR_H}
            rx="2"
            fill="var(--success)"
          />
          <text
            x={pluginX + 16}
            y={TOP + 26}
            fontSize="13.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            插件 APK
          </text>
          <text
            x={pluginX + ACTOR_W - 16}
            y={TOP + 24}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            未安装 · 动态下载
          </text>
          {[
            "磁盘上一个 .apk 文件",
            "代码 / 资源 / 四大组件",
            "系统默认全都「不认」",
          ].map((n, j) => (
            <text
              key={n}
              x={pluginX + 16}
              y={TOP + 48 + j * 16}
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              {n}
            </text>
          ))}

          {/* —— 宿主 → 三大难点区：一条主干 + 三个分叉箭头 —— */}
          {(() => {
            const trunkTop = TOP + ACTOR_H;
            const trunkBottom = HURDLE_TOP - 28; // 横向分配母线 y
            const branchTops = HURDLES.map((_, i) => ({
              x: hurdleX(i) + HURDLE_W / 2,
            }));
            const firstX = branchTops[0].x;
            const lastX = branchTops[HURDLES.length - 1].x;
            return (
              <g>
                {/* 竖干：宿主底 → 分配母线 */}
                <line
                  x1={hostBottomCx}
                  y1={trunkTop}
                  x2={hostBottomCx}
                  y2={trunkBottom}
                  stroke="var(--warning)"
                  strokeWidth="1.6"
                />
                {/* 横向分配母线 */}
                <line
                  x1={firstX}
                  y1={trunkBottom}
                  x2={lastX}
                  y2={trunkBottom}
                  stroke="var(--warning)"
                  strokeWidth="1.6"
                />
                {/* 三个向下分叉箭头 */}
                {branchTops.map((b, i) => (
                  <g key={`branch-${i}`}>
                    <line
                      x1={b.x}
                      y1={trunkBottom}
                      x2={b.x}
                      y2={HURDLE_TOP - ARROW}
                      stroke="var(--warning)"
                      strokeWidth="1.6"
                    />
                    <path
                      d={`M ${b.x} ${HURDLE_TOP}
                          l -${ARROW} -${ARROW * 1.6}
                          l ${ARROW * 2} 0 Z`}
                      fill="var(--warning)"
                    />
                  </g>
                ))}
                <text
                  x={hostBottomCx + 10}
                  y={(trunkTop + trunkBottom) / 2 + 4}
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--warning)"
                >
                  宿主要闯的三道关
                </text>
              </g>
            );
          })()}

          {/* —— 三大难点块 —— */}
          {HURDLES.map((h, i) => {
            const x = hurdleX(i);
            return (
              <g key={h.no}>
                <rect
                  x={x}
                  y={HURDLE_TOP}
                  width={HURDLE_W}
                  height={HURDLE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 顶部难点标题条（warning 色） */}
                <rect
                  x={x}
                  y={HURDLE_TOP}
                  width={HURDLE_W}
                  height="28"
                  rx="8"
                  fill="var(--warning)"
                  fillOpacity="0.12"
                />
                <text
                  x={x + 12}
                  y={HURDLE_TOP + 19}
                  fontSize="11.5"
                  fontWeight="700"
                  fill="var(--warning)"
                >
                  {h.no} {h.title}
                </text>
                {/* 问题（一句话） */}
                <text
                  x={x + 12}
                  y={HURDLE_TOP + 48}
                  fontSize="9"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  难点
                </text>
                <text
                  x={x + 12}
                  y={HURDLE_TOP + 62}
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {h.problem}
                </text>
                {/* 解法标签 */}
                <text
                  x={x + 12}
                  y={HURDLE_TOP + 86}
                  fontSize="9"
                  fontWeight="600"
                  fill="var(--success)"
                >
                  解法
                </text>
                {/* 解法（多行，等宽体强调 API） */}
                {h.solution.map((s, j) => (
                  <text
                    key={s}
                    x={x + 12}
                    y={HURDLE_TOP + 100 + j * 14}
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-secondary)"
                  >
                    {s}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— 底部点睛带：插件化定义 + 与热修复区别 —— */}
          <rect
            x={PAD_X}
            y={NOTE_TOP}
            width={VIEW_W - PAD_X * 2}
            height={NOTE_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <circle cx={PAD_X + 22} cy={NOTE_TOP + 24} r="4" fill="var(--accent)" />
          <text
            x={PAD_X + 34}
            y={NOTE_TOP + 28}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="700" fill="var(--accent)">
              插件化
            </tspan>{" "}
            = 动态加载「未安装」APK 的代码 / 资源 / 四大组件——像积木一样按需装上新功能
          </text>
          <circle cx={PAD_X + 22} cy={NOTE_TOP + 48} r="4" fill="var(--warning)" />
          <text
            x={PAD_X + 34}
            y={NOTE_TOP + 52}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            与{" "}
            <tspan fontWeight="700" fill="var(--warning)">
              热修复
            </tspan>{" "}
            的区别：插件化加「新功能」（整块业务），热修复修「旧 bug」（替换已有方法 / 类）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        插件化让<code>宿主 App</code>在运行时动态加载<strong>未安装</strong>的
        <code>插件 APK</code>，必须闯过三道关：<strong>类加载</strong>（
        <code>DexClassLoader</code> 加载插件 dex，或并入宿主 <code>dexElements</code>）、
        <strong>资源加载</strong>（反射 <code>AssetManager.addAssetPath</code> 造插件专属
        <code> Resources</code>）、<strong>组件生命周期</strong>（占坑 <code>StubActivity</code> +
        Hook AMS 骗过 Manifest 校验，再换回真插件 Activity）。一句话：插件化加「新功能」，热修复修「旧 bug」。
      </figcaption>
    </figure>
  );
}
