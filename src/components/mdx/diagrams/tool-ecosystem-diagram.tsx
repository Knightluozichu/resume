import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 420;

type ToolCategory = {
  label: string;
  tools: string;
  x: number;
  y: number;
  w: number;
  h: number;
  note: string;
};

const CATEGORIES: ToolCategory[] = [
  {
    label: "版本控制",
    tools: "Perforce\nGit LFS\nPlastic SCM",
    x: 40,
    y: 60,
    w: 150,
    h: 80,
    note: "管住代码和大文件",
  },
  {
    label: "IDE / 编辑器",
    tools: "VS + VAX\nRider\nXcode",
    x: 220,
    y: 60,
    w: 150,
    h: 80,
    note: "写代码、导航、重构",
  },
  {
    label: "编译器",
    tools: "MSVC\nClang\nGCC",
    x: 400,
    y: 60,
    w: 150,
    h: 80,
    note: "源码变二进制",
  },
  {
    label: "构建系统",
    tools: "CMake\nFASTBuild\nUBT",
    x: 580,
    y: 60,
    w: 140,
    h: 80,
    note: "组织编译+打包",
  },
  {
    label: "Profiler",
    tools: "PIX\nRenderDoc\nTracy",
    x: 40,
    y: 180,
    w: 150,
    h: 80,
    note: "看时间花在哪",
  },
  {
    label: "调试器",
    tools: "VS Debugger\nLLDB\nGDB",
    x: 220,
    y: 180,
    w: 150,
    h: 80,
    note: "断点、变量、调用栈",
  },
  {
    label: "内存工具",
    tools: "Valgrind\nAddress Sanitizer\nMemReplay",
    x: 400,
    y: 180,
    w: 150,
    h: 80,
    note: "泄露、越界、碎片",
  },
  {
    label: "CI/CD",
    tools: "Jenkins\nGitHub Actions\nTeamCity",
    x: 580,
    y: 180,
    w: 140,
    h: 80,
    note: "自动构建+测试",
  },
  {
    label: "关卡编辑器",
    tools: "Unreal Editor\nUnity Editor\nGodot Editor",
    x: 40,
    y: 300,
    w: 200,
    h: 70,
    note: "内容创作",
  },
  {
    label: "资源工具",
    tools: "Maya, Blender\nSubstance, Photoshop\nFMOD, Wwise",
    x: 280,
    y: 300,
    w: 200,
    h: 70,
    note: "美术和音频",
  },
  {
    label: "数据分析",
    tools: "Telemetry\nCrash Reporter\nA/B 测试",
    x: 520,
    y: 300,
    w: 200,
    h: 70,
    note: "线上运行数据",
  },
];

export const ToolEcosystemDiagram: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">工具生态</p>
      <h4 className="text-base font-semibold text-primary">
        游戏开发全流程工具地图
      </h4>
      <p className="mt-1 text-xs leading-5 text-secondary">
        从写代码到上线运行，每个阶段都有对应的工具。这三行分别对应&quot;代码工具链&quot;、&quot;调试分析&quot;、&quot;内容创作与运营&quot;。
      </p>
    </figcaption>

    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="游戏开发工具生态系统图"
        className="block w-full min-w-[660px]"
      >
        {/* Row labels */}
        <text
          x="12"
          y={90}
          className="fill-accent text-[10px] font-medium"
          transform="rotate(-90, 12, 90)"
        >
          代码工具链
        </text>
        <line
          x1="22"
          y1="100"
          x2="22"
          y2="170"
          className="stroke-accent"
          strokeWidth="1"
        />
        <text
          x="12"
          y={210}
          className="fill-warning text-[10px] font-medium"
          transform="rotate(-90, 12, 210)"
        >
          调试分析
        </text>
        <line
          x1="22"
          y1="220"
          x2="22"
          y2="290"
          className="stroke-warning"
          strokeWidth="1"
        />
        <text
          x="12"
          y={330}
          className="fill-success text-[10px] font-medium"
          transform="rotate(-90, 12, 330)"
        >
          内容+运营
        </text>
        <line
          x1="22"
          y1="340"
          x2="22"
          y2="400"
          className="stroke-success"
          strokeWidth="1"
        />

        {CATEGORIES.map((cat) => (
          <g key={cat.label}>
            <rect
              x={cat.x}
              y={cat.y}
              width={cat.w}
              height={cat.h}
              rx="7"
              className="fill-elevated stroke-border"
              strokeWidth="1"
            />
            <text
              x={cat.x + 8}
              y={cat.y + 18}
              className="fill-primary text-[11px] font-semibold"
            >
              {cat.label}
            </text>
            {cat.tools.split("\n").map((line, i) => (
              <text
                key={line}
                x={cat.x + 8}
                y={cat.y + 36 + i * 14}
                className="fill-secondary text-[10px]"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Flow arrows: code tools → build → debug → content */}
        <g
          className="stroke-accent"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,3"
        >
          <path d="M 190 100 L 210 100" />
          <path d="M 370 100 L 390 100" />
          <path d="M 550 100 L 570 100" />
        </g>
        <g className="stroke-border" strokeWidth="1">
          <path d="M 115 140 L 115 172" markerEnd="url(#tool-eco-arrow)" />
          <path d="M 295 140 L 295 172" markerEnd="url(#tool-eco-arrow)" />
        </g>

        <defs>
          <marker
            id="tool-eco-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 6 3 0 6Z" className="fill-border" />
          </marker>
        </defs>
      </svg>
    </div>
  </figure>
);
