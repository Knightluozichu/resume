"use client";

import { useMemo, useState } from "react";

export function PaePointerlessLayoutDiagram() {
  const words = ["ant", "ape", "bat", "bee"] as const;
  const payload = words.join("");
  const starts = new Set([0, 3, 6, 9]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-border bg-background p-3"><div className="text-sm font-semibold text-primary">pointer array</div><div className="mt-3 grid grid-cols-2 gap-1">{words.map((word, index) => <div key={word} className="contents"><span className="border border-border p-2 font-mono text-xs text-accent">ptr +{index * 3}</span><span className="border border-border p-2 font-mono text-xs text-primary">{word}</span></div>)}</div><p className="mb-0 mt-3 text-xs text-secondary">每项额外4或8 bytes offset。</p></div>
        <div className="border border-success bg-success/10 p-3"><div className="text-sm font-semibold text-success">payload + boundary bitvector</div><div className="mt-3 flex flex-wrap gap-1">{[...payload].map((char, index) => <div key={index} className="text-center"><div className="min-w-7 border border-border bg-background p-1 font-mono text-xs text-primary">{char}</div><div className={"mt-1 font-mono text-xs " + (starts.has(index) ? "text-success" : "text-muted")}>{starts.has(index) ? "1" : "0"}</div></div>)}</div><p className="mb-0 mt-3 text-xs text-secondary">Select1(i) 定位第 i 个字符串；Rank1(pos) 找所属字符串。</p></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Pointerless programming 把逐对象指针换成紧凑 payload 与二进制边界数组，再由 Rank/Select 恢复导航。
      </figcaption>
    </figure>
  );
}

const rankBits = [0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0] as const;
const onePositions = rankBits.flatMap((bit, index) => bit ? [index + 1] : []);

export function PaeRankSelectLab() {
  const [position, setPosition] = useState(8);
  const [ordinal, setOrdinal] = useState(3);
  const rank = rankBits.slice(0, position).reduce<number>((sum, bit) => sum + bit, 0);
  const selected = onePositions[ordinal - 1];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-wrap justify-center gap-1">{rankBits.map((bit, index) => <div key={index} className={"min-w-9 border p-2 text-center font-mono text-sm " + (index + 1 === selected ? "border-success bg-success/10 text-success" : index < position ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-primary")}><div>{bit}</div><div className="mt-1 text-[10px] text-muted">{index + 1}</div></div>)}</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">Rank1({position}) = {rank}<input className="mt-2 w-full accent-current" type="range" min="1" max={rankBits.length} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">Select1({ordinal}) = {selected}<input className="mt-2 w-full accent-current" type="range" min="1" max={onePositions.length} value={ordinal} onChange={(event) => setOrdinal(Number(event.target.value))} /></label></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rank1(i) 统计前缀中的1；Select1(j) 返回第 j 个1的位置。二者把 bitvector 变成通用的 pointer/navigation layer。
      </figcaption>
    </figure>
  );
}

const directoryBits = [1,0,1,1, 0,0,1,0, 1,1,0,0, 0,1,0,1, 1,0,0,1, 0,1,1,0, 0,0,1,1, 1,0,1,0] as const;

