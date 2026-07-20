"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-19-version-control";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const releases = {
  partial: {
    label: "只提交应用代码",
    commit: "commit 8ac1 · app: fix VAT rounding",
    inputs: [
      ["src/tax.ts", "tracked @ 8ac1", c.success],
      ["migrations/042.sql", "tracked @ 8ac1", c.success],
      ["tax-rules.yaml", "手工上传到服务器", c.danger],
      ["runbook.md", "个人桌面最新版", c.danger],
    ],
    tag: "v2.4.0 → 只能定位两份工件",
    result:
      "同一 tag 无法回答生产使用哪份税率配置，也无法在新机器上重建操作步骤。",
    color: c.danger,
  },
  complete: {
    label: "发布输入全部可追溯",
    commit: "commit b7f2 · release: VAT rounding v2",
    inputs: [
      ["src/tax.ts", "tracked @ b7f2", c.success],
      ["migrations/042.sql", "tracked @ b7f2", c.success],
      ["tax-rules.yaml", "tracked @ b7f2", c.success],
      ["runbook.md", "tracked @ b7f2", c.success],
    ],
    tag: "v2.4.0 → signed tag 指向 b7f2",
    result:
      "构建清单记录 b7f2、依赖锁和镜像摘要；密钥不入库，但引用的 secret id 受版本化。",
    color: c.success,
  },
} as const;
type ReleaseId = keyof typeof releases;

