/**
 * <QuickSortDiagram>：快速排序分区可视化。三面板并排。
 * 使用 JSX 表达式语法 fill={"var(--xxx)"} 避免 TS 歧义。
 * Server Component。
 */
export function QuickSortDiagram() {
  const VW = 960, VH = 340, PW = 280, PH = 120, PTOP = 90, P1 = 24, P2 = 340, P3 = 656;
  const BW = 28, BH = 28, BG = 8;
  const rx = (n: number, total: number, px: number) => px + (PW - (total * BW + (total - 1) * BG)) / 2 + n * (BW + BG);
  const ac = "var(--accent)";
  const wa = "var(--warning)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";
  const da = "var(--danger)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label="快速排序分区示意图" className="mx-auto block h-auto w-full max-w-[960px]">
          <defs>
            <marker id="qsa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={ac} />
            </marker>
          </defs>
          <text x={VW/2} y={40} textAnchor="middle" fontSize="16px" fontWeight="700" fill={tp}>快速排序：分区</text>
          <text x={VW/2} y={62} textAnchor="middle" fontSize="11px" fill={ts}>核心操作：选 pivot → 分区 → 递归两边 → 拼接</text>

          {/* Panel 1 */}
          <rect x={P1} y={PTOP} width={PW} height={PH} rx="10" fill={bg} stroke={bo} strokeWidth="1.5" />
          <rect x={P1+8} y={PTOP+12} width={PW-16} height="26" rx="6" fill={ac} fillOpacity="0.12" />
          <text x={P1+PW/2} y={PTOP+30} textAnchor="middle" fontSize="12" fontWeight="700" fill={ac}>选 Pivot</text>
          {[33,12,48,7,25,41,16].map((v,i) => (
            <g key={`p1-${v}`}>
              <rect x={rx(i,7,P1)} y={PTOP+58} width={BW} height={BH} rx="5" fill={v===25 ? ac : be} fillOpacity={v===25 ? 1 : 0} stroke={v===25 ? ac : bo} strokeWidth={v===25 ? 2 : 1.5} />
              <text x={rx(i,7,P1)+BW/2} y={PTOP+58+19} textAnchor="middle" fontSize={v===25 ? "12px" : "11px"} fontWeight={v===25 ? "700" : "500"} fill={v===25 ? "white" : tp}>{v}</text>
            </g>
          ))}

          {/* Panel 2 */}
          <line x1={P1+PW} y1={PTOP+60} x2={P2} y2={PTOP+60} stroke={ac} strokeWidth="1.8" markerEnd="url(#qsa)" />
          <text x={(P1+PW+P2)/2} y={PTOP+50} textAnchor="middle" fontSize="11" fontWeight="600" fill={ac}>分区</text>
          <rect x={P2} y={PTOP} width={PW} height={PH} rx="10" fill={bg} stroke={bo} strokeWidth="1.5" />
          <rect x={P2+8} y={PTOP+12} width={PW-16} height="26" rx="6" fill={wa} fillOpacity="0.12" />
          <text x={P2+PW/2} y={PTOP+30} textAnchor="middle" fontSize="12" fontWeight="700" fill={wa}>分区</text>
          {[12,7,16,25,33,48,41].map((v,i) => (
            <g key={`p2-${v}`}>
              <rect x={rx(i,7,P2)} y={PTOP+58} width={BW} height={BH} rx="5" fill={v===25 ? wa : be} fillOpacity={v===25 ? 1 : 0} stroke={v===25 ? wa : bo} strokeWidth={v===25 ? 2 : 1.5} />
              <text x={rx(i,7,P2)+BW/2} y={PTOP+58+19} textAnchor="middle" fontSize={v===25 ? "12px" : "11px"} fontWeight={v===25 ? "700" : "500"} fill={v===25 ? "white" : tp}>{v}</text>
            </g>
          ))}

          {/* Panel 3 */}
          <line x1={P2+PW} y1={PTOP+60} x2={P3} y2={PTOP+60} stroke={ac} strokeWidth="1.8" markerEnd="url(#qsa)" />
          <text x={(P2+PW+P3)/2} y={PTOP+50} textAnchor="middle" fontSize="11" fontWeight="600" fill={ac}>递归+拼接</text>
          <rect x={P3} y={PTOP} width={PW} height={PH} rx="10" fill={bg} stroke={bo} strokeWidth="1.5" />
          <rect x={P3+8} y={PTOP+12} width={PW-16} height="26" rx="6" fill={su} fillOpacity="0.12" />
          <text x={P3+PW/2} y={PTOP+30} textAnchor="middle" fontSize="12" fontWeight="700" fill={su}>最终结果</text>
          {[7,12,16,25,33,41,48].map((v,i) => (
            <g key={`p3-${v}`}>
              <rect x={rx(i,7,P3)} y={PTOP+58} width={BW} height={BH} rx="5" fill={v===25 ? su : be} fillOpacity={v===25 ? 1 : 0} stroke={v===25 ? su : bo} strokeWidth={v===25 ? 2 : 1.5} />
              <text x={rx(i,7,P3)+BW/2} y={PTOP+58+19} textAnchor="middle" fontSize={v===25 ? "12px" : "11px"} fontWeight={v===25 ? "700" : "500"} fill={v===25 ? "white" : tp}>{v}</text>
            </g>
          ))}

          {/* Footer */}
          <line x1={40} y1={PTOP+PH+40} x2={VW-40} y2={PTOP+PH+40} stroke={bo} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VW/2-200} y={PTOP+PH+64} textAnchor="middle" fontSize="11" fill={ts}>最好/平均</text>
          <text x={VW/2-200} y={PTOP+PH+82} textAnchor="middle" fontSize="13" fontWeight="700" fill={su}>O(n log n)</text>
          <text x={VW/2-67} y={PTOP+PH+64} textAnchor="middle" fontSize="11" fill={ts}>最坏(已有序)</text>
          <text x={VW/2-67} y={PTOP+PH+82} textAnchor="middle" fontSize="13" fontWeight="700" fill={da}>O(n²)</text>
          <text x={VW/2+92} y={PTOP+PH+64} textAnchor="middle" fontSize="11" fill={ts}>空间</text>
          <text x={VW/2+92} y={PTOP+PH+82} textAnchor="middle" fontSize="13" fontWeight="700" fill={tp}>O(log n) 栈</text>
          <text x={VW/2} y={PTOP+PH+102} textAnchor="middle" fontSize="12px" fontWeight="700" fill={ac}>平均 O(n log n)：选好 pivot 是关键</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">快速排序：选 pivot → 分区 → 递归两边 → 拼接。随机选 pivot 可避免退化。</figcaption>
    </figure>
  );
}
