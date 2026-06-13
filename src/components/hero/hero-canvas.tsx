"use client";

/**
 * 首页 Hero 画布的 dynamic 边界 + WebGL 兜底（CLAUDE.md 硬规则 2/6，HEL-15）。
 *
 * 职责分层：
 *  1. WebGL2 能力检测（client，SSR 安全）——不支持则渲染静态海报 <HeroPoster/>，
 *     绝不挂载 Canvas、绝不白屏。
 *  2. 支持 WebGL2 → 走唯一的 next/dynamic + ssr:false 加载点：真正含 three import
 *     的 FerrariScene 被切成独立 chunk，不进首屏关键路径、不进公共 layout。
 *  3. dynamic 的 loading 占位用同一张海报（HEL-15）——用户秒见跑车海报，
 *     实时 3D 就绪后无缝接管，比脉冲点体验好。
 */

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * 已渲染好的跑车海报（总监用真 GPU 截图，public/hero-poster.webp，1444×1612）。
 * 兜底与 loading 共用。object-position 让车身居中偏下，呼应实时场景「车在下半部、
 * 顶部留白给文字」的构图。aria-hidden：纯装饰，不进无障碍树（与画布一致）。
 */
function HeroPoster() {
  return (
    // 刻意用原生 <img> 而非 next/image：这是铺满舞台的纯装饰兜底图，
    // 既要在「不支持 WebGL2」时直接静态铺满，又作 3D loading 占位，需简单可控的
    // object-cover 行为，不需要 next/image 的 sizes/optimizer 机制（webp 已 58KB）。
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hero-poster.webp"
      alt=""
      aria-hidden="true"
      className="h-full w-full object-cover object-[center_70%]"
    />
  );
}

const FerrariScene = dynamic(() => import("./ferrari-scene"), {
  ssr: false,
  // loading 占位 = 同一张海报，3D 就绪后被 Canvas 无缝接管
  loading: () => <HeroPoster />,
});

/**
 * 「就绪后淡入」过渡（HEL-17）：dynamic chunk 加载完成 → FerrariScene 挂载，此包裹层
 * 首帧 opacity-0、挂载后下一帧切 opacity-100，让实时画面从海报上柔和淡入，消除硬切。
 *
 * - 海报在底层（loading 占位 + 不支持 WebGL2 兜底都是它）；实时 Canvas 透明背景叠在其上，
 *   淡入时两者交叠 → 平滑过渡到实时画面。
 * - 时长用 DESIGN 动效 token --duration-page（320ms，页面级），呼应任务「~0.4s」精神；
 *   reduced-motion 下该 token 自动降为 0ms（globals.css），即瞬时显示，不违反动效原则 4。
 * - 注意：本文件是 three 的 dynamic 边界，禁止 import three（硬规则 6）——
 *   故淡入用纯 CSS opacity + React state，不触碰场景内部。
 */
function FadeInScene() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    // 下一帧再切到可见，确保 opacity-0 起始态先提交（触发 transition）
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`h-full w-full transition-opacity duration-(--duration-page) ease-standard ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <FerrariScene />
    </div>
  );
}

/**
 * WebGL2 能力检测——SSR 安全。
 *
 * 用 useSyncExternalStore（与 ferrari-scene.tsx 的 usePrefersReducedMotion 同款），
 * 而非 effect 内同步 setState（本仓库 eslint 禁 react-hooks/set-state-in-effect）：
 *  - getServerSnapshot 恒返回 true → SSR/首帧按「支持」渲染（dynamic 占位海报），
 *    避免服务端误判导致 hydration 抖动；真实检测在 client 挂载后生效。
 *  - 能力检测是「一次性恒定」事实（不随事件变化），subscribe 不订阅任何源（no-op）。
 *  - getClientSnapshot 仅在首次读取时建一次性 canvas 探测，结果缓存为模块级常量。
 */
let cachedWebgl2: boolean | null = null;

function detectWebGL2(): boolean {
  if (cachedWebgl2 !== null) return cachedWebgl2;
  try {
    const canvas = document.createElement("canvas");
    cachedWebgl2 = !!canvas.getContext("webgl2");
  } catch {
    // 某些隐私模式/老环境 getContext 直接抛错 → 视为不支持，走海报兜底
    cachedWebgl2 = false;
  }
  return cachedWebgl2;
}

const noopSubscribe = () => () => {};

function useWebGL2Supported(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    detectWebGL2, // client：真实探测（带模块级缓存）
    () => true, // server：乐观按支持，client 挂载后纠正
  );
}

export function HeroCanvas() {
  const webgl2 = useWebGL2Supported();
  // 不支持 WebGL2：直接静态海报兜底，永不挂载 three（连 chunk 都不拉）
  if (!webgl2) return <HeroPoster />;
  // 支持：海报作 loading 占位，实时 Canvas 就绪后柔和淡入接管（消除硬切）
  return (
    <div className="relative h-full w-full">
      {/* 底层海报：淡入期间在实时画面之下平滑过渡（loading 占位也是同一张） */}
      <div className="absolute inset-0">
        <HeroPoster />
      </div>
      <div className="absolute inset-0">
        <FadeInScene />
      </div>
    </div>
  );
}
