#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "pbrt-book";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/pbrt-book-v2-profiles.json");
const SOURCE_URL = "https://www.pbr-book.org/4ed/contents";
const WORK_TITLE =
  "Physically Based Rendering: From Theory to Implementation, 4th Edition";

const DETAILS = {
  "pbrt-01": {
    title: "1 Introduction",
    sourceUrl: "https://www.pbr-book.org/4ed/Introduction",
    focus: "把相机样本、射线、场景求交、散射与积分器串成可调试调用链",
    concepts: [
      ["pbrt", "系统概览"],
      ["ray tracing", "光线追踪"],
      ["literate programming", "文学编程"],
      ["Integrator", "积分器"],
    ],
    subtopics: [
      "Literate Programming",
      "Photorealistic Rendering and the Ray-Tracing Algorithm",
      "pbrt: System Overview",
      "Using and Understanding the Code",
      "A Brief History of Physically Based Rendering",
    ],
    explanation:
      "pbrt把叙述、数学和可编译C++片段放在同一依赖顺序中；渲染主线从CameraSample生成Ray，经过Scene求交与BSDF/Medium事件，最后由Integrator累计Film样本。调试必须保存像素、样本编号和首个分叉，不能把随机噪声当成不可复现。",
    formula: "L=I(Camera,Scene,Sampler)",
    fault: "只看最终图像而不保留像素样本、射线与首个交点",
    evidence: "scene hash、pixel、sample index、ray、intersection与radiance",
    snippet: [
      "CameraRay ray = camera.GenerateRayDifferential(cameraSample);",
      "SampledSpectrum L = integrator.Li(ray.ray, lambda, sampler);",
      "film.AddSample(pixel, L, ray.weight, visibleSurface);",
    ].join("\n"),
  },
  "pbrt-02": {
    title: "2 Monte Carlo Integration",
    sourceUrl: "https://www.pbr-book.org/4ed/Monte_Carlo_Integration",
    focus: "用概率密度、估计量、方差与重要性采样解释渲染积分的误差",
    concepts: [
      ["monte carlo", "蒙特卡洛"],
      ["estimator", "估计量"],
      ["probability density function", "pdf", "概率密度"],
      ["importance sampling", "重要性采样"],
      ["variance", "方差"],
    ],
    subtopics: [
      "Monte Carlo: Basics",
      "Improving Efficiency",
      "Sampling Using the Inversion Method",
      "Transforming between Distributions",
    ],
    explanation:
      "蒙特卡洛估计量用随机变量样本近似积分，只要样本来自声明的PDF并以同一PDF除权，期望值才与目标积分一致。重要性采样不改变期望值，而是让高贡献区域更常被抽到以降低方差。",
    formula: "\\hat I_N=\\frac1N\\sum_{i=1}^{N}\\frac{f(X_i)}{p(X_i)}",
    fault: "从一个分布采样却用另一个PDF除权，或把低噪声误当成无偏",
    evidence: "seed、sample、f(x)、p(x)、单样本贡献、均值与样本方差",
    snippet: [
      "Float u = sampler.Get1D();",
      "auto [x, pdf] = SampleDistribution(u);",
      "Float estimate = pdf > 0 ? f(x) / pdf : 0;",
    ].join("\n"),
  },
  "pbrt-03": {
    title: "3 Geometry and Transformations",
    sourceUrl: "https://www.pbr-book.org/4ed/Geometry_and_Transformations",
    focus: "区分点、向量、法线、射线、包围盒及其坐标变换合同",
    concepts: [
      ["coordinate system", "坐标系"],
      ["vector", "向量"],
      ["normal", "法线"],
      ["ray", "射线"],
      ["bounding box", "包围盒"],
      ["transformation", "变换"],
    ],
    subtopics: [
      "Coordinate Systems",
      "Vectors, Points, and Normals",
      "Rays and Bounding Boxes",
      "Spherical Geometry",
      "Transformations and Interactions",
    ],
    explanation:
      "点受平移影响而向量不受，法线必须用逆转置矩阵以维持与切向量正交；Ray还携带时间和介质信息。包围盒求交既要处理零方向分量，也要把浮点舍入误差纳入保守边界。",
    formula: "p(t)=o+t\\,d",
    fault: "把法线当向量直接变换，或让包围盒舍入误差漏掉真实交点",
    evidence:
      "source space、target space、matrix、ray interval、normal dot tangent与bounds",
    snippet: [
      "Point3f p = ray(tHit);",
      "Normal3f n = Normalize(Transpose(Inverse(m)) * nObject);",
      "CHECK_LT(AbsDot(n, dpdu), epsilon);",
    ].join("\n"),
  },
  "pbrt-04": {
    title: "4 Radiometry, Spectra, and Color",
    sourceUrl: "https://www.pbr-book.org/4ed/Radiometry_Spectra_and_Color",
    focus: "用辐射通量、辐照度、辐亮度和光谱分布保持量纲与方向语义",
    concepts: [
      ["radiometry", "辐射度量"],
      ["radiance", "辐亮度"],
      ["spectrum", "光谱"],
      ["color", "颜色"],
      ["solid angle", "立体角"],
    ],
    subtopics: [
      "Radiometry",
      "Working with Radiometric Integrals",
      "Surface Reflection",
      "Light Emission",
      "Representing Spectral Distributions",
      "Color",
    ],
    explanation:
      "辐亮度按投影面积与立体角归一化，并沿真空中的同一条射线保持不变，因此最适合连接相机、表面和光源。PBRT 4e以采样波长表示光谱，RGB只应在成像或显示边界出现。",
    formula: "L=\\frac{d^2\\Phi}{dA^{\\perp}d\\omega}",
    fault: "混用辐照度与辐亮度，或在光传输内部过早压成RGB",
    evidence:
      "quantity、unit、wavelength sample、direction、cosine term与conversion boundary",
    snippet: [
      "SampledWavelengths lambda = SampleVisibleWavelengths(u);",
      "SampledSpectrum L = light.Le(ray, lambda);",
      "RGB rgb = sensor.ToSensorRGB(L, lambda);",
    ].join("\n"),
  },
  "pbrt-05": {
    title: "5 Cameras and Film",
    sourceUrl: "https://www.pbr-book.org/4ed/Cameras_and_Film",
    focus: "把Film上的离散样本反投影为带权射线并记录传感器响应",
    concepts: [
      ["camera", "相机"],
      ["CameraSample", "相机样本"],
      ["projective camera", "投影相机"],
      ["film", "成像"],
      ["ray differential", "射线微分"],
    ],
    subtopics: [
      "Camera Interface",
      "Projective Camera Models",
      "Spherical Camera",
      "Film and Imaging",
    ],
    explanation:
      "CameraSample包含film位置、镜头位置、时间与滤波权重；Camera将它变为世界空间Ray并返回光谱权重。Ray differential描述相邻像素射线变化，是纹理过滤和足迹估计的输入。",
    formula: "(ray,w)=Camera(sample,\\lambda)",
    fault: "混淆raster、camera与world空间，或丢掉镜头权重和射线微分",
    evidence:
      "film sample、lens sample、time、transform chain、ray differential与weight",
    snippet: [
      "CameraSample cs = GetCameraSample(sampler, pixel, filter);",
      "CameraRayDifferential cr = camera.GenerateRayDifferential(cs, lambda);",
      "film.AddSample(pixel, L, cr.weight, visibleSurface);",
    ].join("\n"),
  },
  "pbrt-06": {
    title: "6 Shapes",
    sourceUrl: "https://www.pbr-book.org/4ed/Shapes",
    focus: "让Shape求交返回稳定的参数坐标、法线、微分几何与误差界",
    concepts: [
      ["shape", "形状"],
      ["triangle mesh", "三角网格"],
      ["SurfaceInteraction", "表面交互"],
      ["rounding error", "舍入误差"],
      ["bilinear patch", "双线性曲面片"],
    ],
    subtopics: [
      "Basic Shape Interface",
      "Spheres, Cylinders, and Disks",
      "Triangle Meshes",
      "Bilinear Patches and Curves",
      "Managing Rounding Error",
    ],
    explanation:
      "Shape接口必须同时回答是否命中、最近参数t和完整SurfaceInteraction；几何法线、着色法线与参数导数不能混为一谈。PBRT用保守误差界偏移二次射线起点，避免自相交而不跳过邻近几何。",
    formula: "ray(t_{hit})=p_{surface}",
    fault: "只返回命中布尔值，或用固定epsilon同时造成自相交与漏交",
    evidence:
      "t interval、primitive id、uv、pError、geometric normal、shading normal与dpdu",
    snippet: [
      "std::optional<ShapeIntersection> isect = shape.Intersect(ray, tMax);",
      "Ray next = isect->intr.SpawnRay(wi);",
      "CHECK_GE(Dot(next.o - isect->intr.p(), isect->intr.n), 0);",
    ].join("\n"),
  },
  "pbrt-07": {
    title: "7 Primitives and Intersection Acceleration",
    sourceUrl:
      "https://www.pbr-book.org/4ed/Primitives_and_Intersection_Acceleration",
    focus: "用Primitive绑定几何与材质，并以BVH保守裁剪不可能命中的图元",
    concepts: [
      ["primitive", "图元"],
      ["aggregate", "聚合结构"],
      ["intersection", "求交"],
      ["bvh", "层次包围盒"],
      ["surface area heuristic", "SAH", "表面积启发式"],
    ],
    subtopics: [
      "Primitive Interface and Geometric Primitives",
      "Aggregates",
      "Bounding Volume Hierarchies",
    ],
    explanation:
      "Primitive把Shape与Material、AreaLight和MediumInterface关联，Aggregate则在不改变求交语义的前提下组织多个Primitive。BVH节点的bounds必须包含全部后代，SAH只决定分割成本，不能改变最近交点结果。",
    formula: "C_{SAH}=C_t+\\sum_i p_iN_iC_{isect}",
    fault: "构建时使用非保守bounds，或遍历后没有收紧最近tMax",
    evidence:
      "node bounds、split axis、primitive range、visit order、tMax与reference intersection",
    snippet: [
      "if (!node.bounds.IntersectP(ray, tMax)) continue;",
      "if (auto hit = primitive.Intersect(ray, tMax)) {",
      "  tMax = hit->tHit; closest = hit;",
      "}",
    ].join("\n"),
  },
  "pbrt-08": {
    title: "8 Sampling and Reconstruction",
    sourceUrl: "https://www.pbr-book.org/4ed/Sampling_and_Reconstruction",
    focus: "把样本序列、维度消费与重建滤波器绑定到可复现像素估计",
    concepts: [
      ["sampling", "采样"],
      ["sampler", "采样器"],
      ["halton", "Halton"],
      ["sobol", "Sobol"],
      ["reconstruction filter", "重建滤波"],
      ["aliasing", "混叠"],
    ],
    subtopics: [
      "Sampling Theory",
      "Sampling and Integration",
      "Sampling Interface",
      "Independent, Stratified, Halton, and Sobol’ Samplers",
      "Image Reconstruction",
    ],
    explanation:
      "Sampler按像素、样本编号和维度产生确定序列；调用顺序改变会移动后续维度，因此调试时必须记录维度消费。重建滤波器把连续图像估计投影到像素网格，负叶瓣与滤波半径会同时影响锐度、振铃和方差。",
    formula: "\\hat L_p=\\frac{\\sum_i f_iL_i}{\\sum_i f_i}",
    fault: "条件分支改变随机维度消费，或滤波时漏掉权重归一化",
    evidence:
      "pixel、sample index、dimension、u values、filter radius、weight sum与pixel estimate",
    snippet: [
      "sampler.StartPixelSample(pixel, sampleIndex, dimension);",
      "Point2f uFilm = sampler.Get2D();",
      "film.AddSample(pixel, L, filter.Evaluate(offset));",
    ].join("\n"),
  },
  "pbrt-09": {
    title: "9 Reflection Models",
    sourceUrl: "https://www.pbr-book.org/4ed/Reflection_Models",
    focus: "让BSDF的求值、采样与PDF在同一半球、测度和光谱约定下闭合",
    concepts: [
      ["bsdf", "BSDF"],
      ["brdf", "BRDF"],
      ["microfacet", "微表面"],
      ["dielectric", "介质"],
      ["conductor", "导体"],
      ["fresnel", "菲涅耳"],
    ],
    subtopics: [
      "BSDF Representation",
      "Diffuse, Specular Reflection, and Transmission",
      "Conductor BRDF and Dielectric BSDF",
      "Microfacet Theory and Rough Dielectric BSDF",
      "Measured BSDFs and Hair",
    ],
    explanation:
      "BSDF把入射方向映射到出射散射密度，并必须满足求值f、采样Sample_f和概率PDF的一致合同。微表面模型把粗糙度映射到法线分布、遮蔽阴影和Fresnel项；导体与介质的光谱参数不可互换。",
    formula: "f_r=\\frac{F\\,D\\,G}{4|n\\cdot\\omega_i||n\\cdot\\omega_o|}",
    fault: "Sample_f返回的方向与PDF测度不一致，或忘记透射事件的折射率因子",
    evidence:
      "wo、wi、hemisphere、flags、f、pdf、eta、roughness与energy integral",
    snippet: [
      "std::optional<BSDFSample> bs = bsdf.Sample_f(wo, u, uc, flags);",
      "if (!bs || bs->pdf == 0) return {};",
      "beta *= bs->f * AbsDot(bs->wi, ns) / bs->pdf;",
    ].join("\n"),
  },
  "pbrt-10": {
    title: "10 Textures and Materials",
    sourceUrl: "https://www.pbr-book.org/4ed/Textures_and_Materials",
    focus: "从纹理坐标与足迹得到参数，再由Material构造当前交点的BSDF",
    concepts: [
      ["texture", "纹理"],
      ["material", "材质"],
      ["texture mapping", "纹理映射"],
      ["MIPMap", "MIPMap"],
      ["antialiasing", "反走样"],
      ["normal mapping", "法线贴图"],
    ],
    subtopics: [
      "Texture Sampling and Antialiasing",
      "Texture Coordinate Generation",
      "Texture Interface and Basic Textures",
      "Image Texture",
      "Material Interface and Implementations",
    ],
    explanation:
      "Texture在SurfaceInteraction与波长条件下求值，映射函数提供坐标及微分以选择MIP层级。Material读取纹理参数并构造BSDF；法线贴图只改变着色坐标架，不能篡改几何可见性与射线偏移法线。",
    formula: "BSDF=Material(Texture(si),\\lambda)",
    fault: "忽略纹理足迹导致远处闪烁，或用着色法线替代几何法线做可见性偏移",
    evidence:
      "uv、dudx/dudy、MIP level、texture value、material parameters与two normals",
    snippet: [
      "Vector2f dstdx, dstdy;",
      "Point2f st = mapping.Map(ctx, &dstdx, &dstdy);",
      "Spectrum value = mipMap.Filter(st, dstdx, dstdy);",
    ].join("\n"),
  },
  "pbrt-11": {
    title: "11 Volume Scattering",
    sourceUrl: "https://www.pbr-book.org/4ed/Volume_Scattering",
    focus: "用吸收、外散射、内散射与相函数描述参与介质中的路径事件",
    concepts: [
      ["volume scattering", "体积散射"],
      ["transmittance", "透射率"],
      ["phase function", "相函数"],
      ["medium", "介质"],
      ["majorant", "上界介质"],
    ],
    subtopics: [
      "Volume Scattering Processes",
      "Transmittance",
      "Phase Functions",
      "Media",
    ],
    explanation:
      "介质沿射线以消光系数衰减辐亮度，并可能在体内产生散射事件；Transmittance是区间上的指数积分。相函数是方向分布而不是表面BRDF，非均匀介质采样还需要可验证的majorant上界。",
    formula: "T_r(a\\to b)=\\exp(-\\int_a^b\\sigma_t(s)ds)",
    fault: "把相函数乘上表面余弦，或majorant低于真实消光系数",
    evidence:
      "segment、sigma_a、sigma_s、sigma_t、majorant、null/real event与transmittance",
    snippet: [
      "SampledSpectrum T = medium.Tr(ray.p(t0), ray.p(t1), lambda);",
      "auto event = medium.SampleTmaj(ray, tMax, u, rng);",
      "CHECK_LE(event.sigma_t.MaxComponentValue(), event.majorant);",
    ].join("\n"),
  },
  "pbrt-12": {
    title: "12 Light Sources",
    sourceUrl: "https://www.pbr-book.org/4ed/Light_Sources",
    focus: "统一光源发射、直接采样、PDF与可见性射线的合同",
    concepts: [
      ["light source", "光源"],
      ["area light", "面光源"],
      ["infinite light", "无限环境光"],
      ["light sampling", "光源采样"],
      ["LightSampleContext", "光源采样上下文"],
    ],
    subtopics: [
      "Light Interface",
      "Point and Distant Lights",
      "Area Lights",
      "Infinite Area Lights",
      "Light Sampling",
    ],
    explanation:
      "Light::SampleLi从参考交互抽样方向、辐亮度、PDF与目标交互，积分器再独立测试可见性。面积光按面积采样后必须正确转换到立体角PDF；环境光分布应与贴图亮度和球面Jacobian一致。",
    formula: "p_{\\omega}=p_A\\frac{r^2}{|n_l\\cdot(-\\omega_i)|}",
    fault: "面积PDF未转换成立体角PDF，或把被遮挡样本仍计入直接光",
    evidence:
      "light id、sample u、target、distance、Li、pdf measure、visibility与MIS weight",
    snippet: [
      "auto ls = light.SampleLi(ctx, u, lambda, true);",
      "if (ls && ls->pdf > 0 && Unoccluded(ctx, ls->pLight))",
      "  Ld += f * ls->L * AbsDot(wi, ns) / ls->pdf;",
    ].join("\n"),
  },
  "pbrt-13": {
    title: "13 Light Transport I: Surface Reflection",
    sourceUrl:
      "https://www.pbr-book.org/4ed/Light_Transport_I_Surface_Reflection",
    focus: "从光传输方程推导路径追踪、下一事件估计与多重重要性采样",
    concepts: [
      ["light transport equation", "光传输方程", "渲染方程"],
      ["path tracing", "路径追踪"],
      ["next event estimation", "下一事件估计"],
      ["multiple importance sampling", "mis", "多重重要性采样"],
      ["Russian roulette", "俄罗斯轮盘赌"],
    ],
    subtopics: [
      "The Light Transport Equation",
      "Path Tracing",
      "A Simple Path Tracer",
      "A Better Path Tracer",
    ],
    explanation:
      "光传输方程把出射辐亮度写成自发光与所有入射方向反射贡献之和。路径追踪递归抽样BSDF方向，下一事件估计显式连接光源，MIS用各策略PDF计算权重以避免重复计数并降低方差。",
    formula: "L_o=L_e+\\int_{\\Omega}f_sL_i|n\\cdot\\omega_i|d\\omega_i",
    fault:
      "直接光和BSDF命中光源被重复累加，或Russian roulette终止后未补偿存活概率",
    evidence:
      "path vertices、beta、emission、BSDF pdf、light pdf、MIS weight、rr probability与L",
    snippet: [
      "L += beta * SampleLd(isect, bsdf, lambda, sampler);",
      "BSDFSample bs = *bsdf.Sample_f(wo, u, uc);",
      "beta *= bs.f * AbsDot(bs.wi, ns) / bs.pdf;",
    ].join("\n"),
  },
  "pbrt-14": {
    title: "14 Light Transport II: Volume Rendering",
    sourceUrl:
      "https://www.pbr-book.org/4ed/Light_Transport_II_Volume_Rendering",
    focus: "把表面路径扩展为含介质自由飞行、体散射与分层材质的传输估计",
    concepts: [
      ["equation of transfer", "传输方程"],
      ["volume integrator", "体积积分器"],
      ["free-flight sampling", "自由飞行采样"],
      ["null collision", "零碰撞"],
      ["layered material", "分层材质"],
    ],
    subtopics: [
      "The Equation of Transfer",
      "Volume Scattering Integrators",
      "Scattering from Layered Materials",
    ],
    explanation:
      "体积传输在射线段上同时估计透射、自发光和内散射，积分器必须区分真实散射、吸收与null collision。分层材质把层间多次反射看作一维随机游走，其PDF与throughput更新仍需保持同一测度。",
    formula: "L(b)=T_r(a,b)L(a)+\\int_a^bT_r(t,b)L_s(t)dt",
    fault:
      "穿过介质边界后未更新MediumInterface，或null collision被当作真实散射",
    evidence:
      "medium stack、segment t、event type、Tmaj、sigma values、phase pdf、beta与radiance",
    snippet: [
      "for (auto event : medium.SampleTmaj(ray, tMax, u, rng)) {",
      "  beta *= event.weight;",
      "  if (event.IsScattering()) ray = event.SpawnRay(phase.Sample_p(u));",
      "}",
    ].join("\n"),
  },
  "pbrt-15": {
    title: "15 Wavefront Rendering on GPUs",
    sourceUrl: "https://www.pbr-book.org/4ed/Wavefront_Rendering_on_GPUs",
    focus: "把路径追踪状态拆成GPU队列，并保持各阶段数据布局与路径语义等价",
    concepts: [
      ["wavefront", "波前"],
      ["gpu path tracing", "GPU路径追踪"],
      ["work queue", "工作队列"],
      ["structure of arrays", "SoA", "数组结构"],
      ["unified memory", "统一内存"],
      ["ray tracing hardware", "光追硬件"],
    ],
    subtopics: [
      "Mapping Path Tracing to the GPU",
      "Implementation Foundations",
      "Path Tracer Implementation",
    ],
    explanation:
      "WavefrontPathIntegrator按求交、介质、材质和阴影工作拆队列，让相似任务批量执行并改善SIMT一致性。队列中的pixel、sample、depth、beta与ray必须保持同一路径身份，否则高吞吐会掩盖错误归属。",
    formula: "Q_{k+1}=Stage_k(Q_k)",
    fault: "队列压缩时打乱路径状态，或CPU/GPU实现消费不同的随机维度",
    evidence:
      "queue name、slot、pixel/sample、path depth、ray、beta、random dimension与stage output",
    snippet: [
      "rayQueue.Push({pixelIndex, sampleIndex, ray, beta});",
      "IntersectKernel(rayQueue, hitQueue, missQueue);",
      "MaterialKernel(hitQueue, nextRayQueue, shadowRayQueue);",
    ].join("\n"),
  },
  "pbrt-16": {
    title: "16 Retrospective and the Future",
    sourceUrl: "https://www.pbr-book.org/4ed/Retrospective_and_the_Future",
    focus: "用历代设计取舍、替代方案与新硬件约束评估渲染系统演进",
    concepts: [
      ["retrospective", "回顾"],
      ["design alternatives", "设计取舍"],
      ["emerging topics", "新兴主题"],
      ["future", "未来"],
    ],
    subtopics: [
      "pbrt over the Years",
      "Design Alternatives",
      "Emerging Topics",
      "The Future",
      "Conclusion",
    ],
    explanation:
      "回顾不是功能清单，而是比较接口稳定性、可读性、CPU/GPU共享与性能成本。任何未来方案都应在相同场景、随机种子和误差指标下与现有积分器比较，不能只用单张图或峰值吞吐下结论。",
    formula: "Choice=argmin(Error,Cost,Complexity)",
    fault: "用不同质量目标比较两种架构，或把硬件峰值当成端到端渲染收益",
    evidence:
      "version、scene、quality target、time、memory、error metric、hardware与design rationale",
    snippet: [
      "RenderResult baseline = Render(cpuIntegrator, fixedScene, fixedSeed);",
      "RenderResult candidate = Render(newIntegrator, fixedScene, fixedSeed);",
      "Compare(baseline, candidate, {time, memory, mse});",
    ].join("\n"),
  },
  "pbrt-A": {
    title: "Appendix A Sampling Algorithms",
    sourceUrl: "https://www.pbr-book.org/4ed/Sampling_Algorithms",
    focus: "用alias、reservoir、rejection与多维分布实现可验证离散和连续采样",
    concepts: [
      ["alias method", "别名法"],
      ["reservoir sampling", "蓄水池采样"],
      ["rejection method", "拒绝采样"],
      ["piecewise constant distribution", "分段常数分布"],
    ],
    subtopics: [
      "The Alias Method",
      "Reservoir Sampling",
      "The Rejection Method",
      "Sampling 1D Functions",
      "Sampling Multidimensional Functions",
    ],
    explanation:
      "附录A把正文使用的采样工具落到实现合同：每个Sample函数都要返回与实际分布一致的PDF，并处理零质量与数值边界。统计验收至少比较频数、期望值和归一化误差。",
    formula: "\\sum_i p_i=1",
    fault: "采样频数与返回PDF不一致，或零权重分布产生NaN",
    evidence:
      "weights、normalization、sample u、selected index/value、returned pdf与frequency test",
    snippet: [
      "AliasTable table(weights);",
      "auto [index, pmf] = table.Sample(u);",
      "CHECK_APPROX(Frequency(index), pmf);",
    ].join("\n"),
  },
  "pbrt-B": {
    title: "Appendix B Utilities",
    sourceUrl: "https://www.pbr-book.org/4ed/Utilities",
    focus: "把数学、内存、图像、并行与统计基础设施变成可观测系统合同",
    concepts: [
      ["Allocator", "分配器"],
      ["parallelism", "并行"],
      ["image", "图像"],
      ["statistics", "统计"],
      ["memory management", "内存管理"],
    ],
    subtopics: [
      "System Startup, Cleanup, and Options",
      "Mathematical Infrastructure",
      "User Interaction",
      "Containers and Memory Management",
      "Images",
      "Parallelism",
      "Statistics",
    ],
    explanation:
      "附录B的基础设施支撑所有正文代码：Allocator决定CPU/GPU可见内存，ParallelFor约束任务粒度，Image负责颜色编码和边界，统计计数器提供性能证据。工具层错误会跨章节扩散，必须用单元测试隔离。",
    formula: "Total=Compute+Memory+Scheduling",
    fault: "容器移动后假设allocator也被替换，或并行任务写入共享非线程安全状态",
    evidence:
      "allocation owner、address space、task id、thread id、image encoding、counter与unit test",
    snippet: [
      "Allocator alloc(resource);",
      "ParallelFor(0, n, [&](int64_t i) { output[i] = Evaluate(i); });",
      'STAT_COUNTER("Integrator/Paths", paths);',
    ].join("\n"),
  },
  "pbrt-C": {
    title: "Appendix C Processing the Scene Description",
    sourceUrl: "https://www.pbr-book.org/4ed/Processing_the_Scene_Description",
    focus:
      "追踪文本token到ParserTarget、BasicSceneBuilder、BasicScene和最终渲染对象",
    concepts: [
      ["scene description", "场景描述"],
      ["ParserTarget", "解析目标"],
      ["BasicSceneBuilder", "场景构建器"],
      ["BasicScene", "基础场景"],
      ["object creation", "对象创建"],
    ],
    subtopics: [
      "Tokenizing and Parsing",
      "Managing the Scene Description",
      "BasicScene and Final Object Creation",
      "Adding New Object Implementations",
    ],
    explanation:
      "附录C补齐场景文本到运行对象的来源链：Tokenizer产生语法项，ParserTarget接收语句，BasicSceneBuilder维护当前图形状态，BasicScene再为CPU或GPU创建最终对象。错误报告必须保留文件、行列和参数上下文。",
    formula: "Text\\to Tokens\\to Builder\\to BasicScene\\to Objects",
    fault: "解析时丢失图形状态栈，或创建对象后无法追溯原始文件与参数",
    evidence:
      "file/line、token、parser callback、graphics state、entity parameters、object id与render backend",
    snippet: [
      "Parser parser(filename, target);",
      "BasicSceneBuilder builder(options);",
      "BasicScene scene = builder.Build();",
      "RenderCPU(scene); // or RenderWavefront(scene)",
    ].join("\n"),
  },
};

