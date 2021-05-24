import { INodeEnhancement } from 'lib/extend/scope/INodeEnhancement';
import { IResolution } from 'lib/finder/resolution/IResolution';

export abstract class NodeEnhancement implements INodeEnhancement {
    constructor(protected readonly resolution: IResolution) {}

    resolve(): IResolution {
        return this.resolution;
    }

    withResolution(resolution: IResolution): INodeEnhancement {
        return new (this.constructor as { new (resolution: IResolution): INodeEnhancement })(resolution);
    }
}
