/**
 * <GameObjectAnatomyDiagram>：一个 GameObject 的「解剖图」——镜像 Unity Inspector
 * （HEL-279，《Unity 5 权威讲解》第2章 §3）。
 *
 * 画一个名为 Player 的 GameObject 外框，框内自上而下摞着它挂着的组件卡，正如你在
 * Inspector 里选中它时看到的那一串：
 *  - Transform（必有，删不掉）：位置 / 旋转 / 缩放
 *  - Mesh Renderer：决定它怎么被画出来
 *  - Box Collider：给它一个碰撞体积
 *  - PlayerScript（MonoBehaviour）：你写的玩法逻辑
 * 每张组件卡配一句作用说明。Transform 卡特别标注「必有·不可移除」。
 *
 * 这是「选中 GameObject → Inspector 显示它的全部组件」的静态定格，与正文「常见组件」一节对照。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。组件卡两两不重叠（卡在外框内 = 父子嵌套，不算重叠）；
 * 所有 <text> 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 560;

const PAD = 18;

// 外框（GameObject）。
const FRAME_X = PAD;
const FRAME_W = VIEW_W - 2 * PAD;

const HEADER_Y = 64; // GameObject 头部栏 y
const HEADER_H = 44;

// 组件卡。
const CARD_X = FRAME_X + 16;
const CARD_W = FRAME_W - 32;
const CARD_H = 60;
const CARD_GAP = 12;
const CARDS_TOP = HEADER_Y + HEADER_H + 18; // 首张组件卡 y

type CompCard = {
  name: string;
  role: string;
  color: string;
  required?: boolean; // Transform：必有，删不掉
};

const CARDS: readonly CompCard[] = [
  {
    name: "Transform",
    role: "位置 / 旋转 / 缩放——它在世界里的「站位牌」",
    color: "var(--accent)",
    required: true,
  },
  {
    name: "Mesh Renderer",
    role: "决定它用什么网格和材质被画出来",
    color: "var(--success)",
  },
  {
    name: "Box Collider",
    role: "给它一个方盒碰撞体积，能被撞到、能踩",
    color: "var(--warning)",
  },
  {
    name: "PlayerScript",
    role: "你写的玩法逻辑（继承 MonoBehaviour）",
    color: "var(--danger)",
  },
];

export function GameObjectAnatomyDiagram() {
  const cardsBottom = CARDS_TOP + CARDS.length * (CARD_H + CARD_GAP) - CARD_GAP;
  const FRAME_Y = 52;
  const FRAME_H = cardsBottom + 16 - FRAME_Y;
  const VIEW_H = FRAME_Y + FRAME_H + PAD;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一个 GameObject 的解剖图，镜像 Unity 的 Inspector 面板。最外层是一个名为 Player 的 GameObject 外框，框顶部是它的头部栏。框内自上而下摞着它挂着的四张组件卡：第一张 Transform 提供位置旋转缩放，是它在世界里的站位牌，标注为必有、不可移除；第二张 Mesh Renderer 决定它用什么网格和材质被画出来；第三张 Box Collider 给它一个方盒碰撞体积，能被撞到、能踩；第四张 PlayerScript 是你写的玩法逻辑，继承自 MonoBehaviour。每张组件卡配一句作用说明，组件卡彼此不重叠，整体就是你在 Inspector 里选中这个 GameObject 时看到的那一串组件。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={PAD}
            y={32}
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            选中一个 GameObject，Inspector 里就是这一摞组件
          </text>

          {/* ===== GameObject 外框 ===== */}
          <rect
            x={FRAME_X}
            y={FRAME_Y}
            width={FRAME_W}
            height={FRAME_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            strokeOpacity="0.55"
          />

          {/* 头部栏（GameObject 名 · 含于外框内 → 父子嵌套，不算重叠） */}
          <rect
            x={FRAME_X + 1}
            y={FRAME_Y + 1}
            width={FRAME_W - 2}
            height={HEADER_H}
            rx="11"
            fill="var(--text-secondary)"
            fillOpacity="0.1"
          />
          <text
            x={FRAME_X + 18}
            y={HEADER_Y - 4}
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            GameObject：Player
          </text>
          <text
            x={FRAME_X + FRAME_W - 18}
            y={HEADER_Y - 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            空壳本身：只是个名字
          </text>

          {/* ===== 组件卡（一摞，互不重叠） ===== */}
          {CARDS.map((c, i) => {
            const y = CARDS_TOP + i * (CARD_H + CARD_GAP);
            return (
              <g key={c.name}>
                <rect
                  x={CARD_X}
                  y={y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="8"
                  fill={c.color}
                  fillOpacity="0.12"
                  stroke={c.color}
                  strokeWidth="1.4"
                />
                {/* 左侧色条，暗示「这是一块挂上去的组件」 */}
                <rect
                  x={CARD_X}
                  y={y}
                  width="6"
                  height={CARD_H}
                  rx="3"
                  fill={c.color}
                />
                <text
                  x={CARD_X + 18}
                  y={y + 24}
                  fontSize="13.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {c.name}
                </text>
                {c.required && (
                  <text
                    x={CARD_X + CARD_W - 14}
                    y={y + 24}
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="700"
                    fill={c.color}
                  >
                    必有 · 不可移除
                  </text>
                )}
                <text
                  x={CARD_X + 18}
                  y={y + 44}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {c.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        在 Inspector 里选中 Player 这个 GameObject，看到的就是它挂着的一摞组件：
        Transform（必有，删不掉）、Mesh Renderer、Box Collider、你写的
        PlayerScript。 GameObject 是空壳，这些组件才是它真正的本事。
      </figcaption>
    </figure>
  );
}
