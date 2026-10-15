"use client";

import { useState } from "react";

// 独立需求分析：导入解析需要依赖分叉；LCEL需要带类型的数据形状；观测需要时间轴与父子run。全部为确定性离线教学，不借用共享EvidenceLab。
const C = {
  bg: "var(--bg-elevated)",
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50";
const panel =
  "not-prose my-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 sm:p-5 text-[var(--text-primary)]";
const svgStyle = {
  color: C.ink,
  fill: C.ink,
  fontSize: 14,
  fontFamily: "inherit",
};

export function Lcp02FirstExperienceVersionContractLab() {
  const [route, setRoute] = useState("v1");
  const [provider, setProvider] = useState(true);
  const [oldPython, setOldPython] = useState(false);
  const reset = () => {
    setRoute("v1");
    setProvider(true);
    setOldPython(false);
  };
  const destination = route === "v1" ? 68 : 212;
  return (
    <section
      className={panel}
      data-visual-kind="lcp02-import-dependency-graph"
      aria-label="实验一 环境依赖分叉"
    >
      <h3 className="mb-2 font-semibold">实验一：一次导入到底经过哪些包？</h3>
      <p className="mb-3 text-sm">
        圆是模块，线是本例依赖；外圈标出项目隔离环境。虚线插口表示未安装，不代表自动补齐。
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="grid gap-1 text-sm">
          导入路线
          <select
            className={control}
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            aria-label="导入路线"
          >
            <option value="v1">v1：模型接口</option>
            <option value="classic">classic：旧 Chain</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={!provider}
          onClick={() => setProvider(!provider)}
        >
          故障：{provider ? "卸载集成包" : "恢复集成包"}
        </button>
        <button
          className={control}
          aria-pressed={oldPython}
          onClick={() => setOldPython(!oldPython)}
        >
          故障：Python {oldPython ? "3.9" : "3.11"}
        </button>
        <button className={control} onClick={reset}>
          重置实验一
        </button>
      </div>
      <svg
        viewBox="0 0 280 436"
        className="mx-auto mt-3 w-full max-w-[420px]"
        role="img"
        aria-label={`依赖图：${route}路线，Python ${oldPython ? "3.9不满足v1要求" : "3.11"}，集成包${provider ? "存在" : "缺失"}`}
        style={svgStyle}
      >
        <rect
          x="4"
          y="4"
          width="272"
          height="428"
          rx="24"
          fill="none"
          stroke={C.line}
          strokeDasharray="5 5"
        />
        <text x="140" y="28" textAnchor="middle">
          项目 .venv · 独立解释器
        </text>
        <circle
          cx="140"
          cy="80"
          r="34"
          fill={C.bg}
          stroke={oldPython ? C.danger : C.accent}
          strokeWidth="2"
        />
        <text x="140" y="77" textAnchor="middle">
          Python
        </text>
        <text x="140" y="96" textAnchor="middle">
          {oldPython ? "3.9 ×" : "3.11"}
        </text>
        <path
          d={`M140 114 L140 135 L${destination} 135 L${destination} 158`}
          stroke={oldPython ? C.danger : C.accent}
          strokeWidth="3"
          fill="none"
          strokeDasharray={oldPython ? "4 5" : undefined}
        />
        {oldPython && (
          <path
            d="M130 124 l20 20 m0 -20 l-20 20"
            stroke={C.danger}
            strokeWidth="3"
          />
        )}
        {[
          { x: 68, label: "langchain", sub: "v1 核心", key: "v1" },
          { x: 212, label: "classic", sub: "旧 Chain", key: "classic" },
        ].map((n) => (
          <g key={n.key} opacity={route === n.key ? 1 : 0.45}>
            <circle
              cx={n.x}
              cy="198"
              r="40"
              fill={C.bg}
              stroke={route === n.key ? C.accent : C.line}
              strokeWidth="2"
            />
            <text x={n.x} y="194" textAnchor="middle">
              {n.label}
            </text>
            <text x={n.x} y="214" textAnchor="middle">
              {n.sub}
            </text>
          </g>
        ))}
        <path
          d={`M${destination} 238 L${destination} 258 L140 258 L140 280`}
          fill="none"
          stroke={oldPython ? C.line : C.accent}
          strokeWidth="2"
        />
        <rect
          x="62"
          y="280"
          width="156"
          height="40"
          rx="20"
          fill={C.bg}
          stroke={C.accent}
        />
        <text x="140" y="305" textAnchor="middle">
          langchain-core
        </text>
        <path
          d="M140 320 V344"
          stroke={provider ? C.accent : C.danger}
          strokeWidth="3"
          strokeDasharray={provider ? undefined : "4 5"}
        />
        {provider ? (
          <>
            <rect
              x="40"
              y="344"
              width="200"
              height="40"
              rx="20"
              fill={C.bg}
              stroke={oldPython ? C.line : C.accent}
            />
            <text x="140" y="369" textAnchor="middle">
              provider 集成包
            </text>
          </>
        ) : (
          <>
            <circle
              cx="140"
              cy="364"
              r="18"
              fill="none"
              stroke={C.danger}
              strokeDasharray="3 4"
            />
            <path
              d="M129 353 l22 22 m0 -22 l-22 22"
              stroke={C.danger}
              strokeWidth="2"
            />
          </>
        )}
        <text
          x="140"
          y="412"
          textAnchor="middle"
          fill={oldPython || !provider ? C.danger : C.muted}
        >
          {oldPython
            ? "停止：v1 要求 Python ≥3.10"
            : provider
              ? "导入可解析 ≠ 网络可调用"
              : "停止：集成模块无法导入"}
        </text>
      </svg>
      <p role="status" className="mt-2 text-sm">
        {oldPython
          ? "首先修复解释器；本图以当前v1的Python下限为检查条件，不是所有classic版本的兼容矩阵。"
          : !provider
            ? "移除的是提供商分支：core还在，但实际集成类的import会失败。恢复包后仍需检查凭据和网络。"
            : route === "classic"
              ? "旧Chain的导入入口改为langchain_classic；它不是从v1核心自动回退。安装包名为langchain-classic。"
              : "v1核心保留模型/agent等入口；core提供消息与Runnable等基础类型，提供商集成另装。图是选定调用路径，不是完整pip依赖树。"}
      </p>
    </section>
  );
}

export function Lcp02FirstExperienceRunnableTraceLab() {
  const [topic, setTopic] = useState("缓存");
  const [stage, setStage] = useState(0);
  const [badJSON, setBadJSON] = useState(false);
  const reset = () => {
    setTopic("缓存");
    setStage(0);
    setBadJSON(false);
  };
  const changeFault = () => {
    setBadJSON(!badJSON);
    setStage(0);
  };
  const captions = [
    "dict尚未经过模板；只有topic字段。",
    "模板生成两条消息：system约束格式，user携带主题。",
    "离线模型返回AIMessage，content仍是字符串，不是dict。",
    badJSON
      ? "JSON解析失败；没有产生下游dict，不能把错误当成空答案。"
      : "解析器读取content并检查answer字段，产出dict。",
  ];
  return (
    <section
      className={panel}
      data-visual-kind="lcp02-typed-payload-pipeline"
      aria-label="实验二 类型数据管道"
    >
      <h3 className="mb-2 font-semibold">实验二：数据形状沿管道逐步变换</h3>
      <div className="flex flex-wrap items-end gap-2">
        <label className="grid gap-1 text-sm">
          主题
          <select
            className={control}
            value={topic}
            aria-label="管道主题"
            onChange={(e) => {
              setTopic(e.target.value);
              setStage(0);
            }}
          >
            <option>缓存</option>
            <option>管道</option>
          </select>
        </label>
        <button
          className={control}
          onClick={() => setStage(Math.min(3, stage + 1))}
          disabled={stage === 3}
        >
          执行下一阶段
        </button>
        <button
          className={control}
          aria-pressed={badJSON}
          onClick={changeFault}
        >
          故障：{badJSON ? "坏 JSON 已开" : "注入坏 JSON"}
        </button>
        <button className={control} onClick={reset}>
          重置实验二
        </button>
      </div>
      <svg
        viewBox="0 0 280 530"
        className="mx-auto mt-3 w-full max-w-[420px]"
        role="img"
        aria-label={`类型管道，第${stage}阶段，主题${topic}${badJSON ? "，模型输出无效JSON" : ""}`}
        style={svgStyle}
      >
        <path
          d="M140 90 V140 M140 264 V302 M140 401 V448"
          stroke={C.line}
          strokeWidth="3"
        />
        {stage >= 1 && (
          <path d="M140 90 V140" stroke={C.accent} strokeWidth="3" />
        )}
        {stage >= 2 && (
          <path d="M140 264 V302" stroke={C.accent} strokeWidth="3" />
        )}
        {stage >= 3 && (
          <path
            d="M140 401 V448"
            stroke={badJSON ? C.danger : C.accent}
            strokeWidth="3"
          />
        )}
        <text x="12" y="25">
          输入 · dict
        </text>
        <path
          d="M28 42 H252 V90 H28 Z M108 42 V90"
          fill={C.bg}
          stroke={C.accent}
        />
        <text x="45" y="72">
          topic
        </text>
        <text x="134" y="72">
          {topic}
        </text>
        <text x="152" y="126" fill={C.muted}>
          模板 format
        </text>
        <text x="12" y="164">
          list[消息] · {stage >= 1 ? "2 条" : "等待"}
        </text>
        {stage >= 1 && (
          <g>
            <path
              d="M28 180 H252 V210 H45 L28 222 Z"
              fill={C.bg}
              stroke={C.accent}
            />
            <text x="40" y="201">
              system：只返回 JSON
            </text>
            <path
              d="M28 222 H252 V252 H45 L28 264 Z"
              fill={C.bg}
              stroke={C.accent}
            />
            <text x="40" y="243">
              user：{topic}
            </text>
          </g>
        )}
        <text x="152" y="289" fill={C.muted}>
          离线 fake_model
        </text>
        <text x="12" y="326">
          AIMessage · content: str
        </text>
        {stage >= 2 && (
          <g>
            <path
              d="M28 343 H252 V389 H48 L28 401 Z"
              fill={C.bg}
              stroke={badJSON ? C.danger : C.accent}
            />
            <text x="40" y="371">
              {badJSON ? "answer: 缺少JSON引号" : `JSON文本 · ${topic}`}
            </text>
          </g>
        )}
        <text x="152" y="427" fill={C.muted}>
          parse + 校验
        </text>
        {stage === 3 ? (
          badJSON ? (
            <g>
              <path
                d="M122 451 l36 36 m0 -36 l-36 36"
                stroke={C.danger}
                strokeWidth="4"
              />
              <text x="140" y="515" textAnchor="middle" fill={C.danger}>
                JSONDecodeError · 无输出
              </text>
            </g>
          ) : (
            <g>
              <text x="12" y="460">
                输出 · dict[str, str]
              </text>
              <path
                d="M28 474 H252 V522 H28 Z M108 474 V522"
                fill={C.bg}
                stroke={C.accent}
              />
              <text x="38" y="504">
                answer
              </text>
              <text x="119" y="504">
                {topic}的解释
              </text>
            </g>
          )
        ) : (
          <text x="140" y="491" textAnchor="middle" fill={C.muted}>
            尚无解析结果
          </text>
        )}
      </svg>
      <p role="status" className="mt-2 text-sm">
        阶段 {stage}/3：{captions[stage]}{" "}
        本图与下文标准库程序一致；真实ChatPromptTemplate通常返回ChatPromptValue，而非这里的普通消息列表。
      </p>
    </section>
  );
}

export function Lcp02FirstExperienceReleaseGateLab() {
  const [mode, setMode] = useState("invoke");
  const [tick, setTick] = useState(0);
  const [failure, setFailure] = useState(false);
  const reset = () => {
    setMode("invoke");
    setTick(0);
    setFailure(false);
  };
  const rows = mode === "batch" ? 3 : 1;
  const end = failure ? 3 : 5;
  const x = (t: number) => 52 + t * 34;
  const graphHeight = 144 + rows * 104;
  return (
    <section
      className={panel}
      data-visual-kind="lcp02-run-tree-stream-clock"
      aria-label="实验三 批流与trace时间轴"
    >
      <h3 className="mb-2 font-semibold">实验三：同一链的批、流与父子运行</h3>
      <p className="mb-3 text-sm">
        横轴为人为设定的逻辑拍，不是性能测量。竖线表示父子关系；条宽表示存活拍数，圆点是收到的流片段。
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="grid gap-1 text-sm">
          调用形态
          <select
            className={control}
            value={mode}
            aria-label="调用形态"
            onChange={(e) => {
              setMode(e.target.value);
              setTick(0);
            }}
          >
            <option value="invoke">invoke：一个输入</option>
            <option value="batch">batch：三个输入</option>
            <option value="stream">stream：三个片段</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={failure}
          onClick={() => {
            setFailure(!failure);
            setTick(0);
          }}
        >
          故障：{failure ? "中断已开" : "模型中断"}
        </button>
        <button className={control} onClick={reset}>
          重置实验三
        </button>
      </div>
      <label className="mt-3 grid gap-1 text-sm">
        逻辑时钟 {tick}/5
        <input
          className="h-11 min-h-11 min-w-11 w-full accent-[var(--accent)]"
          type="range"
          min="0"
          max="5"
          step="1"
          value={tick}
          aria-label="逻辑时钟"
          onChange={(e) => setTick(Number(e.target.value))}
        />
      </label>
      <svg
        viewBox={`0 0 280 ${graphHeight}`}
        className="mx-auto w-full max-w-[420px]"
        role="img"
        aria-label={`${mode}运行树，逻辑拍${tick}，${rows}个子运行${failure ? "，第3拍模型中断" : ""}`}
        style={svgStyle}
      >
        {[0, 1, 2, 3, 4, 5].map((t) => (
          <g key={t}>
            <line
              x1={x(t)}
              x2={x(t)}
              y1="27"
              y2={graphHeight - 65}
              stroke={C.line}
              strokeDasharray="3 5"
            />
            <text x={x(t)} y="19" textAnchor="middle">
              {t}
            </text>
          </g>
        ))}
        <text x="3" y="49">
          root
        </text>
        <rect
          x={x(0)}
          y="34"
          width={Math.max(2, Math.min(tick, end) * 34)}
          height="20"
          rx="5"
          fill={failure && tick >= 3 ? C.danger : C.accent}
        />
        {Array.from({ length: rows }, (_, i) => {
          const y = 82 + i * 104;
          return (
            <g key={i}>
              <path d={`M42 54 V${y} H52`} stroke={C.muted} fill="none" />
              <text x="3" y={y + 17}>
                {String.fromCharCode(65 + i)}
              </text>
              <text x="54" y={y - 7}>
                模板 / 模型 / 解析
              </text>
              {tick >= 1 && (
                <rect
                  x={x(0)}
                  y={y}
                  width="34"
                  height="20"
                  fill={C.bg}
                  stroke={C.accent}
                />
              )}
              {tick >= 1 && (
                <rect
                  x={x(1)}
                  y={y}
                  width={Math.max(
                    2,
                    (Math.min(tick, failure ? 3 : 4) - 1) * 34,
                  )}
                  height="20"
                  fill={C.accent}
                  opacity="0.6"
                />
              )}
              {!failure && tick >= 4 && (
                <rect
                  x={x(4)}
                  y={y}
                  width={Math.max(2, (tick - 4) * 34)}
                  height="20"
                  fill={C.bg}
                  stroke={C.accent}
                />
              )}
              {failure && tick >= 3 && (
                <path
                  d={`M${x(3) - 7} ${y - 3} l14 26 m0 -26 l-14 26`}
                  stroke={C.danger}
                  strokeWidth="3"
                />
              )}
              {mode === "stream" &&
                [2, 3, 4]
                  .filter((t) => t <= tick && (!failure || t < 3))
                  .map((t) => (
                    <g key={t}>
                      <circle cx={x(t)} cy={y + 44} r="10" fill={C.accent} />
                      <text x={x(t)} y={y + 73} textAnchor="middle">
                        片{t - 1}
                      </text>
                    </g>
                  ))}
            </g>
          );
        })}
        <line
          x1={x(tick)}
          x2={x(tick)}
          y1="27"
          y2={graphHeight - 60}
          stroke={C.ink}
          strokeWidth="2"
        />
        <text
          x="140"
          y={graphHeight - 31}
          textAnchor="middle"
          fill={failure && tick >= 3 ? C.danger : C.ink}
        >
          {failure && tick >= 3
            ? "错误封口 · 无完整结果"
            : tick === 5
              ? `${rows} 个完整结果可交付`
              : "运行中 · 不交付完整结果"}
        </text>
        <text x="140" y={graphHeight - 7} textAnchor="middle" fill={C.muted}>
          {mode === "stream"
            ? "先拼接 JSON 文本，再解析一次"
            : mode === "batch"
              ? "三个子运行 · 按输入次序收集"
              : "一个输入 · 一个最终结果"}
        </text>
      </svg>
      <p role="status" className="mt-2 text-sm">
        {failure && tick >= 3
          ? "第3拍捕获模型错误并结束root；流中已到达的片段不能冒充完整JSON。先保留失败run，再选择重试策略。"
          : mode === "batch"
            ? "batch不是把三条输入拼进一个prompt；本图假设同时启动，实际并发与异常策略需另行配置。"
            : mode === "stream"
              ? "片段在2、3、4拍到达。流式输出是否可增量解析取决于解析器；本例必须缓冲到结束。"
              : "模板、模型、解析是root的三个子步骤。这里只模拟run树；没有向LangSmith上传任何数据。"}
      </p>
    </section>
  );
}
