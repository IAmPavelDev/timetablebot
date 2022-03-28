import keyboards from "./keyboards.js"; //конфиг клавиатуры
function now(query, tableGet, bot) {
    const chatId = query.message.chat.id;
    let table = [];
	let now = new Date();
	let today = now.getDay();
	// today -= 3; //для тестов
	if (today !== 0 && today !== 6) {
		let nowInMinutes = now.getHours() * 60 + now.getMinutes() + 120;
		// let nowInMinutes = 10 *60 + 50; //для тестов
		for (let key in tableGet[today - 1]) {
			if (key !== "name") {
				let minutesStart =
					Number(key.split(":")[0]) * 60 + Number(key.split(":")[1]);
				let minutesEnd = minutesStart + 90; //прибавили длительность пары в минутах
				let hoursEnd = Math.floor(minutesEnd / 60);
				let minutesEnd_for_text = minutesEnd - hoursEnd * 60;
				if (minutesStart <= nowInMinutes && minutesEnd >= nowInMinutes) {
					table.push("=============================");
					table.push(`${key} : ${tableGet[today - 1][key]}`);
					if (minutesEnd_for_text > 9) {
						table.push(
							`пара продлится до ${hoursEnd} : ${minutesEnd_for_text}`
						);
					}
					if (minutesEnd_for_text <= 9 && minutesEnd_for_text >= 0) {
						table.push(
							`пара продлится до ${hoursEnd} : 0${minutesEnd_for_text}`
						);
					}
					table.push("-----------------------");
					table.join("\n");
					bot.sendMessage(chatId, `${table.join("\n")}`, {
						// прикрутим клаву
						reply_markup: {
							inline_keyboard: keyboards().keyboard,
						},
					});
				}
			}
		}
	} else {
		bot.sendMessage(chatId, "Сегодня нет пар", {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	}
	if (today !== 0 && today !== 6 && table.length === 0) {
		bot.sendMessage(chatId, "Сейчас нет пар", {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	}
}
export default now;