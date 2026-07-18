import type { ReviewQuestion } from "./types";

export const umsOfficialQuestions: ReviewQuestion[] = [
  {
    id: "ums-official-learning-map-1",
    chapter: "ums-official-learning-map",
    level: 1,
    question: "全书导览的核心主张是什么？",
    answer:
      "本书不是高级编辑器、SRP 与团队工程手册，而是广铁夫为零基础读者设计的“创造世界”路线。序章建立技能与环境边界，前六章从场景、对象、资产、脚本走到动画和界面，后四章完成输出、设备扩展、可视化状态机和优化，附录补足外部内容工具。",
    tags: ["全书导览", "核心主张"],
  },
  {
    id: "ums-official-learning-map-2",
    chapter: "ums-official-learning-map",
    level: 2,
    question: "全书导览必须覆盖哪些官方主题？",
    answer:
      "序章 制作空间的乐趣、第一章 开天辟地、第二章 思考方式与构造、第三章 世界的构成、第四章 脚本基础知识、第五章 动画和角色、第六章 GUI与Audio、第七章 输出、第八章 Unity的可能性、第九章 使用playMaker插件、第十章 优化和Professional版、附录 外部工具与推荐Assets",
    tags: ["全书导览", "目录覆盖"],
  },
  {
    id: "ums-official-learning-map-3",
    chapter: "ums-official-learning-map",
    level: 2,
    question: "全书导览的证据链是什么？",
    answer: "书籍身份 → 创造世界 → 对象资产 → 规则反馈 → 平台扩展 → 优化交付",
    tags: ["全书导览", "证据链"],
  },
  {
    id: "ums-official-learning-map-4",
    chapter: "ums-official-learning-map",
    level: 3,
    question: "全书导览应主动注入什么失败？",
    answer:
      "用现代高级 Unity 主题替换原书初学路线，虽然内容看似更难，却无法对应书名、ISBN和目录",
    tags: ["全书导览", "失败注入"],
  },
  {
    id: "ums-official-learning-map-5",
    chapter: "ums-official-learning-map",
    level: 2,
    question: "全书导览签发时必须保持什么不变量？",
    answer:
      "序章、10章和附录均有独立页面、实验与复习题，历史 API 有明确现代适配而不篡改原书问题",
    tags: ["全书导览", "签发不变量"],
  },
  {
    id: "ums-official-learning-map-6",
    chapter: "ums-official-learning-map",
    level: 3,
    question: "全书导览怎样完成可复现实验？",
    answer:
      "从一个可交互小岛出发，为每个官方单元写一条可观察证据；若某项无法落到场景、代码、构建或性能记录，就回到对应章节补齐。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["全书导览", "复现实验"],
  },
  {
    id: "ums-00-prologue-creative-space-1",
    chapter: "ums-00-prologue-creative-space",
    level: 1,
    question: "序章的核心主张是什么？",
    answer:
      "序章先建立媒介判断：Unity 是把模型、图像、声音、规则和输入组织成可运行空间的整合环境。读者不必先成为建模师或程序员，但必须知道每种资产解决什么问题、项目运行依赖哪些工具，以及想创造的体验怎样被拆成可验证的技术任务。",
    tags: ["序章", "核心主张"],
  },
  {
    id: "ums-00-prologue-creative-space-2",
    chapter: "ums-00-prologue-creative-space",
    level: 2,
    question: "序章必须覆盖哪些官方主题？",
    answer:
      "制作空间的乐趣、这样的环境就近在眼前、用Unity制作的游戏和游戏以外的内容、Unity的可能性、了解Unity的种类、必需的技术：建模、编程、声音、图像、会3D建模、编程不足为惧、能够制作声音、图形技术、安装Unity的环境、安装Unity的步骤、许可证的注册",
    tags: ["序章", "目录覆盖"],
  },
  {
    id: "ums-00-prologue-creative-space-3",
    chapter: "ums-00-prologue-creative-space",
    level: 2,
    question: "序章的证据链是什么？",
    answer: "体验目标 → 媒介清单 → 工具环境 → 最小项目 → 运行观察 → 学习边界",
    tags: ["序章", "证据链"],
  },
  {
    id: "ums-00-prologue-creative-space-4",
    chapter: "ums-00-prologue-creative-space",
    level: 3,
    question: "序章应主动注入什么失败？",
    answer:
      "没有先固定编辑器版本和目标平台，就直接导入大量资产并把导入失败误判成内容错误",
    tags: ["序章", "失败注入"],
  },
  {
    id: "ums-00-prologue-creative-space-5",
    chapter: "ums-00-prologue-creative-space",
    level: 2,
    question: "序章签发时必须保持什么不变量？",
    answer:
      "同一最小项目在记录过的环境中可打开、可运行、可构建，且资产职责能逐项解释",
    tags: ["序章", "签发不变量"],
  },
  {
    id: "ums-00-prologue-creative-space-6",
    chapter: "ums-00-prologue-creative-space",
    level: 3,
    question: "序章怎样完成可复现实验？",
    answer:
      "创建一个空项目，只放置地面、光源、相机和可移动立方体；记录编辑器版本、模板、平台模块和首次运行截图，再换一台环境复现。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["序章", "复现实验"],
  },
  {
    id: "ums-01-creating-the-world-1",
    chapter: "ums-01-creating-the-world",
    level: 1,
    question: "第一章的核心主张是什么？",
    answer:
      "第一章用六个“创造日”建立最小世界：项目和界面只是容器，光、Terrain、Skybox、运动、植被、水面和动物依次提供可见性、空间边界、时间变化与生命感。最后的发布步骤证明场景不是编辑器里的摆设，而是能交付给目标平台的程序。",
    tags: ["第一章", "核心主张"],
  },
  {
    id: "ums-01-creating-the-world-2",
    chapter: "ums-01-creating-the-world",
    level: 2,
    question: "第一章必须覆盖哪些官方主题？",
    answer:
      "创建新项目、关于界面、神的第1日：要有光、神的第2日：创造大地、创建山谷、设置Skybox、让物体动起来、神的第3日：植树种草、试着看一下（PLAY）、神的第4日：创建海（湖）、神的第5日：放置动物、神的第6日：你们要生养众多，遍布大地、发布到Web",
    tags: ["第一章", "目录覆盖"],
  },
  {
    id: "ums-01-creating-the-world-3",
    chapter: "ums-01-creating-the-world",
    level: 2,
    question: "第一章的证据链是什么？",
    answer: "项目骨架 → 光与天空 → 地形水体 → 动态对象 → 播放验收 → WebGL构建",
    tags: ["第一章", "证据链"],
  },
  {
    id: "ums-01-creating-the-world-4",
    chapter: "ums-01-creating-the-world",
    level: 3,
    question: "第一章应主动注入什么失败？",
    answer: "同时替换灯光、材质和后处理，画面变暗后无法定位首个变化来源",
    tags: ["第一章", "失败注入"],
  },
  {
    id: "ums-01-creating-the-world-5",
    chapter: "ums-01-creating-the-world",
    level: 2,
    question: "第一章签发时必须保持什么不变量？",
    answer:
      "每个创造步骤都能单独回放，Play 模式与 WebGL 中的核心对象、运动和输入保持一致",
    tags: ["第一章", "签发不变量"],
  },
  {
    id: "ums-01-creating-the-world-6",
    chapter: "ums-01-creating-the-world",
    level: 3,
    question: "第一章怎样完成可复现实验？",
    answer:
      "按光、地形、天空、运动、植被、水和动物的顺序搭建小岛场景，每一步保存截图和帧时间，最后制作 WebGL 构建并比较编辑器与浏览器结果。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第一章", "复现实验"],
  },
  {
    id: "ums-02-thinking-and-structure-1",
    chapter: "ums-02-thinking-and-structure",
    level: 1,
    question: "第二章的核心主张是什么？",
    answer:
      "第二章把第一章的操作抽象成 Unity 的对象模型：世界由 GameObject 占位，Component 赋予能力，Transform 与 Hierarchy 表达空间关系，Prefab 保存可复用配置，脚本则让组件在事件中改变状态。掌握这套结构后，读者才能解释自己刚才“做了什么”。",
    tags: ["第二章", "核心主张"],
  },
  {
    id: "ums-02-thinking-and-structure-2",
    chapter: "ums-02-thinking-and-structure",
    level: 2,
    question: "第二章必须覆盖哪些官方主题？",
    answer:
      "你做了什么、在世界中配置物品的思考方式、添加组件、使其成为物理性的物体、Hierarchy（层级）的思考方式、Prefab的概念、什么是脚本、创造世界的概念（总结）",
    tags: ["第二章", "目录覆盖"],
  },
  {
    id: "ums-02-thinking-and-structure-3",
    chapter: "ums-02-thinking-and-structure",
    level: 2,
    question: "第二章的证据链是什么？",
    answer: "对象身份 → 组件能力 → 层级关系 → Prefab模板 → 脚本事件 → 运行状态",
    tags: ["第二章", "证据链"],
  },
  {
    id: "ums-02-thinking-and-structure-4",
    chapter: "ums-02-thinking-and-structure",
    level: 3,
    question: "第二章应主动注入什么失败？",
    answer:
      "为整理 Hierarchy 随意建立父子关系，导致缩放、坐标和销毁行为被父对象隐式改变",
    tags: ["第二章", "失败注入"],
  },
  {
    id: "ums-02-thinking-and-structure-5",
    chapter: "ums-02-thinking-and-structure",
    level: 2,
    question: "第二章签发时必须保持什么不变量？",
    answer:
      "每个可观察行为都能定位到明确组件，Prefab 更新与实例覆盖之间没有未解释差异",
    tags: ["第二章", "签发不变量"],
  },
  {
    id: "ums-02-thinking-and-structure-6",
    chapter: "ums-02-thinking-and-structure",
    level: 3,
    question: "第二章怎样完成可复现实验？",
    answer:
      "制作一个带 Mesh Renderer、Collider、Rigidbody 和自定义脚本的箱子 Prefab，创建三个实例，只覆盖其中一个材质，再修改模板并检查继承矩阵。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第二章", "复现实验"],
  },
  {
    id: "ums-03-world-composition-1",
    chapter: "ums-03-world-composition",
    level: 1,
    question: "第三章的核心主张是什么？",
    answer:
      "第三章解释世界从哪里来：声音、二维图像、网格、材质、UV、骨骼和环境贴图分别承担不同信息。建模软件生产形体，纹理工具生产表面，Unity 负责导入、着色、灯光与运行时组合；PBR、Reflection Probe 和角色骨骼共同决定资产能否在目标光照和动作中可信工作。",
    tags: ["第三章", "核心主张"],
  },
  {
    id: "ums-03-world-composition-2",
    chapter: "ums-03-world-composition",
    level: 2,
    question: "第三章必须覆盖哪些官方主题？",
    answer:
      "成为造物主、制作声音、二维图像的制作、什么是3D模型、选择哪一个3D工具、什么是3D数据、复杂的大叔、什么是建模数据、建模方法、从基本的开始做起、设置材质、什么是UV贴图、使用SDS（细分曲面）、使用重新拓扑（Retopology）、低多边形、为Unity导入模型数据的步骤、读取图像、选择材质的着色器、什么是基于物理的着色（PBS）、Lighting设置、Reflection Probe、Standard Shader的基础、角色和骨骼、使用mixamo、制作Skybox Material、使用MARMOSET SKYSHOP",
    tags: ["第三章", "目录覆盖"],
  },
  {
    id: "ums-03-world-composition-3",
    chapter: "ums-03-world-composition",
    level: 2,
    question: "第三章的证据链是什么？",
    answer: "资产意图 → 形体拓扑 → UV材质 → 骨骼动画 → 导入设置 → 灯光验收",
    tags: ["第三章", "证据链"],
  },
  {
    id: "ums-03-world-composition-4",
    chapter: "ums-03-world-composition",
    level: 3,
    question: "第三章应主动注入什么失败？",
    answer: "导入模型后用场景缩放和材质补丁掩盖单位、法线、UV或骨骼源数据错误",
    tags: ["第三章", "失败注入"],
  },
  {
    id: "ums-03-world-composition-5",
    chapter: "ums-03-world-composition",
    level: 2,
    question: "第三章签发时必须保持什么不变量？",
    answer:
      "资产从源文件到 Unity 的单位、轴向、拓扑、UV、材质和骨骼都有可追踪设置，换光照后仍可解释",
    tags: ["第三章", "签发不变量"],
  },
  {
    id: "ums-03-world-composition-6",
    chapter: "ums-03-world-composition",
    level: 3,
    question: "第三章怎样完成可复现实验？",
    answer:
      "导入同一角色的高模和重新拓扑低模，配置 UV、材质、Avatar 与动作；在三种环境光和 Reflection Probe 开关下记录三角形数、变形接缝和材质响应。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第三章", "复现实验"],
  },
  {
    id: "ums-04-scripting-foundations-1",
    chapter: "ums-04-scripting-foundations",
    level: 1,
    question: "第四章的核心主张是什么？",
    answer:
      "第四章是全书最长的规则层：事件消息决定代码何时运行，变量和类型保存状态，条件与循环表达控制流，Transform、Rigidbody、输入、碰撞、Raycast、场景、协程和持久化 API 把状态接回世界。原书示例含 UnityScript 与 iTween，现代复刻必须改写为 C# 与受维护的等价方案，同时保留原始问题。",
    tags: ["第四章", "核心主张"],
  },
  {
    id: "ums-04-scripting-foundations-2",
    chapter: "ums-04-scripting-foundations",
    level: 2,
    question: "第四章必须覆盖哪些官方主题？",
    answer:
      "编程这个工作、了解主要的事件消息、写脚本的基本规则、使用Debug.Log、使用Invoke延时调用、自定义函数、变量与类型、带值的函数（闰年）、用if语句实现分支、用return返回值、用for语句循环、数组的使用方法、用foreach语句循环、更改材质（制作信号灯）、定义类、关于变量的声明、从脚本中指定GameObject的方法、通过名称指定自己的子游戏对象、控制位置、方向和缩放（Transform类）、用Translate更改位置、利用Rotate旋转、用物理引擎操控、用AddForce施加作用力、用鼠标输入与Instantiate显示、碰撞事件、跟随相机（LookAt）、关于Tag、接受键盘事件、使用iTween、使用Raycast触碰、移动场景、使用Coroutine（协同程序）、移动场景后仍保留GameObject、PlayerPrefs保存数据、使用字符串、播放Audio、用switch case语句做分支、用脚本处理重复工作、总结与GameManager",
    tags: ["第四章", "目录覆盖"],
  },
  {
    id: "ums-04-scripting-foundations-3",
    chapter: "ums-04-scripting-foundations",
    level: 2,
    question: "第四章的证据链是什么？",
    answer: "事件入口 → 状态类型 → 控制流 → 场景引用 → 物理输入 → 持久化管理",
    tags: ["第四章", "证据链"],
  },
  {
    id: "ums-04-scripting-foundations-4",
    chapter: "ums-04-scripting-foundations",
    level: 3,
    question: "第四章应主动注入什么失败？",
    answer:
      "在 Update 中直接改动态 Rigidbody 的 Transform，又在 FixedUpdate 施力，造成帧率相关运动和碰撞穿透",
    tags: ["第四章", "失败注入"],
  },
  {
    id: "ums-04-scripting-foundations-5",
    chapter: "ums-04-scripting-foundations",
    level: 2,
    question: "第四章签发时必须保持什么不变量？",
    answer:
      "同一输入序列在固定初始状态下产生可重放状态轨迹，跨场景后管理器唯一且没有隐藏字符串依赖",
    tags: ["第四章", "签发不变量"],
  },
  {
    id: "ums-04-scripting-foundations-6",
    chapter: "ums-04-scripting-foundations",
    level: 3,
    question: "第四章怎样完成可复现实验？",
    answer:
      "制作交通灯状态机：键盘或鼠标触发，协程控制时序，Raycast 选择灯体，碰撞对象读取当前状态；切换场景后只保留一个 GameManager，并验证 PlayerPrefs 只保存用户选项。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第四章", "复现实验"],
  },
  {
    id: "ums-05-animation-and-characters-1",
    chapter: "ums-05-animation-and-characters",
    level: 1,
    question: "第五章的核心主张是什么？",
    answer:
      "第五章把单段动画升级为角色状态系统：Animation Clip 保存运动，Animation Event 对齐时序事件，Animator Controller 与 Mecanim 组织状态和过渡，Blend Tree 根据参数连续混合走、跑和待机；NavMesh 则把角色意图投射到可行走空间，并通过门等动态约束改变路径。",
    tags: ["第五章", "核心主张"],
  },
  {
    id: "ums-05-animation-and-characters-2",
    chapter: "ums-05-animation-and-characters",
    level: 2,
    question: "第五章必须覆盖哪些官方主题？",
    answer:
      "动画的种类、试着制作动画、在动画途中发生事件、Mecanim和多个动画、了解混合树、跑、走、待机、通过NavMesh在迷宫中进行移动、NavMesh：添加门",
    tags: ["第五章", "目录覆盖"],
  },
  {
    id: "ums-05-animation-and-characters-3",
    chapter: "ums-05-animation-and-characters",
    level: 2,
    question: "第五章的证据链是什么？",
    answer: "动作资产 → Avatar绑定 → 状态参数 → 混合过渡 → 导航目标 → 时序验收",
    tags: ["第五章", "证据链"],
  },
  {
    id: "ums-05-animation-and-characters-4",
    chapter: "ums-05-animation-and-characters",
    level: 3,
    question: "第五章应主动注入什么失败？",
    answer:
      "只根据键盘输入切动画，不读取角色真实速度，导致撞墙时仍播放奔跑且脚底滑动",
    tags: ["第五章", "失败注入"],
  },
  {
    id: "ums-05-animation-and-characters-5",
    chapter: "ums-05-animation-and-characters",
    level: 2,
    question: "第五章签发时必须保持什么不变量？",
    answer:
      "动作参数来自可观察运动状态，门改变导航可达性时角色能停止或重规划且不会穿越关闭边界",
    tags: ["第五章", "签发不变量"],
  },
  {
    id: "ums-05-animation-and-characters-6",
    chapter: "ums-05-animation-and-characters",
    level: 3,
    question: "第五章怎样完成可复现实验？",
    answer:
      "给同一角色配置待机、走、跑 Blend Tree 和 NavMeshAgent，在迷宫中加入可开关门；记录速度参数、当前动画、剩余距离和门状态，复现不可达与重规划。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第五章", "复现实验"],
  },
  {
    id: "ums-06-gui-and-audio-1",
    chapter: "ums-06-gui-and-audio",
    level: 1,
    question: "第六章的核心主张是什么？",
    answer:
      "第六章把反馈层从世界对象扩展到屏幕：旧式 IMGUI 用立即模式绘制控件，uGUI 用 Canvas、Anchor 和组件表达布局，按钮与滑动条把用户意图传给规则，Audio Mixer 管理分组、音量和效果。相机叠加、地图和淡入淡出都必须同时维护视觉层级与输入焦点。",
    tags: ["第六章", "核心主张"],
  },
  {
    id: "ums-06-gui-and-audio-2",
    chapter: "ums-06-gui-and-audio",
    level: 2,
    question: "第六章必须覆盖哪些官方主题？",
    answer:
      "制作GUI、使用GUI用户界面层的方法（旧式IMGUI）、使用GUI.Button()、固定显示按钮宽度、GUI.Label与文字字体、Fade In与Fade Out、与其他摄像机的影像重合、显示Map的手法、使用uGUI（Unity UI）、Screen Space - Overlay、使用Anchor、锚点的默认值、配置并使用按钮、使用滑动条、用ESC键控制Canvas显示与隐藏、利用Audio Mixer控制、其他模式的GUI、GUI与Audio总结",
    tags: ["第六章", "目录覆盖"],
  },
  {
    id: "ums-06-gui-and-audio-3",
    chapter: "ums-06-gui-and-audio",
    level: 2,
    question: "第六章的证据链是什么？",
    answer:
      "信息层级 → Canvas布局 → 输入事件 → 界面状态 → 音频总线 → 多分辨率验收",
    tags: ["第六章", "证据链"],
  },
  {
    id: "ums-06-gui-and-audio-4",
    chapter: "ums-06-gui-and-audio",
    level: 3,
    question: "第六章应主动注入什么失败？",
    answer:
      "只把 Canvas 设为不可见，却没有释放 EventSystem 焦点或恢复时间缩放，关闭菜单后角色仍不能输入",
    tags: ["第六章", "失败注入"],
  },
  {
    id: "ums-06-gui-and-audio-5",
    chapter: "ums-06-gui-and-audio",
    level: 2,
    question: "第六章签发时必须保持什么不变量？",
    answer:
      "界面在目标宽高比内无重叠，显示状态、输入焦点、暂停状态和音频参数始终同步",
    tags: ["第六章", "签发不变量"],
  },
  {
    id: "ums-06-gui-and-audio-6",
    chapter: "ums-06-gui-and-audio",
    level: 3,
    question: "第六章怎样完成可复现实验？",
    answer:
      "制作含 HUD、地图、设置面板和主音量滑动条的 Canvas，在三种宽高比下检查锚点；用 ESC 开关设置页，并记录输入焦点、暂停状态和 Audio Mixer 参数。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第六章", "复现实验"],
  },
  {
    id: "ums-07-build-and-output-1",
    chapter: "ums-07-build-and-output",
    level: 1,
    question: "第七章的核心主张是什么？",
    answer:
      "第七章把编辑器内体验变成平台产品：平台切换会重新导入资源，Player Settings 与 Quality 决定运行契约，Build 生成可安装产物，多点触控、条件编译和平台差异决定同一玩法能否保持语义一致。iOS 与 Android 还要求工具链、签名、包标识和商店材料完整。",
    tags: ["第七章", "核心主张"],
  },
  {
    id: "ums-07-build-and-output-2",
    chapter: "ums-07-build-and-output",
    level: 2,
    question: "第七章必须覆盖哪些官方主题？",
    answer:
      "Unity的输出位置、切换平台、了解Player Settings、品质设置、进行Build、对应多平台的游戏设计、触摸画面时的不同、实现多个点击、使用平台依赖编译、手机应用程序的输出、准备iOS的开发、在Unity中进行iOS应用程序的写出、创建Android应用程序、下载Android SDK、创建Keystore文件、制作Android时的注意事项、向Play Store申请、其他输出",
    tags: ["第七章", "目录覆盖"],
  },
  {
    id: "ums-07-build-and-output-3",
    chapter: "ums-07-build-and-output",
    level: 2,
    question: "第七章的证据链是什么？",
    answer: "目标平台 → 构建配置 → 输入适配 → 签名凭据 → 设备运行 → 商店证据",
    tags: ["第七章", "证据链"],
  },
  {
    id: "ums-07-build-and-output-4",
    chapter: "ums-07-build-and-output",
    level: 3,
    question: "第七章应主动注入什么失败？",
    answer:
      "为了快速适配平台复制整个控制脚本，之后只修复其中一份，导致不同平台规则逐渐分叉",
    tags: ["第七章", "失败注入"],
  },
  {
    id: "ums-07-build-and-output-5",
    chapter: "ums-07-build-and-output",
    level: 2,
    question: "第七章签发时必须保持什么不变量？",
    answer:
      "平台分支只封装设备能力，核心规则和输入语义共用；签名、包标识和构建配置可审计且密钥不入库",
    tags: ["第七章", "签发不变量"],
  },
  {
    id: "ums-07-build-and-output-6",
    chapter: "ums-07-build-and-output",
    level: 3,
    question: "第七章怎样完成可复现实验？",
    answer:
      "为桌面、WebGL 和 Android 建立三套构建配置，共用同一“选择与拖动”输入语义；保存构建参数、产物哈希、真机或浏览器日志和平台差异清单。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第七章", "复现实验"],
  },
  {
    id: "ums-08-unity-possibilities-1",
    chapter: "ums-08-unity-possibilities",
    level: 1,
    question: "第八章的核心主张是什么？",
    answer:
      "第八章展示 Unity 如何连接编辑器扩展和外部设备：Editor Script 把重复制作流程工具化，Oculus Rift、Leap Motion、Vuforia 与 Arduino 分别引入头显、手部追踪、图像目标和物理传感器。关键不是逐个追旧 SDK，而是把设备输入归一化为能力接口，并为断连、校准和权限失败设计回退。",
    tags: ["第八章", "核心主张"],
  },
  {
    id: "ums-08-unity-possibilities-2",
    chapter: "ums-08-unity-possibilities",
    level: 2,
    question: "第八章必须覆盖哪些官方主题？",
    answer:
      "一窥Editor Script的内容、Oculus Rift的革命、用Leap Motion来感应手、使用Vuforia开发AR应用程序、用Arduino玩",
    tags: ["第八章", "目录覆盖"],
  },
  {
    id: "ums-08-unity-possibilities-3",
    chapter: "ums-08-unity-possibilities",
    level: 2,
    question: "第八章的证据链是什么？",
    answer:
      "能力需求 → SDK适配器 → 坐标校准 → 事件归一化 → 断连回退 → 设备验收",
    tags: ["第八章", "证据链"],
  },
  {
    id: "ums-08-unity-possibilities-4",
    chapter: "ums-08-unity-possibilities",
    level: 3,
    question: "第八章应主动注入什么失败？",
    answer: "把厂商 SDK 回调直接写进玩法脚本，设备更新或断连后整个规则层失效",
    tags: ["第八章", "失败注入"],
  },
  {
    id: "ums-08-unity-possibilities-5",
    chapter: "ums-08-unity-possibilities",
    level: 2,
    question: "第八章签发时必须保持什么不变量？",
    answer:
      "玩法只依赖稳定能力接口，坐标转换可校准，设备断连和非法数据都有可观察回退",
    tags: ["第八章", "签发不变量"],
  },
  {
    id: "ums-08-unity-possibilities-6",
    chapter: "ums-08-unity-possibilities",
    level: 3,
    question: "第八章怎样完成可复现实验？",
    answer:
      "定义统一 PoseOrValue 输入接口，用鼠标模拟器和一个真实或录制设备数据源驱动同一对象；注入断连、漂移和超范围值，观察回退状态。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第八章", "复现实验"],
  },
  {
    id: "ums-09-playmaker-visual-scripting-1",
    chapter: "ums-09-playmaker-visual-scripting",
    level: 1,
    question: "第九章的核心主张是什么？",
    answer:
      "第九章用 playMaker 把脚本规则显式化为有限状态机：State 保存当前阶段，Event 触发 Transition，Action 修改组件或调用能力，Variable 保存图内数据。分支、iTween、脚本通信和模板都服务于同一目标：让行为路径可见、可复用、可诊断，而不是用连线隐藏复杂性。",
    tags: ["第九章", "核心主张"],
  },
  {
    id: "ums-09-playmaker-visual-scripting-2",
    chapter: "ums-09-playmaker-visual-scripting",
    level: 2,
    question: "第九章必须覆盖哪些官方主题？",
    answer:
      "什么是playMaker、尝试简单的分支、通过iTween进行移动、获取事件并进行动作、Action种类一览、变更组件信息、通过变量进行条件分支、从脚本进行通信、向脚本通信、使2种状态迁移运行、使用模板、用了还不如不用的情况与诀窍",
    tags: ["第九章", "目录覆盖"],
  },
  {
    id: "ums-09-playmaker-visual-scripting-3",
    chapter: "ums-09-playmaker-visual-scripting",
    level: 2,
    question: "第九章的证据链是什么？",
    answer:
      "状态边界 → 事件入口 → 条件分支 → Action副作用 → 脚本通信 → 模板复用",
    tags: ["第九章", "证据链"],
  },
  {
    id: "ums-09-playmaker-visual-scripting-4",
    chapter: "ums-09-playmaker-visual-scripting",
    level: 3,
    question: "第九章应主动注入什么失败？",
    answer:
      "多个 FSM 通过全局字符串事件互相调用，事件重名后触发错误对象且无法追踪发送者",
    tags: ["第九章", "失败注入"],
  },
  {
    id: "ums-09-playmaker-visual-scripting-5",
    chapter: "ums-09-playmaker-visual-scripting",
    level: 2,
    question: "第九章签发时必须保持什么不变量？",
    answer:
      "任一副作用都能追溯到状态、事件和条件，脚本通信接口有类型与发送者，模板实例无隐藏覆盖",
    tags: ["第九章", "签发不变量"],
  },
  {
    id: "ums-09-playmaker-visual-scripting-6",
    chapter: "ums-09-playmaker-visual-scripting",
    level: 3,
    question: "第九章怎样完成可复现实验？",
    answer:
      "用 playMaker 或 Unity Visual Scripting 制作门的 Closed、Opening、Open、Closing 四状态，脚本只发送 Use 与 Lock 事件；保存状态轨迹并注入连续点击和动画中断。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第九章", "复现实验"],
  },
  {
    id: "ums-10-optimization-and-pro-1",
    chapter: "ums-10-optimization-and-pro",
    level: 1,
    question: "第十章的核心主张是什么？",
    answer:
      "第十章用画质成本解释版本与功能选择：Image Effect、Projector、LOD、遮挡剔除、光照贴图、Light Probe、Profiler、Movie Texture 和 Render Texture 都在视觉收益与 CPU、GPU、内存、带宽之间交换。优化必须从目标设备测量开始，版本授权只决定可用能力，不会替代预算和证据。",
    tags: ["第十章", "核心主张"],
  },
  {
    id: "ums-10-optimization-and-pro-2",
    chapter: "ums-10-optimization-and-pro",
    level: 2,
    question: "第十章必须覆盖哪些官方主题？",
    answer:
      "Personal版和Professional版、玩转Image Effect、用Projector来投影、通过Level of Details使近处详细显示、通过Occlusion Culling仅显示可见部分、使用Lightmapping节约光的计算、使用Light Probe Group、通过Profiler来优化、Movie Texture和Render Texture、使用Professional版的收益",
    tags: ["第十章", "目录覆盖"],
  },
  {
    id: "ums-10-optimization-and-pro-3",
    chapter: "ums-10-optimization-and-pro",
    level: 2,
    question: "第十章的证据链是什么？",
    answer: "设备预算 → 基线采样 → 瓶颈归类 → 单项改动 → 画质对照 → 回归签发",
    tags: ["第十章", "证据链"],
  },
  {
    id: "ums-10-optimization-and-pro-4",
    chapter: "ums-10-optimization-and-pro",
    level: 3,
    question: "第十章应主动注入什么失败？",
    answer:
      "在编辑器中看到平均帧率上升就签发，却没有检查真机 GPU、峰值内存和 LOD 跳变",
    tags: ["第十章", "失败注入"],
  },
  {
    id: "ums-10-optimization-and-pro-5",
    chapter: "ums-10-optimization-and-pro",
    level: 2,
    question: "第十章签发时必须保持什么不变量？",
    answer:
      "每个优化结论都对应同设备同场景的前后证据，性能改善不能越过画质、正确性和内存门槛",
    tags: ["第十章", "签发不变量"],
  },
  {
    id: "ums-10-optimization-and-pro-6",
    chapter: "ums-10-optimization-and-pro",
    level: 3,
    question: "第十章怎样完成可复现实验？",
    answer:
      "在目标设备录制基线，然后分别启用 LOD、遮挡剔除、烘焙光和降分辨率 Render Texture；每次只改一项，记录 CPU、GPU、内存、绘制调用和画质差异。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["第十章", "复现实验"],
  },
  {
    id: "ums-appendix-tools-assets-1",
    chapter: "ums-appendix-tools-assets",
    level: 1,
    question: "附录的核心主张是什么？",
    answer:
      "附录把内容生产扩展到 Substance Painter、Substance Designer、B2M、Marmoset Toolbag 和 Asset Store。工具选择必须围绕输入输出、色彩与材质约定、授权和版本兼容；Asset 不是下载即用，iTween easing 也不是装饰选项，而是时间到位移映射，需要验证起止值、中断和帧率独立性。",
    tags: ["附录", "核心主张"],
  },
  {
    id: "ums-appendix-tools-assets-2",
    chapter: "ums-appendix-tools-assets",
    level: 2,
    question: "附录必须覆盖哪些官方主题？",
    answer:
      "一些方便的外部工具与推荐Assets、SUBSTANCE PAINTER、SUBSTANCE DESIGNER 5、SUBSTANCE B2M、Marmoset Toolbag 2、其他推荐工具、方便的Asset、iTween的easetype一览",
    tags: ["附录", "目录覆盖"],
  },
  {
    id: "ums-appendix-tools-assets-3",
    chapter: "ums-appendix-tools-assets",
    level: 2,
    question: "附录的证据链是什么？",
    answer: "制作需求 → 工具输入 → 导出约定 → 授权审查 → Unity导入 → 运行验收",
    tags: ["附录", "证据链"],
  },
  {
    id: "ums-appendix-tools-assets-4",
    chapter: "ums-appendix-tools-assets",
    level: 3,
    question: "附录应主动注入什么失败？",
    answer:
      "直接导入整包 Asset，覆盖项目设置和 Shader 依赖，却没有记录来源、版本或许可证",
    tags: ["附录", "失败注入"],
  },
  {
    id: "ums-appendix-tools-assets-5",
    chapter: "ums-appendix-tools-assets",
    level: 2,
    question: "附录签发时必须保持什么不变量？",
    answer:
      "每个外部工具输出和第三方资产都有可追踪契约，移除或升级后能明确影响范围并复验",
    tags: ["附录", "签发不变量"],
  },
  {
    id: "ums-appendix-tools-assets-6",
    chapter: "ums-appendix-tools-assets",
    level: 3,
    question: "附录怎样完成可复现实验？",
    answer:
      "选一个材质或动画 Asset，建立来源卡片；导入隔离项目，记录通道、色彩空间、许可证和依赖，再用三条 easing 曲线运行同一位移并测试中断。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["附录", "复现实验"],
  },
  {
    id: "ums-official-final-review-1",
    chapter: "ums-official-final-review",
    level: 1,
    question: "综合验收的核心主张是什么？",
    answer:
      "综合验收要求读者交付一个小而完整的世界：有光照与地形，有职责明确的对象和资产，有 C# 规则、角色动画、GUI 与音频，能构建到目标平台，可通过一个设备或可视化状态机扩展，并用 Profiler 证明优化。任何只在编辑器里好看、无法构建或无法解释状态的结果都不算完成。",
    tags: ["综合验收", "核心主张"],
  },
  {
    id: "ums-official-final-review-2",
    chapter: "ums-official-final-review",
    level: 2,
    question: "综合验收必须覆盖哪些官方主题？",
    answer:
      "序章 制作空间的乐趣验收、第一章 开天辟地验收、第二章 思考方式与构造验收、第三章 世界的构成验收、第四章 脚本基础知识验收、第五章 动画和角色验收、第六章 GUI与Audio验收、第七章 输出验收、第八章 Unity的可能性验收、第九章 使用playMaker插件验收、第十章 优化和Professional版验收、附录 外部工具与推荐Assets验收",
    tags: ["综合验收", "目录覆盖"],
  },
  {
    id: "ums-official-final-review-3",
    chapter: "ums-official-final-review",
    level: 2,
    question: "综合验收的证据链是什么？",
    answer: "世界基线 → 资产契约 → 规则轨迹 → 反馈输入 → 平台构建 → 性能签发",
    tags: ["综合验收", "证据链"],
  },
  {
    id: "ums-official-final-review-4",
    chapter: "ums-official-final-review",
    level: 3,
    question: "综合验收应主动注入什么失败？",
    answer:
      "用演示视频代替可运行构建，或只提交最终帧率而没有输入、版本、状态轨迹和画质对照",
    tags: ["综合验收", "失败注入"],
  },
  {
    id: "ums-official-final-review-5",
    chapter: "ums-official-final-review",
    level: 2,
    question: "综合验收签发时必须保持什么不变量？",
    answer:
      "12个官方单元均在最终项目中留下可观察证据，目标平台可运行，失败样本能回放到首个偏离",
    tags: ["综合验收", "签发不变量"],
  },
  {
    id: "ums-official-final-review-6",
    chapter: "ums-official-final-review",
    level: 3,
    question: "综合验收怎样完成可复现实验？",
    answer:
      "独立制作一座可探索小岛：角色穿过可开关门，GUI 显示地图和音量，场景可构建到目标平台；保存正常、边界、失败和修复四组完整证据。 同时保存 Unity 版本、输入、首个偏离、目标平台结果和修复对照。",
    tags: ["综合验收", "复现实验"],
  },
];
