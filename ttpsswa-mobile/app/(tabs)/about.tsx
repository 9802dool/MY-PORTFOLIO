import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { brand, navy } from '@/constants/Colors';
import { openTtpsswaHome, openTtpsswaUrl } from '@/constants/Api';

type TeamMember = {
  name: string;
  role: string;
};

const executive: TeamMember[] = [
  { name: 'Akins Vidale', role: 'President General' },
  { name: 'Watson Duke', role: 'Vice President' },
  { name: 'Avinash Doolarsingh', role: 'General Secretary' },
  { name: 'Simeon Doolarsingh', role: 'Assistant General Secretary' },
];

type Subsidiary =
  | { name: string; desc: string; kind: 'tab'; href: '/(tabs)/hotel' }
  | { name: string; desc: string; kind: 'web'; path: string };

const subsidiaries: Subsidiary[] = [
  {
    name: 'Hotel Accommodations',
    desc: 'Stay at our 8-room property with presidential suites, full bed, and double bed rooms.',
    kind: 'tab',
    href: '/(tabs)/hotel',
  },
  {
    name: 'Membership Benefits',
    desc: 'Health, education, recreation, and welfare programs for members.',
    kind: 'web',
    path: '/membership-services',
  },
  {
    name: 'Central Committee',
    desc: 'Regional representatives across Trinidad & Tobago divisions.',
    kind: 'web',
    path: '/central-committee-representatives',
  },
];

export default function AboutScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: c.background }]} contentContainerStyle={styles.padded}>
      {/* Mission */}
      <View style={[styles.heroCard, { backgroundColor: navy }]}>
        <Text style={styles.heroTag}>Our Mission</Text>
        <Text style={styles.heroText}>
          The Trinidad & Tobago Public Services Social & Welfare Association promotes the social welfare, recreation, and cultural advancement of its members within the public service.
        </Text>
      </View>

      {/* Executive */}
      <Text style={[styles.sectionTitle, { color: c.text }]}>Executive Team</Text>
      <View style={styles.grid}>
        {executive.map((m) => (
          <View key={m.name} style={[styles.memberCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <View style={[styles.avatar, { backgroundColor: brand }]}>
              <Text style={styles.avatarText}>{m.name.split(' ').map((w) => w[0]).join('')}</Text>
            </View>
            <Text style={[styles.memberName, { color: c.text }]}>{m.name}</Text>
            <Text style={[styles.memberRole, { color: c.textMuted }]}>{m.role}</Text>
          </View>
        ))}
      </View>

      <Pressable onPress={() => openTtpsswaUrl('/executive')} style={[styles.outlineBtn, { borderColor: brand }]}>
        <Text style={[styles.outlineBtnText, { color: brand }]}>View Full Executive Page →</Text>
      </Pressable>

      {/* Subsidiaries */}
      <Text style={[styles.sectionTitle, { color: c.text, marginTop: 32 }]}>Subsidiaries</Text>
      {subsidiaries.map((s) => (
        <Pressable
          key={s.name}
          onPress={() => {
            if (s.kind === 'tab') router.push(s.href);
            else openTtpsswaUrl(s.path);
          }}
          style={[styles.subCard, { backgroundColor: c.surface, borderColor: c.border }]}
        >
          <Text style={[styles.subName, { color: c.text }]}>{s.name}</Text>
          <Text style={[styles.subDesc, { color: c.textMuted }]}>{s.desc}</Text>
        </Pressable>
      ))}

      {/* Contact */}
      <Text style={[styles.sectionTitle, { color: c.text, marginTop: 32 }]}>Contact</Text>
      <View style={[styles.contactCard, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Text style={[styles.contactLine, { color: c.text }]}>TTPSSWA Head Office</Text>
        <Text style={[styles.contactLine, { color: c.textMuted }]}>Trinidad & Tobago</Text>
        <Pressable onPress={() => openTtpsswaHome()} style={{ marginTop: 16 }}>
          <Text style={[styles.link, { color: brand }]}>Visit Website →</Text>
        </Pressable>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  padded: { padding: 20, paddingBottom: 40 },
  heroCard: { borderRadius: 16, padding: 24, marginBottom: 28 },
  heroTag: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#94a3b8', textTransform: 'uppercase' },
  heroText: { fontSize: 15, lineHeight: 24, color: '#e2e8f0', marginTop: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  memberCard: { width: '47%' as unknown as number, borderRadius: 14, borderWidth: 1, padding: 16, alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  memberName: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  memberRole: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  outlineBtn: { borderWidth: 1.5, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  outlineBtnText: { fontSize: 14, fontWeight: '600' },
  subCard: { borderRadius: 14, borderWidth: 1, padding: 18, marginBottom: 12 },
  subName: { fontSize: 16, fontWeight: '700' },
  subDesc: { fontSize: 13, lineHeight: 20, marginTop: 6 },
  contactCard: { borderRadius: 14, borderWidth: 1, padding: 20 },
  contactLine: { fontSize: 15, lineHeight: 22 },
  link: { fontSize: 15, fontWeight: '600' },
});
