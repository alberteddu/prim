import { INodeEnhancement } from './INodeEnhancement';
import { IResolution } from '../../finder/resolution/IResolution';

export abstract class NodeEnhancement implements INodeEnhancement {
    constructor(protected readonly resolution: IResolution) {}

    resolve(): IResolution {
        return this.resolution;
    }

    withResolution(resolution: IResolution): INodeEnhancement {
        return new (this.constructor as { new (resolution: IResolution): INodeEnhancement })(resolution);
    }
}
