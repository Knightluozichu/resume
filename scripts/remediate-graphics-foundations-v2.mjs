#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/graphics-foundations-v2-profiles.json",
);

const SOURCES = {
  rayBook: "https://raytracing.github.io/books/RayTracingInOneWeekend.html",
  rayCode: "https://github.com/RayTracing/raytracing.github.io",
  rayRelease:
    "https://github.com/RayTracing/raytracing.github.io/releases/tag/v4.0.2",
  cgPublisher:
    "https://www.pearson.com/en-gb/subject-catalog/p/computer-graphics-with-open-gl-pearson-new-international-edition/P200000004424/9781292037196",
  openGlSpec: "https://registry.khronos.org/OpenGL/specs/gl/glspec46.core.pdf",
  glslSpec: "https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf",
  agiSite: "https://sites.edm.uhasselt.be/agibook/",
  agiBrowse: "https://sites.edm.uhasselt.be/agibook/AGI2ebrowse.pdf",
  agiPublisher:
    "https://www.routledge.com/Advanced-Global-Illumination/Dutre-Bekaert-Bala/p/book/9781568813073",
  renderingEquation: "https://dl.acm.org/doi/10.1145/15922.15902",
  veachThesis: "https://graphics.stanford.edu/papers/veach_thesis/",
};

const BOOKS = {
  "ray-tracing-weekend": {
    workTitle:
      "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
    sourceAccess: "full-text-primary",
    sourceKind: "official-full-text-and-official-source-repository",
    sourceUrl: SOURCES.rayBook,
    secondarySourceUrls: [SOURCES.rayCode, SOURCES.rayRelease],
    sourceSummary:
      "官方4.0.2全文与同项目源码均可访问；原书14个顶层单元映射到12个课程页，其中导论与图像输出、法线与相机类分别合并教学，不复制原书叙事。",
    practiceMode: "code",
    component: {
      implementation: "official-rtw-lab",
      importName: "OfficialRtwLab",
      exports: [
        ["GeometryLab", "geometry"],
        ["SamplingLab", "sampling"],
        ["EvidenceLab", "evidence"],
      ],
    },
    factSources: {
      officialFullText: {
        kind: "official-full-text",
        label: "Ray Tracing in One Weekend 4.0.2官方全文",
        url: SOURCES.rayBook,
      },
      officialCode: {
        kind: "official-source-repository",
        label: "RayTracing官方源码仓库",
        url: SOURCES.rayCode,
      },
      officialRelease: {
        kind: "official-release",
        label: "4.0.2发布记录",
        url: SOURCES.rayRelease,
      },
    },
  },
  "computer-graphics-4e": {
    workTitle:
      "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
    sourceAccess: "outline-only",
    sourceKind:
      "official-publisher-table-of-contents-and-primary-opengl-specifications",
    sourceUrl: SOURCES.cgPublisher,
    secondarySourceUrls: [SOURCES.openGlSpec, SOURCES.glslSpec],
    sourceSummary:
      "Pearson页面只用于核对第4版22章目录；未取得原书正文，机制、公式、代码与实验均依据公开标准独立编写。",
    practiceMode: "calculation",
    component: {
      implementation: "official-cg4-lab",
      importName: "OfficialCg4Lab",
      exports: [
        ["PipelineLab", "pipeline"],
        ["AlgorithmLab", "algorithm"],
        ["EvidenceLab", "evidence"],
      ],
    },
    factSources: {
      publisherToc: {
        kind: "official-publisher-table-of-contents",
        label: "Pearson第4版书目与22章目录",
        url: SOURCES.cgPublisher,
      },
      openGlSpec: {
        kind: "primary-technical-standard",
        label: "Khronos OpenGL 4.6 Core Specification",
        url: SOURCES.openGlSpec,
      },
      glslSpec: {
        kind: "primary-technical-standard",
        label: "Khronos GLSL 4.60 Specification",
        url: SOURCES.glslSpec,
      },
    },
  },
  "global-illumination": {
    workTitle:
      "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
    sourceAccess: "authorized-sample",
    sourceKind:
      "official-author-browse-sample-publisher-record-and-primary-research-sources",
    sourceUrl: SOURCES.agiSite,
    secondarySourceUrls: [
      SOURCES.agiBrowse,
      SOURCES.agiPublisher,
      SOURCES.renderingEquation,
      SOURCES.veachThesis,
    ],
    sourceSummary:
      "作者官网提供104页第二版浏览稿，可核对目录、部分正文、图与公式；课程不把未展示页面伪装成全文改编。",
    practiceMode: "simulation",
    component: {
      implementation: "official-agi-lab",
      importName: "OfficialAgiLab",
      exports: [
        ["TransportLab", "transport"],
        ["EstimatorLab", "estimator"],
        ["EvidenceLab", "evidence"],
      ],
    },
    factSources: {
      authorSite: {
        kind: "official-author-site",
        label: "Advanced Global Illumination作者官网",
        url: SOURCES.agiSite,
      },
      authorBrowseSample: {
        kind: "authorized-browse-sample",
        label: "作者官网第二版104页浏览稿",
        url: SOURCES.agiBrowse,
      },
      publisherRecord: {
        kind: "official-publisher-record",
        label: "Routledge第二版书目",
        url: SOURCES.agiPublisher,
      },
      renderingEquation: {
        kind: "primary-research-paper",
        label: "Kajiya渲染方程论文",
        url: SOURCES.renderingEquation,
      },
      veachThesis: {
        kind: "primary-research-thesis",
        label: "Veach光传输蒙特卡洛方法博士论文",
        url: SOURCES.veachThesis,
      },
    },
  },
};

