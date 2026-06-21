/**
 * <HashTableDiagram>：散列表 O(1) 查找可视化。
 * 展示键值对通过哈希函数映射到桶数组索引的过程。
 * Server Component。
 */
export function HashTableDiagram() {
  const VW = 720, VH = 400;
  const BUCKET_W = 48, BUCKET_H = 40, BUCKET_GAP = 8;
  const TOTAL_W = 7 * BUCKET_W + 6 * BUCKET_GAP;
  const START_X = (VW - TOTAL_W) / 2;

  const bx = (i: number) => START_X + i * (BUCKET_W + BUCKET_GAP);

  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";

  const kvs = [
    { key: "apple", val: 5, bucket: 2, x: 110 },
    { key: "banana", val: 8, bucket: 4, x: 310 },
    { key: "cherry", val: 13, bucket: 5, x: 510 },
  ];

  const hashBox = { x: 310, y: 160, w: 100, h: 44 };
  const UNSORTED_Y = 80;
  const BUCKET_Y = 250;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          role="img"
          aria-label="散列表示意图。三组键值对 apple→5、banana→8、cherry→13 通过哈希函数 hash(key) mod 7 分别映射到桶 2、桶 4、桶 5。Insert/Lookup/Delete 均为 O(1)。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ht-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={ac} />
            </marker>
          </defs>

          {/* 标题 */}
          <text x={VW / 2} y={32} textAnchor="middle" fontSize="16px" fontWeight="700" fill={tp}>
            散列表：hash(key) → bucket → O(1) 查找
          </text>
          <text x={VW / 2} y={53} textAnchor="middle" fontSize="11px" fill={ts}>
            键值对通过哈希函数映射到固定大小的桶数组
          </text>

          {/* ======== KV 键值对（上排） ======== */}
          {kvs.map((kv) => (
            <g key={kv.key}>
              <rect
                x={kv.x}
                y={UNSORTED_Y}
                width={100}
                height={42}
                rx={6}
                fill={be}
                stroke={bo}
                strokeWidth={1.5}
              />
              <text x={kv.x + 50} y={UNSORTED_Y + 18} textAnchor="middle" fontSize="12px" fontWeight="700" fill={tp}>
                {kv.key}
              </text>
              <text x={kv.x + 50} y={UNSORTED_Y + 34} textAnchor="middle" fontSize="11px" fill={ac} fontWeight="600">
                值: {kv.val}
              </text>

              {/* KV → hash 箭头 */}
              <line
                x1={kv.x + 50}
                y1={UNSORTED_Y + 42}
                x2={kv.x === 310 ? 360 : kv.x < 310 ? 330 : 390}
                y2={hashBox.y}
                stroke={ac}
                strokeWidth={1.5}
                markerEnd="url(#ht-accent)"
              />
            </g>
          ))}

          {/* ======== hash() 函数盒 ======== */}
          <rect
            x={hashBox.x}
            y={hashBox.y}
            width={hashBox.w}
            height={hashBox.h}
            rx={8}
            fill={ac}
            fillOpacity={0.1}
            stroke={ac}
            strokeWidth={1.5}
          />
          <text x={hashBox.x + hashBox.w / 2} y={hashBox.y + 18} textAnchor="middle" fontSize="12px" fontWeight="700" fill={ac}>
            hash()
          </text>
          <text x={hashBox.x + hashBox.w / 2} y={hashBox.y + 34} textAnchor="middle" fontSize="11px" fill={ts}>
            mod 7
          </text>

          {/* ======== hash → bucket 箭头 ======== */}
          {kvs.map((kv) => (
            <line
              key={`ar-${kv.key}`}
              x1={hashBox.x + hashBox.w / 2}
              y1={hashBox.y + hashBox.h}
              x2={bx(kv.bucket) + BUCKET_W / 2}
              y2={BUCKET_Y - 6}
              stroke={ac}
              strokeWidth={1.5}
              markerEnd="url(#ht-accent)"
            />
          ))}

          {/* ======== 7 个桶（底横排） ======== */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const filled = kvs.find((kv) => kv.bucket === i);
            const isFilled = !!filled;
            return (
              <g key={`b${i}`}>
                <rect
                  x={bx(i)}
                  y={BUCKET_Y}
                  width={BUCKET_W}
                  height={BUCKET_H}
                  rx={6}
                  fill={isFilled ? ac : be}
                  fillOpacity={isFilled ? 0.12 : 1}
                  stroke={isFilled ? ac : bo}
                  strokeWidth={isFilled ? 2 : 1.5}
                />
                {/* 桶索引 */}
                <text x={bx(i) + 6} y={BUCKET_Y + 14} fontSize="11px" fontWeight="600" fill={ts}>
                  {i}
                </text>
                {/* 桶内存储的值 */}
                {isFilled && (
                  <text
                    x={bx(i) + BUCKET_W / 2}
                    y={BUCKET_Y + 31}
                    textAnchor="middle"
                    fontSize="13px"
                    fontWeight="700"
                    fill={ac}
                  >
                    {filled!.val}
                  </text>
                )}
              </g>
            );
          })}

          {/* ======== 底部 Footer ======== */}
          <line x1={40} y1={VH - 90} x2={VW - 40} y2={VH - 90} stroke={bo} strokeWidth={1} strokeDasharray="4 3" />

          {/* 三列：Insert | Lookup | Delete */}
          <text x={VW / 3} y={VH - 66} textAnchor="middle" fontSize="11px" fill={ts}>
            插入 Insert
          </text>
          <text x={VW / 3} y={VH - 48} textAnchor="middle" fontSize="13px" fontWeight="700" fill={su}>
            O(1)
          </text>

          <line x1={VW / 3 + 60} y1={VH - 80} x2={VW / 3 + 60} y2={VH - 35} stroke={bo} strokeWidth={1} />

          <text x={VW / 2} y={VH - 66} textAnchor="middle" fontSize="11px" fill={ts}>
            查找 Lookup
          </text>
          <text x={VW / 2} y={VH - 48} textAnchor="middle" fontSize="13px" fontWeight="700" fill={su}>
            O(1)
          </text>

          <line x1={VW / 2 + 60} y1={VH - 80} x2={VW / 2 + 60} y2={VH - 35} stroke={bo} strokeWidth={1} />

          <text x={(VW * 2) / 3} y={VH - 66} textAnchor="middle" fontSize="11px" fill={ts}>
            删除 Delete
          </text>
          <text x={(VW * 2) / 3} y={VH - 48} textAnchor="middle" fontSize="13px" fontWeight="700" fill={su}>
            O(1)
          </text>

          {/* 最终标语 */}
          <text x={VW / 2} y={VH - 18} textAnchor="middle" fontSize="12px" fontWeight="700" fill={ac}>
            散列表 = 哈希函数 + 数组桶 → 平均复杂度 O(1)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        散列表通过哈希函数将键映射到桶数组索引。插入、查找、删除在均摊下均为 O(1)。
      </figcaption>
    </figure>
  );
}
