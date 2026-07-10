"use client";

export function PpDefensiveProgrammingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="防御式编程核心概念图">
      <defs>
        <linearGradient id="pp-dp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-dp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-dp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-dp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-dp-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">防御式编程：让代码更健壮</text>

      {/* 防御层次 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">防御层次（由外到内）</text>

      <rect x="200" y="78" width="400" height="44" rx="8" fill="url(#pp-dp-1)" opacity="0.9" />
      <text x="400" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">契约式设计（DBC）</text>
      <text x="400" y="115" textAnchor="middle" fontSize="10" fill="#e0f2fe">前置条件 / 后置条件 / 不变式</text>

      <rect x="240" y="130" width="320" height="44" rx="8" fill="url(#pp-dp-2)" opacity="0.9" />
      <text x="400" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">死程序说真话</text>
      <text x="400" y="167" textAnchor="middle" fontSize="10" fill="#f3e8ff">早崩溃，不留隐患</text>

      <rect x="280" y="182" width="240" height="44" rx="8" fill="url(#pp-dp-3)" opacity="0.9" />
      <text x="400" y="204" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">断言式编程</text>
      <text x="400" y="219" textAnchor="middle" fontSize="10" fill="#dcfce7">验证不可能发生的事</text>

      <rect x="320" y="234" width="160" height="44" rx="8" fill="url(#pp-dp-4)" opacity="0.9" />
      <text x="400" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">异常处理</text>
      <text x="400" y="271" textAnchor="middle" fontSize="10" fill="#fef9c3">异常 vs 错误码</text>

      {/* 四大防御策略卡片 */}
      <text x="400" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大防御策略</text>

      <rect x="20" y="318" width="360" height="80" rx="10" fill="url(#pp-dp-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="200" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">契约式设计</text>
      <text x="200" y="358" textAnchor="middle" fontSize="10" fill="#475569">前置条件：调用方必须满足</text>
      <text x="200" y="374" textAnchor="middle" fontSize="10" fill="#475569">后置条件：被调方必须保证</text>
      <text x="200" y="390" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0ea5e9">不变式：调用前后始终成立</text>

      <rect x="420" y="318" width="360" height="80" rx="10" fill="url(#pp-dp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">死程序说真话</text>
      <text x="600" y="358" textAnchor="middle" fontSize="10" fill="#475569">检查到不可能状态时立即崩溃</text>
      <text x="600" y="374" textAnchor="middle" fontSize="10" fill="#475569">优于带病运行</text>
      <text x="600" y="390" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">早崩溃 = 早发现 = 早修复</text>

      <rect x="20" y="412" width="360" height="80" rx="10" fill="url(#pp-dp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="200" y="434" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">断言式编程</text>
      <text x="200" y="452" textAnchor="middle" fontSize="10" fill="#475569">assert（永远不该发生的事）</text>
      <text x="200" y="468" textAnchor="middle" fontSize="10" fill="#475569">生产环境可保留断言</text>
      <text x="200" y="484" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">断言查 bug，不处理错误</text>

      <rect x="420" y="412" width="360" height="80" rx="10" fill="url(#pp-dp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="600" y="434" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">异常处理</text>
      <text x="600" y="452" textAnchor="middle" fontSize="10" fill="#475569">异常用于意外 / 错误码用于预期</text>
      <text x="600" y="468" textAnchor="middle" fontSize="10" fill="#475569">在边界处理，勿散落各处</text>
      <text x="600" y="484" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">确保 finally 释放资源</text>

      {/* 底部总结 */}
      <rect x="20" y="506" width="760" height="32" rx="8" fill="url(#pp-dp-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">防御式编程 = 假设一切都会出错，然后确保即使出错也不会造成更大伤害</text>

      {/* 底部脉络 */}
      <rect x="20" y="546" width="760" height="28" rx="8" fill="url(#pp-dp-5)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="564" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">防御式编程：契约 → 死程序 → 断言 → 异常处理</text>
    </svg>
  );
}
