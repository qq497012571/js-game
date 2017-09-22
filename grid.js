// 创建坐标节点
var Grid = function(x, y) {
	return {
		x: parseInt(x),
		y: parseInt(y),
		g: 0,
		h: 0,
		f: 0,
		step: 10,
		parent:null,

		// 获取周围节点
		getAroundGrid: function() {
			return [
				Grid(this.x+1,this.y),
				Grid(this.x-1,this.y),
				Grid(this.x,this.y+1),
				Grid(this.x,this.y-1),
			];
		},

		calcG: function(grid) {
			return this.step + (grid.parent ? grid.parent.step : 0);
		},

		calcF: function(endGrid) {
			return Math.abs(endGrid.x - this.x) + Math.abs(endGrid.y - this.y)
		},
	}
}