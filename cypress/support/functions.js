
class functions {

    capitalize(input) {
        var words = input.split(' ');
        var CapitalizedWords = [];
        words.forEach(element => {
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
        });
        return CapitalizedWords.join(' ');
    }

    getURLTextforHeaderLoc(heading) {
        var space = heading.trim();
        return space.replace(/\s/g, '-').toLowerCase();
    }

    getURLTextforLoc3(urltxt) {
        var urltxt = upper.slice(12)
        if (urltxt.includes('(')) {
            var rest = urltxt.replace("(", "").replace(")", "")
            var space = rest.trim();
            return space.replace(/\s/g, '-').toLowerCase();
        }
        else {
            var space = urltxt.trim();
            return space.replace(/\s/g, '-').toLowerCase();
        }
    }
    getTextForButtonHeading(input) {
        var asserttxt = input.slice(9);
        return asserttxt.charAt(0).toUpperCase() + asserttxt.substring(1);
    }
    getURLTextforButtons(upper) {
        var input = upper.slice(12)
        if (input.includes('(')) {
            var rest = input.replace("(", "").replace(")", "")
            var space = rest.trim();
            return space.replace(/\s/g, '-').toLowerCase();
        }
        else {
            var space = input.trim();
            return space.replace(/\s/g, '-').toLowerCase();
        }

    }

    getLength() {
        cy.get('.listings-0-2-5').then(($length) => {
            var len = $length.length;
            return len;

        })
    }

}

export default functions