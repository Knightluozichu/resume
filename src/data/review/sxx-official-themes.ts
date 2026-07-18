import type { ReviewQuestion } from "./types";
export const sxxOfficialThemeQuestions: ReviewQuestion[]=[
  {
    "id": "sxx-language-models-1",
    "chapter": "sxx-language-models",
    "level": 1,
    "question": "语言、Shader Model 与可编程管线的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应15篇。",
    "tags": [
      "语言、Shader Model 与可编程管线",
      "官方范围"
    ]
  },
  {
    "id": "sxx-language-models-2",
    "chapter": "sxx-language-models",
    "level": 2,
    "question": "语言、Shader Model 与可编程管线怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "语言、Shader Model 与可编程管线",
      "不变量"
    ]
  },
  {
    "id": "sxx-language-models-3",
    "chapter": "sxx-language-models",
    "level": 3,
    "question": "语言、Shader Model 与可编程管线最关键的失败证据是什么？",
    "answer": "只把旧汇编逐行翻译成HLSL，未核对插值、精度、常量布局和隐式状态。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "语言、Shader Model 与可编程管线",
      "失败重放"
    ]
  },
  {
    "id": "sxx-language-models-4",
    "chapter": "sxx-language-models",
    "level": 4,
    "question": "如何验收语言、Shader Model 与可编程管线的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证语言迁移证书。",
    "tags": [
      "语言、Shader Model 与可编程管线",
      "综合验收"
    ]
  },
  {
    "id": "sxx-geometry-data-1",
    "chapter": "sxx-geometry-data",
    "level": 1,
    "question": "几何数据、拓扑与细分的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应21篇。",
    "tags": [
      "几何数据、拓扑与细分",
      "官方范围"
    ]
  },
  {
    "id": "sxx-geometry-data-2",
    "chapter": "sxx-geometry-data",
    "level": 2,
    "question": "几何数据、拓扑与细分怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "几何数据、拓扑与细分",
      "不变量"
    ]
  },
  {
    "id": "sxx-geometry-data-3",
    "chapter": "sxx-geometry-data",
    "level": 3,
    "question": "几何数据、拓扑与细分最关键的失败证据是什么？",
    "answer": "只比较三角形数量，没有检查共享边、法线、阴影和运动向量是否一致。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "几何数据、拓扑与细分",
      "失败重放"
    ]
  },
  {
    "id": "sxx-geometry-data-4",
    "chapter": "sxx-geometry-data",
    "level": 4,
    "question": "如何验收几何数据、拓扑与细分的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证几何证书。",
    "tags": [
      "几何数据、拓扑与细分",
      "综合验收"
    ]
  },
  {
    "id": "sxx-animation-deformation-1",
    "chapter": "sxx-animation-deformation",
    "level": 1,
    "question": "动画、蒙皮与动态形变的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应14篇。",
    "tags": [
      "动画、蒙皮与动态形变",
      "官方范围"
    ]
  },
  {
    "id": "sxx-animation-deformation-2",
    "chapter": "sxx-animation-deformation",
    "level": 2,
    "question": "动画、蒙皮与动态形变怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "动画、蒙皮与动态形变",
      "不变量"
    ]
  },
  {
    "id": "sxx-animation-deformation-3",
    "chapter": "sxx-animation-deformation",
    "level": 3,
    "question": "动画、蒙皮与动态形变最关键的失败证据是什么？",
    "answer": "只验证静止姿态，运动时法线、切线或上一帧位置仍来自旧网格。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "动画、蒙皮与动态形变",
      "失败重放"
    ]
  },
  {
    "id": "sxx-animation-deformation-4",
    "chapter": "sxx-animation-deformation",
    "level": 4,
    "question": "如何验收动画、蒙皮与动态形变的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证动画证书。",
    "tags": [
      "动画、蒙皮与动态形变",
      "综合验收"
    ]
  },
  {
    "id": "sxx-terrain-displacement-1",
    "chapter": "sxx-terrain-displacement",
    "level": 1,
    "question": "地形、位移与表面细节的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应13篇。",
    "tags": [
      "地形、位移与表面细节",
      "官方范围"
    ]
  },
  {
    "id": "sxx-terrain-displacement-2",
    "chapter": "sxx-terrain-displacement",
    "level": 2,
    "question": "地形、位移与表面细节怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "地形、位移与表面细节",
      "不变量"
    ]
  },
  {
    "id": "sxx-terrain-displacement-3",
    "chapter": "sxx-terrain-displacement",
    "level": 3,
    "question": "地形、位移与表面细节最关键的失败证据是什么？",
    "answer": "只在正视角调参，掠射角出现穿帮、步进不足或tile接缝。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "地形、位移与表面细节",
      "失败重放"
    ]
  },
  {
    "id": "sxx-terrain-displacement-4",
    "chapter": "sxx-terrain-displacement",
    "level": 4,
    "question": "如何验收地形、位移与表面细节的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证地形证书。",
    "tags": [
      "地形、位移与表面细节",
      "综合验收"
    ]
  },
  {
    "id": "sxx-material-surface-1",
    "chapter": "sxx-material-surface",
    "level": 1,
    "question": "材质、BRDF 与风格化表面的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应31篇。",
    "tags": [
      "材质、BRDF 与风格化表面",
      "官方范围"
    ]
  },
  {
    "id": "sxx-material-surface-2",
    "chapter": "sxx-material-surface",
    "level": 2,
    "question": "材质、BRDF 与风格化表面怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "材质、BRDF 与风格化表面",
      "不变量"
    ]
  },
  {
    "id": "sxx-material-surface-3",
    "chapter": "sxx-material-surface",
    "level": 3,
    "question": "材质、BRDF 与风格化表面最关键的失败证据是什么？",
    "answer": "只在一张宣传图上匹配颜色，没有扫描粗糙度、视角、光源大小和曝光。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "材质、BRDF 与风格化表面",
      "失败重放"
    ]
  },
  {
    "id": "sxx-material-surface-4",
    "chapter": "sxx-material-surface",
    "level": 4,
    "question": "如何验收材质、BRDF 与风格化表面的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证材质证书。",
    "tags": [
      "材质、BRDF 与风格化表面",
      "综合验收"
    ]
  },
  {
    "id": "sxx-lighting-gi-1",
    "chapter": "sxx-lighting-gi",
    "level": 1,
    "question": "直接光照、全局光照与环境遮蔽的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应28篇。",
    "tags": [
      "直接光照、全局光照与环境遮蔽",
      "官方范围"
    ]
  },
  {
    "id": "sxx-lighting-gi-2",
    "chapter": "sxx-lighting-gi",
    "level": 2,
    "question": "直接光照、全局光照与环境遮蔽怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "直接光照、全局光照与环境遮蔽",
      "不变量"
    ]
  },
  {
    "id": "sxx-lighting-gi-3",
    "chapter": "sxx-lighting-gi",
    "level": 3,
    "question": "直接光照、全局光照与环境遮蔽最关键的失败证据是什么？",
    "answer": "把整体变亮当作间接光正确，没有检查漏光、遮挡和能量来源。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "直接光照、全局光照与环境遮蔽",
      "失败重放"
    ]
  },
  {
    "id": "sxx-lighting-gi-4",
    "chapter": "sxx-lighting-gi",
    "level": 4,
    "question": "如何验收直接光照、全局光照与环境遮蔽的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证光输运证书。",
    "tags": [
      "直接光照、全局光照与环境遮蔽",
      "综合验收"
    ]
  },
  {
    "id": "sxx-texture-representation-1",
    "chapter": "sxx-texture-representation",
    "level": 1,
    "question": "纹理、立方体图与数据表示的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应13篇。",
    "tags": [
      "纹理、立方体图与数据表示",
      "官方范围"
    ]
  },
  {
    "id": "sxx-texture-representation-2",
    "chapter": "sxx-texture-representation",
    "level": 2,
    "question": "纹理、立方体图与数据表示怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "纹理、立方体图与数据表示",
      "不变量"
    ]
  },
  {
    "id": "sxx-texture-representation-3",
    "chapter": "sxx-texture-representation",
    "level": 3,
    "question": "纹理、立方体图与数据表示最关键的失败证据是什么？",
    "answer": "只报平均PSNR，没有检查HDR峰值、法线方向、cube边界和时间闪烁。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "纹理、立方体图与数据表示",
      "失败重放"
    ]
  },
  {
    "id": "sxx-texture-representation-4",
    "chapter": "sxx-texture-representation",
    "level": 4,
    "question": "如何验收纹理、立方体图与数据表示的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证纹理证书。",
    "tags": [
      "纹理、立方体图与数据表示",
      "综合验收"
    ]
  },
  {
    "id": "sxx-particles-volume-1",
    "chapter": "sxx-particles-volume",
    "level": 1,
    "question": "粒子、体积、雾与流体的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应20篇。",
    "tags": [
      "粒子、体积、雾与流体",
      "官方范围"
    ]
  },
  {
    "id": "sxx-particles-volume-2",
    "chapter": "sxx-particles-volume",
    "level": 2,
    "question": "粒子、体积、雾与流体怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "粒子、体积、雾与流体",
      "不变量"
    ]
  },
  {
    "id": "sxx-particles-volume-3",
    "chapter": "sxx-particles-volume",
    "level": 3,
    "question": "粒子、体积、雾与流体最关键的失败证据是什么？",
    "answer": "改变步数后亮度也改变，说明积分没有按步长缩放或透射率累积错误。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "粒子、体积、雾与流体",
      "失败重放"
    ]
  },
  {
    "id": "sxx-particles-volume-4",
    "chapter": "sxx-particles-volume",
    "level": 4,
    "question": "如何验收粒子、体积、雾与流体的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证体积证书。",
    "tags": [
      "粒子、体积、雾与流体",
      "综合验收"
    ]
  },
  {
    "id": "sxx-image-post-1",
    "chapter": "sxx-image-post",
    "level": 1,
    "question": "图像空间、后处理与重建的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应32篇。",
    "tags": [
      "图像空间、后处理与重建",
      "官方范围"
    ]
  },
  {
    "id": "sxx-image-post-2",
    "chapter": "sxx-image-post",
    "level": 2,
    "question": "图像空间、后处理与重建怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "图像空间、后处理与重建",
      "不变量"
    ]
  },
  {
    "id": "sxx-image-post-3",
    "chapter": "sxx-image-post",
    "level": 3,
    "question": "图像空间、后处理与重建最关键的失败证据是什么？",
    "answer": "在显示编码空间卷积或混合，亮边和暗边的能量响应不对称。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "图像空间、后处理与重建",
      "失败重放"
    ]
  },
  {
    "id": "sxx-image-post-4",
    "chapter": "sxx-image-post",
    "level": 4,
    "question": "如何验收图像空间、后处理与重建的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证重建证书。",
    "tags": [
      "图像空间、后处理与重建",
      "综合验收"
    ]
  },
  {
    "id": "sxx-transparency-aa-1",
    "chapter": "sxx-transparency-aa",
    "level": 1,
    "question": "透明、抗锯齿与可见样本的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应11篇。",
    "tags": [
      "透明、抗锯齿与可见样本",
      "官方范围"
    ]
  },
  {
    "id": "sxx-transparency-aa-2",
    "chapter": "sxx-transparency-aa",
    "level": 2,
    "question": "透明、抗锯齿与可见样本怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "透明、抗锯齿与可见样本",
      "不变量"
    ]
  },
  {
    "id": "sxx-transparency-aa-3",
    "chapter": "sxx-transparency-aa",
    "level": 3,
    "question": "透明、抗锯齿与可见样本最关键的失败证据是什么？",
    "answer": "把alpha当作覆盖率，细线和植被在缩放或MSAA下出现亮度偏差。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "透明、抗锯齿与可见样本",
      "失败重放"
    ]
  },
  {
    "id": "sxx-transparency-aa-4",
    "chapter": "sxx-transparency-aa",
    "level": 4,
    "question": "如何验收透明、抗锯齿与可见样本的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证样本证书。",
    "tags": [
      "透明、抗锯齿与可见样本",
      "综合验收"
    ]
  },
  {
    "id": "sxx-shadow-systems-1",
    "chapter": "sxx-shadow-systems",
    "level": 1,
    "question": "阴影表示、过滤与稳定性的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应36篇。",
    "tags": [
      "阴影表示、过滤与稳定性",
      "官方范围"
    ]
  },
  {
    "id": "sxx-shadow-systems-2",
    "chapter": "sxx-shadow-systems",
    "level": 2,
    "question": "阴影表示、过滤与稳定性怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "阴影表示、过滤与稳定性",
      "不变量"
    ]
  },
  {
    "id": "sxx-shadow-systems-3",
    "chapter": "sxx-shadow-systems",
    "level": 3,
    "question": "阴影表示、过滤与稳定性最关键的失败证据是什么？",
    "answer": "用更大bias消除acne，却没有测掠射接收面和接触阴影脱离。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "阴影表示、过滤与稳定性",
      "失败重放"
    ]
  },
  {
    "id": "sxx-shadow-systems-4",
    "chapter": "sxx-shadow-systems",
    "level": 4,
    "question": "如何验收阴影表示、过滤与稳定性的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证阴影证书。",
    "tags": [
      "阴影表示、过滤与稳定性",
      "综合验收"
    ]
  },
  {
    "id": "sxx-environment-weather-1",
    "chapter": "sxx-environment-weather",
    "level": 1,
    "question": "天空、天气与自然环境的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应11篇。",
    "tags": [
      "天空、天气与自然环境",
      "官方范围"
    ]
  },
  {
    "id": "sxx-environment-weather-2",
    "chapter": "sxx-environment-weather",
    "level": 2,
    "question": "天空、天气与自然环境怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "天空、天气与自然环境",
      "不变量"
    ]
  },
  {
    "id": "sxx-environment-weather-3",
    "chapter": "sxx-environment-weather",
    "level": 3,
    "question": "天空、天气与自然环境最关键的失败证据是什么？",
    "answer": "天空和雾使用不同曝光或色域，地平线处出现无法消除的接缝。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "天空、天气与自然环境",
      "失败重放"
    ]
  },
  {
    "id": "sxx-environment-weather-4",
    "chapter": "sxx-environment-weather",
    "level": 4,
    "question": "如何验收天空、天气与自然环境的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证环境证书。",
    "tags": [
      "天空、天气与自然环境",
      "综合验收"
    ]
  },
  {
    "id": "sxx-engine-architecture-1",
    "chapter": "sxx-engine-architecture",
    "level": 1,
    "question": "渲染器、材质系统与引擎集成的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应27篇。",
    "tags": [
      "渲染器、材质系统与引擎集成",
      "官方范围"
    ]
  },
  {
    "id": "sxx-engine-architecture-2",
    "chapter": "sxx-engine-architecture",
    "level": 2,
    "question": "渲染器、材质系统与引擎集成怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "渲染器、材质系统与引擎集成",
      "不变量"
    ]
  },
  {
    "id": "sxx-engine-architecture-3",
    "chapter": "sxx-engine-architecture",
    "level": 3,
    "question": "渲染器、材质系统与引擎集成最关键的失败证据是什么？",
    "answer": "缓存键遗漏渲染状态或布局，错误只在特定材质顺序下出现。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "渲染器、材质系统与引擎集成",
      "失败重放"
    ]
  },
  {
    "id": "sxx-engine-architecture-4",
    "chapter": "sxx-engine-architecture",
    "level": 4,
    "question": "如何验收渲染器、材质系统与引擎集成的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证引擎证书。",
    "tags": [
      "渲染器、材质系统与引擎集成",
      "综合验收"
    ]
  },
  {
    "id": "sxx-tools-performance-1",
    "chapter": "sxx-tools-performance",
    "level": 1,
    "question": "工具链、调试与性能工程的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应19篇。",
    "tags": [
      "工具链、调试与性能工程",
      "官方范围"
    ]
  },
  {
    "id": "sxx-tools-performance-2",
    "chapter": "sxx-tools-performance",
    "level": 2,
    "question": "工具链、调试与性能工程怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "工具链、调试与性能工程",
      "不变量"
    ]
  },
  {
    "id": "sxx-tools-performance-3",
    "chapter": "sxx-tools-performance",
    "level": 3,
    "question": "工具链、调试与性能工程最关键的失败证据是什么？",
    "answer": "根据源代码行数猜成本，没有查看生成指令、寄存器、占用率和实际GPU捕获。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "工具链、调试与性能工程",
      "失败重放"
    ]
  },
  {
    "id": "sxx-tools-performance-4",
    "chapter": "sxx-tools-performance",
    "level": 4,
    "question": "如何验收工具链、调试与性能工程的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证性能证书。",
    "tags": [
      "工具链、调试与性能工程",
      "综合验收"
    ]
  },
  {
    "id": "sxx-gpgpu-simulation-1",
    "chapter": "sxx-gpgpu-simulation",
    "level": 1,
    "question": "通用计算、模拟与非传统GPU任务的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应24篇。",
    "tags": [
      "通用计算、模拟与非传统GPU任务",
      "官方范围"
    ]
  },
  {
    "id": "sxx-gpgpu-simulation-2",
    "chapter": "sxx-gpgpu-simulation",
    "level": 2,
    "question": "通用计算、模拟与非传统GPU任务怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "通用计算、模拟与非传统GPU任务",
      "不变量"
    ]
  },
  {
    "id": "sxx-gpgpu-simulation-3",
    "chapter": "sxx-gpgpu-simulation",
    "level": 3,
    "question": "通用计算、模拟与非传统GPU任务最关键的失败证据是什么？",
    "answer": "只计kernel时间，忽略上传、读回、格式转换和图形管线同步。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "通用计算、模拟与非传统GPU任务",
      "失败重放"
    ]
  },
  {
    "id": "sxx-gpgpu-simulation-4",
    "chapter": "sxx-gpgpu-simulation",
    "level": 4,
    "question": "如何验收通用计算、模拟与非传统GPU任务的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证计算证书。",
    "tags": [
      "通用计算、模拟与非传统GPU任务",
      "综合验收"
    ]
  },
  {
    "id": "sxx-mobile-portability-1",
    "chapter": "sxx-mobile-portability",
    "level": 1,
    "question": "移动GPU、精度与跨平台迁移的官方范围如何核对？",
    "answer": "固定ShaderX物理卷、篇名、来源URL和唯一主题归属；本页对应14篇。",
    "tags": [
      "移动GPU、精度与跨平台迁移",
      "官方范围"
    ]
  },
  {
    "id": "sxx-mobile-portability-2",
    "chapter": "sxx-mobile-portability",
    "level": 2,
    "question": "移动GPU、精度与跨平台迁移怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代实现。",
    "tags": [
      "移动GPU、精度与跨平台迁移",
      "不变量"
    ]
  },
  {
    "id": "sxx-mobile-portability-3",
    "chapter": "sxx-mobile-portability",
    "level": 3,
    "question": "移动GPU、精度与跨平台迁移最关键的失败证据是什么？",
    "answer": "只在桌面模拟器编译通过，没有覆盖真实格式、精度、扩展和驱动。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "移动GPU、精度与跨平台迁移",
      "失败重放"
    ]
  },
  {
    "id": "sxx-mobile-portability-4",
    "chapter": "sxx-mobile-portability",
    "level": 4,
    "question": "如何验收移动GPU、精度与跨平台迁移的现代复现？",
    "answer": "使用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证移动证书。",
    "tags": [
      "移动GPU、精度与跨平台迁移",
      "综合验收"
    ]
  }
];
