import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-02-developing-web-applications",
  "title": "第2章 开发Web应用",
  "concepts": [
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
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "MVC表单绑定与校验台",
    "boundary": "request → binding → validation → controller → template",
    "axisA": {
      "label": "输入样本",
      "levels": [
        "合法",
        "字段缺失",
        "恶意负载"
      ]
    },
    "axisB": {
      "label": "渲染路径",
      "levels": [
        "GET",
        "POST失败",
        "POST成功"
      ]
    },
    "fault": "校验失败仍进入领域写入，或错误消息没有回到对应字段",
    "invariant": "非法输入不产生领域副作用，合法输入只提交一次且视图状态一致",
    "signal": "BindingResult、响应状态与写入计数",
    "practiceMode": "code",
    "metric": "MVC表单绑定与校验台合同命中率",
    "risk": "渲染路径暴露风险",
    "task": "把领域模型、控制器、表单绑定、校验与模板渲染组织成可观察的Spring MVC请求链；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "请求时序图、表单输入边界表、MockMvc断言和模板选择记录"
  }
} as const;

export function Sia602DevelopingWebApplicationsMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia602DevelopingWebApplicationsExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia602DevelopingWebApplicationsEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
