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

/** 总览图：把算法契约、构造、证明和代价放在同一条证据链上。 */
export function MglAlgorithmsDiagram() {
  const stages = [
    { title: "问题规格", detail: "输入 · 输出 · 边界", color: accent },
    { title: "算法构造", detail: "步骤 · 状态 · 分支", color: success },
    { title: "正确性", detail: "不变量 · 终止性", color: warning },
    { title: "复杂度", detail: "模型 · 最坏 · 期望", color: danger },
  ];

  return (
    <Frame
      ariaLabel="算法交付链路：先规定输入输出和边界，再构造步骤，用不变量与排名函数证明正确和终止，最后在明确模型下分析资源代价。"
      caption="算法不是代码片段，而是规格、构造、证明与资源保证的组合。"
    >
      <defs>
        <marker
          id="mgl-algorithm-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
        </marker>
      </defs>
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从问题到可交付算法
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        先声明保证对象，再决定如何实现与度量
      </text>
      {stages.map((stage, index) => {
        const x = 26 + index * 174;
        return (
          <g key={stage.title}>
            <rect
              x={x}
              y="88"
              width="148"
              height="82"
              rx="8"
              fill={stage.color}
              fillOpacity="0.08"
              stroke={stage.color}
              strokeWidth="1.2"
            />
            <text
              x={x + 74}
              y="118"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={stage.color}
            >
              {stage.title}
            </text>
            <text
              x={x + 74}
              y="145"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {stage.detail}
            </text>
            {index < stages.length - 1 ? (
              <line
                x1={x + 151}
                y1="129"
                x2={x + 169}
                y2="129"
                stroke={secondary}
                strokeWidth="1.5"
                markerEnd="url(#mgl-algorithm-arrow)"
              />
            ) : null}
          </g>
        );
      })}
      <line
        x1="360"
        y1="184"
        x2="360"
        y2="208"
        stroke={border}
        strokeWidth="1.2"
        markerEnd="url(#mgl-algorithm-arrow)"
      />
      <rect
        x="34"
        y="220"
        width="200"
        height="90"
        rx="8"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
      />
      <text
        x="134"
        y="246"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        算法契约
      </text>
      <text x="134" y="270" textAnchor="middle" fontSize="11" fill={primary}>
        合法输入 · 合法输出
      </text>
      <text x="134" y="291" textAnchor="middle" fontSize="11" fill={secondary}>
        前置条件与后置条件
      </text>
      <rect
        x="260"
        y="220"
        width="200"
        height="90"
        rx="8"
        fill={warning}
        fillOpacity="0.05"
        stroke={border}
      />
      <text
        x="360"
        y="246"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        证明义务
      </text>
      <text x="360" y="270" textAnchor="middle" fontSize="11" fill={primary}>
        初始化 · 保持 · 退出
      </text>
      <text x="360" y="291" textAnchor="middle" fontSize="11" fill={secondary}>
        排名函数保证终止
      </text>
      <rect
        x="486"
        y="220"
        width="200"
        height="90"
        rx="8"
        fill={danger}
        fillOpacity="0.05"
        stroke={border}
      />
      <text
        x="586"
        y="246"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        代价模型
      </text>
      <text x="586" y="270" textAnchor="middle" fontSize="11" fill={primary}>
        基本操作 · 输入规模
      </text>
      <text x="586" y="291" textAnchor="middle" fontSize="11" fill={secondary}>
        精确、最坏或随机期望
      </text>
      <rect
        x="34"
        y="338"
        width="652"
        height="56"
        rx="8"
        fill={success}
        fillOpacity="0.06"
        stroke={success}
        strokeOpacity="0.55"
      />
      <text
        x="360"
        y="362"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={success}
      >
        测试寻找反例，证明覆盖全部规格，实验展示保证如何落地
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="11" fill={secondary}>
        正确且可承受，才是完成的算法交付
      </text>
    </Frame>
  );
}

