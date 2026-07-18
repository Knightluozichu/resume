import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第10章 应用架构设计",
  "10.1 MVC模式",
  "10.2 MVP模式",
  "10.2.1 应用MVP模式",
  "10.2.2 MVP结合RxJava和Dagger2",
  "10.3 MVVM模式",
  "10.3.1 解析Data Binding",
  "10.3.2 应用Data Binding",
  "10.4 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第10章 应用架构设计" focus="比较MVC、MVP和MVVM，实践MVP与RxJava、Dagger 2组合，并解析与应用Data Binding" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第10章 应用架构设计" focus="只按类名宣称使用MVP或MVVM，实际让Activity、Presenter或绑定表达式继续持有全部业务职责" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第10章 应用架构设计" focus="职责图、依赖方向、页面销毁、状态恢复、Presenter测试、绑定表达式与业务逻辑位置审计" nodes={nodes} />; }
