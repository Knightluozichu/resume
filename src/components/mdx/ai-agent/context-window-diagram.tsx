/**
 * <AaContextWindowDiagram>：上下文窗口 = 「门缝能塞进的纸条长度」静态解剖图（HEL-272）。
 *
 * 失忆天才小屋隐喻：你从门缝塞进去的那张「纸条」= 系统提示 + 历史对话 + 当前问题，
 * 它被切成一个个 token 方块。门缝（上下文窗口）只能塞进固定长度的纸条；纸条太长，
 * 最前面的部分就被挤出窗口、变灰、被「忘掉」。
 *
 * 画面分两区（同一张 SVG）：
 *  - 上区「一张纸条 = 一串 token」：三段（系统提示 / 历史对话 / 当前问题）拼成一长条，
 *    每段切成若干 token 方块（单一 x 公式整行排）。窗口容量边界框圈住能装下的部分；
 *    超出边界的几个 token 方块滑出窗口、变灰 = 被挤掉、忘了。
 *  - 下区「token 化：中英粒度不同」：示意一句中文 vs 一句英文怎么切成 token 块，
 *    点明中文常一字≈一 token、英文常按词/子词切，让读者直观感到「token ≠ 字数」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --warning / --danger / --success / --border /
 * --bg / --bg-elevated / --text-primary / --text-secondary），无裸 hex、无阴影。
 * 遮挡红线：token 方块单一公式排布、窗口边界框不压字、长中文标签留宽、互不重叠。
 */

