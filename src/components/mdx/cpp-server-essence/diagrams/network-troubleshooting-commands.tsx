"use client";

import { useState } from "react";

type Symptom = "no-route" | "refused" | "timeout" | "http-error" | "slow";

const DIAGNOSIS: Record<Symptom, { hypothesis: string; commands: string[]; proof: string }> = {
  "no-route": { hypothesis: "interface/address/route 不成立", commands: ["ip addr / ifconfig", "ip route", "ping gateway"], proof: "先证明本机是否拥有预期地址和出站路径" },
  refused: { hypothesis: "目标可达但 port 无 listener，或被主动 reject", commands: ["nc -vz host port", "ss -lntp / netstat", "lsof -i :port"], proof: "把 remote tuple 与 server listener/process 对齐" },
  timeout: { hypothesis: "packet 被 drop、路径丢失或 service 无响应", commands: ["ping", "nc -vz -w 3", "tcpdump both ends"], proof: "区分 SYN 未达、SYN-ACK 未回与 application stall" },
  "http-error": { hypothesis: "TCP/TLS 成功，application 返回错误", commands: ["curl -v", "curl --resolve", "tcpdump metadata"], proof: "保留 DNS、connect、TLS、headers 与 response timing" },
  slow: { hypothesis: "DNS/connect/TLS/TTFB/body 某阶段变慢", commands: ["curl -w timings", "ss -ti", "tcpdump timestamps"], proof: "用阶段时间和 retransmission 取代主观慢" },
};