const PAGES = [
  {
    path: "01-foundations/pbt-ch01-introduction",
    title: "第 1 章 Introduction",
    unitIds: ["pbrt-01"],
  },
  {
    path: "01-foundations/pbt-ch02-monte-carlo",
    title: "第 2 章 Monte Carlo Integration",
    unitIds: ["pbrt-02"],
  },
  {
    path: "01-foundations/pbt-ch03-geometry",
    title: "第 3 章 Geometry and Transformations",
    unitIds: ["pbrt-03"],
  },
  {
    path: "01-foundations/pbt-ch04-radiometry",
    title: "第 4 章 Radiometry, Spectra, and Color",
    unitIds: ["pbrt-04"],
  },
  {
    path: "02-sampling/pbt-ch05-cameras",
    title: "第 5 章 Cameras and Film",
    unitIds: ["pbrt-05"],
  },
  {
    path: "02-sampling/pbt-ch06-shapes",
    title: "第 6 章 Shapes",
    unitIds: ["pbrt-06"],
  },
  {
    path: "02-sampling/pbt-ch07-acceleration",
    title: "第 7 章 Primitives and Intersection Acceleration",
    unitIds: ["pbrt-07"],
  },
  {
    path: "02-sampling/pbt-ch08-sampling",
    title: "第 8 章 Sampling and Reconstruction",
    unitIds: ["pbrt-08"],
  },
  {
    path: "03-reflection/pbt-ch09-reflection",
    title: "第 9 章 Reflection Models",
    unitIds: ["pbrt-09"],
  },
  {
    path: "03-reflection/pbt-ch10-textures-materials",
    title: "第 10 章 Textures and Materials",
    unitIds: ["pbrt-10"],
  },
  {
    path: "04-transport/pbt-ch11-volume-scattering",
    title: "第 11 章 Volume Scattering",
    unitIds: ["pbrt-11"],
  },
  {
    path: "04-transport/pbt-ch12-light-sources",
    title: "第 12 章 Light Sources",
    unitIds: ["pbrt-12"],
  },
  {
    path: "05-integration/pbt-ch13-surface-transport",
    title: "第 13 章 Light Transport I: Surface Reflection",
    unitIds: ["pbrt-13"],
  },
  {
    path: "05-integration/pbt-ch14-volume-transport",
    title: "第 14 章 Light Transport II: Volume Rendering",
    unitIds: ["pbrt-14"],
  },
  {
    path: "05-integration/pbt-ch15-wavefront-gpu",
    title: "第 15 章 Wavefront Rendering on GPUs",
    unitIds: ["pbrt-15"],
  },
  {
    path: "05-integration/pbt-ch16-retrospective",
    title: "第 16 章 Retrospective、Future 与实现附录",
    unitIds: ["pbrt-16", "pbrt-A", "pbrt-B", "pbrt-C"],
  },
];

