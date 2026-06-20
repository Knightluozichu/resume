"use client";

import { useState } from "react";

const steps = ["输入", "判断", "状态", "输出"];

function DemoFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="not-prose my-6 rounded-card border border-border bg-elevated p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-control border border-border bg-bg px-2 py-1 text-xs text-secondary">
          ⚡ 可交互
        </span>
        <figcaption className="text-sm font-semibold text-primary">
          {title}
        </figcaption>
      </div>
      {children}
    </figure>
  );
}

function Timeline({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mt-4 grid gap-2">
      <input
        type="range"
        min="0"
        max="3"
        value={value}
        aria-label="教学步骤"
        onChange={(event) => onChange(Number(event.target.value))}
        className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
      <div className="grid grid-cols-4 text-center text-xs text-secondary">
        {steps.map((step, index) => (
          <span key={step} className={index === value ? "text-accent" : ""}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  active,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill={active ? "var(--accent-glow)" : "var(--bg)"}
        stroke={active ? "var(--accent)" : "var(--border)"}
        strokeWidth="2"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        className="fill-primary text-[13px] font-semibold"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  active,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  label?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={active ? "var(--accent)" : "var(--border)"}
        strokeWidth={active ? 3 : 2}
        strokeLinecap="round"
      />
      <circle
        cx={x2}
        cy={y2}
        r="4"
        fill={active ? "var(--accent)" : "var(--border)"}
      />
      {label ? (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 8}
          textAnchor="middle"
          className="fill-secondary text-[12px]"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function AndroidScreenAnatomyDiagram() {
  const [step, setStep] = useState(0);
  return (
    <DemoFrame title="TODO 详情页职责解剖">
      <svg
        viewBox="0 0 640 320"
        role="img"
        aria-label="Activity 职责解剖图"
        className="w-full"
      >
        <rect width="640" height="320" rx="12" fill="var(--bg)" />
        <Box
          x={48}
          y={44}
          w={200}
          h={232}
          label="Fat Activity"
          active={step === 0}
        />
        <Box x={328} y={28} w={120} h={54} label="View" active={step >= 1} />
        <Box x={472} y={28} w={120} h={54} label="State" active={step >= 1} />
        <Box
          x={328}
          y={132}
          w={120}
          h={54}
          label="Repository"
          active={step >= 2}
        />
        <Box
          x={472}
          y={132}
          w={120}
          h={54}
          label="Navigator"
          active={step >= 2}
        />
        <Box
          x={400}
          y={236}
          w={120}
          h={54}
          label="Review Rule"
          active={step === 3}
        />
        <Arrow x1={248} y1={160} x2={328} y2={55} active={step >= 1} />
        <Arrow x1={248} y1={160} x2={328} y2={159} active={step >= 2} />
        <Arrow
          x1={448}
          y1={186}
          x2={460}
          y2={236}
          active={step === 3}
          label="保护边界"
        />
      </svg>
      <Timeline value={step} onChange={setStep} />
    </DemoFrame>
  );
}

export function MvpVsMvvmCompareDiagram() {
  const [mvvm, setMvvm] = useState(false);
  return (
    <DemoFrame title="MVP 手动回调 vs MVVM 状态观察">
      <button
        type="button"
        onClick={() => setMvvm((value) => !value)}
        className="mb-3 rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary hover:border-accent"
      >
        切换到 {mvvm ? "MVP" : "MVVM"}
      </button>
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="MVP MVVM 对比图"
        className="w-full"
      >
        <rect width="640" height="300" rx="12" fill="var(--bg)" />
        {mvvm ? (
          <>
            <Box x={52} y={70} w={120} h={60} label="View" active />
            <Box x={258} y={70} w={130} h={60} label="ViewModel" active />
            <Box x={468} y={70} w={120} h={60} label="StateFlow" active />
            <Box x={258} y={190} w={130} h={60} label="Repository" />
            <Arrow x1={172} y1={100} x2={258} y2={100} active label="intent" />
            <Arrow x1={388} y1={100} x2={468} y2={100} active label="UiState" />
            <Arrow x1={323} y1={130} x2={323} y2={190} active label="load" />
          </>
        ) : (
          <>
            <Box x={52} y={70} w={120} h={60} label="View IF" active />
            <Box x={258} y={70} w={130} h={60} label="Presenter" active />
            <Box x={468} y={70} w={120} h={60} label="Model" />
            <Box x={258} y={190} w={130} h={60} label="Fake View" active />
            <Arrow x1={172} y1={100} x2={258} y2={100} active label="event" />
            <Arrow x1={388} y1={100} x2={468} y2={100} active label="query" />
            <Arrow
              x1={323}
              y1={130}
              x2={323}
              y2={190}
              active
              label="test seam"
            />
          </>
        )}
      </svg>
    </DemoFrame>
  );
}

export function RefactorStranglerDiagram() {
  const [step, setStep] = useState(0);
  return (
    <DemoFrame title="差分开发：旧页面被安全替换">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="差分开发重构路径"
        className="w-full"
      >
        <rect width="640" height="300" rx="12" fill="var(--bg)" />
        <Box
          x={48}
          y={110}
          w={130}
          h={70}
          label="旧 Activity"
          active={step === 0}
        />
        <Box
          x={230}
          y={40}
          w={130}
          h={58}
          label="回归测试"
          active={step >= 1}
        />
        <Box x={230} y={128} w={130} h={58} label="Facade" active={step >= 2} />
        <Box
          x={410}
          y={40}
          w={150}
          h={58}
          label="新 Repository"
          active={step >= 2}
        />
        <Box
          x={410}
          y={188}
          w={150}
          h={58}
          label="新 ViewModel"
          active={step >= 3}
        />
        <Arrow x1={178} y1={145} x2={230} y2={69} active={step >= 1} />
        <Arrow x1={178} y1={145} x2={230} y2={157} active={step >= 2} />
        <Arrow x1={360} y1={157} x2={410} y2={69} active={step >= 2} />
        <Arrow x1={360} y1={157} x2={410} y2={217} active={step >= 3} />
      </svg>
      <Timeline value={step} onChange={setStep} />
    </DemoFrame>
  );
}

export function OssContributionMapDiagram() {
  return (
    <DemoFrame title="OSS 贡献路径">
      <svg
        viewBox="0 0 640 260"
        role="img"
        aria-label="OSS 贡献协作地图"
        className="w-full"
      >
        <rect width="640" height="260" rx="12" fill="var(--bg)" />
        <Box x={38} y={90} w={100} h={56} label="Issue" active />
        <Box x={170} y={42} w={130} h={56} label="Guide" active />
        <Box x={170} y={150} w={130} h={56} label="Example" />
        <Box x={340} y={90} w={110} h={56} label="PR" active />
        <Box x={500} y={42} w={105} h={56} label="CI" />
        <Box x={500} y={150} w={105} h={56} label="Review" active />
        <Arrow x1={138} y1={118} x2={170} y2={70} active />
        <Arrow x1={300} y1={70} x2={340} y2={118} active />
        <Arrow x1={450} y1={118} x2={500} y2={178} active label="原则反馈" />
      </svg>
    </DemoFrame>
  );
}

export function FluxUnidirectionalFlowDiagram() {
  const [step, setStep] = useState(0);
  const active = (index: number) => step >= index;
  return (
    <DemoFrame title="Flux 单向数据流">
      <svg
        viewBox="0 0 640 320"
        role="img"
        aria-label="Flux 单向数据流图"
        className="w-full"
      >
        <rect width="640" height="320" rx="12" fill="var(--bg)" />
        <Box x={260} y={28} w={120} h={52} label="View" active={active(0)} />
        <Box x={452} y={120} w={120} h={52} label="Action" active={active(0)} />
        <Box
          x={260}
          y={220}
          w={120}
          h={52}
          label="Reducer"
          active={active(1)}
        />
        <Box x={68} y={120} w={120} h={52} label="Store" active={active(2)} />
        <Arrow
          x1={380}
          y1={54}
          x2={452}
          y2={146}
          active={active(0)}
          label="收藏"
        />
        <Arrow
          x1={512}
          y1={172}
          x2={380}
          y2={246}
          active={active(1)}
          label="计算新状态"
        />
        <Arrow
          x1={260}
          y1={246}
          x2={188}
          y2={146}
          active={active(2)}
          label="发布"
        />
        <Arrow
          x1={188}
          y1={146}
          x2={260}
          y2={54}
          active={active(3)}
          label="重绘"
        />
        <path
          d="M 110 92 C 230 18, 415 16, 535 92"
          fill="none"
          stroke="var(--danger)"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.8"
        />
        <text
          x="320"
          y="104"
          textAnchor="middle"
          className="fill-secondary text-[12px]"
        >
          禁止双向偷改状态
        </text>
      </svg>
      <Timeline value={step} onChange={setStep} />
    </DemoFrame>
  );
}

export function TeamArchitectureBoardDiagram() {
  return (
    <DemoFrame title="团队架构看板">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="团队架构看板"
        className="w-full"
      >
        <rect width="640" height="300" rx="12" fill="var(--bg)" />
        <Box x={36} y={34} w={116} h={54} label="Route" active />
        <Box x={190} y={34} w={116} h={54} label="Interactor" active />
        <Box x={344} y={34} w={116} h={54} label="Presenter" active />
        <Box x={498} y={34} w={116} h={54} label="View" active />
        <Box x={190} y={178} w={116} h={54} label="Owner" />
        <Box x={344} y={178} w={116} h={54} label="Tests" active />
        <Arrow x1={152} y1={61} x2={190} y2={61} active />
        <Arrow x1={306} y1={61} x2={344} y2={61} active />
        <Arrow x1={460} y1={61} x2={498} y2={61} active />
        <Arrow x1={248} y1={88} x2={248} y2={178} label="ownership" />
        <Arrow x1={402} y1={88} x2={402} y2={178} active label="contract" />
      </svg>
    </DemoFrame>
  );
}

export function AacLifecycleStateMachine() {
  const [step, setStep] = useState(0);
  return (
    <DemoFrame title="AAC 生命周期状态机">
      <svg
        viewBox="0 0 640 320"
        role="img"
        aria-label="AAC 生命周期状态机"
        className="w-full"
      >
        <rect width="640" height="320" rx="12" fill="var(--bg)" />
        <Box
          x={44}
          y={54}
          w={120}
          h={54}
          label="Fragment"
          active={step === 0 || step === 3}
        />
        <Box
          x={260}
          y={54}
          w={140}
          h={54}
          label="ViewModel"
          active={step >= 1}
        />
        <Box
          x={476}
          y={54}
          w={116}
          h={54}
          label="Observer"
          active={step === 0 || step === 3}
        />
        <Box
          x={44}
          y={190}
          w={120}
          h={54}
          label="Destroy View"
          active={step === 1}
        />
        <Box
          x={260}
          y={190}
          w={140}
          h={54}
          label="Saved State"
          active={step >= 2}
        />
        <Box
          x={476}
          y={190}
          w={116}
          h={54}
          label="Render"
          active={step === 3}
        />
        <Arrow
          x1={164}
          y1={81}
          x2={260}
          y2={81}
          active={step >= 0}
          label="订阅"
        />
        <Arrow
          x1={330}
          y1={108}
          x2={330}
          y2={190}
          active={step >= 1}
          label="保留"
        />
        <Arrow
          x1={400}
          y1={217}
          x2={476}
          y2={217}
          active={step >= 2}
          label="恢复"
        />
        <Arrow
          x1={534}
          y1={190}
          x2={534}
          y2={108}
          active={step === 3}
          label="重绘"
        />
      </svg>
      <Timeline value={step} onChange={setStep} />
    </DemoFrame>
  );
}

export function KotlinUiStateDiagram() {
  const [step, setStep] = useState(0);
  return (
    <DemoFrame title="Kotlin sealed UiState 穷举状态">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="Kotlin UI 状态图"
        className="w-full"
      >
        <rect width="640" height="300" rx="12" fill="var(--bg)" />
        <Box
          x={44}
          y={46}
          w={142}
          h={58}
          label="nullable vars"
          active={step === 0}
        />
        <Box
          x={250}
          y={46}
          w={142}
          h={58}
          label="sealed UiState"
          active={step >= 1}
        />
        <Box x={454} y={28} w={124} h={48} label="Loading" active={step >= 1} />
        <Box
          x={454}
          y={96}
          w={124}
          h={48}
          label="Success(data)"
          active={step >= 2}
        />
        <Box
          x={454}
          y={164}
          w={124}
          h={48}
          label="Error(cause)"
          active={step >= 2}
        />
        <Box
          x={250}
          y={208}
          w={142}
          h={58}
          label="exhaustive when"
          active={step === 3}
        />
        <Arrow
          x1={186}
          y1={75}
          x2={250}
          y2={75}
          active={step >= 1}
          label="收束"
        />
        <Arrow x1={392} y1={75} x2={454} y2={52} active={step >= 1} />
        <Arrow x1={392} y1={75} x2={454} y2={120} active={step >= 2} />
        <Arrow x1={392} y1={75} x2={454} y2={188} active={step >= 2} />
        <Arrow
          x1={321}
          y1={104}
          x2={321}
          y2={208}
          active={step === 3}
          label="编译器保护"
        />
      </svg>
      <Timeline value={step} onChange={setStep} />
    </DemoFrame>
  );
}

export function ArchitectureDecisionMatrixDiagram() {
  return (
    <DemoFrame title="架构诊断台">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="架构决策矩阵"
        className="w-full"
      >
        <rect width="640" height="300" rx="12" fill="var(--bg)" />
        {["团队规模", "状态复杂度", "测试要求", "迁移成本"].map(
          (label, index) => (
            <Box
              key={label}
              x={42}
              y={34 + index * 62}
              w={130}
              h={42}
              label={label}
              active={index < 3}
            />
          ),
        )}
        {["MVP", "MVVM", "Flux", "VIPER"].map((label, index) => (
          <Box
            key={label}
            x={250 + index * 92}
            y={52}
            w={76}
            h={50}
            label={label}
            active={index === 1 || index === 2}
          />
        ))}
        <Box x={300} y={184} w={180} h={58} label="决策 + 反证条件" active />
        <Arrow x1={172} y1={55} x2={250} y2={77} active />
        <Arrow x1={172} y1={117} x2={434} y2={77} active />
        <Arrow x1={434} y1={102} x2={390} y2={184} active label="trade-off" />
      </svg>
    </DemoFrame>
  );
}
