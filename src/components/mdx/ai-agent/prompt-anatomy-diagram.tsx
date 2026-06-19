/**
 * <AaPromptAnatomyDiagram>：一条提示的「分区解剖图」（HEL-293，静态 Server SVG）。
 *
 * 把一条好提示拆成四个区，自上而下读：
 *   ① 角色（system）：你是谁、守什么规矩——失忆天才的「岗位说明书」
 *   ② 指令：这次具体要它做什么、有什么要求（清晰、可执行）
 *   ③ few-shot 示例：给几组「输入→输出」范例，教它照着做
 *   ④ 输入（user）：本次真正待处理的内容
 * 每区标注「写什么 / 起什么作用」，让读者一眼看清一条提示由哪几块组成。
 *
 * 布局（防遮挡红线，§四几何）：四个区块用单一公式纵向堆叠（zoneTop(i)），等宽、左缘对齐、
 * 行距固定；左侧一条贯通的「角标条」配序号，区块内左对齐两行文字（标题 + 说明），textAnchor
 * 统一，文字不溢出盒、不互相穿插；右侧给一列「作用」小注，与区块一一水平对齐、不压区块文字。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --warning / --success / --danger / --border /
 * --bg / --bg-elevated / --text-primary / --text-secondary），无裸 hex、无阴影。
 */

export function AaPromptAnatomyDiagram() {
  // —— 布局常量（viewBox 内坐标）——
  const VIEW_W = 720;
  const VIEW_H = 498;

  const ZONE_W = 420;
  const ZONE_H = 84;
  const ZONE_GAP = 20;
  const ZONE_LEFT = 152; // 区块左缘（左侧留给序号角标条）
  const ZONE_TOP0 = 86; // 第一区顶 y
  const zoneTop = (i: number) => ZONE_TOP0 + i * (ZONE_H + ZONE_GAP);

  type Zone = {
    id: string;
    no: string; // 序号
    title: string; // 区名（中 + role）
    detail: string; // 这一区写什么
    role: string; // 左侧角标的 role 标
    effect: string; // 右侧「作用」小注
    color: string;
  };

  const zones: readonly Zone[] = [
    {
      id: "role",
      no: "①",
      title: "角色 system",
      detail: "「你是一位严谨的法律助理，只依据给定条款回答。」",
      role: "岗位说明书",
      effect: "定身份与规矩",
      color: "var(--accent)",
    },
    {
      id: "instruction",
      no: "②",
      title: "指令",
      detail: "「把下面合同条款翻成大白话，逐条列出，不要遗漏。」",
      role: "本次要求",
      effect: "说清要它做什么",
      color: "var(--success)",
    },
    {
      id: "fewshot",
      no: "③",
      title: "few-shot 示例",
      detail: "「条款：…… → 大白话：……」给两三组范例照着学",
      role: "几个范例",
      effect: "教它照样子做",
      color: "var(--warning)",
    },
    {
      id: "input",
      no: "④",
      title: "输入 user",
      detail: "「条款：本协议自双方签字之日起生效……」（本次待处理内容）",
      role: "这次的活",
      effect: "提供待处理输入",
      color: "var(--danger)",
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一条提示的分区解剖图，自上而下分四个区。第一区「角色 system」是岗位说明书，例如告诉模型你是一位严谨的法律助理、只依据给定条款回答，作用是定身份与规矩。第二区「指令」说清这次具体要做什么，例如把合同条款翻成大白话、逐条列出、不要遗漏，作用是说清要它做什么。第三区「few-shot 示例」给两三组输入到输出的范例让模型照着学，作用是教它照样子做。第四区「输入 user」放本次真正待处理的内容，例如具体的合同条款，作用是提供待处理输入。四区合起来就是一条结构完整的好提示。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="34"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一条好提示，拆开看是四个区
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            角色 → 指令 → 示例 → 输入：自上而下读，每块各管一件事
          </text>

          {/* ===== 左侧贯通竖条（把四区串成「一条提示」）===== */}
          <line
            x1={ZONE_LEFT - 28}
            y1={zoneTop(0)}
            x2={ZONE_LEFT - 28}
            y2={zoneTop(zones.length - 1) + ZONE_H}
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* ===== 四个区块 ===== */}
          {zones.map((z, i) => {
            const y = zoneTop(i);
            const cy = y + ZONE_H / 2;
            return (
              <g key={z.id}>
                {/* 左侧序号角标（圆点 + 序号） */}
                <circle
                  cx={ZONE_LEFT - 28}
                  cy={cy}
                  r="13"
                  fill="var(--bg)"
                  stroke={z.color}
                  strokeWidth="2"
                />
                <text
                  x={ZONE_LEFT - 28}
                  y={cy + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={z.color}
                >
                  {z.no}
                </text>
                {/* 左侧 role 标（角标条左边一句话） */}
                <text
                  x={ZONE_LEFT - 50}
                  y={cy - 6}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {z.role}
                </text>

                {/* 区块底框 */}
                <rect
                  x={ZONE_LEFT}
                  y={y}
                  width={ZONE_W}
                  height={ZONE_H}
                  rx="10"
                  fill={z.color}
                  fillOpacity="0.1"
                  stroke={z.color}
                  strokeWidth="1.6"
                />
                {/* 区名（盒内第一行，左对齐） */}
                <text
                  x={ZONE_LEFT + 16}
                  y={y + 30}
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {z.title}
                </text>
                {/* 这一区写什么（第二行，左对齐，灰字示例） */}
                <text
                  x={ZONE_LEFT + 16}
                  y={y + 56}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {z.detail}
                </text>

                {/* 右侧「作用」小注（与区块水平对齐） */}
                <text
                  x={ZONE_LEFT + ZONE_W + 16}
                  y={cy - 4}
                  fontSize="11"
                  fontWeight="600"
                  fill={z.color}
                >
                  作用：
                </text>
                <text
                  x={ZONE_LEFT + ZONE_W + 16}
                  y={cy + 14}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {z.effect}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一条好提示由四个区组成：角色（system 岗位说明书）定身份与规矩、指令说清要做什么、
        few-shot 示例教它照样子做、输入（user）给本次待处理内容——缺一块都容易让模型跑偏。
      </figcaption>
    </figure>
  );
}
