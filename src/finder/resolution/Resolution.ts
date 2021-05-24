import { IResolution } from './IResolution';
import { ResolutionState } from './ResolutionState';

export class Resolution implements IResolution {
    constructor(private readonly resolution: ResolutionState) {}

    getState(): ResolutionState {
        return this.resolution;
    }
}
