document.addEventListener('DOMContentLoaded', () => {

  //swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 24,
    grabCursor: true,
    allowTouchMove: true,
    mousewheel: {
      forceToAxis: true, // 横方向のスクロールのみSwiperに渡す
      sensitivity: 0.5,    // スクロール感度を下げる（デフォルト1）
      thresholdDelta: 50,  // この移動量を超えたときだけスライド（デフォルト値なし）
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      481: {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 40,
      },
    },
  });

  //セクション表示でナビ反応
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".header__navlink");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("is-active"); //一旦全部の色を戻す

            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("is-active"); //該当リンクだけアクティブ
            }
          });
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-30% 0px -30% 0px",
    });

  sections.forEach(section => observer.observe(section));

  //planコンテンツ切替
  document.querySelectorAll('.p-plan__tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // is-active を一旦全部外す
      document.querySelectorAll('.p-plan__tab-btn').forEach(b => b.classList.remove('is-active'));
      document.querySelectorAll('.p-plan__content').forEach(c => c.classList.remove('is-active'));

      // クリックしたタブとコンテンツにis-activeをつける
      btn.classList.add('is-active');
      document.getElementById(btn.dataset.tab).classList.add('is-active');
    });
  });

  //galleryモーダル
  const items = document.querySelectorAll('.p-gallery__item img');
  const modal = document.querySelector('.p-modal');
  const modalImage = modal.querySelector('img');
  const closeBtn = modal.querySelector('.p-modal__close');
  const overlay = modal.querySelector('.p-modal__overlay');
  const modalContent = modal.querySelector('.p-modal__content');

  const clearSelected = () => {
    document.querySelectorAll('.p-gallery__item')
      .forEach(item => item.classList.remove('is-selected'));
  }

  items.forEach(img => {
    img.addEventListener('click', () => {
      clearSelected();

      const parent = img.closest('.p-gallery__item');
      parent.classList.add('is-selected');

      modal.classList.add('is-open');
      modalImage.src = img.src;
      modalImage.alt = img.alt;
    });
  });

  const closeModal = () => {
    modal.classList.remove('is-open');
    clearSelected();
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});

//SPハンバーガーメニュー
const hamburger = document.querySelector('.js-hamburger');
const drawer = document.querySelector('.js-drawer');
const navLinks = document.querySelectorAll('.js-drawer a');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    drawer.classList.toggle('is-active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      drawer.classList.remove('is-active');
    });
  });
}