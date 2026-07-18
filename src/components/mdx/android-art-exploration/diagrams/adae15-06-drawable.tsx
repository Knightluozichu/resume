import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第6章 Android的Drawable",
  "6.1 Drawable简介",
  "6.2 Drawable的分类",
  "6.2.1 BitmapDrawable",
  "6.2.2 ShapeDrawable",
  "6.2.3 LayerDrawable",
  "6.2.4 StateListDrawable",
  "6.2.5 LevelListDrawable",
  "6.2.6 TransitionDrawable",
  "6.2.7 InsetDrawable",
  "6.2.8 ScaleDrawable",
  "6.2.9 ClipDrawable",
  "6.3 自定义Drawable"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第6章 Android的Drawable" focus="比较九类Drawable的尺寸、状态、层叠、级别、过渡、嵌入、缩放与裁剪语义，并实现自定义Drawable" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第6章 Android的Drawable" focus="把Drawable误当Bitmap，忽略intrinsic size、state、level、bounds和共享ConstantState" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第6章 Android的Drawable" focus="Drawable选型表、状态矩阵、层级图、level实验、边界尺寸和自定义绘制测试" nodes={nodes} />; }
