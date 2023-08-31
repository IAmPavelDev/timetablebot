function keyboards() {
	return {
		keyboard: [
			[
				{
					text: "Всё расписание", // текст на кнопке
					callback_data: "allData", // данные для обработчика событий
				},
			],
			[
				{
					text: "Расписание на сегодня", // текст на кнопке
					callback_data: "todayData", // данные для обработчика событий
				},
			],
			[
				{
					text: "Какая сейчас неделя", // текст на кнопке
					callback_data: "weekData", // данные для обработчика событий
				},
			]
		]
	};
}
export default keyboards;
