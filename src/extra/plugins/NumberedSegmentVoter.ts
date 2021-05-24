import { ISegmentVoterPlugin } from 'lib/extend/scope/ISegmentVoterPlugin';
import { PluginScope } from 'lib/extend/scope/PluginScope';
import { ISegment } from 'lib/url/ISegment';
import { Segment } from 'lib/url/Segment';

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
