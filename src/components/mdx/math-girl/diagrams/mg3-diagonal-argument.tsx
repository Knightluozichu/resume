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
  color = secondary,
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

export function Mg3CountabilityMapDiagram() {
  const stages = [
    ["ℕ", "自然数编号", accent],
    ["ℤ", "正负交替", success],
    ["ℚ", "格点对角扫描", warning],
  ] as const;
  return (
    <Frame
      ariaLabel="可数性地图：自然数可以编号整数，整数的编号方法扩展到有理数；实数不能沿同一条编号链被自然数完整列出。"
      caption="可数性的关键是每个对象都有一个有限编号，而不是列表必须有最后一项。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        从编号链到不可数边界
      </text>
      {stages.map(([symbol, detail, color], index) => {
        const x = 46 + index * 222;
        return (
          <g key={`countability-stage-${symbol}`}>
            <rect
              x={x}
              y="90"
              width="166"
              height="126"
              rx="14"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
              strokeWidth="1.5"
            />
            <text
              x={x + 83}
              y="142"
              textAnchor="middle"
              fontSize="30"
              fontWeight="700"
              fill={color}
            >
              {symbol}
            </text>
            <text
              x={x + 83}
              y="180"
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              {detail}
            </text>
            {index < stages.length - 1 ? (
              <Arrow x1={x + 174} y1={153} x2={x + 210} y2={153} />
            ) : null}
          </g>
        );
      })}
      <rect
        x="98"
        y="278"
        width="524"
        height="82"
        rx="14"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
        strokeDasharray="6 4"
      />
      <text
        x="360"
        y="310"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={danger}
      >
        ℝ：任何自然数列表都能被反对角数避开
      </text>
      <text x="360" y="338" textAnchor="middle" fontSize="13" fill={secondary}>
        “无限”不是同一个大小；编号能力决定集合的可数性
      </text>
    </Frame>
  );
}

export function Mg3DiagonalMatrixDiagram() {
  const rows = [
    ["1", "4", "7", "2", "8"],
    ["2", "6", "0", "3", "5"],
    ["9", "1", "4", "6", "2"],
    ["3", "8", "5", "7", "1"],
    ["6", "2", "9", "4", "3"],
  ];
  const cell = 45;
  const startX = 188;
  const startY = 80;
  return (
    <Frame
      ariaLabel="实数数字矩阵图：五行小数列在表格中，a11、a22、a33、a44、a55组成对角线；把这些数字翻转成1或2，得到与每一行都不同的反对角数B。"
      caption="先取对角线，再逐位改变；每一行都留下一个确定的差异位置。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        数字矩阵与反对角线
      </text>
      <text x="148" y="104" textAnchor="end" fontSize="12" fill={secondary}>
        A₁…A₅
      </text>
      {rows.map((row, rowIndex) =>
        row.map((digit, columnIndex) => {
          const diagonal = rowIndex === columnIndex;
          const x = startX + columnIndex * cell;
          const y = startY + rowIndex * cell;
          return (
            <g key={`matrix-${rowIndex}-${columnIndex}`}>
              <rect
                x={x}
                y={y}
                width={cell}
                height={cell}
                fill={diagonal ? warning : "var(--bg)"}
                fillOpacity={diagonal ? "0.2" : "0.45"}
                stroke={diagonal ? warning : border}
                strokeWidth={diagonal ? "2" : "1"}
              />
              <text
                x={x + cell / 2}
                y={y + 29}
                textAnchor="middle"
                fontSize="17"
                fontWeight={diagonal ? "700" : "500"}
                fill={diagonal ? warning : primary}
              >
                {digit}
              </text>
            </g>
          );
        }),
      )}
      <path
        d="M 210 99 L 390 279"
        stroke={warning}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <rect
        x="470"
        y="102"
        width="190"
        height="130"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="565"
        y="138"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        反对角数 B
      </text>
      <text
        x="565"
        y="176"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill={primary}
      >
        0.21212…
      </text>
      <text x="565" y="207" textAnchor="middle" fontSize="12" fill={secondary}>
        第 n 位避开第 n 行
      </text>
      <text
        x="360"
        y="360"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill={success}
      >
        B ≠ A₁，B ≠ A₂，…，B ≠ A₅
      </text>
      <text x="360" y="387" textAnchor="middle" fontSize="12" fill={secondary}>
        无限列表也没有“最后一行”可以躲过构造
      </text>
    </Frame>
  );
}

