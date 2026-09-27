document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero = document.querySelector('.hero');
const shapes = document.querySelectorAll('.hero .shape');

if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const baseTransforms = {
    circle: 'scale(1)',
    triangle: 'translateY(0)',
    square: 'rotate(14deg) scale(1)'
  };

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    shapes.forEach((shape, i) => {
      const depth = (i + 1) * 7;
      const key = shape.classList.contains('circle') ? 'circle'
        : shape.classList.contains('triangle') ? 'triangle' : 'square';
      const px = (relX * depth).toFixed(2);
      const py = (relY * depth).toFixed(2);
      shape.style.transform = `${baseTransforms[key]} translate(${px}px, ${py}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    shapes.forEach((shape) => {
      const key = shape.classList.contains('circle') ? 'circle'
        : shape.classList.contains('triangle') ? 'triangle' : 'square';
      shape.style.transform = baseTransforms[key];
    });
  });
}
