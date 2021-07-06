import fs from 'fs';

/**
 * Get name from package.json
 * @returns {Promise<string>} Value of 'name' entry, if entry exists. Empty string, if not.
 */
export async function getAppName() {
    const obj = await readPackageJson();
    return obj?.name ?? '';
}

/**
 * Get version from package.json
 * @returns {Promise<string>} Value of 'version' entry, if entry exists. Empty string, if not.
 */
export async function getAppVersion() {
    const obj = await readPackageJson();
    return obj?.version ?? '';
}

async function readPackageJson() {
    try {
        const str = await fs.promises.readFile('package.json', 'utf8');
        const obj = JSON.parse(str);
        return obj;
    }
    catch {
        // Do nothing -> Return undefined
    }
}