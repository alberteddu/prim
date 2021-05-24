import { IDynamicPost } from './IDynamicPost';
import { IDynamicAttachment } from './IDynamicAttachment';
import { PluginScope } from './PluginScope';
import { IPost } from '../../node/IPost';
import { IPlugin } from '../IPlugin';

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
