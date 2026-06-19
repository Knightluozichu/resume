/**
 * <AssetPipelineGuidDiagram>：辅图（示意 / 流程，静态）——「资源管线：.meta + GUID 引用」（HEL-289）。
 *
 * 三段横向流程，点清 Unity 的资源引用机制：
 *  ① Assets/ 里一个资源文件（如 slime.png）。
 *  ② Unity 为它自动生成同名 .meta（slime.png.meta），里面有 GUID（全局唯一 ID）+ 导入设置。
 *  ③ 别的资源 / 场景靠 GUID 引用它（不是靠路径）。
 * 底部标注：改名 / 移动资源，引用不丢（GUID 没变）；但 .meta 丢了 = 引用断。
 *
 * 纯静态流程图（无 anime，无可交互徽章）。所有坐标整数常量；token-only 无裸 hex；
 * 所有 <text> 距 viewBox 任意边 ≥20px；节点互不重叠、连线不压文字。
 */

const VIEW_W = 736;
// VIEW_H=372：分组说明基线 326、底部说明基线 348（距底边 24px，≥20），两行间距 22px 不重叠；
// bbox 底 ~351，距底边 ~21px（≥20）。纵向利用率 ~84%。
const VIEW_H = 372;

// ── 三个横向节点（等宽、整数坐标） ──
const NODE_Y = 92;
const NODE_H = 150;
const NODE_W = 196;
const N1_X = 28; // 资源文件
const N2_X = 270; // .meta（GUID + 导入设置）
const N3_X = 512; // 引用方（资源 / 场景）

const N1_CX = N1_X + NODE_W / 2; // 126
const N2_CX = N2_X + NODE_W / 2; // 368
const N3_CX = N3_X + NODE_W / 2; // 610
const NODE_CY = NODE_Y + NODE_H / 2; // 167

export function AssetPipelineGuidDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 资源管线靠 GUID 引用的示意流程图。从左到右三段。第一段：Assets 文件夹里有一个资源文件，比如 slime.png，所有资源都放在 Assets 下。第二段：Unity 为每个资源自动生成一个同名的点 meta 文件，比如 slime.png.meta，里面有这个资源的 GUID 也就是全局唯一 ID，加上导入设置。第三段：别的资源或场景引用这个资源时，靠的是 GUID，而不是文件路径。底部强调两点：第一，改名或移动资源，引用不会丢，因为 GUID 没变，只要 .meta 跟着一起走；第二，如果 .meta 文件丢了，GUID 就没了，引用就断了。核心结论：引用靠 GUID 不靠路径，所以在 Unity 里改名移动资源不会丢引用，前提是 .meta 跟着资源一起走、并纳入版本控制。"
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
            资源管线：每个资源都有 .meta（含 GUID），引用靠 GUID 不靠路径
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            所有资源放在 Assets/ 下，Unity 给每个资源生成一个 .meta 旁文件
          </text>

          {/* ===== 连线（先画，框盖线头）===== */}
          <line
            x1={N1_X + NODE_W}
            y1={NODE_CY}
            x2={N2_X}
            y2={NODE_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#apg-arrow)"
          />
          <text
            x={(N1_X + NODE_W + N2_X) / 2}
            y={NODE_CY - 10}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            生成
          </text>
          <line
            x1={N2_X + NODE_W}
            y1={NODE_CY}
            x2={N3_X}
            y2={NODE_CY}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#apg-arrow-accent)"
          />
          <text
            x={(N2_X + NODE_W + N3_X) / 2}
            y={NODE_CY - 10}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--accent)"
          >
            按 GUID 找
          </text>

          {/* ============ ① 资源文件 ============ */}
          <rect
            x={N1_X}
            y={NODE_Y}
            width={NODE_W}
            height={NODE_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={N1_CX}
            y={NODE_Y + 28}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            ① 资源文件
          </text>
          <text
            x={N1_CX}
            y={NODE_Y + 64}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            Assets/.../slime.png
          </text>
          <text
            x={N1_CX}
            y={NODE_Y + 96}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            图片 / 模型 / 预制体 /
          </text>
          <text
            x={N1_CX}
            y={NODE_Y + 112}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            脚本 …… 都放 Assets 下
          </text>

          {/* ============ ② .meta（GUID + 导入设置） ============ */}
          <rect
            x={N2_X}
            y={NODE_Y}
            width={NODE_W}
            height={NODE_H}
            rx="12"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x={N2_CX}
            y={NODE_Y + 28}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            ② 同名 .meta 文件
          </text>
          <text
            x={N2_CX}
            y={NODE_Y + 50}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            slime.png.meta
          </text>
          <text
            x={N2_CX}
            y={NODE_Y + 78}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            GUID = a1b2c3…（唯一）
          </text>
          <text
            x={N2_CX}
            y={NODE_Y + 100}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            + 导入设置（压缩 /
          </text>
          <text
            x={N2_CX}
            y={NODE_Y + 116}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            过滤 / 格式 …）
          </text>

          {/* ============ ③ 引用方 ============ */}
          <rect
            x={N3_X}
            y={NODE_Y}
            width={NODE_W}
            height={NODE_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={N3_CX}
            y={NODE_Y + 28}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            ③ 引用方
          </text>
          <text
            x={N3_CX}
            y={NODE_Y + 50}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            别的资源 / 场景 / 预制体
          </text>
          <text
            x={N3_CX}
            y={NODE_Y + 80}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            refs: GUID a1b2c3…
          </text>
          <text
            x={N3_CX}
            y={NODE_Y + 108}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            记的是 GUID，不是路径
          </text>

          {/* ===== 分组说明（基线 326：节点底 242 下方 ≥20px，距底边 ≥20）===== */}
          <text
            x={VIEW_W / 2}
            y={326}
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            ✓ 改名 / 移动资源，引用不丢（GUID 没变）　　✗ .meta 丢了 = GUID
            没了，引用直接断
          </text>

          {/* ===== 底部一句话点题（基线 348，距底边 24px） ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            引用靠 GUID 不靠路径——所以 .meta 必须跟着资源一起走、一起进版本控制
          </text>

          <defs>
            <marker
              id="apg-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="apg-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        所有资源放在 **Assets/** 下，Unity 为每个资源自动生成一个**同名 .meta
        文件**，里面有这个资源的 **GUID（全局唯一 ID）+
        导入设置**。别的资源、场景**靠 GUID 引用它，不靠路径**——所以在 Unity
        里改名 / 移动资源**不会丢引用**（GUID 没变）；但 **.meta
        一旦丢了，引用就断**。这正是 .meta 必须一起进版本控制的原因。
      </figcaption>
    </figure>
  );
}
