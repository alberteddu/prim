import { ISegmentVoterPlugin } from 'lib/extend/scope/ISegmentVoterPlugin';
import { PluginScope } from 'lib/extend/scope/PluginScope';
import { ISegment } from 'lib/url/ISegment';

export class IdentitySegmentVoter implements ISegmentVoterPlugin {
    getId(): string {
        return 'identity-segment-voter';
    }

    hasScope(scope: PluginScope): boolean {
        return scope === PluginScope.SegmentVoterPlugin;
    }

    vote(segment: ISegment): ISegment {
        return segment;
    }
}
