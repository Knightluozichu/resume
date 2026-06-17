"use client";

import { useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <LocalVsWorldExplorer>：局部坐标 vs 世界坐标交互器（HEL-280，§5 主 Demo·本章灵魂，B 型 MathViz）。
 *
 * 数字片场隐喻：父物体 Parent（一个演员），子物体 Child（挂在它身上的道具）。
 * 子物体的「局部坐标 localPosition」= 它相对父的固定偏移（拖父时**不变**）；
 * 子物体的「世界坐标 position」= 它在整个片场里的绝对位置（拖父时**跟着变**）。
 *
 * 玩法：三个滑块改父的世界位置（X、Z）与父的旋转角；俯视 SVG 实时重算并画出父、子，
 * 同时数字面板实时显示：
 *  - Child.localPosition（恒定，高亮「不变」）
 *  - Child.position 世界坐标（随父变，高亮「在变」）
 * 让读者亲手拖父、亲眼看「localPosition 恒定、world position 随父变」。
 *
 * 几何（与 §4 数学推导一致，列主序无关此处仅平移+旋转合成）：
 *   childWorld = parentWorld + R(parentRot) · childLocal
 * 即子的世界位置 = 父的世界位置 + 「父的旋转作用于子的局部偏移」。纯平移情形（rot=0）
 * 退化为 childWorld = parentWorld + childLocal，正对应 §4 的简化式 P_world = P_parent + P_local。
 *
 * 为何 client：滑块驱动状态 + 实时重算 + 重置都是真交互（受控 state）。叶子壳，
 * 不会把整页变 client；无 WebGL（轻量 SVG），首帧即出本章核心对比。
 *
 * reduced-motion：本组件无自动动画，滑块即时重算，无需降级时间轴。
 * 配色全部 DESIGN token（accent / warning / success / border / text-* / bg），
 * 无裸 hex；圆角 rounded-control / rounded-card，无散落魔法数字色值（硬规则 5）。
 */

// 子物体相对父的「局部坐标」——本 Demo 固定不变（这正是要演示的恒定量）。
const CHILD_LOCAL = { x: 2, z: 1 }; // 单位：米（俯视 X-Z 平面，省略 Y）

// 世界坐标范围（米）→ SVG 像素映射。俯视图：X 向右、Z 向上。
// 视图取 ±11，比父滑块范围（±8）+ 子局部偏移（≤约 2.2）更宽，保证极端拖动时子物体仍在框内。
const WORLD_MIN = -11;
const WORLD_MAX = 11;
// 父滑块的取值范围（比视图窄，留出子物体偏移的余量）。
const PARENT_MIN = -8;
const PARENT_MAX = 8;
const SVG_W = 340;
const SVG_H = 300;
const PAD = 30;

// 世界坐标 → SVG 像素（Z 向上，故 sy 用减法）。
function toSvg(x: number, z: number) {
  const span = WORLD_MAX - WORLD_MIN;
  const sx = PAD + ((x - WORLD_MIN) / span) * (SVG_W - 2 * PAD);
  const sy = SVG_H - PAD - ((z - WORLD_MIN) / span) * (SVG_H - 2 * PAD);
  return { sx, sy };
}

// 把数字夹到 1 位小数显示。
const fmt = (v: number) => v.toFixed(1);

const DEFAULT = { px: 0, pz: 0, rotDeg: 0 };

export function LocalVsWorldExplorer() {
  const [px, setPx] = useState(DEFAULT.px);
  const [pz, setPz] = useState(DEFAULT.pz);
  const [rotDeg, setRotDeg] = useState(DEFAULT.rotDeg);

  // 父的旋转作用于子的局部偏移：R(θ)·local（2D 俯视旋转）。
  const rad = (rotDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotatedLocalX = CHILD_LOCAL.x * cos - CHILD_LOCAL.z * sin;
  const rotatedLocalZ = CHILD_LOCAL.x * sin + CHILD_LOCAL.z * cos;

  // 子的世界坐标 = 父世界位置 + 旋转后的局部偏移。
  const childWorldX = px + rotatedLocalX;
  const childWorldZ = pz + rotatedLocalZ;

  const parentPt = toSvg(px, pz);
  const childPt = toSvg(childWorldX, childWorldZ);

  const reset = () => {
    setPx(DEFAULT.px);
    setPz(DEFAULT.pz);
    setRotDeg(DEFAULT.rotDeg);
  };

  // 朝向短线终点（父的「正前方」，用于看旋转）。
  const facing = toSvg(px + 1.6 * sin, pz + 1.6 * cos);

  return (
    <DemoStage
      title="局部坐标 vs 世界坐标：拖动父物体，看子物体两套坐标各自怎么变"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-3">
          <Slider
            label="父 世界 X"
            min={PARENT_MIN}
            max={PARENT_MAX}
            step={0.1}
            value={px}
            onChange={setPx}
            format={(v) => `${fmt(v)} m`}
          />
          <Slider
            label="父 世界 Z"
            min={PARENT_MIN}
            max={PARENT_MAX}
            step={0.1}
            value={pz}
            onChange={setPz}
            format={(v) => `${fmt(v)} m`}
          />
          <Slider
            label="父 旋转角"
            min={0}
            max={360}
            step={1}
            value={rotDeg}
            onChange={setRotDeg}
            format={(v) => `${v}°`}
          />
        </div>
      }
    >
      <div className="flex w-full max-w-2xl flex-col gap-4 md:flex-row md:items-start">
        {/* 俯视图 */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          role="img"
          aria-label="俯视图，显示父物体和挂在它身上的子物体在世界里的位置。拖动滑块改变父物体的世界 X、Z 坐标和旋转角时，子物体会跟着父物体一起移动和旋转，但子物体相对父物体的局部坐标始终不变。"
          className="h-auto w-full max-w-[340px] shrink-0 rounded-control border border-border"
          style={{ background: "var(--bg)" }}
        >
          {/* 世界坐标网格 + 轴 */}
          {[-10, -5, 0, 5, 10].map((g) => {
            const v = toSvg(g, 0);
            const h = toSvg(0, g);
            return (
              <g key={g}>
                <line
                  x1={v.sx}
                  y1={PAD}
                  x2={v.sx}
                  y2={SVG_H - PAD}
                  stroke="var(--border)"
                  strokeWidth={g === 0 ? 1.4 : 0.6}
                  strokeOpacity={g === 0 ? 0.9 : 0.5}
                />
                <line
                  x1={PAD}
                  y1={h.sy}
                  x2={SVG_W - PAD}
                  y2={h.sy}
                  stroke="var(--border)"
                  strokeWidth={g === 0 ? 1.4 : 0.6}
                  strokeOpacity={g === 0 ? 0.9 : 0.5}
                />
              </g>
            );
          })}
          {/* 世界原点标注 */}
          <text
            x={toSvg(0, 0).sx + 4}
            y={toSvg(0, 0).sy + 14}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            世界原点
          </text>

          {/* 父→子连线（局部偏移在世界里的样子） */}
          <line
            x1={parentPt.sx}
            y1={parentPt.sy}
            x2={childPt.sx}
            y2={childPt.sy}
            stroke="var(--warning)"
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />

          {/* 父物体 */}
          <line
            x1={parentPt.sx}
            y1={parentPt.sy}
            x2={facing.sx}
            y2={facing.sy}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx={parentPt.sx}
            cy={parentPt.sy}
            r="11"
            fill="var(--accent)"
            fillOpacity="0.25"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={parentPt.sx}
            y={parentPt.sy + 3.5}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            父
          </text>

          {/* 子物体 */}
          <rect
            x={childPt.sx - 9}
            y={childPt.sy - 9}
            width="18"
            height="18"
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.28"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x={childPt.sx}
            y={childPt.sy + 3.5}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            子
          </text>
        </svg>

        {/* 数字面板：两套坐标实时对照 */}
        <div className="flex w-full flex-col gap-3 text-xs">
          <div className="rounded-control border border-border p-3">
            <div className="font-semibold text-accent">父物体 Parent</div>
            <div className="mt-1 font-mono text-secondary">
              position = ({fmt(px)}, 0, {fmt(pz)})
            </div>
            <div className="font-mono text-secondary">旋转 = {rotDeg}°</div>
          </div>

          <div
            className="rounded-control border p-3"
            style={{ borderColor: "var(--success)" }}
          >
            <div className="font-semibold" style={{ color: "var(--success)" }}>
              子 . localPosition（相对父）
            </div>
            <div className="mt-1 font-mono text-primary">
              ({fmt(CHILD_LOCAL.x)}, 0, {fmt(CHILD_LOCAL.z)})
            </div>
            <div className="mt-1" style={{ color: "var(--success)" }}>
              ← 拖父怎么拖，这一行都不变
            </div>
          </div>

          <div
            className="rounded-control border p-3"
            style={{ borderColor: "var(--warning)" }}
          >
            <div className="font-semibold" style={{ color: "var(--warning)" }}>
              子 . position 世界坐标（绝对）
            </div>
            <div className="mt-1 font-mono text-primary">
              ({fmt(childWorldX)}, 0, {fmt(childWorldZ)})
            </div>
            <div className="mt-1" style={{ color: "var(--warning)" }}>
              ← 父一动，这一行立刻跟着变
            </div>
          </div>

          <p className="text-secondary">
            猜一猜：把父物体往右移 3 米，子的{" "}
            <span className="font-mono">localPosition</span> 变吗？
            <span className="font-mono">world position</span> 呢？拖「父 世界
            X」滑块亲手验证。
          </p>
        </div>
      </div>
    </DemoStage>
  );
}
