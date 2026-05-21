/* Winding Tech — shared layout + interactions (no frameworks) */

function getBasePath() {
  const path = window.location.pathname.replace(/\\/g, "/");
  return path.includes("/services/") ? "../" : "./";
}

function normalizePath(p) {
  return p.replace(/\\/g, "/").replace(/\/+$/, "");
}

function getCurrentPageKey() {
  const path = normalizePath(window.location.pathname);
  const file = path.split("/").pop() || "index.html";
  if (path.includes("/services/")) return `services/${file}`;
  return file;
}

function buildHeaderFooter() {
  const base = getBasePath();
  const headerMount = document.querySelector("[data-site-header]");
  const footerMount = document.querySelector("[data-site-footer]");

  const current = getCurrentPageKey();
  const services = {
    col1: {
      title: "Core services",
      items: [
        { key: "services/electrification.html", label: "Power Infrastructure & Distribution", href: `${base}services/electrification.html` },
        { key: "services/electrical-automation.html", label: "Industrial Automation & Motor Control", href: `${base}services/electrical-automation.html` },
      ],
    },
    col2: {
      title: "Support services",
      items: [
        { key: "services/mechanical-equipment.html", label: "Mechanical & Fluid Handling", href: `${base}services/mechanical-equipment.html` },
        { key: "services/industrial-servicing.html", label: "Professional & Technical Services", href: `${base}services/industrial-servicing.html` },
      ],
    },
  };

  const allServiceKeys = [...services.col1.items, ...services.col2.items].map((i) => i.key);
  const isServicesActive = allServiceKeys.includes(current);

  function navLink({ key, label, href }) {
    const active = key === current ? " nav__link--active" : "";
    return `<li class="nav__item"><a class="nav__link${active}" href="${href}">${label}</a></li>`;
  }

  if (headerMount) {
    headerMount.innerHTML = `
      <header class="site-header">
        <div class="u-container site-header__bar">
          <a class="brand" href="${base}index.html" aria-label="Winding Tech home">
            <img class="brand__logo" src="${base}assets/img/winding-tech-logo.png" alt="Winding Tech Logo" />
            <span class="brand__text">
              <span class="brand__name">Winding Technologies</span>
              <span class="brand__tagline">Electrical and Mechanical Engineering</span>
            </span>
              </a>

          <nav class="nav" aria-label="Primary">
            <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
              <span class="nav-toggle__icon" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
            </button>
            <ul class="nav__list" id="primary-nav">
              ${navLink({ key: "index.html", label: "Home", href: `${base}index.html` })}
              <li class="nav__item nav__item--services${isServicesActive ? " nav__item--open" : ""}" data-services-item>
                <button
                  class="nav__link nav__link--services${isServicesActive ? " nav__link--active" : ""}"
                  type="button"
                  aria-expanded="${isServicesActive ? "true" : "false"}"
                  data-services-toggle
                >
                  Services <span class="nav__caret" aria-hidden="true"></span>
                </button>
                <div class="mega" role="menu" aria-label="Services menu">
                  <div class="mega__grid">
                    <div>
                      <div class="mega__col-title">${services.col1.title}</div>
                      <ul class="mega__list">
                        ${services.col1.items
                          .map((i) => `<li><a class="mega__link" href="${i.href}">${i.label}</a></li>`)
                          .join("")}
                      </ul>
                    </div>
                    <div>
                      <div class="mega__col-title">${services.col2.title}</div>
                      <ul class="mega__list">
                        ${services.col2.items
                          .map((i) => `<li><a class="mega__link" href="${i.href}">${i.label}</a></li>`)
                          .join("")}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              ${navLink({ key: "about.html", label: "About", href: `${base}about.html` })}
              <li class="nav__item"><a class="nav__cta" href="${base}contact.html">Get a Quote</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="u-container">
          <div class="site-footer__grid">
            <div>
              <h3 class="site-footer__title">Winding Technologies</h3>
              <p class="site-footer__muted">We provide electrical automation/control systems, mechanical equipment, and servicing. All our procedures and systems are CERTEX and ISO 9001 approved to ensure your satisfaction. </p>
              <ul class="site-footer__links">
                <li><a href="${base}contact.html">Request a call-back</a></li>
                <li><a href="${base}about.html">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 class="site-footer__title">Services</h3>
              <ul class="site-footer__links">
                <li><a href="${base}services/electrification.html">Power Infrastructure & Distribution</a></li>
                <li><a href="${base}services/electrical-automation.html">Industrial Automation & Motor Control</a></li>
                <li><a href="${base}services/mechanical-equipment.html">Mechanical & Fluid Handling</a></li>
                <li><a href="${base}services/industrial-servicing.html">Professional & Technical Services</a></li>
              </ul>
            </div>
            <div>
              <h3 class="site-footer__title">Quick Contact</h3>
              <ul class="site-footer__links">
                <li><a href="${base}contact.html">Lead form (3 steps)</a></li>
                <li><a href="${base}docs/COMPANY_PROFILE_2026.pdf" target="_blank" rel="noopener noreferrer">Company profile</a></li>
              </ul>
            </div>
          </div>
          <div class="site-footer__meta">
            <span>© <span data-year></span> Winding Technologies. All rights reserved.</span>
            <span>Designed and powered by Arcae Business Solutions</span>
          </div>
        </div>
      </footer>
    `;
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

function wireNavToggle() {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav__list");
  if (!nav || !btn || !list) return;

  const servicesItem = document.querySelector("[data-services-item]");
  const servicesToggle = document.querySelector("[data-services-toggle]");

  function close() {
    nav.classList.remove("nav--open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    if (servicesItem) servicesItem.classList.remove("nav__item--open");
    if (servicesToggle) servicesToggle.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    btn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  if (servicesItem && servicesToggle instanceof HTMLButtonElement) {
    servicesToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const willOpen = !servicesItem.classList.contains("nav__item--open");
      servicesItem.classList.toggle("nav__item--open", willOpen);
      servicesToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  }

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Node)) return;
    if (!nav.contains(e.target)) close();
  });
}

function wireScrollReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("reveal--visible");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.18 }
  );
  els.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

function setFieldValidity(fieldEl, valid, message) {
  if (!fieldEl) return;
  fieldEl.classList.toggle("field--invalid", !valid);
  const err = fieldEl.querySelector("[data-field-error]");
  if (err && message) err.textContent = message;
}

function wireMultiStepForm() {
  const form = document.querySelector("[data-multistep-form]");
  if (!(form instanceof HTMLFormElement)) return;

  const steps = Array.from(form.querySelectorAll("[data-form-step]"));
  const stepper = Array.from(form.querySelectorAll("[data-stepper-step]"));
  const btnPrev = form.querySelector("[data-form-prev]");
  const btnNext = form.querySelector("[data-form-next]");
  const btnSubmit = form.querySelector("[data-form-submit]");
  const toast = form.querySelector("[data-form-toast]");

  let stepIdx = 0;

  function showStep(idx) {
    stepIdx = Math.max(0, Math.min(idx, steps.length - 1));
    steps.forEach((el, i) => (el.hidden = i !== stepIdx));
    stepper.forEach((el, i) => el.classList.toggle("stepper__step--active", i === stepIdx));

    const isFirst = stepIdx === 0;
    const isLast = stepIdx === steps.length - 1;

    if (btnPrev instanceof HTMLButtonElement) btnPrev.disabled = isFirst;
    if (btnNext instanceof HTMLButtonElement) btnNext.hidden = isLast;
    if (btnSubmit instanceof HTMLButtonElement) btnSubmit.hidden = !isLast;

    const focusTarget = steps[stepIdx]?.querySelector("input, select, textarea, button");
    if (focusTarget instanceof HTMLElement) focusTarget.focus();
  }

  function validateStep(idx) {
    const step = steps[idx];
    if (!step) return true;

    const required = Array.from(step.querySelectorAll("[data-required]"));
    let ok = true;

    for (const control of required) {
      const name = control.getAttribute("name") || "This field";
      const field = control.closest(".field");
      const value = (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement)
        ? control.value.trim()
        : "";

      if (!value) {
        ok = false;
        setFieldValidity(field, false, `${name} is required.`);
        continue;
      }

      if (control instanceof HTMLInputElement && control.type === "email") {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!validEmail) {
          ok = false;
          setFieldValidity(field, false, "Enter a valid email address.");
          continue;
        }
      }

      setFieldValidity(field, true);
    }

    return ok;
  }

  form.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) return;
    const field = t.closest(".field");
    if (!field) return;
    setFieldValidity(field, true);
  });

  if (btnPrev instanceof HTMLButtonElement) {
    btnPrev.addEventListener("click", () => showStep(stepIdx - 1));
  }
  if (btnNext instanceof HTMLButtonElement) {
    btnNext.addEventListener("click", () => {
      if (!validateStep(stepIdx)) return;
      showStep(stepIdx + 1);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep(stepIdx)) return;

    if (toast instanceof HTMLElement) {
      toast.textContent = "Thanks—your request is ready to send. (Demo: wire this to email/API when you’re ready.)";
      toast.classList.add("toast--show");
    }
    form.reset();
    steps.forEach((s) => Array.from(s.querySelectorAll(".field")).forEach((f) => f.classList.remove("field--invalid")));
    showStep(0);
  });

  showStep(0);
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeaderFooter();
  wireNavToggle();
  wireScrollReveal();
  wireMultiStepForm();
});

