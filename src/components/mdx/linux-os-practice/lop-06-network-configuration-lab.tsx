"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const SERVICES = [
  { key: "ssh", label: "SSH", port: 22 },
  { key: "nfs", label: "NFS", port: 2049 },
  { key: "tftp", label: "TFTP", port: 69 },
] as const;
type ServiceKey = (typeof SERVICES)[number]["key"];

export type NetworkConfigInput = {
  ip: string;
  prefix: number;
  gateway: string;
  dns: string;
  service: ServiceKey;
  wrongSubnet: boolean;
  gatewayDown: boolean;
  dnsWrong: boolean;
  serviceBlocked: boolean;
};

export const INITIAL_NETWORK_CONFIG: NetworkConfigInput = {
  ip: "192.168.1.10",
  prefix: 24,
  gateway: "192.168.1.1",
  dns: "192.168.1.1",
  service: "ssh",
  wrongSubnet: false,
  gatewayDown: false,
  dnsWrong: false,
  serviceBlocked: false,
};

function parseIp(ip: string) {
  const parts = ip.split(".").map((part) => Number.parseInt(part, 10));
  if (
    parts.length !== 4 ||
    parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)
  ) {
    return null;
  }
  return parts;
}

function ipToUint32(ip: string) {
  const parts = parseIp(ip);
  if (!parts) return null;
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

function maskFromPrefix(prefix: number) {
  return prefix === 0 ? 0 : (-1 << (32 - prefix)) >>> 0;
}

function sameNetwork(a: string, b: string, prefix: number) {
  const ua = ipToUint32(a);
  const ub = ipToUint32(b);
  if (ua === null || ub === null) return null;
  const mask = maskFromPrefix(prefix);
  return (ua & mask) === (ub & mask);
}

function maskDotted(prefix: number) {
  const m = maskFromPrefix(prefix);
  return [m >>> 24, (m >>> 16) & 255, (m >>> 8) & 255, m & 255].join(".");
}

export function evaluateNetworkConfig(input: NetworkConfigInput) {
  const hostParts = parseIp(input.ip);
  const gatewayParts = parseIp(input.gateway);
  const dnsParts = parseIp(input.dns);
  const validHost = hostParts !== null;
  const validGateway = gatewayParts !== null;
  const validDns = dnsParts !== null;
  const sameSubnet =
    validHost && validGateway
      ? sameNetwork(input.ip, input.gateway, input.prefix)
      : null;
  const remoteIp = "203.0.113.50";
  const remoteSameSubnet =
    validHost && sameSubnet !== false
      ? sameNetwork(input.ip, remoteIp, input.prefix)
      : null;
  const service = SERVICES.find((s) => s.key === input.service)!;

  const r = {
    layer1: validHost,
    layer2:
      validHost && validGateway && sameSubnet === true && !input.wrongSubnet,
    layer3:
      validHost &&
      validGateway &&
      sameSubnet === true &&
      !input.wrongSubnet &&
      !input.gatewayDown,
    dns:
      validHost &&
      validGateway &&
      sameSubnet === true &&
      !input.wrongSubnet &&
      !input.gatewayDown &&
      validDns &&
      !input.dnsWrong,
    service:
      validHost &&
      validGateway &&
      sameSubnet === true &&
      !input.wrongSubnet &&
      !input.gatewayDown &&
      validDns &&
      !input.dnsWrong &&
      !input.serviceBlocked,
  };

  return {
    validHost,
    validGateway,
    validDns,
    sameSubnet,
    remoteSameSubnet,
    service,
    stepResults: r,
  };
}

const STEPS = [
  { label: "layer1", caption: "检查本地地址" },
  { label: "layer2", caption: "检查同网段" },
  { label: "layer3", caption: "Ping 网关" },
  { label: "dns", caption: "DNS 解析" },
  { label: "service", caption: "服务端口连接" },
] as const;
const LABELS = Object.fromEntries(STEPS.map((s) => [s.label, s.caption]));
const BEAT_MS = 1000;

function buildTimeline(tl: Timeline) {
  const clock = { beat: 0 };
  STEPS.forEach((s, i) => tl.label(s.label, i * BEAT_MS));
  tl.add(clock, { beat: [0, 5], duration: 5 * BEAT_MS, ease: "linear" }, 0);
}

const buttonClass =
  "min-h-11 min-w-11 rounded-control border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

function NetworkConfigExperiment({ onReset }: { onReset: () => void }) {
  const id = useId();
  const [input, setInput] = useState<NetworkConfigInput>({
    ...INITIAL_NETWORK_CONFIG,
  });
  const [prediction, setPrediction] = useState<string>("");

  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const pauseRef = useRef(timeline.pause);
  useEffect(() => {
    pauseRef.current = timeline.pause;
  });
  useEffect(() => {
    if (timeline.reducedMotion) pauseRef.current();
  }, [timeline.reducedMotion]);

  const frame = timeline.currentStep;
  const {
    validHost,
    validGateway,
    validDns,
    sameSubnet,
    service,
    stepResults,
  } = evaluateNetworkConfig(input);

  const changeInput = <K extends keyof NetworkConfigInput>(
    key: K,
    value: NetworkConfigInput[K],
  ) => {
    timeline.goToStep(0);
    setInput((previous) => ({ ...previous, [key]: value }));
    setPrediction("");
  };

  const applyPreset = (
    ip: string,
    prefix: number,
    gateway: string,
    dns: string,
  ) => {
    timeline.goToStep(0);
    setInput((previous) => ({ ...previous, ip, prefix, gateway, dns }));
    setPrediction("");
  };

  const stepLabels = [
    "检查本地地址",
    "检查同网段",
    "Ping 网关",
    "DNS 解析",
    `${service.label} 端口 ${service.port} 连接`,
  ];

  const firstFailedLayer = !stepResults.layer1
    ? "layer1"
    : !stepResults.layer2
      ? "layer2"
      : !stepResults.layer3
        ? "layer3"
        : !stepResults.dns
          ? "dns"
          : stepResults.service
            ? "none"
            : "service";

  const predictionMatches =
    prediction === firstFailedLayer ||
    (prediction === "none" && firstFailedLayer === "none");

  return (
    <section
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-primary sm:p-5"
      aria-labelledby={`${id}-title`}
      data-testid="network-config-lab"
      data-frame={frame}
      data-reduced-motion={timeline.reducedMotion}
    >
      <h3 id={`${id}-title`} className="text-lg font-semibold">
        网络配置逐层诊断实验
      </h3>
      <p className="my-2 text-sm text-secondary">
        教学模型：先改配置、注入故障，再按链路层→网段→网关→DNS→服务端口逐步验证。
        图中连线颜色反映当前步骤是否通过；不是真实系统调用。
      </p>

      <div className="my-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <fieldset className="min-w-0">
          <legend className="text-sm font-medium">主机 IPv4 地址</legend>
          <input
            type="text"
            value={input.ip}
            onChange={(e) => changeInput("ip", e.target.value)}
            className={`mt-1 min-h-11 w-full rounded-control border bg-bg px-2 py-2 font-mono text-sm ${validHost ? "border-border" : "border-danger"}`}
            aria-invalid={!validHost}
          />
          {!validHost && (
            <p className="text-xs text-danger">请输入有效 IPv4 地址</p>
          )}
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-sm font-medium">
            前缀长度 /{input.prefix}
          </legend>
          <input
            type="range"
            min={8}
            max={30}
            step={1}
            value={input.prefix}
            onChange={(e) => changeInput("prefix", Number(e.target.value))}
            className="mt-3 h-6 w-full"
          />
          <p className="text-xs text-muted">掩码 {maskDotted(input.prefix)}</p>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-sm font-medium">默认网关</legend>
          <input
            type="text"
            value={input.gateway}
            onChange={(e) => changeInput("gateway", e.target.value)}
            className={`mt-1 min-h-11 w-full rounded-control border bg-bg px-2 py-2 font-mono text-sm ${validGateway ? "border-border" : "border-danger"}`}
          />
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-sm font-medium">DNS 服务器</legend>
          <input
            type="text"
            value={input.dns}
            onChange={(e) => changeInput("dns", e.target.value)}
            className={`mt-1 min-h-11 w-full rounded-control border bg-bg px-2 py-2 font-mono text-sm ${validDns ? "border-border" : "border-danger"}`}
          />
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-sm font-medium">测试服务</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`${buttonClass} ${input.service === s.key ? "border-accent text-accent" : "border-border"}`}
                aria-pressed={input.service === s.key}
                onClick={() => changeInput("service", s.key)}
              >
                {s.label} :{s.port}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-sm font-medium">快速预设</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            <button
              type="button"
              className={`${buttonClass} border-border`}
              onClick={() =>
                applyPreset("192.168.1.10", 24, "192.168.1.1", "192.168.1.1")
              }
            >
              正常 192.168.1.0/24
            </button>
            <button
              type="button"
              className={`${buttonClass} border-border`}
              onClick={() => applyPreset("10.0.0.5", 8, "10.0.0.1", "10.0.0.1")}
            >
              10.0.0.0/8
            </button>
          </div>
        </fieldset>
      </div>

      <fieldset className="my-3 min-w-0">
        <legend className="text-sm font-medium">
          故障注入（改动会回到步骤 0）
        </legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["wrongSubnet", "错误子网：网关改到 192.168.2.1"],
              ["gatewayDown", "网关失效：路由器不响应"],
              ["dnsWrong", "DNS 错误：解析失败"],
              ["serviceBlocked", "服务被挡：端口未监听/防火墙"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`${buttonClass} ${input[key] ? "border-danger text-danger" : "border-border"}`}
              aria-pressed={input[key]}
              onClick={() =>
                setInput((p) => {
                  const next = { ...p, [key]: !p[key] };
                  if (key === "wrongSubnet") {
                    next.gateway = !next.wrongSubnet
                      ? "192.168.2.1"
                      : INITIAL_NETWORK_CONFIG.gateway;
                  }
                  return next;
                })
              }
            >
              {label} · {input[key] ? "开" : "关"}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="my-3 min-w-0">
        <legend className="text-sm font-semibold">
          先预测：首次失败会出现在哪一层？
        </legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["layer1", "本地地址无效"],
            ["layer2", "同网段检查失败"],
            ["layer3", "网关不可达"],
            ["dns", "DNS 解析失败"],
            ["service", "服务端口失败"],
            ["none", "全部通过"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`network-predict-${value}`}
              aria-pressed={prediction === value}
              disabled={frame > 0}
              className={`${buttonClass} ${prediction === value ? "border-accent text-accent" : "border-border"}`}
              onClick={() => setPrediction(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset
        disabled={!prediction}
        data-testid="network-timeline"
        className="min-w-0 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11"
      >
        <legend className="text-sm">
          {prediction
            ? "验证预测：播放、单步或拖动进度"
            : "请先选择预测，再推进时间线"}
        </legend>
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption={
            timeline.reducedMotion
              ? "减少动态效果已开启：自动播放隐藏，仍可逐步或拖动观察。"
              : "共五步；播放、暂停、前后步进或拖进度均可。"
          }
          reset={{
            label: "完整 Reset",
            ariaLabel: "完整 Reset：恢复所有输入、预测、帧与播放",
            onClick: onReset,
          }}
        />
      </fieldset>

      <div className="my-3 overflow-x-auto">
        <svg
          viewBox="0 0 800 520"
          role="img"
          aria-label="网络拓扑：Ubuntu 主机经网关连接 DNS 服务器与远程服务；连线颜色反映当前测试步骤状态"
          className="mx-auto block w-full min-w-[320px] max-w-[900px]"
          style={{ fontSize: 12, color: C.text }}
        >
          <defs>
            <marker
              id={`${id}-arrow`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={C.accent} />
            </marker>
            <marker
              id={`${id}-arrow-off`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
            </marker>
            <marker
              id={`${id}-arrow-danger`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={C.danger} />
            </marker>
          </defs>

          <rect
            x="0"
            y="0"
            width="800"
            height="520"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />

          <text x="20" y="28" fill={C.text} fontSize="14" fontWeight="600">
            拓扑与当前状态
          </text>

          {/* Host */}
          <g transform="translate(60, 90)">
            <rect
              x="0"
              y="0"
              width="180"
              height="120"
              rx="6"
              fill={C.panel}
              stroke={stepResults.layer1 ? C.success : C.danger}
              strokeWidth="2"
            />
            <text
              x="90"
              y="28"
              textAnchor="middle"
              fill={C.text}
              fontSize="13"
              fontWeight="600"
            >
              Ubuntu 主机
            </text>
            <text
              x="90"
              y="52"
              textAnchor="middle"
              fill={C.muted}
              fontSize="12"
            >
              eth0
            </text>
            <text
              x="90"
              y="76"
              textAnchor="middle"
              fill={validHost ? C.text : C.danger}
              fontSize="12"
              fontFamily="monospace"
            >
              {validHost ? input.ip : "地址无效"}/{input.prefix}
            </text>
            <text
              x="90"
              y="98"
              textAnchor="middle"
              fill={C.muted}
              fontSize="11"
            >
              同网段检查：
              {sameSubnet === null ? "—" : sameSubnet ? "通过" : "失败"}
            </text>
          </g>

          {/* Router */}
          <g transform="translate(310, 90)">
            <rect
              x="0"
              y="0"
              width="120"
              height="120"
              rx="6"
              fill={C.panel}
              stroke={
                stepResults.layer3
                  ? C.success
                  : stepResults.layer2
                    ? C.warning
                    : C.border
              }
              strokeWidth="2"
            />
            <text
              x="60"
              y="28"
              textAnchor="middle"
              fill={C.text}
              fontSize="13"
              fontWeight="600"
            >
              网关/路由
            </text>
            <text
              x="60"
              y="56"
              textAnchor="middle"
              fill={validGateway ? C.text : C.danger}
              fontSize="12"
              fontFamily="monospace"
            >
              {validGateway ? input.gateway : "—"}
            </text>
            <text
              x="60"
              y="82"
              textAnchor="middle"
              fill={C.muted}
              fontSize="11"
            >
              {input.gatewayDown
                ? "无响应"
                : stepResults.layer3
                  ? "可达"
                  : "待测"}
            </text>
          </g>

          {/* DNS */}
          <g transform="translate(520, 90)">
            <rect
              x="0"
              y="0"
              width="120"
              height="120"
              rx="6"
              fill={C.panel}
              stroke={stepResults.dns ? C.success : C.border}
              strokeWidth="2"
            />
            <text
              x="60"
              y="28"
              textAnchor="middle"
              fill={C.text}
              fontSize="13"
              fontWeight="600"
            >
              DNS 服务器
            </text>
            <text
              x="60"
              y="56"
              textAnchor="middle"
              fill={validDns ? C.text : C.danger}
              fontSize="12"
              fontFamily="monospace"
            >
              {validDns ? input.dns : "—"}
            </text>
            <text
              x="60"
              y="82"
              textAnchor="middle"
              fill={C.muted}
              fontSize="11"
            >
              {input.dnsWrong
                ? "解析失败"
                : stepResults.dns
                  ? "可解析"
                  : "待测"}
            </text>
          </g>

          {/* Remote service */}
          <g transform="translate(670, 90)">
            <rect
              x="0"
              y="0"
              width="120"
              height="120"
              rx="6"
              fill={C.panel}
              stroke={stepResults.service ? C.success : C.border}
              strokeWidth="2"
            />
            <text
              x="60"
              y="28"
              textAnchor="middle"
              fill={C.text}
              fontSize="13"
              fontWeight="600"
            >
              远程服务器
            </text>
            <text
              x="60"
              y="52"
              textAnchor="middle"
              fill={C.muted}
              fontSize="12"
              fontFamily="monospace"
            >
              203.0.113.50
            </text>
            <text x="60" y="76" textAnchor="middle" fill={C.text} fontSize="12">
              {service.label}
            </text>
            <text
              x="60"
              y="98"
              textAnchor="middle"
              fill={stepResults.service ? C.success : C.muted}
              fontSize="11"
            >
              端口 {service.port} {stepResults.service ? "通" : "待测"}
            </text>
          </g>

          {/* Host <-> Router */}
          <path
            d="M240 150 H310"
            fill="none"
            stroke={
              frame >= 1
                ? stepResults.layer2
                  ? C.success
                  : C.danger
                : C.border
            }
            strokeWidth="3"
            strokeDasharray={input.wrongSubnet ? "6 4" : undefined}
            markerEnd={
              stepResults.layer2
                ? `url(#${id}-arrow)`
                : `url(#${id}-arrow-danger)`
            }
          />
          <text
            x="275"
            y="142"
            textAnchor="middle"
            fill={C.muted}
            fontSize="11"
          >
            二层/本地
          </text>

          {/* Router <-> Remote */}
          <path
            d="M430 150 H670"
            fill="none"
            stroke={
              frame >= 2
                ? stepResults.layer3
                  ? C.success
                  : C.danger
                : C.border
            }
            strokeWidth="3"
            markerEnd={
              stepResults.layer3
                ? `url(#${id}-arrow)`
                : `url(#${id}-arrow-danger)`
            }
          />
          <text
            x="550"
            y="142"
            textAnchor="middle"
            fill={C.muted}
            fontSize="11"
          >
            三层/路由
          </text>

          {/* Router <-> DNS */}
          <path
            d="M370 210 V330 H580 V210"
            fill="none"
            stroke={
              frame >= 3 ? (stepResults.dns ? C.success : C.danger) : C.border
            }
            strokeWidth="3"
            markerEnd={
              stepResults.dns ? `url(#${id}-arrow)` : `url(#${id}-arrow-danger)`
            }
          />
          <text
            x="475"
            y="350"
            textAnchor="middle"
            fill={C.muted}
            fontSize="11"
          >
            DNS 查询
          </text>

          {/* Remote service port */}
          <path
            d="M730 210 V330 H430 V210"
            fill="none"
            stroke={
              frame >= 4
                ? stepResults.service
                  ? C.success
                  : C.danger
                : C.border
            }
            strokeWidth="3"
            strokeDasharray="4 3"
            markerEnd={
              stepResults.service
                ? `url(#${id}-arrow)`
                : `url(#${id}-arrow-danger)`
            }
          />
          <text
            x="580"
            y="390"
            textAnchor="middle"
            fill={C.muted}
            fontSize="11"
          >
            {service.label} 端口 {service.port}
          </text>

          {/* Legend */}
          <g transform="translate(60, 430)">
            <rect
              x="0"
              y="0"
              width="680"
              height="70"
              rx="6"
              fill={C.panel}
              stroke={C.border}
            />
            <text x="20" y="24" fill={C.text} fontSize="12" fontWeight="600">
              图例
            </text>
            <line
              x1="20"
              y1="42"
              x2="60"
              y2="42"
              stroke={C.success}
              strokeWidth="3"
            />
            <text x="70" y="46" fill={C.muted} fontSize="11">
              通过
            </text>
            <line
              x1="140"
              y1="42"
              x2="180"
              y2="42"
              stroke={C.danger}
              strokeWidth="3"
            />
            <text x="190" y="46" fill={C.muted} fontSize="11">
              失败/不可达
            </text>
            <line
              x1="300"
              y1="42"
              x2="340"
              y2="42"
              stroke={C.border}
              strokeWidth="2"
            />
            <text x="350" y="46" fill={C.muted} fontSize="11">
              未测试
            </text>
            <text x="20" y="64" fill={C.muted} fontSize="11">
              当前测试：{stepLabels[frame] ?? "—"}
            </text>
          </g>
        </svg>
      </div>

      <div className="space-y-2">
        {stepLabels.map((label, index) => {
          const active = frame === index;
          const passed =
            index === 0
              ? stepResults.layer1
              : index === 1
                ? stepResults.layer2
                : index === 2
                  ? stepResults.layer3
                  : index === 3
                    ? stepResults.dns
                    : stepResults.service;
          return (
            <div
              key={label}
              data-testid={`network-step-${index}`}
              className={`flex items-center gap-3 rounded-control border p-2 text-sm ${active ? "border-accent bg-accent/5" : "border-border"}`}
            >
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: active
                    ? C.accent
                    : passed
                      ? C.success
                      : C.border,
                  color: "var(--accent-foreground, white)",
                }}
              >
                {index + 1}
              </span>
              <span className="flex-1">{label}</span>
              <span
                className={
                  passed
                    ? "text-success"
                    : active
                      ? "text-accent"
                      : "text-muted"
                }
              >
                {passed ? "通过" : active ? "测试中…" : "—"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-sm">
        <p data-testid="network-diagnosis" aria-live="polite">
          <strong>当前诊断：</strong>
          {!validHost
            ? "主机地址格式错误，无法开始测试。"
            : input.wrongSubnet
              ? `网关 ${input.gateway} 与主机不在同一子网（/${input.prefix}），二层转发失败。`
              : input.gatewayDown
                ? "网关不响应，三层及以上测试均无法到达。"
                : input.dnsWrong
                  ? "DNS 服务器无法解析目标域名；服务若依赖域名也将失败。"
                  : input.serviceBlocked
                    ? `网络层可达，但远程 ${service.label} 端口 ${service.port} 未监听或被防火墙拦截。`
                    : stepResults.service
                      ? "地址、网关、DNS、服务端口均通过；教学模型认为可达。"
                      : "点击播放或单步查看首个失败点。"}
        </p>
        {frame === 4 && prediction && (
          <p data-testid="network-feedback" className="mt-2">
            {predictionMatches
              ? "预测吻合。首个失败层与预测一致。"
              : `预测不符。实际首个失败层是 ${firstFailedLayer === "none" ? "无（全部通过）" : stepLabels[STEPS.findIndex((s) => s.label === firstFailedLayer)]}。`}
          </p>
        )}
      </div>

      <details className="mt-3 text-sm">
        <summary className="min-h-11 cursor-pointer py-3">
          模型边界与可核查预期
        </summary>
        <p>
          固定教学拓扑：主机经默认网关访问 DNS 与远程服务器。模型只检查 IPv4
          地址格式、按位与判断同网段，以及开关模拟的网关/DNS/服务状态。不发送真实网络包，不调用
          ping、ip、ss 或 ssh。远程服务器 IP 固定为 203.0.113.50（RFC 5737
          文档测试地址，不可路由）。
        </p>
        <p>
          完整 Reset
          会重新挂载实验并取消旧时间线，恢复参数、故障、预测和帧数，不撤销任何真实网络配置。
        </p>
      </details>
    </section>
  );
}

export function LopNetworkConfigurationLab() {
  const [generation, setGeneration] = useState(0);
  return (
    <NetworkConfigExperiment
      key={generation}
      onReset={() => setGeneration((value) => value + 1)}
    />
  );
}
