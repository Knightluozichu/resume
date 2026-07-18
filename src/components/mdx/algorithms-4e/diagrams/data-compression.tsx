"use client";

import { useMemo, useState } from "react";

type HuffmanNode = {
  id: string;
  symbol?: string;
  frequency: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
};

type HuffmanMerge = {
  left: string;
  right: string;
  parent: string;
  frequency: number;
};

function frequencies(input: string) {
  const result = new Map<string, number>();
  for (const symbol of input) result.set(symbol, (result.get(symbol) ?? 0) + 1);
  return result;
}

function buildHuffman(input: string) {
  const queue: HuffmanNode[] = [...frequencies(input)].map(([symbol, frequency]) => ({
    id: symbol,
    symbol,
    frequency,
  }));
  const merges: HuffmanMerge[] = [];
  let sequence = 0;

  while (queue.length > 1) {
    queue.sort((left, right) => left.frequency - right.frequency || left.id.localeCompare(right.id));
    const left = queue.shift();
    const right = queue.shift();
    if (!left || !right) break;
    const parent: HuffmanNode = {
      id: `n${sequence++}`,
      frequency: left.frequency + right.frequency,
      left,
      right,
    };
    merges.push({
      left: left.symbol ?? left.id,
      right: right.symbol ?? right.id,
      parent: parent.id,
      frequency: parent.frequency,
    });
    queue.push(parent);
  }

  const root = queue[0];
  const codes = new Map<string, string>();
  function visit(node: HuffmanNode | undefined, prefix: string) {
    if (!node) return;
    if (node.symbol !== undefined) {
      codes.set(node.symbol, prefix || "0");
      return;
    }
    visit(node.left, `${prefix}0`);
    visit(node.right, `${prefix}1`);
  }
  visit(root, "");
  return { root, codes, merges };
}

function huffmanEncode(input: string) {
  const model = buildHuffman(input);
  return {
    ...model,
    payload: Array.from(input, (symbol) => model.codes.get(symbol) ?? "").join(""),
  };
}

function huffmanDecode(bits: string, root: HuffmanNode | undefined, length: number) {
  if (!root || length === 0) return "";
  if (root.symbol !== undefined) return root.symbol.repeat(length);
  let result = "";
  let node = root;
  for (const bit of bits) {
    node = bit === "0" ? node.left ?? root : node.right ?? root;
    if (node.symbol !== undefined) {
      result += node.symbol;
      if (result.length === length) return result;
      node = root;
    }
  }
  return result;
}

function runLengthEncode(bits: string, maximum = 255) {
  const runs: number[] = [];
  let current = "0";
  let run = 0;
  for (const bit of bits) {
    if (bit !== current) {
      runs.push(run);
      run = 1;
      current = bit;
    } else {
      if (run === maximum) {
        runs.push(run, 0);
        run = 0;
      }
      run += 1;
    }
  }
  runs.push(run);
  return runs;
}

function runLengthDecode(runs: number[]) {
  let bit = "0";
  let result = "";
  for (const run of runs) {
    result += bit.repeat(run);
    bit = bit === "0" ? "1" : "0";
  }
  return result;
}

type LzwAddition = { code: number; phrase: string; emitted: string };

function lzwEncode(input: string) {
  const dictionary = new Map<string, number>();
  for (let code = 0; code < 256; code++) dictionary.set(String.fromCharCode(code), code);
  let nextCode = 257;
  let cursor = 0;
  const codes: number[] = [];
  const additions: LzwAddition[] = [];

  while (cursor < input.length) {
    let end = cursor + 1;
    while (end <= input.length && dictionary.has(input.slice(cursor, end))) end += 1;
    end -= 1;
    const phrase = input.slice(cursor, end);
    codes.push(dictionary.get(phrase) ?? phrase.charCodeAt(0));
    if (end < input.length && nextCode < 4096) {
      const added = input.slice(cursor, end + 1);
      dictionary.set(added, nextCode);
      additions.push({ code: nextCode, phrase: added, emitted: phrase });
      nextCode += 1;
    }
    cursor = end;
  }
  codes.push(256);
  return { codes, additions };
}

