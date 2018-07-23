# wechat-notifier
WeChat notifier, notify message via WeChat official / subscription account with permission to send template message.

# How to

To be able to notify successful, or failed message to your WeChat account via your WeChat Official/Subscription account with granted permission to send templated message. Then defines all of the following settings.

* `WECHAT_APPID=<your app id>`

	Check at [mp.weixin.qq.com](https://mp.weixin.qq.com) for your WeChat official / subscription account.

* `WECHAT_APPSECRET=<your app secret>`

	Check at [mp.weixin.qq.com](https://mp.weixin.qq.com) for your WeChat official / subscription account.

* `WECHAT_SU_OPENID=<user open id to receive msgs>`

	You can find out what is your open id attached to your WeChat official / subscription account you followed by listing followers list via [Follow List API](http://open.wechat.com/cgi-bin/newreadtemplate?t=overseas_open/docs/oa/user/follower-list#user_follower-list).

* `WECHAT_SUCCESS_TEMPLATE_ID=<your template id>`

	Check at [mp.weixin.qq.com](https://mp.weixin.qq.com) for Template Message section (you might need to apply to grant this ability). Then add a template that has at least 2 **keywords**, with 1 **remark**.

* `WECHAT_FAIL_TEMPLATE_ID=<your template id>`

	Check at [mp.weixin.qq.com](https://mp.weixin.qq.com) for Template Message section (you might need to apply to grant this ability). Then add a template that has at least 4 **keywords**, with 1 **remark**.

You need to set all of above environment variables in order to make it works.

# Installation

This package is available via NPM see [wechat-notifier](https://www.npmjs.com/package/wechat-notifier), or you can just clone this repo.

# License
MIT, abzi.co
