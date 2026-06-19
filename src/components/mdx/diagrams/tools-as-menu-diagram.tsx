/**
 * <ToolsAsMenuDiagram>：工具怎么进入模型「视野」——schema 序列化注入上下文，模型像看菜单一样看工具（HEL-314，第 8 章）。
 *
 * 一张静态 SVG，三段式从左到右：
 *   左：3 份「工具定义」卡（每张 = 函数 name + parameters schema 草样），这是开发者写的工具；
 *   中：一条「序列化 + 注入」箭头穿过一个 context 标记，表示这些 schema 被序列化成文本、塞进这一轮的上下文；
 *   右：模型「看到」的一份「工具菜单」——每项 = 工具名 + 一句 description，像点菜的菜单。
 * 核心一图：工具不是「装」进模型里的，而是把它的 schema（名字 + 一句描述 + 参数）当文本注入上下文，
 * 模型据此「看见」有哪些工具可用——名字给它对号，description 那句话才是它判断「这个工具干嘛的」的依据。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：卡片零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px、同列单一 x/y 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 384;

// —— 左侧「工具定义」列：标题 + 3 张 schema 卡（竖直堆叠）。 ——
const DEF_X = 24;
const DEF_W = 244;
const TITLE_Y = 40;
const DEF_CARD_H = 76;
const DEF_CARD_Y0 = 64; // 第 0 张卡顶
const DEF_CARD_GAP = 16;

/** 第 i 张工具定义卡左上角 y（单一公式）。底卡底 = 64 + 2*92 + 76 = 324 → 距 viewBox 底 60。 */
function defCardY(i: number): number {
  return DEF_CARD_Y0 + i * (DEF_CARD_H + DEF_CARD_GAP);
}

// —— 右侧「模型看到的工具菜单」面板：标题 + 菜单底框 + 3 个菜单项。 ——
const MENU_X = 444;
const MENU_W = 252; // 右边界 = 444 + 252 = 696 → 右留白 24
const MENU_BOX_Y = 56;
const MENU_BOX_H = 280; // 底 = 56 + 280 = 336 → 距底 48
const MENU_ITEM_H = 76;
const MENU_ITEM_X = MENU_X + 16;
const MENU_ITEM_W = MENU_W - 32;
const MENU_ITEM_Y0 = 76; // 第 0 项顶
const MENU_ITEM_GAP = 12;

/** 第 i 个菜单项左上角 y（单一公式）。 */
function menuItemY(i: number): number {
  return MENU_ITEM_Y0 + i * (MENU_ITEM_H + MENU_ITEM_GAP);
}

// —— 中段「序列化 + 注入」标记（在左右两列之间）。 ——
const INJECT_CX = (DEF_X + DEF_W + MENU_X) / 2; // 356

type Tool = {
  /** 工具函数名（等宽显示） */
  name: string;
  /** 参数 schema 草样（等宽，一行示意） */
  params: string;
  /** 一句 description——模型判断「这个工具干嘛」的依据 */
  desc: string;
};

/** 3 份工具（一个客服 agent 可能配的工具）。 */
const TOOLS: readonly Tool[] = [
  {
    name: "check_order",
    params: "{ order_id: string }",
    desc: "查订单状态：问到「我的单到哪了/能退吗」时调",
  },
  {
    name: "get_weather",
    params: "{ city: string }",
    desc: "查某城市实时天气：问到天气、冷热、下不下雨时调",
  },
  {
    name: "search_docs",
    params: "{ query: string }",
    desc: "搜帮助文档：问到「怎么操作/政策是什么」时调",
  },
];

