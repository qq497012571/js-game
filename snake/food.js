var Food = {
	createNew : function(setting) {
		var f = {
			x: 0,
			y: 0,
			bg: 'black',
			xMax: 0,
			yMax: 0,
			width: 25,
			height: 25,
		}

		f = Object.assign(f, setting)

		// 设计食物随机出现
		f.randPosition = function() {
			
			// 获取横纵,坐标能分多少格
			var xsize = Math.floor(f.xMax / f.width)
			var ysize = Math.floor(f.yMax / f.height)


			f.x = Math.floor(Math.random() * xsize) * f.width;
			f.y = Math.floor(Math.random() * ysize) * f.height;

			console.log(f.x,f.y)

		}

		// 碰撞检测
		f.impact = function(snake) {
			if ( snake.x == f.x && snake.y == f.y ) {
				return true
			}
			return false;
		}

		f.setup = function() {
			f.randPosition()
		}

		f.setup()
		return f
	}
}