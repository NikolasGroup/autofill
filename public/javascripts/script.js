$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "auto.xml",
        dataType: "xml",
        success: function(xml) {
            $('input').on('input', function () {
                createAuto($(this),xml);
            });
            $('input').on('focus',function(){
                createAuto($(this),xml);
            });
            $('body').on('click','#autoFill li',function(){
                var html = $(this).text();
                $(this).closest('.input-block').find('input').val(html);
                $(this).parent().remove();
                $('.hover').remove();
            });            
        }			
    });
});
$(document).click(function(event) {
    if ($(event.target).closest("#autoFill").length || $(event.target).closest("input").length) return;
    $('ul#autoFill').remove();
    $('.hover').remove();
    event.stopPropagation();
});
function createAuto(a,xml){
    var $this = a,
        dataType = $this.data('type'),
        value = $this.val();
    if(value!=''){
        $('ul#autoFill').remove();
        $('.hover').remove();
        var html = '<ul id="autoFill">';
        $(xml).find(dataType).children().each(function(){
            var str = $(this).html();
            if(str.toLowerCase().indexOf(value.toLowerCase()) + 1) {
                var a = str.toLowerCase().indexOf(value.toLowerCase());
                var new_str = str.substr(0,a) + '<span>' + str.substr(a,value.length) + '</span>' + str.substr(a+value.length,str.length);
                html += '<li>'+ new_str +'</li>';                            
            }                    
        });
        html+='</ul>';
        $this.parent().append(html);
    }
    else{
        $('ul#autoFill').remove();
        $('.hover').remove();
    } 
    $('#autoFill li').hover(function(){
        $('.hover').remove();
        var html = $(this).text();
        $(this).closest('.input-block').append('<p class="hover">'+ html +'</p>');
    },function(){
        $('.hover').remove();
    });
}