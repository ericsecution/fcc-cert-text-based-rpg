// Text-Based RPG Game
// phase 1 of customizations
// improved UX by adding in more interactive messaging
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick'];
let poorCounter = 0;

let currentLocationIndex = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');

const monsterHealthText = document.querySelector('#monsterHealth');

const weapons = [
	{                       // Index #
                           // -------
		name: 'Stick',     //    0
		power: 5,
	},
    {
        name: 'Club',     //     1
        power: 11,
    },
    {
        name: 'Spear',    //     2
        power: 15,
    },
    {
        name: 'Bow',      //     3
        power: 20,
    },
    {
        name: 'Mallet',   //     4
        power: 23,
    },
    {
        name: 'Magic Wand', //   5
        power: 25,
    },
	{
		name: 'Dagger',     //   6
		power: 30,
	},
    {
        name: 'Axe',        //   7
        power: 35,
    },
    {
        name: 'Crossbow',   //   8
        power: 40,
    },
    {
        name: 'Flail',      //   9
        power: 45,
    },
	{
		name: 'Claw Hammer', //  10
		power: 50,
	},
    {
		name: 'Warhammer',   //  11
		power: 55,
	},
    {
		name: 'Battle Axe',  //  12
		power: 60,
	},
    {
		name: 'Fire Staff',  //  13
		power: 70,
	},
    {
		name: 'Lightning Sword',  //  14
		power: 80,
	},
    {
		name: 'Ice Dagger',  //  15
		power: 85,
	},
    {
		name: 'Shadow Blade',  //  16
		power: 99,
	},
	{
		name: 'Sword of the Dead',  //  17
		power: 111,
	},
    {
		name: 'Morning Glory',  //  18
		power: 132,
	},
    {
		name: 'The Invisible',  //  19
		power: 150,
	},
];

// Currently: 20 different Monsters
// ----------
const monsters = [
	{
		name: 'Slime',
		level: 2,
		health: 11,
	},
    {
        name: 'Imp',
        level: 3,
        health: 18

    },
    {
		name: 'Goblin',
		level: 4,
		health: 30,
	},
    {
		name: 'Hobgoblin',
		level: 5,
		health: 35,
	},
    {
		name: 'Orc',
		level: 7,
		health: 45,
	},
    {
		name: 'Banshee',
		level: 8,
		health: 60,
	},
    {
		name: 'Orc Captain',
		level: 9,
		health: 65,
	},
    {
        name: 'Skeletwin', // always appear in pairs
        level: 10,
        health: 72,
    },
	{
		name: 'Troll',
		level: 11,
		health: 80,
	},
    {
        name: 'Demon Fairy',
        level: 12,
        health: 85
    },
    {
        name: 'She Troll',
        level: 13,
        health: 88,
    },
    {
        name: 'Swamp Nymph',
        level: 14,
        health: 95,
    },
    {
        name: 'Ghost',
        level: 15,
        health: 101,
    },
    {
        name: 'Cursed Mermaid',
        level: 17,
        health: 111,
    },
    {
        name: 'Vampire',
        level: 18,
        health: 115,
    },
    {
        name: 'Unibeast',
        level: 19,
        health: 128,
    },
    {
        name: 'Werewolf',
        level: 20,
        health: 135,
    },
    {
        name: 'Demon',
        level: 27,
        health: 150,
    },
    {
        name: 'Ice Giant',
        level: 33,
        health: 170,
    },
    {
        name: 'Fire Elemental',
        level: 36,
        health: 199,
    },
    {
        name: 'Necromancer',
        level: 40,
        health: 211,
    },
    {
        name: 'Wraith Knight',
        level: 50,
        health: 235,
    },
    {
        name: 'Hydra',
        level: 55,
        health: 260,
    },
    {
        name: 'Phoenix Dragon',
        level: 77,
        health: 277,
    },
	{
		name: 'Night Dragon',
		level: 80,
		health: 300,
	},
];

