var Snake = {
	createNew: function() {
		s = Base.createNew()
		s.width = 25
		s.height = 25
		s.runStatus = 1 // 0 上 1右 2下 3左
		s.body = [{x:50,y:0,bg:'red'},{x:25,y:0,bg:'blue'}]

		// 蛇身体
		s.addBody = function() {
			var lastBody = s.body[s.body.length - 1]
			s.body.push({
				x: lastBody.x - s.width,
				y: lastBody.y,
				bg: lastBody.bg,
			})
		}

		// 蛇头方向
		s.runTop = function() {
			s.runStatus = 0
		}
		s.runRight = function() {
			s.runStatus = 1
		}
		s.runBottom = function() {
			s.runStatus = 2
		}
		s.runLeft = function() {
			s.runStatus = 3
		}

		s.impact = function(game) {
			if ( game.width < s.x || game.height < s.y ) {
				return true
			}
			if ( 0 > s.x || 0 > s.y ) {
				return true
			}
			return false;
		}

		// 蛇头移动
		s.move = function() {

			//取出尾部
			var weiba = s.body.pop()
			weiba.bg = 'red'

			//将尾巴变成头
			s.body.unshift(weiba)
			s.body[1].bg = 'blue'

			switch(s.runStatus) {
				case 0:
					s.body[0].y = s.body[1].y - s.height
					s.body[0].x = s.body[1].x
					break
				case 1:
					s.body[0].x = s.body[1].x + s.width
					s.body[0].y = s.body[1].y
					break
				case 2:
					s.body[0].y = s.body[1].y + s.height
					s.body[0].x = s.body[1].x
					break
				case 3:
					s.body[0].x = s.body[1].x - s.width
					s.body[0].y = s.body[1].y
					break
			}

			// 记录蛇头坐标
			s.x = s.body[0].x
			s.y = s.body[0].y

		}


		return s
	}
}