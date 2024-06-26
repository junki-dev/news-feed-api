import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, PipelineStage, Types, UpdateQuery } from 'mongoose';

import { AbstractDocument } from './abstract.schema';

import { PopulateOptions, SortOptions } from '@common/database/interfaces/populate.interface';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON() as unknown as TDocument;
  }

  async saveAll(documents: Array<Omit<Partial<TDocument>, '_id'>>) {
    const createDocuments = await Promise.all(
      documents.map((document) => new this.model({ ...document, _id: new Types.ObjectId() })),
    );

    await this.model.insertMany(createDocuments);
  }

  async findOne(filterQuery: FilterQuery<TDocument>, populate?: PopulateOptions) {
    return this.model.findOne(filterQuery, {}, { lean: true }).populate(populate); // { lean: true } : mongoDB document 가 아닌 javascript object 를 반환함
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
    if (!document) {
      this.logger.warn(`Document not found with filterQuery`, filterQuery);
      throw new NotFoundException(`Document not found.`);
    }

    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    sortQuery?: SortOptions,
    populate?: PopulateOptions,
  ): Promise<TDocument[]> {
    return this.model.find(filterQuery, {}, { lean: true }).sort(sortQuery).populate(populate);
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async aggregate(pipeline?: PipelineStage[]): Promise<TDocument[]> {
    return this.model.aggregate(pipeline);
  }

  async estimatedDocumentCount(): Promise<number> {
    return this.model.estimatedDocumentCount();
  }
}
