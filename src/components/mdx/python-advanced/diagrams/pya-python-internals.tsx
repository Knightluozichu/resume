/**
 * <PyaPythonInternalsDiagram>：Python内部机制——对象模型与内存管理全景。
 *
 * 上半区：对象三要素（身份/类型/值）与 type-object 关系图。
 * 下半区：内存管理机制（引用计数 + 分代GC + pymalloc）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function PyaPythonInternalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python内部机制图。上半区展示对象三要素（身份/类型/值）及 type 与 object 的互指关系；下半区展示三层内存管理：引用计数（即时回收）、分代GC（循环引用回收）、pymalloc内存池。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Python 内部机制全景
          </text>

          {/* ===== 上半区：对象模型 ===== */}
          <text x="40" y="56" fontSize="13" fontWeight="700" fill="var(--accent)">对象模型</text>

          {/* 三要素圆 */}
          <circle cx="120" cy="100" r="28" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="120" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">身份 id()</text>

          <circle cx="220" cy="100" r="28" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.4" />
          <text x="220" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">类型 type()</text>

          <circle cx="320" cy="100" r="28" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="320" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">值 value</text>

          {/* type-object 关系 */}
          <rect x="440" y="74" width="100" height="36" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="490" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">type</text>

          <rect x="570" y="74" width="100" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="620" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">object</text>

          {/* 箭头：type 的类型是 type（自指），object 的类型是 type */}
          <path d="M 490 74 Q 460 50 440 60" fill="none" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="4 3" />
          <text x="410" y="44" textAnchor="middle" fontSize="9" fill="var(--danger)">type(type)=type</text>

          <line x1="570" y1="92" x2="540" y2="92" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <text x="555" y="86" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">isinstance</text>

          {/* 分隔线 */}
          <line x1="40" y1="150" x2={VIEW_W - 40} y2="150" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 下半区：内存管理 ===== */}
          <text x="40" y="174" fontSize="13" fontWeight="700" fill="var(--success)">内存管理（三层）</text>

          {/* 层1：引用计数 */}
          <rect x="40" y="192" width="190" height="76" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="135" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">引用计数</text>
          <text x="135" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">即时回收 · 计数归零即释放</text>
          <text x="135" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无法处理循环引用</text>
          <text x="135" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">sys.getrefcount(obj)</text>

          {/* 层2：分代GC */}
          <rect x="265" y="192" width="190" height="76" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">分代垃圾回收</text>
          <text x="360" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">定期扫描 · 可达性分析</text>
          <text x="360" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">回收循环引用组</text>
          <text x="360" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">gc.collect() · 0/1/2 代</text>

          {/* 层3：pymalloc */}
          <rect x="490" y="192" width="190" height="76" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="585" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">pymalloc 内存池</text>
          <text x="585" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">小对象 arena/pool/block</text>
          <text x="585" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">减少 malloc 系统调用</text>
          <text x="585" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">≤512B 走内存池</text>

          {/* 箭头连接三层 */}
          <text x="247" y="234" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">补充</text>
          <text x="472" y="234" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">底层</text>

          {/* 执行流程 */}
          <text x="40" y="302" fontSize="13" fontWeight="700" fill="var(--danger)">执行流程</text>
          <rect x="60" y="316" width="120" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="120" y="335" textAnchor="middle" fontSize="11" fill="var(--text-primary)">源码 .py</text>
          <text x="200" y="335" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">→</text>
          <rect x="220" y="316" width="120" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="280" y="335" textAnchor="middle" fontSize="11" fill="var(--text-primary)">AST → 字节码</text>
          <text x="360" y="335" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">→</text>
          <rect x="380" y="316" width="120" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="440" y="335" textAnchor="middle" fontSize="11" fill="var(--text-primary)">.pyc 缓存</text>
          <text x="520" y="335" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">→</text>
          <rect x="540" y="316" width="120" height="28" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="600" y="335" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">VM eval loop</text>

          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            dis.dis() 可反汇编字节码，是性能分析与调试的利器
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 内部机制：对象三要素定义「是什么」，引用计数+分代GC 管理「活多久」，字节码虚拟机决定「怎么跑」。
      </figcaption>
    </figure>
  );
}
