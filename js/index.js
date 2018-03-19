$(function(){
        $("#gameInfo").click(function(){
            $(".clack").show();
            $(".dialog").show();
        })

        //返回关闭对话框
        $(".close").click(function(){
            $(".clack").hide();
            $(".dialog").hide();
        })
})