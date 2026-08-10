"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({
  x,
  y,
  label,
  fill = accent,
}: {
  x: number;
  y: number;
  label: string;
  fill?: string;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="17"
        fill={fill}
        fillOpacity="0.12"
        stroke={fill}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fill}
      >
        {label}
      </text>
    </g>
  );
}

/** 总览图：把图模型、遍历、路径和矩阵放在同一条证据链上。 */
export function MglGraphTheoryDiagram() {
  return (
    <Frame
      ariaLabel="图论导读总览：同一张图先作为顶点与边的关系模型，再用 BFS 或 DFS 遍历，用欧拉路径过边、哈密顿回路过点，最后由邻接矩阵记录一步转移。"
      caption="先声明关系模型，再选择遍历、路径或矩阵工具；图不是一张装饰性的点线图。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        一张图，四种提问方式
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        关系模型 → 遍历证据 → 路径约束 → 矩阵复合
      </text>
      <line
        x1="180"
        y1="126"
        x2="300"
        y2="126"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="420"
        y1="126"
        x2="540"
        y2="126"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="360"
        y1="166"
        x2="360"
        y2="274"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="300,126 288,120 288,132" fill={border} />
      <polygon points="540,126 528,120 528,132" fill={border} />
      <polygon points="360,274 354,262 366,262" fill={border} />

      <rect
        x="56"
        y="88"
        width="226"
        height="78"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeOpacity="0.55"
      />
      <text
        x="169"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        图模型 G=(V,E)
      </text>
      <text x="169" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        点代表对象，边代表关系
      </text>

      <rect
        x="296"
        y="88"
        width="128"
        height="78"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeOpacity="0.55"
      />
      <text
        x="360"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        BFS / DFS
      </text>
      <text x="360" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        层次或回退
      </text>

      <rect
        x="438"
        y="88"
        width="226"
        height="78"
        rx="12"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeOpacity="0.55"
      />
      <text
        x="551"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        过边 / 过点
      </text>
      <text x="551" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        欧拉、哈密顿、TSP
      </text>

      <rect
        x="166"
        y="274"
        width="388"
        height="92"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.45"
      />
      <text
        x="360"
        y="305"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        邻接矩阵 A 与转移矩阵 P
      </text>
      <text x="360" y="332" textAnchor="middle" fontSize="12" fill={primary}>
        Aᵏ 记录长度为 k 的游走；pₜ₊₁=Ppₜ 记录随机漫步
      </text>
      <text x="360" y="354" textAnchor="middle" fontSize="12" fill={secondary}>
        关系被编码，复合才有可计算的证据
      </text>
    </Frame>
  );
}