function lzwDecode(codes: number[]) {
  const dictionary: string[] = Array.from({ length: 256 }, (_, code) => String.fromCharCode(code));
  dictionary[256] = "";
  let nextCode = 257;
  const first = codes[0];
  if (first === undefined || first === 256) return "";
  let value = dictionary[first];
  if (value === undefined) return "";
  let output = value;

  for (let index = 1; index < codes.length; index++) {
    const code = codes[index];
    if (code === 256) break;
    let phrase = dictionary[code];
    if (phrase === undefined && code === nextCode) phrase = value + value[0];
    if (phrase === undefined) return output;
    output += phrase;
    if (nextCode < 4096) dictionary[nextCode++] = value + phrase[0];
    value = phrase;
  }
  return output;
}

function isPrefixFree(table: Record<string, string>) {
  const entries = Object.entries(table);
  const conflicts: string[] = [];
  for (let left = 0; left < entries.length; left++) {
    for (let right = 0; right < entries.length; right++) {
      if (left === right) continue;
      if (entries[right][1].startsWith(entries[left][1])) {
        conflicts.push(`${entries[left][0]} prefix of ${entries[right][0]}`);
      }
    }
  }
  return { accepted: conflicts.length === 0, conflicts };
}

const samples = ["ABRACADABRA!", "TOBEORNOTTOBEORTOBEORNOT", "AAAAAAAAAAAABBBB", "ABCDEFGH"];

export function Algs4CompressionContractMap() {
  const [sample, setSample] = useState(samples[0]);
  const huffman = huffmanEncode(sample);
  const lzw = lzwEncode(sample);
  const originalBits = sample.length * 8;
  const distinct = frequencies(sample).size;
  const huffmanBits = huffman.payload.length + (10 * distinct - 1) + 32;
  const lzwBits = lzw.codes.length * 12;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">input sample<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={sample} onChange={(event) => setSample(event.target.value)}>{samples.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-border p-3"><div className="text-xs text-secondary">raw 8-bit</div><div className="font-mono text-primary">{originalBits} bits</div></div><div className="border border-accent p-3"><div className="text-xs text-secondary">Huffman + header</div><div className="font-mono text-accent">{huffmanBits} bits</div></div><div className="border border-warning p-3"><div className="text-xs text-secondary">LZW 12-bit</div><div className="font-mono text-warning">{lzwBits} bits</div></div></div>
        <div className="mt-3 border border-success p-3 text-xs text-success">round trip · Huffman {huffmanDecode(huffman.payload, huffman.root, sample.length) === sample ? "pass" : "fail"} · LZW {lzwDecode(lzw.codes) === sample ? "pass" : "fail"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compression contract是decode(encode(x)) = x；小input上header可能使compressed stream比raw更大。
      </figcaption>
    </figure>
  );
}

export function Algs4BinaryStreamLab() {
  const [width, setWidth] = useState(5);
  const [value, setValue] = useState(19);
  const boundedValue = value % (2 ** width);
  const bits = boundedValue.toString(2).padStart(width, "0");
  const padding = (8 - (width % 8)) % 8;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">bit width = {width}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label><label className="text-xs text-secondary">value = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex flex-wrap gap-1">{Array.from(bits).map((bit, index) => <div key={index} className="grid h-10 w-8 place-items-center border border-accent bg-accent/10 font-mono text-accent">{bit}</div>)}{Array.from({ length: padding }, (_, index) => <div key={`p-${index}`} className="grid h-10 w-8 place-items-center border border-dashed border-border font-mono text-secondary">0</div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs"><div className="border border-border p-3 text-secondary">represented value<div className="font-mono text-primary">{boundedValue}</div></div><div className="border border-warning p-3 text-warning">close padding<div className="font-mono">{padding} bits</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BinaryStdOut按指定width写high-order bits；close时补齐最后byte，因此decoder必须知道field framing。
      </figcaption>
    </figure>
  );
}

export function Algs4FixedLengthCodeLab() {
  const [alphabetSize, setAlphabetSize] = useState(5);
  const width = Math.ceil(Math.log2(alphabetSize));
  const capacity = 2 ** width;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">alphabet size R = {alphabetSize}<input className="mt-2 w-full accent-current" type="range" min="2" max="32" value={alphabetSize} onChange={(event) => setAlphabetSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-4 gap-1 sm:grid-cols-8">{Array.from({ length: capacity }, (_, index) => <div key={index} className={"border p-2 text-center font-mono text-xs " + (index < alphabetSize ? "border-success text-success" : "border-border text-secondary")}>{index.toString(2).padStart(width, "0")}</div>)}</div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">ceil(lg R) = {width} bits/symbol · unused codewords = {capacity - alphabetSize}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fixed-length code天然prefix-free；若symbol frequencies偏斜，equal-width code会浪费probability structure。
      </figcaption>
    </figure>
  );
}

