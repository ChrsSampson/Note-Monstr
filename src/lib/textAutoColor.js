
// automatically change text color based on background color

import {theme} from "./theme";

// **
//  * @param {string} backgroundColor - a hex color code
//  * @returns {string} - a hex color code
//  */
export default function textAutoColor(backgroundColor) {
    // convert hex to rgb
    const rgb = backgroundColor.match(/\w\w/g).map((hex) => parseInt(hex, 16));
    // calculate luminance
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

    // return black or white depending on luminance
    return luminance > 127 ? theme.light.text : theme.dark.text;
}