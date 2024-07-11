import removeAccents from 'remove-accents';

import { ContextService } from '@core/context.service';
import { Metadata } from '@grpc/grpc-js';

export abstract class DataSourceGRPC {
  constructor(protected readonly contextService: ContextService) {}

  protected createMetadata(): Metadata {
    const metadata = new Metadata();

    const transaction = this.contextService.getTransaction();
    const useragent = this.contextService.getUseragent();
    const user = this.contextService.getUser();

    metadata.add('transaction', transaction);
    metadata.add('useragent', JSON.stringify(useragent));

    if (user) {
      metadata.add('user', removeAccents(JSON.stringify(user)));
    }

    return metadata;
  }
}
