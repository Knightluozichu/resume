"use client";

export function IdlApplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="深度学习应用领域全景">
      <defs>
        <linearGradient id="idl-app-cv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-app-nlp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="idl-app-speech" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="idl-app-other" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习应用全景</text>

      {/* 中心节点 */}
      <circle cx="400" cy="270" r="55" fill="#0f172a" opacity="0.9" />
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">深度学习</text>
      <text x="400" y="285" textAnchor="middle" fontSize="11" fill="#cbd5e1">核心模型</text>

      {/* 四大应用领域 */}

      {/* 计算机视觉（左上） */}
      <rect x="30" y="65" width="280" height="140" rx="12" fill="url(#idl-app-cv)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="170" y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">计算机视觉（CV）</text>
      <text x="50" y="115" fontSize="11" fill="#475569">图像分类：ResNet / ViT</text>
      <text x="50" y="135" fontSize="11" fill="#475569">目标检测：YOLO / Faster R-CNN</text>
      <text x="50" y="155" fontSize="11" fill="#475569">图像分割：U-Net / Mask R-CNN</text>
      <text x="50" y="175" fontSize="11" fill="#475569">人脸识别 / OCR / 医学影像</text>
      <text x="50" y="195" fontSize="10" fill="#2563eb">核心模型：CNN + Transformer</text>

      <line x1="200" y1="205" x2="360" y2="250" stroke="#2563eb" strokeWidth="2" opacity="0.4" />

      {/* NLP（右上） */}
      <rect x="490" y="65" width="280" height="140" rx="12" fill="url(#idl-app-nlp)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="630" y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">自然语言处理（NLP）</text>
      <text x="510" y="115" fontSize="11" fill="#475569">机器翻译：Seq2Seq / Transformer</text>
      <text x="510" y="135" fontSize="11" fill="#475569">文本生成：GPT / BERT</text>
      <text x="510" y="155" fontSize="11" fill="#475569">情感分析 / 命名实体识别</text>
      <text x="510" y="175" fontSize="11" fill="#475569">问答系统 / 摘要生成</text>
      <text x="510" y="195" fontSize="10" fill="#7c3aed">核心模型：Transformer + 预训练</text>

      <line x1="580" y1="205" x2="440" y2="250" stroke="#7c3aed" strokeWidth="2" opacity="0.4" />

      {/* 语音（左下） */}
      <rect x="30" y="340" width="280" height="140" rx="12" fill="url(#idl-app-speech)" opacity="0.12" stroke="#f59e0b" strokeWidth="2" />
      <text x="170" y="367" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">语音与音频</text>
      <text x="50" y="390" fontSize="11" fill="#475569">语音识别（ASR）：Whisper / Wav2Vec</text>
      <text x="50" y="410" fontSize="11" fill="#475569">语音合成（TTS）：Tacotron / VITS</text>
      <text x="50" y="430" fontSize="11" fill="#475569">声纹识别 / 语音增强</text>
      <text x="50" y="450" fontSize="11" fill="#475569">音乐生成 / 音频分离</text>
      <text x="50" y="470" fontSize="10" fill="#f59e0b">核心模型：RNN + Transformer + 扩散</text>

      <line x1="200" y1="340" x2="360" y2="295" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />

      {/* 其他应用（右下） */}
      <rect x="490" y="340" width="280" height="140" rx="12" fill="url(#idl-app-other)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="630" y="367" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">推荐与其他</text>
      <text x="510" y="390" fontSize="11" fill="#475569">推荐系统：DeepFM / Wide&amp;Deep</text>
      <text x="510" y="410" fontSize="11" fill="#475569">游戏 AI：AlphaGo / AlphaZero</text>
      <text x="510" y="430" fontSize="11" fill="#475569">自动驾驶 / 药物发现</text>
      <text x="510" y="450" fontSize="11" fill="#475569">科学计算 / 天气预测</text>
      <text x="510" y="470" fontSize="10" fill="#059669">核心趋势：大模型 + 多模态</text>

      <line x1="580" y1="340" x2="440" y2="295" stroke="#059669" strokeWidth="2" opacity="0.4" />

      {/* 底部趋势 */}
      <rect x="30" y="495" width="740" height="20" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="510" textAnchor="middle" fontSize="10" fill="#475569">统一趋势：Transformer 架构横跨 CV / NLP / 语音，大模型（LLM）推动多模态融合</text>
    </svg>
  );
}