/** 交互实验：切换图的模型合同，观察邻接数据为什么必须保留边语义。 */
export function MglGraphTheoryLab() {
  const [mode, setMode] = useState<"simple" | "multigraph" | "directed">(
    "simple",
  );
  const isDirected = mode === "directed";
  const isMulti = mode === "multigraph";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="graph-model-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {[
            ["simple", "简单图"],
            ["multigraph", "多重图"],
            ["directed", "有向图"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value as typeof mode)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${mode === value ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMode("simple")}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`图模型合同实验。当前为${isDirected ? "有向图" : isMulti ? "多重图" : "简单图"}；切换模式观察边的方向、平行边是否保留，以及邻接结构如何改变。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            先写清楚 G=(V,E)，再把图交给算法
          </text>
          <text
            x="360"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {isDirected
              ? "边是有序对 (u,v)，A[u][v] 表示 u 指向 v"
              : isMulti
                ? "边是独立对象，平行边不能被集合去重"
                : "无向简单图：无方向、无平行边、无自环"}
          </text>
          <line
            x1="112"
            y1="166"
            x2="278"
            y2="166"
            stroke={border}
            strokeWidth="2"
          />
          <line
            x1="112"
            y1="166"
            x2="194"
            y2="292"
            stroke={border}
            strokeWidth="2"
          />
          <line
            x1="278"
            y1="166"
            x2="194"
            y2="292"
            stroke={border}
            strokeWidth="2"
          />
          {isMulti && (
            <line
              x1="112"
              y1="174"
              x2="278"
              y2="174"
              stroke={warning}
              strokeWidth="2"
            />
          )}
          {isDirected && (
            <>
              <polygon points="266,160 254,155 256,168" fill={accent} />
              <polygon points="190,282 184,270 197,274" fill={accent} />
              <polygon points="204,282 216,274 203,270" fill={accent} />
            </>
          )}
          <Node x={112} y={166} label="A" fill={accent} />
          <Node x={278} y={166} label="B" fill={accent} />
          <Node x={194} y={292} label="C" fill={accent} />
          <text
            x="194"
            y="340"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            {isDirected
              ? "A→B 与 B→A 是两条不同关系"
              : isMulti
                ? "A—B 的两条边都要保留"
                : "A—B 只记录一次"}
          </text>

          <rect
            x="366"
            y="106"
            width="300"
            height="238"
            rx="12"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
            strokeOpacity="0.5"
          />
          <text
            x="516"
            y="138"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={success}
          >
            当前模型的验收表
          </text>
          <text x="394" y="178" fontSize="13" fill={primary}>
            顶点 V：A、B、C
          </text>
          <text x="394" y="208" fontSize="13" fill={primary}>
            边 E：{isMulti ? "3 条（含 2 条平行边）" : "3 条"}
          </text>
          <text x="394" y="238" fontSize="13" fill={primary}>
            方向：{isDirected ? "有向" : "无向"}
          </text>
          <text x="394" y="268" fontSize="13" fill={primary}>
            度：{isDirected ? "分入度与分出度" : "每条边贡献两个端点"}
          </text>
          <text
            x="394"
            y="310"
            fontSize="13"
            fontWeight="700"
            fill={isMulti ? warning : success}
          >
            {isMulti ? "不要用邻接集合偷偷去重" : "合同确定后，遍历才有语义"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换简单图、多重图和有向图；重置回到最小模型合同。
      </figcaption>
    </figure>
  );
}

export function MglGraphTraversalDiagram() {
  const bfs = ["A", "B", "C", "D", "E", "F"];
  const dfs = ["A", "B", "D", "E", "C", "F"];
  return (
    <Frame
      ariaLabel="BFS 与 DFS 遍历证据图：BFS 按距离层次访问并记录 distance 与 parent，DFS 沿一条分支深入再回退；两者在邻接表上都为 Θ(|V|+|E|)。"
      caption="BFS 的证据是层数与父节点；DFS 的证据是深入、回退和访问状态。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        遍历不是“点名顺序”，而是可验收的状态
      </text>
      <text
        x="180"
        y="74"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        BFS：队列与层次
      </text>
      <text
        x="540"
        y="74"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        DFS：栈与回退
      </text>
      <line
        x1="360"
        y1="88"
        x2="360"
        y2="352"
        stroke={border}
        strokeDasharray="4 4"
      />
      {bfs.map((label, index) => (
        <g key={`bfs-${label}`}>
          <rect
            x={60 + (index % 3) * 78}
            y={116 + Math.floor(index / 3) * 72}
            width="52"
            height="40"
            rx="8"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeOpacity="0.6"
          />
          <text
            x={86 + (index % 3) * 78}
            y={142 + Math.floor(index / 3) * 72}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={success}
          >
            {label}
          </text>
          <text
            x={86 + (index % 3) * 78}
            y={174 + Math.floor(index / 3) * 72}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {index < 1 ? "d=0" : index < 3 ? "d=1" : "d=2"}
          </text>
        </g>
      ))}
      <text x="180" y="286" textAnchor="middle" fontSize="12" fill={primary}>
        distance[v] 与 parent[v]
      </text>
      <text x="180" y="316" textAnchor="middle" fontSize="12" fill={secondary}>
        无权最短路：第一次发现即定层
      </text>
      {dfs.map((label, index) => (
        <g key={`dfs-${label}`}>
          <rect
            x={420}
            y={110 + index * 34}
            width="52"
            height="28"
            rx="7"
            fill={accent}
            fillOpacity="0.1"
            stroke={accent}
            strokeOpacity="0.6"
          />
          <text
            x="446"
            y={129 + index * 34}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            {label}
          </text>
          {index < dfs.length - 1 && (
            <line
              x1="446"
              y1={138 + index * 34}
              x2="446"
              y2={143 + index * 34}
              stroke={border}
              strokeWidth="2"
            />
          )}
        </g>
      ))}
      <text x="540" y="340" textAnchor="middle" fontSize="12" fill={primary}>
        深入 → 无路可走 → 回退
      </text>
      <rect
        x="98"
        y="366"
        width="524"
        height="28"
        rx="7"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="385"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        邻接表复杂度：Θ(|V|+|E|)，前提是每点、每边只处理常数次
      </text>
    </Frame>
  );
}

export function MglGraphPathDiagram() {
  return (
    <Frame
      ariaLabel="图路径问题对比图：欧拉路径要求经过每条边一次并检查奇度顶点，哈密顿回路要求经过每个顶点一次，最小生成树只连接所有顶点且不形成回路。"
      caption="欧拉过边，哈密顿过点，最小生成树连接全部顶点但不闭环；三个问题不能互换判据。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        路径问题：先说“必须经过什么”
      </text>
      <rect
        x="48"
        y="74"
        width="190"
        height="270"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.5"
      />
      <text
        x="143"
        y="106"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        欧拉路径
      </text>
      <text x="143" y="130" textAnchor="middle" fontSize="12" fill={primary}>
        每条边恰好一次
      </text>
      <line
        x1="90"
        y1="178"
        x2="196"
        y2="178"
        stroke={warning}
        strokeWidth="3"
      />
      <line
        x1="90"
        y1="178"
        x2="143"
        y2="256"
        stroke={warning}
        strokeWidth="3"
      />
      <line
        x1="196"
        y1="178"
        x2="143"
        y2="256"
        stroke={warning}
        strokeWidth="3"
      />
      <Node x={90} y={178} label="2" fill={warning} />
      <Node x={196} y={178} label="1" fill={warning} />
      <Node x={143} y={256} label="3" fill={warning} />
      <text x="143" y="300" textAnchor="middle" fontSize="12" fill={primary}>
        奇度数只能是 0 或 2
      </text>
      <text x="143" y="326" textAnchor="middle" fontSize="12" fill={secondary}>
        还要检查非零度顶点连通
      </text>

      <rect
        x="265"
        y="74"
        width="190"
        height="270"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="360"
        y="106"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        哈密顿回路
      </text>
      <text x="360" y="130" textAnchor="middle" fontSize="12" fill={primary}>
        每个顶点恰好一次
      </text>
      <polygon
        points="360,164 418,204 396,274 324,274 302,204"
        fill="none"
        stroke={accent}
        strokeWidth="3"
      />
      {[
        { x: 360, y: 164, l: "A" },
        { x: 418, y: 204, l: "B" },
        { x: 396, y: 274, l: "C" },
        { x: 324, y: 274, l: "D" },
        { x: 302, y: 204, l: "E" },
      ].map((item) => (
        <Node key={item.l} x={item.x} y={item.y} label={item.l} fill={accent} />
      ))}
      <text x="360" y="310" textAnchor="middle" fontSize="12" fill={primary}>
        判定一般是 NP 完全
      </text>
      <text x="360" y="326" textAnchor="middle" fontSize="12" fill={secondary}>
        候选可验证，不等于易寻找
      </text>

      <rect
        x="482"
        y="74"
        width="190"
        height="270"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="577"
        y="106"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        最小生成树
      </text>
      <text x="577" y="130" textAnchor="middle" fontSize="12" fill={primary}>
        全点连通、无环、权重最小
      </text>
      <line
        x1="577"
        y1="166"
        x2="535"
        y2="218"
        stroke={success}
        strokeWidth="4"
      />
      <line
        x1="577"
        y1="166"
        x2="619"
        y2="218"
        stroke={success}
        strokeWidth="4"
      />
      <line
        x1="535"
        y1="218"
        x2="556"
        y2="276"
        stroke={success}
        strokeWidth="4"
      />
      <line
        x1="619"
        y1="218"
        x2="598"
        y2="276"
        stroke={success}
        strokeWidth="4"
      />
      {[
        { x: 577, y: 166, l: "r" },
        { x: 535, y: 218, l: "a" },
        { x: 619, y: 218, l: "b" },
        { x: 556, y: 276, l: "c" },
        { x: 598, y: 276, l: "d" },
      ].map((item) => (
        <Node
          key={item.l}
          x={item.x}
          y={item.y}
          label={item.l}
          fill={success}
        />
      ))}
      <text x="577" y="310" textAnchor="middle" fontSize="12" fill={primary}>
        Kruskal / Prim
      </text>
      <text x="577" y="326" textAnchor="middle" fontSize="12" fill={secondary}>
        割性质支撑选择
      </text>
      <rect
        x="86"
        y="366"
        width="548"
        height="28"
        rx="7"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="385"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        TSP 是最短哈密顿回路的优化问题，不是最小生成树的别名
      </text>
    </Frame>
  );
}

export function MglGraphMatrixDiagram() {
  return (
    <Frame
      ariaLabel="邻接矩阵与随机漫步图：图的关系先写成邻接矩阵 A，A 的幂统计多步游走；把每行归一化成转移矩阵 P 后，p_{t+1}=Pp_t 更新状态分布。"
      caption="矩阵让图上的一步关系可以复合；转移矩阵再把路径计数升级为概率分布。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从关系到可复合的状态转移
      </text>
      <rect
        x="52"
        y="84"
        width="176"
        height="236"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="140"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        图 G
      </text>
      <line
        x1="100"
        y1="170"
        x2="178"
        y2="170"
        stroke={border}
        strokeWidth="3"
      />
      <line
        x1="100"
        y1="170"
        x2="140"
        y2="248"
        stroke={border}
        strokeWidth="3"
      />
      <line
        x1="178"
        y1="170"
        x2="140"
        y2="248"
        stroke={border}
        strokeWidth="3"
      />
      <Node x={100} y={170} label="A" fill={accent} />
      <Node x={178} y={170} label="B" fill={accent} />
      <Node x={140} y={248} label="C" fill={accent} />
      <text x="140" y="286" textAnchor="middle" fontSize="12" fill={primary}>
        一步关系
      </text>
      <line
        x1="258"
        y1="202"
        x2="326"
        y2="202"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="326,202 314,196 314,208" fill={border} />

      <rect
        x="326"
        y="84"
        width="154"
        height="236"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="403"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        邻接矩阵 A
      </text>
      <text
        x="403"
        y="164"
        textAnchor="middle"
        fontSize="17"
        fontFamily="monospace"
        fill={primary}
      >
        0 1 1
      </text>
      <text
        x="403"
        y="192"
        textAnchor="middle"
        fontSize="17"
        fontFamily="monospace"
        fill={primary}
      >
        1 0 1
      </text>
      <text
        x="403"
        y="220"
        textAnchor="middle"
        fontSize="17"
        fontFamily="monospace"
        fill={primary}
      >
        1 1 0
      </text>
      <text x="403" y="270" textAnchor="middle" fontSize="12" fill={secondary}>
        Aᵏ：长度 k 的游走数
      </text>
      <line
        x1="510"
        y1="202"
        x2="578"
        y2="202"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="578,202 566,196 566,208" fill={border} />

      <rect
        x="578"
        y="84"
        width="108"
        height="236"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.5"
      />
      <text
        x="632"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        P
      </text>
      <text x="632" y="156" textAnchor="middle" fontSize="12" fill={primary}>
        状态分布
      </text>
      <text
        x="632"
        y="198"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        pₜ
      </text>
      <text
        x="632"
        y="226"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        ↓
      </text>
      <text
        x="632"
        y="254"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill={primary}
      >
        Ppₜ
      </text>
      <text x="632" y="286" textAnchor="middle" fontSize="11" fill={secondary}>
        随机漫步
      </text>
      <rect
        x="126"
        y="354"
        width="468"
        height="40"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="379"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        矩阵乘法把局部转移串成路径；概率矩阵还要满足每行和为 1
      </text>
    </Frame>
  );
}
