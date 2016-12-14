var pritzValidator  = {
	author : 'Pritam',
    validators : {
        validateLength :function (text, minLength, maxLength){
            if(text.length < minLength || text.length > maxLength) return false;
        },

        validateText : function(text){
            return /^[A-Za-z]*$/.test(text);
        },

        validateNumber : function(text){
            return /^[0-9]*$/.test(text);
        },

        required : function(text){
        	return text.length > 0;
        }

    },

    validate : function(form, validators, messages){
        // this - pritzValidator
        var self = this;
        

        self.clearAllValidationErrors();

        // for each field in validators
        for(var fieldName in validators) {

        	var isFieldValid = true;	
            var fieldValue = form[fieldName].value;
            // var each validator for field
            for(var validatorName in validators[fieldName]) {
            	if(isFieldValid){
                	if(self.validators[validatorName](fieldValue) == false){
                		isFieldValid = false;
                		// show error on page
                		// get message to show
                		// if user have not provided message take from default messages
                		var message;
                		if(typeof messages[fieldName] == 'undefined' || 
                				typeof messages[fieldName][validatorName] == 'undefined'){

                			message = self.defaults.messages[validatorName];
                		}
                		else{
                			message = messages[fieldName][validatorName];	
                		}
                		self.showError(form[fieldName], message);
                	}
            	}
            }
		}
    },

    showError: function(element, message){
    	var errorNode = document.createElement('div');
    	errorNode.className = 'text error';
    	errorNode.innerHTML = message;
    	element.parentNode.appendChild(errorNode);
    }, 

    defaults:{
    	messages : {
    		required : 'This field is required.', 
    		validateNumber : 'Invalid'
    	}
    },

    clearAllValidationErrors: function(){
    	var errorElements = document.getElementsByClassName("error");
    	errorElementsLength = errorElements.length;
    	if(errorElements.length > 0){
    		console.log(errorElements.length);
    		for(var i = 0; i < errorElementsLength; i++){
    			errorElements[i].parentNode.removeChild(errorElements[i]);
    			errorElementsLength--;
    			i--;
    		}
    	}
    }
};
