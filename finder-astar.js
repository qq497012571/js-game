var FinderAstar = Class.create(null,{
	init: function(xMax,yMax) {
		// 设置越界值
		this.xMax = xMax;
		this.yMax = yMax;


		this.paths = [];// 存储上次查询获取的路径
		this.openList = new ListSet();
		this.closeList = new ListSet();
		// 初始化关闭列表,用于设置障碍物
		this.initCloseList = new ListSet();
	},

	find: function(start, end) {
		
		
		this.openList.clear();
		this.closeList.clear();
		this.paths = [];

		// 初始化需要提前关闭的路径
		if (!this.initCloseList.isEmpty()) {
			this.closeList.addAll(this.initCloseList.get())
		}

		if (this.closeList.has({x:end.x,y:end.y})) {
			return false;
		}

		this.openList.add(start);
		while(!this.openList.isEmpty()) {
			// 获取F值最小的节点
			var minStart = this.openList.min('f');
			// 判断该节点是否在关闭列表中
			if (this.closeList.has(minStart)) {
				continue;
			}

			// 获取该节点四周的坐标,上下左右,并计算GHF值
			var list = minStart.getAroundGrid();


			// 计算周围的优先级路径
			for (var i in list) {
				var g = list[i];

				if (g.x < 0 || g.y < 0) {
					continue;
				}
				if (g.x > this.xMax || g.y > this.yMax) {
					continue;
				}

				if (this.closeList.has({x:g.x,y:g.y})){
					continue;
				}

				if (!this.openList.has({x:g.x,y:g.y})) {
					g.g = g.calcG(minStart);
					g.f = g.calcF(end);
					g.h = g.g + g.f;
					g.parent = minStart;
					this.openList.add(g);
				}
			}
			
			// 将此点放入关闭列表中
			this.closeList.add(this.openList.remove(minStart));

			// 判断是否找到
			if (this.openList.has({x:end.x, y:end.y})) {
				var self = this;
				return {
					//路径
					paths: self.parseGrid(this.openList.get({x:end.x, y:end.y})).reverse(),
					//路径步数
					step: this.paths.length
				};
			}

		}

		return false;
	},
	// 设置寻路前的障碍物节点
	setCloseGrid: function(closeGrid) {
		this.initCloseList.add(closeGrid)
	},
	parseGrid: function(grid) {
		this.paths.push([grid.x,grid.y])
		if ( grid.parent != null) {
			this.parseGrid(grid.parent)
		}
		return this.paths;
	},
});

