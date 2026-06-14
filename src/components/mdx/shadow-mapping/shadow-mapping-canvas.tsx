"use client";

/**
 * <ShadowMappingCanvas>：「阴影映射」章（HEL-82）主 viz 的实现层（three.js 内建 shadow map 实时调参）。
 *
 * !!! 含 three / R3F / drei 代码，只允许经 shadow-mapping-demo.tsx 的 next/dynamic(ssr:false)
 *     懒加载（CLAUDE.md 硬规则 2/6）。绝不进公共 layout、绝不进首屏静态 import 链路。
 *
 * 教学核心：three.js 的内建 shadow map 本质就是本章讲的 shadow mapping——它在内部同样是
 * 「第一遍从光源视角渲一张深度图、第二遍回相机比深度判阴影」的两遍法。本 demo 把本章要教的
 * 参数全做成实时控件，让读者亲手拖出概念：
 *  - <Canvas shadows>：开启阴影渲染。
 *  - 一盏 DirectionalLight castShadow，配 shadow-mapSize（阴影图分辨率）、shadow-bias（深度偏移）、
 *    shadow-camera 正交范围（光锥）。地面 receiveShadow，几个物体 castShadow + receiveShadow。
 *  - PCF 软阴影开关走 R3F 声明式 <Canvas shadows={pcf ? "soft" : "basic"}>：soft=PCFSoftShadowMap 软边、
 *    basic=BasicShadowMap 硬边，改 prop 由 R3F 自动重配 gl.shadowMap.type（不直接 mutate hook 返回的 gl）。
 *
 * 控件（≤5，照 InstancingCanvas 控件 + 重置范式）：
 *  ① 光源角度（绕场景转光源，看阴影方向变化）
 *  ② 阴影图分辨率（256 / 512 / 1024 / 2048 分段，看锯齿随分辨率变化）
 *  ③ depth bias（滑块：往最大拖→peter panning 阴影脱离悬浮；负方向影子贴紧物体；中间干净。
 *    shadow acne 概念交给正文图解/误区——three.js 内建偏移太稳，盲调演示不出 acne）
 *  ④ PCF 软阴影开关（BasicShadowMap 硬边 ↔ PCFSoftShadowMap 软边）
 *  必有重置。
 *
 * 渲染策略（硬约束，照 CubemapCanvas / InstancingCanvas 范式）：
 *  - frameloop 可见性门控 always/never：可见时连续渲染（立即出图 + 自然处理 resize），离屏 never
 *    （不空转 GPU）。放弃纯 demand —— demand 下画布尺寸测量竞态会首屏黑屏（HEL-72 踩过）。
 *  - 改分辨率：dispose 旧 shadow.map（取自 light ref，非 hook 值）让 three 按新 mapSize 重建。
 *  - 改 PCF：换 <Canvas shadows> prop；改任意参数 invalidate 踢一帧（frameloop=always 下随即重渲）。
 *  - reduced-motion：本 demo 无自转动画（场景静止、靠控件与 OrbitControls 拖动），天然友好。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color, type DirectionalLight } from "three";

export type ShadowMappingCanvasProps = {
  height?: number;
  caption?: string;
};

/** 阴影图分辨率档位（看锯齿随分辨率变化）。 */
const RESOLUTIONS = [256, 512, 1024, 2048] as const;
type Resolution = (typeof RESOLUTIONS)[number];

/** 默认值（开箱即展示干净阴影：1024 + PCF + 适中 bias + 斜上方光）。 */
const DEFAULT_RESOLUTION: Resolution = 1024;
const DEFAULT_BIAS = -0.0015; // 适中负偏移：默认干净（无 peter panning，影子贴紧物体）
const DEFAULT_PCF = true;
const DEFAULT_ANGLE = 0.9; // 光源绕 Y 轴的方位角（弧度）