export function PaeRankDirectoryDiagram() {
  const [position, setPosition] = useState(23);
  const superSize = 16;
  const blockSize = 4;
  const superStart = Math.floor((position - 1) / superSize) * superSize;
  const blockStart = Math.floor((position - 1) / blockSize) * blockSize;
  const beforeSuper = directoryBits.slice(0, superStart).reduce<number>((sum, bit) => sum + bit, 0);
  const insideSuper = directoryBits.slice(superStart, blockStart).reduce<number>((sum, bit) => sum + bit, 0);
  const tail = directoryBits.slice(blockStart, position).reduce<number>((sum, bit) => sum + bit, 0);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">查询 Rank1({position})<input className="mt-2 w-full accent-current" type="range" min="1" max={directoryBits.length} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-8 gap-1 sm:grid-cols-16">{directoryBits.map((bit, index) => <span key={index} className={"border p-2 text-center font-mono text-xs " + (index >= blockStart && index < position ? "border-accent bg-accent/10 text-accent" : index >= superStart && index < blockStart ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>{bit}</span>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-4"><div className="border border-border bg-background p-3 text-xs text-secondary">superblock prefix<div className="mt-1 font-semibold text-primary">{beforeSuper}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">block offset<div className="mt-1 font-semibold text-success">{insideSuper}</div></div><div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">lookup tail<div className="mt-1 font-semibold text-accent">{tail}</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">sum<div className="mt-1 font-semibold text-primary">{beforeSuper + insideSuper + tail}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Two-level directory 存 superblock 的全局前缀与 block 内偏移；短尾块用共享 lookup table，额外空间可做到 o(n)。
      </figcaption>
    </figure>
  );
}

const efArray = [2, 3, 8, 10] as const;

export function PaeSparseEliasFanoLab() {
  const [index, setIndex] = useState(2);
  const lowBits = 2;
  const lows = efArray.map((value) => value & 3);
  const highs = efArray.map((value) => value >>> lowBits);
  const highBits = "1100110";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">Access({index + 1})<input className="mt-2 w-full accent-current" type="range" min="0" max={efArray.length - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">A<div className="mt-2 font-mono text-primary">[2, 3, 8, 10]</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">L · two low bits/item<div className="mt-2 font-mono text-primary">{lows.map((value) => value.toString(2).padStart(2, "0")).join(" ")}</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">H · unary buckets<div className="mt-2 font-mono text-primary">{highBits}</div></div></div>
        <div className="mt-3 border border-accent bg-accent/10 p-3 text-xs text-secondary">high={highs[index]}，low={lows[index].toString(2).padStart(2, "0")}；重建 <strong className="text-accent">{highs[index]}×4+{lows[index]}={efArray[index]}</strong>。</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        稀疏 bitvector 可转为有序1-position数组，再用 Elias–Fano 的 high unary bitmap 与 fixed low bits 支持 Access/NextGEQ。
      </figcaption>
    </figure>
  );
}

const binaryTreeTokens = ["A", "B", "D", "∅", "∅", "∅", "C", "∅", "∅"] as const;

export function PaeBinaryTreeEncodingLab() {
  const [step, setStep] = useState(0);
  const bits = binaryTreeTokens.map((token) => token === "∅" ? "0" : "1").join("");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">preorder node/null stream：{step + 1} / {binaryTreeTokens.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={binaryTreeTokens.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap justify-center gap-1">{binaryTreeTokens.map((token, index) => <div key={index} className={"min-w-12 border p-2 text-center " + (index === step ? "border-accent bg-accent/10" : "border-border bg-background")}><div className="text-xs text-secondary">{token}</div><div className="mt-1 font-mono font-semibold text-primary">{token === "∅" ? "0" : "1"}</div></div>)}</div>
        <div className="mt-3 text-center font-mono text-sm text-success">shape bits = {bits}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binary tree 的 preorder 中 node 写1、null child 写0，n个节点产生n个1和n+1个0；无需左右 child pointers 即可唯一解析形状。
      </figcaption>
    </figure>
  );
}

const bpTokens = ["A(", "B(", ")", "C(", "E(", ")", "F(", ")", ")", "D(", ")", ")"] as const;

export function PaeOrderedTreeParenthesesLab() {
  const [position, setPosition] = useState(3);
  const bitstring = bpTokens.map((token) => token.endsWith("(") ? "1" : "0").join("");
  const depth = bitstring.slice(0, position + 1).split("").reduce((value, bit) => value + (bit === "1" ? 1 : -1), 0);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">balanced-parentheses position {position + 1}，excess={depth}<input className="mt-2 w-full accent-current" type="range" min="0" max={bpTokens.length - 1} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap justify-center gap-1">{bpTokens.map((token, index) => <span key={index} className={"min-w-10 border p-2 text-center font-mono text-xs " + (index === position ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-primary")}>{token}</span>)}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-border bg-background p-3 text-xs text-secondary">1=open，0=close<div className="mt-2 font-mono text-primary">{bitstring}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">navigation<div className="mt-2 text-success">parent / child / subtree = matching parentheses + Rank/Select</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rooted ordered tree 进入节点写 open、离开写 close，恰好2n bits；匹配括号与 excess 查询替代 parent/child pointers。
      </figcaption>
    </figure>
  );
}

const webNeighbors = {
  reference: [2, 4, 6, 9, 15],
  target: [2, 4, 7, 9, 15, 16],
} as const;

export function PaeWebGraphReferenceLab() {
  const [copyPrefix, setCopyPrefix] = useState(4);
  const copied = webNeighbors.reference.filter((value) => webNeighbors.target.includes(value as never)).slice(0, copyPrefix);
  const residuals = webNeighbors.target.filter((value) => !copied.includes(value as never));
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">从相邻页面 reference list 复制 {copyPrefix} 个共同 links<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={copyPrefix} onChange={(event) => setCopyPrefix(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="border border-border bg-background p-3 text-xs text-secondary">reference v-1<div className="mt-2 font-mono text-primary">[2, 4, 6, 9, 15]</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">target v<div className="mt-2 font-mono text-primary">[2, 4, 7, 9, 15, 16]</div></div></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="border border-success bg-success/10 p-3 text-xs text-secondary">copy mask<div className="mt-2 font-mono text-success">[{copied.join(", ") || "empty"}]</div></div><div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">residual gaps<div className="mt-2 font-mono text-accent">[{residuals.join(", ") || "empty"}]</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WebGraph 利用 URL locality：邻近 pages 的 adjacency lists 高度相似，先引用旧列表的 copy mask，再 gap-code intervals 与 residual links。
      </figcaption>
    </figure>
  );
}

const graphEdges = new Set(["0,1", "1,0", "1,2", "2,3", "3,2", "4,6", "5,4", "6,7", "7,5"]);

export function PaeK2TreeMatrixLab() {
  const [level, setLevel] = useState(1);
  const size = 8;
  const groupSize = level === 1 ? 4 : 2;
  const groups = useMemo(() => Array.from({ length: size / groupSize }, (_, rowGroup) => Array.from({ length: size / groupSize }, (_, columnGroup) => {
    const occupied = [...graphEdges].some((edge) => {
      const [row, column] = edge.split(",").map(Number);
      return row >= rowGroup * groupSize && row < (rowGroup + 1) * groupSize && column >= columnGroup * groupSize && column < (columnGroup + 1) * groupSize;
    });
    return occupied ? 1 : 0;
  })).flat(), [groupSize]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2" role="group" aria-label="k2-tree 递归层级">{[1, 2].map((item) => <button key={item} type="button" onClick={() => setLevel(item)} className={"min-h-11 border px-4 text-sm font-semibold " + (level === item ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>level {item}</button>)}</div>
        <div className="mx-auto mt-4 grid max-w-md grid-cols-8 gap-px bg-border p-px">{Array.from({ length: 64 }, (_, index) => { const row = Math.floor(index / 8); const column = index % 8; return <span key={index} className={"aspect-square " + (graphEdges.has(`${row},${column}`) ? "bg-accent" : "bg-background")} />; })}</div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-xs text-secondary">把矩阵按 {groupSize}×{groupSize} blocks 扫描，非空写1、空写0：<span className="ml-2 font-mono font-semibold text-success">{groups.join("")}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        k²-tree 递归切分 adjacency matrix，只为非空 quadrant 建 children；稀疏且成簇的边只占少量 level-order bits。
      </figcaption>
    </figure>
  );
}
