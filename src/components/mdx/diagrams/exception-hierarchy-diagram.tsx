/**
 * <ExceptionHierarchyDiagram>：C++ 标准异常类继承树图。
 *
 * 展示 exception → runtime_error / logic_error → 具体异常子类的层次结构。
 * 节点颜色区分三大类：exception（根）、logic_error 分支（程序逻辑错误）、
 * runtime_error 分支（运行时错误）、其他分支（bad_alloc 等）。
 *
 * 三列布局：左 = logic_error 分支，中 = 语言支持类，右 = runtime_error 分支。
 * 三列各自有独立 dashed 容器，互不重叠；子节点完全落在所属容器内。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

export function ExceptionHierarchyDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const blue = "rgb(99,179,237)";
  const orange = "rgb(237,137,99)";
  const green = "rgb(63,185,127)";
  const red = "rgb(229,103,92)";

  const w = 900;
  const h = 560;

  const rootX = w / 2;
  const rootY = 48;

  // ── 三列容器（dashed sections）──
  const secY = 124;
  const logicSec = { x: 15, y: secY, w: 280, h: 232 };
  const otherSec = { x: 310, y: secY, w: 280, h: 304 };
  const runtimeSec = { x: 605, y: secY, w: 280, h: 304 };

  // 分支头节点（基类）位于各列容器内上方
  const logicHeadX = logicSec.x + logicSec.w / 2; // 155
  const otherHeadX = otherSec.x + otherSec.w / 2; // 450
  const runtimeHeadX = runtimeSec.x + runtimeSec.w / 2; // 745
  const headY = secY + 30;

  // logic 子节点：容器内两列两行
  const logicColL = logicSec.x + 72; // 87
  const logicColR = logicSec.x + 208; // 223
  const logicRow = secY + 110;
  const logicChildren = [
    { name: "invalid_argument", desc: "无效参数", x: logicColL, y: logicRow, ww: 124 },
    { name: "out_of_range", desc: "越界访问", x: logicColR, y: logicRow, ww: 124 },
    { name: "length_error", desc: "长度超限", x: logicColL, y: logicRow + 60, ww: 124 },
    { name: "domain_error", desc: "定义域错误", x: logicColR, y: logicRow + 60, ww: 124 },
  ];

  // runtime 子节点：容器内单列堆叠
  const runtimeRow = secY + 110;
  const runtimeChildren = [
    { name: "range_error", desc: "范围错误", x: runtimeHeadX, y: runtimeRow, ww: 200 },
    { name: "overflow_error", desc: "上溢", x: runtimeHeadX, y: runtimeRow + 56, ww: 200 },
    { name: "underflow_error", desc: "下溢", x: runtimeHeadX, y: runtimeRow + 112, ww: 200 },
  ];

  // 语言支持类：中列单列堆叠（直接从 exception 派生）
  const otherRow = secY + 36;
  const otherChildren = [
    { name: "bad_alloc", desc: "内存分配失败", x: otherHeadX, y: otherRow, color: red, ww: 200 },
    { name: "bad_cast", desc: "dynamic_cast 失败", x: otherHeadX, y: otherRow + 52, color: red, ww: 200 },
    { name: "bad_typeid", desc: "typeid 失败", x: otherHeadX, y: otherRow + 104, color: orange, ww: 200 },
    { name: "bad_exception", desc: "异常规格违规", x: otherHeadX, y: otherRow + 156, color: orange, ww: 200 },
    { name: "bad_function_call", desc: "空 function 调用", x: otherHeadX, y: otherRow + 208, color: orange, ww: 200 },
  ];

  function drawNode(
    x: number,
    y: number,
    label: string,
    desc: string,
    nodeColor: string,
    ww = 150
  ) {
    return (
      <g key={label}>
        <rect
          x={x - ww / 2}
          y={y}
          width={ww}
          height={36}
          rx={6}
          fill={nodeColor + "15"}
          stroke={nodeColor}
          strokeWidth={1.5}
        />
        <text
          x={x}
          y={y + 15}
          fontSize={10}
          fontWeight={600}
          fill={nodeColor}
          textAnchor="middle"
          fontFamily="monospace"
        >
          {label}
        </text>
        <text x={x} y={y + 30} fontSize={9} fill={secondary} textAnchor="middle">
          {desc}
        </text>
      </g>
    );
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1} opacity={0.6} />
    );
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 标准异常类继承树：exception 为根，logic_error / runtime_error 两大分支及其子类"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <text x={w / 2} y={26} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            C++ 标准异常类继承树
          </text>

          {/* Root: exception */}
          <rect
            x={rootX - 80}
            y={rootY}
            width={160}
            height={36}
            rx={8}
            fill={accent + "18"}
            stroke={accent}
            strokeWidth={2}
          />
          <text
            x={rootX}
            y={rootY + 22}
            fontSize={12}
            fontWeight={700}
            fill={accent}
            textAnchor="middle"
            fontFamily="monospace"
          >
            exception
          </text>

          {/* Lines from root to three branch heads */}
          {drawLine(rootX - 30, rootY + 36, logicHeadX, headY, blue)}
          {drawLine(rootX, rootY + 36, otherHeadX, headY, green)}
          {drawLine(rootX + 30, rootY + 36, runtimeHeadX, headY, orange)}

          {/* ===== Logic error section (left) ===== */}
          <rect
            x={logicSec.x}
            y={logicSec.y}
            width={logicSec.w}
            height={logicSec.h}
            rx={10}
            fill={blue + "06"}
            stroke={border}
            strokeWidth={1}
            strokeDasharray="4,3"
          />
          <text x={logicSec.x + 12} y={logicSec.y + 16} fontSize={9.5} fontWeight={700} fill={blue}>
            逻辑错误——程序启动前可发现
          </text>
          {drawNode(logicHeadX, headY, "logic_error", "逻辑错误基类", blue, 160)}
          {/* connectors head → children */}
          {drawLine(logicHeadX, headY + 36, logicColL, logicRow, blue)}
          {drawLine(logicHeadX, headY + 36, logicColR, logicRow, blue)}
          {logicChildren.map((c) => drawNode(c.x, c.y, c.name, c.desc, blue, c.ww))}

          {/* ===== Other / language-support section (center) ===== */}
          <rect
            x={otherSec.x}
            y={otherSec.y}
            width={otherSec.w}
            height={otherSec.h}
            rx={10}
            fill={green + "06"}
            stroke={border}
            strokeWidth={1}
            strokeDasharray="4,3"
          />
          <text x={otherSec.x + 12} y={otherSec.y + 16} fontSize={9.5} fontWeight={700} fill={green}>
            语言支持类——直接从 exception 派生
          </text>
          {otherChildren.map((c) => drawNode(c.x, c.y, c.name, c.desc, c.color, c.ww))}

          {/* ===== Runtime error section (right) ===== */}
          <rect
            x={runtimeSec.x}
            y={runtimeSec.y}
            width={runtimeSec.w}
            height={runtimeSec.h}
            rx={10}
            fill={orange + "06"}
            stroke={border}
            strokeWidth={1}
            strokeDasharray="4,3"
          />
          <text
            x={runtimeSec.x + 12}
            y={runtimeSec.y + 16}
            fontSize={9.5}
            fontWeight={700}
            fill={orange}
          >
            运行时错误——运行后才发生
          </text>
          {drawNode(runtimeHeadX, headY, "runtime_error", "运行时错误基类", orange, 200)}
          {drawLine(runtimeHeadX, headY + 36, runtimeHeadX, runtimeRow, orange)}
          {runtimeChildren.map((c) => drawNode(c.x, c.y, c.name, c.desc, orange, c.ww))}

          {/* Custom exception note */}
          <rect
            x={100}
            y={472}
            width={700}
            height={30}
            rx={6}
            fill={green + "10"}
            stroke={green}
            strokeWidth={1}
            strokeDasharray="4,3"
          />
          <text x={450} y={491} fontSize={11} fill={green} textAnchor="middle">
            你的自定义异常应继承自 logic_error 或 runtime_error——不要直接继承 exception
          </text>

          {/* What/constructor note */}
          <text x={450} y={522} fontSize={10} fill={secondary} textAnchor="middle">
            exception 公开非虚成员函数 const char* what() const noexcept —— 返回异常描述字符串
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ 标准库异常类继承树。exception 是根类；logic_error 分支代表程序逻辑错误（可预判），
        runtime_error 分支代表运行时错误；bad_alloc / bad_cast 等语言支持异常直接从 exception 派生。
        自定义异常建议继承自 logic_error 或 runtime_error，而不是直接继承 exception。
      </figcaption>
    </figure>
  );
}
