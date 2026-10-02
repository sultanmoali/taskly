(function () {
    const css = `
    .nav-toggle{position:fixed;top:16px;left:16px;z-index:100;width:44px;height:44px;padding:0;border-radius:12px;background:#3b9209;color:#fff;font-size:22px;box-shadow:0 2px 8px rgba(0,0,0,.25)}
    .nav-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;z-index:150}
    .sidebar{position:fixed;top:0;left:0;height:100%;width:260px;max-width:80%;background:#0c4904;padding:70px 16px 20px;transform:translateX(-100%);transition:transform .35s cubic-bezier(.4,0,.2,1);z-index:200;display:flex;flex-direction:column;gap:8px;box-shadow:4px 0 20px rgba(0,0,0,.3)}
    .nav-logo{position:absolute;top:22px;left:20px;color:#c5f5be;font-size:22px}
    .nav-close{position:absolute;top:12px;right:12px;width:40px;height:40px;padding:0;background:transparent;color:#c5f5be;font-size:30px;line-height:40px;border-radius:10px}
    .nav-close:hover{background:rgba(255,255,255,.12)}
    .sidebar a{display:block;padding:14px 16px;border-radius:12px;color:#e1f7a6;text-decoration:none;font-size:17px;transition:background .2s}
    .sidebar a:hover{background:rgba(255,255,255,.12)}
    .sidebar a.active{background:#3b9209;color:#fff}
    body.nav-open .sidebar{transform:translateX(0)}
    body.nav-open .nav-overlay{opacity:1;visibility:visible}
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const links = [
        ["🏠 Home", "home.html"],
        ["✅ Tasks", "todo.html"],
        ["⏱️ Focus", "focus.html"]
    ];
    const here = location.pathname.split("/").pop();

    document.body.insertAdjacentHTML("beforeend", `
        <button class="nav-toggle" aria-label="Open menu">☰</button>
        <div class="nav-overlay"></div>
        <nav class="sidebar">
            <h2 class="nav-logo">Taskly</h2>
            <button class="nav-close" aria-label="Close menu">×</button>
            ${links.map(([name, url]) =>
                `<a href="${url}" class="${url.endsWith(here) ? "active" : ""}">${name}</a>`
            ).join("")}
        </nav>
    `);

    const open = () => document.body.classList.add("nav-open");
    const close = () => document.body.classList.remove("nav-open");

    document.querySelector(".nav-toggle").addEventListener("click", open);
    document.querySelector(".nav-close").addEventListener("click", close);
    document.querySelector(".nav-overlay").addEventListener("click", close); 
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();