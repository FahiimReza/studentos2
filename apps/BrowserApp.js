function BrowserApp() {
  try {
    const [url, setUrl] = React.useState('https://example.com');
    const [displayUrl, setDisplayUrl] = React.useState('https://example.com');
    const [history, setHistory] = React.useState(['https://example.com']);
    const [historyIndex, setHistoryIndex] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [bookmarks, setBookmarks] = React.useState([
      { id: 1, title: 'Wikipedia', url: 'https://en.wikipedia.org' },
      { id: 2, title: 'GitHub', url: 'https://github.com' },
      { id: 3, title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { id: 4, title: 'Stack Overflow', url: 'https://stackoverflow.com' }
    ]);
    const [showBookmarks, setShowBookmarks] = React.useState(true);
    const [useProxy, setUseProxy] = React.useState(true);

    const loadUrl = React.useCallback((targetUrl) => {
      setIsLoading(true);
      
      // Update history
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(targetUrl);
        return newHistory;
      });
      setHistoryIndex(prev => prev + 1);
      setDisplayUrl(targetUrl);
      
      // Update iframe
      const iframe = document.getElementById('browser-iframe');
      if (iframe) {
        if (useProxy) {
          // Use Codetabs API as a proxy to bypass X-Frame-Options
          const proxyUrl = `https://r.jina.ai/http://${targetUrl.replace(/^https?:\/\//, '')}`;
          
          // First try to fetch the content and inject it
          fetch(proxyUrl)
            .then(response => {
              if (!response.ok) throw new Error('Failed to fetch');
              return response.text();
            })
            .then(html => {
              // Create a complete HTML document with proper styling
              const fullHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <base href="https://${targetUrl.replace(/^https?:\/\//, '')}/">
                  <style>
                    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                    img { max-width: 100%; height: auto; }
                    a { color: #0066cc; }
                    pre { background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }
                    code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
                  </style>
                </head>
                <body>
                  ${html}
                  <script>
                    // Make links open in the same iframe
                    document.addEventListener('click', function(e) {
                      if (e.target.tagName === 'A' && e.target.href) {
                        e.preventDefault();
                        window.parent.loadUrlInBrowser(e.target.href);
                      }
                    });
                  </script>
                </body>
                </html>
              `;
              iframe.srcdoc = fullHtml;
            })
            .catch(err => {
              console.error('Proxy failed, trying direct:', err);
              // Fallback to direct URL if proxy fails
              iframe.src = targetUrl;
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          // Direct loading (may be blocked by X-Frame-Options)
          iframe.src = targetUrl;
          setIsLoading(false);
        }
      }
    }, [historyIndex, useProxy]);

    // Make the loadUrl function available globally for iframe communication
    React.useEffect(() => {
      window.loadUrlInBrowser = loadUrl;
      return () => {
        delete window.loadUrlInBrowser;
      };
    }, [loadUrl]);

    const handleUrlSubmit = (e) => {
      e.preventDefault();
      if (!displayUrl) return;
      
      // Clean up the URL
      let finalUrl = displayUrl;
      if (!displayUrl.startsWith('http://') && !displayUrl.startsWith('https://')) {
        finalUrl = 'https://' + displayUrl;
      }
      
      loadUrl(finalUrl);
      
      if (typeof soundManager !== 'undefined') {
        soundManager.play('click');
      }
    };

    const goBack = () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const prevUrl = history[newIndex];
        setDisplayUrl(prevUrl);
        loadUrl(prevUrl);
        if (typeof soundManager !== 'undefined') {
          soundManager.play('click');
        }
      }
    };

    const goForward = () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const nextUrl = history[newIndex];
        setDisplayUrl(nextUrl);
        loadUrl(nextUrl);
        if (typeof soundManager !== 'undefined') {
          soundManager.play('click');
        }
      }
    };

    const refresh = () => {
      loadUrl(displayUrl);
      if (typeof soundManager !== 'undefined') {
        soundManager.play('click');
      }
    };

    const openBookmark = (bookmarkUrl) => {
      setDisplayUrl(bookmarkUrl);
      loadUrl(bookmarkUrl);
      
      if (typeof soundManager !== 'undefined') {
        soundManager.play('click');
      }
    };

    const openInExternalBrowser = () => {
      window.open(displayUrl, '_blank');
      
      if (typeof soundManager !== 'undefined') {
        soundManager.play('click');
      }
    };

    // Load initial content
    React.useEffect(() => {
      loadUrl('https://example.com');
    }, []);

    return (
      <div className="flex flex-col h-full" data-file="apps/BrowserApp.js">
        {/* Browser Toolbar */}
        <div className="flex items-center gap-2 p-2 border-b border-white/10">
          <button
            onClick={goBack}
            disabled={historyIndex <= 0}
            className={`p-2 rounded ${historyIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
          >
            <div className="icon-arrow-left text-sm"></div>
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            className={`p-2 rounded ${historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
          >
            <div className="icon-arrow-right text-sm"></div>
          </button>
          <button
            onClick={refresh}
            className="p-2 rounded hover:bg-white/10"
          >
            <div className="icon-refresh text-sm"></div>
          </button>
          <button
            onClick={openInExternalBrowser}
            className="p-2 rounded hover:bg-white/10"
            title="Open in external browser"
          >
            <div className="icon-external-link text-sm"></div>
          </button>
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="p-2 rounded hover:bg-white/10"
            title="Toggle bookmarks"
          >
            <div className="icon-star text-sm"></div>
          </button>
          <button
            onClick={() => setUseProxy(!useProxy)}
            className={`p-2 rounded hover:bg-white/10 ${useProxy ? 'bg-blue-500/20' : ''}`}
            title="Toggle proxy mode"
          >
            <div className="icon-shield text-sm"></div>
          </button>
          
          <form onSubmit={handleUrlSubmit} className="flex-1 flex">
            <input
              type="text"
              value={displayUrl}
              onChange={(e) => setDisplayUrl(e.target.value)}
              className="flex-1 px-3 py-1 bg-white/10 rounded-lg outline-none focus:bg-white/20 transition-colors"
              placeholder="Enter URL (e.g., wikipedia.org)"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90"
            >
              Go
            </button>
          </form>
        </div>
        
        {/* Browser Content */}
        <div className="flex-1 flex">
          {/* Bookmarks Sidebar */}
          {showBookmarks && (
            <div className="w-64 border-r border-white/10 p-4 overflow-auto">
              <h3 className="text-lg font-semibold mb-4">Bookmarks</h3>
              <div className="space-y-2">
                {bookmarks.map(bookmark => (
                  <div
                    key={bookmark.id}
                    onClick={() => openBookmark(bookmark.url)}
                    className="p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <div className="font-medium text-sm">{bookmark.title}</div>
                    <div className="text-xs opacity-70 truncate">{bookmark.url}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">History</h3>
                <div className="space-y-2">
                  {history.slice().reverse().slice(0, 10).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setDisplayUrl(item);
                        loadUrl(item);
                      }}
                      className="p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <div className="text-xs opacity-70 truncate">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-white/5 rounded-lg">
                <h4 className="text-sm font-semibold mb-2">Proxy Mode</h4>
                <p className="text-xs opacity-70 mb-2">
                  {useProxy ? 'On: Using proxy to bypass restrictions' : 'Off: Direct connection (may be blocked)'}
                </p>
                <button
                  onClick={() => setUseProxy(!useProxy)}
                  className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                >
                  Toggle Proxy
                </button>
              </div>
            </div>
          )}
          
          {/* Main Content Area */}
          <div className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="text-white">Loading...</div>
              </div>
            )}
            
            <iframe
              id="browser-iframe"
              className="w-full h-full border-0"
              title="Browser"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BrowserApp error:', error);
    return null;
  }
}