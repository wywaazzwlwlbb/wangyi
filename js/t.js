    var obox = document.getElementById("box");
    var clientH = document.documentElement.clientHeight;
	onscroll = function(){
        // 获取页面的滚动距离
        var scrollT = document.body.scrollTop;
        // 设置给当前元素的top
        obox.style.top = scrollT + clientH - obox.offsetHeight - 10 + "px";
    }
    var timer;
    obox.onclick = function(){
        clearInterval(timer)
        timer = setInterval(function(){
            if(document.body.scrollTop <= 0){
                clearInterval(timer)
            }else{
                document.body.scrollTop -= 20;
            }
        }, 30);
    }
