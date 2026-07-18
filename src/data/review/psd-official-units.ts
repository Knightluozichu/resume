import type { ReviewQuestion } from "./types";
export const psdOfficialUnitQuestions: ReviewQuestion[]=[
  {
    "id": "psd-01-hello-game-graphics-1",
    "chapter": "psd-01-hello-game-graphics",
    "level": 1,
    "question": "第1章 初识游戏图形中的渲染是什么？",
    "answer": "从网格、相机、灯光与材质生成一帧图像的过程。",
    "tags": [
      "第1章 初识游戏图形",
      "渲染"
    ]
  },
  {
    "id": "psd-01-hello-game-graphics-2",
    "chapter": "psd-01-hello-game-graphics",
    "level": 2,
    "question": "第1章 初识游戏图形如何连接网格与向量？",
    "answer": "由顶点、边和面描述形状并携带渲染属性的数据。 以多个分量表达位置、方向、颜色或其他图形数据的量。 必须标注阶段与空间。",
    "tags": [
      "第1章 初识游戏图形",
      "数据流"
    ]
  },
  {
    "id": "psd-01-hello-game-graphics-3",
    "chapter": "psd-01-hello-game-graphics",
    "level": 3,
    "question": "第1章 初识游戏图形的关键反例是什么？",
    "answer": "把网格、材质和着色器混为一个对象，无法解释数据究竟在哪一阶段变化。 用最小输入和GPU捕获定位。",
    "tags": [
      "第1章 初识游戏图形",
      "反例"
    ]
  },
  {
    "id": "psd-01-hello-game-graphics-4",
    "chapter": "psd-01-hello-game-graphics",
    "level": 4,
    "question": "第1章 初识游戏图形如何验收着色器？",
    "answer": "运行在GPU可编程阶段并把输入数据转换为位置或颜色的程序。 保存源码、状态、参考图和性能。",
    "tags": [
      "第1章 初识游戏图形",
      "验收"
    ]
  },
  {
    "id": "psd-02-first-shaders-1",
    "chapter": "psd-02-first-shaders",
    "level": 1,
    "question": "第2章 第一个着色器中的GLSL版本是什么？",
    "answer": "用version预处理指令声明着色器语言和功能基线。",
    "tags": [
      "第2章 第一个着色器",
      "GLSL版本"
    ]
  },
  {
    "id": "psd-02-first-shaders-2",
    "chapter": "psd-02-first-shaders",
    "level": 2,
    "question": "第2章 第一个着色器如何连接顶点属性与gl_Position？",
    "answer": "按顶点从顶点缓冲输入位置、颜色或纹理坐标的数据。 顶点着色器必须写入的裁剪空间位置。 必须标注阶段与空间。",
    "tags": [
      "第2章 第一个着色器",
      "数据流"
    ]
  },
  {
    "id": "psd-02-first-shaders-3",
    "chapter": "psd-02-first-shaders",
    "level": 3,
    "question": "第2章 第一个着色器的关键反例是什么？",
    "answer": "顶点输出名或类型与片元输入不匹配，却只在最终黑屏上猜测错误。 用最小输入和GPU捕获定位。",
    "tags": [
      "第2章 第一个着色器",
      "反例"
    ]
  },
  {
    "id": "psd-02-first-shaders-4",
    "chapter": "psd-02-first-shaders",
    "level": 4,
    "question": "第2章 第一个着色器如何验收uniform？",
    "answer": "一次Draw中保持一致、由应用设置的着色器参数。 保存源码、状态、参考图和性能。",
    "tags": [
      "第2章 第一个着色器",
      "验收"
    ]
  },
  {
    "id": "psd-03-using-textures-1",
    "chapter": "psd-03-using-textures",
    "level": 1,
    "question": "第3章 使用纹理中的UV坐标是什么？",
    "answer": "把网格表面位置映射到二维纹理域的参数。",
    "tags": [
      "第3章 使用纹理",
      "UV坐标"
    ]
  },
  {
    "id": "psd-03-using-textures-2",
    "chapter": "psd-03-using-textures",
    "level": 2,
    "question": "第3章 使用纹理如何连接sampler2D与UV滚动？",
    "answer": "组合二维纹理与采样状态并供GLSL texture函数读取的类型。 给纹理坐标增加随时间变化偏移以形成运动。 必须标注阶段与空间。",
    "tags": [
      "第3章 使用纹理",
      "数据流"
    ]
  },
  {
    "id": "psd-03-using-textures-3",
    "chapter": "psd-03-using-textures",
    "level": 3,
    "question": "第3章 使用纹理的关键反例是什么？",
    "answer": "纹理坐标正确但采样器绑定到错误纹理单元，画面异常时仍只修改GLSL。 用最小输入和GPU捕获定位。",
    "tags": [
      "第3章 使用纹理",
      "反例"
    ]
  },
  {
    "id": "psd-03-using-textures-4",
    "chapter": "psd-03-using-textures",
    "level": 4,
    "question": "第3章 使用纹理如何验收mix？",
    "answer": "按权重在线性插值两个标量、向量或颜色的GLSL函数。 保存源码、状态、参考图和性能。",
    "tags": [
      "第3章 使用纹理",
      "验收"
    ]
  },
  {
    "id": "psd-04-translucency-depth-1",
    "chapter": "psd-04-translucency-depth",
    "level": 1,
    "question": "第4章 半透明与深度中的alpha测试是什么？",
    "answer": "按透明度阈值discard片元的二值透明方法。",
    "tags": [
      "第4章 半透明与深度",
      "alpha测试"
    ]
  },
  {
    "id": "psd-04-translucency-depth-2",
    "chapter": "psd-04-translucency-depth",
    "level": 2,
    "question": "第4章 半透明与深度如何连接深度测试与alpha混合？",
    "answer": "比较片元深度与深度缓冲并决定可见性的过程。 按源alpha组合源颜色与目标颜色的半透明方法。 必须标注阶段与空间。",
    "tags": [
      "第4章 半透明与深度",
      "数据流"
    ]
  },
  {
    "id": "psd-04-translucency-depth-3",
    "chapter": "psd-04-translucency-depth",
    "level": 3,
    "question": "第4章 半透明与深度的关键反例是什么？",
    "answer": "只改片元alpha却没有启用正确混合状态或排序，误以为着色器独自决定透明。 用最小输入和GPU捕获定位。",
    "tags": [
      "第4章 半透明与深度",
      "反例"
    ]
  },
  {
    "id": "psd-04-translucency-depth-4",
    "chapter": "psd-04-translucency-depth",
    "level": 4,
    "question": "第4章 半透明与深度如何验收精灵表？",
    "answer": "在一张纹理中排列多帧并按时间选择UV子区域的动画资源。 保存源码、状态、参考图和性能。",
    "tags": [
      "第4章 半透明与深度",
      "验收"
    ]
  },
  {
    "id": "psd-05-making-things-move-1",
    "chapter": "psd-05-making-things-move",
    "level": 1,
    "question": "第5章 使物体动起来中的平移矩阵是什么？",
    "answer": "在齐次坐标中把位置沿指定方向移动的矩阵。",
    "tags": [
      "第5章 使物体动起来",
      "平移矩阵"
    ]
  },
  {
    "id": "psd-05-making-things-move-2",
    "chapter": "psd-05-making-things-move",
    "level": 2,
    "question": "第5章 使物体动起来如何连接缩放矩阵与旋转矩阵？",
    "answer": "按轴改变位置相对原点距离的矩阵。 保持长度并围绕原点或轴改变方向的矩阵。 必须标注阶段与空间。",
    "tags": [
      "第5章 使物体动起来",
      "数据流"
    ]
  },
  {
    "id": "psd-05-making-things-move-3",
    "chapter": "psd-05-making-things-move",
    "level": 3,
    "question": "第5章 使物体动起来的关键反例是什么？",
    "answer": "矩阵乘法顺序与GLSL列向量约定混淆，物体围绕世界原点而非自身中心旋转。 用最小输入和GPU捕获定位。",
    "tags": [
      "第5章 使物体动起来",
      "反例"
    ]
  },
  {
    "id": "psd-05-making-things-move-4",
    "chapter": "psd-05-making-things-move",
    "level": 4,
    "question": "第5章 使物体动起来如何验收单位矩阵？",
    "answer": "乘以任何兼容向量或矩阵都保持不变的矩阵。 保存源码、状态、参考图和性能。",
    "tags": [
      "第5章 使物体动起来",
      "验收"
    ]
  },
  {
    "id": "psd-06-cameras-coordinates-1",
    "chapter": "psd-06-cameras-coordinates",
    "level": 1,
    "question": "第6章 摄像机和坐标中的视图矩阵是什么？",
    "answer": "把世界空间坐标变换到摄像机观察空间的矩阵。",
    "tags": [
      "第6章 摄像机和坐标",
      "视图矩阵"
    ]
  },
  {
    "id": "psd-06-cameras-coordinates-2",
    "chapter": "psd-06-cameras-coordinates",
    "level": 2,
    "question": "第6章 摄像机和坐标如何连接模型矩阵与投影矩阵？",
    "answer": "把模型局部坐标放置到世界空间的矩阵。 把观察空间视锥映射到裁剪空间的矩阵。 必须标注阶段与空间。",
    "tags": [
      "第6章 摄像机和坐标",
      "数据流"
    ]
  },
  {
    "id": "psd-06-cameras-coordinates-3",
    "chapter": "psd-06-cameras-coordinates",
    "level": 3,
    "question": "第6章 摄像机和坐标的关键反例是什么？",
    "answer": "把NDC、裁剪空间和屏幕像素空间混为一谈，调试深度与UV时得到错误范围。 用最小输入和GPU捕获定位。",
    "tags": [
      "第6章 摄像机和坐标",
      "反例"
    ]
  },
  {
    "id": "psd-06-cameras-coordinates-4",
    "chapter": "psd-06-cameras-coordinates",
    "level": 4,
    "question": "第6章 摄像机和坐标如何验收透视除法？",
    "answer": "用裁剪坐标除以w得到归一化设备坐标的步骤。 保存源码、状态、参考图和性能。",
    "tags": [
      "第6章 摄像机和坐标",
      "验收"
    ]
  },
  {
    "id": "psd-07-first-3d-project-1",
    "chapter": "psd-07-first-3d-project",
    "level": 1,
    "question": "第7章 第一个3D项目中的网格加载是什么？",
    "answer": "从模型文件读取顶点、索引、法线和UV并上传GPU的过程。",
    "tags": [
      "第7章 第一个3D项目",
      "网格加载"
    ]
  },
  {
    "id": "psd-07-first-3d-project-2",
    "chapter": "psd-07-first-3d-project",
    "level": 2,
    "question": "第7章 第一个3D项目如何连接索引缓冲与透视摄像机？",
    "answer": "复用共享顶点并定义图元连接顺序的索引数组。 近处大远处小、由视锥定义投影的摄像机。 必须标注阶段与空间。",
    "tags": [
      "第7章 第一个3D项目",
      "数据流"
    ]
  },
  {
    "id": "psd-07-first-3d-project-3",
    "chapter": "psd-07-first-3d-project",
    "level": 3,
    "question": "第7章 第一个3D项目的关键反例是什么？",
    "answer": "模型能显示就算完成，未检查索引绕序、背面剔除、深度和属性通道。 用最小输入和GPU捕获定位。",
    "tags": [
      "第7章 第一个3D项目",
      "反例"
    ]
  },
  {
    "id": "psd-07-first-3d-project-4",
    "chapter": "psd-07-first-3d-project",
    "level": 4,
    "question": "第7章 第一个3D项目如何验收深度缓冲？",
    "answer": "保存最近片元深度并解决三维遮挡的缓冲。 保存源码、状态、参考图和性能。",
    "tags": [
      "第7章 第一个3D项目",
      "验收"
    ]
  },
  {
    "id": "psd-08-diffuse-lighting-1",
    "chapter": "psd-08-diffuse-lighting",
    "level": 1,
    "question": "第8章 漫反射光照中的平滑着色是什么？",
    "answer": "插值共享顶点法线以产生连续明暗的着色。",
    "tags": [
      "第8章 漫反射光照",
      "平滑着色"
    ]
  },
  {
    "id": "psd-08-diffuse-lighting-2",
    "chapter": "psd-08-diffuse-lighting",
    "level": 2,
    "question": "第8章 漫反射光照如何连接平面着色与法线矩阵？",
    "answer": "每个面使用一致法线以保留硬边的着色。 模型矩阵线性部分逆转置，用于正确变换法线。 必须标注阶段与空间。",
    "tags": [
      "第8章 漫反射光照",
      "数据流"
    ]
  },
  {
    "id": "psd-08-diffuse-lighting-3",
    "chapter": "psd-08-diffuse-lighting",
    "level": 3,
    "question": "第8章 漫反射光照的关键反例是什么？",
    "answer": "法线经过插值后不重新归一化，模型边缘和缩放后亮度错误。 用最小输入和GPU捕获定位。",
    "tags": [
      "第8章 漫反射光照",
      "反例"
    ]
  },
  {
    "id": "psd-08-diffuse-lighting-4",
    "chapter": "psd-08-diffuse-lighting",
    "level": 4,
    "question": "第8章 漫反射光照如何验收轮廓光？",
    "answer": "观察方向与法线接近垂直时增强边缘的风格光照。 保存源码、状态、参考图和性能。",
    "tags": [
      "第8章 漫反射光照",
      "验收"
    ]
  },
  {
    "id": "psd-09-first-lighting-model-1",
    "chapter": "psd-09-first-lighting-model",
    "level": 1,
    "question": "第9章 第一个光照模型中的镜面反射是什么？",
    "answer": "沿反射方向集中并随观察方向变化的高光项。",
    "tags": [
      "第9章 第一个光照模型",
      "镜面反射"
    ]
  },
  {
    "id": "psd-09-first-lighting-model-2",
    "chapter": "psd-09-first-lighting-model",
    "level": 2,
    "question": "第9章 第一个光照模型如何连接Phong模型与Blinn-Phong？",
    "answer": "以反射向量和观察向量夹角幂次计算高光的经验模型。 以半程向量和法线夹角幂次计算高光的模型。 必须标注阶段与空间。",
    "tags": [
      "第9章 第一个光照模型",
      "数据流"
    ]
  },
  {
    "id": "psd-09-first-lighting-model-3",
    "chapter": "psd-09-first-lighting-model",
    "level": 3,
    "question": "第9章 第一个光照模型的关键反例是什么？",
    "answer": "用未归一化光线和观察向量计算半程向量，高光位置随距离异常漂移。 用最小输入和GPU捕获定位。",
    "tags": [
      "第9章 第一个光照模型",
      "反例"
    ]
  },
  {
    "id": "psd-09-first-lighting-model-4",
    "chapter": "psd-09-first-lighting-model",
    "level": 4,
    "question": "第9章 第一个光照模型如何验收光照纹理？",
    "answer": "用纹理通道控制漫反射、高光颜色或强度的材质数据。 保存源码、状态、参考图和性能。",
    "tags": [
      "第9章 第一个光照模型",
      "验收"
    ]
  },
  {
    "id": "psd-10-normal-mapping-1",
    "chapter": "psd-10-normal-mapping",
    "level": 1,
    "question": "第10章 法线贴图中的法线贴图是什么？",
    "answer": "在纹理中编码表面微小方向变化以改变光照而不增加几何的技术。",
    "tags": [
      "第10章 法线贴图",
      "法线贴图"
    ]
  },
  {
    "id": "psd-10-normal-mapping-2",
    "chapter": "psd-10-normal-mapping",
    "level": 2,
    "question": "第10章 法线贴图如何连接切线空间与切线向量？",
    "answer": "由切线、副切线和法线构成并随表面UV变化的局部坐标系。 沿纹理u方向的表面方向，常作为网格顶点属性。 必须标注阶段与空间。",
    "tags": [
      "第10章 法线贴图",
      "数据流"
    ]
  },
  {
    "id": "psd-10-normal-mapping-3",
    "chapter": "psd-10-normal-mapping",
    "level": 3,
    "question": "第10章 法线贴图的关键反例是什么？",
    "answer": "网格UV镜像却忽略切线手性，接缝两侧法线方向翻转。 用最小输入和GPU捕获定位。",
    "tags": [
      "第10章 法线贴图",
      "反例"
    ]
  },
  {
    "id": "psd-10-normal-mapping-4",
    "chapter": "psd-10-normal-mapping",
    "level": 4,
    "question": "第10章 法线贴图如何验收TBN矩阵？",
    "answer": "在切线空间与模型或世界空间间变换方向的基矩阵。 保存源码、状态、参考图和性能。",
    "tags": [
      "第10章 法线贴图",
      "验收"
    ]
  },
  {
    "id": "psd-11-cubemaps-skyboxes-1",
    "chapter": "psd-11-cubemaps-skyboxes",
    "level": 1,
    "question": "第11章 立方体贴图和天空盒中的立方体贴图是什么？",
    "answer": "由六个面组成并以三维方向采样的环境纹理。",
    "tags": [
      "第11章 立方体贴图和天空盒",
      "立方体贴图"
    ]
  },
  {
    "id": "psd-11-cubemaps-skyboxes-2",
    "chapter": "psd-11-cubemaps-skyboxes",
    "level": 2,
    "question": "第11章 立方体贴图和天空盒如何连接天空盒与方向采样？",
    "answer": "围绕摄像机绘制环境、表现无限远背景的立方体。 用从中心出发的三维向量选择立方体纹理面和坐标。 必须标注阶段与空间。",
    "tags": [
      "第11章 立方体贴图和天空盒",
      "数据流"
    ]
  },
  {
    "id": "psd-11-cubemaps-skyboxes-3",
    "chapter": "psd-11-cubemaps-skyboxes",
    "level": 3,
    "question": "第11章 立方体贴图和天空盒的关键反例是什么？",
    "answer": "天空盒保留视图矩阵平移，摄像机移动时背景像近处立方体一样滑动。 用最小输入和GPU捕获定位。",
    "tags": [
      "第11章 立方体贴图和天空盒",
      "反例"
    ]
  },
  {
    "id": "psd-11-cubemaps-skyboxes-4",
    "chapter": "psd-11-cubemaps-skyboxes",
    "level": 4,
    "question": "第11章 立方体贴图和天空盒如何验收深度技巧？",
    "answer": "把天空盒放在最远深度并在场景后绘制以避免遮挡。 保存源码、状态、参考图和性能。",
    "tags": [
      "第11章 立方体贴图和天空盒",
      "验收"
    ]
  },
  {
    "id": "psd-12-lighting-in-depth-1",
    "chapter": "psd-12-lighting-in-depth",
    "level": 1,
    "question": "第12章 深入光照中的定向光是什么？",
    "answer": "所有位置共享方向、近似无限远光源的模型。",
    "tags": [
      "第12章 深入光照",
      "定向光"
    ]
  },
  {
    "id": "psd-12-lighting-in-depth-2",
    "chapter": "psd-12-lighting-in-depth",
    "level": 2,
    "question": "第12章 深入光照如何连接点光源与聚光灯？",
    "answer": "从一个位置向各方向发光并随距离衰减的模型。 在点光基础上增加方向与内外锥角限制的模型。 必须标注阶段与空间。",
    "tags": [
      "第12章 深入光照",
      "数据流"
    ]
  },
  {
    "id": "psd-12-lighting-in-depth-3",
    "chapter": "psd-12-lighting-in-depth",
    "level": 3,
    "question": "第12章 深入光照的关键反例是什么？",
    "answer": "增加光源数量后仍用常量成本描述Shader，忽略循环、uniform带宽和分支发散。 用最小输入和GPU捕获定位。",
    "tags": [
      "第12章 深入光照",
      "反例"
    ]
  },
  {
    "id": "psd-12-lighting-in-depth-4",
    "chapter": "psd-12-lighting-in-depth",
    "level": 4,
    "question": "第12章 深入光照如何验收多光源数组？",
    "answer": "把光源类型、位置、颜色和参数批量传入Shader的表示。 保存源码、状态、参考图和性能。",
    "tags": [
      "第12章 深入光照",
      "验收"
    ]
  },
  {
    "id": "psd-13-profiling-shaders-1",
    "chapter": "psd-13-profiling-shaders",
    "level": 1,
    "question": "第13章 剖析着色器性能中的帧时间是什么？",
    "answer": "生成一帧所需毫秒数，比FPS更适合比较成本变化。",
    "tags": [
      "第13章 剖析着色器性能",
      "帧时间"
    ]
  },
  {
    "id": "psd-13-profiling-shaders-2",
    "chapter": "psd-13-profiling-shaders",
    "level": 2,
    "question": "第13章 剖析着色器性能如何连接CPU瓶颈与GPU瓶颈？",
    "answer": "提交、逻辑或驱动工作限制帧率而GPU有空闲的状态。 顶点、片元、带宽或同步限制帧率的状态。 必须标注阶段与空间。",
    "tags": [
      "第13章 剖析着色器性能",
      "数据流"
    ]
  },
  {
    "id": "psd-13-profiling-shaders-3",
    "chapter": "psd-13-profiling-shaders",
    "level": 3,
    "question": "第13章 剖析着色器性能的关键反例是什么？",
    "answer": "VSync锁在60fps时优化前后读数相同，便断言优化无效。 用最小输入和GPU捕获定位。",
    "tags": [
      "第13章 剖析着色器性能",
      "反例"
    ]
  },
  {
    "id": "psd-13-profiling-shaders-4",
    "chapter": "psd-13-profiling-shaders",
    "level": 4,
    "question": "第13章 剖析着色器性能如何验收GPU捕获？",
    "answer": "记录一帧命令、资源、状态和计时供逐事件分析的证据。 保存源码、状态、参考图和性能。",
    "tags": [
      "第13章 剖析着色器性能",
      "验收"
    ]
  },
  {
    "id": "psd-14-optimizing-shaders-1",
    "chapter": "psd-14-optimizing-shaders",
    "level": 1,
    "question": "第14章 优化着色器中的顶点搬移是什么？",
    "answer": "把可安全插值的片元计算提前到低频顶点阶段。",
    "tags": [
      "第14章 优化着色器",
      "顶点搬移"
    ]
  },
  {
    "id": "psd-14-optimizing-shaders-2",
    "chapter": "psd-14-optimizing-shaders",
    "level": 2,
    "question": "第14章 优化着色器如何连接动态分支与MAD？",
    "answer": "运行时按数据选择路径、可能导致同一执行组发散的条件分支。 融合乘加或易被硬件高效执行的乘加表达。 必须标注阶段与空间。",
    "tags": [
      "第14章 优化着色器",
      "数据流"
    ]
  },
  {
    "id": "psd-14-optimizing-shaders-3",
    "chapter": "psd-14-optimizing-shaders",
    "level": 3,
    "question": "第14章 优化着色器的关键反例是什么？",
    "answer": "为了减少片元指令把非线性高光放到顶点阶段，低多边形模型出现明显断层。 用最小输入和GPU捕获定位。",
    "tags": [
      "第14章 优化着色器",
      "反例"
    ]
  },
  {
    "id": "psd-14-optimizing-shaders-4",
    "chapter": "psd-14-optimizing-shaders",
    "level": 4,
    "question": "第14章 优化着色器如何验收过度绘制？",
    "answer": "同一像素被多次片元着色但早期结果被覆盖的浪费。 保存源码、状态、参考图和性能。",
    "tags": [
      "第14章 优化着色器",
      "验收"
    ]
  },
  {
    "id": "psd-15-precision-1",
    "chapter": "psd-15-precision",
    "level": 1,
    "question": "第15章 精度中的浮点精度是什么？",
    "answer": "由符号、指数和尾数组成、相对间距随数量级变化的表示能力。",
    "tags": [
      "第15章 精度",
      "浮点精度"
    ]
  },
  {
    "id": "psd-15-precision-2",
    "chapter": "psd-15-precision",
    "level": 2,
    "question": "第15章 精度如何连接有效位与灾难性消减？",
    "answer": "决定相邻可表示数之间相对精细程度的尾数位。 两个接近大数相减导致有效位大量丢失的现象。 必须标注阶段与空间。",
    "tags": [
      "第15章 精度",
      "数据流"
    ]
  },
  {
    "id": "psd-15-precision-3",
    "chapter": "psd-15-precision",
    "level": 3,
    "question": "第15章 精度的关键反例是什么？",
    "answer": "把全局累计时间直接传入低精度Shader，运行数小时后动画开始跳帧。 用最小输入和GPU捕获定位。",
    "tags": [
      "第15章 精度",
      "反例"
    ]
  },
  {
    "id": "psd-15-precision-4",
    "chapter": "psd-15-precision",
    "level": 4,
    "question": "第15章 精度如何验收精度预算？",
    "answer": "按变量范围、误差传播和平台能力选择类型的证据。 保存源码、状态、参考图和性能。",
    "tags": [
      "第15章 精度",
      "验收"
    ]
  },
  {
    "id": "psd-16-writing-shaders-unity-1",
    "chapter": "psd-16-writing-shaders-unity",
    "level": 1,
    "question": "第16章 在Unity中编写着色器中的Unity Material是什么？",
    "answer": "保存Shader与属性值并参与渲染提交的Unity资源。",
    "tags": [
      "第16章 在Unity中编写着色器",
      "Unity Material"
    ]
  },
  {
    "id": "psd-16-writing-shaders-unity-2",
    "chapter": "psd-16-writing-shaders-unity",
    "level": 2,
    "question": "第16章 在Unity中编写着色器如何连接ShaderLab与CGPROGRAM？",
    "answer": "声明Properties、SubShader、Pass、标签和状态的Unity语言。 在旧版内置管线Pass中包裹Cg或HLSL程序的代码块。 必须标注阶段与空间。",
    "tags": [
      "第16章 在Unity中编写着色器",
      "数据流"
    ]
  },
  {
    "id": "psd-16-writing-shaders-unity-3",
    "chapter": "psd-16-writing-shaders-unity",
    "level": 3,
    "question": "第16章 在Unity中编写着色器的关键反例是什么？",
    "answer": "把原书GLSL代码机械替换语法，未映射Unity坐标、纹理方向和多光源Pass。 用最小输入和GPU捕获定位。",
    "tags": [
      "第16章 在Unity中编写着色器",
      "反例"
    ]
  },
  {
    "id": "psd-16-writing-shaders-unity-4",
    "chapter": "psd-16-writing-shaders-unity",
    "level": 4,
    "question": "第16章 在Unity中编写着色器如何验收C#属性传递？",
    "answer": "通过Material或MaterialPropertyBlock把运行时参数传给Shader。 保存源码、状态、参考图和性能。",
    "tags": [
      "第16章 在Unity中编写着色器",
      "验收"
    ]
  },
  {
    "id": "psd-17-writing-shaders-ue4-1",
    "chapter": "psd-17-writing-shaders-ue4",
    "level": 1,
    "question": "第17章 在UE4中编写着色器中的UE4材质是什么？",
    "answer": "通过材质图生成引擎Shader并定义表面输入和渲染模式的资源。",
    "tags": [
      "第17章 在UE4中编写着色器",
      "UE4材质"
    ]
  },
  {
    "id": "psd-17-writing-shaders-ue4-2",
    "chapter": "psd-17-writing-shaders-ue4",
    "level": 2,
    "question": "第17章 在UE4中编写着色器如何连接材质实例与节点图？",
    "answer": "共享父材质编译结果并覆盖暴露参数的轻量资源。 以节点和连线表达数学、纹理与材质输出的数据流。 必须标注阶段与空间。",
    "tags": [
      "第17章 在UE4中编写着色器",
      "数据流"
    ]
  },
  {
    "id": "psd-17-writing-shaders-ue4-3",
    "chapter": "psd-17-writing-shaders-ue4",
    "level": 3,
    "question": "第17章 在UE4中编写着色器的关键反例是什么？",
    "answer": "把节点图当没有成本的可视化配置，忽略它生成的采样、分支和Shader变体。 用最小输入和GPU捕获定位。",
    "tags": [
      "第17章 在UE4中编写着色器",
      "反例"
    ]
  },
  {
    "id": "psd-17-writing-shaders-ue4-4",
    "chapter": "psd-17-writing-shaders-ue4",
    "level": 4,
    "question": "第17章 在UE4中编写着色器如何验收参数集合？",
    "answer": "把运行时代码或全局值传入多个材质的UE4机制。 保存源码、状态、参考图和性能。",
    "tags": [
      "第17章 在UE4中编写着色器",
      "验收"
    ]
  },
  {
    "id": "psd-18-writing-shaders-godot-1",
    "chapter": "psd-18-writing-shaders-godot",
    "level": 1,
    "question": "第18章 在Godot中编写着色器中的Godot ShaderMaterial是什么？",
    "answer": "关联Godot着色器资源和uniform参数的材质。",
    "tags": [
      "第18章 在Godot中编写着色器",
      "Godot ShaderMaterial"
    ]
  },
  {
    "id": "psd-18-writing-shaders-godot-2",
    "chapter": "psd-18-writing-shaders-godot",
    "level": 2,
    "question": "第18章 在Godot中编写着色器如何连接shader_type与内置变量？",
    "answer": "声明spatial、canvas_item等着色上下文的指令。 Godot按vertex或fragment函数提供并接收的VERTEX、UV、ALBEDO等变量。 必须标注阶段与空间。",
    "tags": [
      "第18章 在Godot中编写着色器",
      "数据流"
    ]
  },
  {
    "id": "psd-18-writing-shaders-godot-3",
    "chapter": "psd-18-writing-shaders-godot",
    "level": 3,
    "question": "第18章 在Godot中编写着色器的关键反例是什么？",
    "answer": "只移植数学表达式，没有设置Godot render_mode，透明与深度行为和原效果不同。 用最小输入和GPU捕获定位。",
    "tags": [
      "第18章 在Godot中编写着色器",
      "反例"
    ]
  },
  {
    "id": "psd-18-writing-shaders-godot-4",
    "chapter": "psd-18-writing-shaders-godot",
    "level": 4,
    "question": "第18章 在Godot中编写着色器如何验收脚本参数传递？",
    "answer": "用set_shader_parameter把游戏脚本数据传入uniform。 保存源码、状态、参考图和性能。",
    "tags": [
      "第18章 在Godot中编写着色器",
      "验收"
    ]
  },
  {
    "id": "psd-appendix-a-code-snippets-1",
    "chapter": "psd-appendix-a-code-snippets",
    "level": 1,
    "question": "附录A 重要代码片段中的切线生成是什么？",
    "answer": "由三角形位置与UV梯度计算每顶点切线并累积正交化的过程。",
    "tags": [
      "附录A 重要代码片段",
      "切线生成"
    ]
  },
  {
    "id": "psd-appendix-a-code-snippets-2",
    "chapter": "psd-appendix-a-code-snippets",
    "level": 2,
    "question": "附录A 重要代码片段如何连接UV退化与Gram-Schmidt？",
    "answer": "三角形UV面积接近零、无法稳定求切线的情况。 从切线中去除法线分量以获得正交基的步骤。 必须标注阶段与空间。",
    "tags": [
      "附录A 重要代码片段",
      "数据流"
    ]
  },
  {
    "id": "psd-appendix-a-code-snippets-3",
    "chapter": "psd-appendix-a-code-snippets",
    "level": 3,
    "question": "附录A 重要代码片段的关键反例是什么？",
    "answer": "UV面积为零仍直接除行列式，产生NaN并污染整个共享顶点的切线。 用最小输入和GPU捕获定位。",
    "tags": [
      "附录A 重要代码片段",
      "反例"
    ]
  },
  {
    "id": "psd-appendix-a-code-snippets-4",
    "chapter": "psd-appendix-a-code-snippets",
    "level": 4,
    "question": "附录A 重要代码片段如何验收支持代码证书？",
    "answer": "记录代码版本、输入假设和章节调用点的附录验收信息。 保存源码、状态、参考图和性能。",
    "tags": [
      "附录A 重要代码片段",
      "验收"
    ]
  }
];
