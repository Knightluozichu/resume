import type { ReviewQuestion } from "./types";
export const usfOfficialChapterQuestions: ReviewQuestion[]=[
  {
    "id": "usf-01-diffuse-shading-1",
    "chapter": "usf-01-diffuse-shading",
    "level": 1,
    "question": "第1章 漫反射着色中“表面着色器”承担什么任务？",
    "answer": "由Unity生成底层光照Pass的高层材质描述。",
    "tags": [
      "第1章 漫反射着色",
      "表面着色器"
    ]
  },
  {
    "id": "usf-01-diffuse-shading-2",
    "chapter": "usf-01-diffuse-shading",
    "level": 2,
    "question": "第1章 漫反射着色如何连接“Properties”与“Lambert”？",
    "answer": "把颜色、范围和纹理暴露给材质面板的参数块。 按法线与光线夹角余弦计算理想漫反射的模型。 必须标注实际Pass与输入来源。",
    "tags": [
      "第1章 漫反射着色",
      "数据流"
    ]
  },
  {
    "id": "usf-01-diffuse-shading-3",
    "chapter": "usf-01-diffuse-shading",
    "level": 3,
    "question": "第1章 漫反射着色最关键的失败反例是什么？",
    "answer": "把Half Lambert或渐变贴图称为物理漫反射，没有说明它们为了风格化改变了响应曲线。 应用最小场景和帧捕获定位。",
    "tags": [
      "第1章 漫反射着色",
      "反例"
    ]
  },
  {
    "id": "usf-01-diffuse-shading-4",
    "chapter": "usf-01-diffuse-shading",
    "level": 4,
    "question": "怎样用“Ramp BRDF”验收第1章 漫反射着色？",
    "answer": "用一维或二维渐变纹理重新映射光照响应。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第1章 漫反射着色",
      "验收"
    ]
  },
  {
    "id": "usf-02-texture-effects-1",
    "chapter": "usf-02-texture-effects",
    "level": 1,
    "question": "第2章 使用纹理贴图制作特效中“UV滚动”承担什么任务？",
    "answer": "随时间偏移纹理坐标形成运动的技术。",
    "tags": [
      "第2章 使用纹理贴图制作特效",
      "UV滚动"
    ]
  },
  {
    "id": "usf-02-texture-effects-2",
    "chapter": "usf-02-texture-effects",
    "level": 2,
    "question": "第2章 使用纹理贴图制作特效如何连接“精灵表单”与“通道打包”？",
    "answer": "在一张图集中按帧索引选择子区域的动画资源。 把多个标量遮罩存入RGBA不同通道以减少纹理数量。 必须标注实际Pass与输入来源。",
    "tags": [
      "第2章 使用纹理贴图制作特效",
      "数据流"
    ]
  },
  {
    "id": "usf-02-texture-effects-3",
    "chapter": "usf-02-texture-effects",
    "level": 3,
    "question": "第2章 使用纹理贴图制作特效最关键的失败反例是什么？",
    "answer": "纹理滚动使用逐帧累加坐标，帧率变化后速度和精度都不稳定。 应用最小场景和帧捕获定位。",
    "tags": [
      "第2章 使用纹理贴图制作特效",
      "反例"
    ]
  },
  {
    "id": "usf-02-texture-effects-4",
    "chapter": "usf-02-texture-effects",
    "level": 4,
    "question": "怎样用“色阶”验收第2章 使用纹理贴图制作特效？",
    "answer": "按输入黑场、白场和伽马重映射颜色范围的操作。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第2章 使用纹理贴图制作特效",
      "验收"
    ]
  },
  {
    "id": "usf-03-specular-reflection-1",
    "chapter": "usf-03-specular-reflection",
    "level": 1,
    "question": "第3章 利用镜面反射让游戏闪耀起来中“Phong高光”承担什么任务？",
    "answer": "用反射向量与视线夹角计算镜面响应。",
    "tags": [
      "第3章 利用镜面反射让游戏闪耀起来",
      "Phong高光"
    ]
  },
  {
    "id": "usf-03-specular-reflection-2",
    "chapter": "usf-03-specular-reflection",
    "level": 2,
    "question": "第3章 利用镜面反射让游戏闪耀起来如何连接“Blinn-Phong”与“高光遮罩”？",
    "answer": "用半角向量与法线夹角计算镜面响应。 按纹理控制不同区域镜面强度的标量。 必须标注实际Pass与输入来源。",
    "tags": [
      "第3章 利用镜面反射让游戏闪耀起来",
      "数据流"
    ]
  },
  {
    "id": "usf-03-specular-reflection-3",
    "chapter": "usf-03-specular-reflection",
    "level": 3,
    "question": "第3章 利用镜面反射让游戏闪耀起来最关键的失败反例是什么？",
    "answer": "把未归一化插值法线直接用于高指数高光，镜头移动时高光形状跳变。 应用最小场景和帧捕获定位。",
    "tags": [
      "第3章 利用镜面反射让游戏闪耀起来",
      "反例"
    ]
  },
  {
    "id": "usf-03-specular-reflection-4",
    "chapter": "usf-03-specular-reflection",
    "level": 4,
    "question": "怎样用“各向异性”验收第3章 利用镜面反射让游戏闪耀起来？",
    "answer": "高光沿切线与副切线方向呈现不同形状的反射。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第3章 利用镜面反射让游戏闪耀起来",
      "验收"
    ]
  },
  {
    "id": "usf-04-shader-reflections-1",
    "chapter": "usf-04-shader-reflections",
    "level": 1,
    "question": "第4章 着色器的反射中“Cubemap”承担什么任务？",
    "answer": "按三维方向采样环境颜色的立方体纹理。",
    "tags": [
      "第4章 着色器的反射",
      "Cubemap"
    ]
  },
  {
    "id": "usf-04-shader-reflections-2",
    "chapter": "usf-04-shader-reflections",
    "level": 2,
    "question": "第4章 着色器的反射如何连接“反射向量”与“反射遮罩”？",
    "answer": "由视线和表面法线计算的环境查询方向。 控制材质各区域环境反射权重的纹理。 必须标注实际Pass与输入来源。",
    "tags": [
      "第4章 着色器的反射",
      "数据流"
    ]
  },
  {
    "id": "usf-04-shader-reflections-3",
    "chapter": "usf-04-shader-reflections",
    "level": 3,
    "question": "第4章 着色器的反射最关键的失败反例是什么？",
    "answer": "每帧完整渲染六个面且未排除反射对象自身，造成巨大成本和递归伪影。 应用最小场景和帧捕获定位。",
    "tags": [
      "第4章 着色器的反射",
      "反例"
    ]
  },
  {
    "id": "usf-04-shader-reflections-4",
    "chapter": "usf-04-shader-reflections",
    "level": 4,
    "question": "怎样用“动态立方图”验收第4章 着色器的反射？",
    "answer": "运行时从对象附近六个方向更新的环境纹理。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第4章 着色器的反射",
      "验收"
    ]
  },
  {
    "id": "usf-05-custom-lighting-models-1",
    "chapter": "usf-05-custom-lighting-models",
    "level": 1,
    "question": "第5章 创建自定义光照模型中“自定义光照函数”承担什么任务？",
    "answer": "按Unity约定接收Surface输出与灯光并返回颜色的函数。",
    "tags": [
      "第5章 创建自定义光照模型",
      "自定义光照函数"
    ]
  },
  {
    "id": "usf-05-custom-lighting-models-2",
    "chapter": "usf-05-custom-lighting-models",
    "level": 2,
    "question": "第5章 创建自定义光照模型如何连接“皮肤近似”与“边缘光”？",
    "answer": "用Wrap、颜色层或多项漫反射近似柔软有机表面。 按视线与法线夹角强调轮廓的发光项。 必须标注实际Pass与输入来源。",
    "tags": [
      "第5章 创建自定义光照模型",
      "数据流"
    ]
  },
  {
    "id": "usf-05-custom-lighting-models-3",
    "chapter": "usf-05-custom-lighting-models",
    "level": 3,
    "question": "第5章 创建自定义光照模型最关键的失败反例是什么？",
    "answer": "自定义函数重复乘光源颜色或衰减，单灯正常但多灯和阴影下亮度失控。 应用最小场景和帧捕获定位。",
    "tags": [
      "第5章 创建自定义光照模型",
      "反例"
    ]
  },
  {
    "id": "usf-05-custom-lighting-models-4",
    "chapter": "usf-05-custom-lighting-models",
    "level": 4,
    "question": "怎样用“模型证书”验收第5章 创建自定义光照模型？",
    "answer": "保存每个光照项的独立调试输出和最终合成。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第5章 创建自定义光照模型",
      "验收"
    ]
  },
  {
    "id": "usf-06-transparency-1",
    "chapter": "usf-06-transparency",
    "level": 1,
    "question": "第6章 透明度中“Alpha混合”承担什么任务？",
    "answer": "按源Alpha把透明表面颜色与背景组合。",
    "tags": [
      "第6章 透明度",
      "Alpha混合"
    ]
  },
  {
    "id": "usf-06-transparency-2",
    "chapter": "usf-06-transparency",
    "level": 2,
    "question": "第6章 透明度如何连接“Alpha裁剪”与“渲染队列”？",
    "answer": "按阈值完全保留或丢弃片元的硬边透明。 控制不透明、裁剪和透明对象执行大类顺序。 必须标注实际Pass与输入来源。",
    "tags": [
      "第6章 透明度",
      "数据流"
    ]
  },
  {
    "id": "usf-06-transparency-3",
    "chapter": "usf-06-transparency",
    "level": 3,
    "question": "第6章 透明度最关键的失败反例是什么？",
    "answer": "开启Alpha输出却仍在Geometry队列写深度，透明对象前后关系随相机变化错误。 应用最小场景和帧捕获定位。",
    "tags": [
      "第6章 透明度",
      "反例"
    ]
  },
  {
    "id": "usf-06-transparency-4",
    "chapter": "usf-06-transparency",
    "level": 4,
    "question": "怎样用“GUI透明”验收第6章 透明度？",
    "answer": "在界面纹理与字体上保留Alpha和混合语义的处理。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第6章 透明度",
      "验收"
    ]
  },
  {
    "id": "usf-07-vertex-magic-1",
    "chapter": "usf-07-vertex-magic",
    "level": 1,
    "question": "第7章 顶点魔法中“顶点颜色”承担什么任务？",
    "answer": "存储在网格顶点上的RGBA属性，可作颜色或混合权重。",
    "tags": [
      "第7章 顶点魔法",
      "顶点颜色"
    ]
  },
  {
    "id": "usf-07-vertex-magic-2",
    "chapter": "usf-07-vertex-magic",
    "level": 2,
    "question": "第7章 顶点魔法如何连接“顶点函数”与“顶点动画”？",
    "answer": "在Surface Shader生成路径前修改顶点位置或自定义数据的函数。 按时间与顶点属性改变几何位置形成运动。 必须标注实际Pass与输入来源。",
    "tags": [
      "第7章 顶点魔法",
      "数据流"
    ]
  },
  {
    "id": "usf-07-vertex-magic-3",
    "chapter": "usf-07-vertex-magic",
    "level": 3,
    "question": "第7章 顶点魔法最关键的失败反例是什么？",
    "answer": "在顶点极少的平面上实现高频波浪，继续提高频率却没有增加可表达的几何采样。 应用最小场景和帧捕获定位。",
    "tags": [
      "第7章 顶点魔法",
      "反例"
    ]
  },
  {
    "id": "usf-07-vertex-magic-4",
    "chapter": "usf-07-vertex-magic",
    "level": 4,
    "question": "怎样用“地形混合”验收第7章 顶点魔法？",
    "answer": "利用顶点颜色通道在多层地表材质之间选择权重。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第7章 顶点魔法",
      "验收"
    ]
  },
  {
    "id": "usf-08-mobile-shader-optimization-1",
    "chapter": "usf-08-mobile-shader-optimization",
    "level": 1,
    "question": "第8章 移动平台上着色器的优化中“轻型着色器”承担什么任务？",
    "answer": "以目标画质下较少纹理、指令、插值器和变体为约束的Shader。",
    "tags": [
      "第8章 移动平台上着色器的优化",
      "轻型着色器"
    ]
  },
  {
    "id": "usf-08-mobile-shader-optimization-2",
    "chapter": "usf-08-mobile-shader-optimization",
    "level": 2,
    "question": "第8章 移动平台上着色器的优化如何连接“性能分析”与“精度类型”？",
    "answer": "用目标设备工具定位顶点、片元、带宽或提交瓶颈。 用fixed、half和float表达范围精度与平台成本的选择。 必须标注实际Pass与输入来源。",
    "tags": [
      "第8章 移动平台上着色器的优化",
      "数据流"
    ]
  },
  {
    "id": "usf-08-mobile-shader-optimization-3",
    "chapter": "usf-08-mobile-shader-optimization",
    "level": 3,
    "question": "第8章 移动平台上着色器的优化最关键的失败反例是什么？",
    "answer": "一次性改低精度、压纹理和删光照，帧率变快却无法判断收益来自哪项、画质损失来自哪项。 应用最小场景和帧捕获定位。",
    "tags": [
      "第8章 移动平台上着色器的优化",
      "反例"
    ]
  },
  {
    "id": "usf-08-mobile-shader-optimization-4",
    "chapter": "usf-08-mobile-shader-optimization",
    "level": 4,
    "question": "怎样用“移动修改”验收第8章 移动平台上着色器的优化？",
    "answer": "针对Tile GPU、过度绘制和热预算调整实现的过程。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第8章 移动平台上着色器的优化",
      "验收"
    ]
  },
  {
    "id": "usf-09-cginclude-modularity-1",
    "chapter": "usf-09-cginclude-modularity",
    "level": 1,
    "question": "第9章 使用CgInclude文件让着色器模块化中“CgInclude”承担什么任务？",
    "answer": "用include复用结构、函数、宏和常量的源文件。",
    "tags": [
      "第9章 使用CgInclude文件让着色器模块化",
      "CgInclude"
    ]
  },
  {
    "id": "usf-09-cginclude-modularity-2",
    "chapter": "usf-09-cginclude-modularity",
    "level": 2,
    "question": "第9章 使用CgInclude文件让着色器模块化如何连接“内置包含文件”与“自定义光照库”？",
    "answer": "Unity提供矩阵、光照和平台辅助定义的cginc文件。 把经过测试的光照函数集中维护并供多个Shader使用。 必须标注实际Pass与输入来源。",
    "tags": [
      "第9章 使用CgInclude文件让着色器模块化",
      "数据流"
    ]
  },
  {
    "id": "usf-09-cginclude-modularity-3",
    "chapter": "usf-09-cginclude-modularity",
    "level": 3,
    "question": "第9章 使用CgInclude文件让着色器模块化最关键的失败反例是什么？",
    "answer": "包含文件直接读取调用方未声明的全局变量，某些Shader碰巧可编译，另一些因命名或顺序失败。 应用最小场景和帧捕获定位。",
    "tags": [
      "第9章 使用CgInclude文件让着色器模块化",
      "反例"
    ]
  },
  {
    "id": "usf-09-cginclude-modularity-4",
    "chapter": "usf-09-cginclude-modularity",
    "level": 4,
    "question": "怎样用“依赖契约”验收第9章 使用CgInclude文件让着色器模块化？",
    "answer": "声明包含文件需要的变量、结构、空间和关键字的接口。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第9章 使用CgInclude文件让着色器模块化",
      "验收"
    ]
  },
  {
    "id": "usf-10-rendertexture-screen-effects-1",
    "chapter": "usf-10-rendertexture-screen-effects",
    "level": 1,
    "question": "第10章 使用Unity的渲染纹理实现屏幕特效中“RenderTexture”承担什么任务？",
    "answer": "存放相机结果和多Pass中间图像的GPU纹理目标。",
    "tags": [
      "第10章 使用Unity的渲染纹理实现屏幕特效",
      "RenderTexture"
    ]
  },
  {
    "id": "usf-10-rendertexture-screen-effects-2",
    "chapter": "usf-10-rendertexture-screen-effects",
    "level": 2,
    "question": "第10章 使用Unity的渲染纹理实现屏幕特效如何连接“OnRenderImage”与“Graphics.Blit”？",
    "answer": "内置管线中接收源图并输出目标图的后处理回调。 用全屏采样Pass从源纹理写到目标纹理的操作。 必须标注实际Pass与输入来源。",
    "tags": [
      "第10章 使用Unity的渲染纹理实现屏幕特效",
      "数据流"
    ]
  },
  {
    "id": "usf-10-rendertexture-screen-effects-3",
    "chapter": "usf-10-rendertexture-screen-effects",
    "level": 3,
    "question": "第10章 使用Unity的渲染纹理实现屏幕特效最关键的失败反例是什么？",
    "answer": "源和目标引用同一RenderTexture，反馈采样让结果依赖GPU调度而不可复现。 应用最小场景和帧捕获定位。",
    "tags": [
      "第10章 使用Unity的渲染纹理实现屏幕特效",
      "反例"
    ]
  },
  {
    "id": "usf-10-rendertexture-screen-effects-4",
    "chapter": "usf-10-rendertexture-screen-effects",
    "level": 4,
    "question": "怎样用“混合模式”验收第10章 使用Unity的渲染纹理实现屏幕特效？",
    "answer": "按源图、效果图和公式进行Photoshop式像素组合。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第10章 使用Unity的渲染纹理实现屏幕特效",
      "验收"
    ]
  },
  {
    "id": "usf-11-gameplay-screen-effects-1",
    "chapter": "usf-11-gameplay-screen-effects",
    "level": 1,
    "question": "第11章 游戏的可玩性和屏幕特效中“老电影效果”承担什么任务？",
    "answer": "组合色调、颗粒、划痕、抖动和暗角形成的风格化后处理。",
    "tags": [
      "第11章 游戏的可玩性和屏幕特效",
      "老电影效果"
    ]
  },
  {
    "id": "usf-11-gameplay-screen-effects-2",
    "chapter": "usf-11-gameplay-screen-effects",
    "level": 2,
    "question": "第11章 游戏的可玩性和屏幕特效如何连接“夜视效果”与“时间噪声”？",
    "answer": "组合绿色响应、增益、噪声和暗角模拟夜视设备的效果。 随时间变化但需要控制闪烁频率和重复性的随机纹理。 必须标注实际Pass与输入来源。",
    "tags": [
      "第11章 游戏的可玩性和屏幕特效",
      "数据流"
    ]
  },
  {
    "id": "usf-11-gameplay-screen-effects-3",
    "chapter": "usf-11-gameplay-screen-effects",
    "level": 3,
    "question": "第11章 游戏的可玩性和屏幕特效最关键的失败反例是什么？",
    "answer": "只把画面乘绿色就称为夜视，没有增益、噪声、视野边界和玩法状态控制。 应用最小场景和帧捕获定位。",
    "tags": [
      "第11章 游戏的可玩性和屏幕特效",
      "反例"
    ]
  },
  {
    "id": "usf-11-gameplay-screen-effects-4",
    "chapter": "usf-11-gameplay-screen-effects",
    "level": 4,
    "question": "怎样用“玩法反馈”验收第11章 游戏的可玩性和屏幕特效？",
    "answer": "让视觉效果表达受伤、装备、环境或状态而不遮蔽关键信息。 保存源码、状态、参考图、GPU事件和CPU/GPU计时。",
    "tags": [
      "第11章 游戏的可玩性和屏幕特效",
      "验收"
    ]
  }
];
