import fs from 'fs';

/**
 * Load Map from data file
 * @returns {Promise<Map>} Map (containing key/value pairs), loaded from data file. Empty Map, if loading from data file failed.
 */
export async function loadMap() {
    try {
        const str = await fs.promises.readFile('app-data.json', 'utf8');
        const map = convertJsonToMap(str);
        return map;
    }
    catch {
        return new Map();
    }
}

/**
 * Save Map to data file
 * @returns {Promise<boolean>} True, if Map (containing key/value pairs) was successfully saved to data file. False, if not.
 */
export async function saveMap(map) {
    try {
        const str = convertMapToJson(map);
        await fs.promises.writeFile('app-data.json', str, 'utf8',);
        return true;
    }
    catch {
        return false;
    }
}

function convertMapToJson(map) {
    const obj = [...map];
    const str = JSON.stringify(obj);
    return str;
}

function convertJsonToMap(str) {
    const obj = JSON.parse(str);
    const map = new Map(obj);
    return map;
}