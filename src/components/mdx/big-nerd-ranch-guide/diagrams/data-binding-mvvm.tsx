import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "19. Data Binding and MVVM",
  "Different Architectures: Why Bother?",
  "MVVM View Models vs Jetpack ViewModels",
  "Creating BeatBox",
  "Implementing Simple Data Binding",
  "Importing Assets",
  "Accessing Assets",
  "Wiring Up Assets for Use",
  "Binding to Data",
  "For the More Curious: More About Data Binding",
  "For the More Curious: LiveData and Data Binding"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第19章 Data Binding and MVVM" focus="区分MVVM view model与Jetpack ViewModel，通过绑定表达式、observable数据和asset加载建立BeatBox" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第19章 Data Binding and MVVM" focus="区分MVVM view model与Jetpack ViewModel，通过绑定表达式、observable数据和asset加载建立BeatBox" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第19章 Data Binding and MVVM" focus="架构依赖图、绑定生成结果、asset清单、旋转与LiveData更新测试" nodes={nodes} />; }
