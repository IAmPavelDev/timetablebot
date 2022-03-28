import tableGet_B from "./tableTime.json" assert { type: "json" };
import tableGet_G from "./tableTime_420g.json" assert { type: "json" };
import groupNumber_B from "./groupB.json" assert { type: "json" };
import groupNumber_G from "./groupG.json" assert { type: "json"};
import TelegramBot from "node-telegram-bot-api"; // подключаем node-telegram-bot-api
import keyboards from "./keyboards.js"; //конфиг клавиатуры
import today from "./today.js";
import now from "./now.js";
import weekNum from "./weekNum.js";




//data source

// import pg from "pg";
// const pg = new pg.Pool
const token = "5108561766:AAGsJc0_NaT1r0v4gpOK89uta2HiUkT-cVw"; // тут токен кторый мы получили от botFather
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
	let table = []; //храним расписание
	let tableGet = [];
	if (groupNumber_B.find((elem) => elem === chatId)) {
		tableGet = tableGet_B;
	}
	if (groupNumber_G.find((elem) => elem === chatId)) {
		tableGet = tableGet_G;
	}
	if (query.data == "B") {
		tableGet = tableGet_B;
		groupNumber_B.push(chatId);
		bot.sendMessage(chatId, "Для вас сохранено значение группы IKM-720Б", {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	}
	if (query.data == "G") {
		tableGet = tableGet_G;
		groupNumber_G.push(chatId);
		bot.sendMessage(chatId, "Для вас сохранено значение группы IKM-720Г", {
			// прикрутим клаву
			reply_markup: {
				inline_keyboard: keyboards().keyboard,
			},
		});
	}
	if (tableGet.length === 0) {
		getGroupName(chatId);
	}
	if (query.data == "changeSquad" && tableGet.length !== 0) {
		for(let key in groupNumber_B){
			if(groupNumber_B[key] === chatId){
				delete groupNumber_B[key];
			} 
		}
		for(let key in groupNumber_G){
			if(groupNumber_G[key] === chatId){
				delete groupNumber_G[key];
			} 
		}
		getGroupName(chatId);
	}
	if (query.data == "allData" && tableGet.length !== 0) {
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
	if (query.data == "todayData" && tableGet.length !== 0) {
		today(query, tableGet, bot);
	}
	if (query.data == "nowData" && tableGet.length !== 0) {
		now(query, tableGet, bot);
	}
	if (query.data == "weekData" && tableGet.length !== 0) {
		weekNum(query, bot);
	}
});
