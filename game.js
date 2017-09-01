
var Game = {
	createNew : function(setting) {
		var canvas = document.querySelector('#map')
		var context = canvas.getContext('2d')
		var interval
		var g = {
			canvas: canvas,
			keyevents: [],
			keystatus: [],
			score: 0,
		}
		// 设置canvas宽高
		canvas.width = g.width = (setting.width || canvas.width)
		canvas.height = g.height = (setting.height || canvas.height)

		// 设置按键监听
		g.addKeyEvent = function(key, callback) {
			if ( key && typeof callback === 'function' )
				g.keyevents[key] = callback
		}

		g.drawImage = function(obj) {
			context.drawImage(obj.image,obj.x,obj.y)
		}

		g.drawRects = function(obj) {
			for ( var i = obj.body.length - 1; i >= 0; i-- ) {
				var body = obj.body[i]
				context.fillStyle = body.bg
				context.fillRect(body.x,body.y,obj.width,obj.height)
			}
		}

		g.drawRect = function(obj) {
			context.fillStyle = obj.bg
			context.fillRect(obj.x,obj.y,obj.width,obj.height)
		}


		g.stop = function() {
			clearInterval(interval)
		}

		g.start = function() {
			console.log('start')
			interval = setInterval(function(){
				context.clearRect(0,0,g.width,g.height)
			  	g.draw()
			  	g.update()

				// 画边框
			  	context.strokeRect(0, 0, g.width, g.height)

			  	// 画分数
			  	context.font = '15px serif';
			  	context.fillText('分数: ' + g.score, 10, g.height - 20)

			}, 1000/10)
		}

		// 注册游戏按键事件
		window.addEventListener('keydown', function(e) {
			g.keystatus[e.key] = true
		})
		window.addEventListener('keyup', function(e) {
			g.keystatus[e.key] = false
		})

		// 监听按键
		setInterval(function(){
			//events
			// 监听按键
			for ( let key in g.keyevents ) {
				if ( g.keystatus[key] ) {
					g.keyevents[key]()
				}
			}
		}, 1000/10)

		g.draw = function(){}
		g.update = function(){}
		
		return g
	}
}