/** 静态证据图：把线性搜索的不变量与三种退出状态对齐。 */
export function MglAlgorithmsSearchDiagram() {
  const values = [31, 41, 59, 26, 53];
  return (
    <Frame
      ariaLabel="顺序查找的不变量图：目标 26 位于下标 3，指针左侧的元素都不是目标，当前单元命中后返回第一次出现的位置。"
      caption="[0,index) 没有目标，是连接初始化、保持和退出的循环不变量。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        顺序查找：不变量随着指针移动
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        A={"{31, 41, 59, 26, 53}"}，v=26，index=3
      </text>
      {values.map((value, index) => {
        const x = 64 + index * 118;
        const isVisited = index < 3;
        const isHit = index === 3;
        return (
          <g key={value}>
            <rect
              x={x}
              y="112"
              width="94"
              height="74"
              rx="8"
              fill={isHit ? success : isVisited ? accent : border}
              fillOpacity={isHit || isVisited ? "0.12" : "0.05"}
              stroke={isHit ? success : isVisited ? accent : border}
              strokeWidth={isHit ? "2" : "1.2"}
            />
            <text
              x={x + 47}
              y="142"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={isHit ? success : primary}
            >
              {value}
            </text>
            <text
              x={x + 47}
              y="166"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              下标 {index}
            </text>
            {isVisited ? (
              <text
                x={x + 47}
                y="207"
                textAnchor="middle"
                fontSize="11"
                fill={accent}
              >
                排除
              </text>
            ) : null}
            {isHit ? (
              <text
                x={x + 47}
                y="207"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={success}
              >
                命中
              </text>
            ) : null}
          </g>
        );
      })}
      <line
        x1="64"
        y1="232"
        x2="398"
        y2="232"
        stroke={accent}
        strokeWidth="3"
      />
      <polygon points="398,232 386,226 386,238" fill={accent} />
      <text x="230" y="258" textAnchor="middle" fontSize="12" fill={accent}>
        [0,index) 内没有 26
      </text>
      <rect
        x="50"
        y="294"
        width="194"
        height="68"
        rx="8"
        fill={accent}
        fillOpacity="0.07"
        stroke={border}
      />
      <text
        x="147"
        y="319"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={accent}
      >
        初始化
      </text>
      <text x="147" y="342" textAnchor="middle" fontSize="11" fill={secondary}>
        index=0，空区间成立
      </text>
      <rect
        x="263"
        y="294"
        width="194"
        height="68"
        rx="8"
        fill={warning}
        fillOpacity="0.07"
        stroke={border}
      />
      <text
        x="360"
        y="319"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={warning}
      >
        保持
      </text>
      <text x="360" y="342" textAnchor="middle" fontSize="11" fill={secondary}>
        不命中就扩大排除区间
      </text>
      <rect
        x="476"
        y="294"
        width="194"
        height="68"
        rx="8"
        fill={success}
        fillOpacity="0.07"
        stroke={border}
      />
      <text
        x="573"
        y="319"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={success}
      >
        退出
      </text>
      <text x="573" y="342" textAnchor="middle" fontSize="11" fill={secondary}>
        命中返回 3，否则返回 -1
      </text>
    </Frame>
  );
}

