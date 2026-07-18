import type { ReviewQuestion } from "./types";
export const uslOfficialChapterQuestions: ReviewQuestion[]=[
  {
    "id": "usl-01-shader-concept-1",
    "chapter": "usl-01-shader-concept",
    "level": 1,
    "question": "第1章 Shader（着色器）的概念和在3D游戏中的作用中“Shader”承担什么任务？",
    "answer": "运行在GPU阶段、把几何与材质输入转换为可见结果的程序。",
    "tags": [
      "第1章 Shader（着色器）的概念和在3D游戏中的作用",
      "Shader"
    ]
  },
  {
    "id": "usl-01-shader-concept-2",
    "chapter": "usl-01-shader-concept",
    "level": 2,
    "question": "第1章 Shader（着色器）的概念和在3D游戏中的作用如何连接“实例化”与“GPU编程”？",
    "answer": "把同一着色程序与一组材质参数和资源绑定为可绘制对象。 面向大规模并行顶点或片元数据设计计算。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第1章 Shader（着色器）的概念和在3D游戏中的作用",
      "执行链"
    ]
  },
  {
    "id": "usl-01-shader-concept-3",
    "chapter": "usl-01-shader-concept",
    "level": 3,
    "question": "第1章 Shader（着色器）的概念和在3D游戏中的作用最关键的失败反例是什么？",
    "answer": "只背语法却没有先解释Shader在完整渲染链中的职责，换API或Unity版本后无法定位黑屏。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第1章 Shader（着色器）的概念和在3D游戏中的作用",
      "反例"
    ]
  },
  {
    "id": "usl-01-shader-concept-4",
    "chapter": "usl-01-shader-concept",
    "level": 4,
    "question": "怎样用“渲染证据”验收第1章 Shader（着色器）的概念和在3D游戏中的作用？",
    "answer": "证明输入、状态、阶段输出和最终画面对应关系的记录。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第1章 Shader（着色器）的概念和在3D游戏中的作用",
      "验收"
    ]
  },
  {
    "id": "usl-02-unity-shader-forms-1",
    "chapter": "usl-02-unity-shader-forms",
    "level": 1,
    "question": "第2章 Unity中Shader（着色器）的形态中“ShaderLab”承担什么任务？",
    "answer": "Unity用来组织属性、SubShader、Pass和回退策略的声明框架。",
    "tags": [
      "第2章 Unity中Shader（着色器）的形态",
      "ShaderLab"
    ]
  },
  {
    "id": "usl-02-unity-shader-forms-2",
    "chapter": "usl-02-unity-shader-forms",
    "level": 2,
    "question": "第2章 Unity中Shader（着色器）的形态如何连接“SubShader”与“Pass”？",
    "answer": "面向一组硬件能力和渲染条件的完整实现候选。 一次具体绘制及其程序、标签和固定状态。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第2章 Unity中Shader（着色器）的形态",
      "执行链"
    ]
  },
  {
    "id": "usl-02-unity-shader-forms-3",
    "chapter": "usl-02-unity-shader-forms",
    "level": 3,
    "question": "第2章 Unity中Shader（着色器）的形态最关键的失败反例是什么？",
    "answer": "只修改Cg代码却忽略Queue、RenderType、LightMode或Fallback，导致执行的是另一条Pass或另一份SubShader。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第2章 Unity中Shader（着色器）的形态",
      "反例"
    ]
  },
  {
    "id": "usl-02-unity-shader-forms-4",
    "chapter": "usl-02-unity-shader-forms",
    "level": 4,
    "question": "怎样用“Properties”验收第2章 Unity中Shader（着色器）的形态？",
    "answer": "暴露给材质面板和脚本的持久化参数接口。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第2章 Unity中Shader（着色器）的形态",
      "验收"
    ]
  },
  {
    "id": "usl-03-coordinate-spaces-1",
    "chapter": "usl-03-coordinate-spaces",
    "level": 1,
    "question": "第3章 Shader（着色器）中用到的各种空间概念中“模型空间”承担什么任务？",
    "answer": "以对象自身原点和轴为基准的局部坐标。",
    "tags": [
      "第3章 Shader（着色器）中用到的各种空间概念",
      "模型空间"
    ]
  },
  {
    "id": "usl-03-coordinate-spaces-2",
    "chapter": "usl-03-coordinate-spaces",
    "level": 2,
    "question": "第3章 Shader（着色器）中用到的各种空间概念如何连接“世界空间”与“视空间”？",
    "answer": "场景中统一表达对象、相机和灯光的位置空间。 以相机为原点组织可见几何的坐标空间。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第3章 Shader（着色器）中用到的各种空间概念",
      "执行链"
    ]
  },
  {
    "id": "usl-03-coordinate-spaces-3",
    "chapter": "usl-03-coordinate-spaces",
    "level": 3,
    "question": "第3章 Shader（着色器）中用到的各种空间概念最关键的失败反例是什么？",
    "answer": "把不同空间的向量直接点乘，画面在单位对象上看似正确，旋转、缩放或移动相机后立即失真。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第3章 Shader（着色器）中用到的各种空间概念",
      "反例"
    ]
  },
  {
    "id": "usl-03-coordinate-spaces-4",
    "chapter": "usl-03-coordinate-spaces",
    "level": 4,
    "question": "怎样用“投影矩阵”验收第3章 Shader（着色器）中用到的各种空间概念？",
    "answer": "把视空间点映射到裁剪空间并编码透视关系的矩阵。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第3章 Shader（着色器）中用到的各种空间概念",
      "验收"
    ]
  },
  {
    "id": "usl-04-basic-lighting-models-1",
    "chapter": "usl-04-basic-lighting-models",
    "level": 1,
    "question": "第4章 基本的光照模型中“直接照明”承担什么任务？",
    "answer": "从光源沿未遮挡路径到达表面的光。",
    "tags": [
      "第4章 基本的光照模型",
      "直接照明"
    ]
  },
  {
    "id": "usl-04-basic-lighting-models-2",
    "chapter": "usl-04-basic-lighting-models",
    "level": 2,
    "question": "第4章 基本的光照模型如何连接“间接照明”与“Lambert”？",
    "answer": "经其他表面反射后到达当前表面的光。 用法线与光线夹角余弦描述理想漫反射。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第4章 基本的光照模型",
      "执行链"
    ]
  },
  {
    "id": "usl-04-basic-lighting-models-3",
    "chapter": "usl-04-basic-lighting-models",
    "level": 3,
    "question": "第4章 基本的光照模型最关键的失败反例是什么？",
    "answer": "把法线、灯光方向和观察方向放在不同空间，靠调高环境光掩盖方向错误。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第4章 基本的光照模型",
      "反例"
    ]
  },
  {
    "id": "usl-04-basic-lighting-models-4",
    "chapter": "usl-04-basic-lighting-models",
    "level": 4,
    "question": "怎样用“Blinn-Phong”验收第4章 基本的光照模型？",
    "answer": "用法线与半角向量计算镜面项的模型。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第4章 基本的光照模型",
      "验收"
    ]
  },
  {
    "id": "usl-05-first-executed-pass-1",
    "chapter": "usl-05-first-executed-pass",
    "level": 1,
    "question": "第5章 第一个被执行的Pass中“渲染路径”承担什么任务？",
    "answer": "Unity按相机与平台选择的一组照明和Pass执行策略。",
    "tags": [
      "第5章 第一个被执行的Pass",
      "渲染路径"
    ]
  },
  {
    "id": "usl-05-first-executed-pass-2",
    "chapter": "usl-05-first-executed-pass",
    "level": 2,
    "question": "第5章 第一个被执行的Pass如何连接“LightMode”与“首个Pass”？",
    "answer": "声明Pass在某条渲染路径中扮演角色的标签。 在当前SubShader和路径下满足条件并实际被调度的绘制。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第5章 第一个被执行的Pass",
      "执行链"
    ]
  },
  {
    "id": "usl-05-first-executed-pass-3",
    "chapter": "usl-05-first-executed-pass",
    "level": 3,
    "question": "第5章 第一个被执行的Pass最关键的失败反例是什么？",
    "answer": "看到文件中的第一个Pass就认定它最先执行，没有检查渲染路径、标签和替换渲染。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第5章 第一个被执行的Pass",
      "反例"
    ]
  },
  {
    "id": "usl-05-first-executed-pass-4",
    "chapter": "usl-05-first-executed-pass",
    "level": 4,
    "question": "怎样用“Pass证书”验收第5章 第一个被执行的Pass？",
    "answer": "记录材质、SubShader、Pass名、LightMode与Draw顺序的证据。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第5章 第一个被执行的Pass",
      "验收"
    ]
  },
  {
    "id": "usl-06-vertexlit-path-1",
    "chapter": "usl-06-vertexlit-path",
    "level": 1,
    "question": "第6章 VertexLit渲染路径中“VertexLit”承担什么任务？",
    "answer": "主要在顶点阶段计算照明并插值到片元的旧式渲染路径。",
    "tags": [
      "第6章 VertexLit渲染路径",
      "VertexLit"
    ]
  },
  {
    "id": "usl-06-vertexlit-path-2",
    "chapter": "usl-06-vertexlit-path",
    "level": 2,
    "question": "第6章 VertexLit渲染路径如何连接“逐顶点照明”与“光源数组”？",
    "answer": "在顶点计算光照结果后由光栅器插值。 Unity向顶点程序提供的有限光源位置、颜色和衰减数据。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第6章 VertexLit渲染路径",
      "执行链"
    ]
  },
  {
    "id": "usl-06-vertexlit-path-3",
    "chapter": "usl-06-vertexlit-path",
    "level": 3,
    "question": "第6章 VertexLit渲染路径最关键的失败反例是什么？",
    "answer": "低模物体上的高光消失后继续调材质参数，而没有认识到逐顶点采样频率不足。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第6章 VertexLit渲染路径",
      "反例"
    ]
  },
  {
    "id": "usl-06-vertexlit-path-4",
    "chapter": "usl-06-vertexlit-path",
    "level": 4,
    "question": "怎样用“路径预算”验收第6章 VertexLit渲染路径？",
    "answer": "顶点数、光源数和插值器共同形成的成本边界。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第6章 VertexLit渲染路径",
      "验收"
    ]
  },
  {
    "id": "usl-07-forward-path-1",
    "chapter": "usl-07-forward-path",
    "level": 1,
    "question": "第7章 Forward渲染路径中“ForwardBase”承担什么任务？",
    "answer": "处理主方向光、环境项、光照贴图和基础阴影的Pass角色。",
    "tags": [
      "第7章 Forward渲染路径",
      "ForwardBase"
    ]
  },
  {
    "id": "usl-07-forward-path-2",
    "chapter": "usl-07-forward-path",
    "level": 2,
    "question": "第7章 Forward渲染路径如何连接“ForwardAdd”与“衰减”？",
    "answer": "为额外逐像素光源执行并以加法混合累积的Pass角色。 根据光源类型、距离和阴影纹理调节光照强度。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第7章 Forward渲染路径",
      "执行链"
    ]
  },
  {
    "id": "usl-07-forward-path-3",
    "chapter": "usl-07-forward-path",
    "level": 3,
    "question": "第7章 Forward渲染路径最关键的失败反例是什么？",
    "answer": "在ForwardAdd里重复环境光或不设加法混合，灯越多画面越发白且无法从最终图判断是哪一Pass出错。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第7章 Forward渲染路径",
      "反例"
    ]
  },
  {
    "id": "usl-07-forward-path-4",
    "chapter": "usl-07-forward-path",
    "level": 4,
    "question": "怎样用“像素灯预算”验收第7章 Forward渲染路径？",
    "answer": "决定额外光源数量、Draw次数和片元成本的配置。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第7章 Forward渲染路径",
      "验收"
    ]
  },
  {
    "id": "usl-08-baked-lightmaps-1",
    "chapter": "usl-08-baked-lightmaps",
    "level": 1,
    "question": "第8章 基于光照贴图的烘焙照明中“光照贴图”承担什么任务？",
    "answer": "把静态表面的低频照明预计算到纹理中的数据。",
    "tags": [
      "第8章 基于光照贴图的烘焙照明",
      "光照贴图"
    ]
  },
  {
    "id": "usl-08-baked-lightmaps-2",
    "chapter": "usl-08-baked-lightmaps",
    "level": 2,
    "question": "第8章 基于光照贴图的烘焙照明如何连接“第二套UV”与“烘焙”？",
    "answer": "为烘焙提供无重叠、带间距的纹理坐标展开。 离线计算灯光与静态几何作用并写入贴图的过程。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第8章 基于光照贴图的烘焙照明",
      "执行链"
    ]
  },
  {
    "id": "usl-08-baked-lightmaps-3",
    "chapter": "usl-08-baked-lightmaps",
    "level": 3,
    "question": "第8章 基于光照贴图的烘焙照明最关键的失败反例是什么？",
    "answer": "主UV直接复用为光照贴图UV造成重叠和接缝，却误以为是阴影算法问题。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第8章 基于光照贴图的烘焙照明",
      "反例"
    ]
  },
  {
    "id": "usl-08-baked-lightmaps-4",
    "chapter": "usl-08-baked-lightmaps",
    "level": 4,
    "question": "怎样用“静动态契约”验收第8章 基于光照贴图的烘焙照明？",
    "answer": "规定哪些对象、灯光和遮挡参与烘焙或实时计算。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第8章 基于光照贴图的烘焙照明",
      "验收"
    ]
  },
  {
    "id": "usl-09-light-probes-1",
    "chapter": "usl-09-light-probes",
    "level": 1,
    "question": "第9章 基于LightProbes的照明中“Light Probe”承担什么任务？",
    "answer": "在空间采样并存储间接漫反射照明的探针。",
    "tags": [
      "第9章 基于LightProbes的照明",
      "Light Probe"
    ]
  },
  {
    "id": "usl-09-light-probes-2",
    "chapter": "usl-09-light-probes",
    "level": 2,
    "question": "第9章 基于LightProbes的照明如何连接“球谐函数”与“四面体插值”？",
    "answer": "用少量系数近似低频方向照明的基函数表示。 在探针网络中为动态对象插值局部系数的方法。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第9章 基于LightProbes的照明",
      "执行链"
    ]
  },
  {
    "id": "usl-09-light-probes-3",
    "chapter": "usl-09-light-probes",
    "level": 3,
    "question": "第9章 基于LightProbes的照明最关键的失败反例是什么？",
    "answer": "探针都放在墙内或跨度过大，动态物体穿门时亮度跳变，却只调材质颜色。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第9章 基于LightProbes的照明",
      "反例"
    ]
  },
  {
    "id": "usl-09-light-probes-4",
    "chapter": "usl-09-light-probes",
    "level": 4,
    "question": "怎样用“动态受光”验收第9章 基于LightProbes的照明？",
    "answer": "动态对象从探针获得与环境相容的间接照明。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第9章 基于LightProbes的照明",
      "验收"
    ]
  },
  {
    "id": "usl-10-planar-shadows-1",
    "chapter": "usl-10-planar-shadows",
    "level": 1,
    "question": "第10章 平面阴影中“平面投影”承担什么任务？",
    "answer": "把顶点沿光线方向投到指定平面形成阴影几何。",
    "tags": [
      "第10章 平面阴影",
      "平面投影"
    ]
  },
  {
    "id": "usl-10-planar-shadows-2",
    "chapter": "usl-10-planar-shadows",
    "level": 2,
    "question": "第10章 平面阴影如何连接“接收平面”与“投影矩阵”？",
    "answer": "定义阴影落点约束的平面方程。 一次性表达光源到平面的几何映射。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第10章 平面阴影",
      "执行链"
    ]
  },
  {
    "id": "usl-10-planar-shadows-3",
    "chapter": "usl-10-planar-shadows",
    "level": 3,
    "question": "第10章 平面阴影最关键的失败反例是什么？",
    "answer": "对任意地形仍使用单一接收平面，阴影悬空或穿透后继续增加深度偏移。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第10章 平面阴影",
      "反例"
    ]
  },
  {
    "id": "usl-10-planar-shadows-4",
    "chapter": "usl-10-planar-shadows",
    "level": 4,
    "question": "怎样用“适用边界”验收第10章 平面阴影？",
    "answer": "只适合近似平面接收器和简单遮挡物的限制。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第10章 平面阴影",
      "验收"
    ]
  },
  {
    "id": "usl-11-spherical-shadows-1",
    "chapter": "usl-11-spherical-shadows",
    "level": 1,
    "question": "第11章 球体阴影中“球体近似”承担什么任务？",
    "answer": "用包围球代替复杂遮挡物估计阴影范围。",
    "tags": [
      "第11章 球体阴影",
      "球体近似"
    ]
  },
  {
    "id": "usl-11-spherical-shadows-2",
    "chapter": "usl-11-spherical-shadows",
    "level": 2,
    "question": "第11章 球体阴影如何连接“光线球交”与“软边函数”？",
    "answer": "通过二次方程判断接收点到光源射线是否穿过球。 按到阴影边界的距离平滑调整遮蔽强度。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第11章 球体阴影",
      "执行链"
    ]
  },
  {
    "id": "usl-11-spherical-shadows-3",
    "chapter": "usl-11-spherical-shadows",
    "level": 3,
    "question": "第11章 球体阴影最关键的失败反例是什么？",
    "answer": "用一个过大的球覆盖细长物体，性能虽稳定但阴影面积严重高估。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第11章 球体阴影",
      "反例"
    ]
  },
  {
    "id": "usl-11-spherical-shadows-4",
    "chapter": "usl-11-spherical-shadows",
    "level": 4,
    "question": "怎样用“代理阴影”验收第11章 球体阴影？",
    "answer": "以简单几何换取稳定低成本阴影的策略。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第11章 球体阴影",
      "验收"
    ]
  },
  {
    "id": "usl-12-volume-shadows-1",
    "chapter": "usl-12-volume-shadows",
    "level": 1,
    "question": "第12章 体积阴影中“阴影体”承担什么任务？",
    "answer": "由遮挡物轮廓边沿光线方向挤出的封闭体积。",
    "tags": [
      "第12章 体积阴影",
      "阴影体"
    ]
  },
  {
    "id": "usl-12-volume-shadows-2",
    "chapter": "usl-12-volume-shadows",
    "level": 2,
    "question": "第12章 体积阴影如何连接“轮廓边”与“模板计数”？",
    "answer": "面向光和背向光三角形之间构成体积侧面的边。 根据视线穿过阴影体前后表面增减模板值。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第12章 体积阴影",
      "执行链"
    ]
  },
  {
    "id": "usl-12-volume-shadows-3",
    "chapter": "usl-12-volume-shadows",
    "level": 3,
    "question": "第12章 体积阴影最关键的失败反例是什么？",
    "answer": "阴影体没有封闭或轮廓邻接错误，模板计数失衡造成整屏黑块。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第12章 体积阴影",
      "反例"
    ]
  },
  {
    "id": "usl-12-volume-shadows-4",
    "chapter": "usl-12-volume-shadows",
    "level": 4,
    "question": "怎样用“Z-fail”验收第12章 体积阴影？",
    "answer": "深度测试失败时更新模板以处理相机位于体内的算法。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第12章 体积阴影",
      "验收"
    ]
  },
  {
    "id": "usl-13-shadow-mapping-1",
    "chapter": "usl-13-shadow-mapping",
    "level": 1,
    "question": "第13章 阴影映射中“阴影贴图”承担什么任务？",
    "answer": "从光源视角记录最近深度的纹理。",
    "tags": [
      "第13章 阴影映射",
      "阴影贴图"
    ]
  },
  {
    "id": "usl-13-shadow-mapping-2",
    "chapter": "usl-13-shadow-mapping",
    "level": 2,
    "question": "第13章 阴影映射如何连接“光空间坐标”与“深度比较”？",
    "answer": "把世界点变换到光源裁剪与纹理空间的坐标。 比较当前点光深度与贴图深度判断遮挡。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第13章 阴影映射",
      "执行链"
    ]
  },
  {
    "id": "usl-13-shadow-mapping-3",
    "chapter": "usl-13-shadow-mapping",
    "level": 3,
    "question": "第13章 阴影映射最关键的失败反例是什么？",
    "answer": "用常量大偏差消除痤疮，导致接触阴影悬浮且薄物体完全漏影。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第13章 阴影映射",
      "反例"
    ]
  },
  {
    "id": "usl-13-shadow-mapping-4",
    "chapter": "usl-13-shadow-mapping",
    "level": 4,
    "question": "怎样用“采样滤波”验收第13章 阴影映射？",
    "answer": "通过邻域比较减轻锯齿并形成软边的策略。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第13章 阴影映射",
      "验收"
    ]
  },
  {
    "id": "usl-14-built-in-shadows-1",
    "chapter": "usl-14-built-in-shadows",
    "level": 1,
    "question": "第14章 内置的阴影中“ShadowCaster”承担什么任务？",
    "answer": "向Unity阴影贴图写入遮挡深度的Pass角色。",
    "tags": [
      "第14章 内置的阴影",
      "ShadowCaster"
    ]
  },
  {
    "id": "usl-14-built-in-shadows-2",
    "chapter": "usl-14-built-in-shadows",
    "level": 2,
    "question": "第14章 内置的阴影如何连接“AutoLight”与“阴影宏”？",
    "answer": "封装内置管线光照与阴影坐标宏的包含文件。 在不同平台和光源类型间生成坐标、采样与衰减代码。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第14章 内置的阴影",
      "执行链"
    ]
  },
  {
    "id": "usl-14-built-in-shadows-3",
    "chapter": "usl-14-built-in-shadows",
    "level": 3,
    "question": "第14章 内置的阴影最关键的失败反例是什么？",
    "answer": "复制阴影宏但遗漏对应pragma或插值字段，某个平台编译成功却始终返回无阴影。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第14章 内置的阴影",
      "反例"
    ]
  },
  {
    "id": "usl-14-built-in-shadows-4",
    "chapter": "usl-14-built-in-shadows",
    "level": 4,
    "question": "怎样用“变体”验收第14章 内置的阴影？",
    "answer": "由光源、阴影模式和平台关键字生成的程序版本。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第14章 内置的阴影",
      "验收"
    ]
  },
  {
    "id": "usl-15-pass-state-commands-1",
    "chapter": "usl-15-pass-state-commands",
    "level": 1,
    "question": "第15章 Pass的通用指令开关中“Render Queue”承担什么任务？",
    "answer": "决定透明与不透明对象大类排序的队列值。",
    "tags": [
      "第15章 Pass的通用指令开关",
      "Render Queue"
    ]
  },
  {
    "id": "usl-15-pass-state-commands-2",
    "chapter": "usl-15-pass-state-commands",
    "level": 2,
    "question": "第15章 Pass的通用指令开关如何连接“Blend”与“ZTest”？",
    "answer": "规定源颜色与目标颜色如何组合的固定状态。 决定候选片元是否通过深度比较。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第15章 Pass的通用指令开关",
      "执行链"
    ]
  },
  {
    "id": "usl-15-pass-state-commands-3",
    "chapter": "usl-15-pass-state-commands",
    "level": 3,
    "question": "第15章 Pass的通用指令开关最关键的失败反例是什么？",
    "answer": "片元函数输出正确就认定材质正确，忽略透明对象仍写深度或队列排序错误。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第15章 Pass的通用指令开关",
      "反例"
    ]
  },
  {
    "id": "usl-15-pass-state-commands-4",
    "chapter": "usl-15-pass-state-commands",
    "level": 4,
    "question": "怎样用“ColorMask”验收第15章 Pass的通用指令开关？",
    "answer": "限制Pass写入哪些颜色通道的状态。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第15章 Pass的通用指令开关",
      "验收"
    ]
  },
  {
    "id": "usl-16-fixed-function-pipeline-1",
    "chapter": "usl-16-fixed-function-pipeline",
    "level": 1,
    "question": "第16章 固定管线中“固定管线”承担什么任务？",
    "answer": "用声明命令组合预定义变换、光照和纹理单元的旧式管线。",
    "tags": [
      "第16章 固定管线",
      "固定管线"
    ]
  },
  {
    "id": "usl-16-fixed-function-pipeline-2",
    "chapter": "usl-16-fixed-function-pipeline",
    "level": 2,
    "question": "第16章 固定管线如何连接“Material块”与“SetTexture”？",
    "answer": "配置固定管线环境、漫反射、镜面与自发光参数。 声明纹理采样、Combine和多级纹理组合。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第16章 固定管线",
      "执行链"
    ]
  },
  {
    "id": "usl-16-fixed-function-pipeline-3",
    "chapter": "usl-16-fixed-function-pipeline",
    "level": 3,
    "question": "第16章 固定管线最关键的失败反例是什么？",
    "answer": "在不支持固定管线的现代平台继续依赖旧命令，编辑器显示正常而目标设备回退或变粉。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第16章 固定管线",
      "反例"
    ]
  },
  {
    "id": "usl-16-fixed-function-pipeline-4",
    "chapter": "usl-16-fixed-function-pipeline",
    "level": 4,
    "question": "怎样用“Combine”验收第16章 固定管线？",
    "answer": "用受限表达式组合纹理、常量、主色和前一级结果。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第16章 固定管线",
      "验收"
    ]
  },
  {
    "id": "usl-17-surface-shader-1",
    "chapter": "usl-17-surface-shader",
    "level": 1,
    "question": "第17章 Surface Shader中“Surface Shader”承担什么任务？",
    "answer": "由Unity代码生成器扩展成多渲染路径Pass的高层着色描述。",
    "tags": [
      "第17章 Surface Shader",
      "Surface Shader"
    ]
  },
  {
    "id": "usl-17-surface-shader-2",
    "chapter": "usl-17-surface-shader",
    "level": 2,
    "question": "第17章 Surface Shader如何连接“表面函数”与“光照函数”？",
    "answer": "输出Albedo、Normal、Emission、Specular和Alpha等材质属性。 把表面输出、灯光与视线组合为颜色的函数。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第17章 Surface Shader",
      "执行链"
    ]
  },
  {
    "id": "usl-17-surface-shader-3",
    "chapter": "usl-17-surface-shader",
    "level": 3,
    "question": "第17章 Surface Shader最关键的失败反例是什么？",
    "answer": "把Surface Shader当成一个Pass，未检查生成的ForwardAdd、ShadowCaster和大量变体。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第17章 Surface Shader",
      "反例"
    ]
  },
  {
    "id": "usl-17-surface-shader-4",
    "chapter": "usl-17-surface-shader",
    "level": 4,
    "question": "怎样用“路径适应性”验收第17章 Surface Shader？",
    "answer": "同一Surface声明在不同路径下支持能力与生成成本的边界。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第17章 Surface Shader",
      "验收"
    ]
  },
  {
    "id": "usl-18-bump-material-1",
    "chapter": "usl-18-bump-material",
    "level": 1,
    "question": "第18章 凹凸材质中“高度贴图”承担什么任务？",
    "answer": "以标量高度近似表面起伏的纹理。",
    "tags": [
      "第18章 凹凸材质",
      "高度贴图"
    ]
  },
  {
    "id": "usl-18-bump-material-2",
    "chapter": "usl-18-bump-material",
    "level": 2,
    "question": "第18章 凹凸材质如何连接“法线贴图”与“TBN基”？",
    "answer": "直接编码切线空间微表面法线的纹理。 由切线、副切线和法线构成的局部方向基。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第18章 凹凸材质",
      "执行链"
    ]
  },
  {
    "id": "usl-18-bump-material-3",
    "chapter": "usl-18-bump-material",
    "level": 3,
    "question": "第18章 凹凸材质最关键的失败反例是什么？",
    "answer": "普通颜色纹理未按Normal Map导入，采样值没有正确解码却靠强度参数掩盖。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第18章 凹凸材质",
      "反例"
    ]
  },
  {
    "id": "usl-18-bump-material-4",
    "chapter": "usl-18-bump-material",
    "level": 4,
    "question": "怎样用“切线手性”验收第18章 凹凸材质？",
    "answer": "用于在镜像UV或负缩放下恢复副切线方向的符号。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第18章 凹凸材质",
      "验收"
    ]
  },
  {
    "id": "usl-19-toon-material-1",
    "chapter": "usl-19-toon-material",
    "level": 1,
    "question": "第19章 卡通材质中“轮廓线”承担什么任务？",
    "answer": "通过背面膨胀、屏幕偏移或边缘检测生成的外轮廓。",
    "tags": [
      "第19章 卡通材质",
      "轮廓线"
    ]
  },
  {
    "id": "usl-19-toon-material-2",
    "chapter": "usl-19-toon-material",
    "level": 2,
    "question": "第19章 卡通材质如何连接“光照离散化”与“Ramp贴图”？",
    "answer": "把连续NdotL映射为有限明暗色阶。 用一维或二维纹理重新映射光照与材质颜色。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第19章 卡通材质",
      "执行链"
    ]
  },
  {
    "id": "usl-19-toon-material-3",
    "chapter": "usl-19-toon-material",
    "level": 3,
    "question": "第19章 卡通材质最关键的失败反例是什么？",
    "answer": "直接沿对象法线固定距离膨胀，远近线宽变化且尖角处轮廓破裂。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第19章 卡通材质",
      "反例"
    ]
  },
  {
    "id": "usl-19-toon-material-4",
    "chapter": "usl-19-toon-material",
    "level": 4,
    "question": "怎样用“Z偏移”验收第19章 卡通材质？",
    "answer": "通过深度偏差减少轮廓与主体共面冲突。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第19章 卡通材质",
      "验收"
    ]
  },
  {
    "id": "usl-20-mirror-material-1",
    "chapter": "usl-20-mirror-material",
    "level": 1,
    "question": "第20章 镜面材质中“镜像相机”承担什么任务？",
    "answer": "相对于镜面平面反射位置和朝向的辅助相机。",
    "tags": [
      "第20章 镜面材质",
      "镜像相机"
    ]
  },
  {
    "id": "usl-20-mirror-material-2",
    "chapter": "usl-20-mirror-material",
    "level": 2,
    "question": "第20章 镜面材质如何连接“反射矩阵”与“斜投影矩阵”？",
    "answer": "把世界点关于平面进行镜像的变换。 把近裁剪面调整到镜面以裁掉镜后几何的投影。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第20章 镜面材质",
      "执行链"
    ]
  },
  {
    "id": "usl-20-mirror-material-3",
    "chapter": "usl-20-mirror-material",
    "level": 3,
    "question": "第20章 镜面材质最关键的失败反例是什么？",
    "answer": "只旋转辅助相机而没有正确镜像位置和裁剪平面，镜后对象泄漏到反射中。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第20章 镜面材质",
      "反例"
    ]
  },
  {
    "id": "usl-20-mirror-material-4",
    "chapter": "usl-20-mirror-material",
    "level": 4,
    "question": "怎样用“递归边界”验收第20章 镜面材质？",
    "answer": "镜子互见、相机嵌套和额外渲染带来的限制。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第20章 镜面材质",
      "验收"
    ]
  },
  {
    "id": "usl-21-translucent-material-1",
    "chapter": "usl-21-translucent-material",
    "level": 1,
    "question": "第21章 半透明材质中“半透明”承担什么任务？",
    "answer": "光线进入材质并在内部散射后从其他位置离开的现象。",
    "tags": [
      "第21章 半透明材质",
      "半透明"
    ]
  },
  {
    "id": "usl-21-translucent-material-2",
    "chapter": "usl-21-translucent-material",
    "level": 2,
    "question": "第21章 半透明材质如何连接“背光项”与“厚度”？",
    "answer": "根据光线、视线和厚度近似透射亮度的经验项。 控制穿透距离与吸收强弱的几何或纹理数据。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第21章 半透明材质",
      "执行链"
    ]
  },
  {
    "id": "usl-21-translucent-material-3",
    "chapter": "usl-21-translucent-material",
    "level": 3,
    "question": "第21章 半透明材质最关键的失败反例是什么？",
    "answer": "把普通Alpha混合当成半透明，背景可见但没有任何背光、厚度或吸收关系。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第21章 半透明材质",
      "反例"
    ]
  },
  {
    "id": "usl-21-translucent-material-4",
    "chapter": "usl-21-translucent-material",
    "level": 4,
    "question": "怎样用“双面照明”验收第21章 半透明材质？",
    "answer": "薄片材质正反面都参与照明的处理。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第21章 半透明材质",
      "验收"
    ]
  },
  {
    "id": "usl-22-volumetric-fog-1",
    "chapter": "usl-22-volumetric-fog",
    "level": 1,
    "question": "第22章 体积雾中“体积雾”承担什么任务？",
    "answer": "沿视线积分吸收和散射形成的空间介质效果。",
    "tags": [
      "第22章 体积雾",
      "体积雾"
    ]
  },
  {
    "id": "usl-22-volumetric-fog-2",
    "chapter": "usl-22-volumetric-fog",
    "level": 2,
    "question": "第22章 体积雾如何连接“距离雾”与“厚度雾”？",
    "answer": "按相机到背景或表面的距离增加雾量。 按射线穿过指定体积的路径长度计算雾量。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第22章 体积雾",
      "执行链"
    ]
  },
  {
    "id": "usl-22-volumetric-fog-3",
    "chapter": "usl-22-volumetric-fog",
    "level": 3,
    "question": "第22章 体积雾最关键的失败反例是什么？",
    "answer": "把物体到相机距离当作体积厚度，雾球靠近相机时整体亮度错误。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第22章 体积雾",
      "反例"
    ]
  },
  {
    "id": "usl-22-volumetric-fog-4",
    "chapter": "usl-22-volumetric-fog",
    "level": 4,
    "question": "怎样用“透射率”验收第22章 体积雾？",
    "answer": "介质经过距离后仍保留的背景光比例。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第22章 体积雾",
      "验收"
    ]
  },
  {
    "id": "usl-23-wrap-model-1",
    "chapter": "usl-23-wrap-model",
    "level": 1,
    "question": "第23章 Wrap Model新解中“Wrap光照”承担什么任务？",
    "answer": "把Lambert响应向背光区域平移并归一化的经验漫反射。",
    "tags": [
      "第23章 Wrap Model新解",
      "Wrap光照"
    ]
  },
  {
    "id": "usl-23-wrap-model-2",
    "chapter": "usl-23-wrap-model",
    "level": 2,
    "question": "第23章 Wrap Model新解如何连接“Wrap参数”与“归一化”？",
    "answer": "控制光照绕过轮廓扩展到背面的程度。 补偿响应扩张避免整体能量无界增加。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第23章 Wrap Model新解",
      "执行链"
    ]
  },
  {
    "id": "usl-23-wrap-model-3",
    "chapter": "usl-23-wrap-model",
    "level": 3,
    "question": "第23章 Wrap Model新解最关键的失败反例是什么？",
    "answer": "Wrap参数无限增大却没有归一化，整件物体在无光区域仍近乎全亮。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第23章 Wrap Model新解",
      "反例"
    ]
  },
  {
    "id": "usl-23-wrap-model-4",
    "chapter": "usl-23-wrap-model",
    "level": 4,
    "question": "怎样用“经验模型”验收第23章 Wrap Model新解？",
    "answer": "为美术目标设计、但不宣称严格物理正确的函数。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第23章 Wrap Model新解",
      "验收"
    ]
  },
  {
    "id": "usl-24-area-light-1",
    "chapter": "usl-24-area-light",
    "level": 1,
    "question": "第24章 面积光中“面积光”承担什么任务？",
    "answer": "从有限表面而非单一点发射光线的光源。",
    "tags": [
      "第24章 面积光",
      "面积光"
    ]
  },
  {
    "id": "usl-24-area-light-2",
    "chapter": "usl-24-area-light",
    "level": 2,
    "question": "第24章 面积光如何连接“采样点”与“几何项”？",
    "answer": "用多个离散点近似连续发光面的样本。 连接光源样本与表面点时包含夹角和距离的权重。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第24章 面积光",
      "执行链"
    ]
  },
  {
    "id": "usl-24-area-light-3",
    "chapter": "usl-24-area-light",
    "level": 3,
    "question": "第24章 面积光最关键的失败反例是什么？",
    "answer": "只复制一个点光多次且不按面积与概率加权，样本越多画面越亮。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第24章 面积光",
      "反例"
    ]
  },
  {
    "id": "usl-24-area-light-4",
    "chapter": "usl-24-area-light",
    "level": 4,
    "question": "怎样用“样本预算”验收第24章 面积光？",
    "answer": "画面噪声、稳定性与计算成本之间的取舍。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第24章 面积光",
      "验收"
    ]
  },
  {
    "id": "usl-25-volumetric-light-1",
    "chapter": "usl-25-volumetric-light",
    "level": 1,
    "question": "第25章 体积光中“体积光”承担什么任务？",
    "answer": "光在参与介质中散射进入视线形成的可见光束。",
    "tags": [
      "第25章 体积光",
      "体积光"
    ]
  },
  {
    "id": "usl-25-volumetric-light-2",
    "chapter": "usl-25-volumetric-light",
    "level": 2,
    "question": "第25章 体积光如何连接“Ray Marching”与“相位函数”？",
    "answer": "沿视线分段采样介质密度、照明和透射的数值积分。 描述散射方向偏好的函数。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第25章 体积光",
      "执行链"
    ]
  },
  {
    "id": "usl-25-volumetric-light-3",
    "chapter": "usl-25-volumetric-light",
    "level": 3,
    "question": "第25章 体积光最关键的失败反例是什么？",
    "answer": "只累加亮度而不更新透射率，高密度区域无限发白且不遮挡背景。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第25章 体积光",
      "反例"
    ]
  },
  {
    "id": "usl-25-volumetric-light-4",
    "chapter": "usl-25-volumetric-light",
    "level": 4,
    "question": "怎样用“步长”验收第25章 体积光？",
    "answer": "决定积分精度、条带和运行成本的采样间隔。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第25章 体积光",
      "验收"
    ]
  },
  {
    "id": "usl-26-replacement-rendering-1",
    "chapter": "usl-26-replacement-rendering",
    "level": 1,
    "question": "第26章 材质替代渲染中“Replacement Shader”承担什么任务？",
    "answer": "按原材质标签选择替代SubShader完成整相机重绘。",
    "tags": [
      "第26章 材质替代渲染",
      "Replacement Shader"
    ]
  },
  {
    "id": "usl-26-replacement-rendering-2",
    "chapter": "usl-26-replacement-rendering",
    "level": 2,
    "question": "第26章 材质替代渲染如何连接“RenderWithShader”与“SetReplacementShader”？",
    "answer": "用指定Shader临时渲染相机的接口。 持续为相机设置替代Shader和标签键的接口。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第26章 材质替代渲染",
      "执行链"
    ]
  },
  {
    "id": "usl-26-replacement-rendering-3",
    "chapter": "usl-26-replacement-rendering",
    "level": 3,
    "question": "第26章 材质替代渲染最关键的失败反例是什么？",
    "answer": "所有原材质都没有匹配标签，替代相机只得到Fallback或整屏空白。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第26章 材质替代渲染",
      "反例"
    ]
  },
  {
    "id": "usl-26-replacement-rendering-4",
    "chapter": "usl-26-replacement-rendering",
    "level": 4,
    "question": "怎样用“辅助缓冲”验收第26章 材质替代渲染？",
    "answer": "通过替代渲染生成深度、法线、对象ID或遮罩纹理。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第26章 材质替代渲染",
      "验收"
    ]
  },
  {
    "id": "usl-27-post-effects-1",
    "chapter": "usl-27-post-effects",
    "level": 1,
    "question": "第27章 后期效果中“Blit”承担什么任务？",
    "answer": "在源纹理与目标纹理之间执行全屏采样Pass的操作。",
    "tags": [
      "第27章 后期效果",
      "Blit"
    ]
  },
  {
    "id": "usl-27-post-effects-2",
    "chapter": "usl-27-post-effects",
    "level": 2,
    "question": "第27章 后期效果如何连接“多重采样”与“深度法线纹理”？",
    "answer": "在邻域多个UV位置读取并组合像素的图像处理方式。 由相机提供、用于景深与轮廓等效果的场景几何缓冲。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第27章 后期效果",
      "执行链"
    ]
  },
  {
    "id": "usl-27-post-effects-3",
    "chapter": "usl-27-post-effects",
    "level": 3,
    "question": "第27章 后期效果最关键的失败反例是什么？",
    "answer": "源和目标指向同一RenderTexture，读写反馈让结果依赖GPU执行细节。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第27章 后期效果",
      "反例"
    ]
  },
  {
    "id": "usl-27-post-effects-4",
    "chapter": "usl-27-post-effects",
    "level": 4,
    "question": "怎样用“颜色空间”验收第27章 后期效果？",
    "answer": "决定调色、混合和模糊应在线性或编码域进行的约束。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第27章 后期效果",
      "验收"
    ]
  },
  {
    "id": "usl-28-terrain-1",
    "chapter": "usl-28-terrain",
    "level": 1,
    "question": "第28章 地形中“控制贴图”承担什么任务？",
    "answer": "用RGBA通道表示多层地表纹理混合权重的贴图。",
    "tags": [
      "第28章 地形",
      "控制贴图"
    ]
  },
  {
    "id": "usl-28-terrain-2",
    "chapter": "usl-28-terrain",
    "level": 2,
    "question": "第28章 地形如何连接“Splatting”与“Detail Mesh”？",
    "answer": "按控制权重组合多张地表纹理的技术。 用于草叶和小型地表物件的重复实例几何。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第28章 地形",
      "执行链"
    ]
  },
  {
    "id": "usl-28-terrain-3",
    "chapter": "usl-28-terrain",
    "level": 3,
    "question": "第28章 地形最关键的失败反例是什么？",
    "answer": "控制贴图权重未归一化，多层叠加区域亮度和反照率异常。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第28章 地形",
      "反例"
    ]
  },
  {
    "id": "usl-28-terrain-4",
    "chapter": "usl-28-terrain",
    "level": 4,
    "question": "怎样用“树木材质”验收第28章 地形？",
    "answer": "在近景三维树和远景Billboard间保持光照与颜色连续的材质体系。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第28章 地形",
      "验收"
    ]
  },
  {
    "id": "usl-29-projection-1",
    "chapter": "usl-29-projection",
    "level": 1,
    "question": "第29章 投影中“Projector”承担什么任务？",
    "answer": "从投影相机把纹理映射到场景表面的Unity组件。",
    "tags": [
      "第29章 投影",
      "Projector"
    ]
  },
  {
    "id": "usl-29-projection-2",
    "chapter": "usl-29-projection",
    "level": 2,
    "question": "第29章 投影如何连接“投影矩阵”与“投影材质”？",
    "answer": "把世界点变换到投影器裁剪与纹理空间的矩阵。 采样Cookie并按衰减、深度和混合影响接收面的材质。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第29章 投影",
      "执行链"
    ]
  },
  {
    "id": "usl-29-projection-3",
    "chapter": "usl-29-projection",
    "level": 3,
    "question": "第29章 投影最关键的失败反例是什么？",
    "answer": "忘记处理投影器背面和裁剪范围，纹理穿过物体并投到反向表面。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第29章 投影",
      "反例"
    ]
  },
  {
    "id": "usl-29-projection-4",
    "chapter": "usl-29-projection",
    "level": 4,
    "question": "怎样用“广告牌”验收第29章 投影？",
    "answer": "通过顶点变换让粒子或面片保持朝向相机的效果。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第29章 投影",
      "验收"
    ]
  },
  {
    "id": "usl-30-organization-reuse-1",
    "chapter": "usl-30-organization-reuse",
    "level": 1,
    "question": "第30章 Shader的组织和复用中“cginc”承担什么任务？",
    "answer": "保存共享函数、结构、宏和常量的Cg包含文件。",
    "tags": [
      "第30章 Shader的组织和复用",
      "cginc"
    ]
  },
  {
    "id": "usl-30-organization-reuse-2",
    "chapter": "usl-30-organization-reuse",
    "level": 2,
    "question": "第30章 Shader的组织和复用如何连接“UsePass”与“关键字”？",
    "answer": "按Shader名和Pass名复用已命名Pass的ShaderLab指令。 在脚本和材质中选择Shader功能分支的编译或运行开关。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第30章 Shader的组织和复用",
      "执行链"
    ]
  },
  {
    "id": "usl-30-organization-reuse-3",
    "chapter": "usl-30-organization-reuse",
    "level": 3,
    "question": "第30章 Shader的组织和复用最关键的失败反例是什么？",
    "answer": "把每个布尔功能都做成独立关键字，十几个开关产生无法管理的变体组合。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第30章 Shader的组织和复用",
      "反例"
    ]
  },
  {
    "id": "usl-30-organization-reuse-4",
    "chapter": "usl-30-organization-reuse",
    "level": 4,
    "question": "怎样用“变体爆炸”验收第30章 Shader的组织和复用？",
    "answer": "关键字组合乘积导致构建时间、包体和加载成本快速增长。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第30章 Shader的组织和复用",
      "验收"
    ]
  },
  {
    "id": "usl-31-rendering-concepts-1",
    "chapter": "usl-31-rendering-concepts",
    "level": 1,
    "question": "第31章 你必须知道的渲染概念中“逐顶点计算”承担什么任务？",
    "answer": "按顶点执行后插值到片元的计算策略。",
    "tags": [
      "第31章 你必须知道的渲染概念",
      "逐顶点计算"
    ]
  },
  {
    "id": "usl-31-rendering-concepts-2",
    "chapter": "usl-31-rendering-concepts",
    "level": 2,
    "question": "第31章 你必须知道的渲染概念如何连接“逐像素计算”与“Draw Call”？",
    "answer": "按覆盖片元执行、精度更高但成本与屏幕面积相关的策略。 CPU向图形API提交一组状态与几何绘制的命令。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第31章 你必须知道的渲染概念",
      "执行链"
    ]
  },
  {
    "id": "usl-31-rendering-concepts-3",
    "chapter": "usl-31-rendering-concepts",
    "level": 3,
    "question": "第31章 你必须知道的渲染概念最关键的失败反例是什么？",
    "answer": "看到Draw Call下降就宣称优化成功，没有检查合批后顶点量、内存、透明顺序和GPU瓶颈。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第31章 你必须知道的渲染概念",
      "反例"
    ]
  },
  {
    "id": "usl-31-rendering-concepts-4",
    "chapter": "usl-31-rendering-concepts",
    "level": 4,
    "question": "怎样用“渲染队列”验收第31章 你必须知道的渲染概念？",
    "answer": "按材质类别和排序规则组织Draw执行顺序的机制。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第31章 你必须知道的渲染概念",
      "验收"
    ]
  },
  {
    "id": "usl-32-render-path-optimization-1",
    "chapter": "usl-32-render-path-optimization",
    "level": 1,
    "question": "第32章 基于渲染路径的优化中“VertexLit优化”承担什么任务？",
    "answer": "利用低片元成本并控制顶点、灯光与插值误差的路径策略。",
    "tags": [
      "第32章 基于渲染路径的优化",
      "VertexLit优化"
    ]
  },
  {
    "id": "usl-32-render-path-optimization-2",
    "chapter": "usl-32-render-path-optimization",
    "level": 2,
    "question": "第32章 基于渲染路径的优化如何连接“Forward优化”与“Deferred优化”？",
    "answer": "限制像素灯、额外Pass和透明过度绘制的路径策略。 控制G-buffer带宽、灯光体积与不透明适用范围的策略。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第32章 基于渲染路径的优化",
      "执行链"
    ]
  },
  {
    "id": "usl-32-render-path-optimization-3",
    "chapter": "usl-32-render-path-optimization",
    "level": 3,
    "question": "第32章 基于渲染路径的优化最关键的失败反例是什么？",
    "answer": "只看编辑器FPS比较渲染路径，没有固定VSync、分辨率、灯光覆盖和透明对象。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第32章 基于渲染路径的优化",
      "反例"
    ]
  },
  {
    "id": "usl-32-render-path-optimization-4",
    "chapter": "usl-32-render-path-optimization",
    "level": 4,
    "question": "怎样用“瓶颈证书”验收第32章 基于渲染路径的优化？",
    "answer": "用帧捕获证明成本位于CPU、顶点、片元或带宽的记录。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第32章 基于渲染路径的优化",
      "验收"
    ]
  },
  {
    "id": "usl-33-mobile-optimization-1",
    "chapter": "usl-33-mobile-optimization",
    "level": 1,
    "question": "第33章 移动平台上的优化中“Tile Based GPU”承担什么任务？",
    "answer": "按屏幕小块缓存并处理几何与片元的移动GPU架构。",
    "tags": [
      "第33章 移动平台上的优化",
      "Tile Based GPU"
    ]
  },
  {
    "id": "usl-33-mobile-optimization-2",
    "chapter": "usl-33-mobile-optimization",
    "level": 2,
    "question": "第33章 移动平台上的优化如何连接“精度限定”与“纹理带宽”？",
    "answer": "用fixed、half和float表达数值范围与硬件成本的选择。 纹理尺寸、格式、采样和缓存未命中带来的内存成本。 必须标注实际Pass、空间和输入来源。",
    "tags": [
      "第33章 移动平台上的优化",
      "执行链"
    ]
  },
  {
    "id": "usl-33-mobile-optimization-3",
    "chapter": "usl-33-mobile-optimization",
    "level": 3,
    "question": "第33章 移动平台上的优化最关键的失败反例是什么？",
    "answer": "在桌面GPU上把float改成half后没有差异，就认定移动端精度和性能也无影响。 应使用最小场景与帧捕获定位。",
    "tags": [
      "第33章 移动平台上的优化",
      "反例"
    ]
  },
  {
    "id": "usl-33-mobile-optimization-4",
    "chapter": "usl-33-mobile-optimization",
    "level": 4,
    "question": "怎样用“过度绘制”验收第33章 移动平台上的优化？",
    "answer": "同一像素被透明或重叠几何反复着色的现象。 保存源码、状态、参考图、GPU事件与CPU/GPU计时。",
    "tags": [
      "第33章 移动平台上的优化",
      "验收"
    ]
  }
];
