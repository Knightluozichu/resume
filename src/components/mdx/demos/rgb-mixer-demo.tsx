"use client";

import { useState } from "react";

import { DemoStage, Slider, Toggle } from "../controls";

/**
 * 示例：用 <DemoStage> + <Slider> + <Toggle> 驱动一个纯 SVG 演示（无 WebGL）。
 *
 * 作者范式参考——把受控的 Slider/Toggle 状态提到一个小 client 组件里，
 * 用状态直接算 SVG 属性（这里：三个分量滑块合成一个色块，Toggle 切灰度）。
 * 这就是 chapter-spec「每个知识点配可视化」里「CSS/SVG 轻量演示」的落地方式。
 *
 * 同时作为 HEL-23 的回归样本（验证 Slider 受控、Toggle 受控、DemoStage 重置）。
 */
export function RgbMixerDemo() {
  const initial = { r: 124, g: 92, b: 255 }; // accent #7C5CFF
  const [r, setR] = useState(initial.r);
  const [g, setG] = useState(initial.g);
  const [b, setB] = useState(initial.b);
  const [gray, setGray] = useState(false);

  const reset = () => {
    setR(initial.r);
    setG(initial.g);
    setB(initial.b);
    setGray(false);
  };

  // 灰度：感知亮度（Rec. 601）
  const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  const fill = gray ? `rgb(${lum}, ${lum}, ${lum})` : `rgb(${r}, ${g}, ${b})`;

  return (
    <DemoStage
      title="RGB 合成（SVG 演示）"
      onReset={reset}
      controls={
        <>
          <Slider label="R" min={0} max={255} value={r} onChange={setR} />
          <Slider label="G" min={0} max={255} value={g} onChange={setG} />
          <Slider label="B" min={0} max={255} value={b} onChange={setB} />
          <Toggle label="灰度" checked={gray} onChange={setGray} />
        </>
      }
    >
      <svg
        viewBox="0 0 120 120"
        width="120"
        height="120"
        role="img"
        aria-label={`合成颜色 ${fill}`}
      >
        <rect
          x="10"
          y="10"
          width="100"
          height="100"
          rx="12"
          fill={fill}
          stroke="var(--border)"
        />
      </svg>
    </DemoStage>
  );
}
