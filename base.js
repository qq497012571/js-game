var Base = {
	createNew : function() {
		var b = {

		}

		b.createImage = function(src) {
			var img = new Image()
			img.src = src
			return img
		}
		
		return b
	}
}