import { ISegmentVoterPlugin, PluginScope } from '../scope';
import { ISegment, Segment } from '../../url';

export class NumberedSegmentVoter implements ISegmentVoterPlugin {
  getId(): string {
    return 'numbered-segment-voter';
  }

  hasScope(scope: PluginScope): boolean {
    return scope === PluginScope.SegmentVoterPlugin;
  }

  vote(segment: ISegment): ISegment {
    const segmentString = segment.getSegment();
    const matches = segmentString.match(/^\d+\.\s+(.*)$/);

    if (!matches) {
      return segment;
    }

    return new Segment(matches[1]);
  }
}
