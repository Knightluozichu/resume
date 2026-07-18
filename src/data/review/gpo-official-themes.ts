import type { ReviewQuestion } from "./types";
export const gpoOfficialThemeQuestions: ReviewQuestion[]=[
  {
    "id": "gpo-geometry-terrain-1",
    "chapter": "gpo-geometry-terrain",
    "level": 1,
    "question": "几何、地形与程序化表面：16篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应16篇范围。",
    "tags": [
      "几何、地形与程序化表面：16篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-geometry-terrain-2",
    "chapter": "gpo-geometry-terrain",
    "level": 2,
    "question": "几何、地形与程序化表面：16篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "几何、地形与程序化表面：16篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-geometry-terrain-3",
    "chapter": "gpo-geometry-terrain",
    "level": 3,
    "question": "几何、地形与程序化表面：16篇复现最关键的失败证据是什么？",
    "answer": "只按相机距离细分，视场角和轮廓误差变化时会过细或穿帮。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "几何、地形与程序化表面：16篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-geometry-terrain-4",
    "chapter": "gpo-geometry-terrain",
    "level": 4,
    "question": "如何验收几何、地形与程序化表面：16篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证形变证书。",
    "tags": [
      "几何、地形与程序化表面：16篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-pipeline-visibility-1",
    "chapter": "gpo-pipeline-visibility",
    "level": 1,
    "question": "渲染管线、可见性与光源分桶：16篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应16篇范围。",
    "tags": [
      "渲染管线、可见性与光源分桶：16篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-pipeline-visibility-2",
    "chapter": "gpo-pipeline-visibility",
    "level": 2,
    "question": "渲染管线、可见性与光源分桶：16篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "渲染管线、可见性与光源分桶：16篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-pipeline-visibility-3",
    "chapter": "gpo-pipeline-visibility",
    "level": 3,
    "question": "渲染管线、可见性与光源分桶：16篇复现最关键的失败证据是什么？",
    "answer": "只比较Pass数量，不统计GBuffer、light list和中间目标的读写。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "渲染管线、可见性与光源分桶：16篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-pipeline-visibility-4",
    "chapter": "gpo-pipeline-visibility",
    "level": 4,
    "question": "如何验收渲染管线、可见性与光源分桶：16篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证管线证书。",
    "tags": [
      "渲染管线、可见性与光源分桶：16篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-data-compression-1",
    "chapter": "gpo-data-compression",
    "level": 1,
    "question": "纹理、压缩、资产与数据表示：8篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应8篇范围。",
    "tags": [
      "纹理、压缩、资产与数据表示：8篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-data-compression-2",
    "chapter": "gpo-data-compression",
    "level": 2,
    "question": "纹理、压缩、资产与数据表示：8篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "纹理、压缩、资产与数据表示：8篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-data-compression-3",
    "chapter": "gpo-data-compression",
    "level": 3,
    "question": "纹理、压缩、资产与数据表示：8篇复现最关键的失败证据是什么？",
    "answer": "只报压缩率，不测HDR峰值、法线方向或时间稳定性。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "纹理、压缩、资产与数据表示：8篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-data-compression-4",
    "chapter": "gpo-data-compression",
    "level": 4,
    "question": "如何验收纹理、压缩、资产与数据表示：8篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证数据证书。",
    "tags": [
      "纹理、压缩、资产与数据表示：8篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-lighting-gi-1",
    "chapter": "gpo-lighting-gi",
    "level": 1,
    "question": "光照、全局光照与反射：23篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应23篇范围。",
    "tags": [
      "光照、全局光照与反射：23篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-lighting-gi-2",
    "chapter": "gpo-lighting-gi",
    "level": 2,
    "question": "光照、全局光照与反射：23篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "光照、全局光照与反射：23篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-lighting-gi-3",
    "chapter": "gpo-lighting-gi",
    "level": 3,
    "question": "光照、全局光照与反射：23篇复现最关键的失败证据是什么？",
    "answer": "把亮度增加当作GI正确，没有检查漏光、遮挡和能量来源。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "光照、全局光照与反射：23篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-lighting-gi-4",
    "chapter": "gpo-lighting-gi",
    "level": 4,
    "question": "如何验收光照、全局光照与反射：23篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证光输运证书。",
    "tags": [
      "光照、全局光照与反射：23篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-shadow-systems-1",
    "chapter": "gpo-shadow-systems",
    "level": 1,
    "question": "阴影表示、过滤与软阴影：15篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应15篇范围。",
    "tags": [
      "阴影表示、过滤与软阴影：15篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-shadow-systems-2",
    "chapter": "gpo-shadow-systems",
    "level": 2,
    "question": "阴影表示、过滤与软阴影：15篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "阴影表示、过滤与软阴影：15篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-shadow-systems-3",
    "chapter": "gpo-shadow-systems",
    "level": 3,
    "question": "阴影表示、过滤与软阴影：15篇复现最关键的失败证据是什么？",
    "answer": "增大bias消除痤疮却造成悬浮，未区分常量、斜率和法线偏移。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "阴影表示、过滤与软阴影：15篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-shadow-systems-4",
    "chapter": "gpo-shadow-systems",
    "level": 4,
    "question": "如何验收阴影表示、过滤与软阴影：15篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证阴影证书。",
    "tags": [
      "阴影表示、过滤与软阴影：15篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-material-shading-1",
    "chapter": "gpo-material-shading",
    "level": 1,
    "question": "材质、皮肤、毛发与表面细节：10篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应10篇范围。",
    "tags": [
      "材质、皮肤、毛发与表面细节：10篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-material-shading-2",
    "chapter": "gpo-material-shading",
    "level": 2,
    "question": "材质、皮肤、毛发与表面细节：10篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "材质、皮肤、毛发与表面细节：10篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-material-shading-3",
    "chapter": "gpo-material-shading",
    "level": 3,
    "question": "材质、皮肤、毛发与表面细节：10篇复现最关键的失败证据是什么？",
    "answer": "只在正面固定灯光调材质，掠射角、阴影和不同曝光立即失真。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "材质、皮肤、毛发与表面细节：10篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-material-shading-4",
    "chapter": "gpo-material-shading",
    "level": 4,
    "question": "如何验收材质、皮肤、毛发与表面细节：10篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证材质证书。",
    "tags": [
      "材质、皮肤、毛发与表面细节：10篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-volume-environment-1",
    "chapter": "gpo-volume-environment",
    "level": 1,
    "question": "水体、大气、云雾与体积效果：15篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应15篇范围。",
    "tags": [
      "水体、大气、云雾与体积效果：15篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-volume-environment-2",
    "chapter": "gpo-volume-environment",
    "level": 2,
    "question": "水体、大气、云雾与体积效果：15篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "水体、大气、云雾与体积效果：15篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-volume-environment-3",
    "chapter": "gpo-volume-environment",
    "level": 3,
    "question": "水体、大气、云雾与体积效果：15篇复现最关键的失败证据是什么？",
    "answer": "减少ray-march步数后只看静态截图，运动时出现分层和闪烁。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "水体、大气、云雾与体积效果：15篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-volume-environment-4",
    "chapter": "gpo-volume-environment",
    "level": 4,
    "question": "如何验收水体、大气、云雾与体积效果：15篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证体积证书。",
    "tags": [
      "水体、大气、云雾与体积效果：15篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-image-reconstruction-1",
    "chapter": "gpo-image-reconstruction",
    "level": 1,
    "question": "图像空间、抗锯齿与时域重建：21篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应21篇范围。",
    "tags": [
      "图像空间、抗锯齿与时域重建：21篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-image-reconstruction-2",
    "chapter": "gpo-image-reconstruction",
    "level": 2,
    "question": "图像空间、抗锯齿与时域重建：21篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "图像空间、抗锯齿与时域重建：21篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-image-reconstruction-3",
    "chapter": "gpo-image-reconstruction",
    "level": 3,
    "question": "图像空间、抗锯齿与时域重建：21篇复现最关键的失败证据是什么？",
    "answer": "只在静止高对比图上评估AA，未覆盖亚像素运动和遮挡揭示。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "图像空间、抗锯齿与时域重建：21篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-image-reconstruction-4",
    "chapter": "gpo-image-reconstruction",
    "level": 4,
    "question": "如何验收图像空间、抗锯齿与时域重建：21篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证图像证书。",
    "tags": [
      "图像空间、抗锯齿与时域重建：21篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-transparency-raytracing-1",
    "chapter": "gpo-transparency-raytracing",
    "level": 1,
    "question": "透明、体素、光追与稀疏结构：13篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应13篇范围。",
    "tags": [
      "透明、体素、光追与稀疏结构：13篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-transparency-raytracing-2",
    "chapter": "gpo-transparency-raytracing",
    "level": 2,
    "question": "透明、体素、光追与稀疏结构：13篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "透明、体素、光追与稀疏结构：13篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-transparency-raytracing-3",
    "chapter": "gpo-transparency-raytracing",
    "level": 3,
    "question": "透明、体素、光追与稀疏结构：13篇复现最关键的失败证据是什么？",
    "answer": "按平均片元数分配OIT内存，爆炸或毛发场景发生静默溢出。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "透明、体素、光追与稀疏结构：13篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-transparency-raytracing-4",
    "chapter": "gpo-transparency-raytracing",
    "level": 4,
    "question": "如何验收透明、体素、光追与稀疏结构：13篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证稀疏证书。",
    "tags": [
      "透明、体素、光追与稀疏结构：13篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-compute-simulation-1",
    "chapter": "gpo-compute-simulation",
    "level": 1,
    "question": "GPU计算、物理模拟与数值算法：9篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应9篇范围。",
    "tags": [
      "GPU计算、物理模拟与数值算法：9篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-compute-simulation-2",
    "chapter": "gpo-compute-simulation",
    "level": 2,
    "question": "GPU计算、物理模拟与数值算法：9篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "GPU计算、物理模拟与数值算法：9篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-compute-simulation-3",
    "chapter": "gpo-compute-simulation",
    "level": 3,
    "question": "GPU计算、物理模拟与数值算法：9篇复现最关键的失败证据是什么？",
    "answer": "kernel时间快就宣布GPU加速，忽略上传、回读和barrier。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "GPU计算、物理模拟与数值算法：9篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-compute-simulation-4",
    "chapter": "gpo-compute-simulation",
    "level": 4,
    "question": "如何验收GPU计算、物理模拟与数值算法：9篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证计算证书。",
    "tags": [
      "GPU计算、物理模拟与数值算法：9篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-mobile-bandwidth-1",
    "chapter": "gpo-mobile-bandwidth",
    "level": 1,
    "question": "移动GPU、带宽与跨API迁移：20篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应20篇范围。",
    "tags": [
      "移动GPU、带宽与跨API迁移：20篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-mobile-bandwidth-2",
    "chapter": "gpo-mobile-bandwidth",
    "level": 2,
    "question": "移动GPU、带宽与跨API迁移：20篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "移动GPU、带宽与跨API迁移：20篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-mobile-bandwidth-3",
    "chapter": "gpo-mobile-bandwidth",
    "level": 3,
    "question": "移动GPU、带宽与跨API迁移：20篇复现最关键的失败证据是什么？",
    "answer": "在桌面模拟器通过就宣称移动兼容，没有真机tile和精度证据。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "移动GPU、带宽与跨API迁移：20篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-mobile-bandwidth-4",
    "chapter": "gpo-mobile-bandwidth",
    "level": 4,
    "question": "如何验收移动GPU、带宽与跨API迁移：20篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证移动证书。",
    "tags": [
      "移动GPU、带宽与跨API迁移：20篇复现",
      "综合验收"
    ]
  },
  {
    "id": "gpo-engine-tools-1",
    "chapter": "gpo-engine-tools",
    "level": 1,
    "question": "引擎架构、工具与项目复盘：17篇复现的官方范围如何核对？",
    "answer": "固定GPU Pro卷号、篇名、出版社目录URL和唯一主题归属；本页对应17篇范围。",
    "tags": [
      "引擎架构、工具与项目复盘：17篇复现",
      "官方范围"
    ]
  },
  {
    "id": "gpo-engine-tools-2",
    "chapter": "gpo-engine-tools",
    "level": 2,
    "question": "引擎架构、工具与项目复盘：17篇复现怎样提取算法不变量？",
    "answer": "列出输入、输出、公式、数据依赖、精度和边界，再区分历史API载体与现代等价或近似实现。",
    "tags": [
      "引擎架构、工具与项目复盘：17篇复现",
      "不变量"
    ]
  },
  {
    "id": "gpo-engine-tools-3",
    "chapter": "gpo-engine-tools",
    "level": 3,
    "question": "引擎架构、工具与项目复盘：17篇复现最关键的失败证据是什么？",
    "answer": "把项目截图和最终技术名当作复盘，省略被否决方案与约束。 必须保存最小失败配置、中间缓冲和修复后的同条件重放。",
    "tags": [
      "引擎架构、工具与项目复盘：17篇复现",
      "失败重放"
    ]
  },
  {
    "id": "gpo-engine-tools-4",
    "chapter": "gpo-engine-tools",
    "level": 4,
    "question": "如何验收引擎架构、工具与项目复盘：17篇复现的现代复现？",
    "answer": "用参考路径比较正确性，核对API与设备兼容，报告端到端成本，并验证工程证书。",
    "tags": [
      "引擎架构、工具与项目复盘：17篇复现",
      "综合验收"
    ]
  }
];
