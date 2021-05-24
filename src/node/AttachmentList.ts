import { IAttachmentList } from './IAttachmentList';
import { IAttachment } from './IAttachment';
import { NodeList } from './NodeList';

export class AttachmentList extends NodeList<IAttachmentList, IAttachment> implements IAttachmentList {}
