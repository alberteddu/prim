import { IAttachmentEnhancerPlugin } from '../../extend/scope/IAttachmentEnhancerPlugin';
import { ResolutionState } from '../../finder/resolution/ResolutionState';
import { INode } from '../../node/INode';
import { INodeEnhancement } from '../../extend/scope/INodeEnhancement';
import { PluginScope } from '../../extend/scope/PluginScope';
import { IPostEnhancerPlugin } from '../../extend/scope/IPostEnhancerPlugin';
import { Resolution } from '../../finder/resolution/Resolution';

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
