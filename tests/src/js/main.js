$(function() {
  // $.material.init();

  autoAppearing({'selector':'.appearing'});
  calculateLogoOffset();
  
  $(".button-collapse").sideNav();
  // $('.slider').slider();
  // $('.materialboxed').materialbox();
  // $('[data-toggle="tooltip"]').tooltip();
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on click
      // alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
      gutter: 0, // Spacing from edge
    }
  );
  // header collapsing
  $(window).on('scroll', function(event) {
    if ($(this).scrollTop() > 200) {
      $('header').addClass('sliding');
      $('header .brand-logo').css('transform','translate3d(-' + window.logoOffset + 'px,0,0)')
    } else {
      $('header').removeClass('sliding');
      $('header .brand-logo').attr('style','');
    }
  });


  // toasts
  $('.questions .btn-floating').on('click', function(event) {
    $(this).toggleClass('active');
    if (!$(this).hasClass('active')) {
      toast('Вопрос добавлен в закладки', 4000)
    } 
    /* Act on the event */
  // $('header button.toggle').on('click', function(event) {
  //   $(this).toggleClass('active');
  //   if($(this).hasClass('active')) {
  //     autoAppearing({'selector':'.btn', 'parentSelector': 'header .sub'});
  //   } else {
  //     autoAppearing({'selector':'.btn', 'parentSelector': 'header .sub', 'isHide': true});
  //   }
  });
});

function autoAppearing(args) {
   
  var selector = args.selector || '.jumbotron',
      parentSelector = args.parentSelector || 'body',
      isHide = args.isHide || false,
      hasShadow = args.shadow || true;
  var blocks = $(parentSelector + ' ' + selector),
      iterator = isHide ? blocks.length : 0;
  var appearing = setInterval(function() {
    if (!isHide && iterator < blocks.length) {
      $(blocks[iterator]).addClass('active');
      iterator++;
    } else if (isHide && iterator >= 0) {
      $(blocks[iterator]).removeClass('active');
      iterator--;
      clearInterval(appearing);
      if (hasShadow) {
        blocks.addClass('z-depth-2');
      }
    }
  }, 150)
}

function calculateLogoOffset() {
  var wrapper = $('header .nav-wrapper'),
    logoWidth = wrapper.find('.brand-logo').width() * 0.35;

    window.logoOffset = (Math.round(wrapper.width()/2) - Math.round(logoWidth/2));
    console.log(logoOffset);

  return window.logoOffset;
}