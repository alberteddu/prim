import { IPlugin } from 'lib/extend/IPlugin';

export interface PluginsObject {
    [name: string]: IPlugin;
}
