import { IPlugin } from '../IPlugin';
import { PluginScope } from './PluginScope';
import { IPost } from '../../node';
import { IPostEnhancement } from './IPostEnhancement';

export interface IPostEnhancerPlugin extends IPlugin {
  enhance(attachment: IPost, currentEnhancement: IPostEnhancement): IPostEnhancement;
}

export const isPostEnhancerPlugin = (object: IPlugin): object is IPostEnhancerPlugin => {
  return object.hasScope(PluginScope.PostEnhancerPlugin) && 'enhance' in object;
};
