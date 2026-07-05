/* ==========================================================================
   Small site-wide behaviors. You should not need to edit this file.
   - mobile nav toggle
   - animated waveform bars in the home hero
   - scroll-reveal animation
   - contact form submit (Web3Forms) with inline status message
   ========================================================================== */

(function () {
  "use strict";

  /* ----- Mobile nav ----- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ----- Hero waveform bars ----- */
  const wave = document.querySelector(".waveform");
  if (wave) {
    const BARS = 36;
    for (let i = 0; i < BARS; i++) {
      const bar = document.createElement("span");
      // randomized height/tempo so it feels like a live meter, not a loop
      bar.style.height = 18 + Math.random() * 82 + "%";
      bar.style.animationDelay = (Math.random() * -1.6).toFixed(2) + "s";
      bar.style.animationDuration = (0.9 + Math.random() * 1.2).toFixed(2) + "s";
      wave.appendChild(bar);
    }
  }

  /* ----- Scroll reveal ----- */
  const revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----- Contact form (progressive enhancement over normal POST) ----- */
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent = "Sending…";
      status.removeAttribute("data-state");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            form.reset();
            status.textContent = "Thanks — your message is on its way!";
            status.dataset.state = "ok";
          } else {
            throw new Error(data.message || "Submission failed");
          }
        })
        .catch(function () {
          status.textContent =
            "Something went wrong. Please email me directly instead.";
          status.dataset.state = "error";
        });
    });
  }
})();
