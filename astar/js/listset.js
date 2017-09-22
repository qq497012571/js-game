var ListSet = Class.create(null, {
	init: function() {
		this.list = [];
	},
	get: function(node) {
		if (!node) {
			return this.list;
		}
		// 获取指定
		var i ;
		if ((i = this.find(node)) !== false) {
			return this.list[i];
		}
		return false;
	},
	add: function(node) {
		if (!this.find(node, true)) {
			this.list.push(node);
		}
	},
	addAll: function(nodes) {
		for (var i in nodes) {
			this.list.push(nodes[i])
		}
	},
	find: function(node, mode) {
		var flag;
		var mode = mode || false;

		for (var i in this.list) {
			flag = false;

			for (var k in node) {
				if (this.list[i][k] == node[k]) {
					flag = true;
				} else {
					flag = false;
					break;
				}
			}

			if (flag) {
				return mode ? true : i;
			}
		}
		
		return false;
	},
	has: function(node) {
		return this.find(node,true);
	},
	remove: function(node) {
		var i ;
		if ((i = this.find(node)) !== false) {
			return this.list.splice(i,1)[0]
		}
		return false;
	},
	len: function() {
		return this.list.length;
	},
	clear: function() {
		this.list = [];
	},
	isEmpty: function() {
		return this.list.length > 0 ? false : true;
	},

	min: function(key) {
		var index = 0;
		var min = this.list[index][key];

		for (var i = 0,len = this.len(); i < len; i++) {
			if (this.list[i][key] < min) {
				index = i;
				min = this.list[i][key];
			}
		}

		return this.list[index]
	}
});