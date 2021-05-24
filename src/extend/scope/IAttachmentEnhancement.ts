import { INodeEnhancement } from './INodeEnhancement';
import { IResolution } from '../../finder/resolution/IResolution';

export interface IAttachmentEnhancement extends INodeEnhancement {
    withResolution(resolution: IResolution): IAttachmentEnhancement;
}
