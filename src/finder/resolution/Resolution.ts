import { ResolutionState } from 'lib/finder/resolution/ResolutionState';
import { IResolution } from 'lib/finder/resolution/IResolution';

export class Resolution implements IResolution {
    constructor(private readonly resolution: ResolutionState) {}

    getState(): ResolutionState {
        return this.resolution;
    }
}
