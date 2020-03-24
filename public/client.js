const replyBtn = document.querySelector('.new-tweet');
const tweetForm = document.querySelector('.tweet-form');
const replyForm = document.querySelector('.reply-form');
const loginBtn = document.querySelectorAll('.login-button');

const dropdownBtn = document.querySelector('.dropdown-arrow');

// checks if tweet form exists
if (tweetForm) {
	// new tweet
	tweetForm.addEventListener('submit', e => {
		// prevents window reload
		e.preventDefault();

		const tweet = document.querySelector('.new-tweet-text').value;

		if (!tweet) return console.log('Fields missing!');
		else {
			fetch(`/make-tweet?tweet=${tweet}`)
				.then(response => {
					response.json().then(data => console.log(data));

					// clear input field
					document.querySelector('.new-tweet-text').value = '';
				})
				.catch(err => console.log(err));
		}
	});
}

// checks if reply form exists
if (replyForm) {
	// send reply
	replyForm.addEventListener('submit', e => {
		// prevents window reload
		e.preventDefault();

		// get input values
		const tweetID = document.querySelector('.tweet-id').value;
		const username = document.querySelector('.tweet-author').value;
		const tweet = document.querySelector('.tweet-text').value;

		if (!tweetID || !username || !tweet) return console.log('Fields missing!');
		else {
			fetch(`/reply-tweet?tweetID=${tweetID}&&username=${username}&&tweet=${tweet}`)
				.then(response => {
					response.json().then(data => console.log(data));

					// clear input fields
					document.querySelector('.tweet-id').value = '';
					document.querySelector('.tweet-author').value = '';
					document.querySelector('.tweet-text').value = '';
				})
				.catch(err => console.log(err));
		}
	});
}

const showDropdown = item => {
	const relativeDropdown = item.parentElement.parentElement.children[3];

	if (!relativeDropdown.classList[1]) {
		relativeDropdown.classList.add('hide');
	} else {
		// closes all opened dropdowns
		document.querySelectorAll('.dropdown').forEach(e => e.classList.add('hide'));

		// // open current dropdown
		relativeDropdown.classList.remove('hide');
	}
};

// mouse click handler
window.onmouseup = e => {
	if (!e.target.matches('.drop-svg') || !e.target.matches('.drop-path')) {
		document.querySelectorAll('.dropdown').forEach(e => {
			e.classList.add('hide');
		});
	}
};
