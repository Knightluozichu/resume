"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-control border border-border px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-accent hover:text-primary";

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

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${BUTTON_CLASS} ${active ? "border-accent bg-accent/10 text-accent" : ""}`}
    >
      {children}
    </button>
  );
}

const EDITORS = {
  viewport: { label: "3D Viewport", signal: "导航、选择与变换" },
  outliner: { label: "Outliner", signal: "对象层级与 Active Object" },
  properties: { label: "Properties", signal: "偏好、渲染与数据设置" },
} as const;

type EditorKey = keyof typeof EDITORS;

export function Bl3Ch02ContextLab() {
  const [editor, setEditor] = useState<EditorKey>("viewport");
  const [mode, setMode] = useState<"object" | "edit">("object");

  function reset() {
    setEditor("viewport");
    setMode("object");
  }

  const active = EDITORS[editor];
  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch02-context-editor"
      aria-label="Blender 第二章上下文与编辑器实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 2 · 上下文图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一个快捷键，为什么结果会变</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换鼠标所在的 Editor 和当前 Mode，观察命令上下文如何改变。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <svg viewBox="0 0 760 360" role="img" aria-label={`Blender 窗口上下文图：当前编辑器是${active.label}，信号是${active.signal}，模式是${mode === "object" ? "Object" : "Edit"}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Window → Area → Editor → Mode</text>
          <rect x="34" y="58" width="692" height="250" rx="16" fill="var(--bg)" stroke="var(--border)" />
          <rect x="54" y="82" width="410" height="166" rx="12" fill={editor === "viewport" ? "var(--accent)" : "var(--bg)"} fillOpacity={editor === "viewport" ? 0.12 : 1} stroke={editor === "viewport" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="76" y="112" fontSize="13" fontWeight="700" fill="var(--text-primary)">Area A · {EDITORS.viewport.label}</text>
          <text x="76" y="142" fontSize="12" fill="var(--text-secondary)">Region：Header / Main / Status</text>
          <text x="76" y="174" fontSize="12" fill="var(--text-secondary)">Mode：{mode === "object" ? "Object" : "Edit"}</text>
          <text x="76" y="206" fontSize="12" fill="var(--accent)">命令信号：{editor === "viewport" ? "由鼠标上下文接收" : "当前未接收"}</text>
          <rect x="484" y="82" width="220" height="74" rx="12" fill={editor === "outliner" ? "var(--accent)" : "var(--bg)"} fillOpacity={editor === "outliner" ? 0.12 : 1} stroke={editor === "outliner" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="504" y="112" fontSize="13" fontWeight="700" fill="var(--text-primary)">Area B · Outliner</text>
          <text x="504" y="138" fontSize="11" fill="var(--text-secondary)">层级与 Active Object</text>
          <rect x="484" y="174" width="220" height="74" rx="12" fill={editor === "properties" ? "var(--accent)" : "var(--bg)"} fillOpacity={editor === "properties" ? 0.12 : 1} stroke={editor === "properties" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="504" y="204" fontSize="13" fontWeight="700" fill="var(--text-primary)">Area C · Properties</text>
          <text x="504" y="230" fontSize="11" fill="var(--text-secondary)">偏好与数据设置</text>
          <text x="380" y="338" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">当前焦点：{active.label} · {active.signal}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变输入上下文</p>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {(Object.keys(EDITORS) as EditorKey[]).map((key) => (
              <ToggleButton key={key} active={editor === key} onClick={() => setEditor(key)}>
                {EDITORS[key].label}
              </ToggleButton>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ToggleButton active={mode === "object"} onClick={() => setMode("object")}>Object Mode</ToggleButton>
            <ToggleButton active={mode === "edit"} onClick={() => setMode("edit")}>Edit Mode</ToggleButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            只有同时记录 Editor、Mode、Selection 和 Active Object，快捷键结果才可复现。
          </p>
        </div>
      </div>
    </section>
  );
}

const VIEWS = {
  perspective: { label: "Perspective", detail: "自由观察，深度关系随轨道变化" },
  front: { label: "Front Orthographic", detail: "正交对照，适合检查比例与对齐" },
  camera: { label: "Camera View", detail: "以最终镜头裁切，验证构图与可见性" },
} as const;

type ViewKey = keyof typeof VIEWS;

export function Bl3Ch02NavigationLab() {
  const [view, setView] = useState<ViewKey>("perspective");
  const [selection, setSelection] = useState<"single" | "multi">("single");
  const [cursorMoved, setCursorMoved] = useState(false);

  function reset() {
    setView("perspective");
    setSelection("single");
    setCursorMoved(false);
  }

  const active = VIEWS[view];
  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch02-navigation-cursor"
      aria-label="Blender 第二章视图、选择与 3D Cursor 实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 2 · Viewport 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">导航、选择和 3D Cursor 是三种状态</h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 760 360" role="img" aria-label={`3D Viewport 实验：当前${active.label}，${active.detail}；${selection === "single" ? "单选对象" : "多选对象"}；3D Cursor${cursorMoved ? "已移动" : "位于原点"}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">3D Viewport · {active.label}</text>
          <path d="M76 262 H688 M380 78 V304" stroke="var(--border)" strokeWidth="2" />
          <path d="M380 262 L510 196 L510 262 Z" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <circle cx={cursorMoved ? 510 : 380} cy={cursorMoved ? 196 : 262} r="9" fill="none" stroke="var(--danger)" strokeWidth="3" />
          <path d={cursorMoved ? "M492 196 H528 M510 178 V214" : "M362 262 H398 M380 244 V280"} stroke="var(--danger)" strokeWidth="2" />
          <text x="380" y="112" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="380" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">对象{selection === "single" ? "单选" : "多选"} · 3D Cursor {cursorMoved ? "不在原点" : "原点"}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变可观察状态</p>
          <div className="grid gap-2">
            {(Object.keys(VIEWS) as ViewKey[]).map((key) => (
              <ToggleButton key={key} active={view === key} onClick={() => setView(key)}>{VIEWS[key].label}</ToggleButton>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ToggleButton active={selection === "single"} onClick={() => setSelection("single")}>单选</ToggleButton>
            <ToggleButton active={selection === "multi"} onClick={() => setSelection("multi")}>多选</ToggleButton>
          </div>
          <button type="button" aria-pressed={cursorMoved} onClick={() => setCursorMoved((value) => !value)} className={`${BUTTON_CLASS} w-full ${cursorMoved ? "border-accent bg-accent/10 text-accent" : ""}`}>
            {cursorMoved ? "将 3D Cursor 放回原点" : "移动 3D Cursor"}
          </button>
        </div>
      </div>
    </section>
  );
}

export function Bl3Ch02StartupLab() {
  const [profile, setProfile] = useState<"factory" | "project">("factory");
  const [saved, setSaved] = useState(false);

  function reset() {
    setProfile("factory");
    setSaved(false);
  }

  const project = profile === "project";
  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch02-startup-preferences"
      aria-label="Blender 第二章 Preferences 与 Startup File 实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 2 · 配置实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">方便的 Startup File 也是项目依赖</h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2 rounded-card border border-border bg-bg p-4">
          <ToggleButton active={profile === "factory"} onClick={() => setProfile("factory")}>Factory Settings</ToggleButton>
          <ToggleButton active={profile === "project"} onClick={() => setProfile("project")}>Project Startup File</ToggleButton>
          <button type="button" aria-pressed={saved} onClick={() => setSaved((value) => !value)} className={`${BUTTON_CLASS} w-full ${saved ? "border-accent bg-accent/10 text-accent" : ""}`}>
            {saved ? "已记录配置快照" : "记录配置快照"}
          </button>
        </div>
        <svg viewBox="0 0 760 300" role="img" aria-label={`Startup File 实验：当前${project ? "项目配置" : "出厂配置"}，${project ? "含任务工作区和快捷键" : "用于排除个人偏好"}；配置快照${saved ? "已记录" : "未记录"}。`} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Preferences → Startup File</text>
          <rect x="46" y="82" width="204" height="112" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="148" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">用户偏好</text>
          <text x="148" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">主题、快捷键、输入设备</text>
          <text x="148" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">个人便利 ≠ 项目事实</text>
          <path d="M270 138 H350" stroke="var(--border)" strokeWidth="3" />
          <rect x="360" y="82" width="204" height="112" rx="14" fill={project ? "var(--accent)" : "var(--bg)"} fillOpacity={project ? 0.12 : 1} stroke={project ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="462" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Startup File</text>
          <text x="462" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{project ? "任务工作区与默认布局" : "干净启动状态"}</text>
          <text x="462" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{saved ? "快照已记录" : "快照待记录"}</text>
          <path d="M584 138 H664" stroke="var(--border)" strokeWidth="3" />
          <rect x="674" y="82" width="52" height="112" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="700" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">新</text>
          <text x="700" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">项目</text>
          <text x="380" y="244" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">重放时先用 Factory Settings，再显式导入项目配置</text>
          <text x="380" y="270" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">避免隐藏偏好成为不可解释的结果差异</text>
        </svg>
      </div>
    </section>
  );
}
