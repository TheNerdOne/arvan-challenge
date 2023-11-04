import {cookieFuns} from './cookies'

export const TOKEN_KEY = 'token'
export const REFRESH_TOKEN_KEY = 'refresh-token'
const cookie = new cookieFuns()

export const getToken = () => {
	return cookie.getCookie({cname:TOKEN_KEY})
}
export const getRefreshToken = () => {
	return cookie.getCookie({cname:REFRESH_TOKEN_KEY})
}

export const setToken = (token:string) => {
	if (!token || token.length === 0 || typeof token !== 'string') return
	cookie.setCookie({cname:TOKEN_KEY,cvalue:token,exdays:1})
}

export const setRefreshToken = (token:string) => {
	if (!token || token.length === 0 || typeof token !== 'string') return
	cookie.setCookie({cname:REFRESH_TOKEN_KEY,cvalue:token,exdays:30})
}

export const deleteToken = (token:string) => {
	cookie.setCookie({cname:TOKEN_KEY,cvalue:token,exdays:0})
	// window.localStorage.removeItem(TOKEN_KEY)
}
export const deleteRefreshToken = () => {
	cookie.setCookie({cname:REFRESH_TOKEN_KEY,cvalue:'',exdays:0})
	// window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export default { TOKEN_KEY, getToken, setToken, deleteToken, REFRESH_TOKEN_KEY, getRefreshToken, setRefreshToken, deleteRefreshToken }
