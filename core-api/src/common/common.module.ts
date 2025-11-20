import { Global, Module } from '@nestjs/common';
import { ContextModule } from './context';
import { EventBoxModule } from './event-box';

@Global()
@Module({
  imports: [ContextModule, EventBoxModule],
  exports: [ContextModule, EventBoxModule],
})
export class CommonModule {}
