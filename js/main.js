function picScope(){
    var $li = $('.service-pro li');
    var $box = $('.service-picShow');
    var flag_liCanClick = true;
    //
    $li.bind('click', function(){
        if ( flag_liCanClick ){
            flag_liCanClick = false;
            $box.css({width: '60%', height: '10rem', top: '50%', left: '20%', marginTop: '-5rem'});
            var bg = $(this).css('background');
            $box.css('background', bg);
        }
    });
    $box.click(function(){
        $(this).css({width: 0, height: 0, border: 0, margin: 0});
        flag_liCanClick = true;
    })
}
/*-----------------------------------------------------------------------------
* 事件调用
* -----------------------------------------------------------------------------*/
$(function(){
    picScope();
});
