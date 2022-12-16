$(window).on("load", function () {
  $("body").removeClass("overflow");
});
$(document).ready(function () {
  /*************** Animation ***************/
  sal({
    once: true,
  });
  /*************** Landing Header ***************/
  new bootstrap.ScrollSpy(document.body, {
    target: "#fixedNavbar",
  });
  $("#fixedNavbar>ul>li>a[href^='#']").on("click", function (e) {
    e.preventDefault();
    var hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(this.hash).offset().top,
      },
      500,
      function () {
        window.location.hash = hash;
      }
    );
    if ($(window).width() <= 767) {
      $(".header-navbar").slideUp(300);
      $(".menu-btn").removeClass("active");
      $("body").removeClass("overflow");
    }
  });

  /*************** Fixed Header ***************/
  var prevScroll = $(window).scrollTop();

  $(this).scrollTop() >= 250
    ? $("header").addClass("header-scroll")
    : $("header").removeClass("header-scroll fixsedt");
  $(window).scroll(function () {
    $(this).scrollTop() >= 250
      ? $("header").addClass("header-scroll")
      : $("header").removeClass("header-scroll fixsedt");

    var currentScroll = $(window).scrollTop();
    prevScroll < currentScroll && prevScroll > 0
      ? $("header").removeClass("fixsedt")
      : $("header").addClass("fixsedt"),
      (prevScroll = currentScroll);
  });

  /*************** Mobile Menu ***************/
  $(".menu-btn").click(function () {
    $(".header-navbar").slideToggle(300);
    $(".menu-btn").toggleClass("active");
    $("body").toggleClass("overflow");
  });
  $(".user-head").click(function () {
    $(this).toggleClass("active");
    $(".user-list").slideToggle(300);
  });

  /*************** Select ***************/
  $(".search-select").select2();

  /*************** Password Input ***************/
  $(".toggle-pass").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass("active");
    var type = $(this).hasClass("active") ? "text" : "password";
    $(this).next("input").attr("type", type);
  });

  /*************** OTP Inputs ***************/
  $(".code-input").each(function () {
    $(this).on("keyup", function (e) {
      if ($(this).val().length > 0) {
        var parent = $($(this).parent());
        var next = $(this).next("input");
        if (next.length) {
          $(next).removeAttr("disabled").select();
        } else {
          $(this).blur();
          parent.nextAll("button").removeAttr("disabled");
        }
      }
    });
    $(this).on("change", function (e) {
      if ($(this).val().length > 0) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  });

  /*************** File Input ***************/
  $('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $(this).nextAll(".file-text").html(fileName).addClass("active");
    var delText = document.dir == "rtl" ? "حذف" : "Delete";
    if ($(this).parent(".input-file").find(".del-file").length == 0) {
      $(this)
        .parent(".input-file")
        .append(
          "<button class='del-file'><i class='fas fa-trash-alt'></i>" +
            delText +
            "</button>"
        );
    }
    $(this).parents("form").find(".modal-btn").removeAttr("disabled");
  });
  $(document).on("click", "button.del-file", function (e) {
    e.preventDefault();
    var input = $(this).prevAll("input[type='file']");
    var text = $(this).prevAll(".file-text");
    $(this).parents("form").find(".modal-btn").attr("disabled", "disabled");
    text.html(input.attr("placeholder")).removeClass("active");
    input.wrap("<form>").closest("form").get(0).reset();
    input.unwrap();
    $(this).remove();
  });

  /*************** Related Jobs ***************/
  var relatedSwiper = new Swiper(".jobs-slider .swiper", {
    loop: true,
    // speed: 500,
    // autoplay: {
    //   delay: 5000,
    // },
    navigation: {
      nextEl: ".jobs-slider .swiper-button-next",
      prevEl: ".jobs-slider .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
    },
  });
});

/*************** Share Link ***************/
function copyText(copyText) {
  navigator.clipboard.writeText(copyText.getAttribute("data-link"));
}
