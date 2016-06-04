jQuery(document).ready(function($){
    var expertise=['N/A','Beginner','Basic','Advance','Expert'];$(".level-bar-inner").css("width","0"),$(window).on("load",function(){$(".level-bar-inner").each(function(){var n=$(this).data("level");
     $(this).text(expertise[n]); 
     $(this).animate({width:n*20+'%'},0)})})
});