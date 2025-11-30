import { Global, Module } from '@nestjs/common';
import { ContextModule } from './context';
import { EventBoxModule } from './event-box';
import { GuardsModule } from './guards';
import { JwtHelperModule } from './jwt';

@Global()
@Module({
  imports: [ContextModule, EventBoxModule, GuardsModule, JwtHelperModule],
  exports: [ContextModule, EventBoxModule, GuardsModule, JwtHelperModule],
})
export class CommonModule {}
