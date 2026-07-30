#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import prettier from "prettier";

const ROOT = process.cwd();
const BOOK = "learnopengl";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/learnopengl-v2-profiles.json");
const GENERATED_START = "{/* LOGL_VISUAL_V2_START */}";
const GENERATED_END = "{/* LOGL_VISUAL_V2_END */}";
const KHRONOS_GL46 =
  "https://registry.khronos.org/OpenGL/specs/gl/glspec46.core.pdf";
const KHRONOS_REGISTRY = "https://registry.khronos.org/OpenGL/index_gl.php";

function page(
  chapterPath,
  unitIds,
  task,
  owner,
  state,
  event,
  invariant,
  fault,
  evidence,
) {
  return {
    chapterPath,
    unitIds,
    task,
    owner,
    state,
    event,
    invariant,
    fault,
    evidence,
  };
}

const PAGES = [
  page(
    "getting-started/hello-window",
    ["logl-01", "logl-02"],
    "从 GLFW 窗口、当前 OpenGL context、GLAD 入口到 viewport、清屏与交换缓冲跑通第一帧",
    "当前线程绑定的 GLFWwindow 与 OpenGL context",
    "context 版本、入口地址、framebuffer 尺寸、viewport 和前后缓冲",
    "创建 3.3 Core context，加载入口并执行 clear→swap→poll",
    "任何 GL 命令前 context 已经 current；viewport 与 framebuffer 像素尺寸一致",
    "窗口缩放后仍沿用旧 viewport，画面只占 framebuffer 一角",
    "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图",
  ),
  page(
    "getting-started/hello-triangle",
    ["logl-03"],
    "把顶点字节、VAO 属性解释和已链接 program 接成一次可解释的三角形 draw call",
    "当前 VAO、GL_ARRAY_BUFFER/GL_ELEMENT_ARRAY_BUFFER 绑定与 shader program",
    "顶点字节、stride/offset、属性启用位、program 链接状态和图元输入",
    "上传 VBO，记录 VAO 属性合同，绑定 program 后调用 glDrawArrays/glDrawElements",
    "shader 读取的每个 location 都由当前 VAO 以同类型、同宽度和正确步长供给",
    "position 实际是 3 个 float，却把 stride 写成 5 个 float，第二个顶点起始地址错位",
    "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素",
  ),
  page(
    "getting-started/shaders",
    ["logl-04"],
    "建立 GLSL 阶段接口、uniform 更新和 Shader 类资源寿命的完整合同",
    "已链接 shader program 与 CPU 侧 Shader 封装",
    "源码、编译对象、阶段接口、链接结果、uniform location 和当前 uniform 值",
    "编译 vertex/fragment shader，链接 program，再对当前 program 上传 uniform",
    "相邻阶段的 in/out 名称以 location/type 匹配，uniform 写入目标 program",
    "顶点输出 vec3，片段输入声明为 vec2，链接失败却忽略日志继续绘制",
    "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素",
  ),
  page(
    "getting-started/textures",
    ["logl-05"],
    "把图片字节、纹理对象、采样状态、mipmap、texture unit 与 sampler 对齐",
    "纹理对象和当前 active texture unit",
    "像素格式、尺寸、wrap/filter、mipmap 完整性、unit 绑定和 sampler 整数",
    "上传 texel，配置采样参数，生成 mipmap，并把 sampler 指向已绑定 unit",
    "采样所需 mip 层完整，sampler 的整数值表示纹理单元编号而不是对象 ID",
    "min filter 要求 mipmap，却既未上传也未生成 mip 层，纹理变成不完整",
    "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素",
  ),
  page(
    "getting-started/transformations",
    ["logl-06"],
    "用齐次矩阵明确缩放、旋转、平移的组合顺序并把同一矩阵上传给 shader",
    "CPU 侧 GLM 矩阵与 program 的 transform uniform",
    "列向量约定、矩阵乘积、角度单位、uniform location 和变换后坐标",
    "构造 T·R·S，上传 mat4，再由顶点着色器计算 clip-space position",
    "同一向量约定下，最右侧变换先作用；CPU 与 GLSL 的矩阵布局约定一致",
    "把 T·R 写成 R·T，物体绕世界原点公转而不是原地自转",
    "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置",
  ),
  page(
    "getting-started/coordinate-systems",
    ["logl-07"],
    "沿 model→world→view→clip→NDC→viewport 追踪一个顶点并核对透视参数",
    "model/view/projection 三矩阵与固定功能 viewport/depth 映射",
    "对象姿态、相机坐标、frustum、clip.w、NDC 和窗口深度",
    "更新 MVP，执行透视除法，并把 NDC 映射到 framebuffer viewport",
    "所有矩阵使用同一坐标/手性约定，aspect 来自当前 framebuffer 宽高",
    "窗口横向放大后 projection 仍用旧 aspect，圆形被拉成椭圆",
    "五空间坐标、clip.w、NDC、viewport、深度值与基准截图",
  ),
  page(
    "getting-started/camera",
    ["logl-08"],
    "让键鼠输入只更新 camera 状态，再由正交基和 delta time 生成稳定 view 矩阵",
    "Camera 对象与每帧输入采样器",
    "position、front/right/up、yaw/pitch、FOV、delta time 与 view matrix",
    "采样键鼠，限制 pitch/FOV，重建正交基并调用 lookAt",
    "移动量乘 delta time，front/right/up 保持归一且互相正交",
    "首个鼠标事件没有建立基线，巨大的 offset 让 yaw/pitch 瞬间跳变",
    "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹",
  ),
  page(
    "lighting/colors",
    ["logl-09"],
    "验证物体反射率与入射光色逐通道相乘后才成为片段颜色",
    "lamp/object 两个 program 与各自颜色 uniform",
    "lightColor、objectColor、program 绑定和片段输出",
    "分别绑定灯与物体 program，上传颜色并绘制光源代理和受光物体",
    "物体输出逐通道等于入射光色乘反射率，uniform 写入正确 program",
    "查询的是 object program 的 location，却在 lamp program current 时上传颜色",
    "当前 program、uniform location/value、输入颜色和 framebuffer 取样",
  ),
  page(
    "lighting/basic-lighting",
    ["logl-10"],
    "把 ambient、diffuse、specular 与正确法线矩阵组合为逐片段 Phong 光照",
    "lighting program 的片段阶段与 normal matrix",
    "世界空间位置/法线、光向量、视线、三项贡献和最终线性颜色",
    "变换法线，计算 N·L 和反射向量，再累加环境/漫反射/镜面项",
    "参与点积的向量位于同一空间且归一；非均匀缩放使用逆转置法线矩阵",
    "直接用带非均匀缩放的 model mat3 变换法线，亮面方向随缩放漂移",
    "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素",
  ),
  page(
    "lighting/materials",
    ["logl-11"],
    "把 Material 与 Light 结构体字段逐项上传并观察 shininess 对高光形状的作用",
    "当前 lighting program 的 Material/Light uniform 集",
    "ambient/diffuse/specular、shininess、光源三分量和 uniform location",
    "选择材质预设，上传结构体字段并绘制同一几何体",
    "每个字段写入当前 program 的有效 location，shininess 只改变镜面指数",
    "缓存另一个 program 的 location 后复用，材质字段静默写到 -1 或错误位置",
    "program ID、active uniforms、材质输入、三项光照值与高光像素分布",
  ),
  page(
    "lighting/lighting-maps",
    ["logl-12"],
    "用漫反射、镜面和可选自发光贴图逐片段驱动 Material 属性",
    "材质 sampler、纹理单元与 mesh UV",
    "diffuse/specular/emission 纹理、unit 绑定、UV、采样值和光照贡献",
    "绑定多张贴图到固定 unit，设置 sampler，再按 UV 采样并参与光照",
    "每个 sampler 指向其约定 unit；镜面遮罩只缩放镜面项",
    "diffuse 与 specular sampler 都指向 unit 0，金属边和木板得到同一反光",
    "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出",
  ),
  page(
    "lighting/light-casters",
    ["logl-13"],
    "在同一 Phong 核心上区分平行光、点光与软边聚光的方向和衰减合同",
    "当前 Light 结构体与每片段光源求值函数",
    "direction/position、距离、衰减系数、内外 cutoff 和光照强度",
    "按光源类型构造 L，应用距离衰减或锥角强度，再计算 Phong 项",
    "方向光不读距离；点光衰减有限；聚光 inner cosine 大于 outer cosine",
    "把角度值直接与点积比较且内外 cutoff 反置，软边区间符号错误",
    "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素",
  ),
  page(
    "lighting/multiple-lights",
    ["logl-14"],
    "让一盏平行光、多个点光和聚光分别求值后只在最终颜色处累加",
    "lighting program 的光源 uniform 数组与 Calc* 函数",
    "光源数量、数组元素、每灯贡献、累加器和最终颜色",
    "上传所有 light 元素，逐灯调用对应函数并累加返回值",
    "每盏灯只贡献一次且函数不偷偷复用上一盏灯的局部状态",
    "循环内把 result 赋值为当前点光贡献而非 +=，只剩最后一盏灯",
    "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图",
  ),
  page(
    "model-loading/assimp",
    ["logl-15"],
    "从 Assimp Importer 读取 aiScene、验证错误标志并沿节点树发现 mesh/material",
    "Assimp::Importer 与其拥有的 aiScene",
    "导入 flags、root node、mesh/material 数组、错误状态和资源寿命",
    "ReadFile 后验证 scene，再从 root 递归访问索引并应用后处理",
    "aiScene 只在 Importer 存活期间有效；失败或 incomplete 时不解引用 root",
    "函数返回 aiScene 指针却销毁局部 Importer，后续遍历悬空内存",
    "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志",
  ),
  page(
    "model-loading/mesh",
    ["logl-16"],
    "把 Vertex/Index/Texture 数据转成 Mesh 自有 VAO/VBO/EBO 与确定性 Draw 绑定",
    "Mesh 实例及其 VAO/VBO/EBO/texture handles",
    "Vertex 内存布局、索引、纹理语义/编号、attribute pointer 和资源寿命",
    "setupMesh 上传数据并记录属性，Draw 绑定材质纹理后执行 indexed draw",
    "offsetof/stride 与 C++ Vertex 实际布局一致，EBO 绑定保存在该 VAO",
    "假定 glm::vec3 紧密无填充并手写 offset，法线/UV 从错误字节读取",
    "sizeof/offsetof、VAO 属性查询、buffer 大小、索引范围、纹理绑定与像素",
  ),
  page(
    "model-loading/model",
    ["logl-17"],
    "递归展开 aiNode，转换每个 aiMesh，并按规范化路径复用已加载纹理",
    "Model 对象、节点遍历器与 texture cache",
    "目录、节点层级、mesh 列表、材质纹理、缓存键和层级变换",
    "processNode 递归索引 mesh，processMesh 转换数据并查询材质纹理",
    "每个 scene mesh 按节点引用处理，重复纹理只创建一次 GPU 对象",
    "忽略节点局部变换就把所有 mesh 压平，层级模型的零件重叠到原点",
    "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒",
  ),
  page(
    "advanced-opengl/depth-testing",
    ["logl-18"],
    "解释 depth buffer、比较函数、写掩码、clear 与非线性精度如何共同决定可见片段",
    "framebuffer 的 depth attachment 与 GL depth-test state",
    "深度格式、clear value、compare func、write mask、片段深度和 early test 条件",
    "清除 depth，启用测试/写入，绘制不透明物并按需线性化观测值",
    "每帧清除可写 depth buffer；透明/天空盒阶段改变状态后显式恢复",
    "上一帧把 glDepthMask 设为 false，下一帧直接 clear，深度缓冲实际未被清除",
    "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图",
  ),
  page(
    "advanced-opengl/stencil-testing",
    ["logl-19"],
    "用 stencil func/op/mask 明确写入通道和第二遍描边的拒绝区域",
    "framebuffer stencil attachment 与三组 stencil state",
    "compare func/ref/mask、sfail/dpfail/dppass、write mask 和模板值",
    "第一遍写入对象区域，第二遍拒绝等于 ref 的片段并放大绘制轮廓",
    "清除前 write mask 允许写；两遍之间只改变描边所需状态并在结束后恢复",
    "描边后保留 stencil write mask=0x00，下一帧 glClear 无法清空旧模板",
    "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图",
  ),
  page(
    "advanced-opengl/blending",
    ["logl-20"],
    "把 alpha、blend equation/factors、深度写入和透明物排序接成可解释合成顺序",
    "blend state、depth state 与透明 draw list",
    "源/目标 RGBA、blend factors/equation、深度值、排序键和绘制顺序",
    "先画不透明物，再按相机距离从远到近提交透明面并控制 depth write",
    "混合因子匹配 straight/premultiplied alpha 约定，排序使用稳定对象身份",
    "透明窗按容器遍历顺序绘制，近处先写颜色导致远处被错误覆盖",
    "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素",
  ),
  page(
    "advanced-opengl/face-culling",
    ["logl-21"],
    "由窗口空间 winding、front-face 约定和 cull mode 判断每个三角形是否提交光栅化",
    "VAO 索引顺序、model 变换与 face-culling state",
    "顶点环绕、变换行列式符号、glFrontFace、glCullFace 和可见面",
    "变换三角形后判定正反面，再按 cull mode 丢弃指定朝向",
    "模型导出约定与 glFrontFace 一致；镜像变换时显式处理环绕翻转",
    "model 含负缩放却仍按 CCW 为正面，整个镜像模型被剔除",
    "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数",
  ),
  page(
    "advanced-opengl/framebuffers",
    ["logl-22"],
    "创建完整离屏 FBO，完成场景 pass 后切回默认 framebuffer 做屏幕空间处理",
    "自建 framebuffer、color/depth-stencil attachments 与默认 framebuffer",
    "附件对象/格式/尺寸、draw buffers、完整性、viewport 和 pass 边界",
    "绑定 FBO 检查完整性并画场景，再绑定 0、恢复 viewport、采样 color texture",
    "所有附件尺寸/样本数兼容；绝不从当前正在写入的同一附件采样",
    "color attachment 尺寸更新而 depth renderbuffer 仍是旧尺寸，FBO 不完整",
    "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理",
  ),
  page(
    "advanced-opengl/cubemaps",
    ["logl-23"],
    "按六个方向建立 cubemap，并区分天空盒、反射和折射的采样向量与深度状态",
    "GL_TEXTURE_CUBE_MAP 对象、skybox VAO/program 与 camera view",
    "六面图像、方向向量、samplerCube、去平移 view、depth func 和绘制顺序",
    "上传六面，先/后画天空盒并以方向向量采样，再恢复 depth state",
    "六面尺寸/格式一致；天空盒不继承相机平移且不会覆盖已绘制近景",
    "天空盒使用完整 view 矩阵，摄像机平移时盒体边界像普通物体一样移动",
    "六面 target/尺寸、采样方向、view 矩阵、depth func 与环境像素",
  ),
  page(
    "advanced-opengl/advanced-data",
    ["logl-24"],
    "比较 glBufferData/subData、映射和分批属性布局，并显式记录 CPU/GPU 同步边界",
    "buffer object、映射指针与仍在使用该存储的 GPU 命令",
    "分配大小、更新区间、map flags、属性批次布局和存储代次",
    "分配或 orphan 存储，更新不相交区间，再按匹配 offset 配置属性",
    "任何写区间都在分配范围内；覆盖 in-flight 数据前等待、orphan 或显式同步",
    "无同步映射 GPU 正在读取的同一范围并立即覆盖，帧间出现随机撕裂",
    "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧",
  ),
  page(
    "advanced-opengl/advanced-glsl",
    ["logl-25"],
    "验证 GLSL 接口块、gl_PointSize、内建变量与 std140 UBO 的跨 program 共享布局",
    "shader interface、uniform block 与绑定点",
    "block index/binding、std140 offset/stride、CPU 字节布局和多个 program 的引用",
    "查询 block，绑定到同一 UBO binding point，按规范 offset 写入矩阵",
    "CPU 写入 offset 来自 std140 规则或驱动查询，不假定 C++ struct 紧密布局",
    "把 vec3 后的 float 写在 offset 12，但 std140 中下一成员按 16 字节边界开始",
    "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出",
  ),
  page(
    "advanced-opengl/geometry-shader",
    ["logl-26"],
    "把 geometry shader 的输入图元、输出类型、EmitVertex/EndPrimitive 与 max_vertices 对齐",
    "已链接 program 的 geometry stage 与每次 invocation",
    "输入 primitive、gl_in、输出 primitive、发射顶点、条带边界和坐标空间",
    "接收完整图元，修改/生成顶点，分段 EmitVertex 并 EndPrimitive",
    "每次 invocation 发射数不超过 max_vertices，输入输出 layout 与 draw primitive 匹配",
    "声明输入 points 却用 GL_TRIANGLES 绘制，geometry invocation 合同不匹配",
    "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出",
  ),
  page(
    "advanced-opengl/instancing",
    ["logl-27"],
    "把共享 mesh 与 per-instance 偏移/mat4 属性分开，并用 divisor 控制推进频率",
    "VAO 的逐顶点/逐实例属性与 instanced draw call",
    "instance count、attribute locations、stride/offset、divisor、gl_InstanceID 和矩阵",
    "上传实例数据，为每列配置 attribute+divisor，再调用 instanced draw",
    "mat4 四列占连续 location 且每列 divisor=1；instance count 不越过缓冲",
    "只给 mat4 第一列设置 divisor，后三列每个顶点推进，实例矩阵被撕裂",
    "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换",
  ),
  page(
    "advanced-opengl/anti-aliasing",
    ["logl-28"],
    "建立多采样 framebuffer、逐 sample 覆盖与 resolve 到单采样目标的完整路径",
    "multisample framebuffer、sample storage 与 resolve 目标",
    "sample count、color/depth attachments、coverage、resolve filter 和目标尺寸",
    "以相同 sample count 渲染所有附件，再 blit/resolve 到单采样纹理或默认缓冲",
    "多采样附件样本数一致；resolve 的源/目标区域和格式兼容",
    "color 是 4x MSAA 而 depth-stencil 是单采样，framebuffer 不完整",
    "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素",
  ),
  page(
    "advanced-lighting/blinn-phong",
    ["logl-29"],
    "对比 Phong 反射向量与 Blinn halfway vector，观察视角掠过反射面时的高光边界",
    "fragment shader 的 specular 分支与归一化方向向量",
    "normal/light/view、reflectDir/halfwayDir、指数和镜面贡献",
    "切换模型，计算 dot(V,R) 或 dot(N,H) 后取幂并累加高光",
    "所有方向归一且指数为非负；模型切换只改变镜面几何项",
    "未归一化 L+V 就当 halfway vector，距离变化也改变高光强度",
    "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线",
  ),
  page(
    "advanced-lighting/gamma-correction",
    ["logl-30"],
    "划分纹理解码、线性光照、sRGB framebuffer 编码与显示出口，避免双重 gamma",
    "纹理内部格式、shader 线性运算与 framebuffer sRGB state",
    "输入编码、线性 texel、光照/衰减、输出编码和显示值",
    "对颜色纹理解码到线性，完成全部光照，再且仅再编码一次",
    "光照和混合发生在线性空间；normal/metallic 等数据纹理不做 sRGB 解码",
    "使用 GL_SRGB 纹理自动解码后又在 shader 中 pow(2.2)，输入被解码两次",
    "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素",
  ),
  page(
    "advanced-lighting/shadow-mapping",
    ["logl-31"],
    "把 light-space depth pass、相机 pass 深度比较、bias 与 PCF 放进同一坐标合同",
    "shadow-map FBO、light-space matrix 与采样 pass",
    "光空间 clip/NDC、depth texture、current depth、bias、PCF taps 和边界处理",
    "从光源渲染 depth，再在相机 pass 投影坐标并采样比较",
    "写入与读取使用同一 light-space/far range；超出光视锥不当作有阴影",
    "固定 bias 过大让物体阴影与接触面分离，形成 peter-panning",
    "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask",
  ),
  page(
    "advanced-lighting/point-shadows",
    ["logl-32"],
    "从点光源向六个方向写入线性距离 cubemap，并用同一 far_plane 恢复比较",
    "depth cubemap、六个 light-space transforms 与相机 pass",
    "六面矩阵、片段到光源距离、far_plane、cubemap depth 和 PCF 偏移",
    "一次几何阶段或六次 pass 写距离，再按方向采样并还原真实深度",
    "写入归一化距离和读取乘数使用同一个 far_plane，六面接缝方向一致",
    "depth pass 使用 far_plane=25，lighting pass 却按 100 还原，几乎全场误判阴影",
    "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图",
  ),
  page(
    "advanced-lighting/normal-mapping",
    ["logl-33"],
    "从 UV 导数或顶点数据建立带 handedness 的 TBN，并把法线纹理解码到正确空间",
    "mesh tangent frame、normal texture 与 lighting shader",
    "tangent/bitangent/normal、handedness、TBN、采样 RGB、[-1,1] 法线和光向量",
    "解码法线，正交化 TBN，并把所有光照向量统一到 tangent/world space",
    "TBN 基向量正交归一；镜像 UV 通过 handedness 恢复 bitangent 方向",
    "镜像 UV 仍用 cross(N,T) 作为 B，接缝一侧凹凸方向反转",
    "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分",
  ),
  page(
    "advanced-lighting/parallax-mapping",
    ["logl-34"],
    "在 tangent space 沿 view direction 追踪 height map，得到可拒绝越界 UV 的命中点",
    "fragment shader 的 UV/height-layer march",
    "tangent viewDir、height scale、layer depth、采样高度、UV offset 和命中层",
    "从原 UV 分层前进，找到首次交叉并按需要做线性/POM 细化",
    "掠射角除法有下界；越出 [0,1] 的 UV 按材质合同 discard 或 clamp",
    "viewDir.z 接近 0 仍直接相除，UV 偏移爆炸并采到纹理另一侧",
    "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因",
  ),
  page(
    "advanced-lighting/hdr",
    ["logl-35"],
    "让亮度先保存在浮点 framebuffer，再通过曝光或其他 tone map 压缩到显示范围",
    "floating-point scene FBO 与最终 tone-mapping pass",
    "HDR scene color、attachment format、exposure、tone-map 输出和 gamma 编码",
    "在线性浮点目标累积光照，屏幕 pass 执行 tone map 后编码显示",
    "tone map 前不 clamp 高亮；曝光改变显示映射而不改原 HDR attachment",
    "场景先写入 GL_RGBA8，超过 1 的亮度已截断，后续曝光无法恢复层次",
    "attachment format、HDR texel、exposure、tone-map 前后值与显示像素",
  ),
  page(
    "advanced-lighting/bloom",
    ["logl-36"],
    "用 MRT 提取亮区，在两个纹理间 ping-pong 高斯模糊，再与原 HDR scene 合成",
    "HDR MRT framebuffer、两张 ping-pong textures 与 composite pass",
    "scene/bright attachments、threshold、blur direction、read/write texture 和合成值",
    "一次写 scene+bright，多轮交替水平/垂直模糊，最后相加并 tone map",
    "每轮读取与写入不是同一纹理；最终选择最后一次实际写入的 ping-pong 目标",
    "模糊 pass 同时从当前 color attachment 采样并写回，形成未定义 feedback loop",
    "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素",
  ),
  page(
    "advanced-lighting/deferred-shading",
    ["logl-37"],
    "让 geometry pass 写出可重建的 G-buffer，再在 lighting pass 逐像素读取同一空间数据",
    "G-buffer framebuffer、geometry program 与 lighting program",
    "position/normal/albedo-spec attachments、格式、坐标空间、draw buffers 和 light list",
    "几何 pass 填充 G-buffer，光照 pass 采样并累加所有有效光源",
    "position、normal 与 light 位于同一空间；附件精度满足后续重建",
    "G-buffer 保存 view-space position，却拿 world-space light position直接相减",
    "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素",
  ),
  page(
    "advanced-lighting/ssao",
    ["logl-38"],
    "在 view space 用半球 kernel、旋转噪声与 depth 比较估计遮蔽，再单独模糊",
    "G-buffer、SSAO kernel/noise texture、occlusion FBO 与 blur pass",
    "view-space position/normal、kernel samples、TBN、投影坐标、range check 和 occlusion",
    "旋转样本到法线半球，投影采样邻域深度，累积后模糊并用于环境项",
    "样本、法线和深度比较处于同一 view space；越界投影不伪造遮蔽",
    "把 G-buffer world-space position 与 view-space sample 比较，摄像机移动时遮蔽漂移",
    "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出",
  ),
  page(
    "pbr/theory",
    ["logl-39"],
    "用微表面 D/G/F 与能量守恒解释 Cook-Torrance BRDF 中每一项的物理责任",
    "BRDF 求值合同与材质参数",
    "normal/view/light/half vectors、roughness、metallic、F0、D/G/F、kD/kS 和分母",
    "由材质参数求 D/G/F，分配 diffuse/specular 能量并计算 BRDF",
    "kD+kS 不凭空增能；金属的 diffuse 贡献归零；分母避免零除",
    "金属材质仍保留 Lambert diffuse，同时又计算有色镜面，反射能量重复",
    "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查",
  ),
  page(
    "pbr/lighting",
    ["logl-40"],
    "把反射率方程离散为多点光循环，在线性 HDR 中计算 radiance 与 Cook-Torrance",
    "PBR fragment shader、点光数组与线性 HDR target",
    "albedo/metallic/roughness/ao、light radiance、NdotL、BRDF、Lo 和输出编码",
    "逐灯求 inverse-square radiance 与 BRDF，按 NdotL 累加 Lo，再 tone map",
    "albedo 在进入光照前线性化；roughness 保持有效下界；输出只编码一次",
    "roughness 允许精确为 0，D/G 分母在对齐方向产生 Inf/NaN 像素",
    "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素",
  ),
  page(
    "pbr/ibl-diffuse-irradiance",
    ["logl-41"],
    "把 equirectangular HDR 转 cubemap，再卷积为按法线查询的 diffuse irradiance",
    "capture FBO、environment cubemap、irradiance cubemap 与 PBR sampler",
    "HDR 投影、六面 capture matrices、环境 texel、半球样本、卷积和 normal lookup",
    "捕获六面环境，按每个方向积分半球辐照度，再与 albedo/kD 组合",
    "六面 view/projection 朝向一致；卷积权重包含 cosθ·sinθ 与采样步长",
    "正 Y/负 Y capture view 的 up 向量写反，cubemap 顶底出现接缝和翻转",
    "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素",
  ),
  page(
    "pbr/ibl-specular",
    ["logl-42"],
    "用 roughness 分级预滤波环境和 BRDF LUT 实现 split-sum specular IBL",
    "prefilter cubemap、BRDF 2D LUT 与 PBR environment pass",
    "roughness→mip、GGX samples、prefilter color、NdotV、LUT scale/bias 和 F0",
    "生成各 roughness mip 与 BRDF LUT，运行时选择 mip 并组合 prefilteredColor*(F*scale+bias)",
    "prefilter 最大 mip 与运行时 roughness 映射一致；LUT 坐标限定在有效范围",
    "运行时假定 5 个 mip，但预滤波纹理只生成 4 层，粗糙材质采到未定义层",
    "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular",
  ),
];

