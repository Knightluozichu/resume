"use client";

import { useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const danger = "var(--danger, var(--accent))";
const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-surface px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const lab =
  "not-prose my-6 rounded-card border border-border p-3 sm:p-5 text-primary [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[460px] [&_svg]:mx-auto [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:max-w-full";

/** A declared evidence relationship, not an assertion about a verified wheel build. */
export function Lcp10CommunityResourcesVersionContractLab() {
  const [pinned, setPinned] = useState(true);
  const [missing, setMissing] = useState(false);
  const reset = () => {
    setPinned(true);
    setMissing(false);
  };
  return (
    <section
      className={lab}
      aria-label="实验一：证据谱系"
      data-community="lineage"
      data-visual-kind="lcp10-source-lineage"
    >
      <h4 className="text-lg font-semibold">
        实验一 · 引用能沿哪条边追到源码？
      </h4>
      <p className="text-sm text-secondary">
        离线关系样本：C0/C1 是假设提交，P0
        是假设产物。实线表示样本声明的绑定，虚线表示待核查；不是软件供应链签名证明。
      </p>
      <div className="my-3 flex flex-wrap gap-2">
        <button
          className={control}
          aria-pressed={pinned}
          onClick={() => setPinned(!pinned)}
        >
          {pinned ? "改用浮动文档" : "绑定版本文档"}
        </button>
        <button
          className={control}
          aria-pressed={missing}
          onClick={() => setMissing(!missing)}
        >
          {missing ? "恢复产物记录" : "移除产物记录"}
        </button>
        <button className={control} onClick={reset}>
          重置谱系
        </button>
      </div>
      <svg
        viewBox="0 0 360 430"
        role="img"
        aria-label={`源码提交分叉到产物及文档。${pinned ? "文档绑定C0" : "文档跟随C1"}；${missing ? "产物来源边缺失" : "产物来源边存在"}。`}
        fontSize="16"
        fill={ink}
      >
        <path
          d="M80 65 V150 H265 V185"
          fill="none"
          stroke={border}
          strokeWidth="3"
        />
        <path d="M80 150 V220" fill="none" stroke={border} strokeWidth="3" />
        {!missing && (
          <path
            data-edge="source-package"
            d="M80 82 Q80 160 170 215"
            fill="none"
            stroke={accent}
            strokeWidth="3"
          />
        )}
        {missing && (
          <path
            d="M108 137 l16 16 m0 -16 l-16 16"
            stroke={danger}
            strokeWidth="4"
          />
        )}
        <path
          data-edge="docs-source"
          d={pinned ? "M88 70 Q335 35 275 289" : "M265 210 V289"}
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeDasharray={pinned ? undefined : "6 6"}
        />
        <path
          d="M177 246 L92 350"
          fill="none"
          stroke={missing ? border : accent}
          strokeWidth="3"
          strokeDasharray={missing ? "6 6" : undefined}
        />
        <path
          d="M252 318 L99 365"
          fill="none"
          stroke={pinned && !missing ? accent : danger}
          strokeWidth="3"
          strokeDasharray={pinned && !missing ? undefined : "6 6"}
        />
        <circle
          cx="80"
          cy="65"
          r="17"
          fill="var(--bg)"
          stroke={accent}
          strokeWidth="3"
        />
        <text x="18" y="36">
          源码 C0
        </text>
        <circle cx="80" cy="150" r="8" fill={muted} />
        <circle
          cx="265"
          cy="200"
          r="17"
          fill="var(--bg)"
          stroke={muted}
          strokeWidth="3"
        />
        <text x="235" y="170">
          源码 C1
        </text>
        <text x="16" y="250" fill={muted}>
          提交历史
        </text>
        <path
          d="M180 201 l25 25 -25 25 -25 -25 Z"
          fill="var(--bg)"
          stroke={missing ? danger : accent}
          strokeWidth="3"
        />
        <text x="140" y="281">
          包 P0
        </text>
        <circle
          cx="270"
          cy="307"
          r="18"
          fill="var(--bg)"
          stroke={accent}
          strokeWidth="3"
        />
        <text x="236" y="349">
          文档 D
        </text>
        <circle
          cx="80"
          cy="370"
          r="20"
          fill="var(--bg)"
          stroke={pinned && !missing ? accent : danger}
          strokeWidth="3"
        />
        <text x="20" y="414">
          复现样例 E
        </text>
        <text x="134" y="400" fill={muted}>
          {pinned && !missing ? "同一坐标可追溯" : "样例有未核查边"}
        </text>
      </svg>
      <p role="status" className="text-sm">
        {missing
          ? "断链：不能由P0推出它来自C0；补充发布标签、构建记录或明确未知，不能用星数补边。"
          : pinned
            ? "样本关系：E引用P0和D，两条路径都回到C0。现实中仍需核对构建与发布记录。"
            : "分岔：E安装P0（C0），但D已跟随C1。页面更新不等于安装包具备新接口。"}
      </p>
    </section>
  );
}

const coreCandidates = ["0.3.79", "1.4.4", "1.6.10"];

export function Lcp10CommunityResourcesRunnableTraceLab() {
  const [route, setRoute] = useState<"legacy" | "classic" | "modern">("modern");
  const [python, setPython] = useState("3.10");
  const [oldPin, setOldPin] = useState(false);
  // Snapshot: langchain 1.4.6 -> core >=1.6.10,<2; classic 1.0.8 -> >=1.4.4,<2.
  // An old core<1 pin is a deliberately injected project constraint, not template metadata.
  const accepted = coreCandidates.map(
    (_, i) => !oldPin && i >= (route === "classic" ? 1 : 2),
  );
  const interpreterOK = python !== "3.9";
  const importOK = route !== "legacy";
  const reset = () => {
    setRoute("modern");
    setPython("3.10");
    setOldPin(false);
  };
  return (
    <section
      className={lab}
      aria-label="实验二：约束与模板迁移"
      data-community="constraints"
      data-visual-kind="lcp10-dependency-intersection"
    >
      <h4 className="text-lg font-semibold">实验二 · 版本交集不等于导入迁移</h4>
      <p className="text-sm text-secondary">
        真实元数据快照＋有限候选点计算。不是完整依赖解析器；保留旧导入仍安装现代包，用来隔离导入错误。
      </p>
      <div className="my-3 flex flex-wrap items-center gap-2">
        <label className="flex flex-col gap-1 text-sm">
          模板路线
          <select
            aria-label="模板路线"
            className={control}
            value={route}
            onChange={(e) => setRoute(e.target.value as typeof route)}
          >
            <option value="modern">现代 create_agent</option>
            <option value="classic">过渡 langchain_classic</option>
            <option value="legacy">保留旧导入（故障）</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          解释器
          <select
            aria-label="解释器"
            className={control}
            value={python}
            onChange={(e) => setPython(e.target.value)}
          >
            <option>3.9</option>
            <option>3.10</option>
            <option>3.11</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={oldPin}
          onClick={() => setOldPin(!oldPin)}
        >
          {oldPin ? "移除 core＜1" : "注入 core＜1"}
        </button>
        <button className={control} onClick={reset}>
          重置约束
        </button>
      </div>
      <svg
        viewBox="0 0 360 490"
        role="img"
        aria-label={`核心版本候选交集为${accepted.filter(Boolean).length}个点；Python ${python}${interpreterOK ? "符合" : "不符合"}要求；${importOK ? "导入已迁移" : "旧导入断开"}`}
        fontSize="16"
        fill={ink}
      >
        <text x="12" y="26">
          core 候选（语义版本排序，非等距）
        </text>
        {["0.3.79", "1.4.4", "1.6.10"].map((v, i) => (
          <text key={v} x={54 + 107 * i} y="58" textAnchor="middle">
            {v}
          </text>
        ))}
        <text x="12" y="87">
          包要求
        </text>
        <line
          x1={route === "classic" ? 161 : 268}
          x2="335"
          y1="105"
          y2="105"
          stroke={accent}
          strokeWidth="12"
        />
        <text x="12" y="143">
          项目要求 {oldPin ? "core＜1" : "不另加限制"}
        </text>
        <line
          x1="30"
          x2={oldPin ? 78 : 335}
          y1="161"
          y2="161"
          stroke={muted}
          strokeWidth="12"
        />
        <text x="12" y="199">
          候选交集
        </text>
        {accepted.map((ok, i) => (
          <circle
            data-candidate={coreCandidates[i]}
            key={coreCandidates[i]}
            cx={54 + i * 107}
            cy="220"
            r={ok ? 12 : 4}
            fill={ok ? accent : border}
          />
        ))}
        <text x="12" y="260">
          Python 要求 ≥3.10，＜4
        </text>
        <line
          x1="40"
          x2="320"
          y1="289"
          y2="289"
          stroke={border}
          strokeWidth="3"
        />
        <line
          x1="180"
          x2="320"
          y1="289"
          y2="289"
          stroke={accent}
          strokeWidth="9"
        />
        {["3.9", "3.10", "3.11"].map((v, i) => (
          <g key={v}>
            <text x={40 + i * 140} y="326" textAnchor="middle">
              {v}
            </text>
            {python === v && (
              <path
                data-interpreter={v}
                d={`M${30 + i * 140} 270 l10 14 10 -14 Z`}
                fill={interpreterOK ? accent : danger}
              />
            )}
          </g>
        ))}
        <circle
          cx="55"
          cy="384"
          r="13"
          fill="var(--bg)"
          stroke={muted}
          strokeWidth="3"
        />
        <text x="15" y="423">
          旧模板
        </text>
        <path
          data-migration="route"
          d={
            route === "classic"
              ? "M69 384 Q140 350 206 365"
              : route === "modern"
                ? "M69 384 Q140 436 206 449"
                : "M69 384 H137"
          }
          fill="none"
          stroke={importOK ? accent : danger}
          strokeWidth="3"
        />
        {!importOK && (
          <path
            d="M145 372 l22 22 m0 -22 l-22 22"
            stroke={danger}
            strokeWidth="3"
          />
        )}
        <circle
          cx="220"
          cy="365"
          r="13"
          fill={route === "classic" ? accent : "var(--bg)"}
          stroke={border}
          strokeWidth="2"
        />
        <text x="243" y="371">
          classic
        </text>
        <circle
          cx="220"
          cy="449"
          r="13"
          fill={route === "modern" ? accent : "var(--bg)"}
          stroke={border}
          strokeWidth="2"
        />
        <text x="243" y="455">
          v1 重写
        </text>
      </svg>
      <p role="status" className="text-sm">
        core候选交集：
        {coreCandidates.filter((_, i) => accepted[i]).join("、") || "∅"}
        ；解释器：{interpreterOK ? "可行" : "拒绝"}；导入：
        {importOK ? "已改接" : "langchain.chains 在v1不可用"}。
        {accepted.some(Boolean) && interpreterOK && importOK
          ? "仅这三个条件成立，仍未验证完整依赖、模型或模板行为。"
          : "先修复对应的约束或导入，再考虑模型调用。"}
      </p>
    </section>
  );
}

const requestSteps = [
  { label: "request", caption: "HTTP 请求抵达边界" },
  { label: "execute", caption: "服务内部执行，按需导出 span" },
  { label: "response", caption: "HTTP 响应返回；观测不是响应路径" },
] as const;

export function Lcp10CommunityResourcesReleaseGateLab() {
  const [tracing, setTracing] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [batch, setBatch] = useState(false);
  const timeline = useTeachingTimeline({
    steps: requestSteps,
    build: (tl) => {
      const clock = { elapsed: 0 };
      requestSteps.forEach((step, i) => {
        tl.label(step.label, i * 1200);
        tl.add(
          clock,
          { elapsed: i + 1, duration: 1200, ease: "linear" },
          i * 1200,
        );
      });
    },
  });
  const stage = timeline.currentStep;
  const executing = stage >= 1 && !blocked;
  const reset = () => {
    timeline.goToStep(0);
    setTracing(true);
    setBlocked(false);
    setBatch(false);
  };
  return (
    <section
      className={lab}
      aria-label="实验三：传输与观测"
      data-community="topology"
      data-visual-kind="lcp10-service-observability"
    >
      <h4 className="text-lg font-semibold">
        实验三 · HTTP 与 span 不走同一条路
      </h4>
      <p className="text-sm text-secondary">
        离线设计时序，非真实SDK/网络抓包；纵向为因果顺序，不以像素声称真实延迟。示意默认异步观测导出。
      </p>
      <div className="my-3 flex flex-wrap gap-2">
        <button
          className={control}
          aria-pressed={batch}
          onClick={() => setBatch(!batch)}
        >
          {batch ? "切到 invoke" : "切到 batch(2)"}
        </button>
        <button
          className={control}
          aria-pressed={tracing}
          onClick={() => setTracing(!tracing)}
        >
          {tracing ? "关闭 tracing" : "开启 tracing"}
        </button>
        <button
          className={control}
          aria-pressed={blocked}
          onClick={() => setBlocked(!blocked)}
        >
          {blocked ? "恢复 HTTP" : "阻断 HTTP"}
        </button>
      </div>
      <svg
        viewBox="0 0 360 470"
        role="img"
        aria-label={`${batch ? "batch两项" : "invoke单项"}HTTP请求；${blocked ? "请求被边界阻断" : `阶段${stage + 1}`}；${tracing ? "启用" : "关闭"}观测导出`}
        fontSize="16"
        fill={ink}
      >
        <text x="45" y="28" textAnchor="middle">
          客户端
        </text>
        <text x="180" y="28" textAnchor="middle">
          服务端
        </text>
        <text x="305" y="28" textAnchor="middle">
          观测端
        </text>
        {[45, 180, 305].map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1="43"
            y2="421"
            stroke={border}
            strokeWidth="2"
            strokeDasharray="4 5"
          />
        ))}
        <line
          x1="111"
          x2="111"
          y1="44"
          y2="420"
          stroke={muted}
          strokeWidth="2"
        />
        <text x="114" y="452" fill={muted}>
          在线服务边界
        </text>
        <path
          data-http="request"
          d={
            blocked
              ? "M45 80 L105 106"
              : "M45 80 L180 138 l-12 -1 m12 1 l-8 -10"
          }
          fill="none"
          stroke={blocked ? danger : accent}
          strokeWidth="3"
        />
        <text x="12" y="64">
          POST /{batch ? "batch" : "invoke"}
        </text>
        {blocked && (
          <g>
            <path
              d="M100 100 l20 20 m0 -20 l-20 20"
              stroke={danger}
              strokeWidth="4"
            />
            <text x="137" y="111" fill={danger}>
              未进入服务
            </text>
          </g>
        )}
        {executing && (
          <g>
            <rect
              data-span="root"
              x="158"
              y="145"
              width="44"
              height="180"
              rx="8"
              fill="var(--bg-elevated)"
              stroke={accent}
              strokeWidth="2"
            />
            <rect
              data-span="child"
              x="170"
              y="165"
              width="20"
              height={batch ? 58 : 120}
              rx="4"
              fill={accent}
            />
            {batch && (
              <rect
                data-span="child"
                x="170"
                y="244"
                width="20"
                height="58"
                rx="4"
                fill={accent}
              />
            )}
            <text x="12" y="211">
              {batch ? "两项子运行" : "一个子运行"}
            </text>
            {tracing && (
              <g data-export="spans">
                <path
                  d="M202 239 L305 280 l-12 1 m12 -1 l-7 -11"
                  fill="none"
                  stroke={muted}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <text x="221" y="222">
                  导出
                </text>
                <rect
                  x="287"
                  y="288"
                  width="36"
                  height="101"
                  rx="7"
                  fill="var(--bg)"
                  stroke={accent}
                  strokeWidth="2"
                />
                {Array.from({ length: batch ? 2 : 1 }, (_, i) => (
                  <rect
                    key={i}
                    x="297"
                    y={300 + i * 38}
                    width="16"
                    height={batch ? 28 : 65}
                    rx="3"
                    fill={accent}
                  />
                ))}
                <text x="255" y="416">
                  span 树
                </text>
              </g>
            )}
          </g>
        )}
        {stage >= 2 && !blocked && (
          <g data-http="response">
            <path
              d="M180 335 L45 385 l8 -11 m-8 11 l13 2"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
            <text x="12" y="414">
              200 / output
            </text>
          </g>
        )}
      </svg>
      <p role="status" className="text-sm">
        {blocked
          ? "边界拒绝：无服务内子运行、无成功响应。是否另有网关观测需单独配置，本图不模拟。"
          : `1个HTTP请求，${executing ? (batch ? 2 : 1) : 0}个服务内子运行；${executing && tracing ? (batch ? 3 : 2) : 0}个导出span（根＋子）；${stage >= 2 ? "响应已返回" : "推进到响应步骤观察返回边"}。关闭tracing不删除HTTP响应；真实SDK导出错误是否阻塞需按配置测试。`}
      </p>
      <TimelineControls
        timeline={timeline}
        caption={requestSteps[stage].caption}
        reset={{ label: "重置拓扑与时钟", onClick: reset }}
      />
    </section>
  );
}