export function Algs4RunLengthLab() {
  const [bits, setBits] = useState("0000000000000001111111000000011111111111");
  const [maximum, setMaximum] = useState(15);
  const runs = runLengthEncode(bits, maximum);
  const decoded = runLengthDecode(runs);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">binary input<select className="mt-2 w-full border border-border bg-background p-2 font-mono text-primary" value={bits} onChange={(event) => setBits(event.target.value)}><option value="0000000000000001111111000000011111111111">15×0, 7×1, 7×0, 11×1</option><option value="1111000011110000">starts with ones</option><option value="0101010101010101">alternating</option><option value="00000000000000000000">long zero run</option></select></label>
        <label className="mt-3 block text-xs text-secondary">demo max run = {maximum}<input className="mt-2 w-full accent-current" type="range" min="3" max="15" value={maximum} onChange={(event) => setMaximum(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-2">{runs.map((run, index) => <div key={index} className={"border p-3 text-center " + (index % 2 === 0 ? "border-accent text-accent" : "border-warning text-warning")}><div className="font-mono">{run}</div><div className="text-[9px]">{index % 2 === 0 ? "zeros" : "ones"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-xs " + (decoded === bits ? "border-success text-success" : "border-danger text-danger")}>decode = input · {decoded === bits ? "pass" : "fail"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Runs隐含交替0/1并从0-run开始；输入以1开头时first count为0，overflow用max、0维持bit parity。
      </figcaption>
    </figure>
  );
}

const codeTables = {
  "prefix-free": { A: "0", B: "10", C: "110", D: "111" },
  "prefix conflict": { A: "0", B: "01", C: "10", D: "11" },
  fixed: { A: "00", B: "01", C: "10", D: "11" },
};

export function Algs4PrefixCodeLab() {
  const [mode, setMode] = useState<keyof typeof codeTables>("prefix-free");
  const table = codeTables[mode];
  const result = isPrefixFree(table);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">code table<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as keyof typeof codeTables)}>{Object.keys(codeTables).map((name) => <option key={name}>{name}</option>)}</select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(table).map(([symbol, code]) => <div key={symbol} className="border border-border bg-background p-3 text-center"><div className="font-semibold text-primary">{symbol}</div><div className="font-mono text-accent">{code}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (result.accepted ? "border-success text-success" : "border-danger text-danger")}>{result.accepted ? "instantaneous decode: prefix-free" : result.conflicts.join(" · ")}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        No codeword可作为另一codeword的prefix时，decoder沿trie抵达leaf即可无lookahead切分。
      </figcaption>
    </figure>
  );
}

export function Algs4HuffmanMergeLab() {
  const [sample, setSample] = useState("ABRACADABRA!");
  const model = huffmanEncode(sample);
  const [step, setStep] = useState(0);
  const boundedStep = Math.min(step, Math.max(0, model.merges.length - 1));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">message<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={sample} onChange={(event) => { setSample(event.target.value); setStep(0); }}>{samples.slice(0, 3).map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="mt-3 block text-xs text-secondary">merge {boundedStep + 1} / {model.merges.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, model.merges.length - 1)} value={boundedStep} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{model.merges.map((merge, index) => <div key={merge.parent} className={"border p-3 text-xs " + (index === boundedStep ? "border-warning bg-warning/10 text-warning" : index < boundedStep ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono">{merge.left} + {merge.right}</div><div>{merge.parent} · freq {merge.frequency}</div></div>)}</div>
        <div className="mt-4 flex flex-wrap gap-2">{[...model.codes].map(([symbol, code]) => <div key={symbol} className="border border-accent p-2 font-mono text-xs text-accent">{symbol}: {code}</div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Huffman反复合并two minimum-frequency tries；leaf depth就是symbol code length。
      </figcaption>
    </figure>
  );
}

