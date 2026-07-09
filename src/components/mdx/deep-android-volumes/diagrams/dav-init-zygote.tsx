"use client";

export function DavInitZygoteDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="Init与Zygote启动流程图">
      <defs>
        <linearGradient id="dav-iz-init" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dav-iz-zygote" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-iz-sys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dav-iz-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dav-iz-fork" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Init与Zygote · 系统启动流程</text>

      {/* Boot chain */}
      <rect x="30" y="50" width="740" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="75" textAnchor="middle" fontSize="11" fill="#475569">BootROM → Bootloader → Linux Kernel → init（PID=1）</text>

      {/* init process */}
      <rect x="30" y="105" width="230" height="200" rx="12" fill="url(#dav-iz-init)" opacity="0.92" />
      <text x="145" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">init进程（PID=1）</text>
      <rect x="45" y="142" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="162" textAnchor="middle" fontSize="11" fill="#fee2e2">解析 init.rc</text>
      <rect x="45" y="178" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="198" textAnchor="middle" fontSize="11" fill="#fee2e2">启动关键服务</text>
      <rect x="45" y="214" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="234" textAnchor="middle" fontSize="11" fill="#fee2e2">属性系统 property_service</text>
      <rect x="45" y="250" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="270" textAnchor="middle" fontSize="11" fill="#fee2e2">SIGCHLD监听 · 重启服务</text>
      <text x="145" y="296" textAnchor="middle" fontSize="10" fill="#fecaca">ro.只读 · persist.持久化</text>

      {/* Zygote process */}
      <rect x="285" y="105" width="230" height="200" rx="12" fill="url(#dav-iz-zygote)" opacity="0.92" />
      <text x="400" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Zygote进程</text>
      <rect x="300" y="142" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="162" textAnchor="middle" fontSize="11" fill="#dbeafe">app_main.cpp → AndroidRuntime</text>
      <rect x="300" y="178" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="198" textAnchor="middle" fontSize="11" fill="#dbeafe">ZygoteInit.preload()</text>
      <rect x="300" y="214" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="234" textAnchor="middle" fontSize="11" fill="#dbeafe">forkSystemServer()</text>
      <rect x="300" y="250" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#dbeafe">runSelectLoop() 等fork请求</text>
      <text x="400" y="296" textAnchor="middle" fontSize="10" fill="#bfdbfe">COW写时复制 · 共享预加载</text>

      {/* system_server */}
      <rect x="540" y="105" width="230" height="200" rx="12" fill="url(#dav-iz-sys)" opacity="0.92" />
      <text x="655" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">system_server</text>
      <rect x="555" y="142" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="655" y="162" textAnchor="middle" fontSize="11" fill="#d1fae5">SystemServer.main()</text>
      <rect x="555" y="178" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="655" y="198" textAnchor="middle" fontSize="11" fill="#d1fae5">startBootstrapServices</text>
      <rect x="555" y="214" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="655" y="234" textAnchor="middle" fontSize="11" fill="#d1fae5">AMS / PMS / DisplayManager</text>
      <rect x="555" y="250" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="655" y="270" textAnchor="middle" fontSize="11" fill="#d1fae5">WMS / InputManager</text>
      <text x="655" y="296" textAnchor="middle" fontSize="10" fill="#a7f3d0">核心服务注册到ServiceManager</text>

      {/* Arrows */}
      <path d="M260 200 L285 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-iz-arrow)" />
      <text x="272" y="192" textAnchor="middle" fontSize="9" fill="#64748b">启动</text>
      <path d="M515 200 L540 200" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dav-iz-fork)" />
      <text x="527" y="192" textAnchor="middle" fontSize="9" fill="#dc2626">fork</text>

      {/* Property system */}
      <rect x="30" y="325" width="360" height="80" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
      <text x="210" y="348" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">属性系统 · 共享内存键值对</text>
      <text x="210" y="370" textAnchor="middle" fontSize="11" fill="#7f1d1d">get: mmap共享内存直接读（无IPC）</text>
      <text x="210" y="390" textAnchor="middle" fontSize="11" fill="#7f1d1d">set: Socket→init权限校验→更新</text>

      {/* COW mechanism */}
      <rect x="410" y="325" width="360" height="80" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="590" y="348" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">COW写时复制 · fork极速</text>
      <text x="590" y="370" textAnchor="middle" fontSize="11" fill="#1e3a8a">fork只复制页表 · 物理页共享只读</text>
      <text x="590" y="390" textAnchor="middle" fontSize="11" fill="#1e3a8a">写入时才复制对应页 · 免费共享预加载</text>

      {/* Fork app process flow */}
      <rect x="30" y="425" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Zygote fork应用进程流程</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">AMS Socket请求 → ZygoteConnection.runOnce → forkAndSpecialize</text>
      <text x="400" y="488" textAnchor="middle" fontSize="11" fill="#475569">→ fork() → SpecializeCommon(UID/GID/SELinux) → ActivityThread.main()</text>
    </svg>
  );
}
