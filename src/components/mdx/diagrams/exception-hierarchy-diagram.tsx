/**
 * <ExceptionHierarchyDiagram>：C++ 标准异常类继承树图。
 *
 * 展示 exception → runtime_error / logic_error → 具体异常子类的层次结构。
 * 节点颜色区分三大类：exception（根）、logic_error 分支（程序逻辑错误）、
 * runtime_error 分支（运行时错误）、其他分支（bad_alloc 等）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

export function ExceptionHierarchyDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const blue = "rgb(99,179,237)";
  const orange = "rgb(237,137,99)";
  const green = "rgb(63,185,127)";
  const red = "rgb(229,103,92)";

  const w = 900;
  const h = 550;

  const rootX = w / 2;
  const rootY = 50;

  // Logic errors branch (left)
  const logicX = 240;
  const logicY = 130;

  // Runtime errors branch (right)
  const runtimeX = 650;
  const runtimeY = 130;

  // Other branch (middle-right)
  const otherX = 450;
  const otherY = 130;

  // Logic error children
  const logicChildren = [
    { name: "invalid_argument", desc: "无效参数", x: 80, y: 220 },
    { name: "out_of_range", desc: "越界访问", x: 80, y: 280 },
    { name: "length_error", desc: "长度超限", x: 240, y: 220 },
    { name: "domain_error", desc: "定义域错误", x: 240, y: 280 },
  ];

  // Runtime error children
  const runtimeChildren = [
    { name: "runtime_error", desc: "运行时错误基类", x: 650, y: 220 },
    { name: "range_error", desc: "范围错误", x: 540, y: 300 },
    { name: "overflow_error", desc: "上溢", x: 650, y: 300 },
    { name: "underflow_error", desc: "下溢", x: 760, y: 300 },
  ];

  // Other children (direct from exception)
  const otherChildren = [
    { name: "bad_alloc", desc: "内存分配失败", x: 370, y: 220, color: red },
    { name: "bad_cast", desc: "dynamic_cast失败", x: 530, y: 220, color: red },
    { name: "bad_typeid", desc: "typeid 失败", x: 450, y: 280, color: orange },
    { name: "bad_exception", desc: "异常规格违规", x: 450, y: 340, color: orange },
    { name: "bad_function_call", desc: "空function调用", x: 450, y: 400, color: orange },
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
        <text
          x={x}
          y={y + 30}
          fontSize={9}
          fill={secondary}
          textAnchor="middle"
        >
          {desc}
        </text>
      </g>
    );
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1}
        opacity={0.6}
      />
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
          <text x={w / 2} y={24} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
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

          {/* Lines from root to three branches */}
          {drawLine(rootX - 30, rootY + 36, logicX, logicY, accent)}
          {drawLine(rootX + 30, rootY + 36, runtimeX, runtimeY, accent)}
          {drawLine(rootX, rootY + 36, otherX, otherY, accent)}

          {/* Branch labels */}
          <text x={logicX - 60} y={rootY + 60} fontSize={11} fontWeight={600} fill={blue} textAnchor="middle" fontFamily="monospace">
            logic_error
          </text>
          <text x={runtimeX + 60} y={rootY + 60} fontSize={11} fontWeight={600} fill={orange} textAnchor="middle" fontFamily="monospace">
            runtime_error
          </text>
          <text x={otherX} y={rootY + 60} fontSize={11} fontWeight={600} fill={green} textAnchor="middle" fontFamily="monospace">
            语言支持类
          </text>

          {/* Logic error section */}
          <rect x={20} y={rootY + 72} width={400} height={260} rx={10} fill={blue + "06"} stroke={border} strokeWidth={1} strokeDasharray="4,3" />
          <text x={40} y={rootY + 88} fontSize={10} fontWeight={700} fill={blue}>
            逻辑错误——程序启动前就能发现的错误
          </text>
          {drawNode(logicX, logicY, "logic_error", "逻辑错误基类", blue)}
          {drawLine(logicX, logicY + 36, logicX, logicY + 52, blue)}
          <rect x={logicX - 4} y={logicY + 52} width={8} height={8} fill={blue} opacity={0.3} />
          {drawLine(logicX, logicY + 60, 160, 220, blue)}
          {drawLine(logicX, logicY + 60, 320, 220, blue)}
          {drawLine(160, logicY + 60, 160, 220, blue)}
          {drawLine(320, logicY + 60, 320, 220, blue)}

          {drawNode(logicChildren[0].x, logicChildren[0].y, logicChildren[0].name, logicChildren[0].desc, blue, 140)}
          {drawNode(logicChildren[1].x, logicChildren[1].y, logicChildren[1].name, logicChildren[1].desc, blue, 110)}
          {drawNode(logicChildren[2].x, logicChildren[2].y, logicChildren[2].name, logicChildren[2].desc, blue)}
          {drawNode(logicChildren[3].x, logicChildren[3].y, logicChildren[3].name, logicChildren[3].desc, blue, 120)}
          {drawLine(160, 256, 160, 280, blue)}
          {drawLine(160, 256, 240, 220, blue)}
          {drawLine(240, 256, 240, 280, blue)}
          {drawLine(320, 256, 240, 220, blue)}
          {drawLine(320, 256, 320, 280, blue)}

          {/* Runtime error section */}
          <rect x={480} y={rootY + 72} width={400} height={340} rx={10} fill={orange + "06"} stroke={border} strokeWidth={1} strokeDasharray="4,3" />
          <text x={500} y={rootY + 88} fontSize={10} fontWeight={700} fill={orange}>
            运行时错误——程序运行后才会发生的错误
          </text>
          {drawNode(runtimeX, logicY, "runtime_error", "运行时错误基类", orange)}
          {drawLine(runtimeX, logicY + 36, runtimeX, logicY + 52, orange)}
          <rect x={runtimeX - 4} y={logicY + 52} width={8} height={8} fill={orange} opacity={0.3} />
          {drawLine(runtimeX, logicY + 60, runtimeX, 220, orange)}
          {drawNode(runtimeChildren[0].x, runtimeChildren[0].y, runtimeChildren[0].name, runtimeChildren[0].desc, orange)}
          {drawLine(runtimeX, 256, 540, 300, orange)}
          {drawLine(runtimeX, 256, runtimeX, 300, orange)}
          {drawLine(runtimeX, 256, 760, 300, orange)}
          {drawNode(runtimeChildren[1].x, runtimeChildren[1].y, runtimeChildren[1].name, runtimeChildren[1].desc, orange, 110)}
          {drawNode(runtimeChildren[2].x, runtimeChildren[2].y, runtimeChildren[2].name, runtimeChildren[2].desc, orange, 130)}
          {drawNode(runtimeChildren[3].x, runtimeChildren[3].y, runtimeChildren[3].name, runtimeChildren[3].desc, orange, 140)}

          {/* Other branches from exception */}
          {drawLine(otherX, otherY, otherChildren[0].x, otherChildren[0].y, red)}
          {drawLine(otherX, otherY, otherChildren[1].x, otherChildren[1].y, red)}
          {drawLine(otherX, otherY, otherChildren[2].x, otherChildren[2].y, orange)}
          {drawLine(otherX, otherY, otherChildren[3].x, otherChildren[3].y, orange)}
          {drawLine(otherX, otherY, otherChildren[4].x, otherChildren[4].y, orange)}
          {drawNode(otherChildren[0].x, otherChildren[0].y, otherChildren[0].name, otherChildren[0].desc, red, 160)}
          {drawNode(otherChildren[1].x, otherChildren[1].y, otherChildren[1].name, otherChildren[1].desc, red, 160)}
          {drawNode(otherChildren[2].x, otherChildren[2].y, otherChildren[2].name, otherChildren[2].desc, orange, 130)}
          {drawNode(otherChildren[3].x, otherChildren[3].y, otherChildren[3].name, otherChildren[3].desc, orange, 140)}
          {drawNode(otherChildren[4].x, otherChildren[4].y, otherChildren[4].name, otherChildren[4].desc, orange, 160)}

          {/* Custom exception note */}
          <rect x={100} y={455} width={700} height={32} rx={6} fill={green + "10"} stroke={green} strokeWidth={1} strokeDasharray="4,3" />
          <text x={450} y={476} fontSize={11} fill={green} textAnchor="middle">
            你的自定义异常应继承自 logic_error 或 runtime_error——不要直接继承 exception
          </text>

          {/* What/constructor note */}
          <text x={450} y={505} fontSize={10} fill={secondary} textAnchor="middle">
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
