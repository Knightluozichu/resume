/**
 * <FileReadWriteFlowDiagram>：fopen → 读写 → fclose 四步流程。
 *
 * step 1: fopen 打开
 * step 2: fprintf/fscanf/fgets/fputs 或 fread/fwrite
 * step 3: 检查 feof/ferror
 * step 4: fclose 关闭并刷新
 */

interface FileReadWriteFlowDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function FileReadWriteFlowDiagram({ step = 4 }: FileReadWriteFlowDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.75 : 0.35);

  const stages = [
    { x: 100, label: "① fopen", code: 'fp = fopen("data.txt","r");', sub: "失败 → NULL" },
    { x: 260, label: "② 读写", code: "fgets / fprintf / fread", sub: "经缓冲区" },
    { x: 420, label: "③ 检查", code: "feof(fp) ferror(fp)", sub: "区分正常结束与错误" },
    { x: 540, label: "④ fclose", code: "fclose(fp);", sub: "刷新缓冲·释放" },
  ];

  const boxW = 120;
  const boxH = 100;
  const cy = 140;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="文件 I/O 四步：fopen 打开、读写数据、检查状态、fclose 关闭"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            文件 I/O 标准流程
          </text>

          {stages.map((st, i) => {
            const s = (i + 1) as 1 | 2 | 3 | 4;
            const x = st.x - boxW / 2;
            return (
              <g key={st.label} opacity={highlight(s)}>
                <rect
                  x={x}
                  y={cy - boxH / 2}
                  width={boxW}
                  height={boxH}
                  rx="8"
                  fill={step === s ? bgEl : bg}
                  stroke={step === s ? accent : border}
                  strokeWidth={step === s ? 2.5 : 1.5}
                />
                <text x={st.x} y={cy - 28} textAnchor="middle" fontSize="12" fontWeight="700" fill={step === s ? accent : secondary}>
                  {st.label}
                </text>
                <text x={st.x} y={cy - 6} textAnchor="middle" fontSize="9" fill={primary} fontFamily="monospace">
                  {st.code.length > 22 ? st.code.slice(0, 20) + "…" : st.code}
                </text>
                <text x={st.x} y={cy + 12} textAnchor="middle" fontSize="8" fill={secondary}>
                  {st.sub}
                </text>
              </g>
            );
          })}

          {/* arrows between stages */}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={step > i ? 1 : 0.3}>
              <line
                x1={stages[i].x + boxW / 2 + 4}
                y1={cy}
                x2={stages[i + 1].x - boxW / 2 - 4}
                y2={cy}
                stroke={accent}
                strokeWidth="2"
                markerEnd="url(#frwArrow)"
              />
            </g>
          ))}

          <text x={320} y={248} textAnchor="middle" fontSize="10" fill={secondary}>
            {step === 1 && "打开流：检查 fp != NULL 再使用"}
            {step === 2 && "文本行 I/O 用 fgets/fputs；格式化用 fprintf/fscanf；块数据用 fread/fwrite"}
            {step === 3 && "循环读时 feof 常在读完后再判；ferror 捕获 I/O 错误"}
            {step === 4 && "fclose 刷新未写出的缓冲；fp 不可再使用"}
          </text>

          <defs>
            <marker id="frwArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        成对 fopen/fclose；中间任意 return 路径也要关闭已打开的文件，否则句柄与缓冲泄漏。
      </figcaption>
    </figure>
  );
}
