import { IDynamicPost } from 'lib/extend/scope/IDynamicPost';
import { IPost } from 'lib/node/IPost';
import { IDynamicAttachment } from 'lib/extend/scope/IDynamicAttachment';
import { PluginScope } from 'lib/extend/scope/PluginScope';
import { IPlugin } from 'lib/extend/IPlugin';

export interface IDynamicNodePlugin extends IPlugin {
    getChildrenOfPost(post: IPost): IDynamicPost[];

    getAttachmentsOfPost(post: IPost): IDynamicAttachment[];
}

export const isDynamicNodePlugin = (object: IPlugin): object is IDynamicNodePlugin => {
    return (
        object.hasScope(PluginScope.DynamicNodePlugin) &&
        'getChildrenOfPost' in object &&
        'getAttachmentsOfPost' in object
    );
};