const PAGE_SPECS = {
  "ray-tracing-weekend": [
    {
      old: "01-setup/rtw-ch01-overview",
      target: "01-output/rtw-01-output-image",
      unitIds: ["rtw-overview", "rtw-01"],
    },
    {
      old: "01-setup/rtw-ch02-output-image",
      target: "01-output/rtw-02-vec3",
      unitIds: ["rtw-02"],
    },
    {
      old: "01-setup/rtw-ch03-vec3",
      target: "02-rays/rtw-03-rays-camera-background",
      unitIds: ["rtw-03"],
    },
    {
      old: "02-basics/rtw-ch04-rays-camera",
      target: "02-rays/rtw-04-adding-sphere",
      unitIds: ["rtw-04"],
    },
    {
      old: "02-basics/rtw-ch05-sphere",
      target: "02-rays/rtw-05-normals-objects",
      unitIds: ["rtw-05", "rtw-camera-class"],
    },
    {
      old: "02-basics/rtw-ch06-normals",
      target: "03-sampling/rtw-06-antialiasing",
      unitIds: ["rtw-06"],
    },
    {
      old: "03-materials/rtw-ch07-camera-class",
      target: "03-materials/rtw-07-diffuse",
      unitIds: ["rtw-07"],
    },
    {
      old: "03-materials/rtw-ch08-diffuse",
      target: "03-materials/rtw-08-metal",
      unitIds: ["rtw-08"],
    },
    {
      old: "04-final/rtw-ch09-defocus",
      target: "03-materials/rtw-09-dielectrics",
      unitIds: ["rtw-09"],
    },
    {
      old: "04-final/rtw-ch10-final-scene",
      target: "04-camera/rtw-10-positionable-camera",
      unitIds: ["rtw-10"],
    },
    {
      old: "04-final/rtw-ch11-next",
      target: "04-camera/rtw-11-defocus-blur",
      unitIds: ["rtw-11"],
    },
    {
      old: "04-final/rtw-ch12-acknowledgments",
      target: "05-final/rtw-12-final-render",
      unitIds: ["rtw-12"],
    },
  ],
  "computer-graphics-4e": [
    {
      old: "01-basics/cg4e-ch01-coord-geometry",
      target: "01-foundations/cg4-01-hardware",
      unitIds: ["cg4-01"],
    },
    {
      old: "01-basics/cg4e-ch02-graphics-systems",
      target: "01-foundations/cg4-02-systems-applications",
      unitIds: ["cg4-02"],
    },
    {
      old: "01-basics/cg4e-ch03-output-primitives",
      target: "02-primitives/cg4-03-output-primitives",
      unitIds: ["cg4-03"],
    },
    {
      old: "01-basics/cg4e-ch04-attributes",
      target: "02-primitives/cg4-04-attributes-algorithms",
      unitIds: ["cg4-04", "cg4-05"],
    },
    {
      old: "02-transforms/cg4e-ch05-transforms",
      target: "03-2d/cg4-05-2d-transformations",
      unitIds: ["cg4-06"],
    },
    {
      old: "02-transforms/cg4e-ch06-2d-viewing",
      target: "03-2d/cg4-06-2d-viewing",
      unitIds: ["cg4-07"],
    },
    {
      old: "02-transforms/cg4e-ch07-3d-concepts",
      target: "04-3d/cg4-07-3d-transformations",
      unitIds: ["cg4-08"],
    },
    {
      old: "02-transforms/cg4e-ch08-3d-viewing",
      target: "04-3d/cg4-08-viewing-hierarchy",
      unitIds: ["cg4-09", "cg4-10"],
    },
    {
      old: "03-rendering/cg4e-ch09-visible-surface",
      target: "05-rendering/cg4-09-visible-surfaces",
      unitIds: ["cg4-14"],
    },
    {
      old: "03-rendering/cg4e-ch10-illumination",
      target: "05-rendering/cg4-10-illumination-global",
      unitIds: ["cg4-15", "cg4-19"],
    },
    {
      old: "03-rendering/cg4e-ch11-color",
      target: "05-rendering/cg4-11-texture-color",
      unitIds: ["cg4-16", "cg4-17"],
    },
    {
      old: "04-applications/cg4e-ch12-animation",
      target: "06-applications/cg4-12-animation-modeling",
      unitIds: ["cg4-11", "cg4-21"],
    },
    {
      old: "04-applications/cg4e-ch13-standards",
      target: "06-applications/cg4-13-input-shaders",
      unitIds: ["cg4-18", "cg4-20"],
    },
    {
      old: "04-applications/cg4e-ch14-future",
      target: "06-applications/cg4-14-objects-splines-visualization",
      unitIds: ["cg4-12", "cg4-13", "cg4-22"],
    },
  ],
  "global-illumination": [
    {
      old: "01-theory/gi-ch01-introduction",
      target: "01-foundations/agi-01-introduction",
      unitIds: ["agi-01"],
    },
    {
      old: "01-theory/gi-ch02-radiometry",
      target: "01-foundations/agi-02-physics-light-transport",
      unitIds: ["agi-02"],
    },
    {
      old: "01-theory/gi-ch03-transport",
      target: "02-methods/agi-03-monte-carlo",
      unitIds: ["agi-03"],
    },
    {
      old: "02-methods/gi-ch04-monte-carlo",
      target: "02-methods/agi-04-computing-light-transport",
      unitIds: ["agi-04"],
    },
    {
      old: "02-methods/gi-ch05-ray-tracing",
      target: "03-algorithms/agi-05-stochastic-path-tracing",
      unitIds: ["agi-05"],
    },
    {
      old: "02-methods/gi-ch06-radiosity",
      target: "03-algorithms/agi-06-stochastic-radiosity",
      unitIds: ["agi-06"],
    },
    {
      old: "03-advanced/gi-ch07-photon-mapping",
      target: "03-algorithms/agi-07-hybrid-algorithms",
      unitIds: ["agi-07"],
    },
    {
      old: "03-advanced/gi-ch08-path-tracing",
      target: "04-frontiers/agi-08-realism-speed",
      unitIds: ["agi-08"],
    },
    {
      old: "03-advanced/gi-ch09-bidirectional",
      target: "04-frontiers/agi-09-conclusion",
      unitIds: ["agi-09"],
    },
    {
      old: "03-advanced/gi-ch10-metropolis",
      target: "05-appendices/agi-a-class-library",
      unitIds: ["agi-a"],
    },
    {
      old: "04-realtime/gi-ch11-prt",
      target: "05-appendices/agi-b-hemispherical-coordinates",
      unitIds: ["agi-b"],
    },
    {
      old: "04-realtime/gi-ch12-realtime-gi",
      target: "05-appendices/agi-c-stochastic-relaxation-analysis",
      unitIds: ["agi-c"],
    },
  ],
};

