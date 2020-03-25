import { IResolution } from '../../finder';
import { INode } from '../../node';

export interface INodeEnhancement {
  resolve(): IResolution;
  withResolution(resolution: IResolution): INodeEnhancement;
}
