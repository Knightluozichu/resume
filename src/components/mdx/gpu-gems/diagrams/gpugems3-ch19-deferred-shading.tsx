"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({
  children,
  height = 440,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height={height} rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeDasharray={dashed ? "7 6" : undefined}
        strokeWidth="3"
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "material", caption: "几何阶段只写入位置、法线和材质属性" },
  { label: "light", caption: "光体积只处理它覆盖的屏幕像素" },
  { label: "compose", caption: "最后一次全屏合成颜色、雾和边缘处理" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  material: "几何阶段只写入位置、法线和材质属性",
  light: "光体积只处理它覆盖的屏幕像素",
  compose: "最后一次全屏合成颜色、雾和边缘处理",
};

export function GpuGems3Ch19PipelineDiagram() {
  const materialRef = useRef<SVGGElement>(null);
  const lightRef = useRef<SVGGElement>(null);
  const composeRef = useRef<SVGGElement>(null);
  const refs = [materialRef, lightRef, composeRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.35, 1], duration: T * 0.45 },
          T * index,
        );
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame
        label="延迟着色三阶段：材质阶段写入 G-buffer，光阶段用光体积读取像素，最终阶段合成颜色与后处理"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          deferred shading: write once, light later
        </text>
        <g ref={materialRef} style={{ opacity: 0.35 }}>
          <rect
            x="34"
            y="88"
            width="196"
            height="236"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="132"
            y="122"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            material pass
          </text>
          <path
            d="M 132 154 L 82 250 L 182 250 Z"
            fill={C.accent}
            fillOpacity="0.13"
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle cx="132" cy="202" r="7" fill={C.warning} />
          <text
            x="132"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            no light loop
          </text>
          <text
            x="132"
            y="304"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            position · normal · material
          </text>
        </g>
        <Arrow x1={248} x2={286} y1={206} y2={206} />
        <g ref={lightRef} style={{ opacity: 0.35 }}>
          <rect
            x="300"
            y="76"
            width="196"
            height="260"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="398"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            light pass
          </text>
          <circle
            cx="398"
            cy="214"
            r="77"
            fill={C.warning}
            fillOpacity="0.1"
            stroke={C.warning}
            strokeWidth="2"
          />
          <circle cx="398" cy="214" r="7" fill={C.warning} />
          <path
            d="M 398 214 L 346 160 M 398 214 L 454 168 M 398 214 L 462 260"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="398"
            y="292"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            sphere / cone / box volume
          </text>
          <text
            x="398"
            y="314"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            only covered pixels
          </text>
        </g>
        <Arrow x1={514} x2={552} y1={206} y2={206} color={C.success} />
        <g ref={composeRef} style={{ opacity: 0.35 }}>
          <rect
            x="566"
            y="88"
            width="160"
            height="236"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="646"
            y="122"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            final pass
          </text>
          <rect
            x="600"
            y="158"
            width="92"
            height="74"
            rx="8"
            fill={C.success}
            fillOpacity="0.13"
            stroke={C.success}
          />
          <text
            x="646"
            y="190"
            textAnchor="middle"
            fontSize="13"
            fill={C.success}
          >
            diffuse + specular
          </text>
          <text
            x="646"
            y="212"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            fog · edge · output
          </text>
          <text
            x="646"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            each pixel lit once per light
          </text>
          <text
            x="646"
            y="304"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            geometry complexity decoupled
          </text>
        </g>
        <rect
          x="34"
          y="354"
          width="692"
          height="40"
          rx="10"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="379"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          material shaders and light shaders share only an explicit
          pixel-attribute contract
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="播放三个阶段：几何负责写资料，光负责读资料，最终 pass 负责组合结果。"
      />
    </Figure>
  );
}

