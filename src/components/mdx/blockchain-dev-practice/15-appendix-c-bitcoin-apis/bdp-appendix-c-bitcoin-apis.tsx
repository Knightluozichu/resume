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

function ChoiceButton({
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
      className={BUTTON_CLASS + (active ? " border-accent bg-accent/10 text-accent" : "")}
    >
      {children}
    </button>
  );
}

const REQUEST_STAGES = [
  { label: "请求", detail: "方法与路径" },
  { label: "传输", detail: "状态码" },
  { label: "响应", detail: "类型与字段" },
  { label: "上下文", detail: "区块与时间" },
] as const;

export function BdpAppendixCRequestLab() {
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const active = REQUEST_STAGES[stage];

  function reset() {
    setStage(0);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-c-request-validation"
      aria-label={`REST 请求校验：当前阶段${active.label}，${fault ? "已注入响应错误" : "响应正常"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix C · 请求校验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">状态码通过还不够</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进请求、传输、响应和区块上下文，定位接口证据缺口。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择校验阶段</p>
          <div className="grid gap-2">
            {REQUEST_STAGES.map((item, index) => (
              <ChoiceButton key={item.label} active={stage === index} onClick={() => setStage(index)}>
                {`${index + 1}. ${item.label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={fault} onClick={() => setFault((value) => !value)}>注入字段错误</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.label}，核对{active.detail}。{fault ? "响应错误已注入，保留原始 body 并停止解析。" : "先预测下一份证据，再推进请求。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`REST 请求图：请求、传输、响应、区块上下文；当前${active.label}；${fault ? "字段错误已注入" : "响应正常"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Request → Transport → Response → Block Context</text>
          {REQUEST_STAGES.map((item, index) => {
            const reached = stage >= index;
            const color = fault && index >= 2 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={item.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{fault && index >= 2 ? "STOP" : reached ? "已核对" : "待核对"}</text>
                {index < REQUEST_STAGES.length - 1 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">状态码、Content Type、字段和区块标记共同定义响应是否可信</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={fault ? "var(--warning)" : "var(--text-secondary)"}>{fault ? "响应停止：错误 body 与请求上下文一起保存" : `当前阶段：${active.label} · ${active.detail}`}</text>
        </svg>
      </div>
    </section>
  );
}

const SERVER_PROFILES = {
  local: { label: "本地接口", detail: "127.0.0.1 + 测试节点", result: "适合隔离重放" },
  auth: { label: "受保护接口", detail: "本地绑定 + 认证", result: "可以给受控客户端" },
  exposed: { label: "错误暴露", detail: "公网绑定 + 无认证", result: "停止并收紧边界" },
} as const;

type ServerProfile = keyof typeof SERVER_PROFILES;

export function BdpAppendixCServerLab() {
  const [profile, setProfile] = useState<ServerProfile>("local");
  const [verified, setVerified] = useState(false);
  const active = SERVER_PROFILES[profile];

  function reset() {
    setProfile("local");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-c-server-boundary"
      aria-label={`REST 服务边界：${active.label}，${active.detail}，${verified ? "已核验" : "未核验"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix C · 服务边界</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">接口启动也属于安全配置</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换本地、受保护和错误暴露 profile，观察可访问范围。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择服务 profile</p>
          <div className="grid gap-2">
            {(Object.keys(SERVER_PROFILES) as ServerProfile[]).map((value) => (
              <ChoiceButton
                key={value}
                active={profile === value}
                onClick={() => {
                  setProfile(value);
                  setVerified(false);
                }}
              >
                {SERVER_PROFILES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>
            {verified ? "撤销服务核验" : "核验绑定与认证"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{verified ? active.result + "；继续保存版本和日志。" : "先确认监听地址、认证和测试网络，再相信接口响应。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`REST 服务图：进程、监听、认证、节点；当前${active.label}；${verified ? "边界已核验" : "边界待核验"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Process → Bind → Auth → Node</text>
          {[
            { label: "进程", detail: "版本" },
            { label: "监听", detail: active.detail.split(" + ")[0] },
            { label: "认证", detail: profile === "exposed" ? "缺失" : "存在" },
            { label: "节点", detail: "测试网络" },
          ].map((node, index) => {
            const valid = verified && profile !== "exposed";
            const color = profile === "exposed" && index >= 1 ? "var(--warning)" : valid ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{profile === "exposed" && index >= 1 ? "收紧" : valid ? "已核验" : "待核验"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">本地绑定、认证、测试数据和日志让接口边界可复核</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={profile === "exposed" ? "var(--warning)" : verified ? "var(--success)" : "var(--text-secondary)"}>{profile === "exposed" ? "错误暴露：停止服务并撤销公网访问" : verified ? "服务边界可以进入请求阶段" : "服务边界待核验"}</text>
        </svg>
      </div>
    </section>
  );
}

const TRANSACTION_MODES = {
  read: { label: "只读查询", detail: "读取区块或交易", result: "无签名写入" },
  write: { label: "签名交易", detail: "原始交易 + 签名", result: "等待广播与确认" },
  rejected: { label: "拒绝请求", detail: "参数或节点错误", result: "保留错误与原状态" },
} as const;

type TransactionMode = keyof typeof TRANSACTION_MODES;

export function BdpAppendixCTransactionLab() {
  const [mode, setMode] = useState<TransactionMode>("read");
  const [confirmed, setConfirmed] = useState(false);
  const active = TRANSACTION_MODES[mode];

  function reset() {
    setMode("read");
    setConfirmed(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-appendix-c-transaction-evidence"
      aria-label={`API 交易实验：${active.label}，${active.detail}，${confirmed ? "已完成确认" : "未完成确认"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Appendix C · 交易证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">读请求与写请求不能混用状态</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择 API 路径，再完成或撤销确认，比较写入证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交易路径</p>
          <div className="grid gap-2">
            {(Object.keys(TRANSACTION_MODES) as TransactionMode[]).map((value) => (
              <ChoiceButton
                key={value}
                active={mode === value}
                onClick={() => {
                  setMode(value);
                  setConfirmed(false);
                }}
              >
                {TRANSACTION_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={confirmed} onClick={() => setConfirmed((value) => !value)}>
            {confirmed ? "撤销确认" : "完成确认检查"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.detail}。{confirmed ? active.result + "。" : "先保存状态码、响应字段、交易哈希和区块上下文。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`API 交易图：准备、签名、广播、确认；当前${active.label}；${confirmed ? "确认已完成" : "确认未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Prepare → Sign → Broadcast → Confirm</text>
          {[
            { label: "准备", detail: active.detail },
            { label: "签名", detail: mode === "write" ? "隔离密钥" : "不需要" },
            { label: "广播", detail: mode === "write" ? "交易哈希" : "无写入" },
            { label: "确认", detail: confirmed ? "区块上下文" : "待检查" },
          ].map((node, index) => {
            const failed = mode === "rejected";
            const reached = mode === "read" ? index === 0 : confirmed || (mode === "rejected" && index === 0);
            const color = failed && index > 0 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 28 + index * 184;
            return (
              <g key={node.label}>
                <rect x={x} y="82" width="146" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 73} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{node.label}</text>
                <text x={x + 73} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{node.detail}</text>
                <text x={x + 73} y="178" textAnchor="middle" fontSize="11" fill={color}>{failed && index > 0 ? "停止" : reached ? "已记录" : "待记录"}</text>
                {index < 3 ? <path d={`M${x + 152} 148 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">写请求要隔离密钥，确认要绑定交易、区块和当前链头</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={mode === "rejected" ? "var(--warning)" : confirmed ? "var(--success)" : "var(--text-secondary)"}>{mode === "rejected" ? "请求拒绝：错误和原状态一起保存" : confirmed ? "确认完成：可以更新业务视图" : `当前路径：${active.label} · ${active.result}`}</text>
        </svg>
      </div>
    </section>
  );
}
