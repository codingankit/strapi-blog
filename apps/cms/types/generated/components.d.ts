import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsFeaturedCategories extends Struct.ComponentSchema {
  collectionName: 'components_sections_featured_categories';
  info: {
    displayName: 'FeaturedCategories';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    ctaBtn: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLatestPosts extends Struct.ComponentSchema {
  collectionName: 'components_sections_latest_posts';
  info: {
    displayName: 'LatestPosts';
  };
  attributes: {
    postCount: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    displayName: 'NavLink';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'sections.featured-categories': SectionsFeaturedCategories;
      'sections.hero': SectionsHero;
      'sections.latest-posts': SectionsLatestPosts;
      'shared.button': SharedButton;
      'shared.nav-link': SharedNavLink;
    }
  }
}
