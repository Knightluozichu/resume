import type { ReviewQuestion } from "./types";

export const sxxProceduralTexturingQuestions: ReviewQuestion[] = [
  {
    id: "sxx-procedural-texturing-1",
    chapter: "sxx-procedural-texturing",
    level: 1,
    question: `Perlin 噪声和 value noise 的区别是什么？`,
    answer: `Value noise 在格点放随机值再插值，简单但产生明显块状感——格子边界可见。Perlin noise 在格点放梯度向量而非随机值，通过点积（梯度·方向）和平滑插值产生连续过渡，视觉上远优于 value noise，无块状感。Perlin noise 的 fade 函数保证 C2 连续性（一阶和二阶导数连续），是程序化纹理的标准选择。`,
    tags: ["Perlin噪声", "value noise"],
  },
  {
    id: "sxx-procedural-texturing-2",
    chapter: "sxx-procedural-texturing",
    level: 2,
    question: `fBm（分形布朗运动）如何用单层噪声生成分形细节？`,
    answer: `fBm 叠加多层不同频率和振幅的噪声（octaves）。每层频率翻倍（freq *= 2.0）、振幅减半（amp *= 0.5）。公式：value = sum(amp_i * noise(freq_i * p))。频率翻倍添加更细的细节（高频小尺度），振幅减半保证细节贡献随频率递减。模拟自然界分形特征——海岸线从太空和近处看都有曲折但幅度随尺度递减。通常用4-8个octaves。`,
    tags: ["fBm", "分形", "噪声叠加"],
  },
  {
    id: "sxx-procedural-texturing-3",
    chapter: "sxx-procedural-texturing",
    level: 3,
    question: `程序化纹理的无缝 Tiling 问题是什么？有哪些解决方案？`,
    answer: `问题：Perlin/Worley 噪声在大地形上直接使用会产生明显重复图案。解决方案：1) 3D噪声在球面/环面拓扑上采样——数学上保证周期性连续；2) 三角波折叠 UV（abs(frac(uv)-0.5)*2）——四面镜像消除接缝；3) Wang Tile 方法——用少量带边界约束的tile拼接无限大平面。不做Tiling处理的程序化纹理在50米外就能看出重复模式。`,
    tags: ["无缝Tiling", "Wang Tile", "UV折叠"],
  },
  {
    id: "sxx-procedural-texturing-4",
    chapter: "sxx-procedural-texturing",
    level: 4,
    question: `如何用程序化纹理实现地形多层权重混合？需要哪些步骤和参数？`,
    answer: `步骤：1) 用 fBm 生成高度图 height = fbm(uv * scale, octaves)，scale 控制地形频率，octaves 控制细节层次；2) 准备各层纹理颜色（可用程序化噪声或手工贴图）：草地、岩石、雪地等；3) 用 smoothstep 计算权重：w1 = smoothstep(0.3, 0.5, height) 控制草地到岩石过渡，w2 = smoothstep(0.6, 0.8, height) 控制岩石到雪地过渡；4) 多层 lerp 混合：color = lerp(lerp(grass, rock, w1), snow, w2)；5) 每层纹理可叠加独立的噪声细节增加自然感。优势：零贴图内存、无限不重复、高度参数动态可调。关键参数：fBm 的 scale 和 octaves 控制地形形态，smoothstep 的范围控制过渡区域宽度。`,
    tags: ["地形纹理", "权重混合", "smoothstep"],
  },
];
