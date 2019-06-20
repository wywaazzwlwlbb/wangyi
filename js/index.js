    var span = document.querySelectorAll("span");
    var login = document.querySelector(".login");
    var regs = document.querySelector(".regs");
    var out = document.querySelector(".out");
	var oRight = document.getElementById("right");
	var oLeft = document.getElementById("left");
	var oIbox = document.querySelector(".ibox");
	var oA = document.querySelectorAll(".box .ibox a");
	var oI = document.getElementById("index");
	var oP = document.getElementById("position");
	var oAbout = document.getElementById("about");
	var oC = document.getElementById("center");
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var index =1;
	if(getCookie("user") == ""){
		login.innerHTML = "登录";		
		out.style.display = "none";
	}else{
		login.innerHTML = getCookie("user");	
		regs.style.display = "none";
	}
	out.onclick = function(){
		removeCookie("user",1,1)
	}
	oI.onclick = function(){
		location.href = "index.html"
	}
	oP.onclick = function(){
		location.href = "position.html"
	}
	oAbout.onclick = function(){
		location.href = "about.html"
	}
	oC.onclick = function(){
		if(getCookie("user") != ""){
			location.href = "center.html"			
		}else{
			location.href = "login.html";
		}
	}
	ajaxGet("json/data.json").then(function(res){
            json = eval(res)

            var olist = document.getElementById("list")
            var ol2 = document.getElementById("l2");
            console.log(olist)
            var str = "";
            for(var i=0;i<json.length;i++){
                str += `<li class="l1"><a href="${json[i].a}"><img src="${json[i].src}"/></a>
	        			<h2>${json[i].h1}</h2>
	        			<span class="s1">
	        				${json[i].s1} 
	        			</span>
	        			<a href="${json[i].a}"><p class="p1">${json[i].p} </p></a></li>`;
            }
            var str2 = "";
            for(var i=0;i<json.length;i++){
                str2 += `<li class="l2">
	        			<a href="#"><p class="p3">${json[i].p3} </p></a>
	        			<span class="s2">${json[i].s2} </span>
	        		</li>`;
            }
            console.log(str)
            olist.innerHTML = str;
            ol2.innerHTML = str2;
        })
	
	function animate(offset) {
                //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
                //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
            var newLeft = parseInt(oIbox.style.left) + offset;
            oIbox.style.left = newLeft + 'px';
                //无限滚动判断
            if (newLeft > -oA[0].offsetWidth) {
                oIbox.style.left = -oA.offsetWidth + 'px';
            }
            if (newLeft < -oA.offsetWidth) {
                oIbox.style.left = -oA[0].offsetWidth + 'px';
            }
        }
	function play() {
                //重复执行的定时器
            timer = setInterval(function () {
                oRight.onclick();
            }, 2000)
        }
        function stop() {
            clearInterval(timer);
        }
	oIbox.style.width = oA.length*oA[0].offsetWidth +"px";
	oRight.onclick = function(){
		if(index == oA.length-1){
			index = 1;
			oIbox.style.left = 0;
		}else{
			index++;
		}
		buttonsShow()
		move(oIbox,{left:-index*oA[0].offsetWidth})
	}
	oLeft.onclick = function(){
		if(index == 0){
			index = oA.length-1;
			oIbox.style.left = -(oA.length-1)*oA[0].offsetWidth +"px";
		}else{
			index -- ;
		}
		buttonsShow()
//		animate(oA[0].offsetWidth);
		move(oIbox,{left:-index*oA[0].offsetWidth})
	}
    function buttonsShow() {
                //将之前的小圆点的样式清除
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
            }
        }
                //数组从0开始，故index需要-1
        buttons[index-1].className = "on";
        }
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onmouseover = function () {
                        /*  这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                        /*  由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                    var clickIndex = parseInt(this.getAttribute('index'));
                    var offset = oA[0].offsetWidth * (index - clickIndex); //这个index是当前图片停留时的index
                    animate(offset);
                    index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
                    buttonsShow();
                    stop();
                }
            }
            oIbox.onmouseover = stop;
            oIbox.onmouseout = play;
            oRight.onmouseover = stop;
            oRight.onmouseout = play;
            oLeft.onmouseover = stop;
            oLeft.onmouseout = play;
            play();
            
            