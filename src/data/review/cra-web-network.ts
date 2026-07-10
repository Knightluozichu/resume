import type { ReviewQuestion } from "./types";

export const craWebNetworkQuestions: ReviewQuestion[] = [
  {
    id: "cra-wn-1",
    chapter: "cra-web-network",
    level: 1,
    question: `Android WebView的核心API有哪些？如何实现Java与JavaScript互调？`,
    answer:
      `WebView核心API：①加载网页——loadUrl(url)加载网络URL，loadData(data, mimeType, encoding)直接加载HTML字符串，loadDataWithBaseURL支持baseURL。②导航控制——goBack/goForward/reload/canGoBack/canGoForward控制前进后退刷新。③WebViewClient——setWebViewClient设置页面加载控制器，重写shouldOverrideUrlLoading(view, url)控制URL跳转（返回true在WebView内打开，返回false交系统浏览器），onPageFinished监听加载完成。④WebChromeClient——setWebChromeClient处理JS对话框（onJsAlert/onJsConfirm）、网页标题（onReceivedTitle）、加载进度（onProgressChanged）。⑤WebSettings——getSettings()配置：setJavaScriptEnabled开启JS、setSupportZoom支持缩放、setCacheMode缓存模式。Java与JS互调：①Java调JS——\`webView.evaluateJavascript(\"jsFunction()\", callback)\`（Android 4.4+推荐，可获取返回值）或\`webView.loadUrl(\"javascript:jsFunction()\")\`（旧方式，无法获取返回值）。②JS调Java——\`webView.addJavascriptInterface(javaObject, \"jsName\")\`将Java对象暴露给JS，JS中通过\`jsName.javaMethod()\`调用Java方法。注意：addJavascriptInterface在Android 4.2以下有安全漏洞（JS可调用任意Java反射方法），需在@JavascriptInterface注解标注可被JS调用的方法。`,
    tags: ["WebView", "loadUrl", "WebViewClient", "JS互调", "addJavascriptInterface", "evaluateJavascript"],
  },
  {
    id: "cra-wn-2",
    chapter: "cra-web-network",
    level: 2,
    question: `如何使用HttpURLConnection进行HTTP请求？为什么必须在子线程中执行？`,
    answer:
      `HttpURLConnection使用流程：①创建连接——\`URL url = new URL(\"http://...\")\` → \`HttpURLConnection conn = (HttpURLConnection) url.openConnection()\`。②配置请求——\`conn.setRequestMethod(\"GET\"/\"POST\")\`设置方法，\`conn.setConnectTimeout(5000)\`设置连接超时，\`conn.setReadTimeout(5000)\`设置读取超时，\`conn.setRequestProperty(\"key\", \"value\")\`设置请求头。③POST请求发送数据——\`conn.setDoOutput(true)\` → \`OutputStream os = conn.getOutputStream()\` → \`os.write(data.getBytes())\`写入请求体。④获取响应——\`int code = conn.getResponseCode()\`获取响应码（200成功），\`InputStream is = conn.getInputStream()\`获取响应流，用BufferedReader逐行读取。⑤关闭连接——\`conn.disconnect()\`释放资源。必须在子线程执行的原因：①Android 4.0+禁止主线程做网络请求，直接抛NetworkOnMainThreadException。②网络请求是耗时IO操作，在主线程执行会阻塞UI线程导致界面卡顿。③超过5秒无响应触发ANR。解决方案：在子线程（Thread/AsyncThread/线程池）中执行网络请求，通过Handler.sendMessage或runOnUiThread切回主线程更新UI。`,
    tags: ["HttpURLConnection", "HTTP请求", "子线程", "NetworkOnMainThreadException", "ANR"],
  },
  {
    id: "cra-wn-3",
    chapter: "cra-web-network",
    level: 2,
    question: `TCP Socket和UDP Socket的区别是什么？ServerSocket如何处理多客户端？`,
    answer:
      `TCP vs UDP：①TCP（传输控制协议）——面向连接，三次握手建立可靠连接，保证数据有序到达不丢失，通过Socket(host, port)创建客户端Socket，getInputStream/getOutputStream读写数据。适合需要可靠传输的场景（IM聊天、文件传输、HTTP）。②UDP（用户数据报协议）——无连接，不保证数据到达和顺序，通过DatagramSocket创建Socket，DatagramPacket封装数据包，send/receive发送接收。延迟低但可能丢包。适合实时性要求高、可容忍丢包的场景（实时音视频、游戏位置同步、广播）。ServerSocket处理多客户端：①ServerSocket(port).accept()阻塞等待客户端连接，返回Socket对象与该客户端通信。②单线程模式下accept返回后处理该客户端，处理完才能accept下一个——无法并发。③多线程模式：每次accept返回后new Thread(new ClientHandler(socket)).start()为每个客户端分配独立线程处理，主线程继续accept。线程过多时线程切换开销大。④线程池模式：用ExecutorService管理线程池，accept后submit到线程池执行，控制最大并发数避免线程爆炸。⑤NIO模式：用Selector+Channel非阻塞IO，单线程管理多个连接（更高级）。注意：网络操作同样在子线程执行，不能阻塞主线程。`,
    tags: ["TCP", "UDP", "Socket", "ServerSocket", "多线程", "DatagramSocket", "线程池"],
  },
  {
    id: "cra-wn-4",
    chapter: "cra-web-network",
    level: 3,
    question: `Android中XML和JSON数据解析各有哪几种方式？为什么JSON更受推荐？`,
    answer:
      `XML解析三种方式：①SAX（Simple API for XML）——事件驱动流式解析，解析器逐行读取XML触发startElement/characters/endElement等事件回调。内存占用小（不加载全树），适合大XML文件。但需自己维护解析状态，编码复杂。②DOM（Document Object Model）——将整个XML加载到内存构建树形结构，通过Node遍历。API简单直观，但大文件内存爆炸。③XmlPullParser（PULL）——Android内置推荐方式，类似SAX的流式解析但更易用。通过getEventType()循环和next()推进，START_TAG/TEXT/END_TAG事件中提取数据，可主动控制解析进度（next()）。JSON解析方式：①org.json标准库——JSONObject/JSONArray，\`new JSONObject(jsonString)\`解析，\`json.getString(\"key\")\`/\`json.getInt(\"key\")\`取值，\`jsonArray.getJSONObject(i)\`遍历数组。轻量内置无需第三方库。②Gson——Google库，\`new Gson().fromJson(json, BeanClass.class)\`直接将JSON映射为Java对象，\`toJson(obj)\`序列化对象为JSON。自动处理嵌套和集合，最便捷。JSON更受推荐的原因：①体积小——JSON无闭合标签，数据量比XML小30%-50%，网络传输更快。②解析快——JSON结构简单，解析效率高于XML。③与REST API天然契合——现代Web服务普遍用JSON。④可读性好——结构简洁，嵌套和数组表达直观。⑤Gson等库自动映射，开发效率远高于XML手工解析。`,
    tags: ["XML解析", "JSON解析", "SAX", "DOM", "PULL", "Gson", "JSONObject", "对比"],
  },
];
