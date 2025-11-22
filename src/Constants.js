const Constants= {};

Constants.errorMessages = {   
    EMAIL_REQUIRED: 'Email is required',
    ORG_REQUIRED: 'Organization ID is required',
    PROVIDER_REQUIRED: 'Provider is required',
    PROVIDER_USER_ID_REQUIRED: 'Provider User ID is required'
    
}



Constants.isCustomErrorMessage = function(message)
{ 
    return Object.values(Constants.errorMessages).includes(message);
}




export { Constants };
