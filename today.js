import keyboards from "./keyboards.js"; //конфиг клавиатуры
function today(query, tableGet, bot) {
    const chatId = query.message.chat.id;
	let table = []; //храним расписание
	let now = new Date();
	let today = now.getDay();
	if (now.getHours() >= 22) {
		today = today + 1;
        if(today === 7){
            today = 0;
        }
	}
	if (today !== 0 && today !== 6) {
		table.push(`\n${tableGet[today - 1].name}`);
		table.push("=============================");
		for (let key in tableGet[today - 1]) {
			if (key !== "name") {
				table.push(`${key} : ${tableGet[today - 1][key]}`);
				table.push("-----------------------");
			}
		}
		table.join("\n");
		bot.sendMessage(chatId, `${table.join("\n")}`, {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	} else {
		bot.sendMessage(chatId, "Сегодня нет пар", {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	}
}
export default today;
