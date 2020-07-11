const osmosis = require('osmosis');

scrapeSpotify();
function scrapeSpotify() {
	const chart = [];
	osmosis
		.get('https://spotifycharts.com/viral/global/weekly/latest')
		.set([
			osmosis.find('tbody tr:gt(-1)').set({
				position: 'td[2]',
				track: 'td[4] strong',
				author: 'td[4] span',
			}),
		])
		.data((tracks) => tracks)
		.done(console.log('finished'));

	console.log(chart);
	return chart;
}
