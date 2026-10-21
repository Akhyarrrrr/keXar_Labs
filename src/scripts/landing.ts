import { journeyPose, journeyProgress } from "@/lib/journey";

export function initLanding() {
  const root = document.querySelector<HTMLElement>("[data-landing]");
  if (!root) return;
  const journey = root.querySelector<HTMLElement>("[data-journey]")!;
  const visual = root.querySelector<HTMLElement>("[data-visual]")!;
  const photograph = root.querySelector<HTMLElement>("[data-scene-image]")!;
  const hero = root.querySelector<HTMLElement>("[data-hero]")!;
  const horizon = root.querySelector<HTMLElement>("[data-horizon]")!;
  const previews = [...root.querySelectorAll<HTMLElement>("[data-preview]")];
  const loader = root.querySelector<HTMLElement>("[data-loader]")!;
  const actions = root.querySelector<HTMLElement>("[data-load-actions]")!;
  const header = document.querySelector<HTMLElement>(".kx-header");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const abort = new AbortController(),
    { signal } = abort;
  let animation = 0,
    last = 0,
    progress = 0,
    target = 0,
    top = 0,
    height = 0;
  let width = innerWidth,
    viewportHeight = innerHeight,
    visible = true,
    disposed = false,
    generation = 0;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let revert: (() => void) | undefined;
  const setBlocked = (blocked: boolean) => {
    document.documentElement.classList.toggle("kx-is-loading", blocked);
    for (const child of root.children)
      if (child !== loader && child instanceof HTMLElement)
        child.inert = blocked;
    if (header) header.inert = blocked;
    const footer = document.querySelector<HTMLElement>(".kx-footer");
    if (footer) footer.inert = blocked;
  };
  const closeLoader = () => {
    clearTimeout(timeout);
    loader.hidden = true;
    setBlocked(false);
    if (loader.contains(document.activeElement))
      document.getElementById("main-content")?.focus({ preventScroll: true });
  };
  const paint = () => {
    const pose = journeyPose(progress),
      mobile = width < 760;
    const scale = 1 - pose.frame * (mobile ? 0.12 : 0.46);
    const left = width * (mobile ? 0.06 : 0.05) * pose.frame;
    const down = viewportHeight * (mobile ? 0.14 : 0.23) * pose.frame;
    visual.style.transform = `translate3d(${left}px,${down}px,0) scale(${scale})`;
    visual.style.height = `${viewportHeight * (1 - (mobile ? 0.55 : 0) * pose.frame)}px`;
    visual.style.borderRadius = `${pose.frame * 8}px`;
    photograph.style.transform = `scale(${1 + pose.push * 0.16})`;
    hero.style.opacity = String(pose.hero);
    hero.inert = pose.hero < 0.1;
    hero.style.transform = `translate3d(0,${-pose.push * 35}px,0)`;
    previews.forEach(
      (element) => (element.style.opacity = String(pose.preview)),
    );
    horizon.style.opacity = String(pose.copy);
    horizon.inert = pose.copy < 0.8;
    root.querySelector<HTMLElement>("[data-progress]")!.style.transform =
      `scaleX(${progress})`;
    header?.classList.toggle(
      "kx-header-solid",
      progress > 0.36 || scrollY > top + height,
    );
  };
  function frame(time: number) {
    animation = 0;
    if (
      disposed ||
      !visible ||
      document.hidden ||
      root!.dataset.renderer !== "ready"
    )
      return;
    const delta = last ? Math.min(0.06, (time - last) / 1000) : 0.016;
    last = time;
    progress += (target - progress) * (1 - Math.exp(-delta * 9));
    if (Math.abs(target - progress) < 0.0001) progress = target;
    paint();
    if (progress !== target) animation = requestAnimationFrame(frame);
  }
  const request = () => {
    if (
      !animation &&
      !disposed &&
      visible &&
      !document.hidden &&
      root.dataset.renderer === "ready"
    ) {
      last = 0;
      animation = requestAnimationFrame(frame);
    }
  };
  function update() {
    target = journeyProgress(scrollY, top, height, viewportHeight);
    header?.classList.toggle(
      "kx-header-solid",
      root!.dataset.renderer === "ready"
        ? target > 0.36 || scrollY > top + height
        : scrollY > innerHeight * 0.8,
    );
    request();
  }
  function measure() {
    width = innerWidth;
    viewportHeight =
      root!.dataset.renderer === "fallback"
        ? innerHeight
        : journey.querySelector<HTMLElement>(".kx-stage")!.clientHeight ||
          innerHeight;
    top = journey.getBoundingClientRect().top + scrollY;
    height = journey.offsetHeight;
    update();
  }
  function fallback() {
    generation++;
    clearTimeout(timeout);
    cancelAnimationFrame(animation);
    animation = 0;
    revert?.();
    revert = undefined;
    root!.dataset.renderer = "fallback";
    for (const element of [visual, photograph, hero, horizon, ...previews])
      element.removeAttribute("style");
    hero.inert = horizon.inert = false;
    closeLoader();
    measure();
  }
  function failed(run: number) {
    if (run !== generation || disposed) return;
    clearTimeout(timeout);
    generation++;
    root!.querySelector("[data-load-status]")!.textContent =
      "Loading could not finish. Try again, or continue to the page.";
    actions.hidden = false;
    loader.focus();
  }
  async function start() {
    if (disposed) return;
    if (reduced.matches) {
      fallback();
      return;
    }
    const run = ++generation;
    loader.hidden = false;
    actions.hidden = true;
    loader.style.removeProperty("clip-path");
    setBlocked(true);
    loader.focus();
    root!.dataset.renderer = "loading";
    const total = 5;
    let complete = 0;
    const report = () => {
      if (run !== generation) return;
      const percent = Math.min(99, Math.floor((++complete / total) * 100));
      root!.querySelector("[data-load-percent]")!.textContent = `${percent}%`;
      root!.querySelector<HTMLElement>("[data-load-line]")!.style.transform =
        `scaleY(${percent / 100})`;
    };
    root!.querySelector("[data-load-percent]")!.textContent = "0%";
    root!.querySelector<HTMLElement>("[data-load-line]")!.style.transform =
      "scaleY(0)";
    root!.querySelector("[data-load-status]")!.textContent =
      "Loading the experience.";
    timeout = setTimeout(() => failed(run), 30000);
    try {
      const fonts = Promise.all([
        ...[400,500,600].map(weight => `${weight} 24px Switzer`),
        '500 24px "Clash Display"',
      ].map(font => document.fonts.load(font).then(report)));
      const modules = Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).then((result) => {
        report();
        return result;
      });
      const [, [{ gsap }, { ScrollTrigger }]] = await Promise.all([
        fonts,
        modules,
      ]);
      if (run !== generation || disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      root!.dataset.renderer = "ready";
      measure();
      progress = target;
      paint();
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      if (run !== generation || disposed) return;
      root!.querySelector("[data-load-percent]")!.textContent = "100%";
      root!.querySelector<HTMLElement>("[data-load-line]")!.style.transform =
        "scaleY(1)";
      clearTimeout(timeout);
      const context = gsap.context(() => {
        gsap.to(loader, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: closeLoader,
        });
        if (target < 0.02)
          gsap.from(".kx-title-line", {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.09,
            delay: 0.2,
            ease: "power3.out",
          });
        gsap.from(".kx-approach-heading", {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: ".kx-approach",
            start: "top bottom",
            end: "top 35%",
            scrub: 1,
          },
        });
      }, root!);
      revert = () => context.revert();
      request();
    } catch (error) {
      if (run === generation) {
        console.warn("Landing preparation failed.", error);
        failed(run);
      }
    }
  }
  root
    .querySelector("[data-retry]")!
    .addEventListener("click", () => void start(), { signal });
  root.querySelector("[data-skip]")!.addEventListener(
    "click",
    () => {
      fallback();
      document.getElementById("approach-title")?.focus();
      document.getElementById("approach")?.scrollIntoView();
    },
    { signal },
  );
  loader.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        fallback();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = actions.hidden
        ? []
        : [...loader.querySelectorAll<HTMLButtonElement>("button")];
      if (!controls.length) {
        event.preventDefault();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === controls[0] ||
          document.activeElement === loader)
      ) {
        event.preventDefault();
        controls.at(-1)!.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === controls.at(-1)
      ) {
        event.preventDefault();
        controls[0].focus();
      }
    },
    { signal },
  );
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) request();
    else {
      cancelAnimationFrame(animation);
      animation = 0;
    }
  });
  observer.observe(journey);
  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(journey);
  window.addEventListener("scroll", update, { passive: true, signal });
  window.addEventListener("resize", measure, { passive: true, signal });
  document.addEventListener("visibilitychange", request, { signal });
  reduced.addEventListener(
    "change",
    () => {
      if (reduced.matches) fallback();
      else void start();
    },
    { signal },
  );
  root.querySelector(".kx-scroll")?.addEventListener(
    "click",
    (event) => {
      if (root.dataset.renderer !== "ready") return;
      event.preventDefault();
      scrollTo({
        top: top + (height - viewportHeight) * 0.87,
        behavior: "smooth",
      });
    },
    { signal },
  );
  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) return;
      disposed = true;
      fallback();
      abort.abort();
      observer.disconnect();
      resizeObserver.disconnect();
    },
    { signal },
  );
  document.documentElement.classList.remove("kx-pending");
  measure();
  void start();
}
