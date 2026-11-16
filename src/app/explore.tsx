import { Alert, StyleSheet, Text, View } from 'react-native'

import ActionButton from '@/components/action-button'
import AppShell from '@/components/app-shell'
import Contenedor from '@/components/contenedor'
import Publicaciones from '@/components/publicaciones'
import TarjetaCameo from '@/components/tarjetacameo'

export default function VacantesScreen() {
  return (
    <AppShell activeRoute="vacantes">
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>ATRACCIÓN DE TALENTO</Text>
        <Text style={styles.title}>Vacantes</Text>
        <Text style={styles.subtitle}>
          Publica oportunidades y gestiona su alcance.
        </Text>
      </View>

      <ActionButton
        label="Publicar vacante"
        icon="+"
        onPress={() => Alert.alert('Publicar vacante', 'Crea una nueva oportunidad.')}
      />

      <View style={styles.metrics}>
        <TarjetaCameo
          title="Vacantes activas"
          value="3"
          icon={<Text style={[styles.metricIcon, { color: '#315EFB' }]}>▱</Text>}
          iconBackground="#EAF0FF"
          trend="2 cierran este mes"
        />
        <TarjetaCameo
          title="Postulaciones"
          value="38"
          icon={<Text style={[styles.metricIcon, { color: '#00A99D' }]}>♙</Text>}
          iconBackground="#E2FAF7"
          trend="+12 esta semana"
        />
        <TarjetaCameo
          title="Alcance total"
          value="1.284"
          icon={<Text style={[styles.metricIcon, { color: '#8354FF' }]}>⌁</Text>}
          iconBackground="#F0EAFE"
          trend="+24% vs. mes anterior"
        />
      </View>

      <Contenedor title="Mis publicaciones" style={styles.panel}>
        <Publicaciones
          title="Product Designer Senior"
          location="La Paz · Híbrido"
          status="Publicada"
          iconLabel="P"
          onEdit={() =>
            Alert.alert('Editar publicación', 'Product Designer Senior')
          }
        />
        <Publicaciones
          title="Frontend Developer"
          location="Santa Cruz · Remoto"
          status="Publicada"
          iconLabel="F"
          onEdit={() =>
            Alert.alert('Editar publicación', 'Frontend Developer')
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
