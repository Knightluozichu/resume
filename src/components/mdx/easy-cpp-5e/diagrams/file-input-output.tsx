const pipeline = [
  { stage: "path", artifact: "workdir / scores.txt", evidence: "resolved absolute path" },
  { stage: "open", artifact: "ofstream(app/trunc)", evidence: "stream truth state" },
  { stage: "format", artifact: "name score\\n", evidence: "operation state" },
  { stage: "persist", artifact: "close -> file bytes", evidence: "reopen and compare" },
] as const;

export function EcpFileIoPipelineMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="文件输出从解析路径、打开模式、格式化写入到关闭重读的证据链" className="grid gap-2 sm:grid-cols-4">{pipeline.map((row,index)=><section key={row.stage} className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-3"><span className="text-xs text-secondary">0{index+1} · {row.stage}</span><code className="mt-3 block break-words text-xs text-accent">{row.artifact}</code><strong className="mt-4 block text-xs text-primary">{row.evidence}</strong></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">打开成功只是路径证据；操作状态、关闭和重新读取共同证明文件契约。</figcaption></figure>;
}

const states = [
  { event: "record parsed", good: "true", eof: "false", fail: "false", action: "process" },
  { event: "normal end", good: "false", eof: "true", fail: "true", action: "finish" },
  { event: "invalid integer", good: "false", eof: "false", fail: "true", action: "report line" },
  { event: "device error", good: "false", eof: "maybe", fail: "true / bad", action: "abort I/O" },
] as const;

export function EcpFileIoStateFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-x-auto rounded-card border border-border bg-elevated p-4 sm:p-5"><table aria-label="文件输入成功、正常末尾、格式错误和设备错误的流状态与处理" className="w-full min-w-[720px] border-collapse text-left text-xs"><thead><tr className="border-b border-border text-secondary"><th className="p-3">event</th><th className="p-3">good</th><th className="p-3">eof</th><th className="p-3">fail/bad</th><th className="p-3">action</th></tr></thead><tbody>{states.map((row)=><tr key={row.event} className="border-b border-border/70 last:border-0"><th className="p-3 text-primary">{row.event}</th><td className="p-3 text-accent">{row.good}</td><td className="p-3 text-accent">{row.eof}</td><td className="p-3 text-accent">{row.fail}</td><td className="p-3 text-secondary">{row.action}</td></tr>)}</tbody></table></div><figcaption className="mt-2 text-center text-sm text-secondary">循环条件只回答是否得到完整记录；退出后组合状态才能区分正常 EOF、格式失败与底层错误。</figcaption></figure>;
}

const roundTrips = [
  { fixture: "2 valid records", expected: "same 2 objects", verdict: "round trip" },
  { fixture: "missing file", expected: "open rejected", verdict: "path error" },
  { fixture: "Kai unknown", expected: "line 2 invalid", verdict: "format error" },
  { fixture: "append twice", expected: "4 records", verdict: "mode proof" },
] as const;

export function EcpFileIoRoundTripLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="合法往返、缺失文件、格式错误和追加模式四个文件输入输出实验" className="grid gap-3 sm:grid-cols-2">{roundTrips.map((trial,index)=><section key={trial.fixture} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.fixture}</code><strong className="mt-3 block text-xs text-primary">{trial.expected}</strong><span className="mt-3 block text-xs text-secondary">{trial.verdict}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">往返验证读写契约一致，故障样例验证路径、格式和模式能被准确分类。</figcaption></figure>;
}
