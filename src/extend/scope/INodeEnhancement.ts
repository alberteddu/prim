import { IResolution } from 'lib/finder/resolution/IResolution';

export interface INodeEnhancement {
    resolve(): IResolution;

    withResolution(resolution: IResolution): INodeEnhancement;
}
