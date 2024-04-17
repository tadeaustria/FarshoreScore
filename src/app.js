// use plugins and options as needed, for options, detail see
// http://i18next.com/docs/

let app;

i18next
    .use(i18nextBrowserLanguageDetector)
    .use(i18nextHttpBackend)
    .init({
        fallbackLng: 'en',
        // debug: true,
        saveMissing: false,
        backend: {
            loadPath: 'i18n/{{lng}}/{{ns}}.json',
            addPath: 'i18n/{{lng}}/{{ns}}.missing.json'
        }
        // 
        // useLocalStore: false
    }, function (err, t) {
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $, {
            useOptionsAttr: true
        });

        app = new Application();

        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $("*").localize();
        $("#nav-p1-p").append("<span id=\"nav-p1-points\" class=\"badge text-bg-warning\">0</span>");
        $("#nav-p2-p").append("<span id=\"nav-p2-points\" class=\"badge text-bg-warning\">0</span>");
        $("#nav-p3-p").append("<span id=\"nav-p3-points\" class=\"badge text-bg-warning\">0</span>");
        $("#nav-p4-p").append("<span id=\"nav-p4-points\" class=\"badge text-bg-warning\">0</span>");
    });


class Application {

    constructor() {
        this.updateData();

        $('#nav-p1-tab').on('click', (e) => { this.activePlayer = this.players[0]; this.updatePlayerOutput(); });
        $('#nav-p2-tab').on('click', (e) => { this.activePlayer = this.players[1]; this.updatePlayerOutput(); });
        $('#nav-p3-tab').on('click', (e) => { this.activePlayer = this.players[2]; this.updatePlayerOutput(); });
        $('#nav-p4-tab').on('click', (e) => { this.activePlayer = this.players[3]; this.updatePlayerOutput(); });
        $("#alert-cardlimit").hide();

        // returning something in this function, will result in a message box
        // if site is left
        window.onbeforeunload = function () { return 'Are you sure?' };

        Handlebars.registerHelper('isProsperity', function (type) {
            return type == TYPES.prosperity;
        });
    }

    updateExpansions() {
        if (this.hasData())
            this.show_modal(i18next.t("text.data_loss_header"), i18next.t("text.expansion_content"), this.updateData, this.reset_expansions_ui);
        else
            this.updateData();
    }

    updateData() {
        // this.bellfaire = $('#flexSwitchCheckBellfaire').is(':checked');

        this.cards = [...Object.values(basecards)].filter((card) => card.getAvailability(this));

        this.reset();
        this.buildCards();
        this.setCardsDisable();
        $("#main-left").localize();

        this.buildLeftResources();
        $("#leftOverArea").localize();
    }

    updatePlayerOutput() {
        this.activePlayer.updateLeftOvers();
        $("#value_points").val(this.activePlayer.points);
        $("#value_points_badge").text(this.activePlayer.points);
        this.setCardsDisable();
    }

    // Sets switches in UI to stored values
    reset_expansions_ui() {
        // $('#flexSwitchCheckBellfaire').prop('checked', this.bellfaire);
    }

    btn_reset() {
        this.show_modal(i18next.t("text.data_loss_header"), i18next.t("text.reset_content"), this.reset);
    }

    reset() {
        this.players = [new Player("p1", this), new Player("p2", this), new Player("p3", this), new Player("p4", this)];
        this.activePlayer = this.players[0];
        // TODO Enable me after fix
        // this.players.forEach((player) => player.showPlayer());
        this.activeAward = null;
        $("#nav-p1-tab").tab('show');
        this.updatePlayerOutput();
        this.enableAll();
    }

    enableAll() {
        $("li.list-group-item").removeClass("disabled");
        $("[id^=journey_]").removeClass("text-bg-secondary disabled").addClass("text-bg-warning");
    }

    findCardByName(cardName) {
        for (let card of this.cards) {
            if (card.name == cardName) return card;
        }
        return null;
    }

    addToActivePlayer(cardName) {
        let card = this.findCardByName(cardName);
        if (card.getOccupiedSpaces(this.activePlayer, true) + this.activePlayer.getOccupiedSpaces() > this.activePlayer.getMaxSpace()) {
            $("#alert-cardlimit").fadeTo(3000, 500).slideUp(500, function () {
                $("#alert-cardlimit").slideUp(500);
            });
        } else {
            this.vibrate(50);

            this.activePlayer.addTown(card);
            this.setCardDisable(card);
        }
    }

    removeFromActivePlayer(cardIndex) {
        let card = this.activePlayer.removeTown(cardIndex);
        this.setCardDisable(card);
    }

    addEventToActivePlayer(eventName) {
        if (eventName in basicEvents) {
            this.activePlayer.addBasicEvent(basicEvents[eventName]);
        } else {
            this.activePlayer.addSpecialEvent(specialEvents[eventName]);
        }
        this.vibrate(50);
        $("#event_" + eventName).addClass("disabled");
        if (this.players.reduce((prev, player) => prev + player.specialEvents.length, 0) >= 4) {
            $("#specialevent-header").prop("disabled", true);
        }
    }

