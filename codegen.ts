import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://dev-dashboard.intra.asklora.ai/api/v1/graph/': {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1NTQxMDMwLCJpYXQiOjE2ODU0NTQ2MzAsImp0aSI6IjE4NmFkMDA1MTQ3ZjRlODY5Nzc3N2U4MGJhYTE1YjAwIiwidXNlcl9pZCI6MTB9.ZGrVNis4KvHx_kglA4bNfWgPXWbODdJxYcb3qAPM-W4'
        }
      }
    }
  ],
  documents: ['src/graphql/**.{ts,tsx}'],
  generates: {
    'src/graphql/generated/types.ts': { plugins: ['typescript'] },
    'src/graphql/generated/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types.ts'
      },
      plugins: ['typescript-operations', 'typescript-react-apollo']
    }
  }
};

export default config;
