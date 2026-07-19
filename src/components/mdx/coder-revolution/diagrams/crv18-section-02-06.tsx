import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-06",
  title: "2.6 JSP：一个装配工的没落",
  family: "web",
  nodes: ["接收请求", "调用业务", "构造模型", "模板渲染", "转义响应"],
  concepts: [
    "2.6 JSP：一个装配工的没落",
    "黑暗岁月",
    "服务器端动态页面",
    "标签库",
    "模板引擎",
    "草根搅局",
  ],
  mechanism:
    "服务端页面把模型数据交给视图模板渲染；标签库和模板引擎减少脚本混写，但输出上下文仍需正确转义",
  success: "2.6 JSP：一个装配工的没落 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.6 JSP：一个装配工的没落 在“把未经 HTML 上下文转义的用户内容直接插入页面，形成脚本注入”处拒绝",
} as const;

export function Crv18Section0206Lab() {
  return <CoderMechanismLab {...profile} />;
}
