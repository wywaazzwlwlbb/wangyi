function Project(options){
	this.left = options.left;
		this.right = options.right;
		this.pageCont = options.pageCont;
		this.list = options.list;
		this.url = options.url;
		this.num = options.num;
		this.active = options.active;
		this.index = 0;
    // 1.选标签
    this.name = document.getElementById("name");
    this.part = document.getElementById("part");
    this.type = document.getElementById("type");
    this.work = document.getElementById("work");
    this.place = document.getElementById("place");
    this.people = document.getElementById("people");
    this.times = document.getElementById("times");
    this.tbody = document.querySelector("tbody");
    this.add = document.getElementById("add");

    // 2.预制url
    this.selectUrl = "php/select.php";
    this.init()
    // 一、初始立即请求数据
    this.load()
}
Project.prototype.load = function(){
	var that = this;
	// 3-1.加载数据
	ajaxGet(this.selectUrl).then(function(res){
		// 4.解析数据
		that.res = JSON.parse(res);
		// 5.准备创建页码
		that.createPage()
		// 8.准备渲染页面
		that.display()
	},function(code){
		console.log("不好意思，请求失败了，错误代码是："+code);
	})
}
Project.prototype.init = function(){
    var that = this;
    this.tbody.addEventListener("click",function(eve){
        var e = eve ||window.event;
        var target = e.target || e.srcElement;
        if(target.getAttribute("liyang") === "myset"){
            location.href = "http://localhost/game/r2.html";
            that.id = target.parentNode.getAttribute("myid");
    	}
    })
}
	Project.prototype.createPage = function(){
		// 5-1.准备创建页码，计算页码
		this.maxPage = Math.ceil(this.res.length/this.num)
		var str = ""
		for(var i=0;i<this.maxPage;i++){
			str += `<li>${i+1}</li>`
		}
		this.pageCont.innerHTML = str;
		// 6.准备设置页码的当前项
		this.setActive()
		// 9.准备上一页和下一页绑定事件
        this.addEvent()
	}

	Project.prototype.display = function(){
		// 8-1.渲染页面
		var str = "";
        // 1:0~5
        // this.index0*this.num5   ~   this.index0*this.num5 + this.num5
        // 2:5~10
        // this.index1*this.num5   ~   this.index1*this.num5 + this.num5
        // 3:10~15
        // this.index2*this.num5   ~   this.index2*this.num5 + this.num5
        
        // 13.找到渲染数据的范围的公式
		for(var i=this.index*this.num;i<this.index*this.num+this.num;i++){
            // 14.修正到范围超过length时出现的报错
             if(i<this.res.length){
                    str += `<tr>
                    <td>${this.res[i].name}</td>
                    <td>${this.res[i].part}</td>
                    <td>${this.res[i].type}</td>
                    <td>${this.res[i].work}</td>
                    <td>${this.res[i].place}</td>
                    <td>${this.res[i].people}</td>
                    <td>${this.res[i].times}</td>
                    <td myid="${this.res[i].id}"><button type="button" class="btn btn-primary" liyang="myset" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">详情</button></td>
                </tr>`
   			 }
		}
		this.tbody.innerHTML= str;
//		console.log(this.tbody.innerHTML);
	}
	Project.prototype.setActive = function(){
		// 6-1.设置页码的当前项
		for(var i=0;i<this.pageCont.children.length;i++){
			this.pageCont.children[i].className = ""
		}
		this.pageCont.children[this.index].className = this.active;
	}
	// 9-1.上一页和下一页绑定事件
    Project.prototype.addEvent = function(){
        var that = this;
        this.left.onclick = function(){
            // 10-1.修改索引
            if(that.index == 0){
                that.index = that.maxPage - 1;
            }else{
                that.index--
            }
            // 11-1.渲染页面
            that.display()
            // 12-1.修改页码的当前项
            that.setActive()
        }
        this.right.onclick = function(){
            // 10-2.修改索引
            if(that.index == that.maxPage - 1){
                that.index = 0;
            }else{
                that.index++
            }
            // 11-2.渲染页面
            that.display()
            // 12-2.修改页码的当前项
            that.setActive()
        }
    }

new Project({
		left:document.getElementById("btnL"),
		right:document.getElementById("btnR"),
		pageCont:document.getElementById("page"),
		list:document.getElementById("list"),
		num:6,
		active:"active"
	})