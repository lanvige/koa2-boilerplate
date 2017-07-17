// We are exporting the methods so they can be tested
// with mock dependencies.

export default class PageService {
  constructor({ Page }) {
    // Sequelize Attributes
    this.pageFields = ['id', 'content', 'slideId', 'sequence'];

    this.Page = Page;
  }

  async getSlidePages(slideId) {
    const pages = await this.Page.findAll({
      attributes: this.pageFields,
      where: {
        slideId,
      },
      order: [['sequence', 'DESC']],
    });

    if (pages && pages.length > 0) {
      return pages.map(item => item.toJSON());
    }

    return null;
  }
}
