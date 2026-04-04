import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { navy, brand } from '@/constants/Colors';
import { openTtpsswaHome, openTtpsswaUrl } from '@/constants/Api';

function QuickAction({ title, subtitle, onPress, color }: { title: string; subtitle: string; onPress: () => void; color: string }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: c.background }]} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: navy }]}>
        <Text style={styles.heroTag}>TTPSSWA</Text>
        <Text style={styles.heroTitle}>Trinidad & Tobago{'\n'}Public Services{'\n'}Social & Welfare{'\n'}Association</Text>
        <Text style={styles.heroSub}>
          Serving members through advocacy, benefits, and community since inception.
        </Text>
      </View>

      {/* Quick actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Quick actions</Text>
        <View style={styles.grid}>
          <QuickAction
            title="Hotel Reservations"
            subtitle="Book your stay"
            onPress={() => router.push('/(tabs)/hotel')}
            color="#1e40af"
          />
          <QuickAction
            title="Members Portal"
            subtitle="Login or sign up"
            onPress={() => router.push('/(tabs)/members')}
            color="#059669"
          />
          <QuickAction
            title="Membership Services"
            subtitle="View benefits"
            onPress={() => openTtpsswaUrl('/membership-services')}
            color="#7c3aed"
          />
          <QuickAction
            title="Executive Team"
            subtitle="Meet the leadership"
            onPress={() => router.push('/(tabs)/about')}
            color="#c9a227"
          />
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>About</Text>
        <View style={[styles.infoCard, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={[styles.infoText, { color: c.text }]}>
            The Trinidad & Tobago Public Services Social & Welfare Association (TTPSSWA) is dedicated to the social welfare, recreation, and cultural advancement of its members in the public service.
          </Text>
          <Text style={[styles.infoText, { color: c.textMuted, marginTop: 12 }]}>
            Our subsidiaries include hotel accommodation services, membership benefits programs, and regional representation through central committee delegates across Trinidad & Tobago.
          </Text>
        </View>
      </View>

      {/* Visit website */}
      <View style={styles.section}>
        <Pressable
          onPress={() => openTtpsswaHome()}
          style={[styles.webBtn, { backgroundColor: brand }]}
        >
          <Text style={styles.webBtnText}>Visit Full Website</Text>
        </Pressable>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 20 },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
    lineHeight: 36,
  },
  heroSub: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 16,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  grid: { gap: 12 },
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardSub: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  infoCard: {
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  webBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  webBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
