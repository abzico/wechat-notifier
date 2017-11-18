const request = require('request-promise-native');
const successMsgTemplate = require('./msg/notify-success-msg.js');
const failMsgTemplate = require('./msg/notify-fail-msg.js');

var _ = {
	/**
	 * Check whether all paramemeters are valid.
	 * @return {Boolean} Check whether all params are valid
	 */
	checkParamsValid: function() {
		if (process.env.WECHAT_APPID != null && process.env.WECHAT_APPID != '' &&
			  process.env.WECHAT_APPSECRET != null && process.env.WECHAT_APPSECRET != '' &&
			  process.env.WECHAT_SU_OPENID != null && process.env.WECHAT_SU_OPENID != '' &&
			  process.env.WECHAT_SUCCESS_TEMPLATE_ID != null && process.env.WECHAT_SUCCESS_TEMPLATE_ID != '' &&
			  process.env.WECHAT_FAIL_TEMPLATE_ID != null && process.env.WECHAT_FAIL_TEMPLATE_ID != '') {
			return true;
		}
		else {
			return false;
		}
	},

	/**
	 * Make a request to get access token.
	 * @return {Object} Promise object.
	 */
	getAccessToken: function() {
		if (!this.checkParamsValid()) {
			var e = new Error('WeChat\'s params are not all set.');
			return Promise.reject(e);
		}

		// create options object
		var options = {
			uri: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + process.env.WECHAT_APPID + "&secret=" + process.env.WECHAT_APPSECRET,
			json: true
		};

		return request(options);
	},

	/**
	 * Send success template message to pre-set authorized user.
	 * @param {String} title Title
	 * @param {String} msg Message
	 * @param {String} remark Remark
	 * @return {Object} Promise object.
	 */
	notifySuccessMessage: function(title, msg, remark) {

		return new Promise((resolve, reject) => {
			// get access token
			this.getAccessToken()
				.then((res) => {
					// get access token
					let access_token = res.access_token;

					// deep clone template message to be sent
					var successMsgObj = JSON.parse(JSON.stringify(successMsgTemplate));
					// modify message to be sent
					successMsgObj.touser = process.env.WECHAT_SU_OPENID;
					successMsgObj.template_id = process.env.WECHAT_SUCCESS_TEMPLATE_ID;
					successMsgObj.data.first.value = title;
					successMsgObj.data.keyword1.value = msg;
					successMsgObj.data.keyword2.value = new Date().toString();
					successMsgObj.data.remark.value = remark;

					// send template message via api
					var options = {
						method: "POST",
						uri: "https://api.wechat.com/cgi-bin/message/template/send?access_token=" + access_token,
						body: successMsgObj,
						json: true
					};

					// send template message
					request(options)
						.then((res) => {
							resolve(res);
						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	/**
	 * Send failure template message to pre-set authorized user.
	 * @param {String} title Title
	 * @param {String} alarmType Alarm type
	 * @param {String} alarmLevel Alarm level
	 * @param {String} msg msg string
	 * @param {String} remark Remark string
	 * @return {Object}     Promise object
	 */
	notifyFailMessage: function(title, alarmType, alarmLevel, msg, remark) {
		return new Promise((resolve, reject) => {
			// get access token
			this.getAccessToken()
				.then((res) => {
					// get access token
					let access_token = res.access_token;

					// deep clone template message to be sent
					var failMsgObj = JSON.parse(JSON.stringify(failMsgTemplate));
					// modify message to be sent
					failMsgObj.touser = process.env.WECHAT_SU_OPENID;
					failMsgObj.template_id = process.env.WECHAT_FAIL_TEMPLATE_ID;
					failMsgObj.data.first.value = title;
					failMsgObj.data.keyword1.value = alarmType;
					failMsgObj.data.keyword2.value = alarmLevel;
					failMsgObj.data.keyword3.value = msg;
					failMsgObj.data.keyword4.value = new Date().toString();
					failMsgObj.data.remark.value = remark;

					// send template message via api
					var options = {
						method: "POST",
						uri: "https://api.wechat.com/cgi-bin/message/template/send?access_token=" + access_token,
						body: failMsgObj,
						json: true
					};

					// send template message
					request(options)
						.then((res) => {
							resolve(res);
						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
};

module.exports = _;