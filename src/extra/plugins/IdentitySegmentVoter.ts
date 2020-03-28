import { ISegmentVoterPlugin, PluginScope } from '../../extend/scope';
import { ISegment } from '../../url';

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
