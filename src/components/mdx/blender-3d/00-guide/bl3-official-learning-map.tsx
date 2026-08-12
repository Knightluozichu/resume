"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const BEAT = TEACHING_BEAT_MS;

const PIPELINE = [
  { id: "design", label: "设计", output: "剪影、比例、参考图" },
  { id: "mesh", label: "建模", output: "可变形网格与拓扑" },
  { id: "surface", label: "表面", output: "UV、纹理、材质" },
  { id: "motion", label: "运动", output: "Rig、权重、Action" },
  { id: "final", label: "合成", output: "解算、灯光、渲染" },
] as const;

const PIPELINE_STEPS: readonly TeachingStep[] = PIPELINE.map((item) => ({
  label: item.id,
  caption: `${item.label}阶段：${item.output}`,
}));

const ASSET_ROWS = [
  ["设计稿", "输入", "锁定剪影与比例", "参考图"],
  ["参考图", "约束", "校验正侧视一致性", "网格"],
  ["网格", "结构", "检查拓扑与变形环", "UV"],
  ["UV / 纹理", "表面", "确认图像路径与色彩空间", "材质"],
  ["Rig / Action", "运动", "验证权重与关键帧", "镜头"],
  ["灯光 / 合成", "输出", "保存参数与渲染序列", "发布"],
] as const;

const MIGRATION_ROWS = [
  ["参考图", "图像、比例和镜头关系", "工具入口可能变化", "输入文件 + 版本"],
  ["拓扑", "边流服务变形", "建模工具与快捷键变化", "检查弯曲姿态"],
  ["材质", "纹理通道解释表面", "节点名称与渲染器变化", "同光照对照渲染"],
  ["Rig / Action", "骨骼驱动可复用动作", "集合和控制器组织变化", "姿态与循环验收"],
  ["合成", "镜头、灯光和输出可追溯", "引擎选项与缓存变化", "序列 + 参数账本"],
] as const;

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

export function Bl3OfficialLearningMapFlowLab() {
  const [instance, setInstance] = useState(0);

  return (
    <Bl3OfficialLearningMapFlowInstance
      key={instance}
      onReset={() => setInstance((value) => value + 1)}
    />
  );
}

function Bl3OfficialLearningMapFlowInstance({
  onReset,
}: {
  onReset: () => void;
}) {
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const steps = PIPELINE_STEPS;
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      PIPELINE.forEach((item, index) => {
        const node = nodeRefs.current[index];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [index === 0 ? 1 : 0, 1],
            translateY: [index === 0 ? 0 : 12, 0],
            duration: BEAT * 0.55,
            ease: "out(3)",
          },
          BEAT * index,
        );
        tl.label(item.id, BEAT * index);
      });
    },
  });

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-official-learning-map-pipeline"
      aria-label="Blender Jim 角色生产链实验：从设计到最终渲染"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            交付链证据 01 · 可步进生产管线
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            一个 Jim，十五章如何串成一条生产链
          </h3>
          <p className="mt-1 text-sm leading-6 text-secondary">
            逐步点亮每个阶段，观察“上一章输出 = 下一章输入”的契约。
          </p>
        </div>
        <ResetButton onReset={onReset} />
      </div>

      <svg
        viewBox="0 0 960 360"
        role="img"
        aria-label="五阶段生产管线：设计产生参考图，建模产生网格，表面产生 UV 纹理材质，运动产生 Rig 与 Action，合成产生最终渲染。可播放、暂停、单步和拖动进度。"
        className="mt-5 block h-auto w-full"
      >
        <path
          d="M120 188 H840"
          fill="none"
          stroke="var(--border)"
          strokeWidth="4"
        />
        {PIPELINE.map((item, index) => {
          const x = 112 + index * 184;
          return (
            <g
              key={item.id}
              ref={(node) => {
                nodeRefs.current[index] = node;
              }}
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <circle cx={x} cy={188} r={34} fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
              <text x={x} y={184} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
                {index + 1}
              </text>
              <text x={x} y={205} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
                {item.label}
              </text>
              <rect x={x - 76} y={244} width={152} height={62} rx={12} fill="var(--bg)" stroke="var(--border)" />
              <text x={x} y={270} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
                {item.output}
              </text>
              <text x={x} y={290} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                交付给下一阶段
              </text>
            </g>
          );
        })}
        <text x="480" y="44" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
          先守住资产契约，再换工具版本
        </text>
        <text x="480" y="72" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
          任何失败都回到最早不满足的输入，而不是用最后一帧掩盖
        </text>
      </svg>

      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(PIPELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]))}
        caption="动画只展示依赖顺序；真正验收仍要保存文件、Datablock、参数和截图。"
      />
    </section>
  );
}

