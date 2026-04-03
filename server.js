const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

const cars = [
  {name:"BMW M5 F90", year:"2021", img:"https://images.unsplash.com/photo-1619767886558-efdc259cde1a"},
  {name:"BMW E30 M3", year:"1990", img:"https://images.unsplash.com/photo-1603386329225-868f9b1ee6f9"},
  {name:"BMW X6", year:"2023", img:"https://images.unsplash.com/photo-1620891549027-942fdc95d3f5"}
];

const quotes = [
"Господь — твердыня моя",
"Не бойся, ибо Я с тобой",
"Просите, и дано будет",
"Любовь никогда не перестаёт",
"Будьте тверды"
];

app.get("/wallpaper", async (req, res) => {

  const today = new Date();
  const index = today.getDate() % cars.length;
  const car = cars[index];

  const canvas = createCanvas(1179, 2556);
  const ctx = canvas.getContext("2d");

  const image = await loadImage(car.img + "?w=1200");

  ctx.drawImage(image, 0, 0, 1179, 2556);

  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, 1179, 2556);

  ctx.fillStyle = "#fff";
  ctx.font = "40px Arial";
  ctx.fillText(car.name + " (" + car.year + ")", 50, 2200);

  ctx.font = "30px Arial";
  ctx.fillText(quotes[today.getDate() % quotes.length], 50, 2300);

  res.set("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

app.listen(3000);
