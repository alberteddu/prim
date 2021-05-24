import { PluginScope } from 'lib/extend/scope/PluginScope';

export interface IPlugin {
    getId(): string;

    hasScope(scope: PluginScope): boolean;
}