    removeEventFromActivePlayer(eventIndex) {
        let eventName = this.activePlayer.removeBasicEvent(eventIndex);
        $("#event_" + eventName).removeClass("disabled");
    }

    removeSpEventFromActivePlayer(eventIndex) {
        let eventName = this.activePlayer.removeSpecialEvent(eventIndex);
        $("#event_" + eventName).removeClass("disabled");
    }

    addMapToActivePlayer(mapName) {
        let value = maps[mapName];
        this.activePlayer.maps.push(value);
        this.vibrate(50);
        this.activePlayer.showPlayer();
        this.setCardsDisable();
    }

    removeMapFromActivePlayer(mapIndex) {
        let value = this.activePlayer.removeMap(mapIndex);
        this.setCardsDisable();
    }

    setLanguage(lang) {
        i18next.changeLanguage(lang, (err, t) => {
            // start localizing, details:
            // https://github.com/i18next/jquery-i18next#usage-of-selector-function
            this.buildCards();
            this.setCardsDisable();
            if (this.activeAward)
                $("#award_" + this.activeAward.name).addClass("highlight");
            for (let player of this.players) {
                player.resortTown();
            }
            this.activePlayer.showPlayer();
            $("*").localize();
            $("#nav-p1-p").append(`<span id='nav-p1-points' class='badge text-bg-warning'>${this.players[0].getTotalPoints()}</span>`);
            $("#nav-p2-p").append(`<span id='nav-p2-points' class='badge text-bg-warning'>${this.players[1].getTotalPoints()}</span>`);
            $("#nav-p3-p").append(`<span id='nav-p3-points' class='badge text-bg-warning'>${this.players[2].getTotalPoints()}</span>`);
            $("#nav-p4-p").append(`<span id='nav-p4-points' class='badge text-bg-warning'>${this.players[3].getTotalPoints()}</span>`);
        });
    }

    setResource(name) {
        $("#value_badge_" + name).html(this.activePlayer.leftResources[name] = parseInt($("#value_" + name).val()));
        this.activePlayer.showPlayer();
    }

    buildCards() {
        let template = Handlebars.compile($("#cards-template").html());
        let suits = {};
        Object.values(TYPES).forEach(element => {
            suits[element] = this.cards.filter((card) => { return card.type == element });
        });
        for (const [, suit] of Object.entries(suits)) {
            suit.sort((a, b) => { return getCardName(a).localeCompare(getCardName(b)); });
        }

        let html = template({
            suits: suits,
            maps: maps
        }, {
            allowProtoMethodsByDefault: true
        });
        $('#cards').html(html);
    }

    getCardUsageCount(searchedCard) {
        return this.players.reduce((prev1, player) => player.town.reduce((prev2, card) => card == searchedCard ? ++prev2 : prev2, prev1), 0);
    }

    isCardAvailable(card) {
        if (card.rarity == RARITY.unique && this.activePlayer.town.includes(card)
            || this.getCardUsageCount(card) >= card.maximum) {
            return false;
        }
        return true;
    }

    setCardsDisable() {
        this.cards.forEach(this.setCardDisable, this);

        let maps_map = maps;
        Object.values(maps_map).forEach((value) => Object.assign(value, {count: 0}));
        this.players.forEach((player) => {
            player.maps.forEach((map) => maps_map[map.name].count++);
        });
        Object.values(maps_map).forEach((map) => map.count >= map.maximum ? $("#map_" + map.name).addClass("disabled") : $("#map_" + map.name).removeClass("disabled"));
    }
    
    setCardDisable(card) {
        let cardItem = $("#card_" + card.name);
        if (!this.isCardAvailable(card)) {
            cardItem.addClass("disabled");
        } else {
            cardItem.removeClass("disabled");
        }
    }

    playerRefresh() {
        this.activePlayer.updateTotalPoints();
    }

    setActivePlayerPoints() {
        this.activePlayer.points = parseInt($("#value_points").val());
        $("#value_points_badge").text(this.activePlayer.points);
        this.activePlayer.showPlayer();
    }

    setActivePlayerShipSteps() {
        this.activePlayer.ship_steps = parseInt($("#value_ship_steps").val());
        $("#value_ship_steps_badge").text(this.activePlayer.getShipPoints());
        this.activePlayer.showPlayer();
    }

    buildLeftResources() {
        let template = Handlebars.compile($("#resource-template").html());

        // hack to only show treasure ressource
        let x = {'treasure': RESOURCES.treasure};

        let html = template({
            resources: x
        });
        $('#leftResources').html(html);
    }

    vibrate(intesity) {
        if ('vibrate' in window.navigator)
            window.navigator.vibrate(intesity);
    }

    show_modal(header, text, fun_accept, fun_abort = null) {
        this.callback_accept = fun_accept;
        this.callback_abort = fun_abort;
        $("#modal_title").text(header);
        $("#modal_text").text(text);
        $("#modal_window").modal("show");
    }

    modal_accept() {
        $("#modal_window").modal("hide");
        this.callback_accept();
    }

    modal_abort() {
        $("#modal_window").modal("hide");
        if (this.callback_abort)
            this.callback_abort();
    }

    hasData() {
        return this.players.reduce((prev, player) => prev || player.hasData(), false);
    }
}