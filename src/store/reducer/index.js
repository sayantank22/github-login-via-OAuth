export const initialState = {
	isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
	user: JSON.parse(localStorage.getItem('user')) || null,
	client_id: 'ef4047eddc0cd5642302',
	redirect_uri: 'http://localhost:3000/login',
	client_secret: '49e31b94a1cae37bc4ef97b3697b7dbe0068bc8a',
	proxy_url: 'http://localhost:5000/authenticate',
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN': {
			localStorage.setItem(
				'isLoggedIn',
				JSON.stringify(action.payload.isLoggedIn)
			);
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			return {
				...state,
				isLoggedIn: action.payload.isLoggedIn,
				user: action.payload.user,
			};
		}
		case 'LOGOUT': {
			localStorage.clear();
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		}
		default:
			return state;
	}
};
