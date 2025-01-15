module.exports = {
    range: function() {
        if (!arguments.length) { return []; }
        var min, max, step;
        if (arguments.length == 1) {
            min = 0;
            max = arguments[0];
            step = 1;
        } else {
            min = arguments[0];
            max = arguments[1];
            step = arguments[2] || 1;
        }
        var a = [];
        for (var i = min; i < max; i += step) { a.push(i); }
        return a;
    }
};
