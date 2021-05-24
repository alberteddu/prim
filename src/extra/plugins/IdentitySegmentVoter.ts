import { ISegmentVoterPlugin } from '../../extend/scope/ISegmentVoterPlugin';
import { PluginScope } from '../../extend/scope/PluginScope';
import { ISegment } from '../../url/ISegment';

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
