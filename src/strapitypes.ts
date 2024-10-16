export namespace Strapi {
  export interface Component {
    id: number;
    documentId: string;
    locale: null;

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }

  export interface Image extends Component {
    ext: string; // .jpeg
    mime: string; // image/jpeg
    name: string; // agent mémétique tueur.jpeg
    url: string; // /uploads/agent_memetique_tueur_3be2ded3d7.jpeg
    hash: string; // agent_memetique_tueur_3be2ded3d7

    height: number;
    width: number;
    size: number;
  }

  export interface Pagination {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  }

  export interface Plural<T> {
    data: T[];
    meta: {
      pagination: Pagination;
    };
  }
}
