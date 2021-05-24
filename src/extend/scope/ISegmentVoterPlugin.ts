import { PluginScope } from './PluginScope';
import { IPlugin } from '../IPlugin';
import { ISegment } from '../../url/ISegment';

export interface ISegmentVoterPlugin extends IPlugin {
    vote(segment: ISegment): ISegment;
}

export const isSegmentVoterPlugin = (object: IPlugin): object is ISegmentVoterPlugin => {
    return object.hasScope(PluginScope.SegmentVoterPlugin) && 'vote' in object;
};
