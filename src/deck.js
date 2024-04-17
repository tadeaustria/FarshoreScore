const TYPES = {
    traveler: 'traveler',
    production: 'production',
    destination: 'destination',
    governance: 'governance',
    prosperity: 'prosperity'
}
Object.freeze(TYPES);

const KINDS = {
    building: 'building',
    critter: 'critter'
}
Object.freeze(KINDS);

const RARITY = {
    common: 0,
    unique: 1,
    // legendary: 2
}
Object.freeze(RARITY)

function points_zero(player) { return 0; }
function points_one(player) { return 1; }
function points_two(player) { return 2; }
function points_three(player) { return 3; }
function points_four(player) { return 4; }
function points_five(player) { return 5; }
function points_six(player) { return 6; }
function points_seven(player) { return 7; }
function points_nine(player) { return 9; }

function space_zero(player, to_be_added) { return 0; }
function space_one(player, to_be_added) { return 1; }

function available_always(app) { return true; }
function available_bellfaire(app) { return app.bellfaire; }
function available_pearlbrook(app) { return app.pearlbrook; }
function available_npearlbrook(app) { return !app.pearlbrook; }
function available_spirecrest(app) { return app.spirecrest; }
function available_newleaf(app) { return app.newleaf; }
function available_mistwood(app) { return app.mistwood; }

const RESOURCES = {
    driftwood: 'driftwood',
    seaweed: 'seaweed',
    seastone: 'seastone',
    mushroom: 'mushroom',
    card: 'card',
    treasure: 'treasure'
}
Object.freeze(RESOURCES)

const SHIP = [];
for(let i = 0; i <= 40; i+=2){
    SHIP.push(i);
}
for(let i = 41; i <= 60; i++){
    SHIP.push(i);
}
Object.freeze(SHIP)

// Number of chest gotten from ship points
const SHIP_CHESTS = {
    "0": 0,
    "4": 1,
    "8": 2,
    "12": 3,
    "18": 4,
    "24": 5,
    "30": 6,
    "36": 7,
    "41": 8,
    "45": 9,
    "49": 10,
    "53": 11,
    "57": 12
}
Object.freeze(SHIP_CHESTS)

