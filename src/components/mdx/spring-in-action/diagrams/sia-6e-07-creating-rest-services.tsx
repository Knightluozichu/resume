import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-07-creating-rest-services",
  "title": "第7章 创建REST服务",
  "concepts": [
    "7 Creating REST services",
    "7.1 Writing RESTful controllers",
    "7.1.1 Retrieving data from the server",
    "7.1.2 Sending data to the server",
    "7.1.3 Updating data on the server",
    "7.1.4 Deleting data from the server",
    "7.2 Enabling data-backed services",
    "7.2.1 Adjusting resource paths and relation names",
    "7.2.2 Paging and sorting",
    "7.3 Consuming REST services",
    "7.3.1 GETting resources",
    "7.3.2 PUTting resources",
    "7.3.3 DELETEing resources",
    "7.3.4 POSTing resource data",
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
    "studio": "REST状态转换与客户端台",
    "boundary": "HTTP representation → controller → aggregate → response",
    "axisA": {
      "label": "HTTP动作",
      "levels": [
        "读取",
        "更新",
        "删除"
      ]
    },
    "axisB": {
      "label": "并发条件",
      "levels": [
        "最新版本",
        "过期版本",
        "资源不存在"
      ]
    },
    "fault": "把所有结果返回200，客户端无法区分不存在、冲突和验证失败",
    "invariant": "资源状态、HTTP语义和副作用一致，重复请求不会制造额外业务结果",
    "signal": "状态码、ETag与仓储写入次数",
    "practiceMode": "code",
    "metric": "REST状态转换与客户端台合同命中率",
    "risk": "并发条件暴露风险",
    "task": "设计资源、HTTP语义、状态码、分页、关系名和客户端错误处理，而不把控制器方法当RPC；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "资源状态机、OpenAPI合同、条件请求测试、分页预算和客户端故障矩阵"
  }
} as const;

export function Sia607CreatingRestServicesMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia607CreatingRestServicesExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia607CreatingRestServicesEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
