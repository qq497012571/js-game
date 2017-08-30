
var Game = {
	createNew : function() {
		var canvas = document.querySelector('#map')
		canvas.width = 300
		canvas.height = 300
		var context = canvas.getContext('2d')
		var g = {
			width: canvas.width,
			height: canvas.height,
			keyevents: [],
			keystatus: [],
		}
		// 按键监听
		g.addKeyEvent = function(key, callback) {
			g.keyevents[key] = callback
		}

		g.drawImage = function(obj) {
			context.drawImage(obj.image,obj.x,obj.y)
		}


		// 注册游戏按键事件
		window.addEventListener('keydown', function(e) {
			g.keystatus[e.key] = true
		})
		window.addEventListener('keyup', function(e) {
			g.keystatus[e.key] = false
		})


		g.draw = function(){}
		g.update = function(){}

		
		setInterval(function(){
			context.clearRect(0,0,g.width,g.height)

			//events
			// 取出注册了的键
			// console.log(g.keyevents.keys())

		  	g.draw()
		  	g.update()

		}, 1000/60)

		return g
	}
}
