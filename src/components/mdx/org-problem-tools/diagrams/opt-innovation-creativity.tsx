"use client";

export function OptInnovationCreativityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="创新思维工具全景图">
      <defs>
        <linearGradient id="opt-ic-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-ic-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="opt-ic-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">创新思维工具 · 全景</text>

      {/* SCAMPER 奔驰法 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">SCAMPER 奔驰法</text>
      <rect x="40" y="72" width="320" height="220" rx="10" fill="url(#opt-ic-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="56" y="86" width="140" height="28" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="68" y="104" fontSize="9" fontWeight="700" fill="#0284c7">S 替代</text>
      <text x="120" y="104" fontSize="9" fill="#475569">换材料/组件</text>
      <rect x="204" y="86" width="140" height="28" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="216" y="104" fontSize="9" fontWeight="700" fill="#7c3aed">C 合并</text>
      <text x="268" y="104" fontSize="9" fill="#475569">组合功能</text>
      <rect x="56" y="122" width="140" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="68" y="140" fontSize="9" fontWeight="700" fill="#d97706">A 调整</text>
      <text x="120" y="140" fontSize="9" fill="#475569">修改适应</text>
      <rect x="204" y="122" width="140" height="28" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="216" y="140" fontSize="9" fontWeight="700" fill="#059669">M 修改</text>
      <text x="268" y="140" fontSize="9" fill="#475569">改变属性</text>
      <rect x="56" y="158" width="140" height="28" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="68" y="176" fontSize="9" fontWeight="700" fill="#dc2626">P 其他用途</text>
      <text x="130" y="176" fontSize="9" fill="#475569">新场景</text>
      <rect x="204" y="158" width="140" height="28" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="216" y="176" fontSize="9" fontWeight="700" fill="#0284c7">E 消除</text>
      <text x="268" y="176" fontSize="9" fill="#475569">删减简化</text>
      <rect x="56" y="194" width="140" height="28" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="68" y="212" fontSize="9" fontWeight="700" fill="#7c3aed">R 重组</text>
      <text x="120" y="212" fontSize="9" fill="#475569">重排顺序</text>
      <rect x="204" y="194" width="140" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="216" y="212" fontSize="9" fontWeight="700" fill="#d97706">R 逆转</text>
      <text x="268" y="212" fontSize="9" fill="#475569">反向思考</text>
      <rect x="56" y="234" width="288" height="42" rx="6" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      <text x="200" y="252" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">七个动词触发七种创新路径</text>
      <text x="200" y="268" textAnchor="middle" fontSize="9" fill="#475569">从现有产品出发，系统化衍生新方案</text>

      {/* TRIZ 理论 */}
      <text x="580" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">TRIZ 理论（发明问题解决）</text>
      <rect x="400" y="72" width="360" height="220" rx="10" fill="url(#opt-ic-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="580" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">核心：技术矛盾与40条发明原理</text>
      {/* 矛盾矩阵示意 */}
      <rect x="420" y="104" width="140" height="40" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="490" y="120" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">改善参数</text>
      <text x="490" y="136" textAnchor="middle" fontSize="8" fill="#475569">想要提升的指标</text>
      <path d="M560 124 L580 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="584" y="104" width="140" height="40" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="654" y="120" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">恶化参数</text>
      <text x="654" y="136" textAnchor="middle" fontSize="8" fill="#475569">被牺牲的指标</text>
      <path d="M654 144 L654 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="500" y="164" width="200" height="36" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="600" y="180" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">矛盾矩阵</text>
      <text x="600" y="194" textAnchor="middle" fontSize="8" fill="#475569">查表推荐发明原理</text>
      <path d="M600 200 L600 216" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="470" y="220" width="260" height="36" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="600" y="236" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">40条发明原理（分割、抽取、局部质量...）</text>
      <text x="600" y="250" textAnchor="middle" fontSize="8" fill="#475569">系统化消除矛盾而非折中妥协</text>
      <text x="580" y="276" textAnchor="middle" fontSize="9" fill="#7c3aed">从2万项专利中提炼的创新规律</text>

      {/* 设计思维 */}
      <text x="200" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">设计思维（Design Thinking）</text>
      <rect x="40" y="330" width="320" height="140" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <rect x="56" y="346" width="56" height="50" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="84" y="366" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">共情</text>
      <text x="84" y="382" textAnchor="middle" fontSize="8" fill="#475569">理解用户</text>
      <path d="M112 371 L128 371" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="132" y="346" width="56" height="50" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="160" y="366" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706">定义</text>
      <text x="160" y="382" textAnchor="middle" fontSize="8" fill="#475569">聚焦问题</text>
      <path d="M188 371 L204 371" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="208" y="346" width="56" height="50" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="236" y="366" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7c3aed">构思</text>
      <text x="236" y="382" textAnchor="middle" fontSize="8" fill="#475569">发散方案</text>
      <path d="M264 371 L280 371" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="284" y="346" width="56" height="50" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="312" y="366" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0284c7">原型</text>
      <text x="312" y="382" textAnchor="middle" fontSize="8" fill="#475569">快速制作</text>
      <path d="M312 396 L200 420" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#opt-ic-arrow)" />
      <rect x="140" y="414" width="120" height="36" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="200" y="430" textAnchor="middle" fontSize="9" fontWeight="700" fill="#059669">测试</text>
      <text x="200" y="446" textAnchor="middle" fontSize="8" fill="#475569">验证迭代</text>
      <text x="200" y="462" textAnchor="middle" fontSize="9" fill="#d97706">以人为本、迭代验证的创新流程</text>

      {/* 思维导图 */}
      <text x="580" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">思维导图（Mind Map）</text>
      <rect x="400" y="330" width="360" height="140" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="580" cy="400" rx="50" ry="28" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="580" y="396" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">核心主题</text>
      <text x="580" y="410" textAnchor="middle" fontSize="8" fill="#475569">中心节点</text>
      {/* 分支 */}
      <path d="M540 382 Q500 360 460 350" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
      <ellipse cx="440" cy="348" rx="36" ry="16" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="440" y="352" textAnchor="middle" fontSize="8" fill="#7c3aed">分支A</text>
      <path d="M620 382 Q660 360 700 350" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <ellipse cx="720" cy="348" rx="36" ry="16" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="720" y="352" textAnchor="middle" fontSize="8" fill="#d97706">分支B</text>
      <path d="M545 420 Q510 440 470 450" fill="none" stroke="#10b981" strokeWidth="1.5" />
      <ellipse cx="450" cy="452" rx="36" ry="16" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="450" y="456" textAnchor="middle" fontSize="8" fill="#059669">分支C</text>
      <path d="M615 420 Q650 440 690 450" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <ellipse cx="710" cy="452" rx="36" ry="16" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="710" y="456" textAnchor="middle" fontSize="8" fill="#dc2626">分支D</text>
      <text x="580" y="462" textAnchor="middle" fontSize="9" fill="#059669">放射状可视化思维结构</text>

      {/* 底部总结 */}
      <rect x="40" y="490" width="720" height="70" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">创新思维核心逻辑</text>
      <rect x="60" y="520" width="680" height="30" rx="6" fill="url(#opt-ic-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="540" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">发散（思维导图+SCAMPER） → 聚焦（设计思维） → 突破矛盾（TRIZ） → 验证迭代</text>
    </svg>
  );
}
