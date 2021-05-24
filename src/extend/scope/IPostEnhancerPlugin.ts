import { IPostEnhancement } from './IPostEnhancement';
import { PluginScope } from './PluginScope';
import { IPlugin } from '../IPlugin';
import { IPost } from '../../node/IPost';

export interface IPostEnhancerPlugin extends IPlugin {
    enhance(attachment: IPost, currentEnhancement: IPostEnhancement): IPostEnhancement;
}

export const isPostEnhancerPlugin = (object: IPlugin): object is IPostEnhancerPlugin => {
    return object.hasScope(PluginScope.PostEnhancerPlugin) && 'enhance' in object;
};
