"use client";

export function SoaCaseStudyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="智能座舱SOA案例分析与未来趋势图">
      <defs>
        <linearGradient id="soa-cs-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-cs-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-cs-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="soa-cs-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="soa-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">案例分析：智能座舱 SOA 服务编排</text>

      {/* 上部：服务编排示例 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">场景：语音导航启动</text>

      <rect x="30" y="78" width="160" height="60" rx="8" fill="url(#soa-cs-1)" opacity="0.85" />
      <text x="110" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">语音服务</text>
      <text x="110" y="118" textAnchor="middle" fontSize="8" fill="#e0f2fe">识别语音指令</text>
      <text x="110" y="130" textAnchor="middle" fontSize="8" fill="#e0f2fe">发布导航事件</text>

      <path d="M192 108 L222 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-cs-arrow)" />

      <rect x="226" y="78" width="160" height="60" rx="8" fill="url(#soa-cs-2)" opacity="0.85" />
      <text x="306" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">导航服务</text>
      <text x="306" y="118" textAnchor="middle" fontSize="8" fill="#dcfce7">规划路线</text>
      <text x="306" y="130" textAnchor="middle" fontSize="8" fill="#dcfce7">调用地图服务</text>

      <path d="M388 108 L418 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-cs-arrow)" />

      <rect x="422" y="78" width="160" height="60" rx="8" fill="url(#soa-cs-3)" opacity="0.85" />
      <text x="502" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">HMI服务</text>
      <text x="502" y="118" textAnchor="middle" fontSize="8" fill="#f3e8ff">更新导航界面</text>
      <text x="502" y="130" textAnchor="middle" fontSize="8" fill="#f3e8ff">显示路线地图</text>

      <path d="M584 108 L614 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-cs-arrow)" />

      <rect x="618" y="78" width="152" height="60" rx="8" fill="url(#soa-cs-4)" opacity="0.85" />
      <text x="694" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">音频服务</text>
      <text x="694" y="118" textAnchor="middle" fontSize="8" fill="#fef9c3">播放提示音</text>
      <text x="694" y="130" textAnchor="middle" fontSize="8" fill="#fef9c3">降低媒体音量</text>

      {/* 中部：AP域控制器内服务矩阵 */}
      <text x="400" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">中央域控 SOA 服务矩阵</text>

      <rect x="30" y="180" width="740" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="50" y="194" width="130" height="46" rx="6" fill="url(#soa-cs-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="115" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">座舱服务域</text>
      <text x="115" y="228" textAnchor="middle" fontSize="8" fill="#475569">HMI/语音/媒体</text>

      <rect x="195" y="194" width="130" height="46" rx="6" fill="url(#soa-cs-2)" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="260" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">行驶服务域</text>
      <text x="260" y="228" textAnchor="middle" fontSize="8" fill="#475569">动力/底盘/车身</text>

      <rect x="340" y="194" width="130" height="46" rx="6" fill="url(#soa-cs-3)" opacity="0.15" stroke="#9333ea" strokeWidth="1" />
      <text x="405" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7e22ce">ADAS服务域</text>
      <text x="405" y="228" textAnchor="middle" fontSize="8" fill="#475569">感知/决策/控制</text>

      <rect x="485" y="194" width="130" height="46" rx="6" fill="url(#soa-cs-4)" opacity="0.15" stroke="#ca8a04" strokeWidth="1" />
      <text x="550" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a16207">连接服务域</text>
      <text x="550" y="228" textAnchor="middle" fontSize="8" fill="#475569">OTA/云/诊断</text>

      <rect x="630" y="194" width="130" height="46" rx="6" fill="#dc2626" opacity="0.15" stroke="#dc2626" strokeWidth="1" />
      <text x="695" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#b91c1c">安全服务域</text>
      <text x="695" y="228" textAnchor="middle" fontSize="8" fill="#475569">监控/看门狗</text>

      <text x="400" y="262" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">SOME/IP 以太网骨干互连</text>
      <text x="400" y="284" textAnchor="middle" fontSize="8" fill="#64748b">跨域服务调用 → 语音指令触发导航 → 导航请求地图数据 → HMI更新界面 → 音频播报</text>

      {/* 下部：未来趋势 */}
      <text x="400" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">未来趋势</text>

      <rect x="30" y="338" width="170" height="80" rx="8" fill="url(#soa-cs-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="115" y="360" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">SDV软件定义汽车</text>
      <text x="115" y="378" textAnchor="middle" fontSize="8" fill="#475569">硬件抽象+软件可变</text>
      <text x="115" y="394" textAnchor="middle" fontSize="8" fill="#475569">功能后装激活</text>
      <text x="115" y="410" textAnchor="middle" fontSize="8" fill="#475569">订阅式服务</text>

      <rect x="215" y="338" width="170" height="80" rx="8" fill="url(#soa-cs-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="300" y="360" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">车云一体</text>
      <text x="300" y="378" textAnchor="middle" fontSize="8" fill="#475569">边缘计算+云端</text>
      <text x="300" y="394" textAnchor="middle" fontSize="8" fill="#475569">大数据/AI训练</text>
      <text x="300" y="410" textAnchor="middle" fontSize="8" fill="#475569">远程服务编排</text>

      <rect x="400" y="338" width="170" height="80" rx="8" fill="url(#soa-cs-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="485" y="360" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">容器化部署</text>
      <text x="485" y="378" textAnchor="middle" fontSize="8" fill="#475569">Docker/K8s车载</text>
      <text x="485" y="394" textAnchor="middle" fontSize="8" fill="#475569">微服务架构</text>
      <text x="485" y="410" textAnchor="middle" fontSize="8" fill="#475569">动态加载卸载</text>

      <rect x="585" y="338" width="185" height="80" rx="8" fill="url(#soa-cs-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="677" y="360" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">AI驱动服务</text>
      <text x="677" y="378" textAnchor="middle" fontSize="8" fill="#475569">大模型座舱</text>
      <text x="677" y="394" textAnchor="middle" fontSize="8" fill="#475569">端到端自动驾驶</text>
      <text x="677" y="410" textAnchor="middle" fontSize="8" fill="#475569">智能服务发现</text>

      {/* 底部总结 */}
      <rect x="30" y="438" width="740" height="42" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">SOA 的价值</text>
      <text x="400" y="472" textAnchor="middle" fontSize="9" fill="#475569">服务解耦 → 跨域灵活编排 / 标准接口 → 供应商互操作 / 动态发现 → OTA增量更新</text>

      <rect x="30" y="494" width="740" height="42" rx="8" fill="url(#soa-cs-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="512" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">未来方向</text>
      <text x="400" y="528" textAnchor="middle" fontSize="9" fill="#475569">SDV + 车云一体 + 容器化 + AI驱动 → 汽车从「硬件产品」变为「软件平台」</text>

      <rect x="30" y="548" width="740" height="24" rx="8" fill="url(#soa-cs-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="564" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心：SOA是软件定义汽车的技术基座</text>
    </svg>
  );
}
