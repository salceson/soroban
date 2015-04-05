/**
 * Soroban script
 * (C) 2015 Michał Ciołczyk
 */

COLUMNS = 15;
EARTH_ELEMENTS_COUNT = 4;
ELEMENT_WIDTH = 55;
ELEMENT_HEIGHT = 32;
SEPERATOR_HEIGHT = 150;
SEPERATOR_WIDTH = 15;
ELEMENT_SRC = "img/element4.png";
DELTA = 2 * ELEMENT_HEIGHT;
BAR_SRC = "img/bar.png";
BAR_HEIGHT = "100%";
BAR_WIDTH = 8;

var soroban = {
    value: 0,
    els: [],

    init: function () {
        console.log("Soroban init");

        this.els = [];
        //noinspection JSJQueryEfficiency,JSUnresolvedFunction
        $("#soroban").html("");

        for (var i = 0; i < COLUMNS; i++) {
            this.els.push([]);
            for (var j = 0; j < EARTH_ELEMENTS_COUNT; j++) {
                //noinspection JSUnresolvedFunction,JSDuplicatedDeclaration
                var el = $("<img />");
                el.attr("src", ELEMENT_SRC);
                el.css("left", (i * (SEPERATOR_WIDTH + ELEMENT_WIDTH) + 10) + "px");
                el.css("top", (ELEMENT_HEIGHT * (j + 1) + SEPERATOR_HEIGHT) + "px");
                el.css("position", "absolute");
                el.attr("data-i", i);
                el.attr("data-j", j);
                el.attr("data-moved", 0);
                el.addClass("element");
                //noinspection JSUnresolvedFunction
                $(el).click(function () {
                    //noinspection JSUnresolvedFunction
                    var i = parseInt($(this).attr("data-i"));
                    //noinspection JSUnresolvedFunction
                    var j = parseInt($(this).attr("data-j"));
                    soroban.clickEarthElement(i, j);
                });
                this.els[i].push(el);
            }

            //noinspection JSUnresolvedFunction,JSDuplicatedDeclaration
            var el = $("<img />");
            el.attr("src", ELEMENT_SRC);
            el.css("left", (i * (SEPERATOR_WIDTH + ELEMENT_WIDTH) + 10) + "px");
            el.css("top", 0 + "px");
            el.css("position", "absolute");
            el.attr("data-i", i);
            el.attr("data-j", EARTH_ELEMENTS_COUNT);
            el.attr("data-moved", 0);
            el.addClass("element");
            el.click(function () {
                //noinspection JSUnresolvedFunction
                var i = parseInt($(this).attr("data-i"));
                soroban.clickHeavenElement(i);
            });
            this.els[i].push(el);
        }

        for (var c in this.els) {
            //noinspection JSUnfilteredForInLoop
            var column = this.els[c];
            for (var e in column) {
                //noinspection JSUnfilteredForInLoop
                var element = column[e];
                //noinspection JSUnresolvedFunction
                $("#soroban").append(element);
            }
        }

        //noinspection JSDuplicatedDeclaration
        for(var i = 0; i < COLUMNS; i++) {
            //noinspection JSUnresolvedFunction,JSDuplicatedDeclaration
            var bar = $("<img />");
            bar.attr("src", BAR_SRC);
            bar.css("width", BAR_WIDTH);
            bar.css("height", BAR_HEIGHT);
            bar.css("position", "absolute");
            bar.css("top", 0);
            bar.css("z-index", -1);
            bar.css("left", (i * (SEPERATOR_WIDTH + ELEMENT_WIDTH) + (ELEMENT_WIDTH - BAR_WIDTH) / 2 + 10) + "px");
            //noinspection JSUnresolvedFunction
            $("#soroban").append(bar);
        }
        //noinspection JSDuplicatedDeclaration,JSUnresolvedFunction
        var bar = $("<img />");
        bar.attr("src", BAR_SRC);
        bar.css("width", BAR_HEIGHT);
        bar.css("height", BAR_WIDTH);
        bar.css("position", "absolute");
        bar.css("top", (DELTA + ELEMENT_HEIGHT + 5) + "px");
        bar.css("z-index", -1);
        bar.css("left", 0);
        //noinspection JSUnresolvedFunction,JSJQueryEfficiency
        $("#soroban").append(bar);
    },

    clickEarthElement: function (column, row) {
        var moved = parseInt(this.els[column][row].attr("data-moved")) == 1;
        if (moved) {
            //noinspection JSDuplicatedDeclaration
            for (var j = EARTH_ELEMENTS_COUNT - 1; j >= row; j--) {
                if (parseInt(this.els[column][j].attr("data-moved")) == 0) {
                    continue;
                }
                //noinspection JSDuplicatedDeclaration
                var top = parseInt(this.els[column][j].css("top"));
                top += DELTA;
                this.els[column][j].css("top", top);
                this.els[column][j].attr("data-moved", moved ? 0 : 1);
            }
        } else {
            //noinspection JSDuplicatedDeclaration
            for (var j = 0; j <= row; j++) {
                if (parseInt(this.els[column][j].attr("data-moved")) == 1) {
                    continue;
                }
                //noinspection JSDuplicatedDeclaration
                var top = parseInt(this.els[column][j].css("top"));
                top -= DELTA;
                this.els[column][j].css("top", top);
                this.els[column][j].attr("data-moved", moved ? 0 : 1);
            }
        }
    },

    clickHeavenElement: function (column) {
        var top = parseInt(this.els[column][EARTH_ELEMENTS_COUNT].css("top"));
        var moved = parseInt(this.els[column][EARTH_ELEMENTS_COUNT].attr("data-moved")) == 1;
        var coeff = moved ? -1 : 1;
        top += coeff * DELTA;
        this.els[column][EARTH_ELEMENTS_COUNT].css("top", top);
        this.els[column][EARTH_ELEMENTS_COUNT].attr("data-moved", moved ? 0 : 1);
    }
};

//noinspection JSUnresolvedFunction
$(document).ready(function () {
    soroban.init();
});