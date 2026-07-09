import { ReviewQuestion } from "../types";

export const idlApplicationsQuestions: ReviewQuestion[] = [
  {
    id: "idl-applications-1",
    chapter: "idl-applications",
    level: 1,
    question: "深度学习在计算机视觉领域有哪些主要应用？各自使用什么核心模型？",
    answer:
      "深度学习在 CV 领域的主要应用：①图像分类——给图像分配类别标签。核心模型：ResNet（残差网络，可训练上百层）、ViT（Vision Transformer，将图像分块输入 Transformer）。是 CV 的基础任务，ImageNet 竞赛推动了 DL 发展。②目标检测——在图像中定位并识别多个目标，输出边界框和类别。核心模型：YOLO（You Only Look Once，单阶段检测，速度快适合实时）、Faster R-CNN（两阶段检测，精度高）。应用：自动驾驶、安防监控。③图像分割——对每个像素分类。语义分割（区分类别不区分个体）：U-Net（医学影像）、DeepLab。实例分割（区分同类不同个体）：Mask R-CNN。④人脸识别——识别和验证人脸身份。FaceNet、ArcFace。⑤OCR（光学字符识别）——从图像中提取文字。CRNN+CTC、Transformer。⑥医学影像——辅助诊断。CNN 分类病灶、U-Net 分割器官。⑦图像生成——StyleGAN 生成逼真人脸、Diffusion 生成艺术图。CV 的统一趋势：Transformer 架构（ViT/DETR）正在逐步替代 CNN 在部分任务上的主导地位。",
    tags: ["计算机视觉", "图像分类", "目标检测", "图像分割", "CNN", "ViT"],
  },
  {
    id: "idl-applications-2",
    chapter: "idl-applications",
    level: 2,
    question: "Transformer 架构为什么能统一 NLP 领域？它相比 RNN 有什么优势？",
    answer:
      "Transformer 能统一 NLP 的原因：①自注意力机制——允许序列中任意两个位置直接交互，不受距离限制。RNN 需要逐个时间步处理，长距离依赖通过隐藏状态传递容易遗忘；Transformer 的自注意力让远处的词直接「看到」彼此，彻底解决了长距离依赖问题。②并行计算——RNN 必须按时间步顺序计算（h_t 依赖 h_{t-1}），无法并行；Transformer 所有位置同时计算注意力，充分利用 GPU 并行能力，训练速度大幅提升。③预训练范式——Transformer 的结构适合大规模预训练：BERT（双向编码器）用掩码语言模型预训练，GPT（单向解码器）用自回归预训练。预训练+微调范式使模型先在海量文本上学习通用语言知识，再在下游任务上微调，大幅降低了对标注数据的需求。④可扩展性——Transformer 的表现随参数量和数据量持续提升（Scaling Law），从 BERT-base（1.1 亿参数）到 GPT-4（万亿参数），性能不断提升，催生了大语言模型时代。⑤跨任务通用——同一 Transformer 架构通过不同的输入输出方式，可以处理翻译、分类、生成、问答、摘要等几乎所有 NLP 任务，真正实现了架构统一。Transformer 的影响力已超越 NLP，在 CV（ViT）、语音（Whisper）、多模态（CLIP）等领域也取得成功。",
    tags: ["Transformer", "自注意力", "并行计算", "预训练", "BERT", "GPT", "NLP"],
  },
  {
    id: "idl-applications-3",
    chapter: "idl-applications",
    level: 2,
    question: "深度学习在语音识别中的应用流程是怎样的？Whisper 等模型有什么创新？",
    answer:
      "语音识别（ASR）的传统流程：①音频采集——采样率通常 16kHz，得到时域波形。②特征提取——将波形转化为频域特征，常用 MFCC（梅尔频率倒谱系数）或 Mel 频谱图，将音频转化为类似图像的 2D 时频表示。③声学模型——将声学特征映射到音素/字符概率。传统用 HMM-GMM，深度学习用 RNN/LSTM/Transformer。④语言模型——对识别结果做语言层面纠错和优化，提升可读性。⑤解码——结合声学模型和语言模型，搜索最可能的文本序列。深度学习的创新：①端到端模型——传统流程分多个模块分别训练，端到端模型直接从音频波形/频谱映射到文本，简化流程、联合优化。②CTC（连接时序分类）——解决音频帧与字符对齐问题，允许没有帧级标注。③Attention 机制——Listen-Attend-Spell 等架构用注意力对齐音频和文本。Whisper 的创新：①大规模弱监督训练——用 68 万小时多语言互联网音频数据训练，覆盖 99 种语言，无需人工标注，利用现有字幕作为弱标签。②多任务统一——一个模型同时做转录、翻译（多语言→英文）、语言识别、时间戳预测，无需为每个任务单独训练。③Zero-shot 能力——无需微调即可在新语言和新领域上工作，得益于大规模预训练的泛化能力。④Transformer 架构——编码器-解码器结构，编码器处理音频 Mel 频谱图，解码器自回归生成文本。",
    tags: ["语音识别", "ASR", "Whisper", "端到端", "CTC", "Mel频谱图"],
  },
  {
    id: "idl-applications-4",
    chapter: "idl-applications",
    level: 3,
    question: "大语言模型（LLM）和多模态模型的发展趋势是什么？它们如何改变深度学习的应用格局？",
    answer:
      "大语言模型（LLM）发展趋势：①规模化——模型参数从亿级到万亿级（GPT-4），训练数据从 GB 到 TB 级互联网文本。Scaling Law 表明模型能力随参数量、数据量、算力持续提升。②涌现能力——模型规模超过一定阈值后，出现小模型没有的能力（如少样本学习、思维链推理、代码生成）。③指令微调+RLHF——通过人类反馈强化学习对齐模型行为，使输出更符合人类价值观和意图。④工具使用——LLM 能调用外部工具（搜索引擎、代码解释器、API），扩展能力边界。多模态模型趋势：①统一架构——用 Transformer 同时处理文本、图像、音频等多种模态。如 CLIP（图文对比学习）、GPT-4V（图文理解）。②任意模态转换——从「文生图」（Stable Diffusion）到「文生视频」（Sora）到「图生文」（图像描述），模态壁垒被打破。③原生多模态——不再用单独的编码器处理不同模态，而是将所有模态统一为 token 序列输入同一模型（如 Gemini）。对应用格局的改变：①从任务专用到通用基础模型——过去每个任务训练一个专用模型，现在用一个 LLM 通过 prompt/微调处理多种任务，大幅降低开发成本。②从判别到生成——模型不再只做分类预测，而是能创造新内容（文本、图像、代码、视频），催生 AIGC 产业。③人机交互变革——自然语言成为编程接口，「用自然语言编程」成为现实。④AI Agent——LLM 作为大脑，结合工具调用和规划能力，实现自主完成复杂任务。挑战：幻觉问题、计算成本、数据隐私、版权伦理、可解释性。",
    tags: ["大语言模型", "LLM", "多模态", "Scaling Law", "RLHF", "AIGC", "AI Agent"],
  },
];
