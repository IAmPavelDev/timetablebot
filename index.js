
import TelegramBot from "node-telegram-bot-api"; // подключаем node-telegram-bot-api
import keyboards from "./keyboards.js"; //конфиг клавиатурыconst
import dotenv from 'dotenv';
import today from "./today.js";
import weekNum from "./weekNum.js";

import express from "express"

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world');
});

const port = 3000;

app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});



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
	const tableGet = [
		{
			"name": "Понеділок",
			"10:25": "Технічні засоби автоматизації (Бабіченко А.К.) ЛК",
			"12:35": "1-я неделя: Технічні засоби автоматизації (Шутинський О.Г.) ЛК \n 2-я неделя: - "
		},
		{
			"name": "Вівторок",
			"12:35": "ВІЙСЬКОВА ПІДГОТОВКА"
		},
		{
			"name": "Середа",
			"8:30": " Іноземна мова",
			"10:25": "Мікропроцесорні засоби автоматики (Лещенко В.М.) ЛК",
			"12:35": "Програмне забезпечення промислових контролерів Лисаченко І.Г. ЛК",
			"14:30": "1-я неделя: Мікропроцесорні засоби автоматики (Денисенко М.А.) ЛАБ \n 2-я неделя: Мікропроцесорні засоби автоматики(Лещенко В.М.) ПЗ"
		},
		{
			"name": "Четвер",
			"8:30": "ДВВ 3",
			"10:25": "1-я неделя: Технічні засоби автоматизації ЛАБ \n 2-я неделя: Програмне забезпечення промислових контролерів ЛАБ",
			"12:35": "1-я неделя: Технічні засоби автоматизації ЛАБ \n 2-я неделя: Програмне забезпечення промислових контролерів ЛАБ",
			"14:30": "1-я неделя: ДВВ Криптографічні засоби в інформаційно-комп'ютерних системах (Караман Д.Г.) ЛК \n 2-я неделя: ДВВ Криптографічні засоби в інформаційно-комп'ютерних системах (Караман Д.Г.) ПЗ"
		},
		{
			"name": "П'ятниця",
			"10:25":"Цифрова обробка сигналів в інформаційно-комп'ютерних системах (Івашко А.В.) ЛК",
			"12:35": "1-я неделя: Цифрова обробка сигналів в інформаційно-комп'ютерних системах (Івашко А.В.) ЛК \n 2-я неделя: Цифрова обробка сигналів в інформаційно-комп'ютерних системах (Івашко А.В.) ПЗ",
			"14:30": "1-я неделя: Цифрова обробка сигналів в інформаційно-комп'ютерних системах (Івашко А.В.) ЛАБ \n 2-я неделя: -"
		}
	];


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
