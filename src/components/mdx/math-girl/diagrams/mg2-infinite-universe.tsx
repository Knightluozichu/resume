"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function round(value: number) {
  return Number(value.toFixed(3));
}

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

function ClockPoint({
  index,
  active,
  fill,
}: {
  index: number;
  active: boolean;
  fill: string;
}) {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  const x = round(184 + Math.cos(angle) * 116);
  const y = round(218 + Math.sin(angle) * 116);
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="16"
        fill={active ? fill : "var(--bg-elevated)"}
        fillOpacity={active ? "0.85" : "1"}
        stroke={active ? fill : border}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={active ? "var(--text-inverse)" : primary}
      >
        {index === 0 ? 12 : index}
      </text>
    </g>
  );
}

function orbitFor(step: number) {
  const values: number[] = [];
  let current = 0;
  do {
    values.push(current);
    current = (current + step) % 12;
  } while (current !== 0 && values.length <= 12);
  return values;
}

/** 总览图：把观察、模运算、最大公约数和推广压缩成一条证据链。 */
export function Mg2InfiniteUniverseDiagram() {
  return (
    <Frame
      ariaLabel="将无限宇宙尽收掌心总览：12 点时钟上的步长 k 形成模运算轨道，最大公约数决定最小巡回数，互质决定是否完全巡回，公式推广到任意 n。"
      caption="有限表盘负责发现规律，最大公约数负责证明任意规模的巡回结构。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从一只时钟看到任意规模的循环
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        观察 → 模运算 → gcd 判据 → 无需穷举的推广
      </text>
      <circle
        cx="172"
        cy="206"
        r="98"
        fill={accent}
        fillOpacity="0.04"
        stroke={accent}
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      {Array.from({ length: 12 }, (_, index) => (
        <ClockPoint
          key={`overview-${index}`}
          index={index}
          active={index % 5 === 0}
          fill={accent}
        />
      ))}
      <text
        x="172"
        y="210"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        k=5
      </text>
      <text x="172" y="232" textAnchor="middle" fontSize="12" fill={secondary}>
        12 步回到起点
      </text>
      <line
        x1="300"
        y1="206"
        x2="372"
        y2="206"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="372,206 360,200 360,212" fill={border} />
      <rect
        x="382"
        y="94"
        width="278"
        height="82"
        rx="12"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeOpacity="0.55"
      />
      <text
        x="521"
        y="126"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        最小巡回数
      </text>
      <text
        x="521"
        y="154"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        gcd(n,k)
      </text>
      <rect
        x="382"
        y="196"
        width="278"
        height="82"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeOpacity="0.55"
      />
      <text
        x="521"
        y="228"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        轨道长度
      </text>
      <text
        x="521"
        y="256"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        n / gcd(n,k)
      </text>
      <rect
        x="144"
        y="320"
        width="432"
        height="58"
        rx="10"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.45"
      />
      <text
        x="360"
        y="346"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        完全巡回 ⇔ gcd(n,k)=1
      </text>
      <text x="360" y="366" textAnchor="middle" fontSize="12" fill={secondary}>
        公式一次覆盖无限多种表盘规模
      </text>
    </Frame>
  );
}

