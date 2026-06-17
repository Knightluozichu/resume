/**
 * <MaterialVsShaderDiagram>：辅图（静态）——「一个 Shader → 多个 Material 实例」（HEL-288）。
 *
 * 左边一个 Shader（决定「表面怎么被画」的程序 / 模板，留着一组待填的参数槽）；
 * 右边它被填上不同参数值，生成多个 Material 实例：
 *  · 木纹材质（贴木纹图、不金属、不太光滑）
 *  · 金属材质（金属度高、光滑、反光）
 *  · 红色塑料（纯红、不金属、中等光滑）
 * 点清两件事：「一个 Shader 可被多个 Material 复用」「Material = Shader + 一组参数值」。
 *
 * 纯静态图（无 anime，无可交互徽章）。所有坐标整数常量；token-only 无裸 hex；
 * 所有 <text> 距 viewBox 任意边 ≥20px；节点互不重叠、连线不压文字。
 */

const VIEW_W = 736;
// VIEW_H=388：括注基线 350（在最后一行 MAT 底 330 下 20px），底部说明基线 366、bbox 底 ~369，
// 距底边 ~19→22px（≥20）；两行文字间距 16px 不重叠。纵向利用率 ~85%。
const VIEW_H = 388;

// ── 左侧 Shader 模板 ──
const SH_X = 28;
const SH_Y = 92;
const SH_W = 220;
const SH_H = 168;
const SH_CX = SH_X + SH_W / 2; // 138
const SH_CY = SH_Y + SH_H / 2; // 176

// ── 右侧三个 Material 实例（竖排） ──
const MAT_X = 432;
const MAT_W = 276;
const MAT_H = 72;
const MAT_Y0 = 78; // 第一个实例 y
const MAT_DY = 90; // 行距（3 个：78 / 168 / 258）
const SWATCH_R = 18; // 实例色块半径

const mats = [
  {
    key: "wood",
    name: "木纹材质",
    params: "贴木纹图 · 金属0 · 光滑0.3",
    fill: "var(--warning)",
    op: "0.4",
  },
  {
    key: "metal",
    name: "金属材质",
    params: "灰 · 金属1 · 光滑0.9（反光）",
    fill: "var(--text-secondary)",
    op: "0.55",
  },
  {
    key: "plastic",
    name: "红色塑料",
    params: "纯红 · 金属0 · 光滑0.5",
    fill: "var(--danger)",
    op: "0.5",
  },
];

export function MaterialVsShaderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Material 和 Shader 关系示意图。左边一个 Shader，它是决定一个表面怎么被画出来的程序或模板，里面留着一组待填的参数槽，比如基础色、金属度、光滑度、贴图。右边这个 Shader 被填上不同的参数值，生成了三个不同的 Material 材质实例：木纹材质（贴木纹图、金属度0、光滑0.3）、金属材质（灰色、金属度1、光滑0.9、会反光）、红色塑料（纯红、金属度0、光滑0.5）。三个材质都从同一个 Shader 复制而来，只是参数填得不同。核心是：一个 Shader 可以被多个 Material 复用，Material 等于 Shader 加上一组具体的参数值。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个 Shader（模板） → 填不同参数 → 多个 Material（实例）
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Material = Shader + 一组具体的参数值
          </text>

          {/* ===== 连线：Shader 右边 → 每个 Material 左边（先画，框盖线头）===== */}
          {mats.map((m, i) => (
            <line
              key={`link-${m.key}`}
              x1={SH_X + SH_W}
              y1={SH_CY}
              x2={MAT_X}
              y2={MAT_Y0 + i * MAT_DY + MAT_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#mvs-arrow)"
            />
          ))}

          {/* ============ 左侧：Shader 模板 ============ */}
          <rect
            x={SH_X}
            y={SH_Y}
            width={SH_W}
            height={SH_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={SH_CX}
            y={SH_Y + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            Shader
          </text>
          <text
            x={SH_CX}
            y={SH_Y + 46}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            决定「表面怎么被画」的程序 / 模板
          </text>
          {/* 待填参数槽 */}
          <text
            x={SH_X + 18}
            y={SH_Y + 78}
            textAnchor="start"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            基础色 = ▢
          </text>
          <text
            x={SH_X + 18}
            y={SH_Y + 98}
            textAnchor="start"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            金属度 = ▢
          </text>
          <text
            x={SH_X + 18}
            y={SH_Y + 118}
            textAnchor="start"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            光滑度 = ▢
          </text>
          <text
            x={SH_X + 18}
            y={SH_Y + 138}
            textAnchor="start"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            贴图 = ▢
          </text>
          <text
            x={SH_CX}
            y={SH_Y + 158}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--accent)"
          >
            一组待填的参数槽
          </text>

          {/* ============ 右侧：三个 Material 实例 ============ */}
          {mats.map((m, i) => {
            const y = MAT_Y0 + i * MAT_DY;
            const cy = y + MAT_H / 2;
            return (
              <g key={m.key}>
                <rect
                  x={MAT_X}
                  y={y}
                  width={MAT_W}
                  height={MAT_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.6"
                />
                {/* 材质外观色块 */}
                <circle
                  cx={MAT_X + 36}
                  cy={cy}
                  r={SWATCH_R}
                  fill={m.fill}
                  fillOpacity={m.op}
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                <text
                  x={MAT_X + 70}
                  y={y + 30}
                  textAnchor="start"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {m.name}
                </text>
                <text
                  x={MAT_X + 70}
                  y={y + 50}
                  textAnchor="start"
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {m.params}
                </text>
              </g>
            );
          })}

          {/* 右侧分组括注（基线 350：在最后一行 MAT 底 330 下 20px） */}
          <text
            x={MAT_X + MAT_W / 2}
            y={MAT_Y0 + 2 * MAT_DY + MAT_H + 20}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            三个 Material 都是同一个 Shader「复制」出来的，只是参数填得不同
          </text>

          {/* ===== 底部一句话点题（基线 366，距底边 22px） ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 22}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            Shader 是「怎么画」的程序模板，Material
            是「填好参数」的一份实例——一份模板能造出无数实例
          </text>

          <defs>
            <marker
              id="mvs-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        **Shader** 是一段「决定一个表面怎么被画出来」的程序 /
        模板，它留着一组参数槽（基础色、金属度、光滑度、贴图……）；**Material**
        就是给这个 Shader 把参数槽**填上具体值**的一份实例。同一个 Shader
        填不同参数，就得到木纹、金属、塑料等**多个不同的 Material**——**一个
        Shader 可被多个 Material 复用**。
      </figcaption>
    </figure>
  );
}
