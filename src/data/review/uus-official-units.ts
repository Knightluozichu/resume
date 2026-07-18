import type { ReviewQuestion } from "./types";
export const uusOfficialUnitQuestions: ReviewQuestion[]=[
  {
    "id": "uus-01-package-topology-1",
    "chapter": "uus-01-package-topology",
    "level": 1,
    "question": "源码单元1 包入口与Shader索引中“ShaderPathID”的源码职责是什么？",
    "answer": "由运行时代码定位URP内置Shader资源的稳定枚举。",
    "tags": [
      "源码单元1 包入口与Shader索引",
      "ShaderPathID"
    ]
  },
  {
    "id": "uus-01-package-topology-2",
    "chapter": "uus-01-package-topology",
    "level": 2,
    "question": "源码单元1 包入口与Shader索引如何连接“Shaders目录”与“ShaderLibrary目录”？",
    "answer": "保存内置材质、Pass实现和专用渲染Shader的源码根。 保存跨材质共享的输入、光照、阴影和平台函数。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元1 包入口与Shader索引",
      "源码链"
    ]
  },
  {
    "id": "uus-01-package-topology-3",
    "chapter": "uus-01-package-topology",
    "level": 3,
    "question": "源码单元1 包入口与Shader索引最关键的失败配置是什么？",
    "answer": "只记菜单名而不记录包版本和真实路径，升级Unity后仍用旧函数签名解释新源码。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元1 包入口与Shader索引",
      "反例"
    ]
  },
  {
    "id": "uus-01-package-topology-4",
    "chapter": "uus-01-package-topology",
    "level": 4,
    "question": "怎样用“依赖图”验收源码单元1 包入口与Shader索引？",
    "answer": "从ShaderLab include到HLSL函数和运行时Pass的有向关系。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元1 包入口与Shader索引",
      "验收"
    ]
  },
  {
    "id": "uus-02-shaderlab-pass-contract-1",
    "chapter": "uus-02-shaderlab-pass-contract",
    "level": 1,
    "question": "源码单元2 ShaderLab与LightMode契约中“RenderPipeline标签”的源码职责是什么？",
    "answer": "让SubShader只在UniversalPipeline中成为候选的标签。",
    "tags": [
      "源码单元2 ShaderLab与LightMode契约",
      "RenderPipeline标签"
    ]
  },
  {
    "id": "uus-02-shaderlab-pass-contract-2",
    "chapter": "uus-02-shaderlab-pass-contract",
    "level": 2,
    "question": "源码单元2 ShaderLab与LightMode契约如何连接“LightMode”与“UniversalMaterialType”？",
    "answer": "把Pass角色与URP运行时绘制阶段匹配的标签。 为Lit、SimpleLit等材质类型提供延迟路径标识。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元2 ShaderLab与LightMode契约",
      "源码链"
    ]
  },
  {
    "id": "uus-02-shaderlab-pass-contract-3",
    "chapter": "uus-02-shaderlab-pass-contract",
    "level": 3,
    "question": "源码单元2 ShaderLab与LightMode契约最关键的失败配置是什么？",
    "answer": "自定义Pass只有名称没有受支持的LightMode，Shader能编译却从不被URP调度。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元2 ShaderLab与LightMode契约",
      "反例"
    ]
  },
  {
    "id": "uus-02-shaderlab-pass-contract-4",
    "chapter": "uus-02-shaderlab-pass-contract",
    "level": 4,
    "question": "怎样用“Pass证书”验收源码单元2 ShaderLab与LightMode契约？",
    "answer": "记录Pass名、LightMode、关键字、include和目标缓冲的证据。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元2 ShaderLab与LightMode契约",
      "验收"
    ]
  },
  {
    "id": "uus-03-lit-input-material-1",
    "chapter": "uus-03-lit-input-material",
    "level": 1,
    "question": "源码单元3 Lit.shader与LitInput材质入口中“Lit Properties”的源码职责是什么？",
    "answer": "BaseMap、Metallic、Specular、Smoothness、Normal、Occlusion和Emission接口。",
    "tags": [
      "源码单元3 Lit.shader与LitInput材质入口",
      "Lit Properties"
    ]
  },
  {
    "id": "uus-03-lit-input-material-2",
    "chapter": "uus-03-lit-input-material",
    "level": 2,
    "question": "源码单元3 Lit.shader与LitInput材质入口如何连接“UnityPerMaterial”与“SampleMetallicSpecGloss”？",
    "answer": "SRP Batcher要求稳定布局的逐材质常量缓冲。 按工作流和纹理通道构造金属度或镜面数据的函数。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元3 Lit.shader与LitInput材质入口",
      "源码链"
    ]
  },
  {
    "id": "uus-03-lit-input-material-3",
    "chapter": "uus-03-lit-input-material",
    "level": 3,
    "question": "源码单元3 Lit.shader与LitInput材质入口最关键的失败配置是什么？",
    "answer": "在CBUFFER外新增逐材质变量，画面正常但SRP Batcher失效且批量提交成本上升。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元3 Lit.shader与LitInput材质入口",
      "反例"
    ]
  },
  {
    "id": "uus-03-lit-input-material-4",
    "chapter": "uus-03-lit-input-material",
    "level": 4,
    "question": "怎样用“SurfaceData”验收源码单元3 Lit.shader与LitInput材质入口？",
    "answer": "跨Forward与GBuffer传递材质语义的标准结构。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元3 Lit.shader与LitInput材质入口",
      "验收"
    ]
  },
  {
    "id": "uus-04-brdf-surface-data-1",
    "chapter": "uus-04-brdf-surface-data",
    "level": 1,
    "question": "源码单元4 SurfaceData到BRDFData中“BRDFData”的源码职责是什么？",
    "answer": "保存漫反射、镜面、粗糙度与归一化项的光照结构。",
    "tags": [
      "源码单元4 SurfaceData到BRDFData",
      "BRDFData"
    ]
  },
  {
    "id": "uus-04-brdf-surface-data-2",
    "chapter": "uus-04-brdf-surface-data",
    "level": 2,
    "question": "源码单元4 SurfaceData到BRDFData如何连接“InitializeBRDFData”与“DirectBRDFSpecular”？",
    "answer": "按金属或镜面工作流把SurfaceData转换为BRDF参数。 计算实时直接镜面反射的核心函数。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元4 SurfaceData到BRDFData",
      "源码链"
    ]
  },
  {
    "id": "uus-04-brdf-surface-data-3",
    "chapter": "uus-04-brdf-surface-data",
    "level": 3,
    "question": "源码单元4 SurfaceData到BRDFData最关键的失败配置是什么？",
    "answer": "把Smoothness直接当Roughness传入BRDF，材质粗糙与光滑表现完全反转。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元4 SurfaceData到BRDFData",
      "反例"
    ]
  },
  {
    "id": "uus-04-brdf-surface-data-4",
    "chapter": "uus-04-brdf-surface-data",
    "level": 4,
    "question": "怎样用“能量分配”验收源码单元4 SurfaceData到BRDFData？",
    "answer": "在漫反射和镜面反射间按反射率分配能量的规则。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元4 SurfaceData到BRDFData",
      "验收"
    ]
  },
  {
    "id": "uus-05-lit-forward-pass-1",
    "chapter": "uus-05-lit-forward-pass",
    "level": 1,
    "question": "源码单元5 LitForwardPass前向主链中“Attributes”的源码职责是什么？",
    "answer": "顶点位置、法线、切线、UV和光照贴图坐标输入。",
    "tags": [
      "源码单元5 LitForwardPass前向主链",
      "Attributes"
    ]
  },
  {
    "id": "uus-05-lit-forward-pass-2",
    "chapter": "uus-05-lit-forward-pass",
    "level": 2,
    "question": "源码单元5 LitForwardPass前向主链如何连接“Varyings”与“InputData”？",
    "answer": "Forward顶点阶段传向片元阶段的插值合同。 世界位置、法线、视线、阴影坐标、GI和屏幕UV的光照输入。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元5 LitForwardPass前向主链",
      "源码链"
    ]
  },
  {
    "id": "uus-05-lit-forward-pass-3",
    "chapter": "uus-05-lit-forward-pass",
    "level": 3,
    "question": "源码单元5 LitForwardPass前向主链最关键的失败配置是什么？",
    "answer": "复制片元入口却遗漏normalizedScreenSpaceUV或shadowCoord，SSAO、阴影或Forward+只在部分配置下失效。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元5 LitForwardPass前向主链",
      "反例"
    ]
  },
  {
    "id": "uus-05-lit-forward-pass-4",
    "chapter": "uus-05-lit-forward-pass",
    "level": 4,
    "question": "怎样用“Fog与Alpha”验收源码单元5 LitForwardPass前向主链？",
    "answer": "光照结束后执行雾、透明和输出Alpha处理的尾段。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元5 LitForwardPass前向主链",
      "验收"
    ]
  },
  {
    "id": "uus-06-lit-gbuffer-pass-1",
    "chapter": "uus-06-lit-gbuffer-pass",
    "level": 1,
    "question": "源码单元6 LitGBufferPass延迟写入中“FragmentOutput”的源码职责是什么？",
    "answer": "保存GBuffer多个MRT目标的延迟输出结构。",
    "tags": [
      "源码单元6 LitGBufferPass延迟写入",
      "FragmentOutput"
    ]
  },
  {
    "id": "uus-06-lit-gbuffer-pass-2",
    "chapter": "uus-06-lit-gbuffer-pass",
    "level": 2,
    "question": "源码单元6 LitGBufferPass延迟写入如何连接“BRDF编码”与“MaterialFlags”？",
    "answer": "把材质BRDF、法线、烘焙GI和标志压入GBuffer。 区分Lit、SimpleLit、ReceiveShadowsOff等材质行为的位标志。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元6 LitGBufferPass延迟写入",
      "源码链"
    ]
  },
  {
    "id": "uus-06-lit-gbuffer-pass-3",
    "chapter": "uus-06-lit-gbuffer-pass",
    "level": 3,
    "question": "源码单元6 LitGBufferPass延迟写入最关键的失败配置是什么？",
    "answer": "修改GBuffer编码却没有同步延迟解码，写入看似正常但所有灯光读取错误。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元6 LitGBufferPass延迟写入",
      "反例"
    ]
  },
  {
    "id": "uus-06-lit-gbuffer-pass-4",
    "chapter": "uus-06-lit-gbuffer-pass",
    "level": 4,
    "question": "怎样用“MRT带宽”验收源码单元6 LitGBufferPass延迟写入？",
    "answer": "同一片元写多个渲染目标造成的显存流量。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元6 LitGBufferPass延迟写入",
      "验收"
    ]
  },
  {
    "id": "uus-07-shared-utility-passes-1",
    "chapter": "uus-07-shared-utility-passes",
    "level": 1,
    "question": "源码单元7 深度、法线、阴影、Meta与运动Pass中“DepthOnly”的源码职责是什么？",
    "answer": "为深度预Pass或相机深度纹理写入深度。",
    "tags": [
      "源码单元7 深度、法线、阴影、Meta与运动Pass",
      "DepthOnly"
    ]
  },
  {
    "id": "uus-07-shared-utility-passes-2",
    "chapter": "uus-07-shared-utility-passes",
    "level": 2,
    "question": "源码单元7 深度、法线、阴影、Meta与运动Pass如何连接“DepthNormals”与“ShadowCaster”？",
    "answer": "同时输出深度和世界法线供SSAO等屏幕效果使用。 从光源视角写入阴影图并处理偏差与Alpha裁剪。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元7 深度、法线、阴影、Meta与运动Pass",
      "源码链"
    ]
  },
  {
    "id": "uus-07-shared-utility-passes-3",
    "chapter": "uus-07-shared-utility-passes",
    "level": 3,
    "question": "源码单元7 深度、法线、阴影、Meta与运动Pass最关键的失败配置是什么？",
    "answer": "只修改Forward顶点动画，辅助Pass仍用原始顶点，产生漂浮阴影、错误深度和TAA鬼影。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元7 深度、法线、阴影、Meta与运动Pass",
      "反例"
    ]
  },
  {
    "id": "uus-07-shared-utility-passes-4",
    "chapter": "uus-07-shared-utility-passes",
    "level": 4,
    "question": "怎样用“MotionVectors”验收源码单元7 深度、法线、阴影、Meta与运动Pass？",
    "answer": "用当前与前一帧裁剪位置生成速度向量。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元7 深度、法线、阴影、Meta与运动Pass",
      "验收"
    ]
  },
  {
    "id": "uus-08-simple-lit-1",
    "chapter": "uus-08-simple-lit",
    "level": 1,
    "question": "源码单元8 SimpleLit材质族中“SimpleLit”的源码职责是什么？",
    "answer": "以Blinn-Phong式高光替代完整PBR的轻量受光材质。",
    "tags": [
      "源码单元8 SimpleLit材质族",
      "SimpleLit"
    ]
  },
  {
    "id": "uus-08-simple-lit-2",
    "chapter": "uus-08-simple-lit",
    "level": 2,
    "question": "源码单元8 SimpleLit材质族如何连接“SpecularSource”与“BlinnPhong”？",
    "answer": "在无高光、颜色高光与纹理高光之间选择的材质模式。 SimpleLit直接光照中使用的半角向量镜面模型。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元8 SimpleLit材质族",
      "源码链"
    ]
  },
  {
    "id": "uus-08-simple-lit-3",
    "chapter": "uus-08-simple-lit",
    "level": 3,
    "question": "源码单元8 SimpleLit材质族最关键的失败配置是什么？",
    "answer": "直接把所有Lit材质换成SimpleLit，没有验证金属、反射与光滑度语义差异。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元8 SimpleLit材质族",
      "反例"
    ]
  },
  {
    "id": "uus-08-simple-lit-4",
    "chapter": "uus-08-simple-lit",
    "level": 4,
    "question": "怎样用“成本证书”验收源码单元8 SimpleLit材质族？",
    "answer": "对比Lit与SimpleLit变体、采样、ALU和画质的记录。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元8 SimpleLit材质族",
      "验收"
    ]
  },
  {
    "id": "uus-09-complex-lit-1",
    "chapter": "uus-09-complex-lit",
    "level": 1,
    "question": "源码单元9 ComplexLit与ClearCoat中“ComplexLit”的源码职责是什么？",
    "answer": "在Lit基础上启用ClearCoat等复杂材质特性的内置Shader。",
    "tags": [
      "源码单元9 ComplexLit与ClearCoat",
      "ComplexLit"
    ]
  },
  {
    "id": "uus-09-complex-lit-2",
    "chapter": "uus-09-complex-lit",
    "level": 2,
    "question": "源码单元9 ComplexLit与ClearCoat如何连接“ClearCoatMask”与“ClearCoatSmoothness”？",
    "answer": "控制第二层清漆覆盖比例的材质参数。 控制清漆层微表面高光宽度的参数。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元9 ComplexLit与ClearCoat",
      "源码链"
    ]
  },
  {
    "id": "uus-09-complex-lit-3",
    "chapter": "uus-09-complex-lit",
    "level": 3,
    "question": "源码单元9 ComplexLit与ClearCoat最关键的失败配置是什么？",
    "answer": "材质显示清漆参数但Shader变体未启用ClearCoat关键字，属性变化完全无效。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元9 ComplexLit与ClearCoat",
      "反例"
    ]
  },
  {
    "id": "uus-09-complex-lit-4",
    "chapter": "uus-09-complex-lit",
    "level": 4,
    "question": "怎样用“额外评估”验收源码单元9 ComplexLit与ClearCoat？",
    "answer": "ClearCoat让直接光和环境光多执行一层镜面计算。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元9 ComplexLit与ClearCoat",
      "验收"
    ]
  },
  {
    "id": "uus-10-baked-lit-1",
    "chapter": "uus-10-baked-lit",
    "level": 1,
    "question": "源码单元10 BakedLit静态照明材质中“BakedLit”的源码职责是什么？",
    "answer": "主要消费Lightmap或Light Probe、不计算实时PBR光照的轻量材质。",
    "tags": [
      "源码单元10 BakedLit静态照明材质",
      "BakedLit"
    ]
  },
  {
    "id": "uus-10-baked-lit-2",
    "chapter": "uus-10-baked-lit",
    "level": 2,
    "question": "源码单元10 BakedLit静态照明材质如何连接“StaticLightmapUV”与“SAMPLE_GI”？",
    "answer": "把第二套UV变换到光照贴图图集的坐标。 按Lightmap或SH关键字读取烘焙间接光。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元10 BakedLit静态照明材质",
      "源码链"
    ]
  },
  {
    "id": "uus-10-baked-lit-3",
    "chapter": "uus-10-baked-lit",
    "level": 3,
    "question": "源码单元10 BakedLit静态照明材质最关键的失败配置是什么？",
    "answer": "对象未标记或UV错误却继续调材质，BakedLit只能读取空白或错误图集区域。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元10 BakedLit静态照明材质",
      "反例"
    ]
  },
  {
    "id": "uus-10-baked-lit-4",
    "chapter": "uus-10-baked-lit",
    "level": 4,
    "question": "怎样用“Baked Meta”验收源码单元10 BakedLit静态照明材质？",
    "answer": "为后续烘焙输出材质Albedo和Emission的Pass。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元10 BakedLit静态照明材质",
      "验收"
    ]
  },
  {
    "id": "uus-11-unlit-1",
    "chapter": "uus-11-unlit",
    "level": 1,
    "question": "源码单元11 Unlit与多Pass兼容中“Unlit”的源码职责是什么？",
    "answer": "不执行场景光照、直接输出BaseMap与颜色的材质。",
    "tags": [
      "源码单元11 Unlit与多Pass兼容",
      "Unlit"
    ]
  },
  {
    "id": "uus-11-unlit-2",
    "chapter": "uus-11-unlit",
    "level": 2,
    "question": "源码单元11 Unlit与多Pass兼容如何连接“Unlit Forward”与“Unlit GBuffer”？",
    "answer": "在前向阶段输出颜色、雾与Alpha的Pass。 在延迟Renderer中用专门材质类型保持可见的Pass。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元11 Unlit与多Pass兼容",
      "源码链"
    ]
  },
  {
    "id": "uus-11-unlit-3",
    "chapter": "uus-11-unlit",
    "level": 3,
    "question": "源码单元11 Unlit与多Pass兼容最关键的失败配置是什么？",
    "answer": "认为Unlit无需DepthNormals和MotionVectors，后处理和TAA出现轮廓缺口。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元11 Unlit与多Pass兼容",
      "反例"
    ]
  },
  {
    "id": "uus-11-unlit-4",
    "chapter": "uus-11-unlit",
    "level": 4,
    "question": "怎样用“Alpha与Fog”验收源码单元11 Unlit与多Pass兼容？",
    "answer": "即使不受光也仍参与透明、雾和颜色空间处理。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元11 Unlit与多Pass兼容",
      "验收"
    ]
  },
  {
    "id": "uus-12-particle-family-1",
    "chapter": "uus-12-particle-family",
    "level": 1,
    "question": "源码单元12 Particles Lit、SimpleLit与Unlit中“粒子顶点流”的源码职责是什么？",
    "answer": "位置、颜色、UV、动画帧、中心和自定义数据组成的输入。",
    "tags": [
      "源码单元12 Particles Lit、SimpleLit与Unlit",
      "粒子顶点流"
    ]
  },
  {
    "id": "uus-12-particle-family-2",
    "chapter": "uus-12-particle-family",
    "level": 2,
    "question": "源码单元12 Particles Lit、SimpleLit与Unlit如何连接“软粒子”与“相机淡出”？",
    "answer": "根据场景深度与粒子深度差淡化交界的技术。 按视距或近裁剪距离调节粒子Alpha的机制。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元12 Particles Lit、SimpleLit与Unlit",
      "源码链"
    ]
  },
  {
    "id": "uus-12-particle-family-3",
    "chapter": "uus-12-particle-family",
    "level": 3,
    "question": "源码单元12 Particles Lit、SimpleLit与Unlit最关键的失败配置是什么？",
    "answer": "粒子系统没有发送Shader期望的顶点流，功能关键字开启后读取到错误通道。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元12 Particles Lit、SimpleLit与Unlit",
      "反例"
    ]
  },
  {
    "id": "uus-12-particle-family-4",
    "chapter": "uus-12-particle-family",
    "level": 4,
    "question": "怎样用“粒子实例化”验收源码单元12 Particles Lit、SimpleLit与Unlit？",
    "answer": "用实例数据批量驱动多个粒子网格的路径。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元12 Particles Lit、SimpleLit与Unlit",
      "验收"
    ]
  },
  {
    "id": "uus-13-terrain-family-1",
    "chapter": "uus-13-terrain-family",
    "level": 1,
    "question": "源码单元13 Terrain Lit、Detail与Grass中“Splat Control”的源码职责是什么？",
    "answer": "用控制贴图RGBA混合多层地形材质的权重。",
    "tags": [
      "源码单元13 Terrain Lit、Detail与Grass",
      "Splat Control"
    ]
  },
  {
    "id": "uus-13-terrain-family-2",
    "chapter": "uus-13-terrain-family",
    "level": 2,
    "question": "源码单元13 Terrain Lit、Detail与Grass如何连接“Terrain Add Pass”与“BasemapGen”？",
    "answer": "超过单Pass层数后追加混合更多地形层的Pass。 为远距离地形生成低成本合成底图的Shader。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元13 Terrain Lit、Detail与Grass",
      "源码链"
    ]
  },
  {
    "id": "uus-13-terrain-family-3",
    "chapter": "uus-13-terrain-family",
    "level": 3,
    "question": "源码单元13 Terrain Lit、Detail与Grass最关键的失败配置是什么？",
    "answer": "只改主Terrain Pass的风动或Alpha裁剪，DepthNormals与阴影仍使用另一套轮廓。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元13 Terrain Lit、Detail与Grass",
      "反例"
    ]
  },
  {
    "id": "uus-13-terrain-family-4",
    "chapter": "uus-13-terrain-family",
    "level": 4,
    "question": "怎样用“Waving Grass”验收源码单元13 Terrain Lit、Detail与Grass？",
    "answer": "按风参数顶点变形并维护深度法线一致性的植被Shader。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元13 Terrain Lit、Detail与Grass",
      "验收"
    ]
  },
  {
    "id": "uus-14-nature-speedtree-1",
    "chapter": "uus-14-nature-speedtree",
    "level": 1,
    "question": "源码单元14 SpeedTree 7、8、9与Billboard中“SpeedTree Geometry”的源码职责是什么？",
    "answer": "区分枝干、叶片、Frond和Billboard的几何类型。",
    "tags": [
      "源码单元14 SpeedTree 7、8、9与Billboard",
      "SpeedTree Geometry"
    ]
  },
  {
    "id": "uus-14-nature-speedtree-2",
    "chapter": "uus-14-nature-speedtree",
    "level": 2,
    "question": "源码单元14 SpeedTree 7、8、9与Billboard如何连接“风动画”与“Billboard”？",
    "answer": "按树实例、顶点权重和时间驱动的分层形变。 远距离以朝向相机的平面替代完整树几何。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元14 SpeedTree 7、8、9与Billboard",
      "源码链"
    ]
  },
  {
    "id": "uus-14-nature-speedtree-3",
    "chapter": "uus-14-nature-speedtree",
    "level": 3,
    "question": "源码单元14 SpeedTree 7、8、9与Billboard最关键的失败配置是什么？",
    "answer": "只在可见Pass计算风动，阴影、深度和运动向量留在静态位置。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元14 SpeedTree 7、8、9与Billboard",
      "反例"
    ]
  },
  {
    "id": "uus-14-nature-speedtree-4",
    "chapter": "uus-14-nature-speedtree",
    "level": 4,
    "question": "怎样用“版本族”验收源码单元14 SpeedTree 7、8、9与Billboard？",
    "answer": "SpeedTree 7、8、9资产格式与Shader实现的兼容边界。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元14 SpeedTree 7、8、9与Billboard",
      "验收"
    ]
  },
  {
    "id": "uus-15-renderer-2d-1",
    "chapter": "uus-15-renderer-2d",
    "level": 1,
    "question": "源码单元15 2D Lit、Unlit、Mask与Shape Light中“Sprite Lit”的源码职责是什么？",
    "answer": "接收2D Renderer Shape Light纹理的精灵受光Shader。",
    "tags": [
      "源码单元15 2D Lit、Unlit、Mask与Shape Light",
      "Sprite Lit"
    ]
  },
  {
    "id": "uus-15-renderer-2d-2",
    "chapter": "uus-15-renderer-2d",
    "level": 2,
    "question": "源码单元15 2D Lit、Unlit、Mask与Shape Light如何连接“Sprite Unlit”与“Shape Light”？",
    "answer": "只输出精灵纹理、顶点色与Alpha的2D材质。 把2D光形状累积到光照纹理再供精灵采样的路径。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元15 2D Lit、Unlit、Mask与Shape Light",
      "源码链"
    ]
  },
  {
    "id": "uus-15-renderer-2d-3",
    "chapter": "uus-15-renderer-2d",
    "level": 3,
    "question": "源码单元15 2D Lit、Unlit、Mask与Shape Light最关键的失败配置是什么？",
    "answer": "把UniversalForward标签用于2D精灵Pass，Shader编译但2D Renderer不会按预期选择。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元15 2D Lit、Unlit、Mask与Shape Light",
      "反例"
    ]
  },
  {
    "id": "uus-15-renderer-2d-4",
    "chapter": "uus-15-renderer-2d",
    "level": 4,
    "question": "怎样用“2D Shadow”验收源码单元15 2D Lit、Unlit、Mask与Shape Light？",
    "answer": "由ShadowCaster2D几何投影和解除投影组成的阴影流程。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元15 2D Lit、Unlit、Mask与Shape Light",
      "验收"
    ]
  },
  {
    "id": "uus-16-decal-dbuffer-1",
    "chapter": "uus-16-decal-dbuffer",
    "level": 1,
    "question": "源码单元16 Decal ShaderGraph与DBuffer中“Decal”的源码职责是什么？",
    "answer": "把颜色、法线或材质属性投射到已有表面的效果。",
    "tags": [
      "源码单元16 Decal ShaderGraph与DBuffer",
      "Decal"
    ]
  },
  {
    "id": "uus-16-decal-dbuffer-2",
    "chapter": "uus-16-decal-dbuffer",
    "level": 2,
    "question": "源码单元16 Decal ShaderGraph与DBuffer如何连接“DBuffer”与“DecalSurfaceData”？",
    "answer": "在光照前保存Decal材质改写的多目标缓冲。 描述Decal Albedo、Normal、MAOS与混合权重的结构。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元16 Decal ShaderGraph与DBuffer",
      "源码链"
    ]
  },
  {
    "id": "uus-16-decal-dbuffer-3",
    "chapter": "uus-16-decal-dbuffer",
    "level": 3,
    "question": "源码单元16 Decal ShaderGraph与DBuffer最关键的失败配置是什么？",
    "answer": "投影材质写法线但相机没有生成所需深度法线，Decal方向和边缘错误。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元16 Decal ShaderGraph与DBuffer",
      "反例"
    ]
  },
  {
    "id": "uus-16-decal-dbuffer-4",
    "chapter": "uus-16-decal-dbuffer",
    "level": 4,
    "question": "怎样用“表面改写”验收源码单元16 Decal ShaderGraph与DBuffer？",
    "answer": "在Forward输入或Deferred GBuffer前合并Decal数据的步骤。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元16 Decal ShaderGraph与DBuffer",
      "验收"
    ]
  },
  {
    "id": "uus-17-postprocess-fullscreen-1",
    "chapter": "uus-17-postprocess-fullscreen",
    "level": 1,
    "question": "源码单元17 后处理、Blit与时域效果中“UberPost”的源码职责是什么？",
    "answer": "在一个综合Pass中组合颜色分级、畸变、暗角和颗粒的Shader。",
    "tags": [
      "源码单元17 后处理、Blit与时域效果",
      "UberPost"
    ]
  },
  {
    "id": "uus-17-postprocess-fullscreen-2",
    "chapter": "uus-17-postprocess-fullscreen",
    "level": 2,
    "question": "源码单元17 后处理、Blit与时域效果如何连接“Bloom金字塔”与“TemporalAA”？",
    "answer": "通过降采样、模糊和逐级上采样提取高亮扩散。 用运动向量和历史颜色重投影、裁剪与累积的抗锯齿。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元17 后处理、Blit与时域效果",
      "源码链"
    ]
  },
  {
    "id": "uus-17-postprocess-fullscreen-3",
    "chapter": "uus-17-postprocess-fullscreen",
    "level": 3,
    "question": "源码单元17 后处理、Blit与时域效果最关键的失败配置是什么？",
    "answer": "在XR或动态分辨率下手写普通quad和tex2D，UV缩放、Y翻转或双眼切片错误。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元17 后处理、Blit与时域效果",
      "反例"
    ]
  },
  {
    "id": "uus-17-postprocess-fullscreen-4",
    "chapter": "uus-17-postprocess-fullscreen",
    "level": 4,
    "question": "怎样用“Blit契约”验收源码单元17 后处理、Blit与时域效果？",
    "answer": "规定源纹理、采样方式、视口、Y翻转和目标格式的全屏复制路径。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元17 后处理、Blit与时域效果",
      "验收"
    ]
  },
  {
    "id": "uus-18-core-input-transforms-1",
    "chapter": "uus-18-core-input-transforms",
    "level": 1,
    "question": "源码单元18 Core、Input与坐标变换中“Core.hlsl”的源码职责是什么？",
    "answer": "聚合SRP Core与URP常用定义、纹理宏和变换函数的入口。",
    "tags": [
      "源码单元18 Core、Input与坐标变换",
      "Core.hlsl"
    ]
  },
  {
    "id": "uus-18-core-input-transforms-2",
    "chapter": "uus-18-core-input-transforms",
    "level": 2,
    "question": "源码单元18 Core、Input与坐标变换如何连接“UnityInput”与“VertexPositionInputs”？",
    "answer": "声明相机、矩阵、时间、屏幕与全局渲染常量。 一次计算OS、WS、VS、CS与NDC位置的结构。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元18 Core、Input与坐标变换",
      "源码链"
    ]
  },
  {
    "id": "uus-18-core-input-transforms-3",
    "chapter": "uus-18-core-input-transforms",
    "level": 3,
    "question": "源码单元18 Core、Input与坐标变换最关键的失败配置是什么？",
    "answer": "把positionNDC直接当零到一UV，忽略齐次除法和平台翻转。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元18 Core、Input与坐标变换",
      "反例"
    ]
  },
  {
    "id": "uus-18-core-input-transforms-4",
    "chapter": "uus-18-core-input-transforms",
    "level": 4,
    "question": "怎样用“相机相对位置”验收源码单元18 Core、Input与坐标变换？",
    "answer": "在大世界或平台配置下正确获取世界空间相机位置的函数契约。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元18 Core、Input与坐标变换",
      "验收"
    ]
  },
  {
    "id": "uus-19-lighting-realtime-gi-1",
    "chapter": "uus-19-lighting-realtime-gi",
    "level": 1,
    "question": "源码单元19 Lighting、RealtimeLights与GI中“GetMainLight”的源码职责是什么？",
    "answer": "读取主光方向、颜色、距离衰减和阴影衰减的入口。",
    "tags": [
      "源码单元19 Lighting、RealtimeLights与GI",
      "GetMainLight"
    ]
  },
  {
    "id": "uus-19-lighting-realtime-gi-2",
    "chapter": "uus-19-lighting-realtime-gi",
    "level": 2,
    "question": "源码单元19 Lighting、RealtimeLights与GI如何连接“GetAdditionalLight”与“Cluster Light Loop”？",
    "answer": "按索引读取影响当前对象或集群的附加光。 在Forward+中按屏幕集群遍历灯光的路径。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元19 Lighting、RealtimeLights与GI",
      "源码链"
    ]
  },
  {
    "id": "uus-19-lighting-realtime-gi-3",
    "chapter": "uus-19-lighting-realtime-gi",
    "level": 3,
    "question": "源码单元19 Lighting、RealtimeLights与GI最关键的失败配置是什么？",
    "answer": "在Forward+继续按旧Per Object灯列表假设索引，灯数和可见范围不一致。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元19 Lighting、RealtimeLights与GI",
      "反例"
    ]
  },
  {
    "id": "uus-19-lighting-realtime-gi-4",
    "chapter": "uus-19-lighting-realtime-gi",
    "level": 4,
    "question": "怎样用“Light Cookie”验收源码单元19 Lighting、RealtimeLights与GI？",
    "answer": "按光源空间采样Cookie纹理调制光照的模块。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元19 Lighting、RealtimeLights与GI",
      "验收"
    ]
  },
  {
    "id": "uus-20-shadows-ao-screen-inputs-1",
    "chapter": "uus-20-shadows-ao-screen-inputs",
    "level": 1,
    "question": "源码单元20 Shadows、AO与屏幕纹理中“MainLightShadow”的源码职责是什么？",
    "answer": "从主光阴影图与级联数据计算衰减的函数族。",
    "tags": [
      "源码单元20 Shadows、AO与屏幕纹理",
      "MainLightShadow"
    ]
  },
  {
    "id": "uus-20-shadows-ao-screen-inputs-2",
    "chapter": "uus-20-shadows-ao-screen-inputs",
    "level": 2,
    "question": "源码单元20 Shadows、AO与屏幕纹理如何连接“AdditionalLightShadow”与“ScreenSpaceOcclusionData”？",
    "answer": "从附加光阴影图集读取点光或聚光阴影的函数族。 保存直接和间接环境遮蔽因子的结构。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元20 Shadows、AO与屏幕纹理",
      "源码链"
    ]
  },
  {
    "id": "uus-20-shadows-ao-screen-inputs-3",
    "chapter": "uus-20-shadows-ao-screen-inputs",
    "level": 3,
    "question": "源码单元20 Shadows、AO与屏幕纹理最关键的失败配置是什么？",
    "answer": "直接声明Texture2D相机深度，在XR纹理数组或反转Z平台读取错误。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元20 Shadows、AO与屏幕纹理",
      "反例"
    ]
  },
  {
    "id": "uus-20-shadows-ao-screen-inputs-4",
    "chapter": "uus-20-shadows-ao-screen-inputs",
    "level": 4,
    "question": "怎样用“Normal Reconstruction”验收源码单元20 Shadows、AO与屏幕纹理？",
    "answer": "在没有法线纹理时从深度邻域重建世界或视空间法线。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元20 Shadows、AO与屏幕纹理",
      "验收"
    ]
  },
  {
    "id": "uus-21-variants-batching-xr-debug-1",
    "chapter": "uus-21-variants-batching-xr-debug",
    "level": 1,
    "question": "源码单元21 变体、SRP Batcher、DOTS、XR与调试中“Shader变体”的源码职责是什么？",
    "answer": "由multi_compile、shader_feature、平台和Renderer配置产生的编译版本。",
    "tags": [
      "源码单元21 变体、SRP Batcher、DOTS、XR与调试",
      "Shader变体"
    ]
  },
  {
    "id": "uus-21-variants-batching-xr-debug-2",
    "chapter": "uus-21-variants-batching-xr-debug",
    "level": 2,
    "question": "源码单元21 变体、SRP Batcher、DOTS、XR与调试如何连接“SRP Batcher”与“DOTS Instancing”？",
    "answer": "按兼容常量布局持续驻留材质数据并减少CPU状态绑定的机制。 从实体实例数据读取覆盖材质属性的Shader路径。 必须给出文件、符号和运行Pass。",
    "tags": [
      "源码单元21 变体、SRP Batcher、DOTS、XR与调试",
      "源码链"
    ]
  },
  {
    "id": "uus-21-variants-batching-xr-debug-3",
    "chapter": "uus-21-variants-batching-xr-debug",
    "level": 3,
    "question": "源码单元21 变体、SRP Batcher、DOTS、XR与调试最关键的失败配置是什么？",
    "answer": "用MaterialPropertyBlock或不一致CBUFFER布局测试SRP Batcher，却把普通实例化与SRP Batcher混为同一种合批。 应用固定提交和GPU捕获定位。",
    "tags": [
      "源码单元21 变体、SRP Batcher、DOTS、XR与调试",
      "反例"
    ]
  },
  {
    "id": "uus-21-variants-batching-xr-debug-4",
    "chapter": "uus-21-variants-batching-xr-debug",
    "level": 4,
    "question": "怎样用“Debug Display”验收源码单元21 变体、SRP Batcher、DOTS、XR与调试？",
    "answer": "用替换Shader和调试关键字可视化材质、光照、层与缓冲的系统。 保存提交、路径、变体、GPU事件和CPU/GPU计时。",
    "tags": [
      "源码单元21 变体、SRP Batcher、DOTS、XR与调试",
      "验收"
    ]
  }
];
