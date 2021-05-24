import { INodeEnhancement } from './INodeEnhancement';
import { IResolution } from '../../finder/resolution/IResolution';

export interface IPostEnhancement extends INodeEnhancement {
    withResolution(resolution: IResolution): IPostEnhancement;
}
