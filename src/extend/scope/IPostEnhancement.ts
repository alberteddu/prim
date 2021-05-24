import { INodeEnhancement } from 'lib/extend/scope/INodeEnhancement';
import { IResolution } from 'lib/finder/resolution/IResolution';

export interface IPostEnhancement extends INodeEnhancement {
    withResolution(resolution: IResolution): IPostEnhancement;
}
