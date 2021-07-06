import fs from 'fs';

/**
 * Get host from config file
 * @returns {Promise<string>} Value of 'host' entry, if entry exists. Default value ('localhost'), if not.
 */
export async function getHost() {
    const obj = await readConfigFile();
    return obj?.host ?? 'localhost';
}

/**
 * Get port from config file
 * @returns {Promise<number>} Value of 'port' entry, if entry exists. Default value (3000), if not.
 */
export async function getPort() {
    const obj = await readConfigFile();
    return obj?.port ?? 3000;
}

async function readConfigFile() {
    try {
        const str = await fs.promises.readFile('app-config.json', 'utf8');
        const obj = JSON.parse(str);
        return obj;
    }
    catch {
        // Do nothing -> Return undefined
    }
}