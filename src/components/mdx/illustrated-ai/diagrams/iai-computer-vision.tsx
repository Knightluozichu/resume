"use client";

export function IaiComputerVisionDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="计算机视觉任务与CNN结构图">
      <defs>
        <linearGradient id="iai-cv-conv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-cv-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-cv-fc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-cv-task" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-cv-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">计算机视觉：让机器看懂世界</text>

      {/* CNN 结构图 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">卷积神经网络（CNN）结构</text>

      {/* 输入图像 */}
      <rect x="30" y="80" width="80" height="80" rx="6" fill="url(#iai-cv-conv)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="70" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">输入</text>
      <text x="70" y="116" textAnchor="middle" fontSize="9" fill="#64748b">224x224</text>
      <text x="70" y="130" textAnchor="middle" fontSize="9" fill="#64748b">x3 (RGB)</text>

      <path d="M110 120 L130 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-cv-arrow)" />

      {/* 卷积层 */}
      <rect x="130" y="80" width="100" height="80" rx="6" fill="url(#iai-cv-conv)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="180" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">卷积层</text>
      <text x="180" y="116" textAnchor="middle" fontSize="9" fill="#64748b">Conv + ReLU</text>
      <text x="180" y="130" textAnchor="middle" fontSize="9" fill="#64748b">局部感知</text>
      <text x="180" y="144" textAnchor="middle" fontSize="9" fill="#64748b">权值共享</text>

      <path d="M230 120 L250 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-cv-arrow)" />

      {/* 池化层 */}
      <rect x="250" y="80" width="100" height="80" rx="6" fill="url(#iai-cv-pool)" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">池化层</text>
      <text x="300" y="116" textAnchor="middle" fontSize="9" fill="#64748b">Max / Avg Pool</text>
      <text x="300" y="130" textAnchor="middle" fontSize="9" fill="#64748b">降维</text>
      <text x="300" y="144" textAnchor="middle" fontSize="9" fill="#64748b">平移不变</text>

      <path d="M350 120 L370 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-cv-arrow)" />

      {/* 卷积+池化堆叠 */}
      <rect x="370" y="80" width="100" height="80" rx="6" fill="url(#iai-cv-conv)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="420" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Conv+Pool</text>
      <text x="420" y="116" textAnchor="middle" fontSize="9" fill="#64748b">多层堆叠</text>
      <text x="420" y="130" textAnchor="middle" fontSize="9" fill="#64748b">特征提取</text>
      <text x="420" y="144" textAnchor="middle" fontSize="9" fill="#64748b">由浅到深</text>

      <path d="M470 120 L490 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-cv-arrow)" />

      {/* 全连接层 */}
      <rect x="490" y="80" width="100" height="80" rx="6" fill="url(#iai-cv-fc)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="540" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">全连接层</text>
      <text x="540" y="116" textAnchor="middle" fontSize="9" fill="#64748b">Flatten + FC</text>
      <text x="540" y="130" textAnchor="middle" fontSize="9" fill="#64748b">特征整合</text>
      <text x="540" y="144" textAnchor="middle" fontSize="9" fill="#64748b">分类决策</text>

      <path d="M590 120 L610 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-cv-arrow)" />

      {/* 输出 */}
      <rect x="610" y="80" width="100" height="80" rx="6" fill="url(#iai-cv-task)" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">输出</text>
      <text x="660" y="116" textAnchor="middle" fontSize="9" fill="#64748b">Softmax</text>
      <text x="660" y="130" textAnchor="middle" fontSize="9" fill="#64748b">类别概率</text>
      <text x="660" y="144" textAnchor="middle" fontSize="9" fill="#64748b">cat: 0.92</text>

      {/* 三大视觉任务 */}
      <text x="400" y="192" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">计算机视觉三大核心任务</text>

      <rect x="30" y="206" width="240" height="120" rx="10" fill="url(#iai-cv-task)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="150" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">图像分类</text>
      <text x="150" y="250" textAnchor="middle" fontSize="11" fill="#475569">整张图 → 类别标签</text>
      <text x="150" y="268" textAnchor="middle" fontSize="10" fill="#64748b">"这张图里是一只猫"</text>
      <text x="150" y="288" textAnchor="middle" fontSize="10" fill="#64748b">代表：ResNet / VGG / ViT</text>
      <text x="150" y="306" textAnchor="middle" fontSize="10" fill="#64748b">指标：Top-1 / Top-5 准确率</text>

      <rect x="280" y="206" width="240" height="120" rx="10" fill="url(#iai-cv-fc)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">目标检测</text>
      <text x="400" y="250" textAnchor="middle" fontSize="11" fill="#475569">图 → 多个 (类别, 位置框)</text>
      <text x="400" y="268" textAnchor="middle" fontSize="10" fill="#64748b">"左上角有一只猫（0.95）"</text>
      <text x="400" y="288" textAnchor="middle" fontSize="10" fill="#64748b">代表：YOLO / Faster R-CNN</text>
      <text x="400" y="306" textAnchor="middle" fontSize="10" fill="#64748b">指标：mAP（平均精度均值）</text>

      <rect x="530" y="206" width="240" height="120" rx="10" fill="url(#iai-cv-pool)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="650" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">语义分割</text>
      <text x="650" y="250" textAnchor="middle" fontSize="11" fill="#475569">图 → 逐像素类别标签</text>
      <text x="650" y="268" textAnchor="middle" fontSize="10" fill="#64748b">"每个像素属于哪个物体"</text>
      <text x="650" y="288" textAnchor="middle" fontSize="10" fill="#64748b">代表：U-Net / DeepLab</text>
      <text x="650" y="306" textAnchor="middle" fontSize="10" fill="#64748b">指标：IoU（交并比）/ mIoU</text>

      {/* 卷积操作详解 */}
      <rect x="30" y="344" width="370" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="368" fontSize="13" fontWeight="700" fill="#0f172a">卷积操作</text>
      <text x="50" y="390" fontSize="11" fill="#475569">卷积核（filter）在输入上滑动，逐区域做加权求和</text>
      <text x="50" y="408" fontSize="11" fill="#475569">输出特征图 = (W - K + 2P) / S + 1</text>
      <text x="50" y="426" fontSize="11" fill="#64748b">  W=输入尺寸, K=核尺寸, P=填充, S=步长</text>

      {/* 视觉里程碑 */}
      <rect x="420" y="344" width="350" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="368" fontSize="13" fontWeight="700" fill="#0f172a">视觉模型里程碑</text>
      <text x="440" y="390" fontSize="11" fill="#475569">AlexNet (2012)：深度学习引爆 ImageNet</text>
      <text x="440" y="408" fontSize="11" fill="#475569">ResNet (2015)：残差连接训练超深网络</text>
      <text x="440" y="426" fontSize="11" fill="#475569">ViT (2020)：Transformer 迁移到视觉领域</text>

      {/* 数据增强 */}
      <rect x="30" y="460" width="740" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="50" y="484" fontSize="13" fontWeight="700" fill="#92400e">数据增强与迁移学习</text>
      <text x="50" y="506" fontSize="11" fill="#475569">数据增强：翻转 / 裁剪 / 旋转 / 颜色抖动 / Mixup，扩充训练数据提升泛化</text>
      <text x="50" y="524" fontSize="11" fill="#475569">迁移学习：在 ImageNet 预训练模型上微调，少量数据也能获得强性能</text>
    </svg>
  );
}
