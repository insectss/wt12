$(function(){
    //获取棍子到浏览器顶部的距离
    var maxH = $(".stick").offset().top;
    var isPlay = true;//定义一个用于判断是否可以继续执行游戏的变量
    var num = 0;//当前柱子的索引值
    var wellMove = 0;//柱子容器需要移动的距离

    /*************************************全局变量定义华丽分割线********************************************/

    $("#play").mousedown(function(){ /***************鼠标按下******************/
        if(!isPlay) return; //如果不允许继续游戏，则终止
        $(".stick").animate({width:maxH},2000);//棍子长动画
        //更换按钮背景
        $(this).css('background-image',"url(img/btn-bg-click.png)")
    }).mouseup(function(){/***********************鼠标起来********************/
        if(!isPlay) return; //如果不允许继续游戏，则终止
    $('.stick').stop();//棍子停止增长
        isPlay = false;//游戏不可继续
        //棍子倒下样式
        var stickH = $(".stick").addClass("down").width();//棍子倒下动画，并获取棍子长度
        setTimeout(function(){//等待棍子倒下动画完成后，执行人移动
            $(".man").find("img").attr("src","img/stick.gif").end().animate({left:stickH+67},1500,function(){
                //判断游戏是否失败
                var wellLeft = $(".well-box .well").eq(num+1).offset().left; //获取下一根柱子直间的距离
                    wellMove+= -wellLeft;//定义柱子容器移动的距离;
                if(stickH>wellLeft-100 && stickH<wellLeft){
                  /***
                   * 1.人恢复站立状态,消失，并且恢复到最初的位置
                   * 2. 柱子部分 移动了前一根柱子的动画
                   * 3.按钮要重新允许点击
                   ** **/
                  $(".man").find("img").attr("src","img/stick_stand.png").end().css("left",45).hide();
                  $(".stick").removeClass("down").width(0);
                    console.log(num,wellLeft);
                   $(".well-box").animate({left:wellMove},500,function(){//柱子容器移动
                       $(".man").show();
                   });
                   //重置游戏按钮
                    $("#play").css('background-image',"url(img/btn-bg.png)");
                    isPlay = true;
                    num++;
                    if(num>=$(".well").length-1){
                        alert("游戏可以进入下一关！")
                        isPlay = false;
                        //更换按钮背景
                        $("#play").css('background-image',"url(img/btn-bg-click.png)")
                    }
                }else{
                    alert("游戏失败！");
                }
            });//人移动动画
        },700)
    })
})