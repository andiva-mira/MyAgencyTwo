/**
 * Svelte action — adds `visible` class when element enters viewport.
 * Usage: <div use:reveal={{ delay: 100 }}>
 */
export function reveal(node, { delay = 0, duration = 680, y = 32, rootMargin = '0px' } = {}) {
  node.classList.add('reveal');
  node.style.setProperty('--r-delay', `${delay}ms`);
  node.style.setProperty('--r-dur', `${duration}ms`);
  node.style.setProperty('--r-y', `${y}px`);

  const observer = new IntersectionObserver(
    ([entry]) => {
      node.classList.toggle('visible', entry.isIntersecting);
    },
    { threshold: 0.12, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
