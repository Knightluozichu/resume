"use client";

import { useState } from "react";

type DeliveryShape = "split-header" | "split-body" | "coalesced";

const DELIVERY: Record<DeliveryShape, { chunks: number[][]; note: string }> = {
  "split-header": { chunks: [[0, 0], [0, 5, 72, 69, 76, 76, 79]], note: "4-byte length header 被拆成两次 recv" },
  "split-body": { chunks: [[0, 0, 0, 5, 72, 69], [76, 76, 79]], note: "header 完整，但 body 跨 recv 才到齐" },
  coalesced: { chunks: [[0, 0, 0, 5, 72, 69, 76, 76, 79, 0, 0, 0, 2, 79, 75]], note: "两帧被一次 recv 合并交付" },
};

export function CseStreamFramingLab() {
  const [shape, setShape] = useState<DeliveryShape>("split-body");
  const [receivedChunks, setReceivedChunks] = useState(1);
  const selected = DELIVERY[shape];
  const available = selected.chunks.slice(0, receivedChunks).flat();
  const declaredLength = available.length >= 4 ? (((available[0] << 24) | (available[1] << 16) | (available[2] << 8) | available[3]) >>> 0) : null;
  const complete = declaredLength !== null && available.length >= 4 + declaredLength;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid min-h-[25rem] gap-4 lg:grid-cols-[0.88fr_1.12fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-3 border border-border" role="group" aria-label="TCP 交付形态">{(["split-header", "split-body", "coalesced"] as const).map((item, index) => <button key={item} type="button" aria-pressed={shape === item} onClick={() => { setShape(item); setReceivedChunks(1); }} className={`min-h-12 px-1 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${shape === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><span className="block text-sm text-secondary">{selected.note}</span><div className="space-y-2">{selected.chunks.map((chunk, index) => <button key={index} type="button" onClick={() => setReceivedChunks(index + 1)} className={`block min-h-12 w-full border p-2 text-left text-xs ${receivedChunks >= index + 1 ? "border-cyan-500/50 bg-cyan-500/10 text-primary" : "border-border text-secondary"}`}>recv #{index + 1}: [{chunk.join(", ")}]</button>)}</div></section><section className={`border p-4 ${complete ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">incremental decoder</span><h3 className="mt-3 text-base font-semibold text-primary">{declaredLength === null ? "header 不完整：继续累积" : complete ? `完整 frame：length=${declaredLength}` : `body 不完整：需要 ${4 + declaredLength - available.length} bytes`}</h3><div className="mt-5 flex min-h-16 flex-wrap content-start gap-1 border border-border bg-bg p-3">{available.map((byte, index) => <span key={index} className={`flex h-9 w-9 items-center justify-center border text-xs ${index < 4 ? "border-cyan-500/50 bg-cyan-500/10 text-primary" : "border-border text-secondary"}`}>{byte}</span>)}</div><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{`append(received_bytes);\nif (buffer.size() < 4) wait;\nlength = read_u32_be(buffer);\nif (length > MAX_FRAME) reject;\nif (buffer.size() < 4 + length) wait;\ndispatch(extract_frame(length));\nrepeat_for_remaining_bytes();`}</code></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">TCP 只交付有序 byte stream：header/body 可拆分，多帧可合并；decoder 必须增量累积并循环提取完整 frame。</figcaption>
    </figure>
  );
}

type WireFormat = "raw-struct" | "fixed-fields" | "TLV";

