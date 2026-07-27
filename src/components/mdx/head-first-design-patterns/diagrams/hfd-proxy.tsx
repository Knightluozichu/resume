"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdProxyDiagram>：虚拟代理 ImageProxy 动画（Head First 设计模式 · 第11章）。
 *
 * 核心：RealImage 创建昂贵（加载 5 秒）。ImageProxy 实现相同 Icon 接口，先显示
 * 占位符，后台线程加载，完成后才创建 RealImage 并委托——Client 无感知，不被阻塞。
 *
 * 节拍：
 *  ① ImageProxy 和 RealImage 实现同一 Icon 接口；RealImage 尚未创建
 *  ② Client 调 paintIcon()——代理先显示「加载中」占位符
 *  ③ 后台线程加载（进度条），Client 不被阻塞
 *  ④ 加载完成，代理创建 RealImage 并委托 paintIcon()——显示真图
 *  ⑤ Client 全程只面对 Icon 接口，昂贵创建被推迟到真正需要时
 */

const VIEW_W = 720;
const VIEW_H = 450;

const ACCENT = "var(--accent)";
const PROXY_COLOR = "#C792EA";
const REAL_COLOR = "#E5B567";
const CLIENT_COLOR = "#5AA9E6";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "interface", caption: "ImageProxy 和 RealImage 实现同一 Icon 接口——此时 RealImage 还没创建" },
  { label: "call", caption: "Client 调 paintIcon()，代理先显示「加载中…」占位符，不急着建真对象" },
  { label: "loading", caption: "后台线程加载图片（进度条）——Client 不被阻塞，可以干别的事" },
  { label: "delegate", caption: "加载完成，代理创建 RealImage 并把 paintIcon() 委托给它——显示真图" },
  { label: "value", caption: "Client 全程只面对 Icon 接口，无感知；昂贵的创建被推迟到真正需要时" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdProxyDiagram() {
  const clientRef = useRef<SVGGElement | null>(null);
  const proxyRef = useRef<SVGGElement | null>(null);
  const realSlotRef = useRef<SVGGElement | null>(null);
  const realRef = useRef<SVGGElement | null>(null);
  const arrow1Ref = useRef<SVGLineElement | null>(null);
  const arrow2Ref = useRef<SVGLineElement | null>(null);
  const packetRef = useRef<SVGGElement | null>(null);
  const placeholderRef = useRef<SVGGElement | null>(null);
  const realBadgeRef = useRef<SVGGElement | null>(null);
  const progressFillRef = useRef<SVGRectElement | null>(null);
  const loadingLabelRef = useRef<SVGGElement | null>(null);
  const notBlockedRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① interface（0→T）：Client + Proxy + RealImage 空槽
      tl.add(clientRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(proxyRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.2);
      tl.add(realSlotRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("interface", 0);

      // ② call（T→2T）：Client→Proxy 调用，占位符出现
      tl.add(arrow1Ref.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(packetRef.current!, { opacity: [1, 1], x: [190, 360], y: [165, 165], duration: T * 0.5, ease: "inOut(2)" }, T * 1.1);
      tl.add(packetRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 1.6);
      tl.add(placeholderRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 1.4);
      tl.label("call", T);

      // ③ loading（2T→3T）：进度条填充，后台加载标签，Client 不被阻塞
      tl.add(loadingLabelRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(progressFillRef.current!, { width: [0, 186], duration: T * 0.9, ease: "inOut(1)" }, T * 2);
      tl.add(notBlockedRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 2.4);
      tl.label("loading", T * 2);

      // ④ delegate（3T→4T）：空槽淡出，RealImage 出现，委托箭头，占位符换成真图徽章
      tl.add(realSlotRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(realRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 3.1);
      tl.add(arrow2Ref.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.3);
      tl.add(placeholderRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 3.4);
      tl.add(realBadgeRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 3.5);
      tl.label("delegate", T * 3);

      // ⑤ value（4T→5T）：结论
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("value", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="虚拟代理动画。ImageProxy 和 RealImage 实现同一 Icon 接口。Client 调用 paintIcon 时代理先显示加载中占位符，后台线程加载图片，Client 不被阻塞。加载完成后代理创建 RealImage 并委托 paintIcon 显示真图。Client 全程只面对 Icon 接口无感知，昂贵的创建被推迟到真正需要时。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            虚拟代理 · 图片加载
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            代理先顶替，后台慢慢加载——Client 不被昂贵创建阻塞
          </text>

          {/* Client */}
          <g ref={clientRef} style={{ opacity: 0 }}>
            <rect x={48} y={110} width={140} height={110} rx="10" fill={CLIENT_COLOR} fillOpacity="0.12" stroke={CLIENT_COLOR} strokeWidth="1.8" />
            <text x={118} y={138} textAnchor="middle" fontSize="13" fontWeight="700" fill={CLIENT_COLOR}>
              Client
            </text>
            <text x={118} y={158} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              只认识 Icon 接口
            </text>
            <text x={118} y={185} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              icon.paintIcon()
            </text>
          </g>

          {/* ImageProxy */}
          <g ref={proxyRef} style={{ opacity: 0 }}>
            <rect x={270} y={110} width={190} height={110} rx="10" fill={PROXY_COLOR} fillOpacity="0.12" stroke={PROXY_COLOR} strokeWidth="2" />
            <text x={365} y={138} textAnchor="middle" fontSize="13" fontWeight="700" fill={PROXY_COLOR}>
              ImageProxy
            </text>
            <text x={365} y={158} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              implements Icon · 代理
            </text>
            <text x={365} y={185} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              realImage: null → 创建
            </text>
          </g>

          {/* RealImage 空槽（未创建） */}
          <g ref={realSlotRef} style={{ opacity: 0 }}>
            <rect x={540} y={110} width={150} height={110} rx="10" fill="none" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x={615} y={155} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              RealImage
            </text>
            <text x={615} y={175} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              （尚未创建）
            </text>
          </g>

          {/* RealImage（已创建） */}
          <g ref={realRef} style={{ opacity: 0 }}>
            <rect x={540} y={110} width={150} height={110} rx="10" fill={REAL_COLOR} fillOpacity="0.14" stroke={REAL_COLOR} strokeWidth="2" />
            <text x={615} y={138} textAnchor="middle" fontSize="13" fontWeight="700" fill={REAL_COLOR}>
              RealImage
            </text>
            <text x={615} y={158} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              implements Icon
            </text>
            <text x={615} y={185} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              加载需 5 秒
            </text>
          </g>

          {/* 调用箭头 Client→Proxy */}
          <line ref={arrow1Ref} x1={190} y1={165} x2={268} y2={165} stroke="var(--text-secondary)" strokeWidth="1.5" style={{ opacity: 0 }} />
          {/* 委托箭头 Proxy→RealImage */}
          <line ref={arrow2Ref} x1={462} y1={165} x2={538} y2={165} stroke={REAL_COLOR} strokeWidth="1.8" style={{ opacity: 0 }} />

          {/* 调用包 */}
          <g ref={packetRef} style={{ opacity: 0, transform: "translate(190px, 165px)" }}>
            <circle cx={0} cy={0} r="7" fill={CLIENT_COLOR} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* 占位符徽章 */}
          <g ref={placeholderRef} style={{ opacity: 0 }}>
            <rect x={285} y={228} width={160} height={24} rx="6" fill={PROXY_COLOR} fillOpacity="0.16" stroke={PROXY_COLOR} strokeWidth="1.2" />
            <text x={365} y={244} textAnchor="middle" fontSize="10" fontWeight="700" fill={PROXY_COLOR}>
              ⏳ 加载中…（占位符）
            </text>
          </g>

          {/* 真图徽章 */}
          <g ref={realBadgeRef} style={{ opacity: 0 }}>
            <rect x={285} y={228} width={160} height={24} rx="6" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x={365} y={244} textAnchor="middle" fontSize="10" fontWeight="700" fill={OK_COLOR}>
              🖼 显示真实图片
            </text>
          </g>

          {/* 进度条 */}
          <rect x={270} y={262} width={190} height={14} rx="7" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <rect ref={progressFillRef} x={272} y={264} width={0} height={10} rx="5" fill={OK_COLOR} fillOpacity="0.8" />

          {/* 后台加载标签 */}
          <g ref={loadingLabelRef} style={{ opacity: 0 }}>
            <text x={365} y={296} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              后台线程加载中…
            </text>
          </g>

          {/* Client 不被阻塞徽章 */}
          <g ref={notBlockedRef} style={{ opacity: 0 }}>
            <rect x={58} y={228} width={120} height={24} rx="6" fill={CLIENT_COLOR} fillOpacity="0.16" stroke={CLIENT_COLOR} strokeWidth="1.2" />
            <text x={118} y={244} textAnchor="middle" fontSize="10" fontWeight="700" fill={CLIENT_COLOR}>
              Client 不被阻塞
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={330} width={540} height={44} rx="8" fill={PROXY_COLOR} fillOpacity="0.1" stroke={PROXY_COLOR} strokeWidth="1.6" />
            <text x={360} y={348} textAnchor="middle" fontSize="12" fontWeight="700" fill={PROXY_COLOR}>
              代理和真对象实现同一接口——Client 无感知
            </text>
            <text x={360} y={366} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
              昂贵的创建被推迟到真正需要时，加载期间用占位符顶替
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="虚拟代理控制对昂贵对象的访问：先顶替、后台加载、就绪后委托。远程代理、保护代理同理——代理是对象的「代言人」。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        代理模式为另一个对象提供替身以控制对它的访问。虚拟代理延迟昂贵对象的创建，
        远程代理隐藏网络通信，保护代理控制访问权限。
        代理和真实对象实现同一接口，客户端无感知——访问被代理「代言」。
      </figcaption>
    </figure>
  );
}
