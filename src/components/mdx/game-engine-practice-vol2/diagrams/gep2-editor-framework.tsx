/**
 * <Gep2EditorFrameworkDiagram>：编辑器框架——工具链与资产管线图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2EditorFrameworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编辑器框架工具链与资产管线图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            编辑器框架：资产管线 + 编辑器架构
          </text>

          {/* 上：离线资产管线 */}
          <rect
            x="30"
            y="54"
            width="680"
            height="160"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.05"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="50"
            y="74"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            离线资产管线 Asset Pipeline（DCC → 运行时格式）
          </text>

          {[
            {
              x: 50,
              label: "DCC 导出",
              sub: "Blender/Maya",
              c: "var(--success)",
              t: ".fbx / .psd",
            },
            {
              x: 215,
              label: "导入 Import",
              sub: "解析元数据",
              c: "var(--accent)",
              t: "校验/去重",
            },
            {
              x: 380,
              label: "处理 Process",
              sub: "压缩/优化",
              c: "var(--warning)",
              t: "Draco/Mipmap",
            },
            {
              x: 545,
              label: "序列化 Cook",
              sub: "写引擎格式",
              c: "var(--danger)",
              t: ".geo / .mat",
            },
          ].map((s, i) => (
            <g key={i}>
              <rect
                x={s.x}
                y="88"
                width="150"
                height="76"
                rx="8"
                fill={s.c}
                fillOpacity="0.12"
                stroke={s.c}
                strokeWidth="1.2"
              />
              <text
                x={s.x + 75}
                y="110"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={s.x + 75}
                y="128"
                textAnchor="middle"
                fontSize="11"
                fill={s.c}
              >
                {s.sub}
              </text>
              <text
                x={s.x + 75}
                y="146"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-tertiary)"
              >
                {s.t}
              </text>
              {i < 3 && (
                <text
                  x={s.x + 165}
                  y="128"
                  textAnchor="middle"
                  fontSize="16"
                  fill="var(--text-tertiary)"
                >
                  &rarr;
                </text>
              )}
            </g>
          ))}
          <text
            x="370"
            y="190"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            运行时绝不解析原始 .fbx——离线一次烘焙，运行时零解析成本
          </text>

          {/* 下：编辑器架构 */}
          <rect
            x="30"
            y="232"
            width="680"
            height="142"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <text
            x="50"
            y="252"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            编辑器架构（运行时复用 + 工具层包裹）
          </text>

          {/* 运行时核心 */}
          <rect
            x="60"
            y="268"
            width="280"
            height="92"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x="200"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            引擎运行时 Runtime
          </text>
          <text x="74" y="310" fontSize="11" fill="var(--text-secondary)">
            渲染 / 物理 / 动画 / 场景
          </text>
          <text x="74" y="328" fontSize="11" fill="var(--text-secondary)">
            资源管理 / 脚本 / 事件
          </text>
          <text x="74" y="346" fontSize="10" fill="var(--text-tertiary)">
            编辑器与游戏共用同一套运行时
          </text>

          {/* 工具层 */}
          <rect
            x="360"
            y="268"
            width="140"
            height="92"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x="430"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            工具层
          </text>
          <text x="374" y="310" fontSize="11" fill="var(--text-secondary)">
            检视器 Inspector
          </text>
          <text x="374" y="328" fontSize="11" fill="var(--text-secondary)">
            视口 Viewport
          </text>
          <text x="374" y="346" fontSize="10" fill="var(--text-tertiary)">
            撤销/重做 命令栈
          </text>

          {/* 反射/序列化 */}
          <rect
            x="520"
            y="268"
            width="160"
            height="92"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x="600"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            反射 + 持久化
          </text>
          <text x="534" y="310" fontSize="11" fill="var(--text-secondary)">
            元数据驱动 UI
          </text>
          <text x="534" y="328" fontSize="11" fill="var(--text-secondary)">
            场景存盘/读盘
          </text>
          <text x="534" y="346" fontSize="10" fill="var(--text-tertiary)">
            属性编辑免手写 UI
          </text>

          {/* 底部 */}
          <rect
            x="30"
            y="388"
            width="680"
            height="34"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="410"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            关键：编辑器 = 运行时 + 工具层，靠反射把数据结构自动暴露成可编辑面板
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编辑器框架——离线资产管线烘焙运行时格式，编辑器复用运行时并靠反射驱动工具
      </figcaption>
    </figure>
  );
}
