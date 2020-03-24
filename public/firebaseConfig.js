// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD7EW87mpT6Hv4DV_AV0a86UVzLDdkZ70I',
	authDomain: 'funny-tweets.firebaseapp.com',
	databaseURL: 'https://funny-tweets.firebaseio.com',
	projectId: 'funny-tweets'
};

firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const database = firebase.firestore();
const functions = firebase.functions();
