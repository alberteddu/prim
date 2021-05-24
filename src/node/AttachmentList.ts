import { IAttachmentList } from 'lib/node/IAttachmentList';
import { NodeList } from 'lib/node/NodeList';
import { IAttachment } from 'lib/node/IAttachment';

export class AttachmentList extends NodeList<IAttachmentList, IAttachment> implements IAttachmentList {}
