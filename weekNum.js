import keyboards from "./keyboards.js"; //конфиг клавиатуры
function weekNum(query, bot) {
    const chatId = query.message.chat.id;
    let table = [];
    const date = "2022-02-07T00:00:00.000Z";
		let currentDate = Date.parse(new Date());
		let days = (currentDate - Date.parse(date)) / 86400000; //86400000 - ms в дне
		if (Math.floor(days / 7) % 2) {
			bot.sendMessage(
				chatId,
				"-----------------------\nСейчас первая неделя\n-----------------------",
				{
					// прикрутим клаву
					reply_markup: {
						inline_keyboard: keyboards().keyboard,
					},
				}
			);
		} else {
			bot.sendMessage(
				chatId,
				"-----------------------\nСейчас вторая неделя\n-----------------------",
				{
					// прикрутим клаву
					reply_markup: {
						inline_keyboard: keyboards().keyboard,
					},
				}
			);
		}
}
export default weekNum;