import type { FieldValues, UseFormGetValues, UseFormStateReturn } from 'react-hook-form';

/**
 * react-hook-form의 dirtyFields를 기반으로 변경된 필드만 추출하는 헬퍼 함수
 *
 * @param dirtyFields - formState.dirtyFields
 * @param getValues - useForm의 getValues 함수
 * @returns 변경된 필드만 포함된 객체
 *
 * @example
 *x
 * const { formState: { dirtyFields }, getValues } = useForm();
 * const changedFields = getChangedFields(dirtyFields, getValues);
 *  */
export function getChangedFields<T extends FieldValues>(
  dirtyFields: UseFormStateReturn<T>['dirtyFields'],
  getValues: UseFormGetValues<T>
): Partial<T> {
  const currentValues = getValues();
  const changedFields: Partial<T> = {};

  // dirtyFields의 키를 순회하며 변경된 필드만 추출
  Object.keys(dirtyFields).forEach((key) => {
    const fieldKey = key as keyof T;
    if (dirtyFields[fieldKey as keyof typeof dirtyFields]) {
      changedFields[fieldKey] = currentValues[fieldKey];
    }
  });

  return changedFields;
}

/**
 * 변경된 필드가 있는지 확인하는 헬퍼 함수
 *
 * @param dirtyFields - formState.dirtyFields
 * @returns 변경된 필드가 있으면 true, 없으면 false
 */
export function hasChangedFields<T extends FieldValues>(dirtyFields: UseFormStateReturn<T>['dirtyFields']): boolean {
  return Object.keys(dirtyFields).length > 0;
}
