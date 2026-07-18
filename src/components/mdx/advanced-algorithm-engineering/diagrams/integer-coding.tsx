"use client";

import { useMemo, useState } from "react";

export function PaeIntegerGapPipelineDiagram() {
  const ids = [3, 10, 11, 25, 29, 60] as const;
  const gaps = ids.map((value, index) => index === 0 ? value : value - ids[index - 1]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-1">{ids.map((value) => <span key={value} className="border border-border bg-background p-3 text-center text-sm text-primary">{value}</span>)}</div>
        <div className="my-3 text-center text-xs font-semibold text-accent">sort + adjacent difference ↓</div>
        <div className="grid grid-cols-6 gap-1">{gaps.map((value, index) => <span key={index} className="border border-accent bg-accent/10 p-3 text-center text-sm font-semibold text-accent">{value}</span>)}</div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">单调 docID 变成以小数为主的 d-gap；解码用前缀和恢复原 ID。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        整数编码之前先改变表示：排序与差分把大而递增的 ID 变成适合变长码的小正整数。
      </figcaption>
    </figure>
  );
}

function gammaCode(value: number) {
  const binary = value.toString(2);
  return "0".repeat(binary.length - 1) + binary;
}

function deltaCode(value: number) {
  const binary = value.toString(2);
  return gammaCode(binary.length) + binary.slice(1);
}

export function PaeEliasCodeLab() {
  const [value, setValue] = useState(14);
  const binary = value.toString(2);
  const gamma = gammaCode(value);
  const delta = deltaCode(value);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">正整数 x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="128" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">B(x)<div className="mt-2 break-all font-mono text-sm text-primary">{binary}</div></div><div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">gamma(x) · {gamma.length} bits<div className="mt-2 break-all font-mono text-sm text-accent">{gamma}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">delta(x) · {delta.length} bits<div className="mt-2 break-all font-mono text-sm text-success">{delta}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        gamma 用一元前缀描述二进制长度；delta 再用 gamma 描述长度本身，降低大整数的长度开销。
      </figcaption>
    </figure>
  );
}

export function PaeRiceParameterLab() {
  const [value, setValue] = useState(83);
  const [k, setK] = useState(4);
  const divisor = 2 ** k;
  const quotient = Math.floor((value - 1) / divisor);
  const remainder = value - divisor * quotient - 1;
  const unary = "0".repeat(quotient) + "1";
  const tail = remainder.toString(2).padStart(k, "0");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="160" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">k = {k}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={k} onChange={(event) => setK(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">q = floor((x-1)/2^k)<div className="mt-2 font-semibold text-primary">{quotient} → {unary}</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">r = (x-1) mod 2^k<div className="mt-2 font-semibold text-primary">{remainder} → {tail || "空"}</div></div><div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">总长度<div className="mt-2 font-semibold text-accent">{quotient + 1 + k} bits</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        2^k 接近序列均值时，一元 quotient 不长、固定 remainder 也不过宽；k 是分布参数而非格式常量。
      </figcaption>
    </figure>
  );
}

const pforValues = [3, 5, 7, 1, 6, 42, 4, 2, 9, 0, 5, 31] as const;

export function PaePForDeltaLab() {
  const [bits, setBits] = useState(4);
  const limit = 2 ** bits;
  const exceptions = pforValues.filter((value) => value >= limit);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">块内位宽 b = {bits}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={bits} onChange={(event) => setBits(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">{pforValues.map((value, index) => <span key={index} className={"border p-2 text-center text-xs " + (value >= limit ? "border-danger bg-danger/10 font-semibold text-danger" : "border-border bg-background text-secondary")}>{value >= limit ? "ESC" : value}</span>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">内联范围 0..{limit - 1}</div><div className="border border-border bg-background p-3 text-xs text-secondary">异常数 {exceptions.length}</div><div className="border border-accent bg-accent/10 p-3 text-xs font-semibold text-accent">异常数组 [{exceptions.join(", ") || "空"}]</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        较大 b 浪费多数槽位，较小 b 制造更多异常；PForDelta 在块内固定宽解码与异常成本之间取舍。
      </figcaption>
    </figure>
  );
}

function variableBytes(value: number) {
  const groups: number[] = [];
  let current = value;
  do {
    groups.unshift(current & 0x7f);
    current >>>= 7;
  } while (current > 0);
  return groups.map((group, index) => index < groups.length - 1 ? group | 0x80 : group);
}

export function PaeVariableByteLab() {
  const [value, setValue] = useState(216);
  const bytes = useMemo(() => variableBytes(value), [value]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">整数 x = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="65535" step="127" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap justify-center gap-2">{bytes.map((byte, index) => <div key={index} className="border border-border bg-background p-3 text-center"><div className="font-mono text-sm text-primary">{byte.toString(2).padStart(8, "0")}</div><div className="mt-1 text-[10px] text-muted">0x{byte.toString(16).padStart(2, "0")} · {byte < 128 ? "stop" : "continue"}</div></div>)}</div>
        <p className="mb-0 mt-3 text-center text-xs text-secondary">{bytes.length} byte(s)，每字节 7 个 payload bits + 1 个状态位。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Variable-byte 牺牲位级紧致换字节对齐和快速扫描；首个小于 128 的字节终止当前整数。
      </figcaption>
    </figure>
  );
}

export function PaeInterpolativeRangeDiagram() {
  const rows = [
    ["root", "[1, 18]", "middle 7", "encode 7 in [4, 15]"],
    ["left", "[1, 5]", "middle 3", "encode 3 in [2, 5]"],
    ["right", "[9, 18]", "middle 11", "encode 11 in [10, 16]"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-7 gap-1">{[1, 3, 5, 7, 9, 11, 15].map((value) => <span key={value} className="border border-border bg-background p-2 text-center text-xs text-primary">{value}</span>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{rows.map((row) => <div key={row[0]} className="border border-border bg-background p-3 text-xs text-secondary"><strong className="text-primary">{row[0]}</strong><div className="mt-2">{row[1]}</div><div>{row[2]}</div><div className="mt-1 text-accent">{row[3]}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Interpolative code 递归编码中位值，只需表示它在单调性推导出的可行区间内的偏移。
      </figcaption>
    </figure>
  );
}

const efValues = [1, 4, 7, 18, 24, 26, 30, 31] as const;

export function PaeEliasFanoLab() {
  const [index, setIndex] = useState(4);
  const lowBits = 2;
  const lows = efValues.map((value) => value & 3);
  const highs = efValues.map((value) => value >>> lowBits);
  const highStream = Array.from({ length: 8 }, (_, bucket) => "1".repeat(highs.filter((value) => value === bucket).length) + "0").join("");
  const lowStream = lows.map((value) => value.toString(2).padStart(lowBits, "0")).join(" ");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <input className="w-full accent-current" type="range" min="0" max={efValues.length - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} aria-label="Elias-Fano Access 索引" />
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-border bg-background p-3 text-xs text-secondary">H：按 high bucket 写 1...10<div className="mt-2 break-all font-mono text-sm text-primary">{highStream}</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">L：每项固定 {lowBits} bits<div className="mt-2 break-all font-mono text-sm text-primary">{lowStream}</div></div></div>
        <div className="mt-3 border border-accent bg-accent/10 p-3 text-sm text-secondary">Access({index})：high={highs[index]}，low={lows[index]}，重建 <strong className="text-accent">{highs[index]}×4+{lows[index]}={efValues[index]}</strong></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Elias-Fano 把低位逐项定宽保存，高位按桶做一元位图；Select 定位第 i 个 1 后可常数时间 Access。
      </figcaption>
    </figure>
  );
}