let basecards = {
    'ropebridge': {
        name: 'ropebridge',
        type: TYPES.traveler,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'postoffice': {
        name: 'postoffice',
        type: TYPES.destination,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'inn': {
        name: 'inn',
        type: TYPES.destination,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'abbey': {
        name: 'abbey',
        type: TYPES.destination,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'tumbler': {
        name: 'tumbler',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'tangleraft': {
        name: 'tangleraft',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'scriptorium': {
        name: 'scriptorium',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'grove': {
        name: 'grove',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 1,
        maximum: 5,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'beachsledge': {
        name: 'beachsledge',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.building,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'shipwreck': {
        name: 'shipwreck',
        type: TYPES.traveler,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: -1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_zero,
        getAvailability: available_always
    },
    'hideout': {
        name: 'hideout',
        type: TYPES.traveler,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 0,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'galley': {
        name: 'galley',
        type: TYPES.traveler,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 3,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'port': {
        name: 'port',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'market': {
        name: 'market',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'lighthouse': {
        name: 'lighthouse',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 1,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'customsoffice': {
        name: 'customsoffice',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 3,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'crowsnest': {
        name: 'crowsnest',
        type: TYPES.destination,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 2,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'warehouse': {
        name: 'warehouse',
        type: TYPES.production,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 2,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'sloop': {
        name: 'sloop',
        type: TYPES.production,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 1,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'windmill': {
        name: 'windmill',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 2,
        maximum: 2,
        getAdditionalPoints: (player) => 2 * player.findCountType(TYPES.production),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'manor': {
        name: 'manor',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 4,
        maximum: 2,
        getAdditionalPoints: (player) => 2 * player.findCountRarityKind(RARITY.common, KINDS.critter),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'harbor': {
        name: 'harbor',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 5,
        maximum: 2,
        getAdditionalPoints: (player) => 3 * player.findCountType(TYPES.prosperity),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'gardens': {
        name: 'gardens',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 4,
        maximum: 2,
        getAdditionalPoints: (player) => 2 * player.findCountRarityKind(RARITY.unique, KINDS.critter),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'galleon': {
        name: 'galleon',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.building,
        points: 5,
        maximum: 2,
        getAdditionalPoints: (player) => player.leftResources[RESOURCES.treasure],
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },

    'postalpigeon': {
        name: 'postalpigeon',
        type: TYPES.traveler,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 0,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'steward': {
        name: 'steward',
        type: TYPES.destination,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'seachip': {
        name: 'seachip',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'scribe': {
        name: 'scribe',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'scavenger': {
        name: 'scavenger',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'sailmaker': {
        name: 'sailmaker',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'merchant': {
        name: 'merchant',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 2,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'diver': {
        name: 'diver',
        type: TYPES.production,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'pirate': {
        name: 'pirate',
        type: TYPES.traveler,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 0,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'stowaway': {
        name: 'stowaway',
        type: TYPES.traveler,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 1,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'castaway': {
        name: 'castaway',
        type: TYPES.traveler,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: -1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_zero,
        getAvailability: available_always
    },
    'customsofficer': {
        name: 'customsofficer',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'navigator': {
        name: 'navigator',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 2,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'lighthousekeeper': {
        name: 'lighthousekeeper',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'herbalist': {
        name: 'herbalist',
        type: TYPES.governance,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 1,
        maximum: 3,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'cooper': {
        name: 'cooper',
        type: TYPES.destination,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 2,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'illuminator': {
        name: 'illuminator',
        type: TYPES.destination,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 2,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'cartographer': {
        name: 'cartographer',
        type: TYPES.destination,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 2,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'treasurehunter': {
        name: 'treasurehunter',
        type: TYPES.production,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 1,
        maximum: 2,
        getAdditionalPoints: points_zero,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'sculptor': {
        name: 'sculptor',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 4,
        maximum: 2,
        getAdditionalPoints: (player) => 2 * player.findCountRarityKind(RARITY.unique, KINDS.building),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'pilgrim': {
        name: 'pilgrim',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 2,
        maximum: 2,
        getAdditionalPoints: (player) => 2 * player.maps.length,
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'guildmaster': {
        name: 'guildmaster',
        type: TYPES.prosperity,
        rarity: RARITY.unique,
        kind: KINDS.critter,
        points: 2,
        maximum: 2,
        getAdditionalPoints: (player) => player.findCountType(TYPES.destination) + player.findCountType(TYPES.governance) + player.findCountType(TYPES.traveler),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'governor': {
        name: 'governor',
        type: TYPES.prosperity,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 4,
        maximum: 2,
        getAdditionalPoints: (player) => 2 * player.findCountRarityKind(RARITY.common, KINDS.building),
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    },
    'admiral': {
        name: 'admiral',
        type: TYPES.prosperity,
        rarity: RARITY.common,
        kind: KINDS.critter,
        points: 4,
        maximum: 2,
        getAdditionalPoints: (player) => {
            let previous = 0;
            Object.keys(SHIP_CHESTS).forEach((key) => {
                let val_int = parseInt(key);
                if (val_int <= player.getShipPoints()) {
                    previous = val_int;
                }
            });
            return SHIP_CHESTS[previous];
        },
        getOccupiedSpaces: space_one,
        getAvailability: available_always
    }
}

let maps = {
    "two": {
        name: "two",
        getAdditionalPoints: (player) => 2 * player.maps.length,
        maximum: 6
    },
    "one": {
        name: "one",
        getAdditionalPoints: (player) => player.maps.length,
        maximum: 12
    },
    "zero": {
        name: "zero",
        getAdditionalPoints: points_zero,
        maximum: 6
    }
}

function getCardName(card) {
    return i18next.t("card." + card.name);
}