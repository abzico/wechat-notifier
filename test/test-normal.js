const wechatNotifier = require('../wechatNotify.js');

// check all params are set
console.log('checking all environment variables are set [' + wechatNotifier.checkParamsValid() + ']');

// send success message
console.log('testing to send success message ...');
wechatNotifier.notifySuccessMessage('Success Title', 'Success Msg', 'Success Remark')
	.then((res) => {
		console.log('\t[passed]');
	})
	.catch((err) => {
		console.log(err);
		console.log('\t[failed]');
	});

// send failed message
console.log('testing to send failed message ...');
wechatNotifier.notifyFailMessage('Failed Title', 'Backing up result', 'High', 'Failed Msg', 'Failed Remark')
	.then((res) => {
		console.log('\t[passed]');
	})
	.catch((err) => {
		console.log(err);
		console.log('\t[failed]');
	});