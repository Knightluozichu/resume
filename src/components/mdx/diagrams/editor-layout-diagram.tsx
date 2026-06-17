/**
 * <EditorLayoutDiagram>：Unity 编辑器五大窗口布局解剖图（HEL-278，《Unity 5 权威讲解》第1章主图）。
 *
 * 把 Unity 编辑器的标准布局画成五个互不重叠的窗口框，每框含「窗口名 + 一句数字片场类比」：
 *  - 左列：Hierarchy（场上演员名单），整列高。
 *  - 中上：Scene（布景搭建台 · 导演摆位视角）+ Game（摄影机取景 · 观众看到的），并排两框。
 *  - 右列：Inspector（选中演员的资料卡），整列高。
 *  - 底部：Project（道具仓库 · 所有可用资源），横跨左+中两列宽。
 *
 * 这是读者第一次认识 Unity 界面的「地图」，全书「数字片场」隐喻在此立起。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --success / --warning / --danger /
 * --border / --bg / --bg-elevated / --text-primary / --text-secondary），无裸 hex、无阴影。
 * 所有窗口框两两不重叠、所有 <text> 距 viewBox 任意边 ≥14px、内容铺满（利用率高）。
 */

export function EditorLayoutDiagram() {
  // —— 布局常量（viewBox 内坐标；间距均 4 的倍数，无魔法数字散落）——
  const VIEW_W = 720;
  const VIEW_H = 440;

  const PAD = 16; // 内容距 viewBox 边的安全留白（≥14px 红线）
  const TITLE_Y = 30; // 顶部主标题基线
  const GRID_TOP = 56; // 窗口网格起点 y（标题下方）
  const GRID_BOTTOM = VIEW_H - PAD; // 网格底
  const GAP = 12; // 窗口间隙

  // 三列宽度：左 Hierarchy / 中（Scene|Game + Project）/ 右 Inspector。
  const SIDE_W = 156; // 左右两列窗口宽
  const leftX = PAD;
  const rightX = VIEW_W - PAD - SIDE_W;
  // 中列横跨左右列之间，扣掉两侧间隙。
  const centerX = leftX + SIDE_W + GAP;
  const centerW = rightX - GAP - centerX;

  // 中列竖向再切两层：上层 Scene|Game（高些），下层 Project。
  const centerTopH = 196; // Scene / Game 框高
  const sceneGameY = GRID_TOP;
  const projectY = sceneGameY + centerTopH + GAP;
  const projectH = GRID_BOTTOM - projectY;

  // 中上层左右切两框：Scene、Game。
  const sgInnerGap = GAP;
  const sgW = (centerW - sgInnerGap) / 2;
  const sceneX = centerX;
  const gameX = centerX + sgW + sgInnerGap;

  // 侧列整列高（顶到底）。
  const sideH = GRID_BOTTOM - GRID_TOP;

  // 单框渲染辅助：框 + 标题栏 + 窗口名 + 类比副标。
  type WinSpec = {
    x: number;
    y: number;
    w: number;
    h: number;
    name: string;
    role: string; // 片场类比
    accent: string; // 该框强调色（标题/边框语义色）
  };

  const windows: readonly WinSpec[] = [
    {
      x: leftX,
      y: GRID_TOP,
      w: SIDE_W,
      h: sideH,
      name: "Hierarchy 层级",
      role: "场上演员名单",
      accent: "var(--accent)",
    },
    {
      x: sceneX,
      y: sceneGameY,
      w: sgW,
      h: centerTopH,
      name: "Scene 场景",
      role: "布景搭建台",
      accent: "var(--success)",
    },
    {
      x: gameX,
      y: sceneGameY,
      w: sgW,
      h: centerTopH,
      name: "Game 游戏",
      role: "摄影机取景",
      accent: "var(--warning)",
    },
    {
      x: centerX,
      y: projectY,
      w: centerW,
      h: projectH,
      name: "Project 工程",
      role: "道具仓库",
      accent: "var(--danger)",
    },
    {
      x: rightX,
      y: GRID_TOP,
      w: SIDE_W,
      h: sideH,
      name: "Inspector 检视面板",
      role: "选中演员的资料卡",
      accent: "var(--accent)",
    },
  ];

  const TAB_H = 26; // 窗口顶部「标题栏」高

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 编辑器五大窗口标准布局解剖图。整个编辑器像一间数字片场。左侧一整列是 Hierarchy 层级窗口，相当于场上演员名单，列出当前场景里所有对象。中间上方并排两个窗口：左边是 Scene 场景窗口，相当于布景搭建台，是导演摆位的视角，用来在 3D 空间里摆放和编辑对象；右边是 Game 游戏窗口，相当于摄影机取景，显示玩家实际会看到的画面。中间下方横跨一整条是 Project 工程窗口，相当于道具仓库，存放项目里所有可用的资源文件。右侧一整列是 Inspector 检视面板，相当于选中演员的资料卡，显示并编辑当前选中对象的全部属性。五个窗口彼此不重叠，共同拼成 Unity 编辑器的完整界面。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={PAD}
            y={TITLE_Y}
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Unity 编辑器 = 一间数字片场
          </text>
          <text
            x={VIEW_W - PAD}
            y={TITLE_Y}
            textAnchor="end"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            五大窗口各司其职
          </text>

          {/* ===== 五个窗口框 ===== */}
          {windows.map((win) => (
            <g key={win.name}>
              {/* 窗口外框 */}
              <rect
                x={win.x}
                y={win.y}
                width={win.w}
                height={win.h}
                rx="8"
                fill="var(--bg)"
                stroke={win.accent}
                strokeWidth="1.6"
                strokeOpacity="0.7"
              />
              {/* 顶部标题栏底色（区分「窗口名」与「内容区」；含于外框内 → 父子嵌套，不算重叠）*/}
              <rect
                x={win.x + 1}
                y={win.y + 1}
                width={win.w - 2}
                height={TAB_H}
                rx="7"
                fill={win.accent}
                fillOpacity="0.16"
              />
              {/* 窗口名 */}
              <text
                x={win.x + 12}
                y={win.y + 17}
                fontSize="12"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {win.name}
              </text>
              {/* 片场类比副标（内容区上部）*/}
              <text
                x={win.x + win.w / 2}
                y={win.y + TAB_H + 24}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={win.accent}
              >
                {win.role}
              </text>
            </g>
          ))}

          {/* ===== 各框内容区的「示意条」（轻量装饰，暗示该窗口长什么样）===== */}

          {/* Hierarchy：竖排「对象列表」三条 */}
          {[0, 1, 2].map((i) => (
            <g key={`h-row-${i}`}>
              <circle
                cx={leftX + 18}
                cy={GRID_TOP + TAB_H + 52 + i * 26}
                r="3"
                fill="var(--accent)"
              />
              <rect
                x={leftX + 30}
                y={GRID_TOP + TAB_H + 46 + i * 26}
                width={SIDE_W - 44}
                height="12"
                rx="3"
                fill="var(--text-secondary)"
                fillOpacity="0.22"
              />
            </g>
          ))}
          <text
            x={leftX + SIDE_W / 2}
            y={GRID_BOTTOM - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            场景里有谁
          </text>

          {/* Scene：网格地面 + 一个方块（导演摆位视角）*/}
          <rect
            x={sceneX + 14}
            y={sceneGameY + TAB_H + 40}
            width={sgW - 28}
            height={centerTopH - TAB_H - 70}
            rx="4"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="4 4"
          />
          <rect
            x={sceneX + sgW / 2 - 16}
            y={sceneGameY + TAB_H + 72}
            width="32"
            height="32"
            rx="4"
            fill="var(--success)"
            fillOpacity="0.3"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={sceneX + sgW / 2}
            y={sceneGameY + centerTopH - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            导演摆位
          </text>

          {/* Game：取景框（观众看到的画面）*/}
          <rect
            x={gameX + 14}
            y={sceneGameY + TAB_H + 40}
            width={sgW - 28}
            height={centerTopH - TAB_H - 70}
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x={gameX + sgW / 2}
            y={sceneGameY + centerTopH - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            玩家看到的
          </text>

          {/* Project：横排「资源缩略图」格子 */}
          {[0, 1, 2, 3].map((i) => {
            const cell = 36;
            const cgap = 12;
            const startX = centerX + 16;
            return (
              <rect
                key={`asset-${i}`}
                x={startX + i * (cell + cgap)}
                y={projectY + TAB_H + 24}
                width={cell}
                height={cell}
                rx="5"
                fill="var(--danger)"
                fillOpacity="0.14"
                stroke="var(--danger)"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
            );
          })}
          <text
            x={centerX + 16}
            y={projectY + projectH - 14}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            模型 / 贴图 / 脚本 / 音频 …… 都堆在这里
          </text>

          {/* Inspector：选中对象的「属性行」三条 */}
          {[0, 1, 2].map((i) => (
            <g key={`insp-row-${i}`}>
              <rect
                x={rightX + 14}
                y={GRID_TOP + TAB_H + 48 + i * 30}
                width={SIDE_W - 28}
                height="18"
                rx="3"
                fill="var(--accent)"
                fillOpacity="0.1"
                stroke="var(--accent)"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
              <rect
                x={rightX + 20}
                y={GRID_TOP + TAB_H + 52 + i * 30}
                width="40"
                height="10"
                rx="2"
                fill="var(--text-secondary)"
                fillOpacity="0.3"
              />
            </g>
          ))}
          <text
            x={rightX + SIDE_W / 2}
            y={GRID_BOTTOM - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            选中谁就显示谁的属性
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity
        编辑器的五大窗口：Hierarchy（场上有谁）、Scene（导演摆位）、Game（观众视角）、
        Project（道具仓库）、Inspector（选中对象的资料卡）。把它当成一间数字片场，界面就不再陌生。
      </figcaption>
    </figure>
  );
}
