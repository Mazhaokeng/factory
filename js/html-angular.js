var app = angular.module('myApp', ['infinite-scroll']);
/*-------------------------------------------------------------------------------------------
 * 搜索框事件
 * ----------------------------------------------------------------------------------*/
app.controller('searchCon', function($scope, $http){
    $scope.searchTxt = "";
    $scope.flag_autoSearch = true;
    //监听搜索框，自动搜索
    $scope.$watch('searchTxt', function(newVal, oldVal){
        if ( $scope.flag_autoSearch ){
            var url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ newVal +'&cb=JSON_CALLBACK';
            $http.jsonp(url).success(function( data ){
                $scope.list = data.s;
            });
        }
    });
    //点击列表，就把文字放入输入框
    $scope.pushSearchTxt = function( idx ){
        $scope.searchTxt = $scope.list[idx];
        $scope.list = [];
        $scope.flag_autoSearch = false; //暂时禁止自动搜索
    };
    //点击搜索框，允许自动搜索
    $scope.autoSearch = function(){
        $scope.flag_autoSearch = true;
    };
});
/*-----------------------------------------------------------------------------------
 * 产生分类框
 * ---------------------------------------------------------------------------------*/
app.controller('tipsCon', function($scope, $http){
    $http.get('json/tipsContent.json').success(function(data){
        $scope.listPre10 = data.slice(0, 10);
        $scope.listLast10 = data.slice(10, 20);
    });
});
/*-----------------------------------------------------------------------------------------
 * 产生活动栏的项目
 * ----------------------------------------------------------------------------------------*/
app.controller('activityCon', function($scope, $http){
    $http.get('json/activity.json').success(function(data){
        for ( var i = 0; i < data.length; i ++ ){
            $scope.title = function(i){
                return data[i].title;
            };
            $scope.describe = function(i){
                return data[i].describe;
            };
        }
    });
});
/*---------------------------------------------------------------------------------------------------------------------
 * 产生猜你喜欢栏的项目
 * -------------------------------------------------------------------------------------------------------------------*/
app.controller('favorCon', function($scope, Favor ){
    $scope.Favor = new Favor();     //从头到尾只有一个对象
});
//工厂模式生成对象
app.factory('Favor', function($http){
    var Favor = function(){
        this.items = [];
        this.busy = false;
        this.page = 0;
    };
    Favor.prototype.nextPage = function(){
        if ( this.busy ) return;
        this.busy = true;
        var url = "http://www.phonegap100.com/appapi.php?a=getThreadList&fid=2&page=" + this.page;
        $http.get(url).success(function(data) {
            this.items = this.items.concat( data.result );
            this.busy = false;
            this.page += 1;
            if ( this.page >= 3 ){  //success的请求比较慢，所以比较不可以放在外面
                this.busy = true;
            }
        }.bind(this));
    };
    return Favor;
});







































