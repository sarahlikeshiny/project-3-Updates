module.exports = {

  facebook: {
    loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    profileURL: '#',
    clientId: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    scope: 'user:email'
    // getLoginURL() {
    //
    //   return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=http://localhost:7000/api/oauth/login`;
    // }
  }
};
