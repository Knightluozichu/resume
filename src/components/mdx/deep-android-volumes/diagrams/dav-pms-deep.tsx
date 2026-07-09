"use client";

export function DavPmsDeepDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="PMS深度解析架构图">
      <defs>
        <linearGradient id="dav-pm-pms" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="dav-pm-apk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <marker id="dav-pm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">PMS深度解析 · 包管理与安装</text>

      {/* APK structure */}
      <rect x="30" y="50" width="250" height="240" rx="12" fill="url(#dav-pm-apk)" opacity="0.92" />
      <text x="155" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">APK文件结构</text>
      <text x="155" y="98" textAnchor="middle" fontSize="11" fill="#fef3c7">AndroidManifest.xml（二进制XML）</text>
      <text x="155" y="118" textAnchor="middle" fontSize="11" fill="#fef3c7">classes.dex / classes2.dex</text>
      <text x="155" y="138" textAnchor="middle" fontSize="11" fill="#fef3c7">resources.arsc（资源索引）</text>
      <text x="155" y="158" textAnchor="middle" fontSize="11" fill="#fef3c7">res/（layout/drawable/values）</text>
      <text x="155" y="178" textAnchor="middle" fontSize="11" fill="#fef3c7">assets/（原始资源）</text>
      <text x="155" y="198" textAnchor="middle" fontSize="11" fill="#fef3c7">lib/（arm64-v8a/armeabi-v7a）</text>
      <line x1="50" y1="210" x2="260" y2="210" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
      <text x="155" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fef3c7">META-INF/（签名）</text>
      <text x="155" y="250" textAnchor="middle" fontSize="10" fill="#fde68a">MANIFEST.MF（SHA-1摘要）</text>
      <text x="155" y="268" textAnchor="middle" fontSize="10" fill="#fde68a">CERT.SF + CERT.RSA（X.509）</text>

      {/* Install flow */}
      <rect x="300" y="50" width="250" height="240" rx="12" fill="url(#dav-pm-pms)" opacity="0.92" />
      <text x="425" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">APK安装六步流程</text>
      <rect x="315" y="88" width="220" height="28" rx="5" fill="#fff" opacity="0.18" />
      <text x="425" y="107" textAnchor="middle" fontSize="11" fill="#d1fae5">① 拷贝APK → /data/app/</text>
      <rect x="315" y="120" width="220" height="28" rx="5" fill="#fff" opacity="0.15" />
      <text x="425" y="139" textAnchor="middle" fontSize="11" fill="#d1fae5">② PackageParser解析</text>
      <rect x="315" y="152" width="220" height="28" rx="5" fill="#fff" opacity="0.12" />
      <text x="425" y="171" textAnchor="middle" fontSize="11" fill="#d1fae5">③ 签名校验 verifySignatures</text>
      <rect x="315" y="184" width="220" height="28" rx="5" fill="#fff" opacity="0.1" />
      <text x="425" y="203" textAnchor="middle" fontSize="11" fill="#d1fae5">④ 权限检查与授予</text>
      <rect x="315" y="216" width="220" height="28" rx="5" fill="#fff" opacity="0.08" />
      <text x="425" y="235" textAnchor="middle" fontSize="11" fill="#d1fae5">⑤ dex2oat编译（installd）</text>
      <rect x="315" y="248" width="220" height="28" rx="5" fill="#fff" opacity="0.06" />
      <text x="425" y="267" textAnchor="middle" fontSize="11" fill="#d1fae5">⑥ 写packages.xml + 通知AMS</text>

      {/* Permission */}
      <rect x="570" y="50" width="200" height="240" rx="12" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
      <text x="670" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#991b1b">权限管理</text>
      <text x="670" y="98" textAnchor="middle" fontSize="11" fill="#7f1d1d">普通权限（自动授予）</text>
      <text x="670" y="116" textAnchor="middle" fontSize="10" fill="#991b1b">INTERNET / VIBRATE</text>
      <text x="670" y="140" textAnchor="middle" fontSize="11" fill="#7f1d1d">危险权限（运行时）</text>
      <text x="670" y="158" textAnchor="middle" fontSize="10" fill="#991b1b">CAMERA / LOCATION</text>
      <text x="670" y="182" textAnchor="middle" fontSize="11" fill="#7f1d1d">签名权限（同签名）</text>
      <text x="670" y="200" textAnchor="middle" fontSize="10" fill="#991b1b">BIND_DEVICE_ADMIN</text>
      <text x="670" y="224" textAnchor="middle" fontSize="11" fill="#7f1d1d">特权权限（priv-app）</text>
      <line x1="585" y1="240" x2="755" y2="240" stroke="#f87171" strokeWidth="0.5" />
      <text x="670" y="260" textAnchor="middle" fontSize="10" fill="#7f1d1d">checkUidPermission</text>
      <text x="670" y="278" textAnchor="middle" fontSize="10" fill="#991b1b">Binder.getCallingUid()</text>

      {/* dex2oat */}
      <rect x="30" y="310" width="360" height="90" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="334" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">dex2oat编译</text>
      <text x="210" y="356" textAnchor="middle" fontSize="11" fill="#1e3a8a">DEX字节码 → OAT机器码</text>
      <text x="210" y="376" textAnchor="middle" fontSize="10" fill="#1e40af">PMS → installd（Socket）→ dex2oat</text>
      <text x="210" y="392" textAnchor="middle" fontSize="10" fill="#1e40af">Android 7.0+: AOT + JIT混合编译</text>

      {/* Signature */}
      <rect x="410" y="310" width="360" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="334" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">签名校验</text>
      <text x="590" y="356" textAnchor="middle" fontSize="11" fill="#78350f">V1: MANIFEST.MF + CERT.SF + CERT.RSA</text>
      <text x="590" y="376" textAnchor="middle" fontSize="11" fill="#78350f">V2: APK签名块（Android 7.0+）</text>
      <text x="590" y="392" textAnchor="middle" fontSize="10" fill="#92400e">完整性 + 身份认证 + 更新校验</text>

      {/* PackageParser */}
      <rect x="30" y="420" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="444" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">PackageParser解析流程</text>
      <text x="400" y="466" textAnchor="middle" fontSize="10" fill="#475569">parsePackage → 解析AndroidManifest.xml → manifest/application/activity/service/receiver/provider</text>
      <text x="400" y="484" textAnchor="middle" fontSize="10" fill="#475569">→ 创建Package对象（组件列表/权限列表/签名）→ 供AMS组件查询</text>
    </svg>
  );
}
