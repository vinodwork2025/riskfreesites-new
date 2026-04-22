(function($) {

  "use strict";

  $(document).ready(function() {

    initIsotope();
    initLightbox();
    initSwiper();
    initScrollProgress();
    initRevealOnScroll();
    initHeroParallax();

  });

  function initLightbox() {
    if (typeof lightbox === "undefined") {
      return;
    }

    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      fitImagesInViewport: true
    });
  }

  function initSwiper() {
    if (typeof Swiper === "undefined" || !document.querySelector(".testimonial-swiper")) {
      return;
    }

    new Swiper(".testimonial-swiper", {
      spaceBetween: 20,
      pagination: {
        el: ".testimonial-swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        800: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 3,
        }
      },
    });
  }

  function initRevealOnScroll() {
    var selectors = [
      ".hero-banner",
      ".service-strip",
      ".mini-feature-card",
      ".content-card",
      ".image-stack-card",
      ".skill-card",
      ".timeline-card",
      "#filters .btn-filter",
      ".portfolio-item",
      ".inspiration-banner",
      ".contact-panel",
      ".contact-card"
    ];

    var elements = document.querySelectorAll(selectors.join(","));

    if (!elements.length) {
      return;
    }

    elements.forEach(function(element, index) {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-order", String(index % 6));
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function(element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -60px 0px"
    });

    elements.forEach(function(element) {
      observer.observe(element);
    });
  }

  function initScrollProgress() {
    var ticking = false;

    function updateProgress() {
      var doc = document.documentElement;
      var scrollTop = window.pageYOffset || doc.scrollTop;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

      document.body.style.setProperty("--scroll-progress", progress.toFixed(4));
      ticking = false;
    }

    window.addEventListener("scroll", function() {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  function initHeroParallax() {
    var hero = document.querySelector(".hero-banner");
    var art = document.querySelector(".hero-banner-art");

    if (!hero || !art || window.innerWidth < 992 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var ticking = false;

    function updateParallax() {
      var rect = hero.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      var translateY = Math.max(-12, Math.min(18, (progress - 0.45) * 28));

      art.style.transform = "translate3d(0," + translateY.toFixed(2) + "px,0) scale(1.02)";
      ticking = false;
    }

    window.addEventListener("scroll", function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener("resize", updateParallax);
    updateParallax();
  }

  function initIsotope() {

    $(".grid").each(function() {
      var $buttonGroup = $(".button-group");
      var $checked = $buttonGroup.find(".is-checked");
      var filterValue = $checked.attr("data-filter");

      var $grid = $(".grid").isotope({
        itemSelector: ".portfolio-item",
        filter: filterValue
      });

      $(".button-group").on("click", "a", function(e) {
        e.preventDefault();
        filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });

      $(".button-group").each(function() {
        $buttonGroup.on("click", "a", function() {
          $buttonGroup.find(".is-checked").removeClass("is-checked");
          $(this).addClass("is-checked");
        });
      });
    });
  }

})(jQuery);
