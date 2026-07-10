import type { ReviewQuestion } from "./types";

export const csecBorderShapesQuestions: ReviewQuestion[] = [
  {
    id: "csec-border-shapes-1",
    chapter: "csec-border-shapes",
    level: 2,
    question: `box-shadow 模拟的多重边框和真 border 有什么关键差异？`,
    answer:
      `三点关键差异：①box-shadow 不占布局空间——它不影响盒模型尺寸，也不会把相邻元素推开；②box-shadow 不响应鼠标事件——点击在「边框」区域不会触发元素的 click；③box-shadow 在内联元素上表现可能与 border 不同。当你需要边框参与布局计算或响应交互时，还是得用 border + 嵌套元素。box-shadow 模拟的边框适合纯视觉装饰场景。`,
    tags: ["box-shadow", "边框"],
  },
  {
    id: "csec-border-shapes-2",
    chapter: "csec-border-shapes",
    level: 3,
    question: `用 box-shadow 模拟三重边框时，三层 shadow 的 spread 值应该怎么设置？`,
    answer:
      `三层 box-shadow 的 spread radius 必须递增，每层的 spread = 前面所有层宽度之和 + 当前层宽度。例如 border 本身 5px，三层 shadow 各 5px：第一层 spread 为 5px（紧贴 border 外侧），第二层 spread 为 10px（5px border + 5px 第一层），第三层 spread 为 15px。代码：\`box-shadow: 0 0 0 5px #fb3, 0 0 0 10px #655, 0 0 0 15px #58a;\`。因为 box-shadow 是叠加的，后面的大阴影会覆盖前面的小阴影的外圈，只露出内圈那条环。`,
    tags: ["box-shadow", "多重边框"],
  },
  {
    id: "csec-border-shapes-3",
    chapter: "csec-border-shapes",
    level: 3,
    question: `border-radius: 50% 在不同宽高比的元素上分别产生什么形状？`,
    answer:
      `border-radius: 50% 让四个角的水平和垂直半径都等于各自边长的 50%。当元素宽高相等（正方形）时，四角圆弧拼合为正圆。当宽高不等（矩形）时，水平半径 = 宽的 50%，垂直半径 = 高的 50%，四角圆弧拼合为椭圆——水平方向和垂直方向半径不同，形成贴合矩形边界的椭圆而非正圆。这就是为什么 \`border-radius: 50%\` 在矩形按钮上不会变成圆形，要做圆形按钮必须保证 width = height。`,
    tags: ["border-radius", "圆角"],
  },
  {
    id: "csec-border-shapes-4",
    chapter: "csec-border-shapes",
    level: 4,
    question: `box-shadow、outline、border-image 三种边框方案各适合什么场景？`,
    answer:
      `box-shadow spread 适合多层纯色边框——叠加灵活、不占布局，但不响应事件。outline 适合在 border 外再加一层——可设 outline-offset 控制间距，但只能一层。border-image 适合图案边框（渐变、花纹、自定义虚线）——把图片切九宫格自动拉伸，但圆角处可能不连续。选型判断：多层纯色用 box-shadow、单层带间距用 outline、需要图案用 border-image、需要参与布局/交互用 border + 嵌套。`,
    tags: ["box-shadow", "outline", "border-image", "选型"],
  },
];