export function Bl3OfficialLearningMapAssetLab() {
  const [activeRow, setActiveRow] = useState(0);

  function reset() {
    setActiveRow(0);
  }

  const row = ASSET_ROWS[activeRow];
  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-official-learning-map-asset-ledger"
      aria-label="Blender 资产交付验收实验：资产账本"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            交付链证据 02 · 资产账本
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            每个输出都要回答：谁修改，谁消费，如何复现？
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-x-auto rounded-card border border-border bg-bg p-3">
          <svg
            viewBox="0 0 760 390"
            role="img"
            aria-label="六行资产账本，展示设计稿、参考图、网格、UV 纹理、Rig Action、灯光合成的输入类型、验收动作和下游输出。"
            className="min-w-[660px]"
          >
            <text x="28" y="30" fontSize="15" fontWeight="700" fill="var(--text-primary)">
              Asset ledger · 输入 → 验收 → 输出
            </text>
            {ASSET_ROWS.map((asset, index) => {
              const y = 52 + index * 52;
              const selected = activeRow === index;
              return (
                <g key={asset[0]}>
                  <rect x="18" y={y} width="724" height="42" rx="8" fill={selected ? "var(--accent)" : "var(--bg)"} fillOpacity={selected ? 0.12 : 1} stroke={selected ? "var(--accent)" : "var(--border)"} />
                  <text x="34" y={y + 26} fontSize="12" fontWeight="700" fill="var(--text-primary)">{asset[0]}</text>
                  <text x="166" y={y + 26} fontSize="12" fill="var(--text-secondary)">{asset[1]}</text>
                  <text x="274" y={y + 26} fontSize="12" fill="var(--text-secondary)">{asset[2]}</text>
                  <text x="628" y={y + 26} fontSize="12" fontWeight="700" fill="var(--accent)">→ {asset[3]}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">当前验收焦点</p>
          <p className="mt-2 text-base font-semibold text-primary">{row[0]}</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-secondary">责任边界</dt>
              <dd className="mt-1 text-primary">{row[1]} → {row[3]} 的交接必须可追溯。</dd>
            </div>
            <div>
              <dt className="text-secondary">验收动作</dt>
              <dd className="mt-1 text-primary">{row[2]}</dd>
            </div>
          </dl>
          <div className="mt-5 grid grid-cols-3 gap-2" role="tablist" aria-label="资产账本阶段">
            {ASSET_ROWS.map((asset, index) => (
              <button
                key={asset[0]}
                type="button"
                role="tab"
                aria-selected={activeRow === index}
                onClick={() => setActiveRow(index)}
                className={`min-h-11 rounded-control border px-2 py-2 text-xs transition-colors ${activeRow === index ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
              >
                {index + 1}. {asset[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Bl3OfficialLearningMapMigrationLab() {
  const [version, setVersion] = useState<"283" | "current">("283");

  function reset() {
    setVersion("283");
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-official-learning-map-migration-ledger"
      aria-label="Blender 版本迁移实验：2.83 LTS 到当前版本的迁移账本"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            交付链证据 03 · 迁移账本
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            版本变化可以改入口，不能改不变量
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Blender 版本基线">
        <button
          type="button"
          role="tab"
          aria-selected={version === "283"}
          onClick={() => setVersion("283")}
          className={`min-h-11 rounded-control border px-4 py-2 text-sm ${version === "283" ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent"}`}
        >
          Blender 2.83 LTS
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={version === "current"}
          onClick={() => setVersion("current")}
          className={`min-h-11 rounded-control border px-4 py-2 text-sm ${version === "current" ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent"}`}
        >
          当前版本
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-card border border-border bg-bg p-3">
        <svg
          viewBox="0 0 860 360"
          role="img"
          aria-label={`迁移账本：${version === "283" ? "Blender 2.83 LTS" : "当前版本"}下保留设计、拓扑、材质、Rig Action 和合成五项稳定不变量，同时记录工具入口变化和复现证据。`}
          className="min-w-[720px]"
        >
          <text x="28" y="32" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            {version === "283" ? "2.83 LTS 基线" : "当前版本迁移检查"}
          </text>
          <text x="28" y="58" fontSize="12" fill="var(--text-secondary)">
            {version === "283" ? "记录原书采用的载体与操作入口" : "记录入口差异，但沿用同一交付契约"}
          </text>
          {MIGRATION_ROWS.map((row, index) => {
            const y = 84 + index * 52;
            return (
              <g key={row[0]}>
                <rect x="18" y={y} width="824" height="40" rx="8" fill="var(--bg)" stroke="var(--border)" />
                <text x="34" y={y + 25} fontSize="12" fontWeight="700" fill="var(--accent)">{row[0]}</text>
                <text x="166" y={y + 25} fontSize="12" fill="var(--text-primary)">{row[1]}</text>
                <text x="422" y={y + 25} fontSize="12" fill="var(--text-secondary)">{row[2]}</text>
                <text x="680" y={y + 25} fontSize="12" fontWeight="700" fill="var(--text-primary)">{row[3]}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-3 text-center text-sm leading-6 text-secondary" aria-live="polite">
        迁移判断：{version === "283" ? "先保存原书基线，再逐项验证当前实现。" : "先锁定稳定不变量，再记录不可等价处与证据。"}
      </p>
    </section>
  );
}
