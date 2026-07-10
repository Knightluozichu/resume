"use client";

export function CrvJvmLanguageDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="JVM架构与垃圾回收机制图">
      <defs>
        <linearGradient id="crv-jl-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-jl-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-jl-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-jl-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-jl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">JVM 与编程语言：虚拟机机制</text>

      {/* JVM 架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">JVM 运行时架构</text>

      <rect x="100" y="74" width="600" height="40" rx="8" fill="url(#crv-jl-1)" opacity="0.9" />
      <text x="400" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">类加载子系统——加载 / 链接 / 初始化</text>

      <path d="M400 114 L400 118" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-jl-arrow)" />

      <rect x="100" y="122" width="600" height="40" rx="8" fill="url(#crv-jl-2)" opacity="0.9" />
      <text x="400" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">运行时数据区——方法区 / 堆 / 栈 / 程序计数器</text>

      <path d="M400 162 L400 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-jl-arrow)" />

      <rect x="100" y="170" width="600" height="40" rx="8" fill="url(#crv-jl-3)" opacity="0.9" />
      <text x="400" y="196" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">执行引擎——解释器 / JIT 编译器 / 垃圾回收器</text>

      {/* 内存模型 */}
      <text x="400" y="234" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">JVM 内存区域</text>

      <rect x="30" y="246" width="180" height="100" rx="8" fill="url(#crv-jl-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">堆</text>
      <text x="120" y="290" textAnchor="middle" fontSize="10" fill="#475569">对象实例存储</text>
      <text x="120" y="306" textAnchor="middle" fontSize="10" fill="#475569">新生代 / 老年代</text>
      <text x="120" y="322" textAnchor="middle" fontSize="10" fill="#475569">GC 主战场</text>
      <text x="120" y="338" textAnchor="middle" fontSize="10" fill="#475569">线程共享</text>

      <rect x="225" y="246" width="180" height="100" rx="8" fill="url(#crv-jl-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="315" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">方法区</text>
      <text x="315" y="290" textAnchor="middle" fontSize="10" fill="#475569">类信息 / 常量</text>
      <text x="315" y="306" textAnchor="middle" fontSize="10" fill="#475569">静态变量</text>
      <text x="315" y="322" textAnchor="middle" fontSize="10" fill="#475569">JIT 编译代码</text>
      <text x="315" y="338" textAnchor="middle" fontSize="10" fill="#475569">线程共享</text>

      <rect x="420" y="246" width="180" height="100" rx="8" fill="url(#crv-jl-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="510" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">虚拟机栈</text>
      <text x="510" y="290" textAnchor="middle" fontSize="10" fill="#475569">栈帧 / 局部变量</text>
      <text x="510" y="306" textAnchor="middle" fontSize="10" fill="#475569">操作数栈</text>
      <text x="510" y="322" textAnchor="middle" fontSize="10" fill="#475569">方法调用链</text>
      <text x="510" y="338" textAnchor="middle" fontSize="10" fill="#475569">线程私有</text>

      <rect x="615" y="246" width="155" height="100" rx="8" fill="url(#crv-jl-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="692" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">程序计数器</text>
      <text x="692" y="290" textAnchor="middle" fontSize="10" fill="#475569">当前指令地址</text>
      <text x="692" y="306" textAnchor="middle" fontSize="10" fill="#475569">线程切换恢复</text>
      <text x="692" y="322" textAnchor="middle" fontSize="10" fill="#475569">CPU 寄存器</text>
      <text x="692" y="338" textAnchor="middle" fontSize="10" fill="#475569">线程私有</text>

      {/* GC 流程 */}
      <text x="400" y="372" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">垃圾回收流程</text>

      <rect x="30" y="384" width="140" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">新生代</text>
      <text x="100" y="426" textAnchor="middle" fontSize="9" fill="#475569">Eden + Survivor</text>

      <path d="M170 412 L214 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-jl-arrow)" />
      <text x="192" y="404" textAnchor="middle" fontSize="9" fill="#64748b">Minor GC</text>

      <rect x="218" y="384" width="140" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="288" y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">晋升</text>
      <text x="288" y="426" textAnchor="middle" fontSize="9" fill="#475569">存活对象老化</text>

      <path d="M358 412 L402 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-jl-arrow)" />

      <rect x="406" y="384" width="140" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="476" y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">老年代</text>
      <text x="476" y="426" textAnchor="middle" fontSize="9" fill="#475569">长期存活对象</text>

      <path d="M546 412 L590 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-jl-arrow)" />
      <text x="568" y="404" textAnchor="middle" fontSize="9" fill="#64748b">Full GC</text>

      <rect x="594" y="384" width="176" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="682" y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">回收释放</text>
      <text x="682" y="426" textAnchor="middle" fontSize="9" fill="#475569">内存整理</text>

      {/* 编程语言范式 */}
      <text x="400" y="462" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">编程语言范式</text>

      <rect x="30" y="474" width="180" height="68" rx="8" fill="url(#crv-jl-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">面向对象</text>
      <text x="120" y="516" textAnchor="middle" fontSize="9" fill="#475569">Java / C++ / C#</text>
      <text x="120" y="532" textAnchor="middle" fontSize="9" fill="#475569">封装 / 继承 / 多态</text>

      <rect x="225" y="474" width="180" height="68" rx="8" fill="url(#crv-jl-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="315" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">函数式</text>
      <text x="315" y="516" textAnchor="middle" fontSize="9" fill="#475569">Haskell / Scala</text>
      <text x="315" y="532" textAnchor="middle" fontSize="9" fill="#475569">纯函数 / 不可变</text>

      <rect x="420" y="474" width="180" height="68" rx="8" fill="url(#crv-jl-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="510" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">动态类型</text>
      <text x="510" y="516" textAnchor="middle" fontSize="9" fill="#475569">Python / JS / Ruby</text>
      <text x="510" y="532" textAnchor="middle" fontSize="9" fill="#475569">运行时类型推断</text>

      <rect x="615" y="474" width="155" height="68" rx="8" fill="url(#crv-jl-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="692" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">系统级</text>
      <text x="692" y="516" textAnchor="middle" fontSize="9" fill="#475569">C / Rust / Go</text>
      <text x="692" y="532" textAnchor="middle" fontSize="9" fill="#475569">内存安全 / 高性能</text>

      <rect x="30" y="552" width="740" height="22" rx="6" fill="url(#crv-jl-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="567" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">核心：一次编写到处运行 / 自动内存管理 / JIT 混合执行——JVM 的工程智慧</text>
    </svg>
  );
}