export function GpuGems3Ch19GBufferDiagram() {
  return (
    <Figure>
      <Frame
        label="G-buffer 与 MRT：多个 render target 保存深度、法线、漫反射和材质属性，光照阶段通过访问器读取而不依赖物理通道位置"
        height={440}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          a readable G-buffer is an API, not a pile of channels
        </text>
        <g transform="translate(36 78)">
          <rect
            width="194"
            height="284"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="97"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            material shader
          </text>
          <path
            d="M 97 68 L 54 138 L 140 138 Z"
            fill={C.accent}
            fillOpacity="0.13"
            stroke={C.accent}
            strokeWidth="2"
          />
          <Arrow x1={97} x2={97} y1={158} y2={194} />
          <text
            x="97"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            DL_SetDiffuse
          </text>
          <text
            x="97"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            DL_SetNormal
          </text>
          <text
            x="97"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            DL_SetDepth
          </text>
        </g>
        <Arrow x1={250} x2={286} y1={220} y2={220} />
        <g transform="translate(300 66)">
          <rect
            width="216"
            height="308"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="108"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            MRT targets
          </text>
          {[
            ["MRT 0", "diffuse + flags"],
            ["MRT 1", "normal + material"],
            ["MRT 2", "specular inputs"],
            ["depth", "eye-space depth"],
          ].map(([name, detail], index) => (
            <g key={`mrt-row-${name}`}>
              <rect
                x="22"
                y={62 + index * 50}
                width="172"
                height="36"
                rx="8"
                fill={C.warning}
                fillOpacity={0.08 + index * 0.03}
                stroke={C.warning}
              />
              <text
                x="36"
                y={85 + index * 50}
                fontSize="13"
                fontWeight="700"
                fill={C.warning}
              >
                {name}
              </text>
              <text
                x="106"
                y={85 + index * 50}
                fontSize="12"
                fill={C.secondary}
              >
                {detail}
              </text>
            </g>
          ))}
          <text
            x="108"
            y="292"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            channel budget is finite
          </text>
        </g>
        <Arrow x1={536} x2={572} y1={220} y2={220} color={C.success} />
        <g transform="translate(586 78)">
          <rect
            width="140"
            height="284"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="70"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            light shader
          </text>
          <circle
            cx="70"
            cy="122"
            r="42"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="70"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            DL_Get*
          </text>
          <text
            x="70"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            stable contract
          </text>
          <text
            x="70"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            storage may change
          </text>
          <text
            x="70"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            shader need not
          </text>
          <text
            x="70"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            know where
          </text>
        </g>
        <rect
          x="36"
          y="394"
          width="690"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="413"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          view-space normals can reconstruct z and save one channel when the
          sign is known
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch19LightVolumeDiagram() {
  return (
    <Figure>
      <Frame
        label="光体积覆盖范围：点光使用球体，聚光灯使用锥体，盒光使用盒体，全局方向光才使用全屏四边形"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          shade the pixels a light can actually touch
        </text>
        <g transform="translate(32 78)">
          <rect
            width="164"
            height="274"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="82"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            point light
          </text>
          <circle
            cx="82"
            cy="146"
            r="67"
            fill={C.accent}
            fillOpacity="0.11"
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle cx="82" cy="146" r="7" fill={C.accent} />
          <text
            x="82"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            sphere volume
          </text>
        </g>
        <g transform="translate(218 78)">
          <rect
            width="164"
            height="274"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="82"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            spot light
          </text>
          <path
            d="M 82 78 L 28 226 L 136 226 Z"
            fill={C.warning}
            fillOpacity="0.11"
            stroke={C.warning}
            strokeWidth="2"
          />
          <circle cx="82" cy="78" r="7" fill={C.warning} />
          <text
            x="82"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            cone volume
          </text>
        </g>
        <g transform="translate(404 78)">
          <rect
            width="164"
            height="274"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="82"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            box light
          </text>
          <rect
            x="34"
            y="84"
            width="96"
            height="126"
            rx="8"
            fill={C.success}
            fillOpacity="0.11"
            stroke={C.success}
            strokeWidth="2"
          />
          <circle cx="82" cy="146" r="7" fill={C.success} />
          <text
            x="82"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            box volume
          </text>
        </g>
        <g transform="translate(590 78)">
          <rect
            width="140"
            height="274"
            rx="14"
            fill={C.surface}
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="70"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            directional
          </text>
          <rect
            x="22"
            y="86"
            width="96"
            height="116"
            fill={C.danger}
            fillOpacity="0.08"
            stroke={C.danger}
            strokeDasharray="8 6"
          />
          <Arrow x1={38} x2={102} y1={110} y2={110} color={C.danger} />
          <Arrow x1={38} x2={102} y1={148} y2={148} color={C.danger} />
          <Arrow x1={38} x2={102} y1={186} y2={186} color={C.danger} />
          <text
            x="70"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            full-screen quad
          </text>
        </g>
        <rect
          x="32"
          y="374"
          width="698"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="393"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          tighter screen-space bounds mean fewer light-shader pixels and less
          bandwidth
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch19ReadableBufferDiagram() {
  return (
    <Figure>
      <Frame
        label="可读深度与法线缓冲的两个应用：水面比较眼空间深度决定折射，八邻域深度梯度和法线角度产生分辨率无关的边缘权重"
        height={450}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          the buffer is useful beyond lighting
        </text>
        <g transform="translate(34 78)">
          <rect
            width="330"
            height="304"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="165"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            water / refraction
          </text>
          <path
            d="M 28 154 C 86 128 126 178 190 148 S 274 132 308 154"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <path
            d="M 30 230 L 108 186 L 180 230 L 252 188 L 306 222"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
          />
          <line
            x1="68"
            y1="104"
            x2="96"
            y2="194"
            stroke={C.success}
            strokeWidth="3"
          />
          <line
            x1="218"
            y1="104"
            x2="198"
            y2="190"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="165"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            current water depth vs target depth
          </text>
          <text
            x="165"
            y="288"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            behind? → refract; otherwise reject
          </text>
        </g>
        <g transform="translate(396 78)">
          <rect
            width="330"
            height="304"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="165"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            resolution-independent edges
          </text>
          <rect
            x="88"
            y="78"
            width="154"
            height="154"
            fill={C.bg}
            stroke={C.border}
          />
          {Array.from({ length: 9 }).map((_, index) => {
            const x = 102 + (index % 3) * 46;
            const y = 92 + Math.floor(index / 3) * 46;
            const center = index === 4;
            return (
              <g key={`neighbor-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width="34"
                  height="34"
                  rx="5"
                  fill={center ? C.success : C.surface}
                  fillOpacity={center ? 0.2 : 1}
                  stroke={center ? C.success : C.border}
                />
                <text
                  x={x + 17}
                  y={y + 22}
                  textAnchor="middle"
                  fontSize="12"
                  fill={center ? C.success : C.secondary}
                >
                  {center ? "C" : "N"}
                </text>
              </g>
            );
          })}
          <text
            x="165"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            max/min depth gradient
          </text>
          <text
            x="165"
            y="288"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            normal cosine change → edge weight
          </text>
        </g>
        <rect
          x="34"
          y="402"
          width="692"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="421"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          depth and normal data become a shared substrate for water, fog,
          particles, and edge smoothing
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch19BandwidthDiagram() {
  return (
    <Figure>
      <Frame
        label="延迟着色带宽路径：材质阶段写入四个屏幕大小 render target，光阶段写入 diffuse 与 specular 累积缓冲，最终阶段只合成一次"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          bandwidth is the deferred-shading tax
        </text>
        <g transform="translate(34 82)">
          <rect
            width="186"
            height="240"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="93"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            material writes
          </text>
          {[0, 1, 2, 3].map((index) => (
            <rect
              key={`write-${index}`}
              x="36"
              y={62 + index * 35}
              width="114"
              height="24"
              rx="6"
              fill={C.accent}
              fillOpacity={0.1 + index * 0.04}
              stroke={C.accent}
            />
          ))}
          <text
            x="93"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            screen-size MRTs
          </text>
        </g>
        <Arrow x1={238} x2={282} y1={202} y2={202} />
        <g transform="translate(300 82)">
          <rect
            width="186"
            height="240"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="93"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            light accumulation
          </text>
          <rect
            x="34"
            y="72"
            width="114"
            height="42"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text
            x="93"
            y="98"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            diffuse
          </text>
          <rect
            x="34"
            y="130"
            width="114"
            height="42"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text
            x="93"
            y="156"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            specular
          </text>
          <text
            x="93"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            additive light passes
          </text>
        </g>
        <Arrow x1={504} x2={548} y1={202} y2={202} color={C.success} />
        <g transform="translate(566 82)">
          <rect
            width="160"
            height="240"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="80"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            final compose
          </text>
          <rect
            x="28"
            y="84"
            width="104"
            height="66"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text
            x="80"
            y="112"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            unlit × diffuse
          </text>
          <text
            x="80"
            y="134"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            + specular + fog
          </text>
          <text
            x="80"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            one final fetch path
          </text>
        </g>
        <rect
          x="34"
          y="354"
          width="692"
          height="40"
          rx="10"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="379"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          resolution, render-target formats, and pooled shadow maps decide
          whether the trade is worth it
        </text>
      </Frame>
    </Figure>
  );
}

type PipelineMode = "deferred" | "forward";
type LightKind = "point" | "spot" | "box";
type TransparencyMode = "opaque" | "mixed";
type Resolution = "768" | "1024" | "1440";

const DEFAULTS = {
  lightCount: 24,
  lightKind: "point" as LightKind,
  pipeline: "deferred" as PipelineMode,
  resolution: "1024" as Resolution,
  transparency: "opaque" as TransparencyMode,
};

export function GpuGems3Ch19DeferredShadingLab() {
  const [pipeline, setPipeline] = useState<PipelineMode>(DEFAULTS.pipeline);
  const [lightCount, setLightCount] = useState(DEFAULTS.lightCount);
  const [resolution, setResolution] = useState<Resolution>(DEFAULTS.resolution);
  const [lightKind, setLightKind] = useState<LightKind>(DEFAULTS.lightKind);
  const [transparency, setTransparency] = useState<TransparencyMode>(
    DEFAULTS.transparency,
  );

  const result = useMemo(() => {
    const pixels =
      resolution === "768" ? 0.59 : resolution === "1024" ? 1 : 1.98;
    const volumeFactor =
      lightKind === "point" ? 0.68 : lightKind === "spot" ? 0.44 : 0.56;
    const litPixels =
      pipeline === "deferred"
        ? pixels * Math.min(1, 0.14 + lightCount * volumeFactor * 0.018)
        : pixels * Math.min(1, 0.2 + lightCount * 0.032);
    const draws =
      pipeline === "deferred"
        ? 2 + lightCount + (transparency === "mixed" ? 1 : 0)
        : 1 + Math.ceil(lightCount * (lightKind === "point" ? 1.2 : 1));
    const bytes =
      pipeline === "deferred"
        ? Math.round(
            pixels * 4 * 16 + pixels * (transparency === "mixed" ? 3 : 2),
          )
        : Math.round(pixels * 4 + pixels * lightCount * 0.22);
    const fallback =
      transparency === "mixed"
        ? "translucent pass returns to forward shading"
        : "opaque geometry stays in deferred path";
    const note =
      pipeline === "deferred"
        ? `${lightKind} light volumes keep lighting local; ${fallback}.`
        : `forward passes repeat material and light work; ${fallback}.`;
    return { bytes, draws, litPixels, note };
  }, [lightCount, lightKind, pipeline, resolution, transparency]);

  const reset = () => {
    setPipeline(DEFAULTS.pipeline);
    setLightCount(DEFAULTS.lightCount);
    setResolution(DEFAULTS.resolution);
    setLightKind(DEFAULTS.lightKind);
    setTransparency(DEFAULTS.transparency);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 19
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Tabula Rasa Deferred Shading Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          改变光数量、光体积、分辨率和透明几何，观察“几何复杂度解耦”如何换来 MRT
          写入与带宽成本。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg
              viewBox="0 0 730 310"
              role="img"
              aria-label={`延迟着色实验：${pipeline} 路径，${lightCount} 个 ${lightKind} 光，${resolution}p，${transparency} 几何，${result.draws} 次绘制`}
              className="mx-auto block h-auto w-full"
            >
              <text
                x="365"
                y="24"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.text}
              >
                {pipeline === "deferred"
                  ? "material → MRT → light volumes → compose"
                  : "material + light repeated per body"}
              </text>
              <rect
                x="34"
                y="58"
                width="662"
                height="192"
                rx="14"
                fill={C.surface}
                stroke={C.border}
              />
              {pipeline === "deferred" ? (
                <>
                  <g>
                    <path
                      d="M 92 194 L 144 104 L 196 194 Z"
                      fill={C.accent}
                      fillOpacity="0.14"
                      stroke={C.accent}
                      strokeWidth="2"
                    />
                    <text
                      x="144"
                      y="224"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.secondary}
                    >
                      geometry
                    </text>
                  </g>
                  <Arrow x1={224} x2={280} y1={158} y2={158} />
                  <g>
                    <rect
                      x="294"
                      y="88"
                      width="124"
                      height="140"
                      rx="10"
                      fill={C.warning}
                      fillOpacity="0.11"
                      stroke={C.warning}
                    />
                    {[0, 1, 2].map((index) => (
                      <rect
                        key={`lab-mrt-${index}`}
                        x="312"
                        y={108 + index * 32}
                        width="88"
                        height="20"
                        rx="5"
                        fill={C.warning}
                        fillOpacity="0.12"
                        stroke={C.warning}
                      />
                    ))}
                    <text
                      x="356"
                      y="218"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.secondary}
                    >
                      MRT + depth
                    </text>
                  </g>
                  <Arrow
                    x1={448}
                    x2={500}
                    y1={158}
                    y2={158}
                    color={C.success}
                  />
                  <g>
                    <circle
                      cx="554"
                      cy="158"
                      r="66"
                      fill={C.success}
                      fillOpacity="0.11"
                      stroke={C.success}
                      strokeWidth="2"
                    />
                    {Array.from({
                      length: Math.min(8, Math.ceil(lightCount / 5)),
                    }).map((_, index) => {
                      const angle =
                        (index / Math.max(1, Math.ceil(lightCount / 5))) *
                        Math.PI *
                        2;
                      return (
                        <circle
                          key={`lab-light-${index}`}
                          cx={554 + Math.cos(angle) * 48}
                          cy={158 + Math.sin(angle) * 48}
                          r="5"
                          fill={C.success}
                        />
                      );
                    })}
                    <text
                      x="554"
                      y="154"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.success}
                    >
                      {lightCount} lights
                    </text>
                    <text
                      x="554"
                      y="176"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.secondary}
                    >
                      {lightKind} volumes
                    </text>
                  </g>
                </>
              ) : (
                <>
                  <path
                    d="M 74 194 L 126 104 L 178 194 Z"
                    fill={C.accent}
                    fillOpacity="0.14"
                    stroke={C.accent}
                    strokeWidth="2"
                  />
                  <text
                    x="126"
                    y="224"
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.secondary}
                  >
                    one body
                  </text>
                  <Arrow x1={206} x2={256} y1={158} y2={158} />
                  {Array.from({
                    length: Math.min(7, Math.ceil(lightCount / 4)),
                  }).map((_, index) => (
                    <g key={`forward-pass-${index}`}>
                      <rect
                        x={268 + index * 48}
                        y={92 + (index % 2) * 54}
                        width="36"
                        height="34"
                        rx="7"
                        fill={C.warning}
                        fillOpacity="0.13"
                        stroke={C.warning}
                      />
                      <text
                        x={286 + index * 48}
                        y={114 + (index % 2) * 54}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.warning}
                      >
                        L{index + 1}
                      </text>
                    </g>
                  ))}
                  <text
                    x="478"
                    y="224"
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.secondary}
                  >
                    repeated light passes
                  </text>
                </>
              )}
              <text
                x="365"
                y="282"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                {result.note}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="光照覆盖像素"
              tone={C.success}
              value={`${result.litPixels.toFixed(2)} M`}
            />
            <Metric
              label="估算绘制次数"
              tone={C.accent}
              value={`${result.draws} calls`}
            />
            <Metric
              label="render-target 流量"
              tone={C.warning}
              value={`${result.bytes} MB/frame`}
            />
            <Metric
              label="透明几何路径"
              tone={transparency === "mixed" ? C.warning : C.success}
              value={transparency === "mixed" ? "forward fallback" : "deferred"}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label
            className="block text-sm text-secondary"
            htmlFor="ch19-pipeline"
          >
            renderer path
            <select
              id="ch19-pipeline"
              value={pipeline}
              onChange={(event) =>
                setPipeline(event.target.value as PipelineMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="deferred">deferred shading</option>
              <option value="forward">forward shading</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch19-light-count"
          >
            dynamic lights: {lightCount}
            <input
              id="ch19-light-count"
              type="range"
              min="2"
              max="60"
              value={lightCount}
              onChange={(event) => setLightCount(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch19-resolution"
          >
            render resolution
            <select
              id="ch19-resolution"
              value={resolution}
              onChange={(event) =>
                setResolution(event.target.value as Resolution)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="768">1024 × 768</option>
              <option value="1024">1280 × 1024</option>
              <option value="1440">1600 × 1200</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch19-light-kind"
          >
            light volume
            <select
              id="ch19-light-kind"
              value={lightKind}
              onChange={(event) =>
                setLightKind(event.target.value as LightKind)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="point">sphere for point light</option>
              <option value="spot">cone for spotlight</option>
              <option value="box">box for box light</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch19-transparency"
          >
            geometry mix
            <select
              id="ch19-transparency"
              value={transparency}
              onChange={(event) =>
                setTransparency(event.target.value as TransparencyMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="opaque">opaque only</option>
              <option value="mixed">opaque + translucent</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
