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
					text: "Какая сейчас пара", // текст на кнопке
					callback_data: "nowData", // данные для обработчика событий
				},
			],
			[
				{
					text: "Какая сейчас неделя", // текст на кнопке
					callback_data: "weekData", // данные для обработчика событий
				},
			],
			[
				{
					text: "Сменить группу", // текст на кнопке
					callback_data: "changeSquad", // данные для обработчика событий
				},
			],
		],
		group_keyboard: [
			[
				{
					text: "IKM-720Б", // текст на кнопке
					callback_data: "B", // данные для обработчика событий
				},
			],
			[
				{
					text: "IKM-720Г", // текст на кнопке
					callback_data: "G", // данные для обработчика событий
				},
			],
		],
	};
}
export default keyboards;
