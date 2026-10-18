"use client";

import { useId, useState } from "react";

// Semantic colors follow the site's dark surfaces; geometry never encodes duration.
const C = {
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

export type TestingConfig = {
  order: "A-first" | "B-first";
  isolation: "isolated" | "shared-locked";
  behavior: "run" | "skip";
  boundary: "recorder" | "server";
  dependency: "found" | "missing" | "error";
  timing: "exclude-setup" | "include-setup";
};
export const initialTestingConfig: TestingConfig = {
  order: "A-first",
  isolation: "isolated",
  behavior: "run",
  boundary: "recorder",
  dependency: "found",
  timing: "exclude-setup",
};
export function deriveTestingState(c: TestingConfig, frame: number) {
  const aDone = frame >= (c.order === "A-first" ? 3 : 4);
  const bDone = frame >= (c.order === "B-first" ? 3 : 4);
  const bFails = c.isolation === "shared-locked" && c.order === "A-first";
  const bResult = !bDone
    ? "等待"
    : c.behavior === "skip"
      ? "SKIP"
      : bFails
        ? "FAIL"
        : "PASS";
  const pass = Number(aDone) + Number(bDone && bResult === "PASS");
  return {
    aDone,
    bDone,
    bResult,
    pass,
    fail: Number(bDone && bResult === "FAIL"),
    skip: Number(bDone && bResult === "SKIP"),
    aValue: Number(aDone),
    bValue: c.isolation === "shared-locked" ? Number(aDone) : 0,
    bObserved: bDone && c.behavior === "run" ? Number(bFails) : null,
    status:
      c.dependency === "found" ? 200 : c.dependency === "missing" ? 404 : 503,
    body:
      c.dependency === "found"
        ? "Go tests"
        : c.dependency === "missing"
          ? "missing"
          : "unavailable",
    httpDone: frame >= 4,
  };
}
const steps = [
  "注册测试",
  "A / B 在 Parallel 暂停",
  "父函数返回，打开运行门",
  "第一项执行",
  "第二项执行 / HTTP 返回",
  "汇总观察边界",
];
const choiceGroups: {
  key: keyof TestingConfig;
  title: string;
  options: [string, string][];
}[] = [
  {
    key: "order",
    title: "合法执行次序",
    options: [
      ["A-first", "A 先执行"],
      ["B-first", "B 先执行"],
    ],
  },
  {
    key: "isolation",
    title: "计数器归属",
    options: [
      ["isolated", "每项独立"],
      ["shared-locked", "共享但加锁"],
    ],
  },
  {
    key: "behavior",
    title: "B 的执行策略",
    options: [
      ["run", "执行断言"],
      ["skip", "主动 Skip"],
    ],
  },
  {
    key: "boundary",
    title: "HTTP 观察边界",
    options: [
      ["recorder", "Recorder 直调"],
      ["server", "Server 经网络"],
    ],
  },
  {
    key: "dependency",
    title: "Lookup 替身结果",
    options: [
      ["found", "找到标题"],
      ["missing", "不存在"],
      ["error", "内部错误"],
    ],
  },
  {
    key: "timing",
    title: "基准计时边界",
    options: [
      ["exclude-setup", "排除准备"],
      ["include-setup", "每轮含准备"],
    ],
  },
];
const svgStyle = {
  width: "100%",
  maxWidth: 360,
  display: "block",
  margin: "0 auto",
  fontSize: 16,
};
function Box({
  x = 10,
  y,
  width = 260,
  text,
  active = false,
}: {
  x?: number;
  y: number;
  width?: number;
  text: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={38}
        rx={6}
        fill={C.elevated}
        stroke={active ? C.accent : C.secondary}
      />
      <text x={x + width / 2} y={y + 24} textAnchor="middle" fill={C.primary}>
        {text}
      </text>
    </g>
  );
}
function Arrow({ y, label }: { y: number; label?: string }) {
  return (
    <g>
      <path
        d={`M140 ${y} v20 m-5 -5 l5 5 l5 -5`}
        fill="none"
        stroke={C.secondary}
        strokeWidth={2}
      />
      {label && (
        <text x={152} y={y + 16} fill={C.secondary}>
          {label}
        </text>
      )}
    </g>
  );
}
export function TestingDiagrams({
  config: c,
  frame,
}: {
  config: TestingConfig;
  frame: number;
}) {
  const s = deriveTestingState(c, frame);
  return (
    <div
      className="grid min-w-0 gap-5 xl:grid-cols-3"
      data-testid="testing-diagrams"
    >
      <figure className="m-0 min-w-0 rounded-xl border p-2">
        <figcaption className="mb-2 font-semibold">
          ① 暂停门 → 状态归属 → 断言
        </figcaption>
        <svg
          viewBox="0 0 280 410"
          style={svgStyle}
          role="img"
          aria-label={`并行调度：${steps[frame]}；A ${s.aDone ? "PASS" : "等待"}；B ${s.bResult}`}
        >
          <Box y={5} text="parent 注册 A、B" active={frame === 0} />
          <path
            d="M140 43 v10 H70 v12 M140 53 H210 v12"
            stroke={C.secondary}
            fill="none"
          />
          <Box
            x={10}
            y={65}
            width={120}
            text="A: Parallel"
            active={frame === 1}
          />
          <Box
            x={150}
            y={65}
            width={120}
            text="B: Parallel"
            active={frame === 1}
          />
          <path
            d="M70 103 v22 M210 103 v22"
            stroke={C.secondary}
            strokeDasharray="4 3"
          />
          <path
            d="M10 125 H270"
            stroke={frame >= 2 ? C.success : C.warning}
            strokeWidth={3}
          />
          <text x={140} y={147} textAnchor="middle" fill={C.primary}>
            {frame >= 2 ? "父返回：门已打开" : "父未返回：子测试等待"}
          </text>
          <Box
            y={160}
            text={c.order === "A-first" ? "A 增加 → B 检查" : "B 检查 → A 增加"}
            active={frame === 3 || frame === 4}
          />
          <Arrow y={198} />
          {c.isolation === "isolated" ? (
            <>
              <Box x={10} y={224} width={120} text={`A 独立值 ${s.aValue}`} />
              <Box x={150} y={224} width={120} text={`B 独立值 ${s.bValue}`} />
            </>
          ) : (
            <Box y={224} text={`A、B → 同一锁保护值 ${s.bValue}`} />
          )}
          <Arrow y={262} />
          <Box
            y={288}
            text={
              s.bObserved === null
                ? "B 尚无断言读数"
                : `B 执行时读到 ${s.bObserved}，期望 0`
            }
          />
          <text x={140} y={352} textAnchor="middle" fill={C.primary}>
            A: {s.aDone ? "PASS" : "等待"} / B: {s.bResult}
          </text>
          <text x={140} y={384} textAnchor="middle" fill={C.primary}>
            PASS {s.pass} · FAIL {s.fail} · SKIP {s.skip}
          </text>
        </svg>
        <p className="text-sm">
          A 总是增加自身可访问的计数器；B
          检查零。共享状态即使加锁，也可能顺序敏感。图中仅枚举两个合法串行交错，不预测
          Go 调度，不模拟数据竞态。
        </p>
      </figure>
      <figure className="m-0 min-w-0 rounded-xl border p-2">
        <figcaption className="mb-2 font-semibold">
          ② 请求路径 → 注入结果 → 响应
        </figcaption>
        <svg
          viewBox="0 0 280 410"
          style={svgStyle}
          role="img"
          aria-label={`HTTP ${c.boundary} 管线；Lookup ${c.dependency}；${s.httpDone ? s.status : "响应等待"}`}
        >
          <Box
            y={5}
            text={
              c.boundary === "server"
                ? "client.Get /?id=7"
                : "NewRequest GET /?id=7"
            }
            active={frame === 0}
          />
          {c.boundary === "server" ? (
            <g data-testid="http-network-path">
              <rect
                x={4}
                y={60}
                width={272}
                height={56}
                rx={8}
                fill={C.elevated}
                stroke={C.success}
                strokeDasharray="4 3"
              />
              <Arrow y={43} />
              <Box y={69} text="HTTP → 本地 listener" active={frame === 1} />
              <Arrow y={107} />
            </g>
          ) : (
            <g data-testid="http-direct-path">
              <path
                d="M30 43 V121 H140 V133 m-5 -5 l5 5 l5 -5"
                fill="none"
                stroke={C.accent}
                strokeWidth={3}
              />
              <text x={152} y={80} textAnchor="middle" fill={C.primary}>
                直接 ServeHTTP（无网络）
              </text>
              <text x={152} y={103} textAnchor="middle" fill={C.primary}>
                绕过 transport / listener
              </text>
            </g>
          )}
          <Box y={133} text="handler → find(ctx, id)" active={frame === 2} />
          <path
            d="M140 171 v20 M135 186 l5 5 l5 -5"
            fill="none"
            stroke={C.secondary}
            strokeWidth={2}
          />
          <Box
            y={197}
            text={`注入 Lookup：${c.dependency}`}
            active={frame === 3}
          />
          <Arrow y={235} label="返回值 / error" />
          <Box
            y={261}
            text={
              s.httpDone
                ? `状态 ${s.status} · ${s.body}`
                : "handler 等待依赖结果"
            }
            active={frame === 4}
          />
          <Arrow y={299} />
          <Box
            y={325}
            text={
              c.boundary === "server"
                ? "client 读取 HTTP response"
                : "Recorder.Result()"
            }
            active={frame === 5}
          />
          <text x={140} y={391} textAnchor="middle" fill={C.primary}>
            真实数据库：不在此证明范围
          </text>
        </svg>
        <p className="text-sm">
          这是请求路径模型，不在浏览器里运行 Go。切换 Server 会纳入本地 HTTP
          传输，但仍调用同一个替身；内部错误映射 503，不泄露错误正文。
        </p>
      </figure>
      <figure className="m-0 min-w-0 rounded-xl border p-2">
        <figcaption className="mb-2 font-semibold">
          ③ 准备位置 → 循环 → 计时范围
        </figcaption>
        <svg
          viewBox="0 0 280 410"
          style={svgStyle}
          role="img"
          aria-label={`基准计时：${c.timing === "exclude-setup" ? "准备在计时外" : "每轮准备在计时内"}；图形长度不是时间`}
        >
          <rect
            x={4}
            y={c.timing === "exclude-setup" ? 164 : 77}
            width={272}
            height={c.timing === "exclude-setup" ? 140 : 227}
            rx={10}
            fill={C.elevated}
            stroke={C.success}
            strokeWidth={2}
          />
          <Box
            y={5}
            text={
              c.timing === "exclude-setup"
                ? "准备 input（一次）"
                : "进入 benchmark"
            }
            active={frame === 0}
          />
          <Arrow y={43} />
          <Box
            y={86}
            text={
              c.timing === "exclude-setup"
                ? "ResetTimer：清除准备计时"
                : "开始 b.N 次循环"
            }
            active={frame === 1}
          />
          <Arrow y={124} />
          <Box
            y={171}
            text={
              c.timing === "exclude-setup"
                ? "开始 b.N 次循环"
                : "每轮重新构造 input"
            }
            active={frame === 2}
          />
          <Arrow y={209} />
          <Box y={249} text="Normalize(input) → sink" active={frame === 3} />
          <path
            d="M270 268 v-81 h-12"
            fill="none"
            stroke={C.success}
            strokeWidth={2}
          />
          <text x={140} y={328} textAnchor="middle" fill={C.primary}>
            绿色区域 = 计时工作边界
          </text>
          <Box y={346} text="报告 ns/op、B/op、allocs/op" active={frame >= 4} />
          <text x={140} y={405} textAnchor="middle" fill={C.primary}>
            图形长度 ≠ 耗时；无模拟数字
          </text>
        </svg>
        <p className="text-sm">
          排除准备测的是核心操作，包含准备测的是组合成本。真实本机结果在 Go
          日志中；一次短基准不是生产吞吐、统计结论或性能承诺。
        </p>
      </figure>
    </div>
  );
}
export function GwpTestingLab() {
  const id = useId();
  const [config, setConfig] = useState<TestingConfig>({
    ...initialTestingConfig,
  });
  const [frame, setFrame] = useState(0);
  const s = deriveTestingState(config, frame);
  return (
    <section
      aria-label="测试边界因果实验"
      className="not-prose my-6 min-w-0 rounded-2xl border p-3 sm:p-5"
      data-testid="testing-lab"
    >
      <h3 className="text-lg font-semibold">
        预测、单步、核对：三条测试证据链
      </h3>
      <p className="my-3 text-sm">
        三个独立示意共用阶段指针；不是一条真实并发时间轴。更改参数会回到第0帧；无自动播放、无动画，减少动态效果设置下也不产生运动。
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {choiceGroups.map((group) => (
          <fieldset key={group.key} className="min-w-0 rounded-lg border p-2">
            <legend className="px-1 font-medium">{group.title}</legend>
            <div className="flex flex-wrap gap-1">
              {group.options.map(([value, label]) => (
                <label
                  key={value}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm"
                >
                  <input
                    type="radio"
                    name={`${id}-${group.key}`}
                    value={value}
                    checked={config[group.key] === value}
                    onChange={() => {
                      setConfig({ ...config, [group.key]: value });
                      setFrame(0);
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="my-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 rounded border px-4 focus-visible:outline-2"
          onClick={() => setFrame((f) => Math.max(0, f - 1))}
          disabled={frame === 0}
        >
          上一步
        </button>
        <button
          type="button"
          className="min-h-11 rounded border px-4 focus-visible:outline-2"
          onClick={() => setFrame((f) => Math.min(5, f + 1))}
          disabled={frame === 5}
        >
          下一步
        </button>
        <button
          type="button"
          className="min-h-11 rounded border px-4 focus-visible:outline-2"
          onClick={() => {
            setConfig({ ...initialTestingConfig });
            setFrame(0);
          }}
        >
          重置全部
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="mb-4 text-sm"
        data-testid="testing-status"
      >
        第 {frame}/5 帧：{steps[frame]}。PASS {s.pass}，FAIL {s.fail}，SKIP{" "}
        {s.skip}；HTTP {s.httpDone ? s.status : "等待"}。
      </p>
      <TestingDiagrams config={config} frame={frame} />
    </section>
  );
}
