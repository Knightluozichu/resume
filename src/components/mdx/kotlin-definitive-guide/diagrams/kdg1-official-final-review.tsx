import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "Introducing Kotlin",
  "1. Your First Kotlin Application",
  "2. Variables, Constants, and Types",
  "3. Conditionals",
  "4. Functions",
  "5. Anonymous Functions and the Function Type",
  "6. Null Safety and Exceptions",
  "7. Strings",
  "8. Numbers",
  "9. Standard Functions",
  "10. Lists and Sets",
  "11. Maps",
  "12. Defining Classes",
  "13. Initialization",
  "14. Inheritance",
  "15. Objects",
  "16. Interfaces and Abstract Classes",
  "17. Generics",
  "18. Extensions",
  "19. Functional Programming Basics",
  "20. Java Interoperability",
  "21. Building Your First Android Application with Kotlin",
  "22. Introduction to Coroutines",
  "23. Afterword",
  "A. More Challenges",
  "Glossary",
  "Index"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="《Kotlin编程权威指南》全书总复习" focus="跨27个正式单元重建从类型安全到Android异步边界的完整能力链，并用反例完成闭卷验收" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="《Kotlin编程权威指南》全书总复习" focus="只按章节回忆术语，无法解释跨章节的数据与控制流" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="《Kotlin编程权威指南》全书总复习" focus="全书概念图、综合项目、失败注入、迁移账本和独立交接包" nodes={nodes} />; }
