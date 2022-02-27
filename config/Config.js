/**
 * Setting Configuration Class
 */
 class Config {
    constructor(port, commonConfig, messages) {
      this.port = port;
      this.commonConfig = commonConfig;
      this.messages = messages;
    }
  }

  /**
 * Creating Configuration Attributes
 */
const port = process.env.PORT;
const commonConfig = {
  APP_NAME: "Node Express Boilerplate",
  APP_DESCRIPTION: "Node Express Boilerplate",
  SECRET_KEY: process.env.SECRET_KEY,
};
const messages = {
  INVALID_CREDENTIALS: "Invalid Login Credentials",
  USER_CREATED : "User __value__"
};

/**
 * Setting object to return
 */
 const config = new Config(port, commonConfig, messages);

 /**
  * Exporting Module
  */
 module.exports = config;
 