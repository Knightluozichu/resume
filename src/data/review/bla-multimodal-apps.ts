import type { ReviewQuestion } from "./types";

export const blaMultimodalAppsQuestions: ReviewQuestion[] = [
  {
    id: "bla-multimodal-apps-1",
    chapter: "bla-multimodal-apps",
    level: 1,
    question: "多模态应用的四种输入模态分别用什么方式编码？",
    answer:
      "四种模态的编码方式：①文本——用Tokenizer将文本切分为token，再通过Embedding层转为向量表示。代表模型：GPT/Claude/LLaMA。Tokenizer（如BPE/WordPiece）将文本转为token ID序列，Embedding层将ID映射为稠密向量。②图像——用ViT（Vision Transformer）或CLIP编码器将图像转为向量序列。ViT将图像切分为patch（如16×16像素），每个patch经线性投影后作为token输入Transformer。CLIP通过对比学习将图像和文本映射到统一空间。代表模型：GPT-4V/LLaVA。③音频——用Whisper等音频编码器将音频转为向量。Whisper用Log-Mel频谱图作为输入，通过Encoder-Decoder架构处理。音频编码后可作为token序列输入LLM。代表模型：Whisper/Audio LLM。④视频——通过帧采样从视频中提取关键帧，每帧用图像编码器处理，再用时序编码（如3D注意力或位置编码）捕捉帧间时序关系。代表模型：Video-LLaVA/Qwen-VL。四种模态编码后都映射到统一的嵌入空间，供多模态LLM进行跨模态推理。",
    tags: ["多模态", "编码方式", "文本", "图像", "音频", "视频"],
  },
  {
    id: "bla-multimodal-apps-2",
    chapter: "bla-multimodal-apps",
    level: 2,
    question: "多模态融合层的作用是什么？跨模态对齐是如何实现的？",
    answer:
      "多模态融合层是多模态应用的核心，负责将不同模态的表示对齐到统一语义空间。作用：①统一表示——将文本、图像、音频等不同模态的编码映射到相同维度的向量空间，使LLM能在统一空间中处理多模态输入。②跨模态理解——让模型理解图像内容与文本描述的对应关系，如「图中的猫」对应文本中的「cat」。③信息融合——将多模态信息组合为连贯的上下文，供LLM推理生成。跨模态对齐实现方式：①投影层——将各模态编码器的输出通过线性投影层映射到与文本嵌入相同的维度空间。如LLaVA用一个MLP将ViT的图像特征投影到LLM的词嵌入空间。②Cross-Attention——用跨模态注意力机制让不同模态的特征交互。文本token可以attend到图像token，反之亦然，实现信息融合。③对比学习预训练——如CLIP用对比学习在图文对上训练，使相关图文在向量空间中距离更近。④共享嵌入空间——所有模态在统一空间中表示，LLM可以像处理文本token一样处理图像token，实现跨模态推理。",
    tags: ["融合层", "跨模态对齐", "Cross-Attention", "投影层"],
  },
  {
    id: "bla-multimodal-apps-3",
    chapter: "bla-multimodal-apps",
    level: 2,
    question: "GPT-4V、LLaVA、CLIP 各有什么特点？分别适合什么场景？",
    answer:
      "三个多模态模型对比：①GPT-4V——OpenAI闭源最强多模态模型。特点：图文理解能力最强、支持复杂视觉推理、文档分析能力强、支持图像中文字识别（OCR）。缺点：闭源API调用、成本高、数据出域。适合：对能力要求极致的场景、复杂图文问答、文档理解、图表分析。②LLaVA——开源多模态模型。特点：基于LLaMA+ViT、用投影层连接视觉编码器和语言模型、开源可私有化部署、支持图像理解和视觉问答。缺点：能力不及GPT-4V、复杂推理较弱。适合：需要私有化部署的场景、成本敏感的项目、图像描述和简单视觉问答。③CLIP——OpenAI对比学习模型。特点：用对比学习在图文对上训练、将图像和文本映射到统一向量空间、支持零样本分类、图文匹配。缺点：只能做匹配/分类、不能生成文本、不能做复杂推理。适合：图文匹配、零样本图像分类、作为多模态系统的检索组件（如用CLIP检索相关图像）。选择建议：能力优先用GPT-4V；私有化部署用LLaVA；图文匹配/分类用CLIP。实际项目中可组合使用，如用CLIP做图像检索、LLaVA做图像理解。",
    tags: ["GPT-4V", "LLaVA", "CLIP", "模型对比"],
  },
  {
    id: "bla-multimodal-apps-4",
    chapter: "bla-multimodal-apps",
    level: 3,
    question: "构建多模态应用时面临哪些核心挑战？如何应对？",
    answer:
      "多模态应用四大核心挑战及应对：①模态对齐——不同模态的语义空间差异大，对齐质量决定跨模态理解能力。应对：用预训练的投影层（如LLaVA的MLP）做模态映射；用Cross-Attention做跨模态交互；用对比学习预训练（CLIP方式）增强对齐质量；用高质量多模态数据微调。②计算成本——图像和视频的token消耗远高于文本。一张图像可能消耗数百至上千token，视频更甚。应对：图像压缩和分辨率控制（降低输入分辨率）；帧采样优化（减少视频帧数）；模型路由（简单任务用小模型）；缓存常见图像分析结果。③延迟——多模态编码增加处理延迟，影响实时性。应对：异步预处理（提前编码缓存）；流式输出（token级返回降低首字延迟）；边缘部署（模型部署在离用户更近的节点）。④数据质量——多模态训练数据稀缺，高质量图文对是瓶颈。应对：用合成数据增强（如用DALL-E生成图文对）；数据增强（图像变换、裁剪）；迁移学习（从大规模预训练模型迁移）；人在回路标注（提高数据质量）。额外挑战：安全性（图像可能含恶意内容）、隐私（图像可能含人脸/敏感信息）——需输入过滤和内容审核。",
    tags: ["多模态挑战", "模态对齐", "计算成本", "延迟优化", "数据质量"],
  },
];
