var swiper = new Swiper('.masters-slider ', {
    slidesPerView: 'auto',
    spaceBetween: 32,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

let updateMastersPosition = () => $('.masters').css('padding-left', $('.question__wrap').offset().left);

updateMastersPosition();

$(window).resize(updateMastersPosition);

// show modal
$('body').on('click', '[data-modal]:not(.modal)', (e) => {
    if (!$('.backdrop').hasClass('active')) $('.backdrop').addClass('active');
    $('.modal.active').removeClass('active');
    $(`.modal[data-modal="${$(e.currentTarget).attr('data-modal')}"]`).addClass('active');

    if ($(e.currentTarget).attr('data-modal') === 'thanks') {
        setTimeout(() => {
            $('.modal.active').find('svg').addClass('animate');
        }, 100);
    }
});

// close modal events
let closeModal = () => {
    $('.backdrop').removeClass('active');
    $('.modal').removeClass('active');
    $('.modal').find('svg').removeClass('animate');
}

$('body').on('click', '.modal__close, .modal .close', closeModal);

$('body').on('click', '.backdrop', (e) => {
    if ($(e.target)[0].className === 'backdrop active') closeModal();
});

// close modal on press ESC
$(document).keyup((e) => {
    if (e.keyCode === 27 && $('.backdrop').hasClass('active')) closeModal();
});

$('input[name="phone"]').mask('+7 (000) 000-00-00', {placeholder: '+7 (___) ___-__-__'});

$('body').on('submit', 'form', (e) => {
    e.preventDefault();
});

// show calculator
$('body').on('click', '.show-calculator', (e) => {
    $('.main .container').removeClass('active');
    $('.calculator').addClass('active').find('.main-work').css('opacity', 0).hide().slideDown(400);
    $('.main-work').animate({ 'opacity': 1 });
});

// close calculator
$('body').on('click', '.calculator__close, .calculator .close', (e) => {
    $('.calculator').removeClass('active').find('.main-work').css('opacity', 0).hide();
    $('.main .container:not(.calculator)').addClass('active');
});


let stepsCount = $('.calculator__step').length;

console.log()

for (let i = 0; i <= stepsCount; i++) {
    $(`.calculator__step:nth-child(${i})`).attr('data-step', i);
}

let updateProgressbar = () => {
    let currentProgress = Math.round((100 / (stepsCount - 1)) * (parseInt($('.calculator__step.active').attr('data-step')) - 1));

    $('.calculator__percent').text(currentProgress);
    $('.calculator__line').animate({ 'width': `${currentProgress}%` });
}

// go to next step
$('body').on('click', '.calculator__next', (e) => {
    let activeStep = parseInt($('.calculator__step.active').attr('data-step'));

    if (activeStep < stepsCount) {
        $('.calculator__step').removeClass('active');
        $(`.calculator__step[data-step="${activeStep + 1}"]`).addClass('active');
        updateProgressbar();
    }

    if (activeStep + 1 === stepsCount) $('.calculator__next').addClass('disable');

    if (activeStep > 0) $('.calculator__prev').removeClass('disable');

    $(`.calculator__step[data-step="${activeStep + 1}"]`).hasClass('bg')? $('.calculator__content').addClass('bg') : $('.calculator__content').removeClass('bg');
});

// go to prev step
$('body').on('click', '.calculator__prev', (e) => {
    let activeStep = parseInt($('.calculator__step.active').attr('data-step'));

    if (activeStep > 1) {
        $('.calculator__step').removeClass('active');
        $(`.calculator__step[data-step="${activeStep - 1}"]`).addClass('active');
        updateProgressbar();
    }

    if ($('.calculator__next').is('.disable')) $('.calculator__next').removeClass('disable');

    if (activeStep === 2) $('.calculator__prev').addClass('disable');

    $(`.calculator__step[data-step="${activeStep - 1}"]`).hasClass('bg')? $('.calculator__content').addClass('bg') : $('.calculator__content').removeClass('bg');
});