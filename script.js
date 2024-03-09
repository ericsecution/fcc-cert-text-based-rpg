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
        connectedLocations: [1, 2],
        'button text': ['Go to store', 'Go to cave'],
        'button functions': [goStore, goCave],
        text: 'You are in the town square. You see a sign that says "Store".',
    },
    // 2 = locations[1] >> called by the goStore() function
    {
        name: 'store',
        connectedLocations: [0],
        'button text': ['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store.',
    },
    // 3 = locations[2] >> called by the goCave() function
    {
        name: 'cave',
        connectedLocations: [0, 3],
        'button text': ['Fight slime', 'Fight fanged beast', 'Go to town square'],
        'button functions': [fightSlime, fightBeast, goTown],
        text: 'You enter the cave. You see some monsters.',
    },
    // 4 = locations[3] >> called by the goFight() function
    {
        name: 'fight',
        connectedLocations: [2, 4],
        'button text': ['Attack', 'Dodge', 'Run'],
        'button functions': [attack, dodge, goTown],
        text: 'You are fighting a monster.',
    },
    // 5 = locations[4] >> called by the defeatMonster() function
    {
        name: 'kill monster',
        connectedLocations: [3, 5],
        'button text': ['Go to town square', 'Continue fighting'],
        'button functions': [goTown, goFight],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    },
    // 6 = locations[5] >> called by the lose() function
    {
        name: 'lose',
        connectedLocations: [4],
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You die. &#x2620;',
    },
    // 7 = locations[6] >> called by the winGame() function
    {
        name: 'win',
        connectedLocations: [4],
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You defeat the dragon! YOU WIN THE GAME! &#x1F389;',
    },
    // 8 = locations[7] >> called by the easterEgg() function
    {
        name: 'easter egg',
        connectedLocations: [0],
        'button text': ['2', '8', 'Go to town square?'],
        'button functions': [pickTwo, pickEight, goTown],
        text: 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!',
    },
];


//
//
//


document.getElementById('xpText').style.display = 'none';
document.getElementById('healthText').style.display = 'none';
document.getElementById('goldText').style.display = 'none';

function startGame() {
    // Display the opening sequence text
    text.innerHTML = "Imagine... a cinematic scene of a kingdom under siege by dragons and their minions. The hero, a young and frightened villager, is seen fleeing to the outskirts of town for his life.";
    text.classList.add('opening-sequence');

    // Hide the usual game buttons
    button1.style.display = 'none';
    button2.style.display = 'none';
    button3.style.display = 'none';

    // Create a continue button
    const continueButton = document.createElement('button');
    continueButton.id = 'continueButton';
    continueButton.innerText = 'Continue';
    continueButton.onclick = firstEncounter;
    document.getElementById('controls').appendChild(continueButton);

    // Create a skip intro button
    const skipIntroButton = document.createElement('button');
    skipIntroButton.id = 'skipIntroButton';
    skipIntroButton.innerText = 'Skip Intro';
    skipIntroButton.onclick = skipIntro;
    document.getElementById('controls').appendChild(skipIntroButton);
}

function skipIntro() {
    text.classList.remove('opening-sequence');
    document.getElementById('xpText').style.display = 'block';
    document.getElementById('healthText').style.display = 'block';
    document.getElementById('goldText').style.display = 'block';
    goTown(); // Leads the Player to just after the Opening Sequence
}

function firstEncounter() {
    text.innerHTML = "While hiding in the woods, the hero is ambushed by an orc or a pair of imps. With no weapons at hand, the hero picks up a thick stick to defend himself.";
    button1.innerText = 'Attack';
    button1.style.display = 'block';
    button1.onclick = awakening;
    button2.style.display = 'none';
    button3.style.display = 'none';
}




function awakening() {
    text.innerHTML = "As the battle ensues, the hero feels a strange connection to the orb. The first attack against the imp is a surprising blow across the creature's chest, fueled by the orb's power. The hero gains confidence and a sense of purpose.";
    text.classList.add('blink-red');
    setTimeout(() => {
        text.classList.remove('blink-red');
    }, 1000); // Adjust the duration as needed
    button1.style.display = 'none'; // Hide the Attack button after the hit
}


