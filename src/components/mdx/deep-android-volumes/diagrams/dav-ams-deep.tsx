"use client";

export function DavAmsDeepDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="AMS深度解析架构图">
      <defs>
        <linearGradient id="dav-am-ams" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-am-proc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <marker id="dav-am-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">AMS深度解析 · 组件调度中心</text>

      {/* AMS core structure */}
      <rect x="30" y="50" width="440" height="240" rx="12" fill="url(#dav-am-ams)" opacity="0.92" />
      <text x="250" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">ActivityManagerService（system_server）</text>

      <rect x="45" y="88" width="190" height="90" rx="8" fill="#fff" opacity="0.15" />
      <text x="140" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dbeafe">Activity栈管理</text>
      <text x="140" y="126" textAnchor="middle" fontSize="10" fill="#bfdbfe">ActivityStackSupervisor</text>
      <text x="140" y="142" textAnchor="middle" fontSize="10" fill="#bfdbfe">→ ActivityStack</text>
      <text x="140" y="158" textAnchor="middle" fontSize="10" fill="#bfdbfe">　→ TaskRecord</text>
      <text x="140" y="174" textAnchor="middle" fontSize="10" fill="#bfdbfe">　　→ ActivityRecord</text>

      <rect x="245" y="88" width="210" height="90" rx="8" fill="#fff" opacity="0.15" />
      <text x="350" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dbeafe">四大组件调度</text>
      <text x="350" y="128" textAnchor="middle" fontSize="10" fill="#bfdbfe">ActiveServices（Service）</text>
      <text x="350" y="146" textAnchor="middle" fontSize="10" fill="#bfdbfe">BroadcastQueue（广播）</text>
      <text x="350" y="164" textAnchor="middle" fontSize="10" fill="#bfdbfe">mProviderMap（Provider）</text>

      <rect x="45" y="188" width="410" height="42" rx="8" fill="#fff" opacity="0.15" />
      <text x="250" y="208" textAnchor="middle" fontSize="11" fill="#dbeafe">mProcessList → ProcessRecord（进程管理）</text>
      <text x="250" y="224" textAnchor="middle" fontSize="10" fill="#bfdbfe">pid / curAdj / activities / services</text>

      <rect x="45" y="238" width="410" height="42" rx="8" fill="#fff" opacity="0.15" />
      <text x="250" y="258" textAnchor="middle" fontSize="11" fill="#dbeafe">ANR监控（Handler定时器）</text>
      <text x="250" y="274" textAnchor="middle" fontSize="10" fill="#bfdbfe">Activity 5s / Broadcast 10s / Service 20s</text>

      {/* Activity launch flow */}
      <rect x="490" y="50" width="280" height="240" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="630" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Activity启动流程（三进程）</text>
      <text x="630" y="96" textAnchor="middle" fontSize="10" fill="#78350f">① App: startActivity</text>
      <text x="630" y="112" textAnchor="middle" fontSize="10" fill="#78350f">　→ Binder → AMS.startActivity</text>
      <text x="630" y="132" textAnchor="middle" fontSize="10" fill="#78350f">② AMS: 创建ActivityRecord</text>
      <text x="630" y="148" textAnchor="middle" fontSize="10" fill="#78350f">　→ 检查目标进程</text>
      <text x="630" y="168" textAnchor="middle" fontSize="10" fill="#78350f">③ 不存在 → Socket → Zygote</text>
      <text x="630" y="184" textAnchor="middle" fontSize="10" fill="#78350f">　→ fork新进程</text>
      <text x="630" y="204" textAnchor="middle" fontSize="10" fill="#78350f">④ scheduleTransaction</text>
      <text x="630" y="220" textAnchor="middle" fontSize="10" fill="#78350f">　→ Binder回调App</text>
      <text x="630" y="240" textAnchor="middle" fontSize="10" fill="#78350f">⑤ ActivityThread</text>
      <text x="630" y="256" textAnchor="middle" fontSize="10" fill="#78350f">　.handleLaunchActivity</text>
      <text x="630" y="276" textAnchor="middle" fontSize="10" fill="#92400e">⑥ Instrumentation.newActivity</text>

      {/* OOM Adj */}
      <rect x="30" y="310" width="440" height="190" rx="10" fill="url(#dav-am-proc)" opacity="0.88" />
      <text x="250" y="334" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">进程管理 · OOM Adj优先级</text>
      <rect x="45" y="348" width="410" height="26" rx="5" fill="#fff" opacity="0.2" />
      <text x="250" y="366" textAnchor="middle" fontSize="10" fill="#fef3c7">adj=0 前台Activity进程（几乎不被杀）</text>
      <rect x="45" y="378" width="410" height="26" rx="5" fill="#fff" opacity="0.15" />
      <text x="250" y="396" textAnchor="middle" fontSize="10" fill="#fef3c7">adj=100 可见但非前台</text>
      <rect x="45" y="408" width="410" height="26" rx="5" fill="#fff" opacity="0.12" />
      <text x="250" y="426" textAnchor="middle" fontSize="10" fill="#fef3c7">adj=200 可感知（播放音乐）</text>
      <rect x="45" y="438" width="410" height="26" rx="5" fill="#fff" opacity="0.08" />
      <text x="250" y="456" textAnchor="middle" fontSize="10" fill="#fef3c7">adj=906~999 缓存进程（优先被杀）</text>
      <text x="250" y="484" textAnchor="middle" fontSize="10" fill="#fde68a">updateOomAdjLocked → /proc/pid/oom_score_adj</text>

      {/* LMK */}
      <rect x="490" y="310" width="280" height="190" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
      <text x="630" y="334" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">LowMemoryKiller（内核）</text>
      <text x="630" y="358" textAnchor="middle" fontSize="11" fill="#7f1d1d">内核线程定时检查内存水位</text>
      <text x="630" y="380" textAnchor="middle" fontSize="11" fill="#7f1d1d">内存不足时从adj最大开始杀</text>
      <text x="630" y="402" textAnchor="middle" fontSize="11" fill="#7f1d1d">前台进程(adj=0)几乎不被杀</text>
      <text x="630" y="436" textAnchor="middle" fontSize="10" fill="#991b1b">AMS.updateOomAdjLocked计算adj</text>
      <text x="630" y="454" textAnchor="middle" fontSize="10" fill="#991b1b">→ 写入oom_score_adj文件</text>
      <text x="630" y="472" textAnchor="middle" fontSize="10" fill="#991b1b">→ LMK内核读取并杀进程</text>
    </svg>
  );
}