export function Algs4HuffmanStreamLab() {
  const [sample, setSample] = useState("ABRACADABRA!");
  const model = huffmanEncode(sample);
  const distinct = model.codes.size;
  const trieBits = 10 * distinct - 1;
  const lengthBits = 32;
  const decoded = huffmanDecode(model.payload, model.root, sample.length);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">Huffman stream<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={sample} onChange={(event) => setSample(event.target.value)}>{samples.slice(0, 3).map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="mt-4 grid grid-cols-[minmax(5rem,1fr)_minmax(5rem,1fr)_minmax(7rem,2fr)] text-center text-xs"><div className="border border-accent p-3 text-accent">preorder trie<div className="font-mono">{trieBits} bits</div></div><div className="border-y border-r border-border p-3 text-primary">original length<div className="font-mono">{lengthBits} bits</div></div><div className="border-y border-r border-warning p-3 text-warning">encoded payload<div className="font-mono">{model.payload.length} bits</div></div></div>
        <div className="mt-3 max-h-20 overflow-auto break-all border border-border bg-background p-3 font-mono text-[10px] text-secondary">{model.payload}</div>
        <div className={"mt-3 border p-3 text-xs " + (decoded === sample ? "border-success text-success" : "border-danger text-danger")}>tree + length + payload round trip · {decoded === sample ? "pass" : "fail"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Payload alone不可解码；official stream先写preorder trie，再写32-bit original length，最后写variable-length codes。
      </figcaption>
    </figure>
  );
}

