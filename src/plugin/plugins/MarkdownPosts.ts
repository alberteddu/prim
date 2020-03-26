import unified, { Plugin } from 'unified';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import frontmatter from 'remark-frontmatter';
import filter from 'unist-util-filter';
import toml from '@iarna/toml';
import yaml from 'yaml';
import { Node } from 'unist';
import { IPostEnhancerPlugin, PluginScope, IPostEnhancement } from '../scope';
import { IPost } from '../../node';
import { ResolutionState } from '../../finder';
import { PropertyIsEqual, Property, ValueMatchesRegex } from '../../property';

export enum Formats {
  TOML = 'toml',
  YAML = 'yaml',
}

export class MarkdownPosts implements IPostEnhancerPlugin {
  constructor(private readonly supportedFormats: Formats[] = [Formats.TOML, Formats.YAML]) {}

  getId(): string {
    return 'markdown-posts';
  }

  hasScope(scope: PluginScope): boolean {
    return scope === PluginScope.PostEnhancerPlugin;
  }

  enhance(post: IPost, currentEnhancement: IPostEnhancement): IPostEnhancement {
    if (currentEnhancement.resolve().getState() !== ResolutionState.Found) {
      return currentEnhancement;
    }

    if (post.isDynamic() && !post.propertyExists('_markdown-source')) {
      return currentEnhancement;
    }

    const attachments = post
      .getAttachments()
      .where(new PropertyIsEqual(new Property('extension', 'md')))
      .where(new ValueMatchesRegex('filename', /(index|content|post|doc|document)/));

    const firstDocument = attachments.first();

    if (firstDocument === null) {
      return currentEnhancement;
    }

    const markdownSourceProperty = firstDocument.getProperty('contents', '');
    const markdownSource = markdownSourceProperty.getValue();

    if (markdownSource === '') {
      return currentEnhancement;
    }

    const getFrontmatterFilter = (include: boolean) => {
      return () => {
        return (tree: Node) =>
          filter(tree, (node: any): node is Node => {
            if (include) {
              return node.type === 'root' || this.supportedFormats.includes(node.type);
            }

            return !this.supportedFormats.includes(node.type);
          });
      };
    };

    const getDocument = () =>
      unified()
        .use(parse)
        .use(stringify)
        .use(frontmatter, ['yaml', 'toml']);
    const frontmatterResult = getDocument()
      .use(getFrontmatterFilter(true) as Plugin)
      .processSync(markdownSource);
    const textResult = getDocument()
      .use(getFrontmatterFilter(false) as Plugin)
      .processSync(markdownSource);

    const textSource = textResult.contents.toString().trim();
    const frontmatterSource = frontmatterResult.contents.toString().trim();
    let data: { [key: string]: any } | undefined;

    post.setProperty(new Property('markdown', textSource));

    if (frontmatterSource.slice(0, 3) === '+++') {
      data = toml.parse(frontmatterSource.slice(3, -3));
    }

    if (frontmatterSource.slice(0, 3) === '-') {
      data = yaml.parse(frontmatterSource.slice(3, -3));
    }

    if (typeof data === 'undefined') {
      return currentEnhancement;
    }

    const realData = data;

    Object.keys(realData).forEach((key: string) => {
      const value = realData[key];

      post.setProperty(new Property(key, value));
    });

    return currentEnhancement;
  }
}