export function Tpp20Topic19VersionControlSystemLab() {
  const [id, setId] = useState<ReleaseId>("partial");
  const release = releases[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 19 专属解剖图 · VAT 修复的发布身份"
      title="tag 能否定位构成生产行为的全部非秘密输入？"
      description="切换部分提交与完整发布输入。固定 v2.4.0，检查代码、数据库迁移、税率配置和运行手册是否都能回到同一 commit。"
      kind="version-control-release-provenance"
      reset={() => setId("partial")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(releases) as ReleaseId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {releases[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-sm">
          {release.commit}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {release.inputs.map(([file, identity, color]) => (
            <div
              key={file}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {file}
              </code>
              <strong className="mt-2 block text-sm">{identity}</strong>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border border-border bg-bg p-3 font-mono text-xs"
          style={{ color: release.color }}
        >
          {release.tag}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: release.color }}
        >
          {release.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const histories = {
  mixed: {
    label: "混合提交",
    commits: [
      ["a10", "已知良好：tax 1.9", c.success],
      ["b21", "VAT 修复 + 代码格式化 84 文件 + 文案", c.danger],
      ["c32", "新结账按钮", c.accent],
    ],
    bisect: "首个坏提交 = b21，但其中 3 个意图纠缠",
    revert: "revert b21 会同时撤掉修复、格式化和文案",
    review: "1,642 行差异掩盖了 roundingMode 的一行变化",
    verdict: "历史能定位提交，却不能独立恢复其中一个意图。",
    color: c.danger,
  },
  atomic: {
    label: "原子提交",
    commits: [
      ["a10", "已知良好：tax 1.9", c.success],
      ["b11", "fix: roundingMode HALF_UP（6 行）", c.warning],
      ["b12", "style: formatter 84 files", c.accent],
      ["b13", "docs: VAT 文案", c.accent],
    ],
    bisect: "首个坏提交 = b11；测试直接指向 6 行税务差异",
    revert: "revert b11 保留格式化和文案，再补正确规则",
    review: "每个提交只有一个可说明、可测试的意图",
    verdict: "原子不是提交越小越好，而是提交能独立解释、验证和撤回。",
    color: c.success,
  },
  fixed: {
    label: "修复后历史",
    commits: [
      ["a10", "tax 1.9", c.success],
      ["b11", "错误 HALF_UP（已 revert）", c.warning],
      ["d14", "revert b11", c.accent],
      ["d15", "fix: jurisdiction-specific rounding", c.success],
    ],
    bisect: "故障样本保留；d15 加入欧盟与瑞士边界测试",
    revert: "没有改写共享历史，也没有删除错误证据",
    review: "发布 tag v2.4.1 指向 d15",
    verdict: "错误提交仍在历史中，但当前状态及修复因果都可重建。",
    color: c.accent,
  },
} as const;
type HistoryId = keyof typeof histories;

export function Tpp20Topic19VersionControlFeedbackLab() {
  const [id, setId] = useState<HistoryId>("mixed");
  const history = histories[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 19 专属实验 · 提交边界决定恢复粒度"
      title="税额回归出现时，能否只撤回一个意图？"
      description="固定同一 VAT bug 和后续变更，只改变提交拆分。观察 bisect、评审和 revert 实际能操作的最小单位。"
      kind="version-control-atomic-history"
      reset={() => setId("mixed")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(histories) as HistoryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {histories[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-stretch">
          {history.commits.map(([sha, message, color], index) => (
            <div
              key={sha}
              className="relative flex-1 rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {sha}
              </code>
              <strong className="mt-2 block text-sm leading-5">
                {message}
              </strong>
              {index < history.commits.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {[
            ["bisect", history.bisect],
            ["review", history.review],
            ["revert", history.revert],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border border-border bg-bg p-3"
            >
              <span className="text-xs font-semibold text-secondary">
                {label}
              </span>
              <p className="mt-1 text-sm leading-5">{value}</p>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: history.color }}
        >
          {history.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const drills = {
  unknown: {
    label: "故障：生产包来源未知",
    starting: "空目录 + prod-image:latest",
    steps: [
      ["定位", "镜像没有 org.opencontainers.image.revision", c.danger],
      ["签出", "不知道使用哪个 commit", c.danger],
      ["配置", "服务器上有手改 tax-rules.yaml", c.danger],
      ["验证", "无法重建相同 bundle", c.danger],
    ],
    outcome: "恢复依赖旧服务器仍然活着；版本库不能证明当前生产是什么。",
    color: c.danger,
  },
  tagged: {
    label: "恢复：从 signed tag 开始",
    starting: "空目录 + tag v2.4.1 + secret id prod/tax/v3",
    steps: [
      ["定位", "验证 tag 签名 → commit d15", c.success],
      ["签出", "clone --branch v2.4.1", c.success],
      ["构建", "lockfile → image sha256 9ef…", c.success],
      ["验证", "冒烟样本 tax=CHF 0.05", c.success],
    ],
    outcome: "新机器在 18 分钟内得到相同镜像摘要和边界结果；密钥值不进 Git。",
    color: c.success,
  },
  rollback: {
    label: "回滚演练：v2.4.1 → v2.3.9",
    starting: "当前 tag v2.4.1；数据库迁移 042 可向后兼容",
    steps: [
      ["定位", "v2.3.9 → commit 91c", c.accent],
      ["检查", "migration 042 保留旧读路径", c.success],
      ["切换", "部署 image sha256 2aa…", c.success],
      ["验证", "旧税务样本 24/24", c.success],
    ],
    outcome:
      "回滚不仅是 checkout：应用、配置 schema、数据兼容性和测试样本全部按 tag 验证。",
    color: c.accent,
  },
} as const;
type DrillId = keyof typeof drills;

export function Tpp20Topic19VersionControlEvidenceLab() {
  const [id, setId] = useState<DrillId>("unknown");
  const drill = drills[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 19 专属复核 · 从空机器重建并回滚"
      title="没有旧服务器时，版本历史还能恢复同一生产行为吗？"
      description="选择来源未知、按 tag 恢复或回滚演练。证据包括签名 commit、依赖锁、镜像摘要、配置引用和边界样本。"
      kind="version-control-disaster-recovery"
      reset={() => setId("unknown")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(drills) as DrillId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {drills[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          起点：{drill.starting}
        </code>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {drill.steps.map(([step, evidence, color], index) => (
            <div
              key={step}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {step}
              </span>
              <strong className="mt-2 block text-sm leading-5">
                {evidence}
              </strong>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: drill.color }}
        >
          {drill.outcome}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
