/** 复习题库 · 泛光 Bloom（bloom）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const bloomQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 公式 / 数值约定） ──
  {
    id: "bl-1",
    chapter: "bloom",
    level: 1,
    question: "什么是「泛光」（Bloom）？",
    answer:
      "一种后处理效果：把画面里特别亮（亮度超过阈值）的区域单独提取出来、模糊成柔和光晕、再叠加回原画面。效果是强光源和高光周围透出一圈化不开的辉光，模拟肉眼 / 相机面对强光的眩光。",
    tags: ["泛光", "定义"],
  },
  {
    id: "bl-2",
    chapter: "bloom",
    level: 1,
    question: "什么是「亮度阈值提取」？怎么算亮度？",
    answer:
      "按亮度把画面里超过阈值的像素挑出来当泛光源。算每个像素的感知亮度 `dot(color, vec3(0.2126,0.7152,0.0722))`（绿色权重最大），只有 `>阈值`（如 1.0）的才留进亮区图，其余置黑。",
    tags: ["亮度阈值提取", "定义"],
  },
  {
    id: "bl-3",
    chapter: "bloom",
    level: 1,
    question: "什么是「MRT 多渲染目标」？泛光用它输出哪两张图？",
    answer:
      "Multiple Render Targets，让一次几何渲染（一个片段着色器）同时往多个颜色附件输出不同结果，靠 `layout(location=N)` 指定。泛光用它一次输出：`location 0` 正常场景色、`location 1` 按阈值筛出的亮区色。",
    tags: ["MRT 多渲染目标", "定义"],
  },
  {
    id: "bl-4",
    chapter: "bloom",
    level: 1,
    question: "什么是「高斯模糊」？权重核长什么样？",
    answer:
      "用一个**钟形**（高斯函数形状）权重核，把每个像素替换成它和周围邻居的加权平均，中心权重最大、越往外越小，权重之和为 1（不改变整体亮暗），亮的地方被平滑铺开。",
    tags: ["高斯模糊", "定义"],
  },
  {
    id: "bl-5",
    chapter: "bloom",
    level: 1,
    question: "什么是「可分离高斯」？采样次数从多少降到多少？",
    answer:
      "把二维高斯核拆成「先做一遍水平方向的一维核、再做一遍垂直方向的一维核」两步。结果和直接用二维核完全等价，但每像素采样次数从 `N×N`（N²）降到 `N+N`（2N）。",
    tags: ["可分离高斯", "定义"],
  },
  {
    id: "bl-6",
    chapter: "bloom",
    level: 1,
    question: "什么是「乒乓帧缓冲」（ping-pong）？",
    answer:
      "准备两个帧缓冲交替充当输入和输出：第一遍从 A 读、写进 B（横向模糊），第二遍从 B 读、写回 A（纵向模糊），像打乒乓一样来回若干次。只用两个 FBO 就能把横、纵模糊反复做很多遍。",
    tags: ["乒乓帧缓冲", "定义"],
  },
  {
    id: "bl-7",
    chapter: "bloom",
    level: 1,
    question: "泛光的完整流水线是哪四步？",
    answer:
      "①几何 pass + MRT 出场景色 + 亮区色 → ②横向高斯糊亮区 → ③纵向高斯（乒乓 N 次）→ ④叠加合成 `scene + bloom` 再 tonemap + gamma 上屏。",
    tags: ["泛光", "流水线"],
  },
  {
    id: "bl-8",
    chapter: "bloom",
    level: 1,
    question: "泛光为什么必须建立在 HDR 之上？",
    answer:
      "只有颜色能真的 `>1`（浮点帧缓冲存的高动态范围值），才能凭「亮度有没有超过 1」干脆把强光源从普通表面里区分出来。若画面早被截在 `[0,1]`、满屏 1.0，就分不清「该发光的强光」和「白墙」。",
    tags: ["泛光", "HDR"],
  },
  {
    id: "bl-9",
    chapter: "bloom",
    level: 1,
    question: "几何 pass 片段着色器声明两个输出怎么写？",
    answer:
      "`layout(location = 0) out vec4 FragColor;`（场景色）、`layout(location = 1) out vec4 BrightColor;`（亮区色）。亮度 `>1.0` 才写原色到 `BrightColor`、否则写黑。",
    tags: ["MRT 多渲染目标", "代码"],
  },
  {
    id: "bl-10",
    chapter: "bloom",
    level: 1,
    question: "启用 MRT 往两个附件写，桌面和 WebGL2 各用什么 API？",
    answer:
      "桌面 `glDrawBuffers(2, attachments)`（`GL_COLOR_ATTACHMENT0/1` 数组）；WebGL2 `gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1])`（数组形式，WebGL2 核心自带、不需扩展）。",
    tags: ["MRT 多渲染目标", "API差异"],
  },
  {
    id: "bl-11",
    chapter: "bloom",
    level: 1,
    question: "可分离高斯着色器靠哪个 uniform 切横 / 纵？",
    answer:
      "靠一个 `uniform bool horizontal`：`true` 这遍只在 x 方向取邻居（横向），`false` 只在 y 方向（纵向）。同一段代码横纵复用，配合乒乓交替翻转。",
    tags: ["可分离高斯", "horizontal"],
  },
  {
    id: "bl-12",
    chapter: "bloom",
    level: 1,
    question: "乒乓循环里 amount=10 意味着什么？",
    answer:
      "模糊总遍数 10 = 5 次横 + 5 次纵交替。`horizontal` 每遍翻转、输入 / 输出 FBO 也跟着换，糊的遍数越多光晕越柔和饱满。",
    tags: ["乒乓帧缓冲", "数值"],
  },
  {
    id: "bl-13",
    chapter: "bloom",
    level: 1,
    question: "叠加合成那行怎么写？intensity 对应 demo 哪个控件？",
    answer:
      "`hdrColor += bloom * intensity;`——把糊好的光晕按强度加回原始场景色。`intensity` 对应 demo 的「泛光强度」滑块。加完仍是 HDR，末尾先 tonemap、再 gamma。",
    tags: ["叠加合成", "代码"],
  },
  {
    id: "bl-14",
    chapter: "bloom",
    level: 1,
    question: "泛光的两张颜色附件必须是什么格式？为什么不能用 RGBA8？",
    answer:
      "必须是 `RGBA16F` 浮点（承接 HDR）。用 `RGBA8` 的话亮区色一写入就被截在 1，阈值 `>1` 提取从一开始就失效，泛光出不来。",
    tags: ["MRT 多渲染目标", "格式"],
  },
  {
    id: "bl-15",
    chapter: "bloom",
    level: 1,
    question: "感知亮度权重 vec3(0.2126, 0.7152, 0.0722) 为什么绿色最大？",
    answer:
      "因为人眼对**绿色最敏感**，对人眼的感知亮度贡献最大、蓝色最小。所以加权和里绿权重 0.7152 最大、蓝 0.0722 最小，得到更符合人眼感知的亮度。",
    tags: ["亮度阈值提取", "权重"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "bl-16",
    chapter: "bloom",
    level: 2,
    question: "为什么泛光绝不能糊整个画面、必须先做亮度阈值提取？",
    answer:
      "糊整张图会让全图发虚变脏——连不该亮的墙面、地面都泛起雾。亮度阈值提取这第一刀只把强光当泛光源、暗的全黑不参与，光晕才只出现在该发光的地方。",
    tags: ["亮度阈值提取", "为什么"],
  },
  {
    id: "bl-17",
    chapter: "bloom",
    level: 2,
    question: "为什么用 MRT 一次出两张图、而不是为亮区图重渲一遍场景？",
    answer:
      "MRT 让几何 pass 的一个片段着色器同时往两个附件写（场景色 + 亮区色），一次几何渲染就拿到两张图，省去为亮区图把整个场景再渲一遍的开销。",
    tags: ["MRT 多渲染目标", "为什么"],
  },
  {
    id: "bl-18",
    chapter: "bloom",
    level: 2,
    question: "为什么二维高斯能拆成「先横后纵」两遍，结果还等价？",
    answer:
      "因为高斯函数数学上**可分离**：二维高斯核等于水平一维核和垂直一维核的外积。所以「先横一遍再纵一遍」和「直接二维核」结果完全等价，但采样从 N² 降到 2N。",
    tags: ["可分离高斯", "机制"],
  },
  {
    id: "bl-19",
    chapter: "bloom",
    level: 2,
    question: "可分离高斯为什么能大幅省采样？N 越大省得越多吗？",
    answer:
      "二维核每像素采 `N²` 个邻居（随核平方暴涨）；可分离横 + 纵每像素只采 `2N`。N=21 时 441 次 vs 42 次，省一个数量级。N 越大，N² 和 2N 差距越大、省得越多。",
    tags: ["可分离高斯", "性能"],
  },
  {
    id: "bl-20",
    chapter: "bloom",
    level: 2,
    question: "为什么要用乒乓帧缓冲、而不是每遍新建一个 FBO？",
    answer:
      "模糊要横纵交替反复糊多遍才够柔。乒乓用两个 FBO 交替当输入 / 输出，就能把横、纵模糊反复做很多遍，不必为每一遍都新建帧缓冲、省显存。",
    tags: ["乒乓帧缓冲", "为什么"],
  },
  {
    id: "bl-21",
    chapter: "bloom",
    level: 2,
    question: "高斯核权重之和为 1 有什么意义？",
    answer:
      "权重和为 1 意味着加权平均**不改变整体亮暗**，只是把亮的地方向四周平滑铺开。若权重和不为 1，模糊后整体会变亮 / 变暗。",
    tags: ["高斯模糊", "权重和"],
  },
  {
    id: "bl-22",
    chapter: "bloom",
    level: 2,
    question: "为什么阈值比的是感知亮度（luma），而不是 HDR 峰值？",
    answer:
      "因为决定「看起来多亮」的是感知亮度（绿权重大的加权和），不是某个通道的峰值。比如蓝灯峰值 6.5 但 luma 只约 3.6——按 luma 判断更符合人眼对「亮」的感知。",
    tags: ["亮度阈值提取", "机制"],
  },
  {
    id: "bl-23",
    chapter: "bloom",
    level: 2,
    question: "调高 / 调低亮度阈值，参与泛光的范围各怎么变？",
    answer:
      "调高 → 只有最亮的才发光晕（发光区域变少）；调低 → 更多区域参与泛光。但调太低会把本该暗的也糊进光晕、画面发脏。",
    tags: ["亮度阈值提取", "阈值"],
  },
  {
    id: "bl-24",
    chapter: "bloom",
    level: 2,
    question: "可分离高斯一遍只在一个轴取邻居，这「一个轴」对应什么？",
    answer:
      "横向遍只在 x 取邻居（`vec2(texel.x*i, 0.0)`）、纵向遍只在 y 取（`vec2(0.0, texel.y*i)`）。这正是「可分离」的关键——一遍只采 `2N` 个邻居（含中心），而不是 N×N 整片。",
    tags: ["可分离高斯", "机制"],
  },
  {
    id: "bl-25",
    chapter: "bloom",
    level: 2,
    question: "为什么 WebGL2 启用 MRT（drawBuffers）不需要扩展，WebGL1 却要？",
    answer:
      "`gl.drawBuffers` 在 WebGL2 是**核心自带**能力，直接传附件数组即可。WebGL1 才需要 `WEBGL_draw_buffers` 扩展——这是旧事，WebGL2 不必。",
    tags: ["MRT 多渲染目标", "WebGL2"],
  },
  {
    id: "bl-26",
    chapter: "bloom",
    level: 2,
    question: "为什么泛光合成后仍要走 HDR 那章的出口（tonemap + gamma）？",
    answer:
      "`scene + bloom` 加完后整张图还是 HDR（`>1` 的值）。所以照例先色调映射压回 `[0,1]`、再 gamma 校正编码回 sRGB 上屏——顺序反了颜色全乱，这是 HDR 那章的硬规矩。",
    tags: ["叠加合成", "HDR"],
  },
  {
    id: "bl-27",
    chapter: "bloom",
    level: 2,
    question: "夜里看路灯那圈柔光、相机拍强光溢出的光雾，和泛光是同一回事吗？",
    answer:
      "本质同源：眼睛 / 镜头面对特别强的光时，光线向四周散开、漫出来形成辉光。泛光就是在渲染里模拟这个——把超亮区糊成光晕叠回去，让强光看起来真的很亮、很刺眼。",
    tags: ["泛光", "类比"],
  },
  {
    id: "bl-28",
    chapter: "bloom",
    level: 2,
    question: "为什么只画几个生硬亮点会显得「平、假」，加了泛光才「发光」？",
    answer:
      "现实里强光周围总有辉光溢出，是「很亮」的视觉线索。只画硬亮点没有这圈辉光，画面虽亮却不刺眼、不出彩。泛光把硬亮点周围晕开柔光，灯和高光才真的「发光」。",
    tags: ["泛光", "为什么"],
  },
  {
    id: "bl-29",
    chapter: "bloom",
    level: 2,
    question: "乒乓循环里方向没交替会怎样？",
    answer:
      "若 `horizontal` 没在 true/false 间交替（或只反复糊横向），光晕只朝一个方向拖、亮点糊成一道道横条（或竖条），不是圆乎乎的光团。横纵都糊到才各向均匀。",
    tags: ["乒乓帧缓冲", "机制"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "bl-30",
    chapter: "bloom",
    level: 3,
    question:
      "为什么用两遍可分离高斯、而不是一个 2D N×N 大核糊一遍？结果一样吗？",
    answer:
      "结果**完全等价**（高斯可分离），但可分离把每像素采样从 `N²` 降到 `2N`——N=21 时 441 次降到 42 次，省一个数量级。2D 大核核越大平方级暴涨、帧率断崖式下跌。",
    tags: ["可分离高斯", "应用"],
  },
  {
    id: "bl-31",
    chapter: "bloom",
    level: 3,
    question:
      "demo 里决定「这个光点发不发光晕」的那行是什么？怎么让所有光点都泛光？",
    answer:
      "`float passes = step(uThreshold, luma(col));`——亮度 `≥ 阈值` 返回 1、否则 0，乘到光晕上控制发不发光。把**亮度阈值拖到最低**，所有光点的 luma 都过阈值、`passes` 全为 1，每个都发光晕。",
    tags: ["亮度阈值提取", "Demo"],
  },
  {
    id: "bl-32",
    chapter: "bloom",
    level: 3,
    question: "开了泛光后整个画面发糊、发灰发脏，连墙面地面都泛雾，怎么修？",
    answer:
      "跳过了亮度阈值提取、直接把整张图拿去糊。修法：必须先按亮度筛（`dot(color, 权重) > 阈值` 才留），只让超过阈值的强光当泛光源。阈值调太低也会让太多区域参与、画面变脏。",
    tags: ["亮度阈值提取", "排错"],
  },
  {
    id: "bl-33",
    chapter: "bloom",
    level: 3,
    question: "泛光对了但核一调大帧率断崖式下跌，最可能用了什么？怎么改？",
    answer:
      "用了一个 `N×N` 二维大核直接糊，每像素采 `N²` 个邻居（N=21 就 441 次 / 像素）。改用两遍**可分离高斯**：横一遍 + 纵一遍，每像素只 `2N` 次（42 次），结果与 2D 核等价、省一个数量级。",
    tags: ["可分离高斯", "排错"],
  },
  {
    id: "bl-34",
    chapter: "bloom",
    level: 3,
    question: "泛光光晕只朝一个方向拖、糊成横条，根因和修法？",
    answer:
      "乒乓循环里 `horizontal` 没在 true/false 间交替，或方向写反——只反复糊了横向、从没糊纵向。修法：每遍 `horizontal = !horizontal` 翻转，输入 / 输出 FBO 也跟着交替，横纵都糊到才是均匀的圆。",
    tags: ["乒乓帧缓冲", "排错"],
  },
  {
    id: "bl-35",
    chapter: "bloom",
    level: 3,
    question:
      "几何 pass 里写了 if(brightness>1.0) BrightColor=... 但亮区图全黑，为什么？怎么改？",
    answer:
      "颜色附件用了 `RGBA8`，强光 `6.0` 在写入那刻就被截成 `1.0`，画面里没有 `>1` 的像素，全走 else 写黑。修法：两张附件内部格式换成 `RGBA16F`（承接 HDR，WebGL2 还要 `EXT_color_buffer_float`），让 `>1` 真能存进去。",
    tags: ["MRT 多渲染目标", "排错"],
  },
  {
    id: "bl-36",
    chapter: "bloom",
    level: 3,
    question:
      "demo 里把亮度阈值往最高推，会看到什么？为什么是那盏蓝灯最后还亮？",
    answer:
      "发光的光点越来越少，推到最高（约 3.5）只剩最亮的蓝灯还泛光。因为阈值比的是感知亮度 luma——蓝灯峰值虽 6.5，luma 只约 3.6，恰好在「最后一个还亮着」的临界。",
    tags: ["亮度阈值提取", "Demo"],
  },
  {
    id: "bl-37",
    chapter: "bloom",
    level: 3,
    question:
      "给 HDR 场景加泛光、要又大又柔又流畅，下面两方案选哪个？为什么？方案 A：一遍 25×25 二维核；方案 B：MRT 出亮区 + 乒乓横纵各 5 遍可分离高斯。",
    answer:
      "选 **B**。A 错在性能：25×25 每像素采 625 个邻居，中端机卡死，且一遍难糊得又大又柔。B 对：MRT 先做阈值提取（只糊强光不脏）、可分离把采样降到 `2N`、乒乓多遍越糊越大越柔、`scene + bloom` 合成出辉光。",
    tags: ["可分离高斯", "选型"],
  },
  {
    id: "bl-38",
    chapter: "bloom",
    level: 3,
    question: "demo 里把泛光强度拖大、拖到 0，分别会怎样？",
    answer:
      "拖大：光晕越叠越浓、向外铺得越远（`hdrColor += bloom * intensity` 里 intensity 变大）。拖到 0：等于关了泛光（光晕乘没了）。",
    tags: ["叠加合成", "Demo"],
  },
  {
    id: "bl-39",
    chapter: "bloom",
    level: 3,
    question: "可分离高斯模糊着色器循环体大致怎么写（含中心 + 正负邻居）？",
    answer:
      "`vec3 result = texture(image, uv).rgb * weight[0];`（中心）然后 `for(i=1;i<5;i++){ vec2 off = horizontal ? vec2(texel.x*i,0) : vec2(0,texel.y*i); result += texture(image, uv+off).rgb*weight[i] + texture(image, uv-off).rgb*weight[i]; }`。",
    tags: ["可分离高斯", "代码"],
  },
  {
    id: "bl-40",
    chapter: "bloom",
    level: 3,
    question: "想让所有光点都泛光，把亮度阈值控件拖到哪？依据是什么？",
    answer:
      "拖到**最低**。四个光点里感知亮度（luma）最低的约 1.96，阈值降到 0.5 后所有光点的 luma 都 `≥ 0.5`、`passes` 全为 1，于是每个光点都发光晕。但调太低会把暗区也糊进来、画面发脏。",
    tags: ["亮度阈值提取", "Demo"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "bl-41",
    chapter: "bloom",
    level: 4,
    question:
      "泛光四个常见坑：糊整图、2D 大核、乒乓没交替、在 LDR 上做，根因和修法各是什么？",
    answer:
      "①糊整图发脏：没做阈值提取 → 先按亮度筛。②2D 大核卡：`N²` 采样暴涨 → 改可分离横纵。③只糊一向成横条：乒乓没交替 → 每遍翻转 horizontal + 换 FBO。④LDR 提不出亮区：`6.0` 写入就截成 1 → 用 `RGBA16F`。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "bl-42",
    chapter: "bloom",
    level: 4,
    question: "为什么说「没有 HDR 就没有泛光」？把因果讲清。",
    answer:
      "泛光第一刀是按「亮度 `>阈值`（如 1）」提取强光源。只有 HDR 浮点帧缓冲让颜色真能 `>1`，画面里才有「超过 1 的高亮区」可供阈值筛。LDR 下 `6.0` 写入就被截成 1.0、满屏 ≤1，阈值 `>1` 提取从源头失效，泛光无从谈起。",
    tags: ["综合", "HDR"],
  },
  {
    id: "bl-43",
    chapter: "bloom",
    level: 4,
    question: "泛光流水线四步分别承接 / 复用了前面哪些章的能力？",
    answer:
      "①MRT 出两图——复用帧缓冲 / 延迟着色的多附件 MRT；②③可分离高斯 + 乒乓——多遍帧缓冲渲染；亮区提取依赖 HDR 的 `>1`；④叠加后 tonemap + gamma——承接 HDR 出口顺序。整条建立在帧缓冲 + HDR 之上。",
    tags: ["综合", "承接"],
  },
  {
    id: "bl-44",
    chapter: "bloom",
    level: 4,
    question:
      "为什么「先按阈值挑亮区 → 可分离多遍糊 → 合成」是泛光的标准答案，而非 2D 大核硬糊整图？",
    answer:
      "阈值提取保证只糊强光、画面不脏；可分离把采样从 `N²` 降到 `2N`、开销低一个数量级；乒乓多遍让光晕又大又柔、还是各向均匀的圆；最后合成出辉光。2D 大核硬糊整图既慢又脏又难做大做柔——所以永远别用。",
    tags: ["综合", "标准答案"],
  },
  {
    id: "bl-45",
    chapter: "bloom",
    level: 4,
    question: "亮度阈值、可分离高斯、乒乓三者，分别决定泛光的哪个特性？",
    answer:
      "亮度阈值决定**哪些区域**发光晕（强光 vs 全图）；可分离高斯决定**性能**（采样 N²→2N）；乒乓多遍决定光晕的**大小和柔度**（糊得越多越大越柔）。三者各管一面，调泛光时对症。",
    tags: ["综合", "对照"],
  },
  {
    id: "bl-46",
    chapter: "bloom",
    level: 4,
    question: "为什么阈值太低会发脏、太高又泛不出？这是什么权衡？",
    answer:
      "太低：把本该暗的区域也算成泛光源、糊进光晕，全图发虚变脏。太高：只剩极少数最亮的发光、辉光太弱甚至没有。这是「该有多少区域参与泛光」的权衡，要按场景调到「只让真正的强光发光、又不漏掉它们」。",
    tags: ["亮度阈值提取", "综合"],
  },
  {
    id: "bl-47",
    chapter: "bloom",
    level: 4,
    question:
      "为什么 demo 里的单遍解析光晕是「近似」，真泛光是多遍？两者内核一致吗？",
    answer:
      "单 frag 做不了真乒乓多 pass，所以 demo 是「解析地给每个超阈值光点叠一圈高斯光晕」的单遍近似。但内核一致：都是「按亮度阈值挑光源 → 高斯式向四周散开 → 合成」。真泛光是 MRT 提亮 + 乒乓横纵高斯多遍 + 合成的完整多遍流程。",
    tags: ["泛光", "综合"],
  },
  {
    id: "bl-48",
    chapter: "bloom",
    level: 4,
    question: "MRT 启用 API（drawBuffers）漏了会怎样？附件格式用错又会怎样？",
    answer:
      "漏 `drawBuffers`：着色器里 `location 1` 的 `BrightColor` 写了也白写、亮区图全黑、泛光出不来。附件用 `RGBA8`：亮区色写入就被截在 1、阈值 `>1` 一开始就失效。两个坑都让亮区图废掉，但原因不同。",
    tags: ["MRT 多渲染目标", "综合"],
  },
  {
    id: "bl-49",
    chapter: "bloom",
    level: 4,
    question:
      "为什么乒乓「第一遍采亮区图、之后采另一个 pingpong 纹理」要用 first 标志？",
    answer:
      "因为第一遍模糊的输入是 MRT 出的**亮区图**（还没进 pingpong）；从第二遍起输入才是上一遍写进的另一个 pingpong 纹理。用 `first` 标志区分：first 时采 brightTexture、之后采 `pingpongTex[!horizontal]`，让乒乓正确接力。",
    tags: ["乒乓帧缓冲", "综合"],
  },
  {
    id: "bl-50",
    chapter: "bloom",
    level: 4,
    question: "把整条泛光流程讲清：从几个超亮光点到周围透出柔和辉光。",
    answer:
      "①几何 pass 用 MRT 一次出两张 `RGBA16F` 图：场景色 + 按 `亮度>阈值` 筛的亮区色。②取亮区图，用可分离高斯横一遍。③纵一遍，横纵交替靠乒乓两个 FBO 反复糊 N 次、越糊越柔。④把糊好的光晕 `scene + bloom*intensity` 加回场景，仍是 HDR，照例先 tonemap、再 gamma 上屏。于是强光点周围透出化得开的辉光。",
    tags: ["综合", "全流程"],
  },
];
