import type { ReviewQuestion } from "./types";

/** 曲线与曲面 复习题 */
export const cg4CurvesSurfacesQuestions: ReviewQuestion[] = [
  {
    id: "cg4-curves-surfaces-1",
    chapter: "cg4-curves-surfaces",
    level: 1,
    question: `什么是 Bezier 曲线？三次 Bezier 曲线由几个控制点定义？`,
    answer: `Bezier 曲线是一种由控制点定义的参数曲线，通过 Bernstein 多项式对控制点加权混合。三次 Bezier 曲线由 4 个控制点定义：P0 和 P3 是端点（曲线经过），P1 和 P2 是控制切线方向的控制点（曲线不一定经过）。参数 t 从 0 到 1，B(t) = (1-t)^3*P0 + 3t(1-t)^2*P1 + 3t^2(1-t)*P2 + t^3*P3。`,
    tags: ["Bezier曲线", "控制点", "Bernstein"],
  },
  {
    id: "cg4-curves-surfaces-2",
    chapter: "cg4-curves-surfaces",
    level: 2,
    question: `Bezier 曲线的凸包性是什么？为什么这个性质在图形学中很重要？`,
    answer: `凸包性指 Bezier 曲线始终位于其控制点的凸包（包含所有控制点的最小凸集）内。重要性：1) 保证曲线不会超出控制点范围，便于碰撞检测和裁剪；2) 保证数值稳定性——不会产生意外的尖刺或发散；3) 支持高效的求交算法——先用控制点凸包做粗略测试再精确计算；4) 支持递归细分（de Casteljau 算法），可用于自适应曲线绘制。`,
    tags: ["凸包性", "Bezier性质"],
  },
  {
    id: "cg4-curves-surfaces-3",
    chapter: "cg4-curves-surfaces",
    level: 3,
    question: `NURBS 相比 Bezier 曲线有什么优势？在什么场景下使用 NURBS？`,
    answer: `NURBS（非均匀有理 B 样条）的优势：1) 精确表示圆锥曲线（圆、椭圆等），Bezier 只能近似；2) 局部控制——移动一个控制点只影响局部曲线段，Bezier 是全局的；3) 通过节点向量控制参数化，可调整曲线在控制点间的分布；4) 权重可调节控制点影响力。NURBS 适用于 CAD/CAM 建模（需要精确曲面）、工业设计（汽车/航空外形）、动画角色建模等需要精确曲面的领域。`,
    tags: ["NURBS", "B样条", "CAD"],
  },
  {
    id: "cg4-curves-surfaces-4",
    chapter: "cg4-curves-surfaces",
    level: 4,
    question: `在实时渲染中如何将参数曲面（如 Bezier 面）转化为可光栅化的三角形？说明曲面细分的流程。`,
    answer: `使用曲面细分着色器（Tessellation Shader）管线：1) Hull Shader（或 TCS）设定细分级别并传递控制点；2) Tessellator（固定功能）根据细分级别在参数域 (u,v) 上生成拓扑网格；3) Domain Shader（或 TES）对每个细分点用 Bezier/B-spline 基函数计算实际 3D 位置和法线；4) 输出三角形进入光栅化。关键决策是自适应细分级别——根据曲面曲率（曲率大处多细分）、屏幕投影面积（占屏大的多细分）和距离（近处多细分）动态调整，平衡质量与性能。`,
    tags: ["曲面细分", "Tessellation Shader", "自适应细分"],
  },
];
