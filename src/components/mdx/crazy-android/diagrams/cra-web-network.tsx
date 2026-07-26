/**
 * <CraWebNetworkDiagram>：Web与网络通信图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraWebNetworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android Web与网络通信体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="26"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Web与网络通信：WebView / HTTP / Socket / XML与JSON
          </text>

          {/* 第一行：WebView 与 HTTP */}
          <text
            x="185"
            y="52"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            WebView浏览器内嵌
          </text>
          <rect
            x="50"
            y="64"
            width="310"
            height="170"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <rect
            x="66"
            y="80"
            width="278"
            height="28"
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="205"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            WebView — 在App内显示网页
          </text>

          <text
            x="66"
            y="126"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            loadUrl(url) / loadData(data, mime, encoding)
          </text>
          <text
            x="66"
            y="142"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            goBack / goForward / reload
          </text>
          <text
            x="66"
            y="158"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            setWebViewClient — 页面加载控制
          </text>
          <text
            x="66"
            y="174"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            setWebChromeClient — JS对话框/进度
          </text>

          <rect
            x="66"
            y="186"
            width="278"
            height="36"
            rx="4"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="205"
            y="204"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            Java &harr; JavaScript 互调
          </text>
          <text
            x="205"
            y="218"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            addJavascriptInterface / evaluateJavascript
          </text>

          <text
            x="555"
            y="52"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            HTTP通信
          </text>
          <rect
            x="400"
            y="64"
            width="310"
            height="170"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <rect
            x="416"
            y="80"
            width="135"
            height="48"
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="483"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            HttpURLConnection
          </text>
          <text
            x="483"
            y="112"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            标准库内置
          </text>
          <text
            x="483"
            y="124"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            openConnection/setRequestMethod
          </text>

          <rect
            x="559"
            y="80"
            width="135"
            height="48"
            rx="4"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="626"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            Apache HttpClient
          </text>
          <text
            x="626"
            y="112"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            （已废弃）
          </text>
          <text
            x="626"
            y="124"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            HttpClient/HttpGet/HttpPost
          </text>

          <text
            x="416"
            y="148"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            请求流程：
          </text>
          <text
            x="416"
            y="166"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            1. URL.openConnection() &rarr; HttpURLConnection
          </text>
          <text
            x="416"
            y="182"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            2. setRequestMethod(GET/POST) + setConnectTimeout
          </text>
          <text
            x="416"
            y="198"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            3. getInputStream 读响应 &rarr; getResponseCode
          </text>
          <text x="416" y="218" fontSize="11" fill="var(--danger)">
            必须在子线程执行网络请求，主线程网络操作触发ANR
          </text>

          {/* 第二行：Socket 与 XML/JSON */}
          <text
            x="185"
            y="262"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            Socket通信
          </text>
          <rect
            x="50"
            y="274"
            width="310"
            height="150"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <rect
            x="66"
            y="290"
            width="135"
            height="48"
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="133"
            y="308"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            TCP Socket
          </text>
          <text
            x="133"
            y="322"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            Socket(host, port)
          </text>
          <text
            x="133"
            y="334"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            getInputStream/OutputStream
          </text>

          <rect
            x="209"
            y="290"
            width="135"
            height="48"
            rx="4"
            fill="var(--danger)"
            fillOpacity="0.10"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="276"
            y="308"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            UDP Socket
          </text>
          <text
            x="276"
            y="322"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            DatagramSocket
          </text>
          <text
            x="276"
            y="334"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            DatagramPacket
          </text>

          <rect
            x="66"
            y="348"
            width="278"
            height="60"
            rx="4"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="205"
            y="368"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ServerSocket（服务端）
          </text>
          <text
            x="205"
            y="384"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            accept() 阻塞等待连接 &rarr; 返回Socket
          </text>
          <text
            x="205"
            y="398"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            多线程/线程池处理多个客户端
          </text>

          <text
            x="555"
            y="262"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            XML与JSON解析
          </text>
          <rect
            x="400"
            y="274"
            width="310"
            height="150"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <rect
            x="416"
            y="290"
            width="135"
            height="66"
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.10"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="483"
            y="308"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            XML解析
          </text>
          <text
            x="483"
            y="324"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            SAX — 事件驱动流式
          </text>
          <text
            x="483"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            DOM — 全树加载内存
          </text>
          <text
            x="483"
            y="352"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            XmlPullParser — PULL
          </text>

          <rect
            x="559"
            y="290"
            width="135"
            height="66"
            rx="4"
            fill="var(--accent)"
            fillOpacity="0.10"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="626"
            y="308"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            JSON解析
          </text>
          <text
            x="626"
            y="324"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            JSONObject / JSONArray
          </text>
          <text
            x="626"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            org.json 标准库
          </text>
          <text
            x="626"
            y="352"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Gson — 对象自动映射
          </text>

          <rect
            x="416"
            y="368"
            width="278"
            height="44"
            rx="4"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <text
            x="555"
            y="386"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            JSON是现代首选：轻量、解析快、与REST API天然契合
          </text>
          <text
            x="555"
            y="400"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            PULL解析适合大XML文件流式处理
          </text>

          {/* 底部：权限与总结 */}
          <rect
            x="50"
            y="440"
            width="640"
            height="110"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--text-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="462"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            网络通信要点
          </text>
          <text
            x="70"
            y="486"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--danger)"
          >
            AndroidManifest: &lt;uses-permission
            android:name=&quot;android.permission.INTERNET&quot; /&gt;
          </text>
          <text x="70" y="506" fontSize="11" fill="var(--text-secondary)">
            WebView:
            shouldOverrideUrlLoading控制内嵌跳转，addJavascriptInterface实现JS互调
          </text>
          <text x="70" y="524" fontSize="11" fill="var(--text-secondary)">
            HTTP: HttpURLConnection子线程请求 + Handler/AsyncTask回主线程更新UI
          </text>
          <text x="70" y="542" fontSize="11" fill="var(--text-secondary)">
            Socket: TCP可靠连接适合IM/文件传输，UDP无连接适合实时音视频/广播
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android网络通信：WebView内嵌浏览器、HttpURLConnection、TCP/UDP
        Socket、XML(SAX/DOM/PULL)与JSON解析
      </figcaption>
    </figure>
  );
}
