function Project(){
    // 1.选标签
    this.send = document.getElementById("send");
    this.names = document.getElementById("names");
    this.name = document.getElementById("name");
    this.sex = document.getElementById("sex");
    this.mail = document.getElementById("mail");
    this.tel = document.getElementById("tel");
    this.edu = document.getElementById("edu");
    this.work = document.getElementById("work");
    this.add = document.getElementById("add");
    this.tbody = document.querySelector("tbody");

    // 2.预制url
    this.insertUrl = "php/insert.php";
    this.selectUrl = "php/resume.php";
    this.deleteUrl = "php/delete.php";

    this.id = null;

    this.init()
    this.load()
}
Project.prototype.load = function(){
	var that = this;
	ajaxGet(this.selectUrl).then(function(res){
		that.res = JSON.parse(res);
		that.display()
	},function(code){
		console.log("不好意思，请求失败了，错误代码是："+code);
	})
}
Project.prototype.init = function(){
    var that = this;
    this.add.addEventListener("click",function(){
    	that.names.value = "";
        that.name.value = "";
        that.sex.value = "";
        that.mail.value = "";
        that.tel.value = "";
        that.edu.value = "";
        that.work.value = "";
        
    })
    this.tbody.addEventListener("click",function(eve){
        var e = eve ||window.event;
        var target = e.target || e.srcElement;
       if( target.getAttribute("cl") === "del"){
	            that.id = target.parentNode.getAttribute("myid");
	            that.deleteload();
	        }
        
    })
    this.send.onclick = function(){
            that.insertLoad()
       }
}

Project.prototype.deleteload = function(){
    var that = this;
    ajaxPost(this.deleteUrl,{
        id:that.id
    }).then(function(res){
        if(res != 1){
            that.res = JSON.parse(res);
            that.display();
        }else{
            console.log("删除失败");
        }
    })
}
Project.prototype.insertLoad = function(){
    var that = this;
    ajaxPost(this.insertUrl,{
    	names:this.names.value,
        name:this.name.value,
        sex:this.sex.value,
        mail:this.mail.value,
        tel:this.tel.value,
        edu:this.edu.value,
        work:this.work.value
    }).then(function(res){
        switch(res){
            case "1":
                console.log("存成功，读失败")
                break;
            case "2":
                console.log("存失败，没有读")
                break;
            default:
                that.res = JSON.parse(res);
                that.display();
        }
    })
}

	
	Project.prototype.display = function(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
                 str += `<tr>
                <td>${this.res[i].names}</td>
                <td myid="${this.res[i].id}"><button type="button" class="btn bg-info" cl="del">删除</button></td>
                </tr>`
		}
		this.tbody.innerHTML= str;
//		console.log(this.tbody.innerHTML);
	}
	
new Project({
	})