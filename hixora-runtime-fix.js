/* HIXORA search and answer-copy recovery */
(function () {
  "use strict";
  if (window.__HIXORA_RUNTIME_FIX_V1__) return;
  window.__HIXORA_RUNTIME_FIX_V1__ = true;

  function runSearch(event) {
    var fn = window.performSearch || window.enhancedSearch;
    if (typeof fn !== "function") {
      console.error("HIXORA: search function is unavailable.");
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    try {
      var result = fn.call(window);
      if (result && typeof result.catch === "function") {
        result.catch(function (err) { console.error("HIXORA search failed:", err); });
      }
    } catch (err) {
      console.error("HIXORA search failed:", err);
    }
  }

  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest &&
        event.target.closest("#searchButton")) runSearch(event);
  }, true);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" &&
        event.target && event.target.id === "searchInput") runSearch(event);
  }, true);

  function installCopy() {
    var card = document.getElementById("nexoraAnswerSection");
    if (!card || card.querySelector("#hixoraCopyAnswer")) return;
    var button = document.createElement("button");
    button.id = "hixoraCopyAnswer";
    button.type = "button";
    button.textContent = "Copy answer";
    button.style.cssText = "float:right;margin:6px;padding:8px 13px;border-radius:10px;cursor:pointer";
    button.addEventListener("click", async function () {
      var title = document.getElementById("answerTitle");
      var answer = document.getElementById("answerText");
      var details = document.getElementById("answerDetails");
      var content = [title && title.innerText, answer && answer.innerText,
        details && details.innerText].filter(Boolean).join("\n\n").trim();
      if (!content) return;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(content);
        } else {
          throw new Error("Clipboard API unavailable");
        }
      } catch (_) {
        var area = document.createElement("textarea");
        area.value = content;
        area.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.appendChild(area);
        area.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (_) {}
        area.remove();
        if (!ok) {
          window.prompt("Copy your answer:", content);
          return;
        }
      }
      button.textContent = "Copied ✓";
      setTimeout(function () { button.textContent = "Copy answer"; }, 1600);
    });
    card.insertBefore(button, card.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installCopy, { once: true });
  } else {
    installCopy();
  }
})();
