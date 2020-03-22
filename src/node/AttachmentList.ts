import { NodeList } from './NodeList';
import { IAttachmentList } from './IAttachmentList';
import { IAttachment } from './IAttachment';

export class AttachmentList extends NodeList<IAttachmentList, IAttachment>
  implements IAttachmentList {}