const UNIT_DETAILS = {
  "rtw-overview": {
    focus: "界定周末路径追踪器的目标、实现顺序与调试基线",
    explanation:
      "Overview明确本书实现的是一个小型C++路径追踪器：像素生成相机射线，射线查询场景并递归散射，最终写出图像。它不是完整生产渲染器，也不依赖图形API；先固定这条边界，后续每一步才有可比较的基线。",
    formula: "C=trace(ray(scene,camera))",
    fault: "把本书误称为光栅化或Vulkan教程，或没有保存首张PPM基线",
    evidence: "程序入口、射线到颜色的数据流、固定输入和首张输出哈希",
  },
  "rtw-01": {
    focus: "把浮点RGB样本稳定编码成可检查的PPM图像",
    explanation:
      "ppm 是本书选择的最小图像容器，std::cout 负责把头部与逐像素整数写入标准输出，write_color 则集中完成颜色分量缩放与钳制。三者分开后，几何错误不会和文件编码错误混在一起。",
    formula:
      "c_8 = \\left\\lfloor 256\\,\\operatorname{clamp}(c,0,0.999)\\right\\rfloor",
    fault: "把进度日志也写进std::cout，或在量化前不限制颜色范围",
    evidence: "PPM头、像素数量、通道范围与stderr日志彼此独立",
  },
  "rtw-02": {
    focus: "用一个三分量类型统一表达方向、点与线性色彩",
    explanation:
      "vec3 提供加减、点积、叉积和归一化；point3 与 color 是语义别名，帮助读者区分位置和辐射颜色，却不会产生新的运行时类型。验收重点是每个运算的几何含义，而不是运算符重载本身。",
    formula: "\\widehat{v}=\\frac{v}{\\sqrt{v\\cdot v}}",
    fault: "对零长度向量归一化，或把color误当作point3参与几何平移",
    evidence: "长度、点积、叉积方向和分量运算的单元样本",
  },
  "rtw-03": {
    focus: "从像素中心构造射线并用方向插值背景",
    explanation:
      "射线用 P(t)=Q+td 表示从相机中心出发的半直线；视口把整数像素索引转换成三维采样位置；背景渐变只依赖单位方向的y分量，用来先验证相机坐标和扫描顺序。",
    formula: "P(t)=Q+t\\,d,\\qquad C=(1-a)C_0+aC_1",
    fault: "把图像y轴与世界y轴方向混用，或用理想宽高比替代实际像素比",
    evidence: "四角射线方向、首末像素位置和背景颜色单调性",
  },
  "rtw-04": {
    focus: "把射线代入隐式球方程并选择最近有效根",
    explanation:
      "球体由中心和半径定义；把射线代入球体方程得到关于t的二次方程；相交由判别式和允许的t区间共同决定。只判断判别式非负仍会误接收相机背后的根。",
    formula: "a t^2+2ht+c=0,\\qquad t=\\frac{-h\\pm\\sqrt{h^2-ac}}{a}",
    fault: "接受负t、忽略最近根，或在切线附近直接比较浮点数等于零",
    evidence: "判别式、两个候选根、命中区间和最终最近t",
  },
  "rtw-05": {
    focus: "把交点几何、朝向和多对象最近命中统一成查询合同",
    explanation:
      "法线从球心指向交点，hit_record 保存t、位置、法线与正反面，hittable_list 逐对象缩短允许上界以保留最近命中。这样材质只消费稳定的命中记录，不再重复求交细节。",
    formula:
      "n=\\frac{P-C}{r},\\qquad t_{\\max}\\leftarrow t_{\\mathrm{closest}}",
    fault: "不根据入射方向翻转法线，或遍历对象时没有收紧t上界",
    evidence: "front_face、单位法线、对象身份和最近命中距离",
  },
  "rtw-camera-class": {
    focus: "把相机初始化、射线生成、颜色求值与图像写出收拢为稳定接口",
    explanation:
      "Moving Camera Code Into Its Own Class把分散在main中的视口计算、get_ray、ray_color与render循环迁入camera类。重构前后图像必须一致；initialize集中派生参数，render只负责按像素调度并写出结果。",
    formula: "R=write(color(get\\_ray(pixel)))",
    fault: "重构时改变像素坐标或初始化顺序，导致相同场景输出发生漂移",
    evidence: "公开参数、initialize派生量、首末像素射线和重构前后PPM哈希",
  },
  "rtw-06": {
    focus: "用像素内随机样本降低锯齿并正确输出亮度",
    explanation:
      "samples_per_pixel 决定每像素估计器的样本数，随机采样把射线起点分布到像素区域，gamma 校正则在平均线性颜色后再映射到显示空间。先开方再平均会引入系统性偏差。",
    formula:
      "\\bar C=\\frac1N\\sum_{i=1}^{N}C_i,\\qquad C_{display}=\\sqrt{\\bar C}",
    fault: "每个像素复用相同随机偏移，或在样本累加前执行gamma变换",
    evidence: "固定随机种子的均值、边缘方差和量化前后通道值",
  },
  "rtw-07": {
    focus: "用随机散射近似漫反射的间接光",
    explanation:
      "漫反射材质从交点生成新方向；兰伯特模型让出射分布带余弦权重；随机单位向量提供一种易实现的采样构造。若散射方向接近零向量，需要回退到表面法线。",
    formula: "f_r=\\frac{\\rho}{\\pi},\\qquad \\omega_o=n+u_{sphere}",
    fault: "把随机方向当成能量本身，或不处理接近零的散射向量",
    evidence: "散射方向半球性、衰减颜色、递归返回和固定种子图像",
  },
  "rtw-08": {
    focus: "让镜面反射方向与粗糙扰动保持在可见半球",
    explanation:
      "金属材质先计算镜面反射，再用 fuzz 缩放单位球内扰动；镜面反射保持入射角等于反射角；只有扰动后的方向仍指向表面外侧才接受散射。",
    formula: "r=v-2(v\\cdot n)n,\\qquad d=r+f\\,u",
    fault: "允许fuzz无限增大，或接受与法线点积非正的反射方向",
    evidence: "理想反射方向、fuzz边界、半球测试和吞吐颜色",
  },
  "rtw-09": {
    focus: "在反射、折射和全内反射之间做概率选择",
    explanation:
      "电介质通常不吸收颜色，但会依据折射率改变方向；折射由Snell定律约束；当几何条件触发全内反射时只能反射，否则可用Schlick近似在两条路径之间采样。",
    formula:
      "\\eta_i\\sin\\theta_i=\\eta_t\\sin\\theta_t,\\qquad R(\\theta)\\approx R_0+(1-R_0)(1-\\cos\\theta)^5",
    fault: "正反面使用同一折射率比，或在全内反射条件下仍计算折射根",
    evidence: "折射率比、cosθ、全内反射判据和随机选择结果",
  },
  "rtw-10": {
    focus: "从观察点、目标点和上方向建立正交相机基",
    explanation:
      "lookfrom 定义相机位置，lookat 定义视线目标，vup 只提供滚转参考；三者经叉积生成u、v、w正交基。vup与视线平行时基会退化，必须在构造阶段拒绝。",
    formula:
      "w=\\widehat{lookfrom-lookat},\\quad u=\\widehat{vup\\times w},\\quad v=w\\times u",
    fault: "交换叉积次序导致镜像，或允许vup与视线近似平行",
    evidence: "u/v/w正交性、手性、视口中心和中心像素射线",
  },
  "rtw-11": {
    focus: "从有限孔径采样产生与焦平面一致的散焦",
    explanation:
      "散焦通过在镜头圆盘上随机改变射线起点实现，景深来自不同起点仍指向同一焦平面样本，focus_dist 决定视口所在的对焦距离。孔径为零时必须退化为针孔相机。",
    formula: "Q=lookfrom+p_{disk},\\qquad d=P_{focus}-Q",
    fault: "在单位方形而非圆盘采样，或改变起点后仍沿用旧射线方向",
    evidence: "镜头样本半径、焦平面交点一致性和零孔径退化",
  },
  "rtw-12": {
    focus: "把几何、材质、相机与采样组合成可复现最终场景",
    explanation:
      "最终场景用随机球覆盖多种材质与尺度，递归深度限制无穷散射链，随机球生成必须在几何重叠与材质概率上保持约束。最终验收不是看一张漂亮图，而是能用固定种子重放。",
    formula:
      "L_o=\\beta_0L_e+\\sum_{k=1}^{D}\\beta_kL_{e,k},\\qquad D\\le D_{max}",
    fault: "不限制递归深度、随机球重叠，或每次运行无法复现同一场景",
    evidence: "场景对象数、材质分布、最大深度、固定种子和最终PPM哈希",
  },

  "cg4-01": {
    focus: "区分显示、输入、处理和存储硬件在图形系统中的责任",
    explanation:
      "computer graphics hardware 不只是GPU，还包括处理器、帧缓冲、display device 与输入设备；每个部件都改变带宽、精度或延迟边界。课程以可观察接口解释硬件链，不把现代GPU结构倒填成原书唯一实现。",
    formula: "T_{frame}=T_{cpu}+T_{transfer}+T_{gpu}+T_{scanout}",
    fault: "把显示器刷新、GPU执行和CPU提交当成同一个时钟",
    evidence: "设备能力、缓冲格式、提交时刻和显示时刻",
  },
  "cg4-02": {
    focus: "从应用需求反推图形系统的数据流与交互闭环",
    explanation:
      "computer graphics system 把建模、变换、可见性、着色与显示连接起来，graphics application 则决定精度、交互与性能目标。相同管线用于CAD、可视化或娱乐时，接受条件并不相同。",
    formula: "y=D(S(V(T(x))))",
    fault: "先选API再定义应用误差预算，导致指标与用户任务脱节",
    evidence: "应用输入、管线阶段、误差预算和最终交互响应",
  },
  "cg4-03": {
    focus: "把连续几何转换成离散像素覆盖",
    explanation:
      "graphics output primitive 是点、线和多边形等管线输入；point 提供最小离散覆盖单元。输出算法必须声明像素中心、端点包含规则和坐标取整，否则相邻图元会产生裂缝或重复覆盖。",
    formula: "p_{pixel}=\\operatorname{round}(p_{screen}-0.5)+0.5",
    fault: "混用像素角与像素中心，或相邻线段采用不同端点规则",
    evidence: "覆盖像素集合、端点、八分区对称性和裁剪后连续性",
  },
  "cg4-04": {
    focus: "让线宽、颜色和图案等属性在图元内按规则插值",
    explanation:
      "primitive attribute 描述颜色、宽度、样式与透明度等外观，line attribute 尤其受连接、端帽和像素覆盖影响。属性只有与图元参数化和插值位置绑定，才不会在裁剪或透视后失真。",
    formula: "a(t)=(1-t)a_0+t a_1",
    fault: "在错误空间线性插值，或把线宽当成与分辨率无关的世界尺度",
    evidence: "端点属性、插值参数、连接处覆盖和裁剪前后结果",
  },
  "cg4-05": {
    focus: "用增量误差驱动图元光栅化而非重复浮点求值",
    explanation:
      "primitive implementation algorithm 决定连续图元如何遍历像素，bresenham 用整数增量维护理想线与候选像素的误差。正确实现应在各象限保持对称，并清楚处理陡斜率与端点。",
    formula: "e_{k+1}=e_k+2\\Delta y-2\\Delta x\\,I_{stepY}",
    fault: "只实现0到1斜率，或在象限变换后忘记恢复坐标",
    evidence: "像素序列、误差项、象限对称和端点包含",
  },
  "cg4-06": {
    focus: "用齐次矩阵组合二维平移、旋转、缩放和绕点变换",
    explanation:
      "2d transformation 通过矩阵改变点和向量，homogeneous coordinate 把平移提升为矩阵乘法并支持连续组合。矩阵次序表达操作次序，交换两个非交换变换通常会改变结果。",
    formula:
      "\\begin{bmatrix}x'\\\\y'\\\\1\\end{bmatrix}=T R S\\begin{bmatrix}x\\\\y\\\\1\\end{bmatrix}",
    fault: "混淆行向量与列向量约定，或按阅读顺序错误相乘",
    evidence: "基点、基向量、组合矩阵和逆变换回放",
  },
  "cg4-07": {
    focus: "把世界窗口稳定映射到设备视口并执行裁剪",
    explanation:
      "2d viewing 先在世界空间选择可见window，再映射到设备viewport；window viewport 变换同时包含平移与比例。裁剪应先于设备量化，以避免窗口外几何污染边界像素。",
    formula: "x_v=x_{v0}+(x_w-x_{w0})\\frac{x_{v1}-x_{v0}}{x_{w1}-x_{w0}}",
    fault: "窗口宽度为零、y轴方向约定不一致，或先取整再裁剪",
    evidence: "窗口角点、视口角点、裁剪参数和边界像素",
  },
  "cg4-08": {
    focus: "围绕任意旋转轴组合三维刚体与仿射变换",
    explanation:
      "3d transformation 扩展二维齐次方法到四维坐标，rotation axis 需要先定义单位方向和旋转中心。绕任意轴旋转可由对齐、轴旋转和逆对齐组合，或直接使用Rodrigues公式。",
    formula:
      "R(v)=v\\cos\\theta+(k\\times v)\\sin\\theta+k(k\\cdot v)(1-\\cos\\theta)",
    fault: "旋转轴未归一化，或法线直接乘含非均匀缩放的模型矩阵",
    evidence: "轴上点不动、长度保持、行列式和逆变换",
  },
  "cg4-09": {
    focus: "建立观察坐标、投影和视体裁剪的完整合同",
    explanation:
      "3d viewing 把世界点转换到相机空间并投影，view volume 界定近远平面与侧面裁剪范围。透视除法前后的空间不可混用，近裁剪面也不能设为零。",
    formula: "p_{ndc}=\\frac{P V p_{world}}{w_{clip}}",
    fault: "在裁剪前执行透视除法，或混淆左右手坐标与深度范围",
    evidence: "相机基、clip坐标、w符号、NDC范围和深度值",
  },
  "cg4-10": {
    focus: "用父子局部变换构造可编辑的层级模型",
    explanation:
      "hierarchical modeling 把复杂对象拆成局部部件，scene graph 通过父子关系传播变换与可见状态。修改父节点会影响整棵子树，但共享节点需要明确实例化和所有权。",
    formula: "M_{world}^{child}=M_{world}^{parent}M_{local}^{child}",
    fault: "把世界矩阵写回局部矩阵，或图中出现未检测的循环依赖",
    evidence: "父子路径、局部矩阵、世界矩阵和共享实例身份",
  },
  "cg4-11": {
    focus: "从关键状态插值出连续运动并保持时间一致性",
    explanation:
      "computer animation 把对象状态放到时间轴上，keyframe 定义稀疏控制点，中间帧由插值或动力学产生。位置可线性插值，但旋转通常需要避免欧拉角跳变。",
    formula: "x(t)=(1-u)x_k+u x_{k+1},\\qquad u=\\frac{t-t_k}{t_{k+1}-t_k}",
    fault: "按帧数而非时间推进，或跨越角度分支造成突然翻转",
    evidence: "时间戳、关键帧区间、插值参数和循环边界",
  },
  "cg4-12": {
    focus: "选择能支持查询、编辑与渲染的三维对象表示",
    explanation:
      "3d object representation 可以是边界、体、隐式面或过程模型，polygon mesh 用顶点、边与面近似表面。表示选择决定拓扑查询、法线连续性、存储和求交成本。",
    formula: "p(u,v)=\\sum_i w_i(u,v)p_i,\\qquad \\sum_i w_i=1",
    fault: "只比较三角形数量而忽略拓扑、属性接缝和退化面",
    evidence: "顶点/索引、邻接、法线、包围盒和退化统计",
  },
  "cg4-13": {
    focus: "用控制点和基函数构造连续曲线与曲面",
    explanation:
      "spline representation 用分段多项式控制连续性，bezier 通过Bernstein基函数形成凸包内曲线。提高控制点数量会提高次数而非自动增加局部控制，因此长曲线通常采用分段样条。",
    formula: "B(t)=\\sum_{i=0}^{n}\\binom{n}{i}(1-t)^{n-i}t^iP_i",
    fault: "把控制多边形当成插值折线，或拼接段只对齐位置不对齐切线",
    evidence: "端点、切线、凸包、连续阶数和细分误差",
  },
  "cg4-14": {
    focus: "为同一像素选择最近可见片元",
    explanation:
      "visible-surface detection 比较遮挡候选，z-buffer 为每个像素保存当前最近深度。算法简单但依赖深度精度、比较方向和清除值；近远平面比例过大时会出现z-fighting。",
    formula:
      "z_{new}\\prec z_{buffer}\\Rightarrow (C,z)\\leftarrow(C_{new},z_{new})",
    fault: "清除值与比较函数不匹配，或用线性直觉解释非线性深度",
    evidence: "深度格式、近远平面、比较函数和重叠片元结果",
  },
  "cg4-15": {
    focus: "分解局部光照项并选择顶点或片元求值位置",
    explanation:
      "illumination model 把环境、漫反射与高光等局部项组合，surface rendering 决定法线、材质和光源在何处求值。Gouraud插值颜色，Phong插值法线，二者对小高光的保真度不同。",
    formula: "I=I_a k_a+I_l[k_d\\max(0,n\\cdot l)+k_s\\max(0,r\\cdot v)^p]",
    fault: "在非线性颜色空间累加光照，或插值后不重新归一化法线",
    evidence: "法线、光向量、视向量、各光照项和插值位置",
  },
  "cg4-16": {
    focus: "把表面参数映射到纹理并控制采样与细节频率",
    explanation:
      "texture mapping 用UV等参数从图像或过程纹理取样，surface detail 可通过法线、位移或微表面参数改变外观。过滤模式和mipmap决定缩小纹理时是否走样。",
    formula:
      "C_f=sample(T,uv,\\partial uv/\\partial x,\\partial uv/\\partial y)",
    fault: "接缝两侧共享错误UV，或远处仍使用最高频纹理层",
    evidence: "UV、导数、mipmap层、过滤模式和接缝像素",
  },
  "cg4-17": {
    focus: "区分颜色编码、显示转换与任务相关颜色应用",
    explanation:
      "color model 定义RGB、HSV、XYZ等分量如何表达颜色，color application 决定选择、插值、比较或显示的目标。编码值不等于线性光强，混合和光照通常应在线性空间完成。",
    formula: "C_{display}=OETF(M_{xyz\\to rgb}C_{XYZ})",
    fault: "直接对gamma编码值求平均，或忽略色域外颜色的映射策略",
    evidence: "白点、变换矩阵、线性/编码状态和色域裁剪",
  },
  "cg4-18": {
    focus: "把设备事件转换成稳定的图形交互状态",
    explanation:
      "interactive input 把指针、键盘或触控事件映射到对象选择与操作，graphical user interface 再通过控件状态给出反馈。命中测试必须说明坐标空间、焦点和事件捕获规则。",
    formula: "p_{local}=M_{world}^{-1}p_{device}",
    fault: "用设备坐标直接命中世界对象，或焦点转移后仍消费旧事件",
    evidence: "事件时间、设备坐标、逆变换、命中对象和焦点状态",
  },
  "cg4-19": {
    focus: "把表面之间的间接能量交换纳入图像",
    explanation:
      "global illumination 计算光源经多次反射到达观察者的能量，radiosity 在漫反射假设下用面片间形状因子建立线性系统。局部光照无法产生颜色渗透等间接效应。",
    formula: "B_i=E_i+\\rho_i\\sum_j F_{ij}B_j",
    fault: "形状因子不守恒，或把仅适用于漫反射的radiosity用于镜面路径",
    evidence: "面片面积、形状因子和、发射项与迭代残差",
  },
  "cg4-20": {
    focus: "用可编程阶段定义顶点与片元的变换和着色",
    explanation:
      "programmable shader 让应用提供管线阶段代码，glsl 明确输入输出、存储类别和执行模型。阶段接口、坐标空间和资源绑定必须一致，编译成功不代表结果正确。",
    formula: "gl\\_Position=PVM\\,p,\qquad C_o=f(material,lights,varyings)",
    fault: "顶点和片元阶段接口位置不一致，或在错误坐标空间计算法线",
    evidence: "着色器日志、接口布局、uniform绑定和参考像素",
  },
  "cg4-21": {
    focus: "用规则和参数生成可重复的复杂几何",
    explanation:
      "algorithmic modeling 通过递归、文法或噪声构造形状，fractal 用尺度自相似产生复杂细节。生成器必须暴露随机种子、终止条件和几何预算，否则无法复现或控制复杂度。",
    formula: "N_d=b^d,\\qquad L_{detail}=L_0s^d",
    fault: "递归无终止条件，或每次编辑都隐式更换随机种子",
    evidence: "规则、深度、分支因子、随机种子和输出包围盒",
  },
  "cg4-22": {
    focus: "把标量、向量和体数据映射成可解释图形",
    explanation:
      "data visualization 选择位置、颜色、形状等视觉通道表达数据，volume rendering 沿视线积分三维标量场的吸收与发射。传递函数决定哪些结构可见，也可能制造误导。",
    formula:
      "C=\\int_0^D T(t)c(t)\\sigma(t)dt,\\quad T(t)=e^{-\\int_0^t\\sigma(s)ds}",
    fault: "传递函数掩盖关键范围，或采样步长变化后没有重新校准不透明度",
    evidence: "数据范围、传递函数、采样步长和参考切片",
  },

  "agi-01": {
    focus: "把真实感图像合成表述成可比较的光传输问题",
    explanation:
      "realistic image synthesis 追求物理与感知上可信的图像，global illumination framework 则把发射、散射、可见性、传感器和数值算法放进统一结构。章节先定义问题边界，再比较算法，而不是从某张漂亮结果图反推正确性。",
    formula: "I=M(T(S))",
    fault: "把视觉逼真等同于物理准确，或不声明场景与传感器模型",
    evidence: "场景、光源、材料、传感器、参考图和误差定义",
  },
  "agi-02": {
    focus: "用辐射度量和渲染方程描述表面光能交换",
    explanation:
      "radiometry 定义辐射通量、辐照度与辐亮度，rendering equation 把出射辐亮度写成自发光与反射入射光之和，importance 提供从传感器反向理解贡献的伴随视角。",
    formula:
      "L_o(x,\\omega_o)=L_e(x,\\omega_o)+\\int_{\\Omega}f_r L_i(x,\\omega_i)|n\\cdot\\omega_i|d\\omega_i",
    fault: "遗漏余弦或立体角测度，或把radiance与irradiance单位混用",
    evidence: "量纲、方向、半球域、BRDF与能量守恒",
  },
  "agi-03": {
    focus: "把高维积分转换为可估计、可分析方差的随机样本均值",
    explanation:
      "monte carlo integration 用样本均值估计积分，sampling random variables 把均匀随机数变换到目标分布，variance reduction 通过重要性采样、分层或控制变量降低噪声而不篡改期望。",
    formula:
      "\\hat I_N=\\frac1N\\sum_{i=1}^{N}\\frac{f(X_i)}{p(X_i)},\\quad X_i\\sim p",
    fault: "采样分布与权重不一致，或只比较单张随机结果判断方差",
    evidence: "PDF、样本、权重、批次均值和经验方差",
  },
  "agi-04": {
    focus: "从重要性、伴随与路径空间选择光传输求解方向",
    explanation:
      "importance function 衡量路径对传感器的潜在贡献，adjoint equation 连接光源传播与观察者重要性，path formulation 把多次散射展开为不同长度路径的积分。策略选择决定样本从光源、相机还是两端生成。",
    formula:
      "I=\\sum_{k=1}^{\\infty}\\int_{\\mathcal P_k}f_k(\\bar x)d\\mu(\\bar x)",
    fault: "混合多个策略却遗漏概率密度，或将路径方向约定前后颠倒",
    evidence: "路径顶点、生成策略、正反向PDF和测度转换",
  },
  "agi-05": {
    focus: "沿随机路径同时估计直接与间接光",
    explanation:
      "stochastic path tracing 从传感器逐次采样散射，direct illumination 通常用显式光源连接降低噪声，indirect illumination 则来自后续反弹。吞吐量必须累计BRDF、余弦、PDF和终止概率。",
    formula: "\\beta_{k+1}=\\beta_k\\frac{f_r|n\\cdot\\omega|}{p(\\omega)}",
    fault: "显式光源采样与BSDF路径重复计数，或俄罗斯轮盘后不补偿存活概率",
    evidence: "路径顶点、吞吐量、每步PDF、直接项和终止事件",
  },
  "agi-06": {
    focus: "用随机松弛或随机游走求解漫反射面片能量",
    explanation:
      "stochastic radiosity 把漫反射传输系统转成随机迭代，form factor 描述面片间几何耦合，random walk 在面片图上传播能量。收敛判断应基于残差或独立批次，而非仅看图像变亮。",
    formula: "B=E+RFB,\\qquad B=\\sum_{k=0}^{\\infty}(RF)^kE",
    fault: "形状因子行和超出物理范围，或随机游走权重与转移概率不匹配",
    evidence: "面片面积、F矩阵、残差、随机路径权重和能量和",
  },
  "agi-07": {
    focus: "组合互补采样策略以覆盖难采样光路",
    explanation:
      "final gathering 在粗略间接解上补充观察点附近采样，bidirectional tracing 从光源与相机两端连接子路径，irradiance caching 在平滑区域复用辐照度。混合算法必须说明偏差、权重和缓存有效域。",
    formula:
      "\\hat I=\\sum_s w_s(\\bar x)\\frac{f(\\bar x)}{p_s(\\bar x)},\\qquad \\sum_s w_s=1",
    fault: "多个策略重复贡献却不做MIS，或缓存跨越几何/法线不连续处",
    evidence: "策略PDF、MIS权重、缓存半径、拒绝条件和参考误差",
  },
  "agi-08": {
    focus: "把体介质、显示感知与快速全局光照纳入同一误差预算",
    explanation:
      "participating media 在空间中吸收、发射和散射光，tone mapping 把高动态范围辐亮度映射到显示设备，fast global illumination 用缓存、预计算或硬件加速换取时间。三者优化的误差来源不同，不能只报告帧率。",
    formula: "L(s)=T(0,s)L(0)+\\int_0^sT(t,s)[L_e(t)+L_s(t)]dt",
    fault: "忽略体透射率、tone mapping改变比较基准，或实时缓存泄漏旧光照",
    evidence: "消光系数、HDR基线、映射参数、缓存版本和时空误差",
  },
  "agi-09": {
    focus: "总结真实感渲染成就并明确仍未解决的问题",
    explanation:
      "photorealistic rendering achievements 包括统一传输理论与大量可行算法，unresolved issues 仍涉及复杂材料、动态场景、感知评价与计算成本。结论页应把已解决、工程近似和开放问题分栏，而不是宣布单一算法胜出。",
    formula: "d=(error,variance,cost)",
    fault: "用一个场景的主观效果外推普遍结论，或隐藏失败样本",
    evidence: "算法假设、基准场景、误差、资源开销和未覆盖现象",
  },
  "agi-a": {
    focus: "用类型与接口把路径、采样器和传感器组合成可扩展渲染器",
    explanation:
      "path node classes 保存路径顶点的几何与概率状态，light source sampling classes 封装光源生成策略，global illumination api 负责场景、积分器和输出的稳定边界。接口必须携带PDF与测度，不能只返回方向。",
    formula: "PathNode=(x,n,\\omega,\\beta,p_f,p_r,event)",
    fault: "类层次隐藏路径概率，或对象生命周期使缓存引用失效",
    evidence: "类型合同、正反向PDF、所有权、序列化和最小场景测试",
  },
  "agi-b": {
    focus: "在半球方向域中正确表达立体角与积分测度",
    explanation:
      "hemispherical coordinates 用极角θ与方位角φ表示法线上方方向，solid angle 的面积元为sinθ dθ dφ，hemisphere integration 因而不能把θ与φ都均匀采样后直接平均。",
    formula:
      "d\\omega=\\sin\\theta\\,d\\theta\\,d\\phi,\\qquad \\int_{\\Omega^+}d\\omega=2\\pi",
    fault: "遗漏sinθ雅可比，或把余弦加权半球样本当成均匀样本",
    evidence: "采样分布、PDF、单位向量长度和半球积分常数",
  },
  "agi-c": {
    focus: "分析随机松弛radiosity估计器的期望与方差",
    explanation:
      "stochastic relaxation radiosity 用随机更新近似线性传输系统，variance analysis 判断噪声如何随样本与松弛策略变化。无偏均值并不保证有限时间稳定，还必须检查自相关和谱性质。",
    formula: "B_{k+1}=B_k+\\alpha_k(\\widehat{T(B_k)}-B_k)",
    fault: "只证明期望正确却忽略方差发散，或用相关样本套用独立样本误差",
    evidence: "期望、方差、自相关、残差曲线和重复试验区间",
  },
};