export function AaContextWindowDiagram() {
  // —— 布局常量（viewBox 内坐标；单一公式排 token 方块）——
  const VIEW_W = 760;
  const VIEW_H = 470;

  // 上区：一整行 token 方块（纸条），单一 x 公式。
  const TOK_W = 40;
  const TOK_H = 36;
  const TOK_GAP = 6;
  const ROW_LEFT = 24;
  const ROW_Y = 150; // 方块顶 y
  const tokX = (i: number) => ROW_LEFT + i * (TOK_W + TOK_GAP);

  // 纸条三段：系统提示(2) + 历史对话(6) + 当前问题(3) = 11 个 token 方块。
  // 窗口只装得下前 8 个（WINDOW_CAP）；后 3 个被挤出、变灰。
  type Seg = { label: string; n: number; color: string };
  const segs: readonly Seg[] = [
    { label: "系统提示", n: 2, color: "var(--success)" },
    { label: "历史对话", n: 6, color: "var(--warning)" },
    { label: "当前问题", n: 3, color: "var(--accent)" },
  ];
  const TOTAL = segs.reduce((s, g) => s + g.n, 0); // 11
  const WINDOW_CAP = 8; // 窗口容量：装得下前 8 个 token

  // 每个 token 属于第几段（用于上色 + 段标签定位）。
  const tokenSeg: number[] = [];
  segs.forEach((g, si) => {
    for (let k = 0; k < g.n; k++) tokenSeg.push(si);
  });
  // 每段第一个 token 的下标（段标签放在该段上方）。
  const segStart: number[] = [];
  {
    let acc = 0;
    segs.forEach((g) => {
      segStart.push(acc);
      acc += g.n;
    });
  }

  // 窗口容量边界框：圈住前 WINDOW_CAP 个 token。
  const WIN_PAD = 8;
  const winX = tokX(0) - WIN_PAD;
  const winY = ROW_Y - WIN_PAD - 4;
  const winRight = tokX(WINDOW_CAP - 1) + TOK_W + WIN_PAD;
  const winW = winRight - winX;
  const winH = TOK_H + 2 * WIN_PAD + 8;

  // 下区：token 化中英对照。两行，每行一句被切成 token 块。
  const CMP_TOK_H = 34;
  const zhY = 332; // 中文行 token 顶 y
  const enY = zhY + CMP_TOK_H + 30; // 英文行 token 顶 y
  const CMP_LEFT = 132; // token 块起点（左侧留给「中文 / 英文」标签）
  const CMP_GAP = 6;

  // 中文：一字≈一 token（5 字 5 块）。
  const zhTokens = ["今", "天", "天", "气", "真"];
  // 英文：常按词/子词切（"unbelievable" → un / believ / able 三块演示子词切分）。
  const enTokens = ["The", " weather", " is", " un", "believ", "able"];
  // 等宽近似：中文块固定宽，英文块按字符数估宽（演示「英文更费 token / 一词多块」）。
  const zhBoxW = 38;
  const enBoxW = (t: string) => Math.max(40, t.trim().length * 11 + 18);

  // 中文块 x（单一公式，等宽等距）。
  const zhX = (i: number) => CMP_LEFT + i * (zhBoxW + CMP_GAP);
  // 英文块 x（累加前缀宽，单调递增、互不重叠）。
  const enX: number[] = [];
  {
    let acc = CMP_LEFT;
    enTokens.forEach((t) => {
      enX.push(acc);
      acc += enBoxW(t) + CMP_GAP;
    });
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="上下文窗口与 token 化的解剖图。上半部分：你从门缝塞进模型的「纸条」由系统提示、历史对话、当前问题三段拼成，被切成一个个 token 方块排成一行。一个虚线窗口框圈住模型一次能读到的容量（这里是前 8 个 token）；纸条太长时，最前面超出窗口的 3 个 token 方块滑出窗口、变成灰色，表示被挤掉、被模型「忘掉」。下半部分：token 化的中英对照——中文「今天天气真」一字大致切成一个 token（5 块），英文「The weather is unbelievable」常按词或子词切，一个长词 unbelievable 被切成 un、believ、able 三块，直观说明 token 不等于字数、中英文切分粒度不同。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* ===== 上区标题 ===== */}
          <text
            x="24"
            y="32"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            上下文窗口 = 门缝能塞进的纸条长度
          </text>
          <text x="24" y="54" fontSize="12" fill="var(--text-secondary)">
            塞进去的纸条 = 系统提示 + 历史对话 + 当前问题，被切成一个个 token
          </text>

          {/* 段标签（放在 token 行上方，不压方块） */}
          {segs.map((g, si) => {
            const first = segStart[si];
            const last = first + g.n - 1;
            const cx = (tokX(first) + tokX(last) + TOK_W) / 2;
            return (
              <g key={`seg-label-${si}`}>
                <text
                  x={cx}
                  y={ROW_Y - 22}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={g.color}
                >
                  {g.label}
                </text>
                {/* 段范围下划线（贴标签下方，距 token 顶 ≥6） */}
                <line
                  x1={tokX(first)}
                  y1={ROW_Y - 16}
                  x2={tokX(last) + TOK_W}
                  y2={ROW_Y - 16}
                  stroke={g.color}
                  strokeWidth="1.4"
                  opacity="0.6"
                />
              </g>
            );
          })}

          {/* 窗口容量边界框（虚线，圈住前 WINDOW_CAP 个 token；在 token 之下先画） */}
          <rect
            x={winX}
            y={winY}
            width={winW}
            height={winH}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeDasharray="6 4"
          />
          <text
            x={winX + 8}
            y={winY - 8}
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            ▢ 窗口容量：一次只读得进这么长
          </text>

          {/* token 方块行：窗口内正常着色，窗口外（下标 ≥ WINDOW_CAP）变灰 = 被挤掉 */}
          {Array.from({ length: TOTAL }).map((_, i) => {
            const x = tokX(i);
            const inWindow = i < WINDOW_CAP;
            const color = inWindow ? segs[tokenSeg[i]].color : "var(--border)";
            return (
              <g key={`tok-${i}`} opacity={inWindow ? 1 : 0.5}>
                <rect
                  x={x}
                  y={ROW_Y}
                  width={TOK_W}
                  height={TOK_H}
                  rx="6"
                  fill={color}
                  fillOpacity={inWindow ? 0.16 : 0.25}
                  stroke={color}
                  strokeWidth="1.3"
                  strokeDasharray={inWindow ? undefined : "3 3"}
                />
                <text
                  x={x + TOK_W / 2}
                  y={ROW_Y + TOK_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill={
                    inWindow ? "var(--text-primary)" : "var(--text-secondary)"
                  }
                >
                  {`t${i + 1}`}
                </text>
              </g>
            );
          })}

          {/* 「被挤掉 = 忘了」标注：指向窗口外那几个灰块 */}
          <text
            x={tokX(WINDOW_CAP) + (TOTAL - WINDOW_CAP - 1) * 0 + 4}
            y={ROW_Y + TOK_H + 30}
            fontSize="12"
            fontWeight="700"
            fill="var(--danger)"
          >
            ⟸ 超出窗口的部分被挤掉 = 模型「忘了」这些 token
          </text>

          {/* ===== 分隔线 ===== */}
          <line
            x1="24"
            y1="278"
            x2={VIEW_W - 24}
            y2="278"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 下区标题 ===== */}
          <text
            x="24"
            y="304"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            token 化：token ≠ 字数，中英粒度不同
          </text>

          {/* 中文行标签 + token 块（一字≈一 token） */}
          <text
            x="24"
            y={zhY + CMP_TOK_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            中文（5 字 ≈ 5 token）
          </text>
          {zhTokens.map((ch, i) => {
            const x = zhX(i);
            return (
              <g key={`zh-${i}`}>
                <rect
                  x={x}
                  y={zhY}
                  width={zhBoxW}
                  height={CMP_TOK_H}
                  rx="6"
                  fill="var(--success)"
                  fillOpacity="0.14"
                  stroke="var(--success)"
                  strokeWidth="1.3"
                />
                <text
                  x={x + zhBoxW / 2}
                  y={zhY + CMP_TOK_H / 2 + 6}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {ch}
                </text>
              </g>
            );
          })}

          {/* 英文行标签 + token 块（按词/子词切，一长词拆多块） */}
          <text
            x="24"
            y={enY + CMP_TOK_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            英文（按词 / 子词切）
          </text>
          {enTokens.map((t, i) => {
            const x = enX[i];
            const w = enBoxW(t);
            // unbelievable 被拆成的三块用 danger 提示「一个词≠一个 token」。
            const isSub = i >= 3;
            const color = isSub ? "var(--danger)" : "var(--accent)";
            return (
              <g key={`en-${i}`}>
                <rect
                  x={x}
                  y={enY}
                  width={w}
                  height={CMP_TOK_H}
                  rx="6"
                  fill={color}
                  fillOpacity="0.14"
                  stroke={color}
                  strokeWidth="1.3"
                />
                <text
                  x={x + w / 2}
                  y={enY + CMP_TOK_H / 2 + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {t.trim()}
                </text>
              </g>
            );
          })}
          {/* 子词拆分注解（放在英文行下方，不压块） */}
          <text
            x={enX[3]}
            y={enY + CMP_TOK_H + 22}
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            「unbelievable」一个词被切成 3 个 token：un · believ · able
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        模型一次只读得进固定长度的「纸条」（上下文窗口）；超出的部分被挤掉，就是它「忘了」的来由。
        而切纸条用的单位是 token——中文常一字一 token，英文常一词切成好几个，所以
        token 数 ≠ 字数。
      </figcaption>
    </figure>
  );
}
