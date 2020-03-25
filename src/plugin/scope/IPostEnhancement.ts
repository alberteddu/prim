import { INodeEnhancement } from './INodeEnhancement';
import { IResolution } from '../../finder';

export interface IPostEnhancement extends INodeEnhancement {
  withResolution(resolution: IResolution): IPostEnhancement;
}
