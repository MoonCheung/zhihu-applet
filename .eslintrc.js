module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:taro/all',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'latest'
    }
  },
  plugins: ['react', 'prettier'],
  rules: {
    // 关闭冲突规则
    'prettier/prettier': ['error'],
    // 相关Taro 规则
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro'
      }
    ],
    // 相关react 规则
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx']
      }
    ],
    'react/no-string-refs': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
