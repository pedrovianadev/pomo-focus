import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ModoCiclo = 'foco' | 'curta' | 'longa';
type AbaPainel = 'resumo' | 'tarefa';

const TEMPOS: Record<ModoCiclo, { label: string; tempo: string }> = {
  foco: { label: 'Foco', tempo: '25:00' },
  curta: { label: 'Pausa Curta', tempo: '05:00' },
  longa: { label: 'Pausa Longa', tempo: '15:00' },
};

export default function DashboardScreen() {
  const { usuario } = useLocalSearchParams<{ usuario?: string }>();
  const nomeExibicao = usuario || 'Estudante';

  const [modoAtivo, setModoAtivo] = useState<ModoCiclo>('foco');
  const [rodando, setRodando] = useState(false);
  const [abaInferior, setAbaInferior] = useState<AbaPainel>('resumo');
  const [tarefaAtual, setTarefaAtual] = useState('Desenvolver app com Expo Router');

  // Alterna o estado do cronômetro e abre a aba "Tarefa em Foco" ao iniciar
  const handleToggleTimer = () => {
    const novoEstado = !rodando;
    setRodando(novoEstado);
    if (novoEstado) {
      setAbaInferior('tarefa');
    }
  };

  // Troca entre Foco, Pausa Curta e Pausa Longa
  const handleTrocarModo = (novoModo: ModoCiclo) => {
    setModoAtivo(novoModo);
    setRodando(false);
  };

  // Botão Sair com Alert caso o cronômetro esteja rodando
  const handleSair = () => {
    if (rodando) {
      if (Platform.OS === 'web') {
        const confirmar = window.confirm(
          'O cronômetro está em andamento! Deseja realmente sair e interromper seu foco?'
        );
        if (confirmar) router.replace('/');
      } else {
        Alert.alert(
          'Cronômetro em andamento',
          'Você tem um ciclo ativo. Deseja realmente sair e interromper seu foco?',
          [
            { text: 'Continuar focado', style: 'cancel' },
            {
              text: 'Sair mesmo assim',
              style: 'destructive',
              onPress: () => router.replace('/'),
            },
          ]
        );
      }
    } else {
      router.replace('/');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho com saudação e botão Sair */}
      <View style={styles.header}>
        <View>
          <Text style={styles.badge}>DASHBOARD</Text>
          <Text style={styles.greeting}>Bom foco, {nomeExibicao}! ☕</Text>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleSair}>
          <Ionicons name="log-out-outline" size={18} color="#F87171" />
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>

      {/* Card Principal do Pomodoro */}
      <View style={styles.timerCard}>
        {/* Abas de Ciclo */}
        <View style={styles.modesRow}>
          {(['foco', 'curta', 'longa'] as ModoCiclo[]).map((modo) => {
            const selecionado = modoAtivo === modo;
            return (
              <Pressable
                key={modo}
                style={[styles.modeTab, selecionado && styles.modeTabActive]}
                onPress={() => handleTrocarModo(modo)}
              >
                <Text
                  style={[
                    styles.modeTabText,
                    selecionado && styles.modeTabTextActive,
                  ]}
                >
                  {TEMPOS[modo].label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Display Estático do Relógio */}
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>{TEMPOS[modoAtivo].tempo}</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: rodando ? '#22C55E' : '#64748B' },
              ]}
            />
            <Text style={styles.statusText}>
              {rodando ? 'Ciclo em andamento' : 'Cronômetro pausado'}
            </Text>
          </View>
        </View>

        {/* Botão de Iniciar / Pausar */}
        <Pressable
          style={[styles.actionButton, rodando && styles.actionButtonStop]}
          onPress={handleToggleTimer}
        >
          <Ionicons
            name={rodando ? 'pause' : 'play'}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.actionButtonText}>
            {rodando ? 'Pausar Ciclo' : 'Iniciar Pomodoro'}
          </Text>
        </Pressable>
      </View>

      {/* Abas Inferiores: Resumo do Dia vs Tarefa em Foco */}
      <View style={styles.bottomTabsRow}>
        <Pressable
          style={[
            styles.bottomTabButton,
            abaInferior === 'resumo' && styles.bottomTabActive,
          ]}
          onPress={() => setAbaInferior('resumo')}
        >
          <Ionicons
            name="stats-chart-outline"
            size={18}
            color={abaInferior === 'resumo' ? '#EF4444' : '#94A3B8'}
          />
          <Text
            style={[
              styles.bottomTabText,
              abaInferior === 'resumo' && styles.bottomTabTextActive,
            ]}
          >
            Resumo do Dia
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.bottomTabButton,
            abaInferior === 'tarefa' && styles.bottomTabActive,
          ]}
          onPress={() => setAbaInferior('tarefa')}
        >
          <Ionicons
            name="flame-outline"
            size={18}
            color={abaInferior === 'tarefa' ? '#EF4444' : '#94A3B8'}
          />
          <Text
            style={[
              styles.bottomTabText,
              abaInferior === 'tarefa' && styles.bottomTabTextActive,
            ]}
          >
            Tarefa em Foco
          </Text>
        </Pressable>
      </View>

      {/* Conteúdo da Aba Selecionada */}
      {abaInferior === 'resumo' ? (
        <View style={styles.summaryGrid}>
          <View style={styles.metricCard}>
            <Ionicons name="checkmark-done-circle" size={28} color="#EF4444" />
            <Text style={styles.metricValue}>4</Text>
            <Text style={styles.metricLabel}>Ciclos concluídos</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="time-outline" size={28} color="#38BDF8" />
            <Text style={styles.metricValue}>1h 40m</Text>
            <Text style={styles.metricLabel}>Tempo em foco</Text>
          </View>
        </View>
      ) : (
        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Ionicons name="radio-button-on" size={18} color="#EF4444" />
            <Text style={styles.taskTitle}>Trabalhando agora em:</Text>
          </View>
          <TextInput
            style={styles.taskInput}
            value={tarefaAtual}
            onChangeText={setTarefaAtual}
            placeholder="Qual é o seu foco principal agora?"
            placeholderTextColor="#64748B"
          />
          <Text style={styles.taskHint}>
            {rodando
              ? 'Mantenha o foco nesta tarefa até o fim do bloco de 25 minutos.'
              : 'Clique em "Iniciar Pomodoro" acima para começar a focar nesta atividade.'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    paddingTop: 56,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#EF4444',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  logoutText: {
    color: '#F87171',
    fontWeight: '600',
    fontSize: 14,
  },
  timerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  modesRow: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 4,
    marginBottom: 28,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeTabActive: {
    backgroundColor: '#EF4444',
  },
  modeTabText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
  },
  clockContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  clockText: {
    fontSize: 68,
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonStop: {
    backgroundColor: '#475569',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomTabsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  bottomTabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  bottomTabActive: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  bottomTabText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomTabTextActive: {
    color: '#F8FAFC',
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'flex-start',
    gap: 8,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  metricLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  taskCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },
  taskInput: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 14,
    color: '#F8FAFC',
    fontSize: 15,
  },
  taskHint: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
});
