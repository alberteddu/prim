import { IAttachment } from 'lib/node/IAttachment';
import { IAttachmentEnhancement } from 'lib/extend/scope/IAttachmentEnhancement';
import { PluginScope } from 'lib/extend/scope/PluginScope';
import { IPlugin } from 'lib/extend/IPlugin';

export interface IAttachmentEnhancerPlugin extends IPlugin {
    enhance(attachment: IAttachment, currentEnhancement: IAttachmentEnhancement): IAttachmentEnhancement;
}

export const isAttachmentEnhancerPlugin = (object: IPlugin): object is IAttachmentEnhancerPlugin => {
    return object.hasScope(PluginScope.AttachmentEnhancerPlugin) && 'enhance' in object;
};
