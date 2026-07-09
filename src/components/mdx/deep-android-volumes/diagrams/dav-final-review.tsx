"use client";

export function DavFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="全书知识图谱">
      <defs>
        <linearGradient id="dav-fr-v1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-fr-v2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dav-fr-v3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <linearGradient id="dav-fr-cross" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <marker id="dav-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">深入理解Android · 全书知识图谱</text>

      {/* Volume I */}
      <rect x="20" y="50" width="240" height="160" rx="12" fill="url(#dav-fr-v1)" opacity="0.92" />
      <text x="140" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">卷I · Java Framework</text>
      <text x="140" y="98" textAnchor="middle" fontSize="11" fill="#dbeafe">ZygoteInit · preload/fork</text>
      <text x="140" y="118" textAnchor="middle" fontSize="11" fill="#dbeafe">ClassLoader · 双亲委派</text>
      <text x="140" y="138" textAnchor="middle" fontSize="11" fill="#dbeafe">插件化 · Stub欺骗AMS</text>
      <text x="140" y="158" textAnchor="middle" fontSize="11" fill="#dbeafe">JNI · MediaScanner案例</text>
      <text x="140" y="178" textAnchor="middle" fontSize="11" fill="#dbeafe">Binder Java层封装</text>
      <text x="140" y="198" textAnchor="middle" fontSize="10" fill="#bfdbfe">Context · 全局上下文</text>

      {/* Volume II */}
      <rect x="280" y="50" width="240" height="160" rx="12" fill="url(#dav-fr-v2)" opacity="0.92" />
      <text x="400" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">卷II · Native层</text>
      <text x="400" y="98" textAnchor="middle" fontSize="11" fill="#ede9fe">init · init.rc/属性系统</text>
      <text x="400" y="118" textAnchor="middle" fontSize="11" fill="#ede9fe">Zygote Native · fork+COW</text>
      <text x="400" y="138" textAnchor="middle" fontSize="11" fill="#ede9fe">Binder驱动 · mmap一次拷贝</text>
      <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#ede9fe">ServiceManager C++ · handle=0</text>
      <text x="400" y="178" textAnchor="middle" fontSize="11" fill="#ede9fe">BC_/BR_协议</text>
      <text x="400" y="198" textAnchor="middle" fontSize="10" fill="#ddd6fe">IPCThreadState · ioctl循环</text>

      {/* Volume III */}
      <rect x="540" y="50" width="240" height="160" rx="12" fill="url(#dav-fr-v3)" opacity="0.92" />
      <text x="660" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">卷III · 核心服务</text>
      <text x="660" y="98" textAnchor="middle" fontSize="11" fill="#fce7f3">AMS · 组件调度/OOM Adj</text>
      <text x="660" y="118" textAnchor="middle" fontSize="11" fill="#fce7f3">WMS · 窗口/View绘制/VSync</text>
      <text x="660" y="138" textAnchor="middle" fontSize="11" fill="#fce7f3">PMS · APK安装/权限/签名</text>
      <text x="660" y="158" textAnchor="middle" fontSize="11" fill="#fce7f3">AudioFlinger · 混音/ALSA</text>
      <text x="660" y="178" textAnchor="middle" fontSize="11" fill="#fce7f3">Stagefright · 编解码</text>
      <text x="660" y="198" textAnchor="middle" fontSize="10" fill="#fbcfe8">mediaserver进程</text>

      {/* Two crossing lines */}
      <rect x="20" y="230" width="760" height="90" rx="10" fill="url(#dav-fr-cross)" opacity="0.9" />
      <text x="400" y="254" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">两条核心主线交汇</text>
      <text x="200" y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fef3c7">主线一：Binder通信</text>
      <text x="200" y="300" textAnchor="middle" fontSize="10" fill="#fde68a">Java层→JNI→Native→驱动→服务</text>
      <text x="600" y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fef3c7">主线二：启动流程</text>
      <text x="600" y="300" textAnchor="middle" fontSize="10" fill="#fde68a">init→Zygote→system_server→App</text>

      {/* Service collaboration */}
      <rect x="20" y="340" width="760" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="364" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心服务协作 · Activity启动链路</text>
      <text x="400" y="388" textAnchor="middle" fontSize="11" fill="#475569">App → AMS.startActivity（Binder）</text>
      <text x="400" y="406" textAnchor="middle" fontSize="11" fill="#475569">→ AMS查PMS组件信息 → Zygote fork新进程（Socket）</text>
      <text x="400" y="424" textAnchor="middle" fontSize="11" fill="#475569">→ ActivityThread → WMS.addWindow → SurfaceFlinger → InputDispatcher</text>
      <text x="400" y="442" textAnchor="middle" fontSize="10" fill="#64748b">AMS/WMS/PMS同进程协作 · Zygote用Socket · 大数据用ashmem</text>

      {/* Selection matrix summary */}
      <rect x="20" y="470" width="760" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">设计原则</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#78350f">关键路径用Binder · 进程创建用Socket · 大数据用ashmem · 故障隔离用独立进程 · 引导服务用简单机制</text>
    </svg>
  );
}
