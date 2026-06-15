/**
 * <NamespaceNestingDiagram step={1|2|3}>：C++ 命名空间嵌套与 using 声明的影响范围图。
 *
 * Step 1: 定义嵌套命名空间——展示 outer::middle::inner 三层嵌套结构
 * Step 2: using 声明——展示 using 声明把名字导入当前作用域的影响范围
 * Step 3: using namespace 指令——展示 using namespace 将整个命名空间名字提升到最近外层作用域
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface NamespaceNestingDiagramProps {
  step?: 1 | 2 | 3;
}

export function NamespaceNestingDiagram({ step = 1 }: NamespaceNestingDiagramProps) {
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

  const w = 820;
  const h = 520;

  // Layout coordinates
  const outerRt = { x: 480, y: 112, w: 320, h: 160 };
  const midRt = { x: 520, y: 160, w: 260, h: 100 };
  const innerRt = { x: 560, y: 200, w: 200, h: 48 };

  const mainRt = { x: 30, y: 112, w: 400, h: 160 };
  const funcRt = { x: 70, y: 160, w: 340, h: 100 };

  // Step indicator
  const steps = [
    "① 嵌套命名空间——outer::middle::inner 三层逐级嵌套",
    "② using 声明——只导入一个名字到当前作用域",
    '③ using namespace 指令——整个命名空间的名字提升一级',
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 命名空间嵌套与 using 声明影响范围图——展示三层命名空间嵌套结构和 using/using namespace 的区别"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={w / 2} y={24} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            命名空间嵌套与可见性
          </text>

          {/* ===== Left side: main / func scope ===== */}
          <rect x={mainRt.x} y={mainRt.y} width={mainRt.w} height={mainRt.h} rx={8} fill={elevated} stroke={border} strokeWidth={1} />
          <text x={mainRt.x + 16} y={mainRt.y + 22} fontSize={11} fontWeight={600} fill={primary} fontFamily="monospace">
            main() 函数作用域
          </text>

          <rect x={funcRt.x} y={funcRt.y} width={funcRt.w} height={funcRt.h} rx={6} fill={bg} stroke={border} strokeWidth={1} />
          <text x={funcRt.x + 16} y={funcRt.y + 22} fontSize={10} fill={secondary} fontFamily="monospace">
            inner_func() 作用域
          </text>

          {/* ===== Right side: namespace nesting ===== */}
          <rect x={outerRt.x} y={outerRt.y} width={outerRt.w} height={outerRt.h} rx={8} fill={elevated} stroke={accent} strokeWidth={1.5} />
          <text x={outerRt.x + 16} y={outerRt.y + 22} fontSize={11} fontWeight={600} fill={accent} fontFamily="monospace">
            namespace outer {'{'}
          </text>

          <rect x={midRt.x} y={midRt.y} width={midRt.w} height={midRt.h} rx={6} fill={bg} stroke={blue} strokeWidth={1} />
          <text x={midRt.x + 16} y={midRt.y + 18} fontSize={10} fill={blue} fontFamily="monospace">
            namespace middle {'{'}
          </text>

          <rect x={innerRt.x} y={innerRt.y} width={innerRt.w} height={64} rx={4} fill={elevated} stroke={orange} strokeWidth={1} />
          <text x={innerRt.x + 16} y={innerRt.y + 18} fontSize={10} fill={orange} fontFamily="monospace">
            namespace inner {'{'}
          </text>
          <text x={innerRt.x + 16} y={innerRt.y + 48} fontSize={10} fill={primary} fontFamily="monospace">
            int value = 42;
          </text>

          {/* Step 1: basic nesting explanation */}
          {step === 1 && (
            <>
              <text x={outerRt.x + 16} y={outerRt.y + 148} fontSize={10} fill={secondary} fontFamily="monospace">
                {'}'}
              </text>
              <text x={midRt.x + 16} y={midRt.y + 90} fontSize={10} fill={secondary} fontFamily="monospace">
                {'}'}
              </text>
              <text x={innerRt.x + 16} y={innerRt.y + 60} fontSize={10} fill={secondary} fontFamily="monospace">
                {'}'}
              </text>

              {/* full access path */}
              <text x={mainRt.x + 16} y={funcRt.y + 78} fontSize={10} fill={green} fontFamily="monospace">
                outer::middle::inner::value  // 完整路径
              </text>

              {/* Step explanation */}
              <g transform={`translate(30, ${h - 140})`}>
                <rect x={0} y={0} width={w - 60} height={110} rx={8} fill={accent + "08"} stroke={border} strokeWidth={1} />
                <text x={16} y={24} fontSize={12} fontWeight={600} fill={accent}>
                  嵌套命名空间（C++17 简化写法）
                </text>
                <text x={16} y={46} fontSize={10} fill={primary} fontFamily="monospace">
                  namespace outer::middle::inner {'{'} int value = 42; {'}'}
                  {' '}
                </text>
                <text x={16} y={66} fontSize={10} fill={secondary}>
                  C++17 起可以用 :: 一行写出嵌套命名空间——等价于三层嵌套花括号。
                </text>
                <text x={16} y={86} fontSize={10} fill={blue}>
                  完整路径 outer::middle::inner::value 可以精确访问每一层中的名字，绝无歧义。
                </text>
              </g>
            </>
          )}

          {/* Step 2: using declaration */}
          {step === 2 && (
            <>
              {/* using declaration visual */}
              <rect x={innerRt.x} y={innerRt.y + 50} width={200} height={12} fill={green + "30"} rx={3} />
              <text x={innerRt.x + 100} y={innerRt.y + 61} fontSize={9} fill={green} textAnchor="middle" fontFamily="monospace">
                using outer::middle::inner::value;
              </text>

              {/* Arrow from namespace to using decl in func scope */}
              <path
                d={`M ${innerRt.x - 20} ${innerRt.y + 24} Q ${innerRt.x - 60} ${innerRt.y + 24}, ${innerRt.x - 60} ${funcRt.y + 60} Q ${innerRt.x - 60} ${funcRt.y + 80}, ${innerRt.x - 50} ${funcRt.y + 80}`}
                fill="none"
                stroke={green}
                strokeWidth={1.5}
                strokeDasharray="4,3"
              />

              <text x={funcRt.x + 16} y={funcRt.y + 78} fontSize={10} fill={green} fontFamily="monospace">
                value  ✓ 可用（imported）
              </text>

              {/* Step explanation */}
              <g transform={`translate(30, ${h - 160})`}>
                <rect x={0} y={0} width={w - 60} height={130} rx={8} fill={green + "06"} stroke={green} strokeWidth={1} />
                <text x={16} y={24} fontSize={12} fontWeight={600} fill={green}>
                  using 声明——只把「一个名字」导入当前作用域
                </text>
                <text x={16} y={48} fontSize={10} fill={primary} fontFamily="monospace">
                  {'void inner_func() {'}
                </text>
                <text x={16} y={66} fontSize={10} fill={green} fontFamily="monospace">
                  {'    using outer::middle::inner::value;  // 只导入 value 这一个名字'}
                </text>
                <text x={16} y={84} fontSize={10} fill={primary} fontFamily="monospace">
                  {'    std::cout << value;  // OK——value 已经像本地变量一样可用'}
                </text>
                <text x={16} y={102} fontSize={10} fill={primary} fontFamily="monospace">
                  {'}'}
                </text>
                <text x={16} y={120} fontSize={9} fill={secondary}>
                  using 声明只导入一个名字，不会把整个命名空间拖进来。如果名字冲突，编译期报错。
                </text>
              </g>
            </>
          )}

          {/* Step 3: using namespace directive */}
          {step === 3 && (
            <>
              {/* using namespace directive visual */}
              <rect x={innerRt.x} y={innerRt.y + 50} width={200} height={12} fill={orange + "30"} rx={3} />
              <text x={innerRt.x + 100} y={innerRt.y + 61} fontSize={9} fill={orange} textAnchor="middle" fontFamily="monospace">
                using namespace outer::middle::inner;
              </text>

              {/* Arrow from namespace to using namespace in func scope */}
              <path
                d={`M ${innerRt.x - 20} ${innerRt.y + 24} Q ${innerRt.x - 60} ${innerRt.y + 24}, ${innerRt.x - 60} ${funcRt.y + 50} Q ${innerRt.x - 60} ${funcRt.y + 80}, ${innerRt.x - 50} ${funcRt.y + 80}`}
                fill="none"
                stroke={orange}
                strokeWidth={1.5}
                strokeDasharray="4,3"
              />

              <text x={funcRt.x + 16} y={funcRt.y + 78} fontSize={10} fill={orange} fontFamily="monospace">
                inner 所有名字 ✓ 可用
              </text>

              {/* Step explanation */}
              <g transform={`translate(30, ${h - 175})`}>
                <rect x={0} y={0} width={w - 60} height={145} rx={8} fill={orange + "06"} stroke={orange} strokeWidth={1} />
                <text x={16} y={24} fontSize={12} fontWeight={600} fill={orange}>
                  using namespace 指令——整个命名空间的名字提升到「最近外层作用域」
                </text>
                <text x={16} y={48} fontSize={10} fill={primary} fontFamily="monospace">
                  {'void inner_func() {'}
                </text>
                <text x={16} y={66} fontSize={10} fill={orange} fontFamily="monospace">
                  {'    using namespace outer::middle::inner;  // inner 里所有名字都可见'}
                </text>
                <text x={16} y={84} fontSize={10} fill={primary} fontFamily="monospace">
                  {'    std::cout << value;  // OK——value 来自 inner'}
                </text>
                <text x={16} y={102} fontSize={10} fill={primary} fontFamily="monospace">
                  {'}'}
                </text>

                {/* Warning about ambiguity */}
                <rect x={16} y={112} width={w - 92} height={24} rx={4} fill={red + "12"} stroke={red} strokeWidth={0.5} />
                <text x={w / 2 - 46} y={130} fontSize={9} fill={red} textAnchor="middle">
                  ⚠ using namespace 可能引入名字冲突——如果有多个命名空间定义了同名 value，编译期会产生歧义错误
                </text>
              </g>
            </>
          )}

          {/* Step indicator bar at bottom */}
          <rect x={w / 2 - 200} y={h - 26} width={400} height={20} rx={6} fill={accent + "06"} stroke={border} strokeWidth={0.5} />
          <text x={w / 2} y={h - 10} fontSize={10} fill={accent} textAnchor="middle" fontFamily="monospace">
            {steps[step - 1]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 &&
          "第一步：C++17 起可用 A::B::C 语法一行写出嵌套命名空间——内层名字可以通过完整路径精确访问。"}
        {step === 2 &&
          "第二步：using 声明（如 using A::B::x）只把 x 一个名字导入当前作用域，精确且安全。"}
        {step === 3 &&
          "第三步：using namespace 指令（如 using namespace A::B）把 B 中所有名字提升到最近外层作用域——范围大但可能引入名字冲突。"}
      </figcaption>
    </figure>
  );
}
