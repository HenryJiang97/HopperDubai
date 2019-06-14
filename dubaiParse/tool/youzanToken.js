exports.modules = {
    getToken : function () {

        youzanyun.token.get({
            authorize_type: 'silent',
            grant_id: '42704224',
            client_id: '9fce42827c2151e1b3',
            client_secret: 'cee31998d75da2e7bcab3c6fd39d9288',
        }).then(r => {
            token = r.data.data.access_token
            // console.log('token' + JSON.stringify(token))
            return token
        }).catch(e => {
            console.log('e' + JSON.stringify(e))
    
        })
    },
    refreshToken: ''
} 
   

    
