window.addEventListener('DOMContentLoaded',function(){
	var leftTitle = document.querySelector('.left-title');
	var leftList = document.querySelector('.left-list');
	var rightList = document.querySelector('.right-list');
	leftList.style.height = document.documentElement.clientHeight - leftTitle.offsetHeight - 50 +'px';
	rightList.style.height = document.documentElement.clientHeight - leftTitle.offsetHeight - 100 +'px';

})




var todo = [
	{
		id:1,
		title:"列表1",
		color:"#FF8600",
		list:[
			{
				title:"第一个信息",
				done:true
			},
			{
				title:"第二个信息",
				done:false
			}
		]
	},
	{
		id:2,
		title:"列表2",
		color:"#D07BE3",
		list:[
			{
				title:"只是第一个信息",
				done:false
			},
			
			{
				title:"你的第三个信息",
				done:true
			}
			
		]
	}
	
	
]
var colors = ["#FF8600","#D07BE3","#62DA37","#1AABF8","#F7CA00","#A3855F","#FF2B6C"]

var icloud=angular.module('icloud',[]);
icloud.controller('iclouds',function($scope,locatodo){
	$scope.todo=todo;
	locatodo.saveData('todo',$scope.todo);
	// $scope.todo = locatodo.getData('todo');
	
	$scope.index=$scope.todo.length-1;

	//点击出现已完成
	$scope.flag = false;

	$scope.optflag = false;
	$scope.colors = colors;
	$scope.changeTitle = $scope.todo[$scope.index].title;
	$scope.changeColor = $scope.todo[$scope.index].color;
	// 获取当前显示列表下标
	$scope.select=function(i){
		$scope.index=i;
		$scope.changeTitle = $scope.todo[$scope.index].title;
		$scope.changeColor = $scope.todo[$scope.index].color;
		$scope.optflag=false;
		locatodo.saveData('todo',$scope.todo)
	}


	// 点击添加数据
	$scope.add=function(){
		$scope.ids=$scope.todo[$scope.todo.length-1].id+1;
		$scope.index=$scope.todo.length;
		$scope.todo.push({
			id:$scope.ids,
			title:'列表'+$scope.ids,
			color:colors[$scope.todo.length%7],
			list:[]
		})
		locatodo.saveData('todo',$scope.todo)
	}

//	获取数据
	$scope.doneNum = 0;
	$scope.getDoneNums=function(){
		$scope.doneNum = 0;
		var list = $scope.todo[$scope.index].list;
		angular.forEach(list,function(v,i){
			if (v.done){
				$scope.doneNum +=1;
			}
		})

	}
	$scope.getDoneNums();

	//点击完成
	$scope.set=function(y,f){
		y.done = f;
		$scope.getDoneNums();
		locatodo.saveData('todo',$scope.todo)
	}

	//点击修改
	$scope.change=function(y,text){
		y.title=text.target.innerHTML;
		locatodo.saveData('todo',$scope.todo)
	}

	//新增
	$scope.addList=function(){
		$scope.todo[$scope.index].list.push({
			title:'新增的项目',
			done:false
		})
		locatodo.saveData('todo',$scope.todo)
	}


	//点击改变颜色
	$scope.sColor=function(c){
		$scope.changeColor=c;
	}

	//点击完成修改
	$scope.comChange=function(){
		var w=$scope.todo[$scope.index];
		w.title= $scope.changeTitle;
		w.color=$scope.changeColor;
		$scope.optflag=false;
		locatodo.saveData('todo',$scope.todo)
	}

	//点击删除
	$scope.detList=function(){
		if ($scope.todo.length==1){
			alert("必须保留一条数据!")
			return;
		}
		$scope.todo.splice($scope.index,1);
		$scope.index = $scope.todo.length - 1;

		$scope.optflag=false;
		locatodo.saveData('todo',$scope.todo)
	}

	//删除list
	$scope.clearCom = function(){
		var list=$scope.todo[$scope.index].list;
		var arr=[];
		angular.forEach(list,function(v,i){
			if (v.done==false){
				arr.push(v)
			}
		})
		$scope.todo[$scope.index].list= arr;
		$scope.flag = false;
		$scope.doneNum = 0;
		localStorage.removeItem('todo')
	}


	//监听
	$scope.$watch('index',function(){
		$scope.getDoneNums();
		$scope.flag = false;
		$scope.changeTitle = $scope.todo[$scope.index].title;
		$scope.changeColor = $scope.todo[$scope.index].color;
		
	})

})

//服务修改数据
/*
* getdata(key);
* savedata(key,val)
* deldata(key)
*
* */

icloud.factory('locatodo',function(){
	return{
		getData:function(key){
			var d = localStorage.getItem(key)
			if(d!=null){
				return d ==null?[]:JSON.parse(d);
			 }else return [];
		//	转换为对象存储
		},
		saveData:function(key,data){
			localStorage.setItem(key,JSON.stringify(data))
		},
		delData:function(key){
			localStorage.removeItem(key);
		}
	}
})


