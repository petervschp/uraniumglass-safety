// Maličký JS: zvýraznenie aktívnej sekcie v menu (nenápadne)
(() => {
  const links = Array.from(document.querySelectorAll(".nav a"));
  const map = new Map();
  links.forEach(a => {
    const id = a.getAttribute("href")?.replace("#","");
    if (id) map.set(id, a);
  });

  const sections = Array.from(map.keys()).map(id => document.getElementById(id)).filter(Boolean);

  const setActive = (id) => {
    links.forEach(l => l.classList.remove("is-active"));
    const a = map.get(id);
    if (a) a.classList.add("is-active");
  };

  const io = new IntersectionObserver((entries) => {
    // vyber najviac viditeľnú sekciu
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => (b.intersectionRatio - a.intersectionRatio))[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.1, 0.2, 0.4, 0.6] });

  sections.forEach(s => io.observe(s));
})();