export function ToolsAsMenuDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="工具怎么进入模型视野的示意图。从左到右分三段。左边是开发者写的三份工具定义卡，每张写着函数名和参数 schema：第一份 check_order，参数是 order_id 字符串；第二份 get_weather，参数是 city 字符串；第三份 search_docs，参数是 query 字符串。中间一条「序列化 + 注入上下文」的箭头，表示这些工具的 schema 被序列化成文本、塞进这一轮发给模型的上下文里。右边是模型「看到」的一份工具菜单，每一项等于工具名加上一句 description 描述：check_order「查订单状态，问到我的单到哪了或能退吗时调」、get_weather「查某城市实时天气，问到天气冷热下不下雨时调」、search_docs「搜帮助文档，问到怎么操作或政策是什么时调」。核心结论：工具不是装进模型里的，而是把它的 schema，也就是名字、参数和那句描述，当文本注入上下文，模型据此看见有哪些工具可用。名字给模型对号，而 description 那句话才是它判断「这个工具是干嘛的、该不该用」的关键依据。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="menu-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 左侧「工具定义」列标题 —— */}
          <text
            x={DEF_X + 4}
            y={TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔧 你写的工具定义
          </text>
          <text
            x={DEF_X + 4}
            y={TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每份 = 名字 + 参数 + 一句描述
          </text>

          {/* —— 左侧 3 张工具定义卡 —— */}
          {TOOLS.map((t, i) => {
            const y = defCardY(i);
            return (
              <g key={`def-${t.name}`}>
                <rect
                  x={DEF_X}
                  y={y}
                  width={DEF_W}
                  height={DEF_CARD_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={DEF_X + 14}
                  y={y + 28}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--accent)"
                >
                  {t.name}
                </text>
                <text
                  x={DEF_X + 14}
                  y={y + 52}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {t.params}
                </text>
              </g>
            );
          })}

          {/* —— 中段「序列化 + 注入」箭头 + 标记 —— */}
          <line
            x1={DEF_X + DEF_W + 8}
            y1={VIEW_H / 2}
            x2={MENU_X - 8}
            y2={VIEW_H / 2}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#menu-arrow)"
          />
          <text
            x={INJECT_CX}
            y={VIEW_H / 2 - 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            序列化
          </text>
          <text
            x={INJECT_CX}
            y={VIEW_H / 2 - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            注入上下文
          </text>
          <text
            x={INJECT_CX}
            y={VIEW_H / 2 + 28}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            schema → 文本
          </text>

          {/* —— 右侧「模型看到的工具菜单」面板标题 —— */}
          <text
            x={MENU_X + 4}
            y={TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            📋 模型看到的「工具菜单」
          </text>
          <text
            x={MENU_X + 4}
            y={TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            像看菜单一样浏览可用工具
          </text>

          {/* —— 右侧菜单底框 —— */}
          <rect
            x={MENU_X}
            y={MENU_BOX_Y}
            width={MENU_W}
            height={MENU_BOX_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />

          {/* —— 右侧 3 个菜单项（名字 + 一句 description）—— */}
          {TOOLS.map((t, i) => {
            const y = menuItemY(i);
            return (
              <g key={`menu-${t.name}`}>
                <rect
                  x={MENU_ITEM_X}
                  y={y}
                  width={MENU_ITEM_W}
                  height={MENU_ITEM_H}
                  rx="8"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={MENU_ITEM_X + 12}
                  y={y + 24}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--accent)"
                >
                  {t.name}
                </text>
                <text
                  x={MENU_ITEM_X + 12}
                  y={y + 44}
                  fontSize="10"
                  fill="var(--text-primary)"
                >
                  {t.desc.slice(0, 18)}
                </text>
                <text
                  x={MENU_ITEM_X + 12}
                  y={y + 60}
                  fontSize="10"
                  fill="var(--text-primary)"
                >
                  {t.desc.slice(18)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        工具不是「装」进模型里的：把每个工具的 schema（名字 + 参数 +
        一句描述）序列化成文本注入上下文，模型就像看菜单一样「看见」有哪些工具——而那句
        description，正是它判断该不该用、用哪个的关键依据。
      </figcaption>
    </figure>
  );
}
