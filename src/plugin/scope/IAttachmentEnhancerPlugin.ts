import { IPlugin } from '../IPlugin';
import { PluginScope } from './PluginScope';
import { IAttachment } from '../../node';
import { IAttachmentEnhancement } from './IAttachmentEnhancement';

export interface IAttachmentEnhancerPlugin extends IPlugin {
  enhance(
    attachment: IAttachment,
    currentEnhancement: IAttachmentEnhancement,
  ): IAttachmentEnhancement;
}

export const isAttachmentEnhancerPlugin = (
  object: IPlugin,
): object is IAttachmentEnhancerPlugin => {
  return object.hasScope(PluginScope.AttachmentEnhancerPlugin) && 'enhance' in object;
};
