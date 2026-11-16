import { Alert, StyleSheet, Text, View } from 'react-native'

import AppShell from '@/components/app-shell'
import Contenedor from '@/components/contenedor'
import Documentos from '@/components/documentos'
import TarjetaCameo from '@/components/tarjetacameo'
import ActionButton from '@/components/action-button'

export default function SupervisionScreen() {
  return (
    <AppShell activeRoute="supervision">
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>CENTRO DE CONTROL</Text>
        <Text style={styles.title}>Supervisión de la plataforma</Text>
        <Text style={styles.subtitle}>
          Revisa actividad, reportes y documentos pendientes.
        </Text>
      </View>

      <ActionButton
        label="Exportar reporte"
        icon="▯"
        variant="secondary"
        onPress={() => Alert.alert('Exportar reporte', 'El reporte está listo para exportar.')}
      />

      <View style={styles.metrics}>
        <TarjetaCameo
          title="Usuarios activos"
          value="2.438"
          icon={<Text style={[styles.metricIcon, { color: '#315EFB' }]}>♙</Text>}
          iconBackground="#EAF0FF"
          trend="+8,4% este mes"
        />
        <TarjetaCameo
          title="Por verificar"
          value="24"
          icon={<Text style={[styles.metricIcon, { color: '#00A99D' }]}>▯</Text>}
          iconBackground="#E2FAF7"
          trend="6 requieren atención"
        />
        <TarjetaCameo
          title="Vacantes activas"
          value="186"
          icon={<Text style={[styles.metricIcon, { color: '#8354FF' }]}>▱</Text>}
          iconBackground="#F0EAFE"
          trend="21 publicadas hoy"
        />
        <TarjetaCameo
          title="Reportes abiertos"
          value="5"
          icon={<Text style={[styles.metricIcon, { color: '#FF5868' }]}>⌁</Text>}
          iconBackground="#FFF0F1"
          trend="2 de prioridad inmediata"
        />
      </View>

      <Contenedor
        eyebrow="VERIFICACIÓN"
        title="Documentos pendientes"
        badge="24 pendientes"
        style={styles.panel}
      >
        <Documentos
          category="Diplomado"
          title="UX Research"
          author="Camila Mendoza"
          institution="UPB"
          onViewFile={() => Alert.alert('Ver archivo', 'UX Research')}
          onApprove={() =>
            Alert.alert('Aprobar documento', 'UX Research está listo para aprobar.')
          }
        />
      </Contenedor>
    </AppShell>
  )
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 22,
  },
  eyebrow: {
    color: '#315EFB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    lineHeight: 16,
  },
  title: {
    marginTop: 6,
    color: '#14213A',
    fontSize: 27,
    fontWeight: '400',
    letterSpacing: -1,
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 5,
    color: '#61738C',
    fontSize: 13,
    lineHeight: 19,
  },
  metrics: {
    gap: 12,
    marginTop: 28,
    marginBottom: 16,
  },
  metricIcon: {
    fontSize: 22,
    lineHeight: 27,
  },
  panel: {
    marginBottom: 24,
  },
})
