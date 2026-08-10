"use client";

import { useState, type ReactNode } from "react";

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
  children: ReactNode;
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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
      <path
        d={`M ${leftX} ${leftY} L ${x2} ${y2} L ${rightX} ${rightY}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** 五人真假模型：把“哪一句为真”与实际骗子人数放在同一张图上。 */
export function Mg3TruthModelDiagram() {
  const speakers = [
    { name: "A₁", statement: "L=1", truth: false },
    { name: "A₂", statement: "L=2", truth: false },
    { name: "A₃", statement: "L=3", truth: false },
    { name: "A₄", statement: "L=4", truth: true },
    { name: "A₅", statement: "L=5", truth: false },
  ];

  return (
    <Frame
      ariaLabel="五人真假模型图：A1到A5分别断言骗子人数等于1到5，只有A4的L等于4为真，因此A4是唯一老实人，其他四人是骗子。"
      caption="先标记语句真值，再用身份规则回代；同一张表同时验算语义与身份。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        五句话的真值与身份必须相容
      </text>
      <text x={56} y={65} fontSize={12} fill={secondary}>
        实际骗子人数 L = 4
      </text>
      <text x={664} y={65} textAnchor="end" fontSize={12} fill={secondary}>
        老实人数 = 5 − L = 1
      </text>
      {speakers.map((speaker, index) => {
        const x = 52 + index * 130;
        const color = speaker.truth ? success : danger;
        return (
          <g key={speaker.name}>
            <rect
              x={x}
              y={94}
              width={112}
              height={164}
              rx={14}
              fill={color}
              fillOpacity="0.08"
              stroke={color}
              strokeWidth={speaker.truth ? 2 : 1.2}
            />
            <circle
              cx={x + 56}
              cy={126}
              r={20}
              fill={color}
              fillOpacity="0.18"
              stroke={color}
            />
            <text
              x={x + 56}
              y={132}
              textAnchor="middle"
              fontSize={14}
              fontWeight="700"
              fill={color}
            >
              {speaker.name}
            </text>
            <text
              x={x + 56}
              y={176}
              textAnchor="middle"
              fontSize={15}
              fontWeight="700"
              fill={primary}
            >
              {speaker.statement}
            </text>
            <text
              x={x + 56}
              y={205}
              textAnchor="middle"
              fontSize={12}
              fill={color}
            >
              {speaker.truth ? "真话" : "假话"}
            </text>
            <text
              x={x + 56}
              y={232}
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              {speaker.truth ? "老实人" : "骗子"}
            </text>
          </g>
        );
      })}
      <rect
        x={88}
        y={298}
        width={544}
        height={76}
        rx={14}
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x={360}
        y={327}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={accent}
      >
        语句真值数 = 老实人数 = 1
      </text>
      <text x={360} y={352} textAnchor="middle" fontSize={12} fill={primary}>
        只有 L = 4 的断言为真，所以结果闭环
      </text>
    </Frame>
  );
}

/** 把三人三色谜题画成候选格，突出同行与同列的约束传播。 */
export function Mg3ConstraintPropagationDiagram() {
  const cells = [
    ["红", "黄", "绿"],
    ["绿", "红", "黄"],
    ["黄", "绿", "红"],
  ];
  const people = ["爱丽丝", "博丽丝", "克丽丝"];
  const items = ["帽子", "手表", "上衣"];
  const colors = [danger, warning, success];

  return (
    <Frame
      ariaLabel="约束传播图：三人三色谜题的九个格子，每行和每列都使用红绿黄各一次，已知爱丽丝手表黄色、博丽丝手表红色、克丽丝帽子黄色后逐格推出唯一表格。"
      caption="一个确定格会同时压缩它所在的行与列；传播直到没有候选分叉。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        3 × 3 表格：约束沿行与列传播
      </text>
      <text x={174} y={64} textAnchor="middle" fontSize={12} fill={secondary}>
        帽子
      </text>
      <text x={294} y={64} textAnchor="middle" fontSize={12} fill={secondary}>
        手表
      </text>
      <text x={414} y={64} textAnchor="middle" fontSize={12} fill={secondary}>
        上衣
      </text>
      {people.map((person, row) => {
        const y = 86 + row * 72;
        return (
          <g key={person}>
            <text x={58} y={y + 35} fontSize={12} fill={primary}>
              {person}
            </text>
            {items.map((item, col) => {
              const x = 114 + col * 120;
              const cellColor = colors[colors.length - 1 - col];
              return (
                <g key={`${person}-${item}`}>
                  <rect
                    x={x}
                    y={y}
                    width={108}
                    height={52}
                    rx={10}
                    fill={cellColor}
                    fillOpacity={"0.10"}
                    stroke={cellColor}
                    strokeWidth={row === col ? 2 : 1}
                  />
                  <text
                    x={x + 54}
                    y={y + 33}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight="700"
                    fill={cellColor}
                  >
                    {cells[row][col]}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <Arrow x1={470} y1={112} x2={548} y2={112} color={accent} />
      <text x={604} y={108} textAnchor="middle" fontSize={11} fill={accent}>
        同一行
      </text>
      <text x={604} y={126} textAnchor="middle" fontSize={11} fill={secondary}>
        每色一次
      </text>
      <Arrow x1={294} y1={306} x2={294} y2={370} color={accent} />
      <text x={360} y={366} fontSize={11} fill={accent}>
        同一列也传播
      </text>
      <rect
        x={96}
        y={344}
        width={184}
        height={40}
        rx={10}
        fill={success}
        fillOpacity="0.10"
        stroke={success}
      />
      <text x={188} y={369} textAnchor="middle" fontSize={12} fill={success}>
        终点：唯一解
      </text>
    </Frame>
  );
}

/** 把“不知道”显示为公开宣布后逐层减少的可能世界。 */
export function Mg3KnowledgeLayersDiagram() {
  const worlds = [
    { label: "WWR", detail: "A 看见两顶白，会知道自己红", color: danger },
    { label: "RWW", detail: "A 的不知道排除这个世界", color: warning },
    {
      label: "RRW",
      detail: "若 C 白，B 应从 A 的话推出自己红",
      color: warning,
    },
    { label: "RRR", detail: "A、B 都不知道与 C=红相容", color: success },
  ];

  return (
    <Frame
      ariaLabel="帽子谜题知识层图：初始可能世界包含WWR、RWW、RRW、RRR，A说不知道排除A看到两白的世界，B继续利用A的公开回答排除C为白，最后只剩C为红。"
      caption="每一次“不知道”都不是空白，而是公开删除一批不可能世界。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        “不知道”把私人观察变成公开过滤器
      </text>
      <text x={56} y={68} fontSize={12} fill={secondary}>
        初始假设：3 红、2 白；每人看不到自己的帽子
      </text>
      {worlds.map((world, index) => {
        const y = 88 + index * 66;
        const active = index === worlds.length - 1;
        return (
          <g key={world.label}>
            <rect
              x={52}
              y={y}
              width={138}
              height={45}
              rx={10}
              fill={world.color}
              fillOpacity={active ? "0.18" : "0.08"}
              stroke={world.color}
              strokeWidth={active ? 2 : 1}
            />
            <text
              x={121}
              y={y + 28}
              textAnchor="middle"
              fontSize={15}
              fontWeight="700"
              fill={world.color}
            >
              {world.label}
            </text>
            <Arrow
              x1={205}
              y1={y + 22}
              x2={260}
              y2={y + 22}
              color={world.color}
            />
            <text x={280} y={y + 18} fontSize={12} fill={primary}>
              {world.detail}
            </text>
            {index < worlds.length - 1 && (
              <text x={280} y={y + 38} fontSize={11} fill={secondary}>
                {index === 0 ? "A 的不知道" : "B 听见 A 后仍不知道"}
              </text>
            )}
          </g>
        );
      })}
      <rect
        x={52}
        y={364}
        width={616}
        height={32}
        rx={10}
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text x={360} y={385} textAnchor="middle" fontSize={12} fill={accent}>
        公开信息链：A 不知道 → B 不知道 → C 知道自己是红
      </text>
    </Frame>
  );
}

/** 对象层、观察层和自指问题的四层镜面图。 */
export function Mg3MirrorLayersDiagram() {
  const layers = [
    { title: "对象层", detail: "帽子、身份、骗子人数", color: success },
    { title: "命题层", detail: "L=4、我是老实人吗", color: accent },
    { title: "回答层", detail: "是 / 否 / 不知道", color: warning },
    { title: "观察层", detail: "谁知道谁看见了什么", color: danger },
  ];

  return (
    <Frame
      ariaLabel="镜面层次图：对象层包含帽子身份和人数，命题层描述对象，回答层记录是否不知道，观察层描述谁知道谁看见什么；自指问题会让层次回到自身。"
      caption="镜子不是玄学：每次反射都要标明正在谈对象、命题、回答还是观察者。"
    >
      <text
        x={360}
        y={31}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        四层镜面：对象与观察者不要混写
      </text>
      {layers.map((layer, index) => {
        const x = 68 + index * 158;
        return (
          <g key={layer.title}>
            <rect
              x={x}
              y={88}
              width={130}
              height={174}
              rx={16}
              fill={layer.color}
              fillOpacity="0.10"
              stroke={layer.color}
              strokeWidth={index === 3 ? 2 : 1.3}
            />
            <circle
              cx={x + 65}
              cy={127}
              r={22}
              fill={layer.color}
              fillOpacity="0.18"
              stroke={layer.color}
            />
            <text
              x={x + 65}
              y={133}
              textAnchor="middle"
              fontSize={14}
              fontWeight="700"
              fill={layer.color}
            >
              {index + 1}
            </text>
            <text
              x={x + 65}
              y={173}
              textAnchor="middle"
              fontSize={14}
              fontWeight="700"
              fill={primary}
            >
              {layer.title}
            </text>
            <text
              x={x + 65}
              y={205}
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              {layer.detail}
            </text>
            <text
              x={x + 65}
              y={236}
              textAnchor="middle"
              fontSize={11}
              fill={layer.color}
            >
              {index === 3 ? "返回自身" : "被上一层描述"}
            </text>
            {index < layers.length - 1 && (
              <Arrow
                x1={x + 134}
                y1={175}
                x2={x + 151}
                y2={175}
                color={layer.color}
              />
            )}
          </g>
        );
      })}
      <path
        d="M 590 286 C 660 316 650 360 530 360 C 390 360 330 318 360 272"
        fill="none"
        stroke={danger}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <text x={360} y={350} textAnchor="middle" fontSize={12} fill={danger}>
        自指：观察层再次谈论对象层的句子
      </text>
    </Frame>
  );
}

type MirrorMode = "truth" | "constraint" | "knowledge";

/** 交互式复盘：切换三种谜题，观察“规则、候选、公开信息”的不同作用。 */
export function Mg3MirrorMonologueLab() {
  const [mode, setMode] = useState<MirrorMode>("truth");
  const labels: Record<MirrorMode, string> = {
    truth: "真假模型",
    constraint: "约束传播",
    knowledge: "公开知识",
  };
  const panels: Record<
    MirrorMode,
    { title: string; lead: string; check: string }
  > = {
    truth: {
      title: "先找一致模型",
      lead: "把每句发言标成真或假，再让身份规则回到实际人数 L=4。",
      check: "验收：只有 A₄ 为真，且老实人数 5−4=1。",
    },
    constraint: {
      title: "再做候选传播",
      lead: "固定一个格子，同时删掉同行与同列的同色候选，直到没有分叉。",
      check: "验收：九个格子组成一张表，并且删一条线索会留下两个解。",
    },
    knowledge: {
      title: "最后传播发言",
      lead: "把“不知道”当成所有人听见的公告，逐轮删除不可能世界。",
      check: "验收：A 与 B 的不知道共同推出 C=红，而不是凭直觉猜色。",
    },
  };
  const panel = panels[mode];

  return (
    <section
      aria-label="镜子的独白交互复盘"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-secondary">
            Mirror Monologue Lab
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            三种谜题，三种“照镜子”方法
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setMode("truth")}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="复盘模式"
      >
        {(Object.keys(labels) as MirrorMode[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs ${
              mode === key
                ? "border-accent text-accent"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <div
        className="rounded-control border border-border p-4"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm text-accent">
            {mode === "truth" ? "1" : mode === "constraint" ? "2" : "3"}
          </span>
          <h4 className="text-sm font-semibold text-primary">{panel.title}</h4>
        </div>
        <p className="mt-3 text-sm text-primary">{panel.lead}</p>
        <p className="mt-2 text-xs text-secondary">{panel.check}</p>
      </div>
    </section>
  );
}
