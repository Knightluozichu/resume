"use client";

/**
 * <PointShadowsCanvas>：「点阴影」章（HEL-83）主 viz 的实现层（three.js 内建点光阴影 = 深度立方图全向阴影）。
 *
 * !!! 含 three / R3F / drei 代码，只允许经 point-shadows-demo.tsx 的 next/dynamic(ssr:false)
 *     懒加载（CLAUDE.md 硬规则 2/6）。绝不进公共 layout、绝不进首屏静态 import 链路。
 *
 * 教学核心（承接上一章「阴影映射」的方向光单张 2D 深度图，本章是点光源的全向版）：
 * three.js 的 PointLight castShadow 内部正是用「深度立方体贴图」做全向阴影——朝 6 个方向各渲一张
 * 距离图把光源周围 360° 全包住。本 demo 把点光源放在一个「朝内的房间」里，移动它能看到四壁阴影
 * 全向同时变化（这是点阴影 vs 单向阴影最直观的差异），是本 demo 头牌。
 *  - <Canvas shadows>：开启阴影渲染。
 *  - 一盏 PointLight castShadow（位置可动），配 shadow-mapSize（阴影图分辨率，点光是 6 面 cubemap）、
 *    shadow-bias（深度偏移）、shadow-camera-near/far（点光阴影相机是透视，far 要够罩住房间）。
 *  - 场景：一个朝内的大盒子当房间（boxGeometry + 材质 side=BackSide、receiveShadow）+ 房间内几个物体
 *    （球 / 立方体，castShadow + receiveShadow）。点光源在房间中央偏移处。
 *
 * 控件（≤5，照 ShadowMappingCanvas 控件 + 重置范式）：
 *  ① 光源方位（绕房间中心转点光源 + 高度，看四壁阴影全向同时变——头牌）
 *  ② 阴影图分辨率（256 / 512 / 1024 / 2048 分段，看阴影锯齿随分辨率变；点光是 6 面 cubemap，每面这个尺寸）
 *  ③ depth bias（滑块：往最大拖 → peter panning 阴影脱离；中间干净。诚实化——不声称能拖出 acne）
 *  ④ 物体自转开关（reduced-motion 默认关；转起来看影子随物体动）
 *  必有重置。
 *
 * 渲染策略（硬约束，照 ShadowMappingCanvas / CubemapCanvas 范式）：
 *  - frameloop 可见性门控 always/never：可见时连续渲染（立即出图 + 自然处理 resize），离屏 never
 *    （不空转 GPU）。放弃纯 demand —— demand 下画布尺寸测量竞态会首屏黑屏（HEL-72 踩过）。
 *  - 改分辨率：dispose 旧 shadow.map（取自 light ref，非 hook 值）让 three 按新 mapSize 重建 6 面。
 *  - 改 bias / 方位：声明式 shadow-bias / position；改任意参数 invalidate 踢一帧。
 *  - reduced-motion：默认不自转（autoRotate 默认 false），靠控件与 OrbitControls 拖动，天然友好。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide, Color, type Group, type PointLight } from "three";

export type PointShadowsCanvasProps = {
  height?: number;
  caption?: string;
};

/** 阴影图分辨率档位（点光是 6 面 cubemap，每面这个尺寸；看阴影锯齿随分辨率变）。 */
const RESOLUTIONS = [256, 512, 1024, 2048] as const;
type Resolution = (typeof RESOLUTIONS)[number];

/** 默认值（开箱即展示干净的全向阴影：1024 + 适中 bias + 光源在房间内偏上一角）。 */
const DEFAULT_RESOLUTION: Resolution = 1024;
const DEFAULT_BIAS = -0.002; // 适中负偏移：默认干净（无 peter panning）
const DEFAULT_AZIMUTH = 0.7; // 光源绕房间中心的方位角（弧度）
const DEFAULT_HEIGHT = 1.6; // 光源高度
const DEFAULT_AUTOROTATE = false; // reduced-motion 友好：默认不自转

/** 房间半边长（朝内盒子，BackSide）。 */
const ROOM_HALF = 5;

