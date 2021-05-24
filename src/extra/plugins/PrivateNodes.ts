import { IAttachmentEnhancerPlugin } from 'lib/extend/scope/IAttachmentEnhancerPlugin';
import { ResolutionState } from 'lib/finder/resolution/ResolutionState';
import { INode } from 'lib/node/INode';
import { INodeEnhancement } from 'lib/extend/scope/INodeEnhancement';
import { PluginScope } from 'lib/extend/scope/PluginScope';
import { IPostEnhancerPlugin } from 'lib/extend/scope/IPostEnhancerPlugin';
import { Resolution } from 'lib/finder/resolution/Resolution';

export class PrivateNodes implements IAttachmentEnhancerPlugin, IPostEnhancerPlugin {
    hasScope(scope: PluginScope): boolean {
        return [PluginScope.AttachmentEnhancerPlugin, PluginScope.PostEnhancerPlugin].includes(scope);
    }

    enhance(node: INode, currentEnhancement: INodeEnhancement): INodeEnhancement {
        if (currentEnhancement.resolve().getState() !== ResolutionState.Found) {
            return currentEnhancement;
        }

        const lastSegment = node.getUrl().getLastSegment();

        if (lastSegment === null) {
            return currentEnhancement;
        }

        if (lastSegment.getSegment().slice(0, 2) === '__') {
            return currentEnhancement.withResolution(new Resolution(ResolutionState.NotFound));
        }

        if (lastSegment.getSegment().slice(0, 1) === '_') {
            return currentEnhancement.withResolution(new Resolution(ResolutionState.NotFoundSelf));
        }

        return currentEnhancement;
    }

    getId(): string {
        return 'private-nodes';
    }
}
