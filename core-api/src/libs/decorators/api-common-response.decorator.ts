import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiCommonResponse = <TModel extends Type<any>>(model: TModel | TModel[]) => {
  const isArray = Array.isArray(model);
  const actualModel = isArray ? model[0] : model;
  const isPagination = isArray;

  return applyDecorators(
    ApiExtraModels(actualModel),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: isPagination
                ? {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number',
                        example: 10,
                        description: '데이터 전체 개수',
                      },
                      items: {
                        type: 'array',
                        items: { $ref: getSchemaPath(actualModel) },
                      },
                    },
                  }
                : {
                    $ref: getSchemaPath(actualModel),
                  },
            },
          },
        ],
      },
    })
  );
};