const SNIPPETS = {
  "rtw-overview": `int main() {
  Scene scene = make_baseline_scene();
  Camera camera = make_baseline_camera();
  Image image = trace(scene, camera, /* seed */ 20260730);
  write_ppm(std::cout, image);
}`,
  "rtw-01": `void write_color(std::ostream& out, const color& c) {
  auto r = std::clamp(c.x(), 0.0, 0.999);
  auto g = std::clamp(c.y(), 0.0, 0.999);
  auto b = std::clamp(c.z(), 0.0, 0.999);
  out << int(256*r) << ' ' << int(256*g) << ' ' << int(256*b) << '\\n';
}`,
  "rtw-02": `double length_squared(const vec3& v) { return dot(v, v); }
vec3 unit_vector(const vec3& v) {
  if (length_squared(v) == 0) throw std::domain_error("zero vector");
  return v / std::sqrt(length_squared(v));
}`,
  "rtw-03": `point3 pixel = pixel00 + i*delta_u + j*delta_v;
ray primary(camera_center, pixel - camera_center);
vec3 d = unit_vector(primary.direction());
double a = 0.5 * (d.y() + 1.0);
color sky = (1-a)*color(1,1,1) + a*color(0.5,0.7,1);`,
  "rtw-04": `vec3 oc = ray.origin() - center;
double a = length_squared(ray.direction());
double h = dot(ray.direction(), oc);
double c = length_squared(oc) - radius*radius;
double discriminant = h*h - a*c;
if (discriminant < 0) return std::nullopt;`,
  "rtw-05": `if (object.hit(r, interval(t_min, closest), rec)) {
  closest = rec.t;
  rec.set_face_normal(r, outward_normal);
  nearest = rec;
}`,
  "rtw-06": `color sum(0,0,0);
for (int s = 0; s < samples_per_pixel; ++s)
  sum += ray_color(camera.sample_ray(i, j), world, max_depth);
color linear = sum / samples_per_pixel;
write_color(out, color(std::sqrt(linear.x()), std::sqrt(linear.y()), std::sqrt(linear.z())));`,
  "rtw-07": `vec3 scatter_direction = rec.normal + random_unit_vector();
if (scatter_direction.near_zero()) scatter_direction = rec.normal;
scattered = ray(rec.p, scatter_direction);
attenuation = albedo;`,
  "rtw-08": `vec3 reflected = reflect(unit_vector(in.direction()), rec.normal);
vec3 direction = reflected + std::min(fuzz, 1.0)*random_unit_vector();
if (dot(direction, rec.normal) <= 0) return false;
scattered = ray(rec.p, direction);`,
  "rtw-09": `double ratio = rec.front_face ? (1.0/refraction_index) : refraction_index;
double cos_theta = std::min(dot(-unit_direction, rec.normal), 1.0);
bool cannot_refract = ratio*std::sqrt(1-cos_theta*cos_theta) > 1;
vec3 direction = cannot_refract ? reflect(unit_direction, rec.normal)
                                : refract(unit_direction, rec.normal, ratio);`,
  "rtw-10": `w = unit_vector(lookfrom - lookat);
u = unit_vector(cross(vup, w));
v = cross(w, u);
viewport_u = viewport_width * u;
viewport_v = viewport_height * -v;`,
  "rtw-11": `vec3 p = defocus_disk_sample();
point3 origin = center + p.x()*defocus_disk_u + p.y()*defocus_disk_v;
point3 target = pixel_sample_square(i, j);
return ray(origin, target - origin);`,
  "rtw-12": `rng.seed(20260730);
auto world = make_random_spheres(rng);
camera.samples_per_pixel = 100;
camera.max_depth = 50;
camera.render(world, "final.ppm");`,
  "cg4-01": `const GLubyte* vendor = glGetString(GL_VENDOR);
const GLubyte* renderer = glGetString(GL_RENDERER);
GLint maxTexture = 0;
glGetIntegerv(GL_MAX_TEXTURE_SIZE, &maxTexture);
record_capability(vendor, renderer, maxTexture);`,
  "cg4-02": `FrameResult render(const Scene& scene, const Camera& camera) {
  auto clip = transform(scene, camera);
  auto visible = clip_and_cull(clip);
  auto fragments = rasterize(visible);
  return shade_and_present(fragments);
}`,
  "cg4-03": `plot(x0, y0);
int error = 2*dy - dx;
for (int x = x0; x < x1; ++x) {
  if (error > 0) { ++y; error -= 2*dx; }
  error += 2*dy;
  plot(x+1, y);
}`,
  "cg4-04": `for (int k = 0; k <= steps; ++k) {
  double t = double(k) / steps;
  Color c = (1-t)*c0 + t*c1;
  double width = (1-t)*w0 + t*w1;
  raster_line_sample(k, c, width);
}`,
  "cg4-06": `mat3 model = translate(tx, ty) * rotate(theta) * scale(sx, sy);
vec3 world = model * vec3(local.x, local.y, 1);
vec3 roundtrip = inverse(model) * world;
assert(distance(roundtrip.xy, local) < epsilon);`,
  "cg4-07": `double sx = (viewport.maxX-viewport.minX)/(window.maxX-window.minX);
double sy = (viewport.maxY-viewport.minY)/(window.maxY-window.minY);
Point device{viewport.minX + (p.x-window.minX)*sx,
             viewport.minY + (p.y-window.minY)*sy};`,
  "cg4-08": `vec3 k = normalize(axis);
vec3 rotated = v*cos(theta)
             + cross(k, v)*sin(theta)
             + k*dot(k, v)*(1-cos(theta));`,
  "cg4-09": `vec4 clip = projection * view * model * vec4(position, 1);
if (!inside_clip_volume(clip)) discard_primitive();
vec3 ndc = clip.xyz / clip.w;
Depth z = map_depth(ndc.z);`,
  "cg4-14": `if (fragment.depth < depthBuffer[pixel]) {
  depthBuffer[pixel] = fragment.depth;
  colorBuffer[pixel] = shade(fragment);
}`,
  "cg4-15": `vec3 n = normalize(normal);
float diffuse = max(dot(n, lightDir), 0.0);
float specular = pow(max(dot(reflect(-lightDir,n), viewDir),0.0), shininess);
vec3 local = ambient + kd*diffuse + ks*specular;`,
  "cg4-16": `vec2 uv = interpolate_perspective(vertexUv, reciprocalW);
vec2 gradX = dFdx(uv), gradY = dFdy(uv);
vec4 texel = textureGrad(albedoMap, uv, gradX, gradY);
vec3 linearColor = decode_srgb(texel.rgb);`,
  "cg4-11": `double u = (time - key0.time) / (key1.time - key0.time);
position = lerp(key0.position, key1.position, u);
orientation = slerp(key0.orientation, key1.orientation, u);
update_world_transforms(sceneGraph);`,
  "cg4-18": `Point local = inverse(node.worldTransform) * pointer.devicePosition;
if (node.bounds.contains(local)) {
  focus.capture(node.id);
  dispatch(node.id, pointer);
}`,
  "cg4-12": `for (const Face& face : mesh.faces) {
  if (face.is_degenerate()) continue;
  adjacency.add(face);
  bounds.expand(face.vertices());
}
validate_manifold_edges(adjacency);`,
  "agi-01": `Experiment e;
e.scene = load_scene("cornell-box");
e.sensor = pinhole_camera();
e.reference = render_reference(e.scene, 1'000'000);
compare_integrators(e, {"path", "bidirectional", "radiosity"});`,
  "agi-02": `Spectrum Lo = emitted(x, wo);
for (Direction wi : hemisphere_samples) {
  Lo += brdf(x, wi, wo) * incident(x, wi)
      * abs_dot(normal(x), wi) / pdf(wi);
}`,
  "agi-03": `double sum = 0;
for (int i = 0; i < sampleCount; ++i) {
  Sample x = distribution.sample(rng);
  sum += integrand(x.value) / x.pdf;
}
return sum / sampleCount;`,
  "agi-04": `Path eye = trace_from_sensor(sensorSample);
Path light = trace_from_emitter(lightSample);
for (auto [s,t] : connection_strategies)
  estimate += mis_weight(s,t) * connect(light,s,eye,t);`,
  "agi-05": `Spectrum beta(1), L(0);
for (int bounce = 0; bounce < maxDepth; ++bounce) {
  Hit h = intersect(ray);
  L += beta * sample_direct_light(h);
  auto s = h.bsdf.sample(rng);
  beta *= s.f * abs_dot(h.n, s.wi) / s.pdf;
  ray = Ray(h.p, s.wi);
}`,
  "agi-06": `Vector B = emission;
for (int iteration = 0; iteration < maxIterations; ++iteration) {
  int i = sample_patch(rng);
  double residual = emission[i] + reflectance[i]*dot(F.row(i), B) - B[i];
  B[i] += relaxation * residual / patch_probability(i);
}`,
  "agi-07": `Estimate e;
e += mis(path_sample());
e += mis(light_sample());
e += cache.valid(query) ? cache.lookup(query) : final_gather(query);
return reject_discontinuities(e, query.normal, query.position);`,
  "agi-08": `Radiance march_volume(Ray ray) {
  Radiance L = 0; double T = 1;
  for (auto sample : ray.samples(step)) {
    L += T * (sample.emission + sample.inscatter) * step;
    T *= exp(-sample.extinction * step);
  }
  return tone_map(L);
}`,
  "agi-09": `Report compare(const Integrator& candidate, const Reference& ref) {
  return { .bias = estimate_bias(candidate, ref),
           .variance = estimate_variance(candidate),
           .time = measure_time(candidate),
           .memory = measure_peak_memory(candidate) };
}`,
  "agi-a": `struct PathNode {
  Point3 p; Normal3 n; Spectrum throughput;
  double pdfForward, pdfReverse;
  ScatteringEvent event;
};
PathNode extend(const PathNode&, const Sample&);`,
  "agi-b": `double phi = 2*pi*u1;
double cosTheta = u2;
double sinTheta = sqrt(1-cosTheta*cosTheta);
vec3 w{cos(phi)*sinTheta, sin(phi)*sinTheta, cosTheta};
double pdf = 1/(2*pi);`,
  "agi-c": `for (int run = 0; run < independentRuns; ++run) {
  Vector B = stochastic_relaxation(seed + run);
  mean.add(B);
  variance.add(B);
  autocorrelation.add(trace_history());
}`,
};

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function sectionTitle(bookSlug, sectionSlug) {
  const labels = {
    "ray-tracing-weekend": "周末光线追踪 · C++路径追踪",
    "computer-graphics-4e": "计算机图形学第4版 · 独立机制课程",
    "global-illumination": "高级全局光照第二版 · 独立推导课程",
  };
  return `${labels[bookSlug]} · ${sectionSlug.replace(/^\d+-/, "")}`;
}

