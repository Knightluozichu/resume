/**
 * <AalDalvikArtDiagram>：Dalvik与ART虚拟机对比图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function AalDalvikArtDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Dalvik与ART虚拟机对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Dalvik 与 ART 虚拟机对比
          </text>

          {/* Dalvik 列 */}
          <rect x="40" y="50" width="320" height="380" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <rect x="40" y="50" width="320" height="40" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">Dalvik VM（Android 4.4及以前）</text>

          <text x="60" y="112" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">执行文件格式</text>
          <text x="60" y="130" textAnchor="start" fontSize="11" fill="var(--text-secondary)">DEX（Dalvik Executable）</text>
          <text x="60" y="146" textAnchor="start" fontSize="11" fill="var(--text-secondary)">多个.class → 合并去冗余 → .dex</text>

          <text x="60" y="172" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">编译策略</text>
          <text x="60" y="190" textAnchor="start" fontSize="11" fill="var(--text-secondary)">JIT（Just-In-Time）即时编译</text>
          <text x="60" y="206" textAnchor="start" fontSize="11" fill="var(--text-secondary)">运行时逐行将字节码翻译为机器码</text>
          <text x="60" y="222" textAnchor="start" fontSize="11" fill="var(--text-secondary)">每次启动都重新编译，启动慢</text>

          <text x="60" y="248" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">寄存器架构</text>
          <text x="60" y="266" textAnchor="start" fontSize="11" fill="var(--text-secondary)">基于寄存器（Register-based）</text>
          <text x="60" y="282" textAnchor="start" fontSize="11" fill="var(--text-secondary)">JVM基于栈，Dalvik基于寄存器</text>

          <text x="60" y="308" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">GC机制</text>
          <text x="60" y="326" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Mark-Sweep 标记清除</text>
          <text x="60" y="342" textAnchor="start" fontSize="11" fill="var(--text-secondary)">全堆暂停（Stop-The-World）</text>
          <text x="60" y="358" textAnchor="start" fontSize="11" fill="var(--text-secondary)">容易造成卡顿</text>

          <text x="60" y="384" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">缺点</text>
          <text x="60" y="402" textAnchor="start" fontSize="11" fill="var(--text-secondary)">启动慢、运行时编译开销大</text>
          <text x="60" y="418" textAnchor="start" fontSize="11" fill="var(--text-secondary)">GC停顿明显，应用响应延迟</text>

          {/* ART 列 */}
          <rect x="380" y="50" width="320" height="380" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <rect x="380" y="50" width="320" height="40" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">ART（Android 5.0+）</text>

          <text x="400" y="112" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">执行文件格式</text>
          <text x="400" y="130" textAnchor="start" fontSize="11" fill="var(--text-secondary)">OAT / ART执行格式</text>
          <text x="400" y="146" textAnchor="start" fontSize="11" fill="var(--text-secondary)">DEX → dex2oat → OAT（ELF格式）</text>

          <text x="400" y="172" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">编译策略</text>
          <text x="400" y="190" textAnchor="start" fontSize="11" fill="var(--text-secondary)">AOT（Ahead-Of-Time）预编译</text>
          <text x="400" y="206" textAnchor="start" fontSize="11" fill="var(--text-secondary)">安装时将字节码编译为机器码</text>
          <text x="400" y="222" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Android 7.0+：AOT + JIT + Profile</text>

          <text x="400" y="248" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">寄存器架构</text>
          <text x="400" y="266" textAnchor="start" fontSize="11" fill="var(--text-secondary)">同样基于寄存器</text>
          <text x="400" y="282" textAnchor="start" fontSize="11" fill="var(--text-secondary)">优化了指令集与内存布局</text>

          <text x="400" y="308" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">GC机制</text>
          <text x="400" y="326" textAnchor="start" fontSize="11" fill="var(--text-secondary)">并发标记清除（CMS）</text>
          <text x="400" y="342" textAnchor="start" fontSize="11" fill="var(--text-secondary)">部分暂停，停顿时间大幅缩短</text>
          <text x="400" y="358" textAnchor="start" fontSize="11" fill="var(--text-secondary)">后台并发回收，减少卡顿</text>

          <text x="400" y="384" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">优势</text>
          <text x="400" y="402" textAnchor="start" fontSize="11" fill="var(--text-secondary)">启动快、运行流畅</text>
          <text x="400" y="418" textAnchor="start" fontSize="11" fill="var(--text-secondary)">GC停顿短，体验更好</text>

          {/* 中间箭头 */}
          <text x="370" y="246" textAnchor="middle" fontSize="28" fill="var(--text-tertiary)">&rarr;</text>
          <text x="370" y="268" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">演进</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dalvik与ART虚拟机对比——执行格式、编译策略、寄存器架构、GC机制
      </figcaption>
    </figure>
  );
}
