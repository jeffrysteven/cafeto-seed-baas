// @flow
import { join } from 'path';

export class BaasConfig {

    PROJECT_ROOT = join(__dirname, '../..');

    /**
     * The base folder for built files.
     * @type {string}
     */
    DIST_DIR = 'dist';

    /**
     * The base folder for built files.
     * @type {string}
     */
    PACKAGE_DIR = 'package';

    /**
     * The directory of the applications tools
     * @type {string}
     */
    TOOLS_DIR = 'tools';
}