function sourceSection(bookSlug, profile) {
  if (bookSlug === "ray-tracing-weekend") {
    return `${profile.title}以[官方4.0.2全文](${SOURCES.rayBook})核对实现顺序、公式与调试边界，并以[官方源码仓库](${SOURCES.rayCode})交叉检查可编译接口。课程示例为独立教学重写；固定版本后不把Vulkan、GPU管线或其他书的模板倒灌进这个纯C++路径追踪器。`;
  }
  if (bookSlug === "computer-graphics-4e") {
    return `${profile.title}只用[Pearson第4版书目与22章目录](${SOURCES.cgPublisher})确定原书单元；未取得正文，因此不宣称复现作者表述。以下机制、公式与代码按图形学定义独立编写，[OpenGL 4.6 Core规范](${SOURCES.openGlSpec})与[GLSL 4.60规范](${SOURCES.glslSpec})只核对现代API事实，不替代原书历史内容。`;
  }
  return `${profile.title}以[作者官网](${SOURCES.agiSite})和[第二版104页浏览稿](${SOURCES.agiBrowse})核对书名、作者、2006版次、目录、部分图文与公式，并以[出版社书目](${SOURCES.agiPublisher})交叉确认。浏览稿不是完整正文；课程用[渲染方程原始论文](${SOURCES.renderingEquation})与[Veach论文](${SOURCES.veachThesis})核对技术事实后独立重写。`;
}

