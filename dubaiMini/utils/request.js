import i18n from '../i18n';
let baseUrl = ''
if(process.env.NODE_ENV === 'development'){
    baseUrl = 'http://localhost:1337'
}else{
    baseUrl = 'http://localhost:1337'
}
export default function (opts) {
	const data = opts.data || {}
	Object.assign(data, {locale: i18n.locale});
	opts.url = baseUrl + opts.url;
	return uni.request(opts);
	
}