
// automatically change text color based on background color

import {theme} from "./theme";

// **
//  * @param {string} backgroundColor - a hex color code
//  * @returns {string} - a hex color code
//  */
export default function textAutoColor(backgroundColor) {

    var r = parseInt(backgroundColor.substr(1,2),16);
	var g = parseInt(backgroundColor.substr(2,2),16);
	var b = parseInt(backgroundColor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	// return (yiq >= 128) ? theme["dark"].text : theme['light'].text;
    return (yiq >= 128) ? 'black' : 'white';
}