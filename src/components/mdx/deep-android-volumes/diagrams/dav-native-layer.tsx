"use client";

export function DavNativeLayerDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="JNI与Native层交互图">
      <defs>
        <linearGradient id="dav-nl-java" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-nl-jni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="dav-nl-cpp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dav-nl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dav-nl-arrow-back" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">JNI机制 · Java与C++交互全景</text>

      {/* Java layer */}
      <rect x="30" y="55" width="220" height="200" rx="12" fill="url(#dav-nl-java)" opacity="0.92" />
      <text x="140" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Java层 · MediaScanner</text>
      <rect x="45" y="95" width="190" height="40" rx="6" fill="#fff" opacity="0.18" />
      <text x="140" y="112" textAnchor="middle" fontSize="11" fill="#dbeafe">native void processDirectory</text>
      <text x="140" y="128" textAnchor="middle" fontSize="11" fill="#dbeafe">(String path, String mime)</text>
      <rect x="45" y="145" width="190" height="40" rx="6" fill="#fff" opacity="0.18" />
      <text x="140" y="162" textAnchor="middle" fontSize="11" fill="#dbeafe">void scanFile(String, long)</text>
      <text x="140" y="178" textAnchor="middle" fontSize="11" fill="#dbeafe">（回调方法）</text>
      <text x="140" y="215" textAnchor="middle" fontSize="10" fill="#bfdbfe">JavaVM · 进程级单例</text>
      <text x="140" y="232" textAnchor="middle" fontSize="10" fill="#bfdbfe">可跨线程共享</text>

      {/* JNI bridge */}
      <rect x="290" y="55" width="220" height="200" rx="12" fill="url(#dav-nl-jni)" opacity="0.92" />
      <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">JNI桥接层</text>
      <rect x="305" y="95" width="190" height="34" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="116" textAnchor="middle" fontSize="11" fill="#fef3c7">JNI_OnLoad → RegisterNatives</text>
      <rect x="305" y="137" width="190" height="34" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#fef3c7">JNIEnv · 线程独立</text>
      <rect x="305" y="179" width="190" height="34" rx="6" fill="#fff" opacity="0.18" />
      <text x="400" y="200" textAnchor="middle" fontSize="11" fill="#fef3c7">签名: (Ljava/lang/String;)V</text>
      <text x="400" y="232" textAnchor="middle" fontSize="10" fill="#fde68a">局部引用 / 全局引用 / 弱引用</text>

      {/* C++ layer */}
      <rect x="550" y="55" width="220" height="200" rx="12" fill="url(#dav-nl-cpp)" opacity="0.92" />
      <text x="660" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">C++层 · MyMediaScanner</text>
      <rect x="565" y="95" width="190" height="40" rx="6" fill="#fff" opacity="0.18" />
      <text x="660" y="112" textAnchor="middle" fontSize="11" fill="#ede9fe">processDirectory()</text>
      <text x="660" y="128" textAnchor="middle" fontSize="11" fill="#ede9fe">扫描文件</text>
      <rect x="565" y="145" width="190" height="40" rx="6" fill="#fff" opacity="0.18" />
      <text x="660" y="162" textAnchor="middle" fontSize="11" fill="#ede9fe">callScanFile()</text>
      <text x="660" y="178" textAnchor="middle" fontSize="11" fill="#ede9fe">回调Java方法</text>
      <text x="660" y="215" textAnchor="middle" fontSize="10" fill="#ddd6fe">GetVM-&gt;AttachCurrentThread</text>
      <text x="660" y="232" textAnchor="middle" fontSize="10" fill="#ddd6fe">子线程获取JNIEnv</text>

      {/* Arrows: Java → JNI → C++ */}
      <path d="M250 140 L290 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-nl-arrow)" />
      <text x="270" y="132" textAnchor="middle" fontSize="9" fill="#64748b">调用</text>
      <path d="M510 140 L550 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#dav-nl-arrow)" />
      <text x="530" y="132" textAnchor="middle" fontSize="9" fill="#64748b">执行</text>
      {/* Arrow back: C++ → Java (callback) */}
      <path d="M550 180 L510 180" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dav-nl-arrow-back)" />
      <text x="530" y="172" textAnchor="middle" fontSize="9" fill="#dc2626">回调</text>
      <path d="M290 180 L250 180" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dav-nl-arrow-back)" />
      <text x="270" y="172" textAnchor="middle" fontSize="9" fill="#dc2626">CallVoidMethod</text>

      {/* Registration comparison */}
      <rect x="30" y="280" width="360" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="304" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">静态注册</text>
      <text x="210" y="326" textAnchor="middle" fontSize="11" fill="#475569">命名规则: Java_包名_类名_方法名</text>
      <text x="210" y="346" textAnchor="middle" fontSize="11" fill="#475569">javah自动生成 · 函数名固定长</text>
      <text x="210" y="366" textAnchor="middle" fontSize="10" fill="#64748b">虚拟机遍历查找 · 效率较低</text>

      <rect x="410" y="280" width="360" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="304" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">动态注册（推荐）</text>
      <text x="590" y="326" textAnchor="middle" fontSize="11" fill="#78350f">JNI_OnLoad → RegisterNatives</text>
      <text x="590" y="346" textAnchor="middle" fontSize="11" fill="#78350f">JNINativeMethod{name,签名,指针}</text>
      <text x="590" y="366" textAnchor="middle" fontSize="10" fill="#92400e">注册即映射 · 查找快 · 函数名自定义</text>

      {/* Reference types */}
      <rect x="30" y="400" width="740" height="80" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
      <text x="400" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">JNI三种引用类型 · 内存管理</text>
      <text x="160" y="448" textAnchor="middle" fontSize="11" fill="#7f1d1d">局部引用: 默认 · 返回自动释放</text>
      <text x="160" y="466" textAnchor="middle" fontSize="10" fill="#991b1b">上限512 · 循环需DeleteLocalRef</text>
      <text x="400" y="448" textAnchor="middle" fontSize="11" fill="#7f1d1d">全局引用: NewGlobalRef创建</text>
      <text x="400" y="466" textAnchor="middle" fontSize="10" fill="#991b1b">跨方法线程 · 需DeleteGlobalRef</text>
      <text x="640" y="448" textAnchor="middle" fontSize="11" fill="#7f1d1d">弱全局引用: NewWeakGlobalRef</text>
      <text x="640" y="466" textAnchor="middle" fontSize="10" fill="#991b1b">不阻止GC · 用前检查NULL</text>
    </svg>
  );
}