/* ──────────────────────────────────────────────────────────────────────────
 * 场景：地面 + 几个物体（立方体 / 球）。物体 castShadow，地面 receiveShadow（也 cast 自身不需）。
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * 一盏可绕场景旋转的方向光，castShadow。把本章要教的参数（mapSize / bias / PCF / 光锥）全挂在它上。
 *  - angle：光源绕 Y 轴方位（控件①），半径固定、高度固定，转一圈看阴影方向变化。
 *  - resolution：shadow.mapSize（控件②），改后 dispose 旧 map 让 three 重建。
 *  - bias：shadow.bias（控件③）。
 *  - shadow-camera 正交范围固定罩住场景（光锥），避免越界采样致远处全黑/全亮。
 */
function ShadowLight({
  angle,
  resolution,
  bias,
}: {
  angle: number;
  resolution: number;
  bias: number;
}) {
  const ref = useRef<DirectionalLight>(null);
  const { invalidate } = useThree();

  // 光源位置：绕 Y 轴转 + 固定高度，始终斜照场景。
  const radius = 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const y = 7;

  // 分辨率改变：dispose 旧 shadow.map，three 会按新 mapSize 重建（否则贴图尺寸不更新）。
  // light 取自 ref.current（非 hook 返回值，可安全 mutate，区别于 gl/scene 等 hook 值）。
  useEffect(() => {
    const light = ref.current;
    if (!light) return;
    light.shadow.mapSize.set(resolution, resolution);
    // normalBias = 0：关掉 three 的法线方向偏移，让正 depth bias 的 peter panning
    // 阴影脱离更清楚（否则 normalBias 会额外补偿、削弱正 bias 的脱离效果）。
    light.shadow.normalBias = 0;
    const map = light.shadow.map;
    if (map) {
      map.dispose();
      light.shadow.map = null; // 置 null 让 three 按新 mapSize 重建深度图
    }
    light.shadow.needsUpdate = true;
    invalidate();
  }, [resolution, invalidate]);

  // 光源方位 / bias 改变：踢一帧（阴影方向、偏移随之变；bias 走声明式 shadow-bias）。
  useEffect(() => {
    invalidate();
  }, [angle, bias, invalidate]);

  return (
    <directionalLight
      ref={ref}
      position={[x, y, z]}
      intensity={2.4}
      castShadow
      // depth bias（控件③）：声明式，往大拖→peter panning 阴影脱离；负方向影子贴紧物体。
      shadow-bias={bias}
      // 阴影图分辨率（控件②）：声明式，effect 里再 dispose 旧 map 触发按新尺寸重建。
      shadow-mapSize-width={resolution}
      shadow-mapSize-height={resolution}
      // 光锥（正交阴影相机）：范围固定罩住整个场景，避免越界采样。
      shadow-camera-near={0.5}
      shadow-camera-far={24}
      shadow-camera-left={-9}
      shadow-camera-right={9}
      shadow-camera-top={9}
      shadow-camera-bottom={-9}
    />
  );
}

