import { NodeType } from './NodeType';
import { IUrl } from '../url/IUrl';
import { IPath } from '../filesystem/IPath';
import { IPropertyHolder } from '../property/IPropertyHolder';

export interface INode extends IPropertyHolder {
    getUrl(): IUrl;

    getPath(): IPath;

    is(node: INode): boolean;

    getNodeType(): NodeType;

    isDynamic(): boolean;
}
