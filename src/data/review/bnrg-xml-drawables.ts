/** 复习题库 · XML drawable（bnrg-xml-drawables）。Big Nerd Ranch Guide 第 22 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgXmlDrawablesQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-xd-1",
    chapter: "bnrg-xml-drawables",
    level: 1,
    question: "shape drawable 可以画哪些基本形状？常用属性？",
    answer:
      "rectangle、oval、line、ring。常用：solid（填充色）、stroke（边框）、corners（圆角 radius）、size、gradient（渐变）。定义在 res/drawable/xxx.xml，布局用 android:background=\"@drawable/xxx\"。",
    tags: ["shape", "drawable"],
  },
  {
    id: "bnrg-xd-2",
    chapter: "bnrg-xml-drawables",
    level: 1,
    question: "selector drawable 解决什么问题？",
    answer:
      "根据 View 状态（pressed、focused、selected、enabled）切换不同 drawable——实现按钮按下变色、选中高亮等，无需写 Kotlin 代码监听触摸。",
    tags: ["selector", "状态"],
  },
  {
    id: "bnrg-xd-3",
    chapter: "bnrg-xml-drawables",
    level: 2,
    question: "layer-list 和 inset drawable 各做什么？",
    answer:
      "layer-list：多层 drawable 叠放（如阴影+背景+图标）。inset：给 drawable 加内边距，常用于 Nine-Patch 按钮让文字不贴边。",
    tags: ["layer-list", "inset"],
  },
  {
    id: "bnrg-xd-4",
    chapter: "bnrg-xml-drawables",
    level: 2,
    question: "Vector Drawable 相比 PNG 的优势？",
    answer:
      "矢量无损缩放，单文件适配所有密度，体积小。PNG 需 mdpi/hdpi/xhdpi 多套。Vector 用 path 描述形状，适合图标和简单图形。",
    tags: ["Vector", "PNG"],
  },
  {
    id: "bnrg-xd-5",
    chapter: "bnrg-xml-drawables",
    level: 3,
    question: "selector 里 pressed 状态不生效，常见原因？",
    answer:
      "① View 的 clickable 为 false。② 上层 View 拦截了触摸。③ background 在代码里被覆盖。④ selector 里 item 顺序错误——第一个匹配的生效，应把 pressed 放最前面，默认放最后。",
    tags: ["selector", "排错"],
  },
];

export default bnrgXmlDrawablesQuestions;