/* ──────────────────────────────────────────────────────────────────────────
 * 场景：朝内的房间（BackSide 大盒子，receiveShadow）+ 房间内几个物体（球 / 立方体，cast+receive）。
 * 点光源在房间中央偏移处，移动它看四壁阴影全向变化。
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * 一盏可在房间内移动的点光源，castShadow。把本章要教的参数（mapSize / bias / near-far）全挂在它上。
 *  - azimuth / heightY：光源在房间内的方位与高度（控件①），绕中心转看四壁阴影全向变。
 *  - resolution：shadow.mapSize（控件②，点光是 6 面 cubemap），改后 dispose 旧 map 让 three 重建。
 *  - bias：shadow.bias（控件③）。
 *  - shadow-camera near/far：点光阴影相机是透视，far 要够罩住整间房（对角线 ~ ROOM_HALF*2*√3）。
 */
function RoomPointLight({
  azimuth,
  heightY,
  resolution,
  bias,
}: {
  azimuth: number;
  heightY: number;
  resolution: number;
  bias: number;
}) {
  const ref = useRef<PointLight>(null);
  const { invalidate } = useThree();

  // 光源位置：绕房间中心转 + 可调高度，始终在房间内部（半径小于房间半边长）。
  const radius = 2.4;
  const x = Math.sin(azimuth) * radius;
  const z = Math.cos(azimuth) * radius;
  const y = heightY;

  // 分辨率改变：dispose 旧 shadow.map，three 会按新 mapSize 重建 6 面深度立方图（否则尺寸不更新）。
  // light 取自 ref.current（非 hook 返回值，可安全 mutate，区别于 gl/scene 等 hook 值）。
  useEffect(() => {
    const light = ref.current;
    if (!light) return;
    light.shadow.mapSize.set(resolution, resolution);
    const map = light.shadow.map;
    if (map) {
      map.dispose();
      light.shadow.map = null; // 置 null 让 three 按新 mapSize 重建深度立方图
    }
    light.shadow.needsUpdate = true;
    invalidate();
  }, [resolution, invalidate]);

  // 光源方位 / 高度 / bias 改变：踢一帧（四壁阴影、偏移随之变；bias 走声明式 shadow-bias）。
  useEffect(() => {
    invalidate();
  }, [azimuth, heightY, bias, invalidate]);

  return (
    <pointLight
      ref={ref}
      position={[x, y, z]}
      intensity={18}
      distance={20}
      decay={1.4}
      color="#fff2e0"
      castShadow
      // depth bias（控件③）：声明式，往大拖 → peter panning 阴影脱离；中间值干净。
      shadow-bias={bias}
      // 阴影图分辨率（控件②）：声明式，effect 里再 dispose 旧 map 触发按新尺寸重建 6 面。
      shadow-mapSize-width={resolution}
      shadow-mapSize-height={resolution}
      // 点光阴影相机是透视：near 小、far 要够罩住整间房（房间对角线）。
      shadow-camera-near={0.1}
      shadow-camera-far={20}
    />
  );
}

/** 光源在房间里的位置标记：一个小自发光球，跟着光源走，让读者看清「光在哪」。 */
function LightMarker({
  azimuth,
  heightY,
}: {
  azimuth: number;
  heightY: number;
}) {
  const radius = 2.4;
  const x = Math.sin(azimuth) * radius;
  const z = Math.cos(azimuth) * radius;
  return (
    <mesh position={[x, heightY, z]}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshBasicMaterial color="#fff2e0" toneMapped={false} />
    </mesh>
  );
}

