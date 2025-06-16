/** @odoo-module **/

// Function to choose a random element from an array
export function choose(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return undefined;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
