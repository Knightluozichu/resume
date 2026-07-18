import type { ReviewQuestion } from "./types";

export const jpc22OfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "jpc-22-official-learning-map-q1",
    "chapter": "jpc-22-official-learning-map",
    "level": 1,
    "question": "为什么《Jetpack Compose从入门到实战》权威学习地图必须保留11个正式目录节点？",
    "answer": "因为第1章 全新的Android UI框架、第2章 了解常用UI组件、第3章 定制UI视图、第4章 状态管理与重组等节点共同组成“以11章197个节点贯通声明式基础、组件、状态、渲染、动画、手势、导航、生态与两个产品实战”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》权威学习地图"
    ]
  },
  {
    "id": "jpc-22-official-learning-map-q2",
    "chapter": "jpc-22-official-learning-map",
    "level": 1,
    "question": "《Jetpack Compose从入门到实战》权威学习地图的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由11章197节点矩阵、版本卡、状态到渲染因果链、Tetris与Chatty交付路线、现代迁移账本证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》权威学习地图"
    ]
  },
  {
    "id": "jpc-22-official-learning-map-q3",
    "chapter": "jpc-22-official-learning-map",
    "level": 2,
    "question": "《Jetpack Compose从入门到实战》权威学习地图应怎样设计失败实验？",
    "answer": "主动制造“把全书压缩成布局、状态和导航几页，遗漏渲染流程、手势、第三方库以及两个完整项目”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》权威学习地图"
    ]
  },
  {
    "id": "jpc-22-official-learning-map-q4",
    "chapter": "jpc-22-official-learning-map",
    "level": 2,
    "question": "《Jetpack Compose从入门到实战》权威学习地图为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》权威学习地图"
    ]
  },
  {
    "id": "jpc-22-official-learning-map-q5",
    "chapter": "jpc-22-official-learning-map",
    "level": 3,
    "question": "《Jetpack Compose从入门到实战》权威学习地图怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》权威学习地图"
    ]
  },
  {
    "id": "jpc-22-official-learning-map-q6",
    "chapter": "jpc-22-official-learning-map",
    "level": 3,
    "question": "《Jetpack Compose从入门到实战》权威学习地图独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、11章197节点矩阵、版本卡、状态到渲染因果链、Tetris与Chatty交付路线、现代迁移账本、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》权威学习地图"
    ]
  },
  {
    "id": "jpc-22-01-new-android-ui-q1",
    "chapter": "jpc-22-01-new-android-ui",
    "level": 1,
    "question": "为什么第1章 全新的Android UI框架必须保留18个正式目录节点？",
    "answer": "因为第1章 全新的Android UI框架、1.1 Jetpack Compose是什么、1.1.1 谷歌为什么要推出Compose、1.1.2 命令式UI与声明式UI等节点共同组成“从声明式UI、Compose API原则与View关系，走到环境部署、首个应用、预览和已有项目接入”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第1章 全新的Android UI框架"
    ]
  },
  {
    "id": "jpc-22-01-new-android-ui-q2",
    "chapter": "jpc-22-01-new-android-ui",
    "level": 1,
    "question": "第1章 全新的Android UI框架的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由状态到UI映射、编译配置、预览与设备结果、版本目录、View与Compose双向边界证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第1章 全新的Android UI框架"
    ]
  },
  {
    "id": "jpc-22-01-new-android-ui-q3",
    "chapter": "jpc-22-01-new-android-ui",
    "level": 2,
    "question": "第1章 全新的Android UI框架应怎样设计失败实验？",
    "answer": "主动制造“把声明式UI理解成少写XML，仍在组合期间执行I/O或手动命令式修改组件”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第1章 全新的Android UI框架"
    ]
  },
  {
    "id": "jpc-22-01-new-android-ui-q4",
    "chapter": "jpc-22-01-new-android-ui",
    "level": 2,
    "question": "第1章 全新的Android UI框架为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第1章 全新的Android UI框架"
    ]
  },
  {
    "id": "jpc-22-01-new-android-ui-q5",
    "chapter": "jpc-22-01-new-android-ui",
    "level": 3,
    "question": "第1章 全新的Android UI框架怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第1章 全新的Android UI框架"
    ]
  },
  {
    "id": "jpc-22-01-new-android-ui-q6",
    "chapter": "jpc-22-01-new-android-ui",
    "level": 3,
    "question": "第1章 全新的Android UI框架独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、状态到UI映射、编译配置、预览与设备结果、版本目录、View与Compose双向边界、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第1章 全新的Android UI框架"
    ]
  },
  {
    "id": "jpc-22-02-common-ui-components-q1",
    "chapter": "jpc-22-02-common-ui-components",
    "level": 1,
    "question": "为什么第2章 了解常用UI组件必须保留22个正式目录节点？",
    "answer": "因为第2章 了解常用UI组件、2.1 Modifier修饰符、2.1.1 常用修饰符、2.1.2 作用域限定Modifier修饰符等节点共同组成“沿Modifier顺序与作用域，组合文本、图片、按钮、选择器、对话框、基础布局、Scaffold和惰性列表”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第2章 了解常用UI组件"
    ]
  },
  {
    "id": "jpc-22-02-common-ui-components-q2",
    "chapter": "jpc-22-02-common-ui-components",
    "level": 1,
    "question": "第2章 了解常用UI组件的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由Modifier顺序对照、作用域编译约束、布局边界、列表稳定键、滚动状态与语义树证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第2章 了解常用UI组件"
    ]
  },
  {
    "id": "jpc-22-02-common-ui-components-q3",
    "chapter": "jpc-22-02-common-ui-components",
    "level": 2,
    "question": "第2章 了解常用UI组件应怎样设计失败实验？",
    "answer": "主动制造“把Modifier当成无序样式集合，或让惰性列表使用位置作为身份导致状态错位”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第2章 了解常用UI组件"
    ]
  },
  {
    "id": "jpc-22-02-common-ui-components-q4",
    "chapter": "jpc-22-02-common-ui-components",
    "level": 2,
    "question": "第2章 了解常用UI组件为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第2章 了解常用UI组件"
    ]
  },
  {
    "id": "jpc-22-02-common-ui-components-q5",
    "chapter": "jpc-22-02-common-ui-components",
    "level": 3,
    "question": "第2章 了解常用UI组件怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第2章 了解常用UI组件"
    ]
  },
  {
    "id": "jpc-22-02-common-ui-components-q6",
    "chapter": "jpc-22-02-common-ui-components",
    "level": 3,
    "question": "第2章 了解常用UI组件独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、Modifier顺序对照、作用域编译约束、布局边界、列表稳定键、滚动状态与语义树、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第2章 了解常用UI组件"
    ]
  },
  {
    "id": "jpc-22-03-custom-ui-q1",
    "chapter": "jpc-22-03-custom-ui",
    "level": 1,
    "question": "为什么第3章 定制UI视图必须保留12个正式目录节点？",
    "answer": "因为第3章 定制UI视图、3.1 构建UI页面、3.1.1 配置颜色、字体与形状、3.1.2 Welcome欢迎页等节点共同组成“用颜色、字体、形状和页面槽构建Welcome、LoginIn、Home，再以MaterialTheme和CompositionLocal形成主题方案”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第3章 定制UI视图"
    ]
  },
  {
    "id": "jpc-22-03-custom-ui-q2",
    "chapter": "jpc-22-03-custom-ui",
    "level": 1,
    "question": "第3章 定制UI视图的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由设计令牌表、三类页面状态、浅色深色预览矩阵、CompositionLocal提供与读取边界证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第3章 定制UI视图"
    ]
  },
  {
    "id": "jpc-22-03-custom-ui-q3",
    "chapter": "jpc-22-03-custom-ui",
    "level": 2,
    "question": "第3章 定制UI视图应怎样设计失败实验？",
    "answer": "主动制造“在每个组件中硬编码颜色尺寸，或把频繁变化的业务状态塞进CompositionLocal形成隐式依赖”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第3章 定制UI视图"
    ]
  },
  {
    "id": "jpc-22-03-custom-ui-q4",
    "chapter": "jpc-22-03-custom-ui",
    "level": 2,
    "question": "第3章 定制UI视图为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第3章 定制UI视图"
    ]
  },
  {
    "id": "jpc-22-03-custom-ui-q5",
    "chapter": "jpc-22-03-custom-ui",
    "level": 3,
    "question": "第3章 定制UI视图怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第3章 定制UI视图"
    ]
  },
  {
    "id": "jpc-22-03-custom-ui-q6",
    "chapter": "jpc-22-03-custom-ui",
    "level": 3,
    "question": "第3章 定制UI视图独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、设计令牌表、三类页面状态、浅色深色预览矩阵、CompositionLocal提供与读取边界、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第3章 定制UI视图"
    ]
  },
  {
    "id": "jpc-22-04-state-recomposition-q1",
    "chapter": "jpc-22-04-state-recomposition",
    "level": 1,
    "question": "为什么第4章 状态管理与重组必须保留24个正式目录节点？",
    "answer": "因为第4章 状态管理与重组、4.1 状态管理、4.1.1 什么是状态、4.1.2 单向数据流等节点共同组成“贯通单向数据流、无状态与有状态组件、状态上提、恢复、ViewModel、流转换、重组范围、生命周期和副作用”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第4章 状态管理与重组"
    ]
  },
  {
    "id": "jpc-22-04-state-recomposition-q2",
    "chapter": "jpc-22-04-state-recomposition",
    "level": 1,
    "question": "第4章 状态管理与重组的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由事件到状态轨迹、进程恢复测试、重组计数、稳定性判据、Effect键变化与取消日志证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第4章 状态管理与重组"
    ]
  },
  {
    "id": "jpc-22-04-state-recomposition-q3",
    "chapter": "jpc-22-04-state-recomposition",
    "level": 2,
    "question": "第4章 状态管理与重组应怎样设计失败实验？",
    "answer": "主动制造“在组合期间直接写状态或启动异步任务，造成重组循环、重复请求和越过生命周期的回调”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第4章 状态管理与重组"
    ]
  },
  {
    "id": "jpc-22-04-state-recomposition-q4",
    "chapter": "jpc-22-04-state-recomposition",
    "level": 2,
    "question": "第4章 状态管理与重组为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第4章 状态管理与重组"
    ]
  },
  {
    "id": "jpc-22-04-state-recomposition-q5",
    "chapter": "jpc-22-04-state-recomposition",
    "level": 3,
    "question": "第4章 状态管理与重组怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第4章 状态管理与重组"
    ]
  },
  {
    "id": "jpc-22-04-state-recomposition-q6",
    "chapter": "jpc-22-04-state-recomposition",
    "level": 3,
    "question": "第4章 状态管理与重组独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、事件到状态轨迹、进程恢复测试、重组计数、稳定性判据、Effect键变化与取消日志、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第4章 状态管理与重组"
    ]
  },
  {
    "id": "jpc-22-05-rendering-pipeline-q1",
    "chapter": "jpc-22-05-rendering-pipeline",
    "level": 1,
    "question": "为什么第5章 Compose组件渲染流程必须保留13个正式目录节点？",
    "answer": "因为第5章 Compose组件渲染流程、5.1 组合、5.2 布局、5.2.1 Layout Modifier等节点共同组成“从组合进入测量、布局与绘制，比较Layout Modifier、Layout、Intrinsic、SubcomposeLayout、Canvas和DrawModifier”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第5章 Compose组件渲染流程"
    ]
  },
  {
    "id": "jpc-22-05-rendering-pipeline-q2",
    "chapter": "jpc-22-05-rendering-pipeline",
    "level": 1,
    "question": "第5章 Compose组件渲染流程的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由组合树、约束传递、测量次数、放置坐标、绘制层次、固有测量与子组合触发记录证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第5章 Compose组件渲染流程"
    ]
  },
  {
    "id": "jpc-22-05-rendering-pipeline-q3",
    "chapter": "jpc-22-05-rendering-pipeline",
    "level": 2,
    "question": "第5章 Compose组件渲染流程应怎样设计失败实验？",
    "answer": "主动制造“违反单次测量约束，或为读取尺寸滥用Intrinsic和SubcomposeLayout导致额外组合与布局成本”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第5章 Compose组件渲染流程"
    ]
  },
  {
    "id": "jpc-22-05-rendering-pipeline-q4",
    "chapter": "jpc-22-05-rendering-pipeline",
    "level": 2,
    "question": "第5章 Compose组件渲染流程为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第5章 Compose组件渲染流程"
    ]
  },
  {
    "id": "jpc-22-05-rendering-pipeline-q5",
    "chapter": "jpc-22-05-rendering-pipeline",
    "level": 3,
    "question": "第5章 Compose组件渲染流程怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第5章 Compose组件渲染流程"
    ]
  },
  {
    "id": "jpc-22-05-rendering-pipeline-q6",
    "chapter": "jpc-22-05-rendering-pipeline",
    "level": 3,
    "question": "第5章 Compose组件渲染流程独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、组合树、约束传递、测量次数、放置坐标、绘制层次、固有测量与子组合触发记录、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第5章 Compose组件渲染流程"
    ]
  },
  {
    "id": "jpc-22-06-animation-q1",
    "chapter": "jpc-22-06-animation",
    "level": 1,
    "question": "为什么第6章 让页面动起来：动画必须保留32个正式目录节点？",
    "answer": "因为第6章 让页面动起来：动画、6.1 动画分类、6.2 高级别动画API、6.2.1 AnimatedVisibility等节点共同组成“从高级与低级动画API进入Transition、AnimationSpec、AnimationVector，并完成骨架屏和收藏按钮两项实战”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第6章 让页面动起来：动画"
    ]
  },
  {
    "id": "jpc-22-06-animation-q2",
    "chapter": "jpc-22-06-animation",
    "level": 1,
    "question": "第6章 让页面动起来：动画的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由起止状态、时钟采样、速度连续性、取消规则、转换器往返误差、低动画偏好与截图序列证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第6章 让页面动起来：动画"
    ]
  },
  {
    "id": "jpc-22-06-animation-q3",
    "chapter": "jpc-22-06-animation",
    "level": 2,
    "question": "第6章 让页面动起来：动画应怎样设计失败实验？",
    "answer": "主动制造“为装饰同时启动无限动画，忽略生命周期、可访问性、帧预算和业务状态的唯一来源”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第6章 让页面动起来：动画"
    ]
  },
  {
    "id": "jpc-22-06-animation-q4",
    "chapter": "jpc-22-06-animation",
    "level": 2,
    "question": "第6章 让页面动起来：动画为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第6章 让页面动起来：动画"
    ]
  },
  {
    "id": "jpc-22-06-animation-q5",
    "chapter": "jpc-22-06-animation",
    "level": 3,
    "question": "第6章 让页面动起来：动画怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第6章 让页面动起来：动画"
    ]
  },
  {
    "id": "jpc-22-06-animation-q6",
    "chapter": "jpc-22-06-animation",
    "level": 3,
    "question": "第6章 让页面动起来：动画独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、起止状态、时钟采样、速度连续性、取消规则、转换器往返误差、低动画偏好与截图序列、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第6章 让页面动起来：动画"
    ]
  },
  {
    "id": "jpc-22-07-gestures-q1",
    "chapter": "jpc-22-07-gestures",
    "level": 1,
    "question": "为什么第7章 增进交互体验：手势处理必须保留14个正式目录节点？",
    "answer": "因为第7章 增进交互体验：手势处理、7.1 常用的手势处理Modifier、7.1.1 Clickable点击、7.1.2 CombinedClickable复合点击等节点共同组成“比较点击、复合点击、拖动、滑动、多点触控、滚动和嵌套滚动，再以PointerInput定制事件并结合动画”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第7章 增进交互体验：手势处理"
    ]
  },
  {
    "id": "jpc-22-07-gestures-q2",
    "chapter": "jpc-22-07-gestures",
    "level": 1,
    "question": "第7章 增进交互体验：手势处理的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由指针序列、消费标记、触摸阈值、速度、取消、父子滚动分配、语义动作与多指轨迹证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第7章 增进交互体验：手势处理"
    ]
  },
  {
    "id": "jpc-22-07-gestures-q3",
    "chapter": "jpc-22-07-gestures",
    "level": 2,
    "question": "第7章 增进交互体验：手势处理应怎样设计失败实验？",
    "answer": "主动制造“直接从原始坐标判断手势而忽略事件消费、触摸阈值、取消和可访问性语义”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第7章 增进交互体验：手势处理"
    ]
  },
  {
    "id": "jpc-22-07-gestures-q4",
    "chapter": "jpc-22-07-gestures",
    "level": 2,
    "question": "第7章 增进交互体验：手势处理为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第7章 增进交互体验：手势处理"
    ]
  },
  {
    "id": "jpc-22-07-gestures-q5",
    "chapter": "jpc-22-07-gestures",
    "level": 3,
    "question": "第7章 增进交互体验：手势处理怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第7章 增进交互体验：手势处理"
    ]
  },
  {
    "id": "jpc-22-07-gestures-q6",
    "chapter": "jpc-22-07-gestures",
    "level": 3,
    "question": "第7章 增进交互体验：手势处理独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、指针序列、消费标记、触摸阈值、速度、取消、父子滚动分配、语义动作与多指轨迹、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第7章 增进交互体验：手势处理"
    ]
  },
  {
    "id": "jpc-22-08-navigation-hilt-q1",
    "chapter": "jpc-22-08-navigation-hilt",
    "level": 1,
    "question": "为什么第8章 为Compose添加页面导航必须保留13个正式目录节点？",
    "answer": "因为第8章 为Compose添加页面导航、8.1 在Compose中使用Navigation、8.1.1 认识Jetpack Navigation、8.1.2 Navigation for Compose等节点共同组成“建立Navigation图、参数、底部导航、嵌套图、深链和ViewModel作用域，并用Hilt提供依赖”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第8章 为Compose添加页面导航"
    ]
  },
  {
    "id": "jpc-22-08-navigation-hilt-q2",
    "chapter": "jpc-22-08-navigation-hilt",
    "level": 1,
    "question": "第8章 为Compose添加页面导航的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由路由表、返回栈轨迹、参数编码、深链测试、进程恢复、导航图级ViewModel与依赖作用域证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第8章 为Compose添加页面导航"
    ]
  },
  {
    "id": "jpc-22-08-navigation-hilt-q3",
    "chapter": "jpc-22-08-navigation-hilt",
    "level": 2,
    "question": "第8章 为Compose添加页面导航应怎样设计失败实验？",
    "answer": "主动制造“把完整对象塞进路由、在组合重组时重复导航，或让ViewModel与依赖作用域脱离返回栈所有者”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第8章 为Compose添加页面导航"
    ]
  },
  {
    "id": "jpc-22-08-navigation-hilt-q4",
    "chapter": "jpc-22-08-navigation-hilt",
    "level": 2,
    "question": "第8章 为Compose添加页面导航为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第8章 为Compose添加页面导航"
    ]
  },
  {
    "id": "jpc-22-08-navigation-hilt-q5",
    "chapter": "jpc-22-08-navigation-hilt",
    "level": 3,
    "question": "第8章 为Compose添加页面导航怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第8章 为Compose添加页面导航"
    ]
  },
  {
    "id": "jpc-22-08-navigation-hilt-q6",
    "chapter": "jpc-22-08-navigation-hilt",
    "level": 3,
    "question": "第8章 为Compose添加页面导航独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、路由表、返回栈轨迹、参数编码、深链测试、进程恢复、导航图级ViewModel与依赖作用域、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第8章 为Compose添加页面导航"
    ]
  },
  {
    "id": "jpc-22-09-third-party-q1",
    "chapter": "jpc-22-09-third-party",
    "level": 1,
    "question": "为什么第9章 Accompanist与第三方组件库必须保留17个正式目录节点？",
    "answer": "因为第9章 Accompanist与第三方组件库、9.1 Accompanist、9.1.1 SystemUiController、9.1.2 Pager等节点共同组成“核对Accompanist的系统栏、Pager、刷新、流式布局与Insets，并集成Lottie动画和Coil图片”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第9章 Accompanist与第三方组件库"
    ]
  },
  {
    "id": "jpc-22-09-third-party-q2",
    "chapter": "jpc-22-09-third-party",
    "level": 1,
    "question": "第9章 Accompanist与第三方组件库的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由依赖版本矩阵、资源失败态、加载生命周期、缓存命中、系统栏与Insets截图、替代API映射证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第9章 Accompanist与第三方组件库"
    ]
  },
  {
    "id": "jpc-22-09-third-party-q3",
    "chapter": "jpc-22-09-third-party",
    "level": 2,
    "question": "第9章 Accompanist与第三方组件库应怎样设计失败实验？",
    "answer": "主动制造“复制过时第三方示例却不锁版本、不处理加载失败，也不记录功能迁入官方库后的替代路径”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第9章 Accompanist与第三方组件库"
    ]
  },
  {
    "id": "jpc-22-09-third-party-q4",
    "chapter": "jpc-22-09-third-party",
    "level": 2,
    "question": "第9章 Accompanist与第三方组件库为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第9章 Accompanist与第三方组件库"
    ]
  },
  {
    "id": "jpc-22-09-third-party-q5",
    "chapter": "jpc-22-09-third-party",
    "level": 3,
    "question": "第9章 Accompanist与第三方组件库怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第9章 Accompanist与第三方组件库"
    ]
  },
  {
    "id": "jpc-22-09-third-party-q6",
    "chapter": "jpc-22-09-third-party",
    "level": 3,
    "question": "第9章 Accompanist与第三方组件库独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、依赖版本矩阵、资源失败态、加载生命周期、缓存命中、系统栏与Insets截图、替代API映射、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第9章 Accompanist与第三方组件库"
    ]
  },
  {
    "id": "jpc-22-10-tetris-q1",
    "chapter": "jpc-22-10-tetris",
    "level": 1,
    "question": "为什么第10章 项目实战：小游戏Tetris必须保留18个正式目录节点？",
    "answer": "因为第10章 项目实战：小游戏Tetris、10.1 整体项目架构、10.2 砖块矩阵（BrickMatrix）、10.2.1 drawBrick绘制砖块单元等节点共同组成“从整体架构、BrickMatrix与Sprite绘制，组装GameBody输入，再以ViewState、Action和reduce驱动游戏”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第10章 项目实战：小游戏Tetris"
    ]
  },
  {
    "id": "jpc-22-10-tetris-q2",
    "chapter": "jpc-22-10-tetris",
    "level": 1,
    "question": "第10章 项目实战：小游戏Tetris的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由棋盘坐标断言、形状旋转样本、碰撞与消行测试、动作序列、归约快照、可重复随机种子证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第10章 项目实战：小游戏Tetris"
    ]
  },
  {
    "id": "jpc-22-10-tetris-q3",
    "chapter": "jpc-22-10-tetris",
    "level": 2,
    "question": "第10章 项目实战：小游戏Tetris应怎样设计失败实验？",
    "answer": "主动制造“把计时、碰撞、绘制和输入都写进Composable，导致状态不可重放且每次重组产生新的游戏循环”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第10章 项目实战：小游戏Tetris"
    ]
  },
  {
    "id": "jpc-22-10-tetris-q4",
    "chapter": "jpc-22-10-tetris",
    "level": 2,
    "question": "第10章 项目实战：小游戏Tetris为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第10章 项目实战：小游戏Tetris"
    ]
  },
  {
    "id": "jpc-22-10-tetris-q5",
    "chapter": "jpc-22-10-tetris",
    "level": 3,
    "question": "第10章 项目实战：小游戏Tetris怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第10章 项目实战：小游戏Tetris"
    ]
  },
  {
    "id": "jpc-22-10-tetris-q6",
    "chapter": "jpc-22-10-tetris",
    "level": 3,
    "question": "第10章 项目实战：小游戏Tetris独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、棋盘坐标断言、形状旋转样本、碰撞与消行测试、动作序列、归约快照、可重复随机种子、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第10章 项目实战：小游戏Tetris"
    ]
  },
  {
    "id": "jpc-22-11-chatty-q1",
    "chapter": "jpc-22-11-chatty",
    "level": 1,
    "question": "为什么第11章 项目实战：聊天应用Chatty必须保留17个正式目录节点？",
    "answer": "因为第11章 项目实战：聊天应用Chatty、11.1 整体系统架构、11.2 登录注册模块、11.3 IM聊天模块等节点共同组成“以产品级架构串联登录注册、会话、联系人、扫码、用户信息、发现模块和暗黑主题”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第11章 项目实战：聊天应用Chatty"
    ]
  },
  {
    "id": "jpc-22-11-chatty-q2",
    "chapter": "jpc-22-11-chatty",
    "level": 1,
    "question": "第11章 项目实战：聊天应用Chatty的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由模块依赖图、鉴权状态机、消息分页与幂等、离线失败、联系人权限、编辑校验、主题截图矩阵证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第11章 项目实战：聊天应用Chatty"
    ]
  },
  {
    "id": "jpc-22-11-chatty-q3",
    "chapter": "jpc-22-11-chatty",
    "level": 2,
    "question": "第11章 项目实战：聊天应用Chatty应怎样设计失败实验？",
    "answer": "主动制造“只实现静态聊天界面，遗漏鉴权过期、离线重试、消息身份、权限拒绝和跨模块所有权”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第11章 项目实战：聊天应用Chatty"
    ]
  },
  {
    "id": "jpc-22-11-chatty-q4",
    "chapter": "jpc-22-11-chatty",
    "level": 2,
    "question": "第11章 项目实战：聊天应用Chatty为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第11章 项目实战：聊天应用Chatty"
    ]
  },
  {
    "id": "jpc-22-11-chatty-q5",
    "chapter": "jpc-22-11-chatty",
    "level": 3,
    "question": "第11章 项目实战：聊天应用Chatty怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第11章 项目实战：聊天应用Chatty"
    ]
  },
  {
    "id": "jpc-22-11-chatty-q6",
    "chapter": "jpc-22-11-chatty",
    "level": 3,
    "question": "第11章 项目实战：聊天应用Chatty独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、模块依赖图、鉴权状态机、消息分页与幂等、离线失败、联系人权限、编辑校验、主题截图矩阵、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "第11章 项目实战：聊天应用Chatty"
    ]
  },
  {
    "id": "jpc-22-official-final-review-q1",
    "chapter": "jpc-22-official-final-review",
    "level": 1,
    "question": "为什么《Jetpack Compose从入门到实战》全书总复习必须保留11个正式目录节点？",
    "answer": "因为第1章 全新的Android UI框架、第2章 了解常用UI组件、第3章 定制UI视图、第4章 状态管理与重组等节点共同组成“用状态、组合、布局、绘制、输入、导航和项目数据流复盘全部章节，并以失败测试完成独立交接”的完整输入、机制与验收链路。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》全书总复习"
    ]
  },
  {
    "id": "jpc-22-official-final-review-q2",
    "chapter": "jpc-22-official-final-review",
    "level": 1,
    "question": "《Jetpack Compose从入门到实战》全书总复习的最小正确性合同是什么？",
    "answer": "同一状态与事件必须产生确定的业务结果、语义和生命周期所有权，并由全书节点表、重组与渲染实验、手势轨迹、导航返回栈、依赖矩阵、游戏重放和聊天离线验收证明。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》全书总复习"
    ]
  },
  {
    "id": "jpc-22-official-final-review-q3",
    "chapter": "jpc-22-official-final-review",
    "level": 2,
    "question": "《Jetpack Compose从入门到实战》全书总复习应怎样设计失败实验？",
    "answer": "主动制造“只背API名称而无法从状态变化推导组合、布局、绘制、输入和产品数据流的证据”，再运行销毁、恢复、错误身份和版本漂移场景；出现重复、错位、泄漏或不可访问即失败。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》全书总复习"
    ]
  },
  {
    "id": "jpc-22-official-final-review-q4",
    "chapter": "jpc-22-official-final-review",
    "level": 2,
    "question": "《Jetpack Compose从入门到实战》全书总复习为什么不能凭一次截图验收？",
    "answer": "一次截图没有覆盖状态序列、重组边界、语义、窗口主题、取消恢复和依赖版本，无法证明可重复性。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》全书总复习"
    ]
  },
  {
    "id": "jpc-22-official-final-review-q5",
    "chapter": "jpc-22-official-final-review",
    "level": 3,
    "question": "《Jetpack Compose从入门到实战》全书总复习怎样从2022年版本迁移到现代Compose？",
    "answer": "先保存原书API与行为基线，一次替换一个依赖或API，以相同状态、事件、截图和恢复测试比较并记录回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》全书总复习"
    ]
  },
  {
    "id": "jpc-22-official-final-review-q6",
    "chapter": "jpc-22-official-final-review",
    "level": 3,
    "question": "《Jetpack Compose从入门到实战》全书总复习独立交接必须包含哪些证据？",
    "answer": "提交源码与依赖锁、全书节点表、重组与渲染实验、手势轨迹、导航返回栈、依赖矩阵、游戏重放和聊天离线验收、目录节点映射、失败测试、可访问性结果、迁移账本和回退条件。",
    "tags": [
      "Jetpack Compose",
      "2022首版",
      "《Jetpack Compose从入门到实战》全书总复习"
    ]
  }
];
