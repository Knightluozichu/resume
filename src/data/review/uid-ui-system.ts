import type { ReviewQuestion } from "./types";

/** Unity UI 系统架构 复习题 */
export const uidUiSystemQuestions: ReviewQuestion[] = [
  {
    id: "uid-ui-system-1",
    chapter: "uid-ui-system",
    level: 1,
    question: `Unity UI 系统由哪三个核心层级组成？`,
    answer: `三层：渲染层（Canvas，负责绘制 UI 元素）、事件层（EventSystem，负责射线检测和事件派发）、输入层（InputModule，负责采集键鼠/触摸/VR 输入）。`,
    tags: ["系统架构", "三层"],
  },
  {
    id: "uid-ui-system-2",
    chapter: "uid-ui-system",
    level: 2,
    question: `Canvas 的三种 Render Mode 有什么区别？分别用于什么场景？`,
    answer: `ScreenSpace-Overlay：UI 画在屏幕最上层，不受相机影响，适合 HUD。ScreenSpace-Camera：UI 画在相机视野内，可以有透视效果和后处理，适合 3D 菜单。WorldSpace：UI 作为 3D 物体存在于场景中，适合世界空间标语、NPC 对话框。`,
    tags: ["Canvas", "RenderMode"],
  },
  {
    id: "uid-ui-system-3",
    chapter: "uid-ui-system",
    level: 3,
    question: `EventSystem 中的 GraphicRaycaster 是如何工作的？为什么关闭 RaycastTarget 能提升性能？`,
    answer: `GraphicRaycaster 在每帧对 Canvas 下所有标记了 RaycastTarget 的 UI 元素做射线检测，按渲染层级从上到下找到第一个被命中的元素，将事件派发给它。关闭不需要接收点击的元素（如纯装饰性 Image/Text）的 RaycastTarget，可以减少射线检测次数，在 UI 元素多的场景下显著提升性能。`,
    tags: ["EventSystem", "GraphicRaycaster", "性能"],
  },
  {
    id: "uid-ui-system-4",
    chapter: "uid-ui-system",
    level: 4,
    question: `在一个同时需要手柄和鼠标操作的游戏中，你会如何设计 UI 输入架构？`,
    answer: `使用 Unity 新输入系统（Input System Package）替代旧的 StandaloneInputModule。1)创建 InputActionAsset 定义所有 UI 操作（Navigate/Submit/Cancel/Point/Click）；2)挂载 InputSystemUIInputModule 替代默认的 StandaloneInputModule，它原生支持多设备；3)为每个可交互 UI 元素实现 ISelectHandler/ISubmitHandler 接口，响应手柄导航；4)用 EventSystem.SetSelectedGameObject 管理当前选中元素，手柄切换菜单时自动高亮。这样键鼠和手柄可以无缝切换。`,
    tags: ["输入系统", "手柄", "综合"],
  },
];
