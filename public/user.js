const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const logout = document.querySelector('.logout');

// listen for auth status changes
auth.onAuthStateChanged(user => {
	if (user) {
		user.getIdTokenResult().then(idTokenResult => {
			user.admin = idTokenResult.claims.admin;
			console.log(`Logged in as: ${user.email}`);
		});

		sessionStorage.setItem('user', user.uid);

		// send user id to server
		fetch('/auth-users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user: user.uid })
		});

		// get data
		// database.collection('guides').onSnapshot(
		// 	snapshot => {
		// 		setupGuides(snapshot.docs);
		// 	},
		// 	err => console.log(err)
		// );
	} else {
		console.log(`Logged out`);

		if (sessionStorage.getItem('user')) sessionStorage.removeItem('user');

		// return window.location.replace('/');
	}
});

// login

if (loginForm) {
	loginForm.addEventListener('submit', e => {
		e.preventDefault();

		// get user info
		const email = loginForm['email'].value;
		const password = loginForm['password'].value;

		console.log(email);
		console.log(password);

		auth
			.signInWithEmailAndPassword(email, password)
			.then(credentials => {
				window.location.replace('/apps');
			})
			.catch(err => {
				console.log(err.message);
				// loginForm.querySelector('.error').innerHTML = err.message;
			});
	});
}

if (registerForm) {
	registerForm['username'].addEventListener('keyup', e => {
		console.log(registerForm['username'].value);
	});
}

// database
// .collection('usernames')
// .get()
// .then(querySnapshot => querySnapshot.forEach(doc => console.log(doc.data())))
// .catch(err => console.log(err));

if (logout) {
	// logout
	logout.addEventListener('click', e => {
		e.preventDefault();
		auth.signOut();
		window.location.replace('/');
	});
}
