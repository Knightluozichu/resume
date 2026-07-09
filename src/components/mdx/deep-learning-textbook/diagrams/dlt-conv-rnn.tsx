"use client";

export function DltConvRnnDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="CNN与RNN核心概念图">
      <defs>
        <linearGradient id="dlt-cr-cnn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-cr-rnn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-cr-lstm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dlt-cr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">CNN与RNN：为数据结构量身定制</text>

      {/* CNN 部分 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">卷积神经网络 CNN</text>
      <text x="200" y="88" textAnchor="middle" fontSize="10" fill="#475569">网格数据 · 图像 · 空间局部性</text>

      {/* 卷积示意 */}
      <rect x="60" y="100" width="60" height="60" rx="4" fill="url(#dlt-cr-cnn)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="90" y="134" textAnchor="middle" fontSize="8" fill="#2563eb">输入</text>
      <rect x="65" y="105" width="20" height="20" rx="2" fill="url(#dlt-cr-cnn)" opacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x="90" y="172" textAnchor="middle" fontSize="7" fill="#64748b">3×3 卷积核滑动</text>

      <text x="140" y="134" fontSize="12" fill="#64748b">→</text>

      <rect x="160" y="100" width="50" height="50" rx="4" fill="url(#dlt-cr-cnn)" opacity="0.25" stroke="#2563eb" strokeWidth="1" />
      <text x="185" y="130" textAnchor="middle" fontSize="8" fill="#2563eb">特征图</text>

      <text x="225" y="134" fontSize="12" fill="#64748b">→</text>

      <rect x="245" y="105" width="40" height="40" rx="4" fill="url(#dlt-cr-cnn)" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
      <text x="265" y="130" textAnchor="middle" fontSize="8" fill="#2563eb">池化</text>

      {/* CNN 三大思想 */}
      <rect x="40" y="180" width="120" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="199" textAnchor="middle" fontSize="9" fill="#1e40af">局部连接</text>
      <rect x="170" y="180" width="120" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="230" y="199" textAnchor="middle" fontSize="9" fill="#1e40af">参数共享</text>
      <rect x="300" y="180" width="100" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="350" y="199" textAnchor="middle" fontSize="9" fill="#1e40af">平移等变</text>

      {/* CNN 架构 */}
      <text x="200" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">经典架构演进</text>
      <rect x="40" y="250" width="360" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="220" y="266" textAnchor="middle" fontSize="9" fill="#475569">LeNet→AlexNet→VGG→GoogLeNet→ResNet(残差)→DenseNet</text>

      {/* RNN 部分 */}
      <text x="600" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">循环神经网络 RNN</text>
      <text x="600" y="88" textAnchor="middle" fontSize="10" fill="#475569">序列数据 · 文本 · 时序依赖</text>

      {/* RNN 展开 */}
      <rect x="460" y="100" width="50" height="36" rx="6" fill="url(#dlt-cr-rnn)" opacity="0.8" />
      <text x="485" y="122" textAnchor="middle" fontSize="9" fill="#fff">h₁</text>
      <rect x="540" y="100" width="50" height="36" rx="6" fill="url(#dlt-cr-rnn)" opacity="0.8" />
      <text x="565" y="122" textAnchor="middle" fontSize="9" fill="#fff">h₂</text>
      <rect x="620" y="100" width="50" height="36" rx="6" fill="url(#dlt-cr-rnn)" opacity="0.8" />
      <text x="645" y="122" textAnchor="middle" fontSize="9" fill="#fff">h₃</text>
      <rect x="700" y="100" width="50" height="36" rx="6" fill="url(#dlt-cr-rnn)" opacity="0.8" />
      <text x="725" y="122" textAnchor="middle" fontSize="9" fill="#fff">h_T</text>

      <path d="M510 118 L540 118" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlt-cr-arrow)" />
      <path d="M590 118 L620 118" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlt-cr-arrow)" />
      <path d="M670 118 L700 118" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlt-cr-arrow)" />

      <text x="485" y="152" textAnchor="middle" fontSize="8" fill="#64748b">x₁</text>
      <text x="565" y="152" textAnchor="middle" fontSize="8" fill="#64748b">x₂</text>
      <text x="645" y="152" textAnchor="middle" fontSize="8" fill="#64748b">x₃</text>
      <text x="725" y="152" textAnchor="middle" fontSize="8" fill="#64748b">x_T</text>

      <text x="600" y="172" textAnchor="middle" fontSize="8" fill="#5b21b6">h(t)=tanh(W_hh·h(t-1)+W_xh·x(t)+b)</text>

      {/* RNN 问题 */}
      <rect x="440" y="180" width="160" height="30" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="520" y="199" textAnchor="middle" fontSize="9" fill="#991b1b">梯度消失(长程依赖丢失)</text>
      <rect x="610" y="180" width="150" height="30" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="685" y="199" textAnchor="middle" fontSize="9" fill="#991b1b">梯度爆炸</text>

      {/* LSTM */}
      <text x="600" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">LSTM 门控解决梯度消失</text>

      <rect x="440" y="250" width="80" height="28" rx="6" fill="url(#dlt-cr-lstm)" opacity="0.7" />
      <text x="480" y="268" textAnchor="middle" fontSize="8" fill="#fff">遗忘门 f</text>
      <rect x="530" y="250" width="80" height="28" rx="6" fill="url(#dlt-cr-lstm)" opacity="0.7" />
      <text x="570" y="268" textAnchor="middle" fontSize="8" fill="#fff">输入门 i</text>
      <rect x="620" y="250" width="80" height="28" rx="6" fill="url(#dlt-cr-lstm)" opacity="0.7" />
      <text x="660" y="268" textAnchor="middle" fontSize="8" fill="#fff">输出门 o</text>
      <rect x="710" y="250" width="50" height="28" rx="6" fill="url(#dlt-cr-lstm)" opacity="0.9" />
      <text x="735" y="268" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff">c=f·c+i·g</text>

      <text x="600" y="296" textAnchor="middle" fontSize="8" fill="#d97706">细胞状态加法更新 → 梯度直接通路 → 缓解梯度消失</text>

      {/* 共同设计哲学 */}
      <rect x="40" y="320" width="720" height="50" rx="10" fill="url(#dlt-cr-cnn)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="400" y="342" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">共同设计哲学</text>
      <text x="400" y="360" textAnchor="middle" fontSize="11" fill="#1e40af">参数共享 + 领域先验 + 层次化/递归结构 = 用结构换效率</text>

      {/* 对比表 */}
      <rect x="40" y="390" width="350" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="215" y="408" textAnchor="middle" fontSize="10" fill="#1e40af">CNN: 空间位置共享权重 · 平移等变</text>
      <rect x="410" y="390" width="350" height="28" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="585" y="408" textAnchor="middle" fontSize="10" fill="#5b21b6">RNN: 时间步共享权重 · 时间不变</text>

      <rect x="40" y="426" width="350" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="215" y="444" textAnchor="middle" fontSize="9" fill="#64748b">适合: 图像/音频频谱/棋盘</text>
      <rect x="410" y="426" width="350" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="585" y="444" textAnchor="middle" fontSize="9" fill="#64748b">适合: 文本/语音/时间序列</text>

      {/* 底部 */}
      <rect x="40" y="470" width="720" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="11" fill="#475569">残差连接 h=F(h)+h · 梯度直接回传 · 训练超深网络(ResNet 152层+)</text>
    </svg>
  );
}
