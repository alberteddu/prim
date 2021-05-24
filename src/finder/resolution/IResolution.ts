import { ResolutionState } from 'lib/finder/resolution/ResolutionState';

export interface IResolution {
    getState(): ResolutionState;
}
