"use client";

export function IdlFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="图解深度学习全书知识整合图">
      <defs>
        <linearGradient id="idl-fr-foundation" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="idl-fr-advanced" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="idl-fr-practice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="idl-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合图</text>

      {/* 第一层：基础（ch1-ch3） */}
      <rect x="40" y="55" width="720" height="80" rx="10" fill="url(#idl-fr-foundation)" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
      <text x="60" y="78" fontSize="13" fontWeight="700" fill="#1e40af">基础层（ch1-ch3）</text>

      <rect x="60" y="88" width="180" height="38" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">ch1 神经网络基础</text>

      <rect x="270" y="88" width="180" height="38" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="360" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">ch2 前向传播</text>

      <rect x="480" y="88" width="180" height="38" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="570" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">ch3 反向传播</text>

      <line x1="400" y1="135" x2="400" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fr-arrow)" />

      {/* 第二层：核心网络（ch4-ch5） */}
      <rect x="40" y="155" width="720" height="80" rx="10" fill="url(#idl-fr-core)" opacity="0.1" stroke="#7c3aed" strokeWidth="2" />
      <text x="60" y="178" fontSize="13" fontWeight="700" fill="#5b21b6">核心网络层（ch4-ch5）</text>

      <rect x="140" y="188" width="220" height="38" rx="6" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="250" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">ch4 CNN：卷积/池化/经典架构</text>

      <rect x="440" y="188" width="220" height="38" rx="6" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="550" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">ch5 RNN：LSTM/GRU/序列建模</text>

      <line x1="400" y1="235" x2="400" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fr-arrow)" />

      {/* 第三层：进阶（ch6-ch7） */}
      <rect x="40" y="255" width="720" height="80" rx="10" fill="url(#idl-fr-advanced)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <text x="60" y="278" fontSize="13" fontWeight="700" fill="#92400e">进阶层（ch6-ch7）</text>

      <rect x="140" y="288" width="220" height="38" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="250" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">ch6 正则化与优化</text>

      <rect x="440" y="288" width="220" height="38" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="550" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">ch7 生成模型与自编码器</text>

      <line x1="400" y1="335" x2="400" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fr-arrow)" />

      {/* 第四层：实践（ch8-ch9） */}
      <rect x="40" y="355" width="720" height="80" rx="10" fill="url(#idl-fr-practice)" opacity="0.1" stroke="#059669" strokeWidth="2" />
      <text x="60" y="378" fontSize="13" fontWeight="700" fill="#065f46">实践与整合层（ch8-ch9）</text>

      <rect x="140" y="388" width="220" height="38" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="250" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">ch8 深度学习应用实践</text>

      <rect x="440" y="388" width="220" height="38" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="550" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">ch9 全书复习与知识整合</text>

      {/* 底部：知识链路总结 */}
      <rect x="40" y="455" width="720" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="60" y="480" fontSize="13" fontWeight="700" fill="#0f172a">核心知识链路</text>
      <text x="60" y="502" fontSize="11" fill="#2563eb">基础：感知机 → 前向传播（线性+激活） → 反向传播（链式法则+梯度下降）</text>
      <text x="60" y="520" fontSize="11" fill="#7c3aed">网络：CNN（空间特征） + RNN（时序特征） → 正则化（泛化） + 生成模型（创造）</text>
      <text x="60" y="538" fontSize="11" fill="#059669">应用：CV / NLP / 语音 → Transformer 统一架构 → 大模型与多模态</text>
    </svg>
  );
}
