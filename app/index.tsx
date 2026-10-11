import { Redirect } from 'expo-router';

import { useStore } from '@/src/store/store';

export default function HomeScreen() {
  const firstPatternId = useStore((state) => state.projects[0]?.patterns[0]?.id);
  console.log('HOME firstPatternId:', firstPatternId);

  if (!firstPatternId) return null;

  return <Redirect href={{ pathname: '/pattern/[patternId]', params: { patternId: firstPatternId } }} />;
}