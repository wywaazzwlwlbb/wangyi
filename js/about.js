    var ali = document.getElementsByClassName("l1")
    var odiv = document.getElementsByClassName("div");
    var oI = document.getElementById("index");
	var oP = document.getElementById("position");
	var oAbout = document.getElementById("about");
	var oC = document.getElementById("center");
	var login = document.querySelector(".login");
	var regs = document.querySelector(".regs");
	var out = document.querySelector(".out");
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
    for(var i=0;i<ali.length;i++){
        ali[i].index = i;
        console.log(ali[i].index)
        ali[i].onclick = function(){
            for(var j=0;j<ali.length;j++){
				ali[j].className = "l1";
					console.log(ali[j])
	                odiv[j].style.display = "none";
	              console.log(odiv[j])
	            }
	            this.className = "l1 active";
            odiv[this.index].style.display = "block"
        }
    }