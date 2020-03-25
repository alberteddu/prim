import { IPlugin } from './IPlugin';
import { PluginScope } from './scope/PluginScope';

export interface IPluginHolder {
  addPlugin(plugin: IPlugin): void;
  removePlugin(id: string): void;
  getPlugin(id: string): IPlugin | null;
  hasPlugin(id: string): boolean;
  getPlugins<T extends IPlugin>(filter: (plugin: IPlugin) => plugin is T): T[];
}
