/**
 * React Hook Form의 dirtyFields 정보를 기반으로
 * 전체 데이터에서 변경된 값만 추출하여 반환합니다.
 *
 * @param dirtyFields formState.dirtyFields
 * @param values form.getValues() 또는 handleSubmit의 data
 * @returns 변경된 필드만 포함된 객체
 */
export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, any>>, // RHF의 dirtyFields 타입 대응
  values: T
): Partial<T> {
  const dirtyValues = {} as Partial<T>;

  Object.keys(dirtyFields).forEach((key) => {
    const propKey = key as keyof T; // Type Assertion을 여기서 한 번만 수행

    // dirtyFields에 키가 존재하면(수정되었다면) 값 할당
    if (dirtyFields[propKey]) {
      dirtyValues[propKey] = values[propKey];
    }
  });

  return dirtyValues;
}
