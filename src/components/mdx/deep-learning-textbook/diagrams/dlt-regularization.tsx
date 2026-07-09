"use client";

export function DltRegularizationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="正则化策略核心概念图">
      <defs>
        <linearGradient id="dlt-reg-param" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-reg-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-reg-stop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlt-reg-bn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlt-reg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">正则化：偏差与方差的平衡术</text>

      {/* L1 vs L2 */}
      <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">参数惩罚</text>

      <rect x="40" y="84" width="160" height="50" rx="8" fill="url(#dlt-reg-param)" opacity="0.9" />
      <text x="120" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">L2: λ||w||²</text>
      <text x="120" y="122" textAnchor="middle" fontSize="9" fill="#bfdbfe">球体约束·权重衰减·高斯先验</text>

      <rect x="220" y="84" width="160" height="50" rx="8" fill="url(#dlt-reg-param)" opacity="0.7" />
      <text x="300" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">L1: λ||w||₁</text>
      <text x="300" y="122" textAnchor="middle" fontSize="9" fill="#bfdbfe">菱形约束·稀疏解·拉普拉斯先验</text>

      {/* 几何示意 */}
      <circle cx="120" cy="180" r="30" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="120" y="172" textAnchor="middle" fontSize="8" fill="#2563eb">L2</text>
      <text x="120" y="184" textAnchor="middle" fontSize="8" fill="#2563eb">球体</text>

      <path d="M300 160 L330 180 L300 200 L270 180 Z" fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x="300" y="172" textAnchor="middle" fontSize="8" fill="#7c3aed">L1</text>
      <text x="300" y="184" textAnchor="middle" fontSize="8" fill="#7c3aed">菱形</text>
      <text x="300" y="196" textAnchor="middle" fontSize="7" fill="#7c3aed">尖角→零</text>

      {/* Dropout */}
      <text x="500" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Dropout</text>

      <rect x="400" y="84" width="80" height="30" rx="6" fill="url(#dlt-reg-drop)" opacity="0.9" />
      <text x="440" y="103" textAnchor="middle" fontSize="10" fill="#fff">● ○ ●</text>
      <text x="440" y="128" textAnchor="middle" fontSize="8" fill="#7c3aed">训练: 随机丢弃</text>

      <rect x="500" y="84" width="80" height="30" rx="6" fill="url(#dlt-reg-drop)" opacity="0.5" />
      <text x="540" y="103" textAnchor="middle" fontSize="10" fill="#fff">● ● ●</text>
      <text x="540" y="128" textAnchor="middle" fontSize="8" fill="#7c3aed">测试: 全部使用</text>

      <text x="620" y="100" fontSize="9" fill="#475569">≈ 训练大量子网络</text>
      <text x="620" y="114" fontSize="9" fill="#475569">测试时近似平均</text>
      <text x="620" y="128" fontSize="9" fill="#475569">减少共适应</text>

      {/* 早停 */}
      <text x="200" y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">早停</text>

      <path d="M40 280 Q120 250 200 245 Q300 242 380 240" stroke="#2563eb" strokeWidth="2" fill="none" />
      <text x="50" y="295" fontSize="8" fill="#2563eb">训练误差</text>
      <path d="M40 280 Q120 260 180 250 Q220 245 240 258 Q300 280 380 300" stroke="#dc2626" strokeWidth="2" fill="none" />
      <text x="50" y="270" fontSize="8" fill="#dc2626">验证误差</text>
      <line x1="200" y1="232" x2="200" y2="300" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="200" y="225" textAnchor="middle" fontSize="8" fill="#d97706">最佳停止点</text>
      <text x="410" y="260" fontSize="9" fill="#475569">早停 ≡ L2 正则化</text>
      <text x="410" y="274" fontSize="9" fill="#475569">训练轮数 t ↔ L2 系数 α</text>

      {/* BatchNorm */}
      <text x="620" y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">批归一化</text>

      <rect x="500" y="244" width="260" height="32" rx="6" fill="url(#dlt-reg-bn)" opacity="0.8" />
      <text x="630" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">归一化: (h-μ)/σ → 缩放γ+β</text>

      <rect x="500" y="282" width="125" height="28" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="562" y="300" textAnchor="middle" fontSize="9" fill="#065f46">稳定训练</text>
      <rect x="635" y="282" width="125" height="28" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="697" y="300" textAnchor="middle" fontSize="9" fill="#065f46">允许大学习率</text>

      {/* 数据增强 */}
      <text x="200" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">数据增强</text>
      <rect x="40" y="340" width="360" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="220" y="358" textAnchor="middle" fontSize="10" fill="#1e40af">翻转·旋转·裁剪·颜色抖动·Mixup·CutMix</text>
      <rect x="40" y="374" width="360" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="220" y="390" textAnchor="middle" fontSize="9" fill="#64748b">隐式告诉模型「变换不改变标签」= 注入先验</text>

      {/* 其他正则化 */}
      <text x="620" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">其他技术</text>
      <rect x="500" y="340" width="260" height="24" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="630" y="356" textAnchor="middle" fontSize="9" fill="#5b21b6">标签平滑 · 噪声注入</text>
      <rect x="500" y="370" width="260" height="24" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="630" y="386" textAnchor="middle" fontSize="9" fill="#5b21b6">权重绑定 · 稀疏激活 · 对抗训练</text>

      {/* 底部 */}
      <rect x="40" y="410" width="740" height="36" rx="8" fill="url(#dlt-reg-stop)" opacity="0.12" stroke="#f59e0b" strokeWidth="2" />
      <text x="410" y="432" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">贝叶斯统一视角：正则化 = 注入先验知识</text>

      <rect x="40" y="452" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="474" textAnchor="middle" fontSize="11" fill="#475569">L2 = 高斯先验MAP · L1 = 拉普拉斯先验MAP · 早停 ≡ L2 · Dropout ≈ 集成</text>

      <rect x="40" y="494" width="740" height="20" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="508" textAnchor="middle" fontSize="10" fill="#64748b">目标：在训练误差和泛化间隙之间取得平衡</text>
    </svg>
  );
}