const LEGACY_PATHS = [
  "01-foundations/pbt-ch01-introduction",
  "01-foundations/pbt-ch02-geometry",
  "01-foundations/pbt-ch03-shapes",
  "01-foundations/pbt-ch04-acceleration",
  "02-sampling/pbt-ch05-cameras",
  "02-sampling/pbt-ch06-sampling",
  "02-sampling/pbt-ch07-radiometry",
  "03-reflection/pbt-ch08-bxdf",
  "03-reflection/pbt-ch09-materials",
  "03-reflection/pbt-ch10-textures",
  "04-transport/pbt-ch11-volume",
  "04-transport/pbt-ch12-lights",
  "05-integration/pbt-ch13-monte-carlo",
  "05-integration/pbt-ch14-surface-transport",
  "05-integration/pbt-ch15-volume-transport",
  "05-integration/pbt-ch16-system",
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function buildProfiles() {
  return PAGES.map((spec, index) => {
    const units = spec.unitIds.map((id) => ({ id, detail: DETAILS[id] }));
    const primary = units[0].detail;
    return {
      ...spec,
      chapterSlug: path.basename(spec.path),
      order: index + 1,
      units,
      focus:
        units.length === 1
          ? primary.focus
          : "把第16章的设计回顾与采样、工具、场景解析三个实现附录接成完整系统边界",
      concepts: units.flatMap((unit) =>
        unit.detail.concepts.map((alternatives) => alternatives[0]),
      ),
      fault: primary.fault,
      evidence:
        units.length === 1
          ? primary.evidence
          : "质量指标、采样频数、分配/线程归属、解析来源链与最终对象身份",
      formula: primary.formula,
      snippet: primary.snippet,
      invariant: `${spec.title}的固定输入、路径状态、估计量输出和恢复结果可由同一证据包重放`,
    };
  });
}

function definition(term, profile) {
  const unit = profile.units.find((candidate) =>
    candidate.detail.concepts.some((alternatives) =>
      alternatives.includes(term),
    ),
  );
  if (!unit) return `${term}必须落到可观察输入、状态和输出。`;
  return `${term}在“${profile.title}”的“${unit.detail.title}”中用于${unit.detail.focus}；由${unit.detail.evidence}核对。`;
}

function wrapperSource(profile) {
  const prefix = pascal(profile.chapterSlug);
  const model = {
    title: profile.title,
    unitTitle: profile.units.map((unit) => unit.detail.title).join(" + "),
    focus: profile.focus,
    concepts: profile.concepts,
    fault: profile.fault,
    evidence: profile.evidence,
    formula: profile.formula,
  };
  return `import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies PbrtExperimentModel;

export function ${prefix}PathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function ${prefix}EstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function ${prefix}EvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
`;
}

function renderUnit(unit, profile) {
  const detail = unit.detail;
  const subtopics = detail.subtopics
    .map(
      (subtopic) =>
        `- **${subtopic}**：在“${profile.title}”中以${detail.focus}的对象、测度或执行合同核对。`,
    )
    .join("\n");
  return `### ${detail.title}

在“${profile.title}”的本单元核对中，${detail.explanation}

本单元的可推翻反例是“${detail.fault}”。若发生分叉，按${detail.evidence}定位，而不是把差异归因于“渲染有随机性”。

$$
${detail.formula}
$$

#### 官方小节覆盖

${subtopics}`;
}

function renderPage(profile, previous, next) {
  const prefix = pascal(profile.chapterSlug);
  const termNames = [...new Set(profile.concepts)].slice(0, 6);
  const termLine = termNames
    .map(
      (term) =>
        `<Term def=${JSON.stringify(definition(term, profile))}>${term}</Term>`,
    )
    .join("、");
  const glossary = termNames
    .map(
      (term) =>
        `  <GlossaryItem term=${JSON.stringify(term)}>\n    ${definition(term, profile)}\n  </GlossaryItem>`,
    )
    .join("\n");
  const unitSections = profile.units
    .map((unit) => renderUnit(unit, profile))
    .join("\n\n");
  const practice = profile.units
    .map(
      (unit, index) =>
        `  ${index + 1}. **${unit.detail.title}（${unit.detail.concepts.map((alternatives) => alternatives[0]).join("、")}）**：在“${profile.title}”中固定seed和输入，保存${unit.detail.evidence}，注入“${unit.detail.fault}”后再恢复重放。`,
    )
    .join("\n");
  const navigation = [
    previous ? `[← ${previous.title}](/learn/${BOOK}/${previous.path})` : null,
    next ? `[${next.title} →](/learn/${BOOK}/${next.path})` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `import { ${prefix}PathLab, ${prefix}EstimatorLab, ${prefix}EvidenceLab } from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Glossary,
  GlossaryItem,
  Term,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能说明“${profile.title}”如何${profile.focus}
- 能逐项核对${profile.concepts.join("、")}在对象、测度、空间或执行阶段中的归属
- 能用章专属路径图与估计量实验制造“${profile.fault}”并找到${profile.evidence}中的首个分叉
- 能修改最小实现、固定随机种子，并验证“${profile.invariant}”

</Objectives>

{/* PBRT_BOOK_QUALITY_V2 */}

## 从一个像素样本开始

“${profile.title}”先固定scene hash、pixel、sample index和随机种子，再预测一条路径或一个估计量的中间状态。若${profile.evidence}不能解释首个差异，即使最终图像看起来合理也不能通过。

本页不变量是：${profile.invariant}。正常、故障、恢复三次运行共享场景、版本、采样序列与质量目标，只允许改变一个机制条件。

## 来源、版本与重写边界

本页依据开放在线的 [PBRT 4e 官方完整正文](${profile.units[0].detail.sourceUrl})独立重写，并用[官方总目录](${SOURCE_URL})核对章节与小节边界。正文不复刻原书段落；公式、接口名和机制结论以第4版正文与[pbrt-v4官方源代码](https://github.com/mmp/pbrt-v4)交叉检查。

第4版正式结构是16个编号章与A–C三个附录。本课程保持16个页面；最终综合页显式映射第16章和三个实现附录，不再把旧版章节顺序、Vulkan API或虚构“Rendering System”当作第4版目录。

## 六个检查词

在“${profile.title}”的术语核对中，${termLine}。术语必须进入公式、路径状态、代码和可重放输出，不能只在目录里出现。

## 原版单元、机制与边界

${unitSections}

## 先预测，再操作三个章专属实验

<Stepper>
  <Step title="1. 路径空间与对象归属">
    调整路径顶点与下一事件估计，观察本章对象如何改变throughput和贡献。

    <${prefix}PathLab />

  </Step>
  <Step title="2. 估计量、PDF 与方差">
    固定被积函数和随机序列，只切换采样策略与样本数，比较标准误差。

    <${prefix}EstimatorLab />

  </Step>
  <Step title="3. 单变量故障与恢复">
    固定seed，注入“${profile.fault}”，保存首个分叉，撤销后以同一输入重放。

    <${prefix}EvidenceLab />

  </Step>
</Stepper>

## 最小可重现实验

\`\`\`cpp
${profile.snippet}
\`\`\`

运行“${profile.title}”时保存PBRT版本、场景hash、像素/样本、波长样本、关键对象状态和输出摘要。截图只能证明最终外观，不能替代路径顶点、PDF、throughput、错误界或队列身份。

<Callout type="trap" title="本章首要反例">
  ${profile.fault}。它会破坏“${profile.invariant}”，应先从${profile.evidence}定位，而不是调参掩盖。
</Callout>

<Callout type="trap" title="不要再套 Vulkan 生命周期模板">
  “${profile.title}”讨论的是PBRT的几何、测度、散射、积分或系统组织。VkBuffer、Fence、Validation Layer和命令提交不是解释这些章节的通用正文。
</Callout>

## 练习与答案

<Exercises>

**问题 1：公式边界。** 在“${profile.title}”中，如何用固定小样本验证 $${profile.formula}$，并标明每个量的对象、测度、空间和时间点？

<Answer>
  先固定scene、pixel、sample和seed，逐项记录${profile.evidence}；手算一个最小样本，再与实现输出比较。只扰动一个量，若方向、PDF、权重或量纲不一致，先拒绝实现结论。
</Answer>

**问题 2：正式坐标。** ${profile.concepts.join("、")}怎样进入可操作验证？

<Answer>
${practice}
</Answer>

**问题 3：恢复证据。** 怎样证明“${profile.fault}”已真正修复？

<Answer>
  保存正常基线，注入故障并标记${profile.evidence}中的首个分叉；撤销后以完全相同场景、seed、pixel和sample重放。只有路径状态、估计量输出与重置状态重新一致，修复才可交接。
</Answer>

</Exercises>

## 本章回顾

掌握“${profile.title}”意味着能把“${profile.focus}”落到真实PBRT对象、数学测度和执行阶段，能主动制造“${profile.fault}”，并凭${profile.evidence}恢复同输入结果。

<Glossary>
${glossary}
</Glossary>

## 阅读导航

${navigation}

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text-primary"
  workTitle=${JSON.stringify(WORK_TITLE)}
  adaptedUrl=${JSON.stringify(profile.units[0].detail.sourceUrl)}
/>
`;
}

function writePage(profile, previous, next) {
  const target = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const data = {
    title: profile.title,
    type: profile.order === 2 || profile.order === 4 ? "A" : "B",
    section: "计算机图形学与渲染",
    order: profile.order,
    description: `${profile.title}：${profile.focus}，依据PBRT 4e完整正文独立重写。`,
    demo: true,
    math: true,
    sourceUrl: profile.units[0].detail.sourceUrl,
    draft: false,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
    ...(profile.unitIds.length === 1
      ? { officialUnitId: profile.unitIds[0] }
      : { officialUnitIds: profile.unitIds }),
  };
  fs.writeFileSync(
    target,
    matter.stringify(renderPage(profile, previous, next), data),
  );
}

function updateManifest(document, profiles) {
  const units = Object.entries(DETAILS).map(([id, detail]) => {
    const profile = profiles.find((candidate) =>
      candidate.unitIds.includes(id),
    );
    if (!profile) throw new Error(`缺少单元映射: ${id}`);
    return {
      id,
      title: detail.title,
      chapterPath: profile.path,
      concepts: detail.concepts,
      sourceUrl: detail.sourceUrl,
      officialSubtopics: detail.subtopics,
    };
  });
  document.books[BOOK] = {
    edition: "4th Edition",
    status: "verified-full-text-independent-rewrite",
    sourceUrl: SOURCE_URL,
    sourceKind: "official-full-text",
    sourceAccess: "full-text-primary",
    verifiedAt: "2026-07-30",
    defaultSourceMode: "independent-rewrite",
    sourceDisclosure:
      "官方在线第4版含16个编号章与A–C三个附录；平台以16页承载，最终页显式聚合第16章及三个附录。",
    unitMappingEvidence: "quality/pbrt-book-v2-profiles.json",
    factSourcePolicy:
      "以PBRT 4e在线完整正文和pbrt-v4官方源代码核对章节、公式、接口与实现边界。",
    factSources: [
      {
        title: "PBRT 4e Contents",
        url: SOURCE_URL,
        kind: "official-full-text",
      },
      {
        title: "pbrt-v4 source",
        url: "https://github.com/mmp/pbrt-v4",
        kind: "official-source-code",
      },
      {
        title: "Using and Understanding the Code",
        url: "https://www.pbr-book.org/4ed/Introduction/Using_and_Understanding_the_Code",
        kind: "official-full-text",
      },
    ],
    units,
  };
}

const profiles = buildProfiles();
fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (let index = 0; index < profiles.length; index += 1) {
  const profile = profiles[index];
  writePage(profile, profiles[index - 1] ?? null, profiles[index + 1] ?? null);
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
  );
}

const currentPaths = new Set(PAGES.map((page) => page.path));
for (const legacyPath of LEGACY_PATHS) {
  if (currentPaths.has(legacyPath)) continue;
  const legacyFile = path.join(CONTENT_DIR, `${legacyPath}.mdx`);
  if (fs.existsSync(legacyFile)) fs.unlinkSync(legacyFile);
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
updateManifest(manifestDocument, profiles);
fs.writeFileSync(
  MANIFEST_PATH,
  `${JSON.stringify(manifestDocument, null, 2)}\n`,
);

const portableProfiles = profiles.map((profile) => ({
  path: profile.path,
  title: profile.title,
  unitIds: profile.unitIds,
  sourceUrl: profile.units[0].detail.sourceUrl,
  concepts: profile.concepts,
  focus: profile.focus,
  fault: profile.fault,
  evidence: profile.evidence,
  invariant: profile.invariant,
}));
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "full-text-primary",
      pages: portableProfiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: profiles.length,
      officialUnits: Object.keys(DETAILS).length,
      migratedLegacyRoutes: LEGACY_PATHS.filter(
        (legacyPath) => !currentPaths.has(legacyPath),
      ).length,
      sourceMode: "full-text-primary",
    },
    null,
    2,
  ),
);
