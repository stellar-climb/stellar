import { useQuery } from '@libs';
import { historyRepository } from '@repositories';
import { DiffEditor } from '@monaco-editor/react';
import { Box } from '@mui/material';

export function HistorySection(props: { entity: string; entityId: string | number }) {
  // 1. destructure props
  // 2. lib hooks

  // 3. state hooks
  // 4. query hooks
  const { data: histories } = useQuery(historyRepository.list, {});

  // 5. form hooks
  // 6. calculate values

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {histories?.items?.map((item) => (
        <Box key={item.id}>
          <Box css={{ marginBottom: '10px', fontWeight: 'bold' }}>
            수정자: {item.adminName} | 일시: {new Date(item.createdAt).toLocaleString()}
          </Box>
          <Box style={{ border: '1px solid #ccc' }}>
            <DiffEditor
              height="200px" // 리스트니까 높이를 작게 조절
              language="json"
              original={JSON.stringify(
                Object.fromEntries(Object.entries(item.log).map(([k, v]: any) => [k, v.previous])),
                null,
                2
              )}
              modified={JSON.stringify(
                Object.fromEntries(Object.entries(item.log).map(([k, v]: any) => [k, v.current])),
                null,
                2
              )}
              options={{
                readOnly: true,
                renderSideBySide: false,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'off',
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
