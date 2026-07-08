import type { ReviewQuestion } from "./types";

/** Unity 输入系统 复习题 */
export const uscInputSystemQuestions: ReviewQuestion[] = [
  {
    id: "usc-input-system-1",
    chapter: "usc-input-system",
    level: 1,
    question: "Unity 有哪两套输入系统？各有什么特点？",
    answer: "旧输入系统（Input Manager）：内置，Input.GetAxis/GetKey 等静态方法，简单易用但功能有限，配置在 ProjectSettings 中不可热重载。新输入系统（Input System Package）：需安装，基于 InputActionAsset 和事件驱动，支持多设备统一、运行时重绑定、VR/AR 设备，是未来方向。新项目推荐用新输入系统。",
    tags: ["输入系统", "对比"],
  },
  {
    id: "usc-input-system-2",
    chapter: "usc-input-system",
    level: 2,
    question: "GetAxis 和 GetAxisRaw 的区别是什么？",
    answer: "GetAxis 返回平滑插值的值（-1~1），松开按键后逐渐回到 0，有平滑过渡感。GetAxisRaw 返回离散值（-1/0/1），松开立即回 0，无过渡。GetAxis 适合角色移动（有惯性）、摄像机旋转（平滑）。GetAxisRaw 适合精确控制（格网格移动、立即响应）。平滑由 Input Manager 的 Sensitivity/Gravity 参数控制。",
    tags: ["GetAxis", "输入"],
  },
  {
    id: "usc-input-system-3",
    chapter: "usc-input-system",
    level: 3,
    question: "新输入系统的 InputAction 如何使用？事件驱动和轮询有什么区别？",
    answer: "创建 InputActionAsset 定义 Actions（如 Move/Jump），绑定到输入设备。代码中：action.performed += ctx => { Vector2 val = ctx.ReadValue&lt;Vector2&gt;(); }。事件驱动：输入发生时引擎回调，无需每帧检查，CPU 效率高。轮询：每帧 Input.GetKeyDown 检查，简单但浪费 CPU。新输入系统还支持 action.ReadValue&lt;T&gt;() 轮询模式，两种方式可选。",
    tags: ["InputAction", "事件驱动", "新输入系统"],
  },
  {
    id: "usc-input-system-4",
    chapter: "usc-input-system",
    level: 4,
    question: "设计一个支持键鼠和手柄无缝切换的游戏输入方案？",
    answer: "1)用新输入系统，创建 InputActionAsset 定义所有操作（Move/Look/Jump/Interact）；2)为每个 Action 绑定多套控制方案（Binding Mask）：键鼠（WASD+鼠标）和手柄（左摇杆+右摇杆）；3)挂载 PlayerInput 组件，设置 Behavior 为 Invoke Unity Events 或 Send Messages；4)用 InputUser 管理多用户/多设备，监听设备切换事件自动更换控制方案；5)UI 导航用 InputSystemUIInputModule 替代 StandaloneInputModule，支持手柄方向键导航菜单。关键：不硬编码 KeyCode，通过 Action 间接引用，让绑定可配置可切换。",
    tags: ["手柄", "新输入系统", "综合"],
  },
];
