"use client";

export function DavBinderDeepDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="Binder深度解析架构图">
      <defs>
        <linearGradient id="dav-bd-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-bd-driver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="dav-bd-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dav-bd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Binder深度解析 · Native层架构</text>

      {/* Client */}
      <rect x="20" y="55" width="230" height="230" rx="12" fill="url(#dav-bd-client)" opacity="0.92" />
      <text x="135" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Client（客户端）</text>
      <rect x="35" y="92" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="135" y="112" textAnchor="middle" fontSize="11" fill="#dbeafe">BpBinder（持有handle号）</text>
      <rect x="35" y="128" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="135" y="148" textAnchor="middle" fontSize="11" fill="#dbeafe">IPCThreadState（TLS）</text>
      <rect x="35" y="164" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="135" y="184" textAnchor="middle" fontSize="11" fill="#dbeafe">transact() → writeTransactionData</text>
      <rect x="35" y="200" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="135" y="220" textAnchor="middle" fontSize="11" fill="#dbeafe">waitForResponse → ioctl</text>
      <text x="135" y="252" textAnchor="middle" fontSize="10" fill="#bfdbfe">BC_TRANSACTION 发送请求</text>
      <text x="135" y="270" textAnchor="middle" fontSize="10" fill="#bfdbfe">等待 BR_REPLY 回复</text>

      {/* Binder Driver */}
      <rect x="285" y="55" width="230" height="230" rx="12" fill="url(#dav-bd-driver)" opacity="0.92" />
      <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Binder驱动（内核）</text>
      <rect x="300" y="92" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="112" textAnchor="middle" fontSize="11" fill="#e2e8f0">/dev/binder</text>
      <rect x="300" y="128" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="148" textAnchor="middle" fontSize="11" fill="#e2e8f0">binder_proc / node / ref</text>
      <rect x="300" y="164" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="184" textAnchor="middle" fontSize="11" fill="#e2e8f0">binder_mmap 一次拷贝</text>
      <rect x="300" y="200" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="220" textAnchor="middle" fontSize="11" fill="#e2e8f0">BC_ / BR_ 协议转发</text>
      <text x="400" y="252" textAnchor="middle" fontSize="10" fill="#cbd5e1">copy_from_user 一次拷贝</text>
      <text x="400" y="270" textAnchor="middle" fontSize="10" fill="#cbd5e1">Server mmap区直接可读</text>

      {/* Server */}
      <rect x="550" y="55" width="230" height="230" rx="12" fill="url(#dav-bd-server)" opacity="0.92" />
      <text x="665" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Server（服务端）</text>
      <rect x="565" y="92" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="665" y="112" textAnchor="middle" fontSize="11" fill="#d1fae5">BBinder（服务基类）</text>
      <rect x="565" y="128" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="665" y="148" textAnchor="middle" fontSize="11" fill="#d1fae5">onTransact() 处理请求</text>
      <rect x="565" y="164" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="665" y="184" textAnchor="middle" fontSize="11" fill="#d1fae5">IPCThreadState.joinThreadPool</text>
      <rect x="565" y="200" width="200" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="665" y="220" textAnchor="middle" fontSize="11" fill="#d1fae5">ioctl循环接收请求</text>
      <text x="665" y="252" textAnchor="middle" fontSize="10" fill="#a7f3d0">BR_TRANSACTION 收到请求</text>
      <text x="665" y="270" textAnchor="middle" fontSize="10" fill="#a7f3d0">BC_REPLY 发送回复</text>

      {/* Arrows */}
      <path d="M250 165 L285 165" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-bd-arrow)" />
      <path d="M515 165 L550 165" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-bd-arrow)" />

      {/* mmap explanation */}
      <rect x="285" y="300" width="230" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">mmap一次拷贝原理</text>
      <text x="400" y="338" textAnchor="middle" fontSize="10" fill="#78350f">内核缓冲区 = Server用户空间映射</text>

      {/* ServiceManager */}
      <rect x="20" y="370" width="360" height="130" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
      <text x="200" y="394" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">ServiceManager（C++）· handle=0</text>
      <text x="200" y="416" textAnchor="middle" fontSize="11" fill="#7f1d1d">binder_open → binder_become_context_manager</text>
      <text x="200" y="436" textAnchor="middle" fontSize="11" fill="#7f1d1d">addService: 存入svclist链表</text>
      <text x="200" y="456" textAnchor="middle" fontSize="11" fill="#7f1d1d">getService: 查链表返回handle</text>
      <text x="200" y="480" textAnchor="middle" fontSize="10" fill="#991b1b">唯一硬编码句柄 · Binder服务查询入口</text>

      {/* Protocol */}
      <rect x="420" y="370" width="360" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="600" y="394" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">BC_ / BR_ 通信协议</text>
      <text x="600" y="416" textAnchor="middle" fontSize="11" fill="#475569">BC_TRANSACTION（Client→驱动）</text>
      <text x="600" y="436" textAnchor="middle" fontSize="11" fill="#475569">BR_TRANSACTION（驱动→Server）</text>
      <text x="600" y="456" textAnchor="middle" fontSize="11" fill="#475569">BC_REPLY（Server→驱动）</text>
      <text x="600" y="480" textAnchor="middle" fontSize="10" fill="#64748b">ioctl(BINDER_WRITE_READ) 读写命令</text>
    </svg>
  );
}
