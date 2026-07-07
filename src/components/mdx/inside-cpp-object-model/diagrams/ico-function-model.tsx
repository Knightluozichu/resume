/**
 * <IcoFunctionModelDiagram>：成员函数的四种模型（函数语义章）。
 *
 * 四列对比成员函数的调用模型：
 *   - 非虚成员函数（accent 紫）：编译期决议，this 作为隐式首参传入
 *   - 虚成员函数（warning 暖）：经 vptr → vtable 间接调用，运行期决议
 *   - 静态成员函数（success 绿）：无 this，与普通函数等价
 *   - 内联展开（accent 紫）：函数体替换调用点，无调用开销
 * 底部标注：成员函数并非「属于对象」，所有成员函数共享一份代码。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const COL_W = 152;
const COL_GAP = 18;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

interface FuncModel {
  name: string;
  tag: string;
  color: string;
  steps: string[];
  cost: string;
}

const MODELS: readonly FuncModel[] = [
  {
    name: "非虚成员函数",
    tag: "non-virtual",
    color: "var(--accent)",
    steps: ["obj.f(args)", "→ 注入 this", "→ 编译期绑定", "→ 直接调用 Foo::f"],
    cost: "经 this 直调，等同普通函数",
  },
  {
    name: "虚成员函数",
    tag: "virtual",
    color: "var(--warning)",
    steps: ["obj.f(args)", "→ 取 obj.vptr", "→ 查 vtable[i]", "→ 间接调用派生版本"],
    cost: "一次间接查表，运行期决议",
  },
  {
    name: "静态成员函数",
    tag: "static",
    color: "var(--success)",
    steps: ["Foo::s(args)", "→ 无 this 注入", "→ 编译期绑定", "→ 直接调用 Foo::s"],
    cost: "无 this，与普通函数等价",
  },
  {
    name: "内联展开",
    tag: "inline",
    color: "var(--accent)",
    steps: ["obj.f(args)", "→ 函数体替换", "→ 无调用栈帧", "→ 零调用开销"],
    cost: "省调用开销，可能增大代码体积",
  },
];

export function IcoFunctionModelDiagram() {
  const bodyY = 96;
  const lineH = 24;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="成员函数的四种模型图。四列对比：非虚成员函数编译期绑定经 this 直调；虚成员函数经 vptr 查 vtable 间接调用运行期决议；静态成员函数无 this 与普通函数等价；内联展开把函数体替换调用点零调用开销。底部标注所有成员函数共享一份代码。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            成员函数的四种调用模型
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            成员函数的代码全类共享，区别只在「如何找到它」与「何时决议」
          </text>

          {/* 四列 */}
          {MODELS.map((m, ci) => {
            const cx = colX(ci);
            return (
              <g key={m.name}>
                {/* 列标题 */}
                <rect x={cx} y={72} width={COL_W} height={32} rx="6" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={86} textAnchor="middle" fontSize="12" fontWeight="700" fill={m.color}>
                  {m.name}
                </text>
                <text x={cx + COL_W / 2} y={99} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                  {m.tag}
                </text>

                {/* 步骤框 */}
                <rect x={cx} y={bodyY} width={COL_W} height={m.steps.length * lineH + 18} rx="8" fill={m.color} fillOpacity="0.05" stroke={m.color} strokeWidth="1.4" strokeOpacity="0.5" />
                {m.steps.map((s, si) => (
                  <text key={si} x={cx + 12} y={bodyY + 22 + si * lineH} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
                    {s}
                  </text>
                ))}

                {/* 开销标注 */}
                <text x={cx + COL_W / 2} y={bodyY + m.steps.length * lineH + 42} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {m.cost}
                </text>
              </g>
            );
          })}

          {/* this 指针说明区 */}
          <line x1={32} y1={318} x2={VIEW_W - 32} y2={318} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <rect x={60} y={334} width={600} height={70} rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={360} y={358} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--accent)">
            this 指针：非虚/虚成员函数的隐式首参
          </text>
          <text x={360} y={378} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            obj.f(a) 被编译器改写为 Foo::f(&obj, a)，&obj 即 this；静态函数无 this 故不能访问非静成员
          </text>
          <text x={360} y={394} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            虚函数多出的间接：先经 obj 的 vptr 找到所属类的 vtable，再按槽位取出真正要调的函数
          </text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={448} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            所有成员函数共享一份代码，对象里不存函数指针
          </text>
          <text x={VIEW_W / 2} y={468} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            选择哪种模型 = 在调用开销与多态能力之间权衡
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        非虚经 this 直调、虚经 vptr 间接查表、静态无 this、内联零开销；成员函数代码全类共享，对象内只存数据与 vptr。
      </figcaption>
    </figure>
  );
}
