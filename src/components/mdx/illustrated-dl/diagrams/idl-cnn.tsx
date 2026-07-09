"use client";

export function IdlCnnDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="卷积神经网络结构与卷积操作">
      <defs>
        <linearGradient id="idl-cnn-conv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-cnn-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="idl-cnn-fc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="idl-cnn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">CNN 结构与卷积操作</text>

      {/* 上半部分：CNN 整体架构 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">典型 CNN 架构</text>

      {/* 输入图像 */}
      <rect x="30" y="75" width="80" height="80" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="70" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">输入</text>
      <text x="70" y="128" textAnchor="middle" fontSize="10" fill="#475569">224x224x3</text>

      <line x1="110" y1="115" x2="150" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />

      {/* Conv1 + Pool1 */}
      <rect x="150" y="80" width="70" height="70" rx="6" fill="url(#idl-cnn-conv)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="185" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">Conv1</text>
      <text x="185" y="124" textAnchor="middle" fontSize="9" fill="#475569">3x3, 32</text>
      <rect x="230" y="85" width="55" height="60" rx="6" fill="url(#idl-cnn-pool)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="257" y="110" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">Pool</text>
      <text x="257" y="126" textAnchor="middle" fontSize="8" fill="#475569">2x2</text>

      <line x1="285" y1="115" x2="315" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />

      {/* Conv2 + Pool2 */}
      <rect x="315" y="85" width="60" height="60" rx="6" fill="url(#idl-cnn-conv)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="345" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">Conv2</text>
      <text x="345" y="124" textAnchor="middle" fontSize="9" fill="#475569">3x3, 64</text>
      <rect x="385" y="90" width="50" height="50" rx="6" fill="url(#idl-cnn-pool)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="410" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">Pool</text>

      <line x1="435" y1="115" x2="465" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />

      {/* Conv3 */}
      <rect x="465" y="92" width="50" height="46" rx="6" fill="url(#idl-cnn-conv)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="490" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">Conv3</text>
      <text x="490" y="126" textAnchor="middle" fontSize="8" fill="#475569">128</text>

      <line x1="515" y1="115" x2="545" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />

      {/* Flatten + FC */}
      <rect x="545" y="85" width="60" height="60" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="575" y="108" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">Flatten</text>
      <text x="575" y="124" textAnchor="middle" fontSize="8" fill="#64748b">展平</text>

      <line x1="605" y1="115" x2="635" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />

      <rect x="635" y="85" width="60" height="60" rx="6" fill="url(#idl-cnn-fc)" opacity="0.2" stroke="#059669" strokeWidth="2" />
      <text x="665" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">FC</text>
      <text x="665" y="124" textAnchor="middle" fontSize="9" fill="#065f46">全连接</text>

      <line x1="695" y1="115" x2="725" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />

      <rect x="725" y="90" width="50" height="50" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
      <text x="750" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">输出</text>
      <text x="750" y="126" textAnchor="middle" fontSize="8" fill="#065f46">分类</text>

      {/* 下半部分：卷积操作详解 */}
      <text x="400" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">卷积操作详解</text>

      {/* 输入特征图 */}
      <text x="120" y="215" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">输入特征图 (5x5)</text>
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <rect key={`input-${i}-${j}`} x={70 + j * 22} y={225 + i * 22} width="22" height="22" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        ))
      )}
      {/* 高亮 3x3 窗口 */}
      <rect x="70" y="225" width="66" height="66" fill="none" stroke="#dc2626" strokeWidth="2.5" />

      {/* 卷积核 */}
      <text x="330" y="215" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">卷积核 (3x3)</text>
      {Array.from({ length: 3 }).map((_, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <rect key={`kernel-${i}-${j}`} x={300 + j * 28} y={235 + i * 28} width="28" height="28" fill="url(#idl-cnn-conv)" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
        ))
      )}
      <text x="314" y="253" textAnchor="middle" fontSize="9" fill="#1e40af">1</text>
      <text x="342" y="253" textAnchor="middle" fontSize="9" fill="#1e40af">0</text>
      <text x="370" y="253" textAnchor="middle" fontSize="9" fill="#1e40af">1</text>
      <text x="314" y="281" textAnchor="middle" fontSize="9" fill="#1e40af">0</text>
      <text x="342" y="281" textAnchor="middle" fontSize="9" fill="#1e40af">1</text>
      <text x="370" y="281" textAnchor="middle" fontSize="9" fill="#1e40af">0</text>
      <text x="314" y="309" textAnchor="middle" fontSize="9" fill="#1e40af">1</text>
      <text x="342" y="309" textAnchor="middle" fontSize="9" fill="#1e40af">0</text>
      <text x="370" y="309" textAnchor="middle" fontSize="9" fill="#1e40af">1</text>

      {/* 箭头 */}
      <line x1="400" y1="270" x2="450" y2="270" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-cnn-arrow)" />
      <text x="425" y="260" textAnchor="middle" fontSize="9" fill="#64748b">滑动窗口</text>
      <text x="425" y="285" textAnchor="middle" fontSize="9" fill="#64748b">逐元素乘加</text>

      {/* 输出特征图 */}
      <text x="560" y="215" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">输出特征图 (3x3)</text>
      {Array.from({ length: 3 }).map((_, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <rect key={`output-${i}-${j}`} x={520 + j * 28} y={235 + i * 28} width="28" height="28" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
        ))
      )}
      <rect x="520" y="235" width="28" height="28" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <text x="534" y="253" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">4</text>

      {/* 底部：关键特性 */}
      <rect x="40" y="360" width="720" height="140" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="60" y="386" fontSize="13" fontWeight="700" fill="#334155">CNN 三大核心特性</text>
      <text x="60" y="410" fontSize="12" fill="#2563eb">局部连接：每个神经元只看输入的局部区域（感受野），而非全部像素</text>
      <text x="60" y="432" fontSize="12" fill="#7c3aed">权值共享：同一卷积核在整张图上滑动，大幅减少参数量（vs 全连接）</text>
      <text x="60" y="454" fontSize="12" fill="#f59e0b">平移不变性：特征在图像中位置变化不影响检测结果</text>
      <text x="60" y="478" fontSize="11" fill="#64748b">经典架构：LeNet（1998）→ AlexNet（2012）→ VGG（2014）→ ResNet（2015，残差连接）</text>
    </svg>
  );
}
