import type { ReactNode } from "react";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function DiagramFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const dataStages = [
  {
    number: 1,
    title: "分配存储",
    code: "BufferData / BufferStorage",
    result: "可变或不可变字节存储",
    color: accent,
  },
  {
    number: 2,
    title: "写入与映射",
    code: "subdata / map / copy",
    result: "更新区间与可见性规则",
    color: warning,
  },
  {
    number: 3,
    title: "绑定解释",
    code: "VAO / range / texture view",
    result: "同一 buffer 获得消费语义",
    color: success,
  },
  {
    number: 4,
    title: "消费与同步",
    code: "draw / dispatch + barriers",
    result: "GPU 读取写入，所有权闭合",
    color: danger,
  },
] as const;

export function GlsBufferObjectsDiagram({
  step = 0,
}: {
  step?: 0 | 1 | 2 | 3;
}) {
  const active =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <DiagramFrame caption="Buffer object 是无类型字节存储；分配、更新、绑定解释与同步共同决定它能否被正确消费。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="缓冲对象从分配存储、更新映射、绑定解释到着色器消费和同步的完整数据链"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="29"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          数据管理的四段契约
        </text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill={secondary}>
          名称不决定用途，绑定点和视图才赋予消费语义
        </text>
        {dataStages.map((stage, index) => {
          const focused = active.includes(stage.number);
          const x = 15 + index * 221;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="75"
                width="205"
                height="180"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 27} cy="103" r="15" fill={stage.color} />
              <text
                x={x + 27}
                y="108"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {stage.number}
              </text>
              <text
                x={x + 50}
                y="108"
                fontSize="12.2"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 12}
                y="132"
                width="181"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102.5}
                y="155"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9.4"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="201" fontSize="10" fill={secondary}>
                结果
              </text>
              <text x={x + 13} y="222" fontSize="10.1" fill={primary}>
                {stage.result}
              </text>
            </g>
          );
        })}
        {[210, 431, 652].map((x) => (
          <path
            key={x}
            d={`M${x} 165 H${x + 23} M${x + 15} 157 L${x + 24} 165 L${x + 15} 173`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="200"
          y="283"
          width="500"
          height="29"
          rx="6"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
          strokeOpacity="0.45"
        />
        <text
          x="450"
          y="302"
          textAnchor="middle"
          fontSize="10.4"
          fill={primary}
        >
          每次写入都要回答：范围是否合法、谁仍在使用、何时对消费者可见
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          数据管理四段契约
        </p>
        {dataStages.map((stage) => {
          const focused = active.includes(stage.number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {stage.number}. {stage.title}
                </strong>
                <span
                  className="text-right font-mono text-[9px]"
                  style={{ color: stage.color }}
                >
                  {stage.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{stage.result}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const roleRows = [
  ["Vertex / index", "VAO attribute / element state", "顺序取数与索引", accent],
  ["Uniform block", "indexed UBO binding", "小型只读常量块", warning],
  ["Shader storage", "indexed SSBO binding", "大块可读写结构数据", success],
  ["Atomic counter", "atomic binding + offset", "受限原子递增/递减", danger],
  ["Pixel / indirect", "pack, unpack, command", "传输或命令参数", accent],
] as const;

export function GlsBufferRoleDiagram() {
  return (
    <DiagramFrame caption="VBO、UBO、SSBO 等是使用角色，不是不同内存对象类型；同一个 buffer 可在合法同步下绑定到不同目标或视图。">
      <svg
        viewBox="0 0 880 350"
        role="img"
        aria-label="同一个缓冲对象通过不同绑定目标成为顶点索引统一块存储块原子计数器或像素命令数据"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          字节存储 + 绑定解释 = 资源角色
        </text>
        <text x="26" y="65" fontSize="10" fill={secondary}>
          角色
        </text>
        <text x="205" y="65" fontSize="10" fill={secondary}>
          解释入口
        </text>
        <text x="550" y="65" fontSize="10" fill={secondary}>
          访问语义
        </text>
        {roleRows.map((row, index) => {
          const y = 78 + index * 47;
          return (
            <g key={row[0]}>
              <rect
                x="18"
                y={y}
                width="844"
                height="35"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="38" cy={y + 17.5} r="6.5" fill={row[3]} />
              <text
                x="53"
                y={y + 22}
                fontSize="10.4"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="205"
                y={y + 22}
                fontFamily="monospace"
                fontSize="9.6"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="550" y={y + 22} fontSize="10" fill={primary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="329"
          textAnchor="middle"
          fontSize="10.3"
          fill={secondary}
        >
          容量、binding 数量与 offset alignment 都必须从当前 implementation 查询
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Buffer 的五类消费角色
        </p>
        {roleRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p
              className="mt-1 break-words font-mono text-[10px]"
              style={{ color: row[3] }}
            >
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const layoutRows = [
  ["float", "4", "4", "4", "标量"],
  ["vec3", "16", "16", "16", "不能按 12 字节连续猜"],
  ["float[4]", "16 stride", "4 stride", "4 elements", "std430 数组更紧凑"],
  ["struct", "round to 16", "member max", "query offsets", "嵌套时继续对齐"],
] as const;

export function GlsBlockLayoutDiagram() {
  return (
    <DiagramFrame caption="Block layout 规定 shader 侧 offset 与 stride；宿主结构体必须匹配，复杂布局优先通过 program interface 查询验证。">
      <svg
        viewBox="0 0 900 340"
        role="img"
        aria-label="std140 与 std430 对标量向量数组和结构体的对齐与步长对照"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          布局不是 sizeof(C++) 的自然结果
        </text>
        <text x="28" y="68" fontSize="10" fill={secondary}>
          成员
        </text>
        <text x="175" y="68" fontSize="10" fill={secondary}>
          std140
        </text>
        <text x="335" y="68" fontSize="10" fill={secondary}>
          std430
        </text>
        <text x="495" y="68" fontSize="10" fill={secondary}>
          数据量
        </text>
        <text x="650" y="68" fontSize="10" fill={secondary}>
          风险
        </text>
        {layoutRows.map((row, index) => {
          const y = 82 + index * 51;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="860"
                height="39"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <text
                x="34"
                y={y + 24}
                fontFamily="monospace"
                fontSize="10.2"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="175"
                y={y + 24}
                fontFamily="monospace"
                fontSize="9.8"
                fill={color}
              >
                {row[1]}
              </text>
              <text
                x="335"
                y={y + 24}
                fontFamily="monospace"
                fontSize="9.8"
                fill={color}
              >
                {row[2]}
              </text>
              <text
                x="495"
                y={y + 24}
                fontFamily="monospace"
                fontSize="9.8"
                fill={primary}
              >
                {row[3]}
              </text>
              <text x="650" y={y + 24} fontSize="9.8" fill={secondary}>
                {row[4]}
              </text>
            </g>
          );
        })}
        <rect
          x="140"
          y="296"
          width="620"
          height="27"
          rx="6"
          fill={warning}
          fillOpacity="0.07"
          stroke={warning}
          strokeOpacity="0.5"
        />
        <text
          x="450"
          y="314"
          textAnchor="middle"
          fontSize="10.2"
          fill={primary}
        >
          offset(next) = alignUp(offset + size, alignment(next))
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          std140 与 std430
        </p>
        {layoutRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="font-mono text-sm text-primary">{row[0]}</strong>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
              <span className="text-secondary">std140 · {row[1]}</span>
              <span className="text-secondary">std430 · {row[2]}</span>
            </div>
            <p className="mt-2 text-xs text-secondary">{row[4]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const ringStages = [
  ["chunk 0", "GPU reading", danger],
  ["chunk 1", "fence pending", warning],
  ["chunk 2", "CPU writes", success],
  ["chunk 3", "available", accent],
] as const;

export function GlsPersistentRingDiagram() {
  return (
    <DiagramFrame caption="Persistent mapping 省去反复 map/unmap，但不会消除所有权；分块环形缓冲和每块 fence 防止 CPU 覆盖 GPU 仍在读取的范围。">
      <svg
        viewBox="0 0 880 320"
        role="img"
        aria-label="持久映射环形缓冲四个分块在 GPU 读取栅栏等待 CPU 写入和可用之间轮转"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          映射指针长期有效，区间所有权仍要轮转
        </text>
        {ringStages.map((stage, index) => {
          const x = 18 + index * 217;
          return (
            <g key={stage[0]}>
              <rect
                x={x}
                y="78"
                width="195"
                height="126"
                rx="8"
                fill={stage[2]}
                fillOpacity="0.08"
                stroke={stage[2]}
              />
              <circle cx={x + 25} cy="105" r="14" fill={stage[2]} />
              <text
                x={x + 25}
                y="110"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index}
              </text>
              <text
                x={x + 97.5}
                y="141"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {stage[0]}
              </text>
              <text
                x={x + 97.5}
                y="173"
                textAnchor="middle"
                fontSize="10"
                fill={stage[2]}
              >
                {stage[1]}
              </text>
            </g>
          );
        })}
        {[213, 430, 647].map((x) => (
          <path
            key={x}
            d={`M${x} 142 H${x + 22} M${x + 14} 134 L${x + 23} 142 L${x + 14} 150`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <path
          d="M770 225 C760 280 125 285 105 225"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <text
          x="440"
          y="292"
          textAnchor="middle"
          fontSize="10.3"
          fill={secondary}
        >
          frame i 使用 chunk (i mod K)，复用前等待该 chunk 自己的 fence
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Persistent ring ownership
        </p>
        {ringStages.map((stage, index) => (
          <div
            key={stage[0]}
            className="rounded-control border p-3"
            style={{ borderColor: stage[2] }}
          >
            <div className="flex items-center justify-between">
              <strong className="font-mono text-sm text-primary">
                {index}. {stage[0]}
              </strong>
              <span className="text-xs" style={{ color: stage[2] }}>
                {stage[1]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const resourceRows = [
  ["Uniform", "small read-only values", "glUniform / UBO", accent],
  ["SSBO", "structured read-write", "buffer block + barrier", warning],
  ["Atomic counter", "compact atomic count", "atomic counter buffer", success],
  [
    "Texture / image",
    "filtered / random image access",
    "sampler / image unit",
    danger,
  ],
] as const;

export function GlsShaderDataPathDiagram() {
  return (
    <DiagramFrame caption="Uniform、SSBO、atomic counter、texture/image 的访问模型不同；选择依据是访问粒度、读写方向、布局、缓存与同步，而非数据大小口号。">
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label="着色器使用统一变量存储块原子计数器纹理和图像的访问语义对照"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          Shader 数据路径不是一种内存
        </text>
        {resourceRows.map((row, index) => {
          const x = 18 + index * 217;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="72"
                width="195"
                height="173"
                rx="8"
                fill={color}
                fillOpacity="0.08"
                stroke={color}
              />
              <text
                x={x + 97.5}
                y="105"
                textAnchor="middle"
                fontSize="12.3"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x={x + 97.5}
                y="140"
                textAnchor="middle"
                fontSize="9.8"
                fill={secondary}
              >
                {row[1]}
              </text>
              <rect
                x={x + 12}
                y="166"
                width="171"
                height="37"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 97.5}
                y="189"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9.3"
                fill={color}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="287"
          textAnchor="middle"
          fontSize="10.3"
          fill={secondary}
        >
          写入后要为下一种消费者选择对应 memory barrier bit；barrier
          不是全局等待的同义词
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          四种 shader 数据路径
        </p>
        {resourceRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 text-xs text-secondary">{row[1]}</p>
            <p
              className="mt-1 font-mono text-[10px]"
              style={{ color: [accent, warning, success, danger][index] }}
            >
              {row[2]}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const advancedRows = [
  ["Bindless", "resident 64-bit handle", "减少逐 draw 绑定", accent],
  [
    "Sparse",
    "virtual pages commit/decommit",
    "虚拟尺寸与物理驻留分离",
    warning,
  ],
  ["Compressed", "fixed-size encoded blocks", "带宽/存储换质量约束", success],
  ["Packed", "multiple fields per word", "精度换带宽，按格式解码", danger],
  [
    "Filtering",
    "mips + footprint reconstruction",
    "减少缩小/斜视采样误差",
    accent,
  ],
] as const;

export function GlsAdvancedTextureDataDiagram() {
  return (
    <DiagramFrame caption="高级数据管理分别优化绑定、驻留、编码密度与采样质量；每项都依赖格式或扩展能力，不能互相替代。">
      <svg
        viewBox="0 0 900 370"
        role="img"
        aria-label="无绑定纹理稀疏纹理压缩纹理打包数据和高质量过滤五种高级数据管理技术"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          第 11 章的五个优化维度
        </text>
        <text x="28" y="67" fontSize="10" fill={secondary}>
          技术
        </text>
        <text x="190" y="67" fontSize="10" fill={secondary}>
          机制
        </text>
        <text x="565" y="67" fontSize="10" fill={secondary}>
          解决的问题
        </text>
        {advancedRows.map((row, index) => {
          const y = 81 + index * 49;
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="860"
                height="37"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="40" cy={y + 18.5} r="6.5" fill={row[3]} />
              <text
                x="56"
                y={y + 23}
                fontSize="10.4"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="190"
                y={y + 23}
                fontFamily="monospace"
                fontSize="9.6"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="565" y={y + 23} fontSize="10" fill={primary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <rect
          x="115"
          y="337"
          width="670"
          height="24"
          rx="5"
          fill={warning}
          fillOpacity="0.07"
          stroke={warning}
          strokeOpacity="0.5"
        />
        <text x="450" y="353" textAnchor="middle" fontSize="10" fill={primary}>
          先检查 core version /
          extension，再查询限制、页尺寸、格式支持和最大各向异性
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          高级纹理与数据管理
        </p>
        {advancedRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p
              className="mt-1 break-words font-mono text-[10px]"
              style={{ color: row[3] }}
            >
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