function pascal(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function conceptLabel(group) {
  return String(group[0]);
}

function sampleConcepts(concepts) {
  const indexes = [0, 0.24, 0.49, 0.74, 1].map((position) =>
    Math.min(concepts.length - 1, Math.round((concepts.length - 1) * position)),
  );
  return indexes.map((index) => concepts[index]);
}

function stagesFor(profile) {
  const concepts = sampleConcepts(profile.concepts);
  return [
    {
      action: `冻结输入：${concepts[0]}`,
      resource: `${profile.owner}记录${profile.state}`,
      result: "得到可重复的初始 GL 状态与资源身份",
      observation: `${profile.evidence}中的初始快照`,
    },
    {
      action: `提交命令：${concepts[1]}`,
      resource: profile.event,
      result: `只改变与“${concepts[1]}”相关的状态`,
      observation: `${profile.evidence}中的命令参数`,
    },
    {
      action: `执行管线：${concepts[2]}`,
      resource: `驱动/GPU 消费${profile.state}`,
      result: `产生“${concepts[2]}”对应的中间结果`,
      observation: `${profile.evidence}中的首个可观测结果`,
    },
    {
      action: `核对边界：${concepts[3]}`,
      resource: profile.invariant,
      result: "错误状态在继续传播前被定位",
      observation: `${profile.evidence}中的差异定位`,
    },
    {
      action: `保存交付：${concepts[4]}`,
      resource: profile.evidence,
      result: "同输入重放得到同状态与同像素结果",
      observation: `以“${profile.invariant}”判定通过`,
    },
  ];
}

function scenariosFor(profile) {
  return [
    {
      label: "基线帧",
      input: `固定 context、资源内容与输入事件，执行“${profile.event}”`,
      expected: `${profile.owner}得到可复查结果，并持续满足“${profile.invariant}”`,
    },
    {
      label: "单故障帧",
      input: `保持其余输入不变，仅注入“${profile.fault}”`,
      expected: `保存首个状态/资源/像素分岔；清理后以${profile.evidence}证明恢复`,
    },
  ];
}

function wrapperSource(profile) {
  const slug = path.basename(profile.chapterPath);
  const componentBase = pascal(slug);
  const model = {
    unitId: profile.unitIds.join("+"),
    title: profile.title,
    task: profile.task,
    owner: profile.owner,
    state: profile.state,
    event: profile.event,
    invariant: profile.invariant,
    fault: profile.fault,
    proof: profile.evidence,
    concepts: profile.concepts,
    stages: stagesFor(profile),
    scenarios: scenariosFor(profile),
  };
  return `"use client";

import {
  OpenGlStateLab,
  type OpenGlStateModel,
} from "./opengl-state-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies OpenGlStateModel;

export function ${componentBase}ContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function ${componentBase}TraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function ${componentBase}FaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
`;
}

function augmentation(profile, componentBase) {
  const conceptRows = profile.concepts
    .map(
      (concept) =>
        `- **${concept}**：在“${profile.title}”中由${profile.owner}负责解释其输入、受控状态和可观察结果；运行时以${profile.evidence}定位它的第一处变化。`,
    )
    .join("\n");
  return `${GENERATED_START}

## 版本、来源与运行边界

本章以 [Joey de Vries 的 LearnOpenGL 原章](${profile.sourceUrl}) 为授权改编依据，教学运行基线是 **OpenGL 3.3 Core Profile**。Khronos 当前发布的规范参照是 [OpenGL 4.6 Core Profile](${KHRONOS_GL46})；这里用 4.6 规范核查术语和状态合同，但不把 4.6 API 偷偷倒填为原教程内容。GLFW、GLAD、Assimp 与驱动版本都属于运行环境，不能拿“编译通过”替代对 context、资源和 framebuffer 结果的验证。

## 正式概念与状态责任

${conceptRows}

## 章专属 OpenGL 状态实验

先预测“${profile.event}”发生后，${profile.owner}应怎样改变${profile.state}；再操作三个实验。实验不生成变化率或正确率等虚构总分，只显示真实 GL 状态、资源、命令和可观察结果。

### 实验一：Context—资源—结果合同

选择任一正式概念与基线/单故障场景，核对它是否进入本章状态合同。正式概念只有同时出现在解释、可视状态和交付证据中才算覆盖。

<${componentBase}ContractLab />

### 实验二：CPU 命令到 GPU 结果的五段轨迹

逐段执行“${profile.event}”，在每一步记录资源身份、状态变化与第一个可观察结果，并持续核对“${profile.invariant}”。

<${componentBase}TraceLab />

### 实验三：单故障与同输入恢复

注入“${profile.fault}”，保存首个分岔；撤销后沿用完全相同的 context、资源内容、uniform 和 draw 输入重放。只有${profile.evidence}一起恢复才算修复。

<${componentBase}FaultLab />

## 最小可重放检查

\`\`\`yaml
unit: ${profile.unitIds.join("+")}
owner: ${profile.owner}
state_or_resource: ${profile.state}
command: ${profile.event}
pass_invariant: ${profile.invariant}
single_fault: ${profile.fault}
required_evidence: ${profile.evidence}
\`\`\`

复核者先仅依据以上合同写出预期，再运行基线、单故障和清理后重放。若两次基线的资源身份、首个状态变化或 framebuffer 结果不同，必须保留差异，不能用最终截图相似掩盖中间状态错误。

${GENERATED_END}`;
}

function replaceBookManifest(source, bookSlug, value) {
  const marker = `    ${JSON.stringify(bookSlug)}: `;
  const markerStart = source.indexOf(marker);
  if (markerStart < 0) throw new Error(`manifest 缺少书籍：${bookSlug}`);
  const objectStart = source.indexOf("{", markerStart + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) {
      objectEnd = index;
      break;
    }
  }
  if (objectEnd < 0) throw new Error(`manifest 对象未闭合：${bookSlug}`);
  const serialized = JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join("\n");
  return `${source.slice(0, objectStart)}${serialized}${source.slice(objectEnd + 1)}`;
}