export function Mg3DomainBoundaryDiagram() {
  const columns = ["逐位翻转", "属于目标集合？", "能否推出矛盾？"];
  return (
    <Frame
      ariaLabel="集合归属边界图：对实数列表，逐位翻转得到的B仍属于实数，因此与完整列表假设矛盾；对有理数列表，B可能是不循环小数，目标集合归属没有保证。"
      caption="反证的第二条支柱是闭包：构造出的对象必须仍属于被枚举的集合。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        对角构造的集合边界检查
      </text>
      {columns.map((label, index) => (
        <text
          key={`boundary-head-${label}`}
          x={190 + index * 160}
          y="82"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={secondary}
        >
          {label}
        </text>
      ))}
      {[
        ["实数 ℝ", "得到B", "是：B∈ℝ", "成立", success],
        ["有理数 ℚ", "得到B", "未必：B∈ℚ？", "中断", danger],
      ].map(([name, action, membership, result, color], rowIndex) => {
        const y = 120 + rowIndex * 120;
        return (
          <g key={`boundary-row-${name}`}>
            <rect
              x="42"
              y={y - 28}
              width="636"
              height="82"
              rx="12"
              fill={color}
              fillOpacity="0.08"
              stroke={color}
            />
            <text x="72" y={y + 8} fontSize="16" fontWeight="700" fill={color}>
              {name}
            </text>
            <text
              x="190"
              y={y + 8}
              textAnchor="middle"
              fontSize="14"
              fill={primary}
            >
              {action}
            </text>
            <text
              x="350"
              y={y + 8}
              textAnchor="middle"
              fontSize="14"
              fill={primary}
            >
              {membership}
            </text>
            <text
              x="574"
              y={y + 8}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={color}
            >
              {result}
            </text>
          </g>
        );
      })}
      <text
        x="360"
        y="370"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        逃出每一行 ≠ 自动留在目标集合
      </text>
    </Frame>
  );
}

