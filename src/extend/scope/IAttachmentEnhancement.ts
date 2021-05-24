import { INodeEnhancement } from 'lib/extend/scope/INodeEnhancement';
import { IResolution } from 'lib/finder/resolution/IResolution';

export interface IAttachmentEnhancement extends INodeEnhancement {
    withResolution(resolution: IResolution): IAttachmentEnhancement;
}
