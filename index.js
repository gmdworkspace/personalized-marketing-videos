const ffmpeg = require('fluent-ffmpeg');
const command = ffmpeg('sample.mp4');

const getDynamicInjectionContent = (customerName='Dinesh', monthlyPayment=1000, oe=98) =>  [{
	msg: `Hey ${customerName}`,
	start: '0',
	end: '3'
}, {
	msg: `Your Monthly Payment is $${monthlyPayment}`,
	start: '4',
	end: '7'
}, {
	msg: `Your other expenses are $${oe}`,
	start: '7',
	end: '11'
}];

const getFilters = () => {
	const filters = [];
	const content = getDynamicInjectionContent();
	for(const key in content) {
		filters.push({
			filter: 'drawtext',
			options: {
				enable: `between(t, ${content[key].start}, ${content[key].end})`,
				text: content[key].msg,
				fontsize: 50,
				fontcolor: 'white',
				x: '(main_w/2-text_w/2)',
				y: 50,
				shadowcolor: 'black',
				shadowx: 2,
				shadowy: 2
			}
		})
	}
	return filters;
};

command.videoFilters(getFilters());

command.save('output.mp4');