/** 静态证据图：展示不变量证明的三步与终止证明的独立职责。 */
export function MglAlgorithmsProofDiagram() {
  const cards = [
    { title: "初始化", detail: "index=0\n空区间不含目标", color: accent },
    { title: "保持", detail: "当前不命中\nindex 递增仍成立", color: warning },
    { title: "退出", detail: "命中是首个\n越界说明全部排除", color: success },
  ];
  return (
    <Frame
      ariaLabel="循环不变量证明图：初始化、保持、退出三步证明部分正确性，排名函数 n-index 负责终止。"
      caption="部分正确性与终止性是两条独立但互补的证明线。"
    >
      <defs>
        <marker
          id="mgl-proof-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
        </marker>
      </defs>
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        一条不变量，三次验收
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        循环条件前，[0,index) 不含 target
      </text>
      {cards.map((card, index) => {
        const x = 52 + index * 224;
        return (
          <g key={card.title}>
            <rect
              x={x}
              y="104"
              width="180"
              height="112"
              rx="10"
              fill={card.color}
              fillOpacity="0.09"
              stroke={card.color}
              strokeWidth="1.5"
            />
            <text
              x={x + 90}
              y="136"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={card.color}
            >
              {card.title}
            </text>
            {card.detail.split("\n").map((line, lineIndex) => (
              <text
                key={line}
                x={x + 90}
                y={168 + lineIndex * 22}
                textAnchor="middle"
                fontSize="11.5"
                fill={primary}
              >
                {line}
              </text>
            ))}
            {index < cards.length - 1 ? (
              <line
                x1={x + 184}
                y1="160"
                x2={x + 216}
                y2="160"
                stroke={secondary}
                strokeWidth="1.5"
                markerEnd="url(#mgl-proof-arrow)"
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="92"
        y="264"
        width="536"
        height="92"
        rx="10"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.55"
      />
      <text
        x="360"
        y="292"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        终止性：另一条证明线
      </text>
      <text x="360" y="318" textAnchor="middle" fontSize="12" fill={primary}>
        V = n − index ≥ 0，每次循环后 V 严格减少 1
      </text>
      <text x="360" y="340" textAnchor="middle" fontSize="11" fill={secondary}>
        自然数不存在无限严格下降链，因此循环必然停止
      </text>
    </Frame>
  );
}

/** 静态证据图：比较精确计数、渐近阶与二分搜索的候选区间。 */
export function MglAlgorithmsComplexityDiagram() {
  const bars = [
    { label: "顺序查找", value: 4, detail: "4n+5，O(n)", color: accent },
    { label: "哨兵查找", value: 3, detail: "3n+7，O(n)", color: warning },
    {
      label: "二分搜索",
      value: 1.2,
      detail: "log₂n，O(log n)",
      color: success,
    },
  ];
  return (
    <Frame
      ariaLabel="复杂度比较图：顺序查找和哨兵查找都是线性阶，哨兵常数更小；有序输入上的二分搜索是对数阶。"
      caption="精确计数说明常数改进，渐近阶说明规模增长；二分搜索另有有序输入前置条件。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        同一阶数，也要看模型与前提
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="12" fill={secondary}>
        n=32 时的相对工作量示意，不是机器秒表
      </text>
      <line
        x1="190"
        y1="92"
        x2="190"
        y2="318"
        stroke={border}
        strokeWidth="1.5"
      />
      <line
        x1="190"
        y1="318"
        x2="670"
        y2="318"
        stroke={border}
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3, 4].map((tick) => (
        <g key={tick}>
          <line
            x1={190 + tick * 110}
            y1="318"
            x2={190 + tick * 110}
            y2="324"
            stroke={border}
          />
          <text
            x={190 + tick * 110}
            y="342"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {tick}x
          </text>
        </g>
      ))}
      {bars.map((bar, index) => {
        const y = 112 + index * 64;
        const width = bar.value * 110;
        return (
          <g key={bar.label}>
            <text
              x="176"
              y={y + 24}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={bar.color}
            >
              {bar.label}
            </text>
            <rect
              x="202"
              y={y}
              width={width}
              height="32"
              rx="6"
              fill={bar.color}
              fillOpacity="0.18"
              stroke={bar.color}
            />
            <text
              x={Math.min(660, 214 + width)}
              y={y + 21}
              fontSize="11"
              fill={primary}
            >
              {bar.detail}
            </text>
          </g>
        );
      })}
      <rect
        x="52"
        y="368"
        width="616"
        height="30"
        rx="7"
        fill={success}
        fillOpacity="0.06"
        stroke={border}
      />
      <text x="360" y="388" textAnchor="middle" fontSize="11" fill={secondary}>
        前提、基本操作、输入分布与量化对象不写清，复杂度结论就没有可比性
      </text>
    </Frame>
  );
}

/** 静态证据图：固定输入下的随机枢纽与两种复杂度保证。 */
export function MglAlgorithmsRandomnessDiagram() {
  return (
    <Frame
      ariaLabel="随机快速排序图：固定输入后由算法随机选择枢纽，端点枢纽形成退化树并有平方级最坏界，较均衡枢纽形成对数层数并给出 n log n 期望。"
      caption="随机性放在算法内部；最坏保证与固定输入上的期望保证同时存在。"
    >
      <defs>
        <marker
          id="mgl-random-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
        </marker>
      </defs>
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        固定输入，随机选择枢纽
      </text>
      <rect
        x="38"
        y="82"
        width="190"
        height="60"
        rx="8"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="133"
        y="108"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        同一输入
      </text>
      <text x="133" y="129" textAnchor="middle" fontSize="11" fill={primary}>
        [1,2,3,4,5,6,7,8]
      </text>
      <line
        x1="234"
        y1="112"
        x2="306"
        y2="112"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-random-arrow)"
      />
      <rect
        x="312"
        y="82"
        width="96"
        height="60"
        rx="8"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="108"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        随机枢纽
      </text>
      <text x="360" y="129" textAnchor="middle" fontSize="11" fill={primary}>
        固定输入不变
      </text>
      <line
        x1="414"
        y1="112"
        x2="486"
        y2="82"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-random-arrow)"
      />
      <line
        x1="414"
        y1="112"
        x2="486"
        y2="226"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-random-arrow)"
      />
      <rect
        x="490"
        y="54"
        width="190"
        height="108"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="585"
        y="79"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        端点枢纽
      </text>
      <circle
        cx="540"
        cy="106"
        r="13"
        fill={danger}
        fillOpacity="0.2"
        stroke={danger}
      />
      <circle
        cx="580"
        cy="106"
        r="13"
        fill={danger}
        fillOpacity="0.2"
        stroke={danger}
      />
      <circle
        cx="620"
        cy="106"
        r="13"
        fill={danger}
        fillOpacity="0.2"
        stroke={danger}
      />
      <text x="585" y="141" textAnchor="middle" fontSize="11" fill={secondary}>
        退化递归树 · 最坏 Θ(n²)
      </text>
      <rect
        x="490"
        y="198"
        width="190"
        height="126"
        rx="8"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
      />
      <text
        x="585"
        y="223"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        较均衡枢纽
      </text>
      <circle
        cx="585"
        cy="250"
        r="13"
        fill={success}
        fillOpacity="0.2"
        stroke={success}
      />
      <line x1="585" y1="263" x2="545" y2="286" stroke={success} />
      <line x1="585" y1="263" x2="625" y2="286" stroke={success} />
      <circle
        cx="545"
        cy="298"
        r="11"
        fill={success}
        fillOpacity="0.15"
        stroke={success}
      />
      <circle
        cx="625"
        cy="298"
        r="11"
        fill={success}
        fillOpacity="0.15"
        stroke={success}
      />
      <text x="585" y="317" textAnchor="middle" fontSize="11" fill={secondary}>
        期望比较次数 Θ(n log n)
      </text>
      <rect
        x="50"
        y="360"
        width="620"
        height="32"
        rx="7"
        fill={warning}
        fillOpacity="0.07"
        stroke={border}
      />
      <text x="360" y="381" textAnchor="middle" fontSize="11" fill={secondary}>
        随机期望不是每次运行的承诺；它对固定输入的随机选择取平均
      </text>
    </Frame>
  );
}

type Strategy = "linear" | "binary";

function visitedIndexes(values: number[], target: number, strategy: Strategy) {
  const visited: number[] = [];
  if (strategy === "linear") {
    for (let index = 0; index < values.length; index += 1) {
      visited.push(index);
      if (values[index] === target) break;
    }
    return visited;
  }

  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    visited.push(middle);
    if (values[middle] === target) break;
    if (values[middle] < target) low = middle + 1;
    else high = middle - 1;
  }
  return visited;
}

