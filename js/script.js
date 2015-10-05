document.addEventListener('DOMContentLoaded', function (ev) {
    $(window).on("resize", imgHeightFix);
    imgHeightFix();
    contactus();
});


function imgHeightFix(){
//    $('.back-1, .back-2').imagesLoaded(function()
        function fixer() {
            $(this).parent().height($(this).height());
        }

        $('img.back-1, img.back-2').each(function (i, el) {
            if (el.complete) {
                fixer.bind(el)();
            } else {
                $(el).on('load', fixer);
            }
        });
        /*
        $('.back-1, .back-2').on("load", function(){
        var imgHeight1 = $('.back-1').height();
        $('.img-height-1').height(imgHeight1);
        var imgHeight2 = $('.back-2').height();
        $('.img-height-2').height(imgHeight2);
        */       
    //});
}

function contactus(){
    $('.contact-us').on("click", function (ev){
        ev.preventDefault();
        window.location.href = "mailto:"+mailStrToEmail('contact-at-fractaltech-dot-in');
    });
}

function mailStrToEmail(mailStr) {
    return mailStr.split('-')
        .map(function (part) {
            if (part === 'at') {
                return '@';
            } else if (part === 'dot') {
                return '.';
            } else {
                return part;
            }
        })
        .join('');
}