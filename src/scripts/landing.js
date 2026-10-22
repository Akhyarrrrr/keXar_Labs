import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

(() => {
  const header = document.querySelector(".site-nav");
  const main = document.querySelector("main");
  const menu = document.querySelector(".nav-menu");
  const loader = document.querySelector(".preloader");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const form = document.querySelector(".project-form");
  form.addEventListener("submit", (event) => event.preventDefault());
  // Preview only: fields stay local, with no sending or simulated success.
  const updateHeader = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 32);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
  header.addEventListener("click", (event) => {
    if (event.target.closest("a")) menu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!header.contains(event.target)) menu.open = false;
  });
  header.inert = main.inert =
    document.documentElement.classList.contains("is-loading");

  function enterPage() {
    clearTimeout(window.kexarLoadingFallback);
    const finish = () => {
      loader.hidden = true;
      document.documentElement.classList.remove("is-loading");
      header.inert = main.inert = false;
      if (ScrollTrigger) ScrollTrigger.refresh();
    };
    if (loader.hidden || !gsap || reducedMotion.matches) {
      finish();
      return;
    }
    gsap
      .timeline({ onComplete: finish })
      .to(
        ".loader-wordmark, .loader-bottom",
        { y: -16, opacity: 0, duration: 0.3, ease: "power2.in" },
        0,
      )
      .to(
        loader,
        { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "power3.inOut" },
        0.08,
      );
    if (window.scrollY < 50) {
      gsap.from(".hero-copy h1 span", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        delay: 0.55,
        ease: "power2.out",
      });
    }
  }

  async function preparePage() {
    const images = [
      ...new Map(
        [...document.images].map((image) => [
          image.currentSrc || image.src,
          image,
        ]),
      ).values(),
    ];
    const total = images.length + 2;
    let completed = 0;
    const progress = () => {
      completed += 1;
      const percent = Math.round((completed / total) * 100);
      document.querySelector(".loader-count").innerHTML =
        String(percent).padStart(2, "0") + "<span>%</span>";
      document.querySelector(".loader-line span").style.width = percent + "%";
    };
    const tasks = [
      document.fonts.ready.then(progress),
      ...images.map((image) => image.decode().then(progress)),
    ];
    const results = await Promise.allSettled(tasks);
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    if (results.every((result) => result.status === "fulfilled")) progress();
    else
      document.querySelector(".loader-status").textContent =
        "Opening available content";
    enterPage();
  }

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        spacious: "(min-width: 1000px) and (min-height: 760px)",
      },
      (context) => {
        if (!context.conditions.motion) return;
        const pinnedServices = context.conditions.spacious;
        document.documentElement.classList.toggle(
          "scope-pinned",
          pinnedServices,
        );
        document.documentElement.classList.add("motion");
        const stage = document.querySelector(".journey-stage");
        const caption = document.querySelector(".device-caption");
        const laptop = document.querySelector(".journey-panel");
        let devices;
        function measureDevices() {
          const width = stage.clientWidth;
          const height = stage.clientHeight;
          const regionTop =
            caption.offsetTop +
            caption.offsetHeight +
            Math.max(32, height * 0.045);
          const regionBottom = height - Math.min(88, height * 0.12);
          const laptopWidth = Math.min(
            width * (width <= 600 ? 0.82 : 0.7),
            Math.max(100, regionBottom - regionTop) / 0.65,
          );
          const laptopHeight = laptopWidth * 0.65;
          const centerY = regionTop + (regionBottom - regionTop) / 2;
          const centerX = width * 0.445;
          const phoneWidth = laptopWidth * 0.255;
          devices = {
            width: laptopWidth,
            height: laptopHeight,
            top: centerY,
            left: centerX,
          };
          gsap.set(".phone", {
            width: phoneWidth,
            height: phoneWidth * 2.15,
            left: Math.min(
              width * 0.95 - phoneWidth,
              centerX + laptopWidth / 2 - phoneWidth * 0.35,
            ),
            right: "auto",
            top: centerY + laptopHeight / 2 - phoneWidth * 2.15 + 7,
          });
        }
        measureDevices();
        ScrollTrigger.addEventListener("refreshInit", measureDevices);
        gsap
          .timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: ".journey",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                laptop.classList.toggle("is-device", self.progress > 0.21),
            },
          })
          .to(".hero-image", { scale: 1.035, duration: 0.8 }, 0.15)
          .to(
            ".hero-copy, .hero-bottom",
            { opacity: 0, y: -15, duration: 0.4 },
            0.35,
          )
          .to(
            ".journey-panel",
            {
              width: () => devices.width,
              height: () => devices.height,
              top: () => devices.top,
              left: () => devices.left,
              borderWidth: () => Math.max(5, devices.width * 0.012),
              borderRadius: 13,
              padding: 1,
              boxShadow:
                "0 0 0 1px #60696d, 0 0 0 2.5px #d3d8da, 0 30px 45px -25px #24323860",
              duration: 1.75,
            },
            0.8,
          )
          .to(".hero-image", { scale: 1, duration: 1.4 }, 1)
          .to(
            ".laptop-camera, .laptop-hinge, .laptop-foot, .screen-brand",
            { opacity: 1, duration: 0.35 },
            2,
          )
          .to(
            ".hero-copy, .hero-bottom",
            { opacity: 1, y: 0, duration: 0.4 },
            2.3,
          )
          .to(".device-caption", { opacity: 1, duration: 0.5 }, 2.25)
          .fromTo(
            ".phone",
            { y: 45, rotation: 0 },
            { opacity: 1, y: 0, duration: 0.7 },
            2.45,
          )
          .to(".device-baseline", { opacity: 1, duration: 0.4 }, 2.8)
          .to({}, { duration: 0.5 }, 3.2);

        gsap.fromTo(
          ".bridge h2 span",
          { opacity: 0.35 },
          {
            opacity: 1,
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: ".bridge",
              start: "top 80%",
              end: "center 60%",
              scrub: 0.35,
            },
          },
        );
        document.querySelectorAll(".work-slot").forEach((slot) => {
          gsap.to(slot.querySelector(".work-reveal"), {
            scaleX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: slot,
              start: "top 90%",
              end: "top 35%",
              scrub: 0.35,
            },
          });
          gsap.from(slot.querySelector(".work-stage"), {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: slot,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.35,
            },
          });
        });

        const panels = [...document.querySelectorAll(".service")];
        const setActive = (index) =>
          panels.forEach((panel, i) => {
            panel.inert = i !== index;
            panel.setAttribute("aria-hidden", String(i !== index));
          });
        if (pinnedServices) {
          setActive(0);
          gsap.set(".service-app, .service-auto", {
            clipPath: "inset(100% 0 0 0)",
          });
          gsap.set(".web-page, .web-outline, .app-plane", { rotation: 0 });
          gsap
            .timeline({
              defaults: { ease: "power2.inOut" },
              onUpdate() {
                const time = this.time();
                setActive(time < 2.45 ? 0 : time < 4.9 ? 1 : 2);
              },
              scrollTrigger: {
                trigger: ".scope",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.35,
              },
            })
            .fromTo(".web-page", { y: 24 }, { y: 0, duration: 1.3 }, 0)
            .fromTo(".web-outline", { x: 16 }, { x: 0, duration: 1.3 }, 0)
            .to(
              ".service-app",
              { clipPath: "inset(0% 0 0 0)", duration: 0.8 },
              1.65,
            )
            .fromTo(
              ".app-front",
              { xPercent: 8 },
              { xPercent: 0, duration: 1.1 },
              2.5,
            )
            .fromTo(
              ".app-back",
              { xPercent: -12 },
              { xPercent: 0, duration: 1.1 },
              2.5,
            )
            .to(
              ".service-auto",
              { clipPath: "inset(0% 0 0 0)", duration: 0.8 },
              4.1,
            )
            .fromTo(
              ".automation-source",
              { xPercent: 8 },
              { xPercent: 0, duration: 1.2 },
              5,
            )
            .fromTo(
              ".automation-brief",
              { xPercent: -8 },
              { xPercent: 0, duration: 1.2 },
              5,
            )
            .fromTo(
              ".automation-connection span",
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8 },
              5,
            )
            .to({}, { duration: 0.5 }, 6.5);
        } else {
          panels.forEach((panel) => {
            const art = panel.querySelector(
              ".web-art,.app-art,.automation-art",
            );
            gsap.from(art, {
              y: 35,
              ease: "none",
              scrollTrigger: {
                trigger: art,
                start: "top 95%",
                end: "center 65%",
                scrub: 0.35,
              },
            });
          });
        }

        document.querySelectorAll(".process-list article").forEach((row) => {
          gsap.from(row.querySelector(".process-rule"), {
            scaleX: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.35,
            },
          });
        });
        gsap.from(".approach-intro h2", {
          clipPath: "inset(0 0 100% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: ".approach-intro",
            start: "top 85%",
            end: "top 45%",
            scrub: 0.35,
          },
        });
        gsap.from(".contact-body", {
          y: 28,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-body",
            start: "top 95%",
            end: "top 70%",
            scrub: 0.35,
          },
        });
        gsap.from(".contact-opening h2 span", {
          yPercent: 20,
          opacity: 0.2,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact",
            start: "top 85%",
            end: "top 20%",
            scrub: 0.35,
          },
        });
        gsap.from(".contact-arrow", {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact",
            start: "top bottom",
            end: "top 15%",
            scrub: 0.35,
          },
        });
        return () => {
          document.documentElement.classList.remove("motion", "scope-pinned");
          laptop.classList.remove("is-device");
          ScrollTrigger.removeEventListener("refreshInit", measureDevices);
          panels.forEach((panel) => {
            panel.inert = false;
            panel.removeAttribute("aria-hidden");
          });
        };
      },
    );

    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cursor = document.querySelector(".studio-cursor");
        const label = cursor.querySelector("span");
        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.16,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.16,
          ease: "power3.out",
        });
        const widthTo = gsap.quickTo(cursor, "width", {
          duration: 0.2,
          ease: "power3.out",
        });
        const heightTo = gsap.quickTo(cursor, "height", {
          duration: 0.2,
          ease: "power3.out",
        });
        const hide = () => {
          cursor.style.opacity = "0";
          document.documentElement.classList.remove("cursor-on");
        };
        const move = (event) => {
          const target = event.target;
          if (
            document.documentElement.classList.contains("is-loading") ||
            target.closest(
              'input:not([type="checkbox"]),textarea,select,button:disabled',
            )
          ) {
            hide();
            return;
          }
          const interactive = target.closest(
            "a,button,summary,.service-choices label",
          );
          const scrollArea = target.closest("[data-cursor]");
          let x = event.clientX,
            y = event.clientY,
            width = 22,
            height = 22;
          cursor.dataset.mode = "point";
          label.textContent = "";
          if (interactive) {
            const rect = interactive.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
            width = rect.width + 14;
            height = rect.height + 12;
            cursor.dataset.mode = "link";
          } else if (scrollArea) {
            width = 74;
            height = 34;
            label.textContent = scrollArea.dataset.cursor;
            cursor.dataset.mode = "scroll";
          }
          if (!document.documentElement.classList.contains("cursor-on"))
            gsap.set(cursor, { x, y });
          document.documentElement.classList.add("cursor-on");
          cursor.style.opacity = "1";
          xTo(x);
          yTo(y);
          widthTo(width);
          heightTo(height);
        };
        document.addEventListener("pointermove", move);
        document.documentElement.addEventListener("pointerleave", hide);
        window.addEventListener("scroll", hide, { passive: true });
        window.addEventListener("blur", hide);
        return () => {
          hide();
          document.removeEventListener("pointermove", move);
          document.documentElement.removeEventListener("pointerleave", hide);
          window.removeEventListener("scroll", hide);
          window.removeEventListener("blur", hide);
        };
      },
    );
  }
  preparePage().catch(enterPage);
})();