/** 交互实验：在同一有序输入上比较线性查找与二分搜索的轨迹。 */
export function MglAlgorithmsLab() {
  const values = [11, 18, 26, 34, 41, 53, 67, 89];
  const [strategy, setStrategy] = useState<Strategy>("linear");
  const [target, setTarget] = useState(26);
  const visited = visitedIndexes(values, target, strategy);
  const foundIndex = values.indexOf(target);
  const found = foundIndex >= 0;
  const lastVisited = visited[visited.length - 1];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="algorithm-search-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {(["linear", "binary"] as Strategy[]).map((item) => {
            const selected = strategy === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setStrategy(item)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
              >
                {item === "linear" ? "顺序查找" : "二分搜索"}
              </button>
            );
          })}
          {[26, 53, 100].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={target === value}
              onClick={() => setTarget(value)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${target === value ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}
            >
              目标 {value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setStrategy("linear");
              setTarget(26);
            }}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 330"
          role="img"
          aria-label={`查找实验：${strategy === "linear" ? "顺序查找" : "二分搜索"}目标 ${target}，访问了 ${visited.length} 个位置，${found ? `在下标 ${foundIndex} 命中` : "没有找到目标"}。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            同一契约，不同搜索轨迹
          </text>
          <text
            x="360"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            有序数组允许二分搜索；彩色单元格是本次访问过的位置
          </text>
          {values.map((value, index) => {
            const x = 42 + index * 80;
            const isVisited = visited.includes(index);
            const isLast = lastVisited === index;
            const isTarget = value === target;
            return (
              <g key={value}>
                <rect
                  x={x}
                  y="90"
                  width="62"
                  height="66"
                  rx="7"
                  fill={
                    isTarget && found ? success : isVisited ? accent : border
                  }
                  fillOpacity={
                    isTarget && found ? "0.2" : isVisited ? "0.14" : "0.04"
                  }
                  stroke={
                    isTarget && found ? success : isLast ? warning : border
                  }
                  strokeWidth={isLast ? "2.5" : "1.2"}
                />
                <text
                  x={x + 31}
                  y="118"
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={isTarget && found ? success : primary}
                >
                  {value}
                </text>
                <text
                  x={x + 31}
                  y="140"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  [{index}]
                </text>
                {isVisited ? (
                  <circle
                    cx={x + 31}
                    cy="178"
                    r="5"
                    fill={isTarget && found ? success : accent}
                  />
                ) : null}
              </g>
            );
          })}
          <rect
            x="46"
            y="212"
            width="628"
            height="68"
            rx="9"
            fill={found ? success : danger}
            fillOpacity="0.07"
            stroke={found ? success : danger}
            strokeOpacity="0.55"
          />
          <text
            x="360"
            y="238"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={found ? success : danger}
          >
            {found ? `命中：返回下标 ${foundIndex}` : "未命中：返回 -1"}
          </text>
          <text
            x="360"
            y="262"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {strategy === "linear"
              ? "不变量：左侧已访问区间没有目标"
              : "不变量：目标若存在，仍在候选区间 [lo,hi] 内"}
          </text>
        </svg>
        <p className="mt-3 text-center text-sm text-secondary">
          当前访问 {visited.length} 个位置；
          {found
            ? `目标 ${target} 在下标 ${foundIndex}。`
            : `目标 ${target} 不在数组中。`}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交互实验把抽象不变量落到可复现的访问轨迹上。
      </figcaption>
    </figure>
  );
}
