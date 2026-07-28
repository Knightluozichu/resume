"use client";

import { useState } from "react";

const accessRows = [
  { grant: "friend function", scope: "one named nonmember", receives: "private/protected access", doesNot: "membership or transitive friendship" },
  { grant: "friend class", scope: "all members of named class", receives: "private/protected access", doesNot: "reverse friendship" },
  { grant: "friend member", scope: "one member of another class", receives: "narrow collaboration", doesNot: "other members' access" },
  { grant: "nested class", scope: "name inside enclosing class scope", receives: "member-like access rules", doesNot: "automatic outer object" },
] as const;

export function EppFriendAccessMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="友元函数友元类友元成员和嵌套类的访问授权地图" className="grid gap-3 lg:grid-cols-4">
          {accessRows.map((row, index) => (
            <section key={row.grant} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">grant 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.grant}</strong>
              <code className="mt-4 block break-words text-xs text-accent">scope · {row.scope}</code>
              <p className="mt-4 text-xs text-primary">gets · {row.receives}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">not · {row.doesNot}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        friendship 是具名授权，不继承、不传递、也不自动对称；优先选择能完成协作的最窄粒度。
      </figcaption>
    </figure>
  );
}

const unwindRows = [
  { stage: "throw site", frame: "parse() locals", action: "create exception object", lifetime: "destroy completed automatic objects" },
  { stage: "caller frame", frame: "load() locals", action: "no matching catch", lifetime: "RAII members release in reverse order" },
  { stage: "matching handler", frame: "run() catch", action: "bind const reference", lifetime: "exception object remains alive" },
  { stage: "recovery boundary", frame: "application policy", action: "translate/log/rethrow", lifetime: "invariants restored before continue" },
] as const;

export function EppExceptionUnwindFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="异常从抛出点跨调用帧栈展开到匹配处理器的流程" className="space-y-3">
          {unwindRows.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.75fr_1fr_1.1fr_1.3fr] lg:items-center">
              <div><span className="text-xs text-secondary">unwind 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <code className="break-words text-xs text-accent">frame · {row.frame}</code>
              <span className="text-xs text-primary">action · {row.action}</span>
              <span className="text-xs text-secondary">lifetime · {row.lifetime}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        栈展开只自动清理已经成功构造的自动/RAII 对象；裸资源若未交给对象，跨 throw 仍会泄漏。
      </figcaption>
    </figure>
  );
}