/** 房间内投影的几个物体：两个立方体 + 一个球，全 castShadow + receiveShadow；可整体自转。 */
function SceneObjects({ autoRotate }: { autoRotate: boolean }) {
  const groupRef = useRef<Group>(null);
  const { invalidate } = useThree();
  useFrame((_, delta) => {
    if (!autoRotate) return;
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.4;
    invalidate();
  });

  return (
    <group ref={groupRef}>
      {/* 中央立方体。 */}
      <mesh position={[-1.6, -3.2, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshStandardMaterial color="#7c5cff" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* 一个小立方体。 */}
      <mesh
        position={[1.9, -3.6, -1.3]}
        rotation={[0, 0.6, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#5cffd0" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* 一个球。 */}
      <mesh position={[1.3, -2.4, 1.7]} castShadow receiveShadow>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshStandardMaterial color="#ff7cae" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

/** 朝内的房间：一个大盒子，材质 side=BackSide（只渲内壁），receiveShadow（阴影投在四壁 + 地面上）。 */
function Room() {
  return (
    <mesh receiveShadow>
      <boxGeometry args={[ROOM_HALF * 2, ROOM_HALF * 2, ROOM_HALF * 2]} />
      {/*
       * 关键：side=BackSide 只渲染朝内的背面 = 站在房间里看四壁。
       * 若用默认 FrontSide，盒子只渲外壁、从里面看是透的、四壁也收不到阴影（见正文误区）。
       */}
      <meshStandardMaterial
        color="#6b6b7a"
        roughness={0.95}
        metalness={0}
        side={BackSide}
      />
    </mesh>
  );
}

function Scene({
  azimuth,
  heightY,
  resolution,
  bias,
  autoRotate,
  onReady,
}: {
  azimuth: number;
  heightY: number;
  resolution: number;
  bias: number;
  autoRotate: boolean;
  onReady: (invalidate: () => void) => void;
}) {
  const { invalidate } = useThree();
  useEffect(() => {
    onReady(invalidate);
  }, [invalidate, onReady]);

  return (
    <>
      <ambientLight intensity={0.18} />
      <RoomPointLight
        azimuth={azimuth}
        heightY={heightY}
        resolution={resolution}
        bias={bias}
      />
      <LightMarker azimuth={azimuth} heightY={heightY} />
      <Room />
      <SceneObjects autoRotate={autoRotate} />
      <OrbitControls
        enablePan={false}
        enableZoom
        enableDamping={false}
        minDistance={3}
        maxDistance={9}
        onChange={() => invalidate()}
      />
    </>
  );
}

export default function PointShadowsCanvas({
  height = 400,
  caption = "本 demo 用 three.js 内建点光阴影（PointLight castShadow，底层正是本章讲的「深度立方体贴图」——朝 6 个方向各渲一张距离图把光源 360° 全包住）。一盏点光源在一间朝内的房间里：移动「光源方位 / 高度」，四面墙和地面的影子会全向同时变化——这就是点阴影 vs 方向光单向阴影最直观的差异。阴影图分辨率：256↔2048（点光是 6 面 cubemap，每面这个尺寸），越低阴影边缘锯齿越粗。depth bias：往最大拖 → peter panning 阴影脱离；中间值干净。物体自转：看影子随物体动。想看底层 GLSL（6 面 view 矩阵 + 方向向量采样）见下方「代码对照」。拖动画布转视角、滚轮缩放，点重置回初始。",
}: PointShadowsCanvasProps) {
  const [azimuth, setAzimuth] = useState(DEFAULT_AZIMUTH);
  const [heightY, setHeightY] = useState(DEFAULT_HEIGHT);
  const [resolution, setResolution] = useState<Resolution>(DEFAULT_RESOLUTION);
  const [bias, setBias] = useState(DEFAULT_BIAS);
  const [autoRotate, setAutoRotate] = useState(DEFAULT_AUTOROTATE);

  // 可见性门控 frameloop（ShadowMappingCanvas 同款范式）：可见 always、离屏 never，避免 demand 首屏黑屏。
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 改参时踢一帧（静止场景也能立即反映新参数）。
  const invalidateRef = useRef<(() => void) | null>(null);
  const onReady = useCallback((invalidate: () => void) => {
    invalidateRef.current = invalidate;
  }, []);
  useEffect(() => {
    invalidateRef.current?.();
  }, [azimuth, heightY, resolution, bias, autoRotate]);

  const groupId = useId();
  const reset = () => {
    setAzimuth(DEFAULT_AZIMUTH);
    setHeightY(DEFAULT_HEIGHT);
    setResolution(DEFAULT_RESOLUTION);
    setBias(DEFAULT_BIAS);
    setAutoRotate(DEFAULT_AUTOROTATE);
  };

  return (
    <div
      ref={wrapRef}
      className="mdx-point-shadows-demo my-6 rounded-card border border-border bg-elevated p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      <div
        className="overflow-hidden rounded-control border border-border bg-bg"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent-glow)" }}
      >
        <Canvas
          shadows
          frameloop={visible ? "always" : "never"}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [6, 4, 7], fov: 50 }}
          style={{ height, width: "100%", display: "block" }}
          onCreated={(state) => {
            state.gl.setClearColor(new Color("#0a0a0f"), 1);
          }}
        >
          <Scene
            azimuth={azimuth}
            heightY={heightY}
            resolution={resolution}
            bias={bias}
            autoRotate={autoRotate}
            onReady={onReady}
          />
        </Canvas>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {/* ① 光源方位（头牌：绕房间转光，看四壁阴影全向变） */}
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor={`${groupId}-azimuth`}
            className="w-28 shrink-0 text-xs text-secondary"
          >
            光源方位
          </label>
          <input
            id={`${groupId}-azimuth`}
            type="range"
            min={0}
            max={Math.PI * 2}
            step={0.01}
            value={azimuth}
            onChange={(e) => setAzimuth(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-accent"
          />
          <span className="w-16 shrink-0 text-right font-mono text-xs text-primary">
            {((azimuth / Math.PI) * 180).toFixed(0)}°
          </span>
        </div>

        {/* ① 光源高度 */}
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor={`${groupId}-height`}
            className="w-28 shrink-0 text-xs text-secondary"
          >
            光源高度
          </label>
          <input
            id={`${groupId}-height`}
            type="range"
            min={-3}
            max={3.5}
            step={0.05}
            value={heightY}
            onChange={(e) => setHeightY(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-accent"
          />
          <span className="w-16 shrink-0 text-right font-mono text-xs text-primary">
            {heightY.toFixed(2)}
          </span>
        </div>
        <p className="pl-28 text-xs text-secondary">
          移动光源 → <strong>四面墙和地面的影子全向同时变</strong>
          ——这是点阴影 vs 方向光单向阴影最直观的差异。
        </p>

        {/* ② 阴影图分辨率（分段切换） */}
        <div
          className="flex flex-wrap items-center gap-3"
          role="group"
          aria-label="阴影图分辨率"
        >
          <span className="w-28 shrink-0 text-xs text-secondary">
            阴影图分辨率
          </span>
          <div className="inline-flex overflow-hidden rounded-control border border-border">
            {RESOLUTIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setResolution(r)}
                aria-pressed={resolution === r}
                className={`px-3 py-1 font-mono text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  resolution === r
                    ? "bg-accent/15 text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ③ depth bias */}
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor={`${groupId}-bias`}
            className="w-28 shrink-0 text-xs text-secondary"
          >
            depth bias
          </label>
          <input
            id={`${groupId}-bias`}
            type="range"
            min={-0.006}
            max={0.012}
            step={0.0001}
            value={bias}
            onChange={(e) => setBias(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-accent"
          />
          <span className="w-20 shrink-0 text-right font-mono text-xs text-primary">
            {bias.toFixed(4)}
          </span>
        </div>
        <p className="pl-28 text-xs text-secondary">
          往<strong>最大</strong>拖 → <strong>peter panning</strong>{" "}
          阴影和物体脚下脱节、缩回；中间值干净。点光的 bias
          比方向光更需细调（见正文误区）。
        </p>

        {/* ④ 物体自转开关 */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-28 shrink-0 text-xs text-secondary">物体自转</span>
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            aria-pressed={autoRotate}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              autoRotate
                ? "border-accent bg-accent/15 text-primary"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {autoRotate ? "开（转动）" : "关（静止）"}
          </button>
        </div>

        <p className="text-xs text-secondary">
          猜一猜：把光源<strong>移到房间一个角落</strong>
          ，你觉得<strong>哪面墙</strong>上物体的影子被拉得<strong>最长</strong>
          ？先拖「光源方位」试试，再看下面的解释。无任何外部资源。
        </p>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
