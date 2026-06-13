/** 复习题库 · 摄像机（camera）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const cameraQuestions: ReviewQuestion[] = [
  {
    id: "cm-1",
    chapter: "camera",
    level: 1,
    question:
      "欧拉角里 Pitch、Yaw、Roll 各控制什么？FPS/漫游相机为什么不用 Roll？",
    answer:
      "Pitch（俯仰角）管上下看（抬头低头，绕 X 轴）；Yaw（偏航角）管左右看（转头，绕 Y 轴）；Roll（滚转角）管歪头（绕 front 轴）。FPS 和漫游相机几乎不用 Roll、锁 0 就好，否则画面会天旋地转（翻滚）。",
    tags: ["欧拉角", "Pitch", "Yaw", "Roll"],
  },
  {
    id: "cm-2",
    chapter: "camera",
    level: 1,
    question:
      "可交互摄像机的三要素是哪三个？分别对应 `lookAt(eye, center, up)` 的什么？",
    answer:
      "三要素：position（站哪）、front（朝哪）、worldUp（头顶方向）。日常实现里 center = position + front，所以三者对应 `lookAt(eye, center, up)`：eye=position，center=position+front，up=worldUp。right = normalize(cross(front, worldUp))。",
    tags: ["摄像机三要素", "LookAt"],
  },
  {
    id: "cm-3",
    chapter: "camera",
    level: 2,
    question: "WASD 移动为什么要乘 delta time？",
    answer:
      "delta time 是两次渲染之间经过的真实时间（秒）。移动距离 = 速度 × deltaTime，这样不同帧率下走得一样远——30fps 和 144fps 移动同样的距离，不会因为帧率高就走得飞快。",
    tags: ["delta time", "WASD"],
  },
  {
    id: "cm-4",
    chapter: "camera",
    level: 2,
    question: "鼠标控制视角时，垂直方向的 yoffset 为什么要取反？",
    answer:
      "因为屏幕坐标 y 向下为正，而「抬头」应让 Pitch 增大。所以把 yoffset 取反（`yoffset = lastY - ypos`）再加给 Pitch，鼠标上移才对应抬头、下移对应低头，符合直觉。",
    tags: ["鼠标视角", "Pitch", "yoffset"],
  },
  {
    id: "cm-5",
    chapter: "camera",
    level: 3,
    question:
      "给定 Yaw=θ、Pitch=φ（弧度），摄像机方向向量 front 的三个分量公式是什么？",
    answer:
      "fx = cos θ · cos φ，fy = sin φ，fz = sin θ · cos φ。直觉：Yaw 决定在水平圈上指向哪；Pitch 把向量从水平面翘起来——XZ 两个分量都乘 cos φ（翘角越大水平投影越短），Y 分量直接是 sin φ。算完 front 要 normalize。",
    tags: ["方向向量", "front", "三角推导"],
  },
  {
    id: "cm-6",
    chapter: "camera",
    level: 4,
    question:
      "为什么 Pitch 要限制在 ±89°？滚轮调 FOV 时，向上滚通常是放大还是缩小 FOV？效果像什么镜头？",
    answer:
      "Pitch 限 ±89°：当 φ→90° 时 cos φ→0，front 几乎平行于 worldUp，`cross(front, worldUp)` 接近零向量，right 算不出来——视角突然翻转（万向节死锁），所以锁范围。滚轮向上通常缩小 FOV（看得更窄、像长焦）、向下放大 FOV（广角）。FOV 越大越广角、越小越长焦。",
    tags: ["Pitch", "万向节死锁", "FOV"],
  },

  // ── L1 认记 ──────────────────────────────────────────────
  {
    id: "cm-7",
    chapter: "camera",
    level: 1,
    question: "可交互摄像机里，`front` 这个向量代表什么？是不是单位向量？",
    answer:
      "front 是从摄像机位置出发、指向「看向哪里」的方向向量，约定是单位向量（长度 1）。WASD 的前进后退沿它移动，View 矩阵也靠它和 worldUp 构造。",
    tags: ["front", "方向向量"],
  },
  {
    id: "cm-8",
    chapter: "camera",
    level: 1,
    question: "本章里 View 矩阵仍然用什么函数构造？三个输入分别是什么？",
    answer:
      "仍用 `lookAt(eye, center, up)`。eye = position（站哪），center = position + front（看向哪），up = worldUp（头顶方向）。",
    tags: ["LookAt", "View 矩阵"],
  },
  {
    id: "cm-9",
    chapter: "camera",
    level: 1,
    question: "right 轴（摄像机的「右」方向）是怎么算出来的？",
    answer:
      "`right = normalize(cross(front, worldUp))`，即 front 与 worldUp 叉乘再归一化。只要 front 没完全朝天/朝地，right 就永远水平于地面。",
    tags: ["right", "叉乘"],
  },
  {
    id: "cm-10",
    chapter: "camera",
    level: 1,
    question: "WASD 四个键分别让摄像机沿哪个方向移动？",
    answer:
      "W 沿 `+front` 前进，S 沿 `-front` 后退，A 沿 `-right` 左移，D 沿 `+right` 右移。",
    tags: ["WASD", "移动"],
  },
  {
    id: "cm-11",
    chapter: "camera",
    level: 1,
    question: "delta time（deltaTime）指的是什么？单位是什么？",
    answer:
      "deltaTime 是相邻两次渲染之间经过的真实时间，单位是秒。每帧位移 = 速度 × deltaTime。",
    tags: ["delta time"],
  },
  {
    id: "cm-12",
    chapter: "camera",
    level: 1,
    question: "FOV 是什么的缩写？它在透视投影里控制什么？",
    answer:
      "FOV = Field of View，视场角，表示镜头有多「广」。数值越大看得越宽（广角），越小越「长焦」。它就是透视投影矩阵里的 fovy 参数。",
    tags: ["FOV", "透视投影"],
  },
  {
    id: "cm-13",
    chapter: "camera",
    level: 1,
    question: "鼠标移动时，水平位移 xoffset 和垂直位移 yoffset 分别改哪个角？",
    answer:
      "水平位移 xoffset 加给 Yaw（左右看），垂直位移 yoffset 减给 Pitch（上下看，注意 y 取反）。",
    tags: ["鼠标视角", "Yaw", "Pitch"],
  },
  {
    id: "cm-14",
    chapter: "camera",
    level: 1,
    question: "本章 front 三角推导用什么符号表示 Pitch 和 Yaw？用度还是弧度？",
    answer:
      "Pitch 记作 $\\phi$，Yaw 记作 $\\theta$，三角推导里都用弧度。代码里若用度，三角函数前要先 `radians()` 转弧度。",
    tags: ["符号约定", "弧度"],
  },
  {
    id: "cm-15",
    chapter: "camera",
    level: 1,
    question: "本章 LearnOpenGL 约定：Yaw = 0° 时 front 指向哪个轴？",
    answer:
      "本章约定 Yaw = 0° 时 front 指向 +X，Yaw 增大时逆时针旋转。代入公式：$\\theta=0,\\ \\phi=0$ 时 front $=(1,0,0)$。",
    tags: ["Yaw", "约定"],
  },
  {
    id: "cm-16",
    chapter: "camera",
    level: 1,
    question: "front 三角公式的 $f_y$ 分量等于什么？只跟哪个角有关？",
    answer:
      "$f_y = \\sin\\phi$，只跟 Pitch（$\\phi$）有关，跟 Yaw 无关。Pitch 越大抬头越高，$f_y$ 越大。",
    tags: ["front", "f_y", "Pitch"],
  },
  {
    id: "cm-17",
    chapter: "camera",
    level: 1,
    question:
      "教学 Demo 里没有真鼠标拖动，用什么模拟 Pitch/Yaw？光标捕获指什么？",
    answer:
      "教学 Demo 用滑块模拟 Pitch/Yaw，原理与鼠标相同。光标捕获即 Pointer Lock：把鼠标锁在画布内、隐藏光标，用 movementX/Y 驱动视角，可无限旋转不撞屏幕边缘。",
    tags: ["Demo", "光标捕获", "Pointer Lock"],
  },
  {
    id: "cm-18",
    chapter: "camera",
    level: 1,
    question: "本章约定下 Pitch 取正值表示抬头还是低头？常限制在什么范围？",
    answer: "Pitch 正值表示向上看（抬头），常限制在 ±89° 以免视角翻转。",
    tags: ["Pitch", "范围"],
  },
  {
    id: "cm-19",
    chapter: "camera",
    level: 1,
    question: "front 三角公式的 $f_x$ 和 $f_z$ 分别等于什么？",
    answer:
      "$f_x = \\cos\\theta\\cos\\phi$，$f_z = \\sin\\theta\\cos\\phi$。两个水平分量都乘了 $\\cos\\phi$。",
    tags: ["front", "f_x", "f_z"],
  },
  {
    id: "cm-20",
    chapter: "camera",
    level: 1,
    question: "Roll 是绕哪根轴的旋转？本章为什么把它锁成 0？",
    answer:
      "Roll 是绕 front 轴的旋转（像歪头）。FPS 和漫游相机锁 Roll = 0，否则画面会翻滚（天旋地转）。",
    tags: ["Roll", "欧拉角"],
  },
  {
    id: "cm-21",
    chapter: "camera",
    level: 1,
    question: "用 LookAt 时 center 通常怎么由 position 和 front 得到？",
    answer:
      "`center = position + front`。即「看向哪里」= 站的位置往朝向方向走一步，所以三要素能直接喂进 `lookAt(eye, center, up)`。",
    tags: ["center", "LookAt"],
  },
  {
    id: "cm-22",
    chapter: "camera",
    level: 1,
    question:
      "滚轮缩放调的是 FOV，这跟把摄像机往前推（改 position）是一回事吗？",
    answer:
      "不是一回事。滚轮调 FOV 改变的是透视投影的张角（换镜头焦距）；往前推改的是 position（人物理上靠近）。两者都「看得更近」，但近处物体的透视变形不同。",
    tags: ["FOV", "position"],
  },

  // ── L2 理解 ──────────────────────────────────────────────
  {
    id: "cm-23",
    chapter: "camera",
    level: 2,
    question: "为什么 front 的 XZ 两个分量都要乘 $\\cos\\phi$，而 Y 分量不乘？",
    answer:
      "Pitch 把向量从水平面翘起来：翘角越大，向量在水平面 XZ 的投影越短，长度正好是 $\\cos\\phi$，所以 $f_x$、$f_z$ 都乘 $\\cos\\phi$。竖直分量 $f_y$ 是「翘起来的高度」，直接等于 $\\sin\\phi$，不需要再乘。",
    tags: ["front", "三角推导", "cos phi"],
  },
  {
    id: "cm-24",
    chapter: "camera",
    level: 2,
    question: "为什么算出 front 后还要 normalize？不归一化会怎样？",
    answer:
      "front 当成单位向量用在 WASD 位移（位移 = front × speed × dt）和 LookAt 里。三角公式理论上已是单位长度，但浮点误差或组合方向会让它略偏离 1，不归一化会让移动速度忽快忽慢、轴不正交。",
    tags: ["normalize", "front"],
  },
  {
    id: "cm-24b",
    chapter: "camera",
    level: 2,
    question:
      "为什么 right 用 `cross(front, worldUp)` 而不是 `cross(front, up)` 里某个会随 Pitch 倾斜的 up？",
    answer:
      "worldUp 是固定的世界「上」方向（如 (0,1,0)），不随相机俯仰改变。用它叉乘 front 得到的 right 永远水平于地面；若拿一个会随 Pitch 倾斜的 up 去叉乘，right 会跟着歪，左右移动就不水平了。",
    tags: ["right", "worldUp", "叉乘"],
  },
  {
    id: "cm-25",
    chapter: "camera",
    level: 2,
    question: "斜向移动（同时按 W+D）为什么要对合成方向归一化？",
    answer:
      "front 和 right 都是单位向量，直接相加得到的对角向量长度约 $\\sqrt2 \\approx 1.41$，比单按一个键快约 41%（「抄近道」）。对合成方向 normalize 再乘 speed，斜向才和直行一样快。",
    tags: ["归一化", "斜向移动"],
  },
  {
    id: "cm-26",
    chapter: "camera",
    level: 2,
    question:
      "为什么改完 Pitch/Yaw 之后必须「重算 front」，而不是直接旋转旧 front？",
    answer:
      "Pitch/Yaw 才是相机朝向的「真值」，front 是它们的派生结果。每帧（每次改角后）用最新 Pitch/Yaw 经三角公式重算 front，能避免累积误差和顺序歧义；直接旋转旧 front 会引入漂移和万向节问题。",
    tags: ["front", "重算", "Pitch", "Yaw"],
  },
  {
    id: "cm-27",
    chapter: "camera",
    level: 2,
    question: "为什么只用 Pitch + Yaw 两个角就够描述 FPS 相机的朝向？",
    answer:
      "朝向是一个单位方向向量，球面上两个角（经度 Yaw、纬度 Pitch）即可唯一确定它指向哪。Roll 只决定「绕这条视线自转」即画面是否歪头，FPS 不需要，锁 0 即可。",
    tags: ["Pitch", "Yaw", "Roll"],
  },
  {
    id: "cm-28",
    chapter: "camera",
    level: 2,
    question:
      "鼠标灵敏度 sensitivity 起什么作用？为什么不直接把像素位移加给角度？",
    answer:
      "原始位移是像素数，量级大；直接加会让视角转得飞快、难控制。乘一个较小的 sensitivity（如 0.1）把像素缩放成合适的角度增量，转动才平滑可控。",
    tags: ["鼠标视角", "sensitivity"],
  },
  {
    id: "cm-29",
    chapter: "camera",
    level: 2,
    question:
      "GLFW 用 `lastY - ypos` 取反，浏览器 Pointer Lock 下却写 `pitch -= movementY`，两者矛盾吗？",
    answer:
      "不矛盾，都是为了让鼠标上移=抬头。GLFW 是绝对坐标差、y 向下增大，取反成 `lastY - ypos`；浏览器 movementY 也是向下为正，所以从 Pitch 里减去。两种 API 都在抵消「屏幕 y 向下」与「抬头 Pitch 增大」的方向冲突。",
    tags: ["yoffset", "movementY", "Pitch"],
  },
  {
    id: "cm-30",
    chapter: "camera",
    level: 2,
    question: "滚轮向上为什么对应「缩小 FOV」？小 FOV 看起来像什么镜头？",
    answer:
      "约定滚轮向上缩小 FOV、向下放大 FOV。FOV 越小，张角越窄、视野里东西被「拉近放大」，像长焦镜头；FOV 越大越广角。代码上是 `fov -= yoffset`。",
    tags: ["FOV", "滚轮"],
  },
  {
    id: "cm-31",
    chapter: "camera",
    level: 2,
    question: "为什么 right 永远水平于地面（除非 front 朝天/朝地）？",
    answer:
      "`right = normalize(cross(front, worldUp))`，叉乘结果必同时垂直于 front 和 worldUp。只要 worldUp 是竖直的 (0,1,0)，与它垂直就意味着 right 落在水平面里，无论 front 怎么俯仰。仅当 front 几乎平行 worldUp 时叉乘退化才失效。",
    tags: ["right", "worldUp"],
  },
  {
    id: "cm-32",
    chapter: "camera",
    level: 2,
    question: "为什么本章说滑块 Demo 和真鼠标「原理相同」？",
    answer:
      "无论滑块还是鼠标，最终都是改 Pitch/Yaw 两个角，再用三角公式重算 front，View 矩阵随之更新。输入设备不同，但驱动的状态量和数学一模一样。",
    tags: ["Demo", "Pitch", "Yaw"],
  },
  {
    id: "cm-33",
    chapter: "camera",
    level: 2,
    question:
      "代入 $\\phi=0,\\ \\theta=0$ 到 front 公式得到什么？这验证了哪个约定？",
    answer:
      "$f_x=\\cos0\\cos0=1$，$f_y=\\sin0=0$，$f_z=\\sin0\\cos0=0$，即 front $=(1,0,0)$。验证了本章「Yaw 0° 时 front 指向 +X」的约定。",
    tags: ["front", "验证", "约定"],
  },
  {
    id: "cm-34",
    chapter: "camera",
    level: 2,
    question:
      "为什么把可交互摄像机比作「装上手柄和云台」的单反？三件事各对应什么参数？",
    answer:
      "身体位置 = position（WASD 走动），镜头朝哪 = front（鼠标转头），换广角/长焦 = FOV（滚轮）。手柄=移动 position，云台=旋转 front，变焦环=调 FOV。",
    tags: ["类比", "position", "front", "FOV"],
  },
  {
    id: "cm-35",
    chapter: "camera",
    level: 2,
    question: "为什么 deltaTime 让移动「帧率无关」，而写死常数位移就不行？",
    answer:
      "位移 = 速度 × deltaTime 时，帧率高 → 每帧 deltaTime 小、帧数多，单位时间内总位移不变。写死常数位移时，每帧走固定距离，帧率高就走得多、帧率低就走得少，速度随硬件变化。",
    tags: ["delta time", "帧率无关"],
  },
  {
    id: "cm-36",
    chapter: "camera",
    level: 2,
    question:
      "为什么 LookAt 让相机「坐在观察空间原点、面朝 -z」，但本章 front 却可以朝任意方向？",
    answer:
      "View 矩阵的作用是把世界变换到「相机坐在原点面朝 -z」的观察空间，这是输出坐标系约定。front 是世界空间里相机的真实朝向（输入），通过 center=position+front 喂进 LookAt 后，矩阵自动把那个朝向旋到 -z。两者不冲突，一个是输入一个是结果系。",
    tags: ["LookAt", "观察空间", "front"],
  },
  {
    id: "cm-37",
    chapter: "camera",
    level: 2,
    question: "本章 front 公式与坐标系统章已推过的 LookAt 矩阵是什么分工关系？",
    answer:
      "front 公式负责「由 Pitch/Yaw 算出朝哪看」，是相机朝向的来源；LookAt 矩阵（坐标系统章已详推）负责「把 position/front/worldUp 拼成 View 矩阵」。本章只回顾 LookAt 一句，重心放在 front 推导和交互。",
    tags: ["front", "LookAt", "分工"],
  },
  {
    id: "cm-38",
    chapter: "camera",
    level: 2,
    question:
      "为什么说 front 公式里的 $\\cos\\theta$、$\\sin\\theta$ 决定「水平圈上指向哪」？",
    answer:
      "去掉 Pitch（令 $\\phi=0$）时 front $=(\\cos\\theta,0,\\sin\\theta)$，水平分量由 $\\cos\\theta$ 和 $\\sin\\theta$ 给出，这是 XZ 平面单位圆上的点，$\\theta$ 即圆上的角度——纯粹决定水平朝向。加上 Pitch 只是把这个水平向量整体翘起来。",
    tags: ["Yaw", "三角推导", "水平圈"],
  },

  // ── L3 应用（手算 front / 读代码）──────────────────────────
  {
    id: "cm-39",
    chapter: "camera",
    level: 3,
    question: "Pitch = 0°、Yaw = 90° 时，front 向量的三个分量是多少？",
    answer:
      "$\\phi=0,\\ \\theta=90°$：$f_x=\\cos90°\\cos0=0$，$f_y=\\sin0=0$，$f_z=\\sin90°\\cos0=1$。front $=(0,0,1)$，指向 +Z。",
    tags: ["手算", "front"],
  },
  {
    id: "cm-40",
    chapter: "camera",
    level: 3,
    question:
      "Pitch = 90°、Yaw 任意时，front 大约是多少？为什么这正好是被禁止的位置？",
    answer:
      "$f_y=\\sin90°=1$，$f_x=f_z=\\cos90°\\cdot(\\dots)=0$，front $\\approx(0,1,0)$，竖直朝天，与 worldUp 平行。此时 `cross(front, worldUp)` 为零向量、right 算不出——万向节死锁，所以 Pitch 限 ±89°。",
    tags: ["手算", "万向节死锁", "Pitch"],
  },
  {
    id: "cm-41",
    chapter: "camera",
    level: 3,
    question:
      "Pitch = 45°、Yaw = 0° 时，front 三分量是多少（用根号或三位小数）？",
    answer:
      "$\\phi=45°,\\ \\theta=0$：$f_x=\\cos0\\cos45°=\\tfrac{\\sqrt2}{2}\\approx0.707$，$f_y=\\sin45°=\\tfrac{\\sqrt2}{2}\\approx0.707$，$f_z=\\sin0\\cos45°=0$。front $\\approx(0.707,0.707,0)$，朝右上 45°。",
    tags: ["手算", "front"],
  },
  {
    id: "cm-42",
    chapter: "camera",
    level: 3,
    question: "Pitch = 30°、Yaw = 45° 时，front 三分量约是多少（三位小数）？",
    answer:
      "$f_x=\\cos45°\\cos30°=\\tfrac{\\sqrt2}{2}\\cdot\\tfrac{\\sqrt3}{2}\\approx0.612$，$f_y=\\sin30°=0.5$，$f_z=\\sin45°\\cos30°\\approx0.612$。front $\\approx(0.612,0.5,0.612)$。",
    tags: ["手算", "front"],
  },
  {
    id: "cm-43",
    chapter: "camera",
    level: 3,
    question:
      "如何不开方就论证 $f=(\\cos\\theta\\cos\\phi,\\ \\sin\\phi,\\ \\sin\\theta\\cos\\phi)$ 是单位向量？",
    answer:
      "$|f|^2 = \\cos^2\\phi(\\cos^2\\theta+\\sin^2\\theta)+\\sin^2\\phi = \\cos^2\\phi\\cdot1+\\sin^2\\phi = \\cos^2\\phi+\\sin^2\\phi = 1$。模长平方为 1，故是单位向量。",
    tags: ["手算", "单位向量"],
  },
  {
    id: "cm-44",
    chapter: "camera",
    level: 3,
    question:
      "GLFW 代码 `cameraPos += cameraSpeed * cameraFront`，其中 `cameraSpeed = 2.5f * deltaTime`。这行做了什么？按了哪个键？",
    answer:
      "这是按 W 前进：把位置沿 front 方向移动「2.5 世界单位/秒 × deltaTime」。乘 deltaTime 保证不同帧率走得一样远。",
    tags: ["读代码", "WASD", "delta time"],
  },
  {
    id: "cm-45",
    chapter: "camera",
    level: 3,
    question:
      "读这段：`yaw += xoffset * sensitivity; pitch += yoffset * sensitivity;`，其中 `yoffset = lastY - ypos`。鼠标上移会发生什么？",
    answer:
      "鼠标上移 → ypos 变小 → `yoffset = lastY - ypos` 为正 → pitch 增大 → 抬头。取反正是为了让上移=抬头，符合直觉。",
    tags: ["读代码", "鼠标视角", "yoffset"],
  },
  {
    id: "cm-46",
    chapter: "camera",
    level: 3,
    question:
      "读 scroll_callback：`fov -= (float)yoffset; if(fov<1)fov=1; if(fov>45)fov=45;`。向上滚（yoffset>0）后 fov 怎么变？范围被限在哪？",
    answer:
      "向上滚 yoffset 为正，`fov -= yoffset` 使 fov 减小（缩小视角=放大画面，像长焦）。fov 被限幅在 1°~45° 之间，防止过广或过窄。",
    tags: ["读代码", "FOV", "限幅"],
  },
  {
    id: "cm-47",
    chapter: "camera",
    level: 3,
    question:
      "TS 代码 `cameraPos.addScaledVector(right, -speed)`（right = normalize(cross(front, worldUp))）对应哪个键？方向是什么？",
    answer:
      "对应 A 键左移：沿 `-right` 移动 speed 距离。right 是相机的右方向，取负即向左。",
    tags: ["读代码", "WASD", "right"],
  },
  {
    id: "cm-48",
    chapter: "camera",
    level: 3,
    question: "Pitch = -90°（朝地）时 front 约是多少？right 还算得出来吗？",
    answer:
      "$f_y=\\sin(-90°)=-1$，$f_x=f_z=\\cos(-90°)\\cdot(\\dots)=0$，front $\\approx(0,-1,0)$，竖直朝地，与 worldUp 反平行。`cross(front, worldUp)` 仍是零向量，right 算不出——同样是万向节死锁，所以下限也卡 -89°。",
    tags: ["手算", "万向节死锁", "right"],
  },
  {
    id: "cm-49",
    chapter: "camera",
    level: 3,
    question:
      "TS 代码 `mat4LookAt([], cameraPos, add(cameraPos, front), worldUp)` 三个向量参数各是什么角色？",
    answer:
      "依次是 eye=cameraPos（站哪）、center=cameraPos+front（看向哪）、up=worldUp（头顶方向）。即用三要素现算 View 矩阵。",
    tags: ["读代码", "LookAt"],
  },
  {
    id: "cm-50",
    chapter: "camera",
    level: 3,
    question:
      "TS 代码 `mat4Perspective([], (fov*Math.PI)/180, aspect, 0.1, 100)` 里第一个参数为什么要 `*Math.PI/180`？",
    answer:
      "因为 fov 以度为单位存储，而 mat4Perspective 的 fovy 参数要弧度，`*Math.PI/180` 即度转弧度（等同 GLM 里的 `glm::radians(fov)`）。",
    tags: ["读代码", "FOV", "弧度"],
  },
  {
    id: "cm-51",
    chapter: "camera",
    level: 3,
    question:
      "Pitch = 0°、Yaw = 180° 时 front 是多少？相机相对 Yaw=0° 转了多少？",
    answer:
      "$f_x=\\cos180°=-1$，$f_y=\\sin0=0$，$f_z=\\sin180°=0$，front $=(-1,0,0)$，指向 -X。相对 Yaw=0°（指 +X）正好转了 180°，朝相反方向看。",
    tags: ["手算", "front", "Yaw"],
  },
  {
    id: "cm-52",
    chapter: "camera",
    level: 3,
    question:
      "TS 代码 `fov = clamp(fov - Math.sign(e.deltaY), 1, 45)`。`Math.sign` 起什么作用？为什么这样写？",
    answer:
      "`Math.sign(e.deltaY)` 把滚轮量统一成 ±1，让每次滚动只改 ±1°，避免不同设备 deltaY 数值差异导致缩放忽快忽慢；clamp 再把 fov 限在 1°~45°。",
    tags: ["读代码", "FOV", "滚轮"],
  },
  {
    id: "cm-53",
    chapter: "camera",
    level: 3,
    question:
      "front $=(0,1,0)$、worldUp $=(0,1,0)$ 时 `cross(front, worldUp)` 等于多少？说明了什么？",
    answer:
      "两向量平行，叉乘 = $(0,0,0)$ 零向量，长度 0 无法 normalize → right 算不出来。这正是 Pitch=90° 时的万向节死锁，必须限幅避免。",
    tags: ["手算", "叉乘", "万向节死锁"],
  },
  {
    id: "cm-54",
    chapter: "camera",
    level: 3,
    question:
      "想让相机朝 -Z 看（front=(0,0,-1)），Pitch、Yaw 各应设多少（本章约定）？",
    answer:
      "需 $f_z=\\sin\\theta\\cos\\phi=-1$ 且 $f_x=f_y=0$。取 $\\phi=0$（cos=1）、$\\theta=-90°$（或 270°），则 $f_x=\\cos(-90°)=0$，$f_z=\\sin(-90°)=-1$。即 Pitch=0°、Yaw=-90°。",
    tags: ["手算", "front", "Yaw"],
  },

  // ── L4 综合 · 陷阱 ────────────────────────────────────────
  {
    id: "cm-55",
    chapter: "camera",
    level: 4,
    question:
      "高配机 144fps 走得飞快、低配 30fps 几乎挪不动。最可能漏了什么？怎么修？",
    answer:
      "漏了乘 deltaTime——每帧位移写死了常数，帧率越高每秒帧数越多走得越快。修法：位移 = 速度 × deltaTime，速度单位用「世界单位/秒」，移动就帧率无关了。",
    tags: ["陷阱", "delta time"],
  },
  {
    id: "cm-56",
    chapter: "camera",
    level: 4,
    question:
      "鼠标往上拖，画面却往下看。根因是什么？GLFW 和 Pointer Lock 各怎么修？",
    answer:
      "根因：屏幕坐标 y 向下增大，而抬头应让 Pitch 增大，yoffset 符号反了。GLFW 用 `yoffset = lastY - ypos`（取反）；Pointer Lock 用 `pitch -= movementY * sens`。",
    tags: ["陷阱", "yoffset", "Pitch"],
  },
  {
    id: "cm-57",
    chapter: "camera",
    level: 4,
    question: "斜向同时按 W+D 比只按 W 快一截（「抄近道」），原因和修法？",
    answer:
      "原因：front、right 都是单位向量，相加得到的对角方向长约 $\\sqrt2$，没归一化就乘 speed，所以快约 41%。修法：对合成方向 normalize 再乘 speed；并确保 front 本身在 updateCameraVectors 末尾已 normalize。",
    tags: ["陷阱", "归一化", "斜向移动"],
  },
  {
    id: "cm-58",
    chapter: "camera",
    level: 4,
    question:
      "为什么单纯限幅 Pitch ±89° 能避免死锁，而「需要看正天/正地」的相机要换方案？换什么？",
    answer:
      "±89° 保证 $\\cos\\phi$ 不为 0、front 不与 worldUp 平行，叉乘恒可解，是 FPS 标准做法。但它永远看不了正天/正地。要真正看天看地需换四元数，或用「先 Yaw 再 Pitch」的约束相机，绕开叉乘退化。",
    tags: ["陷阱", "Pitch", "万向节死锁", "四元数"],
  },
  {
    id: "cm-59",
    chapter: "camera",
    level: 4,
    question:
      "有人想「相机绕场景中心转圈看」，固定 Pitch、只改 Yaw 0°→180°，画面会怎样？这跟改 FOV 是一回事吗？",
    answer:
      "只改 Yaw 是原地转头（front 在水平圈上转半圈，朝向反过来），相机位置不动；若还想绕中心，需同时移动 position。它和改 FOV 完全不同：Yaw 改朝向，FOV 改透视张角（广角/长焦），位置都没动。",
    tags: ["综合", "Yaw", "FOV"],
  },
  {
    id: "cm-60",
    chapter: "camera",
    level: 4,
    question:
      "把 Pitch 拉到 89° 极限，Demo 网格线开始「拧」了——用 front 公式解释这种异常感。",
    answer:
      "Pitch→89° 时 $\\cos\\phi\\to0$，$f_x$、$f_z$（水平分量）趋近 0，front 几乎竖直、贴近 worldUp。`cross(front, worldUp)` 趋近零向量，right 数值不稳定，左右「水平」方向感知扭曲——这就是 ±89° 限幅的由来。",
    tags: ["综合", "Pitch", "front", "right"],
  },
  {
    id: "cm-61",
    chapter: "camera",
    level: 4,
    question:
      "「增大 FOV」和「减小 distance（人往前凑）」都让物体看着更大，本质区别是什么？",
    answer:
      "减小 distance 改的是 LookAt 里 eye 到 target 的距离（人物理靠近），透视关系随距离自然变化；增大 FOV 改的是投影张角（换广角镜头），相机没动但近处物体透视变形更夸张。两者视觉「拉近」相似但成因不同。",
    tags: ["综合", "FOV", "distance"],
  },
  {
    id: "cm-62",
    chapter: "camera",
    level: 4,
    question:
      "若误用「会随 Pitch 倾斜的相机上方向」去叉乘求 right，按 A/D 移动时会出现什么 bug？",
    answer:
      "right 会随 Pitch 一起倾斜、不再水平，按 A/D 左右移动会带上下分量——抬头时左移会「斜着往上飘」。修法：始终用固定的 worldUp 叉乘 front 求 right，保证 right 水平。",
    tags: ["陷阱", "right", "worldUp"],
  },
  {
    id: "cm-63",
    chapter: "camera",
    level: 4,
    question:
      "为什么把 Pitch/Yaw 当「真值」、front 当派生值，比反过来「直接存 front、增量旋转」更稳？",
    answer:
      "存角度时每帧用三角公式从干净的 Pitch/Yaw 重算 front，无累积误差，且 Pitch 易限幅防死锁；若直接对 front 做增量旋转，浮点误差会累积、长度漂移、还要额外 normalize，并难以约束俯仰范围。",
    tags: ["综合", "front", "Pitch", "Yaw"],
  },
  {
    id: "cm-64",
    chapter: "camera",
    level: 4,
    question:
      "三个分量都乘 sensitivity 还是只乘角度？若把 sensitivity 设很大或漏乘 deltaTime 给鼠标，会怎样？",
    answer:
      "sensitivity 只乘鼠标位移→角度增量（与 deltaTime 无关，鼠标本身就是离散事件，不该乘 dt）。sensitivity 过大→轻轻一动视角猛甩、难瞄准；移动位移则必须乘 deltaTime，两类输入处理方式不同，别混。",
    tags: ["综合", "sensitivity", "delta time"],
  },
  {
    id: "cm-65",
    chapter: "camera",
    level: 4,
    question:
      "把 FOV 从 90° 调到 15°（同一距离），画面里物体看着变大还是变小？为什么不等于「分辨率放大」？",
    answer:
      "FOV 15° 比 90° 看着物体更大——视野变窄、可见范围内的东西被「填满」屏幕，像长焦。它不是分辨率放大：FOV 改的是投影张角，近大远小的透视压缩也随之改变（长焦压缩纵深），而分辨率放大只是像素插值、透视不变。",
    tags: ["综合", "FOV", "透视"],
  },
  {
    id: "cm-66",
    chapter: "camera",
    level: 4,
    question:
      "Pointer Lock（光标捕获）解决了普通鼠标控制的什么痛点？没有它转 360° 会怎样？",
    answer:
      "普通鼠标用绝对坐标，指针一旦撞到屏幕边缘就动不了、视角卡住。Pointer Lock 锁住光标、隐藏指针、改用 movementX/Y 相对位移，可无限旋转转满 360° 不撞边——这是真实 FPS 的标准做法。",
    tags: ["综合", "光标捕获", "Pointer Lock"],
  },
  {
    id: "cm-67",
    chapter: "camera",
    level: 4,
    question:
      "GLFW 的 `glfwGetTime()` 与浏览器 `performance.now()` 在算 deltaTime 时有什么单位坑？",
    answer:
      "`glfwGetTime()` 返回秒，可直接相减得 deltaTime（秒）；`performance.now()` 返回毫秒，必须 `/1000` 转成秒再相减，否则 deltaTime 大了 1000 倍、移动会瞬移般飞出去。",
    tags: ["综合", "delta time", "API 差异"],
  },
  {
    id: "cm-68",
    chapter: "camera",
    level: 4,
    question: "已知 front=(0.612, 0.5, 0.612)，能否反推 Pitch？Yaw 又怎么定？",
    answer:
      "能：$f_y=\\sin\\phi=0.5\\Rightarrow\\phi=30°$（Pitch）。再由 $f_x=\\cos\\theta\\cos\\phi$、$f_z=\\sin\\theta\\cos\\phi$ 得 $\\tan\\theta=f_z/f_x=1\\Rightarrow\\theta=45°$（Yaw）。即由 $f_y$ 定 Pitch、由 $f_x$、$f_z$ 之比定 Yaw。",
    tags: ["综合", "手算", "反推"],
  },
  {
    id: "cm-69",
    chapter: "camera",
    level: 4,
    question:
      "为什么 LookAt、front 重算、WASD 位移、FOV 这四件事每帧的执行顺序不能乱？给出合理顺序。",
    answer:
      "合理顺序：①先按鼠标/键状态更新 Pitch/Yaw 与重算 front；②用 front 算 right 并按 WASD 更新 position（位移乘 deltaTime）；③用最新 position/front 构造 View；④用最新 FOV 构造 Projection。若先建 View 再改角，View 会落后一帧、画面抖动。",
    tags: ["综合", "顺序", "LookAt", "front"],
  },
  {
    id: "cm-70",
    chapter: "camera",
    level: 4,
    question:
      "为什么 front 三角公式里 $f_x$、$f_z$ 同乘 $\\cos\\phi$ 恰好保证了 front 始终是单位向量？给出关键恒等式。",
    answer:
      "因为 $|f|^2=\\cos^2\\phi(\\cos^2\\theta+\\sin^2\\theta)+\\sin^2\\phi$。先用 $\\cos^2\\theta+\\sin^2\\theta=1$ 把水平部分收成 $\\cos^2\\phi$，再用 $\\cos^2\\phi+\\sin^2\\phi=1$ 得 $|f|^2=1$。两个分量同乘 $\\cos\\phi$ 正是让水平平方和等于 $\\cos^2\\phi$ 的关键。",
    tags: ["综合", "单位向量", "三角推导"],
  },
];
