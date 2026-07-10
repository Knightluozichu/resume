import type { ReviewQuestion } from "./types";

/** WebGL 基础与上下文 复习题 */
export const dogWebglBasicsQuestions: ReviewQuestion[] = [
  {
    id: "dog-webgl-basics-1",
    chapter: "dog-webgl-basics",
    level: 1,
    question: `如何获取 WebGL 上下文？WebGL2 相比 WebGL1 有哪些主要新能力？`,
    answer: `canvas.getContext('webgl2')，不支持则回退 getContext('webgl')。WebGL2（≈ES3）新增 3D 纹理、变换反馈、默认实例化、统一缓冲 UBO、GLSL 3.00、多重渲染目标 MRT、原生 VAO；WebGL1 需扩展才有 VAO/实例化。`,
    tags: ["上下文", "WebGL2"],
  },
  {
    id: "dog-webgl-basics-2",
    chapter: "dog-webgl-basics",
    level: 2,
    question: `上下文丢失后原来的资源还能用吗？恢复流程是什么？`,
    answer: `不能，所有 GL 资源（程序、缓冲、纹理、VAO、状态）全部失效。恢复流程：webglcontextlost 事件调 preventDefault 阻止默认销毁并标记失效；webglcontextrestored 触发时重新创建着色器、缓冲、纹理并重设状态；渲染循环在失效期间跳过绘制。关键是 preventDefault，否则上下文永久丢失。`,
    tags: ["上下文丢失", "恢复"],
  },
  {
    id: "dog-webgl-basics-3",
    chapter: "dog-webgl-basics",
    level: 3,
    question: `为什么 uniform/attribute 位置要在链接后查询？getAttribLocation 返回 -1 是什么含义？`,
    answer: `位置在程序链接时才确定，链接前查询无效，改着色器需重新链接重查。返回 -1 表示该属性在着色器中未被使用而被优化掉，或查询了不存在的属性；此时无需设定属性指针，跳过即可，不算错误。`,
    tags: ["位置查询", "链接"],
  },
  {
    id: "dog-webgl-basics-4",
    chapter: "dog-webgl-basics",
    level: 4,
    question: `切到别的标签页再切回，画面全黑，如何诊断与修复？`,
    answer: `诊断：可能是浏览器回收 GPU 资源触发上下文丢失，原 VBO/纹理/程序失效，未处理恢复导致全黑。修复：监听 webglcontextlost 调 preventDefault 阻止默认销毁、标记 resourcesValid=false；监听 webglcontextrestored 重建全部资源与状态、置 resourcesValid=true；render 循环开头检测 resourcesValid，失效期间 requestAnimationFrame 跳过绘制。另外也检查 canvas 尺寸是否随显示尺寸更新（resizeCanvasToDisplaySize）。`,
    tags: ["综合", "上下文丢失", "诊断"],
  },
];
