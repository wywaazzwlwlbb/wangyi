function Project(){
    // 1.选标签
    this.name = document.getElementById("name");
    this.type = document.getElementById("type");
    this.place = document.getElementById("place");
    this.status = document.getElementById("status");
    this.times = document.getElementById("times");
    
    this.tbody = document.querySelector("tbody");

    // 2.预制url
    this.selectUrl = "php/center.php";

    // 一、初始立即请求数据
    this.load()
}
Project.prototype.display = function(){
    // 7.渲染页面
    var str = "";
    for(var i=0;i<this.res.length;i++){
        str += `<tr>
                    <td>${this.res[i].name}</td>
                    <td>${this.res[i].type}</td>
                    <td>${this.res[i].place}</td>
                    <td>${this.res[i].status}</td>
                    <td>${this.res[i].times}</td>
                </tr>`
    }
    this.tbody.innerHTML = str;
}
Project.prototype.load = function(){
    var that = this;
    // 二、开启请求
    ajaxGet(this.selectUrl).then(function(res){
        if(res != 1){
            that.res = JSON.parse(res);
            that.display()
        }else{
            console.log("初始没有拿到信息")
        }
    })
}


new Project()