export function CseProtocolEvolutionLab() {
  const [format, setFormat] = useState<WireFormat>("TLV");
  const [readerVersion, setReaderVersion] = useState<1 | 2>(1);
  const [unknownField, setUnknownField] = useState(true);
  const [littleEndianWriter, setLittleEndianWriter] = useState(true);

  const compatible = format === "TLV" ? true : format === "fixed-fields" ? readerVersion === 2 || !unknownField : readerVersion === 2 && littleEndianWriter;
  const reason = format === "raw-struct"
    ? "padding、ABI、native endian 和字段布局泄漏到 wire"
    : format === "fixed-fields"
      ? "固定顺序可控，但插入/删除字段会改变后续 offset"
      : "tag/type/length 允许旧 reader 跳过未知字段";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid min-h-[24rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-3 border border-border" role="group" aria-label="协议编码格式">{(["raw-struct", "fixed-fields", "TLV"] as const).map((item, index) => <button key={item} type="button" aria-pressed={format === item} onClick={() => setFormat(item)} className={`min-h-12 px-1 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${format === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><div className="grid grid-cols-2 border border-border" role="group" aria-label="读取端版本">{([1, 2] as const).map((item, index) => <button key={item} type="button" aria-pressed={readerVersion === item} onClick={() => setReaderVersion(item)} className={`min-h-11 text-sm ${index === 0 ? "border-r border-border" : ""} ${readerVersion === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>reader v{item}</button>)}</div><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={unknownField} onChange={(event) => setUnknownField(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />writer v2 新增 field 9</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={littleEndianWriter} onChange={(event) => setLittleEndianWriter(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />writer host 为 little-endian</label></section><section className={`border p-4 ${compatible ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">old-reader compatibility</span><h3 className="mt-3 text-base font-semibold text-primary">{compatible ? "reader 可安全处理或跳过新增字段" : "wire layout 与 reader 假设冲突"}</h3><p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{reason}</p><div className="mt-4 grid gap-2 sm:grid-cols-4">{format === "TLV" ? ["tag=1", "type=u32", "len=4", unknownField ? "tag=9 skip" : "value"].map((item) => <div key={item} className="min-h-16 border border-border bg-bg p-3 text-xs text-primary">{item}</div>) : ["id", "flags", unknownField ? "new field" : "payload", "native padding"].map((item) => <div key={item} className="min-h-16 border border-border bg-bg p-3 text-xs text-primary">{item}</div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">稳定协议还要固定 integer width、network byte order、length limit、required/optional semantics 和 version negotiation；TLV 不是无限兼容许可证。</p></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从 raw struct 演化到显式字段/TLV，是把 ABI 偶然布局替换为可版本化 wire contract。</figcaption>
    </figure>
  );
}

type AppProtocol = "HTTP" | "WebSocket" | "SMTP" | "POP3";

const PROTOCOLS: Record<AppProtocol, { stages: string[]; sample: string; invariant: string }> = {
  HTTP: { stages: ["request line", "headers", "body framing", "response", "reuse/close"], sample: "GET /items HTTP/1.1\r\nHost: api.example\r\n\r\n", invariant: "Content-Length/chunked/close 三种 body 边界不能混淆" },
  WebSocket: { stages: ["HTTP Upgrade", "101 response", "frame header", "mask/payload", "close frame"], sample: "GET /chat HTTP/1.1\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n...", invariant: "client→server frame 必须 mask，message 可跨多个 fragments" },
  SMTP: { stages: ["220 greeting", "EHLO", "MAIL FROM", "RCPT TO", "DATA / .", "QUIT"], sample: "EHLO client.example\r\nMAIL FROM:<a@example>\r\nRCPT TO:<b@example>\r\n", invariant: "逐行 reply code 驱动状态，DATA 用 terminator 与 dot-stuffing" },
  POP3: { stages: ["+OK greeting", "USER/PASS", "STAT/LIST", "RETR", "DELE", "QUIT"], sample: "USER alice\r\nPASS secret\r\nLIST\r\n", invariant: "authorization、transaction、update 三阶段决定命令合法性" },
};

export function CseApplicationProtocolLab() {
  const [protocol, setProtocol] = useState<AppProtocol>("HTTP");
  const [stage, setStage] = useState(0);
  const [compression, setCompression] = useState(false);
  const selected = PROTOCOLS[protocol];
  const currentStage = Math.min(stage, selected.stages.length - 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="应用协议">{(Object.keys(PROTOCOLS) as AppProtocol[]).map((item, index) => <button key={item} type="button" aria-pressed={protocol === item} onClick={() => { setProtocol(item); setStage(0); }} className={`min-h-11 border-b border-border text-sm ${index % 2 === 0 ? "border-r" : ""} ${protocol === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="block text-sm text-primary">protocol stage: <strong>{currentStage + 1}/{selected.stages.length}</strong><input type="range" min="0" max={selected.stages.length - 1} value={currentStage} onChange={(event) => setStage(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={compression} onChange={(event) => setCompression(event.target.checked)} disabled={protocol !== "HTTP" && protocol !== "WebSocket"} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-40" />协商 compression</label></section><section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">{protocol} parser state</span><h3 className="mt-3 text-base font-semibold text-primary">{selected.stages[currentStage]}</h3><div className="mt-4 flex flex-wrap gap-2">{selected.stages.map((item, index) => <span key={item} className={`border px-2 py-2 text-xs ${index === currentStage ? "border-cyan-500/50 bg-cyan-500/20 text-primary" : index < currentStage ? "border-emerald-500/40 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>{item}</span>)}</div><code className="mt-4 block min-h-28 whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{selected.sample}</code><p className="mt-4 text-sm leading-7 text-secondary">{selected.invariant}{compression && (protocol === "HTTP" || protocol === "WebSocket") ? "；compression 必须先协商并设置解压上限，防止资源放大。" : "。"}</p></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">HTTP、WebSocket、SMTP 与 POP3 都是 TCP 上的增量状态机；行、header、length、chunk、frame 或 terminator 定义各自边界。</figcaption>
    </figure>
  );
}
