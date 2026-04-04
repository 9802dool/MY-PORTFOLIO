import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { brand } from '@/constants/Colors';
import { API_BASE, ensureApiBase, openTtpsswaUrl } from '@/constants/Api';

type Tab = 'login' | 'signup';

export default function MembersScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  const [tab, setTab] = useState<Tab>('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginBusy, setLoginBusy] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupBusy, setSignupBusy] = useState(false);

  const inputStyle = [styles.input, { backgroundColor: c.surface, borderColor: c.border, color: c.text }];

  const handleLogin = async () => {
    if (!ensureApiBase()) return;
    if (!loginEmail.trim() || !loginPass.trim()) {
      Alert.alert('Missing info', 'Please enter your email and password.');
      return;
    }
    setLoginBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/members/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPass.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        Alert.alert('Login failed', (data as { error?: string }).error || 'Invalid credentials.');
        return;
      }
      Alert.alert('Success', 'You are logged in. Visit the full website for your member dashboard.', [
        { text: 'Open Website', onPress: () => openTtpsswaUrl('/members/login') },
        { text: 'OK' },
      ]);
    } catch {
      Alert.alert('Network error', 'Could not reach the server.');
    } finally {
      setLoginBusy(false);
    }
  };

  const handleSignup = async () => {
    if (!ensureApiBase()) return;
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }
    setSignupBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/member-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signupName.trim(),
          email: signupEmail.trim(),
          phone: signupPhone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        Alert.alert('Error', (data as { error?: string }).error || 'Could not submit application.');
        return;
      }
      Alert.alert('Application Submitted', 'Your membership application has been received. An administrator will review it shortly.');
      setSignupName('');
      setSignupEmail('');
      setSignupPhone('');
    } catch {
      Alert.alert('Network error', 'Could not reach the server.');
    } finally {
      setSignupBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={[styles.container, { backgroundColor: c.background }]} contentContainerStyle={styles.padded} keyboardShouldPersistTaps="handled">
        <Text style={[styles.heading, { color: c.text }]}>Members Portal</Text>
        <Text style={[styles.sub, { color: c.textMuted }]}>
          Login to your account or apply for membership.
        </Text>

        {/* Tab switcher */}
        <View style={[styles.tabs, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Pressable onPress={() => setTab('login')} style={[styles.tab, tab === 'login' && { backgroundColor: brand }]}>
            <Text style={[styles.tabText, { color: tab === 'login' ? '#fff' : c.textMuted }]}>Login</Text>
          </Pressable>
          <Pressable onPress={() => setTab('signup')} style={[styles.tab, tab === 'signup' && { backgroundColor: brand }]}>
            <Text style={[styles.tabText, { color: tab === 'signup' ? '#fff' : c.textMuted }]}>Sign Up</Text>
          </Pressable>
        </View>

        {tab === 'login' ? (
          <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.cardTitle, { color: c.text }]}>Member Login</Text>
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Email</Text>
            <TextInput value={loginEmail} onChangeText={setLoginEmail} placeholder="you@example.com" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="email" keyboardType="email-address" autoCapitalize="none" />
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Password</Text>
            <TextInput value={loginPass} onChangeText={setLoginPass} placeholder="Your password" placeholderTextColor={c.textMuted} style={inputStyle} secureTextEntry />
            <Pressable onPress={handleLogin} disabled={loginBusy} style={[styles.btn, { backgroundColor: brand, opacity: loginBusy ? 0.6 : 1 }]}>
              <Text style={styles.btnText}>{loginBusy ? 'Logging in…' : 'Login'}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.cardTitle, { color: c.text }]}>Membership Application</Text>
            <Text style={[styles.sub, { color: c.textMuted, marginBottom: 12 }]}>
              Apply to join TTPSSWA. Your application will be reviewed by an administrator.
            </Text>
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Full name</Text>
            <TextInput value={signupName} onChangeText={setSignupName} placeholder="John Smith" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="name" />
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Email</Text>
            <TextInput value={signupEmail} onChangeText={setSignupEmail} placeholder="you@example.com" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="email" keyboardType="email-address" autoCapitalize="none" />
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Phone</Text>
            <TextInput value={signupPhone} onChangeText={setSignupPhone} placeholder="+1 868-555-0000" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="tel" keyboardType="phone-pad" />
            <Pressable onPress={handleSignup} disabled={signupBusy} style={[styles.btn, { backgroundColor: brand, opacity: signupBusy ? 0.6 : 1 }]}>
              <Text style={styles.btnText}>{signupBusy ? 'Submitting…' : 'Apply'}</Text>
            </Pressable>
          </View>
        )}

        {/* Links */}
        <View style={styles.links}>
          <Pressable onPress={() => openTtpsswaUrl('/membership-services')}>
            <Text style={[styles.link, { color: brand }]}>View Membership Benefits →</Text>
          </Pressable>
          <Pressable onPress={() => openTtpsswaUrl('/members-portal')}>
            <Text style={[styles.link, { color: brand }]}>Full Members Portal →</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  padded: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: '800' },
  sub: { fontSize: 14, marginTop: 6, lineHeight: 20 },
  tabs: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, marginTop: 24, overflow: 'hidden' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabText: { fontSize: 15, fontWeight: '600' },
  card: { borderRadius: 16, borderWidth: 1, padding: 20, marginTop: 20 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  fieldLabel: { fontSize: 12, fontWeight: '600', marginTop: 14, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  btn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  links: { marginTop: 28, gap: 16 },
  link: { fontSize: 15, fontWeight: '600' },
});
