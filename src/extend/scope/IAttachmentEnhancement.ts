import { INodeEnhancement } from './INodeEnhancement';
import { IResolution } from '../../finder';

export interface IAttachmentEnhancement extends INodeEnhancement {
  withResolution(resolution: IResolution): IAttachmentEnhancement;
}
