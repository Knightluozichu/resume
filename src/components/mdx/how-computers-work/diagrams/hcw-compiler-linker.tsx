/**
 * <HcwCompilerLinkerDiagram>：编译与链接过程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwCompilerLinkerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编译与链接过程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            编译与链接：从源代码到可执行文件
          </text>

          {/* 源文件 */}
          <rect x="30" y="50" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" fontFamily="monospace">main.c</text>
          <text x="90" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">源代码</text>

          <rect x="30" y="100" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" fontFamily="monospace">utils.c</text>
          <text x="90" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">源代码</text>

          {/* 箭头 */}
          <line x1="155" y1="70" x2="195" y2="70" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="195,70 190,67 190,73" fill="var(--text-tertiary)" />
          <line x1="155" y1="120" x2="195" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="195,120 190,117 190,123" fill="var(--text-tertiary)" />

          {/* 预处理 */}
          <rect x="200" y="52" width="100" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="250" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">① 预处理</text>
          <text x="250" y="80" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">#include/#define</text>

          <rect x="200" y="102" width="100" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="250" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">① 预处理</text>
          <text x="250" y="130" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">#include/#define</text>

          {/* 箭头 */}
          <line x1="305" y1="70" x2="325" y2="70" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="325,70 320,67 320,73" fill="var(--text-tertiary)" />
          <line x1="305" y1="120" x2="325" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="325,120 320,117 320,123" fill="var(--text-tertiary)" />

          {/* 编译 */}
          <rect x="330" y="52" width="100" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">② 编译</text>
          <text x="380" y="80" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">词法/语法/优化</text>

          <rect x="330" y="102" width="100" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">② 编译</text>
          <text x="380" y="130" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">词法/语法/优化</text>

          {/* 箭头 */}
          <line x1="435" y1="70" x2="455" y2="70" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="455,70 450,67 450,73" fill="var(--text-tertiary)" />
          <line x1="435" y1="120" x2="455" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="455,120 450,117 450,123" fill="var(--text-tertiary)" />

          {/* 汇编 */}
          <rect x="460" y="52" width="100" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="510" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">③ 汇编</text>
          <text x="510" y="80" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">→ 机器码</text>

          <rect x="460" y="102" width="100" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="510" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">③ 汇编</text>
          <text x="510" y="130" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">→ 机器码</text>

          {/* 箭头 */}
          <line x1="565" y1="70" x2="585" y2="70" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="585,70 580,67 580,73" fill="var(--text-tertiary)" />
          <line x1="565" y1="120" x2="585" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="585,120 580,117 580,123" fill="var(--text-tertiary)" />

          {/* 目标文件 */}
          <rect x="590" y="52" width="120" height="36" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="650" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)" fontFamily="monospace">main.o</text>
          <text x="650" y="80" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">目标文件</text>

          <rect x="590" y="102" width="120" height="36" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="650" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)" fontFamily="monospace">utils.o</text>
          <text x="650" y="130" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">目标文件</text>

          {/* 合并箭头到链接器 */}
          <line x1="650" y1="90" x2="650" y2="160" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <line x1="650" y1="140" x2="650" y2="160" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="650,160 647,155 653,155" fill="var(--text-tertiary)" />

          {/* 库文件 */}
          <rect x="200" y="155" width="120" height="36" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="260" y="171" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)" fontFamily="monospace">libc.a / libc.so</text>
          <text x="260" y="183" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">静态/动态库</text>

          <line x1="325" y1="173" x2="565" y2="173" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="565,173 560,170 560,176" fill="var(--text-tertiary)" />

          {/* 链接器 */}
          <rect x="520" y="155" width="140" height="40" rx="8" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="590" y="172" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">④ 链接器</text>
          <text x="590" y="186" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">符号解析 + 地址重定位</text>

          {/* 箭头到可执行文件 */}
          <line x1="590" y1="197" x2="590" y2="222" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="590,222 587,217 593,217" fill="var(--text-tertiary)" />

          {/* 可执行文件 */}
          <rect x="520" y="226" width="140" height="40" rx="8" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="590" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)" fontFamily="monospace">a.out</text>
          <text x="590" y="258" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">可执行文件</text>

          {/* 底部：编译器 vs 解释器 */}
          <rect x="30" y="284" width="330" height="155" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="304" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">编译器（C/C++/Rust/Go）</text>
          <text x="50" y="324" textAnchor="start" fontSize="9" fill="var(--text-secondary)">源代码 → [编译器] → 可执行文件</text>
          <text x="50" y="340" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">优点：运行快 · 全局优化 · 源码不公开</text>
          <text x="50" y="356" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">缺点：编译耗时 · 平台相关</text>
          <text x="50" y="378" textAnchor="start" fontSize="9" fill="var(--text-secondary)">现代混合方案：</text>
          <text x="50" y="394" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">Java: 源码 → 字节码 → JVM 解释/JIT</text>
          <text x="50" y="410" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">JS: V8 先解释(Ignition) → JIT(TurboFan)</text>
          <text x="50" y="426" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">兼顾启动速度和运行性能</text>

          {/* 静态 vs 动态链接 */}
          <rect x="380" y="284" width="330" height="155" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="304" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">静态链接 vs 动态链接</text>
          <text x="400" y="324" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">静态链接</text>
          <text x="460" y="324" textAnchor="start" fontSize="9" fill="var(--text-secondary)">库代码复制到可执行文件</text>
          <text x="400" y="340" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">自包含 · 启动快 · 体积大 · 库更新需重编译</text>
          <text x="400" y="362" textAnchor="start" fontSize="9" fill="var(--danger)" fontWeight="600">动态链接</text>
          <text x="460" y="362" textAnchor="start" fontSize="9" fill="var(--text-secondary)">运行时加载 .so/.dll</text>
          <text x="400" y="378" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">体积小 · 共享内存 · 库更新只换 .so</text>
          <text x="400" y="394" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">缺点：运行时依赖 · DLL Hell · 启动略慢</text>
          <text x="400" y="416" textAnchor="start" fontSize="9" fill="var(--text-secondary)">报错速查：</text>
          <text x="400" y="432" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">undefined reference → 链接错误 | syntax error → 编译错误</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编译与链接过程图解——预处理→编译→汇编→链接四步、编译器 vs 解释器、静态 vs 动态链接
      </figcaption>
    </figure>
  );
}
