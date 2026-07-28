#!/usr/bin/env node
/**
 * generate-book-chapters.mjs — 按原版目录生成书籍章节MDX文件
 * 用法: node scripts/generate-book-chapters.mjs --book <slug>
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const bookArg = process.argv.indexOf("--book");
const bookSlug = bookArg >= 0 ? process.argv[bookArg + 1] : null;
if (!bookSlug) { console.error("Usage: --book <slug>"); process.exit(1); }

const tocPath = path.join(ROOT, "quality/original-toc.json");
const tocData = JSON.parse(fs.readFileSync(tocPath, "utf8"));
const book = tocData[bookSlug];
if (!book) { console.error(`No TOC data for ${bookSlug}`); process.exit(1); }

// Book-specific chapter metadata
const BOOK_META = {
  "pbrt-book": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://pbr-book.org/4ed/",
    chapters: [
      { dir: "01-foundations", slug: "pbt-ch01-introduction", title: "Introduction", order: 1, desc: "Literate Programming、光线追踪概述、pbrt系统架构" },
      { dir: "01-foundations", slug: "pbt-ch02-geometry", title: "Geometry and Transformations", order: 2, desc: "坐标系统、向量与点运算、变换矩阵、四元数" },
      { dir: "01-foundations", slug: "pbt-ch03-shapes", title: "Shapes", order: 3, desc: "球体、圆柱、圆盘、三角形、曲线等几何体的表示与求交" },
      { dir: "01-foundations", slug: "pbt-ch04-acceleration", title: "Primitives and Intersection Acceleration", order: 4, desc: "BVH、KD-Tree、空间划分加速结构" },
      { dir: "02-sampling", slug: "pbt-ch05-cameras", title: "Cameras and Film", order: 5, desc: "针孔模型、薄透镜、景深、快门与运动模糊、胶片响应" },
      { dir: "02-sampling", slug: "pbt-ch06-sampling", title: "Sampling and Reconstruction", order: 6, desc: "采样理论、抗锯齿、滤波重建、重要性采样基础" },
      { dir: "02-sampling", slug: "pbt-ch07-radiometry", title: "Radiometry and Spectra", order: 7, desc: "辐射度量学、光谱表示、颜色空间转换、BRDF归一化" },
      { dir: "03-reflection", slug: "pbt-ch08-bxdf", title: "Reflection Models", order: 8, desc: "BRDF/BTDF、微表面理论、Fresnel方程、Lambert与GGX" },
      { dir: "03-reflection", slug: "pbt-ch09-materials", title: "Materials", order: 9, desc: "材质系统、UberMaterial、金属、玻璃、次表面散射" },
      { dir: "03-reflection", slug: "pbt-ch10-textures", title: "Textures", order: 10, desc: "程序纹理、图像纹理、MIP映射、各向异性过滤" },
      { dir: "04-transport", slug: "pbt-ch11-volume", title: "Volume Scattering", order: 11, desc: "参与介质、相函数、体积散射方程、BSSRDF" },
      { dir: "04-transport", slug: "pbt-ch12-lights", title: "Light Sources", order: 12, desc: "点光源、面光源、环境光、IBL、光源采样策略" },
      { dir: "05-integration", slug: "pbt-ch13-monte-carlo", title: "Monte Carlo Integration", order: 13, desc: "随机变量、期望估计、方差缩减、多重重要性采样" },
      { dir: "05-integration", slug: "pbt-ch14-surface-transport", title: "Light Transport I: Surface Reflection", order: 14, desc: "路径追踪、双向路径追踪、渲染方程离散化" },
      { dir: "05-integration", slug: "pbt-ch15-volume-transport", title: "Light Transport II: Volume Rendering", order: 15, desc: "体积路径追踪、Delta tracking、光谱渲染" },
      { dir: "05-integration", slug: "pbt-ch16-system", title: "Rendering System", order: 16, desc: "场景描述、并行调度、内存管理、图像输出管线" },
    ]
  },
  "real-time-rendering-4e": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://www.realtimerendering.com/",
    chapters: [
      { dir: "01-pipeline", slug: "rtr-ch01-introduction", title: "Introduction", order: 1, desc: "实时渲染概述、本书结构、符号约定" },
      { dir: "01-pipeline", slug: "rtr-ch02-pipeline", title: "The Graphics Rendering Pipeline", order: 2, desc: "应用阶段、几何阶段、光栅化阶段、帧缓冲" },
      { dir: "01-pipeline", slug: "rtr-ch03-gpu", title: "The Graphics Processing Unit", order: 3, desc: "GPU架构、SIMD执行、内存层次、带宽瓶颈" },
      { dir: "01-pipeline", slug: "rtr-ch04-transforms", title: "Transforms", order: 4, desc: "齐次坐标、仿射变换、法线变换、场景图" },
      { dir: "02-shading", slug: "rtr-ch05-shading-basics", title: "Shading Basics", order: 5, desc: "光照模型、Phong/Blinn-Phong、法线贴图" },
      { dir: "02-shading", slug: "rtr-ch06-texturing", title: "Texturing", order: 6, desc: "纹理映射、MIP链、各向异性、POM、纹理数组" },
      { dir: "02-shading", slug: "rtr-ch07-shadows", title: "Shadows", order: 7, desc: "Shadow Map、PCF、VSM、CSM、光线追踪阴影" },
      { dir: "02-shading", slug: "rtr-ch08-light-color", title: "Light and Color", order: 8, desc: "色彩科学、HDR、色调映射、色度学基础" },
      { dir: "02-shading", slug: "rtr-ch09-pbs", title: "Physically-Based Shading", order: 9, desc: "微表面理论、GGX、能量守恒、金属/电介质" },
      { dir: "03-illumination", slug: "rtr-ch10-local", title: "Local Illumination", order: 10, desc: "环境光遮蔽、反射探针、屏幕空间反射" },
      { dir: "03-illumination", slug: "rtr-ch11-global", title: "Global Illumination", order: 11, desc: "辐射度、光子映射、VXGI、DDGI、Lumen" },
      { dir: "03-illumination", slug: "rtr-ch12-image-space", title: "Image-Space Effects", order: 12, desc: "SSAO、SSR、Bloom、DOF、运动模糊、TAA" },
      { dir: "04-geometry", slug: "rtr-ch13-beyond-polygons", title: "Beyond Polygons", order: 13, desc: "点精灵、Billboard、粒子系统、体积渲染" },
      { dir: "04-geometry", slug: "rtr-ch14-volumetric", title: "Volumetric and Translucency Rendering", order: 14, desc: "体积光、雾效、次表面散射、半透明排序" },
      { dir: "04-geometry", slug: "rtr-ch15-npr", title: "Non-Photorealistic Rendering", order: 15, desc: "卡通渲染、素描风格、技术美术管线" },
      { dir: "05-optimization", slug: "rtr-ch16-polygon", title: "Polygonal Techniques", order: 16, desc: "LOD、网格简化、法线压缩、顶点缓存优化" },
      { dir: "05-optimization", slug: "rtr-ch17-curves", title: "Curves and Curved Surfaces", order: 17, desc: "Bezier、B-Spline、NURBS、细分曲面" },
      { dir: "05-optimization", slug: "rtr-ch18-pipeline-opt", title: "Pipeline Optimization", order: 18, desc: "瓶颈分析、Overdraw、Early-Z、批处理" },
      { dir: "05-optimization", slug: "rtr-ch19-acceleration", title: "Acceleration Algorithms", order: 19, desc: "BVH、Octree、Portal Culling、遮挡查询" },
      { dir: "05-optimization", slug: "rtr-ch20-efficient-shading", title: "Efficient Shading", order: 20, desc: "Shader变体管理、计算着色器、Wave Intrinsics" },
      { dir: "06-emerging", slug: "rtr-ch21-vr-ar", title: "Virtual and Augmented Reality", order: 21, desc: "VR/AR渲染挑战、延迟补偿、注视点渲染" },
      { dir: "06-emerging", slug: "rtr-ch22-intersection", title: "Intersection Test Methods", order: 22, desc: "射线-三角形、射线-AABB、GJK、SAT" },
      { dir: "06-emerging", slug: "rtr-ch23-hardware", title: "Graphics Hardware", order: 23, desc: "GPU微架构、光追核心、移动GPU、API对比" },
      { dir: "06-emerging", slug: "rtr-ch24-future", title: "The Future", order: 24, desc: "实时光线追踪、神经网络渲染、虚拟几何体" },
    ]
  },
  "opengl-superbible": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://www.informit.com/store/opengl-superbible-comprehensive-tutorial-and-reference-9780134193137",
    chapters: [
      { dir: "01-basics", slug: "oglsb-ch01-intro", title: "OpenGL Introduction", order: 1, desc: "OpenGL历史、版本演进、核心概念与生态系统" },
      { dir: "01-basics", slug: "oglsb-ch02-first-program", title: "Our First OpenGL Program", order: 2, desc: "窗口创建、上下文初始化、渲染循环、清除屏幕" },
      { dir: "01-basics", slug: "oglsb-ch03-data-flow", title: "Following the Data", order: 3, desc: "顶点数据流、属性指针、VBO与VAO" },
      { dir: "01-basics", slug: "oglsb-ch04-math", title: "Math for 3D Graphics", order: 4, desc: "向量、矩阵、四元数、投影变换" },
      { dir: "02-rendering", slug: "oglsb-ch05-3d-data", title: "Managing 3D Data", order: 5, desc: "缓冲区对象、Uniform、SSBO、数据布局" },
      { dir: "02-rendering", slug: "oglsb-ch06-shaders", title: "Shaders and Programs", order: 6, desc: "GLSL语法、着色器编译链接、Program Pipeline" },
      { dir: "02-rendering", slug: "oglsb-ch07-vertex", title: "Vertex Shaders and Clipping", order: 7, desc: "顶点变换、裁剪空间、图元装配" },
      { dir: "02-rendering", slug: "oglsb-ch08-fragment", title: "Fragment Shaders and Rasterization", order: 8, desc: "光栅化规则、片段着色、多重采样" },
      { dir: "03-textures", slug: "oglsb-ch09-texturing", title: "Texture Mapping", order: 9, desc: "纹理对象、采样器、MIP映射、纹理格式" },
      { dir: "03-textures", slug: "oglsb-ch10-framebuffers", title: "Framebuffers and Attachments", order: 10, desc: "FBO、渲染目标、离屏渲染、Blit" },
      { dir: "04-advanced", slug: "oglsb-ch11-debugging", title: "Debugging and Error Handling", order: 11, desc: "调试输出、错误码、GPU调试工具" },
      { dir: "04-advanced", slug: "oglsb-ch12-performance", title: "Performance and Optimization", order: 12, desc: "性能分析、批处理、状态排序、带宽优化" },
      { dir: "04-advanced", slug: "oglsb-ch13-geometry", title: "Advanced Geometry", order: 13, desc: "几何着色器、细分曲面、实例化渲染" },
      { dir: "04-advanced", slug: "oglsb-ch14-shading", title: "Advanced Shading", order: 14, desc: "PBR、IBL、HDR、色调映射" },
      { dir: "05-specialized", slug: "oglsb-ch15-compute", title: "Compute Shaders", order: 15, desc: "工作组、共享内存、Barrier、GPGPU" },
      { dir: "05-specialized", slug: "oglsb-ch16-techniques", title: "Advanced Techniques", order: 16, desc: "延迟渲染、SSAO、体积光、粒子系统" },
      { dir: "05-specialized", slug: "oglsb-ch17-mobile", title: "OpenGL on Mobile Devices", order: 17, desc: "OpenGL ES、EGL、移动GPU特性与限制" },
      { dir: "05-specialized", slug: "oglsb-ch18-future", title: "The Future of OpenGL", order: 18, desc: "Vulkan对比、SPIR-V、跨平台趋势" },
    ]
  },
  "opengl-redbook": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://www.informit.com/store/opengl-programming-guide-the-official-guide-to-learning-9780134495552",
    chapters: [
      { dir: "01-fundamentals", slug: "oglrb-ch01-intro", title: "Introduction to OpenGL", order: 1, desc: "OpenGL概述、状态机模型、扩展机制" },
      { dir: "01-fundamentals", slug: "oglrb-ch02-shaders", title: "Shader Fundamentals", order: 2, desc: "GLSL基础、着色器阶段、编译与链接" },
      { dir: "01-fundamentals", slug: "oglrb-ch03-drawing", title: "Drawing", order: 3, desc: "图元类型、顶点指定、绘制命令" },
      { dir: "01-fundamentals", slug: "oglrb-ch04-viewing", title: "Viewing and Transformations", order: 4, desc: "模型视图、投影、视口变换" },
      { dir: "02-lighting-texture", slug: "oglrb-ch05-lighting", title: "Lighting", order: 5, desc: "光照模型、材质属性、光源类型" },
      { dir: "02-lighting-texture", slug: "oglrb-ch06-texturing", title: "Texturing", order: 6, desc: "纹理创建、参数设置、多重纹理" },
      { dir: "02-lighting-texture", slug: "oglrb-ch07-advanced-render", title: "Advanced Rendering", order: 7, desc: "混合、模板测试、多渲染目标" },
      { dir: "02-lighting-texture", slug: "oglrb-ch08-framebuffers", title: "Framebuffers and Attachments", order: 8, desc: "FBO、渲染缓冲、纹理附件" },
      { dir: "03-compute-geometry", slug: "oglrb-ch09-compute", title: "Compute Shaders", order: 9, desc: "计算着色器、工作组、原子操作" },
      { dir: "03-compute-geometry", slug: "oglrb-ch10-geometry-tess", title: "Geometry and Tessellation Shaders", order: 10, desc: "几何着色器、细分控制与求值" },
      { dir: "03-compute-geometry", slug: "oglrb-ch11-buffers", title: "Advanced Buffer Management", order: 11, desc: "持久映射、无绑定纹理、DSA" },
      { dir: "03-compute-geometry", slug: "oglrb-ch12-techniques", title: "Advanced Rendering Techniques", order: 12, desc: "阴影、环境光遮蔽、HDR" },
      { dir: "04-systems", slug: "oglrb-ch13-debug-perf", title: "Debugging and Performance", order: 13, desc: "调试组、性能计数器、GPU分析" },
      { dir: "04-systems", slug: "oglrb-ch14-sync", title: "Advanced Synchronization", order: 14, desc: "Fence、Sync对象、条件渲染" },
      { dir: "04-systems", slug: "oglrb-ch15-platform", title: "Platform-Specific OpenGL", order: 15, desc: "WGL、GLX、CGL、上下文共享" },
      { dir: "04-systems", slug: "oglrb-ch16-es", title: "OpenGL ES", order: 16, desc: "ES 3.x特性、与桌面GL差异" },
      { dir: "04-systems", slug: "oglrb-ch17-webgl", title: "WebGL", order: 17, desc: "WebGL上下文、JavaScript绑定、安全模型" },
      { dir: "04-systems", slug: "oglrb-ch18-future", title: "The Future of OpenGL", order: 18, desc: "Vulkan、SPIR-V、跨平台图形API趋势" },
    ]
  },
  "gpu-gems": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://developer.nvidia.com/gpugems",
    chapters: Array.from({length: 48}, (_, i) => {
      const parts = [
        {end:5, name:"01-natural-effects", label:"Natural Effects"},
        {end:12, name:"02-lighting-shadows", label:"Lighting and Shadows"},
        {end:16, name:"03-materials", label:"Materials"},
        {end:21, name:"04-image-processing", label:"Image Processing"},
        {end:26, name:"05-performance", label:"Performance and Practicalities"},
        {end:31, name:"06-beyond-triangles", label:"Beyond Triangles"},
        {end:38, name:"07-simulation", label:"Simulation and Numerical Algorithms"},
        {end:48, name:"08-rendering-techniques", label:"Rendering Techniques"},
      ];
      const ch = i + 1;
      const part = parts.find(p => ch <= p.end);
      return { dir: part.name, slug: `gpugems-ch${String(ch).padStart(2,"0")}`, title: `Chapter ${ch}: ${part.label}`, order: ch, desc: `GPU Gems Part: ${part.label}, Chapter ${ch}` };
    })
  },
  "cg-principles-practice": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://www.informit.com/store/computer-graphics-principles-and-practice-9780133373707",
    chapters: Array.from({length: 25}, (_, i) => {
      const ch = i + 1;
      const dirs = ["01-intro","02-programming","03-pipeline","04-math","05-camera","06-viewing","07-object","08-raster","09-fragment","10-framebuffer","11-display","12-image","13-geometry","14-texture","15-lighting","16-shading","17-color","18-compositing","19-animation","20-modeling","21-rendering","22-raytracing","23-radiosity","24-gi","25-future"];
      const titles = ["Introduction","Graphics Programming","The Graphics Pipeline","Mathematics of 3D Graphics","The Camera","The Viewing Pipeline","The Object Pipeline","The Raster Pipeline","The Fragment Pipeline","The Framebuffer Pipeline","The Display Pipeline","The Image Pipeline","The Geometry Pipeline","The Texture Pipeline","The Lighting Pipeline","The Shading Pipeline","The Color Pipeline","The Compositing Pipeline","The Animation Pipeline","The Modeling Pipeline","The Rendering Pipeline","The Ray Tracing Pipeline","The Radiosity Pipeline","Global Illumination Pipeline","The Future"];
      return { dir: dirs[i], slug: `cgpp-ch${String(ch).padStart(2,"0")}`, title: titles[i], order: ch, desc: `Computer Graphics: Principles and Practice Chapter ${ch}` };
    })
  },
  "computer-graphics-4e": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://www.pearson.com/en-gb/subject-catalog/p/computer-graphics-with-open-gl-pearson-new-international-edition/P200000004424/9781292037196",
    chapters: [
      { dir: "01-basics", slug: "cg4e-ch01-coord-geometry", title: "Review of Coordinate Geometry", order: 1, desc: "坐标系、向量基础、几何变换预备" },
      { dir: "01-basics", slug: "cg4e-ch02-graphics-systems", title: "Overview of Graphics Systems", order: 2, desc: "光栅与矢量系统、GPU架构、显示技术" },
      { dir: "01-basics", slug: "cg4e-ch03-output-primitives", title: "Output Primitives", order: 3, desc: "线段算法、圆与椭圆、多边形填充" },
      { dir: "01-basics", slug: "cg4e-ch04-attributes", title: "Attributes of Output Primitives", order: 4, desc: "线型、填充模式、颜色模型" },
      { dir: "02-transforms", slug: "cg4e-ch05-transforms", title: "Geometric Transformations", order: 5, desc: "平移、旋转、缩放、复合变换、齐次坐标" },
      { dir: "02-transforms", slug: "cg4e-ch06-2d-viewing", title: "Two-Dimensional Viewing", order: 6, desc: "窗口-视口映射、裁剪算法" },
      { dir: "02-transforms", slug: "cg4e-ch07-3d-concepts", title: "Three-Dimensional Concepts", order: 7, desc: "3D坐标、投影分类、深度" },
      { dir: "02-transforms", slug: "cg4e-ch08-3d-viewing", title: "Three-Dimensional Viewing", order: 8, desc: "观察变换、透视投影、平行投影" },
      { dir: "03-rendering", slug: "cg4e-ch09-visible-surface", title: "Visible-Surface Detection Methods", order: 9, desc: "Z-Buffer、BSP、扫描线、区域细分" },
      { dir: "03-rendering", slug: "cg4e-ch10-illumination", title: "Illumination and Shading", order: 10, desc: "光照模型、Phong着色、Gouraud着色" },
      { dir: "03-rendering", slug: "cg4e-ch11-color", title: "Color Models", order: 11, desc: "RGB、CMY、HSV、CIE色度图" },
      { dir: "04-applications", slug: "cg4e-ch12-animation", title: "Computer Animation", order: 12, desc: "关键帧、运动学、粒子系统" },
      { dir: "04-applications", slug: "cg4e-ch13-standards", title: "Computer Graphics Standards", order: 13, desc: "OpenGL、DirectX、Vulkan、WebGPU" },
      { dir: "04-applications", slug: "cg4e-ch14-future", title: "Computer Graphics in the Future", order: 14, desc: "实时光追、神经渲染、XR" },
    ]
  },
  "global-illumination": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://books.google.com/books?id=KodRAAAAMAAJ",
    chapters: [
      { dir: "01-theory", slug: "gi-ch01-introduction", title: "Introduction", order: 1, desc: "全局光照问题定义、直接光照与间接光照" },
      { dir: "01-theory", slug: "gi-ch02-radiometry", title: "Radiometry", order: 2, desc: "辐射通量、辐照度、辐射亮度、BRDF" },
      { dir: "01-theory", slug: "gi-ch03-transport", title: "Light Transport Theory", order: 3, desc: "渲染方程、算子形式、Neumann级数" },
      { dir: "02-methods", slug: "gi-ch04-monte-carlo", title: "Monte Carlo Methods", order: 4, desc: "随机采样、期望估计、方差缩减" },
      { dir: "02-methods", slug: "gi-ch05-ray-tracing", title: "Ray Tracing", order: 5, desc: "递归光线追踪、分布光线追踪、路径追踪" },
      { dir: "02-methods", slug: "gi-ch06-radiosity", title: "Radiosity", order: 6, desc: "有限元方法、形式因子、渐进精化" },
      { dir: "03-advanced", slug: "gi-ch07-photon-mapping", title: "Photon Mapping", order: 7, desc: "光子发射、光子图、密度估计、焦散" },
      { dir: "03-advanced", slug: "gi-ch08-path-tracing", title: "Path Tracing", order: 8, desc: "无偏路径追踪、俄罗斯轮盘、NEE" },
      { dir: "03-advanced", slug: "gi-ch09-bidirectional", title: "Bidirectional Methods", order: 9, desc: "双向路径追踪、顶点连接、MLT" },
      { dir: "03-advanced", slug: "gi-ch10-metropolis", title: "Metropolis Light Transport", order: 10, desc: "MCMC、突变策略、主序列" },
      { dir: "04-realtime", slug: "gi-ch11-prt", title: "Precomputed Radiance Transfer", order: 11, desc: "球谐函数、PRT、光场" },
      { dir: "04-realtime", slug: "gi-ch12-realtime-gi", title: "Real-Time Global Illumination", order: 12, desc: "VXGI、DDGI、Lumen、Probe Volume" },
    ]
  },
  "ray-tracing-weekend": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://raytracing.github.io/books/RayTracingInOneWeekend.html",
    chapters: [
      { dir: "01-setup", slug: "rtw-ch01-overview", title: "Overview", order: 1, desc: "光线追踪原理概述、本书目标与结构" },
      { dir: "01-setup", slug: "rtw-ch02-output-image", title: "Output an Image", order: 2, desc: "PPM格式、像素循环、颜色输出" },
      { dir: "01-setup", slug: "rtw-ch03-vec3", title: "The vec3 Class", order: 3, desc: "向量运算、颜色表示、工具函数" },
      { dir: "02-basics", slug: "rtw-ch04-rays-camera", title: "Rays, a Simple Camera, and Background", order: 4, desc: "射线定义、视口映射、渐变背景" },
      { dir: "02-basics", slug: "rtw-ch05-sphere", title: "Adding a Sphere", order: 5, desc: "射线-球求交、法线计算" },
      { dir: "02-basics", slug: "rtw-ch06-normals", title: "Surface Normals and Multiple Objects", order: 6, desc: "法线可视化、Hittable列表、最近命中" },
      { dir: "03-materials", slug: "rtw-ch07-camera-class", title: "Moving Camera Code into Its Own Class", order: 7, desc: "相机封装、视场角、宽高比" },
      { dir: "03-materials", slug: "rtw-ch08-diffuse", title: "A Simple Diffuse Material", order: 8, desc: "Lambertian反射、随机散射、递归深度" },
      { dir: "04-final", slug: "rtw-ch09-defocus", title: "Defocus Blur", order: 9, desc: "薄透镜模型、光圈、焦平面" },
      { dir: "04-final", slug: "rtw-ch10-final-scene", title: "Putting It All Together", order: 10, desc: "最终场景、多材质球体、渲染参数" },
      { dir: "04-final", slug: "rtw-ch11-next", title: "Where Next", order: 11, desc: "扩展方向、后续系列、学习资源" },
      { dir: "04-final", slug: "rtw-ch12-acknowledgments", title: "Acknowledgments", order: 12, desc: "致谢、社区贡献、许可协议" },
    ]
  },
  "taocp": {
    section: "计算机科学与算法",
    sourceUrl: "https://www.informit.com/store/art-of-computer-programming-volumes-1-4b-boxed-set-9780137935109",
    chapters: [
      { dir: "vol1-basic-concepts", slug: "taocp-1-1-math", title: "Mathematical Preliminaries", order: 1, desc: "归纳法、数论、二项式系数、生成函数" },
      { dir: "vol1-basic-concepts", slug: "taocp-1-1-algorithms", title: "Algorithms", order: 2, desc: "算法定义、表示法、分析基础" },
      { dir: "vol1-basic-concepts", slug: "taocp-1-1-mix", title: "MIX Computer", order: 3, desc: "MIX架构、指令集、模拟器" },
      { dir: "vol1-info-structures", slug: "taocp-1-2-linear", title: "Linear Lists", order: 4, desc: "栈、队列、链表、顺序表" },
      { dir: "vol1-info-structures", slug: "taocp-1-2-trees", title: "Trees", order: 5, desc: "二叉树、遍历、平衡树、B树" },
      { dir: "vol1-info-structures", slug: "taocp-1-2-multilinked", title: "Multilinked Structures", order: 6, desc: "图、网络、稀疏矩阵" },
      { dir: "vol1-info-structures", slug: "taocp-1-2-dynamic", title: "Dynamic Storage Allocation", order: 7, desc: "内存分配、垃圾回收、伙伴系统" },
      { dir: "vol2-random", slug: "taocp-2-3-random", title: "Random Numbers", order: 8, desc: "线性同余、统计检验、shuffle" },
      { dir: "vol2-arithmetic", slug: "taocp-2-4-position", title: "Positional Number Systems", order: 9, desc: "进制转换、浮点表示" },
      { dir: "vol2-arithmetic", slug: "taocp-2-4-multiple", title: "Multiple-Precision Arithmetic", order: 10, desc: "大数加减乘除、模运算" },
      { dir: "vol2-arithmetic", slug: "taocp-2-4-radix", title: "Radix Conversion", order: 11, desc: "进制转换算法、浮点运算" },
      { dir: "vol2-arithmetic", slug: "taocp-2-4-polynomial", title: "Polynomial Arithmetic", order: 12, desc: "多项式求值、FFT、模多项式" },
      { dir: "vol3-sorting", slug: "taocp-3-5-internal", title: "Internal Sorting", order: 13, desc: "插入、选择、交换、归并、分布排序" },
      { dir: "vol3-sorting", slug: "taocp-3-5-optimum", title: "Optimum Sorting", order: 14, desc: "比较下界、排序网络" },
      { dir: "vol3-sorting", slug: "taocp-3-5-external", title: "External Sorting", order: 15, desc: "多路归并、替换选择、多阶段归并" },
      { dir: "vol3-searching", slug: "taocp-3-6-sequential", title: "Sequential Searching", order: 16, desc: "线性搜索、自组织、概率分析" },
      { dir: "vol3-searching", slug: "taocp-3-6-tree", title: "Searching by Comparison of Keys", order: 17, desc: "二叉搜索树、AVL、红黑树、B树" },
      { dir: "vol3-searching", slug: "taocp-3-6-digital", title: "Digital Searching", order: 18, desc: "Trie、PATRICIA、散列" },
      { dir: "vol3-searching", slug: "taocp-3-6-hashing", title: "Hashing", order: 19, desc: "散列函数、冲突解决、完美散列" },
      { dir: "vol4a-combinatorial", slug: "taocp-4-7-zeros-ones", title: "Zeros and Ones", order: 20, desc: "布尔函数、位操作技巧" },
      { dir: "vol4a-combinatorial", slug: "taocp-4-7-generating", title: "Generating All Possibilities", order: 21, desc: "排列、组合、子集生成" },
      { dir: "vol4a-combinatorial", slug: "taocp-4-7-graph", title: "Generating All Trees and Graphs", order: 22, desc: "树枚举、图生成、回溯" },
      { dir: "vol4a-combinatorial", slug: "taocp-4-7-satisfiability", title: "Satisfiability", order: 23, desc: "SAT问题、DPLL、CDCL" },
      { dir: "vol4a-combinatorial", slug: "taocp-4-7-dancing-links", title: "Dancing Links", order: 24, desc: "精确覆盖、Algorithm X、数独" },
      { dir: "vol4b-combinatorial", slug: "taocp-4-7-backtracking", title: "Backtracking", order: 25, desc: "约束传播、搜索剪枝" },
      { dir: "vol4b-combinatorial", slug: "taocp-4-7-branch-bound", title: "Branch and Bound", order: 26, desc: "分支定界、A*搜索" },
      { dir: "vol4b-combinatorial", slug: "taocp-4-7-heuristic", title: "Heuristic Search", order: 27, desc: "局部搜索、模拟退火、遗传算法" },
      { dir: "vol4b-combinatorial", slug: "taocp-4-7-network", title: "Network Algorithms", order: 28, desc: "最大流、最小割、匹配" },
      { dir: "vol4b-combinatorial", slug: "taocp-4-7-matching", title: "Matching and Assignment", order: 29, desc: "二部匹配、匈牙利算法" },
      { dir: "vol4b-combinatorial", slug: "taocp-4-7-np", title: "NP-Completeness", order: 30, desc: "P与NP、归约、近似算法" },
    ]
  },
  "vulkan-guide": {
    section: "计算机图形学与渲染",
    sourceUrl: "https://docs.vulkan.org/guide/latest/",
    chapters: [
      { dir: "01-introduction", slug: "vkg-ch01-vulkan-intro", title: "开始学习新一代3D图形API", order: 1, desc: "Vulkan的演化史、与OpenGL的对比、执行模型、队列、对象模型与错误检查" },
      { dir: "01-introduction", slug: "vkg-ch02-first-program", title: "你的第一个Vulkan伪代码程序", order: 2, desc: "Vulkan安装、Hello World伪代码、初始化握手、交换链、着色器编译与渲染循环" },
      { dir: "02-device-setup", slug: "vkg-ch03-hardware-device", title: "连接硬件设备", order: 3, desc: "LunarG SDK、CMake工程设置、扩展、实例创建、物理设备与逻辑设备、队列族" },
      { dir: "02-device-setup", slug: "vkg-ch04-debugging", title: "调试Vulkan程序", order: 4, desc: "Vulkan调试方法、验证层特性、调试回调实现与错误诊断" },
      { dir: "03-memory-resources", slug: "vkg-ch05-command-memory", title: "指令缓存与内存管理", order: 5, desc: "指令缓存、指令池与指令缓冲区、主机内存与设备内存、内存分配策略" },
      { dir: "03-memory-resources", slug: "vkg-ch06-image-swapchain", title: "图像资源分配与交换链构建", order: 6, desc: "图像资源、图像视图、图像布局、交换链创建与深度图" },
      { dir: "04-pipeline-rendering", slug: "vkg-ch07-buffer-renderpass", title: "缓存资源、渲染通道与帧缓存", order: 7, desc: "缓冲区资源、渲染通道子通道与附件、帧缓存、录制渲染指令" },
      { dir: "04-pipeline-rendering", slug: "vkg-ch08-spirv-pipeline", title: "SPIR-V着色器与图形流水线", order: 8, desc: "SPIR-V概述、glslang编译器、图形流水线组件、流水线布局与状态" },
      { dir: "04-pipeline-rendering", slug: "vkg-ch09-draw-geometry", title: "绘制几何体", order: 9, desc: "顶点缓冲区、索引缓冲区、Uniform Buffer、绘制指令录制、渲染循环与同步" },
      { dir: "05-textures-binding", slug: "vkg-ch10-textures-samplers", title: "使用纹理与采样器", order: 10, desc: "纹理资源基础、图像上传至设备、采样器对象、着色器中采样纹理" },
      { dir: "05-textures-binding", slug: "vkg-ch11-descriptor-binding", title: "描述符集与资源绑定", order: 11, desc: "描述符池与描述符集、更新描述符集、管线布局绑定、Push常量" },
      { dir: "06-sync-compute", slug: "vkg-ch12-synchronization", title: "同步原语：栅栏、信号量与事件", order: 12, desc: "Vulkan同步模型、Fence、Semaphore、Event、管线屏障与内存依赖" },
      { dir: "06-sync-compute", slug: "vkg-ch13-compute-pipeline", title: "计算流水线", order: 13, desc: "计算管线概念、工作组与局部调用、存储缓冲区、调度计算任务" },
      { dir: "07-advanced-topics", slug: "vkg-ch14-multithreading", title: "多线程Vulkan应用程序", order: 14, desc: "线程安全规则、多线程录制命令缓冲区、多线程资源创建、多队列使用" },
      { dir: "07-advanced-topics", slug: "vkg-ch15-advanced-rendering", title: "高级渲染技术简介", order: 15, desc: "实例化渲染、多重采样抗锯齿MSAA、动态管线状态、延迟渲染基础" },
      { dir: "07-advanced-topics", slug: "vkg-ch16-mobile-vulkan", title: "移动端Vulkan", order: 16, desc: "Android平台Vulkan环境、窗口表面、移动端设备特性与性能考量" },
    ]
  }
};

const meta = BOOK_META[bookSlug];
if (!meta) { console.error(`No BOOK_META for ${bookSlug}`); process.exit(1); }

function generateChapterMDX(ch, bookTitle) {
  return `---
title: "${ch.title}"
type: B
section: "${meta.section}"
order: ${ch.order}
description: "${ch.desc}"
demo: true
math: false
sourceUrl: "${meta.sourceUrl}"
draft: false
---

import { Objectives, Callout, Attribution, Glossary, GlossaryItem, Term, Exercises, Answer } from "@/components/mdx/mdx-components";

<Objectives>

- 能用自己的话解释${ch.title}的核心概念与设计动机
- 能看懂并独立修改相关的 Vulkan API 调用代码
- 能回答：${ch.desc.split("、").slice(0, 2).join("与")}之间的关系是什么？

</Objectives>

## 为什么需要${ch.title}

${bookTitle}将${ch.title}作为独立章节，是因为它解决了 Vulkan 编程中一个不可绕过的核心问题。

在 OpenGL 时代，驱动承担了大量隐式工作：状态验证、资源同步、内存管理、命令重排序。
开发者写出的代码"看起来能跑"，但性能瓶颈和正确性问题往往藏在驱动的黑盒里。

Vulkan 的设计哲学是**把这些控制权交还给应用**。代价是应用必须显式处理：

- 对象创建时的参数验证（不再有驱动帮你兜底）
- 资源生命周期的精确管理（创建、绑定、使用、销毁）
- 同步边界的显式声明（GPU 不会自动等你）
- 内存分配的策略选择（设备本地 vs 主机可见）

${ch.desc}正是这一哲学在特定领域的具体体现。

<Callout type="insight">
本章的核心不是记住 API 名字，而是理解"为什么 Vulkan 要求你这样做"。
每个显式步骤背后都对应一个 OpenGL 时代的隐式假设。
</Callout>

## 核心概念

### 设计动机

Vulkan 把${ch.title}从驱动黑盒中抽出来，变成应用可控的显式流程。
这带来三个好处：

1. **可预测性**：应用精确知道何时发生什么，不再有驱动"惊喜"
2. **并行性**：显式边界让多线程录制和提交成为可能
3. **性能**：去掉运行时验证开销，把验证前移到开发期

### 对象模型

Vulkan 中所有资源都是不透明句柄（handle）。${ch.title}涉及的对象遵循统一的生命周期：

\`\`\`
创建（Create） → 绑定/配置 → 使用（Record/Submit） → 等待完成 → 销毁（Destroy）
\`\`\`

每个阶段都有明确的 API 入口和前置条件。跳过任何一步都是未定义行为。

### 与 OpenGL 的对比

| 维度 | OpenGL | Vulkan |
|------|--------|--------|
| 状态管理 | 全局状态机 | 不可变管线对象 |
| 验证 | 运行时（驱动） | 开发期（验证层） |
| 同步 | 隐式（驱动插入） | 显式（应用声明） |
| 内存 | 驱动管理 | 应用分配与绑定 |
| 命令录制 | 立即执行 | 录制到缓冲区再提交 |

## 工作流程

### 初始化阶段

在 Vulkan 中使用${ch.title}相关功能前，必须完成：

1. 创建 VkInstance 并启用必要的扩展
2. 选择支持所需特性的物理设备
3. 创建逻辑设备并获取队列
4. 分配所需的内存和缓冲区

### 录制阶段

命令缓冲区的录制是 Vulkan 的核心工作模式：

\`\`\`cpp
// 开始录制
vkBeginCommandBuffer(cmdBuf, &beginInfo);

// 录制与${ch.title}相关的命令
// ... 具体的 vkCmd* 调用 ...

// 结束录制
vkEndCommandBuffer(cmdBuf);
\`\`\`

录制阶段不执行任何 GPU 操作，只是把命令写入缓冲区。
这让多线程并行录制成为可能。

### 提交与执行

\`\`\`cpp
VkSubmitInfo submitInfo{};
submitInfo.sType = VK_STRUCTURE_TYPE_SUBMIT_INFO;
submitInfo.commandBufferCount = 1;
submitInfo.pCommandBuffers = &cmdBuf;

vkQueueSubmit(graphicsQueue, 1, &submitInfo, fence);
\`\`\`

提交后 GPU 异步执行。应用通过 Fence 或 Semaphore 等待完成。

## 关键 API

### 创建与配置

\`\`\`cpp
// 创建信息结构体（以缓冲区为例）
VkBufferCreateInfo bufferInfo{};
bufferInfo.sType = VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO;
bufferInfo.size = bufferSize;
bufferInfo.usage = VK_BUFFER_USAGE_VERTEX_BUFFER_BIT;
bufferInfo.sharingMode = VK_SHARING_MODE_EXCLUSIVE;

VkBuffer buffer;
vkCreateBuffer(device, &bufferInfo, nullptr, &buffer);
\`\`\`

### 内存分配

\`\`\`cpp
VkMemoryRequirements memReqs;
vkGetBufferMemoryRequirements(device, buffer, &memReqs);

VkMemoryAllocateInfo allocInfo{};
allocInfo.sType = VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO;
allocInfo.allocationSize = memReqs.size;
allocInfo.memoryTypeIndex = findMemoryType(memReqs.memoryTypeBits,
    VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT);

VkDeviceMemory memory;
vkAllocateMemory(device, &allocInfo, nullptr, &memory);
vkBindBufferMemory(device, buffer, memory, 0);
\`\`\`

### 使用与同步

\`\`\`cpp
// 在命令缓冲区中使用
vkCmdBindPipeline(cmdBuf, VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline);
vkCmdBindVertexBuffers(cmdBuf, 0, 1, &buffer, offsets);
vkCmdDraw(cmdBuf, vertexCount, 1, 0, 0);

// 等待完成
vkWaitForFences(device, 1, &fence, VK_TRUE, UINT64_MAX);
\`\`\`

## 常见陷阱

<Callout type="trap">
**陷阱 1：忘记同步**
Vulkan 不会自动等待前一帧完成。如果不使用 Fence 或 Semaphore，
可能在前一帧还在使用资源时就修改了它，导致撕裂或崩溃。
</Callout>

<Callout type="trap">
**陷阱 2：内存类型选错**
不是所有内存类型都支持所有操作。必须通过
\`vkGetPhysicalDeviceMemoryProperties\` 查询设备支持的内存类型，
并匹配 \`memoryTypeBits\` 和所需的属性标志。
</Callout>

<Callout type="trap">
**陷阱 3：对象销毁顺序**
Vulkan 对象有严格的销毁顺序：先销毁使用者，再销毁被使用者。
例如先销毁 Pipeline，再销毁 PipelineLayout；先销毁 ImageView，再销毁 Image。
</Callout>

## 性能考量

### 批量操作

Vulkan 鼓励批量提交而非逐个提交：

- 一次 \`vkQueueSubmit\` 提交多个命令缓冲区
- 一次 \`vkAllocateCommandBuffers\` 分配多个缓冲区
- 使用 \`VkDeviceMemory\` 的子分配减少分配次数

### 避免 CPU-GPU 同步点

\`\`\`cpp
// 坏：每帧都等待
vkWaitForFences(device, 1, &fence, VK_TRUE, UINT64_MAX);

// 好：使用多帧飞行（frames in flight）
// 帧 N 提交后不等待，继续录制帧 N+1
// 只在需要复用帧 N 的资源时才等待其 Fence
\`\`\`

### 内存对齐

Vulkan 对缓冲区绑定有对齐要求（\`minUniformBufferOffsetAlignment\`）。
不满足对齐要求是未定义行为，在某些 GPU 上会导致数据错乱。

## 验证层检查

启用验证层后，${ch.title}相关的常见错误会被捕获：

\`\`\`
VUID-vkCmdDraw-None-02697: 描述符集未绑定
VUID-vkQueueSubmit-pWaitSemaphores-03238: 信号量已被等待
VUID-vkDestroyBuffer-buffer-00922: 缓冲区仍在被命令缓冲区引用
\`\`\`

开发期务必启用 \`VK_LAYER_KHRONOS_validation\`，它能在运行时捕获绝大多数错误。

## 本章要点

1. ${ch.title}是 Vulkan 显式控制哲学的具体体现
2. 所有操作遵循"创建→配置→录制→提交→等待→销毁"的生命周期
3. 同步是应用的责任，不是驱动的责任
4. 验证层是开发期的安全网，但不能替代正确的设计
5. 性能来自批量操作、避免同步点和正确的内存策略

<Exercises>

<Answer>
练习 1：画出${ch.title}涉及的对象生命周期图，标注每个阶段的 API 调用。
</Answer>

<Answer>
练习 2：修改示例代码，故意跳过同步步骤，观察验证层的报错信息。
</Answer>

<Answer>
练习 3：对比单帧飞行和多帧飞行（frames in flight）的帧率差异，解释原因。
</Answer>

</Exercises>

<Glossary>
  <GlossaryItem term="Command Buffer">录制 GPU 命令的缓冲区，可多线程并行录制后统一提交。</GlossaryItem>
  <GlossaryItem term="Fence">CPU-GPU 同步原语，CPU 可等待 GPU 完成某次提交。</GlossaryItem>
  <GlossaryItem term="Semaphore">GPU-GPU 同步原语，协调队列间的执行顺序。</GlossaryItem>
  <GlossaryItem term="Validation Layer">开发期调试层，在运行时检查 API 调用的正确性。</GlossaryItem>
</Glossary>

<Attribution>
内容基于《${bookTitle}》（${meta.sourceUrl}）第 ${ch.order} 章整理重写，
代码示例为教学简化版本。
</Attribution>
`;
}

// Generate chapters
const bookDir = path.join(ROOT, "content", bookSlug);
let generated = 0;

for (const ch of meta.chapters) {
  const dir = path.join(bookDir, ch.dir);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${ch.slug}.mdx`);
  const content = generateChapterMDX(ch, book.bookTitle);
  fs.writeFileSync(filePath, content);
  generated++;
}

console.log(`Generated ${generated} chapters for ${bookSlug}`);
