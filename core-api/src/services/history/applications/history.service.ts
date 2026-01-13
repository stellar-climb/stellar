import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { HistoryRepository } from '../repository/history.repository';
import { EventHandler, Transactional } from '@libs/decorators';
import { QueueName } from '@common/event-box/queues';
import { RolePolicyUpdatedEvent } from '@services/role-policy/domain/events';
import { isEqual } from 'lodash';
import { History } from '../domain/history.entity';

@Injectable()
export class HistoryService extends DddService {
  constructor(private readonly historyRepository: HistoryRepository) {
    super();
  }

  @Transactional()
  @EventHandler(RolePolicyUpdatedEvent, QueueName.HISTORY, {
    description: '역할 정책이 변경되면 변경 이력을 저장합니다.',
  })
  async handleRolePolicyUpdatedEvent(event: RolePolicyUpdatedEvent) {
    const { rolePolicyId, before, after, admin } = event;

    const changedFields = this.getChangedFields(before, after);

    if (Object.keys(changedFields).length) {
      const history = new History({
        entity: 'rolePolicy',
        entityId: String(rolePolicyId),
        adminId: admin?.id,
        adminName: admin?.name ?? 'system',
        log: changedFields,
      });

      await this.historyRepository.save([history]);
    }
  }

  /**
   * 두 객체를 비교하여 변경된 속성만 반환
   * @param previous 이전 객체
   * @param current 현재 객체
   * @returns 변경된 속성과 이전/현재 값을 포함한 객체
   */
  private getChangedFields(previous: Record<string, any>, current: Record<string, any>) {
    const allKeys = new Set([...Object.keys(previous), ...Object.keys(current)]);

    const changes: Record<string, { previous: any; current: any }> = {};

    allKeys.forEach((key) => {
      const prevValue = previous[key];
      const currValue = current[key];

      const normalizedPrev = this.normalizeValue(prevValue);
      const normalizedCurr = this.normalizeValue(currValue);

      // 값이 다르면 변경된 것으로 간주
      if (!isEqual(normalizedPrev, normalizedCurr)) {
        changes[key] = {
          previous: prevValue,
          current: currValue,
        };
      }
    });

    return changes;
  }

  /**
   * 값을 정규화하여 타입을 통일
   * - 숫자 문자열을 숫자로 변환
   * - 배열의 경우 각 요소를 정규화
   */
  private normalizeValue(value: any): any {
    if (value === null || value === undefined) {
      return value;
    }

    // 배열인 경우 각 요소를 정규화
    if (Array.isArray(value)) {
      return value.map((item) => this.normalizeValue(item));
    }

    // 객체인 경우 재귀적으로 정규화
    if (typeof value === 'object' && value.constructor === Object) {
      const normalized: Record<string, any> = {};
      Object.keys(value).forEach((key) => {
        normalized[key] = this.normalizeValue(value[key]);
      });
      return normalized;
    }

    // 숫자 문자열을 숫자로 변환
    if (typeof value === 'string' && /^-?\d+$/.test(value)) {
      const num = Number(value);
      // NaN이 아니고 원래 문자열과 숫자로 변환한 값이 같으면 숫자로 변환
      if (!isNaN(num) && String(num) === value) {
        return num;
      }
    }

    return value;
  }
}