export function Mg3GodelBridgeDiagram() {
  const stages = [
    ["符号串", "φ(x)", accent],
    ["序列编码", "s₁,…,sₖ", success],
    ["哥德尔数", "⌜φ⌝", warning],
    ["句法谓词", "Proof / Prov", danger],
    ["固定点", "G ↔ ¬Prov(⌜G⌝)", accent],
  ] as const;
  return (
    <Frame
      ariaLabel="哥德尔编码桥：符号串经过序列编码和质数指数编码成为自然数，再由Formula、Proof、Prov等句法谓词回到形式系统，最后通过固定点形成自指语句。"
      caption="对角化在两个世界之间往返：语句变成数，数项又回到语句。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        哥德尔编码：把形式系统送回算术
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 18 + index * 140;
        return (
          <g key={`godel-stage-${title}`}>
            <rect
              x={x}
              y="105"
              width="116"
              height="150"
              rx="12"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
            />
            <text
              x={x + 58}
              y="145"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={color}
            >
              {title}
            </text>
            <text
              x={x + 58}
              y="190"
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              {detail}
            </text>
            <text
              x={x + 58}
              y="226"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              {index === 0
                ? "含义世界"
                : index === 1
                  ? "有限序列"
                  : index === 2
                    ? "自然数世界"
                    : index === 3
                      ? "可机械检查"
                      : "形式系统内部"}
            </text>
            {index < stages.length - 1 ? (
              <Arrow
                x1={x + 120}
                y1={180}
                x2={x + 136}
                y2={180}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="105"
        y="304"
        width="510"
        height="58"
        rx="12"
        fill={border}
        fillOpacity="0.2"
        stroke={border}
      />
      <text
        x="360"
        y="330"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={primary}
      >
        数项把编码的自然数重新写回公式语言
      </text>
      <text x="360" y="350" textAnchor="middle" fontSize="12" fill={secondary}>
        固定点不是中文文字游戏，而是可计算的句法映射
      </text>
    </Frame>
  );
}

export function Mg3DiagonalLab() {
  const rows = [
    ["1", "4", "7", "2", "8"],
    ["2", "6", "0", "3", "5"],
    ["9", "1", "4", "6", "2"],
    ["3", "8", "5", "7", "1"],
  ];
  const [selectedRow, setSelectedRow] = useState(0);
  const selectedDigit = rows[selectedRow][selectedRow];
  const flippedDigit = Number(selectedDigit) % 2 === 0 ? "1" : "2";
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="对角线实验：选择行号，观察对角位翻转如何排除该行"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">
            Diagonal Lab
          </p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">
            选择一行，完成一次局部排除
          </h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
          可交互
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
        <svg
          viewBox="0 0 520 270"
          role="img"
          aria-label={`当前选择第${selectedRow + 1}行，对角数字为${selectedDigit}，翻转后反对角位为${flippedDigit}。`}
          className="w-full"
        >
          {rows.map((row, rowIndex) =>
            row.map((digit, columnIndex) => {
              const active = rowIndex === selectedRow;
              const diagonal = rowIndex === columnIndex;
              const x = 150 + columnIndex * 48;
              const y = 35 + rowIndex * 48;
              return (
                <g key={`lab-${rowIndex}-${columnIndex}`}>
                  <rect
                    x={x}
                    y={y}
                    width="42"
                    height="42"
                    rx="6"
                    fill={
                      diagonal && active
                        ? warning
                        : active
                          ? accent
                          : "var(--bg)"
                    }
                    fillOpacity={diagonal || active ? "0.2" : "0.45"}
                    stroke={
                      diagonal && active ? warning : active ? accent : border
                    }
                    strokeWidth={diagonal && active ? "2" : "1"}
                  />
                  <text
                    x={x + 21}
                    y={y + 27}
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight={diagonal && active ? "700" : "500"}
                    fill={diagonal && active ? warning : primary}
                  >
                    {digit}
                  </text>
                </g>
              );
            }),
          )}
          <text x="120" y="61" textAnchor="end" fontSize="12" fill={secondary}>
            A{selectedRow + 1}
          </text>
          <line
            x1={170 + selectedRow * 48}
            y1={55 + selectedRow * 48}
            x2={198 + selectedRow * 48}
            y2={83 + selectedRow * 48}
            stroke={warning}
            strokeWidth="2"
          />
          <text
            x="360"
            y="255"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            第 {selectedRow + 1} 行的第 {selectedRow + 1} 位：{selectedDigit} →{" "}
            {flippedDigit}
          </text>
        </svg>
        <div className="space-y-3">
          <label
            className="block text-sm text-primary"
            htmlFor="mg3-diagonal-row"
          >
            选择对角线行号：{selectedRow + 1}
          </label>
          <input
            id="mg3-diagonal-row"
            className="w-full accent-accent"
            type="range"
            min="0"
            max={rows.length - 1}
            step="1"
            value={selectedRow}
            onChange={(event) => setSelectedRow(Number(event.target.value))}
            aria-label="选择对角线行号"
          />
          <p className="text-sm leading-6 text-secondary">
            当前只排除一行；把 `n`
            取遍自然数，才得到与每一行都不同的完整反对角数。
          </p>
          <button
            type="button"
            className="rounded-control border border-border px-3 py-2 text-sm text-primary transition hover:border-accent hover:text-accent"
            onClick={() => setSelectedRow(0)}
          >
            重置实验
          </button>
        </div>
      </div>
    </section>
  );
}
