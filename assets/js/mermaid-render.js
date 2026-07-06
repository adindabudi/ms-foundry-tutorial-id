(function () {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function loadMermaid(callback) {
    if (window.mermaid) {
      callback();
      return;
    }

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.3/dist/mermaid.min.js';
    script.onload = callback;
    script.onerror = function () {
      document.documentElement.classList.add('mermaid-load-failed');
    };
    document.head.appendChild(script);
  }

  onReady(function () {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('pre > code.language-mermaid'));
    if (!blocks.length) return;

    blocks.forEach(function (code, index) {
      var container = document.createElement('div');
      container.className = 'mermaid mermaid-diagram';
      container.setAttribute('role', 'img');
      container.setAttribute('aria-label', 'Diagram Mermaid ' + (index + 1));
      container.textContent = code.textContent.trim();
      code.parentElement.replaceWith(container);
    });

    loadMermaid(function () {
      var theme = document.documentElement.getAttribute('data-theme');
      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: theme === 'dark' || theme === 'hc' ? 'dark' : 'default'
      });
      window.mermaid.run({ nodes: document.querySelectorAll('.mermaid-diagram') });
    });
  });
})();