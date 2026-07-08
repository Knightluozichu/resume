import type { ReviewQuestion } from "./types";

export const cswTransformPerspectiveQuestions: ReviewQuestion[] = [
  {
    id: "csw-transform-perspective-1",
    chapter: "csw-transform-perspective",
    level: 2,
    question: "transform 有哪些二维变换函数？transform-origin 的作用是什么？",
    answer:
      "二维变换函数：translate(tx,ty) 平移、scale(sx,sy) 缩放、rotate(angle) 旋转、skew(x,y) 倾斜。transform-origin 设置变换的原点（默认 50% 50% 即中心），所有变换以它为基准：rotate 绕它转、scale 以它为中心缩放。改为 top left（0 0）则从左上角旋转/缩放。transform 不影响文档流——其他元素不会因某个元素 transform 而重新布局，这是它性能高的原因之一。",
    tags: ["transform", "translate", "transform-origin"],
  },
  {
    id: "csw-transform-perspective-2",
    chapter: "csw-transform-perspective",
    level: 3,
    question: "transform 的合成顺序是怎样的？translate(100px) rotate(45deg) 和 rotate(45deg) translate(100px) 结果为什么不同？",
    answer:
      "transform 多个函数从右往左执行（类似函数嵌套 f(g(x)) 先算 g）。translate(100px) rotate(45deg)：先 rotate（元素绕原点旋转 45 度），再 translate（此时坐标系也已旋转，平移沿旋转后的方向）。rotate(45deg) translate(100px)：先 translate（沿原始坐标系水平移 100px），再 rotate（绕原点旋转 45 度）。两者旋转和平移的参照系不同，最终位置不同。矩阵乘法不可交换（A×B ≠ B×A），所以 transform 顺序不可交换。",
    tags: ["transform", "合成顺序", "矩阵"],
  },
  {
    id: "csw-transform-perspective-3",
    chapter: "csw-transform-perspective",
    level: 3,
    question: "perspective 的值大小如何影响 3D 效果？为什么需要设在父元素上？",
    answer:
      "perspective 值代表视点到屏幕的距离（z=0 平面）。值越小，视点越近，透视效果越强（近大远小更夸张，类似广角镜头）；值越大，视点越远，透视越弱（接近正交投影，类似长焦镜头）。设在父元素上是因为 perspective 定义的是「观察这个 3D 空间的视点」，子元素在这个空间内做 3D 变换时才需要统一的视点参照。如果设在元素自身（用 transform:perspective(800px) rotateY(45deg)），则只对该元素自身生效，不会影响兄弟元素的相对 3D 关系。",
    tags: ["perspective", "3D", "透视"],
  },
  {
    id: "csw-transform-perspective-4",
    chapter: "csw-transform-perspective",
    level: 4,
    question: "为什么说 transform 不触发重排？transform-style:preserve-3d 的作用是什么？",
    answer:
      "transform 不触发重排的原因：它操作的是合成层（compositing layer）上的位图，而非布局树。浏览器把元素提升到独立合成层，把已绘制好的元素位图直接在 GPU 上移动/缩放/旋转，不重新计算布局（layout），也不重新绘制（paint），只做最后的合成（composite）。这是渲染流水线最轻的一步。transform-style:preserve-3d 的作用：让子元素保留 3D 空间关系——默认父元素会把子元素的 3D 变换「压平」到 2D 平面，设 preserve-3d 后子元素在父元素的 3D 空间内渲染，各子元素之间有真实的 3D 相对位置（如做立方体六个面时必须设）。",
    tags: ["transform", "重排", "合成层", "preserve-3d"],
  },
];
