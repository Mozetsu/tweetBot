const osmosis = require('osmosis');

const scrapeSpotify = () => {
	return new Promise((resolve, reject) => {
		let response;
		osmosis
			.get('https://spotifycharts.com/viral/global/weekly/latest')
			.set([
				osmosis.find('tbody tr:gt(-1)').set({
					position: 'td[2]',
					track: 'td[4] strong',
					author: 'td[4] span',
				}),
			])
			.data((arr) => (response = arr))
			.error((err) => reject(err))
			.done(() => resolve(response.splice(0, 5)));
	});
};



module.exports = { scrapeSpotify };