function termDefinition(term, profile) {
  const detail = profile.units.find((unit) =>
    unit.concepts.some((concept) => concept === term),
  )?.detail;
  if (detail)
    return `${term}在${profile.title}中用于${detail.focus}；应由${detail.evidence}确认，而不是只凭术语出现。`;
  const generic = {
    "ray parameter": "射线参数决定半直线上采样点与前后顺序。",
    "hit interval": "命中区间排除相机背后、过近或更远的候选根。",
    "sample estimator": "样本估计器用明确PDF和权重近似目标积分。",
    "coordinate space":
      "坐标空间声明数值当前属于模型、世界、观察、裁剪或设备阶段。",
    "raster state": "光栅状态决定覆盖、深度、混合和面剔除等离散规则。",
    "reference image": "参考图用固定输入和高质量设置提供误差比较基线。",
    radiance: "辐亮度沿无吸收直线保持，是光传输方程的基本方向量。",
    "path throughput": "路径吞吐量累计每次散射、余弦、PDF与终止补偿。",
    pdf: "概率密度必须与采样测度一致，才能正确形成蒙特卡洛权重。",
  };
  return `${term}：${generic[term] ?? `用于检查${profile.focus}的输入、状态与输出。`}`;
}

function termsFor(bookSlug, profile) {
  const additions = {
    "ray-tracing-weekend": [
      "ray parameter",
      "hit interval",
      "sample estimator",
    ],
    "computer-graphics-4e": [
      "coordinate space",
      "raster state",
      "reference image",
    ],
    "global-illumination": ["radiance", "path throughput", "pdf"],
  }[bookSlug];
  return [
    ...new Set([
      ...profile.units.flatMap((unit) => unit.concepts),
      ...additions,
    ]),
  ].slice(0, 6);
}

