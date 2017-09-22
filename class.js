function Class(parent) {

	var klass = function() {
		this.init.apply(this,arguments);
	}

	if (parent) {
		var subclass = function(){};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	}

	klass.fn = klass.prototype;
	klass.fn.parent = parent ? parent : null;

	klass.fn.init = function() {
	};

	// 调用父类构造方法
	klass.fn.__super = function() {
		(new klass.fn.parent()).init.apply(this,arguments);
	}


	klass.include = function(obj) {
		var included = obj.included;

		for (var i in obj) {
			klass.fn[i] = obj[i];
		}

		if (included) included(klass)
	}

	klass.extend = function(obj) {
		var extended = obj.extended;

		for (var i in obj) {
			klass[i] = obj[i];
		}

		if (extended) extended(klass)
	}
	return klass;
}

Class.create = function(extend, methods) {
	var o = new Class(extend);
	if (methods) {
		o.include(methods)
	}
	return o;
}
