import { ResolutionState } from './ResolutionState';
import { IResolution } from './IResolution';

export class Resolution implements IResolution {
  constructor(private readonly resolution: ResolutionState) {}

  getState(): ResolutionState {
    return this.resolution;
  }
}
