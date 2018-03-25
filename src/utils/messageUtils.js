import _ from "lodash";

/**
 * standardizeMessages - Standardizes message and strips unnecessary data
 * @param   {Object}  message  Full message object
 * @returns {Object}        Stripped down messages information
 */
export const standardizeMessages = messages =>
  messages.map(message => {
    return {
      to: _.get(message, "to"),
      from: _.get(message, "from"),
      subject: _.get(message, "subject"),
      message: _.get(message, "message")
    };
  });
