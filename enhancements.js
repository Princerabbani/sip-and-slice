/* Progressive scroll reveal; content remains visible if reduced motion is preferred. */
(() => {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const updateHeader = () => header && header.classList.toggle("scrolled", window.scrollY > 12);
  updateHeader(); window.addEventListener("scroll", updateHeader, {passive:true});
  if (reduce || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("reveal-ready");
  const seen = new WeakSet();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), {threshold:0.12, rootMargin:"0px 0px -35px 0px"});
  const prepare = node => { if (!(node instanceof Element) || seen.has(node)) return; seen.add(node); node.classList.add("reveal"); observer.observe(node); };
  document.querySelectorAll(".section-heading, .menu-tools, .menu-card, .story-image, .story-copy, .gallery-tile, .visit-copy, .visit-card, .treat-strip").forEach(prepare);
  const grid = document.querySelector("#menuGrid");
  if (grid) new MutationObserver(() => grid.querySelectorAll(".menu-card").forEach(prepare)).observe(grid, {childList:true});
})();
