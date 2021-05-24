import { IResolution } from '../../finder/resolution/IResolution';

export interface INodeEnhancement {
    resolve(): IResolution;

    withResolution(resolution: IResolution): INodeEnhancement;
}
