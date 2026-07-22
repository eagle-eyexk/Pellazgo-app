import SwiftUI
import WebKit

struct ContentView: View {
    @State private var isOffline = false

    var body: some View {
        ZStack {
            WebView(url: URL(string: "https://pellazgo.base44.app/")!,
                    isOffline: $isOffline)
                .ignoresSafeArea()

            if isOffline {
                OfflineView {
                    isOffline = false
                }
            }
        }
    }
}

// MARK: - WebView

struct WebView: UIViewRepresentable {
    let url: URL
    @Binding var isOffline: Bool

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        config.defaultWebpagePreferences = prefs

        let wv = WKWebView(frame: .zero, configuration: config)
        wv.backgroundColor = UIColor(red: 15/255, green: 35/255, blue: 24/255, alpha: 1)
        wv.scrollView.backgroundColor = UIColor(red: 15/255, green: 35/255, blue: 24/255, alpha: 1)
        wv.isOpaque = false
        wv.allowsBackForwardNavigationGestures = true
        wv.scrollView.bounces = true
        wv.navigationDelegate = context.coordinator

        var request = URLRequest(url: url)
        request.cachePolicy = .returnCacheDataElseLoad
        wv.load(request)
        return wv
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        if !isOffline && uiView.url == nil {
            var request = URLRequest(url: url)
            request.cachePolicy = .returnCacheDataElseLoad
            uiView.load(request)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(isOffline: $isOffline, url: url)
    }

    class Coordinator: NSObject, WKNavigationDelegate {
        @Binding var isOffline: Bool
        let url: URL

        init(isOffline: Binding<Bool>, url: URL) {
            _isOffline = isOffline
            self.url = url
        }

        func webView(_ webView: WKWebView,
                     didFinish navigation: WKNavigation!) {
            DispatchQueue.main.async { self.isOffline = false }
        }

        func webView(_ webView: WKWebView,
                     didFailProvisionalNavigation navigation: WKNavigation!,
                     withError error: Error) {
            let code = (error as NSError).code
            if code == NSURLErrorCancelled { return }
            // Network unreachable codes → show offline screen
            let offlineCodes = [NSURLErrorNotConnectedToInternet,
                                NSURLErrorNetworkConnectionLost,
                                NSURLErrorTimedOut,
                                NSURLErrorCannotConnectToHost,
                                NSURLErrorCannotFindHost]
            DispatchQueue.main.async {
                self.isOffline = offlineCodes.contains(code)
            }
        }

        func webView(_ webView: WKWebView,
                     decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let u = action.request.url else { decisionHandler(.allow); return }
            let externalSchemes = ["tel", "mailto", "sms", "maps", "facetime"]
            if externalSchemes.contains(u.scheme ?? "") {
                UIApplication.shared.open(u)
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }
    }
}

// MARK: - Offline screen

struct OfflineView: View {
    let onRetry: () -> Void

    var body: some View {
        ZStack {
            Color(red: 15/255, green: 35/255, blue: 24/255).ignoresSafeArea()
            VStack(spacing: 32) {
                Image("AppLogo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 90, height: 90)
                    .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                    .opacity(0.7)

                VStack(spacing: 8) {
                    Text("No Connection")
                        .font(.title2.weight(.semibold))
                        .foregroundColor(.white)
                    Text("Check your internet and try again.")
                        .font(.subheadline)
                        .foregroundColor(.white.opacity(0.6))
                        .multilineTextAlignment(.center)
                }

                Button(action: onRetry) {
                    Text("Try Again")
                        .font(.body.weight(.semibold))
                        .foregroundColor(Color(red: 15/255, green: 35/255, blue: 24/255))
                        .padding(.horizontal, 36)
                        .padding(.vertical, 14)
                        .background(Color(red: 212/255, green: 175/255, blue: 55/255))
                        .clipShape(Capsule())
                }
            }
            .padding(40)
        }
    }
}
