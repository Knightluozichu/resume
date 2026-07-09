"use client";

export function DavLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="深入理解Android全书学习地图">
      <defs>
        <linearGradient id="dav-lm-v1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-lm-v2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dav-lm-v3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <marker id="dav-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深入理解Android（卷I/II/III）知识体系</text>

      {/* Volume I */}
      <rect x="30" y="60" width="230" height="200" rx="12" fill="url(#dav-lm-v1)" opacity="0.95" />
      <text x="145" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">卷I · Java Framework层</text>
      <line x1="50" y1="95" x2="240" y2="95" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="145" y="118" textAnchor="middle" fontSize="12" fill="#e0e7ff">ZygoteInit Java层</text>
      <text x="145" y="140" textAnchor="middle" fontSize="12" fill="#e0e7ff">ClassLoader &amp; 插件化</text>
      <text x="145" y="162" textAnchor="middle" fontSize="12" fill="#e0e7ff">JNI原理（MediaScanner）</text>
      <text x="145" y="184" textAnchor="middle" fontSize="12" fill="#e0e7ff">Binder Java层封装</text>
      <text x="145" y="206" textAnchor="middle" fontSize="12" fill="#e0e7ff">Context机制</text>
      <text x="145" y="234" textAnchor="middle" fontSize="11" fill="#bfdbfe">上层框架 · 从Java看系统</text>

      {/* Volume II */}
      <rect x="285" y="60" width="230" height="200" rx="12" fill="url(#dav-lm-v2)" opacity="0.95" />
      <text x="400" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">卷II · Native层</text>
      <line x1="305" y1="95" x2="495" y2="95" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="118" textAnchor="middle" fontSize="12" fill="#ede9fe">init进程 &amp; init.rc</text>
      <text x="400" y="140" textAnchor="middle" fontSize="12" fill="#ede9fe">属性系统（property）</text>
      <text x="400" y="162" textAnchor="middle" fontSize="12" fill="#ede9fe">Zygote Native层 &amp; fork</text>
      <text x="400" y="184" textAnchor="middle" fontSize="12" fill="#ede9fe">Binder驱动 &amp; mmap</text>
      <text x="400" y="206" textAnchor="middle" fontSize="12" fill="#ede9fe">ServiceManager(C++)</text>
      <text x="400" y="234" textAnchor="middle" fontSize="11" fill="#ddd6fe">中层底座 · 从Native看机制</text>

      {/* Volume III */}
      <rect x="540" y="60" width="230" height="200" rx="12" fill="url(#dav-lm-v3)" opacity="0.95" />
      <text x="655" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">卷III · 核心服务深度</text>
      <line x1="560" y1="95" x2="750" y2="95" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="655" y="118" textAnchor="middle" fontSize="12" fill="#fce7f3">AMS源码深度剖析</text>
      <text x="655" y="140" textAnchor="middle" fontSize="12" fill="#fce7f3">WMS &amp; View绘制</text>
      <text x="655" y="162" textAnchor="middle" fontSize="12" fill="#fce7f3">PMS &amp; APK安装</text>
      <text x="655" y="184" textAnchor="middle" fontSize="12" fill="#fce7f3">音频 &amp; 媒体框架</text>
      <text x="655" y="206" textAnchor="middle" fontSize="12" fill="#fce7f3">Stagefright引擎</text>
      <text x="655" y="234" textAnchor="middle" fontSize="11" fill="#fbcfe8">核心服务 · 源码级剖析</text>

      {/* Arrows between volumes */}
      <path d="M260 160 L285 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-lm-arrow)" />
      <path d="M515 160 L540 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-lm-arrow)" />

      {/* Two main lines */}
      <text x="400" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">两条核心主线</text>

      <rect x="60" y="310" width="320" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="220" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">主线一：Binder跨进程通信</text>
      <text x="220" y="352" textAnchor="middle" fontSize="11" fill="#78350f">卷I Java层 → 卷II Native层 → 卷III 服务</text>
      <text x="220" y="370" textAnchor="middle" fontSize="11" fill="#78350f">IBinder/BpBinder/binder驱动/mmap一次拷贝</text>

      <rect x="420" y="310" width="320" height="80" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="580" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">主线二：系统启动流程</text>
      <text x="580" y="352" textAnchor="middle" fontSize="11" fill="#1e3a8a">init → Zygote → system_server → App</text>
      <text x="580" y="370" textAnchor="middle" fontSize="11" fill="#1e3a8a">init.rc/fork+COW/AMS调度</text>

      {/* Learning path */}
      <rect x="60" y="410" width="680" height="90" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（源码驱动 · 逐层深入）</text>
      <text x="400" y="454" textAnchor="middle" fontSize="11" fill="#475569">① 卷I 建立Java Framework认知 → ② 卷II 理解Native底层机制</text>
      <text x="400" y="472" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 卷III 深入核心服务源码 → ④ 全书复习整合知识图谱</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#64748b">两条主线在"Binder通信"与"进程创建"交汇</text>
    </svg>
  );
}
