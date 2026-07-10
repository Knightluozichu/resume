"use client";

export function SoaMethodologyToolsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="方法论与开发工具链图">
      <defs>
        <linearGradient id="soa-mt-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-mt-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-mt-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="soa-mt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">方法论与开发工具链</text>

      {/* 上部：V模型 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SOA 开发 V 模型</text>

      {/* 左侧下降：设计 */}
      <rect x="30" y="78" width="160" height="40" rx="6" fill="url(#soa-mt-1)" opacity="0.85" />
      <text x="110" y="103" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">需求分析</text>

      <path d="M110 118 L110 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="30" y="132" width="160" height="40" rx="6" fill="url(#soa-mt-1)" opacity="0.85" />
      <text x="110" y="157" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">系统架构设计</text>

      <path d="M110 172 L190 172 L190 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="110" y="190" width="160" height="40" rx="6" fill="url(#soa-mt-1)" opacity="0.85" />
      <text x="190" y="215" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">服务设计</text>

      <path d="M190 230 L270 230 L270 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="190" y="248" width="160" height="40" rx="6" fill="url(#soa-mt-1)" opacity="0.85" />
      <text x="270" y="273" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">服务实现</text>

      {/* 底部中间 */}
      <path d="M270 288 L400 288" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="350" y="268" width="120" height="40" rx="6" fill="url(#soa-mt-2)" opacity="0.9" />
      <text x="410" y="293" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">单元测试</text>

      {/* 右侧上升：验证 */}
      <path d="M470 288 L540 288 L540 274" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="460" y="248" width="160" height="40" rx="6" fill="url(#soa-mt-3)" opacity="0.85" />
      <text x="540" y="273" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">集成测试</text>

      <path d="M540 248 L540 234" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="460" y="190" width="160" height="40" rx="6" fill="url(#soa-mt-3)" opacity="0.85" />
      <text x="540" y="215" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">系统测试</text>

      <path d="M540 190 L540 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="460" y="132" width="160" height="40" rx="6" fill="url(#soa-mt-3)" opacity="0.85" />
      <text x="540" y="157" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">验收测试</text>

      <path d="M540 132 L540 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-mt-arrow)" />

      <rect x="620" y="78" width="150" height="40" rx="6" fill="url(#soa-mt-2)" opacity="0.9" />
      <text x="695" y="103" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">验证确认</text>

      {/* 中部：工具链 */}
      <text x="400" y="330" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">开发工具链</text>

      <rect x="30" y="344" width="145" height="80" rx="8" fill="url(#soa-mt-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="102" y="366" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">系统配置</text>
      <text x="102" y="384" textAnchor="middle" fontSize="8" fill="#475569">System Description</text>
      <text x="102" y="400" textAnchor="middle" fontSize="8" fill="#475569">ARXML / IDL</text>
      <text x="102" y="416" textAnchor="middle" fontSize="8" fill="#475569">服务接口定义</text>

      <rect x="190" y="344" width="145" height="80" rx="8" fill="url(#soa-mt-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="262" y="366" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">代码生成</text>
      <text x="262" y="384" textAnchor="middle" fontSize="8" fill="#475569">Proxy / Skeleton</text>
      <text x="262" y="400" textAnchor="middle" fontSize="8" fill="#475569">桩代码生成</text>
      <text x="262" y="416" textAnchor="middle" fontSize="8" fill="#475569">序列化代码</text>

      <rect x="350" y="344" width="145" height="80" rx="8" fill="url(#soa-mt-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="422" y="366" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">编译构建</text>
      <text x="422" y="384" textAnchor="middle" fontSize="8" fill="#475569">C++ / Rust</text>
      <text x="422" y="400" textAnchor="middle" fontSize="8" fill="#475569">交叉编译</text>
      <text x="422" y="416" textAnchor="middle" fontSize="8" fill="#475569">链接FC库</text>

      <rect x="510" y="344" width="145" height="80" rx="8" fill="url(#soa-mt-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="582" y="366" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">集成部署</text>
      <text x="582" y="384" textAnchor="middle" fontSize="8" fill="#475569">Manifest打包</text>
      <text x="582" y="400" textAnchor="middle" fontSize="8" fill="#475569">容器/进程</text>
      <text x="582" y="416" textAnchor="middle" fontSize="8" fill="#475569">OTA分发</text>

      <rect x="670" y="344" width="100" height="80" rx="8" fill="#ca8a04" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="720" y="366" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">测试验证</text>
      <text x="720" y="384" textAnchor="middle" fontSize="8" fill="#475569">SIL/HIL</text>
      <text x="720" y="400" textAnchor="middle" fontSize="8" fill="#475569">实车测试</text>
      <text x="720" y="416" textAnchor="middle" fontSize="8" fill="#475569">覆盖率</text>

      {/* 底部：工具生态 */}
      <text x="400" y="448" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">主流工具与生态</text>

      <rect x="30" y="462" width="350" height="42" rx="8" fill="url(#soa-mt-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="205" y="480" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">AUTOSAR工具链</text>
      <text x="205" y="496" textAnchor="middle" fontSize="8" fill="#475569">Vector DaVinci / ETAS ISOLAR / EB tresos / Elektrobit</text>

      <rect x="420" y="462" width="350" height="42" rx="8" fill="url(#soa-mt-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="480" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">开源生态</text>
      <text x="595" y="496" textAnchor="middle" fontSize="8" fill="#475569">vsomeip / CommonAPI /Franca IDL / ROS 2 (DDS)</text>

      {/* 底部总结 */}
      <rect x="30" y="520" width="740" height="42" rx="8" fill="url(#soa-mt-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="538" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">方法论核心</text>
      <text x="400" y="554" textAnchor="middle" fontSize="9" fill="#475569">V模型设计↔测试对应 / 清单驱动配置 / IDL→代码生成 / SIL→HIL→实车逐级验证</text>
    </svg>
  );
}