function wrapperSource(bookSlug, profile) {
  const config = BOOKS[bookSlug];
  const base = pascal(profile.chapterSlug);
  const nodes = profile.units.flatMap((unit) =>
    unit.concepts.map((concept) => ({
      label: concept,
      unit: unit.title,
      mechanism: unit.detail.explanation,
      probe: unit.detail.evidence,
    })),
  );
  const model = {
    focus: profile.focus,
    formula: profile.units.map((unit) => unit.detail.formula).join(" ; "),
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    sourceLabel: config.workTitle,
  };
  const exports = config.component.exports
    .map(
      ([suffix, mode]) =>
        `export function ${base}${suffix}() {\n  return <${config.component.importName} mode="${mode}" {...props} />;\n}`,
    )
    .join("\n\n");
  return `"use client";

import { ${config.component.importName}, type GraphicsConceptNode, type GraphicsExperimentModel } from "./${config.component.implementation}";

const unitTitle = ${JSON.stringify(profile.title)};
const nodes = ${JSON.stringify(nodes, null, 2)} satisfies GraphicsConceptNode[];
const model = ${JSON.stringify(model, null, 2)} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

${exports}
`;
}

function renderPage(bookSlug, profile, previous, next) {
  const config = BOOKS[bookSlug];
  const base = pascal(profile.chapterSlug);
  const imports = config.component.exports.map(
    ([suffix]) => `${base}${suffix}`,
  );
  const terms = termsFor(bookSlug, profile);
  const termLine = terms
    .map(
      (term) =>
        `<Term def=${JSON.stringify(termDefinition(term, profile))}>${term}</Term>`,
    )
    .join("、");
  const glossary = terms
    .map(
      (term) =>
        `  <GlossaryItem term=${JSON.stringify(term)}>\n    ${termDefinition(term, profile)}\n  </GlossaryItem>`,
    )
    .join("\n");
  const unitSections = profile.units
    .map(
      (unit) => `### ${unit.title}

${unit.detail.explanation}

本单元的正式坐标是${unit.concepts.join("、")}。验证${unit.title}时，先制造“${unit.detail.fault}”，再检查${unit.detail.evidence}能否把错误定位到${unit.detail.focus}的首个分叉。

$$
${unit.detail.formula}
$$`,
    )
    .join("\n\n");
  const concepts = profile.units.flatMap((unit) => unit.concepts);
  const conceptPractice = concepts
    .map(
      (concept, index) =>
        `  ${index + 1}. **${concept}**：在专属实验中选中该节点，保存输入与${profile.evidence}，注入“${profile.fault}”后恢复并重放。`,
    )
    .join("\n");
  const visuals = config.component.exports.map(
    ([suffix]) => `${base}${suffix}`,
  );
  const source = sourceSection(bookSlug, profile);
  const navigation = [
    previous
      ? `[← ${previous.title}](/learn/${bookSlug}/${previous.sectionSlug}/${previous.chapterSlug})`
      : null,
    next
      ? `[${next.title} →](/learn/${bookSlug}/${next.sectionSlug}/${next.chapterSlug})`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const snippetLanguage = "cpp";
  return `import { ${imports.join(", ")} } from "@/components/mdx/${bookSlug}/v2/${profile.chapterSlug}";
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

- 能说明${profile.title}中的“${profile.focus}”，并指出公式中每个量的空间、单位或概率含义
- 能比较正常基线与“${profile.fault}”反例，定位${profile.evidence}中的首个差异
- 能操作三个章专属实验，让${concepts.join("、")}同时具备解释、视觉和练习证据
- 能修改最小实现、固定输入重放，并判断“${profile.invariant}”是否重新成立

</Objectives>

{/* GRAPHICS_FOUNDATIONS_QUALITY_V2 */}

## 从一个会失败的图像实验开始

${profile.title}要回答的不是“这个名词是什么”，而是：${profile.question}先写下预期像素、几何或估计量，再运行基线；只要${profile.evidence}无法指出差异来自哪一步，图像看起来正确也不能通过。

本页的不变量是：${profile.invariant}。反例“${profile.fault}”只改变一个条件，因而正常、故障与恢复三次运行应能用同一输入直接比较。

## 原版、版次与事实来源

${source}

## 六个检查词

${termLine}。这些词共同约束${profile.focus}，每个词都必须落到公式、交互状态或可重放输出，不能只出现在术语表。

## 原书单元与独立机制解释

${unitSections}

## 先预测，再操作三个章专属实验

<Stepper>
  <Step title="1. 概念与因果路径">
    在${profile.title}中选择任一正式坐标，沿机制链查看它的输入、状态变化和可推翻探针。

    <${visuals[0]} />

  </Step>
  <Step title="2. 单变量算法实验">
    保持${profile.focus}的其余条件不变，只切换样本、坐标、路径或故障模式，并解释结果为何改变。

    <${visuals[1]} />

  </Step>
  <Step title="3. 基线、故障、恢复与复位">
    保存${profile.title}的首个分叉，撤销“${profile.fault}”，以同输入重放后点击重置核对初值。

    <${visuals[2]} />

  </Step>
</Stepper>

## 最小可重现实验

\`\`\`${snippetLanguage}
${profile.snippet}
\`\`\`

运行${profile.title}时固定随机种子、输入几何、坐标约定和数值精度；记录编译命令或算法版本、输出摘要与失败条件。实验输出若依赖隐藏全局状态，必须先消除该依赖再比较。

<Callout type="trap" title="本页核心误区">
  ${profile.fault}。这个错误会破坏“${profile.invariant}”，应先由${profile.evidence}定位，再讨论性能或视觉风格。
</Callout>

<Callout type="trap" title="不要把别的图形API模板套进来">
  ${profile.title}只解释${profile.focus}。若原始资料讨论纯C++路径追踪、OpenGL时代图形学或光传输积分，就不能用VkBuffer、Fence与Semaphore替代相应的几何、光栅化或蒙特卡洛机制。
</Callout>

## 练习与答案

<Exercises>

**问题 1：公式与边界。** 怎样用一个数值样本证明 $${profile.units[0].detail.formula}$ 中的量没有混用空间、单位或概率密度？

<Answer>
  先写出每个量的定义域与单位，选择能手算的输入，分别计算中间量和最终结果；再只扰动一个量。若${profile.evidence}的变化方向与公式不一致，应拒绝实现而不是调整截图。
</Answer>

**问题 2：正式坐标。** ${concepts.join("、")}如何进入可操作验证？

<Answer>
${conceptPractice}
</Answer>

**问题 3：故障恢复。** 如何证明“${profile.fault}”已经真正修复？

<Answer>
  保存正常基线，注入故障并标记${profile.evidence}中的首个分叉；撤销故障后以完全相同输入重放。只有${profile.invariant}重新成立、结果可复现且实验重置回初值，修复才可交接。
</Answer>

</Exercises>

## 本章回顾

掌握${profile.title}意味着能将“${profile.focus}”写成明确公式或算法，能操作正式坐标，能制造“${profile.fault}”，还能凭${profile.evidence}恢复同输入结果，而不是把一段Vulkan生命周期模板换上本章标题。

<Glossary>
${glossary}
</Glossary>

## 阅读导航

${navigation}

<Attribution
  mode="independent-rewrite"
  sourceBasis=${JSON.stringify(config.sourceAccess)}
  workTitle=${JSON.stringify(config.workTitle)}
  adaptedUrl=${JSON.stringify(config.sourceUrl)}
/>
`;
}

function buildProfiles(bookSlug, manifest) {
  const config = BOOKS[bookSlug];
  return PAGE_SPECS[bookSlug].map((spec, index) => {
    const units = spec.unitIds.map((id) => {
      const unit = manifest.units.find((candidate) => candidate.id === id);
      if (!unit) throw new Error(`${bookSlug}缺少manifest单元：${id}`);
      const detail = UNIT_DETAILS[id];
      if (!detail) throw new Error(`${bookSlug}缺少单元机制：${id}`);
      return {
        id,
        title: unit.title,
        concepts: unit.concepts.map((alternatives) => alternatives[0]),
        detail,
      };
    });
    const [sectionSlug, chapterSlug] = spec.target.split("/");
    const title = units.map((unit) => unit.title).join(" × ");
    const focus = units.map((unit) => unit.detail.focus).join("，并");
    const fault = units.map((unit) => unit.detail.fault).join("；");
    const evidence = units.map((unit) => unit.detail.evidence).join("、");
    const invariant = units
      .map(
        (unit) =>
          `${unit.title}的输入、公式中间量、输出与恢复结果可用同一基线复算`,
      )
      .join("，且");
    return {
      bookSlug,
      old: spec.old,
      target: spec.target,
      unitIds: spec.unitIds,
      sectionSlug,
      chapterSlug,
      title,
      focus,
      fault,
      evidence,
      invariant,
      question: `在固定输入下，如何验证“${focus}”，并让一个反例可重复地推翻错误实现？`,
      snippet: SNIPPETS[spec.unitIds[0]],
      units,
      order: index + 1,
      sourceAccess: config.sourceAccess,
      sourceUrl: config.sourceUrl,
    };
  });
}

function moveAndWritePage(bookSlug, profile, previous, next) {
  const bookDir = path.join(ROOT, "content", bookSlug);
  const oldPath = path.join(bookDir, `${profile.old}.mdx`);
  const targetPath = path.join(bookDir, `${profile.target}.mdx`);
  if (!fs.existsSync(targetPath)) {
    if (!fs.existsSync(oldPath))
      throw new Error(`找不到待迁移页面：${oldPath} 或 ${targetPath}`);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.renameSync(oldPath, targetPath);
  }
  const data = {
    title: profile.title,
    description: `${profile.title}：${profile.focus}，以公式、章专属交互和可重放故障证据独立重写。`,
    type: "B",
    section: sectionTitle(bookSlug, profile.sectionSlug),
    order: profile.order,
    sourceUrl: BOOKS[bookSlug].sourceUrl,
    demo: true,
    math: true,
    draft: false,
    qualityVersion: 2,
    practiceMode: BOOKS[bookSlug].practiceMode,
    sourceMode: "independent-rewrite",
    ...(profile.unitIds.length === 1
      ? { officialUnitId: profile.unitIds[0] }
      : { officialUnitIds: profile.unitIds }),
  };
  fs.writeFileSync(
    targetPath,
    matter.stringify(renderPage(bookSlug, profile, previous, next), data),
  );
  return targetPath;
}

function updateManifest(bookSlug, manifest, profiles) {
  const config = BOOKS[bookSlug];
  manifest.version = 2;
  manifest.sourceAccess = config.sourceAccess;
  manifest.sourceMode = "independent-rewrite";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.sourceKind = config.sourceKind;
  manifest.sourceUrl = config.sourceUrl;
  manifest.secondarySourceUrls = config.secondarySourceUrls;
  manifest.status =
    config.sourceAccess === "full-text-primary"
      ? "verified-full-text-independent-rewrite"
      : config.sourceAccess === "authorized-sample"
        ? "verified-authorized-sample-independent-rewrite"
        : "verified-outline-independent-rewrite";
  manifest.verifiedAt = "2026-07-30";
  manifest.disclosureNote = config.sourceSummary;
  manifest.factSourcePolicy =
    "原书来源只决定可见目录与允许主张；技术事实必须由对应全文、标准或一手论文核对。每个正式单元都需具备出现、解释、专属视觉和练习四级证据。";
  manifest.factSources = config.factSources;
  for (const unit of manifest.units) {
    const profile = profiles.find((candidate) =>
      candidate.unitIds.includes(unit.id),
    );
    if (!profile) throw new Error(`${bookSlug}未映射正式单元：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceAccess = config.sourceAccess;
    unit.sourceMode = "independent-rewrite";
    unit.factSourceIds = Object.keys(config.factSources);
  }
}

function normalizeRayTracingWeekendUnits(manifest) {
  const byId = new Map(manifest.units.map((unit) => [unit.id, unit]));
  byId.set("rtw-overview", {
    id: "rtw-overview",
    title: "Overview",
    concepts: [
      ["path tracer", "路径追踪器"],
      ["implementation order", "实现顺序"],
      ["debugging baseline", "调试基线"],
    ],
  });
  byId.set("rtw-camera-class", {
    id: "rtw-camera-class",
    title: "Moving Camera Code Into Its Own Class",
    concepts: [
      ["camera class", "相机类"],
      ["initialize", "初始化"],
      ["render", "渲染入口"],
    ],
  });
  const officialOrder = [
    "rtw-overview",
    "rtw-01",
    "rtw-02",
    "rtw-03",
    "rtw-04",
    "rtw-05",
    "rtw-camera-class",
    "rtw-06",
    "rtw-07",
    "rtw-08",
    "rtw-09",
    "rtw-10",
    "rtw-11",
    "rtw-12",
  ];
  manifest.units = officialOrder.map((id) => {
    const unit = byId.get(id);
    if (!unit) throw new Error(`ray-tracing-weekend缺少正式单元：${id}`);
    return unit;
  });
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const portableProfiles = [];
for (const [bookSlug, config] of Object.entries(BOOKS)) {
  const manifest = manifestRoot.books[bookSlug];
  if (!manifest) throw new Error(`缺少fidelity manifest：${bookSlug}`);
  if (bookSlug === "ray-tracing-weekend")
    normalizeRayTracingWeekendUnits(manifest);
  const profiles = buildProfiles(bookSlug, manifest);
  const componentDir = path.join(ROOT, "src/components/mdx", bookSlug, "v2");
  fs.mkdirSync(componentDir, { recursive: true });
  profiles.forEach((profile, index) => {
    const filePath = moveAndWritePage(
      bookSlug,
      profile,
      profiles[index - 1] ?? null,
      profiles[index + 1] ?? null,
    );
    fs.writeFileSync(
      path.join(componentDir, `${profile.chapterSlug}.tsx`),
      wrapperSource(bookSlug, profile),
    );
    portableProfiles.push({
      bookSlug,
      chapterSlug: profile.chapterSlug,
      relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
      title: profile.title,
      unitIds: profile.unitIds,
      focus: profile.focus,
      sourceAccess: config.sourceAccess,
      sourceUrl: config.sourceUrl,
    });
  });
  updateManifest(bookSlug, manifest, profiles);
}

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      books: Object.keys(BOOKS),
      pages: portableProfiles.length,
      profiles: portableProfiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      books: Object.keys(BOOKS),
      pages: portableProfiles.length,
      officialUnits: Object.keys(BOOKS).reduce(
        (sum, bookSlug) => sum + manifestRoot.books[bookSlug].units.length,
        0,
      ),
      sourceModes: Object.fromEntries(
        Object.entries(BOOKS).map(([bookSlug, config]) => [
          bookSlug,
          config.sourceAccess,
        ]),
      ),
    },
    null,
    2,
  ),
);
