import * as storage from './data.js';

/**
 * Get all items
 * @returns {Promise<Array<object>>} Array of item objects or empty array.
 */
export async function getItems() {
    const map = await storage.loadMap();
    return Array.from(map.values());
}

/**
 * Get an item
 * @param {string} id The item ID
 * @returns {Promise<object>} Item object, if object with given ID does exist. Undefined, if not.
 */
export async function getItem(id) {
    const map = await storage.loadMap();
    return map.get(id);
}

/**
 * Add an item
 * @param {object} item The item object
 * @returns {Promise<boolean>} True, if item object has been successfully added. False, if not.
 */
export async function addItem(item) {
    const map = await storage.loadMap();
    map.set(item.id, item);
    const success = await storage.saveMap(map);
    return success;
}

/**
 * Remove an item
 * @param {string} id The item ID
 * @returns {Promise<boolean>} True, if item object with given ID existed and has been removed. False, if not.
 */
export async function removeItem(id) {
    const map = await storage.loadMap();
    return map.delete(id);
}