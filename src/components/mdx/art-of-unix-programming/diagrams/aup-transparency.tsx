"use client";

export function AupTransparencyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="透明性与可发现性设计原则图">
      <defs>
        <linearGradient id="aup-tr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-tr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-tr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-tr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-tr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">透明性与可发现性</text>

      {/* 透明性三个层次 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">透明性的三个层次</text>

      <rect x="30" y="76" width="240" height="130" rx="10" fill="url(#aup-tr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">数据可见</text>
      <text x="150" y="120" textAnchor="middle" fontSize="10" fill="#475569">内部状态可被外部观察</text>
      <text x="150" y="138" textAnchor="middle" fontSize="10" fill="#475569">配置文件是文本格式</text>
      <text x="150" y="156" textAnchor="middle" fontSize="10" fill="#475569">日志输出人类可读</text>
      <text x="150" y="174" textAnchor="middle" fontSize="10" fill="#475569">状态可通过命令查询</text>
      <rect x="90" y="184" width="120" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="150" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">What it has</text>

      <rect x="280" y="76" width="240" height="130" rx="10" fill="url(#aup-tr-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">行为可推</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#475569">从输入可推断输出</text>
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#475569">逻辑直白无魔法</text>
      <text x="400" y="156" textAnchor="middle" fontSize="10" fill="#475569">副作用最小化</text>
      <text x="400" y="174" textAnchor="middle" fontSize="10" fill="#475569">失败模式可预测</text>
      <rect x="340" y="184" width="120" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="400" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">What it does</text>

      <rect x="530" y="76" width="240" height="130" rx="10" fill="url(#aup-tr-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">系统可探</text>
      <text x="650" y="120" textAnchor="middle" fontSize="10" fill="#475569">提供自省接口</text>
      <text x="650" y="138" textAnchor="middle" fontSize="10" fill="#475569">文档与帮助完善</text>
      <text x="650" y="156" textAnchor="middle" fontSize="10" fill="#475569">--help / --version</text>
      <text x="650" y="174" textAnchor="middle" fontSize="10" fill="#475569">dry-run 模式</text>
      <rect x="590" y="184" width="120" height="16" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="650" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">How to find</text>

      {/* 可发现性手段 */}
      <text x="400" y="232" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">可发现性的实现手段</text>

      <rect x="30" y="246" width="180" height="120" rx="8" fill="url(#aup-tr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">文档即代码</text>
      <text x="120" y="290" textAnchor="middle" fontSize="9" fill="#475569">man page 手册</text>
      <text x="120" y="306" textAnchor="middle" fontSize="9" fill="#475569">--help 内置帮助</text>
      <text x="120" y="322" textAnchor="middle" fontSize="9" fill="#475569">README 随源码</text>
      <text x="120" y="338" textAnchor="middle" fontSize="9" fill="#475569">示例即文档</text>
      <text x="120" y="354" textAnchor="middle" fontSize="9" fill="#475569">注释解释「为何」</text>

      <rect x="230" y="246" width="180" height="120" rx="8" fill="url(#aup-tr-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="320" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">自描述工具</text>
      <text x="320" y="290" textAnchor="middle" fontSize="9" fill="#475569">无参数运行给提示</text>
      <text x="320" y="306" textAnchor="middle" fontSize="9" fill="#475569">错误信息可操作</text>
      <text x="320" y="322" textAnchor="middle" fontSize="9" fill="#475569">dry-run 预览</text>
      <text x="320" y="338" textAnchor="middle" fontSize="9" fill="#475569">verbose 详尽模式</text>
      <text x="320" y="354" textAnchor="middle" fontSize="9" fill="#475569">退出码有意义</text>

      <rect x="430" y="246" width="180" height="120" rx="8" fill="url(#aup-tr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="520" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">状态可见</text>
      <text x="520" y="290" textAnchor="middle" fontSize="9" fill="#475569">/proc 虚拟文件系统</text>
      <text x="520" y="306" textAnchor="middle" fontSize="9" fill="#475569">健康检查端点</text>
      <text x="520" y="322" textAnchor="middle" fontSize="9" fill="#475569">metrics 指标暴露</text>
      <text x="520" y="338" textAnchor="middle" fontSize="9" fill="#475569">trace 链路追踪</text>
      <text x="520" y="354" textAnchor="middle" fontSize="9" fill="#475569">日志结构化</text>

      <rect x="630" y="246" width="140" height="120" rx="8" fill="url(#aup-tr-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="700" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">可调试</text>
      <text x="700" y="290" textAnchor="middle" fontSize="9" fill="#475569">strace 追踪系统调用</text>
      <text x="700" y="306" textAnchor="middle" fontSize="9" fill="#475569">ltrace 库调用</text>
      <text x="700" y="322" textAnchor="middle" fontSize="9" fill="#475569">gdb 调试器</text>
      <text x="700" y="338" textAnchor="middle" fontSize="9" fill="#475569">core dump 分析</text>
      <text x="700" y="354" textAnchor="middle" fontSize="9" fill="#475569">信号可拦截</text>

      {/* 透明性决策树 */}
      <text x="400" y="392" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">透明性设计决策</text>

      <rect x="300" y="406" width="200" height="40" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">能否在不读源码的情况下理解？</text>

      <path d="M340 446 L200 466" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tr-arrow)" />
      <path d="M460 446 L600 466" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tr-arrow)" />

      <rect x="100" y="470" width="200" height="40" rx="8" fill="url(#aup-tr-3)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="200" y="494" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">能 → 透明性良好</text>

      <rect x="500" y="470" width="200" height="40" rx="8" fill="url(#aup-tr-4)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="600" y="494" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">不能 → 增加可发现性</text>

      <path d="M600 510 L600 524" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tr-arrow)" />

      <rect x="500" y="528" width="200" height="36" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="550" textAnchor="middle" fontSize="10" fill="#15803d">补充文档/日志/自省接口</text>

      {/* 底部总结 */}
      <rect x="30" y="572" width="740" height="4" rx="2" fill="url(#aup-tr-1)" opacity="0.3" />
    </svg>
  );
}
