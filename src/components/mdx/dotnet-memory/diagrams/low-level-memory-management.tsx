"use client";

import { useMemo, useState } from "react";

const translationStages = [
  {
    label: "virtual address",
    detail: "process-local page number + offset",
    evidence: "每个进程看到自己的连续地址空间",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    label: "TLB / page table",
    detail: "virtual page -> physical frame",
    evidence: "TLB 命中快；未映射或不驻留会触发异常",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    label: "physical memory",
    detail: "frame number + original offset",
    evidence: "多个不连续物理页可组成连续虚拟区间",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    label: "cache hierarchy",
    detail: "cache line enters L1 / L2 / LLC",
    evidence: "CPU 实际按缓存行搬运邻近字节",
    className: "border-violet-500/35 bg-violet-500/10",
  },
] as const;

export function DnmAddressTranslationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="CPU 从进程虚拟地址经过 TLB 和页表得到物理页，再从缓存层次读取缓存行的地址翻译流程"
          className="grid gap-3 lg:grid-cols-4"
        >
          {translationStages.map((stage, index) => (
            <section key={stage.label} className={`min-h-52 border p-4 ${stage.className}`}>
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{stage.label}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{stage.detail}</code>
              <p className="mb-0 mt-4 border-t border-border pt-3 text-xs text-secondary">{stage.evidence}</p>
            </section>
          ))}
        </div>
        <div className="mt-3 border border-rose-500/35 bg-rose-500/10 p-4 text-xs text-primary">
          page not present → page fault → OS 建立映射、调入页面或拒绝访问 → 指令重试/异常
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        托管引用最终仍要经过虚拟地址翻译和缓存层次；GC 的分段、压缩与局部性优化都受这条硬件路径约束。
      </figcaption>
    </figure>
  );
}

type AccessMode = "sequential" | "strided" | "scattered";

const accessModes: Array<{
  id: AccessMode;
  label: string;
  rule: string;
  prediction: string;
}> = [
  {
    id: "sequential",
    label: "连续",
    rule: "index = i",
    prediction: "相邻 long 共用同一缓存行",
  },
  {
    id: "strided",
    label: "跨行",
    rule: "index = i * 8",
    prediction: "每次访问落到下一条 64B 缓存行",
  },
  {
    id: "scattered",
    label: "离散",
    rule: "index = permutation[i]",
    prediction: "预取困难，缓存行复用取决于工作集",
  },
];

function accessIndices(mode: AccessMode) {
  if (mode === "sequential") return Array.from({ length: 64 }, (_, index) => index);
  if (mode === "strided") return Array.from({ length: 64 }, (_, index) => index * 8);
  return Array.from({ length: 64 }, (_, index) => (index * 73 + 19) % 512);
}

