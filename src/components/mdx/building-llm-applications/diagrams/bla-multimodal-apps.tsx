"use client";

export function BlaMultimodalAppsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="多模态应用：图文音视融合架构">
      <defs>
        <linearGradient id="bla-mm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-mm-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-mm-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-mm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bla-mm-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bla-mm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">多模态应用</text>

      {/* 上半部分：四种模态输入 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">多模态输入与编码</text>

      <rect x="40" y="76" width="160" height="90" rx="10" fill="url(#bla-mm-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">文本</text>
      <text x="120" y="118" textAnchor="middle" fontSize="9" fill="#475569">Tokenizer → Embedding</text>
      <text x="120" y="134" textAnchor="middle" fontSize="9" fill="#64748b">GPT / Claude / LLaMA</text>
      <text x="120" y="150" textAnchor="middle" fontSize="9" fill="#64748b">文本理解与生成</text>

      <rect x="220" y="76" width="160" height="90" rx="10" fill="url(#bla-mm-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">图像</text>
      <text x="300" y="118" textAnchor="middle" fontSize="9" fill="#475569">ViT / CLIP 编码</text>
      <text x="300" y="134" textAnchor="middle" fontSize="9" fill="#64748b">GPT-4V / LLaVA</text>
      <text x="300" y="150" textAnchor="middle" fontSize="9" fill="#64748b">图像理解与描述</text>

      <rect x="400" y="76" width="160" height="90" rx="10" fill="url(#bla-mm-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="480" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">音频</text>
      <text x="480" y="118" textAnchor="middle" fontSize="9" fill="#475569">Whisper / Audio编码</text>
      <text x="480" y="134" textAnchor="middle" fontSize="9" fill="#64748b">语音识别与合成</text>
      <text x="480" y="150" textAnchor="middle" fontSize="9" fill="#64748b">语音助手</text>

      <rect x="580" y="76" width="160" height="90" rx="10" fill="url(#bla-mm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">视频</text>
      <text x="660" y="118" textAnchor="middle" fontSize="9" fill="#475569">帧采样 + 时序编码</text>
      <text x="660" y="134" textAnchor="middle" fontSize="9" fill="#64748b">视频理解与摘要</text>
      <text x="660" y="150" textAnchor="middle" fontSize="9" fill="#64748b">视频问答</text>

      {/* 箭头汇聚到融合层 */}
      <path d="M120 170 L120 186 L400 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#bla-mm-arrow)" />
      <path d="M300 170 L300 186 L400 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#bla-mm-arrow)" />
      <path d="M480 170 L480 186 L400 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#bla-mm-arrow)" />
      <path d="M660 170 L660 186 L400 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#bla-mm-arrow)" />

      {/* 融合层 */}
      <rect x="200" y="206" width="400" height="70" rx="12" fill="url(#bla-mm-red)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="232" textAnchor="middle" fontSize="14" fontWeight="700" fill="#991b1b">多模态融合层</text>
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#475569">跨模态对齐 → 联合表示 → 统一推理</text>
      <text x="400" y="268" textAnchor="middle" fontSize="9" fill="#64748b">Cross-Attention / 投影层 / 共享嵌入空间</text>

      <path d="M400 280 L400 296" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-mm-arrow)" />

      {/* 多模态 LLM */}
      <rect x="250" y="300" width="300" height="60" rx="12" fill="url(#bla-mm-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">多模态 LLM</text>
      <text x="400" y="346" textAnchor="middle" fontSize="10" fill="#475569">GPT-4V / Gemini / LLaVA / Qwen-VL</text>

      <path d="M400 362 L400 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-mm-arrow)" />

      {/* 输出层 */}
      <rect x="200" y="382" width="400" height="50" rx="10" fill="url(#bla-mm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="404" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">多模态输出</text>
      <text x="400" y="422" textAnchor="middle" fontSize="10" fill="#475569">文本回答 / 图像生成 / 语音合成 / 结构化数据</text>

      {/* 下半部分：应用场景 */}
      <text x="400" y="458" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">典型应用场景</text>

      <rect x="30" y="472" width="148" height="76" rx="8" fill="url(#bla-mm-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="104" y="494" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">图文问答</text>
      <text x="104" y="512" textAnchor="middle" fontSize="9" fill="#475569">上传图片提问</text>
      <text x="104" y="528" textAnchor="middle" fontSize="9" fill="#64748b">文档理解</text>
      <text x="104" y="542" textAnchor="middle" fontSize="9" fill="#64748b">图表分析</text>

      <rect x="194" y="472" width="148" height="76" rx="8" fill="url(#bla-mm-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="268" y="494" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">语音助手</text>
      <text x="268" y="512" textAnchor="middle" fontSize="9" fill="#475569">语音对话</text>
      <text x="268" y="528" textAnchor="middle" fontSize="9" fill="#64748b">实时翻译</text>
      <text x="268" y="542" textAnchor="middle" fontSize="9" fill="#64748b">会议纪要</text>

      <rect x="358" y="472" width="148" height="76" rx="8" fill="url(#bla-mm-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="432" y="494" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">视频理解</text>
      <text x="432" y="512" textAnchor="middle" fontSize="9" fill="#475569">视频摘要</text>
      <text x="432" y="528" textAnchor="middle" fontSize="9" fill="#64748b">内容审核</text>
      <text x="432" y="542" textAnchor="middle" fontSize="9" fill="#64748b">监控分析</text>

      <rect x="522" y="472" width="148" height="76" rx="8" fill="url(#bla-mm-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="596" y="494" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">内容生成</text>
      <text x="596" y="512" textAnchor="middle" fontSize="9" fill="#475569">文生图 / 图生文</text>
      <text x="596" y="528" textAnchor="middle" fontSize="9" fill="#64748b">多模态创作</text>
      <text x="596" y="542" textAnchor="middle" fontSize="9" fill="#64748b">营销素材</text>
    </svg>
  );
}
