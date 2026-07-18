import type { ReviewQuestion } from "./types";
export const usebOfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "useb-01-welcome-shader-world-1",
    "chapter": "useb-01-welcome-shader-world",
    "level": 1,
    "question": "第1章 欢迎来到Shader的世界中的Shader是什么？",
    "answer": "运行在GPU可编程阶段、把输入属性转换为顶点位置或像素颜色的程序。",
    "tags": [
      "第1章 欢迎来到Shader的世界",
      "Shader"
    ]
  },
  {
    "id": "useb-01-welcome-shader-world-2",
    "chapter": "useb-01-welcome-shader-world",
    "level": 2,
    "question": "第1章 欢迎来到Shader的世界如何连接效果分解和技术美术协作？",
    "answer": "把最终画面拆成几何、光照、纹理、透明与后处理等可验证层次。 程序、美术与工具共同约定材质参数、视觉目标和性能预算。 必须标注阶段、空间与输入。",
    "tags": [
      "第1章 欢迎来到Shader的世界",
      "数据流"
    ]
  },
  {
    "id": "useb-01-welcome-shader-world-3",
    "chapter": "useb-01-welcome-shader-world",
    "level": 3,
    "question": "第1章 欢迎来到Shader的世界最容易出现什么状态或边界错误？",
    "answer": "只追求截图相似而没有记录光照、色彩空间、材质和相机条件，效果无法复现。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第1章 欢迎来到Shader的世界",
      "反例"
    ]
  },
  {
    "id": "useb-01-welcome-shader-world-4",
    "chapter": "useb-01-welcome-shader-world",
    "level": 4,
    "question": "第1章 欢迎来到Shader的世界如何验收视觉验收？",
    "answer": "同时保存参考图、材质参数、帧调试记录和性能指标的验收方式。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第1章 欢迎来到Shader的世界",
      "验收"
    ]
  },
  {
    "id": "useb-02-rendering-pipeline-1",
    "chapter": "useb-02-rendering-pipeline",
    "level": 1,
    "question": "第2章 渲染流水线中的渲染流水线是什么？",
    "answer": "把场景数据依次转换为屏幕片元并写入帧缓冲的一组逻辑与硬件阶段。",
    "tags": [
      "第2章 渲染流水线",
      "渲染流水线"
    ]
  },
  {
    "id": "useb-02-rendering-pipeline-2",
    "chapter": "useb-02-rendering-pipeline",
    "level": 2,
    "question": "第2章 渲染流水线如何连接Draw Call和顶点着色器？",
    "answer": "CPU提交一次绘制状态、资源和图元范围给图形API的命令。 对单个顶点执行坐标变换并输出后续阶段插值属性的可编程阶段。 必须标注阶段、空间与输入。",
    "tags": [
      "第2章 渲染流水线",
      "数据流"
    ]
  },
  {
    "id": "useb-02-rendering-pipeline-3",
    "chapter": "useb-02-rendering-pipeline",
    "level": 3,
    "question": "第2章 渲染流水线最容易出现什么状态或边界错误？",
    "answer": "把片元着色器输出当最终屏幕颜色，忽略深度、模板、混合和颜色空间转换。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第2章 渲染流水线",
      "反例"
    ]
  },
  {
    "id": "useb-02-rendering-pipeline-4",
    "chapter": "useb-02-rendering-pipeline",
    "level": 4,
    "question": "第2章 渲染流水线如何验收逐片元操作？",
    "answer": "在写颜色前执行深度、模板、混合等测试和更新的阶段。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第2章 渲染流水线",
      "验收"
    ]
  },
  {
    "id": "useb-03-unity-shader-basics-1",
    "chapter": "useb-03-unity-shader-basics",
    "level": 1,
    "question": "第3章 Unity Shader基础中的Material是什么？",
    "answer": "保存Shader引用与属性实例值，并参与渲染状态选择的Unity资源。",
    "tags": [
      "第3章 Unity Shader基础",
      "Material"
    ]
  },
  {
    "id": "useb-03-unity-shader-basics-2",
    "chapter": "useb-03-unity-shader-basics",
    "level": 2,
    "question": "第3章 Unity Shader基础如何连接ShaderLab和Properties？",
    "answer": "Unity用于声明属性、子着色器、Pass、标签和渲染状态的描述语言。 暴露给材质面板和脚本的参数声明区。 必须标注阶段、空间与输入。",
    "tags": [
      "第3章 Unity Shader基础",
      "数据流"
    ]
  },
  {
    "id": "useb-03-unity-shader-basics-3",
    "chapter": "useb-03-unity-shader-basics",
    "level": 3,
    "question": "第3章 Unity Shader基础最容易出现什么状态或边界错误？",
    "answer": "只在Properties声明参数却没有在HLSL程序中声明同名变量，误以为GPU会自动获得值。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第3章 Unity Shader基础",
      "反例"
    ]
  },
  {
    "id": "useb-03-unity-shader-basics-4",
    "chapter": "useb-03-unity-shader-basics",
    "level": 4,
    "question": "第3章 Unity Shader基础如何验收Pass？",
    "answer": "定义一次具体绘制的状态与GPU程序入口。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第3章 Unity Shader基础",
      "验收"
    ]
  },
  {
    "id": "useb-04-shader-mathematics-1",
    "chapter": "useb-04-shader-mathematics",
    "level": 1,
    "question": "第4章 学习Shader所需的数学基础中的坐标空间是什么？",
    "answer": "为点和方向选择原点、基向量与手性后形成的表示系统。",
    "tags": [
      "第4章 学习Shader所需的数学基础",
      "坐标空间"
    ]
  },
  {
    "id": "useb-04-shader-mathematics-2",
    "chapter": "useb-04-shader-mathematics",
    "level": 2,
    "question": "第4章 学习Shader所需的数学基础如何连接点积和叉积？",
    "answer": "衡量两个向量方向一致程度并用于投影和夹角计算的标量运算。 产生垂直于两个输入向量、方向由手性决定的向量运算。 必须标注阶段、空间与输入。",
    "tags": [
      "第4章 学习Shader所需的数学基础",
      "数据流"
    ]
  },
  {
    "id": "useb-04-shader-mathematics-3",
    "chapter": "useb-04-shader-mathematics",
    "level": 3,
    "question": "第4章 学习Shader所需的数学基础最容易出现什么状态或边界错误？",
    "answer": "对法线使用和顶点相同的模型矩阵，在非统一缩放模型上得到倾斜且长度错误的光照。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第4章 学习Shader所需的数学基础",
      "反例"
    ]
  },
  {
    "id": "useb-04-shader-mathematics-4",
    "chapter": "useb-04-shader-mathematics",
    "level": 4,
    "question": "第4章 学习Shader所需的数学基础如何验收逆转置矩阵？",
    "answer": "在非统一缩放下保持法线与切平面正交的变换矩阵。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第4章 学习Shader所需的数学基础",
      "验收"
    ]
  },
  {
    "id": "useb-05-first-unity-shader-1",
    "chapter": "useb-05-first-unity-shader",
    "level": 1,
    "question": "第5章 开始Unity Shader学习之旅中的语义是什么？",
    "answer": "标注结构字段在图形流水线中的输入输出用途与寄存器契约。",
    "tags": [
      "第5章 开始Unity Shader学习之旅",
      "语义"
    ]
  },
  {
    "id": "useb-05-first-unity-shader-2",
    "chapter": "useb-05-first-unity-shader",
    "level": 2,
    "question": "第5章 开始Unity Shader学习之旅如何连接appdata和v2f？",
    "answer": "从网格顶点流读取位置、法线、切线、颜色和纹理坐标的输入结构。 从顶点阶段输出并经光栅化插值后送入片元阶段的结构。 必须标注阶段、空间与输入。",
    "tags": [
      "第5章 开始Unity Shader学习之旅",
      "数据流"
    ]
  },
  {
    "id": "useb-05-first-unity-shader-3",
    "chapter": "useb-05-first-unity-shader",
    "level": 3,
    "question": "第5章 开始Unity Shader学习之旅最容易出现什么状态或边界错误？",
    "answer": "一次写完整效果后才调试，无法判断错误来自网格输入、空间变换、插值还是片元计算。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第5章 开始Unity Shader学习之旅",
      "反例"
    ]
  },
  {
    "id": "useb-05-first-unity-shader-4",
    "chapter": "useb-05-first-unity-shader",
    "level": 4,
    "question": "第5章 开始Unity Shader学习之旅如何验收颜色调试？",
    "answer": "把中间标量或向量映射为屏幕颜色以定位Shader数据错误。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第5章 开始Unity Shader学习之旅",
      "验收"
    ]
  },
  {
    "id": "useb-06-basic-lighting-1",
    "chapter": "useb-06-basic-lighting",
    "level": 1,
    "question": "第6章 Unity中的基础光照中的BRDF是什么？",
    "answer": "给定入射和出射方向时描述表面反射比例的函数。",
    "tags": [
      "第6章 Unity中的基础光照",
      "BRDF"
    ]
  },
  {
    "id": "useb-06-basic-lighting-2",
    "chapter": "useb-06-basic-lighting",
    "level": 2,
    "question": "第6章 Unity中的基础光照如何连接Lambert漫反射和半Lambert？",
    "answer": "以法线和光线方向夹角余弦控制明暗的理想漫反射模型。 把点积从负一到一重映射到零到一以缓和背光区域的经验模型。 必须标注阶段、空间与输入。",
    "tags": [
      "第6章 Unity中的基础光照",
      "数据流"
    ]
  },
  {
    "id": "useb-06-basic-lighting-3",
    "chapter": "useb-06-basic-lighting",
    "level": 3,
    "question": "第6章 Unity中的基础光照最容易出现什么状态或边界错误？",
    "answer": "在模型空间法线与世界空间光线之间直接点积，模型旋转后光照像粘在物体上。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第6章 Unity中的基础光照",
      "反例"
    ]
  },
  {
    "id": "useb-06-basic-lighting-4",
    "chapter": "useb-06-basic-lighting",
    "level": 4,
    "question": "第6章 Unity中的基础光照如何验收Blinn-Phong？",
    "answer": "用法线与光线观察半程向量夹角近似高光的模型。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第6章 Unity中的基础光照",
      "验收"
    ]
  },
  {
    "id": "useb-07-basic-textures-1",
    "chapter": "useb-07-basic-textures",
    "level": 1,
    "question": "第7章 基础纹理中的纹理坐标是什么？",
    "answer": "把表面位置映射到纹理采样域的二维参数。",
    "tags": [
      "第7章 基础纹理",
      "纹理坐标"
    ]
  },
  {
    "id": "useb-07-basic-textures-2",
    "chapter": "useb-07-basic-textures",
    "level": 2,
    "question": "第7章 基础纹理如何连接采样器和高度纹理？",
    "answer": "规定过滤、寻址和纹理读取行为的GPU状态。 以标量高度及其差分近似表面凹凸的纹理。 必须标注阶段、空间与输入。",
    "tags": [
      "第7章 基础纹理",
      "数据流"
    ]
  },
  {
    "id": "useb-07-basic-textures-3",
    "chapter": "useb-07-basic-textures",
    "level": 3,
    "question": "第7章 基础纹理最容易出现什么状态或边界错误？",
    "answer": "把法线纹理按普通颜色纹理以sRGB读取，解码后的方向产生系统性偏差。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第7章 基础纹理",
      "反例"
    ]
  },
  {
    "id": "useb-07-basic-textures-4",
    "chapter": "useb-07-basic-textures",
    "level": 4,
    "question": "第7章 基础纹理如何验收遮罩纹理？",
    "answer": "用一个或多个通道控制材质局部强度、区域或混合权重的纹理。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第7章 基础纹理",
      "验收"
    ]
  },
  {
    "id": "useb-08-transparency-1",
    "chapter": "useb-08-transparency",
    "level": 1,
    "question": "第8章 透明效果中的渲染队列是什么？",
    "answer": "按材质类别和排序规则决定对象提交先后的Unity机制。",
    "tags": [
      "第8章 透明效果",
      "渲染队列"
    ]
  },
  {
    "id": "useb-08-transparency-2",
    "chapter": "useb-08-transparency",
    "level": 2,
    "question": "第8章 透明效果如何连接透明度测试和透明度混合？",
    "answer": "按阈值丢弃片元并保留深度写入的二值透明方法。 按源和目标因子组合当前片元与帧缓冲颜色的方法。 必须标注阶段、空间与输入。",
    "tags": [
      "第8章 透明效果",
      "数据流"
    ]
  },
  {
    "id": "useb-08-transparency-3",
    "chapter": "useb-08-transparency",
    "level": 3,
    "question": "第8章 透明效果最容易出现什么状态或边界错误？",
    "answer": "关闭深度写入后仍按任意顺序绘制半透明面，模型内部出现前后关系跳变。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第8章 透明效果",
      "反例"
    ]
  },
  {
    "id": "useb-08-transparency-4",
    "chapter": "useb-08-transparency",
    "level": 4,
    "question": "第8章 透明效果如何验收排序歧义？",
    "answer": "物体级远近排序无法正确表示互相穿插或自遮挡透明表面的情况。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第8章 透明效果",
      "验收"
    ]
  },
  {
    "id": "useb-09-complex-lighting-1",
    "chapter": "useb-09-complex-lighting",
    "level": 1,
    "question": "第9章 更复杂的光照中的前向渲染是什么？",
    "answer": "每个对象在Base和Additional Pass中直接累计可见光源贡献的路径。",
    "tags": [
      "第9章 更复杂的光照",
      "前向渲染"
    ]
  },
  {
    "id": "useb-09-complex-lighting-2",
    "chapter": "useb-09-complex-lighting",
    "level": 2,
    "question": "第9章 更复杂的光照如何连接延迟渲染和光照衰减？",
    "answer": "先写几何缓冲，再按光源在屏幕空间计算光照的路径。 按光源类型、距离和Unity纹理或函数减弱光强的因子。 必须标注阶段、空间与输入。",
    "tags": [
      "第9章 更复杂的光照",
      "数据流"
    ]
  },
  {
    "id": "useb-09-complex-lighting-3",
    "chapter": "useb-09-complex-lighting",
    "level": 3,
    "question": "第9章 更复杂的光照最容易出现什么状态或边界错误？",
    "answer": "只验证物体能接收阴影，没有检查它是否生成ShadowCaster Pass，导致其他物体从不被它遮挡。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第9章 更复杂的光照",
      "反例"
    ]
  },
  {
    "id": "useb-09-complex-lighting-4",
    "chapter": "useb-09-complex-lighting",
    "level": 4,
    "question": "第9章 更复杂的光照如何验收阴影接收？",
    "answer": "比较片元光源空间深度与阴影图并把可见性乘入光照的过程。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第9章 更复杂的光照",
      "验收"
    ]
  },
  {
    "id": "useb-10-advanced-textures-1",
    "chapter": "useb-10-advanced-textures",
    "level": 1,
    "question": "第10章 高级纹理中的立方体纹理是什么？",
    "answer": "用方向向量选择六个面并采样环境颜色的纹理。",
    "tags": [
      "第10章 高级纹理",
      "立方体纹理"
    ]
  },
  {
    "id": "useb-10-advanced-textures-2",
    "chapter": "useb-10-advanced-textures",
    "level": 2,
    "question": "第10章 高级纹理如何连接环境映射和菲涅尔项？",
    "answer": "用反射或折射方向查询环境近似间接可见颜色的技术。 反射比例随观察方向接近切线而增大的视角函数。 必须标注阶段、空间与输入。",
    "tags": [
      "第10章 高级纹理",
      "数据流"
    ]
  },
  {
    "id": "useb-10-advanced-textures-3",
    "chapter": "useb-10-advanced-textures",
    "level": 3,
    "question": "第10章 高级纹理最容易出现什么状态或边界错误？",
    "answer": "把环境立方体纹理当真实镜面反射，近处物体没有视差却仍声称结果物理正确。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第10章 高级纹理",
      "反例"
    ]
  },
  {
    "id": "useb-10-advanced-textures-4",
    "chapter": "useb-10-advanced-textures",
    "level": 4,
    "question": "第10章 高级纹理如何验收程序纹理？",
    "answer": "由算法生成颜色、图案或材质属性而非直接来自图像文件的纹理。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第10章 高级纹理",
      "验收"
    ]
  },
  {
    "id": "useb-11-animated-image-1",
    "chapter": "useb-11-animated-image",
    "level": 1,
    "question": "第11章 让画面动起来中的时间变量是什么？",
    "answer": "Unity按帧提供的时间、正弦和余弦组合参数。",
    "tags": [
      "第11章 让画面动起来",
      "时间变量"
    ]
  },
  {
    "id": "useb-11-animated-image-2",
    "chapter": "useb-11-animated-image",
    "level": 2,
    "question": "第11章 让画面动起来如何连接序列帧动画和UV滚动？",
    "answer": "按时间离散选择纹理图集单元形成动画的方法。 给纹理坐标增加随时间变化的偏移以制造流动。 必须标注阶段、空间与输入。",
    "tags": [
      "第11章 让画面动起来",
      "数据流"
    ]
  },
  {
    "id": "useb-11-animated-image-3",
    "chapter": "useb-11-animated-image",
    "level": 3,
    "question": "第11章 让画面动起来最容易出现什么状态或边界错误？",
    "answer": "顶点位移超过原网格包围盒却没有扩大Bounds，动画在视锥边缘突然消失。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第11章 让画面动起来",
      "反例"
    ]
  },
  {
    "id": "useb-11-animated-image-4",
    "chapter": "useb-11-animated-image",
    "level": 4,
    "question": "第11章 让画面动起来如何验收广告牌？",
    "answer": "让平面朝向相机或约束轴以表现粒子、植被等对象的技术。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第11章 让画面动起来",
      "验收"
    ]
  },
  {
    "id": "useb-12-screen-post-effects-1",
    "chapter": "useb-12-screen-post-effects",
    "level": 1,
    "question": "第12章 屏幕后处理效果中的后处理是什么？",
    "answer": "在场景渲染完成后以屏幕纹理为输入执行的全屏图像处理。",
    "tags": [
      "第12章 屏幕后处理效果",
      "后处理"
    ]
  },
  {
    "id": "useb-12-screen-post-effects-2",
    "chapter": "useb-12-screen-post-effects",
    "level": 2,
    "question": "第12章 屏幕后处理效果如何连接卷积核和高斯模糊？",
    "answer": "按邻域固定权重组合像素以提取或平滑特征的小矩阵。 用高斯权重低通滤波，并可拆成水平和垂直两次卷积。 必须标注阶段、空间与输入。",
    "tags": [
      "第12章 屏幕后处理效果",
      "数据流"
    ]
  },
  {
    "id": "useb-12-screen-post-effects-3",
    "chapter": "useb-12-screen-post-effects",
    "level": 3,
    "question": "第12章 屏幕后处理效果最容易出现什么状态或边界错误？",
    "answer": "在LDR且伽马空间直接提取高亮，阈值与能量关系失真并导致Bloom脏灰。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第12章 屏幕后处理效果",
      "反例"
    ]
  },
  {
    "id": "useb-12-screen-post-effects-4",
    "chapter": "useb-12-screen-post-effects",
    "level": 4,
    "question": "第12章 屏幕后处理效果如何验收运动模糊？",
    "answer": "按历史颜色、速度或深度重建位移方向累积样本的效果。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第12章 屏幕后处理效果",
      "验收"
    ]
  },
  {
    "id": "useb-13-depth-normal-textures-1",
    "chapter": "useb-13-depth-normal-textures",
    "level": 1,
    "question": "第13章 使用深度和法线纹理中的深度纹理是什么？",
    "answer": "保存相机可见表面深度或硬件深度编码的屏幕纹理。",
    "tags": [
      "第13章 使用深度和法线纹理",
      "深度纹理"
    ]
  },
  {
    "id": "useb-13-depth-normal-textures-2",
    "chapter": "useb-13-depth-normal-textures",
    "level": 2,
    "question": "第13章 使用深度和法线纹理如何连接深度法线纹理和线性深度？",
    "answer": "在屏幕空间联合编码观察空间法线和深度的纹理。 与观察距离成线性关系、便于物理距离计算的深度值。 必须标注阶段、空间与输入。",
    "tags": [
      "第13章 使用深度和法线纹理",
      "数据流"
    ]
  },
  {
    "id": "useb-13-depth-normal-textures-3",
    "chapter": "useb-13-depth-normal-textures",
    "level": 3,
    "question": "第13章 使用深度和法线纹理最容易出现什么状态或边界错误？",
    "answer": "把设备深度直接当世界距离，近处和远处雾密度及运动向量都严重失真。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第13章 使用深度和法线纹理",
      "反例"
    ]
  },
  {
    "id": "useb-13-depth-normal-textures-4",
    "chapter": "useb-13-depth-normal-textures",
    "level": 4,
    "question": "第13章 使用深度和法线纹理如何验收深度边缘？",
    "answer": "相邻像素深度或法线差异超过阈值时识别出的几何轮廓。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第13章 使用深度和法线纹理",
      "验收"
    ]
  },
  {
    "id": "useb-14-non-photorealistic-rendering-1",
    "chapter": "useb-14-non-photorealistic-rendering",
    "level": 1,
    "question": "第14章 非真实感渲染中的非真实感渲染是什么？",
    "answer": "主动偏离照片真实以强化风格、结构或叙事的渲染方法。",
    "tags": [
      "第14章 非真实感渲染",
      "非真实感渲染"
    ]
  },
  {
    "id": "useb-14-non-photorealistic-rendering-2",
    "chapter": "useb-14-non-photorealistic-rendering",
    "level": 2,
    "question": "第14章 非真实感渲染如何连接色阶纹理和轮廓扩张？",
    "answer": "把连续光照映射为离散或手绘色带的查找纹理。 沿顶点法线或观察空间方向扩张背面并绘制轮廓的几何方法。 必须标注阶段、空间与输入。",
    "tags": [
      "第14章 非真实感渲染",
      "数据流"
    ]
  },
  {
    "id": "useb-14-non-photorealistic-rendering-3",
    "chapter": "useb-14-non-photorealistic-rendering",
    "level": 3,
    "question": "第14章 非真实感渲染最容易出现什么状态或边界错误？",
    "answer": "在模型空间按固定距离扩张轮廓，非统一缩放和透视下轮廓宽度剧烈变化。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第14章 非真实感渲染",
      "反例"
    ]
  },
  {
    "id": "useb-14-non-photorealistic-rendering-4",
    "chapter": "useb-14-non-photorealistic-rendering",
    "level": 4,
    "question": "第14章 非真实感渲染如何验收素描纹理？",
    "answer": "按明暗和方向混合多层笔触纹理以模拟手绘阴影。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第14章 非真实感渲染",
      "验收"
    ]
  },
  {
    "id": "useb-15-noise-1",
    "chapter": "useb-15-noise",
    "level": 1,
    "question": "第15章 使用噪声中的噪声函数是什么？",
    "answer": "在空间上产生伪随机但可控制连续性和频谱的函数。",
    "tags": [
      "第15章 使用噪声",
      "噪声函数"
    ]
  },
  {
    "id": "useb-15-noise-2",
    "chapter": "useb-15-noise",
    "level": 2,
    "question": "第15章 使用噪声如何连接消融阈值和边缘带？",
    "answer": "把噪声值与时间阈值比较并丢弃一侧片元的控制量。 阈值附近保留的窄区间，用于显示发光或烧灼边缘。 必须标注阶段、空间与输入。",
    "tags": [
      "第15章 使用噪声",
      "数据流"
    ]
  },
  {
    "id": "useb-15-noise-3",
    "chapter": "useb-15-noise",
    "level": 3,
    "question": "第15章 使用噪声最容易出现什么状态或边界错误？",
    "answer": "每帧使用独立随机值驱动噪声，空间图案连续但时间上强烈闪烁。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第15章 使用噪声",
      "反例"
    ]
  },
  {
    "id": "useb-15-noise-4",
    "chapter": "useb-15-noise",
    "level": 4,
    "question": "第15章 使用噪声如何验收时空一致性？",
    "answer": "动画噪声在空间邻域与连续帧之间避免随机闪烁的性质。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第15章 使用噪声",
      "验收"
    ]
  },
  {
    "id": "useb-16-rendering-optimization-1",
    "chapter": "useb-16-rendering-optimization",
    "level": 1,
    "question": "第16章 Unity中的渲染优化技术中的性能瓶颈是什么？",
    "answer": "限制帧时间的CPU提交、顶点、片元、带宽或同步阶段。",
    "tags": [
      "第16章 Unity中的渲染优化技术",
      "性能瓶颈"
    ]
  },
  {
    "id": "useb-16-rendering-optimization-2",
    "chapter": "useb-16-rendering-optimization",
    "level": 2,
    "question": "第16章 Unity中的渲染优化技术如何连接批处理和过度绘制？",
    "answer": "合并兼容对象的绘制提交以减少CPU Draw Call开销。 同一屏幕像素被多个片元重复着色但大部分结果最终被覆盖。 必须标注阶段、空间与输入。",
    "tags": [
      "第16章 Unity中的渲染优化技术",
      "数据流"
    ]
  },
  {
    "id": "useb-16-rendering-optimization-3",
    "chapter": "useb-16-rendering-optimization",
    "level": 3,
    "question": "第16章 Unity中的渲染优化技术最容易出现什么状态或边界错误？",
    "answer": "看到Draw Call多就强制批处理，却增加顶点变换、材质限制和不可见几何，帧时间反而上升。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第16章 Unity中的渲染优化技术",
      "反例"
    ]
  },
  {
    "id": "useb-16-rendering-optimization-4",
    "chapter": "useb-16-rendering-optimization",
    "level": 4,
    "question": "第16章 Unity中的渲染优化技术如何验收帧调试器？",
    "answer": "逐Draw Call检查渲染顺序、状态、目标和结果的Unity工具。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第16章 Unity中的渲染优化技术",
      "验收"
    ]
  },
  {
    "id": "useb-17-surface-shader-1",
    "chapter": "useb-17-surface-shader",
    "level": 1,
    "question": "第17章 Surface Shader探秘中的Surface Shader是什么？",
    "answer": "由Unity根据表面描述和光照模型生成底层顶点片元Pass的代码生成形式。",
    "tags": [
      "第17章 Surface Shader探秘",
      "Surface Shader"
    ]
  },
  {
    "id": "useb-17-surface-shader-2",
    "chapter": "useb-17-surface-shader",
    "level": 2,
    "question": "第17章 Surface Shader探秘如何连接表面函数和光照函数？",
    "answer": "把输入纹理和几何数据写入反照率、法线、光滑度等表面属性的函数。 把表面输出、光线、观察方向和衰减组合为最终光照的函数。 必须标注阶段、空间与输入。",
    "tags": [
      "第17章 Surface Shader探秘",
      "数据流"
    ]
  },
  {
    "id": "useb-17-surface-shader-3",
    "chapter": "useb-17-surface-shader",
    "level": 3,
    "question": "第17章 Surface Shader探秘最容易出现什么状态或边界错误？",
    "answer": "把Surface Shader当一个单Pass片元程序，忽略它生成的变体、阴影Pass和平台差异。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第17章 Surface Shader探秘",
      "反例"
    ]
  },
  {
    "id": "useb-17-surface-shader-4",
    "chapter": "useb-17-surface-shader",
    "level": 4,
    "question": "第17章 Surface Shader探秘如何验收SurfaceOutput？",
    "answer": "承载Albedo、Normal、Emission、Specular、Gloss与Alpha等表面属性的结构。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第17章 Surface Shader探秘",
      "验收"
    ]
  },
  {
    "id": "useb-18-physically-based-rendering-1",
    "chapter": "useb-18-physically-based-rendering",
    "level": 1,
    "question": "第18章 基于物理的渲染中的基于物理的着色是什么？",
    "answer": "使用能量约束、材质参数和环境光照获得跨光照条件一致外观的着色方法。",
    "tags": [
      "第18章 基于物理的渲染",
      "基于物理的着色"
    ]
  },
  {
    "id": "useb-18-physically-based-rendering-2",
    "chapter": "useb-18-physically-based-rendering",
    "level": 2,
    "question": "第18章 基于物理的渲染如何连接微表面模型和金属度？",
    "answer": "把表面视为微小镜面集合并用分布、遮蔽和Fresnel构成高光的模型。 控制基色进入漫反射还是作为导体F0颜色的材质参数。 必须标注阶段、空间与输入。",
    "tags": [
      "第18章 基于物理的渲染",
      "数据流"
    ]
  },
  {
    "id": "useb-18-physically-based-rendering-3",
    "chapter": "useb-18-physically-based-rendering",
    "level": 3,
    "question": "第18章 基于物理的渲染最容易出现什么状态或边界错误？",
    "answer": "在伽马空间中直接做光照与混合，再通过调材质数值弥补，换环境后外观立刻崩坏。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第18章 基于物理的渲染",
      "反例"
    ]
  },
  {
    "id": "useb-18-physically-based-rendering-4",
    "chapter": "useb-18-physically-based-rendering",
    "level": 4,
    "question": "第18章 基于物理的渲染如何验收线性空间？",
    "answer": "在与光能近似线性关系的数值空间中执行光照和混合。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第18章 基于物理的渲染",
      "验收"
    ]
  },
  {
    "id": "useb-19-unity5-changes-1",
    "chapter": "useb-19-unity5-changes",
    "level": 1,
    "question": "第19章 Unity 5更新了什么中的版本迁移是什么？",
    "answer": "在引擎升级前后比较渲染默认值、宏、编译器和材质数据的过程。",
    "tags": [
      "第19章 Unity 5更新了什么",
      "版本迁移"
    ]
  },
  {
    "id": "useb-19-unity5-changes-2",
    "chapter": "useb-19-unity5-changes",
    "level": 2,
    "question": "第19章 Unity 5更新了什么如何连接环境光变化和编译严格性？",
    "answer": "天空盒、GI、反射和色彩空间默认值改变导致的整体亮度差异。 新编译器对类型、语义、未初始化值和平台规则执行更严格检查。 必须标注阶段、空间与输入。",
    "tags": [
      "第19章 Unity 5更新了什么",
      "数据流"
    ]
  },
  {
    "id": "useb-19-unity5-changes-3",
    "chapter": "useb-19-unity5-changes",
    "level": 3,
    "question": "第19章 Unity 5更新了什么最容易出现什么状态或边界错误？",
    "answer": "升级后场景更亮就整体压暗材质，没有核对环境光、色彩空间和反射探针默认值。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第19章 Unity 5更新了什么",
      "反例"
    ]
  },
  {
    "id": "useb-19-unity5-changes-4",
    "chapter": "useb-19-unity5-changes",
    "level": 4,
    "question": "第19章 Unity 5更新了什么如何验收固定管线退场？",
    "answer": "旧式状态组合逐渐被可编程Shader替代的兼容性变化。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第19章 Unity 5更新了什么",
      "验收"
    ]
  },
  {
    "id": "useb-20-more-to-learn-1",
    "chapter": "useb-20-more-to-learn",
    "level": 1,
    "question": "第20章 还有更多内容吗中的渲染知识树是什么？",
    "answer": "把数学、图形API、光照、材质、后处理、性能和引擎管线连接起来的路线图。",
    "tags": [
      "第20章 还有更多内容吗",
      "渲染知识树"
    ]
  },
  {
    "id": "useb-20-more-to-learn-2",
    "chapter": "useb-20-more-to-learn",
    "level": 2,
    "question": "第20章 还有更多内容吗如何连接最小实验和原始资料？",
    "answer": "一次只改变一个渲染变量并保存输入输出和帧调试证据的工程样例。 引擎手册、API规范、论文、演讲和源码等可追溯的一手来源。 必须标注阶段、空间与输入。",
    "tags": [
      "第20章 还有更多内容吗",
      "数据流"
    ]
  },
  {
    "id": "useb-20-more-to-learn-3",
    "chapter": "useb-20-more-to-learn",
    "level": 3,
    "question": "第20章 还有更多内容吗最容易出现什么状态或边界错误？",
    "answer": "只收集大量教程链接却不建立可运行实验和版本标记，几个月后无法判断哪些结论仍成立。 用中间值调试视图和Frame Debugger定位。",
    "tags": [
      "第20章 还有更多内容吗",
      "反例"
    ]
  },
  {
    "id": "useb-20-more-to-learn-4",
    "chapter": "useb-20-more-to-learn",
    "level": 4,
    "question": "第20章 还有更多内容吗如何验收学习证据？",
    "answer": "可运行Shader、对比图、GPU捕获、性能数据和失败反例组成的掌握证明。 保存版本、参考图、Pass事件、平台与性能基线。",
    "tags": [
      "第20章 还有更多内容吗",
      "验收"
    ]
  }
];
