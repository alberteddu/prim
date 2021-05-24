import { IPlugin } from 'lib/extend/IPlugin';
import { IPost } from 'lib/node/IPost';
import { IPostEnhancement } from 'lib/extend/scope/IPostEnhancement';
import { PluginScope } from 'lib/extend/scope/PluginScope';

export interface IPostEnhancerPlugin extends IPlugin {
    enhance(attachment: IPost, currentEnhancement: IPostEnhancement): IPostEnhancement;
}

export const isPostEnhancerPlugin = (object: IPlugin): object is IPostEnhancerPlugin => {
    return object.hasScope(PluginScope.PostEnhancerPlugin) && 'enhance' in object;
};
