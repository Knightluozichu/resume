/**
 * <FileStreamLifecycleDiagram>：文件流生命周期示意图（打开→读取→处理→关闭）。
 *
 * 展示文件流从构造打开、读取数据、内存处理到关闭回收的全过程。
 * 支持 step prop（0-3），用于 Stepper 分步讲解。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色（var(--xxx)），无阴影。
 */

interface FileStreamLifecycleDiagramProps {
  step?: number; // 0=打开文件, 1=读取数据, 2=处理数据, 3=关闭文件
}

export function FileStreamLifecycleDiagram({
  step = -1,
}: FileStreamLifecycleDiagramProps) {
  const showAll = step < 0 || step > 3;
  const active = (s: number) => showAll || step === s;

  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";

  const w = 640;
  const h = 480;

  // 四个阶段的位置
  const stages = [
    { x: 140, y: 60, label: "① 打开文件" },
    { x: 460, y: 60, label: "② 读取数据" },
    { x: 460, y: 280, label: "③ 处理数据" },
    { x: 140, y: 280, label: "④ 关闭文件" },
  ];

  const boxW = 170;
  const boxH = 130;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="文件流生命周期：打开文件→读取数据→处理数据→关闭文件，每步对应文件流的操作和内存状态"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ═══════ Step 0: 打开文件 ═══════ */}
          <g opacity={active(0) ? 1 : 0.35}>
            <rect
              x={stages[0].x - boxW / 2}
              y={stages[0].y}
              width={boxW}
              height={boxH}
              rx="8"
              fill={active(0) ? elevated : bg}
              stroke={active(0) ? accent : border}
              strokeWidth={active(0) ? "2.5" : "1.5"}
            />
            <text
              x={stages[0].x}
              y={stages[0].y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={active(0) ? accent : secondary}
            >
              {stages[0].label}
            </text>
            {/* 文件图标 */}
            <rect
              x={stages[0].x - 50}
              y={stages[0].y + 42}
              width="40"
              height="50"
              rx="4"
              fill={bg}
              stroke={active(0) ? accent : border}
              strokeWidth="1.5"
            />
            <text
              x={stages[0].x - 30}
              y={stages[0].y + 62}
              textAnchor="middle"
              fontSize="20"
              fill={active(0) ? accent : secondary}
            >
              📄
            </text>
            <text
              x={stages[0].x - 30}
              y={stages[0].y + 82}
              textAnchor="middle"
              fontSize="9"
              fill={secondary}
              fontFamily="monospace"
            >
              data.txt
            </text>
            {/* 代码片段 */}
            <text
              x={stages[0].x + 20}
              y={stages[0].y + 52}
              fontSize="11"
              fill={active(0) ? primary : secondary}
              fontFamily="monospace"
            >
              ifstream
            </text>
            <text
              x={stages[0].x + 20}
              y={stages[0].y + 68}
              fontSize="11"
              fill={active(0) ? primary : secondary}
              fontFamily="monospace"
            >
              file("data.txt");
            </text>
            <text
              x={stages[0].x + 20}
              y={stages[0].y + 88}
              fontSize="10"
              fill={accent}
            >
              构造函数打开
            </text>
            <text
              x={stages[0].x + 20}
              y={stages[0].y + 108}
              fontSize="10"
              fill={secondary}
            >
              含文件/二进制模式
            </text>
          </g>

          {/* ═══════ Step 1: 读取数据 ═══════ */}
          <g opacity={active(1) ? 1 : 0.35}>
            <rect
              x={stages[1].x - boxW / 2}
              y={stages[1].y}
              width={boxW}
              height={boxH}
              rx="8"
              fill={active(1) ? elevated : bg}
              stroke={active(1) ? accent : border}
              strokeWidth={active(1) ? "2.5" : "1.5"}
            />
            <text
              x={stages[1].x}
              y={stages[1].y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={active(1) ? accent : secondary}
            >
              {stages[1].label}
            </text>
            {/* 数据流示意 */}
            <text
              x={stages[1].x}
              y={stages[1].y + 50}
              textAnchor="middle"
              fontSize="20"
              fill={active(1) ? accent : secondary}
            >
              ▸▸▸▸▸
            </text>
            <text
              x={stages[1].x}
              y={stages[1].y + 70}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              file &gt;&gt; word;
            </text>
            <text
              x={stages[1].x}
              y={stages[1].y + 86}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              getline(file, line);
            </text>
            <text
              x={stages[1].x}
              y={stages[1].y + 102}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              file.read(buf, size);
            </text>
            <text
              x={stages[1].x}
              y={stages[1].y + 120}
              textAnchor="middle"
              fontSize="9"
              fill={secondary}
            >
              从硬盘→内存缓冲→变量
            </text>
          </g>

          {/* ═══════ Step 2: 处理数据 ═══════ */}
          <g opacity={active(2) ? 1 : 0.35}>
            <rect
              x={stages[2].x - boxW / 2}
              y={stages[2].y}
              width={boxW}
              height={boxH}
              rx="8"
              fill={active(2) ? elevated : bg}
              stroke={active(2) ? accent : border}
              strokeWidth={active(2) ? "2.5" : "1.5"}
            />
            <text
              x={stages[2].x}
              y={stages[2].y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={active(2) ? accent : secondary}
            >
              {stages[2].label}
            </text>
            {/* 处理示意 */}
            <text
              x={stages[2].x}
              y={stages[2].y + 50}
              textAnchor="middle"
              fontSize="22"
              fill={active(2) ? accent : secondary}
            >
              ⚙️
            </text>
            <text
              x={stages[2].x}
              y={stages[2].y + 72}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              vector&lt;string&gt; words;
            </text>
            <text
              x={stages[2].x}
              y={stages[2].y + 88}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              统计·排序·过滤
            </text>
            <text
              x={stages[2].x}
              y={stages[2].y + 108}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              transform(begin,end,inserter)
            </text>
            <text
              x={stages[2].x}
              y={stages[2].y + 122}
              textAnchor="middle"
              fontSize="9"
              fill={secondary}
            >
              在内存中操作数据
            </text>
          </g>

          {/* ═══════ Step 3: 关闭文件 ═══════ */}
          <g opacity={active(3) ? 1 : 0.35}>
            <rect
              x={stages[3].x - boxW / 2}
              y={stages[3].y}
              width={boxW}
              height={boxH}
              rx="8"
              fill={active(3) ? elevated : bg}
              stroke={active(3) ? accent : border}
              strokeWidth={active(3) ? "2.5" : "1.5"}
            />
            <text
              x={stages[3].x}
              y={stages[3].y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={active(3) ? accent : secondary}
            >
              {stages[3].label}
            </text>
            {/* 关闭示意 */}
            <text
              x={stages[3].x}
              y={stages[3].y + 50}
              textAnchor="middle"
              fontSize="26"
              fill={active(3) ? accent : secondary}
            >
              ✓
            </text>
            <text
              x={stages[3].x}
              y={stages[3].y + 72}
              textAnchor="middle"
              fontSize="11"
              fill={active(3) ? primary : secondary}
              fontFamily="monospace"
            >
              file.close();
            </text>
            <text
              x={stages[3].x}
              y={stages[3].y + 92}
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              或析构函数自动关闭
            </text>
            <text
              x={stages[3].x}
              y={stages[3].y + 112}
              textAnchor="middle"
              fontSize="9"
              fill={secondary}
            >
              释放文件句柄·刷新缓冲
            </text>
            {/* 文件+锁 示意 */}
            <text
              x={stages[3].x - 50}
              y={stages[3].y + 90}
              fontSize="18"
              fill={secondary}
            >
              🔓
            </text>
          </g>

          {/* ═══════ 箭头 ═══════ */}
          {/* Step0 → Step1（上排右） */}
          <g opacity={showAll || active(0) || active(1) ? 1 : 0.3}>
            <line
              x1={stages[0].x + boxW / 2}
              y1={stages[0].y + boxH / 2}
              x2={stages[1].x - boxW / 2 - 8}
              y2={stages[1].y + boxH / 2}
              stroke={accent}
              strokeWidth="2"
              markerEnd="url(#arrowHeadA)"
            />
          </g>

          {/* Step1 → Step2（右排下） */}
          <g opacity={showAll || active(1) || active(2) ? 1 : 0.3}>
            <line
              x1={stages[1].x}
              y1={stages[1].y + boxH}
              x2={stages[1].x}
              y2={stages[2].y - 8}
              stroke={accent}
              strokeWidth="2"
              markerEnd="url(#arrowHeadA)"
            />
          </g>

          {/* Step2 → Step3（下排左） */}
          <g opacity={showAll || active(2) || active(3) ? 1 : 0.3}>
            <line
              x1={stages[2].x - boxW / 2}
              y1={stages[2].y + boxH / 2}
              x2={stages[3].x + boxW / 2 + 8}
              y2={stages[3].y + boxH / 2}
              stroke={accent}
              strokeWidth="2"
              markerEnd="url(#arrowHeadA)"
            />
          </g>

          {/* 中心文字：生命周期总览 */}
          <text
            x={w / 2}
            y={224}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={secondary}
            fontFamily="monospace"
          >
            文件流生命周期
          </text>
          <text
            x={w / 2}
            y={244}
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            打开 → 读取 → 处理 → 关闭
          </text>

          <defs>
            <marker id="arrowHeadA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        文件流从构造打开到析构关闭，中间经读取、处理两步——每一步对应不同的操作和内存状态。
        即使不写 close()，析构函数也会自动关闭文件并刷新缓冲区。
      </figcaption>
    </figure>
  );
}