function encounterWithSecondImp() {
    text.innerHTML = "The second imp, undeterred, lunges at the hero. In a reflexive motion, the hero dodges, drops the orb momentarily, which the imp sees. The second imp begins to shriek loudly, calling for reinforcements. The hero attacks again, this time with an even more powerful strike, partially severing the imp's head. The first imp, now recovering, attempts to pickup where the second imp ended off, and struggles to wheeze and catch its breath in order to call for reinforcements. The hero decides enough is enough and this time severs the first imp's head completely off its shoulders, splattering it into a nearby tree.";
    continueButton.onclick = choice;
    // Hide the continue button and show only the dodge button for this part
    continueButton.style.display = 'none';
    button2.style.display = 'block'; // Cheeck if 'button2' is the 'Dodge' button
}

function choice() {
    text.innerHTML = "The hero hears voices from the town, calling out for anyone in need of help. Faced with a decision, the hero can choose to either respond to the calls and head back towards the town or continue fleeing into the safety of the forest.";
    continueButton.style.display = 'none'; // Hide the continue button

    // Create buttons for the choices
    const choice1Button = document.createElement('button');
    choice1Button.innerText = 'Respond to the calls';
    choice1Button.onclick = function() {
        decision(true); // true indicates the hero chose to respond
    };
    document.getElementById('controls').appendChild(choice1Button);

    const choice2Button = document.createElement('button');
    choice2Button.innerText = 'Continue fleeing';
    choice2Button.onclick = function() {
        decision(false); // false indicates the hero chose to flee
    };
    document.getElementById('controls').appendChild(choice2Button);
}

function decision(responded) {
    if (responded) {
        text.innerHTML = "The hero encounters a group of townsfolk who assist in the fight against the imps.";
        // Additional logic for this path
    } else {
        text.innerHTML = "The hero stumbles upon a hidden path leading deeper into the forest, away from the immediate danger.";
        // Additional logic for this path
    }

    // Remove the choice buttons
    choice1Button.remove();
    choice2Button.remove();

    // Show the continue button for the next part of the story
    continueButton.style.display = 'block';
    continueButton.onclick = journeyBegins;
}

function journeyBegins() {
    text.innerHTML = "Regardless of the choice, the hero's journey is set into motion. With the orb in possession, the hero embarks on a quest to uncover its secrets, face formidable foes, and ultimately, confront the dragons that threaten the land.";
    continueButton.remove(); // Remove the continue button as the opening sequence is over

    // Show the usual game buttons and reset the game state as needed
    button1.style.display = 'block';
    button2.style.display = 'block';
    button3.style.display = 'block';
    // Set up the initial game state, such as the hero's location, inventory, etc.
    goTown(); // For example, start the game in the town square
}


//
//
//


function update(locationIndex) {
    const location = locations[locationIndex];
    currentLocationIndex = locationIndex;
    monsterStats.style.display = 'none';

    location.connectedLocations.forEach((locIndex, i) => {
        const loc = locations[locIndex];
        const button = document.querySelector(`#button${i + 1}`);
        if (button) {
            button.innerText = 'Go to ' + toTitleCase(loc.name);
            button.onclick = () => update(locIndex);
        }
    });

    // Hide unused buttons
    for (let i = location.connectedLocations.length; i < 3; i++) {
        const button = document.querySelector(`#button${i + 1}`);
        if (button) {
            button.style.display = 'none';
        }
    }

    text.innerHTML = location.text;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
// "The plural of 'RegEx' is 'regrets'."



function goTown() {
	update(0);
}

function goStore() {
	update(1);
}

function goCave() {
	update(2);
}

async function buyHealth() {
    
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.classList.add('heal');
        await pauseTime(1); // Adjust the time as needed
        text.classList.remove('heal');
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
	update(3);
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
    text.classList.add('attack');
	if (isMonsterHit()) {
		monsterHealth -=
			weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	} else {
		text.innerText += ' You miss.';
	}
    setTimeout(() => {
        text.classList.remove('attack');
    }, 1000);

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
	if (Math.random() <= 0.005 && inventory.length !== 1) {
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
	update(4);
}

function lose() {
	update(5);
}

function winGame() {
	update(6);
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
	update(7);
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

startGame();
