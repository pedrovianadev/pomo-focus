import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleAcessar = () => {
    setErro('');

    // Validação de campos obrigatórios
    if (!login.trim() && !senha.trim()) {
      setErro('Login e senha são obrigatórios.');
      return;
    }
    if (!login.trim()) {
      setErro('Login obrigatório.');
      return;
    }
    if (!senha.trim()) {
      setErro('Senha obrigatória.');
      return;
    }

    // Autenticação simulada (Desafio Extra)
    if (login.trim() === 'aluno' && senha === '123456') {
      router.replace({
        pathname: '/dashboard',
        params: { usuario: login.trim() },
      });
    } else {
      setErro('Credenciais inválidas. Tente Login: aluno | Senha: 123456');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="timer-outline" size={36} color="#EF4444" />
          </View>
          <Text style={styles.title}>PomoFocus</Text>
          <Text style={styles.subtitle}>Gerencie seu tempo com eficiência</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário (ex: aluno)"
            placeholderTextColor="#64748B"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748B"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {erro ? (
            <View style={styles.erroBox}>
              <Ionicons name="alert-circle-outline" size={18} color="#F87171" />
              <Text style={styles.erroText}>{erro}</Text>
            </View>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleAcessar}
          >
            <Text style={styles.buttonText}>Acessar</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: -4,
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F8FAFC',
    fontSize: 16,
  },
  erroBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  erroText: {
    color: '#F87171',
    fontSize: 13,
    flex: 1,
  },
  button: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
