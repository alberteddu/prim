import { IUrl } from 'lib/url/IUrl';
import { IPath } from 'lib/filesystem/IPath';
import { NodeType } from 'lib/node/NodeType';
import { IPropertyHolder } from 'lib/property/IPropertyHolder';

export interface INode extends IPropertyHolder {
    getUrl(): IUrl;

    getPath(): IPath;

    is(node: INode): boolean;

    getNodeType(): NodeType;

    isDynamic(): boolean;
}
