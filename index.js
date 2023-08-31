import tableGet_B from "./tableTime.json" assert { type: "json" };
import TelegramBot from "node-telegram-bot-api"; // подключаем node-telegram-bot-api
import keyboards from "./keyboards.js"; //конфиг клавиатурыconst
import dotenv from 'dotenv';
import today from "./today.js";
import weekNum from "./weekNum.js";



dotenv.config();


//data source

// import pg from "pg";
// const pg = new pg.Pool
const token = process.env.TOKEN; // тут токен кторый мы получили от botFather
// включаем самого бота
const bot = new TelegramBot(token, { polling: true });
const getGroupName = (id) => {
	bot.sendMessage(id, "Группа?", {
		// прикрутим клаву
		reply_markup: {
			inline_keyboard: keyboards().group_keyboard,
		},
	});
};
// обработчик события присылания нам любого сообщения
bot.on("message", (msg) => {
	const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
	// отправляем сообщение
	bot.sendMessage(chatId, "Чё надо?", {
		// прикрутим клаву
		reply_markup: {
			inline_keyboard: keyboards().keyboard,
		},
	});
});
// обработчик событий нажатий на клавиатуру
bot.on("callback_query", (query) => {
	const chatId = query.message.chat.id;
	let table = [];
	const tableGet = tableGet_B;
	if (query.data === "allData") {
		for (let day of tableGet) {
			table.push(`\n${day.name}`);
			table.push("=============================");
			for (let key in day) {
				if (key !== "name") {
					table.push(`|| ${key} || : ${day[key]}`);
					table.push("-----------------------");
				}
			}
			table.join("\n");
		}
		bot.sendMessage(chatId, `${table.join("\n")}`, {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	}
	if (query.data === "todayData" && tableGet.length !== 0) {
		today(query, tableGet, bot);
	}
	if (query.data === "weekData" && tableGet.length !== 0) {
		weekNum(query, bot);
	}
});
