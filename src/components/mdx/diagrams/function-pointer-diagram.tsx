/**
 * <FunctionPointerDiagram step={0|1|2|3}>：函数指针声明、赋值与调用。
 *
 * step 1: 声明函数指针类型
 * step 2: 把函数地址赋给指针
 * step 3: 通过指针调用函数
 */

type FpStep = 0 | 1 | 2 | 3;

interface Props {
  step?: FpStep;
}

export function FunctionPointerDiagram({ step = 0 }: Props) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const success = "#3FB97F";

  const isActive = (n: FpStep) => step === 0 || step === n;
  const stroke = (n: FpStep) => (isActive(n) ? accent : border);
  const fill = (n: FpStep) => (isActive(n) ? "var(--bg-elevated)" : bg);

  const captions: Record<FpStep, string> = {
    0: "按 Stepper 逐步看：函数名也是地址，可用指针保存并间接调用",
    1: "声明 pf：返回 int、接受两个 double 的函数指针",
    2: "pf = sum 或 pf = &sum；函数名在多数情况下会 decay 成地址",
    3: "(*pf)(3.0, 4.0) 或 pf(3.0, 4.0) 间接调用，与直接 sum(3,4) 等价",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="函数指针：声明、赋值地址、通过指针调用"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Step 1: declaration */}
          <rect
            x={24}
            y={24}
            width={592}
            height={72}
            rx="8"
            fill={fill(1)}
            stroke={stroke(1)}
            strokeWidth={isActive(1) ? 2.5 : 1.5}
          />
          <circle cx={44} cy={44} r="10" fill={isActive(1) ? accent : border} />
          <text x={44} y={48} textAnchor="middle" fontSize="11" fontWeight="600" fill={bg}>
            1
          </text>
          <text x={64} y={48} fontSize="12" fontWeight="600" fill={primary}>
            声明函数指针
          </text>
          <text x={64} y={72} fontSize="12" fill={primary} fontFamily="monospace">
            int (*pf)(double, double);
          </text>
          <text x={64} y={88} fontSize="10" fill={secondary}>
            pf 是指针；*pf 表示「指向的函数」；括号保证 pf 是指针而非返回 int* 的函数
          </text>

          {/* Step 2: assign */}
          <rect
            x={24}
            y={112}
            width={280}
            height={88}
            rx="8"
            fill={fill(2)}
            stroke={stroke(2)}
            strokeWidth={isActive(2) ? 2.5 : 1.5}
          />
          <circle cx={44} cy={132} r="10" fill={isActive(2) ? accent : border} />
          <text x={44} y={136} textAnchor="middle" fontSize="11" fontWeight="600" fill={bg}>
            2
          </text>
          <text x={64} y={136} fontSize="12" fontWeight="600" fill={primary}>
            赋函数地址
          </text>
          <text x={64} y={160} fontSize="12" fill={primary} fontFamily="monospace">
            pf = sum;
          </text>
          <text x={64} y={180} fontSize="11" fill={secondary} fontFamily="monospace">
            /* 或 pf = &sum; */
          </text>

          {/* function box */}
          <rect
            x={336}
            y={112}
            width={280}
            height={88}
            rx="8"
            fill={bg}
            stroke={isActive(2) ? success : border}
            strokeWidth={isActive(2) ? 2 : 1.5}
          />
          <text x={476} y={140} textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>
            sum 函数
          </text>
          <text x={476} y={164} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
            int sum(double a, double b)
          </text>
          <text x={476} y={184} textAnchor="middle" fontSize="10" fill={secondary}>
            代码区中的入口地址
          </text>

          {isActive(2) && (
            <>
              <line x1={304} y1={156} x2={332} y2={156} stroke={accent} strokeWidth="2" />
              <path d="M332 156 l-8 -4 l0 8 z" fill={accent} />
              <text x={318} y={148} textAnchor="middle" fontSize="10" fill={accent}>
                地址
              </text>
            </>
          )}

          {/* Step 3: call */}
          <rect
            x={24}
            y={216}
            width={592}
            height={72}
            rx="8"
            fill={fill(3)}
            stroke={stroke(3)}
            strokeWidth={isActive(3) ? 2.5 : 1.5}
          />
          <circle cx={44} cy={236} r="10" fill={isActive(3) ? accent : border} />
          <text x={44} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={bg}>
            3
          </text>
          <text x={64} y={240} fontSize="12" fontWeight="600" fill={primary}>
            通过指针调用
          </text>
          <text x={64} y={264} fontSize="12" fill={primary} fontFamily="monospace">
            result = (*pf)(3.0, 4.0); /* 或 pf(3.0, 4.0); → 7 */
          </text>
          <text x={64} y={280} fontSize="10" fill={secondary}>
            间接调用：CPU 跳转到 pf 保存的地址执行
          </text>

          <text x={320} y={308} textAnchor="middle" fontSize="12" fill={step === 0 ? secondary : primary}>
            {captions[step]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        函数指针保存函数的入口地址；声明语法中括号不可省，否则 * 会绑定到返回类型上。
      </figcaption>
    </figure>
  );
}
