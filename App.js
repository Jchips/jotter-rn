import './gesture-handler';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import { MarkdownProvider } from './src/contexts/MDContext';
import Router from './src/routing/Router';

export default function App() {
  return (
    <AuthProvider>
      <MarkdownProvider>
        <Router />
      </MarkdownProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
