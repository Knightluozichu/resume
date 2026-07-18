import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "2 Developing web applications",
  "2.1 Displaying information",
  "2.1.1 Establishing the domain",
  "2.1.2 Creating a controller class",
  "2.1.3 Designing the view",
  "2.2 Processing form submission",
  "2.3 Validating form input",
  "2.3.1 Declaring validation rules",
  "2.3.2 Performing validation at form binding",
  "2.3.3 Displaying validation errors",
  "2.4 Working with view controllers",
  "2.5 Choosing a view template library",
  "2.5.1 Caching templates",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第2章 开发Web应用" focus="把领域模型、控制器、表单绑定、校验与模板渲染组织成可观察的Spring MVC请求链" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第2章 开发Web应用" focus="分别提交合法、字段缺失、格式错误和业务冲突输入，检查控制器是否保持失败原子性并返回可操作错误" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第2章 开发Web应用" focus="请求时序图、表单输入边界表、MockMvc断言和模板选择记录" nodes={nodes} />;
}
