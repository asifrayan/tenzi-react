const randomNumber = () => Math.floor(Math.random() * 6 + 1);

const data = [];

for (let i = 1; i <= 10; i++) {
  data.push({
    id: i,
    diceNumber: randomNumber(),
    hold: false,
  });
}

export default data;
