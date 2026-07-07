/**
 * <EfcClassEncapsulationDiagram>：类设计原则（类设计章）。
 *
 * 中心展示一个类的分层结构：
 *   - 外层：public 接口（接口容易被正确使用，不易被误用）
 *   - 中层：protected（供派生类使用）
 *   - 内层：private 成员变量（数据隐藏、封装）
 * 右侧列出四条核心原则：最小接口、数据封装、const 正确性、pass-by-ref-to-const
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

interface Principle {
  title: string;
  desc: string;
  item: string;
  color: string;
}

const PRINCIPLES: readonly Principle[] = [
  { title: "最小接口", desc: "只暴露必要操作，多余接口是负担", item: "条款 18", color: accent },
  { title: "数据封装", desc: "成员变量 private，通过函数控制访问", item: "条款 22", color: success },
  { title: "const 正确性", desc: "能加 const 就加，编译器帮你查错", item: "条款 3", color: warning },
  { title: "by ref-to-const", desc: "避免按值拷贝，省开销防切片", item: "条款 20", color: accent },
];

export function EfcClassEncapsulationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类设计原则图。左侧展示类的分层结构：外层 public 接口、中层 protected、内层 private 成员变量。右侧列出四条核心原则：最小接口、数据封装、const 正确性、pass-by-ref-to-const。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            类设计原则：封装与接口
          </text>

          {/* ===== 左侧：类分层同心圆 ===== */}
          {/* public 外层 */}
          <rect x={48} y={58} width={280} height={280} rx="14" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.8" />
          <text x={188} y={80} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">public</text>
          <text x={188} y={96} textAnchor="middle" fontSize="10" fill={secondary}>接口：容易被正确使用</text>

          {/* protected 中层 */}
          <rect x={88} y={108} width={200} height={200} rx="12" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.6" />
          <text x={188} y={128} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">protected</text>
          <text x={188} y={144} textAnchor="middle" fontSize="10" fill={secondary}>供派生类访问</text>

          {/* private 内层 */}
          <rect x={128} y={158} width={120} height={120} rx="10" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.6" />
          <text x={188} y={186} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">private</text>
          <text x={188} y={204} textAnchor="middle" fontSize="10" fill={secondary}>成员变量</text>
          <text x={188} y={222} textAnchor="middle" fontSize="10" fill={secondary}>实现细节</text>
          <text x={188} y={244} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">隐藏</text>

          {/* 标注箭头 */}
          <text x={188} y={300} textAnchor="middle" fontSize="10.5" fill={secondary}>
            由外向内：接口 → 继承钩子 → 实现
          </text>
          <text x={188} y={318} textAnchor="middle" fontSize="10.5" fill={secondary}>
            封装 = 控制用户能看到什么、能改什么
          </text>

          {/* ===== 右侧：四条原则 ===== */}
          <text x={530} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            四条核心原则
          </text>

          {PRINCIPLES.map((p, i) => {
            const y = 96 + i * 62;
            return (
              <g key={p.title}>
                <rect x={372} y={y} width={312} height={52} rx="8" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1.4" />
                <rect x={372} y={y} width={4} height={52} rx="2" fill={p.color} />
                <text x={388} y={y + 20} fontSize="12.5" fontWeight="700" fill={p.color}>{p.title}</text>
                <text x={388} y={y + 38} fontSize="10.5" fill={secondary}>{p.desc}</text>
                <text x={666} y={y + 20} textAnchor="end" fontSize="10" fill={secondary} fontFamily="monospace">{p.item}</text>
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <rect x={48} y={362} width={636} height={50} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <text x={360} y={384} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            设计 class 犹如设计 type
          </text>
          <text x={360} y={402} textAnchor="middle" fontSize="11" fill={secondary}>
            新对象的创建/销毁、初始化与赋值、值传递、合法状态、继承体系——每个问题都是一道设计关卡
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={428} x2={VIEW_W - 32} y2={428} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={450} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 18-25：接口设计、成员封装、pass-by-ref-to-const、non-member 函数、不抛异常的 swap
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类设计原则：左侧类分层结构（public 接口、protected 继承钩子、private 实现细节），右侧四条核心原则（最小接口、数据封装、const 正确性、pass-by-ref-to-const）。
      </figcaption>
    </figure>
  );
}
