import type { ReviewQuestion } from "./types";

export const sxxShadowTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "sxx-shadow-techniques-1",
    chapter: "sxx-shadow-techniques",
    level: 1,
    question: `阴影映射的两趟渲染分别做什么？`,
    answer: `第一趟（Shadow Map Pass）：从光源视角渲染场景，只记录每个像素到光源的最近深度，存入 Shadow Map。第二趟（Lighting Pass）：从相机视角渲染，对每个像素计算其在光源空间的深度，与 Shadow Map 比较——如果像素深度更大说明被遮挡，标记为阴影。需要两趟因为 GPU 无法在一次渲染中同时知道光源视角深度和相机视角深度。`,
    tags: ["阴影映射", "两趟渲染"],
  },
  {
    id: "sxx-shadow-techniques-2",
    chapter: "sxx-shadow-techniques",
    level: 2,
    question: `什么是阴影痤疮和彼得潘宁？如何通过偏移解决？`,
    answer: `阴影痤疮：深度精度不足导致表面出现条纹状自阴影。彼得潘宁：偏移过大导致阴影与物体底部脱离。解决方法：增加 bias 使像素深度减去小值再比较。关键是使用斜率相关偏移 bias = baseBias * (1 - N·L)——面与光线越平行偏移越大。bias 太小痤疮不消失，太大产生彼得潘宁，需找到平衡点。配合正面剔除渲染 Shadow Map 可进一步减少痤疮。`,
    tags: ["阴影痤疮", "彼得潘宁", "bias"],
  },
  {
    id: "sxx-shadow-techniques-3",
    chapter: "sxx-shadow-techniques",
    level: 3,
    question: `CSM（级联阴影映射）解决什么问题？如何工作？`,
    answer: `CSM 解决单张 Shadow Map 分辨率不足的问题——大场景中一张 Shadow Map 覆盖整个视锥，近处分辨率不够导致阴影锯齿。CSM 将视锥按距离分成多个级别（3-5级），每级用独立的高分辨率 Shadow Map：近处小范围高精度（清晰），远处大范围低精度（模糊但视觉影响小）。渲染时根据像素深度选择对应级别 Shadow Map，在级联边界做平滑过渡避免硬切。CSM 是现代引擎标准阴影方案。`,
    tags: ["CSM", "级联阴影", "视锥分割"],
  },
  {
    id: "sxx-shadow-techniques-4",
    chapter: "sxx-shadow-techniques",
    level: 4,
    question: `对比 PCF、VSM、PCSS 三种软阴影技术的原理和优缺点。`,
    answer: `PCF（Percentage Closer Filtering）：对 Shadow Map 多次采样独立比较深度再平均。优点：简单可靠。缺点：采样核大时性能差且渗光，核小时锯齿明显。VSM（方差阴影映射）：将深度存为统计矩（均值和方差），用切比雪夫不等式估计遮挡概率。优点：支持线性滤波和硬件模糊，性能好。缺点：精度有限，多遮挡体重叠时产生漏光。PCSS（Percentage Closer Soft Shadows）：根据遮挡距离自适应调整采样核大小——遮挡物越远阴影越软。优点：物理真实的可变软度。缺点：性能最差，需要多趟采样。工业实践通常用 PCF + Poisson Disk 采样做性价比平衡。`,
    tags: ["PCF", "VSM", "PCSS", "软阴影"],
  },
];
