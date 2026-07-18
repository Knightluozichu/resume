import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "导读 的权威边界",
    action:
      "出版社预览的目录页明确给出 6 个正文章和 Appendix: The 3D Scene Sample。导读与总复习只负责导航和综合验收，不计入原书覆盖率；附录虽然可选，却承担第五章 3D 场景的可复现资产，因此必须单列。全书的逻辑不是从组件名堆砌技巧，而是先解释旧 GUI 的限制，再建立 retained-mode 布局，随后学习控件、响应式锚点、屏幕与世界空间，最后进入事件源码和可扩展边界。",
    metric: "7 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "全书生产者到消费者链",
    action:
      "输入设备先被 Input Module 解释为指针或导航状态，EventSystem 再通过 Raycaster 找到目标，Selectable 或事件接口消费交互，Rect Transform 与布局组件计算几何，CanvasRenderer 最终把图元提交给相机或覆盖层。原书六章分别揭开这条链上的历史来源、布局约束、控件状态、响应式关系、空间投影和源码扩展。只会拖 Button 不代表理解 UI；能沿这条链解释一次点击为何命中、元素为何位于此处、最终为何这样绘制，才算掌握。",
    metric: "producer -> consumer",
    evidence:
      "Chapter 1. Looking Back, Looking Forward：旧 GUI、新 UI、Unity 2D 后端与编辑器变化；Chapter 2. Building Layouts：Rect Transform、Canvas、自动布局、缩放与 UnityEvent",
    boundary:
      "把 UI Toolkit 当作原书章节会制造时代错误：2015 年原书围绕 Unity 4.6/5 的 uGUI 与开放源码展开。",
  },
  {
    label: "实验",
    stage: "固定身份和范围",
    action:
      "先用英文 ISBN、作者公告、出版社目录与中文版 ISBN 建立对照表。逐项勾选六章和附录，不用旧页面数量猜目录，也不把 Preface、Index 或学习地图当成原文章。",
    metric: "one variable",
    evidence:
      "book identity -> 6 chapters + appendix -> source concepts -> modern boundary",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "写出现代迁移证据",
    action:
      "对每项旧 API 写出稳定不变量、现代入口和不等价处。UI Toolkit 只放在迁移对照，不占原章名额；最终由总复习跨章验证布局、交互与空间投影。",
    metric: "normal / edge / failure",
    evidence:
      "把 UI Toolkit 当作原书章节会制造时代错误：2015 年原书围绕 Unity 4.6/5 的 uGUI 与开放源码展开。；把目录覆盖等同于掌握也不成立：必须保存层级、输入、布局结果和事件命中证据，才能证明概念可复现。",
    boundary:
      "现代 Unity 仍保留 Canvas、RectTransform、Selectable、EventSystem 和 GraphicRaycaster 这一 uGUI 主链，但 TextMeshPro 常替代旧 Text，新 Input System 可替代 StandaloneInputModule，Package 源码与公开仓库的获取方式也已改变。UI Toolkit 是新的 retained-mode 系统，适合另行比较样式、数据绑定和编辑器工具；它不能抹掉原书所讲的 uGUI 历史。迁移记录应写成“原书载体、保持的不变量、现代入口、不可等价点、测试证据”五列。",
  },
  {
    label: "验收",
    stage: "导读 证据包",
    action:
      "导读验收要求七个原始单元全部有唯一页面，题目与页面 slug 一致，每章至少能指向一个可运行场景。还要检查侧栏顺序严格按 1 到 6 再到附录，现代内容没有冒充原目录，中文版与英文版元数据可以互相追溯。",
    metric: "replayable proof",
    evidence:
      "原书身份固定为 2015 年英文版的 6 章加附录，中文版是 2017 年清华大学出版社译本；学习主线是历史差异、布局、控件、锚点、空间模式、事件源码与 3D 样例；UI Toolkit、TextMeshPro 和新输入系统只作为现代迁移，不计入原始覆盖率；每章都用范围、实验和证据三种视图完成可复现验收",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function UidOfficialLearningMapMapLab() {
  return (
    <UnityUiDesignLab
      title="Unity UI 设计：官方学习地图"
      chapter="导读 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function UidOfficialLearningMapExperimentLab() {
  return (
    <UnityUiDesignLab
      title="Unity UI 设计：官方学习地图"
      chapter="导读 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function UidOfficialLearningMapEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="Unity UI 设计：官方学习地图"
      chapter="导读 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
