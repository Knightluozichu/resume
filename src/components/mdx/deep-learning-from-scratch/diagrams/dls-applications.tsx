"use client";

export function DlsApplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="深度学习应用场景全景">
      <defs>
        <linearGradient id="dls-app-cnn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-app-rnn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-app-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dls-app-viz" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dls-app-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习应用：从图像到生成</text>

      {/* 第一行：CNN 系列 */}
      <text x="190" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">CNN 应用系列</text>

      <rect x="60" y="84" width="140" height="56" rx="8" fill="url(#dls-app-cnn)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">图像分类</text>
      <text x="130" y="126" textAnchor="middle" fontSize="9" fill="#475569">VGG / ResNet</text>

      <rect x="220" y="84" width="140" height="56" rx="8" fill="url(#dls-app-cnn)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="290" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">目标检测</text>
      <text x="290" y="126" textAnchor="middle" fontSize="9" fill="#475569">R-CNN / YOLO</text>

      <rect x="60" y="148" width="140" height="56" rx="8" fill="url(#dls-app-cnn)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">语义分割</text>
      <text x="130" y="190" textAnchor="middle" fontSize="9" fill="#475569">FCN / U-Net</text>

      <rect x="220" y="148" width="140" height="56" rx="8" fill="url(#dls-app-cnn)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="290" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">实例分割</text>
      <text x="290" y="190" textAnchor="middle" fontSize="9" fill="#475569">Mask R-CNN</text>

      {/* 第二行：序列/生成 */}
      <text x="560" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">序列与生成</text>

      <rect x="440" y="84" width="140" height="56" rx="8" fill="url(#dls-app-rnn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="510" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">RNN / LSTM</text>
      <text x="510" y="126" textAnchor="middle" fontSize="9" fill="#475569">时序 / 文本</text>

      <rect x="600" y="84" width="140" height="56" rx="8" fill="url(#dls-app-rnn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="670" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">NLP</text>
      <text x="670" y="126" textAnchor="middle" fontSize="9" fill="#475569">机器翻译 / 对话</text>

      <rect x="440" y="148" width="140" height="56" rx="8" fill="url(#dls-app-gen)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="510" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">GAN</text>
      <text x="510" y="190" textAnchor="middle" fontSize="9" fill="#475569">生成对抗网络</text>

      <rect x="600" y="148" width="140" height="56" rx="8" fill="url(#dls-app-gen)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">AutoEncoder</text>
      <text x="670" y="190" textAnchor="middle" fontSize="9" fill="#475569">VAE / 压缩表示</text>

      {/* 可视化 */}
      <text x="400" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">CNN 可视化技术</text>

      <rect x="60" y="252" width="160" height="56" rx="8" fill="url(#dls-app-viz)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="140" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">第一层滤波器</text>
      <text x="140" y="294" textAnchor="middle" fontSize="9" fill="#475569">学习边缘/纹理</text>

      <rect x="240" y="252" width="160" height="56" rx="8" fill="url(#dls-app-viz)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="320" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">特征图可视化</text>
      <text x="320" y="294" textAnchor="middle" fontSize="9" fill="#475569">各通道响应</text>

      <rect x="420" y="252" width="160" height="56" rx="8" fill="url(#dls-app-viz)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">梯度可视化</text>
      <text x="500" y="294" textAnchor="middle" fontSize="9" fill="#475569">输入对输出影响</text>

      <rect x="600" y="252" width="160" height="56" rx="8" fill="url(#dls-app-viz)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="680" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">Grad-CAM</text>
      <text x="680" y="294" textAnchor="middle" fontSize="9" fill="#475569">类别热力图</text>

      {/* 深度学习前沿 */}
      <rect x="60" y="330" width="700" height="50" rx="10" fill="#7c3aed" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">深度学习前沿趋势</text>
      <text x="410" y="370" textAnchor="middle" fontSize="10" fill="#475569">更深网络（ResNet残差连接）· 注意力机制（Transformer）· 自监督学习 · 扩散模型</text>

      <rect x="60" y="398" width="340" height="50" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="230" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">残差连接（Skip Connection）</text>
      <text x="230" y="438" textAnchor="middle" fontSize="10" fill="#475569">解决深层网络梯度消失：H(x) = F(x) + x</text>

      <rect x="420" y="398" width="340" height="50" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">数据增强</text>
      <text x="590" y="438" textAnchor="middle" fontSize="10" fill="#475569">翻转 / 裁剪 / 旋转 / 颜色变换 → 提升泛化</text>

      <rect x="60" y="462" width="700" height="30" rx="8" fill="url(#dls-app-cnn)" opacity="0.95" />
      <text x="410" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">从分类到检测到生成，CNN 是计算机视觉的基石</text>
    </svg>
  );
}