const locations = [
	// 1 = locations[0] >> called by the goTown() function
	{
		name: 'town square',
		'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
		'button functions': [goStore, goCave, fightDragon],
		text: 'You are in the town square. You see a sign that says "Store".',
	},
	// 2 = locations[1] >> called by the goStore() function
	{
		name: 'store',
		'button text': [
			'Buy 10 health (10 gold)',
			'Buy weapon (30 gold)',
			'Go to town square',
		],
		'button functions': [buyHealth, buyWeapon, goTown],
		text: 'You enter the store.',
	},
	// 3 = locations[2] >> called by the goCave() function
	{
		name: 'cave',
		'button text': [
			'Fight slime',
			'Fight fanged beast',
			'Go to town square',
		],
		'button functions': [fightSlime, fightBeast, goTown],
		text: 'You enter the cave. You see some monsters.',
	},
	// 4 = locations[3] >> called by the goFight() function
	{
		name: 'fight',
		'button text': ['Attack', 'Dodge', 'Run'],
		'button functions': [attack, dodge, goTown],
		text: 'You are fighting a monster.',
	},
	// 5 = locations[4] >> called by the defeatMonster() function
	{
		name: 'kill monster',
		'button text': [
			'Go to town square',
			'Go to town square',
			'Go to town square',
		],
		'button functions': [goTown, goTown, easterEgg],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
	},
	// 6 = locations[5] >> called by the lose() function
	{
		name: 'lose',
		'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
		'button functions': [restart, restart, restart],
		text: 'You die. &#x2620;',
	},
	// 7 = locations[6] >> called by the winGame() function
	{
		name: 'win',
		'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
		'button functions': [restart, restart, restart],
		text: 'You defeat the dragon! YOU WIN THE GAME! &#x1F389;',
	},
	// 8 = locations[7] >> called by the easterEgg() function
	{
		name: 'easter egg',
		'button text': ['2', '8', 'Go to town square?'],
		'button functions': [pickTwo, pickEight, goTown],
		text: 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!',
	},
];

// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location, index) {
	currentLocationIndex = index;
	monsterStats.style.display = 'none';
	button1.innerText = location['button text'][0];
	button2.innerText = location['button text'][1];
	button3.innerText = location['button text'][2];
	button1.onclick = () => location['button functions'][0]();
	button2.onclick = () => location['button functions'][1]();
	button3.onclick = () => location['button functions'][2]();
	text.innerHTML = location.text;
}

function goTown() {
	update(locations[0], 0);
}

function goStore() {
	update(locations[1], 1);
}

function goCave() {
	update(locations[2], 2);
}

async function buyHealth() {
	const currentLocationText = locations[currentLocationIndex].text;
	if (gold >= 10) {
		gold -= 10;
		health += 10;
		goldText.innerText = gold;
		healthText.innerText = health;
	} else {
		if (poorCounter < 3) {
			text.innerText = 'You do not have enough gold to buy health.';
			await pauseTime(3);
			text.innerText = "You're in the Store.\n";
			await pauseTime(1);
			text.innerText += 'What would you like to do?';
			poorCounter++;
		} else {
			text.innerText = "Seriously. You don't have enough gold!\n";
			await pauseTime(2);
			text.innerText += 'Go and fight monsters to gain more gold.';
			poorCounter = 0;
            await pauseTime(3);
			text.innerText = "You're in the Store.\n";
			await pauseTime(1);
			text.innerText += 'What would you like to do?';
		}
	}
}

