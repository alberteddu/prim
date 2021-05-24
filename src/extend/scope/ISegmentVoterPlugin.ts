import { IPlugin } from 'lib/extend/IPlugin';
import { PluginScope } from 'lib/extend/scope/PluginScope';
import { ISegment } from 'lib/url/ISegment';

export interface ISegmentVoterPlugin extends IPlugin {
    vote(segment: ISegment): ISegment;
}

export const isSegmentVoterPlugin = (object: IPlugin): object is ISegmentVoterPlugin => {
    return object.hasScope(PluginScope.SegmentVoterPlugin) && 'vote' in object;
};