/** 交互实验：切换步长，观察轨道、最小巡回数与完全巡回条件。 */
export function Mg2ClockLab() {
  const [step, setStep] = useState(5);
  const orbit = orbitFor(step);
  const displayOrbit =
    orbit.length > 7
      ? `${orbit
          .slice(0, 4)
          .map((value) => (value === 0 ? 12 : value))
          .join(
            " → ",
          )} → … → ${orbit[orbit.length - 1] === 0 ? 12 : orbit[orbit.length - 1]} → 12`
      : `${orbit.map((value) => (value === 0 ? 12 : value)).join(" → ")} → 12`;
  const gcd =
    step === 1 || step === 5 || step === 7 || step === 11
      ? 1
      : step === 2 || step === 10
        ? 2
        : step === 3 || step === 9
          ? 3
          : step === 4 || step === 8
            ? 4
            : 6;
  const full = gcd === 1;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="clock-orbit-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {[1, 4, 5, 6, 7].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={step === value}
              onClick={() => setStep(value)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${step === value ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              步长 {value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep(5)}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`12 点时钟巡回实验。当前步长为 ${step}，轨道长度为 ${orbit.length}，最大公约数为 ${gcd}，${full ? "完全巡回" : "不能完全巡回"}。`}
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
            每次加 k，再对 12 取余
          </text>
          <text
            x="360"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            aⱼ ≡ j·{step} (mod 12)，轨道顺序由按钮切换
          </text>
          <circle
            cx="204"
            cy="210"
            r="114"
            fill={accent}
            fillOpacity="0.04"
            stroke={accent}
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          {Array.from({ length: 12 }, (_, index) => (
            <ClockPoint
              key={`lab-${index}`}
              index={index}
              active={orbit.includes(index)}
              fill={full ? success : warning}
            />
          ))}
          {orbit.map((value, index) => {
            const next = orbit[(index + 1) % orbit.length];
            const a1 = (value / 12) * Math.PI * 2 - Math.PI / 2;
            const a2 = (next / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={`edge-${value}-${next}-${index}`}
                x1={round(204 + Math.cos(a1) * 93)}
                y1={round(210 + Math.sin(a1) * 93)}
                x2={round(204 + Math.cos(a2) * 93)}
                y2={round(210 + Math.sin(a2) * 93)}
                stroke={full ? success : warning}
                strokeOpacity="0.75"
                strokeWidth="2"
              />
            );
          })}
          <text
            x="204"
            y="205"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={full ? success : warning}
          >
            k={step}
          </text>
          <text
            x="204"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {full ? "覆盖全部 12 点" : `只覆盖 ${orbit.length} 点`}
          </text>
          <rect
            x="386"
            y="106"
            width="278"
            height="214"
            rx="12"
            fill={full ? success : warning}
            fillOpacity="0.07"
            stroke={full ? success : warning}
            strokeOpacity="0.5"
          />
          <text
            x="525"
            y="142"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={full ? success : warning}
          >
            {full ? "完全巡回" : "轨道提前闭合"}
          </text>
          <text x="414" y="184" fontSize="13" fill={primary}>
            访问序列：
          </text>
          <text
            x="414"
            y="210"
            fontSize="13"
            fontFamily="monospace"
            fill={primary}
          >
            {displayOrbit}
          </text>
          <text x="414" y="252" fontSize="13" fill={primary}>
            gcd(12,{step}) = {gcd}
          </text>
          <text x="414" y="278" fontSize="13" fill={primary}>
            轨道长度 = 12/{gcd} = {orbit.length}
          </text>
          <text x="414" y="304" fontSize="12" fill={secondary}>
            重置回步长 5，重新检查条件
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换步长观察轨道闭合；重置回步长 5 的完全巡回。
      </figcaption>
    </figure>
  );
}

export function Mg2ResidueDiagram() {
  return (
    <Frame
      ariaLabel="余数分类图：质数 239、251、257、263、271、283 都是奇数，模 4 分类后只有 257 余 1，其余余 3。"
      caption="选对模数才能显露结构；模 2 看不出差异，模 4 把 257 分离出来。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        观察镜头改变，结构才会显现
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        同一组质数：模 2 全部余 1，模 4 分成两类
      </text>
      <rect
        x="52"
        y="96"
        width="258"
        height="218"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="181"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        模 2
      </text>
      <text
        x="181"
        y="168"
        textAnchor="middle"
        fontSize="20"
        fontFamily="monospace"
        fill={primary}
      >
        239 251 257
      </text>
      <text
        x="181"
        y="198"
        textAnchor="middle"
        fontSize="20"
        fontFamily="monospace"
        fill={primary}
      >
        263 271 283
      </text>
      <text x="181" y="246" textAnchor="middle" fontSize="13" fill={secondary}>
        全部是奇数
      </text>
      <text x="181" y="278" textAnchor="middle" fontSize="12" fill={secondary}>
        分类没有产生区分力
      </text>
      <rect
        x="358"
        y="96"
        width="310"
        height="218"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.5"
      />
      <text
        x="513"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        模 4
      </text>
      <text x="390" y="172" fontSize="14" fill={primary}>
        余 1：257 = 4×64+1
      </text>
      <text x="390" y="208" fontSize="14" fill={secondary}>
        余 3：239、251、263
      </text>
      <text x="390" y="238" fontSize="14" fill={secondary}>
        　　　271、283
      </text>
      <text
        x="513"
        y="284"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        257 被判别出来
      </text>
      <rect
        x="116"
        y="348"
        width="488"
        height="40"
        rx="9"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="374"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        定义判别性质 → 选择合适尺度 → 才能提出可靠猜想
      </text>
    </Frame>
  );
}