export function CseDiagnosisEvidenceLab() {
  const [symptom, setSymptom] = useState<Symptom>("timeout");
  const [serverSide, setServerSide] = useState(true);
  const selected = DIAGNOSIS[symptom];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-1 border border-border sm:grid-cols-2" role="group" aria-label="网络故障症状">
              {(Object.keys(DIAGNOSIS) as Symptom[]).map((item, index) => <button key={item} type="button" aria-pressed={symptom === item} onClick={() => setSymptom(item)} className={`min-h-11 border-b border-border px-3 text-left text-sm ${index % 2 === 0 ? "sm:border-r" : ""} ${index === 4 ? "sm:col-span-2 sm:border-r-0" : ""} ${symptom === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={serverSide} onChange={(event) => setServerSide(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />可登录 server 对照取证</label>
          </section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">current hypothesis</span><h3 className="mt-3 text-base font-semibold text-primary">{selected.hypothesis}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3">{selected.commands.map((command, index) => <div key={command} className="min-h-24 border border-border bg-bg p-3 text-sm leading-6 text-primary"><span className="text-xs text-secondary">0{index + 1}</span><code className="mt-2 block whitespace-pre-wrap">{command}</code></div>)}</div><p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{selected.proof}{serverSide ? "；客户端和服务端同时记录时间、五元组与命令输出。" : "；当前只有客户端证据，结论需保留不确定性。"}</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先写 hypothesis，再选择能证伪它的最小命令链；命令输出必须与时间、方向和连接五元组绑定。</figcaption>
    </figure>
  );
}

type SocketState = "LISTEN" | "ESTABLISHED" | "TIME_WAIT";

export function CseSocketOwnershipLab() {
  const [state, setState] = useState<SocketState>("LISTEN");
  const [port, setPort] = useState(8080);
  const [showProcess, setShowProcess] = useState(true);
  const meaning = state === "LISTEN" ? "本地 endpoint 正在接受新连接" : state === "ESTABLISHED" ? "双方 byte stream 已建立，可继续检查队列与进程" : "主动关闭端保留旧四元组，通常不是 listener 泄漏";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[23rem] gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-3 border border-border" role="group" aria-label="TCP socket 状态">{(["LISTEN", "ESTABLISHED", "TIME_WAIT"] as const).map((item, index) => <button key={item} type="button" aria-pressed={state === item} onClick={() => setState(item)} className={`min-h-11 px-1 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${state === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="block text-sm text-primary">port: <strong>{port}</strong><input type="range" min="1024" max="9999" value={port} onChange={(event) => setPort(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={showProcess} onChange={(event) => setShowProcess(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />显示 PID/program</label></section>
          <section className="border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">socket → process correlation</span><h3 className="mt-3 text-base font-semibold text-primary">{meaning}</h3><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-7 text-primary">{`$ ss -${state === "LISTEN" ? "l" : ""}nt${showProcess ? "p" : ""} 'sport = :${port}'\n${state} 0 0 ${state === "LISTEN" ? "0.0.0.0" : "10.0.0.8"}:${port}${state === "LISTEN" ? " 0.0.0.0:*" : " 10.0.0.9:52314"}${showProcess ? ' users:(("server",pid=4242,fd=7))' : ""}\n\n$ lsof -nP -iTCP:${port}${state === "LISTEN" ? " -sTCP:LISTEN" : ""}`}</code><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">local tuple</span><strong className="mt-2 block text-sm text-primary">:{port}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">state</span><strong className="mt-2 block text-sm text-primary">{state}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">owner</span><strong className="mt-2 block text-sm text-primary">{showProcess ? "pid 4242 / fd 7" : "privilege required"}</strong></div></div></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">ss/netstat 证明 socket tuple 与 TCP state，lsof 把 endpoint 关联到进程和 fd；两类证据回答不同问题。</figcaption>
    </figure>
  );
}

type CaptureFocus = "handshake" | "reset" | "retransmit" | "http";

const FILTERS: Record<CaptureFocus, { filter: string; expected: string }> = {
  handshake: { filter: "tcp port 443 and host 10.0.0.9", expected: "SYN → SYN/ACK → ACK，随后 TLS records" },
  reset: { filter: "tcp[tcpflags] & tcp-rst != 0", expected: "识别谁发送 RST，并关联其前一报文与 seq/ack" },
  retransmit: { filter: "tcp port 8080", expected: "按 timestamp/seq 查重复 segment、duplicate ACK 与 RTO" },
  http: { filter: "tcp port 8080 and host 10.0.0.9", expected: "明文环境可关联 request/response；TLS 只观察 metadata" },
};

export function CsePacketCapturePlanLab() {
  const [focus, setFocus] = useState<CaptureFocus>("handshake");
  const [snapLength, setSnapLength] = useState(128);
  const [writeFile, setWriteFile] = useState(true);
  const selected = FILTERS[focus];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="抓包目标">{(Object.keys(FILTERS) as CaptureFocus[]).map((item, index) => <button key={item} type="button" aria-pressed={focus === item} onClick={() => setFocus(item)} className={`min-h-11 border-b border-border text-sm ${index % 2 === 0 ? "border-r" : ""} ${focus === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="block text-sm text-primary">snaplen: <strong>{snapLength} bytes</strong><input type="range" min="64" max="512" step="64" value={snapLength} onChange={(event) => setSnapLength(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={writeFile} onChange={(event) => setWriteFile(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />写入受控 pcap 文件</label></section><section className="border border-amber-500/40 bg-amber-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">least-privilege capture plan</span><h3 className="mt-3 text-base font-semibold text-primary">{selected.expected}</h3><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-7 text-primary">{`sudo tcpdump -i any -nn -s ${snapLength} \\\n  '${selected.filter}'${writeFile ? " \\\n  -w /secure/inc-042.pcap" : ""}`}</code><div className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">过滤 host/port/direction，限制时间、snaplen 与文件权限。pcap 可能包含 credentials、tokens 和业务 payload；只收集验证 hypothesis 所需的最小数据，并按 incident policy 清理。</div></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">tcpdump 计划同时定义观察目标、BPF filter、snaplen、保存方式和敏感数据边界，避免“先全量抓再说”。</figcaption>
    </figure>
  );
}
