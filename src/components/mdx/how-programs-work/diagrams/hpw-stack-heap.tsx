/**
 * <HpwStackHeapDiagram>：栈与堆图解（栈帧压入弹出 + 堆动态分配 + 对比）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwStackHeapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="栈与堆图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            栈与堆：两种内存分配区域
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            栈管函数调用（后进先出，向下生长），堆管动态分配（向上生长）
          </text>

          {/* 左侧：栈（向下生长） */}
          <rect x="40" y="68" width="300" height="340" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="190" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">栈（Stack）向低地址生长 &darr;</text>

          {/* 栈帧：funcB（栈顶，最后调用） */}
          <rect x="60" y="100" width="260" height="64" rx="5" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="72" y="118" fontSize="12" fontWeight="600" fill="var(--success)">funcB() 栈帧（栈顶）</text>
          <text x="72" y="134" fontSize="10" fill="var(--text-secondary)">返回地址、参数、局部变量</text>
          <text x="72" y="148" fontSize="10" fill="var(--text-tertiary)">函数返回时自动弹出 ← 后进先出</text>

          {/* 栈帧：funcA */}
          <rect x="60" y="172" width="260" height="56" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="72" y="190" fontSize="12" fontWeight="600" fill="var(--success)">funcA() 栈帧</text>
          <text x="72" y="206" fontSize="10" fill="var(--text-secondary)">调用 funcB 前的状态</text>
          <text x="72" y="220" fontSize="10" fill="var(--text-tertiary)">funcB 返回后恢复执行</text>

          {/* 栈帧：main */}
          <rect x="60" y="236" width="260" height="56" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="72" y="254" fontSize="12" fontWeight="600" fill="var(--success)">main() 栈帧（栈底）</text>
          <text x="72" y="270" fontSize="10" fill="var(--text-secondary)">程序入口</text>
          <text x="72" y="284" fontSize="10" fill="var(--text-tertiary)">main 返回 = 程序结束</text>

          <text x="190" y="318" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">分配：编译器自动压栈（移动栈指针）</text>
          <text x="190" y="334" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">释放：函数返回自动弹出</text>
          <text x="190" y="356" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">栈溢出：递归太深 / 局部变量太大</text>
          <text x="190" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不能返回局部变量地址（悬空指针）</text>

          {/* 右侧：堆（向上生长） */}
          <rect x="380" y="68" width="300" height="340" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="530" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">堆（Heap）向高地址生长 &uarr;</text>

          {/* 堆块：已分配 */}
          <rect x="400" y="100" width="260" height="40" rx="5" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="412" y="118" fontSize="11" fontWeight="600" fill="var(--danger)">malloc(100) → 已分配</text>
          <text x="412" y="132" fontSize="10" fill="var(--text-tertiary)">用完要 free，否则内存泄漏</text>

          <rect x="400" y="148" width="260" height="36" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="412" y="170" fontSize="11" fill="var(--danger)">malloc(50) → 已分配</text>

          {/* 空闲块 */}
          <rect x="400" y="192" width="260" height="40" rx="5" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="530" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">空闲块（碎片）</text>

          <rect x="400" y="240" width="260" height="36" rx="5" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="412" y="262" fontSize="11" fill="var(--danger)">malloc(200) → 已分配</text>

          <text x="530" y="300" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">分配：malloc/new 查空闲链表</text>
          <text x="530" y="316" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">释放：free/delete 手动归还</text>
          <text x="530" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">内存泄漏：申请了不释放</text>
          <text x="530" y="356" textAnchor="middle" fontSize="10" fill="var(--warning)">双释放：释放两次 → 崩溃</text>
          <text x="530" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生命周期跨函数，大小运行时定</text>

          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            经验法则：能用栈就用栈（局部定长），只有运行时定大小或跨函数才用堆
          </text>
          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：栈管函数调用、堆管动态数据
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        栈与堆——栈帧的后进先出与堆的动态分配对比
      </figcaption>
    </figure>
  );
}