async function buyWeapon() {
	const currentLocationText = locations[currentLocationIndex].text;
	if (currentWeapon < weapons.length - 1) {
		if (gold >= 30) {
			gold -= 30;
			currentWeapon++;
			goldText.innerText = gold;
			let newWeapon = weapons[currentWeapon].name;
			text.innerText = 'You now have a ' + newWeapon + '.';
			inventory.push(newWeapon);
			text.innerText += ' In your inventory you have: ' + inventory + '.';
		} else {
            if (poorCounter < 3) {
			text.innerText = 'You do not have enough gold to buy a weapon.';
			await pauseTime(3);
			text.innerText = "You're in the Store.\n";
			await pauseTime(1);
			text.innerText += 'What would you like to do?';
			poorCounter++;
            } else {
                text.innerText = "Seriously. You don't have enough gold!\n";
                await pauseTime(2);
                text.innerText += 'Go and fight monsters to gain more gold.';
                poorCounter = 0;
                await pauseTime(3);
                text.innerText = "You're in the Store.\n";
                await pauseTime(1);
                text.innerText += 'What would you like to do?';
            }
		}
	} else {
		text.innerText = 'You already have the most powerful weapon!';
		button2.innerText = 'Sell weapon for 15 gold';
		button2.onclick = sellWeapon;
	}
}

async function sellWeapon() {
	const currentLocationText = locations[currentLocationIndex].text;
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
		let soldWeapon = inventory.pop();
		currentWeapon--;
		text.innerText = 'You sold a ' + soldWeapon + '.';
		text.innerText += ' In your inventory you have: ' + inventory + '.';
		await pauseTime(5);
		text.innerHTML = currentLocationText;
	} else {
		text.innerText = "Don't sell your only weapon!";
		await pauseTime(5);
		text.innerHTML = currentLocationText;
	}
}

function fightSlime() {
	fighting = 0;
	goFight();
}

function fightBeast() {
	fighting = 1;
	goFight();
}

function fightDragon() {
	fighting = 2;
	goFight();
}

function goFight() {
	update(locations[3], 3);
	monsterHealth = monsters[fighting].health;
	monsterStats.style.display = 'block';
	monsterName.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}

function attack() {
	text.innerText = 'The ' + monsters[fighting].name + ' attacks.';
	text.innerText +=
		' You attack it with your ' + weapons[currentWeapon].name + '.';
	health -= getMonsterAttackValue(monsters[fighting].level);
	if (isMonsterHit()) {
		monsterHealth -=
			weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	} else {
		text.innerText += ' You miss.';
	}

	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;
	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		defeatMonster();
		if (fighting === 2) {
			winGame();
		} else {
			defeatMonster();
		}
	}
	if (Math.random() <= 0.07 && inventory.length !== 1) {
		text.innerText += ' Your ' + inventory.pop() + ' breaks.';
		currentWeapon--;
	}
}

function getMonsterAttackValue(level) {
	const hit = level * 5 - Math.floor(Math.random() * xp);
	console.log(hit);
	return hit > 0 ? hit : 0;
}

function isMonsterHit() {
	return Math.random() > 0.2 || health < 20;
}

function dodge() {
	text.innerText =
		'You dodge the attack from the ' + monsters[fighting].name + '!';
}

function defeatMonster() {
	gold += Math.floor(monsters[fighting].level * 6.7);
	xp += monsters[fighting].level;
	goldText.innerText = gold;
	xpText.innerText = xp;
	update(locations[4], 4);
}

function lose() {
	update(locations[5], 5);
}

function winGame() {
	update(locations[6], 6);
}

function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ['stick'];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}

function easterEgg() {
	update(locations[7], 7);
}

function pickTwo() {
	pick(2);
}

function pickEight() {
	pick(8);
}

function pick(guess) {
	const numbers = [];
	for (let i = 0; i < 10; i++) {
		numbers.push(Math.floor(Math.random() * 11));
	}
	let resultText =
		'You picked ' + guess + '. Here are the random numbers:\n';
	for (let i = 0; i < 10; i++) {
		resultText += numbers[i] + ' ';
	}
	if (numbers.includes(guess)) {
		resultText += '\nRight! You win 20 gold!';
		gold += 20;
	} else {
		resultText += '\nWrong! You lose 10 health!';
		health -= 10;
		if (health <= 0) {
			lose();
			return;
		}
	}
	goldText.innerText = gold;
	healthText.innerText = health;
	text.innerText = resultText;
}

function pauseTime(amount) {
	return new Promise((resolve) => setTimeout(resolve, amount * 1000));
}
