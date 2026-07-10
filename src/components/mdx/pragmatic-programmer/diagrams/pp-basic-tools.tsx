"use client";

export function PpBasicToolsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="基本工具核心概念图">
      <defs>
        <linearGradient id="pp-bt-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-bt-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-bt-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-bt-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-bt-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-bt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">基本工具：程序员工具箱</text>

      {/* 工具金字塔 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">工具栈分层</text>

      <rect x="280" y="78" width="240" height="44" rx="8" fill="url(#pp-bt-1)" opacity="0.9" />
      <text x="400" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">纯文本</text>
      <text x="400" y="115" textAnchor="middle" fontSize="10" fill="#e0f2fe">人类可读 / 不会过时</text>

      <path d="M400 122 L400 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-bt-arrow)" />

      <rect x="220" y="130" width="360" height="44" rx="8" fill="url(#pp-bt-2)" opacity="0.9" />
      <text x="400" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Shell / 命令行</text>
      <text x="400" y="167" textAnchor="middle" fontSize="10" fill="#f3e8ff">命令即工具组合的积木</text>

      <path d="M400 174 L400 178" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-bt-arrow)" />

      <rect x="160" y="182" width="480" height="44" rx="8" fill="url(#pp-bt-3)" opacity="0.9" />
      <text x="400" y="204" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">编辑器 / IDE</text>
      <text x="400" y="219" textAnchor="middle" fontSize="10" fill="#dcfce7">流畅使用 / 流式编辑 / 自动化</text>

      <path d="M400 226 L400 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-bt-arrow)" />

      <rect x="100" y="234" width="600" height="44" rx="8" fill="url(#pp-bt-4)" opacity="0.9" />
      <text x="400" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">版本控制 / 调试 / 文本处理 / 代码生成</text>
      <text x="400" y="271" textAnchor="middle" fontSize="10" fill="#fef9c3">VCS / 科学调试 / 正则 / 模板</text>

      {/* 六大工具卡片 */}
      <text x="400" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">六大核心工具</text>

      <rect x="20" y="318" width="240" height="80" rx="10" fill="url(#pp-bt-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="140" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">纯文本</text>
      <text x="140" y="358" textAnchor="middle" fontSize="10" fill="#475569">人可读 / 永不过时</text>
      <text x="140" y="374" textAnchor="middle" fontSize="10" fill="#475569">配置 / 文档 / 数据交换</text>
      <text x="140" y="390" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0ea5e9">优于二进制</text>

      <rect x="280" y="318" width="240" height="80" rx="10" fill="url(#pp-bt-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">Shell</text>
      <text x="400" y="358" textAnchor="middle" fontSize="10" fill="#475569">管道组合 / 自动化</text>
      <text x="400" y="374" textAnchor="middle" fontSize="10" fill="#475569">构建 / 部署 / 批处理</text>
      <text x="400" y="390" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">命令即积木</text>

      <rect x="540" y="318" width="240" height="80" rx="10" fill="url(#pp-bt-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="660" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">编辑器</text>
      <text x="660" y="358" textAnchor="middle" fontSize="10" fill="#475569">熟练到肌肉记忆</text>
      <text x="660" y="374" textAnchor="middle" fontSize="10" fill="#475569">模板 / 宏 / 自动补全</text>
      <text x="660" y="390" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">流式编辑</text>

      <rect x="20" y="412" width="240" height="80" rx="10" fill="url(#pp-bt-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="140" y="434" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">版本控制</text>
      <text x="140" y="452" textAnchor="middle" fontSize="10" fill="#475569">分布式 / 可回溯</text>
      <text x="140" y="468" textAnchor="middle" fontSize="10" fill="#475569">分支 / 合并 / 标签</text>
      <text x="140" y="484" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">一切的真相</text>

      <rect x="280" y="412" width="240" height="80" rx="10" fill="url(#pp-bt-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="434" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">调试</text>
      <text x="400" y="452" textAnchor="middle" fontSize="10" fill="#475569">复现 / 二分 / 假设</text>
      <text x="400" y="468" textAnchor="middle" fontSize="10" fill="#475569">科学方法</text>
      <text x="400" y="484" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">勿用巧合编程</text>

      <rect x="540" y="412" width="240" height="80" rx="10" fill="url(#pp-bt-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="660" y="434" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">代码生成器</text>
      <text x="660" y="452" textAnchor="middle" fontSize="10" fill="#475569">被动 vs 主动生成</text>
      <text x="660" y="468" textAnchor="middle" fontSize="10" fill="#475569">模板 / 向导</text>
      <text x="660" y="484" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">一次编写，多次运行</text>

      {/* 底部总结 */}
      <rect x="20" y="506" width="760" height="32" rx="8" fill="url(#pp-bt-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">工具是手的延伸：选好工具、用熟工具、让工具帮你做重复的事</text>

      {/* 底部脉络 */}
      <rect x="20" y="546" width="760" height="28" rx="8" fill="url(#pp-bt-3)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="564" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">基本工具：纯文本 → Shell → 编辑器 → VCS → 调试 → 代码生成</text>
    </svg>
  );
}
