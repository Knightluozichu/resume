/**
 * <StreamStateDiagram>：C++ 流状态机转换图。
 *
 * 展示四种流状态（good / eof / fail / bad）及其转换关系——
 * 什么操作会触发什么状态、如何检测和恢复。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色（var(--xxx)），无阴影。
 */

export function StreamStateDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const green = "var(--success)";
  const yellow = "var(--warning)";
  const red = "var(--danger)";

  // 四个状态位置（菱形排列）
  const cx = 320;
  const cy = 220;
  const r = 110;
  const boxW = 130;
  const boxH = 56;

  // 状态坐标
  const states = {
    good: { x: cx, y: cy - r, color: green, label: "good() == true", desc: "流正常·上次操作成功" },
    eof: { x: cx + r, y: cy, color: yellow, label: "eof() == true", desc: "读到文件末尾" },
    fail: { x: cx, y: cy + r, color: yellow, label: "fail() == true", desc: "格式错/类型不匹配" },
    bad: { x: cx - r, y: cy, color: red, label: "bad() == true", desc: "流崩溃·不可恢复错误" },
  };

  const w = 640;
  const h = 480;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 流状态机：四种状态 good/eof/fail/bad 及其转换关系。通过 rdstate/setstate/clear 检查和恢复状态"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ═══════════ 四状态框 ═══════════ */}

          {/* good 状态 */}
          <rect
            x={states.good.x - boxW / 2}
            y={states.good.y - boxH / 2}
            width={boxW}
            height={boxH}
            rx="8"
            fill={elevated}
            stroke={states.good.color}
            strokeWidth="2.5"
          />
          <text
            x={states.good.x}
            y={states.good.y - 8}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={states.good.color}
            fontFamily="monospace"
          >
            {states.good.label}
          </text>
          <text
            x={states.good.x}
            y={states.good.y + 14}
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            {states.good.desc}
          </text>

          {/* eof 状态 */}
          <rect
            x={states.eof.x - boxW / 2}
            y={states.eof.y - boxH / 2}
            width={boxW}
            height={boxH}
            rx="8"
            fill={elevated}
            stroke={states.eof.color}
            strokeWidth="2"
          />
          <text
            x={states.eof.x}
            y={states.eof.y - 8}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={states.eof.color}
            fontFamily="monospace"
          >
            {states.eof.label}
          </text>
          <text
            x={states.eof.x}
            y={states.eof.y + 14}
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            {states.eof.desc}
          </text>

          {/* fail 状态 */}
          <rect
            x={states.fail.x - boxW / 2}
            y={states.fail.y - boxH / 2}
            width={boxW}
            height={boxH}
            rx="8"
            fill={elevated}
            stroke={states.fail.color}
            strokeWidth="2"
          />
          <text
            x={states.fail.x}
            y={states.fail.y - 8}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={states.fail.color}
            fontFamily="monospace"
          >
            {states.fail.label}
          </text>
          <text
            x={states.fail.x}
            y={states.fail.y + 14}
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            {states.fail.desc}
          </text>

          {/* bad 状态 */}
          <rect
            x={states.bad.x - boxW / 2}
            y={states.bad.y - boxH / 2}
            width={boxW}
            height={boxH}
            rx="8"
            fill={elevated}
            stroke={states.bad.color}
            strokeWidth="2.5"
          />
          <text
            x={states.bad.x}
            y={states.bad.y - 8}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={states.bad.color}
            fontFamily="monospace"
          >
            {states.bad.label}
          </text>
          <text
            x={states.bad.x}
            y={states.bad.y + 14}
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            {states.bad.desc}
          </text>

          {/* ═══════════ 转换箭头 ═══════════ */}
          {/* good → eof */}
          <path
            d={`M${states.good.x + 40},${states.good.y + boxH / 2 + 10} Q${states.good.x + 40},${states.good.y + 60} ${states.eof.x - boxW / 2 - 10},${states.eof.y - 12}`}
            fill="none"
            stroke={states.eof.color}
            strokeWidth="1.8"
            markerEnd="url(#arrowY)"
          />
          <text x={states.good.x + 40} y={states.good.y + 68} fontSize="9" fill={secondary} textAnchor="middle">
            读到EOF
          </text>

          {/* good → fail */}
          <path
            d={`M${states.good.x - 40},${states.good.y + boxH / 2 + 10} Q${states.good.x - 40},${states.good.y + 60} ${states.fail.x - 30},${states.fail.y - boxH / 2 - 10}`}
            fill="none"
            stroke={states.fail.color}
            strokeWidth="1.8"
            markerEnd="url(#arrowY)"
          />
          <text x={states.good.x - 30} y={states.good.y + 68} fontSize="9" fill={secondary} textAnchor="middle">
            格式错
          </text>

          {/* good → bad */}
          <line
            x1={states.good.x - boxW / 2 + 10}
            y1={states.good.y - 5}
            x2={states.bad.x + boxW / 2 - 10}
            y2={states.bad.y + 5}
            stroke={states.bad.color}
            strokeWidth="1.8"
            strokeDasharray="5 3"
            markerEnd="url(#arrowR)"
          />
          <text x={states.bad.x + 30} y={states.bad.y - 20} fontSize="9" fill={secondary} textAnchor="middle">
            不可恢复错误
          </text>

          {/* eof → good：clear() 恢复 */}
          <line
            x1={states.eof.x - boxW / 2 + 10}
            y1={states.eof.y - 10}
            x2={states.good.x + boxW / 2 - 10}
            y2={states.good.y + 10}
            stroke={green}
            strokeWidth="1.8"
            strokeDasharray="4 3"
            markerEnd="url(#arrowG)"
          />
          <text x={states.eof.x - 55} y={states.eof.y - 25} fontSize="9" fill={green} textAnchor="middle">
            clear()
          </text>

          {/* fail → good：clear() 恢复 */}
          <line
            x1={states.fail.x - boxW / 2 + 10}
            y1={states.fail.y + 10}
            x2={states.good.x - boxW / 2 + 10}
            y2={states.good.y - 10}
            stroke={green}
            strokeWidth="1.8"
            strokeDasharray="4 3"
            markerEnd="url(#arrowG)"
          />
          <text x={states.fail.x - 67} y={states.fail.y + 22} fontSize="9" fill={green} textAnchor="middle">
            clear()
          </text>

          {/* ═══════════ 右边说明区域 ═══════════ */}
          <rect x={500} y={30} width={128} height={200} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />

          <text x={564} y={54} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            检测与恢复
          </text>

          {/* rdstate */}
          <text x={512} y={80} fontSize="10" fill={secondary} fontFamily="monospace">
            rdstate()
          </text>
          <text x={512} y={94} fontSize="9" fill={secondary}>
            获取当前状态位掩码
          </text>

          {/* good/fail/eof/bad */}
          <text x={512} y={116} fontSize="10" fill={secondary} fontFamily="monospace">
            good() fail()
          </text>
          <text x={512} y={130} fontSize="10" fill={secondary} fontFamily="monospace">
            eof() bad()
          </text>
          <text x={512} y={144} fontSize="9" fill={secondary}>
            逐一检查各状态标志
          </text>

          {/* clear */}
          <text x={512} y={170} fontSize="10" fill={green} fontFamily="monospace">
            clear()
          </text>
          <text x={512} y={184} fontSize="9" fill={green}>
            重置所有状态位
          </text>

          {/* setstate */}
          <text x={512} y={206} fontSize="10" fill={secondary} fontFamily="monospace">
            setstate(flag)
          </text>
          <text x={512} y={220} fontSize="9" fill={secondary}>
            手动设置某个状态位
          </text>

          {/* ═══════════ 底部图例 ═══════════ */}
          <text x={100} y={440} fontSize="11" fontWeight="700" fill={primary}>
            流状态检查口诀
          </text>
          <text x={100} y={462} fontSize="10" fill={secondary}>
            while (file &gt;&gt; word) → 每次读完后自动检查 good，读到 EOF 或出错自动停止
          </text>

          <defs>
            <marker id="arrowY" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <polygon points="0,1 5,3.5 0,6" fill={yellow} />
            </marker>
            <marker id="arrowG" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <polygon points="0,1 5,3.5 0,6" fill={green} />
            </marker>
            <marker id="arrowR" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <polygon points="0,1 5,3.5 0,6" fill={red} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ 流的四种状态：good(fail/eof/bad 都未设置)、eof(读到文件尾)、fail(格式错/数据不匹配，可恢复)、bad(流崩溃，不可恢复)。
        通过 rdstate() 检查、clear() 重置——fail 和 eof 可恢复，bad 只能放弃流。
      </figcaption>
    </figure>
  );
}
