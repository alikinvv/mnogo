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