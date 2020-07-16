const osmosis = require('osmosis');

// scraper
const scrapeSpotify = (length = 5) => {
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
			.done(() => resolve(response.splice(0, length)));
	});
};

module.exports = { scrapeSpotify };
