"use client";

import { useState } from "react";

const heapRegions = [
  {
    name: "SOH",
    full: "Small Object Heap",
    contents: "通常小于 85,000B 的普通对象",
    generations: "Gen 0 · Gen 1 · Gen 2",
    movement: "年轻代频繁收集；存活对象可提升并压缩移动",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    name: "LOH",
    full: "Large Object Heap",
    contents: "分配大小达到阈值的大对象/数组",
    generations: "逻辑上随 Gen 2 收集",
    movement: "默认避免频繁移动大块数据；可请求压缩",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    name: "POH",
    full: "Pinned Object Heap",
    contents: "创建时就声明固定的数组",
    generations: "逻辑上随 Gen 2 收集",
    movement: "不移动，隔离长期固定对象对普通压缩的阻碍",
    className: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function DnmHeapPartitionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="托管堆中 SOH、LOH 和 POH 的对象路由、逻辑代与移动策略" className="grid gap-3 lg:grid-cols-3">
          {heapRegions.map((region) => (
            <section key={region.name} className={`min-h-72 border p-4 ${region.className}`}>
              <span className="text-xs text-secondary">{region.full}</span>
              <strong className="mt-2 block text-lg text-primary">{region.name}</strong>
              <dl className="mt-5 space-y-4 text-xs">
                <div>
                  <dt className="text-secondary">对象路由</dt>
                  <dd className="mt-1 text-primary">{region.contents}</dd>
                </div>
                <div>
                  <dt className="text-secondary">收集关系</dt>
                  <dd className="mt-1 text-primary">{region.generations}</dd>
                </div>
                <div>
                  <dt className="text-secondary">移动策略</dt>
                  <dd className="mt-1 text-primary">{region.movement}</dd>
                </div>
              </dl>
            </section>
          ))}
        </div>
        <div className="mt-3 border border-violet-500/35 bg-violet-500/10 p-4 text-xs text-primary">
          每个逻辑 GC heap 由多个可保留/提交的 segment 组成；server GC 还可为多个 heap 分别维护这些结构。
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SOH/LOH/POH 是回收与移动策略分区，不等于整个进程只有三段连续内存；segment 才是运行时向操作系统管理的大块区域。
      </figcaption>
    </figure>
  );
}

export function DnmObjectRoutingLab() {
  const [payloadBytes, setPayloadBytes] = useState(64000);
  const [pinnedAtBirth, setPinnedAtBirth] = useState(false);

  const estimatedArraySize = payloadBytes + 24;
  const region = pinnedAtBirth ? "POH" : estimatedArraySize >= 85000 ? "LOH" : "SOH / Gen 0";
  const reason = pinnedAtBirth
    ? "GC.AllocateArray(..., pinned: true) 在创建时选择 POH；大小阈值不再决定 SOH/LOH。"
    : estimatedArraySize >= 85000
      ? "数组总分配大小达到大对象阈值，直接进入 LOH，并逻辑上按 Gen 2 对待。"
      : "普通小对象从 SOH 的年轻分配区域开始，通常先属于 Gen 0。";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">
              byte[] payload：{payloadBytes.toLocaleString()} bytes
              <input
                type="range"
                min="1000"
                max="140000"
                step="1000"
                value={payloadBytes}
                onChange={(event) => setPayloadBytes(Number(event.target.value))}
                className="mt-2 w-full accent-cyan-500"
              />
            </label>
            <label className="flex min-h-12 items-center gap-3 border border-border bg-background/60 px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={pinnedAtBirth}
                onChange={(event) => setPinnedAtBirth(event.target.checked)}
                className="size-4 accent-rose-500"
              />
              创建时固定（pinned at allocation）
            </label>
            <p className="mb-0 text-xs text-secondary">
              模型用 24B 近似数组头说明“阈值看总对象大小”；实际头部、对齐和阈值应以目标运行时验证。
            </p>
          </div>

          <section aria-live="polite" className="min-h-72 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">estimated object size</span>
            <strong className="mt-2 block text-lg text-primary">{estimatedArraySize.toLocaleString()} bytes</strong>
            <div className="mt-5 border border-emerald-500/40 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">route</span>
              <strong className="mt-2 block text-xl text-primary">{region}</strong>
            </div>
            <p className="mb-0 mt-5 text-xs text-secondary">{reason}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测大小与创建时固定哪个条件优先，再调整验证；事后用 GCHandle pin 普通对象不会把它迁移进 POH。
      </figcaption>
    </figure>
  );
}

const generations = [
  { id: 0, name: "Gen 0", policy: "新普通小对象", color: "border-cyan-500/40 bg-cyan-500/10" },
  { id: 1, name: "Gen 1", policy: "年轻与长期之间的缓冲", color: "border-amber-500/40 bg-amber-500/10" },
  { id: 2, name: "Gen 2", policy: "多次存活的长期对象", color: "border-violet-500/40 bg-violet-500/10" },
] as const;

export function DnmGenerationLifecycleLab() {
  const [collectionsSurvived, setCollectionsSurvived] = useState(0);
  const [stillReachable, setStillReachable] = useState(true);
  const generation = Math.min(collectionsSurvived, 2);

  function collectYoung() {
    if (!stillReachable) return;
    setCollectionsSurvived((current) => Math.min(current + 1, 2));
  }

  function reset() {
    setCollectionsSurvived(0);
    setStillReachable(true);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="group" aria-label="控制对象的可达性和模拟回收" className="grid grid-cols-3 gap-2">
          <button type="button" onClick={collectYoung} className="min-h-11 border border-cyan-500 bg-cyan-500/15 px-3 py-2 text-sm text-primary">
            模拟存活一次
          </button>
          <button
            type="button"
            onClick={() => setStillReachable(false)}
            className="min-h-11 border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-sm text-primary"
          >
            移除根路径
          </button>
          <button type="button" onClick={reset} className="min-h-11 border border-border bg-background px-3 py-2 text-sm text-secondary hover:text-primary">
            重置
          </button>
        </div>

        <div role="img" aria-label="对象从 Gen 0 存活并晋升到 Gen 1 和 Gen 2 的概念流程" className="mt-4 grid gap-3 sm:grid-cols-3">
          {generations.map((item) => (
            <section key={item.id} className={`min-h-40 border p-4 ${item.color} ${generation === item.id && stillReachable ? "ring-2 ring-accent" : "opacity-60"}`}>
              <span className="text-xs text-secondary">generation {item.id}</span>
              <strong className="mt-2 block text-base text-primary">{item.name}</strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.policy}</p>
            </section>
          ))}
        </div>

        <section aria-live="polite" className="mt-4 min-h-24 border border-border bg-background/60 p-4">
          <strong className="text-sm text-primary">
            {stillReachable ? `对象仍可达，当前概念代：Gen ${generation}` : "对象已不可达，可在覆盖其所在代的未来回收中被清除"}
          </strong>
          <p className="mb-0 mt-2 text-xs text-secondary">
            晋升发生在对象被实际收集并存活后，不随墙上时间自动增长；Gen 0 回收也不要求扫描全部 Gen 2 对象。
          </p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击前先预测“存活一次”和“仅仅等待”哪个会改变代；代是回收历史与策略，不是对象年龄计时器。
      </figcaption>
    </figure>
  );
}
