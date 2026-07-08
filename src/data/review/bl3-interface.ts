import type { ReviewQuestion } from "./types";

export const bl3InterfaceQuestions: ReviewQuestion[] = [
  {
    id: "bl3-interface-1",
    chapter: "bl3-interface",
    level: 1,
    question: "Blender 界面的五大常用编辑器是什么？",
    answer: "3D 视口（建模主战场）、属性面板（调参数）、大纲（管理对象层级）、时间线（控制动画）、着色器编辑器（连材质节点）。",
    tags: ["编辑器", "界面"],
  },
  {
    id: "bl3-interface-2",
    chapter: "bl3-interface",
    level: 2,
    question: "Blender 的工作区和传统软件的菜单栏有什么本质区别？",
    answer: "工作区是预设的完整界面布局，切换工作区会同时改变多个编辑器的排列方式，为特定任务优化操作流。传统菜单栏只是工具列表，不改变界面布局。",
    tags: ["工作区", "界面设计"],
  },
  {
    id: "bl3-interface-3",
    chapter: "bl3-interface",
    level: 3,
    question: "如何在 Blender 中高效导航 3D 视口？列出核心快捷键。",
    answer: "中键拖动旋转视角、Shift+中键平移、滚轮缩放。数字键 1/3/7 切正/侧/顶视图，数字键 5 切正交/透视，Z 键弹饼菜单切着色模式，/ 键进入/退出局部视图。",
    tags: ["导航", "快捷键"],
  },
  {
    id: "bl3-interface-4",
    chapter: "bl3-interface",
    level: 4,
    question: "为什么 Blender 采用非重叠窗口设计？这种设计在什么场景下会成为劣势？",
    answer: "非重叠窗口让所有编辑器可见、不遮挡，减少翻找时间。劣势是每个编辑器空间有限，在笔记本小屏幕上面板可能太小看不清；且不如悬浮窗口灵活——无法临时拖出来放大查看。",
    tags: ["非重叠窗口", "优势劣势", "综合"],
  },
];
