"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 900;
const VIEW_H = 520;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type Stage = "resolve" | "socket" | "connect" | "stream" | "http" | "close";
type Sample = "normal" | "fragment" | "malformed";

const CONCEPTS = [
  "第11章 网络编程",
  "11.1 客户端服务器编程模型",
  "11.2 网络",
  "11.3 全球IP因特网",
  "11.3.1 IP地址",
  "11.3.2 因特网域名",
  "11.3.3 因特网连接",
  "11.4 套接字接口",
  "11.4.1 套接字地址结构",
  "11.4.2 socket函数",
  "11.4.3 connect函数",
  "11.4.4 bind函数",
  "11.4.5 listen函数",
  "11.4.6 accept函数",
  "11.4.7 主机和服务的转换",
  "11.4.8 套接字接口的辅助函数",
  "11.4.9 echo客户端和服务器的示例",
  "11.5 Web服务器",
  "11.5.1 Web基础",
  "11.5.2 Web内容",
  "11.5.3 HTTP事务",
  "11.5.4 服务动态内容",
  "11.6 综合：TINY Web服务器",
  "11.7 小结",
] as const;

const STAGES: readonly {
  id: Stage;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "resolve",
    label: "解析主机",
    focus: "host:service → sockaddr",
    evidence:
      "getaddrinfo 把可读主机和服务转换成可迭代的地址候选，保留协议族与端口证据。",
  },
  {
    id: "socket",
    label: "创建套接字",
    focus: "socket → fd",
    evidence:
      "socket 创建通信端点；描述符的所有权从调用者开始，失败时不能遗留半成品。",
  },
  {
    id: "connect",
    label: "建立连接",
    focus: "bind / listen / connect / accept",
    evidence:
      "监听套接字和已连接套接字角色分离，connect 与 accept 共同建立端到端通道。",
  },
  {
    id: "stream",
    label: "收发字节流",
    focus: "read / write / RIO",
    evidence:
      "TCP 提供有序字节流而非消息边界；短读、短写、EINTR 和 EOF 必须显式处理。",
  },
  {
    id: "http",
    label: "解析 HTTP",
    focus: "request → response",
    evidence:
      "HTTP 在字节流之上定义请求行、首部和内容，静态文件与动态 CGI 共享事务边界。",
  },
  {
    id: "close",
    label: "关闭连接",
    focus: "half-close → close",
    evidence:
      "半关闭只影响一个方向；完整事务结束后按所有权关闭描述符并释放地址结果。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "echo 正常事务",
    result: "请求响应闭环",
    detail:
      "主机解析、连接、RIO 收发和 HTTP 响应依次完成，fd 与 addrinfo 都被清理。",
  },
  {
    id: "fragment",
    label: "分段到达",
    result: "缓冲后恢复",
    detail:
      "请求行分成两段到达；RIO 保留未消费字节，解析器等待完整行而不误判 EOF。",
  },
  {
    id: "malformed",
    label: "畸形请求",
    result: "受控 400",
    detail:
      "未知方法或首部长度异常只影响当前事务，服务器返回 400 并释放连接资源。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "client", label: "客户端", artifact: "host:service", x: 28, y: 132 },
  { id: "dns", label: "地址解析", artifact: "sockaddr list", x: 174, y: 132 },
  { id: "socket", label: "套接字 fd", artifact: "fd=3 / 4", x: 320, y: 132 },
  {
    id: "server",
    label: "监听与接受",
    artifact: "listen → accept",
    x: 466,
    y: 132,
  },
  {
    id: "rio",
    label: "可靠字节流",
    artifact: "buffer / count",
    x: 612,
    y: 132,
  },
  { id: "http", label: "HTTP 事务", artifact: "status / body", x: 758, y: 132 },
] as const;

const STAGE_STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.id,
  caption: stage.evidence,
}));
const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STAGE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

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
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function NetworkNode({
  node,
  active,
  warning,
}: {
  node: (typeof NODES)[number];
  active: boolean;
  warning: boolean;
}) {
  const stroke = warning
    ? COLORS.danger
    : active
      ? COLORS.accent
      : COLORS.border;
  const dot = warning
    ? COLORS.danger
    : active
      ? COLORS.accent
      : COLORS.secondary;

  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width="116"
        height="86"
        rx="12"
        fill={COLORS.elevated}
        stroke={stroke}
        strokeWidth={active || warning ? 2.5 : 1.2}
      />
      <circle cx={node.x + 19} cy={node.y + 22} r="6" fill={dot} />
      <text
        x={node.x + 32}
        y={node.y + 27}
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {node.label}
      </text>
      <text
        x={node.x + 12}
        y={node.y + 57}
        fontSize="12"
        fill={COLORS.secondary}
      >
        {node.artifact}
      </text>
    </g>
  );
}

