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

// Currently: 20 different Weapons
// ----------
const weapons = [           // Index #
                //          ------------

    {                           // 0
        name: 'Stick',
        power: 5,
        ability: 'Basic weapon with no special abilities', // No special ability
        strength: 'None', // No special strength
        desc: 'A simple stick, better than nothing.',
        rarity: 'Common',
    },
    {                           // 1
        name: 'Club',
        power: 11,
        ability: 'Can stun enemies with a strong blow', 
        // Stuns the enemy for one turn
        strength: 'Blunt force effective against skeletal foes', 
        // Effective against enemies weak to blunt force
        desc: 'A sturdy club, capable of delivering a stunning blow.',
        rarity: 'Common',
    },
    {                           // 2
        name: 'Spear',
        power: 15,
        ability: 'Can pierce through enemy armor', 
        // Ignores a portion of the enemy's armor
        strength: 'Sharp point ideal for aquatic enemies', 
        // Effective against enemies weak to piercing
        desc: 'A sharp spear, perfect for piercing through defenses.',
        rarity: 'Uncommon',
    },
    {                           // 3
        name: 'Bow',
        power: 20,
        ability: 'Can attack from a distance, avoiding retaliation', 
        // Can attack from a distance, avoiding retaliation
        strength: 'Arrows can be coated with substances for added effects', 
        // Versatile with different arrow types
        desc: 'A long-range bow, allowing for attacks from a safe distance.',
        rarity: 'Uncommon',
    },
    {                           // 4
        name: 'Mallet',
        power: 23,
        ability: 'High chance of a critical hit with a heavy swing', 
        // High chance of a critical hit
        strength: 'Effective in shattering armor and shields', 
        // Can break enemy defenses
        desc: 'A heavy mallet, capable of smashing through armor.',
        rarity: 'Uncommon',
    },
    {                           // 5
        name: 'Magic Wand',
        power: 25,
        ability: 'Can cast various spells for different effects', 
        // Casts a random spell for additional effects
        strength: 'Enhances magical abilities, especially effective against ethereal beings', 
        // Boosts magical power
        desc: 'A mystical wand, channeling magical energies.',
        rarity: 'Rare',
    },
    {                           // 6
        name: 'Dagger',
        power: 30,
        ability: 'Quick and agile, allowing for rapid strikes', 
        // Attacks twice in one turn
        strength: 'Can be coated with poison for additional damage over time', 
        // Poisons the enemy
        desc: 'A swift dagger, perfect for quick and deadly attacks.',
        rarity: 'Rare',
    },
    {                           // 7
        name: 'Axe',
        power: 35,
        ability: 'Delivers powerful chops with each swing', 
        // High damage but lower accuracy
        strength: 'Especially effective in wooded environments', 
        // Cuts through wooden defenses
        desc: 'A mighty axe, capable of felling foes and trees alike.',
        rarity: 'Rare',
    },
    {                           // 8
        name: 'Crossbow',
        power: 40,
        ability: 'Can snipe enemies from afar with precision', 
        // High accuracy and critical hit chance
        strength: 'Bolts can penetrate multiple targets', 
        // Effective against enemies in a line
        desc: 'A deadly crossbow, combining range and power.',
        rarity: 'Very Rare',
    },
    {                           // 9
        name: 'Flail',
        power: 45,
        ability: 'Can swing in wide arcs to hit multiple enemies', 
        // Useful for crowd control
        strength: 'Chains emit a chilling aura, effective against fiery foes', 
        // Can freeze enemies
        desc: 'A fearsome flail, its spiked ball wreaking havoc on foes.',
        rarity: 'Very Rare',
    },
    {                           // 10
        name: 'Claw Hammer',
        power: 50,
        ability: 'Can pry open locked doors or chests', 
        // Useful for accessing new areas or loot
        strength: 'Generates a thunderous impact, effective against metallic foes', 
        // Stuns foes
        desc: 'A versatile claw hammer, feared for its destructive force.',
        rarity: 'Very Rare',
    },
    {                           // 11
        name: 'Warhammer',
        power: 55,
        ability: 'Can stagger enemies, reducing their speed', 
        // Reduces enemy's speed for the next turn
        strength: 'Inflicts massive damage, especially effective in open battlefields', 
        // Calls down a meteor
        desc: 'A colossal warhammer, capable of crushing foes with ease.',
        rarity: 'Extremely Rare',
    },
    {                           // 12
        name: 'Battle Axe',
        power: 60,
        ability: 'Can cleave through multiple foes in one swing', 
        // Hits multiple enemies in one swing
        strength: 'Whirlwind attack can hit all surrounding enemies, effective in close quarters', 
        // Hits all enemies surrounding the player
        desc: 'A fearsome battle axe, designed for sweeping through enemies.',
        rarity: 'Extremely Rare',
    },
    {                           // 13
        name: 'Fire Staff',
        power: 70,
        ability: 'Can cast fire spells to burn enemies', 
        // Sets the enemy on fire, dealing damage over time
        strength: 'Unleashes a firestorm, especially devastating against icy foes', 
        // Creates a storm of fire
        desc: 'A staff imbued with the essence of fire, scorching all that it touches.',
        rarity: 'Legendary',
    },
    {                           // 14
        name: 'Thunderous Blade',
        power: 80,
        ability: 'Can call down lightning strikes', 
        // Useful for stunning and damaging foes
        strength: 'Crackles with unbridled lightning, effective against water-based foes', 
        // Effective against water-based foes
        desc: 'A sword crackling with electrical energy, capable of stunning foes with its strikes.',
        rarity: 'Legendary',
    },
    {                           // 15
        name: 'Glacial Glass Blade',
        power: 85,
        ability: 'Can freeze enemies solid', 
        // Useful for immobilizing foes
        strength: 'Emits an intense cold, effective against anything--especially heat-based foes', 
        // Effective against heat-based foes
        desc: 'A dagger as cold as the deepest winter, capable of thoroughly freezing anything.',
        rarity: 'Mythical',
    },
    {                           // 16
        name: 'Ethereal Edge',
        power: 99,
        ability: 'Can cut through both physical and ethereal planes', 
        // Cuts through ethereal and physical planes
        strength: 'Ethereal strikes bypass normal defenses, effective against ghostly foes', 
        // Effective against ethereal beings
        desc: 'A blade that seems to exist between realms, cutting through the very fabric of reality.',
        rarity: 'Mythical',
    },
    {                           // 17
        name: 'Reaper\'s Scythe',
        power: 111,
        ability: 'Can harvest the souls of the fallen', 
        // Steals health from the enemy with each hit
        strength: 'Soul reap ability has a chance to instantly kill, effective against living foes', 
        // Can instantly kill the enemy
        desc: 'A dark scythe that saps the life force of its victims, rumored to be crafted by Death itself.',
        rarity: 'Mythical',
    },
    {                           // 18
        name: 'Dawnbringer',
        power: 132,
        ability: 'Illuminates the darkest shadows, revealing hidden foes', 
        // Emits a beam of light
        strength: 'Radiance ability heals the wielder and damages all enemies with holy light, effective against undead foes', 
        // Heals the player and damages all enemies
        desc: 'A radiant weapon that banishes darkness, its light is said to be the bane of all evil.',
        rarity: 'Mythical',
    },
    {                           // 19
        name: 'Excalibur',
        power: 150,
        ability: 'Wielded by the rightful ruler, grants unmatched power', 
        // Wielded by the rightful ruler of the realm
        strength: 'Legendary power unmatched by any other weapon, effective against all foes', 
        // Its power is unmatched
        desc: 'A legendary sword of immense power, said to be wieldable only by the rightful ruler of the realm.',
        rarity: 'Legendary',
    },
];


