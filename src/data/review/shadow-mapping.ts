/** 复习题库 · 阴影映射（shadow-mapping）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const shadowMappingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "sm-1",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「阴影映射」？一句话说清它的核心直觉。",
    answer:
      "一种实时阴影技术：把一台「相机」搬到光源位置朝场景拍，**凡是光相机看不见的地方就是影子**。先从光源视角渲一张深度图记下每方向最近遮挡距离，再回相机比深度判每个片元在不在阴影里。",
    tags: ["阴影映射", "定义"],
  },
  {
    id: "sm-2",
    chapter: "shadow-mapping",
    level: 1,
    question: "阴影映射是几遍渲染？每遍做什么？",
    answer:
      "**两遍**。第一遍从光源视角渲出一张深度图（shadow map）；第二遍从相机正常渲场景、顺便拿深度图判每个片元在不在影子里。",
    tags: ["阴影映射", "两遍法"],
  },
  {
    id: "sm-3",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「shadow map」？它每个像素存的是什么？",
    answer:
      "从光源视角渲染得到的一张**深度图**（深度纹理）。每个像素不存颜色、只存一个**距离**：沿光的这个方向望过去，离光源**最近**的遮挡物有多远。",
    tags: ["shadow map", "定义"],
  },
  {
    id: "sm-4",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「光空间」？怎么把片元变进去？",
    answer:
      "把片元位置用**光源的观察矩阵 × 投影矩阵**变换后所处的坐标空间（光的裁剪空间）。在这里做透视除法、再从 `[-1,1]` 映射到 `[0,1]`，就得到片元在光眼里的深度（z）和它在深度图上的取样坐标（xy）。",
    tags: ["光空间", "定义"],
  },
  {
    id: "sm-5",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「深度比较」？比的是哪两个量？",
    answer:
      "阴影映射第二遍的核心判定：拿片元在光空间算出的**当前深度**，和深度图里同方向存的**最近遮挡距离**比大小。`current > closest` ⇒ 在阴影；`current ≤ closest` ⇒ 受光。",
    tags: ["深度比较", "定义"],
  },
  {
    id: "sm-6",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「shadow acne」？",
    answer:
      "本该干净的受光表面爬满**交替亮暗条纹**的自遮挡现象（像摩尔纹）。根因是深度图分辨率有限，一个像素覆盖地面斜斜一小片、整片只存一个最近深度，片内更远离光的半边被自己误判「在阴影」。",
    tags: ["shadow acne", "定义"],
  },
  {
    id: "sm-7",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「PCF」？全称是什么、它做什么？",
    answer:
      "Percentage-Closer Filtering，百分比邻近滤波。判阴影时不只采样一个像素，而是采样周围一圈（如 3×3 共 9 个）各做一次深度比较，把「在阴影」的比例**平均**——边缘从硬边变成一段灰色过渡，软化、抹平锯齿。",
    tags: ["PCF", "定义"],
  },
  {
    id: "sm-8",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「peter panning」？",
    answer:
      "物体的影子和物体**脚下脱了节、整片往后缩**，物体看着重新「飘」起来。成因是 depth bias 加过头，连贴地接触处本该有的影子也被判成了受光。",
    tags: ["peter panning", "定义"],
  },
  {
    id: "sm-9",
    chapter: "shadow-mapping",
    level: 1,
    question: "什么是「depth bias」？它解决什么问题？",
    answer:
      "把深度图里存的最近深度往**更远**推一点点的偏移量。它用来修 shadow acne：让本该受光的半边越不过深度比较那条线，不再被自己误判在阴影。",
    tags: ["depth bias", "定义"],
  },
  {
    id: "sm-10",
    chapter: "shadow-mapping",
    level: 1,
    question:
      "方向光的第一遍渲深度图，光的投影矩阵用正交还是透视？观察矩阵怎么算？",
    answer:
      "用**正交投影**（`glm::ortho` / `mat4.ortho`，方向光是平行光）。观察矩阵用 `lookAt(lightPos, 场景中心, up)` 让光「看向」场景中心。光空间矩阵 = 投影 × 观察。",
    tags: ["光空间矩阵", "正交"],
  },
  {
    id: "sm-11",
    chapter: "shadow-mapping",
    level: 1,
    question: "第二遍片段着色器里，透视除法和 [0,1] 映射各是哪行？",
    answer:
      "透视除法：`vec3 proj = fragPosLightSpace.xyz / fragPosLightSpace.w;`；映射到 `[0,1]`：`proj = proj * 0.5 + 0.5;`。之后才用 `proj.xy` 采样、`proj.z` 比较。",
    tags: ["光空间", "透视除法"],
  },
  {
    id: "sm-12",
    chapter: "shadow-mapping",
    level: 1,
    question: "斜面 bias 常写成什么形式？为什么带个 max？",
    answer:
      "`bias = max(0.005 * (1.0 - dot(N, L)), 0.0005);`——表面越斜（`N·L` 越小）bias 越大；`max` 保证斜面正对光时也有个**最小 bias**（如 `0.0005`），不至于完全没偏移。",
    tags: ["depth bias", "斜面"],
  },
  {
    id: "sm-13",
    chapter: "shadow-mapping",
    level: 1,
    question: "深度纹理的内部格式，桌面 OpenGL 和 WebGL2 写法有什么差异？",
    answer:
      "桌面用 `GL_DEPTH_COMPONENT`；WebGL2 要写带位数的确定尺寸格式如 `gl.DEPTH_COMPONENT24`（WebGL2 对深度纹理格式更严）。",
    tags: ["API差异", "深度纹理"],
  },
  {
    id: "sm-14",
    chapter: "shadow-mapping",
    level: 1,
    question: "第一遍渲深度的深度 FBO，挂什么附件？只渲深度桌面要做什么？",
    answer:
      "只挂一张**深度纹理**当附件、不挂颜色附件。桌面只渲深度要 `glDrawBuffer(GL_NONE)` / `glReadBuffer(GL_NONE)` 显式说明没有颜色附件；WebGL2 里只挂 `DEPTH_ATTACHMENT` 即可。",
    tags: ["深度 FBO", "API差异"],
  },
  {
    id: "sm-15",
    chapter: "shadow-mapping",
    level: 1,
    question: "PCF 取 3×3 邻域后，shadow 值要除以几？",
    answer:
      "除以 **9**（9 次深度比较取平均）。`shadow /= 9.0;` 把「在阴影」的个数变成 0~1 的比例，得到软边。",
    tags: ["PCF", "数值"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "sm-16",
    chapter: "shadow-mapping",
    level: 2,
    question: "为什么深度图只记「距离」、不记颜色就够判阴影？",
    answer:
      "判阴影只要知道「这个方向上最近的遮挡有多远」。第二遍拿片元当前深度和这个最近距离一比，就知道它前面有没有更近的东西挡着——颜色对判遮挡没用，只记距离最省。",
    tags: ["shadow map", "为什么"],
  },
  {
    id: "sm-17",
    chapter: "shadow-mapping",
    level: 2,
    question: "为什么两遍用「同一套光源矩阵」很关键？",
    answer:
      "因为第一遍渲深度图、第二遍把片元变到光空间用的是**同一套光源矩阵**，两遍坐标系才严丝合缝对得上：变换后片元的 xy 正好对应它在深度图上的像素、z 正好是它在光眼里的深度。",
    tags: ["光空间", "机制"],
  },
  {
    id: "sm-18",
    chapter: "shadow-mapping",
    level: 2,
    question: "深度比较里 current > closest 为什么意味着「在阴影」？",
    answer:
      "因为 closest 是这个方向上最近遮挡的距离。current 比它更大（更远），说明片元自己藏在最近遮挡的后面、前面有东西先挡住了光 ⇒ 它在阴影里。两者相等则它自己就是最近的 ⇒ 受光。",
    tags: ["深度比较", "机制"],
  },
  {
    id: "sm-19",
    chapter: "shadow-mapping",
    level: 2,
    question: "shadow acne 的根因是什么？为什么深度图分辨率有限会导致它？",
    answer:
      "深度图一个像素覆盖地面斜斜一小片，整片只存取样点**一个**最近深度。片内更远离光的半边其当前深度 > 那个存的深度，于是被自己误判「在阴影」，本该干净的面就爬满交替条纹。",
    tags: ["shadow acne", "机制"],
  },
  {
    id: "sm-20",
    chapter: "shadow-mapping",
    level: 2,
    question: "depth bias 为什么能修掉 shadow acne？",
    answer:
      "把存的最近深度往更远推一点点，相当于抬高判定门槛：本该受光那半边的当前深度就越不过这条线，不再 `current > stored`、不再被误判在阴影，条纹消失。",
    tags: ["depth bias", "机制"],
  },
  {
    id: "sm-21",
    chapter: "shadow-mapping",
    level: 2,
    question: "bias 为什么是把双刃剑？太小、太大各出什么毛病？",
    answer:
      "太小：修不住自遮挡，出 **shadow acne**（条纹）；太大：把贴地接触处本该有的影子也推成受光，出 **peter panning**（影子脱离）。「够用就好」的中间值才两全。",
    tags: ["depth bias", "双刃剑"],
  },
  {
    id: "sm-22",
    chapter: "shadow-mapping",
    level: 2,
    question: "斜面 bias 为什么要随 N·L 变化（表面越斜 bias 越大）？",
    answer:
      "表面越斜，一个深度图像素覆盖的地面跨度越大、片内深度差越大，自遮挡越严重，需要更大的 bias 才压得住。正对光的面跨度小、需要的 bias 小。所以 `bias = max(0.005*(1-N·L), 0.0005)` 让斜面推得多、平面推得少。",
    tags: ["depth bias", "斜面"],
  },
  {
    id: "sm-23",
    chapter: "shadow-mapping",
    level: 2,
    question: "PCF 为什么能把硬边、阶梯锯齿软化？",
    answer:
      "单像素采样是非黑即白（0 或 1）；PCF 采样 3×3 邻域各比一次、取平均，结果是 0~1 之间的灰度——边缘从「突然全黑」变成「一段灰色过渡」，硬边和锯齿就被抹平了。",
    tags: ["PCF", "机制"],
  },
  {
    id: "sm-24",
    chapter: "shadow-mapping",
    level: 2,
    question: "阴影边缘的锯齿和「阴影图分辨率」是什么关系？",
    answer:
      "分辨率越低，一个深度图像素覆盖的实际面积越大，阴影边缘量化得越粗，呈现明显**阶梯锯齿**；分辨率越高锯齿越细。所以 256 比 2048 的阴影边缘粗糙得多。",
    tags: ["分辨率", "锯齿"],
  },
  {
    id: "sm-25",
    chapter: "shadow-mapping",
    level: 2,
    question:
      "为什么 demo 里 three.js 内建 shadow map 调不出 shadow acne，却能调出 peter panning？",
    answer:
      "three 内建的 bias 偏移很稳，盲调下不容易把 bias 压到出 acne；但把 bias 往大拖很容易超过「够用」、连贴地影子也推掉，所以能亲手拖出 peter panning。acne 的成因 / 修法交给图解和误区讲。",
    tags: ["Demo", "对比"],
  },
  {
    id: "sm-26",
    chapter: "shadow-mapping",
    level: 2,
    question:
      "片元落在「光锥外」（proj.xy 越界 / proj.z > 1）为什么会整片全黑或全亮？",
    answer:
      "采样深度图时 `proj.xy` 超出 `[0,1]`，会越界取到边缘重复值或边界外的值，或 `proj.z > 1` 让深度比较全乱，于是远处或边角整片死黑 / 异常发亮，阴影只在中间正常。",
    tags: ["光锥", "越界"],
  },
  {
    id: "sm-27",
    chapter: "shadow-mapping",
    level: 2,
    question:
      "深度图采样为什么建议用 CLAMP_TO_EDGE / 边界白色，并对 proj.z>1 判受光？",
    answer:
      "为了处理光锥外的片元：用 `CLAMP_TO_EDGE` + 边界设白色（深度 1.0），并对 `proj.z > 1.0` 直接判受光（`shadow = 0`），避免越界采样取到乱值导致远处全黑或全亮。",
    tags: ["光锥", "clamp"],
  },
  {
    id: "sm-28",
    chapter: "shadow-mapping",
    level: 2,
    question: "把 shadow 值合进光照时，公式通常怎么写？阴影里还留什么？",
    answer:
      "`(ambient + (1.0 - shadow) * (diffuse + specular)) * color`。阴影里（shadow=1）只留**环境光**，漫反射和镜面被 `(1 - shadow)` 压掉；受光处（shadow=0）三项都在。",
    tags: ["深度比较", "合成"],
  },
  {
    id: "sm-29",
    chapter: "shadow-mapping",
    level: 2,
    question: "第二遍的顶点着色器除了算屏幕位置，还多做了什么？",
    answer:
      "额外把世界坐标乘一遍 `lightSpaceMatrix`、传给片段着色器当 `FragPosLightSpace`（这个片元在光空间的位置）。片段着色器靠它做透视除法、采样、深度比较。",
    tags: ["光空间", "第二遍"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "sm-30",
    chapter: "shadow-mapping",
    level: 3,
    question:
      "一个片元光空间深度比深度图存的「最近遮挡距离」大，它在阴影里吗？",
    answer:
      "在阴影里。当前深度更大说明它比最近遮挡还远、前面有东西先挡住了光 ⇒ 被挡 ⇒ 在阴影。",
    tags: ["深度比较", "应用"],
  },
  {
    id: "sm-31",
    chapter: "shadow-mapping",
    level: 3,
    question: "在 demo 里怎么复现 peter panning，再只动一个控件修掉？",
    answer:
      "把 **depth bias 拖到最大**——影子和脚下脱节、缩回去、物体像飘起来（bias 加过头把接触处影子也判受光）。修掉：只把 **depth bias 往回拖到中间**那段，影子重新贴回脚下。",
    tags: ["peter panning", "Demo"],
  },
  {
    id: "sm-32",
    chapter: "shadow-mapping",
    level: 3,
    question: "把单像素深度比较改成 PCF 3×3，代码大致怎么改？",
    answer:
      "把单次采样换成 3×3 循环：`for(x=-1..1) for(y=-1..1) { float pcfDepth = texture(shadowMap, proj.xy + vec2(x,y)*texelSize).r; shadow += currentDepth - bias > pcfDepth ? 1:0; } shadow /= 9.0;`，`texelSize = 1.0/textureSize(shadowMap, 0)`。",
    tags: ["PCF", "代码"],
  },
  {
    id: "sm-33",
    chapter: "shadow-mapping",
    level: 3,
    question: "把阴影图分辨率从 2048 切到 256，边缘会怎样变？为什么？",
    answer:
      "边缘从平滑变成粗粗的**阶梯锯齿**——分辨率低，一个深度图像素覆盖的实际面积大，边缘量化得更粗。把分辨率切回 2048 锯齿就细。",
    tags: ["分辨率", "应用"],
  },
  {
    id: "sm-34",
    chapter: "shadow-mapping",
    level: 3,
    question: "影子完全对不上物体、或整屏闪烁错位，光空间坐标可能漏了哪两步？",
    answer:
      "多半漏了**透视除法**（`fragPosLightSpace.xyz / .w`）或忘了把 `[-1,1]` 映射到 `[0,1]`（`* 0.5 + 0.5`）。修法：第二遍判定必做这两步，之后才用 `proj.xy` 采样、`proj.z` 比较。",
    tags: ["光空间", "排错"],
  },
  {
    id: "sm-35",
    chapter: "shadow-mapping",
    level: 3,
    question:
      "FBO 只挂了深度纹理就开画立方体，结果前后面穿插——是阴影的问题吗？",
    answer:
      "（这是帧缓冲章的坑，本章语境下）阴影深度 FBO 本就只挂深度、不挂颜色。若立方体自身前后面穿插，是它自己的深度测试问题，要保证渲深度时开了深度测试；阴影深度图只需深度附件即可。",
    tags: ["深度 FBO", "应用"],
  },
  {
    id: "sm-36",
    chapter: "shadow-mapping",
    level: 3,
    question: "把 demo 的 PCF 关掉，阴影边缘会怎样？开开呢？",
    answer:
      "关掉 PCF，边缘是生硬的**硬边**（还可能带阶梯锯齿）；开 PCF，采样 3×3 取平均，边缘**软化**成一段灰色过渡。",
    tags: ["PCF", "Demo"],
  },
  {
    id: "sm-37",
    chapter: "shadow-mapping",
    level: 3,
    question:
      "想用裸 WebGL2 实现方向光硬阴影，第一遍渲深度图的关键步骤有哪些？",
    answer:
      "① 建深度纹理（`gl.DEPTH_COMPONENT24`）只挂到 FBO 的 `DEPTH_ATTACHMENT`、不挂颜色附件、采样设 `CLAMP_TO_EDGE`；② 算 `lightSpaceMatrix = 正交投影 × lookAt(光→中心)`；③ 绑深度 FBO、设阴影图 viewport、清深度，用只输出 `gl_Position = lightSpaceMatrix * model * pos` 的简易着色器渲场景。",
    tags: ["独立实现", "第一遍"],
  },
  {
    id: "sm-38",
    chapter: "shadow-mapping",
    level: 3,
    question: "第二遍片段着色器判阴影的完整顺序（裸实现）是什么？",
    answer:
      "透视除法 `proj = FragPosLightSpace.xyz / .w` → `proj = proj*0.5+0.5` → `closest = texture(shadowMap, proj.xy).r` → `currentDepth = proj.z` → 加斜面 bias → `shadow = currentDepth - bias > closest ? 1 : 0`；对 `proj.z > 1.0` 直接判受光。",
    tags: ["独立实现", "第二遍"],
  },
  {
    id: "sm-39",
    chapter: "shadow-mapping",
    level: 3,
    question: "远处或光照不到的边角整片死黑，最可能哪错了？怎么修？",
    answer:
      "片元变到光空间后 `proj.xy` 超出 `[0,1]`（落在光的正交视锥外），越界采样取到乱值。修法：用 `CLAMP_TO_EDGE` + 边界白色（深度 1.0），对 `proj.z > 1.0` 直接判受光，并让光的正交视锥够大罩住整个场景。",
    tags: ["光锥", "排错"],
  },
  {
    id: "sm-40",
    chapter: "shadow-mapping",
    level: 3,
    question:
      "demo 里把 bias 拖到最大造出的「影子飘起来」，对应哪个术语？拖回中间为什么能修？",
    answer:
      "对应 **peter panning**。拖回中间：把存的最近深度只往更远推一点点（够用就好），贴地接触处的影子重新被判在阴影里、影子贴回物体脚下。",
    tags: ["peter panning", "Demo"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "sm-41",
    chapter: "shadow-mapping",
    level: 4,
    question:
      "shadow acne 和 peter panning 都和 bias 有关，它们是什么关系？怎么两全？",
    answer:
      "它们是 bias 这把双刃剑的两头：bias 太小出 acne（自遮挡条纹），太大出 peter panning（影子脱离）。两全靠取「够用就好」的中间 bias；更彻底的办法是用**正面剔除**渲深度图（只渲背面写深度），从根上同时压住两者。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "sm-42",
    chapter: "shadow-mapping",
    level: 4,
    question: "「正面剔除渲深度图」为什么能同时缓解 acne 和 panning？",
    answer:
      "渲深度图时只渲背面写深度，相当于把存的深度天然往物体内部推了一点（背面在正面后头），既给了正面足够的「让步」压住自遮挡 acne，又因为偏移来自几何本身、不至于把贴地影子整片推掉造成 panning。",
    tags: ["综合", "正面剔除"],
  },
  {
    id: "sm-43",
    chapter: "shadow-mapping",
    level: 4,
    question:
      "完整描述阴影映射两遍法：第一遍存什么、第二遍每个片元做哪两件事。",
    answer:
      "第一遍从光源视角渲深度图、只记每方向最近遮挡距离。第二遍每个片元：①用光空间矩阵把它变到光眼里（含透视除法 + 映射 `[0,1]`）；②做深度比较——`current > 深度图存的 closest` ⇒ 在阴影，乘进光照。",
    tags: ["两遍法", "综合"],
  },
  {
    id: "sm-44",
    chapter: "shadow-mapping",
    level: 4,
    question: "为什么 PCF、提高分辨率都能让边缘更好，但本质改善的是不同问题？",
    answer:
      "提高分辨率让深度图像素更细、阴影边缘的**量化阶梯**更小（治锯齿的源头）；PCF 是对边缘做**软化平均**（把硬边糊成过渡）。一个提升采样精度、一个后期软化，常配合使用：高分辨率 + PCF 既细又软。",
    tags: ["PCF", "综合"],
  },
  {
    id: "sm-45",
    chapter: "shadow-mapping",
    level: 4,
    question:
      "一个场景：影子位置全错 + 远处整片死黑 + 表面有条纹，分别是哪三个坑？各怎么修？",
    answer:
      "①位置全错：漏了透视除法或 `[0,1]` 映射，补上这两步。②远处死黑：光锥外越界采样，用 CLAMP_TO_EDGE + 边界白 + `proj.z>1` 判受光。③条纹：shadow acne，加斜面 depth bias。三个坑独立、分别修。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "sm-46",
    chapter: "shadow-mapping",
    level: 4,
    question: "为什么说「光源也是一台相机」这个比喻贯穿了整个阴影映射？",
    answer:
      "第一遍就是把相机搬到光源位置朝场景「拍」一张深度图，光相机看不见的就是影子。第二遍把片元变到「光眼里」用同一套光源矩阵——整套方法本质就是「从光的视角看一遍，谁被挡住谁在影子里」。",
    tags: ["阴影映射", "综合"],
  },
  {
    id: "sm-47",
    chapter: "shadow-mapping",
    level: 4,
    question: "深度图分辨率、PCF、bias 三者，分别主要影响阴影的哪个方面？",
    answer:
      "分辨率：边缘**锯齿粗细**（采样精度）；PCF：边缘**软硬**（软化平均）；bias：**自遮挡 acne vs 脱离 panning** 的取舍（深度判定门槛）。三者各管一头，调阴影时对症下药。",
    tags: ["综合", "对照"],
  },
  {
    id: "sm-48",
    chapter: "shadow-mapping",
    level: 4,
    question: "为什么阴影映射的两遍必须用「同一套光源矩阵」，换了会怎样？",
    answer:
      "因为第一遍把深度写进深度图、第二遍按光空间坐标去采样，两者必须落在同一坐标系才对得上。若两遍光源矩阵不一致，片元采到的就不是它自己那个方向存的深度，深度比较全错、影子满屏错位。",
    tags: ["光空间", "综合"],
  },
  {
    id: "sm-49",
    chapter: "shadow-mapping",
    level: 4,
    question: "把方向光硬阴影升级成软阴影，最小改动是改第几步、怎么改？",
    answer:
      "改第二遍片段着色器的判定那一步：把「单像素深度比较」换成 **PCF 3×3 循环取平均**（采样邻域各比一次、`shadow /= 9.0`）。其余两遍法的结构、光空间矩阵、bias 都不用动。",
    tags: ["PCF", "综合"],
  },
  {
    id: "sm-50",
    chapter: "shadow-mapping",
    level: 4,
    question:
      "为什么 demo 里 bias 太大出 peter panning 是「矫枉过正」？把因果讲清。",
    answer:
      "bias 本是为修 acne（把存的深度往远推一点、让受光半边越不过判定线）。但推得太远，连物体**贴地接触处那一圈本该有的影子**也越过了判定线、被判成受光 ⇒ 影子缺了根、与物体分离往后缩 ⇒ peter panning。所以 bias 取「够用就好」，过头反而坏事。",
    tags: ["peter panning", "综合"],
  },
];
