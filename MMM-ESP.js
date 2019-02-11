//helloworld.js:

Module.register("MMM-ESP",{
	// Default module config.
	defaults: {
		text: "hello world",
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
    },
    
    getResp: function(){
        
        $:ajax({
        url:"http://10.10.10.166",
        type: 'GET',
        dataType: 'jsonp',
        success : function(data){
        console.log(data)
        }
      })
    }
	
});