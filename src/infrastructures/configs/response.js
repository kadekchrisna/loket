const misc = {
  responses: (message, data) => {
    
    const response = {
      message: message.message,
    };
    const status = message.status || 200;
    
    if (data) response.data = data;
      
    return {status, response}
  }
};
  
module.exports = misc;