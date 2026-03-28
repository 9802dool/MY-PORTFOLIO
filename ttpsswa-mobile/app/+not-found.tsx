import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Page not found</Text>
        <Pressable onPress={() => router.replace('/')} style={styles.btn}>
          <Text style={styles.btnText}>Go to Home</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: '700' },
  btn: { marginTop: 20, backgroundColor: '#1e40af', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
