class Point {

	constructor(x,y) {

		this.x = x
		this.y = y
		this.g = 0
		this.h = 0
		this.f = 0
		this.parent = ''
		this.step = 1

	}


	// 获取周围坐标可用坐标
	getAroundPoints(maps,callback,isRect) {

		var list = [],
			isRect = isRect ? isRect : false

		if ( isRect ) {

			//只获取上下左右四个坐标
			if (callback(this.x+1,this.y)) {
				list.push(new Point(this.x+1,this.y))
			}
			if (callback(this.x-1,this.y)) {
				list.push(new Point(this.x-1,this.y))
			}
			if (callback(this.x,this.y+1)) {
				list.push(new Point(this.x,this.y+1))
			}
			if (callback(this.x,this.y-1)) {
				list.push(new Point(this.x,this.y-1))
			}

			return list

		}


		// 获取周围八格坐标
		for (var y = this.y-1; y <= this.y+1; y++)

			for (var x = this.x-1; x <= this.x+1; x++) {

				if (callback(x,y)) {
					list.push(new Point(x,y))
				}
			}

		return list
		

	}

	calcG(point) {
		return this.step + (point.parent!=''?point.parent.g:0)
	}

	calcH(ePoint) {
		return Math.abs(ePoint.x - this.x) + Math.abs(ePoint.y - this.y)
	}

	calcF() {
		return this.g + this.h
	}

	// 递归获取完整路径
	static parsePoint(point,list) {
		list.push([point.x,point.y])
		if ( point.parent != '' ) {
			Point.parsePoint(point.parent,list)
		}
		return list
	}

	static minF(pointList) {

		var index = 0
		var minF = pointList[index].f

		for (var i in pointList) {
			if (pointList[i].f < minF) {
				index = i
				minF = pointList[i].f
			}
		}
		return pointList[index]

	}
}

class Astar {

	constructor(maps) {

		this.closedList = []
		this.openList = []
		this.maps = maps
		this.self = this

	}

	/**
	 * 搜索路径
	 * @param  {Point} sPoint
	 * @param  {Point} ePoint
	 * @param  bool    isRect 是否获取矩形路径，false则可以斜向走 
	 * @return {[type]}
	 */
	serach(sPoint, ePoint,isRect) {
		this.openList = []
		this.closedList = []
		var self = this
		this.openList.push(sPoint)
		do {
			// 获取最优路径
			var startPoint = Point.minF(this.openList)
			this.openRemove(startPoint)

			this.closedList.push(startPoint)
			// 获取周围路径
			var aroundPoints = startPoint.getAroundPoints(this.maps, function(x,y){
				// 限制探查越界
				if ( x < 0 || y < 0 || x >= self.maps[0].length || y>= self.maps.length ) {
					return false
				}

				if ( self.inClosedList(x,y) ) {
					return false
				}
				if ( self.maps[y][x] == 1 ) {
					self.closedList.push(new Point(x,y))
					return false
				}

				if ( self.maps[y][x] == 0 ) {
					return true
				}

			},isRect)


			for (var i in aroundPoints) {
				var point = aroundPoints[i]

				if ( !this.inOpenList(point) ) {
					// 初始化FGH,parent
					point.g = point.calcG(startPoint)// 
					point.h = point.calcH(ePoint)
					point.f = point.calcF()
					point.parent = startPoint
					this.openList.push(point)
				} 
				
			}

			if (this.inOpenList(ePoint)) {
				return Point.parsePoint(this.openGet(ePoint),[]).reverse()
			}

		} while(this.openList.length != 0)
	}

	drawMap() {
		for (var x = 0; x < this.maps.length; x++) {
			for (var y = 0; y < this.maps[0].length; y++) {
				$('#block').append('<div class="grid" x="'+y+'" y="'+x+'"></div>')
			}
		}
	}


	inOpenList(point) {

		for (var i in this.openList) {
			if ( this.openList[i].x == point.x && this.openList[i].y == point.y ) {
				return true
			}
		}

		return false
	}

	inClosedList(x,y) {

		for (var i in this.closedList) {
			if ( this.closedList[i].x == x && this.closedList[i].y == y ) {
				return true
			}
		}

		return false
	}

	openGet(point) {
		for (var i in this.openList) {
			if ( this.openList[i].x == point.x && this.openList[i].y == point.y ) {
				return this.openList[i]
			}
		}
		return false
	}

	openRemove(point) {

		for (var i in this.openList) {
			if ( this.openList[i].x == point.x && this.openList[i].y == point.y ) {
				return this.openList.splice(i,1)
			}
		}

		return false
	}
}
