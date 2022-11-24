(function ($) {
  $(document).ready(function(){

    $(".formAction").submit(function(e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
          url: $(this).attr("action"),
          type: 'POST',
          data: formData,
          success: function (data) {
            alert(data)
          },
          cache: false,
          contentType: false,
          processData: false
        });
    });

    $(document).on('click', function(){
      $('.burger-btn').removeClass('isActive');
      $('.main-menu').removeClass('show');
      $('body').removeClass('fixed');
    }).find('.burger-btn, .main-menu').on('click', function(e){
      e.stopPropagation();
    });

    $('.hide-video-controls').hover(function() {
      if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
      } else {
        this.setAttribute("controls", "controls")
      }
    });

    $('#image-input').change(function() {
      readURL(this);
    });

    $('a').on('click', function (e) {
      let link = $(this).attr('href');
      let symbol = link.substr(0, 1);
      let headerHeight = $('header').outerHeight();
      if (symbol == '#') {
        e.preventDefault();
        let top = $(link).offset().top - headerHeight;
        $('body,html').animate({scrollTop: top}, 1000);			
      }
    });

    mobileMenu();
    fixedHeader();
    languageSwitcher();

    const videoSlider = new Swiper('.home-video-slider', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 80,
      navigation: {
        nextEl: '.home-video-next',
        prevEl: '.home-video-prev',
      },
    });

    appSliderInit('.about-app-slider', 0);
    appSliderInit('.request-demo-slider', 1);

  });

  $(window).on('scroll', function() {
    fixedHeader();
  });

  $(window).on('resize', function(){
  });

})(jQuery);

function appSliderInit(selector, initialSlide) {
  if($(selector).length > 0){
    let appSlider = new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 40,
      initialSlide: initialSlide,
      pagination: {
        el: '.about-app-pagination',
        clickable: true,
      },
    });
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function(e) {
      $('#image-output').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

//mobile menu
function mobileMenu() {
  let body = document.querySelector('body');
  let burgerBtn = document.querySelector('.burger-btn');
  let mobileMenu = document.querySelector('.main-menu');
  burgerBtn.onclick = function () {
    this.classList.toggle('isActive');
    mobileMenu.classList.toggle('show');
    body.classList.toggle('fixed');
  }
}

//fixed header
function fixedHeader() {
  let header = document.querySelector('.header');
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
};

//show language list
function languageSwitcher(){
  $('.current-language').on('click', function(){
    $(this).parent().toggleClass('isActive');
    $(this).siblings('ul').slideToggle();
  });
}


