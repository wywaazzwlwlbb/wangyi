function Register(options){
        this.btn = options.btn
        this.user = options.user
        this.pass = options.pass
        this.msg = options.msg
        this.url = options.url

        this.init()
    }
    Register.prototype.init = function(){
        var that = this;
        this.btn.onclick = function(){
            that.load()
        }
    }
    Register.prototype.load = function(){
        var that = this;
        ajaxPost(this.url,{
            tel:this.user.value,
            pass:this.pass.value
        }).then(function(res){
            switch(res){
                case "0":
	                that.msg.style.display = "block";
                    that.msg.innerHTML = "重名，换一个";
                    setTimeout(function(){
                    	that.msg.style.display = "none";
                    	that.msg.innerHTML = "";
                    },3000);
                    break;
                case "1":
                    that.msg.style.display = "block";
                    that.msg.innerHTML = "注册成功，3秒之后调转到登录";
                    setTimeout(() => {
                        location.href = "login.html";
                    }, 3000);
                    break;
                case "2":
                    that.msg.style.display = "block";
                    that.msg.innerHTML = "请输入完整信息";
                    setTimeout(function(){
                    	that.msg.style.display = "none";
                    	 that.msg.innerHTML = "";
                    },3000)
            }
        },function(code){
            console.log("前端的ajax请求失败，有可能是网络原因或接口错误，或服务器问题，反正不一定是注册失败")
        })
    }



    new Register({
        btn:document.getElementById("btn"),
        user:document.getElementById("user"),
        pass:document.getElementById("pass"),
        msg:document.getElementById("msg"),
        url:"http://www.liyangyf.com/ctrl/register.php"
    })