// Currently: 25 different Monsters
// ----------
const monsters = [           // Index #
                //          ------------
    {                           // 0
        name: 'Slime',
        level: 2,
        health: 11,
        armor: 2,
        weakness: 'Cold',
        monsterClass: 'Plasma',
    },
    {                           // 1
        name: 'Imp',
        level: 3,
        health: 18,
        armor: 3,
        weakness: 'Sunlight',
        monsterClass: 'Demonic',
    },
    {                           // 2
        name: 'Goblin',
        level: 4,
        health: 30,
        armor: 5,
        weakness: 'Words',
        monsterClass: 'Spawn',
    },
    {                           // 3
        name: 'Hobgoblin',
        level: 5,
        health: 35,
        armor: 7,
        weakness: 'Words',
        monsterClass: 'Spawn',
    },
    {                           // 4
        name: 'Orc',
        level: 7,
        health: 45,
        armor: 10,
        weakness: 'Sunlight',
        monsterClass: 'Spawn',
    },
    {                           // 5
        name: 'Banshee',
        level: 8,
        health: 60,
        armor: 0,
        weakness: 'Pocket Watches',
        monsterClass: 'Undead',
    },
    {                           // 6
        name: 'Orc Captain',
        level: 9,
        health: 65,
        armor: 12,
        weakness: 'Sunlight',
        monsterClass: 'Spawn',
    },
    {                           // 7
        name: 'Skeletwin',
        level: 10,
        health: 72,
        armor: 8,
        weakness: 'Words',
        monsterClass: 'Undead',
    },
    {                           // 8
        name: 'Troll',
        level: 11,
        health: 80,
        armor: 15,
        weakness: 'Riddles',
        monsterClass: 'Giant',
    },
    {                           // 9
        name: 'Demon Fairy',
        level: 12,
        health: 85,
        armor: 5,
        weakness: 'Sunlight',
        monsterClass: 'Demonic',
    },
    {                           // 10
        name: 'She Troll',
        level: 13,
        health: 88,
        armor: 18,
        weakness: 'Greed',
        monsterClass: 'Giant',
    },
    {                           // 11
        name: 'Swamp Nymph',
        level: 14,
        health: 95,
        armor: 6,
        weakness: 'Wind-up Phonographs',
        monsterClass: 'Elemental',
    },
    {                           // 12
        name: 'Ghost',
        level: 15,
        health: 101,
        armor: 0,
        weakness: 'White Noise',
        monsterClass: 'Undead',
    },
    {                           // 13
        name: 'Cursed Mermaid',
        level: 17,
        health: 111,
        armor: 10,
        weakness: 'Certain Colors',
        colorWeakness: 'Violet Red',
        monsterClass: 'Aquatic',
    },
    {                           // 14
        name: 'Vampire',
        level: 18,
        health: 115,
        armor: 12,
        weakness: 'Sunlight',
        monsterClass: 'Undead',
    },
    {                           // 15
        name: 'Unibeast',
        level: 19,
        health: 128,
        armor: 20,
        weakness: 'Magic',
        monsterClass: 'Mythical',
    },
    {                           // 16
        name: 'Werewolf',
        level: 20,
        health: 135,
        armor: 16,
        weakness: 'Silver',
        monsterClass: 'Beast',
    },
    {                           // 17
        name: 'Demon',
        level: 27,
        health: 150,
        armor: 25,
        weakness: 'Holy',
        monsterClass: 'Demonic',
    },
    {                           // 18
        name: 'Ice Giant',
        level: 33,
        health: 170,
        armor: 30,
        weakness: 'Fire',
        monsterClass: 'Giant',
    },
    {                           // 19
        name: 'Fire Elemental',
        level: 36,
        health: 199,
        armor: 20,
        weakness: 'Water',
        monsterClass: 'Elemental',
    },
    {                           // 20
        name: 'Necromancer',
        level: 40,
        health: 211,
        armor: 15,
        weakness: 'Sunlight',
        monsterClass: 'Spawn',
    },
    {                           // 21
        name: 'Wraith Knight',
        level: 50,
        health: 235,
        armor: 35,
        weakness: 'Water',
        monsterClass: 'Undead',
    },
    {                           // 22
        name: 'Hydra',
        level: 55,
        health: 260,
        armor: 40,
        weakness: 'Fire',
        monsterClass: 'Mythical',
    },
    {                           // 23
        name: 'Phoenix Dragon',
        level: 77,
        health: 277,
        armor: 50,
        weakness: 'Cold',
        monsterClass: 'Mythical',
    },
    {                           // 24
        name: 'Night Dragon',
        level: 80,
        health: 300,
        armor: 60,
        weakness: 'Sunlight',
        monsterClass: 'Dragon',
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