export function Algs4LzwDictionaryLab() {
  const [sample, setSample] = useState("TOBEORNOTTOBEORTOBEORNOT");
  const encoded = useMemo(() => lzwEncode(sample), [sample]);
  const [step, setStep] = useState(0);
  const boundedStep = Math.min(step, Math.max(0, encoded.additions.length - 1));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">input<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={sample} onChange={(event) => { setSample(event.target.value); setStep(0); }}><option>TOBEORNOTTOBEORTOBEORNOT</option><option>ABABABA</option><option>AAAAAAAAAAAA</option></select></label>
        <label className="mt-3 block text-xs text-secondary">dictionary insertion {boundedStep + 1} / {encoded.additions.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, encoded.additions.length - 1)} value={boundedStep} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{encoded.additions.map((addition, index) => <div key={addition.code} className={"border p-3 text-xs " + (index === boundedStep ? "border-warning bg-warning/10 text-warning" : index < boundedStep ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono">{addition.code} → {addition.phrase}</div><div>after emit {addition.emitted}</div></div>)}</div>
        <div className="mt-3 border border-accent p-3 font-mono text-xs text-accent">12-bit codes · {encoded.codes.join(" · ")}</div>
        <div className={"mt-3 border p-3 text-xs " + (lzwDecode(encoded.codes) === sample ? "border-success text-success" : "border-danger text-danger")}>decoder dictionary lockstep · {lzwDecode(encoded.codes) === sample ? "pass" : "fail"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LZW emits longest dictionary prefix and inserts that prefix plus next character；decoder从code sequence重建同一dictionary。
      </figcaption>
    </figure>
  );
}

export function Algs4CompressionComparisonLab() {
  const [sample, setSample] = useState(samples[0]);
  const huffman = huffmanEncode(sample);
  const lzw = lzwEncode(sample);
  const binary = Array.from(sample, (symbol) => symbol.charCodeAt(0).toString(2).padStart(8, "0")).join("");
  const rle = runLengthEncode(binary);
  const values = [
    { name: "raw", bits: binary.length, tone: "bg-secondary" },
    { name: "RLE", bits: rle.length * 8, tone: "bg-warning" },
    { name: "Huffman", bits: huffman.payload.length + 10 * huffman.codes.size - 1 + 32, tone: "bg-accent" },
    { name: "LZW", bits: lzw.codes.length * 12, tone: "bg-success" },
  ];
  const maximum = Math.max(...values.map((value) => value.bits));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">workload<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={sample} onChange={(event) => setSample(event.target.value)}>{samples.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="mt-4 space-y-3">{values.map((value) => <div key={value.name} className="grid grid-cols-[5rem_1fr_5rem] items-center gap-2 text-xs"><span className="font-semibold text-primary">{value.name}</span><div className="h-4 border border-border bg-background"><div className={`h-full ${value.tone}`} style={{ width: `${(value.bits / maximum) * 100}%` }} /></div><span className="text-right font-mono text-secondary">{value.bits} bits</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compression ratio依赖workload与framing；RLE擅长long bit runs，Huffman利用symbol frequency，LZW利用repeated phrases。
      </figcaption>
    </figure>
  );
}

export function Algs4CompressionLimitLab() {
  const [bits, setBits] = useState(8);
  const inputs = 2 ** bits;
  const shorterOutputs = 2 ** bits - 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">all {bits}-bit inputs<input className="mt-2 w-full accent-current" type="range" min="2" max="16" value={bits} onChange={(event) => setBits(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-accent p-4 text-center"><div className="text-xs text-secondary">distinct inputs</div><div className="font-mono text-2xl text-accent">{inputs.toLocaleString()}</div></div><div className="border border-danger p-4 text-center"><div className="text-xs text-secondary">all outputs shorter than n</div><div className="font-mono text-2xl text-danger">{shorterOutputs.toLocaleString()}</div></div></div>
        <div className="mt-3 border border-warning p-3 text-xs text-warning">pigeonhole deficit = {inputs - shorterOutputs}; at least one n-bit input cannot map injectively to a shorter bitstring.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lossless compressor不能让every file strictly smaller；some inputs必须保持长度或膨胀。
      </figcaption>
    </figure>
  );
}

export function Algs4ErrorDetectionLab() {
  const payload = "1011010";
  const parity = Array.from(payload).filter((bit) => bit === "1").length % 2;
  const framed = `${payload}${parity}`;
  const [flip, setFlip] = useState(-1);
  const received = Array.from(framed, (bit, index) => index === flip ? bit === "0" ? "1" : "0" : bit).join("");
  const valid = Array.from(received).filter((bit) => bit === "1").length % 2 === 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">flip position<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={flip} onChange={(event) => setFlip(Number(event.target.value))}><option value={-1}>none</option>{Array.from(framed, (_, index) => <option key={index} value={index}>bit {index}</option>)}</select></label>
        <div className="mt-4 flex gap-1">{Array.from(received).map((bit, index) => <div key={index} className={"grid h-10 w-10 place-items-center border font-mono " + (index === flip ? "border-danger bg-danger/10 text-danger" : index === framed.length - 1 ? "border-warning text-warning" : "border-border text-primary")}>{bit}</div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? "even parity accepted" : "single-bit corruption detected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compression framing与integrity是不同责任；simple parity检测odd flips但不能定位或纠正，也漏掉even-number flips。
      </figcaption>
    </figure>
  );
}

type CompressionCertificateMode = "valid" | "truncated" | "wrong length" | "missing EOF";

export function Algs4CompressionCertificateLab() {
  const input = "ABRACADABRA!";
  const [mode, setMode] = useState<CompressionCertificateMode>("valid");
  const huffman = huffmanEncode(input);
  const lzw = lzwEncode(input);
  const huffmanPayload = mode === "truncated" ? huffman.payload.slice(0, -3) : huffman.payload;
  const expectedLength = mode === "wrong length" ? input.length - 1 : input.length;
  const lzwCodes = mode === "missing EOF" ? lzw.codes.slice(0, -1) : lzw.codes;
  const huffmanRoundTrip = huffmanDecode(huffmanPayload, huffman.root, expectedLength);
  const lzwRoundTrip = lzwDecode(lzwCodes);
  const framing = mode !== "missing EOF" && lzwCodes.at(-1) === 256;
  const accepted = huffmanRoundTrip === input && lzwRoundTrip === input && framing;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate stream<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as CompressionCertificateMode)}><option>valid</option><option>truncated</option><option>wrong length</option><option>missing EOF</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className={"border p-3 text-xs " + (huffmanRoundTrip === input ? "border-success text-success" : "border-danger text-danger")}>Huffman round trip<div className="font-mono">{huffmanRoundTrip === input ? "pass" : "mismatch"}</div></div><div className={"border p-3 text-xs " + (lzwRoundTrip === input ? "border-success text-success" : "border-danger text-danger")}>LZW round trip<div className="font-mono">{lzwRoundTrip === input ? "pass" : "mismatch"}</div></div><div className={"border p-3 text-xs " + (framing ? "border-success text-success" : "border-danger text-danger")}>EOF/framing<div className="font-mono">{framing ? "pass" : "missing"}</div></div></div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "certificate accepted" : "certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compression certificate要求byte-exact round trip、declared length/EOF framing与malformed-stream rejection；ratio不是correctness proof。
      </figcaption>
    </figure>
  );
}
