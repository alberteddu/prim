import { IAttachmentEnhancement } from './IAttachmentEnhancement';
import { PluginScope } from './PluginScope';
import { IAttachment } from '../../node/IAttachment';
import { IPlugin } from '../IPlugin';

export interface IAttachmentEnhancerPlugin extends IPlugin {
    enhance(attachment: IAttachment, currentEnhancement: IAttachmentEnhancement): IAttachmentEnhancement;
}

export const isAttachmentEnhancerPlugin = (object: IPlugin): object is IAttachmentEnhancerPlugin => {
    return object.hasScope(PluginScope.AttachmentEnhancerPlugin) && 'enhance' in object;
};
