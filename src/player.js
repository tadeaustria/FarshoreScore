class Player {
    //base game
    town = [];
    maps = [];
    points = 0;
    leftResources = {
    }
    ship_steps = 0;

    divName;
    #app;

    constructor(divName, app) {
        this.divName = divName;
        this.#app = app;

        Object.values(RESOURCES).forEach((val) => this.leftResources[val] = 0);
    }

    getMaxSpace() {
        return 15;
    }

    getOccupiedSpaces() {
        return this.town.reduce((prev, card) => prev + card.getOccupiedSpaces(this, false), 0);
    }

    getTownOverview() {
        let dict = {};
        this.town.forEach((card) => {
            if (card.type in dict)
                dict[card.type]++;
            else
                dict[card.type] = 1;
        });
        return dict;
    }

    getOtherPlayers(){    
        return this.#app.players.filter((p) => p != this);
    }

    compareByTypeAndLexicographically(cardA, cardB) {
        if (cardA.type == cardB.type) {
            return getCardName(cardA).localeCompare(getCardName(cardB));
        }
        let typeOrder = Object.keys(TYPES);
        return typeOrder.findIndex((elem) => elem == cardA.type) - typeOrder.findIndex((elem) => elem == cardB.type);
    }

    addTown(card) {
        this.town.push(card);
        this.resortTown();
        this.showPlayer();
    }

    resortTown() {
        this.town.sort(this.compareByTypeAndLexicographically);
    }

    removeTown(cardIndex) {
        let card = this.town.splice(cardIndex, 1)[0];
        this.showPlayer();
        return card;
    }

    removeMap(mapIndex) {
        let value = this.maps.splice(mapIndex, 1)[0];
        this.showPlayer();
        return value;
    }

    findCountFct(findfunction) {
        return this.town.reduce((prev, card) => { if (findfunction(card)) ++prev; return prev; }, 0);
    }

    findCountType(type) {
        return this.findCountFct((card) => { return card.type == type; });
    }

    findCountKind(kind) {
        return this.findCountFct((card) => { return card.kind == kind; });
    }

    findCountRarityKind(rarity, kind) {
        return this.findCountFct((card) => { return card.kind == kind && card.rarity == rarity; });
    }

    findCountRarity(rarity) {
        return this.findCountFct((card) => { return card.rarity == rarity; });
    }

    findCountCard(cardToFind) {
        return this.findCountFct((card) => { return card.name == cardToFind.name; });
    }

    hasData() {
        return this.town.length > 0 ||
            this.points > 0 ||
            this.ship_steps > 0 ||
            Object.values(this.leftResources).reduce((prev, val) => prev || val > 0, false);
    }

    getShipPoints(){
        return SHIP[this.ship_steps];
    }

    getTotalPoints() {
        //Sum up all points
        return this.town.reduce((prev, card) => prev + card.points + card.getAdditionalPoints(this),
                    this.maps.reduce((prev, map) => prev + map.getAdditionalPoints(this),
                        this.getShipPoints() + this.points + 2 * this.leftResources[RESOURCES.treasure]));
    }

    areLeftoversRequired() {
        //If Architect is in town or scale as adornment or Architect is copied through photographer
        return true;
    }

    updateLeftOvers() {
        Object.keys(this.leftResources).forEach((key) => {
            $("#value_" + key).val(this.leftResources[key]);
            $("#value_badge_" + key).html(this.leftResources[key]);
        });
        this.showLeftOvers();
    }

    showLeftOvers() {
        $("#leftOverArea").show();
        for(let res in Object.values(RESOURCES)){
            $("#area_" + res).hide();    
        }
        $("#area_treasure").show();
    }

    showPlayer() {
        let template = Handlebars.compile($("#player-template").html());

        let displayedTown = this.town.map((card) => Object.assign({ addPoints: card.getAdditionalPoints(this) }, card));
        let displayedMaps = this.maps.map((map) => Object.assign({ points: map.getAdditionalPoints(this) }, map));

        let html = template({
            cards: displayedTown,
            cardCount: this.getOccupiedSpaces(),
            cardMax: this.getMaxSpace(),
            cardCountPerc: 100 * this.getOccupiedSpaces() / this.getMaxSpace(),
            maps: displayedMaps,
            nav: this.divName
        });

        this.showLeftOvers();

        $("#nav-" + this.divName).html(html);
        this.updateTotalPoints();
        $(".tab-content").localize();
    }

    updateTotalPoints() {
        $("#nav-" + this.divName + "-points").html(this.getTotalPoints()); //set sum in tab
    }
}