export function Mg2GcdProofDiagram() {
  return (
    <Frame
      ariaLabel="最大公约数证明图：令 d=gcd(n,k)，写 n=dn'、k=dk' 且 n' 与 k' 互质；最小返回步数为 n/d，轨道长度为 n/d，完全巡回当且仅当 d=1。"
      caption="把回到起点的同余式约去公共因子，最小巡回数和轨道长度同时出现。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        最大公约数把图形规律升级为定理
      </text>
      <rect
        x="48"
        y="90"
        width="190"
        height="238"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="143"
        y="124"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        分解公共因子
      </text>
      <text
        x="143"
        y="168"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        d=gcd(n,k)
      </text>
      <text
        x="143"
        y="208"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        n=dn′
      </text>
      <text
        x="143"
        y="238"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        k=dk′
      </text>
      <text x="143" y="282" textAnchor="middle" fontSize="12" fill={secondary}>
        gcd(n′,k′)=1
      </text>
      <line
        x1="270"
        y1="208"
        x2="340"
        y2="208"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="340,208 328,202 328,214" fill={border} />
      <rect
        x="352"
        y="90"
        width="320"
        height="238"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="512"
        y="124"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        返回条件
      </text>
      <text
        x="512"
        y="164"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        rk ≡ 0 (mod n)
      </text>
      <text
        x="512"
        y="198"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        n′ | rk′
      </text>
      <text
        x="512"
        y="232"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        n′ | r
      </text>
      <text
        x="512"
        y="274"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        r=n′=n/d
      </text>
      <text x="512" y="302" textAnchor="middle" fontSize="12" fill={secondary}>
        轨道长度 = n/gcd(n,k)
      </text>
      <rect
        x="132"
        y="356"
        width="456"
        height="34"
        rx="8"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="378"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        完全巡回 ⇔ n/d=n ⇔ gcd(n,k)=1
      </text>
    </Frame>
  );
}

export function Mg2ScaleDiagram() {
  return (
    <Frame
      ariaLabel="规模推广图：逐点绘制 12 点表盘可行，但一亿个位置不可能穷举；欧几里得算法只需计算 gcd(n,k)，一次得到最小巡回数、轨道长度和完全巡回判断。"
      caption="公式把有限实验推广到无法亲手穷举的规模，这就是“将无限宇宙尽收掌心”。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从画完一只时钟到判断一亿个位置
      </text>
      <rect
        x="52"
        y="96"
        width="250"
        height="216"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="177"
        y="132"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        小规模：n=12
      </text>
      <circle
        cx="177"
        cy="212"
        r="62"
        fill="none"
        stroke={accent}
        strokeWidth="2"
      />
      {Array.from({ length: 12 }, (_, index) => (
        <ClockPoint
          key={`scale-${index}`}
          index={index}
          active={index % 5 === 0}
          fill={accent}
        />
      ))}
      <text x="177" y="294" textAnchor="middle" fontSize="12" fill={secondary}>
        可以画图、列举、发现规律
      </text>
      <line
        x1="334"
        y1="204"
        x2="394"
        y2="204"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="394,204 382,198 382,210" fill={border} />
      <rect
        x="416"
        y="96"
        width="252"
        height="216"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.5"
      />
      <text
        x="542"
        y="132"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        大规模：n=100000000
      </text>
      <text
        x="542"
        y="178"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        d=gcd(n,k)
      </text>
      <text
        x="542"
        y="216"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        orbit=n/d
      </text>
      <text x="542" y="254" textAnchor="middle" fontSize="13" fill={secondary}>
        欧几里得算法
      </text>
      <text x="542" y="286" textAnchor="middle" fontSize="12" fill={secondary}>
        无需画完全部位置
      </text>
      <rect
        x="118"
        y="348"
        width="484"
        height="40"
        rx="9"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="374"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        具体示例负责发现，定理负责覆盖任意 n
      </text>
    </Frame>
  );
}