/** 投影到地面的几个物体：两个立方体 + 一个球，全 castShadow + receiveShadow。 */
function SceneObjects() {
  return (
    <>
      {/* 地面：大平板，receiveShadow（阴影投在它上面）。 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#6b6b7a" roughness={0.95} metalness={0} />
      </mesh>

      {/* 中央立方体。 */}
      <mesh position={[-1.6, 1, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#7c5cff" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* 一个小立方体。 */}
      <mesh
        position={[1.8, 0.7, -1.4]}
        rotation={[0, 0.6, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial color="#5cffd0" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* 一个球，悬在地面上方一点（peter panning 时它的影子最易看脱离）。 */}
      <mesh position={[1.4, 1.5, 1.8]} castShadow receiveShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#ff7cae" roughness={0.5} metalness={0.1} />
      </mesh>
    </>
  );
}

function Scene({
  angle,
  resolution,
  bias,
  onReady,
}: {
  angle: number;
  resolution: number;
  bias: number;
  onReady: (invalidate: () => void) => void;
}) {
  const { invalidate } = useThree();
  useEffect(() => {
    onReady(invalidate);
  }, [invalidate, onReady]);

  return (
    <>
      <ambientLight intensity={0.45} />
      <ShadowLight angle={angle} resolution={resolution} bias={bias} />
      <SceneObjects />
      <OrbitControls
        enablePan={false}
        enableZoom
        enableDamping={false}
        minDistance={6}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2.1}
        onChange={() => invalidate()}
      />
    </>
  );
}

export default function ShadowMappingCanvas({
  height = 400,
  caption = "本 demo 用 three.js 内建 shadow map（与本章讲的「先从光源渲一张深度图、再回相机比深度判阴影」两遍法同一原理）。光源角度：绕场景转光，看阴影方向变。阴影图分辨率：256↔2048，越低阴影边缘锯齿越粗。depth bias：往最大拖 → peter panning 阴影脱离悬浮；负方向让影子贴紧物体；中间值干净（shadow acne 成因见正文图解）。PCF：关 = 硬边、开 = 软化锯齿边。想看底层 GLSL 实现见下方「代码对照」。拖动画布转视角、滚轮缩放，点重置回初始。",
}: ShadowMappingCanvasProps) {
  const [angle, setAngle] = useState(DEFAULT_ANGLE);
  const [resolution, setResolution] = useState<Resolution>(DEFAULT_RESOLUTION);
  const [bias, setBias] = useState(DEFAULT_BIAS);
  const [pcf, setPcf] = useState(DEFAULT_PCF);

  // 可见性门控 frameloop（CubemapCanvas 同款范式）：可见 always、离屏 never，避免 demand 首屏黑屏。
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
  }, [angle, resolution, bias, pcf]);

  const groupId = useId();
  const reset = () => {
    setAngle(DEFAULT_ANGLE);
    setResolution(DEFAULT_RESOLUTION);
    setBias(DEFAULT_BIAS);
    setPcf(DEFAULT_PCF);
  };

  return (
    <div
      ref={wrapRef}
      className="mdx-shadow-mapping-demo my-6 rounded-card border border-border bg-elevated p-6"
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
        {/*
         * PCF 软阴影开关（控件④）：走 R3F 声明式 shadows prop——"soft" = PCFSoftShadowMap（软边）、
         * "basic" = BasicShadowMap（硬边）。改 prop 时 R3F 自动重配 gl.shadowMap.type（避免直接 mutate
         * useThree 返回的 gl，触发 react-hooks/immutability）。frameloop=always 下阴影随即重渲。
         */}
        <Canvas
          shadows={pcf ? "soft" : "basic"}
          frameloop={visible ? "always" : "never"}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [9, 8, 11], fov: 42 }}
          style={{ height, width: "100%", display: "block" }}
          onCreated={(state) => {
            state.gl.setClearColor(new Color("#0a0a0f"), 1);
          }}
        >
          <Scene
            angle={angle}
            resolution={resolution}
            bias={bias}
            onReady={onReady}
          />
        </Canvas>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {/* ① 光源角度 */}
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor={`${groupId}-angle`}
            className="w-28 shrink-0 text-xs text-secondary"
          >
            光源角度
          </label>
          <input
            id={`${groupId}-angle`}
            type="range"
            min={0}
            max={Math.PI * 2}
            step={0.01}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-accent"
          />
          <span className="w-16 shrink-0 text-right font-mono text-xs text-primary">
            {((angle / Math.PI) * 180).toFixed(0)}°
          </span>
        </div>

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
          阴影和物体脚下脱节、缩回；负方向让影子贴紧物体；中间值干净。（shadow
          acne 的成因见正文图解与误区）
        </p>

        {/* ④ PCF 软阴影开关 */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-28 shrink-0 text-xs text-secondary">
            PCF 软阴影
          </span>
          <button
            type="button"
            onClick={() => setPcf((v) => !v)}
            aria-pressed={pcf}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              pcf
                ? "border-accent bg-accent/15 text-primary"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {pcf ? "开（软边）" : "关（硬边）"}
          </button>
        </div>

        <p className="text-xs text-secondary">
          猜一猜：把 <strong>depth bias</strong> 拖到<strong>最大</strong>
          ，物体的影子会怎样？是更黑，还是和物体
          <strong>脚下脱了节、整片缩回去</strong>？这就是 bias 加过头的{" "}
          <strong>peter panning</strong>。无任何外部资源。
        </p>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
