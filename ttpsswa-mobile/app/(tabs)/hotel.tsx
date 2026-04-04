import { useCallback, useEffect, useState } from 'react';
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
import { API_BASE, ensureApiBase } from '@/constants/Api';

type RoomKey = 'presidential' | 'fullBed' | 'doubleBed';

const ROOM_CAPS: Record<RoomKey, number> = { presidential: 2, fullBed: 2, doubleBed: 4 };
const ROOM_LABELS: Record<RoomKey, string> = { presidential: 'Presidential Suite', fullBed: 'Full Bed Room', doubleBed: 'Double Bed Room' };
const ROOM_SUBS: Record<RoomKey, string> = { presidential: 'Max 2 per room', fullBed: 'Max 2 per room', doubleBed: 'Max 4 per room' };
const MAX_ROOMS = 8;

function Stepper({ label, sub, value, max, onChange }: { label: string; sub: string; value: number; max: number; onChange: (n: number) => void }) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={[styles.stepper, { backgroundColor: c.surface, borderColor: c.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.stepLabel, { color: c.text }]}>{label}</Text>
        <Text style={[styles.stepSub, { color: c.textMuted }]}>{sub}</Text>
      </View>
      <View style={styles.stepBtns}>
        <Pressable onPress={() => onChange(Math.max(0, value - 1))} disabled={value <= 0} style={[styles.stepBtn, { borderColor: c.border }]}>
          <Text style={[styles.stepBtnTxt, { color: value <= 0 ? c.border : c.text }]}>−</Text>
        </Pressable>
        <Text style={[styles.stepVal, { color: c.text }]}>{value}</Text>
        <Pressable onPress={() => onChange(Math.min(max, value + 1))} disabled={value >= max} style={[styles.stepBtn, { borderColor: c.border }]}>
          <Text style={[styles.stepBtnTxt, { color: value >= max ? c.border : c.text }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HotelScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [rooms, setRooms] = useState<Record<RoomKey, number>>({ presidential: 0, fullBed: 0, doubleBed: 1 });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalRooms = rooms.presidential + rooms.fullBed + rooms.doubleBed;

  const updateRoom = useCallback((key: RoomKey, val: number) => {
    setRooms((prev) => {
      const next = { ...prev, [key]: val };
      const sum = next.presidential + next.fullBed + next.doubleBed;
      if (sum > MAX_ROOMS) {
        next[key] = Math.max(0, MAX_ROOMS - (sum - next[key]));
      }
      return next;
    });
  }, []);

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Missing info', 'Please fill in your name, email, and phone.');
      return;
    }
    if (!checkInDate || !checkOutDate) {
      Alert.alert('Missing dates', 'Please enter check-in and check-out dates (YYYY-MM-DD).');
      return;
    }
    if (totalRooms < 1) {
      Alert.alert('No rooms', 'Select at least one room.');
      return;
    }
    if (!ensureApiBase()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/hotel-booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          checkInDate,
          checkOutDate,
          checkInTime,
          checkOutTime,
          presidentialSuite: String(rooms.presidential),
          fullBedRoom: String(rooms.fullBed),
          doubleBedRoom: String(rooms.doubleBed),
          rooms: String(totalRooms),
          guests: String(adults),
          children: String(children),
          notes: notes.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        Alert.alert('Error', (data as { error?: string }).error || 'Something went wrong.');
        return;
      }
      setSubmitted(true);
    } catch {
      Alert.alert('Network error', 'Could not reach the server.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: c.background }]} contentContainerStyle={styles.padded}>
        <View style={[styles.successCard, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={{ fontSize: 40, textAlign: 'center' }}>✓</Text>
          <Text style={[styles.successTitle, { color: c.text }]}>Request Received</Text>
          <Text style={[styles.successSub, { color: c.textMuted }]}>
            Your reservation request has been sent to the accommodations team. A coordinator will confirm availability and rates shortly.
          </Text>
          <Pressable onPress={() => { setSubmitted(false); setFullName(''); setEmail(''); setPhone(''); setCheckInDate(''); setCheckOutDate(''); setNotes(''); setRooms({ presidential: 0, fullBed: 0, doubleBed: 1 }); setAdults(1); setChildren(0); }} style={[styles.submitBtn, { backgroundColor: brand }]}>
            <Text style={styles.submitTxt}>New Booking</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  const inputStyle = [styles.input, { backgroundColor: c.surface, borderColor: c.border, color: c.text }];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={[styles.container, { backgroundColor: c.background }]} contentContainerStyle={styles.padded} keyboardShouldPersistTaps="handled">
        <Text style={[styles.heading, { color: c.text }]}>Book Your Stay</Text>
        <Text style={[styles.sub, { color: c.textMuted }]}>
          {MAX_ROOMS} rooms available. Submit a request and our team will confirm.
        </Text>

        {/* Rooms */}
        <Text style={[styles.label, { color: c.text, marginTop: 24 }]}>Rooms ({totalRooms}/{MAX_ROOMS})</Text>
        {(Object.keys(ROOM_LABELS) as RoomKey[]).map((key) => (
          <Stepper key={key} label={ROOM_LABELS[key]} sub={ROOM_SUBS[key]} value={rooms[key]} max={ROOM_CAPS[key]} onChange={(v) => updateRoom(key, v)} />
        ))}

        {/* Guests */}
        <Text style={[styles.label, { color: c.text, marginTop: 24 }]}>Guests</Text>
        <Stepper label="Adults" sub="Age 13+" value={adults} max={10} onChange={(v) => setAdults(Math.max(1, v))} />
        <Stepper label="Children" sub="Ages 0–12" value={children} max={10} onChange={setChildren} />

        {/* Dates */}
        <Text style={[styles.label, { color: c.text, marginTop: 24 }]}>Dates</Text>
        <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Check-in date (YYYY-MM-DD)</Text>
        <TextInput value={checkInDate} onChangeText={setCheckInDate} placeholder="2026-04-15" placeholderTextColor={c.textMuted} style={inputStyle} />
        <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Check-out date (YYYY-MM-DD)</Text>
        <TextInput value={checkOutDate} onChangeText={setCheckOutDate} placeholder="2026-04-18" placeholderTextColor={c.textMuted} style={inputStyle} />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Check-in time</Text>
            <TextInput value={checkInTime} onChangeText={setCheckInTime} placeholder="15:00" placeholderTextColor={c.textMuted} style={inputStyle} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Check-out time</Text>
            <TextInput value={checkOutTime} onChangeText={setCheckOutTime} placeholder="11:00" placeholderTextColor={c.textMuted} style={inputStyle} />
          </View>
        </View>

        {/* Contact */}
        <Text style={[styles.label, { color: c.text, marginTop: 24 }]}>Your Details</Text>
        <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Full name</Text>
        <TextInput value={fullName} onChangeText={setFullName} placeholder="John Smith" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="name" />
        <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="john@example.com" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="email" keyboardType="email-address" autoCapitalize="none" />
        <Text style={[styles.fieldLabel, { color: c.textMuted }]}>Phone</Text>
        <TextInput value={phone} onChangeText={setPhone} placeholder="+1 868-555-0000" placeholderTextColor={c.textMuted} style={inputStyle} autoComplete="tel" keyboardType="phone-pad" />

        {/* Notes */}
        <Text style={[styles.fieldLabel, { color: c.textMuted, marginTop: 20 }]}>Special requests</Text>
        <TextInput value={notes} onChangeText={setNotes} placeholder="Accessibility, dietary, late arrival…" placeholderTextColor={c.textMuted} style={[...inputStyle, { minHeight: 80, textAlignVertical: 'top' }]} multiline />

        {/* Submit */}
        <Pressable onPress={handleSubmit} disabled={submitting} style={[styles.submitBtn, { backgroundColor: brand, opacity: submitting ? 0.6 : 1, marginTop: 28 }]}>
          <Text style={styles.submitTxt}>{submitting ? 'Sending…' : 'Reserve'}</Text>
        </Pressable>
        <Text style={[styles.disclaimer, { color: c.textMuted }]}>
          You won&apos;t be charged — we confirm availability first.
        </Text>
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
  label: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  fieldLabel: { fontSize: 12, fontWeight: '600', marginTop: 12, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  row: { flexDirection: 'row' },
  stepper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 10 },
  stepLabel: { fontSize: 15, fontWeight: '600' },
  stepSub: { fontSize: 12, marginTop: 2 },
  stepBtns: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  stepBtnTxt: { fontSize: 18, fontWeight: '500' },
  stepVal: { fontSize: 16, fontWeight: '700', width: 24, textAlign: 'center', fontVariant: ['tabular-nums'] },
  submitBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  submitTxt: { color: '#fff', fontSize: 17, fontWeight: '700' },
  disclaimer: { textAlign: 'center', fontSize: 12, marginTop: 12 },
  successCard: { borderRadius: 20, borderWidth: 1, padding: 32, marginTop: 40, alignItems: 'center' },
  successTitle: { fontSize: 24, fontWeight: '800', marginTop: 16 },
  successSub: { fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 12 },
});
