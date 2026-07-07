/** 复习题库 · 渲染原理与知识（unity-advanced-render-principles）。《Unity3D高级编程：主程手记》第10章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedRenderPrinciplesQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-rd-1",
    chapter: "unity-advanced-render-principles",
    level: 1,
    question: "Lambert、Phong、Blinn-Phong 三种经典光照模型的核心公式和特点是什么？",
    answer:
      "① **Lambert（漫反射）**：模拟粗糙表面的漫反射光照，只和光线方向与表面法线的夹角有关。公式：`Diffuse = LightColor * Albedo * max(0, N·L)`（N 为法线单位向量，L 为指向光源的单位向量，· 为点积）。特点：光线垂直入射时最亮，越斜越暗；背对光源处为 0；不考虑观察方向，各向同性。纯 Lambert 没有高光，背光面完全黑（通常加环境光/Ambient）。② **Phong**：在 Lambert 基础上加高光（Specular），模拟光滑表面的镜面反射。公式：`Specular = LightColor * SpecColor * pow(max(0, R·V), Shininess)`（R 为反射向量 = reflect(-L, N)，V 为视线方向，Shininess 是高光指数/光泽度，越大高光越集中越「硬」）。最终 = Ambient + Diffuse + Specular。③ **Blinn-Phong**：Phong 的改进版，用**半角向量 H**（H = normalize(L+V)，即光线与视线的中间方向）代替反射向量 R，公式：`Specular = LightColor * SpecColor * pow(max(0, N·H), Shininess*2~4)`。优点：① 计算更快（不需要 reflect）；② 高光更接近物理真实（尤其在掠射角时）；③ 当 V 或 L 为无穷远时 H 可以预计算。缺点：Shininess 系数大约要为 Phong 的 2~4 倍才能看起来相近。Blinn-Phong 是 Fixed Function 时代和早期 Shader 的工业标准，效率高、效果够用，但都是经验模型（非物理正确）。",
    tags: ["Lambert", "Phong", "Blinn-Phong", "光照模型", "漫反射", "高光", "Specular", "N·L", "半角向量"],
  },
  {
    id: "ua-rd-2",
    chapter: "unity-advanced-render-principles",
    level: 1,
    question: "Shadow Map（阴影映射）的基本原理是什么？为什么需要两张 Pass？",
    answer:
      "**Shadow Map** 是最主流的实时阴影技术，核心思想是「**从光源的视角看场景，能看到的地方就是被照亮的，看不到的就是阴影中**」。需要两次渲染：① **深度 Pass（Light Pass）**——把相机放在光源位置，沿光源方向渲染整个场景，只记录深度信息（不写颜色），得到一张**深度纹理（Shadow Map/Depth Map）**，每个像素存储从光源到最近物体的距离；② **主渲染 Pass（Camera Pass）**——正常从相机视角渲染场景，对每个片元：把它的位置变换到光源的裁剪空间/光源视角下，得到它在光源坐标系下的深度 d，与 Shadow Map 中对应位置的深度值比较——如果 d > Shadow Map 中记录的深度，说明该点到光源之间有其他物体挡住了它，即在**阴影中**；否则在光照中。**Shadow Map 本质是一张深度缓冲做的「可见性测试」**。问题和局限：① **Shadow Acne（阴影痤疮/条纹 artifact）**——深度精度不够导致同一物体自己挡自己，出现条纹状错误自阴影；② **Peter Panning（彼得潘/悬浮）**——用深度偏移解决 Acne 后阴影与物体分离，看起来漂浮；③ **分辨率有限导致阴影锯齿**——阴影边缘有像素感，需要 PCF/PCSS 软阴影过滤；④ **点光源/面光源需要额外处理**——方向光用 Orthographic 相机，点光源需要 Cubemap Shadow Map（Omnidirectional Shadow Maps），面光源需要区域阴影。Unity 中方向光阴影、聚光灯阴影、点光源阴影底层都是 Shadow Map 变体。",
    tags: ["ShadowMap", "阴影映射", "深度图", "DepthMap", "阴影Pass", "光源视角", "实时阴影"],
  },
  {
    id: "ua-rd-3",
    chapter: "unity-advanced-render-principles",
    level: 1,
    question: "什么是 Mipmap？为什么远距离观察纹理时必须使用 Mipmap？",
    answer:
      "**Mipmap**（来源于拉丁语 multum in parvo「许多东西在一个小空间里」）是预先生成的纹理多级渐远版本——原始纹理为 Level 0（100%），然后逐级缩小一半（Level 1=1/2, Level 2=1/4, ... 直到 1×1），和原始纹理打包在同一个纹理资源里。运行时根据纹理在屏幕上的覆盖率（像素与纹素的比例 ρ）自动选择合适的 Mip Level 采样。**不使用 Mipmap 的问题**：① **Aliasing（锯齿/闪烁）**——当一个纹素覆盖多个屏幕像素时（远处物体），采样频率不足，单个采样点落在不同纹素上导致颜色闪烁（摩尔纹、远处纹理闪烁、地面/栏杆在运动中闪烁）；② **Cache 不友好**——远距离采样纹理时相邻像素可能采样到纹理中不相邻的位置，GPU 纹理缓存命中率极低，带宽浪费严重。**使用 Mipmap 的好处**：① 抗锯齿——采样频率和纹理频率匹配，远处使用已预过滤的低分辨率纹理，消除闪烁；② 性能提升——低 Level 纹理更小，缓存命中率高，减少纹理带宽约 30%；③ 各向异性过滤（AF）的基础。**代价**：Mipmap 增加约 33% 的显存占用（等比级数求和 1 + 1/4 + 1/16 + ... = 4/3）。除了 UI 纹理（2D 像素精确显示）和索引/查找表纹理外，所有 3D 场景纹理必须开启 Mipmap。Mipmap 生成可以在导入设置中勾选，Unity 默认开启。",
    tags: ["Mipmap", "纹理过滤", "抗锯齿", "Aliasing", "纹理缓存", "显存", "多级渐远"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "ua-rd-4",
    chapter: "unity-advanced-render-principles",
    level: 2,
    question: "Shadow Acne 和 Peter Panning 是怎么产生的？Unity 中如何缓解？",
    answer:
      "**Shadow Acne（阴影痤疮/摩尔纹阴影）**：Shadow Map 每个像素存储有限精度的深度值（通常 16/24/32 bit），当阴影贴图分辨率不足以精确表示表面深度时，多个片元可能映射到同一个 Shadow Map 像素上——由于光源视角和相机视角不同，某些片元的深度 d 会比 Shadow Map 中存储的深度略大（浮点数精度/几何夹角导致），错误地判定为在阴影中，产生条纹/点状的错误自阴影，尤其在斜面和大阴影贴图像素覆盖区域明显。**Peter Panning（彼得潘/阴影悬浮）**：为解决 Acne，通常给 Shadow Map 的深度加一个**偏移（Bias/Depth Bias）**，判定时用 `d > shadowDepth + bias` 才认为在阴影中；但 Bias 过大时，本来应该在阴影中的点（如物体根部与地面接触处）也变成「不被挡住」，导致阴影和物体分离，物体看起来像漂浮在地面上。**缓解方案**：① **Depth Bias（常数偏移）**——沿光源方向偏移深度值，解决 Acne 但易引起 Peter Panning；② **Normal Bias（法线偏移）**——沿表面法线方向偏移顶点位置（而非沿光源方向），能在斜面处更好地消除 Acne 同时减少悬浮；③ **Cascade Shadow（级联阴影）**——把视锥体分成多层（2/4 级），近处用高分辨率 Shadow Map、远处用低分辨率，大幅减少单个像素覆盖范围，从根源减少精度问题；④ **正面剔除渲染深度**——渲染 Shadow Map 时剔除正面（Cull Front），用背面的深度来比较，这样物体自身深度偏差不会误判，但对薄物体/单面物体不适用；⑤ **PCF 过滤**——对阴影边缘做模糊（见 PCF 题），虽然不解决 Acne 但可以让错误阴影不那么明显；⑥ **Shadow Near Plane 调大**——避免近裁剪面过近浪费深度精度。工程中 Bias 和 Normal Bias 要针对场景调整，Unity 灯光组件上有这两个参数。",
    tags: ["ShadowAcne", "PeterPanning", "Bias", "NormalBias", "DepthBias", "阴影瑕疵", "级联阴影", "CullFront"],
  },
  {
    id: "ua-rd-5",
    chapter: "unity-advanced-render-principles",
    level: 2,
    question: "PCF 软阴影的原理是什么？为什么它能让阴影边缘柔和？",
    answer:
      "**PCF（Percentage-Closer Filtering，百分比渐近过滤）** 是让 Shadow Map 产生软阴影的经典技术。标准硬阴影是对阴影贴图做**一次点采样**——要么在阴影里要么不在，边缘是锯齿状的像素阶梯。PCF 的思路是：对当前片元在 Shadow Map 上的对应位置周围**采样 N 次**（如 2×2、3×3、4×4、泊松圆盘采样等），每个采样点单独做深度比较（在/不在阴影中，结果为 0 或 1），然后把 N 个结果的**平均值**作为阴影系数——平均 0.3 表示 30% 在阴影中（即半影区），0 为完全照亮，1 为完全阴影。这样阴影边缘就从硬的二值跳变变成了柔和的过渡，模拟了面光源/软阴影效果。**关键点**：PCF 是对「深度比较结果」过滤，不是对深度值过滤——如果先把深度值做平均再比较，结果是错的（错误的自阴影/漏光）。**优化**：① 泊松圆盘（Poisson Disk）采样代替规则网格，减少规则采样的条纹感；② 可变采样半径——根据接收面与阴影投射物的距离调整采样核大小，模拟接触硬化（Contact Hardening，PCSS 的思想）；③ 硬件 PCF——现代 GPU 支持双线性/双三次过滤的 Shadow Map 采样（如 HLSL 的 `SampleCmpLevelZero`/OpenGL 的 `sampler2DShadow`），一次硬件调用就能返回 4 个 texel 比较后的插值结果，性能极高。**局限**：PCF 本质是模糊阴影边缘，不是物理正确的面光源软阴影——它不能产生「接触处硬、远离处软」的真实半影宽度变化（PCSS/VSM/ESM 等进阶算法在解决这个问题）。",
    tags: ["PCF", "软阴影", "PercentageCloserFiltering", "阴影过滤", "泊松采样", "ShadowMap", "半影"],
  },
  {
    id: "ua-rd-6",
    chapter: "unity-advanced-render-principles",
    level: 2,
    question: "Linear 颜色空间和 Gamma 颜色空间的区别是什么？为什么 PBR 必须用 Linear 空间？",
    answer:
      "**Gamma 空间**：由于老式 CRT 显示器的亮度响应曲线是非线性的（输出亮度 ≈ 输入电压的 2.2 次方），为了在有限 bit 下感知均匀分布颜色，图像文件（sRGB 标准）在存储时已经做了 Gamma 编码（把线性亮度值做 1/2.2 次幂），暗部分配更多 bit。如果在这种已编码的颜色值上直接做光照/混合/插值（如 `color*0.5+color2*0.5`），数学上是在非线性空间中做线性运算，结果不正确（颜色变暗、混合错误、光照衰减不对）。**Linear 空间**：所有光照、混合、纹理采样、后处理计算都在**物理线性亮度**空间中进行，最后输出到显示器前再做 Gamma 校正（pow 2.2）。具体流程：sRGB 纹理在采样时 GPU 自动做 Gamma→Linear 转换（_SRGB 格式标记），Shader 中所有光照/混合是线性的，渲染到 FP16/ARGBHalf RT，最后 Tonemapping 后做 Linear→Gamma 写入后备缓冲。**为什么 PBR 必须 Linear**：PBR 的 BRDF 公式（如 Cook-Torrance、GGX、Fresnel）都是基于物理能量守恒和线性辐射度理论推导的——在 Gamma 空间中计算：Albedo 贴图的高光颜色不正确、Roughness 响应曲线错误、光照衰减不符合平方反比、Bloom 等后处理会导致过曝区域颜色偏移、不同分辨率/不同设备上效果不一致。直观表现：Gamma 空间中画面容易「灰蒙蒙」或「颜色脏」，Linear 空间中明暗过渡自然、颜色正确、HDR/Bloom 效果真实。Unity 中 Project Settings → Player → Color Space 设置为 Linear（需要平台支持，现代移动端 GPU 都支持，老 Android GPU 可能不支持则回退 Gamma）。",
    tags: ["Linear颜色空间", "Gamma颜色空间", "sRGB", "Gamma校正", "PBR", "线性空间", "颜色正确性"],
  },

  // ── L3 应用：工程实践 ──
  {
    id: "ua-rd-7",
    chapter: "unity-advanced-render-principles",
    level: 3,
    question: "PBR（基于物理的渲染）的核心三参数是什么？Albedo、Metallic、Roughness 分别控制什么物理含义？",
    answer:
      "PBR（Physically Based Rendering）的核心是**微表面理论**和**能量守恒**，用少数物理意义明确的参数描述材质，在所有光照环境下都能得到一致合理的结果。标准 PBR 工作流（Metallic-Roughness，即 Unity/Unreal 默认）有三/四个关键参数：① **Albedo（反照率/基础色）**——非金属表面的漫反射颜色（去除光照信息后的「本色」，如红砖的红色、草地的绿色），金属表面这里取金属的反射率颜色（如黄金偏黄、铜偏红）。注意：Albedo **不包含**阴影和AO信息，必须是「平坦光照下的颜色」，美术制作时要避免在 Albedo 里画明暗——暗部应该由 Roughness/Metallic/Normal Map 描述。取值范围 sRGB 0~255，但非金属一般在 50~240 之间（纯黑/纯白都不符合物理），金属在 180~255。② **Metallic（金属度）**——0=非金属（电介质，Diffuse 强、Specular 弱且为白色），1=金属（Diffuse 为 0，Specular 为彩色的反射率），中间值过渡。现实中金属度几乎是二值的（要么金属要么非金属），工作流中常用 0 或 1 避免半金属（磨损、混合边缘可以有渐变）。③ **Roughness（粗糙度）**——表面微面元的不规则程度，0=完全光滑（镜面，反射清晰锐利，高光集中），1=完全粗糙（漫反射均匀，无高光）。Roughness 决定了高光的大小和清晰度：低 Roughness 如镜面/湿地面有小而亮的高光，高 Roughness 如砖墙/布面有大而暗的高光。**可选参数**：Normal Map（法线扰动）、AO（环境光遮蔽，仅影响环境光不影响直接光）、Emission（自发光）、Height/Parallax Map（视差）。**能量守恒**：粗糙表面反射光发散（看起来暗），光滑表面反射光集中（看起来亮），总反射能量不超过入射能量——PBR Shader 自动保证 Roughness 高光面积和亮度的反比关系，不需要美术手动平衡 Spec Power 和 Spec Color。",
    tags: ["PBR", "Albedo", "Metallic", "Roughness", "金属度", "粗糙度", "微表面理论", "能量守恒", "BRDF"],
  },
  {
    id: "ua-rd-8",
    chapter: "unity-advanced-render-principles",
    level: 3,
    question: "后处理（Post-Processing）中 Bloom、SSAO、Tonemapping 分别实现什么效果？原理简述。",
    answer:
      "**后处理**是在场景渲染到 RenderTexture 后，对整张屏幕图像做 2D 图像处理，类似 Photoshop 滤镜。① **Bloom（泛光/辉光）**：模拟相机镜头对高亮度区域的光晕/扩散效果（人眼和相机在看强光时会有光线散射）。原理：① 提取画面中亮度超过阈值（Threshold）的像素得到高亮区域；② 对高亮图做多级下采样+高斯模糊（或 Kawase 模糊、双高斯）模拟光晕扩散；③ 把模糊结果叠加回原画面。Bloom 是 HDR 渲染的必备——HDR 中亮度 >1 的像素才泛光，能极大提升画面「质感」和「电影感」。移动端优化：用 Half Res、减少模糊次数、用 Scalable Bloom。② **SSAO（Screen-Space Ambient Occlusion，屏幕空间环境光遮蔽）**：模拟角落/缝隙/褶皱处因为光线难以到达而显得暗的全局光照效果（如墙根、褶皱、物体接触处的暗角）。原理：在屏幕空间对每个像素，沿法线半球方向采样深度缓冲，判断周围有多少像素挡住了环境光——被挡住越多越暗。不需要预先计算，动态场景也有效，但只能遮蔽环境光/Indirect Light，不能遮蔽直接光，且是屏幕空间效果（屏幕外的遮挡物不考虑）。性能开销大（需要多次深度采样），移动端用 HBAO+/GTAO 或关闭。③ **Tonemapping（色调映射）**：把 HDR 图像（亮度可以远超 1.0）映射到 LDR（显示设备 0~1 范围）的操作，类似相机曝光控制。因为 HDR 渲染中亮度值可以到 10、100 甚至更高（太阳、灯光、反射），显示器只能显示 0~1，必须压缩。常用算法：Reinhard（简单全局映射，暗部亮部均匀压）、ACES（Academy Color Encoding System，电影工业标准，对比度和色彩还原最好，S 曲线）、Neutral（Unity 默认，中性偏硬）、Uncharted 2（电影感强）。Tonemapping 决定了画面的「曝光」和「色调风格」，配合 HDR+Bloom 是现代渲染的标配。没有 Tonemapping 的 HDR 画面会过曝发白。",
    tags: ["Bloom", "SSAO", "Tonemapping", "后处理", "PostProcessing", "泛光", "环境光遮蔽", "色调映射", "HDR", "ACES"],
  },
  {
    id: "ua-rd-9",
    chapter: "unity-advanced-render-principles",
    level: 3,
    question: "LOD 和 Occlusion Culling 分别优化什么？它们有什么本质区别？",
    answer:
      "**LOD（Level of Detail，细节层次）**优化的是**单个物体的渲染精度**——根据物体距离摄像机的远近切换不同精度的模型版本：LOD0（近，最高模，完整材质）、LOD1（中，中等面数）、LOD2（远，低模）、LOD3/Culled（极远直接不渲染）。LOD 减少的是三角形数量、顶点处理量和贴图分辨率（配合 Mipmap），但远处物体即使只有 10 个三角形仍然在 Draw Call 队列中。LOD 通常需要美术制作多套模型（或自动减面生成），LOD Group 组件管理切换距离。**Occlusion Culling（遮挡剔除）**优化的是**被其他物体完全挡住的物体**——即使在视锥体内，如果被前面的不透明物体完全遮挡（如房间里的物体被墙挡住、墙后的敌人），就不提交渲染。Occlusion Culling 需要在编辑器中 Bake 场景的遮挡数据（把场景分成 Cells，记录 Cell 之间的可见性），运行时相机所在的 Cell 只能看到预先计算好的可见 Cell 中的物体，其他 Cell 中的物体直接 Culling 掉。**本质区别**：① LOD 是「物体还在渲染，只是用低配版本」；Occlusion Culling 是「物体根本不送进渲染管线」——减少 Draw Call 和三角形数更彻底；② LOD 不减少视锥内可见集，只减复杂度；Occlusion Culling 减少可见集；③ LOD 不需要预计算（可运行时用距离直接判断）；Occlusion Culling 必须预 Bake（动态物体可用 Occlusion Portal 动态开关门/窗）；④ LOD 对开放世界/大场景有效；Occlusion Culling 对室内/有大量遮挡物的场景（建筑、走廊）效果最好，空旷原野效果差（几乎没有被遮挡的物体）。两者**必须同时使用**：LOD Group 配置每类物体的细节距离，Occlusion Culling 在室内场景 Bake 遮挡数据，再配合 Frustum Culling（Unity 自动做），三者一起才能把可见物体数压到最少。",
    tags: ["LOD", "OcclusionCulling", "遮挡剔除", "细节层次", "性能优化", "FrustumCulling", "Culling"],
  },

  // ── L4 主程视角：技术决策 ──
  {
    id: "ua-rd-10",
    chapter: "unity-advanced-render-principles",
    level: 4,
    question: "你作为主程给团队制定 PBR 美术资源规范，需要对 Albedo/Metallic/Roughness/Normal/AO 贴图的制作、导入设置、材质使用做哪些硬性约束？为什么？",
    answer:
      "**PBR 美术规范（强制项）**：① **颜色空间与工作流统一**——项目统一 Linear 空间 + Metallic-Roughness 工作流（不混用 Specular-Setup 避免混乱）；所有 Albedo/Emission 贴图勾选 sRGB（Color Texture），Metallic/Roughness/Normal/AO 等数据贴图必须取消 sRGB（标记为 Linear/Data Texture），否则 GPU 自动做 Gamma→Linear 会把数据值搞错。② **Albedo 贴图禁止画光影**——Albedo 只存材质本色，暗部由 AO/Normal/Roughness 和光照产生；禁止在 Albedo 中画阴影、AO、高光；非金属基色亮度不低于 sRGB 50（#323232，物理上没有比煤炭更黑的漫反射），不高于 sRGB 240（除非自发光）；金属 Albedo 在 sRGB 180~255 之间且 Metallic=1。③ **Metallic 贴图纪律**——现实中 Metallic 几乎是 0 或 1 的二值图，禁止出现大面积 0.3~0.7 的半金属值（除了磨损边缘/混合区域）；金属区域 Albedo 必须是金属色调（黄金偏黄、铁灰白、铜偏橙红），非金属区域 Albedo 是材质色。④ **Roughness 贴图要求**——Roughness 0 表示镜面（仅金属/水/玻璃/漆面），大部分材质在 0.3~0.9 范围；不要把 Roughness 当「细节图」乱用，表面微细节应通过 Normal Map 或微观 Roughness 噪声体现；Roughness 贴图禁用纯黑/纯白大面积填充（不符合物理）。⑤ **Normal Map 规范**——法线贴图必须是**切线空间**（Tangent Space，蓝紫色为主），不使用 Object Space 法线（无法与其他法线混合、不能 Tiling）；Normal 贴图取消 sRGB，压缩格式用 BC5/BC7（PC）或 ASTC 4x4（移动端），不要用 DXT1/ETC2 压缩法线（会产生严重压缩伪影）；模型必须开启「Calculate Smooth Normals」并设置合适的 Smoothing Angle，烘焙法线用 Midpoint/Mikktspace 切线空间（和 Unity/Unreal 一致）。⑥ **AO 贴图**——AO 只影响间接光/环境光（通过 AO Map 或 Multiply 到 Albedo 但只走 GI），**禁止**在 Albedo 中画 AO；URP/HDRP 中 AO 接 Ambient Occlusion 槽位，不接 BaseColor。⑦ **分辨率与压缩**——主角/近景物体 2048²，场景道具 1024²，远景 512²；PC 用 BC7（彩色高质量）/BC5（法线）；移动端用 ASTC 6x6（平衡画质性能）；所有 3D 纹理必须开启 Mipmap（UI 除外）；Read/Write Enabled 关闭（不修改纹理数据时必须关闭，否则内存翻倍）；Generate Mip Maps 开启，Filter Mode Bilinear/Trilinear。⑧ **材质实例规范**——禁止运行时 `new Material()` 或修改 `renderer.material.color`（会克隆材质实例打断合批），用 MaterialPropertyBlock 修改单个 Renderer 的颜色/参数；共享材质通过 Material Variant 继承，不要复制材质球。⑨ **Shader 规范**——统一用 Shader Graph 或 URP Lit/Complex Lit Shader，禁止使用 Legacy Shaders（Mobile/Diffuse/Bumped Specular 等 Built-in Shader 在 SRP 下 Pink）；自定义 Shader 必须兼容 SRP Batcher（所有 Properties 放 CBUFFER_START(UnityPerMaterial)），避免 Shader Keyword 爆炸。⑩ **验收检查工具**——在 Editor 下写工具/用 Unity Validator 扫描：自动检查 Albedo 亮度范围、Metallic 值异常、法线贴图是否 sRGB 误勾、纹理压缩格式是否正确、是否有材质实例泄漏。主程要把这些规则集成到**资源导入管线（AssetPostprocessor）**——比如贴图导入时自动根据文件名后缀（`_n`/`_r`/`_m`/`_ao`）自动设置 sRGB/压缩格式/Mipmap，自动化减少人为疏漏。PBR 规范的本质是：**让所有资源在统一的物理框架内工作，任何越界参数都会导致光照异常和性能浪费。**",
    tags: ["主程决策", "PBR规范", "Albedo", "Metallic", "Roughness", "NormalMap", "sRGB", "纹理压缩", "Mipmap", "美术资源规范", "AssetPostprocessor"],
  },
];
