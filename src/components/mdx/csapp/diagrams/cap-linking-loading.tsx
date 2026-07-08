/**
 * <CapLinkingLoadingDiagram>：链接与加载图解（编译流水线/ELF/符号解析/加载）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapLinkingLoadingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="链接与加载图解：编译流水线、ELF、符号解析、静态/动态链接"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            链接与加载
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            编译流水线 · ELF 格式 · 符号解析与重定位 · 静态/动态链接
          </text>

          {/* 编译流水线 */}
          <text x={VIEW_W / 2} y="76" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">从源码到可执行文件</text>
          <rect x="40" y="88" width="120" height="50" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">预处理</text>
          <text x="100" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">.c → .i</text>
          <text x="175" y="116" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="190" y="88" width="120" height="50" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="250" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">编译</text>
          <text x="250" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">.i → .s（汇编）</text>
          <text x="325" y="116" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="340" y="88" width="120" height="50" rx="6" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="400" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">汇编</text>
          <text x="400" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">.s → .o（ELF）</text>
          <text x="475" y="116" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="490" y="88" width="120" height="50" rx="6" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="550" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">链接</text>
          <text x="550" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">.o + 库 → 可执行</text>
          <text x="630" y="116" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="645" y="88" width="65" height="50" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="677" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">加载</text>
          <text x="677" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">execve</text>

          {/* ELF 结构 */}
          <rect x="30" y="158" width="230" height="180" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="145" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">ELF 目标文件结构</text>
          <rect x="50" y="192" width="190" height="22" rx="3" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="145" y="207" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--success)">.text（代码段）</text>
          <rect x="50" y="218" width="190" height="22" rx="3" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="145" y="233" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">.data（已初始化全局）</text>
          <rect x="50" y="244" width="190" height="22" rx="3" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="145" y="259" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">.bss（未初始化，0填充）</text>
          <rect x="50" y="270" width="190" height="22" rx="3" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="145" y="285" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">.symtab（符号表）</text>
          <rect x="50" y="296" width="190" height="22" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="145" y="311" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">.rela.text（重定位条目）</text>
          <text x="145" y="328" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">.o 地址从0开始，链接后定绝对地址</text>

          {/* 符号解析与重定位 */}
          <rect x="275" y="158" width="230" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="390" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">符号解析与重定位</text>
          <text x="390" y="202" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">①合并段，符号获最终地址</text>
          <text x="390" y="222" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">②符号解析：引用绑定定义</text>
          <rect x="295" y="232" width="190" height="22" rx="3" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="390" y="247" textAnchor="middle" fontSize="10" fill="var(--danger)">强符号：已初始化全局，禁重复</text>
          <rect x="295" y="258" width="190" height="22" rx="3" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="390" y="273" textAnchor="middle" fontSize="10" fill="var(--warning)">弱符号：未初始化，可被覆盖</text>
          <text x="390" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">③扫 .rela 改写占位地址</text>
          <text x="390" y="314" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">R_X86_64_PC32 相对调用</text>
          <text x="390" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">R_X86_64_64 绝对地址</text>

          {/* 静态 vs 动态链接 */}
          <rect x="520" y="158" width="190" height="180" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="615" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">静态 vs 动态链接</text>
          <rect x="540" y="192" width="150" height="22" rx="3" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="615" y="207" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">静态：复制库进可执行</text>
          <text x="615" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">独立·启动快·体积大</text>
          <rect x="540" y="244" width="150" height="22" rx="3" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="615" y="259" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">动态：加载时绑定</text>
          <text x="615" y="280" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">共享省内存·升级不需重链</text>
          <text x="615" y="298" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ld-linux.so 解析符号</text>
          <text x="615" y="316" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">PIC 位置无关代码</text>
          <text x="615" y="332" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">现代系统默认动态</text>

          {/* 链接顺序陷阱 */}
          <rect x="30" y="352" width="680" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="374" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">陷阱：静态库链接顺序是单向的</text>
          <text x={VIEW_W / 2} y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">gcc main.o -la -lb 正确（先解析 a 产生对 b 的引用，再由 b 解析）</text>
          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">gcc main.o -lb -la 报 undefined reference（扫 b 时无引用跳过，扫 a 后无库可解析）</text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：链接器从左到右单向解析，依赖库要放在引用者之后
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        链接与加载——编译流水线、ELF 结构、符号解析重定位、静态/动态链接
      </figcaption>
    </figure>
  );
}