/** 第 11 章专属实验：把地址解析、套接字角色、可靠字节流和 HTTP 事务串成可重放的网络证据链。 */
export function Cap11NetworkProgrammingLab() {
  const [stageId, setStageId] = useState<Stage>("resolve");
  const [sampleId, setSampleId] = useState<Sample>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const stage = useMemo(
    () => STAGES.find((item) => item.id === stageId) ?? STAGES[0],
    [stageId],
  );
  const sample = useMemo(
    () => SAMPLES.find((item) => item.id === sampleId) ?? SAMPLES[0],
    [sampleId],
  );
  const timeline = useTeachingTimeline({
    steps: STAGE_STEPS,
    build: (tl) => {
      STAGE_STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.24, 1],
            scale: [0.95, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setStageId("resolve");
    setSampleId("normal");
    timeline.goToStep(0);
  }

  const stageIndex = STAGES.findIndex((item) => item.id === stageId);
  const sampleIsFault = sampleId !== "normal";

  return (
    <section
      aria-label={`第 11 章网络编程专属地址、套接字与 HTTP 实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-11"
      data-visual-kind="cap-11-network-programming-connection-http"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap11NetworkProgrammingLab · 连接事务追踪台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从 host:service 追到 HTTP 响应与关闭
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择网络阶段和故障样本，逐帧查看地址候选、套接字角色、分段字节流、HTTP
            解析与清理责任。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{stage.label}</div>
          <div>{stage.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="网络阶段">
          {STAGES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === stageId}
              onClick={() => setStageId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="网络样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === sampleId}
              onClick={() => setSampleId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${stage.label}阶段的网络编程轨迹：${sample.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="880"
            height="474"
            rx="16"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <text
            x="28"
            y="52"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            host:service → sockaddr → fd → accept → byte stream → HTTP
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {sample.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = stageIndex > index;
            const edgeWarning =
              (sampleId === "fragment" && index === 3) ||
              (sampleId === "malformed" && index === 4);
            return (
              <g key={`${node.id}-${next.id}`}>
                <line
                  x1={node.x + 116}
                  y1={node.y + 43}
                  x2={next.x}
                  y2={next.y + 43}
                  stroke={
                    edgeWarning
                      ? COLORS.danger
                      : edgeActive
                        ? COLORS.accent
                        : COLORS.border
                  }
                  strokeWidth={edgeWarning || edgeActive ? 3 : 1.2}
                  strokeDasharray={edgeWarning ? "6 5" : undefined}
                />
                <text
                  x={(node.x + 116 + next.x) / 2 - 18}
                  y={node.y + 34}
                  fontSize="11"
                  fill={edgeWarning ? COLORS.danger : COLORS.secondary}
                >
                  {edgeWarning ? "分叉" : edgeActive ? "已确认" : "待确认"}
                </text>
              </g>
            );
          })}
          {NODES.map((node, index) => (
            <NetworkNode
              key={node.id}
              node={node}
              active={stageIndex >= index}
              warning={
                (sampleId === "fragment" && node.id === "rio") ||
                (sampleId === "malformed" && node.id === "http")
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.resolve = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="32"
              y="252"
              width="164"
              height="72"
              rx="10"
              fill={COLORS.accent}
              fillOpacity="0.12"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.socket = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="264"
              cy="288"
              r="28"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.connect = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M330 288h158"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.stream = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M516 288h132m-16-12 16 12-16 12"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.http = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="684"
              y="252"
              width="152"
              height="72"
              rx="10"
              fill={COLORS.warning}
              fillOpacity="0.1"
              stroke={COLORS.warning}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.close = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M688 392h142"
              fill="none"
              stroke={COLORS.success}
              strokeWidth="4"
            />
          </g>
          <text
            x="32"
            y="428"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            网络状态快照
          </text>
          <text x="32" y="452" fontSize="12" fill={COLORS.secondary}>
            fd=3 · peer=203.0.113.8:80 · bytes=128 · parser=waiting ·
            owner=worker
          </text>
          <text
            x="32"
            y="478"
            fontSize="12"
            fill={sampleIsFault ? COLORS.danger : COLORS.success}
          >
            {sample.result} · 当前阶段：{stage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看地址解析、套接字角色、连接建立、可靠收发、HTTP 事务和关闭清理。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置网络编程实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
