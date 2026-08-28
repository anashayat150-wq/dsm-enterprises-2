// DSM Enterprises — site interactions

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll-reveal for sections (progressive enhancement — see CSS:
     sections are visible by default; JS arms the fade-in effect). */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    reveals.forEach(function (el) { el.classList.add('js-ready'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* Ensure hero video actually plays on mobile browsers that pause it */
  var heroVideo = document.querySelector('.hero-video__el');
  if (heroVideo) {
    var tryPlay = function () { heroVideo.play().catch(function () {}); };
    tryPlay();
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
  }

});