export function DnmCacheLocalityLab() {
  const [mode, setMode] = useState<AccessMode>("sequential");
  const indices = useMemo(() => accessIndices(mode), [mode]);
  const touchedLines = new Set(indices.map((index) => Math.floor(index / 8))).size;
  const current = accessModes.find((item) => item.id === mode) ?? accessModes[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 long 数组访问模式" className="grid grid-cols-3 gap-2">
          {accessModes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={mode === item.id}
              onClick={() => setMode(item.id)}
              className={`min-h-11 border px-3 py-2 text-sm transition-colors ${
                mode === item.id
                  ? "border-cyan-500 bg-cyan-500/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border border-cyan-500/35 bg-cyan-500/10 p-3">
              <span className="text-xs text-secondary">64 次读取</span>
              <strong className="mt-2 block text-lg text-primary">{touchedLines} lines</strong>
            </div>
            <div className="border border-emerald-500/35 bg-emerald-500/10 p-3">
              <span className="text-xs text-secondary">每个元素</span>
              <strong className="mt-2 block text-lg text-primary">8 bytes</strong>
            </div>
            <div className="border border-amber-500/35 bg-amber-500/10 p-3">
              <span className="text-xs text-secondary">假定缓存行</span>
              <strong className="mt-2 block text-lg text-primary">64 bytes</strong>
            </div>
          </div>

          <div role="img" aria-label="当前访问模式触达的前 16 个缓存行" className="mt-4 grid grid-cols-8 gap-1 sm:grid-cols-[repeat(16,minmax(0,1fr))]">
            {Array.from({ length: 16 }, (_, line) => {
              const count = indices.filter((index) => Math.floor(index / 8) === line).length;
              return (
                <div
                  key={line}
                  className={`flex aspect-square items-center justify-center border text-xs ${
                    count > 0
                      ? "border-emerald-500/50 bg-emerald-500/20 text-primary"
                      : "border-border bg-background text-secondary"
                  }`}
                  title={`cache line ${line}: ${count} accesses`}
                >
                  {count || "·"}
                </div>
              );
            })}
          </div>

          <code className="mt-5 block text-xs text-accent">{current.rule}</code>
          <p className="mb-0 mt-3 text-xs text-secondary">{current.prediction}</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测三种模式会触达多少缓存行，再切换验证；这里是 64B 缓存行下的概念模型，不替代目标 CPU 上的基准测试。
      </figcaption>
    </figure>
  );
}

export function DnmReserveCommitLab() {
  const [reservedMb, setReservedMb] = useState(4096);
  const [committedMb, setCommittedMb] = useState(1024);
  const [residentMb, setResidentMb] = useState(640);

  function updateReserved(next: number) {
    setReservedMb(next);
    setCommittedMb((current) => Math.min(current, next));
    setResidentMb((current) => Math.min(current, next));
  }

  function updateCommitted(next: number) {
    setCommittedMb(next);
    setResidentMb((current) => Math.min(current, next));
  }

  const freeVirtual = reservedMb - committedMb;
  const committedNotResident = committedMb - residentMb;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">
              保留地址空间：{reservedMb} MB
              <input
                type="range"
                min="512"
                max="8192"
                step="512"
                value={reservedMb}
                onChange={(event) => updateReserved(Number(event.target.value))}
                className="mt-2 w-full accent-cyan-500"
              />
            </label>
            <label className="block text-sm text-primary">
              已提交：{committedMb} MB
              <input
                type="range"
                min="0"
                max={reservedMb}
                step="128"
                value={committedMb}
                onChange={(event) => updateCommitted(Number(event.target.value))}
                className="mt-2 w-full accent-emerald-500"
              />
            </label>
            <label className="block text-sm text-primary">
              当前驻留：{residentMb} MB
              <input
                type="range"
                min="0"
                max={committedMb}
                step="64"
                value={residentMb}
                onChange={(event) => setResidentMb(Number(event.target.value))}
                className="mt-2 w-full accent-amber-500"
              />
            </label>
          </div>

          <section aria-live="polite" className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">process memory states</span>
            <div className="mt-4 space-y-3 text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3">
                <strong className="text-primary">reserved · {reservedMb} MB</strong>
                <p className="mb-0 mt-2 text-secondary">其中 {freeVirtual} MB 只有地址范围，没有提交后备存储。</p>
              </div>
              <div className="border border-emerald-500/35 bg-emerald-500/10 p-3">
                <strong className="text-primary">committed · {committedMb} MB</strong>
                <p className="mb-0 mt-2 text-secondary">系统承诺可提供后备存储，但不保证每页此刻都在 RAM。</p>
              </div>
              <div className="border border-amber-500/35 bg-amber-500/10 p-3">
                <strong className="text-primary">resident · {residentMb} MB</strong>
                <p className="mb-0 mt-2 text-secondary">另有 {committedNotResident} MB 已提交但当前未驻留。</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调整三种口径并观察包含关系；虚拟地址保留、提交承诺和当前驻留不是同一个“内存占用”数字。
      </figcaption>
    </figure>
  );
}
