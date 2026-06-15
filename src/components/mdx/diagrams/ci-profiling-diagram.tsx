/**
 * <CIProfilingDiagram step={0|1|2|3|4}>：CI Profiling 自动化流水线五步。
 *
 * CI 触发 → Development Build → 安装录制 → 导出对比 → Pass/Fail
 * step prop 控制高亮阶段：0=全览，1-4=对应阶段高亮 accent 色。
 */

type PipelineStep = 0 | 1 | 2 | 3 | 4;

interface Props {
  step?: PipelineStep;
}

export function CIProfilingDiagram({ step }: Props) {
  const stages = [
    {
      label: "CI 触发",
      sub: "PR / Commit",
      detail: "代码变更\n触发流水线",
      x: 16,
      w: 108,
    },
    {
      label: "构建",
      sub: "Dev Build",
      detail: "Unity 构建\nDevelopment",
      x: 142,
      w: 108,
    },
    {
      label: "录制",
      sub: "安装到设备",
      detail: "自动进场景\n采集 .raw",
      x: 268,
      w: 108,
    },
    {
      label: "对比",
      sub: "统计分析",
      detail: "导出 CSV\n阈值判定",
      x: 394,
      w: 108,
    },
    {
      label: "门禁",
      sub: "Pass / Fail",
      detail: "Pass 放行\nFail 阻止",
      x: 520,
      w: 108,
    },
  ];

  const isActive = (idx: number) => step === undefined || step === idx;
  const boxStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");
  const boxBg = (idx: number) => (isActive(idx) ? "var(--bg-elevated)" : "var(--bg)");
  const textFill = (idx: number) => (isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)");
  const arrowStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");

  const bottomHints: Record<number, string> = {
    0: "第 ① 步：每次 PR 提交代码变更自动触发 CI 性能流水线",
    1: "第 ② 步：Unity batchmode 构建 Development Build APK（含 Profiler 录制能力）",
    2: "第 ③ 步：ADB 安装到真机，自动化测试脚本进目标场景录制 Profiler 数据",
    3: "第 ④ 步：导出 CSV 帧耗时数据，计算均值/P95 并与基线作统计对比",
    4: "第 ⑤ 步：未超标 = Pass 放行合并；超标 = Fail 阻止合入并上传报告",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 660 220"
          role="img"
          aria-label="CI Profiling 自动化流水线：CI 触发 → 构建 Dev Build → 安装录制 → 导出对比 → Pass/Fail 门禁"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* Five pipeline stages */}
          {stages.map((s, i) => (
            <g key={s.label}>
              <rect
                x={s.x}
                y="36"
                width={s.w}
                height="94"
                rx="8"
                fill={boxBg(i)}
                stroke={boxStroke(i)}
                strokeWidth={isActive(i) ? 2.5 : 1.5}
              />
              <circle
                cx={s.x + 14}
                cy="56"
                r="10"
                fill={isActive(i) ? "var(--accent)" : "var(--border)"}
              />
              <text x={s.x + 14} y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--bg)">
                {i + 1}
              </text>
              <text
                x={s.x + s.w / 2 + 6}
                y="58"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill={textFill(i)}
              >
                {s.label}
              </text>
              <text
                x={s.x + s.w / 2}
                y="76"
                textAnchor="middle"
                fontSize="11"
                fill={textFill(i)}
              >
                {s.sub}
              </text>
              <text x={s.x + s.w / 2} y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                {s.detail.split("\n")[0]}
              </text>
              <text x={s.x + s.w / 2} y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                {s.detail.split("\n")[1]}
              </text>

              {i < stages.length - 1 && (
                <>
                  <line
                    x1={s.x + s.w + 4}
                    y1="82"
                    x2={s.x + s.w + 16}
                    y2="82"
                    stroke={arrowStroke(i)}
                    strokeWidth="2"
                  />
                  <path d={`M${s.x + s.w + 16} 82 l-8 -4 l0 8 z`} fill={arrowStroke(i)} />
                </>
              )}
            </g>
          ))}

          {/* Bottom: Pass vs Fail */}
          <text x="330" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            判定结果
          </text>

          {/* Pass box */}
          <rect x="130" y="168" width="160" height="32" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="210" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">
            ✓ Pass
          </text>
          <text x="210" y="195" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            四指标全在阈值内 → 合并放行
          </text>

          {/* Fail box */}
          <rect x="370" y="168" width="160" height="32" rx="6" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="450" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">
            ✗ Fail
          </text>
          <text x="450" y="195" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            超标 → 阻止合入 + 上传报告
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        CI Profiling 把「人工跑一次看看」变成「每次 PR 自动跑、超标自动拦」——永久的性能防火墙。
      </figcaption>
    </figure>
  );
}