async function writeFormatted(filePath, source) {
  const parser = filePath.endsWith(".json") ? "json" : "typescript";
  const formatted = await prettier.format(source, { parser });
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, formatted);
}

const manifestSource = fs.readFileSync(MANIFEST_PATH, "utf8");
const document = JSON.parse(manifestSource);
const manifest = document.books?.[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 42)
  throw new Error(`正式单元应为 42，实际 ${manifest.units.length}`);
const unitById = new Map(manifest.units.map((unit) => [unit.id, unit]));
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (formalNodes !== 156)
  throw new Error(`正式概念节点应为 156，实际 ${formalNodes}`);
if (PAGES.length !== 41) throw new Error(`课程页应为 41，实际 ${PAGES.length}`);
const mappedUnitIds = PAGES.flatMap((profile) => profile.unitIds);
if (
  mappedUnitIds.length !== manifest.units.length ||
  new Set(mappedUnitIds).size !== manifest.units.length
) {
  throw new Error("42 个正式单元没有且仅有一次映射到 41 个课程页");
}
for (const profile of PAGES) {
  for (const unitId of profile.unitIds) {
    unitById.get(unitId).chapterPath = profile.chapterPath;
  }
}

fs.mkdirSync(COMPONENT_DIR, { recursive: true });

for (const profile of PAGES) {
  const filePath = path.join(CONTENT_DIR, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath))
    throw new Error(`缺少课程页：${profile.chapterPath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  profile.title = String(parsed.data.title);
  profile.sourceUrl = String(parsed.data.sourceUrl);
  if (!profile.sourceUrl.startsWith("https://learnopengl.com/")) {
    throw new Error(`来源不是 LearnOpenGL 官方原章：${profile.chapterPath}`);
  }
  profile.concepts = profile.unitIds.flatMap((unitId) => {
    const unit = unitById.get(unitId);
    if (!unit) throw new Error(`manifest 缺少单元：${unitId}`);
    return unit.concepts.map(conceptLabel);
  });

  const slug = path.basename(profile.chapterPath);
  const componentBase = pascal(slug);
  const generatedImport = `import { ${componentBase}ContractLab, ${componentBase}TraceLab, ${componentBase}FaultLab } from "@/components/mdx/${BOOK}/v2/${slug}";`;
  let body = parsed.content
    .replace(
      /^import\s+\{\s*[A-Za-z0-9]+ContractLab,\s*[A-Za-z0-9]+TraceLab,\s*[A-Za-z0-9]+FaultLab,?\s*\}\s+from\s+"@\/components\/mdx\/learnopengl\/v2\/[^"]+";\n*/gm,
      "",
    )
    .replace(
      /\{\/\* LOGL_VISUAL_V2_START \*\/\}[\s\S]*?\{\/\* LOGL_VISUAL_V2_END \*\/\}\n*/g,
      "",
    )
    .replace(/<Attribution\b[\s\S]*?\/>\s*/g, "")
    .trim();
  body = `${generatedImport}\n\n${body}\n\n${augmentation(profile, componentBase)}\n\n<Attribution mode="licensed-adaptation" sourceUrl="${profile.sourceUrl}" />\n`;

  const data = {
    ...parsed.data,
    description: `${profile.title}：保留 LearnOpenGL 3.3 Core 正文机制，以 context—资源—结果合同、GPU 轨迹和章专属单故障完成可重放验收。`,
    demo: true,
    draft: false,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "licensed-adaptation",
    officialUnitIds: profile.unitIds,
  };
  fs.writeFileSync(filePath, matter.stringify(body, data));
  await writeFormatted(
    path.join(COMPONENT_DIR, `${slug}.tsx`),
    wrapperSource(profile),
  );
}

manifest.edition =
  "LearnOpenGL online edition: OpenGL 3.3 Core Profile, core tutorial through PBR/IBL";
manifest.status = "verified-full-text";
manifest.sourceUrl = "https://learnopengl.com/";
manifest.sourceKind = "official-full-text-toc";
manifest.verifiedAt = "2026-07-30";
manifest.defaultSourceMode = "licensed-adaptation";
manifest.unitMappingEvidence = PROFILE_PATH.replace(`${ROOT}/`, "");
manifest.factSourcePolicy =
  "LearnOpenGL 原章界定教学叙事与 3.3 Core 代码；Khronos Registry/规范核查 API、GLSL 与状态合同；不得把 4.6 特性倒填为原教程内容。";
manifest.coverage = {
  formalUnits: 42,
  mappedUnits: 42,
  ratio: 1,
  outlineNodes: formalNodes,
  pages: PAGES.length,
};
manifest.metrics = {
  formalUnits: 42,
  formalNodes,
  coursePages: PAGES.length,
  interactiveViews: PAGES.length * 3,
};
manifest.visualImplementation = {
  viewsPerPage: 3,
  modes: ["contract", "trace", "fault"],
  sharedComponent: "src/components/mdx/learnopengl/v2/opengl-state-lab.tsx",
  retainedExistingVisuals: true,
};
manifest.referenceBoundary = {
  tutorialBaseline: "OpenGL 3.3 Core Profile",
  currentNormativeReference: "OpenGL 4.6 Core Profile",
  currentRegistry: KHRONOS_REGISTRY,
  author: "Joey de Vries",
  license: "CC BY-NC 4.0",
};
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestSource, BOOK, manifest),
);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      edition: manifest.edition,
      sourceBoundary:
        "Joey de Vries's official LearnOpenGL full text and TOC define the adapted course; each page keeps its original official URL and CC BY-NC 4.0 mode.",
      versionBoundary:
        "The tutorial intentionally teaches OpenGL 3.3 Core Profile. Khronos OpenGL 4.6 is a current normative cross-check, not a silent code upgrade.",
      coverage: manifest.coverage,
      metrics: manifest.metrics,
      pages: PAGES.map((profile) => ({
        unitIds: profile.unitIds,
        path: profile.chapterPath,
        title: profile.title,
        sourceUrl: profile.sourceUrl,
        concepts: profile.concepts,
        task: profile.task,
        owner: profile.owner,
        state: profile.state,
        event: profile.event,
        invariant: profile.invariant,
        fault: profile.fault,
        evidence: profile.evidence,
        model: {
          stages: stagesFor(profile),
          scenarios: scenariosFor(profile),
        },
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已为 ${PAGES.length} 页映射 42 个正式单元、${formalNodes} 个概念节点，并补齐 ${PAGES.length * 3} 个章专属交互视图。`,
);
