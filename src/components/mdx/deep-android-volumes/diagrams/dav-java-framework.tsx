"use client";

export function DavJavaFrameworkDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="Java Framework层架构图">
      <defs>
        <linearGradient id="dav-jf-zygote" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-jf-cl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="dav-jf-binder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <marker id="dav-jf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Java Framework层全景</text>

      {/* ZygoteInit section */}
      <rect x="30" y="50" width="230" height="180" rx="12" fill="url(#dav-jf-zygote)" opacity="0.92" />
      <text x="145" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">ZygoteInit（Java层）</text>
      <rect x="45" y="88" width="200" height="32" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="108" textAnchor="middle" fontSize="11" fill="#dbeafe">① preload() 预加载类/资源</text>
      <rect x="45" y="126" width="200" height="32" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="146" textAnchor="middle" fontSize="11" fill="#dbeafe">② forkSystemServer()</text>
      <rect x="45" y="164" width="200" height="32" rx="6" fill="#fff" opacity="0.18" />
      <text x="145" y="184" textAnchor="middle" fontSize="11" fill="#dbeafe">③ runSelectLoop() 等待fork</text>
      <text x="145" y="216" textAnchor="middle" fontSize="10" fill="#bfdbfe">COW共享预加载 · fork极快</text>

      {/* ClassLoader section */}
      <rect x="285" y="50" width="230" height="180" rx="12" fill="url(#dav-jf-cl)" opacity="0.92" />
      <text x="400" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">ClassLoader &amp; 插件化</text>
      <text x="400" y="98" textAnchor="middle" fontSize="11" fill="#d1fae5">BootClassLoader</text>
      <text x="400" y="116" textAnchor="middle" fontSize="11" fill="#d1fae5">→ BaseDexClassLoader</text>
      <text x="400" y="134" textAnchor="middle" fontSize="11" fill="#d1fae5">　→ DexPathList → Element[]</text>
      <line x1="305" y1="146" x2="495" y2="146" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
      <text x="400" y="164" textAnchor="middle" fontSize="11" fill="#d1fae5">双亲委派: parent优先</text>
      <text x="400" y="182" textAnchor="middle" fontSize="11" fill="#d1fae5">插件化: 合并dexElements</text>
      <text x="400" y="208" textAnchor="middle" fontSize="10" fill="#a7f3d0">Stub欺骗AMS · 偷梁换柱</text>

      {/* Binder Java section */}
      <rect x="540" y="50" width="230" height="180" rx="12" fill="url(#dav-jf-binder)" opacity="0.92" />
      <text x="655" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Binder Java层</text>
      <text x="655" y="98" textAnchor="middle" fontSize="11" fill="#fef3c7">IBinder 接口</text>
      <text x="655" y="116" textAnchor="middle" fontSize="11" fill="#fef3c7">→ Binder（transact=native）</text>
      <text x="655" y="134" textAnchor="middle" fontSize="11" fill="#fef3c7">→ BinderProxy（客户端代理）</text>
      <line x1="560" y1="146" x2="750" y2="146" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
      <text x="655" y="164" textAnchor="middle" fontSize="11" fill="#fef3c7">ServiceManager(Java)</text>
      <text x="655" y="182" textAnchor="middle" fontSize="11" fill="#fef3c7">getService / addService</text>
      <text x="655" y="208" textAnchor="middle" fontSize="10" fill="#fde68a">AIDL: Proxy + Stub</text>

      {/* Context section */}
      <rect x="150" y="260" width="500" height="70" rx="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="400" y="284" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Context 机制 · 全局上下文</text>
      <text x="400" y="304" textAnchor="middle" fontSize="11" fill="#475569">ContextImpl → Application / Activity / Service</text>
      <text x="400" y="320" textAnchor="middle" fontSize="11" fill="#475569">getSystemService → SystemServiceRegistry → Binder代理包装</text>

      {/* Plugin hook flow */}
      <rect x="30" y="350" width="740" height="150" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="374" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">插件化：欺骗AMS启动未注册Activity</text>
      <rect x="50" y="388" width="200" height="48" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="150" y="408" textAnchor="middle" fontSize="10" fill="#78350f">① hook IActivityManager</text>
      <text x="150" y="424" textAnchor="middle" fontSize="10" fill="#78350f">PluginActivity→StubActivity</text>
      <path d="M252 412 L298 412" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#dav-jf-arrow)" />
      <rect x="300" y="388" width="200" height="48" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="408" textAnchor="middle" fontSize="10" fill="#78350f">② AMS检查通过</text>
      <text x="400" y="424" textAnchor="middle" fontSize="10" fill="#78350f">创建StubActivity</text>
      <path d="M502 412 L548 412" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#dav-jf-arrow)" />
      <rect x="550" y="388" width="200" height="48" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="650" y="408" textAnchor="middle" fontSize="10" fill="#78350f">③ hook Handler.Callback</text>
      <text x="650" y="424" textAnchor="middle" fontSize="10" fill="#78350f">StubActivity→PluginActivity</text>
      <text x="400" y="468" textAnchor="middle" fontSize="10" fill="#92400e">AMS只见StubActivity · ActivityThread内偷梁换柱为真实插件Activity</text>
      <text x="400" y="486" textAnchor="middle" fontSize="10" fill="#92400e">需理解: Activity启动流程 + Handler消息机制 + 动态代理</text>
    </svg>
  );
}
