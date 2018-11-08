'use strict';

angular.module('myApp.weeklyManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weeklyManager', {
    templateUrl: 'weeklyManager/weeklyManager.html',
    controller: 'weeklyManagerCtrl'
  });
}])

.controller('weeklyManagerCtrl', ["$scope","FileUploader", function($scope,FileUploader){//创建控制
    //定义数组
    $scope.workers=[];
    $scope.done = false;
     var uploader= new FileUploader({
        url:"F:\\",
        autoUpload: true
      });
    // 上传文件方法
    uploader.filters.push({
        name: "xxx.doc",
        fn: function(item) {
            //item就是你上传的文件 这里面你就可以写你需要筛选的条件，下面举一个例子，筛选文件的大小
            //$scope.maxSize是我指令传过来的参数
            var fileSizeValid = item.size > 0; //文件大小限制；
            return fileSizeValid ;
        }
    })
    $scope.UploadFile = function(){
        uploader.uploadAll();
    }
    //添加的方法
    $scope.add = function(){
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        pop.style.display = "block";
        back_of_pop.style.display = "block";
    };
    //提交
    $scope.submit =function(){
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        console.log($scope);
        //创建对象
        console.log($scope.sjob)
        var worker = {"flag":false,"worker_id":$scope.worker_id,"job":$scope.sjob,"detail":$scope.detail,"done":$scope.done,"review":$scope.review};
        //放进数组
        $scope.workers.push(worker);
        pop.style.display = "none";
        back_of_pop.style.display = "none";
    };
    // 关闭弹窗
    $scope.close = function(){
        var pop = document.getElementById('popup');
        var back_of_pop = document.getElementById('backgroud_popup');
        pop.style.display = "none";
        back_of_pop.style.display = "none";
    };
    //删除一行
    $scope.dele =function($index){
        $scope.workers.splice($index,1);
    };
    //改变每行chekbox的状态
    $scope.ck = function($index){
        $scope.workers[$index].flag=!$scope.workers[$index].flag;
    };
    //改变完成情况
    $scope.doneInit = function(){
        $scope.done = !$scope.done;
    };
    //改变完成情况
    $scope.donef = function($index){
        $scope.workers[$index].done=!$scope.workers[$index].done;
    };
    //批量删除
    $scope.plsc = function(){
        //反着遍历
        for (var i = $scope.workers.length-1;i>=0;i--) {
            if ($scope.workers[i].flag) {
                $scope.workers.splice(i,1);
            }
        }
    };

    //全选
    var qq = true;
    $scope.qx = function(){
        //获取属性
        var ck = $("input[name=ck]");
        for (var i=0;i<ck.length;i++) {
            ck[i].checked=qq;
            //给每个数组中的ck赋值
            $scope.workers[i].flag=qq;
        }
        qq=!qq;
    }
}]);